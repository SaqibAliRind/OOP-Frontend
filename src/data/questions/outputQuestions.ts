import type { OutputQuestion } from '@/types';

export const outputQuestions: OutputQuestion[] = [
  {
    id: 'oq-001',
    lessonId: 'lesson-02-04',
    code: `public class Test {
    int x = 10;

    void modify(int x) {
        x = 20;
    }

    public static void main(String[] args) {
        Test t = new Test();
        t.modify(t.x);
        System.out.println(t.x);
    }
}`,
    options: ['10', '20', '0', 'Compilation error'],
    correctOutput: '10',
    explanation: 'Java passes primitives by value. The modify method receives a copy of x (10), changes the copy to 20, but the original field t.x remains 10.',
    romanUrduExplanation: 'Java primitives ko value by pass karta hai. Modify method x ki copy receive karta hai, copy change karta hai, lekin original t.x 10 rehta hai.',
    conceptTested: ['pass-by-value', 'primitives', 'methods'],
    difficulty: 'medium',
  },
  {
    id: 'oq-002',
    lessonId: 'lesson-02-04',
    code: `public class Test {
    int x = 10;

    void modify(Test other) {
        other.x = 20;
    }

    public static void main(String[] args) {
        Test t = new Test();
        t.modify(t);
        System.out.println(t.x);
    }
}`,
    options: ['10', '20', '0', 'NullPointerException'],
    correctOutput: '20',
    explanation: 'Objects are passed by reference value. The modify method receives a copy of the reference, but it points to the same object. Changing other.x changes t.x.',
    romanUrduExplanation: 'Objects reference value by pass hote hain. Modify method reference ki copy receive karta hai, lekin wo same object ko point karta hai.',
    conceptTested: ['pass-by-reference', 'objects', 'methods'],
    difficulty: 'medium',
  },
  {
    id: 'oq-003',
    lessonId: 'lesson-01-03',
    code: `class Animal {
    void sound() {
        System.out.println("Animal sounds");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Dog barks");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.sound();
    }
}`,
    options: ['Animal sounds', 'Dog barks', 'Compilation error', 'Runtime error'],
    correctOutput: 'Dog barks',
    explanation: 'Even though the reference type is Animal, the actual object is Dog. Dynamic method dispatch calls Dog\'s sound() at runtime.',
    romanUrduExplanation: 'Reference type Animal hai, lekin actual object Dog hai. Dynamic method dispatch runtime par Dog ka sound() call karta hai.',
    conceptTested: ['polymorphism', 'dynamic-dispatch', 'method-overriding'],
    difficulty: 'medium',
  },
  {
    id: 'oq-004',
    lessonId: 'lesson-06-06',
    code: `public class Main {
    public static void main(String[] args) {
        Object obj = "Hello";
        if (obj instanceof String) {
            String s = (String) obj;
            System.out.println(s.length());
        }
    }
}`,
    options: ['5', 'Hello', 'Compilation error', 'ClassCastException'],
    correctOutput: '5',
    explanation: 'The string "Hello" has 5 characters. instanceof check passes, safe downcasting succeeds, length() returns 5.',
    romanUrduExplanation: 'String "Hello" mein 5 characters hain. instanceof check pass hota hai, safe downcasting succeed hota hai, length() 5 return karta hai.',
    conceptTested: ['instanceof', 'downcasting', 'string'],
    difficulty: 'easy',
  },
  {
    id: 'oq-005',
    lessonId: 'lesson-01-05',
    code: `public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        int sum = 0;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] % 2 == 0) {
                sum += arr[i];
            }
        }
        System.out.println(sum);
    }
}`,
    options: ['5', '9', '15', '6'],
    correctOutput: '6',
    explanation: 'Even numbers in the array are 2 and 4. Their sum is 2 + 4 = 6.',
    romanUrduExplanation: 'Array mein even numbers 2 aur 4 hain. Unka sum 2 + 4 = 6 hai.',
    conceptTested: ['arrays', 'loops', 'conditionals'],
    difficulty: 'easy',
  },
  {
    id: 'oq-006',
    lessonId: 'lesson-03-03',
    code: `class Box {
    int width, height, depth;

    Box(int w, int h, int d) {
        width = w;
        height = h;
        depth = d;
    }

    Box(int size) {
        width = height = depth = size;
    }

    public static void main(String[] args) {
        Box b1 = new Box(2, 3, 4);
        Box b2 = new Box(5);
        System.out.println(b1.width + b2.width);
    }
}`,
    options: ['7', '5', '2', 'Compilation error'],
    correctOutput: '7',
    explanation: 'b1 uses the 3-parameter constructor (width=2). b2 uses the 1-parameter constructor (width=5). 2 + 5 = 7.',
    romanUrduExplanation: 'b1 3-parameter constructor use karta hai (width=2). b2 1-parameter constructor use karta hai (width=5). 2 + 5 = 7.',
    conceptTested: ['constructor-overloading', 'objects'],
    difficulty: 'easy',
  },
  {
    id: 'oq-007',
    lessonId: 'lesson-05-03',
    code: `class Base {
    void show() {
        System.out.println("Base");
    }
}

class Derived extends Base {
    @Override
    void show() {
        System.out.println("Derived");
    }

    void display() {
        System.out.println("Display");
    }
}

public class Main {
    public static void main(String[] args) {
        Base obj = new Derived();
        obj.show();
        obj.display(); // What happens?
    }
}`,
    options: ['Derived\\nDisplay', 'Base\\nDisplay', 'Compilation error', 'Derived\\nRuntime error'],
    correctOutput: 'Compilation error',
    explanation: 'Base reference can only call methods defined in Base. display() is defined in Derived, so calling it through a Base reference causes a compilation error.',
    romanUrduExplanation: 'Base reference sirf Base mein defined methods call kar sakta hai. display() Derived mein defined hai, isliye Base reference se call karne par compilation error hota hai.',
    conceptTested: ['reference-type', 'overriding', 'compilation'],
    difficulty: 'medium',
  },
  {
    id: 'oq-008',
    lessonId: 'lesson-06-07',
    code: `public class Main {
    public static void main(String[] args) {
        String s = null;
        try {
            System.out.println(s.length());
        } catch (NullPointerException e) {
            System.out.println("Caught NPE");
        } finally {
            System.out.println("Finally block");
        }
    }
}`,
    options: ['0\\nFinally block', 'Caught NPE\\nFinally block', 'NullPointerException', 'Finally block'],
    correctOutput: 'Caught NPE\\nFinally block',
    explanation: 's.length() throws NullPointerException. The catch block catches it and prints "Caught NPE". The finally block always executes, printing "Finally block".',
    romanUrduExplanation: 's.length() NullPointerException throw karta hai. Catch block use catch karta hai. Finally block hamesha execute hota hai.',
    conceptTested: ['exception-handling', 'try-catch-finally', 'null-pointer'],
    difficulty: 'medium',
  },
  {
    id: 'oq-009',
    lessonId: 'lesson-02-06',
    code: `class Calculator {
    int add(int a, int b) {
        return a + b;
    }

    double add(int a, int b, int c) {
        return a + b + c;
    }
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println(calc.add(2, 3));
        System.out.println(calc.add(2, 3, 4));
    }
}`,
    options: ['5\\n9', '5.0\\n9.0', 'Compilation error', '5\\n5'],
    correctOutput: '5\\n9',
    explanation: 'Method overloading: add(int, int) returns 5, add(int, int, int) returns 9. The compiler matches parameter count and types.',
    romanUrduExplanation: 'Method overloading: add(int, int) 5 return karta hai, add(int, int, int) 9 return karta hai. Compiler parameter count aur type match karta hai.',
    conceptTested: ['method-overloading', 'compile-time-polymorphism'],
    difficulty: 'easy',
  },
  {
    id: 'oq-010',
    lessonId: 'lesson-09-02',
    code: `public class Main {
    public static void main(String[] args) {
        final int x = 10;
        x = 20; // What happens?
        System.out.println(x);
    }
}`,
    options: ['10', '20', 'Compilation error', 'Runtime error'],
    correctOutput: 'Compilation error',
    explanation: 'A final variable cannot be reassigned after initialization. x = 20 causes a compilation error.',
    romanUrduExplanation: 'Final variable initialization ke baad reassign nahi ho sakta. x = 20 compilation error deta hai.',
    conceptTested: ['final', 'constants', 'immutability'],
    difficulty: 'easy',
  },
  {
    id: 'oq-011',
    lessonId: 'lesson-12-03',
    code: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("A");
        list.add("B");
        list.add("C");
        list.add(1, "X");
        System.out.println(list);
    }
}`,
    options: ['[A, X, B, C]', '[X, A, B, C]', '[A, B, X, C]', 'IndexOutOfBoundsException'],
    correctOutput: '[A, X, B, C]',
    explanation: 'ArrayList.add(index, element) inserts at the specified index, shifting subsequent elements. "X" is inserted at index 1.',
    romanUrduExplanation: 'ArrayList.add(index, element) specified index par insert karta hai, baaki elements shift karte hain. "X" index 1 par insert hota hai.',
    conceptTested: ['arraylist', 'collections', 'insertion'],
    difficulty: 'easy',
  },
  {
    id: 'oq-012',
    lessonId: 'lesson-10-03',
    code: `package com.example;

public class MyClass {
    protected int value = 10;
}

// In a DIFFERENT package:
package com.other;

import com.example.MyClass;

public class Test {
    public static void main(String[] args) {
        MyClass obj = new MyClass();
        System.out.println(obj.value); // What happens?
    }
}`,
    options: ['10', 'Compilation error', '0', 'Runtime error'],
    correctOutput: 'Compilation error',
    explanation: 'Protected members are accessible within the same package and by subclasses. In a different package, a non-subclass cannot access protected members directly.',
    romanUrduExplanation: 'Protected members same package mein aur subclasses ke liye accessible hain. Doosre package mein, non-subclass directly access nahi kar sakta.',
    conceptTested: ['access-modifiers', 'protected', 'packages'],
    difficulty: 'medium',
  },
];
