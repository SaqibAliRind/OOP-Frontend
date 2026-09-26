import type { Module } from '@/types';

export const module01: Module = {
  id: 'module-01',
  title: 'OOP Foundation',
  slug: 'oop-foundation',
  order: 1,
  description: 'Build a strong foundation in Object-Oriented Programming. Understand why OOP exists, how it differs from procedural programming, and the core concepts that make Java a powerful OOP language.',
  icon: 'BookOpen',
  color: '#3b82f6',
  xpReward: 500,
  isUnlocked: true,
  completed: false,
  progress: 0,
  totalDuration: 240,
  prerequisiteModuleIds: [],
  lessons: [
    {
      id: 'lesson-01-01',
      moduleId: 'module-01',
      title: 'Introduction to OOP',
      slug: 'introduction-to-oop',
      order: 1,
      duration: 15,
      description: 'Understand what Object-Oriented Programming is, why it was invented, and how it models real-world problems.',
      learningObjectives: [
        { id: 'lo-01-01-1', description: 'Define Object-Oriented Programming', completed: false },
        { id: 'lo-01-01-2', description: 'Explain why OOP was developed', completed: false },
        { id: 'lo-01-01-3', description: 'Distinguish between procedural and OOP approaches', completed: false },
        { id: 'lo-01-01-4', description: 'Identify real-world objects and their properties', completed: false },
      ],
      englishExplanation: {
        id: 'ee-01-01',
        text: `Object-Oriented Programming (OOP) is a programming paradigm that organizes software design around objects rather than functions and logic. An object is a data field that has unique attributes and behavior.

OOP was developed in the 1960s-70s to address the limitations of procedural programming. As software systems grew larger, procedural code became difficult to maintain, debug, and extend. OOP provides a natural way to model real-world entities in code.

The core idea is simple: instead of writing a long sequence of instructions (procedural), you create independent objects that interact with each other. Each object contains both data (attributes) and code (methods) that operates on that data.

Java is designed as an OOP language from the ground up. Everything in Java exists inside a class. There are no standalone functions — every function must belong to a class. This enforcement makes Java a pure OOP language.

The four pillars of OOP are:
1. Encapsulation — bundling data and methods, hiding internal details
2. Inheritance — creating new classes from existing ones
3. Polymorphism — one interface, multiple implementations
4. Abstraction — showing only essential features, hiding complexity

Understanding these concepts is fundamental because they appear in every Java program you will write. From simple console applications to enterprise banking systems, OOP principles guide how code is structured, maintained, and extended.`
      },
      romanUrduExplanation: {
        id: 'ru-01-01',
        text: `Object-Oriented Programming (OOP) ek programming paradigm hai jo software design ko objects ke around organize karta hai. Object ek data field hai jisme unique attributes aur behavior hoti hai.

OOP ko 1960s-70s mein develop kiya gaya tha taake procedural programming ki limitations ko address kiya ja sake. Jaise-jaise software systems bade hue, procedural code ko maintain karna, debug karna aur extend karna mushkil ho gaya. OOP real-world entities ko code mein model karne ka natural tarika provide karta hai.

Core idea simple hai: lambi sequence of instructions likhne ki bajaye (procedural), aap independent objects create karte hain jo ek dusre se interact karte hain. Har object mein data (attributes) aur code (methods) dono hote hain.

Java ko ground-up se OOP language ke taur par design kiya gaya hai. Java mein har cheez class ke andar hoti hai. Koi standalone functions nahi hain — har function ko class ke andar hona padta hai.

OOP ke four pillars hain:
1. Encapsulation — data aur methods ko bundle karna, internal details chupana
2. Inheritance — existing classes se nayi classes banana
3. Polymorphism — ek interface, multiple implementations
4. Abstraction — sirf essential features dikhana, complexity chupana

Ye concepts samajhna isliye zaroori hai kyunki ye har Java program mein appear hote hain. Simple console applications se lekar enterprise banking systems tak, OOP principles guide karte hain ke code kaise structured, maintained aur extended hota hai.`
      },
      keyPoints: [
        { id: 'kp-01-01-1', title: 'Class', description: 'A blueprint or template that defines the structure and behavior of objects. It is like an architectural plan that defines rooms, doors, and windows — but is not the actual building itself.' },
        { id: 'kp-01-01-2', title: 'Object', description: 'An instance of a class. If a class is a blueprint for a Student, then an object is a specific student like "Ahmed" or "Sara" with actual values for name, age, and grade.' },
        { id: 'kp-01-01-3', title: 'Attributes', description: 'Properties or characteristics of an object. For a Student object: name, age, grade, enrollmentId. These are also called fields or instance variables.' },
        { id: 'kp-01-01-4', title: 'Methods', description: 'Actions or behaviors that an object can perform. For a Student: study(), attendClass(), takeExam(). Methods define what an object can do.' },
        { id: 'kp-01-01-5', title: 'Four Pillars', description: 'Encapsulation, Inheritance, Polymorphism, and Abstraction are the four fundamental principles that make OOP powerful and organized.' },
      ],
      codeExamples: [
        {
          id: 'ce-01-01-1',
          title: 'Defining a Student Class',
          code: `public class Student {
    // Attributes (fields)
    String name;
    int age;
    double gpa;

    // Method (behavior)
    void study() {
        System.out.println(name + " is studying.");
    }

    void takeExam(String subject) {
        System.out.println(name + " is taking " + subject + " exam.");
    }
}`,
          language: 'java',
          explanation: 'This class defines what a Student looks like: it has three attributes (name, age, gpa) and two methods (study, takeExam). This is the blueprint — not an actual student yet.',
        },
        {
          id: 'ce-01-01-2',
          title: 'Creating Objects from the Class',
          code: `public class Main {
    public static void main(String[] args) {
        // Creating objects (instances of Student)
        Student student1 = new Student();
        student1.name = "Ahmed";
        student1.age = 20;
        student1.gpa = 3.7;

        Student student2 = new Student();
        student2.name = "Sara";
        student2.age = 22;
        student2.gpa = 3.9;

        // Using methods
        student1.study();          // Ahmed is studying.
        student2.takeExam("OOP"); // Sara is taking OOP exam.
    }
}`,
          language: 'java',
          output: `Ahmed is studying.
Sara is taking OOP exam.`,
          explanation: 'We create two Student objects with different data. Each object has its own name, age, and gpa. The same methods (study, takeExam) work differently for each object based on their data.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-01-01-1',
          title: 'University Management System',
          scenario: 'In a university, there are Students, Professors, Courses, and Departments. Each entity has unique attributes and behaviors. A Student has a name, roll number, and enrolled courses. A Professor has a name, specialization, and courses taught.',
          oopConcept: 'Each entity becomes a class. Student objects store student data. Professor objects store professor data. They interact: a Professor teaches Courses, a Student enrolls in Courses.',
          codeExample: {
            id: 'rwe-code-01-01-1',
            title: 'University Entities as Classes',
            code: `class Student {
    String name;
    String rollNumber;
    void enroll(Course course) { ... }
}

class Professor {
    String name;
    String specialization;
    void teach(Course course) { ... }
}

class Course {
    String title;
    int credits;
}`,
            language: 'java',
          },
        },
        {
          id: 'rwe-01-01-2',
          title: 'Banking System',
          scenario: 'A bank has Accounts, Transactions, and Customers. Each account has a balance, account number, and owner. Accounts can deposit, withdraw, and transfer money.',
          oopConcept: 'The Account class defines deposit() and withdraw() methods. Each account object maintains its own balance. The bank can manage thousands of account objects independently.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-01-01-1',
          title: 'Confusing Class with Object',
          incorrectCode: `// Thinking this IS a student:
Student student = new Student();
// "student" is an OBJECT, not a class`,
          correctCode: `// Class = blueprint
class Student { String name; }

// Object = instance of the blueprint
Student student = new Student();
// "student" is an OBJECT created from the Student CLASS`,
          explanation: 'A class is the definition. An object is the actual thing created from that definition. You cannot have data until you create an object. The class itself has no name value until an object is created.',
        },
        {
          id: 'cm-01-01-2',
          title: 'Expecting Class to Have Values',
          incorrectCode: `// Wrong: trying to access Student.name directly
// (before creating any object)
System.out.println(Student.name); // Error!`,
          correctCode: `// Correct: create an object first, then access its data
Student s = new Student();
s.name = "Ahmed";
System.out.println(s.name); // Ahmed`,
          explanation: 'A class is just a blueprint. It does not have values like "name" or "age" — only objects do. You must create an object before you can store or access data.',
        },
      ],
      examNotes: [
        { id: 'en-01-01-1', title: 'OOP Definition', content: 'OOP is a paradigm where software is organized around objects containing data and methods, not just functions. exams often ask for a clear definition with examples.', importance: 'high' },
        { id: 'en-01-01-2', title: 'Class vs Object', content: 'Class = blueprint/template. Object = instance/real entity. Class defines structure. Object holds actual data. This distinction is frequently tested.', importance: 'high' },
        { id: 'en-01-01-3', title: 'Four Pillars Overview', content: 'Know the names and brief meaning of all four pillars. Exam questions may ask you to list them or explain one briefly.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-01-01-1', question: 'What is Object-Oriented Programming?', answer: 'OOP is a programming paradigm that organizes code around objects. Objects contain data (attributes) and code (methods). It models real-world entities naturally.', difficulty: 'easy' },
        { id: 'vq-01-01-2', question: 'Why was OOP developed?', answer: 'OOP was developed to handle the complexity of large software systems. Procedural code became hard to maintain and extend. OOP provides modularity, reusability, and better organization.', difficulty: 'medium' },
        { id: 'vq-01-01-3', question: 'What are the four pillars of OOP?', answer: 'Encapsulation (hiding data), Inheritance (reusing code through hierarchy), Polymorphism (one interface, multiple forms), Abstraction (hiding complexity, showing essentials).', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-01-01-1', type: 'mcq', question: 'What is a Class in OOP?', options: ['An instance of an object', 'A blueprint or template for creating objects', 'A variable that stores data', 'A method that performs actions'], correctAnswer: 'A blueprint or template for creating objects', explanation: 'A class defines the structure and behavior that objects will have. It is not an object itself — it is the template from which objects are created.' },
        { id: 'qc-01-01-2', type: 'true-false', question: 'An object is an instance of a class.', correctAnswer: 'True', explanation: 'Correct. An object is created from a class using the new keyword. The class is the blueprint; the object is the actual entity with real data.' },
        { id: 'qc-01-01-3', type: 'mcq', question: 'Which of the following is NOT a pillar of OOP?', options: ['Encapsulation', 'Inheritance', 'Compilation', 'Polymorphism'], correctAnswer: 'Compilation', explanation: 'The four pillars are Encapsulation, Inheritance, Polymorphism, and Abstraction. Compilation is a process in Java but not an OOP pillar.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-01-01-1',
          title: 'Design a Student System',
          scenario: 'You are building a university system. You need to represent students with names, roll numbers, and GPAs. Each student can study and take exams.',
          question: 'How would you model this using OOP?',
          type: 'concept-application',
          options: [
            'Create a Student class with attributes (name, rollNumber, gpa) and methods (study, takeExam)',
            'Create separate variables for each student: studentName1, studentName2, etc.',
            'Write one function that handles all students using global variables',
            'Create an array of strings to store student information',
          ],
          correctAnswer: 'Create a Student class with attributes (name, rollNumber, gpa) and methods (study, takeExam)',
          explanation: 'OOP models entities as classes. The Student class bundles data (attributes) and behavior (methods) together. Each student becomes an object of this class.',
          relatedConcepts: ['class', 'object', 'attributes', 'methods'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-foundation-intro',
      prerequisites: [],
      xpReward: 50,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'oop-foundation',
      difficulty: 'beginner',
      estimatedMinutes: 15,
    },
    {
      id: 'lesson-01-02',
      moduleId: 'module-01',
      title: 'Classes vs Objects Deep Dive',
      slug: 'classes-vs-objects-deep-dive',
      order: 2,
      duration: 20,
      description: 'Explore the fundamental difference between classes and objects with practical examples and hands-on understanding.',
      learningObjectives: [
        { id: 'lo-01-02-1', description: 'Explain the difference between a class and an object', completed: false },
        { id: 'lo-01-02-2', description: 'Create multiple objects from a single class', completed: false },
        { id: 'lo-01-02-3', description: 'Understand that objects have independent state', completed: false },
        { id: 'lo-01-02-4', description: 'Identify classes and objects in real-world scenarios', completed: false },
      ],
      englishExplanation: {
        id: 'ee-01-02',
        text: `A class is a logical definition. An object is a physical entity in memory. When you write \`class Student { String name; }\`, you have defined what a Student looks like — but no Student exists yet. When you write \`Student s = new Student();\`, Java allocates memory and creates an actual Student object.

Think of it this way: an architect draws a blueprint for a house. The blueprint defines rooms, doors, and windows. But you cannot live in a blueprint. You need to build actual houses from it. The blueprint is the class. The house is the object.

One class can create unlimited objects. Each object has its own copy of attributes. If you create 100 Student objects, each has its own name, age, and GPA. Changing one object's name does not affect any other object.

In Java, objects are created on the heap memory using the \`new\` keyword. The variable (like \`s\`) is a reference — it points to the object's location in memory. It does not contain the object itself.

Object State: The current values of an object's attributes. For Student s, if s.name = "Ahmed" and s.age = 20, that is the object's state.

Object Behavior: What an object can do. Methods define behavior. s.study() and s.takeExam() are behaviors.

Two objects of the same class are independent. Changing one does not affect the other. This independence is a core benefit of OOP.`
      },
      romanUrduExplanation: {
        id: 'ru-01-02',
        text: `Class ek logical definition hai. Object memory mein ek physical entity hai. Jab aap \`class Student { String name; }\` likhte hain, toh aapne define kiya hai ke Student kaisa dikhta hai — lekin abhi koi Student exist nahi karta. Jab aap \`Student s = new Student();\` likhte hain, toh Java memory allocate karta hai aur ek actual Student object create karta hai.

Is tarah samajhein: ek architect ghar ka blueprint banata hai. Blueprint mein rooms, doors aur windows define hote hain. Lekin aap blueprint mein reh nahi sakte. Aapko use karke actual ghar banana padta hai. Blueprint class hai. Ghar object hai.

Ek class se unlimited objects ban sakte hain. Har object ke apne attributes ki copy hoti hai. Agar aap 100 Student objects banayein, toh har ek ke apne name, age aur GPA honge. Ek object ka name change karne se doosre par koi asar nahi padta.

Java mein, objects heap memory mein \`new\` keyword se create hote hain. Variable (jaise \`s\`) ek reference hai — ye object ke location ko point karta hai. Ye object khud contain nahi karta.

Object State: Object ke attributes ki current values. Agar s.name = "Ahmed" aur s.age = 20, toh ye object ki state hai.

Object Behavior: Object kya kar sakta hai. Methods behavior define karte hain. s.study() aur s.takeExam() behaviors hain.

Ek hi class ke do objects independent hain. Ek ko change karne se doosre par koi asar nahi padta. Ye independence OOP ka core benefit hai.`
      },
      keyPoints: [
        { id: 'kp-01-02-1', title: 'Class = Blueprint', description: 'A class is a template. It defines what attributes and methods objects will have, but holds no data itself.' },
        { id: 'kp-01-02-2', title: 'Object = Instance', description: 'An object is a real entity created from a class. It lives in memory and has actual values for its attributes.' },
        { id: 'kp-01-02-3', title: 'new Keyword', description: 'The new keyword tells Java to create a new object in heap memory and return a reference to it.' },
        { id: 'kp-01-02-4', title: 'Independent State', description: 'Each object has its own copy of attributes. Changing one object does not affect others created from the same class.' },
      ],
      codeExamples: [
        {
          id: 'ce-01-02-1',
          title: 'One Class, Multiple Objects',
          code: `public class Main {
    public static void main(String[] args) {
        // First object
        Student s1 = new Student();
        s1.name = "Ahmed";
        s1.age = 20;

        // Second object — independent of s1
        Student s2 = new Student();
        s2.name = "Sara";
        s2.age = 22;

        // Changing s1 does NOT affect s2
        s1.name = "Ali";
        System.out.println(s1.name); // Ali
        System.out.println(s2.name); // Sara (unchanged)
    }
}`,
          language: 'java',
          output: `Ali
Sara`,
          explanation: 's1 and s2 are two independent objects. Changing s1.name to "Ali" has no effect on s2.name. Each object maintains its own state.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-01-02-1',
          title: 'Bank Accounts',
          scenario: 'A bank has thousands of customers. Each customer has an account with a unique account number, balance, and owner name.',
          oopConcept: 'The Account class is the blueprint. Each customer gets their own Account object with independent balance. One customer withdrawing money does not affect another customer\'s balance.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-01-02-1',
          title: 'Thinking Object Variables Hold the Object',
          incorrectCode: `// Misconception: s1 "contains" the student
// Actually, s1 is a REFERENCE (pointer) to the object
Student s1 = new Student();
// s1 --> [Student object in heap memory]`,
          correctCode: `// s1 stores a reference (address), not the object itself
Student s1 = new Student();
// s1 = reference --> [object in heap]
// The object lives in heap memory
// s1 just points to it`,
          explanation: 'In Java, variables like s1 do not contain objects. They contain references (memory addresses) that point to objects in heap memory. This is why assignment copies the reference, not the object.',
        },
      ],
      examNotes: [
        { id: 'en-01-02-1', title: 'Memory Model', content: 'Objects live in heap memory. Reference variables live in stack memory. The reference points to the object. This is important for understanding pass-by-reference behavior.', importance: 'medium' },
        { id: 'en-01-02-2', title: 'Object Independence', content: 'Two objects of the same class are completely independent. Changing one does not affect the other. This is a key advantage of OOP.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-01-02-1', question: 'What is the difference between a class and an object?', answer: 'A class is a blueprint or template that defines structure and behavior. An object is an actual instance created from that class, with real data in memory.', difficulty: 'easy' },
        { id: 'vq-01-02-2', question: 'What happens when you use the new keyword?', answer: 'The new keyword allocates memory for a new object on the heap, calls the constructor, and returns a reference to the newly created object.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-01-02-1', type: 'mcq', question: 'Where do Java objects live in memory?', options: ['Stack memory', 'Heap memory', 'Register', 'Cache'], correctAnswer: 'Heap memory', explanation: 'Objects are always created on the heap memory using the new keyword. Reference variables that point to these objects live on the stack.' },
        { id: 'qc-01-02-2', type: 'true-false', question: 'Changing one object affects all other objects of the same class.', correctAnswer: 'False', explanation: 'Each object has its own independent copy of attributes. Changing one object does not affect any other object.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-01-02-1',
          scenario: 'You have created two Account objects from the Account class. Account a1 has balance 5000. Account a2 has balance 10000. You call a1.withdraw(2000).',
          question: 'What happens to a2\'s balance?',
          type: 'concept-application',
          options: [
            'a2\'s balance becomes 8000',
            'a2\'s balance remains 10000',
            'Both balances become 3000',
            'An error occurs',
          ],
          correctAnswer: 'a2\'s balance remains 10000',
          explanation: 'Objects are independent. Withdrawing from a1 only affects a1\'s balance. a2 remains unchanged because each object has its own state.',
          relatedConcepts: ['object-independence', 'object-state'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-class-object',
      prerequisites: ['lesson-01-01'],
      xpReward: 75,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'class-blueprint',
      difficulty: 'beginner',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-01-03',
      moduleId: 'module-01',
      title: 'The Four Pillars Overview',
      slug: 'four-pillars-overview',
      order: 3,
      duration: 25,
      description: 'Get an overview of the four fundamental pillars of OOP: Encapsulation, Inheritance, Polymorphism, and Abstraction.',
      learningObjectives: [
        { id: 'lo-01-03-1', description: 'Name and briefly define all four OOP pillars', completed: false },
        { id: 'lo-01-03-2', description: 'Understand why each pillar is important', completed: false },
        { id: 'lo-01-03-3', description: 'Identify which pillar applies to a given scenario', completed: false },
      ],
      englishExplanation: {
        id: 'ee-01-03',
        text: `The four pillars of OOP are the foundation upon which all Java programming is built. Each pillar solves a specific problem in software design.

**Encapsulation** is about bundling data and methods that operate on that data into a single unit (class), and restricting direct access to some components. Think of it as a protective wrapper. A banking application encapsulates account balance — you cannot directly set balance = 1000000. You must go through deposit() and withdraw() methods that validate the transaction.

**Inheritance** allows a new class to inherit attributes and methods from an existing class. A \`GraduateStudent\` inherits everything from \`Student\` but can add thesis-related methods. This promotes code reuse and establishes IS-A relationships.

**Polymorphism** means "many forms." One method name can have different behaviors depending on the object. A \`draw()\` method draws a circle for Circle objects and a rectangle for Rectangle objects. The same method call produces different results based on the actual object type.

**Abstraction** hides complex implementation details and shows only the essential features. When you use \`System.out.println()\`, you do not need to know how Java converts data to characters and sends them to the console. You just call the method and it works.

These four pillars work together. Encapsulation protects data. Inheritance reuses code. Polymorphism provides flexibility. Abstraction reduces complexity. Mastering them is essential for writing professional Java code.`
      },
      romanUrduExplanation: {
        id: 'ru-01-03',
        text: `OOP ke four pillars wo foundation hain jis par saara Java programming build hota hai. Har pillar software design mein ek specific problem solve karta hai.

**Encapsulation** data aur us par operate karne wale methods ko ek single unit (class) mein bundle karna hai, aur kuch components ki direct access restrict karna hai. Jaise ek protective wrapper. Banking application account balance ko encapsulate karta hai — aap seedha balance = 1000000 set nahi kar sakte. Aapko deposit() aur withdraw() methods se guzarna padta hai jo transaction validate karte hain.

**Inheritance** ek nayi class ko maujuda class se attributes aur methods inherit karne deta hai. \`GraduateStudent\` \`Student\` se sab kuch inherit karta hai lekin thesis-related methods add kar sakta hai. Ye code reuse promote karta hai aur IS-A relationships establish karta hai.

**Polymorphism** ka matlab hai "many forms." Ek method name ke alag-alag behaviors ho sakte hain object ke according. \`draw()\` method Circle objects ke liye circle draw karta hai aur Rectangle objects ke liye rectangle. Wahi method call alag-alag results produce karta hai.

**Abstraction** complex implementation details chupata hai aur sirf essential features dikhata hai. Jab aap \`System.out.println()\` use karte hain, aapko pata nahi hota ke Java data ko characters mein kaise convert karta hai. Aap sirf method call karte hain aur kaam ho jata hai.

Ye four pillars milkar kaam karte hain. Encapsulation data protect karta hai. Inheritance code reuse karta hai. Polymorphism flexibility deta hai. Abstraction complexity reduce karta hai. Inhe mastery karna professional Java code likhne ke liye zaroori hai.`
      },
      keyPoints: [
        { id: 'kp-01-03-1', title: 'Encapsulation', description: 'Bundling data and methods, restricting direct access. Protects internal state. Example: private fields with public getters/setters.' },
        { id: 'kp-01-03-2', title: 'Inheritance', description: 'Creating new classes from existing ones. Promotes code reuse. Establishes IS-A relationships. Example: GraduateStudent extends Student.' },
        { id: 'kp-01-03-3', title: 'Polymorphism', description: 'One interface, many implementations. Same method call, different behavior. Example: draw() draws different shapes.' },
        { id: 'kp-01-03-4', title: 'Abstraction', description: 'Hiding complexity, showing essentials. Example: println() hides I/O complexity. Users just call the method.' },
      ],
      codeExamples: [
        {
          id: 'ce-01-03-1',
          title: 'All Four Pillars in One Example',
          code: `// ABSTRACTION: User only sees "deposit" and "withdraw"
abstract class Account {
    abstract void deposit(double amount);
    abstract void withdraw(double amount);
}

// ENCAPSULATION: balance is private, accessed through methods
class BankAccount extends Account {
    private double balance;  // hidden from outside

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
        }
    }

    public double getBalance() { return balance; }
}

// INHERITANCE: SavingsAccount inherits from BankAccount
class SavingsAccount extends BankAccount {
    private double interestRate = 0.05;

    void applyInterest() {
        double interest = getBalance() * interestRate;
        deposit(interest);
    }
}

// POLYMORPHISM: same method name, different behavior
Account acc1 = new BankAccount();
Account acc2 = new SavingsAccount();
acc1.deposit(1000);  // basic deposit
acc2.deposit(1000);  // same method, different class behavior`,
          language: 'java',
          explanation: 'This single example demonstrates all four pillars working together in a realistic banking scenario.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-01-03-1',
          title: 'E-Commerce System',
          scenario: 'An online store has Products, Customers, Orders, and Payments. Each entity uses OOP principles.',
          oopConcept: 'Encapsulation: Product price is private, accessed through getPrice(). Inheritance: DigitalProduct and PhysicalProduct extend Product. Polymorphism: calculateShipping() works differently for digital vs physical. Abstraction: Payment process hides complex banking details.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-01-03-1',
          title: 'Confusing Overloading with Polymorphism',
          incorrectCode: `// Method overloading is NOT the same as polymorphism
class Calculator {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }
}
// This is compile-time polymorphism (overloading)
// Runtime polymorphism uses method overriding`,
          correctCode: `// Runtime polymorphism (true polymorphism)
class Shape {
    void draw() { System.out.println("Drawing shape"); }
}
class Circle extends Shape {
    @Override
    void draw() { System.out.println("Drawing circle"); }
}
class Rectangle extends Shape {
    @Override
    void draw() { System.out.println("Drawing rectangle"); }
}
// Same method call, different behavior at runtime`,
          explanation: 'Method overloading is compile-time polymorphism. True runtime polymorphism uses method overriding — where the actual method called depends on the object type at runtime.',
        },
      ],
      examNotes: [
        { id: 'en-01-03-1', title: 'Four Pillars Summary', content: 'Know each pillar with a real example. Exam: "Explain encapsulation with a Java example" or "Why does Java not support multiple inheritance?"', importance: 'high' },
        { id: 'en-01-03-2', title: 'Pillar Relationships', content: 'Pillars work together, not in isolation. Encapsulation protects, Inheritance reuses, Polymorphism flexes, Abstraction simplifies.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-01-03-1', question: 'Explain each pillar with one real-world example.', answer: 'Encapsulation: Bank balance accessed through methods only. Inheritance: SavingsAccount IS-A BankAccount. Polymorphism: draw() draws different shapes. Abstraction: println() hides I/O details.', difficulty: 'medium' },
        { id: 'vq-01-03-2', question: 'Why is encapsulation important?', answer: 'It protects data integrity. Direct access to balance could allow invalid states (negative balance, overdraft). Methods validate before modifying.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-01-03-1', type: 'mcq', question: 'Which pillar hides implementation details and shows only essential features?', options: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'], correctAnswer: 'Abstraction', explanation: 'Abstraction focuses on what an object does, not how it does it. It hides complexity behind simple interfaces.' },
        { id: 'qc-01-03-2', type: 'mcq', question: 'Which pillar allows a SavingsAccount to reuse code from BankAccount?', options: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'], correctAnswer: 'Inheritance', explanation: 'Inheritance lets a child class (SavingsAccount) inherit all methods and attributes from a parent class (BankAccount).' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-01-03-1',
          scenario: 'You are designing a hospital system. Patients have medical records. Doctors have specializations. The system needs to support different types of treatments.',
          question: 'Which OOP pillar would you use to ensure a doctor\'s salary is not directly accessible from outside the class?',
          type: 'concept-application',
          options: [
            'Encapsulation',
            'Inheritance',
            'Polymorphism',
            'Abstraction',
          ],
          correctAnswer: 'Encapsulation',
          explanation: 'Encapsulation restricts direct access to sensitive data. By making salary private and providing controlled access through methods, you protect the data.',
          relatedConcepts: ['encapsulation', 'data-hiding', 'access-modifiers'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-four-pillars',
      prerequisites: ['lesson-01-01', 'lesson-01-02'],
      xpReward: 100,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'four-pillars',
      difficulty: 'beginner',
      estimatedMinutes: 25,
    },
    {
      id: 'lesson-01-04',
      moduleId: 'module-01',
      title: 'What is Programming?',
      slug: 'what-is-programming',
      order: 4,
      duration: 12,
      description: 'Understand the basics of programming and how computers execute instructions.',
      learningObjectives: [
        { id: 'lo-01-04-1', description: 'Define programming in simple terms', completed: false },
        { id: 'lo-01-04-2', description: 'Explain how a computer executes instructions', completed: false },
      ],
      englishExplanation: {
        id: 'ee-01-04',
        text: `Programming is the process of writing instructions that a computer can understand and execute. These instructions are written in a programming language like Java, Python, or C++.

A computer does not understand human language. It understands binary (0s and 1s). Programming languages act as a bridge between human logic and machine execution. When you write Java code, a compiler translates it into bytecode, which the Java Virtual Machine (JVM) then executes.

Programming involves:
1. Understanding the problem
2. Designing a solution (algorithm)
3. Writing the solution in code
4. Testing and debugging
5. Maintaining the code

Every program is essentially a sequence of instructions that tell the computer what to do, in what order, and how to handle data. Programming is problem-solving expressed in a language the computer can execute.`
      },
      romanUrduExplanation: {
        id: 'ru-01-04',
        text: `Programming wo process hai jisme hum aise instructions likhte hain jo computer samajh sake aur execute kar sake. Ye instructions programming language mein likhi jaati hain jaise Java, Python ya C++.

Computer human language nahi samajhta. Ye sirf binary (0s aur 1s) samajhta hai. Programming languages human logic aur machine execution ke beech bridge ka kaam karti hain. Jab aap Java code likhte hain, compiler use bytecode mein translate karta hai, phir JVM execute karta hai.

Programming mein shamil hain:
1. Problem samajhna
2. Solution design karna (algorithm)
3. Code mein solution likhna
4. Testing aur debugging
5. Code maintain karna

Har program essentially ek sequence of instructions hai jo computer ko batati hai ke kya karna hai, kis order mein, aur data ko kaise handle karna hai.`
      },
      keyPoints: [
        { id: 'kp-01-04-1', title: 'Instructions', description: 'Programming is writing step-by-step instructions for a computer to follow.' },
        { id: 'kp-01-04-2', title: 'Programming Language', description: 'A bridge between human logic and machine execution. Java, Python, C++ are examples.' },
      ],
      codeExamples: [
        {
          id: 'ce-01-04-1',
          title: 'First Java Program',
          code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
          language: 'java',
          output: 'Hello, World!',
          explanation: 'This is the simplest Java program. It tells the computer to print "Hello, World!" to the screen. Every Java program starts with a class and a main method.',
        },
      ],
      realWorldExamples: [
        { id: 'rwe-01-04-1', title: 'Recipe as Program', scenario: 'A cooking recipe is like a program: step 1 boil water, step 2 add pasta, step 3 wait 10 minutes. Similarly, a program tells the computer step by step what to do.', oopConcept: 'Sequential instruction execution' },
      ],
      commonMistakes: [],
      examNotes: [{ id: 'en-01-04-1', title: 'Programming Definition', content: 'Programming is writing instructions for computers. It involves problem-solving, algorithm design, coding, testing, and maintenance.', importance: 'medium' }],
      vivaQuestions: [{ id: 'vq-01-04-1', question: 'What is programming?', answer: 'Programming is the process of writing instructions that a computer can understand and execute to solve a problem.', difficulty: 'easy' }],
      quickCheckQuestions: [
        { id: 'qc-01-04-1', type: 'true-false', question: 'A computer directly understands Java code.', correctAnswer: 'False', explanation: 'Java code is compiled to bytecode, which the JVM executes. The computer itself only understands machine code (binary).' },
      ],
      scenarioQuestions: [],
      prerequisites: [],
      xpReward: 30,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      difficulty: 'beginner',
      estimatedMinutes: 12,
    },
    {
      id: 'lesson-01-05',
      moduleId: 'module-01',
      title: 'Procedural Programming',
      slug: 'procedural-programming',
      order: 5,
      duration: 15,
      description: 'Learn about procedural programming, how it works, and its approach to solving problems.',
      learningObjectives: [
        { id: 'lo-01-05-1', description: 'Define procedural programming', completed: false },
        { id: 'lo-01-05-2', description: 'Explain how procedural code is organized', completed: false },
        { id: 'lo-01-05-3', description: 'Identify characteristics of procedural programs', completed: false },
      ],
      englishExplanation: {
        id: 'ee-01-05',
        text: `Procedural programming is a paradigm where the program is a sequence of instructions (procedures/functions) executed in order. Languages like C, Pascal, and early BASIC follow this model.

In procedural programming, the focus is on functions that operate on data. Data and functions are separate entities. You define data structures, then write functions that process that data.

Characteristics:
- Top-down design: break problem into smaller functions
- Functions/procedures: reusable blocks of code
- Sequential execution: instructions run in order
- Shared data: functions can access global data
- No data protection: any function can modify any data

The main advantage is simplicity for small programs. The disadvantage is that as programs grow, the shared data and lack of structure make maintenance difficult.`
      },
      romanUrduExplanation: {
        id: 'ru-01-05',
        text: `Procedural programming ek paradigm hai jisme program ek sequence of instructions (procedures/functions) ka hota hai jo order mein execute hote hain. C, Pascal, aur early BASIC jaisi languages is model ko follow karti hain.

Procedural programming mein focus functions par hota hai jo data par operate karte hain. Data aur functions alag entities hain. Aap data structures define karte hain, phir functions likhte hain jo us data ko process karte hain.

Characteristics:
- Top-down design: problem ko chhote functions mein break karna
- Functions/procedures: reusable code blocks
- Sequential execution: instructions order mein chalte hain
- Shared data: functions global data access kar sakte hain
- No data protection: koi bhi function koi bhi data modify kar sakta hai

Small programs ke liye simplicity iska main advantage hai. Lekin programs badhne par, shared data aur structure ki kami maintenance ko mushkil bana deti hai.`
      },
      keyPoints: [
        { id: 'kp-01-05-1', title: 'Functions', description: 'Procedural code is organized into functions that perform specific tasks.' },
        { id: 'kp-01-05-2', title: 'Data-Function Separation', description: 'Data and the functions that operate on data are defined separately.' },
      ],
      codeExamples: [
        {
          id: 'ce-01-05-1',
          title: 'Procedural Approach',
          code: `// Procedural style — data and functions are separate
class Student {
    String name;
    int age;
}

void printStudent(Student s) {
    System.out.println(s.name + " is " + s.age);
}

void birthday(Student s) {
    s.age++;
}

// Functions operate on data from outside
Student s = new Student();
s.name = "Ahmed";
s.age = 20;
birthday(s);           // age is now 21
printStudent(s);       // Ahmed is 21`,
          language: 'java',
          explanation: 'In procedural style, the Student data and the functions that operate on it are defined separately. Functions take data as parameters and modify it.',
        },
      ],
      realWorldExamples: [
        { id: 'rwe-01-05-1', title: 'Calculator Program', scenario: 'A simple calculator: input number1, input operator, input number2, call function add/subtract/multiply/divide, display result. This is procedural — sequential steps with functions.', oopConcept: 'Sequential execution with functions' },
      ],
      commonMistakes: [],
      examNotes: [],
      vivaQuestions: [{ id: 'vq-01-05-1', question: 'What are the characteristics of procedural programming?', answer: 'Top-down design, functions/procedures, sequential execution, shared data, no data protection.', difficulty: 'easy' }],
      quickCheckQuestions: [
        { id: 'qc-01-05-1', type: 'mcq', question: 'In procedural programming, data and functions are:', options: ['Bundled together', 'Separate entities', 'Hidden from each other', 'Inherited'], correctAnswer: 'Separate entities', explanation: 'Procedural programming separates data structures from the functions that process them.' },
      ],
      scenarioQuestions: [],
      prerequisites: ['lesson-01-04'],
      xpReward: 40,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      difficulty: 'beginner',
      estimatedMinutes: 15,
    },
    {
      id: 'lesson-01-06',
      moduleId: 'module-01',
      title: 'Limitations of Procedural Programming',
      slug: 'limitations-of-procedural',
      order: 6,
      duration: 15,
      description: 'Understand why procedural programming becomes problematic for large, complex systems.',
      learningObjectives: [
        { id: 'lo-01-06-1', description: 'Identify limitations of procedural programming', completed: false },
        { id: 'lo-01-06-2', description: 'Explain why OOP was developed as a solution', completed: false },
      ],
      englishExplanation: {
        id: 'ee-01-06',
        text: `As programs grow larger, procedural programming reveals serious limitations:

1. **Code Duplication**: Similar code appears in multiple functions. Changes require updating every copy.

2. **No Data Protection**: Any function can modify any data. A bug in one function can corrupt data used by the entire program.

3. **Tight Coupling**: Functions are tightly connected through shared data. Changing one function often breaks others.

4. **Difficult Maintenance**: In a 10,000-line procedural program, understanding how data flows between functions becomes nearly impossible.

5. **No Real-World Modeling**: Real-world entities have both data and behavior. Procedural code separates them artificially.

6. **Scalability Issues**: Adding new features requires modifying existing code, increasing the risk of bugs.

These problems led to the development of OOP. OOP addresses each limitation by bundling data with its methods (encapsulation), establishing hierarchies (inheritance), and providing flexible interfaces (polymorphism).`
      },
      romanUrduExplanation: {
        id: 'ru-01-06',
        text: `Jaise-jaise programs bade hote hain, procedural programming serious limitations show karta hai:

1. **Code Duplication**: Similar code multiple functions mein repeat hota hai. Changes ke liye har copy update karni padti hai.

2. **No Data Protection**: Koi bhi function koi bhi data modify kar sakta hai. Ek function mein bug poore program ke data ko corrupt kar sakta hai.

3. **Tight Coupling**: Shared data ke through functions tightly connected hain. Ek function change karne se doosre often toot jaate hain.

4. **Difficult Maintenance**: 10,000-line procedural program mein, data ka flow samajhna lagbhag impossible ho jaata hai.

5. **No Real-World Modeling**: Real-world entities mein data aur behavior dono hain. Procedural code inhe artificially alag karta hai.

6. **Scalability Issues**: Naye features add karne ke liye existing code modify karna padta hai, bugs ka risk badhta hai.

In problems ki wajah se OOP develop kiya gaya. OOP har limitation ko address karta hai: data ko methods ke saath bundle karke (encapsulation), hierarchies establish karke (inheritance), aur flexible interfaces provide karke (polymorphism).`
      },
      keyPoints: [
        { id: 'kp-01-06-1', title: 'Code Duplication', description: 'Procedural code repeats similar logic. Changes require updating multiple locations.' },
        { id: 'kp-01-06-2', title: 'No Data Protection', description: 'Any function can modify any data, leading to bugs and corruption.' },
        { id: 'kp-01-06-3', title: 'Tight Coupling', description: 'Functions depend heavily on each other through shared data.' },
      ],
      codeExamples: [
        {
          id: 'ce-01-06-1',
          title: 'Procedural Problem',
          code: `// Problem: data is exposed, functions are scattered
class BankAccount {
    String owner;
    double balance;  // accessible by everyone
}

void deposit(BankAccount acc, double amount) {
    acc.balance += amount;  // no validation!
}

void withdraw(BankAccount acc, double amount) {
    acc.balance -= amount;  // can go negative!
}

// Any code can do this:
acc.balance = -1000000;  // data corruption!`,
          language: 'java',
          explanation: 'In procedural code, the balance can be set to any value by any function. There is no protection against invalid operations.',
        },
      ],
      realWorldExamples: [],
      commonMistakes: [],
      examNotes: [{ id: 'en-01-06-1', title: 'Procedural Limitations', content: 'Know the main limitations: code duplication, no data protection, tight coupling, difficult maintenance, poor scalability.', importance: 'medium' }],
      vivaQuestions: [{ id: 'vq-01-06-1', question: 'Why is procedural programming insufficient for large systems?', answer: 'Code duplication, no data protection, tight coupling, poor maintainability, and inability to model real-world entities effectively.', difficulty: 'medium' }],
      quickCheckQuestions: [
        { id: 'qc-01-06-1', type: 'mcq', question: 'Which is a major limitation of procedural programming?', options: ['Too much abstraction', 'No data protection', 'Too many classes', 'Too much encapsulation'], correctAnswer: 'No data protection', explanation: 'In procedural programming, any function can modify any data, leading to potential corruption and bugs.' },
      ],
      scenarioQuestions: [],
      prerequisites: ['lesson-01-05'],
      xpReward: 40,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      difficulty: 'beginner',
      estimatedMinutes: 15,
    },
    {
      id: 'lesson-01-07',
      moduleId: 'module-01',
      title: 'Why OOP?',
      slug: 'why-oop',
      order: 7,
      duration: 15,
      description: 'Understand the advantages of OOP and why it became the dominant programming paradigm.',
      learningObjectives: [
        { id: 'lo-01-07-1', description: 'List the key advantages of OOP', completed: false },
        { id: 'lo-01-07-2', description: 'Explain how OOP solves procedural problems', completed: false },
      ],
      englishExplanation: {
        id: 'ee-01-07',
        text: `OOP was developed to solve the problems of procedural programming. Its key advantages:

1. **Modularity**: Code is organized into self-contained classes. Each class handles one entity, making the codebase easier to understand and navigate.

2. **Reusability**: Through inheritance, existing classes can be extended without rewriting code. A Student class can be reused across many applications.

3. **Data Protection**: Encapsulation hides internal data. Only authorized methods can modify the object's state. This prevents bugs and data corruption.

4. **Flexibility**: Polymorphism allows the same interface to work with different implementations. Code that uses a Shape reference can work with Circle, Rectangle, or Triangle without modification.

5. **Real-World Modeling**: OOP models real-world entities naturally. A University system maps directly to classes like Student, Professor, and Course.

6. **Maintainability**: Changes in one class do not affect other classes. This makes large systems easier to maintain and update.

7. **Team Development**: Different team members can work on different classes simultaneously without conflicts.

Java was designed from the ground up as an OOP language. Everything in Java is a class. This design makes Java particularly strong for building large, maintainable, enterprise-grade applications.`
      },
      romanUrduExplanation: {
        id: 'ru-01-07',
        text: `OOP ko procedural programming ke problems solve karne ke liye develop kiya gaya tha. Iske key advantages:

1. **Modularity**: Code self-contained classes mein organize hota hai. Har class ek entity handle karta hai, codebase ko samajhna aur navigate karna aasan hota hai.

2. **Reusability**: Inheritance ke through, existing classes ko bina rewrite kiye extend kiya ja sakta hai. Student class kayi applications mein reuse ho sakti hai.

3. **Data Protection**: Encapsulation internal data chupata hai. Sirf authorized methods object ka state modify kar sakte hain. Ye bugs aur data corruption rokta hai.

4. **Flexibility**: Polymorphism ek hi interface ko different implementations ke saath kaam karne deta hai. Shape reference wala code Circle, Rectangle ya Triangle ke saath bina change kiye kaam karta hai.

5. **Real-World Modeling**: OOP real-world entities ko naturally model karta hai. University system seedha Student, Professor aur Course classes mein map hota hai.

6. **Maintainability**: Ek class mein changes doosri classes ko affect nahi karte. Bade systems ko maintain aur update karna aasan hota hai.

7. **Team Development**: Alag team members alag classes par simultaneously kaam kar sakte hain bina conflicts ke.

Java ko ground-up se OOP language ke taur par design kiya gaya hai. Java mein sab kuch class hai. Ye design Java ko particularly strong banata hai large, maintainable, enterprise-grade applications build karne ke liye.`
      },
      keyPoints: [
        { id: 'kp-01-07-1', title: 'Modularity', description: 'Code is organized into self-contained classes, each handling one entity.' },
        { id: 'kp-01-07-2', title: 'Reusability', description: 'Through inheritance, existing code can be extended without rewriting.' },
        { id: 'kp-01-07-3', title: 'Data Protection', description: 'Encapsulation ensures only authorized methods can modify data.' },
      ],
      codeExamples: [],
      realWorldExamples: [],
      commonMistakes: [],
      examNotes: [],
      vivaQuestions: [],
      quickCheckQuestions: [
        { id: 'qc-01-07-1', type: 'mcq', question: 'Which OOP advantage allows code reuse through class hierarchies?', options: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'], correctAnswer: 'Inheritance', explanation: 'Inheritance lets child classes reuse and extend parent class code.' },
      ],
      scenarioQuestions: [],
      prerequisites: ['lesson-01-06'],
      xpReward: 40,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      difficulty: 'beginner',
      estimatedMinutes: 15,
    },
    {
      id: 'lesson-01-08',
      moduleId: 'module-01',
      title: 'Real-World Objects',
      slug: 'real-world-objects',
      order: 8,
      duration: 15,
      description: 'Learn to identify real-world objects and translate them into programming concepts.',
      learningObjectives: [
        { id: 'lo-01-08-1', description: 'Identify objects, attributes, and behaviors in real-world scenarios', completed: false },
        { id: 'lo-01-08-2', description: 'Map real-world entities to OOP concepts', completed: false },
      ],
      englishExplanation: {
        id: 'ee-01-08',
        text: `Everything around you can be modeled as an object. A car has attributes (color, speed, model) and behaviors (accelerate, brake, turn). A student has attributes (name, age, GPA) and behaviors (study, attend, graduate).

The process of OOP modeling:
1. Identify the entity (what are we modeling?)
2. Identify its attributes (what data does it hold?)
3. Identify its behaviors (what can it do?)
4. Create a class that defines the structure

Real-world examples:
- **Car**: attributes = color, speed, model; behaviors = accelerate, brake, turn
- **Student**: attributes = name, age, GPA; behaviors = study, takeExam, graduate
- **BankAccount**: attributes = balance, owner, accountNumber; behaviors = deposit, withdraw, getBalance
- **Employee**: attributes = name, salary, department; behaviors = work, takeLeave, getPromoted

This mapping from real-world to code is the essence of OOP. You are not writing abstract instructions — you are creating digital representations of real entities.`
      },
      romanUrduExplanation: {
        id: 'ru-01-08',
        text: `Jo kuch aapke around hai use object ki tarah model kiya ja sakta hai. Car ke attributes hain (color, speed, model) aur behaviors hain (accelerate, brake, turn). Student ke attributes hain (name, age, GPA) aur behaviors hain (study, attend, graduate).

OOP modeling ka process:
1. Entity identify karo (kya model kar rahe hain?)
2. Attributes identify karo (kya data rakhta hai?)
3. Behaviors identify karo (kya kar sakta hai?)
4. Class banao jo structure define kare

Real-world examples:
- **Car**: attributes = color, speed, model; behaviors = accelerate, brake, turn
- **Student**: attributes = name, age, GPA; behaviors = study, takeExam, graduate
- **BankAccount**: attributes = balance, owner, accountNumber; behaviors = deposit, withdraw, getBalance

Real-world se code mein ye mapping OOP ka essence hai. Aap abstract instructions nahi likh rahe — aap real entities ke digital representations bana rahe hain.`
      },
      keyPoints: [
        { id: 'kp-01-08-1', title: 'Object = Entity', description: 'Every real-world entity (car, student, account) can be modeled as an object.' },
        { id: 'kp-01-08-2', title: 'Attributes', description: 'Data that an entity holds: name, color, balance.' },
        { id: 'kp-01-08-3', title: 'Behaviors', description: 'Actions an entity can perform: study, deposit, accelerate.' },
      ],
      codeExamples: [
        {
          id: 'ce-01-08-1',
          title: 'Modeling a Car',
          code: `class Car {
    // Attributes
    String color;
    String model;
    int speed;

    // Behaviors
    void accelerate(int amount) {
        speed += amount;
        System.out.println(model + " speed: " + speed + " km/h");
    }

    void brake() {
        speed = 0;
        System.out.println(model + " stopped.");
    }
}

Car myCar = new Car();
myCar.color = "Red";
myCar.model = "Toyota";
myCar.accelerate(60);  // Toyota speed: 60 km/h
myCar.brake();          // Toyota stopped.`,
          language: 'java',
          output: `Toyota speed: 60 km/h
Toyota stopped.`,
          explanation: 'The Car class models a real car. It has attributes (color, model, speed) and behaviors (accelerate, brake). Each Car object represents a real car.',
        },
      ],
      realWorldExamples: [
        { id: 'rwe-01-08-1', title: 'Hospital Management', scenario: 'A hospital has Patients, Doctors, and Appointments. Each has data and behaviors.', oopConcept: 'Patient: name, id, diagnosis. Doctor: name, specialization. Appointment: date, time, reason.' },
      ],
      commonMistakes: [],
      examNotes: [],
      vivaQuestions: [],
      quickCheckQuestions: [
        { id: 'qc-01-08-1', type: 'mcq', question: 'In OOP, what are the properties of an object called?', options: ['Methods', 'Attributes', 'Classes', 'Instances'], correctAnswer: 'Attributes', explanation: 'Attributes (also called fields or properties) define the data an object holds.' },
      ],
      scenarioQuestions: [],
      prerequisites: ['lesson-01-01'],
      xpReward: 40,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      difficulty: 'beginner',
      estimatedMinutes: 15,
    },
    {
      id: 'lesson-01-09',
      moduleId: 'module-01',
      title: 'OOP Terminology',
      slug: 'oop-terminology',
      order: 9,
      duration: 15,
      description: 'Master the essential terminology used in Object-Oriented Programming.',
      learningObjectives: [
        { id: 'lo-01-09-1', description: 'Define all key OOP terms', completed: false },
        { id: 'lo-01-09-2', description: 'Use OOP terminology correctly', completed: false },
      ],
      englishExplanation: {
        id: 'ee-01-09',
        text: `Essential OOP terminology you must know:

- **Class**: A blueprint/template that defines structure and behavior
- **Object**: An instance of a class; a real entity in memory
- **Attribute/Field/Property**: Data stored in an object
- **Method/Function/Behavior**: Actions an object can perform
- **Instance**: Another word for object
- **Instance Variable**: A variable that belongs to a specific object
- **Constructor**: Special method called when creating an object
- **Reference**: A variable that points to an object in memory
- **Instance Creation**: Using new keyword to create an object
- **Message Passing**: One object calling a method on another

These terms are used interchangeably in the industry. When someone says "field," "attribute," or "property," they mean the same thing. When someone says "method" or "function," they usually mean the same thing in OOP context.

Understanding this terminology is essential for reading Java documentation, communicating with other developers, and answering exam questions correctly.`
      },
      romanUrduExplanation: {
        id: 'ru-01-09',
        text: `Essential OOP terminology jo aapko jaanna zaroori hai:

- **Class**: Blueprint/template jo structure aur behavior define karta hai
- **Object**: Class ka instance; memory mein ek real entity
- **Attribute/Field/Property**: Object mein stored data
- **Method/Function/Behavior**: Actions jo object kar sakta hai
- **Instance**: Object ka doosra naam
- **Instance Variable**: Variable jo ek specific object ka hota hai
- **Constructor**: Special method jo object create karne par call hota hai
- **Reference**: Variable jo memory mein object ko point karta hai
- **Instance Creation**: New keyword se object banana
- **Message Passing**: Ek object doosre par method call karna

Industry mein ye terms interchangeably use hoti hain. "Field," "attribute," ya "property" ka same matlab hai. "Method" ya "function" OOP context mein same cheez hai.

Ye terminology samajhna Java documentation padhne, doosre developers se communicate karne, aur exam questions sahi jawab dene ke liye zaroori hai.`
      },
      keyPoints: [
        { id: 'kp-01-09-1', title: 'Class vs Instance', description: 'Class is the template. Instance (object) is the actual entity created from the template.' },
        { id: 'kp-01-09-2', title: 'Attribute = Field = Property', description: 'These three terms are used interchangeably to describe data in an object.' },
        { id: 'kp-01-09-3', title: 'Constructor', description: 'A special method that initializes an object when it is created using new.' },
      ],
      codeExamples: [],
      realWorldExamples: [],
      commonMistakes: [],
      examNotes: [],
      vivaQuestions: [],
      quickCheckQuestions: [
        { id: 'qc-01-09-1', type: 'mcq', question: 'Another word for "object" in OOP is:', options: ['Class', 'Method', 'Instance', 'Attribute'], correctAnswer: 'Instance', explanation: 'An object is an instance of a class. The terms are interchangeable.' },
      ],
      scenarioQuestions: [],
      prerequisites: ['lesson-01-01'],
      xpReward: 30,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      difficulty: 'beginner',
      estimatedMinutes: 15,
    },
    {
      id: 'lesson-01-10',
      moduleId: 'module-01',
      title: 'Java and OOP',
      slug: 'java-and-oop',
      order: 10,
      duration: 15,
      description: 'Understand how Java implements OOP principles and why it is called a pure OOP language.',
      learningObjectives: [
        { id: 'lo-01-10-1', description: 'Explain why Java is considered a pure OOP language', completed: false },
        { id: 'lo-01-10-2', description: 'Describe how Java enforces OOP principles', completed: false },
      ],
      englishExplanation: {
        id: 'ee-01-10',
        text: `Java is designed as an OOP language from the ground up. Here is how it enforces OOP:

1. **Everything is a Class**: All code in Java must exist inside a class. There are no standalone functions. Even the main method must be inside a class.

2. **Objects via new**: Objects are always created using the new keyword. Java does not support raw memory manipulation like C/C++.

3. **Encapsulation Built-in**: Java provides access modifiers (public, private, protected) to control visibility of fields and methods.

4. **Inheritance via extends**: Java supports single inheritance through the extends keyword. Every class (except Object) has exactly one parent.

5. **Interfaces for Multiple Inheritance**: Java solves the multiple inheritance problem through interfaces. A class can implement multiple interfaces.

6. **Polymorphism through Overriding**: Runtime polymorphism works through method overriding with @Override annotation.

7. **Object Class**: Every class in Java implicitly extends Object class, providing common methods like toString(), equals(), hashCode().

Java is not purely OOP (it has primitive types like int, double), but it is the most widely used OOP language for enterprise, web, and mobile development.`
      },
      romanUrduExplanation: {
        id: 'ru-01-10',
        text: `Java ko ground-up se OOP language ke taur par design kiya gaya hai. Ye OOP ko kaise enforce karta hai:

1. **Sab Kuch Class Hai**: Java mein saara code class ke andar hona chahiye. Koi standalone functions nahi hain. Main method bhi class ke andar hota hai.

2. **Objects via new**: Objects hamesha new keyword se create hote hain. Java C/C++ ki tarah raw memory manipulation support nahi karta.

3. **Encapsulation Built-in**: Java access modifiers (public, private, protected) provide karta hai fields aur methods ki visibility control karne ke liye.

4. **Inheritance via extends**: Java extends keyword se single inheritance support karta hai. Har class (Object ke alawa) exactly ek parent karti hai.

5. **Interfaces for Multiple Inheritance**: Java interfaces ke through multiple inheritance ka problem solve karta hai. Ek class multiple interfaces implement kar sakti hai.

6. **Polymorphism through Overriding**: Runtime polymorphism method overriding se kaam karta hai @Override annotation ke saath.

7. **Object Class**: Java mein har class implicitly Object class extend karti hai, jo common methods provide karti hai jaise toString(), equals(), hashCode().

Java purely OOP nahi hai (iske primitive types hain jaise int, double), lekin ye enterprise, web aur mobile development ke liye sabse zyada use hone wali OOP language hai.`
      },
      keyPoints: [
        { id: 'kp-01-10-1', title: 'Class-Only Structure', description: 'Java requires all code to be inside a class. No standalone functions exist.' },
        { id: 'kp-01-10-2', title: 'Access Modifiers', description: 'public, private, protected control what can access fields and methods.' },
        { id: 'kp-01-10-3', title: 'Object Root', description: 'Every Java class extends Object class, inheriting common methods.' },
      ],
      codeExamples: [
        {
          id: 'ce-01-10-1',
          title: 'Java Enforces Class Structure',
          code: `// In Java, everything must be in a class
public class Main {
    // Main method — must be inside a class
    public static void main(String[] args) {
        // We can only create objects here
        Student s = new Student();
        s.name = "Ahmed";
        System.out.println(s.name);
    }
}

class Student {
    String name;  // field (encapsulated by default within class)
}`,
          language: 'java',
          output: 'Ahmed',
          explanation: 'In Java, even the entry point (main method) must be inside a class. This enforces the class-based structure of OOP.',
        },
      ],
      realWorldExamples: [],
      commonMistakes: [],
      examNotes: [],
      vivaQuestions: [],
      quickCheckQuestions: [
        { id: 'qc-01-10-1', type: 'true-false', question: 'In Java, you can write functions outside of classes.', correctAnswer: 'False', explanation: 'Java requires all code to be inside a class. There are no standalone functions.' },
      ],
      scenarioQuestions: [],
      prerequisites: ['lesson-01-01'],
      xpReward: 40,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      difficulty: 'beginner',
      estimatedMinutes: 15,
    },
  ],
};
