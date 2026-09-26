import type { AssistantQuery, AssistantResponse, AssistantHistoryItem } from '@/types/assistant';
import { conceptKnowledge, comparisonKnowledge } from '@/data/assistant/conceptKnowledge';
import { curriculumService } from '@/services/curriculumService';
import { safeGetJSON } from '@/utils/safeStorage';

const HISTORY_KEY = 'oop-universe-assistant-history';
const MAX_HISTORY = 30;

function normalizeQuery(q: string): string {
  return q.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
}

function detectComparison(query: string): { left: string; right: string } | null {
  const patterns = [
    /^(.+?)\s+(?:vs|versus|or)\s+(.+?)$/i,
    /^(.+?)\s+(?:and)\s+(.+?)\s+(?:difference|differ|compare)/i,
    /difference\s+(?:between|bet)\s+(.+?)\s+(?:and)\s+(.+?)$/i,
    /compare\s+(.+?)\s+(?:and|with)\s+(.+?)$/i,
  ];
  for (const p of patterns) {
    const m = query.match(p);
    if (m) return { left: m[1].trim().toLowerCase(), right: m[2].trim().toLowerCase() };
  }
  return null;
}

function detectTopic(query: string): string | null {
  const normalized = normalizeQuery(query);
  const keywords = [
    'class', 'object', 'constructor', 'method', 'field', 'reference variable',
    'encapsulation', 'data hiding', 'private', 'public', 'protected', 'getter', 'setter',
    'inheritance', 'extends', 'super', 'is a', 'single inheritance', 'multilevel inheritance', 'hierarchical inheritance',
    'polymorphism', 'overloading', 'overriding', 'dynamic dispatch', 'upcasting', 'downcasting', 'instanceof',
    'abstraction', 'abstract class', 'abstract method',
    'interface', 'implements', 'default method', 'static interface method',
    'static', 'final', 'object class', 'tostring', 'equals', 'hashcode', 'hash',
    'exception', 'try', 'catch', 'finally', 'throw', 'throws', 'checked exception', 'unchecked exception', 'custom exception',
    'arraylist', 'linkedlist', 'hashset', 'hashmap', 'comparable', 'comparator',
    'association', 'aggregation', 'composition', 'dependency', 'has a',
    'solid', 'srp', 'ocp', 'lsp', 'isp', 'dip', 'coupling', 'cohesion',
    'this keyword', 'this', 'super keyword', 'oop',
  ];
  const idMap: Record<string, string> = {
    'class': 'class', 'object': 'object', 'constructor': 'constructor', 'method': 'method', 'field': 'field',
    'reference variable': 'reference-variable',
    'encapsulation': 'encapsulation', 'data hiding': 'data-hiding', 'private': 'private', 'public': 'public',
    'protected': 'protected', 'getter': 'getter', 'setter': 'setter',
    'inheritance': 'inheritance', 'extends': 'extends', 'super keyword': 'super', 'super': 'super',
    'is a': 'is-a', 'single inheritance': 'single-inheritance', 'multilevel inheritance': 'multilevel-inheritance',
    'hierarchical inheritance': 'hierarchical-inheritance',
    'polymorphism': 'polymorphism', 'overloading': 'overloading', 'overriding': 'overriding',
    'dynamic dispatch': 'dynamic-dispatch', 'upcasting': 'upcasting', 'downcasting': 'downcasting', 'instanceof': 'instanceof',
    'abstraction': 'abstraction', 'abstract class': 'abstract-class', 'abstract method': 'abstract-method',
    'interface': 'interface', 'implements': 'implements', 'default method': 'default-method',
    'static interface method': 'static-interface-method',
    'static': 'static', 'final': 'final', 'object class': 'object-class',
    'tostring': 'toString', 'equals': 'equals', 'hashcode': 'hashcode', 'hash': 'hashcode',
    '== vs equals': 'equality-operators', 'equality operators': 'equality-operators',
    'exception': 'exception', 'try': 'try', 'catch': 'catch', 'finally': 'finally',
    'throw': 'throw', 'throws': 'throws', 'checked exception': 'checked-exception',
    'unchecked exception': 'unchecked-exception', 'custom exception': 'custom-exception',
    'arraylist': 'arraylist', 'linkedlist': 'linkedlist', 'hashset': 'hashset', 'hashmap': 'hashmap',
    'comparable': 'comparable', 'comparator': 'comparator',
    'association': 'association', 'aggregation': 'aggregation', 'composition': 'composition',
    'dependency': 'dependency', 'has a': 'has-a',
    'solid': 'solid', 'srp': 'srp', 'ocp': 'ocp', 'lsp': 'lsp', 'isp': 'isp', 'dip': 'dip',
    'coupling': 'coupling', 'cohesion': 'cohesion',
    'this keyword': 'this', 'oop': 'oop',
  };
  for (const kw of keywords) {
    if (normalized.includes(kw)) {
      return idMap[kw] || kw;
    }
  }
  return null;
}

