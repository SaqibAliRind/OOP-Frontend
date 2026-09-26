import { createDefaultSteps } from '@/types/oopLab';
import type { WorldConfig, WorldId, ClassBlueprint, ExecutionStep, Mission } from '@/types/oopLab';

// ═══════════════════════════════════════════════════════════════
// WORLD 01: CLASS & OBJECT LAB (existing - preserved)
// ═══════════════════════════════════════════════════════════════

const CLASS_OBJECT_STEPS: ExecutionStep[] = createDefaultSteps();

const CLASS_OBJECT_MISSION: Mission = {
  id: 'mission-co-001',
  title: 'MISSION — Class to Object',
  titleUrdu: 'MISSION — Class se Object',
  description: 'Create 3 Student objects with different names and ages.',
    descriptionUrdu: '3 Student objects banao alag-alag names aur ages ke saath.',
    status: 'active',
    objectives: [
      { id: 'co-1', description: 'Create first Student (s1)', descriptionUrdu: 'Pehla Student banao', completed: false, type: 'create-object', targetClassName: 'Student', targetCount: 1, currentCount: 0 },
      { id: 'co-2', description: 'Create second Student (s2)', descriptionUrdu: 'Doosra Student banao', completed: false, type: 'create-object', targetClassName: 'Student', targetCount: 1, currentCount: 0 },
      { id: 'co-3', description: 'Create third Student (s3)', descriptionUrdu: 'Teesra Student banao', completed: false, type: 'create-object', targetClassName: 'Student', targetCount: 1, currentCount: 0 },
    ],
    xpReward: 50,
};

// ═══════════════════════════════════════════════════════════════
// WORLD 02: CONSTRUCTOR FACTORY
// ═══════════════════════════════════════════════════════════════

const STUDENT_WITH_CONSTRUCTOR: ClassBlueprint = {
  name: 'Student',
  properties: [
    { name: 'name', type: 'String', value: '""', accessModifier: 'private' },
    { name: 'age', type: 'int', value: '0', accessModifier: 'private' },
  ],
  methods: [
    { name: 'Student', returnType: 'void', parameters: [{ name: 'name', type: 'String' }, { name: 'age', type: 'int' }], accessModifier: 'public', body: 'this.name = name; this.age = age;' },
    { name: 'display', returnType: 'void', parameters: [], accessModifier: 'public', body: 'System.out.println(name + ", " + age);' },
  ],
};

const CONSTRUCTOR_STEPS: ExecutionStep[] = [
  {
    id: 1, codeLine: 1,
    description: 'Class definition loaded. Student has a parameterized constructor.',
    descriptionUrdu: 'Class definition load hui. Student mein parameterized constructor hai.',
    codeAction: { type: 'DECLARE_CLASS', sourceLine: 1, className: 'Student' },
    worldAction: { type: 'SHOW_CLASS_BLUEPRINT', className: 'Student' },
    callout: { type: 'concept', title: 'Constructor', message: 'A constructor is a special member used to initialize a newly created object. It has the same name as the class and no return type.', messageUrdu: 'Constructor ek special member hai jo naye object ko initialize karne ke liye use hota hai. Iska naam class ka naam hota hai aur iska koi return type nahi hota.' },
  },
  {
    id: 2, codeLine: 14,
    description: 'Reference variable s1 is declared. No object exists yet.',
    descriptionUrdu: 'Reference variable s1 declare hua. Abhi koi object nahi hai.',
    codeAction: { type: 'DECLARE_VARIABLE', sourceLine: 14, className: 'Student', variableName: 's1' },
    worldAction: { type: 'SHOW_INFO', message: 'Variable s1 declared — awaiting object creation' },
    callout: { type: 'what', title: 'Reference Variable', message: 's1 is a reference. It does not yet point to any object.', messageUrdu: 's1 ek reference hai. Ye abhi kisi object ko point nahi karta.' },
  },
  {
    id: 3, codeLine: 15,
    description: '"new" allocates memory. Constructor is about to be invoked.',
    descriptionUrdu: '"new" memory allocate karta hai. Constructor abhi call hone wala hai.',
    codeAction: { type: 'CREATE_OBJECT', sourceLine: 15, className: 'Student', variableName: 's1', objectId: 'student-001' },
    worldAction: { type: 'SPAWN_OBJECT', objectId: 'student-001', className: 'Student', position: [-3, 0.5, 0] },
    callout: { type: 'remember', title: 'new triggers Constructor', message: 'The "new" keyword triggers the constructor. Memory is allocated and the constructor initializes the object.', messageUrdu: '"new" keyword constructor ko trigger karta hai. Memory allocate hoti hai aur constructor object ko initialize karta hai.' },
  },
  {
    id: 4, codeLine: 15,
    description: 'Constructor receives "Ali" → name = "Ali"',
    descriptionUrdu: 'Constructor "Ali" receive karta hai → name = "Ali"',
    codeAction: { type: 'SET_PROPERTY', sourceLine: 15, objectId: 'student-001', propertyName: 'name', propertyValue: '"Ali"' },
    worldAction: { type: 'UPDATE_PROPERTY', objectId: 'student-001', propertyName: 'name', propertyValue: '"Ali"' },
    callout: { type: 'concept', title: 'Parameter Initialization', message: 'The constructor parameter "name" is assigned to the object field "this.name". The "this" keyword distinguishes the field from the parameter.', messageUrdu: 'Constructor parameter "name" ko object field "this.name" mein assign kiya jata hai. "this" keyword field aur parameter mein farq karta hai.' },
  },
  {
    id: 5, codeLine: 15,
    description: 'Constructor receives 20 → age = 20',
    descriptionUrdu: 'Constructor 20 receive karta hai → age = 20',
    codeAction: { type: 'SET_PROPERTY', sourceLine: 15, objectId: 'student-001', propertyName: 'age', propertyValue: '20' },
    worldAction: { type: 'UPDATE_PROPERTY', objectId: 'student-001', propertyName: 'age', propertyValue: '20' },
    callout: { type: 'tip', title: 'Constructor completes', message: 'After all parameters are assigned, the constructor completes and the object is fully initialized.', messageUrdu: 'Jab sab parameters assign ho jate hain, constructor complete hota hai aur object fully initialize ho jata hai.' },
  },
  {
    id: 6, codeLine: 16,
    description: 'Call display() to verify object state.',
    descriptionUrdu: 'display() call karke object state verify karte hain.',
    codeAction: { type: 'CALL_METHOD', sourceLine: 16, objectId: 'student-001', methodName: 'display' },
    worldAction: { type: 'PLAY_METHOD_ANIMATION', objectId: 'student-001', methodName: 'display' },
    callout: { type: 'concept', title: 'Object Ready', message: 'The object is now fully initialized and ready to use. All fields have their values set by the constructor.', messageUrdu: 'Object ab fully initialize ho chuka hai aur use ke liye ready hai.' },
  },
];

const CONSTRUCTOR_MISSION: Mission = {
  id: 'mission-const-001',
  title: 'MISSION — Initialize the Students',
  titleUrdu: 'MISSION — Students ko Initialize karo',
  description: 'Create 3 Student objects using the constructor with different arguments.',
  descriptionUrdu: 'Constructor se 3 Student objects banao alag arguments ke saath.',
  status: 'active',
  objectives: [
    { id: 'c-1', description: 'Create s1 = new Student("Ali", 20)', descriptionUrdu: 's1 banao', completed: false, type: 'create-object', targetClassName: 'Student', targetCount: 1, currentCount: 0 },
    { id: 'c-2', description: 'Create s2 = new Student("Sara", 21)', descriptionUrdu: 's2 banao', completed: false, type: 'create-object', targetClassName: 'Student', targetCount: 1, currentCount: 0 },
    { id: 'c-3', description: 'Create s3 = new Student("Hamza", 19)', descriptionUrdu: 's3 banao', completed: false, type: 'create-object', targetClassName: 'Student', targetCount: 1, currentCount: 0 },
  ],
  xpReward: 50,
};

// ═══════════════════════════════════════════════════════════════
// WORLD 03: ENCAPSULATION SECURITY LAB
// ═══════════════════════════════════════════════════════════════

const BANK_ACCOUNT_CLASS: ClassBlueprint = {
  name: 'BankAccount',
  properties: [
    { name: 'balance', type: 'double', value: '0.0', accessModifier: 'private' },
    { name: 'owner', type: 'String', value: '""', accessModifier: 'private' },
  ],
  methods: [
    { name: 'BankAccount', returnType: 'void', parameters: [{ name: 'owner', type: 'String' }, { name: 'balance', type: 'double' }], accessModifier: 'public', body: 'this.owner = owner; this.balance = balance;' },
    { name: 'deposit', returnType: 'void', parameters: [{ name: 'amount', type: 'double' }], accessModifier: 'public', body: 'if (amount > 0) balance += amount;' },
    { name: 'getBalance', returnType: 'double', parameters: [], accessModifier: 'public', body: 'return balance;' },
    { name: 'getOwner', returnType: 'String', parameters: [], accessModifier: 'public', body: 'return owner;' },
  ],
};

const ENCAPSULATION_STEPS: ExecutionStep[] = [
  {
    id: 1, codeLine: 1,
    description: 'BankAccount class loaded. Notice: balance is PRIVATE.',
    descriptionUrdu: 'BankAccount class load hui. Dekho: balance PRIVATE hai.',
    codeAction: { type: 'DECLARE_CLASS', sourceLine: 1, className: 'BankAccount' },
    worldAction: { type: 'SHOW_CLASS_BLUEPRINT', className: 'BankAccount' },
    callout: { type: 'concept', title: 'Encapsulation', message: 'Encapsulation bundles data with methods and controls access. Private fields cannot be accessed directly from outside the class.', messageUrdu: 'Encapsulation data ko methods ke saath bundle karta hai aur access control karta hai. Private fields class ke bahar se directly access nahi ho sakte.' },
  },
  {
    id: 2, codeLine: 12,
    description: 'Create BankAccount object using the constructor.',
    descriptionUrdu: 'Constructor se BankAccount object banao.',
    codeAction: { type: 'CREATE_OBJECT', sourceLine: 12, className: 'BankAccount', variableName: 'account', objectId: 'acc-001' },
    worldAction: { type: 'SPAWN_OBJECT', objectId: 'acc-001', className: 'BankAccount', position: [-2, 0.5, 0] },
  },
  {
    id: 3, codeLine: 13,
    description: 'Initialize: owner = "Ali", balance = 1000.0',
    descriptionUrdu: 'Initialize: owner = "Ali", balance = 1000.0',
    codeAction: { type: 'SET_PROPERTY', sourceLine: 13, objectId: 'acc-001', propertyName: 'owner', propertyValue: '"Ali"' },
    worldAction: { type: 'UPDATE_PROPERTY', objectId: 'acc-001', propertyName: 'owner', propertyValue: '"Ali"' },
  },
  {
    id: 4, codeLine: 13,
    description: 'Balance set to 1000.0 — this field is PRIVATE.',
    descriptionUrdu: 'Balance 1000.0 set hua — ye field PRIVATE hai.',
    codeAction: { type: 'SET_PROPERTY', sourceLine: 13, objectId: 'acc-001', propertyName: 'balance', propertyValue: '1000.0' },
    worldAction: { type: 'UPDATE_PROPERTY', objectId: 'acc-001', propertyName: 'balance', propertyValue: '1000.0' },
    callout: { type: 'remember', title: 'Private = Restricted', message: 'The balance field is private. No code outside BankAccount can read or write it directly.', messageUrdu: 'Balance field private hai. BankAccount ke bahar koi code directly ise read ya write nahi kar sakta.' },
  },
  {
    id: 5, codeLine: 15,
    description: 'Direct access: account.balance = -5000 → ACCESS DENIED',
    descriptionUrdu: 'Direct access: account.balance = -5000 → ACCESS DENIED',
    codeAction: { type: 'SET_PROPERTY', sourceLine: 15, objectId: 'acc-001', propertyName: 'balance', propertyValue: '-5000' },
    worldAction: { type: 'SHOW_ERROR', message: 'ACCESS DENIED: balance is private — cannot access from outside the class' },
    callout: { type: 'mistake', title: 'Direct Access Blocked', message: 'You cannot set account.balance directly. The field is private. This is encapsulation protecting the object state.', messageUrdu: 'Aap account.balance directly set nahi kar sakte. Field private hai. Ye encapsulation object state ko protect kar raha hai.' },
  },
  {
    id: 6, codeLine: 17,
    description: 'Use the public deposit() method instead.',
    descriptionUrdu: 'Iske bajaye public deposit() method use karo.',
    codeAction: { type: 'CALL_METHOD', sourceLine: 17, objectId: 'acc-001', methodName: 'deposit', args: ['500'] },
    worldAction: { type: 'PLAY_METHOD_ANIMATION', objectId: 'acc-001', methodName: 'deposit' },
    callout: { type: 'tip', title: 'Controlled Access', message: 'deposit() is a public method that validates input before modifying balance. This is how encapsulation works — controlled access through public methods.', messageUrdu: 'deposit() ek public method hai jo input validate karta hai balance modify karne se pehle. Ye encapsulation ka tareeqa hai — public methods ke through controlled access.' },
  },
  {
    id: 7, codeLine: 17,
    description: 'deposit(500) validated: amount > 0 ✓ → balance = 1500.0',
    descriptionUrdu: 'deposit(500) validate hua: amount > 0 ✓ → balance = 1500.0',
    codeAction: { type: 'SET_PROPERTY', sourceLine: 17, objectId: 'acc-001', propertyName: 'balance', propertyValue: '1500.0' },
    worldAction: { type: 'UPDATE_PROPERTY', objectId: 'acc-001', propertyName: 'balance', propertyValue: '1500.0' },
    callout: { type: 'concept', title: 'Validation Inside Setter', message: 'The deposit method checks amount > 0 before modifying balance. Invalid values are rejected.', messageUrdu: 'Deposit method amount > 0 check karta hai balance modify karne se pehle. Invalid values reject ho jati hain.' },
  },
  {
    id: 8, codeLine: 19,
    description: 'Use getBalance() to read the private field safely.',
    descriptionUrdu: 'getBalance() se private field safely read karo.',
    codeAction: { type: 'CALL_METHOD', sourceLine: 19, objectId: 'acc-001', methodName: 'getBalance' },
    worldAction: { type: 'PLAY_METHOD_ANIMATION', objectId: 'acc-001', methodName: 'getBalance' },
    callout: { type: 'concept', title: 'Getter Methods', message: 'getBalance() provides read access to the private balance field. This is the encapsulated way to access internal state.', messageUrdu: 'getBalance() private balance field ka read access deta hai. Ye internal state access karne ka encapsulated tareeqa hai.' },
  },
];

const ENCAPSULATION_MISSION: Mission = {
  id: 'mission-enc-001',
  title: 'MISSION — Secure the Account',
  titleUrdu: 'MISSION — Account ko Secure karo',
  description: 'Use encapsulation to protect the BankAccount from invalid access.',
  descriptionUrdu: 'BankAccount ko invalid access se protect karo.',
  status: 'active',
  objectives: [
    { id: 'e-1', description: 'Identify private state', descriptionUrdu: 'Private state identify karo', completed: false, type: 'inspect-object', targetCount: 1, currentCount: 0 },
    { id: 'e-2', description: 'Block direct access attempt', descriptionUrdu: 'Direct access attempt block karo', completed: false, type: 'call-method', targetCount: 1, currentCount: 0 },
    { id: 'e-3', description: 'Use deposit() with valid amount', descriptionUrdu: 'Valid amount se deposit() use karo', completed: false, type: 'call-method', targetCount: 1, currentCount: 0 },
    { id: 'e-4', description: 'Use getBalance() getter', descriptionUrdu: 'getBalance() getter use karo', completed: false, type: 'call-method', targetCount: 1, currentCount: 0 },
  ],
  xpReward: 60,
};

