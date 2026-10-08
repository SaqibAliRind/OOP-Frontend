import type { MistakeQuestion, OutputQuestion, DebugChallenge, QuickCheckQuestion } from '@/types';

// ═══════════════════════════════════════════════════════════
//  JAVA BASICS  (lessonId: lesson-00-01, lesson-00-02, lesson-00-03)
// ═══════════════════════════════════════════════════════════

export const javaMistakeQuestions: MistakeQuestion[] = [
  {
    id: 'jmq-001',
    lessonId: 'lesson-00-01',
    title: 'Wrong File Name vs Class Name',
    code: `// File: App.java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}`,
    mistakeDescription: 'The file is named App.java but the public class is named Main.',
    possibleMistakes: [
      'File name does not match the public class name',
      'Missing semicolon',
      'Wrong method signature',
    ],
    correctMistake: 'File name does not match the public class name',
    correction: `// File: Main.java  (rename the file!)
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}`,
    explanation: 'In Java, the filename must exactly match the public class name. "App.java" must contain "public class App".',
    romanUrduExplanation: 'Java mein file ka naam aur public class ka naam bilkul same hona chahiye.',
    difficulty: 'easy',
    conceptTested: ['class naming', 'compilation'],
  },
  {
    id: 'jmq-002',
    lessonId: 'lesson-00-02',
    title: 'Using double quotes for char',
    code: `char grade = "A";   // Is this correct?
System.out.println(grade);`,
    mistakeDescription: 'Using double quotes instead of single quotes for a char literal.',
    possibleMistakes: [
      'char uses double quotes like String',
      'char uses single quotes',
      'char can use either quotes',
    ],
    correctMistake: 'char uses single quotes',
    correction: `char grade = 'A';   // Single quotes for char
System.out.println(grade);`,
    explanation: 'char requires single quotes \'A\'. Double quotes "A" create a String, which is a different type.',
    romanUrduExplanation: 'char ke liye single quotes use hoti hain. Double quotes se String banta hai.',
    difficulty: 'easy',
    conceptTested: ['char', 'data types'],
  },
  {
    id: 'jmq-003',
    lessonId: 'lesson-00-03',
    title: 'Off-by-one in for loop',
    code: `// Want to print numbers 1 to 10
for (int i = 1; i < 10; i++) {
    System.out.println(i);
}`,
    mistakeDescription: 'Using < instead of <= causes the loop to stop at 9, not 10.',
    possibleMistakes: [
      'Loop will print 1 to 9 (off-by-one)',
      'Loop will print 1 to 10 correctly',
      'Infinite loop',
    ],
    correctMistake: 'Loop will print 1 to 9 (off-by-one)',
    correction: `// Fixed: use <= to include 10
for (int i = 1; i <= 10; i++) {
    System.out.println(i);
}`,
    explanation: 'i < 10 stops before i reaches 10. Use i <= 10 to include 10 in the output.',
    romanUrduExplanation: 'i < 10 condition 10 pe false ho jati hai isliye 9 tak hi print hota hai. i <= 10 use karo.',
    difficulty: 'easy',
    conceptTested: ['for loop', 'conditions'],
  },
];

