export interface LearningObjective {
  id: string;
  description: string;
  completed: boolean;
}

export interface CodeExample {
  id: string;
  title: string;
  code: string;
  language: 'java' | 'typescript' | 'bash';
  explanation?: string;
  output?: string;
  lineHighlights?: number[];
  showLineNumbers?: boolean;
}

export interface RomanUrduExplanation {
  id: string;
  text: string;
  audioUrl?: string;
}

export interface EnglishExplanation {
  id: string;
  text: string;
}

export interface KeyPoint {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface RealWorldExample {
  id: string;
  title: string;
  scenario: string;
  oopConcept: string;
  codeExample?: CodeExample;
}

export interface CommonMistake {
  id: string;
  title: string;
  incorrectCode: string;
  correctCode: string;
  explanation: string;
  romanUrduExplanation?: string;
}

export interface ExamNote {
  id: string;
  title: string;
  content: string;
  importance: 'high' | 'medium' | 'low';
}

export interface VivaQuestion {
  id: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuickCheckQuestion {
  id: string;
  type: 'mcq' | 'true-false' | 'matching' | 'code-completion' | 'output-prediction';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  romanUrduExplanation?: string;
  codeSnippet?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  lessonId?: string;
}

export interface ScenarioQuestion {
  id: string;
  title?: string;
  prompt?: string;
  scenario: string;
  question: string;
  type: 'concept-application' | 'design-decision' | 'debugging' | 'architecture';
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  romanUrduExplanation?: string;
  relatedConcepts: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  lessonId?: string;
}

export interface MistakeQuestion {
  id: string;
  lessonId?: string;
  title: string;
  code: string;
  mistakeDescription: string;
  possibleMistakes: string[];
  correctMistake: string;
  explanation: string;
  romanUrduExplanation?: string;
  correction: string;
  difficulty: 'easy' | 'medium' | 'hard';
  conceptTested: string[];
}

export interface OutputQuestion {
  id: string;
  lessonId?: string;
  code: string;
  options: string[];
  correctOutput: string;
  explanation: string;
  romanUrduExplanation?: string;
  conceptTested: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface CodeCompletionQuestion {
  id: string;
  lessonId?: string;
  codeTemplate: string;
  blank: string;
  acceptedAnswers: string[];
  explanation: string;
  romanUrduExplanation?: string;
  hints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  conceptTested: string[];
}

export interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'theory' | 'coding' | 'design' | 'comparison';
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  slug: string;
  order: number;
  duration: number;
  description: string;
  learningObjectives: LearningObjective[];
  englishExplanation: EnglishExplanation;
  romanUrduExplanation: RomanUrduExplanation;
  keyPoints: KeyPoint[];
  codeExamples: CodeExample[];
  realWorldExamples: RealWorldExample[];
  commonMistakes: CommonMistake[];
  examNotes: ExamNote[];
  vivaQuestions: VivaQuestion[];
  quickCheckQuestions: QuickCheckQuestion[];
  scenarioQuestions: ScenarioQuestion[];
  threeDSceneId?: string;
  prerequisites: string[];
  xpReward: number;
  isUnlocked: boolean;
  completed: boolean;
  masteryScore: number;
  visualizationType?: string;
  difficulty?: 'beginner' | 'easy' | 'medium' | 'hard' | 'advanced';
  estimatedMinutes?: number;
}

export interface Module {
  id: string;
  title: string;
  slug: string;
  order: number;
  description: string;
  icon: any;
  color: string;
  lessons: Lesson[];
  xpReward: number;
  isUnlocked: boolean;
  completed: boolean;
  progress: number;
  totalDuration: number;
  prerequisiteModuleIds: string[];
}

export interface Curriculum {
  modules: Module[];
  totalLessons: number;
  totalDuration: number;
  totalXp: number;
}

export type QuestionType =
  | 'mcq'
  | 'true-false'
  | 'matching'
  | 'code-completion'
  | 'output-prediction'
  | 'error-solving'
  | 'scenario'
  | 'debugging';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  romanUrduExplanation?: string;
  codeSnippet?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topicTags: string[];
  xpReward: number;
  lessonId?: string;
  moduleId?: string;
  points?: number;
  conceptTested?: string[];
  examImportance?: 'high' | 'medium' | 'low';
}

export interface DebugChallenge {
  id: string;
  title: string;
  description: string;
  buggyCode: string;
  expectedBehavior: string;
  hints: string[];
  solution: string;
  explanation: string;
  romanUrduExplanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topicTags: string[];
  xpReward: number;
  timeLimit?: number;
  lessonId?: string;
  errorMessage?: string;
  errorType?: 'syntax' | 'compilation' | 'runtime' | 'logical' | 'oop-design' | 'access-modifier' | 'inheritance' | 'polymorphism' | 'constructor' | 'interface';
  conceptTested?: string[];
}

export interface PracticeQuestion {
  id: string;
  type: 'coding' | 'debugging' | 'scenario' | 'concept';
  title: string;
  prompt: string;
  starterCode?: string;
  solution?: string;
  testCases?: { input: string; expectedOutput: string }[];
  difficulty: 'easy' | 'medium' | 'hard';
  topicTags: string[];
  xpReward: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: 'progress' | 'mastery' | 'streak' | 'challenge' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
  condition: {
    type: 'lessons_completed' | 'module_completed' | 'streak_days' | 'xp_earned' | 'challenge_completed' | 'perfect_score';
    value: number;
    moduleId?: string;
  };
  unlockedAt?: Date;
  isSecret?: boolean;
}

export interface UserProgress {
  userId: string;
  totalXp: number;
  level: number;
  xpToNextLevel: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: Date;
  completedLessons: Record<string, { completedAt: Date; masteryScore: number; xpEarned: number }>;
  completedModules: Record<string, { completedAt: Date; xpEarned: number }>;
  unlockedAchievements: Record<string, { unlockedAt: Date }>;
  quizScores: Record<string, { score: number; attempts: number; bestScore: number }>;
  challengeScores: Record<string, { score: number; attempts: number; bestScore: number; completedAt?: Date }>;
  debugChallengeScores: Record<string, { solved: boolean; attempts: number; timeSpent: number; completedAt?: Date }>;
  practiceScores: Record<string, { score: number; attempts: number; bestScore: number }>;
  moduleMastery: Record<string, number>;
  conceptMastery: Record<string, number>;
  lessonProgress: Record<string, LessonProgress>;
  xpHistory: XpRewardEvent[];
  comboState: ComboState;
  weakTopics: Record<string, WeakTopic>;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  moduleIds: string[];
  estimatedDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface ThreeDSceneConfig {
  id: string;
  name: string;
  description: string;
  moduleId: string;
  lessonIds: string[];
  sceneType: 'blueprint' | 'factory' | 'hierarchy' | 'vault' | 'interface' | 'assembly' | 'interaction' | 'simulation';
  cameraPreset: 'orbit' | 'fly' | 'first-person' | 'fixed';
  qualityPreset: 'low' | 'medium' | 'high' | 'ultra';
  interactions: ThreeDInteraction[];
  objects: ThreeDObject[];
  annotations: ThreeDAnnotation[];
}

export interface ThreeDInteraction {
  id: string;
  type: 'click' | 'hover' | 'drag' | 'code-trigger' | 'animation-trigger';
  targetObjectId: string;
  action: 'highlight' | 'explode' | 'transform' | 'spawn' | 'reveal-code' | 'play-animation';
  parameters: Record<string, unknown>;
}

export interface ThreeDObject {
  id: string;
  name: string;
  type: 'mesh' | 'group' | 'light' | 'camera' | 'annotation';
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  modelUrl?: string;
  geometry?: string;
  material?: Record<string, unknown>;
  visible: boolean;
  interactive: boolean;
  metadata?: Record<string, unknown>;
}

export interface ThreeDAnnotation {
  id: string;
  position: [number, number, number];
  title: string;
  content: string;
  type: 'info' | 'concept' | 'code' | 'warning' | 'tip';
  trigger: 'hover' | 'click' | 'proximity' | 'auto';
  attachedToObjectId?: string;
}

export interface CodeExecutionRequest {
  code: string;
  language: 'java';
  input?: string;
  timeout?: number;
}

export interface CodeExecutionResult {
  success: boolean;
  output?: string;
  error?: string;
  executionTime: number;
  memoryUsed?: number;
}

export interface CodeExecutionService {
  execute(request: CodeExecutionRequest): Promise<CodeExecutionResult>;
  validate(code: string, language: 'java'): Promise<{ valid: boolean; errors: string[] }>;
}

export interface SearchResult {
  type: 'module' | 'lesson' | 'concept' | 'question' | 'mistake' | 'scenario';
  id: string;
  title: string;
  description: string;
  moduleId?: string;
  lessonId?: string;
  matchScore: number;
}

export type MasteryLevel = 'not-started' | 'learning' | 'practicing' | 'strong' | 'mastered';

export interface ConceptMastery {
  concept: string;
  level: MasteryLevel;
  score: number;
  lastPracticed?: Date;
}

export interface LessonProgress {
  started: boolean;
  read: boolean;
  visualized: boolean;
  quickCheckCompleted: boolean;
  scenarioCompleted: boolean;
  mistakeCompleted: boolean;
  debuggingCompleted: boolean;
  practiceCompleted: boolean;
  completed: boolean;
  startedAt?: Date;
  completedAt?: Date;
  masteryScore: number;
  xpEarned: number;
  quickCheckXpAwarded?: boolean;
  scenarioXpAwarded?: boolean;
  mistakeXpAwarded?: boolean;
  debugXpAwarded?: boolean;
  masteryXpAwarded?: boolean;
}

export interface LessonMasteryBreakdown {
  understanding: number;
  visualization: number;
  quickCheck: number;
  scenario: number;
  debugging: number;
  practice: number;
  total: number;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  objectives: MissionObjective[];
  xpReward: number;
  completed: boolean;
}

export interface MissionObjective {
  id: string;
  description: string;
  completed: boolean;
  type: 'understand' | 'visualize' | 'quick-check' | 'scenario' | 'mistake' | 'debug' | 'practice';
}

export interface XpRewardEvent {
  type: 'lesson-started' | 'quick-check' | 'scenario' | 'debugging' | 'mini-challenge' | 'mastery';
  amount: number;
  timestamp: Date;
}

export interface ComboState {
  currentStreak: number;
  longestStreak: number;
  lastActivityType: string;
  lastActivityTime: Date;
}

export interface WeakTopic {
  concept: string;
  score: number;
  failedAttempts: number;
  lastFailedAt: Date;
  recommendedActions: WeakTopicAction[];
}

export interface WeakTopicAction {
  type: 'review-lesson' | 'practice-questions' | 'debug-challenge' | 'scenario';
  label: string;
  targetId: string;
}

export interface HintLevel {
  level: 1 | 2 | 3 | 4;
  label: string;
  text: string;
}

export interface VivaQuestionExtended {
  id: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  confidence?: 'not-sure' | 'okay' | 'confident';
}

export interface ExamConfig {
  mode: 'practice' | 'exam' | 'viva' | 'lab' | 'adaptive' | 'mock' | 'final';
  timeLimit?: number;
  questionCount: number;
  showExplanations: boolean;
  shuffleQuestions: boolean;
  moduleFilter?: string;
  difficultyFilter?: 'easy' | 'medium' | 'hard';
}

export interface ExamResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  passed: boolean;
  breakdown: Record<string, { correct: number; total: number }>;
  moduleBreakdown?: Record<string, { correct: number; total: number; percentage: number }>;
  weakTopics?: string[];
  strongTopics?: string[];
}

export interface AssessmentQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  romanUrduExplanation?: string;
  codeSnippet?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topicTags: string[];
  xpReward: number;
  moduleId: string;
  lessonId?: string;
  points?: number;
  conceptTested?: string[];
  examImportance?: 'high' | 'medium' | 'low';
}

