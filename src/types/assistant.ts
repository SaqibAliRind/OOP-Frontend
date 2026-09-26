export interface AssistantQuery {
  question: string;
  lessonId?: string;
  moduleId?: string;
  language?: 'english' | 'roman-urdu' | 'both';
}

export interface AssistantResponse {
  answer: string;
  simpleExplanation?: string;
  romanUrduExplanation?: string;
  codeExample?: string;
  keyPoints?: string[];
  commonMistakes?: string[];
  relatedLessons?: { id: string; title: string; moduleId: string }[];
  relatedTopics?: string[];
  practiceLinks?: { label: string; path: string }[];
  visualizationLink?: string;
  debuggingLink?: string;
  examNotes?: string[];
  vivaQuestions?: string[];
  comparison?: { left: ComparisonSide; right: ComparisonSide };
}

export interface ComparisonSide {
  title: string;
  points: string[];
  codeExample?: string;
  useCase?: string;
}

export interface AssistantHistoryItem {
  id: string;
  question: string;
  topicId?: string;
  lessonId?: string;
  moduleId?: string;
  timestamp: number;
}

export interface QuickPrompt {
  id: string;
  label: string;
  question: string;
  category: 'concept' | 'comparison' | 'practice' | 'code' | 'exam';
}

export interface AssistantContext {
  type: 'general' | 'lesson' | 'module' | 'practice' | 'debug' | '3d';
  lessonId?: string;
  moduleId?: string;
  lessonTitle?: string;
  moduleTitle?: string;
}
