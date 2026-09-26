export type CodeStudioCategory =
  | 'basics'
  | 'classes'
  | 'constructors'
  | 'encapsulation'
  | 'inheritance'
  | 'polymorphism'
  | 'abstraction'
  | 'interfaces'
  | 'this-super'
  | 'static-final'
  | 'object-class'
  | 'relationships'
  | 'exceptions'
  | 'collections'
  | 'solid';

export interface CodeStudioCategoryMeta {
  id: CodeStudioCategory;
  label: string;
  labelUrdu: string;
}

export interface CodeLineExplanation {
  line: number;
  what: string;
  whatUrdu: string;
  why: string;
  whyUrdu: string;
  concept: string;
}

export interface TraceConceptualState {
  className?: string;
  referenceName?: string;
  objectCreated?: boolean;
  fields?: { name: string; value: string }[];
  methodBeingCalled?: string;
  outputLines?: string[];
}

export interface ExecutionTraceStep {
  id: string;
  title: string;
  titleUrdu: string;
  description: string;
  descriptionUrdu: string;
  highlightLine?: number;
  conceptualState?: TraceConceptualState;
}

export interface ExecutionTrace {
  note: string;
  noteUrdu: string;
  steps: ExecutionTraceStep[];
}

export interface JavaCodeExample {
  id: string;
  title: string;
  titleUrdu: string;
  category: CodeStudioCategory;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  filename: string;
  code: string;
  expectedOutput?: string[];
  keyConcept: string;
  keyConceptUrdu: string;
  commonMistake: string;
  commonMistakeUrdu: string;
  relatedLessonId?: string;
  relatedModuleId?: string;
  relatedDebugTopic?: string;
  lineExplanations: CodeLineExplanation[];
  trace?: ExecutionTrace;
}

export interface OutputPredictionChallenge {
  id: string;
  exampleId?: string;
  code: string;
  options: string[];
  correctOutput: string;
  explanation: string;
  explanationUrdu: string;
  difficulty: 'easy' | 'medium' | 'hard';
  conceptTested: string;
  lessonId?: string;
}

export interface CodeCompletionChallenge {
  id: string;
  exampleId?: string;
  codeTemplate: string;
  blankLabel: string;
  choices: string[];
  correctChoice: string;
  requirement: string;
  requirementUrdu: string;
  explanation: string;
  explanationUrdu: string;
  hints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  conceptTested: string;
}

export interface CodeAnalysisChallenge {
  id: string;
  exampleId?: string;
  code: string;
  question: string;
  questionUrdu: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  explanationUrdu: string;
  difficulty: 'easy' | 'medium' | 'hard';
  conceptTested: string;
}

export type StudioDebugCategory =
  | 'missing-semicolon'
  | 'constructor-name'
  | 'private-access'
  | 'bad-override'
  | 'missing-interface'
  | 'reference-usage'
  | 'exception-flow'
  | 'collection-op';

export interface StudioDebugChallenge {
  id: string;
  category: StudioDebugCategory;
  title: string;
  titleUrdu: string;
  buggyCode: string;
  question: string;
  questionUrdu: string;
  hints: string[];
  corrections: string[];
  correctCorrectionIndex: number;
  explanation: string;
  explanationUrdu: string;
  difficulty: 'easy' | 'medium' | 'hard';
  conceptTested: string;
  relatedDebugTopic?: string;
}

export interface CodeStudioMissionObjective {
  id: string;
  label: string;
  labelUrdu: string;
}

export interface CodeStudioMission {
  id: string;
  title: string;
  titleUrdu: string;
  description: string;
  descriptionUrdu: string;
  objectives: CodeStudioMissionObjective[];
  xpReward: number;
}

export interface CodeStudioProgress {
  exploredExamples: string[];
  tracedExamples: string[];
  predictionResults: Record<string, boolean>;
  completionResults: Record<string, boolean>;
  analysisResults: Record<string, boolean>;
  debugResults: Record<string, boolean>;
  completedObjectives: string[];
  completedMissions: string[];
  awardedMissionIds: string[];
}

export type CodeStudioMode = 'explore' | 'trace' | 'predict' | 'complete' | 'analyze' | 'debug';
