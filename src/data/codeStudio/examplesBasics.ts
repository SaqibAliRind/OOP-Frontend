import type { JavaCodeExample } from '@/types/codeStudio';

export const BASIC_EXAMPLES: JavaCodeExample[] = [
  {
    id: 'cs-ex-01',
    title: 'Hello Class',
    titleUrdu: 'Hello Class',
    category: 'basics',
    topic: 'Java syntax entry point',
    difficulty: 'easy',
    filename: 'Hello.java',
    code: `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, OOP Universe!");
    }
}`,
    expectedOutput: ['Hello, OOP Universe!'],
    keyConcept: 'Every Java program starts with a class; main is the entry point.',
    keyConceptUrdu: 'Har Java program class se shuru hota hai; main entry point hai.',
    commonMistake: 'Forgetting that main must be public static void with String[] args.',
    commonMistakeUrdu: 'Bhool jana ke main public static void String[] args hona chahiye.',
    relatedLessonId: 'lesson-01-01',
    relatedModuleId: 'module-01',
    lineExplanations: [
      { line: 1, what: 'Declares a public class named Hello.', whatUrdu: 'Hello naam ki public class declare karta hai.', why: 'Java code lives inside classes; the filename must match the public class name.', whyUrdu: 'Java code class ke andar hota hai; filename public class ke naam se match karni chahiye.', concept: 'Class declaration' },
      { line: 2, what: 'Defines the main method — the program entry point.', whatUrdu: 'Main method define karta hai — program ka entry point.', why: 'The JVM starts execution here when you run the class.', whyUrdu: 'JVM class chalate waqt yahan se shuru karta hai.', concept: 'main method' },
      { line: 3, what: 'Prints a string to the console.', whatUrdu: 'Console par string print karta hai.', why: 'System.out.println is the standard way to show output.', whyUrdu: 'System.out.println output dikhane ka standard tareeqa hai.', concept: 'Output' },
      { line: 4, what: 'Closes the main method block.', whatUrdu: 'Main method block band karta hai.', why: 'Braces group the method body.', whyUrdu: 'Braces method body ko group karte hain.', concept: 'Blocks' },
      { line: 5, what: 'Closes the class block.', whatUrdu: 'Class block band karta hai.', why: 'Every opening brace needs a matching closing brace.', whyUrdu: 'Har opening brace ke sath closing brace chahiye.', concept: 'Blocks' },
    ],
    trace: {
      note: 'Conceptual teaching steps — not a real JVM trace.',
      noteUrdu: 'Conceptual teaching steps — asal JVM trace nahi.',
      steps: [
        { id: 't1', title: 'Class definition encountered', titleUrdu: 'Class definition mili', description: 'Hello class is loaded conceptually before main runs.', descriptionUrdu: 'Main chalne se pehle Hello class conceptually load hoti hai.', highlightLine: 1, conceptualState: { className: 'Hello' } },
        { id: 't2', title: 'Entry point selected', titleUrdu: 'Entry point chuna gaya', description: 'main(String[] args) is where execution begins.', descriptionUrdu: 'Execution main(String[] args) se shuru hoti hai.', highlightLine: 2, conceptualState: { className: 'Hello', methodBeingCalled: 'main' } },
        { id: 't3', title: 'Print statement reached', titleUrdu: 'Print statement pahunchi', description: 'System.out.println is about to produce a line of output.', descriptionUrdu: 'System.out.println ek line output dene wala hai.', highlightLine: 3, conceptualState: { className: 'Hello', methodBeingCalled: 'main' } },
        { id: 't4', title: 'Output displayed', titleUrdu: 'Output dikhaya gaya', description: 'Expected console output is shown.', descriptionUrdu: 'Expected console output dikhaya gaya.', highlightLine: 3, conceptualState: { className: 'Hello', methodBeingCalled: 'main', outputLines: ['Hello, OOP Universe!'] } },
        { id: 't5', title: 'Program ends', titleUrdu: 'Program khatam', description: 'main returns; no more statements run.', descriptionUrdu: 'main return karta hai; aur statements nahi chalte.', highlightLine: 5, conceptualState: { className: 'Hello', outputLines: ['Hello, OOP Universe!'] } },
      ],
    },
  },
  {
    id: 'cs-ex-02',
    title: 'Variables and Types',
    titleUrdu: 'Variables aur Types',
    category: 'basics',
    topic: 'Primitive types and references',
    difficulty: 'easy',
    filename: 'Types.java',
    code: `public class Types {
    public static void main(String[] args) {
        int rolls = 42;
        double gpa = 3.75;
        boolean active = true;
        String name = "Ayesha";
        System.out.println(name + " gpa=" + gpa);
    }
}`,
    expectedOutput: ['Ayesha gpa=3.75'],
    keyConcept: 'Primitives store values; String is a reference type.',
    keyConceptUrdu: 'Primitives value rakhte hain; String reference type hai.',
    commonMistake: 'Comparing Strings with == instead of equals().',
    commonMistakeUrdu: 'String ko == se compare karna equals() ki jagah.',
    relatedLessonId: 'lesson-01-02',
    relatedModuleId: 'module-01',
    lineExplanations: [
      { line: 1, what: 'Declares class Types.', whatUrdu: 'Types class declare karta hai.', why: 'Variables must live inside a class structure.', whyUrdu: 'Variables class structure ke andar hone chahiye.', concept: 'Class' },
      { line: 2, what: 'Starts the main method.', whatUrdu: 'Main method shuru karta hai.', why: 'Entry point for running the example.', whyUrdu: 'Example chalane ka entry point.', concept: 'main' },
      { line: 3, what: 'Creates int variable rolls = 42.', whatUrdu: 'Int variable rolls = 42 banata hai.', why: 'int stores whole numbers efficiently.', whyUrdu: 'int poore numbers efficiently store karta hai.', concept: 'Primitive' },
      { line: 4, what: 'Creates double gpa = 3.75.', whatUrdu: 'Double gpa = 3.75 banata hai.', why: 'double supports decimal grades.', whyUrdu: 'double decimal grades support karta hai.', concept: 'Primitive' },
      { line: 5, what: 'Creates boolean active = true.', whatUrdu: 'Boolean active = true banata hai.', why: 'boolean models true/false flags.', whyUrdu: 'boolean true/false flags model karta hai.', concept: 'Primitive' },
      { line: 6, what: 'Creates String reference name.', whatUrdu: 'String reference name banata hai.', why: 'String is an object reference, not a primitive.', whyUrdu: 'String primitive nahi, object reference hai.', concept: 'Reference type' },
      { line: 7, what: 'Concatenates and prints name and gpa.', whatUrdu: 'Name aur gpa concatenate karke print karta hai.', why: '+ joins strings with values for readable output.', whyUrdu: '+ readable output ke liye strings aur values jorta hai.', concept: 'Output' },
    ],
  },
  {
    id: 'cs-ex-03',
    title: 'First Student Class',
    titleUrdu: 'Pehli Student Class',
    category: 'classes',
    topic: 'Class vs object',
    difficulty: 'easy',
    filename: 'Student.java',
    code: `class Student {
    String name;
    int roll;

    void display() {
        System.out.println(name + " #" + roll);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student();
        s1.name = "Hamza";
        s1.roll = 12;
        s1.display();
    }
}`,
    expectedOutput: ['Hamza #12'],
    keyConcept: 'A class is a blueprint; an object is a concrete instance.',
    keyConceptUrdu: 'Class blueprint hai; object concrete instance hai.',
    commonMistake: 'Confusing the class template with a runtime object.',
    commonMistakeUrdu: 'Class template aur runtime object mein confusion.',
    relatedLessonId: 'lesson-02-01',
    relatedModuleId: 'module-02',
    lineExplanations: [
      { line: 1, what: 'Defines the Student class blueprint.', whatUrdu: 'Student class blueprint define karta hai.', why: 'Classes describe state (fields) and behavior (methods).', whyUrdu: 'Classes state (fields) aur behavior (methods) describe karti hain.', concept: 'Class' },
      { line: 2, what: 'Declares instance field name.', whatUrdu: 'Instance field name declare karta hai.', why: 'Each object will hold its own name value.', whyUrdu: 'Har object apni name value rakhega.', concept: 'Field' },
      { line: 3, what: 'Declares instance field roll.', whatUrdu: 'Instance field roll declare karta hai.', why: 'Stores the roll number per student.', whyUrdu: 'Har student ka roll number store karta hai.', concept: 'Field' },
      { line: 5, what: 'Defines display() behavior.', whatUrdu: 'display() behavior define karta hai.', why: 'Methods implement what objects can do.', whyUrdu: 'Methods batate hain objects kya kar sakte hain.', concept: 'Method' },
      { line: 6, what: 'Prints name and roll.', whatUrdu: 'Name aur roll print karta hai.', why: 'Shows the object state to the user.', whyUrdu: 'User ko object state dikhata hai.', concept: 'Output' },
      { line: 12, what: 'Creates a new Student object.', whatUrdu: 'Naya Student object banata hai.', why: 'new allocates an object and runs the constructor.', whyUrdu: 'new object allocate karke constructor chalata hai.', concept: 'Object creation' },
      { line: 13, what: 'Assigns name on the object.', whatUrdu: 'Object par name assign karta hai.', why: 's1.name sets state on that specific object.', whyUrdu: 'Us specific object par state set karta hai.', concept: 'Reference access' },
      { line: 15, what: 'Calls display() on s1.', whatUrdu: 's1 par display() call karta hai.', why: 'Method invocation uses the reference with dot operator.', whyUrdu: 'Method call reference se dot operator se hota hai.', concept: 'Method call' },
    ],
    trace: {
      note: 'Conceptual teaching steps — not a real JVM trace.',
      noteUrdu: 'Conceptual teaching steps — asal JVM trace nahi.',
      steps: [
        { id: 'c1', title: 'Class definition encountered', titleUrdu: 'Class definition mili', description: 'Student blueprint is known to the program.', descriptionUrdu: 'Student blueprint program ko maloom hai.', highlightLine: 1, conceptualState: { className: 'Student' } },
        { id: 'c2', title: 'Reference variable declared', titleUrdu: 'Reference variable declare hua', description: 'Student s1 reserves a reference name (no object yet).', descriptionUrdu: 'Student s1 ne reference naam reserve kiya (abhi object nahi).', highlightLine: 12, conceptualState: { className: 'Student', referenceName: 's1', objectCreated: false } },
        { id: 'c3', title: 'Object creation expression', titleUrdu: 'Object creation expression', description: 'new Student() asks for a new object.', descriptionUrdu: 'new Student() naye object ki farmaish hai.', highlightLine: 12, conceptualState: { className: 'Student', referenceName: 's1', objectCreated: false } },
        { id: 'c4', title: 'Constructor invoked', titleUrdu: 'Constructor invok hua', description: 'Default constructor initializes the new object conceptually.', descriptionUrdu: 'Default constructor naye object ko conceptually initialize karta hai.', highlightLine: 12, conceptualState: { className: 'Student', referenceName: 's1', objectCreated: true, fields: [{ name: 'name', value: 'null' }, { name: 'roll', value: '0' }] } },
        { id: 'c5', title: 'Reference assigned', titleUrdu: 'Reference assign hua', description: 's1 now points to the Student object.', descriptionUrdu: 's1 ab Student object ki taraf point karta hai.', highlightLine: 12, conceptualState: { className: 'Student', referenceName: 's1', objectCreated: true, fields: [{ name: 'name', value: 'null' }, { name: 'roll', value: '0' }] } },
        { id: 'c6', title: 'Field set: name', titleUrdu: 'Field set: name', description: 's1.name becomes "Hamza".', descriptionUrdu: 's1.name "Hamza" ban jata hai.', highlightLine: 13, conceptualState: { className: 'Student', referenceName: 's1', objectCreated: true, fields: [{ name: 'name', value: '"Hamza"' }, { name: 'roll', value: '0' }] } },
        { id: 'c7', title: 'Field set: roll', titleUrdu: 'Field set: roll', description: 's1.roll becomes 12.', descriptionUrdu: 's1.roll 12 ban jata hai.', highlightLine: 14, conceptualState: { className: 'Student', referenceName: 's1', objectCreated: true, fields: [{ name: 'name', value: '"Hamza"' }, { name: 'roll', value: '12' }] } },
        { id: 'c8', title: 'Method call: display()', titleUrdu: 'Method call: display()', description: 'display() runs using s1 state.', descriptionUrdu: 'display() s1 state ke sath chalta hai.', highlightLine: 15, conceptualState: { className: 'Student', referenceName: 's1', methodBeingCalled: 'display', fields: [{ name: 'name', value: '"Hamza"' }, { name: 'roll', value: '12' }] } },
        { id: 'c9', title: 'Expected output', titleUrdu: 'Expected output', description: 'Console shows the student line.', descriptionUrdu: 'Console student line dikhata hai.', highlightLine: 6, conceptualState: { className: 'Student', referenceName: 's1', methodBeingCalled: 'display', outputLines: ['Hamza #12'] } },
      ],
    },
  },
];
