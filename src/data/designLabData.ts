import type { ExecutionStep, Mission, ClassBlueprint } from '@/types/oopLab';

// ═══════════════════════════════════════════════════════════════
// DESIGN LAB — CLASS BLUEPRINTS
// ═══════════════════════════════════════════════════════════════

export const DESIGN_LAB_CLASSES: ClassBlueprint[] = [
  {
    name: 'Student',
    properties: [
      { name: 'name', type: 'String', value: '""', accessModifier: 'private' },
      { name: 'id', type: 'int', value: '0', accessModifier: 'private' },
      { name: 'department', type: 'Department', value: 'null', accessModifier: 'private' },
    ],
    methods: [
      { name: 'Student', returnType: 'void', parameters: [{ name: 'name', type: 'String' }], accessModifier: 'public', body: 'this.name = name;' },
      { name: 'enroll', returnType: 'void', parameters: [{ name: 'course', type: 'Course' }], accessModifier: 'public', body: '/* enrollment logic */' },
      { name: 'getName', returnType: 'String', parameters: [], accessModifier: 'public', body: 'return name;' },
    ],
  },
  {
    name: 'Teacher',
    properties: [
      { name: 'name', type: 'String', value: '""', accessModifier: 'private' },
      { name: 'subject', type: 'String', value: '""', accessModifier: 'private' },
    ],
    methods: [
      { name: 'Teacher', returnType: 'void', parameters: [{ name: 'name', type: 'String' }], accessModifier: 'public', body: 'this.name = name;' },
      { name: 'teach', returnType: 'void', parameters: [{ name: 'course', type: 'Course' }], accessModifier: 'public', body: '/* teaching logic */' },
    ],
  },
  {
    name: 'Course',
    properties: [
      { name: 'title', type: 'String', value: '""', accessModifier: 'private' },
      { name: 'credits', type: 'int', value: '0', accessModifier: 'private' },
      { name: 'teacher', type: 'Teacher', value: 'null', accessModifier: 'private' },
    ],
    methods: [
      { name: 'Course', returnType: 'void', parameters: [{ name: 'title', type: 'String' }, { name: 'credits', type: 'int' }], accessModifier: 'public', body: 'this.title = title; this.credits = credits;' },
      { name: 'getTeacher', returnType: 'Teacher', parameters: [], accessModifier: 'public', body: 'return teacher;' },
    ],
  },
  {
    name: 'Department',
    properties: [
      { name: 'name', type: 'String', value: '""', accessModifier: 'private' },
      { name: 'courses', type: 'List<Course>', value: 'new ArrayList<>()', accessModifier: 'private' },
      { name: 'teachers', type: 'List<Teacher>', value: 'new ArrayList<>()', accessModifier: 'private' },
    ],
    methods: [
      { name: 'Department', returnType: 'void', parameters: [{ name: 'name', type: 'String' }], accessModifier: 'public', body: 'this.name = name;' },
      { name: 'addCourse', returnType: 'void', parameters: [{ name: 'course', type: 'Course' }], accessModifier: 'public', body: 'courses.add(course);' },
    ],
  },
  {
    name: 'NotificationService',
    properties: [
      { name: 'channel', type: 'NotificationChannel', value: 'null', accessModifier: 'private' },
    ],
    methods: [
      { name: 'NotificationService', returnType: 'void', parameters: [{ name: 'channel', type: 'NotificationChannel' }], accessModifier: 'public', body: 'this.channel = channel;' },
      { name: 'send', returnType: 'void', parameters: [{ name: 'message', type: 'String' }], accessModifier: 'public', body: 'channel.send(message);' },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════
// CASE STUDY: UNIVERSITY MANAGEMENT SYSTEM
// ═══════════════════════════════════════════════════════════════

export interface DesignRequirement {
  id: string;
  text: string;
  textUrdu: string;
  category: 'entity' | 'behavior' | 'constraint';
}

export interface DesignClass {
  id: string;
  name: string;
  responsibilities: string[];
  responsibilitiesUrdu: string[];
  fields: string[];
  methods: string[];
}

export interface DesignDecision {
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

export interface CaseStudy {
  id: string;
  title: string;
  titleUrdu: string;
  description: string;
  descriptionUrdu: string;
  requirements: DesignRequirement[];
  classes: DesignClass[];
  decisions: DesignDecision[];
}

export const UNIVERSITY_CASE_STUDY: CaseStudy = {
  id: 'case-university',
  title: 'University Management System',
  titleUrdu: 'University Management System',
  description: 'Design a system that manages students, teachers, courses, departments and enrollments.',
  descriptionUrdu: 'Ek system design karo jo students, teachers, courses, departments aur enrollments manage kare.',
  requirements: [
    { id: 'req-1', text: 'Students can enroll in courses', textUrdu: 'Students courses mein enroll kar sakte hain', category: 'behavior' },
    { id: 'req-2', text: 'Teachers teach courses', textUrdu: 'Teachers courses padhate hain', category: 'behavior' },
    { id: 'req-3', text: 'Departments manage courses and teachers', textUrdu: 'Departments courses aur teachers manage karte hain', category: 'behavior' },
    { id: 'req-4', text: 'Students have personal information', textUrdu: 'Students ki personal information hoti hai', category: 'entity' },
    { id: 'req-5', text: 'Courses have credit hours', textUrdu: 'Courses ke credit hours hote hain', category: 'entity' },
    { id: 'req-6', text: 'Enrollment connects students with courses', textUrdu: 'Enrollment students ko courses se connect karta hai', category: 'entity' },
    { id: 'req-7', text: 'The system should support notifications', textUrdu: 'System notifications support kare', category: 'constraint' },
    { id: 'req-8', text: 'The system should be maintainable and extensible', textUrdu: 'System maintainable aur extensible hona chahiye', category: 'constraint' },
  ],
  classes: [
    { id: 'cls-student', name: 'Student', responsibilities: ['store student identity', 'enroll in courses', 'access personal info'], responsibilitiesUrdu: ['student identity store karna', 'courses mein enroll karna', 'personal info access karna'], fields: ['String name', 'int id', 'Department department'], methods: ['enroll(Course)', 'getName()', 'getId()'] },
    { id: 'cls-teacher', name: 'Teacher', responsibilities: ['teach assigned courses', 'store teacher info'], responsibilitiesUrdu: ['assigned courses padhana', 'teacher info store karna'], fields: ['String name', 'String subject'], methods: ['teach(Course)', 'getName()'] },
    { id: 'cls-course', name: 'Course', responsibilities: ['store course details', 'track enrolled students'], responsibilitiesUrdu: ['course details store karna', 'enrolled students track karna'], fields: ['String title', 'int credits', 'Teacher teacher'], methods: ['getTeacher()', 'getCredits()'] },
    { id: 'cls-department', name: 'Department', responsibilities: ['manage courses', 'manage teachers'], responsibilitiesUrdu: ['courses manage karna', 'teachers manage karna'], fields: ['String name', 'List<Course> courses', 'List<Teacher> teachers'], methods: ['addCourse()', 'addTeacher()'] },
    { id: 'cls-enrollment', name: 'Enrollment', responsibilities: ['connect student to course', 'track enrollment status'], responsibilitiesUrdu: ['student ko course se connect karna', 'enrollment status track karna'], fields: ['Student student', 'Course course', 'String status'], methods: ['getStudent()', 'getCourse()'] },
    { id: 'cls-notification', name: 'NotificationService', responsibilities: ['send notifications', 'manage notification channels'], responsibilitiesUrdu: ['notifications bhejna', 'notification channels manage karna'], fields: ['NotificationChannel channel'], methods: ['send(String message)'] },
  ],
  decisions: [
    { id: 'dec-1', title: 'Student → Person', titleUrdu: 'Student → Person', description: 'Is inheritance appropriate between Student and Person?', descriptionUrdu: 'Kya Student aur Person ke beech inheritance appropriate hai?', options: ['Inheritance (IS-A)', 'Composition (HAS-A)', 'Association', 'No relationship'], correctOption: 'Inheritance (IS-A)', explanation: 'Student IS-A Person. Both share common attributes like name and age. Inheritance is appropriate here because Student genuinely is a type of Person.', explanationUrdu: 'Student ek Person hai. Dono mein common attributes hain jaise name aur age. Inheritance yahan appropriate hai kyunki Student genuinely Person ka type hai.', relationshipType: 'inheritance' },
    { id: 'dec-2', title: 'Student → Address', titleUrdu: 'Student → Address', description: 'How should Student relate to Address?', descriptionUrdu: 'Student Address se kaise relate kare?', options: ['Inheritance (IS-A)', 'Composition (HAS-A)', 'Aggregation', 'Dependency'], correctOption: 'Composition (HAS-A)', explanation: 'Student HAS-A Address. Address is a component of Student, not something Student "is a type of". This is composition — the address is strongly owned by the student.', explanationUrdu: 'Student ke paas Address hai. Address Student ka component hai, Student koi "type" nahi hai. Ye composition hai — address student ka strongly owned hai.', relationshipType: 'composition' },
    { id: 'dec-3', title: 'Department → Teacher', titleUrdu: 'Department → Teacher', description: 'What relationship exists between Department and Teacher?', descriptionUrdu: 'Department aur Teacher ke beech kya relationship hai?', options: ['Inheritance', 'Aggregation', 'Composition', 'Dependency'], correctOption: 'Aggregation', explanation: 'Department has Teachers, but Teachers can exist independently of the Department. If the Department closes, the Teacher still exists. This is aggregation — weak ownership with independent part lifetime.', explanationUrdu: 'Department ke paas Teachers hain, lekin Teachers Department ke bina independently exist kar sakte hain. Agar Department band ho to Teacher phir bhi exist karta hai. Ye aggregation hai — weak ownership with independent part lifetime.', relationshipType: 'aggregation' },
    { id: 'dec-4', title: 'Student → Course', titleUrdu: 'Student → Course', description: 'How are Students and Courses connected?', descriptionUrdu: 'Students aur Courses kaise connected hain?', options: ['Direct association', 'Through Enrollment', 'Inheritance', 'Composition'], correctOption: 'Through Enrollment', explanation: 'Students and Courses are connected through Enrollment. This is a many-to-many relationship modeled with an intermediate class. Enrollment captures the enrollment date, grade, etc.', explanationUrdu: 'Students aur Courses Enrollment ke through connected hain. Ye ek many-to-many relationship hai jo intermediate class se model hoti hai. Enrollment enrollment date, grade, etc. capture karta hai.', relationshipType: 'association' },
    { id: 'dec-5', title: 'NotificationService → Channel', titleUrdu: 'NotificationService → Channel', description: 'How should NotificationService use notification channels?', descriptionUrdu: 'NotificationService notification channels ko kaise use kare?', options: ['Concrete class dependency', 'Interface abstraction', 'Static method', 'Inheritance'], correctOption: 'Interface abstraction', explanation: 'Use a NotificationChannel interface. Email, SMS, and Push are implementations. This follows DIP (depend on abstraction) and OCP (extend without modifying).', explanationUrdu: 'NotificationChannel interface use karo. Email, SMS, aur Push implementations hain. Ye DIP follow karta hai (abstraction par depend karo) aur OCP (bina modify kiye extend karo).', relationshipType: 'implementation' },
  ],
};

// ═══════════════════════════════════════════════════════════════
// CASE STUDY: E-COMMERCE SYSTEM
// ═══════════════════════════════════════════════════════════════

export const ECOMMERCE_CASE_STUDY: CaseStudy = {
  id: 'case-ecommerce',
  title: 'E-Commerce System',
  titleUrdu: 'E-Commerce System',
  description: 'Design a system for customers to place orders with different payment methods and notifications.',
  descriptionUrdu: 'Ek system design karo jisme customers alag payment methods aur notifications ke saath orders dein.',
  requirements: [
    { id: 'ec-req-1', text: 'Customers place orders', textUrdu: 'Customers orders dete hain', category: 'behavior' },
    { id: 'ec-req-2', text: 'Orders contain products', textUrdu: 'Orders mein products hote hain', category: 'entity' },
    { id: 'ec-req-3', text: 'Payments can use different methods', textUrdu: 'Payments alag methods use kar sakti hain', category: 'constraint' },
    { id: 'ec-req-4', text: 'Notifications can use different channels', textUrdu: 'Notifications alag channels use kar sakti hain', category: 'constraint' },
    { id: 'ec-req-5', text: 'Products belong to categories', textUrdu: 'Products categories mein hote hain', category: 'entity' },
    { id: 'ec-req-6', text: 'Inventory tracks stock', textUrdu: 'Inventory stock track karta hai', category: 'entity' },
  ],
  classes: [
    { id: 'ec-customer', name: 'Customer', responsibilities: ['place orders', 'manage profile'], responsibilitiesUrdu: ['orders dena', 'profile manage karna'], fields: ['String name', 'String email'], methods: ['placeOrder()', 'getEmail()'] },
    { id: 'ec-product', name: 'Product', responsibilities: ['store product details', 'track price'], responsibilitiesUrdu: ['product details store karna', 'price track karna'], fields: ['String name', 'double price', 'Category category'], methods: ['getPrice()', 'getCategory()'] },
    { id: 'ec-order', name: 'Order', responsibilities: ['manage order items', 'calculate total'], responsibilitiesUrdu: ['order items manage karna', 'total calculate karna'], fields: ['Customer customer', 'List<OrderItem> items', 'PaymentMethod payment'], methods: ['calculateTotal()', 'getItems()'] },
    { id: 'ec-orderitem', name: 'OrderItem', responsibilities: ['link product to quantity'], responsibilitiesUrdu: ['product ko quantity se link karna'], fields: ['Product product', 'int quantity'], methods: ['getSubtotal()'] },
    { id: 'ec-category', name: 'Category', responsibilities: ['group products'], responsibilitiesUrdu: ['products ko group karna'], fields: ['String name'], methods: ['getName()'] },
    { id: 'ec-inventory', name: 'Inventory', responsibilities: ['track stock levels', 'update quantities'], responsibilitiesUrdu: ['stock levels track karna', 'quantities update karna'], fields: ['Map<Product, Integer> stock'], methods: ['getStock()', 'reduceStock()'] },
  ],
  decisions: [
    { id: 'ec-dec-1', title: 'Customer → Order', titleUrdu: 'Customer → Order', description: 'What relationship between Customer and Order?', descriptionUrdu: 'Customer aur Order ke beech kya relationship?', options: ['Inheritance', 'Composition', 'Association', 'Aggregation'], correctOption: 'Association', explanation: 'Customer places Orders. A Customer can have multiple Orders, but orders are not "owned" parts of the customer. This is a directed association.', explanationUrdu: 'Customer Orders deta hai. Customer ke paas multiple Orders ho sakte hain, lekin orders customer ke "owned" parts nahi hain. Ye directed association hai.', relationshipType: 'association' },
    { id: 'ec-dec-2', title: 'Order → OrderItem', titleUrdu: 'Order → OrderItem', description: 'How does Order relate to OrderItem?', descriptionUrdu: 'Order OrderItem se kaise relate karta hai?', options: ['Association', 'Aggregation', 'Composition', 'Dependency'], correctOption: 'Composition', explanation: 'OrderItem is a strongly owned part of Order. If the Order is cancelled, OrderItems lose their meaning in this context. This is composition.', explanationUrdu: 'OrderItem Order ka strongly owned part hai. Agar Order cancel ho to OrderItems is context mein meaning kho dete hain. Ye composition hai.', relationshipType: 'composition' },
    { id: 'ec-dec-3', title: 'PaymentService → Methods', titleUrdu: 'PaymentService → Methods', description: 'How should payment methods be designed?', descriptionUrdu: 'Payment methods kaise design hone chahiye?', options: ['If-else chain', 'Strategy interface', 'Enum switch', 'Abstract class'], correctOption: 'Strategy interface', explanation: 'Use a PaymentMethod interface (Strategy pattern). Card, Cash, Online all implement it. New payment methods can be added without modifying PaymentService. This follows OCP.', explanationUrdu: 'PaymentMethod interface use karo (Strategy pattern). Card, Cash, Online sab implement karte hain. Naye payment methods PaymentService change kiye bina add ho sakte hain. Ye OCP follow karta hai.', relationshipType: 'implementation' },
    { id: 'ec-dec-4', title: 'Product → Category', titleUrdu: 'Product → Category', description: 'How does Product relate to Category?', descriptionUrdu: 'Product Category se kaise relate karta hai?', options: ['Inheritance', 'Composition', 'Aggregation', 'Association'], correctOption: 'Aggregation', explanation: 'Products belong to Categories, but Products can exist independently. If a Category is removed, Products can be reassigned. This is aggregation.', explanationUrdu: 'Products Categories mein hote hain, lekin Products independently exist kar sakte hain. Agar Category hatao to Products reassign ho sakte hain. Ye aggregation hai.', relationshipType: 'aggregation' },
  ],
};

// ═══════════════════════════════════════════════════════════════
// CASE STUDY: HOSPITAL MANAGEMENT
// ═══════════════════════════════════════════════════════════════

export const HOSPITAL_CASE_STUDY: CaseStudy = {
  id: 'case-hospital',
  title: 'Hospital Management System',
  titleUrdu: 'Hospital Management System',
  description: 'Design a system for patients, doctors, appointments and prescriptions.',
  descriptionUrdu: 'Patients, doctors, appointments aur prescriptions ke liye system design karo.',
  requirements: [
    { id: 'hos-req-1', text: 'Patients visit doctors', textUrdu: 'Patients doctors se milte hain', category: 'behavior' },
    { id: 'hos-req-2', text: 'Doctors work in departments', textUrdu: 'Doctors departments mein kaam karte hain', category: 'entity' },
    { id: 'hos-req-3', text: 'Appointments connect patients and doctors', textUrdu: 'Appointments patients aur doctors ko connect karte hain', category: 'entity' },
    { id: 'hos-req-4', text: 'Prescriptions are created for patients', textUrdu: 'Patients ke liye prescriptions banaye jaate hain', category: 'entity' },
    { id: 'hos-req-5', text: 'Notifications can be sent to patients', textUrdu: 'Patients ko notifications bheje ja sakte hain', category: 'constraint' },
  ],
  classes: [
    { id: 'hos-patient', name: 'Patient', responsibilities: ['store patient info', 'book appointments'], responsibilitiesUrdu: ['patient info store karna', 'appointments book karna'], fields: ['String name', 'int age'], methods: ['bookAppointment()', 'getName()'] },
    { id: 'hos-doctor', name: 'Doctor', responsibilities: ['treat patients', 'write prescriptions'], responsibilitiesUrdu: ['patients ka ilaaj karna', 'prescriptions likhna'], fields: ['String name', 'String specialty', 'Department department'], methods: ['treat()', 'writePrescription()'] },
    { id: 'hos-department', name: 'Department', responsibilities: ['manage doctors', 'manage schedule'], responsibilitiesUrdu: ['doctors manage karna', 'schedule manage karna'], fields: ['String name', 'List<Doctor> doctors'], methods: ['addDoctor()'] },
    { id: 'hos-appointment', name: 'Appointment', responsibilities: ['connect patient to doctor', 'track appointment time'], responsibilitiesUrdu: ['patient ko doctor se connect karna', 'appointment time track karna'], fields: ['Patient patient', 'Doctor doctor', 'Date time'], methods: ['getPatient()', 'getDoctor()'] },
    { id: 'hos-prescription', name: 'Prescription', responsibilities: ['record medications', 'link to patient'], responsibilitiesUrdu: ['medications record karna', 'patient se link karna'], fields: ['Patient patient', 'Doctor doctor', 'List<String> medications'], methods: ['getMedications()'] },
    { id: 'hos-notification', name: 'NotificationService', responsibilities: ['send appointment reminders'], responsibilitiesUrdu: ['appointment reminders bhejna'], fields: ['NotificationChannel channel'], methods: ['send()'] },
  ],
  decisions: [
    { id: 'hos-dec-1', title: 'Doctor → Department', titleUrdu: 'Doctor → Department', description: 'What relationship between Doctor and Department?', descriptionUrdu: 'Doctor aur Department ke beech kya relationship?', options: ['Inheritance', 'Aggregation', 'Composition', 'Association'], correctOption: 'Aggregation', explanation: 'Doctors belong to Departments, but can exist independently. If a Department closes, doctors can transfer. This is aggregation.', explanationUrdu: 'Doctors Departments mein hain, lekin independently exist kar sakte hain. Agar Department band ho to doctors transfer ho sakte hain. Ye aggregation hai.', relationshipType: 'aggregation' },
    { id: 'hos-dec-2', title: 'Appointment → Patient/Doctor', titleUrdu: 'Appointment → Patient/Doctor', description: 'How does Appointment connect Patient and Doctor?', descriptionUrdu: 'Appointment Patient aur Doctor ko kaise connect karta hai?', options: ['Inheritance', 'Direct dependency', 'Association', 'Composition'], correctOption: 'Association', explanation: 'Appointment is an association class that links Patient and Doctor. It captures the relationship event (time, date) and exists independently of both.', explanationUrdu: 'Appointment ek association class hai jo Patient aur Doctor ko link karti hai. Ye relationship event (time, date) capture karti hai aur dono se independently exist karti hai.', relationshipType: 'association' },
    { id: 'hos-dec-3', title: 'Prescription → Patient', titleUrdu: 'Prescription → Patient', description: 'How does Prescription relate to Patient?', descriptionUrdu: 'Prescription Patient se kaise relate karta hai?', options: ['Inheritance', 'Composition', 'Aggregation', 'Dependency'], correctOption: 'Aggregation', explanation: 'Prescription is created for a Patient but has independent existence as a medical record. The Patient does not "own" the prescription lifecycle.', explanationUrdu: 'Prescription Patient ke liye banaya jaata hai lekin medical record ke roop mein independent existence hai. Patient prescription ki lifecycle "own" nahi karta.', relationshipType: 'aggregation' },
    { id: 'hos-dec-4', title: 'Doctor → Prescription', titleUrdu: 'Doctor → Prescription', description: 'How does Doctor relate to Prescription?', descriptionUrdu: 'Doctor Prescription se kaise relate karta hai?', options: ['Inheritance', 'Composition', 'Association', 'Dependency'], correctOption: 'Association', explanation: 'Doctor writes Prescriptions. This is a directed association — Doctor creates them but does not own their lifecycle.', explanationUrdu: 'Doctor Prescriptions likhta hai. Ye directed association hai — Doctor inhein banata hai lekin inki lifecycle own nahi karta.', relationshipType: 'association' },
  ],
};

// ═══════════════════════════════════════════════════════════════
// DESIGN STEPS — Full Design Process
// ═══════════════════════════════════════════════════════════════

export const DESIGN_LAB_STEPS: ExecutionStep[] = [
  // ── STEP 1: REQUIREMENTS ──
  {
    id: 1, codeLine: 1,
    description: 'Stage 01: Read the requirements. Understand what the system needs to do.',
    descriptionUrdu: 'Stage 01: Requirements padho. Samjho ke system ko kya karna hai.',
    codeAction: { type: 'DECLARE_CLASS', sourceLine: 1, className: 'Requirements' },
    worldAction: { type: 'SHOW_DESIGN_STAGE', message: 'Stage 01: REQUIREMENTS — understand the problem before writing code' },
    callout: { type: 'concept', title: 'Step 1: Requirements', message: 'Before writing any code, understand the problem. Read requirements carefully. Identify what the system must do, what entities exist, and what constraints apply.', messageUrdu: 'Koi code likhne se pehle problem ko samjho. Requirements gaur se padho. Identify karo ke system ko kya karna hai, kaun se entities hain, aur kaun se constraints apply hote hain.' },
  },
  // ── STEP 2: IDENTIFY OBJECTS ──
  {
    id: 2, codeLine: 5,
    description: 'Stage 02: Identify objects — extract nouns from requirements that represent real entities.',
    descriptionUrdu: 'Stage 02: Objects identify karo — requirements se nouns nikalo jo real entities represent karein.',
    codeAction: { type: 'IDENTIFY_OBJECTS', sourceLine: 5, className: 'Student' },
    worldAction: { type: 'SHOW_REQUIREMENT_PANEL', message: 'Objects: Student, Teacher, Course, Department, Enrollment' },
    callout: { type: 'tip', title: 'Object Identification', message: 'Look for nouns in requirements: Student, Teacher, Course, Department. These are potential objects. Verbs like "enroll", "teach" become methods/behaviors.', messageUrdu: 'Requirements mein nouns dhundho: Student, Teacher, Course, Department. Ye potential objects hain. Verbs jaise "enroll", "teach" methods/behaviors ban jaate hain.' },
  },
  // ── STEP 3: IDENTIFY CLASSES ──
  {
    id: 3, codeLine: 10,
    description: 'Stage 03: Identify classes — define what each class is responsible for.',
    descriptionUrdu: 'Stage 03: Classes identify karo — define karo ke har class kya responsible hai.',
    codeAction: { type: 'IDENTIFY_CLASSES', sourceLine: 10, className: 'Student' },
    worldAction: { type: 'SHOW_CLASS_DIAGRAM', message: 'Classes: Student, Teacher, Course, Department, Enrollment, NotificationService' },
    callout: { type: 'concept', title: 'Class Identification', message: 'Each class should have a clear, focused responsibility. Student manages student data. Course manages course data. NotificationService handles notifications. Keep responsibilities separated.', messageUrdu: 'Har class ki clear, focused responsibility honi chahiye. Student student data manage karta hai. Course course data manage karta hai. NotificationService notifications handle karta hai. Responsibilities alag rakho.' },
  },
  // ── STEP 4: ASSIGN RESPONSIBILITIES ──
  {
    id: 4, codeLine: 15,
    description: 'Stage 04: Assign responsibilities — which class handles which behavior?',
    descriptionUrdu: 'Stage 04: Responsibilities assign karo — kaun si class kaun sa behavior handle karti hai?',
    codeAction: { type: 'ASSIGN_RESPONSIBILITIES', sourceLine: 15, className: 'Student', methodName: 'enroll' },
    worldAction: { type: 'SHOW_RESPONSIBILITY_MAP', message: 'Student: enroll | Teacher: teach | Course: manage credits | NotificationService: send' },
    callout: { type: 'concept', title: 'Responsibility Assignment', message: 'Each responsibility should belong to exactly one class. "enroll" belongs to Student. "teach" belongs to Teacher. If a class has too many unrelated responsibilities, it violates SRP.', messageUrdu: 'Har responsibility ek hi class ki honi chahiye. "enroll" Student ki hai. "teach" Teacher ki hai. Agar class ke paas bohot saari unrelated responsibilities hain to ye SRP violate karta hai.' },
  },
  // ── STEP 5: DESIGN RELATIONSHIPS ──
  {
    id: 5, codeLine: 20,
    description: 'Stage 05: Design relationships — connect classes with appropriate OOP relationships.',
    descriptionUrdu: 'Stage 05: Relationships design karo — classes ko sahi OOP relationships se connect karo.',
    codeAction: { type: 'DESIGN_RELATIONSHIPS', sourceLine: 20, className: 'Student', targetClassName: 'Course' },
    worldAction: { type: 'SHOW_CLASS_DIAGRAM', message: 'Student -- Enrollment -- Course | Teacher -- Course | Department <>-- Teacher' },
    callout: { type: 'concept', title: 'Relationship Design', message: 'Choose the right relationship for each connection. Student-Course: through Enrollment (association). Department-Teacher: aggregation (independent parts). Student-Address: composition (strongly owned).', messageUrdu: 'Har connection ke liye sahi relationship chuno. Student-Course: Enrollment ke through (association). Department-Teacher: aggregation (independent parts). Student-Address: composition (strongly owned).' },
  },
  // ── STEP 6: APPLY ENCAPSULATION ──
  {
    id: 6, codeLine: 25,
    description: 'Stage 06: Apply encapsulation — protect internal state with private fields and public methods.',
    descriptionUrdu: 'Stage 06: Encapsulation apply karo — private fields aur public methods se internal state protect karo.',
    codeAction: { type: 'APPLY_ENCAPSULATION', sourceLine: 25, className: 'Student' },
    worldAction: { type: 'SHOW_INFO', message: 'Encapsulation: private fields, public getters/setters, validation in setters' },
    callout: { type: 'remember', title: 'Encapsulation', message: 'Fields should be private. Access through public methods (getters/setters). Add validation in setters. This protects the object from invalid state.', messageUrdu: 'Fields private honi chahiye. Public methods ke through access karo (getters/setters). Setters mein validation add karo. Ye object ko invalid state se protect karta hai.' },
  },
  // ── STEP 7: APPLY ABSTRACTION ──
  {
    id: 7, codeLine: 30,
    description: 'Stage 07: Apply abstraction — hide complex details behind simple interfaces.',
    descriptionUrdu: 'Stage 07: Abstraction apply karo — complex details ko simple interfaces ke peeche chhupao.',
    codeAction: { type: 'APPLY_ABSTRACTION', sourceLine: 30, className: 'NotificationChannel' },
    worldAction: { type: 'SHOW_ABSTRACTION_LAYER', message: 'Abstraction: NotificationChannel interface hides Email/SMS/Push details' },
    callout: { type: 'concept', title: 'Abstraction', message: 'Use interfaces to hide implementation details. NotificationChannel.hide() — the caller does not need to know HOW the notification is sent. Email, SMS, Push are hidden behind the interface.', messageUrdu: 'Interfaces use karo implementation details chhupane ke liye. NotificationChannel.send() — caller ko pata nahi chalta ke notification Kaise bheja gaya. Email, SMS, Push interface ke peeche chhupi hain.' },
  },
  // ── STEP 8: APPLY POLYMORPHISM ──
  {
    id: 8, codeLine: 35,
    description: 'Stage 08: Apply polymorphism — use interfaces for interchangeable behaviors.',
    descriptionUrdu: 'Stage 08: Polymorphism apply karo — interchangeable behaviors ke liye interfaces use karo.',
    codeAction: { type: 'APPLY_POLYMORPHISM', sourceLine: 35, className: 'NotificationChannel' },
    worldAction: { type: 'SHOW_POLYMORPHIC_DISPATCH', message: 'Polymorphism: channel.send() dispatches to Email/SMS/Push at runtime' },
    callout: { type: 'concept', title: 'Polymorphism', message: 'NotificationChannel channel can be EmailNotification, SMSNotification, or PushNotification. At runtime, the correct implementation is called. This makes the system extensible.', messageUrdu: 'NotificationChannel channel EmailNotification, SMSNotification, ya PushNotification ho sakta hai. Runtime pe sahi implementation call hoti hai. Ye system ko extensible banata hai.' },
  },
  // ── STEP 9: SOLID REVIEW ──
  {
    id: 9, codeLine: 40,
    description: 'Stage 09: SOLID review — check if the design follows all five SOLID principles.',
    descriptionUrdu: 'Stage 09: SOLID review — check karo ke design paanchon SOLID principles follow karta hai.',
    codeAction: { type: 'REVIEW_ARCHITECTURE', sourceLine: 40, className: 'SOLID' },
    worldAction: { type: 'SHOW_ARCHITECTURE_SCORE', message: 'SOLID Review: SRP ✓ OCP ✓ LSP ✓ ISP ✓ DIP ✓' },
    callout: { type: 'remember', title: 'SOLID Review', message: 'Review your design against SOLID: SRP (one responsibility per class), OCP (extend without modification), LSP (valid substitution), ISP (small interfaces), DIP (depend on abstractions).', messageUrdu: 'Apne design ko SOLID se review karo: SRP (har class ki ek responsibility), OCP (bina modification ke extend karo), LSP (valid substitution), ISP (chhote interfaces), DIP (abstractions par depend karo).' },
  },
  // ── STEP 10: REFACTOR ──
  {
    id: 10, codeLine: 45,
    description: 'Stage 10: Refactor — improve the design by reducing coupling and increasing cohesion.',
    descriptionUrdu: 'Stage 10: Refactor — coupling kam karke aur cohesion badha ke design improve karo.',
    codeAction: { type: 'REFACTOR_CLASS', sourceLine: 45, className: 'UniversitySystem' },
    worldAction: { type: 'SHOW_REFACTORING_FLOW', message: 'Refactor: extract classes, introduce interfaces, reduce dependencies' },
    callout: { type: 'tip', title: 'Refactoring', message: 'Refactoring means improving code structure without changing behavior. Extract large classes into smaller ones. Replace concrete dependencies with interfaces. Apply the principle of least knowledge.', messageUrdu: 'Refactoring ka matlab hai code structure improve karna bina behavior badle. Bade classes ko chhote classes mein todo. Concrete dependencies ko interfaces se badlo. Least knowledge principle apply karo.' },
  },
  // ── STEP 11: MASTER ──
  {
    id: 11, codeLine: 50,
    description: 'Stage 11: Master — the design is complete. Review the final architecture.',
    descriptionUrdu: 'Stage 11: Master — design complete hai. Final architecture review karo.',
    codeAction: { type: 'DECLARE_CLASS', sourceLine: 50, className: 'MasteredDesign' },
    worldAction: { type: 'SHOW_FINAL_REVIEW', message: 'DESIGN COMPLETE — all stages passed, architecture is clean and maintainable' },
    callout: { type: 'concept', title: 'Design Mastered', message: 'You have completed the full design process: Requirements → Objects → Classes → Responsibilities → Relationships → Encapsulation → Abstraction → Polymorphism → SOLID → Refactor → Master.', messageUrdu: 'Aapne pura design process complete kar liya hai: Requirements → Objects → Classes → Responsibilities → Relationships → Encapsulation → Abstraction → Polymorphism → SOLID → Refactor → Master.' },
  },
];

// ═══════════════════════════════════════════════════════════════
// MISSIONS
// ═══════════════════════════════════════════════════════════════

export const DESIGN_LAB_MISSION: Mission = {
  id: 'mission-design-001',
  title: 'MISSION — Advanced OOP Design Lab',
  titleUrdu: 'MISSION — Advanced OOP Design Lab',
  description: 'Transform real-world requirements into maintainable OOP systems through the complete design process.',
  descriptionUrdu: 'Real-world requirements ko complete design process ke through maintainable OOP systems mein transform karo.',
  status: 'active',
  objectives: [
    { id: 'dl-1', description: 'Read and understand requirements', descriptionUrdu: 'Requirements padho aur samjho', completed: false, type: 'identify-design-classes', targetCount: 1, currentCount: 0 },
    { id: 'dl-2', description: 'Identify objects from requirements', descriptionUrdu: 'Requirements se objects identify karo', completed: false, type: 'identify-design-classes', targetCount: 1, currentCount: 0 },
    { id: 'dl-3', description: 'Identify classes and responsibilities', descriptionUrdu: 'Classes aur responsibilities identify karo', completed: false, type: 'assign-responsibilities', targetCount: 1, currentCount: 0 },
    { id: 'dl-4', description: 'Design relationships between classes', descriptionUrdu: 'Classes ke beech relationships design karo', completed: false, type: 'design-system-relationships', targetCount: 1, currentCount: 0 },
    { id: 'dl-5', description: 'Apply encapsulation to protect state', descriptionUrdu: 'State protect karne ke liye encapsulation apply karo', completed: false, type: 'apply-encapsulation', targetCount: 1, currentCount: 0 },
    { id: 'dl-6', description: 'Apply abstraction with interfaces', descriptionUrdu: 'Interfaces se abstraction apply karo', completed: false, type: 'apply-abstraction-design', targetCount: 1, currentCount: 0 },
    { id: 'dl-7', description: 'Apply polymorphism for extensibility', descriptionUrdu: 'Extensibility ke liye polymorphism apply karo', completed: false, type: 'apply-polymorphism-design', targetCount: 1, currentCount: 0 },
    { id: 'dl-8', description: 'Review SOLID principles', descriptionUrdu: 'SOLID principles review karo', completed: false, type: 'apply-srp', targetCount: 1, currentCount: 0 },
    { id: 'dl-9', description: 'Refactor the legacy architecture', descriptionUrdu: 'Legacy architecture refactor karo', completed: false, type: 'refactor-legacy', targetCount: 1, currentCount: 0 },
    { id: 'dl-10', description: 'Complete the boss challenge', descriptionUrdu: 'Boss challenge complete karo', completed: false, type: 'solve-boss-challenge', targetCount: 1, currentCount: 0 },
  ],
  xpReward: 300,
};

// ═══════════════════════════════════════════════════════════════
// ADVANCED MISTAKES
// ═══════════════════════════════════════════════════════════════

export interface DesignMistake {
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

export const DESIGN_MISTAKES: DesignMistake[] = [
  {
    id: 'dm-01',
    title: 'Incorrect Inheritance',
    titleUrdu: 'Galat Inheritance',
    badCode: 'class Student extends Address {\n    String name;\n}',
    question: 'What is wrong with this design?',
    questionUrdu: 'Is design mein kya galat hai?',
    answer: 'Incorrect IS-A relationship. A Student is NOT a type of Address. Student HAS-A Address (composition). Inheritance should only be used when the subclass genuinely IS-A type of the parent.',
    answerUrdu: 'Galat IS-A relationship. Student Address ka type NAHI hai. Student ke paas Address hai (composition). Inheritance sirf tab use karo jab subclass genuinely parent ka type ho.',
    principle: 'Inheritance misuse',
  },
  {
    id: 'dm-02',
    title: 'God Class',
    titleUrdu: 'God Class',
    badCode: 'class University {\n    void saveDatabase() {}\n    void sendEmail() {}\n    void calculateFees() {}\n    void generateReport() {}\n    void authenticateUser() {}\n}',
    question: 'Which OOP principle is violated?',
    questionUrdu: 'Kaun sa OOP principle violate ho raha hai?',
    answer: 'SRP (Single Responsibility Principle). University has too many unrelated responsibilities. Each responsibility should be in its own class: UniversityRepository, EmailService, FeeService, ReportService, AuthService.',
    answerUrdu: 'SRP (Single Responsibility Principle). University ke paas bohot saari unrelated responsibilities hain. Har responsibility apni class mein honi chahiye: UniversityRepository, EmailService, FeeService, ReportService, AuthService.',
    principle: 'SRP',
  },
  {
    id: 'dm-03',
    title: 'Concrete Dependency',
    titleUrdu: 'Concrete Dependency',
    badCode: 'class PaymentService {\n    CardPayment payment = new CardPayment();\n}',
    question: 'What happens if another payment method is required?',
    questionUrdu: 'Agar doosra payment method chahiye to kya hoga?',
    answer: 'Tight coupling / DIP violation. PaymentService is locked to CardPayment. Use a PaymentMethod interface. Inject the concrete implementation via constructor. This follows DIP and allows OCP.',
    answerUrdu: 'Tight coupling / DIP violation. PaymentService CardPayment se locked hai. PaymentMethod interface use karo. Concrete implementation constructor ke through inject karo. Ye DIP follow karta hai aur OCP allow karta hai.',
    principle: 'DIP',
  },
  {
    id: 'dm-04',
    title: 'Fat Interface',
    titleUrdu: 'Fat Interface',
    badCode: 'interface Worker {\n    void work();\n    void eat();\n    void sleep();\n    void attendMeeting();\n}',
    question: 'What design problem exists?',
    questionUrdu: 'Kya design problem hai?',
    answer: 'ISP violation. A Robot implementing Worker is forced to implement eat(), sleep(), and attendMeeting() which it does not need. Split into smaller interfaces: Workable, Eatable, Sleepable.',
    answerUrdu: 'ISP violation. Robot jo Worker implement karta hai use eat(), sleep(), aur attendMeeting() implement karne par majboor kiya jaata hai jo use zaroorat nahi. Chhote interfaces mein todo: Workable, Eatable, Sleepable.',
    principle: 'ISP',
  },
  {
    id: 'dm-05',
    title: 'Leaky Abstraction',
    titleUrdu: 'Leaky Abstraction',
    badCode: 'class NotificationService {\n    EmailSender sender = new EmailSender();\n    void send(String msg) {\n        sender.sendViaSMTP(msg);\n    }\n}',
    question: 'What design problem does this create?',
    questionUrdu: 'Ye kya design problem create karta hai?',
    answer: 'Tight coupling to concrete implementation. NotificationService depends on EmailSender\'s specific method (sendViaSMTP). Use a NotificationChannel interface. The service should not know about SMTP details.',
    answerUrdu: 'Concrete implementation se tight coupling. NotificationService EmailSender ke specific method (sendViaSMTP) par depend karta hai. NotificationChannel interface use karo. Service ko SMTP details ke baare mein pata nahi hona chahiye.',
    principle: 'DIP',
  },
];

// ═══════════════════════════════════════════════════════════════
// BOSS CHALLENGE QUESTIONS
// ═══════════════════════════════════════════════════════════════

export interface BossChallengeQuestion {
  id: string;
  stage: string;
  question: string;
  questionUrdu: string;
  options: string[];
  correctOption: string;
  explanation: string;
  explanationUrdu: string;
}

export const BOSS_CHALLENGE_QUESTIONS: BossChallengeQuestion[] = [
  { id: 'boss-1', stage: 'Objects', question: 'From requirements: "Students enroll in courses". What are the objects?', questionUrdu: 'Requirements se: "Students courses mein enroll karte hain". Objects kya hain?', options: ['Student and enroll', 'Student and Course', 'Enroll and Course', 'Student, Course, and Enrollment'], correctOption: 'Student, Course, and Enrollment', explanation: 'Student and Course are entities. Enrollment is also an entity that connects them.', explanationUrdu: 'Student aur Course entities hain. Enrollment bhi entity hai jo inhein connect karti hai.' },
  { id: 'boss-2', stage: 'Responsibilities', question: 'Which class should handle "send notification"?', questionUrdu: 'Kaun si class "send notification" handle kare?', options: ['Student', 'Course', 'NotificationService', 'Department'], correctOption: 'NotificationService', explanation: 'Sending notifications is the responsibility of NotificationService, not Student or Course.', explanationUrdu: 'Notifications bhejna NotificationService ki responsibility hai, Student ya Course ki nahi.' },
  { id: 'boss-3', stage: 'Relationships', question: 'A Student HAS-A Address. Which relationship?', questionUrdu: 'Student ke paas Address hai. Kaun si relationship?', options: ['Inheritance', 'Aggregation', 'Composition', 'Association'], correctOption: 'Composition', explanation: 'Address is strongly owned by Student. It does not exist independently in this model.', explanationUrdu: 'Address Student ka strongly owned hai. Ye is model mein independently exist nahi karta.' },
  { id: 'boss-4', stage: 'Encapsulation', question: 'How should Student.name be accessed?', questionUrdu: 'Student.name kaise access hona chahiye?', options: ['public String name', 'private name + getName()', 'protected name', 'static name'], correctOption: 'private name + getName()', explanation: 'Private field with public getter provides controlled access while protecting internal state.', explanationUrdu: 'Private field with public getter controlled access deta hai while internal state protect karta hai.' },
  { id: 'boss-5', stage: 'Polymorphism', question: 'You need Email, SMS, and Push notifications. What OOP concept helps?', questionUrdu: 'Aapko Email, SMS, aur Push notifications chahiye. Kaun sa OOP concept madad kare?', options: ['Inheritance only', 'Interface + polymorphism', 'Static methods', 'Single class with if-else'], correctOption: 'Interface + polymorphism', explanation: 'NotificationChannel interface with multiple implementations. Polymorphism allows swapping implementations at runtime.', explanationUrdu: 'NotificationChannel interface with multiple implementations. Polymorphism implementations ko runtime pe swap karne deta hai.' },
  { id: 'boss-6', stage: 'SOLID', question: 'A class handles database, email, and reports. Which principle is violated?', questionUrdu: 'Ek class database, email, aur reports handle karti hai. Kaun sa principle violate hai?', options: ['OCP', 'LSP', 'SRP', 'ISP'], correctOption: 'SRP', explanation: 'SRP: one class should have one reason to change. Three unrelated responsibilities violate this.', explanationUrdu: 'SRP: ek class ke paas EK change ki wajah honi chahiye. Teen unrelated responsibilities ise violate karti hain.' },
  { id: 'boss-7', stage: 'Refactoring', question: 'What does refactoring improve?', questionUrdu: 'Refactoring kya improve karta hai?', options: ['Functionality', 'Code structure without changing behavior', 'Performance', 'UI design'], correctOption: 'Code structure without changing behavior', explanation: 'Refactoring improves code structure and readability without changing external behavior.', explanationUrdu: 'Refactoring code structure aur readability improve karta hai bina external behavior badle.' },
  { id: 'boss-8', stage: 'Design', question: 'When should you prefer composition over inheritance?', questionUrdu: 'Kab composition ko inheritance par prefer karna chahiye?', options: ['Always', 'When you need code reuse', 'When the subclass is not genuinely a type of parent', 'Never'], correctOption: 'When the subclass is not genuinely a type of parent', explanation: 'Use composition when the relationship is HAS-A, not IS-A. Inheritance should represent genuine type hierarchy.', explanationUrdu: 'Composition tab use karo jab relationship HAS-A ho, IS-A nahi. Inheritance genuine type hierarchy represent kare.' },
];

// ═══════════════════════════════════════════════════════════════
// DESIGN PATTERN PREVIEWS
// ═══════════════════════════════════════════════════════════════

export interface DesignPatternPreview {
  id: string;
  name: string;
  nameUrdu: string;
  purpose: string;
  purposeUrdu: string;
  example: string;
  exampleUrdu: string;
}

export const DESIGN_PATTERNS: DesignPatternPreview[] = [
  {
    id: 'pattern-strategy',
    name: 'Strategy Pattern',
    nameUrdu: 'Strategy Pattern',
    purpose: 'Strategy allows interchangeable behaviors. Different implementations of the same interface can be swapped at runtime.',
    purposeUrdu: 'Strategy interchangeable behaviors allow karta hai. Same interface ke different implementations runtime pe swap ho sakte hain.',
    example: 'PaymentMethod interface with CardPayment, CashPayment, OnlinePayment implementations.',
    exampleUrdu: 'PaymentMethod interface with CardPayment, CashPayment, OnlinePayment implementations.',
  },
  {
    id: 'pattern-factory',
    name: 'Factory Pattern',
    nameUrdu: 'Factory Pattern',
    purpose: 'Factory centralizes object creation decisions. The client does not need to know which concrete class to instantiate.',
    purposeUrdu: 'Factory object creation decisions centralize karta hai. Client ko pata nahi chalta ke kaun si concrete class instantiate karni hai.',
    example: 'NotificationFactory creates EmailNotification, SMSNotification, or PushNotification based on configuration.',
    exampleUrdu: 'NotificationFactory configuration ke basis pe EmailNotification, SMSNotification, ya PushNotification banata hai.',
  },
  {
    id: 'pattern-observer',
    name: 'Observer Pattern',
    nameUrdu: 'Observer Pattern',
    purpose: 'Observer allows objects to subscribe to state changes. When the subject changes, all observers are notified automatically.',
    purposeUrdu: 'Observer objects ko state changes subscribe karne deta hai. Jab subject badle to sab observers automatically notify ho jaate hain.',
    example: 'Course is the subject. Students are observers. When course schedule changes, all enrolled students are notified.',
    exampleUrdu: 'Course subject hai. Students observers hain. Jab course schedule badle to sab enrolled students notify ho jaate hain.',
  },
];
