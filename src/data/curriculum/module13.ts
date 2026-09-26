import type { Module } from '@/types';

export const module13: Module = {
  id: 'module-13',
  title: 'Object Relationships',
  slug: 'object-relationships',
  order: 13,
  description: 'Understand how objects relate to each other in OOP: association, aggregation, composition, and dependency. Learn to model real-world relationships in Java code and represent them with UML class diagrams.',
  icon: 'Network',
  color: '#06b6d4',
  xpReward: 480,
  isUnlocked: false,
  completed: false,
  progress: 0,
  totalDuration: 200,
  prerequisiteModuleIds: ['module-12'],
  lessons: [
    {
      id: 'lesson-13-01',
      moduleId: 'module-13',
      title: 'Types of Relationships',
      slug: 'types-of-relationships',
      order: 1,
      duration: 25,
      description: 'Learn the four fundamental types of object relationships: association, aggregation, composition, and dependency.',
      learningObjectives: [
        { id: 'lo-13-01-1', description: 'Identify the four types of object relationships', completed: false },
        { id: 'lo-13-01-2', description: 'Distinguish between association, aggregation, composition, and dependency', completed: false },
        { id: 'lo-13-01-3', description: 'Understand the strength hierarchy from dependency to composition', completed: false },
        { id: 'lo-13-01-4', description: 'Map real-world relationships to the correct OOP relationship type', completed: false },
      ],
      englishExplanation: {
        id: 'ee-13-01',
        text: `In Object-Oriented Programming, objects do not exist in isolation. They interact with and relate to other objects. Understanding these relationships is fundamental to designing well-structured Java applications.\n\nThere are four primary types of relationships between objects, arranged from weakest to strongest coupling:\n\n1. **Dependency** (USES-A): The weakest relationship. One class uses another temporarily, typically as a method parameter or local variable. When the method finishes, the dependency ends. Example: a Doctor examines a Patient. The Doctor uses the Patient only during the examination.\n\n2. **Association** (KNOWS-A): A structural relationship where one class knows about another. Objects can exist independently. Example: a Teacher teaches Students. The Teacher has a reference to Students, but both exist independently.\n\n3. **Aggregation** (HAS-A, weak): A special form of association where one object contains another, but the contained object can exist independently. The contained object has its own lifecycle. Example: a Department has Professors. If the Department closes, Professors still exist.\n\n4. **Composition** (HAS-A, strong): The strongest relationship. One object owns another, and the contained object cannot exist without the owner. The lifecycle is dependent. Example: a House has Rooms. If the House is destroyed, the Rooms cease to exist.\n\nThe key distinction between Aggregation and Composition is lifecycle dependency. In Aggregation, the part can outlive the whole. In Composition, the part dies with the whole. This distinction affects how you design constructors, destructors, and memory management in Java.`
      },
      romanUrduExplanation: {
        id: 'ru-13-01',
        text: `Object-Oriented Programming mein objects akelay nahi hote. Wo doosre objects se interact aur relate karte hain. In relationships ko samajhna well-structured Java applications design karne ke liye fundamental hai.\n\nObjects ke beech char primary types ki relationships hain, weakest se strongest coupling tak:\n\n1. **Dependency** (USES-A): Sabse kamzor relationship. Ek class doosri class ko temporarily use karti hai, typically method parameter ya local variable ke taur par. Jab method khatam hota hai, dependency khatam ho jaati hai.\n\n2. **Association** (KNOWS-A): Structural relationship jahan ek class doosri ke baare mein jaanti hai. Objects independently exist kar sakte hain.\n\n3. **Aggregation** (HAS-A, weak): Association ka special form jahan ek object doosre ko contain karta hai lekin contained object independently exist kar sakta hai. Dono ke alag-alag lifecycles hain.\n\n4. **Composition** (HAS-A, strong): Sabse strong relationship. Ek object doosra own karta hai aur contained object owner ke bina exist nahi kar sakta. Lifecycle dependent hota hai.\n\nAggregation aur Composition ke beech main distinction lifecycle dependency hai. Aggregation mein part whole se zyada survive kar sakta hai. Composition mein part whole ke saath mar jaata hai.`
      },
      keyPoints: [
        { id: 'kp-13-01-1', title: 'Dependency (USES-A)', description: 'Weakest. One class temporarily uses another as parameter or local variable. No structural link.' },
        { id: 'kp-13-01-2', title: 'Association (KNOWS-A)', description: 'Structural. One class has a reference to another. Both can exist independently.' },
        { id: 'kp-13-01-3', title: 'Aggregation (HAS-A weak)', description: 'One object contains another. The contained object has its own independent lifecycle.' },
        { id: 'kp-13-01-4', title: 'Composition (HAS-A strong)', description: 'One object owns another. The contained object cannot exist without the owner.' },
      ],
      codeExamples: [
        {
          id: 'ce-13-01-1',
          title: 'All Four Relationships',
          code: `// DEPENDENCY: Doctor uses Patient temporarily
class Doctor {
    void examine(Patient patient) {
        System.out.println("Examining " + patient.name);
    }
}

// ASSOCIATION: Teacher knows about Students
class Teacher {
    private List<Student> students; // knows about students
    Teacher(List<Student> students) {
        this.students = students;
    }
}

// AGGREGATION: Department has Professors (independent lifecycle)
class Department {
    private List<Professor> professors;
    Department(List<Professor> professors) {
        this.professors = professors;
    }
    // If Department closes, Professors still exist
}

// COMPOSITION: House has Rooms (dependent lifecycle)
class House {
    private List<Room> rooms;
    House() {
        this.rooms = new ArrayList<>();
        rooms.add(new Room("Bedroom"));
        rooms.add(new Room("Kitchen"));
    }
    // If House is destroyed, Rooms cease to exist
}`,
          language: 'java',
          explanation: 'All four relationship types demonstrated. Dependency is temporary (method parameter). Association is structural. Aggregation has independent lifecycle. Composition has dependent lifecycle.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-13-01-1',
          title: 'Hospital System Relationships',
          scenario: 'A hospital has departments, doctors, patients, and medical records.',
          oopConcept: 'Hospital COMPOSES Departments (dependent). Department AGGREGATES Doctors (independent). Doctor DEPENDS ON Patient during examination (temporary). Doctor ASSOCIATES with MedicalRecords (structural reference).',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-13-01-1',
          title: 'Confusing Aggregation with Composition',
          incorrectCode: `// WRONG: Treating aggregation as composition\nclass Team {\n    private Player player;\n    Team() {\n        this.player = new Player(); // Created inside = looks like composition\n    }\n    // But Player can exist independently!\n}`,
          correctCode: `// CORRECT: Player is passed in (aggregation — independent lifecycle)\nclass Team {\n    private Player player;\n    Team(Player player) {\n        this.player = player; // Passed in = aggregation\n    }\n    // Player exists before and after Team\n}`,
          explanation: 'If the contained object is created inside the constructor, it looks like composition. If it is passed in, it is likely aggregation. Consider whether the part can outlive the whole.',
        },
      ],
      examNotes: [
        { id: 'en-13-01-1', title: 'Relationship Strength', content: 'Dependency < Association < Aggregation < Composition. Knowing this hierarchy is essential for exams.', importance: 'high' },
        { id: 'en-13-01-2', title: 'Lifecycle Test', content: 'To distinguish Aggregation vs Composition, ask: "Can the part exist without the whole?" If yes, aggregation. If no, composition.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-13-01-1', question: 'What is the difference between Aggregation and Composition?', answer: 'Aggregation: part can exist independently (Department has Professors). Composition: part cannot exist without the whole (House has Rooms).', difficulty: 'medium' },
        { id: 'vq-13-01-2', question: 'Give an example of a Dependency relationship.', answer: 'A Doctor examines a Patient. The Doctor uses the Patient only during the examination method call. After the method ends, the dependency is gone.', difficulty: 'easy' },
        { id: 'vq-13-01-3', question: 'What is the weakest type of object relationship?', answer: 'Dependency (USES-A). One class temporarily uses another as a method parameter or local variable.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-13-01-1', type: 'mcq', question: 'Which relationship means the contained object can exist independently?', options: ['Composition', 'Aggregation', 'Dependency', 'Inheritance'], correctAnswer: 'Aggregation', explanation: 'In Aggregation, the contained object has its own independent lifecycle.' },
        { id: 'qc-13-01-2', type: 'true-false', question: 'Composition is stronger than Aggregation.', correctAnswer: 'True', explanation: 'Composition implies dependent lifecycle — the part cannot exist without the whole.' },
        { id: 'qc-13-01-3', type: 'mcq', question: 'When a method receives an object as a parameter, this is an example of:', options: ['Composition', 'Aggregation', 'Dependency', 'Association'], correctAnswer: 'Dependency', explanation: 'Method parameters create temporary dependencies — the weakest relationship type.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-13-01-1',
          scenario: 'A library system has Libraries, Books, Authors, and Librarians. Books are owned by Libraries. Authors write Books. Librarians help Members borrow Books.',
          question: 'Identify the relationship types between these classes.',
          type: 'concept-application',
          options: [
            'Library COMPOSES Books, Author ASSOCIATES with Book, Librarian DEPENDS ON Member',
            'Library AGGREGATES Books, Author ASSOCIATES with Book, Librarian ASSOCIATES with Member',
            'Library ASSOCIATES with Books, Author AGGREGATES Book, Librarian DEPENDS ON Book',
            'All are Composition relationships',
          ],
          correctAnswer: 'Library COMPOSES Books, Author ASSOCIATES with Book, Librarian DEPENDS ON Member',
          explanation: 'Library COMPOSES Books (books exist only in library). Author ASSOCIATES with Book (both exist independently). Librarian DEPENDS ON Member temporarily during borrowing.',
          relatedConcepts: ['composition', 'association', 'dependency'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-relationships-overview',
      prerequisites: ['lesson-12-10'],
      xpReward: 60,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'object-relationships',
      difficulty: 'easy',
      estimatedMinutes: 25,
    },
    {
      id: 'lesson-13-02',
      moduleId: 'module-13',
      title: 'Association',
      slug: 'association',
      order: 2,
      duration: 20,
      description: 'Understand bidirectional and unidirectional associations, multiplicity, and how objects know about each other.',
      learningObjectives: [
        { id: 'lo-13-02-1', description: 'Implement unidirectional associations', completed: false },
        { id: 'lo-13-02-2', description: 'Implement bidirectional associations', completed: false },
        { id: 'lo-13-02-3', description: 'Define multiplicity in associations', completed: false },
        { id: 'lo-13-02-4', description: 'Handle the complexity of bidirectional relationship maintenance', completed: false },
      ],
      englishExplanation: {
        id: 'ee-13-02',
        text: `Association is a structural relationship where one class knows about another. Unlike dependency, association is permanent — the reference is stored as a field, not just a method parameter.\n\n**Unidirectional Association**: Class A knows about Class B, but Class B does not know about Class A. Example: A Student knows about their Course, but the Course does not track individual students. This is simpler to implement and maintain.\n\n**Bidirectional Association**: Both classes know about each other. A Teacher teaches Students, and Students know their Teacher. This requires careful implementation because both objects must maintain references to each other. When you set the teacher for a student, you must also add the student to the teacher's list.\n\n**Multiplicity** defines how many instances participate in the relationship:\n- 1 to 1: Each object relates to exactly one other (Student has one Advisor)\n- 1 to Many: One object relates to many (Teacher has many Students)\n- Many to Many: Both sides relate to many (Students enroll in many Courses, Courses have many Students)\n\nBidirectional associations require synchronization methods to keep both sides consistent. When setting a reference on one side, you must update the other side as well. This prevents data inconsistency where one object points to another but not vice versa.\n\nAssociation is the most common relationship in real-world Java applications. Most business objects are associated with each other in some way.`
      },
      romanUrduExplanation: {
        id: 'ru-13-02',
        text: `Association ek structural relationship hai jahan ek class doosri ke baare mein jaanti hai. Dependency ke mukable, association permanent hota hai reference field mein store hota hai.\n\n**Unidirectional Association**: Class A Class B ke baare mein jaanti hai, lekin Class B Class A ke baare mein nahi jaanti. Example: Student apne Course ke baare mein jaanta hai.\n\n**Bidirectional Association**: Dono classes ek doosre ke baare mein jaanti hain. Teacher Students ko jaanta hai, aur Students apne Teacher ko jaante hain. Ye careful implementation require karta hai.\n\n**Multiplicity** define karti hai ke kitne instances relationship mein participate karte hain:\n- 1 to 1: Har object exactly ek doosre se relate\n- 1 to Many: Ek object kai se relate\n- Many to Many: Dono sides kai se relate\n\nBidirectional associations ko consistent rakhne ke liye synchronization methods chahiye.`
      },
      keyPoints: [
        { id: 'kp-13-02-1', title: 'Unidirectional', description: 'One class knows about the other. Simpler to implement. Example: Student knows Course.' },
        { id: 'kp-13-02-2', title: 'Bidirectional', description: 'Both classes know about each other. Requires synchronization. Example: Teacher and Student.' },
        { id: 'kp-13-02-3', title: 'Multiplicity', description: 'Defines how many instances participate: 1:1, 1:N, N:M.' },
        { id: 'kp-13-02-4', title: 'Consistency', description: 'Bidirectional associations need helper methods to keep both sides in sync.' },
      ],
      codeExamples: [
        {
          id: 'ce-13-02-1',
          title: 'Unidirectional Association',
          code: `class Course {
    private String title;
    Course(String title) { this.title = title; }
    String getTitle() { return title; }
}

class Student {
    private String name;
    private Course course; // Student knows Course

    Student(String name, Course course) {
        this.name = name;
        this.course = course;
    }

    void printInfo() {
        System.out.println(name + " is enrolled in " + course.getTitle());
    }
}

public class Main {
    public static void main(String[] args) {
        Course oop = new Course("OOP");
        Student s1 = new Student("Ahmed", oop);
        Student s2 = new Student("Sara", oop);
        s1.printInfo();
        s2.printInfo();
    }
}`,
          language: 'java',
          output: `Ahmed is enrolled in OOP\nSara is enrolled in OOP`,
          explanation: 'Unidirectional: Student knows about Course, but Course does not track Students.',
        },
        {
          id: 'ce-13-02-2',
          title: 'Bidirectional Association',
          code: `import java.util.ArrayList;
import java.util.List;

class Teacher {
    private String name;
    private List<Student> students = new ArrayList<>();

    Teacher(String name) { this.name = name; }

    void addStudent(Student student) {
        students.add(student);
        student.setTeacher(this); // Keep both sides in sync
    }

    void printStudents() {
        System.out.println(name + " teaches:");
        for (Student s : students) {
            System.out.println("  - " + s.getName());
        }
    }

    String getName() { return name; }
}

class Student {
    private String name;
    private Teacher teacher;

    Student(String name) { this.name = name; }

    void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    String getName() { return name; }

    void printInfo() {
        System.out.println(name + "'s teacher: " + teacher.getName());
    }
}

public class Main {
    public static void main(String[] args) {
        Teacher t = new Teacher("Dr. Ali");
        Student s1 = new Student("Ahmed");
        Student s2 = new Student("Sara");

        t.addStudent(s1);
        t.addStudent(s2);

        t.printStudents();
        s1.printInfo();
    }
}`,
          language: 'java',
          output: `Dr. Ali teaches:\n  - Ahmed\n  - Sara\nAhmed's teacher: Dr. Ali`,
          explanation: 'Bidirectional: Both Teacher and Student maintain references. addStudent() syncs both sides.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-13-02-1',
          title: 'Social Media Connections',
          scenario: 'In a social network, users follow other users. User A follows User B, and User B may follow User A back.',
          oopConcept: 'Bidirectional association: User has a list of followers and a list of following. When A follows B, B must be added to A\'s following list AND A must be added to B\'s followers list.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-13-02-1',
          title: 'Forgetting to Sync Bidirectional Association',
          incorrectCode: `class Order {\n    private Customer customer;\n    void setCustomer(Customer c) { this.customer = c; }\n}\nclass Customer {\n    private List<Order> orders = new ArrayList<>();\n    // Missing: when setting customer, also add order to customer's list\n}`,
          correctCode: `class Order {\n    private Customer customer;\n    void setCustomer(Customer c) {\n        this.customer = c;\n        c.addOrder(this); // Sync both sides!\n    }\n}\nclass Customer {\n    private List<Order> orders = new ArrayList<>();\n    void addOrder(Order o) { orders.add(o); }\n}`,
          explanation: 'In bidirectional associations, you must update both sides. Forgetting one side leads to data inconsistency.',
        },
      ],
      examNotes: [
        { id: 'en-13-02-1', title: 'Bidirectional Complexity', content: 'Bidirectional associations require synchronization. Always provide helper methods that update both sides.', importance: 'high' },
        { id: 'en-13-02-2', title: 'Multiplicities', content: '1:1 (Student-Advisor), 1:N (Teacher-Students), N:M (Students-Courses). N:M often requires a join table/class.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-13-02-1', question: 'Why are bidirectional associations harder to implement?', answer: 'Both objects must maintain references to each other. When one side is updated, the other must be synchronized. This adds complexity and risk of inconsistency.', difficulty: 'medium' },
        { id: 'vq-13-02-2', question: 'How do you handle N:M associations in Java?', answer: 'Use a join class. For Students-Courses, create Enrollment class that links a Student to a Course. This converts N:M into two 1:N associations.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-13-02-1', type: 'mcq', question: 'In a unidirectional association, which class holds the reference?', options: ['Both classes', 'Only the dependent class', 'Only the independent class', 'Neither class'], correctAnswer: 'Only the dependent class', explanation: 'In unidirectional association, one class knows about the other but not vice versa.' },
        { id: 'qc-13-02-2', type: 'true-false', question: 'In bidirectional association, you must update both sides when setting a reference.', correctAnswer: 'True', explanation: 'Failing to sync both sides leads to data inconsistency.' },
        { id: 'qc-13-02-3', type: 'mcq', question: 'A Student enrolls in many Courses, and a Course has many Students. This is:', options: ['1:1', '1:N', 'N:M', 'Dependency'], correctAnswer: 'N:M', explanation: 'Many-to-many: both sides have multiple instances related to each other.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-13-02-1',
          scenario: 'You are modeling a company where Employees work in Departments. Each employee belongs to one department, and each department has many employees.',
          question: 'What type of association is this and how would you implement it?',
          type: 'design-decision',
          options: [
            'Unidirectional: Department has List<Employee>',
            'Bidirectional: Department has List<Employee>, Employee has Department reference',
            'Composition: Department creates Employees',
            'Dependency: Department method receives Employee parameter',
          ],
          correctAnswer: 'Bidirectional: Department has List<Employee>, Employee has Department reference',
          explanation: 'Bidirectional allows navigation from both sides: find employees in a department, or find an employee\'s department.',
          relatedConcepts: ['association', 'bidirectional', 'multiplicity'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-association',
      prerequisites: ['lesson-13-01'],
      xpReward: 60,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'association',
      difficulty: 'easy',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-13-03',
      moduleId: 'module-13',
      title: 'Aggregation',
      slug: 'aggregation',
      order: 3,
      duration: 20,
      description: 'Master aggregation: HAS-A relationships with independent lifecycles and weak ownership.',
      learningObjectives: [
        { id: 'lo-13-03-1', description: 'Identify aggregation relationships in real-world scenarios', completed: false },
        { id: 'lo-13-03-2', description: 'Implement aggregation where parts are passed in from outside', completed: false },
        { id: 'lo-13-03-3', description: 'Distinguish aggregation from composition through lifecycle analysis', completed: false },
        { id: 'lo-13-03-4', description: 'Design constructors that support aggregation patterns', completed: false },
      ],
      englishExplanation: {
        id: 'ee-13-03',
        text: `Aggregation is a special form of association where one object contains another, but the contained object can exist independently. This is the "HAS-A" relationship with weak ownership.\n\nThe defining characteristic of aggregation is that the contained object (the part) has its own lifecycle, separate from the container (the whole). The container does not create the part, and destroying the container does not destroy the part.\n\nExample: A Library has Books. The Books exist before being added to the Library. If the Library closes, the Books still exist — they can be moved to another Library. The Library does not own the Books in an absolute sense; it merely holds references to them.\n\nIn code, aggregation is implemented by passing the contained object into the constructor or a setter method. The container stores a reference but does not create the object.\n\nKey indicators of aggregation:\n1. The contained object is passed in (not created inside the constructor)\n2. The same object can be shared between multiple containers\n3. The contained object can outlive the container\n4. The container manages the relationship but not the lifecycle\n\nAggregation promotes loose coupling. The container and contained object are relatively independent. Changes to one do not necessarily affect the other.`
      },
      romanUrduExplanation: {
        id: 'ru-13-03',
        text: `Aggregation association ka special form hai jahan ek object doosre ko contain karta hai lekin contained object independently exist kar sakta hai. Ye "HAS-A" relationship hai weak ownership ke saath.\n\nAggregation ki defining characteristic ye hai ke contained object (part) ka apna lifecycle hota hai, container (whole) se alag. Container part ko create nahi karta, aur container ko destroy karne se part destroy nahi hota.\n\nExample: Library ke paas Books hain. Books Library mein add hone se pehle exist karti hain. Agar Library band ho jaaye, toh Books still exist karti hain.\n\nCode mein, aggregation implement hoti hai contained object ko constructor ya setter method mein pass karke. Container reference store karta hai lekin object create nahi karta.\n\nAggregation loose coupling promote karti hai. Container aur contained object relatively independent hain.`
      },
      keyPoints: [
        { id: 'kp-13-03-1', title: 'Independent Lifecycle', description: 'The contained object can exist before, during, and after the container.' },
        { id: 'kp-13-03-2', title: 'Passed In, Not Created', description: 'The container receives the part from outside rather than creating it internally.' },
        { id: 'kp-13-03-3', title: 'Shareable Parts', description: 'The same contained object can be shared between multiple containers.' },
        { id: 'kp-13-03-4', title: 'Loose Coupling', description: 'Container and contained object are relatively independent. Changes to one do not affect the other.' },
      ],
      codeExamples: [
        {
          id: 'ce-13-03-1',
          title: 'Library and Books (Aggregation)',
          code: `class Book {
    private String title;
    private String author;

    Book(String title, String author) {
        this.title = title;
        this.author = author;
    }

    String getTitle() { return title; }
}

class Library {
    private String name;
    private List<Book> books;

    Library(String name, List<Book> books) {
        this.name = name;
        this.books = books; // Books are passed in — aggregation
    }

    void printBooks() {
        System.out.println(name + " has:");
        for (Book b : books) {
            System.out.println("  - " + b.getTitle());
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Book b1 = new Book("OOP Basics", "Ali");
        Book b2 = new Book("Java Guide", "Sara");

        // Books exist independently
        Library lib1 = new Library("City Library", List.of(b1, b2));

        // Same books can be in another library
        Library lib2 = new Library("Uni Library", List.of(b1));

        lib1.printBooks();
        lib2.printBooks();

        // If lib1 closes, b1 and b2 still exist!
    }
}`,
          language: 'java',
          output: `City Library has:\n  - OOP Basics\n  - Java Guide\nUni Library has:\n  - OOP Basics`,
          explanation: 'Books are passed in from outside. Both libraries can share the same Book objects. Books exist independently of any library.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-13-03-1',
          title: 'University and Professors',
          scenario: 'A university has professors. Professors are hired (passed in), not created by the university. If the university closes, professors can work elsewhere.',
          oopConcept: 'University AGGREGATES Professors. The constructor receives Professor objects. Professors have their own lifecycle independent of the university.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-13-03-1',
          title: 'Creating Parts Inside Constructor (Looks Like Composition)',
          incorrectCode: `class Team {\n    private List<Player> players;\n    Team() {\n        this.players = new ArrayList<>();\n        players.add(new Player("Ahmed")); // Created inside!\n    }\n}`,
          correctCode: `class Team {\n    private List<Player> players;\n    Team(List<Player> players) {\n        this.players = players; // Passed in = aggregation\n    }\n}`,
          explanation: 'If you create parts inside the constructor, it is composition. For aggregation, parts should be passed in from outside.',
        },
      ],
      examNotes: [
        { id: 'en-13-03-1', title: 'Aggregation vs Composition', content: 'Aggregation: part passed in, independent lifecycle, shareable. Composition: part created inside, dependent lifecycle, exclusive.', importance: 'high' },
        { id: 'en-13-03-2', title: 'Constructor Design', content: 'Aggregation uses constructor injection. The part is received as a parameter, not created inside.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-13-03-1', question: 'How do you identify aggregation in code?', answer: 'The contained object is passed into the constructor or setter, not created inside the class. The part can exist independently of the whole.', difficulty: 'medium' },
        { id: 'vq-13-03-2', question: 'Can the same object be part of two aggregations?', answer: 'Yes. A Book can be in multiple Libraries simultaneously. The same object can be shared between containers.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-13-03-1', type: 'mcq', question: 'In aggregation, the contained object is typically:', options: ['Created inside the constructor', 'Passed in from outside', 'Created lazily on first access', 'Hardcoded in the class'], correctAnswer: 'Passed in from outside', explanation: 'Aggregation means the part has its own lifecycle and is passed in from outside.' },
        { id: 'qc-13-03-2', type: 'true-false', question: 'In aggregation, the contained object is destroyed when the container is destroyed.', correctAnswer: 'False', explanation: 'The contained object has its own independent lifecycle in aggregation.' },
        { id: 'qc-13-03-3', type: 'mcq', question: 'Which is an example of aggregation?', options: ['Car has Engine', 'Library has Books', 'Human has Heart', 'House has Walls'], correctAnswer: 'Library has Books', explanation: 'Books exist independently of the Library. Car-Engine, Human-Heart, House-Walls are composition.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-13-03-1',
          scenario: 'An airline system has Airlines, Airports, and Flights. An airline operates flights between airports. Airports exist independently of airlines.',
          question: 'Which relationships are aggregation?',
          type: 'concept-application',
          options: [
            'Airline aggregates Airports (airports are shared)',
            'Airline aggregates Flights (flights exist independently)',
            'Airport aggregates Airlines (airlines are shared)',
            'All relationships are aggregation',
          ],
          correctAnswer: 'Airline aggregates Airports (airports are shared)',
          explanation: 'Airports exist independently and can be used by multiple airlines. Flights are typically created by airlines (composition).',
          relatedConcepts: ['aggregation', 'independent-lifecycle', 'shared-parts'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-aggregation',
      prerequisites: ['lesson-13-01', 'lesson-13-02'],
      xpReward: 60,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'aggregation',
      difficulty: 'easy',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-13-04',
      moduleId: 'module-13',
      title: 'Composition',
      slug: 'composition',
      order: 4,
      duration: 25,
      description: 'Master composition: strong ownership, dependent lifecycles, and whole-part relationships.',
      learningObjectives: [
        { id: 'lo-13-04-1', description: 'Identify composition relationships where the part cannot exist without the whole', completed: false },
        { id: 'lo-13-04-2', description: 'Implement composition by creating parts inside the constructor', completed: false },
        { id: 'lo-13-04-3', description: 'Design classes with proper lifecycle management in composition', completed: false },
        { id: 'lo-13-04-4', description: 'Distinguish composition from aggregation through lifecycle tests', completed: false },
      ],
      englishExplanation: {
        id: 'ee-13-04',
        text: `Composition is the strongest form of object relationship. It represents a "whole-part" relationship where the part cannot exist without the whole. The lifecycle of the contained object is directly tied to the container.\n\nIn composition, the container creates the contained object and is responsible for its entire lifecycle. When the container is destroyed, all its composed parts are also destroyed.\n\nExample: A Car has an Engine. The Engine is created as part of the Car. If the Car is scrapped, the Engine goes with it. The Engine does not exist independently — it is an integral part of the Car.\n\nIn code, composition is implemented by creating the contained object inside the constructor of the container. The container owns the part exclusively — it creates it, manages it, and destroys it.\n\nKey characteristics of composition:\n1. The container creates the part (new Part() inside constructor)\n2. The part has no existence outside the container\n3. The part cannot be shared between containers\n4. The container manages the part's entire lifecycle\n\nComposition promotes strong encapsulation. The contained object is hidden inside the container. External code cannot access it directly. This ensures the internal structure is completely controlled by the container.\n\nComposition is preferred over aggregation when the relationship is mandatory and the part has no meaningful existence outside the whole.`
      },
      romanUrduExplanation: {
        id: 'ru-13-04',
        text: `Composition object relationship ka sabse strong form hai. Ye "whole-part" relationship represent karta hai jahan part whole ke bina exist nahi kar sakta. Contained object ka lifecycle directly container se tied hota hai.\n\nComposition mein, container contained object create karta hai aur uski poori lifecycle ka responsible hota hai. Jab container destroy hota hai, toh saare composed parts bhi destroy ho jaate hain.\n\nExample: Car ke paas Engine hai. Engine Car ka part hai. Agar Car scrap ho jaaye, toh Engine bhi chala jaata hai.\n\nCode mein, composition implement hoti hai contained object ko container ke constructor ke andar create karke. Container part ko exclusively own karta hai.\n\nComposition strong encapsulation promote karti hai. Contained object container ke andar hidden hota hai. External code use directly access nahi kar sakta.`
      },
      keyPoints: [
        { id: 'kp-13-04-1', title: 'Dependent Lifecycle', description: 'The contained object is created by and dies with the container.' },
        { id: 'kp-13-04-2', title: 'Created Inside', description: 'The part is created inside the container constructor using new().' },
        { id: 'kp-13-04-3', title: 'Exclusive Ownership', description: 'The part cannot be shared between multiple containers.' },
        { id: 'kp-13-04-4', title: 'Strong Encapsulation', description: 'The contained object is hidden inside the container. External access is prevented.' },
      ],
      codeExamples: [
        {
          id: 'ce-13-04-1',
          title: 'Car and Engine (Composition)',
          code: `class Engine {
    private String type;
    Engine(String type) {
        this.type = type;
        System.out.println("Engine created: " + type);
    }
    void start() { System.out.println(type + " engine started"); }
}

class Car {
    private String model;
    private Engine engine; // Car COMPOSES Engine

    Car(String model, String engineType) {
        this.model = model;
        this.engine = new Engine(engineType); // Created inside = composition
        System.out.println("Car created: " + model);
    }

    void start() {
        System.out.println(model + " starting...");
        engine.start();
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car("Toyota", "V6");
        car.start();
        // Engine cannot exist without Car
        // If Car is garbage collected, Engine goes with it
    }
}`,
          language: 'java',
          output: `Engine created: V6\nCar created: Toyota\nToyota starting...\nV6 engine started`,
          explanation: 'Car creates Engine in its constructor. Engine has no existence outside Car. When Car is destroyed, Engine is destroyed too.',
        },
        {
          id: 'ce-13-04-2',
          title: 'Computer Components (Composition)',
          code: `class CPU {
    private String model;
    CPU(String model) { this.model = model; }
    String getInfo() { return "CPU: " + model; }
}

class RAM {
    private int sizeGB;
    RAM(int sizeGB) { this.sizeGB = sizeGB; }
    String getInfo() { return "RAM: " + sizeGB + "GB"; }
}

class Computer {
    private String brand;
    private CPU cpu;
    private RAM ram;

    Computer(String brand, String cpuModel, int ramGB) {
        this.brand = brand;
        this.cpu = new CPU(cpuModel);   // Created inside
        this.ram = new RAM(ramGB);       // Created inside
    }

    void printSpecs() {
        System.out.println(brand + " Computer:");
        System.out.println("  " + cpu.getInfo());
        System.out.println("  " + ram.getInfo());
    }
}

public class Main {
    public static void main(String[] args) {
        Computer pc = new Computer("Dell", "i7", 16);
        pc.printSpecs();
        // CPU and RAM cannot exist without Computer
    }
}`,
          language: 'java',
          output: `Dell Computer:\n  CPU: i7\n  RAM: 16GB`,
          explanation: 'Computer creates CPU and RAM inside its constructor. These components have no meaning outside the Computer.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-13-04-1',
          title: 'Order and OrderItems',
          scenario: 'An e-commerce system has Orders and OrderItems. Each OrderItem is a line item within a specific Order.',
          oopConcept: 'Order COMPOSES OrderItems. OrderItems are created inside the Order. If the Order is cancelled, all OrderItems are also deleted. An OrderItem has no meaning outside its Order.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-13-04-1',
          title: 'Exposing Composed Parts',
          incorrectCode: `class Car {\n    private Engine engine;\n    Car() { this.engine = new Engine(); }\n    public Engine getEngine() { return engine; } // Exposes internal part!\n}\n// External code: Engine e = car.getEngine(); // Breaks encapsulation`,
          correctCode: `class Car {\n    private Engine engine;\n    Car() { this.engine = new Engine(); }\n    void start() { engine.start(); } // Car controls Engine\n    // No getter — Engine is internal implementation detail\n}`,
          explanation: 'Composition means the part is internal. Exposing it through a getter breaks encapsulation. The container should control how the part is used.',
        },
      ],
      examNotes: [
        { id: 'en-13-04-1', title: 'Composition Test', content: 'Ask: "Can the part exist without the whole?" If no, it is composition. Ask: "Does the whole create the part?" If yes, it is composition.', importance: 'high' },
        { id: 'en-13-04-2', title: 'Composition vs Aggregation Code', content: 'Composition: new Part() inside constructor. Aggregation: Part passed in as parameter. This is the key code-level distinction.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-13-04-1', question: 'How do you distinguish composition from aggregation in code?', answer: 'Composition: the container creates the part (new Part() inside constructor). Aggregation: the part is passed in from outside.', difficulty: 'medium' },
        { id: 'vq-13-04-2', question: 'Why should you not expose composed parts through getters?', answer: 'It breaks encapsulation. The whole controls the part. External code accessing the part directly can violate the container\'s invariants.', difficulty: 'medium' },
        { id: 'vq-13-04-3', question: 'Give an example of composition in a university system.', answer: 'A Course composes Lessons. Lessons are created within a Course and have no meaning outside it. If the Course is deleted, its Lessons are also deleted.', difficulty: 'easy' },
      ],
      quickCheckQuestions: [
        { id: 'qc-13-04-1', type: 'mcq', question: 'In composition, the contained object is typically:', options: ['Passed in from outside', 'Created inside the constructor', 'Shared between containers', 'Lazily initialized'], correctAnswer: 'Created inside the constructor', explanation: 'Composition means the whole creates the part. The part is an internal implementation detail.' },
        { id: 'qc-13-04-2', type: 'true-false', question: 'In composition, the contained object can exist independently.', correctAnswer: 'False', explanation: 'The contained object in composition cannot exist without the container.' },
        { id: 'qc-13-04-3', type: 'mcq', question: 'Which is an example of composition?', options: ['Library has Books', 'Car has Engine', 'Department has Professors', 'Team has Players'], correctAnswer: 'Car has Engine', explanation: 'An Engine is created as part of a Car and cannot exist independently.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-13-04-1',
          scenario: 'You are building a document editor. A Document contains Paragraphs. Each Paragraph contains Sentences. If the Document is closed, all content is lost.',
          question: 'What relationship type applies between Document and Paragraph?',
          type: 'concept-application',
          options: ['Association', 'Aggregation', 'Composition', 'Dependency'],
          correctAnswer: 'Composition',
          explanation: 'Paragraphs are created within the Document and have no meaning outside it. If the Document is destroyed, Paragraphs are also destroyed.',
          relatedConcepts: ['composition', 'dependent-lifecycle', 'whole-part'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-composition',
      prerequisites: ['lesson-13-03'],
      xpReward: 70,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'composition',
      difficulty: 'medium',
      estimatedMinutes: 25,
    },
    {
      id: 'lesson-13-05',
      moduleId: 'module-13',
      title: 'Dependency',
      slug: 'dependency',
      order: 5,
      duration: 20,
      description: 'Master dependency: the weakest relationship through method parameters and local variables.',
      learningObjectives: [
        { id: 'lo-13-05-1', description: 'Identify dependency relationships through method parameters', completed: false },
        { id: 'lo-13-05-2', description: 'Understand that dependency is the weakest and most temporary relationship', completed: false },
        { id: 'lo-13-05-3', description: 'Distinguish dependency from association', completed: false },
        { id: 'lo-13-05-4', description: 'Design methods that minimize unnecessary dependencies', completed: false },
      ],
      englishExplanation: {
        id: 'ee-13-05',
        text: `Dependency is the weakest and most temporary type of object relationship. It occurs when one class uses another class briefly, typically as a method parameter or local variable. The using class does not store a reference to the used class.\n\nA dependency exists only during the execution of a method. Once the method returns, the dependency ends. The two objects are not permanently connected.\n\nExample: A Doctor examines a Patient. The examine() method receives a Patient parameter. During the examination, the Doctor uses the Patient. After the method returns, the Doctor has no lasting connection to that Patient.\n\nDependencies appear in three forms:\n1. Method parameter: void examine(Patient p)\n2. Local variable: Patient p = new Patient(); use(p);\n3. Static method call: Patient.createRecord();\n\nWhy dependency matters: Dependencies indicate coupling between classes. A class with many dependencies is highly coupled and harder to test and maintain. Good design minimizes dependencies by passing only the data needed, not entire objects.\n\nDependency Injection (DI) is a design pattern that manages dependencies. Instead of creating dependencies internally, objects receive them from outside. This makes the code more flexible, testable, and maintainable.`
      },
      romanUrduExplanation: {
        id: 'ru-13-05',
        text: `Dependency sabse kamzor aur sabse temporary type ki object relationship hai. Ye tab hoti hai jab ek class doosri class ko briefly use karti hai, typically method parameter ya local variable ke taur par. Using class used class ka reference store nahi karti.\n\nDependency sirf method execution ke dauran exist karta hai. Method return hone ke baad, dependency khatam ho jaati hai.\n\nExample: Doctor Patient ko examine karta hai. examine() method ek Patient parameter receive karti hai. Examination ke dauran Doctor Patient ko use karta hai. Method return hone ke baad, Doctor ka us Patient se koi lasting connection nahi hota.\n\nDependencies teen forms mein dikhti hain: method parameter, local variable, aur static method call.\n\nDependency Injection (DI) ek design pattern hai jo dependencies manage karta hai. Objects internally create karne ki bajaye, unhe bahar se receive karte hain. Ye code ko flexible, testable aur maintainable banata hai.`
      },
      keyPoints: [
        { id: 'kp-13-05-1', title: 'Temporary Usage', description: 'The dependency exists only during method execution. No field reference is stored.' },
        { id: 'kp-13-05-2', title: 'Weakest Coupling', description: 'Dependency is the loosest relationship. Changes to the used class have minimal impact.' },
        { id: 'kp-13-05-3', title: 'Three Forms', description: 'Method parameter, local variable, or static method call.' },
        { id: 'kp-13-05-4', title: 'Dependency Injection', description: 'A pattern that manages dependencies by receiving them from outside rather than creating them internally.' },
      ],
      codeExamples: [
        {
          id: 'ce-13-05-1',
          title: 'Dependency Through Method Parameter',
          code: `class Patient {
    private String name;
    Patient(String name) { this.name = name; }
    String getName() { return name; }
}

class Doctor {
    private String name;
    Doctor(String name) { this.name = name; }

    // Dependency: Doctor uses Patient temporarily
    void examine(Patient patient) {
        System.out.println(name + " examines " + patient.getName());
    }

    void prescribe(Patient patient) {
        System.out.println(name + " prescribes medicine to " + patient.getName());
    }
}

public class Main {
    public static void main(String[] args) {
        Doctor doc = new Doctor("Dr. Ali");
        Patient p1 = new Patient("Ahmed");
        Patient p2 = new Patient("Sara");

        doc.examine(p1);  // Dependency exists during method call
        doc.examine(p2);  // Different dependency

        // After methods return, Doctor has no stored reference to patients
    }
}`,
          language: 'java',
          output: `Dr. Ali examines Ahmed\nDr. Ali examines Sara`,
          explanation: 'Doctor depends on Patient only during method execution. No reference is stored as a field.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-13-05-1',
          title: 'Payment Processing',
          scenario: 'A PaymentProcessor processes payments for Orders. The processPayment method receives an Order, extracts the total, and charges the customer.',
          oopConcept: 'PaymentProcessor DEPENDS ON Order. The dependency is temporary — only during processPayment() execution. The PaymentProcessor does not store a reference to the Order.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-13-05-1',
          title: 'Turning Dependency into Association',
          incorrectCode: `class Doctor {\n    private Patient currentPatient; // Unnecessary field\n    void examine(Patient p) {\n        this.currentPatient = p; // Stores unnecessary reference\n        System.out.println("Examining " + p.getName());\n    }\n}`,
          correctCode: `class Doctor {\n    // No field needed — dependency is temporary\n    void examine(Patient p) {\n        System.out.println("Examining " + p.getName());\n    }\n}`,
          explanation: 'If a reference is only needed during a method call, do not store it as a field. Keep it as a dependency (parameter) to minimize coupling.',
        },
      ],
      examNotes: [
        { id: 'en-13-05-1', title: 'Dependency Identification', content: 'If a class uses another only in method parameters or local variables, it is dependency. If it stores a field reference, it is association or stronger.', importance: 'high' },
        { id: 'en-13-05-2', title: 'Dependency Injection', content: 'DI is a key design pattern. It reduces coupling by receiving dependencies from outside rather than creating them internally.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-13-05-1', question: 'What makes dependency the weakest relationship?', answer: 'It is temporary. The dependency exists only during method execution. No field reference is stored. The objects are not permanently connected.', difficulty: 'easy' },
        { id: 'vq-13-05-2', question: 'What is Dependency Injection?', answer: 'A pattern where objects receive their dependencies from outside (constructor, setter) rather than creating them internally. This reduces coupling and improves testability.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-13-05-1', type: 'mcq', question: 'A dependency typically appears as a:', options: ['Instance field', 'Method parameter', 'Constructor argument stored as field', 'Static variable'], correctAnswer: 'Method parameter', explanation: 'Dependencies are temporary — they appear as method parameters or local variables, not stored fields.' },
        { id: 'qc-13-05-2', type: 'true-false', question: 'A dependency creates a permanent link between two objects.', correctAnswer: 'False', explanation: 'Dependencies are temporary. They exist only during method execution.' },
        { id: 'qc-13-05-3', type: 'mcq', question: 'Which is an example of dependency?', options: ['Car has Engine', 'Teacher teaches Student (parameter)', 'Library has Books', 'House has Rooms'], correctAnswer: 'Teacher teaches Student (parameter)', explanation: 'The Student is a method parameter — a temporary dependency.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-13-05-1',
          scenario: 'A logging utility class needs to write log messages to a file. The writeLog method receives a Message object and extracts its text to write to the file.',
          question: 'What relationship exists between Logger and Message?',
          type: 'concept-application',
          options: ['Composition', 'Aggregation', 'Association', 'Dependency'],
          correctAnswer: 'Dependency',
          explanation: 'Logger uses Message only during writeLog() as a parameter. No field reference is stored. The relationship is temporary.',
          relatedConcepts: ['dependency', 'method-parameter', 'temporary'],
          difficulty: 'easy',
        },
      ],
      threeDSceneId: 'scene-dependency',
      prerequisites: ['lesson-13-01'],
      xpReward: 50,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'dependency',
      difficulty: 'easy',
      estimatedMinutes: 20,
    },
    {
      id: 'lesson-13-06',
      moduleId: 'module-13',
      title: 'UML Class Diagrams',
      slug: 'uml-class-diagrams',
      order: 6,
      duration: 25,
      description: 'Learn UML class diagram notation: classes, attributes, methods, associations, and multiplicity.',
      learningObjectives: [
        { id: 'lo-13-06-1', description: 'Draw UML class diagrams for Java classes', completed: false },
        { id: 'lo-13-06-2', description: 'Represent associations, aggregation, composition, and dependency in UML', completed: false },
        { id: 'lo-13-06-3', description: 'Define multiplicity in UML diagrams', completed: false },
        { id: 'lo-13-06-4', description: 'Read and interpret existing UML class diagrams', completed: false },
      ],
      englishExplanation: {
        id: 'ee-13-06',
        text: `UML (Unified Modeling Language) class diagrams are the standard way to visually represent the structure of a Java application. They show classes, their attributes, methods, and the relationships between them.\n\nA UML class is represented as a rectangle divided into three compartments:\n1. Top: Class name (e.g., Student)\n2. Middle: Attributes with visibility (- for private, + for public, # for protected)\n3. Bottom: Methods with visibility and parameters\n\nRelationship notation in UML:\n- **Association**: A solid line between two classes. No arrowhead means bidirectional. One arrowhead means unidirectional.\n- **Aggregation**: A solid line with an empty diamond on the container side. The diamond points to the whole.\n- **Composition**: A solid line with a filled diamond on the container side. The filled diamond indicates stronger ownership.\n- **Dependency**: A dashed line with an arrow pointing to the used class.\n- **Inheritance**: A solid line with a hollow triangle arrowhead pointing to the parent class.\n\nMultiplicity notation is placed near the class ends:\n- 1: exactly one\n- 0..1: zero or one\n- *: many (zero or more)\n- 1..*: one or more\n- 0..*: zero or more\n\nReading a UML diagram from left to right: A Teacher (1) teaches (*) Students. A Student (*) enrolls in (*) Courses. A Course (*) belongs to (1) Department.`
      },
      romanUrduExplanation: {
        id: 'ru-13-06',
        text: `UML (Unified Modeling Language) class diagrams Java application ki structure ko visually represent karne ka standard way hai. Ye classes, unke attributes, methods, aur relationships dikhate hain.\n\nUML class teen compartments mein divided rectangle hota hai:\n1. Top: Class name\n2. Middle: Attributes with visibility (- private, + public, # protected)\n3. Bottom: Methods with visibility and parameters\n\nRelationship notation in UML:\n- **Association**: Solid line between classes. Arrowhead = direction.\n- **Aggregation**: Solid line with empty diamond on container side.\n- **Composition**: Solid line with filled diamond on container side.\n- **Dependency**: Dashed line with arrow to used class.\n- **Inheritance**: Solid line with hollow triangle to parent.\n\nMultiplicity notation class ends par placed hoti hai: 1 (exactly one), 0..1 (zero or one), * (many), 1..* (one or more).`
      },
      keyPoints: [
        { id: 'kp-13-06-1', title: 'Class Rectangle', description: 'Three compartments: name, attributes, methods. Visibility markers: -, +, #.' },
        { id: 'kp-13-06-2', title: 'Relationship Lines', description: 'Solid line = association. Empty diamond = aggregation. Filled diamond = composition. Dashed = dependency.' },
        { id: 'kp-13-06-3', title: 'Multiplicity', description: '1, 0..1, *, 1..*, 0..* placed near class ends to show how many instances participate.' },
        { id: 'kp-13-06-4', title: 'Direction', description: 'Arrowhead direction shows which class knows about the other. No arrow = bidirectional.' },
      ],
      codeExamples: [
        {
          id: 'ce-13-06-1',
          title: 'UML to Java Code',
          code: `// UML Diagram shows:
// Student (1) --- (1) Advisor
// Student (*) --- (*) Course
//
// In code:

class Course {
    private String title;
    Course(String title) { this.title = title; }
}

class Advisor {
    private String name;
    Advisor(String name) { this.name = name; }
}

class Student {
    private String name;
    private Advisor advisor;       // 1:1 association
    private List<Course> courses;  // *:* association

    Student(String name, Advisor advisor) {
        this.name = name;
        this.advisor = advisor;
        this.courses = new ArrayList<>();
    }

    void enroll(Course course) {
        courses.add(course);
    }
}`,
          language: 'java',
          explanation: 'UML diagram translated to Java code. Student has one Advisor (1:1) and many Courses (N:M). Each relationship is implemented as a field.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-13-06-1',
          title: 'Designing Before Coding',
          scenario: 'Before implementing a hospital management system, the architect draws UML class diagrams to plan the classes and their relationships.',
          oopConcept: 'UML diagram shows: Hospital COMPOSES (*) Departments. Department AGGREGATES (*) Doctors. Doctor DEPENDS ON Patient (during examination). This guides the implementation.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-13-06-1',
          title: 'Wrong Diamond for Aggregation vs Composition',
          incorrectCode: `// UML: House <>--- Room (empty diamond)\n// This says aggregation, but it should be composition!\n// Room cannot exist without House`,
          correctCode: `// UML: House ◆--- Room (filled diamond)\n// This correctly shows composition\n// Room is created by and dies with House`,
          explanation: 'Empty diamond = aggregation (independent lifecycle). Filled diamond = composition (dependent lifecycle). Choose based on whether the part can outlive the whole.',
        },
      ],
      examNotes: [
        { id: 'en-13-06-1', title: 'Diamond Notation', content: 'Empty diamond = aggregation. Filled diamond = composition. Diamond is always on the container/whole side.', importance: 'high' },
        { id: 'en-13-06-2', title: 'Visibility Markers', content: '- private, + public, # protected, ~ package. These match Java access modifiers.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-13-06-1', question: 'How do you represent composition in UML?', answer: 'A solid line with a filled (black) diamond on the container side. The diamond points to the whole. Example: House ◆--- Room.', difficulty: 'easy' },
        { id: 'vq-13-06-2', question: 'What does multiplicity * mean in UML?', answer: '* means many (zero or more). Placed near a class end, it indicates that many instances of that class participate in the relationship.', difficulty: 'easy' },
        { id: 'vq-13-06-3', question: 'What is the difference between a solid line and a dashed line in UML?', answer: 'Solid line = association (structural relationship). Dashed line = dependency (temporary usage). Solid is stronger than dashed.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-13-06-1', type: 'mcq', question: 'What does a filled diamond in UML represent?', options: ['Aggregation', 'Composition', 'Inheritance', 'Dependency'], correctAnswer: 'Composition', explanation: 'Filled diamond = composition (strong ownership, dependent lifecycle).' },
        { id: 'qc-13-06-2', type: 'mcq', question: 'In UML, - before an attribute means:', options: ['public', 'private', 'protected', 'package'], correctAnswer: 'private', explanation: '- = private, + = public, # = protected.' },
        { id: 'qc-13-06-3', type: 'true-false', question: 'A dashed line in UML represents an association.', correctAnswer: 'False', explanation: 'Dashed line = dependency. Solid line = association.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-13-06-1',
          scenario: 'You need to draw a UML diagram for a university. A University has many Departments. Each Department has many Professors. Professors teach Students.',
          question: 'What notation would you use for University-Department and Professor-Student?',
          type: 'design-decision',
          options: [
            'University ◆--- Department (composition), Professor --- Student (association)',
            'University <>--- Department (aggregation), Professor --- Student (dependency)',
            'University --- Department (association), Professor ◆--- Student (composition)',
            'All should use dashed lines (dependency)',
          ],
          correctAnswer: 'University ◆--- Department (composition), Professor --- Student (association)',
          explanation: 'Departments are created by the University (composition). Professors and Students exist independently (association).',
          relatedConcepts: ['UML', 'composition', 'association', 'notation'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-uml-diagrams',
      prerequisites: ['lesson-13-01', 'lesson-13-02', 'lesson-13-03', 'lesson-13-04'],
      xpReward: 60,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'uml-notation',
      difficulty: 'medium',
      estimatedMinutes: 25,
    },
    {
      id: 'lesson-13-07',
      moduleId: 'module-13',
      title: 'Implementing Relationships in Java',
      slug: 'implementing-relationships-java',
      order: 7,
      duration: 25,
      description: 'Practical implementation of all relationship types in Java with complete code examples.',
      learningObjectives: [
        { id: 'lo-13-07-1', description: 'Implement dependency through method parameters', completed: false },
        { id: 'lo-13-07-2', description: 'Implement association with field references', completed: false },
        { id: 'lo-13-07-3', description: 'Implement aggregation by passing objects into constructors', completed: false },
        { id: 'lo-13-07-4', description: 'Implement composition by creating objects inside constructors', completed: false },
      ],
      englishExplanation: {
        id: 'ee-13-07',
        text: `This lesson brings all relationship types together with practical Java implementations. Understanding when to use each type is critical for designing well-structured applications.\n\n**Dependency Implementation**: The simplest form. A method receives an object as a parameter and uses it temporarily. No field is stored. Example: \`void processOrder(Order order)\`. The method uses the Order but does not keep a reference.\n\n**Association Implementation**: Store a reference as a field. The object is passed in and stored. Both objects exist independently. Example: \`class Student { private Course course; Student(Course c) { this.course = c; } }\`.\n\n**Aggregation Implementation**: Similar to association but the container manages a collection of parts. The parts are passed in and can be shared. Example: \`class Team { private List<Player> players; Team(List<Player> p) { this.players = p; } }\`.\n\n**Composition Implementation**: The container creates its parts. Parts are not passed in; they are created inside the constructor. Example: \`class House { private List<Room> rooms; House() { rooms = new ArrayList<>(); rooms.add(new Room("Bedroom")); } }\`.\n\nThe choice between these types depends on lifecycle requirements. Ask yourself: Does the part need to exist independently? Can the part be shared? Is the relationship mandatory? The answers guide your design.`
      },
      romanUrduExplanation: {
        id: 'ru-13-07',
        text: `Ye lesson saare relationship types ko practical Java implementations ke saath bring karta hai.\n\n**Dependency Implementation**: Sabse simple form. Method ek object ko parameter mein receive karta hai aur temporarily use karta hai.\n\n**Association Implementation**: Field reference store karein. Object pass in hota hai aur store hota hai. Dono objects independently exist karte hain.\n\n**Aggregation Implementation**: Association ki tarah lekin container collection manage karta hai. Parts pass in kiye jaate hain aur share ho sakte hain.\n\n**Composition Implementation**: Container apne parts create karta hai. Parts pass in nahi kiye jaate constructor ke andar create kiye jaate hain.\n\nIn types ka choice lifecycle requirements par depend karta hai. Khud se puchein: Part ko independently exist karna chahiye? Part share ho sakta hai? Relationship mandatory hai?`
      },
      keyPoints: [
        { id: 'kp-13-07-1', title: 'Dependency Code', description: 'Method parameter. No field storage. Temporary usage.' },
        { id: 'kp-13-07-2', title: 'Association Code', description: 'Field reference. Object passed in and stored. Independent lifecycle.' },
        { id: 'kp-13-07-3', title: 'Aggregation Code', description: 'Collection of parts passed in. Parts can be shared and outlive the container.' },
        { id: 'kp-13-07-4', title: 'Composition Code', description: 'Parts created with new inside constructor. Exclusive ownership. Dependent lifecycle.' },
      ],
      codeExamples: [
        {
          id: 'ce-13-07-1',
          title: 'Complete Relationship Examples',
          code: `import java.util.ArrayList;
import java.util.List;

// DEPENDENCY
class PaymentProcessor {
    void process(Order order) { // Order is a dependency
        System.out.println("Processing order: $" + order.getTotal());
    }
}

// ASSOCIATION
class Employee {
    private String name;
    private Department department; // Association — stored reference

    Employee(String name, Department dept) {
        this.name = name;
        this.department = dept;
    }

    void printDept() {
        System.out.println(name + " works in " + department.getName());
    }
}

// AGGREGATION
class Department {
    private String name;
    private List<Employee> employees; // Aggregation — passed in

    Department(String name, List<Employee> employees) {
        this.name = name;
        this.employees = employees;
    }

    String getName() { return name; }
}

// COMPOSITION
class Order {
    private double total;
    private List<OrderItem> items; // Composition — created inside

    Order(double total) {
        this.total = total;
        this.items = new ArrayList<>();
        items.add(new OrderItem("Item1", 10.0));
    }

    double getTotal() { return total; }
}

class OrderItem {
    private String name;
    private double price;
    OrderItem(String name, double price) {
        this.name = name;
        this.price = price;
    }
}`,
          language: 'java',
          explanation: 'All four relationship types implemented in Java. Dependency uses method parameter. Association stores field reference. Aggregation receives parts via constructor. Composition creates parts internally.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-13-07-1',
          title: 'E-Commerce System Design',
          scenario: 'Design an e-commerce system with proper relationships between all entities.',
          oopConcept: 'Order COMPOSES OrderItems. Order DEPENDS ON PaymentProcessor. Customer ASSOCIATES with Order. Store AGGREGATES Products. Each relationship is implemented according to its lifecycle requirements.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-13-07-1',
          title: 'Using Composition When Aggregation Is Appropriate',
          incorrectCode: `class School {\n    private List<Teacher> teachers;\n    School() {\n        teachers = new ArrayList<>();\n        teachers.add(new Teacher("Ali")); // Created inside!\n        // Teachers should be hired (passed in), not created!\n    }\n}`,
          correctCode: `class School {\n    private List<Teacher> teachers;\n    School(List<Teacher> teachers) {\n        this.teachers = teachers; // Passed in = aggregation\n    }\n    // Teachers exist independently and can work at other schools\n}`,
          explanation: 'Teachers have their own careers and can work at multiple schools. They should be aggregated (passed in), not composed (created inside).',
        },
      ],
      examNotes: [
        { id: 'en-13-07-1', title: 'Implementation Pattern', content: 'Dependency = parameter. Association = field from parameter. Aggregation = collection from parameter. Composition = collection created inside.', importance: 'high' },
        { id: 'en-13-07-2', title: 'Design Decision', content: 'Always ask: "Can the part exist without the whole?" and "Is the part created by the whole?" to determine the right relationship type.', importance: 'high' },
      ],
      vivaQuestions: [
        { id: 'vq-13-07-1', question: 'How do you implement composition in Java?', answer: 'Create the contained object inside the container constructor using new. Do not pass it in from outside. The container manages the part\'s entire lifecycle.', difficulty: 'easy' },
        { id: 'vq-13-07-2', question: 'How do you implement aggregation in Java?', answer: 'Pass the contained object into the constructor or setter. The container stores a reference but does not create the object. The part has its own lifecycle.', difficulty: 'easy' },
        { id: 'vq-13-07-3', question: 'Why is choosing the right relationship type important?', answer: 'It affects coupling, testability, and maintainability. Composition creates tight coupling. Aggregation creates loose coupling. Using the wrong type makes the code fragile.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-13-07-1', type: 'mcq', question: 'To implement composition, you should:', options: ['Pass parts via constructor', 'Create parts inside constructor', 'Use method parameters', 'Use static factory methods'], correctAnswer: 'Create parts inside constructor', explanation: 'Composition means the whole creates the part. Use new inside the constructor.' },
        { id: 'qc-13-07-2', type: 'mcq', question: 'Which is the correct implementation of dependency?', options: ['private Order order field', 'void process(Order order) method parameter', 'this.order = new Order() in constructor', 'List<Order> orders field'], correctAnswer: 'void process(Order order) method parameter', explanation: 'Dependency uses method parameters for temporary usage. No field is stored.' },
        { id: 'qc-13-07-3', type: 'true-false', question: 'In aggregation, parts are created inside the container.', correctAnswer: 'False', explanation: 'In aggregation, parts are passed in from outside. Creation inside indicates composition.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-13-07-1',
          scenario: 'You are designing a music app. A Playlist has Songs. A Song can be in many Playlists. An Artist creates Songs.',
          question: 'What relationship types apply for Playlist-Song and Artist-Song?',
          type: 'design-decision',
          options: [
            'Playlist COMPOSES Song, Artist ASSOCIATES with Song',
            'Playlist AGGREGATES Song, Artist COMPOSES Song',
            'Playlist ASSOCIATES with Song (N:M), Artist COMPOSES Song',
            'Playlist COMPOSES Song, Artist COMPOSES Song',
          ],
          correctAnswer: 'Playlist ASSOCIATES with Song (N:M), Artist COMPOSES Song',
          explanation: 'Songs exist independently and can be in many Playlists (association N:M). Songs are created by Artists and have no meaning without them (composition).',
          relatedConcepts: ['association', 'composition', 'design-decision'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-implementing-relationships',
      prerequisites: ['lesson-13-05', 'lesson-13-06'],
      xpReward: 70,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'implementation-patterns',
      difficulty: 'medium',
      estimatedMinutes: 25,
    },
    {
      id: 'lesson-13-08',
      moduleId: 'module-13',
      title: 'Avoiding Circular References',
      slug: 'avoiding-circular-references',
      order: 8,
      duration: 20,
      description: 'Handle bidirectional associations, null safety, and prevent circular reference problems.',
      learningObjectives: [
        { id: 'lo-13-08-1', description: 'Identify circular references in object relationships', completed: false },
        { id: 'lo-13-08-2', description: 'Implement null-safe bidirectional associations', completed: false },
        { id: 'lo-13-08-3', description: 'Design helper methods that maintain consistency', completed: false },
        { id: 'lo-13-08-4', description: 'Avoid infinite loops in bidirectional relationships', completed: false },
      ],
      englishExplanation: {
        id: 'ee-13-08',
        text: `Circular references occur when two objects reference each other, potentially causing infinite loops, stack overflow, or incorrect behavior. While bidirectional associations are common and valid, they must be managed carefully.\n\n**Problem 1: Infinite toString()**: If Class A's toString() calls B's toString(), and B's toString() calls A's toString(), you get infinite recursion and a StackOverflowError.\n\n**Problem 2: Infinite equals()/hashCode()**: If A.equals() calls B.equals(), and B.equals() calls A.equals(), you get infinite recursion.\n\n**Problem 3: Inconsistency**: In bidirectional associations, if you set A's reference to B but forget to set B's reference to A, the relationship is inconsistent. One side points to the other, but not vice versa.\n\nSolutions:\n1. **null checks**: Always check for null before accessing the other object in toString(), equals(), and hashCode().\n2. **Helper methods**: Create methods that update both sides simultaneously. Always use these methods instead of setting fields directly.\n3. **Break cycles**: In toString(), do not call the other object's toString(). Print only the identifying information (like name or ID).\n4. **equals() by ID**: Compare objects by their unique identifier rather than comparing all fields (which might include the back-reference).\n\nBest practice: In bidirectional associations, make one side the "owning" side for persistence. The other side is the "inverse" side. This clarifies which object is responsible for maintaining the relationship.`
      },
      romanUrduExplanation: {
        id: 'ru-13-08',
        text: `Circular references tab hote hain jab do objects ek doosre ko reference karte hain, jo potentially infinite loops, stack overflow, ya incorrect behavior cause kar sakte hain.\n\n**Problem 1: Infinite toString()**: Agar Class A ka toString() B ke toString() ko call kare, aur B ka toString() A ke toString() ko call kare, toh infinite recursion hoti hai.\n\n**Problem 2: Inconsistency**: Bidirectional associations mein, agar aap A ka reference B set karein lekin B ka reference A set karna bhool jaayein, toh relationship inconsistent hoti hai.\n\nSolutions:\n1. **null checks**: Dusre object ko access karne se pehle hamesha null check karein.\n2. **Helper methods**: Methods banayein jo dono sides simultaneously update karein.\n3. **Break cycles**: toString() mein doosre object ke toString() ko call na karein.\n4. **equals() by ID**: Objects ko unke unique identifier se compare karein.\n\nBest practice: Bidirectional associations mein, ek side ko "owning" side banayein. Doosri side "inverse" side hoti hai.`
      },
      keyPoints: [
        { id: 'kp-13-08-1', title: 'Infinite Recursion', description: 'Bidirectional toString() or equals() calls can cause StackOverflowError.' },
        { id: 'kp-13-08-2', title: 'null Safety', description: 'Always check for null before accessing the other object in bidirectional methods.' },
        { id: 'kp-13-08-3', title: 'Helper Methods', description: 'Provide methods that update both sides simultaneously to prevent inconsistency.' },
        { id: 'kp-13-08-4', title: 'Owning Side', description: 'In bidirectional associations, designate one side as the owning side for clarity.' },
      ],
      codeExamples: [
        {
          id: 'ce-13-08-1',
          title: 'Safe Bidirectional Association',
          code: `import java.util.Objects;

class Person {
    private String name;
    private Person spouse; // Bidirectional

    Person(String name) { this.name = name; }

    // Helper method — always use this to set spouse
    void setSpouse(Person other) {
        this.spouse = other;
        if (other != null && other.spouse != this) {
            other.setSpouse(this); // Sync both sides
        }
    }

    Person getSpouse() { return spouse; }

    // SAFE toString — no null check on spouse's toString
    @Override
    public String toString() {
        String spouseName = (spouse != null) ? spouse.name : "none";
        return name + " (spouse: " + spouseName + ")";
    }

    // SAFE equals — no infinite recursion
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person other = (Person) obj;
        return Objects.equals(name, other.name); // Compare by name only
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }

    public static void main(String[] args) {
        Person ahmed = new Person("Ahmed");
        Person sara = new Person("Sara");
        ahmed.setSpouse(sara);

        System.out.println(ahmed); // Ahmed (spouse: Sara)
        System.out.println(sara);  // Sara (spouse: Ahmed)
        System.out.println("Ahmed's spouse: " + ahmed.getSpouse().name);
    }
}`,
          language: 'java',
          output: `Ahmed (spouse: Sara)\nSara (spouse: Ahmed)\nAhmed's spouse: Sara`,
          explanation: 'Safe bidirectional association with null checks in toString(), helper method for setting both sides, and equals() that compares by name only (no recursion).',
        },
        {
          id: 'ce-13-08-2',
          title: 'Preventing Infinite Loops in equals()',
          code: `import java.util.Objects;

class Node {
    private String id;
    private Node next;    // Points forward
    private Node prev;    // Points backward — bidirectional!

    Node(String id) { this.id = id; }

    void setNext(Node next) {
        this.next = next;
        if (next != null && next.prev != this) {
            next.prev = this;
        }
    }

    // SAFE equals — compares only by id, not by references
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Node other = (Node) obj;
        return Objects.equals(id, other.id); // ID only!
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        String nextId = (next != null) ? next.id : "null";
        String prevId = (prev != null) ? prev.id : "null";
        return "Node{id=" + id + ", prev=" + prevId + ", next=" + nextId + "}";
    }

    public static void main(String[] args) {
        Node a = new Node("A");
        Node b = new Node("B");
        Node c = new Node("C");

        a.setNext(b);
        b.setNext(c);

        System.out.println(a);
        System.out.println(b);
        System.out.println(c);

        // equals() compares by id — no recursion
        System.out.println("a.equals(b): " + a.equals(b)); // false
    }
}`,
          language: 'java',
          output: `Node{id=A, prev=null, next=B}\nNode{id=B, prev=A, next=C}\nNode{id=C, prev=B, next=null}\na.equals(b): false`,
          explanation: 'Linked list nodes with bidirectional references. equals() compares only by id to prevent infinite recursion through next/prev references.',
        },
      ],
      realWorldExamples: [
        {
          id: 'rwe-13-08-1',
          title: 'Organizational Hierarchy',
          scenario: 'An employee has a manager, and a manager has direct reports. This creates a bidirectional relationship: Employee knows Manager, Manager knows Employees.',
          oopConcept: 'Employee has Manager reference (unidirectional is simpler). Manager has List<Employee> reports. Avoid bidirectional if only one direction is needed. If bidirectional is required, use helper methods and null checks.',
        },
      ],
      commonMistakes: [
        {
          id: 'cm-13-08-1',
          title: 'Calling Other Object toString() in Bidirectional Association',
          incorrectCode: `class A {\n    private B b;\n    @Override\n    public String toString() {\n        return "A references: " + b.toString(); // Calls B's toString\n    }\n}\nclass B {\n    private A a;\n    @Override\n    public String toString() {\n        return "B references: " + a.toString(); // StackOverflowError!\n    }\n}`,
          correctCode: `class A {\n    private B b;\n    @Override\n    public String toString() {\n        String bInfo = (b != null) ? b.getId() : "none";\n        return "A (refs: " + bInfo + ")"; // No call to b.toString()\n    }\n}`,
          explanation: 'Never call the other object\'s toString() in a bidirectional association. Print only identifying info (name, ID) instead.',
        },
      ],
      examNotes: [
        { id: 'en-13-08-1', title: 'Circular Reference Prevention', content: 'In bidirectional associations: use null checks, helper methods, avoid calling other object\'s toString()/equals(), and compare by ID only.', importance: 'high' },
        { id: 'en-13-08-2', title: 'Simpler is Better', content: 'If only one direction of navigation is needed, use unidirectional association instead of bidirectional. Simpler design, fewer bugs.', importance: 'medium' },
      ],
      vivaQuestions: [
        { id: 'vq-13-08-1', question: 'How do you prevent StackOverflowError in bidirectional toString()?', answer: 'Do not call the other object\'s toString(). Instead, print only the identifying information like name or ID. Also add null checks.', difficulty: 'medium' },
        { id: 'vq-13-08-2', question: 'Why should you use helper methods for bidirectional associations?', answer: 'Helper methods update both sides simultaneously. Without them, you might update one side and forget the other, causing inconsistency.', difficulty: 'easy' },
        { id: 'vq-13-08-3', question: 'When should you prefer unidirectional over bidirectional association?', answer: 'When only one direction of navigation is needed. Unidirectional is simpler, easier to maintain, and avoids circular reference issues.', difficulty: 'medium' },
      ],
      quickCheckQuestions: [
        { id: 'qc-13-08-1', type: 'mcq', question: 'What causes StackOverflowError in bidirectional associations?', options: ['Null references', 'Infinite recursion in toString()/equals()', 'ConcurrentModificationException', 'Memory leak'], correctAnswer: 'Infinite recursion in toString()/equals()', explanation: 'If A calls B\'s toString() and B calls A\'s toString(), the recursion never ends.' },
        { id: 'qc-13-08-2', type: 'true-false', question: 'In bidirectional equals(), you should compare all fields including the back-reference.', correctAnswer: 'False', explanation: 'Comparing the back-reference causes infinite recursion. Compare by ID or unique field only.' },
        { id: 'qc-13-08-3', type: 'mcq', question: 'How do you maintain consistency in bidirectional associations?', options: ['Set both sides directly', 'Use helper methods that update both sides', 'Only set one side', 'Use weak references'], correctAnswer: 'Use helper methods that update both sides', explanation: 'Helper methods ensure both sides are always synchronized.' },
      ],
      scenarioQuestions: [
        {
          id: 'sq-13-08-1',
          scenario: 'You have a Thread class where each Thread can have a parent Thread and child Threads. The relationship is bidirectional.',
          question: 'How should you implement the parent-child relationship to avoid circular reference issues?',
          type: 'design-decision',
          options: [
            'Make it bidirectional and compare all fields in equals()',
            'Make it unidirectional (children know parent, parent does not know children)',
            'Use bidirectional with helper methods, null checks, and equals() by ID only',
            'Avoid the relationship entirely',
          ],
          correctAnswer: 'Use bidirectional with helper methods, null checks, and equals() by ID only',
          explanation: 'Bidirectional is useful for navigation. But implement safely with helper methods, null checks, and ID-based equals().',
          relatedConcepts: ['circular-reference', 'null-safety', 'helper-methods'],
          difficulty: 'medium',
        },
      ],
      threeDSceneId: 'scene-circular-references',
      prerequisites: ['lesson-13-02', 'lesson-13-06', 'lesson-13-07'],
      xpReward: 60,
      isUnlocked: false,
      completed: false,
      masteryScore: 0,
      visualizationType: 'circular-reference-safety',
      difficulty: 'medium',
      estimatedMinutes: 20,
    },
  ],
};
