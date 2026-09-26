import type { QuizQuestion, ScenarioQuestion, OutputQuestion, DebugChallenge, MistakeQuestion, CodeCompletionQuestion } from '@/types';

export const module11Questions: {
  quickChecks: QuizQuestion[];
  scenarios: ScenarioQuestion[];
  outputs: OutputQuestion[];
  debugs: DebugChallenge[];
  mistakes: MistakeQuestion[];
  codeCompletions: CodeCompletionQuestion[];
} = {
  quickChecks: [
    {
      id: 'm11-quiz-001', type: 'mcq', question: 'What is an exception in Java?',
      options: ['A syntax error', 'An abnormal condition that disrupts normal program flow', 'A warning', 'A type of loop'],
      correctAnswer: 'An abnormal condition that disrupts normal program flow',
      explanation: 'An exception is a runtime event that interrupts normal execution. It can be caught and handled to prevent program crash.',
      romanUrduExplanation: 'Exception ek runtime event hai jo normal execution ko interrupt karta hai. Isse catch karke handle kar sakte hain.',
      difficulty: 'easy', topicTags: ['exceptions', 'basics'], xpReward: 25, moduleId: 'module-11',
    },
    {
      id: 'm11-quiz-002', type: 'mcq', question: 'What is the difference between Error and Exception?',
      options: ['No difference', 'Error is for JVM issues (OutOfMemoryError), Exception is for recoverable conditions', 'Error is checked, Exception is unchecked', 'Exception is more serious'],
      correctAnswer: 'Error is for JVM issues (OutOfMemoryError), Exception is for recoverable conditions',
      explanation: 'Errors represent serious JVM problems (OutOfMemoryError, StackOverflowError) that applications should not try to catch. Exceptions are recoverable conditions.',
      romanUrduExplanation: 'Errors serious JVM problems hain (OutOfMemoryError, StackOverflowError) jo catch nahi karni chahiye. Exceptions recoverable conditions hain.',
      difficulty: 'medium', topicTags: ['exceptions', 'errors', 'hierarchy'], xpReward: 30, moduleId: 'module-11',
    },
    {
      id: 'm11-quiz-003', type: 'mcq', question: 'What are checked and unchecked exceptions?',
      options: [
        'Checked = caught at runtime, Unchecked = caught at compile time',
        'Checked = must be declared/caught (IOException), Unchecked = optional (NullPointerException)',
        'Checked = only in checked languages',
        'No difference',
      ],
      correctAnswer: 'Checked = must be declared/caught (IOException), Unchecked = optional (NullPointerException)',
      explanation: 'Checked exceptions must be handled (try-catch) or declared (throws). Unchecked exceptions (RuntimeException subclasses) are optional to handle.',
      romanUrduExplanation: 'Checked exceptions handle karni padti hain (try-catch) ya declare (throws). Unchecked exceptions optional hain.',
      difficulty: 'medium', topicTags: ['checked-exceptions', 'unchecked-exceptions'], xpReward: 30, moduleId: 'module-11',
    },
    {
      id: 'm11-quiz-004', type: 'mcq', question: 'What does the finally block do?',
      options: ['Runs only if exception occurs', 'Runs only if no exception occurs', 'Always runs whether exception occurs or not', 'Replaces the catch block'],
      correctAnswer: 'Always runs whether exception occurs or not',
      explanation: 'finally block executes whether an exception is thrown or not. It is used for cleanup code (closing files, releasing resources).',
      romanUrduExplanation: 'finally block chahe exception aaye ya na aaye execute hota hai. Cleanup code ke liye use hota hai (files close karna, resources release karna).',
      difficulty: 'easy', topicTags: ['finally', 'try-catch', 'cleanup'], xpReward: 25, moduleId: 'module-11',
    },
    {
      id: 'm11-quiz-005', type: 'mcq', question: 'What is a try-with-resources statement?',
      options: [
        'A try block with finally',
        'A try block that automatically closes resources implementing AutoCloseable',
        'A try block with multiple catches',
        'A try block that catches all exceptions',
      ],
      correctAnswer: 'A try block that automatically closes resources implementing AutoCloseable',
      explanation: 'try-with-resources automatically calls close() on resources declared in the try statement. Available since Java 7 for AutoCloseable implementations.',
      romanUrduExplanation: 'try-with-resources automatically close() call karta hai jo resources try statement mein declare hoti hain. Java 7 se hai AutoCloseable ke liye.',
      difficulty: 'medium', topicTags: ['try-with-resources', 'auto-closeable'], xpReward: 30, moduleId: 'module-11',
    },
    {
      id: 'm11-quiz-006', type: 'mcq', question: 'Can a try block have multiple catch blocks?',
      options: ['No, only one catch allowed', 'Yes, for handling different exception types', 'Only if they catch the same exception', 'Only with finally'],
      correctAnswer: 'Yes, for handling different exception types',
      explanation: 'Multiple catch blocks handle different exception types. More specific exceptions should be caught first. Multi-catch (|) can combine catches.',
      romanUrduExplanation: 'Multiple catch blocks different exception types handle karte hain. Pehle specific exceptions catch karo. Multi-catch (|) combine kar sakta hai.',
      difficulty: 'easy', topicTags: ['try-catch', 'multiple-catch'], xpReward: 25, moduleId: 'module-11',
    },
    {
      id: 'm11-quiz-007', type: 'mcq', question: 'What is the benefit of custom exceptions?',
      options: ['Make code longer', 'Provide meaningful error messages and enable specific catch handling', 'Automatically fix errors', 'Reduce compilation time'],
      correctAnswer: 'Provide meaningful error messages and enable specific catch handling',
      explanation: 'Custom exceptions make code more readable, enable specific error handling, and carry domain-specific information about what went wrong.',
      romanUrduExplanation: 'Custom exceptions code ko readable banate hain, specific error handling enable karte hain, aur domain-specific information carry karte hain.',
      difficulty: 'medium', topicTags: ['custom-exceptions', 'best-practices'], xpReward: 30, moduleId: 'module-11',
    },
    {
      id: 'm11-quiz-008', type: 'true-false', question: 'A method can declare that it throws multiple checked exceptions.',
      correctAnswer: 'True',
      explanation: 'Methods can declare multiple checked exceptions using comma-separated throws clause: throws IOException, SQLException.',
      romanUrduExplanation: 'Methods comma-separated throws clause se multiple checked exceptions declare kar sakti hain: throws IOException, SQLException.',
      difficulty: 'easy', topicTags: ['throws', 'checked-exceptions'], xpReward: 25, moduleId: 'module-11',
    },
    {
      id: 'm11-quiz-009', type: 'mcq', question: 'What is the exception hierarchy root class?',
      options: ['Error', 'Throwable', 'Exception', 'RuntimeException'],
      correctAnswer: 'Throwable',
      explanation: 'Throwable is the root of the exception hierarchy. It has two subclasses: Error (JVM issues) and Exception (application issues).',
      romanUrduExplanation: 'Throwable exception hierarchy ka root hai. Iske do subclasses hain: Error (JVM issues) aur Exception (application issues).',
      difficulty: 'easy', topicTags: ['exception-hierarchy', 'throwable'], xpReward: 25, moduleId: 'module-11',
    },
    {
      id: 'm11-quiz-010', type: 'mcq', question: 'What happens if finally and return both exist?',
      options: ['Only finally runs', 'Only return runs', 'Finally runs before the method returns', 'Compilation error'],
      correctAnswer: 'Finally runs before the method returns',
      explanation: 'finally block always executes, even before a return statement. If finally has a return, it overrides the try/catch return value.',
      romanUrduExplanation: 'finally block hamesha execute hota hai, return statement se pehle bhi. Agar finally mein return hai toh wo try/catch return value override karta hai.',
      difficulty: 'hard', topicTags: ['finally', 'return', 'execution-order'], xpReward: 35, moduleId: 'module-11',
    },
  ],
  scenarios: [
    {
      id: 'm11-sq-001', title: 'File Processing Safety',
      scenario: 'You are reading a file that may not exist. You need to read all lines, process them, and ensure the file is always closed even if processing fails.',
      question: 'What is the best approach?',
      type: 'design-decision',
      options: [
        'Use try-catch-finally with manual close',
        'Use try-with-resources with BufferedReader (AutoCloseable)',
        'Just catch FileNotFoundException',
        'Use System.exit() on error',
      ],
      correctAnswer: 'Use try-with-resources with BufferedReader (AutoCloseable)',
      explanation: 'try-with-resources automatically closes the BufferedReader even if an exception occurs. It is cleaner and safer than manual close in finally.',
      romanUrduExplanation: 'try-with-resources automatically BufferedReader close karta hai chahe exception aaye. Manual close se cleaner aur safer hai.',
      relatedConcepts: ['try-with-resources', 'auto-closeable', 'resource-management'], difficulty: 'easy',
    },
    {
      id: 'm11-sq-002', title: 'Database Connection Handling',
      scenario: 'A database method can throw SQLException (checked) and NullPointerException (unchecked). You want to log the error, clean up, and re-throw a custom DatabaseException.',
      question: 'How should you handle this?',
      type: 'design-decision',
      options: [
        'Catch only SQLException and ignore NullPointerException',
        'Catch both, wrap in DatabaseException with original cause, use finally for cleanup',
        'Let both propagate unhandled',
        'Use Thread.sleep() to wait for recovery',
      ],
      correctAnswer: 'Catch both, wrap in DatabaseException with original cause, use finally for cleanup',
      explanation: 'Catch specific exceptions, wrap in custom exception with original cause (for debugging), use finally for resource cleanup (closing connection).',
      romanUrduExplanation: 'Specific exceptions catch karo, custom exception mein wrap karo original cause ke saath, cleanup ke liye finally use karo.',
      relatedConcepts: ['exception-chaining', 'custom-exceptions', 'finally', 'cleanup'], difficulty: 'medium',
    },
  ],
  outputs: [
    {
      id: 'm11-oq-001', lessonId: 'lesson-11-01',
      code: `public class Main {
    public static void main(String[] args) {
        try {
            int x = 10 / 0;
            System.out.println("After division");
        } catch (ArithmeticException e) {
            System.out.println("Caught: " + e.getMessage());
        } finally {
            System.out.println("Finally block");
        }
        System.out.println("After try-catch");
    }
}`,
      options: ['After division, Finally block, After try-catch', 'Caught: / by zero, Finally block, After try-catch', 'Compilation error', 'Caught: / by zero, After try-catch'],
      correctOutput: 'Caught: / by zero, Finally block, After try-catch',
      explanation: 'Division by zero throws ArithmeticException. "After division" is skipped. catch prints message. finally always runs. Then "After try-catch".',
      romanUrduExplanation: 'Zero se division ArithmeticException throw karta hai. "After division" skip hota hai. catch message print karta hai. finally hamesha run hota hai.',
      conceptTested: ['try-catch', 'finally', 'arithmetic-exception'], difficulty: 'easy',
    },
    {
      id: 'm11-oq-002', lessonId: 'lesson-11-02',
      code: `public class Main {
    public static void main(String[] args) {
        try {
            System.out.println("Start");
            int[] arr = new int[3];
            arr[5] = 10;
            System.out.println("End");
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Index error");
        } catch (Exception e) {
            System.out.println("General error");
        } finally {
            System.out.println("Cleanup");
        }
    }
}`,
      options: ['Start, End, Cleanup', 'Start, Index error, Cleanup', 'Start, General error, Cleanup', 'Compilation error'],
      correctOutput: 'Start, Index error, Cleanup',
      explanation: 'arr[5] throws ArrayIndexOutOfBoundsException. "End" is skipped. First matching catch (ArrayIndexOutOfBoundsException) handles it. finally runs.',
      romanUrduExplanation: 'arr[5] ArrayIndexOutOfBoundsException throw karta hai. "End" skip hota hai. Pehla matching catch handle karta hai. finally run hota hai.',
      conceptTested: ['try-catch', 'exception-handling', 'array-exception'], difficulty: 'easy',
    },
  ],
  debugs: [
    {
      id: 'm11-dc-001', title: 'Swallowing Exceptions',
      description: 'Empty catch block silently swallows exceptions, making debugging impossible.',
      buggyCode: `public class UserService {
    public User findUser(String id) {
        try {
            return database.query("SELECT * FROM users WHERE id=?", id);
        } catch (Exception e) {
            // TODO: handle exception
            return null;
        }
    }
}`,
      expectedBehavior: 'Should properly handle or propagate exceptions with meaningful information.',
      hints: ['Empty catch blocks hide errors', 'Log the exception or re-throw with context', 'Use custom exceptions for business logic errors'],
      solution: `public class UserService {
    public User findUser(String id) {
        try {
            return database.query("SELECT * FROM users WHERE id=?", id);
        } catch (SQLException e) {
            throw new DatabaseException("Failed to find user: " + id, e);
        }
    }
}`,
      explanation: 'Never swallow exceptions silently. At minimum, log them. Better: re-throw as custom exception with context.',
      romanUrduExplanation: 'Exceptions ko kabhi silently swallow mat karo. Kam se kam log karo. Behtar: custom exception mein context ke saath re-throw karo.',
      difficulty: 'medium', topicTags: ['exception-handling', 'best-practices'], xpReward: 60,
      errorMessage: 'Errors silently lost', errorType: 'logical', conceptTested: ['exception-handling'],
    },
  ],
  mistakes: [
    {
      id: 'm11-mq-001', title: 'Catching Generic Exception',
      code: `try {
    readFile("data.txt");
    parseContent(content);
    saveToDatabase(record);
} catch (Exception e) {
    System.out.println("Something went wrong");
}`,
      mistakeDescription: 'Catching generic Exception hides the actual problem type.',
      possibleMistakes: ['Using catch(Exception e) as default', 'Not catching specific exceptions first', 'Hiding the real error'],
      correctMistake: 'Catch specific exceptions and handle each appropriately.',
      correction: `try {
    readFile("data.txt");
    parseContent(content);
    saveToDatabase(record);
} catch (FileNotFoundException e) {
    logger.error("File not found: " + e.getMessage());
} catch (ParseException e) {
    logger.error("Parse error: " + e.getMessage());
} catch (SQLException e) {
    logger.error("Database error: " + e.getMessage());
}`,
      explanation: 'Catching specific exceptions allows targeted error handling. Generic catch hides the real problem and makes debugging harder.',
      romanUrduExplanation: 'Specific exceptions catch karna targeted error handling allow karta hai. Generic catch asal problem chhupa deta hai.',
      difficulty: 'medium', conceptTested: ['exception-handling', 'best-practices'],
    },
  ],
  codeCompletions: [
    {
      id: 'm11-cc-001', lessonId: 'lesson-11-01',
      codeTemplate: `public class FileHandler {
    // TODO: Read file with try-with-resources and handle exceptions
    public static String readFile(String path) {
        ____________
    }
}`,
      blank: 'try (BufferedReader br = new BufferedReader(new FileReader(path))) { StringBuilder sb = new StringBuilder(); String line; while ((line = br.readLine()) != null) sb.append(line).append("\\n"); return sb.toString(); } catch (IOException e) { throw new RuntimeException("Failed to read: " + path, e); }',
      acceptedAnswers: [
        'try (BufferedReader br = new BufferedReader(new FileReader(path))) { StringBuilder sb = new StringBuilder(); String line; while ((line = br.readLine()) != null) sb.append(line).append("\\n"); return sb.toString(); } catch (IOException e) { throw new RuntimeException("Failed to read: " + path, e); }',
      ],
      explanation: 'try-with-resources auto-catches IOException and auto-closes the reader. Wrap checked exceptions in RuntimeException for callers.',
      romanUrduExplanation: 'try-with-resources auto-catches IOException aur auto-closes reader. Checked exceptions ko RuntimeException mein wrap karo.',
      hints: ['Use try-with-resources for AutoCloseable', 'Catch IOException', 'Re-throw or return meaningful result'],
      difficulty: 'medium', conceptTested: ['try-with-resources', 'exception-handling'],
    },
  ],
};
