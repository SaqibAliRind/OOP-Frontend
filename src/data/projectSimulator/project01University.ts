import type { OOPProjectScenario } from '@/types/projectSimulator';

export const universityProject: OOPProjectScenario = {
  id: 'project-01',
  title: 'University Management System',
  titleUrdu: 'University Management System',
  description: 'Model students, teachers, courses, and departments using core OOP principles.',
  descriptionUrdu: 'Core OOP principles ke sath students, teachers, courses, aur departments model karein.',
  briefing:
    'A university needs a system to manage its academic structure. You will design classes for Student, Teacher, Course, and Department, connect them with the right relationships, protect sensitive student data with encapsulation, and use inheritance only where a true IS-A relationship exists. This is a guided design exercise \u2014 you are making design decisions, not writing production code.',
  briefingUrdu:
    'Ek university ko apni academic structure manage karne ki zaroorat hai. Aap Student, Teacher, Course, aur Department ke liye classes design karenge, unhein sahi relationships se connect karenge, encapsulation se sensitive data protect karenge, aur inheritance sirf tab use karenge jab sachcha IS-A relationship ho. Ye guided design exercise hai \u2014 aap design decisions lrahe hain, production code nahi likh rahe.',
  concepts: ['Classes and Objects', 'Encapsulation', 'Inheritance', 'Association', 'Collections'],
  difficulty: 'medium',
  estimatedMinutes: 35,
  xpReward: 100,
  relatedLessonIds: ['lesson-01-01', 'lesson-02-01', 'lesson-04-01', 'lesson-05-01'],
  requirements: [
    { id: 'req-1', text: 'Model Student, Teacher, Course, and Department.', textUrdu: 'Student, Teacher, Course, aur Department model karein.' },
    { id: 'req-2', text: 'Identify appropriate attributes and methods for each class.', textUrdu: 'Har class ke liye munasib attributes aur methods pehchanein.' },
    { id: 'req-3', text: 'Connect students to courses so they can enroll.', textUrdu: 'Students ko courses se connect karein taake wo enroll kar saken.' },
    { id: 'req-4', text: 'Protect sensitive student data using encapsulation.', textUrdu: 'Encapsulation se sensitive student data protect karein.' },
    { id: 'req-5', text: 'Use inheritance only where the IS-A relationship is justified.', textUrdu: 'Inheritance sirf tab use karein jab IS-A relationship justified ho.' },
  ],
  stages: [
    {
      id: 'u-st-1',
      type: 'requirements',
      title: 'Understand the Requirements',
      titleUrdu: 'Zarooratein Samjhein',
      instructions:
        'Read every requirement carefully. Each one constrains your design. Click "I Understand" when you are ready to begin designing.',
      instructionsUrdu:
        'Har requirement gaur se padhein. Har ek aapke design ko constrain karta hai. Design shuru karne ke liye "I Understand" par click karein.',
      hints: ['Think about which entities exist in a university before selecting classes.', 'Not every noun in the requirements needs its own class.'],
      hintsUrdu: ['Class select karne se pehle sochein ke university mein kaun si entities hoti hain.', 'Har requirement ka noun class nahi hota.'],
    },
    {
      id: 'u-st-2',
      type: 'identify-classes',
      title: 'Identify Classes',
      titleUrdu: 'Classes Pehchanein',
      instructions:
        'Select all classes that belong in this system. Watch out for distractors that are roles, reports, or out-of-scope records. Consider whether a shared parent class is needed for inheritance.',
      instructionsUrdu:
        'Sab select karein jo is system mein belong karti hain. Distractors se bachein jo roles, reports, ya out-of-scope records hain. Sochein ke inheritance ke liye shared parent class chahiye ya nahi.',
      hints: ['A shared parent makes sense when multiple classes share common attributes like name and age.', 'Roles and printed reports are usually not standalone domain classes.'],
      hintsUrdu: ['Shared parent tab munasib hota hai jab multiple classes mein name aur age jaise common attributes hon.', 'Roles aur printed reports aksar standalone domain classes nahi hote.'],
      classCandidates: [
        { id: 'u-cls-person', name: 'Person', description: 'Base class with shared attributes like name and age.', descriptionUrdu: 'Name aur age jaise common attributes wali base class.', attributes: ['name: String', 'age: int'], methods: ['getInfo(): String'], isValid: true },
        { id: 'u-cls-student', name: 'Student', description: 'A person enrolled in one or more courses.', descriptionUrdu: 'Jo ek ya zyada courses mein enrolled ho.', attributes: ['studentId: String', 'gpa: double'], methods: ['enrollIn(Course)'], isValid: true },
        { id: 'u-cls-teacher', name: 'Teacher', description: 'A person who teaches one or more courses.', descriptionUrdu: 'Jo ek ya zyada courses parhata ho.', attributes: ['employeeId: String', 'salary: double'], methods: ['teachCourse(Course)'], isValid: true },
        { id: 'u-cls-course', name: 'Course', description: 'A subject offered by a department.', descriptionUrdu: 'Jo department offer karti ho.', attributes: ['courseCode: String', 'title: String'], methods: ['addStudent(Student)'], isValid: true },
        { id: 'u-cls-dept', name: 'Department', description: 'An academic division that offers courses and employs teachers.', descriptionUrdu: 'Academic division jo courses offer karti hai aur teachers rakhti hai.', attributes: ['name: String'], methods: ['addCourse(Course)'], isValid: true },
        { id: 'u-cls-marksheet', name: 'Marksheet', description: 'A printed report card generated at term end.', descriptionUrdu: 'Term ke aakhir mein banaya gaya printed report card.', attributes: ['term: String'], methods: ['print()'], isValid: false, invalidReason: 'A marksheet is a generated report, not a core domain class in this model.', invalidReasonUrdu: 'Marksheet ek generated report hai, is model mein core domain class nahi.' },
        { id: 'u-cls-chairman', name: 'Chairman', description: 'A leadership role within a department.', descriptionUrdu: 'Department ke andar leadership role.', attributes: ['since: int'], methods: ['approve()'], isValid: false, invalidReason: 'Chairman is a role held by a Teacher, not a separate class.', invalidReasonUrdu: 'Chairman Teacher ka role hai, alag class nahi.' },
        { id: 'u-cls-attendance', name: 'Attendance', description: 'A daily attendance record for students.', descriptionUrdu: 'Students ki daily attendance record.', attributes: ['date: Date', 'status: String'], methods: ['mark()'], isValid: false, invalidReason: 'Attendance tracking is out of scope for this project.', invalidReasonUrdu: 'Attendance tracking is project ke scope se bahar hai.' },
      ],
      requiredClassIds: ['u-cls-person', 'u-cls-student', 'u-cls-teacher', 'u-cls-course', 'u-cls-dept'],
      codeExample: 'class Person {\n    private String name;\n    private int age;\n}\n\nclass Student extends Person {\n    private String studentId;\n    private double gpa;\n    public void enrollIn(Course c) { /* ... */ }\n}',
    },
    {
      id: 'u-st-3',
      type: 'attributes-methods',
      title: 'Choose Attributes & Methods',
      titleUrdu: 'Attributes aur Methods Chunnein',
      instructions:
        'For each class, select only the attributes and methods that genuinely belong to it. Inherited attributes should not be redeclared, and responsibilities must stay with the right class.',
      instructionsUrdu:
        'Har class ke liye sirf wo attributes aur methods select karein jo us se waqai belong karte hain. Inherited attributes dobara declare nahi hone chahiye, aur responsibilities sahi class ke paas rehni chahiye.',
      hints: ['If a field already exists on the parent class, the child should not declare it again.', 'Ask: which class is responsible for this behavior?'],
      hintsUrdu: ['Agar field parent class mein pehle se hai, child usse dobara declare nahi kare.', 'Poochein: kaun si class is behavior ke liye zimmedar hai?'],
      attributeMethodOptions: [
        { id: 'u-am-1', classId: 'u-cls-student', className: 'Student', name: 'gpa: double', kind: 'attribute', isValid: true },
        { id: 'u-am-2', classId: 'u-cls-student', className: 'Student', name: 'studentId: String', kind: 'attribute', isValid: true },
        { id: 'u-am-3', classId: 'u-cls-student', className: 'Student', name: 'enrollIn(Course)', kind: 'method', isValid: true },
        { id: 'u-am-4', classId: 'u-cls-student', className: 'Student', name: 'name: String', kind: 'attribute', isValid: false, invalidReason: 'name already exists on Person \u2014 Student inherits it.', invalidReasonUrdu: 'name Person par pehle se hai \u2014 Student use inherit karta hai.' },
        { id: 'u-am-5', classId: 'u-cls-student', className: 'Student', name: 'teachCourse()', kind: 'method', isValid: false, invalidReason: 'Teaching is the Teacher responsibility, not the Student.', invalidReasonUrdu: 'Parhana Teacher ki responsibility hai, Student ki nahi.' },
        { id: 'u-am-6', classId: 'u-cls-teacher', className: 'Teacher', name: 'employeeId: String', kind: 'attribute', isValid: true },
        { id: 'u-am-7', classId: 'u-cls-teacher', className: 'Teacher', name: 'teachCourse(Course)', kind: 'method', isValid: true },
        { id: 'u-am-8', classId: 'u-cls-teacher', className: 'Teacher', name: 'enrollIn(Course)', kind: 'method', isValid: false, invalidReason: 'Enrolling in a course is a Student behavior.', invalidReasonUrdu: 'Course mein enroll karna Student ka behavior hai.' },
        { id: 'u-am-9', classId: 'u-cls-course', className: 'Course', name: 'courseCode: String', kind: 'attribute', isValid: true },
        { id: 'u-am-10', classId: 'u-cls-course', className: 'Course', name: 'title: String', kind: 'attribute', isValid: true },
        { id: 'u-am-11', classId: 'u-cls-course', className: 'Course', name: 'addStudent(Student)', kind: 'method', isValid: true },
        { id: 'u-am-12', classId: 'u-cls-course', className: 'Course', name: 'gradeStudent()', kind: 'method', isValid: false, invalidReason: 'Grading is performed by the Teacher, not the Course.', invalidReasonUrdu: 'Grading Teacher karta hai, Course nahi.' },
        { id: 'u-am-13', classId: 'u-cls-dept', className: 'Department', name: 'name: String', kind: 'attribute', isValid: true },
        { id: 'u-am-14', classId: 'u-cls-dept', className: 'Department', name: 'addCourse(Course)', kind: 'method', isValid: true },
        { id: 'u-am-15', classId: 'u-cls-person', className: 'Person', name: 'name: String', kind: 'attribute', isValid: true },
        { id: 'u-am-16', classId: 'u-cls-person', className: 'Person', name: 'age: int', kind: 'attribute', isValid: true },
        { id: 'u-am-17', classId: 'u-cls-person', className: 'Person', name: 'enrollIn()', kind: 'method', isValid: false, invalidReason: 'Enrolling is not a general Person responsibility.', invalidReasonUrdu: 'Enroll karna general Person responsibility nahi hai.' },
      ],
      requiredAttributeMethodIds: ['u-am-1', 'u-am-2', 'u-am-3', 'u-am-6', 'u-am-7', 'u-am-9', 'u-am-10', 'u-am-11', 'u-am-13', 'u-am-14', 'u-am-15', 'u-am-16'],
    },
    {
      id: 'u-st-4',
      type: 'relationships',
      title: 'Define Relationships',
      titleUrdu: 'Relationships Define Karein',
      instructions:
        'Choose the correct relationship between each pair of classes. Not every HAS-A is composition, and not every connection is inheritance. Consider lifecycle and ownership carefully.',
      instructionsUrdu:
        'Har class pair ke darmiyan sahi relationship chunein. Har HAS-A composition nahi hota, aur har connection inheritance nahi. Lifecycle aur ownership ka khayal rakhein.',
      hints: ['Composition means the part cannot exist without the whole.', 'IS-A only applies when the child genuinely is a type of the parent.'],
      hintsUrdu: ['Composition ka matlab hai ke part whole ke baghair exist nahi kar sakta.', 'IS-A sirf tab lagta hai ke child waqai parent ka type ho.'],
      relationshipOptions: [
        { id: 'u-rel-1', fromClass: 'Person', toClass: 'Student', type: 'is-a', label: 'Student IS-A Person', labelUrdu: 'Student, Person ka type hai', isValid: true },
        { id: 'u-rel-2', fromClass: 'Person', toClass: 'Teacher', type: 'is-a', label: 'Teacher IS-A Person', labelUrdu: 'Teacher, Person ka type hai', isValid: true },
        { id: 'u-rel-3', fromClass: 'Student', toClass: 'Course', type: 'association', label: 'Student enrolls in Course', labelUrdu: 'Student Course mein enroll hota hai', isValid: true },
        { id: 'u-rel-4', fromClass: 'Department', toClass: 'Teacher', type: 'aggregation', label: 'Department has Teachers', labelUrdu: 'Department ke paas Teachers hain', isValid: true },
        { id: 'u-rel-5', fromClass: 'Department', toClass: 'Course', type: 'association', label: 'Department offers Courses', labelUrdu: 'Department Courses offer karti hai', isValid: true },
        { id: 'u-rel-6', fromClass: 'Teacher', toClass: 'Course', type: 'association', label: 'Teacher teaches Course', labelUrdu: 'Teacher Course parhata hai', isValid: true },
        { id: 'u-rel-7', fromClass: 'Course', toClass: 'Student', type: 'composition', label: 'Course contains Students (composition)', labelUrdu: 'Course Students ko contain karta hai', isValid: false, invalidReason: 'Students outlive courses \u2014 this is association, not composition.', invalidReasonUrdu: 'Students courses se ziyada rehte hain \u2014 ye association hai, composition nahi.' },
        { id: 'u-rel-8', fromClass: 'Student', toClass: 'Department', type: 'is-a', label: 'Student IS-A Department', labelUrdu: 'Student, Department ka type hai', isValid: false, invalidReason: 'A Student is not a type of Department.', invalidReasonUrdu: 'Student, Department ka type nahi hai.' },
      ],
      requiredRelationshipIds: ['u-rel-1', 'u-rel-2', 'u-rel-3', 'u-rel-4', 'u-rel-5', 'u-rel-6'],
      codeExample: 'class Student extends Person { /* IS-A */ }\nclass Teacher extends Person { /* IS-A */ }\n\nclass Department {\n    private List<Teacher> teachers;   // aggregation\n    private List<Course> courses;     // association\n}',
    },
    {
      id: 'u-st-5',
      type: 'encapsulation',
      title: 'Apply Encapsulation',
      titleUrdu: 'Encapsulation Lagayein',
      instructions:
        'Decide how sensitive student data should be protected. Choose the best answer for each question \u2014 you will see an explanation after each selection.',
      instructionsUrdu:
        'Tay karein ke sensitive student data kaise protect hona chahiye. Har sawal ka behtareen jawab chunein \u2014 har selection ke baad explanation milegi.',
      hints: ['Private fields with public accessors give you control over what changes are allowed.', 'Encapsulation protects invariants \u2014 rules your objects must always satisfy.'],
      hintsUrdu: ['Private fields ke sath public accessors aapko control dete hain ke kya changes allowed hon.', 'Encapsulation invariants ko protect karta hai \u2014 rules jo objects hamesha satisfy karein.'],
      pillarChallenges: [
        { id: 'u-pc-1', pillar: 'encapsulation', question: 'How should Student.gpa be stored?', questionUrdu: 'Student.gpa kaise store hona chahiye?', options: ['public double gpa', 'private double gpa with getter/setter', 'protected double gpa', 'static double gpa'], correctIndex: 1, explanation: 'A private field with a getter/setter lets you validate every change and prevents outside code from setting invalid values.', explanationUrdu: 'Getter/setter wala private field har change ko validate karne deta hai aur bahar ke code ko invalid values set karne se rokta hai.', relatedLessonId: 'lesson-04-01' },
        { id: 'u-pc-2', pillar: 'encapsulation', question: 'What should setGpa() do when given 5.0?', questionUrdu: 'setGpa() ko 5.0 di jaye to kya karna chahiye?', options: ['Accept it silently', 'Reject values outside 0.0-4.0 and keep the old value', 'Throw a generic Exception', 'Convert it to 4.0'], correctIndex: 1, explanation: 'The setter should reject out-of-range values and preserve the previous valid state.', explanationUrdu: 'Setter ko bahar ki values reject karni chahiye aur pehle se valid state ko preserve karni chahiye.', relatedLessonId: 'lesson-04-01' },
        { id: 'u-pc-3', pillar: 'encapsulation', question: 'Why should Student fields not all be public?', questionUrdu: 'Student ke fields sab public kyun nahi hone chahiye?', options: ['Public fields compile slower', 'Public fields allow any code to break validation rules', 'Public fields cannot be serialized', 'Public is fine'], correctIndex: 1, explanation: 'Public fields let any code bypass your validation, which can put the object into an invalid state.', explanationUrdu: 'Public fields kisi ko bhi validation bypass karne dete hain, jo object ko invalid state mein daal sakte hain.', relatedLessonId: 'lesson-04-01' },
        { id: 'u-pc-4', pillar: 'encapsulation', question: 'Which Student data is most sensitive?', questionUrdu: 'Student ka kaun sa data sab se sensitive hai?', options: ['Number of enrolled courses', 'GPA and student ID', 'Favorite color', 'Classroom seat number'], correctIndex: 1, explanation: 'GPA and student ID are academic/personal records that must not be tampered with.', explanationUrdu: 'GPA aur student ID academic/personal records hain jinhein chhedchaad se bachana chahiye.', relatedLessonId: 'lesson-04-01' },
      ],
    },
    {
      id: 'u-st-6',
      type: 'pillars',
      title: 'Apply Inheritance, Polymorphism & Abstraction',
      titleUrdu: 'Inheritance, Polymorphism aur Abstraction Lagayein',
      instructions:
        'Apply the remaining OOP pillars. Inheritance must represent a true IS-A relationship. Polymorphism lets you swap behaviors behind a common interface. Abstraction hides unnecessary detail.',
      instructionsUrdu:
        'Baqi OOP pillars lagayein. Inheritance ko sachcha IS-A relationship represent karna chahiye. Polymorphism common interface ke peeche behaviors swap karne deta hai. Abstraction zaroorat se zyada detail chhupati hai.',
      hints: ['If you cannot say "X is a Y" naturally, it is not inheritance.', 'An interface describes what something can do, not how it does it.'],
      hintsUrdu: ['Agar aap naturally "X ek Y hai" nahi keh sakte, to ye inheritance nahi hai.', 'Interface batata hai ke cheez kya kar sakti hai, kaise karti hai nahi.'],
      pillarChallenges: [
        { id: 'u-pc-5', pillar: 'inheritance', question: 'Is "Student extends Person" a justified inheritance?', questionUrdu: '"Student extends Person" justified inheritance hai?', options: ['Yes \u2014 a Student genuinely is a Person', 'No \u2014 Student and Person are unrelated', 'Only if Student has no methods', 'Only if Person is an interface'], correctIndex: 0, explanation: 'A Student is naturally a Person who shares name and age. This is a textbook IS-A relationship.', explanationUrdu: 'Student naturally ek Person hai jo name aur age share karta hai. Ye textbook IS-A relationship hai.', relatedLessonId: 'lesson-05-01' },
        { id: 'u-pc-6', pillar: 'inheritance', question: 'Should Course extend Department?', questionUrdu: 'Course ko Department extend karna chahiye?', options: ['Yes \u2014 a Course is a Department', 'No \u2014 a Course is not a type of Department', 'Yes \u2014 for code reuse only', 'Only if Course has no fields'], correctIndex: 1, explanation: 'A Course is not a Department. Using inheritance for mere code reuse violates the IS-A principle.', explanationUrdu: 'Course, Department nahi hai. Sirf code reuse ke liye inheritance use karna IS-A principle ko violate karta hai.', relatedLessonId: 'lesson-05-01' },
        { id: 'u-pc-7', pillar: 'polymorphism', question: 'How to support different grading scales?', questionUrdu: 'Alag grading scales kaise support karein?', options: ['Add if-else blocks inside Student', 'Use a GradingStrategy interface with multiple implementations', 'Create a separate Student class per scale', 'Store grades as strings only'], correctIndex: 1, explanation: 'A GradingStrategy interface lets you plug in LetterGrading or PercentageGrading without modifying Student.', explanationUrdu: 'GradingStrategy interface LetterGrading ya PercentageGrading plug-in karne deta hai bina Student badle.', relatedLessonId: 'lesson-06-01' },
        { id: 'u-pc-8', pillar: 'abstraction', question: 'What should Department hide behind a simpler contract?', questionUrdu: 'Department ko kya simpler contract ke peeche chhupana chahiye?', options: ['How the internal course list is stored', 'The department name', 'The list of valid course codes', 'The total number of students'], correctIndex: 0, explanation: 'Callers only need addCourse() and getCourses(). Internal storage details should be hidden.', explanationUrdu: 'Callers ko sirf addCourse() aur getCourses() chahiye. Internal storage details chhupane chahiye.', relatedLessonId: 'lesson-07-01' },
      ],
    },
    {
      id: 'u-st-7',
      type: 'review',
      title: 'Review the Architecture',
      titleUrdu: 'Architecture Ka Review Karein',
      instructions:
        'Review your complete design: selected classes, their attributes and methods, and the relationships between them. Confirm the architecture looks correct before running test scenarios.',
      instructionsUrdu:
        'Apna mukammal design review karein: selected classes, unke attributes aur methods, aur unke darmiyan ki relationships. Test scenarios chalane se pehle confirm karein ke architecture sahi lagta hai.',
      hints: ['Every requirement should map to at least one class or relationship in your design.', 'If something feels forced or unrelated, it may be a distractor you selected by mistake.'],
      hintsUrdu: ['Har requirement aapke design mein kam se kam ek class ya relationship se match honi chahiye.', 'Agar kuch zor zabardasti ya unrelated lagay, to galti se distractor select kar liya.'],
    },
    {
      id: 'u-st-8',
      type: 'test-scenarios',
      title: 'Solve Test Scenarios',
      titleUrdu: 'Test Scenarios Solve Karein',
      instructions:
        'Run each test against the design you built in earlier stages. Tests check whether your design decisions satisfy real requirements. If a test fails, revisit the earlier stage to fix the design.',
      instructionsUrdu:
        'Har test apne aage ke stages mein banaye design ke khilaf chalayein. Tests check karte hain ke aapke design decisions asal requirements satisfy karte hain. Agar test fail ho, design theek karne ke liye pehla stage dobara kholein.',
      hints: ['Tests are deterministic \u2014 they check your actual selections from earlier stages.', 'A failing test usually points to a missing class, method, or relationship.'],
      hintsUrdu: ['Tests deterministic hain \u2014 ye aapke aage ke stages ke actual selections check karte hain.', 'Test fail hone ka matlab aksar ke koi class, method, ya relationship missing hai.'],
      testScenarios: [
        { id: 'u-ts-1', requirement: 'Can a student enroll in multiple courses?', requirementUrdu: 'Kya student multiple courses mein enroll kar sakta hai?', expectedBehavior: 'Student and Course classes exist with an enrollment relationship.', expectedBehaviorUrdu: 'Student aur Course classes enrollment relationship ke sath maujood hon.', requiresSelectedClasses: ['u-cls-student', 'u-cls-course'], requiresSelectedRelationships: ['u-rel-3'], explanation: 'With Student, Course, and the enrollment association selected, a student can hold references to many Course objects.', explanationUrdu: 'Student, Course, aur enrollment association select hone se student bohat saare Course objects ka reference rakh sakta hai.' },
        { id: 'u-ts-2', requirement: 'Does the system protect sensitive student data?', requirementUrdu: 'Kya system sensitive student data protect karta hai?', expectedBehavior: 'Encapsulation decisions keep GPA behind private access with validation.', expectedBehaviorUrdu: 'Encapsulation decisions GPA ko private access aur validation ke peeche rakhte hain.', requiresCorrectPillarChallenges: ['u-pc-1', 'u-pc-2', 'u-pc-3'], explanation: 'Correct encapsulation answers confirm that GPA is private and validated.', explanationUrdu: 'Sahi encapsulation answers confirm karte hain ke GPA private aur validated hai.' },
        { id: 'u-ts-3', requirement: 'Is inheritance used only where IS-A is justified?', requirementUrdu: 'Kya inheritance sirf tab use hua hai jab IS-A justified ho?', expectedBehavior: 'Only Student/Teacher extend Person; Course does not extend Department.', expectedBehaviorUrdu: 'Sirf Student/Teacher Person extend karte hain; Course Department extend nahi karta.', requiresCorrectPillarChallenges: ['u-pc-5', 'u-pc-6'], requiresSelectedRelationships: ['u-rel-1', 'u-rel-2'], explanation: 'Correct inheritance answers plus the two IS-A relationships confirm a genuine type hierarchy.', explanationUrdu: 'Sahi inheritance answers aur do IS-A relationships confirm karte hain ke inheritance genuine type hierarchy model karta hai.' },
        { id: 'u-ts-4', requirement: 'Can departments manage their courses?', requirementUrdu: 'Kya departments apne courses manage kar sakti hain?', expectedBehavior: 'Department class has addCourse() and a relationship to Course.', expectedBehaviorUrdu: 'Department class ke paas addCourse() aur Course se relationship ho.', requiresSelectedClasses: ['u-cls-dept', 'u-cls-course'], requiresSelectedAttributeMethods: ['u-am-14'], requiresSelectedRelationships: ['u-rel-5'], explanation: 'Department, addCourse(), and the relationship together let a department manage its course catalog.', explanationUrdu: 'Department, addCourse(), aur relationship milkar department ko apna course catalog manage karne dete hain.' },
        { id: 'u-ts-5', requirement: 'Does any class expose sensitive fields unnecessarily?', requirementUrdu: 'Kya koi class sensitive fields zaroorat se zyada expose karti hai?', expectedBehavior: 'No required class declares sensitive fields as public.', expectedBehaviorUrdu: 'Koi required class sensitive fields ko public declare na kare.', requiresCorrectPillarChallenges: ['u-pc-1', 'u-pc-4'], explanation: 'Private GPA and guarded student ID mean no class leaks sensitive data through public fields.', explanationUrdu: 'Private GPA aur guarded student ID ka matlab hai ke koi class public fields se sensitive data leak nahi karti.' },
      ],
    },
    {
      id: 'u-st-9',
      type: 'assessment',
      title: 'Final Project Assessment',
      titleUrdu: 'Final Project Assessment',
      instructions: 'Answer these final questions to complete the project. They test your understanding of the design you just built.', instructionsUrdu: 'Project mukammal karne ke liye ye aakhri sawal ke jawab dein. Ye aapke dwara banaye design ki samajh test karte hain.',
      hints: ['Think about why each design decision was made, not just what was selected.', 'Encapsulation protects state, inheritance models IS-A, and interfaces enable polymorphism.'],
      hintsUrdu: ['Sochein ke har design decision kyun liya gaya, sirf kya select hua nahi.', 'Encapsulation state ko protect karta hai, inheritance IS-A model karta hai, aur interfaces polymorphism enable karte hain.'],
      assessmentQuestions: [
        { id: 'u-aq-1', question: 'Which design best prevents an invalid GPA of 9.0?', questionUrdu: 'Kaun sa design 9.0 ka invalid GPA rokne ka behtareen hai?', options: ['public double gpa with no checks', 'private gpa with a validating setGpa() method', 'Storing GPA as a String', 'Making GPA static'], correctIndex: 1, explanation: 'A private field with a validating setter rejects out-of-range values before they are stored.', explanationUrdu: 'Validating setter wala private field store hone se pehle bahar ki values reject kar deta hai.' },
        { id: 'u-aq-2', question: 'Why is "Student extends Person" correct but "Course extends Department" wrong?', questionUrdu: '"Student extends Person" sahi aur "Course extends Department" ghalat kyun hai?', options: ['Person has fewer fields than Department', 'A Student is genuinely a Person, but a Course is not a Department', 'Inheritance only works for two classes', 'Both are equally correct'], correctIndex: 1, explanation: 'Inheritance must model a true IS-A relationship.', explanationUrdu: 'Inheritance ko sachcha IS-A relationship model karna chahiye.' },
        { id: 'u-aq-3', question: 'What principle lets Department add new course types without changing its code?', questionUrdu: 'Kaun sa principle Department ko bina code badle naye course types add karne deta hai?', options: ['Encapsulation', 'Abstraction behind a common Course contract', 'Making all fields public', 'Using static methods'], correctIndex: 1, explanation: 'Abstraction behind a common contract means new subtypes can be added without modifying Department.', explanationUrdu: 'Common contract ke peeche abstraction ka matlab hai ke naye subtypes Department badle baghair add ho sakte hain.' },
        { id: 'u-aq-4', question: 'Where should enroll-in-course logic live?', questionUrdu: 'Enroll-in-course logic kahan hona chahiye?', options: ['In the Student class as enrollIn(Course)', 'In a main() method', 'In the Department class', 'Duplicated in both Student and Course'], correctIndex: 0, explanation: 'The Student is the actor performing enrollment, so enrollIn(Course) belongs on Student.', explanationUrdu: 'Student enroll karne wala actor hai, isliye enrollIn(Course) Student par hona chahiye.' },
      ],
    },
  ],
};
