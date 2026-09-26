import type { QuizQuestion, ScenarioQuestion, OutputQuestion, DebugChallenge, MistakeQuestion, CodeCompletionQuestion } from '@/types';

export const module15Questions: {
  quickChecks: QuizQuestion[];
  scenarios: ScenarioQuestion[];
  outputs: OutputQuestion[];
  debugs: DebugChallenge[];
  mistakes: MistakeQuestion[];
  codeCompletions: CodeCompletionQuestion[];
} = {
  quickChecks: [
    {
      id: 'm15-quiz-001', type: 'mcq', question: 'What are generics in Java?',
      options: ['General purpose classes', 'Type parameterization that allows writing type-safe reusable code', 'A type of inheritance', 'A loop construct'],
      correctAnswer: 'Type parameterization that allows writing type-safe reusable code',
      explanation: 'Generics allow classes, interfaces, and methods to operate on parameterized types. They provide compile-time type safety and eliminate casting.',
      romanUrduExplanation: 'Generics classes, interfaces, aur methods ko parameterized types par operate karne dete hain. Compile-time type safety provide karte hain aur casting eliminate karte hain.',
      difficulty: 'easy', topicTags: ['generics', 'type-safety'], xpReward: 25, moduleId: 'module-15',
    },
    {
      id: 'm15-quiz-002', type: 'mcq', question: 'What is the benefit of using List<String> instead of raw List?',
      options: ['No benefit', 'Compile-time type safety - cannot add Integer to List<String>', 'Runtime performance improvement', 'Less memory usage'],
      correctAnswer: 'Compile-time type safety - cannot add Integer to List<String>',
      explanation: 'Generics provide compile-time type checking. If you try to add wrong type, compiler catches the error before runtime.',
      romanUrduExplanation: 'Generics compile-time type checking provide karte hain. Agar galat type add karne ki koshish karo, compiler runtime se pehle error pakad leta hai.',
      difficulty: 'easy', topicTags: ['generics', 'type-safety'], xpReward: 25, moduleId: 'module-15',
    },
    {
      id: 'm15-quiz-003', type: 'mcq', question: 'What does ? extends T mean in generics?',
      options: ['T is optional', 'Upper bounded wildcard - accepts T or any subclass of T', 'Lower bounded wildcard', 'Wild card means no type checking'],
      correctAnswer: 'Upper bounded wildcard - accepts T or any subclass of T',
      explanation: '? extends T is an upper bounded wildcard. It accepts T or any subclass of T. Used for reading from a generic type (covariance).',
      romanUrduExplanation: '? extends T upper bounded wildcard hai. Ye T ya T ka koi bhi subclass accept karta hai. Generic type se padhne ke liye use hota hai.',
      difficulty: 'hard', topicTags: ['generics', 'wildcards', 'extends'], xpReward: 35, moduleId: 'module-15',
    },
    {
      id: 'm15-quiz-004', type: 'mcq', question: 'What does ? super T mean in generics?',
      options: ['T is required', 'Lower bounded wildcard - accepts T or any superclass of T', 'Upper bounded wildcard', 'No type checking'],
      correctAnswer: 'Lower bounded wildcard - accepts T or any superclass of T',
      explanation: '? super T is a lower bounded wildcard. It accepts T or any superclass of T. Used for writing to a generic type (contravariance).',
      romanUrduExplanation: '? super T lower bounded wildcard hai. Ye T ya T ka koi bhi superclass accept karta hai. Generic type mein likhne ke liye use hota hai.',
      difficulty: 'hard', topicTags: ['generics', 'wildcards', 'super'], xpReward: 35, moduleId: 'module-15',
    },
    {
      id: 'm15-quiz-005', type: 'mcq', question: 'What is type erasure in Java generics?',
      options: ['Deleting type information', 'Generic type parameters are replaced with Object (or bound type) at compile time', 'Removing unused types', 'A memory optimization'],
      correctAnswer: 'Generic type parameters are replaced with Object (or bound type) at compile time',
      explanation: 'Java erases generic type information at compile time for backward compatibility. List<String> becomes List<Object> at runtime.',
      romanUrduExplanation: 'Java backward compatibility ke liye compile time par generic type information erase karta hai. List<String> runtime par List<Object> ban jata hai.',
      difficulty: 'hard', topicTags: ['generics', 'type-erasure'], xpReward: 35, moduleId: 'module-15',
    },
    {
      id: 'm15-quiz-006', type: 'true-false', question: 'You cannot create an instance of a generic type with new T().',
      correctAnswer: 'True',
      explanation: 'Due to type erasure, T is replaced with Object at runtime. You cannot do new T() because T is unknown at runtime. Use factory methods or pass Class<T> instead.',
      romanUrduExplanation: 'Type erasure ki wajah se T runtime par Object replace ho jata hai. new T() nahi kar sakte kyunki T runtime par unknown hota hai.',
      difficulty: 'medium', topicTags: ['generics', 'type-erasure', 'limitations'], xpReward: 25, moduleId: 'module-15',
    },
    {
      id: 'm15-quiz-007', type: 'mcq', question: 'What is a bounded type parameter?',
      options: ['A type with no bounds', 'A type parameter with an upper bound using extends keyword', 'A type that can be null', 'A type that extends Object only'],
      correctAnswer: 'A type parameter with an upper bound using extends keyword',
      explanation: 'Bounded type parameter: <T extends Number> means T must be Number or its subclass. This enables calling Number methods on T.',
      romanUrduExplanation: 'Bounded type parameter: <T extends Number> ka matlab T Number ya uska subclass hona chahiye. Ye T par Number methods call karne enable karta hai.',
      difficulty: 'medium', topicTags: ['generics', 'bounded-types'], xpReward: 30, moduleId: 'module-15',
    },
    {
      id: 'm15-quiz-008', type: 'mcq', question: 'Can you use primitives with generics?',
      options: ['Yes, always', 'No, generics only work with reference types (Integer, not int)', 'Only with List', 'Only with Map'],
      correctAnswer: 'No, generics only work with reference types (Integer, not int)',
      explanation: 'Generics require reference types. Use Integer instead of int, Double instead of double. Autoboxing handles conversion automatically.',
      romanUrduExplanation: 'Generics sirf reference types ke saath kaam karte hain. int ki jagah Integer, double ki jagah Double use karo. Autoboxing conversion automatically handle karta hai.',
      difficulty: 'medium', topicTags: ['generics', 'primitives', 'autoboxing'], xpReward: 30, moduleId: 'module-15',
    },
    {
      id: 'm15-quiz-009', type: 'mcq', question: 'What is the diamond operator <> in Java 7+?',
      options: ['A decoration', 'Infers generic type arguments from context, reducing verbosity', 'A comparison operator', 'A new type of generic'],
      correctAnswer: 'Infers generic type arguments from context, reducing verbosity',
      explanation: 'Diamond operator (new ArrayList<>()) infers type from the left side. Compiler figures out the type automatically.',
      romanUrduExplanation: 'Diamond operator (new ArrayList<>()) left side se type infer karta hai. Compiler automatically type figure out karta hai.',
      difficulty: 'easy', topicTags: ['generics', 'diamond-operator', 'java-7'], xpReward: 25, moduleId: 'module-15',
    },
    {
      id: 'm15-quiz-010', type: 'mcq', question: 'What is the PECS principle?',
      options: ['A coding standard', 'Producer Extends, Consumer Super - guidelines for wildcard usage', 'A testing principle', 'A variable naming convention'],
      correctAnswer: 'Producer Extends, Consumer Super - guidelines for wildcard usage',
      explanation: 'PECS: Use ? extends T when producing/reading data (Producer Extends). Use ? super T when consuming/writing data (Consumer Super).',
      romanUrduExplanation: 'PECS: Jab data produce/padho (? extends T - Producer Extends). Jab data consume/likho (? super T - Consumer Super).',
      difficulty: 'hard', topicTags: ['generics', 'pecs', 'wildcards'], xpReward: 35, moduleId: 'module-15',
    },
  ],
  scenarios: [
    {
      id: 'm15-sq-001', title: 'Type-Safe Repository',
      scenario: 'You are building a generic Repository<T> interface for database operations. It should work with any entity type while maintaining type safety.',
      question: 'How should you define the interface?',
      type: 'design-decision',
      options: [
        'Use raw Repository without type parameters',
        'Define Repository<T> with T extends BaseEntity for type safety',
        'Use Object as the type for everything',
        'Create separate interfaces for each entity',
      ],
      correctAnswer: 'Define Repository<T> with T extends BaseEntity for type safety',
      explanation: 'Generic Repository<T extends BaseEntity> ensures type safety and shared behavior. T must be a BaseEntity subclass, enabling common methods.',
      romanUrduExplanation: 'Generic Repository<T extends BaseEntity> type safety aur shared behavior ensure karta hai. T BaseEntity ka subclass hona chahiye.',
      relatedConcepts: ['generics', 'bounded-types', 'type-safety'], difficulty: 'medium',
    },
  ],
  outputs: [
    {
      id: 'm15-oq-001', lessonId: 'lesson-15-01',
      code: `import java.util.*;

public class Main {
    public static <T extends Comparable<T>> T findMax(List<T> list) {
        T max = list.get(0);
        for (T item : list) {
            if (item.compareTo(max) > 0) {
                max = item;
            }
        }
        return max;
    }

    public static void main(String[] args) {
        List<Integer> nums = Arrays.asList(3, 1, 4, 1, 5, 9);
        System.out.println(findMax(nums));
        List<String> words = Arrays.asList("banana", "apple", "cherry");
        System.out.println(findMax(words));
    }
}`,
      options: ['9, cherry', '9, banana', '5, cherry', 'Compilation error'],
      correctOutput: '9, cherry',
      explanation: 'findMax uses bounded generics. For Integer: 9 is max. For String: "cherry" > "banana" > "apple" alphabetically.',
      romanUrduExplanation: 'findMax bounded generics use karta hai. Integer ke liye: 9 max hai. String ke liye: "cherry" > "banana" > "apple" alphabetically.',
      conceptTested: ['generics', 'bounded-types', 'comparable'], difficulty: 'medium',
    },
  ],
  debugs: [
    {
      id: 'm15-dc-001', title: 'Generic Type Safety Violation',
      description: 'Raw type usage bypasses generic type safety, causing ClassCastException at runtime.',
      buggyCode: `import java.util.*;

public class UnsafeCode {
    public static void main(String[] args) {
        List list = new ArrayList(); // Raw type!
        list.add("Hello");
        list.add(42); // No compile error, but dangerous

        // Later...
        for (Object obj : list) {
            String s = (String) obj; // ClassCastException on Integer!
        }
    }
}`,
      expectedBehavior: 'Should have compile-time type safety preventing Integer from being added to a String list.',
      hints: ['Use parameterized types (generics)', 'Change List to List<String>', 'This prevents wrong types at compile time'],
      solution: `import java.util.*;

public class SafeCode {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(); // Parameterized!
        list.add("Hello");
        // list.add(42); // Compilation error - type safe!

        for (String s : list) {
            System.out.println(s);
        }
    }
}`,
      explanation: 'Always use parameterized types. List<String> prevents adding non-String objects at compile time.',
      romanUrduExplanation: 'Hamesha parameterized types use karo. List<String> compile time par non-String objects add karne se rokta hai.',
      difficulty: 'medium', topicTags: ['generics', 'type-safety', 'raw-types'], xpReward: 60,
      errorMessage: 'ClassCastException at runtime', errorType: 'runtime', conceptTested: ['generics', 'type-safety'],
    },
  ],
  mistakes: [
    {
      id: 'm15-mq-001', title: 'Using instanceof with Generic Types',
      code: `List<String> strings = new ArrayList<>();
if (strings instanceof List<String>) { // Compilation error!
    // ...
}`,
      mistakeDescription: 'Due to type erasure, you cannot use instanceof with parameterized types.',
      possibleMistakes: ['Trying instanceof with generics', 'Not knowing type erasure limitations', 'Checking generic type at runtime'],
      correctMistake: 'Use instanceof with raw type or check the type parameter separately.',
      correction: `List<String> strings = new ArrayList<>();
if (strings instanceof List) { // Raw type check works
    // ...
}`,
      explanation: 'Type erasure removes generic type information at runtime. instanceof cannot check generic types. Use raw type instead.',
      romanUrduExplanation: 'Type erasure runtime par generic type information hata deta hai. instanceof generic types check nahi kar sakta. Raw type use karo.',
      difficulty: 'medium', conceptTested: ['generics', 'type-erasure', 'instanceof'],
    },
  ],
  codeCompletions: [
    {
      id: 'm15-cc-001', lessonId: 'lesson-15-01',
      codeTemplate: `// TODO: Create a generic Pair class with two type parameters
public class Pair<T, U> {
    // Add fields, constructor, and getters
    ____________
}`,
      blank: 'private T first; private U second; public Pair(T first, U second) { this.first = first; this.second = second; } public T getFirst() { return first; } public U getSecond() { return second; }',
      acceptedAnswers: [
        'private T first; private U second; public Pair(T first, U second) { this.first = first; this.second = second; } public T getFirst() { return first; } public U getSecond() { return second; }',
      ],
      explanation: 'Generic class with two type parameters T and U. Each field uses its respective type parameter.',
      romanUrduExplanation: 'Generic class do type parameters T aur U ke saath. Har field apna type parameter use karta hai.',
      hints: ['Declare fields with type parameters T and U', 'Constructor takes both parameters', 'Getters return the correct types'],
      difficulty: 'medium', conceptTested: ['generics', 'generic-class'],
    },
  ],
};
