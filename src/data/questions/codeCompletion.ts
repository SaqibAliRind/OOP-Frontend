import type { CodeCompletionQuestion } from '@/types';

export const codeCompletionQuestions: CodeCompletionQuestion[] = [
  {
    id: 'cc-001',
    lessonId: 'lesson-02-01',
    codeTemplate: `public class Student {
    private String name;
    private int age;

    public Student(String name, int age) {
        // TODO: Initialize the fields
        ____________
    }

    public String getName() {
        return name;
    }
}`,
    blank: 'this.name = name; this.age = age;',
    acceptedAnswers: [
      'this.name = name; this.age = age;',
      'this.name = name;\nthis.age = age;',
      'this.name = name;  this.age = age;',
    ],
    explanation: 'Use the "this" keyword to distinguish instance fields from constructor parameters when they have the same name.',
    romanUrduExplanation: 'Instance fields aur parameters mein farq karne ke liye "this" keyword use karo.',
    hints: [
      'Use "this" to refer to current object fields',
      'Assign parameter values to instance fields',
      'The "this" keyword disambiguates between fields and parameters',
    ],
    difficulty: 'easy',
    conceptTested: ['this-keyword', 'constructors', 'initialization'],
  },
  {
    id: 'cc-002',
    lessonId: 'lesson-05-02',
    codeTemplate: `class Animal {
    void makeSound() {
        System.out.println("Some sound");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        // TODO: Print "Woof! Woof!"
        ____________
    }
}`,
    blank: 'System.out.println("Woof! Woof!");',
    acceptedAnswers: [
      'System.out.println("Woof! Woof!");',
      "System.out.println(\"Woof! Woof!\");",
    ],
    explanation: 'Override the parent class method to provide Dog-specific behavior.',
    romanUrduExplanation: 'Parent class method ko override karke Dog-specific behavior provide karo.',
    hints: [
      'Use System.out.println() to print output',
      'Override means providing the same method signature',
      'Match the exact method name and parameters',
    ],
    difficulty: 'easy',
    conceptTested: ['method-overriding', 'inheritance'],
  },
  {
    id: 'cc-003',
    lessonId: 'lesson-04-03',
    codeTemplate: `public class BankAccount {
    private double balance;

    // TODO: Add a getter for balance
    ____________

    // TODO: Add a setter for balance with validation (balance >= 0)
    ____________
}`,
    blank: 'getBalance/setBalance methods',
    acceptedAnswers: [
      'public double getBalance() { return balance; } public void setBalance(double balance) { if (balance >= 0) this.balance = balance; }',
      'public double getBalance() {\n    return balance;\n}\n\npublic void setBalance(double balance) {\n    if (balance >= 0) {\n        this.balance = balance;\n    }\n}',
    ],
    explanation: 'Getters return the field value. Setters should validate input before modifying the field to maintain encapsulation.',
    romanUrduExplanation: 'Getters field value return karte hain. Setters input validate karte hain field modify karne se pehle.',
    hints: [
      'Getter returns the private field',
      'Setter takes a parameter and assigns it to the field',
      'Add validation in the setter to reject invalid values',
    ],
    difficulty: 'medium',
    conceptTested: ['getters-setters', 'encapsulation', 'validation'],
  },
  {
    id: 'cc-004',
    lessonId: 'lesson-08-02',
    codeTemplate: `interface Vehicle {
    void start();
    void stop();
}

// TODO: Create a Car class that implements Vehicle
__________
}`,
    blank: 'class Car implements Vehicle implementation',
    acceptedAnswers: [
      'class Car implements Vehicle { public void start() { System.out.println("Car starting"); } public void stop() { System.out.println("Car stopping"); } }',
      'class Car implements Vehicle {\n    @Override\n    public void start() {\n        System.out.println("Car starting");\n    }\n\n    @Override\n    public void stop() {\n        System.out.println("Car stopping");\n    }\n}',
    ],
    explanation: 'A class implementing an interface must provide implementations for ALL abstract methods in the interface.',
    romanUrduExplanation: 'Interface implement karne wali class ko interface ke sab abstract methods ke implementations dene padte hain.',
    hints: [
      'Use "implements" keyword',
      'Implement both start() and stop() methods',
      'Methods must be public',
    ],
    difficulty: 'medium',
    conceptTested: ['interface', 'implementation', 'method-signature'],
  },
  {
    id: 'cc-005',
    lessonId: 'lesson-03-04',
    codeTemplate: `class Rectangle {
    private double width, height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    // TODO: Add a no-arg constructor that delegates to the parameterized constructor
    // with default values width=1.0, height=1.0
    ____________
}`,
    blank: 'public Rectangle() { this(1.0, 1.0); }',
    acceptedAnswers: [
      'public Rectangle() { this(1.0, 1.0); }',
      'public Rectangle() {\n    this(1.0, 1.0);\n}',
    ],
    explanation: 'Use this() to call another constructor in the same class. Constructor chaining avoids code duplication.',
    romanUrduExplanation: 'Same class mein doosre constructor ko call karne ke liye this() use karo. Constructor chaining code duplication avoid karta hai.',
    hints: [
      'this() calls another constructor in the same class',
      'It must be the first statement in the constructor',
      'Pass default values to the parameterized constructor',
    ],
    difficulty: 'medium',
    conceptTested: ['constructor-chaining', 'this()', 'overloading'],
  },
  {
    id: 'cc-006',
    lessonId: 'lesson-06-07',
    codeTemplate: `public class Main {
    public static void main(String[] args) {
        Object obj = "Hello World";

        // TODO: Check if obj is a String, then print its length
        if (__________) {
            ____________
        }
    }
}`,
    blank: 'obj instanceof String and String casting',
    acceptedAnswers: [
      'obj instanceof String String s = (String) obj; System.out.println(s.length());',
      'obj instanceof String\nString s = (String) obj;\nSystem.out.println(s.length());',
    ],
    explanation: 'Use instanceof to check the type before downcasting. Then cast and use the specific method.',
    romanUrduExplanation: 'Downcasting se pehle instanceof se type check karo. Phir cast karo aur specific method use karo.',
    hints: [
      'instanceof checks if an object is of a specific type',
      'Cast the object to String after the check',
      'Call length() on the String',
    ],
    difficulty: 'medium',
    conceptTested: ['instanceof', 'downcasting', 'type-checking'],
  },
  {
    id: 'cc-007',
    lessonId: 'lesson-11-06',
    codeTemplate: `public class AgeValidator {
    // TODO: Validate age and throw IllegalArgumentException if age < 0 or age > 150
    public static void validate(int age) {
        ____________
    }
}`,
    blank: 'if (age < 0 || age > 150) throw new IllegalArgumentException("Invalid age: " + age);',
    acceptedAnswers: [
      'if (age < 0 || age > 150) throw new IllegalArgumentException("Invalid age: " + age);',
      'if (age < 0 || age > 150) {\n    throw new IllegalArgumentException("Invalid age: " + age);\n}',
    ],
    explanation: 'Use the throw keyword to explicitly throw an exception when invalid input is received.',
    romanUrduExplanation: 'Galat input par exception throw karne ke liye throw keyword use karo.',
    hints: [
      'Check if age is outside the valid range',
      'Use the "throw" keyword to throw an exception',
      'IllegalArgumentException is appropriate for invalid arguments',
    ],
    difficulty: 'easy',
    conceptTested: ['throw', 'exception-handling', 'validation'],
  },
  {
    id: 'cc-008',
    lessonId: 'lesson-12-03',
    codeTemplate: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Cherry");

        // TODO: Print each fruit using a for-each loop
        ____________
    }
}`,
    blank: 'for (String fruit : fruits) { System.out.println(fruit); }',
    acceptedAnswers: [
      'for (String fruit : fruits) { System.out.println(fruit); }',
      'for(String fruit : fruits){\n    System.out.println(fruit);\n}',
    ],
    explanation: 'The enhanced for loop (for-each) iterates over each element in a collection without needing an index.',
    romanUrduExplanation: 'Enhanced for loop (for-each) collection ke har element par iterate karta hai bina index ke.',
    hints: [
      'Use for-each syntax: for (Type var : collection)',
      'The variable type should match the collection element type',
      'Print each element inside the loop',
    ],
    difficulty: 'easy',
    conceptTested: ['for-each-loop', 'collections', 'iteration'],
  },
  {
    id: 'cc-009',
    lessonId: 'lesson-07-02',
    codeTemplate: `// TODO: Complete the abstract class and its subclass
