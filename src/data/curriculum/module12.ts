import type { Module } from '@/types';

export const module12: Module = {
  id: 'module-12',
  title: 'OOP with Collections',
  slug: 'oop-with-collections',
  order: 12,
  description: 'Master Java Collections Framework and Generics. Learn to work with ArrayList, HashMap, TreeSet, LinkedList, and understand type safety through generics. Apply Comparable, Comparator, and Iterator patterns to manage groups of objects effectively.',
  icon: 'Layers',
  color: '#8b5cf6',
  xpReward: 650,
  isUnlocked: false,
  completed: false,
  progress: 0,
  totalDuration: 240,
  prerequisiteModuleIds: ['module-11'],
  lessons: [
    {
      id: 'lesson-12-01',
      moduleId: 'module-12',
      title: 'Introduction to Generics',
      slug: 'introduction-to-generics',
      order: 1,
      duration: 20,
      description: 'Understand type parameters, generic classes, and how generics provide compile-time type safety in Java.',
      learningObjectives: [
        { id: 'lo-12-01-1', description: 'Explain what generics are and why they exist', completed: false },
        { id: 'lo-12-01-2', description: 'Define type parameters in generic classes', completed: false },
        { id: 'lo-12-01-3', description: 'Create instances of generic classes with specific types', completed: false },
        { id: 'lo-12-01-4', description: 'Understand how generics prevent ClassCastException at compile time', completed: false },
      ],
      englishExplanation: {
        id: 'ee-12-01',
        text: `Generics allow you to define classes, interfaces, and methods with type parameters. Instead of writing separate code for String, Integer, and Double, you write one generic version that works with any type. This is one of the most powerful features introduced in Java 5.\n\nWithout generics, you would use Object references to store any type. This approach has a critical flaw: you lose type information. When you retrieve the object, you must cast it to the correct type, and if you cast incorrectly, the program crashes at runtime with a ClassCastException. Generics solve this by pushing type checking from runtime to compile time.\n\nA generic class is defined with a type parameter inside angle brackets. For example, \`class Box<T>\` defines a Box that holds a value of type T. T is a placeholder that gets replaced with an actual type like String or Integer when you create an instance: \`Box<String> box = new Box<>();\`. The compiler then ensures only String values can go into that box.\n\nType parameters are conventionally named with single uppercase letters: T (Type), E (Element), K (Key), V (Value), N (Number). These are not keywords; they are just naming conventions. You could use any valid identifier, but following conventions makes your code readable to other developers.\n\nGenerics provide compile-time type safety. If you try to add an Integer to a Box<String>, the compiler rejects it immediately. This eliminates the need for explicit casts when retrieving values and prevents ClassCastExceptions entirely.`
      },
      romanUrduExplanation: {
        id: 'ru-12-01',
        text: `Generics aapko classes, interfaces aur methods ko type parameters ke saath define karne dete hain. String, Integer aur Double ke liye alag-alag code likhne ki bajaye, aap ek generic version likhte hain jo kisi bhi type ke saath kaam kare. Ye Java 5 mein introduce ki gayi sabse powerful features mein se ek hai.\n\nGenerics ke bina, aap kisi bhi type store karne ke liye Object references use karte the. Is approach mein ek critical flaw hai: aap type information lose kar dete hain. Object retrieve karne par, aapko use sahi type mein cast karna padta hai, aur agar galat cast karein toh program runtime mein ClassCastException ke saath crash hota hai. Generics ye problem solve karte hain by compile time par type checking shift karke.\n\nGeneric class angle brackets mein type parameter ke saath define hoti hai. For example, \`class Box<T>\` ek Box define karta hai jo type T ka value rakhta hai. T ek placeholder hai ye actual type se replace hota hai jab aap instance create karte hain. Compiler phir ensure karta hai ke sirf String values us box mein ja sakti hain.\n\nType parameters conventionally single uppercase letters se name kiye jaate hain: T (Type), E (Element), K (Key), V (Value), N (Number). Ye keywords nahi hain sirf naming conventions hain. Aap koi bhi valid identifier use kar sakte hain, lekin conventions follow karna code ko doosre developers ke liye readable banata hai.\n\nGenerics compile-time type safety provide karte hain. Agar aap Box<String> mein Integer add karne ki koshish karein, toh compiler seedha reject kar deta hai. Ye values retrieve karne par explicit casts ki zaroorat khatam karta hai aur ClassCastExceptions ko bilkul prevent karta hai.`
      },
      keyPoints: [
        { id: 'kp-12-01-1', title: 'Type Parameter', description: 'A placeholder (like T, E, K, V) that represents an actual type when the generic class is instantiated.' },
        { id: 'kp-12-01-2', title: 'Compile-Time Safety', description: 'Generics shift type checking from runtime to compile time, preventing ClassCastException before the program runs.' },
        { id: 'kp-12-01-3', title: 'Diamond Operator', description: 'The <> syntax (introduced in Java 7) allows the compiler to infer the type parameter, avoiding repetition.' },
        { id: 'kp-12-01-4', title: 'Naming Conventions', description: 'T for Type, E for Element, K for Key, V for Value, N for Number. Use these consistently.' },
      ],
      codeExamples: [
        {
          id: 'ce-12-01-1',
          title: 'Generic Box Class',
          code: `public class Box<T> {
    private T content;

    public void set(T content) {
        this.content = content;
    }

    public T get() {
        return content;
    }

    public static void main(String[] args) {
        Box<String> stringBox = new Box<>();
        stringBox.set("Hello Generics");
        String value = stringBox.get();
        System.out.println(value);

        Box<Integer> intBox = new Box<>();
        intBox.set(42);
        int num = intBox.get();
        System.out.println(num);
    }
}`,
          language: 'java',
          output: `Hello Generics\n42`,
          explanation: 'Box<T> is a generic class. T is replaced with String when we create Box<String>, and with Integer when we create Box<Integer>. The compiler ensures only the correct type is used.',
        },
        {
          id: 'ce-12-01-2',
          title: 'Without Generics vs With Generics',
          code: `class OldBox {
    private Object content;
    public void set(Object content) { this.content = content; }
    public Object get() { return content; }
}

class NewBox<T> {
    private T content;
    public void set(T content) { this.content = content; }
    public T get() { return content; }
}

public class Comparison {
    public static void main(String[] args) {
        OldBox old = new OldBox();
        old.set("Hello");
        Integer num = (Integer) old.get(); // ClassCastException!

        NewBox<Integer> safe = new NewBox<>();
        safe.set(42);
        Integer result = safe.get();
        // safe.set("Hello"); // Compile error — type safety!
    }
}`,
          language: 'java',
          explanation: 'Without generics, the OldBox accepts any Object. The ClassCastException only happens at runtime. With NewBox<T>, the compiler catches type mismatches immediately.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-12-01-1',
          title: 'Generic Repository Pattern',
          scenario: 'In a banking application, you need separate repositories for Account, Customer, and Transaction. Each performs CRUD operations but on different entity types.',
          oopConcept: 'A generic Repository<T> class provides add, remove, findById methods that work with any entity type. AccountRepository extends Repository<Account>, CustomerRepository extends Repository<Customer>. This eliminates code duplication while maintaining type safety.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-12-01-1',
          title: 'Using Raw Types',
          incorrectCode: `Box box = new Box();\nbox.set("Hello");\nInteger num = (Integer) box.get(); // ClassCastException at runtime!`,
          correctCode: `Box<String> box = new Box<>();\nbox.set("Hello");\nString value = box.get(); // Safe, no cast needed`,
          explanation: 'Raw types bypass the generic type system, losing all compile-time safety benefits. Always use parameterized types like Box<String> instead of raw Box.',
        },
      ],
      examNotes: [
        { id: 'en-12-01-1', title: 'Generics Purpose', content: 'Generics provide compile-time type safety and eliminate explicit casting. Introduced in Java 5.', importance: 'high' },
        { id: 'en-12-01-2', title: 'Type Erasure', content: 'At runtime, generic type information is erased. The JVM only sees Object references. You cannot create arrays of generic types or use instanceof with generics.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-12-01-1', question: 'What problem do generics solve in Java?', answer: 'Generics eliminate the need for explicit type casting and prevent ClassCastException by enforcing type safety at compile time instead of runtime.', difficulty: 'easy' },
        { id: 'vq-12-01-2', question: 'What is type erasure?', answer: 'Type erasure is the process where the compiler removes all generic type information at compile time. At runtime, generic classes become non-generic, using Object or the upper bound type.', difficulty: 'hard' },
        { id: 'vq-12-01-3', question: 'What are common type parameter naming conventions?', answer: 'T for Type, E for Element (in collections), K for Key, V for Value, N for Number. These are conventions, not keywords.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-12-01-1', type: 'mcq', question: 'What does a generic type parameter represent?', options: ['A specific class name', 'A placeholder for an actual type', 'A variable name', 'A method return type'], correctAnswer: 'A placeholder for an actual type', explanation: 'Type parameters like T, E, K, V are placeholders that get replaced with actual types when the generic class is instantiated.' },
        { id: 'qc-12-01-2', type: 'true-false', question: 'Generics check types at runtime.', correctAnswer: 'False', explanation: 'Generics check types at compile time. Due to type erasure, generic type information is removed before runtime.' },
        { id: 'qc-12-01-3', type: 'mcq', question: 'What is the diamond operator?', options: ['<T>', '<>', '()', '[]'], correctAnswer: '<>', explanation: 'The diamond operator <> (Java 7+) allows the compiler to infer the type parameter, avoiding repetition.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-12-01-1',
          scenario: 'You are building a cache system that needs to store different types of data: user sessions, product catalogs, and configuration settings.',
          question: 'How should you design the Cache class to be type-safe and reusable?',
          type: 'design-decision',
          options: [
            'Create CacheObject with Object fields and cast when retrieving',
            'Create a generic Cache<K, V> class where K is the key type and V is the value type',
            'Create three separate cache classes for each data type',
            'Use HashMap without generics',
          ],
          correctAnswer: 'Create a generic Cache<K, V> class where K is the key type and V is the value type',
          explanation: 'A generic Cache<K, V> provides type safety and reusability. You can create Cache<String, Session>, Cache<Integer, Product>, etc., all from one class definition.',
          relatedConcepts: ['generics', 'type-safety', 'reusability'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-generics-intro',
      prerequisites: ['lesson-11-10'],
      xpReward: 60,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'generics',
      difficulty: 'easy',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-12-02',
      moduleId: 'module-12',
      title: 'Generic Classes and Methods',
      slug: 'generic-classes-and-methods',
      order: 2,
      duration: 25,
      description: 'Master bounded type parameters, wildcards, and understand type erasure in depth.',
      learningObjectives: [
        { id: 'lo-12-02-1', description: 'Use bounded type parameters (extends, super)', completed: false },
        { id: 'lo-12-02-2', description: 'Apply upper and lower bound wildcards', completed: false },
        { id: 'lo-12-02-3', description: 'Explain type erasure and its implications', completed: false },
        { id: 'lo-12-02-4', description: 'Write generic methods with independent type parameters', completed: false },
      ],
      englishExplanation: {
        id: 'ee-12-02',
        text: `Bounded type parameters restrict the types that can be used with a generic class. The \`extends\` keyword sets an upper bound: the type must be the specified class or a subclass of it. For example, \`<T extends Number>\` means T can be Integer, Double, Float, or any class that extends Number. This is useful when you need to call methods specific to a type hierarchy.\n\nThe \`super\` keyword sets a lower bound: the type must be the specified class or a superclass of it. This is primarily used with wildcards in method parameters.\n\nWildcards (?) are used in method parameters when you do not need to store the generic type. There are three forms:\n1. \`<?>\` unbounded wildcard accepts any type\n2. \`<? extends T>\` upper bound accepts T or any subclass of T (read-only)\n3. \`<? super T>\` lower bound accepts T or any superclass of T (write-only)\n\nThe PECS rule (Producer Extends, Consumer Super) guides wildcard usage: if a generic parameter produces values for you to read, use \`extends\`. If it consumes values you write into it, use \`super\`.\n\nType erasure is the process where the Java compiler removes all generic type information at compile time. A \`Box<String>\` and \`Box<Integer>\` both become just \`Box\` at runtime. This means you cannot use instanceof with generic types, you cannot create new T() or new T[], and generic classes share the same Class object at runtime.\n\nGeneric methods have their own type parameters, independent of the class. The syntax \`public <T> T findFirst(List<T> list)\` declares a method that works with any type T.`
      },
      romanUrduExplanation: {
        id: 'ru-12-02',
        text: `Bounded type parameters un types ko restrict karte hain jo generic class ke saath use ho sakti hain. \`extends\` keyword upper bound set karta hai type specified class ya uski subclass honi chahiye. For example, \`<T extends Number>\` ka matlab hai T Integer, Double, Float, ya Number se extend hone wali koi bhi class ho sakti hai.\n\n\`super\` keyword lower bound set karta hai type specified class ya uski superclass honi chahiye. Ye primarily wildcards ke saath method parameters mein use hota hai.\n\nWildcards (?) method parameters mein use hote hain jab aapko generic type store karne ki zaroorat nahi hoti. Teen forms hain:\n1. \`<?>\` unbounded wildcard koi bhi type accept karta hai\n2. \`<? extends T>\` upper bound T ya T ki koi bhi subclass accept karta hai (read-only)\n3. \`<? super T>\` lower bound T ya T ki koi bhi superclass accept karta hai (write-only)\n\nPECS rule (Producer Extends, Consumer Super) wildcard usage guide karta hai. Agar generic parameter values produce karta hai jo aap padhein, toh \`extends\` use karein. Agar values consume karta hai jo aap likhein, toh \`super\` use karein.\n\nType erasure wo process hai jisme Java compiler compile time par saari generic type information remove kar deta hai. \`Box<String>\` aur \`Box<Integer>\` runtime mein dono sirf \`Box\` ban jaate hain. Iska matlab hai aap generic types ke saath instanceof use nahi kar sakte, new T() ya new T[] nahi bana sakte.\n\nGeneric methods ke apne type parameters hote hain jo class se independent hain.`
      },
      keyPoints: [
        { id: 'kp-12-02-1', title: 'Upper Bound (extends)', description: 'Restricts T to the specified type or its subclasses. Enables calling methods from the bound type.' },
        { id: 'kp-12-02-2', title: 'Lower Bound (super)', description: 'Restricts T to the specified type or its superclasses. Primarily used for write operations in wildcards.' },
        { id: 'kp-12-02-3', title: 'PECS Rule', description: 'Producer Extends, Consumer Super. Use extends for read-only, super for write-only generic parameters.' },
        { id: 'kp-12-02-4', title: 'Type Erasure', description: 'Generic types are erased at compile time. Box<String> becomes Box at runtime. No generic-specific operations at runtime.' },
      ],
      codeExamples: [
        {
          id: 'ce-12-02-1',
          title: 'Bounded Type Parameters',
          code: `class Statistics<T extends Number> {
    private T[] numbers;

    public Statistics(T[] numbers) {
        this.numbers = numbers;
    }

    public double average() {
        double sum = 0;
        for (T num : numbers) {
            sum += num.doubleValue();
        }
        return sum / numbers.length;
    }
}

public class Main {
    public static void main(String[] args) {
        Integer[] ints = {1, 2, 3, 4, 5};
        Statistics<Integer> stat = new Statistics<>(ints);
        System.out.println("Average: " + stat.average());

        Double[] doubles = {1.5, 2.5, 3.5};
        Statistics<Double> stat2 = new Statistics<>(doubles);
        System.out.println("Average: " + stat2.average());
    }
}`,
          language: 'java',
          output: `Average: 3.0\nAverage: 2.5`,
          explanation: 'The <T extends Number> bound ensures only Number subclasses can be used. This allows calling doubleValue() on T, which is a method defined in Number.',
        },
        {
          id: 'ce-12-02-2',
          title: 'Wildcards and PECS',
          code: `import java.util.ArrayList;
import java.util.List;

public class WildcardDemo {
    public static double sumOfList(List<? extends Number> list) {
        double sum = 0;
        for (Number num : list) {
            sum += num.doubleValue();
        }
        return sum;
    }

    public static void addNumbers(List<? super Integer> list) {
        list.add(1);
        list.add(2);
        list.add(3);
    }

    public static void main(String[] args) {
        List<Integer> intList = new ArrayList<>();
        intList.add(10);
        intList.add(20);
        System.out.println("Sum: " + sumOfList(intList));

        List<Number> numList = new ArrayList<>();
        addNumbers(numList);
        System.out.println("List: " + numList);
    }
}`,
          language: 'java',
          output: `Sum: 30.0\nList: [1, 2, 3]`,
          explanation: 'List<? extends Number> accepts List<Integer>, List<Double>, etc. (read-only). List<? super Integer> accepts List<Integer>, List<Number>, List<Object> (write-only for Integer values).',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-12-02-1',
          title: 'Number Comparison Utility',
          scenario: 'You need a utility that calculates the maximum value from a list of any numeric type (Integer, Double, Long, etc.).',
          oopConcept: 'Use a bounded generic method: public static <T extends Comparable<T>> T findMax(List<T> list). The extends Comparable<T> bound ensures T can be compared, and the method works with any Comparable type.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-12-02-1',
          title: 'Creating Array of Generic Type',
          incorrectCode: `class Box<T> {\n    T[] items = new T[10]; // Compile error!\n}`,
          correctCode: `class Box<T> {\n    java.util.List<T> items = new java.util.ArrayList<>();\n}`,
          explanation: 'Due to type erasure, the JVM cannot create a T[] at runtime. Use ArrayList<T> as a workaround.',
        },
      ],
      examNotes: [
        { id: 'en-12-02-1', title: 'PECS Rule', content: 'Producer Extends, Consumer Super. If a parameter produces values you read, use extends. If it consumes values you write, use super.', importance: 'high' },
        { id: 'en-12-02-2', title: 'Type Erasure Consequences', content: 'At runtime: no T.class, no new T(), no new T[], no generic instanceof checks. Generics are purely a compile-time feature.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-12-02-1', question: 'What is the difference between <? extends T> and <? super T>?', answer: '<? extends T> is an upper bound that accepts T or any subclass (read-only). <? super T> is a lower bound that accepts T or any superclass (write-only).', difficulty: 'medium' },
        { id: 'vq-12-02-2', question: 'Why cannot you create a new T() in a generic class?', answer: 'Due to type erasure, the actual type T is not known at runtime. The JVM only sees Object, so it cannot call a specific constructor.', difficulty: 'hard' },
        { id: 'vq-12-02-3', question: 'What is the PECS rule?', answer: 'Producer Extends, Consumer Super. When a generic parameter produces values for reading, use extends. When it consumes values for writing, use super.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-12-02-1', type: 'mcq', question: 'What does <T extends Number> mean?', options: ['T must be exactly Number', 'T must be Number or a subclass of Number', 'T must be a superclass of Number', 'T can be any type'], correctAnswer: 'T must be Number or a subclass of Number', explanation: 'The extends keyword sets an upper bound. T can be Number, Integer, Double, Float.' },
        { id: 'qc-12-02-2', type: 'true-false', question: 'You can use instanceof to check if an object is a List<String>.', correctAnswer: 'False', explanation: 'Due to type erasure, List<String> and List<Integer> are both just List at runtime.' },
        { id: 'qc-12-02-3', type: 'mcq', question: 'According to PECS, which wildcard should you use for a method parameter that writes values?', options: ['<? extends T>', '<? super T>', '<?>', '<T>'], correctAnswer: '<? super T>', explanation: 'Consumer Super: when you write values into a generic parameter, use <? super T>.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-12-02-1',
          scenario: 'You are writing a method that copies elements from a source list to a destination list.',
          question: 'What wildcard types should you use for source and destination?',
          type: 'design-decision',
          options: [
            'source: <? extends T>, destination: <? super T>',
            'source: <? super T>, destination: <? extends T>',
            'Both should use <?>',
            'Both should use <T>',
          ],
          correctAnswer: 'source: <? extends T>, destination: <? super T>',
          explanation: 'Following PECS: the source produces values (extends), the destination consumes values (super).',
          relatedConcepts: ['PECS', 'wildcards', 'bounded-types'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-generic-bounds',
      prerequisites: ['lesson-12-01'],
      xpReward: 70,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'generic-bounds',
      difficulty: 'medium',
      estimatedMinutes: 25,
    },
    {
      id: 'lesson-12-03',
      moduleId: 'module-12',
      title: 'ArrayList Deep Dive',
      slug: 'arraylist-deep-dive',
      order: 3,
      duration: 25,
      description: 'Master ArrayList: dynamic arrays, CRUD operations, iteration patterns, and performance characteristics.',
      learningObjectives: [
        { id: 'lo-12-03-1', description: 'Understand how ArrayList uses a dynamic array internally', completed: false },
        { id: 'lo-12-03-2', description: 'Perform all CRUD operations efficiently', completed: false },
        { id: 'lo-12-03-3', description: 'Choose the correct iteration pattern for different scenarios', completed: false },
        { id: 'lo-12-03-4', description: 'Explain time complexity of ArrayList operations', completed: false },
      ],
      englishExplanation: {
        id: 'ee-12-03',
        text: `ArrayList is a resizable array implementation of the List interface. Unlike a regular array, ArrayList can grow and shrink dynamically as elements are added or removed. Internally, it uses an Object array with a default capacity of 10. When the array is full, a new larger array (typically 1.5x the size) is created and elements are copied over.\n\nCRUD operations on ArrayList: Create with \`new ArrayList<>()\` or \`new ArrayList<>(initialCapacity)\`. Add with \`add(element)\` to append at end, or \`add(index, element)\` to insert at position. Read with \`get(index)\` for direct access or \`indexOf(element)\` to find position. Update with \`set(index, element)\` to replace at position. Delete with \`remove(index)\` by position or \`remove(object)\` by value.\n\nTime complexity matters for performance: Access by index is O(1) as a direct array lookup. Adding at the end is O(1) amortized with occasional resizing. Adding or removing in the middle is O(n) because elements must be shifted. Searching is O(n) as it must scan through elements.\n\nIteration patterns: Use a for loop when you need the index. Use enhanced for-each for cleanest syntax when only reading. Use Iterator for safe removal during iteration. Use ListIterator for bidirectional traversal and element modification.\n\nArrayList is the most commonly used collection in Java. Use it when you need indexed access and frequent reads. Avoid it when you frequently insert or delete at the beginning.`
      },
      romanUrduExplanation: {
        id: 'ru-12-03',
        text: `ArrayList List interface ki resizable array implementation hai. Regular array ke mukable, ArrayList elements add ya remove hone par dynamically grow aur shrink ho sakta hai. Internally, ye ek Object array use karta hai jiska default capacity 10 hai.\n\nArrayList par CRUD operations: Create with \`new ArrayList<>()\`. Add with \`add(element)\` end par, ya \`add(index, element)\` position par. Read with \`get(index)\` ya \`indexOf(element)\`. Update with \`set(index, element)\`. Delete with \`remove(index)\` ya \`remove(object)\`.\n\nTime complexity: Index se access O(1) hai. End par add O(1) amortized hai. Middle mein add ya remove O(n) hai. Search O(n) hai.\n\nIteration patterns: Index chahiye toh for loop use karein. Sirf read karna hai toh enhanced for-each use karein. Iteration ke dauran removal chahiye toh Iterator use karein. Bidirectional traversal chahiye toh ListIterator use karein.\n\nArrayList Java mein sabse zyada use hone wali collection hai. Indexed access aur frequent reads chahiye toh use karein.`
      },
      keyPoints: [
        { id: 'kp-12-03-1', title: 'Dynamic Sizing', description: 'ArrayList grows automatically when capacity is exceeded. New capacity is typically 1.5x the old capacity.' },
        { id: 'kp-12-03-2', title: 'Index-Based Access', description: 'get(index) and set(index) are O(1). ArrayList provides fast random access like arrays.' },
        { id: 'kp-12-03-3', title: 'Shifting Cost', description: 'Inserting or removing at the middle requires shifting all subsequent elements, making it O(n).' },
        { id: 'kp-12-03-4', title: 'Iteration Safety', description: 'Use Iterator for safe removal during iteration. Enhanced for-each throws ConcurrentModificationException if modified.' },
      ],
      codeExamples: [
        {
          id: 'ce-12-03-1',
          title: 'ArrayList CRUD Operations',
          code: `import java.util.ArrayList;

public class ArrayListDemo {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();
        names.add("Ahmed");
        names.add("Sara");
        names.add("Ali");
        names.add(1, "Fatima");
        System.out.println("After adding: " + names);

        System.out.println("Element at 0: " + names.get(0));
        System.out.println("Index of Ali: " + names.indexOf("Ali"));

        names.set(2, "Hassan");
        System.out.println("After update: " + names);

        names.remove("Fatima");
        names.remove(0);
        System.out.println("After delete: " + names);
    }
}`,
          language: 'java',
          output: `After adding: [Ahmed, Fatima, Sara, Ali]\nElement at 0: Ahmed\nIndex of Ali: 3\nAfter update: [Ahmed, Fatima, Hassan, Ali]\nAfter delete: [Hassan, Ali]`,
          explanation: 'All CRUD operations demonstrated: add (at end and at index), get, indexOf, set, and remove (by object and by index).',
        },
        {
          id: 'ce-12-03-2',
          title: 'Iteration Patterns',
          code: `import java.util.ArrayList;
import java.util.Iterator;

public class IterationDemo {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>();
        numbers.add(10);
        numbers.add(20);
        numbers.add(30);
        numbers.add(40);

        System.out.println("For loop:");
        for (int i = 0; i < numbers.size(); i++) {
            System.out.println("Index " + i + ": " + numbers.get(i));
        }

        System.out.println("For-each:");
        for (int num : numbers) {
            System.out.println(num);
        }

        System.out.println("Iterator with removal:");
        Iterator<Integer> it = numbers.iterator();
        while (it.hasNext()) {
            int num = it.next();
            if (num % 20 == 0) {
                it.remove();
            }
        }
        System.out.println("After removing multiples of 20: " + numbers);
    }
}`,
          language: 'java',
          output: `For loop:\nIndex 0: 10\nIndex 1: 20\nIndex 2: 30\nIndex 3: 40\nFor-each:\n10\n20\n30\n40\nIterator with removal:\nAfter removing multiples of 20: [10, 30]`,
          explanation: 'Three iteration patterns demonstrated: for loop with index, enhanced for-each for clean read, and Iterator for safe removal.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-12-03-1',
          title: 'Student Grade Tracker',
          scenario: 'A teacher needs to store student grades, add new grades, update incorrect entries, remove dropped students, and iterate to calculate averages.',
          oopConcept: 'ArrayList<Grade> stores all grades. Add new grades with add(), update with set(), remove dropped students with remove(). Calculate average by iterating with a for-each loop.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-12-03-1',
          title: 'Removing During Enhanced For-Each',
          incorrectCode: `for (String name : names) {\n    if (name.equals("Sara")) {\n        names.remove(name); // ConcurrentModificationException!\n    }\n}`,
          correctCode: `Iterator<String> it = names.iterator();\nwhile (it.hasNext()) {\n    String name = it.next();\n    if (name.equals("Sara")) {\n        it.remove(); // Safe!\n    }\n}`,
          explanation: 'Enhanced for-each uses an Iterator internally. Calling names.remove() directly modifies the list, causing ConcurrentModificationException. Always use Iterator.remove().',
        },
      ],
      examNotes: [
        { id: 'en-12-03-1', title: 'ArrayList Time Complexity', content: 'Access: O(1), Add at end: O(1) amortized, Add/Remove at index: O(n), Search: O(n). Frequently tested.', importance: 'high' },
        { id: 'en-12-03-2', title: 'ConcurrentModificationException', content: 'Occurs when you modify a list during enhanced for-each iteration. Use Iterator.remove() or removeIf() instead.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-12-03-1', question: 'How does ArrayList grow internally?', answer: 'ArrayList uses an Object array with default capacity 10. When full, a new array of 1.5x size is created and all elements are copied.', difficulty: 'medium' },
        { id: 'vq-12-03-2', question: 'When should you use ArrayList vs LinkedList?', answer: 'ArrayList for indexed access and frequent reads (O(1) access). LinkedList for frequent insertions/deletions at the beginning or end (O(1) add/remove).', difficulty: 'medium' },
        { id: 'vq-12-03-3', question: 'What happens if you call remove() inside a for-each loop?', answer: 'ConcurrentModificationException is thrown. Use Iterator.remove() instead.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-12-03-1', type: 'mcq', question: 'What is the default initial capacity of ArrayList?', options: ['5', '10', '16', '20'], correctAnswer: '10', explanation: 'ArrayList starts with a default capacity of 10. When exceeded, it grows to 1.5x the current capacity.' },
        { id: 'qc-12-03-2', type: 'mcq', question: 'What is the time complexity of get(index) in ArrayList?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correctAnswer: 'O(1)', explanation: 'ArrayList provides direct index-based access, making get(index) a constant-time operation.' },
        { id: 'qc-12-03-3', type: 'true-false', question: 'ArrayList allows duplicate elements.', correctAnswer: 'True', explanation: 'ArrayList (and all List implementations) allow duplicate elements. Only Set implementations prevent duplicates.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-12-03-1',
          scenario: 'You have an ArrayList of 10,000 Employee records. You need to frequently search for employees by ID and also frequently insert new employees in the middle of the list.',
          question: 'Is ArrayList the best choice?',
          type: 'design-decision',
          options: [
            'Yes, ArrayList handles all operations efficiently',
            'No, middle insertions are O(n) due to shifting — consider LinkedList or a HashMap for search',
            'Yes, but only if you sort the list first',
            'No, you should use a regular array instead',
          ],
          correctAnswer: 'No, middle insertions are O(n) due to shifting — consider LinkedList or a HashMap for search',
          explanation: 'ArrayList middle insertions require shifting all subsequent elements (O(n)). For search by ID, HashMap provides O(1) lookup.',
          relatedConcepts: ['ArrayList', 'time-complexity', 'data-structure-choice'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-arraylist',
      prerequisites: ['lesson-12-01'],
      xpReward: 70,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'dynamic-array',
      difficulty: 'easy',
      estimatedMinutes: 25,
    },
    {
      id: 'lesson-12-04',
      moduleId: 'module-12',
      title: 'HashMap Deep Dive',
      slug: 'hashmap-deep-dive',
      order: 4,
      duration: 25,
      description: 'Master HashMap: key-value pairs, hashing mechanism, collision handling, and iteration patterns.',
      learningObjectives: [
        { id: 'lo-12-04-1', description: 'Explain how HashMap uses hashing for key-value storage', completed: false },
        { id: 'lo-12-04-2', description: 'Perform put, get, containsKey, and remove operations', completed: false },
        { id: 'lo-12-04-3', description: 'Understand hash collisions and how Java resolves them', completed: false },
        { id: 'lo-12-04-4', description: 'Choose appropriate iteration methods for HashMap', completed: false },
      ],
      englishExplanation: {
        id: 'ee-12-04',
        text: `HashMap is a hash table implementation of the Map interface. It stores key-value pairs where each key is unique. The mapping between keys and values is managed through a hashing mechanism.\n\nHow hashing works: When you call \`put(key, value)\`, HashMap calls \`key.hashCode()\` to get an integer hash. The hash is processed to find a bucket index in the internal array. The key-value pair is stored in that bucket.\n\nIf two keys produce the same bucket index (hash collision), HashMap uses a linked list (or balanced tree in Java 8+ for large buckets) to store multiple entries in the same bucket. This is why proper \`hashCode()\` and \`equals()\` implementations are critical for custom objects used as keys.\n\nCore operations: put(key, value) inserts or updates and returns the old value if the key existed. get(key) returns the value for the key, or null if not found. containsKey(key) returns true if the key exists. remove(key) removes the key-value pair.\n\nTime complexity: Average case O(1) for put, get, containsKey, remove. Worst case O(n) when all keys hash to the same bucket. With proper hashCode() implementations, worst case is extremely rare.\n\nIteration patterns: keySet() iterates over all keys, values() over all values, entrySet() over key-value pairs (most efficient), and forEach() for lambda-based iteration in Java 8+. HashMap does not maintain insertion order; use LinkedHashMap for that.`
      },
      romanUrduExplanation: {
        id: 'ru-12-04',
        text: `HashMap Map interface ki hash table implementation hai. Ye key-value pairs store karta hai jahan har key unique hoti hai.\n\nHashing kaise kaam karta hai: Jab aap \`put(key, value)\` call karte hain, HashMap \`key.hashCode()\` call karta hai integer hash paane ke liye. Hash ko process kiya jaata hai internal array mein bucket index dhundne ke liye. Key-value pair us bucket mein store hota hai.\n\nAgar do keys same bucket index produce karti hain (hash collision), toh HashMap linked list (ya Java 8+ mein large buckets ke liye balanced tree) use karta hai. Isliye proper \`hashCode()\` aur \`equals()\` implementations critical hain.\n\nCore operations: put(key, value) insert ya update karta hai. get(key) value return karta hai. containsKey(key) check karta hai. remove(key) remove karta hai.\n\nTime complexity: Average case O(1) for put, get, containsKey, remove. Worst case O(n). Proper hashCode() implementations ke saath worst case bahut rare hai.\n\nIteration patterns: keySet() keys par, values() values par, entrySet() key-value pairs par (sabse efficient), forEach() Java 8+ lambda style.`
      },
      keyPoints: [
        { id: 'kp-12-04-1', title: 'Hashing Mechanism', description: 'Keys are hashed to find bucket indices. hashCode() determines the bucket, equals() identifies the exact entry.' },
        { id: 'kp-12-04-2', title: 'O(1) Average Performance', description: 'put, get, containsKey, and remove all have O(1) average time complexity.' },
        { id: 'kp-12-04-3', title: 'Collision Handling', description: 'Java 8+ uses linked lists for small buckets and balanced trees for buckets with 8+ entries.' },
        { id: 'kp-12-04-4', title: 'Key Requirements', description: 'Keys must override both hashCode() and equals(). Two equal objects must have the same hashCode().' },
      ],
      codeExamples: [
        {
          id: 'ce-12-04-1',
          title: 'HashMap CRUD Operations',
          code: `import java.util.HashMap;
import java.util.Map;

public class HashMapDemo {
    public static void main(String[] args) {
        HashMap<String, Integer> studentMarks = new HashMap<>();
        studentMarks.put("Ahmed", 85);
        studentMarks.put("Sara", 92);
        studentMarks.put("Ali", 78);

        int oldMarks = studentMarks.put("Ahmed", 90);
        System.out.println("Old marks for Ahmed: " + oldMarks);

        System.out.println("Sara's marks: " + studentMarks.get("Sara"));
        System.out.println("Zain's marks: " + studentMarks.getOrDefault("Zain", 0));
        System.out.println("Has Ali? " + studentMarks.containsKey("Ali"));

        studentMarks.remove("Ali");
        System.out.println("After remove: " + studentMarks);
    }
}`,
          language: 'java',
          output: `Old marks for Ahmed: 85\nSara's marks: 92\nZain's marks: 0\nHas Ali? true\nAfter remove: {Sara=92, Ahmed=90}`,
          explanation: 'All basic HashMap operations: put (insert and update), get, getOrDefault, containsKey, and remove.',
        },
        {
          id: 'ce-12-04-2',
          title: 'HashMap Iteration Patterns',
          code: `import java.util.HashMap;
import java.util.Map;

public class IterationDemo {
    public static void main(String[] args) {
        HashMap<String, Double> products = new HashMap<>();
        products.put("Laptop", 999.99);
        products.put("Phone", 699.99);
        products.put("Tablet", 449.99);

        System.out.println("=== keySet ===");
        for (String key : products.keySet()) {
            System.out.println(key + " costs $" + products.get(key));
        }

        System.out.println("=== entrySet ===");
        for (Map.Entry<String, Double> entry : products.entrySet()) {
            System.out.println(entry.getKey() + " = $" + entry.getValue());
        }

        System.out.println("=== forEach ===");
        products.forEach((name, price) ->
            System.out.println(name + ": $" + price));
    }
}`,
          language: 'java',
          output: `=== keySet ===\nLaptop costs $999.99\nPhone costs $699.99\nTablet costs $449.99\n=== entrySet ===\nLaptop = $999.99\nPhone = $699.99\nTablet = $449.99\n=== forEach ===\nLaptop: $999.99\nPhone: $699.99\nTablet: $449.99`,
          explanation: 'Three iteration patterns: keySet (keys only), entrySet (key-value pairs, most efficient), and forEach (Java 8+ lambda).',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-12-04-1',
          title: 'Word Frequency Counter',
          scenario: 'Analyze a paragraph of text and count how many times each word appears.',
          oopConcept: 'Use HashMap<String, Integer> where the key is the word and the value is the count. For each word, if it exists, increment the count; otherwise, add it with count 1.',
          codeExample: {
            id: 'rwe-code-12-04-1',
            title: 'Word Counter',
            code: `import java.util.HashMap;\n\npublic class WordCounter {\n    public static void main(String[] args) {\n        String text = "the cat sat on the mat the cat";\n        String[] words = text.split(" ");\n        HashMap<String, Integer> freq = new HashMap<>();\n        for (String word : words) {\n            freq.merge(word, 1, Integer::sum);\n        }\n        System.out.println(freq);\n    }\n}`,
            language: 'java',
            output: '{the=3, cat=2, sat=1, mat=1}',
          },
        },
      ],
      commonMistakes: [
        {
          id: 'cm-12-04-1',
          title: 'Using Mutable Objects as Keys',
          incorrectCode: `HashMap<StringBuilder, String> map = new HashMap<>();\nStringBuilder key = new StringBuilder("hello");\nmap.put(key, "world");\nkey.append("!");\nSystem.out.println(map.get(new StringBuilder("hello"))); // null!`,
          correctCode: `HashMap<String, String> map = new HashMap<>();\nString key = "hello";\nmap.put(key, "world");\nSystem.out.println(map.get("hello")); // world`,
          explanation: 'HashMap relies on hashCode() of keys. If a key is mutable and its hashCode() changes after insertion, the entry becomes unreachable. Always use immutable objects as keys.',
        },
      ],
      examNotes: [
        { id: 'en-12-04-1', title: 'HashMap Contract', content: 'Keys must override hashCode() and equals(). Equal keys must have equal hashCodes. Two unequal keys CAN have equal hashCodes (collision).', importance: 'high' },
        { id: 'en-12-04-2', title: 'HashMap vs LinkedHashMap vs TreeMap', content: 'HashMap: unordered, O(1). LinkedHashMap: insertion-order, O(1). TreeMap: sorted, O(log n).', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-12-04-1', question: 'How does HashMap handle hash collisions?', answer: 'Each bucket stores a linked list of entries. In Java 8+, if a bucket has 8+ entries, it converts to a balanced tree for O(log n) lookup.', difficulty: 'medium' },
        { id: 'vq-12-04-2', question: 'Why must hashCode() and equals() be consistent?', answer: 'If two objects are equal, they must have the same hashCode(). Otherwise, HashMap cannot find the correct bucket for the key.', difficulty: 'hard' },
        { id: 'vq-12-04-3', question: 'What is the difference between HashMap and LinkedHashMap?', answer: 'HashMap stores entries in no particular order. LinkedHashMap maintains insertion order by using a doubly-linked list alongside the hash table.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-12-04-1', type: 'mcq', question: 'What is the average time complexity of get() in HashMap?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correctAnswer: 'O(1)', explanation: 'HashMap uses hashing to directly compute the bucket index, making average-case lookup O(1).' },
        { id: 'qc-12-04-2', type: 'true-false', question: 'HashMap maintains the insertion order of entries.', correctAnswer: 'False', explanation: 'HashMap does not guarantee any order. Use LinkedHashMap for insertion order.' },
        { id: 'qc-12-04-3', type: 'mcq', question: 'Which methods should you override when using a custom object as a HashMap key?', options: ['Only toString()', 'Only hashCode()', 'Both hashCode() and equals()', 'clone()'], correctAnswer: 'Both hashCode() and equals()', explanation: 'hashCode() determines the bucket, equals() identifies the exact key. Both must be overridden.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-12-04-1',
          scenario: 'You are building a contact book application. You need to store 100,000 contacts with phone numbers. Lookup by name must be fast.',
          question: 'Which data structure should you use?',
          type: 'design-decision',
          options: [
            'ArrayList for fast indexed access',
            'HashMap for O(1) name-to-phone lookup',
            'TreeMap for sorted contacts',
            'LinkedList for fast insertion',
          ],
          correctAnswer: 'HashMap for O(1) name-to-phone lookup',
          explanation: 'HashMap provides O(1) average lookup by key. With 100,000 contacts, this is significantly faster than ArrayList O(n) or TreeMap O(log n).',
          relatedConcepts: ['HashMap', 'time-complexity', 'key-value-storage'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-hashmap',
      prerequisites: ['lesson-12-01', 'lesson-12-03'],
      xpReward: 70,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'hash-table',
      difficulty: 'easy',
      estimatedMinutes: 25,
    },
    {
      id: 'lesson-12-05',
      moduleId: 'module-12',
      title: 'TreeSet and TreeMap',
      slug: 'treeset-and-treemap',
      order: 5,
      duration: 25,
      description: 'Master sorted collections: TreeSet, TreeMap, and the role of Comparable and Comparator in ordering.',
      learningObjectives: [
        { id: 'lo-12-05-1', description: 'Understand how TreeSet and TreeMap maintain sorted order', completed: false },
        { id: 'lo-12-05-2', description: 'Use Comparable for natural ordering', completed: false },
        { id: 'lo-12-05-3', description: 'Use Comparator for custom ordering', completed: false },
        { id: 'lo-12-05-4', description: 'Choose between TreeSet/TreeMap and HashSet/HashMap', completed: false },
      ],
      englishExplanation: {
        id: 'ee-12-05',
        text: `TreeSet and TreeMap are sorted implementations of the Set and Map interfaces, respectively. They use a Red-Black Tree data structure internally, which maintains elements in sorted order automatically.\n\nTreeSet stores unique elements in sorted order. When you add an element, it is placed in the correct position in the tree based on its natural ordering or a custom Comparator. Lookup, insertion, and deletion are all O(log n).\n\nTreeMap stores key-value pairs with keys in sorted order. Like TreeSet, it uses Red-Black Tree for O(log n) operations on keys.\n\nThe sorting mechanism relies on either Natural Ordering where the element class implements Comparable<T> defining compareTo() method, or Custom Ordering where you pass a Comparator<T> to the TreeSet/TreeMap constructor.\n\nFor natural ordering, String implements Comparable and sorts alphabetically, Integer implements Comparable and sorts numerically. For custom ordering, you can create a Comparator such as Comparator.comparingInt(Student::getAge) to sort by age.\n\nTreeSet/TreeMap vs HashSet/HashMap: TreeSet/TreeMap are sorted with O(log n) operations. HashSet/HashMap are unordered with O(1) operations. Use sorted collections when order matters; use hash-based for speed.`
      },
      romanUrduExplanation: {
        id: 'ru-12-05',
        text: `TreeSet aur TreeMap Set aur Map interfaces ke sorted implementations hain. Ye internally Red-Black Tree data structure use karte hain jo elements ko automatically sorted order mein maintain karta hai.\n\nTreeSet unique elements ko sorted order mein store karta hai. Jab aap element add karte hain, toh use tree mein uski natural ordering ya custom Comparator ke basis par correct position mein rakha jaata hai. Lookup, insertion aur deletion sab O(log n) hain.\n\nTreeMap key-value pairs sorted order mein store karta hai keys ke saath. TreeSet ki tarah, ye keys par O(log n) operations ke liye Red-Black Tree use karta hai.\n\nSorting mechanism ya toh Natural Ordering par depend karta hai jahan element class Comparable implement karta hai, ya Custom Ordering par jahan aap Comparator pass karte hain.\n\nTreeSet/TreeMap vs HashSet/HashMap: TreeSet/TreeMap sorted hain O(log n) operations ke saath. HashSet/HashMap unordered hain O(1) operations ke saath. Order matters ho toh sorted collections use karein.`
      },
      keyPoints: [
        { id: 'kp-12-05-1', title: 'Red-Black Tree', description: 'TreeSet and TreeMap use a self-balancing binary search tree that guarantees O(log n) for add, remove, and contains.' },
        { id: 'kp-12-05-2', title: 'Comparable Interface', description: 'Defines natural ordering via compareTo(T). Implemented by the element class itself.' },
        { id: 'kp-12-05-3', title: 'Comparator Interface', description: 'Defines custom ordering via compare(T, T). Passed as a constructor argument.' },
        { id: 'kp-12-05-4', title: 'Performance', description: 'TreeSet/TreeMap: O(log n) for all operations. HashSet/HashMap: O(1). Choose based on whether you need sorted order.' },
      ],
      codeExamples: [
        {
          id: 'ce-12-05-1',
          title: 'TreeSet with Natural Ordering',
          code: `import java.util.TreeSet;

public class TreeSetDemo {
    public static void main(String[] args) {
        TreeSet<String> names = new TreeSet<>();
        names.add("Zara");
        names.add("Ahmed");
        names.add("Sara");
        names.add("Ali");
        System.out.println("Sorted names: " + names);
        System.out.println("First: " + names.first());
        System.out.println("Last: " + names.last());

        TreeSet<Integer> numbers = new TreeSet<>();
        numbers.add(50);
        numbers.add(10);
        numbers.add(30);
        numbers.add(20);
        System.out.println("Sorted numbers: " + numbers);
    }
}`,
          language: 'java',
          output: `Sorted names: [Ahmed, Ali, Sara, Zara]\nFirst: Ahmed\nLast: Zara\nSorted numbers: [10, 20, 30, 50]`,
          explanation: 'TreeSet automatically sorts elements using their natural ordering (compareTo()). String sorts alphabetically, Integer sorts numerically.',
        },
        {
          id: 'ce-12-05-2',
          title: 'TreeMap with Custom Comparator',
          code: `import java.util.TreeMap;
import java.util.Comparator;

public class TreeMapDemo {
    public static void main(String[] args) {
        TreeMap<String, Integer> ages = new TreeMap<>();
        ages.put("Sara", 22);
        ages.put("Ahmed", 20);
        ages.put("Ali", 25);
        ages.put("Fatima", 19);
        System.out.println("Sorted by name: " + ages);

        System.out.println("First key: " + ages.firstKey());
        System.out.println("Last key: " + ages.lastKey());
        System.out.println("HeadMap(Ali): " + ages.headMap("Ali"));
        System.out.println("TailMap(Ali): " + ages.tailMap("Ali"));
    }
}`,
          language: 'java',
          output: `Sorted by name: {Ahmed=20, Ali=25, Fatima=19, Sara=22}\nFirst key: Ahmed\nLast key: Sara\nHeadMap(Ali): {Ahmed=20}\nTailMap(Ali): {Ali=25, Fatima=19, Sara=22}`,
          explanation: 'TreeMap sorts keys naturally. Navigation methods like firstKey, headMap, tailMap provide sorted access ranges.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-12-05-1',
          title: 'Leaderboard System',
          scenario: 'A gaming platform needs to display players ranked by score.',
          oopConcept: 'TreeMap<Player, Integer> with a custom Comparator that sorts by score descending. Navigation methods like firstEntry() give the top scorer instantly.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-12-05-1',
          title: 'Forgetting Comparable for Custom Objects',
          incorrectCode: `class Student {\n    String name;\n    int age;\n}\nTreeSet<Student> students = new TreeSet<>();\nstudents.add(new Student()); // ClassCastException!`,
          correctCode: `class Student implements Comparable<Student> {\n    String name;\n    int age;\n    @Override\n    public int compareTo(Student other) {\n        return this.name.compareTo(other.name);\n    }\n}\nTreeSet<Student> students = new TreeSet<>();\nstudents.add(new Student()); // Works!`,
          explanation: 'TreeSet requires elements to be Comparable. Custom objects must implement Comparable or be provided with a Comparator.',
        },
      ],
      examNotes: [
        { id: 'en-12-05-1', title: 'Comparable vs Comparator', content: 'Comparable: natural ordering, implemented by element class, compareTo(T). Comparator: custom ordering, separate class, compare(T, T).', importance: 'high' },
        { id: 'en-12-05-2', title: 'Time Complexity', content: 'TreeSet/TreeMap: O(log n). HashSet/HashMap: O(1). Choose based on whether you need sorted order.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-12-05-1', question: 'What is the difference between Comparable and Comparator?', answer: 'Comparable is implemented by the element class for natural ordering. Comparator is a separate object for custom ordering.', difficulty: 'medium' },
        { id: 'vq-12-05-2', question: 'What data structure does TreeSet use internally?', answer: 'Red-Black Tree, a self-balancing binary search tree that guarantees O(log n) operations while maintaining sorted order.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-12-05-1', type: 'mcq', question: 'Which interface provides natural ordering for TreeSet elements?', options: ['Comparator', 'Comparable', 'Iterable', 'Serializable'], correctAnswer: 'Comparable', explanation: 'Comparable defines natural ordering via compareTo().' },
        { id: 'qc-12-05-2', type: 'true-false', question: 'TreeMap maintains insertion order.', correctAnswer: 'False', explanation: 'TreeMap maintains sorted order based on key comparison, not insertion order.' },
        { id: 'qc-12-05-3', type: 'mcq', question: 'What is the time complexity of TreeSet.add()?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correctAnswer: 'O(log n)', explanation: 'TreeSet uses Red-Black Tree which guarantees O(log n).' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-12-05-1',
          scenario: 'You need to store student records displayed in alphabetical order by name, with fast lookup by student ID.',
          question: 'Which data structures should you use?',
          type: 'design-decision',
          options: [
            'TreeMap only — sorted by name',
            'HashMap for ID lookup + TreeSet for sorted display',
            'ArrayList for both',
            'LinkedList for sorted display',
          ],
          correctAnswer: 'HashMap for ID lookup + TreeSet for sorted display',
          explanation: 'Use HashMap for O(1) lookup by ID, and TreeSet with Comparable by name for sorted display.',
          relatedConcepts: ['TreeSet', 'HashMap', 'data-structure-choice'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-treemap',
      prerequisites: ['lesson-12-04'],
      xpReward: 70,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'tree-structure',
      difficulty: 'medium',
      estimatedMinutes: 25,
    },
    {
      id: 'lesson-12-06',
      moduleId: 'module-12',
      title: 'LinkedList',
      slug: 'linkedlist',
      order: 6,
      duration: 20,
      description: 'Understand doubly linked lists, LinkedList implementation in Java, and when to choose it over ArrayList.',
      learningObjectives: [
        { id: 'lo-12-06-1', description: 'Explain how a doubly linked list stores elements', completed: false },
        { id: 'lo-12-06-2', description: 'Use LinkedList for efficient insertions and deletions at both ends', completed: false },
        { id: 'lo-12-06-3', description: 'Compare LinkedList with ArrayList performance', completed: false },
        { id: 'lo-12-06-4', description: 'Identify when LinkedList is the appropriate choice', completed: false },
      ],
      englishExplanation: {
        id: 'ee-12-06',
        text: `LinkedList is a doubly linked list implementation of the List and Deque interfaces. Each element (node) contains three things: the data, a reference to the next node, and a reference to the previous node. This bidirectional linking allows traversal in both directions.\n\nIn a doubly linked list, adding or removing at the beginning or end is O(1) because you only need to update a few references. There is no array to resize and no elements to shift. However, accessing an element by index is O(n) because you must traverse from the head or tail.\n\nLinkedList also implements the Deque interface, so it can function as a Queue (FIFO) with offer() and poll(), a Stack (LIFO) with push() and pop(), and a Deque with addFirst(), addLast(), removeFirst(), removeLast().\n\nWhen to use LinkedList: frequent additions/removals at both ends, frequent insertions in the middle at known positions using ListIterator, or when you need a Deque implementation.\n\nWhen NOT to use LinkedList: frequent random access by index (ArrayList is O(1)), searching for elements, or most general-purpose cases where ArrayList is almost always preferred due to CPU cache locality.`
      },
      romanUrduExplanation: {
        id: 'ru-12-06',
        text: `LinkedList List aur Deque interfaces ki doubly linked list implementation hai. Har element (node) teen cheezein rakhta hai: data, next node ka reference, aur previous node ka reference.\n\nDoubly linked list mein, beginning ya end par add ya remove O(1) hota hai. Lekin, index par element access karna O(n) hota hai.\n\nLinkedList Deque interface bhi implement karta hai, toh ye Queue (FIFO), Stack (LIFO), aur Deque ke taur par kaam kar sakta hai.\n\nKab LinkedList use karein: beginning aur end par frequent additions/removals, known positions par middle mein insertions, ya Deque implementation chahiye.\n\nKab NA use karein: frequent random access by index, searching, ya most general-purpose cases.`
      },
      keyPoints: [
        { id: 'kp-12-06-1', title: 'Doubly Linked Structure', description: 'Each node has data, next reference, and previous reference. Enables bidirectional traversal.' },
        { id: 'kp-12-06-2', title: 'O(1) Add/Remove at Ends', description: 'Adding or removing at head or tail is constant time.' },
        { id: 'kp-12-06-3', title: 'O(n) Random Access', description: 'Accessing by index requires traversal from head or tail.' },
        { id: 'kp-12-06-4', title: 'Deque Implementation', description: 'LinkedList also implements Deque, functioning as queue and stack.' },
      ],
      codeExamples: [
        {
          id: 'ce-12-06-1',
          title: 'LinkedList as List and Deque',
          code: `import java.util.LinkedList;

public class LinkedListDemo {
    public static void main(String[] args) {
        LinkedList<String> list = new LinkedList<>();
        list.add("Sara");
        list.add("Ali");
        list.addFirst("Ahmed");
        list.addLast("Fatima");
        System.out.println("List: " + list);

        list.offer("Hassan");
        String first = list.poll();
        System.out.println("Removed: " + first);

        list.push("Zain");
        String top = list.pop();
        System.out.println("Popped: " + top);

        System.out.println("First: " + list.getFirst());
        System.out.println("Last: " + list.getLast());
    }
}`,
          language: 'java',
          output: `List: [Ahmed, Sara, Ali, Fatima]\nRemoved: Ahmed\nPopped: Zain\nFirst: Sara\nLast: Hassan`,
          explanation: 'LinkedList demonstrates List operations and Deque operations (offer/poll for queue, push/pop for stack).',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-12-06-1',
          title: 'Browser History Navigation',
          scenario: 'A web browser needs back and forward navigation history.',
          oopConcept: 'LinkedList as a Deque: addLast() when visiting a new page, removeLast() when going back, getFirst() for the current page.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-12-06-1',
          title: 'Using LinkedList for Random Access',
          incorrectCode: `LinkedList<String> names = new LinkedList<>();\nfor (int i = 0; i < names.size(); i++) {\n    System.out.println(names.get(i)); // O(n) each time!\n}`,
          correctCode: `ArrayList<String> names = new ArrayList<>();\nfor (int i = 0; i < names.size(); i++) {\n    System.out.println(names.get(i)); // O(1) each time!\n}`,
          explanation: 'LinkedList.get(i) is O(n). ArrayList.get(i) is O(1). Always use ArrayList for indexed access.',
        },
      ],
      examNotes: [
        { id: 'en-12-06-1', title: 'When to Use LinkedList', content: 'LinkedList excels at addFirst/addLast/removeFirst/removeLast (all O(1)). Use for queue/stack. Avoid for random access.', importance: 'high' },
        { id: 'en-12-06-2', title: 'Memory Overhead', content: 'LinkedList uses more memory per element (two extra references). ArrayList uses less memory but may waste capacity.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-12-06-1', question: 'What is the difference between ArrayList and LinkedList?', answer: 'ArrayList uses a dynamic array with O(1) indexed access. LinkedList uses a doubly linked list with O(1) insertions at ends.', difficulty: 'easy' },
        { id: 'vq-12-06-2', question: 'Why is LinkedList rarely used in practice?', answer: 'ArrayList has better CPU cache locality. The overhead of node allocation and poor cache performance make LinkedList slower in most scenarios.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-12-06-1', type: 'mcq', question: 'What is the time complexity of LinkedList.get(index)?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correctAnswer: 'O(n)', explanation: 'LinkedList must traverse from head or tail to reach the specified index.' },
        { id: 'qc-12-06-2', type: 'true-false', question: 'LinkedList implements the Deque interface.', correctAnswer: 'True', explanation: 'LinkedList implements both List and Deque interfaces.' },
        { id: 'qc-12-06-3', type: 'mcq', question: 'Which operation is O(1) in LinkedList but O(n) in ArrayList?', options: ['get(index)', 'add at beginning', 'search', 'size()'], correctAnswer: 'add at beginning', explanation: 'LinkedList.addFirst() is O(1). ArrayList.add(0, element) is O(n).' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-12-06-1',
          scenario: 'You are implementing a print job queue where jobs are added to the end and processed from the front.',
          question: 'Which collection should you use?',
          type: 'design-decision',
          options: [
            'ArrayList for random access',
            'LinkedList for O(1) add at end and remove from front',
            'HashMap for job lookup',
            'TreeMap for sorted jobs',
          ],
          correctAnswer: 'LinkedList for O(1) add at end and remove from front',
          explanation: 'LinkedList excels as a queue with O(1) offer() at tail and O(1) poll() at head.',
          relatedConcepts: ['LinkedList', 'queue', 'deque'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-linkedlist',
      prerequisites: ['lesson-12-03'],
      xpReward: 60,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'linked-list',
      difficulty: 'easy',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-12-07',
      moduleId: 'module-12',
      title: 'Comparable vs Comparator',
      slug: 'comparable-vs-comparator',
      order: 7,
      duration: 20,
      description: 'Master natural ordering with Comparable and custom ordering with Comparator.',
      learningObjectives: [
        { id: 'lo-12-07-1', description: 'Implement Comparable for natural ordering', completed: false },
        { id: 'lo-12-07-2', description: 'Create multiple Comparators for different orderings', completed: false },
        { id: 'lo-12-07-3', description: 'Use Comparator chaining and static factory methods', completed: false },
        { id: 'lo-12-07-4', description: 'Choose between Comparable and Comparator for a given scenario', completed: false },
      ],
      englishExplanation: {
        id: 'ee-12-07',
        text: `Comparable and Comparator both define ordering, but they serve different purposes. Comparable is implemented by the element class itself and defines the natural ordering. The compareTo(T other) method returns negative (this < other), zero (this == other), or positive (this > other).\n\nComparator is a separate object that defines a custom ordering. It is NOT part of the element class. The compare(T o1, T o2) method returns the same negative/zero/positive convention.\n\nComparator advantages: Multiple orderings can be created (byName, byAge, byGpa). Separation of concerns with ordering logic separate from the data class. You can sort classes you do not own in custom ways. Comparators can be stored, passed, and reused.\n\nModern Java provides Comparator factory methods (Java 8+): Comparator.comparing(T::getter), Comparator.comparingInt(T::intGetter), .reversed(), .thenComparing(), Comparator.nullsFirst(), and Comparator.nullsLast().\n\nUse Comparable when there is one natural ordering. Use Comparator when you need multiple orderings or do not own the class.`
      },
      romanUrduExplanation: {
        id: 'ru-12-07',
        text: `Comparable aur Comparator dono ordering define karte hain lekin alag purposes ke liye. Comparable element class khud implement karti hai jo natural ordering define karta hai. Comparator ek alag object hai jo custom ordering define karta hai.\n\nComparator ke advantages: Multiple orderings bana sakte hain. Ordering logic data class se alag hai. Third-party classes ko custom ways mein sort kar sakte hain.\n\nModern Java Comparator factory methods provide karta hai: Comparator.comparing(), reversed(), thenComparing(), nullsFirst(), nullsLast().\n\nComparable use karein jab ek natural ordering ho. Comparator use karein jab multiple orderings chahiye ya class aapki na ho.`
      },
      keyPoints: [
        { id: 'kp-12-07-1', title: 'Comparable = Natural Order', description: 'Implemented by the element class. Defines one natural ordering via compareTo().' },
        { id: 'kp-12-07-2', title: 'Comparator = Custom Order', description: 'Separate class or lambda. Defines multiple orderings via compare(o1, o2).' },
        { id: 'kp-12-07-3', title: 'Comparator Chaining', description: 'Java 8+ provides comparing(), reversed(), thenComparing() for complex orderings.' },
        { id: 'kp-12-07-4', title: 'Null Handling', description: 'Comparator.nullsFirst()/nullsLast() provide null-safe ordering.' },
      ],
      codeExamples: [
        {
          id: 'ce-12-07-1',
          title: 'Comparable Implementation',
          code: `class Student implements Comparable<Student> {
    private String name;
    private int age;
    private double gpa;

    public Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }

    @Override
    public int compareTo(Student other) {
        return this.name.compareTo(other.name);
    }

    public String getName() { return name; }
    public int getAge() { return age; }

    @Override
    public String toString() {
        return name + "(age=" + age + ", gpa=" + gpa + ")";
    }
}

import java.util.TreeSet;
TreeSet<Student> byName = new TreeSet<>();
byName.add(new Student("Sara", 22, 3.9));
byName.add(new Student("Ahmed", 20, 3.7));
System.out.println("By name: " + byName);`,
          language: 'java',
          output: `By name: [Ahmed(age=20, gpa=3.7), Sara(age=22, gpa=3.9)]`,
          explanation: 'Student implements Comparable with compareTo() sorting by name alphabetically.',
        },
        {
          id: 'ce-12-07-2',
          title: 'Multiple Comparators',
          code: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class Student {
    private String name;
    private int age;
    private double gpa;

    public Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }
    public String getName() { return name; }
    public int getAge() { return age; }
    public double getGpa() { return gpa; }
    @Override
    public String toString() {
        return name + "(age=" + age + ")";
    }
}

public class ComparatorDemo {
    static Comparator<Student> BY_NAME = Comparator.comparing(Student::getName);
    static Comparator<Student> BY_AGE = Comparator.comparingInt(Student::getAge);
    static Comparator<Student> BY_AGE_THEN_NAME =
        Comparator.comparingInt(Student::getAge).thenComparing(Student::getName);

    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();
        students.add(new Student("Sara", 22, 3.9));
        students.add(new Student("Ahmed", 20, 3.7));
        students.add(new Student("Ali", 22, 3.5));

        students.sort(BY_NAME);
        System.out.println("By name: " + students);

        students.sort(BY_AGE_THEN_NAME);
        System.out.println("By age then name: " + students);

        students.sort(Comparator.comparingDouble(Student::getGpa).reversed());
        System.out.println("By GPA desc: " + students);
    }
}`,
          language: 'java',
          output: `By name: [Ahmed(age=20), Ali(age=22), Sara(age=22)]\nBy age then name: [Ahmed(age=20), Ali(age=22), Sara(age=22)]\nBy GPA desc: [Sara(age=22), Ahmed(age=20), Ali(age=22)]`,
          explanation: 'Multiple Comparators with chaining: comparingInt().thenComparing() creates complex orderings. reversed() reverses any Comparator.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-12-07-1',
          title: 'Multi-Criteria Employee Sorting',
          scenario: 'A company needs employees sorted by department first, then by salary descending.',
          oopConcept: 'Comparator.comparing(Employee::getDepartment).thenComparing(Employee::getSalary, Comparator.reverseOrder()).',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-12-07-1',
          title: 'Subtraction Overflow in compareTo',
          incorrectCode: `public int compareTo(Student other) {\n    return this.age - other.age; // OVERFLOW RISK!\n}`,
          correctCode: `public int compareTo(Student other) {\n    return Integer.compare(this.age, other.age); // Safe\n}\n// Or better: Comparator.comparingInt(s -> s.age)`,
          explanation: 'Integer subtraction can overflow. Always use Integer.compare() or Comparator factory methods.',
        },
      ],
      examNotes: [
        { id: 'en-12-07-1', title: 'compareTo Contract', content: 'compareTo must be reflexive, symmetric, transitive, and consistent with equals ideally.', importance: 'high' },
        { id: 'en-12-07-2', title: 'Modern Java Preference', content: 'Prefer Comparator factory methods over implementing Comparable for flexibility.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-12-07-1', question: 'When should you implement Comparable vs create a Comparator?', answer: 'Comparable when one natural ordering. Comparator when multiple orderings or sorting classes you do not own.', difficulty: 'medium' },
        { id: 'vq-12-07-2', question: 'What is Comparator chaining?', answer: 'Combining multiple Comparators using thenComparing(). Sorts by first criterion, then by second for ties.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-12-07-1', type: 'mcq', question: 'Where is compareTo() defined?', options: ['Comparator', 'Comparable interface', 'Object class', 'List interface'], correctAnswer: 'Comparable interface', explanation: 'compareTo() is defined in the Comparable interface.' },
        { id: 'qc-12-07-2', type: 'true-false', question: 'You can create a Comparator for a class that does not implement Comparable.', correctAnswer: 'True', explanation: 'Comparator is independent of the element class.' },
        { id: 'qc-12-07-3', type: 'mcq', question: 'What does Comparator.comparingInt(Student::getAge) return?', options: ['An int', 'A Student', 'A Comparator<Student>', 'A List<Student>'], correctAnswer: 'A Comparator<Student>', explanation: 'comparingInt() is a static factory method that creates a Comparator.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-12-07-1',
          scenario: 'An e-commerce platform needs products displayed in different orders: by price, by rating, and by name.',
          question: 'How should you implement these orderings?',
          type: 'design-decision',
          options: [
            'Implement Comparable three times',
            'Create three static Comparator fields: BY_PRICE, BY_RATING, BY_NAME',
            'Use only one natural ordering',
            'Create separate Product classes for each ordering',
          ],
          correctAnswer: 'Create three static Comparator fields: BY_PRICE, BY_RATING, BY_NAME',
          explanation: 'Separate Comparators allow multiple orderings without modifying the Product class.',
          relatedConcepts: ['Comparator', 'multiple-orderings'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-comparable-comparator',
      prerequisites: ['lesson-12-05'],
      xpReward: 60,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'sorting',
      difficulty: 'medium',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-12-08',
      moduleId: 'module-12',
      title: 'Custom Objects in Collections',
      slug: 'custom-objects-in-collections',
      order: 8,
      duration: 25,
      description: 'Learn to properly override equals() and hashCode() to use custom objects in HashSet, HashMap, and TreeSet.',
      learningObjectives: [
        { id: 'lo-12-08-1', description: 'Override equals() for logical equality', completed: false },
        { id: 'lo-12-08-2', description: 'Override hashCode() to maintain the equals-hashCode contract', completed: false },
        { id: 'lo-12-08-3', description: 'Use custom objects as HashMap keys and HashSet elements', completed: false },
        { id: 'lo-12-08-4', description: 'Understand why equals() and hashCode() must be consistent', completed: false },
      ],
      englishExplanation: {
        id: 'ee-12-08',
        text: `When you use custom objects in hash-based collections (HashSet, HashMap), you MUST override both equals() and hashCode(). Without these overrides, the collection uses reference equality (==), meaning two objects with identical data are treated as different.\n\nThe equals-hashCode contract: If a.equals(b) is true, then a.hashCode() == b.hashCode() MUST be true. If a.hashCode() == b.hashCode(), then a.equals(b) CAN be true (but not guaranteed). equals() must be reflexive, symmetric, transitive, and consistent.\n\nWhy this matters for HashMap: When you call map.put(key, value), HashMap calls key.hashCode() to find the bucket, then key.equals(existingKey) to find the exact entry. If two equal objects have different hashCodes, they go to different buckets, breaking the unique key guarantee.\n\nFor HashSet: HashSet uses HashMap internally. Each element is stored as a key with a dummy value. The same equals-hashCode rules apply.\n\nBest practice: Use IDE-generated equals() and hashCode() based on fields that define logical equality, or use Objects.hash() and Objects.equals() for cleaner code.`
      },
      romanUrduExplanation: {
        id: 'ru-12-08',
        text: `Jab aap hash-based collections (HashSet, HashMap) mein custom objects use karte hain, toh aapko MUST dono equals() aur hashCode() override karna padta hai.\n\nequals-hashCode contract: Agar a.equals(b) true hai, toh a.hashCode() == b.hashCode() MUST true hona chahiye. Agar a.hashCode() == b.hashCode(), toh a.equals(b) true HO SAKTA hai.\n\nYe HashMap ke liye kyun important hai: Jab aap map.put(key, value) call karte hain, HashMap key.hashCode() call karta hai bucket dhundne ke liye, phir key.equals(existingKey) call karta hai exact entry dhundne ke liye.\n\nBest practice: IDE-generated ya Objects.hash() aur Objects.equals() use karein.`
      },
      keyPoints: [
        { id: 'kp-12-08-1', title: 'equals() Override', description: 'Defines logical equality. Two objects with the same field values should return true.' },
        { id: 'kp-12-08-2', title: 'hashCode() Override', description: 'Must be consistent with equals(). Equal objects MUST have equal hashCodes.' },
        { id: 'kp-12-08-3', title: 'The Contract', description: 'equals() true implies hashCode() equal. Breaking this causes lost entries in hash collections.' },
        { id: 'kp-12-08-4', title: 'Hash-Based Collections', description: 'HashSet and HashMap depend entirely on equals() and hashCode().' },
      ],
      codeExamples: [
        {
          id: 'ce-12-08-1',
          title: 'Proper equals() and hashCode()',
          code: `import java.util.Objects;
import java.util.HashSet;

class Employee {
    private int id;
    private String name;
    private String department;

    public Employee(int id, String name, String department) {
        this.id = id;
        this.name = name;
        this.department = department;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Employee other = (Employee) obj;
        return id == other.id &&
               Objects.equals(name, other.name) &&
               Objects.equals(department, other.department);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, department);
    }

    @Override
    public String toString() {
        return "Employee{id=" + id + ", name='" + name + "'}";
    }

    public static void main(String[] args) {
        HashSet<Employee> set = new HashSet<>();
        set.add(new Employee(1, "Ahmed", "IT"));
        set.add(new Employee(1, "Ahmed", "IT"));
        set.add(new Employee(2, "Sara", "HR"));
        System.out.println("Set size: " + set.size()); // 2, not 3!
        System.out.println("Set: " + set);
    }
}`,
          language: 'java',
          output: `Set size: 2\nSet: [Employee{id=1, name='Ahmed'}, Employee{id=2, name='Sara'}]`,
          explanation: 'Without equals/hashCode, set size would be 3. With proper overrides, the duplicate is detected and rejected.',
        },
        {
          id: 'ce-12-08-2',
          title: 'Custom Objects as HashMap Keys',
          code: `import java.util.HashMap;
import java.util.Objects;

class Course {
    private String code;
    private String title;

    public Course(String code, String title) {
        this.code = code;
        this.title = title;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Course other = (Course) obj;
        return Objects.equals(code, other.code);
    }

    @Override
    public int hashCode() {
        return Objects.hash(code);
    }

    @Override
    public String toString() { return code; }

    public static void main(String[] args) {
        HashMap<Course, String> instructors = new HashMap<>();
        Course oop = new Course("CS101", "OOP");
        Course db = new Course("CS102", "Databases");

        instructors.put(oop, "Dr. Ali");
        instructors.put(db, "Dr. Sara");

        Course oopLookup = new Course("CS101", "OOP");
        System.out.println("Instructor for CS101: " + instructors.get(oopLookup));
    }
}`,
          language: 'java',
          output: `Instructor for CS101: Dr. Ali`,
          explanation: 'oopLookup has the same code as oop. With proper equals/hashCode, HashMap finds the entry even with a different object instance.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-12-08-1',
          title: 'Student Registration System',
          scenario: 'A university stores student records. Each student has a unique roll number. The system must identify duplicates even with different object instances.',
          oopConcept: 'Override equals() and hashCode() based on roll number. HashSet<Student> automatically prevents duplicate registrations.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-12-08-1',
          title: 'Overriding hashCode Without equals',
          incorrectCode: `class Student {\n    String name;\n    int age;\n    @Override\n    public int hashCode() {\n        return Objects.hash(name, age);\n    }\n    // Missing equals() — uses Object.equals() which is reference equality!\n}`,
          correctCode: `class Student {\n    String name;\n    int age;\n    @Override\n    public boolean equals(Object obj) {\n        if (this == obj) return true;\n        if (obj == null || getClass() != obj.getClass()) return false;\n        Student other = (Student) obj;\n        return age == other.age && Objects.equals(name, other.name);\n    }\n    @Override\n    public int hashCode() {\n        return Objects.hash(name, age);\n    }\n}`,
          explanation: 'hashCode() without equals() breaks the contract. Both must be overridden together based on the same fields.',
        },
      ],
      examNotes: [
        { id: 'en-12-08-1', title: 'equals-hashCode Contract', content: 'Equal objects must have equal hashCodes. Not vice versa. Breaking this causes lost/duplicate entries. Frequently tested.', importance: 'high' },
        { id: 'en-12-08-2', title: 'IDE Generation', content: 'Always use IDE-generated or Objects.hash()/Objects.equals() for correctness.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-12-08-1', question: 'Why must you override both equals() and hashCode() together?', answer: 'The contract states equal objects must have equal hashCodes. If you override only one, hash-based collections break.', difficulty: 'medium' },
        { id: 'vq-12-08-2', question: 'What fields should be in equals() and hashCode()?', answer: 'Only the fields that define logical equality. For a Student with rollNumber, include only rollNumber if that defines identity.', difficulty: 'medium' },
        { id: 'vq-12-08-3', question: 'Can two different objects have the same hashCode?', answer: 'Yes. hashCode() returns an int, and collisions are possible. equals() is also needed to confirm identity.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-12-08-1', type: 'mcq', question: 'What does HashSet use internally?', options: ['ArrayList', 'TreeMap', 'HashMap', 'LinkedList'], correctAnswer: 'HashMap', explanation: 'HashSet is implemented as a HashMap where elements are keys and values are a dummy Object.' },
        { id: 'qc-12-08-2', type: 'true-false', question: 'If hashCode() returns the same value for two objects, they must be equal.', correctAnswer: 'False', explanation: 'Different objects can have the same hashCode. equals() must be used to determine equality.' },
        { id: 'qc-12-08-3', type: 'mcq', question: 'Which method should you call inside equals() to compare fields?', options: ['==', 'Objects.equals()', '.equals() only', 'hashCode()'], correctAnswer: 'Objects.equals()', explanation: 'Objects.equals(a, b) is null-safe and handles null fields without NullPointerException.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-12-08-1',
          scenario: 'You have a HashSet<Person> with two Person objects that have the same name and DOB, but both appear in the set.',
          question: 'What is wrong and how do you fix it?',
          type: 'debugging',
          options: [
            'HashSet cannot store Person — use TreeSet',
            'Person does not override equals() and hashCode() — add both methods',
            'The Person objects are in different packages',
            'This is expected behavior for HashSet',
          ],
          correctAnswer: 'Person does not override equals() and hashCode() — add both methods',
          explanation: 'Without overrides, HashSet uses reference equality. Override both methods based on name and DOB.',
          relatedConcepts: ['equals', 'hashCode', 'HashSet'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-equals-hashcode',
      prerequisites: ['lesson-12-01', 'lesson-12-04'],
      xpReward: 70,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'hash-collections',
      difficulty: 'medium',
      estimatedMinutes: 25,
    },
    {
      id: 'lesson-12-09',
      moduleId: 'module-12',
      title: 'Iterator Pattern',
      slug: 'iterator-pattern',
      order: 9,
      duration: 20,
      description: 'Master the Iterator and ListIterator interfaces for traversing and modifying collections safely.',
      learningObjectives: [
        { id: 'lo-12-09-1', description: 'Use Iterator for forward traversal and removal', completed: false },
        { id: 'lo-12-09-2', description: 'Use ListIterator for bidirectional traversal', completed: false },
        { id: 'lo-12-09-3', description: 'Understand fail-fast behavior and ConcurrentModificationException', completed: false },
        { id: 'lo-12-09-4', description: 'Implement safe removal during iteration', completed: false },
      ],
      englishExplanation: {
        id: 'ee-12-09',
        text: `The Iterator pattern provides a uniform way to traverse elements in a collection without exposing its internal structure. It is one of the most important design patterns in Java Collections Framework.\n\nThe Iterator interface has three methods: hasNext() returns true if there are more elements, next() returns the next element and advances the iterator, and remove() removes the last element returned by next().\n\nListIterator extends Iterator with additional capabilities: hasPrevious() checks for a previous element, previous() returns the previous element, add() inserts an element, set() replaces the last element, and nextIndex()/previousIndex() return indices.\n\nFail-fast behavior: If a collection is structurally modified (add/remove) while being iterated, the iterator throws ConcurrentModificationException. This prevents unpredictable behavior.\n\nTo safely remove elements during iteration, you MUST use Iterator.remove(). The enhanced for-each loop throws ConcurrentModificationException if you modify the collection directly.`
      },
      romanUrduExplanation: {
        id: 'ru-12-09',
        text: `Iterator pattern collection ke elements ko traverse karne ka uniform way provide karta hai bina uski internal structure expose kiye.\n\nIterator interface ke teen methods hain: hasNext() check karta hai, next() agla element return karta hai, remove() last element remove karta hai.\n\nListIterator Iterator ko extend karta hai additional capabilities ke saath: hasPrevious(), previous(), add(), set(), nextIndex(), previousIndex().\n\nFail-fast behavior: Agar collection iterate karte waqt structurally modify kiya jaaye, toh iterator ConcurrentModificationException throw karta hai.\n\nSafely remove karne ke liye Iterator.remove() use karein.`
      },
      keyPoints: [
        { id: 'kp-12-09-1', title: 'Iterator Interface', description: 'hasNext(), next(), and remove(). The fundamental mechanism for traversing any collection.' },
        { id: 'kp-12-09-2', title: 'ListIterator', description: 'Bidirectional traversal with add(), set(), previous(). Only for List implementations.' },
        { id: 'kp-12-09-3', title: 'Fail-Fast', description: 'Iterator throws ConcurrentModificationException if collection is modified during iteration.' },
        { id: 'kp-12-09-4', title: 'Safe Removal', description: 'Use Iterator.remove() instead of Collection.remove() during iteration.' },
      ],
      codeExamples: [
        {
          id: 'ce-12-09-1',
          title: 'Iterator Forward Traversal',
          code: `import java.util.ArrayList;
import java.util.Iterator;

public class IteratorDemo {
    public static void main(String[] args) {
        ArrayList<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Cherry");

        Iterator<String> it = fruits.iterator();
        while (it.hasNext()) {
            System.out.println("Processing: " + it.next());
        }

        System.out.println("Removing B fruits:");
        it = fruits.iterator();
        while (it.hasNext()) {
            String fruit = it.next();
            if (fruit.startsWith("B")) {
                it.remove();
            }
        }
        System.out.println("Remaining: " + fruits);
    }
}`,
          language: 'java',
          output: `Processing: Apple\nProcessing: Banana\nProcessing: Cherry\nRemoving B fruits:\nRemaining: [Apple, Cherry]`,
          explanation: 'Iterator provides hasNext()/next() for traversal. remove() safely removes without ConcurrentModificationException.',
        },
        {
          id: 'ce-12-09-2',
          title: 'ListIterator Bidirectional',
          code: `import java.util.ArrayList;
import java.util.ListIterator;

public class ListIteratorDemo {
    public static void main(String[] args) {
        ArrayList<String> colors = new ArrayList<>();
        colors.add("Red");
        colors.add("Green");
        colors.add("Blue");

        ListIterator<String> it = colors.listIterator();
        System.out.println("Forward:");
        while (it.hasNext()) {
            System.out.println("Index " + it.nextIndex() + ": " + it.next());
        }

        System.out.println("Backward:");
        while (it.hasPrevious()) {
            System.out.println("Index " + it.previousIndex() + ": " + it.previous());
        }

        it = colors.listIterator();
        it.next();
        it.set("Crimson");
        System.out.println("After set: " + colors);
    }
}`,
          language: 'java',
          output: `Forward:\nIndex 0: Red\nIndex 1: Green\nIndex 2: Blue\nBackward:\nIndex 2: Blue\nIndex 1: Green\nIndex 0: Red\nAfter set: [Crimson, Green, Blue]`,
          explanation: 'ListIterator enables bidirectional traversal, set() for replacement, and index access.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-12-09-1',
          title: 'Menu Navigation System',
          scenario: 'A restaurant application needs to navigate through menu items forward and backward.',
          oopConcept: 'ListIterator provides bidirectional navigation. hasPrevious()/previous() for going back, next() for going forward.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-12-09-1',
          title: 'Modifying Collection During For-Each Loop',
          incorrectCode: `for (String item : list) {\n    if (item.equals("B")) {\n        list.remove(item); // ConcurrentModificationException!\n    }\n}`,
          correctCode: `Iterator<String> it = list.iterator();\nwhile (it.hasNext()) {\n    String item = it.next();\n    if (item.equals("B")) {\n        it.remove(); // Safe!\n    }\n}`,
          explanation: 'The for-each loop uses an Iterator internally. Calling list.remove() directly causes ConcurrentModificationException.',
        },
      ],
      examNotes: [
        { id: 'en-12-09-1', title: 'Fail-Fast Iterator', content: 'Structural modification during iteration throws ConcurrentModificationException. This is a design choice for thread safety.', importance: 'high' },
        { id: 'en-12-09-2', title: 'Iterator vs ListIterator', content: 'Iterator: forward only, remove(). ListIterator: bidirectional, add(), set(), index access.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-12-09-1', question: 'What is fail-fast behavior?', answer: 'If a collection is modified during iteration, the iterator throws ConcurrentModificationException to prevent data corruption.', difficulty: 'medium' },
        { id: 'vq-12-09-2', question: 'How do you safely remove elements during iteration?', answer: 'Use Iterator.remove() instead of Collection.remove().', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-12-09-1', type: 'mcq', question: 'What exception is thrown during iteration modification?', options: ['NullPointerException', 'ConcurrentModificationException', 'UnsupportedOperationException', 'IllegalStateException'], correctAnswer: 'ConcurrentModificationException', explanation: 'Fail-fast iterators detect structural modifications and throw ConcurrentModificationException.' },
        { id: 'qc-12-09-2', type: 'true-false', question: 'Calling set() during iteration is a structural modification.', correctAnswer: 'False', explanation: 'set() replaces an element without changing the collection size.' },
        { id: 'qc-12-09-3', type: 'mcq', question: 'Which method enables bidirectional traversal?', options: ['hasNext()', 'next()', 'hasPrevious()', 'remove()'], correctAnswer: 'hasPrevious()', explanation: 'hasPrevious() and previous() enable backward traversal in ListIterator.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-12-09-1',
          scenario: 'You have a list of active users. Some users log out during a batch notification process.',
          question: 'How should you iterate and modify the list safely?',
          type: 'design-decision',
          options: [
            'Use enhanced for-each and call list.remove()',
            'Use Iterator and call it.remove() for logged-out users',
            'Use a for loop with index and list.remove(index)',
            'Create a new list and copy only active users',
          ],
          correctAnswer: 'Use Iterator and call it.remove() for logged-out users',
          explanation: 'Iterator.remove() is the safe way to remove elements during iteration.',
          relatedConcepts: ['Iterator', 'fail-fast', 'safe-removal'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-iterator',
      prerequisites: ['lesson-12-03', 'lesson-12-06'],
      xpReward: 60,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'iterator-traversal',
      difficulty: 'medium',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-12-10',
      moduleId: 'module-12',
      title: 'Collections Utility Methods',
      slug: 'collections-utility-methods',
      order: 10,
      duration: 20,
      description: 'Master the Collections class utility methods: sort, reverse, shuffle, unmodifiable, and more.',
      learningObjectives: [
        { id: 'lo-12-10-1', description: 'Use Collections.sort() with natural and custom ordering', completed: false },
        { id: 'lo-12-10-2', description: 'Apply reverse, shuffle, and rotate operations', completed: false },
        { id: 'lo-12-10-3', description: 'Create unmodifiable and synchronized collections', completed: false },
        { id: 'lo-12-10-4', description: 'Use binarySearch and min/max utility methods', completed: false },
      ],
      englishExplanation: {
        id: 'ee-12-10',
        text: `The Collections class (plural, not Collection) provides static utility methods for working with collection objects. These methods simplify common operations.\n\nSorting and ordering: Collections.sort(list) sorts using natural ordering. Collections.sort(list, comparator) sorts using custom Comparator. Collections.reverse(list) reverses the list in place. Collections.shuffle(list) randomizes the order. Collections.rotate(list, distance) rotates elements.\n\nSearching: Collections.binarySearch(list, key) performs binary search on a sorted list in O(log n). Collections.frequency(collection, obj) counts occurrences.\n\nCreating collections: Collections.emptyList() returns an immutable empty list. Collections.singletonList(item) returns an immutable single-item list. Collections.unmodifiableList(list) returns a read-only view.\n\nSynchronization: Collections.synchronizedList(list) wraps a list with synchronization for thread safety. Collections.synchronizedMap(map) and synchronizedSet(set) do the same for maps and sets.\n\nMin/Max: Collections.min(collection) and Collections.max(collection) return the minimum and maximum elements.\n\nJava 8+ also introduced List.sort(), List.copyOf(), and other methods that complement Collections utility methods.`
      },
      romanUrduExplanation: {
        id: 'ru-12-10',
        text: `Collections class (plural, Collection NAHI) collection objects par kaam karne ke liye static utility methods provide karti hai.\n\nSorting aur ordering: Collections.sort(list) natural ordering se sort karta hai. Collections.reverse(list) reverse karta hai. Collections.shuffle(list) randomize karta hai.\n\nSearching: Collections.binarySearch(list, key) sorted list par binary search O(log n) mein karta hai. Collections.frequency() occurrences count karta hai.\n\nCollections create karne ke liye: Collections.emptyList() immutable empty list. Collections.unmodifiableList(list) read-only view.\n\nSynchronization: Collections.synchronizedList(list) thread-safe wrapper provide karta hai.\n\nMin/Max: Collections.min(collection) aur Collections.max(collection) minimum aur maximum elements return karte hain.`
      },
      keyPoints: [
        { id: 'kp-12-10-1', title: 'sort() Methods', description: 'Collections.sort(list) for natural ordering, sort(list, comparator) for custom ordering.' },
        { id: 'kp-12-10-2', title: 'Unmodifiable Views', description: 'unmodifiableList/Map/Set return views that throw UnsupportedOperationException on modification.' },
        { id: 'kp-12-10-3', title: 'Synchronized Wrappers', description: 'synchronizedList/Map/Set provide thread-safe wrappers but are not fully thread-safe.' },
        { id: 'kp-12-10-4', title: 'binarySearch', description: 'Requires the list to be sorted. Use Collections.sort() first.' },
      ],
      codeExamples: [
        {
          id: 'ce-12-10-1',
          title: 'Sorting and Shuffling',
          code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

public class SortDemo {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>();
        numbers.add(50);
        numbers.add(10);
        numbers.add(40);
        numbers.add(20);
        numbers.add(30);
        System.out.println("Original: " + numbers);

        Collections.sort(numbers);
        System.out.println("Sorted: " + numbers);

        Collections.reverse(numbers);
        System.out.println("Reversed: " + numbers);

        Collections.shuffle(numbers);
        System.out.println("Shuffled: " + numbers);

        ArrayList<String> names = new ArrayList<>();
        names.add("Sara");
        names.add("Ahmed");
        names.add("Ali");
        names.sort(Comparator.comparingInt(String::length));
        System.out.println("By length: " + names);

        Collections.rotate(names, 1);
        System.out.println("Rotated: " + names);
    }
}`,
          language: 'java',
          output: `Original: [50, 10, 40, 20, 30]\nSorted: [10, 20, 30, 40, 50]\nReversed: [50, 40, 30, 20, 10]\nShuffled: [random order]\nBy length: [Ali, Sara, Ahmed]\nRotated: [Ahmed, Ali, Sara]`,
          explanation: 'Collections.sort(), reverse(), shuffle(), and List.sort() with Comparator demonstrated.',
        },
        {
          id: 'ce-12-10-2',
          title: 'Unmodifiable and Search',
          code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class UtilityDemo {
    public static void main(String[] args) {
        ArrayList<String> mutable = new ArrayList<>();
        mutable.add("Ahmed");
        mutable.add("Sara");

        List<String> readOnly = Collections.unmodifiableList(mutable);
        System.out.println("Read-only: " + readOnly);
        // readOnly.add("Ali"); // UnsupportedOperationException!

        mutable.add("Ali");
        System.out.println("Original: " + mutable);
        System.out.println("Read-only view: " + readOnly);

        Collections.sort(mutable);
        int index = Collections.binarySearch(mutable, "Sara");
        System.out.println("Sara found at index: " + index);

        System.out.println("Min: " + Collections.min(mutable));
        System.out.println("Max: " + Collections.max(mutable));

        System.out.println("Frequency of Ali: " + Collections.frequency(mutable, "Ali"));
    }
}`,
          language: 'java',
          output: `Read-only: [Ahmed, Sara]\nOriginal: [Ahmed, Sara, Ali]\nRead-only view: [Ahmed, Sara, Ali]\nSara found at index: 2\nMin: Ahmed\nMax: Sara\nFrequency of Ali: 1`,
          explanation: 'unmodifiableList(), binarySearch() on sorted list, min(), max(), and frequency() demonstrated.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-12-10-1',
          title: 'Card Deck Shuffling',
          scenario: 'A card game needs a deck of 52 cards, shuffled before dealing, and sorted for display.',
          oopConcept: 'ArrayList<Card> holds all cards. Collections.shuffle(deck) randomizes before each game. Collections.sort(deck, comparator) sorts by suit and rank.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-12-10-1',
          title: 'Assuming Unmodifiable Is Immutable',
          incorrectCode: `List<String> original = new ArrayList<>();\noriginal.add("A");\nList<String> unmod = Collections.unmodifiableList(original);\noriginal.add("B");\nSystem.out.println(unmod); // [A, B] — data changed!`,
          correctCode: `List<String> original = new ArrayList<>();\noriginal.add("A");\nList<String> immutable = List.copyOf(original);\noriginal.add("B");\nSystem.out.println(immutable); // [A] — truly immutable`,
          explanation: 'unmodifiableList() is a view. The original list can still be changed. Use List.copyOf() (Java 10+) for truly immutable copies.',
        },
      ],
      examNotes: [
        { id: 'en-12-10-1', title: 'Unmodifiable vs Immutable', content: 'unmodifiableList() is a view that rejects modifications to the wrapper. The original list can still change. List.copyOf() (Java 10+) creates a truly immutable copy.', importance: 'high' },
        { id: 'en-12-10-2', title: 'binarySearch Prerequisite', content: 'binarySearch() requires a sorted list. Sort first with Collections.sort() or the result is undefined.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-12-10-1', question: 'What is the difference between unmodifiableList and List.copyOf?', answer: 'unmodifiableList is a view of the original list; changes to the original affect the view. List.copyOf creates a truly independent immutable copy.', difficulty: 'medium' },
        { id: 'vq-12-10-2', question: 'When should you use Collections.synchronizedList?', answer: 'When you need a thread-safe list. But for better concurrent performance, consider CopyOnWriteArrayList or ConcurrentHashMap.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-12-10-1', type: 'mcq', question: 'What does Collections.sort() require for custom ordering?', options: ['Comparable', 'Comparator', 'Iterator', 'Serializable'], correctAnswer: 'Comparator', explanation: 'Collections.sort(list, comparator) accepts a Comparator for custom ordering.' },
        { id: 'qc-12-10-2', type: 'true-false', question: 'Collections.shuffle() randomizes the list in place.', correctAnswer: 'True', explanation: 'shuffle() modifies the original list by randomizing element positions.' },
        { id: 'qc-12-10-3', type: 'mcq', question: 'What prerequisite does binarySearch require?', options: ['ArrayList', 'LinkedList', 'Sorted list', 'Non-empty list'], correctAnswer: 'Sorted list', explanation: 'binarySearch() requires the list to be sorted in natural or Comparator-defined order.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-12-10-1',
          scenario: 'You need to expose a list of configuration settings to multiple threads. The settings should be readable but not modifiable by external code.',
          question: 'Which utility method should you use?',
          type: 'design-decision',
          options: [
            'Collections.sort()',
            'Collections.unmodifiableList()',
            'Collections.shuffle()',
            'Collections.synchronizedList()',
          ],
          correctAnswer: 'Collections.unmodifiableList()',
          explanation: 'unmodifiableList() returns a read-only view that throws UnsupportedOperationException on modification attempts.',
          relatedConcepts: ['unmodifiable', 'encapsulation', 'thread-safety'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-collections-utils',
      prerequisites: ['lesson-12-03', 'lesson-12-04'],
      xpReward: 60,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'collection-utilities',
      difficulty: 'easy',
      estimatedMinutes: 20,
    },
  ],
};
