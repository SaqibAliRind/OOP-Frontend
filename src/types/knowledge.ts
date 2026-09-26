export type ConceptCategory =
  | 'foundation'
  | 'constructors'
  | 'encapsulation'
  | 'inheritance'
  | 'polymorphism'
  | 'abstraction'
  | 'interfaces'
  | 'java-features'
  | 'exceptions'
  | 'collections'
  | 'relationships'
  | 'design';

export interface ConceptNode {
  id: string;
  title: string;
  category: ConceptCategory;
  description: string;
  romanUrdu?: string;
  prerequisites: string[];
  relatedConcepts: string[];
  lessonIds: string[];
  practiceAvailable?: boolean;
  visualizationAvailable?: boolean;
  debuggingAvailable?: boolean;
  examAvailable?: boolean;
}

export interface ConceptConnection {
  from: string;
  to: string;
  type: 'prerequisite' | 'related' | 'builds-on' | 'contrasts-with';
  label?: string;
}

export interface KnowledgeState {
  selectedConceptId: string | null;
  searchQuery: string;
  activeCategory: ConceptCategory | 'all';
  expandedNodes: Set<string>;
}
