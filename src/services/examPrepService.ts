import type {
  AssessmentQuestion,
  WeakTopic,
  ConceptMastery,
} from '@/types';
import type {
  ExamPrepModeId,
  ExamConfiguration,
  ExamSectionMeta,
  ExamSectionId,
  ExamAttempt,
  ExamAnswerEntry,
  ExamResultSummary,
  ExamReviewItem,
  ExamPrepMissionState,
  ExamPrepMissionObjectiveId,
  ExamPrepRecentAttempt,
  TheoryExamQuestion,
  VivaBankItem,
  VivaAttempt,
  VivaSelfRating,
  LabExamScenario,
  LabAttemptState,
  LabCheckpoint,
} from '@/types/examPrep';
import { assessmentService } from './assessmentService';
import { curriculumService } from './curriculumService';
import { progressService } from './progressService';
import { masteryService } from './masteryService';
import { weakTopicService } from './weakTopicService';
import { THEORY_SHORT_QUESTIONS, THEORY_LONG_QUESTIONS, LAB_EXAM_SCENARIOS } from '@/data/examPrep';

const ATTEMPT_KEY = 'oop-universe-exam-prep-attempt:v1';
const HISTORY_KEY = 'oop-universe-exam-prep-history:v1';
const MISSION_KEY = 'oop-universe-exam-prep-mission:v1';
const LAB_KEY = 'oop-universe-exam-prep-lab:v1';
const THEORY_KEY = 'oop-universe-exam-prep-theory:v1';
const VIVA_KEY = 'oop-universe-exam-prep-viva:v1';
const HISTORY_CAP = 40;
const MISSION_XP = 150;
const MISSION_ID = 'mission-exam-ready';

export const EXAM_SECTIONS: ExamSectionMeta[] = [
  { id: 'A', title: 'MCQs', titleUrdu: 'MCQs', kind: 'mcq', marksPerQuestion: 1 },
  { id: 'B', title: 'Short Questions', titleUrdu: 'Short Questions', kind: 'short', marksPerQuestion: 3 },
  { id: 'C', title: 'Long Questions', titleUrdu: 'Long Questions', kind: 'long', marksPerQuestion: 8 },
  { id: 'D', title: 'Code Analysis', titleUrdu: 'Code Analysis', kind: 'code-analysis', marksPerQuestion: 2 },
  { id: 'E', title: 'Output Prediction', titleUrdu: 'Output Prediction', kind: 'output', marksPerQuestion: 2 },
  { id: 'F', title: 'Scenario-Based Design', titleUrdu: 'Scenario Design', kind: 'scenario', marksPerQuestion: 4 },
];

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function isExpired(attempt: ExamAttempt): boolean {
  if (!attempt.deadlineAt) return false;
  return Date.now() > attempt.deadlineAt;
}

function bankToTheory(q: AssessmentQuestion, section: ExamSectionId, marks: number): TheoryExamQuestion {
  const kind: TheoryExamQuestion['kind'] =
    section === 'E' ? 'output'
    : section === 'D' ? 'code-analysis'
    : section === 'F' ? 'scenario'
    : 'mcq';
  const correct = Array.isArray(q.correctAnswer) ? q.correctAnswer[0] || '' : q.correctAnswer;
  return {
    id: q.id,
    section,
    kind,
    marks,
    difficulty: q.difficulty,
    moduleId: q.moduleId,
    lessonId: q.lessonId,
    topicTags: q.topicTags,
    prompt: q.question,
    codeSnippet: q.codeSnippet,
    options: q.options,
    correctAnswer: q.correctAnswer,
    modelAnswer: correct || q.explanation,
    markingPoints: q.options && !Array.isArray(q.correctAnswer) ? [correct] : Array.isArray(q.correctAnswer) ? q.correctAnswer : [correct],
    explanation: q.explanation,
    explanationUrdu: q.romanUrduExplanation,
    source: 'bank',
    bankQuestion: q,
  };
}

function pickBank(typeFilter: string | undefined, count: number, moduleFilter?: string, difficulty?: string): AssessmentQuestion[] {
  let pool = assessmentService.getAllQuestions();
  if (moduleFilter && moduleFilter !== 'all') pool = pool.filter(q => q.moduleId === moduleFilter);
  if (difficulty && difficulty !== 'all') pool = pool.filter(q => q.difficulty === difficulty);
  if (typeFilter) pool = pool.filter(q => q.type === typeFilter);
  return shuffle(pool).slice(0, count);
}