export interface AssessmentSession {
  id: string;
  mode: ExamConfig['mode'];
  questions: AssessmentQuestion[];
  answers: Record<string, string>;
  markedForReview: Set<string>;
  startTime: Date;
  timeLimit?: number;
  timeSpent: number;
  completed: boolean;
}

export interface AdaptivePracticeConfig {
  weakTopics: string[];
  questionCount: number;
  difficulty: 'auto' | 'easy' | 'medium' | 'hard';
  focusOnWeak: boolean;
}

export interface VivaSession {
  questions: VivaQuestionExtended[];
  currentIndex: number;
  confidence: Record<string, string>;
  completed: boolean;
}

export interface LabTask {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  starterCode: string;
  solutionCode: string;
  validationRules: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  moduleId: string;
  checkpoints: LabCheckpoint[];
}

export interface LabCheckpoint {
  id: string;
  description: string;
  validation: (code: string) => boolean;
  completed: boolean;
}

export interface BossChallenge {
  id: string;
  title: string;
  description: string;
  conceptsTested: string[];
  difficulty: 'hard' | 'expert';
  xpReward: number;
  tasks: BossTask[];
}

export interface BossTask {
  id: string;
  instruction: string;
  type: 'design' | 'implement' | 'debug' | 'explain';
  expectedAnswer?: string;
  options?: string[];
}