function findMatchingConcept(query: string): string | null {
  const normalized = normalizeQuery(query);
  const exactMatch = detectTopic(query);
  if (exactMatch && conceptKnowledge[exactMatch]) return exactMatch;
  let bestMatch: string | null = null;
  let bestScore = 0;
  for (const [id, entry] of Object.entries(conceptKnowledge)) {
    const title = entry.title.toLowerCase();
    if (normalized.includes(title.toLowerCase())) {
      if (title.length > bestScore) {
        bestScore = title.length;
        bestMatch = id;
      }
    }
  }
  return bestMatch;
}

function findLessonsForConcept(conceptId: string): { id: string; title: string; moduleId: string }[] {
  const entry = conceptKnowledge[conceptId];
  if (!entry) return [];
  const results: { id: string; title: string; moduleId: string }[] = [];
  const curriculum = curriculumService.getCurriculum();
  for (const mod of curriculum.modules) {
    for (const lesson of mod.lessons) {
      if (
        lesson.title.toLowerCase().includes(entry.title.toLowerCase()) ||
        lesson.description.toLowerCase().includes(entry.title.toLowerCase()) ||
        lesson.keyPoints.some(kp => kp.title.toLowerCase().includes(entry.title.toLowerCase()))
      ) {
        results.push({ id: lesson.id, title: lesson.title, moduleId: mod.id });
      }
    }
  }
  return results.slice(0, 3);
}

function getComparison(query: string): AssistantResponse | null {
  const comparison = detectComparison(query);
  if (!comparison) return null;
  const normalizedLeft = comparison.left.replace(/\s+/g, '-');
  const normalizedRight = comparison.right.replace(/\s+/g, '-');
  for (const [key, entry] of Object.entries(comparisonKnowledge)) {
    const leftMatch = key.includes(normalizedLeft) || key.includes(comparison.left.replace(/\s+/g, ''));
    const rightMatch = key.includes(normalizedRight) || key.includes(comparison.right.replace(/\s+/g, ''));
    if (leftMatch && rightMatch) {
      return {
        answer: `**${entry.title}**\n\n${entry.summary}`,
        romanUrduExplanation: entry.romanUrduSummary,
        comparison: { left: entry.left, right: entry.right },
        relatedTopics: entry.left.points.slice(0, 3).map(p => p.split(':')[0]),
        practiceLinks: [
          { label: 'Practice Questions', path: '/practice' },
          { label: 'Take a Quiz', path: '/quiz' },
        ],
      };
    }
  }
  return null;
}