// ═══════════════════════════════════════════════════════════════
// WORLD 04: INHERITANCE HIERARCHY
// ═══════════════════════════════════════════════════════════════

const PERSON_CLASS: ClassBlueprint = {
  name: 'Person',
  properties: [
    { name: 'name', type: 'String', value: '""', accessModifier: 'protected' },
  ],
  methods: [
    { name: 'Person', returnType: 'void', parameters: [{ name: 'name', type: 'String' }], accessModifier: 'public', body: 'this.name = name;' },
    { name: 'introduce', returnType: 'void', parameters: [], accessModifier: 'public', body: 'System.out.println("I am " + name);' },
  ],
};

const STUDENT_INHERITED: ClassBlueprint = {
  name: 'Student',
  properties: [
    { name: 'name', type: 'String', value: '""', accessModifier: 'protected' },
    { name: 'studentId', type: 'String', value: '""', accessModifier: 'private' },
  ],
  methods: [
    { name: 'Student', returnType: 'void', parameters: [{ name: 'name', type: 'String' }, { name: 'studentId', type: 'String' }], accessModifier: 'public', body: 'super(name); this.studentId = studentId;' },
    { name: 'introduce', returnType: 'void', parameters: [], accessModifier: 'public', body: 'System.out.println("I am student " + name + " (" + studentId + ")");' },
    { name: 'study', returnType: 'void', parameters: [], accessModifier: 'public', body: 'System.out.println(name + " is studying");' },
  ],
};

const TEACHER_INHERITED: ClassBlueprint = {
  name: 'Teacher',
  properties: [
    { name: 'name', type: 'String', value: '""', accessModifier: 'protected' },
    { name: 'subject', type: 'String', value: '""', accessModifier: 'private' },
  ],
  methods: [
    { name: 'Teacher', returnType: 'void', parameters: [{ name: 'name', type: 'String' }, { name: 'subject', type: 'String' }], accessModifier: 'public', body: 'super(name); this.subject = subject;' },
    { name: 'introduce', returnType: 'void', parameters: [], accessModifier: 'public', body: 'System.out.println("I am " + name + ", I teach " + subject);' },
    { name: 'teach', returnType: 'void', parameters: [], accessModifier: 'public', body: 'System.out.println(name + " is teaching " + subject);' },
  ],
};

const INHERITANCE_STEPS: ExecutionStep[] = [
  {
    id: 1, codeLine: 1,
    description: 'Person class is the parent (superclass).',
    descriptionUrdu: 'Person class parent (superclass) hai.',
    codeAction: { type: 'DECLARE_CLASS', sourceLine: 1, className: 'Person' },
    worldAction: { type: 'SHOW_CLASS_BLUEPRINT', className: 'Person' },
    callout: { type: 'concept', title: 'Parent Class', message: 'Person is the parent class. It defines common properties and behavior shared by all persons.', messageUrdu: 'Person parent class hai. Ye common properties aur behavior define karti hai jo sab persons mein shared hoti hai.' },
  },
  {
    id: 2, codeLine: 8,
    description: 'Student extends Person. Student inherits from Person.',
    descriptionUrdu: 'Student Person se extend hota hai. Student Person se inherit karta hai.',
    codeAction: { type: 'DECLARE_CLASS', sourceLine: 8, className: 'Student' },
    worldAction: { type: 'SHOW_CLASS_BLUEPRINT', className: 'Student' },
    callout: { type: 'concept', title: 'extends = Inheritance', message: 'The "extends" keyword establishes inheritance. Student inherits accessible members from Person.', messageUrdu: '"extends" keyword inheritance establish karta hai. Student Person se accessible members inherit karta hai.' },
  },
  {
    id: 3, codeLine: 16,
    description: 'Teacher also extends Person — hierarchical inheritance.',
    descriptionUrdu: 'Teacher bhi Person se extend hota hai — hierarchical inheritance.',
    codeAction: { type: 'DECLARE_CLASS', sourceLine: 16, className: 'Teacher' },
    worldAction: { type: 'SHOW_CLASS_BLUEPRINT', className: 'Teacher' },
    callout: { type: 'concept', title: 'Hierarchical Inheritance', message: 'Multiple child classes can extend the same parent. Both Student and Teacher inherit from Person.', messageUrdu: 'Multiple child classes same parent se extend ho sakti hain. Student aur Teacher dono Person se inherit karte hain.' },
  },
  {
    id: 4, codeLine: 23,
    description: 'Create a Student object.',
    descriptionUrdu: 'Student object banao.',
    codeAction: { type: 'CREATE_OBJECT', sourceLine: 23, className: 'Student', variableName: 's1', objectId: 'student-001' },
    worldAction: { type: 'SPAWN_OBJECT', objectId: 'student-001', className: 'Student', position: [-3, 0.5, 0] },
    callout: { type: 'what', title: 'IS-A Relationship', message: 'A Student IS-A Person. The Student object has all accessible members from Person plus its own members.', messageUrdu: 'Student ek Person hai. Student object ke paas Person ke sab accessible members hain plus apne khud ke members.' },
  },
  {
    id: 5, codeLine: 23,
    description: 'Initialize: name = "Ali", studentId = "S001"',
    descriptionUrdu: 'Initialize: name = "Ali", studentId = "S001"',
    codeAction: { type: 'SET_PROPERTY', sourceLine: 23, objectId: 'student-001', propertyName: 'name', propertyValue: '"Ali"' },
    worldAction: { type: 'UPDATE_PROPERTY', objectId: 'student-001', propertyName: 'name', propertyValue: '"Ali"' },
  },
  {
    id: 6, codeLine: 23,
    description: 'Student-specific field: studentId = "S001"',
    descriptionUrdu: 'Student-specific field: studentId = "S001"',
    codeAction: { type: 'SET_PROPERTY', sourceLine: 23, objectId: 'student-001', propertyName: 'studentId', propertyValue: '"S001"' },
    worldAction: { type: 'UPDATE_PROPERTY', objectId: 'student-001', propertyName: 'studentId', propertyValue: '"S001"' },
    callout: { type: 'tip', title: 'Inherited + Own State', message: 'The Student object has: inherited "name" from Person + its own "studentId".', messageUrdu: 'Student object mein hai: Person se inherited "name" + apna khud ka "studentId".' },
  },
  {
    id: 7, codeLine: 24,
    description: 'Call introduce() — inherited from Person.',
    descriptionUrdu: 'introduce() call — Person se inherited.',
    codeAction: { type: 'CALL_METHOD', sourceLine: 24, objectId: 'student-001', methodName: 'introduce' },
    worldAction: { type: 'PLAY_METHOD_ANIMATION', objectId: 'student-001', methodName: 'introduce' },
    callout: { type: 'concept', title: 'Inherited Method', message: 'introduce() is defined in Person and inherited by Student. The Student object can use it.', messageUrdu: 'introduce() Person mein defined hai aur Student ne inherit kiya hai. Student object isse use kar sakta hai.' },
  },
  {
    id: 8, codeLine: 25,
    description: 'Call study() — this is Student\'s OWN method.',
    descriptionUrdu: 'study() call — ye Student ka APNA method hai.',
    codeAction: { type: 'CALL_METHOD', sourceLine: 25, objectId: 'student-001', methodName: 'study' },
    worldAction: { type: 'PLAY_METHOD_ANIMATION', objectId: 'student-001', methodName: 'study' },
    callout: { type: 'concept', title: 'Child-Specific Behavior', message: 'study() is defined only in Student. This is behavior specific to the child class.', messageUrdu: 'study() sirf Student mein defined hai. Ye child class ka specific behavior hai.' },
  },
];

const INHERITANCE_MISSION: Mission = {
  id: 'mission-inh-001',
  title: 'MISSION — Build the University Hierarchy',
  titleUrdu: 'MISSION — University Hierarchy banao',
  description: 'Create the Person → Student hierarchy and demonstrate inheritance.',
  descriptionUrdu: 'Person → Student hierarchy banao aur inheritance demonstrate karo.',
  status: 'active',
  objectives: [
    { id: 'i-1', description: 'View Person parent class', descriptionUrdu: 'Person parent class dekho', completed: false, type: 'inspect-object', targetCount: 1, currentCount: 0 },
    { id: 'i-2', description: 'View Student child class', descriptionUrdu: 'Student child class dekho', completed: false, type: 'inspect-object', targetCount: 1, currentCount: 0 },
    { id: 'i-3', description: 'Create a Student object', descriptionUrdu: 'Student object banao', completed: false, type: 'create-object', targetClassName: 'Student', targetCount: 1, currentCount: 0 },
    { id: 'i-4', description: 'Call inherited introduce()', descriptionUrdu: 'Inherited introduce() call karo', completed: false, type: 'call-method', targetCount: 1, currentCount: 0 },
    { id: 'i-5', description: 'Call own study()', descriptionUrdu: 'Apna study() call karo', completed: false, type: 'call-method', targetCount: 1, currentCount: 0 },
  ],
  xpReward: 75,
};

// ═══════════════════════════════════════════════════════════════
// WORLD CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════

export const WORLD_CONFIGS: WorldConfig[] = [
  {
    id: 'classes-objects',
    title: 'Class & Object Lab',
    titleUrdu: 'Class aur Object Lab',
    description: 'Understand how Java Classes define Objects. Create objects, set properties, and call methods.',
    descriptionUrdu: 'Samjho ke Java Classes Objects ko kaise define karti hain.',
    difficulty: 'beginner',
    estimatedMinutes: 10,
    xpReward: 50,
    concept: 'Classes & Objects',
    conceptUrdu: 'Classes aur Objects',
    moduleAssociation: 'module-01',
    sceneType: 'blueprint',
    initialClass: { name: 'Student', properties: [
      { name: 'name', type: 'String', value: '""', accessModifier: 'private' },
      { name: 'age', type: 'int', value: '0', accessModifier: 'private' },
      { name: 'rollNumber', type: 'String', value: '""', accessModifier: 'private' },
    ], methods: [
      { name: 'study', returnType: 'void', parameters: [], accessModifier: 'public', body: 'System.out.println(name + " is studying");' },
      { name: 'setInfo', returnType: 'void', parameters: [{ name: 'name', type: 'String' }, { name: 'age', type: 'int' }], accessModifier: 'public', body: 'this.name = name; this.age = age;' },
    ] },
    initialSteps: CLASS_OBJECT_STEPS,
    initialMission: CLASS_OBJECT_MISSION,
    environmentConfig: { primaryColor: '#3b82f6', secondaryColor: '#1e40af', accentColor: '#60a5fa', floorColor: '#0f172a', fogColor: '#0a0f1a', ambientIntensity: 0.4, showGrid: true, cameraPosition: [8, 6, 8], cameraTarget: [0, 0, 0] },
  },
  {
    id: 'constructors',
    title: 'Constructor Factory',
    titleUrdu: 'Constructor Factory',
    description: 'Learn how constructors initialize objects. See parameterized construction and the "this" keyword in action.',
    descriptionUrdu: 'Samjho ke constructors objects ko kaise initialize karte hain.',
    difficulty: 'easy',
    estimatedMinutes: 12,
    xpReward: 50,
    concept: 'Constructors',
    conceptUrdu: 'Constructors',
    moduleAssociation: 'module-03',
    sceneType: 'factory',
    initialClass: STUDENT_WITH_CONSTRUCTOR,
    initialSteps: CONSTRUCTOR_STEPS,
    initialMission: CONSTRUCTOR_MISSION,
    environmentConfig: { primaryColor: '#f59e0b', secondaryColor: '#b45309', accentColor: '#fbbf24', floorColor: '#1a1207', fogColor: '#0f0a02', ambientIntensity: 0.5, showGrid: true, cameraPosition: [8, 6, 8], cameraTarget: [0, 0, 0] },
  },
  {
    id: 'encapsulation',
    title: 'Encapsulation Security Lab',
    titleUrdu: 'Encapsulation Security Lab',
    description: 'Protect object state with encapsulation. Learn private fields, getters, setters, and validation.',
    descriptionUrdu: 'Encapsulation se object state ko protect karo.',
    difficulty: 'medium',
    estimatedMinutes: 15,
    xpReward: 60,
    concept: 'Encapsulation',
    conceptUrdu: 'Encapsulation',
    moduleAssociation: 'module-04',
    sceneType: 'vault',
    initialClass: BANK_ACCOUNT_CLASS,
    initialSteps: ENCAPSULATION_STEPS,
    initialMission: ENCAPSULATION_MISSION,
    environmentConfig: { primaryColor: '#10b981', secondaryColor: '#047857', accentColor: '#34d399', floorColor: '#021a12', fogColor: '#010d08', ambientIntensity: 0.3, showGrid: true, cameraPosition: [8, 6, 8], cameraTarget: [0, 0, 0] },
  },
  {
    id: 'inheritance',
    title: 'Inheritance Hierarchy',
    titleUrdu: 'Inheritance Hierarchy',
    description: 'Explore parent-child class relationships. See how Student and Teacher inherit from Person.',
    descriptionUrdu: 'Parent-child class relationships explore karo.',
    difficulty: 'hard',
    estimatedMinutes: 18,
    xpReward: 75,
    concept: 'Inheritance',
    conceptUrdu: 'Inheritance',
    moduleAssociation: 'module-05',
    sceneType: 'hierarchy',
    initialClass: PERSON_CLASS,
    initialSteps: INHERITANCE_STEPS,
    initialMission: INHERITANCE_MISSION,
    environmentConfig: { primaryColor: '#8b5cf6', secondaryColor: '#6d28d9', accentColor: '#a78bfa', floorColor: '#0f0720', fogColor: '#080415', ambientIntensity: 0.4, showGrid: true, cameraPosition: [10, 8, 10], cameraTarget: [0, 0, 0] },
  },
];

// ═══════════════════════════════════════════════════════════════
// WORLD 05: POLYMORPHISM ARENA
// ═══════════════════════════════════════════════════════════════

const ANIMAL_CLASS: ClassBlueprint = {
  name: 'Animal',
  properties: [
    { name: 'name', type: 'String', value: '""', accessModifier: 'protected' },
  ],
  methods: [
    { name: 'sound', returnType: 'void', parameters: [], accessModifier: 'public', body: 'System.out.println("Animal sound");' },
    { name: 'eat', returnType: 'void', parameters: [], accessModifier: 'public', body: 'System.out.println("Animal eating");' },
  ],
};

const DOG_CLASS: ClassBlueprint = {
  name: 'Dog',
  properties: [
    { name: 'name', type: 'String', value: '""', accessModifier: 'protected' },
  ],
  methods: [
    { name: 'sound', returnType: 'void', parameters: [], accessModifier: 'public', body: '@Override\nSystem.out.println("Dog barks");' },
    { name: 'fetch', returnType: 'void', parameters: [], accessModifier: 'public', body: 'System.out.println("Dog fetching");' },
  ],
};

const CAT_CLASS: ClassBlueprint = {
  name: 'Cat',
  properties: [
    { name: 'name', type: 'String', value: '""', accessModifier: 'protected' },
  ],
  methods: [
    { name: 'sound', returnType: 'void', parameters: [], accessModifier: 'public', body: '@Override\nSystem.out.println("Cat meows");' },
    { name: 'scratch', returnType: 'void', parameters: [], accessModifier: 'public', body: 'System.out.println("Cat scratching");' },
  ],
};

