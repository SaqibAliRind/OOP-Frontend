import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  GraduationCap,
  BookOpen,
  FileText,
  Code2,
  MonitorPlay,
  Puzzle,
  Layers,
  Bug,
  FlaskConical,
  Mic,
  ClipboardCheck,
  RefreshCw,
  Play,
  ArrowLeft,
  BarChart3,
  Target,
  History,
} from 'lucide-react';
import { Card, Badge, Button, Tabs, ProgressBar, Modal, EmptyState, Select } from '@/components/ui';
import { LanguageToggle } from '@/components/learning/LanguageToggle';
import { OutputQuestionUI } from '@/components/learning/OutputQuestionUI';
import { CodeCompletionUI } from '@/components/learning/CodeCompletionUI';
import { DebuggingLab } from '@/components/learning/DebuggingLab';
import { ScenarioChallengeUI } from '@/components/learning/ScenarioChallengeUI';
import { QuickCheck } from '@/components/learning/QuickCheck';
import {
  CountdownTimer,
  ExamWorkspace,
  QuestionNavigator,
  ExamResultPanel,
  ExamReviewList,
  TheorySelfAssessPanel,
  VivaRoomCard,
  LabExamPanel,
  ExamReadyMissionPanel,
  useBeforeUnloadWhen,
  useExamKeyboard,
} from '@/components/exam';
import { examPrepService, EXAM_SECTIONS } from '@/services/examPrepService';
import { assessmentService } from '@/services/assessmentService';
import { questionService } from '@/services/questionService';
import { useLanguage } from '@/contexts/LanguageContext';
import type {
  ExamPrepModeId,
  ExamAttempt,
  ExamResultSummary,
  VivaBankItem,
  LabExamScenario,
} from '@/types/examPrep';
import type { QuickCheckQuestion } from '@/types';

type DashboardTab = 'dashboard' | 'active' | 'theory' | 'code' | 'lab' | 'viva' | 'mock' | 'revision' | 'mission';

interface ModeCardDef {
  id: ExamPrepModeId;
  label: string;
  labelUrdu: string;
  description: string;
  descriptionUrdu: string;
  icon: typeof BookOpen;
  color: string;
  onStart: () => void;
}

