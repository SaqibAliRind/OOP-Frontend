import type { QuizQuestion, ScenarioQuestion, OutputQuestion, DebugChallenge, MistakeQuestion, CodeCompletionQuestion } from '@/types';

export const module09Questions: {
  quickChecks: QuizQuestion[];
  scenarios: ScenarioQuestion[];
  outputs: OutputQuestion[];
  debugs: DebugChallenge[];
  mistakes: MistakeQuestion[];
  codeCompletions: CodeCompletionQuestion[];
} = {
  quickChecks: [
    {
      id: 'm09-quiz-001', type: 'mcq', question: 'What is the diamond problem in Java?',
      options: ['A shape problem', 'Ambiguity when class inherits from two classes with same method', 'A memory issue', 'A compilation warning'],
      correctAnswer: 'Ambiguity when class inherits from two classes with same method',
      explanation: 'Diamond problem occurs when a class inherits from two parent classes that both define the same method. Java avoids this by not supporting multiple class inheritance.',
      romanUrduExplanation: 'Diamond problem tab hota hai jab class do parent classes se inherit karti hain jo same method define karti hain.',
      difficulty: 'medium', topicTags: ['diamond-problem', 'multiple-inheritance'], xpReward: 30, moduleId: 'module-09',
    },
    {
      id: 'm09-quiz-002', type: 'mcq', question: 'How does Java solve the diamond problem?',
      options: ['By allowing multiple class inheritance', 'By only allowing single class inheritance and multiple interface implementation', 'By using global variables', 'By using templates'],
      correctAnswer: 'By only allowing single class inheritance and multiple interface implementation',
      explanation: 'Java supports single class inheritance to avoid diamond problem. Multiple interfaces can be implemented, and if they have conflicting default methods, the class must override.',
      romanUrduExplanation: 'Java diamond problem se bachne ke liye single class inheritance support karta hai. Multiple interfaces implement kar sakte hain.',
      difficulty: 'medium', topicTags: ['diamond-problem', 'inheritance'], xpReward: 30, moduleId: 'module-09',
    },
    {
      id: 'm09-quiz-003', type: 'mcq', question: 'What is the super keyword used for in inheritance?',
      options: ['Creating objects', 'Accessing parent class members', 'Declaring abstract methods', 'Importing packages'],
      correctAnswer: 'Accessing parent class members',
      explanation: 'super refers to the parent class. It is used to access parent methods, constructors, and fields that are hidden by the subclass.',
      romanUrduExplanation: 'super parent class ko refer karta hai. Ye parent methods, constructors aur fields access karne ke liye use hota hai.',
      difficulty: 'easy', topicTags: ['super', 'inheritance'], xpReward: 25, moduleId: 'module-09',
    },
    {
      id: 'm09-quiz-004', type: 'mcq', question: 'What is method overriding?',
      options: [
        'Defining multiple methods with same name but different parameters',
        'Redefining a parent class method in a subclass with the same signature',
        'Calling a parent class method',
        'Hiding a static method',
      ],
      correctAnswer: 'Redefining a parent class method in a subclass with the same signature',
      explanation: 'Method overriding happens when a subclass provides a specific implementation of a method defined in its parent class with the same name, return type, and parameters.',
      romanUrduExplanation: 'Method overriding tab hota hai jab subclass parent class ka method same signature ke saath specific implementation provide karta hai.',
      difficulty: 'easy', topicTags: ['overriding', 'inheritance'], xpReward: 25, moduleId: 'module-09',
    },
    {
      id: 'm09-quiz-005', type: 'mcq', question: 'What is method overloading?',
      options: [
        'Same method name with different parameter lists in the same class',
        'Redefining parent method in subclass',
        'Using the same parameter types',
        'Calling multiple methods',
      ],
      correctAnswer: 'Same method name with different parameter lists in the same class',
      explanation: 'Method overloading means having multiple methods with the same name but different parameter types or counts within the same class. It is compile-time polymorphism.',
      romanUrduExplanation: 'Method overloading ka matlab hai same name ke multiple methods jo different parameters lein. Ye compile-time polymorphism hai.',
      difficulty: 'easy', topicTags: ['overloading', 'polymorphism'], xpReward: 25, moduleId: 'module-09',
    },
    {
      id: 'm09-quiz-006', type: 'true-false', question: 'You can override a private method of a parent class.',
      correctAnswer: 'False',
      explanation: 'Private methods are not visible to subclasses, so they cannot be overridden. They can only be hidden (a method with same name in subclass is a new method).',
      romanUrduExplanation: 'Private methods subclasses ko visible nahi hote, isliye override nahi ho sakte. Wo sirf hide ho sakte hain.',
      difficulty: 'medium', topicTags: ['overriding', 'access-modifiers', 'private'], xpReward: 25, moduleId: 'module-09',
    },
    {
      id: 'm09-quiz-007', type: 'mcq', question: 'What does the @Override annotation do?',
      options: ['Changes the method to override', 'Ensures the method actually overrides a parent method (compile-time check)', 'Makes the method faster', 'Makes the method public'],
      correctAnswer: 'Ensures the method actually overrides a parent method (compile-time check)',
      explanation: '@Override is a compile-time annotation that verifies the method signature matches a parent method. If not, it causes a compilation error, preventing bugs.',
      romanUrduExplanation: '@Override compile-time annotation hai jo verify karta hai method signature parent method se match karta hai. Agar nahi karta toh compilation error hota hai.',
      difficulty: 'easy', topicTags: ['override-annotation', 'overriding'], xpReward: 25, moduleId: 'module-09',
    },
    {
      id: 'm09-quiz-008', type: 'mcq', question: 'What is runtime polymorphism?',
      options: [
        'Method overloading resolved at compile time',
        'Method overriding where the JVM decides which method to call at runtime',
        'Creating multiple objects',
        'Using interfaces',
      ],
      correctAnswer: 'Method overriding where the JVM decides which method to call at runtime',
      explanation: 'Runtime polymorphism (dynamic dispatch) occurs when a parent reference points to a child object. The JVM determines which overridden method to call based on the actual object type at runtime.',
      romanUrduExplanation: 'Runtime polymorphism (dynamic dispatch) tab hota hai jab parent reference child object ko point karta hai. JVM actual object type ke according decide karta hai kaunsa method call hoga.',
      difficulty: 'medium', topicTags: ['runtime-polymorphism', 'dynamic-dispatch'], xpReward: 30, moduleId: 'module-09',
    },
    {
      id: 'm09-quiz-009', type: 'mcq', question: 'Can you override a static method?',
      options: ['Yes, with @Override', 'No, static methods cannot be overridden, they are hidden', 'Only in abstract classes', 'Only with interfaces'],
      correctAnswer: 'No, static methods cannot be overridden, they are hidden',
      explanation: 'Static methods belong to the class, not objects. They cannot be overridden. If a subclass defines a static method with the same signature, it hides (not overrides) the parent method.',
      romanUrduExplanation: 'Static methods class ke hain, objects ke nahi. Override nahi ho sakte. Agar subclass same signature ka static method banaye toh hide karta hai, override nahi.',
      difficulty: 'medium', topicTags: ['static', 'overriding', 'hiding'], xpReward: 30, moduleId: 'module-09',
    },
    {
      id: 'm09-quiz-010', type: 'mcq', question: 'What is covariant return type?',
      options: [
        'Return type must be exactly the same',
        'Return type can be a subclass of the parent method return type',
        'Return type can be any type',
        'Return type must be primitive',
      ],
      correctAnswer: 'Return type can be a subclass of the parent method return type',
      explanation: 'Java allows overriding methods to return a subclass of the original return type. This is called covariant return type and enables more specific return values.',
      romanUrduExplanation: 'Java allow karta hai overriding methods ko original return type ka subclass return karne ke liye. Ye covariant return type hai.',
      difficulty: 'hard', topicTags: ['overriding', 'covariant-return'], xpReward: 35, moduleId: 'module-09',
    },
  ],
  scenarios: [
    {
      id: 'm09-sq-001', title: 'Employee Hierarchy Design',
      scenario: 'A company has Employee as base class with calculateSalary(). Manager, Developer, and Intern inherit from Employee. Each has different salary calculation logic.',
      question: 'Which polymorphism approach works best?',
      type: 'design-decision',
      options: [
        'Method overloading with different calculateSalary() signatures',
        'Method overriding where each subclass implements calculateSalary() differently',
        'Using if-else in the base class to check employee type',
        'Creating separate methods like calculateManagerSalary()',
      ],
      correctAnswer: 'Method overriding where each subclass implements calculateSalary() differently',
      explanation: 'Runtime polymorphism through overriding is ideal. Employee ref = new Manager() calls Manager\'s calculateSalary() at runtime. No type checking needed.',
      romanUrduExplanation: 'Runtime polymorphism overriding se ideal hai. Employee ref = new Manager() runtime par Manager ka calculateSalary() call karta hai.',
      relatedConcepts: ['runtime-polymorphism', 'overriding', 'design'], difficulty: 'medium',
    },
    {
      id: 'm09-sq-002', title: 'Logger System',
      scenario: 'You have a logging system with FileLogger, ConsoleLogger, and DatabaseLogger. All must implement a log() method. The system must dynamically choose which logger to use at runtime.',
      question: 'How should you implement dynamic dispatch?',
      type: 'concept-application',
      options: [
        'Use instanceof checks in a switch statement',
        'Use a Logger interface/abstract class with overridden log() methods and polymorphic references',
        'Create separate classes without any common type',
        'Use static methods',
      ],
      correctAnswer: 'Use a Logger interface/abstract class with overridden log() methods and polymorphic references',
      explanation: 'Define Logger with abstract log(). Each logger type overrides it. At runtime, Logger logger = new FileLogger(); logger.log(); calls the correct implementation.',
      romanUrduExplanation: 'Logger abstract log() define karo. Har logger type override kare. Runtime par Logger logger = new FileLogger(); logger.log(); sahi implementation call karta hai.',
      relatedConcepts: ['dynamic-dispatch', 'polymorphism', 'interface'], difficulty: 'medium',
    },
  ],
  outputs: [
    {
      id: 'm09-oq-001', lessonId: 'lesson-09-01',
      code: `class Parent {
    void display() { System.out.println("Parent"); }
}

class Child extends Parent {
    @Override
    void display() { System.out.println("Child"); }
}

public class Main {
    public static void main(String[] args) {
        Parent p = new Child();
        p.display();
    }
}`,
      options: ['Parent', 'Child', 'Compilation error', 'Runtime error'],
      correctOutput: 'Child',
      explanation: 'Parent reference points to Child object. At runtime, JVM uses dynamic dispatch to call Child\'s display() method.',
      romanUrduExplanation: 'Parent reference Child object ko point karta hai. Runtime par JVM dynamic dispatch use karke Child ka display() call karta hai.',
      conceptTested: ['runtime-polymorphism', 'dynamic-dispatch'], difficulty: 'easy',
    },
    {
      id: 'm09-oq-002', lessonId: 'lesson-09-02',
      code: `class Animal {
    void sound() { System.out.println("Generic sound"); }
    static void type() { System.out.println("Animal"); }
}

class Dog extends Animal {
    @Override
    void sound() { System.out.println("Bark"); }
    static void type() { System.out.println("Dog"); }
}

public class Main {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.sound();
        a.type();
    }
}`,
      options: ['Bark, Dog', 'Generic sound, Animal', 'Bark, Animal', 'Generic sound, Dog'],
      correctOutput: 'Bark, Animal',
      explanation: 'sound() is overridden (runtime polymorphism) -> calls Dog\'s version. type() is static (method hiding) -> calls Animal\'s version based on reference type.',
      romanUrduExplanation: 'sound() overridden hai (runtime polymorphism) -> Dog ka version call hota hai. type() static hai (method hiding) -> reference type ke according Animal ka version call hota hai.',
      conceptTested: ['runtime-polymorphism', 'static-hiding'], difficulty: 'medium',
    },
  ],
  debugs: [
    {
      id: 'm09-dc-001', title: 'Incorrect Override Signature',
      description: 'Method looks like override but has different parameter types, creating an overloaded method instead.',
      buggyCode: `class Animal {
    void speak(String sound) {
        System.out.println("Animal: " + sound);
    }
}

class Dog extends Animal {
    @Override
    void speak(int times) { // Wrong! Different parameter type
        for (int i = 0; i < times; i++) {
            System.out.println("Woof!");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.speak("Bark"); // Calls parent method, not Dog's!
    }
}`,
      expectedBehavior: 'Dog should override speak(String) to provide dog-specific behavior.',
      hints: ['Override requires the same parameter list', '@Override annotation would catch this error', 'Check parameter types match exactly'],
      solution: `class Dog extends Animal {
    @Override
    void speak(String sound) {
        System.out.println("Dog: " + sound);
    }
}`,
      explanation: 'Overriding requires exact same method signature (name + parameters). Different parameters = overloading, not overriding.',
      romanUrduExplanation: 'Override ke liye exact same method signature (name + parameters) chahiye. Different parameters = overloading, override nahi.',
      difficulty: 'medium', topicTags: ['overriding', 'overloading', 'signatures'], xpReward: 60,
      errorMessage: 'Parent method called instead of child method', errorType: 'logical', conceptTested: ['overriding', 'signatures'],
    },
  ],
  mistakes: [
    {
      id: 'm09-mq-001', title: 'Calling super() Must Be First Statement',
      code: `class Child extends Parent {
    Child() {
        System.out.println("Child constructor");
        super(); // Error! Must be first statement
    }
}`,
      mistakeDescription: 'super() call must be the first statement in a constructor.',
      possibleMistakes: ['Placing super() after other statements', 'Not calling super() when parent has no no-arg constructor', 'Forgetting constructor chaining'],
      correctMistake: 'super() must be the first statement in a constructor.',
      correction: `class Child extends Parent {
    Child() {
        super(); // First statement
        System.out.println("Child constructor");
    }
}`,
      explanation: 'super() must be the first statement because the parent part of the object must be initialized before the child part.',
      romanUrduExplanation: 'super() pehla statement hona chahiye kyunki object ka parent part child part se pehle initialize hona chahiye.',
      difficulty: 'easy', conceptTested: ['super', 'constructors', 'initialization'],
    },
  ],
  codeCompletions: [
    {
      id: 'm09-cc-001', lessonId: 'lesson-09-01',
      codeTemplate: `class Vehicle {
    void start() {
        System.out.println("Vehicle started");
    }
}

class Car extends Vehicle {
    // TODO: Override start() to print "Car started"
    ____________
}`,
      blank: '@Override\nvoid start() { System.out.println("Car started"); }',
      acceptedAnswers: [
        '@Override\nvoid start() { System.out.println("Car started"); }',
        '@Override void start() { System.out.println("Car started"); }',
        'void start() { System.out.println("Car started"); }',
      ],
      explanation: 'Override the parent method with the same signature. @Override annotation is recommended for compile-time verification.',
      romanUrduExplanation: 'Parent method ko same signature ke saath override karo. @Override annotation compile-time verification ke liye recommended hai.',
      hints: ['Use @Override annotation', 'Same method name and parameters as parent', 'Provide Car-specific behavior'],
      difficulty: 'easy', conceptTested: ['overriding', 'inheritance'],
    },
  ],
};
