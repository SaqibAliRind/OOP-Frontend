export interface ConceptKnowledgeEntry {
  title: string;
  category: string;
  answer: string;
  simpleExplanation: string;
  romanUrduExplanation: string;
  codeExample: string;
  keyPoints: string[];
  commonMistakes: string[];
  relatedConcepts: string[];
  examNotes: string[];
}

export interface ComparisonEntry {
  title: string;
  left: { title: string; points: string[]; codeExample?: string };
  right: { title: string; points: string[]; codeExample?: string };
  summary: string;
  romanUrduSummary: string;
}

export const conceptKnowledge: Record<string, ConceptKnowledgeEntry> = {
  class: {
    title: "Class",
    category: "Fundamentals",
    answer:
      "A class is a blueprint or template that defines the properties (fields) and behaviors (methods) of objects. It is a user-defined data type in Java.",
    simpleExplanation:
      "A class is like a cookie cutter. The cutter itself is the class, and the cookies made from it are objects. The cutter defines the shape, but each cookie is a separate copy.",
    romanUrduExplanation:
      "Class ek blueprint hai jo batata hai ke objects kaise banenge. Jaise ghar ka naksha hota hai - naksha (class) par sab samajh aata hai, lekin asli ghar (object) banana parta hai. Class mein fields (data) aur methods (actions) hoti hain.",
    codeExample: "class Student {\n    String name;\n    int age;\n\n    void displayInfo() {\n        System.out.println(name + \" is \" + age + \" years old\");\n    }\n}\n\n// Usage\nStudent s1 = new Student();\ns1.name = \"Ali\";\ns1.age = 20;\ns1.displayInfo();",
    keyPoints: [
      "A class is a blueprint, not an actual instance",
      "Contains fields (state) and methods (behavior)",
      "Objects are created from classes using the new keyword",
      "A class can have multiple objects",
      "Java file name must match the public class name",
      "A class can contain constructors, blocks, and nested classes",
    ],
    commonMistakes: [
      "Confusing class with object - a class is the template, an object is the instance",
      "Not matching filename with public class name",
      "Trying to access non-static members without creating an object",
      "Forgetting that fields default to 0/null/false",
    ],
    relatedConcepts: ["object", "constructor", "method", "field"],
    examNotes: [
      "A class is a reference type, not a primitive",
      "Default access modifier for class is package-private",
      "Top-level classes can only be public or package-private",
      "A .java file can have multiple classes but only one public class",
    ],
  },
  object: {
    title: "Object",
    category: "Fundamentals",
    answer:
      "An object is a runtime instance of a class. It has state (field values), behavior (methods), and identity (unique reference in memory).",
    simpleExplanation:
      "An object is like a real car built from a car design. The design (class) defines what a car looks like, but the actual car you drive is the object.",
    romanUrduExplanation:
      "Object class ka real mein bana hua instance hai. Jaise class ek template hai toh object us template se bana hua product hai. Har object ke apne field values hoti hain aur apni memory jagah hoti hai.",
    codeExample: "class Car {\n    String color;\n    int speed;\n\n    void drive() {\n        System.out.println(color + \" car is driving at \" + speed + \" km/h\");\n    }\n}\n\nCar myCar = new Car();\nmyCar.color = \"Red\";\nmyCar.speed = 120;\nmyCar.drive();",
    keyPoints: [
      "Object is created using the new keyword",
      "Each object has its own copy of instance variables",
      "Objects are stored in heap memory",
      "Object reference is stored in stack memory",
      "Objects can be garbage collected when no longer referenced",
      "Object class is the root of all Java classes",
    ],
    commonMistakes: [
      "Declaring an object but not initializing it (NullPointerException)",
      "Using == to compare object content instead of equals()",
      "Creating an object inside a method and expecting it to persist",
      "Confusing object reference with the object itself",
    ],
    relatedConcepts: ["class", "constructor", "reference-variable", "equals", "hashcode"],
    examNotes: [
      "Every class implicitly extends Object",
      "Objects are passed by reference value in Java",
      "Object size depends on JVM (typically 12-16 bytes header + fields)",
      "Objects can be created using factory methods, reflection, or cloning",
    ],
  },
  constructor: {
    title: "Constructor",
    category: "Fundamentals",
    answer:
      "A constructor is a special method that is called automatically when an object is created. It is used to initialize the object's state.",
    simpleExplanation:
      "A constructor is like a welcome setup. When a new student joins a school, the constructor is the admission process that gives them their ID, name tag, and initial details.",
    romanUrduExplanation:
      "Constructor ek special method hai jo automatically call hota hai jab object banta hai. Iska kaam hai object ko initial values dena. Jaise naye student ka admission hota hai toh uski details bharin jati hain - yahi constructor ka kaam hai.",
    codeExample: "class Student {\n    String name;\n    int age;\n\n    // Default constructor\n    Student() {\n        name = \"Unknown\";\n        age = 0;\n    }\n\n    // Parameterized constructor\n    Student(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n}\n\nStudent s1 = new Student();\nStudent s2 = new Student(\"Ali\", 20);",
    keyPoints: [
      "Constructor name must match the class name",
      "Constructor has no return type, not even void",
      "If no constructor is defined, Java provides a default no-arg constructor",
      "Constructors can be overloaded",
      "Constructor chaining uses this() or super() as the first statement",
      "Constructor is called only once per object creation",
    ],
    commonMistakes: [
      "Adding a return type to a constructor (makes it a regular method)",
      "Calling this() and super() in the same constructor",
      "Not calling super() - Java inserts it implicitly if you do not",
      "Using return in a constructor to return a value",
    ],
    relatedConcepts: ["class", "object", "constructor-overloading", "this", "super", "default-constructor", "parameterized-constructor"],
    examNotes: [
      "If a class has any constructor, the default no-arg constructor is NOT provided",
      "Private constructors are used in singleton pattern",
      "Constructor is not inherited by subclasses",
      "Constructors can be private, protected, or package-private",
    ],
  },
  method: {
    title: "Method",
    category: "Fundamentals",
    answer:
      "A method is a block of code that performs a specific task. It defines the behavior of objects and can be called (invoked) to execute its code.",
    simpleExplanation:
      "A method is like a function inside a class. Think of it as a button on a remote - pressing it (calling the method) does something specific like changing the channel.",
    romanUrduExplanation:
      "Method ek code ka block hai jo koi specific kaam karta hai. Remote ke button jaisa hai - dabao (call karo) toh kaam ho jata hai. Methods objects ki behavior define karti hain.",
    codeExample: "class Calculator {\n    int add(int a, int b) {\n        return a + b;\n    }\n\n    void greet(String name) {\n        System.out.println(\"Hello, \" + name + \"!\");\n    }\n}\n\nCalculator calc = new Calculator();\nint result = calc.add(5, 3);\ncalc.greet(\"Ali\");",
    keyPoints: [
      "Method has a return type (void if nothing is returned)",
      "Method signature = name + parameter list",
      "Methods can be static (class-level) or instance (object-level)",
      "Methods can be overloaded (same name, different parameters)",
      "Access modifiers control visibility of methods",
      "Methods can throw exceptions",
    ],
    commonMistakes: [
      "Confusing method overloading with overriding",
      "Not returning a value from a non-void method",
      "Calling an instance method from a static context",
      "Forgetting that parameters are passed by value",
    ],
    relatedConcepts: ["class", "field", "overloading", "overriding", "static"],
    examNotes: [
      "Method overloading is compile-time polymorphism",
      "Method overriding is run-time polymorphism",
      "Recursive methods must have a base case",
      "Java methods are always pass-by-value",
    ],
  },

  field: {
    title: "Field (Instance Variable)",
    category: "Fundamentals",
    answer:
      "A field is a variable declared inside a class but outside any method. It represents the state or properties of an object.",
    simpleExplanation:
      "Fields are the data that an object holds. If a Student object has a name and age, those are its fields - like the answers on a form.",
    romanUrduExplanation:
      "Field ek variable hai jo class ke andar declare hota hai lekin method ke bahar. Ye object ki properties hoti hain - jaise Student ka naam aur age, ye uske fields hain.",
    codeExample: "class Employee {\n    String name;\n    double salary;\n    static int count;\n\n    void display() {\n        System.out.println(name + \" earns \" + salary);\n    }\n}\n\nEmployee e1 = new Employee();\ne1.name = \"Sara\";\ne1.salary = 50000;",
    keyPoints: [
      "Fields have default values (0, null, false, 0.0)",
      "Fields can have access modifiers",
      "Static fields are shared across all objects",
      "Fields define the state of an object",
      "Fields can be initialized inline or in constructors",
      "Final fields cannot be reassigned after initialization",
    ],
    commonMistakes: [
      "Confusing local variables with fields - local variables have no default value",
      "Accessing fields directly instead of using getters/setters",
      "Forgetting that static fields belong to the class, not objects",
      "Shadowing fields with parameters of the same name",
    ],
    relatedConcepts: ["class", "object", "encapsulation", "private", "public", "static", "final"],
    examNotes: [
      "Instance fields are unique to each object",
      "Static fields are also called class variables",
      "Fields declared final must be initialized at declaration or in constructor",
      "transient fields are not serialized",
    ],
  },

  "reference-variable": {
    title: "Reference Variable",
    category: "Fundamentals",
    answer:
      "A reference variable stores the memory address (reference) of an object, not the object itself. It points to an object in heap memory.",
    simpleExplanation:
      "A reference variable is like a remote control. The remote (reference) is in your hand, but the TV (object) is in the living room. The remote points to the TV.",
    romanUrduExplanation:
      "Reference variable ek address store karta hai jo object ki taraf point karta hai. Remote control jaisa hai - remote haath mein hai (stack), TV kamre mein hai (heap). Remote TV ka address rakhta hai.",
    codeExample: "class Dog {\n    String breed;\n\n    Dog(String breed) {\n        this.breed = breed;\n    }\n}\n\nDog myDog = new Dog(\"Husky\");\nDog anotherDog = myDog;\n\nanotherDog.breed = \"Labrador\";\nSystem.out.println(myDog.breed); // prints Labrador",
    keyPoints: [
      "Reference variable is stored in stack memory",
      "The actual object lives in heap memory",
      "Multiple references can point to the same object",
      "If no reference points to an object, it becomes eligible for garbage collection",
      "Reference can be set to null",
      "Reference type determines which methods/fields can be accessed",
    ],
    commonMistakes: [
      "Thinking the reference variable IS the object",
      "Using == to compare references vs object content",
      "Losing a reference and creating a memory leak (rare in Java)",
      "Assigning null to a reference and then using it (NullPointerException)",
    ],
    relatedConcepts: ["object", "class", "upcasting", "downcasting"],
    examNotes: [
      "Assignment copies the reference, not the object",
      "Passing an object to a method passes the reference by value",
      "Reference types can be null, primitives cannot",
      "Wrapper classes create objects for primitives",
    ],
  },
  encapsulation: {
    title: "Encapsulation",
    category: "OOP Pillars",
    answer:
      "Encapsulation is the mechanism of wrapping data (fields) and methods together in a class and restricting direct access to fields using access modifiers.",
    simpleExplanation:
      "Encapsulation is like a medicine capsule. The bitter medicine (data) is wrapped inside a safe shell (class). You access it through controlled methods (getters/setters).",
    romanUrduExplanation:
      "Encapsulation data ko wrap karne ka tareeqa hai. Jaise capsule mein dawai hoti hai - dawai (data) andar hoti hai, bahar se sirf capsule dikhta hai. Aap data ko sirf methods ke zariye access kar sakte hain, directly nahi.",
    codeExample: "class BankAccount {\n    private double balance;\n\n    public double getBalance() {\n        return balance;\n    }\n\n    public void deposit(double amount) {\n        if (amount > 0) {\n            balance += amount;\n        }\n    }\n\n    public void withdraw(double amount) {\n        if (amount > 0 && amount <= balance) {\n            balance -= amount;\n        }\n    }\n}\n\nBankAccount account = new BankAccount();\naccount.deposit(1000);\nSystem.out.println(account.getBalance());",
    keyPoints: [
      "Encapsulation = data hiding + getter/setter methods",
      "Fields are made private, access through public methods",
      "Provides control over data (validation in setters)",
      "Internal implementation can change without affecting outside code",
      "Achieved using access modifiers (private, public, protected)",
      "Key principle of OOP for data security",
    ],
    commonMistakes: [
      "Making fields public instead of private",
      "Creating getters/setters for every field without thinking",
      "Not adding validation logic in setters",
      "Confusing encapsulation with abstraction",
    ],
    relatedConcepts: ["data-hiding", "private", "public", "protected", "getter", "setter", "abstraction"],
    examNotes: [
      "Encapsulation is about bundling data and methods, and restricting access",
      "JavaBean convention: private fields + public getters/setters",
      "Encapsulation improves maintainability and flexibility",
      "Can be implemented at class or module level",
    ],
  },

  "data-hiding": {
    title: "Data Hiding",
    category: "OOP Pillars",
    answer:
      "Data hiding is the practice of restricting direct access to an object's internal state by making fields private and providing controlled access through methods.",
    simpleExplanation:
      "Data hiding means not letting outside code directly touch your object's data. Like a bank vault - you cannot just walk in, you have to go through the teller.",
    romanUrduExplanation:
      "Data hiding ka matlab hai ke aapka data seedha accessible nahi hota. Bank vault jaisa hai - seedha andar nahi ja sakte, teller ke through jaana parta hai. Private fields + public methods se ye hota hai.",
    codeExample: "class Person {\n    private String name;\n    private int age;\n\n    public String getName() {\n        return name;\n    }\n\n    public void setAge(int age) {\n        if (age > 0 && age < 150) {\n            this.age = age;\n        }\n    }\n}\n\nPerson p = new Person();\np.setAge(25);",
    keyPoints: [
      "Achieved by making fields private",
      "Controlled access through public methods",
      "Prevents unauthorized or invalid data modification",
      "Part of encapsulation principle",
      "Internal data representation can change freely",
      "Provides validation at a single point (setter)",
    ],
    commonMistakes: [
      "Making everything private with no way to access data",
      "Not validating data in setters",
      "Confusing data hiding with information hiding (broader concept)",
    ],
    relatedConcepts: ["encapsulation", "private", "public", "getter", "setter"],
    examNotes: [
      "Data hiding is a form of encapsulation",
      "Supports the principle of least privilege",
      "Helps in debugging by centralizing data access",
    ],
  },

  private: {
    title: "Private Access Modifier",
    category: "Access Modifiers",
    answer:
      "Private is an access modifier that restricts access to a member (field/method) to only within the same class. No outside class can access private members.",
    simpleExplanation:
      "Private means 'only for me.' Like your personal diary - only you can read it, no one else.",
    romanUrduExplanation:
      "Private access modifier ka matlab hai ke wo sirf usi class mein accessible hai. Jaise aapki personal diary - sirf aap padh sakte hain, koi aur nahi.",
    codeExample: "class Secret {\n    private int secretNumber = 42;\n    private void secretMethod() {\n        System.out.println(\"This is secret!\");\n    }\n\n    public int revealSecret() {\n        return secretNumber;\n    }\n}\n\nSecret s = new Secret();\ns.revealSecret();",
    keyPoints: [
      "Only accessible within the same class",
      "Most restrictive access modifier",
      "Default for fields in most cases",
      "Can be accessed through public methods (getters)",
      "Not accessible even in subclasses",
      "Private methods cannot be overridden",
    ],
    commonMistakes: [
      "Trying to access private members from other classes",
      "Making fields private but forgetting to provide getters",
      "Trying to override private methods (they are not inherited)",
    ],
    relatedConcepts: ["public", "protected", "encapsulation", "data-hiding"],
    examNotes: [
      "Private members are not inherited in the traditional sense",
      "Can be accessed via reflection (but not recommended)",
      "Inner classes can access private members of outer class",
    ],
  },

  public: {
    title: "Public Access Modifier",
    category: "Access Modifiers",
    answer:
      "Public is an access modifier that allows a member to be accessed from any other class, in any package, without restriction.",
    simpleExplanation:
      "Public means everyone can see it. Like a public park - anyone can go there.",
    romanUrduExplanation:
      "Public ka matlab hai ke koi bhi kahin se access kar sakta hai. Public park jaisa hai - sab ja sakte hain.",
    codeExample: "class Utils {\n    public static void greet(String name) {\n        System.out.println(\"Hello, \" + name);\n    }\n}\n\n// In any other class, any package:\nUtils.greet(\"World\");",
    keyPoints: [
      "Accessible from everywhere - same class, same package, other packages",
      "Least restrictive access modifier",
      "Default for constructors and methods is package-private, not public",
      "Use public for API that should be widely accessible",
      "Classes can also be public (only one per file)",
    ],
    commonMistakes: [
      "Making everything public - breaks encapsulation",
      "Confusing public with default (package-private) access",
      "Assuming public means visible only in subclass - it is visible everywhere",
    ],
    relatedConcepts: ["private", "protected", "encapsulation"],
    examNotes: [
      "A top-level class can only be public or package-private",
      "All interface methods are implicitly public",
      "Public constructors allow object creation from anywhere",
    ],
  },

  protected: {
    title: "Protected Access Modifier",
    category: "Access Modifiers",
    answer:
      "Protected access modifier allows access within the same class, same package, and by subclasses (even in different packages) through inheritance.",
    simpleExplanation:
      "Protected is like family-only access. Family members (subclasses) can see it, and neighbors in the same area (same package) can too.",
    romanUrduExplanation:
      "Protected access family jaisa hai - aapke apne bachay (subclasses) dekh sakte hain, aur jo log aapke muhallay mein hain (same package) wo bhi dekh sakte hain.",
    codeExample: "public class Animal {\n    protected String name = \"Animal\";\n    protected void eat() {\n        System.out.println(name + \" is eating\");\n    }\n}\n\npublic class Dog extends Animal {\n    void bark() {\n        System.out.println(name + \" barks\");\n        eat();\n    }\n}",
    keyPoints: [
      "Accessible in same class, same package, and subclasses",
      "Subclass can access protected members even in different packages",
      "Non-subclass in a different package cannot access protected members",
      "Protected is more restrictive than public, less than private",
      "Protected methods can be overridden by subclasses",
    ],
    commonMistakes: [
      "Thinking protected means accessible by any class in any package",
      "Confusing protected with package-private (default)",
      "Accessing protected members of parent through a parent reference in subclass",
    ],
    relatedConcepts: ["private", "public", "inheritance", "extends"],
    examNotes: [
      "Protected members are accessible through inheritance, not just package",
      "A non-subclass in a different package cannot access protected members via an object reference",
      "Protected fields should be avoided - prefer protected methods or getters",
    ],
  },

  getter: {
    title: "Getter Method",
    category: "Encapsulation",
    answer:
      "A getter method is a public method that returns the value of a private field. It provides read access to encapsulated data.",
    simpleExplanation:
      "A getter is like asking 'What is your name?' - you get information without touching the private data directly.",
    romanUrduExplanation:
      "Getter method private field ki value deta hai. Tumhara naam kya hai? puchne jaisa hai - aap data le sakte hain directly touch kiye baghair.",
    codeExample: "class Student {\n    private String name;\n    private int age;\n\n    public String getName() {\n        return name;\n    }\n\n    public int getAge() {\n        return age;\n    }\n}\n\nStudent s = new Student();\nString n = s.getName();",
    keyPoints: [
      "Method name starts with get followed by field name",
      "Returns the value of a private field",
      "Provides read-only access to data",
      "Can add logic before returning (e.g., formatting)",
      "Part of JavaBean convention",
      "Return type must match the field type",
    ],
    commonMistakes: [
      "Creating getters for fields that should remain truly private",
      "Not following naming convention (get vs is for boolean)",
      "Returning mutable objects directly (breaks encapsulation)",
    ],
    relatedConcepts: ["setter", "encapsulation", "private", "public"],
    examNotes: [
      "For boolean fields, use is prefix: isActive() instead of getActive()",
      "Getters should not modify state",
      "Consider returning defensive copies for mutable objects",
    ],
  },

  setter: {
    title: "Setter Method",
    category: "Encapsulation",
    answer:
      "A setter method is a public method that sets or updates the value of a private field. It provides controlled write access to encapsulated data.",
    simpleExplanation:
      "A setter is like filling out a form - you provide a value, and the object updates its private data, possibly after validation.",
    romanUrduExplanation:
      "Setter method private field ki value set karta hai. Form bharnay jaisa hai - aap value dete hain aur object apna data update karta hai, validation ke baad.",
    codeExample: "class Person {\n    private int age;\n\n    public void setAge(int age) {\n        if (age > 0 && age < 150) {\n            this.age = age;\n        }\n    }\n\n    public int getAge() {\n        return age;\n    }\n}\n\nPerson p = new Person();\np.setAge(25);\nSystem.out.println(p.getAge());",
    keyPoints: [
      "Method name starts with set followed by field name",
      "Takes a parameter matching the field type",
      "Should include validation logic",
      "Returns void in most cases",
      "Part of JavaBean convention",
      "Provides controlled write access to private data",
    ],
    commonMistakes: [
      "Not validating input in setters",
      "Using the same parameter name as the field without using this",
      "Creating setters for fields that should be read-only",
    ],
    relatedConcepts: ["getter", "encapsulation", "private", "public"],
    examNotes: [
      "Setters can return the object for method chaining (fluent pattern)",
      "Setters should validate before assigning",
      "If a field should not change, do not provide a setter",
    ],
  },
  inheritance: {
    title: "Inheritance",
    category: "OOP Pillars",
    answer:
      "Inheritance is a mechanism where one class (child/subclass) acquires the properties and behaviors of another class (parent/superclass). It promotes code reusability.",
    simpleExplanation:
      "Inheritance is like a child inheriting traits from parents. The child gets the parent's eye color, height, and can also develop their own unique traits.",
    romanUrduExplanation:
      "Inheritance mein ek class (bacha) doosri class (walid) ki properties aur methods leti hai. Jaise bacha walid se apni shakal leta hai - code reuse hota hai aur naye features add ho sakte hain.",
    codeExample: "class Animal {\n    String name;\n    void eat() {\n        System.out.println(name + \" is eating\");\n    }\n}\n\nclass Dog extends Animal {\n    void bark() {\n        System.out.println(name + \" is barking\");\n    }\n}\n\nDog d = new Dog();\nd.name = \"Buddy\";\nd.eat();  // inherited method\nd.bark(); // own method",
    keyPoints: [
      "Uses extends keyword for inheritance",
      "Child class inherits all non-private members of parent",
      "Supports IS-A relationship (Dog IS-A Animal)",
      "Java supports single inheritance only (no multiple class inheritance)",
      "Constructors are not inherited",
      "Every class implicitly inherits from Object class",
    ],
    commonMistakes: [
      "Using inheritance when composition would be better",
      "Assuming private members are inherited (they are not accessible)",
      "Creating deep inheritance hierarchies (hard to maintain)",
      "Using inheritance just for code reuse without IS-A relationship",
    ],
    relatedConcepts: ["extends", "super", "is-a", "single-inheritance", "multilevel-inheritance", "hierarchical-inheritance", "polymorphism"],
    examNotes: [
      "Java does not support multiple inheritance with classes",
      "Multiple inheritance is supported through interfaces",
      "Favor composition over inheritance",
      "Use final to prevent inheritance",
    ],
  },

  extends: {
    title: "Extends Keyword",
    category: "Inheritance",
    answer:
      "The extends keyword is used to create a subclass that inherits from a superclass. It establishes an IS-A relationship between classes.",
    simpleExplanation:
      "Extends means 'builds upon.' A Dog class extends Animal means Dog builds upon Animal's features and adds its own.",
    romanUrduExplanation:
      "Extends ka matlab hai ke ek class doosri class ko extend karti hai, uske features leti hai aur apne features add karti hai. Dog extends Animal ka matlab Dog Animal hai plus apne extra features.",
    codeExample: "class Vehicle {\n    int speed;\n    void start() {\n        System.out.println(\"Vehicle started\");\n    }\n}\n\nclass Car extends Vehicle {\n    int doors;\n    void honk() {\n        System.out.println(\"Beep beep!\");\n    }\n}\n\nCar c = new Car();\nc.speed = 100;\nc.start();\nc.honk();",
    keyPoints: [
      "extends comes after the class name in declaration",
      "A class can extend only one class (single inheritance)",
      "Subclass inherits all non-private members",
      "Subclass can override parent methods",
      "Subclass can add new fields and methods",
      "Subclass constructor must call superclass constructor",
    ],
    commonMistakes: [
      "Trying to extend multiple classes",
      "Not calling super() in subclass constructor",
      "Expecting to access private members of parent class",
      "Circular inheritance (A extends B, B extends A)",
    ],
    relatedConcepts: ["inheritance", "super", "is-a", "interface", "implements"],
    examNotes: [
      "extends is for classes, implements is for interfaces",
      "A class can extend one class and implement multiple interfaces",
      "extends creates a tight coupling between parent and child",
    ],
  },

  super: {
    title: "Super Keyword",
    category: "Inheritance",
    answer:
      "Super is a keyword that refers to the immediate parent class object. It is used to access parent class methods, fields, and constructors.",
    simpleExplanation:
      "Super is like saying 'my parent.' When you say super.method(), you are calling your parent's version of the method.",
    romanUrduExplanation:
      "Super keyword parent class ko refer karta hai. Jab aap super.method() likhte hain toh parent ka method call hota hai. Constructor mein super() se parent ka constructor call hota hai.",
    codeExample: "class Parent {\n    int value = 10;\n    void display() {\n        System.out.println(\"Parent display\");\n    }\n}\n\nclass Child extends Parent {\n    int value = 20;\n    void show() {\n        System.out.println(super.value); // 10\n        System.out.println(this.value);   // 20\n        super.display();                   // Parent display\n    }\n}",
    keyPoints: [
      "super() calls parent constructor (must be first statement)",
      "super.method() calls parent version of overridden method",
      "super.field accesses parent's field when shadowed",
      "If super() is not called, Java inserts super() implicitly",
      "Cannot use super() and this() in same constructor",
      "super refers to immediate parent class only",
    ],
    commonMistakes: [
      "Using super in a static context (it is instance-specific)",
      "Calling this() and super() in the same constructor",
      "Forgetting that super() must be the first statement",
      "Using super to access private parent members (does not work)",
    ],
    relatedConcepts: ["this", "extends", "inheritance", "constructor", "overriding"],
    examNotes: [
      "super() is implicitly called if not explicitly written",
      "super cannot be used with static members",
      "super is resolved at compile-time (unlike this which is runtime)",
    ],
  },

  "is-a": {
    title: "IS-A Relationship",
    category: "Inheritance",
    answer:
      "IS-A relationship describes inheritance or interface implementation. If Dog IS-A Animal, then Dog inherits from Animal. It defines a hierarchical relationship.",
    simpleExplanation:
      "IS-A means 'is a type of.' A Dog IS-A Animal, a Car IS-A Vehicle. This defines what a class fundamentally is.",
    romanUrduExplanation:
      "IS-A relationship batati hai ke ek class doosri class ka type hai. Dog IS-A Animal ka matlab Dog Animal ki ek type hai. Ye inheritance ki basis hai.",
    codeExample: "class Animal { }\n\nclass Dog extends Animal { }  // Dog IS-A Animal\n\nclass Cat extends Animal { }  // Cat IS-A Animal\n\n// instanceof checks IS-A relationship\nDog d = new Dog();\nSystem.out.println(d instanceof Animal); // true",
    keyPoints: [
      "Established through extends (class) or implements (interface)",
      "Checked using instanceof operator",
      "Dog IS-A Animal means Dog is a subtype of Animal",
      "Enables polymorphism (Animal a = new Dog())",
      "Should be used only when genuine hierarchy exists",
      "HAS-A (composition) is often preferred over IS-A",
    ],
    commonMistakes: [
      "Creating IS-A relationships just for code reuse",
      "Deep inheritance chains that become hard to manage",
      "IS-A violates encapsulation by exposing parent internals",
    ],
    relatedConcepts: ["inheritance", "extends", "implements", "has-a", "association", "aggregation", "composition"],
    examNotes: [
      "IS-A should be used for genuine type hierarchies",
      "Favor HAS-A (composition) over IS-A (inheritance)",
      "instanceof returns true if object is of that type or subtype",
    ],
  },

  "single-inheritance": {
    title: "Single Inheritance",
    category: "Inheritance",
    answer:
      "Single inheritance is when a class inherits from exactly one parent class. Java supports only single inheritance with classes to avoid the diamond problem.",
    simpleExplanation:
      "Single inheritance means one parent only. Like a child having one biological mother - simple, no confusion.",
    romanUrduExplanation:
      "Single inheritance mein class sirf ek parent se inherit karti hai. Java mein classes sirf single inheritance support karti hain - diamond problem se bachne ke liye.",
    codeExample: "class Shape {\n    String color;\n    void display() {\n        System.out.println(\"Color: \" + color);\n    }\n}\n\nclass Circle extends Shape {\n    double radius;\n    double area() {\n        return Math.PI * radius * radius;\n    }\n}\n\n// Circle inherits from Shape only - single inheritance\nCircle c = new Circle();\nc.color = \"Red\";\nc.radius = 5;\nc.display();",
    keyPoints: [
      "A class can extend only one superclass",
      "Avoids complexity of multiple inheritance diamond problem",
      "Java uses interfaces to achieve multiple inheritance effects",
      "Simple and easy to understand hierarchy",
      "All Java classes form a single-inheritance tree rooted at Object",
    ],
    commonMistakes: [
      "Trying to use multiple extends (not allowed)",
      "Not understanding why Java restricts to single inheritance",
    ],
    relatedConcepts: ["inheritance", "extends", "multilevel-inheritance", "hierarchical-inheritance", "interface"],
    examNotes: [
      "Java chose single inheritance to avoid ambiguity",
      "Multiple inheritance of state is problematic (diamond problem)",
      "Multiple inheritance of behavior is allowed via interfaces",
    ],
  },

  "multilevel-inheritance": {
    title: "Multilevel Inheritance",
    category: "Inheritance",
    answer:
      "Multilevel inheritance is when a chain of classes inherit from each other: A -> B -> C. Each level adds its own features.",
    simpleExplanation:
      "Multilevel inheritance is like a family tree going straight down: Grandparent -> Parent -> Child. Each generation adds something new.",
    romanUrduExplanation:
      "Multilevel inheritance mein ek chain hoti hai: A se B inherit karta hai, B se C. Jaise dada -> papa -> beta. Har level apna kuch add karta hai.",
    codeExample: "class Animal {\n    void eat() {\n        System.out.println(\"Eating\");\n    }\n}\n\nclass Dog extends Animal {\n    void bark() {\n        System.out.println(\"Barking\");\n    }\n}\n\nclass Puppy extends Dog {\n    void weep() {\n        System.out.println(\"Weeping\");\n    }\n}\n\nPuppy p = new Puppy();\np.eat();   // from Animal\np.bark();  // from Dog\np.weep();  // from Puppy",
    keyPoints: [
      "Chain of inheritance: Grandparent -> Parent -> Child",
      "Each level inherits from the level above",
      "Puppy has access to all non-private members in the chain",
      "Provides progressive specialization",
      "Can create deep chains that are hard to maintain",
    ],
    commonMistakes: [
      "Creating too many levels (hard to maintain and debug)",
      "Assuming private members from grandparent are accessible",
    ],
    relatedConcepts: ["inheritance", "single-inheritance", "hierarchical-inheritance", "extends", "super"],
    examNotes: [
      "Multilevel inheritance is a chain, not a tree",
      "super in Puppy refers to Dog, not Animal directly",
      "Each constructor calls the immediate parent constructor",
    ],
  },

  "hierarchical-inheritance": {
    title: "Hierarchical Inheritance",
    category: "Inheritance",
    answer:
      "Hierarchical inheritance is when multiple classes inherit from the same parent class. Each child gets the parent's features and adds its own.",
    simpleExplanation:
      "Hierarchical inheritance is like one parent having multiple children. Each child gets the parent's traits but develops differently.",
    romanUrduExplanation:
      "Hierarchical inheritance mein ek parent se kayi bachay inherit karte hain. Jaise walid ke teen bachay - sab walid se traits lete hain lekin alag alag development karte hain.",
    codeExample: "class Shape {\n    String color;\n    void displayColor() {\n        System.out.println(\"Color: \" + color);\n    }\n}\n\nclass Circle extends Shape {\n    double radius;\n    double area() {\n        return Math.PI * radius * radius;\n    }\n}\n\nclass Rectangle extends Shape {\n    double length, width;\n    double area() {\n        return length * width;\n    }\n}\n\nCircle c = new Circle();\nc.color = \"Blue\";\nSystem.out.println(c.area());",
    keyPoints: [
      "Multiple children inherit from one parent",
      "Each child can add its own fields and methods",
      "Children can override parent methods independently",
      "Promotes code reuse from a common parent",
      "Each child IS-A type of the parent",
    ],
    commonMistakes: [
      "Assuming siblings (child classes) can see each other's private members",
      "Not understanding that each child has its own copy of inherited fields",
    ],
    relatedConcepts: ["inheritance", "single-inheritance", "multilevel-inheritance", "extends", "is-a"],
    examNotes: [
      "Circle and Rectangle are siblings in this hierarchy",
      "Each can override displayColor() independently",
      "Hierarchical inheritance is very common in Java",
    ],
  },
  polymorphism: {
    title: "Polymorphism",
    category: "OOP Pillars",
    answer:
      "Polymorphism means 'many forms.' It allows a single interface or reference to represent different underlying forms (objects). It exists as compile-time (overloading) and runtime (overriding) polymorphism.",
    simpleExplanation:
      "Polymorphism is like water - it can be ice, liquid, or steam depending on the situation. The same substance behaves differently under different conditions.",
    romanUrduExplanation:
      "Polymorphism ka matlab hai bohot si shaklein. Jaise paani barf bhi hai, liquid bhi hai, steam bhi hai - same cheez alag alag halat mein alag behave karti hai. Java mein do tarah ki hai: compile-time aur runtime.",
    codeExample: "class Animal {\n    void sound() {\n        System.out.println(\"Some sound\");\n    }\n}\n\nclass Dog extends Animal {\n    void sound() {\n        System.out.println(\"Bark\");\n    }\n}\n\nclass Cat extends Animal {\n    void sound() {\n        System.out.println(\"Meow\");\n    }\n}\n\nAnimal a = new Dog();\na.sound(); // Bark (runtime polymorphism)\n\nAnimal b = new Cat();\nb.sound(); // Meow (runtime polymorphism)",
    keyPoints: [
      "Polymorphism = one interface, many implementations",
      "Compile-time: method overloading (same class)",
      "Runtime: method overriding (subclass)",
      "Enables flexible and extensible code",
      "Reference type can be parent, object can be child",
      "Makes code loosely coupled",
    ],
    commonMistakes: [
      "Confusing overloading (compile-time) with overriding (runtime)",
      "Thinking the reference type determines which method runs (object type does)",
      "Not understanding that private/static methods cannot be overridden",
    ],
    relatedConcepts: ["overloading", "overriding", "dynamic-dispatch", "upcasting", "downcasting", "abstract-class", "interface"],
    examNotes: [
      "Polymorphism is one of the four OOP pillars",
      "Runtime polymorphism is achieved via method overriding",
      "Compile-time polymorphism is achieved via method overloading",
      "Upcasting is implicit, downcasting requires explicit cast",
    ],
  },

  overloading: {
    title: "Method Overloading",
    category: "Polymorphism",
    answer:
      "Method overloading means having multiple methods with the same name but different parameter lists in the same class. It is compile-time polymorphism.",
    simpleExplanation:
      "Overloading is like having a print() method that can print a string, a number, or an object - same action name, different inputs.",
    romanUrduExplanation:
      "Overloading mein ek hi naam ke methods hote hain lekin parameters alag hote hain. Print method string bhi print kar sakta hai, number bhi - same naam, different input.",
    codeExample: "class Printer {\n    void print(String text) {\n        System.out.println(\"String: \" + text);\n    }\n\n    void print(int number) {\n        System.out.println(\"Number: \" + number);\n    }\n\n    void print(String text, int copies) {\n        for (int i = 0; i < copies; i++) {\n            System.out.println(text);\n        }\n    }\n}\n\nPrinter p = new Printer();\np.print(\"Hello\");     // calls first method\np.print(42);           // calls second method\np.print(\"Hi\", 3);     // calls third method",
    keyPoints: [
      "Same method name, different parameter list",
      "Different = number, type, or order of parameters",
      "Return type alone does not distinguish overloaded methods",
      "Compile-time polymorphism (resolved at compile time)",
      "Can be in the same class or inherited",
      "Overloading is also called static polymorphism",
    ],
    commonMistakes: [
      "Changing only the return type (not valid overloading)",
      "Confusing overloading with overriding (overriding is in subclass)",
      "Thinking varargs overloading is always distinct",
    ],
    relatedConcepts: ["overriding", "polymorphism", "method", "dynamic-dispatch"],
    examNotes: [
      "Overloading is determined at compile time",
      "Constructor overloading is common and useful",
      "Autoboxing can cause ambiguity in overloading",
    ],
  },

  overriding: {
    title: "Method Overriding",
    category: "Polymorphism",
    answer:
      "Method overriding is when a subclass provides a specific implementation of a method that is already defined in its superclass. The method signature must be the same.",
    simpleExplanation:
      "Overriding is like a child doing the same task as the parent but in their own way. Parent says 'speak' and dog barks while cat meows.",
    romanUrduExplanation:
      "Overriding mein bacha parent ka method leta hai aur usay apne tareeqay se implement karta hai. Parent kehne pe bolna hai - dog bark karta hai, cat meow karti hai. Same method, different behavior.",
    codeExample: "class Animal {\n    void sound() {\n        System.out.println(\"Generic sound\");\n    }\n}\n\nclass Dog extends Animal {\n    @Override\n    void sound() {\n        System.out.println(\"Bark\");\n    }\n}\n\nAnimal a = new Dog();\na.sound(); // Bark - overridden method is called",
    keyPoints: [
      "Same method name, same parameters, same or covariant return type",
      "@Override annotation helps catch errors",
      "Access modifier can be same or less restrictive",
      "Cannot override private, static, or final methods",
      "Runtime polymorphism (resolved at runtime)",
      "Only instance methods can be overridden",
    ],
    commonMistakes: [
      "Changing the method signature (becomes overloading instead)",
      "Trying to override static methods (they are hidden, not overridden)",
      "Overriding with a more restrictive access modifier",
      "Forgetting @Override annotation (misses compile-time checks)",
    ],
    relatedConcepts: ["overloading", "polymorphism", "dynamic-dispatch", "super", "extends", "abstract-method"],
    examNotes: [
      "Overriding is the foundation of runtime polymorphism",
      "Override annotation is not mandatory but recommended",
      "Cannot throw broader checked exceptions in overridden method",
      "Final methods cannot be overridden",
    ],
  },

  "dynamic-dispatch": {
    title: "Dynamic Dispatch",
    category: "Polymorphism",
    answer:
      "Dynamic dispatch is the mechanism by which the JVM decides which overridden method to call at runtime based on the actual object type, not the reference type.",
    simpleExplanation:
      "Dynamic dispatch means the program decides which version of a method to run when it is actually running, not when the code is written. The object determines the behavior, not the variable.",
    romanUrduExplanation:
      "Dynamic dispatch ka matlab hai ke JVM runtime pe decide karta hai ke kaunsa method version call hoga. Reference Animal ka hai lekin object Dog ka hai toh Dog wala method chalega.",
    codeExample: "class Shape {\n    double area() {\n        return 0;\n    }\n}\n\nclass Circle extends Shape {\n    double radius;\n    double area() {\n        return Math.PI * radius * radius;\n    }\n}\n\nclass Rectangle extends Shape {\n    double length, width;\n    double area() {\n        return length * width;\n    }\n}\n\nShape s1 = new Circle();\n((Circle) s1).radius = 5;\n\nShape s2 = new Rectangle();\n((Rectangle) s2).length = 4;\n((Rectangle) s2).width = 3;\n\nSystem.out.println(s1.area()); // 78.54 (Circle's area)\nSystem.out.println(s2.area()); // 12.0 (Rectangle's area)",
    keyPoints: [
      "JVM determines the method to call at runtime",
      "Based on actual object type, not reference type",
      "Enables true polymorphism",
      "Works with method overriding (not overloading)",
      "Adds slight runtime overhead compared to static binding",
      "Makes code flexible and extensible",
    ],
    commonMistakes: [
      "Expecting dynamic dispatch for overloaded methods (overloading is static)",
      "Forgetting that dynamic dispatch only works with overridden methods",
      "Using parent reference but expecting child-specific methods without casting",
    ],
    relatedConcepts: ["overriding", "polymorphism", "upcasting", "downcasting", "instanceof"],
    examNotes: [
      "Dynamic dispatch is also called runtime polymorphism",
      "Static methods and final methods use static binding",
      "Dynamic dispatch is what makes polymorphism possible at runtime",
    ],
  },

  upcasting: {
    title: "Upcasting",
    category: "Polymorphism",
    answer:
      "Upcasting is assigning a subclass object to a superclass reference. It is implicit and safe because a subclass IS-A superclass. It enables polymorphism.",
    simpleExplanation:
      "Upcasting is like saying a Dog IS-A Animal. You can treat a Dog as an Animal - it is a broader view of the same object.",
    romanUrduExplanation:
      "Upcasting mein subclass ka object superclass ke reference mein assign hota hai. Dog ko Animal ki tarah treat karna - ye implicit hota hai aur safe hai kyunki Dog Animal hai.",
    codeExample: "class Animal {\n    void sound() {\n        System.out.println(\"Some sound\");\n    }\n}\n\nclass Dog extends Animal {\n    void sound() {\n        System.out.println(\"Bark\");\n    }\n    void fetch() {\n        System.out.println(\"Fetching ball\");\n    }\n}\n\nAnimal a = new Dog();  // upcasting (implicit)\na.sound();              // Bark (dynamic dispatch)\n// a.fetch();           // ERROR: fetch() not in Animal reference",
    keyPoints: [
      "Implicit - no cast operator needed",
      "Safe because subclass IS-A superclass",
      "Cannot access subclass-specific methods through parent reference",
      "Enables polymorphism (parent reference, child object)",
      "Happens in method parameters, assignments, and return types",
      "Common in collections: List<Animal> list = new ArrayList<>();",
    ],
    commonMistakes: [
      "Trying to call subclass-specific methods on upcast reference",
      "Thinking upcasting changes the object (it does not)",
      "Forgetting that overridden methods still use dynamic dispatch",
    ],
    relatedConcepts: ["downcasting", "polymorphism", "dynamic-dispatch", "is-a", "instanceof"],
    examNotes: [
      "Upcasting is implicit and always safe",
      "The object does not change, only the reference view changes",
      "Dynamic dispatch still calls the overridden method",
    ],
  },

  downcasting: {
    title: "Downcasting",
    category: "Polymorphism",
    answer:
      "Downcasting is explicitly casting a superclass reference to a subclass type. It requires an explicit cast and can throw ClassCastException if the object is not actually the target type.",
    simpleExplanation:
      "Downcasting is saying 'I know this Animal is actually a Dog, let me treat it as a Dog.' It requires explicit cast and can fail at runtime.",
    romanUrduExplanation:
      "Downcasting mein superclass reference ko subclass mein cast karna parta hai. Explicit cast zaroori hai aur agar object actually Dog nahi hai toh ClassCastException aayegi.",
    codeExample: "class Animal {\n    void sound() {\n        System.out.println(\"Some sound\");\n    }\n}\n\nclass Dog extends Animal {\n    void sound() {\n        System.out.println(\"Bark\");\n    }\n    void fetch() {\n        System.out.println(\"Fetching ball\");\n    }\n}\n\nAnimal a = new Dog();   // upcasting\nDog d = (Dog) a;         // downcasting (explicit)\nd.fetch();               // OK: now we can access Dog methods\n\n// Animal a2 = new Animal();\n// Dog d2 = (Dog) a2;     // ClassCastException at runtime!",
    keyPoints: [
      "Explicit cast required: (SubClass) superClassRef",
      "Can throw ClassCastException if object is wrong type",
      "Use instanceof before downcasting to check type",
      "Unlocks subclass-specific methods on the reference",
      "Parent reference is preserved, just viewed differently",
      "Common when retrieving from collections",
    ],
    commonMistakes: [
      "Downcasting without checking instanceof first",
      "Assuming downcasting converts the object (it just changes the view)",
      "Forgetting that the original object type does not change",
      "Casting to a completely unrelated class (ClassCastException)",
    ],
    relatedConcepts: ["upcasting", "instanceof", "polymorphism", "dynamic-dispatch", "class"],
    examNotes: [
      "Always use instanceof before downcasting",
      "Downcasting does not create a new object",
      "ClassCastException is a RuntimeException",
      "Checked casts at compile-time but verified at runtime",
    ],
  },

  instanceof: {
    title: "Instanceof Operator",
    category: "Polymorphism",
    answer:
      "instanceof is a binary operator that checks if an object is an instance of a specific class or subclass. It returns true or false and is used before downcasting.",
    simpleExplanation:
      "instanceof is like asking 'Are you a dog?' before trying to treat something as a dog. It is a safety check.",
    romanUrduExplanation:
      "instanceof ek operator hai jo check karta hai ke object kisi class ka hai ya nahi. Downcasting se pehle use karte hain taake galat cast na ho. Poochne jaisa hai ke ye dog hai ya nahi.",
    codeExample: "class Animal { }\nclass Dog extends Animal { }\nclass Cat extends Animal { }\n\nAnimal a = new Dog();\n\nif (a instanceof Dog) {\n    System.out.println(\"It is a Dog\");\n}\nif (a instanceof Animal) {\n    System.out.println(\"It is an Animal\");\n}\nif (a instanceof Cat) {\n    System.out.println(\"It is a Cat\");\n} else {\n    System.out.println(\"It is NOT a Cat\");\n}\n\n// Pattern matching (Java 16+)\nif (a instanceof Dog d) {\n    System.out.println(d); // d is already cast to Dog\n}",
    keyPoints: [
      "Returns true if object is of the specified type or subtype",
      "Used before downcasting to avoid ClassCastException",
      "Returns false for null (null instanceof anything is false)",
      "Can check class types, interfaces, and array types",
      "Java 16+ supports pattern matching with instanceof",
      "Cannot be used with primitive types",
    ],
    commonMistakes: [
      "Using instanceof to check interfaces when the class does not implement it",
      "Not using instanceof before downcasting",
      "Using instanceof instead of polymorphism when possible",
      "Redundant instanceof checks (e.g., checking after casting)",
    ],
    relatedConcepts: ["upcasting", "downcasting", "polymorphism", "class", "interface"],
    examNotes: [
      "instanceof returns false for null",
      "Always prefer instanceof before ClassCastException",
      "Pattern matching reduces boilerplate code",
      "Useful when working with mixed collections",
    ],
  },
  abstraction: {
    title: "Abstraction",
    category: "OOP Pillars",
    answer:
      "Abstraction is the concept of hiding complex implementation details and showing only the essential features of an object. It focuses on what an object does, not how it does it.",
    simpleExplanation:
      "Abstraction is like driving a car. You know how to use the steering wheel and pedals, but you do not need to know how the engine works inside.",
    romanUrduExplanation:
      "Abstraction ka matlab hai ke sirf zaroori cheezein dikhana aur implementation chupana. Car chalane jaisa hai - steering aur pedal use karna aata hai, lekin engine kaise kaam karta hai wo zaroori nahi pata.",
    codeExample: "abstract class Shape {\n    String color;\n\n    abstract double area();\n\n    void displayColor() {\n        System.out.println(\"Color: \" + color);\n    }\n}\n\nclass Circle extends Shape {\n    double radius;\n\n    double area() {\n        return Math.PI * radius * radius;\n    }\n}\n\nShape s = new Circle();\ns.color = \"Red\";\nSystem.out.println(s.area()); // Circle provides implementation",
    keyPoints: [
      "Achieved through abstract classes and interfaces",
      "Hides implementation, exposes only essential features",
      "Abstract classes cannot be instantiated directly",
      "Abstract methods have no body - subclasses must implement",
      "Provides a contract that subclasses must follow",
      "Simplifies complex systems by breaking them into manageable parts",
    ],
    commonMistakes: [
      "Confusing abstraction with encapsulation (abstraction hides complexity, encapsulation hides data)",
      "Trying to instantiate an abstract class",
      "Not implementing all abstract methods in subclass",
    ],
    relatedConcepts: ["abstract-class", "abstract-method", "interface", "encapsulation", "data-hiding"],
    examNotes: [
      "Abstraction is achieved through abstract classes and interfaces",
      "Focuses on WHAT, not HOW",
      "Abstract class can have both abstract and concrete methods",
      "Interface is pure abstraction (before Java 8)",
    ],
  },

  "abstract-class": {
    title: "Abstract Class",
    category: "Abstraction",
    answer:
      "An abstract class is a class that cannot be instantiated and may contain abstract methods (without body). It serves as a base class for subclasses to extend.",
    simpleExplanation:
      "An abstract class is like a job description - it tells you what needs to be done but does not say exactly how. The actual employees (subclasses) figure out the how.",
    romanUrduExplanation:
      "Abstract class ek aisi class hai jo directly object nahi ban sakti. Isme abstract methods hoti hain jinka koi implementation nahi hota. Subclasses inhe implement karti hain. Job description jaisi hai.",
    codeExample: "abstract class Vehicle {\n    String brand;\n\n    abstract void start();\n    abstract void stop();\n\n    void displayBrand() {\n        System.out.println(\"Brand: \" + brand);\n    }\n}\n\nclass Car extends Vehicle {\n    void start() {\n        System.out.println(\"Car engine started\");\n    }\n    void stop() {\n        System.out.println(\"Car engine stopped\");\n    }\n}\n\n// Vehicle v = new Vehicle(); // ERROR: cannot instantiate abstract class\nVehicle v = new Car();       // OK: polymorphism\nv.brand = \"Toyota\";\nv.start();",
    keyPoints: [
      "Cannot be instantiated with new keyword",
      "Can have both abstract and concrete (non-abstract) methods",
      "Can have constructors (called by subclass constructor)",
      "Can have fields (instance variables)",
      "Subclass must implement all abstract methods or be abstract too",
      "Can have final, static, and private methods (since Java 8/9)",
    ],
    commonMistakes: [
      "Trying to create an object of an abstract class",
      "Not implementing all abstract methods in a concrete subclass",
      "Confusing abstract class with interface (abstract class can have state)",
      "Making all methods abstract when some could have default implementation",
    ],
    relatedConcepts: ["abstract-method", "interface", "extends", "inheritance", "abstraction"],
    examNotes: [
      "Abstract class can have constructors even though it cannot be instantiated",
      "A class can extend only one abstract class",
      "Abstract class can have final methods",
      "Prefer abstract class when subclasses share common state",
    ],
  },

  "abstract-method": {
    title: "Abstract Method",
    category: "Abstraction",
    answer:
      "An abstract method is a method declared without an implementation (no body). It must be implemented by concrete subclasses. Declared using the abstract keyword.",
    simpleExplanation:
      "An abstract method is like a to-do item with no instructions. Someone else has to figure out how to do it.",
    romanUrduExplanation:
      "Abstract method ek aisi method hai jiska koi implementation nahi hota. Sirf declaration hota hai. Subclass ko ye method implement karna parta hai.",
    codeExample: "abstract class Database {\n    abstract void connect();\n    abstract void query(String sql);\n    abstract void disconnect();\n}\n\nclass MySQLDatabase extends Database {\n    void connect() {\n        System.out.println(\"Connected to MySQL\");\n    }\n    void query(String sql) {\n        System.out.println(\"Executing: \" + sql);\n    }\n    void disconnect() {\n        System.out.println(\"Disconnected from MySQL\");\n    }\n}",
    keyPoints: [
      "Declared with abstract keyword and no method body",
      "Must end with a semicolon after the signature",
      "Must be implemented by concrete (non-abstract) subclasses",
      "Cannot be private, static, or final",
      "Forces subclasses to provide implementation",
      "Defines a contract that subclasses must follow",
    ],
    commonMistakes: [
      "Adding a body to an abstract method declaration",
      "Forgetting to implement abstract methods in subclass",
      "Making abstract methods private (they must be accessible to subclasses)",
    ],
    relatedConcepts: ["abstract-class", "abstraction", "overriding", "interface", "extends"],
    examNotes: [
      "Abstract method cannot have a body",
      "Subclass that does not implement all abstract methods must also be abstract",
      "Abstract methods are implicitly public",
    ],
  },
  interface: {
    title: "Interface",
    category: "Abstraction",
    answer:
      "An interface is a fully abstract type that defines a contract of methods that a class must implement. A class can implement multiple interfaces.",
    simpleExplanation:
      "An interface is like a job contract. It lists all the duties (methods) an employee (class) must perform, but does not say how to do them.",
    romanUrduExplanation:
      "Interface ek contract hai jo batata hai ke koi class kya kya methods implement karegi. Job contract jaisa hai - kaam bata deta hai, tareeqa nahi batata. Ek class kayi interfaces implement kar sakti hai.",
    codeExample: "interface Printable {\n    void print();\n}\n\ninterface Serializable {\n    void serialize();\n}\n\nclass Document implements Printable, Serializable {\n    public void print() {\n        System.out.println(\"Printing document\");\n    }\n    public void serialize() {\n        System.out.println(\"Serializing document\");\n    }\n}\n\nDocument d = new Document();\nd.print();\nd.serialize();",
    keyPoints: [
      "All methods are implicitly public and abstract (before Java 8)",
      "All fields are implicitly public static final (constants)",
      "A class can implement multiple interfaces (multiple inheritance of type)",
      "Cannot have constructors",
      "Interface can extend other interfaces",
      "Since Java 8: default methods and static methods are allowed",
    ],
    commonMistakes: [
      "Not implementing all interface methods in the class",
      "Forgetting that interface methods are public by default",
      "Confusing interface with abstract class (interface has no state)",
      "Using instance variables in interfaces (they are always static final)",
    ],
    relatedConcepts: ["implements", "abstract-class", "abstract-method", "default-method", "static-interface-method", "polymorphism"],
    examNotes: [
      "Interface supports multiple inheritance (a class can implement many interfaces)",
      "Since Java 8: default and static methods allow partial implementation",
      "Since Java 9: private methods in interfaces",
      "Functional interface (one abstract method) can be used with lambdas",
    ],
  },

  implements: {
    title: "Implements Keyword",
    category: "Abstraction",
    answer:
      "The implements keyword is used by a class to implement an interface. The class must provide bodies for all abstract methods defined in the interface.",
    simpleExplanation:
      "Implements means 'I promise to do this.' When a class implements an interface, it promises to provide all the methods the interface requires.",
    romanUrduExplanation:
      "Implements ka matlab hai ke class interface ke methods ko implement karegi. Ye ek promise hai ke saare abstract methods ka body provide karenge.",
    codeExample: "interface Payable {\n    double calculatePay();\n}\n\nclass Employee implements Payable {\n    String name;\n    double salary;\n\n    public double calculatePay() {\n        return salary;\n    }\n}\n\nclass Contractor implements Payable {\n    double hourlyRate;\n    int hours;\n\n    public double calculatePay() {\n        return hourlyRate * hours;\n    }\n}",
    keyPoints: [
      "Class must provide implementation for all abstract methods",
      "Methods must be public (interface methods are public by default)",
      "A class can implement multiple interfaces (comma-separated)",
      "Class can also extend a class while implementing interfaces",
      "Implements establishes a CAN-DO relationship",
    ],
    commonMistakes: [
      "Forgetting to make implementing methods public",
      "Not implementing all methods from the interface",
      "Confusing implements (interface) with extends (class)",
    ],
    relatedConcepts: ["interface", "extends", "abstract-class", "is-a"],
    examNotes: [
      "implements is for interfaces, extends is for classes",
      "Class must override all abstract methods or be declared abstract",
      "A class can both extend a class and implement interfaces",
    ],
  },

  "default-method": {
    title: "Default Method",
    category: "Abstraction",
    answer:
      "A default method is a method in an interface with a body (default implementation). Added in Java 8 to allow interfaces to evolve without breaking existing implementations.",
    simpleExplanation:
      "A default method is like having a standard recipe in an interface. Classes can use it as-is or override it with their own version.",
    romanUrduExplanation:
      "Default method interface mein ek method hai jiska implementation hota hai. Java 8 mein aaya. Classes isay use kar sakti hain ya apna version bana sakti hain.",
    codeExample: "interface Greeting {\n    default void greet(String name) {\n        System.out.println(\"Hello, \" + name + \"!\");\n    }\n}\n\nclass FormalGreeting implements Greeting {\n    // uses default greet method\n}\n\nclass InformalGreeting implements Greeting {\n    @Override\n    public void greet(String name) {\n        System.out.println(\"Hey \" + name + \"!\");\n    }\n}\n\nFormalGreeting fg = new FormalGreeting();\nfg.greet(\"Ali\"); // Hello, Ali!\n\nInformalGreeting ig = new InformalGreeting();\nig.greet(\"Ali\"); // Hey Ali!",
    keyPoints: [
      "Has a method body (default implementation)",
      "Declared with the default keyword",
      "Classes can override default methods or use them as-is",
      "Solves the problem of adding methods to interfaces without breaking implementations",
      "Cannot be private or protected (public by default)",
      "If a class implements two interfaces with same default method, must override to resolve conflict",
    ],
    commonMistakes: [
      "Conflicting default methods from multiple interfaces without override",
      "Trying to call default method without override using interface reference in some cases",
      "Forgetting to make overridden default methods public",
    ],
    relatedConcepts: ["interface", "static-interface-method", "implements", "overriding"],
    examNotes: [
      "Default methods are part of Java 8's evolution of interfaces",
      "Priority: class method > interface default method",
      "Diamond problem with default methods must be explicitly resolved",
    ],
  },

  "static-interface-method": {
    title: "Static Interface Method",
    category: "Abstraction",
    answer:
      "A static method in an interface that belongs to the interface itself, not to any implementing class. Called using the interface name. Added in Java 8.",
    simpleExplanation:
      "A static interface method is like a utility function attached to the interface. You call it by the interface name, not through an object.",
    romanUrduExplanation:
      "Static interface method ek utility method hai jo interface ke saath hota hai. Ise interface ke naam se call karte hain, object ke through nahi.",
    codeExample: "interface MathUtils {\n    static int square(int x) {\n        return x * x;\n    }\n    static int cube(int x) {\n        return x * x * x;\n    }\n}\n\n// Called on the interface, not on an implementing class\nint result1 = MathUtils.square(5);  // 25\nint result2 = MathUtils.cube(3);    // 27",
    keyPoints: [
      "Called using InterfaceName.methodName()",
      "Cannot be overridden in implementing class",
      "Cannot access instance members (fields or methods) of the interface",
      "Added in Java 8 alongside default methods",
      "Utility methods that do not need to be inherited",
    ],
    commonMistakes: [
      "Trying to override static interface methods",
      "Trying to call static interface methods through implementing class",
      "Confusing with default methods (static cannot be overridden)",
    ],
    relatedConcepts: ["interface", "default-method", "static", "implements"],
    examNotes: [
      "Static interface methods cannot be overridden",
      "They are hidden if a class defines a static method with the same signature",
      "Useful for utility/helper methods related to the interface",
    ],
  },
  static: {
    title: "Static Keyword",
    category: "Keywords",
    answer:
      "Static means belonging to the class rather than any instance. Static members (fields, methods, blocks) can be accessed without creating an object.",
    simpleExplanation:
      "Static is like a shared resource in a building. Everyone uses the same elevator - it does not belong to any one apartment.",
    romanUrduExplanation:
      "Static ka matlab hai ke wo cheez class ke saath hai, kisi object ke saath nahi. Jaise building ka elevator - sab use karte hain, kisi ek apartment ka nahi hai. Bina object banaye access ho sakta hai.",
    codeExample: "class Counter {\n    static int count = 0;\n\n    Counter() {\n        count++;\n    }\n\n    static int getCount() {\n        return count;\n    }\n}\n\nSystem.out.println(Counter.getCount()); // 0\nCounter c1 = new Counter();\nCounter c2 = new Counter();\nSystem.out.println(Counter.getCount()); // 2",
    keyPoints: [
      "Static members belong to the class, not objects",
      "Can be accessed without creating an object: ClassName.member",
      "Static fields are shared among all instances",
      "Static methods cannot access instance members directly",
      "Static blocks run once when the class is loaded",
      "Main method is static so JVM can call it without an object",
    ],
    commonMistakes: [
      "Accessing instance variables from static methods",
      "Using this or super in static context",
      "Confusing static with final (they are independent)",
      "Thinking static means global (it is class-scoped)",
    ],
    relatedConcepts: ["final", "class", "method", "field", "singleton"],
    examNotes: [
      "Static methods can be called without object creation",
      "Static variables are initialized when class is loaded",
      "Static cannot be used with this, super, or instance members",
      "Nested static classes can exist without an outer class instance",
    ],
  },

  final: {
    title: "Final Keyword",
    category: "Keywords",
    answer:
      "Final is a keyword that restricts modification. Final variable = constant, final method = cannot be overridden, final class = cannot be extended.",
    simpleExplanation:
      "Final means permanent. A final variable is like a permanent marker - once you write, it cannot be changed.",
    romanUrduExplanation:
      "Final ka matlab hai permanent. Final variable ek permanent marker jaisa hai - jo likh diya wo badal nahi sakta. Final method override nahi ho sakta, final class extend nahi ho sakti.",
    codeExample: "final class Immutable {\n    final int value;\n    final String name;\n\n    Immutable(int value, String name) {\n        this.value = value;\n        this.name = name;\n    }\n\n    final int getValue() {\n        return value;\n    }\n}\n\n// class Extended extends Immutable { } // ERROR: cannot extend final class\n\nImmutable obj = new Immutable(10, \"test\");\n// obj.value = 20; // ERROR: cannot modify final field\nSystem.out.println(obj.getValue());",
    keyPoints: [
      "Final variable: value cannot be changed after initialization",
      "Final method: cannot be overridden by subclasses",
      "Final class: cannot be extended (e.g., String, Integer)",
      "Final local variable: must be assigned exactly once",
      "Final parameters: cannot be modified inside the method",
      "Final does not mean constant at compile time unless primitive or String literal",
    ],
    commonMistakes: [
      "Thinking final means compile-time constant (only for primitives and String literals)",
      "Trying to reassign a final variable",
      "Trying to override a final method",
      "Trying to extend a final class",
    ],
    relatedConcepts: ["static", "class", "method", "field", "immutable"],
    examNotes: [
      "final, finally, and finalize are all different things",
      "Final classes: String, Integer, Math, System",
      "Final local variables can be used in anonymous classes",
      "Blank final variables must be assigned in constructor",
    ],
  },

  "object-class": {
    title: "Object Class",
    category: "Fundamentals",
    answer:
      "Object is the root class of all Java classes. Every class in Java implicitly extends Object. It provides methods like toString(), equals(), hashCode(), etc.",
    simpleExplanation:
      "Object is like the ultimate ancestor of every Java class. Every class, whether you write it or it is from a library, is ultimately an Object.",
    romanUrduExplanation:
      "Object sab classes ka root hai. Har Java class Object se extend hoti hai (chahe aap likhen ya na likhen). Ye sab kuch ka baap hai - toString, equals, hashCode jaise methods deta hai.",
    codeExample: "class Student {\n    String name;\n    Student(String name) { this.name = name; }\n}\n\n// Student extends Object implicitly\nStudent s = new Student(\"Ali\");\n\n// Object methods available on every class\nSystem.out.println(s.toString());     // Student@hashcode\nSystem.out.println(s.getClass());     // class Student\n\nObject obj = s;  // upcasting to Object (always works)\nSystem.out.println(obj instanceof Student); // true",
    keyPoints: [
      "Root of all Java classes (implicit parent)",
      "Provides toString(), equals(), hashCode(), getClass(), clone(), finalize(), wait(), notify()",
      "Every class inherits Object methods",
      "Can be used as a reference type for any object",
      "equals() and hashCode() should be overridden together",
      "wait() and notify() are used for thread synchronization",
    ],
    commonMistakes: [
      "Not overriding toString() (default shows class@hashcode)",
      "Not overriding equals() and hashCode() together",
      "Using Object as a type when a more specific type is available",
    ],
    relatedConcepts: ["toString", "equals", "hashcode", "class", "object"],
    examNotes: [
      "Object is in java.lang package (imported automatically)",
      "All Object methods can be called on any Java object",
      "Finalize is deprecated since Java 9",
      "wait/notify are final methods (cannot be overridden)",
    ],
  },

  toString: {
    title: "ToString Method",
    category: "Object Methods",
    answer:
      "toString() is an inherited method from Object that returns a string representation of an object. It is called automatically when an object is concatenated with a string.",
    simpleExplanation:
      "toString() is like asking an object to describe itself. By default it shows ClassName@hashcode, but you can customize it to show useful info.",
    romanUrduExplanation:
      "toString() object ka string representation hai. Default mein ClassName@hashcode dikhata hai. Aap ise customize kar sakte hain taake meaningful info dikhe jaise student ka naam aur age.",
    codeExample: "class Student {\n    String name;\n    int age;\n\n    Student(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n\n    @Override\n    public String toString() {\n        return \"Student{name='\" + name + \"', age=\" + age + \"}\";\n    }\n}\n\nStudent s = new Student(\"Ali\", 20);\nSystem.out.println(s.toString()); // Student{name='Ali', age=20}\nSystem.out.println(\"Details: \" + s); // auto calls toString()",
    keyPoints: [
      "Returns String representation of the object",
      "Default: ClassName@Integer.toHexString(hashCode())",
      "Override for meaningful output",
      "Automatically called in string concatenation and System.out.println",
      "Should return a concise, informative description",
      "Good for debugging and logging",
    ],
    commonMistakes: [
      "Not overriding toString() (default output is not useful)",
      "Forgetting to override hashCode() when overriding equals()",
      "Making toString() too verbose or including unnecessary data",
    ],
    relatedConcepts: ["equals", "hashcode", "object-class", "class"],
    examNotes: [
      "toString() is called automatically when printing an object",
      "Should be consistent with equals() in terms of meaningful data",
      "Always use @Override annotation when overriding",
    ],
  },

  equals: {
    title: "Equals Method",
    category: "Object Methods",
    answer:
      "equals() is a method from Object that checks if two objects are logically equal. By default it behaves like ==, but should be overridden for meaningful comparison.",
    simpleExplanation:
      "equals() is like comparing two things by their content. == compares addresses, equals() compares what is inside.",
    romanUrduExplanation:
      "equals() do objects ka logical comparison hai. == address compare karta hai, equals() content compare karta hai. Student ka naam aur age same hai ya nahi - ye equals() batata hai.",
    codeExample: "class Student {\n    String name;\n    int age;\n\n    Student(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n\n    @Override\n    public boolean equals(Object obj) {\n        if (this == obj) return true;\n        if (obj == null || getClass() != obj.getClass()) return false;\n        Student other = (Student) obj;\n        return age == other.age && name.equals(other.name);\n    }\n\n    @Override\n    public int hashCode() {\n        return 31 * name.hashCode() + age;\n    }\n}\n\nStudent s1 = new Student(\"Ali\", 20);\nStudent s2 = new Student(\"Ali\", 20);\nSystem.out.println(s1.equals(s2)); // true",
    keyPoints: [
      "Default: compares object references (same as ==)",
      "Override to compare field values (logical equality)",
      "Must override hashCode() when overriding equals()",
      "Contract: reflexive, symmetric, transitive, consistent",
      "equals(null) should return false",
      "Always check null, type, then field values",
    ],
    commonMistakes: [
      "Overriding equals() without overriding hashCode()",
      "Not handling null in equals()",
      "Using getClass() instead of instanceof (breaks subclass equality)",
      "Using == for String comparison instead of equals()",
    ],
    relatedConcepts: ["hashcode", "== vs equals", "object-class", "toString"],
    examNotes: [
      "equals() and hashCode() must be overridden together",
      "If equals() returns true, hashCode() must return the same value",
      "String, Integer, etc. override equals() for content comparison",
      "instanceof in equals() allows subclass equality (debatable)",
    ],
  },

  hashcode: {
    title: "HashCode Method",
    category: "Object Methods",
    answer:
      "hashCode() returns an integer hash code value for the object. It is used by hash-based collections (HashMap, HashSet) to determine storage location.",
    simpleExplanation:
      "hashCode() is like giving each object a unique ID number based on its content. It helps collections quickly find objects.",
    romanUrduExplanation:
      "hashCode() har object ka ek number hai jo uske content pe based hota hai. HashMap aur HashSet is number se object ko jaldi dhoondte hain. Jaise library mein kitab ka catalog number hota hai.",
    codeExample: "class Student {\n    String name;\n    int age;\n\n    Student(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n\n    @Override\n    public int hashCode() {\n        int result = 17;\n        result = 31 * result + name.hashCode();\n        result = 31 * result + age;\n        return result;\n    }\n\n    @Override\n    public boolean equals(Object obj) {\n        if (this == obj) return true;\n        if (obj == null || getClass() != obj.getClass()) return false;\n        Student other = (Student) obj;\n        return age == other.age && name.equals(other.name);\n    }\n}\n\n// Same hashCode for equal objects\nStudent s1 = new Student(\"Ali\", 20);\nStudent s2 = new Student(\"Ali\", 20);\nSystem.out.println(s1.hashCode() == s2.hashCode()); // true",
    keyPoints: [
      "Returns int hash code used for bucketing in hash collections",
      "Equal objects MUST have same hashCode",
      "Unequal objects CAN have same hashCode (collision)",
      "Must override together with equals()",
      "Used by HashMap, HashSet, Hashtable for efficient lookup",
      "When overriding equals, always use prime numbers (like 31) for hashing",
    ],
    commonMistakes: [
      "Overriding equals() without hashCode() (breaks hash collections)",
      "Using mutable fields in hashCode() (can cause lost entries)",
      "Returning same value for all objects (poor distribution)",
    ],
    relatedConcepts: ["equals", "hashmap", "hashset", "object-class"],
    examNotes: [
      "hashCode contract: equal objects must have same hash code",
      "hashCode does not need to be unique (collisions are expected)",
      "String.hashCode() is cached after first call",
      "Use Objects.hash() or Objects.hashCode() for convenience",
    ],
  },

  "equality-operators": {
    title: "== vs equals()",
    category: "Comparisons",
    answer:
      "== compares references (memory addresses) for objects, while equals() compares the actual content/values. For primitives, == compares values.",
    simpleExplanation:
      "== checks if two variables point to the exact same spot in memory. equals() checks if two objects have the same content inside.",
    romanUrduExplanation:
      "== check karta hai ke do variables same jagah point kar rahe hain ya nahi. equals() check karta hai ke do objects ka content same hai ya nahi. Primitives ke liye == value compare karta hai.",
    codeExample: "String s1 = new String(\"Hello\");\nString s2 = new String(\"Hello\");\nString s3 = s1;\n\nSystem.out.println(s1 == s2);      // false (different objects)\nSystem.out.println(s1.equals(s2));  // true (same content)\nSystem.out.println(s1 == s3);       // true (same reference)\n\nint a = 5, b = 5;\nSystem.out.println(a == b); // true (primitives: value comparison)",
    keyPoints: [
      "== for objects: compares memory address (reference comparison)",
      "== for primitives: compares actual value",
      "equals(): compares content/logical equality (if overridden)",
      "String literals are cached, so == may return true for literals",
      "Always use equals() for object content comparison",
      "== should only be used for primitives or null checks",
    ],
    commonMistakes: [
      "Using == to compare String content (works by accident with literals due to pooling)",
      "Not overriding equals() before using it for comparison",
      "Using == for object comparison when you mean logical equality",
    ],
    relatedConcepts: ["equals", "hashcode", "object", "reference-variable"],
    examNotes: [
      "== on String literals: may return true due to string pool (but unreliable)",
      "new String() creates a new object, so == returns false",
      "equals() without override behaves like ==",
      "Always use equals() for comparing objects by content",
    ],
  },
  exception: {
    title: "Exception",
    category: "Exception Handling",
    answer:
      "An exception is an event that disrupts the normal flow of a program during execution. It is an object that encapsulates error information and can be caught and handled.",
    simpleExplanation:
      "An exception is like a fire alarm. It interrupts everything and tells you something went wrong so you can fix it.",
    romanUrduExplanation:
      "Exception ek event hai jo program ke normal flow ko tod deta hai. Fire alarm jaisa hai - sab ruk jata hai aur batata hai ke koi problem hai. Object hai jo error ki information rakhta hai.",
    codeExample: "try {\n    int[] arr = {1, 2, 3};\n    System.out.println(arr[5]); // ArrayIndexOutOfBoundsException\n} catch (ArrayIndexOutOfBoundsException e) {\n    System.out.println(\"Index out of bounds: \" + e.getMessage());\n} finally {\n    System.out.println(\"This always runs\");\n}",
    keyPoints: [
      "Exception is an object of Throwable class hierarchy",
      "Checked exceptions: must be declared or caught (IOException, etc.)",
      "Unchecked exceptions: RuntimeException and its subclasses",
      "Errors (Error class) are system-level and should not be caught",
      "Exception handling prevents program crashes",
      "Try-catch-finally is the basic handling mechanism",
    ],
    commonMistakes: [
      "Catching Exception instead of specific exception types",
      "Using catch(Throwable t) which catches errors too",
      "Empty catch blocks (swallowing exceptions)",
      "Not closing resources (use try-with-resources)",
    ],
    relatedConcepts: ["try", "catch", "finally", "throw", "throws", "checked-exception", "unchecked-exception", "custom-exception"],
    examNotes: [
      "Exception hierarchy: Throwable -> Error, Exception -> RuntimeException",
      "Checked exceptions must be handled (compiler enforces)",
      "Unchecked exceptions can be ignored (but should not be)",
      "try-with-resources auto-closes AutoCloseable resources",
    ],
  },

  try: {
    title: "Try Block",
    category: "Exception Handling",
    answer:
      "The try block encloses code that might throw an exception. If an exception occurs inside try, it is passed to the corresponding catch block.",
    simpleExplanation:
      "Try is like a safety net. You put risky code inside it, and if something goes wrong, the catch block catches the problem.",
    romanUrduExplanation:
      "Try block mein wo code hota hai jo exception throw kar sakta hai. Safety net jaisa hai - agar kuch gadbad hoti hai toh catch block usay pakad leta hai.",
    codeExample: "try {\n    FileInputStream fis = new FileInputStream(\"data.txt\");\n    int data = fis.read();\n    fis.close();\n} catch (FileNotFoundException e) {\n    System.out.println(\"File not found\");\n} catch (IOException e) {\n    System.out.println(\"Error reading file\");\n}",
    keyPoints: [
      "Must be followed by catch or finally (or both)",
      "Multiple catch blocks can follow a single try",
      "Catch blocks should go from specific to general",
      "try-with-resources is preferred for AutoCloseable resources",
      "Code after the throwing line in try block is not executed",
    ],
    commonMistakes: [
      "Not having catch or finally after try (compile error)",
      "Putting catch blocks in wrong order (specific before general)",
      "Swallowing exceptions with empty catch blocks",
    ],
    relatedConcepts: ["catch", "finally", "exception", "throw", "throws"],
    examNotes: [
      "try block alone is not valid (must have catch or finally)",
      "try-with-resources: try (Resource r = new Resource()) { ... }",
      "Multiple catch blocks: most specific first",
    ],
  },

  catch: {
    title: "Catch Block",
    category: "Exception Handling",
    answer:
      "A catch block handles a specific type of exception. It contains code that executes when the corresponding exception is thrown in the try block.",
    simpleExplanation:
      "Catch is like a first responder. When something goes wrong in try, catch handles that specific problem.",
    romanUrduExplanation:
      "Catch block specific exception ko handle karta hai. Jab try mein kuch gadbad hoti hai, catch us particular problem ka solution deta hai.",
    codeExample: "try {\n    int result = 10 / 0;\n} catch (ArithmeticException e) {\n    System.out.println(\"Cannot divide by zero: \" + e.getMessage());\n} catch (Exception e) {\n    System.out.println(\"Some other error: \" + e.getMessage());\n}",
    keyPoints: [
      "Catches a specific exception type",
      "Multiple catch blocks for different exception types",
      "Order: specific exceptions before general ones",
      "Can use multi-catch: catch (IOException | SQLException e)",
      "Exception variable provides error details",
      "If no catch matches, exception propagates up the call stack",
    ],
    commonMistakes: [
      "Catching generic Exception first (hides specific exceptions)",
      "Not logging or handling the exception properly",
      "Empty catch blocks that silently ignore errors",
      "Catching Throwable which includes Error (system failure)",
    ],
    relatedConcepts: ["try", "finally", "exception", "throw", "throws"],
    examNotes: [
      "Multi-catch: catch (IOException | SQLException e) { }",
      "Exception variable is implicitly final",
      "Only one catch block executes per exception",
      "If catch also throws, it propagates to caller",
    ],
  },

  finally: {
    title: "Finally Block",
    category: "Exception Handling",
    answer:
      "The finally block always executes after try-catch, regardless of whether an exception occurred or not. It is used for cleanup code like closing resources.",
    simpleExplanation:
      "Finally is like the cleanup crew. No matter what happens - good or bad - finally always cleans up.",
    romanUrduExplanation:
      "Finally block hamesha chalta hai, chahe exception aaye ya na aaye. Cleanup crew jaisa hai - resource band karna, file close karna, ye sab finally mein hota hai.",
    codeExample: "FileInputStream fis = null;\ntry {\n    fis = new FileInputStream(\"data.txt\");\n    int data = fis.read();\n} catch (IOException e) {\n    System.out.println(\"Error\");\n} finally {\n    if (fis != null) {\n        try {\n            fis.close();\n        } catch (IOException e) {\n            System.out.println(\"Error closing\");\n        }\n    }\n    System.out.println(\"Cleanup done\");\n}\n\n// Better: try-with-resources\ntry (FileInputStream fis2 = new FileInputStream(\"data.txt\")) {\n    int data = fis2.read();\n} catch (IOException e) {\n    System.out.println(\"Error\");\n}",
    keyPoints: [
      "Always executes (even if exception is thrown, caught, or rethrown)",
      "Used for resource cleanup (closing files, connections, streams)",
      "Skipped only if JVM exits (System.exit()) or thread is killed",
      "try-with-resources is preferred (auto-closes resources)",
      "finally block can also throw exceptions",
      "Not mandatory (try-catch without finally is valid)",
    ],
    commonMistakes: [
      "Putting return in try or catch block and expecting different behavior in finally",
      "Not using try-with-resources for AutoCloseable resources",
      "Throwing exception in finally (overwrites original exception)",
    ],
    relatedConcepts: ["try", "catch", "exception", "throw", "throws"],
    examNotes: [
      "finally always executes (with rare exceptions like System.exit())",
      "try-with-resources reduces finally boilerplate",
      "If finally has a return, it overrides try/catch return value",
    ],
  },

  throw: {
    title: "Throw Keyword",
    category: "Exception Handling",
    answer:
      "Throw is used to explicitly throw an exception from within a method or block. It is followed by an exception object.",
    simpleExplanation:
      "Throw is like raising your hand and saying 'I have a problem!' You create the exception and throw it.",
    romanUrduExplanation:
      "Throw ka matlab hai ke aap khud exception create karke phenkte hain. Haath utha ke kehna jaisa hai ke 'Mujhe problem hai!' Method ke andar use hota hai.",
    codeExample: "class AgeValidator {\n    static void validateAge(int age) {\n        if (age < 0 || age > 150) {\n            throw new IllegalArgumentException(\"Invalid age: \" + age);\n        }\n        System.out.println(\"Valid age: \" + age);\n    }\n\n    public static void main(String[] args) {\n        validateAge(25);  // Valid age: 25\n        validateAge(-5);   // throws IllegalArgumentException\n    }\n}",
    keyPoints: [
      "Used inside a method or block to throw an exception",
      "Followed by an exception object (new ExceptionType())",
      "Can throw checked or unchecked exceptions",
      "Transfers control to the nearest matching catch block",
      "Can throw only one exception at a time",
      "Common for input validation and custom error conditions",
    ],
    commonMistakes: [
      "Throwing an exception without declaring it (for checked exceptions)",
      "Using throw with a class instead of an object (throw Exception.class is wrong)",
      "Throwing exceptions that are too broad",
    ],
    relatedConcepts: ["throws", "try", "catch", "exception", "custom-exception"],
    examNotes: [
      "throw new Exception() not throw Exception",
      "throw is a statement (followed by object), throws is a declaration",
      "throw immediately exits the current method",
    ],
  },

  throws: {
    title: "Throws Keyword",
    category: "Exception Handling",
    answer:
      "Throws is used in a method signature to declare that the method might throw certain checked exceptions. It tells the caller to handle or propagate the exception.",
    simpleExplanation:
      "Throws is like a warning label on a method: 'This method might throw this exception, deal with it!'",
    romanUrduExplanation:
      "Throws method signature mein lagta hai aur batata hai ke ye method ye exception throw kar sakta hai. Caller ko warning hai ke exception handle karna parta hai.",
    codeExample: "class FileHandler {\n    static void readFile(String path) throws IOException {\n        FileInputStream fis = new FileInputStream(path);\n        int data = fis.read();\n        fis.close();\n    }\n\n    static void processFile(String path) {\n        try {\n            readFile(path);\n        } catch (IOException e) {\n            System.out.println(\"Error: \" + e.getMessage());\n        }\n    }\n}",
    keyPoints: [
      "Used in method declaration to declare possible exceptions",
      "Caller must handle (try-catch) or declare (throws) the exception",
      "Used for checked exceptions (IOException, SQLException, etc.)",
      "Multiple exceptions can be declared: throws IOException, SQLException",
      "Unchecked exceptions do not need to be declared in throws",
      "Part of the method signature",
    ],
    commonMistakes: [
      "Confusing throw (creates exception) with throws (declares exception)",
      "Not handling or declaring checked exceptions (compile error)",
      "Using throws for unchecked exceptions (not required)",
    ],
    relatedConcepts: ["throw", "try", "catch", "checked-exception", "unchecked-exception"],
    examNotes: [
      "throw = statement that throws an exception",
      "throws = declaration in method signature",
      "throws is also used with constructor declarations",
      "Main method can declare throws Exception",
    ],
  },

  "checked-exception": {
    title: "Checked Exception",
    category: "Exception Handling",
    answer:
      "Checked exceptions are exceptions that must be either caught or declared in the method signature. The compiler enforces this handling. They represent recoverable conditions.",
    simpleExplanation:
      "Checked exceptions are problems the compiler forces you to handle. Like a compiler saying 'Hey, this file might not exist, what will you do about it?'",
    romanUrduExplanation:
      "Checked exceptions wo exceptions hain jinhe compiler handle karwata hai. Compiler kehta hai ke ye file nahi mil sakti, iska kya karoge? Try-catch lagana ya throws likhna zaroori hai.",
    codeExample: "import java.io.*;\n\nclass CheckedExample {\n    // Must declare or handle checked exception\n    static void readFile() throws FileNotFoundException {\n        FileInputStream fis = new FileInputStream(\"data.txt\");\n    }\n\n    static void safeRead() {\n        try {\n            FileInputStream fis = new FileInputStream(\"data.txt\");\n        } catch (FileNotFoundException e) {\n            System.out.println(\"File not found!\");\n        }\n    }\n}",
    keyPoints: [
      "Compiler enforces handling (try-catch or throws)",
      "Subclasses of Exception (but not RuntimeException)",
      "Examples: IOException, SQLException, FileNotFoundException",
      "Represents conditions that can reasonably be expected",
      "Must be caught or declared in method/constructor signature",
      "Forces the programmer to think about error handling",
    ],
    commonMistakes: [
      "Ignoring checked exceptions with empty catch blocks",
      "Overly broad throws declarations to avoid handling",
      "Catching and rethrowing without useful processing",
    ],
    relatedConcepts: ["unchecked-exception", "try", "catch", "throws", "exception", "custom-exception"],
    examNotes: [
      "Checked = compiler checked = must be handled",
      "Not a subclass of RuntimeException",
      "Typically represent recoverable conditions",
      "try-with-resources handles AutoCloseable exceptions automatically",
    ],
  },

  "unchecked-exception": {
    title: "Unchecked Exception",
    category: "Exception Handling",
    answer:
      "Unchecked exceptions are RuntimeException and its subclasses. The compiler does not require you to catch or declare them. They typically represent programming errors.",
    simpleExplanation:
      "Unchecked exceptions are bugs in your code that Java does not force you to handle. Like NullPointerException - it is your fault for not checking null.",
    romanUrduExplanation:
      "Unchecked exceptions wo hain jo compiler handle karne pe majboor nahi karta. RuntimeException ki subclasses hain. Programming errors hoti hain - jaise null check nahi kiya toh NullPointerException.",
    codeExample: "class UncheckedExample {\n    static void riskyMethod() {\n        String str = null;\n        System.out.println(str.length()); // NullPointerException\n    }\n\n    static void divide(int a, int b) {\n        System.out.println(a / b); // ArithmeticException\n    }\n\n    // No throws declaration needed for unchecked\n    public static void main(String[] args) {\n        riskyMethod();\n    }\n}",
    keyPoints: [
      "Compiler does not force handling (no try-catch or throws required)",
      "Subclasses of RuntimeException",
      "Examples: NullPointerException, ArrayIndexOutOfBoundsException, ArithmeticException",
      "Usually indicate programming bugs",
      "Should still be handled when expected",
      "Can be prevented with proper coding practices",
    ],
    commonMistakes: [
      "Ignoring unchecked exceptions entirely",
      "Using unchecked exceptions for flow control",
      "Not adding null checks to prevent NullPointerException",
    ],
    relatedConcepts: ["checked-exception", "try", "catch", "exception", "throw"],
    examNotes: [
      "Unchecked = RuntimeException and its subclasses",
      "Do not need to be declared in throws clause",
      "ArithmeticException, ClassCastException are common unchecked exceptions",
      "Good practice: handle even unchecked exceptions where recovery is possible",
    ],
  },

  "custom-exception": {
    title: "Custom Exception",
    category: "Exception Handling",
    answer:
      "Custom exceptions are user-defined exception classes created by extending Exception (checked) or RuntimeException (unchecked). They provide domain-specific error handling.",
    simpleExplanation:
      "Custom exceptions are like creating your own error types. Instead of a generic error, you create InsufficientFundsException that says exactly what went wrong.",
    romanUrduExplanation:
      "Custom exceptions wo hain jo aap khud banate hain. Generic error ki jagah InsufficientFundsException jaisa specific error bana sakte hain jo exactly bataye ke kya problem hai.",
    codeExample: "class InsufficientFundsException extends Exception {\n    private double deficit;\n\n    InsufficientFundsException(double deficit) {\n        super(\"Insufficient funds. Need \" + deficit + \" more.\");\n        this.deficit = deficit;\n    }\n\n    double getDeficit() {\n        return deficit;\n    }\n}\n\nclass BankAccount {\n    double balance;\n\n    void withdraw(double amount) throws InsufficientFundsException {\n        if (amount > balance) {\n            throw new InsufficientFundsException(amount - balance);\n        }\n        balance -= amount;\n    }\n}",
    keyPoints: [
      "Extend Exception for checked, RuntimeException for unchecked",
      "Should include meaningful message and relevant fields",
      "Follow naming convention: XxxException",
      "Provide constructors for different scenarios",
      "Can add fields/methods for error-specific data",
      "Makes error handling more precise and readable",
    ],
    commonMistakes: [
      "Not providing useful constructors and messages",
      "Extending Exception when RuntimeException is more appropriate",
      "Creating too many custom exception classes",
      "Not following naming convention (ending with Exception)",
    ],
    relatedConcepts: ["exception", "checked-exception", "unchecked-exception", "throw", "throws"],
    examNotes: [
      "Custom checked: extends Exception",
      "Custom unchecked: extends RuntimeException",
      "Include constructors that accept message, cause, or both",
      "Use custom exceptions to represent domain-specific errors",
    ],
  },
  arraylist: {
    title: "ArrayList",
    category: "Collections",
    answer:
      "ArrayList is a resizable array implementation of the List interface. It maintains insertion order and allows duplicate elements. backed by an internal array that grows as needed.",
    simpleExplanation:
      "ArrayList is like a dynamic shopping list. You can add, remove, and find items, and the list automatically grows as you add more.",
    romanUrduExplanation:
      "ArrayList ek resizable array hai. Shopping list jaisa hai jo khud badhti jaati hai. Items add, remove kar sakte hain aur order maintain hota hai. Duplicates allowed hain.",
    codeExample: "import java.util.ArrayList;\n\nArrayList<String> names = new ArrayList<>();\nnames.add(\"Ali\");\nnames.add(\"Sara\");\nnames.add(\"Ali\"); // duplicates allowed\n\nnames.remove(\"Sara\");\nSystem.out.println(names.get(0)); // Ali\nSystem.out.println(names.size()); // 2\n\nfor (String name : names) {\n    System.out.println(name);\n}",
    keyPoints: [
      "Resizable array (grows by 50% when full)",
      "Maintains insertion order",
      "Allows duplicates",
      "Random access is O(1) via index",
      "Insertion/deletion in middle is O(n)",
      "Not synchronized (not thread-safe by default)",
    ],
    commonMistakes: [
      "Using raw type instead of generics (ArrayList instead of ArrayList<String>)",
      "Modifying list while iterating with for-each (ConcurrentModificationException)",
      "Confusing get() with remove() behavior",
      "Using remove(int) when you mean remove(Object)",
    ],
    relatedConcepts: ["linkedlist", "hashset", "hashmap", "comparable", "comparator"],
    examNotes: [
      "ArrayList is best for random access and iteration",
      "remove(int index) removes by index, remove(Object o) removes by value",
      "Use List接口 for type flexibility: List<String> list = new ArrayList<>()",
      "Initial capacity is 10, grows by 1.5x",
    ],
  },

  linkedlist: {
    title: "LinkedList",
    category: "Collections",
    answer:
      "LinkedList is a doubly-linked list implementation of the List and Deque interfaces. It allows efficient insertion/deletion at both ends and in the middle.",
    simpleExplanation:
      "LinkedList is like a chain of paper clips linked together. Adding or removing a link in the middle is easy, but finding a specific link takes time.",
    romanUrduExplanation:
      "LinkedList ek doubly-linked list hai. Paper clips ki chain jaisi hai - beech mein link add ya remove karna aasan hai, lekin koi specific link dhoondhne mein waqt lagta hai.",
    codeExample: "import java.util.LinkedList;\n\nLinkedList<String> queue = new LinkedList<>();\nqueue.addFirst(\"First\");\nqueue.addLast(\"Last\");\nqueue.add(1, \"Middle\");\n\nSystem.out.println(queue); // [First, Middle, Last]\nqueue.removeFirst();\nqueue.removeLast();\nSystem.out.println(queue); // [Middle]",
    keyPoints: [
      "Doubly-linked list (each node has prev and next)",
      "Efficient insertion/deletion at head and tail: O(1)",
      "No random access (must traverse): O(n)",
      "Also implements Deque (double-ended queue)",
      "Uses more memory than ArrayList (node pointers)",
      "Good for frequent insertions/deletions, bad for random access",
    ],
    commonMistakes: [
      "Using LinkedList for random access (use ArrayList instead)",
      "Not understanding that get(index) is O(n)",
      "Confusing it with singly-linked list",
    ],
    relatedConcepts: ["arraylist", "hashset", "hashmap", "collections"],
    examNotes: [
      "LinkedList is better for add/remove at beginning",
      "ArrayList is better for get by index and iteration",
      "LinkedList also works as a stack and queue",
      "Node objects consume extra memory (prev + next pointers)",
    ],
  },

  hashset: {
    title: "HashSet",
    category: "Collections",
    answer:
      "HashSet is a Set implementation backed by a HashMap. It does not allow duplicates and makes no guarantees about order. Uses hash table for O(1) operations.",
    simpleExplanation:
      "HashSet is like a collection of unique tickets. No two tickets can be the same, and they are not in any particular order.",
    romanUrduExplanation:
      "HashSet ek aisi collection hai jisme duplicates nahi hote. Unique tickets ki collection jaisi hai - koi ticket dobara nahi ho sakti aur koi order nahi hai.",
    codeExample: "import java.util.HashSet;\n\nHashSet<String> fruits = new HashSet<>();\nfruits.add(\"Apple\");\nfruits.add(\"Banana\");\nfruits.add(\"Apple\"); // duplicate - not added\n\nSystem.out.println(fruits); // [Apple, Banana]\nSystem.out.println(fruits.contains(\"Apple\")); // true\nfruits.remove(\"Banana\");",
    keyPoints: [
      "No duplicates allowed (uses equals and hashCode)",
      "No guaranteed order (unordered)",
      "O(1) add, remove, contains operations",
      "Backed by HashMap internally",
      "Allows one null element",
      "Not synchronized (not thread-safe by default)",
    ],
    commonMistakes: [
      "Expecting elements in insertion order (use LinkedHashSet for that)",
      "Not overriding equals and hashCode (duplicates may not be detected)",
      "Using HashSet when order matters (use LinkedHashSet or TreeSet)",
    ],
    relatedConcepts: ["hashmap", "arraylist", "linkedlist", "hashcode", "equals"],
    examNotes: [
      "HashSet internally uses HashMap with dummy values",
      "Elements must override equals() and hashCode()",
      "For sorted unique elements, use TreeSet",
      "For insertion order, use LinkedHashSet",
    ],
  },

  hashmap: {
    title: "HashMap",
    category: "Collections",
    answer:
      "HashMap is a Map implementation that stores key-value pairs. It uses hashing for O(1) average-case lookup. Keys must override equals() and hashCode().",
    simpleExplanation:
      "HashMap is like a dictionary. You look up a word (key) to find its definition (value). Very fast lookup.",
    romanUrduExplanation:
      "HashMap key-value pairs store karta hai. Dictionary jaisa hai - word (key) se uska matlab (value) dhoondte hain. Lookup bohot fast hai O(1) average.",
    codeExample: "import java.util.HashMap;\n\nHashMap<String, Integer> ages = new HashMap<>();\nages.put(\"Ali\", 25);\nages.put(\"Sara\", 22);\nages.put(\"Hassan\", 30);\n\nSystem.out.println(ages.get(\"Ali\")); // 25\nSystem.out.println(ages.containsKey(\"Sara\")); // true\nages.remove(\"Hassan\");\n\nfor (String key : ages.keySet()) {\n    System.out.println(key + \": \" + ages.get(key));\n}",
    keyPoints: [
      "Stores key-value pairs (Map.Entry)",
      "O(1) average for get, put, remove",
      "Keys must be unique (duplicates replace old value)",
      "Allows one null key and multiple null values",
      "Not ordered (use LinkedHashMap for insertion order)",
      "Initial capacity 16, load factor 0.75 (resizes at 75% full)",
    ],
    commonMistakes: [
      "Using mutable objects as keys (can lose entries)",
      "Not overriding equals() and hashCode() for custom key objects",
      "Confusing put() with get() behavior",
      "Expecting order (use LinkedHashMap for that)",
    ],
    relatedConcepts: ["hashset", "arraylist", "linkedlist", "hashcode", "equals", "comparable", "comparator"],
    examNotes: [
      "HashMap uses bucket + linked list + tree (Java 8: treeify at 8 entries)",
      "Key objects must have consistent equals() and hashCode()",
      "Thread-safe alternatives: ConcurrentHashMap, Collections.synchronizedMap()",
      "get() returns null if key not found (unlike getOrDefault)",
    ],
  },

  comparable: {
    title: "Comparable Interface",
    category: "Collections",
    answer:
      "Comparable is an interface that defines a natural ordering for a class. It has one method: compareTo(). Implemented by the class whose objects need to be sorted.",
    simpleExplanation:
      "Comparable is like a built-in ruler. The object itself knows how to compare itself to another object of the same type.",
    romanUrduExplanation:
      "Comparable ek interface hai jo natural ordering define karta hai. Object khud jaanta hai ke doosre object se kaise compare hona hai. compareTo() method implement karte hain.",
    codeExample: "class Student implements Comparable<Student> {\n    String name;\n    int age;\n\n    Student(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n\n    public int compareTo(Student other) {\n        return this.age - other.age; // ascending by age\n    }\n\n    public String toString() {\n        return name + \" (\" + age + \")\";\n    }\n}\n\n// Usage\nList<Student> students = new ArrayList<>();\nstudents.add(new Student(\"Ali\", 25));\nstudents.add(new Student(\"Sara\", 22));\nCollections.sort(students); // uses compareTo\nSystem.out.println(students); // [Sara (22), Ali (25)]",
    keyPoints: [
      "Single method: int compareTo(T other)",
      "Returns negative, zero, or positive",
      "Defines natural ordering (used by Collections.sort, TreeSet)",
      "Implemented by the class being compared",
      "compareTo must be consistent with equals",
      "Cannot compare with null (throws NullPointerException)",
    ],
    commonMistakes: [
      "Inconsistent compareTo and equals (causes bugs in sorted collections)",
      "Integer overflow in subtraction (use Integer.compare instead)",
      "Not handling null in compareTo",
    ],
    relatedConcepts: ["comparator", "collections", "hashmap", "hashset", "sorting"],
    examNotes: [
      "Comparable: natural ordering (inside the class)",
      "Comparator: custom ordering (external)",
      "Comparable<T> vs Comparator<T> design pattern",
      "Use Integer.compare(), String.compareTo() for safe comparison",
    ],
  },

  comparator: {
    title: "Comparator Interface",
    category: "Collections",
    answer:
      "Comparator is an interface for defining custom ordering for objects. Unlike Comparable, it is separate from the class being compared. Has a compare() method.",
    simpleExplanation:
      "Comparator is like a custom ruler you create. You can define different ways to compare objects without changing the original class.",
    romanUrduExplanation:
      "Comparator ek interface hai jo custom ordering define karta hai. Comparable ke alawa hai - original class ko change kiye baghair alag alag tareeqon se compare kar sakte hain.",
    codeExample: "class Student {\n    String name;\n    int age;\n\n    Student(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n}\n\n// Comparator by name\nComparator<Student> byName = (s1, s2) -> s1.name.compareTo(s2.name);\n\n// Comparator by age\nComparator<Student> byAge = (s1, s2) -> s1.age - s2.age;\n\nList<Student> students = new ArrayList<>();\nstudents.add(new Student(\"Ali\", 25));\nstudents.add(new Student(\"Sara\", 22));\n\nstudents.sort(byName); // sort by name\nstudents.sort(byAge);  // sort by age\nstudents.sort(byName.reversed()); // reverse name order",
    keyPoints: [
      "Separate from the class being compared",
      "Method: int compare(T o1, T o2)",
      "Can define multiple different orderings",
      "Can be passed to sort() or used with sorted collections",
      "Lambda-friendly (functional interface)",
      "Can be combined: thenComparing(), reversed()",
    ],
    commonMistakes: [
      "Confusing Comparator with Comparable",
      "Not handling null values in compare()",
      "Forgetting that compare() returns int, not boolean",
      "Not considering all tie-breaking scenarios",
    ],
    relatedConcepts: ["comparable", "collections", "arraylist", "sorting", "lambda"],
    examNotes: [
      "Comparator: external, multiple orderings possible",
      "Comparable: internal, single natural ordering",
      "Java 8+ allows lambda syntax for Comparator",
      "Comparator.comparing() and Comparator.comparingInt() are useful factory methods",
    ],
  },
  association: {
    title: "Association",
    category: "Relationships",
    answer:
      "Association is a relationship between two classes where objects of one class are related to objects of another. It can be one-to-one, one-to-many, many-to-many.",
    simpleExplanation:
      "Association is like a friendship. Two people are connected, but they exist independently. One person can have many friends.",
    romanUrduExplanation:
      "Association do classes ke beech ka rishta hai. Dosti jaisa hai - do log connected hain lekin alag alag exist karte hain. Ek ke kayi dost ho sakte hain.",
    codeExample: "class Teacher {\n    String name;\n    List<Student> students; // association: Teacher has many Students\n\n    Teacher(String name) {\n        this.name = name;\n        this.students = new ArrayList<>();\n    }\n}\n\nclass Student {\n    String name;\n    Student(String name) { this.name = name; }\n}\n\nTeacher t = new Teacher(\"Mr. Khan\");\nt.students.add(new Student(\"Ali\"));\nt.students.add(new Student(\"Sara\"));",
    keyPoints: [
      "Describes how classes are related",
      "Can be bidirectional or unidirectional",
      "Types: one-to-one, one-to-many, many-to-many",
      "Objects exist independently of each other",
      "Base relationship (aggregation and composition are special types)",
      "Managed through references (fields)",
    ],
    commonMistakes: [
      "Confusing association with composition (association is weaker)",
      "Not considering bidirectional vs unidirectional",
      "Creating circular associations",
    ],
    relatedConcepts: ["aggregation", "composition", "dependency", "has-a", "coupling"],
    examNotes: [
      "Association is the general term for class relationships",
      "Aggregation = weak HAS-A (independent lifecycles)",
      "Composition = strong HAS-A (dependent lifecycles)",
    ],
  },

  aggregation: {
    title: "Aggregation",
    category: "Relationships",
    answer:
      "Aggregation is a weak HAS-A relationship where the child can exist independently of the parent. If the parent is destroyed, the child survives.",
    simpleExplanation:
      "Aggregation is like a library and books. If the library closes, the books still exist and can be moved to another library.",
    romanUrduExplanation:
      "Aggregation ek weak HAS-A rishta hai. Library aur kitaabon jaisa hai - agar library band ho jaye toh kitaabain abhi bhi exist karti hain aur doosri library mein ja sakti hain.",
    codeExample: "class Department {\n    String name;\n    List<Teacher> teachers; // aggregation\n\n    Department(String name) {\n        this.name = name;\n        this.teachers = new ArrayList<>();\n    }\n}\n\nclass Teacher {\n    String name;\n    Teacher(String name) { this.name = name; }\n}\n\nDepartment dept = new Department(\"CS\");\nTeacher t1 = new Teacher(\"Ali\");\nteachers.add(t1);\n// If Department is destroyed, Teacher t1 still exists independently",
    keyPoints: [
      "Weak HAS-A relationship",
      "Child object can exist independently",
      "Lifecycle of child is not tied to parent",
      "Implemented through references passed in constructor or setter",
      "Parent does not create the child",
      "Part-of relationship but loose coupling",
    ],
    commonMistakes: [
      "Confusing aggregation with composition",
      "Creating dependencies that should be composition",
    ],
    relatedConcepts: ["composition", "association", "has-a", "dependency", "coupling"],
    examNotes: [
      "Aggregation: child can outlive the parent",
      "Composition: child dies with the parent",
      "Aggregation is indicated by hollow diamond in UML",
    ],
  },

  composition: {
    title: "Composition",
    category: "Relationships",
    answer:
      "Composition is a strong HAS-A relationship where the child cannot exist without the parent. The parent controls the child's lifecycle.",
    simpleExplanation:
      "Composition is like a house and its rooms. If the house is destroyed, the rooms are destroyed too. Rooms cannot exist without the house.",
    romanUrduExplanation:
      "Composition ek strong HAS-A rishta hai. Ghar aur kamron jaisa hai - agar ghar toot gaya toh kamre bhi khatam. Kamre ghar ke bina nahi reh sakte.",
    codeExample: "class Car {\n    private final Engine engine; // composition: Car owns Engine\n\n    Car() {\n        this.engine = new Engine(); // Car creates Engine\n    }\n\n    void start() {\n        engine.start();\n    }\n}\n\nclass Engine {\n    void start() {\n        System.out.println(\"Engine started\");\n    }\n}\n\n// Engine cannot exist without Car in this design\nCar car = new Car();\ncar.start();",
    keyPoints: [
      "Strong HAS-A relationship",
      "Child cannot exist without parent (lifecycle dependent)",
      "Parent creates and owns the child",
      "Child is not shared between parents",
      "Strongest form of HAS-A relationship",
      "Indicated by filled diamond in UML",
    ],
    commonMistakes: [
      "Making everything composition (overly coupled designs)",
      "Not considering if independent lifecycle is needed",
      "Circular composition (A contains B, B contains A)",
    ],
    relatedConcepts: ["aggregation", "association", "has-a", "dependency", "coupling", "cohesion"],
    examNotes: [
      "Composition: parent and child have same lifecycle",
      "Favor composition over inheritance (composition over inheritance principle)",
      "Composition provides more flexibility and loose coupling",
      "Implemented with private fields created in constructor",
    ],
  },

  dependency: {
    title: "Dependency",
    category: "Relationships",
    answer:
      "Dependency is the weakest relationship where one class uses another temporarily (e.g., as a method parameter or local variable). If class A depends on B, changes in B can affect A.",
    simpleExplanation:
      "Dependency is like borrowing a tool. You use it temporarily and then return it. You depend on it, but you do not own it.",
    romanUrduExplanation:
      "Dependency sabse weak rishta hai. Tool udhar lena jaisa hai - temporarily use karte hain. Aap depend karte hain lekin apna nahi hai. Ek class doosri ko method mein use karti hai.",
    codeExample: "class ReportGenerator {\n    void generateReport(Database db) { // dependency: uses Database temporarily\n        db.connect();\n        String data = db.fetchData();\n        System.out.println(\"Report: \" + data);\n    }\n}\n\nclass Database {\n    void connect() { System.out.println(\"Connected\"); }\n    String fetchData() { return \"data\"; }\n}\n\n// Database is not a field of ReportGenerator\n// It is used temporarily in the method",
    keyPoints: [
      "Weakest form of relationship",
      "One class uses another temporarily (method parameter, local variable, or static method call)",
      "Not a permanent association",
      "Changes in the depended class can break the depending class",
      "Should be minimized for loose coupling",
      "Indicated by dashed arrow in UML",
    ],
    commonMistakes: [
      "Turning dependencies into associations (fields) when not needed",
      "Not noticing hidden dependencies",
      "Creating tight coupling through dependencies",
    ],
    relatedConcepts: ["association", "aggregation", "composition", "has-a", "coupling"],
    examNotes: [
      "Dependency is USES-A relationship",
      "Association is HAS-A relationship (weaker than composition)",
      "Dependency appears in method signatures, not as fields",
      "Minimize dependencies for maintainable code",
    ],
  },

  "has-a": {
    title: "HAS-A Relationship",
    category: "Relationships",
    answer:
      "HAS-A is a relationship where one class contains an instance of another class as a field. It represents object composition and promotes code reuse.",
    simpleExplanation:
      "HAS-A means one thing contains another. A car HAS-A engine. A student HAS-A name (String).",
    romanUrduExplanation:
      "HAS-A ka matlab hai ke ek cheez mein doosri cheez hai. Car mein engine hai. Student mein naam hai. Ye composition ka basic concept hai.",
    codeExample: "class Car {\n    private Engine engine;  // Car HAS-A Engine\n    private String color;   // Car HAS-A String (color)\n\n    Car() {\n        this.engine = new Engine();\n    }\n}\n\nclass Engine {\n    int horsepower;\n    void start() { System.out.println(\"Vroom!\"); }\n}\n\n// Car has an Engine - composition (strong HAS-A)\n// Car has a String - also HAS-A (but String is immutable)",
    keyPoints: [
      "Implemented by having an object as a field",
      "Promotes composition over inheritance",
      "Can be composition (strong) or aggregation (weak)",
      "More flexible than inheritance",
      "Does not create type hierarchy (IS-A)",
      "Objects can be replaced at runtime",
    ],
    commonMistakes: [
      "Using inheritance when HAS-A is more appropriate",
      "Confusing HAS-A with IS-A (Dog IS-A Animal vs Car HAS-A Engine)",
    ],
    relatedConcepts: ["composition", "aggregation", "association", "inheritance", "is-a"],
    examNotes: [
      "HAS-A is implemented through object composition",
      "Favor HAS-A over IS-A for code reuse",
      "HAS-A provides better encapsulation and flexibility",
    ],
  },
  solid: {
    title: "SOLID Principles",
    category: "Design Principles",
    answer:
      "SOLID is an acronym for five OOP design principles that make software more maintainable, flexible, and scalable: SRP, OCP, LSP, ISP, DIP.",
    simpleExplanation:
      "SOLID is like five rules for building good software. Following them keeps your code clean and easy to change.",
    romanUrduExplanation:
      "SOLID paanch principles ka acronym hai jo software ko behtar banate hain. Inhe follow karne se code saaf aur change karna aasan rehta hai.",
    codeExample: "// S - Single Responsibility: Each class does one thing\n// O - Open/Closed: Open for extension, closed for modification\n// L - Liskov Substitution: Subtypes must be substitutable\n// I - Interface Segregation: Many small interfaces > one big\n// D - Dependency Inversion: Depend on abstractions, not concretions",
    keyPoints: [
      "SRP: A class should have only one reason to change",
      "OCP: Software entities should be open for extension, closed for modification",
      "LSP: Subclasses should be substitutable for their parent classes",
      "ISP: Clients should not depend on interfaces they do not use",
      "DIP: Depend on abstractions, not concrete implementations",
      "Together they promote loose coupling and high cohesion",
    ],
    commonMistakes: [
      "Applying all principles at once (start with the most impactful)",
      "Over-engineering (not every class needs all principles)",
      "Confusing SOLID with design patterns",
    ],
    relatedConcepts: ["srp", "ocp", "lsp", "isp", "dip", "coupling", "cohesion"],
    examNotes: [
      "SOLID = 5 design principles for clean OOP code",
      "Each principle addresses a specific design problem",
      "SOLID reduces technical debt and improves testability",
      "Real-world code often violates some principles for practicality",
    ],
  },
  srp: {
    title: "Single Responsibility Principle (SRP)",
    category: "Design Principles",
    answer:
      "A class should have only one reason to change, meaning it should have only one job or responsibility.",
    simpleExplanation:
      "SRP means a class should do only one thing. A teacher teaches, a cook cooks - do not make the teacher also cook in the same class.",
    romanUrduExplanation:
      "SRP ka matlab hai ke ek class sirf ek kaam kare. Teacher padhaye, cook pakaye - ek class mein dono kaam mat karo. Ek class, ek responsibility.",
    codeExample: "// BAD: Two responsibilities\nclass Employee {\n    void calculateSalary() { }\n    void saveToDatabase() { }\n}\n\n// GOOD: Separated responsibilities\nclass Employee {\n    void calculateSalary() { }\n}\n\nclass EmployeeRepository {\n    void saveToDatabase(Employee e) { }\n}",
    keyPoints: [
      "Each class should have only one reason to change",
      "One responsibility = one job",
      "Makes classes easier to understand, test, and maintain",
      "Reduces coupling between unrelated features",
      "Separate concerns: business logic vs persistence vs presentation",
    ],
    commonMistakes: [
      "Putting too many responsibilities in one class",
      "Over-splitting (creating too many tiny classes)",
      "Confusing SRP with having only one method",
    ],
    relatedConcepts: ["solid", "cohesion", "coupling", "ocp"],
    examNotes: [
      "SRP is the most fundamental SOLID principle",
      "Reason to change = responsibility",
      "A class with multiple responsibilities is harder to maintain",
    ],
  },

  ocp: {
    title: "Open/Closed Principle (OCP)",
    category: "Design Principles",
    answer:
      "Software entities should be open for extension but closed for modification. You should be able to add new functionality without changing existing code.",
    simpleExplanation:
      "OCP means you can add new features without breaking old code. Like adding a new plugin to a program without rewriting the program.",
    romanUrduExplanation:
      "OCP ka matlab hai naye features code mein baghair purane code ko change kiye add kar sakte hain. Plugin lagana jaisa hai - program rewrite nahi karna parta.",
    codeExample: "// GOOD: Open for extension, closed for modification\nclass Shape {\n    double area() { return 0; }\n}\n\nclass Circle extends Shape {\n    double radius;\n    double area() { return Math.PI * radius * radius; }\n}\n\nclass Rectangle extends Shape {\n    double length, width;\n    double area() { return length * width; }\n}\n\n// To add Triangle, just add a new class - no existing code changes\nclass Triangle extends Shape {\n    double base, height;\n    double area() { return 0.5 * base * height; }\n}",
    keyPoints: [
      "Open for extension: new behavior through inheritance or composition",
      "Closed for modification: existing code stays unchanged",
      "Use abstraction (interfaces, abstract classes) for extension points",
      "Strategy pattern is a good example of OCP",
      "Reduces risk of breaking existing functionality",
    ],
    commonMistakes: [
      "Modifying existing classes to add new features (violates OCP)",
      "Creating inheritance hierarchies that are too deep",
      "Not using abstraction to create extension points",
    ],
    relatedConcepts: ["solid", "srp", "lsp", "inheritance", "interface", "polymorphism"],
    examNotes: [
      "OCP is achieved through polymorphism and abstraction",
      "Use interfaces to define extension points",
      "OCP reduces the risk of regression bugs",
    ],
  },

  lsp: {
    title: "Liskov Substitution Principle (LSP)",
    category: "Design Principles",
    answer:
      "Subtypes must be substitutable for their base types without altering the correctness of the program.",
    simpleExplanation:
      "LSP means if a program works with a parent class, it should also work with any child class without breaking.",
    romanUrduExplanation:
      "LSP ka matlab hai agar program parent class ke saath kaam karta hai toh kisi bhi child class ke saath bhi kaam karna chahiye.",
    codeExample: "// BAD: Violates LSP\nclass Rectangle {\n    protected int width, height;\n    void setWidth(int w) { width = w; }\n    void setHeight(int h) { height = h; }\n    int area() { return width * height; }\n}\n\nclass Square extends Rectangle {\n    void setWidth(int w) { width = w; height = w; }\n    void setHeight(int h) { width = h; height = h; }\n}\n\n// This breaks!\nvoid resize(Rectangle r) {\n    r.setWidth(5);\n    r.setHeight(10);\n    // For Rectangle: area = 50. For Square: area = 100!\n}",
    keyPoints: [
      "Subclasses must not break the parent class contract",
      "Objects of parent type can be replaced with subtype objects",
      "Behavioral subtyping: same behavior, same expectations",
      "Square-Rectangle problem is a classic LSP violation",
      "All preconditions must be same or weaker in subclass",
      "All postconditions must be same or stronger in subclass",
    ],
    commonMistakes: [
      "Creating subclass that changes parent behavior unexpectedly",
      "Forcing inheritance when it does not fit",
      "Not testing with parent type references",
    ],
    relatedConcepts: ["solid", "ocp", "inheritance", "polymorphism", "is-a"],
    examNotes: [
      "LSP ensures polymorphism works correctly",
      "Square-Rectangle is the classic example of LSP violation",
      "LSP strengthens the OCP by enabling substitutability",
    ],
  },
  isp: {
    title: "Interface Segregation Principle (ISP)",
    category: "Design Principles",
    answer:
      "Clients should not be forced to depend on interfaces they do not use. Many specific interfaces are better than one general-purpose interface.",
    simpleExplanation:
      "ISP means do not force a class to implement methods it does not need. Give each class only the interface it actually uses.",
    romanUrduExplanation:
      "ISP ka matlab hai kisi class ko wo methods implement karne pe majboor mat karo jo use nahi karti. Sirf wo interface do jo zaroorat hai.",
    codeExample: "// BAD: Fat interface\ninterface Worker {\n    void work();\n    void eat();\n    void sleep();\n}\n\n// GOOD: Segregated interfaces\ninterface Workable { void work(); }\ninterface Feedable { void eat(); }\ninterface Sleepable { void sleep(); }\n\nclass Robot implements Workable {\n    public void work() { System.out.println(\"Working\"); }\n}\n\nclass Human implements Workable, Feedable, Sleepable {\n    public void work() { System.out.println(\"Working\"); }\n    public void eat() { System.out.println(\"Eating\"); }\n    public void sleep() { System.out.println(\"Sleeping\"); }\n}",
    keyPoints: [
      "Do not force classes to implement unused interface methods",
      "Many small, specific interfaces > one large, general interface",
      "Reduces coupling between client and provider",
      "Clients depend only on what they use",
      "Interfaces should be focused and cohesive",
    ],
    commonMistakes: [
      "Creating fat interfaces with too many methods",
      "Splitting interfaces too granularly",
      "Not considering client needs when designing interfaces",
    ],
    relatedConcepts: ["solid", "interface", "dip", "cohesion", "coupling"],
    examNotes: [
      "ISP reduces the impact of interface changes",
      "Lean interfaces make classes easier to implement and test",
      "ISP supports SRP by separating concerns into different interfaces",
    ],
  },

  dip: {
    title: "Dependency Inversion Principle (DIP)",
    category: "Design Principles",
    answer:
      "High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details.",
    simpleExplanation:
      "DIP means do not depend on concrete classes directly. Depend on interfaces instead.",
    romanUrduExplanation:
      "DIP ka matlab hai seedha concrete class pe depend mat karo. Interface pe depend karo.",
    codeExample: "// BAD: High-level depends on low-level\nclass UserService {\n    MySQLDatabase db = new MySQLDatabase();\n}\n\n// GOOD: Both depend on abstraction\ninterface Database { void save(Object data); }\n\nclass MySQLDatabase implements Database {\n    public void save(Object data) { }\n}\n\nclass UserService {\n    private Database db;\n    UserService(Database db) { this.db = db; }\n}",
    keyPoints: [
      "High-level modules should not depend on low-level modules",
      "Both should depend on abstractions (interfaces)",
      "Abstractions should not depend on details",
      "Details should depend on abstractions",
      "Use constructor injection for dependencies",
      "Makes code flexible and testable",
    ],
    commonMistakes: [
      "Creating concrete dependencies in high-level classes",
      "Not using dependency injection",
      "Over-engineering simple applications with DIP",
    ],
    relatedConcepts: ["solid", "srp", "ocp", "coupling", "interface"],
    examNotes: [
      "DIP = Inversion of Control (IoC) principle",
      "Dependency injection is the main way to implement DIP",
      "DIP makes unit testing easier",
    ],
  },

  coupling: {
    title: "Coupling",
    category: "Design Principles",
    answer:
      "Coupling is the degree of interdependence between classes. Tight coupling means classes are highly dependent; loose coupling means they are independent.",
    simpleExplanation:
      "Coupling is how much classes depend on each other. Tight coupling = classes are glued together. Loose coupling = classes can change independently.",
    romanUrduExplanation:
      "Coupling classes ki mutual dependendency ka paimana hai. Tight coupling = classes ek doosre ke bina nahi chal sakti. Loose coupling = classes alag alag change ho sakti hain.",
    codeExample: "// TIGHT coupling\nclass OrderService {\n    MySQLDatabase db = new MySQLDatabase();\n    void saveOrder(Order order) { db.save(order); }\n}\n\n// LOOSE coupling\ninterface Database { void save(Object data); }\n\nclass OrderService {\n    private Database db;\n    OrderService(Database db) { this.db = db; }\n    void saveOrder(Order order) { db.save(order); }\n}",
    keyPoints: [
      "Tight coupling: classes directly depend on each other",
      "Loose coupling: classes depend on abstractions",
      "Loose coupling is preferred for maintainability",
      "Achieved through interfaces, dependency injection",
      "Tight coupling makes changes ripple through the system",
    ],
    commonMistakes: [
      "Creating tight coupling through direct instantiation",
      "Not using interfaces for dependencies",
      "Overusing static methods (creates hidden coupling)",
    ],
    relatedConcepts: ["cohesion", "solid", "dip", "interface", "association"],
    examNotes: [
      "Goal: high cohesion, loose coupling",
      "Coupling is about relationships between classes",
      "Loose coupling enables independent testing and modification",
    ],
  },

  cohesion: {
    title: "Cohesion",
    category: "Design Principles",
    answer:
      "Cohesion is the degree to which elements within a class belong together and work toward a single, well-defined purpose. High cohesion means focused classes.",
    simpleExplanation:
      "Cohesion is how focused a class is. High cohesion = everything in the class is related. Low cohesion = class is doing too many unrelated things.",
    romanUrduExplanation:
      "Cohesion ek class ke andar ke elements kitne related hain. High cohesion = class focused hai. Low cohesion = class bahut si unrelated cheezein kar rahi hai.",
    codeExample: "// LOW cohesion\nclass Manager {\n    void calculateSalary() { }\n    void sendEmail() { }\n    void generateReport() { }\n}\n\n// HIGH cohesion\nclass SalaryCalculator {\n    double calculate(Employee e) { return e.salary; }\n}\n\nclass EmailService {\n    void sendEmail(String to, String msg) { }\n}",
    keyPoints: [
      "High cohesion: class has a single, focused purpose",
      "Low cohesion: class does many unrelated things",
      "High cohesion is desirable (easier to understand and maintain)",
      "Related to SRP (Single Responsibility Principle)",
      "Cohesive classes are easier to test and reuse",
    ],
    commonMistakes: [
      "Creating god classes with low cohesion",
      "Splitting classes too much (over-engineering)",
      "Not considering related functionality when grouping methods",
    ],
    relatedConcepts: ["coupling", "solid", "srp", "class"],
    examNotes: [
      "High cohesion + loose coupling = good design",
      "Cohesion is about within-class relationships",
      "Coupling is about between-class relationships",
    ],
  },
  this: {
    title: "This Keyword",
    category: "Keywords",
    answer:
      "This is a reference to the current object - the object whose method or constructor is being called. It is used to distinguish instance members from local variables.",
    simpleExplanation:
      "This is like pointing at yourself. When you say this.name, you mean 'my own name, not a parameter's name.'",
    romanUrduExplanation:
      "This current object ko refer karta hai. Jaise aap khud ko point kar rahe ho - this.name ka matlab hai mera apna naam, parameter ka naam nahi.",
    codeExample: "class Student {\n    String name;\n    int age;\n\n    Student(String name, int age) {\n        this.name = name;  // this.name = field, name = parameter\n        this.age = age;\n    }\n\n    void display() {\n        System.out.println(this.name + \" is \" + this.age);\n    }\n\n    Student getThis() {\n        return this;  // returns current object\n    }\n}",
    keyPoints: [
      "Refers to the current object instance",
      "Used to resolve name shadowing (field vs parameter)",
      "Can be passed as a method argument",
      "Can be returned from a method (for method chaining)",
      "Cannot be used in static context",
      "this() calls another constructor of the same class (must be first statement)",
    ],
    commonMistakes: [
      "Using this in a static method (error)",
      "Confusing this with super",
      "Using this() and super() in the same constructor (error)",
    ],
    relatedConcepts: ["super", "constructor", "field", "encapsulation", "method"],
    examNotes: [
      "this() and super() cannot be used together in a constructor",
      "this() must be the first statement in a constructor",
      "this cannot be used in static context",
      "this is implicitly the object on which the method is called",
    ],
  },

  "super-keyword": {
    title: "Super Keyword (Concept Entry)",
    category: "Keywords",
    answer:
      "Super refers to the immediate parent class. It is used to access parent methods, fields, and constructors from a subclass.",
    simpleExplanation:
      "Super lets you reach up to your parent class. super.method() calls the parent version, super() calls the parent constructor.",
    romanUrduExplanation:
      "Super parent class tak pahunchne ka zariya hai. super.method() parent ka method call karta hai, super() parent ka constructor call karta hai.",
    codeExample: "class Animal {\n    String name = \"Animal\";\n    Animal() { System.out.println(\"Animal constructor\"); }\n    void sound() { System.out.println(\"Some sound\"); }\n}\n\nclass Dog extends Animal {\n    Dog() {\n        super();  // calls Animal constructor\n        System.out.println(\"Dog constructor\");\n    }\n    void sound() {\n        super.sound();  // calls Animal sound\n        System.out.println(\"Bark\");\n    }\n}\n\nDog d = new Dog();\nd.sound();",
    keyPoints: [
      "super() calls parent constructor (must be first statement)",
      "super.method() calls parent's overridden method",
      "super.field accesses parent's field when shadowed",
      "Cannot use super in a static context",
      "Cannot use super() and this() in same constructor",
      "If not called, Java inserts super() implicitly",
    ],
    commonMistakes: [
      "Using super to access private parent members",
      "Calling super() after other statements in constructor",
      "Confusing super with this",
    ],
    relatedConcepts: ["this", "extends", "inheritance", "constructor", "overriding"],
    examNotes: [
      "super is resolved at compile-time",
      "super refers to immediate parent class only",
      "If no super() call, compiler adds super() as first line",
    ],
  },

  "constructor-overloading": {
    title: "Constructor Overloading",
    category: "Fundamentals",
    answer:
      "Constructor overloading means having multiple constructors with different parameter lists in the same class. It allows objects to be created in different ways.",
    simpleExplanation:
      "Constructor overloading is like having multiple doors to a house. You can enter through the front door, back door, or garage - same house, different entry points.",
    romanUrduExplanation:
      "Constructor overloading mein ek class mein kayi constructors hote hain jo parameters mein alag hote hain. Ghar mein kayi darwaze hain - same ghar, alag alag entry points.",
    codeExample: "class Student {\n    String name;\n    int age;\n    String grade;\n\n    Student() {\n        name = \"Unknown\";\n        age = 0;\n        grade = \"N/A\";\n    }\n\n    Student(String name) {\n        this.name = name;\n        age = 0;\n        grade = \"N/A\";\n    }\n\n    Student(String name, int age) {\n        this.name = name;\n        this.age = age;\n        grade = \"N/A\";\n    }\n\n    Student(String name, int age, String grade) {\n        this.name = name;\n        this.age = age;\n        this.grade = grade;\n    }\n}\n\nStudent s1 = new Student();\nStudent s2 = new Student(\"Ali\");\nStudent s3 = new Student(\"Ali\", 20);\nStudent s4 = new Student(\"Ali\", 20, \"A\");",
    keyPoints: [
      "Multiple constructors in the same class with different parameters",
      "Compiler selects constructor based on arguments",
      "Different = number, type, or order of parameters",
      "Return type is not part of constructor signature",
      "Very common pattern in Java",
      "Can call overloaded constructors using this()",
    ],
    commonMistakes: [
      "Ambiguous constructors (too similar parameter types)",
      "Forgetting to chain constructors with this()",
      "Creating too many constructors (use builder pattern instead)",
    ],
    relatedConcepts: ["constructor", "this", "default-constructor", "parameterized-constructor", "method"],
    examNotes: [
      "Constructor overloading is compile-time polymorphism",
      "Use this() to chain constructors (avoid code duplication)",
      "Java resolves which constructor to call at compile time",
    ],
  },

  "parameterized-constructor": {
    title: "Parameterized Constructor",
    category: "Fundamentals",
    answer:
      "A parameterized constructor is a constructor that takes one or more parameters to initialize the object with specific values at creation time.",
    simpleExplanation:
      "A parameterized constructor is like a form you fill out when creating an object. You give it the values, and the object starts with those values already set.",
    romanUrduExplanation:
      "Parameterized constructor wo constructor hai jo parameters leta hai aur object ko specific values ke saath create karta hai. Form bharnay jaisa hai - values dein aur object un values ke saath tayyar ho jaye.",
    codeExample: "class Car {\n    String brand;\n    String color;\n    int year;\n\n    Car(String brand, String color, int year) {\n        this.brand = brand;\n        this.color = color;\n        this.year = year;\n    }\n\n    void display() {\n        System.out.println(year + \" \" + color + \" \" + brand);\n    }\n}\n\nCar myCar = new Car(\"Toyota\", \"Red\", 2023);\nmyCar.display(); // 2023 Red Toyota",
    keyPoints: [
      "Takes parameters to set initial values",
      "Provides flexibility in object creation",
      "Can have validation logic for parameters",
      "Common pattern: create objects with specific initial state",
      "Used with this() for constructor chaining",
      "Overloading provides multiple parameterized constructors",
    ],
    commonMistakes: [
      "Not validating parameter values",
      "Having too many parameters (consider builder pattern)",
      "Forgetting to initialize all fields",
    ],
    relatedConcepts: ["constructor", "default-constructor", "constructor-overloading", "this", "field"],
    examNotes: [
      "Parameterized constructors make objects immediately usable",
      "They override the default constructor behavior",
      "Having a parameterized constructor does not prevent having a default one",
    ],
  },

  "default-constructor": {
    title: "Default Constructor",
    category: "Fundamentals",
    answer:
      "A default constructor is a no-argument constructor provided by Java if no constructor is explicitly defined. It initializes fields to default values (0, null, false).",
    simpleExplanation:
      "The default constructor is like a blank template. If you do not write any constructor, Java gives you one for free that sets everything to default values.",
    romanUrduExplanation:
      "Default constructor wo constructor hai jo Java khud deta hai agar aap koi constructor na likhen. Blank template jaisa hai - sab kuch default values pe set hota hai.",
    codeExample: "class Student {\n    String name;  // default: null\n    int age;      // default: 0\n    boolean active; // default: false\n\n    // No constructor written, so Java provides:\n    // Student() { }  // default constructor\n}\n\nStudent s = new Student(); // uses default constructor\nSystem.out.println(s.name);   // null\nSystem.out.println(s.age);    // 0\nSystem.out.println(s.active); // false",
    keyPoints: [
      "Provided by Java only if NO constructor is explicitly defined",
      "Takes no parameters",
      "Initializes fields to default values",
      "Once any constructor is defined, default is NOT provided",
      "Can be explicitly defined to customize default behavior",
      "Default values: 0 for int, null for objects, false for boolean",
    ],
    commonMistakes: [
      "Expecting default constructor after defining any constructor",
      "Confusing default constructor with no-arg constructor",
      "Not knowing that adding any constructor removes the default one",
    ],
    relatedConcepts: ["constructor", "parameterized-constructor", "constructor-overloading", "field", "object"],
    examNotes: [
      "Default constructor is only provided when NO constructors are defined",
      "You can define your own no-arg constructor to replace it",
      "If parent has no no-arg constructor, child must call super(args)",
      "Abstract classes can have constructors even though not directly instantiated",
    ],
  },
};

