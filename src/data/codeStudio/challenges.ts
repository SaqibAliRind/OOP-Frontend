import type {
  OutputPredictionChallenge,
  CodeCompletionChallenge,
  CodeAnalysisChallenge,
  StudioDebugChallenge,
} from '@/types/codeStudio';

export const PREDICTION_CHALLENGES: OutputPredictionChallenge[] = [
  {
    id: 'cs-pred-01',
    exampleId: 'cs-ex-03',
    code: `class Student {
    String name;
    int roll;
    void display() {
        System.out.println(name + " #" + roll);
    }
}
public class Main {
    public static void main(String[] args) {
        Student s1 = new Student();
        s1.display();
    }
}`,
    options: ['null #0', 'Exception', 'null #null', 'Blank line'],
    correctOutput: 'null #0',
    explanation: 'Fresh objects get default field values: reference fields are null, int fields are 0.',
    explanationUrdu: 'Naye objects ko default field values milti hain: reference null, int 0.',
    difficulty: 'easy',
    conceptTested: 'Default field values',
    lessonId: 'lesson-02-01',
  },
  {
    id: 'cs-pred-02',
    exampleId: 'cs-ex-07',
    code: `class Shape {
    void draw() { System.out.println("Drawing shape"); }
}
class Circle extends Shape {
    @Override
    void draw() { System.out.println("Drawing circle"); }
}
public class Main {
    public static void main(String[] args) {
        Shape s = new Circle();
        s.draw();
    }
}`,
    options: ['Drawing shape', 'Drawing circle', 'Both lines', 'Compilation error'],
    correctOutput: 'Drawing circle',
    explanation: 'The runtime object is Circle, so the overridden draw() runs via dynamic dispatch.',
    explanationUrdu: 'Runtime object Circle hai, is liye overridden draw() dynamic dispatch se chalta hai.',
    difficulty: 'medium',
    conceptTested: 'Dynamic dispatch',
    lessonId: 'lesson-06-01',
  },
  {
    id: 'cs-pred-03',
    exampleId: 'cs-ex-14',
    code: `public class Main {
    public static void main(String[] args) {
        try {
            int r = 10 / 0;
            System.out.println(r);
        } catch (ArithmeticException e) {
            System.out.println("caught");
        } finally {
            System.out.println("finally");
        }
    }
}`,
    options: ['caught then finally', 'finally only', 'caught only', '0 then finally'],
    correctOutput: 'caught then finally',
    explanation: 'Division by zero throws, catch prints first, then finally always runs.',
    explanationUrdu: 'Zero se division throw karta hai, pehle catch print, phir finally hamesha chalta hai.',
    difficulty: 'easy',
    conceptTested: 'try-catch-finally order',
    lessonId: 'lesson-13-01',
  },
  {
    id: 'cs-pred-04',
    exampleId: 'cs-ex-11',
    code: `class Config {
    static int count = 0;
    Config() { count++; }
}
public class Main {
    public static void main(String[] args) {
        new Config();
        new Config();
        new Config();
        System.out.println(Config.count);
    }
}`,
    options: ['1', '2', '3', '0'],
    correctOutput: '3',
    explanation: 'count is static — one shared copy — incremented once per object construction.',
    explanationUrdu: 'count static hai — ek shared copy — har object construction par ek baar barhta hai.',
    difficulty: 'medium',
    conceptTested: 'static shared state',
    lessonId: 'lesson-10-01',
  },
  {
    id: 'cs-pred-05',
    exampleId: 'cs-ex-12',
    code: `class Book {
    String title;
    Book(String t) { title = t; }
    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Book)) return false;
        return title.equals(((Book) o).title);
    }
}
public class Main {
    public static void main(String[] args) {
        Book a = new Book("Clean Code");
        Book b = new Book("Clean Code");
        System.out.println(a.equals(b));
    }
}`,
    options: ['true', 'false', 'Compilation error', 'Exception'],
    correctOutput: 'true',
    explanation: 'equals() is overridden for value equality; both titles match.',
    explanationUrdu: 'equals() value equality ke liye override hua hai; dono titles match karte hain.',
    difficulty: 'medium',
    conceptTested: 'equals override',
    lessonId: 'lesson-11-01',
  },
  {
    id: 'cs-pred-06',
    exampleId: 'cs-ex-15',
    code: `import java.util.ArrayList;
public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();
        names.add("Ali");
        names.add("Sara");
        names.remove(0);
        System.out.println(names.size() + " " + names.get(0));
    }
}`,
    options: ['2 Ali', '1 Sara', '1 Ali', '2 Sara'],
    correctOutput: '1 Sara',
    explanation: 'remove(0) deletes Ali; only Sara remains, so size is 1.',
    explanationUrdu: 'remove(0) Ali delete karta hai; sirf Sara bachti hai, size 1.',
    difficulty: 'easy',
    conceptTested: 'ArrayList remove',
    lessonId: 'lesson-14-01',
  },
  {
    id: 'cs-pred-07',
    exampleId: 'cs-ex-05',
    code: `class Account {
    private double balance;
    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
    public double getBalance() { return balance; }
}
public class Main {
    public static void main(String[] args) {
        Account a = new Account();
        a.deposit(-50);
        a.deposit(100);
        System.out.println(a.getBalance());
    }
}`,
    options: ['50.0', '-50.0', '100.0', '0.0'],
    correctOutput: '100.0',
    explanation: 'deposit(-50) is ignored by the guard; only +100 applies.',
    explanationUrdu: 'deposit(-50) guard ignore karta hai; sirf +100 lagta hai.',
    difficulty: 'easy',
    conceptTested: 'Encapsulation invariant',
    lessonId: 'lesson-04-01',
  },
  {
    id: 'cs-pred-08',
    exampleId: 'cs-ex-10',
    code: `class Person {
    String name;
    Person(String name) { this.name = name; }
}
class Student extends Person {
    int roll;
    Student(String name, int roll) {
        super(name);
        this.roll = roll;
    }
}
public class Main {
    public static void main(String[] args) {
        Student s = new Student("Noor", 7);
        System.out.println(s.name + " " + s.roll);
    }
}`,
    options: ['Noor 7', 'null 7', 'Noor 0', 'Compilation error'],
    correctOutput: 'Noor 7',
    explanation: 'super(name) initializes Person.name before this.roll is set.',
    explanationUrdu: 'super(name) this.roll set hone se pehle Person.name initialize karta hai.',
    difficulty: 'medium',
    conceptTested: 'super constructor chain',
    lessonId: 'lesson-09-01',
  },
];

