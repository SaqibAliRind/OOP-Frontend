import type { QuizQuestion, ScenarioQuestion, OutputQuestion, DebugChallenge, MistakeQuestion, CodeCompletionQuestion } from '@/types';

export const module10Questions: {
  quickChecks: QuizQuestion[];
  scenarios: ScenarioQuestion[];
  outputs: OutputQuestion[];
  debugs: DebugChallenge[];
  mistakes: MistakeQuestion[];
  codeCompletions: CodeCompletionQuestion[];
} = {
  quickChecks: [
    {
      id: 'm10-quiz-001', type: 'mcq', question: 'What is the purpose of packages in Java?',
      options: ['To make code faster', 'To organize classes into namespaces and prevent naming conflicts', 'To improve memory usage', 'To enable multiple inheritance'],
      correctAnswer: 'To organize classes into namespaces and prevent naming conflicts',
      explanation: 'Packages group related classes and provide namespace management. Two classes can have the same name if they are in different packages.',
      romanUrduExplanation: 'Packages related classes ko group karte hain aur namespace management provide karte hain. Same name ke classes different packages mein ho sakti hain.',
      difficulty: 'easy', topicTags: ['packages', 'organization'], xpReward: 25, moduleId: 'module-10',
    },
    {
      id: 'm10-quiz-002', type: 'mcq', question: 'What is the default package in Java?',
      options: ['java.lang', 'java.util', '(unnamed/default package)', 'main'],
      correctAnswer: '(unnamed/default package)',
      explanation: 'If no package declaration is provided, the class belongs to the unnamed (default) package. It is bad practice to use default package in real projects.',
      romanUrduExplanation: 'Agar package declaration nahi hai toh class unnamed (default) package mein hoti hai. Real projects mein default package use karna galat practice hai.',
      difficulty: 'easy', topicTags: ['packages', 'default-package'], xpReward: 25, moduleId: 'module-10',
    },
    {
      id: 'm10-quiz-003', type: 'mcq', question: 'What is the import statement used for?',
      options: ['Declaring packages', 'Importing classes from other packages to use without full qualification', 'Creating objects', 'Defining interfaces'],
      correctAnswer: 'Importing classes from other packages to use without full qualification',
      explanation: 'import allows you to use class names directly instead of fully qualified names. Example: import java.util.List; lets you use List instead of java.util.List.',
      romanUrduExplanation: 'import aapko class names directly use karne deta hai without full qualification. Example: import java.util.List; se List use kar sakte hain.',
      difficulty: 'easy', topicTags: ['import', 'packages'], xpReward: 25, moduleId: 'module-10',
    },
    {
      id: 'm10-quiz-004', type: 'mcq', question: 'What does java.lang.* import give you access to?',
      options: ['All Java classes', 'Core classes like String, System, Math, Object', 'GUI components', 'Database classes'],
      correctAnswer: 'Core classes like String, System, Math, Object',
      explanation: 'java.lang is automatically imported. It contains fundamental classes: String, Object, System, Math, Integer, Boolean, etc.',
      romanUrduExplanation: 'java.lang automatically import hota hai. Isme fundamental classes hain: String, Object, System, Math, Integer, Boolean, etc.',
      difficulty: 'easy', topicTags: ['java-lang', 'packages', 'auto-import'], xpReward: 25, moduleId: 'module-10',
    },
    {
      id: 'm10-quiz-005', type: 'true-false', question: 'Static import allows you to access static members without class name prefix.',
      correctAnswer: 'True',
      explanation: 'Static import lets you use static methods and fields directly. Example: import static java.lang.Math.PI; lets you use PI instead of Math.PI.',
      romanUrduExplanation: 'Static import aapko static methods aur fields directly use karne deta hai. Example: import static java.lang.Math.PI; se PI use kar sakte hain.',
      difficulty: 'medium', topicTags: ['static-import', 'packages'], xpReward: 25, moduleId: 'module-10',
    },
    {
      id: 'm10-quiz-006', type: 'mcq', question: 'Which access modifier makes a member visible within the same package and subclass?',
      options: ['public', 'private', 'protected', 'default (no modifier)'],
      correctAnswer: 'protected',
      explanation: 'protected members are accessible within the same package AND in subclasses (even in different packages via inheritance). Default access is same-package only.',
      romanUrduExplanation: 'protected members same package AND subclasses mein accessible hain (chahe different packages mein ho inheritance ke through). Default access sirf same package.',
      difficulty: 'medium', topicTags: ['access-modifiers', 'packages', 'protected'], xpReward: 30, moduleId: 'module-10',
    },
    {
      id: 'm10-quiz-007', type: 'mcq', question: 'What is the access modifier order from most to least restrictive?',
      options: [
        'public > protected > default > private',
        'private > default > protected > public',
        'private > protected > default > public',
        'public > default > protected > private',
      ],
      correctAnswer: 'private > default > protected > public',
      explanation: 'private (most restrictive) < default < protected < public (least restrictive). private = same class, default = same package, protected = package + subclass, public = everywhere.',
      romanUrduExplanation: 'private (zyada restrictive) < default < protected < public (kam restrictive). private = same class, default = same package, protected = package + subclass, public = har jagah.',
      difficulty: 'medium', topicTags: ['access-modifiers', 'visibility'], xpReward: 30, moduleId: 'module-10',
    },
    {
      id: 'm10-quiz-008', type: 'mcq', question: 'What happens when you compile a class with package declaration?',
      options: [
        'The .class file goes to the default folder',
        'Directory structure matching the package name is created',
        'The class becomes public',
        'Nothing changes',
      ],
      correctAnswer: 'Directory structure matching the package name is created',
      explanation: 'Package declaration determines the directory structure. package com.example; means the .class file should be in com/example/ directory.',
      romanUrduExplanation: 'Package declaration directory structure determine karta hai. package com.example; ka matlab .class file com/example/ directory mein honi chahiye.',
      difficulty: 'medium', topicTags: ['packages', 'compilation', 'directory-structure'], xpReward: 30, moduleId: 'module-10',
    },
    {
      id: 'm10-quiz-009', type: 'true-false', question: 'A Java file can have multiple public classes.',
      correctAnswer: 'False',
      explanation: 'A Java file can have at most one public class. The public class name must match the file name. Other classes in the file must be package-private (no modifier).',
      romanUrduExplanation: 'Ek Java file mein ek se zyada public classes nahi ho sakti. Public class ka naam file name se match karna chahiye.',
      difficulty: 'easy', topicTags: ['packages', 'compilation', 'public-class'], xpReward: 25, moduleId: 'module-10',
    },
    {
      id: 'm10-quiz-010', type: 'mcq', question: 'What is the naming convention for Java packages?',
      options: ['PascalCase', 'camelCase', 'lowercase with dots (e.g., com.example.project)', 'UPPERCASE'],
      correctAnswer: 'lowercase with dots (e.g., com.example.project)',
      explanation: 'Java package naming convention is all lowercase, reverse domain name format: com.company.project. No underscores or mixed case.',
      romanUrduExplanation: 'Java package naming convention sab lowercase hai, reverse domain name format: com.company.project. No underscores ya mixed case.',
      difficulty: 'easy', topicTags: ['packages', 'naming-conventions'], xpReward: 25, moduleId: 'module-10',
    },
  ],
  scenarios: [
    {
      id: 'm10-sq-001', title: 'E-Commerce Package Structure',
      scenario: 'You are building an e-commerce app. You need packages for: user management, product catalog, order processing, and payment. Some classes in order need to access package-private methods in user.',
      question: 'How should you structure packages?',
      type: 'architecture',
      options: [
        'Put everything in default package',
        'Create separate packages (com.shop.user, com.shop.product, com.shop.order, com.shop.payment) and use protected for cross-package subclass access',
        'One package for all classes',
        'Use only public and private modifiers',
      ],
      correctAnswer: 'Create separate packages (com.shop.user, com.shop.product, com.shop.order, com.shop.payment) and use protected for cross-package subclass access',
      explanation: 'Separate packages by responsibility. Use protected for access in subclasses across packages. Keep package-private for same-package access only.',
      romanUrduExplanation: 'Responsibility ke hisaab se separate packages banao. Cross-package subclass access ke liye protected use karo.',
      relatedConcepts: ['packages', 'access-modifiers', 'architecture'], difficulty: 'medium',
    },
  ],
  outputs: [
    {
      id: 'm10-oq-001', lessonId: 'lesson-10-01',
      code: `// File: com/shop/User.java
package com.shop;

public class User {
    String name = "Ali"; // package-private
    protected int age = 25;
    public String email = "ali@test.com";
}

// File: com/shop/Admin.java (same package)
package com.shop;

public class Admin {
    void printUser() {
        User u = new User();
        System.out.println(u.name);  // ?
        System.out.println(u.age);   // ?
        System.out.println(u.email); // ?
    }
}`,
      options: ['Ali, 25, ali@test.com', 'Compilation error on name', 'Compilation error on all', 'Ali only'],
      correctOutput: 'Ali, 25, ali@test.com',
      explanation: 'Admin is in same package (com.shop) as User, so all access levels (package-private, protected, public) are visible.',
      romanUrduExplanation: 'Admin same package (com.shop) mein hai jisme User hai, toh saare access levels (package-private, protected, public) visible hain.',
      conceptTested: ['packages', 'access-modifiers'], difficulty: 'easy',
    },
  ],
  debugs: [
    {
      id: 'm10-dc-001', title: 'Package-Private Access from Different Package',
      description: 'Accessing package-private member from a different package causes compilation error.',
      buggyCode: `// File: com/shop/User.java
package com.shop;

public class User {
    String name = "Ali"; // package-private
}

// File: com/admin/Admin.java
package com.admin;
import com.shop.User;

public class Admin {
    void printName() {
        User u = new User();
        System.out.println(u.name); // Compilation error!
    }
}`,
      expectedBehavior: 'Should be able to access the name field or provide a proper accessor.',
      hints: ['Package-private members are only accessible within the same package', 'Make the field public or add a getter method', 'Use protected if subclasses in other packages need access'],
      solution: `// File: com/shop/User.java
package com.shop;

public class User {
    private String name = "Ali";

    public String getName() {
        return name;
    }
}

// File: com/admin/Admin.java
package com.admin;
import com.shop.User;

public class Admin {
    void printName() {
        User u = new User();
        System.out.println(u.getName());
    }
}`,
      explanation: 'Package-private access restricts to same package. Use public getters for cross-package access, maintaining encapsulation.',
      romanUrduExplanation: 'Package-private access sirf same package tak restrict karta hai. Cross-package access ke liye public getters use karo.',
      difficulty: 'medium', topicTags: ['packages', 'access-modifiers', 'encapsulation'], xpReward: 60,
      errorMessage: 'name has package-private access in User', errorType: 'compilation', conceptTested: ['packages', 'access-modifiers'],
    },
  ],
  mistakes: [
    {
      id: 'm10-mq-001', title: 'Importing Non-existent Package',
      code: `import com.shoppe.User; // Typo! Should be com.shop`,
      mistakeDescription: 'Package name misspelling causes import failure.',
      possibleMistakes: ['Typos in package names', 'Case sensitivity errors', 'Wrong directory structure'],
      correctMistake: 'Verify package names match the actual directory structure exactly.',
      correction: `import com.shop.User; // Correct package name`,
      explanation: 'Package names are case-sensitive and must match the directory structure exactly.',
      romanUrduExplanation: 'Package names case-sensitive hain aur directory structure se exactly match karne chahiye.',
      difficulty: 'easy', conceptTested: ['packages', 'import', 'case-sensitivity'],
    },
  ],
  codeCompletions: [
    {
      id: 'm10-cc-001', lessonId: 'lesson-10-01',
      codeTemplate: `// TODO: Declare this class in com.example.utils package
__________

public class StringUtils {
    public static boolean isEmpty(String s) {
        return s == null || s.isEmpty();
    }
}`,
      blank: 'package com.example.utils;',
      acceptedAnswers: ['package com.example.utils;'],
      explanation: 'The package declaration must be the first line in a Java file (before imports and class definition).',
      romanUrduExplanation: 'Package declaration Java file mein pehli line honi chahiye (imports aur class definition se pehle).',
      hints: ['Package declaration goes at the top of the file', 'Use dots to separate package levels', 'End with a semicolon'],
      difficulty: 'easy', conceptTested: ['packages', 'declaration'],
    },
  ],
};