export const comparisonKnowledge: Record<string, ComparisonEntry> = {
  "class-vs-object": {
    title: "Class vs Object",
    left: {
      title: "Class",
      points: [
        "Blueprint or template for creating objects",
        "Defined using the class keyword",
        "Does not occupy memory for fields (no data yet)",
        "Can be thought of as a cookie cutter",
        "Defined once, used to create many objects",
      ],
      codeExample: "class Car {\n    String color;\n    int speed;\n}",
    },
    right: {
      title: "Object",
      points: [
        "Instance of a class (created at runtime)",
        "Created using the new keyword",
        "Occupies memory in heap (has actual data)",
        "Can be thought of as a cookie made from the cutter",
        "Many objects can be created from one class",
      ],
      codeExample: "Car myCar = new Car();\nmyCar.color = \"Red\";\nmyCar.speed = 120;",
    },
    summary:
      "A class is the definition, an object is the realization. You define the class once, but create many objects from it. The class has no data, objects have actual values.",
    romanUrduSummary:
      "Class definition hai, object realization hai. Class ek baar define karte hain, us se kayi objects banate hain. Class mein data nahi hota, objects mein actual values hoti hain.",
  },

  "overloading-vs-overriding": {
    title: "Overloading vs Overriding",
    left: {
      title: "Overloading",
      points: [
        "Same method name, different parameter list",
        "Occurs in the same class or inherited",
        "Compile-time polymorphism (static binding)",
        "Return type can be different",
        "Access modifier can be different",
      ],
      codeExample: "class Calculator {\n    int add(int a, int b) { return a + b; }\n    double add(double a, double b) { return a + b; }\n}",
    },
    right: {
      title: "Overriding",
      points: [
        "Same method name, same parameter list",
        "Occurs in subclass (child class)",
        "Runtime polymorphism (dynamic dispatch)",
        "Return type must be same or covariant",
        "Access modifier cannot be more restrictive",
      ],
      codeExample: "class Animal {\n    void sound() { System.out.println(\"?\"); }\n}\nclass Dog extends Animal {\n    void sound() { System.out.println(\"Bark\"); }\n}",
    },
    summary:
      "Overloading is in the same class with different parameters (compile-time). Overriding is in a subclass with the same signature (runtime). Overloading is static, overriding is dynamic.",
    romanUrduSummary:
      "Overloading ek hi class mein alag parameters ke saath hoti hai (compile-time). Overriding subclass mein same signature ke saath hoti hai (runtime). Overloading static hai, overriding dynamic hai.",
  },

  "abstract-class-vs-interface": {
    title: "Abstract Class vs Interface",
    left: {
      title: "Abstract Class",
      points: [
        "Can have both abstract and concrete methods",
        "Can have constructors, fields, instance methods",
        "Can have any access modifier on methods",
        "A class can extend only one abstract class",
        "Can have final, static, and private methods",
      ],
      codeExample: "abstract class Shape {\n    String color;\n    Shape(String c) { color = c; }\n    abstract double area();\n    void display() { System.out.println(color); }\n}",
    },
    right: {
      title: "Interface",
      points: [
        "All methods abstract (before Java 8)",
        "Since Java 8: default and static methods",
        "All fields are public static final",
        "A class can implement multiple interfaces",
        "No constructors allowed",
      ],
      codeExample: "interface Drawable {\n    void draw();\n    default void fill() { System.out.println(\"Filling\"); }\n}\n\nclass Circle implements Drawable {\n    public void draw() { System.out.println(\"Drawing circle\"); }\n}",
    },
    summary:
      "Abstract class is for partial implementation and shared state. Interface is for defining a contract with no state. Use abstract class for IS-A with shared code, interface for CAN-DO capability.",
    romanUrduSummary:
      "Abstract class partial implementation aur shared state ke liye hai. Interface contract define karne ke liye hai bina state ke. Abstract class IS-A ke liye, interface CAN-DO capability ke liye hai.",
  },

  "abstraction-vs-encapsulation": {
    title: "Abstraction vs Encapsulation",
    left: {
      title: "Abstraction",
      points: [
        "Hides complexity by showing only essential features",
        "Focuses on WHAT an object does",
        "Achieved through abstract classes and interfaces",
        "Design level concern",
        "External view of an object",
      ],
      codeExample: "abstract class Shape {\n    abstract double area(); // what, not how\n}\n\nclass Circle extends Shape {\n    double area() { return Math.PI * r * r; }\n}",
    },
    right: {
      title: "Encapsulation",
      points: [
        "Hides internal data by restricting direct access",
        "Focuses on HOW data is protected",
        "Achieved through private fields and public methods",
        "Implementation level concern",
        "Internal protection of data",
      ],
      codeExample: "class BankAccount {\n    private double balance;\n    public double getBalance() { return balance; }\n    public void deposit(double amt) { balance += amt; }\n}",
    },
    summary:
      "Abstraction hides complexity (design concern). Encapsulation hides data (implementation concern). Abstraction is about the outside view, encapsulation is about internal protection.",
    romanUrduSummary:
      "Abstraction complexity chupata hai (design concern). Encapsulation data chupata hai (implementation concern). Abstraction bahar ki view ke baare mein hai, encapsulation andar ki protection ke baare mein hai.",
  },

  "equals-vs-equality": {
    title: "== vs equals()",
    left: {
      title: "== (Reference Equality)",
      points: [
        "Compares memory addresses for objects",
        "Compares actual values for primitives",
        "Cannot be overridden",
        "Returns boolean (true or false)",
        "Used for null checks: obj == null",
      ],
      codeExample: "String s1 = new String(\"Hi\");\nString s2 = new String(\"Hi\");\nSystem.out.println(s1 == s2); // false",
    },
    right: {
      title: "equals() (Logical Equality)",
      points: [
        "Compares content/values of objects",
        "Can be overridden for custom comparison",
        "Default behavior is same as ==",
        "Must override hashCode() when overriding equals()",
        "Used for logical comparison of objects",
      ],
      codeExample: "String s1 = new String(\"Hi\");\nString s2 = new String(\"Hi\");\nSystem.out.println(s1.equals(s2)); // true",
    },
    summary:
      "== compares references (same object in memory?), equals() compares content (same data?). For primitives, use ==. For objects, use equals() to compare values.",
    romanUrduSummary:
      "== references compare karta hai (same memory address?), equals() content compare karta hai (same data?). Primitives ke liye == use karo. Objects ke liye equals() use karo values compare karne ke liye.",
  },

  "this-vs-super": {
    title: "this vs super",
    left: {
      title: "this",
      points: [
        "Refers to current object",
        "Used to access current class members",
        "this() calls constructor of same class",
        "Cannot be used in static context",
        "Resolves shadowing in current class",
      ],
      codeExample: "class Person {\n    String name;\n    Person(String name) {\n        this.name = name; // this.name = field\n    }\n}",
    },
    right: {
      title: "super",
      points: [
        "Refers to immediate parent class",
        "Used to access parent class members",
        "super() calls parent class constructor",
        "Cannot be used in static context",
        "Resolves shadowing from parent class",
      ],
      codeExample: "class Student extends Person {\n    Student(String name) {\n        super(name); // calls Person constructor\n    }\n}",
    },
    summary:
      "this points to the current object, super points to the parent. this() calls same-class constructor, super() calls parent constructor. They cannot be used together in a constructor.",
    romanUrduSummary:
      "this current object ki taraf point karta hai, super parent ki taraf. this() same class ka constructor call karta hai, super() parent ka constructor. Dono ek saath constructor mein use nahi ho sakte.",
  },

  "throw-vs-throws": {
    title: "throw vs throws",
    left: {
      title: "throw",
      points: [
        "Used to explicitly throw an exception",
        "Followed by an exception object",
        "Used inside a method body",
        "Can throw only one exception at a time",
        "Example: throw new IOException()",
      ],
      codeExample: "void withdraw(double amt) {\n    if (amt > balance)\n        throw new InsufficientFundsException();\n    balance -= amt;\n}",
    },
    right: {
      title: "throws",
      points: [
        "Declares exceptions a method might throw",
        "Used in method/constructor signature",
        "Multiple exceptions can be declared",
        "Tells caller to handle or propagate",
        "Example: void read() throws IOException",
      ],
      codeExample: "void readFile(String path)\n    throws FileNotFoundException, IOException {\n    FileInputStream fis = new FileInputStream(path);\n}",
    },
    summary:
      "throw is a statement that creates and throws an exception. throws is a declaration in the method signature that warns the caller about possible exceptions.",
    romanUrduSummary:
      "throw ek statement hai jo exception create aur throw karta hai. throws method signature mein ek declaration hai jo caller ko exception ki warning deta hai.",
  },

  "arraylist-vs-linkedlist": {
    title: "ArrayList vs LinkedList",
    left: {
      title: "ArrayList",
      points: [
        "Backed by a dynamic array",
        "O(1) random access by index",
        "O(n) insertion/deletion in middle",
        "Better for reading/traversal",
        "Less memory overhead per element",
      ],
      codeExample: "ArrayList<String> list = new ArrayList<>();\nlist.add(\"A\");\nlist.get(0);  // O(1) fast access\nlist.add(1, \"B\"); // O(n) slow insert",
    },
    right: {
      title: "LinkedList",
      points: [
        "Doubly-linked list",
        "O(n) access by index (must traverse)",
        "O(1) insertion/deletion at ends",
        "Better for frequent add/remove",
        "More memory (node pointers)",
      ],
      codeExample: "LinkedList<String> list = new LinkedList<>();\nlist.addFirst(\"A\");  // O(1)\nlist.addLast(\"B\");   // O(1)\nlist.get(0);          // O(n) slow access",
    },
    summary:
      "ArrayList is better for random access and iteration. LinkedList is better for frequent insertions/deletion at ends or middle. In practice, ArrayList is preferred most of the time.",
    romanUrduSummary:
      "ArrayList random access aur iteration ke liye behtar hai. LinkedList baar baar insertion/deletion ke liye behtar hai. Practical mein zyada tar ArrayList preferred hai.",
  },

  "hashset-vs-hashmap": {
    title: "HashSet vs HashMap",
    left: {
      title: "HashSet",
      points: [
        "Stores only unique elements (no values)",
        "Backed by HashMap internally",
        "Implements Set interface",
        "Used to store unique items",
        "add(), remove(), contains()",
      ],
      codeExample: "HashSet<String> set = new HashSet<>();\nset.add(\"Ali\");\nset.add(\"Ali\"); // duplicate, not added\nSystem.out.println(set.size()); // 1",
    },
    right: {
      title: "HashMap",
      points: [
        "Stores key-value pairs",
        "Keys must be unique (values can duplicate)",
        "Implements Map interface",
        "Used to store associated data",
        "put(), get(), remove(key)",
      ],
      codeExample: "HashMap<String, Integer> map = new HashMap<>();\nmap.put(\"Ali\", 25);\nmap.put(\"Sara\", 22);\nSystem.out.println(map.get(\"Ali\")); // 25",
    },
    summary:
      "HashSet stores unique elements only (no pairs). HashMap stores key-value pairs where keys are unique. HashSet is backed by HashMap internally.",
    romanUrduSummary:
      "HashSet sirf unique elements store karta hai. HashMap key-value pairs store karta hai jahan keys unique hoti hain. HashSet internally HashMap pe based hai.",
  },

  "inheritance-vs-composition": {
    title: "Inheritance vs Composition",
    left: {
      title: "Inheritance (IS-A)",
      points: [
        "Class inherits from parent (extends)",
        "Creates IS-A relationship",
        "Tight coupling between parent and child",
        "Can override parent methods",
        "Cannot change parent class at runtime",
      ],
      codeExample: "class Dog extends Animal {\n    // Dog IS-A Animal\n    // inherits all non-private members\n}",
    },
    right: {
      title: "Composition (HAS-A)",
      points: [
        "Class contains object of another class",
        "Creates HAS-A relationship",
        "Loose coupling between classes",
        "Can change behavior at runtime",
        "More flexible and testable",
      ],
      codeExample: "class Car {\n    private Engine engine; // Car HAS-A Engine\n    Car() {\n        this.engine = new Engine();\n    }\n}",
    },
    summary:
      "Inheritance is IS-A (Dog is an Animal) - tight coupling, static. Composition is HAS-A (Car has an Engine) - loose coupling, flexible. Favor composition over inheritance.",
    romanUrduSummary:
      "Inheritance IS-A hai (Dog Animal hai) - tight coupling, static. Composition HAS-A hai (Car mein Engine hai) - loose coupling, flexible. Composition ko inheritance par prefer karo.",
  },

  "checked-vs-unchecked-exception": {
    title: "Checked vs Unchecked Exceptions",
    left: {
      title: "Checked Exceptions",
      points: [
        "Compiler forces you to handle them",
        "Must be caught or declared with throws",
        "Subclasses of Exception (not RuntimeException)",
        "Represent recoverable conditions",
        "Examples: IOException, SQLException, FileNotFoundException",
      ],
      codeExample: "try {\n    FileInputStream fis = new FileInputStream(\"file.txt\");\n} catch (FileNotFoundException e) {\n    // must handle this checked exception\n}",
    },
    right: {
      title: "Unchecked Exceptions",
      points: [
        "Compiler does not force handling",
        "No need to catch or declare",
        "Subclasses of RuntimeException",
        "Represent programming bugs",
        "Examples: NullPointerException, ArrayIndexOutOfBoundsException",
      ],
      codeExample: "String str = null;\n// No compile-time requirement to handle\nSystem.out.println(str.length()); // NPE at runtime",
    },
    summary:
      "Checked exceptions must be handled (compiler enforced) - they represent recoverable errors. Unchecked exceptions are runtime bugs that should be prevented through proper coding.",
    romanUrduSummary:
      "Checked exceptions handle karni padti hain (compiler enforce karta hai) - recoverable errors hain. Unchecked exceptions runtime bugs hain jo sahi coding se rokne chahiye.",
  },
};
