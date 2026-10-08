import type { Curriculum, Module } from '@/types';

// Helper to build a generic C lesson for topics 03–27
function makeCLesson(modId: string, topicName: string, lessonNum: number): Module['lessons'][0] {
  const isChallenge = lessonNum === 2;
  return {
    id: `${modId}-lesson-0${lessonNum}`,
    moduleId: modId,
    slug: `${modId}-lesson-0${lessonNum}`,
    title: isChallenge ? `${topicName} — Challenges & Scenarios` : `${topicName} — Basics & Theory`,
    description: isChallenge
      ? `Solve scenario-based problems and output prediction for ${topicName}.`
      : `Learn the fundamentals of ${topicName} in C Language.`,
    order: lessonNum,
    duration: 30,
    xpReward: 250,
    isUnlocked: true,
    completed: false,
    masteryScore: 0,
    prerequisites: [],
    learningObjectives: [
      { id: `${modId}-l0${lessonNum}-obj1`, description: isChallenge ? `Solve scenario problems related to ${topicName}` : `Understand core concepts of ${topicName} in C`, completed: false }
    ],
    englishExplanation: {
      id: `${modId}-l0${lessonNum}-ee`,
      text: isChallenge
        ? `Apply your ${topicName} knowledge to real-world scenarios, trace code outputs, and fix common bugs.`
        : `This lesson covers the fundamentals of ${topicName} in C Language with examples, syntax rules, and common use cases.`,
    },
    romanUrduExplanation: {
      id: `${modId}-l0${lessonNum}-ru`,
      text: isChallenge
        ? `Apni knowledge ko use karte hue in scenario problems ko solve karein aur output predict karein.`
        : `Is lesson mein hum ${topicName} ko examples ke sath detail se parhenge.`,
    },
    keyPoints: [],
    codeExamples: [],
    realWorldExamples: [],
    scenarioQuestions: [],
    quickCheckQuestions: [],
    commonMistakes: [],
    examNotes: [],
    vivaQuestions: [],
  };
}

