import type {
  RefactoringScenario,
  DesignChallenge,
  DesignMistake,
  SolidMission,
} from '@/types/solidLab';

export const COUPLING_COHESION_SCENARIO: RefactoringScenario = {
  id: 'coupling-cohesion-1',
  principle: 'coupling-cohesion',
  title: 'UniversityManager: Too Many Responsibilities',
  titleUrdu: 'UniversityManager: Bohat zyada responsibilities',
  before: {
    nodes: [
      { id: 'um', label: 'UniversityManager', type: 'class', responsibilities: ['Student Records', 'Fee Calculation', 'Email Notifications', 'Report Generation'], color: '#ef4444' },
    ],
    edges: [
      { id: 'e1', sourceId: 'um', targetId: 'db', type: 'depends-on', label: 'directly uses', color: '#ef4444' },
      { id: 'e2', sourceId: 'um', targetId: 'email', type: 'depends-on', label: 'directly uses', color: '#ef4444' },
    ],
  },
  after: {
    nodes: [
      { id: 'ss', label: 'StudentService', type: 'class', responsibilities: ['Student Records'], color: '#22c55e' },
      { id: 'fs', label: 'FeeService', type: 'class', responsibilities: ['Fee Calculation'], color: '#3b82f6' },
      { id: 'ns', label: 'NotificationService', type: 'class', responsibilities: ['Email Notifications'], color: '#f59e0b' },
      { id: 'rs', label: 'ReportService', type: 'class', responsibilities: ['Report Generation'], color: '#a78bfa' },
    ],
    edges: [
      { id: 'e1', sourceId: 'ss', targetId: 'fs', type: 'depends-on', label: 'calls', color: '#60a5fa' },
      { id: 'e2', sourceId: 'ss', targetId: 'ns', type: 'depends-on', label: 'calls', color: '#60a5fa' },
      { id: 'e3', sourceId: 'rs', targetId: 'ss', type: 'depends-on', label: 'reads', color: '#60a5fa' },
    ],
  },
  beforeCode: `class UniversityManager {
  private Database db;
  
  // Student operations
  void addStudent(Student s) { db.save(s); }
  Student findStudent(int id) { return db.get(id); }
  
  // Fee operations
  double calculateFee(Student s) {
    return s.getCredits() * 500.0;
  }
  
  // Notification operations
  void sendEmail(String to, String msg) {
    EmailService.send(to, msg);
  }
  
  // Report operations
  String generateReport() {
    List<Student> students = db.getAll();
    // ... build report string
    return report;
  }
}`,
  afterCode: `class StudentService {
  private Database db;
  void addStudent(Student s) { db.save(s); }
  Student findStudent(int id) { return db.get(id); }
}

class FeeService {
  double calculateFee(Student s) {
    return s.getCredits() * 500.0;
  }
}

class NotificationService {
  void sendEmail(String to, String msg) {
    EmailService.send(to, msg);
  }
}

class ReportService {
  private StudentService studentService;
  String generateReport() {
    // use studentService to get data
    return report;
  }
}`,
  problem: 'UniversityManager handles student records, fee calculation, email notifications, and report generation. This class has low cohesion and high coupling to multiple external systems.',
  problemUrdu: 'UniversityManager student records, fee calculation, email notifications, aur report generation handle karta hai. Is class ki cohesion kam hai aur coupling zyada hai.',
  solution: 'Split into focused services, each with a single responsibility. Dependencies become explicit and narrower.',
  solutionUrdu: 'Focused services mein divide karo, har ek ki single responsibility ho. Dependencies explicit aur narrow ho jaati hain.',
  benefits: ['Each class has one reason to change', 'Easier to test individually', 'Changes in notification dont affect student records'],
  tradeoffs: ['More classes to manage', 'Requires coordination between services'],
};

