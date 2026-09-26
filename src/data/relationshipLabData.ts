import type { RelationshipNode, RelationshipEdge, RelationshipMission } from '@/types/relationshipLab';

export const ASSOCIATION_NODES: RelationshipNode[] = [
  {
    id: 'teacher-1',
    label: 'Teacher: Dr. Khan',
    labelUrdu: 'Teacher: Dr. Khan',
    type: 'object',
    className: 'Teacher',
    properties: { name: '"Dr. Khan"', subject: '"OOP"', experience: 12 },
    position: [-3, 0.5, 0],
    color: '#60a5fa',
  },
  {
    id: 'student-1',
    label: 'Student: Ali',
    labelUrdu: 'Student: Ali',
    type: 'object',
    className: 'Student',
    properties: { name: '"Ali"', rollNo: '"CS-001"', semester: 3 },
    position: [3, 0.5, 0],
    color: '#34d399',
  },
];

export const ASSOCIATION_EDGES: RelationshipEdge[] = [
  {
    id: 'assoc-1',
    sourceId: 'teacher-1',
    targetId: 'student-1',
    type: 'association',
    label: 'teaches',
    labelUrdu: 'parhata hai',
    sourceRole: 'Teacher',
    targetRole: 'Student',
    ownership: 'none',
    lifecycle: 'independent',
    javaModel: 'Teacher has reference to Student (no ownership)',
    description: 'Teacher and Student are independently connected. Neither owns the other.',
    descriptionUrdu: 'Teacher aur Student independently connected hain. Koi bhi dusre ka owner nahi hai.',
    codeSnippet: 'class Teacher {\n  private String name;\n  void teach(Student s) {\n    s.learn(this.subject);\n  }\n}',
    isDashed: false,
  },
];

export const AGGREGATION_NODES: RelationshipNode[] = [
  {
    id: 'department-1',
    label: 'Department: CS Dept',
    labelUrdu: 'Department: CS Dept',
    type: 'object',
    className: 'Department',
    properties: { name: '"CS Dept"', head: '"Dr. Ahmed"' },
    position: [-3, 0.5, 0],
    color: '#f59e0b',
  },
  {
    id: 'teacher-agg',
    label: 'Teacher: Dr. Khan',
    labelUrdu: 'Teacher: Dr. Khan',
    type: 'object',
    className: 'Teacher',
    properties: { name: '"Dr. Khan"', subject: '"OOP"' },
    position: [3, 0.5, 0],
    color: '#60a5fa',
  },
];

export const AGGREGATION_EDGES: RelationshipEdge[] = [
  {
    id: 'agg-1',
    sourceId: 'department-1',
    targetId: 'teacher-agg',
    type: 'aggregation',
    label: 'has',
    labelUrdu: 'ke paas hai',
    sourceRole: 'Department',
    targetRole: 'Teacher',
    ownership: 'none',
    lifecycle: 'independent',
    javaModel: 'Department references Teacher (independent lifecycle)',
    description: 'Department holds a reference to Teacher, but Teacher exists independently.',
    descriptionUrdu: 'Department Teacher ka reference rakhta hai, lekin Teacher independently exist karta hai.',
    codeSnippet: 'class Department {\n  private Teacher teacher;\n  \n  Department(Teacher teacher) {\n    this.teacher = teacher;\n  }\n  \n  void removeTeacher() {\n    this.teacher = null;\n  }\n}',
    isDashed: false,
  },
];

export const COMPOSITION_NODES: RelationshipNode[] = [
  {
    id: 'house-1',
    label: 'House: Main House',
    labelUrdu: 'House: Main House',
    type: 'object',
    className: 'House',
    properties: { address: '"123 Street"', rooms: 3 },
    position: [-3, 0.5, 0],
    color: '#ef4444',
  },
  {
    id: 'room-1',
    label: 'Room: Living Room',
    labelUrdu: 'Room: Living Room',
    type: 'object',
    className: 'Room',
    properties: { name: '"Living Room"', area: 25 },
    position: [1, 0.5, 0],
    color: '#a78bfa',
  },
  {
    id: 'room-2',
    label: 'Room: Bedroom',
    labelUrdu: 'Room: Bedroom',
    type: 'object',
    className: 'Room',
    properties: { name: '"Bedroom"', area: 18 },
    position: [4, 0.5, 0],
    color: '#c084fc',
  },
];