export const javaOutputQuestions: OutputQuestion[] = [
  {
    id: 'joq-001',
    lessonId: 'lesson-00-01',
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello");
        System.out.print("World");
        System.out.println("!");
    }
}`,
    options: ['HelloWorld!', 'Hello\nWorld!', 'Hello\nWorld\n!', 'HelloWorld\n!'],
    correctOutput: 'Hello\nWorld!',
    explanation: 'println adds a newline after printing. print does not. So "Hello" ends with newline, "World" and "!" are on the same line.',
    romanUrduExplanation: 'println ke baad naya line aata hai, print ke baad nahi. Is liye Hello alag line pe aur World! ek line pe.',
    conceptTested: ['println vs print', 'output'],
    difficulty: 'easy',
  },
  {
    id: 'joq-002',
    lessonId: 'lesson-00-02',
    code: `public class Main {
    public static void main(String[] args) {
        int x = 5;
        double y = x;
        System.out.println(y);
    }
}`,
    options: ['5', '5.0', 'Compile Error', '5.000000'],
    correctOutput: '5.0',
    explanation: 'int x = 5 is widened to double automatically. When printed, double 5 shows as 5.0.',
    romanUrduExplanation: 'int ko double mein automatically convert (widen) kiya jata hai. double 5 ko print karne par 5.0 aata hai.',
    conceptTested: ['type widening', 'double'],
    difficulty: 'easy',
  },
  {
    id: 'joq-003',
    lessonId: 'lesson-00-03',
    code: `public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 3; i++) {
            if (i == 1) continue;
            System.out.println(i);
        }
    }
}`,
    options: ['0 1 2', '0 2', '1 2', '0 1'],
    correctOutput: '0 2',
    explanation: 'When i==1, continue skips that iteration. So only 0 and 2 are printed.',
    romanUrduExplanation: 'Jab i==1 hota hai continue current iteration skip kar deta hai. Isliye sirf 0 aur 2 print hota hai.',
    conceptTested: ['continue', 'loops'],
    difficulty: 'medium',
  },
];

export const javaDebugChallenges: DebugChallenge[] = [
  {
    id: 'jdc-001',
    lessonId: 'lesson-00-01',
    title: 'Fix the Hello World Program',
    description: 'This program has 2 bugs preventing it from compiling. Find and fix them.',
    buggyCode: `public class Main {
    public static void Main(String[] args) {
        System.out.println("Hello, World!")
    }
}`,
    expectedBehavior: 'Should print: Hello, World!',
    hints: [
      'Java method names are case-sensitive',
      'Every statement must end with a semicolon',
    ],
    solution: `public class Main {
    public static void main(String[] args) {  // Bug 1: main not Main
        System.out.println("Hello, World!");   // Bug 2: missing semicolon
    }
}`,
    explanation: 'Bug 1: main() must be lowercase — JVM looks for "main" not "Main". Bug 2: println statement is missing the semicolon at the end.',
    difficulty: 'easy',
    xpReward: 100,
    topicTags: ['main method', 'syntax', 'semicolon'],
  },
  {
    id: 'jdc-002',
    lessonId: 'lesson-00-03',
    title: 'Infinite Loop Detective',
    description: 'This loop runs forever. Find the bug and fix it.',
    buggyCode: `public class Main {
    public static void main(String[] args) {
        int count = 1;
        while (count <= 5) {
            System.out.println("Count: " + count);
            count--;  // Bug is here!
        }
    }
}`,
    expectedBehavior: 'Should print Count: 1 through Count: 5 and stop.',
    hints: [
      'Check whether the loop variable is moving toward or away from the exit condition',
      'count-- decreases the value',
    ],
    solution: `public class Main {
    public static void main(String[] args) {
        int count = 1;
        while (count <= 5) {
            System.out.println("Count: " + count);
            count++;  // Fixed: increment, not decrement
        }
    }
}`,
    explanation: 'count-- decrements count, making it go 1, 0, -1, -2... forever. It never reaches the exit condition (count > 5). Change to count++ to increment toward the exit.',
    difficulty: 'easy',
    xpReward: 100,
    topicTags: ['while loop', 'infinite loop', 'increment'],
  },
];

export const javaQuickChecks: QuickCheckQuestion[] = [
  {
    id: 'jqc-001',
    lessonId: 'lesson-00-01',
    type: 'mcq',
    question: 'Which of the following is a valid entry point for a Java program?',
    options: [
      'public static void Main(String[] args)',
      'public void main(String args)',
      'public static void main(String[] args)',
      'static main(String[] args)',
    ],
    correctAnswer: 'public static void main(String[] args)',
    explanation: 'The JVM specifically looks for: public static void main(String[] args). Any variation will not be recognized as the entry point.',
    difficulty: 'easy',
  },
  {
    id: 'jqc-002',
    lessonId: 'lesson-00-02',
    type: 'mcq',
    question: 'What is the size of a double in Java?',
    options: ['2 bytes', '4 bytes', '8 bytes', '16 bytes'],
    correctAnswer: '8 bytes',
    explanation: 'double is 64-bit (8 bytes) in Java. float is 4 bytes. This is fixed regardless of platform.',
    difficulty: 'easy',
  },
  {
    id: 'jqc-003',
    lessonId: 'lesson-00-02',
    type: 'true-false',
    question: 'String is a primitive data type in Java.',
    options: ['True', 'False'],
    correctAnswer: 'False',
    explanation: 'String is a class (reference type) in Java, not a primitive. The 8 primitives are: byte, short, int, long, float, double, boolean, char.',
    difficulty: 'easy',
  },
  {
    id: 'jqc-004',
    lessonId: 'lesson-00-03',
    type: 'mcq',
    question: 'Which loop is guaranteed to execute at least once?',
    options: ['for loop', 'while loop', 'do-while loop', 'All of them'],
    correctAnswer: 'do-while loop',
    explanation: 'do-while checks the condition AFTER executing the body, so the body always runs at least once.',
    difficulty: 'easy',
  },
];

// ═══════════════════════════════════════════════════════════
//  C LANGUAGE  (lessonId: c01-l01, c02-l01, etc.)
// ═══════════════════════════════════════════════════════════

export const cMistakeQuestions: MistakeQuestion[] = [
  {
    id: 'cmq-001',
    lessonId: 'c01-l01',
    title: 'Missing #include directive',
    code: `int main() {
    printf("Hello!\\n");
    return 0;
}`,
    mistakeDescription: 'printf is used but stdio.h is not included.',
    possibleMistakes: [
      'Missing #include <stdio.h>',
      'Missing return statement',
      'Wrong function name',
    ],
    correctMistake: 'Missing #include <stdio.h>',
    correction: `#include <stdio.h>

