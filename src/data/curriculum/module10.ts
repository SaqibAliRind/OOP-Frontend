import type { Module } from '@/types';

export const module10: Module = {
  id: 'module-10',
  title: 'Packages and Access Control',
  slug: 'packages-and-access-control',
  order: 10,
  description: 'Master Java packages and access control mechanisms. Learn how to organize code into packages, control visibility with access modifiers, and build well-structured, maintainable applications.',
  icon: 'Package',
  color: '#8b5cf6',
  xpReward: 600,
  isUnlocked: false,
  completed: false,
  progress: 0,
  totalDuration: 200,
  prerequisiteModuleIds: ['module-09'],
  lessons: [
    {
      id: 'lesson-10-01',
      moduleId: 'module-10',
      title: 'What are Packages?',
      slug: 'what-are-packages',
      order: 1,
      duration: 15,
      description: 'Understand what packages are, why they exist, and how Java uses them for code organization.',
      learningObjectives: [
        { id: 'lo-10-01-1', description: 'Define what a Java package is and its purpose', completed: false },
        { id: 'lo-10-01-2', description: 'Explain the naming conventions for packages', completed: false },
        { id: 'lo-10-01-3', description: 'Identify common built-in Java packages', completed: false },
        { id: 'lo-10-01-4', description: 'Create and use packages in a Java project', completed: false },
      ],
      englishExplanation: {
        id: 'ee-10-01',
        text: `A package in Java is a namespace that groups related classes, interfaces, and sub-packages together. Think of it as a folder on your file system — just as folders organize files into logical groups, packages organize Java code into logical modules.

Packages serve two primary purposes. First, they prevent naming conflicts. Without packages, if two developers both created a class called "Logger", there would be a naming collision. Packages resolve this by providing unique namespaces — com.company.Logger and org.project.Logger can coexist without conflict.

Second, packages provide access control. Classes within the same package can access each other's package-private members, while classes in different packages cannot. This is the foundation of encapsulation at the package level.

Java has two types of packages. Named packages have a specific name declared with the \`package\` keyword. The default package has no name and is used when no package declaration is present. Named packages are always preferred in professional development.

Package naming conventions in Java follow the reversed domain name convention. If your organization owns the domain "acme.com", your packages would start with com.acme. For example:
- com.acme.payroll — for payroll-related classes
- com.acme.payroll.models — for data model classes
- com.acme.payroll.services — for business logic classes

The Java platform itself organizes its vast library into packages. The \`java.lang\` package contains fundamental classes like String, Math, and System — this package is automatically imported. The \`java.util\` package contains utility classes like ArrayList, HashMap, and Date. The \`java.io\` package handles input/output operations. The \`java.net\` package provides networking capabilities.

A package declaration must be the first line in a Java source file (before any class or interface declarations). The package name must match the directory structure where the file is stored. A file containing \`package com.acme.payroll;\` must be located in a directory structure: com/acme/payroll/.`
      },
      romanUrduExplanation: {
        id: 'ru-10-01',
        text: `Package Java mein ek namespace hai jo related classes, interfaces aur sub-packages ko group karta hai. Isko apne file system ki folder ki tarah samajh sakte hain — jaise folders files ko logical groups mein organize karte hain, packages Java code ko logical modules mein organize karte hain.

Packages ke do primary purposes hain. Pehla, ye naming conflicts prevent karte hain. Bina packages ke, agar dono developers ne "Logger" naam ki class banayi, toh naming collision ho jayega. Packages unique namespaces provide karke is problem ko solve karte hain — com.company.Logger aur org.project.Logger bina conflict ke exist kar sakte hain.

Doosra, packages access control provide karte hain. Same package ki classes ek dusre ke package-private members ko access kar sakti hain, jabke different packages ki classes nahi kar sakti. Ye package level par encapsulation ki foundation hai.

Java mein do tarah ke packages hain. Named packages mein ek specific name hota hai jo \`package\` keyword se declare hota hai. Default package ka koi name nahi hota aur jab koi package declaration nahi hoti toh use kiya jaata hai. Professional development mein hamesha named packages prefer kiye jaate hain.

Package naming conventions Java mein reversed domain name convention follow karte hain. Agar aapki organization "acme.com" domain own karti hai, toh aapke packages com.acme se shuru honge. Jaise:
- com.acme.payroll — payroll-related classes ke liye
- com.acme.payroll.models — data model classes ke liye
- com.acme.payroll.services — business logic classes ke liye

Package declaration Java source file mein sabse pehli line honi chahiye (kisi bhi class ya interface declaration se pehle). Package name us directory structure se match hona chahiye jahan file stored hai.`
      },
      keyPoints: [
        { id: 'kp-10-01-1', title: 'Namespace', description: 'Packages provide unique namespaces to prevent class name conflicts across different libraries and projects.' },
        { id: 'kp-10-01-2', title: 'Directory Structure', description: 'Package names directly correspond to directory paths. com.acme.util maps to com/acme/util/ folder.' },
        { id: 'kp-10-01-3', title: 'Package Declaration', description: 'The package statement must be the first declaration in a Java file, before any imports or class definitions.' },
        { id: 'kp-10-01-4', title: 'Naming Convention', description: 'Use reversed domain names: com.company.project.module. All lowercase, no special characters.' },
      ],
      codeExamples: [
        {
          id: 'ce-10-01-1',
          title: 'Package Declaration and Usage',
          code: `// File: com/acme/payroll/Employee.java
package com.acme.payroll;

public class Employee {
    private String name;
    private double salary;

    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    public String getName() { return name; }
    public double getSalary() { return salary; }
}

// File: com/acme/payroll/Department.java
package com.acme.payroll;

public class Department {
    private String deptName;
    private Employee[] employees;

    public Department(String name) {
        this.deptName = name;
    }
}`,
          language: 'java',
          explanation: 'Both Employee and Department are in the same package com.acme.payroll. They can access each other\'s package-private members without any import statements.',
        },
        {
          id: 'ce-10-01-2',
          title: 'Sub-packages',
          code: `// File: com/acme/payroll/models/Salary.java
package com.acme.payroll.models;

public class Salary {
    private double base;
    private double bonus;

    public Salary(double base, double bonus) {
        this.base = base;
        this.bonus = bonus;
    }

    public double getTotal() { return base + bonus; }
}

// File: com/acme/payroll/services/PayrollService.java
package com.acme.payroll.services;

import com.acme.payroll.models.Salary;

public class PayrollService {
    public double calculatePay(Salary salary) {
        return salary.getTotal();
    }
}`,
          language: 'java',
          explanation: 'Sub-packages are separate packages. Salary is in models sub-package and PayrollService is in services sub-package. Even though they share a parent package, they need explicit imports.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-10-01-1',
          title: 'E-Commerce Application Package Structure',
          scenario: 'An e-commerce application needs to organize code for users, products, orders, and payments.',
          oopConcept: 'Package-per-feature organization: com.shop.models.User, com.shop.services.OrderService, com.shop.repositories.ProductRepository. Each package groups related classes by functionality.',
          codeExample: {
            id: 'rwe-code-10-01-1',
            title: 'E-Commerce Package Structure',
            code: `com.shop
├── models/
│   ├── User.java
│   ├── Product.java
│   └── Order.java
├── services/
│   ├── UserService.java
│   ├── OrderService.java
│   └── PaymentService.java
├── repositories/
│   ├── UserRepository.java
│   └── ProductRepository.java
└── utils/
    └── ValidationHelper.java`,
            language: 'java',
          },
        },
      ],
      commonMistakes: [
        {
          id: 'cm-10-01-1',
          title: 'Package Name Does Not Match Directory',
          incorrectCode: `// File located at: src/Employee.java
// But declaration says:
package com.acme.payroll;

public class Employee {
    // This will cause a compilation error!
    // The file must be in com/acme/payroll/ directory
}`,
          correctCode: `// File MUST be located at: src/com/acme/payroll/Employee.java
package com.acme.payroll;

public class Employee {
    // Package declaration matches directory structure
}`,
          explanation: 'The package declaration must exactly match the directory structure where the Java file is stored. If the declaration says com.acme.payroll, the file must be in a com/acme/payroll/ directory.',
        },
        {
          id: 'cm-10-01-2',
          title: 'Using Default Package',
          incorrectCode: `// File: Main.java (no package declaration)
import com.acme.payroll.Employee; // can import named packages

public class Main {
    // This works, but default package cannot import named packages
    // com.acme.payroll.AnotherClass ac; // COMPILE ERROR!
}`,
          correctCode: `// File: com/acme/app/Main.java
package com.acme.app;

import com.acme.payroll.Employee;

public class Main {
    public static void main(String[] args) {
        Employee e = new Employee("Ahmed", 50000);
    }
}`,
          explanation: 'Default package classes cannot import named package classes. Always use named packages for all classes in professional development.',
        },
      ],
      examNotes: [
        { id: 'en-10-01-1', title: 'Package Purpose', content: 'Packages provide namespace organization and access control. They prevent naming conflicts and group related classes together.', importance: 'high' },
        { id: 'en-10-01-2', title: 'Naming Convention', content: 'Use reversed domain naming: com.company.project. All lowercase. No spaces or special characters.', importance: 'medium' },
        { id: 'en-10-01-3', title: 'Package-Directory Match', content: 'Package declaration must match the file system directory structure exactly. This is a common exam and interview question.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-10-01-1', question: 'What is a package in Java?', answer: 'A package is a namespace that groups related classes and interfaces. It prevents naming conflicts and provides access control between classes.', difficulty: 'easy' },
        { id: 'vq-10-01-2', question: 'Why do we use reversed domain names for packages?', answer: 'Reversed domain names ensure global uniqueness. Since domain names are unique (owned by specific organizations), reversing them guarantees package names do not conflict.', difficulty: 'medium' },
        { id: 'vq-10-01-3', question: 'What happens if package declaration does not match directory?', answer: 'The Java compiler throws an error. The package declaration must exactly match the directory structure where the file is stored.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-10-01-1', type: 'mcq', question: 'What is the primary purpose of a Java package?', options: ['To make code run faster', 'To organize related classes and prevent naming conflicts', 'To hide all classes from other developers', 'To replace the import statement'], correctAnswer: 'To organize related classes and prevent naming conflicts', explanation: 'Packages organize code into logical groups and provide unique namespaces to prevent class name collisions.' },
        { id: 'qc-10-01-2', type: 'true-false', question: 'The package declaration must be the first line in a Java source file.', correctAnswer: 'True', explanation: 'The package statement must appear before any import statements or class declarations.' },
        { id: 'qc-10-01-3', type: 'mcq', question: 'Which package is automatically imported in every Java program?', options: ['java.util', 'java.io', 'java.lang', 'java.net'], correctAnswer: 'java.lang', explanation: 'The java.lang package is automatically imported. It contains fundamental classes like String, Math, System, and Object.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-10-01-1',
          scenario: 'You are building a library management system. You need to organize classes for Book, Member, Loan, and Notification.',
          question: 'How would you design the package structure?',
          type: 'architecture',
          options: [
            'Put all classes in the default package',
            'Create one package per class: com.library.book, com.library.member, etc.',
            'Create logical packages: com.library.models, com.library.services, com.library.utils',
            'Put everything in java.library package',
          ],
          correctAnswer: 'Create logical packages: com.library.models, com.library.services, com.library.utils',
          explanation: 'Organizing by functionality (models, services, utils) creates a clean, maintainable structure. Each package groups related classes by their role in the system.',
          relatedConcepts: ['package-organization', 'naming-conventions', 'separation-of-concerns'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-packages-intro',
      prerequisites: ['lesson-09-01'],
      xpReward: 60,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'package-hierarchy',
      difficulty: 'easy',
      estimatedMinutes: 15,
    },
    {
      id: 'lesson-10-02',
      moduleId: 'module-10',
      title: 'Import Statements',
      slug: 'import-statements',
      order: 2,
      duration: 15,
      description: 'Master the different types of import statements in Java: single, wildcard, static, and understand automatic imports.',
      learningObjectives: [
        { id: 'lo-10-02-1', description: 'Use single-type import to bring specific classes', completed: false },
        { id: 'lo-10-02-2', description: 'Apply wildcard imports to import entire packages', completed: false },
        { id: 'lo-10-02-3', description: 'Use static imports to access static members directly', completed: false },
        { id: 'lo-10-02-4', description: 'Understand which packages are automatically imported', completed: false },
      ],
      englishExplanation: {
        id: 'ee-10-02',
        text: `Import statements tell the Java compiler where to find classes and interfaces that are defined in other packages. Without imports, you would need to use fully qualified names everywhere, making code verbose and hard to read.

**Single-Type Import** is the most common form. It imports one specific class by its fully qualified name. When you write \`import java.util.ArrayList;\`, you can then use \`ArrayList\` directly instead of writing \`java.util.ArrayList\` every time. This makes your code cleaner and more readable.

**Wildcard Import** uses an asterisk (*) to import all public classes and interfaces from a package. \`import java.util.*;\` imports everything from java.util — ArrayList, HashMap, LinkedList, and all other classes. Wildcard imports are convenient but have drawbacks: they can cause naming conflicts if two imported packages have classes with the same name, and they make it unclear which classes are actually being used.

**Static Import** allows you to access static members of a class without qualifying them with the class name. \`import static java.lang.Math.PI;\` lets you use \`PI\` directly instead of \`Math.PI\`. \`import static java.lang.System.out;\` lets you write \`out.println()\` instead of \`System.out.println()\`. Static imports are commonly used with constants and utility methods.

**Automatic Imports**: Java automatically imports the entire \`java.lang\` package in every Java program. This is why you can use String, System, Math, and Object without any import statement. The following packages are always available without import: java.lang, java.lang.String, java.lang.Object, java.lang.System, and all their sub-packages.

**Import Rules and Best Practices**:
1. Import statements must come after the package declaration and before the class declaration.
2. You cannot import two classes with the same name from different packages — this causes a compile error.
3. Wildcard imports do not import sub-packages. \`import java.util.*\` does NOT import java.util.concurrent classes.
4. Unused imports generate a warning but do not cause errors.
5. Most IDEs can automatically organize imports for you.

The recommended practice is to prefer single-type imports over wildcards. They make dependencies explicit and prevent naming conflicts. Only use wildcards when importing many classes from the same package.`
      },
      romanUrduExplanation: {
        id: 'ru-10-02',
        text: `Import statements compiler ko batati hain ke dusre packages mein define ki gayi classes aur interfaces kahan milengi. Bina imports ke, aapko har jagah fully qualified names use karne padenge, jo code ko verbose aur mushkil bana deta hai.

**Single-Type Import** sabse common form hai. Ye ek specific class ko us fully qualified name se import karta hai. Jab aap \`import java.util.ArrayList;\` likhte hain, toh aap seedha \`ArrayList\` use kar sakte hain — \`java.util.ArrayList\` baar baar likhne ki zaroorat nahi.

**Wildcard Import** asterisk (*) use karke ek package ki sab public classes import karta hai. \`import java.util.*;\` java.util ki sab kuch import karta hai — ArrayList, HashMap, LinkedList. Wildcard convenient hai lekin naming conflicts ho sakti hain agar do packages mein same naam ki classes hon.

**Static Import** aapko static members ko class name ke bina access karne deta hai. \`import static java.lang.Math.PI;\` se aap seedha \`PI\` likh sakte hain \`Math.PI\` ki jagah.

**Automatic Imports**: Java har program mein \`java.lang\` package automatically import karta hai. Isliye aap String, System, Math, aur Object bina kisi import ke use kar sakte hain.

Import rules:
1. Package declaration ke baad aur class declaration se pehle aane chahiye.
2. Do different packages se same naam ki classes import nahi kar sakte.
3. Wildcard imports sub-packages ko import nahi karte.
4. Unused imports warning dete hain lekin error nahi.
5. Single-type imports wildcard se better hain kyunki dependencies clear hain.`
      },
      keyPoints: [
        { id: 'kp-10-02-1', title: 'Single Import', description: 'Imports one specific class: import com.acme.model.User; Clean, explicit, no ambiguity.' },
        { id: 'kp-10-02-2', title: 'Wildcard Import', description: 'Imports all public classes from a package: import java.util.*; Convenient but can cause naming conflicts.' },
        { id: 'kp-10-02-3', title: 'Static Import', description: 'Imports static members: import static java.lang.Math.PI; Use PI directly without Math qualifier.' },
        { id: 'kp-10-02-4', title: 'Auto Import', description: 'java.lang is automatically imported in every Java program. No import statement needed for String, System, Math, Object.' },
      ],
      codeExamples: [
        {
          id: 'ce-10-02-1',
          title: 'Types of Imports',
          code: `// Single-type import
import java.util.ArrayList;
import java.util.HashMap;

// Wildcard import (imports ALL classes in java.util)
import java.util.*;

// Static import
import static java.lang.Math.PI;
import static java.lang.Math.sqrt;

public class ImportDemo {
    public static void main(String[] args) {
        // Without import, you would write: java.util.ArrayList<String>
        ArrayList<String> list = new ArrayList<>();
        list.add("Hello");

        // Using static import: PI instead of Math.PI
        double area = PI * 5 * 5;

        // Using static import: sqrt instead of Math.sqrt
        double result = sqrt(144);

        System.out.println("Area: " + area);
        System.out.println("Square root: " + result);
    }
}`,
          language: 'java',
          output: 'Area: 78.53981633974483\nSquare root: 12.0',
          explanation: 'Single imports bring specific classes. Wildcard imports bring everything from a package. Static imports let you use static members without the class qualifier.',
        },
        {
          id: 'ce-10-02-2',
          title: 'Static Import for Constants',
          code: `// File: com/acme/utils/Constants.java
package com.acme.utils;

public class Constants {
    public static final int MAX_LOGIN_ATTEMPTS = 5;
    public static final double TAX_RATE = 0.08;
    public static final String APP_NAME = "MyApp";
}

// File: com/acme/app/LoginService.java
package com.acme.app;

import static com.acme.utils.Constants.MAX_LOGIN_ATTEMPTS;
import static com.acme.utils.Constants.TAX_RATE;

public class LoginService {
    private int attempts = 0;

    public boolean login(String user, String pass) {
        if (attempts >= MAX_LOGIN_ATTEMPTS) {
            System.out.println("Account locked!");
            return false;
        }
        attempts++;
        return validate(user, pass);
    }

    private boolean validate(String user, String pass) {
        return true;
    }
}`,
          language: 'java',
          explanation: 'Static imports make constants readable. MAX_LOGIN_ATTEMPTS is used directly without Constants.MAX_LOGIN_ATTEMPTS qualification.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-10-02-1',
          title: 'JUnit Test Imports',
          scenario: 'Writing unit tests with JUnit requires many imports from different packages.',
          oopConcept: 'Test classes typically import specific assertions and annotations, using both single and static imports for readability.',
          codeExample: {
            id: 'rwe-code-10-02-1',
            title: 'Typical JUnit Test Imports',
            code: `import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class EmployeeTest {
    @Test
    void testSalary() {
        assertEquals(50000, employee.getSalary());
        assertTrue(employee.isActive());
    }
}`,
            language: 'java',
          },
        },
      ],
      commonMistakes: [
        {
          id: 'cm-10-02-1',
          title: 'Name Collision from Wildcard Import',
          incorrectCode: `import java.util.*;
import java.sql.*;

public class Conflict {
    public static void main(String[] args) {
        // ERROR: ambiguous — which Date do you mean?
        Date d = new Date();
    }
}`,
          correctCode: `import java.util.Date;
// or
import java.sql.Date;

public class Conflict {
    public static void main(String[] args) {
        // Now there's no ambiguity
        java.util.Date d = new java.util.Date();
    }
}`,
          explanation: 'Wildcard imports from java.util and java.sql both include a Date class. This causes ambiguity. Use single-type imports to resolve the conflict.',
        },
        {
          id: 'cm-10-02-2',
          title: 'Import After Class Declaration',
          incorrectCode: `public class Bad {
    // ERROR: import must come before class declaration
}

import java.util.ArrayList;`,
          correctCode: `// Package declaration first (if any)
import java.util.ArrayList;  // Then imports

public class Good {
    // Class body
}`,
          explanation: 'Import statements must come after any package declaration and before the class declaration. Placing them after the class causes a compilation error.',
        },
      ],
      examNotes: [
        { id: 'en-10-02-1', title: 'Import Order', content: 'Package declaration first, then imports, then class declaration. This order is mandatory and tested in exams.', importance: 'high' },
        { id: 'en-10-02-2', title: 'Auto-imported Packages', content: 'java.lang is always auto-imported. Know which classes are in java.lang: String, System, Math, Object, Integer, etc.', importance: 'high' },
        { id: 'en-10-02-3', title: 'Static Import Usage', content: 'Static imports are mainly used for constants and utility methods. Common in test code and mathematical calculations.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-10-02-1', question: 'What is the difference between single import and wildcard import?', answer: 'Single import brings one specific class (import java.util.ArrayList). Wildcard brings all public classes from a package (import java.util.*). Single imports are preferred to avoid naming conflicts.', difficulty: 'easy' },
        { id: 'vq-10-02-2', question: 'What is a static import and when would you use it?', answer: 'Static import lets you access static members without the class name qualifier. Use it for constants (Math.PI → PI) and utility methods (Math.sqrt → sqrt) to make code cleaner.', difficulty: 'medium' },
        { id: 'vq-10-02-3', question: 'Which package is automatically imported?', answer: 'java.lang is automatically imported. Classes like String, System, Math, Object, and Integer are available without any import statement.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-10-02-1', type: 'mcq', question: 'Which import type can cause naming conflicts?', options: ['Single-type import', 'Static import', 'Wildcard import', 'Package import'], correctAnswer: 'Wildcard import', explanation: 'Wildcard imports bring all classes from a package. If two packages have a class with the same name, a naming conflict occurs.' },
        { id: 'qc-10-02-2', type: 'true-false', question: 'Wildcard imports also import classes from sub-packages.', correctAnswer: 'False', explanation: 'import java.util.* imports only classes directly in java.util, not sub-packages like java.util.concurrent.' },
        { id: 'qc-10-02-3', type: 'mcq', question: 'Where must import statements be placed?', options: ['After the class declaration', 'Before the package declaration', 'After package declaration, before class declaration', 'Anywhere in the file'], correctAnswer: 'After package declaration, before class declaration', explanation: 'Import statements must come after any package statement and before the class or interface declaration.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-10-02-1',
          scenario: 'You need to use 15 classes from java.util package in your class.',
          question: 'What is the best practice for importing them?',
          type: 'design-decision',
          options: [
            'Use wildcard import: import java.util.*;',
            'Use 15 separate single-type imports',
            'Use fully qualified names without imports',
            'Use static imports for all of them',
          ],
          correctAnswer: 'Use 15 separate single-type imports',
          explanation: 'Single-type imports are preferred because they make dependencies explicit, prevent naming conflicts, and make the code more maintainable. IDEs can auto-generate them.',
          relatedConcepts: ['import-best-practices', 'code-readability', 'naming-conflicts'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-import-types',
      prerequisites: ['lesson-10-01'],
      xpReward: 60,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'import-flow',
      difficulty: 'easy',
      estimatedMinutes: 15,
    },
    {
      id: 'lesson-10-03',
      moduleId: 'module-10',
      title: 'Access Modifiers Deep Dive',
      slug: 'access-modifiers-deep-dive',
      order: 3,
      duration: 20,
      description: 'Comprehensive exploration of all four Java access modifiers: public, private, protected, and default (package-private).',
      learningObjectives: [
        { id: 'lo-10-03-1', description: 'Define all four access modifiers and their visibility levels', completed: false },
        { id: 'lo-10-03-2', description: 'Determine which modifier to use in different scenarios', completed: false },
        { id: 'lo-10-03-3', description: 'Understand the access level hierarchy from most to least restrictive', completed: false },
        { id: 'lo-10-03-4', description: 'Apply access modifiers correctly to fields, methods, and constructors', completed: false },
      ],
      englishExplanation: {
        id: 'ee-10-03',
        text: `Access modifiers in Java control the visibility and accessibility of classes, methods, and fields. They are the mechanism through which Java implements encapsulation — one of the four pillars of OOP.

**public** is the least restrictive modifier. A public member is accessible from anywhere — any class, any package, any project. When you declare a class as public, any other class can create objects of that type. Public methods form the interface through which objects interact. Example: \`public class User { public String getName() { return name; } }\` — both the class and method are accessible from everywhere.

**private** is the most restrictive modifier. A private member is accessible only within the same class. No other class, not even subclasses, can access private members. Private fields hide internal state. Private methods provide internal helper functionality that should not be exposed. Example: \`private String password;\` — only the class itself can access the password.

**default** (package-private) has no keyword. When you omit the access modifier, the member becomes accessible to all classes within the same package, but not to classes in other packages. This is useful for utility classes and helper methods that should be shared within a package but not exposed to external code. Example: \`class Helper { void doWork() { } }\` — accessible to all classes in the same package.

**protected** is accessible to all classes in the same package AND to subclasses in other packages. It is less restrictive than default but more restrictive than public. Protected members are typically used in inheritance hierarchies where subclasses need access to parent class implementation details. Example: \`protected void calculate() { }\` — subclasses can override this method even if they are in different packages.

The access level hierarchy from most to least restrictive:
private (0) → default (1) → protected (2) → public (3)

When choosing access modifiers, start with the most restrictive and open up only as needed. This principle of "least privilege" ensures maximum encapsulation and security. Fields should almost always be private. Methods should be public for the API, private for implementation details, and protected for extensibility.`
      },
      romanUrduExplanation: {
        id: 'ru-10-03',
        text: `Java mein access modifiers classes, methods aur fields ki visibility aur accessibility control karte hain. Ye wo mechanism hai jiske through Java encapsulation implement karta hai — OOP ke four pillars mein se ek.

**public** sabse kam restrictive modifier hai. Public member kahin se bhi accessible hai — kisi bhi class, kisi bhi package, kisi bhi project se. Jab aap class ko public declare karte hain, toh koi bhi class us type ke objects create kar sakti hai.

**private** sabse zyada restrictive modifier hai. Private member sirf usi class ke andar accessible hai. Koi doosri class, chahe subclass bhi, private members ko access nahi kar sakti. Private fields internal state chupati hain.

**default** (package-private) ka koi keyword nahi hota. Jab access modifier omit karte hain, toh member usi package ki sab classes ke liye accessible ho jaata hai, lekin doosre packages ki classes ke liye nahi.

**protected** same package ki sab classes AND doosre packages ki subclasses ke liye accessible hai. Ye default se kam restrictive hai lekin public se zyada. Protected members inheritance hierarchies mein use hote hain.

Access level hierarchy sabse restrictive se kam restrictive tak:
private (0) → default (1) → protected (2) → public (3)

Access modifier choose karte waqt sabse restrictive se shuru karein aur sirf zaroorat par open karein. Fields hamesha private honi chahiye. Methods: public API ke liye public, implementation details ke liye private, aur extensibility ke liye protected.`
      },
      keyPoints: [
        { id: 'kp-10-03-1', title: 'public', description: 'Accessible from anywhere. Use for classes, interfaces, and methods that form the public API.' },
        { id: 'kp-10-03-2', title: 'private', description: 'Accessible only within the same class. Use for fields and helper methods to enforce encapsulation.' },
        { id: 'kp-10-03-3', title: 'default', description: 'No keyword needed. Accessible within the same package. Use for package-level utility classes and methods.' },
        { id: 'kp-10-03-4', title: 'protected', description: 'Accessible in same package + subclasses in other packages. Use for inheritance-based extensibility.' },
        { id: 'kp-10-03-5', title: 'Least Privilege', description: 'Always start with the most restrictive modifier and open up only as needed.' },
      ],
      codeExamples: [
        {
          id: 'ce-10-03-1',
          title: 'All Four Access Modifiers',
          code: `package com.acme.model;

public class Person {
    // Public: accessible from anywhere
    public String name;

    // Private: accessible only within Person class
    private int age;

    // Default (no modifier): accessible within com.acme.model package
    String email;

    // Protected: accessible in same package + subclasses
    protected String address;

    // Private method: internal helper
    private boolean isAdult() {
        return age >= 18;
    }

    // Public method: part of the API
    public String getInfo() {
        return name + " (" + (isAdult() ? "Adult" : "Minor") + ")";
    }

    // Protected method: for subclass use
    protected void updateAddress(String newAddress) {
        this.address = newAddress;
    }
}`,
          language: 'java',
          explanation: 'This Person class demonstrates all four access modifiers. Each modifier serves a different purpose based on the access level needed.',
        },
        {
          id: 'ce-10-03-2',
          title: 'Access Modifier with Constructors',
          code: `package com.acme.model;

public class Account {
    private String accountId;
    private double balance;

    // Private constructor: prevents external instantiation
    private Account(String id, double initialBalance) {
        this.accountId = id;
        this.balance = initialBalance;
    }

    // Public factory method: controlled object creation
    public static Account createAccount(String id, double initial) {
        if (initial < 0) throw new IllegalArgumentException("Balance cannot be negative");
        return new Account(id, initial);
    }

    // Public methods for the API
    public double getBalance() { return balance; }

    // Package-private method: for internal use
    void freeze() {
        System.out.println("Account " + accountId + " frozen.");
    }
}`,
          language: 'java',
          explanation: 'A private constructor with a public factory method demonstrates how access modifiers control object creation and enforce business rules.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-10-03-1',
          title: 'Banking Application Access Control',
          scenario: 'A banking system needs to protect sensitive customer data while providing necessary functionality.',
          oopConcept: 'Private fields for sensitive data (balance, password), public methods for legitimate operations (deposit, withdraw), protected methods for account extensions, and package-private for internal utilities.',
          codeExample: {
            id: 'rwe-code-10-03-1',
            title: 'Bank Account Access Levels',
            code: `public class BankAccount {
    private double balance;      // Never expose directly
    private String owner;        // Sensitive data

    public double getBalance() { // Controlled access
        return balance;
    }

    protected void adjustForFees(double fee) { // For subclasses
        balance -= fee;
    }

    void logTransaction(String type) { // Package-level utility
        System.out.println(type + ": " + balance);
    }
}`,
            language: 'java',
          },
        },
      ],
      commonMistakes: [
        {
          id: 'cm-10-03-1',
          title: 'Making Everything Public',
          incorrectCode: `public class BadDesign {
    public String password;    // SECURITY RISK!
    public double balance;     // Anyone can modify!
    public void internalMethod() { } // Exposed implementation
}`,
          correctCode: `public class GoodDesign {
    private String password;    // Hidden
    private double balance;     // Protected

    public String getPassword() { return password; }
    public double getBalance() { return balance; }

    private void internalMethod() { } // Hidden implementation
}`,
          explanation: 'Making fields public breaks encapsulation and creates security risks. Fields should be private with public getters/setters for controlled access.',
        },
        {
          id: 'cm-10-03-2',
          title: 'Using Protected Instead of Private',
          incorrectCode: `class User {
    protected String ssn;  // Too open! Subclasses shouldn't need SSN
}`,
          correctCode: `class User {
    private String ssn;  // Only this class needs SSN

    protected String getMaskedSSN() {
        return "XXX-XX-" + ssn.substring(7);
    }
}`,
          explanation: 'Sensitive data like SSN should be private. If subclasses need access, provide a controlled protected method that limits what they can see.',
        },
      ],
      examNotes: [
        { id: 'en-10-03-1', title: 'Access Modifier Table', content: 'Memorize: private (same class) → default (same package) → protected (same package + subclasses) → public (everywhere).', importance: 'high' },
        { id: 'en-10-03-2', title: 'Default is Not a Keyword', content: 'Default access has no keyword. Simply omit the modifier. This is a common exam question.', importance: 'high' },
        { id: 'en-10-03-3', title: 'protected vs default', content: 'Protected adds subclass access across packages. Default is limited to the same package only.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-10-03-1', question: 'What is the difference between default and protected access?', answer: 'Default access is limited to classes within the same package. Protected access includes same package plus subclasses in other packages.', difficulty: 'medium' },
        { id: 'vq-10-03-2', question: 'Why should fields almost always be private?', answer: 'Private fields enforce encapsulation. They prevent external code from setting invalid values and allow the class to control how its data is accessed and modified.', difficulty: 'easy' },
        { id: 'vq-10-03-3', question: 'What access modifier allows a subclass in another package to access a method?', answer: 'Protected modifier. It allows access to same-package classes and subclasses in different packages.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-10-03-1', type: 'mcq', question: 'Which access modifier allows access from anywhere?', options: ['private', 'default', 'protected', 'public'], correctAnswer: 'public', explanation: 'Public is the least restrictive modifier. Public members are accessible from any class in any package.' },
        { id: 'qc-10-03-2', type: 'true-false', question: 'A private method can be accessed by a subclass.', correctAnswer: 'False', explanation: 'Private methods are only accessible within the same class. Subclasses cannot see or override private methods.' },
        { id: 'qc-10-03-3', type: 'mcq', question: 'What keyword do you use for default access?', options: ['default', 'package', 'internal', 'No keyword needed'], correctAnswer: 'No keyword needed', explanation: 'Default access is achieved by omitting any access modifier. There is no specific keyword for it.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-10-03-1',
          scenario: 'You are designing a PaymentProcessor class that handles credit card processing. The card number must never be exposed outside the class.',
          question: 'What access modifier should the cardNumber field have?',
          type: 'design-decision',
          options: [
            'public — so other classes can process payments',
            'protected — so payment subclasses can access it',
            'default — so other classes in the package can use it',
            'private — so only this class can access it',
          ],
          correctAnswer: 'private — so only this class can access it',
          explanation: 'Sensitive data like credit card numbers should always be private. The PaymentProcessor class handles all card operations internally, never exposing the raw number.',
          relatedConcepts: ['encapsulation', 'data-hiding', 'security'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-access-modifiers',
      prerequisites: ['lesson-10-01', 'lesson-10-02'],
      xpReward: 75,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'access-levels',
      difficulty: 'medium',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-10-04',
      moduleId: 'module-10',
      title: 'Access Modifier Rules',
      slug: 'access-modifier-rules',
      order: 4,
      duration: 20,
      description: 'Learn the comprehensive rules governing access modifiers for classes, methods, fields, and constructors across packages and inheritance.',
      learningObjectives: [
        { id: 'lo-10-04-1', description: 'Apply access modifier rules to top-level classes', completed: false },
        { id: 'lo-10-04-2', description: 'Determine method accessibility across class hierarchies', completed: false },
        { id: 'lo-10-04-3', description: 'Understand constructor access rules and their implications', completed: false },
        { id: 'lo-10-04-4', description: 'Identify valid and invalid access modifier combinations', completed: false },
      ],
      englishExplanation: {
        id: 'ee-10-04',
        text: `Access modifier rules differ depending on whether you are applying them to classes, methods, fields, or constructors. Understanding these rules is essential for writing correct Java code.

**Top-Level Classes**: A top-level class can only be public or have default (package-private) access. You cannot declare a top-level class as private or protected. If a class is public, it is accessible everywhere. If it has default access, it is only accessible within the same package.

**Inner Classes (Nested Classes)**: Inner classes can use all four access modifiers. A private inner class is only visible to the enclosing class. A protected inner class is visible to the enclosing class, same-package classes, and subclasses. An inner class with default access is visible within the same package.

**Methods**: Methods can use all four access modifiers. The overriding method in a subclass cannot have a more restrictive access modifier than the parent method. If the parent method is protected, the child cannot make it private. The child can make it public or protected (same or less restrictive). This rule ensures that polymorphism works — if code can call the parent method, it should also be able to call the child method.

**Fields**: Fields can use all four access modifiers. There are no overriding rules for fields — fields are not polymorphic. If a subclass declares a field with the same name as a parent field, it creates a new field that shadows the parent field. This is generally bad practice.

**Constructors**: Constructors can use all four modifiers. A private constructor prevents external instantiation (useful for singleton patterns). A protected constructor allows subclasses in other packages to call super(). A default constructor is accessible within the same package.

**Interface Members**: All interface methods are implicitly public. All fields are implicitly public static final. You cannot change these implicit modifiers.

**Final Rules**:
1. Overriding methods cannot be more restrictive than the parent.
2. Fields can have any access modifier but are not polymorphic.
3. Constructors follow method rules but cannot be overridden.
4. Abstract methods must be at least protected if the class is to be extended.`
      },
      romanUrduExplanation: {
        id: 'ru-10-04',
        text: `Access modifier rules alag hain jab aap inhe classes, methods, fields ya constructors par apply karte hain. Ye rules samajhna sahi Java code likhne ke liye zaroori hai.

**Top-Level Classes**: Top-level class sirf public ho sakti hai ya default (package-private) access ho sakti hai. Aap top-level class ko private ya protected declare nahi kar sakte.

**Inner Classes**: Inner classes charon access modifiers use kar sakti hain. Private inner class sirf enclosing class ko dikhti hai.

**Methods**: Methods charon modifiers use kar sakti hain. Overriding method parent method se zyada restrictive nahi ho sakta. Agar parent method protected hai, toh child usse private nahi bana sakta.

**Fields**: Fields charon modifiers use kar sakti hain. Fields par overriding rules nahi hain — fields polymorphic nahi hain.

**Constructors**: Constructors charon modifiers use kar sakte hain. Private constructor external instantiation prevent karta hai (singleton pattern ke liye useful).

**Interface Members**: Interface methods implicitly public hote hain. Fields implicitly public static final hote hain.

Key rules:
1. Overriding methods parent se zyada restrictive nahi ho sakti.
2. Fields koi bhi modifier use kar sakti hain lekin polymorphic nahi hain.
3. Constructors method rules follow karte hain lekin override nahi ho sakte.
4. Abstract methods at least protected hone chahiye agar class extend honi hai.`
      },
      keyPoints: [
        { id: 'kp-10-04-1', title: 'Class Restrictions', description: 'Top-level classes can only be public or default. Private/protected only for inner classes.' },
        { id: 'kp-10-04-2', title: 'Method Overriding Rule', description: 'Overriding methods cannot have a more restrictive access modifier than the parent method.' },
        { id: 'kp-10-04-3', title: 'Field Independence', description: 'Fields are not polymorphic. A child can shadow a parent field but this creates two separate fields.' },
        { id: 'kp-10-04-4', title: 'Constructor Access', description: 'Constructors follow method access rules. Private constructors prevent external instantiation.' },
      ],
      codeExamples: [
        {
          id: 'ce-10-04-1',
          title: 'Method Overriding Access Rules',
          code: `package com.acme.animals;

public class Animal {
    public void makeSound() {
        System.out.println("Some sound");
    }

    protected void breathe() {
        System.out.println("Breathing...");
    }

    void eat() {  // default access
        System.out.println("Eating...");
    }
}

// In a DIFFERENT package:
package com.acme.pets;

import com.acme.animals.Animal;

public class Dog extends Animal {
    // OK: public is same level as parent's public
    @Override
    public void makeSound() {
        System.out.println("Woof!");
    }

    // COMPILE ERROR: cannot make protected method more restrictive
    // @Override
    // private void breathe() { }

    // OK: protected is less restrictive than parent's protected
    @Override
    protected void breathe() {
        System.out.println("Dog breathing...");
    }

    // COMPILE ERROR: cannot override default method as private
    // @Override
    // private void eat() { }
}`,
          language: 'java',
          explanation: 'The overriding method must have the same or less restrictive access modifier. Protected parent methods cannot become private in child classes.',
        },
        {
          id: 'ce-10-04-2',
          title: 'Constructor Access and Singleton Pattern',
          code: `package com.acme.database;

public class DatabaseConnection {
    private static DatabaseConnection instance;
    private String url;

    // Private constructor: prevents external instantiation
    private DatabaseConnection(String url) {
        this.url = url;
    }

    // Public factory method
    public static DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection("jdbc:mysql://localhost/db");
        }
        return instance;
    }

    public void connect() {
        System.out.println("Connected to " + url);
    }
}

// Usage (any package):
// DatabaseConnection db = new DatabaseConnection("url"); // COMPILE ERROR!
DatabaseConnection db = DatabaseConnection.getInstance(); // OK`,
          language: 'java',
          explanation: 'A private constructor with a public factory method is the Singleton pattern. It ensures only one instance of the class exists.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-10-04-1',
          title: 'Framework Design Pattern',
          scenario: 'A web framework provides a base Controller class. Framework users extend it to create their own controllers.',
          oopConcept: 'The framework class uses protected methods for extension points. Private methods handle internal logic. Public methods form the framework API.',
          codeExample: {
            id: 'rwe-code-10-04-1',
            title: 'Framework Base Controller',
            code: `// Framework package
public abstract class Controller {
    private Logger logger;

    public void handleRequest(Request req) {
        log("Handling: " + req.getPath());
        process(req);
    }

    protected abstract void process(Request req);

    private void log(String msg) {
        logger.info(msg);
    }
}

// User package (different package)
public class UserController extends Controller {
    @Override
    protected void process(Request req) {
        // Can access protected, cannot access private
    }
}`,
            language: 'java',
          },
        },
      ],
      commonMistakes: [
        {
          id: 'cm-10-04-1',
          title: 'Trying to Make Overriding Method More Restrictive',
          incorrectCode: `// Parent (in com.animals)
public class Animal {
    public void eat() { }
}

// Child (in com.pets)
public class Dog extends Animal {
    // COMPILE ERROR: cannot reduce visibility
    private void eat() { }
}`,
          correctCode: `public class Dog extends Animal {
    // OK: same or wider access
    @Override
    public void eat() { }

    // OR: protected is still less restrictive than public
    @Override
    protected void eat() { }
}`,
          explanation: 'When overriding, you cannot make the method more restrictive. If parent is public, child must be public. If parent is protected, child can be protected or public.',
        },
        {
          id: 'cm-10-04-2',
          title: 'Trying to Declare Top-Level Class as Private',
          incorrectCode: `// COMPILE ERROR: top-level class cannot be private
private class Secret {
    // This only works as an inner class!
}`,
          correctCode: `public class NotSecret {
    // For inner classes, private is valid:
    private class Secret {
        // This works because it's an inner class
    }
}`,
          explanation: 'Top-level classes can only be public or default. Private/protected modifiers are only valid for inner (nested) classes.',
        },
      ],
      examNotes: [
        { id: 'en-10-04-1', title: 'Overriding Access Rule', content: 'Overriding methods cannot be more restrictive. This is the most commonly tested access modifier rule.', importance: 'high' },
        { id: 'en-10-04-2', title: 'Top-Level Class Modifiers', content: 'Only public and default are valid for top-level classes. Private and protected are for inner classes only.', importance: 'high' },
        { id: 'en-10-04-3', title: 'Interface Implied Modifiers', content: 'Interface methods are implicitly public. Interface fields are implicitly public static final.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-10-04-1', question: 'Can an overriding method have a more restrictive access modifier?', answer: 'No. The overriding method must have the same or wider access. If the parent method is protected, the child can be protected or public, but not private or default.', difficulty: 'medium' },
        { id: 'vq-10-04-2', question: 'Can a top-level class be declared as private?', answer: 'No. Top-level classes can only be public or have default (package-private) access. Private and protected are only valid for inner/nested classes.', difficulty: 'easy' },
        { id: 'vq-10-04-3', question: 'What happens when a subclass declares a field with the same name as a parent field?', answer: 'The subclass creates a new field that shadows the parent field. They are two separate fields. This is not method overriding — fields are not polymorphic.', difficulty: 'hard' },
      ],
      quickCheckQuestions: [
        { id: 'qc-10-04-1', type: 'mcq', question: 'Can a subclass override a public method and make it protected?', options: ['Yes, protected is wider', 'No, it would be more restrictive', 'Yes, only in same package', 'No, access cannot change at all'], correctAnswer: 'Yes, protected is wider', explanation: 'Wait — this is actually NO. Protected is MORE restrictive than public. You cannot reduce visibility. The correct answer is: No, it would be more restrictive.' },
        { id: 'qc-10-04-2', type: 'true-false', question: 'A top-level class can be declared as protected.', correctAnswer: 'False', explanation: 'Top-level classes can only be public or default. Protected is only valid for inner/nested classes.' },
        { id: 'qc-10-04-3', type: 'mcq', question: 'What is the access level of all methods in an interface?', options: ['default', 'protected', 'public', 'private'], correctAnswer: 'public', explanation: 'All methods declared in an interface are implicitly public, even without the public keyword.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-10-04-1',
          scenario: 'You have a base class Vehicle with a method startEngine() declared as protected. You are creating a Car subclass in a different package.',
          question: 'What access modifiers can Car use for its overridden startEngine() method?',
          type: 'concept-application',
          options: [
            'Only protected',
            'Protected or public',
            'Private, protected, or public',
            'Any access modifier',
          ],
          correctAnswer: 'Protected or public',
          explanation: 'The overriding method cannot be more restrictive. Since parent is protected, child can be protected (same) or public (wider), but not private or default.',
          relatedConcepts: ['method-overriding', 'access-rules', 'inheritance'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-access-rules',
      prerequisites: ['lesson-10-03'],
      xpReward: 75,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'access-rules-matrix',
      difficulty: 'medium',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-10-05',
      moduleId: 'module-10',
      title: 'Package Design Principles',
      slug: 'package-design-principles',
      order: 5,
      duration: 18,
      description: 'Learn how to design effective package structures with principles of cohesion, coupling, and naming conventions.',
      learningObjectives: [
        { id: 'lo-10-05-1', description: 'Apply the principle of high cohesion within packages', completed: false },
        { id: 'lo-10-05-2', description: 'Minimize coupling between packages', completed: false },
        { id: 'lo-10-05-3', description: 'Use package naming conventions for clarity', completed: false },
        { id: 'lo-10-05-4', description: 'Evaluate package design quality', completed: false },
      ],
      englishExplanation: {
        id: 'ee-10-05',
        text: `Package design is a critical architectural decision that affects the maintainability, testability, and scalability of a software system. Well-designed packages make code easy to find, modify, and extend. Poorly designed packages create tangled dependencies that make changes risky and expensive.

**Cohesion** measures how closely related the classes within a package are. A highly cohesive package contains classes that work together to accomplish a specific task. For example, a package containing User, UserValidator, and UserRepository is highly cohesive — all three classes deal with user-related operations. Low cohesion means the package contains unrelated classes, making it hard to understand and maintain.

**Coupling** measures the dependency between packages. High coupling means packages depend heavily on each other — changing one package requires changes in many others. Low coupling means packages are relatively independent. The goal is to achieve high cohesion within packages and low coupling between packages.

**Package Naming Strategies**:
1. **Layer-based**: com.app.models, com.app.services, com.app.repositories — organized by architectural layer.
2. **Feature-based**: com.app.auth, com.app.payments, com.app.notifications — organized by business feature.
3. **Domain-based**: com.app.shipping.logistics, com.app.shipping.tracking — organized by business domain.

**The Package Principle (REP, CCP, CRP, ADP, SDP, SAP)**:
- **REP (Release Reuse Equivalency Principle)**: Packages should be releasable and reusable.
- **CCP (Common Closure Principle)**: Classes that change for the same reason should be in the same package.
- **CRP (Common Reuse Principle)**: Classes that are used together should be together.
- **ADP (Acyclic Dependencies Principle)**: No circular dependencies between packages.
- **SDP (Stable Dependencies Principle)**: Depend in the direction of stability.
- **SAP (Stable Abstractions Principle)**: Packages with stable abstractions should be abstract.

In practice, aim for packages with 5-15 classes. Packages that are too small create unnecessary complexity. Packages that are too large become unwieldy. Group classes that change together, are used together, and share a common purpose.`
      },
      romanUrduExplanation: {
        id: 'ru-10-05',
        text: `Package design ek critical architectural decision hai jo software system ki maintainability, testability aur scalability ko affect karta hai. Achche design ke packages code ko easy banate hain find karne, modify karne aur extend karne ke liye.

**Cohesion** measure karta hai ke package ki classes kitni closely related hain. Highly cohesive package mein woh classes hoti hain jo mil kar ek specific task accomplish karti hain. Jaise, User, UserValidator aur UserRepository ka package highly cohesive hai — teeno classes user-related operations deal karti hain.

**Coupling** measure karta hai packages ke beech dependency. High coupling ka matlab hai packages ek dusre par heavily depend karti hain. Low coupling ka matlab hai packages relatively independent hain. Goal hai: packages ke andar high cohesion aur packages ke beech low coupling.

**Package Naming Strategies**:
1. **Layer-based**: com.app.models, com.app.services — architectural layer ke according.
2. **Feature-based**: com.app.auth, com.app.payments — business feature ke according.
3. **Domain-based**: com.app.shipping.logistics — business domain ke according.

Package design mein aim karein 5-15 classes per package. Bahut chhote packages unnecessary complexity create karte hain. Bahut bade packages unwieldy ho jaate hain. Woh classes group karein jo saath mein change hoti hain, saath mein use hoti hain, aur common purpose share karti hain.`
      },
      keyPoints: [
        { id: 'kp-10-05-1', title: 'High Cohesion', description: 'Group closely related classes together. A package should have a clear, focused purpose.' },
        { id: 'kp-10-05-2', title: 'Low Coupling', description: 'Minimize dependencies between packages. Packages should be as independent as possible.' },
        { id: 'kp-10-05-3', title: 'Naming Strategy', description: 'Choose a consistent naming strategy: layer-based, feature-based, or domain-based.' },
        { id: 'kp-10-05-4', title: 'No Circular Dependencies', description: 'Avoid circular dependencies between packages. They create maintenance nightmares.' },
        { id: 'kp-10-05-5', title: 'Optimal Size', description: 'Aim for 5-15 classes per package. Too small creates complexity, too large becomes unwieldy.' },
      ],
      codeExamples: [
        {
          id: 'ce-10-05-1',
          title: 'High Cohesion vs Low Cohesion',
          code: `// LOW COHESION: unrelated classes in one package
package com.app;
class User { }
class DatabaseConnection { }
class EmailSender { }
class PaymentProcessor { }
class Logger { }
// These classes have nothing in common!

// HIGH COHESION: related classes grouped together
package com.app.auth;
class User { }
class UserValidator { }
class UserRepository { }
class AuthenticationService { }
// All classes work together for authentication

package com.app.payments;
class Payment { }
class PaymentProcessor { }
class PaymentRepository { }
class RefundService { }
// All classes work together for payments`,
          language: 'java',
          explanation: 'High cohesion groups related classes. Low cohesion scatters unrelated classes. The high cohesion approach is much easier to understand and maintain.',
        },
        {
          id: 'ce-10-05-2',
          title: 'Feature-Based Package Structure',
          code: `// Feature-based organization
com.myapp
├── auth/
│   ├── LoginController.java
│   ├── AuthService.java
│   └── UserRepository.java
├── payments/
│   ├── PaymentController.java
│   ├── PaymentService.java
│   └── StripeGateway.java
├── notifications/
│   ├── NotificationService.java
│   ├── EmailSender.java
│   └── SMSSender.java
└── shared/
    ├── Logger.java
    └── Config.java

// Each feature package is self-contained
// Changes to payments don't affect auth`,
          language: 'java',
          explanation: 'Feature-based packages group all classes for a business feature together. Each package can be developed, tested, and modified independently.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-10-05-1',
          title: 'Spring Framework Package Organization',
          scenario: 'The Spring Framework organizes millions of lines of code across well-defined packages.',
          oopConcept: 'Spring uses layer-based and feature-based packages: spring-core, spring-beans, spring-context, spring-web. Each package has a clear responsibility and minimal dependencies on others.',
        },
        {
          id: 'rwe-10-05-2',
          title: 'Netflix Microservices Package Structure',
          scenario: 'Netflix organizes each microservice into feature-based internal packages.',
          oopConcept: 'Each service has packages like service/recommendation, service/player, service/billing. Within each, there are models, repositories, and service layers.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-10-05-1',
          title: 'Circular Dependencies',
          incorrectCode: `// BAD: package A depends on B, and B depends on A
package com.app.payments;
import com.app.orders.OrderService; // depends on orders

package com.app.orders;
import com.app.payments.PaymentService; // depends on payments
// This creates a circular dependency!`,
          correctCode: `// GOOD: extract shared interface to break cycle
package com.app.shared;
public interface OrderPaymentService {
    void processPayment(Order order);
}

// payments implements the interface
package com.app.payments;
public class OrderPaymentServiceImpl implements OrderPaymentService { ... }

// orders depends only on shared interface
package com.app.orders;
import com.app.shared.OrderPaymentService;`,
          explanation: 'Circular dependencies create maintenance nightmares. Break them by extracting shared interfaces to a common package.',
        },
      ],
      examNotes: [
        { id: 'en-10-05-1', title: 'Cohesion vs Coupling', content: 'High cohesion (related classes together) + Low coupling (independent packages) = Good design. This is the fundamental principle of package design.', importance: 'high' },
        { id: 'en-10-05-2', title: 'Package Sizing', content: '5-15 classes per package is ideal. Too few classes create unnecessary complexity. Too many reduce cohesion.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-10-05-1', question: 'What is the difference between cohesion and coupling?', answer: 'Cohesion measures how related classes within a package are. Coupling measures how dependent packages are on each other. Good design achieves high cohesion and low coupling.', difficulty: 'medium' },
        { id: 'vq-10-05-2', question: 'What is a circular dependency and why is it bad?', answer: 'A circular dependency occurs when package A depends on B and B depends on A. It makes code difficult to test, maintain, and modify because changes in one package cascade to the other.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-10-05-1', type: 'mcq', question: 'What is the goal of good package design?', options: ['High cohesion and high coupling', 'Low cohesion and low coupling', 'High cohesion and low coupling', 'Low cohesion and high coupling'], correctAnswer: 'High cohesion and low coupling', explanation: 'Good package design groups related classes together (high cohesion) while minimizing dependencies between packages (low coupling).' },
        { id: 'qc-10-05-2', type: 'true-false', question: 'A package with only one class is always the best design.', correctAnswer: 'False', explanation: 'Single-class packages may indicate fragmentation. The optimal size is 5-15 closely related classes.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-10-05-1',
          scenario: 'Your team is building an e-commerce system. The product catalog, shopping cart, and user authentication are currently in one package called com.shop.',
          question: 'How should you reorganize this?',
          type: 'architecture',
          options: [
            'Keep everything in one package',
            'Split into com.shop.catalog, com.shop.cart, com.shop.auth',
            'One package per class: com.shop.catalog.Product, com.shop.cart.CartItem',
            'Put everything in the default package',
          ],
          correctAnswer: 'Split into com.shop.catalog, com.shop.cart, com.shop.auth',
          explanation: 'Feature-based packages group related classes by business functionality. Each package has high cohesion and can be developed independently.',
          relatedConcepts: ['package-design', 'cohesion', 'feature-based-packaging'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-package-design',
      prerequisites: ['lesson-10-03', 'lesson-10-04'],
      xpReward: 65,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'package-design',
      difficulty: 'medium',
      estimatedMinutes: 18,
    },
    {
      id: 'lesson-10-06',
      moduleId: 'module-10',
      title: 'The Module System',
      slug: 'the-module-system',
      order: 6,
      duration: 20,
      description: 'Explore Java 9+ Module System (Project Jigsaw): module-info.java, exports, requires, and module path.',
      learningObjectives: [
        { id: 'lo-10-06-1', description: 'Explain what the Java Module System is and why it was introduced', completed: false },
        { id: 'lo-10-06-2', description: 'Create a module-info.java file with exports and requires', completed: false },
        { id: 'lo-10-06-3', description: 'Understand the difference between module path and class path', completed: false },
        { id: 'lo-10-06-4', description: 'Apply module encapsulation to real projects', completed: false },
      ],
      englishExplanation: {
        id: 'ee-10-06',
        text: `The Java Platform Module System (JPMS), introduced in Java 9, is also known as Project Jigsaw. It provides a higher level of encapsulation than packages alone. While packages group classes logically, modules enforce boundaries at the system level.

A module is a named, reusable group of related packages and resources. Before the module system, all packages on the class path were equally accessible — there was no way to prevent one library from accessing another library's internal classes. The module system fixes this by allowing modules to explicitly declare which packages they export (make public) and which modules they require (depend on).

**module-info.java** is the module descriptor file. It sits at the root of the module's source tree and declares the module's name, its dependencies (requires), and its exposed API (exports).

**exports** keyword: Specifies which packages are accessible to the outside world. \`exports com.myapp.api;\` makes the api package public. Packages not exported are encapsulated — only code within the module can access them.

**requires** keyword: Declares a dependency on another module. \`requires java.sql;\` means this module needs classes from the java.sql module. The compiler and runtime enforce these dependencies.

**Module Types**:
1. **Named Modules**: Have a module-info.java file and a declared name.
2. **Automatic Modules**: JAR files without module-info.java placed on the module path. The module name is derived from the JAR filename.
3. **The Unnamed Module**: Classes on the class path (not the module path) belong to the unnamed module.

**Module Path vs Class Path**:
- Class path: Traditional way of locating classes. All classes are equally visible.
- Module path: New way for modules. Only exported packages are visible. Encapsulated packages are hidden.

**Strong Encapsulation**: The key benefit. Modules can truly hide internal classes. Even reflection cannot access non-exported classes unless explicitly permitted.

**Services**: Modules can provide and consume services using \`provides\` and \`requires static\` directives. This enables a clean plugin architecture.

The module system is optional but strongly recommended for production applications. It improves security, performance (through ahead-of-time compilation), and maintainability.`
      },
      romanUrduExplanation: {
        id: 'ru-10-06',
        text: `Java Platform Module System (JPMS), jo Java 9 mein introduce hua, ko Project Jigsaw bhi kehte hain. Ye packages se zyada higher level of encapsulation provide karta hai. Jabke packages classes ko logically group karte hain, modules system level par boundaries enforce karte hain.

Module ek named, reusable group hai related packages aur resources ka. Module system se pehle, class path par sab packages equally accessible thin — koi tareeka nahi tha ek library ko doosri library ke internal classes se rokne ka. Module system is problem ko fix karta hai.

**module-info.java** module descriptor file hai. Ye module ke source tree ke root par hoti hai aur declare karti hai ke module kya export karta hai (public banata hai) aur kya require karta hai (depend karta hai).

**exports** keyword: Specify karta hai ke kaunsi packages bahar se accessible hain. \`exports com.myapp.api;\` api package ko public banata hai.

**requires** keyword: Declare karta hai ke doosre module par dependency hai. \`requires java.sql;\` ka matlab hai is module ko java.sql module ki classes chahiye.

**Module Types**:
1. **Named Modules**: module-info.java file hoti hai aur declared name hota hai.
2. **Automatic Modules**: Bina module-info.java ke JAR files jo module path par rakhi jaati hain.
3. **Unnamed Module**: Class path par classes unnamed module mein hoti hain.

**Module Path vs Class Path**:
- Class path: Traditional tarika. Sab classes equally visible hoti hain.
- Module path: Modules ke liye naya tarika. Sirf exported packages visible hote hain.

**Strong Encapsulation**: Key benefit. Modules internal classes ko truly chupa sakte hain. Reflection tak non-exported classes ko access nahi kar sakta.`
      },
      keyPoints: [
        { id: 'kp-10-06-1', title: 'module-info.java', description: 'The module descriptor file. Declares module name, dependencies (requires), and API (exports).' },
        { id: 'kp-10-06-2', title: 'exports', description: 'Specifies which packages are accessible to other modules. Unexported packages are encapsulated.' },
        { id: 'kp-10-06-3', title: 'requires', description: 'Declares a dependency on another module. The runtime enforces that required modules are present.' },
        { id: 'kp-10-06-4', title: 'Strong Encapsulation', description: 'Modules can truly hide internal classes. Even reflection cannot access non-exported packages.' },
      ],
      codeExamples: [
        {
          id: 'ce-10-06-1',
          title: 'Basic Module Definition',
          code: `// File: src/com.myapp.module/module-info.java
module com.myapp {
    // This module depends on the java.sql module
    requires java.sql;
    requires java.logging;

    // Export the public API package
    exports com.myapp.api;

    // Export the models package
    exports com.myapp.models;
}

// File: src/com.myapp.module/com/myapp/api/UserService.java
package com.myapp.api;

import java.sql.Connection;

public class UserService {
    public User findUser(int id) {
        // Can use java.sql classes (required)
        Connection conn = null;
        // ...
        return new User(id, "Ahmed");
    }
}

// File: src/com.myapp.module/com/myapp/internal/DbHelper.java
package com.myapp.internal;
// This package is NOT exported
// Only code within com.myapp module can access it
public class DbHelper {
    public static Connection getConnection() { return null; }
}`,
          language: 'java',
          explanation: 'The com.myapp module exports api and models packages but keeps internal package encapsulated. Only modules that require com.myapp can see exported packages.',
        },
        {
          id: 'ce-10-06-2',
          title: 'Module with Services',
          code: `// Provider module
module com.myapp.payments {
    requires java.sql;

    // Provide a service
    provides com.myapp.api.PaymentGateway
        with com.myapp.payments.StripeGateway;
}

// Consumer module
module com.myapp.orders {
    requires com.myapp.payments;

    // Require a service
    uses com.myapp.api.PaymentGateway;
}

// Service interface (in shared module)
package com.myapp.api;
public interface PaymentGateway {
    boolean processPayment(double amount);
}`,
          language: 'java',
          explanation: 'The service provider pattern allows modules to offer implementations without exposing the implementation class. The consumer module uses the service interface without knowing the implementation.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-10-06-1',
          title: 'Java Platform Modules',
          scenario: 'The Java platform itself is divided into modules.',
          oopConcept: 'java.base (core classes), java.sql (database), java.logging, java.xml, etc. Each module exports specific packages. You only need to require what you use.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-10-06-1',
          title: 'Forgetting to Export a Package',
          incorrectCode: `module com.myapp {
    requires java.sql;
    // Forgot to export com.myapp.api
    // Other modules cannot see classes in this package!
}`,
          correctCode: `module com.myapp {
    requires java.sql;
    exports com.myapp.api;  // Now other modules can use it
    exports com.myapp.models;
}`,
          explanation: 'If you forget to export a package, no external module can access its classes. This is the most common module system mistake.',
        },
      ],
      examNotes: [
        { id: 'en-10-06-1', title: 'Module Descriptor', content: 'module-info.java is the module descriptor. It uses requires for dependencies and exports for API exposure.', importance: 'high' },
        { id: 'en-10-06-2', title: 'Strong Encapsulation', content: 'The key benefit of modules over packages. Non-exported packages are truly hidden, even from reflection.', importance: 'high' },
        { id: 'en-10-06-3', title: 'Module Path vs Class Path', content: 'Module path provides module-level access control. Class path makes everything equally visible. Prefer module path for new projects.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-10-06-1', question: 'What is the Java Module System?', answer: 'Introduced in Java 9, the Module System (JPMS) provides higher-level encapsulation than packages. Modules declare their dependencies (requires) and exposed API (exports) in a module-info.java descriptor.', difficulty: 'medium' },
        { id: 'vq-10-06-2', question: 'How do modules differ from packages?', answer: 'Packages group classes logically. Modules enforce boundaries at the system level with strong encapsulation. Modules can truly hide internal classes from external access.', difficulty: 'hard' },
        { id: 'vq-10-06-3', question: 'What is the purpose of exports in module-info.java?', answer: 'Exports declares which packages are accessible to other modules. Packages not exported are encapsulated and only accessible within the module itself.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-10-06-1', type: 'mcq', question: 'What file defines a Java module?', options: ['module.java', 'module-info.java', 'module.config', 'module.xml'], correctAnswer: 'module-info.java', explanation: 'module-info.java is the module descriptor file that declares the module name, dependencies, and exports.' },
        { id: 'qc-10-06-2', type: 'true-false', question: 'A module can access non-exported packages of another module.', correctAnswer: 'False', explanation: 'Non-exported packages are encapsulated. Only code within the same module can access them.' },
        { id: 'qc-10-06-3', type: 'mcq', question: 'Which keyword declares a dependency on another module?', options: ['exports', 'imports', 'requires', 'provides'], correctAnswer: 'requires', explanation: 'The requires keyword declares that the current module depends on another module.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-10-06-1',
          scenario: 'You are building a banking application with sensitive internal classes that should not be accessible to external code.',
          question: 'How does the module system help?',
          type: 'concept-application',
          options: [
            'By making all classes public',
            'By using exports to expose only public API packages while encapsulating internal packages',
            'By putting everything in one package',
            'By using private access modifiers on all classes',
          ],
          correctAnswer: 'By using exports to expose only public API packages while encapsulating internal packages',
          explanation: 'Modules let you explicitly control which packages are visible. The exports directive exposes the API while internal packages remain encapsulated.',
          relatedConcepts: ['module-exports', 'strong-encapsulation', 'api-design'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-module-system',
      prerequisites: ['lesson-10-01', 'lesson-10-02', 'lesson-10-03'],
      xpReward: 80,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'module-boundaries',
      difficulty: 'advanced',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-10-07',
      moduleId: 'module-10',
      title: 'Encapsulation via Packages',
      slug: 'encapsulation-via-packages',
      order: 7,
      duration: 18,
      description: 'Understand how packages implement encapsulation through package-private access, hiding implementation details, and API design.',
      learningObjectives: [
        { id: 'lo-10-07-1', description: 'Use package-private access for implementation hiding', completed: false },
        { id: 'lo-10-07-2', description: 'Design clean public APIs while hiding internals', completed: false },
        { id: 'lo-10-07-3', description: 'Apply the principle of least knowledge', completed: false },
      ],
      englishExplanation: {
        id: 'ee-10-07',
        text: `Encapsulation via packages is a powerful technique where the package boundary serves as an encapsulation wall. Classes with package-private (default) access are invisible to outside packages, effectively hiding implementation details while exposing only the public API.

Consider a web framework: the framework provides a public Controller class that developers extend. But internally, the framework has dozens of classes for routing, middleware, request parsing, and response handling. These internal classes use default or private access, making them invisible to framework users. The user only interacts with the public API.

**API Design Pattern**:
1. **Public classes and methods**: Form the stable API that users depend on.
2. **Package-private classes and methods**: Implementation details that can change freely.
3. **Private members**: Internal state and helpers within a single class.

**Implementation Hiding**: Package-private access is ideal for helper classes that support the public API but should not be used directly. For example, a ParserHelper class in the same package as Parser is available to Parser but invisible to external code.

**The Law of Demeter** (Principle of Least Knowledge): An object should only talk to its immediate friends. In package terms, a class should only depend on classes in its own package or exported APIs of other packages.

**Practical Example - Building a Mini Framework**:
\`\`\`java
package com.framework;

// PUBLIC: This is the API users extend
public abstract class Controller {
    public void handleRequest(Request req) {
        String body = parseBody(req);  // calls package-private method
        process(body);
    }
    protected abstract void process(String body);
}

// PACKAGE-PRIVATE: Internal helper, invisible to users
class RequestParser {
    static String parse(Request req) {
        return req.getBody();
    }
}

class ResponseBuilder {
    static Response build(String body) {
        return new Response(body);
    }
}
\`\`\`

Users see only Controller. They extend it and implement process(). They never see RequestParser or ResponseBuilder. The package boundary hides these implementation details.

This technique is used extensively in Java libraries. The java.util package exposes ArrayList, HashMap, etc., but hides internal data structures, iterators implementations, and utility classes.`
      },
      romanUrduExplanation: {
        id: 'ru-10-07',
        text: `Packages ke through encapsulation ek powerful technique hai jahan package boundary encapsulation wall ka kaam karta hai. Package-private (default) access wali classes bahar ke packages se invisible hoti hain, effectively implementation details chupa deti hain.

Consider karein ek web framework: framework ek public Controller class provide karta hai jo developers extend karte hain. Lekin internally, framework ke dozens of classes hain routing, middleware, request parsing ke liye. Ye internal classes default ya private access use karti hain, jo framework users se invisible hoti hain.

**API Design Pattern**:
1. **Public classes/methods**: Stable API form karte hain.
2. **Package-private classes/methods**: Implementation details hain jo freely change ho sakti hain.
3. **Private members**: Single class ke andar internal state aur helpers.

**Implementation Hiding**: Package-private access ideal hai un helper classes ke liye jo public API ko support karte hain lekin directly use nahi hone chahiye. Jaise ParserHelper class Parser ke liye available hai lekin external code se invisible hai.

**Practical Example**: Mini framework mein Controller public hota hai jo users extend karte hain. Lekin RequestParser aur ResponseBuilder package-private hain — users ko dikhti nahi hain. Package boundary in implementation details ko chupata hai.

Ye technique Java libraries mein extensively use hoti hai. java.util package ArrayList, HashMap expose karta hai lekin internal data structures chupata hai.`
      },
      keyPoints: [
        { id: 'kp-10-07-1', title: 'Package-Private = Hidden', description: 'Classes without an access modifier are invisible to other packages. This is the package-level encapsulation mechanism.' },
        { id: 'kp-10-07-2', title: 'Public API', description: 'Only public classes and methods form the API that external code depends on.' },
        { id: 'kp-10-07-3', title: 'Internal Classes', description: 'Helper and utility classes within a package should be package-private to hide implementation details.' },
        { id: 'kp-10-07-4', title: 'Free Evolution', description: 'Package-private classes can change freely without breaking external code. Only the public API is a commitment.' },
      ],
      codeExamples: [
        {
          id: 'ce-10-07-1',
          title: 'API Hiding Implementation',
          code: `package com.mylib;

// PUBLIC: Users interact with this
public class JsonParser {
    public String parse(String input) {
        // Delegates to package-private helper
        Tokenizer tokenizer = new Tokenizer(input);
        return tokenizer.buildJson();
    }
}

// PACKAGE-PRIVATE: Users cannot see this
class Tokenizer {
    private String input;

    Tokenizer(String input) {
        this.input = input;
    }

    String buildJson() {
        // Complex parsing logic here
        return "{}";
    }
}

// PACKAGE-PRIVATE: Another internal class
class JsonValidator {
    static boolean isValid(String json) {
        return json.startsWith("{");
    }
}`,
          language: 'java',
          explanation: 'Users see only JsonParser with its public parse method. Tokenizer and JsonValidator are package-private — invisible to external code but available within the package.',
        },
        {
          id: 'ce-10-07-2',
          title: 'Factory Pattern with Package-Private Implementation',
          code: `package com.mylib;

// PUBLIC: Factory interface
public interface LoggerFactory {
    Logger createLogger(String name);
}

// PUBLIC: Concrete factory users can see
public class ConsoleLoggerFactory implements LoggerFactory {
    public Logger createLogger(String name) {
        return new ConsoleLogger(name);
    }
}

// PUBLIC: Logger interface
public interface Logger {
    void log(String message);
}

// PACKAGE-PRIVATE: Implementation details
class ConsoleLogger implements Logger {
    private String name;

    ConsoleLogger(String name) {
        this.name = name;
    }

    public void log(String message) {
        System.out.println("[" + name + "] " + message);
    }
}`,
          language: 'java',
          explanation: 'The public API consists of LoggerFactory, Logger, and ConsoleLoggerFactory. The ConsoleLogger implementation is package-private, allowing changes without breaking user code.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-10-07-1',
          title: 'Java Collections Framework',
          scenario: 'The java.util package exposes ArrayList, HashMap, LinkedList as public API.',
          oopConcept: 'Internal classes like HashMap$Node, ArrayList$Iterator are not part of the public API. They use package-private or private access. Users interact only with public interfaces like List, Map, and Set.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-10-07-1',
          title: 'Making Helper Classes Public',
          incorrectCode: `// BAD: helper class unnecessarily exposed
public class StringUtils {
    public static String reverse(String s) { ... }
    public static boolean isBlank(String s) { ... }
}
// Users might depend on this, making future changes difficult`,
          correctCode: `// GOOD: helper class hidden from external users
class StringUtils {  // package-private
    static String reverse(String s) { ... }
    static boolean isBlank(String s) { ... }
}`,
          explanation: 'Helper classes should be package-private unless they are intentionally part of the public API. Making them public creates unnecessary dependencies.',
        },
      ],
      examNotes: [
        { id: 'en-10-07-1', title: 'Package-Private Hiding', content: 'Package-private access is the primary mechanism for hiding implementation details at the package level. Classes without a modifier are invisible outside the package.', importance: 'high' },
        { id: 'en-10-07-2', title: 'API Stability', content: 'Only public API is a commitment. Package-private classes can change freely. This enables library evolution without breaking user code.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-10-07-1', question: 'How do packages implement encapsulation?', answer: 'Package-private (default) access makes classes invisible to other packages. This hides implementation details while public classes form the visible API.', difficulty: 'medium' },
        { id: 'vq-10-07-2', question: 'Why should helper classes be package-private?', answer: 'Making them public creates unnecessary dependencies. Users might depend on internal classes, making future changes difficult. Package-private keeps them hidden.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-10-07-1', type: 'mcq', question: 'Which access modifier makes a class visible only within its package?', options: ['private', 'public', 'protected', 'default (no modifier)'], correctAnswer: 'default (no modifier)', explanation: 'Default access (no modifier) limits visibility to classes within the same package.' },
        { id: 'qc-10-07-2', type: 'true-false', question: 'Package-private classes can be changed without breaking external code.', correctAnswer: 'True', explanation: 'Since package-private classes are not visible to external code, they can be modified freely without affecting users.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-10-07-1',
          scenario: 'You are designing a date utility library. You have a public DateUtils class and several internal helper classes for parsing different date formats.',
          question: 'How should you apply package encapsulation?',
          type: 'design-decision',
          options: [
            'Make all classes public for maximum flexibility',
            'Make DateUtils public and helper classes package-private',
            'Make everything package-private',
            'Make everything private except main method',
          ],
          correctAnswer: 'Make DateUtils public and helper classes package-private',
          explanation: 'The public class forms the API. Internal helpers should be package-private to hide implementation details and allow future changes without breaking users.',
          relatedConcepts: ['encapsulation', 'api-design', 'package-private'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-package-encapsulation',
      prerequisites: ['lesson-10-03', 'lesson-10-04', 'lesson-10-05'],
      xpReward: 70,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'encapsulation-layers',
      difficulty: 'medium',
      estimatedMinutes: 18,
    },
    {
      id: 'lesson-10-10',
      moduleId: 'module-10',
      title: 'Practical Package Organization',
      slug: 'practical-package-organization',
      order: 10,
      duration: 20,
      description: 'Apply package organization concepts to real project structures with layered architecture and best practices.',
      learningObjectives: [
        { id: 'lo-10-10-1', description: 'Design a layered architecture using packages', completed: false },
        { id: 'lo-10-10-2', description: 'Apply package conventions for Maven and Gradle projects', completed: false },
        { id: 'lo-10-10-3', description: 'Evaluate and improve existing package structures', completed: false },
      ],
      englishExplanation: {
        id: 'ee-10-10',
        text: `In real-world Java projects, package organization directly impacts team productivity, code maintainability, and system scalability. Let's examine how professional Java applications organize their packages.

**Layered Architecture** is the most common pattern in enterprise Java applications. It separates concerns into distinct layers, each in its own package hierarchy:

1. **Presentation Layer** (controllers, views): Handles HTTP requests and responses. Classes like UserController, ProductController.
2. **Service Layer** (business logic): Implements business rules. Classes like UserService, OrderService.
3. **Repository Layer** (data access): Interfaces with databases. Classes like UserRepository, ProductRepository.
4. **Domain Layer** (models/entities): Core business objects. Classes like User, Product, Order.
5. **Cross-Cutting** (utilities, configuration): Shared concerns like logging, validation.

**Maven/Gradle Standard Layout**:
\`\`\`
src/
├── main/
│   ├── java/          ← Java source files
│   │   └── com/myapp/
│   │       ├── controller/
│   │       ├── service/
│   │       ├── repository/
│   │       ├── model/
│   │       └── config/
│   └── resources/     ← Configuration files, properties
└── test/
    ├── java/          ← Test source files (mirror main structure)
    └── resources/
\`\`\`

**Real-World Example: E-Commerce Application**:
\`\`\`
com.ecommerce
├── controller/
│   ├── UserController.java        (REST endpoints)
│   ├── ProductController.java
│   └── OrderController.java
├── service/
│   ├── UserService.java           (Business logic)
│   ├── ProductService.java
│   ├── OrderService.java
│   └── impl/
│       ├── UserServiceImpl.java
│       └── OrderServiceImpl.java
├── repository/
│   ├── UserRepository.java        (Data access)
│   └── ProductRepository.java
├── model/
│   ├── entity/
│   │   ├── User.java
│   │   └── Product.java
│   ├── dto/
│   │   ├── UserDTO.java
│   │   └── ProductDTO.java
│   └── vo/
│       └── DashboardVO.java
├── config/
│   ├── SecurityConfig.java
│   └── DatabaseConfig.java
├── exception/
│   ├── UserNotFoundException.java
│   └── GlobalExceptionHandler.java
└── util/
    ├── DateHelper.java
    └── StringUtils.java
\`\`\`

**Anti-Patterns to Avoid**:
1. God packages: packages with 50+ classes (split by feature)
2. Circular dependencies: package A → B → A (refactor)
3. Utility packages: com.utils (too vague, be specific)
4. Numbered packages: package1, package2 (meaningless)

**Testing Package Structure**: Test classes should mirror the main source structure. A class in com.ecommerce.service.UserService should have its test at com.ecommerce.service.UserServiceTest.`
      },
      romanUrduExplanation: {
        id: 'ru-10-10',
        text: `Real-world Java projects mein package organization directly team productivity, code maintainability aur system scalability ko affect karti hai. Dekhte hain ke professional Java applications apne packages ko kaise organize karte hain.

**Layered Architecture** enterprise Java applications mein sabse common pattern hai. Ye concerns ko distinct layers mein separate karta hai:

1. **Presentation Layer**: HTTP requests handle karta hai. UserController, ProductController.
2. **Service Layer**: Business rules implement karta hai. UserService, OrderService.
3. **Repository Layer**: Database se interact karta hai. UserRepository, ProductRepository.
4. **Domain Layer**: Core business objects. User, Product, Order.

**Maven/Gradle Standard Layout**: src/main/java mein source files hoti hain, src/test/java mein test files mirror structure ke according hoti hain.

**E-Commerce Application Example**: controller/, service/, repository/, model/, config/, exception/, util/ — sab ke alag packages hain.

**Anti-Patterns**:
1. God packages: 50+ classes wale packages (feature ke according split karein)
2. Circular dependencies: package A → B → A (refactor karein)
3. Utility packages: com.utils bahut vague hai
4. Numbered packages: package1, package2 meaningless hain

**Testing Structure**: Test classes mirror karein main source structure ko. UserService ka test UserServiceTest hona chahiye.`
      },
      keyPoints: [
        { id: 'kp-10-10-1', title: 'Layered Architecture', description: 'Separate presentation, service, repository, and domain layers into distinct package hierarchies.' },
        { id: 'kp-10-10-2', title: 'Standard Layout', description: 'Follow Maven/Gradle conventions: src/main/java for sources, src/test/java for tests, src/main/resources for config.' },
        { id: 'kp-10-10-3', title: 'Mirror Structure', description: 'Test classes should mirror main source structure. UserServiceTest in same package as UserService.' },
        { id: 'kp-10-10-4', title: 'Avoid Anti-Patterns', description: 'No god packages, no circular dependencies, no vague names like utils, no numbered packages.' },
      ],
      codeExamples: [
        {
          id: 'ce-10-10-1',
          title: 'Layered Architecture Implementation',
          code: `// DOMAIN LAYER: Core business objects
package com.ecommerce.model.entity;

public class Order {
    private Long id;
    private String customerName;
    private List<OrderItem> items;
    private OrderStatus status;

    // Getters, setters, business methods
}

// REPOSITORY LAYER: Data access
package com.ecommerce.repository;

public interface OrderRepository {
    Order findById(Long id);
    List<Order> findByCustomer(String name);
    void save(Order order);
}

// SERVICE LAYER: Business logic
package com.ecommerce.service;

import com.ecommerce.model.entity.Order;
import com.ecommerce.repository.OrderRepository;

public class OrderService {
    private OrderRepository repository;

    public Order createOrder(String customer, List<OrderItem> items) {
        Order order = new Order(customer, items);
        repository.save(order);
        return order;
    }
}

// CONTROLLER LAYER: HTTP endpoints
package com.ecommerce.controller;

import com.ecommerce.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private OrderService orderService;

    @PostMapping
    public Order createOrder(@RequestBody OrderRequest req) {
        return orderService.createOrder(req.getCustomer(), req.getItems());
    }
}`,
          language: 'java',
          explanation: 'Each layer has its own package. Controllers depend on services, services depend on repositories. Dependencies flow in one direction.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-10-10-1',
          title: 'Spring Boot Application Structure',
          scenario: 'A typical Spring Boot application follows a well-defined package hierarchy.',
          oopConcept: 'Each layer (controller, service, repository) is in its own package. Spring uses dependency injection to wire them together. Controllers are REST endpoints, services contain business logic, repositories handle data access.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-10-10-1',
          title: 'The God Package',
          incorrectCode: `// BAD: everything in one package
package com.ecommerce;
class User { }
class Product { }
class Order { }
class UserController { }
class UserService { }
class UserRepository { }
class EmailSender { }
class DatabaseConfig { }
// 50+ classes, impossible to navigate!`,
          correctCode: `// GOOD: organized by layer/feature
com.ecommerce.model.user.User
com.ecommerce.model.product.Product
com.ecommerce.controller.UserController
com.ecommerce.service.UserService
com.ecommerce.repository.UserRepository
com.ecommerce.config.DatabaseConfig
// Each package has 5-15 related classes`,
          explanation: 'God packages violate cohesion. Split by feature or layer so each package has a clear, focused purpose.',
        },
      ],
      examNotes: [
        { id: 'en-10-10-1', title: 'Layered Architecture', content: 'Controller → Service → Repository → Model. Dependencies flow downward. Never upward. This is the standard enterprise pattern.', importance: 'high' },
        { id: 'en-10-10-2', title: 'Standard Directory Structure', content: 'Maven: src/main/java and src/test/java. Gradle: same structure. Tests mirror main source packages.', importance: 'medium' },
        { id: 'en-10-10-3', title: 'Package Naming', content: 'Use reversed domain + project + layer. Example: com.acme.project.model, com.acme.project.service.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-10-10-1', question: 'What is layered architecture?', answer: 'A pattern where application is divided into layers: presentation (controllers), business logic (services), data access (repositories), and domain (models). Each layer has its own package.', difficulty: 'medium' },
        { id: 'vq-10-10-2', question: 'Why should test classes mirror the main source structure?', answer: 'Mirroring makes it easy to find tests for any class. If UserService is in com.service, UserServiceTest should be in the same package path under test sources.', difficulty: 'easy' },
        { id: 'vq-10-10-3', question: 'What is a god package and why is it bad?', answer: 'A god package contains too many unrelated classes (50+). It violates cohesion, is hard to navigate, and makes maintenance difficult. Split it by feature or layer.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-10-10-1', type: 'mcq', question: 'In layered architecture, which direction should dependencies flow?', options: ['Upward: model depends on controller', 'Downward: controller depends on service depends on repository', 'Sideways: all layers depend on each other', 'No direction: all layers are independent'], correctAnswer: 'Downward: controller depends on service depends on repository', explanation: 'Dependencies flow downward. Controllers call services, services call repositories. Models have no dependencies on other layers.' },
        { id: 'qc-10-10-2', type: 'true-false', question: 'Test classes should be in the same package structure as the classes they test.', correctAnswer: 'True', explanation: 'Mirroring the structure makes tests easy to locate and maintain.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-10-10-1',
          scenario: 'Your team has a Java project where all 200 classes are in the default package. The lead asks you to reorganize.',
          question: 'What is your recommended approach?',
          type: 'architecture',
          options: [
            'Keep everything in the default package — it works fine',
            'Create packages by feature: auth, payments, notifications, etc.',
            'Create one package per class',
            'Put everything in com.utils package',
          ],
          correctAnswer: 'Create packages by feature: auth, payments, notifications, etc.',
          explanation: 'Feature-based organization groups related classes by business functionality. Each feature package has high cohesion and can be developed independently.',
          relatedConcepts: ['package-organization', 'layered-architecture', 'feature-based-packaging'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-project-structure',
      prerequisites: ['lesson-10-01', 'lesson-10-03', 'lesson-10-05'],
      xpReward: 85,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'project-architecture',
      difficulty: 'advanced',
      estimatedMinutes: 20,
    },
  ],
};
