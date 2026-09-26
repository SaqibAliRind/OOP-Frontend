import type { Module } from '@/types';

export const module06: Module = {
  id: 'module-06',
  title: 'Polymorphism',
  slug: 'polymorphism',
  order: 6,
  description: 'Master the concept of polymorphism — the ability of objects to take many forms. Learn compile-time and runtime polymorphism, method overloading, method overriding, casting, and instanceof.',
  icon: 'Layers',
  color: '#8b5cf6',
  xpReward: 680,
  isUnlocked: true,
  completed: false,
  progress: 0,
  totalDuration: 180,
  prerequisiteModuleIds: ['module-01', 'module-02', 'module-03', 'module-04', 'module-05'],
  lessons: [
    {
      id: 'lesson-06-01',
      moduleId: 'module-06',
      title: 'Understanding Polymorphism',
      slug: 'understanding-polymorphism',
      order: 1,
      duration: 15,
      description: 'Understand what polymorphism means, why it is called "many forms," and why it is one of the most powerful concepts in OOP.',
      learningObjectives: [
        { id: 'lo-06-01-1', description: 'Define polymorphism and explain its literal meaning', completed: false },
        { id: 'lo-06-01-2', description: 'Identify why polymorphism is essential in OOP', completed: false },
        { id: 'lo-06-01-3', description: 'Distinguish between compile-time and runtime polymorphism', completed: false },
        { id: 'lo-06-01-4', description: 'Explain how polymorphism enables flexible code design', completed: false },
      ],
      englishExplanation: {
        id: 'ee-06-01',
        text: `Polymorphism is a Greek word meaning "many forms." In Object-Oriented Programming, polymorphism allows a single reference variable to refer to objects of different types, and the correct method is called at runtime based on the actual object type. This is one of the four pillars of OOP alongside encapsulation, inheritance, and abstraction.

The core idea is simple but powerful: a parent class reference can point to a child class object, and when you call a method on that reference, the child class version of the method executes. This means a single method call can behave differently depending on which object it is called on. For example, a Shape reference pointing to a Circle object will call Circle's draw() method, while the same Shape reference pointing to a Rectangle will call Rectangle's draw() method.

Polymorphism eliminates the need for long if-else or switch statements that check object types. Without polymorphism, you would write code like "if object is Circle, do this; if object is Rectangle, do that." With polymorphism, you simply call shape.draw() and the correct version runs automatically.

There are two types of polymorphism in Java: compile-time (also called static or method overloading) and runtime (also called dynamic or method overriding). Compile-time polymorphism is resolved during compilation based on method signatures. Runtime polymorphism is resolved during execution based on the actual object type. Both are essential for writing flexible, maintainable Java programs.

Polymorphism is used extensively in Java frameworks and libraries. The Collections Framework, GUI event handling, and database connectivity all rely heavily on polymorphic behavior. Understanding polymorphism is the key to writing professional-grade Java code.`
      },
      romanUrduExplanation: {
        id: 'ru-06-01',
        text: `Polymorphism ek Greek word hai jiska matlab hai "many forms." Object-Oriented Programming mein, polymorphism ek single reference variable ko different types ke objects ko refer karne deta hai, aur runtime par actual object type ke according sahi method call hota hai. Ye OOP ke four pillars mein se ek hai, encapsulation, inheritance aur abstraction ke saath.

Core idea simple lekin powerful hai: ek parent class reference child class object ko point kar sakta hai, aur jab aap us reference par method call karte hain, toh child class version of the method execute hota hai. Iska matlab hai ke ek hi method call alag-alag objects ke according alag-alag behave kar sakta hai. Jaise, Shape reference jo Circle object ko point karta hai, woh Circle ka draw() method call karega, jabke wahi Shape reference jo Rectangle ko point karta hai, Rectangle ka draw() method call karega.

Polymorphism lambi if-else ya switch statements ki zaroorat khatam karta hai jo object types check karti hain. Bina polymorphism ke, aap aisa code likhte: "aggar object Circle hai, toh ye karo; agar Rectangle hai, toh wo karo." Polymorphism ke saath, aap sirf shape.draw() call karte hain aur sahi version automatic chalta hai.

Java mein polymorphism ke do types hain: compile-time (jise static ya method overloading bhi kehte hain) aur runtime (jise dynamic ya method overriding bhi kehte hain). Compile-time polymorphism compilation ke dauran method signatures ke according resolve hota hai. Runtime polymorphism execution ke dauran actual object type ke according resolve hota hai. Dono flexible, maintainable Java programs likhne ke liye zaroori hain.

Polymorphism Java frameworks aur libraries mein extensively use hota hai. Collections Framework, GUI event handling, aur database connectivity sab polymorphic behavior par heavily depend karte hain. Polymorphism samajhna professional-grade Java code likhne ki key hai.`
      },
      keyPoints: [
        { id: 'kp-06-01-1', title: 'Many Forms', description: 'Polymorphism means "many forms" — one method name can trigger different behaviors depending on the object.' },
        { id: 'kp-06-01-2', title: 'Two Types', description: 'Compile-time polymorphism (overloading) is resolved at compile time. Runtime polymorphism (overriding) is resolved at execution time.' },
        { id: 'kp-06-01-3', title: 'Eliminates Type Checking', description: 'Polymorphism removes the need for long if-else chains that check object types before calling methods.' },
        { id: 'kp-06-01-4', title: 'Parent Reference, Child Object', description: 'A parent class reference can point to any child class object, enabling flexible and extensible code.' },
      ],
      codeExamples: [
        {
          id: 'ce-06-01-1',
          title: 'Polymorphism in Action',
          code: `class Shape {
    void draw() {
        System.out.println("Drawing a generic shape");
    }
}

class Circle extends Shape {
    @Override
    void draw() {
        System.out.println("Drawing a circle");
    }
}

class Rectangle extends Shape {
    @Override
    void draw() {
        System.out.println("Drawing a rectangle");
    }
}

public class Main {
    public static void main(String[] args) {
        Shape s1 = new Circle();     // parent reference, child object
        Shape s2 = new Rectangle();

        s1.draw();  // Drawing a circle
        s2.draw();  // Drawing a rectangle
    }
}`,
          language: 'java',
          output: `Drawing a circle
Drawing a rectangle`,
          explanation: 's1 and s2 are both Shape references, but they point to different child objects. When draw() is called, Java executes the version belonging to the actual object type — Circle or Rectangle. This is runtime polymorphism.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-06-01-1',
          title: 'Payment Processing System',
          scenario: 'An e-commerce platform accepts payments via credit card, PayPal, and bank transfer. Each payment method has a different processPayment() implementation.',
          oopConcept: 'A Payment interface defines processPayment(). CreditCardPayment, PayPalPayment, and BankTransferPayment each implement it differently. The checkout system calls processPayment() on a Payment reference without knowing the concrete type.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-06-01-1',
          title: 'Confusing Overloading with Overriding',
          incorrectCode: `// These are two DIFFERENT concepts
class Calculator {
    int add(int a, int b) { return a + b; }       // overloading
    double add(double a, double b) { return a + b; } // overloading
}
// Overloading = compile-time polymorphism (same class, different signature)
// Overriding = runtime polymorphism (child class, same signature)`,
          correctCode: `// Overriding — child redefines parent method with SAME signature
class Animal {
    void speak() { System.out.println("Animal speaks"); }
}
class Dog extends Animal {
    @Override
    void speak() { System.out.println("Dog barks"); }
}
// Overloading = different signatures, same class
// Overriding = same signature, parent-child relationship`,
          explanation: 'Overloading happens within the same class with different parameter lists. Overriding happens when a child class redefines a parent class method with the exact same signature. They are fundamentally different mechanisms.',
        },
      ],
      examNotes: [
        { id: 'en-06-01-1', title: 'Definition of Polymorphism', content: 'Polymorphism allows one interface to be used for multiple underlying implementations. At runtime, the JVM determines which method to call based on the actual object type, not the reference type.', importance: 'high' },
        { id: 'en-06-01-2', title: 'Two Types', content: 'Compile-time (overloading) resolved by compiler. Runtime (overriding) resolved by JVM at execution. Both are forms of polymorphism.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-06-01-1', question: 'What is polymorphism in OOP?', answer: 'Polymorphism is the ability of an object to take many forms. A parent reference can refer to child objects, and the correct method is called at runtime based on the actual object type.', difficulty: 'easy' },
        { id: 'vq-06-01-2', question: 'What are the two types of polymorphism in Java?', answer: 'Compile-time polymorphism (method overloading) where the compiler resolves which method to call, and runtime polymorphism (method overriding) where the JVM resolves it at execution time.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-06-01-1', type: 'mcq', question: 'What does polymorphism literally mean?', options: ['Single form', 'Many forms', 'No form', 'Hidden form'], correctAnswer: 'Many forms', explanation: 'Polymorphism comes from Greek "poly" (many) and "morph" (form). It means one interface, many implementations.' },
        { id: 'qc-06-01-2', type: 'true-false', question: 'A parent class reference can point to a child class object.', correctAnswer: 'True', explanation: 'True. This is the foundation of runtime polymorphism. Shape s = new Circle() is valid because Circle IS-A Shape.' },
        { id: 'qc-06-01-3', type: 'mcq', question: 'Which type of polymorphism is resolved at runtime?', options: ['Compile-time polymorphism', 'Runtime polymorphism', 'Static polymorphism', 'None'], correctAnswer: 'Runtime polymorphism', explanation: 'Runtime polymorphism (method overriding) is resolved by the JVM during execution based on the actual object type.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-06-01-1',
          scenario: 'A graphics application needs to draw different shapes — circles, triangles, and squares. Currently, the code uses if-else to check shape type before drawing.',
          question: 'How does polymorphism improve this design?',
          type: 'design-decision',
          options: [
            'Replace if-else with a single draw() call on a Shape reference — the correct version executes automatically',
            'Add more if-else conditions for new shapes',
            'Create separate drawCircle(), drawTriangle() methods',
            'Use switch statements instead of if-else',
          ],
          correctAnswer: 'Replace if-else with a single draw() call on a Shape reference — the correct version executes automatically',
          explanation: 'Polymorphism eliminates type-checking code. Shape s = new Circle(); s.draw() automatically calls Circle.draw(). Adding new shapes requires only a new class, not modifying existing code.',
          relatedConcepts: ['polymorphism', 'method-overriding', 'open-closed-principle'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-polymorphism-intro',
      prerequisites: ['lesson-01-03', 'lesson-05-01'],
      xpReward: 50,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'polymorphism-concept',
      difficulty: 'easy',
      estimatedMinutes: 15,
    },
    {
      id: 'lesson-06-02',
      moduleId: 'module-06',
      title: 'Compile-Time Polymorphism',
      slug: 'compile-time-polymorphism',
      order: 2,
      duration: 18,
      description: 'Understand compile-time polymorphism through method overloading — how Java selects the correct method based on parameter matching during compilation.',
      learningObjectives: [
        { id: 'lo-06-02-1', description: 'Explain how compile-time polymorphism works', completed: false },
        { id: 'lo-06-02-2', description: 'Create overloaded methods with different parameter lists', completed: false },
        { id: 'lo-06-02-3', description: 'Understand how the compiler resolves overloaded method calls', completed: false },
        { id: 'lo-06-02-4', description: 'Differentiate between overloading and overriding', completed: false },
      ],
      englishExplanation: {
        id: 'ee-06-02',
        text: `Compile-time polymorphism, also known as method overloading, occurs when multiple methods in the same class share the same name but have different parameter lists. The Java compiler determines which method to call based on the number, types, and order of arguments passed. This resolution happens during compilation, hence the name "compile-time" polymorphism.

When you write System.out.println(42) and System.out.println("Hello"), Java calls different versions of println — one for int and one for String. This is method overloading in action. The method name is the same, but the parameter types differ, so the compiler selects the correct version.

Method overloading is a powerful tool for creating consistent, readable APIs. Instead of having methods named printInt, printString, printDouble, you can have a single overloaded print method that handles all types. This makes the API more intuitive and easier to use.

The key rules for method overloading: methods must have the same name, different parameter lists (different number of parameters, different types, or different order of types), and overloading is NOT determined by return type alone. Two methods with the same parameters but different return types will cause a compilation error.

Compile-time polymorphism is resolved by the compiler through a process called method invocation matching. The compiler looks at the method call, examines the arguments, and finds the best match among all methods with that name in the class. If an exact match is not found, the compiler attempts to find the closest compatible match through widening conversions.`
      },
      romanUrduExplanation: {
        id: 'ru-06-02',
        text: `Compile-time polymorphism, jise method overloading bhi kehte hain, tab hota hai jab ek hi class mein multiple methods ka same naam ho lekin different parameter lists hon. Java compiler arguments ke number, types aur order ke according determine karta hai ke kaunsa method call hona chahiye. Ye resolution compilation ke dauran hota hai, isliye ise "compile-time" polymorphism kehte hain.

Jab aap System.out.println(42) aur System.out.println("Hello") likhte hain, Java alag-alag versions of println call karta hai — ek int ke liye aur ek String ke liye. Ye method overloading ka example hai. Method name same hai, lekin parameter types alag hain, toh compiler sahi version select karta hai.

Method overloading consistent, readable APIs create karne ka powerful tool hai. Alag-alag methods rakhne ki bajaye printInt, printString, printDouble, aap ek overloaded print method rakh sakte hain jo sab types handle kare. Ye API ko zyada intuitive aur easy to use banata hai.

Method overloading ke key rules: methods ka same naam hona chahiye, different parameter lists honi chahiye (different number of parameters, different types, ya different order of types), aur overloading sirf return type ke basis par determine nahi hota. Agar do methods same parameters hon lekin different return types hon, toh compilation error aayega.

Compile-time polymorphism compiler ke through ek process se resolve hota hai jise method invocation matching kehte hain. Compiler method call dekhta hai, arguments examine karta hai, aur us name ke sab methods mein se best match dhoondta hai. Agar exact match na mile, toh compiler widening conversions ke through closest compatible match dhoondne ki koshish karta hai.`
      },
      keyPoints: [
        { id: 'kp-06-02-1', title: 'Same Name, Different Parameters', description: 'Overloaded methods share the same name but must differ in parameter count, types, or order.' },
        { id: 'kp-06-02-2', title: 'Compiler Resolves', description: 'The compiler selects the correct method at compile time based on the arguments at the call site.' },
        { id: 'kp-06-02-3', title: 'Return Type Does Not Count', description: 'Two methods with identical parameters but different return types cause a compilation error.' },
        { id: 'kp-06-02-4', title: 'Same Class Only', description: 'Method overloading occurs within the same class (or inherited methods in the same class hierarchy).' },
      ],
      codeExamples: [
        {
          id: 'ce-06-02-1',
          title: 'Method Overloading Examples',
          code: `class Printer {
    void print(int value) {
        System.out.println("Printing int: " + value);
    }

    void print(String value) {
        System.out.println("Printing String: " + value);
    }

    void print(double value) {
        System.out.println("Printing double: " + value);
    }

    void print(String value, int times) {
        for (int i = 0; i < times; i++) {
            System.out.println(value);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Printer p = new Printer();
        p.print(42);           // calls print(int)
        p.print("Hello");      // calls print(String)
        p.print(3.14);         // calls print(double)
        p.print("Hi", 2);     // calls print(String, int)
    }
}`,
          language: 'java',
          output: `Printing int: 42
Printing String: Hello
Printing double: 3.14
Hi
Hi`,
          explanation: 'The Printer class has four overloaded print() methods. The compiler selects the correct one based on the argument types and count at each call site.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-06-02-1',
          title: 'Java Math Class',
          scenario: 'The Java Math class uses method overloading extensively. Math.max(int, int), Math.max(long, long), and Math.max(double, double) all share the same name.',
          oopConcept: 'The compiler selects the correct max() based on the argument types. Calling Math.max(5, 10) uses the int version, while Math.max(5.0, 10.0) uses the double version.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-06-02-1',
          title: 'Trying to Overload by Return Type Only',
          incorrectCode: `class Demo {
    int calculate(int x) { return x * 2; }
    double calculate(int x) { return x * 2.0; }  // ERROR!
}
// Compiler error: method calculate(int) is already defined`,
          correctCode: `class Demo {
    int calculate(int x) { return x * 2; }
    double calculate(double x) { return x * 2.0; }  // OK - different parameter type
}
// Overloading requires DIFFERENT parameters, not just different return types`,
          explanation: 'Java determines which method to call based on parameter types. If two methods have the same parameter types, the compiler cannot distinguish them regardless of return type. This causes a compilation error.',
        },
      ],
      examNotes: [
        { id: 'en-06-02-1', title: 'Overloading Rules', content: 'Methods must differ in: number of parameters, types of parameters, or order of parameter types. Return type alone cannot distinguish overloaded methods.', importance: 'high' },
        { id: 'en-06-02-2', title: 'Resolution Process', content: 'The compiler uses method invocation matching: exact match first, then widening conversions, then autoboxing. Ambiguity causes compilation error.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-06-02-1', question: 'What is compile-time polymorphism?', answer: 'Compile-time polymorphism is method overloading where the compiler resolves which method to call based on the parameter list at compile time.', difficulty: 'easy' },
        { id: 'vq-06-02-2', question: 'Can two methods with the same name but different return types be overloaded?', answer: 'No, if they have the same parameter list. Return type alone cannot distinguish overloaded methods. The compiler needs different parameter types, count, or order.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-06-02-1', type: 'mcq', question: 'How does Java resolve compile-time polymorphism?', options: ['At runtime using object type', 'At compile time using parameter list', 'Using return type', 'Using access modifiers'], correctAnswer: 'At compile time using parameter list', explanation: 'The compiler examines the arguments at the call site and matches them to the correct overloaded method signature.' },
        { id: 'qc-06-02-2', type: 'true-false', question: 'Overloading requires different parameter lists.', correctAnswer: 'True', explanation: 'Methods with the same name must differ in parameter count, types, or order. Same parameters with different return types cause an error.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-06-02-1',
          scenario: 'You are designing a Calculator class. You want it to add two integers, two doubles, and three integers.',
          question: 'How would you implement this using overloading?',
          type: 'design-decision',
          options: [
            'Create add(int,int), add(double,double), and add(int,int,int) — same name, different parameter lists',
            'Create addInts(), addDoubles(), addThreeInts() — different names',
            'Create one add() method that uses instanceof to check types',
            'Use a single add() with Object parameter',
          ],
          correctAnswer: 'Create add(int,int), add(double,double), and add(int,int,int) — same name, different parameter lists',
          explanation: 'Method overloading lets you use the same method name with different parameter lists. The compiler selects the correct version based on the arguments passed.',
          relatedConcepts: ['method-overloading', 'compile-time-polymorphism'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-overloading',
      prerequisites: ['lesson-06-01'],
      xpReward: 60,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'method-overloading',
      difficulty: 'easy',
      estimatedMinutes: 18,
    },
    {
      id: 'lesson-06-03',
      moduleId: 'module-06',
      title: 'Method Overloading Rules',
      slug: 'method-overloading-rules',
      order: 3,
      duration: 18,
      description: 'Learn the precise rules governing method overloading: parameter count, types, order, varargs, and common ambiguity pitfalls.',
      learningObjectives: [
        { id: 'lo-06-03-1', description: 'Apply all four ways to overload a method', completed: false },
        { id: 'lo-06-03-2', description: 'Understand how varargs interact with overloading', completed: false },
        { id: 'lo-06-03-3', description: 'Identify and resolve ambiguous overloaded methods', completed: false },
        { id: 'lo-06-03-4', description: 'Know when overloading is not possible', completed: false },
      ],
      englishExplanation: {
        id: 'ee-06-03',
        text: `There are exactly four ways to create overloaded methods in Java. Mastering these rules prevents compilation errors and ambiguous method calls.

**Rule 1: Different Number of Parameters.** The simplest form of overloading. A method with two parameters and a method with three parameters are clearly different, even if they share the same name.

**Rule 2: Different Types of Parameters.** Two methods with the same number of parameters but different types are overloaded. For example, process(int x) and process(String x) are different methods.

**Rule 3: Different Order of Parameter Types.** If parameters differ in order, methods are overloaded. For example, sort(int a, String b) and sort(String a, int b) are distinct methods.

**Rule 4: Varargs.** Variable arguments (varargs) allow a method to accept zero or more arguments of a specified type. A method with varargs can coexist with a fixed-parameter method, but the compiler may become ambiguous if both could match a call.

Important exceptions: changing only the return type does NOT create overloading. Changing only the access modifier does NOT create overloading. Changing only the exception list does NOT create overloading. Only parameter list changes count.

Ambiguity occurs when a method call could match multiple overloaded methods equally well. For example, if you have print(int x) and print(double x), calling print(5) matches print(int) exactly. But if you have print(int x, double y) and print(double x, int y), calling print(5, 5) is ambiguous — both match equally well with widening. The compiler will report an error.

The compiler follows a strict resolution order: exact match > widening > autoboxing > varargs. If multiple methods match at the same level, ambiguity is declared.`
      },
      romanUrduExplanation: {
        id: 'ru-06-03',
        text: `Java mein overloaded methods banane ke exactly char tarike hain. In rules ko master karna compilation errors aur ambiguous method calls se bachata hai.

**Rule 1: Different Number of Parameters.** Overloading ka sabse simple form. Do parameters wala method aur teen parameters wala method clearly different hain, chahe same naam hon.

**Rule 2: Different Types of Parameters.** Same number of parameters lekin different types ke do methods overloaded hain. Jaise, process(int x) aur process(String x) alag methods hain.

**Rule 3: Different Order of Parameter Types.** Agar parameters ka order alag ho, toh methods overloaded hain. Jaise, sort(int a, String b) aur sort(String a, int b) alag methods hain.

**Rule 4: Varargs.** Variable arguments (varargs) ek method ko zero ya zyada arguments accept karne dete hain. Varargs wala method fixed-parameter method ke saath coexist kar sakta hai, lekin agar dono match kar saken toh compiler ambiguous ho sakta hai.

Important exceptions: sirf return type change karne se overloading nahi hoti. Sirf access modifier change karne se overloading nahi hoti. Sirf exception list change karne se overloading nahi hoti. Sirf parameter list changes count karti hain.

Ambiguity tab hoti hai jab ek method call equally well multiple overloaded methods se match ho sake. Jaise, agar aapke paas print(int x) aur print(double x) hain, toh print(5) print(int) se exactly match hota hai. Lekin agar print(int x, double y) aur print(double x, int y) hain, toh print(5, 5) ambiguous hai — dono equally well match hote hain widening ke saath. Compiler error dega.

Compiler strict resolution order follow karta hai: exact match > widening > autoboxing > varargs. Agar ek hi level par multiple methods match hon, toh ambiguity declare hoti hai.`
      },
      keyPoints: [
        { id: 'kp-06-03-1', title: 'Four Ways to Overload', description: 'Different count, different types, different order, or varargs. These are the only valid overloading mechanisms.' },
        { id: 'kp-06-03-2', title: 'What Does NOT Count', description: 'Return type, access modifier, and exception list changes do NOT create overloading. Only parameter list matters.' },
        { id: 'kp-06-03-3', title: 'Ambiguity Error', description: 'When a call matches multiple overloaded methods equally well, the compiler reports an ambiguity error.' },
        { id: 'kp-06-03-4', title: 'Resolution Order', description: 'Exact match > widening conversion > autoboxing > varargs. The compiler picks the best match at each level.' },
      ],
      codeExamples: [
        {
          id: 'ce-06-03-1',
          title: 'All Four Overloading Mechanisms',
          code: `class OverloadDemo {
    // Rule 1: Different number of parameters
    void display(int a) {
        System.out.println("One param: " + a);
    }

    void display(int a, int b) {
        System.out.println("Two params: " + a + ", " + b);
    }

    // Rule 2: Different types of parameters
    void show(int x) {
        System.out.println("Int: " + x);
    }

    void show(String x) {
        System.out.println("String: " + x);
    }

    // Rule 3: Different order of parameter types
    void sort(int a, String b) {
        System.out.println("int, String");
    }

    void sort(String a, int b) {
        System.out.println("String, int");
    }

    // Rule 4: Varargs
    void sum(int... numbers) {
        int total = 0;
        for (int n : numbers) total += n;
        System.out.println("Sum: " + total);
    }
}

public class Main {
    public static void main(String[] args) {
        OverloadDemo d = new OverloadDemo();
        d.display(5);          // One param: 5
        d.display(5, 10);      // Two params: 5, 10
        d.show(42);            // Int: 42
        d.show("Hi");          // String: Hi
        d.sort(1, "a");        // int, String
        d.sort("a", 1);        // String, int
        d.sum(1, 2, 3);        // Sum: 6
        d.sum();               // Sum: 0
    }
}`,
          language: 'java',
          output: `One param: 5
Two params: 5, 10
Int: 42
String: Hi
int, String
String, int
Sum: 6
Sum: 0`,
          explanation: 'This demonstrates all four ways to overload methods. Each method has the same name but a unique parameter signature.',
        },
        {
          id: 'ce-06-03-2',
          title: 'Ambiguity Pitfall',
          code: `class Ambiguous {
    // These two methods create ambiguity
    void process(int a, double b) {
        System.out.println("int, double");
    }

    void process(double a, int b) {
        System.out.println("double, int");
    }
}

public class Main {
    public static void main(String[] args) {
        Ambiguous obj = new Ambiguous();
        obj.process(5, 10);  // COMPILE ERROR: ambiguous call
        // Both process(int, double) and process(double, int)
        // match equally well with widening
    }
}`,
          language: 'java',
          explanation: 'Calling process(5, 10) is ambiguous because both methods match equally well: 5 widens to double in the first, or 10 widens to double in the second. The compiler cannot decide.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-06-03-1',
          title: 'Java Constructors',
          scenario: 'Constructors are commonly overloaded. A Student class might have Student(), Student(String name), and Student(String name, int age).',
          oopConcept: 'Each constructor has a different parameter list. The compiler selects the correct constructor based on the arguments provided during object creation.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-06-03-1',
          title: 'Relying on Return Type for Overloading',
          incorrectCode: `class Bad {
    int getValue() { return 1; }
    String getValue() { return "hello"; }  // ERROR!
}
// Compilation error: method getValue() is already defined`,
          correctCode: `class Good {
    int getIntValue() { return 1; }
    String getStringValue() { return "hello"; }  // OK: different names
}
// Or use parameters to differentiate:
class Better {
    int getValue(int x) { return x; }
    String getValue(String x) { return x; }  // OK: different parameters
}`,
          explanation: 'Return type alone cannot distinguish methods. The compiler needs to resolve the method at compile time based on the call site, and return type is not part of that resolution.',
        },
      ],
      examNotes: [
        { id: 'en-06-03-1', title: 'Four Overloading Rules', content: 'Different count, different types, different order, varargs. Memorize these four. Return type and access modifiers do NOT count.', importance: 'high' },
        { id: 'en-06-03-2', title: 'Ambiguity Resolution', content: 'If a call matches multiple methods equally, compiler reports error. Fix by making parameter lists more specific or renaming methods.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-06-03-1', question: 'List the four ways to overload a method.', answer: 'Different number of parameters, different types of parameters, different order of parameter types, and varargs.', difficulty: 'easy' },
        { id: 'vq-06-03-2', question: 'What happens if a method call matches two overloaded methods equally?', answer: 'The compiler reports an ambiguity error. The programmer must resolve it by making parameters more specific or renaming methods.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-06-03-1', type: 'mcq', question: 'Which of these does NOT create a valid overload?', options: ['Different parameter count', 'Different parameter types', 'Different return type only', 'Different parameter order'], correctAnswer: 'Different return type only', explanation: 'Return type alone cannot distinguish overloaded methods. Only parameter list changes create valid overloads.' },
        { id: 'qc-06-03-2', type: 'true-false', question: 'Varargs can be used in overloaded methods.', correctAnswer: 'True', explanation: 'Varargs (int... numbers) can coexist with fixed-parameter methods, but care must be taken to avoid ambiguity.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-06-03-1',
          scenario: 'You have a method process(int a, double b) and process(double a, int b). A colleague calls process(1, 2) and gets a compilation error.',
          question: 'Why does this happen and how do you fix it?',
          type: 'debugging',
          options: [
            'The call is ambiguous — both methods match equally. Fix by casting: process((int)1, (double)2)',
            'The method names are different — use the same name',
            'Varargs are needed — change parameters to varargs',
            'The return types are wrong — fix return types',
          ],
          correctAnswer: 'The call is ambiguous — both methods match equally. Fix by casting: process((int)1, (double)2)',
          explanation: 'Both methods match process(1, 2) equally through widening. Explicit casting tells the compiler which version to use.',
          relatedConcepts: ['method-overloading', 'ambiguity', 'widening'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-overloading-rules',
      prerequisites: ['lesson-06-02'],
      xpReward: 60,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'overloading-rules',
      difficulty: 'medium',
      estimatedMinutes: 18,
    },
    {
      id: 'lesson-06-04',
      moduleId: 'module-06',
      title: 'Runtime Polymorphism',
      slug: 'runtime-polymorphism',
      order: 4,
      duration: 20,
      description: 'Understand runtime polymorphism through method overriding and dynamic method dispatch — how Java selects the correct method at execution time.',
      learningObjectives: [
        { id: 'lo-06-04-1', description: 'Explain runtime polymorphism and method overriding', completed: false },
        { id: 'lo-06-04-2', description: 'Understand dynamic method dispatch', completed: false },
        { id: 'lo-06-04-3', description: 'Create child class methods that override parent methods', completed: false },
        { id: 'lo-06-04-4', description: 'Explain why runtime polymorphism is more powerful than compile-time', completed: false },
      ],
      englishExplanation: {
        id: 'ee-06-04',
        text: `Runtime polymorphism, also known as dynamic method dispatch, is the mechanism by which Java determines which overridden method to call at execution time, not at compile time. This is the more powerful and commonly used form of polymorphism.

When a parent class reference points to a child class object, and an overridden method is called on that reference, the JVM looks at the actual object type (not the reference type) and invokes the matching method. This decision happens at runtime, which is why it is called runtime polymorphism.

The process works like this: Shape s = new Circle(); s.draw(); The reference type is Shape, but the actual object is Circle. When s.draw() is called, the JVM checks the actual object type (Circle) and calls Circle.draw(), not Shape.draw(). This is called dynamic method dispatch.

Runtime polymorphism enables writing code that works with the parent type but behaves correctly for any child type. A method that accepts a Shape parameter can process Circle, Rectangle, Triangle, or any future Shape subclass without modification. This follows the Open-Closed Principle — open for extension, closed for modification.

The JVM implements dynamic dispatch using a mechanism called virtual method invocation. When compiling, the compiler cannot determine which method will be called because it depends on the runtime object type. Instead, the JVM maintains a method lookup table (virtual method table or vtable) for each class that maps method signatures to their implementations. At runtime, the JVM uses this table to find and invoke the correct method.

Runtime polymorphism is the foundation of many Java design patterns and frameworks. It allows code to be written against abstractions rather than concrete implementations, making the system flexible and extensible.`
      },
      romanUrduExplanation: {
        id: 'ru-06-04',
        text: `Runtime polymorphism, jise dynamic method dispatch bhi kehte hain, wo mechanism hai jisme Java execution time par determine karta hai ke kaunsa overridden method call hona chahiye, compile time par nahi. Ye zyada powerful aur commonly used form of polymorphism hai.

Jab ek parent class reference child class object ko point karta hai, aur us reference par ek overridden method call hota hai, toh JVM actual object type dekhta hai (reference type nahi) aur matching method invoke karta hai. Ye decision runtime par hota hai, isliye ise runtime polymorphism kehte hain.

Process aise kaam karta hai: Shape s = new Circle(); s.draw(); Reference type Shape hai, lekin actual object Circle hai. Jab s.draw() call hota hai, toh JVM actual object type (Circle) check karta hai aur Circle.draw() call karta hai, Shape.draw() nahi. Isse dynamic method dispatch kehte hain.

Runtime polymorphism aise code likhne enable karta hai jo parent type ke saath kaam kare lekin har child type ke liye sahi behave kare. Ek method jo Shape parameter accept kare, Circle, Rectangle, Triangle, ya koi bhi future Shape subclass ko bina change ke process kar sakta hai. Ye Open-Closed Principle follow karta hai — extension ke liye open, modification ke liye closed.

JVM virtual method invocation naam ke mechanism se dynamic dispatch implement karta hai. Compile ke dauran, compiler determine nahi kar sakta ke kaunsa method call hoga kyunki ye runtime object type par depend karta hai. Iski bajaye, JVM har class ke liye ek method lookup table (virtual method table ya vtable) maintain karta hai jo method signatures ko unke implementations se map karta hai. Runtime par, JVM is table ka use karke sahi method dhoondhta aur invoke karta hai.

Runtime polymorphism kai Java design patterns aur frameworks ka foundation hai. Ye code ko abstractions ke against likhne deta hai concrete implementations ke bajaye, system ko flexible aur extensible banata hai.`
      },
      keyPoints: [
        { id: 'kp-06-04-1', title: 'JVM Resolves at Runtime', description: 'The actual method called depends on the object type at execution time, not the reference type known at compile time.' },
        { id: 'kp-06-04-2', title: 'Dynamic Method Dispatch', description: 'The JVM dynamically selects the overridden method based on the actual object type during execution.' },
        { id: 'kp-06-04-3', title: 'Parent Reference, Child Behavior', description: 'A parent reference can hold any child object, and calling an overridden method invokes the child version.' },
        { id: 'kp-06-04-4', title: 'Virtual Method Table', description: 'The JVM uses a vtable to look up the correct method implementation at runtime for each class hierarchy.' },
      ],
      codeExamples: [
        {
          id: 'ce-06-04-1',
          title: 'Dynamic Method Dispatch',
          code: `class Animal {
    void speak() {
        System.out.println("Animal makes a sound");
    }

    void eat() {
        System.out.println("Animal eats food");
    }
}

class Dog extends Animal {
    @Override
    void speak() {
        System.out.println("Dog barks: Woof! Woof!");
    }
}

class Cat extends Animal {
    @Override
    void speak() {
        System.out.println("Cat meows: Meow!");
    }

    @Override
    void eat() {
        System.out.println("Cat eats fish");
    }
}

class Cow extends Animal {
    @Override
    void speak() {
        System.out.println("Cow moos: Moo!");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal a1 = new Dog();
        Animal a2 = new Cat();
        Animal a3 = new Cow();

        a1.speak();  // Dog barks: Woof! Woof!
        a2.speak();  // Cat meows: Meow!
        a3.speak();  // Cow moos: Moo!

        a1.eat();    // Animal eats food (Dog does not override eat)
        a2.eat();    // Cat eats fish (Cat overrides eat)
    }
}`,
          language: 'java',
          output: `Dog barks: Woof! Woof!
Cat meows: Meow!
Cow moos: Moo!
Animal eats food
Cat eats fish`,
          explanation: 'All three references are of type Animal, but they point to Dog, Cat, and Cow objects respectively. The JVM selects the overridden method based on the actual object type. Dog does not override eat(), so it uses the Animal version.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-06-04-1',
          title: 'Database Connection System',
          scenario: 'A system needs to support MySQL, PostgreSQL, and Oracle databases. Each has a different query execution mechanism.',
          oopConcept: 'A DatabaseConnection abstract class defines executeQuery(). MySQLConnection, PostgreSQLConnection, and OracleConnection each override it. The application code works with DatabaseConnection references, and the correct database-specific method runs at runtime.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-06-04-1',
          title: 'Expecting Overloaded Methods to Override',
          incorrectCode: `class Parent {
    void display(int x) { System.out.println("Parent int: " + x); }
}

class Child extends Parent {
    void display(String x) { System.out.println("Child String: " + x); }
}
// This is NOT overriding — it is overloading (different parameter type)`,
          correctCode: `class Parent {
    void display(int x) { System.out.println("Parent: " + x); }
}

class Child extends Parent {
    @Override
    void display(int x) { System.out.println("Child: " + x); }
}
// This IS overriding — same method signature, parent-child relationship`,
          explanation: 'Overloading happens in the same class with different parameters. Overriding happens in child class with the SAME parameters. The Child example above adds a new overloaded method, it does not override the parent method.',
        },
      ],
      examNotes: [
        { id: 'en-06-04-1', title: 'Runtime vs Compile-time', content: 'Runtime polymorphism (overriding) is resolved by JVM at execution. Compile-time (overloading) is resolved by compiler. Runtime is more flexible and widely used.', importance: 'high' },
        { id: 'en-06-04-2', title: 'Dynamic Dispatch', content: 'The JVM uses virtual method tables (vtables) to resolve overridden method calls at runtime based on actual object type.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-06-04-1', question: 'What is dynamic method dispatch?', answer: 'Dynamic method dispatch is the mechanism where the JVM determines which overridden method to call at runtime based on the actual object type, not the reference type.', difficulty: 'medium' },
        { id: 'vq-06-04-2', question: 'Why is runtime polymorphism more powerful than compile-time polymorphism?', answer: 'Runtime polymorphism works with any child class automatically, enabling extensible code. Compile-time polymorphism is limited to methods defined at compile time.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-06-04-1', type: 'mcq', question: 'When is the overridden method selected in runtime polymorphism?', options: ['At compile time', 'At runtime by the JVM', 'At class loading', 'At program start'], correctAnswer: 'At runtime by the JVM', explanation: 'The JVM examines the actual object type at execution time and invokes the matching overridden method.' },
        { id: 'qc-06-04-2', type: 'true-false', question: 'A parent reference can only point to parent class objects.', correctAnswer: 'False', explanation: 'A parent reference can point to any child class object. This is the basis of runtime polymorphism.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-06-04-1',
          scenario: 'You have a list of Shape objects containing Circle, Rectangle, and Triangle instances. You need to draw all of them.',
          question: 'How does runtime polymorphism simplify this?',
          type: 'concept-application',
          options: [
            'Loop through the list and call draw() on each — the correct version executes for each object type',
            'Check each object type with instanceof before calling draw',
            'Create separate methods: drawCircle(), drawRectangle(), drawTriangle()',
            'Use type casting to call the correct method manually',
          ],
          correctAnswer: 'Loop through the list and call draw() on each — the correct version executes for each object type',
          explanation: 'Runtime polymorphism means you can call draw() on any Shape reference without knowing the concrete type. The JVM resolves the correct method at runtime.',
          relatedConcepts: ['runtime-polymorphism', 'dynamic-dispatch', 'method-overriding'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-runtime-polymorphism',
      prerequisites: ['lesson-06-01', 'lesson-05-01'],
      xpReward: 70,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'dynamic-dispatch',
      difficulty: 'medium',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-06-05',
      moduleId: 'module-06',
      title: 'The @Override Annotation',
      slug: 'override-annotation',
      order: 5,
      duration: 15,
      description: 'Learn the purpose of the @Override annotation, how it provides compile-time safety for method overriding, and best practices for using it.',
      learningObjectives: [
        { id: 'lo-06-05-1', description: 'Explain the purpose and benefits of @Override', completed: false },
        { id: 'lo-06-05-2', description: 'Use @Override to verify correct method overriding', completed: false },
        { id: 'lo-06-05-3', description: 'Identify what happens when @Override is used incorrectly', completed: false },
        { id: 'lo-06-05-4', description: 'Apply best practices for @Override usage', completed: false },
      ],
      englishExplanation: {
        id: 'ee-06-05',
        text: `The @Override annotation is a compile-time safety mechanism that tells the compiler "this method is intended to override a method from the parent class." If the method signature does not exactly match any parent class method, the compiler generates an error. This prevents subtle bugs caused by typos or incorrect parameter types.

Without @Override, if you misspell the method name or get the parameter types wrong, Java silently creates a new overloaded method instead of overriding the parent method. This can lead to hard-to-find bugs because the program compiles and runs, but the expected polymorphic behavior does not occur. The parent method is called instead of the intended child method.

Using @Override is considered a best practice in Java development. It makes the code self-documenting — a reader immediately knows this method replaces a parent class method. It also catches errors at compile time rather than at runtime. Many Java style guides and code quality tools recommend or enforce @Override on all overriding methods.

The annotation is placed on the method declaration line, directly before the return type. It is not required by the Java language, but it is strongly recommended. The compiler treats it as documentation and verification combined.

@Override can be used on methods overriding methods from the direct parent class or from any ancestor class in the hierarchy. It can also be used when implementing interface methods, though this was only allowed starting from Java 6.`
      },
      romanUrduExplanation: {
        id: 'ru-06-05',
        text: `@Override annotation ek compile-time safety mechanism hai jo compiler ko batata hai ke "ye method parent class ke method ko override karne ke liye hai." Agar method signature parent class ke kisi bhi method se exactly match nahi karta, toh compiler error generate karta hai. Ye typos ya galat parameter types ki wajah se hone wale subtle bugs ko rokta hai.

Bina @Override ke, agar aap method name misspell kar dein ya galat parameter types likh dein, toh Java chupke se naya overloaded method create karta hai parent method ko override kiye bajaye. Isse hard-to-find bugs ho sakte hain kyunki program compile aur run hota hai, lekin expected polymorphic behavior nahi hota. Parent method intended child method ki bajaye call hota hai.

@Override ka use Java development mein best practice mana jata hai. Ye code ko self-documenting banata hai — reader ko turant pata chalta hai ke ye method parent class method ko replace karta hai. Ye errors ko runtime ki bajaye compile time par pakad leta hai. Kai Java style guides aur code quality tools @Override ko enforce ya recommend karte hain.

Ye annotation method declaration line par lagaya jata hai, return type ke seedha pehle. Ye Java language ki zaroorat nahi hai, lekin strongly recommended hai. Compiler ise documentation aur verification ke taur par treat karta hai.

@Override direct parent class se ya hierarchy mein kisi bhi ancestor class ke methods ko override karne par use kiya ja sakta hai. Ye interface methods implement karne par bhi use kiya ja sakta hai, lekin ye Java 6 se allow hua hai.`
      },
      keyPoints: [
        { id: 'kp-06-05-1', title: 'Compile-Time Safety', description: '@Override causes a compilation error if the method does not actually override a parent method, catching typos and signature mismatches.' },
        { id: 'kp-06-05-2', title: 'Self-Documenting', description: '@Override makes the code self-documenting — readers immediately know this method replaces a parent class method.' },
        { id: 'kp-06-05-3', title: 'Prevents Silent Overloading', description: 'Without @Override, a misspelled method creates a new overloaded method instead of overriding, causing silent bugs.' },
        { id: 'kp-06-05-4', title: 'Best Practice', description: 'Always use @Override when overriding methods. It is recommended by all major Java style guides and caught by static analysis tools.' },
      ],
      codeExamples: [
        {
          id: 'ce-06-05-1',
          title: '@Override Prevents Bugs',
          code: `class Vehicle {
    void startEngine() {
        System.out.println("Vehicle engine started");
    }
}

class Car extends Vehicle {
    @Override  // compiler verifies this actually overrides a parent method
    void startEngine() {
        System.out.println("Car engine started with key");
    }

    // Without @Override, this typo would silently create a NEW method
    // @Override
    // void startEngin() {  // typo! But without @Override, compiler allows it
    //     System.out.println("Car engine started");
    // }
    // Now calling startEngine() on a Car reference calls the PARENT version!
}

public class Main {
    public static void main(String[] args) {
        Car c = new Car();
        c.startEngine();  // Car engine started with key
    }
}`,
          language: 'java',
          output: 'Car engine started with key',
          explanation: '@Override ensures that the method signature matches the parent. If startEngin() (typo) were used without @Override, it would silently create a new method, and startEngine() would fall back to the parent version.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-06-05-1',
          title: 'Implementing Interface Methods',
          scenario: 'When implementing the Comparable interface, you override compareTo(). Using @Override ensures you got the signature right.',
          oopConcept: '@Override verifies that compareTo(Object) matches the interface contract. Without it, a signature mistake would silently create an overloaded method.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-06-05-1',
          title: 'Forgetting @Override on Overriding Methods',
          incorrectCode: `class Animal {
    void speak() { System.out.println("..."); }
}
class Dog extends Animal {
    void speak() { System.out.println("Woof!"); }  // works, but risky
    // No @Override — if you made a typo, it would silently create a new method
}`,
          correctCode: `class Animal {
    void speak() { System.out.println("..."); }
}
class Dog extends Animal {
    @Override
    void speak() { System.out.println("Woof!"); }  // safe and documented
    // @Override catches typos at compile time
}`,
          explanation: 'Without @Override, a typo in the method name would silently create a new method instead of overriding. @Override catches this at compile time.',
        },
      ],
      examNotes: [
        { id: 'en-06-05-1', title: '@Override Purpose', content: '@Override tells the compiler to verify the method actually overrides a parent method. It prevents silent creation of new methods due to typos.', importance: 'high' },
        { id: 'en-06-05-2', title: 'Not Required But Recommended', content: '@Override is optional in Java but is a universal best practice. Many tools warn when it is missing on overriding methods.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-06-05-1', question: 'What is the purpose of @Override annotation?', answer: '@Override tells the compiler to verify that the method actually overrides a method from a parent class. If the method signature does not match any parent method, a compilation error occurs.', difficulty: 'easy' },
        { id: 'vq-06-05-2', question: 'What happens if you override a method without @Override?', answer: 'The code compiles and works, but if you make a typo in the method name or parameters, Java silently creates a new method instead of overriding, causing a subtle bug.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-06-05-1', type: 'mcq', question: 'What does @Override do?', options: ['Changes the method to final', 'Verifies the method actually overrides a parent method', 'Makes the method abstract', 'Increases method priority'], correctAnswer: 'Verifies the method actually overrides a parent method', explanation: '@Override causes a compile error if the method does not match any parent class method signature.' },
        { id: 'qc-06-05-2', type: 'true-false', question: '@Override is mandatory in Java for overriding methods.', correctAnswer: 'False', explanation: '@Override is optional but strongly recommended. Java works without it, but it prevents bugs from typos.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-06-05-1',
          scenario: 'A developer writes a method toString() in their class but forgets @Override. The method works correctly. Another developer then changes the parent class method signature.',
          question: 'What problem could this cause?',
          type: 'debugging',
          options: [
            'The method no longer overrides the parent method, causing unexpected behavior — @Override would have caught this at compile time',
            'The program crashes immediately',
            'Nothing — methods always override regardless of signature',
            'The parent method is automatically updated',
          ],
          correctAnswer: 'The method no longer overrides the parent method, causing unexpected behavior — @Override would have caught this at compile time',
          explanation: 'Without @Override, a signature change in the parent silently breaks the override. The child method becomes an independent overloaded method. @Override would have caught this mismatch at compile time.',
          relatedConcepts: ['override-annotation', 'method-overriding', 'compile-time-safety'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-override-annotation',
      prerequisites: ['lesson-06-04'],
      xpReward: 50,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'override-annotation',
      difficulty: 'easy',
      estimatedMinutes: 15,
    },
    {
      id: 'lesson-06-06',
      moduleId: 'module-06',
      title: 'Upcasting and Downcasting',
      slug: 'upcasting-and-downcasting',
      order: 6,
      duration: 18,
      description: 'Understand implicit upcasting (widening) and explicit downcasting (narrowing) of object references, and the risks of ClassCastException.',
      learningObjectives: [
        { id: 'lo-06-06-1', description: 'Explain upcasting and when it happens automatically', completed: false },
        { id: 'lo-06-06-2', description: 'Explain downcasting and when it requires explicit casting', completed: false },
        { id: 'lo-06-06-3', description: 'Understand what ClassCastException is and when it occurs', completed: false },
        { id: 'lo-06-06-4', description: 'Apply safe casting practices in inheritance hierarchies', completed: false },
      ],
      englishExplanation: {
        id: 'ee-06-06',
        text: `Upcasting is the process of casting a child class reference to a parent class type. This happens implicitly (automatically) because every child IS-A parent. For example, Shape s = new Circle(); is an upcast — Circle (child) is assigned to Shape (parent) without an explicit cast. The compiler allows this because a Circle is always a Shape.

Upcasting is safe and always succeeds. You lose access to child-specific methods, but you gain the ability to work with any child type through a common parent reference. This is the foundation of runtime polymorphism. The compiler treats the reference as the parent type, but the actual object remains the child type.

Downcasting is the opposite: casting a parent class reference to a child class type. This requires an explicit cast because it is potentially unsafe. For example, Circle c = (Circle) s; where s is a Shape reference. This downcast is only safe if the Shape reference actually points to a Circle object. If it points to a Rectangle, a ClassCastException is thrown at runtime.

Downcasting is needed when you want to access child-specific methods that are not available through the parent reference. For example, if Circle has a getRadius() method that Shape does not have, you must downcast the Shape reference to Circle before calling getRadius().

The instanceof operator is used to check if a downcast is safe before performing it. This prevents ClassCastException. Always check instanceof before downcasting, especially when the actual object type is not guaranteed. The pattern is: if (s instanceof Circle) { Circle c = (Circle) s; c.getRadius(); }.

In Java 16+, pattern matching for instanceof allows combining the check and cast: if (s instanceof Circle c) { c.getRadius(); } — this is cleaner and less error-prone.`
      },
      romanUrduExplanation: {
        id: 'ru-06-06',
        text: `Upcasting child class reference ko parent class type mein cast karne ka process hai. Ye automatically (implicitly) hota hai kyunki har child parent ka part hota hai. Jaise, Shape s = new Circle(); ek upcast hai — Circle (child) ko Shape (parent) mein assign kiya jata hai bina explicit cast ke. Compiler allow karta hai kyunki Circle hamesha Shape hota hai.

Upcasting safe hai aur hamesha succeed karta hai. Aap child-specific methods access karna khote hain, lekin aap common parent reference ke through kisi bhi child type ke saath kaam karne ki ability gain karte hain. Ye runtime polymorphism ka foundation hai. Compiler reference ko parent type treat karta hai, lekin actual object child type hi rehta hai.

Downcasting ulta hai: parent class reference ko child class type mein cast karna. Iske liye explicit cast zaroori hai kyunki ye potentially unsafe hai. Jaise, Circle c = (Circle) s; jahan s ek Shape reference hai. Ye downcast tabhi safe hai agar Shape reference actually Circle object ko point kare. Agar Rectangle ko point kare, toh ClassCastException runtime par throw hota hai.

Downcasting tab zaroori hota hai jab aap child-specific methods access karna chahte hain jo parent reference ke through available nahi hain. Jaise, agar Circle ke paas getRadius() method hai jo Shape ke paas nahi hai, toh aapko Shape reference ko Circle mein downcast karna padta hai getRadius() call karne se pehle.

instanceof operator use hota hai ye check karne ke liye ke downcast safe hai ya nahi, karne se pehle. Ye ClassCastException ko rokta hai. Hamesha downcast se pehle instanceof check karo, especially jab actual object type guaranteed na ho. Pattern ye hai: if (s instanceof Circle) { Circle c = (Circle) s; c.getRadius(); }.

Java 16+ mein, pattern matching for instanceof check aur cast ko combine karne deta hai: if (s instanceof Circle c) { c.getRadius(); } — ye cleaner aur kam error-prone hai.`
      },
      keyPoints: [
        { id: 'kp-06-06-1', title: 'Upcasting is Implicit', description: 'Child to parent casting happens automatically. Shape s = new Circle(); requires no explicit cast.' },
        { id: 'kp-06-06-2', title: 'Downcasting is Explicit', description: 'Parent to child casting requires explicit syntax: Circle c = (Circle) s; It can fail at runtime.' },
        { id: 'kp-06-06-3', title: 'ClassCastException', description: 'Thrown when a downcast fails because the actual object is not of the target type. Prevent with instanceof.' },
        { id: 'kp-06-06-4', title: 'Safe Downcasting Pattern', description: 'Always use instanceof before downcasting: if (s instanceof Circle) { Circle c = (Circle) s; }' },
      ],
      codeExamples: [
        {
          id: 'ce-06-06-1',
          title: 'Upcasting and Downcasting',
          code: `class Animal {
    void eat() { System.out.println("Animal eats"); }
}

class Dog extends Animal {
    void bark() { System.out.println("Dog barks"); }
}

class Cat extends Animal {
    void meow() { System.out.println("Cat meows"); }
}

public class Main {
    public static void main(String[] args) {
        // UPCASTING — implicit, always safe
        Animal a1 = new Dog();   // Dog upcast to Animal
        Animal a2 = new Cat();   // Cat upcast to Animal
        a1.eat();                // works: Animal method
        // a1.bark();            // ERROR: Animal reference cannot see bark()

        // DOWNCASTING — explicit, can fail
        Dog d = (Dog) a1;       // safe: a1 actually points to Dog
        d.bark();               // Dog barks

        // UNSAFE DOWNCAST — ClassCastException
        try {
            Dog d2 = (Dog) a2;  // a2 points to Cat, not Dog!
            d2.bark();
        } catch (ClassCastException e) {
            System.out.println("Cannot cast Cat to Dog!");
        }
    }
}`,
          language: 'java',
          output: `Animal eats
Dog barks
Cannot cast Cat to Dog!`,
          explanation: 'Upcasting (Animal a = new Dog()) is automatic and safe. Downcasting (Dog d = (Dog) a) requires explicit cast and can throw ClassCastException if the actual object is not the target type.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-06-06-1',
          title: 'Collection Processing',
          scenario: 'A ArrayList<Animal> stores mixed Dog and Cat objects. When processing, you need to downcast to access type-specific methods.',
          oopConcept: 'Iteration uses Animal references (upcast). When type-specific behavior is needed, instanceof check followed by downcast provides safe access to Dog.bark() or Cat.meow().',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-06-06-1',
          title: 'Downcasting Without instanceof Check',
          incorrectCode: `Animal a = getAnimalFromDatabase(); // could be Dog, Cat, or Cow
Dog d = (Dog) a;  // ClassCastException if a is Cat or Cow!
d.bark();`,
          correctCode: `Animal a = getAnimalFromDatabase();
if (a instanceof Dog) {
    Dog d = (Dog) a;
    d.bark();  // safe: we verified a is actually a Dog
} else {
    System.out.println("Not a dog");
}`,
          explanation: 'Always check instanceof before downcasting. The actual object type is not known until runtime, so unchecked downcasts can throw ClassCastException.',
        },
      ],
      examNotes: [
        { id: 'en-06-06-1', title: 'Upcasting Rules', content: 'Upcasting (child to parent) is implicit and always safe. You lose child-specific methods but gain polymorphic flexibility.', importance: 'high' },
        { id: 'en-06-06-2', title: 'Downcasting Rules', content: 'Downcasting (parent to child) requires explicit cast. Always use instanceof to verify. Failure throws ClassCastException.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-06-06-1', question: 'What is the difference between upcasting and downcasting?', answer: 'Upcasting is implicit (child to parent, always safe). Downcasting is explicit (parent to child, can throw ClassCastException if the object is not the target type).', difficulty: 'easy' },
        { id: 'vq-06-06-2', question: 'When does ClassCastException occur?', answer: 'When you downcast a reference to a type that does not match the actual object. For example, casting a Cat object to Dog throws ClassCastException.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-06-06-1', type: 'mcq', question: 'Which type of casting is always safe?', options: ['Downcasting', 'Upcasting', 'Both are safe', 'Neither is safe'], correctAnswer: 'Upcasting', explanation: 'Upcasting (child to parent) is implicit and always succeeds because a child IS-A parent. Downcasting can fail.' },
        { id: 'qc-06-06-2', type: 'true-false', question: 'Downcasting requires explicit cast syntax.', correctAnswer: 'True', explanation: 'You must write Circle c = (Circle) s; — the explicit cast tells the compiler you intend to narrow the type.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-06-06-1',
          scenario: 'You have a method that processes Animal objects. Inside the method, you need to call Dog-specific methods for Dog objects.',
          question: 'How do you safely access Dog-specific behavior?',
          type: 'concept-application',
          options: [
            'Check instanceof Dog, then downcast to Dog and call the method',
            'Directly cast to Dog without checking',
            'All animals have the same methods — no casting needed',
            'Create a separate method for each animal type',
          ],
          correctAnswer: 'Check instanceof Dog, then downcast to Dog and call the method',
          explanation: 'Using instanceof before downcasting ensures the cast is safe and prevents ClassCastException.',
          relatedConcepts: ['downcasting', 'instanceof', 'class-cast-exception'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-casting',
      prerequisites: ['lesson-06-04'],
      xpReward: 60,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'type-casting',
      difficulty: 'medium',
      estimatedMinutes: 18,
    },
    {
      id: 'lesson-06-07',
      moduleId: 'module-06',
      title: 'instanceof Operator',
      slug: 'instanceof-operator',
      order: 7,
      duration: 18,
      description: 'Learn to use the instanceof operator for type checking, safe downcasting, and pattern matching in Java.',
      learningObjectives: [
        { id: 'lo-06-07-1', description: 'Use instanceof to check object types at runtime', completed: false },
        { id: 'lo-06-07-2', description: 'Combine instanceof with downcasting for safe type conversion', completed: false },
        { id: 'lo-06-07-3', description: 'Apply Java 16+ pattern matching with instanceof', completed: false },
        { id: 'lo-06-07-4', description: 'Understand how instanceof works with the class hierarchy', completed: false },
      ],
      englishExplanation: {
        id: 'ee-06-07',
        text: `The instanceof operator is a binary operator that checks whether an object is an instance of a specific class, its subclass, or an interface it implements. It returns true if the object is of the specified type or any subtype, and false otherwise. This is essential for safe downcasting and type-aware processing.

The basic syntax is: object instanceof Type. For example, if (animal instanceof Dog) checks if the animal reference actually points to a Dog object. If it does, the expression returns true, and you can safely downcast inside the if block.

instanceof follows the class hierarchy. If Dog extends Animal, and aDog is an instance of Dog, then aDog instanceof Animal also returns true. This means instanceof checks the entire inheritance chain — it returns true for the actual type AND all parent types.

The null case is important: null instanceof anything always returns false. This means you can safely call (obj instanceof SomeType) even if obj is null — it will simply return false without throwing a NullPointerException.

Java 16 introduced pattern matching for instanceof, which combines the type check and variable binding in one step. Instead of writing: if (obj instanceof Dog) { Dog d = (Dog) obj; d.bark(); }, you can write: if (obj instanceof Dog d) { d.bark(); }. The variable d is automatically cast and assigned if the check passes. This is cleaner, safer, and reduces boilerplate.

Pattern matching also works with null: if (obj instanceof Dog d) handles null correctly — d will not be assigned if obj is null, so the body is not executed. This eliminates the common pattern of checking for null separately.

instanceof is used extensively in switch expressions (Java 17+), visitor patterns, and any code that needs to process objects of different types differently based on their actual runtime type.`
      },
      romanUrduExplanation: {
        id: 'ru-06-07',
        text: `instanceof operator ek binary operator hai jo check karta hai ke ek object kisi specific class, uske subclass, ya kisi interface ka instance hai ya nahi. Ye true return karta hai agar object specified type ya kisi bhi subtype ka ho, warna false. Ye safe downcasting aur type-aware processing ke liye zaroori hai.

Basic syntax hai: object instanceof Type. Jaise, if (animal instanceof Dog) check karta hai ke animal reference actually Dog object ko point kare ya nahi. Agar kare, toh expression true return karta hai, aur aap if block ke andar safely downcast kar sakte hain.

instanceof class hierarchy follow karta hai. Agar Dog Animal se extend karta hai, aur aDog Dog ka instance hai, toh aDog instanceof Animal bhi true return karta hai. Iska matlab hai ke instanceof poori inheritance chain check karta hai — ye actual type aur sab parent types ke liye true return karta hai.

null case important hai: null instanceof kuch bhi hamesha false return karta hai. Iska matlab hai ke aap safely (obj instanceof SomeType) call kar sakte hain chahe obj null ho — ye sirf false return karega NullPointerException throw nahi karega.

Java 16 ne instanceof ke liye pattern matching introduce ki, jo type check aur variable binding ek step mein combine karta hai. Iski bajaye ke aap likhein: if (obj instanceof Dog) { Dog d = (Dog) obj; d.bark(); }, aap likh sakte hain: if (obj instanceof Dog d) { d.bark(); }. Check pass hone par variable d automatically cast aur assign hota hai. Ye cleaner, safer hai aur boilerplate reduce karta hai.

Pattern matching null ke saath bhi kaam karta hai: if (obj instanceof Dog d) null ko sahi handle karta hai — agar obj null ho toh d assign nahi hota, isliye body execute nahi hoti. Ye null ke liye alag se check karne ka common pattern eliminate karta hai.

instanceof switch expressions (Java 17+), visitor patterns, aur kisi bhi code mein extensively use hota hai jo different types ke objects ko unke actual runtime type ke according alag-alag process karna chahta hai.`
      },
      keyPoints: [
        { id: 'kp-06-07-1', title: 'Type Check', description: 'instanceof returns true if the object is an instance of the specified type or any subtype in the hierarchy.' },
        { id: 'kp-06-07-2', title: 'Null Safety', description: 'null instanceof anything always returns false. No NullPointerException is thrown.' },
        { id: 'kp-06-07-3', title: 'Hierarchy Awareness', description: 'instanceof checks the full inheritance chain. A Dog instanceof Animal returns true.' },
        { id: 'kp-06-07-4', title: 'Pattern Matching', description: 'Java 16+ pattern matching combines check and cast: if (obj instanceof Dog d) { d.bark(); }' },
      ],
      codeExamples: [
        {
          id: 'ce-06-07-1',
          title: 'instanceof and Pattern Matching',
          code: `class Shape {
    String type = "Shape";
}

class Circle extends Shape {
    double radius;
    Circle(double r) { this.radius = r; }
}

class Rectangle extends Shape {
    double width, height;
    Rectangle(double w, double h) { this.width = w; this.height = h; }
}

public class Main {
    public static void processShape(Shape s) {
        // Traditional instanceof check
        if (s instanceof Circle) {
            Circle c = (Circle) s;
            System.out.println("Circle radius: " + c.radius);
        } else if (s instanceof Rectangle) {
            Rectangle r = (Rectangle) s;
            System.out.println("Rectangle area: " + (r.width * r.height));
        }

        // Java 16+ pattern matching (cleaner)
        if (s instanceof Circle c) {
            System.out.println("Circle radius (pattern): " + c.radius);
        } else if (s instanceof Rectangle r) {
            System.out.println("Rectangle area (pattern): " + (r.width * r.height));
        }

        // null is always false
        System.out.println("null instanceof Circle: " + (null instanceof Circle));
    }

    public static void main(String[] args) {
        processShape(new Circle(5.0));
        processShape(new Rectangle(4.0, 6.0));
        processShape(null);
    }
}`,
          language: 'java',
          output: `Circle radius: 5.0
Circle radius (pattern): 5.0
Rectangle area: 24.0
Rectangle area (pattern): 24.0
null instanceof Circle: false`,
          explanation: 'instanceof checks the actual object type. Pattern matching combines check and cast in one step. null instanceof anything is always false.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-06-07-1',
          title: 'Payment Processing with Type Detection',
          scenario: 'A system receives Payment objects of different types. It needs to process credit cards differently from PayPal payments.',
          oopConcept: 'instanceof checks the payment type, then downcasts to access type-specific methods like getCreditCardNumber() or getPayPalEmail().',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-06-07-1',
          title: 'Using instanceof When Not Needed',
          incorrectCode: `// Overusing instanceof — violates polymorphism principle
void process(Shape s) {
    if (s instanceof Circle) {
        ((Circle) s).draw();
    } else if (s instanceof Rectangle) {
        ((Rectangle) s).draw();
    } else if (s instanceof Triangle) {
        ((Triangle) s).draw();
    }
}
// This defeats the purpose of polymorphism!`,
          correctCode: `// Use polymorphism instead
void process(Shape s) {
    s.draw();  // correct version called automatically
}
// Only use instanceof when you NEED type-specific behavior
// that cannot be expressed through overriding`,
          explanation: 'If all subclasses override draw(), you do not need instanceof. Polymorphism handles it. Only use instanceof when accessing child-specific methods that cannot be overridden.',
        },
      ],
      examNotes: [
        { id: 'en-06-07-1', title: 'instanceof Behavior', content: 'Returns true for the actual type and all parent types. Returns false for null. Follows the full inheritance hierarchy.', importance: 'high' },
        { id: 'en-06-07-2', title: 'Pattern Matching', content: 'Java 16+ pattern matching: if (obj instanceof Type var) combines check and cast. Cleaner and prevents errors.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-06-07-1', question: 'What does instanceof return for null?', answer: 'null instanceof anything always returns false. This is a built-in safety feature that prevents NullPointerException.', difficulty: 'easy' },
        { id: 'vq-06-07-2', question: 'What is pattern matching for instanceof?', answer: 'Java 16+ feature that combines the type check and variable assignment in one step: if (obj instanceof Dog d) { d.bark(); }. The variable is automatically cast if the check passes.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-06-07-1', type: 'mcq', question: 'What does "animal instanceof Animal" return if animal is a Dog and Dog extends Animal?', options: ['true', 'false', 'Compilation error', 'NullPointerException'], correctAnswer: 'true', explanation: 'instanceof follows the inheritance hierarchy. Since Dog IS-A Animal, the check returns true.' },
        { id: 'qc-06-07-2', type: 'true-false', question: 'null instanceof Object returns true.', correctAnswer: 'False', explanation: 'null instanceof anything always returns false, even for Object.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-06-07-1',
          scenario: 'You have a method that receives an Object parameter. You need to check if it is a String, and if so, print its length.',
          question: 'Write the instanceof check with pattern matching.',
          type: 'concept-application',
          options: [
            'if (obj instanceof String s) { System.out.println(s.length()); }',
            'if (obj instanceof String) { System.out.println(obj.length()); }',
            'String s = (String) obj; System.out.println(s.length());',
            'if (obj.getClass() == String.class) { ... }',
          ],
          correctAnswer: 'if (obj instanceof String s) { System.out.println(s.length()); }',
          explanation: 'Pattern matching combines the check and cast: instanceof String s checks the type AND assigns the cast variable s in one step.',
          relatedConcepts: ['instanceof', 'pattern-matching', 'type-checking'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-instanceof',
      prerequisites: ['lesson-06-06'],
      xpReward: 60,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'instanceof-check',
      difficulty: 'medium',
      estimatedMinutes: 18,
    },
    {
      id: 'lesson-06-08',
      moduleId: 'module-06',
      title: 'Covariant Return Types',
      slug: 'covariant-return-types',
      order: 8,
      duration: 15,
      description: 'Learn how Java allows overriding methods to return a subclass type instead of the parent class return type.',
      learningObjectives: [
        { id: 'lo-06-08-1', description: 'Define covariant return types', completed: false },
        { id: 'lo-06-08-2', description: 'Override methods with narrower return types', completed: false },
        { id: 'lo-06-08-3', description: 'Understand when covariant returns are useful', completed: false },
      ],
      englishExplanation: {
        id: 'ee-06-08',
        text: `Covariant return types allow an overriding method to return a type that is a subclass of the parent method's return type. Before Java 5, overriding methods had to return exactly the same type. Since Java 5, the return type can be narrowed to a subclass, which is called a covariant return type.

For example, if a parent class has a method Shape clone() that returns Shape, a child class can override it as Circle clone() that returns Circle. This is valid because Circle IS-A Shape. The return type is narrowed (covariant), but the method is still compatible with the parent signature.

The key benefit is type safety. Without covariant returns, you would need to downcast the result: Circle c = (Circle) shape.clone();. With covariant returns, you can write Circle c = circle.clone(); directly — no downcast needed. This eliminates potential ClassCastException and makes the code cleaner.

Covariant returns work with classes and interfaces. A class that implements an interface can return a more specific type from the implemented method. For example, if an interface defines Object getValue(), a class can implement it as String getValue().

Primitive return types cannot be covariant — they must match exactly. You cannot override a method returning int with one returning long. Only class/interface return types support covariance.

This feature is particularly useful in the Factory Method pattern, clone() methods, and builder patterns where the return type should reflect the actual object being created or returned.`
      },
      romanUrduExplanation: {
        id: 'ru-06-08',
        text: `Covariant return types ek overriding method ko subclass type return karne dete hain parent method ke return type ki bajaye. Java 5 se pehle, overriding methods ko exactly same type return karna padta tha. Java 5 ke baad, return type ko subclass mein narrow kiya ja sakta hai, jise covariant return type kehte hain.

Jaise, agar parent class mein Shape clone() method hai jo Shape return karta hai, toh child class usse Circle clone() mein override kar sakta hai jo Circle return karta hai. Ye valid hai kyunki Circle IS-A Shape. Return type narrow (covariant) hai, lekin method abhi bhi parent signature ke compatible hai.

Key benefit type safety hai. Bina covariant returns ke, aapko result ko downcast karna padta: Circle c = (Circle) shape.clone();. Covariant returns ke saath, aap seedha Circle c = circle.clone(); likh sakte hain — downcast ki zaroorat nahi. Ye potential ClassCastException eliminate karta hai aur code ko cleaner banata hai.

Covariant returns classes aur interfaces ke saath kaam karte hain. Jo class interface implement karti hai, wo implemented method mein zyada specific type return kar sakti hai. Jaise, agar interface Object getValue() define karta hai, toh class use String getValue() mein implement kar sakti hai.

Primitive return types covariant nahi ho sakte — unka match exact hona chahiye. Aap int return karne wale method ko long return karke override nahi nahi kar sakte. Sirf class/interface return types covariance support karte hain.

Ye feature Factory Method pattern, clone() methods, aur builder patterns mein particularly useful hai jahan return type actual object ko reflect karna chahiye jo create ya return ho raha hai.`
      },
      keyPoints: [
        { id: 'kp-06-08-1', title: 'Narrower Return Type', description: 'An overriding method can return a subclass of the parent method return type. Circle clone() can override Shape clone().' },
        { id: 'kp-06-08-2', title: 'Type Safety', description: 'Eliminates the need for downcasting return values, preventing ClassCastException.' },
        { id: 'kp-06-08-3', title: 'Since Java 5', description: 'Covariant return types were introduced in Java 5. Before that, return types had to match exactly.' },
        { id: 'kp-06-08-4', title: 'No Primitives', description: 'Primitive return types (int, double) cannot be covariant. Only class and interface types support covariance.' },
      ],
      codeExamples: [
        {
          id: 'ce-06-08-1',
          title: 'Covariant Return Types in Action',
          code: `class Shape {
    Shape cloneShape() {
        System.out.println("Cloning generic shape");
        return new Shape();
    }
}

class Circle extends Shape {
    double radius;

    Circle(double r) { this.radius = r; }

    @Override
    Circle cloneShape() {  // returns Circle instead of Shape
        System.out.println("Cloning circle with radius: " + radius);
        return new Circle(radius);
    }
}

class Rectangle extends Shape {
    double width, height;

    Rectangle(double w, double h) { this.width = w; this.height = h; }

    @Override
    Rectangle cloneShape() {  // returns Rectangle instead of Shape
        System.out.println("Cloning rectangle: " + width + "x" + height);
        return new Rectangle(width, height);
    }
}

public class Main {
    public static void main(String[] args) {
        Circle original = new Circle(5.0);
        Circle copy = original.cloneShape();  // no downcast needed!

        Rectangle r = new Rectangle(4.0, 6.0);
        Rectangle rCopy = r.cloneShape();    // no downcast needed!

        System.out.println("Copy radius: " + copy.radius);
        System.out.println("Copy area: " + (rCopy.width * rCopy.height));
    }
}`,
          language: 'java',
          output: `Cloning circle with radius: 5.0
Cloning rectangle: 4.0x6.0
Copy radius: 5.0
Copy area: 24.0`,
          explanation: 'Each child class overrides cloneShape() to return its own type. No downcasting is needed — Circle.cloneShape() returns Circle, Rectangle.cloneShape() returns Rectangle.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-06-08-1',
          title: 'Builder Pattern',
          scenario: 'A builder class hierarchy where each subclass builder returns itself for method chaining.',
          oopConcept: 'UserBuilder build() in the parent returns UserBuilder. AdminBuilder extends UserBuilder and overrides build() to return AdminBuilder, enabling method chaining with the correct type.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-06-08-1',
          title: 'Trying Covariant Returns with Primitives',
          incorrectCode: `class Parent {
    int getValue() { return 1; }
}
class Child extends Parent {
    long getValue() { return 1L; }  // ERROR! Primitive types cannot be covariant
}`,
          correctCode: `class Parent {
    Number getValue() { return 1; }
}
class Child extends Parent {
    @Override
    Integer getValue() { return 1; }  // OK: Integer extends Number
}
// Use wrapper classes (Integer) instead of primitives (int) for covariant returns`,
          explanation: 'Primitive types (int, double, long) cannot be covariant. Use wrapper classes (Integer, Double, Long) or class hierarchies instead.',
        },
      ],
      examNotes: [
        { id: 'en-06-08-1', title: 'Covariant Return Rule', content: 'An overriding method can return a subclass of the parent method return type. The return type is narrowed, not widened.', importance: 'high' },
        { id: 'en-06-08-2', title: 'Eliminates Downcasting', content: 'Covariant returns remove the need for downcasting return values, making code type-safe and cleaner.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-06-08-1', question: 'What is a covariant return type?', answer: 'A covariant return type allows an overriding method to return a subclass of the parent method return type. For example, Circle clone() overriding Shape clone().', difficulty: 'medium' },
        { id: 'vq-06-08-2', question: 'Can primitive types have covariant returns?', answer: 'No. Primitive types must match exactly. Covariant returns only work with class and interface types.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-06-08-1', type: 'mcq', question: 'Which Java version introduced covariant return types?', options: ['Java 1.0', 'Java 5', 'Java 8', 'Java 16'], correctAnswer: 'Java 5', explanation: 'Covariant return types were introduced in Java 5 (J2SE 5.0), allowing overriding methods to return narrower types.' },
        { id: 'qc-06-08-2', type: 'true-false', question: 'Covariant return types eliminate the need for downcasting return values.', correctAnswer: 'True', explanation: 'With covariant returns, the overriding method returns the specific subclass type directly, so no downcast is needed.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-06-08-1',
          scenario: 'You have a Vehicle class with a clone() method returning Vehicle. You want Car.clone() to return Car without requiring a downcast.',
          question: 'How do you achieve this?',
          type: 'concept-application',
          options: [
            'Override clone() in Car with return type Car — this is a covariant return type',
            'Use @Override and return Vehicle, then downcast in the caller',
            'Create a separate cloneCar() method in Car',
            'Use generics to parameterize the return type',
          ],
          correctAnswer: 'Override clone() in Car with return type Car — this is a covariant return type',
          explanation: 'Car clone() overriding Vehicle clone() with a narrower return type (Car) is a covariant return type. The caller can use Car c = car.clone() without downcasting.',
          relatedConcepts: ['covariant-return', 'method-overriding', 'type-safety'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-covariant-return',
      prerequisites: ['lesson-06-04', 'lesson-06-05'],
      xpReward: 50,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'covariant-return',
      difficulty: 'medium',
      estimatedMinutes: 15,
    },
    {
      id: 'lesson-06-09',
      moduleId: 'module-06',
      title: 'Polymorphism in Practice',
      slug: 'polymorphism-in-practice',
      order: 9,
      duration: 20,
      description: 'See how polymorphism works in real systems — collections, interfaces, and large-scale application design.',
      learningObjectives: [
        { id: 'lo-06-09-1', description: 'Apply polymorphism with Java Collections', completed: false },
        { id: 'lo-06-09-2', description: 'Design polymorphic systems using interfaces', completed: false },
        { id: 'lo-06-09-3', description: 'Recognize polymorphism in real-world frameworks', completed: false },
        { id: 'lo-06-09-4', description: 'Evaluate when to use polymorphism vs simpler alternatives', completed: false },
      ],
      englishExplanation: {
        id: 'ee-06-09',
        text: `Polymorphism is not just an academic concept — it is the backbone of virtually every Java framework, library, and enterprise application. Understanding how it works in practice is essential for professional Java development.

**Java Collections Framework:** ArrayList<Animal> can store Dog, Cat, and Cow objects. When you iterate and call speak(), each object responds with its own version. The collection does not need to know the concrete types — it works with the Animal abstraction. This is runtime polymorphism in its most practical form.

**Interface-Based Polymorphism:** Java interfaces enable polymorphism across unrelated class hierarchies. A Comparable interface allows any class to be sorted by a generic sorting algorithm. A Serializable interface allows any object to be written to a file. The algorithm works with the interface type, not the concrete class.

**GUI Frameworks:** In Java Swing and JavaFX, event handlers use polymorphism. ActionListener defines actionPerformed(). Every button click handler implements this interface differently. The framework calls actionPerformed() on the interface reference, and the correct handler executes.

**Database Access:** JDBC uses polymorphism extensively. Connection, Statement, and ResultSet are interfaces. MySQL, PostgreSQL, and Oracle each provide their own implementations. Application code works with interface references, and the correct database-specific implementation runs at runtime.

**Design Patterns:** Factory, Strategy, Observer, and many other patterns rely on polymorphism. The Factory Method returns a parent type reference pointing to a child object. The Strategy pattern swaps algorithms at runtime through a common interface. The Observer pattern notifies different listener implementations through a shared interface.

The key insight is that polymorphism enables coding to the interface, not the implementation. This makes systems extensible — new implementations can be added without modifying existing code. This is the Open-Closed Principle in action.`
      },
      romanUrduExplanation: {
        id: 'ru-06-09',
        text: `Polymorphism sirf academic concept nahi hai — ye virtually har Java framework, library, aur enterprise application ka backbone hai. Ye practice mein kaise kaam karta hai samajhna professional Java development ke liye zaroori hai.

**Java Collections Framework:** ArrayList<Animal> Dog, Cat, aur Cow objects store kar sakta hai. Jab aap iterate karke speak() call karte hain, har object apna version respond karta hai. Collection ko concrete types ki zaroorat nahi — ye Animal abstraction ke saath kaam karta hai. Ye runtime polymorphism ka sabse practical form hai.

**Interface-Based Polymorphism:** Java interfaces unrelated class hierarchies mein polymorphism enable karte hain. Comparable interface kisi bhi class ko generic sorting algorithm se sort karne deta hai. Serializable interface kisi bhi object ko file mein likhne deta hai. Algorithm interface type ke saath kaam karta hai, concrete class ke nahi.

**GUI Frameworks:** Java Swing aur JavaFX mein, event handlers polymorphism use karte hain. ActionListener actionPerformed() define karta hai. Har button click handler isko differently implement karta hai. Framework interface reference par actionPerformed() call karta hai aur sahi handler execute hota hai.

**Database Access:** JDBC extensively polymorphism use karta hai. Connection, Statement, aur ResultSet interfaces hain. MySQL, PostgreSQL, aur Oracle apne alag implementations provide karte hain. Application code interface references ke saath kaam karta hai aur runtime par sahi database-specific implementation chalta hai.

**Design Patterns:** Factory, Strategy, Observer, aur kai doosre patterns polymorphism par depend karte hain. Factory Method parent type reference return karta hai jo child object ko point karta hai. Strategy pattern common interface ke through runtime par algorithms swap karta hai. Observer pattern shared interface ke through different listener implementations ko notify karta hai.

Key insight ye hai ke polymorphism coding to the interface enable karta hai, implementation ke bajaye. Ye systems ko extensible banata hai — naye implementations add kiye ja sakte hain existing code modify kiye bina. Ye Open-Closed Principle action mein hai.`
      },
      keyPoints: [
        { id: 'kp-06-09-1', title: 'Collections Use Polymorphism', description: 'ArrayList<Animal> stores any Animal subclass. Iteration calls the correct overridden method for each object.' },
        { id: 'kp-06-09-2', title: 'Interface-Based Design', description: 'Coding to interfaces enables polymorphism across unrelated hierarchies. JDBC, Collections, and GUI frameworks all use this.' },
        { id: 'kp-06-09-3', title: 'Design Patterns', description: 'Factory, Strategy, Observer, and many patterns rely on polymorphism for flexibility and extensibility.' },
        { id: 'kp-06-09-4', title: 'Open-Closed Principle', description: 'Polymorphism enables systems that are open for extension but closed for modification — new types work without changing existing code.' },
      ],
      codeExamples: [
        {
          id: 'ce-06-09-1',
          title: 'Polymorphism with Collections',
          code: `import java.util.ArrayList;
import java.util.List;

class Animal {
    String name;
    Animal(String name) { this.name = name; }
    void speak() { System.out.println(name + " makes a sound"); }
}

class Dog extends Animal {
    Dog(String name) { super(name); }
    @Override
    void speak() { System.out.println(name + " barks"); }
}

class Cat extends Animal {
    Cat(String name) { super(name); }
    @Override
    void speak() { System.out.println(name + " meows"); }
}

class Duck extends Animal {
    Duck(String name) { super(name); }
    @Override
    void speak() { System.out.println(name + " quacks"); }
}

public class Main {
    public static void main(String[] args) {
        List<Animal> animals = new ArrayList<>();
        animals.add(new Dog("Rex"));
        animals.add(new Cat("Whiskers"));
        animals.add(new Duck("Donald"));

        // Polymorphism in action — each animal speaks differently
        for (Animal a : animals) {
            a.speak();  // correct version called for each
        }
    }
}`,
          language: 'java',
          output: `Rex barks
Whiskers meows
Donald quacks`,
          explanation: 'The ArrayList stores Animal references, but each element is a different subtype. The loop calls speak() on each, and the correct overridden version executes based on the actual object type.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-06-09-1',
          title: 'Plugin Architecture',
          scenario: 'A text editor supports plugins for syntax highlighting, code completion, and linting. Each plugin implements a common Plugin interface.',
          oopConcept: 'The editor stores List<Plugin> and calls activate() on each. New plugins are added by implementing Plugin — no changes to the editor core. This is polymorphism enabling extensibility.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-06-09-1',
          title: 'Using Concrete Types Instead of Interfaces',
          incorrectCode: `// Tightly coupled — cannot swap implementations
ArrayList<MySQLDatabase> databases = new ArrayList<>();
// Now you cannot add PostgreSQLDatabase!`,
          correctCode: `// Loosely coupled — any Database implementation works
ArrayList<Database> databases = new ArrayList<>();
databases.add(new MySQLDatabase());
databases.add(new PostgreSQLDatabase());
// Both work through the Database interface`,
          explanation: 'Always code to the interface (Database), not the implementation (MySQLDatabase). This allows polymorphism to work and makes the system extensible.',
        },
      ],
      examNotes: [
        { id: 'en-06-09-1', title: 'Real-World Usage', content: 'Polymorphism is used in Collections (ArrayList<Shape>), frameworks (JDBC interfaces), event handling (ActionListener), and design patterns (Factory, Strategy).', importance: 'high' },
        { id: 'en-06-09-2', title: 'Coding to Interface', content: 'Always declare variables as interface types (List, not ArrayList; Database, not MySQLDatabase) to enable polymorphism.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-06-09-1', question: 'How is polymorphism used in the Java Collections Framework?', answer: 'Collections store parent type references (e.g., ArrayList<Animal>) but can hold any child objects. When methods are called during iteration, the correct overridden version executes based on the actual object type.', difficulty: 'medium' },
        { id: 'vq-06-09-2', question: 'What does "coding to the interface" mean?', answer: 'Declaring variables, parameters, and return types as interface types rather than concrete classes. This enables polymorphism — any implementation of the interface can be used interchangeably.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-06-09-1', type: 'mcq', question: 'Which principle does polymorphism enable?', options: ['Single Responsibility', 'Open-Closed Principle', 'Liskov Substitution', 'Interface Segregation'], correctAnswer: 'Open-Closed Principle', explanation: 'Polymorphism allows systems to be open for extension (new types) but closed for modification (existing code does not change).' },
        { id: 'qc-06-09-2', type: 'true-false', question: 'JDBC uses polymorphism through its interface-based design.', correctAnswer: 'True', explanation: 'JDBC defines interfaces (Connection, Statement, ResultSet) that each database vendor implements differently. Application code uses the interfaces polymorphically.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-06-09-1',
          scenario: 'You are designing a notification system that needs to send messages via email, SMS, and push notifications. The system should be easily extensible for future channels.',
          question: 'How does polymorphism help?',
          type: 'design-decision',
          options: [
            'Define a NotificationSender interface. Each channel implements it. The system calls send() on the interface — new channels added without modifying existing code',
            'Create separate methods: sendEmail(), sendSMS(), sendPush()',
            'Use if-else to check notification type before sending',
            'Create one giant class that handles all notification types',
          ],
          correctAnswer: 'Define a NotificationSender interface. Each channel implements it. The system calls send() on the interface — new channels added without modifying existing code',
          explanation: 'Polymorphism through interfaces allows the system to work with any NotificationSender implementation. Adding a new channel (e.g., WhatsApp) requires only creating a new class — no changes to existing code.',
          relatedConcepts: ['polymorphism', 'interface-design', 'open-closed-principle'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-polymorphism-practice',
      prerequisites: ['lesson-06-04', 'lesson-01-03'],
      xpReward: 70,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'polymorphism-practice',
      difficulty: 'medium',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-06-10',
      moduleId: 'module-06',
      title: 'Polymorphism vs Overloading',
      slug: 'polymorphism-vs-overloading',
      order: 10,
      duration: 15,
      description: 'Clear comparison between polymorphism (overriding) and overloading — when to use each, and how they differ in behavior, resolution, and design.',
      learningObjectives: [
        { id: 'lo-06-10-1', description: 'Compare compile-time and runtime polymorphism side by side', completed: false },
        { id: 'lo-06-10-2', description: 'Know when to use overloading vs overriding', completed: false },
        { id: 'lo-06-10-3', description: 'Identify the correct approach for a given design scenario', completed: false },
      ],
      englishExplanation: {
        id: 'ee-06-10',
        text: `Method overloading (compile-time polymorphism) and method overriding (runtime polymorphism) are both forms of polymorphism, but they differ fundamentally in purpose, mechanism, and design impact.

**Overloading** happens within the same class (or inherited). Methods share the same name but have different parameter lists. The compiler resolves which method to call at compile time based on the arguments. Overloading is about providing convenient variations of the same operation — like print(int), print(String), print(double).

**Overriding** happens in a child class. The child redefines a parent method with the exact same signature. The JVM resolves which method to call at runtime based on the actual object type. Overriding is about providing specialized behavior for different subtypes — like Dog.speak() vs Cat.speak().

**Key Differences:**
- Overloading: same class, different parameters, compile-time resolution, independent methods
- Overriding: parent-child relationship, same signature, runtime resolution, replaces parent behavior

**When to Use Overloading:** When you want the same logical operation to work with different parameter types. Examples: constructors (Student(), Student(String name)), utility methods (max(int, int), max(double, double)), and convenience methods.

**When to Use Overriding:** When you want different subtypes to behave differently for the same operation. Examples: draw() for different shapes, speak() for different animals, processPayment() for different payment methods.

**Common Confusion:** Students often confuse the two because they share the word "overloading/overriding." Remember: overloading = different signatures = same class = compile-time. Overriding = same signature = parent-child = runtime.

**Design Impact:** Overloading provides API convenience. Overriding enables polymorphic behavior and extensible systems. Both are essential, but they serve different purposes in OOP design.`
      },
      romanUrduExplanation: {
        id: 'ru-06-10',
        text: `Method overloading (compile-time polymorphism) aur method overriding (runtime polymorphism) dono polymorphism ke forms hain, lekin ye purpose, mechanism, aur design impact mein fundamentally different hain.

**Overloading** ek hi class mein hota hai (ya inherited methods mein). Methods ka same naam hota hai lekin different parameter lists hoti hain. Compiler compile time par arguments ke according determine karta hai ke kaunsa method call hona chahiye. Overloading same operation ke convenient variations provide karne ke baare mein hai — jaise print(int), print(String), print(double).

**Overriding** child class mein hota hai. Child parent method ko exact same signature se redefine karta hai. JVM runtime par actual object type ke according determine karta hai ke kaunsa method call hona chahiye. Overriding different subtypes ke liye specialized behavior provide karne ke baare hai — jaise Dog.speak() vs Cat.speak().

**Key Differences:**
- Overloading: same class, different parameters, compile-time resolution, independent methods
- Overriding: parent-child relationship, same signature, runtime resolution, parent behavior replace karta hai

**Kab Overloading Use Karein:** Jab aap chahein ke same logical operation different parameter types ke saath kaam kare. Examples: constructors (Student(), Student(String name)), utility methods (max(int, int), max(double, double)).

**Kab Overriding Use Karein:** Jab aap chahein ke different subtypes same operation ke liye alag-alag behave karein. Examples: different shapes ke liye draw(), different animals ke liye speak(), different payment methods ke liye processPayment().

**Common Confusion:** Students aksar dono ko confuse karte hain kyunki "overloading/overriding" word share karte hain. Yaad rakhein: overloading = different signatures = same class = compile-time. Overriding = same signature = parent-child = runtime.

**Design Impact:** Overloading API convenience provide karta hai. Overriding polymorphic behavior aur extensible systems enable karta hai. Dono essential hain, lekin OOP design mein alag purposes serve karte hain.`
      },
      keyPoints: [
        { id: 'kp-06-10-1', title: 'Overloading = Compile-Time', description: 'Different parameters, same class, compiler resolves. About API convenience and flexibility.' },
        { id: 'kp-06-10-2', title: 'Overriding = Runtime', description: 'Same signature, parent-child, JVM resolves. About specialized behavior and polymorphic design.' },
        { id: 'kp-06-10-3', title: 'Different Purposes', description: 'Overloading provides convenience variations. Overriding enables extensible, polymorphic systems.' },
        { id: 'kp-06-10-4', title: 'Key Distinction', description: 'Overloading changes parameters. Overriding changes implementation. Both use the same method name.' },
      ],
      codeExamples: [
        {
          id: 'ce-06-10-1',
          title: 'Overloading vs Overriding Side by Side',
          code: `// OVERLOADING — same class, different parameters
class Printer {
    void print(int value) {
        System.out.println("Int: " + value);
    }
    void print(String value) {
        System.out.println("String: " + value);
    }
    void print(int a, int b) {
        System.out.println("Two ints: " + a + ", " + b);
    }
}

// OVERRIDING — parent-child, same signature
class Animal {
    void speak() {
        System.out.println("Animal speaks");
    }
}

class Dog extends Animal {
    @Override
    void speak() {
        System.out.println("Dog barks");
    }
}

class Cat extends Animal {
    @Override
    void speak() {
        System.out.println("Cat meows");
    }
}

public class Main {
    public static void main(String[] args) {
        // OVERLOADING: compiler picks method based on arguments
        Printer p = new Printer();
        p.print(42);         // Int: 42
        p.print("Hello");    // String: Hello
        p.print(1, 2);       // Two ints: 1, 2

        // OVERRIDING: JVM picks method based on object type
        Animal a1 = new Dog();
        Animal a2 = new Cat();
        a1.speak();  // Dog barks
        a2.speak();  // Cat meows
    }
}`,
          language: 'java',
          output: `Int: 42
String: Hello
Two ints: 1, 2
Dog barks
Cat meows`,
          explanation: 'Overloading (left) — compiler selects method by parameter list. Overriding (right) — JVM selects method by actual object type. Same name mechanism, fundamentally different behavior.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-06-10-1',
          title: 'When to Use Each',
          scenario: 'A math library has add(int,int), add(double,double), add(int,int,int) — overloading for convenience. A payment system has Payment.processPayment() overridden by CreditCard, PayPal, BankTransfer — overriding for polymorphism.',
          oopConcept: 'Overloading = same operation, different inputs. Overriding = different behavior for different subtypes. Both are essential but serve different design goals.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-06-10-1',
          title: 'Thinking Overloading Is Polymorphism in the OOP Sense',
          incorrectCode: `// Overloading is polymorphism, but NOT the polymorphism
// people usually mean in OOP discussions
class Circle {
    double area(double r) { return Math.PI * r * r; }
    double area(double r, double h) { return Math.PI * r * r * h; }
}
// This is overloading — convenient, but NOT enabling polymorphic design
// It does NOT enable treating different shapes through one reference`,
          correctCode: `// True OOP polymorphism uses overriding
abstract class Shape {
    abstract double area();  // each shape calculates differently
}
class Circle extends Shape {
    double r;
    @Override double area() { return Math.PI * r * r; }
}
class Rectangle extends Shape {
    double w, h;
    @Override double area() { return w * h; }
}
// Shape s = new Circle(r); s.area(); — polymorphic behavior`,
          explanation: 'Overloading provides convenience but does not enable polymorphic design. True OOP polymorphism uses overriding with inheritance to allow different types to be processed through a common reference.',
        },
      ],
      examNotes: [
        { id: 'en-06-10-1', title: 'Comparison Table', content: 'Overloading: same class, different params, compile-time, independent. Overriding: parent-child, same signature, runtime, replaces parent behavior. Know this comparison cold.', importance: 'high' },
        { id: 'en-06-10-2', title: 'Design Choice', content: 'Overloading = convenience API. Overriding = polymorphic extensibility. Choose based on whether you need different operations (overloading) or different behaviors for subtypes (overriding).', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-06-10-1', question: 'What is the main difference between overloading and overriding?', answer: 'Overloading: same class, different parameters, compile-time resolution. Overriding: parent-child, same signature, runtime resolution. Overloading provides convenience; overriding enables polymorphism.', difficulty: 'easy' },
        { id: 'vq-06-10-2', question: 'When should you use overloading vs overriding?', answer: 'Use overloading when the same operation works with different parameter types (convenience). Use overriding when different subtypes need different behavior for the same operation (polymorphism).', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-06-10-1', type: 'mcq', question: 'Which is resolved at compile time?', options: ['Method overriding', 'Method overloading', 'Both', 'Neither'], correctAnswer: 'Method overloading', explanation: 'Method overloading is resolved by the compiler based on parameter lists. Method overriding is resolved by the JVM at runtime.' },
        { id: 'qc-06-10-2', type: 'mcq', question: 'Overriding requires:', options: ['Different parameter lists', 'Same class only', 'Parent-child relationship and same signature', 'Only return type change'], correctAnswer: 'Parent-child relationship and same signature', explanation: 'Overriding happens when a child class redefines a parent method with the exact same signature (name + parameters).' },
        { id: 'qc-06-10-3', type: 'true-false', question: 'Overloading and overriding are the same concept.', correctAnswer: 'False', explanation: 'They are fundamentally different. Overloading = different signatures, same class. Overriding = same signature, parent-child. Both are forms of polymorphism but serve different purposes.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-06-10-1',
          scenario: 'You are designing a shape drawing system. You need: (1) draw a shape at a position, and (2) draw different shapes differently (circle draws round, rectangle draws box).',
          question: 'Which mechanism should you use for each requirement?',
          type: 'design-decision',
          options: [
            '(1) Overloading: draw(x, y) vs draw(x, y, size) — (2) Overriding: Circle.draw() vs Rectangle.draw()',
            '(1) Overriding: Shape.draw() overridden by each — (2) Overloading: draw(circle), draw(rectangle)',
            'Use overloading for both',
            'Use overriding for both',
          ],
          correctAnswer: '(1) Overloading: draw(x, y) vs draw(x, y, size) — (2) Overriding: Circle.draw() vs Rectangle.draw()',
          explanation: 'Different parameter lists (convenience) = overloading. Different behavior for subtypes (polymorphism) = overriding. Each serves a distinct design purpose.',
          relatedConcepts: ['overloading', 'overriding', 'design-choices'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-overloading-vs-overriding',
      prerequisites: ['lesson-06-02', 'lesson-06-04'],
      xpReward: 60,
      isUnlocked: true,
      completed: false,
      masteryScore: 0,
      visualizationType: 'overloading-vs-overriding',
      difficulty: 'medium',
      estimatedMinutes: 15,
    },
  ],
};
