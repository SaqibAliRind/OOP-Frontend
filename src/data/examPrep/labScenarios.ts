import type { LabExamScenario } from '@/types/examPrep';

export const LAB_EXAM_SCENARIOS: LabExamScenario[] = [
  {
    id: 'lab-exam-01',
    title: 'Library Catalog System',
    titleUrdu: 'Library Catalog System',
    problemStatement:
      'Design a small library catalog. Create a Book class with title and author fields, a display() method, and a Library class that holds books in a list and can add and list them. Apply encapsulation and a simple constructor.',
    problemStatementUrdu:
      'Chhota library catalog design karein. Book class title aur author fields, display() method, aur Library class jo books list mein rakhe, add aur list kar sake. Encapsulation aur simple constructor lagayein.',
    requiredClasses: ['Book', 'Library'],
    requiredAttributes: ['Book.title', 'Book.author', 'Library.books'],
    requiredMethods: ['Book.display()', 'Library.addBook()', 'Library.listBooks()'],
    concepts: ['class', 'encapsulation', 'constructor', 'composition'],
    checkpoints: [
      {
        id: 'cp-1',
        label: 'Book class declares private title and author fields',
        labelUrdu: 'Book class mein private title aur author fields hon',
        requiredChoices: ['book-fields'],
      },
      {
        id: 'cp-2',
        label: 'Book has a constructor that initializes title and author',
        labelUrdu: 'Book ka constructor title aur author initialize kare',
        requiredChoices: ['book-ctor'],
      },
      {
        id: 'cp-3',
        label: 'Book.display() prints title and author',
        labelUrdu: 'Book.display() title aur author print kare',
        requiredChoices: ['book-display'],
      },
      {
        id: 'cp-4',
        label: 'Library holds a list of Book references (composition)',
        labelUrdu: 'Library Book references ki list rakhe (composition)',
        requiredChoices: ['lib-list'],
      },
      {
        id: 'cp-5',
        label: 'Library.addBook(Book b) adds without exposing the list directly',
        labelUrdu: 'Library.addBook(Book b) list baghair expose kiye add kare',
        requiredChoices: ['lib-add'],
      },
      {
        id: 'cp-6',
        label: 'Library.listBooks() iterates and displays each book',
        labelUrdu: 'Library.listBooks() har book iterate karke display kare',
        requiredChoices: ['lib-list-books'],
      },
    ],
    hints: [
      'Start with the Book blueprint before Library.',
      'Keep fields private; expose behavior via methods.',
      'Library should own the list — has-a relationship.',
    ],
    hintsUrdu: [
      'Library se pehle Book blueprint banayein.',
      'Fields private rakhein; behavior methods se expose karein.',
      'Library list ki malik ho — has-a relationship.',
    ],
    modelSolution: `class Book {
    private String title;
    private String author;

    public Book(String title, String author) {
        this.title = title;
        this.author = author;
    }

    public void display() {
        System.out.println(title + " by " + author);
    }
}

class Library {
    private List<Book> books = new ArrayList<>();

    public void addBook(Book b) {
        if (b != null) books.add(b);
    }

    public void listBooks() {
        for (Book b : books) b.display();
    }
}`,
    modelSolutionNotes:
      'Encapsulation via private fields; composition Library has-a Book; constructor initializes state; listBooks encapsulates iteration.',
    modelSolutionNotesUrdu:
      'Private fields se encapsulation; composition — Library ke paas Book hai; constructor state init karta hai; listBooks iteration chupata hai.',
    difficulty: 'easy',
    moduleId: 'module-04',
  },
  {
    id: 'lab-exam-02',
    title: 'Employee Payroll Hierarchy',
    titleUrdu: 'Employee Payroll Hierarchy',
    problemStatement:
      'Create an abstract Employee with a name and abstract pay(). Create FullTimeEmployee (monthly salary) and PartTimeEmployee (hourly rate × hours). Show polymorphism by calculating pay through an Employee reference.',
    problemStatementUrdu:
      'Abstract Employee (name + abstract pay()) banayein. FullTimeEmployee (monthly salary) aur PartTimeEmployee (hourly × hours). Employee reference se pay calculate karke polymorphism dikhayein.',
    requiredClasses: ['Employee', 'FullTimeEmployee', 'PartTimeEmployee'],
    requiredAttributes: ['Employee.name', 'FullTimeEmployee.salary', 'PartTimeEmployee.hourlyRate', 'PartTimeEmployee.hours'],
    requiredMethods: ['Employee.pay()', 'FullTimeEmployee.pay()', 'PartTimeEmployee.pay()'],
    concepts: ['inheritance', 'abstraction', 'polymorphism'],
    checkpoints: [
      {
        id: 'cp-1',
        label: 'Employee is abstract with abstract pay()',
        labelUrdu: 'Employee abstract ho aur pay() abstract ho',
        requiredChoices: ['emp-abstract'],
      },
      {
        id: 'cp-2',
        label: 'FullTimeEmployee extends Employee and overrides pay()',
        labelUrdu: 'FullTimeEmployee Employee extend karke pay() override kare',
        requiredChoices: ['ft-extends'],
      },
      {
        id: 'cp-3',
        label: 'PartTimeEmployee extends Employee and overrides pay()',
        labelUrdu: 'PartTimeEmployee Employee extend karke pay() override kare',
        requiredChoices: ['pt-extends'],
      },
      {
        id: 'cp-4',
        label: 'PartTime pay uses hourlyRate × hours',
        labelUrdu: 'PartTime pay hourlyRate × hours use kare',
        requiredChoices: ['pt-math'],
      },
      {
        id: 'cp-5',
        label: 'A method accepts Employee[] or List<Employee> and calls pay() polymorphically',
        labelUrdu: 'Method Employee[] ya List<Employee> le kar pay() polymorphically call kare',
        requiredChoices: ['poly-loop'],
      },
    ],
    hints: [
      'Abstract parent forces subclasses to implement pay().',
      'Overriding must keep the same signature.',
      'Store mixed types in one Employee collection.',
    ],
    hintsUrdu: [
      'Abstract parent subclasses ko pay() implement karne par majboor karta hai.',
      'Override mein signature same hona chahiye.',
      'Mukhtalif types ek Employee collection mein rakhein.',
    ],
    modelSolution: `abstract class Employee {
    protected String name;
    public Employee(String name) { this.name = name; }
    public abstract double pay();
}

class FullTimeEmployee extends Employee {
    private double salary;
    public FullTimeEmployee(String name, double salary) {
        super(name);
        this.salary = salary;
    }
    public double pay() { return salary; }
}

class PartTimeEmployee extends Employee {
    private double hourlyRate;
    private int hours;
    public PartTimeEmployee(String name, double rate, int hours) {
        super(name);
        this.hourlyRate = rate;
        this.hours = hours;
    }
    public double pay() { return hourlyRate * hours; }
}

// Polymorphic use:
// Employee e = new FullTimeEmployee("Noor", 5000);
// double p = e.pay();`,
    modelSolutionNotes:
      'Abstract contract + overriding + superclass reference = runtime polymorphism. super(name) initializes parent state first.',
    modelSolutionNotesUrdu:
      'Abstract contract + overriding + superclass reference = runtime polymorphism. super(name) pehle parent state init karta hai.',
    difficulty: 'medium',
    moduleId: 'module-06',
  },
  {
    id: 'lab-exam-03',
    title: 'Safe Temperature Converter',
    titleUrdu: 'Safe Temperature Converter',
    problemStatement:
      'Build a TemperatureConverter that converts Celsius↔Fahrenheit. Reject invalid inputs with a custom InvalidTemperatureException (checked). Handle it in main with try-catch-finally and print a cleanup message.',
    problemStatementUrdu:
      'TemperatureConverter banayein jo Celsius↔Fahrenheit convert kare. Ghalat input par custom InvalidTemperatureException (checked) throw karein. Main mein try-catch-finally se handle karke cleanup message print karein.',
    requiredClasses: ['TemperatureConverter', 'InvalidTemperatureException'],
    requiredAttributes: ['(stateless converter or lastResult)'],
    requiredMethods: [
      'TemperatureConverter.toFahrenheit(double)',
      'TemperatureConverter.toCelsius(double)',
      'InvalidTemperatureException constructor',
    ],
    concepts: ['exception-handling', 'custom-exception', 'static-methods'],
    checkpoints: [
      {
        id: 'cp-1',
        label: 'InvalidTemperatureException extends Exception (checked)',
        labelUrdu: 'InvalidTemperatureException Exception extend kare (checked)',
        requiredChoices: ['custom-throws'],
      },
      {
        id: 'cp-2',
        label: 'Conversion methods exist for both directions',
        labelUrdu: 'Dono directions ke conversion methods hon',
        requiredChoices: ['both-convert'],
      },
      {
        id: 'cp-3',
        label: 'Invalid domain (e.g. below absolute zero) throws the exception',
        labelUrdu: 'Ghalat domain (absolute zero se neeche) exception throw kare',
        requiredChoices: ['guard-throw'],
      },
      {
        id: 'cp-4',
        label: 'main uses try-catch for InvalidTemperatureException',
        labelUrdu: 'main mein InvalidTemperatureException ka try-catch ho',
        requiredChoices: ['try-catch'],
      },
      {
        id: 'cp-5',
        label: 'finally prints a cleanup/done message',
        labelUrdu: 'finally cleanup/done message print kare',
        requiredChoices: ['finally-print'],
      },
    ],
    hints: [
      'Checked custom exceptions extend Exception.',
      'Guard before converting; throw with a message.',
      'finally is independent of whether catch ran.',
    ],
    hintsUrdu: [
      'Checked custom exception Exception extend karti hai.',
      'Convert se pehle guard karein; message ke sath throw.',
      'finally chale ya na chale, chalta hai.',
    ],
    modelSolution: `class InvalidTemperatureException extends Exception {
    public InvalidTemperatureException(String message) {
        super(message);
    }
}

class TemperatureConverter {
    public static double toFahrenheit(double c) throws InvalidTemperatureException {
        if (c < -273.15) throw new InvalidTemperatureException("Below absolute zero: " + c);
        return c * 9 / 5 + 32;
    }

    public static double toCelsius(double f) throws InvalidTemperatureException {
        if (f < -459.67) throw new InvalidTemperatureException("Below absolute zero: " + f);
        return (f - 32) * 5 / 9;
    }
}

// main:
try {
    double f = TemperatureConverter.toFahrenheit(100);
    System.out.println(f);
} catch (InvalidTemperatureException e) {
    System.out.println("Error: " + e.getMessage());
} finally {
    System.out.println("Conversion session done");
}`,
    modelSolutionNotes:
      'Custom checked exception + dual conversion + guard throws + try/catch/finally covers the full lab checklist.',
    modelSolutionNotesUrdu:
      'Custom checked exception + dono conversion + guard throw + try/catch/finally poora checklist pura karta hai.',
    difficulty: 'medium',
    moduleId: 'module-11',
  },
  {
    id: 'lab-exam-04',
    title: 'Shape Area with Interface',
    titleUrdu: 'Interface ke sath Shape Area',
    problemStatement:
      'Define an interface Computable with double compute(). Implement it in Circle and Rectangle. Write a utility method that takes Computable[] and prints each result. Discuss why an interface fits better than a shared base class here.',
    problemStatementUrdu:
      'Interface Computable (double compute()) banayein. Circle aur Rectangle mein implement karein. Utility method jo Computable[] le kar har result print kare. Batayein yahan interface base class se behtar kyun hai.',
    requiredClasses: ['Computable', 'Circle', 'Rectangle'],
    requiredAttributes: ['Circle.radius', 'Rectangle.width', 'Rectangle.height'],
    requiredMethods: ['Computable.compute()', 'Circle.compute()', 'Rectangle.compute()'],
    concepts: ['interfaces', 'implements', 'polymorphism'],
    checkpoints: [
      {
        id: 'cp-1',
        label: 'Computable declared as interface with compute()',
        labelUrdu: 'Computable interface ho jisme compute() ho',
        requiredChoices: ['iface-decl'],
      },
      {
        id: 'cp-2',
        label: 'Circle implements Computable with πr² logic',
        labelUrdu: 'Circle Computable implement kare aur πr² lagaye',
        requiredChoices: ['circle-impl'],
      },
      {
        id: 'cp-3',
        label: 'Rectangle implements Computable with width×height',
        labelUrdu: 'Rectangle Computable implement kare width×height se',
        requiredChoices: ['rect-impl'],
      },
      {
        id: 'cp-4',
        label: 'Utility iterates Computable[] calling compute()',
        labelUrdu: 'Utility Computable[] par iterate karke compute() call kare',
        requiredChoices: ['util-loop'],
      },
      {
        id: 'cp-5',
        label: 'Uses implements keyword (not extends) for the interface',
        labelUrdu: 'Interface ke liye implements keyword use ho (extends nahi)',
        requiredChoices: ['uses-implements'],
      },
    ],
    hints: [
      'Interfaces use implements, not extends.',
      'Each shape only needs compute(), not inherited state.',
      'Can-do capability favors an interface.',
    ],
    hintsUrdu: [
      'Interface ke liye implements, extends nahi.',
      'Har shape ko sirf compute() chahiye, state inherit nahi.',
      'Can-do capability interface ko behtar banati hai.',
    ],
    modelSolution: `interface Computable {
    double compute();
}

class Circle implements Computable {
    private double radius;
    public Circle(double radius) { this.radius = radius; }
    public double compute() { return Math.PI * radius * radius; }
}

class Rectangle implements Computable {
    private double width, height;
    public Rectangle(double w, double h) { width = w; height = h; }
    public double compute() { return width * height; }
}

class ShapeUtil {
    public static void printAll(Computable[] items) {
        for (Computable c : items) {
            System.out.println(c.compute());
        }
    }
}`,
    modelSolutionNotes:
      'Capability (can-do) without shared state → interface. Polymorphic array of Computable shows substitution.',
    modelSolutionNotesUrdu:
      'Bina shared state ke capability (can-do) → interface. Computable ki array substitution dikhati hai.',
    difficulty: 'easy',
    moduleId: 'module-08',
  },
  {
    id: 'lab-exam-05',
    title: 'Grade Report with Collections',
    titleUrdu: 'Collections ke sath Grade Report',
    problemStatement:
      'Store student grades in an ArrayList of Double. Provide addGrade (reject null), average(), highest(), and a sorted display. Use iteration carefully to avoid modification during for-each loops.',
    problemStatementUrdu:
      'Student grades ArrayList<Double> mein store karein. addGrade (null reject), average(), highest(), aur sorted display dein. For-each ke doran modification se bachne ke liye iteration ehtiyat se karein.',
    requiredClasses: ['GradeBook'],
    requiredAttributes: ['GradeBook.grades'],
    requiredMethods: ['addGrade()', 'average()', 'highest()', 'displaySorted()'],
    concepts: ['collections', 'arraylist', 'iteration', 'encapsulation'],
    checkpoints: [
      {
        id: 'cp-1',
        label: 'Uses ArrayList<Double> (or List<Double>) for grades',
        labelUrdu: 'Grades ke liye ArrayList<Double> (ya List<Double>) use ho',
        requiredChoices: ['use-list'],
      },
      {
        id: 'cp-2',
        label: 'addGrade validates non-null before adding',
        labelUrdu: 'addGrade add se pehle non-null validate kare',
        requiredChoices: ['validate-add'],
      },
      {
        id: 'cp-3',
        label: 'average() divides sum by count safely (empty guard)',
        labelUrdu: 'average() sum/count safely kare (empty guard ho)',
        requiredChoices: ['avg-guard'],
      },
      {
        id: 'cp-4',
        label: 'highest() tracks max during iteration',
        labelUrdu: 'highest() iteration ke doran max track kare',
        requiredChoices: ['track-max'],
      },
      {
        id: 'cp-5',
        label: 'displaySorted() uses a copy or sort API without breaking invariants carelessly',
        labelUrdu: 'displaySorted() copy ya sort API use kare bila-ehtiyat list na tore',
        requiredChoices: ['safe-sort'],
      },
    ],
    hints: [
      'Guard empty list before averaging.',
      'Do not remove elements inside a for-each without an Iterator.',
      'Sorting a copy keeps original insertion order if needed.',
    ],
    hintsUrdu: [
      'Average se pehle empty list guard karein.',
      'Iterator ke baghair for-each mein remove na karein.',
      'Copy sort karne se original order mehfooz rehta hai.',
    ],
    modelSolution: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class GradeBook {
    private List<Double> grades = new ArrayList<>();

    public void addGrade(Double g) {
        if (g == null) return;
        grades.add(g);
    }

    public double average() {
        if (grades.isEmpty()) return 0;
        double sum = 0;
        for (double g : grades) sum += g;
        return sum / grades.size();
    }

    public double highest() {
        if (grades.isEmpty()) return 0;
        double max = grades.get(0);
        for (double g : grades) {
            if (g > max) max = g;
        }
        return max;
    }

    public void displaySorted() {
        List<Double> copy = new ArrayList<>(grades);
        Collections.sort(copy);
        System.out.println(copy);
    }
}`,
    modelSolutionNotes:
      'Empty guards + encapsulation of the list + sorting a copy demonstrates careful collection use.',
    modelSolutionNotesUrdu:
      'Empty guards + list ki encapsulation + copy sort karna carefully collection use hai.',
    difficulty: 'medium',
    moduleId: 'module-12',
  },
];

export const LAB_OPTION_BANK: Record<string, { id: string; label: string }[]> = {
  'lab-exam-01': [
    { id: 'book-fields', label: 'private String title; private String author;' },
    { id: 'book-ctor', label: 'public Book(String title, String author) { this.title = title; this.author = author; }' },
    { id: 'book-display', label: 'public void display() { System.out.println(title + " by " + author); }' },
    { id: 'lib-list', label: 'private List<Book> books = new ArrayList<>();' },
    { id: 'lib-add', label: 'public void addBook(Book b) { if (b != null) books.add(b); }' },
    { id: 'lib-list-books', label: 'for (Book b : books) b.display();' },
    { id: 'wrong-expose', label: 'public List<Book> books; // expose list directly' },
    { id: 'wrong-static-book', label: 'static String title; // shared across all books' },
  ],
  'lab-exam-02': [
    { id: 'emp-abstract', label: 'abstract class Employee { public abstract double pay(); }' },
    { id: 'ft-extends', label: 'class FullTimeEmployee extends Employee { public double pay() { return salary; } }' },
    { id: 'pt-extends', label: 'class PartTimeEmployee extends Employee { public double pay() { ... } }' },
    { id: 'pt-math', label: 'return hourlyRate * hours;' },
    { id: 'poly-loop', label: 'for (Employee e : staff) total += e.pay();' },
    { id: 'wrong-no-override', label: 'class FullTimeEmployee { double pay() { ... } } // no extends' },
    { id: 'wrong-abstract-new', label: 'Employee e = new Employee("x"); // cannot instantiate abstract' },
  ],
  'lab-exam-03': [
    { id: 'custom-throws', label: 'class InvalidTemperatureException extends Exception { ... }' },
    { id: 'both-convert', label: 'toFahrenheit(double c) and toCelsius(double f)' },
    { id: 'guard-throw', label: 'if (c < -273.15) throw new InvalidTemperatureException("...");' },
    { id: 'try-catch', label: 'try { ... } catch (InvalidTemperatureException e) { ... }' },
    { id: 'finally-print', label: 'finally { System.out.println("Conversion session done"); }' },
    { id: 'wrong-unchecked-only', label: 'extends RuntimeException only (not checked as required)' },
    { id: 'wrong-no-throw', label: 'silently return NaN without throwing' },
  ],
  'lab-exam-04': [
    { id: 'iface-decl', label: 'interface Computable { double compute(); }' },
    { id: 'circle-impl', label: 'class Circle implements Computable { public double compute() { return Math.PI * radius * radius; } }' },
    { id: 'rect-impl', label: 'class Rectangle implements Computable { public double compute() { return width * height; } }' },
    { id: 'util-loop', label: 'for (Computable c : items) System.out.println(c.compute());' },
    { id: 'uses-implements', label: 'class Circle implements Computable' },
    { id: 'wrong-extends-iface', label: 'class Circle extends Computable' },
    { id: 'wrong-empty-body', label: 'public double compute() { } // missing logic' },
  ],
  'lab-exam-05': [
    { id: 'use-list', label: 'private List<Double> grades = new ArrayList<>();' },
    { id: 'validate-add', label: 'if (g == null) return; grades.add(g);' },
    { id: 'avg-guard', label: 'if (grades.isEmpty()) return 0;' },
    { id: 'track-max', label: 'double max = grades.get(0); for (...) if (g > max) max = g;' },
    { id: 'safe-sort', label: 'List<Double> copy = new ArrayList<>(grades); Collections.sort(copy);' },
    { id: 'wrong-div0', label: 'return sum / grades.size(); // no empty guard' },
    { id: 'wrong-direct-mutate', label: 'for (double g : grades) if (...) grades.remove(g);' },
  ],
};