export const SRP_SCENARIO: RefactoringScenario = {
  id: 'srp-1',
  principle: 'srp',
  title: 'SRP: Single Responsibility Principle',
  titleUrdu: 'SRP: Single Responsibility Principle',
  before: {
    nodes: [
      { id: 'emp', label: 'Employee', type: 'class', responsibilities: ['Calculate Salary', 'Generate Payslip', 'Save to DB', 'Send Email'], color: '#ef4444' },
    ],
    edges: [],
  },
  after: {
    nodes: [
      { id: 'emp', label: 'Employee', type: 'class', responsibilities: ['Employee Data', 'Calculate Salary'], color: '#22c55e' },
      { id: 'pay', label: 'PayslipGenerator', type: 'class', responsibilities: ['Generate Payslip'], color: '#3b82f6' },
      { id: 'repo', label: 'EmployeeRepository', type: 'class', responsibilities: ['Save to DB'], color: '#f59e0b' },
      { id: 'mailer', label: 'EmailService', type: 'class', responsibilities: ['Send Email'], color: '#a78bfa' },
    ],
    edges: [
      { id: 'e1', sourceId: 'pay', targetId: 'emp', type: 'depends-on', label: 'reads', color: '#60a5fa' },
      { id: 'e2', sourceId: 'repo', targetId: 'emp', type: 'depends-on', label: 'persists', color: '#60a5fa' },
      { id: 'e3', sourceId: 'mailer', targetId: 'pay', type: 'depends-on', label: 'sends', color: '#60a5fa' },
    ],
  },
  beforeCode: `class Employee {
  String name;
  double salary;
  
  double calculateSalary() {
    return salary;
  }
  
  String generatePayslip() {
    return "Payslip for " + name + ": " + salary;
  }
  
  void saveToDatabase() {
    Database.save(this);
  }
  
  void sendPayslipEmail() {
    EmailService.send(name, generatePayslip());
  }
}`,
  afterCode: `class Employee {
  String name;
  double salary;
  double calculateSalary() { return salary; }
}

class PayslipGenerator {
  String generate(Employee emp) {
    return "Payslip for " + emp.name + ": " + emp.salary;
  }
}

class EmployeeRepository {
  void save(Employee emp) { Database.save(emp); }
}

class EmailService {
  void sendPayslip(Employee emp, PayslipGenerator gen) {
    String payslip = gen.generate(emp);
    EmailService.send(emp.name, payslip);
  }
}`,
  problem: 'Employee class handles salary calculation, payslip generation, database persistence, and email sending. Four different reasons to change.',
  problemUrdu: 'Employee class salary calculation, payslip generation, database persistence, aur email sending handle karta hai. Chaar different reasons hain change karne ke.',
  solution: 'Separate each responsibility into its own class. Employee only manages employee data and salary logic.',
  solutionUrdu: 'Har responsibility ko alag class mein do. Employee sirf employee data aur salary logic manage kare.',
  benefits: ['Employee has one reason to change', 'Each class is independently testable', 'Clear separation of concerns'],
  tradeoffs: ['More classes', 'Requires wiring dependencies'],
};

export const OCP_SCENARIO: RefactoringScenario = {
  id: 'ocp-1',
  principle: 'ocp',
  title: 'OCP: PaymentProcessor Refactoring',
  titleUrdu: 'OCP: PaymentProcessor Refactoring',
  before: {
    nodes: [
      { id: 'pp', label: 'PaymentProcessor', type: 'class', responsibilities: ['Process Credit Card', 'Process PayPal', 'Process Crypto', 'Handle each new type'], color: '#ef4444' },
    ],
    edges: [],
  },
  after: {
    nodes: [
      { id: 'pp', label: 'PaymentProcessor', type: 'class', responsibilities: ['Orchestrate payment'], color: '#22c55e' },
      { id: 'pm', label: 'PaymentMethod', type: 'interface', responsibilities: ['pay(amount)'], color: '#06b6d4' },
      { id: 'cc', label: 'CreditCardPayment', type: 'class', responsibilities: ['Credit card logic'], color: '#3b82f6' },
      { id: 'pp2', label: 'PayPalPayment', type: 'class', responsibilities: ['PayPal logic'], color: '#f59e0b' },
      { id: 'crypto', label: 'CryptoPayment', type: 'class', responsibilities: ['Crypto logic'], color: '#a78bfa' },
    ],
    edges: [
      { id: 'e1', sourceId: 'cc', targetId: 'pm', type: 'implements', label: 'implements', color: '#06b6d4' },
      { id: 'e2', sourceId: 'pp2', targetId: 'pm', type: 'implements', label: 'implements', color: '#06b6d4' },
      { id: 'e3', sourceId: 'crypto', targetId: 'pm', type: 'implements', label: 'implements', color: '#06b6d4' },
      { id: 'e4', sourceId: 'pp', targetId: 'pm', type: 'depends-on', label: 'uses', color: '#60a5fa' },
    ],
  },
  beforeCode: `class PaymentProcessor {
  void process(String type, double amount) {
    if (type.equals("creditcard")) {
      // credit card logic
      System.out.println("Processing CC: " + amount);
    } else if (type.equals("paypal")) {
      // paypal logic
      System.out.println("Processing PayPal: " + amount);
    } else if (type.equals("crypto")) {
      // crypto logic
      System.out.println("Processing Crypto: " + amount);
    }
    // Every new type requires editing this class!
  }
}`,
  afterCode: `interface PaymentMethod {
  void pay(double amount);
}

class CreditCardPayment implements PaymentMethod {
  public void pay(double amount) {
    System.out.println("CC: " + amount);
  }
}

class PayPalPayment implements PaymentMethod {
  public void pay(double amount) {
    System.out.println("PayPal: " + amount);
  }
}

class PaymentProcessor {
  void process(PaymentMethod method, double amount) {
    method.pay(amount);
  }
}`,
  problem: 'PaymentProcessor uses conditionals for each payment type. Adding a new payment method requires modifying this class, violating Open/Closed.',
  problemUrdu: 'PaymentProcessor har payment type ke liye conditionals use karta hai. Naya payment method add karne ke liye is class ko modify karna padta hai.',
  solution: 'Define a PaymentMethod interface. Each payment type implements it. PaymentProcessor works with the interface, not concrete types.',
  solutionUrdu: 'PaymentMethod interface define karo. Har payment type implement kare. PaymentProcessor interface ke saath kaam kare, concrete types ke nahi.',
  benefits: ['New payment methods dont modify existing code', 'PaymentProcessor is stable', 'Easy to add new methods'],
  tradeoffs: ['More classes and interfaces', 'Requires understanding of polymorphism'],
};