const POLYMORPHISM_STEPS: ExecutionStep[] = [
  {
    id: 1, codeLine: 1,
    description: 'Animal class loaded. Dog and Cat will override sound().',
    descriptionUrdu: 'Animal class load hua. Dog aur Cat sound() override karenge.',
    codeAction: { type: 'DECLARE_CLASS', sourceLine: 1, className: 'Animal' },
    worldAction: { type: 'SHOW_CLASS_BLUEPRINT', className: 'Animal' },
    callout: { type: 'concept', title: 'Polymorphism', message: 'Polymorphism means "many forms". One reference type can represent different object types, each producing different behavior.', messageUrdu: 'Polymorphism ka matlab hai "many forms". Ek hi reference type different types ke objects ko represent kar sakta hai.' },
  },
  {
    id: 2, codeLine: 10,
    description: 'Dog extends Animal. It overrides sound() with its own implementation.',
    descriptionUrdu: 'Dog Animal se extend hota hai. Ye sound() ko apne implementation se override karta hai.',
    codeAction: { type: 'DECLARE_CLASS', sourceLine: 10, className: 'Dog' },
    worldAction: { type: 'SHOW_CLASS_BLUEPRINT', className: 'Dog' },
    callout: { type: 'concept', title: '@Override', message: '@Override annotation indicates that Dog provides its own implementation of sound(). This is method overriding.', messageUrdu: '@Override annotation indicate karta hai ke Dog sound() ka apna implementation deta hai.' },
  },
  {
    id: 3, codeLine: 20,
    description: 'Cat extends Animal. It also overrides sound() differently.',
    descriptionUrdu: 'Cat bhi Animal se extend hoti hai. Ye bhi sound() ko alag tareeke se override karti hai.',
    codeAction: { type: 'DECLARE_CLASS', sourceLine: 20, className: 'Cat' },
    worldAction: { type: 'SHOW_CLASS_BLUEPRINT', className: 'Cat' },
  },
  {
    id: 4, codeLine: 30,
    description: 'Create Dog object, but reference it as Animal — this is UPCASTING.',
    descriptionUrdu: 'Dog object banao, lekin Animal reference se — ye UPCASTING hai.',
    codeAction: { type: 'CREATE_OBJECT', sourceLine: 30, className: 'Dog', variableName: 'a1', objectId: 'dog-001', referenceType: 'Animal', actualType: 'Dog' },
    worldAction: { type: 'SHOW_REFERENCE_VS_OBJECT', objectId: 'dog-001', className: 'Animal', message: 'Reference: Animal | Actual Object: Dog' },
    callout: { type: 'remember', title: 'Upcasting', message: 'Animal a1 = new Dog() — The reference type is Animal, but the actual object is Dog. This is implicit upcasting.', messageUrdu: 'Animal a1 = new Dog() — Reference type Animal hai, lekin actual object Dog hai.' },
  },
  {
    id: 5, codeLine: 31,
    description: 'Create Cat object, also referenced as Animal.',
    descriptionUrdu: 'Cat object bhi banao, Animal reference se.',
    codeAction: { type: 'CREATE_OBJECT', sourceLine: 31, className: 'Cat', variableName: 'a2', objectId: 'cat-001', referenceType: 'Animal', actualType: 'Cat' },
    worldAction: { type: 'SHOW_REFERENCE_VS_OBJECT', objectId: 'cat-001', className: 'Animal', message: 'Reference: Animal | Actual Object: Cat' },
  },
  {
    id: 6, codeLine: 33,
    description: 'Call a1.sound() — Java checks the ACTUAL object type at runtime.',
    descriptionUrdu: 'a1.sound() call karo — Java runtime par ACTUAL object type check karta hai.',
    codeAction: { type: 'CALL_METHOD', sourceLine: 33, objectId: 'dog-001', methodName: 'sound', referenceType: 'Animal', actualType: 'Dog' },
    worldAction: { type: 'SHOW_RUNTIME_DISPATCH', objectId: 'dog-001', methodName: 'sound', className: 'Dog', message: 'Compile-time: Animal.sound() → Runtime: Dog.sound() → Output: Dog barks' },
    callout: { type: 'concept', title: 'Dynamic Method Dispatch', message: 'Even though the reference type is Animal, Java calls Dog.sound() because the actual object is Dog. This is runtime polymorphism.', messageUrdu: 'Reference type Animal hai, lekin Java Dog.sound() call karta hai kyunki actual object Dog hai.' },
  },
  {
    id: 7, codeLine: 34,
    description: 'Call a2.sound() — different actual object, different behavior.',
    descriptionUrdu: 'a2.sound() call karo — alag actual object, alag behavior.',
    codeAction: { type: 'CALL_METHOD', sourceLine: 34, objectId: 'cat-001', methodName: 'sound', referenceType: 'Animal', actualType: 'Cat' },
    worldAction: { type: 'SHOW_RUNTIME_DISPATCH', objectId: 'cat-001', methodName: 'sound', className: 'Cat', message: 'Compile-time: Animal.sound() → Runtime: Cat.sound() → Output: Cat meows' },
    callout: { type: 'tip', title: 'Polymorphism in Action', message: 'Same reference type (Animal), same method call (sound()), but different output because the actual objects are different. This is the power of polymorphism.', messageUrdu: 'Same reference type, same method call, lekin different output kyunki actual objects different hain.' },
  },
  {
    id: 8, codeLine: 36,
    description: 'instanceof check — safely verify the actual type before casting.',
    descriptionUrdu: 'instanceof check — cast karne se pehle actual type safely verify karo.',
    codeAction: { type: 'INSTANCEOF_CHECK', sourceLine: 36, objectId: 'dog-001', className: 'Dog' },
    worldAction: { type: 'SHOW_INFO', message: 'a1 instanceof Dog → true' },
    callout: { type: 'tip', title: 'instanceof', message: 'instanceof checks whether an object is compatible with a specified type. Use it before downcasting to avoid ClassCastException.', messageUrdu: 'instanceof check karta hai ke object specified type ke saath compatible hai. Downcasting se pehle use karo.' },
  },
];

const POLYMORPHISM_MISSION: Mission = {
  id: 'mission-poly-001',
  title: 'MISSION — One Call, Many Behaviors',
  titleUrdu: 'MISSION — Ek Call, Bahut Saare Behaviors',
  description: 'Create objects, store them through parent references, and observe different behaviors.',
  descriptionUrdu: 'Objects banao, parent references se store karo, aur different behaviors observe karo.',
  status: 'active',
  objectives: [
    { id: 'poly-1', description: 'Create Dog object (a1)', descriptionUrdu: 'Dog object banao', completed: false, type: 'create-object', targetClassName: 'Dog', targetCount: 1, currentCount: 0 },
    { id: 'poly-2', description: 'Create Cat object (a2)', descriptionUrdu: 'Cat object banao', completed: false, type: 'create-object', targetClassName: 'Cat', targetCount: 1, currentCount: 0 },
    { id: 'poly-3', description: 'Call a1.sound() — observe Dog behavior', descriptionUrdu: 'a1.sound() call karo', completed: false, type: 'call-method', targetCount: 1, currentCount: 0 },
    { id: 'poly-4', description: 'Call a2.sound() — observe Cat behavior', descriptionUrdu: 'a2.sound() call karo', completed: false, type: 'call-method', targetCount: 1, currentCount: 0 },
    { id: 'poly-5', description: 'Verify with instanceof', descriptionUrdu: 'instanceof se verify karo', completed: false, type: 'instanceof-check', targetCount: 1, currentCount: 0 },
  ],
  xpReward: 100,
};

// ═══════════════════════════════════════════════════════════════
// WORLD 06: ABSTRACTION CONTROL CENTER
// ═══════════════════════════════════════════════════════════════

const SHAPE_ABSTRACT_CLASS: ClassBlueprint = {
  name: 'Shape',
  properties: [
    { name: 'color', type: 'String', value: '""', accessModifier: 'protected' },
  ],
  methods: [
    { name: 'draw', returnType: 'void', parameters: [], accessModifier: 'public', body: '// abstract — no body' },
    { name: 'info', returnType: 'void', parameters: [], accessModifier: 'public', body: 'System.out.println("Shape");' },
    { name: 'getArea', returnType: 'double', parameters: [], accessModifier: 'public', body: '// abstract — no body' },
  ],
};

const CIRCLE_CLASS: ClassBlueprint = {
  name: 'Circle',
  properties: [
    { name: 'radius', type: 'double', value: '0.0', accessModifier: 'private' },
  ],
  methods: [
    { name: 'draw', returnType: 'void', parameters: [], accessModifier: 'public', body: '@Override\nSystem.out.println("Drawing Circle");' },
    { name: 'getArea', returnType: 'double', parameters: [], accessModifier: 'public', body: 'return Math.PI * radius * radius;' },
  ],
};

const RECTANGLE_CLASS: ClassBlueprint = {
  name: 'Rectangle',
  properties: [
    { name: 'width', type: 'double', value: '0.0', accessModifier: 'private' },
    { name: 'height', type: 'double', value: '0.0', accessModifier: 'private' },
  ],
  methods: [
    { name: 'draw', returnType: 'void', parameters: [], accessModifier: 'public', body: '@Override\nSystem.out.println("Drawing Rectangle");' },
    { name: 'getArea', returnType: 'double', parameters: [], accessModifier: 'public', body: 'return width * height;' },
  ],
};

const ABSTRACTION_STEPS: ExecutionStep[] = [
  {
    id: 1, codeLine: 1,
    description: 'Shape is an abstract class. It defines common structure but leaves some methods abstract.',
    descriptionUrdu: 'Shape abstract class hai. Ye common structure define karti hai lekin kuch methods abstract hain.',
    codeAction: { type: 'DECLARE_ABSTRACT_CLASS', sourceLine: 1, className: 'Shape' },
    worldAction: { type: 'SHOW_ABSTRACT_LAYER', className: 'Shape', message: 'Abstract class: cannot be instantiated directly' },
    callout: { type: 'concept', title: 'Abstract Class', message: 'An abstract class defines common behavior while requiring subclasses to provide specific implementations for abstract methods.', messageUrdu: 'Abstract class common behavior define karti hai jabke subclasses specific implementations dete hain.' },
  },
  {
    id: 2, codeLine: 3,
    description: 'draw() is abstract — declaration without implementation body.',
    descriptionUrdu: 'draw() abstract hai — declaration hai lekin implementation body nahi.',
    codeAction: { type: 'DECLARE_ABSTRACT_METHOD', sourceLine: 3, methodName: 'draw', className: 'Shape' },
    worldAction: { type: 'SHOW_INFO', message: 'abstract void draw() — no body, subclasses MUST implement' },
    callout: { type: 'what', title: 'Abstract Method', message: 'An abstract method has no implementation body. Concrete subclasses must provide the implementation.', messageUrdu: 'Abstract method mein implementation body nahi hoti. Concrete subclasses implementation dete hain.' },
  },
  {
    id: 3, codeLine: 7,
    description: 'info() is a concrete method — it has an implementation in the abstract class.',
    descriptionUrdu: 'info() concrete method hai — abstract class mein iska implementation hai.',
    codeAction: { type: 'CALL_METHOD', sourceLine: 7, methodName: 'info', className: 'Shape' },
    worldAction: { type: 'SHOW_INFO', message: 'Concrete method: has implementation in abstract class' },
    callout: { type: 'tip', title: 'Concrete Methods in Abstract Classes', message: 'Abstract classes CAN contain concrete methods with implementations. Subclasses inherit these directly.', messageUrdu: 'Abstract classes mein concrete methods ho sakte hain. Subclasses inhe directly inherit karte hain.' },
  },
  {
    id: 4, codeLine: 12,
    description: 'Circle extends Shape and provides concrete implementation of draw().',
    descriptionUrdu: 'Circle Shape se extend hota hai aur draw() ka concrete implementation deta hai.',
    codeAction: { type: 'DECLARE_CLASS', sourceLine: 12, className: 'Circle' },
    worldAction: { type: 'SHOW_CLASS_BLUEPRINT', className: 'Circle' },
    callout: { type: 'concept', title: 'Concrete Subclass', message: 'Circle implements all abstract methods from Shape. It is now a concrete class that can be instantiated.', messageUrdu: 'Circle Shape ke sab abstract methods implement karta hai. Ye ab concrete class hai jo instantiate ho sakti hai.' },
  },
  {
    id: 5, codeLine: 20,
    description: 'Rectangle also extends Shape and implements draw() differently.',
    descriptionUrdu: 'Rectangle bhi Shape se extend hota hai aur draw() ko alag tareeke se implement karta hai.',
    codeAction: { type: 'DECLARE_CLASS', sourceLine: 20, className: 'Rectangle' },
    worldAction: { type: 'SHOW_CLASS_BLUEPRINT', className: 'Rectangle' },
  },
  {
    id: 6, codeLine: 28,
    description: 'Try to instantiate abstract class: new Shape() — COMPILATION ERROR.',
    descriptionUrdu: 'Abstract class instantiate karne ki koshish: new Shape() — COMPILATION ERROR.',
    codeAction: { type: 'SHOW_COMPILE_ERROR', sourceLine: 28, className: 'Shape', errorMessage: 'Cannot instantiate abstract class Shape' },
    worldAction: { type: 'SHOW_INSTANTIATION_BLOCKED', className: 'Shape', message: 'BLOCKED: Cannot instantiate abstract class' },
    callout: { type: 'java-rule', title: 'Java Rule', message: 'An abstract class CANNOT be instantiated directly. You must create a concrete subclass object.', messageUrdu: 'Abstract class directly instantiate nahi ho sakti. Concrete subclass object banana padta hai.' },
  },
  {
    id: 7, codeLine: 30,
    description: 'Correct approach: create Circle object — this works because Circle is concrete.',
    descriptionUrdu: 'Sahi tareeqa: Circle object banao — ye kaam karta hai kyunki Circle concrete hai.',
    codeAction: { type: 'CREATE_OBJECT', sourceLine: 30, className: 'Circle', variableName: 's1', objectId: 'circle-001' },
    worldAction: { type: 'SPAWN_OBJECT', objectId: 'circle-001', className: 'Circle', position: [-3, 0.5, 0] },
  },
  {
    id: 8, codeLine: 31,
    description: 'Call s1.draw() — Circle provides its own implementation.',
    descriptionUrdu: 's1.draw() call karo — Circle apna implementation deta hai.',
    codeAction: { type: 'CALL_METHOD', sourceLine: 31, objectId: 'circle-001', methodName: 'draw' },
    worldAction: { type: 'PLAY_METHOD_ANIMATION', objectId: 'circle-001', methodName: 'draw' },
    callout: { type: 'concept', title: 'Abstraction in Action', message: 'The code uses Shape reference, but Circle.draw() executes. Abstraction hides complexity while providing a clean interface.', messageUrdu: 'Code Shape reference use karta hai, lekin Circle.draw() execute hota hai.' },
  },
];

const ABSTRACTION_MISSION: Mission = {
  id: 'mission-abst-001',
  title: 'MISSION — Control the Complex System',
  titleUrdu: 'MISSION — Complex System ko Control karo',
  description: 'Identify abstract classes, methods, and execute concrete implementations.',
  descriptionUrdu: 'Abstract classes, methods identify karo, aur concrete implementations execute karo.',
  status: 'active',
  objectives: [
    { id: 'abst-1', description: 'Identify abstract class Shape', descriptionUrdu: 'Abstract class Shape identify karo', completed: false, type: 'identify-abstract', targetCount: 1, currentCount: 0 },
    { id: 'abst-2', description: 'Identify abstract method draw()', descriptionUrdu: 'Abstract method draw() identify karo', completed: false, type: 'inspect-object', targetCount: 1, currentCount: 0 },
    { id: 'abst-3', description: 'Create Circle object', descriptionUrdu: 'Circle object banao', completed: false, type: 'create-object', targetClassName: 'Circle', targetCount: 1, currentCount: 0 },
    { id: 'abst-4', description: 'Execute Circle.draw()', descriptionUrdu: 'Circle.draw() execute karo', completed: false, type: 'call-method', targetCount: 1, currentCount: 0 },
    { id: 'abst-5', description: 'Create Rectangle object', descriptionUrdu: 'Rectangle object banao', completed: false, type: 'create-object', targetClassName: 'Rectangle', targetCount: 1, currentCount: 0 },
  ],
  xpReward: 100,
};