int main() {
    printf("Hello!\\n");
    return 0;
}`,
    explanation: 'printf is declared in stdio.h. Without including it, the compiler does not know about printf and will give an implicit declaration error.',
    romanUrduExplanation: 'printf ko use karne ke liye #include <stdio.h> zaroori hai warna compiler error dega.',
    difficulty: 'easy',
    conceptTested: ['preprocessor', '#include', 'stdio.h'],
  },
  {
    id: 'cmq-002',
    lessonId: 'c02-l01',
    title: 'Wrong format specifier',
    code: `#include <stdio.h>
int main() {
    int age = 20;
    printf("Age: %f\\n", age);  // Bug!
    return 0;
}`,
    mistakeDescription: 'Using %f (float) format specifier for an int variable.',
    possibleMistakes: [
      'Wrong format specifier: %f used for int',
      'Missing semicolon',
      'int should be float',
    ],
    correctMistake: 'Wrong format specifier: %f used for int',
    correction: `#include <stdio.h>
int main() {
    int age = 20;
    printf("Age: %d\\n", age);  // Fixed: %d for int
    return 0;
}`,
    explanation: '%f is for float/double. %d is for int. Using the wrong specifier gives undefined behavior or garbage output.',
    romanUrduExplanation: '%f float ke liye hai, int ke liye %d use karo. Galat specifier se garbage output aata hai.',
    difficulty: 'easy',
    conceptTested: ['format specifiers', 'printf', 'data types'],
  },
  {
    id: 'cmq-003',
    lessonId: 'c02-l01',
    title: 'Missing & in scanf',
    code: `#include <stdio.h>
int main() {
    int num;
    printf("Enter a number: ");
    scanf("%d", num);   // Bug!
    printf("You entered: %d\\n", num);
    return 0;
}`,
    mistakeDescription: 'scanf needs the address of the variable (&num), not the value.',
    possibleMistakes: [
      'Missing & (address-of) operator in scanf',
      'Wrong format specifier',
      'Missing semicolon',
    ],
    correctMistake: 'Missing & (address-of) operator in scanf',
    correction: `#include <stdio.h>
int main() {
    int num;
    printf("Enter a number: ");
    scanf("%d", &num);  // Fixed: & gives the address
    printf("You entered: %d\\n", num);
    return 0;
}`,
    explanation: 'scanf needs a pointer (address) to store the value. & is the address-of operator. Without it, you pass the uninitialized value of num as an address, causing undefined behavior/crash.',
    romanUrduExplanation: 'scanf ko variable ki address chahiye hoti hai. & address-of operator hai. Is ke baghair program crash ho sakta hai.',
    difficulty: 'medium',
    conceptTested: ['scanf', 'address-of operator', 'pointers'],
  },
];

export const cOutputQuestions: OutputQuestion[] = [
  {
    id: 'coq-001',
    lessonId: 'c01-l01',
    code: `#include <stdio.h>
int main() {
    printf("Line 1\\n");
    printf("Line 2");
    printf(" Line 3\\n");
    return 0;
}`,
    options: [
      'Line 1\nLine 2\nLine 3',
      'Line 1\nLine 2 Line 3',
      'Line 1 Line 2 Line 3',
      'Compile Error',
    ],
    correctOutput: 'Line 1\nLine 2 Line 3',
    explanation: '\\n creates a newline. "Line 2" has no \\n so "Line 3" continues on the same line after a space.',
    romanUrduExplanation: '\\n newline create karta hai. Line 2 mein \\n nahi hai isliye Line 3 same line pe space ke saath aa jata hai.',
    conceptTested: ['printf', 'newline', '\\n'],
    difficulty: 'easy',
  },
  {
    id: 'coq-002',
    lessonId: 'c02-l01',
    code: `#include <stdio.h>