const cModules: Module[] = [
  // ── Module 01: Introduction ──────────────────────────────────────────────
  {
    id: 'c-module-01',
    slug: 'c-introduction',
    title: '01. Introduction to C',
    description: 'Understand the history, structure, and compilation of C programs.',
    order: 1,
    icon: 'Terminal',
    color: '#06b6d4',
    totalDuration: 60,
    xpReward: 500,
    isUnlocked: true,
    completed: false,
    progress: 0,
    prerequisiteModuleIds: [],
    lessons: [
      {
        id: 'c01-l01',
        moduleId: 'c-module-01',
        slug: 'c-intro-structure',
        title: 'C Program Structure & History',
        description: 'Learn the anatomy of a C program and how compilation works.',
        order: 1,
        duration: 30,
        xpReward: 250,
        isUnlocked: true,
        completed: false,
        masteryScore: 0,
        prerequisites: [],
        learningObjectives: [
          { id: 'c01-l01-obj1', description: 'Write and compile a Hello World program in C', completed: false },
          { id: 'c01-l01-obj2', description: 'Understand the role of #include and main()', completed: false },
        ],
        englishExplanation: {
          id: 'c01-l01-ee',
          text: `C is a general-purpose, procedural programming language developed by Dennis Ritchie at Bell Labs in 1972. It is the foundation of most modern languages including C++, Java, and Python.

Every C program has this structure:
1. Preprocessor directives (#include)
2. Global declarations
3. main() function — entry point of execution
4. Statements inside main()

The compilation process: Source (.c) → Preprocessor → Compiler → Assembler → Linker → Executable`,
        },
        romanUrduExplanation: {
          id: 'c01-l01-ru',
          text: `C language ko Dennis Ritchie ne 1972 mein Bell Labs mein banaya tha. Har C program mein main() function hota hai jahan se execution shuru hoti hai. #include <stdio.h> se hum standard input/output library include karte hain taake printf() aur scanf() use kar sakein.`,
        },
        keyPoints: [
          { id: 'c01-l01-kp1', title: 'Compilation Steps', description: 'Source → Preprocessor → Compiler → Assembler → Linker → Executable (.exe)' },
          { id: 'c01-l01-kp2', title: '#include <stdio.h>', description: 'Required to use printf() and scanf(). stdio = Standard Input/Output.' },
          { id: 'c01-l01-kp3', title: 'return 0', description: 'Tells the OS the program exited successfully. Non-zero means an error occurred.' },
        ],
        codeExamples: [
          {
            id: 'c01-ce1',
            title: 'Hello World in C',
            language: 'java',
            code: `#include <stdio.h>

int main() {
    printf("Hello, C Language!\\n");
    return 0;
}
// Output: Hello, C Language!`,
          }
        ],
        realWorldExamples: [],
        scenarioQuestions: [
          {
            id: 'c01-sq1',
            scenario: 'Your friend writes a C program but forgets to include #include <stdio.h> and then calls printf().',
            question: 'What will happen?',
            type: 'debugging',
            options: [
              'The program runs but prints nothing',
              'Compiler gives a warning or error: implicit declaration of printf',
              'The program crashes at runtime',
              'printf works fine without any include',
            ],
            correctAnswer: 'Compiler gives a warning or error: implicit declaration of printf',
            explanation: 'printf is declared in stdio.h. Without including it, the compiler does not know about printf and will issue an implicit declaration warning/error.',
            relatedConcepts: ['preprocessor', 'stdio.h'],
            difficulty: 'easy',
          }
        ],
        quickCheckQuestions: [],
        commonMistakes: [
          {
            id: 'c01-cm1',
            title: 'Missing semicolon',
            incorrectCode: 'printf("Hello")  // Missing semicolon!',
            correctCode: 'printf("Hello");',
            explanation: 'Every statement in C must end with a semicolon. Forgetting it causes a compile-time error.',
          }
        ],
        examNotes: [
          { id: 'c01-en1', title: 'C was created in 1972', content: 'Dennis Ritchie created C at Bell Labs in 1972. This is a frequent exam question.', importance: 'medium' }
        ],
        vivaQuestions: [
          { id: 'c01-vq1', question: 'What is the entry point of a C program?', answer: 'The main() function is the entry point. Execution begins there.', difficulty: 'easy' }
        ],
      }
    ]
  },

  // ── Module 02: Variables & Data Types ────────────────────────────────────
  {
    id: 'c-module-02',
    slug: 'c-variables-data-types',
    title: '02. Variables & Data Types',
    description: 'Master C data types, variables, and format specifiers.',
    order: 2,
    icon: 'Terminal',
    color: '#06b6d4',
    totalDuration: 60,
    xpReward: 500,
    isUnlocked: true,
    completed: false,
    progress: 0,
    prerequisiteModuleIds: [],
    lessons: [
      {
        id: 'c02-l01',
        moduleId: 'c-module-02',
        slug: 'c-data-types-variables',
        title: 'C Data Types, Variables & Format Specifiers',
        description: 'Learn int, float, double, char, and how to print them correctly.',
        order: 1,
        duration: 40,
        xpReward: 300,
        isUnlocked: true,
        completed: false,
        masteryScore: 0,
        prerequisites: [],
        learningObjectives: [
          { id: 'c02-l01-obj1', description: 'Declare variables using correct C types', completed: false },
          { id: 'c02-l01-obj2', description: 'Use the correct format specifier for each type', completed: false },
        ],
        englishExplanation: {
          id: 'c02-l01-ee',
          text: `In C, every variable must be declared with a type before use.

Data Types & Sizes:
- int    → 4 bytes → whole numbers         → format: %d
- float  → 4 bytes → decimals (less prec.) → format: %f
- double → 8 bytes → decimals (more prec.) → format: %lf
- char   → 1 byte  → single character      → format: %c
- long   → 8 bytes → large integers        → format: %ld

Type Qualifiers: signed (default), unsigned, short, long
Constants: use const keyword → const float PI = 3.14159;`,
        },
        romanUrduExplanation: {
          id: 'c02-l01-ru',
          text: `C mein har variable ka type pehle declare karna zaroori hai. int whole numbers ke liye, float aur double decimal numbers ke liye, char single character ke liye use hota hai. Printf mein format specifier galat ho to output galat aata hai ya undefined behavior hoti hai.`,
        },
        keyPoints: [
          { id: 'c02-kp1', title: 'Format Specifiers', description: '%d=int, %f=float, %lf=double, %c=char, %s=string, %ld=long' },
          { id: 'c02-kp2', title: 'sizeof() operator', description: 'sizeof(int) returns the size in bytes. Use it to check data type sizes on your system.' },
          { id: 'c02-kp3', title: 'const keyword', description: 'const int MAX = 100; creates a read-only variable. Trying to change it causes a compile error.' },
        ],
        codeExamples: [
          {
            id: 'c02-ce1',
            title: 'Variables & Format Specifiers',
            language: 'java',
            code: `#include <stdio.h>

int main() {
    int age = 21;
    float weight = 65.5f;
    double pi = 3.14159265;
    char grade = 'A';
    
    printf("Age: %d\\n", age);
    printf("Weight: %.1f kg\\n", weight);
    printf("Pi: %.5lf\\n", pi);
    printf("Grade: %c\\n", grade);
    printf("Size of int: %zu bytes\\n", sizeof(int));
    
    return 0;
}`,
          }
        ],
        realWorldExamples: [],
        scenarioQuestions: [
          {
            id: 'c02-sq1',
            scenario: 'You write: int x = 5; printf("%f", x);',
            question: 'What is the output?',
            type: 'debugging',
            options: ['5', '5.000000', 'Compile error', 'Undefined / garbage value'],
            correctAnswer: 'Undefined / garbage value',
            explanation: 'Using %f with an int is undefined behavior. The format specifier must match the variable type.',
            relatedConcepts: ['format specifiers', 'undefined behavior'],
            difficulty: 'medium',
          }
        ],
        quickCheckQuestions: [],
        commonMistakes: [
          {
            id: 'c02-cm1',
            title: 'Wrong format specifier',
            incorrectCode: 'double d = 3.14;\nprintf("%f", d); // Should use %lf for scanf, %f is OK for printf',
            correctCode: 'double d = 3.14;\nprintf("%lf", d); // Best practice: use %lf for double',
            explanation: 'For printf, %f works for both float and double. But for scanf, always use %lf for double.',
          }
        ],
        examNotes: [
          { id: 'c02-en1', title: 'sizeof results', content: 'sizeof(int)=4, sizeof(char)=1, sizeof(float)=4, sizeof(double)=8 on most 64-bit systems.', importance: 'high' }
        ],
        vivaQuestions: [
          { id: 'c02-vq1', question: 'What is the difference between float and double in C?', answer: 'float is 4 bytes with ~6-7 significant digits; double is 8 bytes with ~15 significant digits.', difficulty: 'easy' }
        ],
      }
    ]
  },

  // ── Modules 03–27: generated with correct types ──────────────────────────
  ...([
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
    '27. C Challenges',
  ] as const).map((title, index): Module => {
    const num = index + 3;
    const modId = `c-module-${num.toString().padStart(2, '0')}`;
    const topicName = title.replace(/^\d+\.\s/, '');
    return {
      id: modId,
      slug: modId,
      title,
      description: `Master ${topicName} in C Language with scenario-based questions and hands-on problem solving.`,
      order: num,
      icon: 'Terminal',
      color: '#06b6d4',
      totalDuration: 60,
      xpReward: 500,
      isUnlocked: true,
      completed: false,
      progress: 0,
      prerequisiteModuleIds: [],
      lessons: [
        makeCLesson(modId, topicName, 1),
        makeCLesson(modId, topicName, 2),
      ],
    };
  }),
];

export const cCurriculum: Curriculum = {
  modules: cModules,
  totalLessons: cModules.reduce((s, m) => s + m.lessons.length, 0),
  totalDuration: cModules.reduce((s, m) => s + m.totalDuration, 0),
  totalXp: cModules.reduce((s, m) => s + m.xpReward, 0),
};
