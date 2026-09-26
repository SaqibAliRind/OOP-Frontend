export type SolidPrinciple = 'srp' | 'ocp' | 'lsp' | 'isp' | 'dip' | 'coupling-cohesion';

export interface ArchitectureNode {
  id: string;
  label: string;
  type: 'class' | 'interface' | 'abstract';
  responsibilities: string[];
  color: string;
}

export interface ArchitectureEdge {
  id: string;
  sourceId: string;
  targetId: string;
  type: 'depends-on' | 'implements' | 'extends' | 'uses';
  label: string;
  color: string;
}

export interface ArchitectureSnapshot {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

export interface RefactoringScenario {
  id: string;
  principle: SolidPrinciple;
  title: string;
  titleUrdu: string;
  before: ArchitectureSnapshot;
  after: ArchitectureSnapshot;
  beforeCode: string;
  afterCode: string;
  problem: string;
  problemUrdu: string;
  solution: string;
  solutionUrdu: string;
  benefits: string[];
  tradeoffs: string[];
}

export interface DesignChallenge {
  id: string;
  principle: SolidPrinciple;
  title: string;
  titleUrdu: string;
  question: string;
  questionUrdu: string;
  options: { id: string; text: string; textUrdu: string; isCorrect: boolean }[];
  explanation: string;
  explanationUrdu: string;
  hint: string;
  hintUrdu: string;
  type: 'mcq' | 'code-analysis' | 'identify-violation' | 'refactoring-choice';
}

export interface DesignMistake {
  id: string;
  title: string;
  titleUrdu: string;
  principle: SolidPrinciple;
  incorrectCode: string;
  incorrectDiagram: string;
  correctCode: string;
  correctDiagram: string;
  explanation: string;
  explanationUrdu: string;
}

export interface SolidMission {
  id: string;
  title: string;
  titleUrdu: string;
  description: string;
  descriptionUrdu: string;
  objectives: SolidObjective[];
  xpReward: number;
}

export interface SolidObjective {
  id: string;
  description: string;
  descriptionUrdu: string;
  type: 'inspect-design' | 'identify-problem' | 'solve-challenge' | 'complete-refactoring' | 'apply-principle';
  targetPrinciple?: SolidPrinciple;
  completed: boolean;
}

export interface SolidLabState {
  activePrinciple: SolidPrinciple;
  showAfter: boolean;
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  mission: SolidMission;
  challengeAnswers: Record<string, string>;
  challengeIndex: number;
  revealedMistakes: Set<string>;
  history: { action: string; timestamp: number }[];
}