int main() {
    int a = 10, b = 3;
    printf("%d\\n", a / b);
    printf("%.2f\\n", (float)a / b);
    return 0;
}`,
    options: ['3\n3.33', '3.33\n3.33', '3\n3.00', '10\n10.00'],
    correctOutput: '3\n3.33',
    explanation: 'int/int does integer division: 10/3 = 3. Casting to (float) before dividing gives 3.33.',
    romanUrduExplanation: 'int/int integer division karta hai: 10/3 = 3. (float)a se pehle cast karne par 3.33 milta hai.',
    conceptTested: ['integer division', 'type casting', 'float'],
    difficulty: 'medium',
  },
];

export const cDebugChallenges: DebugChallenge[] = [
  {
    id: 'cdc-001',
    lessonId: 'c01-l01',
    title: 'Fix the C Hello World',
    description: 'This C program has 3 bugs. Find them all and fix them.',
    buggyCode: `#include <stdio.h>

int main() {
    Printf("Hello World\\n")
    return 0
}`,
    expectedBehavior: 'Should print: Hello World',
    hints: [
      'C is case-sensitive — check function name capitalization',
      'Every statement in C ends with a semicolon',
      'Check the statement inside main',
    ],
    solution: `#include <stdio.h>

int main() {
    printf("Hello World\\n");  // Bug 1: Printf → printf (lowercase p)
    return 0;                   // Bug 2 & 3: missing semicolons
}`,
    explanation: 'Bug 1: Printf should be printf (lowercase). Bugs 2 & 3: Both statements are missing semicolons (;).',
    difficulty: 'easy',
    xpReward: 100,
    topicTags: ['syntax', 'printf', 'semicolon'],
  },
  {
    id: 'cdc-002',
    lessonId: 'c02-l01',
    title: 'The Scanf Bug',
    description: 'This program compiles but crashes or gives wrong output when you run it.',
    buggyCode: `#include <stdio.h>

int main() {
    int num;
    printf("Enter number: ");
    scanf("%d", num);     /* Bug is here */
    printf("Got: %d\\n", num);
    return 0;
}`,
    expectedBehavior: 'Should read a number from user and print it back.',
    hints: [
      'scanf needs to know WHERE in memory to store the value',
      'Think about what & does',
      'You need to pass the address of num, not its value',
    ],
    solution: `#include <stdio.h>

int main() {
    int num;
    printf("Enter number: ");
    scanf("%d", &num);    /* Fixed: & gives address of num */
    printf("Got: %d\\n", num);
    return 0;
}`,
    explanation: 'scanf needs a pointer (memory address) to store the input. &num means "the address of num". Without &, you pass an uninitialized garbage value as an address, causing a crash.',
    difficulty: 'medium',
    xpReward: 150,
    topicTags: ['scanf', 'pointers', 'address-of'],
  },
];

export const cQuickChecks: QuickCheckQuestion[] = [
  {
    id: 'cqc-001',
    lessonId: 'c01-l01',
    type: 'mcq',
    question: 'Which header file must you include to use printf() in C?',
    options: ['<stdlib.h>', '<stdio.h>', '<string.h>', '<math.h>'],
    correctAnswer: '<stdio.h>',
    explanation: 'stdio.h stands for Standard Input/Output. It declares printf, scanf, and other I/O functions.',
    difficulty: 'easy',
  },
  {
    id: 'cqc-002',
    lessonId: 'c01-l01',
    type: 'mcq',
    question: 'What does "return 0;" at the end of main() signal?',
    options: [
      'Program failed',
      'Program completed successfully',
      'Program will restart',
      'Nothing — it is optional garbage',
    ],
    correctAnswer: 'Program completed successfully',
    explanation: 'return 0 tells the OS the program exited with no error. Non-zero return values indicate errors.',
    difficulty: 'easy',
  },
  {
    id: 'cqc-003',
    lessonId: 'c02-l01',
    type: 'mcq',
    question: 'Which format specifier is used for printing a float in C?',
    options: ['%d', '%c', '%f', '%s'],
    correctAnswer: '%f',
    explanation: '%f is the format specifier for float and double in printf. %d is for int, %c for char, %s for string.',
    difficulty: 'easy',
  },
  {
    id: 'cqc-004',
    lessonId: 'c02-l01',
    type: 'true-false',
    question: 'In C, you can use a variable before declaring it.',
    options: ['True', 'False'],
    correctAnswer: 'False',
    explanation: 'In C, all variables must be declared before they are used. This is a compile-time rule.',
    romanUrduExplanation: 'C mein variable use karne se pehle declare karna zaroori hai.',
    difficulty: 'easy',
  },
];