export const LSP_SCENARIO: RefactoringScenario = {
  id: 'lsp-1',
  principle: 'lsp',
  title: 'LSP: Behavioral Contract Violation',
  titleUrdu: 'LSP: Behavioral Contract Violation',
  before: {
    nodes: [
      { id: 'shape', label: 'Shape', type: 'abstract', responsibilities: ['area()', 'describe()'], color: '#06b6d4' },
      { id: 'rect', label: 'Rectangle', type: 'class', responsibilities: ['area() = w*h', 'describe()'], color: '#22c55e' },
      { id: 'sq', label: 'Square', type: 'class', responsibilities: ['area() = s*s', 'describe()'], color: '#ef4444' },
    ],
    edges: [
      { id: 'e1', sourceId: 'rect', targetId: 'shape', type: 'extends', label: 'extends', color: '#22c55e' },
      { id: 'e2', sourceId: 'sq', targetId: 'shape', type: 'extends', label: 'extends', color: '#ef4444' },
    ],
  },
  after: {
    nodes: [
      { id: 'shape', label: 'Shape', type: 'abstract', responsibilities: ['area()', 'describe()'], color: '#06b6d4' },
      { id: 'rect', label: 'Rectangle', type: 'class', responsibilities: ['area() = w*h', 'describe()'], color: '#22c55e' },
      { id: 'sq', label: 'ResizableSquare', type: 'class', responsibilities: ['area() = s*s', 'resize()'], color: '#22c55e' },
    ],
    edges: [
      { id: 'e1', sourceId: 'rect', targetId: 'shape', type: 'extends', label: 'extends', color: '#22c55e' },
      { id: 'e2', sourceId: 'sq', targetId: 'shape', type: 'extends', label: 'extends', color: '#22c55e' },
    ],
  },
  beforeCode: `abstract class Shape {
  abstract double area();
  abstract String describe();
}

class Rectangle extends Shape {
  double width, height;
  double area() { return width * height; }
  String describe() { return "Rectangle"; }
}

class Square extends Shape {
  double side;
  double area() { return side * side; }
  String describe() { return "Square"; }
  // Problem: Client expects setWidth(w) to only change width
  // but Square changes both width and height
  void setWidth(double w) { this.side = w; }
  void setHeight(double h) { this.side = h; }
}`,
  afterCode: `abstract class Shape {
  abstract double area();
  abstract String describe();
}

class Rectangle extends Shape {
  double width, height;
  double area() { return width * height; }
  String describe() { return "Rectangle"; }
}

class ResizableSquare extends Shape {
  double side;
  double area() { return side * side; }
  String describe() { return "ResizableSquare"; }
  void resize(double newSide) { this.side = newSide; }
}`,
  problem: 'Square extends Rectangle but breaks the behavioral contract. When client calls setWidth() on a Rectangle reference holding a Square, it unexpectedly changes height too. This violates Liskov Substitution Principle.',
  problemUrdu: 'Square Rectangle ko extend karta hai lekin behavioral contract todta hai. Jab client Rectangle reference pe setWidth() call karta hai jo Square hold karta hai, toh height bhi change ho jaati hai unexpectedly.',
  solution: 'Redesign the hierarchy. Use a common abstract Shape with area(). Square should not pretend to be a Rectangle with independent width/height.',
  solutionUrdu: 'Hierarchy ko redesign karo. Common abstract Shape use karo with area(). Square ko Rectangle ki tarah behave nahi karna chahiye with independent width/height.',
  benefits: ['Substitutability preserved', 'Client code works correctly with any Shape', 'No unexpected behavior'],
  tradeoffs: ['May require redesigning client code initially', 'More explicit type hierarchy'],
};

