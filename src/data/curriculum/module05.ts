import type { Module } from '@/types';

export const module05: Module = {
  id: 'module-05',
  title: 'Inheritance',
  slug: 'inheritance',
  order: 5,
  description: 'Master the concept of code reuse through inheritance hierarchies. Learn to create parent-child relationships, override methods, use the super keyword, and understand when to use inheritance versus composition.',
  icon: 'GitBranch',
  color: '#f59e0b',
  xpReward: 850,
  isUnlocked: true,
  completed: false,
  progress: 0,
  totalDuration: 280,
  prerequisiteModuleIds: ['module-01', 'module-04'],
  lessons: [
    {
      id: 'lesson-05-01',
      moduleId: 'module-05',
      title: 'What is Inheritance?',
      slug: 'what-is-inheritance',
      order: 1,
      duration: 20,
      description: 'Understand the IS-A relationship, parent-child classes, and how inheritance enables code reuse.',
      learningObjectives: [
        { id: 'lo-05-01-1', description: 'Define inheritance and the IS-A relationship', completed: false },
        { id: 'lo-05-01-2', description: 'Identify parent and child classes in a hierarchy', completed: false },
        { id: 'lo-05-01-3', description: 'Explain how inheritance promotes code reuse', completed: false },
        { id: 'lo-05-01-4', description: 'Create a simple inheritance hierarchy in Java', completed: false },
      ],
      englishExplanation: {
        id: 'ee-05-01',
        text: `Inheritance is one of the four pillars of OOP. It allows a new class to inherit attributes and methods from an existing class. The existing class is called the parent class (or superclass), and the new class is called the child class (or subclass). The child class gets everything the parent has, plus it can add its own unique features.\n\nThe relationship between parent and child is called an IS-A relationship. A Dog IS-A Animal. A Car IS-A Vehicle. A SavingsAccount IS-A BankAccount. This is not just a naming convention - it represents a real logical relationship where the child is a specialized version of the parent.\n\nWhy does inheritance matter? Without inheritance, if you had a Vehicle class with start(), stop(), and accelerate() methods, and you wanted to create Car, Truck, and Motorcycle classes, you would need to copy all those methods into each class. With inheritance, Car, Truck, and Motorcycle inherit those methods automatically. You write the code once in Vehicle, and all children get it for free.\n\nIn Java, inheritance is implemented using the extends keyword. When a class extends another, it inherits all non-private fields and methods. The child class can use them as if they were defined in the child class itself.\n\nInheritance also establishes a type hierarchy. A Car object IS-A Vehicle, so it can be used wherever a Vehicle is expected. This is the foundation for polymorphism - you can treat different child classes uniformly through their common parent type.\n\nHowever, inheritance should be used carefully. Not every relationship means inheritance. A Car has an Engine, but a Car IS-NOT an Engine. That is composition, not inheritance. Use inheritance only for true IS-A relationships.`
      },
      romanUrduExplanation: {
        id: 'ru-05-01',
        text: `Inheritance OOP ke four pillars mein se ek hai. Ye ek nayi class ko maujuda class se attributes aur methods inherit karne deta hai. Maujuda class ko parent class (ya superclass) kehte hain, aur nayi class ko child class (ya subclass). Child class ko parent sab kuch milta hai, plus apne unique features add kar sakta hai.\n\nParent aur child ke beech ka relationship IS-A relationship kehlata hai. Dog IS-A Animal hai. Car IS-A Vehicle hai. SavingsAccount IS-A BankAccount hai. Ye sirf naming convention nahi hai - ye real logical relationship represent karta hai jisme child parent ka specialized version hota hai.\n\nInheritance kyun important hai? Bina inheritance ke, agar aapke paas Vehicle class ho jisme start(), stop(), aur accelerate() methods hon, aur aap Car, Truck, aur Motorcycle classes banana chahein, toh aapko ye methods har class mein copy karne padte. Inheritance ke saath, Car, Truck, aur Motorcycle ye methods automatically inherit karte hain.\n\nJava mein, inheritance extends keyword se implement hota hai. Jab class doosri class extend karti hai, toh wo saare non-private fields aur methods inherit karti hai.\n\nInheritance ek type hierarchy bhi establish karta hai. Car object IS-A Vehicle hai, toh use Vehicle ki jagah use kiya ja sakta hai. Ye polymorphism ki foundation hai.\n\nLekin inheritance carefully use karna chahiye. Har relationship inheritance ka matlab nahi. Car mein Engine hai, lekin Car IS-NOT an Engine. Ye composition hai, inheritance nahi. Inheritance sirf true IS-A relationships ke liye use karein.`
      },
      keyPoints: [
        { id: 'kp-05-01-1', title: 'IS-A Relationship', description: 'Inheritance represents a true IS-A relationship: Dog IS-A Animal, Car IS-A Vehicle.' },
        { id: 'kp-05-01-2', title: 'Parent and Child', description: 'The existing class is the parent (superclass). The new class is the child (subclass) that extends the parent.' },
        { id: 'kp-05-01-3', title: 'Code Reuse', description: 'Child classes automatically inherit all non-private members from the parent, eliminating code duplication.' },
        { id: 'kp-05-01-4', title: 'extends Keyword', description: 'Java uses the extends keyword to establish inheritance: class Child extends Parent.' },
      ],
      codeExamples: [
        {
          id: 'ce-05-01-1',
          title: 'Basic Inheritance with extends',
          code: `public class Animal {
    String name;
    int age;

    void eat() {
        System.out.println(name + " is eating.");
    }

    void sleep() {
        System.out.println(name + " is sleeping.");
    }

    void display() {
        System.out.println(name + ", age " + age);
    }
}

public class Dog extends Animal {
    String breed;

    void bark() {
        System.out.println(name + " is barking!");
    }

    void fetch(String item) {
        System.out.println(name + " fetches the " + item);
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.name = "Buddy";
        dog.age = 3;
        dog.breed = "Labrador";

        dog.eat();
        dog.sleep();
        dog.bark();
        dog.fetch("ball");
        dog.display();
    }
}`,
          language: 'java',
          output: `Buddy is eating.\nBuddy is sleeping.\nBuddy is barking!\nBuddy fetches the ball\nBuddy, age 3`,
          explanation: 'Dog inherits name, age, eat(), sleep(), and display() from Animal. It adds its own breed field and bark()/fetch() methods.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-05-01-1',
          title: 'Vehicle Hierarchy',
          scenario: 'A transportation company manages different types of vehicles: Cars, Trucks, and Buses. All vehicles share common attributes (speed, fuel, license plate) and common behaviors (start, stop, accelerate).',
          oopConcept: 'Vehicle is the parent class with shared code. Car, Truck, and Bus extend Vehicle, inheriting common functionality and adding specialized behavior.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-05-01-1',
          title: 'Confusing HAS-A with IS-A',
          incorrectCode: `public class Engine {
    int horsepower;
    void start() { System.out.println("Engine started"); }
}

public class Car extends Engine {
    String color;
}`,
          correctCode: `public class Engine {
    int horsepower;
    void start() { System.out.println("Engine started"); }
}

public class Car {
    private Engine engine;
    String color;

    public Car() {
        this.engine = new Engine();
    }

    void start() {
        engine.start();
    }
}`,
          explanation: 'A Car HAS an Engine - it does not IS-A Engine. Use composition for HAS-A relationships.',
        },
      ],
      examNotes: [
        { id: 'en-05-01-1', title: 'IS-A vs HAS-A', content: 'Inheritance = IS-A. Composition = HAS-A. A Dog IS-A Animal (inheritance). A Car HAS-A Engine (composition).', importance: 'high' },
        { id: 'en-05-01-2', title: 'extends Keyword', content: 'Java uses extends for inheritance. A class can extend only one other class (single inheritance).', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-05-01-1', question: 'What is the IS-A relationship in inheritance?', answer: 'The IS-A relationship means the child class is a specialized type of the parent class. A Dog IS-A Animal. This relationship must be logically true.', difficulty: 'easy' },
        { id: 'vq-05-01-2', question: 'When should you use inheritance vs composition?', answer: 'Use inheritance for true IS-A relationships with code reuse. Use composition when an object HAS another object as a component.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-05-01-1', type: 'mcq', question: 'In Java, which keyword is used to create an inheritance relationship?', options: ['implements', 'extends', 'inherits', 'super'], correctAnswer: 'extends', explanation: 'Java uses the extends keyword for class inheritance.' },
        { id: 'qc-05-01-2', type: 'true-false', question: 'A child class inherits private members of its parent class.', correctAnswer: 'False', explanation: 'Private members are only accessible within the declaring class.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-05-01-1',
          scenario: 'You are designing a library system with books, magazines, and DVDs. All items can be checked out and returned.',
          question: 'How should you model this hierarchy?',
          type: 'design-decision',
          options: [
            'Create separate classes with no common parent',
            'Create a LibraryItem parent class, with Book, Magazine, DVD extending it',
            'Create a Book parent class, with Magazine and DVD extending it',
            'Put everything in one class',
          ],
          correctAnswer: 'Create a LibraryItem parent class, with Book, Magazine, DVD extending it',
          explanation: 'All items share checkOut() and returnItem() - these go in the parent.',
          relatedConcepts: ['inheritance', 'parent-class', 'code-reuse'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-inheritance-intro',
      prerequisites: ['lesson-01-03', 'lesson-04-01'],
      xpReward: 60,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'inheritance-hierarchy',
      difficulty: 'beginner',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-05-02',
      moduleId: 'module-05',
      title: 'The extends Keyword',
      slug: 'the-extends-keyword',
      order: 2,
      duration: 18,
      description: 'Learn how to create subclasses using extends, set up inheritance hierarchies, and understand what gets inherited.',
      learningObjectives: [
        { id: 'lo-05-02-1', description: 'Use the extends keyword to create a subclass', completed: false },
        { id: 'lo-05-02-2', description: 'Understand what members are inherited vs not inherited', completed: false },
        { id: 'lo-05-02-3', description: 'Build multi-level inheritance hierarchies', completed: false },
      ],
      englishExplanation: {
        id: 'ee-05-02',
        text: `The extends keyword is Java's mechanism for establishing inheritance. When you write class Dog extends Animal, you are telling Java that Dog inherits everything from Animal (except private members).\n\nWhat gets inherited: All non-private fields (even if they are default or protected access), all non-private methods. Constructors are NOT inherited but can be called via super. Static members are inherited but not overridden in the traditional sense.\n\nWhat does NOT get inherited: Private members (fields and methods), constructors (though the parent constructor is called implicitly), final methods can be inherited but not overridden, members of the parent that are in a different package with default access.\n\nWhen a subclass is created, the parent class constructor runs first, then the subclass constructor. This ensures the parent part of the object is properly initialized before the child adds its own initialization.\n\nMulti-level inheritance: A class can extend a class that itself extends another class. For example: Animal -> Dog -> Puppy. Puppy inherits from Dog, which inherits from Animal. Puppy gets everything from both Dog and Animal.\n\nEvery class in Java implicitly extends the Object class. When you write class Student { }, it is equivalent to class Student extends Object { }. This is why every class has toString(), equals(), and hashCode() methods - they are inherited from Object.`
      },
      romanUrduExplanation: {
        id: 'ru-05-02',
        text: `extends keyword Java ka mechanism hai inheritance establish karne ke liye. Jab aap class Dog extends Animal likhte hain, toh aap Java ko bata rahe hain ke Dog Animal se sab kuch inherit karta hai (private members ke alawa).\n\nKya inherit hota hai: Saare non-private fields, saare non-private methods. Constructors inherit NAHI hote lekin super se call ho sakte hain.\n\nKya inherit NAHI hota: Private members, constructors (lekin parent constructor implicitly call hota hai).\n\nJab subclass create hota hai, toh pehle parent class constructor chalta hai, phir subclass constructor.\n\nMulti-level inheritance: Ek class us class ko extend kar sakti hai jo khud doosri class extend karti hai. Jaise: Animal -> Dog -> Puppy.\n\nJava mein har class implicitly Object class extend karti hai. Isliye har class mein toString(), equals(), aur hashCode() methods hoti hain.`
      },
      keyPoints: [
        { id: 'kp-05-02-1', title: 'extends Syntax', description: 'class Child extends Parent - establishes inheritance.' },
        { id: 'kp-05-02-2', title: 'Inherited Members', description: 'Non-private fields and methods are inherited. Private members and constructors are not.' },
        { id: 'kp-05-02-3', title: 'Constructor Chain', description: 'Parent constructor runs first, then child constructor.' },
        { id: 'kp-05-02-4', title: 'Object Root', description: 'Every class implicitly extends Object.' },
      ],
      codeExamples: [
        {
          id: 'ce-05-02-1',
          title: 'Multi-Level Inheritance',
          code: `public class Vehicle {
    String brand;
    int year;

    void start() {
        System.out.println(brand + " starting...");
    }

    void display() {
        System.out.println(brand + " " + year);
    }
}

public class Car extends Vehicle {
    int doors;

    void honk() {
        System.out.println(brand + " says: Beep beep!");
    }
}

public class SportsCar extends Car {
    int horsepower;

    void turboBoost() {
        System.out.println(brand + " TURBO ACTIVATED! " + horsepower + " HP!");
    }
}

public class Main {
    public static void main(String[] args) {
        SportsCar sc = new SportsCar();
        sc.brand = "Ferrari";
        sc.year = 2024;
        sc.doors = 2;
        sc.horsepower = 710;

        sc.start();
        sc.honk();
        sc.turboBoost();
        sc.display();
    }
}`,
          language: 'java',
          output: `Ferrari starting...\nFerrari says: Beep beep!\nFerrari TURBO ACTIVATED! 710 HP!\nFerrari 2024`,
          explanation: 'SportsCar inherits from Car, which inherits from Vehicle. This is multi-level inheritance.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-05-02-1',
          title: 'Employee Hierarchy',
          scenario: 'A company has Employee as a base class. Manager and Developer extend Employee. SeniorManager extends Manager.',
          oopConcept: 'Employee -> Manager -> SeniorManager is a multi-level hierarchy.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-05-02-1',
          title: 'Trying to Access Private Parent Members',
          incorrectCode: `public class Parent {
    private String secret = "hidden";
    public String name = "visible";
}

public class Child extends Parent {
    void show() {
        System.out.println(secret);
    }
}`,
          correctCode: `public class Parent {
    private String secret = "hidden";
    protected String name = "visible";

    public String getSecret() { return secret; }
}

public class Child extends Parent {
    void show() {
        System.out.println(getSecret());
        System.out.println(name);
    }
}`,
          explanation: 'Private members are not accessible in subclasses. Use protected access or provide public getters.',
        },
      ],
      examNotes: [
        { id: 'en-05-02-1', title: 'extends Keyword', content: 'class Child extends Parent. Only one parent allowed. Private members not inherited.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-05-02-1', question: 'What happens to the parent constructor when a subclass object is created?', answer: 'The parent constructor runs first, then the subclass constructor.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-05-02-1', type: 'mcq', question: 'What does every Java class implicitly extend?', options: ['Nothing', 'Object', 'Class', 'Super'], correctAnswer: 'Object', explanation: 'Every class in Java implicitly extends the Object class.' },
        { id: 'qc-05-02-2', type: 'true-false', question: 'Constructors are inherited by subclasses.', correctAnswer: 'False', explanation: 'Constructors are not inherited.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-05-02-1',
          scenario: 'You have a 3-level hierarchy: Shape -> Polygon -> Rectangle.',
          question: 'Can Rectangle access calculateArea() defined in Shape?',
          type: 'concept-application',
          options: [
            'No, it can only access Polygon methods',
            'Yes, through the inheritance chain',
            'Only if calculateArea() is static',
            'Only if Polygon redefines it',
          ],
          correctAnswer: 'Yes, through the inheritance chain Rectangle -> Polygon -> Shape',
          explanation: 'In multi-level inheritance, a class inherits from all ancestors in the chain.',
          relatedConcepts: ['multi-level-inheritance', 'extends'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-extends-keyword',
      prerequisites: ['lesson-05-01'],
      xpReward: 50,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'inheritance-chain',
      difficulty: 'beginner',
      estimatedMinutes: 18,
    },
    {
      id: 'lesson-05-03',
      moduleId: 'module-05',
      title: 'Method Overriding',
      slug: 'method-overriding',
      order: 3,
      duration: 22,
      description: 'Master method overriding for runtime polymorphism, including the @Override annotation and rules for proper overriding.',
      learningObjectives: [
        { id: 'lo-05-03-1', description: 'Explain the difference between overriding and overloading', completed: false },
        { id: 'lo-05-03-2', description: 'Use the @Override annotation correctly', completed: false },
        { id: 'lo-05-03-3', description: 'Apply the rules for valid method overriding', completed: false },
        { id: 'lo-05-03-4', description: 'Understand how overriding enables runtime polymorphism', completed: false },
      ],
      englishExplanation: {
        id: 'ee-05-03',
        text: `Method overriding occurs when a subclass provides its own implementation of a method that is already defined in its parent class. The subclass method must have the same name, same parameters, and same (or compatible) return type. The @Override annotation tells the compiler that you intend to override a parent method.\n\nOverriding vs Overloading: Overriding replaces a parent method with a new implementation in the child class. It happens at runtime based on the actual object type. Overloading creates multiple methods with the same name but different parameters in the same class.\n\nRules for valid overriding: The method name must be identical. The parameter list must be identical. The return type must be the same or a subtype (covariant return). The access modifier cannot be more restrictive. The method cannot throw broader checked exceptions. The method must be non-static. Final methods cannot be overridden. Private methods cannot be overridden.\n\nThe @Override annotation is optional but strongly recommended. If you make a mistake in the signature, the compiler will catch it when @Override is present.\n\nOverriding is the mechanism that enables runtime polymorphism. When you call a method on a parent reference that points to a child object, Java determines at runtime which version of the method to call.`
      },
      romanUrduExplanation: {
        id: 'ru-05-03',
        text: `Method overriding tab hota hai jab subclass apne parent class mein pehle se define method ka apna implementation provide karta hai. Subclass method ka same name, same parameters, aur same return type hona chahiye.\n\nValid overriding ke rules: Method name identical hona chahiye. Parameter list identical hona chahiye. Return type same ya subtype hona chahiye. Access modifier zyada restrictive nahi ho sakta.\n\n@Override annotation optional hai lekin strongly recommended hai.\n\nOverriding wo mechanism hai jo runtime polymorphism enable karta hai.`
      },
      keyPoints: [
        { id: 'kp-05-03-1', title: 'Same Signature', description: 'Overridden methods must have the same name, parameters, and compatible return type.' },
        { id: 'kp-05-03-2', title: '@Override', description: 'Optional but recommended annotation that prevents signature mistakes.' },
        { id: 'kp-05-03-3', title: 'Runtime Polymorphism', description: 'Method overriding enables dynamic dispatch.' },
        { id: 'kp-05-03-4', title: 'Not More Restrictive', description: 'The overriding method cannot have a more restrictive access modifier.' },
      ],
      codeExamples: [
        {
          id: 'ce-05-03-1',
          title: 'Method Overriding in Action',
          code: `public class Animal {
    void makeSound() {
        System.out.println("Some generic animal sound");
    }

    void eat() {
        System.out.println("Animal is eating");
    }
}

public class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Woof! Woof!");
    }

    @Override
    void eat() {
        System.out.println("Dog is eating kibble");
    }
}

public class Cat extends Animal {
    @Override
    void makeSound() {
        System.out.println("Meow!");
    }

    @Override
    void eat() {
        System.out.println("Cat is eating fish");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal animal1 = new Dog();
        Animal animal2 = new Cat();

        animal1.makeSound();
        animal1.eat();
        animal2.makeSound();
        animal2.eat();
    }
}`,
          language: 'java',
          output: `Woof! Woof!\nDog is eating kibble\nMeow!\nCat is eating fish`,
          explanation: 'Dog and Cat override makeSound() and eat() from Animal. The JVM determines at runtime which version to call.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-05-03-1',
          title: 'Payment Processing System',
          scenario: 'A PaymentProcessor class has a processPayment() method. CreditCardProcessor, PayPalProcessor, and CryptoProcessor extend it and override processPayment().',
          oopConcept: 'Each processor overrides the same method with different implementations.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-05-03-1',
          title: 'Accidental Overloading Instead of Overriding',
          incorrectCode: `public class Parent {
    void doSomething(int x) {
        System.out.println("Parent: " + x);
    }
}

public class Child extends Parent {
    void doSomething(double x) {
        System.out.println("Child: " + x);
    }
}`,
          correctCode: `public class Parent {
    void doSomething(int x) {
        System.out.println("Parent: " + x);
    }
}

public class Child extends Parent {
    @Override
    void doSomething(int x) {
        System.out.println("Child: " + x);
    }
}`,
          explanation: 'Overriding requires the exact same signature. Changing the parameter type creates an overloaded method.',
        },
      ],
      examNotes: [
        { id: 'en-05-03-1', title: 'Overriding Rules', content: 'Same name, same parameters, same or compatible return type, not more restrictive access.', importance: 'high' },
        { id: 'en-05-03-2', title: 'Runtime Polymorphism', content: 'Overriding enables dynamic dispatch. The JVM determines which method to call at runtime.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-05-03-1', question: 'What is the difference between method overriding and method overloading?', answer: 'Overriding replaces a parent method in a child class with the same signature at runtime. Overloading creates multiple methods with the same name but different parameters at compile time.', difficulty: 'medium' },
        { id: 'vq-05-03-2', question: 'Why is the @Override annotation recommended?', answer: '@Override tells the compiler to verify that the method actually overrides a parent method. If there is a signature mismatch, the compiler produces an error.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-05-03-1', type: 'mcq', question: 'What must be true for a method to validly override a parent method?', options: ['Same name only', 'Same name and parameters', 'Same name, parameters, and return type', 'Same name, parameters, return type, and access modifier'], correctAnswer: 'Same name, parameters, and return type', explanation: 'A valid override requires the same name, same parameter list, and same (or compatible) return type.' },
        { id: 'qc-05-03-2', type: 'true-false', question: 'Static methods can be overridden.', correctAnswer: 'False', explanation: 'Static methods belong to the class, not objects. They cannot be overridden.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-05-03-1',
          scenario: 'You have a Shape class with a draw() method. Circle and Rectangle extend Shape. Shape s = new Circle(); s.draw();',
          question: 'Which draw() method is called?',
          type: 'concept-application',
          options: [
            "Shape's draw()",
            "Circle's draw() because the actual object is Circle",
            'An error',
            'Both methods',
          ],
          correctAnswer: "Circle's draw() because the actual object is Circle",
          explanation: 'Runtime polymorphism: the JVM looks at the actual object type, not the reference type.',
          relatedConcepts: ['method-overriding', 'runtime-polymorphism'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-method-overriding',
      prerequisites: ['lesson-05-01', 'lesson-05-02'],
      xpReward: 70,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'polymorphism',
      difficulty: 'medium',
      estimatedMinutes: 22,
    },
    {
      id: 'lesson-05-04',
      moduleId: 'module-05',
      title: 'The super Keyword',
      slug: 'the-super-keyword',
      order: 4,
      duration: 18,
      description: 'Learn to access parent methods and constructors using the super keyword.',
      learningObjectives: [
        { id: 'lo-05-04-1', description: 'Use super to call parent methods from an overriding method', completed: false },
        { id: 'lo-05-04-2', description: 'Use super() to call parent constructors', completed: false },
        { id: 'lo-05-04-3', description: 'Understand constructor chaining with super', completed: false },
      ],
      englishExplanation: {
        id: 'ee-05-04',
        text: `The super keyword in Java refers to the parent class. It is used in two main scenarios: accessing parent methods and calling parent constructors.\n\nCalling Parent Methods: When a subclass overrides a parent method but still wants to include the parent's behavior, it uses super to call the parent's version. For example, if Dog overrides eat() but wants to add generic eating behavior on top, it calls super.eat() inside its own eat() method.\n\nCalling Parent Constructors: super() (with parentheses) calls the parent class constructor. This must be the first statement in the subclass constructor. If you do not explicitly call super(), Java automatically inserts a no-arg super() call.\n\nConstructor Chaining: When you create a child object, the full chain of constructors runs: Object constructor first, then the highest parent, down to the immediate parent, and finally the child constructor.\n\nsuper vs this: super refers to the parent class. this refers to the current class. super() calls the parent constructor. this() calls another constructor in the same class. Both cannot be the first statement in a constructor.`
      },
      romanUrduExplanation: {
        id: 'ru-05-04',
        text: `Java mein super keyword parent class ko refer karta hai.\n\nParent Methods Call Karna: Jab subclass parent method override karta hai lekin parent ka behavior bhi include karna chahta hai, toh super use karke parent ka version call karta hai.\n\nParent Constructors Call Karna: super() parent constructor call karta hai. Ye subclass constructor mein first statement hona chahiye.\n\nConstructor Chaining: Jab child object create hota hai, toh poori constructor chain chalti hai.\n\nsuper vs this: super parent class ko refer karta hai, this current class ko refer karta hai.`
      },
      keyPoints: [
        { id: 'kp-05-04-1', title: 'super Method Call', description: 'super.method() calls the parent version of an overridden method.' },
        { id: 'kp-05-04-2', title: 'super Constructor Call', description: 'super() calls the parent constructor. Must be the first statement.' },
        { id: 'kp-05-04-3', title: 'Constructor Chaining', description: 'Constructors run from Object down to the child.' },
      ],
      codeExamples: [
        {
          id: 'ce-05-04-1',
          title: 'Using super for Methods and Constructors',
          code: `public class Person {
    String name;
    int age;

    Person(String name, int age) {
        this.name = name;
        this.age = age;
        System.out.println("Person constructor: " + name);
    }

    void display() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}

public class Student extends Person {
    double gpa;
    String university;

    Student(String name, int age, double gpa, String university) {
        super(name, age);
        this.gpa = gpa;
        this.university = university;
        System.out.println("Student constructor: " + university);
    }

    @Override
    void display() {
        super.display();
        System.out.println("GPA: " + gpa + ", University: " + university);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student("Ali", 20, 3.8, "Fast");
        System.out.println("---");
        s.display();
    }
}`,
          language: 'java',
          output: `Person constructor: Ali\nStudent constructor: Fast\n---\nName: Ali, Age: 20\nGPA: 3.8, University: Fast`,
          explanation: 'super(name, age) calls Person constructor. super.display() calls parent version.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-05-04-1',
          title: 'Employee Payroll System',
          scenario: 'An Employee class initializes common fields. Manager adds teamSize and bonus. Manager constructor calls super() to reuse parent initialization.',
          oopConcept: 'super() allows code reuse without duplication.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-05-04-1',
          title: 'super() Not as First Statement',
          incorrectCode: `public class Child extends Parent {
    Child(String name) {
        int x = 10;
        super(name);
    }
}`,
          correctCode: `public class Child extends Parent {
    Child(String name) {
        super(name);
        int x = 10;
    }
}`,
          explanation: 'super() must be the first statement in a constructor.',
        },
      ],
      examNotes: [
        { id: 'en-05-04-1', title: 'super Rules', content: 'super() must be the first statement in a constructor.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-05-04-1', question: 'What is the difference between super and this?', answer: 'super refers to the parent class; this refers to the current class. super() calls the parent constructor; this() calls another constructor in the same class.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-05-04-1', type: 'mcq', question: 'Where must super() be placed in a constructor?', options: ['At the end', 'Anywhere', 'As the first statement', 'After this()'], correctAnswer: 'As the first statement', explanation: 'super() must be the first statement in a constructor.' },
        { id: 'qc-05-04-2', type: 'true-false', question: 'If you do not call super() explicitly, Java inserts it automatically.', correctAnswer: 'True', explanation: 'Java automatically inserts a no-arg super() call if you do not explicitly call super() or this().' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-05-04-1',
          scenario: 'A parent class has only a constructor with parameters (no no-arg constructor). A subclass needs to call this parent constructor.',
          question: 'What must the subclass do?',
          type: 'concept-application',
          options: [
            'Nothing - Java handles it automatically',
            'Explicitly call super(parameters) as the first statement',
            'Create a no-arg constructor in the parent',
            'Use this() instead of super()',
          ],
          correctAnswer: 'Explicitly call super(parameters) as the first statement',
          explanation: 'When a parent has no no-arg constructor, the subclass must explicitly call super with matching parameters.',
          relatedConcepts: ['super', 'constructor-chaining'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-super-keyword',
      prerequisites: ['lesson-05-02', 'lesson-05-03'],
      xpReward: 50,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'super-keyword',
      difficulty: 'medium',
      estimatedMinutes: 18,
    },
    {
      id: 'lesson-05-05',
      moduleId: 'module-05',
      title: 'Types of Inheritance',
      slug: 'types-of-inheritance',
      order: 5,
      duration: 20,
      description: 'Understand single, multilevel, hierarchical, and hybrid inheritance, and Java limitations on multiple inheritance.',
      learningObjectives: [
        { id: 'lo-05-05-1', description: 'Identify single, multilevel, and hierarchical inheritance', completed: false },
        { id: 'lo-05-05-2', description: 'Explain why Java does not support multiple inheritance with classes', completed: false },
        { id: 'lo-05-05-3', description: 'Describe hybrid inheritance and how Java achieves it through interfaces', completed: false },
      ],
      englishExplanation: {
        id: 'ee-05-05',
        text: `There are several types of inheritance patterns. Java supports some directly and others through workarounds.\n\nSingle Inheritance: A class extends one parent class. Dog extends Animal. This is the simplest and most common form.\n\nMultilevel Inheritance: A chain of inheritance: A -> B -> C. Animal -> Dog -> Puppy. Each level adds its own features.\n\nHierarchical Inheritance: Multiple classes extend the same parent. Dog and Cat both extend Animal.\n\nMultiple Inheritance (NOT supported with classes): A class trying to extend two parents simultaneously. Java does NOT allow this because of the Diamond Problem.\n\nHybrid Inheritance: A combination of types. Java achieves this through interfaces. A class can implement multiple interfaces while extending only one class.\n\nJava's solution: Use extends for one class, and use implements for multiple interfaces.`
      },
      romanUrduExplanation: {
        id: 'ru-05-05',
        text: `Inheritance ke kayi types ke patterns hain.\n\nSingle Inheritance: Ek class ek parent class ko extend karti hai.\n\nMultilevel Inheritance: Inheritance ki chain: A -> B -> C.\n\nHierarchical Inheritance: Multiple classes same parent ko extend karti hain.\n\nMultiple Inheritance (classes ke saath NOT supported): Java ye ALLOW nahi karta because of Diamond Problem.\n\nHybrid Inheritance: Interfaces ke through achieve hota hai.`
      },
      keyPoints: [
        { id: 'kp-05-05-1', title: 'Single Inheritance', description: 'One class extends one parent. Most common form.' },
        { id: 'kp-05-05-2', title: 'Multilevel Inheritance', description: 'A chain: A -> B -> C. Each class extends the previous one.' },
        { id: 'kp-05-05-3', title: 'Hierarchical Inheritance', description: 'Multiple classes extend the same parent.' },
        { id: 'kp-05-05-4', title: 'No Multiple Inheritance', description: 'Java does not allow extending two classes. Use interfaces instead.' },
      ],
      codeExamples: [
        {
          id: 'ce-05-05-1',
          title: 'All Supported Inheritance Types',
          code: `public class Animal {
    void eat() { System.out.println("Eating"); }
}

public class Dog extends Animal {
    void bark() { System.out.println("Barking"); }
}

public class Puppy extends Dog {
    void play() { System.out.println("Playing"); }
}

public class Cat extends Animal {
    void meow() { System.out.println("Meowing"); }
}

public interface Flyable {
    void fly();
}

public interface Swimmable {
    void swim();
}

public class Duck extends Animal implements Flyable, Swimmable {
    @Override
    public void fly() { System.out.println("Duck flying"); }

    @Override
    public void swim() { System.out.println("Duck swimming"); }
}`,
          language: 'java',
          explanation: 'Java supports single, multilevel, and hierarchical inheritance. For multiple inheritance behavior, Java uses interfaces.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-05-05-1',
          title: 'Shape Hierarchy',
          scenario: 'A graphics application has Shape as parent. Circle, Rectangle, and Triangle extend Shape (hierarchical).',
          oopConcept: 'Uses supported inheritance types with interfaces for additional behavior.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-05-05-1',
          title: 'Trying to Extend Multiple Classes',
          incorrectCode: `public class A {
    void show() { System.out.println("A"); }
}

public class B {
    void show() { System.out.println("B"); }
}

public class C extends A, B {
}`,
          correctCode: `public class A {
    void show() { System.out.println("A"); }
}

public interface B {
    void show();
}

public class C extends A implements B {
    @Override
    public void show() { System.out.println("C"); }
}`,
          explanation: 'Java does not allow extending multiple classes. Use one extends and multiple implements.',
        },
      ],
      examNotes: [
        { id: 'en-05-05-1', title: 'Inheritance Types', content: 'Know all types. Java supports all except multiple with classes.', importance: 'high' },
        { id: 'en-05-05-2', title: 'Diamond Problem', content: 'Multiple inheritance is not supported because of ambiguity.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-05-05-1', question: 'Why does Java not support multiple inheritance with classes?', answer: 'Java avoids the Diamond Problem - ambiguity when two parents have the same method.', difficulty: 'medium' },
        { id: 'vq-05-05-2', question: 'How does Java achieve hybrid inheritance?', answer: 'Through interfaces. A class extends one parent but can implement multiple interfaces.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-05-05-1', type: 'mcq', question: 'Which type of inheritance does Java NOT support directly?', options: ['Single', 'Multilevel', 'Multiple with classes', 'Hierarchical'], correctAnswer: 'Multiple with classes', explanation: 'Java does not allow a class to extend two parent classes.' },
        { id: 'qc-05-05-2', type: 'true-false', question: 'A class can implement multiple interfaces in Java.', correctAnswer: 'True', explanation: 'Java allows implementing multiple interfaces.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-05-05-1',
          scenario: 'You need a class that has the behavior of both a Bird and a Pet.',
          question: 'How should you design this in Java?',
          type: 'design-decision',
          options: [
            'class BirdPet extends Bird, Pet',
            'class BirdPet extends Bird implements PetInterface',
            'Create separate classes',
            'class BirdPet extends Bird implements Playable, Friendly',
          ],
          correctAnswer: 'class BirdPet extends Bird implements Playable, Friendly',
          explanation: 'Extend one class, implement interfaces for additional behaviors.',
          relatedConcepts: ['multiple-inheritance', 'interfaces'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-inheritance-types',
      prerequisites: ['lesson-05-01', 'lesson-05-02'],
      xpReward: 60,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'inheritance-types',
      difficulty: 'medium',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-05-06',
      moduleId: 'module-05',
      title: 'The Object Class',
      slug: 'the-object-class',
      order: 6,
      duration: 22,
      description: 'Master the root of all Java classes: toString(), equals(), hashCode(), getClass(), and other Object methods.',
      learningObjectives: [
        { id: 'lo-05-06-1', description: 'Explain why Object is the root of all classes', completed: false },
        { id: 'lo-05-06-2', description: 'Override toString() for meaningful string representation', completed: false },
        { id: 'lo-05-06-3', description: 'Implement equals() and hashCode() correctly', completed: false },
        { id: 'lo-05-06-4', description: 'Use getClass() for runtime type checking', completed: false },
      ],
      englishExplanation: {
        id: 'ee-05-06',
        text: `The Object class is the root of the Java class hierarchy. Every class in Java extends Object, either directly or indirectly.\n\nKey methods from Object:\n\ntoString(): Returns a string representation of the object. Override this to return meaningful information.\n\nequals(Object obj): Compares two objects for equality. The default uses == (reference comparison). Override to compare logical content.\n\nhashCode(): Returns an integer hash code used by hash-based collections. If two objects are equal, they MUST have the same hashCode().\n\ngetClass(): Returns the runtime Class object. It is final and cannot be overridden.\n\nThe equals()-hashCode() contract is critical: if you override one, you must override both.`
      },
      romanUrduExplanation: {
        id: 'ru-05-06',
        text: `Object class Java class hierarchy ki root hai. Har class Object ko extend karti hai.\n\nKey methods: toString() string representation return karta hai. equals() do objects ko compare karta hai. hashCode() hash-based collections ke liye hai. getClass() runtime Class object return karta hai.\n\nequals()-hashCode() contract critical hai: agar aap ek override karein, toh doosra bhi karna padega.`
      },
      keyPoints: [
        { id: 'kp-05-06-1', title: 'Object is Root', description: 'Every Java class extends Object.' },
        { id: 'kp-05-06-2', title: 'toString()', description: 'Override to return meaningful string representation.' },
        { id: 'kp-05-06-3', title: 'equals() and hashCode()', description: 'Must override both together.' },
        { id: 'kp-05-06-4', title: 'getClass()', description: 'Final method that returns the runtime Class object.' },
      ],
      codeExamples: [
        {
          id: 'ce-05-06-1',
          title: 'Overriding Object Methods',
          code: `public class Student {
    private String name;
    private int rollNumber;

    public Student(String name, int rollNumber) {
        this.name = name;
        this.rollNumber = rollNumber;
    }

    @Override
    public String toString() {
        return "Student{name='" + name + "', rollNumber=" + rollNumber + "}";
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Student other = (Student) obj;
        return rollNumber == other.rollNumber && name.equals(other.name);
    }

    @Override
    public int hashCode() {
        int result = name.hashCode();
        result = 31 * result + rollNumber;
        return result;
    }

    public static void main(String[] args) {
        Student s1 = new Student("Ahmed", 101);
        Student s2 = new Student("Ahmed", 101);
        Student s3 = new Student("Sara", 102);

        System.out.println(s1);
        System.out.println(s1.equals(s2));
        System.out.println(s1.equals(s3));
        System.out.println(s1 == s2);
    }
}`,
          language: 'java',
          output: `Student{name='Ahmed', rollNumber=101}\ntrue\nfalse\nfalse`,
          explanation: 'toString() returns readable representation. equals() compares logical content. == checks reference identity.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-05-06-1',
          title: 'Using Objects in HashMap',
          scenario: 'A library system stores books in a HashMap. Without proper equals() and hashCode(), duplicate books cannot be correctly identified.',
          oopConcept: 'Overriding equals() and hashCode() based on ISBN ensures correct behavior.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-05-06-1',
          title: 'Overriding equals() Without hashCode()',
          incorrectCode: `public class Person {
    String name;

    Person(String name) { this.name = name; }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Person)) return false;
        return name.equals(((Person) obj).name);
    }
}

Map<Person, String> map = new HashMap<>();
Person p = new Person("Ali");
map.put(p, "engineer");
Person same = new Person("Ali");
System.out.println(map.get(same)); // null! Bug!`,
          correctCode: `public class Person {
    String name;

    Person(String name) { this.name = name; }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Person)) return false;
        return name.equals(((Person) obj).name);
    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }
}

Map<Person, String> map = new HashMap<>();
Person p = new Person("Ali");
map.put(p, "engineer");
Person same = new Person("Ali");
System.out.println(map.get(same)); // engineer! Correct!`,
          explanation: 'If equals() says two objects are equal, they MUST have the same hashCode().',
        },
      ],
      examNotes: [
        { id: 'en-05-06-1', title: 'equals()-hashCode() Contract', content: 'If you override equals(), you MUST override hashCode().', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-05-06-1', question: 'Why must you override hashCode() when you override equals()?', answer: 'Hash-based collections use hashCode() to find buckets. Equal objects must have equal hashCodes.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-05-06-1', type: 'mcq', question: 'What is the root class of all Java classes?', options: ['Class', 'Base', 'Object', 'Super'], correctAnswer: 'Object', explanation: 'Object is the root of the Java class hierarchy.' },
        { id: 'qc-05-06-2', type: 'true-false', question: 'The default equals() method compares object content.', correctAnswer: 'False', explanation: 'The default equals() uses == (reference comparison).' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-05-06-1',
          scenario: 'You create a Student class and add it to a HashSet. Two Student objects with the same name and roll number are added.',
          question: 'How many objects will the HashSet contain?',
          type: 'concept-application',
          options: ['2', '1', 'Depends on equals/hashCode', '0'],
          correctAnswer: 'Depends on whether equals() and hashCode() are overridden',
          explanation: 'If not overridden, both are stored. If properly overridden, only one.',
          relatedConcepts: ['equals', 'hashCode', 'HashSet'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-object-class',
      prerequisites: ['lesson-05-02'],
      xpReward: 70,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'object-methods',
      difficulty: 'medium',
      estimatedMinutes: 22,
    },
    {
      id: 'lesson-05-07',
      moduleId: 'module-05',
      title: 'Abstract Classes',
      slug: 'abstract-classes',
      order: 7,
      duration: 22,
      description: 'Learn to use abstract classes and abstract methods for partial implementation and design contracts.',
      learningObjectives: [
        { id: 'lo-05-07-1', description: 'Define abstract classes and abstract methods', completed: false },
        { id: 'lo-05-07-2', description: 'Explain when to use abstract classes vs concrete classes', completed: false },
        { id: 'lo-05-07-3', description: 'Understand that abstract classes cannot be instantiated', completed: false },
      ],
      englishExplanation: {
        id: 'ee-05-07',
        text: `An abstract class is a class that cannot be instantiated. It serves as a blueprint for other classes. Abstract classes can contain both abstract methods (without implementation) and concrete methods (with implementation).\n\nThe abstract keyword declares an abstract class or method. Any class that extends an abstract class MUST provide implementations for all abstract methods.\n\nWhen to use abstract classes: When you want to provide a common base with shared implementation but require subclasses to implement certain methods. When you want to define a contract that all subclasses must follow.\n\nAbstract classes vs Interfaces: Abstract classes can have constructors, fields, and concrete methods. A class can extend only one abstract class but implement multiple interfaces.`
      },
      romanUrduExplanation: {
        id: 'ru-05-07',
        text: `Abstract class ek aisi class hai jisko directly instantiate nahi kiya ja sakta. Ye doosre classes ke liye blueprint ka kaam karta hai.\n\nAbstract class kab use karein: Jab aap common base provide karna chahein shared implementation ke saath lekin subclasses ko certain methods implement karne par majboor karein.\n\nAbstract classes vs Interfaces: Abstract classes mein constructors, fields, aur concrete methods ho sakte hain. Ek class sirf ek abstract class extend kar sakti hai.`
      },
      keyPoints: [
        { id: 'kp-05-07-1', title: 'Cannot Instantiate', description: 'Abstract classes cannot be objects directly.' },
        { id: 'kp-05-07-2', title: 'Abstract Methods', description: 'Methods without implementation. Subclasses MUST implement them.' },
        { id: 'kp-05-07-3', title: 'Partial Implementation', description: 'Can have both abstract and concrete methods.' },
      ],
      codeExamples: [
        {
          id: 'ce-05-07-1',
          title: 'Abstract Class with Abstract and Concrete Methods',
          code: `public abstract class Shape {
    String color;

    Shape(String color) {
        this.color = color;
    }

    abstract double calculateArea();
    abstract double calculatePerimeter();

    void displayColor() {
        System.out.println("Color: " + color);
    }

    void describe() {
        System.out.println("A " + color + " shape with area " +
            String.format("%.2f", calculateArea()));
    }
}

public class Circle extends Shape {
    double radius;

    Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    double calculateArea() {
        return Math.PI * radius * radius;
    }

    @Override
    double calculatePerimeter() {
        return 2 * Math.PI * radius;
    }
}

public class Rectangle extends Shape {
    double width, height;

    Rectangle(String color, double width, double height) {
        super(color);
        this.width = width;
        this.height = height;
    }

    @Override
    double calculateArea() { return width * height; }

    @Override
    double calculatePerimeter() { return 2 * (width + height); }
}`,
          language: 'java',
          explanation: 'Shape defines the contract (abstract methods) and provides shared code (concrete methods).',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-05-07-1',
          title: 'Database Driver Framework',
          scenario: 'An abstract DatabaseDriver class with abstract connect(), disconnect(), and query() methods. Concrete implementations for MySQL, PostgreSQL, and Oracle.',
          oopConcept: 'The abstract class defines the contract. Each database vendor implements vendor-specific behavior.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-05-07-1',
          title: 'Forgetting to Implement Abstract Methods',
          incorrectCode: `public abstract class Animal {
    abstract void makeSound();
}

public class Dog extends Animal {
}`,
          correctCode: `public abstract class Animal {
    abstract void makeSound();
}

public class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Woof!");
    }
}`,
          explanation: 'A non-abstract subclass MUST implement all abstract methods.',
        },
      ],
      examNotes: [
        { id: 'en-05-07-1', title: 'Abstract Class Rules', content: 'Cannot instantiate. Can have abstract and concrete methods. Subclass must implement all abstract methods.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-05-07-1', question: 'Can an abstract class have constructors?', answer: 'Yes. They are called by subclass constructors via super().', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-05-07-1', type: 'mcq', question: 'What happens if a subclass does not implement all abstract methods?', options: ['Runs with defaults', 'Must be declared abstract', 'Runtime error', 'Returns null'], correctAnswer: 'Must be declared abstract', explanation: 'A non-abstract subclass must implement all abstract methods.' },
        { id: 'qc-05-07-2', type: 'true-false', question: 'You can create an object from an abstract class.', correctAnswer: 'False', explanation: 'Abstract classes cannot be instantiated.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-05-07-1',
          scenario: 'You are designing a game with Warrior, Mage, and Archer. All characters have attack(), defend(), and useSpecialAbility(). All share healthPoints and takeDamage().',
          question: 'Which design is most appropriate?',
          type: 'design-decision',
          options: [
            'Separate classes with no common parent',
            'Abstract Character class with abstract attack/defend and concrete takeDamage',
            'Interface Character with all methods abstract',
            'Concrete Character class with all methods',
          ],
          correctAnswer: 'Abstract Character class with abstract attack/defend and concrete takeDamage',
          explanation: 'The abstract class provides shared code and enforces the contract.',
          relatedConcepts: ['abstract-class', 'template-method'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-abstract-classes',
      prerequisites: ['lesson-05-03', 'lesson-05-04'],
      xpReward: 70,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'abstract-classes',
      difficulty: 'medium',
      estimatedMinutes: 22,
    },
    {
      id: 'lesson-05-08',
      moduleId: 'module-05',
      title: 'Inheritance vs Composition',
      slug: 'inheritance-vs-composition',
      order: 8,
      duration: 22,
      description: 'Learn when to use inheritance (IS-A) versus composition (HAS-A) and why composition is often preferred.',
      learningObjectives: [
        { id: 'lo-05-08-1', description: 'Distinguish between IS-A and HAS-A relationships', completed: false },
        { id: 'lo-05-08-2', description: 'Explain why composition is generally preferred over inheritance', completed: false },
        { id: 'lo-05-08-3', description: 'Apply the principle favor composition over inheritance', completed: false },
      ],
      englishExplanation: {
        id: 'ee-05-08',
        text: `Inheritance and composition are two ways to achieve code reuse, but they serve different purposes.\n\nInheritance (IS-A): A Dog IS-A Animal. Creates tight coupling. The child depends on the parent's implementation.\n\nComposition (HAS-A): A Car HAS-A Engine. Creates loose coupling. The Car uses an Engine but does not depend on its internal implementation.\n\nWhy composition is often preferred: Loose coupling, flexibility to change at runtime, no inheritance chain, better encapsulation, and easier testing.\n\nThe principle favor composition over inheritance does not mean never use inheritance. Inheritance is correct when there is a genuine IS-A relationship and you want polymorphic behavior.`
      },
      romanUrduExplanation: {
        id: 'ru-05-08',
        text: `Inheritance aur composition code reuse ke do tareeke hain.\n\nInheritance (IS-A): Dog IS-A Animal. Tight coupling banata hai.\n\nComposition (HAS-A): Car HAS-A Engine. Loose coupling banata hai.\n\nComposition kyun preferred hai: Loose coupling, runtime flexibility, better encapsulation, easier testing.\n\nComposition over inheritance ka principle ye nahi ke inheritance kabhi mat use karein. Inheritance tab sahi hai jab genuine IS-A relationship ho.`
      },
      keyPoints: [
        { id: 'kp-05-08-1', title: 'IS-A vs HAS-A', description: 'Inheritance = IS-A. Composition = HAS-A.' },
        { id: 'kp-05-08-2', title: 'Coupling', description: 'Inheritance creates tight coupling. Composition creates loose coupling.' },
        { id: 'kp-05-08-3', title: 'Flexibility', description: 'Composition allows runtime changes. Inheritance is fixed at compile time.' },
      ],
      codeExamples: [
        {
          id: 'ce-05-08-1',
          title: 'Inheritance vs Composition Side by Side',
          code: `public interface Engine {
    void start();
    void stop();
}

public class GasEngine implements Engine {
    public void start() { System.out.println("Vroom! Gas engine started"); }
    public void stop() { System.out.println("Gas engine stopped"); }
}

public class ElectricEngine implements Engine {
    public void start() { System.out.println("Silent electric start"); }
    public void stop() { System.out.println("Electric motor stopped"); }
}

public class Car {
    private Engine engine;

    Car(Engine engine) {
        this.engine = engine;
    }

    void start() {
        engine.start();
    }

    void setEngine(Engine engine) {
        this.engine = engine;
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car(new GasEngine());
        car.start();
        car.setEngine(new ElectricEngine());
        car.start();
    }
}`,
          language: 'java',
          output: `Vroom! Gas engine started\nSilent electric start`,
          explanation: 'Composition lets you swap behaviors at runtime. The Car class does not care which Engine implementation it uses.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-05-08-1',
          title: 'Strategy Pattern in E-Commerce',
          scenario: 'An e-commerce system needs different discount strategies. Using composition, the ShoppingCart holds a DiscountStrategy that can be swapped at runtime.',
          oopConcept: 'The ShoppingCart HAS-A DiscountStrategy. Different implementations can be swapped dynamically.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-05-08-1',
          title: 'Using Inheritance When Composition is Better',
          incorrectCode: `public class Manager extends Employee {
    @Override
    void calculateSalary() {
        // mostly same code as Employee...
        // just adds a bonus
    }
}`,
          correctCode: `public class Employee {
    private SalaryCalculator calculator;

    Employee() {
        this.calculator = new BasicSalaryCalculator();
    }

    void calculateSalary() {
        calculator.calculate(this);
    }
}

public class Manager extends Employee {
    Manager() {
        this.calculator = new ManagerSalaryCalculator();
    }
}`,
          explanation: 'When overriding most methods for a small change, composition is better.',
        },
      ],
      examNotes: [
        { id: 'en-05-08-1', title: 'Favor Composition', content: 'Use inheritance for genuine IS-A with polymorphism. Use composition for HAS-A with flexibility.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-05-08-1', question: 'Why is composition generally preferred over inheritance?', answer: 'Composition creates loose coupling, allows runtime flexibility, better encapsulation, and easier testing.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-05-08-1', type: 'mcq', question: 'A Car has an Engine. This is an example of:', options: ['Inheritance (IS-A)', 'Composition (HAS-A)', 'Polymorphism', 'Abstraction'], correctAnswer: 'Composition (HAS-A)', explanation: 'A Car HAS-A Engine.' },
        { id: 'qc-05-08-2', type: 'true-false', question: 'Inheritance should never be used.', correctAnswer: 'False', explanation: 'Inheritance is correct for genuine IS-A relationships.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-05-08-1',
          scenario: 'You need to add logging capability to Student, Teacher, and Course classes.',
          question: 'Should you use inheritance or composition?',
          type: 'design-decision',
          options: [
            'Inheritance - LoggerStudent extends Student',
            'Composition - Student has a Logger field',
            'Both work equally',
            'Static methods',
          ],
          correctAnswer: 'Composition - Student has a Logger field',
          explanation: 'Logging is a CAN-DO capability, not an IS-A relationship.',
          relatedConcepts: ['composition', 'inheritance'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-inheritance-vs-composition',
      prerequisites: ['lesson-05-01', 'lesson-05-03'],
      xpReward: 70,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'composition-vs-inheritance',
      difficulty: 'medium',
      estimatedMinutes: 22,
    },
    {
      id: 'lesson-05-09',
      moduleId: 'module-05',
      title: 'Accessing Parent Members',
      slug: 'accessing-parent-members',
      order: 9,
      duration: 18,
      description: 'Learn how protected access and package-private inheritance affect member accessibility in subclasses.',
      learningObjectives: [
        { id: 'lo-05-09-1', description: 'Access parent protected members from a subclass', completed: false },
        { id: 'lo-05-09-2', description: 'Explain package-private access in inheritance contexts', completed: false },
        { id: 'lo-05-09-3', description: 'Choose appropriate access levels for inheritable members', completed: false },
      ],
      englishExplanation: {
        id: 'ee-05-09',
        text: `When a subclass inherits from a parent class, the access modifiers on parent members determine what the subclass can access.\n\nPublic members: Accessible everywhere.\n\nProtected members: Accessible in the same package AND by subclasses in other packages.\n\nDefault members: Accessible only within the same package.\n\nPrivate members: Not accessible in subclasses at all.\n\nA practical consideration: when deciding the access level for a member that subclasses need, use protected. However, be careful with protected fields - it is often better to make fields private and provide protected getters/setters.`
      },
      romanUrduExplanation: {
        id: 'ru-05-09',
        text: `Jab subclass parent se inherit karta hai, access modifiers determine karte hain ke subclass kya access kar sakta hai.\n\nPublic members: Har jagah accessible.\nProtected members: Same package aur subclasses in other packages.\nDefault members: Sirf same package.\nPrivate members: Subclasses mein accessible nahi.\n\nProtected fields se savdhaan rahein - often better hai fields private rakhein aur protected getters/setters provide karein.`
      },
      keyPoints: [
        { id: 'kp-05-09-1', title: 'Public Access', description: 'Accessible in subclasses everywhere.' },
        { id: 'kp-05-09-2', title: 'Protected Access', description: 'Same package + subclasses in other packages.' },
        { id: 'kp-05-09-3', title: 'Default Access', description: 'Same package only.' },
        { id: 'kp-05-09-4', title: 'Private Invisibility', description: 'Invisible to subclasses.' },
      ],
      codeExamples: [
        {
          id: 'ce-05-09-1',
          title: 'Access Levels in Inheritance',
          code: `public class Teacher {
    public String name = "Public Name";
    protected String subject = "Protected Subject";
    String department = "Default Department";
    private String password = "Secret123";
}

public class SamePackageChild extends Teacher {
    void test() {
        System.out.println(name);       // OK - public
        System.out.println(subject);    // OK - protected
        System.out.println(department); // OK - same package
    }
}

// In different package:
public class DifferentPackageChild extends Teacher {
    void test() {
        System.out.println(name);       // OK - public
        System.out.println(subject);    // OK - protected (subclass)
        // System.out.println(department); // ERROR - default access
    }
}`,
          language: 'java',
          explanation: 'Access levels in inheritance: public (everywhere), protected (same package + subclasses), default (same package only), private (nowhere in subclass).',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-05-09-1',
          title: 'Framework Extension Points',
          scenario: 'A web framework has a base Controller class with protected methods for accessing request data. Private methods handle internal logic.',
          oopConcept: 'Protected methods are the framework extension points.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-05-09-1',
          title: 'Making Fields Protected When Private with Getter is Better',
          incorrectCode: `public class Person {
    protected String name;
    protected int age;
}

public class Student extends Person {
    void birthday() {
        name = "Changed!";
        age = -1;
    }
}`,
          correctCode: `public class Person {
    private String name;
    private int age;

    protected String getName() { return name; }
    protected void setName(String name) {
        if (name != null && !name.isEmpty()) this.name = name;
    }
    protected int getAge() { return age; }
    protected void setAge(int age) {
        if (age >= 0 && age <= 150) this.age = age;
    }
}

public class Student extends Person {
    void birthday() {
        setAge(getAge() + 1);
    }
}`,
          explanation: 'Protected fields allow direct modification without validation. Protected getters/setters provide controlled access.',
        },
      ],
      examNotes: [
        { id: 'en-05-09-1', title: 'Access in Inheritance', content: 'public = everywhere, protected = same package + subclasses, default = same package only, private = not in subclass.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-05-09-1', question: 'When should you use protected access?', answer: 'When a member needs to be accessible by subclasses in other packages but should be hidden from non-subclass external code.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-05-09-1', type: 'mcq', question: 'A parent has a protected method. A subclass in another package can:', options: ['Not access it', 'Access it because it is a subclass', 'Access only if redeclared', 'Through reflection only'], correctAnswer: 'Access it because it is a subclass', explanation: 'Protected access allows subclass access across packages.' },
        { id: 'qc-05-09-2', type: 'true-false', question: 'Private members of a parent are accessible in a subclass.', correctAnswer: 'False', explanation: 'Private members are only accessible within the declaring class.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-05-09-1',
          scenario: 'You have a base class for a game with a healthPoints field. Subclasses need to read it but should use takeDamage() to modify it.',
          question: 'What access level should healthPoints have?',
          type: 'design-decision',
          options: ['public', 'protected', 'private with a protected getter', 'private with no access'],
          correctAnswer: 'private with a protected getter - controlled read access',
          explanation: 'Private field with protected getter gives read access while preventing direct modification.',
          relatedConcepts: ['access-modifiers', 'encapsulation'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-parent-member-access',
      prerequisites: ['lesson-04-02', 'lesson-05-01'],
      xpReward: 50,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'access-in-inheritance',
      difficulty: 'medium',
      estimatedMinutes: 18,
    },
    {
      id: 'lesson-05-10',
      moduleId: 'module-05',
      title: 'Polymorphic Behavior with Inheritance',
      slug: 'polymorphic-behavior-inheritance',
      order: 10,
      duration: 22,
      description: 'Understand upcasting, dynamic dispatch, and the Liskov Substitution Principle.',
      learningObjectives: [
        { id: 'lo-05-10-1', description: 'Explain upcasting and downcasting in inheritance', completed: false },
        { id: 'lo-05-10-2', description: 'Describe how dynamic dispatch selects the correct method', completed: false },
        { id: 'lo-05-10-3', description: 'Understand the Liskov Substitution Principle', completed: false },
      ],
      englishExplanation: {
        id: 'ee-05-10',
        text: `Inheritance enables powerful polymorphic behavior through upcasting and dynamic dispatch.\n\nUpcasting: Assigning a child object to a parent reference. Animal a = new Dog(). This is safe because Dog IS-A Animal.\n\nDowncasting: Casting a parent reference back to a child type. Dog d = (Dog) a. This requires an explicit cast and can fail at runtime.\n\nDynamic Dispatch: When you call a method on a parent reference, Java determines at runtime which version to call based on the actual object type.\n\nLiskov Substitution Principle: Objects of a parent type should be replaceable with objects of a child type without breaking the program.`
      },
      romanUrduExplanation: {
        id: 'ru-05-10',
        text: `Inheritance upcasting aur dynamic dispatch ke through powerful polymorphic behavior enable karta hai.\n\nUpcasting: Child object ko parent reference mein assign karna. Safe hai kyunki Dog IS-A Animal hai.\n\nDowncasting: Parent reference ko child type mein cast karna. Explicit cast require karta hai.\n\nDynamic Dispatch: JVM runtime mein decide karta hai kaunsa method call ho.\n\nLiskov Substitution Principle: Parent type ke objects ko child type se replace kiya ja sakta hai bina program toote.`
      },
      keyPoints: [
        { id: 'kp-05-10-1', title: 'Upcasting', description: 'Child to parent reference. Implicit, always safe.' },
        { id: 'kp-05-10-2', title: 'Downcasting', description: 'Parent to child reference. Explicit, can fail.' },
        { id: 'kp-05-10-3', title: 'Dynamic Dispatch', description: 'JVM selects method based on actual object type at runtime.' },
        { id: 'kp-05-10-4', title: 'Liskov Substitution', description: 'Child objects should be substitutable for parent objects.' },
      ],
      codeExamples: [
        {
          id: 'ce-05-10-1',
          title: 'Upcasting, Downcasting, and Dynamic Dispatch',
          code: `public class Animal {
    void makeSound() { System.out.println("Generic sound"); }
}

public class Dog extends Animal {
    @Override
    void makeSound() { System.out.println("Woof!"); }
    void fetch() { System.out.println("Fetching ball"); }
}

public class Cat extends Animal {
    @Override
    void makeSound() { System.out.println("Meow!"); }
    void scratch() { System.out.println("Scratching"); }
}

public class Main {
    public static void main(String[] args) {
        Animal a1 = new Dog();
        Animal a2 = new Cat();

        a1.makeSound();
        a2.makeSound();

        Dog d = (Dog) a1;
        d.fetch();

        if (a2 instanceof Cat) {
            Cat c = (Cat) a2;
            c.scratch();
        }

        Animal[] animals = { new Dog(), new Cat(), new Dog() };
        for (Animal a : animals) {
            a.makeSound();
        }
    }
}`,
          language: 'java',
          output: `Woof!\nMeow!\nFetching ball\nScratching\nWoof!\nMeow!\nWoof!`,
          explanation: 'Upcasting assigns child to parent. Dynamic dispatch calls correct overridden method. Downcasting requires instanceof check.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-05-10-1',
          title: 'Plugin Architecture',
          scenario: 'A text editor supports plugins through a Plugin interface. Different plugins implement the interface. The editor uses polymorphism to call each plugin methods.',
          oopConcept: 'The editor uses upcasting and dynamic dispatch for uniform plugin processing.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-05-10-1',
          title: 'Unsafe Downcasting Without instanceof',
          incorrectCode: `Animal a = new Cat();
Dog d = (Dog) a;
d.fetch();`,
          correctCode: `Animal a = new Cat();
if (a instanceof Dog) {
    Dog d = (Dog) a;
    d.fetch();
} else {
    System.out.println("a is not a Dog");
}`,
          explanation: 'Always check with instanceof before downcasting.',
        },
      ],
      examNotes: [
        { id: 'en-05-10-1', title: 'Casting Rules', content: 'Upcasting: child to parent, implicit, safe. Downcasting: parent to child, explicit, can fail.', importance: 'high' },
        { id: 'en-05-10-2', title: 'Dynamic Dispatch', content: 'JVM selects method based on actual object type at runtime.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-05-10-1', question: 'What is the Liskov Substitution Principle?', answer: 'Objects of a parent type should be replaceable with objects of a child type without breaking the program.', difficulty: 'hard' },
        { id: 'vq-05-10-2', question: 'What is the difference between upcasting and downcasting?', answer: 'Upcasting assigns child to parent reference (implicit, safe). Downcasting casts parent to child (explicit, can fail).', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-05-10-1', type: 'mcq', question: 'Animal a = new Dog(); a.makeSound(); which is called?', options: ['Animal version', 'Dog version', 'Both', 'Error'], correctAnswer: 'Dog version', explanation: 'Dynamic dispatch selects based on actual object type.' },
        { id: 'qc-05-10-2', type: 'true-false', question: 'Upcasting requires an explicit cast.', correctAnswer: 'False', explanation: 'Upcasting happens implicitly.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-05-10-1',
          scenario: 'A method accepts an Animal parameter and calls makeSound(). You pass a Dog object.',
          question: 'What happens?',
          type: 'concept-application',
          options: ['Compilation error', 'Dog version called via dynamic dispatch', 'Animal version called', 'Both called'],
          correctAnswer: 'Dog version called via dynamic dispatch',
          explanation: 'Dynamic dispatch looks at actual object type at runtime.',
          relatedConcepts: ['dynamic-dispatch', 'polymorphism'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-polymorphic-behavior',
      prerequisites: ['lesson-05-03', 'lesson-05-04'],
      xpReward: 70,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'polymorphism-in-inheritance',
      difficulty: 'medium',
      estimatedMinutes: 22,
    },
    {
      id: 'lesson-05-11',
      moduleId: 'module-05',
      title: 'Common Inheritance Pitfalls',
      slug: 'common-inheritance-pitfalls',
      order: 11,
      duration: 22,
      description: 'Learn about the fragile base class problem, diamond problem, over-inheritance, and other pitfalls.',
      learningObjectives: [
        { id: 'lo-05-11-1', description: 'Explain the fragile base class problem', completed: false },
        { id: 'lo-05-11-2', description: 'Describe the diamond problem and Java solution', completed: false },
        { id: 'lo-05-11-3', description: 'Identify over-inheritance and its consequences', completed: false },
      ],
      englishExplanation: {
        id: 'ee-05-11',
        text: `Inheritance has several well-known pitfalls.\n\nFragile Base Class Problem: When a parent class is modified, all child classes can break. The parent and children are tightly coupled.\n\nDiamond Problem: In languages supporting multiple inheritance, a class inheriting from two parents with a common ancestor creates ambiguity. Java avoids this by not supporting multiple class inheritance.\n\nOver-Inheritance: Creating deep hierarchies or using inheritance when composition is more appropriate. Leads to tight coupling and maintenance nightmares.\n\nThe best defense: use composition when IS-A is not genuine, keep hierarchies shallow, program to interfaces, and design stable public APIs.`
      },
      romanUrduExplanation: {
        id: 'ru-05-11',
        text: `Inheritance ke kayi well-known pitfalls hain.\n\nFragile Base Class Problem: Jab parent class modify hoti hai, saare child classes toot sakte hain.\n\nDiamond Problem: Do parents ke saath ambiguity. Java isse multiple class inheritance support na karke avoid karta hai.\n\nOver-Inheritance: Deep hierarchies banana ya composition ki bajaye inheritance use karna.\n\nBest defense: composition use karein, hierarchies shallow rakhein, interfaces par program karein.`
      },
      keyPoints: [
        { id: 'kp-05-11-1', title: 'Fragile Base Class', description: 'Parent changes can break child classes.' },
        { id: 'kp-05-11-2', title: 'Diamond Problem', description: 'Ambiguity with two parents having same method. Java avoids this.' },
        { id: 'kp-05-11-3', title: 'Over-Inheritance', description: 'Deep hierarchies lead to tight coupling.' },
      ],
      codeExamples: [
        {
          id: 'ce-05-11-1',
          title: 'Over-Inheritance Anti-Pattern',
          code: `// BAD: Too many levels
class A { void doWork() { } }
class B extends A { }
class C extends B { }
class D extends C { }
class E extends D { }

// BETTER: Shallow hierarchy with composition
public class IconButton {
    private Icon icon;
    private String label;
    private ClickHandler handler;

    IconButton(Icon icon, String label, ClickHandler handler) {
        this.icon = icon;
        this.label = label;
        this.handler = handler;
    }

    void render() {
        icon.draw();
        System.out.println(label);
    }
}`,
          language: 'java',
          explanation: 'Instead of deep inheritance, composition gives loose coupling.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-05-11-1',
          title: 'Java AWT/Swing History',
          scenario: 'Java original AWT used deep hierarchies. Swing addressed this by using composition.',
          oopConcept: 'Composition provides better encapsulation than deep inheritance.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-05-11-1',
          title: 'Deep Inheritance Chains',
          incorrectCode: `class A { void doWork() { } }
class B extends A { }
class C extends B { }
class D extends C { }
class E extends D { }`,
          correctCode: `class Engine { void start() { } }

class Car {
    private Engine engine;
    Car() { this.engine = new Engine(); }
    void start() { engine.start(); }
}`,
          explanation: 'Deep inheritance creates fragile hierarchies. Keep hierarchies shallow and use composition.',
        },
      ],
      examNotes: [
        { id: 'en-05-11-1', title: 'Fragile Base Class', content: 'Parent changes can break children. Mitigate with composition and shallow hierarchies.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-05-11-1', question: 'What is the fragile base class problem?', answer: 'When a parent class changes, child classes can break due to tight coupling.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-05-11-1', type: 'mcq', question: 'The fragile base class problem occurs when:', options: ['Child changes', 'Parent changes and breaks children', 'Two children conflict', 'Interface modified'], correctAnswer: 'Parent changes and breaks children', explanation: 'Parent changes can unexpectedly break child class behavior.' },
        { id: 'qc-05-11-2', type: 'true-false', question: 'Deep inheritance hierarchies (5+ levels) are good design.', correctAnswer: 'False', explanation: 'Deep hierarchies are fragile and hard to maintain.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-05-11-1',
          scenario: 'A parent class is being modified. You have 15 subclasses that depend on it.',
          question: 'What is the biggest risk?',
          type: 'debugging',
          options: ['Performance degradation', 'Subclasses may break due to fragile base class', 'New feature will not work', 'Compilation slower'],
          correctAnswer: 'Subclasses may break due to fragile base class',
          explanation: 'The fragile base class problem means parent changes can break children.',
          relatedConcepts: ['fragile-base-class', 'tight-coupling'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-inheritance-pitfalls',
      prerequisites: ['lesson-05-08', 'lesson-05-10'],
      xpReward: 70,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'inheritance-pitfalls',
      difficulty: 'medium',
      estimatedMinutes: 22,
    },
    {
      id: 'lesson-05-12',
      moduleId: 'module-05',
      title: 'Practical Inheritance Design',
      slug: 'practical-inheritance-design',
      order: 12,
      duration: 25,
      description: 'Apply inheritance principles through a comprehensive employee hierarchy case study.',
      learningObjectives: [
        { id: 'lo-05-12-1', description: 'Design a complete employee hierarchy using inheritance', completed: false },
        { id: 'lo-05-12-2', description: 'Apply abstract classes, overriding, and polymorphism in a real scenario', completed: false },
        { id: 'lo-05-12-3', description: 'Evaluate the design using inheritance best practices', completed: false },
      ],
      englishExplanation: {
        id: 'ee-05-12',
        text: `Let us apply everything we have learned to a comprehensive case study: an Employee hierarchy.\n\nThe hierarchy:\n- Employee (abstract) - base class with common fields and methods\n- FullTimeEmployee extends Employee - salaried employees\n- PartTimeEmployee extends Employee - hourly employees\n- Manager extends FullTimeEmployee - managers with team management\n- Developer extends FullTimeEmployee - developers with programming skills\n\nThe Employee abstract class defines:\n- Common fields: name, id, baseSalary\n- Abstract methods: calculatePay(), getRole()\n- Concrete methods: getDetails(), takeLeave()\n\nEach subclass overrides calculatePay() with its specific logic.\n\nPolymorphism in action: The company stores all employees in a List<Employee> and calls calculatePay() on each. Dynamic dispatch ensures the correct version runs.\n\nThis design follows best practices: genuine IS-A relationships, shallow hierarchy, abstract class defines contract, each subclass adds specific behavior, polymorphism enables uniform processing.`
      },
      romanUrduExplanation: {
        id: 'ru-05-12',
        text: `Aaiye jo kuch seekha hai use comprehensive case study mein apply karte hain: Employee hierarchy.\n\nHierarchy: Employee (abstract), FullTimeEmployee, PartTimeEmployee, Manager, Developer.\n\nEmployee abstract class: name, id, baseSalary fields. calculatePay(), getRole() abstract methods. getDetails(), takeLeave() concrete methods.\n\nHar subclass apne specific logic ke saath calculatePay() override karta hai.\n\nPolymorphism: Company List<Employee> mein rakhta hai aur har ek par calculatePay() call karta hai. Dynamic dispatch ensure karta hai sahi version chale.`
      },
      keyPoints: [
        { id: 'kp-05-12-1', title: 'Employee Hierarchy', description: 'Abstract Employee with concrete subclasses: FullTime, PartTime, Manager, Developer.' },
        { id: 'kp-05-12-2', title: 'calculatePay() Polymorphism', description: 'Each subclass overrides with its specific pay logic.' },
        { id: 'kp-05-12-3', title: 'Uniform Processing', description: 'List<Employee> stores all types. Polymorphism enables uniform processing.' },
      ],
      codeExamples: [
        {
          id: 'ce-05-12-1',
          title: 'Complete Employee Hierarchy',
          code: `public abstract class Employee {
    protected String name;
    protected String id;
    protected double baseSalary;

    public Employee(String name, String id, double baseSalary) {
        this.name = name;
        this.id = id;
        this.baseSalary = baseSalary;
    }

    public abstract double calculatePay();
    public abstract String getRole();

    public String getDetails() {
        return getRole() + ": " + name + " (" + id + ")";
    }
}

public class FullTimeEmployee extends Employee {
    protected double benefits;

    public FullTimeEmployee(String name, String id, double salary, double benefits) {
        super(name, id, salary);
        this.benefits = benefits;
    }

    @Override
    public double calculatePay() { return baseSalary + benefits; }

    @Override
    public String getRole() { return "Full-Time Employee"; }
}

public class PartTimeEmployee extends Employee {
    private double hourlyRate;
    private int hoursWorked;

    public PartTimeEmployee(String name, String id, double rate, int hours) {
        super(name, id, 0);
        this.hourlyRate = rate;
        this.hoursWorked = hours;
    }

    @Override
    public double calculatePay() { return hourlyRate * hoursWorked; }

    @Override
    public String getRole() { return "Part-Time Employee"; }
}

public class Manager extends FullTimeEmployee {
    private int teamSize;

    public Manager(String name, String id, double salary, double benefits, int teamSize) {
        super(name, id, salary, benefits);
        this.teamSize = teamSize;
    }

    @Override
    public double calculatePay() {
        return super.calculatePay() + (teamSize * 500);
    }

    @Override
    public String getRole() { return "Manager"; }
}

public class Developer extends FullTimeEmployee {
    private int overtimeHours;

    public Developer(String name, String id, double salary, double benefits, int overtime) {
        super(name, id, salary, benefits);
        this.overtimeHours = overtime;
    }

    @Override
    public double calculatePay() {
        return super.calculatePay() + (overtimeHours * 75);
    }

    @Override
    public String getRole() { return "Developer"; }
}

// Polymorphic usage:
import java.util.List;
import java.util.ArrayList;

public class Company {
    public static void main(String[] args) {
        List<Employee> employees = new ArrayList<>();
        employees.add(new Manager("Ali", "M001", 80000, 5000, 10));
        employees.add(new Developer("Sara", "D001", 70000, 3000, 20));
        employees.add(new PartTimeEmployee("Ahmed", "P001", 25, 80));
        employees.add(new FullTimeEmployee("Fatima", "F001", 45000, 2000));

        double totalPayroll = 0;
        for (Employee e : employees) {
            System.out.println(e.getDetails() + " - Pay: $" + e.calculatePay());
            totalPayroll += e.calculatePay();
        }
        System.out.println("Total Payroll: $" + totalPayroll);
    }
}`,
          language: 'java',
          output: `Manager: Ali (M001) - Pay: $85000.0\nDeveloper: Sara (D001) - Pay: $74500.0\nPart-Time Employee: Ahmed (P001) - Pay: $2000.0\nFull-Time Employee: Fatima (F001) - Pay: $47000.0\nTotal Payroll: $208500.0`,
          explanation: 'Complete hierarchy with abstract class, method overriding, super() calls, and polymorphic List<Employee>.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-05-12-1',
          title: 'Bank Account Hierarchy',
          scenario: 'A bank has SavingsAccount, CheckingAccount, and LoanAccount extending abstract BankAccount. Each calculates interest differently.',
          oopConcept: 'Same pattern: abstract base defines contract, subclasses implement specific behavior, polymorphism enables uniform processing.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-05-12-1',
          title: 'Not Using Polymorphism for Processing',
          incorrectCode: `for (Employee e : employees) {
    if (e instanceof Manager) {
        System.out.println("Manager: " + ((Manager) e).calculatePay());
    } else if (e instanceof Developer) {
        System.out.println("Developer: " + ((Developer) e).calculatePay());
    }
}`,
          correctCode: `for (Employee e : employees) {
    System.out.println(e.getRole() + ": " + e.calculatePay());
}`,
          explanation: 'If checking types with instanceof, you are not using polymorphism correctly.',
        },
      ],
      examNotes: [
        { id: 'en-05-12-1', title: 'Case Study Design', content: 'Demonstrates: abstract classes, method overriding, super(), and polymorphic collections.', importance: 'high' },
        { id: 'en-05-12-2', title: 'Polymorphism Usage', content: 'If using instanceof checks, you are not using polymorphism correctly.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-05-12-1', question: 'How does polymorphism simplify processing?', answer: 'Instead of checking types with instanceof, you call the method on the parent reference. Each subclass provides its own implementation. The correct version runs automatically.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-05-12-1', type: 'mcq', question: 'In the Employee hierarchy, why is calculatePay() abstract?', options: ['To save memory', 'Because each employee type calculates pay differently', 'Because Java requires it', 'To make the class faster'], correctAnswer: 'Because each employee type calculates pay differently', explanation: 'Abstract methods define behavior that subclasses must implement differently.' },
        { id: 'qc-05-12-2', type: 'true-false', question: 'You can store Manager and Developer objects in a List<Employee>.', correctAnswer: 'True', explanation: 'Because Manager and Developer IS-A Employee, they can be stored in a List<Employee> through upcasting.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-05-12-1',
          scenario: 'You need to add a new Intern class to the Employee hierarchy. Interns work 20 hours per week at minimum wage.',
          question: 'How should you design the Intern class?',
          type: 'design-decision',
          options: [
            'Extend FullTimeEmployee',
            'Extend Employee and override calculatePay()',
            'Create a separate class with no inheritance',
            'Extend PartTimeEmployee',
          ],
          correctAnswer: 'Extend Employee and override calculatePay()',
          explanation: 'Intern IS-A Employee. It should extend Employee directly and implement calculatePay() with its own logic.',
          relatedConcepts: ['inheritance-design', 'abstract-class', 'method-overriding'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-employee-hierarchy',
      prerequisites: ['lesson-05-07', 'lesson-05-10'],
      xpReward: 80,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'practical-design',
      difficulty: 'medium',
      estimatedMinutes: 25,
    },
  ],
};
