import type { ExecutionStep, Mission, ClassBlueprint } from '@/types/oopLab';

// ═══════════════════════════════════════════════════════════════
// ARCHITECTURE LAB — CLASS BLUEPRINTS
// ═══════════════════════════════════════════════════════════════

export const ARCHITECTURE_CLASSES: ClassBlueprint[] = [
  {
    name: 'Student',
    properties: [
      { name: 'name', type: 'String', value: '""', accessModifier: 'private' },
      { name: 'department', type: 'Department', value: 'null', accessModifier: 'private' },
    ],
    methods: [
      { name: 'Student', returnType: 'void', parameters: [{ name: 'name', type: 'String' }], accessModifier: 'public', body: 'this.name = name;' },
      { name: 'getDepartment', returnType: 'Department', parameters: [], accessModifier: 'public', body: 'return department;' },
    ],
  },
  {
    name: 'Department',
    properties: [
      { name: 'name', type: 'String', value: '""', accessModifier: 'private' },
      { name: 'teachers', type: 'List<Teacher>', value: 'new ArrayList<>()', accessModifier: 'private' },
    ],
    methods: [
      { name: 'Department', returnType: 'void', parameters: [{ name: 'name', type: 'String' }], accessModifier: 'public', body: 'this.name = name;' },
      { name: 'addTeacher', returnType: 'void', parameters: [{ name: 'teacher', type: 'Teacher' }], accessModifier: 'public', body: 'teachers.add(teacher);' },
    ],
  },
  {
    name: 'Teacher',
    properties: [
      { name: 'name', type: 'String', value: '""', accessModifier: 'private' },
      { name: 'subject', type: 'String', value: '""', accessModifier: 'private' },
    ],
    methods: [
      { name: 'Teacher', returnType: 'void', parameters: [{ name: 'name', type: 'String' }, { name: 'subject', type: 'String' }], accessModifier: 'public', body: 'this.name = name; this.subject = subject;' },
      { name: 'teach', returnType: 'void', parameters: [{ name: 'student', type: 'Student' }], accessModifier: 'public', body: 'System.out.println("Teaching " + student);' },
    ],
  },
  {
    name: 'OrderService',
    properties: [
      { name: 'database', type: 'Database', value: 'null', accessModifier: 'private' },
      { name: 'emailService', type: 'EmailService', value: 'null', accessModifier: 'private' },
    ],
    methods: [
      { name: 'OrderService', returnType: 'void', parameters: [{ name: 'database', type: 'Database' }, { name: 'email', type: 'EmailService' }], accessModifier: 'public', body: 'this.database = database; this.emailService = email;' },
      { name: 'placeOrder', returnType: 'void', parameters: [], accessModifier: 'public', body: 'database.save(); emailService.send();' },
    ],
  },
  {
    name: 'PaymentMethod',
    properties: [],
    methods: [
      { name: 'pay', returnType: 'void', parameters: [], accessModifier: 'public', body: '' },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════
// EXECUTION STEPS — Object Relationships
// ═══════════════════════════════════════════════════════════════

export const ARCHITECTURE_STEPS: ExecutionStep[] = [
  // ── STEP 1: ASSOCIATION ──
  {
    id: 1, codeLine: 1,
    description: 'Association: Teacher and Student are related — Teacher can teach Student.',
    descriptionUrdu: 'Association: Teacher aur Student related hain — Teacher Student ko padha sakta hai.',
    codeAction: { type: 'DECLARE_CLASS', sourceLine: 1, className: 'Teacher' },
    worldAction: { type: 'SHOW_CLASS_BLUEPRINT', className: 'Teacher' },
    callout: { type: 'concept', title: 'Association', message: 'Association means two classes are related and can interact with each other. It is the broadest relationship — simply "these classes know about each other."', messageUrdu: 'Association ka matlab hai ke do classes related hain aur ek doosre se interact kar sakti hain. Ye sabse broad relationship hai — bas "ye classes ek doosre ke baare mein jaanti hain."' },
  },
  {
    id: 2, codeLine: 3,
    description: 'Teacher.teach(Student) — Teacher uses Student as a parameter. This is a directional association.',
    descriptionUrdu: 'Teacher.teach(Student) — Teacher Student ko parameter ke roop mein use karta hai. Ye directional association hai.',
    codeAction: { type: 'CREATE_ASSOCIATION', sourceLine: 3, className: 'Teacher', targetClassName: 'Student', methodName: 'teach' },
    worldAction: { type: 'SHOW_RELATIONSHIP_LINE', className: 'Teacher', message: 'Teacher ──────> Student (association)' },
    callout: { type: 'what', title: 'Directional Association', message: 'When Teacher has a method that takes Student as a parameter, Teacher "knows about" Student. This is a directional association — Teacher depends on Student, not necessarily the reverse.', messageUrdu: 'Jab Teacher mein method ho jo Student ko parameter leta hai, Teacher Student ke baare mein "jaanta hai." Ye directional association hai — Teacher Student par depend karta hai, ulta zaroori nahi.' },
  },
  // ── STEP 3: HAS-A ──
  {
    id: 3, codeLine: 6,
    description: 'HAS-A: Student HAS-A Department. The Student contains a reference to Department.',
    descriptionUrdu: 'HAS-A: Student ke paas Department hai. Student mein Department ka reference hai.',
    codeAction: { type: 'DECLARE_VARIABLE', sourceLine: 6, className: 'Student', variableName: 'department' },
    worldAction: { type: 'SHOW_RELATIONSHIP_LINE', className: 'Student', message: 'Student HAS-A Department' },
    callout: { type: 'concept', title: 'HAS-A Relationship', message: 'HAS-A means one object contains or uses another object as part of its design. "Student HAS-A Department" means Student holds a reference to a Department object.', messageUrdu: 'HAS-A ka matlab hai ke ek object doosre object ko apne design ka hissa rakhta hai. "Student HAS-A Department" ka matlab hai Student ek Department object ka reference rakhta hai.' },
  },
  // ── STEP 4: IS-A vs HAS-A ──
  {
    id: 4, codeLine: 10,
    description: 'IS-A: Student IS-A Person (inheritance). HAS-A: Student HAS-A Address (composition).',
    descriptionUrdu: 'IS-A: Student ek Person hai (inheritance). HAS-A: Student ke paas Address hai (composition).',
    codeAction: { type: 'DECLARE_CLASS', sourceLine: 10, className: 'Student' },
    worldAction: { type: 'SHOW_INHERITANCE_TREE', className: 'Student', message: 'IS-A: Student extends Person | HAS-A: Student has Address' },
    callout: { type: 'tip', title: 'IS-A vs HAS-A Decision', message: 'IS-A means "is a type of" — use inheritance when the subclass is genuinely substitutable for the parent. HAS-A means "contains" — use composition when one object needs another as a helper or component.', messageUrdu: 'IS-A ka matlab hai "ek type hai" — inheritance tab use karo jab subclass genuinely parent ki jagah use ho sake. HAS-A ka matlab hai "shamil hai" — composition tab use karo jab ek object ko doosre ki zaroorat ho.' },
  },
  // ── STEP 5: AGGREGATION ──
  {
    id: 5, codeLine: 14,
    description: 'Aggregation: Department contains List<Teacher> — Teachers can exist independently of the Department.',
    descriptionUrdu: 'Aggregation: Department mein List<Teacher> hai — Teachers Department ke bina bhi exist kar sakte hain.',
    codeAction: { type: 'CREATE_AGGREGATION', sourceLine: 14, className: 'Department', targetClassName: 'Teacher' },
    worldAction: { type: 'SHOW_AGGREGATION_LINK', className: 'Department', message: 'Department <>---- Teacher (aggregation: independent parts)' },
    callout: { type: 'concept', title: 'Aggregation', message: 'Aggregation represents a whole-part relationship where the part can exist independently. A Department has Teachers, but if the Department closes, the Teachers still exist as independent entities.', messageUrdu: 'Aggregation whole-part relationship represent karta hai jahan part independently exist kar sake. Department ke paas Teachers hain, lekin agar Department band ho jaye to Teachers phir bhi independent entities ke roop mein exist karenge.' },
  },
  // ── STEP 6: COMPOSITION ──
  {
    id: 6, codeLine: 18,
    description: 'Composition: House contains Rooms. If the House is destroyed, Rooms lose meaning in this model.',
    descriptionUrdu: 'Composition: House mein Rooms hain. Agar House destroy ho jaye to Rooms is model mein meaning kho dete hain.',
    codeAction: { type: 'CREATE_COMPOSITION', sourceLine: 18, className: 'House', targetClassName: 'Room' },
    worldAction: { type: 'SHOW_COMPOSITION_LINK', className: 'House', message: 'House ◆──── Room (composition: strongly owned parts)' },
    callout: { type: 'concept', title: 'Composition', message: 'Composition is a strong whole-part relationship. The part is owned by the whole and does not meaningfully exist independently in that model. House owns Rooms — if the House is removed, the Rooms go with it.', messageUrdu: 'Composition strong whole-part relationship hai. Part whole ka hai aur model mein independently exist nahi karta. House Rooms ka maalik hai — agar House hatao to Rooms bhi chale jaate hain.' },
  },
  // ── STEP 7: AGGREGATION vs COMPOSITION ──
  {
    id: 7, codeLine: 22,
    description: 'Aggregation vs Composition: These are design/modeling concepts, NOT Java keywords.',
    descriptionUrdu: 'Aggregation vs Composition: Ye design/modeling concepts hain, Java keywords NAHI hain.',
    codeAction: { type: 'DECLARE_CLASS', sourceLine: 22, className: 'Department' },
    worldAction: { type: 'SHOW_INFO', message: 'Key insight: aggregation and composition are modeling concepts, not Java language features' },
    callout: { type: 'remember', title: 'Modeling Concepts', message: 'Important: Aggregation and composition are NOT special Java keywords. They are modeling/design concepts. Java does not automatically enforce lifecycle management. You design the relationship — the code follows your design.', messageUrdu: 'Zaroori: Aggregation aur Composition Java ke special keywords NAHI hain. Ye modeling/design concepts hain. Java automatically lifecycle management enforce nahi karta. Aap relationship design karte hain — code aapke design ko follow karta hai.' },
  },
  // ── STEP 8: DEPENDENCY ──
  {
    id: 8, codeLine: 26,
    description: 'Dependency: OrderService temporarily uses Database to save data.',
    descriptionUrdu: 'Dependency: OrderService temporarily Database ko data save karne ke liye use karta hai.',
    codeAction: { type: 'CREATE_DEPENDENCY', sourceLine: 26, className: 'OrderService', targetClassName: 'Database' },
    worldAction: { type: 'SHOW_DEPENDENCY_ARROW', className: 'OrderService', message: 'OrderService -.-> Database (dependency: temporary use)' },
    callout: { type: 'concept', title: 'Dependency', message: 'Dependency means one class temporarily uses another class to perform work. The dependency is usually through a method parameter. The class does NOT hold a long-term reference.', messageUrdu: 'Dependency ka matlab hai ek class doosri class ko kaam karne ke liye temporarily use karti hai. Dependency usually method parameter ke through hoti hai. Class long-term reference nahi rakhti.' },
  },
  // ── STEP 9: COUPLING ──
  {
    id: 9, codeLine: 30,
    description: 'High Coupling: OrderService directly depends on MySQLDatabase and SMTPEmailService.',
    descriptionUrdu: 'High Coupling: OrderService directly MySQLDatabase aur SMTPEmailService par depend karta hai.',
    codeAction: { type: 'SHOW_COMPILE_ERROR', sourceLine: 30, errorMessage: 'High coupling: OrderService tightly bound to concrete implementations' },
    worldAction: { type: 'SHOW_ARCHITECTURE_BAD', message: 'Tightly coupled: changes in MySQLDatabase force changes in OrderService' },
    callout: { type: 'mistake', title: 'High Coupling', message: 'High coupling means components are strongly dependent on each other. If MySQLDatabase changes, OrderService must also change. This makes the system fragile and hard to modify.', messageUrdu: 'High coupling ka matlab hai ke components ek doosre par strongly depend karti hain. Agar MySQLDatabase badle to OrderService bhi badalna padega. Ye system ko fragile aur modify karna mushkil banata hai.' },
  },
  // ── STEP 10: LOW COUPLING (DIP) ──
  {
    id: 10, codeLine: 34,
    description: 'Low Coupling: Use interfaces — OrderService depends on Database interface, not MySQLDatabase.',
    descriptionUrdu: 'Low Coupling: Interfaces use karo — OrderService Database interface par depend karta hai, MySQLDatabase par nahi.',
    codeAction: { type: 'APPLY_DIP', sourceLine: 34, className: 'OrderService', interfaceName: 'Database' },
    worldAction: { type: 'SHOW_SOLID_FIX', message: 'Low coupling: OrderService -> Database interface <- MySQLDatabase' },
    callout: { type: 'tip', title: 'Low Coupling', message: 'Low coupling means components depend on abstractions (interfaces) instead of concrete implementations. OrderService can work with ANY Database implementation — MySQL, PostgreSQL, or even a mock for testing.', messageUrdu: 'Low coupling ka matlab hai ke components concrete implementations ke bajaye abstractions (interfaces) par depend karti hain. OrderService KISI BHI Database implementation ke saath kaam kar sakta hai — MySQL, PostgreSQL, ya testing ke liye mock.' },
  },
  // ── STEP 11: COHESION ──
  {
    id: 11, codeLine: 38,
    description: 'Low Cohesion: StudentManager has unrelated methods — save, email, report, salary.',
    descriptionUrdu: 'Low Cohesion: StudentManager mein unrelated methods hain — save, email, report, salary.',
    codeAction: { type: 'SHOW_COMPILE_ERROR', sourceLine: 38, errorMessage: 'Low cohesion: StudentManager handles too many unrelated responsibilities' },
    worldAction: { type: 'SHOW_ARCHITECTURE_BAD', message: 'Low cohesion: saveStudent + sendEmail + generateReport + calculateSalary = mixed responsibilities' },
    callout: { type: 'mistake', title: 'Low Cohesion', message: 'Low cohesion means a class handles many unrelated responsibilities. StudentManager should NOT save data, send emails, generate reports, AND calculate salaries. These are different concerns.', messageUrdu: 'Low cohesion ka matlab hai ke class bohot saari unrelated responsibilities handle karti hai. StudentManager ko data save, email bhejne, reports generate, aur salaries calculate NAHI karna chahiye. Ye alag-alag concerns hain.' },
  },
  // ── STEP 12: HIGH COHESION (REFACTOR) ──
  {
    id: 12, codeLine: 42,
    description: 'High Cohesion: Split into StudentRepository, EmailService, ReportService, SalaryService.',
    descriptionUrdu: 'High Cohesivity: Alag karo — StudentRepository, EmailService, ReportService, SalaryService.',
    codeAction: { type: 'INCREASE_COHESION', sourceLine: 42, className: 'StudentRepository', targetClassName: 'StudentManager' },
    worldAction: { type: 'SHOW_REFACTORED_CLASS', message: 'High cohesion: each class has one focused responsibility' },
    callout: { type: 'concept', title: 'High Cohesion', message: 'High cohesion means a class has closely related responsibilities grouped together. Each class does ONE thing well. StudentRepository only handles data persistence. EmailService only handles notifications.', messageUrdu: 'High cohesion ka matlab hai ke class mein closely related responsibilities logically grouped hon. Har class EK cheez achi tarike se kare. Sirf data persistence. Sirf notifications.' },
  },
  // ── STEP 13: SRP ──
  {
    id: 13, codeLine: 46,
    description: 'SRP: A class should have ONE responsibility and ONE reason to change.',
    descriptionUrdu: 'SRP: Class ke paas EK responsibility aur EK change ki wajah honi chahiye.',
    codeAction: { type: 'APPLY_SRP', sourceLine: 46, className: 'Invoice' },
    worldAction: { type: 'SHOW_SOLID_FIX', message: 'SRP: Invoice + InvoiceRepository + InvoicePrinter + InvoiceEmailService' },
    callout: { type: 'concept', title: 'SRP — Single Responsibility', message: 'A class should have only one reason to change. Invoice handles calculation — that is its ONE responsibility. Persistence, printing, and email are separate concerns that belong in separate classes.', messageUrdu: 'Class ke paas sirf EK change ki wajah honi chahiye. Invoice calculation handle karta hai — ye uski EK responsibility hai. Persistence, printing, aur email alag concerns hain jo alag classes mein honi chahiye.' },
  },
  // ── STEP 14: OCP ──
  {
    id: 14, codeLine: 50,
    description: 'OCP: Open for extension, closed for modification. Add new payment methods without changing PaymentService.',
    descriptionUrdu: 'OCP: Extension ke liye open, modification ke liye closed. PaymentService ko change kiye bina naye payment methods add karo.',
    codeAction: { type: 'APPLY_OCP', sourceLine: 50, className: 'PaymentMethod', methodName: 'pay' },
    worldAction: { type: 'SHOW_DESIGN_PATTERN', message: 'OCP: PaymentMethod interface + CardPayment + CashPayment + NewPayment (extend without modifying)' },
    callout: { type: 'concept', title: 'OCP — Open/Closed Principle', message: 'Software entities should be open for extension but closed for modification. Instead of adding if-else for each new payment type, create an interface. New payment methods implement the interface — no existing code changes.', messageUrdu: 'Software entities extension ke liye open aur modification ke liye closed honi chahiye. Har naye payment type ke liye if-else add karne ke bajaye, interface banao. Naye payment methods interface implement karein — maujooda code na badle.' },
  },
  // ── STEP 15: LSP ──
  {
    id: 15, codeLine: 54,
    description: 'LSP: Subtypes must be substitutable for their base type without breaking contracts.',
    descriptionUrdu: 'LSP: Subtypes apne base type ki jagah use ho sakti hain bina contracts tod ke.',
    codeAction: { type: 'APPLY_LSP', sourceLine: 54, className: 'Penguin', targetClassName: 'Bird' },
    worldAction: { type: 'SHOW_SOLID_VIOLATION', message: 'LSP: Penguin extends Bird but cannot fly — contract violation if fly() is expected' },
    callout: { type: 'concept', title: 'LSP — Liskov Substitution', message: 'Subtypes should be usable wherever their base type is expected without breaking expected behavior. If Bird has fly(), forcing Penguin to implement fly() violates LSP. Design hierarchies around behavior that ALL subtypes genuinely share.', messageUrdu: 'Subtypes un jagah use honi chahiye jahan unka base type expect ho, bina expected behavior tod ke. Agar Bird mein fly() hai to Penguin ko fly() implement karne par majboor karna LSP violate karta hai. Hierarchy un behavior ke around design karo jo SAB subtypes genuinely share karein.' },
  },
  // ── STEP 16: ISP ──
  {
    id: 16, codeLine: 58,
    description: 'ISP: Clients should not be forced to depend on methods they do not use.',
    descriptionUrdu: 'ISP: Clients ko un methods par depend nahi karna chahiye jo wo use nahi karte.',
    codeAction: { type: 'APPLY_ISP', sourceLine: 58, className: 'Workable', targetClassName: 'Worker' },
    worldAction: { type: 'SHOW_SOLID_FIX', message: 'ISP: Worker -> Workable + Eatable (separate interfaces for separate capabilities)' },
    callout: { type: 'concept', title: 'ISP — Interface Segregation', message: 'Instead of one large Worker interface, create smaller focused interfaces: Workable and Eatable. A Robot implements Workable only — it is NOT forced to implement eat() which it does not need.', messageUrdu: 'Ek bade Worker interface ke bajaye, chhote focused interfaces banao: Workable aur Eatable. Robot sirf Workable implement karta hai — use eat() implement karne par majboor NAHI kiya jaata jo use zaroorat nahi.' },
  },
  // ── STEP 17: DIP ──
  {
    id: 17, codeLine: 62,
    description: 'DIP: High-level modules should not depend on low-level details. Both should depend on abstractions.',
    descriptionUrdu: 'DIP: High-level modules low-level details par depend nahi karni chahiye. Dono abstractions par depend hon.',
    codeAction: { type: 'APPLY_DIP', sourceLine: 62, className: 'OrderService', interfaceName: 'Database' },
    worldAction: { type: 'SHOW_SOLID_FIX', message: 'DIP: OrderService -> Database (interface) <- MySQLDatabase (implementation)' },
    callout: { type: 'concept', title: 'DIP — Dependency Inversion', message: 'High-level modules should not depend directly on low-level implementations. Both should depend on abstractions. OrderService depends on Database interface. MySQLDatabase also implements Database interface. Neither depends on the other directly.', messageUrdu: 'High-level modules directly low-level implementations par depend nahi karni chahiye. Dono abstractions par depend hon. OrderService Database interface par depend karta hai. MySQLDatabase bhi Database interface implement karta hai. Koi seedha doosre par depend nahi.' },
  },
  // ── STEP 18: ARCHITECTURE REFACTOR ──
  {
    id: 18, codeLine: 66,
    description: 'Refactoring: Transform tightly coupled system into clean architecture with focused classes.',
    descriptionUrdu: 'Refactoring: Tightly coupled system ko clean architecture mein transform karo.',
    codeAction: { type: 'REFACTOR_CLASS', sourceLine: 66, className: 'UniversitySystem' },
    worldAction: { type: 'SHOW_ARCHITECTURE_GOOD', message: 'Before: Tightly coupled | After: Focused classes, abstractions, lower coupling, higher cohesion' },
    callout: { type: 'tip', title: 'Good Architecture', message: 'Good OOP architecture means: focused classes with high cohesion, loose coupling through abstractions, correct relationships (IS-A for inheritance, HAS-A for composition), and SOLID principles guiding design decisions.', messageUrdu: 'Achi OOP architecture ka matlab hai: focused classes with high cohesion, abstractions ke through loose coupling, sahi relationships (inheritance ke liye IS-A, composition ke liye HAS-A), aur SOLID principles design decisions ko guide karte hain.' },
  },
  // ── STEP 19: SOLID SUMMARY ──
  {
    id: 19, codeLine: 70,
    description: 'SOLID Summary: Five principles that guide maintainable OOP design.',
    descriptionUrdu: 'SOLID Summary: Paanch principles jo maintainable OOP design ko guide karte hain.',
    codeAction: { type: 'DECLARE_CLASS', sourceLine: 70, className: 'SOLID' },
    worldAction: { type: 'SHOW_INFO', message: 'S=SRP, O=OCP, L=LSP, I=ISP, D=DIP' },
    callout: { type: 'remember', title: 'SOLID Principles', message: 'SRP: One responsibility. OCP: Extend without modifying. LSP: Valid substitution. ISP: Small focused interfaces. DIP: Depend on abstractions. These principles work together to create maintainable systems.', messageUrdu: 'SRP: Ek responsibility. OCP: Bina modify kiye extend karo. LSP: Valid substitution. ISP: Chhote focused interfaces. DIP: Abstractions par depend karo. Ye principles milkar maintainable systems banate hain.' },
  },
  // ── STEP 20: BOSS CHALLENGE ──
  {
    id: 20, codeLine: 74,
    description: 'Boss Challenge: Architect the University — apply all relationships and SOLID principles.',
    descriptionUrdu: 'Boss Challenge: University ko architect karo — sab relationships aur SOLID principles apply karo.',
    codeAction: { type: 'DECLARE_CLASS', sourceLine: 74, className: 'UniversitySystem' },
    worldAction: { type: 'SHOW_ARCHITECTURE_GOOD', message: 'ARCHITECTURE MASTERED: Clean, maintainable, SOLID university system' },
    callout: { type: 'concept', title: 'Architecture Mastered', message: 'You have learned: association, aggregation, composition, dependency, IS-A vs HAS-A, coupling, cohesion, and all five SOLID principles. You can now design clean, maintainable OOP systems.', messageUrdu: 'Aapne seekha hai: association, aggregation, composition, dependency, IS-A vs HAS-A, coupling, cohesion, aur paanchon SOLID principles. Ab aap clean, maintainable OOP systems design kar sakte hain.' },
  },
];

// ═══════════════════════════════════════════════════════════════
// MISSIONS
// ═══════════════════════════════════════════════════════════════

export const ARCHITECTURE_MISSION: Mission = {
  id: 'mission-arch-001',
  title: 'MISSION — OOP Architecture Lab',
  titleUrdu: 'MISSION — OOP Architecture Lab',
  description: 'Master object relationships, coupling, cohesion, and SOLID principles through interactive architecture simulation.',
  descriptionUrdu: 'Object relationships, coupling, cohesion, aur SOLID principles ko interactive architecture simulation se master karo.',
  status: 'active',
  objectives: [
    { id: 'arch-1', description: 'Understand Association relationship', descriptionUrdu: 'Association relationship samjho', completed: false, type: 'identify-association', targetCount: 1, currentCount: 0 },
    { id: 'arch-2', description: 'Identify HAS-A relationship', descriptionUrdu: 'HAS-A relationship pehchano', completed: false, type: 'choose-is-a-vs-has-a', targetCount: 1, currentCount: 0 },
    { id: 'arch-3', description: 'Learn Aggregation concept', descriptionUrdu: 'Aggregation concept seekho', completed: false, type: 'identify-aggregation', targetCount: 1, currentCount: 0 },
    { id: 'arch-4', description: 'Learn Composition concept', descriptionUrdu: 'Composition concept seekho', completed: false, type: 'identify-composition', targetCount: 1, currentCount: 0 },
    { id: 'arch-5', description: 'Understand Dependency relationship', descriptionUrdu: 'Dependency relationship samjho', completed: false, type: 'identify-dependency', targetCount: 1, currentCount: 0 },
    { id: 'arch-6', description: 'Reduce coupling using interfaces', descriptionUrdu: 'Interfaces se coupling kam karo', completed: false, type: 'reduce-coupling', targetCount: 1, currentCount: 0 },
    { id: 'arch-7', description: 'Apply SRP to a class', descriptionUrdu: 'Class mein SRP apply karo', completed: false, type: 'apply-srp', targetCount: 1, currentCount: 0 },
    { id: 'arch-8', description: 'Apply OCP with payment example', descriptionUrdu: 'Payment example se OCP apply karo', completed: false, type: 'apply-ocp', targetCount: 1, currentCount: 0 },
    { id: 'arch-9', description: 'Apply DIP using dependency injection', descriptionUrdu: 'Dependency injection se DIP apply karo', completed: false, type: 'apply-dip', targetCount: 1, currentCount: 0 },
    { id: 'arch-10', description: 'Refactor a tightly coupled system', descriptionUrdu: 'Tightly coupled system refactor karo', completed: false, type: 'refactor-architecture', targetCount: 1, currentCount: 0 },
  ],
  xpReward: 200,
};

// ═══════════════════════════════════════════════════════════════
// SCENARIO CHALLENGES
// ═══════════════════════════════════════════════════════════════

export interface ArchitectureScenario {
  id: string;
  title: string;
  titleUrdu: string;
  description: string;
  descriptionUrdu: string;
  options: string[];
  correctOption: string;
  explanation: string;
  explanationUrdu: string;
  relationshipType: string;
}

export const ARCHITECTURE_SCENARIOS: ArchitectureScenario[] = [
  {
    id: 'scenario-01',
    title: 'University — Student & Department',
    titleUrdu: 'University — Student aur Department',
    description: 'A Student belongs to a Department but can exist independently. If the Department is removed, the Student still exists.',
    descriptionUrdu: 'Student Department ka hissa hai lekin independently exist kar sakta hai. Agar Department hatayein to Student phir bhi exist karta hai.',
    options: ['Association', 'Aggregation', 'Composition', 'Dependency'],
    correctOption: 'Aggregation',
    explanation: 'Aggregation: Student is a part of Department but has independent existence. The whole (Department) does not control the lifetime of the part (Student).',
    explanationUrdu: 'Aggregation: Student Department ka hissa hai lekin independent existence hai. Whole (Department) part (Student) ki lifetime control nahi karta.',
    relationshipType: 'aggregation',
  },
  {
    id: 'scenario-02',
    title: 'House & Room',
    titleUrdu: 'House aur Room',
    description: 'A Room is modeled as a strongly owned component of a House. If the House is demolished, the Room does not exist in this model.',
    descriptionUrdu: 'Room House ka strongly owned component hai. Agar House girayein to Room is model mein exist nahi karta.',
    options: ['Association', 'Aggregation', 'Composition', 'Dependency'],
    correctOption: 'Composition',
    explanation: 'Composition: Room is strongly owned by House. The part (Room) lifecycle is tied to the whole (House).',
    explanationUrdu: 'Composition: Room House ka strongly owned hai. Part (Room) ki lifecycle whole (House) se tied hai.',
    relationshipType: 'composition',
  },
  {
    id: 'scenario-03',
    title: 'Payment System',
    titleUrdu: 'Payment System',
    description: 'You want CardPayment, CashPayment, and future payment methods. You should not modify PaymentService every time a new method is added.',
    descriptionUrdu: 'Aapko CardPayment, CashPayment, aur aane wale payment methods chahiye. Har baar PaymentService modify nahi hona chahiye.',
    options: ['SRP', 'OCP', 'LSP', 'ISP'],
    correctOption: 'OCP',
    explanation: 'OCP (Open/Closed Principle): The system should be open for extension but closed for modification. Add new PaymentMethod implementations without changing PaymentService.',
    explanationUrdu: 'OCP (Open/Closed Principle): System extension ke liye open aur modification ke liye closed hona chahiye. PaymentService change kiye bina naye PaymentMethod implementations add karo.',
    relationshipType: 'implementation',
  },
  {
    id: 'scenario-04',
    title: 'Notification Channels',
    titleUrdu: 'Notification Channels',
    description: 'Email, SMS, and Push notifications should be interchangeable. The notification sender should work with any channel.',
    descriptionUrdu: 'Email, SMS, aur Push notifications interchangeable honi chahiye. Notification sender kisi bhi channel ke saath kaam kare.',
    options: ['Inheritance', 'Composition', 'Polymorphism', 'All of these'],
    correctOption: 'All of these',
    explanation: 'Polymorphism through an interface (NotificationChannel) with composition. The NotificationService holds a reference to the interface, and different implementations (Email, SMS, Push) are interchangeable.',
    explanationUrdu: 'Interface (NotificationChannel) ke through Polymorphism composition ke saath. NotificationService interface ka reference rakhta hai, aur different implementations (Email, SMS, Push) interchangeable hain.',
    relationshipType: 'polymorphism',
  },
  {
    id: 'scenario-05',
    title: 'God Class Violation',
    titleUrdu: 'God Class Violation',
    description: 'One class handles database, email, authentication, and reports. Which principle is being violated?',
    descriptionUrdu: 'Ek class database, email, authentication, aur reports handle karti hai. Kaun sa principle violate ho raha hai?',
    options: ['SRP', 'OCP', 'LSP', 'DIP'],
    correctOption: 'SRP',
    explanation: 'SRP (Single Responsibility Principle): A class should have only one reason to change. This "god class" has too many unrelated responsibilities.',
    explanationUrdu: 'SRP (Single Responsibility Principle): Class ke paas sirf EK change ki wajah honi chahiye. Is "god class" ke paas bohot saari unrelated responsibilities hain.',
    relationshipType: 'cohesion',
  },
  {
    id: 'scenario-06',
    title: 'Database Implementation',
    titleUrdu: 'Database Implementation',
    description: 'OrderService directly depends on MySQLDatabase. What should you do?',
    descriptionUrdu: 'OrderService directly MySQLDatabase par depend karta hai. Aapko kya karna chahiye?',
    options: ['Add more concrete classes', 'Introduce a Database interface', 'Make OrderService abstract', 'Use static methods'],
    correctOption: 'Introduce a Database interface',
    explanation: 'DIP (Dependency Inversion Principle): Both high-level (OrderService) and low-level (MySQLDatabase) modules should depend on abstractions (Database interface).',
    explanationUrdu: 'DIP (Dependency Inversion Principle): High-level (OrderService) aur low-level (MySQLDatabase) dono modules abstractions (Database interface) par depend honi chahiye.',
    relationshipType: 'dependency',
  },
  {
    id: 'scenario-07',
    title: 'Robot Worker',
    titleUrdu: 'Robot Worker',
    description: 'You have a Worker interface with work() and eat(). A Robot should implement work() but does not need eat(). What principle applies?',
    descriptionUrdu: 'Aapke paas Worker interface hai with work() aur eat(). Robot ko work() implement karna hai lekin eat() ki zaroorat nahi. Kaun sa principle lagta hai?',
    options: ['SRP', 'OCP', 'ISP', 'DIP'],
    correctOption: 'ISP',
    explanation: 'ISP (Interface Segregation Principle): Clients should not be forced to depend on methods they do not use. Split Worker into Workable and Eatable.',
    explanationUrdu: 'ISP (Interface Segregation Principle): Clients ko un methods par depend nahi karna chahiye jo wo use nahi karte. Worker ko Workable aur Eatable mein todo.',
    relationshipType: 'interface',
  },
  {
    id: 'scenario-08',
    title: 'Penguin & Bird',
    titleUrdu: 'Penguin aur Bird',
    description: 'Penguin extends Bird but cannot fly. If Bird.fly() is called on Penguin, behavior breaks. Which principle is violated?',
    descriptionUrdu: 'Penguin Bird se extend hota hai lekin fly nahi kar sakta. Agar Penguin pe Bird.fly() call ho to behavior toot jaata hai. Kaun sa principle violate hai?',
    options: ['SRP', 'OCP', 'LSP', 'ISP'],
    correctOption: 'LSP',
    explanation: 'LSP (Liskov Substitution Principle): Subtypes must be substitutable for their base type without breaking contracts. Penguin cannot honor the Bird.fly() contract.',
    explanationUrdu: 'LSP (Liskov Substitution Principle): Subtypes apne base type ki jagah use honi chahiye bina contracts tod ke. Penguin Bird.fly() contract ko honor nahi kar sakta.',
    relationshipType: 'inheritance',
  },
];

// ═══════════════════════════════════════════════════════════════
// SOLID CHALLENGES
// ═══════════════════════════════════════════════════════════════

export interface SolidChallenge {
  id: string;
  principle: 'SRP' | 'OCP' | 'LSP' | 'ISP' | 'DIP';
  title: string;
  titleUrdu: string;
  badCode: string;
  goodCode: string;
  explanation: string;
  explanationUrdu: string;
}

export const SOLID_CHALLENGES: SolidChallenge[] = [
  {
    id: 'srp-challenge',
    principle: 'SRP',
    title: 'Single Responsibility Principle',
    titleUrdu: 'Single Responsibility Principle',
    badCode: `class Invoice {
    void calculateTotal() {}
    void saveToDatabase() {}
    void printInvoice() {}
    void sendEmail() {}
}`,
    goodCode: `class Invoice {
    void calculateTotal() {}
}
class InvoiceRepository {
    void save(Invoice invoice) {}
}
class InvoicePrinter {
    void print(Invoice invoice) {}
}
class InvoiceEmailService {
    void email(Invoice invoice) {}
}`,
    explanation: 'Invoice had 4 unrelated responsibilities. Split into focused classes: Invoice (calculation), InvoiceRepository (persistence), InvoicePrinter (printing), InvoiceEmailService (email).',
    explanationUrdu: 'Invoice ke paas 4 unrelated responsibilities thi. Focused classes mein todo: Invoice (calculation), InvoiceRepository (persistence), InvoicePrinter (printing), InvoiceEmailService (email).',
  },
  {
    id: 'ocp-challenge',
    principle: 'OCP',
    title: 'Open/Closed Principle',
    titleUrdu: 'Open/Closed Principle',
    badCode: `class PaymentService {
    void pay(String type) {
        if (type.equals("card")) {
            // card logic
        } else if (type.equals("cash")) {
            // cash logic
        } else if (type.equals("paypal")) {
            // paypal logic
        }
    }
}`,
    goodCode: `interface PaymentMethod {
    void pay();
}
class CardPayment implements PaymentMethod {
    public void pay() { /* card logic */ }
}
class CashPayment implements PaymentMethod {
    public void pay() { /* cash logic */ }
}
// New payment methods added without modifying PaymentService`,
    explanation: 'PaymentService was modified every time a new payment type was added. With OCP, new payment methods implement PaymentMethod interface. PaymentService stays unchanged.',
    explanationUrdu: 'PaymentService har baar badalta tha jab naya payment type aata tha. OCP ke saath, naye payment methods PaymentMethod interface implement karte hain. PaymentService unchanged rehta hai.',
  },
  {
    id: 'lsp-challenge',
    principle: 'LSP',
    title: 'Liskov Substitution Principle',
    titleUrdu: 'Liskov Substitution Principle',
    badCode: `class Bird {
    void fly() { /* fly */ }
}
class Penguin extends Bird {
    void fly() {
        throw new UnsupportedOperationException(
            "Penguins cannot fly!"
        );
    }
}`,
    goodCode: `class Bird {
    void eat() { /* eat */ }
}
class FlyingBird extends Bird {
    void fly() { /* fly */ }
}
class Penguin extends Bird {
    // Penguin eats but does NOT need to fly
}`,
    explanation: 'Forcing Penguin to implement fly() violates LSP. Instead, create FlyingBird for birds that fly. Penguin extends Bird (eats) but does not inherit fly().',
    explanationUrdu: 'Penguin ko fly() implement karne par majboor karna LSP violate karta hai. Iske bajaye FlyingBird banao jo fly karte hain. Penguin Bird se extend hota hai (eats) lekin fly() inherit nahi karta.',
  },
  {
    id: 'isp-challenge',
    principle: 'ISP',
    title: 'Interface Segregation Principle',
    titleUrdu: 'Interface Segregation Principle',
    badCode: `interface Worker {
    void work();
    void eat();
    void sleep();
}
class Robot implements Worker {
    public void work() { /* works */ }
    public void eat() {
        // robots don't eat!
        throw new UnsupportedOperationException();
    }
    public void sleep() {
        // robots don't sleep!
        throw new UnsupportedOperationException();
    }
}`,
    goodCode: `interface Workable {
    void work();
}
interface Eatable {
    void eat();
}
interface Sleepable {
    void sleep();
}
class Robot implements Workable {
    public void work() { /* works */ }
}
class Human implements Workable, Eatable, Sleepable {
    public void work() { /* works */ }
    public void eat() { /* eats */ }
    public void sleep() { /* sleeps */ }
}`,
    explanation: 'Robot was forced to implement eat() and sleep() which it does not need. Split into focused interfaces. Robot only implements Workable.',
    explanationUrdu: 'Robot ko eat() aur sleep() implement karne par majboor kiya gaya jo use zaroorat nahi. Focused interfaces mein todo. Robot sirf Workable implement karta hai.',
  },
  {
    id: 'dip-challenge',
    principle: 'DIP',
    title: 'Dependency Inversion Principle',
    titleUrdu: 'Dependency Inversion Principle',
    badCode: `class OrderService {
    private MySQLDatabase database;
    private SMTPEmailService email;

    OrderService() {
        this.database = new MySQLDatabase();
        this.email = new SMTPEmailService();
    }
}`,
    goodCode: `interface Database {
    void save();
}
interface EmailService {
    void send();
}
class OrderService {
    private Database database;
    private EmailService email;

    OrderService(Database database, EmailService email) {
        this.database = database;
        this.email = email;
    }
}
// MySQLDatabase implements Database
// SMTPEmailService implements EmailService`,
    explanation: 'OrderService directly created concrete implementations. With DIP, it depends on interfaces. Implementations are injected via constructor — easy to swap for testing or different databases.',
    explanationUrdu: 'OrderService directly concrete implementations banata tha. DIP ke saath, ye interfaces par depend karta hai. Implementations constructor ke through inject hoti hain — testing ya different databases ke liye easily swap ho sakta hai.',
  },
];

// ═══════════════════════════════════════════════════════════════
// ARCHITECTURE MISTAKES
// ═══════════════════════════════════════════════════════════════

export interface ArchitectureMistake {
  id: string;
  title: string;
  titleUrdu: string;
  badCode: string;
  question: string;
  questionUrdu: string;
  answer: string;
  answerUrdu: string;
  principle: string;
}

export const ARCHITECTURE_MISTAKES: ArchitectureMistake[] = [
  {
    id: 'mistake-01',
    title: 'Incorrect IS-A Relationship',
    titleUrdu: 'Galat IS-A Relationship',
    badCode: 'class Dog extends Engine { }',
    question: 'What is wrong with this design?',
    questionUrdu: 'Is design mein kya galat hai?',
    answer: 'Incorrect IS-A relationship. A Dog is NOT a type of Engine. This violates the fundamental meaning of inheritance. Use HAS-A (composition) instead: Dog HAS-A Engine.',
    answerUrdu: 'Galat IS-A relationship. Dog Engine ka type NAHI hai. Ye inheritance ke fundamental meaning ko violate karta hai. ISKE bajaye HAS-A (composition) use karo: Dog ke paas Engine hai.',
    principle: 'Inheritance misuse',
  },
  {
    id: 'mistake-02',
    title: 'SRP Violation',
    titleUrdu: 'SRP Violation',
    badCode: `class Student {
    void saveToDatabase() {}
    void sendEmail() {}
    void printReport() {}
    void calculateGPA() {}
}`,
    question: 'Which OOP principle is violated?',
    questionUrdu: 'Kaun sa OOP principle violate ho raha hai?',
    answer: 'SRP (Single Responsibility Principle). Student handles persistence, email, reporting, and GPA calculation — four unrelated responsibilities. These should be in separate classes.',
    answerUrdu: 'SRP (Single Responsibility Principle). Student persistence, email, reporting, aur GPA calculation handle karta hai — chaar unrelated responsibilities. Ye alag classes mein honi chahiye.',
    principle: 'SRP',
  },
  {
    id: 'mistake-03',
    title: 'Tight Coupling',
    titleUrdu: 'Tight Coupling',
    badCode: `class OrderService {
    MySQLDatabase db;
    SMTPEmailService email;
}`,
    question: 'What design problem exists here?',
    questionUrdu: 'Yahan kya design problem hai?',
    answer: 'Tight coupling / DIP violation. OrderService directly depends on concrete implementations (MySQLDatabase, SMTPEmailService). If you switch to PostgreSQL, you must change OrderService. Use interfaces instead.',
    answerUrdu: 'Tight coupling / DIP violation. OrderService directly concrete implementations par depend karta hai. Agar PostgreSQL pe switch karo to OrderService badalna padega. Interfaces use karo.',
    principle: 'DIP',
  },
  {
    id: 'mistake-04',
    title: 'ISP Violation',
    titleUrdu: 'ISP Violation',
    badCode: `interface Machine {
    void print();
    void scan();
    void fax();
}
class SimplePrinter implements Machine {
    public void print() { /* works */ }
    public void scan() {
        throw new UnsupportedOperationException();
    }
    public void fax() {
        throw new UnsupportedOperationException();
    }
}`,
    question: 'What design problem does this create?',
    questionUrdu: 'Ye kya design problem create karta hai?',
    answer: 'ISP violation. SimplePrinter is forced to implement scan() and fax() which it does not support. Split Machine into smaller interfaces: Printable, Scannable, Faxable.',
    answerUrdu: 'ISP violation. SimplePrinter ko scan() aur fax() implement karne par majboor kiya gaya jo support nahi karta. Machine ko chhote interfaces mein todo: Printable, Scannable, Faxable.',
    principle: 'ISP',
  },
  {
    id: 'mistake-05',
    title: 'LSP Violation',
    titleUrdu: 'LSP Violation',
    badCode: `class Rectangle {
    int width, height;
    void setWidth(int w) { width = w; }
    void setHeight(int h) { height = h; }
    int getArea() { return width * height; }
}
class Square extends Rectangle {
    void setWidth(int w) {
        width = w; height = w;
    }
    void setHeight(int h) {
        width = h; height = h;
    }
}`,
    question: 'Why does this violate LSP?',
    questionUrdu: 'Ye LSP kyun violate karta hai?',
    answer: 'Square changes the behavior of setWidth/setHeight (both dimensions change at once). Code expecting a Rectangle to behave independently for width and height will break when given a Square.',
    answerUrdu: 'Square setWidth/setHeight ka behavior badalta hai (dono dimensions ek saath badalte hain). Rectangle ka code jo width aur height ko independent maanta hai, wo Square dene pe toot jaayega.',
    principle: 'LSP',
  },
];

// ═══════════════════════════════════════════════════════════════
// BOSS CHALLENGE QUESTIONS
// ═══════════════════════════════════════════════════════════════

export interface BossQuestion {
  id: string;
  question: string;
  questionUrdu: string;
  options: string[];
  correctOption: string;
  explanation: string;
  explanationUrdu: string;
}

export const BOSS_QUESTIONS: BossQuestion[] = [
  {
    id: 'boss-1',
    question: 'A Car has an Engine. Engine cannot exist without Car in this model. Which relationship?',
    questionUrdu: 'Car mein Engine hai. Engine is model mein Car ke bina exist nahi kar sakta. Kaun si relationship?',
    options: ['Association', 'Aggregation', 'Composition', 'Dependency'],
    correctOption: 'Composition',
    explanation: 'Composition: strong ownership, part lifecycle tied to whole.',
    explanationUrdu: 'Composition: strong ownership, part ki lifecycle whole se tied hai.',
  },
  {
    id: 'boss-2',
    question: 'OrderService directly creates new MySQLDatabase(). Which principle should guide the design?',
    questionUrdu: 'OrderService directly naya MySQLDatabase() banata hai. Kaun sa principle design ko guide kare?',
    options: ['SRP', 'OCP', 'LSP', 'DIP'],
    correctOption: 'DIP',
    explanation: 'DIP: depend on abstractions, not concrete implementations.',
    explanationUrdu: 'DIP: abstractions par depend karo, concrete implementations par nahi.',
  },
  {
    id: 'boss-3',
    question: 'A class has methods for saving, emailing, and printing. Which principle is violated?',
    questionUrdu: 'Ek class mein saving, emailing, aur printing ke methods hain. Kaun sa principle violate hai?',
    options: ['SRP', 'OCP', 'LSP', 'ISP'],
    correctOption: 'SRP',
    explanation: 'SRP: one class should have one reason to change.',
    explanationUrdu: 'SRP: ek class ke paas EK change ki wajah honi chahiye.',
  },
  {
    id: 'boss-4',
    question: 'You want to add PayPal payment without modifying PaymentService. Which principle?',
    questionUrdu: 'Aapko PaymentService change kiye bina PayPal payment add karni hai. Kaun sa principle?',
    options: ['SRP', 'OCP', 'LSP', 'DIP'],
    correctOption: 'OCP',
    explanation: 'OCP: open for extension, closed for modification.',
    explanationUrdu: 'OCP: extension ke liye open, modification ke liye closed.',
  },
  {
    id: 'boss-5',
    question: 'A Robot implements Worker but must throw exception for eat(). Which principle is violated?',
    questionUrdu: 'Robot Worker implement karta hai lekin eat() ke liye exception throw karna padta hai. Kaun sa principle violate hai?',
    options: ['SRP', 'OCP', 'LSP', 'ISP'],
    correctOption: 'ISP',
    explanation: 'ISP: clients should not be forced to depend on methods they do not use.',
    explanationUrdu: 'ISP: clients ko un methods par depend nahi karna chahiye jo wo use nahi karte.',
  },
  {
    id: 'boss-6',
    question: 'Department contains List<Teacher>. Teachers exist independently. Which relationship?',
    questionUrdu: 'Department mein List<Teacher> hai. Teachers independently exist karte hain. Kaun si relationship?',
    options: ['Association', 'Aggregation', 'Composition', 'Dependency'],
    correctOption: 'Aggregation',
    explanation: 'Aggregation: whole-part with independent part existence.',
    explanationUrdu: 'Aggregation: whole-part jahan part independently exist kare.',
  },
  {
    id: 'boss-7',
    question: 'Penguin extends Bird but Penguin.fly() throws exception. Which principle violated?',
    questionUrdu: 'Penguin Bird se extend hota hai lekin Penguin.fly() exception throw karta hai. Kaun sa principle violate?',
    options: ['SRP', 'OCP', 'LSP', 'ISP'],
    correctOption: 'LSP',
    explanation: 'LSP: subtypes must be substitutable without breaking contracts.',
    explanationUrdu: 'LSP: subtypes bina contracts tod ke substitutable honi chahiye.',
  },
  {
    id: 'boss-8',
    question: 'High coupling in a system means:',
    questionUrdu: 'System mein high coupling ka matlab hai:',
    options: ['Components are independent', 'Components are strongly dependent on each other', 'Classes have one responsibility', 'Interfaces are small and focused'],
    correctOption: 'Components are strongly dependent on each other',
    explanation: 'High coupling = strong interdependencies. Changes in one component force changes in others.',
    explanationUrdu: 'High coupling = mazboot interdependencies. Ek component mein changes doosre mein changes force karte hain.',
  },
];
