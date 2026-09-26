import type { QuizQuestion, ScenarioQuestion, OutputQuestion, DebugChallenge, MistakeQuestion, CodeCompletionQuestion } from '@/types';

export const module12Questions: {
  quickChecks: QuizQuestion[];
  scenarios: ScenarioQuestion[];
  outputs: OutputQuestion[];
  debugs: DebugChallenge[];
  mistakes: MistakeQuestion[];
  codeCompletions: CodeCompletionQuestion[];
} = {
  quickChecks: [
    {
      id: 'm12-quiz-001', type: 'mcq', question: 'What is the difference between ArrayList and LinkedList?',
      options: ['No difference', 'ArrayList uses array (fast random access), LinkedList uses nodes (fast insertion/deletion)', 'ArrayList is older', 'LinkedList is always faster'],
      correctAnswer: 'ArrayList uses array (fast random access), LinkedList uses nodes (fast insertion/deletion)',
      explanation: 'ArrayList: O(1) get/set, O(n) add/remove at middle. LinkedList: O(1) add/remove at ends, O(n) get/set. Choose based on operation frequency.',
      romanUrduExplanation: 'ArrayList: O(1) get/set, O(n) middle mein add/remove. LinkedList: O(1) ends par add/remove, O(n) get/set.',
      difficulty: 'medium', topicTags: ['arraylist', 'linkedlist', 'collections'], xpReward: 30, moduleId: 'module-12',
    },
    {
      id: 'm12-quiz-002', type: 'mcq', question: 'What is the ArrayList default capacity?',
      options: ['0', '5', '10', '16'],
      correctAnswer: '10',
      explanation: 'ArrayList starts with default capacity of 10. When full, it grows by 50% (new capacity = old * 1.5). This is called dynamic resizing.',
      romanUrduExplanation: 'ArrayList default capacity 10 se start hota hai. Jab full hota hai toh 50% badhta hai. Isse dynamic resizing kehte hain.',
      difficulty: 'easy', topicTags: ['arraylist', 'capacity', 'dynamic-resizing'], xpReward: 25, moduleId: 'module-12',
    },
    {
      id: 'm12-quiz-003', type: 'mcq', question: 'What is a HashMap in Java?',
      options: ['An ordered collection', 'A collection of key-value pairs with O(1) average lookup', 'A sorted collection', 'A collection that only stores unique values'],
      correctAnswer: 'A collection of key-value pairs with O(1) average lookup',
      explanation: 'HashMap stores key-value pairs. Keys must be unique. Average O(1) for get/put. Uses hashing to compute bucket index.',
      romanUrduExplanation: 'HashMap key-value pairs store karta hai. Keys unique honi chahiye. Average O(1) for get/put. Hashing use karta hai bucket index compute karne ke liye.',
      difficulty: 'easy', topicTags: ['hashmap', 'key-value', 'hashing'], xpReward: 25, moduleId: 'module-12',
    },
    {
      id: 'm12-quiz-004', type: 'mcq', question: 'What interface should you implement to make a class iterable?',
      options: ['Serializable', 'Cloneable', 'Iterable<T>', 'Comparable<T>'],
      correctAnswer: 'Iterable<T>',
      explanation: 'Iterable<T> requires implementing iterator() method, returning Iterator<T>. This enables for-each loop support.',
      romanUrduExplanation: 'Iterable<T> iterator() method implement karne mangta hai jo Iterator<T> return karta hai. Ye for-each loop support enable karta hai.',
      difficulty: 'medium', topicTags: ['iterable', 'iterator', 'for-each'], xpReward: 30, moduleId: 'module-12',
    },
    {
      id: 'm12-quiz-005', type: 'mcq', question: 'What is the difference between HashSet and TreeSet?',
      options: ['No difference', 'HashSet is unordered (O(1)), TreeSet is sorted (O(log n))', 'TreeSet is faster', 'HashSet allows duplicates'],
      correctAnswer: 'HashSet is unordered (O(1)), TreeSet is sorted (O(log n))',
      explanation: 'HashSet uses hashing for O(1) operations but no ordering. TreeSet uses Red-Black tree for O(log n) operations but keeps elements sorted.',
      romanUrduExplanation: 'HashSet O(1) operations ke liye hashing use karta hai lekin ordering nahi. TreeSet O(log n) operations ke liye Red-Black tree use karta hai aur elements sorted rakhta hai.',
      difficulty: 'medium', topicTags: ['hashset', 'treeset', 'sets'], xpReward: 30, moduleId: 'module-12',
    },
    {
      id: 'm12-quiz-006', type: 'true-false', question: 'HashMap allows null keys.',
      correctAnswer: 'True',
      explanation: 'HashMap allows one null key and multiple null values. TreeMap does NOT allow null keys. Hashtable does NOT allow null keys or values.',
      romanUrduExplanation: 'HashMap ek null key aur multiple null values allow karta hai. TreeMap null key allow nahi karta. Hashtable null key ya value allow nahi karta.',
      difficulty: 'medium', topicTags: ['hashmap', 'null-keys'], xpReward: 25, moduleId: 'module-12',
    },
    {
      id: 'm12-quiz-007', type: 'mcq', question: 'What is a Queue in Java?',
      options: ['A LIFO collection', 'A FIFO collection for processing elements in order', 'A sorted collection', 'A collection of unique elements'],
      correctAnswer: 'A FIFO collection for processing elements in order',
      explanation: 'Queue follows First-In-First-Out (FIFO) order. Elements are added at the end (offer) and removed from the front (poll).',
      romanUrduExplanation: 'Queue First-In-First-Out (FIFO) order follow karta hai. Elements end par add (offer) aur front se remove (poll) hote hain.',
      difficulty: 'easy', topicTags: ['queue', 'fifo', 'collections'], xpReward: 25, moduleId: 'module-12',
    },
    {
      id: 'm12-quiz-008', type: 'mcq', question: 'What is the Collections utility class used for?',
      options: ['Creating new collections', 'Providing static methods for collection operations (sort, shuffle, reverse)', 'Storing data permanently', 'Managing database connections'],
      correctAnswer: 'Providing static methods for collection operations (sort, shuffle, reverse)',
      explanation: 'Collections class provides utility methods: sort(), shuffle(), reverse(), unmodifiableList(), synchronizedList(), etc.',
      romanUrduExplanation: 'Collections class utility methods provide karta hai: sort(), shuffle(), reverse(), unmodifiableList(), synchronizedList(), etc.',
      difficulty: 'easy', topicTags: ['collections-utility', 'utility-methods'], xpReward: 25, moduleId: 'module-12',
    },
    {
      id: 'm12-quiz-009', type: 'mcq', question: 'What is a Stack in Java?',
      options: ['A FIFO collection', 'A LIFO collection (Last In, First Out)', 'A sorted collection', 'A collection of collections'],
      correctAnswer: 'A LIFO collection (Last In, First Out)',
      explanation: 'Stack extends Vector and represents LIFO. push() adds to top, pop() removes from top, peek() views top. Generally, Deque is preferred over Stack.',
      romanUrduExplanation: 'Stack Vector se extend hota hai aur LIFO represent karta hai. push() top par add, pop() top se remove, peek() top dekhta hai.',
      difficulty: 'easy', topicTags: ['stack', 'lifo', 'collections'], xpReward: 25, moduleId: 'module-12',
    },
    {
      id: 'm12-quiz-010', type: 'mcq', question: 'What happens when HashMap key hash codes are all the same?',
      options: ['Performance improves', 'All entries go to same bucket (collision), degrading to O(n)', 'HashMap throws an error', 'Null pointer exception'],
      correctAnswer: 'All entries go to same bucket (collision), degrading to O(n)',
      explanation: 'Poor hash functions cause collisions. All entries end up in same bucket, and lookup degrades from O(1) to O(n) as it linearly searches.',
      romanUrduExplanation: 'Kharab hash functions collisions cause karte hain. Saare entries same bucket mein jaate hain aur lookup O(1) se O(n) tak degrade hota hai.',
      difficulty: 'hard', topicTags: ['hashmap', 'collision', 'performance'], xpReward: 35, moduleId: 'module-12',
    },
  ],
  scenarios: [
    {
      id: 'm12-sq-001', title: 'Student Grade Tracker',
      scenario: 'You need to store 10,000 student records with fast lookup by student ID. You also need to list all students sorted by name.',
      question: 'Which collections should you use?',
      type: 'design-decision',
      options: [
        'ArrayList for both storage and display',
        'HashMap<String, Student> for fast lookup + TreeMap for sorted display',
        'LinkedList for everything',
        'HashSet for unique students',
      ],
      correctAnswer: 'HashMap<String, Student> for fast lookup + TreeMap for sorted display',
      explanation: 'HashMap provides O(1) lookup by ID. TreeMap keeps entries sorted by key (name) for display. Use two collections for different access patterns.',
      romanUrduExplanation: 'HashMap O(1) ID se lookup provide karta hai. TreeMap key (name) se entries sorted rakhta hai display ke liye.',
      relatedConcepts: ['hashmap', 'treemap', 'performance'], difficulty: 'medium',
    },
  ],
  outputs: [
    {
      id: 'm12-oq-001', lessonId: 'lesson-12-01',
      code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("Banana");
        list.add("Apple");
        list.add("Cherry");
        Collections.sort(list);
        System.out.println(list);
    }
}`,
      options: ['[Banana, Apple, Cherry]', '[Apple, Banana, Cherry]', '[Cherry, Banana, Apple]', 'Compilation error'],
      correctOutput: '[Apple, Banana, Cherry]',
      explanation: 'Collections.sort() sorts ArrayList alphabetically by default. "Apple" < "Banana" < "Cherry".',
      romanUrduExplanation: 'Collections.sort() ArrayList ko alphabetically sort karta hai. "Apple" < "Banana" < "Cherry".',
      conceptTested: ['arraylist', 'collections-sort'], difficulty: 'easy',
    },
    {
      id: 'm12-oq-002', lessonId: 'lesson-12-02',
      code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        map.put("Ali", 90);
        map.put("Sara", 85);
        map.put("Ali", 95);
        System.out.println(map);
        System.out.println(map.get("Ali"));
    }
}`,
      options: ['{Ali=90, Sara=85}, 90', '{Ali=95, Sara=85}, 95', '{Ali=90, Ali=95, Sara=85}, 95', 'Compilation error'],
      correctOutput: '{Ali=95, Sara=85}, 95',
      explanation: 'put() with duplicate key overwrites the old value. Ali=90 is replaced by Ali=95. get("Ali") returns 95.',
      romanUrduExplanation: 'put() duplicate key se purani value overwrite karta hai. Ali=90 ko Ali=95 replace karta hai. get("Ali") 95 return karta hai.',
      conceptTested: ['hashmap', 'put-overwrite'], difficulty: 'easy',
    },
  ],
  debugs: [
    {
      id: 'm12-dc-001', title: 'ConcurrentModificationException',
      description: 'Modifying a collection while iterating causes ConcurrentModificationException.',
      buggyCode: `import java.util.*;

public class ItemProcessor {
    public void removeExpiredItems(List<String> items) {
        for (String item : items) {
            if (item.startsWith("expired_")) {
                items.remove(item); // ConcurrentModificationException!
            }
        }
    }
}`,
      expectedBehavior: 'Should safely remove expired items without exception.',
      hints: ['For-each loop uses an internal Iterator', 'Use Iterator.remove() instead', 'Or use removeIf() method (Java 8+)'],
      solution: `import java.util.*;

public class ItemProcessor {
    public void removeExpiredItems(List<String> items) {
        items.removeIf(item -> item.startsWith("expired_"));
    }
}`,
      explanation: 'Never modify a collection during for-each iteration. Use Iterator.remove() or removeIf() (Java 8+) for safe removal.',
      romanUrduExplanation: 'For-each iteration ke dauran collection modify mat karo. Safe removal ke liye Iterator.remove() ya removeIf() (Java 8+) use karo.',
      difficulty: 'medium', topicTags: ['concurrent-modification', 'iterator', 'collections'], xpReward: 60,
      errorMessage: 'ConcurrentModificationException', errorType: 'runtime', conceptTested: ['concurrent-modification', 'collections'],
    },
  ],
  mistakes: [
    {
      id: 'm12-mq-001', title: 'Using Raw Types',
      code: `ArrayList list = new ArrayList(); // Raw type!
list.add("Hello");
list.add(42); // No compile error, but dangerous
String s = (String) list.get(1); // ClassCastException at runtime!`,
      mistakeDescription: 'Raw types bypass generic type safety.',
      possibleMistakes: ['Not using generics', 'Mixing types in raw collections', 'Relying on casting instead of type safety'],
      correctMistake: 'Always use parameterized types (generics) for type safety.',
      correction: `ArrayList<String> list = new ArrayList<>(); // Parameterized type
list.add("Hello");
// list.add(42); // Compilation error - type safe!`,
      explanation: 'Raw types bypass compile-time type checking. Use parameterized types (ArrayList<String>) for type safety.',
      romanUrduExplanation: 'Raw types compile-time type checking bypass karte hain. Type safety ke liye parameterized types (ArrayList<String>) use karo.',
      difficulty: 'easy', conceptTested: ['generics', 'type-safety', 'raw-types'],
    },
  ],
  codeCompletions: [
    {
      id: 'm12-cc-001', lessonId: 'lesson-12-01',
      codeTemplate: `import java.util.*;

public class UniqueWords {
    // TODO: Return set of unique words from array
    public static Set<String> getUniqueWords(String[] words) {
        ____________
    }
}`,
      blank: 'Set<String> unique = new HashSet<>(); for (String w : words) unique.add(w.toLowerCase()); return unique;',
      acceptedAnswers: [
        'Set<String> unique = new HashSet<>(); for (String w : words) unique.add(w.toLowerCase()); return unique;',
        'return new HashSet<>(Arrays.asList(words));',
        'Set<String> unique = new HashSet<>(); Collections.addAll(unique, words); return unique;',
      ],
      explanation: 'HashSet automatically handles uniqueness. Adding duplicate elements simply returns false without storing duplicates.',
      romanUrduExplanation: 'HashSet automatically uniqueness handle karta hai. Duplicate elements add karne par false return hota hai bina store kiye.',
      hints: ['Use HashSet for unique elements', 'Convert to lowercase for case-insensitive uniqueness', 'Use for-each to add elements'],
      difficulty: 'easy', conceptTested: ['hashset', 'generics', 'collections'],
    },
  ],
};