export type LessonSectionId =
  | 'mission'
  | 'learn'
  | 'visualize'
  | 'code'
  | 'think'
  | 'scenario'
  | 'break-it'
  | 'debug'
  | 'master'
  | 'next';

export interface LearningActivity {
  id: string;
  type: 'lesson' | 'practice' | 'debug' | 'scenario' | 'quiz' | 'exam' | 'viva' | 'lab' | '3d' | 'achievement';
  title: string;
  topicId?: string;
  moduleId?: string;
  xp: number;
  timestamp: string;
}

export interface DailyGoal {
  id: string;
  date: string;
  targets: DailyGoalTarget[];
  completed: number;
  total: number;
  rewardXp: number;
  claimed: boolean;
}

export interface DailyGoalTarget {
  id: string;
  type: 'lesson' | 'practice' | 'debug' | 'scenario' | 'quiz' | 'exam' | 'lab' | '3d';
  label: string;
  target: number;
  current: number;
  completed: boolean;
}

export interface LearningGoal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  type: string;
  completed: boolean;
  createdAt: string;
}

export interface WeeklyChallenge {
  id: string;
  weekStart: string;
  targets: { type: string; label: string; target: number; current: number }[];
  rewardXp: number;
  claimed: boolean;
  completed: boolean;
}

export interface TopicProgress {
  topicId: string;
  lessonsCompleted: number;
  practiceAttempted: number;
  practiceCorrect: number;
  scenarioCompleted: number;
  debuggingCompleted: number;
  threeDCompleted: boolean;
  assessmentAccuracy: number;
  mastery: number;
}

export interface ProgressSnapshot {
  totalXp: number;
  level: number;
  lessonsCompleted: number;
  mastery: number;
  timestamp: string;
}