abstract class Payment {
    abstract void process(double amount);

    void displayReceipt(double amount) {
        System.out.println("Payment processed: $" + amount);
    }
}

class CreditCardPayment extends Payment {
    // TODO: Implement the process method
    ____________
}`,
    blank: 'void process(double amount) { displayReceipt(amount); }',
    acceptedAnswers: [
      'void process(double amount) { displayReceipt(amount); }',
      'public void process(double amount) {\n    displayReceipt(amount);\n}',
      '@Override\nvoid process(double amount) {\n    displayReceipt(amount);\n}',
    ],
    explanation: 'Subclasses of abstract classes must implement all abstract methods. The @Override annotation is recommended.',
    romanUrduExplanation: 'Abstract classes ke subclasses ko sab abstract methods implement karna padta hai.',
    hints: [
      'The method signature must match the abstract method',
      'Use @Override annotation',
      'You can call the parent class method displayReceipt()',
    ],
    difficulty: 'medium',
    conceptTested: ['abstract-class', 'method-implementation', 'inheritance'],
  },
  {
    id: 'cc-010',
    lessonId: 'lesson-09-03',
    codeTemplate: `// TODO: Create an enum with a method
enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRiday, SATURDAY, SUNDAY;

    // TODO: Add a method that returns true if it's a weekend day
    ____________
}`,
    blank: 'public boolean isWeekend() { return this == SATURDAY || this == SUNDAY; }',
    acceptedAnswers: [
      'public boolean isWeekend() { return this == SATURDAY || this == SUNDAY; }',
      'boolean isWeekend() {\n    return this == SATURDAY || this == SUNDAY;\n}',
    ],
    explanation: 'Enums can have methods just like classes. Each enum constant can call the method using "this".',
    romanUrduExplanation: 'Enums classes ki tarah methods ho sakte hain. Har enum constant "this" se method call kar sakta hai.',
    hints: [
      'Enums can have methods like regular classes',
      'Use "this" to refer to the current enum constant',
      'Compare using == for enum constants',
    ],
    difficulty: 'medium',
    conceptTested: ['enums', 'enum-methods', 'enum-comparison'],
  },
];