// ═══════════════════════════════════════════════════════════════
// WORLD 07: INTERFACE CONTRACT LAB
// ═══════════════════════════════════════════════════════════════

const PAYMENT_INTERFACE: ClassBlueprint = {
  name: 'Payment',
  properties: [],
  methods: [
    { name: 'pay', returnType: 'void', parameters: [{ name: 'amount', type: 'double' }], accessModifier: 'public', body: '// interface method — no body' },
    { name: 'refund', returnType: 'void', parameters: [{ name: 'amount', type: 'double' }], accessModifier: 'public', body: '// interface method — no body' },
  ],
};

const CARD_PAYMENT_CLASS: ClassBlueprint = {
  name: 'CardPayment',
  properties: [
    { name: 'cardNumber', type: 'String', value: '""', accessModifier: 'private' },
  ],
  methods: [
    { name: 'pay', returnType: 'void', parameters: [{ name: 'amount', type: 'double' }], accessModifier: 'public', body: '@Override\nSystem.out.println("Paid " + amount + " by card");' },
    { name: 'refund', returnType: 'void', parameters: [{ name: 'amount', type: 'double' }], accessModifier: 'public', body: '@Override\nSystem.out.println("Refunded " + amount + " to card");' },
  ],
};

const CASH_PAYMENT_CLASS: ClassBlueprint = {
  name: 'CashPayment',
  properties: [
    { name: 'cashReceived', type: 'double', value: '0.0', accessModifier: 'private' },
  ],
  methods: [
    { name: 'pay', returnType: 'void', parameters: [{ name: 'amount', type: 'double' }], accessModifier: 'public', body: '@Override\nSystem.out.println("Paid " + amount + " by cash");' },
    { name: 'refund', returnType: 'void', parameters: [{ name: 'amount', type: 'double' }], accessModifier: 'public', body: '@Override\nSystem.out.println("Refunded " + amount + " in cash");' },
  ],
};

const INTERFACE_STEPS: ExecutionStep[] = [
  {
    id: 1, codeLine: 1,
    description: 'Payment interface defines the contract — pay() and refund().',
    descriptionUrdu: 'Payment interface contract define karta hai — pay() aur refund().',
    codeAction: { type: 'DECLARE_INTERFACE', sourceLine: 1, className: 'Payment' },
    worldAction: { type: 'SHOW_CLASS_BLUEPRINT', className: 'Payment' },
    callout: { type: 'concept', title: 'Interface = Contract', message: 'An interface defines a contract that implementing classes must fulfill. It specifies WHAT methods exist, not HOW they work.', messageUrdu: 'Interface ek contract define karta hai jo implement karne wali classes ko fulfill karna hota hai.' },
  },
  {
    id: 2, codeLine: 3,
    description: 'pay(amount) — abstract method in the interface. No implementation.',
    descriptionUrdu: 'pay(amount) — interface mein abstract method. Koi implementation nahi.',
    codeAction: { type: 'DECLARE_ABSTRACT_METHOD', sourceLine: 3, methodName: 'pay', className: 'Payment' },
    worldAction: { type: 'SHOW_INFO', message: 'void pay(double amount) — contract requirement' },
    callout: { type: 'what', title: 'Interface Method', message: 'Interface methods are implicitly public and abstract. Implementing classes MUST provide implementations.', messageUrdu: 'Interface methods implicitly public aur abstract hote hain.' },
  },
  {
    id: 4, codeLine: 10,
    description: 'CardPayment implements Payment. It MUST implement pay() and refund().',
    descriptionUrdu: 'CardPayment Payment implement karta hai. Isko pay() aur refund() implement karna hoga.',
    codeAction: { type: 'IMPLEMENT_INTERFACE', sourceLine: 10, className: 'CardPayment', interfaceName: 'Payment' },
    worldAction: { type: 'SHOW_CONTRACT_CONNECTION', className: 'CardPayment', interfaceName: 'Payment', message: 'CardPayment accepts Payment contract' },
    callout: { type: 'java-rule', title: 'implements Keyword', message: 'The "implements" keyword connects a class to an interface. The class must provide implementations for all interface methods.', messageUrdu: '"implements" keyword class ko interface se connect karta hai.' },
  },
  {
    id: 5, codeLine: 12,
    description: 'CardPayment provides its own implementation of pay().',
    descriptionUrdu: 'CardPayment pay() ka apna implementation deta hai.',
    codeAction: { type: 'OVERRIDE_METHOD', sourceLine: 12, className: 'CardPayment', methodName: 'pay' },
    worldAction: { type: 'SHOW_INTERFACE_IMPLEMENTATION', className: 'CardPayment', methodName: 'pay', interfaceName: 'Payment' },
  },
  {
    id: 6, codeLine: 20,
    description: 'CashPayment also implements Payment with different behavior.',
    descriptionUrdu: 'CashPayment bhi Payment implement karta hai alag behavior ke saath.',
    codeAction: { type: 'IMPLEMENT_INTERFACE', sourceLine: 20, className: 'CashPayment', interfaceName: 'Payment' },
    worldAction: { type: 'SHOW_CONTRACT_CONNECTION', className: 'CashPayment', interfaceName: 'Payment', message: 'CashPayment accepts Payment contract' },
  },
  {
    id: 7, codeLine: 30,
    description: 'Create CardPayment object. Store in Payment reference.',
    descriptionUrdu: 'CardPayment object banao. Payment reference mein store karo.',
    codeAction: { type: 'CREATE_OBJECT', sourceLine: 30, className: 'CardPayment', variableName: 'p1', objectId: 'card-001', referenceType: 'Payment', actualType: 'CardPayment' },
    worldAction: { type: 'SPAWN_OBJECT', objectId: 'card-001', className: 'CardPayment', position: [-3, 0.5, 0] },
  },
  {
    id: 8, codeLine: 31,
    description: 'Call p1.pay(100) — CardPayment implementation executes.',
    descriptionUrdu: 'p1.pay(100) call karo — CardPayment implementation execute hota hai.',
    codeAction: { type: 'CALL_METHOD', sourceLine: 31, objectId: 'card-001', methodName: 'pay', referenceType: 'Payment', actualType: 'CardPayment' },
    worldAction: { type: 'PLAY_METHOD_ANIMATION', objectId: 'card-001', methodName: 'pay' },
    callout: { type: 'concept', title: 'Interface Polymorphism', message: 'The Payment reference can point to any implementing class. Each class provides its own behavior. This is the power of interface-based polymorphism.', messageUrdu: 'Payment reference kisi bhi implementing class ko point kar sakta hai. Har class apna behavior deta hai.' },
  },
  {
    id: 9, codeLine: 33,
    description: 'Create CashPayment — same contract, different implementation.',
    descriptionUrdu: 'CashPayment banao — same contract, different implementation.',
    codeAction: { type: 'CREATE_OBJECT', sourceLine: 33, className: 'CashPayment', variableName: 'p2', objectId: 'cash-001', referenceType: 'Payment', actualType: 'CashPayment' },
    worldAction: { type: 'SPAWN_OBJECT', objectId: 'cash-001', className: 'CashPayment', position: [3, 0.5, 0] },
  },
  {
    id: 10, codeLine: 34,
    description: 'Call p2.pay(200) — CashPayment implementation executes.',
    descriptionUrdu: 'p2.pay(200) call karo — CashPayment implementation execute hota hai.',
    codeAction: { type: 'CALL_METHOD', sourceLine: 34, objectId: 'cash-001', methodName: 'pay', referenceType: 'Payment', actualType: 'CashPayment' },
    worldAction: { type: 'PLAY_METHOD_ANIMATION', objectId: 'cash-001', methodName: 'pay' },
    callout: { type: 'tip', title: 'Same Contract, Different Behavior', message: 'Both p1 and p2 are Payment references, but pay() behaves differently based on the actual object type. This is interface polymorphism.', messageUrdu: 'p1 aur p2 dono Payment references hain, lekin pay() actual object type ke according different behave karta hai.' },
  },
];

const INTERFACE_MISSION: Mission = {
  id: 'mission-intf-001',
  title: 'MISSION — Build the Payment Contract',
  titleUrdu: 'MISSION — Payment Contract banao',
  description: 'Define a Payment interface, implement it in multiple classes, and observe polymorphic behavior.',
  descriptionUrdu: 'Payment interface define karo, multiple classes mein implement karo, aur polymorphic behavior observe karo.',
  status: 'active',
  objectives: [
    { id: 'intf-1', description: 'Define Payment interface', descriptionUrdu: 'Payment interface define karo', completed: false, type: 'identify-abstract', targetCount: 1, currentCount: 0 },
    { id: 'intf-2', description: 'Implement CardPayment', descriptionUrdu: 'CardPayment implement karo', completed: false, type: 'implement-interface', targetCount: 1, currentCount: 0 },
    { id: 'intf-3', description: 'Implement CashPayment', descriptionUrdu: 'CashPayment implement karo', completed: false, type: 'implement-interface', targetCount: 1, currentCount: 0 },
    { id: 'intf-4', description: 'Call pay() through Payment reference', descriptionUrdu: 'Payment reference se pay() call karo', completed: false, type: 'call-method', targetCount: 1, currentCount: 0 },
    { id: 'intf-5', description: 'Observe different implementations', descriptionUrdu: 'Different implementations observe karo', completed: false, type: 'inspect-object', targetCount: 1, currentCount: 0 },
  ],
  xpReward: 100,
};

// ═══════════════════════════════════════════════════════════════
// ADD NEW WORLDS TO CONFIGS
// ═══════════════════════════════════════════════════════════════

WORLD_CONFIGS.push(
  {
    id: 'polymorphism',
    title: 'Polymorphism Arena',
    titleUrdu: 'Polymorphism Arena',
    description: 'Runtime polymorphism through method overriding. See how one reference type produces different behaviors based on the actual object.',
    descriptionUrdu: 'Method overriding se runtime polymorphism dekho. Ek reference type actual object ke according different behavior kaise deta hai.',
    difficulty: 'medium',
    estimatedMinutes: 15,
    xpReward: 100,
    concept: 'Polymorphism',
    conceptUrdu: 'Polymorphism',
    moduleAssociation: 'module-06',
    sceneType: 'arena',
    initialClass: ANIMAL_CLASS,
    initialSteps: POLYMORPHISM_STEPS,
    initialMission: POLYMORPHISM_MISSION,
    environmentConfig: { primaryColor: '#f97316', secondaryColor: '#c2410c', accentColor: '#fb923c', floorColor: '#1a0f05', fogColor: '#0d0702', ambientIntensity: 0.4, showGrid: true, cameraPosition: [10, 8, 10], cameraTarget: [0, 0, 0] },
  },
  {
    id: 'abstraction',
    title: 'Abstraction Control Center',
    titleUrdu: 'Abstraction Control Center',
    description: 'Abstract classes and methods. Understand how abstraction exposes essential operations while hiding implementation complexity.',
    descriptionUrdu: 'Abstract classes aur methods. Samjho ke abstraction essential operations expose karti hai jabke implementation complexity chhupati hai.',
    difficulty: 'medium',
    estimatedMinutes: 15,
    xpReward: 100,
    concept: 'Abstraction',
    conceptUrdu: 'Abstraction',
    moduleAssociation: 'module-07',
    sceneType: 'control-center',
    initialClass: SHAPE_ABSTRACT_CLASS,
    initialSteps: ABSTRACTION_STEPS,
    initialMission: ABSTRACTION_MISSION,
    environmentConfig: { primaryColor: '#06b6d4', secondaryColor: '#0891b2', accentColor: '#22d3ee', floorColor: '#021517', fogColor: '#010b0d', ambientIntensity: 0.4, showGrid: true, cameraPosition: [10, 8, 10], cameraTarget: [0, 0, 0] },
  },
  {
    id: 'interfaces',
    title: 'Interface Contract Lab',
    titleUrdu: 'Interface Contract Lab',
    description: 'Interface contracts and implements keyword. See how multiple classes can fulfill the same contract with different implementations.',
    descriptionUrdu: 'Interface contracts aur implements keyword. Dekho ke multiple classes same contract ko different implementations se kaise fulfill karti hain.',
    difficulty: 'hard',
    estimatedMinutes: 18,
    xpReward: 100,
    concept: 'Interfaces',
    conceptUrdu: 'Interfaces',
    moduleAssociation: 'module-08',
    sceneType: 'contract-lab',
    initialClass: PAYMENT_INTERFACE,
    initialSteps: INTERFACE_STEPS,
    initialMission: INTERFACE_MISSION,
    environmentConfig: { primaryColor: '#ec4899', secondaryColor: '#be185d', accentColor: '#f472b6', floorColor: '#1a0510', fogColor: '#0d0208', ambientIntensity: 0.4, showGrid: true, cameraPosition: [10, 8, 10], cameraTarget: [0, 0, 0] },
  }
);

// ═══════════════════════════════════════════════════════════════
// WORLD 08: JAVA RUNTIME LAB
// ═══════════════════════════════════════════════════════════════

const RUNTIME_STUDENT_CLASS: ClassBlueprint = {
  name: 'Student',
  properties: [
    { name: 'name', type: 'String', value: '""', accessModifier: 'private' },
    { name: 'age', type: 'int', value: '0', accessModifier: 'private' },
  ],
  methods: [
    { name: 'Student', returnType: 'void', parameters: [{ name: 'name', type: 'String' }, { name: 'age', type: 'int' }], accessModifier: 'public', body: 'this.name = name; this.age = age;' },
    { name: 'setName', returnType: 'Student', parameters: [{ name: 'name', type: 'String' }], accessModifier: 'public', body: 'this.name = name; return this;' },
    { name: 'toString', returnType: 'String', parameters: [], accessModifier: 'public', body: '@Override\nreturn name + " - " + age;' },
    { name: 'equals', returnType: 'boolean', parameters: [{ name: 'obj', type: 'Object' }], accessModifier: 'public', body: '@Override\nif (obj instanceof Student) {\n  Student s = (Student) obj;\n  return name.equals(s.name) && age == s.age;\n}\nreturn false;' },
    { name: 'hashCode', returnType: 'int', parameters: [], accessModifier: 'public', body: '@Override\nreturn name.hashCode() + age;' },
  ],
};

