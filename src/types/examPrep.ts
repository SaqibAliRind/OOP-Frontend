import type { AssessmentQuestion } from '@/types';

export type ExamPrepModeId =
  | 'theory'
  | 'short'
  | 'long'
  | 'code-analysis'
  | 'output'
  | 'logic'
  | 'scenario'
  | 'debugging'
  | 'lab'
  | 'viva'
  | 'mock'
  | 'revision';

export type ExamSectionId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface ExamSectionMeta {
  id: ExamSectionId;
  title: string;
  titleUrdu: string;
  kind: 'mcq' | 'short' | 'long' | 'code-analysis' | 'output' | 'scenario';
  marksPerQuestion: number;
}

export interface TheoryExamQuestion {
  id: string;
  section: ExamSectionId;
  kind: 'mcq' | 'short' | 'long' | 'code-analysis' | 'output' | 'scenario';
  marks: number;
  difficulty: 'easy' | 'medium' | 'hard';
  moduleId?: string;
  lessonId?: string;
  topicTags: string[];
  prompt: string;
  promptUrdu?: string;
  codeSnippet?: string;
  options?: string[];
  correctAnswer?: string | string[];
  modelAnswer: string;
  modelAnswerUrdu?: string;
  markingPoints: string[];
  markingPointsUrdu?: string[];
  explanation: string;
  explanationUrdu?: string;
  source: 'bank' | 'theory';
  bankQuestion?: AssessmentQuestion;
}

export interface ExamAnswerEntry {
  questionId: string;
  response: string;
  markingPointHits?: number[];
  selfScore?: number;
  markedForReview?: boolean;
}

export interface ExamConfiguration {
  mode: ExamPrepModeId;
  title: string;
  durationMinutes: number;
  totalMarks: number;
  moduleFilter?: string;
  difficultyFilter?: 'easy' | 'medium' | 'hard' | 'all';
  questionCount?: number;
  sections: ExamSectionMeta[];
}

export interface ExamAttempt {
  id: string;
  config: ExamConfiguration;
  questions: TheoryExamQuestion[];
  answers: Record<string, ExamAnswerEntry>;
  startedAt: number;
  deadlineAt: number | null;
  submittedAt: number | null;
  completed: boolean;
  result?: ExamResultSummary;
}

export interface ExamReviewItem {
  questionId: string;
  prompt: string;
  studentResponse: string;
  expected: string;
  isCorrect: boolean | null;
  selfScore?: number;
  marksAwarded: number;
  marksPossible: number;
  explanation: string;
  explanationUrdu?: string;
  lessonId?: string;
  topicTags: string[];
}

export interface ExamResultSummary {
  marksAwarded: number;
  totalMarks: number;
  percentage: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  selfAssessed: number;
  sectionBreakdown: Record<string, { awarded: number; possible: number; count: number }>;
  moduleBreakdown: Record<string, { awarded: number; possible: number; count: number }>;
  review: ExamReviewItem[];
  weakTopics: string[];
  strongTopics: string[];
  xpAwarded: number;
  gradedAt: number;
}

export type VivaSelfRating = 'knew' | 'partial' | 'revision';

export interface VivaAttempt {
  id: string;
  questionId: string;
  question: string;
  answer: string;
  keyPoints: string[];
  moduleId?: string;
  lessonId?: string;
  topic: string;
  personalNote: string;
  rating: VivaSelfRating | null;
  revealed: boolean;
  sessionMode: 'topic' | 'random' | 'rapid' | 'module' | 'mock';
  completedAt: number;
}

export interface VivaBankItem {
  id: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  moduleId: string;
  lessonId: string;
  topic: string;
}

export interface LabCheckpoint {
  id: string;
  label: string;
  labelUrdu: string;
  requiredChoices: string[];
}

export interface LabExamScenario {
  id: string;
  title: string;
  titleUrdu: string;
  problemStatement: string;
  problemStatementUrdu: string;
  requiredClasses: string[];
  requiredAttributes: string[];
  requiredMethods: string[];
  concepts: string[];
  checkpoints: LabCheckpoint[];
  hints: string[];
  hintsUrdu: string[];
  modelSolution: string;
  modelSolutionNotes: string;
  modelSolutionNotesUrdu: string;
  difficulty: 'easy' | 'medium' | 'hard';
  moduleId: string;
}

export interface LabAttemptState {
  scenarioId: string;
  selectedChoices: Record<string, string[]>;
  completedCheckpoints: string[];
  hintsUsed: number;
  completed: boolean;
  completedAt: number | null;
}

export interface TheoryPracticeState {
  questionId: string;
  response: string;
  pointsClaimed: number[];
  revealed: boolean;
  completedAt: number;
}

export type ExamPrepMissionObjectiveId =
  | 'diagnostic'
  | 'theory'
  | 'code-output'
  | 'viva'
  | 'mock'
  | 'review';

export interface ExamPrepMissionState {
  completedObjectives: ExamPrepMissionObjectiveId[];
  unlockedIndex: number;
  xpAwarded: boolean;
  completedAt: number | null;
}

export interface ExamPrepRecentAttempt {
  id: string;
  mode: ExamPrepModeId;
  title: string;
  percentage: number;
  marksAwarded: number;
  totalMarks: number;
  submittedAt: number;
}