function getConceptResponse(conceptId: string, _query: string, language?: 'english' | 'roman-urdu' | 'both'): AssistantResponse {
  const entry = conceptKnowledge[conceptId];
  if (!entry) {
    return {
      answer: "I couldn't find a strong match in the current OOP curriculum. Try asking about classes, objects, constructors, encapsulation, inheritance, polymorphism, abstraction, interfaces, exceptions, or collections.",
      relatedTopics: Object.keys(conceptKnowledge).slice(0, 10),
    };
  }
  const lessons = findLessonsForConcept(conceptId);
  let answer = `**${entry.title}**\n\n${entry.answer}`;
  if (language === 'roman-urdu') {
    answer = `**${entry.title}**\n\n${entry.romanUrduExplanation}`;
  } else if (language === 'both') {
    answer = `**${entry.title}**\n\n${entry.answer}\n\n---\n\n**Roman Urdu:**\n${entry.romanUrduExplanation}`;
  }
  return {
    answer,
    simpleExplanation: entry.simpleExplanation,
    romanUrduExplanation: entry.romanUrduExplanation,
    codeExample: entry.codeExample,
    keyPoints: entry.keyPoints,
    commonMistakes: entry.commonMistakes,
    relatedLessons: lessons,
    relatedTopics: entry.relatedConcepts,
    practiceLinks: [
      { label: 'Practice Questions', path: '/practice' },
      { label: 'Take a Quiz', path: '/quiz' },
      { label: 'Debugging Challenges', path: '/debug' },
    ],
    visualizationLink: '/3d',
    debuggingLink: '/debug',
    examNotes: entry.examNotes,
    vivaQuestions: [`Can you explain ${entry.title} with an example?`, `When would you use ${entry.title}?`, `What are common mistakes with ${entry.title}?`],
  };
}

function getGenericResponse(query: string): AssistantResponse {
  const normalized = normalizeQuery(query);
  const topics = Object.entries(conceptKnowledge).filter(([, entry]) => {
    const words = entry.title.toLowerCase().split(/\s+/);
    return words.some(w => normalized.includes(w) && w.length > 3);
  });
  if (topics.length > 0) {
    const [id] = topics[0];
    return getConceptResponse(id, query);
  }
  const possibleTopics = Object.entries(conceptKnowledge).slice(0, 8).map(([, e]) => e.title);
  return {
    answer: "I couldn't find a strong match in the current OOP curriculum.\n\nTry asking about:\n" + possibleTopics.map(t => `• ${t}`).join('\n') + '\n\nOr use one of the suggested questions below.',
    relatedTopics: Object.keys(conceptKnowledge).slice(0, 10),
  };
}

class AssistantService {
  private history: AssistantHistoryItem[] = [];

  constructor() {
    this.loadHistory();
  }

  async processQuery(query: AssistantQuery): Promise<AssistantResponse> {
    await new Promise(r => setTimeout(r, 300 + Math.random() * 400));
    this.addToHistory(query.question, query.lessonId, query.moduleId);
    const comparison = getComparison(query.question);
    if (comparison) return comparison;
    const conceptId = findMatchingConcept(query.question);
    if (conceptId) return getConceptResponse(conceptId, query.question, query.language);
    return getGenericResponse(query.question);
  }

  processQuickPrompt(prompt: string, context?: { lessonId?: string; moduleId?: string }): AssistantQuery {
    const query: AssistantQuery = {
      question: prompt,
      lessonId: context?.lessonId,
      moduleId: context?.moduleId,
    };
    if (context?.lessonId) {
      const lesson = curriculumService.getLesson(context.lessonId);
      if (lesson) {
        query.question = `${prompt} for ${lesson.title}`;
      }
    }
    return query;
  }

  getHistory(): AssistantHistoryItem[] {
    return [...this.history];
  }

  clearHistory(): void {
    this.history = [];
    try { localStorage.removeItem(HISTORY_KEY); } catch { /* ignore */ }
  }

  private addToHistory(question: string, lessonId?: string, moduleId?: string): void {
    const item: AssistantHistoryItem = {
      id: `ah-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      question,
      lessonId,
      moduleId,
      timestamp: Date.now(),
    };
    this.history = [item, ...this.history].slice(0, MAX_HISTORY);
    this.saveHistory();
  }

  private loadHistory(): void {
    const stored = safeGetJSON<unknown>(HISTORY_KEY, []);
    if (!Array.isArray(stored)) {
      this.history = [];
      return;
    }
    this.history = stored.filter((item): item is AssistantHistoryItem => {
      if (typeof item !== 'object' || item === null) return false;
      const rec = item as Record<string, unknown>;
      return typeof rec.id === 'string' && typeof rec.question === 'string' && typeof rec.timestamp === 'number';
    });
  }

  private saveHistory(): void {
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(this.history)); } catch { /* ignore */ }
  }
}

export const assistantService = new AssistantService();