export const COMPLETION_CHALLENGES: CodeCompletionChallenge[] = [
  {
    id: 'cs-comp-01',
    exampleId: 'cs-ex-03',
    codeTemplate: `class Student {
    String name;
    int roll;

    void display() {
        System.out.println(name + " #" + roll);
    }
}

public class Main {
    public static void main(String[] args) {
        __________ s1 = new Student();
        s1.name = "Hamza";
        s1.display();
    }
}`,
    blankLabel: 'reference type',
    choices: ['Student', 'Object', 'String', 'void'],
    correctChoice: 'Student',
    requirement: 'Declare s1 so it can hold a Student object.',
    requirementUrdu: 's1 aise declare karein jo Student object rakh sake.',
    explanation: 'The variable must be typed as the class (or a supertype) it stores.',
    explanationUrdu: 'Variable us class (ya supertype) ke type ka hona chahiye jo woh store karta hai.',
    hints: ['Look at what new returns on the right-hand side.', 'The left side should name the class being constructed.'],
    difficulty: 'easy',
    conceptTested: 'Reference declaration',
  },
  {
    id: 'cs-comp-02',
    exampleId: 'cs-ex-04',
    codeTemplate: `class Car {
    String brand;

    __________() {
        brand = "Unknown";
        System.out.println("Car created: " + brand);
    }
}

public class Main {
    public static void main(String[] args) {
        Car c = new Car();
    }
}`,
    blankLabel: 'constructor name',
    choices: ['Car', 'car', 'init', 'void Car'],
    correctChoice: 'Car',
    requirement: 'Complete the constructor so new Car() works.',
    requirementUrdu: 'Constructor complete karein taake new Car() chale.',
    explanation: 'Constructors must have exactly the class name and no return type.',
    explanationUrdu: 'Constructors ka naam bilkul class jaisa hona chahiye aur return type nahi hota.',
    hints: ['A constructor name matches the class name exactly.', 'Constructors never include a return type.'],
    difficulty: 'easy',
    conceptTested: 'Constructor naming',
  },
  {
    id: 'cs-comp-03',
    exampleId: 'cs-ex-05',
    codeTemplate: `class Account {
    __________ double balance;

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    public double getBalance() {
        return balance;
    }
}`,
    blankLabel: 'access modifier',
    choices: ['private', 'public', 'static', 'protected'],
    correctChoice: 'private',
    requirement: 'Hide balance so only Account methods can change it.',
    requirementUrdu: 'balance chupein taake sirf Account methods badal sakein.',
    explanation: 'private fields enforce encapsulation; outsiders must use deposit()/getBalance().',
    explanationUrdu: 'private fields encapsulation lagate hain; bahar se deposit()/getBalance() zaroori hain.',
    hints: ['Which modifier blocks all access from other classes?', 'Encapsulation starts with this modifier on fields.'],
    difficulty: 'easy',
    conceptTested: 'Encapsulation',
  },
  {
    id: 'cs-comp-04',
    exampleId: 'cs-ex-06',
    codeTemplate: `class Animal {
    void eat() {
        System.out.println("Animal eats");
    }
}

class Dog __________ Animal {
    void bark() {
        System.out.println("Dog barks");
    }
}`,
    blankLabel: 'inheritance keyword',
    choices: ['extends', 'implements', 'inherits', ':'],
    correctChoice: 'extends',
    requirement: 'Make Dog inherit eat() from Animal.',
    requirementUrdu: 'Dog se Animal ka eat() inherit karwayein.',
    explanation: 'extends establishes class inheritance; implements is for interfaces.',
    explanationUrdu: 'extends class inheritance banata hai; implements interfaces ke liye hai.',
    hints: ['Which keyword is used for class-to-class inheritance?', 'Interfaces use a different keyword.'],
    difficulty: 'easy',
    conceptTested: 'Inheritance syntax',
  },
  {
    id: 'cs-comp-05',
    exampleId: 'cs-ex-07',
    codeTemplate: `class Shape {
    void draw() {
        System.out.println("Drawing shape");
    }
}

class Circle extends Shape {
    @Override
    __________ void draw() {
        System.out.println("Drawing circle");
    }
}`,
    blankLabel: 'visibility (optional but conventional)',
    choices: ['(leave default)', 'private', 'static', 'final'],
    correctChoice: '(leave default)',
    requirement: 'Keep draw() overridable with the same package-visible access as the parent.',
    requirementUrdu: 'draw() ko parent ke sath package-visible access ke sath overridable rakhein.',
    explanation: 'You cannot reduce visibility when overriding; package default matches Shape.draw().',
    explanationUrdu: 'Override mein visibility reduce nahi kar sakte; package default Shape.draw() se match karta hai.',
    hints: ['Overriding cannot make access more restrictive.', 'private would hide it instead of overriding.'],
    difficulty: 'medium',
    conceptTested: 'Override access rules',
  },
  {
    id: 'cs-comp-06',
    exampleId: 'cs-ex-09',
    codeTemplate: `interface Payable {
    double pay();
}

class Employee __________ Payable {
    double salary;
    Employee(double s) { salary = s; }
    public double pay() { return salary; }
}`,
    blankLabel: 'interface keyword',
    choices: ['implements', 'extends', 'inherits', 'using'],
    correctChoice: 'implements',
    requirement: 'Connect Employee to the Payable contract.',
    requirementUrdu: 'Employee ko Payable contract se jorein.',
    explanation: 'Classes implement interfaces; only a class can extend another class.',
    explanationUrdu: 'Classes interfaces implement karti hain; sirf class doosri class extend kar sakti hai.',
    hints: ['Interfaces are not classes.', 'Use the keyword that means "fulfill this contract".'],
    difficulty: 'easy',
    conceptTested: 'implements',
  },
  {
    id: 'cs-comp-07',
    exampleId: 'cs-ex-14',
    codeTemplate: `public class Main {
    public static void main(String[] args) {
        __________ {
            int r = 10 / 0;
            System.out.println(r);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero");
        }
    }
}`,
    blankLabel: 'try block opener',
    choices: ['try', 'do', 'catch', 'throw'],
    correctChoice: 'try',
    requirement: 'Open the block that may throw before catch handles it.',
    requirementUrdu: 'Us block ko kholein jo throw kar sakta hai, catch se pehle.',
    explanation: 'Risky statements go in try; catch follows to handle the exception.',
    explanationUrdu: 'Risky statements try mein jate hain; exception handle karne ke liye catch aata hai.',
    hints: ['Which block wraps potentially failing code?', 'catch cannot appear first without a preceding try.'],
    difficulty: 'easy',
    conceptTested: 'try-catch structure',
  },
  {
    id: 'cs-comp-08',
    exampleId: 'cs-ex-15',
    codeTemplate: `import java.util.ArrayList;
public class Names {
    public static void main(String[] args) {
        ArrayList<String> names = new __________<>();
        names.add("Ali");
        System.out.println(names.__________());
    }
}`,
    blankLabel: 'constructor + size method',
    choices: ['ArrayList / size', 'ArrayList / length', 'List / length', 'Array / size'],
    correctChoice: 'ArrayList / size',
    requirement: 'Create the list and print how many elements it has.',
    requirementUrdu: 'List banayein aur uske elements kitne hain print karein.',
    explanation: 'You construct an ArrayList and query size() — Lists do not use .length.',
    explanationUrdu: 'ArrayList banate hain aur size() puchte hain — List .length use nahi karti.',
    hints: ['new needs the concrete class name.', 'Arrays have length; collections have size().'],
    difficulty: 'medium',
    conceptTested: 'ArrayList API',
  },
];

