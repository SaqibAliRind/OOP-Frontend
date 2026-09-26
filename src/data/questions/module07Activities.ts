import type { QuizQuestion, ScenarioQuestion, OutputQuestion, DebugChallenge, MistakeQuestion, CodeCompletionQuestion } from '@/types';

export const module07Questions: {
  quickChecks: QuizQuestion[];
  scenarios: ScenarioQuestion[];
  outputs: OutputQuestion[];
  debugs: DebugChallenge[];
  mistakes: MistakeQuestion[];
  codeCompletions: CodeCompletionQuestion[];
} = {
  quickChecks: [
    {
      id: 'm07-quiz-001', type: 'mcq',
      question: 'What is the output of: String s = "Hello"; String s2 = new String("Hello"); System.out.println(s == s2);',
      options: ['true', 'false', 'Compilation error', 'Runtime error'],
      correctAnswer: 'false',
      explanation: '== compares references, not values. "Hello" in string literal pool and new String("Hello") on heap are different objects.',
      romanUrduExplanation: '== references compare karta hai, values nahi. String literal pool aur heap par different objects hain.',
      difficulty: 'easy', topicTags: ['strings', 'string-pool', 'references'], xpReward: 25, moduleId: 'module-07',
    },
    {
      id: 'm07-quiz-002', type: 'mcq',
      question: 'Which method is used to compare string content (not reference)?',
      options: ['==', 'equals()', 'compare()', 'isSame()'],
      correctAnswer: 'equals()',
      explanation: 'equals() compares the actual character content of two strings, while == compares memory references.',
      romanUrduExplanation: 'equals() actual character content compare karta hai, == memory references compare karta hai.',
      difficulty: 'easy', topicTags: ['strings', 'equals'], xpReward: 25, moduleId: 'module-07',
    },
    {
      id: 'm07-quiz-003', type: 'mcq',
      question: 'Why are Strings immutable in Java?',
      options: ['For memory optimization', 'For security and thread safety', 'Because Java doesn\'t allow changes', 'To prevent null pointer exceptions'],
      correctAnswer: 'For security and thread safety',
      explanation: 'String immutability ensures thread safety, enables string pooling for memory optimization, and is critical for class loading and network security.',
      romanUrduExplanation: 'String immutability thread safety ensure karta hai, string pooling enable karta hai, aur security ke liye zaroori hai.',
      difficulty: 'medium', topicTags: ['strings', 'immutability', 'thread-safety'], xpReward: 30, moduleId: 'module-07',
    },
    {
      id: 'm07-quiz-004', type: 'true-false',
      question: 'StringBuilder is thread-safe in Java.',
      correctAnswer: 'False',
      explanation: 'StringBuilder is NOT thread-safe. Use StringBuffer if thread safety is needed. StringBuilder is faster because it avoids synchronization overhead.',
      romanUrduExplanation: 'StringBuilder thread-safe nahi hai. Thread safety chahiye toh StringBuffer use karo.',
      difficulty: 'medium', topicTags: ['string-builder', 'thread-safety'], xpReward: 25, moduleId: 'module-07',
    },
    {
      id: 'm07-quiz-005', type: 'mcq',
      question: 'What is the difference between String and StringBuilder?',
      options: [
        'String is mutable, StringBuilder is immutable',
        'String is immutable, StringBuilder is mutable',
        'Both are mutable',
        'Both are immutable',
      ],
      correctAnswer: 'String is immutable, StringBuilder is mutable',
      explanation: 'String objects cannot be modified after creation. StringBuilder objects can be modified (appended, inserted, deleted) without creating new objects.',
      romanUrduExplanation: 'String objects create hone ke baad modify nahi ho sakte. StringBuilder objects modify ho sakte hain.',
      difficulty: 'easy', topicTags: ['strings', 'string-builder', 'mutability'], xpReward: 25, moduleId: 'module-07',
    },
    {
      id: 'm07-quiz-006', type: 'mcq',
      question: 'Which is faster for concatenating strings in a loop?',
      options: ['String + operator', 'StringBuilder.append()', 'StringBuffer.append()', 'String.concat()'],
      correctAnswer: 'StringBuilder.append()',
      explanation: 'Each + operation on String creates a new object. StringBuilder modifies the same buffer, making it much faster in loops.',
      romanUrduExplanation: 'String + operation har baar naya object banata hai. StringBuilder same buffer modify karta hai, isliye faster hai.',
      difficulty: 'medium', topicTags: ['string-builder', 'performance'], xpReward: 30, moduleId: 'module-07',
    },
    {
      id: 'm07-quiz-007', type: 'mcq',
      question: 'What does "hello".substring(1, 4) return?',
      options: ['hel', 'ell', 'ello', 'hell'],
      correctAnswer: 'ell',
      explanation: 'substring(1, 4) returns characters from index 1 to 3 (exclusive of 4). So "hello"[1..3] = "ell".',
      romanUrduExplanation: 'substring(1, 4) index 1 se 3 tak ke characters return karta hai (4 exclusive). "hello"[1..3] = "ell".',
      difficulty: 'easy', topicTags: ['strings', 'methods'], xpReward: 25, moduleId: 'module-07',
    },
    {
      id: 'm07-quiz-008', type: 'mcq',
      question: 'What is the output of: String s = "Java" + " " + "Programming"; System.out.println(s.length());',
      options: ['14', '15', '16', 'Compilation error'],
      correctAnswer: '15',
      explanation: '"Java" + " " + "Programming" = "Java Programming" which has 15 characters (including the space).',
      romanUrduExplanation: '"Java" + " " + "Programming" = "Java Programming" jisme 15 characters hain (space included).',
      difficulty: 'easy', topicTags: ['strings', 'concatenation'], xpReward: 25, moduleId: 'module-07',
    },
    {
      id: 'm07-quiz-009', type: 'mcq',
      question: 'What does the intern() method do on a String?',
      options: [
        'Converts to StringBuilder',
        'Returns canonical representation from string pool',
        'Makes string mutable',
        'Removes whitespace',
      ],
      correctAnswer: 'Returns canonical representation from string pool',
      explanation: 'intern() checks if the string exists in the string pool. If yes, returns that reference. If no, adds it to pool and returns the reference.',
      romanUrduExplanation: 'intern() check karta hai string pool mein string hai. Agar hai toh wahi reference return karta hai, nahi toh add karta hai.',
      difficulty: 'hard', topicTags: ['strings', 'intern', 'string-pool'], xpReward: 35, moduleId: 'module-07',
    },
    {
      id: 'm07-quiz-010', type: 'true-false',
      question: 'String implements the CharSequence interface in Java.',
      correctAnswer: 'True',
      explanation: 'String implements CharSequence, which defines methods like length(), charAt(), subSequence() for readable sequences of char values.',
      romanUrduExplanation: 'String CharSequence interface implement karta hai jo length(), charAt(), subSequence() define karta hai.',
      difficulty: 'medium', topicTags: ['strings', 'interfaces'], xpReward: 25, moduleId: 'module-07',
    },
  ],
  scenarios: [
    {
      id: 'm07-sq-001', title: 'Password Storage Security',
      scenario: 'You are building a login system. Passwords should never be stored as plain strings in memory longer than necessary. An attacker with heap dump access could find password strings.',
      question: 'Why is storing passwords as StringBuilder better than String?',
      type: 'design-decision',
      options: [
        'StringBuilder is encrypted by default',
        'StringBuilder is mutable, so you can clear the password from memory by setting characters to 0',
        'StringBuilder is faster to compare',
        'StringBuilder uses less memory',
      ],
      correctAnswer: 'StringBuilder is mutable, so you can clear the password from memory by setting characters to 0',
      explanation: 'String is immutable - once created, it stays in memory until GC. StringBuilder\'s char array can be overwritten, clearing sensitive data from memory.',
      romanUrduExplanation: 'String immutable hai - ek baar ban gaya toh GC tak memory mein rehta hai. StringBuilder ki char array overwrite ho sakti hai.',
      relatedConcepts: ['immutability', 'security', 'memory'], difficulty: 'hard',
    },
    {
      id: 'm07-sq-002', title: 'SQL Injection Prevention',
      scenario: 'A developer is building a database query: "SELECT * FROM users WHERE name = \'" + userName + "\'". User input is directly concatenated into the SQL string.',
      question: 'What is the primary security risk and how does String immutability relate?',
      type: 'debugging',
      options: [
        'SQL injection - immutability is irrelevant',
        'SQL injection - using StringBuilder with parameterized queries prevents this',
        'Null pointer exception',
        'Memory leak',
      ],
      correctAnswer: 'SQL injection - using StringBuilder with parameterized queries prevents this',
      explanation: 'String concatenation in queries enables SQL injection. PreparedStatement with parameterized queries uses StringBuilder internally to safely construct queries.',
      romanUrduExplanation: 'String concatenation SQL injection enable karti hai. PreparedStatement parameterized queries safely queries construct karta hai.',
      relatedConcepts: ['security', 'sql-injection', 'string-builder'], difficulty: 'hard',
    },
    {
      id: 'm07-sq-003', title: 'Performance Optimization',
      scenario: 'You need to read a 10MB text file line by line and build a single output string. Using String concatenation takes 45 seconds.',
      question: 'What should you use and why?',
      type: 'design-decision',
      options: [
        'String concatenation - it is simplest',
        'StringBuilder - mutable buffer avoids creating millions of temporary String objects',
        'StringBuffer - always better than StringBuilder',
        'char array - manual approach',
      ],
      correctAnswer: 'StringBuilder - mutable buffer avoids creating millions of temporary String objects',
      explanation: 'Each + on String creates a new object. For 10MB of lines, this creates millions of temporary objects. StringBuilder appends to a single resizable buffer.',
      romanUrduExplanation: 'String par + har baar naya object banata hai. StringBuilder ek single resizable buffer mein append karta hai.',
      relatedConcepts: ['performance', 'string-builder', 'memory'], difficulty: 'medium',
    },
  ],
  outputs: [
    {
      id: 'm07-oq-001', lessonId: 'lesson-07-01',
      code: `public class Main {
    public static void main(String[] args) {
        String s1 = "Hello";
        String s2 = "Hello";
        String s3 = new String("Hello");
        System.out.println(s1 == s2);
        System.out.println(s1 == s3);
        System.out.println(s1.equals(s3));
    }
}`,
      options: ['true, true, true', 'true, false, true', 'false, false, true', 'false, true, false'],
      correctOutput: 'true, false, true',
      explanation: 's1 and s2 share the same pool reference (true). s3 is a new heap object (false). equals() compares content (true).',
      romanUrduExplanation: 's1 aur s2 same pool reference share karte hain (true). s3 naya heap object hai (false). equals() content compare karta hai (true).',
      conceptTested: ['string-pool', 'references', 'equals'], difficulty: 'easy',
    },
    {
      id: 'm07-oq-002', lessonId: 'lesson-07-02',
      code: `public class Main {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("Hello");
        sb.append(" World");
        sb.insert(5, ",");
        sb.delete(5, 6);
        System.out.println(sb.toString());
    }
}`,
      options: ['Hello World', 'Hello, World', 'Hello World', 'Hello,World'],
      correctOutput: 'Hello World',
      explanation: 'After append: "Hello World". After insert(5,","): "Hello, World". After delete(5,6): removes "," at index 5, giving "Hello World".',
      romanUrduExplanation: 'Append ke baad: "Hello World". Insert(5,",") ke baad: "Hello, World". Delete(5,6) index 5 par "," hata deta hai.',
      conceptTested: ['string-builder', 'methods'], difficulty: 'medium',
    },
    {
      id: 'm07-oq-003', lessonId: 'lesson-07-01',
      code: `public class Main {
    public static void main(String[] args) {
        String s = "Programming";
        System.out.println(s.substring(0, 7));
        System.out.println(s.charAt(4));
        System.out.println(s.indexOf("gram"));
    }
}`,
      options: ['Program, r, 4', 'Program, g, 4', 'Programmi, r, 3', 'Program, g, 3'],
      correctOutput: 'Program, g, 4',
      explanation: 'substring(0,7) = "Program". charAt(4) = \'g\' (0:P,1:r,2:o,3:g,4:g). indexOf("gram") = 4 (starts at index 4).',
      romanUrduExplanation: 'substring(0,7) = "Program". charAt(4) = \'g\'. indexOf("gram") = 4.',
      conceptTested: ['string-methods', 'indexing'], difficulty: 'easy',
    },
  ],
  debugs: [
    {
      id: 'm07-dc-001', title: 'String Comparison Bug',
      description: 'Using == to compare string content always returns false for different String objects.',
      buggyCode: `public class UserValidator {
    public boolean validateName(String input) {
        String validName = new String("Admin");
        if (input == validName) {
            return true;
        }
        return false;
    }

    public static void main(String[] args) {
        UserValidator v = new UserValidator();
        System.out.println(v.validateName("Admin")); // prints false!
    }
}`,
      expectedBehavior: 'Should return true when input matches "Admin".',
      hints: ['Use equals() instead of == for string content comparison', 'String references from different sources are different objects', '== checks reference equality, not content equality'],
      solution: `public class UserValidator {
    public boolean validateName(String input) {
        String validName = "Admin";
        if (input != null && input.equals(validName)) {
            return true;
        }
        return false;
    }
}`,
      explanation: 'Always use equals() for string content comparison. Also add null checks to prevent NullPointerException.',
      romanUrduExplanation: 'String content compare karne ke liye hamesha equals() use karo. Null checks bhi add karo.',
      difficulty: 'easy', topicTags: ['strings', 'comparison', 'equals'], xpReward: 50,
      errorMessage: 'Validation always fails', errorType: 'logical', conceptTested: ['string-comparison', 'equals'],
    },
    {
      id: 'm07-dc-002', title: 'String Concatenation Memory Leak',
      description: 'Repeated String concatenation in a loop creates excessive garbage objects.',
      buggyCode: `public class ReportGenerator {
    public String generateReport(String[] items) {
        String result = "";
        for (int i = 0; i < items.length; i++) {
            result = result + items[i] + ", ";
        }
        return result;
    }
}`,
      expectedBehavior: 'Should efficiently build the report string without excessive memory allocation.',
      hints: ['Use StringBuilder instead of String for concatenation in loops', 'Each + creates a new String object', 'StringBuilder is mutable and reuses its buffer'],
      solution: `public class ReportGenerator {
    public String generateReport(String[] items) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < items.length; i++) {
            if (i > 0) sb.append(", ");
            sb.append(items[i]);
        }
        return sb.toString();
    }
}`,
      explanation: 'StringBuilder avoids creating temporary String objects. The buffer grows as needed, but reuses the same memory.',
      romanUrduExplanation: 'StringBuilder temporary String objects banane se bachata hai. Buffer grow hota hai lekin same memory reuse karta hai.',
      difficulty: 'medium', topicTags: ['string-builder', 'performance', 'memory'], xpReward: 60,
      errorMessage: 'OutOfMemoryError for large arrays', errorType: 'runtime', conceptTested: ['performance', 'string-builder'],
    },
  ],
  mistakes: [
    {
      id: 'm07-mq-001', title: 'Modifying String with charArray',
      code: `String s = "Hello";
s.charAt(0) = 'J'; // Won't compile!`,
      mistakeDescription: 'String is immutable - you cannot modify individual characters.',
      possibleMistakes: ['Assuming String is mutable', 'Not knowing charAt returns a value, not a reference', 'Forgetting String immutability'],
      correctMistake: 'Use StringBuilder or create a new String.',
      correction: `StringBuilder sb = new StringBuilder("Hello");
sb.setCharAt(0, 'J');
String result = sb.toString(); // "Jello"`,
      explanation: 'String is immutable. Use StringBuilder for character-level modifications, or create a new String with the desired content.',
      romanUrduExplanation: 'String immutable hai. Character level modifications ke liye StringBuilder use karo.',
      difficulty: 'easy', conceptTested: ['immutability', 'string-builder'],
    },
    {
      id: 'm07-mq-002', title: 'String Pool Confusion',
      code: `String s1 = "Hello";
String s2 = "Hello";
String s3 = new String("Hello");
String s4 = s3.intern();
System.out.println(s1 == s2); // true
System.out.println(s1 == s3); // false
System.out.println(s1 == s4); // ??`,
      mistakeDescription: 'Not understanding intern() returns the pool reference.',
      possibleMistakes: ['Thinking intern() creates a new object', 'Forgetting string pool optimization', 'Not understanding == on references'],
      correctMistake: 'intern() returns the canonical pool reference, so s1 == s4 is true.',
      correction: `System.out.println(s1 == s4); // true - s4 points to pool "Hello"`,
      explanation: 'intern() returns the reference from the string pool if it exists. So s4 points to the same object as s1 and s2.',
      romanUrduExplanation: 'intern() agar pool mein hai toh pool ka reference return karta hai. S4 same object ko point karta hai.',
      difficulty: 'medium', conceptTested: ['string-pool', 'intern', 'references'],
    },
  ],
  codeCompletions: [
    {
      id: 'm07-cc-001', lessonId: 'lesson-07-01',
      codeTemplate: `public class StringUtils {
    // TODO: Reverse a string using StringBuilder
    public static String reverse(String input) {
        ____________
    }
}`,
      blank: 'return new StringBuilder(input).reverse().toString();',
      acceptedAnswers: [
        'return new StringBuilder(input).reverse().toString();',
        'return new StringBuilder(input).reverse().toString()',
      ],
      explanation: 'StringBuilder has a built-in reverse() method that reverses the character sequence.',
      romanUrduExplanation: 'StringBuilder ka built-in reverse() method character sequence reverse karta hai.',
      hints: ['Use StringBuilder constructor with the input string', 'Call the reverse() method', 'Convert back to String with toString()'],
      difficulty: 'easy', conceptTested: ['string-builder', 'methods'],
    },
    {
      id: 'm07-cc-002', lessonId: 'lesson-07-02',
      codeTemplate: `public class WordCounter {
    // TODO: Count words in a string (split by space)
    public static int countWords(String sentence) {
        ____________
    }
}`,
      blank: 'if (sentence == null || sentence.trim().isEmpty()) return 0; return sentence.trim().split("\\\\s+").length;',
      acceptedAnswers: [
        'if (sentence == null || sentence.trim().isEmpty()) return 0; return sentence.trim().split("\\\\s+").length;',
        'if (sentence == null || sentence.trim().isEmpty()) return 0; return sentence.trim().split("\\\\s+").length',
        'return sentence.trim().split("\\\\s+").length;',
        'String[] words = sentence.trim().split("\\\\s+"); return words.length;',
      ],
      explanation: 'trim() removes leading/trailing spaces. split("\\\\s+") splits by one or more whitespace characters.',
      romanUrduExplanation: 'trim() leading/trailing spaces hatata hai. split("\\\\s+") ek ya zyada whitespace se split karta hai.',
      hints: ['Handle null and empty string first', 'Use trim() to remove leading/trailing spaces', 'Use split("\\\\s+") to split by whitespace'],
      difficulty: 'medium', conceptTested: ['strings', 'split', 'methods'],
    },
  ],
};
