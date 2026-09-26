import type { Module } from '@/types';

export const module15: Module = {
  id: 'module-15',
  title: 'Advanced OOP Practice',
  slug: 'advanced-oop-practice',
  order: 15,
  description: 'Apply all OOP concepts in real-world projects. Learn code review, refactoring, interview preparation, and final assessment.',
  icon: 'Rocket',
  color: '#f59e0b',
  xpReward: 600,
  isUnlocked: true,
  completed: false,
  progress: 0,
  totalDuration: 240,
  prerequisiteModuleIds: ['module-14'],
  lessons: [
    {
      id: 'lesson-15-01',
      moduleId: 'module-15',
      title: 'Capstone Project Planning',
      slug: 'capstone-project-planning',
      order: 1,
      duration: 30,
      description: 'Learn how to plan a complete OOP project from requirements to architecture.',
      learningObjectives: [
        { id: 'lo-15-01-1', description: 'Break down requirements into classes and responsibilities', completed: false },
        { id: 'lo-15-01-2', description: 'Create UML class diagrams for system design', completed: false },
        { id: 'lo-15-01-3', description: 'Identify SOLID principles in project planning', completed: false },
        { id: 'lo-15-01-4', description: 'Plan module dependencies and interfaces', completed: false },
      ],
      englishExplanation: {
        id: 'ee-15-01',
        text: 'Project planning is the foundation of successful OOP development. Before writing code, you must understand requirements, identify entities, and design interactions.\n\nThe planning process involves: (1) Requirements analysis — what should the system do? (2) Entity identification — what objects exist? (3) Responsibility assignment — what does each object do? (4) Interface design — how do objects communicate? (5) Architecture planning — how is code organized?\n\nUse UML class diagrams to visualize your design. Identify classes, their attributes, methods, and relationships (inheritance, composition, dependencies).\n\nApplying SOLID during planning prevents major refactoring later. Assign one responsibility per class during design. Define interfaces before implementations. Plan for extension by identifying variation points.'
      },
      romanUrduExplanation: {
        id: 'ru-15-01',
        text: 'Project planning OOP development ki bunyaad hai. Code likhne se pehle requirements samajhna, entities identify karna aur interactions design karna zaroori hai.\n\nPlanning mein: (1) Requirements analysis (2) Entity identification (3) Responsibility assignment (4) Interface design (5) Architecture planning shamil hai.\n\nUML class diagrams se design visualize karein. SOLID principles planning ke dauran apply karein taake baad mein refactoring na ho.'
      },
      keyPoints: [
        { id: 'kp-15-01-1', title: 'Requirements First', description: 'Understand what before how.' },
        { id: 'kp-15-01-2', title: 'UML Diagrams', description: 'Visualize classes and relationships.' },
        { id: 'kp-15-01-3', title: 'SOLID in Design', description: 'Apply principles before coding.' },
        { id: 'kp-15-01-4', title: 'Interface-First', description: 'Define contracts before implementations.' },
      ],
      codeExamples: [
        {
          id: 'ce-15-01-1',
          title: 'Class Diagram Planning',
          code: '// Step 1: Identify entities\nclass Book { String title; String author; String isbn; }\nclass Member { String name; String id; List<Book> borrowed; }\nclass Library { List<Book> books; List<Member> members; }\n\n// Step 2: Identify relationships\n// Library HAS-A List<Book> (composition)\n// Library HAS-A List<Member> (composition)\n// Member HAS-A List<Book> (association)\n\n// Step 3: Define interfaces\ninterface Borrowable { void borrowBook(Book b); void returnBook(Book b); }\ninterface Searchable { List<Book> searchByTitle(String t); }',
          language: 'java',
          explanation: 'Systematic approach: entities, relationships, interfaces.',
        },
        {
          id: 'ce-15-01-2',
          title: 'Responsibility Assignment',
          code: '// Responsibility: Who does what?\nclass BookManager { // SRP: Book operations only\n    void addBook(Book b) { }\n    Book findByIsbn(String isbn) { return null; }\n}\nclass MemberManager { // SRP: Member operations only\n    void registerMember(Member m) { }\n    Member findById(String id) { return null; }\n}\nclass LoanService { // SRP: Borrowing logic only\n    void processBorrow(Member m, Book b) { }\n}',
          language: 'java',
          explanation: 'Each class has one clear responsibility.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-15-01-1',
          title: 'E-Commerce Platform',
          scenario: 'Planning a system with products, orders, users, and payments.',
          oopConcept: 'Identify Product, Order, User, Payment as core entities. Define interfaces for extensibility.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-15-01-1',
          title: 'Skipping Planning',
          incorrectCode: '// Jumping straight to coding\nclass Everything { void doEverything() { } }',
          correctCode: '// Plan first, code second\nclass OrderService { void process(Order o) { } }',
          explanation: 'Lack of planning leads to God classes.',
        },
      ],
      examNotes: [
        { id: 'en-15-01-1', title: 'Planning Steps', content: 'Requirements, Entities, Responsibilities, Interfaces, Architecture.', importance: 'high' },
        { id: 'en-15-01-2', title: 'UML Benefits', content: 'Visualization, documentation, communication tool.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-15-01-1', question: 'What is the first step in project planning?', answer: 'Understanding requirements thoroughly.', difficulty: 'easy' },
        { id: 'vq-15-01-2', question: 'Why use UML diagrams?', answer: 'To visualize class structures, relationships, and system architecture.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-15-01-1', type: 'mcq', question: 'What should be defined before implementations?', options: ['Classes', 'Interfaces', 'Methods', 'Variables'], correctAnswer: 'Interfaces', explanation: 'Interface-first design.' },
        { id: 'qc-15-01-2', type: 'true-false', question: 'You can skip planning for small projects.', correctAnswer: 'False', explanation: 'Even small projects benefit from basic planning.', difficulty: 'easy' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-15-01-1',
          title: 'Library System',
          scenario: 'Design a library management system with books, members, and loans.',
          question: 'What are the core entities?',
          type: 'design-decision',
          options: ['Book, Member, Loan, Library', 'Book, User, Data, System', 'Library, Database, UI', 'Book, Member, Everything'],
          correctAnswer: 'Book, Member, Loan, Library',
          explanation: 'Four core entities with clear responsibilities.',
          relatedConcepts: ['Planning', 'UML', 'SOLID'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-capstone-planning',
      prerequisites: ['lesson-14-10'],
      xpReward: 75,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'planning',
      difficulty: 'medium',
      estimatedMinutes: 30,
    },
    {
      id: 'lesson-15-02',
      moduleId: 'module-15',
      title: 'Library System Design',
      slug: 'library-system-design',
      order: 2,
      duration: 35,
      description: 'Design and implement a complete library management system using OOP principles.',
      learningObjectives: [
        { id: 'lo-15-02-1', description: 'Design Book, Member, and Loan classes', completed: false },
        { id: 'lo-15-02-2', description: 'Implement borrowing and returning logic', completed: false },
        { id: 'lo-15-02-3', description: 'Apply SRP to separate concerns', completed: false },
        { id: 'lo-15-02-4', description: 'Use interfaces for extensibility', completed: false },
      ],
      englishExplanation: {
        id: 'ee-15-02',
        text: 'A library system is a classic OOP exercise. Core entities: Book (title, author, ISBN, availability), Member (name, ID, borrowed books), Loan (book, member, dates).\n\nDesign principles applied: SRP — BookManager handles books, LoanService handles borrowing. OCP — Payment interface for fines (extensible). DIP — Depend on interfaces, not concrete classes.\n\nThe system demonstrates: encapsulation (private fields with getters), abstraction (interfaces for search), polymorphism (different member types), and inheritance (extending base behaviors).'
      },
      romanUrduExplanation: {
        id: 'ru-15-02',
        text: 'Library system ek classic OOP exercise hai. Core entities: Book, Member, Loan. SRP se BookManager aur LoanService alag karein. OCP se Payment interface extend karein. DIP se interfaces par depend karein.\n\nSystem encapsulation, abstraction, polymorphism aur inheritance demonstrate karta hai.'
      },
      keyPoints: [
        { id: 'kp-15-02-1', title: 'Core Entities', description: 'Book, Member, Loan — clear responsibilities.' },
        { id: 'kp-15-02-2', title: 'State Management', description: 'Track book availability and member history.' },
        { id: 'kp-15-02-3', title: 'Business Rules', description: 'Max books, loan periods, fines.' },
      ],
      codeExamples: [
        {
          id: 'ce-15-02-1',
          title: 'Book Class',
          code: 'class Book {\n    private String title;\n    private String author;\n    private String isbn;\n    private boolean available;\n\n    Book(String title, String author, String isbn) {\n        this.title = title;\n        this.author = author;\n        this.isbn = isbn;\n        this.available = true;\n    }\n\n    String getTitle() { return title; }\n    String getIsbn() { return isbn; }\n    boolean isAvailable() { return available; }\n    void setAvailable(boolean a) { this.available = a; }\n}',
          language: 'java',
          explanation: 'Encapsulated Book with private fields and getters.',
        },
        {
          id: 'ce-15-02-2',
          title: 'Loan Service',
          code: 'class LoanService {\n    private static final int MAX_BOOKS = 5;\n    private static final int LOAN_DAYS = 14;\n\n    boolean borrow(Member m, Book b) {\n        if (!b.isAvailable()) return false;\n        if (m.getBorrowed().size() >= MAX_BOOKS) return false;\n        b.setAvailable(false);\n        m.getBorrowed().add(b);\n        return true;\n    }\n\n    void returnBook(Member m, Book b) {\n        m.getBorrowed().remove(b);\n        b.setAvailable(true);\n    }\n}',
          language: 'java',
          explanation: 'SRP: Only handles borrowing logic.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-15-02-1',
          title: 'University Library',
          scenario: 'Manage thousands of books and student members.',
          oopConcept: 'Scalable design with clean separation of concerns.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-15-02-1',
          title: 'God Library Class',
          incorrectCode: 'class Library { void addBook() { } void removeBook() { } void borrow() { } void returnBook() { } void search() { } void generateReport() { } }',
          correctCode: 'class BookManager { } class LoanService { } class SearchService { }',
          explanation: 'Split responsibilities into separate classes.',
        },
      ],
      examNotes: [
        { id: 'en-15-02-1', title: 'Library Design', content: 'Book, Member, Loan as core entities. Apply SRP, OCP, DIP.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-15-02-1', question: 'What are the core classes in a library system?', answer: 'Book, Member, Loan, BookManager, LoanService.', difficulty: 'easy' },
        { id: 'vq-15-02-2', question: 'How do you enforce borrowing limits?', answer: 'Check member borrowed count against MAX_BOOKS in LoanService.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-15-02-1', type: 'mcq', question: 'Which class handles borrowing logic?', options: ['Book', 'Member', 'LoanService', 'Library'], correctAnswer: 'LoanService', explanation: 'LoanService follows SRP.' },
        { id: 'qc-15-02-2', type: 'true-false', question: 'Book class should handle borrowing.', correctAnswer: 'False', explanation: 'Book only manages its own state.', difficulty: 'easy' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-15-02-1',
          title: 'Add Fine System',
          scenario: 'Add fine calculation for late returns.',
          question: 'How to extend?',
          type: 'design-decision',
          options: ['Add fine method to LoanService', 'Create FineCalculator interface', 'Add fine to Book class'],
          correctAnswer: 'Create FineCalculator interface',
          explanation: 'OCP: Extend via new interface, not modification.',
          relatedConcepts: ['OCP', 'Interface'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-library-system',
      prerequisites: ['lesson-15-01'],
      xpReward: 75,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'system-design',
      difficulty: 'medium',
      estimatedMinutes: 35,
    },
    {
      id: 'lesson-15-03',
      moduleId: 'module-15',
      title: 'Banking System Design',
      slug: 'banking-system-design',
      order: 3,
      duration: 35,
      description: 'Design a banking system with accounts, transactions, and interest calculation.',
      learningObjectives: [
        { id: 'lo-15-03-1', description: 'Design Account hierarchy with polymorphism', completed: false },
        { id: 'lo-15-03-2', description: 'Implement transaction history tracking', completed: false },
        { id: 'lo-15-03-3', description: 'Apply LSP with different account types', completed: false },
        { id: 'lo-15-03-4', description: 'Use Strategy pattern for interest calculation', completed: false },
      ],
      englishExplanation: {
        id: 'ee-15-03',
        text: 'A banking system showcases OOP through polymorphism and design patterns. Core entities: Account (base), SavingsAccount, CheckingAccount, Transaction.\n\nLSP is critical: SavingsAccount and CheckingAccount must be substitutable for Account. The System should handle both without knowing the specific type.\n\nUse Strategy pattern for interest calculation: InterestStrategy interface with SavingsInterest, CheckingInterest implementations. This follows OCP — add new interest strategies without modifying Account.\n\nTransaction tracking demonstrates encapsulation — transactions are immutable records. The Bank class demonstrates composition — it HAS-A collection of accounts.'
      },
      romanUrduExplanation: {
        id: 'ru-15-03',
        text: 'Banking system OOP ko polymorphism aur design patterns se showcase karta hai. LSP critical hai: SavingsAccount aur CheckingAccount Account ke liye substitutable hona chahiye.\n\nInterest calculation ke liye Strategy pattern use karein. Transaction tracking encapsulation demonstrate karta hai.'
      },
      keyPoints: [
        { id: 'kp-15-03-1', title: 'Account Hierarchy', description: 'Base Account with Savings/Checking subclasses.' },
        { id: 'kp-15-03-2', title: 'Polymorphism', description: 'Different interest rules via Strategy pattern.' },
        { id: 'kp-15-03-3', title: 'Immutable Transactions', description: 'Transaction records cannot be modified.' },
      ],
      codeExamples: [
        {
          id: 'ce-15-03-1',
          title: 'Account Hierarchy',
          code: 'abstract class Account {\n    protected double balance;\n    protected String owner;\n    abstract double calculateInterest();\n    void deposit(double amount) { balance += amount; }\n    void withdraw(double amount) { balance -= amount; }\n    double getBalance() { return balance; }\n}\nclass SavingsAccount extends Account {\n    double calculateInterest() { return balance * 0.05; }\n}\nclass CheckingAccount extends Account {\n    double calculateInterest() { return 0; }\n}',
          language: 'java',
          explanation: 'LSP: Both account types are substitutable.',
        },
        {
          id: 'ce-15-03-2',
          title: 'Strategy Pattern for Interest',
          code: 'interface InterestStrategy {\n    double calculate(double balance);\n}\nclass SavingsInterest implements InterestStrategy {\n    public double calculate(double b) { return b * 0.05; }\n}\nclass HighYieldInterest implements InterestStrategy {\n    public double calculate(double b) { return b * 0.08; }\n}\nclass Account {\n    private InterestStrategy interestStrategy;\n    void setInterestStrategy(InterestStrategy s) { this.interestStrategy = s; }\n    double calculateInterest() { return interestStrategy.calculate(balance); }\n}',
          language: 'java',
          explanation: 'OCP: New interest types without modifying Account.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-15-03-1',
          title: 'Bank Application',
          scenario: 'Manage multiple account types with different rules.',
          oopConcept: 'Polymorphism and Strategy pattern in production systems.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-15-03-1',
          title: 'Type Checking',
          incorrectCode: 'if (account instanceof SavingsAccount) { /* special logic */ }',
          correctCode: 'interface Interestable { double calculateInterest(); }',
          explanation: 'Use polymorphism instead of instanceof.',
        },
      ],
      examNotes: [
        { id: 'en-15-03-1', title: 'Banking Design', content: 'Account hierarchy, Strategy for interest, immutable transactions.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-15-03-1', question: 'Why use Strategy pattern for interest?', answer: 'To follow OCP — add new interest strategies without modifying Account.', difficulty: 'medium' },
        { id: 'vq-15-03-2', question: 'What is LSP in banking?', answer: 'SavingsAccount and CheckingAccount must work wherever Account is expected.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-15-03-1', type: 'mcq', question: 'Pattern for interest calculation?', options: ['Singleton', 'Factory', 'Strategy'], correctAnswer: 'Strategy', explanation: 'Strategy pattern for varying algorithms.' },
        { id: 'qc-15-03-2', type: 'true-false', question: 'Transactions should be mutable.', correctAnswer: 'False', explanation: 'Transactions are immutable records.', difficulty: 'easy' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-15-03-1',
          title: 'Add Credit Account',
          scenario: 'Add a credit account with overdraft protection.',
          question: 'How to extend?',
          type: 'design-decision',
          options: ['Create CreditAccount extending Account', 'Add overdraft field to Account', 'Create separate CreditAccount class'],
          correctAnswer: 'Create CreditAccount extending Account',
          explanation: 'Follows LSP and OCP.',
          relatedConcepts: ['LSP', 'OCP'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-banking-system',
      prerequisites: ['lesson-15-02'],
      xpReward: 75,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'system-design',
      difficulty: 'hard',
      estimatedMinutes: 35,
    },
    {
      id: 'lesson-15-04',
      moduleId: 'module-15',
      title: 'Code Review Best Practices',
      slug: 'code-review-best-practices',
      order: 4,
      duration: 25,
      description: 'Learn how to review code for OOP compliance, quality, and maintainability.',
      learningObjectives: [
        { id: 'lo-15-04-1', description: 'Identify OOP violations during code review', completed: false },
        { id: 'lo-15-04-2', description: 'Check for SOLID principle compliance', completed: false },
        { id: 'lo-15-04-3', description: 'Provide constructive feedback', completed: false },
        { id: 'lo-15-04-4', description: 'Use automated tools for code quality', completed: false },
      ],
      englishExplanation: {
        id: 'ee-15-04',
        text: 'Code review is essential for maintaining quality. It catches OOP violations early and shares knowledge across the team.\n\nReview checklist for OOP: (1) SRP — does each class have one responsibility? (2) OCP — is extension possible without modification? (3) LSP — do subclasses honor parent contracts? (4) ISP — are interfaces small and focused? (5) DIP — do classes depend on abstractions?\n\nAlso check: naming conventions, encapsulation (private fields), proper use of inheritance vs composition, and error handling.\n\nProvide constructive feedback: explain why, suggest alternatives, and link to documentation. Automated tools (SonarQube, PMD) catch mechanical issues; humans catch design issues.'
      },
      romanUrduExplanation: {
        id: 'ru-15-04',
        text: 'Code review quality maintain karne ke liye zaroori hai. Ye OOP violations early stage par pakadta hai.\n\nReview checklist: SRP, OCP, LSP, ISP, DIP check karein. Naming conventions, encapsulation, inheritance vs composition check karein.\n\nConstructive feedback dein: reason batayein, alternatives suggest karein.'
      },
      keyPoints: [
        { id: 'kp-15-04-1', title: 'Review Checklist', description: 'SOLID, naming, encapsulation, inheritance.' },
        { id: 'kp-15-04-2', title: 'Constructive Feedback', description: 'Explain why, suggest alternatives.' },
        { id: 'kp-15-04-3', title: 'Automated Tools', description: 'SonarQube, PMD for mechanical checks.' },
      ],
      codeExamples: [
        {
          id: 'ce-15-04-1',
          title: 'Code Review: Finding SRP Violation',
          code: '// Review: This class has 4 responsibilities\nclass UserService {\n    void createUser(User u) { }\n    void sendEmail(String to, String msg) { }\n    void generateReport() { }\n    void saveToDatabase(User u) { }\n}\n\n// Feedback: Split into UserService, EmailService, ReportService, UserRepository',
          language: 'java',
          explanation: 'Identified SRP violation with constructive suggestion.',
        },
        {
          id: 'ce-15-04-2',
          title: 'Code Review: Checking LSP',
          code: '// Review: Potential LSP violation\nclass Bird { void fly() { } }\nclass Penguin extends Bird { void fly() { throw new UnsupportedOperationException(); } }\n\n// Feedback: Use Flyable interface for flying birds',
          language: 'java',
          explanation: 'LSP violation caught during review.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-15-04-1',
          title: 'Team Code Review',
          scenario: 'Senior developer reviewing junior code.',
          oopConcept: 'Teaching OOP principles through practical feedback.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-15-04-1',
          title: 'Nitpicking vs Design Issues',
          incorrectCode: '// Comment: Variable name should be camelCase',
          correctCode: '// Comment: This class violates SRP — split into UserService and NotificationService',
          explanation: 'Focus on design, not just formatting.',
        },
      ],
      examNotes: [
        { id: 'en-15-04-1', title: 'Code Review', content: 'SOLID checklist, constructive feedback, automated tools.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-15-04-1', question: 'What to check in OOP code review?', answer: 'SOLID compliance, naming, encapsulation, inheritance vs composition.', difficulty: 'easy' },
        { id: 'vq-15-04-2', question: 'How to provide good feedback?', answer: 'Explain why it is wrong, suggest alternatives, link to documentation.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-15-04-1', type: 'mcq', question: 'What to check first in code review?', options: ['Formatting', 'SOLID principles', 'Variable names'], correctAnswer: 'SOLID principles', explanation: 'Design matters most.' },
        { id: 'qc-15-04-2', type: 'true-false', question: 'Automated tools catch all issues.', correctAnswer: 'False', explanation: 'Tools catch mechanical issues; humans catch design.', difficulty: 'easy' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-15-04-1',
          title: 'Review Feedback',
          scenario: 'You see a class with 10 methods handling auth, logging, and data access.',
          question: 'What feedback do you give?',
          type: 'design-decision',
          options: ['Split into AuthService, Logger, DataAccessService', 'Looks good', 'Rename class'],
          correctAnswer: 'Split into AuthService, Logger, DataAccessService',
          explanation: 'SRP violation.',
          relatedConcepts: ['SRP', 'Code Review'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-code-review',
      prerequisites: ['lesson-15-03'],
      xpReward: 60,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'review',
      difficulty: 'medium',
      estimatedMinutes: 25,
    },
    {
      id: 'lesson-15-05',
      moduleId: 'module-15',
      title: 'Refactoring Techniques',
      slug: 'refactoring-techniques',
      order: 5,
      duration: 30,
      description: 'Learn systematic refactoring techniques to improve code design without changing behavior.',
      learningObjectives: [
        { id: 'lo-15-05-1', description: 'Extract Class for SRP compliance', completed: false },
        { id: 'lo-15-05-2', description: 'Replace conditional with polymorphism', completed: false },
        { id: 'lo-15-05-3', description: 'Extract Interface for DIP', completed: false },
        { id: 'lo-15-05-4', description: 'Move Method to correct class', completed: false },
      ],
      englishExplanation: {
        id: 'ee-15-05',
        text: 'Refactoring is changing code structure without changing behavior. Key techniques:\n\n(1) Extract Class — when a class has multiple responsibilities, extract each into a new class. (2) Replace Conditional with Polymorphism — replace if-else/switch with polymorphic dispatch. (3) Extract Interface — introduce interfaces for DIP. (4) Move Method — move methods to the class where they belong.\n\nGolden rule: never refactor without tests. Tests ensure behavior is preserved. Refactor in small steps, test after each step.'
      },
      romanUrduExplanation: {
        id: 'ru-15-05',
        text: 'Refactoring code structure change karta hai bina behavior badle. Key techniques: Extract Class, Replace Conditional with Polymorphism, Extract Interface, Move Method.\n\nGolden rule: bina tests ke kabhi refactor na karein. Chhote steps mein refactor karein.'
      },
      keyPoints: [
        { id: 'kp-15-05-1', title: 'Extract Class', description: 'Split multi-responsibility classes.' },
        { id: 'kp-15-05-2', title: 'Polymorphism', description: 'Replace conditionals with virtual dispatch.' },
        { id: 'kp-15-05-3', title: 'Tests First', description: 'Never refactor without tests.' },
      ],
      codeExamples: [
        {
          id: 'ce-15-05-1',
          title: 'Extract Class Refactoring',
          code: '// Before\nclass OrderProcessor {\n    void process(Order o) { }\n    void sendEmail(String to, String msg) { }\n    void saveToDb(Order o) { }\n}\n\n// After\nclass OrderProcessor {\n    void process(Order o) { }\n}\nclass EmailService {\n    void send(String to, String msg) { }\n}\nclass OrderRepository {\n    void save(Order o) { }\n}',
          language: 'java',
          explanation: 'Extracted EmailService and OrderRepository.',
        },
        {
          id: 'ce-15-05-2',
          title: 'Replace Conditional with Polymorphism',
          code: '// Before\nclass Shape {\n    double area() {\n        if (type == "circle") return Math.PI * r * r;\n        else if (type == "rectangle") return w * h;\n    }\n}\n\n// After\nabstract class Shape {\n    abstract double area();\n}\nclass Circle extends Shape {\n    double area() { return Math.PI * r * r; }\n}\nclass Rectangle extends Shape {\n    double area() { return w * h; }\n}',
          language: 'java',
          explanation: 'OCP compliant polymorphic design.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-15-05-1',
          title: 'Legacy System Refactoring',
          scenario: '5000-line class with mixed responsibilities.',
          oopConcept: 'Extract Class technique applied systematically.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-15-05-1',
          title: 'Refactoring Without Tests',
          incorrectCode: '// Starting refactoring without tests',
          correctCode: '// Step 1: Write tests\n// Step 2: Refactor',
          explanation: 'Tests are safety nets.',
        },
      ],
      examNotes: [
        { id: 'en-15-05-1', title: 'Refactoring', content: 'Extract Class, Polymorphism, Extract Interface, Move Method. Tests first.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-15-05-1', question: 'What is refactoring?', answer: 'Changing code structure without changing behavior.', difficulty: 'easy' },
        { id: 'vq-15-05-2', question: 'What is the golden rule of refactoring?', answer: 'Never refactor without tests.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-15-05-1', type: 'mcq', question: 'Refactoring means?', options: ['Changing behavior', 'Improving structure', 'Adding features'], correctAnswer: 'Improving structure', explanation: 'Structure without behavior change.' },
        { id: 'qc-15-05-2', type: 'true-false', question: 'Refactor in large steps.', correctAnswer: 'False', explanation: 'Small steps with tests after each.', difficulty: 'easy' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-15-05-1',
          title: 'Switch Statement Refactoring',
          scenario: '100-line switch statement handling different payment types.',
          question: 'How to refactor?',
          type: 'design-decision',
          options: ['Replace with polymorphism', 'Add more cases', 'Add comments'],
          correctAnswer: 'Replace with polymorphism',
          explanation: 'PaymentStrategy interface with implementations.',
          relatedConcepts: ['OCP', 'Polymorphism'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-refactoring',
      prerequisites: ['lesson-15-04'],
      xpReward: 75,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'refactoring',
      difficulty: 'medium',
      estimatedMinutes: 30,
    },
    {
      id: 'lesson-15-06',
      moduleId: 'module-15',
      title: 'OOP Interview Questions',
      slug: 'oop-interview-questions',
      order: 6,
      duration: 25,
      description: 'Prepare for OOP interviews with common questions and detailed answers.',
      learningObjectives: [
        { id: 'lo-15-06-1', description: 'Answer OOP concept questions confidently', completed: false },
        { id: 'lo-15-06-2', description: 'Explain SOLID principles clearly', completed: false },
        { id: 'lo-15-06-3', description: 'Discuss design patterns in interviews', completed: false },
        { id: 'lo-15-06-4', description: 'Solve coding problems using OOP', completed: false },
      ],
      englishExplanation: {
        id: 'ee-15-06',
        text: 'OOP interviews test both conceptual understanding and practical application. Common categories:\n\n(1) Concept questions: What is polymorphism? Explain inheritance. (2) Design questions: Design a parking lot. (3) Code review: Find violations. (4) Coding: Implement a pattern.\n\nKey preparation: Master SOLID principles, know when to use each design pattern, practice explaining concepts simply, and solve design problems.\n\nTips: Use real examples, explain trade-offs, and connect concepts to practical benefits.'
      },
      romanUrduExplanation: {
        id: 'ru-15-06',
        text: 'OOP interviews conceptual understanding aur practical application test karte hain. Common categories: Concept questions, Design questions, Code review, Coding problems.\n\nPreparation: SOLID principles master karein, design patterns jaanein, simple examples dein.'
      },
      keyPoints: [
        { id: 'kp-15-06-1', title: 'Concept Mastery', description: 'Polymorphism, inheritance, encapsulation, abstraction.' },
        { id: 'kp-15-06-2', title: 'SOLID Deep Dive', description: 'Each principle with examples.' },
        { id: 'kp-15-06-3', title: 'Design Problems', description: 'Practice system design questions.' },
      ],
      codeExamples: [
        {
          id: 'ce-15-06-1',
          title: 'Interview: Implement Singleton',
          code: '// Interview question: Implement thread-safe Singleton\npublic class Singleton {\n    private static volatile Singleton instance;\n    private Singleton() { }\n    public static Singleton getInstance() {\n        if (instance == null) {\n            synchronized (Singleton.class) {\n                if (instance == null) {\n                    instance = new Singleton();\n                }\n            }\n        }\n        return instance;\n    }\n}',
          language: 'java',
          explanation: 'Double-checked locking for thread safety.',
        },
        {
          id: 'ce-15-06-2',
          title: 'Interview: Explain LSP',
          code: '// Question: What is Liskov Substitution Principle?\n// Answer with code example:\ninterface Shape { double area(); }\nclass Rectangle implements Shape {\n    private double w, h;\n    public double area() { return w * h; }\n}\nclass Square implements Shape {\n    private double s;\n    public double area() { return s * s; }\n}\n// Both implement Shape correctly — no behavioral surprises',
          language: 'java',
          explanation: 'Explain LSP with concrete code example.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-15-06-1',
          title: 'Tech Interview',
          scenario: 'Design a parking lot system.',
          oopConcept: 'Apply SOLID, patterns, and clear communication.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-15-06-1',
          title: 'Theoretical Only',
          incorrectCode: '// Answer: Polymorphism is when a child class can override parent methods',
          correctCode: '// Answer: Polymorphism means one interface, multiple implementations. For example:\ninterface Payment { void pay(double amount); }\nclass CreditCard implements Payment { void pay(double a) { } }\nclass PayPal implements Payment { void pay(double a) { } }',
          explanation: 'Always give code examples.',
        },
      ],
      examNotes: [
        { id: 'en-15-06-1', title: 'Interview Tips', content: 'Master SOLID, know patterns, practice design problems.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-15-06-1', question: 'What is the difference between abstract class and interface?', answer: 'Abstract class can have implementation and state; interface defines contract only (Java 8+ default methods).', difficulty: 'medium' },
        { id: 'vq-15-06-2', question: 'When to use Singleton?', answer: 'When exactly one instance needed: config, connection pool, cache.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-15-06-1', type: 'mcq', question: 'Most important OOP interview topic?', options: ['Syntax', 'SOLID principles', 'IDE features'], correctAnswer: 'SOLID principles', explanation: 'Foundation of clean code.' },
        { id: 'qc-15-06-2', type: 'true-false', question: 'Interviews only test coding.', correctAnswer: 'False', explanation: 'Design, concepts, and communication matter too.', difficulty: 'easy' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-15-06-1',
          title: 'Design Question',
          scenario: 'Design an elevator system.',
          question: 'How to approach?',
          type: 'design-decision',
          options: ['Identify entities, apply SOLID, discuss trade-offs', 'Start coding immediately', 'Give theoretical answer only'],
          correctAnswer: 'Identify entities, apply SOLID, discuss trade-offs',
          explanation: 'Structured approach impresses interviewers.',
          relatedConcepts: ['Design', 'SOLID', 'Communication'],
          difficulty: 'hard',
        },
      ],
      threeDSceneId: 'scene-interview',
      prerequisites: ['lesson-15-05'],
      xpReward: 60,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'interview',
      difficulty: 'medium',
      estimatedMinutes: 25,
    },
    {
      id: 'lesson-15-07',
      moduleId: 'module-15',
      title: 'Common OOP Design Mistakes',
      slug: 'common-oop-design-mistakes',
      order: 7,
      duration: 25,
      description: 'Learn from common OOP mistakes and how to avoid them.',
      learningObjectives: [
        { id: 'lo-15-07-1', description: 'Identify God Class antipattern', completed: false },
        { id: 'lo-15-07-2', description: 'Recognize over-abstraction problems', completed: false },
        { id: 'lo-15-07-3', description: 'Avoid premature optimization', completed: false },
        { id: 'lo-15-07-4', description: 'Prefer composition over inheritance', completed: false },
      ],
      englishExplanation: {
        id: 'ee-15-07',
        text: 'Common OOP mistakes even experienced developers make:\n\n(1) God Class — one class doing everything. Solution: SRP, extract classes. (2) Over-abstraction — unnecessary interfaces and abstract classes. Solution: KISS, YAGNI. (3) Premature optimization — optimizing before profiling. Solution: Make it work, make it right, make it fast. (4) Deep inheritance chains — fragile base class. Solution: Favor composition. (5) Circular dependencies — tangled design. Solution: Dependency inversion.\n\nThe key is balance. Follow principles pragmatically, not dogmatically.'
      },
      romanUrduExplanation: {
        id: 'ru-15-07',
        text: 'Common OOP mistakes: (1) God Class (2) Over-abstraction (3) Premature optimization (4) Deep inheritance (5) Circular dependencies.\n\nSolution: SRP, KISS, pragmatism.'
      },
      keyPoints: [
        { id: 'kp-15-07-1', title: 'God Class', description: 'One class doing everything — split it.' },
        { id: 'kp-15-07-2', title: 'Over-Abstraction', description: 'Unnecessary interfaces — keep it simple.' },
        { id: 'kp-15-07-3', title: 'Deep Inheritance', description: 'Fragile base class — use composition.' },
      ],
      codeExamples: [
        {
          id: 'ce-15-07-1',
          title: 'God Class',
          code: '// ANTI-PATTERN: God Class\nclass Application {\n    void handleRequest() { }\n    void processPayment() { }\n    void sendEmail() { }\n    void generateReport() { }\n    void logActivity() { }\n    void validateInput() { }\n}\n\n// Fix: Split into RequestHandler, PaymentService, EmailService, ReportGenerator, Logger, Validator',
          language: 'java',
          explanation: 'God class violates SRP completely.',
        },
        {
          id: 'ce-15-07-2',
          title: 'Over-Abstraction',
          code: '// ANTI-PATTERN: Unnecessary abstraction\ninterface GreetingProvider { String getGreeting(); }\ninterface LanguageProvider { String getLanguage(); }\ninterface TimeProvider { String getTime(); }\nclass HelloWorld {\n    private GreetingProvider gp;\n    private LanguageProvider lp;\n    private TimeProvider tp;\n}\n\n// Fix: Keep it simple\nclass HelloWorld {\n    void greet() { System.out.println("Hello, World!"); }\n}',
          language: 'java',
          explanation: 'KISS: Simple greeting needs no interfaces.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-15-07-1',
          title: 'Enterprise Anti-Pattern',
          scenario: '1000-line class with 50 methods.',
          oopConcept: 'God Class leading to unmaintainable code.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-15-07-1',
          title: 'Inheritance Abuse',
          incorrectCode: 'class A { } class B extends A { } class C extends B { } class D extends C { }',
          correctCode: 'class A { private B b; private C c; }',
          explanation: 'Flat composition preferred over deep inheritance.',
        },
      ],
      examNotes: [
        { id: 'en-15-07-1', title: 'Mistakes', content: 'God Class, Over-abstraction, Premature optimization, Deep inheritance.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-15-07-1', question: 'What is a God Class?', answer: 'A class that does everything — violates SRP.', difficulty: 'easy' },
        { id: 'vq-15-07-2', question: 'Why avoid deep inheritance?', answer: 'Fragile base class — parent changes break all children.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-15-07-1', type: 'mcq', question: 'What does God Class violate?', options: ['OCP', 'SRP', 'LSP', 'ISP'], correctAnswer: 'SRP', explanation: 'God Class has too many responsibilities.' },
        { id: 'qc-15-07-2', type: 'true-false', question: 'More abstraction is always better.', correctAnswer: 'False', explanation: 'KISS: Keep it simple.', difficulty: 'easy' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-15-07-1',
          title: 'Class with 30 Methods',
          scenario: 'A class has 30 methods handling different concerns.',
          question: 'What is the issue?',
          type: 'design-decision',
          options: ['God Class — SRP violation', 'Needs more methods', 'Should use inheritance'],
          correctAnswer: 'God Class — SRP violation',
          explanation: 'Split into focused classes.',
          relatedConcepts: ['SRP', 'God Class'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-mistakes',
      prerequisites: ['lesson-15-06'],
      xpReward: 60,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'mistakes',
      difficulty: 'medium',
      estimatedMinutes: 25,
    },
    {
      id: 'lesson-15-08',
      moduleId: 'module-15',
      title: 'Final Assessment and Next Steps',
      slug: 'final-assessment-next-steps',
      order: 8,
      duration: 30,
      description: 'Test your OOP knowledge and learn what to study next.',
      learningObjectives: [
        { id: 'lo-15-08-1', description: 'Complete comprehensive OOP assessment', completed: false },
        { id: 'lo-15-08-2', description: 'Identify areas for further study', completed: false },
        { id: 'lo-15-08-3', description: 'Plan next learning steps', completed: false },
        { id: 'lo-15-08-4', description: 'Apply OOP in real projects', completed: false },
      ],
      englishExplanation: {
        id: 'ee-15-08',
        text: 'This final lesson tests your complete OOP knowledge and guides your next steps.\n\nAssessment covers: All four OOP pillars, SOLID principles, design patterns, refactoring techniques, and practical application.\n\nNext steps in your journey: (1) Practice — build real projects (2) Learn frameworks — Spring, Jakarta EE (3) Study advanced patterns — Builder, Decorator, Adapter (4) Read Clean Architecture by Robert C. Martin (5) Contribute to open source.\n\nOOP is a journey, not a destination. Continue practicing, reading, and building.'
      },
      romanUrduExplanation: {
        id: 'ru-15-08',
        text: 'Ye final lesson aapki complete OOP knowledge test karta hai aur next steps guide karta hai.\n\nAssessment: OOP pillars, SOLID, patterns, refactoring. Next steps: Practice, frameworks, advanced patterns, Clean Architecture read karein.\n\nOOP ek journey hai, destination nahi.'
      },
      keyPoints: [
        { id: 'kp-15-08-1', title: 'Comprehensive Assessment', description: 'Test all OOP concepts learned.' },
        { id: 'kp-15-08-2', title: 'Continuous Learning', description: 'OOP journey never ends.' },
        { id: 'kp-15-08-3', title: 'Practice Projects', description: 'Apply knowledge in real applications.' },
      ],
      codeExamples: [
        {
          id: 'ce-15-08-1',
          title: 'Final Assessment: Design Problem',
          code: '// Question: Design a notification system\n// Solution should demonstrate:\n// 1. SRP: Separate notification types\n// 2. OCP: New types without modification\n// 3. LSP: All notifications substitutable\n// 4. ISP: Small interfaces\n// 5. DIP: Depend on abstractions\n\ninterface Notification { void send(String msg); }\nclass EmailNotification implements Notification { public void send(String m) { } }\nclass SMSNotification implements Notification { public void send(String m) { } }\nclass NotificationService {\n    private List<Notification> notifications;\n    void sendAll(String msg) { notifications.forEach(n -> n.send(msg)); }\n}',
          language: 'java',
          explanation: 'All SOLID principles demonstrated.',
        },
        {
          id: 'ce-15-08-2',
          title: 'Next Step: Spring Boot',
          code: '// Your OOP knowledge prepares you for frameworks\n@RestController\npublic class UserController {\n    private final UserService userService;\n\n    @Autowired\n    public UserController(UserService userService) {\n        this.userService = userService; // DIP in action\n    }\n\n    @GetMapping("/users/{id}")\n    public User getUser(@PathVariable Long id) {\n        return userService.findById(id); // Polymorphism\n    }\n}',
          language: 'java',
          explanation: 'OOP principles in Spring Boot — DIP through IoC.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-15-08-1',
          title: 'Career Progression',
          scenario: 'From OOP basics to enterprise frameworks.',
          oopConcept: 'OOP is foundation for all Java frameworks and enterprise development.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-15-08-1',
          title: 'Stopping at Basics',
          incorrectCode: '// Learning OOP and stopping there',
          correctCode: '// Learning OOP then applying in real projects',
          explanation: 'Continuous practice needed.',
        },
      ],
      examNotes: [
        { id: 'en-15-08-1', title: 'Assessment', content: 'Test all OOP pillars, SOLID, patterns, refactoring.', importance: 'high' },
        { id: 'en-15-08-2', title: 'Next Steps', content: 'Practice, frameworks, advanced patterns, open source.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-15-08-1', question: 'What should you do after learning OOP?', answer: 'Build real projects, learn frameworks like Spring, study advanced patterns.', difficulty: 'easy' },
        { id: 'vq-15-08-2', question: 'Why is OOP important for Java developers?', answer: 'Foundation for all Java frameworks, enterprise applications, and clean code.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-15-08-1', type: 'mcq', question: 'Best way to learn OOP?', options: ['Read only', 'Build projects', 'Memorize syntax'], correctAnswer: 'Build projects', explanation: 'Practice makes perfect.' },
        { id: 'qc-15-08-2', type: 'true-false', question: 'OOP learning ends after this course.', correctAnswer: 'False', explanation: 'Continuous learning and practice needed.', difficulty: 'easy' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-15-08-1',
          title: 'Next Learning Path',
          scenario: 'You have completed this OOP course.',
          question: 'What should you do next?',
          type: 'design-decision',
          options: ['Build a real project using OOP', 'Learn a new language', 'Stop learning'],
          correctAnswer: 'Build a real project using OOP',
          explanation: 'Apply knowledge in practice.',
          relatedConcepts: ['Practice', 'Projects'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-final-assessment',
      prerequisites: ['lesson-15-07'],
      xpReward: 75,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'assessment',
      difficulty: 'medium',
      estimatedMinutes: 30,
    },
  ],
};