export const COMPOSITION_EDGES: RelationshipEdge[] = [
  {
    id: 'comp-1',
    sourceId: 'house-1',
    targetId: 'room-1',
    type: 'composition',
    label: 'contains',
    labelUrdu: 'mein shamil hai',
    sourceRole: 'House',
    targetRole: 'Room',
    ownership: 'source-owns-target',
    lifecycle: 'managed',
    javaModel: 'House creates and manages Room lifecycle',
    description: 'House owns Room. Room is created inside House and conceptually removed with House.',
    descriptionUrdu: 'House Room ka owner hai. Room House ke andar banta hai aur House ke saath conceptually hat-ta hai.',
    codeSnippet: 'class Room {\n  String name;\n  Room(String name) { this.name = name; }\n}\n\nclass House {\n  private Room room;\n  \n  House() {\n    this.room = new Room("Living Room");\n  }\n}',
    isDashed: false,
  },
  {
    id: 'comp-2',
    sourceId: 'house-1',
    targetId: 'room-2',
    type: 'composition',
    label: 'contains',
    labelUrdu: 'mein shamil hai',
    sourceRole: 'House',
    targetRole: 'Room',
    ownership: 'source-owns-target',
    lifecycle: 'managed',
    javaModel: 'House creates and manages Room lifecycle',
    description: 'House owns Room. Room is created inside House and conceptually removed with House.',
    descriptionUrdu: 'House Room ka owner hai. Room House ke andar banta hai aur House ke saath conceptually hat-ta hai.',
    codeSnippet: '',
    isDashed: false,
  },
];

export const DEPENDENCY_NODES: RelationshipNode[] = [
  {
    id: 'report-gen',
    label: 'ReportGenerator',
    labelUrdu: 'ReportGenerator',
    type: 'object',
    className: 'ReportGenerator',
    properties: { reportType: '"Sales"', format: '"PDF"' },
    position: [-3, 0.5, 0],
    color: '#06b6d4',
  },
  {
    id: 'printer-1',
    label: 'Printer: OfficePrinter',
    labelUrdu: 'Printer: OfficePrinter',
    type: 'object',
    className: 'Printer',
    properties: { name: '"OfficePrinter"', status: '"Ready"' },
    position: [3, 0.5, 0],
    color: '#84cc16',
  },
];

export const DEPENDENCY_EDGES: RelationshipEdge[] = [
  {
    id: 'dep-1',
    sourceId: 'report-gen',
    targetId: 'printer-1',
    type: 'dependency',
    label: 'uses',
    labelUrdu: 'use karta hai',
    sourceRole: 'ReportGenerator',
    targetRole: 'Printer',
    ownership: 'none',
    lifecycle: 'independent',
    javaModel: 'ReportGenerator receives Printer as method parameter',
    description: 'ReportGenerator temporarily uses Printer in a method. No long-term ownership.',
    descriptionUrdu: 'ReportGenerator Printer ko method mein temporary use karta hai. Koi long-term ownership nahi.',
    codeSnippet: 'class ReportGenerator {\n  void generateReport(Printer printer) {\n    String report = this.buildReport();\n    printer.print(report);\n  }\n}',
    isDashed: true,
  },
];

export const ALL_LAB_DATA: Record<string, { nodes: RelationshipNode[]; edges: RelationshipEdge[] }> = {
  association: { nodes: ASSOCIATION_NODES, edges: ASSOCIATION_EDGES },
  aggregation: { nodes: AGGREGATION_NODES, edges: AGGREGATION_EDGES },
  composition: { nodes: COMPOSITION_NODES, edges: COMPOSITION_EDGES },
  dependency: { nodes: DEPENDENCY_NODES, edges: DEPENDENCY_EDGES },
};

export const DEFAULT_MISSION: RelationshipMission = {
  id: 'architect-university',
  title: 'Architect the University',
  titleUrdu: 'University ka Architect bano',
  description: 'Master all Java object relationships by exploring the University domain.',
  descriptionUrdu: 'University domain explore karke saari Java object relationships seekho.',
  xpReward: 100,
  objectives: [
    {
      id: 'obj-1',
      description: 'Inspect the Teacher and Student objects in the Association Lab',
      descriptionUrdu: 'Association Lab mein Teacher aur Student objects ko inspect karo',
      type: 'inspect-node',
      targetId: 'teacher-1',
      completed: false,
    },
    {
      id: 'obj-2',
      description: 'Identify the Aggregation relationship between Department and Teacher',
      descriptionUrdu: 'Department aur Teacher ke darmiyaan Aggregation relationship pehchano',
      type: 'identify-relationship',
      targetRelationshipType: 'aggregation',
      completed: false,
    },
    {
      id: 'obj-3',
      description: 'Identify the Association relationship between Student and Course',
      descriptionUrdu: 'Student aur Course ke darmiyaan Association relationship pehchano',
      type: 'identify-relationship',
      targetRelationshipType: 'association',
      completed: false,
    },
    {
      id: 'obj-4',
      description: 'Observe Composition: detach a Room from House in the guided example',
      descriptionUrdu: 'Composition dekho: guided example mein Room ko House se detach karo',
      type: 'detach-relationship',
      completed: false,
    },
    {
      id: 'obj-5',
      description: 'Solve the IS-A vs HAS-A challenge: Car and Engine',
      descriptionUrdu: 'IS-A vs HAS-A challenge solve karo: Car aur Engine',
      type: 'solve-challenge',
      completed: false,
    },
    {
      id: 'obj-6',
      description: 'Complete the relationship identification quiz',
      descriptionUrdu: 'Relationship identification quiz mukammal karo',
      type: 'complete-quiz',
      completed: false,
    },
  ],
};
