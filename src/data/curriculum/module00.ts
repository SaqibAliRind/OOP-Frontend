import type { Module } from '@/types';

export const module00: Module = {
  id: 'module-00',
  title: 'Java Basics & Fundamentals',
  slug: 'java-basics-fundamentals',
  description: 'Complete guide to Java syntax, data types, keywords, and control structures. Start from zero and build a strong Java foundation.',
  order: 0,
  icon: 'Terminal',
  color: '#3b82f6',
  totalDuration: 120,
  xpReward: 500,
  isUnlocked: true,
  completed: false,
  progress: 0,
  prerequisiteModuleIds: [],
  lessons: [
    {
      id: 'lesson-00-01',
      moduleId: 'module-00',
      slug: 'java-intro-structure',
      title: 'Introduction & Program Structure',
      description: 'Understanding the basic skeleton of a Java program and reserved keywords.',
      order: 1,
      duration: 30,
      xpReward: 150,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      prerequisites: [],
      learningObjectives: [
        { id: 'lo-00-01-1', description: 'Write your first Java program', completed: false },
        { id: 'lo-00-01-2', description: 'Understand the main method signature', completed: false },
        { id: 'lo-00-01-3', description: 'Know Java reserved keywords', completed: false },
      ],
      englishExplanation: {
        id: 'ee-00-01',
        text: `Every Java application must contain a main method — it is the entry point of your program. The basic structure includes a public class declaration followed by the public static void main(String[] args) method.

Java has 53 reserved keywords that cannot be used as variable names. These include: abstract, boolean, break, byte, case, catch, char, class, const, continue, default, do, double, else, enum, extends, final, finally, float, for, goto, if, implements, import, instanceof, int, interface, long, native, new, null, package, private, protected, public, return, short, static, strictfp, super, switch, synchronized, this, throw, throws, transient, try, void, volatile, while.

Java is case-sensitive: "Public" and "public" are completely different things. The file name must exactly match the public class name.`,
      },
      romanUrduExplanation: {
        id: 'ru-00-01',
        text: `Har Java program ka execution main() method se shuru hota hai. Is ke baghair program run nahi ho sakta. Java mein 53 reserved keywords hain jo aap apne variables ke naam ke liye use nahi kar sakte — jaise int, class, public, static.

Java case-sensitive hai, matlab "Public" aur "public" bilkul alag cheezein hain. File ka naam aur public class ka naam bilkul same hona chahiye.`,
      },
      keyPoints: [
        { id: 'kp-00-01-1', title: 'main() Method', description: 'public static void main(String[] args) is the entry point of every Java program. JVM calls this method to start execution.' },
        { id: 'kp-00-01-2', title: 'Reserved Keywords', description: 'Java has 53 keywords (int, class, public, static, void, etc.) that are reserved and cannot be used as identifiers.' },
        { id: 'kp-00-01-3', title: 'Case Sensitivity', description: 'Java is case-sensitive. myVariable and MyVariable are two completely different identifiers.' },
        { id: 'kp-00-01-4', title: 'Class Name = File Name', description: 'The public class name must exactly match the .java filename, otherwise the compiler will throw an error.' },
      ],
      codeExamples: [
        {
          id: 'ce-00-01-1',
          title: 'Basic Java Program Structure',
          code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java World!");
        // Output: Hello, Java World!
    }
}`,
          language: 'java',
          explanation: 'This is the minimum structure of a valid Java program.',
        }
      ],
      realWorldExamples: [],
      scenarioQuestions: [
        {
          id: 'sq-00-01-1',
          scenario: 'You created a file called "MyApp.java" and inside it you wrote "public class App { ... }". You try to compile it.',
          question: 'What happens?',
          type: 'debugging',
          options: [
            'It compiles and runs fine',
            'Compiler error: class App is public, should be declared in a file named App.java',
            'Runtime error only',
            'Warning message, but it still runs'
          ],
          correctAnswer: 'Compiler error: class App is public, should be declared in a file named App.java',
          explanation: 'In Java, the public class name must match the filename exactly. Since the file is "MyApp.java", the public class must be named "MyApp".',
          relatedConcepts: ['class naming', 'compilation'],
          difficulty: 'easy',
        }
      ],
      quickCheckQuestions: [],
      commonMistakes: [
        {
          id: 'cm-00-01-1',
          title: 'Missing Semicolon',
          incorrectCode: 'System.out.println("Hello")\n// Error: ; expected',
          correctCode: 'System.out.println("Hello");',
          explanation: 'Every statement in Java must end with a semicolon (;). Forgetting it causes a compile-time error.',
        },
        {
          id: 'cm-00-01-2',
          title: 'Using a Keyword as Variable Name',
          incorrectCode: 'int class = 5; // Error: class is a reserved keyword',
          correctCode: 'int myClass = 5; // Correct',
          explanation: 'Reserved keywords like class, int, public cannot be used as variable names.',
        }
      ],
      examNotes: [
        { id: 'en-00-01-1', title: 'Java Keywords Count', content: 'Java has exactly 53 reserved keywords. This is a common exam question.', importance: 'high' }
      ],
      vivaQuestions: [
        { id: 'vq-00-01-1', question: 'What is the entry point of a Java program?', answer: 'The public static void main(String[] args) method is the entry point.', difficulty: 'easy' }
      ]
    },
    {
      id: 'lesson-00-02',
      moduleId: 'module-00',
      slug: 'java-variables-data-types',
      title: 'Variables & Data Types',
      description: 'Storing data using Java primitive and reference data types.',
      order: 2,
      duration: 40,
      xpReward: 200,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      prerequisites: [],
      learningObjectives: [
        { id: 'lo-00-02-1', description: 'Declare and initialize variables', completed: false },
        { id: 'lo-00-02-2', description: 'Understand all 8 primitive data types', completed: false },
        { id: 'lo-00-02-3', description: 'Know the difference between int, long, float, double', completed: false },
      ],
      englishExplanation: {
        id: 'ee-00-02',
        text: `Java is a statically-typed language. You must declare the type of a variable before using it. Java has 8 primitive data types:

1. byte  — 1 byte  — Range: -128 to 127
2. short — 2 bytes — Range: -32,768 to 32,767
3. int   — 4 bytes — Range: ~-2 billion to +2 billion
4. long  — 8 bytes — Very large whole numbers (add L suffix: 100L)
5. float — 4 bytes — Decimal numbers (add f suffix: 3.14f)
6. double — 8 bytes — More precise decimals (default for decimals)
7. boolean — 1 bit  — true or false only
8. char — 2 bytes — Single character (use single quotes: 'A')

String is NOT a primitive — it is a class (reference type). Variables must be declared before use, and Java does not allow using an uninitialized local variable.`,
      },
      romanUrduExplanation: {
        id: 'ru-00-02',
        text: `Java strongly typed hai — matlab variable banane se pehle uska data type declare karna zaroori hai. Java mein 8 primitive data types hain:
int (whole numbers), double (decimal numbers), boolean (true/false), char (single character, single quotes mein).
String ek class hai, primitive nahi — isliye String objects uppercase S se likhte hain.`,
      },
      keyPoints: [
        { id: 'kp-00-02-1', title: '8 Primitives', description: 'byte, short, int, long, float, double, boolean, char — memorize these for exams.' },
        { id: 'kp-00-02-2', title: 'long vs int', description: 'Use long for very large numbers. Always add L suffix: long population = 7000000000L;' },
        { id: 'kp-00-02-3', title: 'double vs float', description: 'double is the default for decimal values. float requires an f suffix: float pi = 3.14f;' },
        { id: 'kp-00-02-4', title: 'char uses single quotes', description: "char grade = 'A'; — always use single quotes. Double quotes create a String." },
      ],
      codeExamples: [
        {
          id: 'ce-00-02-1',
          title: 'All Data Types Demo',
          code: `public class DataTypes {
    public static void main(String[] args) {
        int age = 21;
        long population = 7000000000L;
        double height = 5.9;
        float temperature = 36.6f;
        boolean isStudent = true;
        char grade = 'A';
        String name = "Ahmed"; // Reference type

        System.out.println("Name: " + name + ", Age: " + age);
        System.out.println("Grade: " + grade + ", Student: " + isStudent);
    }
}`,
          language: 'java',
        }
      ],
      realWorldExamples: [],
      scenarioQuestions: [
        {
          id: 'sq-00-02-1',
          scenario: 'You are building a banking app and need to store a user\'s account balance of Rs. 1,234,567.89.',
          question: 'Which data type is most appropriate?',
          type: 'design-decision',
          options: ['int', 'long', 'double', 'boolean'],
          correctAnswer: 'double',
          explanation: 'Account balances have decimal points, so you need a floating-point type. double offers more precision than float for financial values.',
          relatedConcepts: ['data types', 'double'],
          difficulty: 'easy',
        }
      ],
      quickCheckQuestions: [],
      commonMistakes: [
        {
          id: 'cm-00-02-1',
          title: 'Using double quotes for char',
          incorrectCode: 'char grade = "A"; // ERROR!',
          correctCode: "char grade = 'A'; // Correct: single quotes",
          explanation: 'char uses single quotes. Double quotes create a String, not a char.',
        },
        {
          id: 'cm-00-02-2',
          title: 'Missing L for long literals',
          incorrectCode: 'long big = 9000000000; // Error: integer too large',
          correctCode: 'long big = 9000000000L; // Correct',
          explanation: 'Large number literals default to int type. Add L suffix to indicate they are long.',
        }
      ],
      examNotes: [
        { id: 'en-00-02-1', title: 'Default Values', content: 'int defaults to 0, double to 0.0, boolean to false, char to null char. But local variables MUST be initialized before use.', importance: 'high' }
      ],
      vivaQuestions: [
        { id: 'vq-00-02-1', question: 'What is the difference between float and double?', answer: 'float is 4 bytes with less precision; double is 8 bytes with more precision. double is the default for decimal literals.', difficulty: 'easy' }
      ]
    },
    {
      id: 'lesson-00-03',
      moduleId: 'module-00',
      slug: 'java-control-flow',
      title: 'Control Flow: if-else, Loops, Switch',
      description: 'Making decisions and repeating actions in Java programs.',
      order: 3,
      duration: 50,
      xpReward: 250,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      prerequisites: [],
      learningObjectives: [
        { id: 'lo-00-03-1', description: 'Write if-else decision structures', completed: false },
        { id: 'lo-00-03-2', description: 'Use for, while, and do-while loops', completed: false },
        { id: 'lo-00-03-3', description: 'Implement switch statements', completed: false },
      ],
      englishExplanation: {
        id: 'ee-00-03',
        text: `Control flow determines the order in which your code executes. Java has three categories:

1. DECISION MAKING — if, else if, else, switch
   - if runs a block only when a condition is true
   - else provides an alternative when the condition is false
   - switch compares a variable against multiple fixed values

2. LOOPS — for, while, do-while
   - for loop: use when you know how many times to repeat
   - while loop: use when you repeat until a condition becomes false
   - do-while: like while but always runs AT LEAST once

3. JUMP STATEMENTS — break, continue, return
   - break: exits the current loop or switch completely
   - continue: skips the current iteration and moves to next
   - return: exits the current method`,
      },
      romanUrduExplanation: {
        id: 'ru-00-03',
        text: `Control flow se hum decide karte hain ke code kahan jayega. Agar koi condition true ho to if block chalega, warna else chalega. Loops se ek hi kaam bar bar karwa sakte hain.

for loop tab use karo jab maloom ho kitni baar repeat karna hai. while tab use karo jab condition pe depend karo. do-while mein code kam az kam ek baar zaroor chalta hai.`,
      },
      keyPoints: [
        { id: 'kp-00-03-1', title: 'for vs while', description: 'Use for when number of iterations is known. Use while when you repeat based on a condition.' },
        { id: 'kp-00-03-2', title: 'do-while runs at least once', description: 'The do-while loop always executes its body at least once before checking the condition.' },
        { id: 'kp-00-03-3', title: 'break vs continue', description: 'break exits the entire loop. continue skips the rest of the current iteration.' },
      ],
      codeExamples: [
        {
          id: 'ce-00-03-1',
          title: 'Loop Examples',
          code: `public class Loops {
    public static void main(String[] args) {
        // for loop — known count
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " "); // 1 2 3 4 5
        }

        // while loop — condition-based
        int x = 10;
        while (x > 0) {
            x -= 3;
        }
        System.out.println("\\nx = " + x); // x = -2

        // switch statement
        int day = 3;
        switch (day) {
            case 1: System.out.println("Monday"); break;
            case 2: System.out.println("Tuesday"); break;
            case 3: System.out.println("Wednesday"); break;
            default: System.out.println("Other day");
        }
    }
}`,
          language: 'java',
        }
      ],
      realWorldExamples: [],
      scenarioQuestions: [
        {
          id: 'sq-00-03-1',
          scenario: 'You are writing an ATM program. The user must enter a PIN, and the system should keep asking until they enter it correctly.',
          question: 'Which loop is the most appropriate here?',
          type: 'design-decision',
          options: ['for loop', 'while loop', 'do-while loop', 'No loop needed'],
          correctAnswer: 'do-while loop',
          explanation: 'A do-while loop is perfect here because the user MUST see the PIN prompt at least once before the condition is checked. This exactly matches our scenario.',
          relatedConcepts: ['loops', 'do-while'],
          difficulty: 'medium',
        }
      ],
      quickCheckQuestions: [],
      commonMistakes: [
        {
          id: 'cm-00-03-1',
          title: 'Off-by-one error in for loop',
          incorrectCode: '// Want to print 1 to 10\nfor (int i = 1; i < 10; i++) { // Prints 1 to 9 only!',
          correctCode: 'for (int i = 1; i <= 10; i++) { // Correct: <= not <',
          explanation: 'Be careful with < vs <=. i < 10 stops at 9; i <= 10 includes 10.',
        },
        {
          id: 'cm-00-03-2',
          title: 'Missing break in switch',
          incorrectCode: `switch(x) {
    case 1: System.out.println("One"); // Falls through!
    case 2: System.out.println("Two"); // Also executes!
}`,
          correctCode: `switch(x) {
    case 1: System.out.println("One"); break;
    case 2: System.out.println("Two"); break;
}`,
          explanation: 'Without break, switch "falls through" and executes all subsequent cases.',
        }
      ],
      examNotes: [
        { id: 'en-00-03-1', title: 'Infinite Loop Trap', content: 'Common exam question: for(int i=0; i<10; i--) is an infinite loop because i always decreases and never reaches 10.', importance: 'high' }
      ],
      vivaQuestions: [
        { id: 'vq-00-03-1', question: 'What is the difference between break and continue?', answer: 'break exits the entire loop; continue skips the current iteration and continues with the next one.', difficulty: 'easy' }
      ]
    }
  ]
};
