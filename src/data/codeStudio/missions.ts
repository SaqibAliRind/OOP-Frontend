import type { CodeStudioMission } from '@/types/codeStudio';

export const CODE_STUDIO_MISSIONS: CodeStudioMission[] = [
  {
    id: 'mission-read-class',
    title: 'Read Your First Java Class',
    titleUrdu: 'Apni Pehli Java Class Parhein',
    description: 'Open Hello Class and First Student Class, read every line explanation, and mark the examples as explored.',
    descriptionUrdu: 'Hello Class aur First Student Class kholein, har line explanation parhein, aur examples explored mark karein.',
    objectives: [
      { id: 'obj-open-hello', label: 'Open Hello Class example', labelUrdu: 'Hello Class example kholein' },
      { id: 'obj-explain-hello', label: 'Read all line explanations in Hello Class', labelUrdu: 'Hello Class ki sab line explanations parhein' },
      { id: 'obj-open-student', label: 'Open First Student Class example', labelUrdu: 'First Student Class example kholein' },
      { id: 'obj-explain-student', label: 'Read all line explanations in First Student Class', labelUrdu: 'First Student Class ki sab line explanations parhein' },
    ],
    xpReward: 40,
  },
  {
    id: 'mission-trace-object',
    title: 'Trace Object Creation',
    titleUrdu: 'Object Creation Trace Karein',
    description: 'Step through the conceptual execution traces for Student and Constructor examples from start to finish.',
    descriptionUrdu: 'Student aur Constructor examples ke conceptual execution traces shuru se end tak step-by-step chalayein.',
    objectives: [
      { id: 'obj-trace-student', label: 'Complete trace for First Student Class', labelUrdu: 'First Student Class ka trace mukammal karein' },
      { id: 'obj-trace-car', label: 'Complete trace for Default Constructor', labelUrdu: 'Default Constructor ka trace mukammal karein' },
    ],
    xpReward: 50,
  },
  {
    id: 'mission-predict-output',
    title: 'Predict the Output',
    titleUrdu: 'Output Predict Karein',
    description: 'Answer at least 6 output prediction challenges correctly.',
    descriptionUrdu: 'Kam az kam 6 output prediction challenges sahi jawab dein.',
    objectives: [
      { id: 'obj-predict-4', label: 'Answer 4 prediction challenges correctly', labelUrdu: '4 prediction challenges sahi karein' },
      { id: 'obj-predict-6', label: 'Answer 6 prediction challenges correctly', labelUrdu: '6 prediction challenges sahi karein' },
    ],
    xpReward: 60,
  },
  {
    id: 'mission-fix-broken',
    title: 'Fix the Broken Code',
    titleUrdu: 'Toota Code Theek Karein',
    description: 'Correct at least 6 debugging challenges by identifying the real mistake.',
    descriptionUrdu: 'Kam az kam 6 debugging challenges asal ghalatī pehchan kar theek karein.',
    objectives: [
      { id: 'obj-debug-3', label: 'Solve 3 debug challenges', labelUrdu: '3 debug challenges solve karein' },
      { id: 'obj-debug-6', label: 'Solve 6 debug challenges', labelUrdu: '6 debug challenges solve karein' },
    ],
    xpReward: 70,
  },
  {
    id: 'mission-master-polymorphism',
    title: 'Master Polymorphism',
    titleUrdu: 'Polymorphism Mein Maharat',
    description: 'Explore polymorphism examples, complete related challenges, and finish a polymorphism analysis question.',
    descriptionUrdu: 'Polymorphism examples kholein, related challenges complete karein, aur polymorphism analysis question mukammal karein.',
    objectives: [
      { id: 'obj-open-poly', label: 'Open Method Overriding example', labelUrdu: 'Method Overriding example kholein' },
      { id: 'obj-trace-poly', label: 'Complete trace for Method Overriding', labelUrdu: 'Method Overriding ka trace mukammal karein' },
      { id: 'obj-analyze-poly', label: 'Answer a polymorphism analysis challenge', labelUrdu: 'Polymorphism analysis challenge jawab dein' },
      { id: 'obj-complete-poly', label: 'Complete the override-related completion challenge', labelUrdu: 'Override-related completion challenge mukammal karein' },
    ],
    xpReward: 80,
  },
];
