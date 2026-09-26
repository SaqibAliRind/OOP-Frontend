import type { QuizQuestion, ScenarioQuestion, OutputQuestion, DebugChallenge, MistakeQuestion, CodeCompletionQuestion } from '@/types';

export const module13Questions: {
  quickChecks: QuizQuestion[];
  scenarios: ScenarioQuestion[];
  outputs: OutputQuestion[];
  debugs: DebugChallenge[];
  mistakes: MistakeQuestion[];
  codeCompletions: CodeCompletionQuestion[];
} = {
  quickChecks: [
    {
      id: 'm13-quiz-001', type: 'mcq', question: 'What is the Singleton pattern?',
      options: ['Creating many objects', 'Ensuring only one instance of a class exists with global access', 'A pattern for sorting', 'A type of loop'],
      correctAnswer: 'Ensuring only one instance of a class exists with global access',
      explanation: 'Singleton restricts instantiation to one object. It provides a global access point (getInstance()) and lazy initialization.',
      romanUrduExplanation: 'Singleton instantiation ko ek object tak restrict karta hai. Global access point (getInstance()) aur lazy initialization provide karta hai.',
      difficulty: 'easy', topicTags: ['singleton', 'design-patterns'], xpReward: 25, moduleId: 'module-13',
    },
    {
      id: 'm13-quiz-002', type: 'mcq', question: 'What is the Factory pattern?',
      options: ['Creating factory buildings', 'Creating objects without specifying exact class, delegating to subclasses or factory methods', 'A pattern for memory management', 'A type of exception handling'],
      correctAnswer: 'Creating objects without specifying exact class, delegating to subclasses or factory methods',
      explanation: 'Factory pattern provides an interface for creating objects. Subclasses decide which class to instantiate. Promotes loose coupling.',
      romanUrduExplanation: 'Factory pattern objects banane ka interface provide karta hai. Subclasses decide karti hain kaunsi class instantiate karni hai. Loose coupling promote karta hai.',
      difficulty: 'medium', topicTags: ['factory', 'design-patterns'], xpReward: 30, moduleId: 'module-13',
    },
    {
      id: 'm13-quiz-003', type: 'mcq', question: 'What is the Observer pattern?',
      options: ['Watching videos', 'One-to-many dependency where subject notifies all observers of state changes', 'A design for user interfaces only', 'A pattern for data storage'],
      correctAnswer: 'One-to-many dependency where subject notifies all observers of state changes',
      explanation: 'Observer pattern defines a one-to-many dependency. When subject state changes, all registered observers are notified and updated automatically.',
      romanUrduExplanation: 'Observer pattern one-to-many dependency define karta hai. Jab subject ki state change hoti hai, saare registered observers notify hote hain.',
      difficulty: 'medium', topicTags: ['observer', 'design-patterns'], xpReward: 30, moduleId: 'module-13',
    },
    {
      id: 'm13-quiz-004', type: 'mcq', question: 'What is composition over inheritance?',
      options: ['Always use inheritance', 'Prefer object composition (has-a) over class inheritance (is-a) for flexibility', 'Never use inheritance', 'Composition means writing less code'],
      correctAnswer: 'Prefer object composition (has-a) over class inheritance (is-a) for flexibility',
      explanation: 'Composition provides better flexibility, testability, and runtime behavior change. Inheritance creates tight coupling and is harder to change.',
      romanUrduExplanation: 'Composition better flexibility, testability, aur runtime behavior change provide karta hai. Inheritance tight coupling create karta hai.',
      difficulty: 'medium', topicTags: ['composition', 'inheritance', 'design-principles'], xpReward: 30, moduleId: 'module-13',
    },
    {
      id: 'm13-quiz-005', type: 'mcq', question: 'What is the SOLID principle?',
      options: [
        'A set of 5 OOP design principles for maintainable code',
        'A type of database design',
        'A testing methodology',
        'A programming language feature',
      ],
      correctAnswer: 'A set of 5 OOP design principles for maintainable code',
      explanation: 'SOLID: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion. Guidelines for clean, maintainable OOP design.',
      romanUrduExplanation: 'SOLID: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion. Clean maintainable OOP design ke guidelines.',
      difficulty: 'medium', topicTags: ['solid', 'design-principles'], xpReward: 30, moduleId: 'module-13',
    },
    {
      id: 'm13-quiz-006', type: 'mcq', question: 'What is the Strategy pattern?',
      options: ['A military pattern', 'Defining a family of algorithms and making them interchangeable at runtime', 'A sorting algorithm', 'A data structure pattern'],
      correctAnswer: 'Defining a family of algorithms and making them interchangeable at runtime',
      explanation: 'Strategy pattern encapsulates algorithms behind an interface. Clients can swap algorithms at runtime without changing the client code.',
      romanUrduExplanation: 'Strategy pattern algorithms ko interface ke peechhe encapsulate karta hai. Clients runtime par algorithms swap kar sakte hain bina client code change kiye.',
      difficulty: 'medium', topicTags: ['strategy', 'design-patterns'], xpReward: 30, moduleId: 'module-13',
    },
    {
      id: 'm13-quiz-007', type: 'mcq', question: 'What is the Decorator pattern?',
      options: ['Adding decorations', 'Dynamically adding responsibilities to objects by wrapping them with decorator objects', 'A type of inheritance', 'A GUI pattern only'],
      correctAnswer: 'Dynamically adding responsibilities to objects by wrapping them with decorator objects',
      explanation: 'Decorator pattern wraps objects with decorator classes that add behavior. More flexible than inheritance because behavior can be added/removed at runtime.',
      romanUrduExplanation: 'Decorator pattern objects ko decorator classes se wrap karta hai jo behavior add karti hain. Inheritance se zyada flexible hai kyunki runtime par behavior add/remove ho sakta hai.',
      difficulty: 'medium', topicTags: ['decorator', 'design-patterns'], xpReward: 30, moduleId: 'module-13',
    },
    {
      id: 'm13-quiz-008', type: 'true-false', question: 'Design patterns are guaranteed solutions for all problems.',
      correctAnswer: 'False',
      explanation: 'Design patterns are templates/guidelines for common problems. They must be adapted to specific contexts. Not every problem needs a pattern.',
      romanUrduExplanation: 'Design patterns common problems ke templates/guidelines hain. Specific contexts mein adapt karne padte hain. Har problem ko pattern ki zaroorat nahi.',
      difficulty: 'easy', topicTags: ['design-patterns', 'best-practices'], xpReward: 25, moduleId: 'module-13',
    },
    {
      id: 'm13-quiz-009', type: 'mcq', question: 'What is the Adapter pattern?',
      options: ['Electric adapter', 'Converts one interface to another that clients expect', 'A type of data conversion', 'A connection pattern'],
      correctAnswer: 'Converts one interface to another that clients expect',
      explanation: 'Adapter pattern allows incompatible interfaces to work together by converting the interface of one class into an interface clients expect.',
      romanUrduExplanation: 'Adapter pattern incompatible interfaces ko saath kaam karne deta hai ek class ki interface ko client ki expected interface mein convert karke.',
      difficulty: 'medium', topicTags: ['adapter', 'design-patterns'], xpReward: 30, moduleId: 'module-13',
    },
    {
      id: 'm13-quiz-010', type: 'mcq', question: 'When should you use the Template Method pattern?',
      options: [
        'When you need to create objects',
        'When you define the skeleton of an algorithm in a base class and let subclasses override specific steps',
        'When you need to notify observers',
        'When you need to sort data',
      ],
      correctAnswer: 'When you define the skeleton of an algorithm in a base class and let subclasses override specific steps',
      explanation: 'Template Method defines algorithm structure in a base class with abstract methods for steps that subclasses will implement.',
      romanUrduExplanation: 'Template Method algorithm ki structure base class mein define karta hai abstract methods ke saath jo subclasses implement karenge.',
      difficulty: 'medium', topicTags: ['template-method', 'design-patterns'], xpReward: 30, moduleId: 'module-13',
    },
  ],
  scenarios: [
    {
      id: 'm13-sq-001', title: 'Notification System Design',
      scenario: 'You need a notification system that can send messages via Email, SMS, and Push. New channels should be added without modifying existing notification code.',
      question: 'Which pattern fits best?',
      type: 'design-decision',
      options: ['Singleton', 'Strategy pattern - each channel is a strategy behind a NotificationSender interface', 'Factory', 'Observer'],
      correctAnswer: 'Strategy pattern - each channel is a strategy behind a NotificationSender interface',
      explanation: 'Strategy pattern lets you swap notification channels at runtime. Adding a new channel means creating a new strategy class without touching existing code.',
      romanUrduExplanation: 'Strategy pattern runtime par notification channels swap karne deta hai. Naya channel add karna matlab naya strategy class banana without existing code chhue.',
      relatedConcepts: ['strategy', 'open-closed', 'interface'], difficulty: 'medium',
    },
    {
      id: 'm13-sq-002', title: 'E-Commerce Price Calculator',
      scenario: 'An e-commerce platform needs to calculate prices with different tax rules (regular, reduced, zero), different discount strategies (percentage, fixed, BOGO), and different currency conversions.',
      question: 'How should you design the pricing engine?',
      type: 'design-decision',
      options: [
        'One giant class with if-else for every combination',
        'Strategy pattern for tax, discount, and currency - compose them together',
        'Inheritance hierarchy for each pricing type',
        'Use static methods for all calculations',
      ],
      correctAnswer: 'Strategy pattern for tax, discount, and currency - compose them together',
      explanation: 'Use Strategy for each pricing concern (tax, discount, currency). Compose them in a PriceCalculator. Each concern is independently swappable.',
      romanUrduExplanation: 'Har pricing concern (tax, discount, currency) ke liye Strategy use karo. PriceCalculator mein compose karo. Har concern independently swappable hai.',
      relatedConcepts: ['strategy', 'composition', 'single-responsibility'], difficulty: 'hard',
    },
  ],
  outputs: [
    {
      id: 'm13-oq-001', lessonId: 'lesson-13-01',
      code: `interface PaymentStrategy {
    void pay(double amount);
}

class CreditCardPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Paid $" + amount + " via Credit Card");
    }
}

class PayPalPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Paid $" + amount + " via PayPal");
    }
}

class Checkout {
    private PaymentStrategy strategy;
    Checkout(PaymentStrategy s) { this.strategy = s; }
    void process(double amount) { strategy.pay(amount); }
}

public class Main {
    public static void main(String[] args) {
        new Checkout(new CreditCardPayment()).process(100);
        new Checkout(new PayPalPayment()).process(50);
    }
}`,
      options: ['Paid $100 via Credit Card, Paid $50 via PayPal', 'Paid $50 via Credit Card, Paid $100 via PayPal', 'Compilation error', 'Paid $150 via Credit Card'],
      correctOutput: 'Paid $100 via Credit Card, Paid $50 via PayPal',
      explanation: 'Each Checkout uses a different PaymentStrategy. The first pays via Credit Card (100), second via PayPal (50).',
      romanUrduExplanation: 'Har Checkout alag PaymentStrategy use karta hai. Pehla Credit Card se pay karta hai (100), doosra PayPal se (50).',
      conceptTested: ['strategy-pattern', 'polymorphism', 'interface'], difficulty: 'medium',
    },
  ],
  debugs: [
    {
      id: 'm13-dc-001', title: 'God Class Violation',
      description: 'A class handles too many responsibilities, violating Single Responsibility Principle.',
      buggyCode: `public class UserManager {
    void createUser(String name) { /* ... */ }
    void deleteUser(String id) { /* ... */ }
    void sendEmail(String to, String msg) { /* ... */ }
    void generateReport() { /* ... */ }
    void connectDatabase() { /* ... */ }
    void encryptData(String data) { /* ... */ }
}`,
      expectedBehavior: 'Each class should have only one reason to change.',
      hints: ['Split responsibilities into separate classes', 'Group related methods into focused classes', 'Follow Single Responsibility Principle'],
      solution: `class UserRepository {
    void createUser(String name) { /* ... */ }
    void deleteUser(String id) { /* ... */ }
}

class EmailService {
    void sendEmail(String to, String msg) { /* ... */ }
}

class ReportGenerator {
    void generateReport() { /* ... */ }
}

class DatabaseManager {
    void connectDatabase() { /* ... */ }
}`,
      explanation: 'Each class handles one responsibility. UserRepository manages users, EmailService handles emails, etc.',
      romanUrduExplanation: 'Har class ek responsibility handle karti hai. UserRepository users manage karta hai, EmailService emails handle karta hai, etc.',
      difficulty: 'medium', topicTags: ['srp', 'solid', 'refactoring'], xpReward: 60,
      errorMessage: 'Multiple reasons to change', errorType: 'oop-design', conceptTested: ['srp', 'solid'],
    },
  ],
  mistakes: [
    {
      id: 'm13-mq-001', title: 'Using Inheritance for Code Reuse Only',
      code: `class Tool {
    void copy() { /* copy logic */ }
    void paste() { /* paste logic */ }
}

class Robot extends Tool {
    // Robot doesn't need copy/paste
    // But inherits them anyway!
}`,
      mistakeDescription: 'Inheriting just for code reuse violates Liskov Substitution Principle.',
      possibleMistakes: ['Using inheritance just to reuse code', 'Not checking IS-A relationship', 'Forcing subclasses to inherit unnecessary behavior'],
      correctMistake: 'Use composition for code reuse. Inheritance should only be used for true IS-A relationships.',
      correction: `class Copier {
    void copy() { /* copy logic */ }
    void paste() { /* paste logic */ }
}

class Robot {
    private Copier copier = new Copier(); // Composition
    // Robot has-a Copier, not IS-A Tool
}`,
      explanation: 'Composition (has-a) is preferred over inheritance (is-a) for code reuse. Robot HAS-A Copier, not IS-A Tool.',
      romanUrduExplanation: 'Code reuse ke liye composition (has-a) inheritance (is-a) se preferred hai. Robot HAS-A Copier hai, IS-A Tool nahi.',
      difficulty: 'medium', conceptTested: ['composition', 'inheritance', 'lsp'],
    },
  ],
  codeCompletions: [
    {
      id: 'm13-cc-001', lessonId: 'lesson-13-01',
      codeTemplate: `// TODO: Implement Singleton pattern for DatabaseConnection
public class DatabaseConnection {
    // Add static instance field
    ____________

    // Add private constructor
    ____________

    // Add public static getInstance method
    ____________
}`,
      blank: 'private static DatabaseConnection instance; private DatabaseConnection() {} public static DatabaseConnection getInstance() { if (instance == null) instance = new DatabaseConnection(); return instance; }',
      acceptedAnswers: [
        'private static DatabaseConnection instance; private DatabaseConnection() {} public static DatabaseConnection getInstance() { if (instance == null) instance = new DatabaseConnection(); return instance; }',
      ],
      explanation: 'Singleton: private static instance, private constructor, public static getInstance(). Lazy initialization creates instance on first call.',
      romanUrduExplanation: 'Singleton: private static instance, private constructor, public static getInstance(). Lazy initialization pehle call par instance banata hai.',
      hints: ['Private static field for the single instance', 'Private constructor prevents external instantiation', 'Static getInstance() returns the single instance'],
      difficulty: 'medium', conceptTested: ['singleton', 'design-patterns'],
    },
  ],
};
