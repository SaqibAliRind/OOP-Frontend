import type { DebugChallenge } from '@/types';

export const debugChallenges: DebugChallenge[] = [
  {
    id: 'dc-001',
    title: 'Null Pointer in Student Display',
    description: 'The displayInfo method throws NullPointerException when name is not initialized.',
    buggyCode: `public class Student {
    private String name;
    private int rollNumber;

    public Student(int rollNumber) {
        this.rollNumber = rollNumber;
        // name is not initialized!
    }

    public void displayInfo() {
        System.out.println("Name: " + name.toUpperCase()); // NPE here
        System.out.println("Roll: " + rollNumber);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student(101);
        s.displayInfo();
    }
}`,
    expectedBehavior: 'Should display student info without crashing, showing "Name: UNKNOWN" if name is not set.',
    hints: [
      'Check if name is null before calling methods on it',
      'Initialize name in constructor or provide a default value',
      'Use a null check or ternary operator in displayInfo',
    ],
    solution: `public class Student {
    private String name;
    private int rollNumber;

    public Student(int rollNumber) {
        this.rollNumber = rollNumber;
        this.name = "UNKNOWN";
    }

    public Student(String name, int rollNumber) {
        this.name = name;
        this.rollNumber = rollNumber;
    }

    public void displayInfo() {
        System.out.println("Name: " + (name != null ? name.toUpperCase() : "UNKNOWN"));
        System.out.println("Roll: " + rollNumber);
    }
}`,
    explanation: 'Always initialize fields or check for null before calling methods. Provide default values or overloaded constructors.',
    romanUrduExplanation: 'Fields ko hamesha initialize karo ya null check karo methods call karne se pehle.',
    difficulty: 'easy',
    topicTags: ['null-safety', 'constructors', 'debugging'],
    xpReward: 50,
    timeLimit: 300,
    errorMessage: 'NullPointerException at Student.displayInfo()',
    errorType: 'runtime',
    conceptTested: ['null-safety', 'initialization'],
  },
  {
    id: 'dc-002',
    title: 'Infinite Recursion in toString',
    description: 'The toString method causes StackOverflowError due to circular reference.',
    buggyCode: `public class Node {
    private int value;
    private Node next;

    public Node(int value, Node next) {
        this.value = value;
        this.next = next;
    }

    @Override
    public String toString() {
        return "Node{value=" + value + ", next=" + next + "}";
    }
}

public class Main {
    public static void main(String[] args) {
        Node n1 = new Node(1, null);
        Node n2 = new Node(2, n1);
        n1.next = n2; // Circular reference!
        System.out.println(n1);
    }
}`,
    expectedBehavior: 'Should print node structure without infinite loop, detecting cycles.',
    hints: [
      'The circular reference causes infinite recursion in toString',
      'Track visited nodes to detect cycles',
      'Use a Set to avoid revisiting nodes',
    ],
    solution: `import java.util.HashSet;
import java.util.Set;

public class Node {
    private int value;
    private Node next;

    public Node(int value, Node next) {
        this.value = value;
        this.next = next;
    }

    @Override
    public String toString() {
        return toStringHelper(new HashSet<>());
    }

    private String toStringHelper(Set<Node> visited) {
        if (visited.contains(this)) {
            return "Node{value=" + value + ", next=...(cycle)}";
        }
        visited.add(this);
        String nextStr = next != null ? next.toStringHelper(visited) : "null";
        return "Node{value=" + value + ", next=" + nextStr + "}";
    }
}`,
    explanation: 'Circular references cause infinite recursion. Track visited objects to detect cycles and prevent StackOverflowError.',
    romanUrduExplanation: 'Circular reference infinite recursion ka cause hoti hai. Visited objects track karo cycle detect karne ke liye.',
    difficulty: 'medium',
    topicTags: ['recursion', 'circular-reference', 'tostring'],
    xpReward: 75,
    timeLimit: 450,
    errorMessage: 'StackOverflowError',
    errorType: 'runtime',
    conceptTested: ['recursion', 'circular-reference', 'cycle-detection'],
  },
  {
    id: 'dc-003',
    title: 'Concurrent Modification Exception',
    description: 'Removing elements from a list while iterating causes ConcurrentModificationException.',
    buggyCode: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("Ahmed");
        names.add("Sara");
        names.add("Ali");
        names.add("Fatima");

        for (String name : names) {
            if (name.startsWith("A")) {
                names.remove(name); // Exception here!
            }
        }
        System.out.println(names);
    }
}`,
    expectedBehavior: 'Should remove all names starting with "A" without throwing an exception.',
    hints: [
      'The enhanced for loop uses an Iterator internally',
      'Modifying the list directly while iterating breaks the Iterator',
      'Use Iterator.remove() or removeIf() method',
    ],
    solution: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("Ahmed");
        names.add("Sara");
        names.add("Ali");
        names.add("Fatima");

        names.removeIf(name -> name.startsWith("A"));
        System.out.println(names);
    }
}`,
    explanation: 'Never modify a collection while iterating with enhanced for loop. Use Iterator.remove() or removeIf() for safe removal.',
    romanUrduExplanation: 'Enhanced for loop se iterate karte waqt collection modify mat karo. Safe removal ke liye Iterator.remove() ya removeIf() use karo.',
    difficulty: 'medium',
    topicTags: ['collections', 'iteration', 'concurrent-modification'],
    xpReward: 60,
    timeLimit: 300,
    errorMessage: 'ConcurrentModificationException',
    errorType: 'runtime',
    conceptTested: ['collections', 'iteration', 'concurrent-modification'],
  },
  {
    id: 'dc-004',
    title: 'Abstract Class Instantiation',
    description: 'Trying to create an instance of an abstract class causes compilation error.',
    buggyCode: `abstract class Shape {
    abstract double area();

    void display() {
        System.out.println("Area: " + area());
    }
}

public class Main {
    public static void main(String[] args) {
        Shape s = new Shape(); // Compilation error!
        System.out.println(s.area());
    }
}`,
    expectedBehavior: 'Should create a concrete subclass and call its area() method.',
    hints: [
      'You cannot instantiate an abstract class directly',
      'Create a concrete subclass that implements the abstract method',
      'Use the subclass type or an interface reference',
    ],
    solution: `abstract class Shape {
    abstract double area();
}

class Circle extends Shape {
    double radius;

    Circle(double radius) {
        this.radius = radius;
    }

    @Override
    double area() {
        return Math.PI * radius * radius;
    }
}

public class Main {
    public static void main(String[] args) {
        Shape s = new Circle(5);
        System.out.println("Area: " + s.area());
    }
}`,
    explanation: 'Abstract classes cannot be instantiated. Create a concrete subclass that implements all abstract methods.',
    romanUrduExplanation: 'Abstract classes ko directly instantiate nahi kiya ja sakta. Concrete subclass banao jo sab abstract methods implement kare.',
    difficulty: 'easy',
    topicTags: ['abstract-class', 'instantiation', 'compilation'],
    xpReward: 40,
    timeLimit: 200,
    errorMessage: 'Shape is abstract; cannot be instantiated',
    errorType: 'compilation',
    conceptTested: ['abstract-class', 'instantiation'],
  },
  {
    id: 'dc-005',
    title: 'Interface Constant Access',
    description: 'Accessing interface constants incorrectly causes errors.',
    buggyCode: `interface Config {
    String APP_NAME = "MyApp";
    int MAX_CONNECTIONS = 10;
    void connect(); // This is fine, but...
}

public class Main implements Config {
    public static void main(String[] args) {
        Main m = new Main();
        System.out.println(m.APP_NAME); // Works but not ideal
        System.out.println(Config.MAX_CONNECTIONS); // Also works

        // But this doesn't work:
        // Config c = new Config(); // Can't instantiate interface!
        // System.out.println(c.APP_NAME);
    }

    @Override
    public void connect() {
        System.out.println("Connecting...");
    }
}`,
    expectedBehavior: 'Understand how interface constants and methods work, and why you cannot instantiate interfaces.',
    hints: [
      'Interface fields are implicitly public static final',
      'Interface methods are implicitly public abstract',
      'You can access constants via the interface name',
      'You need a concrete class to use the interface',
    ],
    solution: `interface Config {
    String APP_NAME = "MyApp";
    int MAX_CONNECTIONS = 10;
    void connect();
}

public class Main implements Config {
    public static void main(String[] args) {
        // Access constants through interface name
        System.out.println(Config.APP_NAME);
        System.out.println(Config.MAX_CONNECTIONS);

        // Use interface type for reference
        Config config = new Main();
        config.connect();
    }

    @Override
    public void connect() {
        System.out.println("Connected to " + Config.APP_NAME);
    }
}`,
    explanation: 'Interface constants are public static final. Access them via InterfaceName.CONSTANT. Interfaces cannot be instantiated directly.',
    romanUrduExplanation: 'Interface constants public static final hote hain. Inhe InterfaceName.CONSTANT se access karo. Interfaces directly instantiate nahi ho sakte.',
    difficulty: 'easy',
    topicTags: ['interfaces', 'constants', 'instantiation'],
    xpReward: 40,
    timeLimit: 200,
    errorMessage: 'Config is an interface cannot be instantiated',
    errorType: 'compilation',
    conceptTested: ['interfaces', 'constants', 'instantiation'],
  },
  {
    id: 'dc-006',
    title: 'Broken equals Contract',
    description: 'The equals method has inconsistent behavior causing logical errors.',
    buggyCode: `class Point {
    int x, y;

    Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Point) {
            Point p = (Point) obj;
            return this.x == p.x; // Only checks x, not y!
        }
        return false;
    }

    @Override
    public int hashCode() {
        return x; // Only uses x
    }
}

public class Main {
    public static void main(String[] args) {
        Point p1 = new Point(1, 2);
        Point p2 = new Point(1, 5);
        System.out.println(p1.equals(p2)); // true, but they're different!
        System.out.println(p1.hashCode() == p2.hashCode()); // true
    }
}`,
    expectedBehavior: 'equals() should check both x and y. Points with different y values should not be equal.',
    hints: [
      'equals() must check ALL relevant fields',
      'hashCode() must use the same fields as equals()',
      'Two equal objects must have the same hashCode()',
    ],
    solution: `class Point {
    int x, y;

    Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Point p = (Point) obj;
        return this.x == p.x && this.y == p.y;
    }

    @Override
    public int hashCode() {
        return 31 * x + y;
    }
}

public class Main {
    public static void main(String[] args) {
        Point p1 = new Point(1, 2);
        Point p2 = new Point(1, 5);
        System.out.println(p1.equals(p2)); // false - correct!
    }
}`,
    explanation: 'equals() must compare ALL relevant fields. hashCode() must use the same fields to maintain the contract.',
    romanUrduExplanation: 'equals() sab relevant fields compare karna chahiye. hashCode() same fields use karna chahiye contract maintain karne ke liye.',
    difficulty: 'medium',
    topicTags: ['equals', 'hashcode', 'contract', 'logical-error'],
    xpReward: 60,
    timeLimit: 300,
    errorMessage: 'Logical error: equal points with different coordinates',
    errorType: 'logical',
    conceptTested: ['equals', 'hashcode', 'contract'],
  },
  {
    id: 'dc-007',
    title: 'Resource Leak in File Reading',
    description: 'File resources are not properly closed, causing resource leaks.',
    buggyCode: `import java.io.*;

public class Main {
    public static String readFile(String path) throws IOException {
        FileReader reader = new FileReader(path);
        BufferedReader br = new BufferedReader(reader);
        String content = br.readLine();
        // Resources not closed!
        return content;
    }

    public static void main(String[] args) {
        try {
            System.out.println(readFile("test.txt"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}`,
    expectedBehavior: 'Read file content and properly close all resources, even if exceptions occur.',
    hints: [
      'Use try-with-resources to auto-close resources',
      'Implement AutoCloseable interface',
      'Handle exceptions properly',
    ],
    solution: `import java.io.*;

public class Main {
    public static String readFile(String path) {
        try (FileReader reader = new FileReader(path);
             BufferedReader br = new BufferedReader(reader)) {
            return br.readLine();
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
            return null;
        }
    }

    public static void main(String[] args) {
        String content = readFile("test.txt");
        System.out.println(content);
    }
}`,
    explanation: 'Use try-with-resources to automatically close resources. It ensures cleanup even if exceptions are thrown.',
    romanUrduExplanation: 'Resources automatically close karne ke liye try-with-resources use karo. Ye exceptions ke baad bhi cleanup ensure karta hai.',
    difficulty: 'medium',
    topicTags: ['try-with-resources', 'resource-management', 'io'],
    xpReward: 60,
    timeLimit: 300,
    errorMessage: 'Resource leak: unclosed FileReader and BufferedReader',
    errorType: 'runtime',
    conceptTested: ['try-with-resources', 'resource-management'],
  },
  {
    id: 'dc-008',
    title: 'Thread-Unsafe Singleton',
    description: 'The singleton implementation is not thread-safe, allowing multiple instances.',
    buggyCode: `public class Database {
    private static Database instance;

    private Database() {}

    public static Database getInstance() {
        if (instance == null) { // Race condition!
            instance = new Database();
        }
        return instance;
    }
}`,
    expectedBehavior: 'Only one instance should ever exist, even with multiple threads calling getInstance() simultaneously.',
    hints: [
      'Multiple threads can pass the null check simultaneously',
      'Use synchronized or eager initialization',
      'Consider double-checked locking for performance',
    ],
    solution: `public class Database {
    private static volatile Database instance;

    private Database() {}

    public static Database getInstance() {
        if (instance == null) {
            synchronized (Database.class) {
                if (instance == null) {
                    instance = new Database();
                }
            }
        }
        return instance;
    }
}`,
    explanation: 'Double-checked locking with volatile ensures only one instance is created in a multi-threaded environment.',
    romanUrduExplanation: 'Volatile ke saath double-checked locking ensure karta hai ke multi-threaded environment mein sirf ek instance create ho.',
    difficulty: 'hard',
    topicTags: ['singleton', 'thread-safety', 'design-patterns'],
    xpReward: 80,
    timeLimit: 450,
    errorMessage: 'Race condition: multiple Database instances possible',
    errorType: 'runtime',
    conceptTested: ['singleton', 'thread-safety', 'volatile', 'synchronized'],
  },
];
