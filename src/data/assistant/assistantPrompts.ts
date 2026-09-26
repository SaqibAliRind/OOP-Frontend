import type { QuickPrompt } from '@/types/assistant';

export const quickPrompts: QuickPrompt[] = [
  { id: 'qp-1', label: 'Explain this concept simply', question: 'Explain this concept in simple terms', category: 'concept' },
  { id: 'qp-2', label: 'Explain in Roman Urdu', question: 'Explain this concept in Roman Urdu', category: 'concept' },
  { id: 'qp-3', label: 'Give me a real-world example', question: 'Give me a real-world example of this concept', category: 'concept' },
  { id: 'qp-4', label: 'Show me Java code', question: 'Show me a Java code example for this concept', category: 'code' },
  { id: 'qp-5', label: 'Why is this important?', question: 'Why is this concept important in OOP?', category: 'concept' },
  { id: 'qp-6', label: 'What mistakes should I avoid?', question: 'What common mistakes should I avoid with this concept?', category: 'concept' },
  { id: 'qp-7', label: 'Give me an exam question', question: 'Give me an exam question about this concept', category: 'exam' },
  { id: 'qp-8', label: 'Ask me a viva question', question: 'Ask me a viva question about this concept', category: 'exam' },
  { id: 'qp-9', label: 'Show me this in 3D', question: 'Show me this concept in the 3D visualization lab', category: 'practice' },
  { id: 'qp-10', label: 'Give me a debugging challenge', question: 'Give me a debugging challenge related to this concept', category: 'practice' },
  { id: 'qp-11', label: 'Compare these concepts', question: 'What is the difference between these concepts?', category: 'comparison' },
  { id: 'qp-12', label: 'What are the prerequisites?', question: 'What do I need to learn before this concept?', category: 'concept' },
];

export const starterQuestions = [
  'What is polymorphism?',
  'Explain encapsulation',
  'Difference between abstract class and interface',
  'What is inheritance?',
  'How does method overriding work?',
  'What is the difference between == and equals()?',
  'Explain the SOLID principles',
  'What is a constructor?',
  'What is the difference between throw and throws?',
  'How does HashMap work?',
];
