import type { QuizQuestion, ScenarioQuestion, MistakeQuestion, OutputQuestion, DebugChallenge, CodeCompletionQuestion, AssessmentQuestion } from '@/types';
import { allQuestions } from '@/data/questions';

type AllQuestionTypes = QuizQuestion | ScenarioQuestion | MistakeQuestion | OutputQuestion | DebugChallenge | CodeCompletionQuestion;

function toAssessmentQuestion(q: AllQuestionTypes, _type: string): AssessmentQuestion {
  if ('question' in q && 'topicTags' in q && 'xpReward' in q) {
    const quiz = q as QuizQuestion;
    return {
      id: quiz.id,
      type: quiz.type as any,
      question: quiz.question,
      options: quiz.options,
      correctAnswer: quiz.correctAnswer,
      explanation: quiz.explanation,
      romanUrduExplanation: quiz.romanUrduExplanation,
      codeSnippet: quiz.codeSnippet,
      difficulty: quiz.difficulty,
      topicTags: quiz.topicTags,
      xpReward: quiz.xpReward,
      moduleId: quiz.moduleId || 'module-01',
      lessonId: quiz.lessonId,
      points: quiz.points,
      conceptTested: quiz.conceptTested,
      examImportance: quiz.examImportance,
    };
  }
  if ('scenario' in q) {
    const sq = q as ScenarioQuestion;
    const baseOptions = sq.options ?? [];
    const correct = sq.correctAnswer;
    const needsInject = typeof correct === 'string'
      && correct.length > 0
      && !baseOptions.includes(correct);
    const options = needsInject ? [correct as string, ...baseOptions] : baseOptions;
    return {
      id: sq.id, type: 'scenario' as any, question: `${sq.scenario}\n\n${sq.question}`,
      options, correctAnswer: sq.correctAnswer, explanation: sq.explanation,
      romanUrduExplanation: sq.romanUrduExplanation, difficulty: sq.difficulty,
      topicTags: sq.relatedConcepts, xpReward: 30, moduleId: 'module-01',
    };
  }
  if ('title' in q && 'buggyCode' in q) {
    const dc = q as DebugChallenge;
    return {
      id: dc.id, type: 'debugging' as any, question: dc.title + ': ' + dc.description,
      options: dc.hints, correctAnswer: dc.solution, explanation: dc.explanation,
      romanUrduExplanation: dc.romanUrduExplanation, codeSnippet: dc.buggyCode,
      difficulty: dc.difficulty, topicTags: dc.topicTags, xpReward: dc.xpReward,
      moduleId: 'module-01', conceptTested: dc.conceptTested,
    };
  }
  if ('code' in q && 'correctOutput' in q) {
    const oq = q as OutputQuestion;
    return {
      id: oq.id, type: 'output-prediction' as any, question: 'Predict the output:',
      options: oq.options, correctAnswer: oq.correctOutput, explanation: oq.explanation,
      romanUrduExplanation: oq.romanUrduExplanation, codeSnippet: oq.code,
      difficulty: oq.difficulty, topicTags: oq.conceptTested, xpReward: 25, moduleId: 'module-01',
    };
  }
  if ('codeTemplate' in q) {
    const cc = q as CodeCompletionQuestion;
    return {
      id: cc.id, type: 'code-completion' as any, question: 'Complete the code:',
      codeSnippet: cc.codeTemplate, correctAnswer: cc.blank, explanation: cc.explanation,
      romanUrduExplanation: cc.romanUrduExplanation, difficulty: cc.difficulty,
      topicTags: cc.conceptTested, xpReward: 25, moduleId: 'module-01',
    };
  }
  if ('title' in q && 'code' in q) {
    const mq = q as MistakeQuestion;
    const options = mq.possibleMistakes.includes(mq.correctMistake)
      ? mq.possibleMistakes
      : [mq.correctMistake, ...mq.possibleMistakes];
    return {
      id: mq.id, type: 'error-solving' as any, question: mq.title,
      options, correctAnswer: mq.correctMistake, explanation: mq.explanation,
      romanUrduExplanation: mq.romanUrduExplanation, codeSnippet: mq.code,
      difficulty: mq.difficulty, topicTags: mq.conceptTested, xpReward: 25, moduleId: 'module-01',
    };
  }
  return {
    id: 'unknown', type: 'mcq' as any, question: 'Unknown',
    correctAnswer: '', explanation: '', difficulty: 'easy',
    topicTags: [], xpReward: 0, moduleId: 'module-01',
  };
}