function getVivaBankInternal(): VivaBankItem[] {
  const curriculum = curriculumService.getCurriculum();
  const items: VivaBankItem[] = [];
  for (const mod of curriculum.modules) {
    for (const lesson of mod.lessons) {
      for (const vq of lesson.vivaQuestions) {
        items.push({
          id: vq.id,
          question: vq.question,
          answer: vq.answer,
          difficulty: vq.difficulty,
          moduleId: mod.id,
          lessonId: lesson.id,
          topic: lesson.title,
        });
      }
    }
  }
  return items;
}

function lessonLinkFor(lessonId?: string): string | undefined {
  if (!lessonId) return undefined;
  return `/lesson/${lessonId}`;
}

function xorshift(seed: number): () => number {
  let x = seed | 0;
  return () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return Math.abs(x);
  };
}

export const examPrepService = {
  EXAM_SECTIONS,

  getMissionId(): string {
    return MISSION_ID;
  },

  buildExamConfiguration(mode: ExamPrepModeId, opts: {
    moduleFilter?: string;
    difficultyFilter?: 'easy' | 'medium' | 'hard' | 'all';
    durationMinutes?: number;
    questionCount?: number;
    title?: string;
  } = {}): ExamConfiguration {
    const moduleFilter = opts.moduleFilter || 'all';
    const difficultyFilter = opts.difficultyFilter || 'all';
    const durationMinutes = opts.durationMinutes ?? 45;
    const questionCount = opts.questionCount ?? 20;
    const titles: Record<ExamPrepModeId, string> = {
      theory: 'Theory Exam Practice',
      short: 'Short Question Practice',
      long: 'Long Question Practice',
      'code-analysis': 'Java Code Analysis',
      output: 'Output Prediction Exam',
      logic: 'Programming Logic Challenges',
      scenario: 'Scenario-Based Questions',
      debugging: 'Debugging Exam',
      lab: 'Lab Examination Practice',
      viva: 'Viva Preparation',
      mock: 'Full Mock Examination',
      revision: 'Weak Topic Revision',
    };
    let sections: ExamSectionMeta[] = [];
    if (mode === 'theory') sections = EXAM_SECTIONS;
    else if (mode === 'short') sections = [EXAM_SECTIONS[1]];
    else if (mode === 'long') sections = [EXAM_SECTIONS[2]];
    else if (mode === 'code-analysis') sections = [EXAM_SECTIONS[3]];
    else if (mode === 'output') sections = [EXAM_SECTIONS[4]];
    else if (mode === 'scenario') sections = [EXAM_SECTIONS[5]];
    else if (mode === 'logic') sections = [{ ...EXAM_SECTIONS[3], id: 'D', title: 'Logic / Code Completion', titleUrdu: 'Logic / Code Completion', kind: 'code-analysis' }];
    else if (mode === 'debugging') sections = [{ ...EXAM_SECTIONS[3], id: 'D', title: 'Debugging', titleUrdu: 'Debugging', kind: 'code-analysis' }];
    else if (mode === 'mock') sections = EXAM_SECTIONS;
    else if (mode === 'revision') sections = [EXAM_SECTIONS[0], EXAM_SECTIONS[4]];
    else sections = [EXAM_SECTIONS[0]];

    const marksPer = new Map(EXAM_SECTIONS.map(s => [s.id, s.marksPerQuestion] as const));
    let totalMarks = 0;
    for (const s of sections) {
      const base = marksPer.get(s.id) ?? s.marksPerQuestion;
      const per = mode === 'mock' ? Math.max(base, s.marksPerQuestion) : base;
      const count =
        mode === 'theory' || mode === 'mock'
          ? Math.ceil(questionCount / Math.max(sections.length, 1))
          : mode === 'short' || mode === 'long'
            ? Math.min(questionCount, mode === 'short' ? THEORY_SHORT_QUESTIONS.length : THEORY_LONG_QUESTIONS.length)
            : questionCount;
      totalMarks += per * count;
    }

    return {
      mode,
      title: opts.title || titles[mode],
      durationMinutes: mode === 'short' || mode === 'long' || mode === 'viva' || mode === 'lab' ? 0 : durationMinutes,
      totalMarks: Math.max(totalMarks, questionCount),
      moduleFilter: moduleFilter === 'all' ? undefined : moduleFilter,
      difficultyFilter: difficultyFilter === 'all' ? undefined : difficultyFilter,
      questionCount,
      sections,
    };
  },

  buildQuestionsForMode(config: ExamConfiguration): TheoryExamQuestion[] {
    const { mode, moduleFilter, difficultyFilter, questionCount = 15 } = config;
    const mod = moduleFilter;
    const diff = difficultyFilter;

    if (mode === 'short') {
      return shuffle(THEORY_SHORT_QUESTIONS.filter(q => !mod || q.moduleId === mod)).slice(0, questionCount);
    }
    if (mode === 'long') {
      return shuffle(THEORY_LONG_QUESTIONS.filter(q => !mod || q.moduleId === mod)).slice(0, questionCount);
    }
    if (mode === 'lab') {
      return shuffle(LAB_EXAM_SCENARIOS.filter(s => !mod || s.moduleId === mod))
        .slice(0, Math.min(questionCount, 3))
        .map(s => ({
          id: `${s.id}-lab`,
          section: 'D' as ExamSectionId,
          kind: 'short' as const,
          marks: 5,
          difficulty: s.difficulty,
          moduleId: s.moduleId,
          lessonId: undefined,
          topicTags: s.concepts,
          prompt: s.problemStatement,
          modelAnswer: s.modelSolutionNotes,
          markingPoints: s.checkpoints.map(c => c.label),
          explanation: s.modelSolutionNotes,
          source: 'bank' as const,
        }));
    }
    if (mode === 'viva') {
      const bank = getVivaBankInternal().filter(v => !mod || v.moduleId === mod);
      return shuffle(bank).slice(0, questionCount).map(v => ({
        id: v.id,
        section: 'B' as ExamSectionId,
        kind: 'short' as const,
        marks: 0,
        difficulty: v.difficulty,
        moduleId: v.moduleId,
        lessonId: v.lessonId,
        topicTags: [v.topic],
        prompt: v.question,
        modelAnswer: v.answer,
        markingPoints: [],
        explanation: v.answer,
        source: 'bank' as const,
      }));
    }

    const out: TheoryExamQuestion[] = [];
    const per = Math.max(1, Math.ceil(questionCount / 6));

    if (mode === 'theory' || mode === 'mock') {
      const mcq = pickBank('mcq', per, mod, diff).map(q => bankToTheory(q, 'A', 1));
      const shortPool = shuffle(THEORY_SHORT_QUESTIONS.filter(q => !mod || q.moduleId === mod)).slice(0, Math.max(1, Math.floor(per / 2)));
      const longPool = shuffle(THEORY_LONG_QUESTIONS.filter(q => !mod || q.moduleId === mod)).slice(0, Math.max(1, Math.floor(per / 3)));
      const analysis = pickBank('error-solving', Math.max(1, Math.floor(per / 2)), mod, diff).map(q => bankToTheory(q, 'D', 2));
      const outputs = pickBank('output-prediction', Math.max(1, Math.floor(per / 2)), mod, diff).map(q => bankToTheory(q, 'E', 2));
      const scenarios = pickBank('scenario', Math.max(1, Math.floor(per / 3)), mod, diff).map(q => bankToTheory(q, 'F', 4));
      out.push(...mcq, ...shortPool, ...longPool, ...analysis, ...outputs, ...scenarios);
      if (mode === 'mock' && out.length < questionCount) {
        const extra = pickBank(undefined, questionCount - out.length, mod, diff)
          .filter(q => !out.some(o => o.id === q.id))
          .map(q => bankToTheory(q, 'A', 1));
        out.push(...extra);
      }
      return out.slice(0, Math.max(questionCount, 12));
    }

    if (mode === 'code-analysis') {
      return pickBank('error-solving', questionCount, mod, diff).map(q => bankToTheory(q, 'D', 2));
    }
    if (mode === 'output') {
      return pickBank('output-prediction', questionCount, mod, diff).map(q => bankToTheory(q, 'E', 2));
    }
    if (mode === 'logic') {
      return pickBank('code-completion', questionCount, mod, diff).map(q => bankToTheory(q, 'D', 2));
    }
    if (mode === 'scenario') {
      return pickBank('scenario', questionCount, mod, diff).map(q => bankToTheory(q, 'F', 4));
    }
    if (mode === 'debugging') {
      const dbg = pickBank('debugging', questionCount, mod, diff);
      const mistakes = pickBank('error-solving', Math.max(0, questionCount - dbg.length), mod, diff);
      return [...dbg, ...mistakes].map(q => bankToTheory(q, 'D', 2));
    }
    if (mode === 'revision') {
      const weak = this.getRevisionPriorities();
      const tags = weak.map(w => w.tag);
      const pool = assessmentService.getAllQuestions().filter(q =>
        tags.length === 0 || q.topicTags.some(t => tags.some(w => t.toLowerCase().includes(w.toLowerCase()) || w.toLowerCase().includes(t.toLowerCase())))
      );
      return shuffle(pool.length > 0 ? pool : assessmentService.getAllQuestions())
        .slice(0, questionCount)
        .map(q => bankToTheory(q, q.type === 'output-prediction' ? 'E' : 'A', q.type === 'output-prediction' ? 2 : 1));
    }

    return pickBank(undefined, questionCount, mod, diff).map(q => bankToTheory(q, 'A', 1));
  },

  startAttempt(config: ExamConfiguration, questions: TheoryExamQuestion[]): ExamAttempt {
    const now = Date.now();
    const totalMarks = questions.reduce((s, q) => s + q.marks, 0) || config.totalMarks;
    const attempt: ExamAttempt = {
      id: `attempt-${now}-${Math.floor(Math.random() * 1e6)}`,
      config: { ...config, totalMarks },
      questions,
      answers: {},
      startedAt: now,
      deadlineAt: config.durationMinutes > 0 ? now + config.durationMinutes * 60_000 : null,
      submittedAt: null,
      completed: false,
    };
    this.saveActiveAttempt(attempt);
    return attempt;
  },

  loadActiveAttempt(): ExamAttempt | null {
    const raw = localStorage.getItem(ATTEMPT_KEY);
    const attempt = safeParse<ExamAttempt | null>(raw, null);
    if (!attempt || !Array.isArray(attempt.questions) || attempt.completed) return null;
    if (typeof attempt.startedAt !== 'number') return null;
    if (isExpired(attempt)) {
      return { ...attempt, deadlineAt: Date.now() };
    }
    return attempt;
  },

  saveActiveAttempt(attempt: ExamAttempt): void {
    try {
      localStorage.setItem(ATTEMPT_KEY, JSON.stringify(attempt));
    } catch {
      // quota — session continues in memory
    }
  },

  clearActiveAttempt(): void {
    localStorage.removeItem(ATTEMPT_KEY);
  },

  updateAnswer(attempt: ExamAttempt, questionId: string, entry: Partial<ExamAnswerEntry>): ExamAttempt {
    const prev = attempt.answers[questionId] || { questionId, response: '' };
    const next: ExamAttempt = {
      ...attempt,
      answers: {
        ...attempt.answers,
        [questionId]: { ...prev, ...entry, questionId },
      },
    };
    this.saveActiveAttempt(next);
    return next;
  },

  toggleMark(attempt: ExamAttempt, questionId: string): ExamAttempt {
    const prev = attempt.answers[questionId] || { questionId, response: '' };
    const nextMarked = !prev.markedForReview;
    return this.updateAnswer(attempt, questionId, { markedForReview: nextMarked });
  },

  remainingSeconds(attempt: ExamAttempt): number | null {
    if (!attempt.deadlineAt) return null;
    return Math.max(0, Math.floor((attempt.deadlineAt - Date.now()) / 1000));
  },

  gradeAttempt(attempt: ExamAttempt): ExamResultSummary {
    if (attempt.result) return attempt.result;
    const sectionBreakdown: ExamResultSummary['sectionBreakdown'] = {};
    const moduleBreakdown: ExamResultSummary['moduleBreakdown'] = {};
    const review: ExamReviewItem[] = [];
    let marksAwarded = 0;
    let totalMarks = 0;
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;
    let selfAssessed = 0;
    const topicScores: Record<string, { c: number; t: number }> = {};

    for (const q of attempt.questions) {
      const entry = attempt.answers[q.id];
      const response = (entry?.response || '').trim();
      totalMarks += q.marks;
      if (!sectionBreakdown[q.section]) sectionBreakdown[q.section] = { awarded: 0, possible: 0, count: 0 };
      sectionBreakdown[q.section].possible += q.marks;
      sectionBreakdown[q.section].count += 1;
      const modKey = q.moduleId || 'unknown';
      if (!moduleBreakdown[modKey]) moduleBreakdown[modKey] = { awarded: 0, possible: 0, count: 0 };
      moduleBreakdown[modKey].possible += q.marks;
      moduleBreakdown[modKey].count += 1;

      let awarded = 0;
      let isCorrect: boolean | null = null;
      let expected = q.modelAnswer;

      if (q.options && q.correctAnswer !== undefined) {
        expected = Array.isArray(q.correctAnswer) ? q.correctAnswer.join(' | ') : String(q.correctAnswer);
        if (!response) {
          unattempted += 1;
          isCorrect = null;
        } else {
          const ok = Array.isArray(q.correctAnswer)
            ? q.correctAnswer.includes(response)
            : q.correctAnswer === response;
          isCorrect = ok;
          awarded = ok ? q.marks : 0;
          if (ok) correct += 1;
          else incorrect += 1;
          for (const tag of q.topicTags) {
            if (!topicScores[tag]) topicScores[tag] = { c: 0, t: 0 };
            topicScores[tag].t += 1;
            if (ok) topicScores[tag].c += 1;
          }
        }
      } else {
        if (!response) {
          unattempted += 1;
          isCorrect = null;
        } else {
          const points = q.markingPoints.length;
          const hits = entry?.markingPointHits || [];
          const hitCount = hits.filter(h => h === 1).length;
          const claimed = typeof entry?.selfScore === 'number' ? entry.selfScore : hitCount;
          const ratio = points > 0 ? Math.min(points, Math.max(0, claimed)) / points : 0.5;
          awarded = Math.round(q.marks * ratio * 10) / 10;
          isCorrect = awarded >= q.marks * 0.5;
          selfAssessed += 1;
          if (awarded > 0) correct += isCorrect ? 1 : 0;
          if (!isCorrect) incorrect += 1;
          for (const tag of q.topicTags) {
            if (!topicScores[tag]) topicScores[tag] = { c: 0, t: 0 };
            topicScores[tag].t += 1;
            if (isCorrect) topicScores[tag].c += 1;
          }
        }
      }

      marksAwarded += awarded;
      sectionBreakdown[q.section].awarded += awarded;
      moduleBreakdown[modKey].awarded += awarded;

      review.push({
        questionId: q.id,
        prompt: q.prompt,
        studentResponse: response || '(unattempted)',
        expected,
        isCorrect,
        selfScore: entry?.selfScore,
        marksAwarded: awarded,
        marksPossible: q.marks,
        explanation: q.explanation,
        explanationUrdu: q.explanationUrdu,
        lessonId: lessonLinkFor(q.lessonId) ? q.lessonId : undefined,
        topicTags: q.topicTags,
      });
    }

    const percentage = totalMarks > 0 ? Math.round((marksAwarded / totalMarks) * 100) : 0;
    const weakTopics = Object.entries(topicScores)
      .filter(([, v]) => v.t >= 1 && v.c / v.t < 0.5)
      .map(([k]) => k);
    const strongTopics = Object.entries(topicScores)
      .filter(([, v]) => v.t >= 2 && v.c / v.t >= 0.8)
      .map(([k]) => k);

    for (const q of attempt.questions) {
      for (const tag of q.topicTags) {
        const ok = review.find(r => r.questionId === q.id)?.isCorrect;
        if (ok === true) {
          masteryService.recordPractice(tag, true);
          weakTopicService.recordSuccess(tag);
        } else if (ok === false) {
          masteryService.recordPractice(tag, false);
          weakTopicService.recordFailure(tag);
        }
      }
    }

    const xp = Math.max(0, Math.round(marksAwarded / 2));
    if (xp > 0) {
      progressService.addXp(xp);
      progressService.recordActivity('exam', `Exam Prep: ${attempt.config.title}`, xp);
    }
    progressService.recordQuizScore(`exam-prep-${attempt.config.mode}`, percentage);

    const result: ExamResultSummary = {
      marksAwarded: Math.round(marksAwarded * 10) / 10,
      totalMarks,
      percentage,
      correct,
      incorrect,
      unattempted,
      selfAssessed,
      sectionBreakdown,
      moduleBreakdown,
      review,
      weakTopics,
      strongTopics,
      xpAwarded: xp,
      gradedAt: Date.now(),
    };

    const submitted: ExamAttempt = {
      ...attempt,
      submittedAt: Date.now(),
      completed: true,
      result,
    };
    this.clearActiveAttempt();
    this.pushHistory(submitted);
    if (attempt.config.mode === 'revision') this.noteDiagnosticComplete(percentage);
    this.noteMissionProgress('review', percentage);
    if (attempt.config.mode === 'mock') this.noteMissionProgress('mock');
    return result;
  },

  pushHistory(attempt: ExamAttempt): void {
    const list = this.getHistory();
    const entry: ExamPrepRecentAttempt = {
      id: attempt.id,
      mode: attempt.config.mode,
      title: attempt.config.title,
      percentage: attempt.result?.percentage ?? 0,
      marksAwarded: attempt.result?.marksAwarded ?? 0,
      totalMarks: attempt.result?.totalMarks ?? attempt.config.totalMarks,
      submittedAt: attempt.submittedAt ?? Date.now(),
    };
    const next = [entry, ...list.filter(x => x.id !== entry.id)].slice(0, HISTORY_CAP);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  },

  getHistory(): ExamPrepRecentAttempt[] {
    return safeParse<ExamPrepRecentAttempt[]>(localStorage.getItem(HISTORY_KEY), []);
  },

  getVivaBank(): VivaBankItem[] {
    return getVivaBankInternal();
  },

  sampleViva(opts: { mode: 'topic' | 'random' | 'rapid' | 'module' | 'mock'; moduleId?: string; count?: number }): VivaBankItem[] {
    let pool = getVivaBankInternal();
    if (opts.mode === 'module' && opts.moduleId) pool = pool.filter(v => v.moduleId === opts.moduleId);
    const count = opts.count ?? (opts.mode === 'rapid' ? 8 : opts.mode === 'mock' ? 15 : 10);
    return shuffle(pool).slice(0, Math.min(count, pool.length));
  },

  loadVivaAttempts(): VivaAttempt[] {
    return safeParse<VivaAttempt[]>(localStorage.getItem(VIVA_KEY), []);
  },

  saveVivaAttempt(attempt: VivaAttempt): void {
    const list = this.loadVivaAttempts().filter(a => a.questionId !== attempt.questionId);
    const next = [attempt, ...list].slice(0, 200);
    localStorage.setItem(VIVA_KEY, JSON.stringify(next));
    if (attempt.rating) this.noteMissionProgress('viva');
  },

  getLabScenarios(): LabExamScenario[] {
    return LAB_EXAM_SCENARIOS;
  },

  getLabScenario(id: string): LabExamScenario | undefined {
    return LAB_EXAM_SCENARIOS.find(s => s.id === id);
  },

  loadLabState(scenarioId: string): LabAttemptState {
    const all = safeParse<Record<string, LabAttemptState>>(localStorage.getItem(LAB_KEY), {});
    return all[scenarioId] || {
      scenarioId,
      selectedChoices: {},
      completedCheckpoints: [],
      hintsUsed: 0,
      completed: false,
      completedAt: null,
    };
  },

  saveLabState(state: LabAttemptState): void {
    const all = safeParse<Record<string, LabAttemptState>>(localStorage.getItem(LAB_KEY), {});
    all[state.scenarioId] = state;
    localStorage.setItem(LAB_KEY, JSON.stringify(all));
  },

  evaluateLabCheckpoints(scenario: LabExamScenario, selectedChoices: Record<string, string[]>): {
    completed: LabCheckpoint[];
    pending: LabCheckpoint[];
    progress: number;
  } {
    const completed: LabCheckpoint[] = [];
    const pending: LabCheckpoint[] = [];
    for (const cp of scenario.checkpoints) {
      const selected = new Set(selectedChoices[cp.id] || []);
      const ok = cp.requiredChoices.every(id => selected.has(id));
      if (ok) completed.push(cp);
      else pending.push(cp);
    }
    const progress = scenario.checkpoints.length > 0
      ? Math.round((completed.length / scenario.checkpoints.length) * 100)
      : 0;
    return { completed, pending, progress };
  },

  loadTheoryState(): Record<string, { response: string; pointsClaimed: number[]; revealed: boolean; completedAt: number }> {
    const parsed = safeParse<unknown>(localStorage.getItem(THEORY_KEY), null);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return {};
    return parsed as Record<string, { response: string; pointsClaimed: number[]; revealed: boolean; completedAt: number }>;
  },

  saveTheoryState(state: Record<string, { response: string; pointsClaimed: number[]; revealed: boolean; completedAt: number }>): void {
    localStorage.setItem(THEORY_KEY, JSON.stringify(state));
    if (Object.values(state).some(s => s.revealed && s.completedAt)) {
      this.noteMissionProgress('theory');
    }
  },

  noteMissionProgress(objective: ExamPrepMissionObjectiveId, percentage?: number): void {
    const state = this.loadMission();
    if (state.completedObjectives.includes(objective)) {
      this.syncMission(state);
      return;
    }
    const order: ExamPrepMissionObjectiveId[] = ['diagnostic', 'theory', 'code-output', 'viva', 'mock', 'review'];
    const unlocked = order[state.unlockedIndex];
    if (unlocked !== objective && !(objective === 'review' && state.completedObjectives.includes('mock'))) {
      // allow review only after mock if that's the pending objective path
      if (order.indexOf(objective) > state.unlockedIndex) return;
    }
    const next: ExamPrepMissionState = {
      ...state,
      completedObjectives: [...state.completedObjectives, objective],
      unlockedIndex: Math.max(state.unlockedIndex, order.indexOf(objective) + 1),
      completedAt: null,
    };
    if (objective === 'diagnostic' && percentage !== undefined && percentage < 0) {
      // no-op guard
    }
    this.syncMission(next);
  },

  loadMission(): ExamPrepMissionState {
    return safeParse<ExamPrepMissionState>(localStorage.getItem(MISSION_KEY), {
      completedObjectives: [],
      unlockedIndex: 0,
      xpAwarded: false,
      completedAt: null,
    });
  },

  syncMission(state: ExamPrepMissionState): ExamPrepMissionState {
    const order: ExamPrepMissionObjectiveId[] = ['diagnostic', 'theory', 'code-output', 'viva', 'mock', 'review'];
    const allDone = order.every(id => state.completedObjectives.includes(id));
    let next = { ...state, unlockedIndex: Math.min(order.length, Math.max(state.unlockedIndex, state.completedObjectives.length)) };
    if (allDone && !next.xpAwarded) {
      next = { ...next, xpAwarded: true, completedAt: Date.now(), unlockedIndex: order.length };
      progressService.addXp(MISSION_XP);
      progressService.recordActivity('exam', 'Mission: Exam Ready', MISSION_XP);
    }
    localStorage.setItem(MISSION_KEY, JSON.stringify(next));
    return next;
  },

  getMissionXpTotal(): number {
    return MISSION_XP;
  },

  noteDiagnosticComplete(percentage?: number): void {
    this.noteMissionProgress('diagnostic', percentage ?? 0);
  },

  noteCodeOutputComplete(): void {
    this.noteMissionProgress('code-output');
  },

  getRevisionPriorities(): { tag: string; reason: string; reasonUrdu: string; source: 'incorrect' | 'mastery' | 'unfinished' | 'general' }[] {
    const out: { tag: string; reason: string; reasonUrdu: string; source: 'incorrect' | 'mastery' | 'unfinished' | 'general' }[] = [];
    const weakTopics: WeakTopic[] = weakTopicService.getWeakTopics();
    for (const w of weakTopics.filter(t => t.failedAttempts >= 2)) {
      out.push({
        tag: w.concept,
        reason: `${w.failedAttempts} failed attempts recorded`,
        reasonUrdu: `${w.failedAttempts} baar nakaami record hui`,
        source: 'incorrect',
      });
    }
    const masteryWeak: ConceptMastery[] = masteryService.getWeakConcepts();
    for (const m of masteryWeak.slice(0, 8)) {
      if (!out.some(o => o.tag === m.concept)) {
        out.push({
          tag: m.concept,
          reason: `Mastery ${m.score}% (low)`,
          reasonUrdu: `Mastery ${m.score}% (kam)`,
          source: 'mastery',
        });
      }
    }
    const unfinished = this.loadActiveAttempt();
    if (unfinished) {
      out.push({
        tag: unfinished.config.title,
        reason: 'Unfinished exam attempt waiting',
        reasonUrdu: 'Adhura exam attempt mojood hai',
        source: 'unfinished',
      });
    }
    if (out.length === 0) {
      out.push({
        tag: 'oop-basics',
        reason: 'No performance data yet — general diagnostic',
        reasonUrdu: 'Abhi koi performance data nahi — general diagnostic',
        source: 'general',
      });
    }
    return out;
  },

  getPrepStats(): {
    examStats: ReturnType<typeof progressService.getExamStats>;
    history: ExamPrepRecentAttempt[];
    overallMastery: number;
    weakTopicCount: number;
    hasActiveAttempt: boolean;
    curriculumModules: number;
    curriculumLessons: number;
    vivaCount: number;
    labCount: number;
    theoryShortCount: number;
    theoryLongCount: number;
    bankCount: number;
  } {
    const curriculum = curriculumService.getCurriculum();
    return {
      examStats: progressService.getExamStats(),
      history: this.getHistory().slice(0, 8),
      overallMastery: Math.round(masteryService.getOverallMastery()),
      weakTopicCount: weakTopicService.getWeakTopics().filter(t => t.failedAttempts >= 2).length
        + masteryService.getWeakConcepts().length,
      hasActiveAttempt: !!this.loadActiveAttempt(),
      curriculumModules: curriculum.modules.length,
      curriculumLessons: curriculum.totalLessons,
      vivaCount: getVivaBankInternal().length,
      labCount: LAB_EXAM_SCENARIOS.length,
      theoryShortCount: THEORY_SHORT_QUESTIONS.length,
      theoryLongCount: THEORY_LONG_QUESTIONS.length,
      bankCount: assessmentService.getTotalQuestionCount(),
    };
  },

  getModuleOptions(): { value: string; label: string }[] {
    const curriculum = curriculumService.getCurriculum();
    return [
      { value: 'all', label: 'All Modules' },
      ...curriculum.modules.map(m => ({ value: m.id, label: `M${m.id.split('-')[1]}: ${m.title}` })),
    ];
  },

  deterministicSample<T>(items: T[], seed: number, count: number): T[] {
    if (items.length <= count) return [...items];
    const rand = xorshift(seed);
    const idx = items.map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = rand() % (i + 1);
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return idx.slice(0, count).map(i => items[i]);
  },

  gradeTheorySelfAssessment(
    question: TheoryExamQuestion,
    response: string,
    pointsClaimed: number[]
  ): { awarded: number; possible: number; revealed: boolean } {
    if (!response.trim()) return { awarded: 0, possible: question.marks, revealed: false };
    const points = question.markingPoints.length || 1;
    const hits = pointsClaimed.filter(x => x === 1).length;
    const ratio = Math.min(hits, points) / points;
    return {
      awarded: Math.round(question.marks * ratio * 10) / 10,
      possible: question.marks,
      revealed: true,
    };
  },

  saveVivaRatingSummary(): { knew: number; partial: number; revision: number } {
    const attempts = this.loadVivaAttempts();
    return {
      knew: attempts.filter(a => a.rating === 'knew').length,
      partial: attempts.filter(a => a.rating === 'partial').length,
      revision: attempts.filter(a => a.rating === 'revision').length,
    };
  },

  isRating(value: string | null | undefined): value is VivaSelfRating {
    return value === 'knew' || value === 'partial' || value === 'revision';
  },
};
