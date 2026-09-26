export type RelationshipType = 'association' | 'aggregation' | 'composition' | 'dependency';

export interface RelationshipNode {
  id: string;
  label: string;
  labelUrdu: string;
  type: 'class' | 'object';
  className: string;
  properties: Record<string, string | number | boolean>;
  position: [number, number, number];
  color: string;
}

export interface RelationshipEdge {
  id: string;
  sourceId: string;
  targetId: string;
  type: RelationshipType;
  label: string;
  labelUrdu: string;
  sourceRole: string;
  targetRole: string;
  ownership: 'none' | 'source-owns-target' | 'mutual';
  lifecycle: 'independent' | 'dependent' | 'managed';
  javaModel: string;
  description: string;
  descriptionUrdu: string;
  codeSnippet: string;
  isDashed: boolean;
}

export interface RelationshipSnapshot {
  nodes: RelationshipNode[];
  edges: RelationshipEdge[];
}

export interface RelationshipMission {
  id: string;
  title: string;
  titleUrdu: string;
  description: string;
  descriptionUrdu: string;
  objectives: RelationshipObjective[];
  xpReward: number;
}

export interface RelationshipObjective {
  id: string;
  description: string;
  descriptionUrdu: string;
  type: 'inspect-node' | 'identify-relationship' | 'detach-relationship' | 'create-relationship' | 'solve-challenge' | 'complete-quiz';
  targetId?: string;
  targetRelationshipType?: RelationshipType;
  completed: boolean;
}

export interface RelationshipChallenge {
  id: string;
  title: string;
  titleUrdu: string;
  question: string;
  questionUrdu: string;
  options: { id: string; text: string; textUrdu: string; isCorrect: boolean }[];
  explanation: string;
  explanationUrdu: string;
  hint: string;
  hintUrdu: string;
  type: 'is-a-vs-has-a' | 'mistake-identification' | 'relationship-choice';
}

export interface RelationshipLabState {
  activeNodeId: string | null;
  activeEdgeId: string | null;
  selectedNodes: string[];
  mode: 'explore' | 'build' | 'quiz';
  mission: RelationshipMission;
  missionProgress: Record<string, boolean>;
  buildSource: string | null;
  buildTarget: string | null;
  buildType: RelationshipType | null;
  challengeIndex: number;
  challengeAnswers: Record<string, string>;
  showComparison: 'is-a' | 'has-a';
  history: { action: string; timestamp: number }[];
}

export interface RelationshipLabAction {
  type: 'SELECT_NODE' | 'SELECT_EDGE' | 'DESELECT' | 'SET_MODE' | 'COMPLETE_OBJECTIVE' | 'SET_BUILD_SOURCE' | 'SET_BUILD_TARGET' | 'SET_BUILD_TYPE' | 'CREATE_RELATIONSHIP' | 'RESET_BUILD' | 'ANSWER_CHALLENGE' | 'SET_COMPARISON' | 'ADD_HISTORY' | 'DETACH_EDGE' | 'RESET';
  payload?: unknown;
}

export const RELATIONSHIP_LABS = [
  {
    id: 'association',
    title: 'Association Lab',
    titleUrdu: 'Association Lab',
    description: 'Teacher ↔ Student independent relationship',
    descriptionUrdu: 'Teacher aur Student ke darmiyaan independent relationship',
  },
  {
    id: 'aggregation',
    title: 'Aggregation Lab',
    titleUrdu: 'Aggregation Lab',
    description: 'Department ◇── Teacher weak whole-part',
    descriptionUrdu: 'Department aur Teacher ke darmiyaan kamzor whole-part relationship',
  },
  {
    id: 'composition',
    title: 'Composition Lab',
    titleUrdu: 'Composition Lab',
    description: 'House ◆── Room strong ownership',
    descriptionUrdu: 'House aur Room ke darmiyaan mazboot ownership relationship',
  },
  {
    id: 'dependency',
    title: 'Dependency Lab',
    titleUrdu: 'Dependency Lab',
    description: 'ReportGenerator → Printer temporary usage',
    descriptionUrdu: 'ReportGenerator Printer ko temporary use karta hai',
  },
] as const;
