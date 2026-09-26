import type { Module } from '@/types';

export const module14: Module = {
  id: 'module-14',
  title: 'OOP Design Principles',
  slug: 'oop-design-principles',
  order: 14,
  description: 'Master the fundamental design principles that guide professional software development. Learn SOLID, DRY, KISS, composition over inheritance, and common design patterns.',
  icon: 'Compass',
  color: '#8b5cf6',
  xpReward: 750,
  isUnlocked: true,
  completed: false,
  progress: 0,
  totalDuration: 300,
  prerequisiteModuleIds: ['module-13'],
  lessons: [
    {
      id: 'lesson-14-01',
      moduleId: 'module-14',
      title: 'SOLID Principles Overview',
      slug: 'solid-principles-overview',
      order: 1,
      duration: 25,
      description: 'Comprehensive overview of all five SOLID principles, their importance, and when to apply them.',
      learningObjectives: [
        { id: 'lo-14-01-1', description: 'Define the SOLID acronym and name all five principles', completed: false },
        { id: 'lo-14-01-2', description: 'Explain why SOLID principles are essential for professional software', completed: false },
        { id: 'lo-14-01-3', description: 'Identify the relationship between SOLID and OOP pillars', completed: false },
        { id: 'lo-14-01-4', description: 'Understand when to apply each principle during development', completed: false },
      ],
      englishExplanation: {
        id: 'ee-14-01',
        text: 'SOLID is an acronym representing five fundamental design principles of object-oriented programming introduced by Robert C. Martin (Uncle Bob). SOLID stands for Single Responsibility Principle (SRP), Open/Closed Principle (OCP), Liskov Substitution Principle (LSP), Interface Segregation Principle (ISP), and Dependency Inversion Principle (DIP).\n\nThe importance of SOLID principles cannot be overstated. They provide a systematic approach to designing classes and systems that are maintainable, testable, and scalable. Without SOLID, codebases tend to become tangled, fragile, and difficult to modify. When you follow SOLID principles, each class has a clear purpose, changes ripple minimally through the system, and new features can be added without breaking existing functionality.\n\nSOLID principles directly complement the four OOP pillars (Encapsulation, Inheritance, Polymorphism, Abstraction). While the pillars describe what OOP can do, SOLID describes how to use OOP well. Encapsulation becomes meaningful when combined with SRP. Inheritance becomes safer when following LSP. Polymorphism becomes more useful when supported by ISP and DIP.\n\nApplying SOLID principles is not about rigidly following rules in every line of code. It is about understanding the trade-offs and knowing when strict adherence provides value. In prototype or small scripts, strict SOLID may be over-engineering. In enterprise applications with long lifecycles, SOLID principles pay dividends in reduced technical debt, easier debugging, and smoother team collaboration.\n\nThe five principles work together as a system. Violating one often leads to violations of others. For example, a God Class that does everything violates SRP, which makes it hard to extend without modifying (violating OCP), and forces clients to depend on methods they do not use (violating ISP). Understanding these interconnections is key to mastering software design.'
      },
      romanUrduExplanation: {
        id: 'ru-14-01',
        text: 'SOLID ek acronym hai jo object-oriented programming ki paanch fundamental design principles ko represent karta hai. Ye principles Robert C. Martin (Uncle Bob) ne introduce kiye the. SOLID ka matlab hai Single Responsibility Principle (SRP), Open/Closed Principle (OCP), Liskov Substitution Principle (LSP), Interface Segregation Principle (ISP), aur Dependency Inversion Principle (DIP).\n\nSOLID principles ki importance bohat zyada hai. Ye classes aur systems design karne ka systematic approach provide karte hain jo maintainable, testable aur scalable hon. SOLID ke bina codebases tangled aur modify karna mushkil ho jaate hain. Jab aap SOLID principles follow karte hain, toh har class ka clear purpose hota hai aur naye features existing functionality todne ke bina add ho sakte hain.\n\nSOLID principles OOP ke four pillars (Encapsulation, Inheritance, Polymorphism, Abstraction) ko directly complement karte hain. Encapsulation SRP ke saath meaningful hota hai. Inheritance LSP ke saath safer hota hai. Polymorphism ISP aur DIP ke saath zyada useful hota hai.\n\nSOLID principles ko apply karna har line of code mein strictly follow karne ke baare mein nahi hai. Ye trade-offs samajhne ke baare mein hai. Enterprise applications mein SOLID principles reduced technical debt aur easier debugging mein dividends dete hain.'
      },
      keyPoints: [
        { id: 'kp-14-01-1', title: 'SOLID Acronym', description: 'Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.' },
        { id: 'kp-14-01-2', title: 'Robert C. Martin', description: 'Uncle Bob formalized these principles. Foundational to Agile and Clean Architecture.' },
        { id: 'kp-14-01-3', title: 'Complement OOP Pillars', description: 'SOLID guides how to apply Encapsulation, Inheritance, Polymorphism, and Abstraction effectively.' },
        { id: 'kp-14-01-4', title: 'Context Matters', description: 'Apply SOLID pragmatically. Small utilities may not need strict adherence; large systems benefit enormously.' },
      ],
      codeExamples: [
        {
          id: 'ce-14-01-1',
          title: 'SOLID Principles at a Glance',
          code: '// SRP: One class, one job\nclass ReportGenerator {\n    String generateReport(Data data) { return data.toString(); }\n}\n\n// OCP: Open for extension, closed for modification\nabstract class Shape {\n    abstract double area();\n}\nclass Circle extends Shape {\n    double radius;\n    double area() { return Math.PI * radius * radius; }\n}\n\n// LSP: Subtypes must be substitutable\nclass Animal { void speak() { } }\nclass Dog extends Animal { void speak() { System.out.println("Woof"); } }\n\n// ISP: Small, role-based interfaces\ninterface Readable { String read(); }\ninterface Writable { void write(String data); }\n\n// DIP: Depend on abstractions\ninterface DataSource { String fetchData(); }\nclass Database implements DataSource {\n    public String fetchData() { return "db data"; }\n}',
          language: 'java',
          explanation: 'Each principle is shown in its simplest form.',
        },
        {
          id: 'ce-14-01-2',
          title: 'SOLID Violations in One Class',
          code: '// VIOLATES ALL FIVE SOLID PRINCIPLES\nclass GodClass {\n    private String data;\n    void generateReport() { /* SRP: too many responsibilities */ }\n    void sendEmail() { /* SRP: unrelated responsibility */ }\n    void saveToDatabase() { /* SRP: yet another responsibility */ }\n    void generateReport(String type) {\n        if (type.equals("pdf")) { /* OCP: must modify for new types */ }\n        else if (type.equals("html")) { /* OCP: must modify */ }\n    }\n}',
          language: 'java',
          explanation: 'This GodClass violates every SOLID principle.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-14-01-1',
          title: 'Enterprise Application Architecture',
          scenario: 'A large banking application has hundreds of classes. Without SOLID, adding a new account type would require modifying existing classes, creating God Classes, and coupling everything to a specific database.',
          oopConcept: 'SOLID principles ensure adding a new account type only requires creating a new subclass, report generation is separated, and database access is abstracted behind interfaces.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-14-01-1',
          title: 'Over-Engineering with SOLID',
          incorrectCode: 'interface GreetingProvider { String provideGreeting(); }\nclass EnglishGreetingProvider implements GreetingProvider {\n    public String provideGreeting() { return "Hello"; }\n}',
          correctCode: 'class Greeting {\n    static String hello() { return "Hello"; }\n}',
          explanation: 'SOLID is not about maximum abstraction. It is about appropriate abstraction.',
        },
      ],
      examNotes: [
        { id: 'en-14-01-1', title: 'SOLID Definition', content: 'SOLID = SRP + OCP + LSP + ISP + DIP. Five principles by Robert C. Martin for clean OOP design.', importance: 'high' },
        { id: 'en-14-01-2', title: 'Principle Interconnection', content: 'The five principles work together. Violating one often leads to violating others.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-14-01-1', question: 'What does SOLID stand for?', answer: 'Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion Principles.', difficulty: 'easy' },
        { id: 'vq-14-01-2', question: 'Why are SOLID principles important?', answer: 'They produce maintainable, testable, scalable code. They reduce technical debt and make systems easier to extend.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-14-01-1', type: 'mcq', question: 'Who introduced the SOLID principles?', options: ['James Gosling', 'Robert C. Martin', 'Andrew Hunt', 'Grady Booch'], correctAnswer: 'Robert C. Martin', explanation: 'Robert C. Martin (Uncle Bob) formalized SOLID.' },
        { id: 'qc-14-01-2', type: 'true-false', question: 'SOLID principles should be applied strictly regardless of project size.', correctAnswer: 'False', explanation: 'Apply SOLID pragmatically based on context.' },
        { id: 'qc-14-01-3', type: 'mcq', question: 'Which principle states a class should have only one reason to change?', options: ['OCP', 'SRP', 'LSP', 'ISP'], correctAnswer: 'SRP', explanation: 'SRP = Single Responsibility Principle.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-14-01-1',
          title: 'Choosing When to Apply SOLID',
          scenario: 'You are building a small command-line utility with 50 lines of code.',
          question: 'What is the most appropriate response?',
          type: 'design-decision',
          options: ['Apply all SOLID principles strictly', 'Apply SOLID pragmatically', 'Ignore SOLID entirely', 'Only apply SRP'],
          correctAnswer: 'Apply SOLID pragmatically',
          explanation: 'A small utility does not benefit from deep interface hierarchies.',
          relatedConcepts: ['SOLID', 'pragmatic-design', 'YAGNI'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-solid-overview',
      prerequisites: [],
      xpReward: 75,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'design-principles',
      difficulty: 'medium',
      estimatedMinutes: 25,
    },
    {
      id: 'lesson-14-02',
      moduleId: 'module-14',
      title: 'Single Responsibility Principle',
      slug: 'single-responsibility-principle',
      order: 2,
      duration: 25,
      description: 'Deep dive into SRP. Learn why each class should have exactly one job and how high cohesion leads to better code.',
      learningObjectives: [
        { id: 'lo-14-02-1', description: 'Define the Single Responsibility Principle precisely', completed: false },
        { id: 'lo-14-02-2', description: 'Identify SRP violations in existing code', completed: false },
        { id: 'lo-14-02-3', description: 'Understand the relationship between SRP and cohesion', completed: false },
        { id: 'lo-14-02-4', description: 'Refactor a multi-responsibility class into focused classes', completed: false },
      ],
      englishExplanation: {
        id: 'ee-14-02',
        text: 'The Single Responsibility Principle (SRP) states that a class should have only one reason to change. A "reason to change" refers to a source of change — typically a stakeholder or a business concern. If a class handles user authentication AND report generation, it has at least two reasons to change.\n\nSRP directly relates to cohesion. A class with high cohesion has all its methods and fields working together toward a single purpose. High cohesion makes classes easier to understand, test, and maintain.\n\nThe benefits are significant. Testing becomes simpler because each class has a focused test suite. Bug isolation is easier because each class has a small surface area. Team collaboration improves because different developers can work on different classes without conflicts.\n\nTo identify SRP violations, ask: "Does this class have more than one reason to change?" Common signs include: methods operating on unrelated fields, importing packages for different domains, or class names containing "And" or "Manager".'
      },
      romanUrduExplanation: {
        id: 'ru-14-02',
        text: 'SRP state karta hai ke ek class ka sirf ek reason hona chahiye change karne ka. "Reason to change" ek source of change refer karta hai. Agar ek class user authentication AND report generation handle karti hai, toh uske kam se kam do reasons hain.\n\nSRP directly cohesion se related hai. High cohesion wali class ke saare methods ek single purpose ki taraf milkar kaam karte hain. Testing asaan ho jaati hai. Bug isolation asaan ho jaata hai. Team collaboration improve hota hai.'
      },
      keyPoints: [
        { id: 'kp-14-02-1', title: 'One Reason to Change', description: 'A class should have exactly one source of change.' },
        { id: 'kp-14-02-2', title: 'High Cohesion', description: 'All methods and fields should work toward a single purpose.' },
        { id: 'kp-14-02-3', title: 'Bug Isolation', description: 'Bugs are confined to individual classes.' },
        { id: 'kp-14-02-4', title: 'Refactoring', description: 'Identify responsibilities, extract each into a new class.' },
      ],
      codeExamples: [
        {
          id: 'ce-14-02-1',
          title: 'SRP Violation: Employee Class',
          code: '// SRP VIOLATION: Multiple responsibilities\nclass Employee {\n    String name; double salary;\n    double calculateSalary() { return salary; }\n    String generateReport() { return "Employee: " + name; }\n    void saveToDatabase() { /* JDBC */ }\n    void sendEmail(String msg) { /* SMTP */ }\n}',
          language: 'java',
          explanation: 'Four responsibilities in one class — four reasons to change.',
        },
        {
          id: 'ce-14-02-2',
          title: 'SRP Compliant: Separated Responsibilities',
          code: 'class Employee {\n    private String name; private double salary;\n    Employee(String name, double salary) { this.name = name; this.salary = salary; }\n    String getName() { return name; }\n    double getSalary() { return salary; }\n}\nclass EmployeeReportGenerator {\n    String generate(Employee emp) { return "Employee: " + emp.getName(); }\n}\nclass EmployeeRepository {\n    void save(Employee emp) { /* JDBC */ }\n}\nclass EmailService {\n    void send(String to, String msg) { /* SMTP */ }\n}',
          language: 'java',
          explanation: 'Each class has one responsibility.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-14-02-1',
          title: 'E-Commerce Order Processing',
          scenario: 'An OrderProcessor handles validation, payment, inventory, and notifications.',
          oopConcept: 'Split into OrderValidator, PaymentProcessor, InventoryManager, and NotificationService.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-14-02-1',
          title: 'Over-Splitting',
          incorrectCode: 'class NameFormatter { String f(String n) { return n.trim(); } }\nclass SalaryValidator { boolean v(double s) { return s > 0; } }',
          correctCode: 'class Employee {\n    Employee(String n, double s) {\n        this.name = n.trim();\n        if (s <= 0) throw new IllegalArgumentException();\n    }\n}',
          explanation: 'SRP does not mean a class for every method.',
        },
      ],
      examNotes: [
        { id: 'en-14-02-1', title: 'SRP Definition', content: 'One class, one reason to change. One job, one responsibility.', importance: 'high' },
        { id: 'en-14-02-2', title: 'Cohesion', content: 'SRP promotes high cohesion. Low cohesion indicates SRP violation.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-14-02-1', question: 'What is SRP?', answer: 'A class should have only one reason to change.', difficulty: 'easy' },
        { id: 'vq-14-02-2', question: 'How does SRP relate to cohesion?', answer: 'SRP promotes high cohesion — all methods working toward one purpose.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-14-02-1', type: 'true-false', question: 'A class handling auth and reports follows SRP.', correctAnswer: 'False', explanation: 'Two distinct responsibilities — split into separate classes.' },
        { id: 'qc-14-02-2', type: 'mcq', question: 'SRP stands for?', options: ['Single Responsibility Principle', 'Static Reference Pattern'], correctAnswer: 'Single Responsibility Principle', explanation: 'SRP = Single Responsibility Principle.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-14-02-1',
          title: 'Report Class Refactoring',
          scenario: 'A Report class generates HTML, sends email, and saves files.',
          question: 'How to follow SRP?',
          type: 'design-decision',
          options: ['Split into ReportGenerator, EmailSender, FileSaver', 'Add comments', 'Use main method', 'Create ReportManager'],
          correctAnswer: 'Split into ReportGenerator, EmailSender, FileSaver',
          explanation: 'Each responsibility gets its own class.',
          relatedConcepts: ['SRP'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-srp',
      prerequisites: ['lesson-14-01'],
      xpReward: 75,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'srp',
      difficulty: 'medium',
      estimatedMinutes: 25,
    },
    {
      id: 'lesson-14-03',
      moduleId: 'module-14',
      title: 'Open/Closed Principle',
      slug: 'open-closed-principle',
      order: 3,
      duration: 25,
      description: 'Master OCP: software entities should be open for extension but closed for modification.',
      learningObjectives: [
        { id: 'lo-14-03-1', description: 'Define the Open/Closed Principle precisely', completed: false },
        { id: 'lo-14-03-2', description: 'Design classes that are extensible without modification', completed: false },
        { id: 'lo-14-03-3', description: 'Use abstract classes and interfaces to achieve OCP', completed: false },
        { id: 'lo-14-03-4', description: 'Identify OCP violations and refactor them', completed: false },
      ],
      englishExplanation: {
        id: 'ee-14-03',
        text: 'The Open/Closed Principle (OCP) states that software entities should be open for extension but closed for modification. You should be able to add new functionality without changing existing, tested code.\n\n"Open for extension" means behavior can be extended by creating new subclasses or implementing new interfaces. "Closed for modification" means existing source code does not need to be modified. This is achieved through abstraction and polymorphism.\n\nThe practical mechanism is programming to an interface. Define an abstraction that captures invariant behavior. New features are implemented as new classes. Client code depends only on the abstraction and does not change when new implementations are added.\n\nA classic example: a notification system. Instead of a switch statement, define a Notification interface. EmailNotification, SMSNotification, and PushNotification each implement send() differently. New types are new classes — no existing code changes.'
      },
      romanUrduExplanation: {
        id: 'ru-14-03',
        text: 'OCP state karta hai ke software entities extension ke liye open honi chahiye lekin modification ke liye closed. Nayi functionality add karne ke liye existing code change ki zaroorat nahi. Ye abstraction aur polymorphism ke through achieve hota hai.\n\n"Open for extension" ka matlab hai behavior naye subclasses se extend ho sakta hai. "Closed for modification" ka matlab hai existing code modify nahi hota. Programming to an interface se achieve hota hai.'
      },
      keyPoints: [
        { id: 'kp-14-03-1', title: 'Open for Extension', description: 'New behavior via new classes, not modifying existing ones.' },
        { id: 'kp-14-03-2', title: 'Closed for Modification', description: 'Existing code remains untouched.' },
        { id: 'kp-14-03-3', title: 'Abstraction', description: 'Interfaces/abstract classes capture invariant behavior.' },
        { id: 'kp-14-03-4', title: 'Avoid Switch', description: 'Switch/if-else chains indicate OCP violations.' },
      ],
      codeExamples: [
        {
          id: 'ce-14-03-1',
          title: 'OCP Violation: Switch Statement',
          code: 'class NotificationService {\n    void send(String type, String msg) {\n        if (type.equals("email")) { System.out.println("Email: " + msg); }\n        else if (type.equals("sms")) { System.out.println("SMS: " + msg); }\n    }\n}',
          language: 'java',
          explanation: 'New types require modifying this method.',
        },
        {
          id: 'ce-14-03-2',
          title: 'OCP Compliant: Extensible Design',
          code: 'interface Notification { void send(String msg); }\nclass EmailNotification implements Notification {\n    public void send(String msg) { System.out.println("Email: " + msg); }\n}\nclass SMSNotification implements Notification {\n    public void send(String msg) { System.out.println("SMS: " + msg); }\n}\nclass NotificationService {\n    void send(Notification n, String msg) { n.send(msg); }\n}',
          language: 'java',
          explanation: 'New types = new classes. Service never changes.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-14-03-1',
          title: 'Payment Processing System',
          scenario: 'Adding PayPal and crypto without modifying credit card code.',
          oopConcept: 'PaymentProcessor interface with CreditCardProcessor, PayPalProcessor, CryptoProcessor.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-14-03-1',
          title: 'instanceof Chains',
          incorrectCode: 'if (s instanceof Circle) ... else if (s instanceof Rect) ...',
          correctCode: 'abstract class Shape { abstract double area(); }\nclass Circle extends Shape { ... }\nclass Rect extends Shape { ... }',
          explanation: 'Use polymorphism instead of instanceof.',
        },
      ],
      examNotes: [
        { id: 'en-14-03-1', title: 'OCP Definition', content: 'Open for extension, closed for modification.', importance: 'high' },
        { id: 'en-14-03-2', title: 'Mechanism', content: 'Achieved through interfaces/abstract classes and polymorphism.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-14-03-1', question: 'What is OCP?', answer: 'Software entities should be open for extension but closed for modification.', difficulty: 'easy' },
        { id: 'vq-14-03-2', question: 'How is OCP achieved?', answer: 'Through interfaces and abstract classes. New features are new implementations.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-14-03-1', type: 'mcq', question: 'OCP stands for?', options: ['Open/Closed Principle', 'Object Creation Pattern'], correctAnswer: 'Open/Closed Principle', explanation: 'OCP = Open/Closed Principle.' },
        { id: 'qc-14-03-2', type: 'true-false', question: 'OCP means never modify existing code.', correctAnswer: 'False', explanation: 'OCP means new features via new code. Bug fixes are still needed.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-14-03-1',
          title: 'New Payment Type',
          scenario: 'Add crypto to payment system with credit card and PayPal.',
          question: 'How to follow OCP?',
          type: 'design-decision',
          options: ['Create CryptoProcessor implementing PaymentProcessor', 'Add processCrypto() method', 'Use switch statement'],
          correctAnswer: 'Create CryptoProcessor implementing PaymentProcessor',
          explanation: 'New implementation, no existing changes.',
          relatedConcepts: ['OCP'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-ocp',
      prerequisites: ['lesson-14-02'],
      xpReward: 75,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'ocp',
      difficulty: 'medium',
      estimatedMinutes: 25,
    },
    {
      id: 'lesson-14-04',
      moduleId: 'module-14',
      title: 'Liskov Substitution Principle',
      slug: 'liskov-substitution-principle',
      order: 4,
      duration: 25,
      description: 'Understand LSP: subtypes must be substitutable for their base types without altering program correctness.',
      learningObjectives: [
        { id: 'lo-14-04-1', description: 'Define the Liskov Substitution Principle', completed: false },
        { id: 'lo-14-04-2', description: 'Explain behavioral compatibility in hierarchies', completed: false },
        { id: 'lo-14-04-3', description: 'Identify LSP violations with classic examples', completed: false },
        { id: 'lo-14-04-4', description: 'Design hierarchies that satisfy LSP', completed: false },
      ],
      englishExplanation: {
        id: 'ee-14-04',
        text: 'The Liskov Substitution Principle (LSP), formulated by Barbara Liskov in 1987, states that objects of a superclass should be replaceable with objects of a subclass without affecting program correctness.\n\nLSP is about behavioral compatibility. The subclass must honor the behavioral contract of the parent class. The classic violation is the Rectangle-Square problem where Square inheriting from Rectangle breaks width/height independence.\n\nTo satisfy LSP: (1) not strengthen preconditions, (2) not weaken postconditions, (3) preserve invariants, (4) obey the history rule. When in doubt, ask: "Can I use the subclass everywhere I use the parent without surprises?"'
      },
      romanUrduExplanation: {
        id: 'ru-14-04',
        text: 'LSP (Barbara Liskov, 1987) state karta hai ke superclass ke objects ko subclass se replace kiya ja sakta hai bina program correctness affect kiye. Classic violation: Rectangle-Square problem. Subclass parent ka behavioral contract honor karna chahiye.'
      },
      keyPoints: [
        { id: 'kp-14-04-1', title: 'Substitutability', description: 'Subclass must work anywhere parent is expected.' },
        { id: 'kp-14-04-2', title: 'Behavioral Contract', description: 'Subclass must honor parent promises.' },
        { id: 'kp-14-04-3', title: 'Rectangle-Square', description: 'Classic LSP violation.' },
        { id: 'kp-14-04-4', title: 'Design Guidance', description: 'Can I substitute the subclass everywhere? If not, redesign.' },
      ],
      codeExamples: [
        {
          id: 'ce-14-04-1',
          title: 'LSP Violation: Rectangle-Square',
          code: 'class Rectangle {\n    protected double w, h;\n    void setWidth(double w) { this.w = w; }\n    void setHeight(double h) { this.h = h; }\n    double area() { return w * h; }\n}\nclass Square extends Rectangle {\n    @Override void setWidth(double w) { this.w = w; this.h = w; }\n    @Override void setHeight(double h) { this.w = h; this.h = h; }\n}\nvoid resize(Rectangle r) {\n    r.setWidth(5); r.setHeight(10);\n    assert r.area() == 50; // Fails for Square!\n}',
          language: 'java',
          explanation: 'Square breaks the Rectangle contract.',
        },
        {
          id: 'ce-14-04-2',
          title: 'LSP Compliant: Separate Hierarchies',
          code: 'interface Shape { double area(); }\nclass Rectangle implements Shape {\n    private double w, h;\n    Rectangle(double w, double h) { this.w = w; this.h = h; }\n    public double area() { return w * h; }\n}\nclass Square implements Shape {\n    private double s;\n    Square(double s) { this.s = s; }\n    public double area() { return s * s; }\n}',
          language: 'java',
          explanation: 'Separate implementations, no behavioral surprises.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-14-04-1',
          title: 'Payment Hierarchy',
          scenario: 'NoRefundPayment breaking refund() contract.',
          oopConcept: 'Use separate Refundable and NonRefundable interfaces.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-14-04-1',
          title: 'Exceptions in Subclass',
          incorrectCode: 'class Penguin extends Bird { void fly() { throw new UnsupportedOperationException(); } }',
          correctCode: 'interface Flyable { void fly(); }\nclass Penguin { /* no fly */ }',
          explanation: 'Use interfaces to separate behaviors.',
        },
      ],
      examNotes: [
        { id: 'en-14-04-1', title: 'LSP Definition', content: 'Subtypes must be substitutable. Barbara Liskov, 1987.', importance: 'high' },
        { id: 'en-14-04-2', title: 'Rectangle-Square', content: 'Classic example. Square inheriting Rectangle violates LSP.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-14-04-1', question: 'What is LSP?', answer: 'Objects of superclass replaceable with subclass objects without breaking correctness.', difficulty: 'easy' },
        { id: 'vq-14-04-2', question: 'Explain Rectangle-Square problem.', answer: 'Square inheriting Rectangle changes width/height behavior, breaking expectations.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-14-04-1', type: 'mcq', question: 'Who formulated LSP?', options: ['Robert C. Martin', 'Barbara Liskov', 'Gang of Four'], correctAnswer: 'Barbara Liskov', explanation: 'Barbara Liskov, 1987.' },
        { id: 'qc-14-04-2', type: 'true-false', question: 'Subclass throwing exception for parent method violates LSP.', correctAnswer: 'True', explanation: 'If parent allows it, subclass must too.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-14-04-1',
          title: 'Bird Hierarchy',
          scenario: 'Penguin extending Bird but cannot fly.',
          question: 'How to fix?',
          type: 'design-decision',
          options: ['Use Flyable interface', 'Override fly with exception', 'Add canFly boolean'],
          correctAnswer: 'Use Flyable interface',
          explanation: 'Separate flying and non-flying birds.',
          relatedConcepts: ['LSP'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-lsp',
      prerequisites: ['lesson-14-03'],
      xpReward: 75,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'lsp',
      difficulty: 'medium',
      estimatedMinutes: 25,
    },
    {
      id: 'lesson-14-05',
      moduleId: 'module-14',
      title: 'Interface Segregation Principle',
      slug: 'interface-segregation-principle',
      order: 5,
      duration: 25,
      description: 'Learn ISP: clients should not be forced to depend on methods they do not use.',
      learningObjectives: [
        { id: 'lo-14-05-1', description: 'Define the Interface Segregation Principle', completed: false },
        { id: 'lo-14-05-2', description: 'Identify ISP violations with fat interfaces', completed: false },
        { id: 'lo-14-05-3', description: 'Design small, role-based interfaces', completed: false },
        { id: 'lo-14-05-4', description: 'Refactor fat interfaces into segregated ones', completed: false },
      ],
      englishExplanation: {
        id: 'ee-14-05',
        text: 'ISP states that no client should be forced to depend on methods it does not use. Instead of one large interface, create multiple small, focused interfaces.\n\nISP was formulated by Robert C. Martin. The Xerox case: Worker interface with work(), eat(), sleep(). Robots can\'t eat. Solution: Workable, Feedable, Sleepable interfaces.\n\nFat interfaces cause empty implementations, misleading code, and fragility. ISP promotes role-based design. Each interface represents a capability. Classes implement only what they need.'
      },
      romanUrduExplanation: {
        id: 'ru-14-05',
        text: 'ISP state karta hai ke koi client us methods par depend nahi karna chahiye jo wo use nahi karta. Chhoti, focused interfaces banayein. Xerox example: Worker interface split into Workable, Feedable, Sleepable.'
      },
      keyPoints: [
        { id: 'kp-14-05-1', title: 'No Forced Dependencies', description: 'Clients depend only on methods they use.' },
        { id: 'kp-14-05-2', title: 'Fat Interfaces', description: 'Large interfaces force empty implementations.' },
        { id: 'kp-14-05-3', title: 'Role-Based Design', description: 'Each interface represents a capability.' },
      ],
      codeExamples: [
        {
          id: 'ce-14-05-1',
          title: 'ISP Violation',
          code: 'interface Worker { void work(); void eat(); void sleep(); }\nclass RobotWorker implements Worker {\n    public void work() { /* ok */ }\n    public void eat() { throw new UnsupportedOperationException(); }\n    public void sleep() { throw new UnsupportedOperationException(); }\n}',
          language: 'java',
          explanation: 'Robot forced to implement eat/sleep.',
        },
        {
          id: 'ce-14-05-2',
          title: 'ISP Compliant',
          code: 'interface Workable { void work(); }\ninterface Feedable { void eat(); }\ninterface Sleepable { void sleep(); }\nclass HumanWorker implements Workable, Feedable, Sleepable { /* all */ }\nclass RobotWorker implements Workable { /* only work */ }',
          language: 'java',
          explanation: 'Each class implements only what it needs.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-14-05-1',
          title: 'Java Collections',
          scenario: 'List, Set, Map are separate interfaces.',
          oopConcept: 'ISP in action in the JDK.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-14-05-1',
          title: 'Over-Segregating',
          incorrectCode: 'interface GetNameable { String getName(); }\ninterface SetNameable { void setName(String n); }',
          correctCode: 'interface ReadablePerson { String getName(); int getAge(); }',
          explanation: 'Group by meaningful roles, not per-method.',
        },
      ],
      examNotes: [
        { id: 'en-14-05-1', title: 'ISP Definition', content: 'No client should depend on unused methods.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-14-05-1', question: 'What is ISP?', answer: 'No client should depend on methods it does not use.', difficulty: 'easy' },
        { id: 'vq-14-05-2', question: 'What problems do fat interfaces cause?', answer: 'Empty implementations, misleading code, fragility.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-14-05-1', type: 'mcq', question: 'ISP advocates?', options: ['Small role-based interfaces', 'Large interfaces'], correctAnswer: 'Small role-based interfaces', explanation: 'ISP = Interface Segregation Principle.' },
        { id: 'qc-14-05-2', type: 'true-false', question: 'Class must implement all interface methods even if unused.', correctAnswer: 'True', explanation: 'This is why ISP matters.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-14-05-1',
          title: 'Smart Home Devices',
          scenario: 'Light, Thermostat, Camera devices.',
          question: 'How to follow ISP?',
          type: 'design-decision',
          options: ['Create Switchable, Dimmable, TemperatureControllable interfaces', 'One Device interface'],
          correctAnswer: 'Create Switchable, Dimmable, TemperatureControllable interfaces',
          explanation: 'Separate interfaces per capability.',
          relatedConcepts: ['ISP'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-isp',
      prerequisites: ['lesson-14-04'],
      xpReward: 75,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'isp',
      difficulty: 'medium',
      estimatedMinutes: 25,
    },
    {
      id: 'lesson-14-06',
      moduleId: 'module-14',
      title: 'Dependency Inversion Principle',
      slug: 'dependency-inversion-principle',
      order: 6,
      duration: 30,
      description: 'Master DIP: both high-level and low-level modules should depend on abstractions.',
      learningObjectives: [
        { id: 'lo-14-06-1', description: 'Define the Dependency Inversion Principle', completed: false },
        { id: 'lo-14-06-2', description: 'Explain the difference between DI and IoC', completed: false },
        { id: 'lo-14-06-3', description: 'Implement dependency injection techniques', completed: false },
        { id: 'lo-14-06-4', description: 'Use DI to make code testable', completed: false },
      ],
      englishExplanation: {
        id: 'ee-14-06',
        text: 'DIP states that high-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details.\n\nDIP is not the same as Dependency Injection (DI). DIP is a design principle. DI is a technique to implement it. In traditional design, high-level modules create low-level modules directly. DIP inverts this.\n\nDI is the practical mechanism. Dependencies are passed through constructors, setters, or interfaces. This makes classes independent of specific implementations and easy to test with mocks.'
      },
      romanUrduExplanation: {
        id: 'ru-14-06',
        text: 'DIP state karta hai ke high-level modules low-level modules par depend nahi karein. Dono abstractions par depend karein. DIP design principle hai. DI technique hai usko implement karne ki. Dependencies constructors ke through pass ki jaati hain.'
      },
      keyPoints: [
        { id: 'kp-14-06-1', title: 'Depend on Abstractions', description: 'Both high and low level modules depend on interfaces.' },
        { id: 'kp-14-06-2', title: 'DI vs DIP', description: 'DIP is principle, DI is technique.' },
        { id: 'kp-14-06-3', title: 'Testability', description: 'Inject mocks for easy testing.' },
      ],
      codeExamples: [
        {
          id: 'ce-14-06-1',
          title: 'DIP Violation',
          code: 'class UserService {\n    private MySQLDatabase db = new MySQLDatabase();\n    void save(String user) { db.save(user); }\n}',
          language: 'java',
          explanation: 'Tightly coupled to MySQL.',
        },
        {
          id: 'ce-14-06-2',
          title: 'DIP Compliant',
          code: 'interface Database { void save(String data); }\nclass MySQLDatabase implements Database { public void save(String d) { /* MySQL */ } }\nclass MongoDatabase implements Database { public void save(String d) { /* Mongo */ } }\nclass UserService {\n    private Database db;\n    UserService(Database db) { this.db = db; }\n    void save(String user) { db.save(user); }\n}',
          language: 'java',
          explanation: 'Depends on abstraction. Database swappable.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-14-06-1',
          title: 'Spring IoC',
          scenario: 'Spring manages dependencies via @Autowired.',
          oopConcept: 'DIP through IoC container.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-14-06-1',
          title: 'Injecting Concrete Classes',
          incorrectCode: 'OrderService(MySQLDatabase db) { this.db = db; }',
          correctCode: 'OrderService(Database db) { this.db = db; }',
          explanation: 'Inject the interface, not the concrete class.',
        },
      ],
      examNotes: [
        { id: 'en-14-06-1', title: 'DIP Definition', content: 'Depend on abstractions, not details.', importance: 'high' },
        { id: 'en-14-06-2', title: 'DIP vs DI', content: 'DIP is principle, DI is technique.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-14-06-1', question: 'What is DIP?', answer: 'Both high and low level modules depend on abstractions.', difficulty: 'easy' },
        { id: 'vq-14-06-2', question: 'DIP vs DI?', answer: 'DIP is principle, DI is technique to implement it.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-14-06-1', type: 'true-false', question: 'DIP and DI are the same thing.', correctAnswer: 'False', explanation: 'DIP is principle, DI is technique.' },
        { id: 'qc-14-06-2', type: 'mcq', question: 'Which DI for required deps?', options: ['Setter', 'Constructor'], correctAnswer: 'Constructor', explanation: 'Constructor injection ensures dependency at creation.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-14-06-1',
          title: 'Refactor for DIP',
          scenario: 'NotificationService creates EmailSender directly.',
          question: 'How to fix?',
          type: 'design-decision',
          options: ['Create NotificationSender interface and inject', 'Add if-else branches'],
          correctAnswer: 'Create NotificationSender interface and inject',
          explanation: 'Depend on abstraction.',
          relatedConcepts: ['DIP', 'DI'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-dip',
      prerequisites: ['lesson-14-05'],
      xpReward: 75,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'dip',
      difficulty: 'medium',
      estimatedMinutes: 30,
    },
    {
      id: 'lesson-14-07',
      moduleId: 'module-14',
      title: 'DRY and KISS Principles',
      slug: 'dry-and-kiss-principles',
      order: 7,
      duration: 20,
      description: "Learn DRY (Don't Repeat Yourself) and KISS (Keep It Simple, Stupid).",
      learningObjectives: [
        { id: 'lo-14-07-1', description: 'Define DRY and explain why repetition is harmful', completed: false },
        { id: 'lo-14-07-2', description: 'Define KISS and explain why simplicity matters', completed: false },
        { id: 'lo-14-07-3', description: 'Identify and eliminate code duplication', completed: false },
        { id: 'lo-14-07-4', description: 'Apply KISS to reduce complexity', completed: false },
      ],
      englishExplanation: {
        id: 'ee-14-07',
        text: 'DRY stands for "Don\'t Repeat Yourself." Every piece of knowledge should have a single representation. Duplication leads to inconsistency bugs.\n\nKISS stands for "Keep It Simple, Stupid." Simple code is easier to understand, debug, and maintain. Complexity is the enemy of reliability.\n\nDRY and KISS work together. DRY eliminates redundant code. KISS ensures the remaining code is straightforward.'
      },
      romanUrduExplanation: {
        id: 'ru-14-07',
        text: 'DRY = "Don\'t Repeat Yourself." Har cheez ka ek representation hona chahiye. KISS = "Keep It Simple, Stupid." Simple code samajhna asaan hai. Dono milkar concise code produce karte hain.'
      },
      keyPoints: [
        { id: 'kp-14-07-1', title: 'DRY', description: 'Single source of truth eliminates inconsistency bugs.' },
        { id: 'kp-14-07-2', title: 'KISS', description: 'Simplest code that works is best.' },
        { id: 'kp-14-07-3', title: 'Beyond Code', description: 'DRY applies to logic, config, documentation.' },
      ],
      codeExamples: [
        {
          id: 'ce-14-07-1',
          title: 'DRY Violation',
          code: '// Same validation in 3 places\nvoid createUser(String n, int a) { if (n==null) throw ...; }\nvoid createAdmin(String n, int a) { if (n==null) throw ...; }',
          language: 'java',
          explanation: 'Validation duplicated.',
        },
        {
          id: 'ce-14-07-2',
          title: 'DRY Compliant',
          code: 'class Validator { static void validate(String n, int a) { if (n==null) throw ...; } }\nvoid createUser(String n, int a) { Validator.validate(n, a); }',
          language: 'java',
          explanation: 'Single validation method.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-14-07-1',
          title: 'Config Duplication',
          scenario: 'DB URLs hardcoded in 15 classes.',
          oopConcept: 'Extract into Config class.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-14-07-1',
          title: 'Over-Engineering',
          incorrectCode: 'interface Op { double exec(double a, double b); }\nclass Add implements Op { ... }',
          correctCode: 'double add(double a, double b) { return a+b; }',
          explanation: 'Simple calculator needs no strategy pattern.',
        },
      ],
      examNotes: [
        { id: 'en-14-07-1', title: 'DRY/KISS', content: 'DRY eliminates duplication. KISS keeps code simple.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-14-07-1', question: 'What is DRY?', answer: "Don't Repeat Yourself. Single representation.", difficulty: 'easy' },
        { id: 'vq-14-07-2', question: 'What is KISS?', answer: 'Keep It Simple, Stupid. Simplest code that works.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-14-07-1', type: 'mcq', question: 'DRY stands for?', options: ["Don't Repeat Yourself", 'Do Repeat Yourself'], correctAnswer: "Don't Repeat Yourself", explanation: 'DRY = single source of truth.' },
        { id: 'qc-14-07-2', type: 'true-false', question: 'DRY only applies to code.', correctAnswer: 'False', explanation: 'DRY applies to logic, config, documentation too.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-14-07-1',
          title: 'Same Logic 3x',
          scenario: 'Same transformation in 3 services.',
          question: 'What to do?',
          type: 'concept-application',
          options: ['Extract to DataTransformer', 'Leave it', 'Add comments'],
          correctAnswer: 'Extract to DataTransformer',
          explanation: 'DRY violation.',
          relatedConcepts: ['DRY'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-dry-kiss',
      prerequisites: ['lesson-14-06'],
      xpReward: 60,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'dry-kiss',
      difficulty: 'easy',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-14-08',
      moduleId: 'module-14',
      title: 'Composition Over Inheritance',
      slug: 'composition-over-inheritance',
      order: 8,
      duration: 25,
      description: 'Learn why composition is preferred over inheritance. Understand delegation pattern.',
      learningObjectives: [
        { id: 'lo-14-08-1', description: 'Explain why composition is preferred', completed: false },
        { id: 'lo-14-08-2', description: 'Implement the delegation pattern', completed: false },
        { id: 'lo-14-08-3', description: 'Identify when to use each', completed: false },
        { id: 'lo-14-08-4', description: 'Refactor inheritance to composition', completed: false },
      ],
      englishExplanation: {
        id: 'ee-14-08',
        text: '"Favor composition over inheritance" means code reuse is better achieved by composing objects than extending classes. Inheritance creates tight coupling (fragile base class). Composition provides flexibility — swap implementations at runtime.\n\nUse inheritance for clear IS-A with stable parents. Use composition for flexibility, loose coupling, and runtime changes.'
      },
      romanUrduExplanation: {
        id: 'ru-14-08',
        text: 'Composition inheritance se zyada flexible hai. Inheritance tight coupling create karta hai. Composition has-a relationship use karta hai jo runtime mein change ho sakta hai.'
      },
      keyPoints: [
        { id: 'kp-14-08-1', title: 'Has-A vs Is-A', description: 'Composition (has-a) more flexible than inheritance (is-a).' },
        { id: 'kp-14-08-2', title: 'Fragile Base Class', description: 'Parent changes can break all children.' },
        { id: 'kp-14-08-3', title: 'Delegation', description: 'Object delegates to helper instead of inheriting.' },
      ],
      codeExamples: [
        {
          id: 'ce-14-08-1',
          title: 'Composition with Strategy',
          code: 'interface Movement { void start(); void stop(); }\nclass EngineMovement implements Movement { public void start() { /* engine */ } }\nclass ElectricMovement implements Movement { public void start() { /* electric */ } }\nclass Vehicle {\n    private Movement movement;\n    Vehicle(Movement m) { this.movement = m; }\n    void start() { movement.start(); }\n    void setMovement(Movement m) { this.movement = m; }\n}',
          language: 'java',
          explanation: 'Vehicle delegates to Movement. Strategy swappable at runtime.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-14-08-1',
          title: 'ArrayList',
          scenario: 'ArrayList HAS-A array, not IS-A array.',
          oopConcept: 'Composition in Java Collections.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-14-08-1',
          title: 'Deep Chains',
          incorrectCode: 'class Animal {} class Mammal extends Animal {} class Dog extends Mammal {} class Puppy extends Dog {}',
          correctCode: 'class Animal { private Movement m; private Sound s; }',
          explanation: 'Flatten with composition.',
        },
      ],
      examNotes: [
        { id: 'en-14-08-1', title: 'Composition', content: 'Favor composition over inheritance for flexibility.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-14-08-1', question: 'Why composition over inheritance?', answer: 'Flexibility, loose coupling, avoids fragile base class.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-14-08-1', type: 'true-false', question: 'Inheritance creates tight coupling.', correctAnswer: 'True', explanation: 'Parent changes break children.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-14-08-1',
          title: 'Notification System',
          scenario: 'Email/SMS/Push via inheritance.',
          question: 'Redesign with composition?',
          type: 'design-decision',
          options: ['NotificationSender interface, Notification HAS-A sender', 'Keep inheritance'],
          correctAnswer: 'NotificationSender interface, Notification HAS-A sender',
          explanation: 'Swap senders at runtime.',
          relatedConcepts: ['composition'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-composition',
      prerequisites: ['lesson-14-07'],
      xpReward: 75,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'composition',
      difficulty: 'medium',
      estimatedMinutes: 25,
    },
    {
      id: 'lesson-14-09',
      moduleId: 'module-14',
      title: 'Design Patterns Introduction',
      slug: 'design-patterns-introduction',
      order: 9,
      duration: 30,
      description: 'Get introduced to Singleton, Factory, and Observer patterns with Java code.',
      learningObjectives: [
        { id: 'lo-14-09-1', description: 'Explain what design patterns are', completed: false },
        { id: 'lo-14-09-2', description: 'Implement Singleton in Java', completed: false },
        { id: 'lo-14-09-3', description: 'Implement Factory in Java', completed: false },
        { id: 'lo-14-09-4', description: 'Implement Observer in Java', completed: false },
      ],
      englishExplanation: {
        id: 'ee-14-09',
        text: 'Design patterns are reusable solutions to common problems. Gang of Four cataloged 23 patterns.\n\nSingleton ensures one instance (private constructor + getInstance()). Factory creates objects without specifying class (follows OCP). Observer defines one-to-many dependency (event-driven foundation).'
      },
      romanUrduExplanation: {
        id: 'ru-14-09',
        text: 'Design patterns reusable solutions hain. Singleton ek instance ensure karta hai. Factory objects create karta hai bina class specify kiye. Observer one-to-many notification hai.'
      },
      keyPoints: [
        { id: 'kp-14-09-1', title: 'Singleton', description: 'One instance. Private constructor + static getInstance().' },
        { id: 'kp-14-09-2', title: 'Factory', description: 'Object creation abstraction. Follows OCP.' },
        { id: 'kp-14-09-3', title: 'Observer', description: 'One-to-many notification. Event-driven.' },
      ],
      codeExamples: [
        {
          id: 'ce-14-09-1',
          title: 'Singleton',
          code: 'class DatabaseConnection {\n    private static DatabaseConnection instance;\n    private DatabaseConnection() {}\n    public static DatabaseConnection getInstance() {\n        if (instance == null) instance = new DatabaseConnection();\n        return instance;\n    }\n}',
          language: 'java',
          explanation: 'One instance, global access.',
        },
        {
          id: 'ce-14-09-2',
          title: 'Factory',
          code: 'interface Notification { void send(String msg); }\nclass EmailNotification implements Notification { public void send(String m) { /* email */ } }\nclass SMSNotification implements Notification { public void send(String m) { /* sms */ } }\nclass NotificationFactory {\n    static Notification create(String type) {\n        return switch(type) { case "email" -> new EmailNotification(); case "sms" -> new SMSNotification(); };\n    }\n}',
          language: 'java',
          explanation: 'Factory decides which class to instantiate.',
        },
        {
          id: 'ce-14-09-3',
          title: 'Observer',
          code: 'interface Observer { void update(String event); }\nclass EventManager {\n    private Map<String, List<Observer>> obs = new HashMap<>();\n    void subscribe(String e, Observer o) { obs.computeIfAbsent(e, k -> new ArrayList<>()).add(o); }\n    void notify(String e) { obs.getOrDefault(e, List.of()).forEach(o -> o.update(e)); }\n}',
          language: 'java',
          explanation: 'Subject notifies all observers.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-14-09-1',
          title: 'Singleton Config',
          scenario: 'One Configuration instance shared across app.',
          oopConcept: 'Singleton for coordination.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-14-09-1',
          title: 'Singleton Overuse',
          incorrectCode: 'class UserService { private static UserService instance; }',
          correctCode: 'class DatabasePool { private static DatabasePool instance; }',
          explanation: 'Only true singletons should use Singleton pattern.',
        },
      ],
      examNotes: [
        { id: 'en-14-09-1', title: 'Three Patterns', content: 'Singleton, Factory, Observer — know when to use each.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-14-09-1', question: 'What is Singleton?', answer: 'Ensures one instance with global access.', difficulty: 'easy' },
        { id: 'vq-14-09-2', question: 'When use Factory?', answer: 'When object creation is complex or system needs to be independent of creation.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-14-09-1', type: 'mcq', question: 'Pattern for event-driven?', options: ['Singleton', 'Factory', 'Observer'], correctAnswer: 'Observer', explanation: 'Observer = one-to-many notification.' },
        { id: 'qc-14-09-2', type: 'true-false', question: 'Factory violates OCP when adding new types.', correctAnswer: 'False', explanation: 'Factory follows OCP. New types = new classes.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-14-09-1',
          title: 'Chat App',
          scenario: 'Deliver messages to multiple users.',
          question: 'Which pattern?',
          type: 'design-decision',
          options: ['Singleton', 'Factory', 'Observer'],
          correctAnswer: 'Observer',
          explanation: 'Observer for pub-sub.',
          relatedConcepts: ['Observer'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-patterns',
      prerequisites: ['lesson-14-08'],
      xpReward: 75,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'patterns',
      difficulty: 'medium',
      estimatedMinutes: 30,
    },
    {
      id: 'lesson-14-10',
      moduleId: 'module-14',
      title: 'Applying Principles in Practice',
      slug: 'applying-principles-in-practice',
      order: 10,
      duration: 30,
      description: 'Apply all design principles in a comprehensive refactoring case study.',
      learningObjectives: [
        { id: 'lo-14-10-1', description: 'Identify multiple violations in existing code', completed: false },
        { id: 'lo-14-10-2', description: 'Perform step-by-step refactoring following SOLID', completed: false },
        { id: 'lo-14-10-3', description: 'Evaluate before and after design quality', completed: false },
        { id: 'lo-14-10-4', description: 'Apply all principles together', completed: false },
      ],
      englishExplanation: {
        id: 'ee-14-10',
        text: 'This lesson brings all principles together through a comprehensive refactoring case study. Start with a poorly designed OrderProcessor violating multiple principles.\n\nRefactoring process: Identify responsibilities (SRP). Extract into classes. Replace if-else with polymorphism (OCP). Introduce interfaces and DI (DIP). Verify contracts (LSP, ISP).\n\nAfter refactoring: focused classes, testable, flexible, easy to understand.'
      },
      romanUrduExplanation: {
        id: 'ru-14-10',
        text: 'Ye lesson saare principles ko ek refactoring case study mein bring together karta hai. OrderProcessor God class se shuru. SRP se responsibilities identify, OCP se polymorphism, DIP se interfaces. Refactoring ke baad focused, testable, flexible code.'
      },
      keyPoints: [
        { id: 'kp-14-10-1', title: 'Systematic Refactoring', description: 'Identify, extract, introduce interfaces, inject dependencies.' },
        { id: 'kp-14-10-2', title: 'Principles Together', description: 'SOLID, DRY, KISS, composition form a cohesive system.' },
        { id: 'kp-14-10-3', title: 'Long-term Benefits', description: 'Good design reduces maintenance costs.' },
      ],
      codeExamples: [
        {
          id: 'ce-14-10-1',
          title: 'Before: God Class',
          code: '// VIOLATES: SRP, OCP, DIP, DRY\nclass OrderProcessor {\n    private MySQLDatabase db = new MySQLDatabase();\n    void processOrder(Order o) {\n        if (o.getItems().isEmpty()) throw ...;\n        if (o.getPayType().equals("credit")) { /* credit */ }\n        else if (o.getPayType().equals("paypal")) { /* paypal */ }\n        for (Item i : o.getItems()) { /* inventory */ }\n        emailSender.send(...);\n        db.save(...);\n    }\n}',
          language: 'java',
          explanation: 'God class with 5+ responsibilities.',
        },
        {
          id: 'ce-14-10-2',
          title: 'After: SOLID Compliant',
          code: 'class OrderValidator { void validate(Order o) { ... } }\ninterface PaymentProcessor { void process(double amount); }\nclass CreditCardPayment implements PaymentProcessor { ... }\nclass InventoryManager { void reduceStock(List<Item> items) { ... } }\ninterface NotificationService { void send(String to, String msg); }\nclass OrderProcessor {\n    private final OrderValidator validator;\n    private final PaymentProcessor payment;\n    private final InventoryManager inventory;\n    private final NotificationService notification;\n    private final Database database;\n    void processOrder(Order o) {\n        validator.validate(o);\n        payment.process(o.getTotal());\n        inventory.reduceStock(o.getItems());\n        notification.send(o.getEmail(), "Confirmed!");\n        database.save(o.toString());\n    }\n}',
          language: 'java',
          explanation: 'After: one class per responsibility, DI, interfaces.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-14-10-1',
          title: 'Legacy Refactoring',
          scenario: '5000-line AccountManager class.',
          oopConcept: 'Split into AccountService, TransactionService, ReportService.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-14-10-1',
          title: 'No Tests First',
          incorrectCode: '// Starting refactoring without tests',
          correctCode: '// Step 1: Write tests\n// Step 2: Refactor with confidence',
          explanation: 'Always write tests before refactoring.',
        },
      ],
      examNotes: [
        { id: 'en-14-10-1', title: 'Refactoring Process', content: '1. SRP identify 2. Extract 3. OCP interfaces 4. DIP inject 5. LSP verify', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-14-10-1', question: 'First step in refactoring?', answer: 'Identify all responsibilities in the class.', difficulty: 'easy' },
        { id: 'vq-14-10-2', question: 'Should you refactor without tests?', answer: 'No. Write tests first as safety nets.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-14-10-1', type: 'mcq', question: 'First refactoring step?', options: ['Add comments', 'Identify responsibilities', 'Delete class'], correctAnswer: 'Identify responsibilities', explanation: 'SRP is starting point.' },
        { id: 'qc-14-10-2', type: 'true-false', question: 'Write tests before refactoring.', correctAnswer: 'True', explanation: 'Tests are safety nets.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-14-10-1',
          title: 'Full Refactoring',
          scenario: '3000-line UserService with multiple responsibilities.',
          question: 'Step-by-step approach?',
          type: 'architecture',
          options: ['SRP split, DIP interfaces, OCP polymorphism, write tests first', 'Add more methods', 'Delete and start over'],
          correctAnswer: 'SRP split, DIP interfaces, OCP polymorphism, write tests first',
          explanation: 'Systematic refactoring applying all principles.',
          relatedConcepts: ['SRP', 'DIP', 'OCP'],
          difficulty: 'hard',
        },
      ],
      threeDSceneId: 'scene-refactoring',
      prerequisites: ['lesson-14-09'],
      xpReward: 100,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'refactoring',
      difficulty: 'hard',
      estimatedMinutes: 30,
    },
  ],
};
