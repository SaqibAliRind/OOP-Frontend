import type { Module } from '@/types';

export const module07: Module = {
  id: 'module-07',
  title: 'Abstraction',
  slug: 'abstraction',
  order: 7,
  description: 'Master abstraction — hiding complexity and showing only essential features. Learn abstract classes, interfaces, and design strategies for building maintainable systems.',
  icon: 'Eye',
  color: '#06b6d4',
  xpReward: 520,
  isUnlocked: true,
  completed: false,
  progress: 0,
  totalDuration: 150,
  prerequisiteModuleIds: ['module-01', 'module-02', 'module-03', 'module-04', 'module-05', 'module-06'],
  lessons: [
    {
      id: 'lesson-07-01',
      moduleId: 'module-07',
      title: 'What is Abstraction?',
      slug: 'what-is-abstraction',
      order: 1,
      duration: 15,
      description: 'Understand what abstraction means in OOP — hiding complexity and showing only the essential features of an object.',
      learningObjectives: [
        { id: 'lo-07-01-1', description: 'Define abstraction and explain its purpose in OOP', completed: false },
        { id: 'lo-07-01-2', description: 'Identify abstraction in real-world and programming contexts', completed: false },
        { id: 'lo-07-01-3', description: 'Explain how abstraction reduces complexity', completed: false },
        { id: 'lo-07-01-4', description: 'Distinguish between abstraction and encapsulation', completed: false },
      ],
      englishExplanation: {
        id: 'ee-07-01',
        text: `Abstraction is the process of hiding complex implementation details and showing only the essential features of an object to the user. It focuses on WHAT an object does rather than HOW it does it. Abstraction is one of the four fundamental pillars of OOP.

Think of a car. When you drive, you interact with the steering wheel, accelerator, and brake. You do not need to know how the engine combustion works, how the fuel injection system operates, or how the transmission shifts gears. The car abstracts away the complexity — you get a simple interface (steering, pedals) for a complex system (engine, transmission, electronics).

In programming, abstraction works the same way. When you use System.out.println("Hello"), you do not need to know how Java converts the string to bytes, how it communicates with the operating system, or how the display hardware renders characters. You call one simple method, and the complex process is hidden.

Abstraction and encapsulation are related but different concepts. Encapsulation is about hiding data by making fields private and providing controlled access through methods. Abstraction is about hiding complexity by defining contracts (what must be done) without specifying implementation (how it is done). Encapsulation protects data. Abstraction simplifies interfaces.

Abstraction is achieved through two mechanisms in Java: abstract classes and interfaces. An abstract class can provide partial implementation while leaving some methods abstract. An interface defines a pure contract with no implementation (until Java 8 default methods). Both allow you to define WHAT without committing to HOW.

The benefits of abstraction are significant: reduced complexity, increased reusability, enhanced maintainability, and improved code organization. When you abstract away details, you create a mental model that is easier to understand, test, and modify.`
      },
      romanUrduExplanation: {
        id: 'ru-07-01',
        text: `Abstraction complex implementation details chupane aur user ko sirf object ke essential features dikhane ka process hai. Ye focus karta hai ke object KYA karta hai, ye NAHI ke WOH kaise karta hai. Abstraction OOP ke four fundamental pillars mein se ek hai.

Car ka sochein. Jab aap drive karte hain, toh aap steering wheel, accelerator aur brake se interact karte hain. Aapko ye jaanne ki zaroorat nahi ke engine combustion kaise kaam karta hai, fuel injection system kaise operate karta hai, ya transmission gears kaise shift karta hai. Car complexity ko abstract kar deta hai — aapko simple interface (steering, pedals) milta hai ek complex system (engine, transmission, electronics) ke liye.

Programming mein, abstraction same tarike se kaam karta hai. Jab aap System.out.println("Hello") use karte hain, aapko ye jaanne ki zaroorat nahi ke Java string ko bytes mein kaise convert karta hai, operating system se kaise communicate karta hai, ya display hardware characters ko kaise render karta hai. Aap ek simple method call karte hain aur complex process chupa rehta hai.

Abstraction aur encapsulation related lekin different concepts hain. Encapsulation data chupane ke baare mein hai — fields ko private banakar aur methods ke through controlled access provide karke. Abstraction complexity chupane ke baare hai — contracts define karke (kya hona chahiye) bina implementation specify kiye (ye kaise hoga). Encapsulation data protect karta hai. Abstraction interfaces simplify karta hai.

Abstraction Java mein do mechanisms se achieve hota hai: abstract classes aur interfaces. Abstract class partial implementation provide kar sakti hai jabke kuch methods abstract chhod sake. Interface ek pure contract define karta hai bina implementation ke (Java 8 default methods tak). Dono aapko WHAT define karne dete hain bina HOW commit kiye.

Abstraction ke benefits significant hain: complexity kam hoti hai, reusability badhti hai, maintainability enhance hoti hai, aur code organization improve hota hai. Jab aap details abstract karte hain, toh aap ek mental model create karte hain jo samajhna, test karna aur modify karna aasan hota hai.`
      },
      keyPoints: [
        { id: 'kp-07-01-1', title: 'What, Not How', description: 'Abstraction focuses on WHAT an object does, hiding HOW it does it internally.' },
        { id: 'kp-07-01-2', title: 'Reduces Complexity', description: 'By hiding unnecessary details, abstraction makes systems easier to understand and use.' },
        { id: 'kp-07-01-3', title: 'Abstract Classes and Interfaces', description: 'Java implements abstraction through abstract classes (partial implementation) and interfaces (pure contracts).' },
        { id: 'kp-07-01-4', title: 'Different from Encapsulation', description: 'Encapsulation hides data. Abstraction hides complexity. They are complementary, not interchangeable.' },
      ],
      codeExamples: [
        {
          id: 'ce-07-01-1',
          title: 'Abstraction in Action',
          code: `// User sees simple methods — complexity is hidden
abstract class PaymentProcessor {
    abstract void processPayment(double amount);
    abstract boolean refund(double amount);
}

class CreditCardProcessor extends PaymentProcessor {
    @Override
    void processPayment(double amount) {
        // Complex logic hidden: connect to gateway, verify card,
        // encrypt data, handle response, update records
        System.out.println("Processing credit card payment: $" + amount);
    }

    @Override
    boolean refund(double amount) {
        System.out.println("Refunding credit card: $" + amount);
        return true;
    }
}

class PayPalProcessor extends PaymentProcessor {
    @Override
    void processPayment(double amount) {
        // Different complex logic hidden: authenticate user,
        // redirect to PayPal, handle callback
        System.out.println("Processing PayPal payment: $" + amount);
    }

    @Override
    boolean refund(double amount) {
        System.out.println("Refunding PayPal: $" + amount);
        return true;
    }
}

public class Main {
    public static void main(String[] args) {
        // User works with abstraction — does not know the implementation
        PaymentProcessor p1 = new CreditCardProcessor();
        PaymentProcessor p2 = new PayPalProcessor();
        p1.processPayment(100.0);  // simple call
        p2.processPayment(50.0);   // simple call
    }
}`,
          language: 'java',
          output: `Processing credit card payment: $100.0
Processing PayPal payment: $50.0`,
          explanation: 'The user calls processPayment() without knowing the complex implementation details. Each processor handles its own complexity internally. The interface is simple; the implementation is hidden.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-07-01-1',
          title: 'ATM Machine',
          scenario: 'An ATM provides simple buttons: insert card, enter PIN, select amount, get cash. The internal processes — bank communication, cash dispensing, receipt printing — are hidden from the user.',
          oopConcept: 'The ATM abstracts a complex banking system behind a simple user interface. The ATM class provides methods like withdraw(), checkBalance(), and deposit() without exposing the network, database, and mechanical operations.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-07-01-1',
          title: 'Confusing Abstraction with Encapsulation',
          incorrectCode: `// This is ENCAPSULATION, not abstraction
class BankAccount {
    private double balance;  // hiding data

    public double getBalance() { return balance; }
    public void deposit(double amount) { balance += amount; }
}
// Encapsulation hides data, but does not hide complexity`,
          correctCode: `// This is ABSTRACTION — hiding complexity behind a simple interface
abstract class Account {
    abstract void deposit(double amount);
    abstract void withdraw(double amount);
    abstract double getBalance();
}

class SavingsAccount extends Account {
    private double balance;
    private double interestRate;

    @Override
    void deposit(double amount) {
        // Complex logic: validate, update balance, apply interest rules
        balance += amount;
    }
    // ... implementation details hidden behind abstract methods
}
// Abstraction hides HOW things work, showing only WHAT they do`,
          explanation: 'Encapsulation (private fields + getters/setters) protects data. Abstraction (abstract methods + simplified interface) hides implementation complexity. Both are useful but serve different purposes.',
        },
      ],
      examNotes: [
        { id: 'en-07-01-1', title: 'Abstraction Definition', content: 'Abstraction hides implementation complexity and shows only essential features. Focus: WHAT, not HOW. Achieved through abstract classes and interfaces.', importance: 'high' },
        { id: 'en-07-01-2', title: 'Abstraction vs Encapsulation', content: 'Abstraction = hides complexity (design level). Encapsulation = hides data (implementation level). Abstraction uses abstract classes/interfaces. Encapsulation uses access modifiers.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-07-01-1', question: 'What is abstraction in OOP?', answer: 'Abstraction is hiding complex implementation details and showing only essential features. It focuses on WHAT an object does, not HOW it does it.', difficulty: 'easy' },
        { id: 'vq-07-01-2', question: 'How is abstraction different from encapsulation?', answer: 'Abstraction hides complexity behind interfaces (design level). Encapsulation hides data behind access modifiers (implementation level). Abstraction uses abstract classes and interfaces.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-07-01-1', type: 'mcq', question: 'What does abstraction hide?', options: ['Data values', 'Implementation complexity', 'Method names', 'Class names'], correctAnswer: 'Implementation complexity', explanation: 'Abstraction hides the complex internal workings and exposes only the essential interface to the user.' },
        { id: 'qc-07-01-2', type: 'true-false', question: 'Abstraction and encapsulation are the same concept.', correctAnswer: 'False', explanation: 'Abstraction hides complexity (design level). Encapsulation hides data (implementation level). Related but different.' },
        { id: 'qc-07-01-3', type: 'mcq', question: 'Which mechanism does Java use to implement abstraction?', options: ['Only classes', 'Abstract classes and interfaces', 'Only interfaces', 'Access modifiers'], correctAnswer: 'Abstract classes and interfaces', explanation: 'Java uses both abstract classes (partial implementation) and interfaces (pure contracts) to implement abstraction.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-07-01-1',
          scenario: 'You are designing a file storage system. Users need to upload, download, and delete files. The underlying implementation could be local disk, cloud storage, or network drive.',
          question: 'How does abstraction help?',
          type: 'design-decision',
          options: [
            'Define a FileStorage interface with upload(), download(), delete(). Each backend implements it. Users call simple methods without knowing the storage type',
            'Create separate classes: LocalDiskStorage, CloudStorage, NetworkStorage with different method names',
            'Use if-else to check storage type in each method',
            'Write all logic in one class with flags for each storage type',
          ],
          correctAnswer: 'Define a FileStorage interface with upload(), download(), delete(). Each backend implements it. Users call simple methods without knowing the storage type',
          explanation: 'Abstraction hides the storage complexity behind a simple interface. Users call upload() without knowing if it is local, cloud, or network. The implementation can change without affecting the user code.',
          relatedConcepts: ['abstraction', 'interface', 'complexity-hiding'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-abstraction-intro',
      prerequisites: ['lesson-01-03', 'lesson-06-01'],
      xpReward: 50,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'abstraction-concept',
      difficulty: 'easy',
      estimatedMinutes: 15,
    },
    {
      id: 'lesson-07-02',
      moduleId: 'module-07',
      title: 'Abstract Classes',
      slug: 'abstract-classes',
      order: 2,
      duration: 18,
      description: 'Learn how abstract classes provide partial implementation — combining abstract methods with concrete methods in a single class.',
      learningObjectives: [
        { id: 'lo-07-02-1', description: 'Declare classes using the abstract keyword', completed: false },
        { id: 'lo-07-02-2', description: 'Understand what abstract classes can and cannot do', completed: false },
        { id: 'lo-07-02-3', description: 'Explain the rules governing abstract classes', completed: false },
        { id: 'lo-07-02-4', description: 'Create class hierarchies using abstract classes', completed: false },
      ],
      englishExplanation: {
        id: 'ee-07-02',
        text: `An abstract class is a class declared with the abstract keyword that cannot be instantiated directly. It serves as a blueprint for other classes, providing both abstract methods (without body) and concrete methods (with body). Abstract classes allow you to define common behavior in one place while forcing subclasses to provide specific implementations.

An abstract class is declared using the abstract modifier: abstract class Shape { }. You cannot create an object of an abstract class: Shape s = new Shape(); causes a compilation error. However, you can create references of the abstract type: Shape s = new Circle(); — this is polymorphism.

Abstract classes can contain both abstract and concrete methods. Abstract methods have no body — they are declared with a semicolon: abstract void draw();. Concrete methods have a full implementation: void printInfo() { System.out.println("Shape"); }. This mix of abstract and concrete is the key advantage over interfaces.

Rules for abstract classes:
1. Cannot be instantiated directly (no new AbstractClass())
2. Can have constructors (called via super() from child classes)
3. Can have instance variables (fields)
4. Can have both abstract and concrete methods
5. A class must be abstract if it contains any abstract method
6. A subclass must implement ALL abstract methods or be declared abstract itself
7. An abstract class can extend another abstract or concrete class

Abstract classes establish a template for subclasses. The abstract methods define the contract (what must be implemented), while concrete methods provide shared functionality that all subclasses inherit. This is the Template Method design pattern foundation.

Abstract classes are ideal when you have a group of related classes that share common state (fields) and behavior (concrete methods) but need different implementations for some operations. They provide more structure than interfaces because they can hold state.`
      },
      romanUrduExplanation: {
        id: 'ru-07-02',
        text: `Abstract class ek class hai jo abstract keyword se declare hoti hai aur directly instantiate nahi ho sakti. Ye doosron ke liye blueprint ka kaam karti hai, abstract methods (bina body ke) aur concrete methods (body ke saath) dono provide karti hai. Abstract classes aapko common behavior ek jagah define karne deti hain jabke subclasses ko specific implementations dene par majboor karti hain.

Abstract class abstract modifier se declare hoti hai: abstract class Shape { }. Aap abstract class ka object nahi bana sakte: Shape s = new Shape(); compilation error deta hai. Lekin aap abstract type ka reference bana sakte hain: Shape s = new Circle(); — ye polymorphism hai.

Abstract classes abstract aur concrete methods dono contain kar sakti hain. Abstract methods ka koi body nahi hota — sirf semicolon ke saath declare hote hain: abstract void draw();. Concrete methods ka full implementation hota hai: void printInfo() { System.out.println("Shape"); }. Abstract aur concrete ka ye mix interfaces se key advantage hai.

Abstract classes ke rules:
1. Directly instantiate nahi ho sakte (koi new AbstractClass() nahi)
2. Constructors ho sakte hain (child classes se super() ke through call hote hain)
3. Instance variables (fields) ho sakte hain
4. Abstract aur concrete methods dono ho sakte hain
5. Agar class mein koi bhi abstract method ho, toh class abstract honi chahiye
6. Subclass ko SARE abstract methods implement karne hain ya khud abstract hona chahiye
7. Abstract class doosri abstract ya concrete class extend kar sakti hai

Abstract classes subclasses ke liye template establish karte hain. Abstract methods contract define karte hain (kya implement hona chahiye), jabke concrete methods shared functionality provide karte hain jo sab subclasses inherit karte hain. Ye Template Method design pattern ka foundation hai.

Abstract classes tab ideal hain jab aapke paas related classes ka group ho jo common state (fields) aur behavior (concrete methods) share kare lekin kuch operations ke liye different implementations chahiye. Ye interfaces se zyada structure provide karte hain kyunki ye state hold kar sakte hain.`
      },
      keyPoints: [
        { id: 'kp-07-02-1', title: 'Cannot Instantiate', description: 'Abstract classes cannot be created with new. They can only be extended by concrete subclasses.' },
        { id: 'kp-07-02-2', title: 'Mixed Methods', description: 'Abstract classes can contain both abstract methods (no body) and concrete methods (with body).' },
        { id: 'kp-07-02-3', title: 'Constructors Allowed', description: 'Abstract classes can have constructors that are called via super() when child classes are instantiated.' },
        { id: 'kp-07-02-4', title: 'Enforced Implementation', description: 'Subclasses must implement ALL abstract methods, or they must also be declared abstract.' },
      ],
      codeExamples: [
        {
          id: 'ce-07-02-1',
          title: 'Abstract Class with Mixed Methods',
          code: `abstract class Shape {
    String color;

    // Constructor — called via super() from child
    Shape(String color) {
        this.color = color;
    }

    // Abstract methods — no body, child must implement
    abstract double area();
    abstract double perimeter();
    abstract void draw();

    // Concrete methods — shared by all subclasses
    void displayColor() {
        System.out.println("Color: " + color);
    }

    String getInfo() {
        return "Shape [color=" + color + ", area=" + area() + "]";
    }
}

class Circle extends Shape {
    double radius;

    Circle(String color, double radius) {
        super(color);  // calls Shape constructor
        this.radius = radius;
    }

    @Override
    double area() { return Math.PI * radius * radius; }

    @Override
    double perimeter() { return 2 * Math.PI * radius; }

    @Override
    void draw() { System.out.println("Drawing circle with radius " + radius); }
}

class Rectangle extends Shape {
    double width, height;

    Rectangle(String color, double w, double h) {
        super(color);
        this.width = w;
        this.height = h;
    }

    @Override
    double area() { return width * height; }

    @Override
    double perimeter() { return 2 * (width + height); }

    @Override
    void draw() { System.out.println("Drawing rectangle " + width + "x" + height); }
}

public class Main {
    public static void main(String[] args) {
        Shape c = new Circle("Red", 5.0);
        Shape r = new Rectangle("Blue", 4.0, 6.0);

        c.draw();
        c.displayColor();
        System.out.println(c.getInfo());

        r.draw();
        r.displayColor();
        System.out.println(r.getInfo());
    }
}`,
          language: 'java',
          output: `Drawing circle with radius 5.0
Color: Red
Shape [color=Red, area=78.53981633974483]
Drawing rectangle 4.0x6.0
Color: Blue
Shape [color=Blue, area=24.0]`,
          explanation: 'Shape is abstract with abstract methods (area, perimeter, draw) and concrete methods (displayColor, getInfo). Circle and Rectangle implement all abstract methods. The concrete methods are inherited by both.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-07-02-1',
          title: 'Vehicle Hierarchy',
          scenario: 'A vehicle system has Cars, Trucks, and Motorcycles. All share common attributes (make, model, year) and methods (start, stop, getSpeed), but differ in fuel efficiency calculation and passenger capacity.',
          oopConcept: 'Vehicle is an abstract class with concrete start()/stop() and abstract calculateFuelEfficiency()/getCapacity(). Each vehicle type implements the abstract methods differently while inheriting common behavior.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-07-02-1',
          title: 'Trying to Instantiate an Abstract Class',
          incorrectCode: `abstract class Animal {
    abstract void speak();
}

// ERROR: Cannot instantiate abstract class
Animal a = new Animal();  // Compilation error!`,
          correctCode: `abstract class Animal {
    abstract void speak();
}

class Dog extends Animal {
    @Override
    void speak() { System.out.println("Woof!"); }
}

// OK: instantiate concrete subclass
Animal a = new Dog();  // Polymorphism: parent reference, child object
a.speak();  // Woof!`,
          explanation: 'Abstract classes cannot be instantiated directly. You must create a concrete subclass and instantiate that. The abstract type can be used as a reference type.',
        },
      ],
      examNotes: [
        { id: 'en-07-02-1', title: 'Abstract Class Rules', content: 'Cannot instantiate. Can have constructors, fields, and both abstract and concrete methods. Subclasses must implement all abstract methods.', importance: 'high' },
        { id: 'en-07-02-2', title: 'Abstract vs Concrete', content: 'Abstract methods have no body (semicolon only). Concrete methods have a full implementation. Abstract classes can have both.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-07-02-1', question: 'Can an abstract class have a constructor?', answer: 'Yes. Abstract classes can have constructors that are called via super() when a subclass is instantiated. The constructor initializes fields defined in the abstract class.', difficulty: 'medium' },
        { id: 'vq-07-02-2', question: 'What happens if a subclass does not implement all abstract methods?', answer: 'The subclass must also be declared abstract. Only a concrete class (implementing all abstract methods) can be instantiated.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-07-02-1', type: 'mcq', question: 'Can you create an object of an abstract class?', options: ['Yes', 'No, only through subclasses', 'Only if it has no abstract methods', 'Only with the new keyword'], correctAnswer: 'No, only through subclasses', explanation: 'Abstract classes cannot be instantiated directly. Objects are created from concrete subclasses that extend the abstract class.' },
        { id: 'qc-07-02-2', type: 'true-false', question: 'An abstract class can contain concrete methods.', correctAnswer: 'True', explanation: 'Abstract classes can have both abstract (no body) and concrete (with body) methods. This is a key advantage over interfaces.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-07-02-1',
          scenario: 'You have a hierarchy of Notification types: Email, SMS, Push. All share common logic (logging, rate limiting) but differ in how they send the message.',
          question: 'How does an abstract class help?',
          type: 'design-decision',
          options: [
            'Notification abstract class with concrete log() and rateLimit() methods, and abstract sendMessage() that each type implements',
            'An interface with all abstract methods — no shared logic possible',
            'One concrete Notification class with if-else for each type',
            'Separate unrelated classes for each notification type',
          ],
          correctAnswer: 'Notification abstract class with concrete log() and rateLimit() methods, and abstract sendMessage() that each type implements',
          explanation: 'Abstract classes let you put shared logic (logging, rate limiting) in concrete methods while forcing subclasses to implement their specific sending mechanism.',
          relatedConcepts: ['abstract-class', 'template-method', 'code-reuse'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-abstract-class',
      prerequisites: ['lesson-07-01'],
      xpReward: 60,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'abstract-class',
      difficulty: 'medium',
      estimatedMinutes: 18,
    },
    {
      id: 'lesson-07-03',
      moduleId: 'module-07',
      title: 'Abstract Methods',
      slug: 'abstract-methods',
      order: 3,
      duration: 15,
      description: 'Understand abstract method declaration, how they enforce subclass implementation, and their role in defining contracts.',
      learningObjectives: [
        { id: 'lo-07-03-1', description: 'Declare abstract methods correctly', completed: false },
        { id: 'lo-07-03-2', description: 'Understand how abstract methods enforce implementation', completed: false },
        { id: 'lo-07-03-3', description: 'Identify when abstract methods are appropriate', completed: false },
        { id: 'lo-07-03-4', description: 'Understand the relationship between abstract methods and contracts', completed: false },
      ],
      englishExplanation: {
        id: 'ee-07-03',
        text: `An abstract method is a method declared without a body (implementation) in an abstract class. It ends with a semicolon instead of curly braces: abstract void draw();. Abstract methods define a contract — they specify WHAT must be done but leave HOW to the implementing subclass.

When an abstract class declares an abstract method, every concrete subclass MUST provide an implementation. The compiler enforces this rule. If a subclass fails to implement any abstract method, it must itself be declared abstract. This is how abstraction enforces contracts at compile time.

Abstract methods can only exist in abstract classes. If you declare a method as abstract in a regular class, the compiler will require the class itself to be abstract. This is a logical consistency rule: if a class has unimplemented methods, it cannot be instantiated.

The signature of an abstract method is important. It specifies the access modifier, return type, method name, and parameters. Subclasses must match this signature exactly (with covariant return types allowed). The @Override annotation should be used to verify the match.

Abstract methods are the primary mechanism for defining contracts in OOP. A contract says: "Any class that extends this abstract class MUST provide these operations." This is how frameworks define extensibility points — they declare abstract methods that plugin developers must implement.

Abstract methods differ from interface methods in that they exist within a class context. An abstract class can combine abstract methods with fields, constructors, and concrete methods. This gives abstract methods more context — they operate on the state defined by the abstract class.`
      },
      romanUrduExplanation: {
        id: 'ru-07-03',
        text: `Abstract method ek method hai jo abstract class mein bina body (implementation) ke declare hota hai. Ye curly braces ki bajaye semicolon pe khatam hota hai: abstract void draw();. Abstract methods ek contract define karte hain — ye specify karte hain KYA hona chahiye lekin HOW implement karna hai wo subclass par chhodte hain.

Jab abstract class abstract method declare karti hai, toh har concrete subclass ko implementation dena HI padta hai. Compiler ye rule enforce karta hai. Agar subclass koi abstract method implement nahi karta, toh usko khud abstract declare karna padta hai. Is tarah abstraction compile time par contracts enforce karta hai.

Abstract methods sirf abstract classes mein ho sakte hain. Agar aap regular class mein method ko abstract declare karein, toh compiler require karega ke class khud bhi abstract ho. Ye logical consistency rule hai: agar class mein unimplemented methods hon, toh usse instantiate nahi kiya ja sakta.

Abstract method ka signature important hai. Ye access modifier, return type, method name aur parameters specify karta hai. Subclasses ko exactly match karna padta hai (covariant return types allowed hain). @Override annotation match verify karne ke liye use hona chahiye.

Abstract methods OOP mein contracts define karne ka primary mechanism hain. Contract ye kehta hai: "Jo bhi class is abstract class ko extend kare, usko ye operations provide karne hain padenge." Is tarah frameworks extensibility points define karte hain — ye abstract methods declare karte hain jo plugin developers ko implement karna padta hai.

Abstract methods interface methods se alag hain kyunki ye class context mein exist karte hain. Abstract class abstract methods ko fields, constructors aur concrete methods ke saath combine kar sakti hai. Isse abstract methods ko zyada milta hai — ye abstract class dwara define ki gayi state par operate karte hain.`
      },
      keyPoints: [
        { id: 'kp-07-03-1', title: 'No Body', description: 'Abstract methods are declared without a body, ending with a semicolon. The implementation is left to subclasses.' },
        { id: 'kp-07-03-2', title: 'Enforced Implementation', description: 'The compiler requires all abstract methods to be implemented in concrete subclasses. Failure makes the subclass abstract too.' },
        { id: 'kp-07-03-3', title: 'Defines Contracts', description: 'Abstract methods define what operations any subclass must provide. This is the contract enforcement mechanism in OOP.' },
        { id: 'kp-07-03-4', title: 'Abstract Class Only', description: 'Abstract methods can only exist in abstract classes. A regular class with an abstract method must itself be abstract.' },
      ],
      codeExamples: [
        {
          id: 'ce-07-03-1',
          title: 'Abstract Methods as Contracts',
          code: `abstract class Database {
    // Abstract methods — contract: every database MUST implement these
    abstract void connect();
    abstract void disconnect();
    abstract void executeQuery(String query);

    // Concrete methods — shared behavior
    void log(String message) {
        System.out.println("[LOG] " + message);
    }
}

class MySQLDatabase extends Database {
    @Override
    void connect() {
        log("Connecting to MySQL on port 3306...");
        // MySQL-specific connection logic
    }

    @Override
    void disconnect() {
        log("Disconnecting from MySQL");
    }

    @Override
    void executeQuery(String query) {
        log("Executing MySQL query: " + query);
        // MySQL-specific query execution
    }
}

class PostgreSQLDatabase extends Database {
    @Override
    void connect() {
        log("Connecting to PostgreSQL on port 5432...");
        // PostgreSQL-specific connection logic
    }

    @Override
    void disconnect() {
        log("Disconnecting from PostgreSQL");
    }

    @Override
    void executeQuery(String query) {
        log("Executing PostgreSQL query: " + query);
        // PostgreSQL-specific query execution
    }
}

public class Main {
    public static void main(String[] args) {
        Database db1 = new MySQLDatabase();
        Database db2 = new PostgreSQLDatabase();

        db1.connect();
        db1.executeQuery("SELECT * FROM users");
        db1.disconnect();

        db2.connect();
        db2.executeQuery("SELECT * FROM users");
        db2.disconnect();
    }
}`,
          language: 'java',
          output: `[LOG] Connecting to MySQL on port 3306...
[LOG] Executing MySQL query: SELECT * FROM users
[LOG] Disconnecting from MySQL
[LOG] Connecting to PostgreSQL on port 5432...
[LOG] Executing PostgreSQL query: SELECT * FROM users
[LOG] Disconnecting from PostgreSQL`,
          explanation: 'The abstract Database class defines the contract: connect(), disconnect(), executeQuery(). Each database implementation provides its own version. The abstract methods enforce that no database can be used without these operations.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-07-03-1',
          title: 'Plugin Architecture',
          scenario: 'A text editor defines an abstract EditorPlugin class with abstract activate(), deactivate(), and getName(). Plugin developers must implement all three.',
          oopConcept: 'The abstract methods form a contract: any plugin must be activatable, deactivatable, and identifiable. The editor framework relies on these methods without knowing the plugin implementation.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-07-03-1',
          title: 'Declaring Abstract Method in Non-Abstract Class',
          incorrectCode: `class Shape {
    abstract void draw();  // ERROR: normal class cannot have abstract methods
}`,
          correctCode: `abstract class Shape {
    abstract void draw();  // OK: abstract class can have abstract methods
}
// If a class has any abstract method, the class MUST be abstract`,
          explanation: 'Abstract methods can only exist in abstract classes. If a class has even one abstract method, the class itself must be declared abstract.',
        },
      ],
      examNotes: [
        { id: 'en-07-03-1', title: 'Abstract Method Rules', content: 'Declared with abstract keyword and semicolon (no body). Must be implemented by concrete subclasses. Can only exist in abstract classes.', importance: 'high' },
        { id: 'en-07-03-2', title: 'Contract Enforcement', content: 'Abstract methods define contracts. The compiler enforces that all abstract methods are implemented. This prevents incomplete implementations.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-07-03-1', question: 'What is an abstract method?', answer: 'An abstract method is a method declared without a body in an abstract class. It specifies WHAT must be done but leaves HOW to the implementing subclass.', difficulty: 'easy' },
        { id: 'vq-07-03-2', question: 'What happens if a concrete class does not implement all abstract methods?', answer: 'The compiler generates an error. The class must either implement all abstract methods or be declared abstract itself.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-07-03-1', type: 'mcq', question: 'Abstract methods end with:', options: ['Curly braces { }', 'A semicolon ;', 'The return statement', 'null'], correctAnswer: 'A semicolon ;', explanation: 'Abstract methods have no body. They end with a semicolon: abstract void draw();' },
        { id: 'qc-07-03-2', type: 'true-false', question: 'A regular (non-abstract) class can have abstract methods.', correctAnswer: 'False', explanation: 'Abstract methods can only exist in abstract classes. A regular class with an abstract method causes a compilation error.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-07-03-1',
          scenario: 'You are designing a game framework. Different games (Chess, Football, Tennis) share common operations (start, pause, end) but implement them differently.',
          question: 'How do abstract methods help?',
          type: 'design-decision',
          options: [
            'Define abstract methods start(), pause(), end() in a Game class. Each game implements them. The framework calls these methods polymorphically',
            'Create separate classes with different method names for each game',
            'Use interfaces only — abstract classes are unnecessary',
            'Write one giant Game class with if-else for each game type',
          ],
          correctAnswer: 'Define abstract methods start(), pause(), end() in a Game class. Each game implements them. The framework calls these methods polymorphically',
          explanation: 'Abstract methods define the contract: every game must be startable, pausable, and endable. The framework works with Game references, and each game provides its own implementation.',
          relatedConcepts: ['abstract-methods', 'contract', 'polymorphism'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-abstract-method',
      prerequisites: ['lesson-07-02'],
      xpReward: 50,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'abstract-method',
      difficulty: 'medium',
      estimatedMinutes: 15,
    },
    {
      id: 'lesson-07-04',
      moduleId: 'module-07',
      title: 'When to Use Abstract Classes',
      slug: 'when-to-use-abstract-classes',
      order: 4,
      duration: 15,
      description: 'Learn when abstract classes are the right design choice — template method pattern, partial abstraction, and shared state scenarios.',
      learningObjectives: [
        { id: 'lo-07-04-1', description: 'Identify scenarios where abstract classes are preferred', completed: false },
        { id: 'lo-07-04-2', description: 'Apply the Template Method pattern using abstract classes', completed: false },
        { id: 'lo-07-04-3', description: 'Decide between abstract class and other design options', completed: false },
      ],
      englishExplanation: {
        id: 'ee-07-04',
        text: `Abstract classes are the right choice when you need to share state (fields) and partial behavior (concrete methods) among related classes while forcing specific implementations for some operations. They are particularly valuable in three scenarios.

**Scenario 1: Template Method Pattern.** An abstract class defines the overall algorithm structure in a concrete method, while abstract methods define the variable steps. The concrete method calls the abstract methods at specific points. Subclasses implement the abstract steps while inheriting the overall flow. This is one of the most common uses of abstract classes.

For example, a DataProcessor abstract class might have a concrete process() method that calls abstract validate(), transform(), and save() methods. Each subclass implements these steps differently, but the overall processing flow remains the same.

**Scenario 2: Shared State with Partial Abstraction.** When related classes need to share fields (like common attributes) and some shared behavior (concrete methods), an abstract class is ideal. Interfaces cannot hold instance state. Abstract classes can have fields that all subclasses inherit and use.

For example, a GameEntity abstract class with fields like x, y, health and concrete methods like takeDamage(), isAlive() while abstract methods like render() and update() are implemented differently by each entity type.

**Scenario 3: Controlled Extension Points.** Abstract classes let you expose some methods as extension points (abstract) while keeping others sealed (concrete, possibly final). This gives you fine-grained control over what subclasses can and cannot change.

**When NOT to Use Abstract Classes:**
- When classes are unrelated (use interfaces)
- When you need multiple inheritance (use interfaces)
- When you want to define a pure contract without any state (use interfaces)
- When the hierarchy is deep and abstract classes add unnecessary layers

The key decision factor is: do you need shared state and partial implementation? If yes, abstract classes. If you need only a contract, interfaces are simpler.`
      },
      romanUrduExplanation: {
        id: 'ru-07-04',
        text: `Abstract classes tab sahi choice hain jab aapko related classes mein state (fields) aur partial behavior (concrete methods) share karni ho jabke kuch operations ke liye specific implementations enforce karni ho. Ye particularly teen scenarios mein valuable hain.

**Scenario 1: Template Method Pattern.** Abstract class ek concrete method mein overall algorithm structure define karti hai, jabke abstract methods variable steps define karte hain. Concrete method specific points par abstract methods call karta hai. Subclasses abstract steps implement karte hain jabke overall flow inherit hota hai. Ye abstract classes ka sabse common use hai.

Jaise, DataProcessor abstract class mein ek concrete process() method ho sakta hai jo validate(), transform() aur save() abstract methods call kare. Har subclass in steps ko differently implement karta hai, lekin overall processing flow same rehta hai.

**Scenario 2: Shared State with Partial Abstraction.** Jab related classes ko fields (common attributes) aur kuch shared behavior (concrete methods) share karni ho, toh abstract class ideal hai. Interfaces instance state hold nahi kar sakte. Abstract classes mein fields ho sakte hain jo sab subclasses inherit aur use karte hain.

Jaise, GameEntity abstract class mein x, y, health fields aur takeDamage(), isAlive() concrete methods hon, jabke render() aur update() abstract methods har entity type differently implement kare.

**Scenario 3: Controlled Extension Points.** Abstract classes aapko kuch methods ko extension points (abstract) aur doosron ko sealed (concrete, possibly final) dikhane dete hain. Isse aapko fine-grained control milta hai ke subclasses kya change kar sakte hain aur kya nahi.

**Kab Abstract Classes Use NA Karein:**
- Jab classes unrelated hon (interfaces use karein)
- Jab aapko multiple inheritance chahiye (interfaces use karein)
- Jab aap sirf contract chahte hain bina state ke (interfaces use karein)
- Jab hierarchy deep ho aur abstract classes unnecessary layers add karein

Key decision factor hai: kya aapko shared state aur partial implementation chahiye? Agar haan, toh abstract classes. Agar sirf contract chahiye, toh interfaces simpler hain.`
      },
      keyPoints: [
        { id: 'kp-07-04-1', title: 'Template Method Pattern', description: 'Abstract classes define overall algorithm in concrete methods, with abstract methods for variable steps subclasses implement.' },
        { id: 'kp-07-04-2', title: 'Shared State', description: 'Abstract classes can hold fields that all subclasses inherit. Interfaces cannot hold instance state.' },
        { id: 'kp-07-04-3', title: 'Controlled Extension', description: 'Abstract classes let you expose some methods as overridable (abstract) while keeping others fixed (concrete/final).' },
        { id: 'kp-07-04-4', title: 'Decision Rule', description: 'Need shared state + partial implementation? Use abstract classes. Need only a contract? Use interfaces.' },
      ],
      codeExamples: [
        {
          id: 'ce-07-04-1',
          title: 'Template Method Pattern',
          code: `abstract class DataProcessor {
    // Template method — defines the overall algorithm
    final void process() {
        readData();
        validate();
        transform();
        save();
        System.out.println("--- Processing complete ---");
    }

    // Concrete methods — shared behavior
    void readData() {
        System.out.println("Reading data from source...");
    }

    // Abstract methods — subclasses implement these steps
    abstract void validate();
    abstract void transform();
    abstract void save();
}

class UserDataProcessor extends DataProcessor {
    @Override
    void validate() {
        System.out.println("Validating user data: name, email, age");
    }

    @Override
    void transform() {
        System.out.println("Normalizing user data: trimming, lowercasing");
    }

    @Override
    void save() {
        System.out.println("Saving user data to database");
    }
}

class ProductDataProcessor extends DataProcessor {
    @Override
    void validate() {
        System.out.println("Validating product: price > 0, name not empty");
    }

    @Override
    void transform() {
        System.out.println("Applying tax calculations and currency conversion");
    }

    @Override
    void save() {
        System.out.println("Saving product data to catalog");
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("=== User Processing ===");
        DataProcessor userProc = new UserDataProcessor();
        userProc.process();

        System.out.println("\\n=== Product Processing ===");
        DataProcessor prodProc = new ProductDataProcessor();
        prodProc.process();
    }
}`,
          language: 'java',
          output: `=== User Processing ===
Reading data from source...
Validating user data: name, email, age
Normalizing user data: trimming, lowercasing
Saving user data to database
--- Processing complete ---

=== Product Processing ===
Reading data from source...
Validating product: price > 0, name not empty
Applying tax calculations and currency conversion
Saving product data to catalog
--- Processing complete ---`,
          explanation: 'The Template Method pattern: process() defines the algorithm flow. readData() is shared. validate(), transform(), save() are abstract — each processor implements them differently. The overall flow stays the same.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-07-04-1',
          title: 'Game Engine Entity System',
          scenario: 'A game engine has entities (Player, Enemy, NPC) that share position, health, and collision detection but differ in AI behavior and rendering.',
          oopConcept: 'GameEntity abstract class provides concrete takeDamage(), move(), isAlive() while declaring abstract render(), updateAI(), and onCollision(). The engine calls concrete methods directly and polymorphic abstract methods for type-specific behavior.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-07-04-1',
          title: 'Using Abstract Class When Interface Is Better',
          incorrectCode: `// Unrelated classes forced into abstract class hierarchy
abstract class Printable {
    abstract void print();
}

class Report extends Printable { ... }
class Photo extends Printable { ... }
class LogFile extends Printable { ... }
// Report, Photo, LogFile have nothing else in common
// Interface would be cleaner`,
          correctCode: `// Use interface for unrelated classes
interface Printable {
    void print();
}

class Report implements Printable { ... }
class Photo implements Printable { ... }
class LogFile implements Printable { ... }
// Interface: pure contract, no forced hierarchy
// Use abstract class when classes share state AND behavior`,
          explanation: 'Abstract classes are for related classes that share state and behavior. Unrelated classes that share only a method signature should use interfaces instead.',
        },
      ],
      examNotes: [
        { id: 'en-07-04-1', title: 'Template Method', content: 'The Template Method pattern uses a concrete method to define the algorithm and abstract methods for variable steps. The concrete method is marked final to prevent overriding.', importance: 'high' },
        { id: 'en-07-04-2', title: 'Decision Criteria', content: 'Use abstract classes when you need shared fields + partial implementation. Use interfaces for pure contracts or when multiple inheritance is needed.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-07-04-1', question: 'What is the Template Method pattern?', answer: 'A design pattern where an abstract class defines the overall algorithm in a concrete method, with abstract methods for steps that subclasses implement. The flow is fixed; the steps vary.', difficulty: 'medium' },
        { id: 'vq-07-04-2', question: 'When should you prefer an abstract class over an interface?', answer: 'When related classes need to share fields (state) and partial implementation (concrete methods). Interfaces cannot hold instance state.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-07-04-1', type: 'mcq', question: 'The Template Method pattern uses:', options: ['Only abstract methods', 'A concrete method that calls abstract methods at specific points', 'Only concrete methods', 'Static methods'], correctAnswer: 'A concrete method that calls abstract methods at specific points', explanation: 'The concrete method defines the algorithm flow and calls abstract methods for variable steps that subclasses implement.' },
        { id: 'qc-07-04-2', type: 'true-false', question: 'Abstract classes should be used when classes are completely unrelated.', correctAnswer: 'False', explanation: 'Unrelated classes should use interfaces. Abstract classes are for related classes that share state and partial behavior.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-07-04-1',
          scenario: 'You have a file conversion system. All converters read a file, process it, and write the output. The processing step differs for PDF-to-Word, ImageResizer, and AudioConverter.',
          question: 'Which pattern should you apply?',
          type: 'design-decision',
          options: [
            'Template Method: abstract class with concrete read()/write() and abstract process()',
            'Interface with three methods: read(), process(), write()',
            'One class with three methods and if-else for each converter type',
            'Three separate classes with no common structure',
          ],
          correctAnswer: 'Template Method: abstract class with concrete read()/write() and abstract process()',
          explanation: 'The Template Method pattern is ideal here. read() and write() are shared (concrete). process() varies per converter (abstract). The overall algorithm is fixed; only the processing step changes.',
          relatedConcepts: ['template-method', 'abstract-class', 'code-reuse'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-template-method',
      prerequisites: ['lesson-07-02', 'lesson-07-03'],
      xpReward: 50,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'template-method',
      difficulty: 'medium',
      estimatedMinutes: 15,
    },
    {
      id: 'lesson-07-05',
      moduleId: 'module-07',
      title: 'Interface vs Abstract Class',
      slug: 'interface-vs-abstract-class',
      order: 5,
      duration: 20,
      description: 'Comprehensive comparison between interfaces and abstract classes — when to use each, their capabilities, and design trade-offs.',
      learningObjectives: [
        { id: 'lo-07-05-1', description: 'Compare interfaces and abstract classes across all dimensions', completed: false },
        { id: 'lo-07-05-2', description: 'Know when to choose interface vs abstract class', completed: false },
        { id: 'lo-07-05-3', description: 'Understand multiple inheritance implications', completed: false },
        { id: 'lo-07-05-4', description: 'Apply both in a single design effectively', completed: false },
      ],
      englishExplanation: {
        id: 'ee-07-05',
        text: `Interfaces and abstract classes both support abstraction, but they differ in capabilities, design intent, and usage patterns. Understanding when to use each is a critical design skill.

**Interface:**
- Defines a pure contract: abstract methods only (before Java 8)
- Cannot hold instance fields (only public static final constants)
- Cannot have constructors
- A class can implement multiple interfaces (multiple inheritance of type)
- Methods are public by default
- Since Java 8: can have default methods and static methods
- Since Java 9: can have private methods
- Represents an IS-CAPABLE-OF relationship (e.g., Comparable, Serializable)

**Abstract Class:**
- Provides partial implementation: abstract + concrete methods
- Can hold instance fields (state)
- Can have constructors
- A class can extend only one abstract class (single inheritance)
- Can have any access modifier
- Represents an IS-A relationship (e.g., Animal, Vehicle)

**When to Use Interface:**
- Unrelated classes need to share a capability (Comparable, Cloneable)
- You need multiple inheritance of type
- You want to define a pure contract
- You are designing API boundaries

**When to Use Abstract Class:**
- Related classes share state and partial behavior
- You need to enforce a template method pattern
- You want to provide common implementation for some methods
- You need constructors or instance fields

**Can Use Both Together:** A class can extend an abstract class AND implement interfaces. This is common in practice — the abstract class provides the IS-A hierarchy with shared state, while interfaces define additional capabilities.`
      },
      romanUrduExplanation: {
        id: 'ru-07-05',
        text: `Interfaces aur abstract classes dono abstraction support karte hain, lekin capabilities, design intent aur usage patterns mein different hain. Kab kya use karna hai ye critical design skill hai.

**Interface:**
- Pure contract define karta hai: sirf abstract methods (Java 8 se pehle)
- Instance fields hold nahi kar sakta (sirf public static final constants)
- Constructors nahi ho sakte
- Class multiple interfaces implement kar sakti hai (multiple inheritance of type)
- Methods default mein public hote hain
- Java 8 se: default methods aur static methods ho sakti hain
- Java 9 se: private methods ho sakti hain
- IS-CAPABLE-OF relationship represent karta hai (jaise Comparable, Serializable)

**Abstract Class:**
- Partial implementation provide karta hai: abstract + concrete methods
- Instance fields (state) hold kar sakta hai
- Constructors ho sakte hain
- Class sirf ek abstract class extend kar sakti hai (single inheritance)
- Koi bhi access modifier ho sakta hai
- IS-A relationship represent karta hai (jaise Animal, Vehicle)

**Kab Interface Use Karein:**
- Unrelated classes ko capability share karni ho (Comparable, Cloneable)
- Aapko multiple inheritance of type chahiye
- Aap pure contract define karna chahte hain
- Aap API boundaries design kar rahe hain

**Kab Abstract Class Use Karein:**
- Related classes state aur partial behavior share karein
- Aapko template method pattern enforce karna ho
- Aap kuch methods ke liye common implementation provide karna chahte hain
- Aapko constructors ya instance fields chahiye

**Dono Saath Use Kar Sakte Hain:** Ek class ek abstract class extend kar sakta hai AUR interfaces implement kar sakta hai. Ye practice mein common hai — abstract class IS-A hierarchy provide karta hai shared state ke saath, jabke interfaces additional capabilities define karte hain.`
      },
      keyPoints: [
        { id: 'kp-07-05-1', title: 'Interface = Contract', description: 'Interfaces define pure contracts (IS-CAPABLE-OF). Cannot hold instance state. Multiple implementation allowed.' },
        { id: 'kp-07-05-2', title: 'Abstract Class = Partial Implementation', description: 'Abstract classes provide partial implementation (IS-A). Can hold state, constructors, and concrete methods. Single inheritance only.' },
        { id: 'kp-07-05-3', title: 'Multiple Inheritance', description: 'Interfaces enable multiple inheritance of type. Abstract classes allow only single class inheritance.' },
        { id: 'kp-07-05-4', title: 'Use Together', description: 'A class can extend one abstract class and implement multiple interfaces. This combines shared state (abstract class) with capabilities (interfaces).' },
      ],
      codeExamples: [
        {
          id: 'ce-07-05-1',
          title: 'Interface and Abstract Class Together',
          code: `// INTERFACE — pure contract
interface Drawable {
    void draw();
    default void drawWithColor(String color) {
        System.out.println("Drawing with color: " + color);
    }
}

interface Resizable {
    void resize(double factor);
}

// ABSTRACT CLASS — shared state + partial implementation
abstract class Shape {
    protected String name;
    protected double x, y;

    Shape(String name, double x, double y) {
        this.name = name;
        this.x = x;
        this.y = y;
    }

    void displayPosition() {
        System.out.println(name + " at (" + x + ", " + y + ")");
    }

    abstract double area();
}

// CONCRETE CLASS — extends abstract class AND implements interfaces
class Circle extends Shape implements Drawable, Resizable {
    double radius;

    Circle(double x, double y, double radius) {
        super("Circle", x, y);
        this.radius = radius;
    }

    @Override
    public void draw() {
        System.out.println("Drawing circle at (" + x + ", " + y + ") with radius " + radius);
    }

    @Override
    public void resize(double factor) {
        radius *= factor;
        System.out.println("Resized circle to radius " + radius);
    }

    @Override
    double area() {
        return Math.PI * radius * radius;
    }
}

public class Main {
    public static void main(String[] args) {
        Circle c = new Circle(10, 20, 5.0);
        c.displayPosition();  // from abstract class
        c.draw();             // from Drawable interface
        c.resize(2.0);        // from Resizable interface
        System.out.println("Area: " + c.area());  // from abstract class
    }
}`,
          language: 'java',
          output: `Circle at (10.0, 20.0)
Drawing circle at (10.0, 20.0) with radius 5.0
Resized circle to radius 10.0
Area: 314.1592653589793`,
          explanation: 'Circle extends Shape (abstract class for shared state) and implements Drawable and Resizable (interfaces for capabilities). This combines the benefits of both mechanisms.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-07-05-1',
          title: 'Java Collections Framework',
          scenario: 'The Java Collections Framework uses both: ArrayList extends AbstractList (abstract class with shared implementation) and implements List, Serializable, Cloneable (interfaces for capabilities).',
          oopConcept: 'AbstractList provides shared behavior (add, remove, size). List defines the contract. Serializable and Cloneable add capabilities. This layered design is the standard in Java libraries.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-07-05-1',
          title: 'Using Abstract Class When Interface Is More Appropriate',
          incorrectCode: `// Forced hierarchy for unrelated concepts
abstract class Swimmable {
    abstract void swim();
}
abstract class Flyable {
    abstract void fly();
}
// Duck extends Swimmable — but cannot extend Flyable too!
// Single inheritance limitation`,
          correctCode: `// Interfaces allow multiple capabilities
interface Swimmable {
    void swim();
}
interface Flyable {
    void fly();
}

class Duck implements Swimmable, Flyable {
    @Override public void swim() { System.out.println("Duck swims"); }
    @Override public void fly() { System.out.println("Duck flies"); }
}
// Duck can be both Swimmable AND Flyable`,
          explanation: 'Unrelated capabilities should be interfaces. Abstract classes are for IS-A hierarchies with shared state. Interfaces enable multiple inheritance of type.',
        },
      ],
      examNotes: [
        { id: 'en-07-05-1', title: 'Comparison Table', content: 'Interface: contract only, no state, multiple inheritance. Abstract class: partial implementation, has state, single inheritance. Know this table cold.', importance: 'high' },
        { id: 'en-07-05-2', title: 'Design Decision', content: 'IS-CAPABLE-OF → interface. IS-A → abstract class. Need shared fields → abstract class. Need multiple type inheritance → interface.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-07-05-1', question: 'What is the main difference between an interface and an abstract class?', answer: 'Interfaces define pure contracts (IS-CAPABLE-OF) with no state. Abstract classes provide partial implementation (IS-A) with shared state and concrete methods. Interfaces allow multiple inheritance; abstract classes allow only single inheritance.', difficulty: 'medium' },
        { id: 'vq-07-05-2', question: 'Can a class extend an abstract class and implement interfaces?', answer: 'Yes. A class can extend one abstract class and implement multiple interfaces. This combines shared state from the abstract class with capabilities from interfaces.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-07-05-1', type: 'mcq', question: 'Which allows multiple inheritance?', options: ['Abstract class', 'Interface', 'Both', 'Neither'], correctAnswer: 'Interface', explanation: 'A class can implement multiple interfaces but can only extend one class (abstract or concrete).' },
        { id: 'qc-07-05-2', type: 'mcq', question: 'Which can hold instance fields?', options: ['Interface', 'Abstract class', 'Both', 'Neither'], correctAnswer: 'Abstract class', explanation: 'Abstract classes can have instance fields (state). Interfaces can only have public static final constants.' },
        { id: 'qc-07-05-3', type: 'true-false', question: 'An interface can have constructors.', correctAnswer: 'False', explanation: 'Interfaces cannot have constructors. Abstract classes can. Objects are created from implementing classes, not interfaces.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-07-05-1',
          scenario: 'You are designing a system where Dog and Cat both IS-A Animal (share name, age, sound methods) and both are Pettable and Trainable (capabilities).',
          question: 'How do you combine abstract class and interface?',
          type: 'design-decision',
          options: [
            'Animal abstract class (shared state) + Pettable and Trainable interfaces (capabilities). Dog extends Animal implements Pettable, Trainable',
            'Only abstract class Animal with all methods',
            'Only interfaces: Pettable, Trainable, Animal',
            'One concrete Animal class with everything',
          ],
          correctAnswer: 'Animal abstract class (shared state) + Pettable and Trainable interfaces (capabilities). Dog extends Animal implements Pettable, Trainable',
          explanation: 'The abstract class provides shared state (name, age). Interfaces define capabilities (pettable, trainable). This is the proper use of both mechanisms together.',
          relatedConcepts: ['abstract-class', 'interface', 'design-combination'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-interface-vs-abstract',
      prerequisites: ['lesson-07-02', 'lesson-07-03'],
      xpReward: 70,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'interface-vs-abstract',
      difficulty: 'medium',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-07-06',
      moduleId: 'module-07',
      title: 'Designing with Abstraction',
      slug: 'designing-with-abstraction',
      order: 6,
      duration: 20,
      description: 'Apply abstraction in real system design — payment systems, shape hierarchies, and animal kingdoms.',
      learningObjectives: [
        { id: 'lo-07-06-1', description: 'Design a payment system using abstraction', completed: false },
        { id: 'lo-07-06-2', description: 'Create a shape hierarchy with abstract classes and interfaces', completed: false },
        { id: 'lo-07-06-3', description: 'Evaluate abstraction trade-offs in design decisions', completed: false },
        { id: 'lo-07-06-4', description: 'Apply abstraction to reduce coupling between modules', completed: false },
      ],
      englishExplanation: {
        id: 'ee-07-06',
        text: `Designing with abstraction means creating systems where the high-level logic depends on abstractions rather than concrete implementations. This makes the system flexible, testable, and maintainable. Let us explore three real-world design scenarios.

**Payment System Design:** A payment system needs to support multiple payment methods: credit card, PayPal, bank transfer, cryptocurrency. The core principle is that the checkout process should not know the details of how each payment method works. You define a PaymentMethod interface or abstract class with processPayment(amount) and refund(amount). Each payment method provides its own implementation. The checkout code works with PaymentMethod references — adding a new payment method requires only creating a new class, no changes to checkout.

**Shape Hierarchy Design:** A graphics application needs to render, calculate area, and serialize different shapes. The design should allow adding new shapes without modifying existing code. Shape is abstract with abstract area(), draw(), and serialize() methods. Circle, Rectangle, Triangle each implement these. A ShapeManager works with Shape references, processing any shape polymorphically. Adding Pentagon requires only creating a new class — the ShapeManager does not change.

**Animal Kingdom Design:** A zoo management system has different animal types with different feeding, movement, and sound behaviors. Animal is abstract with abstract feed(), move(), and sound(). Carnivore and Herbivore can be intermediate abstract classes with concrete feeding behaviors. Lion extends Carnivore, Cow extends Herbivore. The zookeeper interface works with Animal references.

**Key Design Principles:**
1. Program to the interface, not the implementation
2. Depend on abstractions, not concrete classes
3. High-level modules should not depend on low-level modules — both should depend on abstractions
4. Abstractions should not depend on details — details should depend on abstractions

These principles, known as the Dependency Inversion Principle, are achieved through abstraction. They make systems where components are loosely coupled and independently changeable.`
      },
      romanUrduExplanation: {
        id: 'ru-07-06',
        text: `Abstraction ke saath design karna means aise systems banana jahan high-level logic concrete implementations ki bajaye abstractions par depend kare. Ye system ko flexible, testable aur maintainable banata hai. Teen real-world design scenarios explore karte hain.

**Payment System Design:** Payment system ko multiple payment methods support karni hain: credit card, PayPal, bank transfer, cryptocurrency. Core principle ye hai ke checkout process ko ye pata nahi hona chahiye ke har payment method kaise kaam karta hai. Aap PaymentMethod interface ya abstract class define karte hain processPayment(amount) aur refund(amount) ke saath. Har payment method apna implementation provide karta hai. Checkout code PaymentMethod references ke saath kaam karta hai — naya payment method add karne ke liye sirf naya class banana padta hai, checkout mein koi change nahi.

**Shape Hierarchy Design:** Graphics application ko alag shapes render, area calculate aur serialize karna hai. Design aisa hona chahiye ke naye shapes add karne mein existing code modify na ho. Shape abstract hai abstract area(), draw() aur serialize() methods ke saath. Circle, Rectangle, Triangle inhe implement karte hain. ShapeManager Shape references ke saath kaam karta hai, kisi bhi shape ko polymorphically process karta hai. Pentagon add karne ke liye sirf naya class banana padta hai — ShapeManager change nahi hota.

**Animal Kingdom Design:** Zoo management system mein alag animal types hain alag feeding, movement aur sound behaviors ke saath. Animal abstract hai abstract feed(), move() aur sound() ke saath. Carnivore aur Herbivore intermediate abstract classes ho sakte hain concrete feeding behaviors ke saath. Lion Carnivore se, Cow Herbivore se extend karta hai. Zookeeper interface Animal references ke saath kaam karta hai.

**Key Design Principles:**
1. Interface ke saath program karo, implementation ke nahi
2. Abstractions par depend karo, concrete classes ke nahi
3. High-level modules low-level modules par depend nahi kare — dono abstractions par depend karein
4. Abstractions details par depend nahi kare — details abstractions par depend kare

Ye principles, jise Dependency Inversion Principle kehte hain, abstraction ke through achieve hote hain. Ye aise systems banate hain jahan components loosely coupled aur independently changeable hote hain.`
      },
      keyPoints: [
        { id: 'kp-07-06-1', title: 'Program to Interface', description: 'High-level code works with interface/abstract references, not concrete classes. This enables swapping implementations.' },
        { id: 'kp-07-06-2', title: 'Loose Coupling', description: 'Abstraction reduces dependencies between modules. Each module depends on abstractions, not implementations.' },
        { id: 'kp-07-06-3', title: 'Open for Extension', description: 'New implementations are added by creating new classes, not modifying existing code. This follows the Open-Closed Principle.' },
        { id: 'kp-07-06-4', title: 'Testability', description: 'Abstractions make testing easier — you can mock or stub implementations without changing the code under test.' },
      ],
      codeExamples: [
        {
          id: 'ce-07-06-1',
          title: 'Payment System with Abstraction',
          code: `// ABSTRACTION — pure contract
interface PaymentMethod {
    boolean processPayment(double amount);
    boolean refund(double amount);
    String getMethodName();
}

// CONCRETE IMPLEMENTATIONS
class CreditCard implements PaymentMethod {
    @Override
    public boolean processPayment(double amount) {
        System.out.println("Charging credit card: $" + amount);
        return true;
    }

    @Override
    public boolean refund(double amount) {
        System.out.println("Refunding credit card: $" + amount);
        return true;
    }

    @Override
    public String getMethodName() { return "Credit Card"; }
}

class PayPal implements PaymentMethod {
    @Override
    public boolean processPayment(double amount) {
        System.out.println("Processing PayPal payment: $" + amount);
        return true;
    }

    @Override
    public boolean refund(double amount) {
        System.out.println("Refunding PayPal: $" + amount);
        return true;
    }

    @Override
    public String getMethodName() { return "PayPal"; }
}

class CryptoCurrency implements PaymentMethod {
    @Override
    public boolean processPayment(double amount) {
        System.out.println("Processing crypto payment: $" + amount);
        return true;
    }

    @Override
    public boolean refund(double amount) {
        System.out.println("Crypto refunds not supported");
        return false;
    }

    @Override
    public String getMethodName() { return "Cryptocurrency"; }
}

// CHECKOUT — depends on abstraction, not implementation
class Checkout {
    void processOrder(double total, PaymentMethod method) {
        System.out.println("Order total: $" + total);
        System.out.println("Payment method: " + method.getMethodName());
        boolean success = method.processPayment(total);
        System.out.println("Payment " + (success ? "successful" : "failed"));
    }
}

public class Main {
    public static void main(String[] args) {
        Checkout checkout = new Checkout();

        checkout.processOrder(100.0, new CreditCard());
        checkout.processOrder(50.0, new PayPal());
        checkout.processOrder(200.0, new CryptoCurrency());
    }
}`,
          language: 'java',
          output: `Order total: $100.0
Payment method: Credit Card
Processing credit card payment: $100.0
Payment successful
Order total: $50.0
Payment method: PayPal
Processing PayPal payment: $50.0
Payment successful
Order total: $200.0
Payment method: Cryptocurrency
Processing crypto payment: $200.0
Payment successful`,
          explanation: 'The Checkout class works with PaymentMethod interface. It does not know about CreditCard, PayPal, or CryptoCurrency. Adding a new payment method (e.g., ApplePay) requires only creating a new class — Checkout remains unchanged.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-07-06-1',
          title: 'Logging Framework',
          scenario: 'A logging framework supports console, file, and database logging. All share the same log(message, level) interface.',
          oopConcept: 'Logger interface defines log(). ConsoleLogger, FileLogger, DatabaseLogger implement it. The application works with Logger references. Adding SlackLogger or EmailLogger requires only a new class.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-07-06-1',
          title: 'Depending on Concrete Types Instead of Abstractions',
          incorrectCode: `// Tight coupling — depends on concrete implementation
class OrderService {
    CreditCardProcessor processor = new CreditCardProcessor();

    void checkout(Order order) {
        processor.process(order.getTotal());  // hardcoded to credit card!
    }
}
// Cannot use PayPal or any other payment method`,
          correctCode: `// Loose coupling — depends on abstraction
class OrderService {
    PaymentProcessor processor;

    OrderService(PaymentProcessor processor) {
        this.processor = processor;  // injected dependency
    }

    void checkout(Order order) {
        processor.process(order.getTotal());  // any payment method works
    }
}
// Pass any PaymentProcessor: credit card, PayPal, crypto, etc.`,
          explanation: 'Depending on concrete types creates tight coupling. Depending on abstractions (interfaces/abstract classes) creates loose coupling where implementations can be swapped freely.',
        },
      ],
      examNotes: [
        { id: 'en-07-06-1', title: 'Design Principles', content: 'Program to interface. Depend on abstractions. High-level and low-level modules depend on abstractions, not each other. This is the Dependency Inversion Principle.', importance: 'high' },
        { id: 'en-07-06-2', title: 'Benefits of Abstraction in Design', content: 'Loose coupling, easy testing (mocking), open for extension (new classes), closed for modification (existing code unchanged).', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-07-06-1', question: 'What does "programming to the interface" mean?', answer: 'Declaring variables, parameters, and return types as interface or abstract types rather than concrete classes. This allows any implementation to be used interchangeably.', difficulty: 'medium' },
        { id: 'vq-07-06-2', question: 'How does abstraction improve testability?', answer: 'You can create mock implementations of interfaces for testing. The code under test works with the interface, so the mock can be injected without changing the code.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-07-06-1', type: 'mcq', question: 'What principle says high-level modules should not depend on low-level modules?', options: ['Single Responsibility', 'Dependency Inversion', 'Liskov Substitution', 'Interface Segregation'], correctAnswer: 'Dependency Inversion', explanation: 'The Dependency Inversion Principle states that both high-level and low-level modules should depend on abstractions, not on each other.' },
        { id: 'qc-07-06-2', type: 'true-false', question: 'Abstraction makes systems harder to test.', correctAnswer: 'False', explanation: 'Abstraction makes testing easier by allowing mock implementations. You can test code without depending on real external systems.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-07-06-1',
          scenario: 'You are designing an e-commerce system. Orders need to be shipped via different carriers (FedEx, UPS, DHL). Each has different pricing, tracking, and delivery APIs.',
          question: 'How does abstraction simplify this?',
          type: 'design-decision',
          options: [
            'Define a ShippingService interface with ship(), track(), getCost(). Each carrier implements it. Order processing works with ShippingService references',
            'Create separate methods for each carrier in the Order class',
            'Use if-else to check carrier type in each shipping operation',
            'Create one ShippingService class with all carrier logic inside',
          ],
          correctAnswer: 'Define a ShippingService interface with ship(), track(), getCost(). Each carrier implements it. Order processing works with ShippingService references',
          explanation: 'Abstraction hides carrier-specific complexity behind a simple interface. Order processing calls ship() without knowing FedEx or UPS internals. Adding a new carrier (e.g., DHL) requires only a new class.',
          relatedConcepts: ['abstraction', 'interface-design', 'loose-coupling'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-design-abstraction',
      prerequisites: ['lesson-07-05'],
      xpReward: 70,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'design-abstraction',
      difficulty: 'medium',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-07-07',
      moduleId: 'module-07',
      title: 'Abstraction Anti-Patterns',
      slug: 'abstraction-anti-patterns',
      order: 7,
      duration: 15,
      description: 'Learn about common abstraction mistakes — over-abstraction, leaky abstraction, and god interfaces — and how to avoid them.',
      learningObjectives: [
        { id: 'lo-07-07-1', description: 'Identify over-abstraction and its consequences', completed: false },
        { id: 'lo-07-07-2', description: 'Recognize leaky abstraction and its effects', completed: false },
        { id: 'lo-07-07-3', description: 'Avoid god interfaces that violate interface segregation', completed: false },
        { id: 'lo-07-07-4', description: 'Apply the right level of abstraction for a given problem', completed: false },
      ],
      englishExplanation: {
        id: 'ee-07-07',
        text: `While abstraction is powerful, applying it incorrectly leads to anti-patterns that make code worse, not better. Three common abstraction anti-patterns are over-abstraction, leaky abstraction, and god interfaces.

**Over-Abstraction** occurs when you create unnecessary layers of abstraction for simple problems. For example, creating an interface, abstract class, factory, and strategy for a simple data class with no polymorphic behavior needed. Over-abstraction adds complexity without benefit — more files, more indirection, harder navigation. The rule of thumb: abstract only when there is a clear polymorphic need. If you have exactly one implementation and no plans for more, a simple class may be sufficient.

**Leaky Abstraction** occurs when an abstraction exposes implementation details it was supposed to hide. The classic example is a database abstraction that throws SQL-specific exceptions. The user of the abstraction should not need to know about SQL, but the leak forces them to handle SQL exceptions. Leaky abstractions violate the fundamental purpose of abstraction — they create the illusion of simplicity while still requiring knowledge of the hidden complexity.

Another example: a "simple" file upload API that requires the user to set chunk sizes and buffer counts — implementation details that should be internal. The abstraction leaks when it forces users to understand the internal mechanism.

**God Interface** (also called fat interface) occurs when an interface has too many methods, forcing implementers to implement methods they do not need. For example, a Vehicle interface with start(), stop(), fly(), swim(), dive(), and烹調() — most vehicles only need a few of these. This violates the Interface Segregation Principle.

The fix: split god interfaces into smaller, focused interfaces. A Swimmable interface, a Flyable interface, and a Drivable interface. Each class implements only the interfaces it needs.

**How to avoid these anti-patterns:**
1. Do not abstract without a clear reason (YAGNI — You Aren't Gonna Need It)
2. Test your abstraction — if users still need to know hidden details, the abstraction leaks
3. Keep interfaces small and focused — one purpose per interface
4. Prefer composition over deep abstraction hierarchies`
      },
      romanUrduExplanation: {
        id: 'ru-07-07',
        text: `Jabki abstraction powerful hai, galat apply karne se anti-patterns bante hain jo code ko behtar ki bajaye kharab karte hain. Teen common abstraction anti-patterns hain: over-abstraction, leaky abstraction, aur god interfaces.

**Over-Abstraction** tab hota hai jab simple problems ke liye unnecessary abstraction layers banaye jaayein. Jaise, simple data class ke liye interface, abstract class, factory aur strategy create karna jab koi polymorphic behavior ki zaroorat na ho. Over-abstraction complexity badhata hai bina benefit ke — zyada files, zyada indirection, mushkil navigation. Rule of thumb: sirf tab abstract karo jab clear polymorphic need ho. Agar aapke paas exactly ek implementation hai aur zyada ki planning nahi, toh simple class kaafi ho sakta hai.

**Leaky Abstraction** tab hota hai jab abstraction implementation details expose karta hai jo chupane chahiye thi. Classic example hai database abstraction jo SQL-specific exceptions throw kare. Abstraction ke user ko SQL ke baare mein pata nahi hona chahiye, lekin leak unhe SQL exceptions handle karne par majboor karta hai. Leaky abstractions abstraction ka fundamental purpose violate karte hain — ye simplicity ka illusion create karte hain jabke hidden complexity ki knowledge abhi bhi zaroori hai.

Doosra example: "simple" file upload API jo user se chunk sizes aur buffer counts set karwaye — ye implementation details hain jo internal honi chahiye. Abstraction tab leak hota hai jab ye users ko internal mechanism samajhne par majboor kare.

**God Interface** (fat interface bhi kehte hain) tab hota hai jab interface mein bahut zyada methods hon, jo implementers ko wo methods implement karne par majboor karein jo unhe chahiye bhi nahi. Jaise, Vehicle interface mein start(), stop(), fly(), swim(), dive() aur cook() — zyada tar vehicles ko sirf kuch chahiye. Ye Interface Segregation Principle violate karta hai.

Fix: god interfaces ko chhote, focused interfaces mein tod do. Swimmable interface, Flyable interface, aur Drivable interface. Har class sirf wo interfaces implement kare jo use chahiye.

**In anti-patterns se kaise bachein:**
1. Bina clear reason ke abstract mat karo (YAGNI — You Aren't Gonna Need It)
2. Apna abstraction test karo — agar users ko abhi bhi hidden details pata chahiye, toh abstraction leak ho raha hai
3. Interfaces chhote aur focused rakho — har interface ka ek purpose
4. Deep abstraction hierarchies ki bajaye composition ko prefer karo`
      },
      keyPoints: [
        { id: 'kp-07-07-1', title: 'Over-Abstraction', description: 'Creating unnecessary abstraction layers for simple problems. Adds complexity without benefit. Follow YAGNI.' },
        { id: 'kp-07-07-2', title: 'Leaky Abstraction', description: 'An abstraction that exposes implementation details it should hide. Forces users to know hidden complexity.' },
        { id: 'kp-07-07-3', title: 'God Interface', description: 'An interface with too many methods, forcing implementers to implement methods they do not need. Violates Interface Segregation.' },
        { id: 'kp-07-07-4', title: 'Right Level', description: 'Abstract only when there is polymorphic need. Keep interfaces small. Test that abstractions do not leak.' },
      ],
      codeExamples: [
        {
          id: 'ce-07-07-1',
          title: 'Leaky Abstraction Example',
          code: `// LEAKY: abstracts database but leaks SQL details
interface Repository {
    List<Map<String, Object>> query(String sql);  // SQL leaked!
    void execute(String sql);  // SQL leaked!
}

// BETTER: clean abstraction, no implementation details
interface UserRepository {
    User findById(int id);
    List<User> findAll();
    void save(User user);
    void delete(int id);
}
// User of UserRepository does not need to know about SQL
// The implementation handles SQL internally`,
          language: 'java',
          explanation: 'The first interface leaks SQL (implementation detail). The second interface abstracts it completely — users work with User objects, not SQL strings.',
        },
        {
          id: 'ce-07-07-2',
          title: 'God Interface vs Segregated Interfaces',
          code: `// GOD INTERFACE — too many responsibilities
interface Vehicle {
    void start();
    void stop();
    void accelerate();
    void brake();
    void fly();
    void swim();
    void cook();  // most vehicles cannot cook!
}
// Classes implement unused methods: throw UnsupportedOperationException

// SEGREGATED INTERFACES — each with one purpose
interface Drivable {
    void start();
    void stop();
    void accelerate();
    void brake();
}

interface Flyable {
    void fly();
}

interface Swimmable {
    void swim();
}

class Car implements Drivable { /* only what it needs */ }
class Airplane implements Drivable, Flyable { /* what it needs */ }
class Duck implements Flyable, Swimmable, Drivable { /* what it needs */ }`,
          language: 'java',
          explanation: 'The god interface forces every vehicle to implement cooking. Segregated interfaces let each class implement only what it actually needs.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-07-07-1',
          title: 'Java Servlet API Evolution',
          scenario: 'The original javax.servlet interface had too many methods. Later, javax.servlet.http provided focused interfaces. This was a fix for the god interface anti-pattern.',
          oopConcept: 'The API was refactored to separate concerns: core servlet lifecycle in Servlet, HTTP-specific behavior in HttpServlet. This followed Interface Segregation Principle.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-07-07-1',
          title: 'Creating Abstractions Without Need',
          incorrectCode: `// Over-abstracting: unnecessary interface for a simple utility
interface MathHelper {
    int add(int a, int b);
    int subtract(int a, int b);
}

class Calculator implements MathHelper {
    @Override public int add(int a, int b) { return a + b; }
    @Override public int subtract(int a, int b) { return a - b; }
}
// No polymorphic need — one implementation, no swapping planned`,
          correctCode: `// Simple class — no unnecessary abstraction
class Calculator {
    int add(int a, int b) { return a + b; }
    int subtract(int a, int b) { return a - b; }
}
// Only add abstraction when there is a clear polymorphic need
// YAGNI: You Aren't Gonna Need It`,
          explanation: 'If there is no polymorphic need (one implementation, no plans to swap), a simple class is better than forced abstraction. YAGNI principle applies.',
        },
      ],
      examNotes: [
        { id: 'en-07-07-1', title: 'Three Anti-Patterns', content: 'Over-abstraction (unnecessary layers), leaky abstraction (exposed details), god interface (too many methods). Know each with examples.', importance: 'high' },
        { id: 'en-07-07-2', title: 'Prevention', content: 'Abstract only when needed (YAGNI). Test that abstractions hide details. Keep interfaces small and focused (Interface Segregation).', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-07-07-1', question: 'What is a leaky abstraction?', answer: 'An abstraction that exposes implementation details it should hide. For example, a database abstraction that throws SQL exceptions — the user needs to know SQL, defeating the purpose of abstraction.', difficulty: 'medium' },
        { id: 'vq-07-07-2', question: 'What is a god interface?', answer: 'An interface with too many methods that forces implementers to provide implementations for methods they do not need. It violates the Interface Segregation Principle.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-07-07-1', type: 'mcq', question: 'Which anti-pattern creates unnecessary abstraction layers?', options: ['Leaky abstraction', 'God interface', 'Over-abstraction', 'Under-abstraction'], correctAnswer: 'Over-abstraction', explanation: 'Over-abstraction creates unnecessary indirection and complexity for simple problems that do not need it.' },
        { id: 'qc-07-07-2', type: 'true-false', question: 'A leaky abstraction successfully hides all implementation details.', correctAnswer: 'False', explanation: 'A leaky abstraction fails to hide details — it exposes implementation specifics that users must handle, defeating the purpose of abstraction.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-07-07-1',
          scenario: 'A developer creates an interface with 25 methods for a simple user management system. Most service classes only use 5-6 methods.',
          question: 'What anti-pattern is this and how do you fix it?',
          type: 'debugging',
          options: [
            'God interface — split into smaller interfaces: UserAuth, UserProfile, UserPreferences',
            'Leaky abstraction — hide the implementation details',
            'Over-abstraction — remove the interface entirely',
            'No problem — more methods mean more flexibility',
          ],
          correctAnswer: 'God interface — split into smaller interfaces: UserAuth, UserProfile, UserPreferences',
          explanation: 'A 25-method interface forces implementers to implement methods they do not need. Splitting into focused interfaces follows the Interface Segregation Principle.',
          relatedConcepts: ['god-interface', 'interface-segregation', 'anti-pattern'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-abstraction-antipatterns',
      prerequisites: ['lesson-07-05', 'lesson-07-06'],
      xpReward: 60,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'abstraction-antipatterns',
      difficulty: 'medium',
      estimatedMinutes: 15,
    },
    {
      id: 'lesson-07-08',
      moduleId: 'module-07',
      title: 'Practical Abstraction Strategies',
      slug: 'practical-abstraction-strategies',
      order: 8,
      duration: 18,
      description: 'Learn practical strategies for choosing the right level of abstraction — when to abstract, when to keep it simple, and how to evolve designs.',
      learningObjectives: [
        { id: 'lo-07-08-1', description: 'Apply the YAGNI principle to abstraction decisions', completed: false },
        { id: 'lo-07-08-2', description: 'Evaluate when abstraction adds value vs when it adds complexity', completed: false },
        { id: 'lo-07-08-3', description: 'Evolve abstractions as requirements change', completed: false },
        { id: 'lo-07-08-4', description: 'Balance simplicity and flexibility in design', completed: false },
      ],
      englishExplanation: {
        id: 'ee-07-08',
        text: `Choosing the right level of abstraction is a practical skill that balances simplicity against flexibility. The following strategies help make sound abstraction decisions.

**Strategy 1: YAGNI (You Aren't Gonna Need It).** Do not create abstractions for hypothetical future needs. If you have one implementation and no concrete plan for a second, use a simple class. Abstractions have a cost: more code, more indirection, more cognitive load. Only pay that cost when there is a clear, present need. You can always add abstraction later when the need materializes.

**Strategy 2: Start Simple, Abstract When Pain Appears.** Begin with concrete classes. When you find yourself duplicating code across similar classes, that is a signal to introduce an abstraction. When you need to swap implementations for testing or different environments, that is another signal. Abstract in response to real pain, not in anticipation of imagined pain.

**Strategy 3: Apply the Dependency Inversion Principle.** High-level business logic should depend on abstractions. Low-level utilities can be concrete. The checkout process depends on PaymentMethod (abstraction). The CreditCardProcessor is a low-level detail. This separation makes the system modular and testable.

**Strategy 4: Use the Smallest Abstraction That Works.** Prefer interfaces over abstract classes when you do not need shared state. Prefer abstract classes over deep hierarchies when you need shared behavior. Prefer composition over inheritance when relationships are not IS-A. The smallest effective abstraction is usually the best.

**Strategy 5: Refactor Toward Abstraction Incrementally.** Do not design the perfect abstraction upfront. Start with what works. As requirements evolve and patterns emerge, refactor toward cleaner abstractions. Evolutionary design beats big upfront design.

**Strategy 6: Test Your Abstractions.** If writing tests requires knowing implementation details, your abstraction leaks. If adding a new implementation requires modifying existing code, your abstraction is not extensible enough. Real tests validate whether your abstractions work.

The ultimate goal is code that is easy to understand, easy to change, and easy to test. Abstraction is a means to that end, not an end in itself. Use it wisely.`
      },
      romanUrduExplanation: {
        id: 'ru-07-08',
        text: `Sahi abstraction level choose karna ek practical skill hai jo simplicity aur flexibility ke beech balance banata hai. Neeche diye gaye strategies sahi abstraction decisions mein madad karte hain.

**Strategy 1: YAGNI (You Aren't Gonna Need It).** Hypothetical future needs ke liye abstractions mat banao. Agar aapke paas ek implementation hai aur doosre ki concrete plan nahi, toh simple class use karo. Abstractions ka cost hai: zyada code, zyada indirection, zyada cognitive load. Sirf tab cost pay karo jab clear, present need ho. Zaroorat padne par baad mein abstraction add kar sakte hain.

**Strategy 2: Simple Shuru Karein, Jab Dikhai De Tab Abstract Karein.** Concrete classes se shuru karo. Jab aap similar classes mein code duplicate karte dekhein, toh ye signal hai abstraction introduce karne ka. Jab testing ya different environments ke liye implementations swap karni hon, toh ye doosra signal hai. Real pain ke response mein abstract karo, imagined pain ki anticipation mein nahi.

**Strategy 3: Dependency Inversion Principle Apply Karein.** High-level business logic abstractions par depend karna chahiye. Low-level utilities concrete ho sakte hain. Checkout process PaymentMethod (abstraction) par depend karta hai. CreditCardProcessor ek low-level detail hai. Ye separation system ko modular aur testable banata hai.

**Strategy 4: Sabse Chhota Effective Abstraction Use Karein.** Jab shared state na ho toh interfaces ko abstract classes par prefer karo. Jab shared behavior chahiye toh deep hierarchies ki bajaye abstract classes par prefer karo. Jab relationships IS-A na hon toh inheritance ki bajaye composition par prefer karo. Sabse chhota effective abstraction aksar sabse best hota hai.

**Strategy 5: Incrementally Abstraction Ki taraf Refactor Karein.** Perfect abstraction upfront design mat karo. Jo kaam kare usse shuru karo. Jab requirements evolve hon aur patterns emerge hon, toh cleaner abstractions ki taraf refactor karo. Evolutionary design big upfront design se behtar hai.

**Strategy 6: Apne Abstractions Test Karein.** Agar tests likhne ke liye implementation details pata chahiye, toh aapka abstraction leak ho raha hai. Agar naya implementation add karne ke liye existing code modify karna padta hai, toh abstraction kaafi extensible nahi hai. Real tests validate karte hain ke aapke abstractions kaam karte hain.

Ultimate goal code hai jo samajhna, change karna aur test karna aasan ho. Abstraction us end ka means hai, end nahi. Ise wisely use karo.`
      },
      keyPoints: [
        { id: 'kp-07-08-1', title: 'YAGNI', description: 'Do not abstract for hypothetical future needs. Only abstract when there is a clear, present requirement.' },
        { id: 'kp-07-08-2', title: 'Abstract When Pain Appears', description: 'Start simple. Introduce abstraction when you see code duplication or need to swap implementations.' },
        { id: 'kp-07-08-3', title: 'Smallest Effective Abstraction', description: 'Prefer interfaces when no shared state is needed. Prefer abstract classes when shared behavior is needed. Keep it minimal.' },
        { id: 'kp-07-08-4', title: 'Evolutionary Design', description: 'Do not design the perfect abstraction upfront. Start simple and refactor toward better abstractions as patterns emerge.' },
      ],
      codeExamples: [
        {
          id: 'ce-07-08-1',
          title: 'Evolution: From Concrete to Abstract',
          code: `// STEP 1: Start simple — concrete class, no abstraction
class EmailSender {
    void send(String to, String message) {
        System.out.println("Email to " + to + ": " + message);
    }
}

// STEP 2: Need SMS too — introduce abstraction
interface MessageSender {
    void send(String to, String message);
}

class EmailSender implements MessageSender {
    @Override
    public void send(String to, String message) {
        System.out.println("Email to " + to + ": " + message);
    }
}

class SmsSender implements MessageSender {
    @Override
    public void send(String to, String message) {
        System.out.println("SMS to " + to + ": " + message);
    }
}

// STEP 3: Notification system uses abstraction
class NotificationService {
    private MessageSender sender;

    NotificationService(MessageSender sender) {
        this.sender = sender;
    }

    void notify(String user, String message) {
        sender.send(user, message);
    }
}

public class Main {
    public static void main(String[] args) {
        // Can swap implementations easily
        NotificationService email = new NotificationService(new EmailSender());
        NotificationService sms = new NotificationService(new SmsSender());

        email.notify("user@email.com", "Welcome!");
        sms.notify("+1234567890", "Your code is 1234");
    }
}`,
          language: 'java',
          output: `Email to user@email.com: Welcome!
SMS to +1234567890: Your code is 1234`,
          explanation: 'Started with a simple EmailSender. When SMS was needed, introduced MessageSender interface. The notification system now works with any sender — email, SMS, or future channels. Evolutionary design in action.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-07-08-1',
          title: 'Refactoring Legacy Code',
          scenario: 'A legacy system has a monolithic OrderProcessor class with hardcoded payment, shipping, and notification logic. It needs to support new payment methods and carriers.',
          oopConcept: 'Refactor incrementally: extract PaymentProcessor interface first (highest pain point). Then ShippingService. Then NotificationSender. Each refactoring step is testable and reduces coupling.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-07-08-1',
          title: 'Over-Engineering from Day One',
          incorrectCode: `// Day 1: building a simple blog — over-engineered
interface PostRepository { ... }
abstract class AbstractPostRepository implements PostRepository { ... }
class SqlPostRepository extends AbstractPostRepository { ... }
class MongoPostRepository extends AbstractPostRepository { ... }
class PostFactory { ... }
class PostStrategy { ... }
class PostObserver { ... }
// 7 abstractions for a blog that may never need more than one database`,
          correctCode: `// Day 1: start simple
class PostRepository {
    void save(Post post) { /* database logic */ }
    Post findById(int id) { /* database logic */ }
}

// Later, when MongoDB is actually needed:
// THEN introduce the interface and refactor
// Don't abstract until the pain is real`,
          explanation: 'YAGNI applies. Start with the simplest solution that works. Add abstraction only when you have a real, present need — not for imagined future requirements.',
        },
      ],
      examNotes: [
        { id: 'en-07-08-1', title: 'YAGNI Principle', content: "You Aren't Gonna Need It. Do not create abstractions for hypothetical future needs. Abstract when there is a clear, present requirement.", importance: 'high' },
        { id: 'en-07-08-2', title: 'Evolutionary Design', content: 'Start simple, refactor toward abstraction as patterns emerge. Big upfront design often over-engineers. Incremental design adapts to real needs.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-07-08-1', question: 'What is YAGNI and how does it apply to abstraction?', answer: 'YAGNI means You Aren\'t Gonna Need It. Do not create abstractions for hypothetical future needs. Abstract only when there is a clear, present requirement. You can add abstraction later when needed.', difficulty: 'medium' },
        { id: 'vq-07-08-2', question: 'When should you introduce abstraction in a project?', answer: 'Start simple. Introduce abstraction when you see code duplication, need to swap implementations, or when testing requires mocking. Abstract in response to real pain, not imagined future needs.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-07-08-1', type: 'mcq', question: 'What does YAGNI stand for?', options: ['You Are Going To Need It', 'You Aren\'t Gonna Need It', 'Yet Another Generic Naming Convention', 'Your Abstract Generalizes New Ideas'], correctAnswer: 'You Aren\'t Gonna Need It', explanation: 'YAGNI is a principle that says do not add functionality until it is actually needed. Apply this to abstraction decisions.' },
        { id: 'qc-07-08-2', type: 'true-false', question: 'The best abstractions are designed upfront before writing any code.', correctAnswer: 'False', explanation: 'Evolutionary design works better: start simple and refactor toward abstraction as real patterns and needs emerge.', difficulty: 'medium' },
        { id: 'qc-07-08-3', type: 'mcq', question: 'When should you introduce abstraction?', options: ['From day one for every project', 'When code duplication or swapping need appears', 'Never — abstractions are always bad', 'Only in large enterprise projects'], correctAnswer: 'When code duplication or swapping need appears', explanation: 'Abstract in response to real pain (duplication, swapping need) rather than in anticipation of imagined future needs.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-07-08-1',
          scenario: 'You are building a small internal tool. It has one database, one user type, and three API endpoints. A colleague suggests creating interfaces and abstract classes for everything.',
          question: 'How do you respond?',
          type: 'design-decision',
          options: [
            'Follow YAGNI: start with simple concrete classes. Abstract only when we actually need multiple implementations or testing mocks',
            'Create interfaces for everything — it is always better to have them',
            'Ignore the suggestion completely — abstractions are never useful for small projects',
            'Create abstract classes for every single class',
          ],
          correctAnswer: 'Follow YAGNI: start with simple concrete classes. Abstract only when we actually need multiple implementations or testing mocks',
          explanation: 'YAGNI says do not abstract for hypothetical needs. Start simple. If the project grows and needs polymorphism or testability, introduce abstractions then. Premature abstraction adds complexity.',
          relatedConcepts: ['yagni', 'evolutionary-design', 'practical-abstraction'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-abstraction-strategies',
      prerequisites: ['lesson-07-07'],
      xpReward: 60,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'abstraction-strategies',
      difficulty: 'medium',
      estimatedMinutes: 18,
    },
  ],
};