function getAllAssessmentQuestions(): AssessmentQuestion[] {
  const questions: AssessmentQuestion[] = [];
  allQuestions.quiz.forEach(q => questions.push(toAssessmentQuestion(q, 'quiz')));
  allQuestions.scenario.forEach(q => questions.push(toAssessmentQuestion(q, 'scenario')));
  allQuestions.mistake.forEach(q => questions.push(toAssessmentQuestion(q, 'mistake')));
  allQuestions.output.forEach(q => questions.push(toAssessmentQuestion(q, 'output')));
  allQuestions.debug.forEach(q => questions.push(toAssessmentQuestion(q, 'debug')));
  allQuestions.codeCompletion.forEach(q => questions.push(toAssessmentQuestion(q, 'codeCompletion')));
  return questions;
}

const allAssessmentQuestions = getAllAssessmentQuestions();

export const assessmentService = {
  getAllQuestions(): AssessmentQuestion[] {
    return allAssessmentQuestions;
  },

  getQuestionsByModule(moduleId: string): AssessmentQuestion[] {
    return allAssessmentQuestions.filter(q => q.moduleId === moduleId);
  },

  getQuestionsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): AssessmentQuestion[] {
    return allAssessmentQuestions.filter(q => q.difficulty === difficulty);
  },

  generatePracticeSession(config: {
    moduleFilter?: string;
    difficultyFilter?: string;
    questionCount: number;
    typeFilter?: string;
  }): AssessmentQuestion[] {
    let pool = [...allAssessmentQuestions];
    if (config.moduleFilter && config.moduleFilter !== 'all') {
      pool = pool.filter(q => q.moduleId === config.moduleFilter);
    }
    if (config.difficultyFilter && config.difficultyFilter !== 'all') {
      pool = pool.filter(q => q.difficulty === config.difficultyFilter);
    }
    if (config.typeFilter && config.typeFilter !== 'all') {
      pool = pool.filter(q => q.type === config.typeFilter);
    }
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(config.questionCount, shuffled.length));
  },

  generateExamSession(config: {
    questionCount: number;
    timeLimitMinutes: number;
    moduleFilter?: string;
  }): { questions: AssessmentQuestion[]; timeLimitSeconds: number } {
    let pool = [...allAssessmentQuestions];
    if (config.moduleFilter && config.moduleFilter !== 'all') {
      pool = pool.filter(q => q.moduleId === config.moduleFilter);
    }
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return {
      questions: shuffled.slice(0, Math.min(config.questionCount, shuffled.length)),
      timeLimitSeconds: config.timeLimitMinutes * 60,
    };
  },

  generateAdaptiveSession(weakTopics: string[], questionCount: number): AssessmentQuestion[] {
    const weakQuestions = allAssessmentQuestions.filter(q =>
      q.topicTags.some(t => weakTopics.some(w => t.includes(w) || w.includes(t)))
    );
    const otherQuestions = allAssessmentQuestions.filter(q =>
      !q.topicTags.some(t => weakTopics.some(w => t.includes(w) || w.includes(t)))
    );
    const shuffledWeak = [...weakQuestions].sort(() => Math.random() - 0.5);
    const shuffledOther = [...otherQuestions].sort(() => Math.random() - 0.5);
    const weakCount = Math.min(Math.ceil(questionCount * 0.7), shuffledWeak.length);
    const otherCount = Math.min(questionCount - weakCount, shuffledOther.length);
    return [...shuffledWeak.slice(0, weakCount), ...shuffledOther.slice(0, otherCount)].sort(() => Math.random() - 0.5);
  },

  generateMockExam(): { questions: AssessmentQuestion[]; timeLimitSeconds: number } {
    const pool = [...allAssessmentQuestions].sort(() => Math.random() - 0.5);
    return { questions: pool.slice(0, 50), timeLimitSeconds: 50 * 60 };
  },

  generateFinalAssessment(): { questions: AssessmentQuestion[]; timeLimitSeconds: number } {
    const pool = [...allAssessmentQuestions]
      .filter(q => q.difficulty === 'medium' || q.difficulty === 'hard')
      .sort(() => Math.random() - 0.5);
    return { questions: pool.slice(0, 60), timeLimitSeconds: 60 * 60 };
  },

  gradeAnswers(questions: AssessmentQuestion[], answers: Record<string, string>): {
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    percentage: number;
    moduleBreakdown: Record<string, { correct: number; total: number; percentage: number }>;
    weakTopics: string[];
    strongTopics: string[];
    xpEarned: number;
  } {
    let correct = 0;
    const moduleBreakdown: Record<string, { correct: number; total: number; percentage: number }> = {};

    questions.forEach(q => {
      if (!moduleBreakdown[q.moduleId]) {
        moduleBreakdown[q.moduleId] = { correct: 0, total: 0, percentage: 0 };
      }
      moduleBreakdown[q.moduleId].total++;

      const userAnswer = answers[q.id];
      const isCorrect = Array.isArray(q.correctAnswer)
        ? q.correctAnswer.includes(userAnswer)
        : q.correctAnswer === userAnswer;

      if (isCorrect) {
        correct++;
        moduleBreakdown[q.moduleId].correct++;
      }
    });

    Object.keys(moduleBreakdown).forEach(k => {
      const m = moduleBreakdown[k];
      m.percentage = m.total > 0 ? Math.round((m.correct / m.total) * 100) : 0;
    });

    const topicScores: Record<string, { correct: number; total: number }> = {};
    questions.forEach(q => {
      q.topicTags.forEach(tag => {
        if (!topicScores[tag]) topicScores[tag] = { correct: 0, total: 0 };
        topicScores[tag].total++;
        const userAnswer = answers[q.id];
        const isCorrect = Array.isArray(q.correctAnswer)
          ? q.correctAnswer.includes(userAnswer)
          : q.correctAnswer === userAnswer;
        if (isCorrect) topicScores[tag].correct++;
      });
    });

    const weakTopics = Object.entries(topicScores)
      .filter(([, v]) => v.total >= 2 && (v.correct / v.total) < 0.5)
      .map(([k]) => k);

    const strongTopics = Object.entries(topicScores)
      .filter(([, v]) => v.total >= 2 && (v.correct / v.total) >= 0.8)
      .map(([k]) => k);

    const percentage = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;
    const xpEarned = questions.reduce((sum, q) => {
      const userAnswer = answers[q.id];
      const isCorrect = Array.isArray(q.correctAnswer)
        ? q.correctAnswer.includes(userAnswer)
        : q.correctAnswer === userAnswer;
      return sum + (isCorrect ? q.xpReward : 0);
    }, 0);

    return {
      score: percentage,
      totalQuestions: questions.length,
      correctAnswers: correct,
      percentage,
      moduleBreakdown,
      weakTopics,
      strongTopics,
      xpEarned,
    };
  },

  getTotalQuestionCount(): number {
    return allAssessmentQuestions.length;
  },

  getModuleCounts(): Record<string, number> {
    const counts: Record<string, number> = {};
    allAssessmentQuestions.forEach(q => {
      counts[q.moduleId] = (counts[q.moduleId] || 0) + 1;
    });
    return counts;
  },
};