export function ExamPrepPage() {
  const { language } = useLanguage();
  const [attempt, setAttempt] = useState<ExamAttempt | null>(() => examPrepService.loadActiveAttempt());
  const [tab, setTab] = useState<DashboardTab>(() => examPrepService.loadActiveAttempt() ? 'active' : 'dashboard');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<ExamResultSummary | null>(null);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [theoryState, setTheoryState] = useState(() => examPrepService.loadTheoryState());
  const [theoryIndex, setTheoryIndex] = useState(0);
  const [theoryKind, setTheoryKind] = useState<'short' | 'long'>('short');
  const [vivaItems, setVivaItems] = useState<VivaBankItem[]>([]);
  const [vivaIndex, setVivaIndex] = useState(0);
  const [vivaMode, setVivaMode] = useState<'topic' | 'random' | 'rapid' | 'module' | 'mock'>('random');
  const [vivaModule, setVivaModule] = useState('all');
  const [labScenario, setLabScenario] = useState<LabExamScenario | null>(null);
  const [reviewOnlyIncorrect, setReviewOnlyIncorrect] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [missionState, setMissionState] = useState(() => examPrepService.loadMission());
  const [configModule, setConfigModule] = useState('all');
  const [configDifficulty, setConfigDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [configCount, setConfigCount] = useState(15);
  const [configMinutes, setConfigMinutes] = useState(45);
  const [pendingMode, setPendingMode] = useState<ExamPrepModeId | null>(null);
  const submittingRef = useRef(false);

  const stats = useMemo(() => examPrepService.getPrepStats(), [tab, missionState]);
  const moduleOptions = useMemo(() => examPrepService.getModuleOptions(), []);
  const revisionPriorities = useMemo(() => examPrepService.getRevisionPriorities(), [tab, missionState]);
  const activeQuestion = attempt?.questions[currentIndex];

  useBeforeUnloadWhen(!!attempt && !attempt.completed, 'You have an unfinished exam. Leave anyway?');
  useExamKeyboard(
    () => {
      if (!attempt || attempt.completed) return;
      if (currentIndex < attempt.questions.length - 1) setCurrentIndex(i => i + 1);
    },
    () => setCurrentIndex(i => Math.max(0, i - 1))
  );

  const refreshMission = useCallback(() => setMissionState(examPrepService.loadMission()), []);

  const startExam = useCallback(
    (mode: ExamPrepModeId) => {
      const config = examPrepService.buildExamConfiguration(mode, {
        moduleFilter: configModule,
        difficultyFilter: configDifficulty,
        durationMinutes: configMinutes,
        questionCount: configCount,
      });
      const questions = examPrepService.buildQuestionsForMode(config);
      if (questions.length === 0) return;
      const next = examPrepService.startAttempt(config, questions);
      setAttempt(next);
      setCurrentIndex(0);
      setResult(null);
      setSubmitting(false);
      submittingRef.current = false;
      setTab('active');
      setPendingMode(null);
    },
    [configModule, configDifficulty, configMinutes, configCount]
  );

  const handleAnswer = useCallback(
    (response: string) => {
      if (!attempt || submitting) return;
      const q = attempt.questions[currentIndex];
      if (!q) return;
      const next = examPrepService.updateAnswer(attempt, q.id, { response });
      setAttempt(next);
    },
    [attempt, currentIndex, submitting]
  );

  const handleSubmit = useCallback(
    (force = false) => {
      if (!attempt || attempt.completed) return;
      if (!force) {
        setConfirmSubmit(true);
        return;
      }
      if (submittingRef.current) return;
      submittingRef.current = true;
      setSubmitting(true);
      setConfirmSubmit(false);
      const graded = examPrepService.gradeAttempt(attempt);
      setResult(graded);
      setAttempt({ ...attempt, completed: true, result: graded });
      const answeredCodes = attempt.questions.filter(q => {
        if (q.kind !== 'output' && q.kind !== 'code-analysis') return false;
        const a = attempt.answers[q.id]?.response;
        return !!a && a.trim().length > 0;
      });
      if (answeredCodes.length > 0) {
        examPrepService.noteCodeOutputComplete();
      }
      refreshMission();
      setTab('dashboard');
    },
    [attempt, refreshMission]
  );

  const handleSubmitRef = useRef(handleSubmit);
  useEffect(() => {
    handleSubmitRef.current = handleSubmit;
  }, [handleSubmit]);

  useEffect(() => {
    if (!attempt || attempt.completed) return;
    if (attempt.deadlineAt && Date.now() > attempt.deadlineAt && !submittingRef.current) {
      handleSubmitRef.current(true);
    }
  }, [attempt?.id, attempt?.completed, attempt?.deadlineAt]);

  const toggleMark = useCallback(() => {
    if (!attempt) return;
    const q = attempt.questions[currentIndex];
    if (!q) return;
    setAttempt(examPrepService.toggleMark(attempt, q.id));
  }, [attempt, currentIndex]);

  const answeredSet = useMemo(() => {
    const s = new Set<string>();
    if (!attempt) return s;
    for (const [id, e] of Object.entries(attempt.answers)) {
      if (e.response && e.response.trim()) s.add(id);
    }
    return s;
  }, [attempt]);

  const markedSet = useMemo(() => {
    const s = new Set<string>();
    if (!attempt) return s;
    for (const [id, e] of Object.entries(attempt.answers)) {
      if (e.markedForReview) s.add(id);
    }
    return s;
  }, [attempt]);

  const startViva = useCallback((mode: typeof vivaMode) => {
    const items = examPrepService.sampleViva({
      mode,
      moduleId: vivaModule === 'all' ? undefined : vivaModule,
      count: mode === 'rapid' ? 8 : mode === 'mock' ? 15 : 10,
    });
    setVivaMode(mode);
    setVivaItems(items);
    setVivaIndex(0);
    setTab('viva');
  }, [vivaModule]);

  const startTheoryPractice = useCallback((kind: 'short' | 'long') => {
    setTheoryKind(kind);
    setTheoryIndex(0);
    setTab('theory');
  }, []);

  const updateTheory = useCallback(
    (questionId: string, patch: Partial<{ response: string; pointsClaimed: number[]; revealed: boolean; completedAt: number }>) => {
      setTheoryState(prev => {
        const base = prev[questionId] || { response: '', pointsClaimed: [], revealed: false, completedAt: 0 };
        const next = { ...prev, [questionId]: { ...base, ...patch } };
        examPrepService.saveTheoryState(next);
        return next;
      });
      refreshMission();
    },
    [refreshMission]
  );

  const theoryQuestions = useMemo(() => {
    const short = examPrepService.buildQuestionsForMode(
      examPrepService.buildExamConfiguration('short', { moduleFilter: configModule, questionCount: 99 })
    );
    const long = examPrepService.buildQuestionsForMode(
      examPrepService.buildExamConfiguration('long', { moduleFilter: configModule, questionCount: 99 })
    );
    return theoryKind === 'short' ? short : long;
  }, [theoryKind, configModule]);

  const diagnosticMode = useMemo(() => {
    return (
      <ModeLauncher
        language={language}
        onStart={() => startExam('revision')}
        label={language === 'ur' ? 'Diagnostic / Weak Topic Quiz shuru' : 'Start diagnostic / weak-topic quiz'}
        description={
          language === 'ur'
            ? 'Agar performance data nahi to general diagnostic; warna weak topics par focus.'
            : 'General diagnostic if no performance data exists; otherwise prioritized weak topics.'
        }
      />
    );
  }, [language, startExam]);

  const modeCards: ModeCardDef[] = [
    {
      id: 'theory',
      label: 'Theory Exam Practice',
      labelUrdu: 'Theory Exam',
      description: 'Sections A–F university-style theory paper practice',
      descriptionUrdu: 'Sections A–F theory paper practice',
      icon: FileText,
      color: 'var(--color-accent-primary)',
      onStart: () => setPendingMode('theory'),
    },
    {
      id: 'short',
      label: 'Short Question Practice',
      labelUrdu: 'Short Questions',
      description: 'Definitions, differences, rules — model answers + marking points',
      descriptionUrdu: 'Tareef, farq, rules — model answers + marking points',
      icon: BookOpen,
      color: 'var(--color-accent-secondary)',
      onStart: () => startTheoryPractice('short'),
    },
    {
      id: 'long',
      label: 'Long Question Practice',
      labelUrdu: 'Long Questions',
      description: 'Detailed OOP essays with self-assessment rubrics',
      descriptionUrdu: 'Tafseeli OOP essays self-assessment ke sath',
      icon: FileText,
      color: 'var(--color-accent-secondary)',
      onStart: () => startTheoryPractice('long'),
    },
    {
      id: 'code-analysis',
      label: 'Java Code Analysis',
      labelUrdu: 'Code Analysis',
      description: 'Identify errors and explain code behavior',
      descriptionUrdu: 'Ghalatian pehchanein aur code samjhein',
      icon: Code2,
      color: 'var(--color-accent-success)',
      onStart: () => setPendingMode('code-analysis'),
    },
    {
      id: 'output',
      label: 'Output Prediction',
      labelUrdu: 'Output Prediction',
      description: 'Predict printed output of Java snippets',
      descriptionUrdu: 'Java snippets ka output batayein',
      icon: MonitorPlay,
      color: 'var(--color-accent-warning)',
      onStart: () => setPendingMode('output'),
    },
    {
      id: 'logic',
      label: 'Programming Logic Challenges',
      labelUrdu: 'Programming Logic',
      description: 'Code completion and logic selection',
      descriptionUrdu: 'Code completion aur logic chunna',
      icon: Puzzle,
      color: 'var(--color-accent-primary)',
      onStart: () => setPendingMode('logic'),
    },
    {
      id: 'scenario',
      label: 'Scenario-Based Questions',
      labelUrdu: 'Scenario Questions',
      description: 'Design and architecture scenarios',
      descriptionUrdu: 'Design aur architecture scenarios',
      icon: Layers,
      color: 'var(--color-accent-secondary)',
      onStart: () => setPendingMode('scenario'),
    },
    {
      id: 'debugging',
      label: 'Debugging Exam',
      labelUrdu: 'Debugging Exam',
      description: 'Find and fix conceptual bugs',
      descriptionUrdu: 'Ghalatian dhoondhein aur theek karein',
      icon: Bug,
      color: 'var(--color-accent-error)',
      onStart: () => setPendingMode('debugging'),
    },
    {
      id: 'lab',
      label: 'Lab Examination Practice',
      labelUrdu: 'Lab Exam',
      description: 'Guided checkpoints, hints, model solutions',
      descriptionUrdu: 'Checkpoints, hints, model solutions',
      icon: FlaskConical,
      color: 'var(--color-accent-success)',
      onStart: () => {
        setLabScenario(examPrepService.getLabScenarios()[0] || null);
        setTab('lab');
      },
    },
    {
      id: 'viva',
      label: 'Viva Preparation',
      labelUrdu: 'Viva Prep',
      description: 'Topic, random, rapid-fire, module & mock viva',
      descriptionUrdu: 'Topic, random, rapid-fire, module & mock viva',
      icon: Mic,
      color: 'var(--color-xp-gold)',
      onStart: () => startViva('random'),
    },
    {
      id: 'mock',
      label: 'Full Mock Examination',
      labelUrdu: 'Full Mock Exam',
      description: 'Configurable sections, timer, marks & review',
      descriptionUrdu: 'Sections, timer, marks & review',
      icon: ClipboardCheck,
      color: 'var(--color-accent-error)',
      onStart: () => setPendingMode('mock'),
    },
    {
      id: 'revision',
      label: 'Weak Topic Revision',
      labelUrdu: 'Weak Topic Revision',
      description: 'Adaptive priorities from your real learning data',
      descriptionUrdu: 'Aap ke asal data se adaptive priorities',
      icon: RefreshCw,
      color: 'var(--color-xp-gold)',
      onStart: () => setPendingMode('revision'),
    },
  ];

  const sectionOf = (index: number): string => {
    if (!attempt) return '—';
    return attempt.questions[index]?.section || '—';
  };

  const footerExam = attempt && !attempt.completed && (
    <div className="flex flex-wrap gap-2">
      <Button variant="danger" onClick={() => setConfirmSubmit(true)} disabled={submitting}>
        {language === 'ur' ? 'Submit Exam' : 'Submit Exam'}
      </Button>
      <span className="text-xs text-[var(--color-text-tertiary)] self-center">
        {language === 'ur' ? 'Progress khud save hoti hai (localStorage).' : 'Progress auto-saves (localStorage).'}
      </span>
    </div>
  );

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[var(--color-accent-primary)]" />
            <h1 className="text-xl font-display font-bold text-[var(--color-text-primary)]">
              {language === 'ur' ? 'University Exam & Viva Preparation Center' : 'University Exam & Viva Preparation Center'}
            </h1>
            <Badge variant="secondary" size="sm">Exam Prep</Badge>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1 max-w-2xl">
            {language === 'ur'
              ? 'Theory, short/long, code, output, lab, viva, mock aur weak revision — deterministic educational validation. Koi university past-paper claim nahi.'
              : 'Theory, short/long, code, output, lab, viva, mock, and weak-topic revision — deterministic educational validation. No university past-paper claims.'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="xp" size="md">
            {stats.examStats.totalExams} {language === 'ur' ? 'exams' : 'exams'} · {stats.examStats.bestScore}% best
          </Badge>
          <LanguageToggle />
        </div>
      </header>

      <Tabs
        tabs={[
          { id: 'dashboard', label: language === 'ur' ? 'Dashboard' : 'Dashboard', icon: BarChart3 },
          { id: 'active', label: language === 'ur' ? 'Active Exam' : 'Active Exam', icon: Play, badge: attempt && !attempt.completed ? '!' : undefined },
          { id: 'theory', label: language === 'ur' ? 'Theory' : 'Theory', icon: FileText },
          { id: 'code', label: language === 'ur' ? 'Code Modes' : 'Code Modes', icon: Code2 },
          { id: 'lab', label: language === 'ur' ? 'Lab' : 'Lab', icon: FlaskConical },
          { id: 'viva', label: language === 'ur' ? 'Viva Room' : 'Viva Room', icon: Mic },
          { id: 'mock', label: language === 'ur' ? 'Mock' : 'Mock', icon: ClipboardCheck },
          { id: 'revision', label: language === 'ur' ? 'Revision' : 'Revision', icon: RefreshCw },
          { id: 'mission', label: language === 'ur' ? 'Mission' : 'Mission', icon: Target },
        ]}
        defaultTab="dashboard"
        onChange={t => setTab(t as DashboardTab)}
        variant="pills"
      >
        {activeTab => {
          if (activeTab === 'dashboard') {
            return (
              <div className="space-y-5">
                <div className="grid md:grid-cols-4 gap-3">
                  <StatCard label={language === 'ur' ? 'Bank questions' : 'Bank questions'} value={String(stats.bankCount)} />
                  <StatCard label={language === 'ur' ? 'Viva questions' : 'Viva questions'} value={String(stats.vivaCount)} />
                  <StatCard label={language === 'ur' ? 'Lab scenarios' : 'Lab scenarios'} value={String(stats.labCount)} />
                  <StatCard label={language === 'ur' ? 'Overall mastery' : 'Overall mastery'} value={`${stats.overallMastery}%`} />
                </div>

                <div className="grid md:grid-cols-3 gap-3">
                  <Card padding="md" className="space-y-2">
                    <p className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase">
                      {language === 'ur' ? 'Curriculum coverage' : 'Curriculum coverage'}
                    </p>
                    <p className="text-sm text-[var(--color-text-primary)]">
                      {stats.curriculumModules} {language === 'ur' ? 'modules' : 'modules'} · {stats.curriculumLessons}{' '}
                      {language === 'ur' ? 'lessons' : 'lessons'}
                    </p>
                    <ProgressBar value={stats.overallMastery} label={language === 'ur' ? 'Mastery' : 'Mastery'} variant="primary" />
                  </Card>
                  <Card padding="md" className="space-y-2">
                    <p className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase">
                      {language === 'ur' ? 'Practice accuracy' : 'Practice accuracy'}
                    </p>
                    <p className="text-sm text-[var(--color-text-primary)]">
                      {stats.examStats.totalExams === 0
                        ? (language === 'ur' ? 'Abhi koi attempt nahi — empty state' : 'No attempts yet — empty state')
                        : `${language === 'ur' ? 'Avg' : 'Avg'} ${stats.examStats.averageScore}% · ${
                            language === 'ur' ? 'Best' : 'Best'
                          } ${stats.examStats.bestScore}%`}
                    </p>
                    <p className="text-xs text-[var(--color-text-tertiary)]">
                      {language === 'ur' ? 'Weak topics' : 'Weak topics'}: {stats.weakTopicCount}
                    </p>
                  </Card>
                  <Card padding="md" className="space-y-2">
                    <p className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase">
                      {language === 'ur' ? 'Continue / actions' : 'Continue / actions'}
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {stats.hasActiveAttempt && (
                        <Button size="sm" variant="primary" onClick={() => setTab('active')} leftIcon={<Play className="w-3.5 h-3.5" />}>
                          {language === 'ur' ? 'Adhura exam continue' : 'Continue unfinished exam'}
                        </Button>
                      )}
                      <Button size="sm" variant="outline" onClick={() => setPendingMode('mock')}>
                        {language === 'ur' ? 'Mock exam shuru' : 'Start mock exam'}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => startViva('random')}>
                        {language === 'ur' ? 'Viva practice' : 'Start viva practice'}
                      </Button>
                      {result || stats.history[0] ? (
                        <Button size="sm" variant="ghost" onClick={() => setShowReview(true)}>
                          {language === 'ur' ? 'Ghalat jawab review' : 'Review incorrect answers'}
                        </Button>
                      ) : null}
                    </div>
                  </Card>
                </div>

                <Card padding="md" className="space-y-3">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                    {language === 'ur' ? 'Available exam modes' : 'Available exam modes'}
                  </p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {modeCards.map(m => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={m.onStart}
                        className="text-left p-3 rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)] hover:border-[var(--color-accent-primary)]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
                      >
                        <div className="flex items-start gap-2">
                          <m.icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: m.color }} />
                          <div>
                            <p className="text-sm font-medium text-[var(--color-text-primary)]">
                              {language === 'ur' ? m.labelUrdu : m.label}
                            </p>
                            <p className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">
                              {language === 'ur' ? m.descriptionUrdu : m.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </Card>

                <div className="grid lg:grid-cols-2 gap-4">
                  <Card padding="md" className="space-y-3">
                    <p className="text-sm font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                      <History className="w-4 h-4 text-[var(--color-accent-primary)]" />
                      {language === 'ur' ? 'Recent attempts' : 'Recent attempts'}
                    </p>
                    {stats.history.length === 0 ? (
                      <EmptyExamState
                        title={language === 'ur' ? 'Abhi koi exam attempt nahi' : 'No exam attempts yet'}
                        description={language === 'ur' ? 'Koi bhi mode start karke pehla attempt karein.' : 'Start any mode to record your first attempt.'}
                      />
                    ) : (
                      <ul className="space-y-2">
                        {stats.history.map(h => (
                          <li key={h.id} className="flex items-center justify-between gap-2 text-sm p-2 rounded bg-[var(--color-bg-input)]">
                            <div className="min-w-0">
                              <p className="text-[var(--color-text-primary)] truncate">{h.title}</p>
                              <p className="text-[11px] text-[var(--color-text-tertiary)]">
                                {new Date(h.submittedAt).toLocaleString()}
                              </p>
                            </div>
                            <Badge variant={h.percentage >= 70 ? 'success' : h.percentage >= 50 ? 'warning' : 'error'} size="sm">
                              {h.percentage}%
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Card>

                  <Card padding="md" className="space-y-3">
                    <p className="text-sm font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                      <Target className="w-4 h-4 text-[var(--color-xp-gold)]" />
                      {language === 'ur' ? 'Module-wise preparation' : 'Module-wise preparation'}
                    </p>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {moduleOptions.filter(m => m.value !== 'all').map(m => {
                        const count = assessmentService.getQuestionsByModule(m.value).length;
                        const mastery = stats.overallMastery;
                        return (
                          <div key={m.value} className="flex items-center gap-2 text-xs">
                            <span className="w-40 truncate text-[var(--color-text-secondary)]">{m.label}</span>
                            <ProgressBar value={Math.min(100, count)} max={80} className="flex-1" size="sm" />
                            <span className="font-mono text-[var(--color-text-tertiary)] w-8">{count}q</span>
                            <span className="font-mono text-[var(--color-text-tertiary)] w-8">{mastery}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                </div>
              </div>
            );
          }

          if (activeTab === 'active') {
            if (result) {
              return (
                <div className="space-y-4">
                  <ExamResultPanel
                    result={result}
                    title={result.review.length > 0 ? (language === 'ur' ? 'Exam Result' : 'Exam Result') : (language === 'ur' ? 'Exam Result' : 'Exam Result')}
                    onReviewIncorrect={() => {
                      setReviewOnlyIncorrect(true);
                      setShowReview(true);
                    }}
                    onRetry={() => {
                      setResult(null);
                      setAttempt(null);
                      examPrepService.clearActiveAttempt();
                      setTab('dashboard');
                    }}
                    onBack={() => setTab('dashboard')}
                  />
                </div>
              );
            }
            if (!attempt || attempt.completed || !activeQuestion) {
              return (
                <EmptyExamState
                  title={language === 'ur' ? 'Koi active exam nahi' : 'No active exam'}
                  description={
                    language === 'ur'
                      ? stats.hasActiveAttempt
                        ? 'Saved attempt load karne ki koshish karein.'
                          : 'Dashboard se koi exam mode start karein.'
                      : stats.hasActiveAttempt
                        ? 'Try loading your saved attempt.'
                        : 'Start an exam mode from the dashboard.'
                  }
                  action={{
                    label: language === 'ur' ? 'Dashboard' : 'Go to dashboard',
                    onClick: () => setTab('dashboard'),
                  }}
                />
              );
            }

            const sectionMeta = EXAM_SECTIONS.find(s => s.id === activeQuestion.section);
            const entry = attempt.answers[activeQuestion.id];

            return (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" onClick={() => setTab('dashboard')} leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
                      {language === 'ur' ? 'Dashboard' : 'Dashboard'}
                    </Button>
                    <Badge variant="primary" size="sm">{attempt.config.title}</Badge>
                    <Badge variant="outline" size="sm">
                      {language === 'ur' ? 'Section' : 'Section'} {activeQuestion.section}
                    </Badge>
                  </div>
                  <CountdownTimer
                    deadlineAt={attempt.deadlineAt}
                    onExpire={() => handleSubmit(true)}
                  />
                </div>

                <ExamWorkspace
                  sectionLabel={`${activeQuestion.section} · ${sectionMeta?.title || activeQuestion.kind}`}
                  questionNumber={currentIndex + 1}
                  totalQuestions={attempt.questions.length}
                  marks={activeQuestion.marks}
                  prompt={activeQuestion.prompt}
                  codeSnippet={activeQuestion.codeSnippet}
                  options={activeQuestion.options}
                  selected={entry?.response}
                  freeText={entry?.response}
                  marked={!!entry?.markedForReview}
                  onSelectOption={handleAnswer}
                  onFreeTextChange={handleAnswer}
                  onToggleMark={toggleMark}
                  onPrev={() => setCurrentIndex(i => Math.max(0, i - 1))}
                  onNext={() => setCurrentIndex(i => Math.min(attempt.questions.length - 1, i + 1))}
                  canPrev={currentIndex > 0}
                  canNext={currentIndex < attempt.questions.length - 1}
                  onSubmit={() => setConfirmSubmit(true)}
                  navigator={
                    <QuestionNavigator
                      total={attempt.questions.length}
                      currentIndex={currentIndex}
                      answered={answeredSet}
                      marked={markedSet}
                      questionIds={attempt.questions.map(q => q.id)}
                      onJump={setCurrentIndex}
                      sectionOf={sectionOf}
                    />
                  }
                  footerExtra={footerExam}
                />

                <Modal
                  isOpen={confirmSubmit}
                  onClose={() => setConfirmSubmit(false)}
                  title={language === 'ur' ? 'Exam jama karein?' : 'Submit exam?'}
                  size="sm"
                >
                  <div className="space-y-4">
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {language === 'ur'
                        ? `Aap ne ${answeredSet.size}/${attempt.questions.length} sawalon ka jawab diya hai. Final submission ke baad answers change nahi honge.`
                        : `You answered ${answeredSet.size}/${attempt.questions.length} questions. After final submission, answers cannot be changed.`}
                    </p>
                    <div className="flex gap-2 justify-end">
                      <Button variant="ghost" onClick={() => setConfirmSubmit(false)}>
                        {language === 'ur' ? 'Cancel' : 'Cancel'}
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleSubmit(true)}
                        disabled={submitting}
                      >
                        {submitting
                          ? (language === 'ur' ? 'Grading...' : 'Grading...')
                          : (language === 'ur' ? 'Final Submit' : 'Final Submit')}
                      </Button>
                    </div>
                  </div>
                </Modal>
              </div>
            );
          }

          if (activeTab === 'theory') {
            const q = theoryQuestions[theoryIndex];
            if (!q) {
              return (
                <EmptyExamState
                  title={language === 'ur' ? 'Koi theory question nahi' : 'No theory questions'}
                  description={language === 'ur' ? 'Module filter badlein.' : 'Try a different module filter.'}
                />
              );
            }
            const st = theoryState[q.id] || { response: '', pointsClaimed: [], revealed: false, completedAt: 0 };
            return (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="primary" size="sm">{theoryKind === 'short' ? 'Section B · Short' : 'Section C · Long'}</Badge>
                    <Badge variant="secondary" size="sm">{q.marks} marks</Badge>
                    <Badge variant="outline" size="sm">{theoryIndex + 1}/{theoryQuestions.length}</Badge>
                    <Badge variant="warning" size="sm">{q.difficulty}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant={theoryKind === 'short' ? 'primary' : 'outline'} onClick={() => startTheoryPractice('short')}>
                      {language === 'ur' ? 'Short' : 'Short'}
                    </Button>
                    <Button size="sm" variant={theoryKind === 'long' ? 'primary' : 'outline'} onClick={() => startTheoryPractice('long')}>
                      {language === 'ur' ? 'Long' : 'Long'}
                    </Button>
                  </div>
                </div>

                <Card padding="lg" className="space-y-4">
                  <p className="text-[15px] leading-relaxed text-[var(--color-text-primary)]" tabIndex={0}>
                    {language === 'ur' && q.promptUrdu ? q.promptUrdu : q.prompt}
                  </p>
                  <div>
                    <label htmlFor="theory-response" className="text-sm text-[var(--color-text-secondary)]">
                      {language === 'ur' ? 'Apna jawab likhein' : 'Write your answer'}
                    </label>
                    <textarea
                      id="theory-response"
                      value={st.response}
                      onChange={e => updateTheory(q.id, { response: e.target.value })}
                      rows={theoryKind === 'long' ? 12 : 6}
                      className="mt-1 w-full p-3 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-bg-input)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)]"
                      placeholder={language === 'ur' ? 'Key points ya tafseel...' : 'Key points or detail...'}
                    />
                  </div>
                  <TheorySelfAssessPanel
                    questionId={q.id}
                    modelAnswer={q.modelAnswer}
                    modelAnswerUrdu={q.modelAnswerUrdu}
                    markingPoints={q.markingPoints}
                    markingPointsUrdu={q.markingPointsUrdu}
                    response={st.response}
                    pointsClaimed={st.pointsClaimed}
                    revealed={st.revealed}
                    onTogglePoint={idx => {
                      const pts = [...st.pointsClaimed];
                      while (pts.length < q.markingPoints.length) pts.push(0);
                      pts[idx] = pts[idx] === 1 ? 0 : 1;
                      updateTheory(q.id, {
                        pointsClaimed: pts,
                        revealed: true,
                        completedAt: Date.now(),
                      });
                    }}
                    onReveal={() => updateTheory(q.id, { revealed: true, completedAt: Date.now() })}
                    onReset={() => updateTheory(q.id, { pointsClaimed: [], revealed: false, completedAt: 0 })}
                  />
                  <div className="flex justify-between">
                    <Button size="sm" variant="outline" onClick={() => setTheoryIndex(i => Math.max(0, i - 1))} disabled={theoryIndex === 0}>
                      ← {language === 'ur' ? 'Pichla' : 'Previous'}
                    </Button>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => setTheoryIndex(i => Math.min(theoryQuestions.length - 1, i + 1))}
                      disabled={theoryIndex >= theoryQuestions.length - 1}
                    >
                      {language === 'ur' ? 'Agla' : 'Next'} →
                    </Button>
                  </div>
                  <p className="text-[11px] text-[var(--color-text-tertiary)]">
                    {language === 'ur'
                      ? 'Model answer + marking points ke sath self-assessment. Arbitrary free-text ka AI grading claim nahi.'
                      : 'Self-assessment with model answer + marking points. No AI grading claim for arbitrary free text.'}
                  </p>
                </Card>
              </div>
            );
          }

          if (activeTab === 'code') {
            return (
              <CodeModesSection
                language={language}
                onStart={mode => setPendingMode(mode)}
                onMissionNote={() => {
                  examPrepService.noteCodeOutputComplete();
                  refreshMission();
                }}
              />
            );
          }

          if (activeTab === 'lab') {
            const scenarios = examPrepService.getLabScenarios();
            if (!labScenario) {
              return (
                <div className="space-y-4">
                  <EmptyExamState
                    title={language === 'ur' ? 'Lab scenario chunein' : 'Choose a lab scenario'}
                    description={`${scenarios.length} ${language === 'ur' ? 'labs available' : 'labs available'}`}
                  />
                  <div className="grid sm:grid-cols-2 gap-3">
                    {scenarios.map(s => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setLabScenario(s)}
                        className="text-left p-4 rounded-xl border border-[var(--color-border-primary)] hover:border-[var(--color-accent-success)]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
                      >
                        <p className="font-medium text-[var(--color-text-primary)]">{language === 'ur' ? s.titleUrdu : s.title}</p>
                        <p className="text-xs text-[var(--color-text-tertiary)] mt-1 line-clamp-2">
                          {language === 'ur' ? s.problemStatementUrdu : s.problemStatement}
                        </p>
                        <div className="mt-2 flex gap-1.5">
                          <Badge variant="warning" size="sm">{s.difficulty}</Badge>
                          <Badge variant="secondary" size="sm">{s.moduleId}</Badge>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <div className="space-y-3">
                <Button size="sm" variant="ghost" onClick={() => setLabScenario(null)} leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
                  {language === 'ur' ? 'Sab labs' : 'All labs'}
                </Button>
                <LabExamPanel
                  scenario={labScenario}
                  onComplete={() => refreshMission()}
                />
              </div>
            );
          }

          if (activeTab === 'viva') {
            if (vivaItems.length === 0) {
              return (
                <div className="space-y-4">
                  <Card padding="lg" className="space-y-4">
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {language === 'ur'
                        ? 'Viva room: topic, random, rapid-fire, module-wise ya mock session chunein. Speech evaluation nahi — aap khud rating dete hain.'
                        : 'Viva room: topic, random, rapid-fire, module-wise, or mock session. No speech evaluation — you self-rate.'}
                    </p>
                    <div className="flex flex-wrap gap-2 items-end">
                      <label className="text-xs text-[var(--color-text-tertiary)]">
                        {language === 'ur' ? 'Module' : 'Module'}
                        <Select
                          value={vivaModule}
                          onChange={e => setVivaModule(e.target.value)}
                          options={moduleOptions}
                          className="mt-1"
                        />
                      </label>
                      <Button variant="primary" onClick={() => startViva('topic')} leftIcon={<Mic className="w-4 h-4" />}>
                        {language === 'ur' ? 'Topic-based' : 'Topic-based'}
                      </Button>
                      <Button variant="outline" onClick={() => startViva('random')}>
                        {language === 'ur' ? 'Random' : 'Random viva'}
                      </Button>
                      <Button variant="outline" onClick={() => startViva('rapid')}>
                        {language === 'ur' ? 'Rapid-fire' : 'Rapid-fire round'}
                      </Button>
                      <Button variant="outline" onClick={() => startViva('module')}>
                        {language === 'ur' ? 'Module-wise' : 'Module-wise'}
                      </Button>
                      <Button variant="outline" onClick={() => startViva('mock')}>
                        {language === 'ur' ? 'Mock session' : 'Mock viva session'}
                      </Button>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-2">
                      <StatCard label={language === 'ur' ? 'Total viva Qs' : 'Total viva Qs'} value={String(stats.vivaCount)} />
                      <StatCard label={language === 'ur' ? 'Bank available' : 'Bank available'} value={String(stats.vivaCount)} />
                      <StatCard
                        label={language === 'ur' ? 'Weak (revision)' : 'Need revision'}
                        value={String(examPrepService.saveVivaRatingSummary().revision)}
                      />
                    </div>
                  </Card>
                  <EmptyExamState
                    title={language === 'ur' ? 'Abhi koi viva session nahi' : 'No viva session yet'}
                    description={language === 'ur' ? 'Upar se session start karein.' : 'Start a session from the options above.'}
                  />
                </div>
              );
            }
            const item = vivaItems[vivaIndex];
            if (!item) {
              return (
                <EmptyExamState
                  title={language === 'ur' ? 'Session mukammal' : 'Session complete'}
                  description={`${vivaItems.length} ${language === 'ur' ? 'sawal mukammal' : 'questions completed'}`}
                  action={{ label: language === 'ur' ? 'Naya session' : 'New session', onClick: () => setVivaItems([]) }}
                />
              );
            }
            return (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="primary" size="sm">{vivaMode}</Badge>
                    <Badge variant="secondary" size="sm">{vivaIndex + 1}/{vivaItems.length}</Badge>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => setVivaItems([])}>
                    {language === 'ur' ? 'Session band' : 'End session'}
                  </Button>
                </div>
                <VivaRoomCard
                  item={item}
                  sessionMode={vivaMode}
                  onSaved={() => refreshMission()}
                />
                <div className="flex justify-between">
                  <Button size="sm" variant="outline" onClick={() => setVivaIndex(i => Math.max(0, i - 1))} disabled={vivaIndex === 0}>
                    ← {language === 'ur' ? 'Pichla' : 'Previous'}
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => setVivaIndex(i => Math.min(vivaItems.length - 1, i + 1))}
                    disabled={vivaIndex >= vivaItems.length - 1}
                  >
                    {language === 'ur' ? 'Agla' : 'Next'} →
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <StatCard label={language === 'ur' ? 'Knew it' : 'Knew it'} value={String(examPrepService.saveVivaRatingSummary().knew)} />
                  <StatCard label={language === 'ur' ? 'Partial' : 'Partial'} value={String(examPrepService.saveVivaRatingSummary().partial)} />
                  <StatCard label={language === 'ur' ? 'Revision' : 'Need revision'} value={String(examPrepService.saveVivaRatingSummary().revision)} />
                </div>
              </div>
            );
          }

          if (activeTab === 'mock') {
            return (
              <div className="space-y-4">
                <Card padding="lg" className="space-y-4">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                    {language === 'ur' ? 'Full Mock Examination — configure' : 'Full Mock Examination — configure'}
                  </p>
                  <p className="text-xs text-[var(--color-text-tertiary)]">
                    {language === 'ur'
                      ? 'Format general OOP assessment practice hai — kisi university ke official paper ka dawa nahi.'
                      : 'Format is general OOP assessment practice — not claimed as any university’s official paper.'}
                  </p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <label className="text-xs text-[var(--color-text-tertiary)]">
                      {language === 'ur' ? 'Modules' : 'Modules'}
                      <Select value={configModule} onChange={e => setConfigModule(e.target.value)} options={moduleOptions} className="mt-1" />
                    </label>
                    <label className="text-xs text-[var(--color-text-tertiary)]">
                      {language === 'ur' ? 'Difficulty' : 'Difficulty'}
                      <Select
                        value={configDifficulty}
                        onChange={e => setConfigDifficulty(e.target.value as typeof configDifficulty)}
                        options={[
                          { value: 'all', label: 'All' },
                          { value: 'easy', label: 'Easy' },
                          { value: 'medium', label: 'Medium' },
                          { value: 'hard', label: 'Hard' },
                        ]}
                        className="mt-1"
                      />
                    </label>
                    <label className="text-xs text-[var(--color-text-tertiary)]">
                      {language === 'ur' ? 'Questions' : 'Question count'}
                      <Select
                        value={String(configCount)}
                        onChange={e => setConfigCount(Number(e.target.value))}
                        options={['10', '20', '30', '50'].map(v => ({ value: v, label: v }))}
                        className="mt-1"
                      />
                    </label>
                    <label className="text-xs text-[var(--color-text-tertiary)]">
                      {language === 'ur' ? 'Minutes' : 'Duration (min)'}
                      <Select
                        value={String(configMinutes)}
                        onChange={e => setConfigMinutes(Number(e.target.value))}
                        options={['20', '30', '45', '60', '90'].map(v => ({ value: v, label: v }))}
                        className="mt-1"
                      />
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="primary" onClick={() => startExam('mock')} leftIcon={<Play className="w-4 h-4" />}>
                      {language === 'ur' ? 'Mock Exam Shuru' : 'Start Mock Exam'}
                    </Button>
                    <Button variant="outline" onClick={() => startExam('theory')}>
                      {language === 'ur' ? 'Theory sections (A–F)' : 'Theory sections (A–F)'}
                    </Button>
                    <Button variant="outline" onClick={() => setPendingMode('theory')}>
                      {language === 'ur' ? 'Config preview' : 'Open config modal'}
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {EXAM_SECTIONS.map(s => (
                      <Badge key={s.id} variant="secondary" size="sm">
                        {s.id}. {s.title} ({s.marksPerQuestion}m)
                      </Badge>
                    ))}
                  </div>
                </Card>

                {stats.history.length === 0 && (
                  <EmptyExamState
                    title={language === 'ur' ? 'Koi mock result nahi' : 'No mock results yet'}
                    description={language === 'ur' ? 'Pehla mock attempt karein.' : 'Take your first mock attempt.'}
                  />
                )}
                {stats.history.length > 0 && (
                  <Card padding="md">
                    <p className="text-sm font-semibold mb-2">{language === 'ur' ? 'Recent mock/exam results' : 'Recent mock/exam results'}</p>
                    <ul className="space-y-2">
                      {stats.history.map(h => (
                        <li key={h.id} className="flex justify-between text-sm p-2 rounded bg-[var(--color-bg-input)]">
                          <span className="truncate">{h.title}</span>
                          <span className="font-mono">{h.marksAwarded}/{h.totalMarks} ({h.percentage}%)</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}
              </div>
            );
          }

          if (activeTab === 'revision') {
            return (
              <div className="space-y-4">
                <Card padding="lg" className="space-y-3">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                    {language === 'ur' ? 'Adaptive revision priorities' : 'Adaptive revision priorities'}
                  </p>
                  <p className="text-xs text-[var(--color-text-tertiary)]">
                    {language === 'ur'
                      ? 'Sirf asal learning data se — kamzor topics fabricate nahi kiye jate.'
                      : 'Only from real learning data — no fabricated weak topics.'}
                  </p>
                  {revisionPriorities.length === 0 ? (
                    <EmptyExamState title={language === 'ur' ? 'Data maujood nahi' : 'No data yet'} />
                  ) : (
                    <ul className="space-y-2">
                      {revisionPriorities.map((p, i) => (
                        <li key={p.tag + i} className="flex items-center justify-between gap-2 p-2 rounded bg-[var(--color-bg-input)] text-sm">
                          <div>
                            <span className="text-[var(--color-text-primary)] font-medium">{p.tag}</span>
                            <span className="block text-[11px] text-[var(--color-text-tertiary)]">
                              {language === 'ur' ? p.reasonUrdu : p.reason}
                            </span>
                          </div>
                          <Badge
                            variant={p.source === 'incorrect' ? 'error' : p.source === 'mastery' ? 'warning' : p.source === 'unfinished' ? 'primary' : 'secondary'}
                            size="sm"
                          >
                            {p.source}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <Button variant="primary" onClick={() => startExam('revision')}>
                      {language === 'ur' ? 'Revision quiz shuru' : 'Start revision quiz'}
                    </Button>
                    <span className="text-xs text-[var(--color-text-tertiary)] self-center">{diagnosticMode ? null : null}</span>
                  </div>
                  <div className="text-xs text-[var(--color-text-tertiary)]">
                    {stats.weakTopicCount === 0 && stats.examStats.totalExams === 0
                      ? (language === 'ur'
                          ? 'Koi performance data nahi — general diagnostic quiz offer hoti hai.'
                          : 'No performance data yet — a general diagnostic quiz is offered.')
                      : null}
                  </div>
                </Card>
                <CodeModesSection
                  language={language}
                  onlyOutput
                  onStart={mode => setPendingMode(mode)}
                  onMissionNote={() => {
                    examPrepService.noteCodeOutputComplete();
                    refreshMission();
                  }}
                />
              </div>
            );
          }

          if (activeTab === 'mission') {
            return (
              <div className="space-y-4">
                <ExamReadyMissionPanel state={missionState} />
                <Card padding="md" className="text-xs text-[var(--color-text-tertiary)] space-y-1">
                  <p>
                    {language === 'ur'
                      ? 'Mission objectives sequential unlock hote hain. +150 XP sirf ek baar milta hai jab sab objectives complete hon.'
                      : 'Mission objectives unlock sequentially. +150 XP is awarded only once when all objectives complete.'}
                  </p>
                  <p>
                    {language === 'ur'
                      ? 'Duplicate prevention existing progress service + local mission flags se hota hai.'
                      : 'Duplicate prevention uses existing progress service + local mission flags.'}
                  </p>
                </Card>
              </div>
            );
          }

          return null;
        }}
      </Tabs>

      <Modal
        isOpen={pendingMode !== null}
        onClose={() => setPendingMode(null)}
        title={
          pendingMode
            ? (language === 'ur'
                ? modeCards.find(m => m.id === pendingMode)?.labelUrdu || 'Exam'
                : modeCards.find(m => m.id === pendingMode)?.label || 'Exam')
            : 'Exam'
        }
        size="md"
      >
        <div className="space-y-4">
          <p className="text-xs text-[var(--color-text-tertiary)]">
            {language === 'ur'
              ? 'Deterministic educational validation — koi real Java compile/execute nahi. Format kisi university ke official paper ka dawa nahi.'
              : 'Deterministic educational validation — no real Java compile/execute. Format is not claimed as any university’s official paper.'}
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="text-xs text-[var(--color-text-tertiary)]">
              {language === 'ur' ? 'Module' : 'Module'}
              <Select value={configModule} onChange={e => setConfigModule(e.target.value)} options={moduleOptions} className="mt-1" />
            </label>
            <label className="text-xs text-[var(--color-text-tertiary)]">
              {language === 'ur' ? 'Difficulty' : 'Difficulty'}
              <Select
                value={configDifficulty}
                onChange={e => setConfigDifficulty(e.target.value as typeof configDifficulty)}
                options={[
                  { value: 'all', label: 'All' },
                  { value: 'easy', label: 'Easy' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'hard', label: 'Hard' },
                ]}
                className="mt-1"
              />
            </label>
            <label className="text-xs text-[var(--color-text-tertiary)]">
              {language === 'ur' ? 'Sawal' : 'Questions'}
              <Select
                value={String(configCount)}
                onChange={e => setConfigCount(Number(e.target.value))}
                options={['5', '10', '15', '20', '30'].map(v => ({ value: v, label: v }))}
                className="mt-1"
              />
            </label>
            <label className="text-xs text-[var(--color-text-tertiary)]">
              {language === 'ur' ? 'Minutes' : 'Minutes'}
              <Select
                value={String(configMinutes)}
                onChange={e => setConfigMinutes(Number(e.target.value))}
                options={['10', '20', '30', '45', '60'].map(v => ({ value: v, label: v }))}
                className="mt-1"
              />
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setPendingMode(null)}>
              {language === 'ur' ? 'Cancel' : 'Cancel'}
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                if (pendingMode) startExam(pendingMode);
              }}
              leftIcon={<Play className="w-4 h-4" />}
            >
              {language === 'ur' ? 'Shuru karein' : 'Start'}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showReview} onClose={() => setShowReview(false)} title={language === 'ur' ? 'Review' : 'Review'} size="lg">
        <div className="space-y-3 max-h-[70vh] overflow-y-auto">
          {result ? (
            <ExamReviewList result={result} onlyIncorrect={reviewOnlyIncorrect} />
          ) : stats.history.length === 0 ? (
            <EmptyExamState
              title={language === 'ur' ? 'Review ke liye attempt nahi' : 'No attempt to review'}
              description={language === 'ur' ? 'Pehla exam complete karein.' : 'Complete an exam first.'}
            />
          ) : (
            <EmptyExamState
              title={language === 'ur' ? 'Yeh session abhi result load nahi karta' : 'This session does not reload full results'}
              description={
                language === 'ur'
                  ? 'Summary history mehfooz hai. Detailed review ke liye naya attempt submit karein.'
                  : 'Summary history is saved. Submit a new attempt for a detailed review.'
              }
              action={{ label: language === 'ur' ? 'Dashboard' : 'Dashboard', onClick: () => setShowReview(false) }}
            />
          )}
        </div>
      </Modal>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-primary)]">
      <p className="text-[11px] text-[var(--color-text-tertiary)]">{label}</p>
      <p className="text-lg font-semibold text-[var(--color-text-primary)] font-mono">{value}</p>
    </div>
  );
}

function EmptyExamState(props: { title: string; description?: string; action?: { label: string; onClick: () => void } }) {
  return (
    <div className="py-8">
      <EmptyState title={props.title} description={props.description} action={props.action} icon={<BarChart3 className="w-8 h-8" />} />
    </div>
  );
}

function ModeLauncher({
  language,
  onStart,
  label,
  description,
}: {
  language: 'en' | 'ur';
  onStart: () => void;
  label: string;
  description: string;
}) {
  return (
    <Card padding="md" className="space-y-2">
      <Button variant="primary" size="sm" onClick={onStart} leftIcon={<Play className="w-3.5 h-3.5" />}>
        {label}
      </Button>
      <p className="text-xs text-[var(--color-text-tertiary)]">{description}</p>
      <span className="sr-only">{language}</span>
    </Card>
  );
}

function CodeModesSection({
  language,
  onStart,
  onMissionNote,
  onlyOutput = false,
}: {
  language: 'en' | 'ur';
  onStart: (mode: ExamPrepModeId) => void;
  onMissionNote: () => void;
  onlyOutput?: boolean;
}) {
  const outputs = useMemo(() => questionService.getOutputQuestions().slice(0, 3), []);
  const completions = useMemo(() => questionService.getCodeCompletionQuestions().slice(0, 2), []);
  const mistakes = useMemo(() => questionService.getMistakeQuestions().slice(0, 2), []);
  const scenarios = useMemo(() => questionService.getScenarioQuestions().slice(0, 2), []);
  const quizzes = useMemo(
    () =>
      questionService
        .getQuizQuestions()
        .filter(q =>
          q.type === 'mcq' ||
          q.type === 'true-false' ||
          q.type === 'matching' ||
          q.type === 'code-completion' ||
          q.type === 'output-prediction'
        )
        .slice(0, 2) as QuickCheckQuestion[],
    []
  );
  const [debugList] = useState(() => questionService.getDebugChallenges().slice(0, 1));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {!onlyOutput && (
          <>
            <Button variant="outline" size="sm" onClick={() => onStart('code-analysis')}>
              {language === 'ur' ? 'Code Analysis exam' : 'Code Analysis exam'}
            </Button>
            <Button variant="outline" size="sm" onClick={() => onStart('logic')}>
              {language === 'ur' ? 'Logic challenges exam' : 'Logic challenges exam'}
            </Button>
            <Button variant="outline" size="sm" onClick={() => onStart('debugging')}>
              {language === 'ur' ? 'Debugging exam' : 'Debugging exam'}
            </Button>
            <Button variant="outline" size="sm" onClick={() => onStart('scenario')}>
              {language === 'ur' ? 'Scenario exam' : 'Scenario exam'}
            </Button>
          </>
        )}
        <Button variant="primary" size="sm" onClick={() => onStart('output')}>
          {language === 'ur' ? 'Output Prediction exam' : 'Output Prediction exam'}
        </Button>
      </div>

      <Card padding="md" className="space-y-3">
        <p className="text-sm font-semibold text-[var(--color-text-primary)]">
          {language === 'ur' ? 'Practice-style code questions (bank reuse)' : 'Practice-style code questions (bank reuse)'}
        </p>
        <p className="text-[11px] text-[var(--color-text-tertiary)]">
          {language === 'ur'
            ? 'Predefined answers. Koi arbitrary Java execute nahi hota.'
            : 'Predefined answers. No arbitrary Java execution.'}
        </p>
        {outputs.map(q => (
          <OutputQuestionUI
            key={q.id}
            question={q}
            onComplete={correct => {
              if (correct) onMissionNote();
            }}
          />
        ))}
        {!onlyOutput && completions.map(q => (
          <CodeCompletionUI key={q.id} question={q} onComplete={correct => { if (correct) onMissionNote(); }} />
        ))}
        {!onlyOutput && mistakes.map(q => (
          <MistakeFallback key={q.id} question={q} />
        ))}
        {!onlyOutput && debugList.map(d => (
          <DebuggingLab key={d.id} challenge={d} />
        ))}
        {!onlyOutput && scenarios.map(s => (
          <ScenarioChallengeUI key={s.id} question={s} />
        ))}
        {!onlyOutput && quizzes.map(q => (
          <QuickCheck key={q.id} questions={[q]} />
        ))}
      </Card>
    </div>
  );
}

function MistakeFallback({ question }: { question: ReturnType<typeof questionService.getMistakeQuestions>[number] }) {
  return (
    <div className="p-4 rounded-lg border border-[var(--color-border-primary)] space-y-2">
      <Badge variant="error" size="sm">Mistake finder</Badge>
      <p className="text-sm font-medium text-[var(--color-text-primary)]">{question.title}</p>
      <pre className="bg-[var(--color-bg-input)] p-3 rounded font-mono text-xs overflow-x-auto text-[var(--color-text-primary)]">
        {question.code}
      </pre>
      <p className="text-xs text-[var(--color-text-secondary)]">{question.explanation}</p>
    </div>
  );
}

export default ExamPrepPage;
