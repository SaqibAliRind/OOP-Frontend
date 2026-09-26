import type { MistakeQuestion } from '@/types';

export const mistakeQuestions: MistakeQuestion[] = [
  {
    id: 'mq-001',
    lessonId: 'lesson-01-01',
    title: 'Confusing Class with Object',
    code: `Student.name = "Ahmed";
System.out.println(Student.name);`,
    mistakeDescription: 'Trying to access instance variables through the class name instead of an object reference.',
    possibleMistakes: [
      'Accessing instance fields statically',
      'Assuming the class holds data',
      'Not creating an object before accessing fields',
    ],
    correctMistake: 'Instance fields belong to objects, not classes. You must create an object first.',
    correction: `Student student = new Student();
student.name = "Ahmed";
System.out.println(student.name);`,
    explanation: 'A class is a blueprint. Instance variables exist only in objects. Static variables belong to the class, but instance variables require an object.',
    romanUrduExplanation: 'Class sirf blueprint hai. Instance variables sirf objects mein hote hain. Static variables class ke hain.',
    difficulty: 'easy',
    conceptTested: ['class', 'object', 'instance-variables'],
  },
  {
    id: 'mq-002',
    lessonId: 'lesson-02-05',
    title: 'Direct Field Access Instead of Getters',
    code: `public class BankAccount {
    public double balance;
}

BankAccount acc = new BankAccount();
acc.balance = -1000; // Invalid state!`,
    mistakeDescription: 'Making fields public and accessing them directly, bypassing validation logic.',
    possibleMistakes: [
      'Making fields public for convenience',
      'Skipping getter/setter methods',
      'Not adding validation in setters',
    ],
    correctMistake: 'Fields should be private. Use getters/setters with validation to protect the object state.',
    correction: `public class BankAccount {
    private double balance;

    public double getBalance() { return balance; }

    public void setBalance(double balance) {
        if (balance >= 0) {
            this.balance = balance;
        }
    }
}

BankAccount acc = new BankAccount();
acc.setBalance(-1000); // Rejected by validation`,
    explanation: 'Encapsulation requires private fields with controlled access. Setters validate input before modifying state.',
    romanUrduExplanation: 'Encapsulation private fields aur controlled access mangta hai. Setters input validate karte hain state modify karne se pehle.',
    difficulty: 'easy',
    conceptTested: ['encapsulation', 'getters-setters', 'data-hiding'],
  },
  {
    id: 'mq-003',
    lessonId: 'lesson-03-01',
    title: 'Constructor Name Mismatch',
    code: `public class Student {
    public void Student(String name) {
        // This is a METHOD, not a constructor!
        System.out.println(name);
    }
}`,
    mistakeDescription: 'Writing a return type before the constructor name, making it a regular method instead of a constructor.',
    possibleMistakes: [
      'Adding void or any return type',
      'Using wrong capitalization',
      'Making the method name different from the class',
    ],
    correctMistake: 'Constructors have no return type, not even void. The name must exactly match the class name.',
    correction: `public class Student {
    public Student(String name) {
        // This IS a constructor
        System.out.println(name);
    }
}`,
    explanation: 'Constructors are special methods called when creating objects. They have no return type. Adding void makes it a regular method.',
    romanUrduExplanation: 'Constructors special methods hain jo object create hone par call hote hain. Inme koi return type nahi hota.',
    difficulty: 'easy',
    conceptTested: ['constructors', 'syntax'],
  },
  {
    id: 'mq-004',
    lessonId: 'lesson-05-03',
    title: 'Overriding with Different Parameter Types',
    code: `class Animal {
    void makeSound(String type) {
        System.out.println("Animal makes sound");
    }
}

class Dog extends Animal {
    void makeSound() { // This is overloading, NOT overriding
        System.out.println("Dog barks");
    }
}`,
    mistakeDescription: 'Changing parameter types when overriding, resulting in method overloading instead of overriding.',
    possibleMistakes: [
      'Changing parameter types or count',
      'Changing the method signature',
      'Forgetting @Override annotation',
    ],
    correctMistake: 'Overriding requires the EXACT same method signature (name + parameter types + order).',
    correction: `class Animal {
    void makeSound() {
        System.out.println("Animal makes sound");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() { // Proper overriding
        System.out.println("Dog barks");
    }
}`,
    explanation: 'Method overriding requires the exact same method signature. Different parameters create a new overloaded method, not an override.',
    romanUrduExplanation: 'Method overriding ke liye exact same method signature chahiye. Alag parameters naya overloaded method banate hain.',
    difficulty: 'medium',
    conceptTested: ['overriding', 'overloading', 'method-signature'],
  },
  {
    id: 'mq-005',
    lessonId: 'lesson-04-02',
    title: 'Using public Instead of private',
    code: `public class Student {
    public String name;
    public int age;
    public double gpa;
}`,
    mistakeDescription: 'Making all fields public, exposing internal state to any class.',
    possibleMistakes: [
      'Using public for all fields',
      'Not considering access levels',
      'Skipping encapsulation',
    ],
    correctMistake: 'Fields should be private. Only expose what is necessary through public methods.',
    correction: `public class Student {
    private String name;
    private int age;
    private double gpa;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}`,
    explanation: 'Public fields allow any class to modify state directly, leading to bugs. Private fields with getters/setters provide controlled access.',
    romanUrduExplanation: 'Public fields kisi ko bhi state directly modify karne dete hain, bugs ka khatra hai. Private fields controlled access dete hain.',
    difficulty: 'easy',
    conceptTested: ['encapsulation', 'access-modifiers', 'data-hiding'],
  },
  {
    id: 'mq-006',
    lessonId: 'lesson-08-02',
    title: 'Interface Implementation Mismatch',
    code: `interface Drawable {
    void draw();
}

class Circle implements Drawable {
    public void Draw() { // Wrong capitalization!
        System.out.println("Drawing circle");
    }
}`,
    mistakeDescription: 'Not matching the exact method signature from the interface (capitalization matters).',
    possibleMistakes: [
      'Wrong capitalization',
      'Different parameter types',
      'Adding checked exceptions not declared in interface',
    ],
    correctMistake: 'Interface methods must be implemented with exact signature including capitalization.',
    correction: `interface Drawable {
    void draw();
}

class Circle implements Drawable {
    @Override
    public void draw() { // Exact match
        System.out.println("Drawing circle");
    }
}`,
    explanation: 'Java is case-sensitive. "Draw" and "draw" are different methods. The implementation must exactly match the interface method signature.',
    romanUrduExplanation: 'Java case-sensitive hai. "Draw" aur "draw" alag methods hain. Implementation interface method signature se exact match karna chahiye.',
    difficulty: 'easy',
    conceptTested: ['interfaces', 'implementation', 'case-sensitivity'],
  },
  {
    id: 'mq-007',
    lessonId: 'lesson-11-02',
    title: 'Catching Exception Too Broadly',
    code: `try {
    FileReader file = new FileReader("data.txt");
    int data = file.read();
} catch (Exception e) {
    System.out.println("Error occurred");
}`,
    mistakeDescription: 'Catching the generic Exception class instead of specific exceptions, hiding the actual problem.',
    possibleMistakes: [
      'Using catch (Exception e) for everything',
      'Not distinguishing between exception types',
      'Swallowing exceptions with empty catch blocks',
    ],
    correctMistake: 'Catch specific exceptions. Handle different exceptions differently. Never silently ignore exceptions.',
    correction: `try {
    FileReader file = new FileReader("data.txt");
    int data = file.read();
} catch (FileNotFoundException e) {
    System.out.println("File not found: " + e.getMessage());
} catch (IOException e) {
    System.out.println("Read error: " + e.getMessage());
}`,
    explanation: 'Specific catches allow different handling for different errors. Catching generic Exception hides bugs and makes debugging harder.',
    romanUrduExplanation: 'Specific catches alag errors ke liye alag handling dete hain. Generic Exception pakadna bugs chupata hai.',
    difficulty: 'medium',
    conceptTested: ['exception-handling', 'best-practices', 'specificity'],
  },
  {
    id: 'mq-008',
    lessonId: 'lesson-02-10',
    title: 'Overriding equals() Without hashCode()',
    code: `class Student {
    String name;

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Student) {
            return this.name.equals(((Student) obj).name);
        }
        return false;
    }
    // hashCode() NOT overridden!
}

Set<Student> students = new HashSet<>();
students.add(new Student("Ahmed"));
System.out.println(students.contains(new Student("Ahmed"))); // May print false!`,
    mistakeDescription: 'Overriding equals() without overriding hashCode() breaks the contract between the two methods.',
    possibleMistakes: [
      'Overriding equals() without hashCode()',
      'Not understanding the equals-hashCode contract',
      'Using only one method',
    ],
    correctMistake: 'Always override both equals() and hashCode() together. Objects that are equal must have the same hash code.',
    correction: `class Student {
    String name;

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Student) {
            return this.name.equals(((Student) obj).name);
        }
        return false;
    }

    @Override
    public int hashCode() {
        return name != null ? name.hashCode() : 0;
    }
}`,
    explanation: 'The equals-hashCode contract: if two objects are equal, they MUST have the same hashCode(). Collections like HashSet rely on this.',
    romanUrduExplanation: 'Equals-hashCode contract: agar do objects equal hain, toh unka hashCode() same hona chahiye. HashSet jaisi collections is par rely karti hain.',
    difficulty: 'medium',
    conceptTested: ['equals', 'hashcode', 'collections', 'contract'],
  },
  {
    id: 'mq-009',
    lessonId: 'lesson-06-06',
    title: 'Unsafe Downcasting',
    code: `Animal animal = new Animal();
Dog dog = (Dog) animal; // ClassCastException at runtime!`,
    mistakeDescription: 'Casting a parent class reference to a subclass type without checking the actual object type.',
    possibleMistakes: [
      'Not using instanceof before downcasting',
      'Assuming the reference type matches the cast type',
      'Ignoring ClassCastException',
    ],
    correctMistake: 'Always use instanceof to check the object type before downcasting.',
    correction: `Animal animal = new Dog();
if (animal instanceof Dog) {
    Dog dog = (Dog) animal;
    dog.fetch(); // Safe
}`,
    explanation: 'Downcasting can fail at runtime if the object is not actually of the target type. instanceof provides a safe check.',
    romanUrduExplanation: 'Downcasting runtime par fail ho sakta hai agar object actually target type ka nahi hai. instanceof safe check deta hai.',
    difficulty: 'medium',
    conceptTested: ['casting', 'instanceof', 'type-safety'],
  },
  {
    id: 'mq-010',
    lessonId: 'lesson-14-01',
    title: 'God Class Anti-Pattern',
    code: `class UniversityManager {
    void addStudent() { ... }
    void removeStudent() { ... }
    void addProfessor() { ... }
    void removeProfessor() { ... }
    void generateReport() { ... }
    void sendEmail() { ... }
    void processPayment() { ... }
    void manageLibrary() { ... }
    // 50+ more methods...
}`,
    mistakeDescription: 'A single class handling too many responsibilities, violating the Single Responsibility Principle.',
    possibleMistakes: [
      'Putting all functionality in one class',
      'Not splitting responsibilities',
      'Creating tightly coupled code',
    ],
    correctMistake: 'Split into focused classes, each handling one responsibility: StudentService, ProfessorService, ReportService, etc.',
    correction: `class StudentService {
    void addStudent() { ... }
    void removeStudent() { ... }
}

class ProfessorService {
    void addProfessor() { ... }
    void removeProfessor() { ... }
}

class ReportService {
    void generateReport() { ... }
}`,
    explanation: 'Each class should have one reason to change (SRP). God classes are hard to test, maintain, and understand.',
    romanUrduExplanation: 'Har class ka sirf ek reason hona chahiye change karne ka (SRP). God classes ko test karna, maintain karna mushkil hai.',
    difficulty: 'hard',
    conceptTested: ['solid', 'srp', 'design-principles', 'refactoring'],
  },
];