export const ISP_SCENARIO: RefactoringScenario = {
  id: 'isp-1',
  principle: 'isp',
  title: 'ISP: UniversityStaff Interface Segregation',
  titleUrdu: 'ISP: UniversityStaff Interface Segregation',
  before: {
    nodes: [
      { id: 'usi', label: 'UniversityStaff', type: 'interface', responsibilities: ['teach()', 'grade()', 'manageBudget()', 'cleanCampus()', 'counselStudents()'], color: '#ef4444' },
      { id: 'prof', label: 'Professor', type: 'class', responsibilities: ['teach()', 'grade()'], color: '#f59e0b' },
      { id: 'admin', label: 'Administrator', type: 'class', responsibilities: ['manageBudget()'], color: '#f59e0b' },
      { id: 'janitor', label: 'Janitor', type: 'class', responsibilities: ['cleanCampus()'], color: '#f59e0b' },
    ],
    edges: [
      { id: 'e1', sourceId: 'prof', targetId: 'usi', type: 'implements', label: 'implements (forced)', color: '#ef4444' },
      { id: 'e2', sourceId: 'admin', targetId: 'usi', type: 'implements', label: 'implements (forced)', color: '#ef4444' },
      { id: 'e3', sourceId: 'janitor', targetId: 'usi', type: 'implements', label: 'implements (forced)', color: '#ef4444' },
    ],
  },
  after: {
    nodes: [
      { id: 'ti', label: 'Teachable', type: 'interface', responsibilities: ['teach()', 'grade()'], color: '#22c55e' },
      { id: 'fi', label: 'Financial', type: 'interface', responsibilities: ['manageBudget()'], color: '#3b82f6' },
      { id: 'ci', label: 'Cleanable', type: 'interface', responsibilities: ['cleanCampus()'], color: '#f59e0b' },
      { id: 'prof', label: 'Professor', type: 'class', responsibilities: ['teach()', 'grade()'], color: '#22c55e' },
      { id: 'admin', label: 'Administrator', type: 'class', responsibilities: ['manageBudget()'], color: '#3b82f6' },
      { id: 'janitor', label: 'Janitor', type: 'class', responsibilities: ['cleanCampus()'], color: '#f59e0b' },
    ],
    edges: [
      { id: 'e1', sourceId: 'prof', targetId: 'ti', type: 'implements', label: 'implements', color: '#22c55e' },
      { id: 'e2', sourceId: 'admin', targetId: 'fi', type: 'implements', label: 'implements', color: '#3b82f6' },
      { id: 'e3', sourceId: 'janitor', targetId: 'ci', type: 'implements', label: 'implements', color: '#f59e0b' },
    ],
  },
  beforeCode: `interface UniversityStaff {
  void teach();
  void grade();
  void manageBudget();
  void cleanCampus();
  void counselStudents();
}

class Professor implements UniversityStaff {
  public void teach() { /* ok */ }
  public void grade() { /* ok */ }
  public void manageBudget() {
    throw new UnsupportedOperationException();
  }
  public void cleanCampus() {
    throw new UnsupportedOperationException();
  }
  public void counselStudents() {
    throw new UnsupportedOperationException();
  }
}`,
  afterCode: `interface Teachable {
  void teach();
  void grade();
}

interface Financial {
  void manageBudget();
}

interface Cleanable {
  void cleanCampus();
}

class Professor implements Teachable {
  public void teach() { /* ok */ }
  public void grade() { /* ok */ }
}

class Administrator implements Financial {
  public void manageBudget() { /* ok */ }
}

class Janitor implements Cleanable {
  public void cleanCampus() { /* ok */ }
}`,
  problem: 'UniversityStaff interface forces all staff types to implement unrelated methods. Professor must implement cleanCampus() even though it doesnt make sense.',
  problemUrdu: 'UniversityStaff interface sab staff types ko unrelated methods implement karne pe majboor karta hai. Professor ko cleanCampus() implement karna padta hai jo sense nahi banata.',
  solution: 'Split into smaller, focused interfaces. Each staff type implements only the capabilities it needs.',
  solutionUrdu: 'Chhote, focused interfaces mein divide karo. Har staff type sirf wo capabilities implement kare jo use chahiye.',
  benefits: ['No forced implementation of unused methods', 'Each class only depends on methods it uses', 'Cleaner, more focused contracts'],
  tradeoffs: ['More interfaces to manage', 'Clients must choose the right interface'],
};

export const DIP_SCENARIO: RefactoringScenario = {
  id: 'dip-1',
  principle: 'dip',
  title: 'DIP: Notification System Abstraction',
  titleUrdu: 'DIP: Notification System Abstraction',
  before: {
    nodes: [
      { id: 'ss', label: 'StudentService', type: 'class', responsibilities: ['Manage students', 'Send notifications'], color: '#ef4444' },
      { id: 'email', label: 'EmailNotification', type: 'class', responsibilities: ['Send email'], color: '#ef4444' },
    ],
    edges: [
      { id: 'e1', sourceId: 'ss', targetId: 'email', type: 'depends-on', label: 'directly creates', color: '#ef4444' },
    ],
  },
  after: {
    nodes: [
      { id: 'ss', label: 'StudentService', type: 'class', responsibilities: ['Manage students'], color: '#22c55e' },
      { id: 'ns', label: 'NotificationService', type: 'interface', responsibilities: ['send(message)'], color: '#06b6d4' },
      { id: 'email', label: 'EmailNotification', type: 'class', responsibilities: ['Send email'], color: '#3b82f6' },
      { id: 'sms', label: 'SMSNotification', type: 'class', responsibilities: ['Send SMS'], color: '#f59e0b' },
    ],
    edges: [
      { id: 'e1', sourceId: 'email', targetId: 'ns', type: 'implements', label: 'implements', color: '#06b6d4' },
      { id: 'e2', sourceId: 'sms', targetId: 'ns', type: 'implements', label: 'implements', color: '#06b6d4' },
      { id: 'e3', sourceId: 'ss', targetId: 'ns', type: 'depends-on', label: 'depends on', color: '#22c55e' },
    ],
  },
  beforeCode: `class StudentService {
  private EmailNotification emailNotifier;
  
  StudentService() {
    this.emailNotifier = new EmailNotification();
  }
  
  void registerStudent(Student s) {
    // save student...
    emailNotifier.send("Welcome " + s.getName());
  }
  
  void removeStudent(Student s) {
    // remove student...
    emailNotifier.send("Goodbye " + s.getName());
  }
}`,
  afterCode: `interface NotificationService {
  void send(String message);
}

class EmailNotification implements NotificationService {
  public void send(String message) {
    // email logic
  }
}

class SMSNotification implements NotificationService {
  public void send(String message) {
    // sms logic
  }
}

class StudentService {
  private NotificationService notifier;
  
  StudentService(NotificationService notifier) {
    this.notifier = notifier;
  }
  
  void registerStudent(Student s) {
    notifier.send("Welcome " + s.getName());
  }
}`,
  problem: 'StudentService directly creates and depends on EmailNotification. Switching to SMS requires modifying StudentService. High-level module depends on low-level module.',
  problemUrdu: 'StudentService directly EmailNotification create aur depend karta hai. SMS pe switch karne ke liye StudentService modify karna padta hai. High-level module low-level module pe depend karta hai.',
  solution: 'StudentService depends on a NotificationService interface. Concrete implementations are injected. High-level module depends on abstraction.',
  solutionUrdu: 'StudentService NotificationService interface pe depend karta hai. Concrete implementations inject ki jaati hain. High-level module abstraction pe depend karta hai.',
  benefits: ['StudentService unchanged when notification method changes', 'Easy to switch implementations', 'High-level and low-level modules depend on abstraction'],
  tradeoffs: ['Requires dependency injection', 'More indirection in the code'],
};