const RUNTIME_STEPS: ExecutionStep[] = [
  // ── THIS KEYWORD ──
  {
    id: 1, codeLine: 1,
    description: 'Student class loaded. Observe the constructor using "this" keyword.',
    descriptionUrdu: 'Student class load hui. Constructor mein "this" keyword dekho.',
    codeAction: { type: 'DECLARE_CLASS', sourceLine: 1, className: 'Student' },
    worldAction: { type: 'SHOW_CLASS_BLUEPRINT', className: 'Student' },
    callout: { type: 'concept', title: 'this Keyword', message: '"this" refers to the current object instance. In a constructor, "this.name" means the object\'s own name field.', messageUrdu: '"this" current object instance ko refer karta hai. Constructor mein "this.name" object ka apna name field hai.' },
  },
  {
    id: 2, codeLine: 5,
    description: 'Create Student object. Constructor parameter "name" and field "name" share the same name.',
    descriptionUrdu: 'Student object banao. Constructor parameter "name" aur field "name" ka naam same hai.',
    codeAction: { type: 'CREATE_OBJECT', sourceLine: 5, className: 'Student', variableName: 's1', objectId: 'student-001' },
    worldAction: { type: 'SPAWN_OBJECT', objectId: 'student-001', className: 'Student', position: [-3, 0.5, 0] },
  },
  {
    id: 3, codeLine: 6,
    description: 'this.name = name — "this.name" is the object\'s field, "name" is the constructor parameter.',
    descriptionUrdu: 'this.name = name — "this.name" object ka field hai, "name" constructor parameter hai.',
    codeAction: { type: 'SET_PROPERTY', sourceLine: 6, objectId: 'student-001', propertyName: 'name', propertyValue: '"Ali"' },
    worldAction: { type: 'HIGHLIGHT_CURRENT_OBJECT', objectId: 'student-001', message: 'this → Student #001 | this.name = "Ali"' },
    callout: { type: 'what', title: 'this Resolves Ambiguity', message: 'When parameter and field share the same name, "this" distinguishes between them. this.name = the object\'s field. name = the parameter.', messageUrdu: 'Jab parameter aur field ka naam same ho, "this" unhe distinguish karta hai. this.name = object ka field. name = parameter.' },
  },
  {
    id: 4, codeLine: 7,
    description: 'this.age = age — same pattern for age field.',
    descriptionUrdu: 'this.age = age — age field ke liye same pattern.',
    codeAction: { type: 'SET_PROPERTY', sourceLine: 7, objectId: 'student-001', propertyName: 'age', propertyValue: '20' },
    worldAction: { type: 'UPDATE_PROPERTY', objectId: 'student-001', propertyName: 'age', propertyValue: '20' },
  },
  // ── THIS MISTAKE ──
  {
    id: 5, codeLine: 10,
    description: 'MISTAKE: Without "this", both sides refer to the parameter — field never gets set!',
    descriptionUrdu: 'MISTAKE: "this" ke bina, dono taraf parameter ko refer karta hai — field kabhi set nahi hota!',
    codeAction: { type: 'SHOW_COMPILE_ERROR', sourceLine: 10, className: 'Student', errorMessage: 'WARNING: name = name assigns parameter to itself, field unchanged' },
    worldAction: { type: 'SHOW_ERROR', message: 'MISTAKE: name = name → parameter shadows field. Use this.name = name' },
    callout: { type: 'mistake', title: 'Variable Shadowing Bug', message: 'Without "this", the parameter "name" shadows the field "name". The assignment becomes meaningless — the field retains its default value.', messageUrdu: 'Bina "this" ke, parameter "name" field "name" ko shadow karta hai. Assignment meaningless hai — field default value rakhta hai.' },
  },
  // ── METHOD CHAINING ──
  {
    id: 6, codeLine: 13,
    description: 'setName returns "this" — enabling method chaining.',
    descriptionUrdu: 'setName "this" return karta hai — method chaining enable hota hai.',
    codeAction: { type: 'THIS_REFERENCE', sourceLine: 13, objectId: 'student-001', methodName: 'setName' },
    worldAction: { type: 'HIGHLIGHT_CURRENT_OBJECT', objectId: 'student-001', message: 'this → same Student #001 object returned' },
    callout: { type: 'tip', title: 'Method Chaining', message: 'When a method returns "this", it returns the same object. This enables: student.setName("Ali").setAge(20) — fluent API pattern.', messageUrdu: 'Jab method "this" return karta hai, wo same object return karta hai. Ye enable karta hai: student.setName("Ali").setAge(20) — fluent API pattern.' },
  },
  // ── SUPER KEYWORD ──
  {
    id: 7, codeLine: 20,
    description: 'Person class loaded — the parent class with its own constructor.',
    descriptionUrdu: 'Person class load hui — parent class apne constructor ke saath.',
    codeAction: { type: 'DECLARE_CLASS', sourceLine: 20, className: 'Person' },
    worldAction: { type: 'SHOW_CLASS_BLUEPRINT', className: 'Person' },
    callout: { type: 'concept', title: 'super Keyword', message: '"super" refers to the parent class. super(name) calls the Person constructor from the Student constructor.', messageUrdu: '"super" parent class ko refer karta hai. super(name) Student constructor se Person constructor call karta hai.' },
  },
  {
    id: 8, codeLine: 28,
    description: 'Student extends Person. Constructor uses super(name) to initialize parent.',
    descriptionUrdu: 'Student Person se extend hota hai. Constructor super(name) se parent initialize karta hai.',
    codeAction: { type: 'SUPER_CONSTRUCTOR', sourceLine: 28, className: 'Student', targetClassName: 'Person', args: ['name'] },
    worldAction: { type: 'SHOW_SUPER_CONSTRUCTOR', className: 'Student', targetClassName: 'Person', message: 'Student() → super(name) → Person(name) → name initialized' },
    callout: { type: 'remember', title: 'Constructor Chaining', message: 'super(name) invokes the Person constructor. The parent must be initialized before the child can use inherited fields.', messageUrdu: 'super(name) Person constructor invoke karta hai. Parent initialize hona chahiye child se pehle inherited fields use karne ke liye.' },
  },
  {
    id: 9, codeLine: 34,
    description: 'super.method() — calling an overridden parent method explicitly.',
    descriptionUrdu: 'super.method() — overridden parent method ko explicitly call karna.',
    codeAction: { type: 'SUPER_METHOD', sourceLine: 34, className: 'Student', methodName: 'study' },
    worldAction: { type: 'SHOW_CLASS_BLUEPRINT', className: 'Person' },
    callout: { type: 'tip', title: 'super for Method Access', message: 'super.study() calls the parent\'s version of study(), not the child\'s overridden version. Useful when you want to extend, not replace, parent behavior.', messageUrdu: 'super.study() parent ka version call karta hai, child ka overridden version nahi. Tab useful hai jab aap parent behavior extend karna chahte hain.' },
  },
  // ── STATIC MEMBERS ──
  {
    id: 10, codeLine: 40,
    description: 'static field belongs to the CLASS, not to any individual object.',
    descriptionUrdu: 'static field CLASS ko belong karta hai, kisi individual object ko nahi.',
    codeAction: { type: 'DECLARE_STATIC_FIELD', sourceLine: 40, className: 'Student', propertyName: 'university', propertyValue: '"ABC University"' },
    worldAction: { type: 'SHOW_CLASS_LEVEL_MEMBER', className: 'Student', propertyName: 'university', message: 'static university = "ABC University" — shared by ALL Student objects' },
    callout: { type: 'concept', title: 'Static Members', message: 'A static field is shared across ALL instances of the class. It exists once at the class level, not once per object.', messageUrdu: 'Static field class ke SAB instances ke liye shared hota hai. Ye class level par ek baar exist karta hai, har object mein nahi.' },
  },
  {
    id: 11, codeLine: 42,
    description: 'Static method belongs to the class. No "this" reference available.',
    descriptionUrdu: 'Static method class ko belong karta hai. Koi "this" reference available nahi.',
    codeAction: { type: 'DECLARE_STATIC_METHOD', sourceLine: 42, className: 'MathUtil', methodName: 'square' },
    worldAction: { type: 'SHOW_STATIC_CONTEXT', className: 'MathUtil', message: 'static square(int x) — called as MathUtil.square(5), not on an object' },
    callout: { type: 'java-rule', title: 'Static Method Rule', message: 'A static method belongs to the class, not any instance. It cannot access instance fields or methods directly because there is no "this" reference.', messageUrdu: 'Static method class ko belong karta hai, kisi instance ko nahi. Ye directly instance fields/methods access nahi kar sakta kyunki koi "this" reference nahi hota.' },
  },
  {
    id: 12, codeLine: 48,
    description: 'Accessing static through instance works but is misleading.',
    descriptionUrdu: 'Instance se static access karna kaam karta hai lekin misleading hai.',
    codeAction: { type: 'STATIC_ACCESS', sourceLine: 48, className: 'Student', propertyName: 'university' },
    worldAction: { type: 'SHOW_INFO', message: 's1.university → works but misleading. Use Student.university instead' },
    callout: { type: 'mistake', title: 'Static Access via Instance', message: 'Java allows accessing static members through an instance, but it is misleading. The static member belongs to the class, not the object. Use ClassName.member instead.', messageUrdu: 'Java instance se static members access karne deta hai, lekin ye misleading hai. Static member class ko belong karta hai. ClassName.member use karo.' },
  },
  // ── INSTANCE VS STATIC ──
  {
    id: 13, codeLine: 52,
    description: 'Instance member: each object has its own copy. Static member: shared at class level.',
    descriptionUrdu: 'Instance member: har object ki apni copy hai. Static member: class level par shared.',
    codeAction: { type: 'INSTANCE_ACCESS', sourceLine: 52, objectId: 'student-001', propertyName: 'name' },
    worldAction: { type: 'SHOW_OBJECT_MEMBER', objectId: 'student-001', propertyName: 'name', message: 's1.name = "Ali" — unique to this object' },
    callout: { type: 'concept', title: 'Instance vs Static', message: 'Instance members (fields/methods) belong to each object individually. Static members belong to the class itself and are shared.', messageUrdu: 'Instance members har object ko individually belong karte hain. Static members class ko belong karte hain aur shared hote hain.' },
  },
  // ── FINAL KEYWORD ──
  {
    id: 14, codeLine: 60,
    description: 'final variable: once assigned, cannot be reassigned.',
    descriptionUrdu: 'final variable: ek baar assign hone ke baad, dobara assign nahi ho sakta.',
    codeAction: { type: 'DECLARE_FINAL_VARIABLE', sourceLine: 60, className: 'Student', propertyName: 'MAX_STUDENTS', propertyValue: '100' },
    worldAction: { type: 'SHOW_INFO', message: 'final int MAX_STUDENTS = 100 — value locked' },
    callout: { type: 'concept', title: 'final Variable', message: 'A final variable can be assigned only once. After initialization, any attempt to reassign it causes a compilation error.', messageUrdu: 'Final variable sirf ek baar assign ho sakta hai. Initialization ke baad, dobara assign karne par compilation error hota hai.' },
  },
  {
    id: 15, codeLine: 62,
    description: 'Attempting to reassign final variable — COMPILATION ERROR.',
    descriptionUrdu: 'Final variable dobara assign karne ki koshish — COMPILATION ERROR.',
    codeAction: { type: 'FINAL_BLOCKED', sourceLine: 62, className: 'Student', propertyName: 'MAX_STUDENTS', errorMessage: 'Cannot assign a value to final variable MAX_STUDENTS' },
    worldAction: { type: 'BLOCK_REASSIGNMENT', className: 'Student', propertyName: 'MAX_STUDENTS', message: 'BLOCKED: final variable cannot be reassigned after initialization' },
    callout: { type: 'java-rule', title: 'final Rule', message: 'Once a final variable is initialized, it cannot be reassigned. For primitive types, the value is locked. For reference types, the reference is locked but the object\'s state may still change.', messageUrdu: 'Final variable ek baar initialize hone ke baad, dobara assign nahi ho sakta. Primitive ke liye value locked hoti hai. Reference type ke liye reference locked hota hai lekin object ki state change ho sakti hai.' },
  },
  {
    id: 16, codeLine: 65,
    description: 'final reference: cannot reassign, but CAN modify the object\'s state.',
    descriptionUrdu: 'final reference: dobara assign nahi ho sakta, lekin object ki state change ho sakti hai.',
    codeAction: { type: 'SET_PROPERTY', sourceLine: 65, objectId: 'student-001', propertyName: 'name', propertyValue: '"Sara"' },
    worldAction: { type: 'UPDATE_PROPERTY', objectId: 'student-001', propertyName: 'name', propertyValue: '"Sara"' },
    callout: { type: 'remember', title: 'final Reference vs final Value', message: 'A final reference cannot point to a different object, but the object it references can still have its fields changed. final Student s = new Student(); s.name = "Sara" is ALLOWED.', messageUrdu: 'Final reference doosre object ko point nahi kar sakta, lekin jo object refer karta hai uski fields change ho sakti hain.' },
  },
  // ── OBJECT CLASS ──
  {
    id: 17, codeLine: 70,
    description: 'Object is the root class. Every class inherits from Object.',
    descriptionUrdu: 'Object root class hai. Har class Object se inherit hoti hai.',
    codeAction: { type: 'DECLARE_CLASS', sourceLine: 70, className: 'Object' },
    worldAction: { type: 'SHOW_CLASS_BLUEPRINT', className: 'Object' },
    callout: { type: 'concept', title: 'Object Class', message: 'Object is the root of the Java class hierarchy. Every class inherits toString(), equals(), and hashCode() from Object.', messageUrdu: 'Object Java class hierarchy ka root hai. Har class Object se toString(), equals(), aur hashCode() inherit karta hai.' },
  },
  // ── toString() ──
  {
    id: 18, codeLine: 75,
    description: 'toString() provides a String representation of the object.',
    descriptionUrdu: 'toString() object ka String representation deta hai.',
    codeAction: { type: 'TOSTRING_CALL', sourceLine: 75, objectId: 'student-001', methodName: 'toString' },
    worldAction: { type: 'SHOW_STRING_REPRESENTATION', objectId: 'student-001', message: 's1.toString() → "Sara - 20"' },
    callout: { type: 'tip', title: 'toString()', message: 'When an object is used where a String is expected (like println), toString() is called automatically. Override it to provide meaningful output.', messageUrdu: 'Jab object String ki jagah use hota hai (jaise println), toString() automatically call hota hai. Isse override karo meaningful output dene ke liye.' },
  },
  {
    id: 19, codeLine: 80,
    description: 'Without overriding toString(), the default output is not meaningful.',
    descriptionUrdu: 'toString() override kiye bina, default output meaningful nahi hota.',
    codeAction: { type: 'TOSTRING_CALL', sourceLine: 80, objectId: 'student-001', methodName: 'toString' },
    worldAction: { type: 'SHOW_INFO', message: 'Default: Student@1a2b3c4 (class name + hash) — not useful' },
    callout: { type: 'mistake', title: 'Default toString()', message: 'The default toString() from Object returns "ClassName@HashCode" which is not meaningful for debugging. Always override toString() in your classes.', messageUrdu: 'Object ka default toString() "ClassName@HashCode" return karta hai jo debugging ke liye meaningful nahi hai. Hamesha toString() override karo.' },
  },
  // ── equals() ──
  {
    id: 20, codeLine: 85,
    description: 'Two Student objects with same field values — are they equal?',
    descriptionUrdu: 'Same field values ke do Student objects — kya ye equal hain?',
    codeAction: { type: 'CREATE_OBJECT', sourceLine: 85, className: 'Student', variableName: 's2', objectId: 'student-002', referenceType: 'Student', actualType: 'Student' },
    worldAction: { type: 'SPAWN_OBJECT', objectId: 'student-002', className: 'Student', position: [3, 0.5, 0] },
  },
  {
    id: 21, codeLine: 88,
    description: 's1.equals(s2) — depends on equals() implementation.',
    descriptionUrdu: 's1.equals(s2) — equals() implementation par depend karta hai.',
    codeAction: { type: 'EQUALS_CALL', sourceLine: 88, objectId: 'student-001', methodName: 'equals' },
    worldAction: { type: 'SHOW_EQUALITY_COMPARISON', objectId: 'student-001', message: 's1.equals(s2) → true (if properly overridden with name + age comparison)' },
    callout: { type: 'concept', title: 'equals() Contract', message: 'equals() should compare logical equality, not reference identity. Without overriding, Object.equals() compares references (like ==). Override it for meaningful comparison.', messageUrdu: 'equals() logical equality compare karta hai, reference identity nahi. Override kiye bina, Object.equals() references compare karta hai (== jaisa). Meaningful comparison ke liye override karo.' },
  },
  // ── == vs equals() ──
  {
    id: 22, codeLine: 92,
    description: 's1 == s2 compares REFERENCES, not content.',
    descriptionUrdu: 's1 == s2 REFERENCES compare karta hai, content nahi.',
    codeAction: { type: 'REFERENCE_COMPARE', sourceLine: 92, objectId: 'student-001', message: 's1 == s2' },
    worldAction: { type: 'SHOW_REFERENCE_COMPARISON', objectId: 'student-001', message: 's1 == s2 → FALSE (different object references, even with same data)' },
    callout: { type: 'concept', title: '== vs equals()', message: 'For object references, == compares whether both references point to the exact same object in memory. equals() can be overridden to compare logical equality.', messageUrdu: 'Object references ke liye, == compare karta hai ke dono references memory mein same object ko point karte hain. equals() logical equality ke liye override kiya ja sakta hai.' },
  },
  {
    id: 23, codeLine: 95,
    description: 'Same reference: s2 = s1 — now both point to the same object.',
    descriptionUrdu: 'Same reference: s2 = s1 — ab dono same object ko point karte hain.',
    codeAction: { type: 'REFERENCE_COMPARE', sourceLine: 95, objectId: 'student-001', message: 's2 = s1' },
    worldAction: { type: 'SHOW_REFERENCE_COMPARISON', objectId: 'student-001', message: 's1 == s2 → TRUE (both point to Student #001)' },
    callout: { type: 'tip', title: 'Same Reference', message: 'When s2 = s1, both variables reference the same object. s1 == s2 is true because they point to the same memory location.', messageUrdu: 'Jab s2 = s1, dono variables same object ko reference karte hain. s1 == s2 true hai kyunki dono same memory location ko point karte hain.' },
  },
  // ── hashCode() ──
  {
    id: 24, codeLine: 100,
    description: 'hashCode() returns an integer for hash-based collections.',
    descriptionUrdu: 'hashCode() hash-based collections ke liye integer return karta hai.',
    codeAction: { type: 'HASHCODE_CALL', sourceLine: 100, objectId: 'student-001', methodName: 'hashCode' },
    worldAction: { type: 'SHOW_HASH_VALUE', objectId: 'student-001', message: 's1.hashCode() → computed from name.hashCode() + age' },
    callout: { type: 'java-rule', title: 'equals/hashCode Contract', message: 'If a.equals(b) is true, then a.hashCode() MUST equal b.hashCode(). But unequal objects CAN have the same hash code (hash collisions).', messageUrdu: 'Agar a.equals(b) true hai, to a.hashCode() MUST b.hashCode() ke barabar ho. Lekin unequal objects KA SAME hash code ho sakta hai.' },
  },
  {
    id: 25, codeLine: 105,
    description: 'Challenge: Two unequal objects CAN have the same hash code.',
    descriptionUrdu: 'Challenge: Do unequal objects KA SAME hash code ho sakta hai.',
    codeAction: { type: 'HASHCODE_CALL', sourceLine: 105, objectId: 'student-002', methodName: 'hashCode' },
    worldAction: { type: 'SHOW_HASH_VALUE', objectId: 'student-002', message: 'Hash collisions are normal and expected in hash-based collections' },
    callout: { type: 'exam', title: 'Exam Tip', message: 'Equal objects must have equal hash codes. But unequal objects may share the same hash code — this is called a hash collision and is normal.', messageUrdu: 'Equal objects ke same hash code hone chahiye. Lekin unequal objects ka same hash code ho sakta hai — ise hash collision kehte hain aur ye normal hai.' },
  },
];