export const ANALYSIS_CHALLENGES: CodeAnalysisChallenge[] = [
  {
    id: 'cs-an-01',
    exampleId: 'cs-ex-03',
    code: `class Student {
    String name;
    int roll;
    void display() {
        System.out.println(name + " #" + roll);
    }
}
public class Main {
    public static void main(String[] args) {
        Student s1 = new Student();
        Student s2 = new Student();
        s1.name = "Hamza";
        System.out.println(s2.name);
    }
}`,
    question: 'What does System.out.println(s2.name) print and why?',
    questionUrdu: 'System.out.println(s2.name) kya print karta hai aur kyun?',
    options: ['null — s2 was never given a name', 'Hamza — fields are shared', 'Empty string', 'Compilation error'],
    correctIndex: 0,
    explanation: 'Each object has its own name field; s2.name was never assigned, so it is null.',
    explanationUrdu: 'Har object ka apna name field hai; s2.name assign nahi hua, is liye null.',
    difficulty: 'easy',
    conceptTested: 'Per-object state',
  },
  {
    id: 'cs-an-02',
    exampleId: 'cs-ex-07',
    code: `class Shape {
    void draw() { System.out.println("Drawing shape"); }
}
class Circle extends Shape {
    @Override
    void draw() { System.out.println("Drawing circle"); }
}
class Square extends Shape {
    @Override
    void draw() { System.out.println("Drawing square"); }
}
public class Main {
    public static void main(String[] args) {
        Shape[] shapes = { new Circle(), new Square() };
        for (Shape s : shapes) {
            s.draw();
        }
    }
}`,
    question: 'Why does the loop print different messages for each element?',
    questionUrdu: 'Loop har element ke liye alag message kyun print karta hai?',
    options: [
      'Because each element’s runtime type selects its own draw()',
      'Because the array changes draw() automatically',
      'Because draw() is static',
      'It actually always prints "Drawing shape"',
    ],
    correctIndex: 0,
    explanation: 'Polymorphism dispatches on the runtime object, not the Shape reference type.',
    explanationUrdu: 'Polymorphism Shape reference ki jagah runtime object par dispatch hoti hai.',
    difficulty: 'medium',
    conceptTested: 'Runtime polymorphism',
  },
  {
    id: 'cs-an-03',
    exampleId: 'cs-ex-05',
    code: `class Account {
    private double balance;
    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
    public double getBalance() {
        return balance;
    }
}
// somewhere else in the project:
// account.balance = -1000;`,
    question: 'Why would account.balance = -1000 fail to compile from another class?',
    questionUrdu: 'Doosri class se account.balance = -1000 compile kyun nahi hoga?',
    options: [
      'balance is private — only Account methods may access it',
      'balance is static',
      'Doubles cannot be assigned like that',
      'The project forbids assignments',
    ],
    correctIndex: 0,
    explanation: 'private restricts access to the declaring class; encapsulation is doing its job.',
    explanationUrdu: 'private access sirf declaring class tak seemit hai; encapsulation kaam kar raha hai.',
    difficulty: 'easy',
    conceptTested: 'Access control',
  },
  {
    id: 'cs-an-04',
    exampleId: 'cs-ex-13',
    code: `class Engine {
    void start() {
        System.out.println("Engine started");
    }
}
class Car {
    Engine engine = new Engine();
    void drive() {
        engine.start();
        System.out.println("Car driving");
    }
}`,
    question: 'Which relationship does Car–Engine model, and why?',
    questionUrdu: 'Car–Engine kaunsi relationship model karta hai, aur kyun?',
    options: [
      'has-a (composition) — Car owns an Engine instance',
      'is-a (inheritance) — Car is an Engine',
      'uses static — Engine is shared globally',
      'interface realization — Car implements Engine',
    ],
    correctIndex: 0,
    explanation: 'A field holding another object expresses has-a; extends would express is-a.',
    explanationUrdu: 'Doosra object rakhne wali field has-a hoti hai; extends is-a hoti.',
    difficulty: 'easy',
    conceptTested: 'Composition vs inheritance',
  },
  {
    id: 'cs-an-05',
    exampleId: 'cs-ex-08',
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
    question: 'describe() is never overridden in Square — why does it still print 16.0?',
    questionUrdu: 'describe() Square mein override nahi hai — phir 16.0 kyun print hota hai?',
    options: [
      'describe() is concrete in Shape and calls the subclass area() via the contract',
      'describe() is abstract and Square generated it',
      'area() is static, so it is resolved at compile time only',
      'It would print 0.0 for abstract parents',
    ],
    correctIndex: 0,
    explanation: 'Shared concrete methods rely on the abstract contract; area() runs Square’s implementation.',
    explanationUrdu: 'Shared concrete methods contract par rely karti hain; area() Square ki implementation chalata hai.',
    difficulty: 'medium',
    conceptTested: 'Template method via abstract contract',
  },
];

