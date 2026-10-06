import { Curriculum, Module } from '@/types';

const cModules: Module[] = [
  {
    id: 'c-module-01',
    title: 'Introduction to C',
    description: 'Master Introduction to C with scenario-based questions and problem solving.',
    order: 1,
    icon: 'Terminal',
    color: '#06b6d4',
    totalDuration: 60,
    xpReward: 500,
    isUnlocked: true,
    prerequisiteModuleIds: [],
    lessons: [
      {
        id: 'c-module-01-lesson-01',
        moduleId: 'c-module-01',
        title: 'C Basics & Structure',
        description: 'Learn the basic skeleton of a C program.',
        order: 1,
        duration: 30,
        xpReward: 250,
        prerequisites: [],
        learningObjectives: [
          { id: 'obj-1', description: 'Write a Hello World C program', completed: false }
        ],
        englishExplanation: { text: 'C is a procedural programming language. Every C program starts execution from the main() function. We use #include <stdio.h> to include standard input/output library.', audioUrl: '' },
        romanUrduExplanation: { text: 'C language mein har program main() function se shuru hota hai. printf use karne ke liye humein stdio.h include karna parta hai.', audioUrl: '' },
        keyPoints: ['Execution starts at main()', 'Statements end with a semicolon (;)'],
        realWorldExamples: [],
        codeExamples: [
          {
            id: 'c-code-1',
            title: 'Hello World in C',
            code: '#include <stdio.h>\n\nint main() {\n    printf("Hello, C Language!\\n");\n    return 0;\n}',
            language: 'c'
          }
        ],
        scenarioQuestions: [
          {
            id: 'c-sq-1',
            question: 'What happens if you forget to write "return 0;" at the end of the main function in modern C compilers?',
            options: ['Program crashes immediately', 'Compiler throws a fatal error', 'Compiler may assume return 0 automatically, but it is bad practice'],
            correctAnswerIndex: 2,
            explanation: 'Modern C compilers (C99 standard and above) assume return 0 if it is omitted in main, but explicitly writing it is standard practice.'
          }
        ],
        quickCheckQuestions: [],
        commonMistakes: [
          {
            id: 'c-mistake-1',
            mistake: 'Forgetting the semicolon after printf.',
            correction: 'All statements in C must end with a semicolon.',
            exampleCode: 'printf("Hello") // Error: Expected ;'
          }
        ],
        examNotes: [],
        vivaQuestions: []
      }
    ]
  },
  {
    id: 'c-module-02',
    title: 'Variables & Data Types',
    description: 'Memory allocation and data types in C.',
    order: 2,
    icon: 'Terminal',
    color: '#06b6d4',
    totalDuration: 60,
    xpReward: 500,
    isUnlocked: true,
    prerequisiteModuleIds: [],
    lessons: [
      {
        id: 'c-module-02-lesson-01',
        moduleId: 'c-module-02',
        title: 'C Data Types & Memory',
        description: 'Learn about int, float, double, and char.',
        order: 1,
        duration: 30,
        xpReward: 250,
        prerequisites: [],
        learningObjectives: [
          { id: 'obj-1', description: 'Declare variables properly', completed: false }
        ],
        englishExplanation: { text: 'C variables must be declared before use. "int" stores whole numbers, "float" stores decimals, and "char" stores single characters.', audioUrl: '' },
        romanUrduExplanation: { text: 'C mein variables ko pehle declare karna zaroori hai. integer, decimal aur character data types hoti hain.', audioUrl: '' },
        keyPoints: ['int (4 bytes)', 'char (1 byte)', 'float (4 bytes)'],
        realWorldExamples: [],
        codeExamples: [
          {
            id: 'c-code-2',
            title: 'Variables Example',
            code: '#include <stdio.h>\n\nint main() {\n    int age = 20;\n    float weight = 65.5;\n    char grade = \'A\';\n    printf("Age: %d\\n", age);\n    return 0;\n}',
            language: 'c'
          }
        ],
        scenarioQuestions: [
          {
            id: 'c-sq-2',
            question: 'Which format specifier is used to print an integer in C?',
            options: ['%f', '%c', '%d', '%s'],
            correctAnswerIndex: 2,
            explanation: '%d is the format specifier for a decimal integer in C.'
          }
        ],
        quickCheckQuestions: [],
        commonMistakes: [
          {
            id: 'c-mistake-2',
            mistake: 'Using %f for integers.',
            correction: 'Always match the format specifier with the variable type. Use %d for int.',
            exampleCode: 'int x = 5; printf("%f", x); // Logical Error'
          }
        ],
        examNotes: [],
        vivaQuestions: []
      }
    ]
  },
  ...[
    '03. Input & Output',
    '04. Operators',
    '05. Conditions',
    '06. Switch',
    '07. Loops',
    '08. Patterns',
    '09. Functions',
    '10. Recursion',
    '11. Arrays',
    '12. Searching',
    '13. Sorting',
    '14. Strings',
    '15. Pointers',
    '16. Structures',
    '17. File Handling',
    '18. Dynamic Memory',
    '19. Preprocessor',
    '20. Bitwise Operations',
    '21. Debugging',
    '22. Output Prediction',
    '23. Code Tracing',
    '24. Scenario Problems',
    '25. Algorithms',
    '26. Problem Solving',
    '27. C Challenges'
  ].map((title, index) => {
    // We skipped 2 items manually, so index + 3
    const modId = `c-module-${(index + 3).toString().padStart(2, '0')}`;
    return {
      id: modId,
      title: title,
      description: `Master ${title.replace(/^\d+\.\s/, '')} in C Language with scenario-based questions and problem solving.`,
      order: index + 3,
      icon: 'Terminal',
      color: '#06b6d4',
      totalDuration: 60,
      xpReward: 500,
      isUnlocked: true,
      prerequisiteModuleIds: [],
      lessons: [
        {
          id: `${modId}-lesson-01`,
          moduleId: modId,
          title: `${title.replace(/^\d+\.\s/, '')} Basics & Theory`,
          description: `Learn the fundamentals of ${title.replace(/^\d+\.\s/, '')} in C.`,
          order: 1,
          duration: 30,
          xpReward: 250,
          prerequisites: [],
          learningObjectives: [
            { id: 'obj-1', description: `Understand the core concepts of ${title.replace(/^\d+\.\s/, '')}.`, completed: false }
          ],
          englishExplanation: { text: `This lesson covers the fundamentals of ${title.replace(/^\d+\.\s/, '')} in C language.`, audioUrl: '' },
          romanUrduExplanation: { text: `Is lesson mein hum ${title.replace(/^\d+\.\s/, '')} ko detail se parhenge.`, audioUrl: '' },
          keyPoints: [`Core concept of ${title.replace(/^\d+\.\s/, '')}`],
          realWorldExamples: [],
          codeExamples: [],
          scenarioQuestions: [],
          quickCheckQuestions: [],
          commonMistakes: [],
          examNotes: [],
          vivaQuestions: []
        },
        {
          id: `${modId}-lesson-02`,
          moduleId: modId,
          title: `${title.replace(/^\d+\.\s/, '')} Challenges & Scenarios`,
          description: `Solve scenario-based problems and output prediction challenges for ${title.replace(/^\d+\.\s/, '')}.`,
          order: 2,
          duration: 30,
          xpReward: 250,
          prerequisites: [],
          learningObjectives: [
            { id: 'obj-1', description: `Solve problems related to ${title.replace(/^\d+\.\s/, '')}.`, completed: false }
          ],
          englishExplanation: { text: `Apply your knowledge to solve these scenario-based problems.`, audioUrl: '' },
          romanUrduExplanation: { text: `Apni knowledge ko use karte hue in problems ko solve karein.`, audioUrl: '' },
          keyPoints: [],
          realWorldExamples: [],
          codeExamples: [],
          scenarioQuestions: [],
          quickCheckQuestions: [],
          commonMistakes: [],
          examNotes: [],
          vivaQuestions: []
        }
      ]
    };
  })
];

export const cCurriculum: Curriculum = {
  modules: cModules,
  totalLessons: cModules.length * 2,
  totalDuration: cModules.length * 60,
  totalXp: cModules.length * 500
};