const RUNTIME_MISSION: Mission = {
  id: 'mission-runtime-001',
  title: 'MISSION — Java Runtime Mastery',
  titleUrdu: 'MISSION — Java Runtime Mastery',
  description: 'Explore this, super, static, final, and Object methods through interactive simulation.',
  descriptionUrdu: 'this, super, static, final, aur Object methods ko interactive simulation se samjho.',
  status: 'active',
  objectives: [
    { id: 'rt-1', description: 'Understand this keyword usage', descriptionUrdu: 'this keyword ka use samjho', completed: false, type: 'use-this', targetCount: 1, currentCount: 0 },
    { id: 'rt-2', description: 'Call super constructor', descriptionUrdu: 'super constructor call karo', completed: false, type: 'use-super', targetCount: 1, currentCount: 0 },
    { id: 'rt-3', description: 'Access static member', descriptionUrdu: 'static member access karo', completed: false, type: 'use-static', targetCount: 1, currentCount: 0 },
    { id: 'rt-4', description: 'Use final variable', descriptionUrdu: 'final variable use karo', completed: false, type: 'use-final', targetCount: 1, currentCount: 0 },
    { id: 'rt-5', description: 'Call toString()', descriptionUrdu: 'toString() call karo', completed: false, type: 'use-tostring', targetCount: 1, currentCount: 0 },
    { id: 'rt-6', description: 'Compare with equals()', descriptionUrdu: 'equals() se compare karo', completed: false, type: 'use-equals', targetCount: 1, currentCount: 0 },
    { id: 'rt-7', description: 'Compute hashCode()', descriptionUrdu: 'hashCode() compute karo', completed: false, type: 'use-hashcode', targetCount: 1, currentCount: 0 },
    { id: 'rt-8', description: 'Compare references with ==', descriptionUrdu: '== se references compare karo', completed: false, type: 'compare-references', targetCount: 1, currentCount: 0 },
  ],
  xpReward: 100,
};

WORLD_CONFIGS.push({
  id: 'java-runtime',
  title: 'Java Runtime Lab',
  titleUrdu: 'Java Runtime Lab',
  description: 'Explore how Java objects, references, class-level members and Object methods behave during execution.',
  descriptionUrdu: 'Java objects, references, class-level members aur Object methods execution ke dauran kaise behave karte hain.',
  difficulty: 'hard',
  estimatedMinutes: 25,
  xpReward: 100,
  concept: 'Java Runtime Concepts',
  conceptUrdu: 'Java Runtime Concepts',
  moduleAssociation: 'module-09',
  sceneType: 'runtime-lab',
  initialClass: RUNTIME_STUDENT_CLASS,
  initialSteps: RUNTIME_STEPS,
  initialMission: RUNTIME_MISSION,
  environmentConfig: { primaryColor: '#14b8a6', secondaryColor: '#0d9488', accentColor: '#2dd4bf', floorColor: '#0a1a18', fogColor: '#050f0e', ambientIntensity: 0.4, showGrid: true, cameraPosition: [10, 8, 10], cameraTarget: [0, 0, 0] },
});

// ═══════════════════════════════════════════════════════════════
// WORLD 09: PACKAGE ARCHITECTURE LAB
// ═══════════════════════════════════════════════════════════════

const PACKAGE_STUDENT_CLASS: ClassBlueprint = {
  name: 'Student',
  properties: [
    { name: 'name', type: 'String', value: '""', accessModifier: 'private' },
    { name: 'id', type: 'int', value: '0', accessModifier: 'private' },
  ],
  methods: [
    { name: 'Student', returnType: 'void', parameters: [{ name: 'name', type: 'String' }, { name: 'id', type: 'int' }], accessModifier: 'public', body: 'this.name = name; this.id = id;' },
    { name: 'getName', returnType: 'String', parameters: [], accessModifier: 'public', body: 'return name;' },
    { name: 'getId', returnType: 'int', parameters: [], accessModifier: 'public', body: 'return id;' },
  ],
};

const PACKAGE_STEPS: ExecutionStep[] = [
  {
    id: 1, codeLine: 1,
    description: 'Package declaration: com.university.model — this class belongs to the model package.',
    descriptionUrdu: 'Package declaration: com.university.model — ye class model package mein hai.',
    codeAction: { type: 'SHOW_PACKAGE_STRUCTURE', sourceLine: 1, className: 'Student' },
    worldAction: { type: 'SHOW_PACKAGE_FOLDER', className: 'com.university.model' },
    callout: { type: 'concept', title: 'Package = Folder', message: 'A package is like a folder that organizes classes. "com.university.model" means: com/ → university/ → model/ → Student.java. This prevents naming conflicts and controls access.', messageUrdu: 'Package ek folder jaisa hai jo classes ko organize karta hai. "com.university.model" ka matlab hai: com/ → university/ → model/ → Student.java. Ye naming conflicts aur access control karta hai.' },
  },
  {
    id: 2, codeLine: 2,
    description: 'Package declaration defines where this class lives in the project structure.',
    descriptionUrdu: 'Package declaration define karta hai ke ye class project structure mein kahan hai.',
    codeAction: { type: 'DECLARE_CLASS', sourceLine: 2, className: 'Student' },
    worldAction: { type: 'SHOW_INFO', message: 'Class Student declared in package com.university.model' },
    callout: { type: 'remember', title: 'First Line Rule', message: 'The package declaration must be the first line in a Java file (before imports). It defines the fully-qualified name: com.university.model.Student.', messageUrdu: 'Package declaration Java file ki pehli line honi chahiye (imports se pehle). Ye fully-qualified name define karta hai: com.university.model.Student.' },
  },
  {
    id: 3, codeLine: 5,
    description: 'Import: we need Student from model package. Without this import, we must use the full name.',
    descriptionUrdu: 'Import: humein model package se Student chahiye. Bina is import ke humein full name use karna hoga.',
    codeAction: { type: 'IMPORT_PACKAGE', sourceLine: 5, className: 'Student', targetClassName: 'com.university.model' },
    worldAction: { type: 'SHOW_IMPORT_CONNECTION', className: 'Student', message: 'Import connects Main → Student across packages' },
    callout: { type: 'what', title: 'Import Statement', message: 'import com.university.model.Student; tells Java where to find the Student class. Without it, Java only looks in the same package.', messageUrdu: 'import com.university.model.Student; Java ko batata hai ke Student class kahan hai. Bina iske Java sirf same package mein dekhta hai.' },
  },
  {
    id: 4, codeLine: 6,
    description: 'Wildcard import: import com.university.model.* — imports ALL classes from the model package.',
    descriptionUrdu: 'Wildcard import: import com.university.model.* — model package ki SARI classes import karta hai.',
    codeAction: { type: 'USE_WILDCARD_IMPORT', sourceLine: 6, className: '*', targetClassName: 'com.university.model' },
    worldAction: { type: 'SHOW_IMPORT_CONNECTION', className: '*', message: 'Wildcard * imports all public classes from the package' },
    callout: { type: 'tip', title: 'Wildcard Import', message: '* imports all public classes from that package. Use specific imports for clarity, but wildcards are common for large packages.', messageUrdu: '* us package ki sab public classes import karta hai. Clarity ke liye specific imports use karo, lekin wildcards bade packages mein common hain.' },
  },
  {
    id: 5, codeLine: 8,
    description: 'Create a Student object — now accessible because of the import.',
    descriptionUrdu: 'Student object banao — import ki wajah se accessible hai.',
    codeAction: { type: 'CREATE_OBJECT', sourceLine: 8, className: 'Student', variableName: 's1', objectId: 'student-001' },
    worldAction: { type: 'SPAWN_OBJECT', objectId: 'student-001', className: 'Student', position: [-3, 0.5, 0] },
  },
  {
    id: 6, codeLine: 8,
    description: 'Initialize: name = "Ali", id = 101 — object created in heap memory.',
    descriptionUrdu: 'Initialize: name = "Ali", id = 101 — object heap memory mein bana.',
    codeAction: { type: 'SET_PROPERTY', sourceLine: 8, objectId: 'student-001', propertyName: 'name', propertyValue: '"Ali"' },
    worldAction: { type: 'UPDATE_PROPERTY', objectId: 'student-001', propertyName: 'name', propertyValue: '"Ali"' },
  },
  {
    id: 7, codeLine: 10,
    description: 'Create utility package: com.university.util — different package, same project.',
    descriptionUrdu: 'Utility package banao: com.university.util — alag package, same project.',
    codeAction: { type: 'CREATE_SUBPACKAGE', sourceLine: 10, className: 'StringHelper', targetClassName: 'com.university.util' },
    worldAction: { type: 'SHOW_SUBPACKAGE_NESTING', className: 'com.university.util', message: 'Sub-package created: util is a sibling of model under university' },
    callout: { type: 'concept', title: 'Sub-packages', message: 'Packages can be nested. com.university.util is a sub-package of com.university, sibling to com.university.model. Each package is a separate namespace.', messageUrdu: 'Packages nest ho sakte hain. com.university.util, com.university ka sub-package hai, com.university.model ka sibling. Har package ek alag namespace hai.' },
  },
  {
    id: 8, codeLine: 15,
    description: 'Access control: package-private (default) means only classes in the same package can access it.',
    descriptionUrdu: 'Access control: package-private (default) ka matlab hai sirf same package ki classes access kar sakti hain.',
    codeAction: { type: 'ACCESS_PACKAGE_CLASS', sourceLine: 15, className: 'StringHelper', targetClassName: 'Student' },
    worldAction: { type: 'SHOW_PACKAGE_DEPENDENCY', className: 'StringHelper', message: 'StringHelper (util) cannot access package-private members of Student (model)' },
    callout: { type: 'mistake', title: 'Package-Private Access', message: 'Classes in different packages CANNOT access package-private (no modifier) members. Student.name is private — Student.getId() with no modifier is package-private. Only classes in com.university.model can use it directly.', messageUrdu: 'Alag packages ki classes package-private (koi modifier nahi) members ACCESS nahi kar sakti. Student.name private hai — Student.getId() bina modifier ke package-private hai. Sirf com.university.model ki classes directly use kar sakti hain.' },
  },
  {
    id: 9, codeLine: 18,
    description: 'Fully-qualified name: com.university.model.Student — always works, no import needed.',
    descriptionUrdu: 'Fully-qualified name: com.university.model.Student — hamesha kaam karta hai, import nahi chahiye.',
    codeAction: { type: 'ACCESS_PACKAGE_CLASS', sourceLine: 18, className: 'Student', targetClassName: 'com.university.model.Student' },
    worldAction: { type: 'SHOW_INFO', message: 'Fully-qualified name works without import: com.university.model.Student' },
    callout: { type: 'tip', title: 'Fully-Qualified Name', message: 'You can always use the full package path instead of importing. import is just shorthand. Use it when two classes have the same name in different packages.', messageUrdu: 'Aap hamesha full package path use kar sakte hain import ke bajaye. Import sirf shorthand hai. Jab do classes different packages mein same naam ki hon to use karo.' },
  },
];

const PACKAGE_MISSION: Mission = {
  id: 'mission-pkg-001',
  title: 'MISSION — Package Architecture',
  titleUrdu: 'MISSION — Package Architecture',
  description: 'Organize classes into packages, use imports, and understand access control.',
  descriptionUrdu: 'Classes ko packages mein organize karo, imports use karo, aur access control samjho.',
  status: 'active',
  objectives: [
    { id: 'pkg-1', description: 'Understand package declaration', descriptionUrdu: 'Package declaration samjho', completed: false, type: 'import-package', targetCount: 1, currentCount: 0 },
    { id: 'pkg-2', description: 'Use specific import', descriptionUrdu: 'Specific import use karo', completed: false, type: 'import-package', targetCount: 1, currentCount: 0 },
    { id: 'pkg-3', description: 'Use wildcard import', descriptionUrdu: 'Wildcard import use karo', completed: false, type: 'use-wildcard', targetCount: 1, currentCount: 0 },
    { id: 'pkg-4', description: 'Access a class from another package', descriptionUrdu: 'Doosre package se class access karo', completed: false, type: 'access-packaged-class', targetCount: 1, currentCount: 0 },
    { id: 'pkg-5', description: 'Create a sub-package', descriptionUrdu: 'Sub-package banao', completed: false, type: 'create-subpackage', targetCount: 1, currentCount: 0 },
  ],
  xpReward: 75,
};

