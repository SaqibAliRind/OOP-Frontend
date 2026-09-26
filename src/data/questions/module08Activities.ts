import type { QuizQuestion, ScenarioQuestion, OutputQuestion, DebugChallenge, MistakeQuestion, CodeCompletionQuestion } from '@/types';

export const module08Questions: {
  quickChecks: QuizQuestion[];
  scenarios: ScenarioQuestion[];
  outputs: OutputQuestion[];
  debugs: DebugChallenge[];
  mistakes: MistakeQuestion[];
  codeCompletions: CodeCompletionQuestion[];
} = {
  quickChecks: [
    {
      id: 'm08-quiz-001', type: 'mcq',
      question: 'What is an abstract class in Java?',
      options: [
        'A class that cannot be instantiated',
        'A class with only abstract methods',
        'A class with no constructors',
        'A class that implements interfaces',
      ],
      correctAnswer: 'A class that cannot be instantiated',
      explanation: 'Abstract classes cannot be directly instantiated with new. They can have both abstract and concrete methods, constructors, and fields.',
      romanUrduExplanation: 'Abstract classes directly instantiate nahi ho sakte. Inme abstract aur concrete methods dono ho sakte hain.',
      difficulty: 'easy', topicTags: ['abstract-class', 'abstraction'], xpReward: 25, moduleId: 'module-08',
    },
    {
      id: 'm08-quiz-002', type: 'mcq',
      question: 'Can an abstract class have a constructor?',
      options: ['No, abstract classes cannot have constructors', 'Yes, but it cannot be called', 'Yes, called by subclass constructors via super()', 'Only if it has no abstract methods'],
      correctAnswer: 'Yes, called by subclass constructors via super()',
      explanation: 'Abstract classes can have constructors. They are called when subclass objects are created, using super() to initialize inherited state.',
      romanUrduExplanation: 'Abstract classes ke constructors ho sakte hain. Ye subclass objects banane par super() se call hote hain.',
      difficulty: 'medium', topicTags: ['abstract-class', 'constructors', 'super'], xpReward: 30, moduleId: 'module-08',
    },
    {
      id: 'm08-quiz-003', type: 'mcq',
      question: 'What is the difference between abstract class and interface?',
      options: [
        'Abstract class can have instance variables, interface cannot (before Java 8)',
        'Interface can have constructors, abstract class cannot',
        'Abstract class supports multiple inheritance, interface does not',
        'There is no difference',
      ],
      correctAnswer: 'Abstract class can have instance variables, interface cannot (before Java 8)',
      explanation: 'Abstract classes can have instance variables, constructors, and concrete methods. Interfaces (pre-Java 8) can only have public abstract methods and constants.',
      romanUrduExplanation: 'Abstract classes mein instance variables, constructors, concrete methods ho sakte hain. Interfaces (Java 8 se pehle) sirf abstract methods aur constants.',
      difficulty: 'medium', topicTags: ['abstract-class', 'interface', 'comparison'], xpReward: 30, moduleId: 'module-08',
    },
    {
      id: 'm08-quiz-004', type: 'mcq',
      question: 'An abstract method declaration looks like:',
      options: [
        'public void doSomething() {}',
        'public abstract void doSomething();',
        'public void abstract doSomething();',
        'abstract public void doSomething() {}',
      ],
      correctAnswer: 'public abstract void doSomething();',
      explanation: 'Abstract methods have no body (no {}), use the abstract keyword, and end with a semicolon. They must be implemented by non-abstract subclasses.',
      romanUrduExplanation: 'Abstract methods ka body nahi hota, abstract keyword use hota hai, aur semicolon se end hota hai.',
      difficulty: 'easy', topicTags: ['abstract-method', 'syntax'], xpReward: 25, moduleId: 'module-08',
    },
    {
      id: 'm08-quiz-005', type: 'true-false',
      question: 'A class can extend only one abstract class but implement multiple interfaces.',
      correctAnswer: 'True',
      explanation: 'Java supports single inheritance for classes. A class can extend one class (abstract or concrete) but implement any number of interfaces.',
      romanUrduExplanation: 'Java single inheritance support karta hai classes ke liye. Ek class ek class extend kar sakti hai lekin multiple interfaces implement kar sakti hai.',
      difficulty: 'easy', topicTags: ['inheritance', 'interface', 'multiple-inheritance'], xpReward: 25, moduleId: 'module-08',
    },
    {
      id: 'm08-quiz-006', type: 'mcq',
      question: 'What happens if a subclass does not implement all abstract methods of its parent abstract class?',
      options: [
        'The unimplemented methods are ignored',
        'The subclass must also be declared abstract',
        'Java provides default implementations',
        'Compilation error only at runtime',
      ],
      correctAnswer: 'The subclass must also be declared abstract',
      explanation: 'If any abstract method remains unimplemented, the subclass must also be abstract. Otherwise, compilation error occurs.',
      romanUrduExplanation: 'Agar koi abstract method implement nahi hua, toh subclass bhi abstract hona chahiye. Nahi toh compilation error hoga.',
      difficulty: 'medium', topicTags: ['abstract-class', 'inheritance'], xpReward: 30, moduleId: 'module-08',
    },
    {
      id: 'm08-quiz-007', type: 'mcq',
      question: 'Which is true about interface methods (Java 8+)?',
      options: [
        'All methods must be abstract',
        'Interfaces can have default and static methods',
        'Interfaces can have instance variables',
        'Interfaces can have constructors',
      ],
      correctAnswer: 'Interfaces can have default and static methods',
      explanation: 'Java 8 introduced default methods (with body) and static methods in interfaces. This allows interfaces to provide utility methods without breaking implementing classes.',
      romanUrduExplanation: 'Java 8 mein default methods (with body) aur static methods interfaces mein aaye. Ye utility methods provide karte hain without breaking implementing classes.',
      difficulty: 'medium', topicTags: ['interface', 'java-8', 'default-methods'], xpReward: 30, moduleId: 'module-08',
    },
    {
      id: 'm08-quiz-008', type: 'mcq',
      question: 'What is the purpose of the Strategy pattern using interfaces?',
      options: [
        'To create objects',
        'To define a family of algorithms and make them interchangeable',
        'To provide a simplified interface',
        'To notify observers of changes',
      ],
      correctAnswer: 'To define a family of algorithms and make them interchangeable',
      explanation: 'Strategy pattern defines a family of algorithms (each implementing a common interface), encapsulates each one, and makes them interchangeable at runtime.',
      romanUrduExplanation: 'Strategy pattern algorithms ki family define karta hai jo ek common interface implement karti hai aur runtime par interchangeable hoti hai.',
      difficulty: 'hard', topicTags: ['strategy-pattern', 'design-patterns'], xpReward: 35, moduleId: 'module-08',
    },
    {
      id: 'm08-quiz-009', type: 'true-false',
      question: 'An interface can extend multiple interfaces.',
      correctAnswer: 'True',
      explanation: 'Unlike classes, interfaces can extend multiple interfaces. This is how Java achieves a form of multiple inheritance for type definitions.',
      romanUrduExplanation: 'Classes ke unlike, interfaces multiple interfaces extend kar sakte hain. Ye Java ka multiple inheritance form hai.',
      difficulty: 'medium', topicTags: ['interface', 'extends', 'multiple-inheritance'], xpReward: 25, moduleId: 'module-08',
    },
    {
      id: 'm08-quiz-010', type: 'mcq',
      question: 'Which keyword is used to define an abstract class?',
      options: ['interface', 'abstract', 'virtual', 'base'],
      correctAnswer: 'abstract',
      explanation: 'The abstract keyword is used before the class declaration to make it abstract. Example: abstract class Shape { }',
      romanUrduExplanation: 'Abstract keyword class declaration se pehle use hota hai usse abstract banane ke liye.',
      difficulty: 'easy', topicTags: ['abstract-class', 'syntax'], xpReward: 25, moduleId: 'module-08',
    },
  ],
  scenarios: [
    {
      id: 'm08-sq-001', title: 'Payment Processing System',
      scenario: 'You need to build a payment system that supports CreditCard, PayPal, and Bitcoin. Each payment method has different validation and processing. The system must allow adding new payment methods without modifying existing code.',
      question: 'Which design should you use?',
      type: 'design-decision',
      options: [
        'Create an abstract Payment class with concrete subclasses',
        'Create a PaymentStrategy interface and implement in each payment class',
        'Create one class with if-else for each payment type',
        'Use inheritance with a Payment base class',
      ],
      correctAnswer: 'Create a PaymentStrategy interface and implement in each payment class',
      explanation: 'Strategy pattern with interface allows adding new payment methods without modifying existing code (Open/Closed Principle). Each payment type independently implements the interface.',
      romanUrduExplanation: 'Strategy pattern interface se naye payment methods add kar sakte hain without existing code modify kiye (Open/Closed Principle).',
      relatedConcepts: ['strategy-pattern', 'interface', 'open-closed-principle'], difficulty: 'medium',
    },
    {
      id: 'm08-sq-002', title: 'Shape Drawing Library',
      scenario: 'You are building a graphics library. Shapes include Circle, Rectangle, Triangle. Each shape calculates area and perimeter differently. You want to ensure all shapes have these methods but leave implementation to each shape.',
      question: 'Abstract class or interface? What pattern?',
      type: 'design-decision',
      options: [
        'Abstract class Shape with abstract area() and perimeter()',
        'Interface Shape with area() and perimeter()',
        'Both approaches work; abstract class if shared state needed, interface for pure contract',
        'Use abstract class for simple shapes and interface for complex ones',
      ],
      correctAnswer: 'Both approaches work; abstract class if shared state needed, interface for pure contract',
      explanation: 'Use abstract class if shapes share common state (e.g., color, position). Use interface if it is a pure behavior contract. For maximum flexibility, interface is preferred.',
      romanUrduExplanation: 'Abstract class tab use karo jab shapes common state share karein (color, position). Interface tab jab pure behavior contract ho.',
      relatedConcepts: ['abstract-class', 'interface', 'design-decisions'], difficulty: 'medium',
    },
  ],
  outputs: [
    {
      id: 'm08-oq-001', lessonId: 'lesson-08-01',
      code: `abstract class Animal {
    abstract void makeSound();
    void sleep() {
        System.out.println("Zzz...");
    }
}

class Cat extends Animal {
    void makeSound() {
        System.out.println("Meow!");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal a = new Cat();
        a.makeSound();
        a.sleep();
    }
}`,
      options: ['Meow!, Zzz...', 'Zzz..., Meow!', 'Compilation error', 'Runtime error'],
      correctOutput: 'Meow!, Zzz...',
      explanation: 'Cat implements makeSound() printing "Meow!". sleep() is concrete in Animal, so a.sleep() prints "Zzz...".',
      romanUrduExplanation: 'Cat makeSound() implement karta hai "Meow!" print karke. sleep() Animal mein concrete hai, toh "Zzz..." print hota hai.',
      conceptTested: ['abstract-class', 'method-implementation'], difficulty: 'medium',
    },
    {
      id: 'm08-oq-002', lessonId: 'lesson-08-02',
      code: `interface Drawable {
    void draw();
    default void resize(double factor) {
        System.out.println("Resizing by " + factor);
    }
}

class Circle implements Drawable {
    public void draw() {
        System.out.println("Drawing circle");
    }
}

public class Main {
    public static void main(String[] args) {
        Drawable d = new Circle();
        d.draw();
        d.resize(2.0);
    }
}`,
      options: ['Drawing circle, Resizing by 2.0', 'Compilation error', 'Drawing circle only', 'Resizing by 2.0, Drawing circle'],
      correctOutput: 'Drawing circle, Resizing by 2.0',
      explanation: 'Circle implements draw(). resize() is a default method in Drawable interface, so it can be called on any implementing class without overriding.',
      romanUrduExplanation: 'Circle draw() implement karta hai. resize() interface ka default method hai, toh har implementing class bina override kiye call kar sakti hai.',
      conceptTested: ['interface', 'default-methods'], difficulty: 'medium',
    },
  ],
  debugs: [
    {
      id: 'm08-dc-001', title: 'Abstract Class Instantiation Attempt',
      description: 'Trying to instantiate an abstract class directly.',
      buggyCode: `abstract class Vehicle {
    abstract void start();
    void stop() {
        System.out.println("Vehicle stopped");
    }
}

public class Main {
    public static void main(String[] args) {
        Vehicle v = new Vehicle(); // Error!
        v.start();
    }
}`,
      expectedBehavior: 'Create a concrete subclass and instantiate that instead.',
      hints: ['You cannot instantiate abstract classes directly', 'Create a concrete subclass that implements all abstract methods', 'Use the concrete subclass type'],
      solution: `abstract class Vehicle {
    abstract void start();
    void stop() {
        System.out.println("Vehicle stopped");
    }
}

class Car extends Vehicle {
    void start() {
        System.out.println("Car started");
    }
}

public class Main {
    public static void main(String[] args) {
        Vehicle v = new Car();
        v.start();
        v.stop();
    }
}`,
      explanation: 'Abstract classes cannot be instantiated. Create a concrete subclass that implements all abstract methods.',
      romanUrduExplanation: 'Abstract classes instantiate nahi ho sakte. Ek concrete subclass banao jo saare abstract methods implement kare.',
      difficulty: 'easy', topicTags: ['abstract-class', 'instantiation'], xpReward: 50,
      errorMessage: 'Cannot instantiate abstract class', errorType: 'compilation', conceptTested: ['abstract-class'],
    },
    {
      id: 'm08-dc-002', title: 'Interface Method Collision',
      description: 'Two interfaces define the same default method, causing ambiguity.',
      buggyCode: `interface A {
    default void hello() {
        System.out.println("Hello from A");
    }
}

interface B {
    default void hello() {
        System.out.println("Hello from B");
    }
}

class MyClass implements A, B {
    // Missing hello() override!
}

public class Main {
    public static void main(String[] args) {
        MyClass obj = new MyClass();
        obj.hello();
    }
}`,
      expectedBehavior: 'Should compile and run by resolving the ambiguity.',
      hints: ['When two interfaces have the same default method, the class must override it', 'Override hello() in MyClass', 'Call super.hello() or provide custom implementation'],
      solution: `class MyClass implements A, B {
    @Override
    public void hello() {
        A.super.hello(); // or custom logic
    }
}`,
      explanation: 'When a class inherits conflicting default methods from multiple interfaces, it must override the method to resolve the ambiguity.',
      romanUrduExplanation: 'Jab class ko multiple interfaces se conflicting default methods milti hain, usse method override karke ambiguity resolve karni hoti hai.',
      difficulty: 'hard', topicTags: ['interface', 'default-methods', 'diamond-problem'], xpReward: 70,
      errorMessage: 'Class must override hello() to resolve ambiguity', errorType: 'compilation', conceptTested: ['interface', 'default-methods'],
    },
  ],
  mistakes: [
    {
      id: 'm08-mq-001', title: 'Interface Fields Are Always public static final',
      code: `interface Constants {
    int MAX_SIZE = 100;
    // Equivalent to: public static final int MAX_SIZE = 100;
}

class App implements Constants {
    void change() {
        MAX_SIZE = 200; // Compilation error!
    }
}`,
      mistakeDescription: 'Interface fields are implicitly public, static, and final. They cannot be modified.',
      possibleMistakes: ['Not knowing interface fields are final', 'Assuming interface fields can be instance variables', 'Trying to modify constants'],
      correctMistake: 'Interface fields are public static final constants. They cannot be changed.',
      correction: `interface Constants {
    int MAX_SIZE = 100;
}
// MAX_SIZE cannot be modified anywhere`,
      explanation: 'All fields in an interface are implicitly public static final. They are constants shared across all implementing classes.',
      romanUrduExplanation: 'Interface ke saare fields implicitly public static final hain. Ye constants hain jo saari implementing classes share karti hain.',
      difficulty: 'medium', conceptTested: ['interface', 'constants', 'static-final'],
    },
  ],
  codeCompletions: [
    {
      id: 'm08-cc-001', lessonId: 'lesson-08-01',
      codeTemplate: `abstract class Shape {
    String color;

    Shape(String color) {
        this.color = color;
    }

    // TODO: Declare abstract method for area calculation
    ____________

    void displayColor() {
        System.out.println("Color: " + color);
    }
}`,
      blank: 'abstract double area();',
      acceptedAnswers: ['abstract double area();', 'abstract double area();'],
      explanation: 'Abstract methods have no body and use the abstract keyword. Subclasses must provide implementation.',
      romanUrduExplanation: 'Abstract methods ka body nahi hota aur abstract keyword use hota hai. Subclasses implementation provide karti hain.',
      hints: ['Use the abstract keyword', 'No method body needed (just semicolon)', 'Return type should be double for area'],
      difficulty: 'easy', conceptTested: ['abstract-method', 'abstract-class'],
    },
    {
      id: 'm08-cc-002', lessonId: 'lesson-08-02',
      codeTemplate: `interface Playable {
    void play();
    void pause();

    // TODO: Add a default method for stop
    ____________
}`,
      blank: 'default void stop() { System.out.println("Stopped"); }',
      acceptedAnswers: [
        'default void stop() { System.out.println("Stopped"); }',
        'default void stop() { System.out.println("Stopped");}',
      ],
      explanation: 'Default methods in interfaces have a body and provide a default implementation. Implementing classes can override or use the default.',
      romanUrduExplanation: 'Interface ke default methods ka body hota hai aur default implementation provide karta hai. Implementing classes override ya default use kar sakti hain.',
      hints: ['Use the default keyword', 'Provide a method body', 'Implementing classes can optionally override this'],
      difficulty: 'medium', conceptTested: ['interface', 'default-methods'],
    },
  ],
};
