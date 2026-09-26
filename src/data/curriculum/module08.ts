import type { Module } from '@/types';

export const module08: Module = {
  id: 'module-08',
  title: 'Interfaces',
  slug: 'interfaces',
  order: 8,
  description: 'Master Java Interfaces — the powerful abstraction mechanism that defines contracts, enables multiple inheritance of type, and forms the backbone of flexible, decoupled software design.',
  icon: 'Plug',
  color: '#8b5cf6',
  xpReward: 750,
  isUnlocked: true,
  completed: false,
  progress: 0,
  totalDuration: 260,
  prerequisiteModuleIds: ['module-07'],
  lessons: [
    {
      id: 'lesson-08-01',
      moduleId: 'module-08',
      title: 'What is an Interface?',
      slug: 'what-is-an-interface',
      order: 1,
      duration: 20,
      description: 'Understand what a Java Interface is, how it acts as a contract, and how it provides abstraction in OOP.',
      learningObjectives: [
        { id: 'lo-08-01-1', description: 'Define what a Java Interface is', completed: false },
        { id: 'lo-08-01-2', description: 'Explain the concept of a contract in programming', completed: false },
        { id: 'lo-08-01-3', description: 'Differentiate between an interface and a class', completed: false },
        { id: 'lo-08-01-4', description: 'Understand why interfaces are essential for abstraction', completed: false },
      ],
      englishExplanation: {
        id: 'ee-08-01',
        text: `A Java Interface is a completely abstract type that defines a set of methods that a class must implement. Think of it as a contract: if a class agrees to implement an interface, it must provide concrete implementations for every method declared in that interface.

Unlike a class, an interface cannot contain instance variables (only constants), cannot have constructors, and until Java 8, could only contain abstract methods. An interface defines WHAT must be done, not HOW it is done. This separation of "what" from "how" is the essence of abstraction.

Consider a real-world example: an electrical outlet is an interface. It defines a contract — it provides certain voltage and frequency. Any device with a compatible plug can use it. The outlet does not care whether the device is a lamp, a phone charger, or a laptop. The outlet defines the contract; the device implements the behavior.

In Java, a class uses the \`implements\` keyword to adopt an interface. A class can implement multiple interfaces, which is one of the most powerful features of Java. This allows a class to belong to multiple "types" simultaneously.

Interfaces are critical for:
1. **Abstraction**: Defining behavior without implementation details.
2. **Decoupling**: Code depends on the interface, not the concrete class.
3. **Polymorphism**: Different classes implementing the same interface can be used interchangeably.
4. **Multiple Inheritance of Type**: A class can implement many interfaces, even though it can only extend one class.

The key distinction between an interface and an abstract class is this: an abstract class can provide partial implementation and have constructors and instance variables. An interface defines a pure contract. In modern Java, interfaces can have default and static methods, but their primary purpose remains defining contracts.`
      },
      romanUrduExplanation: {
        id: 'ru-08-01',
        text: `Java Interface ek completely abstract type hai jo ek set of methods define karta hai jo kisi class ko implement karna padta hai. Ise ek contract samjhein: agar class kisi interface ko implement karne ka agree kare, toh us har method ka concrete implementation dena padega jo us interface mein declare ho.

Class ke mukhtalif, interface mein instance variables nahi ho sakte (sirf constants), constructors nahi ho sakte, aur Java 8 tak sirf abstract methods ho sakte the. Interface define karta hai KE KYA hona chahiye, Kaise nahi. "Kya" aur "Kaise" ki ye alagaghi abstraction ka asli essence hai.

Real-world example: electrical outlet ek interface hai. Ye ek contract define karta hai — ek certain voltage aur frequency provide karta hai. Koi bhi device jo compatible plug rakhta hai, use kar sakta hai. Outlet ko pata nahi hota ke device lamp hai, phone charger hai, ya laptop. Outlet contract define karta hai; device behavior implement karta hai.

Java mein, class \`implements\` keyword se interface adopt karti hai. Ek class multiple interfaces implement kar sakti hai, jo Java ki sabse powerful features mein se ek hai. Isse class ek saath multiple "types" ban sakti hai.

Interfaces zaroori hain kyunki:
1. **Abstraction**: Implementation details ke bina behavior define karta hai.
2. **Decoupling**: Code interface par depend karta hai, concrete class par nahi.
3. **Polymorphism**: Alag-alag classes jo same interface implement karti hain, unhe interchangeably use kiya ja sakta hai.
4. **Multiple Inheritance of Type**: Ek class bahut saari interfaces implement kar sakti hai, chahe sirf ek class extend kar sake.

Interface aur abstract class mein farq ye hai: abstract class partial implementation de sakta hai aur uske constructors aur instance variables ho sakte hain. Interface sirf pure contract define karta hai. Modern Java mein interfaces mein default aur static methods ho sakte hain, lekin unka primary purpose contract define karna hai.`
      },
      keyPoints: [
        { id: 'kp-08-01-1', title: 'Contract', description: 'An interface is a contract: if a class implements it, it MUST provide implementations for all declared methods.' },
        { id: 'kp-08-01-2', title: 'Abstraction', description: 'Interfaces define WHAT must be done, not HOW. The implementation is left to the implementing class.' },
        { id: 'kp-08-01-3', title: 'implements Keyword', description: 'A class uses the implements keyword to adopt an interface. A class can implement multiple interfaces.' },
        { id: 'kp-08-01-4', title: 'Type System', description: 'An interface defines a type. Any object of a class that implements the interface can be assigned to a variable of the interface type.' },
      ],
      codeExamples: [
        {
          id: 'ce-08-01-1',
          title: 'Basic Interface and Implementation',
          code: `// Interface defines the contract
public interface Drawable {
    void draw();
    void resize(double factor);
}

// Class implements the interface — MUST provide all methods
public class Circle implements Drawable {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public void draw() {
        System.out.println("Drawing circle with radius " + radius);
    }

    @Override
    public void resize(double factor) {
        radius *= factor;
        System.out.println("Resized to radius " + radius);
    }
}

public class Main {
    public static void main(String[] args) {
        Drawable d = new Circle(5.0);
        d.draw();       // Drawing circle with radius 5.0
        d.resize(2.0);  // Resized to radius 10.0
    }
}`,
          language: 'java',
          output: `Drawing circle with radius 5.0
Resized to radius 10.0`,
          explanation: 'The Drawable interface defines two methods: draw() and resize(). Circle must implement both. Notice we can assign a Circle object to a Drawable variable — this is polymorphism through interfaces.',
        },
        {
          id: 'ce-08-01-2',
          title: 'Interface as a Type',
          code: `public interface Payable {
    double calculatePay();
}

public class Employee implements Payable {
    private double salary;

    public Employee(double salary) {
        this.salary = salary;
    }

    @Override
    public double calculatePay() {
        return salary;
    }
}

public class Contractor implements Payable {
    private double hourlyRate;
    private int hoursWorked;

    public Contractor(double hourlyRate, int hoursWorked) {
        this.hourlyRate = hourlyRate;
        this.hoursWorked = hoursWorked;
    }

    @Override
    public double calculatePay() {
        return hourlyRate * hoursWorked;
    }
}

public class PaymentProcessor {
    // Works with ANY Payable — Employee, Contractor, or future classes
    public static void processPayment(Payable p) {
        System.out.println("Paying: $" + p.calculatePay());
    }
}

public class Main {
    public static void main(String[] args) {
        PaymentProcessor.processPayment(new Employee(5000));    // Paying: $5000.0
        PaymentProcessor.processPayment(new Contractor(50, 80)); // Paying: $4000.0
    }
}`,
          language: 'java',
          output: `Paying: $5000.0
Paying: $4000.0`,
          explanation: 'The PaymentProcessor works with the Payable interface, not specific classes. Any class that implements Payable can be processed. This is the power of programming to an interface.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-08-01-1',
          title: 'USB Interface',
          scenario: 'A USB port is an interface. It defines a contract: certain pins, voltage, and data protocol. Any USB device — mouse, keyboard, flash drive — can plug in because they all implement the USB interface contract.',
          oopConcept: 'The USB interface defines what methods (data transfer, power delivery) must be supported. Each device provides its own implementation. The computer does not need to know the specifics of each device.',
        },
        {
          id: 'rwe-08-01-2',
          title: 'Payment Gateway',
          scenario: 'An e-commerce platform needs to support multiple payment methods: credit card, PayPal, bank transfer. Each payment method has different APIs and protocols.',
          oopConcept: 'Define a PaymentGateway interface with methods like authorize(), capture(), and refund(). Each payment method (CreditCardGateway, PayPalGateway) implements this interface. The checkout code works with the interface, not specific implementations.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-08-01-1',
          title: 'Forgetting to Implement All Methods',
          incorrectCode: `public interface Animal {
    void speak();
    void eat();
}

// WRONG: Does not implement eat() — will NOT compile
public class Dog implements Animal {
    @Override
    public void speak() {
        System.out.println("Woof!");
    }
    // Missing eat() implementation!
}`,
          correctCode: `public interface Animal {
    void speak();
    void eat();
}

// CORRECT: All interface methods are implemented
public class Dog implements Animal {
    @Override
    public void speak() {
        System.out.println("Woof!");
    }

    @Override
    public void eat() {
        System.out.println("Dog is eating kibble.");
    }
}`,
          explanation: 'When a class implements an interface, it MUST provide implementations for ALL abstract methods declared in that interface. Missing even one method will cause a compilation error unless the class is declared abstract.',
        },
        {
          id: 'cm-08-01-2',
          title: 'Confusing Interface with Class',
          incorrectCode: `// WRONG: Trying to create an instance of an interface
public interface Shape {
    double area();
}

// Shape s = new Shape(); // COMPILE ERROR! Cannot instantiate interface`,
          correctCode: `// CORRECT: Instantiate a concrete class that implements the interface
public interface Shape {
    double area();
}

public class Circle implements Shape {
    private double radius;
    public Circle(double r) { this.radius = r; }
    @Override public double area() { return Math.PI * radius * radius; }
}

Shape s = new Circle(5.0); // OK — Circle is a concrete class`,
          explanation: 'You cannot instantiate an interface directly because it contains abstract methods with no body. You must create an object of a class that implements the interface. The reference can be of the interface type.',
        },
      ],
      examNotes: [
        { id: 'en-08-01-1', title: 'Interface Definition', content: 'An interface is a collection of abstract methods (and constants) that defines a contract for classes. It provides complete abstraction (pre-Java 8).', importance: 'high' },
        { id: 'en-08-01-2', title: 'Interface vs Abstract Class', content: 'Interface: pure contract, no state, multiple inheritance. Abstract class: partial implementation, state (instance variables), single inheritance. Know when to use each.', importance: 'high' },
        { id: 'en-08-01-3', title: 'implements Keyword', content: 'Class uses implements for interfaces. A class can implement multiple interfaces separated by commas: class X implements A, B, C.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-08-01-1', question: 'What is a Java Interface?', answer: 'An interface is a reference type in Java that defines a set of abstract methods that a class must implement. It acts as a contract between the interface and implementing classes.', difficulty: 'easy' },
        { id: 'vq-08-01-2', question: 'What is the difference between an interface and an abstract class?', answer: 'An interface defines pure contracts with no state or constructors. An abstract class can have constructors, instance variables, and partial implementation. A class can implement multiple interfaces but extend only one abstract class.', difficulty: 'medium' },
        { id: 'vq-08-01-3', question: 'Can you create an object of an interface?', answer: 'No, you cannot instantiate an interface directly because it may contain abstract methods. You must create an object of a concrete class that implements the interface.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-08-01-1', type: 'mcq', question: 'What does an interface define?', options: ['Concrete implementation', 'A contract of methods a class must implement', 'Instance variables', 'Constructors'], correctAnswer: 'A contract of methods a class must implement', explanation: 'An interface defines a contract — a set of abstract methods that any implementing class must provide concrete implementations for.' },
        { id: 'qc-08-01-2', type: 'true-false', question: 'A class can implement multiple interfaces in Java.', correctAnswer: 'True', explanation: 'True. Java supports multiple inheritance of type through interfaces. A class can implement as many interfaces as needed: class X implements A, B, C.' },
        { id: 'qc-08-01-3', type: 'mcq', question: 'Which keyword is used to adopt an interface?', options: ['extends', 'implements', 'inherits', 'uses'], correctAnswer: 'implements', explanation: 'The implements keyword is used by a class to adopt an interface. The extends keyword is used for class inheritance.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-08-01-1',
          scenario: 'You are building a notification system that needs to send notifications via Email, SMS, and Push notifications. Each notification type has different implementation details but the same basic actions: send() and validate().',
          question: 'How should you design this using interfaces?',
          type: 'design-decision',
          options: [
            'Create a Notification interface with send() and validate() methods',
            'Create a Notification abstract class with send() and validate()',
            'Create separate classes with no common type',
            'Use a single Notification class with if-else for each type',
          ],
          correctAnswer: 'Create a Notification interface with send() and validate() methods',
          explanation: 'An interface is ideal here because each notification type has different implementation but shares the same contract. This allows polymorphism and easy addition of new notification types.',
          relatedConcepts: ['interface', 'abstraction', 'polymorphism'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-interface-intro',
      prerequisites: ['lesson-07-01'],
      xpReward: 60,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'interface-contract',
      difficulty: 'easy',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-08-02',
      moduleId: 'module-08',
      title: 'Defining and Implementing Interfaces',
      slug: 'defining-and-implementing-interfaces',
      order: 2,
      duration: 25,
      description: 'Learn the syntax for defining interfaces, implementing them in classes, and the rules that govern interface contracts.',
      learningObjectives: [
        { id: 'lo-08-02-1', description: 'Write a Java interface using the interface keyword', completed: false },
        { id: 'lo-08-02-2', description: 'Implement an interface using the implements keyword', completed: false },
        { id: 'lo-08-02-3', description: 'Understand the rules for interface method declarations', completed: false },
        { id: 'lo-08-02-4', description: 'Use @Override annotation when implementing interface methods', completed: false },
      ],
      englishExplanation: {
        id: 'ee-08-02',
        text: `Defining an interface in Java uses the \`interface\` keyword, similar to how you define a class with the \`class\` keyword. By default, all methods in an interface are \`public abstract\` (before Java 8), and all fields are \`public static final\` constants.

When a class implements an interface, it must provide concrete implementations for every abstract method. The class must use the \`@Override\` annotation to indicate that a method is fulfilling an interface contract. If the class does not implement all methods, it must be declared abstract.

Key rules for interfaces:
1. Methods are public and abstract by default (before Java 8).
2. Fields are public, static, and final by default — they are constants.
3. An interface cannot have constructors.
4. A class can implement multiple interfaces: \`class X implements A, B\`.
5. If two interfaces have the same method signature, the class provides one implementation that satisfies both.
6. An interface can extend other interfaces using the \`extends\` keyword.

Interface inheritance: An interface can extend one or more interfaces. This allows you to build layered, hierarchical interface designs. For example, \`Readable\` and \`Writable\` can both extend a base \`Resource\` interface.

Method naming is critical: when implementing, the method name, return type, and parameter list must exactly match the interface declaration. The \`@Override\` annotation is not strictly required but is strongly recommended as it lets the compiler verify you are correctly overriding the interface method.

Return types must be compatible. If the interface declares \`Object getObject()\`, the implementing class can return any Object subtype. This is called covariant return types.

Access modifiers: The implementing method must be at least as accessible as the interface method. Since interface methods are always public, implementing methods must also be public.`
      },
      romanUrduExplanation: {
        id: 'ru-08-02',
        text: `Java mein interface define karna \`interface\` keyword se hota hai, jaise class define karte hain \`class\` keyword se. Default taur par, interface ke saare methods \`public abstract\` hote hain (Java 8 se pehle), aur saare fields \`public static final\` constants hote hain.

Jab class interface implement karti hai, toh us har abstract method ka concrete implementation dena padta hai. Class ko \`@Override\` annotation use karna chahiye ye batane ke liye ke method interface contract fulfill kar raha hai. Agar class saare methods implement nahi karti, toh usse abstract declare karna padta hai.

Interface ke rules:
1. Methods default taur par public aur abstract hain (Java 8 se pehle).
2. Fields public, static, aur final hain — ye constants hain.
3. Interface mein constructors nahi ho sakte.
4. Ek class multiple interfaces implement kar sakti hai: \`class X implements A, B\`.
5. Agar dono interfaces mein same method signature ho, toh class ek implementation deta hai jo dono ko satisfy kare.
6. Interface doosre interfaces ko extend kar sakta hai \`extends\` keyword se.

Interface inheritance: Ek interface ek ya zyada interfaces ko extend kar sakta hai. Isse aap layered, hierarchical interface designs bana sakte hain. Jaise \`Readable\` aur \`Writable\` dono ek base \`Resource\` interface ko extend kar sakte hain.

Method naming critical hai: implement karte waqt, method name, return type, aur parameter list exactly interface declaration se match hona chahiye.

Return types compatible hone chahiye. Agar interface \`Object getObject()\` declare kare, toh implementing class koi bhi Object subtype return kar sakta hai. Ise covariant return types kehte hain.

Access modifiers: Implementing method utna accessible hona chahiye jitna interface method. Chuke interface methods hamesha public hote hain, implementing methods bhi public hone chahiye.`
      },
      keyPoints: [
        { id: 'kp-08-02-1', title: 'interface Keyword', description: 'Use the interface keyword to define an interface, similar to class but with different rules for members.' },
        { id: 'kp-08-02-2', title: 'implements Keyword', description: 'A class uses implements to adopt an interface. Must provide all abstract method implementations.' },
        { id: 'kp-08-02-3', title: '@Override', description: 'Always use @Override when implementing interface methods. It prevents errors and makes code clear.' },
        { id: 'kp-08-02-4', title: 'Method Matching', description: 'Method name, return type, and parameters must exactly match the interface declaration.' },
      ],
      codeExamples: [
        {
          id: 'ce-08-02-1',
          title: 'Interface Definition and Implementation',
          code: `// Defining the interface
public interface Vehicle {
    void start();
    void stop();
    int getSpeed();
}

// Implementing the interface
public class Car implements Vehicle {
    private int speed = 0;

    @Override
    public void start() {
        speed = 60;
        System.out.println("Car started. Speed: " + speed);
    }

    @Override
    public void stop() {
        speed = 0;
        System.out.println("Car stopped.");
    }

    @Override
    public int getSpeed() {
        return speed;
    }
}

public class Main {
    public static void main(String[] args) {
        Vehicle v = new Car();
        v.start();          // Car started. Speed: 60
        System.out.println(v.getSpeed()); // 60
        v.stop();           // Car stopped.
    }
}`,
          language: 'java',
          output: `Car started. Speed: 60
60
Car stopped.`,
          explanation: 'The Vehicle interface declares three methods. Car implements all three with @Override. The Main class uses a Vehicle reference to interact with the Car object.',
        },
        {
          id: 'ce-08-02-2',
          title: 'Interface Extending Another Interface',
          code: `// Base interface
public interface Animal {
    void speak();
    void eat();
}

// Extending — adding more methods
public interface Pet extends Animal {
    void play();
    void train(String command);
}

// Must implement ALL methods from Animal AND Pet
public class Dog implements Pet {
    @Override
    public void speak() {
        System.out.println("Woof!");
    }

    @Override
    public void eat() {
        System.out.println("Dog eats kibble.");
    }

    @Override
    public void play() {
        System.out.println("Dog plays fetch.");
    }

    @Override
    public void train(String command) {
        System.out.println("Dog learned: " + command);
    }
}`,
          language: 'java',
          explanation: 'Pet extends Animal, so it inherits speak() and eat() from Animal plus adds play() and train(). Dog must implement all four methods. Interface inheritance lets you layer contracts.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-08-02-1',
          title: 'Java Comparable Interface',
          scenario: 'Java\'s Comparable<T> interface has one method: compareTo(T o). Any class that implements Comparable can be sorted using Collections.sort().',
          oopConcept: 'Student implements Comparable<Student>. The compareTo() method defines sorting by GPA. Now Collections.sort() works with Student objects automatically.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-08-02-1',
          title: 'Not Making Implementing Methods Public',
          incorrectCode: `public interface Loggable {
    void log(String message);
}

// WRONG: method is package-private, but interface method is public
public class AppLogger implements Loggable {
    @Override
    void log(String message) { // COMPILE ERROR!
        System.out.println("LOG: " + message);
    }
}`,
          correctCode: `public interface Loggable {
    void log(String message);
}

// CORRECT: method must be public
public class AppLogger implements Loggable {
    @Override
    public void log(String message) {
        System.out.println("LOG: " + message);
    }
}`,
          explanation: 'Interface methods are implicitly public. When implementing them, the methods must also be declared public. Making them package-private or private causes a compilation error.',
        },
      ],
      examNotes: [
        { id: 'en-08-02-1', title: 'Interface Syntax', content: 'interface Name { returnType methodName(params); }. Methods are public abstract by default. Fields are public static final by default.', importance: 'high' },
        { id: 'en-08-02-2', title: 'Implementation Rules', content: 'Class must implement ALL abstract methods. Methods must be public. @Override is recommended. If not all methods implemented, class must be abstract.', importance: 'high' },
        { id: 'en-08-02-3', title: 'Interface Inheritance', content: 'interface B extends A, C. B inherits all methods from A and C. Implementing B means implementing all methods from A, B, and C.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-08-02-1', question: 'What is the syntax for defining an interface?', answer: 'Use the interface keyword followed by the name and curly braces. Inside, declare methods without bodies. Example: interface Drawable { void draw(); }', difficulty: 'easy' },
        { id: 'vq-08-02-2', question: 'What happens if a class does not implement all interface methods?', answer: 'The class must be declared abstract. It will not be instantiable. A concrete subclass must then implement the remaining methods.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-08-02-1', type: 'mcq', question: 'By default, methods in an interface are:', options: ['private and abstract', 'public and abstract', 'protected and final', 'public and static'], correctAnswer: 'public and abstract', explanation: 'Before Java 8, all interface methods are implicitly public and abstract. They have no body and must be implemented by concrete classes.' },
        { id: 'qc-08-02-2', type: 'true-false', question: 'An interface can extend another interface.', correctAnswer: 'True', explanation: 'True. An interface can extend one or more other interfaces using the extends keyword, inheriting all their methods.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-08-02-1',
          scenario: 'You define an interface Validator with method boolean validate(String input). Your class EmailValidator implements Validator but accidentally omits the @Override annotation.',
          question: 'Will the code compile? What is the effect of omitting @Override?',
          type: 'debugging',
          options: [
            'Yes it compiles; @Override is optional but recommended',
            'No it compiles only if @Override is present',
            'Compilation fails because @Override is required',
            'Runtime error occurs without @Override',
          ],
          correctAnswer: 'Yes it compiles; @Override is optional but recommended',
          explanation: '@Override is not required by the compiler but is strongly recommended. Without it, if the method signature does not match the interface, the compiler will not catch the error, leading to an unintended new method instead of an override.',
          relatedConcepts: ['interface', 'override', 'compilation'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-interface-syntax',
      prerequisites: ['lesson-08-01'],
      xpReward: 60,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'interface-implementation',
      difficulty: 'easy',
      estimatedMinutes: 25,
    },
    {
      id: 'lesson-08-03',
      moduleId: 'module-08',
      title: 'Interface Constants',
      slug: 'interface-constants',
      order: 3,
      duration: 15,
      description: 'Understand how fields in interfaces are implicitly public static final constants and their naming conventions.',
      learningObjectives: [
        { id: 'lo-08-03-1', description: 'Understand that interface fields are public static final by default', completed: false },
        { id: 'lo-08-03-2', description: 'Apply UPPER_CASE naming conventions for interface constants', completed: false },
        { id: 'lo-08-03-3', description: 'Know when to use interface constants vs enum constants', completed: false },
      ],
      englishExplanation: {
        id: 'ee-08-03',
        text: `Every field declared in a Java interface is automatically public, static, and final — whether you write those modifiers or not. This means interface fields are constants: they belong to the interface itself (static), are accessible from anywhere (public), and cannot be reassigned (final).

You can declare them with or without the modifiers — the result is the same. The compiler treats all interface fields as \`public static final\` regardless of what you write.

Naming convention: Interface constants are typically written in UPPER_SNAKE_CASE (e.g., MAX_SIZE, DEFAULT_TIMEOUT, PI). This distinguishes them from variables and makes the code more readable.

When to use interface constants:
1. When the constant is naturally associated with the concept the interface represents.
2. When multiple classes that implement the interface need the same constant value.
3. When you want to group related constants in one place without creating a separate class.

When NOT to use interface constants:
1. If the constant is specific to one implementation — put it in that class instead.
2. If you need more complex constants with behavior (use enum instead).
3. If the constant needs to be mutable (interfaces only support final fields).

Interface constants vs Enum constants: Enums are better when you have a fixed set of related values (like DAYS_OF_WEEK, COLORS). Interface constants are better for numeric or string constants that define configuration values or limits.

A common pattern is grouping related constants in purpose-named interfaces. For example, an HTTPStatus interface might define constants like OK = 200, NOT_FOUND = 404, SERVER_ERROR = 500. Classes implement this interface to access the constants.`
      },
      romanUrduExplanation: {
        id: 'ru-08-03',
        text: `Java interface mein declare kiya gaya har field automatically public, static, aur final hota hai — chahe aap wo modifiers likhein ya na likhein. Iska matlab hai ke interface fields constants hain: ye interface ke khud ke hain (static), kahin se bhi accessible hain (public), aur inhe reassign nahi kiya ja sakta (final).

Aap inhe modifiers ke saath ya bina likh sakte hain — result same hoga. Compiler saare interface fields ko \`public static final\` treat karta hai chahe aap kuch bhi likhein.

Naming convention: Interface constants ko typically UPPER_SNAKE_CASE mein likha jaata hai (jaise MAX_SIZE, DEFAULT_TIMEOUT, PI). Ye inhe variables se alag karta hai aur code ko readable banata hai.

Interface constants kab use karein:
1. Jab constant naturally us concept se associated ho jo interface represent karta hai.
2. Jab multiple classes jo interface implement karti hain, same constant value chahiye.
3. Jab aap related constants ko ek jagah group karna chahein bina separate class banaye.

Interface constants kab NA use karein:
1. Agar constant specific implementation ke liye hai — usse class mein rakhein.
2. Agar complex constants with behavior chahiye (enum use karein).
3. Agar constant mutable hona chahiye (sirf final fields support hote hain).

Interface constants vs Enum constants: Enums tab behtar hain jab aapke paas fixed set of related values ho (jaise DAYS_OF_WEEK, COLORS). Interface constants tab behtar hain jab numeric ya string constants configuration values ya limits define karein.`
      },
      keyPoints: [
        { id: 'kp-08-03-1', title: 'Implicit Modifiers', description: 'All interface fields are implicitly public, static, and final. You do not need to declare these modifiers.' },
        { id: 'kp-08-03-2', title: 'Naming Convention', description: 'Interface constants use UPPER_SNAKE_CASE: MAX_SIZE, DEFAULT_PORT, PI.' },
        { id: 'kp-08-03-3', title: 'Cannot Reassign', description: 'Since fields are final, their values cannot be changed after declaration.' },
      ],
      codeExamples: [
        {
          id: 'ce-08-03-1',
          title: 'Interface Constants in Action',
          code: `public interface DatabaseConfig {
    // These are all public static final by default
    int MAX_CONNECTIONS = 100;
    String DEFAULT_HOST = "localhost";
    int DEFAULT_PORT = 3306;
    double TIMEOUT_SECONDS = 30.0;
}

public class MySQLDatabase implements DatabaseConfig {
    public void connect() {
        // Access constants through the interface name
        System.out.println("Connecting to " + DEFAULT_HOST + ":" + DEFAULT_PORT);
        System.out.println("Max connections: " + MAX_CONNECTIONS);
    }
}

public class Main {
    public static void main(String[] args) {
        MySQLDatabase db = new MySQLDatabase();
        db.connect();
        // Connecting to localhost:3306
        // Max connections: 100
    }
}`,
          language: 'java',
          output: `Connecting to localhost:3306
Max connections: 100`,
          explanation: 'DatabaseConfig defines constants. Any implementing class can access them directly. The constants are shared across all implementations.',
        },
        {
          id: 'ce-08-03-2',
          title: 'Constants Without Explicit Modifiers',
          code: `// Both declarations are equivalent — compiler adds public static final
public interface Physics {
    double PI = 3.14159265358979;
    double SPEED_OF_LIGHT = 299792458.0;
}

// This is the same as writing:
public interface PhysicsExplicit {
    public static final double PI = 3.14159265358979;
    public static final double SPEED_OF_LIGHT = 299792458.0;
}

// Both work identically
public class CircleCalculator implements Physics {
    double area(double radius) {
        return PI * radius * radius;
    }
}`,
          language: 'java',
          explanation: 'The PI constant is public static final whether you write those modifiers or not. The compiler automatically adds them. Write them explicitly only for clarity if desired.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-08-03-1',
          title: 'HTTP Status Codes',
          scenario: 'A web application needs to reference HTTP status codes throughout its codebase: 200 for OK, 404 for Not Found, 500 for Server Error.',
          oopConcept: 'Define an HTTPStatus interface with constants like int OK = 200, int NOT_FOUND = 404. Classes that handle HTTP responses implement this interface and use the constants instead of magic numbers.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-08-03-1',
          title: 'Trying to Reassign Interface Constants',
          incorrectCode: `public interface Constants {
    int MAX = 100;
}

// WRONG: Cannot modify a final field
public class User implements Constants {
    void change() {
        MAX = 200; // COMPILE ERROR: cannot assign a value to final variable
    }
}`,
          correctCode: `public interface Constants {
    int MAX = 100;
}

// CORRECT: Use it as-is, or define a new variable
public class User implements Constants {
    void useConstant() {
        int limit = MAX; // OK: reading the constant
        // MAX = 200; // NOT OK: cannot reassign
    }
}`,
          explanation: 'Interface constants are final — they cannot be reassigned. If you need a modifiable value, use a class field (static or instance) instead of an interface constant.',
        },
      ],
      examNotes: [
        { id: 'en-08-03-1', title: 'Implicit Modifiers', content: 'Interface fields are always public static final. You can omit the modifiers and the compiler adds them automatically. This is a common exam question.', importance: 'high' },
        { id: 'en-08-03-2', title: 'Constants vs Variables', content: 'Interface fields cannot be instance variables or mutable. They are compile-time constants. Use class fields for mutable data.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-08-03-1', question: 'What are the default modifiers for interface fields?', answer: 'Public, static, and final. All interface fields are constants that belong to the interface itself, are accessible globally, and cannot be reassigned.', difficulty: 'easy' },
        { id: 'vq-08-03-2', question: 'When should you use interface constants instead of class constants?', answer: 'When the constant is logically associated with the concept the interface represents, and multiple implementing classes need the same value.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-08-03-1', type: 'mcq', question: 'What modifiers does Java automatically add to interface fields?', options: ['private static volatile', 'public static final', 'protected final transient', 'public abstract static'], correctAnswer: 'public static final', explanation: 'All fields in an interface are implicitly public, static, and final. They are constants belonging to the interface.' },
        { id: 'qc-08-03-2', type: 'true-false', question: 'You can change the value of an interface constant after it is declared.', correctAnswer: 'False', explanation: 'False. Interface constants are final, meaning they cannot be reassigned after declaration.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-08-03-1',
          scenario: 'Your application uses the number 42 in multiple places to represent a maximum retry count. You want to centralize this value.',
          question: 'Where should you define this constant?',
          type: 'design-decision',
          options: [
            'In an interface that represents retry behavior',
            'As a literal 42 in every method that uses it',
            'In a separate Constants class with a static field',
            'Both A and C are valid approaches depending on context',
          ],
          correctAnswer: 'Both A and C are valid approaches depending on context',
          explanation: 'If the constant is logically tied to an interface concept (like Retryable), define it in the interface. If it is a general-purpose constant, a Constants utility class is better. Magic numbers (option B) should always be avoided.',
          relatedConcepts: ['constants', 'magic-numbers', 'code-quality'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-interface-constants',
      prerequisites: ['lesson-08-02'],
      xpReward: 50,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'interface-constants',
      difficulty: 'easy',
      estimatedMinutes: 15,
    },
    {
      id: 'lesson-08-04',
      moduleId: 'module-08',
      title: 'Multiple Interface Implementation',
      slug: 'multiple-interface-implementation',
      order: 4,
      duration: 25,
      description: 'Learn how a class can implement multiple interfaces, solving the diamond problem and enabling multiple inheritance of type.',
      learningObjectives: [
        { id: 'lo-08-04-1', description: 'Implement multiple interfaces in a single class', completed: false },
        { id: 'lo-08-04-2', description: 'Understand how Java resolves the diamond problem with interfaces', completed: false },
        { id: 'lo-08-04-3', description: 'Use interfaces for multiple inheritance of type', completed: false },
        { id: 'lo-08-04-4', description: 'Resolve conflicting default method implementations', completed: false },
      ],
      englishExplanation: {
        id: 'ee-08-04',
        text: `Java does not support multiple inheritance of implementation (a class cannot extend multiple classes). However, Java fully supports multiple inheritance of TYPE through interfaces. A class can implement as many interfaces as needed.

When a class implements multiple interfaces, it must provide implementations for all abstract methods from all interfaces. If two interfaces declare the same method signature, the class provides ONE implementation that satisfies both — this resolves the diamond problem at the implementation level.

The diamond problem in Java: Since a class can extend only one class, the state-related diamond problem (which superclass constructor to call?) does not exist. However, with default methods (Java 8+), the diamond problem can arise when two interfaces provide default implementations of the same method.

Resolving default method conflicts:
1. If a class inherits the same default method from two interfaces, the class MUST override the method to resolve the ambiguity.
2. If a class extends a class that provides an implementation AND implements an interface with a default method, the class implementation wins (class > interface).
3. If two interfaces conflict and no resolution exists, the compiler reports an error.

Multiple interface types: A single class can represent many types. A Penguin can implement both Swimmable and Flyable (though penguins cannot fly well). This is the essence of multiple inheritance of type — the object can be treated as any of the types it implements.

Best practice: When designing, prefer many small interfaces over one large interface. This follows the Interface Segregation Principle and keeps implementations focused.`
      },
      romanUrduExplanation: {
        id: 'ru-08-04',
        text: `Java multiple inheritance of implementation support nahi karta (ek class multiple classes extend nahi kar sakti). Lekin Java interfaces ke through multiple inheritance of TYPE fully support karta hai. Ek class jitni chahein interfaces implement kar sakti hai.

Jab class multiple interfaces implement karti hai, toh us saari interfaces ke saare abstract methods ke liye implementations deni padti hain. Agar do interfaces mein same method signature ho, toh class EK implementation deta hai jo dono ko satisfy kare — ye diamond problem ko implementation level par solve karta hai.

Diamond problem in Java: Chuke class sirf ek class extend kar sakti hai, state-related diamond problem (kaunsa superclass constructor call kare?) exist nahi karta. Lekin default methods (Java 8+) ke saath, diamond problem tab ho sakta hai jab do interfaces same method ka default implementation dein.

Default method conflicts resolve karna:
1. Agar class do interfaces se same default method inherit kare, toh class ko method override karna ZAROORI hai ambiguity resolve karne ke liye.
2. Agar class ek class extend kare jo implementation de AUR ek interface implement kare jo default method de, toh class implementation jeet-ti hai (class > interface).
3. Agar dono interfaces conflict karein aur resolution na ho, toh compiler error dega.

Multiple interface types: Ek class kayi types represent kar sakti hai. Ek Penguin dono Swimmable aur Flyable implement kar sakta hai (chahe penguins ud nahi sakte). Ye multiple inheritance of type ka essence hai — object us kisi bhi type ke taur par treat ho sakta hai jo implement kiya hai.

Best practice: Design mein ek badi interface ke bajaye bahut saari chhoti interfaces prefer karein. Ye Interface Segregation Principle follow karta hai aur implementations ko focused rakhta hai.`
      },
      keyPoints: [
        { id: 'kp-08-04-1', title: 'Multiple Interfaces', description: 'A class can implement many interfaces: class X implements A, B, C. Must implement all abstract methods from all interfaces.' },
        { id: 'kp-08-04-2', title: 'Diamond Problem Resolution', description: 'If two interfaces have the same method, the implementing class provides one implementation. If default methods conflict, the class must override.' },
        { id: 'kp-08-04-3', title: 'Multiple Types', description: 'An object can be assigned to any interface type it implements. This enables polymorphism across different hierarchies.' },
        { id: 'kp-08-04-4', title: 'Class Wins Over Interface', description: 'If a class inherits a method from both a superclass and an interface default, the class implementation takes priority.' },
      ],
      codeExamples: [
        {
          id: 'ce-08-04-1',
          title: 'Implementing Multiple Interfaces',
          code: `public interface Swimmable {
    void swim();
}

public interface Flyable {
    void fly();
}

// Penguin implements both — multiple inheritance of type
public class Penguin implements Swimmable, Flyable {
    @Override
    public void swim() {
        System.out.println("Penguin swims gracefully underwater.");
    }

    @Override
    public void fly() {
        System.out.println("Penguin attempts to fly (poorly).");
    }
}

public class Main {
    public static void main(String[] args) {
        Penguin p = new Penguin();

        // Can be treated as Swimmable
        Swimmable swimmer = p;
        swimmer.swim();  // Penguin swims gracefully underwater.

        // Can be treated as Flyable
        Flyable flyer = p;
        flyer.fly();     // Penguin attempts to fly (poorly).

        // Penguin is all three types simultaneously
    }
}`,
          language: 'java',
          output: `Penguin swims gracefully underwater.
Penguin attempts to fly (poorly).`,
          explanation: 'Penguin implements two interfaces, gaining two types. The same object can be used wherever Swimmable or Flyable is expected. This is multiple inheritance of type.',
        },
        {
          id: 'ce-08-04-2',
          title: 'Resolving Default Method Diamond Problem',
          code: `public interface A {
    default void greet() {
        System.out.println("Hello from A");
    }
}

public interface B {
    default void greet() {
        System.out.println("Hello from B");
    }
}

// MUST override greet() to resolve ambiguity
public class C implements A, B {
    @Override
    public void greet() {
        A.super.greet(); // Explicitly choose A's version
        System.out.println("Hello from C");
    }
}

public class Main {
    public static void main(String[] args) {
        C obj = new C();
        obj.greet();
        // Hello from A
        // Hello from C
    }
}`,
          language: 'java',
          output: `Hello from A
Hello from C`,
          explanation: 'Both A and B provide default greet(). C must override it. The implementation can choose to call one interface\'s default using InterfaceName.super.method().',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-08-04-1',
          title: 'Runnable and Comparable',
          scenario: 'A data processing task needs to be executable in a thread (Runnable) and comparable for sorting (Comparable<Task>).',
          oopConcept: 'class DataTask implements Runnable, Comparable<DataTask>. The class provides run() for threading and compareTo() for sorting. One class, multiple capabilities through multiple interfaces.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-08-04-1',
          title: 'Not Resolving Default Method Conflicts',
          incorrectCode: `public interface A {
    default void show() { System.out.println("A"); }
}
public interface B {
    default void show() { System.out.println("B"); }
}

// WRONG: Does not override show() — COMPILE ERROR
public class C implements A, B {
    // Error: class C inherits unrelated defaults for show()
}`,
          correctCode: `public interface A {
    default void show() { System.out.println("A"); }
}
public interface B {
    default void show() { System.out.println("B"); }
}

// CORRECT: Override to resolve ambiguity
public class C implements A, B {
    @Override
    public void show() {
        A.super.show(); // or B.super.show(), or custom logic
    }
}`,
          explanation: 'When two interfaces provide conflicting default methods, the implementing class MUST override the method. The compiler will not choose one automatically.',
        },
      ],
      examNotes: [
        { id: 'en-08-04-1', title: 'Multiple Inheritance of Type', content: 'Java supports multiple inheritance of type through interfaces. A class can implement many interfaces. This is one of Java\'s most important features.', importance: 'high' },
        { id: 'en-08-04-2', title: 'Diamond Problem', content: 'The state-related diamond problem does not exist in Java (only single class inheritance). Default method conflicts are resolved by mandatory override in the implementing class.', importance: 'high' },
        { id: 'en-08-04-3', title: 'Class > Interface', content: 'When a class inherits a method from both a superclass and an interface default, the class implementation wins. This is the method resolution order.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-08-04-1', question: 'How does Java solve the diamond problem?', answer: 'Java does not allow multiple class inheritance, avoiding the state-related diamond problem. For default method conflicts, the implementing class must override the conflicting method. The class implementation always wins over interface defaults.', difficulty: 'medium' },
        { id: 'vq-08-04-2', question: 'Can a class extend one class and implement multiple interfaces?', answer: 'Yes. The extends clause must come first, followed by implements. Example: class Dog extends Animal implements Swimmable, Pet.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-08-04-1', type: 'mcq', question: 'How many interfaces can a Java class implement?', options: ['Only one', 'Maximum two', 'As many as needed', 'Exactly three'], correctAnswer: 'As many as needed', explanation: 'Java imposes no limit on the number of interfaces a class can implement. A class can implement dozens of interfaces if needed.' },
        { id: 'qc-08-04-2', type: 'true-false', question: 'If two interfaces provide conflicting default methods, the compiler automatically picks one.', correctAnswer: 'False', explanation: 'False. The implementing class must explicitly override the conflicting method. The compiler will not choose one automatically.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-08-04-1',
          scenario: 'You are designing a robot class. The robot should be able to walk (Walkable), talk (Speakable), and calculate (Calculable). Each capability is defined in its own interface.',
          question: 'How should the Robot class relate to these interfaces?',
          type: 'design-decision',
          options: [
            'class Robot implements Walkable, Speakable, Calculable',
            'class Robot extends Walkable, Speakable, Calculable',
            'class Robot implements Walkable extends Speakable',
            'Create three separate Robot classes',
          ],
          correctAnswer: 'class Robot implements Walkable, Speakable, Calculable',
          explanation: 'A class implements multiple interfaces to gain multiple type capabilities. This is the standard way to combine behaviors in Java.',
          relatedConcepts: ['multiple-interfaces', 'type-system', 'composition'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-multiple-interfaces',
      prerequisites: ['lesson-08-02', 'lesson-08-03'],
      xpReward: 75,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'diamond-problem',
      difficulty: 'medium',
      estimatedMinutes: 25,
    },
    {
      id: 'lesson-08-05',
      moduleId: 'module-08',
      title: 'Default Methods',
      slug: 'default-methods',
      order: 5,
      duration: 20,
      description: 'Learn about Java 8 default methods in interfaces — how they enable backward compatibility and provide optional implementations.',
      learningObjectives: [
        { id: 'lo-08-05-1', description: 'Define default methods in an interface', completed: false },
        { id: 'lo-08-05-2', description: 'Understand why default methods were introduced in Java 8', completed: false },
        { id: 'lo-08-05-3', description: 'Override default methods in implementing classes', completed: false },
        { id: 'lo-08-05-4', description: 'Know when to use default methods vs abstract methods', completed: false },
      ],
      englishExplanation: {
        id: 'ee-08-05',
        text: `Default methods were introduced in Java 8 to solve a major backward compatibility problem. Before Java 8, if you added a new method to an interface, every class implementing that interface would break. Default methods solve this by allowing interfaces to provide a default implementation.

A default method is declared using the \`default\` keyword followed by a method body. Implementing classes inherit this default behavior automatically but can override it if needed.

Why default methods matter:
1. **Backward Compatibility**: You can add new methods to existing interfaces without breaking millions of lines of existing code. The default implementation provides a fallback.
2. **API Evolution**: Libraries can evolve their interfaces over time. Java's own Collection interface gained many default methods in Java 8 (stream(), forEach(), removeIf()).
3. **Optional Override**: Implementing classes can use the default behavior or provide their own. This is flexible and developer-friendly.

Key rules:
1. Default methods are public (implicitly).
2. A class can override a default method and optionally call the original using \`InterfaceName.super.methodName()\`.
3. If a class implements two interfaces with conflicting default methods, the class MUST override the method to resolve the conflict.
4. Default methods cannot be private or protected (only public).

When to use default methods:
- When adding a new method to an existing interface without breaking implementations.
- When providing a sensible default behavior that most implementations can use.
- When the method has a general, non-specialized implementation.

When NOT to use default methods:
- When the method is core to the interface contract and every implementation must provide it.
- When the default behavior could lead to subtle bugs (like silently doing nothing).
- When a utility class or abstract class would be more appropriate.`
      },
      romanUrduExplanation: {
        id: 'ru-08-05',
        text: `Default methods Java 8 mein ek major backward compatibility problem solve karne ke liye introduce kiye gaye. Java 8 se pehle, agar aap kisi interface mein naya method add karein, toh us interface ko implement karne wali saari classes toot jaati thi. Default methods is problem ko solve karte hain — interface ko default implementation dene ki ijaazat dete hain.

Default method \`default\` keyword se declare hota hai uske saath method body hoti hai. Implementing classes ye default behavior automatically inherit karti hain lekin chahein toh override kar sakti hain.

Default methods kyun zaroori hain:
1. **Backward Compatibility**: Aap existing interfaces mein naye methods add kar sakte hain bina existing code ko todoye. Default implementation fallback deta hai.
2. **API Evolution**: Libraries apne interfaces ko time ke saath evolve kar sakti hain. Java ka khud Collection interface Java 8 mein bahut saare default methods gain kiya (stream(), forEach(), removeIf()).
3. **Optional Override**: Implementing classes default behavior use kar sakti hain ya apni khud ki de sakti hain. Ye flexible hai.

Key rules:
1. Default methods public hote hain (implicitly).
2. Ek class default method override kar sakti hai aur optionally original ko call kar sakti hai \`InterfaceName.super.methodName()\` se.
3. Agar class do interfaces ke conflicting default methods implement kare, toh method override karna ZAROORI hai.
4. Default methods private ya protected nahi ho sakte.

Kab use karein:
- Jab existing interface mein naya method add karna ho bina implementations todoye.
- Jab default behavior dena ho jo zyada tar implementations use kar sakein.

Kab NA use karein:
- Jab method core ho interface contract ka aur har implementation ko dena padega.
- Jab default behavior subtle bugs cause kare.`
      },
      keyPoints: [
        { id: 'kp-08-05-1', title: 'default Keyword', description: 'Use the default keyword to provide a method body inside an interface. The method becomes optional for implementing classes.' },
        { id: 'kp-08-05-2', title: 'Backward Compatibility', description: 'Default methods allow adding new methods to interfaces without breaking existing implementations.' },
        { id: 'kp-08-05-3', title: 'Optional Override', description: 'Implementing classes inherit default behavior but can override it. Use InterfaceName.super to call the default.' },
      ],
      codeExamples: [
        {
          id: 'ce-08-05-1',
          title: 'Default Method in Action',
          code: `public interface Greeting {
    void greet(String name);

    // Default method — optional to override
    default void greetWithTime(String name) {
        int hour = java.time.LocalTime.now().getHour();
        String period = hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : "Evening";
        System.out.println("Good " + period + ", " + name + "!");
    }
}

public class FormalGreeting implements Greeting {
    @Override
    public void greet(String name) {
        System.out.println("Hello, " + name + ".");
    }
    // Uses default greetWithTime() — no override needed
}

public class CasualGreeting implements Greeting {
    @Override
    public void greet(String name) {
        System.out.println("Hey " + name + "!");
    }

    @Override
    public void greetWithTime(String name) {
        System.out.println("Yo " + name + "! What's up?");
    }
}

public class Main {
    public static void main(String[] args) {
        FormalGreeting formal = new FormalGreeting();
        formal.greet("Ahmed");            // Hello, Ahmed.
        formal.greetWithTime("Ahmed");    // Good Morning, Ahmed! (or Afternoon/Evening)

        CasualGreeting casual = new CasualGreeting();
        casual.greet("Sara");             // Hey Sara!
        casual.greetWithTime("Sara");     // Yo Sara! What's up?
    }
}`,
          language: 'java',
          explanation: 'FormalGreeting uses the default implementation of greetWithTime(). CasualGreeting overrides it with custom behavior. This is the flexibility default methods provide.',
        },
        {
          id: 'ce-08-05-2',
          title: 'Calling Default Method with super',
          code: `public interface Logger {
    default void log(String message) {
        System.out.println("[DEFAULT] " + message);
    }
}

public class AppLogger implements Logger {
    @Override
    public void log(String message) {
        // Add timestamp, then call the default
        System.out.print("[APP] ");
        Logger.super.log(message); // Calls the default implementation
        System.out.println(" [Logged at " + java.time.LocalTime.now() + "]");
    }
}

public class Main {
    public static void main(String[] args) {
        new AppLogger().log("Server started");
        // [APP] [DEFAULT] Server started [Logged at 14:30:25.123]
    }
}`,
          language: 'java',
          explanation: 'The Logger.super.log() call invokes the default implementation from the Logger interface. This lets you extend rather than replace the default behavior.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-08-05-1',
          title: 'Java Collection forEach()',
          scenario: 'Java 8 added forEach() as a default method to the Iterable interface. Millions of existing classes that implement Iterable automatically gained forEach() without any code changes.',
          oopConcept: 'This is the primary reason default methods exist: evolving APIs without breaking backward compatibility. Every ArrayList, HashSet, and LinkedList got forEach() for free.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-08-05-1',
          title: 'Forgetting to Resolve Conflicting Defaults',
          incorrectCode: `public interface Readable {
    default String read() { return "Reading..."; }
}
public interface Logger {
    default String read() { return "Logging..."; }
}

// WRONG: Does not resolve the conflict
public class FileReader implements Readable, Logger {
    // COMPILE ERROR: inherited unrelated defaults
}`,
          correctCode: `public interface Readable {
    default String read() { return "Reading..."; }
}
public interface Logger {
    default String read() { return "Logging..."; }
}

// CORRECT: Override to resolve
public class FileReader implements Readable, Logger {
    @Override
    public String read() {
        return Readable.super.read(); // choose one
    }
}`,
          explanation: 'When two interfaces provide conflicting defaults, the implementing class MUST override. The compiler does not auto-resolve.',
        },
      ],
      examNotes: [
        { id: 'en-08-05-1', title: 'Java 8 Feature', content: 'Default methods were introduced in Java 8 for backward compatibility. They allow interfaces to have method bodies. This is a frequently asked topic.', importance: 'high' },
        { id: 'en-08-05-2', title: 'Conflict Resolution', content: 'When two default methods conflict, the class MUST override. Can call either default using InterfaceName.super.method(). Class methods always win over interface defaults.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-08-05-1', question: 'Why were default methods introduced in Java 8?', answer: 'To maintain backward compatibility when adding new methods to existing interfaces. Before Java 8, adding a method broke all implementations. Default methods provide a fallback behavior.', difficulty: 'medium' },
        { id: 'vq-08-05-2', question: 'Can a default method be private?', answer: 'No. Default methods are implicitly public. Java 9 later added private interface methods, but those are separate from default methods.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-08-05-1', type: 'mcq', question: 'What keyword is used to define a default method in an interface?', options: ['abstract', 'static', 'default', 'virtual'], correctAnswer: 'default', explanation: 'The default keyword is used to provide a method body inside an interface. The method becomes optional for implementing classes.' },
        { id: 'qc-08-05-2', type: 'true-false', question: 'Default methods were introduced in Java 8 for backward compatibility.', correctAnswer: 'True', explanation: 'True. Java 8 introduced default methods so that new methods could be added to interfaces without breaking existing implementations.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-08-05-1',
          scenario: 'You manage a widely-used library. Your main interface has 50 implementations. You need to add a new method without breaking any of them.',
          question: 'How should you add this method?',
          type: 'design-decision',
          options: [
            'Add it as a default method with a sensible fallback implementation',
            'Add it as an abstract method and update all 50 implementations',
            'Create a new interface and have classes optionally implement it',
            'Both A and C are valid strategies',
          ],
          correctAnswer: 'Both A and C are valid strategies',
          explanation: 'A default method lets you add behavior without breaking implementations. Creating a new interface is also valid if the new behavior is orthogonal. Both strategies are used in real-world API evolution.',
          relatedConcepts: ['backward-compatibility', 'api-design', 'default-methods'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-default-methods',
      prerequisites: ['lesson-08-04'],
      xpReward: 65,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'default-methods',
      difficulty: 'medium',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-08-06',
      moduleId: 'module-08',
      title: 'Static Methods in Interfaces',
      slug: 'static-methods-in-interfaces',
      order: 6,
      duration: 15,
      description: 'Learn how static methods in interfaces provide utility functions and factory methods without needing a separate utility class.',
      learningObjectives: [
        { id: 'lo-08-06-1', description: 'Define static methods inside an interface', completed: false },
        { id: 'lo-08-06-2', description: 'Understand that static interface methods are not inherited', completed: false },
        { id: 'lo-08-06-3', description: 'Use static methods for factory methods and utility functions', completed: false },
      ],
      englishExplanation: {
        id: 'ee-08-06',
        text: `Java 8 introduced static methods in interfaces. These are utility methods that belong to the interface itself and are called using the interface name. Unlike default methods, static methods are NOT inherited by implementing classes.

Calling static interface methods: Use the interface name followed by the method name — \`InterfaceName.methodName()\`. You do not need to create an instance of a class that implements the interface.

Key characteristics:
1. Static methods in interfaces are implicitly public.
2. They are NOT inherited — you cannot call them through an implementing class reference.
3. They cannot be overridden by implementing classes (they are not part of the instance method table).
4. They can be used for factory methods that create instances of implementing classes.
5. They can provide utility functions related to the interface concept.

Factory Method Pattern: Static methods in interfaces are perfect for creating instances. Instead of exposing constructors, you can provide a static factory method like \`Color.fromName("red")\` or \`Point.of(10, 20)\`.

Why use static methods in interfaces:
1. **Co-location**: Utility methods are defined alongside the interface they relate to, rather than in a separate class.
2. **Discoverability**: Developers looking at the interface immediately see available utility methods.
3. **Cleaner API**: No need for separate utility classes like Collections or Arrays.
4. **Factory Methods**: Provide convenient ways to create instances without constructors.

Java's own interfaces use static methods extensively. For example, \`List.of()\`, \`Map.of()\`, and \`Optional.empty()\` are all static methods defined on their respective interfaces.`
      },
      romanUrduExplanation: {
        id: 'ru-08-06',
        text: `Java 8 ne interfaces mein static methods introduce kiye. Ye utility methods hain jo interface ke khud ke hain aur interface name se call hote hain. Default methods ke mukhtalif, static methods implementing classes ke through INHERIT nahi hote.

Static interface methods call karna: Interface name se start karein followed by method name — \`InterfaceName.methodName()\`. Aapko implementing class ka instance banana zaroori nahi hai.

Key characteristics:
1. Interfaces ke static methods implicitly public hote hain.
2. Ye INHERIT nahi hote — aap inhe implementing class reference se call nahi kar sakte.
3. Ye implementing classes override nahi kar sakti (ye instance method table ka part nahi hain).
4. Ye factory methods ke liye use ho sakte hain jo implementing classes ke instances banayein.
5. Ye interface concept se related utility functions provide kar sakte hain.

Factory Method Pattern: Interfaces ke static methods instances banane ke liye perfect hain. Constructors expose karne ki bajaye, aap static factory method de sakte hain jaise \`Color.fromName("red")\` ya \`Point.of(10, 20)\`.

Static methods interfaces mein kyun use karein:
1. **Co-location**: Utility methods us interface ke saath defined hain jinse related hain, alag class ki bajaye.
2. **Discoverability**: Developers interface dekhte hi available utility methods dekh lete hain.
3. **Cleaner API**: Alag utility classes ki zaroorat nahi jaise Collections ya Arrays.
4. **Factory Methods**: Constructors ke bina instances banane ke convenient ways.

Java ke khud ke interfaces static methods extensively use karte hain. Jaise \`List.of()\`, \`Map.of()\`, aur \`Optional.empty()\` sab unke respective interfaces par defined static methods hain.`
      },
      keyPoints: [
        { id: 'kp-08-06-1', title: 'Not Inherited', description: 'Static methods in interfaces are not inherited by implementing classes. You must call them using the interface name.' },
        { id: 'kp-08-06-2', title: 'Factory Methods', description: 'Static methods are ideal for factory methods: Color.fromName("red"), Point.of(10, 20).' },
        { id: 'kp-08-06-3', title: 'Co-location', description: 'Utility methods live with the interface they relate to, improving discoverability and organization.' },
      ],
      codeExamples: [
        {
          id: 'ce-08-06-1',
          title: 'Static Methods and Factory Pattern',
          code: `public interface Shape {
    double area();
    double perimeter();

    // Factory methods
    static Shape circle(double radius) {
        return new Circle(radius);
    }

    static Shape rectangle(double width, double height) {
        return new Rectangle(width, height);
    }

    // Utility method
    static String describe(Shape s) {
        return String.format("Shape[area=%.2f, perimeter=%.2f]", s.area(), s.perimeter());
    }
}

public class Circle implements Shape {
    private double radius;
    public Circle(double r) { this.radius = r; }
    @Override public double area() { return Math.PI * radius * radius; }
    @Override public double perimeter() { return 2 * Math.PI * radius; }
}

public class Rectangle implements Shape {
    private double width, height;
    public Rectangle(double w, double h) { this.width = w; this.height = h; }
    @Override public double area() { return width * height; }
    @Override public double perimeter() { return 2 * (width + height); }
}

public class Main {
    public static void main(String[] args) {
        // Factory methods — no need to know about Circle or Rectangle classes
        Shape s1 = Shape.circle(5);
        Shape s2 = Shape.rectangle(4, 6);

        System.out.println(Shape.describe(s1));
        // Shape[area=78.54, perimeter=31.42]
        System.out.println(Shape.describe(s2));
        // Shape[area=24.00, perimeter=20.00]

        // Cannot call through implementing class!
        // Circle.circle(5); // COMPILE ERROR — static not inherited
    }
}`,
          language: 'java',
          output: `Shape[area=78.54, perimeter=31.42]
Shape[area=24.00, perimeter=20.00]`,
          explanation: 'Static factory methods on the Shape interface create instances without exposing constructors. The describe() utility is co-located with the interface. Note: Circle.circle(5) does not work — static methods are not inherited.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-08-06-1',
          title: 'List.of() Factory Method',
          scenario: 'Java 9 introduced List.of(), Set.of(), and Map.of() as static factory methods on the interface itself.',
          oopConcept: 'Instead of new ArrayList<>(Arrays.asList(...)), you write List.of(1, 2, 3). The static method on the List interface creates the appropriate implementation. This is cleaner and more discoverable.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-08-06-1',
          title: 'Trying to Call Static Method Through Instance',
          incorrectCode: `public interface Processor {
    static Processor create() { return new DefaultProcessor(); }
}

// WRONG: Static methods are not inherited
Processor p = new DefaultProcessor();
p.create(); // COMPILE ERROR: create() is not defined in DefaultProcessor`,
          correctCode: `// CORRECT: Call through the interface name
Processor p = Processor.create(); // OK
// Or
DefaultProcessor dp = new DefaultProcessor();`,
          explanation: 'Static methods in interfaces are not inherited. You must call them through the interface name, not through an instance or implementing class reference.',
        },
      ],
      examNotes: [
        { id: 'en-08-06-1', title: 'Static Methods Not Inherited', content: 'Static interface methods cannot be called through implementing class instances or references. They must be called using InterfaceName.method(). This is a key distinction from default methods.', importance: 'high' },
        { id: 'en-08-06-2', title: 'Factory Pattern', content: 'Static methods in interfaces are commonly used for factory methods: List.of(), Map.of(), Optional.of(). Know this pattern for exams and interviews.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-08-06-1', question: 'Can static methods in interfaces be inherited?', answer: 'No. Static methods are not inherited by implementing classes. They must be called using the interface name directly: InterfaceName.method().', difficulty: 'easy' },
        { id: 'vq-08-06-2', question: 'What is a common use case for static methods in interfaces?', answer: 'Factory methods for creating instances (List.of(), Shape.circle()), and utility methods related to the interface concept (Collections.unmodifiableList()).', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-08-06-1', type: 'true-false', question: 'Static methods in interfaces can be called through an implementing class instance.', correctAnswer: 'False', explanation: 'False. Static methods are not inherited. You must call them using the interface name: InterfaceName.method().' },
        { id: 'qc-08-06-2', type: 'mcq', question: 'What is a common use for static methods in interfaces?', options: ['Instance variables', 'Factory methods and utilities', 'Constructors', 'Instance methods'], correctAnswer: 'Factory methods and utilities', explanation: 'Static methods in interfaces are commonly used for factory methods (creating instances) and utility functions related to the interface concept.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-08-06-1',
          scenario: 'You are designing a Color interface. You want to provide a way to create Color objects from names like "red", "green", "blue" without requiring users to know about RGB constructors.',
          question: 'What is the best approach?',
          type: 'design-decision',
          options: [
            'Add a static factory method: Color.fromName("red")',
            'Add a constructor to the interface',
            'Create a ColorFactory utility class',
            'Make Color an abstract class',
          ],
          correctAnswer: 'Add a static factory method: Color.fromName("red")',
          explanation: 'Static factory methods on the interface are the cleanest approach. They co-locate the creation logic with the type, are discoverable, and do not require separate factory classes.',
          relatedConcepts: ['factory-pattern', 'static-methods', 'api-design'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-static-interface',
      prerequisites: ['lesson-08-05'],
      xpReward: 55,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'static-methods',
      difficulty: 'medium',
      estimatedMinutes: 15,
    },
    {
      id: 'lesson-08-07',
      moduleId: 'module-08',
      title: 'Functional Interfaces',
      slug: 'functional-interfaces',
      order: 7,
      duration: 25,
      description: 'Master functional interfaces, Single Abstract Method (SAM), lambda expressions, and the @FunctionalInterface annotation.',
      learningObjectives: [
        { id: 'lo-08-07-1', description: 'Define a functional interface with exactly one abstract method', completed: false },
        { id: 'lo-08-07-2', description: 'Use lambda expressions to implement functional interfaces', completed: false },
        { id: 'lo-08-07-3', description: 'Apply the @FunctionalInterface annotation', completed: false },
        { id: 'lo-08-07-4', description: 'Use built-in functional interfaces: Predicate, Function, Consumer, Supplier', completed: false },
      ],
      englishExplanation: {
        id: 'ee-08-07',
        text: `A functional interface is an interface with exactly ONE abstract method (SAM — Single Abstract Method). This is the foundation of lambda expressions in Java. Functional interfaces can have any number of default and static methods, but only one abstract method.

The @FunctionalInterface annotation is optional but recommended. It tells the compiler to enforce the single-abstract-method rule. If you accidentally add a second abstract method, the compiler will report an error. This annotation is similar to @Override — it is a compile-time safety check.

Lambda expressions: A lambda is a concise way to implement a functional interface. Instead of creating a full anonymous inner class, you can write a short expression. For example: \`(a, b) -> a + b\` implements a Comparator.

Lambda syntax:
- No parameters: \`() -> expression\`
- One parameter: \`(x) -> expression\` or \`x -> expression\`
- Multiple parameters: \`(x, y) -> expression\` or \`(x, y) -> { statements; }\`
- With type inference: Java can usually infer parameter types.

Built-in functional interfaces (java.util.function):
1. **Predicate<T>**: Takes T, returns boolean. Used for filtering: \`s -> s.length() > 5\`
2. **Function<T, R>**: Takes T, returns R. Used for transformation: \`s -> s.toUpperCase()\`
3. **Consumer<T>**: Takes T, returns void. Used for side effects: \`s -> System.out.println(s)\`
4. **Supplier<T>**: Takes nothing, returns T. Used for creation: \`() -> new ArrayList()\`

Functional interfaces enable the Streams API, event handlers, callbacks, and a more functional style of Java programming. They bridge the gap between OOP and functional programming.

Common functional interfaces from java.util.function:
- UnaryOperator<T>: T -> T (unary operation)
- BinaryOperator<T>: (T, T) -> T (binary operation)
- BiFunction<T, U, R>: (T, U) -> R
- BiPredicate<T, U>: (T, U) -> boolean
- ToIntFunction<T>: T -> int

Custom functional interfaces: You can define your own. Example: \`@FunctionalInterface interface Validator { boolean validate(String input); }\`. Then use lambdas: \`Validator v = s -> s.length() > 0;\`

When to use @FunctionalInterface:
- Always, when you intend the interface to be a functional interface.
- It protects against accidentally adding a second abstract method later.
- It documents the intent clearly.`
      },
      romanUrduExplanation: {
        id: 'ru-08-07',
        text: `Functional interface ek interface hai jo exactly EK abstract method rakhta hai (SAM — Single Abstract Method). Ye Java mein lambda expressions ki foundation hai. Functional interfaces mein kitne bhi default aur static methods ho sakte hain, lekin sirf ek abstract method hona chahiye.

@FunctionalInterface annotation optional hai lekin recommended hai. Ye compiler ko batata hai ke single-abstract-method rule enforce kare. Agar galti se doosra abstract method add kar dein, toh compiler error dega. Ye annotation @Override jaisa hai — compile-time safety check.

Lambda expressions: Lambda ek concise tarika hai functional interface ko implement karne ke liye. Poori anonymous inner class likhne ki bajaye, aap short expression likh sakte hain. Jaise: \`(a, b) -> a + b\` ek Comparator implement karta hai.

Lambda syntax:
- Koi parameters nahi: \`() -> expression\`
- Ek parameter: \`(x) -> expression\` ya \`x -> expression\`
- Multiple parameters: \`(x, y) -> expression\` ya \`(x, y) -> { statements; }\`
- Type inference ke saath: Java usually parameter types infer kar sakta hai.

Built-in functional interfaces (java.util.function):
1. **Predicate<T>**: T leta hai, boolean deta hai. Filtering ke liye: \`s -> s.length() > 5\`
2. **Function<T, R>**: T leta hai, R deta hai. Transformation ke liye: \`s -> s.toUpperCase()\`
3. **Consumer<T>**: T leta hai, void deta hai. Side effects ke liye: \`s -> System.out.println(s)\`
4. **Supplier<T>**: kuch nahi leta, T deta hai. Creation ke liye: \`() -> new ArrayList()\`

Functional interfaces Streams API, event handlers, callbacks, aur functional style programming enable karte hain. Ye OOP aur functional programming ke beech gap bridge karte hain.

Custom functional interfaces: Aap apne khud ke bana sakte hain. Jaise: \`@FunctionalInterface interface Validator { boolean validate(String input); }\`. Phir lambdas use karein: \`Validator v = s -> s.length() > 0;\`

@FunctionalInterface kab use karein:
- Hamesha, jab interface intentionally functional interface ho.
- Ye galti se doosra abstract method add karne se bachata hai.
- Ye intent clearly document karta hai.`
      },
      keyPoints: [
        { id: 'kp-08-07-1', title: 'Single Abstract Method', description: 'A functional interface has exactly one abstract method. It can have many default and static methods.' },
        { id: 'kp-08-07-2', title: 'Lambda Expressions', description: 'Lambdas provide a concise way to implement functional interfaces: (params) -> expression.' },
        { id: 'kp-08-07-3', title: '@FunctionalInterface', description: 'Optional annotation that enforces the single-abstract-method rule. Always use it for clarity.' },
        { id: 'kp-08-07-4', title: 'Built-in Interfaces', description: 'java.util.function provides Predicate, Function, Consumer, Supplier, and many more.' },
      ],
      codeExamples: [
        {
          id: 'ce-08-07-1',
          title: 'Custom Functional Interface with Lambda',
          code: `@FunctionalInterface
public interface StringProcessor {
    String process(String input);
}

public class Main {
    public static void main(String[] args) {
        // Lambda implementing StringProcessor
        StringProcessor upper = s -> s.toUpperCase();
        StringProcessor reverse = s -> new StringBuilder(s).reverse().toString();
        StringProcessor shout = s -> s.toUpperCase() + "!!!";

        System.out.println(upper.process("hello"));   // HELLO
        System.out.println(reverse.process("hello"));  // olleh
        System.out.println(shout.process("hello"));    // HELLO!!!

        // Method that accepts a functional interface
        applyProcessor("hello world", s -> s.replace("world", "Java"));
        // Output: hello Java
    }

    static void applyProcessor(String input, StringProcessor processor) {
        System.out.println(processor.process(input));
    }
}`,
          language: 'java',
          output: `HELLO
olleh
HELLO!!!
hello Java`,
          explanation: 'StringProcessor is a custom functional interface with one abstract method. Lambdas concisely implement it. The applyProcessor method accepts any StringProcessor, enabling flexible behavior injection.',
        },
        {
          id: 'ce-08-07-2',
          title: 'Built-in Functional Interfaces',
          code: `import java.util.*;
import java.util.function.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Ahmed", "Sara", "Ali", "Fatima", "Usman");

        // Predicate — filtering
        Predicate<String> startsWithA = s -> s.startsWith("A");
        names.stream().filter(startsWithA).forEach(System.out::println);
        // Ahmed, Ali

        // Function — transformation
        Function<String, Integer> length = String::length;
        names.stream().map(length).forEach(System.out::println);
        // 5, 4, 3, 6, 5

        // Consumer — side effects
        Consumer<String> print = System.out::println;
        names.forEach(print);

        // Supplier — creation
        Supplier<List<String>> listFactory = ArrayList::new;
        List<String> newList = listFactory.get();
        System.out.println("New list created: " + newList.isEmpty()); // true
    }
}`,
          language: 'java',
          output: `Ahmed
Ali
5
4
3
6
5
Ahmed
Sara
Ali
Fatima
Usman
New list created: true`,
          explanation: 'Each built-in functional interface serves a purpose: Predicate for filtering, Function for transforming, Consumer for performing side effects, Supplier for creating objects. Method references (::) provide even shorter syntax.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-08-07-1',
          title: 'Event Handlers in GUI',
          scenario: 'A GUI button needs to execute code when clicked. The ActionListener interface is a functional interface with one method: actionPerformed(ActionEvent e).',
          oopConcept: 'button.addActionListener(e -> System.out.println("Clicked!")); The lambda implements the functional interface concisely. Before lambdas, you needed an anonymous inner class with 5+ lines of boilerplate.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-08-07-1',
          title: 'Adding a Second Abstract Method to @FunctionalInterface',
          incorrectCode: `@FunctionalInterface
public interface Calculator {
    double calculate(double a, double b);

    // COMPILE ERROR: second abstract method breaks the contract
    double memoryUsage();
}`,
          correctCode: `@FunctionalInterface
public interface Calculator {
    double calculate(double a, double b);

    // OK: default methods are allowed
    default void printResult(double a, double b) {
        System.out.println(calculate(a, b));
    }

    // OK: static methods are allowed
    static double add(double a, double b) {
        return a + b;
    }
}`,
          explanation: '@FunctionalInterface enforces exactly one abstract method. You can add default and static methods, but not a second abstract method. This is the entire point of the annotation.',
        },
      ],
      examNotes: [
        { id: 'en-08-07-1', title: 'SAM Rule', content: 'A functional interface has exactly one abstract method. It can have any number of default and static methods. This is the basis for lambda expressions.', importance: 'high' },
        { id: 'en-08-07-2', title: 'Built-in Interfaces', content: 'Know Predicate, Function, Consumer, and Supplier. Know their method signatures and common use cases. Frequently tested.', importance: 'high' },
        { id: 'en-08-07-3', title: 'Lambda Syntax', content: 'Parameters -> expression. Single parameter does not need parentheses. Multiple statements need curly braces and return keyword.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-08-07-1', question: 'What is a functional interface?', answer: 'An interface with exactly one abstract method. It can have default and static methods. The @FunctionalInterface annotation enforces this rule.', difficulty: 'easy' },
        { id: 'vq-08-07-2', question: 'What are the four main built-in functional interfaces?', answer: 'Predicate<T> (returns boolean), Function<T,R> (transforms), Consumer<T> (side effects), Supplier<T> (creates). All in java.util.function.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-08-07-1', type: 'mcq', question: 'How many abstract methods can a functional interface have?', options: ['Zero', 'Exactly one', 'Two', 'Unlimited'], correctAnswer: 'Exactly one', explanation: 'A functional interface must have exactly one abstract method. It can have unlimited default and static methods.' },
        { id: 'qc-08-07-2', type: 'mcq', question: 'Which interface takes an input and returns a boolean?', options: ['Consumer<T>', 'Supplier<T>', 'Function<T,R>', 'Predicate<T>'], correctAnswer: 'Predicate<T>', explanation: 'Predicate<T> takes a value of type T and returns a boolean. It is commonly used for filtering operations.' },
        { id: 'qc-08-07-3', type: 'true-false', question: 'The @FunctionalInterface annotation is required for a functional interface to work with lambdas.', correctAnswer: 'False', explanation: 'False. The annotation is optional. Any interface with one abstract method is a functional interface. The annotation is a safety check and documentation tool.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-08-07-1',
          scenario: 'You need to filter a list of products to find those with price less than 50, then transform each into a formatted string.',
          question: 'Which functional interfaces would you use?',
          type: 'concept-application',
          options: [
            'Predicate<Product> for filtering, Function<Product, String> for transformation',
            'Consumer<Product> for filtering, Supplier<String> for transformation',
            'Function<Product, Boolean> for filtering, Predicate<String> for transformation',
            'Runnable for filtering, Callable for transformation',
          ],
          correctAnswer: 'Predicate<Product> for filtering, Function<Product, String> for transformation',
          explanation: 'Predicate tests a condition (boolean return). Function transforms one type to another. This is the standard pattern for filter + map operations.',
          relatedConcepts: ['functional-interfaces', 'streams', 'lambda'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-functional-interfaces',
      prerequisites: ['lesson-08-05', 'lesson-08-06'],
      xpReward: 75,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'lambda-expressions',
      difficulty: 'medium',
      estimatedMinutes: 25,
    },
    {
      id: 'lesson-08-08',
      moduleId: 'module-08',
      title: 'Interface Segregation Principle',
      slug: 'interface-segregation-principle',
      order: 8,
      duration: 20,
      description: 'Learn the Interface Segregation Principle (ISP) — one of the SOLID principles — and why small, focused interfaces are better than large, bloated ones.',
      learningObjectives: [
        { id: 'lo-08-08-1', description: 'Define the Interface Segregation Principle', completed: false },
        { id: 'lo-08-08-2', description: 'Identify ISP violations in code', completed: false },
        { id: 'lo-08-08-3', description: 'Refactor fat interfaces into smaller, focused ones', completed: false },
        { id: 'lo-08-08-4', description: 'Apply role-based interface design', completed: false },
      ],
      englishExplanation: {
        id: 'ee-08-08',
        text: `The Interface Segregation Principle (ISP) states: "Clients should not be forced to depend on interfaces they do not use." In simpler terms: many small, focused interfaces are better than one large, general-purpose interface.

Robert C. Martin (Uncle Bob) formulated ISP as one of the five SOLID principles. The problem ISP addresses is "fat" interfaces — interfaces with too many methods that force implementing classes to provide empty or meaningless implementations.

Why fat interfaces are bad:
1. **Forced Implementation**: Classes must implement methods they don't need. This leads to empty method bodies or UnsupportedOperationExceptions.
2. **Tight Coupling**: Changes to one part of the interface force changes in all implementing classes, even those that don't use the changed methods.
3. **Reduced Readability**: A class implementing 20 methods is hard to understand. The core purpose gets lost.
4. **Testing Difficulty**: You need to mock or stub methods you don't use.

ISP in practice:
- Instead of one Worker interface with work(), eat(), sleep(), break(), train(), retire(), create separate interfaces: Workable, Feedable, Restable.
- Each class implements only the interfaces relevant to it. A Robot implements Workable but not Feedable or Restable.
- Client code depends on the specific interface it needs, not the entire Worker hierarchy.

Role-based design: Each interface represents a specific role or capability. A class can adopt the roles it needs. This is more flexible than one monolithic interface.

ISP aligns with the concept of cohesion — each interface should have a single, well-defined purpose. High cohesion leads to more maintainable, understandable code.`
      },
      romanUrduExplanation: {
        id: 'ru-08-08',
        text: `Interface Segregation Principle (ISP) kehta hai: "Clients ko un interfaces par depend nahi kiya jaana chahiye jo wo use nahi karte." Simple taur par: bahut saari chhoti, focused interfaces ek badi, general-purpose interface se behtar hain.

Robert C. Martin (Uncle Bob) ne ISP ko SOLID principles mein se ek ke taur par formulate kiya. ISP jo problem address karta hai wo "fat" interfaces hain — bahut zyada methods wale interfaces jo implementing classes ko empty ya meaningless implementations dene par majboor karte hain.

Fat interfaces kyun bure hain:
1. **Forced Implementation**: Classes ko methods implement karne padte hain jo unhe chahiye nahi. Isse empty method bodies ya UnsupportedOperationException aate hain.
2. **Tight Coupling**: Interface ke ek part mein changes sab implementing classes mein changes force karte hain, chahe wo changed methods use na karein.
3. **Reduced Readability**: 20 methods implement karne wali class samajhna mushkil hota hai. Core purpose gum ho jaata hai.
4. **Testing Difficulty**: Aapko mock ya stub karna padta hai jo methods use nahi kar rahe.

ISP practice mein:
- Ek Worker interface ki bajaye work(), eat(), sleep(), break(), train(), retire() ke saath, alag interfaces banayein: Workable, Feedable, Restable.
- Har class sirf relevant interfaces implement kare. Robot Workable implement kare lekin Feedable ya Restable nahi.
- Client code us specific interface par depend kare jo use kare, poori Worker hierarchy par nahi.

Role-based design: Har interface ek specific role ya capability represent karta hai. Ek class wo roles adopt kare jo chahiye. Ye ek monolithic interface se zyada flexible hai. ISP cohesion ke concept ke saath align karta hai — har interface ka single, well-defined purpose hona chahiye.`
      },
      keyPoints: [
        { id: 'kp-08-08-1', title: 'Fat Interface Problem', description: 'Large interfaces force classes to implement methods they do not need, leading to empty or meaningless implementations.' },
        { id: 'kp-08-08-2', title: 'Small Focused Interfaces', description: 'Split fat interfaces into smaller, role-based interfaces. Each class implements only what it needs.' },
        { id: 'kp-08-08-3', title: 'Client Independence', description: 'Clients should depend only on the interfaces they actually use. This reduces coupling.' },
      ],
      codeExamples: [
        {
          id: 'ce-08-08-1',
          title: 'ISP Violation and Fix',
          code: `// BAD: Fat interface — Robot forced to implement eat() and sleep()
interface Worker {
    void work();
    void eat();
    void sleep();
}

class Robot implements Worker {
    @Override public void work() { System.out.println("Robot working"); }
    @Override public void eat() {
        throw new UnsupportedOperationException("Robots don't eat!");
    }
    @Override public void sleep() {
        throw new UnsupportedOperationException("Robots don't sleep!");
    }
}

// GOOD: Segregated interfaces
interface Workable { void work(); }
interface Feedable { void eat(); }
interface Restable { void sleep(); }

class HumanWorker implements Workable, Feedable, Restable {
    @Override public void work() { System.out.println("Human working"); }
    @Override public void eat() { System.out.println("Human eating"); }
    @Override public void sleep() { System.out.println("Human sleeping"); }
}

class RobotWorker implements Workable {
    @Override public void work() { System.out.println("Robot working"); }
    // No eat() or sleep() — not forced!
}`,
          language: 'java',
          explanation: 'The fat Worker interface forces Robot to implement eat() and sleep() which it cannot do. The segregated interfaces let Robot implement only Workable, while HumanWorker implements all three.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-08-08-1',
          title: 'Printer System',
          scenario: 'A Printer interface has print(), scan(), fax(), and photocopy(). Not all printers support all functions. A basic printer only prints.',
          oopConcept: 'Split into Printable, Scannable, Faxable, Copyable. BasicPrinter implements only Printable. AllInOnePrinter implements all four. Each device implements only what it supports.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-08-08-1',
          title: 'Creating Too Many Granular Interfaces',
          incorrectCode: `// Over-engineered: too many tiny interfaces
interface CanWalk { void walk(); }
interface CanTalk { void talk(); }
interface CanBreathe { void breathe(); }
interface CanThink { void think(); }
interface CanFeel { void feel(); }
interface CanSee { void see(); }
interface CanHear { void hear(); }

// Every class needs 5-7 implements clauses
class Human implements CanWalk, CanTalk, CanBreathe, CanThink, CanFeel, CanSee, CanHear {
    // 7 interface implementations for one simple class
}`,
          correctCode: `// Balanced: group related capabilities
interface Physical { void walk(); void breathe(); }
interface Sensory { void see(); void hear(); }
interface Cognitive { void think(); void feel(); void talk(); }

class Human implements Physical, Sensory, Cognitive {
    @Override public void walk() { }
    @Override public void breathe() { }
    @Override public void see() { }
    @Override public void hear() { }
    @Override public void think() { }
    @Override public void feel() { }
    @Override public void talk() { }
}`,
          explanation: 'ISP says many small interfaces, but not atomically small. Group related capabilities into cohesive interfaces. Balance is key — too many interfaces is as bad as too few.',
        },
      ],
      examNotes: [
        { id: 'en-08-08-1', title: 'ISP Definition', content: 'Clients should not depend on methods they do not use. Split fat interfaces into smaller, role-based interfaces. This is one of the five SOLID principles.', importance: 'high' },
        { id: 'en-08-08-2', title: 'Benefits', content: 'Reduced coupling, easier maintenance, better testability, clearer class responsibilities. Forces single responsibility at the interface level.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-08-08-1', question: 'What is the Interface Segregation Principle?', answer: 'ISP states that clients should not be forced to depend on interfaces they do not use. Instead of one large interface, create multiple small, focused interfaces.', difficulty: 'easy' },
        { id: 'vq-08-08-2', question: 'Give an example of an ISP violation.', answer: 'A Worker interface with work(), eat(), and sleep() forces a Robot to implement eat() and sleep() which it cannot do. This violates ISP.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-08-08-1', type: 'mcq', question: 'What does ISP stand for?', options: ['Interface State Pattern', 'Interface Segregation Principle', 'Interface Standard Protocol', 'Interface Static Processing'], correctAnswer: 'Interface Segregation Principle', explanation: 'ISP stands for Interface Segregation Principle. It is one of the five SOLID principles of OOP design.' },
        { id: 'qc-08-08-2', type: 'true-false', question: 'ISP suggests having one large interface that covers all possible methods.', correctAnswer: 'False', explanation: 'False. ISP suggests the opposite: many small, focused interfaces so clients only depend on what they use.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-08-08-1',
          scenario: 'You are designing an e-commerce system. You have a Product interface with methods: getName(), getPrice(), getDiscount(), applyCoupon(), trackShipment(), reviewProduct(). Not all products support all operations.',
          question: 'How should you apply ISP?',
          type: 'design-decision',
          options: [
            'Keep the single Product interface as-is',
            'Split into: ReadableProduct, PurchasableProduct, ReviewableProduct, ShippableProduct',
            'Make Product an abstract class instead',
            'Add default methods that throw UnsupportedOperationException',
          ],
          correctAnswer: 'Split into: ReadableProduct, PurchasableProduct, ReviewableProduct, ShippableProduct',
          explanation: 'ISP recommends splitting fat interfaces into smaller, focused ones. Digital products may not need ShippableProduct. Read-only displays only need ReadableProduct.',
          relatedConcepts: ['ISP', 'interface-design', 'SOLID'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-isp',
      prerequisites: ['lesson-08-07'],
      xpReward: 65,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'interface-segregation',
      difficulty: 'medium',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-08-09',
      moduleId: 'module-08',
      title: 'Abstract Classes vs Interfaces',
      slug: 'abstract-classes-vs-interfaces',
      order: 9,
      duration: 20,
      description: 'Understand when to use abstract classes vs interfaces with a clear decision guide and comparative analysis.',
      learningObjectives: [
        { id: 'lo-08-09-1', description: 'Compare abstract classes and interfaces feature by feature', completed: false },
        { id: 'lo-08-09-2', description: 'Decide when to use an abstract class vs an interface', completed: false },
        { id: 'lo-08-09-3', description: 'Combine both in a single design effectively', completed: false },
      ],
      englishExplanation: {
        id: 'ee-08-09',
        text: `Abstract classes and interfaces are both used for abstraction, but they serve different purposes and have different capabilities. Understanding when to use each is a critical design skill.

Feature comparison:
| Feature | Abstract Class | Interface |
|---------|---------------|-----------|
| Constructors | Yes | No |
| Instance variables | Yes | No (only constants) |
| Methods | Abstract + concrete | Abstract + default + static |
| Inheritance | Single (extends) | Multiple (implements) |
| Access modifiers | Any | Public only (pre-Java 9) |
| State | Has state (fields) | No state |

When to use an abstract class:
1. When classes share a common state (instance variables).
2. When you need constructors.
3. When you want to provide partial implementation.
4. When there IS-A relationship and shared code.
5. Example: Animal abstract class with name, age fields and eat() method.

When to use an interface:
1. When defining a capability or contract without state.
2. When multiple classes need to implement the same contract.
3. When you need multiple inheritance of type.
4. When defining callback mechanisms or event handlers.
5. Example: Comparable, Serializable, Cloneable.

When to use BOTH:
- Abstract class for shared implementation, interface for additional capabilities.
- Example: AbstractShape (abstract class) with area() default + Drawable (interface) with draw() contract.

The "is-a" vs "can-do" test:
- IS-A: A Dog IS-A Animal → use inheritance (abstract class).
- CAN-DO: A Dog CAN-DO Swim → use interface (Swimmable).

Modern Java: With default methods, the line has blurred. Many patterns that previously required abstract classes can now use interfaces. However, abstract classes still win when shared state and constructors are needed.`
      },
      romanUrduExplanation: {
        id: 'ru-08-09',
        text: `Abstract classes aur interfaces dono abstraction ke liye use hote hain, lekin alag purposes serve karte hain aur alag capabilities rakhte hain. Kab kya use karna hai ye critical design skill hai.

Feature comparison:
| Feature | Abstract Class | Interface |
|---------|---------------|-----------|
| Constructors | Haan | Nahi |
| Instance variables | Haan | Nahi (sirf constants) |
| Methods | Abstract + concrete | Abstract + default + static |
| Inheritance | Single (extends) | Multiple (implements) |
| Access modifiers | Koi bhi | Sirf Public |
| State | State rakhta hai | State nahi |

Abstract class kab use karein:
1. Jab classes mein common state ho (instance variables).
2. Jab constructors chahiye ho.
3. Jab partial implementation dena ho.
4. Jab IS-A relationship aur shared code ho.
5. Example: Animal abstract class jisme name, age fields aur eat() method ho.

Interface kab use karein:
1. Jab state ke bina capability ya contract define karna ho.
2. Jab multiple classes ko same contract implement karna ho.
3. Jab multiple inheritance of type chahiye.
4. Jab callback mechanisms ya event handlers define karna ho.
5. Example: Comparable, Serializable, Cloneable.

Dono kab use karein:
- Abstract class shared implementation ke liye, interface additional capabilities ke liye.
- Example: AbstractShape (abstract class) with area() default + Drawable (interface) with draw() contract.

"IS-A" vs "CAN-DO" test:
- IS-A: Dog IS-A Animal → inheritance use karein (abstract class).
- CAN-DO: Dog CAN-DO Swim → interface use karein (Swimmable).

Modern Java: Default methods ke saath, line blur ho gayi hai. Bahut se patterns jo pehle abstract classes require karte the, ab interfaces use kar sakte hain. Lekin abstract classes tab bhi behtar hain jab shared state aur constructors chahiye.`
      },
      keyPoints: [
        { id: 'kp-08-09-1', title: 'State vs Contract', description: 'Abstract classes hold state (instance variables). Interfaces define contracts without state.' },
        { id: 'kp-08-09-2', title: 'Single vs Multiple', description: 'A class extends one abstract class but implements many interfaces.' },
        { id: 'kp-08-09-3', title: 'IS-A vs CAN-DO', description: 'Use abstract class for IS-A relationships. Use interface for CAN-DO capabilities.' },
      ],
      codeExamples: [
        {
          id: 'ce-08-09-1',
          title: 'Using Both Together',
          code: `// Abstract class — shared state and implementation
abstract class Vehicle {
    protected String name;
    protected int speed;

    public Vehicle(String name) {
        this.name = name;
    }

    public void describe() {
        System.out.println(name + " going " + speed + " km/h");
    }

    abstract void start();
}

// Interface — additional capability
interface Electric {
    int getBatteryLevel();
    void charge();
}

// Interface — another capability
interface GPS {
    String getLocation();
}

// Concrete class — inherits abstract class + implements interfaces
class TeslaModel3 extends Vehicle implements Electric, GPS {
    private int batteryLevel = 100;
    private String location = "Lahore";

    public TeslaModel3() {
        super("Tesla Model 3");
    }

    @Override void start() { System.out.println("Tesla silently starts"); }
    @Override public int getBatteryLevel() { return batteryLevel; }
    @Override public void charge() { batteryLevel = 100; System.out.println("Fully charged"); }
    @Override public String getLocation() { return location; }
}

public class Main {
    public static void main(String[] args) {
        TeslaModel3 tesla = new TeslaModel3();
        tesla.start();       // Tesla silently starts
        tesla.describe();    // Tesla Model 3 going 0 km/h
        tesla.charge();      // Fully charged
        System.out.println(tesla.getLocation()); // Lahore
    }
}`,
          language: 'java',
          output: `Tesla silently starts
Tesla Model 3 going 0 km/h
Fully charged
Lahore`,
          explanation: 'Vehicle abstract class provides shared state (name, speed) and common behavior. Electric and GPS interfaces add capabilities. The concrete class combines both approaches.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-08-09-1',
          title: 'Database Connection System',
          scenario: 'You need to support MySQL, PostgreSQL, and MongoDB. All share connection logic (host, port, credentials) but have different query syntax.',
          oopConcept: 'Abstract class DatabaseConnection holds shared state (host, port) and common methods (connect, disconnect). Interfaces like Queryable define query-specific contracts. MySQLConnection extends DatabaseConnection and implements Queryable.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-08-09-1',
          title: 'Using Abstract Class When Interface is Better',
          incorrectCode: `// BAD: Using abstract class for a pure capability
abstract class Comparable {
    abstract int compareTo(Object o);
}

// Now cannot implement other interfaces alongside it
class Student extends Comparable implements Serializable {
    // Works, but loses ability to extend another class
}`,
          correctCode: `// GOOD: Interface for pure capability
public interface Comparable<T> {
    int compareTo(T o);
}

// Can extend another class AND implement more interfaces
class Student extends Person implements Comparable<Student>, Serializable {
    @Override
    public int compareTo(Student other) {
        return this.name.compareTo(other.name);
    }
}`,
          explanation: 'Comparable is a pure contract with no state. Using an interface allows classes to extend other classes while also being Comparable. Abstract class limits to single inheritance.',
        },
      ],
      examNotes: [
        { id: 'en-08-09-1', title: 'Decision Guide', content: 'Abstract class: shared state, constructors, IS-A. Interface: contract, capability, CAN-DO, multiple types. Know this decision process.', importance: 'high' },
        { id: 'en-08-09-2', title: 'Modern Java', content: 'Default methods in interfaces blur the line. Many patterns that needed abstract classes can now use interfaces. But abstract classes still win for shared state.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-08-09-1', question: 'When would you choose an abstract class over an interface?', answer: 'When classes share common state (instance variables), need constructors, or you want to provide partial implementation. Abstract classes support IS-A relationships with shared code.', difficulty: 'medium' },
        { id: 'vq-08-09-2', question: 'Can a class extend an abstract class and implement interfaces?', answer: 'Yes. The extends clause comes first, then implements. Example: class Dog extends Animal implements Swimmable, Pet.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-08-09-1', type: 'mcq', question: 'Which has constructors?', options: ['Interface', 'Abstract class', 'Both', 'Neither'], correctAnswer: 'Abstract class', explanation: 'Abstract classes can have constructors. Interfaces cannot have constructors (before Java 17 records, interfaces never had constructors).' },
        { id: 'qc-08-09-2', type: 'mcq', question: 'Which allows multiple inheritance of type?', options: ['Abstract class', 'Interface', 'Both', 'Neither'], correctAnswer: 'Interface', explanation: 'A class can implement multiple interfaces, gaining multiple types. A class can extend only one abstract class.' },
        { id: 'qc-08-09-3', type: 'true-false', question: 'An interface can have instance variables.', correctAnswer: 'False', explanation: 'False. Interfaces cannot have instance variables. They can only have public static final constants.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-08-09-1',
          scenario: 'You are designing a library system. Book and Magazine share common properties (title, author, isbn) but Book has different borrowing rules than Magazine.',
          question: 'How should you design this?',
          type: 'design-decision',
          options: [
            'Abstract class Publication with title, author; Book and Magazine extend it',
            'Interface Publication with getTitle(); Book and Magazine implement it',
            'Both: abstract class for shared state, interface for Borrowable capability',
            'Single Publication class with a type field',
          ],
          correctAnswer: 'Both: abstract class for shared state, interface for Borrowable capability',
          explanation: 'Abstract class Publication holds shared state (title, author, isbn). An interface Borrowable defines borrowing behavior. Magazine might implement Borrowable differently than Book.',
          relatedConcepts: ['abstract-class', 'interface', 'inheritance', 'design'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-abstract-vs-interface',
      prerequisites: ['lesson-08-04', 'lesson-08-08'],
      xpReward: 65,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'design-decision',
      difficulty: 'medium',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-08-10',
      moduleId: 'module-08',
      title: 'Practical Interface Design',
      slug: 'practical-interface-design',
      order: 10,
      duration: 25,
      description: 'Apply interface design to real-world scenarios with examples like Comparable, Serializable, and custom interfaces.',
      learningObjectives: [
        { id: 'lo-08-10-1', description: 'Design custom interfaces for real-world problems', completed: false },
        { id: 'lo-08-10-2', description: 'Understand Java Comparable and Serializable interfaces', completed: false },
        { id: 'lo-08-10-3', description: 'Apply interface design patterns in practical projects', completed: false },
        { id: 'lo-08-10-4', description: 'Evaluate interface design quality', completed: false },
      ],
      englishExplanation: {
        id: 'ee-08-10',
        text: `This lesson brings everything together with practical, real-world interface design. We examine Java's own well-designed interfaces and create custom ones for common scenarios.

**Comparable<T>**: One of Java's most important interfaces. Defines \`int compareTo(T o)\` which establishes a natural ordering. Classes that implement Comparable can be sorted using Collections.sort() and Arrays.sort(). The contract: return negative if this < other, zero if equal, positive if this > other.

**Serializable**: A marker interface (no methods) that signals a class can be serialized. The JVM uses this to determine if an object can be converted to a byte stream. Example: \`class User implements Serializable { ... }\`.

**Custom Interface Design — Notification System**:
Design interfaces based on roles and capabilities:
- Notifiable: can receive notifications
- Sendable: can send notifications
- Schedulable: can be scheduled
- Loggable: can log events

Each entity implements only the interfaces relevant to it. A User implements Notifiable. A NotificationService implements Sendable and Schedulable.

**Custom Interface Design — Repository Pattern**:
In data access layers, interfaces define CRUD operations:
- \`Repository<T, ID>\`: findAll(), findById(), save(), delete()
- \`JpaRepository<T, ID> extends Repository<T, ID>\`: add findAll by criteria
- \`CrudRepository<T, ID>\`: basic CRUD

This layered interface design allows different implementations (SQL, NoSQL, in-memory) while maintaining the same contract.

**Design Quality Checklist**:
1. Single Responsibility: Does the interface have one clear purpose?
2. Interface Segregation: Is it small enough? Can implementers easily fulfill it?
3. Stability: Will adding new methods break implementations?
4. Naming: Does the name clearly communicate the contract?
5. Documentation: Are method contracts well-documented?

**Strategy Pattern with Interfaces**: Define a strategy interface (SortStrategy, PaymentStrategy). Different implementations (BubbleSort, QuickSort; CreditCard, PayPal) provide different behaviors. The context class works with the interface, not specific implementations.

The key insight: well-designed interfaces make code flexible, testable, and maintainable. Poorly designed interfaces create coupling and rigidity.`
      },
      romanUrduExplanation: {
        id: 'ru-08-10',
        text: `Ye lesson practical, real-world interface design ke saath sab kuch together bring karta hai. Hum Java ke khud ke well-designed interfaces examine karte hain aur common scenarios ke liye custom ones banate hain.

**Comparable<T>**: Java ke sabse important interfaces mein se ek hai. \`int compareTo(T o)\` define karta hai jo natural ordering establish karta hai. Comparable implement karne wali classes Collections.sort() aur Arrays.sort() se sort ho sakti hain. Contract: negative return karein agar this < other, zero agar equal, positive agar this > other.

**Serializable**: Ek marker interface (koi methods nahi) jo signal karta hai ke class serialize ho sakta hai. JVM isse determine karta hai ke object ko byte stream mein convert kiya ja sakta hai ya nahi.

**Custom Interface Design — Notification System**:
Roles aur capabilities ke basis par interfaces design karein:
- Notifiable: notifications receive kar sakta hai
- Sendable: notifications bhej sakta hai
- Schedulable: schedule ho sakta hai
- Loggable: events log kar sakta hai

Har entity sirf relevant interfaces implement kare. User Notifiable implement kare. NotificationService Sendable aur Schedulable implement kare.

**Custom Interface Design — Repository Pattern**:
Data access layers mein, interfaces CRUD operations define karte hain:
- \`Repository<T, ID>\`: findAll(), findById(), save(), delete()
- \`JpaRepository<T, ID> extends Repository<T, ID>\`: criteria based findAll add karta hai

Ye layered interface design alag implementations (SQL, NoSQL, in-memory) allow karta hai jabke same contract maintain karta hai.

**Design Quality Checklist**:
1. Single Responsibility: Interface ka ek clear purpose hai?
2. Interface Segregation: Enough chhota hai? Implementers easily fulfill kar sakein?
3. Stability: Naye methods add karne se implementations tootengi?
4. Naming: Name clearly communicate karta hai contract ko?
5. Documentation: Method contracts well-documented hain?

**Strategy Pattern with Interfaces**: Strategy interface define karein (SortStrategy, PaymentStrategy). Alag implementations (BubbleSort, QuickSort; CreditCard, PayPal) alag behaviors provide karte hain. Context class interface ke saath kaam karta hai, specific implementations ke nahi.

Key insight: well-designed interfaces code ko flexible, testable, aur maintainable banate hain. Poorly designed interfaces coupling aur rigidity create karte hain.`
      },
      keyPoints: [
        { id: 'kp-08-10-1', title: 'Comparable', description: 'Defines natural ordering via compareTo(). Returns negative, zero, or positive. Enables sorting.' },
        { id: 'kp-08-10-2', title: 'Serializable', description: 'Marker interface signaling a class can be serialized to a byte stream. No methods.' },
        { id: 'kp-08-10-3', title: 'Role-Based Design', description: 'Design interfaces around roles and capabilities, not implementations.' },
        { id: 'kp-08-10-4', title: 'Layered Interfaces', description: 'Extend interfaces to create layered abstractions: Repository -> JpaRepository -> CrudRepository.' },
      ],
      codeExamples: [
        {
          id: 'ce-08-10-1',
          title: 'Comparable Implementation',
          code: `import java.util.*;

public class Student implements Comparable<Student> {
    private String name;
    private double gpa;

    public Student(String name, double gpa) {
        this.name = name;
        this.gpa = gpa;
    }

    // Natural ordering: sort by GPA descending
    @Override
    public int compareTo(Student other) {
        return Double.compare(other.gpa, this.gpa);
    }

    @Override
    public String toString() {
        return name + " (GPA: " + gpa + ")";
    }

    public static void main(String[] args) {
        List<Student> students = new ArrayList<>(Arrays.asList(
            new Student("Ahmed", 3.7),
            new Student("Sara", 3.9),
            new Student("Ali", 3.5)
        ));

        Collections.sort(students); // Uses compareTo
        System.out.println(students);
        // [Sara (GPA: 3.9), Ahmed (GPA: 3.7), Ali (GPA: 3.5)]
    }
}`,
          language: 'java',
          output: `[Sara (GPA: 3.9), Ahmed (GPA: 3.7), Ali (GPA: 3.5)]`,
          explanation: 'Student implements Comparable<Student>. The compareTo() method defines ordering by GPA descending. Collections.sort() uses this to sort the list.',
        },
        {
          id: 'ce-08-10-2',
          title: 'Custom Repository Interface Pattern',
          code: `// Base repository interface
public interface Repository<T, ID> {
    List<T> findAll();
    Optional<T> findById(ID id);
    T save(T entity);
    void deleteById(ID id);
}

// Extended interface for specific queries
public interface UserRepository extends Repository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByAgeGreaterThan(int age);
}

// In-memory implementation
public class InMemoryUserRepository implements UserRepository {
    private Map<Long, User> store = new HashMap<>();

    @Override public List<User> findAll() { return new ArrayList<>(store.values()); }
    @Override public Optional<User> findById(Long id) { return Optional.ofNullable(store.get(id)); }
    @Override public User save(User user) { store.put(user.getId(), user); return user; }
    @Override public void deleteById(Long id) { store.remove(id); }
    @Override public Optional<User> findByEmail(String email) {
        return store.values().stream().filter(u -> u.getEmail().equals(email)).findFirst();
    }
    @Override public List<User> findByAgeGreaterThan(int age) {
        return store.values().stream().filter(u -> u.getAge() > age).toList();
    }
}`,
          language: 'java',
          explanation: 'The Repository pattern uses interfaces to define data access contracts. Different implementations (in-memory, SQL, NoSQL) can be swapped without changing client code. This is a cornerstone of clean architecture.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-08-10-1',
          title: 'Payment Processing System',
          scenario: 'An e-commerce platform needs to support Credit Card, PayPal, and Bank Transfer payments. Each has different APIs and authentication.',
          oopConcept: 'Define a PaymentGateway interface with authorize(), capture(), refund(). Each payment method implements this interface. The checkout service works with PaymentGateway, not specific implementations. Adding Apple Pay later requires only a new implementation — no changes to checkout code.',
        },
        {
          id: 'rwe-08-10-2',
          title: 'Game Character System',
          scenario: 'A game has characters with different abilities: warriors fight, mages cast spells, healers heal. Some characters can do multiple things.',
          oopConcept: 'Interfaces: Fightable (attack, defend), SpellCaster (cast), Healer (heal). Warrior implements Fightable. Mage implements Fightable and SpellCaster. Healer implements Healer. Paladin implements all three. Each character type implements only the capabilities it has.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-08-10-1',
          title: 'Over-Engineering Interface Design',
          incorrectCode: `// Too many interfaces for a simple system
interface CanBeNamed { String getName(); }
interface CanBeDescribed { String getDescription(); }
interface CanBeIdentified { long getId(); }
interface CanBeSerialized { byte[] serialize(); }
interface CanBeDisplayed { void render(); }

// Every class needs to implement 5 interfaces
class Product implements CanBeNamed, CanBeDescribed, CanBeIdentified, CanBeSerialized, CanBeDisplayed {
    // Too many interfaces for a simple entity!
}`,
          correctCode: `// Balanced design
interface Entity {
    long getId();
    String getName();
}

interface Displayable {
    void render();
}

class Product implements Entity, Displayable {
    private long id;
    private String name;

    @Override public long getId() { return id; }
    @Override public String getName() { return name; }
    @Override public void render() { System.out.println("Rendering: " + name); }
}`,
          explanation: 'Don\'t over-engineer. Group related capabilities into cohesive interfaces. Two well-designed interfaces are better than five overly granular ones.',
        },
      ],
      examNotes: [
        { id: 'en-08-10-1', title: 'Comparable Contract', content: 'compareTo() returns negative if this < other, zero if equal, positive if this > other. Must be consistent with equals(). Frequently tested.', importance: 'high' },
        { id: 'en-08-10-2', title: 'Design Patterns', content: 'Repository pattern, Strategy pattern, and Observer pattern all rely on interfaces. Know these patterns and their interface-based design.', importance: 'high' },
        { id: 'en-08-10-3', title: 'Marker Interfaces', content: 'Serializable and Cloneable are marker interfaces (no methods). They signal capabilities to the JVM. This is a valid use of interfaces.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-08-10-1', question: 'What is the Comparable interface and how does compareTo() work?', answer: 'Comparable defines natural ordering. compareTo() returns negative if this is less, zero if equal, positive if greater. Collections.sort() uses it. It must be consistent with equals().', difficulty: 'medium' },
        { id: 'vq-08-10-2', question: 'What is a marker interface?', answer: 'An interface with no methods that signals a capability. Serializable and Cloneable are examples. The JVM checks for these interfaces to determine if certain operations are allowed.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-08-10-1', type: 'mcq', question: 'What does Comparable.compareTo() return for equal objects?', options: ['Positive number', 'Negative number', 'Zero', 'Null'], correctAnswer: 'Zero', explanation: 'compareTo() returns zero when the objects are considered equal in terms of the ordering. This is part of the Comparable contract.' },
        { id: 'qc-08-10-2', type: 'true-false', question: 'Serializable is a marker interface with no methods.', correctAnswer: 'True', explanation: 'True. Serializable has no methods. It simply signals that a class can be serialized. The JVM uses this marker to allow serialization operations.' },
        { id: 'qc-08-10-3', type: 'mcq', question: 'What pattern uses interfaces to define data access contracts?', options: ['Singleton', 'Factory', 'Repository', 'Observer'], correctAnswer: 'Repository', explanation: 'The Repository pattern defines CRUD operations through interfaces. Different implementations (SQL, NoSQL, in-memory) can be swapped without changing client code.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-08-10-1',
          scenario: 'You are building a plugin system for a text editor. Plugins need to register themselves, receive events (key press, mouse click), and be enabled/disabled.',
          question: 'How would you design the plugin interfaces?',
          type: 'design-decision',
          options: [
            'One Plugin interface with all methods: register(), onKeyPress(), onClick(), enable(), disable()',
            'Separate interfaces: Registerable, KeyHandler, MouseHandler, Toggleable',
            'Abstract class Plugin with all methods and default implementations',
            'Use a single Plugin class with a type field',
          ],
          correctAnswer: 'Separate interfaces: Registerable, KeyHandler, MouseHandler, Toggleable',
          explanation: 'ISP principle: not all plugins need all capabilities. A syntax highlighting plugin may only need KeyHandler. A minimap plugin may only need MouseHandler. Separate interfaces let each plugin implement only what it needs.',
          relatedConcepts: ['ISP', 'plugin-system', 'event-handling', 'interface-design'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-practical-interfaces',
      prerequisites: ['lesson-08-09'],
      xpReward: 75,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'real-world-interfaces',
      difficulty: 'medium',
      estimatedMinutes: 25,
    },
  ],
};