WORLD_CONFIGS.push({
  id: 'packages',
  title: 'Package Architecture Lab',
  titleUrdu: 'Package Architecture Lab',
  description: 'Organize Java classes into packages. Learn imports, access control, and project structure.',
  descriptionUrdu: 'Java classes ko packages mein organize karo. Imports, access control, aur project structure samjho.',
  difficulty: 'medium',
  estimatedMinutes: 15,
  xpReward: 75,
  concept: 'Packages & Imports',
  conceptUrdu: 'Packages aur Imports',
  moduleAssociation: 'module-10',
  sceneType: 'package-city',
  initialClass: PACKAGE_STUDENT_CLASS,
  initialSteps: PACKAGE_STEPS,
  initialMission: PACKAGE_MISSION,
  environmentConfig: { primaryColor: '#06b6d4', secondaryColor: '#0891b2', accentColor: '#22d3ee', floorColor: '#0a1a1e', fogColor: '#050e10', ambientIntensity: 0.4, showGrid: true, cameraPosition: [10, 8, 10], cameraTarget: [0, 0, 0] },
});

// ═══════════════════════════════════════════════════════════════
// WORLD 10: EXCEPTION HANDLING LAB
// ═══════════════════════════════════════════════════════════════

const EXCEPTION_STEPS: ExecutionStep[] = [
  {
    id: 1, codeLine: 1,
    description: 'Exception handling protects your program from crashing when errors occur.',
    descriptionUrdu: 'Exception handling aapke program ko crash hone se bachata hai jab errors aati hain.',
    codeAction: { type: 'DECLARE_CLASS', sourceLine: 1, className: 'ExceptionDemo' },
    worldAction: { type: 'SHOW_CLASS_BLUEPRINT', className: 'ExceptionDemo' },
    callout: { type: 'concept', title: 'Exception Handling', message: 'Java uses try-catch-finally to handle exceptions. An exception is an event that disrupts normal program flow. Without handling, the program crashes.', messageUrdu: 'Java try-catch-finally use karta hai exceptions handle karne ke liye. Exception ek event hai jo normal program flow ko disrupt karta hai. Bina handling ke program crash ho jata hai.' },
  },
  {
    id: 2, codeLine: 5,
    description: 'Array with 3 elements: {10, 20, 30}. Index 0, 1, 2 are valid.',
    descriptionUrdu: 'Array 3 elements ke saath: {10, 20, 30}. Index 0, 1, 2 valid hain.',
    codeAction: { type: 'DECLARE_VARIABLE', sourceLine: 5, className: 'int[]', variableName: 'arr' },
    worldAction: { type: 'SHOW_INFO', message: 'int[] arr = {10, 20, 30} — array with 3 valid indices' },
  },
  {
    id: 3, codeLine: 7,
    description: 'Try block: attempting arr[5] — index 5 does NOT exist! This will throw ArrayIndexOutOfBoundsException.',
    descriptionUrdu: 'Try block: arr[5] try kar rahe hain — index 5 EXIST nahi karta! Ye ArrayIndexOutOfBoundsException throw karega.',
    codeAction: { type: 'TRY_CATCH_BLOCK', sourceLine: 7, errorMessage: 'ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 3' },
    worldAction: { type: 'SHOW_EXCEPTION_PATH', message: 'arr[5] → ArrayIndexOutOfBoundsException thrown!' },
    callout: { type: 'concept', title: 'Try Block', message: 'The try block wraps code that might throw an exception. If arr[5] is accessed and the array only has 3 elements (indices 0-2), Java throws an ArrayIndexOutOfBoundsException.', messageUrdu: 'Try block us code ko wrap karta hai jo exception throw kar sakta hai. Agar arr[5] access ho aur array mein sirf 3 elements hon (indices 0-2), Java ArrayIndexOutOfBoundsException throw karta hai.' },
  },
  {
    id: 4, codeLine: 9,
    description: 'Catch block catches the exception. Program continues instead of crashing.',
    descriptionUrdu: 'Catch block exception ko catch karta hai. Program crash hone ke bajaye continue karta hai.',
    codeAction: { type: 'SHOW_RUNTIME_ERROR', sourceLine: 9, errorMessage: 'ArrayIndexOutOfBoundsException caught!' },
    worldAction: { type: 'SHOW_CATCH_HANDLER', message: 'Catch block executed — exception handled gracefully' },
    callout: { type: 'remember', title: 'Catch Block', message: 'When an exception is thrown, Java jumps to the matching catch block. The program does NOT crash — it continues after the catch block.', messageUrdu: 'Jab exception throw hoti hai, Java matching catch block mein jump karta hai. Program CRASH nahi hota — ye catch block ke baad continue karta hai.' },
  },
  {
    id: 5, codeLine: 12,
    description: 'Finally block: ALWAYS executes whether exception occurs or not.',
    descriptionUrdu: 'Finally block: HAMESHA execute hota hai chahe exception aaye ya na aaye.',
    codeAction: { type: 'FINALLY_BLOCK', sourceLine: 12, outputMessage: 'Finally block executed — cleanup done' },
    worldAction: { type: 'SHOW_FINALLY_EXECUTE', message: 'Finally block always runs — used for cleanup (close files, release resources)' },
    callout: { type: 'tip', title: 'Finally Block', message: 'finally ALWAYS runs — even if an exception is thrown, even if there\'s a return statement. Use it for cleanup: closing files, releasing connections, freeing resources.', messageUrdu: 'finally HAMESHA chalta hai — chahe exception throw ho, chahe return statement ho. Cleanup ke liye use karo: files band karna, connections release karna, resources free karna.' },
  },
  {
    id: 6, codeLine: 17,
    description: 'Multiple catch blocks: catch specific exceptions first, then general ones.',
    descriptionUrdu: 'Multiple catch blocks: pehle specific exceptions pakdo, phir general wali.',
    codeAction: { type: 'MULTI_CATCH', sourceLine: 17, errorMessage: 'Multiple catch: ArithmeticException | NullPointerException' },
    worldAction: { type: 'SHOW_CATCH_HANDLER', message: 'Multi-catch: different exceptions handled differently' },
    callout: { type: 'concept', title: 'Multiple Catch Blocks', message: 'Order matters: catch ArithmeticException before Exception. Java checks catch blocks top-to-bottom. If you put Exception first, it catches everything and the specific blocks are unreachable.', messageUrdu: 'Order matter karta hai: ArithmeticException ko Exception se pehle pakdo. Java catch blocks ko upar-se-neeche check karta hai. Agar Exception pehle rakho to sab catch ho jayega aur specific blocks unreachable hongi.' },
  },
  {
    id: 7, codeLine: 25,
    description: 'Throw keyword: manually throw an exception when invalid state is detected.',
    descriptionUrdu: 'Throw keyword: jab invalid state mile to manually exception throw karo.',
    codeAction: { type: 'THROW_EXCEPTION', sourceLine: 25, errorMessage: 'throw new IllegalArgumentException("Age cannot be negative")' },
    worldAction: { type: 'SHOW_EXCEPTION_PATH', message: 'IllegalArgumentException thrown manually by developer' },
    callout: { type: 'concept', title: 'throw Keyword', message: 'throw creates and throws an exception object. Use it to enforce preconditions: "age cannot be negative", "name cannot be null". This is defensive programming.', messageUrdu: 'throw exception object create aur throw karta hai. Preconditions enforce karne ke liye use karo: "age negative nahi ho sakta", "name null nahi ho sakta". Ye defensive programming hai.' },
  },
  {
    id: 8, codeLine: 30,
    description: 'Custom exception: extends Exception — becomes a checked exception.',
    descriptionUrdu: 'Custom exception: Exception se extend hoti hai — checked exception ban jati hai.',
    codeAction: { type: 'DECLARE_CUSTOM_EXCEPTION', sourceLine: 30, className: 'InvalidAgeException' },
    worldAction: { type: 'SHOW_CHECKED_DECLARE', className: 'InvalidAgeException', message: 'Custom checked exception — must be declared or caught' },
    callout: { type: 'exam', title: 'Checked vs Unchecked', message: 'Checked exceptions (extend Exception) MUST be caught or declared with throws. Unchecked exceptions (extend RuntimeException) are optional. Errors (extend Error) are JVM problems — don\'t catch them.', messageUrdu: 'Checked exceptions (Exception se extend) MUST catch ya throws se declare karna hota hai. Unchecked exceptions (RuntimeException se extend) optional hain. Errors (Error se extend) JVM problems hain — inhein mat pakdo.' },
  },
  {
    id: 9, codeLine: 38,
    description: 'Try-with-resources: AutoCloseable resources are closed automatically.',
    descriptionUrdu: 'Try-with-resources: AutoCloseable resources automatically close ho jati hain.',
    codeAction: { type: 'TRY_WITH_RESOURCES', sourceLine: 38, outputMessage: 'Scanner auto-closed after try block' },
    worldAction: { type: 'SHOW_RESOURCE_CLOSE', message: 'Try-with-resources: resource.close() called automatically in finally' },
    callout: { type: 'remember', title: 'Try-With-Resources', message: 'Resources declared in try(...) are auto-closed. No need for manual finally { resource.close() }. Available since Java 7. The resource must implement AutoCloseable.', messageUrdu: 'Try(...) mein declare ki gayi resources auto-close ho jati hain. Manual finally { resource.close() } ki zaroorat nahi. Java 7 se available. Resource ko AutoCloseable implement karna hota hai.' },
  },
  {
    id: 10, codeLine: 45,
    description: 'Exception propagation: if catch not found here, exception travels up the call stack.',
    descriptionUrdu: 'Exception propagation: agar yahan catch na mile to exception call stack mein upar jaata hai.',
    codeAction: { type: 'SHOW_COMPILE_ERROR', sourceLine: 45, errorMessage: 'Unreported exception — must be caught or declared to be thrown' },
    worldAction: { type: 'SHOW_EXCEPTION_CHAIN', message: 'Exception propagates up the call stack if not caught' },
    callout: { type: 'concept', title: 'Exception Propagation', message: 'If a method throws an exception and doesn\'t catch it, the exception propagates to the calling method. It keeps going up until someone catches it or it reaches main() — then the program crashes.', messageUrdu: 'Agar method exception throw karta hai aur catch nahi karta, exception calling method mein propagate hota hai. Ye upar chalta hai jab tak koi catch na kare ya main() tak na pahunche — phir program crash hota hai.' },
  },
];

const EXCEPTION_MISSION: Mission = {
  id: 'mission-exc-001',
  title: 'MISSION — Exception Mastery',
  titleUrdu: 'MISSION — Exception Mastery',
  description: 'Handle exceptions with try-catch-finally, create custom exceptions, and use try-with-resources.',
  descriptionUrdu: 'Try-catch-finally se exceptions handle karo, custom exceptions banao, aur try-with-resources use karo.',
  status: 'active',
  objectives: [
    { id: 'exc-1', description: 'Catch an ArrayIndexOutOfBoundsException', descriptionUrdu: 'ArrayIndexOutOfBoundsException pakdo', completed: false, type: 'catch-exception', targetCount: 1, currentCount: 0 },
    { id: 'exc-2', description: 'Use finally block for cleanup', descriptionUrdu: 'Cleanup ke liye finally block use karo', completed: false, type: 'use-finally', targetCount: 1, currentCount: 0 },
    { id: 'exc-3', description: 'Throw a custom exception', descriptionUrdu: 'Custom exception throw karo', completed: false, type: 'throw-exception', targetCount: 1, currentCount: 0 },
    { id: 'exc-4', description: 'Use try-with-resources', descriptionUrdu: 'Try-with-resources use karo', completed: false, type: 'try-with-resources', targetCount: 1, currentCount: 0 },
    { id: 'exc-5', description: 'Understand exception propagation', descriptionUrdu: 'Exception propagation samjho', completed: false, type: 'catch-exception', targetCount: 1, currentCount: 0 },
  ],
  xpReward: 80,
};

WORLD_CONFIGS.push({
  id: 'exceptions',
  title: 'Exception Handling Lab',
  titleUrdu: 'Exception Handling Lab',
  description: 'Master try-catch-finally, custom exceptions, and exception propagation through interactive simulation.',
  descriptionUrdu: 'Try-catch-finally, custom exceptions, aur exception propagation ko interactive simulation se master karo.',
  difficulty: 'hard',
  estimatedMinutes: 18,
  xpReward: 80,
  concept: 'Exception Handling',
  conceptUrdu: 'Exception Handling',
  moduleAssociation: 'module-11',
  sceneType: 'exception-flow',
  initialClass: { name: 'ExceptionDemo', properties: [], methods: [] } as ClassBlueprint,
  initialSteps: EXCEPTION_STEPS,
  initialMission: EXCEPTION_MISSION,
  environmentConfig: { primaryColor: '#ef4444', secondaryColor: '#dc2626', accentColor: '#f87171', floorColor: '#1a0a0a', fogColor: '#100505', ambientIntensity: 0.3, showGrid: true, cameraPosition: [10, 8, 10], cameraTarget: [0, 0, 0] },
});

// ═══════════════════════════════════════════════════════════════
// WORLD 11: COLLECTIONS DATA LAB
// ═══════════════════════════════════════════════════════════════

const COLLECTIONS_STUDENT_CLASS: ClassBlueprint = {
  name: 'Student',
  properties: [
    { name: 'name', type: 'String', value: '""', accessModifier: 'private' },
    { name: 'age', type: 'int', value: '0', accessModifier: 'private' },
  ],
  methods: [
    { name: 'Student', returnType: 'void', parameters: [{ name: 'name', type: 'String' }, { name: 'age', type: 'int' }], accessModifier: 'public', body: 'this.name = name; this.age = age;' },
    { name: 'getName', returnType: 'String', parameters: [], accessModifier: 'public', body: 'return name;' },
    { name: 'getAge', returnType: 'int', parameters: [], accessModifier: 'public', body: 'return age;' },
    { name: 'toString', returnType: 'String', parameters: [], accessModifier: 'public', body: '@Override\nreturn name + "(" + age + ")";' },
  ],
};

