export type ProjectStageType =
  | 'requirements'
  | 'identify-classes'
  | 'attributes-methods'
  | 'relationships'
  | 'encapsulation'
  | 'pillars'
  | 'review'
  | 'test-scenarios'
  | 'assessment';

export type RelationshipType = 'is-a' | 'association' | 'aggregation' | 'composition' | 'dependency';

export type PillarType = 'encapsulation' | 'inheritance' | 'polymorphism' | 'abstraction';

export interface ProjectRequirement {
  id: string;
  text: string;
  textUrdu: string;
}

export interface ClassCandidate {
  id: string;
  name: string;
  description: string;
  descriptionUrdu: string;
  attributes: string[];
  methods: string[];
  isValid: boolean;
  invalidReason?: string;
  invalidReasonUrdu?: string;
}

export interface AttributeMethodOption {
  id: string;
  classId: string;
  className: string;
  name: string;
  kind: 'attribute' | 'method';
  isValid: boolean;
  invalidReason?: string;
  invalidReasonUrdu?: string;
}

export interface RelationshipOption {
  id: string;
  fromClass: string;
  toClass: string;
  type: RelationshipType;
  label: string;
  labelUrdu: string;
  isValid: boolean;
  invalidReason?: string;
  invalidReasonUrdu?: string;
}

export interface PillarChallenge {
  id: string;
  pillar: PillarType;
  question: string;
  questionUrdu: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  explanationUrdu: string;
  relatedLessonId?: string;
}

export interface ProjectTestScenario {
  id: string;
  requirement: string;
  requirementUrdu: string;
  expectedBehavior: string;
  expectedBehaviorUrdu: string;
  requiresSelectedClasses?: string[];
  requiresSelectedAttributeMethods?: string[];
  requiresSelectedRelationships?: string[];
  requiresCorrectPillarChallenges?: string[];
  explanation: string;
  explanationUrdu: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  questionUrdu: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  explanationUrdu: string;
}

export interface ProjectStage {
  id: string;
  type: ProjectStageType;
  title: string;
  titleUrdu: string;
  instructions: string;
  instructionsUrdu: string;
  hints: string[];
  hintsUrdu: string[];
  codeExample?: string;
  classCandidates?: ClassCandidate[];
  requiredClassIds?: string[];
  attributeMethodOptions?: AttributeMethodOption[];
  requiredAttributeMethodIds?: string[];
  relationshipOptions?: RelationshipOption[];
  requiredRelationshipIds?: string[];
  pillarChallenges?: PillarChallenge[];
  testScenarios?: ProjectTestScenario[];
  assessmentQuestions?: AssessmentQuestion[];
}

export interface OOPProjectScenario {
  id: string;
  title: string;
  titleUrdu: string;
  description: string;
  descriptionUrdu: string;
  briefing: string;
  briefingUrdu: string;
  concepts: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedMinutes: number;
  xpReward: number;
  requirements: ProjectRequirement[];
  stages: ProjectStage[];
  relatedLessonIds: string[];
}

export interface ProjectStageState {
  completed: boolean;
  acknowledged: boolean;
  selectedClassIds: string[];
  selectedAttributeMethodIds: string[];
  selectedRelationshipIds: string[];
  pillarAnswers: Record<string, number>;
  testResults: Record<string, boolean>;
  testsRun: boolean;
  assessmentAnswers: Record<string, number>;
  hintsUsed: number;
}

export interface ProjectAttempt {
  projectId: string;
  currentStageIndex: number;
  completedStages: string[];
  stageStates: Record<string, ProjectStageState>;
  completed: boolean;
  xpAwarded: boolean;
  startedAt: string;
  completedAt?: string;
}

export interface BossObjective {
  id: string;
  description: string;
  descriptionUrdu: string;
  type: 'design' | 'implement' | 'debug' | 'explain';
  question: string;
  questionUrdu: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  explanationUrdu: string;
  hints: string[];
  hintsUrdu: string[];
}

export interface BossChallengeDef {
  id: string;
  title: string;
  titleUrdu: string;
  briefing: string;
  briefingUrdu: string;
  conceptsTested: string[];
  difficulty: 'hard' | 'expert';
  xpReward: number;
  objectives: BossObjective[];
}

export interface BossChallengeProgress {
  bossId: string;
  currentObjectiveIndex: number;
  completedObjectives: string[];
  answers: Record<string, number>;
  completed: boolean;
  xpAwarded: boolean;
  hintsUsed: number;
  startedAt: string;
  completedAt?: string;
}

export interface ProjectReviewFeedback {
  requirementsSatisfied: string[];
  requirementsSatisfiedUrdu: string[];
  correctDecisions: string[];
  correctDecisionsUrdu: string[];
  missedRequirements: string[];
  missedRequirementsUrdu: string[];
  conceptsPracticed: string[];
  relatedLessons: string[];
  suggestedNext: string;
  suggestedNextUrdu: string;
  xpEarned: number;
}