export const ALL_SCENARIOS: Record<string, RefactoringScenario> = {
  'coupling-cohesion': COUPLING_COHESION_SCENARIO,
  srp: SRP_SCENARIO,
  ocp: OCP_SCENARIO,
  lsp: LSP_SCENARIO,
  isp: ISP_SCENARIO,
  dip: DIP_SCENARIO,
};

export const ALL_CHALLENGES: DesignChallenge[] = [
  {
    id: 'ch-srp-1',
    principle: 'srp',
    title: 'SRP: Identify the Violation',
    titleUrdu: 'SRP: Violation pehchano',
    question: 'class OrderManager { void placeOrder(); void generateInvoice(); void sendConfirmation(); void updateInventory(); } — Which SOLID principle is violated?',
    questionUrdu: 'class OrderManager { placeOrder(); generateInvoice(); sendConfirmation(); updateInventory(); } — Kaun sa SOLID principle violate ho raha hai?',
    options: [
      { id: 'a', text: 'Single Responsibility Principle', textUrdu: 'Single Responsibility Principle', isCorrect: true },
      { id: 'b', text: 'Open/Closed Principle', textUrdu: 'Open/Closed Principle', isCorrect: false },
      { id: 'c', text: 'Liskov Substitution Principle', textUrdu: 'Liskov Substitution Principle', isCorrect: false },
      { id: 'd', text: 'Dependency Inversion Principle', textUrdu: 'Dependency Inversion Principle', isCorrect: false },
    ],
    explanation: 'OrderManager has four different responsibilities: order placement, invoicing, notification, and inventory. This violates SRP — a class should have one reason to change.',
    explanationUrdu: 'OrderManager ke chaar different responsibilities hain: order placement, invoicing, notification, aur inventory. Ye SRP violate karta hai.',
    hint: 'Count the distinct responsibilities in the class.',
    hintUrdu: 'Class mein alag alag responsibilities gino.',
    type: 'identify-violation',
  },
  {
    id: 'ch-ocp-1',
    principle: 'ocp',
    title: 'OCP: Refactoring Choice',
    titleUrdu: 'OCP: Refactoring ka choice',
    question: 'A notification system supports Email. Now SMS support is needed. Which approach follows OCP?',
    questionUrdu: 'Notification system Email support karta hai. Ab SMS support chahiye. Kaun sa approach OCP follow karta hai?',
    options: [
      { id: 'a', text: 'Add an if-else for SMS in the existing send() method', textUrdu: 'Existing send() method mein SMS ke liye if-else add karo', isCorrect: false },
      { id: 'b', text: 'Create a Notification interface with Email and SMS implementations', textUrdu: 'Notification interface banao with Email aur SMS implementations', isCorrect: true },
      { id: 'c', text: 'Copy the class and rename it to SMSNotification', textUrdu: 'Class ko copy karo aur SMSNotification naam do', isCorrect: false },
      { id: 'd', text: 'Add a sendSMS() method to the same class', textUrdu: 'Same class mein sendSMS() method add karo', isCorrect: false },
    ],
    explanation: 'OCP says entities should be open for extension but closed for modification. A Notification interface with implementations allows adding SMS without changing existing code.',
    explanationUrdu: 'OCP kehta hai entities extension ke liye open aur modification ke liye closed honi chahiye. Notification interface with implementations SMS add karne deti hai bina existing code change kiye.',
    hint: 'Think about which approach requires modifying existing, working code.',
    hintUrdu: 'Socho kaun sa approach existing working code modify karne pe majboor karta hai.',
    type: 'refactoring-choice',
  },
  {
    id: 'ch-lsp-1',
    principle: 'lsp',
    title: 'LSP: Identify the Contract Violation',
    titleUrdu: 'LSP: Contract violation pehchano',
    question: 'class FlyingBird extends Bird { void fly(); } class Penguin extends Bird { void fly() { throw exception; } } — Why does this violate LSP?',
    questionUrdu: 'class FlyingBird extends Bird { void fly(); } class Penguin extends Bird { void fly() { throw exception; } } — Ye LSP kyun violate karta hai?',
    options: [
      { id: 'a', text: 'Penguin cannot be instantiated', textUrdu: 'Penguin instantiate nahi ho sakta', isCorrect: false },
      { id: 'b', text: 'Penguin breaks the behavioral contract of Bird by throwing an exception from fly()', textUrdu: 'Penguin fly() se exception throw karke Bird ka behavioral contract todta hai', isCorrect: true },
      { id: 'c', text: 'Penguin has too many methods', textUrdu: 'Penguin ke bohat zyada methods hain', isCorrect: false },
      { id: 'd', text: 'Bird should not have a fly() method', textUrdu: 'Bird mein fly() method nahi hona chahiye', isCorrect: false },
    ],
    explanation: 'LSP requires that subtypes must be substitutable for their base type without breaking expected behavior. Penguin throws an exception from fly(), which violates the contract that all Birds can fly.',
    explanationUrdu: 'LSP require karta hai ke subtypes apni base type ki jagah use ho sakein bina expected behavior todhe. Penguin fly() se exception throw karta hai jo ye contract violate karta hai ke saari Birds fly kar sakti hain.',
    hint: 'What happens when client code calls fly() on a Penguin reference typed as Bird?',
    hintUrdu: 'Kya hota hai jab client code Bird type Penguin reference pe fly() call karta hai?',
    type: 'identify-violation',
  },
  {
    id: 'ch-isp-1',
    principle: 'isp',
    title: 'ISP: Interface Design',
    titleUrdu: 'ISP: Interface design',
    question: 'interface Worker { void work(); void eat(); void sleep(); } — A Robot class implements Worker. What is the problem?',
    questionUrdu: 'interface Worker { void work(); void eat(); void sleep(); } — Robot class Worker implement karta hai. Kya problem hai?',
    options: [
      { id: 'a', text: 'Robot should not implement Worker', textUrdu: 'Robot Worker implement nahi karna chahiye', isCorrect: false },
      { id: 'b', text: 'Worker interface is too large, forcing Robot to implement eat() and sleep() which are irrelevant', textUrdu: 'Worker interface bohat bada hai, Robot ko eat() aur sleep() implement karne pe majboor karta hai jo irrelevant hain', isCorrect: true },
      { id: 'c', text: 'Robot needs a different work() implementation', textUrdu: 'Robot ko alag work() implementation chahiye', isCorrect: false },
      { id: 'd', text: 'The interface should be an abstract class', textUrdu: 'Interface abstract class hona chahiye', isCorrect: false },
    ],
    explanation: 'ISP says clients should not be forced to depend on methods they dont use. Robot can work but cannot eat or sleep. The interface should be split into smaller, role-specific interfaces.',
    explanationUrdu: 'ISP kehta hai clients ko un methods pe depend nahi karna chahiye jo wo use nahi karte. Robot kaam kar sakta hai lekin kha nahi sakta aur so nahi sakta. Interface ko chhote, role-specific interfaces mein split karna chahiye.',
    hint: 'Which methods in the interface are irrelevant to Robot?',
    hintUrdu: 'Interface ke kaun se methods Robot ke liye irrelevant hain?',
    type: 'code-analysis',
  },
  {
    id: 'ch-dip-1',
    principle: 'dip',
    title: 'DIP: Dependency Direction',
    titleUrdu: 'DIP: Dependency direction',
    question: 'class AppService { private MySQLDatabase db = new MySQLDatabase(); } — How does this violate DIP?',
    questionUrdu: 'class AppService { private MySQLDatabase db = new MySQLDatabase(); } — Ye DIP kyun violate karta hai?',
    options: [
      { id: 'a', text: 'AppService should use a different database', textUrdu: 'AppService ko alag database use karna chahiye', isCorrect: false },
      { id: 'b', text: 'High-level AppService directly depends on low-level MySQLDatabase instead of an abstraction', textUrdu: 'High-level AppService directly low-level MySQLDatabase pe depend karta hai abstraction ki jagah', isCorrect: true },
      { id: 'c', text: 'MySQLDatabase is too slow', textUrdu: 'MySQLDatabase bohat slow hai', isCorrect: false },
      { id: 'd', text: 'AppService should be an interface', textUrdu: 'AppService interface hona chahiye', isCorrect: false },
    ],
    explanation: 'DIP says high-level modules should not depend on low-level modules; both should depend on abstractions. AppService directly creates MySQLDatabase, making it hard to switch databases.',
    explanationUrdu: 'DIP kehta hai high-level modules low-level modules pe depend nahi karein; dono abstractions pe depend karein. AppService directly MySQLDatabase create karta hai jo database switch karna mushkil banata hai.',
    hint: 'Where is the dependency direction pointing — from high-level to low-level or through an abstraction?',
    hintUrdu: 'Dependency direction kis taraf point kar raha hai — high-level se low-level ya abstraction ke through?',
    type: 'code-analysis',
  },
  {
    id: 'ch-couple-1',
    principle: 'coupling-cohesion',
    title: 'Coupling: Identify the Problem',
    titleUrdu: 'Coupling: Problem pehchano',
    question: 'If changing the Database class requires also changing StudentService, FeeService, and ReportService, what does this indicate?',
    questionUrdu: 'Agar Database class change karne pe StudentService, FeeService, aur ReportService bhi change karne padein, ye kya indicate karta hai?',
    options: [
      { id: 'a', text: 'Good cohesion', textUrdu: 'Achhi cohesion', isCorrect: false },
      { id: 'b', text: 'High coupling between all services and the database', textUrdu: 'Saari services aur database ke beech high coupling', isCorrect: true },
      { id: 'c', text: 'Proper separation of concerns', textUrdu: 'Sahi separation of concerns', isCorrect: false },
      { id: 'd', text: 'Low coupling', textUrdu: 'Kam coupling', isCorrect: false },
    ],
    explanation: 'When a change in one component forces changes in many other components, it indicates high coupling. The services are tightly bound to the database implementation.',
    explanationUrdu: 'Jab ek component mein change bohat saare doosre components mein changes force karta hai, ye high coupling indicate karta hai. Services database implementation se tightly bound hain.',
    hint: 'Does a change in one place ripple to many other places?',
    hintUrdu: 'Kya ek jagah ka change bohat saari doosri jagahon pe ripple karta hai?',
    type: 'mcq',
  },
];