const COLLECTIONS_STEPS: ExecutionStep[] = [
  {
    id: 1, codeLine: 1,
    description: 'ArrayList: a resizable array that grows automatically when elements are added.',
    descriptionUrdu: 'ArrayList: resizable array jo automatically badhta hai jab elements add ho.',
    codeAction: { type: 'DECLARE_CLASS', sourceLine: 1, className: 'Student' },
    worldAction: { type: 'SHOW_CLASS_BLUEPRINT', className: 'Student' },
    callout: { type: 'concept', title: 'ArrayList', message: 'ArrayList<Student> is a resizable array. Unlike regular arrays (fixed size), ArrayList grows and shrinks dynamically. It stores objects, not primitives.', messageUrdu: 'ArrayList<Student> resizable array hai. Regular arrays (fixed size) ke bajaye ArrayList dynamically badhta aur chhota hota hai. Ye objects store karta hai, primitives nahi.' },
  },
  {
    id: 2, codeLine: 5,
    description: 'Create empty ArrayList with type parameter <Student> — only Student objects allowed.',
    descriptionUrdu: 'Khali ArrayList banao type parameter <Student> ke saath — sirf Student objects allowed.',
    codeAction: { type: 'CREATE_ARRAYLIST', sourceLine: 5, className: 'Student', variableName: 'list' },
    worldAction: { type: 'SHOW_COLLECTION_GROW', message: 'ArrayList created — initial capacity: 10, size: 0' },
    callout: { type: 'what', title: 'Type Parameter <T>', message: '<Student> is a generic type parameter. It ensures ONLY Student objects can be added. Compile-time type safety — no ClassCastException at runtime.', messageUrdu: '<Student> generic type parameter hai. Ye ensure karta hai ke SIRF Student objects add ho sakein. Compile-time type safety — runtime pe ClassCastException nahi aayegi.' },
  },
  {
    id: 3, codeLine: 7,
    description: 'add() inserts Student objects into the ArrayList. Internal array grows if needed.',
    descriptionUrdu: 'add() Student objects ko ArrayList mein insert karta hai. Internal array zaroorat par badhta hai.',
    codeAction: { type: 'ADD_TO_COLLECTION', sourceLine: 7, className: 'Student', objectId: 'student-001', variableName: 'list' },
    worldAction: { type: 'SPAWN_OBJECT', objectId: 'student-001', className: 'Student', position: [-3, 0.5, 0] },
    callout: { type: 'concept', title: 'Dynamic Sizing', message: 'When you add elements, ArrayList checks capacity. If full, it creates a new array (typically 1.5x larger), copies elements, and discards the old one. This is automatic.', messageUrdu: 'Jab elements add karte hain, ArrayList capacity check karta hai. Agar full hai, naya array banata hai (typically 1.5x bada), elements copy karta hai, aur purana discard karta hai. Ye automatic hai.' },
  },
  {
    id: 4, codeLine: 8,
    description: 'Add second student: list.add(new Student("Sara", 21))',
    descriptionUrdu: 'Doosra student add karo: list.add(new Student("Sara", 21))',
    codeAction: { type: 'ADD_TO_COLLECTION', sourceLine: 8, className: 'Student', objectId: 'student-002', variableName: 'list' },
    worldAction: { type: 'SPAWN_OBJECT', objectId: 'student-002', className: 'Student', position: [-1, 0.5, 0] },
    callout: { type: 'tip', title: 'Ordered Collection', message: 'ArrayList maintains insertion order. Elements are accessed by index (0-based). get(0) returns first element, get(1) returns second.', messageUrdu: 'ArrayList insertion order maintain karta hai. Elements index se access hote hain (0-based). get(0) pehla element deta hai, get(1) doosra.' },
  },
  {
    id: 5, codeLine: 10,
    description: 'HashMap: stores key-value pairs. Each key maps to exactly one value.',
    descriptionUrdu: 'HashMap: key-value pairs store karta hai. Har key ek value ko map karti hai.',
    codeAction: { type: 'CREATE_HASHMAP', sourceLine: 10, className: 'String', variableName: 'grades' },
    worldAction: { type: 'SHOW_HASHMAP_BUCKETS', message: 'HashMap<String, Integer> created — hash buckets initialized' },
    callout: { type: 'concept', title: 'HashMap', message: 'HashMap<K,V> stores key-value pairs. It uses hashCode() to find the right "bucket" for each key. Retrieval is O(1) — extremely fast regardless of size.', messageUrdu: 'HashMap<K,V> key-value pairs store karta hai. Ye hashCode() use karta hai har key ke liye sahi "bucket" dhoondne ke liye. Retrieval O(1) hai — size se independent bohot fast.' },
  },
  {
    id: 6, codeLine: 12,
    description: 'put() maps "Ali" → 95. The key "Ali" hashes to a bucket.',
    descriptionUrdu: 'put() "Ali" → 95 map karta hai. Key "Ali" ek bucket mein hash hoti hai.',
    codeAction: { type: 'ADD_TO_COLLECTION', sourceLine: 12, className: 'HashMap', variableName: 'grades' },
    worldAction: { type: 'SHOW_HASHMAP_BUCKETS', message: 'grades.put("Ali", 95) — bucket[3] → "Ali":95' },
    callout: { type: 'remember', title: 'Key Hashing', message: 'When you put("Ali", 95), Java calls "Ali".hashCode(), computes a bucket index, and stores the entry there. The same key always maps to the same bucket.', messageUrdu: 'Jab put("Ali", 95) karte hain, Java "Ali".hashCode() call karta hai, bucket index compute karta hai, aur entry wahan store karta hai. Same key hamesha same bucket mein map hoti hai.' },
  },
  {
    id: 7, codeLine: 13,
    description: 'Add more entries: "Sara" → 88, "Hamza" → 92 — different keys, different buckets.',
    descriptionUrdu: 'Aur entries add karo: "Sara" → 88, "Hamza" → 92 — alag keys, alag buckets.',
    codeAction: { type: 'ADD_TO_COLLECTION', sourceLine: 13, className: 'HashMap', variableName: 'grades' },
    worldAction: { type: 'SHOW_HASHMAP_BUCKETS', message: 'HashMap grows: 3 entries in hash buckets' },
  },
  {
    id: 8, codeLine: 15,
    description: 'HashSet: stores ONLY unique elements. Duplicates are automatically rejected.',
    descriptionUrdu: 'HashSet: SIRF unique elements store karta hai. Duplicates automatically reject ho jate hain.',
    codeAction: { type: 'CREATE_HASHSET', sourceLine: 15, className: 'String', variableName: 'uniqueNames' },
    worldAction: { type: 'SHOW_INFO', message: 'HashSet<String> created — enforces uniqueness' },
    callout: { type: 'concept', title: 'HashSet', message: 'HashSet uses hashCode() and equals() to determine uniqueness. If you add "Ali" twice, only one "Ali" is stored. Perfect for removing duplicates.', messageUrdu: 'HashSet hashCode() aur equals() use karta hai uniqueness determine karne ke liye. Agar "Ali" do baar add karo, sirf ek "Ali" store hota hai. Duplicates remove karne ke liye perfect.' },
  },
  {
    id: 9, codeLine: 17,
    description: 'add("Ali") returns true. add("Ali") again returns false — already exists!',
    descriptionUrdu: 'add("Ali") true return karta hai. add("Ali") phir se false return karta hai — pehle se hai!',
    codeAction: { type: 'ADD_TO_COLLECTION', sourceLine: 17, className: 'HashSet', variableName: 'uniqueNames' },
    worldAction: { type: 'SHOW_INFO', message: 'uniqueNames.add("Ali") → true | uniqueNames.add("Ali") → false (duplicate rejected)' },
    callout: { type: 'remember', title: 'Duplicate Rejection', message: 'Set.add() returns false if the element already exists. The Set remains unchanged. This is how Sets maintain uniqueness — they use equals() to compare.', messageUrdu: 'Set.add() false return karta hai agar element pehle se ho. Set unchanged rehta hai. Ye Sets uniqueness maintain karte hain — ye equals() use karte hain compare karne ke liye.' },
  },
  {
    id: 10, codeLine: 20,
    description: 'For-each loop: iterates over every element in the collection.',
    descriptionUrdu: 'For-each loop: collection ke har element par iterate karta hai.',
    codeAction: { type: 'ITERATE_COLLECTION', sourceLine: 20, className: 'Student', variableName: 'list' },
    worldAction: { type: 'SHOW_ITERATION_TRAVERSAL', message: 'For-each: visiting each Student in the ArrayList sequentially' },
    callout: { type: 'concept', title: 'Iteration', message: 'for (Student s : list) iterates over each element. The loop variable "s" takes the value of each element in order. You cannot modify the collection during iteration (ConcurrentModificationException).', messageUrdu: 'for (Student s : list) har element par iterate karta hai. Loop variable "s" har element ki value order mein leta hai. Iteration ke dauran collection modify nahi kar sakte (ConcurrentModificationException).' },
  },
  {
    id: 11, codeLine: 25,
    description: 'Generics enforce type safety. Adding a String to ArrayList<Student> causes a compile error.',
    descriptionUrdu: 'Generics type safety enforce karte hain. ArrayList<Student> mein String add karna compile error deta hai.',
    codeAction: { type: 'USE_GENERIC_TYPE', sourceLine: 25, errorMessage: 'compile error: String cannot be converted to Student' },
    worldAction: { type: 'SHOW_GENERIC_ENFORCE', message: 'Type mismatch: String cannot be added to ArrayList<Student>' },
    callout: { type: 'exam', title: 'Generics = Type Safety', message: 'Generics were added in Java 5. Before generics, Collections stored Object — you had to cast manually and risked ClassCastException. Generics catch type errors at compile time.', messageUrdu: 'Generics Java 5 mein add hue. Generics se pehle Collections Object store karte the — manually cast karna padta tha aur ClassCastException ka risk tha. Generics compile-time pe type errors pakadte hain.' },
  },
  {
    id: 12, codeLine: 30,
    description: 'Collections.sort() — uses Comparable or Comparator to order elements.',
    descriptionUrdu: 'Collections.sort() — elements ko order karne ke liye Comparable ya Comparator use karta hai.',
    codeAction: { type: 'SORT_COLLECTION', sourceLine: 30, className: 'Student', variableName: 'list' },
    worldAction: { type: 'SHOW_SORT_REORDER', message: 'Sorted by name: Ali → Hamza → Sara (alphabetical)' },
    callout: { type: 'concept', title: 'Sorting', message: 'sort() requires elements to implement Comparable (natural order) or you provide a Comparator (custom order). For Student objects, sorting by name alphabetically is natural order.', messageUrdu: 'sort() require karta hai ke elements Comparable implement karein (natural order) ya aap Comparator dein (custom order). Student objects ke liye name se alphabetical sorting natural order hai.' },
  },
];

const COLLECTIONS_MISSION: Mission = {
  id: 'mission-coll-001',
  title: 'MISSION — Collection Mastery',
  titleUrdu: 'MISSION — Collection Mastery',
  description: 'Create and manipulate ArrayList, HashMap, and HashSet. Use generics and iteration.',
  descriptionUrdu: 'ArrayList, HashMap, aur HashSet banao aur manipulate karo. Generics aur iteration use karo.',
  status: 'active',
  objectives: [
    { id: 'col-1', description: 'Create an ArrayList with generic type', descriptionUrdu: 'Generic type se ArrayList banao', completed: false, type: 'create-arraylist', targetCount: 1, currentCount: 0 },
    { id: 'col-2', description: 'Add elements to the ArrayList', descriptionUrdu: 'ArrayList mein elements add karo', completed: false, type: 'create-arraylist', targetCount: 2, currentCount: 0 },
    { id: 'col-3', description: 'Create a HashMap and add entries', descriptionUrdu: 'HashMap banao aur entries add karo', completed: false, type: 'create-hashmap', targetCount: 1, currentCount: 0 },
    { id: 'col-4', description: 'Iterate over a collection', descriptionUrdu: 'Collection par iterate karo', completed: false, type: 'iterate-collection', targetCount: 1, currentCount: 0 },
    { id: 'col-5', description: 'Use generic type parameter', descriptionUrdu: 'Generic type parameter use karo', completed: false, type: 'use-generic', targetCount: 1, currentCount: 0 },
  ],
  xpReward: 80,
};

WORLD_CONFIGS.push({
  id: 'collections',
  title: 'Collections Data Lab',
  titleUrdu: 'Collections Data Lab',
  description: 'Master ArrayList, HashMap, HashSet — add, remove, iterate, sort, and understand generics.',
  descriptionUrdu: 'ArrayList, HashMap, HashSet master karo — add, remove, iterate, sort, aur generics samjho.',
  difficulty: 'hard',
  estimatedMinutes: 20,
  xpReward: 80,
  concept: 'Java Collections Framework',
  conceptUrdu: 'Java Collections Framework',
  moduleAssociation: 'module-12',
  sceneType: 'collections-lab',
  initialClass: COLLECTIONS_STUDENT_CLASS,
  initialSteps: COLLECTIONS_STEPS,
  initialMission: COLLECTIONS_MISSION,
  environmentConfig: { primaryColor: '#f59e0b', secondaryColor: '#d97706', accentColor: '#fbbf24', floorColor: '#1a150a', fogColor: '#100d05', ambientIntensity: 0.4, showGrid: true, cameraPosition: [10, 8, 10], cameraTarget: [0, 0, 0] },
});

// ═══════════════════════════════════════════════════════════════
// WORLD 12: OOP ARCHITECTURE LAB
// ═══════════════════════════════════════════════════════════════

import { ARCHITECTURE_CLASSES, ARCHITECTURE_STEPS, ARCHITECTURE_MISSION } from '@/data/architectureLabData';

WORLD_CONFIGS.push({
  id: 'architecture',
  title: 'OOP Architecture Lab',
  titleUrdu: 'OOP Architecture Lab',
  description: 'Build relationships. Design better classes. Create maintainable systems with SOLID principles.',
  descriptionUrdu: 'Relationships banao. Behtar classes design karo. SOLID principles se maintainable systems banao.',
  difficulty: 'hard',
  estimatedMinutes: 30,
  xpReward: 200,
  concept: 'Object Relationships & SOLID',
  conceptUrdu: 'Object Relationships aur SOLID',
  moduleAssociation: 'module-13',
  sceneType: 'architecture-lab',
  initialClass: ARCHITECTURE_CLASSES[0],
  initialSteps: ARCHITECTURE_STEPS,
  initialMission: ARCHITECTURE_MISSION,
  environmentConfig: { primaryColor: '#6366f1', secondaryColor: '#4f46e5', accentColor: '#818cf8', floorColor: '#0c0a1a', fogColor: '#070515', ambientIntensity: 0.4, showGrid: true, cameraPosition: [12, 8, 12], cameraTarget: [0, 0, 0] },
});

// ═══════════════════════════════════════════════════════════════
// WORLD 13: ADVANCED OOP DESIGN LAB
// ═══════════════════════════════════════════════════════════════

import { DESIGN_LAB_CLASSES, DESIGN_LAB_STEPS, DESIGN_LAB_MISSION } from '@/data/designLabData';

WORLD_CONFIGS.push({
  id: 'design-lab',
  title: 'Advanced OOP Design Lab',
  titleUrdu: 'Advanced OOP Design Lab',
  description: 'Design real systems. Apply OOP. Refactor like an engineer. Transform requirements into maintainable object-oriented systems.',
  descriptionUrdu: 'Real systems design karo. OOP apply karo. Engineer ki tarah refactor karo. Requirements ko maintainable object-oriented systems mein transform karo.',
  difficulty: 'hard',
  estimatedMinutes: 35,
  xpReward: 300,
  concept: 'Advanced OOP Design',
  conceptUrdu: 'Advanced OOP Design',
  moduleAssociation: 'module-15',
  sceneType: 'design-studio',
  initialClass: DESIGN_LAB_CLASSES[0],
  initialSteps: DESIGN_LAB_STEPS,
  initialMission: DESIGN_LAB_MISSION,
  environmentConfig: { primaryColor: '#ec4899', secondaryColor: '#db2777', accentColor: '#f472b6', floorColor: '#1a0a14', fogColor: '#10050d', ambientIntensity: 0.4, showGrid: true, cameraPosition: [12, 8, 12], cameraTarget: [0, 0, 0] },
});

export const ADDITIONAL_CLASSES: Record<string, ClassBlueprint[]> = {
  constructors: [STUDENT_WITH_CONSTRUCTOR],
  encapsulation: [BANK_ACCOUNT_CLASS],
  inheritance: [PERSON_CLASS, STUDENT_INHERITED, TEACHER_INHERITED],
  polymorphism: [ANIMAL_CLASS, DOG_CLASS, CAT_CLASS],
  abstraction: [SHAPE_ABSTRACT_CLASS, CIRCLE_CLASS, RECTANGLE_CLASS],
  interfaces: [PAYMENT_INTERFACE, CARD_PAYMENT_CLASS, CASH_PAYMENT_CLASS],
  'java-runtime': [RUNTIME_STUDENT_CLASS],
  'packages': [PACKAGE_STUDENT_CLASS],
  'exceptions': [],
  'collections': [COLLECTIONS_STUDENT_CLASS],
  'architecture': ARCHITECTURE_CLASSES,
  'design-lab': DESIGN_LAB_CLASSES,
};

export function getWorldConfig(id: WorldId): WorldConfig | undefined {
  return WORLD_CONFIGS.find(w => w.id === id);
}

export function getWorldsByDifficulty(difficulty: WorldConfig['difficulty']): WorldConfig[] {
  return WORLD_CONFIGS.filter(w => w.difficulty === difficulty);
}
