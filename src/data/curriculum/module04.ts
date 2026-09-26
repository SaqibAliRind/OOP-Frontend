import type { Module } from '@/types';

export const module04: Module = {
  id: 'module-04',
  title: 'Encapsulation',
  slug: 'encapsulation',
  order: 4,
  description: 'Master the art of data hiding and bundling. Learn how encapsulation protects object state, enforces validation, and creates clean public interfaces that make your code robust and maintainable.',
  icon: 'Shield',
  color: '#10b981',
  xpReward: 700,
  isUnlocked: true,
  completed: false,
  progress: 0,
  totalDuration: 210,
  prerequisiteModuleIds: ['module-01'],
  lessons: [
    {
      id: 'lesson-04-01',
      moduleId: 'module-04',
      title: 'Introduction to Encapsulation',
      slug: 'introduction-to-encapsulation',
      order: 1,
      duration: 18,
      description: 'Understand what encapsulation is, why it matters, and how data hiding forms the backbone of robust OOP design.',
      learningObjectives: [
        { id: 'lo-04-01-1', description: 'Define encapsulation in your own words', completed: false },
        { id: 'lo-04-01-2', description: 'Explain the relationship between encapsulation and data hiding', completed: false },
        { id: 'lo-04-01-3', description: 'Describe why direct access to data is dangerous', completed: false },
        { id: 'lo-04-01-4', description: 'Identify encapsulation in a simple Java class', completed: false },
      ],
      englishExplanation: {
        id: 'ee-04-01',
        text: `Encapsulation is one of the four fundamental pillars of Object-Oriented Programming. At its core, encapsulation is the practice of bundling data (fields) and the methods that operate on that data into a single unit — the class — while restricting direct access to the internal state from outside the class.

Think of encapsulation like a medicine capsule. The bitter medicine (internal data and logic) is wrapped inside a smooth coating (the class interface). The patient (external code) does not need to know what is inside the capsule — they just take it. Similarly, external code does not need to know how an object stores or processes data; it only needs to know how to interact with the object through its public methods.

Data hiding is the mechanism that makes encapsulation possible. By marking fields as private, you prevent external code from directly reading or modifying them. Instead, all access goes through controlled methods — getters and setters — that can validate, transform, or log operations. This ensures that the object always remains in a valid state.

Consider a BankAccount class. If the balance field were public, any code could set it to any value — including negative numbers or absurdly large amounts. With encapsulation, the balance is private, and all modifications go through deposit() and withdraw() methods that enforce business rules like minimum balance requirements and transaction limits.

Encapsulation also provides flexibility for internal change. If you decide to change how balance is stored — perhaps from a double to a BigDecimal for precision — external code does not need to change at all, because it never accessed balance directly. This decoupling of interface from implementation is one of the greatest benefits of encapsulation.`
      },
      romanUrduExplanation: {
        id: 'ru-04-01',
        text: `Encapsulation Object-Oriented Programming ke four fundamental pillars mein se ek hai. Core mein, encapsulation data (fields) aur us par operate karne wale methods ko ek single unit (class) mein bundle karne ka practice hai, aur external code se internal state ki direct access restrict karna hai.

Encapsulation ko medicine capsule ki tarah samajhein. Bitter medicine (internal data aur logic) ek smooth coating (class interface) ke andar wrap hoti hai. Patient (external code) ko ye nahi pata hota ke capsule ke andar kya hai — wo sirf use leta hai. Isi tarah, external code ko ye nahi pata hota ke object data ko kaise store ya process karta hai — usse sirf public methods ke through interact karna hota hai.

Data hiding wo mechanism hai jo encapsulation ko possible banata hai. Fields ko private mark karke, aap external code ko directly read ya modify karne se rokte hain. Iske bajaye, saara access controlled methods — getters aur setters — ke through hota hai jo validate, transform, ya log operations kar sakte hain. Isse object hamesha valid state mein rehta hai.

BankAccount class ka example lein. Agar balance field public hoti, toh koi bhi code use kisi bhi value mein set kar sakta hai — negative numbers ya absurdly large amounts bhi. Encapsulation ke saath, balance private hai, aur saari modifications deposit() aur withdraw() methods ke through hoti hain jo business rules enforce karti hain jaise minimum balance requirements aur transaction limits.

Encapsulation internal change ke liye flexibility bhi deta hai. Agar aap decide karein ke balance ko kaise store kiya jaaye — shayad double se BigDecimal mein precision ke liye — toh external code ko bilkul bhi change nahi karna padega, kyunki usne balance kabhi directly access nahi kiya. Interface aur implementation ka ye decoupling encapsulation ka sabse bada benefit hai.`
      },
      keyPoints: [
        { id: 'kp-04-01-1', title: 'Bundling', description: 'Encapsulation bundles data and methods into a single class unit, keeping related code together.' },
        { id: 'kp-04-01-2', title: 'Data Hiding', description: 'Private fields prevent direct external access. All interaction goes through controlled public methods.' },
        { id: 'kp-04-01-3', title: 'Validation', description: 'Methods can validate data before modifying it, ensuring the object stays in a valid state.' },
        { id: 'kp-04-01-4', title: 'Flexibility', description: 'Internal implementation can change without affecting external code that uses the class.' },
      ],
      codeExamples: [
        {
          id: 'ce-04-01-1',
          title: 'Without Encapsulation (Dangerous)',
          code: `public class BankAccount {
    public String owner;
    public double balance;  // anyone can set this!

    public static void main(String[] args) {
        BankAccount acc = new BankAccount();
        acc.owner = "Ahmed";
        acc.balance = 1000;

        // Any code can do this — no validation!
        acc.balance = -999999;   // negative balance!
        acc.balance = 999999999; // absurd value!
        System.out.println("Balance: " + acc.balance);
    }
}`,
          language: 'java',
          output: 'Balance: 9.99999999E8',
          explanation: 'When fields are public, any code can set them to any value. There is no way to enforce rules like "balance cannot be negative." This leads to invalid object states and bugs.',
        },
        {
          id: 'ce-04-01-2',
          title: 'With Encapsulation (Safe)',
          code: `public class BankAccount {
    private String owner;
    private double balance;  // hidden from outside

    public BankAccount(String owner, double initialBalance) {
        this.owner = owner;
        if (initialBalance >= 0) {
            this.balance = initialBalance;
        } else {
            this.balance = 0;
        }
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: " + amount);
        } else {
            System.out.println("Invalid deposit amount");
        }
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrew: " + amount);
        } else {
            System.out.println("Invalid withdrawal");
        }
    }

    public double getBalance() {
        return balance;
    }

    public String getOwner() {
        return owner;
    }

    public static void main(String[] args) {
        BankAccount acc = new BankAccount("Ahmed", 1000);
        acc.deposit(500);     // Deposited: 500
        acc.withdraw(200);    // Withdrew: 200
        acc.withdraw(5000);   // Invalid withdrawal
        System.out.println("Balance: " + acc.getBalance());
    }
}`,
          language: 'java',
          output: `Deposited: 500.0
Withdrew: 200.0
Invalid withdrawal
Balance: 1300.0`,
          explanation: 'With encapsulation, balance is private. All modifications go through deposit() and withdraw() methods that validate input. The object always stays in a valid state.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-04-01-1',
          title: 'ATM Machine',
          scenario: 'An ATM machine is a perfect example of encapsulation. You insert your card and press buttons to withdraw cash. You never directly access the bank\'s database to change your balance. The ATM provides a controlled interface — buttons and a screen — that validates your PIN, checks your balance, and processes transactions safely.',
          oopConcept: 'The ATM class encapsulates the bank\'s internal data. Methods like authenticate(), checkBalance(), and withdraw() enforce business rules. The internal database connection and encryption logic are hidden from the user.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-04-01-1',
          title: 'Making Everything Public for Convenience',
          incorrectCode: `public class Student {
    public String name;    // public — no protection
    public int age;        // public — no protection
    public double gpa;     // public — no protection
}

// Any code can do:
Student s = new Student();
s.age = -5;           // invalid!
s.gpa = 999;          // impossible!
s.name = "";          // empty name!`,
          correctCode: `public class Student {
    private String name;
    private int age;
    private double gpa;

    public Student(String name, int age, double gpa) {
        setName(name);
        setAge(age);
        setGpa(gpa);
    }

    public void setAge(int age) {
        if (age >= 0 && age <= 150) {
            this.age = age;
        } else {
            System.out.println("Invalid age");
        }
    }

    public void setGpa(double gpa) {
        if (gpa >= 0.0 && gpa <= 4.0) {
            this.gpa = gpa;
        } else {
            System.out.println("Invalid GPA");
        }
    }

    // getters...
}`,
          explanation: 'Public fields allow any invalid data. Encapsulation with private fields and validated setters ensures the object always holds valid data.',
        },
      ],
      examNotes: [
        { id: 'en-04-01-1', title: 'Definition', content: 'Encapsulation = bundling data + methods into a class AND restricting direct access to internal state. Both parts are essential for full marks.', importance: 'high' },
        { id: 'en-04-01-2', title: 'Benefits', content: 'Key benefits: data validation, controlled access, internal change without external impact, and cleaner code interfaces.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-04-01-1', question: 'What is encapsulation?', answer: 'Encapsulation is the OOP principle of bundling data and methods into a single class while restricting direct access to the internal state. It uses private fields and public methods to control how data is accessed and modified.', difficulty: 'easy' },
        { id: 'vq-04-01-2', question: 'Why is direct access to fields dangerous?', answer: 'Direct access allows any code to set fields to invalid values — negative balances, impossible ages, null names. This breaks the object\'s integrity and causes bugs that are hard to trace.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-04-01-1', type: 'mcq', question: 'What does encapsulation primarily protect?', options: ['Methods', 'Internal state (data) of an object', 'Class names', 'Constructor parameters'], correctAnswer: 'Internal state (data) of an object', explanation: 'Encapsulation hides the internal data of an object and controls access through public methods.' },
        { id: 'qc-04-01-2', type: 'true-false', question: 'Encapsulation means making all fields public.', correctAnswer: 'False', explanation: 'Encapsulation means making fields private and providing controlled access through getters and setters.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-04-01-1',
          scenario: 'You are designing a Temperature class. The temperature should never go below -273.15 degrees Celsius (absolute zero).',
          question: 'How does encapsulation help enforce this rule?',
          type: 'concept-application',
          options: [
            'Make temperature public and add a comment warning',
            'Make temperature private and validate in a setter method',
            'Use a static final constant',
            'Add a try-catch block around temperature assignments',
          ],
          correctAnswer: 'Make temperature private and validate in a setter method',
          explanation: 'A private field with a validated setter ensures no code can set an invalid temperature. The validation logic is centralized in one place.',
          relatedConcepts: ['encapsulation', 'data-hiding', 'validation'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-encapsulation-intro',
      prerequisites: ['lesson-01-03'],
      xpReward: 60,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'encapsulation',
      difficulty: 'easy',
      estimatedMinutes: 18,
    },
    {
      id: 'lesson-04-02',
      moduleId: 'module-04',
      title: 'Access Modifiers',
      slug: 'access-modifiers',
      order: 2,
      duration: 22,
      description: 'Detailed comparison of private, default (package-private), protected, and public access modifiers and when to use each.',
      learningObjectives: [
        { id: 'lo-04-02-1', description: 'Explain the four access modifiers in Java', completed: false },
        { id: 'lo-04-02-2', description: 'Compare access levels across classes, packages, and inheritance hierarchies', completed: false },
        { id: 'lo-04-02-3', description: 'Choose the correct access modifier for a given design scenario', completed: false },
        { id: 'lo-04-02-4', description: 'Predict whether a field or method is accessible from a given location', completed: false },
      ],
      englishExplanation: {
        id: 'ee-04-02',
        text: `Java provides four access modifiers that control the visibility of classes, fields, methods, and constructors. Understanding these modifiers is critical for proper encapsulation.

**private** — The most restrictive modifier. A private member is accessible only within the same class. No other class — not even subclasses — can access it. Use private for fields that should be hidden from all external code.

**default (no modifier)** — Also called package-private. When you write no access modifier, the member is accessible only within classes in the same package. This is useful for helper classes and utility methods that should be internal to a package but not exposed to the world.

**protected** — Accessible within the same package AND by subclasses in other packages. Protected is specifically designed for inheritance hierarchies. Use it when a subclass needs access to a member but external code should not.

**public** — The least restrictive modifier. A public member is accessible from everywhere — same class, same package, different packages, subclasses, non-subclasses. Use public for the API that external code should use.

The access hierarchy from most to least restrictive: private > default > protected > public.

A common design principle is to make fields private and provide public getters and setters only for the access that external code actually needs. This is called the "principle of least privilege" — give code only the access it requires, nothing more.

Note that protected and default are NOT the same. Default limits access to the same package only. Protected allows subclass access across packages. This distinction matters in larger projects with multiple packages.`
      },
      romanUrduExplanation: {
        id: 'ru-04-02',
        text: `Java four access modifiers provide karta hai jo classes, fields, methods aur constructors ki visibility control karte hain. Ye modifiers samajhna proper encapsulation ke liye zaroori hai.

**private** — Sabse restrictive modifier. Private member sirf usi class ke andar accessible hai. Koi doosri class — subclasses bhi nahi — access nahi kar sakte. Fields ke liye use karein jo sabse se chhupaye jaane chahiye.

**default (koi modifier nahi)** — Package-private bhi kehlata hai. Jab koi access modifier nahi likhte, toh member sirf same package ki classes mein accessible hai. Helper classes aur utility methods ke liye useful hai jo package ke andar internal chahiye lekin duniya ko expose nahi karna.

**protected** — Same package aur other packages ke subclasses dono ke liye accessible hai. Protected specifically inheritance hierarchies ke liye design kiya gaya hai. Tab use karein jab subclass ko member ki access chahiye lekin external code ko nahi.

**public** — Sabse least restrictive modifier. Public member har jagah accessible hai — same class, same package, different packages, subclasses, non-subclasses. External code jo API use kare use public karein.

Access hierarchy sabse restrictive se least restrictive: private > default > protected > public.

Common design principle ye hai ke fields private karein aur sirf wo public getters aur setters provide karein jo external code ko actually chahiye. Isse "principle of least privilege" kehte hain — code ko sirf wo access dein jo use chahiye, zyada nahi.

Yaad rakhein protected aur default SAME nahi hain. Default sirf same package tak access limit karta hai. Protected subclass access ko packages ke across allow karta hai. Ye distinction bade projects mein important hai.`
      },
      keyPoints: [
        { id: 'kp-04-02-1', title: 'private', description: 'Accessible only within the same class. Not even subclasses can access private members.' },
        { id: 'kp-04-02-2', title: 'default', description: 'Accessible within the same package only. No modifier keyword needed — just omit the modifier.' },
        { id: 'kp-04-02-3', title: 'protected', description: 'Accessible in same package AND by subclasses in other packages. Designed for inheritance.' },
        { id: 'kp-04-02-4', title: 'public', description: 'Accessible from everywhere. Use for the class API that external code should use.' },
      ],
      codeExamples: [
        {
          id: 'ce-04-02-1',
          title: 'All Four Access Modifiers Demonstrated',
          code: `public class Person {
    private String secret;       // only Person class can access
    String nickname;             // default: same package only
    protected int age;           // same package + subclasses
    public String name;          // everyone can access

    private void think() {       // only Person class
        System.out.println("Thinking...");
    }

    void eat() {                 // default: same package
        System.out.println("Eating...");
    }

    protected void sleep() {     // same package + subclasses
        System.out.println("Sleeping...");
    }

    public void speak() {        // everyone
        System.out.println("Speaking...");
    }
}`,
          language: 'java',
          explanation: 'Each access modifier restricts visibility differently. private = same class only, default = same package, protected = same package + subclasses, public = everywhere.',
        },
        {
          id: 'ce-04-02-2',
          title: 'Access from Different Locations',
          code: `// Same package
public class Doctor extends Person {
    public void checkup() {
        // this.name = "Ali";     // OK — public
        // this.age = 30;         // OK — protected (subclass)
        // this.nickname = "Doc"; // OK — default (same package)
        // this.secret = "...";   // ERROR — private
        // this.think();          // ERROR — private
    }
}

// Different package
public class Nurse {
    public void assist() {
        Person p = new Person();
        // p.name = "Sara";       // OK — public
        // p.age = 25;            // ERROR — protected (not a subclass)
        // p.nickname = "N";      // ERROR — default (different package)
        // p.secret = "...";      // ERROR — private
    }
}`,
          language: 'java',
          explanation: 'This shows how access modifiers behave across classes, packages, and inheritance hierarchies. The same modifier can grant different access depending on the context.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-04-02-1',
          title: 'Medical Records System',
          scenario: 'In a hospital system, patient medical records have different sensitivity levels. The patient\'s name is public (visible to all staff). Their age is protected (visible to doctors in their department). Their diagnosis is default (visible only within the same department). Their social security number is private (visible only to the billing class).',
          oopConcept: 'Each access level maps to a real-world access control need. Public for general info, protected for departmental sharing, default for internal records, private for highly sensitive data.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-04-02-1',
          title: 'Confusing protected with default',
          incorrectCode: `// thinking protected and default are the same
public class Animal {
    protected String type;  // accessible to subclasses in OTHER packages
    String sound;           // default — NOT accessible to subclasses in other packages
}

// In another package:
public class Dog extends Animal {
    void bark() {
        System.out.println(type);  // OK — protected allows subclass access
        System.out.println(sound); // ERROR — default restricts to same package
    }
}`,
          correctCode: `// protected = same package + subclasses everywhere
// default  = same package ONLY

public class Animal {
    protected String type;  // Dog (in another package) CAN access this
    String sound;           // Dog (in another package) CANNOT access this
}

// In another package:
public class Dog extends Animal {
    void bark() {
        System.out.println(type);  // OK — protected
        // sound is not accessible — default restricts to same package
    }
}`,
          explanation: 'Protected allows subclass access across packages. Default does not. This is a critical distinction for inheritance design.',
        },
      ],
      examNotes: [
        { id: 'en-04-02-1', title: 'Access Modifier Table', content: 'Memorize: private = same class, default = same package, protected = same package + subclasses, public = everywhere. Exams frequently test this with a grid.', importance: 'high' },
        { id: 'en-04-02-2', title: 'protected vs default', content: 'protected adds subclass access across packages. default is limited to same package only. This is the most common exam trap.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-04-02-1', question: 'What is the difference between protected and default access?', answer: 'Default access limits visibility to classes within the same package. Protected access allows the same package plus subclasses in other packages. Protected is designed for inheritance hierarchies.', difficulty: 'medium' },
        { id: 'vq-04-02-2', question: 'When would you use private access?', answer: 'Private access is used for fields and helper methods that should not be accessible from outside the class. It is the foundation of encapsulation — hiding internal implementation details.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-04-02-1', type: 'mcq', question: 'Which access modifier allows access from the same class, same package, and subclasses in other packages?', options: ['private', 'default', 'protected', 'public'], correctAnswer: 'protected', explanation: 'Protected access grants visibility within the same package and to subclasses in other packages.' },
        { id: 'qc-04-02-2', type: 'mcq', question: 'What is the default access modifier in Java when none is specified?', options: ['public', 'private', 'protected', 'package-private (default)'], correctAnswer: 'package-private (default)', explanation: 'When no modifier is specified, Java uses default (package-private) access — visible only within the same package.' },
        { id: 'qc-04-02-3', type: 'true-false', question: 'A private field in a parent class can be accessed by a subclass.', correctAnswer: 'False', explanation: 'Private members are only accessible within the declaring class. Subclasses cannot access private members of their parent class.', difficulty: 'medium' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-04-02-1',
          scenario: 'You have a base class Shape in package graphics and a subclass Circle in package shapes. Circle needs to access a method calculateArea() defined in Shape.',
          question: 'Which access modifier should calculateArea() have?',
          type: 'design-decision',
          options: [
            'private — only Shape should use it',
            'default — keep it in the graphics package',
            'protected — allow subclasses in other packages to use it',
            'public — everyone should be able to calculate area',
          ],
          correctAnswer: 'protected — allow subclasses in other packages to use it',
          explanation: 'Protected is designed for exactly this scenario — giving subclass access to parent members across packages while keeping the method hidden from non-subclass external code.',
          relatedConcepts: ['access-modifiers', 'protected', 'inheritance'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-access-modifiers',
      prerequisites: ['lesson-04-01'],
      xpReward: 70,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'access-control',
      difficulty: 'easy',
      estimatedMinutes: 22,
    },
    {
      id: 'lesson-04-03',
      moduleId: 'module-04',
      title: 'Getters and Setters Deep Dive',
      slug: 'getters-and-setters-deep-dive',
      order: 3,
      duration: 25,
      description: 'Master getters and setters including validation, computed properties, naming conventions, and advanced patterns.',
      learningObjectives: [
        { id: 'lo-04-03-1', description: 'Write proper getter and setter methods', completed: false },
        { id: 'lo-04-03-2', description: 'Implement validation logic inside setters', completed: false },
        { id: 'lo-04-03-3', description: 'Create computed properties through getters', completed: false },
        { id: 'lo-04-03-4', description: 'Follow Java naming conventions for getters and setters', completed: false },
      ],
      englishExplanation: {
        id: 'ee-04-03',
        text: `Getters and setters are the public interface through which external code interacts with encapsulated data. A getter retrieves the value of a private field. A setter assigns a new value to it. Together, they form the controlled access layer of encapsulation.

The standard Java naming convention is: for a field called \x60name\x60, the getter is \x60getName()\x60 and the setter is \x60setName(String name)\x60. For boolean fields, the getter can be \x60isActive()\x60 instead of \x60getActive()\x60. These conventions are not just stylistic — they are followed by Java frameworks and IDEs that auto-generate getters and setters.

Setters are where validation lives. A well-designed setter never blindly assigns a value. It checks whether the value is valid, logs the change if needed, and only then modifies the field. If the value is invalid, the setter can throw an exception, print a warning, or keep the old value.

Getters can return more than just the raw field value. They can compute values on the fly. For example, a Person class might not store a \x60fullName\x60 field — instead, \x60getFullName()\x60 concatenates \x60firstName\x60 and \x60lastName\x60 each time it is called. This is called a computed property.

Setters can also trigger side effects. When you call \x60setTemperature()\x60 on a WeatherStation object, the setter might not only update the temperature but also log the change, notify observers, and update a display. This makes setters powerful orchestration points.

Some advanced patterns include: returning \x60this\x60 from setters for method chaining (\x60person.setName("Ali").setAge(25)\x60), performing defensive copying in getters to prevent external modification of internal objects, and using builder patterns that rely on setters.`
      },
      romanUrduExplanation: {
        id: 'ru-04-03',
        text: `Getters aur setters wo public interface hain jinke through external code encapsulated data ke saath interact karta hai. Getter private field ki value retrieve karta hai. Setter naya value assign karta hai. Milke, ye encapsulation ka controlled access layer banate hain.

Standard Java naming convention ye hai: \x60name\x60 field ke liye getter \x60getName()\x60 hai aur setter \x60setName(String name)\x60 hai. Boolean fields ke liye getter \x60isActive()\x60 ho sakta hai \x60getActive()\x60 ki jagah. Ye conventions sirf stylistic nahi hain — Java frameworks aur IDEs jo auto-generate karte hain wo bhi inhe follow karti hain.

Setters mein validation hoti hai. Well-designed setter kabhi blindly value assign nahi karta. Ye check karta hai ke value valid hai ya nahi, change log karna ho toh karta hai, aur phir field modify karta hai. Agar value invalid hai, toh setter exception throw kar sakta hai, warning print kar sakta hai, ya purani value rakh sakta hai.

Getters sirf raw field value return nahi karte. Ye on-the-fly values compute kar sakte hain. Jaise, Person class mein \x60fullName\x60 field store na ho — balki \x60getFullName()\x60 har baar \x60firstName\x60 aur \x60lastName\x60 ko concatenate kare. Isse computed property kehte hain.

Setters side effects bhi trigger kar sakte hain. Jab aap WeatherStation object par \x60setTemperature()\x60 call karte hain, toh setter sirf temperature update nahi karta — balki change log bhi karta hai, observers ko notify karta hai, aur display update karta hai. Isse setters powerful orchestration points banata hai.`
      },
      keyPoints: [
        { id: 'kp-04-03-1', title: 'Naming Convention', description: 'getField() for getters, setField(value) for setters. Use isActive() for boolean getters.' },
        { id: 'kp-04-03-2', title: 'Validation in Setters', description: 'Setters should validate input before assigning. Reject invalid values with exceptions or warnings.' },
        { id: 'kp-04-03-3', title: 'Computed Properties', description: 'Getters can calculate values on-the-fly instead of storing them. E.g., getFullName() combines first and last name.' },
        { id: 'kp-04-03-4', title: 'Side Effects', description: 'Setters can trigger logging, notifications, or updates when values change.' },
      ],
      codeExamples: [
        {
          id: 'ce-04-03-1',
          title: 'Complete Person Class with Validation',
          code: `public class Person {
    private String firstName;
    private String lastName;
    private int age;
    private double salary;
    private boolean active;

    // Constructor
    public Person(String firstName, String lastName, int age, double salary) {
        this.firstName = firstName;
        this.lastName = lastName;
        setAge(age);          // use setter for validation
        setSalary(salary);
        this.active = true;
    }

    // Getters
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public int getAge() { return age; }
    public double getSalary() { return salary; }
    public boolean isActive() { return active; }

    // Computed property — not stored, calculated each time
    public String getFullName() {
        return firstName + " " + lastName;
    }

    // Setters with validation
    public void setAge(int age) {
        if (age >= 0 && age <= 150) {
            this.age = age;
        } else {
            throw new IllegalArgumentException("Invalid age: " + age);
        }
    }

    public void setSalary(double salary) {
        if (salary >= 0) {
            this.salary = salary;
        } else {
            throw new IllegalArgumentException("Salary cannot be negative");
        }
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public static void main(String[] args) {
        Person p = new Person("Ahmed", "Khan", 25, 50000);
        System.out.println(p.getFullName()); // Ahmed Khan
        System.out.println(p.getAge());      // 25
        p.setAge(30);
        System.out.println(p.getAge());      // 30
        // p.setAge(-5);  // throws IllegalArgumentException
    }
}`,
          language: 'java',
          output: `Ahmed Khan
25
30`,
          explanation: 'Complete example with private fields, validated setters, computed getter (getFullName), and proper naming conventions.',
        },
        {
          id: 'ce-04-03-2',
          title: 'Setter with Side Effects',
          code: `public class WeatherStation {
    private double temperature;
    private String lastUpdated;

    public void setTemperature(double temp) {
        if (temp < -273.15) {
            System.out.println("Error: Below absolute zero");
            return;
        }
        double oldTemp = this.temperature;
        this.temperature = temp;
        this.lastUpdated = java.time.LocalTime.now().toString();

        // Side effects
        System.out.println("Temperature changed: " + oldTemp + " -> " + temp);
        if (temp > 40) {
            System.out.println("WARNING: Extreme heat alert!");
        }
    }

    public double getTemperature() { return temperature; }
    public String getLastUpdated() { return lastUpdated; }
}`,
          language: 'java',
          explanation: 'The setter does more than assign a value — it validates, logs, checks for extreme conditions, and updates metadata. This is the power of encapsulated setters.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-04-03-1',
          title: 'Employee Salary System',
          scenario: 'An HR system stores employee salaries. When a salary is updated, the system must validate the amount, log the change for audit purposes, update the payroll, and notify the employee.',
          oopConcept: 'The setSalary() method handles all of this: it validates the new amount, creates an audit log entry, triggers payroll recalculation, and sends a notification. The caller simply calls setSalary() and all side effects happen automatically.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-04-03-1',
          title: 'Returning Mutable Objects Directly from Getters',
          incorrectCode: `import java.util.ArrayList;
import java.util.List;

public class Team {
    private List<String> members = new ArrayList<>();

    // BAD: returns internal mutable list
    public List<String> getMembers() {
        return members;
    }
}

// External code can do:
Team team = new Team();
List<String> m = team.getMembers();
m.add("Hacker");  // modifies internal state directly!
m.clear();         // empties the team's member list!`,
          correctCode: `import java.util.ArrayList;
import java.util.List;
import java.util.Collections;

public class Team {
    private List<String> members = new ArrayList<>();

    // GOOD: return an unmodifiable copy
    public List<String> getMembers() {
        return Collections.unmodifiableList(members);
    }

    // Or return a defensive copy
    public List<String> getMembersCopy() {
        return new ArrayList<>(members);
    }

    public void addMember(String name) {
        members.add(name);
    }
}

// External code:
Team team = new Team();
team.addMember("Ali");
List<String> m = team.getMembers();
// m.add("Hacker"); // throws UnsupportedOperationException
// internal state is safe!`,
          explanation: 'Returning mutable internal objects breaks encapsulation. External code can modify the internal state directly. Use Collections.unmodifiableList() or return a defensive copy.',
        },
      ],
      examNotes: [
        { id: 'en-04-03-1', title: 'Getter/Setter Naming', content: 'getFieldName() for getters, setFieldName(value) for setters. isFieldName() for boolean getters. These are JavaBean conventions.', importance: 'medium' },
        { id: 'en-04-03-2', title: 'Computed Properties', content: 'Getters can calculate values dynamically. getFullName() combining first and last name is a common exam example.', importance: 'medium' },
        { id: 'en-04-03-3', title: 'Mutable Return Values', content: 'Returning mutable objects (List, Date, arrays) from getters breaks encapsulation. Use defensive copying or unmodifiable wrappers.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-04-03-1', question: 'Why should getters never return mutable internal objects directly?', answer: 'If a getter returns a mutable object like a List, external code can modify that list and change the internal state of the object without going through setters. This breaks encapsulation. Use Collections.unmodifiableList() or return a defensive copy.', difficulty: 'medium' },
        { id: 'vq-04-03-2', question: 'What is a computed property?', answer: 'A computed property is a getter that calculates its value on-the-fly rather than reading from a stored field. For example, getFullName() concatenates firstName and lastName each time it is called.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-04-03-1', type: 'mcq', question: 'What is the correct getter name for a boolean field called \x60active\x60?', options: ['getActive()', 'isActive()', 'active()', 'checkActive()'], correctAnswer: 'isActive()', explanation: 'Boolean getters conventionally use isXxx() instead of getXxx(). This is a JavaBean convention followed by frameworks and IDEs.' },
        { id: 'qc-04-03-2', type: 'true-false', question: 'A setter should always validate the input before assigning the value.', correctAnswer: 'True', explanation: 'Setters are the gatekeepers of encapsulation. They must validate input to ensure the object remains in a valid state.' },
        { id: 'qc-04-03-3', type: 'mcq', question: 'What does a computed property getter do?', options: ['Stores a value in a field', 'Returns a calculated value each time it is called', 'Deletes the field after first access', 'Logs the access to console'], correctAnswer: 'Returns a calculated value each time it is called', explanation: 'Computed properties calculate their value dynamically from other fields rather than storing a separate value.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-04-03-1',
          scenario: 'You have a BankAccount class with a private List<Transaction> transactions field. You need to provide access to the transaction history but prevent external code from modifying it.',
          question: 'How should you implement the getter?',
          type: 'design-decision',
          options: [
            'Return the internal list directly: return transactions;',
            'Return Collections.unmodifiableList(transactions)',
            'Make the list public instead',
            'Return a null value and add a separate addTransaction() method only',
          ],
          correctAnswer: 'Return Collections.unmodifiableList(transactions)',
          explanation: 'Returning an unmodifiable list preserves encapsulation — external code can read but not modify the list. Direct reference return allows external modification. The addTransaction() method is a good addition but does not solve the read access problem.',
          relatedConcepts: ['defensive-copying', 'getters', 'mutable-objects'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-getters-setters',
      prerequisites: ['lesson-04-01', 'lesson-04-02'],
      xpReward: 70,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'accessor-methods',
      difficulty: 'medium',
      estimatedMinutes: 25,
    },
    {
      id: 'lesson-04-04',
      moduleId: 'module-04',
      title: 'Private Fields and Public Interface',
      slug: 'private-fields-public-interface',
      order: 4,
      duration: 20,
      description: 'Learn to design clean public APIs that hide internal complexity while providing exactly the functionality external code needs.',
      learningObjectives: [
        { id: 'lo-04-04-1', description: 'Design a clean public interface for a class', completed: false },
        { id: 'lo-04-04-2', description: 'Decide which methods should be public vs private', completed: false },
        { id: 'lo-04-04-3', description: 'Apply the principle of minimal public surface area', completed: false },
      ],
      englishExplanation: {
        id: 'ee-04-04',
        text: `A well-designed class has a clear separation between its private implementation and its public interface. The public interface is the contract that external code relies on. It should be minimal, stable, and intuitive.

The principle of minimal public surface area states: expose as few public methods and fields as necessary. Every public method is a commitment — you must maintain it, test it, and document it. If a method is only used internally, make it private. This reduces the class's surface area and makes it easier to change the implementation later.

When designing a public interface, think from the user's perspective. What does external code need to do with this class? For a BankAccount: deposit, withdraw, check balance, get owner name. These become the public methods. Internal methods like validateTransaction(), updateLedger(), or calculateInterest() should remain private because they are implementation details.

A clean public interface is also consistent. If you have getFirstName() and getLastName(), the user expects getFullName() to exist. If you have deposit(), the user expects withdraw(). Inconsistency in the public API confuses users and leads to bugs.

The public interface should also be stable. Frequent changes to public methods break external code. Design the interface carefully before implementing. Once published, changes to the public interface should be rare and well-documented.

Private implementation, on the other hand, can change freely. You can refactor internal algorithms, optimize performance, or restructure data storage — as long as the public interface continues to work the same way. This is the true power of encapsulation: separating what the class does (public interface) from how it does it (private implementation).`
      },
      romanUrduExplanation: {
        id: 'ru-04-04',
        text: `Ek well-designed class mein private implementation aur public interface ke beech clear separation hota hai. Public interface wo contract hai jis par external code rely karta hai. Ye minimal, stable, aur intuitive hona chahiye.

Minimal public surface area ka principle ye hai: sirf itna expose karein jitna zaroori hai. Har public method ek commitment hai — aapko use maintain karna, test karna, aur document karna padta hai. Agar method sirf internally use hota hai, toh use private karein. Isse class ki surface area kam hoti hai aur implementation badalna aasan hota hai.

Public interface design karte waqt user ki perspective se sochein. External code ko is class ke saath kya karna hai? BankAccount ke liye: deposit, withdraw, balance check, owner name. Ye public methods ban jaate hain. Internal methods jaise validateTransaction(), updateLedger(), ya calculateInterest() private rehne chahiye kyunki ye implementation details hain.

Clean public interface consistent bhi hota hai. Agar aapke paas getFirstName() aur getLastName() hain, toh user expect karta hai ke getFullName() bhi ho. Agar deposit() hai, toh user expect karta hai ke withdraw() bhi ho. Public API mein inconsistency users ko confuse karti hai aur bugs ka sabab banti hai.

Private implementation, doosri taraf, freely change ho sakti hai. Aap internal algorithms refactor kar sakte hain, performance optimize kar sakte hain, ya data storage restructure kar sakte hain — jab tak public interface waisa hi kaam karta rahe. Ye encapsulation ki asli taqat hai: class kya karta hai (public interface) aur kaise karta hai (private implementation) ko alag karna.`
      },
      keyPoints: [
        { id: 'kp-04-04-1', title: 'Minimal Surface Area', description: 'Expose only the methods external code actually needs. Every public method is a maintenance commitment.' },
        { id: 'kp-04-04-2', title: 'User Perspective', description: 'Design the public interface from the caller\'s perspective, not the implementer\'s.' },
        { id: 'kp-04-04-3', title: 'Stable Interface', description: 'The public API should change rarely. Frequent changes break external code.' },
        { id: 'kp-04-04-4', title: 'Internal Freedom', description: 'Private implementation can change freely without affecting external code.' },
      ],
      codeExamples: [
        {
          id: 'ce-04-04-1',
          title: 'Designing a Clean Library Class',
          code: `public class Library {
    private List<Book> books = new ArrayList<>();
    private Map<String, List<Book>> index = new HashMap<>();

    // PUBLIC INTERFACE — what users need
    public void addBook(Book book) {
        books.add(book);
        indexBook(book);
    }

    public Book findBookByIsbn(String isbn) {
        return index.getOrDefault(isbn, null);
    }

    public List<Book> searchByTitle(String title) {
        return books.stream()
            .filter(b -> b.getTitle().contains(title))
            .toList();
    }

    public int getTotalBooks() {
        return books.size();
    }

    // PRIVATE IMPLEMENTATION — how it works internally
    private void indexBook(Book book) {
        index.put(book.getIsbn(), List.of(book));
    }

    private void rebuildIndex() {
        index.clear();
        for (Book book : books) {
            indexBook(book);
        }
    }

    private boolean isBookAvailable(String isbn) {
        return index.containsKey(isbn);
    }
}`,
          language: 'java',
          explanation: 'The public methods (addBook, findBookByIsbn, searchByTitle, getTotalBooks) form a clean API. Private methods (indexBook, rebuildIndex, isBookAvailable) are implementation details that can change without affecting users.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-04-04-1',
          title: 'Smartphone as Interface',
          scenario: 'A smartphone is an excellent example of public interface vs private implementation. The touchscreen and buttons are the public interface — they are how you interact with the phone. The internal circuitry, processors, and memory management are the private implementation. Apple can change the processor from A14 to A15 without changing how you use the phone.',
          oopConcept: 'The phone\'s public API (screen, buttons, voice commands) stays stable. The private implementation (hardware, OS internals) can be upgraded freely. This is exactly how well-designed classes work.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-04-04-1',
          title: 'Exposing Internal Implementation Details',
          incorrectCode: `public class ShoppingCart {
    private List<Item> items = new ArrayList<>();

    // BAD: exposes internal data structure
    public List<Item> getItems() {
        return items;
    }

    // BAD: exposes internal method
    public void recalculateTotal() {
        // internal logic
    }

    // BAD: exposes internal validation
    public boolean isValidItem(Item item) {
        return item != null && item.getPrice() > 0;
    }
}`,
          correctCode: `public class ShoppingCart {
    private List<Item> items = new ArrayList<>();

    // GOOD: only what users need
    public void addItem(Item item) {
        if (item != null && item.getPrice() > 0) {
            items.add(item);
        }
    }

    public double getTotal() {
        return items.stream()
            .mapToDouble(Item::getPrice)
            .sum();
    }

    public int getItemCount() {
        return items.size();
    }

    // Implementation details are private
    private boolean isValidItem(Item item) {
        return item != null && item.getPrice() > 0;
    }
}`,
          explanation: 'Expose only the operations users need (addItem, getTotal, getItemCount). Keep internal validation and data structure details private.',
        },
      ],
      examNotes: [
        { id: 'en-04-04-1', title: 'Public Interface Design', content: 'The public interface should be minimal, stable, and intuitive. Think from the user\'s perspective. Every public method is a commitment to maintain.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-04-04-1', question: 'What is the principle of minimal public surface area?', answer: 'It states that a class should expose as few public methods and fields as necessary. Each public method is a maintenance commitment. Methods only used internally should be private to reduce the class\'s surface area and enable easier future changes.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-04-04-1', type: 'mcq', question: 'Why should internal helper methods be private?', options: ['They run faster when private', 'They are not part of the class\'s public contract and can change freely', 'Java requires all helper methods to be private', 'Private methods use less memory'], correctAnswer: 'They are not part of the class\'s public contract and can change freely', explanation: 'Private methods are implementation details. Making them private allows free refactoring without breaking external code.' },
        { id: 'qc-04-04-2', type: 'true-false', question: 'A class with more public methods is always better designed.', correctAnswer: 'False', explanation: 'More public methods means a larger surface area, more maintenance burden, and more coupling. Good design exposes only what is necessary.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-04-04-1',
          scenario: 'You are designing a PaymentProcessor class. It needs to process payments, validate card numbers, connect to a bank API, and log transactions.',
          question: 'Which methods should be public?',
          type: 'design-decision',
          options: [
            'processPayment(), validateCard(), connectToApi(), logTransaction() — all public',
            'processPayment() — public. validateCard(), connectToApi(), logTransaction() — private',
            'processPayment() and connectToApi() — public. Others private',
            'All methods private, only fields public',
          ],
          correctAnswer: 'processPayment() — public. validateCard(), connectToApi(), logTransaction() — private',
          explanation: 'Users only need to process payments. Validation, API connection, and logging are internal implementation details. They should be private.',
          relatedConcepts: ['public-interface', 'minimal-surface-area', 'encapsulation'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-public-interface',
      prerequisites: ['lesson-04-02', 'lesson-04-03'],
      xpReward: 60,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'interface-design',
      difficulty: 'medium',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-04-05',
      moduleId: 'module-04',
      title: 'Immutable Objects',
      slug: 'immutable-objects',
      order: 5,
      duration: 22,
      description: 'Learn to create immutable objects using final fields, no setters, defensive copying, and understand String immutability.',
      learningObjectives: [
        { id: 'lo-04-05-1', description: 'Define immutability and explain its benefits', completed: false },
        { id: 'lo-04-05-2', description: 'Create an immutable class following all Java rules', completed: false },
        { id: 'lo-04-05-3', description: 'Explain why Java String is immutable', completed: false },
        { id: 'lo-04-05-4', description: 'Compare mutable vs immutable object behavior', completed: false },
      ],
      englishExplanation: {
        id: 'ee-04-05',
        text: `An immutable object is an object whose state cannot be modified after it is created. Once you create an immutable object, its fields never change — no setters, no modification methods, nothing. This sounds restrictive, but immutability provides enormous benefits.

Benefits of immutable objects:
1. **Thread Safety**: Since the state never changes, multiple threads can read the object simultaneously without synchronization.
2. **No Side Effects**: Passing an immutable object to a method guarantees it will not be modified. No unexpected changes.
3. **Safe Hash Keys**: Immutable objects make excellent HashMap keys because their hashCode() never changes.
4. **Simplicity**: Easier to reason about, test, and debug.

To create an immutable class in Java, follow these rules:
1. Make the class final (prevent subclassing)
2. Make all fields private and final
3. No setters — only getters
4. Deep copy mutable objects in constructor and getters (defensive copying)
5. No methods that modify internal state

Java String is the most famous immutable class. Once created, you cannot change a String's characters. When you call \x60s.toUpperCase()\x60, it does NOT modify the original String — it returns a NEW String with uppercase characters. The original remains unchanged.

The String pool in Java relies on immutability. Since Strings cannot change, multiple variables can safely reference the same String object without risk of one variable modifying the value that another variable sees.`
      },
      romanUrduExplanation: {
        id: 'ru-04-05',
        text: `Immutable object ek aisa object hai jiska state create karne ke baad change nahi ho sakta. Ek baar immutable object banaya, toh uske fields kabhi nahi badalte — koi setters nahi, koi modification methods nahi. Ye restrictive lagta hai, lekin immutability bahut bade benefits deta hai.

Immutable objects ke benefits:
1. **Thread Safety**: State kabhi change nahi hota, toh multiple threads bina synchronization ke safely read kar sakte hain.
2. **No Side Effects**: Immutable object method mein pass karna guarantee deta hai ke wo modify nahi hoga.
3. **Safe Hash Keys**: Immutable objects excellent HashMap keys banate hain kyunki unka hashCode() kabhi nahi badalta.
4. **Simplicity**: Reason karna, test karna, aur debug karna aasan hota hai.

Java mein immutable class banane ke liye ye rules follow karein:
1. Class ko final banayein (subclassing rokein)
2. Saari fields ko private aur final banayein
3. Koi setters nahi — sirf getters
4. Mutable objects ko constructor aur getters mein deeply copy karein (defensive copying)
5. Internal state modify karne wale koi methods nahi

Java String sabse famous immutable class hai. Ek baar create hone ke baad, aap String ke characters change nahi kar sakte. Jab aap \x60s.toUpperCase()\x60 call karte hain, toh ye ORIGINAL String modify nahi karta — ye EK NAYA String return karta hai uppercase characters ke saath. Original waisa hi rehta hai.

Java mein String pool immutability par rely karta hai. Kyunki Strings change nahi ho sakte, toh multiple variables safely ek hi String object ko reference kar sakte hain bina kisi risk ke.`
      },
      keyPoints: [
        { id: 'kp-04-05-1', title: 'Immutable = Unchangeable', description: 'An immutable object\'s state cannot be modified after creation. No setters, no modification methods.' },
        { id: 'kp-04-05-2', title: 'Thread Safety', description: 'Immutable objects are inherently thread-safe. Multiple threads can read without synchronization.' },
        { id: 'kp-04-05-3', title: 'String Immutability', description: 'Java Strings are immutable. toUpperCase() returns a new String, never modifies the original.' },
        { id: 'kp-04-05-4', title: 'Rules for Immutability', description: 'Final class, final private fields, no setters, defensive copying of mutable objects.' },
      ],
      codeExamples: [
        {
          id: 'ce-04-05-1',
          title: 'Creating an Immutable Person Class',
          code: `public final class Person {          // 1. final class
    private final String name;    // 2. private final
    private final int age;
    private final List<String> hobbies;

    // 3. Constructor with defensive copying
    public Person(String name, int age, List<String> hobbies) {
        this.name = name;
        this.age = age;
        this.hobbies = new ArrayList<>(hobbies); // defensive copy
    }

    // 4. Only getters, no setters
    public String getName() { return name; }
    public int getAge() { return age; }

    // 5. Return defensive copy of mutable object
    public List<String> getHobbies() {
        return new ArrayList<>(hobbies); // defensive copy
    }

    @Override
    public String toString() {
        return name + " (age " + age + ")";
    }
}`,
          language: 'java',
          explanation: 'This class follows all 5 rules of immutability: final class, final private fields, no setters, defensive copying in constructor and getter.',
        },
        {
          id: 'ce-04-05-2',
          title: 'String Immutability in Action',
          code: `public class StringImmutability {
    public static void main(String[] args) {
        String s1 = "Hello";
        String s2 = s1.toUpperCase();

        System.out.println(s1);  // Hello (unchanged!)
        System.out.println(s2);  // HELLO (new String)

        // s1 did NOT change. A new String was created.
        System.out.println(s1 == s2); // false — different objects

        // String pool — same reference for identical strings
        String a = "Java";
        String b = "Java";
        System.out.println(a == b); // true — same pool object

        // But concatenation creates a new object
        String c = a + " Programming";
        System.out.println(a == c); // false — new object
    }
}`,
          language: 'java',
          output: `Hello
HELLO
false
true
false`,
          explanation: 'String methods return new Strings. The original is never modified. The String pool shares references for identical literals, but any modification creates a new object.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-04-05-1',
          title: 'Configuration Objects',
          scenario: 'Application configuration (database URL, API keys, server settings) should be immutable. Once loaded at startup, configuration values should never change during execution. This prevents accidental or malicious modification of critical settings.',
          oopConcept: 'An AppConfig class with final fields and no setters ensures configuration stability. Multiple threads can safely read configuration without locks. If a change is needed, a new AppConfig object is created.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-04-05-1',
          title: 'Forgetting Defensive Copying of Mutable Fields',
          incorrectCode: `public final class Team {
    private final List<String> members;

    public Team(List<String> members) {
        this.members = members; // shares the reference!
    }

    public List<String> getMembers() {
        return members; // exposes internal list!
    }
}

// External code breaks immutability:
List<String> list = new ArrayList<>();
list.add("Ali");
Team team = new Team(list);
list.add("Hacker");        // modifies team's internal list!
team.getMembers().clear(); // empties the list!`,
          correctCode: `public final class Team {
    private final List<String> members;

    public Team(List<String> members) {
        this.members = new ArrayList<>(members); // defensive copy
    }

    public List<String> getMembers() {
        return new ArrayList<>(members); // defensive copy
    }
}

List<String> list = new ArrayList<>();
list.add("Ali");
Team team = new Team(list);
list.add("Hacker");        // no effect on team
team.getMembers().clear(); // no effect on internal list
System.out.println(team.getMembers()); // [Ali]`,
          explanation: 'Without defensive copying, external code can modify the internal state through shared references. Always copy mutable objects in constructors and getters.',
        },
      ],
      examNotes: [
        { id: 'en-04-05-1', title: 'Immutable Rules', content: 'Remember all 5 rules: final class, final private fields, no setters, defensive copy in constructor, defensive copy in getter. Missing any one breaks immutability.', importance: 'high' },
        { id: 'en-04-05-2', title: 'String Immutability', content: 'String is immutable. Methods like toUpperCase() return NEW Strings. Original is never modified. The String pool depends on this immutability.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-04-05-1', question: 'Why are immutable objects thread-safe?', answer: 'Since their state never changes after creation, multiple threads can read them simultaneously without any risk of data corruption or race conditions. No synchronization is needed.', difficulty: 'medium' },
        { id: 'vq-04-05-2', question: 'Why does Java\'s String class use immutability?', answer: 'Immutability enables the String pool (memory sharing), thread safety without synchronization, and safe use as HashMap keys. It also prevents security vulnerabilities in class loading and networking.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-04-05-1', type: 'true-false', question: 'An immutable class can have a setter if it validates the input.', correctAnswer: 'False', explanation: 'An immutable class cannot have ANY setter. The state must never change after construction, regardless of validation.' },
        { id: 'qc-04-05-2', type: 'mcq', question: 'What does s.toUpperCase() do to a String s?', options: ['Modifies s to uppercase', 'Returns a new uppercase String, s is unchanged', 'Returns null', 'Throws an exception'], correctAnswer: 'Returns a new uppercase String, s is unchanged', explanation: 'String is immutable. toUpperCase() creates and returns a new String. The original string s remains unchanged.' },
        { id: 'qc-04-05-3', type: 'mcq', question: 'Which keyword is used to prevent a class from being subclassed?', options: ['static', 'final', 'abstract', 'sealed'], correctAnswer: 'final', explanation: 'A final class cannot be extended. This is required for immutability to prevent subclasses from overriding methods to modify state.', difficulty: 'medium' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-04-05-1',
          scenario: 'You are designing a class to represent a date of birth. The date should never change after the object is created.',
          question: 'Which design approach is correct?',
          type: 'design-decision',
          options: [
            'Make the class mutable with setters for day, month, year',
            'Make the class immutable with final fields and no setters',
            'Make the fields public for direct access',
            'Use only static methods',
          ],
          correctAnswer: 'Make the class immutable with final fields and no setters',
          explanation: 'A date of birth is inherently fixed. An immutable class ensures it cannot be accidentally or maliciously changed after creation.',
          relatedConcepts: ['immutability', 'final-fields', 'defensive-copying'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-immutable-objects',
      prerequisites: ['lesson-04-01', 'lesson-04-03'],
      xpReward: 70,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'immutability',
      difficulty: 'medium',
      estimatedMinutes: 22,
    },
    {
      id: 'lesson-04-06',
      moduleId: 'module-04',
      title: 'Defensive Copying',
      slug: 'defensive-copying',
      order: 6,
      duration: 20,
      description: 'Learn to protect internal state from external modification by creating defensive copies of mutable objects.',
      learningObjectives: [
        { id: 'lo-04-06-1', description: 'Explain why defensive copying is necessary', completed: false },
        { id: 'lo-04-06-2', description: 'Create defensive copies in constructors and getters', completed: false },
        { id: 'lo-04-06-3', description: 'Identify situations that require defensive copying', completed: false },
      ],
      englishExplanation: {
        id: 'ee-04-06',
        text: `Defensive copying is the practice of creating a copy of a mutable object before storing it internally or returning it externally. It protects your class's internal state from being modified through shared references.

The problem with references: When you store a mutable object (like a List, Date, or array) by reference, the external code that created that object still has a reference to it. It can modify the object after passing it to your class, and those changes will be reflected in your internal state — bypassing your validation and encapsulation.

Defensive copying in constructors: When accepting a mutable object as a constructor parameter, always create a new copy before storing it. This breaks the reference chain. The caller can modify their original object all they want — it will not affect your internal copy.

Defensive copying in getters: When returning a mutable internal object from a getter, always return a copy. This prevents external code from holding a reference to your internal state and modifying it directly.

Defensive copying in setters: When accepting a mutable object in a setter, create a copy before storing it. This ensures the caller cannot later modify the stored object through their original reference.

The cost of defensive copying: It creates additional objects, which has a small performance cost. For most applications, this cost is negligible compared to the safety benefits. In performance-critical code, you can use unmodifiable wrappers (Collections.unmodifiableList) as an alternative — they throw exceptions if modification is attempted.`
      },
      romanUrduExplanation: {
        id: 'ru-04-06',
        text: `Defensive copying mutable object ka copy banane ka practice hai use store karne se pehle ya return karne se pehle. Ye aapke class ke internal state ko shared references ke through modify hone se bachata hai.

Reference ka problem: Jab aap mutable object (jaise List, Date, ya array) ko reference ke through store karte hain, toh external code jo ne wo object create kiya uske paas abhi bhi reference hota hai. Wo aapki class ko dene ke baad bhi object modify kar sakta hai, aur wo changes aapki internal state mein reflect honge — aapki validation aur encapsulation ko bypass karke.

Constructor mein defensive copying: Mutable object ko constructor parameter ke roop mein accept karte waqt, hamesha pehle ek naya copy banayein. Isse reference chain toot jaati hai. Caller apna original object jo chahe modify kare — aapki internal copy par koi asar nahi padega.

Getter mein defensive copying: Mutable internal object ko getter se return karte waqt, hamesha copy return karein. Isse external code aapke internal state ke saath direct reference hold nahi kar sakta.

Setter mein defensive copying: Setter mein mutable object accept karte waqt, store karne se pehle copy banayein. Isse caller baad mein apne original reference ke through stored object modify nahi kar sakta.

Defensive copying ki cost: Ye additional objects create karta hai, jo chhoti performance cost hai. Zyada tar applications mein ye cost safety benefits ke mukable negligible hai. Performance-critical code mein, aap unmodifiable wrappers (Collections.unmodifiableList) use kar sakte hain.`
      },
      keyPoints: [
        { id: 'kp-04-06-1', title: 'Reference Problem', description: 'Storing by reference lets external code modify your internal state after passing the object.' },
        { id: 'kp-04-06-2', title: 'Constructor Copying', description: 'Always copy mutable parameters in constructors to break the reference chain.' },
        { id: 'kp-04-06-3', title: 'Getter Copying', description: 'Always return copies of mutable internal objects to prevent external modification.' },
        { id: 'kp-04-06-4', title: 'Unmodifiable Alternatives', description: 'Collections.unmodifiableList() provides read-only access without creating copies.' },
      ],
      codeExamples: [
        {
          id: 'ce-04-06-1',
          title: 'Defensive Copying in All Three Places',
          code: `import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Employee {
    private String name;
    private Date hireDate;         // mutable!
    private List<String> skills;   // mutable!

    // Constructor — defensive copy of parameters
    public Employee(String name, Date hireDate, List<String> skills) {
        this.name = name;
        this.hireDate = new Date(hireDate.getTime()); // copy!
        this.skills = new ArrayList<>(skills);         // copy!
    }

    // Setters — defensive copy of parameters
    public void setHireDate(Date hireDate) {
        this.hireDate = new Date(hireDate.getTime()); // copy!
    }

    public void setSkills(List<String> skills) {
        this.skills = new ArrayList<>(skills);         // copy!
    }

    // Getters — defensive copy of return values
    public Date getHireDate() {
        return new Date(hireDate.getTime()); // copy!
    }

    public List<String> getSkills() {
        return new ArrayList<>(skills); // copy!
    }

    public String getName() { return name; } // String is immutable — no copy needed
}`,
          language: 'java',
          explanation: 'Every mutable object is defensively copied in constructors, setters, and getters. Immutable objects (String) need no copying. This ensures complete isolation from external code.',
        },
        {
          id: 'ce-04-06-2',
          title: 'Without vs With Defensive Copying',
          code: `import java.util.ArrayList;
import java.util.List;

public class WithoutDefensive {
    private List<String> items;

    public WithoutDefensive(List<String> items) {
        this.items = items; // shares reference!
    }
}

public class WithDefensive {
    private List<String> items;

    public WithDefensive(List<String> items) {
        this.items = new ArrayList<>(items); // copy!
    }
}

// Demonstration:
List<String> original = new ArrayList<>();
original.add("Item1");

WithoutDefensive wd = new WithoutDefensive(original);
WithDefensive d = new WithDefensive(original);

original.add("Hacked!");
// wd.items now contains ["Item1", "Hacked!"] — internal state corrupted!
// d.items still contains ["Item1"] — internal state safe!`,
          language: 'java',
          explanation: 'Without defensive copying, external modifications corrupt internal state. With defensive copying, internal state remains isolated and safe.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-04-06-1',
          title: 'Bank Transaction Processing',
          scenario: 'A bank processes transactions by receiving Transaction objects from external services. If the bank stores these objects by reference, the external service could modify the transaction amount after submission. Defensive copying ensures the bank works with its own independent copy.',
          oopConcept: 'Each incoming transaction is defensively copied before processing. This prevents the external service from changing amounts, dates, or recipients after the bank has begun processing.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-04-06-1',
          title: 'Forgetting to Copy in Getters',
          incorrectCode: `public class Course {
    private List<String> enrolledStudents = new ArrayList<>();

    public Course(List<String> students) {
        this.enrolledStudents = new ArrayList<>(students); // good — copy in constructor
    }

    // BAD: returns internal list directly
    public List<String> getEnrolledStudents() {
        return enrolledStudents;
    }
}

// External code:
Course course = new Course(List.of("Ali", "Sara"));
List<String> students = course.getEnrolledStudents();
students.add("Hacker");   // modifies internal list!
students.clear();         // empties the course!`,
          correctCode: `public class Course {
    private List<String> enrolledStudents = new ArrayList<>();

    public Course(List<String> students) {
        this.enrolledStudents = new ArrayList<>(students);
    }

    public List<String> getEnrolledStudents() {
        return new ArrayList<>(enrolledStudents); // defensive copy!
    }
}

Course course = new Course(List.of("Ali", "Sara"));
List<String> students = course.getEnrolledStudents();
students.add("Hacker");   // no effect on course
students.clear();         // no effect on course
System.out.println(course.getEnrolledStudents()); // [Ali, Sara]`,
          explanation: 'Defensive copying must happen in BOTH constructors and getters. A getter that returns the internal reference directly breaks encapsulation.',
        },
      ],
      examNotes: [
        { id: 'en-04-06-1', title: 'Where to Copy', content: 'Defensive copying is needed in: constructors (copy parameters), setters (copy parameters), and getters (copy return values). Missing any one breaks encapsulation.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-04-06-1', question: 'Why is defensive copying necessary even when you trust the caller?', answer: 'Trust is not the issue. The caller may not realize they are holding a reference that can modify your internal state. Defensive copying protects against accidental modification, not just malicious intent.', difficulty: 'medium' },
        { id: 'vq-04-06-2', question: 'What is the alternative to defensive copying for getters?', answer: 'Collections.unmodifiableList() (or similar unmodifiable wrappers) can be returned. They throw UnsupportedOperationException if modification is attempted, providing read-only access without the cost of copying.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-04-06-1', type: 'mcq', question: 'When should you create a defensive copy of a constructor parameter?', options: ['Only for String parameters', 'Only for int and double parameters', 'For any mutable object parameter', 'Never — it wastes memory'], correctAnswer: 'For any mutable object parameter', explanation: 'Mutable objects (List, Date, arrays) should always be defensively copied to prevent external modification of internal state.' },
        { id: 'qc-04-06-2', type: 'true-false', question: 'You need to defensively copy a String parameter in a constructor.', correctAnswer: 'False', explanation: 'String is immutable in Java. Its state cannot be changed after creation, so no defensive copy is needed.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-04-06-1',
          scenario: 'Your class has a private Date field. A method receives a Date object and should update the field.',
          question: 'What is the correct approach?',
          type: 'concept-application',
          options: [
            'this.date = date; (assign directly)',
            'this.date = new Date(date.getTime()); (defensive copy)',
            'this.date = Date.copyOf(date); (use a copy method)',
            'this.date = null; and store the timestamp as long',
          ],
          correctAnswer: 'this.date = new Date(date.getTime()); (defensive copy)',
          explanation: 'Date is mutable. Direct assignment shares the reference. Defensive copying with new Date(date.getTime()) creates an independent copy.',
          relatedConcepts: ['defensive-copying', 'mutable-objects', 'date-class'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-defensive-copying',
      prerequisites: ['lesson-04-03', 'lesson-04-05'],
      xpReward: 60,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'defensive-copying',
      difficulty: 'medium',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-04-07',
      moduleId: 'module-04',
      title: 'Encapsulation in Real Systems',
      slug: 'encapsulation-in-real-systems',
      order: 7,
      duration: 25,
      description: 'See how encapsulation is applied in banking, healthcare, and e-commerce systems with practical Java examples.',
      learningObjectives: [
        { id: 'lo-04-07-1', description: 'Apply encapsulation principles to a banking system', completed: false },
        { id: 'lo-04-07-2', description: 'Design encapsulated classes for a healthcare system', completed: false },
        { id: 'lo-04-07-3', description: 'Implement encapsulation in an e-commerce scenario', completed: false },
      ],
      englishExplanation: {
        id: 'ee-04-07',
        text: `Encapsulation is not just a classroom concept — it is the backbone of every well-designed software system. Let us examine how it works in three real-world domains.

**Banking System**: A bank account must never allow direct balance manipulation. The BankAccount class encapsulates the balance as a private field. All modifications go through deposit(), withdraw(), and transfer() methods that enforce business rules: minimum balance requirements, overdraft limits, daily transaction caps, and audit logging. The balance is never exposed directly — only getBalance() provides read access. This prevents both accidental corruption and intentional fraud.

**Healthcare System**: Patient records contain highly sensitive information. A Patient class encapsulates medical history, diagnoses, and medications as private fields. Methods like addDiagnosis() and prescribeMedication() validate input against medical rules (valid diagnosis codes, drug interactions, dosage limits). The public interface provides only what medical staff need: getPatientInfo(), getMedicalHistory(), and addDiagnosis(). Internal data storage, encryption, and audit trails remain hidden.

**E-Commerce System**: A shopping cart must protect against invalid states. The Cart class encapsulates items, quantities, and prices. Methods like addItem(), removeItem(), and updateQuantity() validate each operation: items must exist, quantities must be positive, prices cannot be negative. The getTotal() method calculates the total dynamically — it does not store a separate total field that could become out of sync. This encapsulation ensures the cart always represents a valid shopping session.

In all three systems, encapsulation provides the same core benefits: data integrity through validation, controlled access through public methods, internal flexibility for change, and clear boundaries between what is exposed and what is hidden.`
      },
      romanUrduExplanation: {
        id: 'ru-04-07',
        text: `Encapsulation sirf classroom concept nahi hai — ye har well-designed software system ki backbone hai. Aaiye dekhte hain ke ye teen real-world domains mein kaise kaam karta hai.

**Banking System**: Bank account mein kabhi direct balance manipulation nahi honi chahiye. BankAccount class balance ko private field ke roop mein encapsulate karta hai. Saari modifications deposit(), withdraw(), aur transfer() methods ke through hoti hain jo business rules enforce karti hain: minimum balance requirements, overdraft limits, daily transaction caps, aur audit logging. Balance kabhi directly expose nahi hota — sirf getBalance() read access deta hai.

**Healthcare System**: Patient records mein highly sensitive information hoti hai. Patient class medical history, diagnoses, aur medications ko private fields ke roop mein encapsulate karta hai. Methods jaise addDiagnosis() aur prescribeMedication() input ko medical rules ke against validate karti hain. Public interface sirf wo deta hai jo medical staff ko chahiye.

**E-Commerce System**: Shopping cart invalid states se protect karna chahiye. Cart class items, quantities, aur prices ko encapsulate karta hai. Methods jaise addItem(), removeItem(), aur updateQuantity() har operation validate karti hain. getTotal() method total ko dynamically calculate karta hai — ye alag field store nahi karta jo out of sync ho sakta hai.

In teeno systems mein, encapsulation same core benefits deta hai: data integrity through validation, controlled access through public methods, internal flexibility for change, aur clear boundaries between exposed and hidden.`
      },
      keyPoints: [
        { id: 'kp-04-07-1', title: 'Banking', description: 'Balance is private. All modifications go through validated methods (deposit, withdraw, transfer).' },
        { id: 'kp-04-07-2', title: 'Healthcare', description: 'Patient data is private. Methods validate medical rules before modifying records.' },
        { id: 'kp-04-07-3', title: 'E-Commerce', description: 'Cart items and prices are encapsulated. Calculations are dynamic, not stored.' },
      ],
      codeExamples: [
        {
          id: 'ce-04-07-1',
          title: 'Banking System with Full Encapsulation',
          code: `public class BankAccount {
    private final String accountNumber;
    private final String ownerName;
    private double balance;
    private int dailyTransactionCount;
    private static final double MIN_BALANCE = 100;
    private static final int MAX_DAILY_TRANSACTIONS = 10;

    public BankAccount(String accountNumber, String ownerName, double initialDeposit) {
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        if (initialDeposit < MIN_BALANCE) {
            throw new IllegalArgumentException("Initial deposit must be >= " + MIN_BALANCE);
        }
        this.balance = initialDeposit;
        this.dailyTransactionCount = 0;
    }

    public boolean deposit(double amount) {
        if (amount <= 0) return false;
        if (dailyTransactionCount >= MAX_DAILY_TRANSACTIONS) {
            System.out.println("Daily transaction limit reached");
            return false;
        }
        balance += amount;
        dailyTransactionCount++;
        return true;
    }

    public boolean withdraw(double amount) {
        if (amount <= 0 || amount > balance - MIN_BALANCE) return false;
        if (dailyTransactionCount >= MAX_DAILY_TRANSACTIONS) {
            System.out.println("Daily transaction limit reached");
            return false;
        }
        balance -= amount;
        dailyTransactionCount++;
        return true;
    }

    public boolean transfer(BankAccount recipient, double amount) {
        if (this.withdraw(amount)) {
            recipient.deposit(amount);
            return true;
        }
        return false;
    }

    public double getBalance() { return balance; }
    public String getAccountNumber() { return accountNumber; }
    public String getOwnerName() { return ownerName; }
}`,
          language: 'java',
          explanation: 'The BankAccount class fully encapsulates its state. Balance, transaction count, and rules are all private. External code interacts only through validated methods.',
        },
        {
          id: 'ce-04-07-2',
          title: 'E-Commerce Cart',
          code: `import java.util.ArrayList;
import java.util.List;

public class ShoppingCart {
    private final List<CartItem> items = new ArrayList<>();

    public void addItem(String productId, String name, double price, int quantity) {
        if (price < 0 || quantity <= 0) {
            throw new IllegalArgumentException("Invalid price or quantity");
        }
        for (CartItem item : items) {
            if (item.productId.equals(productId)) {
                item.quantity += quantity;
                return;
            }
        }
        items.add(new CartItem(productId, name, price, quantity));
    }

    public void removeItem(String productId) {
        items.removeIf(item -> item.productId.equals(productId));
    }

    public double getTotal() {
        return items.stream()
            .mapToDouble(item -> item.price * item.quantity)
            .sum();
    }

    public int getItemCount() {
        return items.stream().mapToInt(item -> item.quantity).sum();
    }

    public List<CartItem> getItems() {
        return new ArrayList<>(items); // defensive copy
    }

    private static class CartItem {
        String productId;
        String name;
        double price;
        int quantity;

        CartItem(String productId, String name, double price, int quantity) {
            this.productId = productId;
            this.name = name;
            this.price = price;
            this.quantity = quantity;
        }
    }
}`,
          language: 'java',
          explanation: 'The ShoppingCart encapsulates all item management. getTotal() is computed dynamically. The internal CartItem class is private. External code only sees addItem(), removeItem(), getTotal().',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-04-07-1',
          title: 'Hospital Patient Records',
          scenario: 'A hospital stores patient records with diagnoses, medications, and treatment plans. Only authorized medical staff should access and modify records. All changes must be logged for legal compliance.',
          oopConcept: 'The PatientRecord class encapsulates all medical data. Methods like addDiagnosis() validate against ICD-10 codes. Access is logged with timestamps. The class ensures HIPAA compliance through strict encapsulation.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-04-07-1',
          title: 'Bypassing Business Rules',
          incorrectCode: `public class BankAccount {
    public double balance;  // public — no validation!

    // External code can do:
    // account.balance = 1000000; // bypasses all rules!
    // account.balance = -5000;   // negative balance!
}`,
          correctCode: `public class BankAccount {
    private double balance;

    public boolean withdraw(double amount) {
        if (amount <= 0 || amount > balance) {
            return false;  // validation enforced
        }
        balance -= amount;
        return true;
    }
}`,
          explanation: 'Public fields allow anyone to bypass business rules. Private fields with validated methods enforce all rules consistently.',
        },
      ],
      examNotes: [
        { id: 'en-04-07-1', title: 'Real-World Application', content: 'Encapsulation is essential in systems with business rules, security requirements, or audit needs. Banking, healthcare, and e-commerce are classic exam examples.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-04-07-1', question: 'How does encapsulation prevent fraud in a banking system?', answer: 'By making balance private and routing all modifications through validated methods, encapsulation prevents direct balance manipulation. Methods enforce rules like minimum balance, transaction limits, and audit logging.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-04-07-1', type: 'mcq', question: 'In an e-commerce cart, why should getTotal() compute the total dynamically instead of storing it?', options: ['It uses less memory', 'It prevents the total from becoming out of sync with actual items', 'It is faster', 'It is required by Java'], correctAnswer: 'It prevents the total from becoming out of sync with actual items', explanation: 'A stored total can become inconsistent if items change. Dynamic calculation always reflects the true state of the cart.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-04-07-1',
          scenario: 'You are building a hospital system where only doctors can prescribe medications and only nurses can update vital signs.',
          question: 'How should you design the Patient class?',
          type: 'design-decision',
          options: [
            'Make all fields public so any staff member can access them',
            'Make fields private with separate methods for doctors and nurses',
            'Use only static methods for all operations',
            'Store all data in a single public HashMap',
          ],
          correctAnswer: 'Make fields private with separate methods for doctors and nurses',
          explanation: 'Private fields with role-specific methods ensure each staff type can only perform their authorized operations. This is encapsulation enforcing access control.',
          relatedConcepts: ['encapsulation', 'access-control', 'role-based-access'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-real-world-encapsulation',
      prerequisites: ['lesson-04-01', 'lesson-04-04'],
      xpReward: 75,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'real-world-systems',
      difficulty: 'medium',
      estimatedMinutes: 25,
    },
    {
      id: 'lesson-04-08',
      moduleId: 'module-04',
      title: 'Common Encapsulation Mistakes',
      slug: 'common-encapsulation-mistakes',
      order: 8,
      duration: 20,
      description: 'Learn to identify and fix the most common encapsulation anti-patterns: exposing mutable state, over-getting, and anemic domain models.',
      learningObjectives: [
        { id: 'lo-04-08-1', description: 'Identify the anti-pattern of exposing mutable state', completed: false },
        { id: 'lo-04-08-2', description: 'Recognize and fix over-getting/over-setting', completed: false },
        { id: 'lo-04-08-3', description: 'Understand the anemic domain model anti-pattern', completed: false },
      ],
      englishExplanation: {
        id: 'ee-04-08',
        text: `Even experienced developers make encapsulation mistakes. Here are the three most common anti-patterns and how to fix them.

**Exposing Mutable State**: The most common mistake is returning mutable internal objects directly from getters. When a getter returns a List, Map, Date, or array, external code can modify the internal state of your object. The fix: return Collections.unmodifiableList(), create defensive copies, or return computed values instead of internal objects.

**Over-Getting and Over-Setting**: Some developers create getters and setters for every single field, even when they are not needed. This defeats the purpose of encapsulation. If a field should never be read externally, do not create a getter. If a field should never be modified after construction, do not create a setter. Only create accessors for the access that external code actually needs.

**Anemic Domain Model**: This is a subtle anti-pattern where a class has private fields and getters/setters, but NO business logic in its methods. All the logic resides in external service classes. The domain objects become mere data containers — essentially public fields with extra steps. The fix: move business logic INTO the domain class. A BankAccount should have deposit() and withdraw() methods with validation, not just getBalance() and setBalance().

**Exposing Implementation Details**: Making internal helper methods or data structures public exposes how the class works, not just what it does. If you use a HashMap internally for indexing, that is an implementation detail. External code should not know or care about it. Keep it private.

The guiding principle: the public interface should describe WHAT the class does, not HOW it does it. If your public interface reveals internal implementation, it violates encapsulation.`
      },
      romanUrduExplanation: {
        id: 'ru-04-08',
        text: `Experienced developers bhi encapsulation mistakes karte hain. Ye teen most common anti-patterns hain aur kaise fix karein.

**Mutable State Exposing**: Sabse common mistake getters se mutable internal objects directly return karna hai. Jab getter List, Map, Date, ya array return karta hai, toh external code aapke object ki internal state modify kar sakta hai. Fix: Collections.unmodifiableList() return karein, defensive copies banayein, ya internal objects ki bajaye computed values return karein.

**Over-Getting and Over-Setting**: Kuch developers har single field ke liye getters aur setters banate hain, jabki zaroorat nahi. Ye encapsulation ka purpose defeat karta hai. Agar field kabhi externally read nahi hona chahiye, toh getter mat banayein. Agar field construction ke baad modify nahi hona chahiye, toh setter mat banayein. Sirf wo accessors banayein jo external code ko actually chahiye.

**Anemic Domain Model**: Ye subtle anti-pattern hai jisme class ke paas private fields aur getters/setters hain, lekin methods mein KOI business logic nahi. Saara logic external service classes mein hota hai. Domain objects sirf data containers ban jaate hain — essentially public fields with extra steps. Fix: business logic ko domain class KE ANDAR le jayein. BankAccount mein deposit() aur withdraw() methods hone chahiye validation ke saath, sirf getBalance() aur setBalance() nahi.

**Implementation Details Exposing**: Internal helper methods ya data structures ko public banana class kaise kaam karta hai expose karta hai, sirf kya karta hai nahi. Agar aap internal indexing ke liye HashMap use karte hain, toh ye implementation detail hai. External code ko ye pata hona zaroori nahi. Ise private rakhein.

Guiding principle: public interface class KYA karta hai describe kare, KAISE nahi. Agar aapka public interface internal implementation reveal karta hai, toh ye encapsulation violate karta hai.`
      },
      keyPoints: [
        { id: 'kp-04-08-1', title: 'Exposed Mutable State', description: 'Returning mutable objects from getters lets external code modify internal state. Fix: defensive copies or unmodifiable wrappers.' },
        { id: 'kp-04-08-2', title: 'Over-Getting/Setting', description: 'Creating getters/setters for every field defeats encapsulation. Only create accessors that are actually needed.' },
        { id: 'kp-04-08-3', title: 'Anemic Domain Model', description: 'Classes with only getters/setters and no business logic are data bags, not objects. Move logic into the domain class.' },
      ],
      codeExamples: [
        {
          id: 'ce-04-08-1',
          title: 'Anemic vs Rich Domain Model',
          code: `// ANEMIC DOMAIN MODEL — bad!
public class BankAccount {
    private double balance;

    public double getBalance() { return balance; }
    public void setBalance(double balance) { this.balance = balance; }
}

// All logic is OUTSIDE the class:
class BankService {
    void deposit(BankAccount acc, double amount) {
        if (amount > 0) {
            acc.setBalance(acc.getBalance() + amount); // logic outside!
        }
    }
    void withdraw(BankAccount acc, double amount) {
        if (amount > 0 && amount <= acc.getBalance()) {
            acc.setBalance(acc.getBalance() - amount); // logic outside!
        }
    }
}

// RICH DOMAIN MODEL — good!
public class BankAccount {
    private double balance;

    public BankAccount(double initialBalance) {
        if (initialBalance >= 0) this.balance = initialBalance;
    }

    public boolean deposit(double amount) {
        if (amount <= 0) return false;
        balance += amount;
        return true;
    }

    public boolean withdraw(double amount) {
        if (amount <= 0 || amount > balance) return false;
        balance -= amount;
        return true;
    }

    public double getBalance() { return balance; }
}`,
          language: 'java',
          explanation: 'The anemic model has no logic in the class — it is just a data container. The rich model encapsulates business rules within the class itself, which is the true purpose of OOP.',
        },
        {
          id: 'ce-04-08-2',
          title: 'Over-Getting/Setting vs Minimal Interface',
          code: `// OVER-GETTING/SETTING — bad!
public class User {
    private String name;
    private String email;
    private int age;
    private String passwordHash;
    private LocalDateTime lastLogin;

    // ALL getters and setters — even sensitive ones!
    public String getName() { return name; }
    public void setName(String n) { name = n; }
    public String getEmail() { return email; }
    public void setEmail(String e) { email = e; }
    public int getAge() { return age; }
    public void setAge(int a) { age = a; }
    public String getPasswordHash() { return passwordHash; } // exposed!
    public void setPasswordHash(String h) { passwordHash = h; }
    public LocalDateTime getLastLogin() { return lastLogin; }
    public void setLastLogin(LocalDateTime t) { lastLogin = t; }
}

// MINIMAL INTERFACE — good!
public class User {
    private String name;
    private String email;
    private int age;
    private String passwordHash;
    private LocalDateTime lastLogin;

    public String getName() { return name; }
    public String getEmail() { return email; }
    public int getAge() { return age; }

    // Sensitive fields: no public getters/setters
    // Only methods that make business sense
    public boolean verifyPassword(String password) {
        return passwordHash.equals(hash(password));
    }

    public void recordLogin() {
        this.lastLogin = LocalDateTime.now();
    }

    private String hash(String input) { return input; /* real hash */ }
}`,
          language: 'java',
          explanation: 'The minimal interface exposes only what external code needs. Sensitive fields like passwordHash have no public getter. lastLogin is managed internally through recordLogin().',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-04-08-1',
          title: 'E-Commerce Order System',
          scenario: 'An Order class has orderDate, status, items, and totalAmount. The anemic version has getters/setters for all fields, with a separate OrderService handling all logic. The rich version has methods like place(), cancel(), and addItem() that encapsulate the business rules.',
          oopConcept: 'Rich domain models keep business logic where the data is. An Order.place() method can validate items, check inventory, and set status — all in one place. This is easier to test, maintain, and understand.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-04-08-1',
          title: 'Returning Internal Mutable Collections',
          incorrectCode: `public class Event {
    private List<String> attendees = new ArrayList<>();

    public List<String> getAttendees() {
        return attendees; // exposes internal list!
    }
}

// External code:
Event event = new Event();
event.getAttendees().add("Intruder"); // modifies internal state!
event.getAttendees().clear();         // empties the list!`,
          correctCode: `import java.util.Collections;

public class Event {
    private List<String> attendees = new ArrayList<>();

    public List<String> getAttendees() {
        return Collections.unmodifiableList(attendees);
    }

    public void addAttendee(String name) {
        if (name != null && !name.isEmpty()) {
            attendees.add(name);
        }
    }
}`,
          explanation: 'Returning the internal list directly breaks encapsulation. Use Collections.unmodifiableList() for read access and provide a separate addAttendee() method for modification.',
        },
      ],
      examNotes: [
        { id: 'en-04-08-1', title: 'Anti-Patterns', content: 'Know the three main encapsulation anti-patterns: exposed mutable state, over-getting/setting, and anemic domain models. Exams may ask you to identify or fix them.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-04-08-1', question: 'What is an anemic domain model?', answer: 'An anemic domain model is a class that has private fields and getters/setters but no business logic. All logic is in external service classes. The objects become mere data containers, defeating the purpose of OOP encapsulation.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-04-08-1', type: 'mcq', question: 'What is the problem with creating getters and setters for every field?', options: ['It makes code faster', 'It defeats encapsulation by exposing everything', 'It is required by Java', 'It improves security'], correctAnswer: 'It defeats encapsulation by exposing everything', explanation: 'Over-getting/setting exposes all internal state and removes the benefit of controlled access.' },
        { id: 'qc-04-08-2', type: 'true-false', question: 'An anemic domain model has rich business logic in its methods.', correctAnswer: 'False', explanation: 'An anemic domain model has NO business logic — only getters and setters. All logic is in external service classes.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-04-08-1',
          scenario: 'Your Order class has a status field. Currently, any code can call setStatus("cancelled") regardless of the order state.',
          question: 'Which encapsulation anti-pattern does this represent?',
          type: 'debugging',
          options: [
            'Exposed mutable state',
            'Over-getting/setting (anemic model)',
            'Defensive copying failure',
            'Access modifier misuse',
          ],
          correctAnswer: 'Over-getting/setting (anemic model)',
          explanation: 'The setStatus() setter allows any external code to change status without business logic validation. The status should be changed through methods like cancel() that enforce rules (e.g., cannot cancel a shipped order).',
          relatedConcepts: ['anemic-domain-model', 'business-logic', 'encapsulation'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-encapsulation-mistakes',
      prerequisites: ['lesson-04-01', 'lesson-04-07'],
      xpReward: 60,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'anti-patterns',
      difficulty: 'medium',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-04-09',
      moduleId: 'module-04',
      title: 'Testing Encapsulated Code',
      slug: 'testing-encapsulated-code',
      order: 9,
      duration: 20,
      description: 'Learn strategies for unit testing encapsulated classes — testing through the public API and handling private methods.',
      learningObjectives: [
        { id: 'lo-04-09-1', description: 'Explain why testing through the public API is preferred', completed: false },
        { id: 'lo-04-09-2', description: 'Write unit tests that verify encapsulated behavior', completed: false },
        { id: 'lo-04-09-3', description: 'Handle testing of private methods appropriately', completed: false },
      ],
      englishExplanation: {
        id: 'ee-04-09',
        text: `Testing encapsulated code follows a key principle: test through the public API, not through internal implementation. This approach is called black-box testing — you test what the class does, not how it does it.

Why test through the public API? Because the public API is the contract. If you test private methods directly (using reflection), your tests become coupled to the implementation. When you refactor the internal implementation (which encapsulation is designed to allow), your tests break — even though the external behavior is identical.

The correct testing approach: create objects using constructors, call public methods, and verify the results through public getters. Test all valid inputs, invalid inputs, boundary conditions, and edge cases.

For private helper methods: do not test them directly. Instead, test them indirectly through the public methods that call them. If a private method called validateAge() is tested through the public setAge() method, any bug in validateAge() will be caught by the setAge() test.

What about testing private methods with reflection? While technically possible, it is generally discouraged. Reflection-based tests are fragile, harder to read, and break during refactoring. The exception is when private methods contain critical business logic that cannot be adequately tested through the public API alone.

Testing encapsulated code also means testing encapsulation itself: verify that private fields cannot be accessed directly, that setters validate input, and that getters return correct values (or defensive copies).`
      },
      romanUrduExplanation: {
        id: 'ru-04-09',
        text: `Encapsulated code test karne mein ek key principle follow hota hai: public API ke through test karein, internal implementation ke through nahi. Is approach ko black-box testing kehte hain — aap test karte hain ke class KYA karta hai, KAISE nahi.

Public API ke through kyun test karein? Kyunki public API contract hai. Agar aap reflection se private methods directly test karte hain, toh aapke tests implementation se coupled ho jaate hain. Jab aap internal implementation refactor karte hain (jo encapsulation allow karta hai), toh aapke tests toot jaate hain — chahe external behavior same ho.

Sahi testing approach: constructors se objects banayein, public methods call karein, aur public getters ke through results verify karein. Saari valid inputs, invalid inputs, boundary conditions, aur edge cases test karein.

Private helper methods ke liye: unhe directly test mat karein. Iske bajaye, unhe public methods ke through indirectly test karein jo unhe call karte hain. Agar private validateAge() method setAge() method ke through test hoti hai, toh validateAge() mein koi bhi bug setAge() test mein pakda jaayega.

Kya reflection se private methods test karne chahiye? Technically possible hai, lekin generally discourage kiya jaata hai. Reflection-based tests fragile hote hain, padhne mein mushkil hote hain, aur refactoring ke waqt toot jaate hain.

Encapsulated code test karna encapsulation khud test karna bhi hai: verify karein ke private fields directly access nahi ho sakte, setters input validate karti hain, aur getters sahi values return karti hain.`
      },
      keyPoints: [
        { id: 'kp-04-09-1', title: 'Black-Box Testing', description: 'Test what the class does (public API), not how it does it (private implementation).' },
        { id: 'kp-04-09-2', title: 'Indirect Private Testing', description: 'Private methods are tested indirectly through the public methods that call them.' },
        { id: 'kp-04-09-3', title: 'Test Encapsulation', description: 'Verify that private fields cannot be accessed directly and that setters validate input.' },
      ],
      codeExamples: [
        {
          id: 'ce-04-09-1',
          title: 'Testing a BankAccount Through Its Public API',
          code: `public class BankAccountTest {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("Ahmed", 1000);

        // Test initial state
        assert account.getBalance() == 1000 : "Initial balance wrong";
        assert account.getOwnerName().equals("Ahmed") : "Owner name wrong";

        // Test deposit
        boolean deposited = account.deposit(500);
        assert deposited : "Deposit should succeed";
        assert account.getBalance() == 1500 : "Balance after deposit wrong";

        // Test invalid deposit
        boolean invalidDeposit = account.deposit(-100);
        assert !invalidDeposit : "Negative deposit should fail";
        assert account.getBalance() == 1500 : "Balance should not change";

        // Test withdrawal
        boolean withdrawn = account.withdraw(300);
        assert withdrawn : "Withdrawal should succeed";
        assert account.getBalance() == 1200 : "Balance after withdrawal wrong";

        // Test insufficient funds
        boolean insufficient = account.withdraw(5000);
        assert !insufficient : "Large withdrawal should fail";
        assert account.getBalance() == 1200 : "Balance should not change";

        System.out.println("All tests passed!");
    }
}`,
          language: 'java',
          output: 'All tests passed!',
          explanation: 'All tests use only the public API: constructors, deposit(), withdraw(), getBalance(). No private methods are accessed directly. The tests verify behavior, not implementation.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-04-09-1',
          title: 'Testing a Validation System',
          scenario: 'A RegistrationForm class validates user input: email format, password strength, age requirements. Tests should verify that valid input is accepted and invalid input is rejected — through the public validate() method.',
          oopConcept: 'Tests call form.setEmail(), form.setPassword(), and form.validate(). They check the return value and error messages. The internal regex patterns and validation algorithms are never tested directly.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-04-09-1',
          title: 'Testing Private Methods via Reflection',
          incorrectCode: `import java.lang.reflect.Method;

public class BadTest {
    public static void main(String[] args) throws Exception {
        BankAccount acc = new BankAccount("Test", 1000);

        // BAD: using reflection to test private method
        Method method = BankAccount.class.getDeclaredMethod("validateAmount", double.class);
        method.setAccessible(true);
        boolean result = (boolean) method.invoke(acc, -100);
        // This test will BREAK when you rename validateAmount!
    }
}`,
          correctCode: `public class GoodTest {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount("Test", 1000);

        // GOOD: test through public API
        boolean result = acc.deposit(-100);
        assert !result : "Negative deposit should fail";

        // If you refactor validateAmount() internally,
        // this test still works because it tests behavior.
    }
}`,
          explanation: 'Reflection-based tests are fragile — they break when internal methods are renamed or restructured. Public API tests survive refactoring because they test behavior, not implementation.',
        },
      ],
      examNotes: [
        { id: 'en-04-09-1', title: 'Testing Strategy', content: 'Test through the public API (black-box testing). Test constructors, public methods, and getters. Do not test private methods directly unless absolutely necessary.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-04-09-1', question: 'Why should you avoid testing private methods directly?', answer: 'Directly testing private methods couples tests to the implementation. When the implementation changes (which encapsulation allows), tests break even though external behavior is unchanged. Public API tests are resilient to internal refactoring.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-04-09-1', type: 'mcq', question: 'What is black-box testing?', options: ['Testing private methods directly', 'Testing through the public API without knowing internal implementation', 'Testing only with valid inputs', 'Testing with all boxes checked'], correctAnswer: 'Testing through the public API without knowing internal implementation', explanation: 'Black-box testing focuses on what the class does (public interface) not how it does it (private implementation).' },
        { id: 'qc-04-09-2', type: 'true-false', question: 'Private helper methods should be tested through the public methods that call them.', correctAnswer: 'True', explanation: 'Private methods are tested indirectly. If setAge() calls validateAge(), testing setAge() with various inputs will catch bugs in validateAge().' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-04-09-1',
          scenario: 'Your PasswordValidator class has a private method checkComplexity() that is called by the public validate() method.',
          question: 'How should you test checkComplexity()?',
          type: 'concept-application',
          options: [
            'Use reflection to access and test checkComplexity() directly',
            'Test it through the public validate() method with various passwords',
            'Skip testing it since it is private',
            'Make it public for testing purposes',
          ],
          correctAnswer: 'Test it through the public validate() method with various passwords',
          explanation: 'Indirect testing through the public API catches bugs in private methods without coupling tests to implementation details.',
          relatedConcepts: ['black-box-testing', 'unit-testing', 'encapsulation'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-testing-encapsulation',
      prerequisites: ['lesson-04-04', 'lesson-04-08'],
      xpReward: 60,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'testing',
      difficulty: 'medium',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-04-10',
      moduleId: 'module-04',
      title: 'Encapsulation Best Practices',
      slug: 'encapsulation-best-practices',
      order: 10,
      duration: 25,
      description: 'Practical guidelines and design heuristics for applying encapsulation effectively in real-world Java projects.',
      learningObjectives: [
        { id: 'lo-04-10-1', description: 'Apply the principle of least privilege to access control', completed: false },
        { id: 'lo-04-10-2', description: 'Design classes with encapsulation-first mindset', completed: false },
        { id: 'lo-04-10-3', description: 'Evaluate encapsulation quality using design heuristics', completed: false },
      ],
      englishExplanation: {
        id: 'ee-04-10',
        text: `Here are the practical best practices for encapsulation that separate professional code from amateur code.

1. **Principle of Least Privilege**: Give code only the access it needs. Start with private and open up only when necessary. Fields should almost always be private. Methods should be private unless they need to be called externally. This minimizes the attack surface and coupling.

2. **Make Fields Private, Always**: There are very few legitimate reasons to make a field non-private. Even if you think "it is just a simple data class," private fields with getters give you the flexibility to add validation, logging, or computed values later without changing the public API.

3. **Validate in Setters**: Setters should never blindly assign values. Check ranges, null values, format requirements, and business rules. Throw IllegalArgumentException for clearly invalid inputs. For soft validation, log warnings and keep the old value.

4. **Return Defensive Copies**: Getters that return mutable objects (List, Map, Date, arrays) should return defensive copies or unmodifiable wrappers. This prevents external code from modifying your internal state.

5. **Prefer Immutable Objects**: When possible, make objects immutable. Use final fields, no setters, and defensive copying. Immutable objects are thread-safe, easier to test, and have no unexpected side effects.

6. **Design for Change**: Encapsulate anything that might change. If you think "we might change how this is stored," encapsulate it now. The cost of adding encapsulation later is much higher than having it from the start.

7. **Cohesion Over Convenience**: Do not make fields public just because it is convenient. A class with public fields is a data bag, not an object. Encapsulation adds a small amount of code but provides enormous long-term benefits.

8. **Document Your Public API**: Public methods are a contract. Document what they do, what parameters they accept, and what they return. This helps users of your class and makes maintenance easier.`
      },
      romanUrduExplanation: {
        id: 'ru-04-10',
        text: `Ye professional code ko amateur code se alag karne wale practical best practices hain.

1. **Principle of Least Privilege**: Code ko sirf wo access dein jo use chahiye. Private se start karein aur sirf zaroorat par open karein. Fields hamesha private hone chahiye. Methods tab tak private rakhein jab tak externally call na karni ho.

2. **Fields Hamesha Private Rakhein**: Non-private field ke liye bahut kam legitimate reasons hain. Chahe aapko lage "ye sirf simple data class hai," private fields with getters flexibility dete hain validation, logging, ya computed values add karne ke liye bina public API change kiye.

3. **Setters Mein Validate Karein**: Setters kabhi blindly value assign nahi karte. Ranges, null values, format requirements, aur business rules check karein. Clearly invalid inputs ke liye IllegalArgumentException throw karein.

4. **Defensive Copies Return Karein**: Jo getters mutable objects return karte hain unhe defensive copies ya unmodifiable wrappers return karein. Isse external code aapki internal state modify nahi kar sakta.

5. **Immutable Objects Prefer Karein**: Jab possible ho, objects immutable banayein. Final fields, koi setters, aur defensive copying use karein. Immutable objects thread-safe, test karne mein aasan, aur bina unexpected side effects ke hote hain.

6. **Change Ke Liye Design Karein**: Jo cheez change ho sakti hai use encapsulate karein. Agar aapko lage "hum ye kaise store karte hain wo change kar sakte hain," toh abhi encapsulate karein.

7. **Convenience Over Cohesion**: Convenience ki wajah se fields public mat karein. Public fields wali class data bag hai, object nahi. Encapsulation chhota sa code add karta hai lekin enormous long-term benefits deta hai.

8. **Public API Document Karein**: Public methods ek contract hain. Document karein ke wo kya karti hain, kya parameters accept karti hain, aur kya return karti hain.`
      },
      keyPoints: [
        { id: 'kp-04-10-1', title: 'Least Privilege', description: 'Start with private. Open up only when necessary. Minimize coupling and attack surface.' },
        { id: 'kp-04-10-2', title: 'Always Private Fields', description: 'There are very few reasons to make fields non-private. Private fields with getters provide future flexibility.' },
        { id: 'kp-04-10-3', title: 'Immutable by Default', description: 'Prefer immutable objects. They are thread-safe, testable, and have no side effects.' },
        { id: 'kp-04-10-4', title: 'Design for Change', description: 'Encapsulate anything that might change. The cost of adding encapsulation later is much higher.' },
      ],
      codeExamples: [
        {
          id: 'ce-04-10-1',
          title: 'Well-Encapsulated Class Following All Best Practices',
          code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public final class Product {                           // 1. final class
    private final String id;                            // 2. private final fields
    private final String name;
    private double price;
    private final List<String> tags;

    public Product(String id, String name, double price, List<String> tags) {
        if (id == null || id.isEmpty()) throw new IllegalArgumentException("ID required");
        if (name == null || name.isEmpty()) throw new IllegalArgumentException("Name required");
        if (price < 0) throw new IllegalArgumentException("Price cannot be negative");

        this.id = id;                                   // 3. String immutable — no copy needed
        this.name = name;
        this.price = price;
        this.tags = new ArrayList<>(tags);              // 4. defensive copy
    }

    // 5. getters only for what users need
    public String getId() { return id; }
    public String getName() { return name; }
    public double getPrice() { return price; }

    public List<String> getTags() {                    // 6. unmodifiable copy
        return Collections.unmodifiableList(tags);
    }

    // 7. business logic in the class
    public boolean applyDiscount(double percentage) {
        if (percentage <= 0 || percentage > 100) return false;
        price = price * (1 - percentage / 100);
        return true;
    }

    // 8. no unnecessary setters
    // price can only change through applyDiscount()
    // id and name cannot change at all

    @Override
    public String toString() {
        return name + " ($" + price + ")";
    }
}`,
          language: 'java',
          explanation: 'This class follows all 8 best practices: final class, private final fields, validation in constructor, defensive copying, minimal getters, unmodifiable return values, business logic in class, and no unnecessary setters.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-04-10-1',
          title: 'Encapsulation in Spring Boot Applications',
          scenario: 'In enterprise Spring Boot applications, encapsulation is enforced through JPA entities. Fields are private with @Column annotations. Access is through getters and setters. Business logic lives in @Service classes that work with encapsulated entities. This architecture ensures data integrity, testability, and maintainability across large teams.',
          oopConcept: 'JPA entities encapsulate database columns. Service classes encapsulate business logic. Controllers encapsulate HTTP handling. Each layer has a clear, encapsulated responsibility.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-04-10-1',
          title: 'Making Fields Public for Convenience',
          incorrectCode: `// "It's just a simple DTO, who cares?"
public class ProductDTO {
    public String name;
    public double price;
    public int quantity;

    // Later, someone does:
    // dto.price = -100;  // no validation!
    // dto.quantity = -5; // impossible quantity!
}`,
          correctCode: `public class ProductDTO {
    private String name;
    private double price;
    private int quantity;

    public ProductDTO(String name, double price, int quantity) {
        setName(name);
        setPrice(price);
        setQuantity(quantity);
    }

    public String getName() { return name; }
    public void setName(String name) {
        if (name == null || name.isEmpty())
            throw new IllegalArgumentException("Name required");
        this.name = name;
    }

    public double getPrice() { return price; }
    public void setPrice(double price) {
        if (price < 0) throw new IllegalArgumentException("Price cannot be negative");
        this.price = price;
    }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) {
        if (quantity < 0) throw new IllegalArgumentException("Quantity cannot be negative");
        this.quantity = quantity;
    }
}`,
          explanation: '"Simple DTOs" become maintenance nightmares when their fields are accessed by hundreds of code locations. Private fields with validation protect against bugs that are extremely hard to trace.',
        },
      ],
      examNotes: [
        { id: 'en-04-10-1', title: 'Best Practices Summary', content: 'Key practices: least privilege, always private fields, validate in setters, defensive copies, prefer immutable, design for change, document public API.', importance: 'high' },
        { id: 'en-04-10-2', title: 'Final Keyword', content: 'Use final for fields that should not change after construction. Use final for classes that should not be subclassed. This reinforces immutability.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-04-10-1', question: 'What is the principle of least privilege and how does it apply to encapsulation?', answer: 'The principle of least privilege states that code should have only the access it needs to perform its function. In encapsulation, this means making fields private, methods private by default, and only opening up access when there is a clear external need. This minimizes coupling and potential for bugs.', difficulty: 'medium' },
        { id: 'vq-04-10-2', question: 'Why should you prefer immutable objects?', answer: 'Immutable objects are thread-safe (no synchronization needed), have no side effects when passed to methods, make safe hash map keys, are easier to test and reason about, and prevent accidental modification of shared state.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-04-10-1', type: 'mcq', question: 'What should be your default approach for field visibility?', options: ['public', 'protected', 'private', 'default'], correctAnswer: 'private', explanation: 'Always start with private. Open up access only when there is a clear need. This is the principle of least privilege.' },
        { id: 'qc-04-10-2', type: 'true-false', question: 'Encapsulation should be added later when the code stabilizes.', correctAnswer: 'False', explanation: 'Encapsulation should be designed from the start. Retrofitting encapsulation is expensive because you must update all existing code that directly accesses fields.', difficulty: 'medium' },
        { id: 'qc-04-10-3', type: 'mcq', question: 'Which of these is NOT a best practice for encapsulation?', options: ['Make fields private', 'Validate in setters', 'Return mutable objects from getters', 'Prefer immutable objects'], correctAnswer: 'Return mutable objects from getters', explanation: 'Returning mutable objects from getters breaks encapsulation by allowing external code to modify internal state. Use defensive copies or unmodifiable wrappers instead.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-04-10-1',
          scenario: 'You are reviewing a codebase where a developer has made all fields public in 50 classes "for simplicity." Management wants a quick fix.',
          question: 'What is the correct long-term approach?',
          type: 'architecture',
          options: [
            'Leave it as-is since it works',
            'Make all fields private and add getters/setters with validation',
            'Make all fields final',
            'Convert all classes to interfaces',
          ],
          correctAnswer: 'Make all fields private and add getters/setters with validation',
          explanation: 'This is the proper encapsulation fix. It requires effort but prevents future bugs, enables validation, and allows internal changes without breaking external code.',
          relatedConcepts: ['encapsulation', 'best-practices', 'refactoring'],
          difficulty: 'hard',
        },
      ],
      threeDSceneId: 'scene-encapsulation-best-practices',
      prerequisites: ['lesson-04-05', 'lesson-04-08'],
      xpReward: 80,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'best-practices',
      difficulty: 'medium',
      estimatedMinutes: 25,
    },
  ],
};