export const DEBUG_CHALLENGES: StudioDebugChallenge[] = [
  {
    id: 'cs-dbg-01',
    category: 'missing-semicolon',
    title: 'Missing Semicolon',
    titleUrdu: 'Semicolon Missing',
    buggyCode: `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hi")
    }
}`,
    question: 'Identify the mistake. The program fails to compile.',
    questionUrdu: 'Ghalatī pehchanein. Program compile nahi ho raha.',
    hints: ['Look at the end of the print statement.', 'Every Java statement ends with a specific character.'],
    corrections: [
      'Add ";" after println("Hi")',
      'Change class name to match file',
      'Remove the string quotes',
    ],
    correctCorrectionIndex: 0,
    explanation: 'Java statements must end with a semicolon.',
    explanationUrdu: 'Java statements semicolon par khatam honi chahiye.',
    difficulty: 'easy',
    conceptTested: 'Syntax: semicolons',
    relatedDebugTopic: 'missing-semicolon',
  },
  {
    id: 'cs-dbg-02',
    category: 'constructor-name',
    title: 'Constructor Name Mismatch',
    titleUrdu: 'Constructor Ka Naam Ghalat',
    buggyCode: `class Car {
    String brand;

    car() {
        brand = "Unknown";
    }

    public static void main(String[] args) {
        Car c = new Car();
    }
}`,
    question: 'new Car() does not call the intended constructor. What is wrong?',
    questionUrdu: 'new Car() mansuba constructor call nahi karta. Kya ghalat hai?',
    hints: ['Compare the constructor name with the class name.', 'Java is case-sensitive.'],
    corrections: [
      'Rename car() to Car()',
      'Add void before car()',
      'Make brand public',
    ],
    correctCorrectionIndex: 0,
    explanation: 'Constructor names must match the class name exactly, including case.',
    explanationUrdu: 'Constructor ka naam case samet class se bilkul match karna chahiye.',
    difficulty: 'easy',
    conceptTested: 'Constructor naming',
    relatedDebugTopic: 'constructor-name',
  },
  {
    id: 'cs-dbg-03',
    category: 'private-access',
    title: 'Illegal Private Access',
    titleUrdu: 'Private Access Ghalat',
    buggyCode: `class Account {
    private double balance = 100;
}

public class Main {
    public static void main(String[] args) {
        Account a = new Account();
        System.out.println(a.balance);
    }
}`,
    question: 'Why does a.balance fail to compile?',
    questionUrdu: 'a.balance compile kyun nahi hota?',
    hints: ['Check the modifier on balance.', 'Who is allowed to touch private fields?'],
    corrections: [
      'Use a getter like getBalance() instead of a.balance',
      'Delete the private modifier from inside Main',
      'Make Main a subclass of Account',
    ],
    correctCorrectionIndex: 0,
    explanation: 'Private fields are inaccessible outside the class; expose them through methods.',
    explanationUrdu: 'Private fields class ke bahar inaccessible hain; methods se expose karein.',
    difficulty: 'easy',
    conceptTested: 'Encapsulation access rules',
    relatedDebugTopic: 'private-access',
  },
  {
    id: 'cs-dbg-04',
    category: 'bad-override',
    title: 'Broken Override',
    titleUrdu: 'Toota Hua Override',
    buggyCode: `class Animal {
    void eat() {
        System.out.println("Animal eats");
    }
}

class Dog extends Animal {
    void eat(String food) {
        System.out.println("Dog eats " + food);
    }
}`,
    question: 'Dog.eat(String) does not override Animal.eat(). Why?',
    questionUrdu: 'Dog.eat(String) Animal.eat() override nahi karta. Kyun?',
    hints: ['Overriding requires the same method signature.', 'Different parameters mean a different method.'],
    corrections: [
      'Change Dog.eat(String) to Dog.eat() with the same signature',
      'Add static to Animal.eat()',
      'Make Dog.eat private',
    ],
    correctCorrectionIndex: 0,
    explanation: 'Override needs identical name and parameter list; this is overload, not override.',
    explanationUrdu: 'Override ke liye naam aur parameters same hone chahiye; yeh overload hai, override nahi.',
    difficulty: 'medium',
    conceptTested: 'Overload vs override',
    relatedDebugTopic: 'bad-override',
  },
  {
    id: 'cs-dbg-05',
    category: 'missing-interface',
    title: 'Interface Not Implemented',
    titleUrdu: 'Interface Implement Nahi',
    buggyCode: `interface Payable {
    double pay();
}

class Employee implements Payable {
    double salary = 4000;
}`,
    question: 'What must Employee add so the class compiles?',
    questionUrdu: 'Class compile hone ke liye Employee ko kya add karna chahiye?',
    hints: ['An interface lists methods that must exist.', 'What method does Payable require?'],
    corrections: [
      'Add: public double pay() { return salary; }',
      'Add: double pay() { } with empty body only',
      'Delete the implements clause',
    ],
    correctCorrectionIndex: 0,
    explanation: 'All interface methods must be implemented with a valid body.',
    explanationUrdu: 'Sab interface methods valid body ke sath implement hone chahiye.',
    difficulty: 'easy',
    conceptTested: 'Interface contract fulfillment',
    relatedDebugTopic: 'missing-interface',
  },
  {
    id: 'cs-dbg-06',
    category: 'reference-usage',
    title: 'Assigning Wrong Type',
    titleUrdu: 'Ghalat Type Assign',
    buggyCode: `class Animal { }
class Dog extends Animal { }

public class Main {
    public static void main(String[] args) {
        Dog d = new Animal();
    }
}`,
    question: 'Dog d = new Animal() is invalid. What is the correct direction?',
    questionUrdu: 'Dog d = new Animal() invalid hai. Sahi direction kya hai?',
    hints: ['A subclass reference can point to a superclass object?', 'Actually reverse: which way can upcasting go?'],
    corrections: [
      'Use Animal a = new Dog(); (subclass instance, superclass reference)',
      'Use Dog d = new Dog(); only if Animal is not a class',
      'Cast with (Dog) on the class declaration',
    ],
    correctCorrectionIndex: 0,
    explanation: 'A Dog is an Animal (upcast OK); an Animal is not necessarily a Dog.',
    explanationUrdu: 'Dog Animal hai (upcast theek); Animal zaroori nahi ke Dog ho.',
    difficulty: 'medium',
    conceptTested: 'Upcasting rules',
    relatedDebugTopic: 'reference-usage',
  },
  {
    id: 'cs-dbg-07',
    category: 'exception-flow',
    title: 'Catch Never Reached',
    titleUrdu: 'Catch Kabhi Nahi Milta',
    buggyCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("before");
        catch (Exception e) {
            System.out.println("oops");
        }
        System.out.println("after");
    }
}`,
    question: 'What structural error prevents this from compiling?',
    questionUrdu: 'Yeh compile hone se kaunsi structural ghalatī rok rahi hai?',
    hints: ['catch cannot appear without a try.', 'Where should the risky code live?'],
    corrections: [
      'Wrap the code in a try { } block before catch',
      'Remove System.out.println("before")',
      'Change catch to finally only',
    ],
    correctCorrectionIndex: 0,
    explanation: 'catch must follow a try block; there is no try here.',
    explanationUrdu: 'catch ke sath try block hona chahiye; yahan try hai hi nahi.',
    difficulty: 'easy',
    conceptTested: 'try-catch structure',
    relatedDebugTopic: 'exception-flow',
  },
  {
    id: 'cs-dbg-08',
    category: 'collection-op',
    title: 'Wrong Collection Method',
    titleUrdu: 'Ghalat Collection Method',
    buggyCode: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("Ali");
        System.out.println(list.length);
    }
}`,
    question: 'list.length does not compile on an ArrayList. What should be used?',
    questionUrdu: 'ArrayList par list.length compile nahi hota. Kya use karna chahiye?',
    hints: ['Arrays and Lists differ in naming.', 'What method returns the number of elements?'],
    corrections: [
      'Use list.size()',
      'Use list.count()',
      'Use list.length() with parentheses only',
    ],
    correctCorrectionIndex: 0,
    explanation: 'ArrayList uses size(); .length is for arrays.',
    explanationUrdu: 'ArrayList size() use karti hai; .length arrays ke liye hai.',
    difficulty: 'easy',
    conceptTested: 'Collections API naming',
    relatedDebugTopic: 'collection-op',
  },
  {
    id: 'cs-dbg-09',
    category: 'missing-semicolon',
    title: 'Missing Semicolon After Field',
    titleUrdu: 'Field Ke Baad Semicolon Missing',
    buggyCode: `class Point {
    int x
    int y

    void move(int dx, int dy) {
        x += dx
        y += dy
    }
}`,
    question: 'Multiple statements are missing what terminator?',
    questionUrdu: 'Kai statements mein kaunsa terminator missing hai?',
    hints: ['Every field declaration and statement needs it.', 'It appears at the end of each line of code logic.'],
    corrections: [
      'Add ";" to each declaration and assignment statement',
      'Add "{}" after each line',
      'Replace newlines with commas',
    ],
    correctCorrectionIndex: 0,
    explanation: 'Field declarations and expression statements each end with a semicolon.',
    explanationUrdu: 'Field declarations aur expression statements semicolon par khatam hoti hain.',
    difficulty: 'easy',
    conceptTested: 'Syntax: semicolons',
    relatedDebugTopic: 'missing-semicolon',
  },
  {
    id: 'cs-dbg-10',
    category: 'private-access',
    title: 'Setter Validation Bypass',
    titleUrdu: 'Setter Validation Bypass',
    buggyCode: `class Player {
    private int health = 100;

    public void setHealth(int h) {
        health = h;
    }

    public int getHealth() {
        return health;
    }
}

public class Main {
    public static void main(String[] args) {
        Player p = new Player();
        p.setHealth(-50);
        System.out.println(p.getHealth());
    }
}`,
    question: 'setHealth allows invalid state. What encapsulation fix is missing?',
    questionUrdu: 'setHealth invalid state allow karta hai. Kaunsi encapsulation fix missing hai?',
    hints: ['Constructors and setters should guard values.', 'What did Account.deposit do with bad input?'],
    corrections: [
      'Validate h in setHealth (e.g., ignore or clamp values < 0)',
      'Make health public and remove setHealth',
      'Return -1 from getHealth instead',
    ],
    correctCorrectionIndex: 0,
    explanation: 'Controlled access means validating mutations inside the class, not blindly assigning.',
    explanationUrdu: 'Controlled access ka matlab class ke andar mutations validate karna, andha assign nahi.',
    difficulty: 'medium',
    conceptTested: 'Encapsulation invariants',
    relatedDebugTopic: 'private-access',
  },
];
