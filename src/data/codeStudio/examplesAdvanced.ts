import type { JavaCodeExample } from '@/types/codeStudio';

export const ADVANCED_EXAMPLES: JavaCodeExample[] = [
  {
    id: 'cs-ex-09',
    title: 'Interface Payable',
    titleUrdu: 'Interface Payable',
    category: 'interfaces',
    topic: 'implements',
    difficulty: 'medium',
    filename: 'Payable.java',
    code: `interface Payable {
    double pay();
}

class Employee implements Payable {
    double salary;
    Employee(double s) { salary = s; }
    public double pay() { return salary; }
}

public class Main {
    public static void main(String[] args) {
        Payable p = new Employee(4000);
        System.out.println(p.pay());
    }
}`,
    expectedOutput: ['4000.0'],
    keyConcept: 'Interfaces define a pure contract; classes implement them.',
    keyConceptUrdu: 'Interfaces pure contract define karti hain; classes unhein implement karti hain.',
    commonMistake: 'Forgetting that interface methods are public by default.',
    commonMistakeUrdu: 'Bhool jana ke interface methods by default public hote hain.',
    relatedLessonId: 'lesson-08-01',
    relatedModuleId: 'module-08',
    lineExplanations: [
      { line: 1, what: 'Declares interface Payable.', whatUrdu: 'Interface Payable declare karta hai.', why: 'Interfaces specify capability without state design.', whyUrdu: 'Interfaces state design ke baghair capability batate hain.', concept: 'Interface' },
      { line: 2, what: 'Contract method pay() declared.', whatUrdu: 'Contract method pay() declare hui.', why: 'Implementers must provide pay().', whyUrdu: 'Implementers pay() dena hoga.', concept: 'Contract' },
      { line: 5, what: 'Employee implements Payable.', whatUrdu: 'Employee Payable implement karta hai.', why: 'implements fulfills the interface contract.', whyUrdu: 'implements interface contract pura karta hai.', concept: 'implements' },
      { line: 8, what: 'pay() must be public.', whatUrdu: 'pay() public hona chahiye.', why: 'Narrowing visibility of interface methods is illegal.', whyUrdu: 'Interface methods ki visibility narrow karna illegal hai.', concept: 'Access rule' },
    ],
  },
  {
    id: 'cs-ex-10',
    title: 'this and super Keyword',
    titleUrdu: 'this aur super Keyword',
    category: 'this-super',
    topic: 'this / super',
    difficulty: 'medium',
    filename: 'Person.java',
    code: `class Person {
    String name;
    Person(String name) {
        this.name = name;
    }
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
    expectedOutput: ['Noor 7'],
    keyConcept: 'this refers to the current object; super calls the parent constructor.',
    keyConceptUrdu: 'this current object ko refer karta hai; super parent constructor call karta hai.',
    commonMistake: 'Calling super() after using this or referencing fields before super().',
    commonMistakeUrdu: 'super() ko this ke baad call karna ya super se pehle fields use karna.',
    relatedLessonId: 'lesson-09-01',
    relatedModuleId: 'module-09',
    lineExplanations: [
      { line: 4, what: 'this.name = name sets the field on this object.', whatUrdu: 'this.name = name is object par field set karta hai.', why: 'Disambiguates field from parameter when names match.', whyUrdu: 'Naam match karne par field aur parameter alag karta hai.', concept: 'this' },
      { line: 10, what: 'super(name) runs Person constructor first.', whatUrdu: 'super(name) pehle Person constructor chalata hai.', why: 'Parent initialization must happen before child work.', whyUrdu: 'Parent initialization child work se pehle honi chahiye.', concept: 'super' },
      { line: 11, what: 'this.roll = roll sets child field.', whatUrdu: 'this.roll = roll child field set karta hai.', why: 'Uses this after parent construction is done.', whyUrdu: 'Parent construction ke baad this use hota hai.', concept: 'this' },
    ],
  },
  {
    id: 'cs-ex-11',
    title: 'static and final',
    titleUrdu: 'static aur final',
    category: 'static-final',
    topic: 'Class members vs constants',
    difficulty: 'medium',
    filename: 'Config.java',
    code: `class Config {
    static final String APP_NAME = "OOP Universe";
    static int count = 0;

    Config() {
        count++;
    }
}

public class Main {
    public static void main(String[] args) {
        new Config();
        new Config();
        System.out.println(Config.APP_NAME + " count=" + Config.count);
    }
}`,
    expectedOutput: ['OOP Universe count=2'],
    keyConcept: 'static members belong to the class; final constants cannot be reassigned.',
    keyConceptUrdu: 'static members class ke hote hain; final constants reassign nahi ho sakte.',
    commonMistake: 'Accessing static fields through an instance as if they were unique per object.',
    commonMistakeUrdu: 'Static fields ko instance ke through object-unique samajhna.',
    relatedLessonId: 'lesson-10-01',
    relatedModuleId: 'module-10',
    lineExplanations: [
      { line: 2, what: 'static final APP_NAME is a class constant.', whatUrdu: 'static final APP_NAME class constant hai.', why: 'Shared once; cannot be reassigned.', whyUrdu: 'Ek baar share hoti hai; reassign nahi ho sakti.', concept: 'final constant' },
      { line: 3, what: 'static count is shared across all objects.', whatUrdu: 'static count sab objects ke darmiyan shared hai.', why: 'One copy for the class, not per instance.', whyUrdu: 'Class ke liye ek copy, per instance nahi.', concept: 'static' },
      { line: 6, what: 'Each constructor call increments count.', whatUrdu: 'Har constructor call count barhata hai.', why: 'Shows shared static state changing over time.', whyUrdu: 'Shared static state ka badalna dikhata hai.', concept: 'Shared state' },
    ],
  },
  {
    id: 'cs-ex-12',
    title: 'toString and equals',
    titleUrdu: 'toString aur equals',
    category: 'object-class',
    topic: 'java.lang.Object',
    difficulty: 'medium',
    filename: 'Book.java',
    code: `class Book {
    String title;
    Book(String t) { title = t; }

    @Override
    public String toString() {
        return "Book[" + title + "]";
    }

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
        System.out.println(a);
        System.out.println(a.equals(b));
    }
}`,
    expectedOutput: ['Book[Clean Code]', 'true'],
    keyConcept: 'Override toString() for readable output and equals() for value comparison.',
    keyConceptUrdu: 'Readable output ke liye toString() aur value comparison ke liye equals() override karein.',
    commonMistake: 'Comparing objects with == instead of equals().',
    commonMistakeUrdu: 'Objects ko equals() ki jagah == se compare karna.',
    relatedLessonId: 'lesson-11-01',
    relatedModuleId: 'module-11',
    lineExplanations: [
      { line: 5, what: 'toString() override provides friendly print text.', whatUrdu: 'toString() override friendly print text deta hai.', why: 'System.out.println(obj) uses toString().', whyUrdu: 'System.out.println(obj) toString() use karta hai.', concept: 'toString' },
      { line: 10, what: 'equals(Object) defines value equality.', whatUrdu: 'equals(Object) value equality define karta hai.', why: 'Two distinct books with same title compare equal.', whyUrdu: 'Do alag books same title se equal hoti hain.', concept: 'equals' },
      { line: 11, what: 'instanceof guards wrong types.', whatUrdu: 'instanceof ghalat type se bachata hai.', why: 'Prevents ClassCastException and false equals.', whyUrdu: 'ClassCastException aur false equals se bachata hai.', concept: 'instanceof' },
    ],
  },
  {
    id: 'cs-ex-13',
    title: 'Composition Has-A',
    titleUrdu: 'Composition Has-A',
    category: 'relationships',
    topic: 'Composition over inheritance',
    difficulty: 'medium',
    filename: 'Engine.java',
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
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car();
        car.drive();
    }
}`,
    expectedOutput: ['Engine started', 'Car driving'],
    keyConcept: 'Composition models has-a: Car has an Engine.',
    keyConceptUrdu: 'Composition has-a model karta hai: Car ke paas Engine hai.',
    commonMistake: 'Using inheritance for every relationship instead of composition.',
    commonMistakeUrdu: 'Har relationship ke liye inheritance use karna composition ki jagah.',
    relatedLessonId: 'lesson-12-01',
    relatedModuleId: 'module-12',
    lineExplanations: [
      { line: 8, what: 'Car holds an Engine instance.', whatUrdu: 'Car ek Engine instance rakhta hai.', why: 'Field holding another object = has-a association.', whyUrdu: 'Doosra object rakhna field = has-a association.', concept: 'Composition' },
      { line: 11, what: 'drive() delegates to engine.start().', whatUrdu: 'drive() engine.start() par depend karta hai.', why: 'Car reuses Engine behavior instead of inheriting it.', whyUrdu: 'Car Engine behavior inherit karne ki jagah reuse karta hai.', concept: 'Delegation' },
    ],
  },
  {
    id: 'cs-ex-14',
    title: 'try-catch Basics',
    titleUrdu: 'try-catch Basics',
    category: 'exceptions',
    topic: 'Exception handling',
    difficulty: 'easy',
    filename: 'SafeDivide.java',
    code: `public class SafeDivide {
    public static void main(String[] args) {
        int a = 10;
        int b = 0;
        try {
            int r = a / b;
            System.out.println(r);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero");
        } finally {
            System.out.println("Done");
        }
    }
}`,
    expectedOutput: ['Cannot divide by zero', 'Done'],
    keyConcept: 'try-catch intercepts exceptions; finally always runs afterward.',
    keyConceptUrdu: 'try-catch exceptions intercept karta hai; finally hamesha chalta hai.',
    commonMistake: 'Putting catch after the wrong try scope so exceptions escape.',
    commonMistakeUrdu: 'Ghalat try scope ke baad rakhna taake exceptions bach jayen.',
    relatedLessonId: 'lesson-13-01',
    relatedModuleId: 'module-13',
    lineExplanations: [
      { line: 5, what: 'try block contains risky division.', whatUrdu: 'try block mein risky division hai.', why: 'Statements that may throw go inside try.', whyUrdu: 'Jo statements throw kar sakti hain try mein jate hain.', concept: 'try' },
      { line: 8, what: 'catch handles ArithmeticException.', whatUrdu: 'catch ArithmeticException handle karta hai.', why: 'Control jumps here when divide-by-zero occurs.', whyUrdu: 'Divide-by-zero hone par control yahan aata hai.', concept: 'catch' },
      { line: 10, what: 'finally runs whether or not exception happened.', whatUrdu: 'finally exception ho ya na ho chalta hai.', why: 'Cleanup code belongs in finally.', whyUrdu: 'Cleanup code finally mein hota hai.', concept: 'finally' },
    ],
    trace: {
      note: 'Conceptual teaching steps — not a real JVM trace.',
      noteUrdu: 'Conceptual teaching steps — asal JVM trace nahi.',
      steps: [
        { id: 'et1', title: 'Enter try', titleUrdu: 'try mein enter', description: 'a/b is about to execute with b = 0.', descriptionUrdu: 'a/b b = 0 ke sath chalne wala hai.', highlightLine: 5, conceptualState: { methodBeingCalled: 'main' } },
        { id: 'et2', title: 'ArithmeticException thrown', titleUrdu: 'ArithmeticException throw', description: 'Division by zero raises an exception.', descriptionUrdu: 'Zero se division exception raise karti hai.', highlightLine: 6, conceptualState: { methodBeingCalled: 'main' } },
        { id: 'et3', title: 'Catch handles it', titleUrdu: 'Catch ne sambhala', description: 'Catch block prints the friendly message.', descriptionUrdu: 'Catch block friendly message print karta hai.', highlightLine: 8, conceptualState: { methodBeingCalled: 'catch', outputLines: ['Cannot divide by zero'] } },
        { id: 'et4', title: 'finally runs', titleUrdu: 'finally chala', description: 'Cleanup message is always printed.', descriptionUrdu: 'Cleanup message hamesha print hota hai.', highlightLine: 10, conceptualState: { methodBeingCalled: 'finally', outputLines: ['Cannot divide by zero', 'Done'] } },
      ],
    },
  },
  {
    id: 'cs-ex-15',
    title: 'ArrayList Basics',
    titleUrdu: 'ArrayList Basics',
    category: 'collections',
    topic: 'List API',
    difficulty: 'easy',
    filename: 'Names.java',
    code: `import java.util.ArrayList;

public class Names {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();
        names.add("Ali");
        names.add("Sara");
        System.out.println(names.size());
        System.out.println(names.get(0));
    }
}`,
    expectedOutput: ['2', 'Ali'],
    keyConcept: 'ArrayList is a resizable list backed by an array.',
    keyConceptUrdu: 'ArrayList array-backed resizable list hai.',
    commonMistake: 'Using .length on a List instead of .size().',
    commonMistakeUrdu: 'List par .length use karna .size() ki jagah.',
    relatedLessonId: 'lesson-14-01',
    relatedModuleId: 'module-14',
    lineExplanations: [
      { line: 1, what: 'Imports ArrayList from java.util.', whatUrdu: 'java.util se ArrayList import karta hai.', why: 'Collections live in the standard library packages.', whyUrdu: 'Collections standard library packages mein hain.', concept: 'Import' },
      { line: 5, what: 'Creates an empty ArrayList of String.', whatUrdu: 'String ka khali ArrayList banata hai.', why: 'Generics <String> restrict element type.', whyUrdu: 'Generics <String> element type restrict karte hain.', concept: 'Generics' },
      { line: 7, what: 'size() returns element count.', whatUrdu: 'size() element count deta hai.', why: 'Lists use size(), arrays use length.', whyUrdu: 'List size() use karti hai, array length.', concept: 'size()' },
      { line: 8, what: 'get(0) returns the first element.', whatUrdu: 'get(0) pehla element deta hai.', why: 'List indexes start at 0.', whyUrdu: 'List ke indexes 0 se shuru hote hain.', concept: 'Index access' },
    ],
  },
  {
    id: 'cs-ex-16',
    title: 'Single Responsibility (SOLID S)',
    titleUrdu: 'Single Responsibility (SOLID S)',
    category: 'solid',
    topic: 'SRP',
    difficulty: 'medium',
    filename: 'Report.java',
    code: `class Report {
    String content;
    Report(String c) { content = c; }
}

class ReportPrinter {
    void print(Report r) {
        System.out.println("PRINT: " + r.content);
    }
}

public class Main {
    public static void main(String[] args) {
        Report report = new Report("Q1 Results");
        ReportPrinter printer = new ReportPrinter();
        printer.print(report);
    }
}`,
    expectedOutput: ['PRINT: Q1 Results'],
    keyConcept: 'Single Responsibility: each class has one reason to change.',
    keyConceptUrdu: 'Single Responsibility: har class ka ek change hone ki wajah ho.',
    commonMistake: 'Putting data, formatting, and printing in one god class.',
    commonMistakeUrdu: 'Data, formatting, aur printing sab ek god class mein rakhna.',
    relatedLessonId: 'lesson-15-01',
    relatedModuleId: 'module-15',
    lineExplanations: [
      { line: 1, what: 'Report holds data only.', whatUrdu: 'Report sirf data rakhta hai.', why: 'One responsibility: modeling report content.', whyUrdu: 'Ek zimmedari: report content model karna.', concept: 'SRP' },
      { line: 7, what: 'ReportPrinter handles output only.', whatUrdu: 'ReportPrinter sirf output sambhalta hai.', why: 'Separate reason to change: printing format.', whyUrdu: 'Alag change ki wajah: printing format.', concept: 'SRP' },
      { line: 14, what: 'Main composes the two collaborating objects.', whatUrdu: 'Main dono collaborating objects compose karta hai.', why: 'Clients orchestrate small focused classes.', whyUrdu: 'Clients chhoti focused classes orchestrate karti hain.', concept: 'Composition' },
    ],
  },
];
