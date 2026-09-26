import type { JavaCodeExample } from '@/types/codeStudio';

export const OOP_CORE_EXAMPLES: JavaCodeExample[] = [
  {
    id: 'cs-ex-04',
    title: 'Default Constructor',
    titleUrdu: 'Default Constructor',
    category: 'constructors',
    topic: 'Constructors',
    difficulty: 'easy',
    filename: 'Car.java',
    code: `class Car {
    String brand;

    Car() {
        brand = "Unknown";
        System.out.println("Car created: " + brand);
    }
}

public class Main {
    public static void main(String[] args) {
        Car c = new Car();
    }
}`,
    expectedOutput: ['Car created: Unknown'],
    keyConcept: 'A constructor has the class name and runs when an object is created.',
    keyConceptUrdu: 'Constructor class ka naam rakhta hai aur object banne par chalta hai.',
    commonMistake: 'Writing a return type (void) on a constructor by mistake.',
    commonMistakeUrdu: 'Constructor par galti se return type (void) likh dena.',
    relatedLessonId: 'lesson-03-01',
    relatedModuleId: 'module-03',
    lineExplanations: [
      { line: 1, what: 'Declares class Car.', whatUrdu: 'Car class declare karta hai.', why: 'Constructor must live inside its class.', whyUrdu: 'Constructor apni class ke andar hota hai.', concept: 'Class' },
      { line: 3, what: 'Defines constructor Car().', whatUrdu: 'Constructor Car() define karta hai.', why: 'Name matches class name and has no return type.', whyUrdu: 'Naam class se match karta hai, return type nahi hota.', concept: 'Constructor' },
      { line: 4, what: 'Sets default brand.', whatUrdu: 'Default brand set karta hai.', why: 'Constructors initialize object state.', whyUrdu: 'Constructors object state initialize karte hain.', concept: 'Initialization' },
      { line: 11, what: 'new Car() invokes the constructor.', whatUrdu: 'new Car() constructor invok karta hai.', why: 'new always pairs with a constructor call.', whyUrdu: 'new hamesha constructor call ke sath aata hai.', concept: 'Object creation' },
    ],
    trace: {
      note: 'Conceptual teaching steps — not a real JVM trace.',
      noteUrdu: 'Conceptual teaching steps — asal JVM trace nahi.',
      steps: [
        { id: 'ct1', title: 'new Car() starts', titleUrdu: 'new Car() shuru', description: 'Object allocation begins.', descriptionUrdu: 'Object allocation shuru hoti hai.', highlightLine: 11, conceptualState: { className: 'Car', referenceName: 'c', objectCreated: false } },
        { id: 'ct2', title: 'Constructor runs', titleUrdu: 'Constructor chala', description: 'Car() body initializes brand.', descriptionUrdu: 'Car() body brand initialize karta hai.', highlightLine: 3, conceptualState: { className: 'Car', referenceName: 'c', objectCreated: true, methodBeingCalled: 'Car', fields: [{ name: 'brand', value: '"Unknown"' }] } },
        { id: 'ct3', title: 'Construction message printed', titleUrdu: 'Construction message print hua', description: 'Expected output line appears.', descriptionUrdu: 'Expected output line nazar aati hai.', highlightLine: 5, conceptualState: { className: 'Car', objectCreated: true, outputLines: ['Car created: Unknown'] } },
      ],
    },
  },
  {
    id: 'cs-ex-05',
    title: 'Encapsulated Account',
    titleUrdu: 'Encapsulated Account',
    category: 'encapsulation',
    topic: 'Getters and setters',
    difficulty: 'easy',
    filename: 'Account.java',
    code: `class Account {
    private double balance;

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    public double getBalance() {
        return balance;
    }
}

public class Main {
    public static void main(String[] args) {
        Account a = new Account();
        a.deposit(500);
        System.out.println(a.getBalance());
    }
}`,
    expectedOutput: ['500.0'],
    keyConcept: 'Encapsulation hides fields and exposes controlled access via methods.',
    keyConceptUrdu: 'Encapsulation fields chupati hai aur methods se controlled access deti hai.',
    commonMistake: 'Accessing private fields directly from outside the class.',
    commonMistakeUrdu: 'Bahar se private fields directly access karna.',
    relatedLessonId: 'lesson-04-01',
    relatedModuleId: 'module-04',
    lineExplanations: [
      { line: 2, what: 'Declares private balance field.', whatUrdu: 'Private balance field declare karta hai.', why: 'private blocks direct outside access — encapsulation.', whyUrdu: 'private bahar direct access rokta hai — encapsulation.', concept: 'private' },
      { line: 4, what: 'deposit() validates amount before adding.', whatUrdu: 'deposit() amount add se pehle validate karta hai.', why: 'Controlled mutation protects invalid state.', whyUrdu: 'Controlled mutation invalid state se bachata hai.', concept: 'Invariant' },
      { line: 9, what: 'getBalance() exposes a read-only view.', whatUrdu: 'getBalance() read-only view deta hai.', why: 'Getters let outsiders read without writing freely.', whyUrdu: 'Getters bahar se padhne dete hain, free write nahi.', concept: 'Getter' },
      { line: 16, what: 'deposit(500) called via reference.', whatUrdu: 'Reference se deposit(500) call hua.', why: 'Only public methods may touch private state.', whyUrdu: 'Sirf public methods private state chhu sakte hain.', concept: 'Method call' },
    ],
  },
  {
    id: 'cs-ex-06',
    title: 'Inheritance Extends',
    titleUrdu: 'Inheritance Extends',
    category: 'inheritance',
    topic: 'is-a relationship',
    difficulty: 'medium',
    filename: 'Animal.java',
    code: `class Animal {
    void eat() {
        System.out.println("Animal eats");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Dog barks");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.eat();
        d.bark();
    }
}`,
    expectedOutput: ['Animal eats', 'Dog barks'],
    keyConcept: 'A subclass inherits public methods from its superclass.',
    keyConceptUrdu: 'Subclass superclass ke public methods inherit karta hai.',
    commonMistake: 'Expecting private superclass fields to be accessible in subclass.',
    commonMistakeUrdu: 'Umeed karna ke private superclass fields subclass mein accessible hon.',
    relatedLessonId: 'lesson-05-01',
    relatedModuleId: 'module-05',
    lineExplanations: [
      { line: 1, what: 'Defines superclass Animal.', whatUrdu: 'Superclass Animal define karta hai.', why: 'Base class holds shared behavior.', whyUrdu: 'Base class shared behavior rakhti hai.', concept: 'Superclass' },
      { line: 8, what: 'Dog extends Animal — Dog is an Animal.', whatUrdu: 'Dog extends Animal — Dog Animal hai.', why: 'extends creates the inheritance (is-a) link.', whyUrdu: 'extends inheritance (is-a) link banata hai.', concept: 'extends' },
      { line: 16, what: 'Dog instance can call eat() from Animal.', whatUrdu: 'Dog instance Animal ka eat() call kar sakta hai.', why: 'Inherited methods are usable on the subclass.', whyUrdu: 'Inherited methods subclass par usable hote hain.', concept: 'Inherited method' },
      { line: 17, what: 'Dog also has its own bark().', whatUrdu: 'Dog ke paas apna bark() bhi hai.', why: 'Subclass can add new behavior.', whyUrdu: 'Subclass nayi behavior add kar sakti hai.', concept: 'Own method' },
    ],
  },
  {
    id: 'cs-ex-07',
    title: 'Method Overriding',
    titleUrdu: 'Method Overriding',
    category: 'polymorphism',
    topic: 'Runtime polymorphism',
    difficulty: 'medium',
    filename: 'Shape.java',
    code: `class Shape {
    void draw() {
        System.out.println("Drawing shape");
    }
}

class Circle extends Shape {
    @Override
    void draw() {
        System.out.println("Drawing circle");
    }
}

public class Main {
    public static void main(String[] args) {
        Shape s = new Circle();
        s.draw();
    }
}`,
    expectedOutput: ['Drawing circle'],
    keyConcept: 'A superclass reference can point to a subclass object; overridden methods run dynamically.',
    keyConceptUrdu: 'Superclass reference subclass object point kar sakta hai; overridden methods dynamically chalte hain.',
    commonMistake: 'Assuming the reference type always chooses the method implementation.',
    commonMistakeUrdu: 'Sochna ke reference type hamesha method implementation choose kare.',
    relatedLessonId: 'lesson-06-01',
    relatedModuleId: 'module-06',
    lineExplanations: [
      { line: 8, what: 'Circle overrides draw() with @Override.', whatUrdu: 'Circle @Override se draw() override karta hai.', why: 'Same signature redefines behavior in the subclass.', whyUrdu: 'Same signature subclass mein behavior redefine karti hai.', concept: 'Override' },
      { line: 17, what: 'Shape reference holds a Circle object.', whatUrdu: 'Shape reference Circle object rakhta hai.', why: 'Enables polymorphic assignment (upcasting).', whyUrdu: 'Polymorphic assignment (upcasting) mumkin banata hai.', concept: 'Upcasting' },
      { line: 18, what: 'draw() runs Circle version.', whatUrdu: 'draw() Circle version chalta hai.', why: 'Dynamic dispatch picks the runtime object type.', whyUrdu: 'Dynamic dispatch runtime object type chunta hai.', concept: 'Dynamic dispatch' },
    ],
    trace: {
      note: 'Conceptual teaching steps — not a real JVM trace.',
      noteUrdu: 'Conceptual teaching steps — asal JVM trace nahi.',
      steps: [
        { id: 'pt1', title: 'Upcast happens', titleUrdu: 'Upcast hua', description: 'Shape s points to a Circle object.', descriptionUrdu: 'Shape s Circle object ki taraf point karta hai.', highlightLine: 17, conceptualState: { className: 'Circle', referenceName: 's', objectCreated: true } },
        { id: 'pt2', title: 'Virtual call dispatches', titleUrdu: 'Virtual call dispatch', description: 's.draw() looks up the runtime class first.', descriptionUrdu: 's.draw() pehle runtime class dekhta hai.', highlightLine: 18, conceptualState: { className: 'Circle', referenceName: 's', methodBeingCalled: 'draw' } },
        { id: 'pt3', title: 'Overridden body runs', titleUrdu: 'Overridden body chali', description: 'Circle.draw() prints its message.', descriptionUrdu: 'Circle.draw() apna message print karta hai.', highlightLine: 10, conceptualState: { className: 'Circle', methodBeingCalled: 'draw', outputLines: ['Drawing circle'] } },
      ],
    },
  },
  {
    id: 'cs-ex-08',
    title: 'Abstract Class Shape',
    titleUrdu: 'Abstract Class Shape',
    category: 'abstraction',
    topic: 'abstract class',
    difficulty: 'medium',
    filename: 'AbstractShape.java',
    code: `abstract class Shape {
    abstract double area();

    void describe() {
        System.out.println("Shape with area " + area());
    }
}

class Square extends Shape {
    double side;
    Square(double s) { side = s; }
    double area() { return side * side; }
}

public class Main {
    public static void main(String[] args) {
        Shape sh = new Square(4);
        sh.describe();
    }
}`,
    expectedOutput: ['Shape with area 16.0'],
    keyConcept: 'Abstract classes define a contract (abstract methods) while allowing shared concrete methods.',
    keyConceptUrdu: 'Abstract classes contract (abstract methods) define karti hain aur shared concrete methods allow karti hain.',
    commonMistake: 'Trying to instantiate an abstract class directly.',
    commonMistakeUrdu: 'Abstract class ko directly instantiate karna.',
    relatedLessonId: 'lesson-07-01',
    relatedModuleId: 'module-07',
    lineExplanations: [
      { line: 1, what: 'Declares abstract class Shape.', whatUrdu: 'Abstract class Shape declare karta hai.', why: 'Cannot be instantiated; meant to be extended.', whyUrdu: 'Instantiate nahi ho sakti; extend ke liye hai.', concept: 'abstract class' },
      { line: 2, what: 'Abstract method area() has no body.', whatUrdu: 'Abstract method area() ke paas body nahi.', why: 'Subclasses must provide an implementation.', whyUrdu: 'Subclasses implementation deni hogi.', concept: 'abstract method' },
      { line: 5, what: 'Concrete describe() reuses area().', whatUrdu: 'Concrete describe() area() reuse karta hai.', why: 'Shared behavior lives in the abstract parent.', whyUrdu: 'Shared behavior abstract parent mein hoti hai.', concept: 'Template method idea' },
      { line: 17, what: 'Square instance used as Shape.', whatUrdu: 'Square instance Shape ki tarah use hua.', why: 'Abstraction lets callers depend on the contract.', whyUrdu: 'Abstraction callers ko contract par depend karne deti hai.', concept: 'Polymorphism' },
    ],
  },
];