export const ALL_MISTAKES: DesignMistake[] = [
  {
    id: 'mistake-srp-1',
    title: 'One class handles unrelated responsibilities',
    titleUrdu: 'Ek class unrelated responsibilities handle karti hai',
    principle: 'srp',
    incorrectCode: 'class UserManager {\n  void createUser() { }\n  void sendEmail() { }\n  void generateReport() { }\n  void processPayment() { }\n}',
    incorrectDiagram: 'UserManager --> create, email, report, payment (all in one)',
    correctCode: 'class UserService { void createUser() { } }\n\nclass EmailService { void sendEmail() { } }\n\nclass ReportService { void generateReport() { } }\n\nclass PaymentService { void processPayment() { } }',
    correctDiagram: 'UserService, EmailService, ReportService, PaymentService (separate)',
    explanation: 'A class with unrelated responsibilities has low cohesion. Split into focused classes, each with one reason to change.',
    explanationUrdu: 'Unrelated responsibilities wali class ki cohesion kam hai. Focused classes mein divide karo, har ek ki single reason to change ho.',
  },
  {
    id: 'mistake-ocp-1',
    title: 'Every new type requires editing the same processor',
    titleUrdu: 'Har naye type ke liye same processor edit karna padta hai',
    principle: 'ocp',
    incorrectCode: 'class Processor {\n  void process(String type) {\n    if (type.equals("A")) { /* ... */ }\n    else if (type.equals("B")) { /* ... */ }\n    // Adding C requires editing this class\n  }\n}',
    incorrectDiagram: 'Processor with if-else chain for A, B, C...',
    correctCode: 'interface Processable { void process(); }\n\nclass TypeA implements Processable { public void process() { } }\nclass TypeB implements Processable { public void process() { } }\n\nclass Processor {\n  void process(Processable p) { p.process(); }\n}',
    correctDiagram: 'Processor --> Processable interface <-- TypeA, TypeB (open for extension)',
    explanation: 'Using conditionals for each type violates OCP. Use polymorphism so new types are added by creating new classes, not modifying existing ones.',
    explanationUrdu: 'Har type ke liye conditionals use karna OCP violate karta hai. Polymorphism use karo taake naye types existing classes modify kiye bagair add ho sakein.',
  },
  {
    id: 'mistake-lsp-1',
    title: 'Subtype breaks base type behavioral contract',
    titleUrdu: 'Subtype base type ka behavioral contract todta hai',
    principle: 'lsp',
    incorrectCode: 'class Rectangle {\n  int width, height;\n  void setWidth(int w) { width = w; }\n  void setHeight(int h) { height = h; }\n}\n\nclass Square extends Rectangle {\n  void setWidth(int w) { width = w; height = w; }\n  void setHeight(int h) { width = h; height = h; }\n}',
    incorrectDiagram: 'Square extends Rectangle but setWidth changes both dimensions',
    correctCode: 'abstract class Shape { abstract int area(); }\n\nclass Rectangle extends Shape {\n  int width, height;\n  int area() { return width * height; }\n}\n\nclass Square extends Shape {\n  int side;\n  int area() { return side * side; }\n}',
    correctDiagram: 'Shape <-- Rectangle, Square (independent implementations)',
    explanation: 'Square extending Rectangle breaks LSP because setWidth/setValue behavior differs from the base class contract. Redesign with a common abstraction.',
    explanationUrdu: 'Square ka Rectangle ko extend karna LSP todta hai kyunke setWidth/setValue ka behavior base class ke contract se alag hai. Common abstraction se redesign karo.',
  },
  {
    id: 'mistake-isp-1',
    title: 'Interface forces unused methods on implementors',
    titleUrdu: 'Interface implementors ko unused methods force karta hai',
    principle: 'isp',
    incorrectCode: 'interface Workable {\n  void work();\n  void eat();\n  void sleep();\n}\n\nclass Robot implements Workable {\n  public void work() { /* ok */ }\n  public void eat() { throw new UnsupportedOperationException(); }\n  public void sleep() { throw new UnsupportedOperationException(); }\n}',
    incorrectDiagram: 'Workable forces Robot to implement eat() and sleep()',
    correctCode: 'interface Workable { void work(); }\ninterface Eatable { void eat(); }\ninterface Sleepable { void sleep(); }\n\nclass Robot implements Workable { public void work() { } }\nclass Human implements Workable, Eatable, Sleepable {\n  public void work() { }\n  public void eat() { }\n  public void sleep() { }\n}',
    correctDiagram: 'Robot --implements--> Workable\nHuman --implements--> Workable, Eatable, Sleepable',
    explanation: 'A fat interface forces implementors to provide methods they dont need. Split into smaller, focused interfaces.',
    explanationUrdu: 'Bada interface implementors ko wo methods provide karne pe majboor karta hai jo unhe chahiye bhi nahi. Chhote, focused interfaces mein split karo.',
  },
  {
    id: 'mistake-dip-1',
    title: 'High-level code depends directly on concrete implementation',
    titleUrdu: 'High-level code directly concrete implementation pe depend karti hai',
    principle: 'dip',
    incorrectCode: 'class OrderService {\n  private MySQLDatabase db = new MySQLDatabase();\n  void saveOrder(Order o) { db.insert(o); }\n}',
    incorrectDiagram: 'OrderService --> MySQLDatabase (direct dependency)',
    correctCode: 'interface Database { void insert(Object o); }\n\nclass MySQLDatabase implements Database {\n  public void insert(Object o) { /* mysql */ }\n}\n\nclass OrderService {\n  private Database db;\n  OrderService(Database db) { this.db = db; }\n  void saveOrder(Order o) { db.insert(o); }\n}',
    correctDiagram: 'OrderService --> Database interface <-- MySQLDatabase',
    explanation: 'OrderService directly creates MySQLDatabase, coupling it to a specific implementation. Depend on a Database abstraction instead.',
    explanationUrdu: 'OrderService directly MySQLDatabase create karta hai, jise specific implementation se couple karta hai. Database abstraction pe depend karo.',
  },
  {
    id: 'mistake-inherit-1',
    title: 'Inheritance used where domain relationship does not justify it',
    titleUrdu: 'Inheritance wahan use hui hai jahan domain relationship justify nahi karta',
    principle: 'coupling-cohesion',
    incorrectCode: 'class Car extends Vehicle {\n  // Car IS-A Vehicle? Maybe.\n  // But if Car also extends Engine, that is wrong\n}\nclass ElectricCar extends Car, Battery { } // multiple inheritance issue',
    incorrectDiagram: 'ElectricCar extends Car AND Battery (diamond problem)',
    correctCode: 'class Car {\n  private Engine engine;\n  private Battery battery;\n  // Composition: Car HAS-A Engine, HAS-A Battery\n}',
    correctDiagram: 'Car --> Engine (composition)\nCar --> Battery (composition)',
    explanation: 'Use inheritance only for true IS-A relationships. For HAS-A relationships, use composition. Inheritance creates tight coupling.',
    explanationUrdu: 'Inheritance sirf true IS-A relationships ke liye use karo. HAS-A relationships ke liye composition use karo. Inheritance tight coupling create karta hai.',
  },
];

