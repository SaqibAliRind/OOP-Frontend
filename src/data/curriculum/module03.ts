import type { Module } from '@/types';

export const module03: Module = {
  id: 'module-03',
  title: 'Constructors',
  slug: 'constructors',
  order: 3,
  description: 'Master Java constructors: from basic creation to advanced patterns like chaining, copy constructors, factory methods, and the builder pattern.',
  icon: 'Wrench',
  color: '#f59e0b',
  xpReward: 650,
  isUnlocked: true,
  completed: false,
  progress: 0,
  totalDuration: 200,
  prerequisiteModuleIds: ['module-01', 'module-02'],
  lessons: [
    {
      id: 'lesson-03-01',
      moduleId: 'module-03',
      title: 'What is a Constructor?',
      slug: 'what-is-a-constructor',
      order: 1,
      duration: 20,
      description: 'Understand the purpose, syntax, and behavior of constructors including the default constructor.',
      learningObjectives: [
        { id: 'lo-03-01-1', description: 'Define what a constructor is and its purpose', completed: false },
        { id: 'lo-03-01-2', description: 'Write constructors with proper syntax', completed: false },
        { id: 'lo-03-01-3', description: 'Understand the default constructor provided by Java', completed: false },
        { id: 'lo-03-01-4', description: 'Differentiate between constructors and methods', completed: false },
      ],
      englishExplanation: {
        id: 'ee-03-01',
        text: `A **constructor** is a special block of code that is called when an object is created using the \`new\` keyword. Its primary purpose is to initialize the object's fields with starting values, ensuring the object begins its life in a valid state.

**Syntax Rules**:
1. The constructor name MUST match the class name exactly
2. A constructor has NO return type (not even void)
3. A constructor is called automatically when using \`new\`
4. If you don't write any constructor, Java provides a **default no-argument constructor**

**Default Constructor**: When you write a class with no constructors, Java automatically adds:
\`\`\`java
public ClassName() { }
\`\`\`
This default constructor does nothing — it simply creates an empty object with default field values (0, null, false, 0.0).

**Constructor vs Method**:
- Constructor: Same name as class, no return type, called with new, initializes objects
- Method: Any name, has return type, called on object/class, performs actions

**When is a constructor called?**
\`\`\`java
Student s = new Student();  // constructor called here
\`\`\`
The moment \`new\` is executed, the JVM allocates memory, then calls the constructor to initialize the object.

**Constructor Overloading**: A class can have multiple constructors with different parameter lists. This allows objects to be created in different ways with different initial data.

Constructors are the foundation of object initialization. Without proper constructors, objects may start in invalid or incomplete states, leading to bugs throughout the program.`
      },
      romanUrduExplanation: {
        id: 'ru-03-01',
        text: `**Constructor** ek special code block hai jo tab call hota hai jab \`new\` keyword se object create hota hai. Iska maqsad object ki fields ko starting values se initialize karna hai.

**Syntax Rules**:
1. Constructor ka naam class ke naam se EXACTLY match hona chahiye
2. Constructor ka koi return type nahi hota (void bhi nahi)
3. Constructor \`new\` se call hota hai automatically
4. Agar aap koi constructor nahi likhte, toh Java **default no-argument constructor** deta hai

**Default Constructor**: Jab aap class mein koi constructor nahi likhte, toh Java automatically ye add karta hai:
\`\`\`java
public ClassName() { }
\`\`\`
Ye kuch nahi karta — sirf empty object create karta hai default field values ke saath.

**Constructor vs Method**:
- Constructor: Class ke naam ka, koi return type nahi, new se call hota hai
- Method: Koi bhi naam, return type hota hai, object/class par call hota hai

**Constructor kab call hota hai?**
\`\`\`java
Student s = new Student();  // yahan constructor call hota hai
\`\`\`
Jab \`new\` execute hota hai, JVM memory allocate karta hai, phir constructor call karta hai.

**Constructor Overloading**: Ek class ke multiple constructors ho sakte hain alag parameter lists ke saath.`
      },
      keyPoints: [
        { id: 'kp-03-01-1', title: 'Purpose', description: 'Constructors initialize objects when they are created using the new keyword.' },
        { id: 'kp-03-01-2', title: 'Syntax', description: 'Same name as class, no return type, called with new.' },
        { id: 'kp-03-01-3', title: 'Default Constructor', description: 'Java provides one automatically if no constructors are defined.' },
        { id: 'kp-03-01-4', title: 'Constructor vs Method', description: 'Constructors initialize, methods perform actions. Constructors have no return type.' },
      ],
      codeExamples: [
        {
          id: 'ce-03-01-1',
          title: 'Basic Constructor Usage',
          code: `public class Student {
    private String name;
    private int age;
    private double gpa;

    // Constructor — same name as class, no return type
    public Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
        System.out.println("Student created: " + name);
    }

    public void display() {
        System.out.println(name + " (age " + age + ", gpa: " + gpa + ")");
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("Ahmed", 20, 3.7);
        s1.display();

        Student s2 = new Student("Sara", 22, 3.9);
        s2.display();
    }
}`,
          language: 'java',
          output: 'Student created: Ahmed\nAhmed (age 20, gpa: 3.7)\nStudent created: Sara\nSara (age 22, gpa: 3.9)',
          explanation: 'The constructor is called automatically when new is used. It initializes the fields and prints a message.',
        },
        {
          id: 'ce-03-01-2',
          title: 'Default Constructor Demo',
          code: `class Box {
    // No constructor defined — Java provides default
    int width;
    int height;
    int depth;

    void display() {
        System.out.println(width + " x " + height + " x " + depth);
    }
}

public class Main {
    public static void main(String[] args) {
        Box b = new Box();  // default constructor called
        b.width = 10;
        b.height = 20;
        b.depth = 30;
        b.display();  // 10 x 20 x 30
    }
}`,
          language: 'java',
          output: '10 x 20 x 30',
          explanation: 'When no constructor is defined, Java provides a default no-argument constructor. Fields have default values (0 for int).',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-03-01-1',
          title: 'Car Manufacturing',
          scenario: 'A car factory (constructor) takes specifications and produces a fully assembled car (object). Without the factory, you cannot get a car.',
          oopConcept: 'The constructor is the factory — it builds and initializes the object.',
        },
        {
          id: 'rwe-03-01-2',
          title: 'Database Connection',
          scenario: 'Creating a database connection requires host, port, username, password. The constructor takes these parameters and establishes the connection.',
          oopConcept: 'The constructor ensures all required data is provided at creation time.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-03-01-1',
          title: 'Adding Return Type to Constructor',
          incorrectCode: `class Student {
    public void Student(String name) {  // ERROR: this is a METHOD, not a constructor
        this.name = name;
    }
}`,
          correctCode: `class Student {
    public Student(String name) {  // OK: constructor (no return type)
        this.name = name;
    }
}`,
          explanation: 'Adding void or any return type makes it a regular method, not a constructor. The constructor is never called with new.',
        },
        {
          id: 'cm-03-01-2',
          title: 'Expecting Default Constructor After Adding Any Constructor',
          incorrectCode: `class Student {
    String name;
    public Student(String name) { this.name = name; }
}

// Student s = new Student();  // ERROR: no default constructor`,
          correctCode: `class Student {
    String name;
    public Student() { this.name = "Unknown"; }
    public Student(String name) { this.name = name; }
}

Student s = new Student();  // OK: explicit no-arg constructor`,
          explanation: 'Java only provides default constructor when NO constructors are defined. Once you add any constructor, you must also add no-arg if needed.',
        },
      ],
      examNotes: [
        { id: 'en-03-01-1', title: 'Constructor Rules', content: 'Same name as class, no return type, called with new. Default provided only when no constructors exist.', importance: 'high' },
        { id: 'en-03-02-2', title: 'Constructor vs Method', content: 'Constructors initialize. Methods perform actions. Adding return type makes it a method.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-03-01-1', question: 'What is a constructor?', answer: 'A special block called when an object is created with new. Same name as class, no return type. Initializes the object.', difficulty: 'easy' },
        { id: 'vq-03-01-2', question: 'When does Java provide a default constructor?', answer: 'Only when no constructors are defined. Once you add any constructor, Java stops providing the default.', difficulty: 'medium' },
        { id: 'vq-03-01-3', question: 'What happens if you add void to a constructor?', answer: 'It becomes a regular method, not a constructor. It will never be called automatically by new.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-03-01-1', type: 'mcq', question: 'What is true about constructors?', options: ['They have a return type', 'Same name as class', 'Called explicitly by name', 'They are static'], correctAnswer: 'Same name as class', explanation: 'Constructors must have the same name as the class and no return type.' },
        { id: 'qc-03-01-2', type: 'true-false', question: 'Java always provides a default constructor.', correctAnswer: 'False', explanation: 'Only when no constructors are defined.' },
        { id: 'qc-03-01-3', type: 'mcq', question: 'When is a constructor called?', options: ['When the program starts', 'When new is used', 'When the object is destroyed', 'Manually by name'], correctAnswer: 'When new is used', explanation: 'The constructor is called automatically when creating an object with new.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-03-01-1',
          scenario: 'You create a class Account with no constructors defined. What happens when you write Account a = new Account();?',
          question: 'What occurs?',
          type: 'concept-application',
          options: [
            'Java provides a default no-arg constructor',
            'Compilation error — no constructor defined',
            'Runtime error',
            'Fields are initialized to random values',
          ],
          correctAnswer: 'Java provides a default no-arg constructor',
          explanation: 'When no constructors are defined, Java automatically provides a public no-argument constructor.',
          relatedConcepts: ['default-constructor', 'object-creation'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-constructor-intro',
      prerequisites: ['lesson-02-01', 'lesson-02-02'],
      xpReward: 60,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'constructor',
      difficulty: 'easy',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-03-02',
      moduleId: 'module-03',
      title: 'Parameterized Constructors',
      slug: 'parameterized-constructors',
      order: 2,
      duration: 18,
      description: 'Learn how to pass values during object creation to initialize objects with specific data.',
      learningObjectives: [
        { id: 'lo-03-02-1', description: 'Write constructors that accept parameters', completed: false },
        { id: 'lo-03-02-2', description: 'Pass different types of data during object creation', completed: false },
        { id: 'lo-03-02-3', description: 'Validate constructor parameters', completed: false },
      ],
      englishExplanation: {
        id: 'ee-03-02',
        text: `**Parameterized constructors** accept arguments that are used to initialize the object's fields. Instead of creating an object with default values and then setting each field individually, a parameterized constructor lets you set all values at creation time.

\`\`\`java
Student s = new Student("Ahmed", 20, 3.7);
\`\`\`

This is cleaner and safer than:
\`\`\`java
Student s = new Student();
s.setName("Ahmed");
s.setAge(20);
s.setGpa(3.7);
\`\`\`

**Advantages of Parameterized Constructors**:
1. **Conciseness**: One line instead of multiple setter calls
2. **Validation**: Can validate all parameters at once before creating the object
3. **Immutable fields**: Can set final fields that cannot be changed later
4. **Atomic initialization**: Object is fully initialized when the constructor returns
5. **Fail-fast**: Invalid data is rejected immediately

**Validation in Constructors**: Always validate constructor parameters. If the data is invalid, throw an exception rather than creating a corrupt object.

**Final Fields**: Declare fields as \`final\` to make them unchangeable after construction. Final fields MUST be assigned in the constructor.

\`\`\`java
private final String accountNumber;  // cannot change after creation
\`\`\`

Parameterized constructors ensure objects start their life with valid, meaningful data rather than empty or default values that may not make sense for the business logic.`
      },
      romanUrduExplanation: {
        id: 'ru-03-02',
        text: `**Parameterized constructors** arguments accept karte hain jo object ki fields ko initialize karte hain. Object creation ke saath hi saari values set ho jaati hain.

**Advantages**:
1. **Conciseness**: Ek line mein sab set ho jaata hai
2. **Validation**: Sab parameters ek saath validate kar sakte hain
3. **Immutable fields**: Final fields constructor mein set kar sakte hain
4. **Atomic initialization**: Object fully initialized hota hai
5. **Fail-fast**: Invalid data turant reject hota hai

**Validation**: Hamesha constructor parameters validate karein. Agar data invalid ho toh exception throw karein.

**Final Fields**: \`final\` keyword se fields ko construction ke baad change nahi kar sakte.`
      },
      keyPoints: [
        { id: 'kp-03-02-1', title: 'Parameter Passing', description: 'Constructors accept parameters to initialize fields with specific values.' },
        { id: 'kp-03-02-2', title: 'Validation', description: 'Always validate constructor parameters to prevent invalid object state.' },
        { id: 'kp-03-02-3', title: 'Final Fields', description: 'Fields declared final must be assigned in the constructor and cannot change.' },
        { id: 'kp-03-02-4', title: 'Atomic Initialization', description: 'Object is fully initialized when constructor completes.' },
      ],
      codeExamples: [
        {
          id: 'ce-03-02-1',
          title: 'Parameterized Constructor with Validation',
          code: `public class Student {
    private final String name;
    private final int age;
    private double gpa;

    public Student(String name, int age, double gpa) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
        if (age < 15 || age > 100) {
            throw new IllegalArgumentException("Age must be between 15 and 100");
        }
        if (gpa < 0.0 || gpa > 4.0) {
            throw new IllegalArgumentException("GPA must be between 0 and 4");
        }
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }

    public void display() {
        System.out.println(name + " (age " + age + ", gpa: " + gpa + ")");
    }

    public String getName() { return name; }
    public int getAge() { return age; }
    public double getGpa() { return gpa; }
}`,
          language: 'java',
          explanation: 'Constructor validates all parameters. name and age are final — set once and never change.',
        },
        {
          id: 'ce-03-02-2',
          title: 'Creating Validated Objects',
          code: `public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("Ahmed", 20, 3.7);
        s1.display();

        try {
            Student s2 = new Student("", 20, 3.0);  // throws exception
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }

        try {
            Student s3 = new Student("Sara", 10, 3.5);  // age invalid
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
          language: 'java',
          output: 'Ahmed (age 20, gpa: 3.7)\nError: Name cannot be empty\nError: Age must be between 15 and 100',
          explanation: 'Invalid data is rejected immediately. Objects can only be created with valid data.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-03-02-1',
          title: 'Bank Account Creation',
          scenario: 'Creating an account requires owner name, initial balance, and account type. Invalid data (negative balance) must be rejected.',
          oopConcept: 'Parameterized constructor with validation ensures every account starts valid.',
        },
        {
          id: 'rwe-03-02-2',
          title: 'Immutable Configuration',
          scenario: 'A config object with server URL, port, and timeout. All fields are final — set in constructor, never changed.',
          oopConcept: 'Parameterized constructor with final fields creates truly immutable objects.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-03-02-1',
          title: 'Not Validating Constructor Parameters',
          incorrectCode: `class Student {
    String name;
    int age;
    Student(String name, int age) {
        this.name = name;  // could be null
        this.age = age;    // could be negative
    }
}`,
          correctCode: `class Student {
    String name;
    int age;
    Student(String name, int age) {
        if (name == null || name.isEmpty()) throw new IllegalArgumentException("Name required");
        if (age < 0) throw new IllegalArgumentException("Invalid age");
        this.name = name;
        this.age = age;
    }
}`,
          explanation: 'Without validation, objects can be created with invalid state that causes bugs later.',
        },
      ],
      examNotes: [
        { id: 'en-03-02-1', title: 'Parameterized Constructor', content: 'Accepts arguments to initialize fields. Always validate parameters. Use for objects needing specific initial data.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-03-02-1', question: 'Why use parameterized constructors?', answer: 'For concise initialization, validation at creation, setting final fields, and ensuring objects start in valid state.', difficulty: 'easy' },
        { id: 'vq-03-02-2', question: 'Should constructors validate parameters?', answer: 'Yes. Always validate to prevent invalid object state. Throw exceptions for invalid data.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-03-02-1', type: 'mcq', question: 'Can final fields be set in a constructor?', options: ['No, never', 'Yes, must be set there', 'Only in static context', 'Only after construction'], correctAnswer: 'Yes, must be set there', explanation: 'Final fields can only be assigned in the constructor (or at declaration).' },
        { id: 'qc-03-02-2', type: 'true-false', question: 'Constructors should validate their parameters.', correctAnswer: 'True', explanation: 'Validation prevents creation of objects with invalid state.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-03-02-1',
          scenario: 'You need to create a Color class with red, green, blue values (0-255). Each color must have valid RGB values.',
          question: 'How should the constructor work?',
          type: 'design-decision',
          options: [
            'Validate all three parameters are between 0-255',
            'Accept any values, validate later',
            'Use only default values',
            'Set all to 0',
          ],
          correctAnswer: 'Validate all three parameters are between 0-255',
          explanation: 'Constructor validation ensures every Color object is valid.',
          relatedConcepts: ['parameterized-constructor', 'validation'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-parameterized',
      prerequisites: ['lesson-03-01'],
      xpReward: 55,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'parameter-passing',
      difficulty: 'easy',
      estimatedMinutes: 18,
    },
    {
      id: 'lesson-03-03',
      moduleId: 'module-03',
      title: 'Constructor Overloading',
      slug: 'constructor-overloading',
      order: 3,
      duration: 18,
      description: 'Create multiple constructors with different parameter lists to provide flexible object creation.',
      learningObjectives: [
        { id: 'lo-03-03-1', description: 'Define constructor overloading', completed: false },
        { id: 'lo-03-03-2', description: 'Create multiple constructors with different parameter lists', completed: false },
        { id: 'lo-03-03-3', description: 'Call one constructor from another using this()', completed: false },
      ],
      englishExplanation: {
        id: 'ee-03-03',
        text: `**Constructor overloading** means having multiple constructors in a class with different parameter lists. This is the same concept as method overloading applied to constructors.

A class can have:
- A no-argument constructor: \`Student()\`
- A one-argument constructor: \`Student(String name)\`
- A two-argument constructor: \`Student(String name, int age)\`
- A three-argument constructor: \`Student(String name, int age, double gpa)\`

Each constructor initializes the object differently based on the data provided. This gives callers flexibility in how they create objects.

**Calling Other Constructors with this()**: One constructor can call another using \`this()\`. This avoids duplicating initialization logic. The \`this()\` call must be the first statement.

**Benefits**:
1. **Flexibility**: Create objects with different combinations of data
2. **Default values**: Provide sensible defaults when not all data is available
3. **Code reuse**: Delegation eliminates duplicate initialization logic
4. **Backward compatibility**: Old code using fewer parameters still works

This pattern is extremely common in professional Java development. Most well-designed classes have multiple constructors.`
      },
      romanUrduExplanation: {
        id: 'ru-03-03',
        text: `**Constructor overloading** ka matlab hai ek class mein multiple constructors rakhna alag parameter lists ke saath.

Ek class ke ho sakte hain:
- No-argument constructor: \`Student()\`
- One-argument: \`Student(String name)\`
- Two-argument: \`Student(String name, int age)\`

Har constructor object ko alag tarike se initialize karta hai.

**this() se Calling**: Ek constructor doosre ko \`this()\` se call kar sakta hai. Ye code duplication avoid karta hai. \`this()\` first statement honi chahiye.

**Benefits**: Flexibility, default values, code reuse, backward compatibility.`
      },
      keyPoints: [
        { id: 'kp-03-03-1', title: 'Multiple Constructors', description: 'Different parameter lists allow different ways to create objects.' },
        { id: 'kp-03-03-2', title: 'this() Delegation', description: 'One constructor calls another using this(). Must be first statement.' },
        { id: 'kp-03-03-3', title: 'Flexibility', description: 'Callers can create objects with different amounts of data.' },
        { id: 'kp-03-03-4', title: 'Default Values', description: 'Provide sensible defaults when not all data is available.' },
      ],
      codeExamples: [
        {
          id: 'ce-03-03-1',
          title: 'Constructor Overloading with Delegation',
          code: `public class Student {
    private String name;
    private int age;
    private double gpa;
    private String department;

    // Full constructor
    public Student(String name, int age, double gpa, String department) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
        this.department = department;
    }

    // 3-arg delegates to 4-arg with default department
    public Student(String name, int age, double gpa) {
        this(name, age, gpa, "General");
    }

    // 2-arg delegates to 3-arg with default gpa
    public Student(String name, int age) {
        this(name, age, 0.0);
    }

    // 1-arg delegates to 2-arg with default age
    public Student(String name) {
        this(name, 18);
    }

    // No-arg delegates to 1-arg with default name
    public Student() {
        this("Unknown");
    }

    public void display() {
        System.out.println(name + " (age " + age + ", gpa: " + gpa + ", dept: " + department + ")");
    }
}`,
          language: 'java',
          explanation: 'Each constructor delegates to the most detailed one using this(). This avoids duplicating initialization logic.',
        },
        {
          id: 'ce-03-03-2',
          title: 'Using Overloaded Constructors',
          code: `public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("Ahmed", 20, 3.7, "CS");
        s1.display();  // Ahmed (age 20, gpa: 3.7, dept: CS)

        Student s2 = new Student("Sara", 22, 3.9);
        s2.display();  // Sara (age 22, gpa: 3.9, dept: General)

        Student s3 = new Student("Ali", 19);
        s3.display();  // Ali (age 19, gpa: 0.0, dept: General)

        Student s4 = new Student("Zara");
        s4.display();  // Zara (age 18, gpa: 0.0, dept: General)

        Student s5 = new Student();
        s5.display();  // Unknown (age 18, gpa: 0.0, dept: General)
    }
}`,
          language: 'java',
          output: 'Ahmed (age 20, gpa: 3.7, dept: CS)\nSara (age 22, gpa: 3.9, dept: General)\nAli (age 19, gpa: 0.0, dept: General)\nZara (age 18, gpa: 0.0, dept: General)\nUnknown (age 18, gpa: 0.0, dept: General)',
          explanation: 'Each constructor provides different defaults. Delegation ensures consistent initialization.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-03-03-1',
          title: 'String Class Constructors',
          scenario: 'Java String class has constructors for: empty string, String, char[], char[] with offset/length, StringBuilder, and more.',
          oopConcept: 'Overloading allows creating strings from many different data sources.',
        },
        {
          id: 'rwe-03-03-2',
          title: 'GUI Component Creation',
          scenario: 'A Button can be created with just text, text + icon, or text + icon + action listener.',
          oopConcept: 'Different constructors provide different levels of initialization.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-03-03-1',
          title: 'Constructor Delegation Loop',
          incorrectCode: `class Student {
    public Student() { this("Ahmed"); }
    public Student(String name) { this(); }  // infinite loop
}`,
          correctCode: `class Student {
    public Student() { this("Unknown"); }
    public Student(String name) { this(name, 18); }
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
}`,
          explanation: 'Constructor chains must not form loops. Always delegate to a more specific constructor, not backward.',
        },
      ],
      examNotes: [
        { id: 'en-03-03-1', title: 'Constructor Overloading', content: 'Multiple constructors with different parameters. Use this() to delegate. First statement rule.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-03-03-1', question: 'What is constructor overloading?', answer: 'Having multiple constructors with different parameter lists. Provides flexibility in object creation.', difficulty: 'easy' },
        { id: 'vq-03-03-2', question: 'How do constructors call each other?', answer: 'Using this() as the first statement. This delegates to another constructor in the same class.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-03-03-1', type: 'mcq', question: 'Where must this() be in a constructor?', options: ['Last line', 'First statement', 'Anywhere', 'Outside'], correctAnswer: 'First statement', explanation: 'this() must be the first statement.' },
        { id: 'qc-03-03-2', type: 'true-false', question: 'Constructor overloading follows the same rules as method overloading.', correctAnswer: 'True', explanation: 'Different parameter lists, same name (class name).' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-03-03-1',
          scenario: 'Design a Rectangle class. Users should be able to create rectangles with: length+width, just side (square), or no args (0x0).',
          question: 'How many constructors?',
          type: 'design-decision',
          options: [
            'Three constructors: (double, double), (double), and ()',
            'One constructor with all optional parameters',
            'No constructors — use setters only',
          ],
          correctAnswer: 'Three constructors: (double, double), (double), and ()',
          explanation: 'Each constructor delegates to the most detailed one with sensible defaults.',
          relatedConcepts: ['constructor-overloading', 'delegation'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-constructor-overloading',
      prerequisites: ['lesson-03-01', 'lesson-03-02'],
      xpReward: 55,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'overloading',
      difficulty: 'easy',
      estimatedMinutes: 18,
    },
    {
      id: 'lesson-03-04',
      moduleId: 'module-03',
      title: 'Constructor Chaining',
      slug: 'constructor-chaining',
      order: 4,
      duration: 20,
      description: 'Master calling constructors from other constructors using this() and super() for delegation and inheritance.',
      learningObjectives: [
        { id: 'lo-03-04-1', description: 'Chain constructors within the same class using this()', completed: false },
        { id: 'lo-03-04-2', description: 'Chain constructors from parent to child using super()', completed: false },
        { id: 'lo-03-04-3', description: 'Understand the delegation pattern', completed: false },
      ],
      englishExplanation: {
        id: 'ee-03-04',
        text: `**Constructor chaining** is the process of one constructor calling another constructor to reuse initialization code. There are two directions: within the same class and across inheritance.

**Chaining within Same Class (this())**: One constructor calls another constructor in the same class. The \`this()\` call must be the first statement. This avoids duplicating initialization logic.

**Chaining Across Inheritance (super())**: A child class constructor calls the parent class constructor using \`super()\`. If you don't explicitly call \`super()\`, Java automatically inserts \`super()\` (no-arg) as the first statement.

\`\`\`java
class Employee {
    String name;
    Employee(String name) { this.name = name; }
}
class Manager extends Employee {
    String department;
    Manager(String name, String dept) {
        super(name);  // calls Employee constructor
        this.department = dept;
    }
}
\`\`\`

**Rules**:
1. \`this()\` and \`super()\` must be the FIRST statement
2. You CANNOT use both \`this()\` and \`super()\` in the same constructor
3. The chain always starts from the most specific constructor
4. Parent constructor runs first, then child constructor body

**Delegation Pattern**: The most detailed constructor does the actual work. Simpler constructors delegate to it with default values. This ensures consistent initialization.

**Execution Order**: When creating a child object:
1. Parent constructor runs (initializing parent fields)
2. Child constructor body runs (initializing child fields)
This guarantees parent fields are initialized before child fields.`
      },
      romanUrduExplanation: {
        id: 'ru-03-04',
        text: `**Constructor chaining** ek constructor ka doosre constructor ko call karna hai initialization code reuse karne ke liye.

**Same Class (this())**: Ek constructor doosre ko \`this()\` se call karta hai. First statement honi chahiye.

**Inheritance (super())**: Child constructor parent constructor ko \`super()\` se call karta hai. Agar \`super()\` nahi likhte toh Java automatically add karta hai.

**Rules**:
1. \`this()\` aur \`super()\` FIRST statement honi chahiye
2. Dono ek saath use nahi ho sakte
3. Chain most specific constructor se start hota hai
4. Parent constructor pehle chalta hai

**Execution Order**: Child object banane par:
1. Parent constructor chalta hai
2. Child constructor body chalti hai`
      },
      keyPoints: [
        { id: 'kp-03-04-1', title: 'this() Chaining', description: 'Call another constructor in the same class. Must be first statement.' },
        { id: 'kp-03-04-2', title: 'super() Chaining', description: 'Call parent constructor. Automatically inserted if not written.' },
        { id: 'kp-03-04-3', title: 'No Mixing', description: 'Cannot use both this() and super() in same constructor.' },
        { id: 'kp-03-04-4', title: 'Parent First', description: 'Parent constructor always runs before child constructor body.' },
      ],
      codeExamples: [
        {
          id: 'ce-03-04-1',
          title: 'Chaining with this() and super()',
          code: `class Person {
    String name;
    int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
        System.out.println("Person created: " + name);
    }

    public Person() {
        this("Unknown", 0);
    }
}

class Student extends Person {
    double gpa;
    String department;

    public Student(String name, int age, double gpa, String dept) {
        super(name, age);  // calls Person constructor
        this.gpa = gpa;
        this.department = dept;
        System.out.println("Student created: " + name);
    }

    public Student(String name) {
        this(name, 18, 0.0, "General");
    }

    public void display() {
        System.out.println(name + " (age " + age + ", gpa: " + gpa + ")");
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("Ahmed", 20, 3.7, "CS");
        s1.display();

        System.out.println("---");

        Student s2 = new Student("Sara");
        s2.display();
    }
}`,
          language: 'java',
          output: 'Person created: Ahmed\nStudent created: Ahmed\nAhmed (age 20, gpa: 3.7)\n---\nPerson created: Unknown\nStudent created: Sara\nSara (age 18, gpa: 0.0)',
          explanation: 'super() calls parent constructor. this() delegates within the same class. Parent runs first.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-03-04-1',
          title: 'Exception Hierarchy',
          scenario: 'Custom exceptions extend Exception. The constructor calls super(message) to set the parent message.',
          oopConcept: 'super() delegation ensures parent state is properly initialized.',
        },
        {
          id: 'rwe-03-04-2',
          title: 'GUI Component Hierarchy',
          scenario: 'A JPanel constructor calls super() to initialize the JComponent base. Then it adds its own initialization.',
          oopConcept: 'Constructor chaining ensures each level of the hierarchy is properly initialized.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-03-04-1',
          title: 'Mixing this() and super()',
          incorrectCode: `class Student extends Person {
    public Student(String name) {
        super(name);  // ERROR: cannot have both
        this(name, 18);
    }
}`,
          correctCode: `class Student extends Person {
    public Student(String name) {
        this(name, 18);  // delegate to more specific
    }
    public Student(String name, int age) {
        super(name, age);  // call parent
    }
}`,
          explanation: 'Cannot use both this() and super() in the same constructor. Choose one chain path.',
        },
      ],
      examNotes: [
        { id: 'en-03-04-1', title: 'Chaining Rules', content: 'this()/super() must be first. Cannot mix both. Parent runs first. Understanding execution order is critical.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-03-04-1', question: 'Can you use both this() and super() in a constructor?', answer: 'No. Both must be first statement, so they cannot coexist. Choose one delegation path.', difficulty: 'medium' },
        { id: 'vq-03-04-2', question: 'What happens if you don\'t call super() explicitly?', answer: 'Java automatically inserts super() (no-arg) as the first statement.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-03-04-1', type: 'mcq', question: 'Which runs first when creating a child object?', options: ['Child constructor', 'Parent constructor', 'Both simultaneously', 'Depends on order'], correctAnswer: 'Parent constructor', explanation: 'Parent constructor always runs before child constructor body.' },
        { id: 'qc-03-04-2', type: 'true-false', question: 'You can use this() and super() in the same constructor.', correctAnswer: 'False', explanation: 'Both must be first statement, so they cannot coexist.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-03-04-1',
          scenario: 'You have Animal (name, age) and Dog (name, age, breed) classes. Dog extends Animal.',
          question: 'How should Dog constructor work?',
          type: 'design-decision',
          options: [
            'Call super(name, age) to initialize parent fields, then set breed',
            'Reinitialize name and age in Dog constructor',
            'Use this() only, no super()',
          ],
          correctAnswer: 'Call super(name, age) to initialize parent fields, then set breed',
          explanation: 'super() ensures parent fields are properly initialized by the parent constructor.',
          relatedConcepts: ['super', 'constructor-chaining', 'inheritance'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-constructor-chaining',
      prerequisites: ['lesson-03-03', 'lesson-02-01'],
      xpReward: 60,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'chaining',
      difficulty: 'medium',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-03-05',
      moduleId: 'module-03',
      title: 'Copy Constructor',
      slug: 'copy-constructor',
      order: 5,
      duration: 20,
      description: 'Learn about shallow vs deep copy, copy constructors, and how they differ from the clone() method.',
      learningObjectives: [
        { id: 'lo-03-05-1', description: 'Write a copy constructor that creates a copy of an existing object', completed: false },
        { id: 'lo-03-05-2', description: 'Understand the difference between shallow copy and deep copy', completed: false },
        { id: 'lo-03-05-3', description: 'Compare copy constructor with clone() method', completed: false },
      ],
      englishExplanation: {
        id: 'ee-03-05',
        text: `A **copy constructor** creates a new object as a copy of an existing object. It takes a parameter of the same class type and copies all field values.

\`\`\`java
public Student(Student other) {
    this.name = other.name;
    this.age = other.age;
}
\`\`\`

**Shallow Copy**: Copies the reference, not the actual object, for reference type fields. Both objects share the same inner object. If one modifies the inner object, both are affected.

**Deep Copy**: Creates new copies of all nested objects. Each object has its own independent copy. Changes to one don't affect the other.

\`\`\`java
class Course {
    String name;
    Course(String name) { this.name = name; }
}

class Student {
    String name;
    Course course;

    // Shallow copy
    Student(Student other) {
        this.name = other.name;
        this.course = other.course;  // shared reference!
    }

    // Deep copy
    Student deepCopy(Student other) {
        this.name = other.name;
        this.course = new Course(other.course.name);  // new object
    }
}
\`\`\`

**Copy Constructor vs clone()**:
- Copy constructor: Explicit, type-safe, no casting needed, easier to understand
- clone(): Uses Cloneable interface, requires casting, can be error-prone, deprecated pattern

**When to use each**:
- Copy constructor: Preferred in most cases. Clear, explicit, type-safe.
- Deep copy: When objects contain mutable reference fields that must be independent.
- clone(): Rarely recommended. Copy constructors are preferred.`
      },
      romanUrduExplanation: {
        id: 'ru-03-05',
        text: `**Copy constructor** existing object ki copy create karta hai. Same class type ka parameter leta hai.

**Shallow Copy**: Reference type fields ke liye reference copy karta hai. Dono objects same inner object share karte hain.

**Deep copy**: Sab nested objects ki nayi copies create karta hai. Har object ka independent copy hota hai.

\`\`\`java
// Shallow: this.course = other.course;  // shared
// Deep: this.course = new Course(other.course.name);  // independent
\`\`\`

**Copy Constructor vs clone()**:
- Copy constructor: Type-safe, clear, preferred
- clone(): Error-prone, requires casting, deprecated pattern`
      },
      keyPoints: [
        { id: 'kp-03-05-1', title: 'Copy Constructor', description: 'Takes same-class parameter, copies all field values.' },
        { id: 'kp-03-05-2', title: 'Shallow Copy', description: 'Copies references. Objects share inner objects.' },
        { id: 'kp-03-05-3', title: 'Deep Copy', description: 'Creates new objects. Fully independent copies.' },
        { id: 'kp-03-05-4', title: 'Preferred Approach', description: 'Copy constructors are preferred over clone().' },
      ],
      codeExamples: [
        {
          id: 'ce-03-05-1',
          title: 'Shallow vs Deep Copy',
          code: `class Course {
    String name;
    Course(String name) { this.name = name; }
}

class Student {
    String name;
    Course course;

    Student(String name, Course course) {
        this.name = name;
        this.course = course;
    }

    // Shallow copy constructor
    Student(Student other) {
        this.name = other.name;
        this.course = other.course;  // shared reference!
    }

    // Deep copy method
    Student deepCopy() {
        return new Student(this.name, new Course(this.course.name));
    }
}

public class Main {
    public static void main(String[] args) {
        Course c = new Course("OOP");
        Student s1 = new Student("Ahmed", c);

        // Shallow copy
        Student s2 = new Student(s1);
        s2.course.name = "Data Structures";
        System.out.println(s1.course.name);  // Data Structures (shared!)

        // Deep copy
        Student s3 = s1.deepCopy();
        s3.course.name = "Algorithms";
        System.out.println(s1.course.name);  // Data Structures (independent!)
    }
}`,
          language: 'java',
          output: 'Data Structures\nData Structures',
          explanation: 'Shallow copy shares the Course object. Deep copy creates independent Course object.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-03-05-1',
          title: 'Document System',
          scenario: 'When copying a document, you might want to share the template (shallow) or create a completely independent copy (deep).',
          oopConcept: 'Choose shallow or deep based on whether shared state is desired.',
        },
        {
          id: 'rwe-03-05-2',
          title: 'Cache System',
          scenario: 'When caching query results, deep copy prevents external modification of cached data.',
          oopConcept: 'Deep copy protects internal state from external interference.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-03-05-1',
          title: 'Assuming Shallow Copy is Deep Copy',
          incorrectCode: `class Student {
    Course course;
    Student(Student other) {
        this.course = other.course;  // SHALLOW — shared!
    }
}`,
          correctCode: `class Student {
    Course course;
    Student(Student other) {
        this.course = new Course(other.course.name);  // DEEP — independent
    }
}`,
          explanation: 'Assignment copies references for object fields. Use new to create independent copies.',
        },
      ],
      examNotes: [
        { id: 'en-03-05-1', title: 'Shallow vs Deep', content: 'Shallow copies references. Deep copies objects. Know when to use each.', importance: 'high' },
        { id: 'en-03-05-2', title: 'Copy Constructor vs clone()', content: 'Copy constructor is preferred: type-safe, explicit, no casting.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-03-05-1', question: 'What is the difference between shallow and deep copy?', answer: 'Shallow copy shares reference-type fields. Deep copy creates independent copies of all objects.', difficulty: 'medium' },
        { id: 'vq-03-05-2', question: 'Why prefer copy constructor over clone()?', answer: 'Copy constructor is type-safe, explicit, no casting needed, and easier to understand.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-03-05-1', type: 'mcq', question: 'What does a shallow copy do with object fields?', options: ['Creates new objects', 'Copies references', 'Sets to null', 'Throws error'], correctAnswer: 'Copies references', explanation: 'Shallow copy copies references, not objects.' },
        { id: 'qc-03-05-2', type: 'true-false', question: 'A copy constructor is preferred over clone().', correctAnswer: 'True', explanation: 'Copy constructors are type-safe and explicit.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-03-05-1',
          scenario: 'A Rectangle has Point topLeft and Point bottomRight. You need to create an independent copy.',
          question: 'Which copy type to use?',
          type: 'design-decision',
          options: [
            'Deep copy — create new Point objects',
            'Shallow copy — share Point references',
            'Neither — just copy the class',
          ],
          correctAnswer: 'Deep copy — create new Point objects',
          explanation: 'Independent copy requires creating new Point objects, not sharing references.',
          relatedConcepts: ['deep-copy', 'shallow-copy'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-copy-constructor',
      prerequisites: ['lesson-03-01', 'lesson-02-02'],
      xpReward: 60,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'copy',
      difficulty: 'medium',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-03-06',
      moduleId: 'module-03',
      title: 'Static Factory Methods',
      slug: 'static-factory-methods',
      order: 6,
      duration: 20,
      description: 'Learn about valueOf, getInstance, and other static factory methods as alternatives to constructors.',
      learningObjectives: [
        { id: 'lo-03-06-1', description: 'Create static factory methods for object creation', completed: false },
        { id: 'lo-03-06-2', description: 'Understand advantages over constructors', completed: false },
        { id: 'lo-03-06-3', description: 'Know when to use factory methods vs constructors', completed: false },
      ],
      englishExplanation: {
        id: 'ee-03-06',
        text: `**Static factory methods** are static methods that return instances of the class. They are an alternative to constructors for creating objects.

\`\`\`java
public static Student createWithName(String name) {
    return new Student(name, 18, 0.0);
}
\`\`\`

Common naming conventions: \`valueOf()\`, \`getInstance()\`, \`newInstance()\`, \`of()\`, \`create()\`

**Advantages over constructors**:
1. **Named methods**: \`Color.valueOf("RED")\` is clearer than \`new Color(255, 0, 0)\`
2. **Can return existing objects**: Caching/pooling without changing the caller
3. **Can return subtypes**: Return different implementations based on input
4. **Reduce verbosity**: No need for \`new\` keyword or type parameters
5. **Can validate and reuse**: Return cached instance for same parameters

**Examples in Java**:
- \`Boolean.valueOf(true)\` — returns cached instance
- \`Integer.valueOf(42)\` — may cache for small values
- \`LocalDate.of(2024, 1, 1)\` — named creation
- \`Collections.unmodifiableList(list)\` — returns wrapper

**When to use factory methods**:
- When creation is complex and deserves a meaningful name
- When you want to cache/reuse instances
- When you might return different subtypes
- When constructor alone doesn't communicate intent clearly

**When constructors are better**:
- Simple, straightforward creation
- Multiple constructors already provide flexibility
- You want the caller to know they're creating a new object`
      },
      romanUrduExplanation: {
        id: 'ru-03-06',
        text: `**Static factory methods** static methods hain jo class ki instances return karti hain. Constructors ka alternative hain.

**Advantages**:
1. **Named methods**: \`Color.valueOf("RED")\` clear hai
2. **Existing objects return kar sakti hain**: Caching/pooling
3. **Subtypes return kar sakti hain**: Different implementations
4. **Verbosity kam karti hain**: \`new\` ki zaroorat nahi
5. **Validate aur reuse kar sakti hain**

**Java mein examples**: Boolean.valueOf(), Integer.valueOf(), LocalDate.of()

**Factory methods kab use karein**: Jab creation complex ho, caching chahiye, ya subtypes return karne hon.`
      },
      keyPoints: [
        { id: 'kp-03-06-1', title: 'Static Methods', description: 'Methods that return class instances, called on the class not an object.' },
        { id: 'kp-03-06-2', title: 'Named Creation', description: 'Method names like valueOf, getInstance communicate intent clearly.' },
        { id: 'kp-03-06-3', title: 'Caching', description: 'Can return cached/reused instances transparently.' },
        { id: 'kp-03-06-4', title: 'Flexibility', description: 'Can return subtypes and different implementations.' },
      ],
      codeExamples: [
        {
          id: 'ce-03-06-1',
          title: 'Static Factory Methods',
          code: `public class Color {
    private final int red;
    private final int green;
    private final int blue;

    private Color(int red, int green, int blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    // Static factory methods
    public static Color valueOf(String name) {
        switch (name.toUpperCase()) {
            case "RED": return new Color(255, 0, 0);
            case "GREEN": return new Color(0, 255, 0);
            case "BLUE": return new Color(0, 0, 255);
            default: throw new IllegalArgumentException("Unknown: " + name);
        }
    }

    public static Color fromRGB(int r, int g, int b) {
        return new Color(r, g, b);
    }

    @Override
    public String toString() {
        return "RGB(" + red + "," + green + "," + blue + ")";
    }
}

public class Main {
    public static void main(String[] args) {
        Color red = Color.valueOf("RED");
        Color custom = Color.fromRGB(128, 64, 200);

        System.out.println(red);     // RGB(255,0,0)
        System.out.println(custom);  // RGB(128,64,200)
    }
}`,
          language: 'java',
          explanation: 'Static factory methods provide named creation. Constructor is private, forcing use of factory methods.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-03-06-1',
          title: 'Boolean.valueOf()',
          scenario: 'Returns cached Boolean instances for true/false.',
          oopConcept: 'Factory method with caching — same input returns same object.',
        },
        {
          id: 'rwe-03-06-2',
          title: 'LocalDate.of()',
          scenario: 'Named creation: LocalDate.of(2024, Month.JANUARY, 1) is clearer than constructor.',
          oopConcept: 'Named methods communicate intent better than constructors.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-03-06-1',
          title: 'Using Factory Method When Constructor Suffices',
          incorrectCode: `class Point {
    int x, y;
    public static Point create(int x, int y) {
        return new Point(x, y);  // unnecessary wrapper
    }
}`,
          correctCode: `class Point {
    int x, y;
    public Point(int x, int y) { this.x = x; this.y = y; }
    // Factory method adds value for complex creation
    public static Point origin() { return new Point(0, 0); }
}`,
          explanation: 'Don\'t add factory methods for simple cases. They add value only when creation is complex or needs naming.',
        },
      ],
      examNotes: [
        { id: 'en-03-06-1', title: 'Factory Methods', content: 'Static methods returning instances. Advantages: naming, caching, subtypes. Know when to use vs constructors.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-03-06-1', question: 'What are static factory methods?', answer: 'Static methods that return instances of the class. Alternative to constructors with advantages like naming and caching.', difficulty: 'easy' },
        { id: 'vq-03-06-2', question: 'When to use factory methods over constructors?', answer: 'When creation needs a meaningful name, caching, or returning different subtypes.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-03-06-1', type: 'mcq', question: 'What is an advantage of factory methods?', options: ['Faster execution', 'Named creation', 'Less memory', 'More secure'], correctAnswer: 'Named creation', explanation: 'Named methods communicate intent clearly.' },
        { id: 'qc-03-06-2', type: 'true-false', question: 'Factory methods can return cached instances.', correctAnswer: 'True', explanation: 'They can cache and reuse objects transparently.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-03-06-1',
          scenario: 'You have a DatabaseConnection class. Creation requires checking connection pool, validating credentials, and possibly reusing an existing connection.',
          question: 'What approach is best?',
          type: 'design-decision',
          options: [
            'Static factory method that manages pool and caching',
            'Public constructor only',
            'Interface with default method',
          ],
          correctAnswer: 'Static factory method that manages pool and caching',
          explanation: 'Complex creation with caching benefits from factory methods.',
          relatedConcepts: ['factory-method', 'caching'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-factory-methods',
      prerequisites: ['lesson-03-01', 'lesson-02-03'],
      xpReward: 60,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'factory',
      difficulty: 'medium',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-03-07',
      moduleId: 'module-03',
      title: 'Builder Pattern',
      slug: 'builder-pattern',
      order: 7,
      duration: 22,
      description: 'Learn step-by-step object creation with the Builder pattern and solve the telescoping constructor problem.',
      learningObjectives: [
        { id: 'lo-03-07-1', description: 'Identify the telescoping constructor problem', completed: false },
        { id: 'lo-03-07-2', description: 'Implement the Builder pattern for step-by-step construction', completed: false },
        { id: 'lo-03-07-3', description: 'Understand when to use Builder vs constructors', completed: false },
      ],
      englishExplanation: {
        id: 'ee-03-07',
        text: `The **telescoping constructor problem** occurs when a class has many parameters and you need constructors for every combination. This leads to an explosion of constructors.

\`\`\`java
// Telescoping constructors — problematic
class Pizza {
    Pizza(int size) { ... }
    Pizza(int size, boolean cheese) { ... }
    Pizza(int size, boolean cheese, boolean pepperoni) { ... }
    Pizza(int size, boolean cheese, boolean pepperoni, boolean mushroom) { ... }
    // ... keeps growing
}
\`\`\`

The **Builder Pattern** solves this by creating objects step by step:

\`\`\`java
Pizza pizza = new Pizza.Builder(12)
    .cheese(true)
    .pepperoni(true)
    .mushroom(false)
    .build();
\`\`\`

**How Builder Works**:
1. Static inner class \`Builder\` with the required parameters
2. Fluent setter methods that return the Builder
3. A \`build()\` method that creates the final object

**Advantages**:
1. **Readability**: Each parameter is named and clear
2. **Flexibility**: Only set parameters you need
3. **Immutability**: Final object can be immutable
4. **Safety**: Required parameters enforced at compile time
5. **No parameter confusion**: Unlike telescoping constructors with same-type params

**When to use Builder**:
- 4+ constructor parameters
- Many optional parameters
- You want immutable objects
- Readability is important`
      },
      romanUrduExplanation: {
        id: 'ru-03-07',
        text: `**Telescoping constructor problem** tab hota hai jab class ke bahut saare parameters hon aur har combination ke liye constructor chahiye.

\`\`\`java
// Problematic telescoping constructors
class Pizza {
    Pizza(int size) { ... }
    Pizza(int size, boolean cheese) { ... }
    Pizza(int size, boolean cheese, boolean pepperoni) { ... }
}
\`\`\`

**Builder Pattern** isse step by step solve karta hai:

\`\`\`java
Pizza pizza = new Pizza.Builder(12)
    .cheese(true)
    .pepperoni(true)
    .build();
\`\`\`

**Advantages**: Readability, flexibility, immutability, safety, no parameter confusion.

**Kab use karein**: 4+ parameters, bahut optional parameters, immutable objects.`
      },
      keyPoints: [
        { id: 'kp-03-07-1', title: 'Telescoping Problem', description: 'Too many constructors for parameter combinations.' },
        { id: 'kp-03-07-2', title: 'Step-by-Step', description: 'Builder creates objects one parameter at a time.' },
        { id: 'kp-03-07-3', title: 'Fluent API', description: 'Methods return the Builder for method chaining.' },
        { id: 'kp-03-07-4', title: 'build() Method', description: 'Final method creates the immutable object.' },
      ],
      codeExamples: [
        {
          id: 'ce-03-07-1',
          title: 'Builder Pattern Implementation',
          code: `public class Pizza {
    private final int size;
    private final boolean cheese;
    private final boolean pepperoni;
    private final boolean mushroom;
    private final String sauce;

    private Pizza(Builder builder) {
        this.size = builder.size;
        this.cheese = builder.cheese;
        this.pepperoni = builder.pepperoni;
        this.mushroom = builder.mushroom;
        this.sauce = builder.sauce;
    }

    public static class Builder {
        private final int size;  // required
        private boolean cheese = false;
        private boolean pepperoni = false;
        private boolean mushroom = false;
        private String sauce = "tomato";

        public Builder(int size) { this.size = size; }

        public Builder cheese(boolean val) { cheese = val; return this; }
        public Builder pepperoni(boolean val) { pepperoni = val; return this; }
        public Builder mushroom(boolean val) { mushroom = val; return this; }
        public Builder sauce(String val) { sauce = val; return this; }

        public Pizza build() { return new Pizza(this); }
    }

    @Override
    public String toString() {
        return "Pizza{size=" + size + ", cheese=" + cheese +
               ", pepperoni=" + pepperoni + ", mushroom=" + mushroom +
               ", sauce=" + sauce + "}";
    }
}`,
          language: 'java',
          explanation: 'Static inner Builder class with fluent methods. build() creates the final immutable Pizza.',
        },
        {
          id: 'ce-03-07-2',
          title: 'Using the Builder',
          code: `public class Main {
    public static void main(String[] args) {
        Pizza simple = new Pizza.Builder(8).build();
        System.out.println(simple);

        Pizza loaded = new Pizza.Builder(12)
            .cheese(true)
            .pepperoni(true)
            .mushroom(true)
            .sauce("bbq")
            .build();
        System.out.println(loaded);

        Pizza margherita = new Pizza.Builder(10)
            .cheese(true)
            .sauce("tomato")
            .build();
        System.out.println(margherita);
    }
}`,
          language: 'java',
          output: 'Pizza{size=8, cheese=false, pepperoni=false, mushroom=false, sauce=tomato}\nPizza{size=12, cheese=true, pepperoni=true, mushroom=true, sauce=bbq}\nPizza{size=10, cheese=true, pepperoni=false, mushroom=false, sauce=tomato}',
          explanation: 'Only set the parameters you need. build() creates the final object.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-03-07-1',
          title: 'StringBuilder',
          scenario: 'Java StringBuilder uses builder pattern: new StringBuilder().append("a").append("b").toString()',
          oopConcept: 'Step-by-step string construction with fluent API.',
        },
        {
          id: 'rwe-03-07-2',
          title: 'HTTP Request Builder',
          scenario: 'OkHttp uses Builder: new Request.Builder().url("...").addHeader("...", "...").build()',
          oopConcept: 'Complex object construction with many optional parameters.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-03-07-1',
          title: 'Not Making Builder Static',
          incorrectCode: `class Pizza {
    class Builder {  // non-static — wrong
        public Pizza build() { return new Pizza(this); }
    }
}`,
          correctCode: `class Pizza {
    static class Builder {  // correct
        public Pizza build() { return new Pizza(this); }
    }
}`,
          explanation: 'Builder should be static inner class to avoid unnecessary reference to outer instance.',
        },
      ],
      examNotes: [
        { id: 'en-03-07-1', title: 'Builder Pattern', content: 'Static inner class, fluent methods, build() creates object. Solves telescoping constructor problem.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-03-07-1', question: 'What is the telescoping constructor problem?', answer: 'Too many constructors for every parameter combination. Builder pattern solves this with step-by-step construction.', difficulty: 'easy' },
        { id: 'vq-03-07-2', question: 'Why is Builder better than many constructors?', answer: 'More readable, flexible (set only needed params), supports immutability, prevents parameter confusion.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-03-07-1', type: 'mcq', question: 'What does the build() method do?', options: ['Destroys the builder', 'Creates the final object', 'Validates parameters', 'Returns the builder'], correctAnswer: 'Creates the final object', explanation: 'build() creates and returns the fully constructed object.' },
        { id: 'qc-03-07-2', type: 'true-false', question: 'The Builder should be a static inner class.', correctAnswer: 'True', explanation: 'Static inner class avoids unnecessary reference to outer instance.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-03-07-1',
          scenario: 'An HttpRequest has URL (required), method, headers, body, timeout, and followRedirects (all optional).',
          question: 'Best construction approach?',
          type: 'design-decision',
          options: [
            'Builder pattern for optional parameters',
            'One constructor with all parameters',
            'Only setters after default constructor',
          ],
          correctAnswer: 'Builder pattern for optional parameters',
          explanation: 'Many optional parameters is the ideal use case for Builder.',
          relatedConcepts: ['builder-pattern', 'optional-parameters'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-builder-pattern',
      prerequisites: ['lesson-03-03', 'lesson-02-01'],
      xpReward: 70,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'builder',
      difficulty: 'medium',
      estimatedMinutes: 22,
    },
    {
      id: 'lesson-03-08',
      moduleId: 'module-03',
      title: 'Initialization Blocks',
      slug: 'initialization-blocks',
      order: 8,
      duration: 18,
      description: 'Learn about instance initialization blocks, static initialization blocks, and the complete initialization order.',
      learningObjectives: [
        { id: 'lo-03-08-1', description: 'Use instance initialization blocks', completed: false },
        { id: 'lo-03-08-2', description: 'Use static initialization blocks', completed: false },
        { id: 'lo-03-08-3', description: 'Understand the complete Java initialization order', completed: false },
      ],
      englishExplanation: {
        id: 'ee-03-08',
        text: `Java supports two types of initialization blocks that run code during object creation or class loading.

**Instance Initialization Blocks**: Code inside { } in a class body (outside methods). They run every time an object is created, before the constructor body. They are inserted into the constructor by the compiler.

\`\`\`java
class Student {
    { System.out.println("Instance block"); }
    Student() { System.out.println("Constructor"); }
}
\`\`\`

**Static Initialization Blocks**: Code inside static { }. They run once when the class is first loaded. Used for initializing static fields.

\`\`\`java
class Config {
    static Map<String, String> settings;
    static {
        settings = new HashMap<>();
        settings.put("url", "localhost");
    }
}
\`\`\`

**Complete Initialization Order** (most important):
1. Static fields and static blocks (in order, once)
2. Instance fields and instance blocks (in order, each object)
3. Constructor body

When creating a child object:
1. Parent static fields/blocks
2. Parent instance fields/blocks
3. Parent constructor
4. Child static fields/blocks
5. Child instance fields/blocks
6. Child constructor

**Key Points**:
- Static blocks run once per class load
- Instance blocks run per object creation
- Instance blocks are useful for code that must run in multiple constructors
- Initialize fields at declaration when possible for clarity`
      },
      romanUrduExplanation: {
        id: 'ru-03-08',
        text: `Java do tarah ke initialization blocks support karta hai.

**Instance Initialization Blocks**: Class body mein { } ke andar ka code. Har object creation par run hote hain, constructor body se pehle.

\`\`\`java
class Student {
    { System.out.println("Instance block"); }
    Student() { System.out.println("Constructor"); }
}
\`\`\`

**Static Initialization Blocks**: static { } ke andar. Class load hone par ek baar run hote hain.

\`\`\`java
class Config {
    static {
        // runs once when class loads
    }
}
\`\`\`

**Complete Initialization Order**:
1. Static fields aur blocks (ek baar)
2. Instance fields aur blocks (har object)
3. Constructor body

Child object ke liye:
1. Parent static
2. Parent instance
3. Parent constructor
4. Child static
5. Child instance
6. Child constructor`
      },
      keyPoints: [
        { id: 'kp-03-08-1', title: 'Instance Blocks', description: 'Run every object creation, before constructor body.' },
        { id: 'kp-03-08-2', title: 'Static Blocks', description: 'Run once when class loads. Initialize static fields.' },
        { id: 'kp-03-08-3', title: 'Initialization Order', description: 'Static → Instance → Constructor. Parent before child.' },
      ],
      codeExamples: [
        {
          id: 'ce-03-08-1',
          title: 'Initialization Blocks',
          code: `class Student {
    static int classCount;

    static {
        System.out.println("Static block: class loaded");
        classCount = 0;
    }

    {
        System.out.println("Instance block: object creating");
        classCount++;
    }

    String name;

    Student(String name) {
        System.out.println("Constructor: " + name);
        this.name = name;
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("Creating s1...");
        Student s1 = new Student("Ahmed");

        System.out.println("Creating s2...");
        Student s2 = new Student("Sara");

        System.out.println("Total: " + Student.classCount);
    }
}`,
          language: 'java',
          output: 'Creating s1...\nStatic block: class loaded\nInstance block: object creating\nConstructor: Ahmed\nCreating s2...\nInstance block: object creating\nConstructor: Sara\nTotal: 2',
          explanation: 'Static block runs once. Instance block runs each time. Constructor runs last.',
        },
        {
          id: 'ce-03-08-2',
          title: 'Full Initialization Order',
          code: `class Parent {
    static { System.out.println("1. Parent static block"); }
    { System.out.println("2. Parent instance block"); }
    Parent() { System.out.println("3. Parent constructor"); }
}

class Child extends Parent {
    static { System.out.println("4. Child static block"); }
    { System.out.println("5. Child instance block"); }
    Child() { System.out.println("6. Child constructor"); }
}

public class Main {
    public static void main(String[] args) {
        new Child();
    }
}`,
          language: 'java',
          output: '1. Parent static block\n4. Child static block\n2. Parent instance block\n3. Parent constructor\n5. Child instance block\n6. Child constructor',
          explanation: 'Complete order: Parent static → Child static → Parent instance → Parent constructor → Child instance → Child constructor.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-03-08-1',
          title: 'Logging Setup',
          scenario: 'Static block initializes logging configuration when class loads.',
          oopConcept: 'Static blocks for one-time class initialization.',
        },
        {
          id: 'rwe-03-08-2',
          title: 'Shared Resource Setup',
          scenario: 'Instance block initializes resources shared by multiple constructors.',
          oopConcept: 'Instance blocks avoid code duplication across constructors.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-03-08-1',
          title: 'Confusing Static and Instance Block Timing',
          incorrectCode: `class Demo {
    int x;
    { x = 10; }  // runs per object
    static { }     // runs once per class
    Demo() {
        System.out.println(x);  // always 10 regardless of constructor
    }
}`,
          correctCode: `class Demo {
    int x;
    static { System.out.println("Class loaded"); }
    { x = 10; System.out.println("Instance block"); }
    Demo() {
        System.out.println("Constructor, x=" + x);
    }
}`,
          explanation: 'Instance blocks run BEFORE the constructor body. The constructor sees the already-initialized values.',
        },
      ],
      examNotes: [
        { id: 'en-03-08-1', title: 'Initialization Order', content: 'Static → Instance → Constructor. Parent before child. This is a very common exam question.', importance: 'high' },
        { id: 'en-03-08-2', title: 'Static vs Instance Blocks', content: 'Static: once per class. Instance: per object. Both run before constructor body.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-03-08-1', question: 'What is the difference between static and instance blocks?', answer: 'Static blocks run once when class loads. Instance blocks run every time an object is created.', difficulty: 'easy' },
        { id: 'vq-03-08-2', question: 'What is the complete initialization order?', answer: 'Static (parent→child) → Instance (parent→child) → Constructors (parent→child).', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-03-08-1', type: 'mcq', question: 'When does a static block run?', options: ['Every object creation', 'Once when class loads', 'After constructor', 'Never automatically'], correctAnswer: 'Once when class loads', explanation: 'Static blocks run once when the class is first loaded.' },
        { id: 'qc-03-08-2', type: 'true-false', question: 'Instance blocks run before the constructor body.', correctAnswer: 'True', explanation: 'Instance blocks are inserted into the constructor before the constructor body.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-03-08-1',
          scenario: 'You have a Logger class that reads a config file. This should happen only once when the program starts.',
          question: 'Which initialization block to use?',
          type: 'design-decision',
          options: [
            'Static block — runs once when class loads',
            'Instance block — runs each time',
            'Constructor — runs each time',
          ],
          correctAnswer: 'Static block — runs once when class loads',
          explanation: 'Static block runs once, perfect for one-time initialization.',
          relatedConcepts: ['static-block', 'initialization-order'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-initialization',
      prerequisites: ['lesson-03-01', 'lesson-02-03'],
      xpReward: 55,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'initialization-order',
      difficulty: 'medium',
      estimatedMinutes: 18,
    },
  ],
};