import { Module } from '@/types';

export const module00: Module = {
  id: 'module-00',
  title: 'Java Basics & Fundamentals',
  description: 'Complete guide to Java syntax, data types, and control structures.',
  order: 0,
  icon: 'Terminal',
  color: '#3b82f6',
  totalDuration: 120,
  xpReward: 500,
  isUnlocked: true,
  prerequisiteModuleIds: [],
  lessons: [
    {
      id: 'lesson-00-01',
      moduleId: 'module-00',
      title: 'Introduction & Structure',
      description: 'Understanding the basic skeleton of a Java program.',
      order: 1,
      duration: 30,
      xpReward: 150,
      prerequisites: [],
      learningObjectives: [
        { id: 'obj-1', description: 'Write your first Java program', completed: false },
        { id: 'obj-2', description: 'Understand main method', completed: false }
      ],
      englishExplanation: {
        text: 'Every Java application must contain a main method. It is the entry point of your program. The basic structure includes a class declaration and the public static void main(String[] args) method.',
        audioUrl: ''
      },
      romanUrduExplanation: {
        text: 'Har Java program ka execution main method se shuru hota hai. Is ke baghair program run nahi ho sakta.',
        audioUrl: ''
      },
      keyPoints: [
        'Java is case-sensitive.',
        'File name must exactly match the public class name.'
      ],
      realWorldExamples: [],
      codeExamples: [
        {
          id: 'code-1',
          title: 'Hello World',
          code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}',
          language: 'java'
        }
      ],
      scenarioQuestions: [
        {
          id: 'sq-1',
          question: 'If you rename the file to "App.java" but the class is named "Main", what happens?',
          options: ['It runs fine', 'Compiler throws an error', 'It creates two files'],
          correctAnswerIndex: 1,
          explanation: 'In Java, the public class name must match the filename exactly, otherwise it will not compile.'
        }
      ],
      quickCheckQuestions: [],
      commonMistakes: [
        {
          id: 'mistake-1',
          mistake: 'Forgetting semicolons at the end of statements.',
          correction: 'Always end your statements with ;',
          exampleCode: 'System.out.println("Hello") // Missing ;'
        }
      ],
      examNotes: [],
      vivaQuestions: []
    },
    {
      id: 'lesson-00-02',
      moduleId: 'module-00',
      title: 'Variables & Data Types',
      description: 'Storing data in memory using Java primitives.',
      order: 2,
      duration: 40,
      xpReward: 200,
      prerequisites: [],
      learningObjectives: [
        { id: 'obj-1', description: 'Declare and initialize variables', completed: false }
      ],
      englishExplanation: {
        text: 'Java is statically typed. You must declare the type of a variable before using it (e.g., int, double, boolean).',
        audioUrl: ''
      },
      romanUrduExplanation: {
        text: 'Java strongly typed hai, yani variable banate waqt uska type batana lazmi hai (jaise int, double).',
        audioUrl: ''
      },
      keyPoints: [
        'Primitive types: int, double, float, char, boolean, byte, short, long.'
      ],
      realWorldExamples: [],
      codeExamples: [
        {
          id: 'code-2',
          title: 'Variable Declaration',
          code: 'int age = 21;\ndouble height = 5.9;\nboolean isStudent = true;\nchar grade = \'A\';',
          language: 'java'
        }
      ],
      scenarioQuestions: [
        {
          id: 'sq-2',
          question: 'You want to store the exact bank balance of a user. Which data type should you use?',
          options: ['int', 'double / BigDecimal', 'boolean', 'char'],
          correctAnswerIndex: 1,
          explanation: 'A bank balance has decimals, so double or BigDecimal is required. int is only for whole numbers.'
        }
      ],
      quickCheckQuestions: [],
      commonMistakes: [
        {
          id: 'mistake-2',
          mistake: 'Using double quotes for a char.',
          correction: 'Use single quotes for char and double quotes for String.',
          exampleCode: 'char grade = "A"; // ERROR! Use \'A\''
        }
      ],
      examNotes: [],
      vivaQuestions: []
    },
    {
      id: 'lesson-00-03',
      moduleId: 'module-00',
      title: 'Control Flow (if, loops)',
      description: 'Making decisions and repeating tasks.',
      order: 3,
      duration: 50,
      xpReward: 250,
      prerequisites: [],
      learningObjectives: [
        { id: 'obj-1', description: 'Write if-else statements', completed: false },
        { id: 'obj-2', description: 'Use for and while loops', completed: false }
      ],
      englishExplanation: {
        text: 'Control flow statements allow your code to make decisions (if-else) and repeat actions (for, while).',
        audioUrl: ''
      },
      romanUrduExplanation: {
        text: 'If-else se hum decision lete hain, aur loops se ek hi kaam bar bar karwa sakte hain.',
        audioUrl: ''
      },
      keyPoints: [],
      realWorldExamples: [],
      codeExamples: [
        {
          id: 'code-3',
          title: 'For Loop Example',
          code: 'for (int i = 1; i <= 5; i++) {\n    System.out.println("Iteration: " + i);\n}',
          language: 'java'
        }
      ],
      scenarioQuestions: [
        {
          id: 'sq-3',
          question: 'Which loop is best when you know exactly how many times you want to repeat a block of code?',
          options: ['while loop', 'for loop', 'do-while loop'],
          correctAnswerIndex: 1,
          explanation: 'The for loop is designed specifically for when you know the exact number of iterations.'
        }
      ],
      quickCheckQuestions: [],
      commonMistakes: [
        {
          id: 'mistake-3',
          mistake: 'Creating infinite loops accidentally.',
          correction: 'Ensure your loop condition eventually becomes false.',
          exampleCode: 'for (int i=0; i<10; i--) { } // Infinite loop!'
        }
      ],
      examNotes: [],
      vivaQuestions: []
    }
  ]
};
