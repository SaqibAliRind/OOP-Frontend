import type { Module } from '@/types';

export const module11: Module = {
  id: 'module-11',
  title: 'Exception Handling',
  slug: 'exception-handling',
  order: 11,
  description: 'Master Java exception handling from fundamentals to advanced patterns. Learn try-catch-finally, exception hierarchy, checked vs unchecked exceptions, custom exceptions, try-with-resources, and real-world error handling strategies.',
  icon: 'ShieldAlert',
  color: '#ef4444',
  xpReward: 750,
  isUnlocked: false,
  completed: false,
  progress: 0,
  totalDuration: 280,
  prerequisiteModuleIds: ['module-10'],
  lessons: [
    {
      id: 'lesson-11-01',
      moduleId: 'module-11',
      title: 'What are Exceptions?',
      slug: 'what-are-exceptions',
      order: 1,
      duration: 15,
      description: 'Understand what exceptions are, why they occur, and the critical importance of proper error handling in Java.',
      learningObjectives: [
        { id: 'lo-11-01-1', description: 'Define what an exception is in Java', completed: false },
        { id: 'lo-11-01-2', description: 'Explain the difference between exceptions and errors', completed: false },
        { id: 'lo-11-01-3', description: 'Identify common causes of runtime errors', completed: false },
        { id: 'lo-11-01-4', description: 'Understand why exception handling is essential', completed: false },
      ],
      englishExplanation: {
        id: 'ee-11-01',
        text: `An exception is an event that disrupts the normal flow of a program's execution. When an unexpected condition occurs during runtime, Java creates an exception object and hands it to the runtime system. This process is called "throwing" an exception. The runtime system then tries to find someone to handle it — this is called "exception handling."

Without exception handling, a runtime error would crash your entire program. Imagine a banking application that crashes because of one invalid transaction — that would be catastrophic. Exception handling allows programs to gracefully recover from errors, log them for debugging, and continue operating.

**Exception vs Error**: In Java, both are subclasses of Throwable. An Exception represents a condition that a reasonable application might want to catch and recover from. An Error represents a serious problem that a reasonable application should not try to catch — these are usually system-level failures like OutOfMemoryError or StackOverflowError.

**Common Causes of Exceptions**:
1. **Invalid Input**: User enters a string where an integer is expected.
2. **File Operations**: File does not exist, disk is full, permissions denied.
3. **Network Issues**: Connection timeout, server unavailable.
4. **Database Errors**: Connection lost, query syntax error, constraint violation.
5. **Logic Errors**: Array index out of bounds, null pointer access, divide by zero.

**Exception Object**: Contains information about the error:
- Exception type (e.g., NullPointerException)
- Error message (e.g., "Cannot invoke method on null reference")
- Stack trace (shows where the error occurred in the code)
- Timestamp and thread information

Java's exception mechanism is fundamentally different from C's error codes. In C, functions return error codes that must be checked manually. Java's exceptions are automatic — they propagate up the call stack until handled, ensuring errors cannot be silently ignored.`
      },
      romanUrduExplanation: {
        id: 'ru-11-01',
        text: `Exception ek event hai jo program ke normal execution flow ko disrupt karta hai. Jab runtime mein koi unexpected condition hoti hai, toh Java ek exception object create karta hai aur runtime system ko deta hai. Is process ko "throwing" an exception kehte hain.

Bina exception handling ke, runtime error aapka poora program crash kar deta hai. Imagine karein ek banking application jo ek invalid transaction ki wajah se crash ho jaye — ye catastrophic hoga. Exception handling programs ko gracefully errors se recover karne deti hai.

**Exception vs Error**: Java mein dono Throwable ke subclasses hain. Exception us condition ko represent karta hai jo reasonable application catch aur recover karna chahe. Error serious problem hai jo reasonable application catch nahi karni chahiye — ye system-level failures hain jaise OutOfMemoryError.

**Exceptions ke Common Causes**:
1. **Invalid Input**: User integer ki jagah string enter kare.
2. **File Operations**: File exist nahi karta, disk full hai.
3. **Network Issues**: Connection timeout, server unavailable.
4. **Database Errors**: Connection lost, query error.
5. **Logic Errors**: Array index out of bounds, null pointer, divide by zero.

**Exception Object** mein error ki information hoti hai:
- Exception type (jaise NullPointerException)
- Error message
- Stack trace (dikhata hai error kahan hua)
- Timestamp aur thread information

Java ki exception mechanism C ke error codes se fundamentally different hai. C mein functions error codes return karte hain jo manually check karne padte hain. Java ke exceptions automatic hain — ye call stack mein propagate hota hai jab tak handle na ho jaye.`
      },
      keyPoints: [
        { id: 'kp-11-01-1', title: 'Exception Definition', description: 'An exception is an event that disrupts normal program execution, represented as an object thrown and caught.' },
        { id: 'kp-11-01-2', title: 'Exception vs Error', description: 'Exceptions are recoverable conditions. Errors are serious system problems that should not be caught.' },
        { id: 'kp-11-01-3', title: 'Exception Object', description: 'Contains type, message, stack trace, and metadata about the error condition.' },
        { id: 'kp-11-01-4', title: 'Propagation', description: 'Unhandled exceptions propagate up the call stack until caught by a handler or the program terminates.' },
      ],
      codeExamples: [
        {
          id: 'ce-11-01-1',
          title: 'Exception Without Handling',
          code: `public class ExceptionDemo {
    public static void main(String[] args) {
        // This will throw ArithmeticException
        int result = 10 / 0;
        System.out.println("This line never executes!");
    }
}

// Output:
// Exception in thread "main" java.lang.ArithmeticException: / by zero
//     at ExceptionDemo.main(ExceptionDemo.java:4)`,
          language: 'java',
          output: 'Exception in thread "main" java.lang.ArithmeticException: / by zero\n    at ExceptionDemo.main(ExceptionDemo.java:4)',
          explanation: 'Without try-catch, the exception terminates the program immediately. The print statement after the error never executes.',
        },
        {
          id: 'ce-11-01-2',
          title: 'Exception With Handling',
          code: `public class ExceptionDemo {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Error: Cannot divide by zero!");
            System.out.println("Exception type: " + e.getClass().getSimpleName());
            System.out.println("Message: " + e.getMessage());
        }
        System.out.println("Program continues normally.");
    }
}

// Output:
// Error: Cannot divide by zero!
// Exception type: ArithmeticException
// Message: / by zero
// Program continues normally.`,
          language: 'java',
          output: 'Error: Cannot divide by zero!\nException type: ArithmeticException\nMessage: / by zero\nProgram continues normally.',
          explanation: 'With try-catch, the exception is caught and handled. The program continues execution after the catch block.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-11-01-1',
          title: 'File Reading Without Exception Handling',
          scenario: 'A program reads configuration from a file. The file might not exist.',
          oopConcept: 'FileNotFoundException must be handled. Without exception handling, the program crashes if the file is missing.',
          codeExample: {
            id: 'rwe-code-11-01-1',
            title: 'File Reading Scenario',
            code: `// DANGEROUS: no exception handling
BufferedReader reader = new BufferedReader(new FileReader("config.txt"));
String line = reader.readLine();
reader.close();

// SAFER: with exception handling
try {
    BufferedReader reader = new BufferedReader(new FileReader("config.txt"));
    String line = reader.readLine();
    reader.close();
} catch (FileNotFoundException e) {
    System.out.println("Config file not found, using defaults");
} catch (IOException e) {
    System.out.println("Error reading config: " + e.getMessage());
}`,
            language: 'java',
          },
        },
      ],
      commonMistakes: [
        {
          id: 'cm-11-01-1',
          title: 'Ignoring Exceptions',
          incorrectCode: `// BAD: catching and ignoring exceptions
try {
    processData();
} catch (Exception e) {
    // Nothing here — error silently ignored!
}`,
          correctCode: `// GOOD: at minimum, log the exception
try {
    processData();
} catch (Exception e) {
    System.err.println("Error processing data: " + e.getMessage());
    e.printStackTrace();
}`,
          explanation: 'Silently ignoring exceptions makes debugging nearly impossible. Always log or handle exceptions appropriately.',
        },
      ],
      examNotes: [
        { id: 'en-11-01-1', title: 'Exception Definition', content: 'An exception is a runtime event that disrupts normal program flow, represented as an object in the Exception hierarchy.', importance: 'high' },
        { id: 'en-11-01-2', title: 'Exception vs Error', content: 'Exception = recoverable problem. Error = serious system failure. Both are subclasses of Throwable.', importance: 'high' },
        { id: 'en-11-01-3', title: 'Stack Trace', content: 'The stack trace shows the exact method calls leading to the exception. Essential for debugging.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-11-01-1', question: 'What is an exception in Java?', answer: 'An exception is an event that occurs during runtime which disrupts the normal flow of program execution. It is represented as an object that is thrown and can be caught.', difficulty: 'easy' },
        { id: 'vq-11-01-2', question: 'What is the difference between an Exception and an Error?', answer: 'Exceptions are conditions a reasonable application might catch and recover from (like invalid input). Errors are serious system problems that should not be caught (like OutOfMemoryError).', difficulty: 'medium' },
        { id: 'vq-11-01-3', question: 'What happens to an unhandled exception?', answer: 'It propagates up the call stack. If no handler catches it, the thread terminates and the program crashes with a stack trace printed.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-11-01-1', type: 'mcq', question: 'What is the superclass of all exceptions in Java?', options: ['Exception', 'Error', 'Throwable', 'RuntimeException'], correctAnswer: 'Throwable', explanation: 'Both Exception and Error are subclasses of Throwable. All exceptions and errors inherit from Throwable.' },
        { id: 'qc-11-01-2', type: 'true-false', question: 'An exception always causes the program to crash.', correctAnswer: 'False', explanation: 'With proper try-catch handling, exceptions can be caught and the program can continue execution normally.' },
        { id: 'qc-11-01-3', type: 'mcq', question: 'What does the stack trace show?', options: ['Memory usage', 'The sequence of method calls leading to the exception', 'CPU utilization', 'Network traffic'], correctAnswer: 'The sequence of method calls leading to the exception', explanation: 'A stack trace shows the call chain from the exception point back to main(), helping locate where the error occurred.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-11-01-1',
          scenario: 'A banking application tries to process a transfer but the database connection is lost mid-transaction.',
          question: 'What should the application do?',
          type: 'concept-application',
          options: [
            'Crash immediately with a stack trace',
            'Catch the exception, log it, notify the user, and attempt retry or rollback',
            'Ignore the exception and continue',
            'Restart the entire server',
          ],
          correctAnswer: 'Catch the exception, log it, notify the user, and attempt retry or rollback',
          explanation: 'Proper exception handling catches the error, logs it for debugging, notifies the user, and attempts recovery (retry or rollback).',
          relatedConcepts: ['exception-handling', 'error-recovery', 'robust-programming'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-exceptions-intro',
      prerequisites: ['lesson-10-10'],
      xpReward: 60,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'exception-flow',
      difficulty: 'easy',
      estimatedMinutes: 15,
    },
    {
      id: 'lesson-11-02',
      moduleId: 'module-11',
      title: 'Try-Catch-Finally',
      slug: 'try-catch-finally',
      order: 2,
      duration: 18,
      description: 'Master the try-catch-finally syntax, understand execution flow, and learn when finally always runs.',
      learningObjectives: [
        { id: 'lo-11-02-1', description: 'Write correct try-catch-finally blocks', completed: false },
        { id: 'lo-11-02-2', description: 'Understand the execution flow of try-catch-finally', completed: false },
        { id: 'lo-11-02-3', description: 'Know when the finally block executes', completed: false },
        { id: 'lo-11-02-4', description: 'Handle multiple exceptions with multiple catch blocks', completed: false },
      ],
      englishExplanation: {
        id: 'ee-11-02',
        text: `The try-catch-finally construct is Java's primary mechanism for handling exceptions. It consists of three parts:

**try block**: Contains the code that might throw an exception. You wrap "risky" code in a try block to monitor it for exceptions.

**catch block**: Contains the code that executes when an exception occurs. The catch block receives the exception object and can examine it, log it, or take corrective action. You can have multiple catch blocks for different exception types.

**finally block**: Contains code that always executes, whether or not an exception occurred. This is typically used for cleanup operations like closing files, releasing database connections, or freeing resources.

**Execution Flow**:
1. Code in the try block executes line by line.
2. If no exception occurs, the entire try block completes. catch blocks are skipped. finally executes.
3. If an exception occurs, the try block stops at that line. The matching catch block executes. finally executes.
4. After catch (or finally if no catch matched), execution continues after the try-catch-finally.

**Multiple Catch Blocks**: You can catch different exception types separately. Order matters — catch more specific exceptions first, then more general ones. A NullPointerException cannot be caught by an IOException catch block.

**Try-Catch Without Finally**: The finally block is optional. You can use try-catch without finally, or try-finally without catch (Java 7+).

**Key finally Rules**:
1. finally always executes — even if there is a return statement in the try or catch block.
2. finally executes after the try/catch but before the method returns.
3. If there is a System.exit() call, finally may not execute (the JVM shuts down).
4. If the JVM crashes, finally does not execute.
5. If the thread running the code is killed, finally does not execute.

The finally block is the last line of defense for resource cleanup. Without it, you risk resource leaks — open files, database connections, or network sockets that are never closed.`
      },
      romanUrduExplanation: {
        id: 'ru-11-02',
        text: `Try-catch-finally construct Java ka primary mechanism hai exceptions handle karne ka. Iske teen parts hain:

**try block**: Wo code contain karta hai jo exception throw kar sakta hai. "Risky" code ko try block mein wrap karte hain.

**catch block**: Wo code execute hota hai jab exception hoti hai. Catch block exception object receive karta hai aur use examine kar sakta hai, log kar sakta hai, ya corrective action le sakta hai.

**finally block**: Hamesha execute hota hai, chahe exception aaye ya na aaye. Typically cleanup operations ke liye use hota hai jaise files band karna, database connections release karna.

**Execution Flow**:
1. Try block ka code line by line execute hota hai.
2. Agar koi exception nahi aati, toh poora try block complete hota hai. Catch blocks skip hote hain. Finally execute hota hai.
3. Agar exception aati hai, try block us line par rukta hai. Matching catch block execute hota hai. Finally execute hota hai.
4. Catch (ya finally agar catch match nahi hua) ke baad, execution try-catch-finally ke baad continue hoti hai.

**Multiple Catch Blocks**: Alag exception types ke liye alag catch blocks ho sakte hain. Order important hai — pehle specific exceptions, phir general ones.

**Key finally Rules**:
1. Finally hamesha execute hota hai — chahe try ya catch block mein return statement ho.
2. Finally try/catch ke baad execute hota hai lekin method return se pehle.
3. Agar System.exit() call ho toh finally execute nahi ho sakta.
4. Agar JVM crash ho toh finally execute nahi hota.

Finally block resource cleanup ki last line of defense hai. Bina iske, resource leaks ka risk hota hai.`
      },
      keyPoints: [
        { id: 'kp-11-02-1', title: 'try Block', description: 'Wraps code that might throw exceptions. Monitors the code for exceptional conditions.' },
        { id: 'kp-11-02-2', title: 'catch Block', description: 'Handles specific exception types. Receives the exception object for examination and recovery.' },
        { id: 'kp-11-02-3', title: 'finally Block', description: 'Always executes for cleanup. Runs whether or not an exception occurred.' },
        { id: 'kp-11-02-4', title: 'Catch Ordering', description: 'Catch specific exceptions first, then general ones. More specific must come before more general.' },
      ],
      codeExamples: [
        {
          id: 'ce-11-02-1',
          title: 'Complete Try-Catch-Finally Example',
          code: `import java.io.*;

public class FileProcessor {
    public static void main(String[] args) {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new FileReader("data.txt"));
            String line = reader.readLine();
            System.out.println("First line: " + line);
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        } finally {
            // Always execute: cleanup
            try {
                if (reader != null) {
                    reader.close();
                    System.out.println("File closed.");
                }
            } catch (IOException e) {
                System.out.println("Error closing file.");
            }
        }
        System.out.println("Processing complete.");
    }
}`,
          language: 'java',
          output: 'File not found: data.txt (No such file or directory)\nProcessing complete.',
          explanation: 'The finally block closes the file regardless of whether an exception occurred. This ensures no resource leaks.',
        },
        {
          id: 'ce-11-02-2',
          title: 'Multiple Catch Blocks',
          code: `public class MultiCatch {
    public static void main(String[] args) {
        try {
            String str = null;
            int[] arr = new int[3];

            // These lines might throw exceptions
            System.out.println(str.length());     // NullPointerException
            System.out.println(arr[5]);           // ArrayIndexOutOfBoundsException
            int result = 10 / Integer.parseInt("abc"); // NumberFormatException

        } catch (NullPointerException e) {
            System.out.println("Null pointer: " + e.getMessage());
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array index error: " + e.getMessage());
        } catch (NumberFormatException e) {
            System.out.println("Number format error: " + e.getMessage());
        } catch (Exception e) {
            // Catch-all for any other exception
            System.out.println("Other error: " + e.getMessage());
        }
    }
}`,
          language: 'java',
          output: 'Null pointer: null',
          explanation: 'The first exception (NullPointerException) is caught. Execution stops — the array access and parseInt are never reached because the first exception terminates the try block.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-11-02-1',
          title: 'Database Connection Handling',
          scenario: 'A program connects to a database, executes queries, and must close the connection.',
          oopConcept: 'The finally block ensures the database connection is always closed, preventing resource leaks.',
          codeExample: {
            id: 'rwe-code-11-02-1',
            title: 'Database Connection Cleanup',
            code: `Connection conn = null;
PreparedStatement stmt = null;
ResultSet rs = null;
try {
    conn = DriverManager.getConnection(url, user, pass);
    stmt = conn.prepareStatement("SELECT * FROM users");
    rs = stmt.executeQuery();
    while (rs.next()) {
        System.out.println(rs.getString("name"));
    }
} catch (SQLException e) {
    e.printStackTrace();
} finally {
    // Always close in reverse order
    try { if (rs != null) rs.close(); } catch (SQLException e) {}
    try { if (stmt != null) stmt.close(); } catch (SQLException e) {}
    try { if (conn != null) conn.close(); } catch (SQLException e) {}
}`,
            language: 'java',
          },
        },
      ],
      commonMistakes: [
        {
          id: 'cm-11-02-1',
          title: 'Catching Too Broadly',
          incorrectCode: `try {
    processData();
} catch (Exception e) {
    // Catches everything, masks specific errors
    System.out.println("Error");
}`,
          correctCode: `try {
    processData();
} catch (IOException e) {
    System.out.println("IO Error: " + e.getMessage());
} catch (NumberFormatException e) {
    System.out.println("Invalid number: " + e.getMessage());
} catch (Exception e) {
    System.out.println("Unexpected: " + e.getMessage());
}`,
          explanation: 'Catching Exception hides specific error types. Always catch the most specific exceptions first and use Exception as a last resort.',
        },
        {
          id: 'cm-11-02-2',
          title: 'Returning from Finally',
          incorrectCode: `public static int test() {
    try {
        return 1;
    } finally {
        return 2;  // This overrides the try return!
    }
}
// Returns 2, not 1 — confusing and error-prone`,
          correctCode: `public static int test() {
    int result = 1;
    try {
        return result;
    } finally {
        System.out.println("Cleanup");  // Don't return from finally
    }
}
// Returns 1 as expected`,
          explanation: 'Returning from finally overrides the try/catch return value, leading to confusing behavior. Never return from finally.',
        },
      ],
      examNotes: [
        { id: 'en-11-02-1', title: 'finally Always Runs', content: 'finally always executes except when System.exit() is called or JVM crashes. Even if try/catch has a return statement.', importance: 'high' },
        { id: 'en-11-02-2', title: 'Catch Order', content: 'Catch specific exceptions before general ones. If general comes first, specific catch blocks are unreachable.', importance: 'high' },
        { id: 'en-11-02-3', title: 'finally and Return', content: 'finally executes before the method returns. If finally has a return, it overrides the try/catch return value.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-11-02-1', question: 'When does the finally block execute?', answer: 'The finally block always executes, whether or not an exception occurred. It runs after try/catch but before the method returns. Exceptions: System.exit() call or JVM crash.', difficulty: 'medium' },
        { id: 'vq-11-02-2', question: 'Why must specific exceptions be caught before general ones?', answer: 'Java checks catch blocks in order. If a general Exception catch comes first, it catches everything, making specific catch blocks unreachable (compile error).', difficulty: 'medium' },
        { id: 'vq-11-02-3', question: 'What is the purpose of the finally block?', answer: 'Resource cleanup. It ensures files are closed, connections are released, and resources are freed regardless of whether an exception occurred.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-11-02-1', type: 'mcq', question: 'What happens if an exception occurs in the try block?', options: ['The program crashes immediately', 'The rest of the try block is skipped, matching catch executes, then finally executes', 'The catch block is skipped', 'The finally block does not run'], correctAnswer: 'The rest of the try block is skipped, matching catch executes, then finally executes', explanation: 'When an exception occurs, remaining try code is skipped, the matching catch block executes, then finally executes.' },
        { id: 'qc-11-02-2', type: 'true-false', question: 'The finally block always executes, even if there is a return statement in the try block.', correctAnswer: 'True', explanation: 'Finally always executes. If try has a return, finally executes before the method actually returns.' },
        { id: 'qc-11-02-3', type: 'mcq', question: 'Is the finally block required in a try-catch structure?', options: ['Yes, it is mandatory', 'No, it is optional', 'Only for checked exceptions', 'Only when using System.exit()'], correctAnswer: 'No, it is optional', explanation: 'You can use try-catch without finally, or try-finally without catch. Finally is optional but recommended for cleanup.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-11-02-1',
          scenario: 'You are writing a method that reads a file and processes its content. The file might not exist, and processing might throw an error.',
          question: 'How should you structure the exception handling?',
          type: 'concept-application',
          options: [
            'Use try-catch-finally with catch for FileNotFoundException and IOException, finally to close the file',
            'Use only try-catch without finally',
            'Use only a catch-all Exception catch block',
            'No exception handling needed — Java handles it automatically',
          ],
          correctAnswer: 'Use try-catch-finally with catch for FileNotFoundException and IOException, finally to close the file',
          explanation: 'Specific catches handle different error types. Finally ensures the file is always closed regardless of success or failure.',
          relatedConcepts: ['try-catch-finally', 'resource-cleanup', 'specific-catching'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-try-catch-finally',
      prerequisites: ['lesson-11-01'],
      xpReward: 70,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'try-catch-flow',
      difficulty: 'easy',
      estimatedMinutes: 18,
    },
    {
      id: 'lesson-11-03',
      moduleId: 'module-11',
      title: 'Exception Hierarchy',
      slug: 'exception-hierarchy',
      order: 3,
      duration: 18,
      description: 'Explore the complete Java exception hierarchy: Throwable, Exception, RuntimeException, Error, and their subclasses.',
      learningObjectives: [
        { id: 'lo-11-03-1', description: 'Map the complete exception class hierarchy', completed: false },
        { id: 'lo-11-03-2', description: 'Identify where specific exceptions fall in the hierarchy', completed: false },
        { id: 'lo-11-03-3', description: 'Understand the role of Throwable as the root class', completed: false },
        { id: 'lo-11-03-4', description: 'Recognize common exception types and their hierarchy positions', completed: false },
      ],
      englishExplanation: {
        id: 'ee-11-03',
        text: `The Java exception hierarchy is a tree structure rooted at \`java.lang.Throwable\`. Understanding this hierarchy is essential for writing proper catch blocks and understanding which exceptions can be caught together.

**Throwable** is the root class. Everything that can be thrown in Java inherits from Throwable. It has two direct subclasses:

**Exception**: Represents conditions that a reasonable application should catch. This is the superclass for all checked exceptions. Subclasses include:
- \`IOException\` — input/output failures
- \`SQLException\` — database access errors
- \`ClassNotFoundException\` — class not found during loading
- \`FileNotFoundException\` — file does not exist
- \`InterruptedException\` — thread was interrupted

**RuntimeException**: A subclass of Exception. Represents conditions that occur during normal execution and that a reasonable application should not need to catch. These are unchecked exceptions. Subclasses include:
- \`NullPointerException\` — accessing a method on null reference
- \`ArrayIndexOutOfBoundsException\` — invalid array index
- \`ArithmeticException\` — divide by zero
- \`ClassCastException\` — invalid type cast
- \`IllegalArgumentException\` — illegal method argument
- \`NumberFormatException\` — invalid string to number conversion

**Error**: Represents serious system-level problems. Applications should not catch these. Subclasses include:
- \`OutOfMemoryError\` — JVM ran out of memory
- \`StackOverflowError\` — infinite recursion
- \`VirtualMachineError\` — JVM internal error

**The Complete Hierarchy**:
\`\`\`
Throwable
├── Exception (checked)
│   ├── IOException
│   │   ├── FileNotFoundException
│   │   └── ...
│   ├── SQLException
│   ├── ClassNotFoundException
│   └── RuntimeException (unchecked)
│       ├── NullPointerException
│       ├── ArrayIndexOutOfBoundsException
│       ├── ArithmeticException
│       ├── ClassCastException
│       ├── IllegalArgumentException
│       │   └── NumberFormatException
│       └── ...
└── Error (unchecked)
    ├── OutOfMemoryError
    ├── StackOverflowError
    └── VirtualMachineError
\`\`\`

**Inheritance and Catch Blocks**: A catch block for Exception catches all exceptions (since Exception is the parent of RuntimeException). A catch block for RuntimeException catches only unchecked exceptions. Understanding the hierarchy helps write precise catch blocks.`
      },
      romanUrduExplanation: {
        id: 'ru-11-03',
        text: `Java exception hierarchy ek tree structure hai jo \`java.lang.Throwable\` se root hota hai. Is hierarchy ko samajhna sahi catch blocks likhne ke liye zaroori hai.

**Throwable** root class hai. Java mein jo bhi throw ho sakta hai, wo Throwable se inherit hota hai. Iske do direct subclasses hain:

**Exception**: Un conditions ko represent karta hai jo reasonable application ko catch karna chahiye. Checked exceptions ka superclass hai. Subclasses hain: IOException, SQLException, ClassNotFoundException, FileNotFoundException.

**RuntimeException**: Exception ka subclass hai. Normal execution ke dauran hone wali conditions ko represent karta hai. Ye unchecked exceptions hain. Subclasses: NullPointerException, ArrayIndexOutOfBoundsException, ArithmeticException, ClassCastException.

**Error**: Serious system-level problems represent karta hai. Applications ko inhe catch nahi karna chahiye. Subclasses: OutOfMemoryError, StackOverflowError, VirtualMachineError.

**Complete Hierarchy**:
\`\`\`
Throwable
├── Exception (checked)
│   ├── IOException
│   ├── SQLException
│   └── RuntimeException (unchecked)
│       ├── NullPointerException
│       ├── ArrayIndexOutOfBoundsException
│       └── ArithmeticException
└── Error (unchecked)
    ├── OutOfMemoryError
    └── StackOverflowError
\`\`\`

**Inheritance and Catch**: Exception ka catch block sab exceptions catch karta hai. RuntimeException ka catch block sirf unchecked exceptions catch karta hai. Hierarchy samajh se precise catch blocks likh sakte hain.`
      },
      keyPoints: [
        { id: 'kp-11-03-1', title: 'Throwable Root', description: 'All exceptions and errors inherit from java.lang.Throwable. It is the root of the entire hierarchy.' },
        { id: 'kp-11-03-2', title: 'Exception Branch', description: 'Exception is for recoverable conditions. Contains both checked and unchecked (RuntimeException) subclasses.' },
        { id: 'kp-11-03-3', title: 'Error Branch', description: 'Error is for serious system failures. Applications should not catch or handle these.' },
        { id: 'kp-11-03-4', title: 'RuntimeException', description: 'Unchecked exceptions that occur during normal execution. Do not require try-catch but can be caught.' },
      ],
      codeExamples: [
        {
          id: 'ce-11-03-1',
          title: 'Exception Hierarchy in Action',
          code: `public class HierarchyDemo {
    public static void main(String[] args) {
        // Catching at different hierarchy levels

        try {
            String s = null;
            s.length(); // NullPointerException
        } catch (RuntimeException e) {
            // Catches NullPointerException (it's a RuntimeException)
            System.out.println("Runtime: " + e.getClass().getSimpleName());
        }

        try {
            int x = Integer.parseInt("abc"); // NumberFormatException
        } catch (NumberFormatException e) {
            // Catches NumberFormatException specifically
            System.out.println("Number format: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            // Would also catch NumberFormatException (it's a subclass)
            System.out.println("Illegal argument: " + e.getMessage());
        }

        try {
            throw new IOException("Disk error");
        } catch (Exception e) {
            // Catches all checked exceptions
            System.out.println("Exception: " + e.getClass().getSimpleName());
        }
    }
}`,
          language: 'java',
          output: 'Runtime: NullPointerException\nNumber format: For input string: "abc"\nException: IOException',
          explanation: 'Different catch blocks catch exceptions at different hierarchy levels. A parent catch block catches all its subclasses.',
        },
        {
          id: 'ce-11-03-2',
          title: 'Common Exception Types',
          code: `public class CommonExceptions {
    public static void main(String[] args) {
        // NullPointerException
        try {
            String s = null;
            s.toUpperCase();
        } catch (NullPointerException e) {
            System.out.println("NPE: " + e.getMessage());
        }

        // ArrayIndexOutOfBoundsException
        try {
            int[] arr = {1, 2, 3};
            int val = arr[10];
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("AIOOBE: Index " + e.getMessage());
        }

        // ClassCastException
        try {
            Object obj = "Hello";
            Integer num = (Integer) obj;
        } catch (ClassCastException e) {
            System.out.println("CCE: " + e.getMessage());
        }

        // ArithmeticException
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("AE: " + e.getMessage());
        }
    }
}`,
          language: 'java',
          output: 'NPE: null\nAIOOBE: Index 10\nCCE: java.lang.String cannot be cast to java.lang.Integer\nAE: / by zero',
          explanation: 'Each common exception type has a specific message that helps identify the root cause.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-11-03-1',
          title: 'Shopping Cart Exception Hierarchy',
          scenario: 'An e-commerce system throws different exceptions for different error conditions.',
          oopConcept: 'ProductNotFoundException (checked) for missing products, InsufficientStockException (checked) for inventory issues, InvalidPriceException (unchecked) for programming errors.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-11-03-1',
          title: 'Catching Throwable Instead of Exception',
          incorrectCode: `try {
    riskyOperation();
} catch (Throwable t) {
    // This catches Error too — you should NOT catch Errors
    // OutOfMemoryError, StackOverflowError would be caught here
}`,
          correctCode: `try {
    riskyOperation();
} catch (Exception e) {
    // Only catches Exceptions, not Errors
    // Errors indicate serious system problems
}`,
          explanation: 'Never catch Throwable or Error unless you have a very specific reason. Errors indicate problems that should not be recovered from.',
        },
      ],
      examNotes: [
        { id: 'en-11-03-1', title: 'Hierarchy Root', content: 'Throwable is the root. Exception and Error are its direct subclasses. RuntimeException is a subclass of Exception.', importance: 'high' },
        { id: 'en-11-03-2', title: 'Common Exceptions', content: 'Know the most common: NullPointerException, ArrayIndexOutOfBoundsException, ClassCastException, ArithmeticException, NumberFormatException.', importance: 'high' },
        { id: 'en-11-03-3', title: 'Catch Block Inheritance', content: 'A catch for a parent type catches all its subtypes. Catch Exception catches everything. Catch RuntimeException catches only unchecked.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-11-03-1', question: 'What is the complete exception hierarchy in Java?', answer: 'Throwable (root) → Exception (checked) with RuntimeException subclass (unchecked), and Error (unchecked). RuntimeException includes NullPointerException, ArithmeticException, etc.', difficulty: 'medium' },
        { id: 'vq-11-03-2', question: 'Why should you not catch Error?', answer: 'Errors represent serious system problems like OutOfMemoryError. They indicate the JVM itself is in trouble. Catching them masks critical failures and can lead to undefined behavior.', difficulty: 'hard' },
      ],
      quickCheckQuestions: [
        { id: 'qc-11-03-1', type: 'mcq', question: 'What is the superclass of RuntimeException?', options: ['Throwable', 'Exception', 'Error', 'Object'], correctAnswer: 'Exception', explanation: 'RuntimeException is a subclass of Exception. Exception is a subclass of Throwable.' },
        { id: 'qc-11-03-2', type: 'true-false', question: 'NullPointerException is a checked exception.', correctAnswer: 'False', explanation: 'NullPointerException is an unchecked exception (subclass of RuntimeException). It does not require try-catch.' },
        { id: 'qc-11-03-3', type: 'mcq', question: 'A catch block for Exception catches:', options: ['Only checked exceptions', 'Only unchecked exceptions', 'All exceptions including RuntimeException', 'Only IOException'], correctAnswer: 'All exceptions including RuntimeException', explanation: 'Exception is the parent of both checked exceptions and RuntimeException, so catching Exception catches all.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-11-03-1',
          scenario: 'You want to catch only programming errors (like NullPointerException, ArrayIndexOutOfBoundsException) but not checked exceptions.',
          question: 'What should your catch block catch?',
          type: 'concept-application',
          options: [
            'catch (Exception e)',
            'catch (Throwable t)',
            'catch (RuntimeException e)',
            'catch (Error e)',
          ],
          correctAnswer: 'catch (RuntimeException e)',
          explanation: 'RuntimeException catches all unchecked exceptions (programming errors) but not checked exceptions like IOException.',
          relatedConcepts: ['exception-hierarchy', 'checked-unchecked', 'runtime-exception'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-exception-hierarchy',
      prerequisites: ['lesson-11-01'],
      xpReward: 70,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'exception-tree',
      difficulty: 'medium',
      estimatedMinutes: 18,
    },
    {
      id: 'lesson-11-04',
      moduleId: 'module-11',
      title: 'Checked vs Unchecked Exceptions',
      slug: 'checked-vs-unchecked',
      order: 4,
      duration: 18,
      description: 'Understand the fundamental difference between checked and unchecked exceptions, and when to use each type.',
      learningObjectives: [
        { id: 'lo-11-04-1', description: 'Distinguish between checked and unchecked exceptions', completed: false },
        { id: 'lo-11-04-2', description: 'Know when the compiler forces exception handling', completed: false },
        { id: 'lo-11-04-3', description: 'Apply the right exception type in design decisions', completed: false },
        { id: 'lo-11-04-4', description: 'Understand the throws clause requirement', completed: false },
      ],
      englishExplanation: {
        id: 'ee-11-04',
        text: `Java divides exceptions into two categories: checked and unchecked. This distinction has profound implications for how you write and design your code.

**Checked Exceptions**: The compiler checks these at compile time. If a method can throw a checked exception, the caller must either catch it or declare it in the method's \`throws\` clause. This is a compile-time guarantee that exceptions will be handled. Checked exceptions represent recoverable conditions that the caller should be aware of and handle.

Examples: IOException, SQLException, ClassNotFoundException, FileNotFoundException, InterruptedException.

**Unchecked Exceptions**: The compiler does not check these. They are subclasses of RuntimeException or Error. You can catch them, but the compiler does not require it. Unchecked exceptions typically represent programming bugs — errors that indicate something is wrong with the code itself.

Examples: NullPointerException, ArrayIndexOutOfBoundsException, ArithmeticException, ClassCastException, IllegalArgumentException.

**When to Use Each**:
1. **Checked** for recoverable, expected conditions: file not found (user might select wrong file), connection timeout (retry logic).
2. **Unchecked** for programming errors: null dereference, array bounds, invalid cast — these should be fixed in the code, not caught.

**throws Clause**: When a method throws a checked exception, it must declare it:
\`\`\`java
public void readFile(String path) throws IOException {
    FileReader reader = new FileReader(path);
}
\`\`\`
The caller must handle the IOException:
\`\`\`java
try {
    readFile("data.txt");
} catch (IOException e) {
    // handle
}
\`\`\`

**Design Philosophy**: Java's creators chose to make I/O, database, and reflection exceptions checked because they believed callers should always handle these expected failure conditions. The debate continues — some modern languages (C#, Python) use only unchecked exceptions. Java's checked exceptions provide compile-time safety but can lead to verbose code.`
      },
      romanUrduExplanation: {
        id: 'ru-11-04',
        text: `Java exceptions ko do categories mein divide karta hai: checked aur unchecked. Is distinction ke profound implications hain code likhne aur design karne par.

**Checked Exceptions**: Compiler compile time par check karta hai. Agar method checked exception throw kar sakta hai, toh caller ko ya use catch karna padta hai ya method ki \`throws\` clause mein declare karna padta hai. Ye compile-time guarantee hai ke exceptions handle hongi.

Examples: IOException, SQLException, ClassNotFoundException, FileNotFoundException.

**Unchecked Exceptions**: Compiler check nahi karta. Ye RuntimeException ya Error ke subclasses hain. Inhe catch kar sakte hain lekin compiler require nahi karta. Typically programming bugs represent karte hain.

Examples: NullPointerException, ArrayIndexOutOfBoundsException, ArithmeticException, ClassCastException.

**Kab kya Use Karein**:
1. **Checked** recoverable, expected conditions ke liye: file not found, connection timeout.
2. **Unchecked** programming errors ke liye: null dereference, array bounds, invalid cast.

**throws Clause**: Jab method checked exception throw kare, toh use declare karna padta hai:
\`\`\`java
public void readFile(String path) throws IOException { ... }
\`\`\`

**Design Philosophy**: Java ke creators ne I/O, database aur reflection exceptions isliye checked banaye kyunki unhe laga callers ko hamesha in expected failure conditions ko handle karna chahiye. C#, Python jaisi languages sirf unchecked exceptions use karti hain. Java ke checked exceptions compile-time safety dete hain lekin verbose code create kar sakte hain.`
      },
      keyPoints: [
        { id: 'kp-11-04-1', title: 'Checked Exceptions', description: 'Compiler enforces handling at compile time. Must be caught or declared in throws clause.' },
        { id: 'kp-11-04-2', title: 'Unchecked Exceptions', description: 'No compile-time enforcement. Subclasses of RuntimeException. Represent programming errors.' },
        { id: 'kp-11-04-3', title: 'throws Keyword', description: 'Declares that a method may throw a checked exception. Callers must handle it.' },
        { id: 'kp-11-04-4', title: 'Design Choice', description: 'Use checked for expected, recoverable failures. Use unchecked for programming bugs.' },
      ],
      codeExamples: [
        {
          id: 'ce-11-04-1',
          title: 'Checked Exception Handling',
          code: `import java.io.*;

public class CheckedDemo {
    // Method declares it throws IOException (checked)
    public static String readFile(String path) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(path));
        String content = reader.readLine();
        reader.close();
        return content;
    }

    public static void main(String[] args) {
        // Must handle the checked exception — won't compile without try-catch or throws
        try {
            String data = readFile("config.txt");
            System.out.println(data);
        } catch (IOException e) {
            System.out.println("Could not read file: " + e.getMessage());
        }
    }
}`,
          language: 'java',
          explanation: 'readFile throws a checked IOException. The caller must catch it or declare throws. This is enforced at compile time.',
        },
        {
          id: 'ce-11-04-2',
          title: 'Unchecked Exception - No Compiler Enforcement',
          code: `public class UncheckedDemo {
    // No throws clause needed — NullPointerException is unchecked
    public static int getFirstElement(int[] arr) {
        return arr[0]; // Could throw ArrayIndexOutOfBoundsException
    }

    public static void main(String[] args) {
        // This compiles fine even though it might throw an exception
        int value = getFirstElement(new int[]{10, 20, 30});
        System.out.println(value);

        // This will throw unchecked exception at runtime
        int bad = getFirstElement(new int[]{});
        // ArrayIndexOutOfBoundsException — compiler doesn't warn!
    }
}`,
          language: 'java',
          output: '10\nException in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 0 out of bounds for length 0',
          explanation: 'Unchecked exceptions do not require compile-time handling. The compiler allows the code even though it may fail at runtime.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-11-04-1',
          title: 'REST API Exception Handling',
          scenario: 'A REST API needs to handle both types of exceptions.',
          oopConcept: 'Database connection errors (SQLException - checked) require explicit handling. Null parameters (IllegalArgumentException - unchecked) indicate programming bugs. Both need different strategies.',
          codeExample: {
            id: 'rwe-code-11-04-1',
            title: 'REST API Exception Handling',
            code: `@RestController
public class UserController {
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        // Checked: database access (must handle)
        try {
            return userRepository.findById(id);
        } catch (SQLException e) {
            throw new ResponseStatusException(500, "Database error");
        }

        // Unchecked: programming error (indicates bug)
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
    }
}`,
            language: 'java',
          },
        },
      ],
      commonMistakes: [
        {
          id: 'cm-11-04-1',
          title: 'Wrapping Unchecked as Checked',
          incorrectCode: `// BAD: wrapping RuntimeException in checked exception
public void processData(String data) throws DataException {
    try {
        int value = Integer.parseInt(data);
    } catch (NumberFormatException e) {
        throw new DataException("Invalid data", e); // adds unnecessary verbosity
    }
}`,
          correctCode: `// GOOD: let unchecked exceptions propagate
public void processData(String data) {
    int value = Integer.parseInt(data); // NumberFormatException propagates naturally
}`,
          explanation: 'Do not wrap programming errors in checked exceptions. Let unchecked exceptions propagate — they indicate bugs that should be fixed.',
        },
        {
          id: 'cm-11-04-2',
          title: 'Declaring Everything as Throws Exception',
          incorrectCode: `// BAD: declaring generic Exception in throws clause
public void process() throws Exception {
    // Hides specific exception types
    // Callers cannot handle appropriately
}`,
          correctCode: `// GOOD: declare specific exceptions
public void process() throws IOException, SQLException {
    // Callers know exactly what to handle
}`,
          explanation: 'Declaring generic Exception hides specific error types. Always declare the most specific exception types in the throws clause.',
        },
      ],
      examNotes: [
        { id: 'en-11-04-1', title: 'Checked = Compile-Time', content: 'Checked exceptions are enforced at compile time. The compiler requires try-catch or throws declaration.', importance: 'high' },
        { id: 'en-11-04-2', title: 'Unchecked = Runtime', content: 'Unchecked exceptions (RuntimeException and Error subclasses) have no compile-time enforcement.', importance: 'high' },
        { id: 'en-11-04-3', title: 'Design Principle', content: 'Checked for expected failures. Unchecked for programming bugs. Do not wrap RuntimeException in checked exceptions.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-11-04-1', question: 'What is the difference between checked and unchecked exceptions?', answer: 'Checked exceptions are enforced at compile time — the compiler requires them to be caught or declared. Unchecked exceptions (RuntimeException) have no compile-time enforcement and represent programming errors.', difficulty: 'medium' },
        { id: 'vq-11-04-2', question: 'When should you use checked exceptions?', answer: 'For recoverable, expected conditions like file not found, connection timeout, or invalid user input. These are conditions the caller should handle.', difficulty: 'medium' },
        { id: 'vq-11-04-3', question: 'What is the throws clause?', answer: 'A declaration in the method signature that specifies which checked exceptions the method may throw. Callers must handle these exceptions.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-11-04-1', type: 'mcq', question: 'Which is a checked exception?', options: ['NullPointerException', 'ArrayIndexOutOfBoundsException', 'IOException', 'ArithmeticException'], correctAnswer: 'IOException', explanation: 'IOException is a checked exception. The other three are subclasses of RuntimeException (unchecked).' },
        { id: 'qc-11-04-2', type: 'true-false', question: 'The compiler requires you to catch RuntimeException.', correctAnswer: 'False', explanation: 'RuntimeException is unchecked. The compiler does not require try-catch or throws declaration for it.' },
        { id: 'qc-11-04-3', type: 'mcq', question: 'If a method throws a checked exception, what must the caller do?', options: ['Nothing — ignore it', 'Catch it or declare it in throws', 'Wrap it in RuntimeException', 'Log it and continue'], correctAnswer: 'Catch it or declare it in throws', explanation: 'The caller must handle the checked exception by catching it or propagating it with their own throws declaration.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-11-04-1',
          scenario: 'You are designing a library that connects to an external API. The API might be unavailable (network error).',
          question: 'Should this be a checked or unchecked exception?',
          type: 'design-decision',
          options: [
            'Unchecked — it is a programming error',
            'Checked — it is a recoverable condition the caller should handle',
            'Error — it is a system-level failure',
            'It does not matter — either works',
          ],
          correctAnswer: 'Checked — it is a recoverable condition the caller should handle',
          explanation: 'Network unavailability is an expected, recoverable condition. Callers should implement retry logic or fallback behavior.',
          relatedConcepts: ['checked-exceptions', 'exception-design', 'error-handling'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-checked-unchecked',
      prerequisites: ['lesson-11-03'],
      xpReward: 70,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'exception-types',
      difficulty: 'medium',
      estimatedMinutes: 18,
    },
    {
      id: 'lesson-11-05',
      moduleId: 'module-11',
      title: 'Catching Specific Exceptions',
      slug: 'catching-specific-exceptions',
      order: 5,
      duration: 15,
      description: 'Master multi-catch blocks, catch ordering, and the catch-all pattern for precise exception handling.',
      learningObjectives: [
        { id: 'lo-11-05-1', description: 'Use multi-catch syntax for multiple exception types', completed: false },
        { id: 'lo-11-05-2', description: 'Order catch blocks from specific to general', completed: false },
        { id: 'lo-11-05-3', description: 'Apply the catch-all pattern effectively', completed: false },
        { id: 'lo-11-05-4', description: 'Avoid common catching mistakes', completed: false },
      ],
      englishExplanation: {
        id: 'ee-11-05',
        text: `Effective exception handling requires catching specific exceptions rather than using a single catch-all. This improves code clarity, enables precise error handling, and prevents masking of unexpected errors.

**Multi-Catch (Java 7+)**: A single catch block can handle multiple exception types using the pipe operator. \`catch (IOException | SQLException | ClassNotFoundException e)\` catches any of these three exception types. The exception variable is implicitly final — you cannot reassign it inside the catch block.

**Catch Ordering**: Java checks catch blocks in the order they appear. More specific exceptions must come before more general ones. If you put \`catch (Exception e)\` before \`catch (IOException e)\`, the IOException catch is unreachable and causes a compile error.

**Effective Catch Order**:
1. Most specific checked exceptions (FileNotFoundException)
2. Less specific checked exceptions (IOException)
3. Unchecked exceptions (RuntimeException)
4. Generic Exception as a last resort

**The catch-all Pattern**: \`catch (Exception e)\` or \`catch (Throwable t)\` should be used as the final catch block only. It serves as a safety net for truly unexpected exceptions. Never use it as the only catch block.

**Exception Inspection Methods**:
- \`e.getMessage()\` — returns the error message
- \`e.getClass().getSimpleName()\` — returns the exception type name
- \`e.printStackTrace()\` — prints the full stack trace
- \`e.getCause()\` — returns the underlying cause (if wrapped)
- \`e.getStackTrace()\` — returns StackTraceElement array

**Multi-Catch with Inheritance**: You cannot catch a parent and child exception in the same multi-catch. \`catch (IOException | FileNotFoundException e)\` is a compile error because FileNotFoundException IS-A IOException.

**Best Practice**: Handle exceptions at the appropriate level. Low-level methods should let exceptions propagate. High-level methods should catch and handle them. Mid-level methods can wrap exceptions for context.`
      },
      romanUrduExplanation: {
        id: 'ru-11-05',
        text: `Effective exception handling require karti hai specific exceptions catch karna single catch-all ki bajaye. Ye code clarity improve karta hai, precise error handling enable karta hai, aur unexpected errors ko mask hone se rokta hai.

**Multi-Catch (Java 7+)**: Single catch block pipe operator se multiple exception types handle kar sakta hai. \`catch (IOException | SQLException | ClassNotFoundException e)\` in teeno mein se koi bhi catch karta hai. Exception variable implicitly final hota hai.

**Catch Ordering**: Java catch blocks ko unki order mein check karta hai. Specific exceptions pehle aani chahiye, phir general. Agar \`catch (Exception e)\` pehle rakha, toh specific catch unreachable hoga.

**Effective Catch Order**:
1. Sabse specific checked exceptions
2. Kam specific checked exceptions
3. Unchecked exceptions
4. Generic Exception last resort ke taur par

**Exception Inspection Methods**:
- \`e.getMessage()\` — error message return karta hai
- \`e.getClass().getSimpleName()\` — exception type name
- \`e.printStackTrace()\` — full stack trace print karta hai
- \`e.getCause()\` — underlying cause return karta hai

**Best Practice**: Exceptions appropriate level par handle karein. Low-level methods exceptions ko propagate hone dein. High-level methods catch aur handle karein.`
      },
      keyPoints: [
        { id: 'kp-11-05-1', title: 'Multi-Catch', description: 'Handle multiple exception types in one catch: catch (IOException | SQLException e). Variable is implicitly final.' },
        { id: 'kp-11-05-2', title: 'Catch Ordering', description: 'Specific before general. Parent-child cannot be in same multi-catch. More specific must come first.' },
        { id: 'kp-11-05-3', title: 'Exception Inspection', description: 'Use getMessage(), getClass(), getStackTrace(), getCause() to examine and diagnose exceptions.' },
        { id: 'kp-11-05-4', title: 'Catch-All as Safety Net', description: 'Use generic Exception catch as the last block only. Never as the only catch block.' },
      ],
      codeExamples: [
        {
          id: 'ce-11-05-1',
          title: 'Multi-Catch and Proper Ordering',
          code: `import java.io.*;
import java.sql.*;

public class CatchingDemo {
    public static void processData() throws IOException, SQLException {
        // Method that might throw multiple exception types
        if (Math.random() > 0.5) throw new IOException("Disk error");
        throw new SQLException("Query failed");
    }

    public static void main(String[] args) {
        // Multi-catch: one block for multiple types
        try {
            processData();
        } catch (IOException | SQLException e) {
            System.out.println("IO/SQL Error: " + e.getMessage());
            System.out.println("Type: " + e.getClass().getSimpleName());
        }

        // Proper ordering: specific before general
        try {
            processData();
        } catch (IOException e) {
            System.out.println("IO Error: " + e.getMessage());
        } catch (SQLException e) {
            System.out.println("SQL Error: " + e.getMessage());
        } catch (Exception e) {
            // Catch-all as safety net
            System.out.println("Unexpected: " + e.getMessage());
        }
    }
}`,
          language: 'java',
          explanation: 'Multi-catch handles multiple types in one block. Ordered catches handle each type specifically. Generic catch is last as a safety net.',
        },
        {
          id: 'ce-11-05-2',
          title: 'Exception Inspection',
          code: `public class InspectionDemo {
    public static void main(String[] args) {
        try {
            String[] arr = {"a", "b", "c"};
            System.out.println(arr[10]);
        } catch (ArrayIndexOutOfBoundsException e) {
            // Get detailed information
            System.out.println("Message: " + e.getMessage());
            System.out.println("Type: " + e.getClass().getSimpleName());
            System.out.println("Index: " + e.getMessage());

            // Print full stack trace
            System.err.println("Full stack trace:");
            e.printStackTrace();

            // Get stack trace as array
            StackTraceElement[] stack = e.getStackTrace();
            for (StackTraceElement elem : stack) {
                System.out.println("  at " + elem.getClassName() + "." +
                    elem.getMethodName() + "(" + elem.getFileName() +
                    ":" + elem.getLineNumber() + ")");
            }
        }
    }
}`,
          language: 'java',
          explanation: 'Exception objects provide multiple methods to inspect the error. The stack trace shows exactly where the error occurred.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-11-05-1',
          title: 'File Processing Pipeline',
          scenario: 'A pipeline reads files, parses content, and writes results. Different exceptions need different handling.',
          oopConcept: 'FileNotFoundException gets a user-friendly message. IOException gets a retry. Parsing exceptions get logged. Unknown exceptions get escalated.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-11-05-1',
          title: 'Wrong Catch Order',
          incorrectCode: `// WRONG: general Exception comes before specific IOException
try {
    readFile();
} catch (Exception e) {
    System.out.println("Error");  // catches everything
} catch (IOException e) {
    // COMPILE ERROR: unreachable!
}`,
          correctCode: `// CORRECT: specific before general
try {
    readFile();
} catch (IOException e) {
    System.out.println("IO Error: " + e.getMessage());
} catch (Exception e) {
    System.out.println("Other Error: " + e.getMessage());
}`,
          explanation: 'Always order catch blocks from most specific to most general. General catch first makes specific catches unreachable.',
        },
        {
          id: 'cm-11-05-2',
          title: 'Parent and Child in Multi-Catch',
          incorrectCode: `// WRONG: IOException is parent of FileNotFoundException
try {
    readFile();
} catch (IOException | FileNotFoundException e) {
    // COMPILE ERROR: cannot have parent and child in multi-catch
}`,
          correctCode: `// CORRECT: just catch the parent
try {
    readFile();
} catch (IOException e) {
    // FileNotFoundException is automatically caught (it's a subclass)
}`,
          explanation: 'In multi-catch, you cannot combine a parent exception with its child. Since FileNotFoundException IS-A IOException, catching IOException covers both.',
        },
      ],
      examNotes: [
        { id: 'en-11-05-1', title: 'Multi-Catch Syntax', content: 'catch (ExType1 | ExType2 | ExType3 e). Variable is final. Cannot combine parent-child types.', importance: 'high' },
        { id: 'en-11-05-2', title: 'Catch Ordering', content: 'Specific exceptions before general. Compile error if general comes before specific.', importance: 'high' },
        { id: 'en-11-05-3', title: 'Exception Methods', content: 'getMessage(), getClass(), getStackTrace(), getCause() are essential for debugging.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-11-05-1', question: 'What is multi-catch and what is its syntax?', answer: 'Multi-catch handles multiple exception types in one catch block. Syntax: catch (IOException | SQLException e). The exception variable is implicitly final.', difficulty: 'easy' },
        { id: 'vq-11-05-2', question: 'Why must specific exceptions come before general ones?', answer: 'Java checks catch blocks in order. If a general Exception catch comes first, it catches everything, making specific catches unreachable (compile error).', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-11-05-1', type: 'mcq', question: 'In multi-catch, the exception variable is:', options: ['Mutable', 'Final', 'Static', 'Public'], correctAnswer: 'Final', explanation: 'The exception variable in multi-catch is implicitly final — you cannot reassign it inside the catch block.' },
        { id: 'qc-11-05-2', type: 'true-false', question: 'You can catch a parent and child exception in the same multi-catch block.', correctAnswer: 'False', explanation: 'This causes a compile error. If you catch IOException, FileNotFoundException is automatically covered.' },
        { id: 'qc-11-05-3', type: 'mcq', question: 'Which method returns the full stack trace of an exception?', options: ['getMessage()', 'toString()', 'printStackTrace()', 'getCause()'], correctAnswer: 'printStackTrace()', explanation: 'printStackTrace() prints the full stack trace showing the call chain leading to the exception.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-11-05-1',
          scenario: 'Your method can throw IOException, SQLException, and TimeoutException. You want to handle each differently.',
          question: 'How should you structure the catch blocks?',
          type: 'design-decision',
          options: [
            'One catch-all for all three',
            'Three separate catch blocks, one for each exception type',
            'Multi-catch for all three in one block',
            'No catch — let them propagate',
          ],
          correctAnswer: 'Three separate catch blocks, one for each exception type',
          explanation: 'Each exception type has different recovery needs. Separate catches allow tailored handling: log SQL errors, retry timeouts, show IO errors to users.',
          relatedConcepts: ['specific-catching', 'error-handling', 'exception-design'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-catching-exceptions',
      prerequisites: ['lesson-11-03', 'lesson-11-04'],
      xpReward: 65,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'catch-flow',
      difficulty: 'medium',
      estimatedMinutes: 15,
    },
    {
      id: 'lesson-11-06',
      moduleId: 'module-11',
      title: 'Throwing Exceptions',
      slug: 'throwing-exceptions',
      order: 6,
      duration: 18,
      description: 'Learn the throw keyword, throws clause, exception propagation, and when to create and throw your own exceptions.',
      learningObjectives: [
        { id: 'lo-11-06-1', description: 'Use the throw keyword to explicitly throw exceptions', completed: false },
        { id: 'lo-11-06-2', description: 'Declare exceptions with the throws clause', completed: false },
        { id: 'lo-11-06-3', description: 'Understand exception propagation up the call stack', completed: false },
        { id: 'lo-11-06-4', description: 'Apply when to throw vs when to catch', completed: false },
      ],
      englishExplanation: {
        id: 'ee-11-06',
        text: `The \`throw\` keyword explicitly creates and throws an exception object. Unlike catch (which handles exceptions), throw initiates them. When you write \`throw new IOException("Disk full")\`, Java creates an IOException object and immediately transfers control to the nearest matching catch block.

**throw Syntax**: \`throw new ExceptionType("message");\` — Creates a new exception and throws it. The exception must be of type Throwable or its subclass.

**throws Clause**: Declares that a method may throw one or more checked exceptions. The caller must handle them. \`public void save(File f) throws IOException, SQLException\` — callers must catch or propagate.

**Exception Propagation**: When an exception is thrown in a method and not caught, it propagates up the call stack. Java looks for a catch block in the current method. If not found, it moves to the calling method, then its caller, and so on until main(). If no catch is found anywhere, the JVM terminates with a stack trace.

**When to Throw**:
1. **Invalid state**: Method receives arguments that violate its contract.
2. **External failures**: File, network, or database operations fail.
3. **Business rules**: Domain-specific violations (insufficient funds, expired subscription).
4. **Preconditions**: Null arguments, out-of-range values.

**When to Catch**:
1. **Recovery possible**: You can fix the problem (retry, use default value).
2. **Context needed**: You need to add information before rethrowing.
3. **API boundary**: The method is the entry point and must handle all errors.

**Rethrowing Exceptions**: You can catch an exception, add context, and rethrow:
\`\`\`java
try {
    db.query(sql);
} catch (SQLException e) {
    throw new DataAccessException("Query failed: " + sql, e);
}
\`\`\`
This preserves the original exception as the cause while adding meaningful context.

**try-catch and throw Interaction**: If a catch block throws a new exception, the finally block (if present) still executes before the new exception propagates.`
      },
      romanUrduExplanation: {
        id: 'ru-11-06',
        text: `Throw keyword explicitly exception object create aur throw karta hai. Catch ke opposite (jo exceptions handle karti hai), throw unhe initiate karta hai. Jab aap \`throw new IOException("Disk full")\` likhte hain, toh Java IOException object create karta hai aur control nearest matching catch block ko transfer karta hai.

**throw Syntax**: \`throw new ExceptionType("message");\` — Naya exception create aur throw karta hai.

**throws Clause**: Declare karta hai ke method ek ya zyada checked exceptions throw kar sakta hai. Caller ko handle karna padta hai.

**Exception Propagation**: Jab method mein exception throw hoti hai aur catch nahi hoti, toh ye call stack mein upar propagate hoti hai. Java current method mein catch block dhundhta hai. Agar nahi mila, toh calling method mein jaata hai, phir uske caller mein, jab tak main() tak na pahunche.

**Kab Throw Karein**:
1. **Invalid state**: Method arguments contract violate karein.
2. **External failures**: File, network, ya database operations fail ho jayein.
3. **Business rules**: Domain-specific violations.

**Kab Catch Karein**:
1. **Recovery possible**: Aap problem fix kar sakte hain.
2. **Context needed**: Rethrow se pehle information add karni ho.
3. **API boundary**: Method entry point hai aur sab errors handle karne chahiye.

**Rethrowing**: Exception catch karke, context add karke, aur rethrow kar sakte hain. Original exception as cause preserve hota hai.`
      },
      keyPoints: [
        { id: 'kp-11-06-1', title: 'throw Keyword', description: 'Explicitly creates and throws an exception object. Initiates the exception handling process.' },
        { id: 'kp-11-06-2', title: 'throws Clause', description: 'Declares that a method may throw checked exceptions. Callers must handle or propagate them.' },
        { id: 'kp-11-06-3', title: 'Propagation', description: 'Uncaught exceptions propagate up the call stack until caught or the program terminates.' },
        { id: 'kp-11-06-4', title: 'Rethrowing', description: 'Catch, add context, and rethrow. Preserve original exception as cause for debugging.' },
      ],
      codeExamples: [
        {
          id: 'ce-11-06-1',
          title: 'Throw and Throws in Action',
          code: `public class BankAccount {
    private double balance;

    // throws declares checked exceptions
    public void withdraw(double amount) throws InsufficientFundsException {
        // throw explicitly creates and throws exception
        if (amount > balance) {
            throw new InsufficientFundsException(
                "Insufficient funds. Balance: " + balance + ", Requested: " + amount
            );
        }
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        balance -= amount;
    }

    public static void main(String[] args) {
        BankAccount account = new BankAccount();
        account.balance = 1000;

        try {
            account.withdraw(1500); // throws InsufficientFundsException
        } catch (InsufficientFundsException e) {
            System.out.println(e.getMessage());
        }

        try {
            account.withdraw(-100); // throws IllegalArgumentException
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }
}

class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}`,
          language: 'java',
          output: 'Insufficient funds. Balance: 1000.0, Requested: 1500.0\nAmount must be positive',
          explanation: 'throw creates exception objects for business rule violations (insufficient funds) and invalid arguments. throws declares what callers must handle.',
        },
        {
          id: 'ce-11-06-2',
          title: 'Exception Propagation',
          code: `public class PropagationDemo {
    public static void main(String[] args) {
        try {
            methodA();
        } catch (Exception e) {
            System.out.println("Caught in main: " + e.getMessage());
        }
    }

    static void methodA() {
        methodB();  // No try-catch, exception propagates
    }

    static void methodB() {
        methodC();  // No try-catch, exception propagates
    }

    static void methodC() {
        throw new RuntimeException("Error in methodC");
        // Exception propagates: C → B → A → main
    }
}`,
          language: 'java',
          output: 'Caught in main: Error in methodC',
          explanation: 'The exception propagates from methodC through methodB and methodA until caught in main(). Each method without a catch block passes it up.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-11-06-1',
          title: 'Service Layer Exception Wrapping',
          scenario: 'A service method calls a repository that throws low-level database exceptions.',
          oopConcept: 'The service catches the low-level exception and wraps it in a meaningful business exception with context.',
          codeExample: {
            id: 'rwe-code-11-06-1',
            title: 'Exception Wrapping Pattern',
            code: `public class UserService {
    public User findUser(Long id) throws UserNotFoundException {
        try {
            return userRepository.findById(id);
        } catch (SQLException e) {
            // Wrap low-level exception with business context
            throw new UserNotFoundException("User not found: " + id, e);
        }
    }
}

class UserNotFoundException extends Exception {
    public UserNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}`,
            language: 'java',
          },
        },
      ],
      commonMistakes: [
        {
          id: 'cm-11-06-1',
          title: 'Throwing Without Context',
          incorrectCode: `// BAD: generic exception with no useful message
throw new Exception("Error");`,
          correctCode: `// GOOD: descriptive message with context
throw new IllegalArgumentException(
    "Age must be between 0 and 150, got: " + age
);`,
          explanation: 'Exception messages should be descriptive and include context. "Error" is useless for debugging. Include the invalid value and expected range.',
        },
        {
          id: 'cm-11-06-2',
          title: 'Catching and Not Rethrowing or Handling',
          incorrectCode: `// BAD: catching checked exception and doing nothing
try {
    database.save(record);
} catch (SQLException e) {
    // Silent failure! Data might be lost
}`,
          correctCode: `// GOOD: either handle properly or rethrow
try {
    database.save(record);
} catch (SQLException e) {
    throw new DataPersistenceException("Failed to save record", e);
}`,
          explanation: 'Silently swallowing checked exceptions hides failures. Either handle them properly or rethrow with context.',
        },
      ],
      examNotes: [
        { id: 'en-11-06-1', title: 'throw vs throws', content: 'throw = creates/throws an exception (in method body). throws = declares exceptions in method signature. Common exam question.', importance: 'high' },
        { id: 'en-11-06-2', title: 'Propagation Direction', content: 'Exceptions propagate up the call stack (from callee to caller). They never propagate downward.', importance: 'high' },
        { id: 'en-11-06-3', title: 'Rethrowing Pattern', content: 'catch → wrap with context → rethrow. Preserves original exception as cause. Essential for debugging.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-11-06-1', question: 'What is the difference between throw and throws?', answer: 'throw explicitly creates and throws an exception object in a method body. throws declares in the method signature that the method may throw certain checked exceptions.', difficulty: 'easy' },
        { id: 'vq-11-06-2', question: 'How do exceptions propagate?', answer: 'When thrown and not caught, exceptions propagate up the call stack. Java looks for catch blocks in the current method, then the calling method, and so on until main(). If no catch is found, the program terminates.', difficulty: 'medium' },
        { id: 'vq-11-06-3', question: 'What is exception wrapping?', answer: 'Catching a low-level exception and rethrowing a higher-level exception with the original as the cause. It provides context while preserving the original error for debugging.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-11-06-1', type: 'mcq', question: 'Which keyword explicitly throws an exception?', options: ['throws', 'throw', 'catch', 'raise'], correctAnswer: 'throw', explanation: 'throw creates and throws an exception object. throws is used in method signatures to declare exceptions.' },
        { id: 'qc-11-06-2', type: 'true-false', question: 'Exceptions propagate down the call stack.', correctAnswer: 'False', explanation: 'Exceptions propagate UP the call stack — from the method that threw it to its caller, and so on.' },
        { id: 'qc-11-06-3', type: 'mcq', question: 'When should you catch an exception instead of letting it propagate?', options: ['Never — always let exceptions propagate', 'When you can recover or add meaningful context', 'Only for unchecked exceptions', 'Only in the main method'], correctAnswer: 'When you can recover or add meaningful context', explanation: 'Catch when you can handle the situation (retry, default value) or need to add business context before rethrowing.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-11-06-1',
          scenario: 'Your repository method throws a low-level IOException when saving a file. The service calling it needs to know about the failure.',
          question: 'What should the service do?',
          type: 'design-decision',
          options: [
            'Catch the IOException and do nothing',
            'Let the IOException propagate directly',
            'Catch it, wrap it in a meaningful service exception with context, and rethrow',
            'Convert it to a RuntimeException',
          ],
          correctAnswer: 'Catch it, wrap it in a meaningful service exception with context, and rethrow',
          explanation: 'Wrapping provides business context (which save failed) while preserving the original exception as the cause for debugging.',
          relatedConcepts: ['exception-wrapping', 'rethrowing', 'exception-context'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-throwing-exceptions',
      prerequisites: ['lesson-11-02', 'lesson-11-04'],
      xpReward: 70,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'exception-propagation',
      difficulty: 'medium',
      estimatedMinutes: 18,
    },
    {
      id: 'lesson-11-07',
      moduleId: 'module-11',
      title: 'Custom Exceptions',
      slug: 'custom-exceptions',
      order: 7,
      duration: 18,
      description: 'Create your own exception classes by extending Exception or RuntimeException for domain-specific error handling.',
      learningObjectives: [
        { id: 'lo-11-07-1', description: 'Create custom checked exceptions by extending Exception', completed: false },
        { id: 'lo-11-07-2', description: 'Create custom unchecked exceptions by extending RuntimeException', completed: false },
        { id: 'lo-11-07-3', description: 'Add custom fields and methods to exceptions', completed: false },
        { id: 'lo-11-07-4', description: 'Design a custom exception hierarchy', completed: false },
      ],
      englishExplanation: {
        id: 'ee-11-07',
        text: `Custom exceptions make your code more readable and your error handling more precise. Instead of generic IOException or IllegalArgumentException, you can throw InsufficientFundsException or OrderNotFoundException that immediately tells you what went wrong.

**Creating Custom Checked Exceptions**: Extend \`Exception\`. The compiler will force callers to catch or declare them.
\`\`\`java
public class InsufficientFundsException extends Exception {
    private double balance;
    private double amount;

    public InsufficientFundsException(String message, double balance, double amount) {
        super(message);
        this.balance = balance;
        this.amount = amount;
    }

    public double getBalance() { return balance; }
    public double getAmount() { return amount; }
    public double getDeficit() { return amount - balance; }
}
\`\`\`

**Creating Custom Unchecked Exceptions**: Extend \`RuntimeException\`. Callers can handle them but are not required to.
\`\`\`java
public class InvalidOrderException extends RuntimeException {
    public InvalidOrderException(String message) {
        super(message);
    }

    public InvalidOrderException(String message, Throwable cause) {
        super(message, cause);
    }
}
\`\`\`

**Custom Exception Fields**: Add domain-specific data. InsufficientFundsException stores the balance and amount, allowing the caller to calculate the deficit. OrderNotFoundException stores the orderId for logging.

**Exception Chaining**: Always provide a constructor that accepts a Throwable cause. This preserves the original exception for debugging.
\`\`\`java
public class ServiceException extends Exception {
    public ServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}
\`\`\`

**Custom Exception Hierarchy**: For large applications, create a hierarchy:
\`\`\`
AppException (base)
├── DatabaseException
│   ├── ConnectionException
│   └── QueryException
├── ValidationException
│   ├── InvalidEmailException
│   └── InvalidAgeException
└── AuthenticationException
    ├── InvalidCredentialsException
    └── AccountLockedException
\`\`\`

**Best Practices**:
1. Include meaningful message in all custom exceptions.
2. Provide multiple constructors (message, message+cause, cause-only).
3. Add domain-specific fields when useful.
4. Follow Java naming convention: end with "Exception".
5. Place custom exceptions in a dedicated exception package.`
      },
      romanUrduExplanation: {
        id: 'ru-11-07',
        text: `Custom exceptions aapka code more readable aur error handling more precise banati hain. Generic IOException ki bajaye InsufficientFundsException throw kar sakte hain jo immediately batata hai kya problem hai.

**Custom Checked Exceptions Banana**: Exception ko extend karein. Compiler callers ko force karega catch karne ya declare karne ke liye.

**Custom Unchecked Exceptions Banana**: RuntimeException ko extend karein. Callers handle kar sakte hain lekin require nahi hain.

**Custom Exception Fields**: Domain-specific data add karein. InsufficientFundsException balance aur amount store karta hai, caller ko deficit calculate karne deta hai.

**Exception Chaining**: Hamesha Throwable cause accept karne wala constructor provide karein. Ye original exception ko debugging ke liye preserve karta hai.

**Custom Exception Hierarchy**: Bade applications ke liye hierarchy banayein: AppException base, DatabaseException, ValidationException, AuthenticationException.

**Best Practices**:
1. Sab custom exceptions mein meaningful message include karein.
2. Multiple constructors provide karein (message, message+cause, cause-only).
3. Jab useful ho domain-specific fields add karein.
4. Java naming convention follow karein: "Exception" se end ho.
5. Custom exceptions ko dedicated exception package mein rakhein.`
      },
      keyPoints: [
        { id: 'kp-11-07-1', title: 'Checked Custom', description: 'Extend Exception for custom checked exceptions. Callers must handle them.' },
        { id: 'kp-11-07-2', title: 'Unchecked Custom', description: 'Extend RuntimeException for custom unchecked exceptions. No compile-time enforcement.' },
        { id: 'kp-11-07-3', title: 'Exception Chaining', description: 'Provide constructors that accept Throwable cause. Preserves the original exception for debugging.' },
        { id: 'kp-11-07-4', title: 'Domain Data', description: 'Add fields that carry useful debugging information. Makes exceptions more informative than generic ones.' },
      ],
      codeExamples: [
        {
          id: 'ce-11-07-1',
          title: 'Custom Checked Exception',
          code: `// Custom checked exception
class InsufficientFundsException extends Exception {
    private double balance;
    private double requested;

    public InsufficientFundsException(double balance, double requested) {
        super("Insufficient funds. Balance: " + balance + ", Requested: " + requested);
        this.balance = balance;
        this.requested = requested;
    }

    public double getDeficit() { return requested - balance; }
}

// Usage
class BankAccount {
    private double balance;

    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException(balance, amount);
        }
        balance -= amount;
    }
}

class BankingApp {
    public static void main(String[] args) {
        BankAccount account = new BankAccount();
        try {
            account.withdraw(5000);
        } catch (InsufficientFundsException e) {
            System.out.println(e.getMessage());
            System.out.println("You need $" + e.getDeficit() + " more.");
        }
    }
}`,
          language: 'java',
          output: 'Insufficient funds. Balance: 0.0, Requested: 5000.0\nYou need $5000.0 more.',
          explanation: 'The custom exception carries domain data (balance, requested) and provides a method to calculate the deficit. Much more informative than a generic exception.',
        },
        {
          id: 'ce-11-07-2',
          title: 'Custom Exception Hierarchy',
          code: `// Base exception for the application
class AppException extends Exception {
    public AppException(String message) { super(message); }
    public AppException(String message, Throwable cause) { super(message, cause); }
}

// Database exceptions
class DatabaseException extends AppException {
    public DatabaseException(String message, Throwable cause) {
        super(message, cause);
    }
}

class ConnectionException extends DatabaseException {
    private String url;
    public ConnectionException(String url, Throwable cause) {
        super("Cannot connect to: " + url, cause);
        this.url = url;
    }
}

// Validation exceptions
class ValidationException extends AppException {
    private String field;
    public ValidationException(String field, String message) {
        super("Validation failed for '" + field + "': " + message);
        this.field = field;
    }
}

// Usage
class UserService {
    public void createUser(String email) throws ValidationException, DatabaseException {
        if (email == null || !email.contains("@")) {
            throw new ValidationException("email", "Invalid email format");
        }
        try {
            userRepository.save(new User(email));
        } catch (SQLException e) {
            throw new DatabaseException("Failed to save user", e);
        }
    }
}`,
          language: 'java',
          explanation: 'A hierarchy of custom exceptions: AppException → DatabaseException → ConnectionException. Each level adds specific context.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-11-07-1',
          title: 'E-Commerce Exception Hierarchy',
          scenario: 'An e-commerce system has domain-specific errors.',
          oopConcept: 'PaymentException, InventoryException, ShippingException — each with specific data and methods for debugging and recovery.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-11-07-1',
          title: 'Creating Too Many Custom Exceptions',
          incorrectCode: `// BAD: exception for every tiny thing
class NameTooLongException extends Exception { }
class NameTooShortException extends Exception { }
class NameContainsNumbersException extends Exception { }
class NameContainsSpecialCharsException extends Exception { }
// 100+ exception classes for validation!`,
          correctCode: `// GOOD: one exception with details
class ValidationException extends Exception {
    private String field;
    private String rule;

    public ValidationException(String field, String rule) {
        super("Validation failed: " + field + " - " + rule);
        this.field = field;
        this.rule = rule;
    }
}`,
          explanation: 'Do not create an exception for every possible error. Create exceptions for distinct error categories that need different handling.',
        },
        {
          id: 'cm-11-07-2',
          title: 'Missing Cause Constructor',
          incorrectCode: `// BAD: no way to chain original exception
class ServiceException extends Exception {
    public ServiceException(String message) {
        super(message);
    }
    // Original exception is lost!
}`,
          correctCode: `// GOOD: provide cause constructor
class ServiceException extends Exception {
    public ServiceException(String message) {
        super(message);
    }
    public ServiceException(String message, Throwable cause) {
        super(message, cause);  // Preserves original exception
    }
}`,
          explanation: 'Always provide a constructor that accepts Throwable cause. Without it, the original exception is lost and debugging becomes much harder.',
        },
      ],
      examNotes: [
        { id: 'en-11-07-1', title: 'Custom Checked vs Unchecked', content: 'Extend Exception for checked (callers must handle). Extend RuntimeException for unchecked (optional handling).', importance: 'high' },
        { id: 'en-11-07-2', title: 'Exception Chaining', content: 'Always provide a (String, Throwable) constructor. Preserves original exception as cause for debugging.', importance: 'high' },
        { id: 'en-11-07-3', title: 'Naming Convention', content: 'Custom exceptions should end with "Exception". Place in a dedicated exception package.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-11-07-1', question: 'When should you create a custom exception?', answer: 'When standard exceptions do not convey the specific error. Custom exceptions provide domain-specific context and make catch blocks more precise.', difficulty: 'medium' },
        { id: 'vq-11-07-2', question: 'What is exception chaining?', answer: 'Wrapping a low-level exception inside a higher-level custom exception. The original exception is passed as the cause, preserving it for debugging.', difficulty: 'medium' },
        { id: 'vq-11-07-3', question: 'Should you create a custom exception for every possible error?', answer: 'No. Create exceptions for distinct error categories that need different handling. Too many exceptions create unnecessary complexity.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-11-07-1', type: 'mcq', question: 'To create a custom checked exception, you should extend:', options: ['RuntimeException', 'Error', 'Exception', 'Throwable'], correctAnswer: 'Exception', explanation: 'Extending Exception creates a checked exception. Callers must catch or declare it.' },
        { id: 'qc-11-07-2', type: 'true-false', question: 'Custom exceptions should always have a constructor that accepts a Throwable cause.', correctAnswer: 'True', explanation: 'Exception chaining preserves the original exception for debugging. Always provide a cause constructor.' },
        { id: 'qc-11-07-3', type: 'mcq', question: 'What should a custom exception class name end with?', options: ['Error', 'Issue', 'Exception', 'Problem'], correctAnswer: 'Exception', explanation: 'Java naming convention requires custom exception names to end with "Exception" for checked or unchecked.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-11-07-1',
          scenario: 'You are building a library system. You need exceptions for: book not found, book already checked out, and member has overdue books.',
          question: 'How should you design the exception hierarchy?',
          type: 'design-decision',
          options: [
            'One generic LibraryException for all errors',
            'Three custom checked exceptions: BookNotFoundException, BookAlreadyCheckedOutException, OverdueBooksException',
            'Use only RuntimeException for all three',
            'Use String messages instead of exceptions',
          ],
          correctAnswer: 'Three custom checked exceptions: BookNotFoundException, BookAlreadyCheckedOutException, OverdueBooksException',
          explanation: 'Each error type has different recovery needs. Specific exceptions let callers handle each case appropriately.',
          relatedConcepts: ['custom-exceptions', 'exception-design', 'domain-modeling'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-custom-exceptions',
      prerequisites: ['lesson-11-03', 'lesson-11-04', 'lesson-11-06'],
      xpReward: 75,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'exception-hierarchy-custom',
      difficulty: 'medium',
      estimatedMinutes: 18,
    },
    {
      id: 'lesson-11-08',
      moduleId: 'module-11',
      title: 'Try-With-Resources',
      slug: 'try-with-resources',
      order: 8,
      duration: 18,
      description: 'Master the try-with-resources statement introduced in Java 7 for automatic resource management.',
      learningObjectives: [
        { id: 'lo-11-08-1', description: 'Use try-with-resources to auto-close resources', completed: false },
        { id: 'lo-11-08-2', description: 'Understand the AutoCloseable interface', completed: false },
        { id: 'lo-11-08-3', description: 'Handle suppressed exceptions', completed: false },
        { id: 'lo-11-08-4', description: 'Manage multiple resources in a single try', completed: false },
      ],
      englishExplanation: {
        id: 'ee-11-08',
        text: `Try-with-resources (TWR) is a language feature introduced in Java 7 that automatically closes resources when they are no longer needed. It eliminates the need for finally blocks to close resources and prevents resource leaks.

**AutoCloseable Interface**: Any class that implements AutoCloseable can be used in try-with-resources. It has one method: \`void close() throws Exception\`. The JDK provides implementations for files (FileReader, FileWriter), database connections (Connection, Statement), network sockets, and more.

**Basic Syntax**:
\`\`\`java
try (FileReader reader = new FileReader("data.txt")) {
    // Use the resource
    int data = reader.read();
} // reader.close() is called automatically
\`\`\`
The resource is declared inside the try parentheses. When the try block completes (normally or with an exception), close() is called automatically.

**Multiple Resources**: You can manage multiple resources, separated by semicolons. They are closed in reverse order of declaration.
\`\`\`java
try (
    FileReader reader = new FileReader("in.txt");
    FileWriter writer = new FileWriter("out.txt")
) {
    // Use both resources
} // writer.close() called first, then reader.close()
\`\`\`

**Suppressed Exceptions**: If both the try block and the close() method throw exceptions, the close exception is "suppressed." The try block exception is the primary exception, and suppressed exceptions can be retrieved with \`getSuppressed()\`. This prevents the close exception from hiding the original error.

**Traditional vs Try-With-Resources**:
\`\`\`java
// Traditional (verbose, error-prone)
BufferedReader reader = null;
try {
    reader = new BufferedReader(new FileReader("data.txt"));
    // process
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (reader != null) {
        try { reader.close(); } catch (IOException e) { }
    }
}

// Try-with-resources (clean, safe)
try (BufferedReader reader = new BufferedReader(new FileReader("data.txt"))) {
    // process
} catch (IOException e) {
    e.printStackTrace();
}
\`\`\`

**Java 9 Enhancement**: In Java 9+, you can use effectively final variables in try-with-resources: \`try (reader) { }\` where reader was previously declared.`
      },
      romanUrduExplanation: {
        id: 'ru-11-08',
        text: `Try-with-resources (TWR) ek language feature hai jo Java 7 mein introduce hua aur automatically resources close karta hai jab zaroorat nahi hoti. Finally blocks ki zaroorat khatam karta hai aur resource leaks prevent karta hai.

**AutoCloseable Interface**: Jo bhi class AutoCloseable implement karti hai, wo try-with-resources mein use ho sakti hai. Iska ek method hai: \`void close() throws Exception\`.

**Basic Syntax**:
\`\`\`java
try (FileReader reader = new FileReader("data.txt")) {
    int data = reader.read();
} // reader.close() automatically call hota hai
\`\`\`
Resource try parentheses mein declare hoti hai. Jab try block complete hota hai, close() automatically call hota hai.

**Multiple Resources**: Ek se zyada resources manage kar sakte hain, semicolons se separated. Reverse order mein close hoti hain.

**Suppressed Exceptions**: Agar try block aur close() dono exceptions throw karein, toh close exception "suppressed" ho jaata hai. Try block exception primary hoti hai aur suppressed exceptions \`getSuppressed()\` se retrieve kar sakte hain.

**Traditional vs Try-With-Resources**: Traditional tarika verbose aur error-prone hai. TWR clean aur safe hai — resources automatically close hoti hain without finally block.

**Java 9 Enhancement**: Java 9+ mein effectively final variables use kar sakte hain try-with-resources mein.`
      },
      keyPoints: [
        { id: 'kp-11-08-1', title: 'AutoCloseable', description: 'Resources must implement AutoCloseable. The close() method is called automatically.' },
        { id: 'kp-11-08-2', title: 'Automatic Closing', description: 'Resources are closed when the try block completes, whether normally or exceptionally.' },
        { id: 'kp-11-08-3', title: 'Multiple Resources', description: 'Declared with semicolons. Closed in reverse order of declaration.' },
        { id: 'kp-11-08-4', title: 'Suppressed Exceptions', description: 'If close() throws, it is suppressed. The original exception is preserved as primary.' },
      ],
      codeExamples: [
        {
          id: 'ce-11-08-1',
          title: 'Basic Try-With-Resources',
          code: `import java.io.*;

public class TWRDemo {
    public static void main(String[] args) {
        // Try-with-resources: resource auto-closed
        try (BufferedReader reader = new BufferedReader(new FileReader("data.txt"));
             PrintWriter writer = new PrintWriter(new FileWriter("output.txt"))) {

            String line;
            while ((line = reader.readLine()) != null) {
                writer.println(line.toUpperCase());
            }
            System.out.println("File processed successfully.");

        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("IO Error: " + e.getMessage());
        }
        // writer.close() and reader.close() called automatically
    }
}`,
          language: 'java',
          output: 'File not found: data.txt (No such file or directory)',
          explanation: 'Multiple resources are declared in try parentheses. Both are automatically closed when the block completes.',
        },
        {
          id: 'ce-11-08-2',
          title: 'Suppressed Exceptions',
          code: `class FaultyResource implements AutoCloseable {
    private String name;

    FaultyResource(String name) {
        this.name = name;
        System.out.println("Opened: " + name);
    }

    void use() {
        throw new RuntimeException("Error in " + name);
    }

    @Override
    public void close() {
        System.out.println("Closing: " + name);
        throw new RuntimeException("Error closing " + name);
    }
}

public class SuppressedDemo {
    public static void main(String[] args) {
        try (FaultyResource r = new FaultyResource("Resource1")) {
            r.use();
        } catch (RuntimeException e) {
            System.out.println("Primary: " + e.getMessage());
            Throwable[] suppressed = e.getSuppressed();
            for (Throwable t : suppressed) {
                System.out.println("Suppressed: " + t.getMessage());
            }
        }
    }
}`,
          language: 'java',
          output: 'Opened: Resource1\nClosing: Resource1\nPrimary: Error in Resource1\nSuppressed: Error closing Resource1',
          explanation: 'Both the try block and close() throw exceptions. The try exception is primary, the close exception is suppressed but still accessible.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-11-08-1',
          title: 'Database Operations with TWR',
          scenario: 'Database operations require connections, statements, and result sets to be closed.',
          oopConcept: 'Try-with-resources manages all three resources automatically, ensuring no connection leaks even if exceptions occur.',
          codeExample: {
            id: 'rwe-code-11-08-1',
            title: 'Database with Try-With-Resources',
            code: `try (
    Connection conn = DriverManager.getConnection(url, user, pass);
    PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users");
    ResultSet rs = stmt.executeQuery()
) {
    while (rs.next()) {
        System.out.println(rs.getString("name"));
    }
} catch (SQLException e) {
    e.printStackTrace();
}
// All three resources closed automatically in reverse order`,
            language: 'java',
          },
        },
      ],
      commonMistakes: [
        {
          id: 'cm-11-08-1',
          title: 'Not Using TWR When Available',
          incorrectCode: `// OLD WAY: manual close in finally
BufferedReader reader = null;
try {
    reader = new BufferedReader(new FileReader("data.txt"));
    // process
} catch (IOException e) {
    e.printStackTrace();
} finally {
    try { if (reader != null) reader.close(); }
    catch (IOException e) { }
}`,
          correctCode: `// MODERN WAY: try-with-resources
try (BufferedReader reader = new BufferedReader(new FileReader("data.txt"))) {
    // process
} catch (IOException e) {
    e.printStackTrace();
}`,
          explanation: 'When using Java 7+, always prefer try-with-resources. It is cleaner, safer, and prevents resource leaks automatically.',
        },
      ],
      examNotes: [
        { id: 'en-11-08-1', title: 'AutoCloseable', content: 'Resources in try-with-resources must implement AutoCloseable. close() is called automatically.', importance: 'high' },
        { id: 'en-11-08-2', title: 'Suppressed Exceptions', content: 'If close() throws, the exception is suppressed. Primary exception from try block is preserved.', importance: 'high' },
        { id: 'en-11-08-3', title: 'Multiple Resources', content: 'Declared with semicolons. Closed in reverse order. Java 9 allows effectively final variables.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-11-08-1', question: 'What is try-with-resources?', answer: 'A Java 7 feature that automatically closes resources implementing AutoCloseable. Resources are declared in try parentheses and closed when the block completes.', difficulty: 'easy' },
        { id: 'vq-11-08-2', question: 'What are suppressed exceptions?', answer: 'When both the try block and the close() method throw exceptions, the close exception is suppressed. It is accessible via getSuppressed() but does not replace the primary exception.', difficulty: 'medium' },
        { id: 'vq-11-08-3', question: 'In what order are multiple resources closed?', answer: 'In reverse order of declaration. The last declared resource is closed first. This ensures proper dependency handling.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-11-08-1', type: 'mcq', question: 'Which interface must a resource implement for try-with-resources?', options: ['Closeable', 'AutoCloseable', 'Serializable', 'Runnable'], correctAnswer: 'AutoCloseable', explanation: 'AutoCloseable is the interface required for try-with-resources. Its close() method is called automatically.' },
        { id: 'qc-11-08-2', type: 'true-false', question: 'Try-with-resources calls close() only when no exception occurs.', correctAnswer: 'False', explanation: 'close() is called whether the try block completes normally or exceptionally. It always runs.' },
        { id: 'qc-11-08-3', type: 'mcq', question: 'If close() throws an exception while the try block also threw one, the close exception is:', options: ['The primary exception', 'Ignored completely', 'A suppressed exception', 'Thrown instead of the try exception'], correctAnswer: 'A suppressed exception', explanation: 'The try block exception remains primary. The close exception is suppressed but retrievable via getSuppressed().' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-11-08-1',
          scenario: 'You are reading a file, processing data, and writing results to another file. Both files must be closed regardless of success or failure.',
          question: 'What is the best approach?',
          type: 'concept-application',
          options: [
            'Use try-catch-finally with manual close in finally',
            'Use try-with-resources with both reader and writer declared',
            'Close resources manually after processing',
            'Don\'t close resources — Java handles it',
          ],
          correctAnswer: 'Use try-with-resources with both reader and writer declared',
          explanation: 'TWR automatically closes both resources in reverse order, even if exceptions occur. It is cleaner and safer than manual close in finally.',
          relatedConcepts: ['try-with-resources', 'resource-management', 'auto-closeable'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-try-with-resources',
      prerequisites: ['lesson-11-02', 'lesson-11-05'],
      xpReward: 70,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'resource-lifecycle',
      difficulty: 'medium',
      estimatedMinutes: 18,
    },
    {
      id: 'lesson-11-09',
      moduleId: 'module-11',
      title: 'Exception Handling Best Practices',
      slug: 'exception-handling-best-practices',
      order: 9,
      duration: 15,
      description: 'Learn industry-standard best practices for when to catch, when to throw, proper logging, and exception handling design.',
      learningObjectives: [
        { id: 'lo-11-09-1', description: 'Apply best practices for catching and throwing exceptions', completed: false },
        { id: 'lo-11-09-2', description: 'Log exceptions properly for debugging', completed: false },
        { id: 'lo-11-09-3', description: 'Avoid common exception handling anti-patterns', completed: false },
      ],
      englishExplanation: {
        id: 'ee-11-09',
        text: `Exception handling best practices separate amateur code from professional production-ready systems. These guidelines ensure your code is robust, debuggable, and maintainable.

**1. Catch Specific, Not Generic**: Always catch the most specific exception type. Never use \`catch (Exception e)\` as your only handler. This hides the real error and makes debugging impossible.

**2. Don't Catch and Ignore**: Never write an empty catch block. At minimum, log the exception. Silently swallowing exceptions hides bugs that will surface later in mysterious ways.

**3. Throw When You Can't Handle**: If a method cannot recover from an exception, throw it up. Don't catch just to catch. Let the appropriate layer handle it.

**4. Include Meaningful Messages**: Exception messages should be descriptive. "Error occurred" is useless. "Failed to connect to database at localhost:5432" is actionable.

**5. Log Exceptions Properly**: Use a logging framework (Log4j, SLF4J, java.util.logging). Log the full stack trace, not just the message. Include context: what operation failed, what parameters were used.

**6. Don't Use Exceptions for Flow Control**: Exceptions are for exceptional conditions, not normal logic. Checking if a file exists before opening it is better than catching FileNotFoundException.

**7. Clean Up Resources**: Use try-with-resources or finally blocks. Never leave database connections, file handles, or network sockets open.

**8. Preserve the Original Exception**: When wrapping exceptions, always pass the original as the cause. This maintains the full stack trace for debugging.

**9. Fail Fast**: Validate inputs early. Throw IllegalArgumentException for invalid arguments at the beginning of methods.

**10. Use Custom Exceptions for Domain Errors**: Standard exceptions are for general programming errors. Custom exceptions convey specific business rule violations.

**Production Considerations**:
- In production, never print stack traces to stdout. Use logging frameworks.
- Implement global exception handlers for uncaught exceptions.
- Return meaningful HTTP status codes in REST APIs based on exception type.
- Monitor exception rates for early warning of system issues.`
      },
      romanUrduExplanation: {
        id: 'ru-11-09',
        text: `Exception handling best practices amateur code ko professional production-ready systems se alag karti hain. Ye guidelines ensure karti hain ke aapka code robust, debuggable aur maintainable hai.

**1. Specific Catch, Not Generic**: Hamesha sabse specific exception type catch karein. Kabhi \`catch (Exception e)\` as only handler use na karein. Ye real error chupata hai aur debugging impossible banata hai.

**2. Catch and Ignore Na Karein**: Kabhi empty catch block na likhein. At minimum, exception ko log karein. Silently exceptions ko swallow karna bugs chupata hai.

**3. Jab Handle Na Ho, Toh Throw Karein**: Agar method exception se recover nahi kar sakta, toh use upar throw karein. Sirf catch karne ke liye catch na karein.

**4. Meaningful Messages Include Karein**: Exception messages descriptive hone chahiye. "Error occurred" useless hai. "Failed to connect to database at localhost:5432" actionable hai.

**5. Exceptions Ko Properly Log Karein**: Logging framework use karein (Log4j, SLF4J). Full stack trace log karein, sirf message nahi.

**6. Flow Control Ke Liye Exceptions Use Na Karein**: Exceptions exceptional conditions ke liye hain, normal logic ke liye nahi. File exist check karein, FileNotFoundException catch karne ki bajaye.

**7. Resources Clean Up Karein**: Try-with-resources ya finally blocks use karein. Kabhi connections, file handles ya sockets open na chhodein.

**8. Original Exception Preserve Karein**: Exceptions wrap karte waqt hamesha original ko cause ke taur par pass karein.

**9. Fail Fast**: Inputs early validate karein. Methods ke beginning mein invalid arguments ke liye throw karein.

**10. Domain Errors Ke Liye Custom Exceptions Use Karein**: Standard exceptions general programming errors ke liye hain. Custom exceptions specific business rule violations convey karte hain.`
      },
      keyPoints: [
        { id: 'kp-11-09-1', title: 'Specific Catching', description: 'Catch the most specific exception type. Avoid catch-all as the only handler.' },
        { id: 'kp-11-09-2', title: 'Never Ignore', description: 'Always handle or log exceptions. Empty catch blocks hide bugs and make debugging impossible.' },
        { id: 'kp-11-09-3', title: 'Fail Fast', description: 'Validate inputs early. Throw IllegalArgumentException for invalid arguments immediately.' },
        { id: 'kp-11-09-4', title: 'Proper Logging', description: 'Use logging frameworks. Log full stack traces with context for effective debugging.' },
        { id: 'kp-11-09-5', title: 'Preserve Cause', description: 'When wrapping exceptions, always pass the original as the cause for complete debugging information.' },
      ],
      codeExamples: [
        {
          id: 'ce-11-09-1',
          title: 'Good vs Bad Exception Handling',
          code: `// BAD practices
class BadService {
    void processOrder(Order order) {
        try {
            validate(order);
            save(order);
            notify(order);
        } catch (Exception e) {
            // Catch-all ignores specific errors
        }
    }

    void save(Order order) {
        try {
            database.save(order);
        } catch (SQLException e) {
            // Silent failure — data lost!
        }
    }
}

// GOOD practices
class GoodService {
    void processOrder(Order order) {
        // Fail fast: validate early
        if (order == null) {
            throw new IllegalArgumentException("Order cannot be null");
        }

        try {
            validate(order);
            save(order);
            notify(order);
        } catch (ValidationException e) {
            // Handle specific: log and notify user
            logger.warn("Validation failed: " + e.getMessage());
            throw new OrderProcessingException("Invalid order", e);
        } catch (DatabaseException e) {
            // Handle specific: retry or escalate
            logger.error("Database error saving order", e);
            throw new OrderProcessingException("Save failed", e);
        }
    }

    void save(Order order) throws DatabaseException {
        try {
            database.save(order);
        } catch (SQLException e) {
            // Wrap with context
            throw new DatabaseException("Failed to save order: " + order.getId(), e);
        }
    }
}`,
          language: 'java',
          explanation: 'Good practices: validate early (fail fast), catch specific exceptions, log properly, wrap with context, and never silently ignore.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-11-09-1',
          title: 'REST API Exception Handler',
          scenario: 'A Spring REST API needs to convert exceptions to appropriate HTTP responses.',
          oopConcept: 'Global exception handler catches different exception types and returns appropriate HTTP status codes and error messages.',
          codeExample: {
            id: 'rwe-code-11-09-1',
            title: 'Global Exception Handler',
            code: `@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Error> handleIllegalArg(IllegalArgumentException e) {
        return ResponseEntity.badRequest()
            .body(new Error("INVALID_ARGUMENT", e.getMessage()));
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Error> handleNotFound(ResourceNotFoundException e) {
        return ResponseEntity.status(404)
            .body(new Error("NOT_FOUND", e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Error> handleGeneral(Exception e) {
        logger.error("Unexpected error", e);
        return ResponseEntity.status(500)
            .body(new Error("INTERNAL_ERROR", "An unexpected error occurred"));
    }
}`,
            language: 'java',
          },
        },
      ],
      commonMistakes: [
        {
          id: 'cm-11-09-1',
          title: 'Using Exceptions for Flow Control',
          incorrectCode: `// BAD: using exception as flow control
try {
    int value = array[index];
    process(value);
} catch (ArrayIndexOutOfBoundsException e) {
    // This is normal logic, not an exceptional condition!
    System.out.println("End of array");
}`,
          correctCode: `// GOOD: check before accessing
if (index < array.length) {
    int value = array[index];
    process(value);
} else {
    System.out.println("End of array");
}`,
          explanation: 'Exceptions should not replace normal conditional checks. Use if-else for expected conditions and exceptions for unexpected errors.',
        },
        {
          id: 'cm-11-09-2',
          title: 'Printing Stack Trace in Production',
          incorrectCode: `// BAD: printing to stdout in production
try {
    service.process();
} catch (Exception e) {
    e.printStackTrace();  // Goes to stdout, no timestamps, no structure
}`,
          correctCode: `// GOOD: using logging framework
try {
    service.process();
} catch (Exception e) {
    logger.error("Failed to process request", e);
    // Structured logging with timestamps, levels, and stack traces
}`,
          explanation: 'e.printStackTrace() writes to stderr without structure. Use logging frameworks for timestamps, log levels, and integration with monitoring tools.',
        },
      ],
      examNotes: [
        { id: 'en-11-09-1', title: 'Key Best Practices', content: 'Catch specific, log properly, fail fast, preserve cause, use custom exceptions, clean up resources, never ignore.', importance: 'high' },
        { id: 'en-11-09-2', title: 'Anti-Patterns', content: 'Don\'t catch Exception as only handler. Don\'t use exceptions for flow control. Don\'t silently swallow exceptions.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-11-09-1', question: 'What are the top 3 exception handling best practices?', answer: '1) Catch specific exceptions, not generic. 2) Never silently ignore exceptions — always log or handle. 3) Preserve the original exception when wrapping with context.', difficulty: 'medium' },
        { id: 'vq-11-09-2', question: 'Why should you not use exceptions for flow control?', answer: 'Exceptions are expensive (stack trace creation) and semantically wrong for normal conditions. Use if-else for expected conditions; exceptions are for unexpected errors.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-11-09-1', type: 'mcq', question: 'Which is an exception handling anti-pattern?', options: ['Catching specific exceptions', 'Logging exceptions properly', 'Catching Exception as the only handler', 'Preserving the original exception'], correctAnswer: 'Catching Exception as the only handler', explanation: 'Catching generic Exception hides specific errors. Always catch the most specific type and use Exception as a last resort.' },
        { id: 'qc-11-09-2', type: 'true-false', question: 'It is acceptable to have empty catch blocks in production code.', correctAnswer: 'False', explanation: 'Empty catch blocks hide bugs. Always log or handle exceptions. If you truly cannot handle it, rethrow it.' },
        { id: 'qc-11-09-3', type: 'mcq', question: 'What is "fail fast" in exception handling?', options: ['Catch all exceptions immediately', 'Validate inputs early and throw for invalid arguments', 'Terminate the program on first error', 'Use finally blocks for cleanup'], correctAnswer: 'Validate inputs early and throw for invalid arguments', explanation: 'Fail fast means detecting and throwing exceptions for invalid inputs at the beginning of methods, before processing begins.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-11-09-1',
          scenario: 'Your team lead reviews your code and finds a catch block that catches Exception, logs the message, and continues. The code handles database operations, file I/O, and network calls.',
          question: 'What improvements should be suggested?',
          type: 'debugging',
          options: [
            'Remove all exception handling — let them propagate',
            'Replace with specific catches for each exception type, with appropriate handling for each',
            'Change to catch (Throwable t) for complete coverage',
            'Keep as is — catching Exception handles all cases',
          ],
          correctAnswer: 'Replace with specific catches for each exception type, with appropriate handling for each',
          explanation: 'Different exception types need different handling. Database errors might need retry, file errors need different messaging, network errors might need fallback.',
          relatedConcepts: ['specific-catching', 'exception-handling', 'production-readiness'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-best-practices',
      prerequisites: ['lesson-11-05', 'lesson-11-06', 'lesson-11-07'],
      xpReward: 75,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'best-practices',
      difficulty: 'medium',
      estimatedMinutes: 15,
    },
    {
      id: 'lesson-11-10',
      moduleId: 'module-11',
      title: 'Exception Handling in Real Systems',
      slug: 'exception-handling-real-systems',
      order: 10,
      duration: 22,
      description: 'Apply exception handling in real-world scenarios: REST APIs, file I/O, database operations, and distributed systems.',
      learningObjectives: [
        { id: 'lo-11-10-1', description: 'Handle exceptions in REST API controllers', completed: false },
        { id: 'lo-11-10-2', description: 'Implement robust file I/O error handling', completed: false },
        { id: 'lo-11-10-3', description: 'Manage database transaction exceptions', completed: false },
        { id: 'lo-11-10-4', description: 'Design a global exception handling strategy', completed: false },
      ],
      englishExplanation: {
        id: 'ee-11-10',
        text: `Real-world Java applications require sophisticated exception handling strategies that go beyond simple try-catch. Different layers of the application need different approaches.

**REST API Exception Handling**: REST APIs must convert exceptions to appropriate HTTP status codes. A validation error returns 400, a not-found returns 404, a server error returns 500. Frameworks like Spring provide \`@ControllerAdvice\` for global exception handling across all controllers.

\`\`\`java
@RestControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorDTO handleNotFound(ResourceNotFoundException e) {
        return new ErrorDTO("NOT_FOUND", e.getMessage());
    }
}
\`\`\`

**File I/O Exception Handling**: File operations are inherently unreliable — files can be missing, locked, corrupted, or have permission issues. Always use try-with-resources and catch specific IOExceptions.

**Database Exception Handling**: Database operations can fail due to connection issues, constraint violations, deadlocks, or query errors. Use exception wrapping to convert low-level SQLExceptions into meaningful business exceptions.

**Distributed System Exceptions**: In microservices, exceptions must be propagated across service boundaries. Use structured error responses. Implement retry logic with exponential backoff. Circuit breaker patterns prevent cascading failures.

**Exception Handling Strategy**:
1. **Presentation Layer**: Convert exceptions to user-friendly responses.
2. **Service Layer**: Add business context, wrap low-level exceptions.
3. **Repository Layer**: Convert database exceptions to repository exceptions.
4. **Cross-cutting**: Global exception handler, logging, monitoring.

**Monitoring and Alerting**: Track exception rates. Spike in exceptions indicates system issues. Set up alerts for specific exception types (AuthenticationException, DatabaseConnectionException).

**Exception Logging Pattern**:
\`\`\`java
try {
    riskyOperation();
} catch (SpecificException e) {
    logger.error("Operation failed: context={}", context, e);
    throw new BusinessException("Operation failed", e);
}
\`\`\`
Log the exception with context at the point of capture. Wrap with business context for the caller.`
      },
      romanUrduExplanation: {
        id: 'ru-11-10',
        text: `Real-world Java applications ko sophisticated exception handling strategies ki zaroorat hoti hai jo simple try-catch se aage hain. Application ke different layers ko different approaches chahiye.

**REST API Exception Handling**: REST APIs ko exceptions ko appropriate HTTP status codes mein convert karna hota hai. Validation error 400 return karta hai, not-found 404, server error 500.

**File I/O Exception Handling**: File operations inherently unreliable hain — files missing, locked, corrupted ya permission issues ho sakti hain. Hamesha try-with-resources use karein aur specific IOExceptions catch karein.

**Database Exception Handling**: Database operations connection issues, constraint violations, deadlocks ya query errors ki wajah se fail ho sakti hain. Low-level SQLExceptions ko meaningful business exceptions mein convert karne ke liye exception wrapping use karein.

**Distributed System Exceptions**: Microservices mein exceptions ko service boundaries cross karna padta hai. Structured error responses use karein. Retry logic with exponential backoff implement karein.

**Exception Handling Strategy**:
1. **Presentation Layer**: Exceptions ko user-friendly responses mein convert karein.
2. **Service Layer**: Business context add karein, low-level exceptions wrap karein.
3. **Repository Layer**: Database exceptions ko repository exceptions mein convert karein.
4. **Cross-cutting**: Global exception handler, logging, monitoring.

**Exception Logging Pattern**: Exception ko context ke saath log karein. Caller ke liye business context ke saath wrap karein.`
      },
      keyPoints: [
        { id: 'kp-11-10-1', title: 'Layered Handling', description: 'Each layer handles exceptions differently: presentation converts to responses, service adds context, repository wraps DB errors.' },
        { id: 'kp-11-10-2', title: 'REST API Conversions', description: 'Convert exceptions to HTTP status codes. Use @ControllerAdvice for global handling in Spring.' },
        { id: 'kp-11-10-3', title: 'Retry and Resilience', description: 'Implement retry with backoff for transient failures. Use circuit breakers for cascading failure prevention.' },
        { id: 'kp-11-10-4', title: 'Monitoring', description: 'Track exception rates and patterns. Alert on spikes. Use structured logging for production debugging.' },
      ],
      codeExamples: [
        {
          id: 'ce-11-10-1',
          title: 'Complete REST API Exception Handling',
          code: `// Custom exceptions for the API
class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String resource, Long id) {
        super(resource + " not found with id: " + id);
    }
}

class ValidationException extends RuntimeException {
    private Map<String, String> errors;
    public ValidationException(Map<String, String> errors) {
        super("Validation failed");
        this.errors = errors;
    }
    public Map<String, String> getErrors() { return errors; }
}

// Global exception handler
@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException e) {
        ErrorResponse error = new ErrorResponse("NOT_FOUND", e.getMessage());
        return ResponseEntity.status(404).body(error);
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidation(ValidationException e) {
        ErrorResponse error = new ErrorResponse("VALIDATION_ERROR", e.getErrors());
        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(DatabaseException.class)
    public ResponseEntity<ErrorResponse> handleDatabase(DatabaseException e) {
        logger.error("Database error", e);
        ErrorResponse error = new ErrorResponse("DATABASE_ERROR", "Service temporarily unavailable");
        return ResponseEntity.status(503).body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneral(Exception e) {
        logger.error("Unexpected error", e);
        ErrorResponse error = new ErrorResponse("INTERNAL_ERROR", "An unexpected error occurred");
        return ResponseEntity.status(500).body(error);
    }
}`,
          language: 'java',
          explanation: 'Different exception types map to different HTTP responses. The global handler converts all exceptions to structured error DTOs.',
        },
        {
          id: 'ce-11-10-2',
          title: 'Database Transaction Exception Handling',
          code: `public class OrderService {
    private OrderRepository orderRepo;
    private InventoryRepository inventoryRepo;
    private Connection dbConnection;

    public void placeOrder(Order order) throws OrderException {
        try {
            dbConnection.setAutoCommit(false);

            orderRepo.save(order);
            inventoryRepo.reserve(order.getItems());

            dbConnection.commit();
        } catch (SQLException e) {
            try {
                dbConnection.rollback();
            } catch (SQLException rollbackEx) {
                logger.error("Rollback failed", rollbackEx);
            }
            throw new OrderException("Failed to place order: " + e.getMessage(), e);
        } finally {
            try {
                dbConnection.setAutoCommit(true);
            } catch (SQLException e) {
                logger.error("Failed to reset auto-commit", e);
            }
        }
    }
}`,
          language: 'java',
          explanation: 'Database transactions require commit on success, rollback on failure. The finally block restores the connection state.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-11-10-1',
          title: 'Microservice Error Propagation',
          scenario: 'Order Service calls Inventory Service and Payment Service. Both can fail independently.',
          oopConcept: 'Each service wraps its own exceptions. If Inventory Service is down, Order Service retries, then returns a meaningful error to the client.',
          codeExample: {
            id: 'rwe-code-11-10-1',
            title: 'Service-to-Service Error Handling',
            code: `@Service
public class OrderService {
    private final InventoryClient inventoryClient;
    private final PaymentClient paymentClient;

    public OrderResult processOrder(OrderRequest request) {
        try {
            // Step 1: Check inventory
            inventoryClient.reserve(request.getItems());
        } catch (InventoryException e) {
            throw new OrderException("Items unavailable", e);
        }

        try {
            // Step 2: Process payment
            paymentClient.charge(request.getPayment());
        } catch (PaymentException e) {
            // Rollback inventory reservation
            inventoryClient.release(request.getItems());
            throw new OrderException("Payment failed", e);
        }

        return OrderResult.success("Order placed");
    }
}`,
            language: 'java',
          },
        },
      ],
      commonMistakes: [
        {
          id: 'cm-11-10-1',
          title: 'Not Rolling Back on Database Errors',
          incorrectCode: `// BAD: no rollback on failure
public void transfer(Account from, Account to, double amount) {
    try {
        from.debit(amount);
        database.save(from);
        to.credit(amount);
        database.save(to);  // If THIS fails, from is debited but to is not credited!
    } catch (SQLException e) {
        // Money lost!
    }
}`,
          correctCode: `// GOOD: transaction with rollback
public void transfer(Account from, Account to, double amount) {
    Connection conn = database.getConnection();
    try {
        conn.setAutoCommit(false);
        from.debit(amount);
        database.save(from);
        to.credit(amount);
        database.save(to);
        conn.commit();
    } catch (SQLException e) {
        conn.rollback();  // Both operations undone
        throw new TransferException("Transfer failed", e);
    }
}`,
          explanation: 'Database operations must be wrapped in transactions. On any failure, rollback ensures data consistency.',
        },
      ],
      examNotes: [
        { id: 'en-11-10-1', title: 'Layered Exception Strategy', content: 'Presentation → user-friendly messages. Service → business context. Repository → DB error wrapping. Cross-cutting → global handler.', importance: 'high' },
        { id: 'en-11-10-2', title: 'Transaction Rollback', content: 'Database operations in transactions must rollback on failure. Never leave partial operations committed.', importance: 'high' },
        { id: 'en-11-10-3', title: 'Production Monitoring', content: 'Track exception rates. Set up alerts. Use structured logging. Never use e.printStackTrace() in production.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-11-10-1', question: 'How should exceptions be handled across application layers?', answer: 'Each layer has a different role: Presentation converts exceptions to user responses. Service adds business context. Repository wraps database errors. A global handler manages cross-cutting concerns.', difficulty: 'hard' },
        { id: 'vq-11-10-2', question: 'Why is transaction rollback important in database operations?', answer: 'Without rollback, partial operations can be committed, leaving the database in an inconsistent state. Rollback ensures all-or-nothing execution.', difficulty: 'medium' },
        { id: 'vq-11-10-3', question: 'What should production exception logging include?', answer: 'Timestamp, log level, full stack trace, contextual information (what operation failed, parameters used), and correlation IDs for distributed tracing.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-11-10-1', type: 'mcq', question: 'In a layered architecture, where should exceptions be converted to HTTP status codes?', options: ['Repository layer', 'Service layer', 'Presentation/Controller layer', 'Database layer'], correctAnswer: 'Presentation/Controller layer', explanation: 'The presentation layer translates exceptions to HTTP responses. Service and repository layers handle business and data logic.' },
        { id: 'qc-11-10-2', type: 'true-false', question: 'Database transactions should commit partially on partial failure.', correctAnswer: 'False', explanation: 'Transactions must be atomic — all operations succeed or all are rolled back. Partial commits leave inconsistent data.' },
        { id: 'qc-11-10-3', type: 'mcq', question: 'What logging should be used in production Java applications?', options: ['System.out.println', 'e.printStackTrace()', 'Logging framework (SLF4J, Log4j)', 'System.err.println'], correctAnswer: 'Logging framework (SLF4J, Log4j)', explanation: 'Logging frameworks provide structured output, log levels, timestamps, and integration with monitoring systems.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-11-10-1',
          scenario: 'An e-commerce order process involves: inventory check, payment processing, and email notification. Any step can fail.',
          question: 'How should you handle exceptions in this multi-step process?',
          type: 'architecture',
          options: [
            'Use one try-catch for all steps',
            'Each step has its own try-catch with specific handling: inventory exception returns out-of-stock, payment exception returns payment failure, email exception is logged but does not fail the order',
            'No exception handling — let the system crash on any failure',
            'Catch Exception and return a generic error for all failures',
          ],
          correctAnswer: 'Each step has its own try-catch with specific handling: inventory exception returns out-of-stock, payment exception returns payment failure, email exception is logged but does not fail the order',
          explanation: 'Different failures need different responses. Inventory issues show out-of-stock. Payment failures need retry/refund. Email failures are non-critical — log and continue.',
          relatedConcepts: ['multi-step-exception-handling', 'business-logic', 'error-responses'],
          difficulty: 'hard',
        },
      ],
      threeDSceneId: 'scene-real-systems',
      prerequisites: ['lesson-11-05', 'lesson-11-06', 'lesson-11-08', 'lesson-11-09'],
      xpReward: 100,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'system-exception-flow',
      difficulty: 'advanced',
      estimatedMinutes: 22,
    },
  ],
};