export const DEFAULT_SOLID_MISSION: SolidMission = {
  id: 'become-architect',
  title: 'Become a Software Architect',
  titleUrdu: 'Software Architect bano',
  description: 'Master SOLID principles and design patterns to build maintainable systems.',
  descriptionUrdu: 'SOLID principles aur design patterns seekho maintainable systems banane ke liye.',
  xpReward: 150,
  objectives: [
    {
      id: 'obj-1',
      description: 'Identify high coupling in the UniversityManager system',
      descriptionUrdu: 'UniversityManager system mein high coupling pehchano',
      type: 'inspect-design',
      targetPrinciple: 'coupling-cohesion',
      completed: false,
    },
    {
      id: 'obj-2',
      description: 'Improve cohesion by separating UniversityManager responsibilities',
      descriptionUrdu: 'UniversityManager responsibilities alag karke cohesion improve karo',
      type: 'complete-refactoring',
      targetPrinciple: 'coupling-cohesion',
      completed: false,
    },
    {
      id: 'obj-3',
      description: 'Solve the SRP challenge: identify the violation in OrderManager',
      descriptionUrdu: 'SRP challenge solve karo: OrderManager mein violation pehchano',
      type: 'solve-challenge',
      targetPrinciple: 'srp',
      completed: false,
    },
    {
      id: 'obj-4',
      description: 'Refactor the PaymentProcessor using Open/Closed Principle',
      descriptionUrdu: 'PaymentProcessor ko Open/Closed Principle se refactor karo',
      type: 'apply-principle',
      targetPrinciple: 'ocp',
      completed: false,
    },
    {
      id: 'obj-5',
      description: 'Identify the LSP contract violation in the Bird/Square hierarchy',
      descriptionUrdu: 'Bird/Square hierarchy mein LSP contract violation pehchano',
      type: 'identify-problem',
      targetPrinciple: 'lsp',
      completed: false,
    },
    {
      id: 'obj-6',
      description: 'Improve the UniversityStaff interface using ISP',
      descriptionUrdu: 'UniversityStaff interface ko ISP se improve karo',
      type: 'apply-principle',
      targetPrinciple: 'isp',
      completed: false,
    },
    {
      id: 'obj-7',
      description: 'Apply DIP to the StudentService notification system',
      descriptionUrdu: 'StudentService notification system pe DIP apply karo',
      type: 'apply-principle',
      targetPrinciple: 'dip',
      completed: false,
    },
    {
      id: 'obj-8',
      description: 'Complete a final architecture design challenge',
      descriptionUrdu: 'Aakhri architecture design challenge mukammal karo',
      type: 'solve-challenge',
      completed: false,
    },
  ],
};
