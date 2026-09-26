// ─── Class Blueprint ────────────────────────────────────────
export interface ClassProperty {
  name: string;
  type: string;
  value: string;
  accessModifier: 'public' | 'private' | 'protected';
}

export interface ClassMethod {
  name: string;
  returnType: string;
  parameters: { name: string; type: string }[];
  accessModifier: 'public' | 'private' | 'protected';
  body?: string;
}

export interface ClassBlueprint {
  name: string;
  properties: ClassProperty[];
  methods: ClassMethod[];
}

// ─── Object Instance ────────────────────────────────────────
export interface ObjectProperty {
  name: string;
  type: string;
  value: string;
  accessModifier: 'public' | 'private' | 'protected';
}

export interface ObjectInstance {
  id: string;
  className: string;
  variableName: string;
  properties: ObjectProperty[];
  position: [number, number, number];
  createdAt: number;
  isSelected: boolean;
  color: string;
}

// ─── Code Actions ───────────────────────────────────────────
export type CodeActionType =
  | 'DECLARE_VARIABLE'
  | 'CREATE_OBJECT'
  | 'ACCESS_PROPERTY'
  | 'SET_PROPERTY'
  | 'CALL_METHOD'
  | 'DECLARE_CLASS'
  | 'DECLARE_ABSTRACT_CLASS'
  | 'DECLARE_INTERFACE'
  | 'DECLARE_ABSTRACT_METHOD'
  | 'OVERRIDE_METHOD'
  | 'IMPLEMENT_INTERFACE'
  | 'DECLARE_DEFAULT_METHOD'
  | 'DECLARE_STATIC_METHOD'
  | 'UPCAST_OBJECT'
  | 'DOWNCAST_OBJECT'
  | 'INSTANCEOF_CHECK'
  | 'CALL_POLYMORPHIC'
  | 'CALL_INTERFACE_METHOD'
  | 'SHOW_COMPILE_ERROR'
  | 'SHOW_RUNTIME_ERROR'
  | 'THIS_REFERENCE'
  | 'SUPER_CONSTRUCTOR'
  | 'SUPER_METHOD'
  | 'STATIC_ACCESS'
  | 'INSTANCE_ACCESS'
  | 'FINAL_ASSIGNMENT'
  | 'FINAL_BLOCKED'
  | 'TOSTRING_CALL'
  | 'EQUALS_CALL'
  | 'HASHCODE_CALL'
  | 'REFERENCE_COMPARE'
  | 'DECLARE_STATIC_FIELD'
  | 'DECLARE_FINAL_VARIABLE'
  | 'DECLARE_FINAL_METHOD'
  | 'DECLARE_FINAL_CLASS'
  | 'IMPORT_PACKAGE'
  | 'IMPORT_STATIC'
  | 'USE_WILDCARD_IMPORT'
  | 'CREATE_SUBPACKAGE'
  | 'ACCESS_PACKAGE_CLASS'
  | 'SHOW_PACKAGE_STRUCTURE'
  | 'DECLARE_CUSTOM_EXCEPTION'
  | 'THROW_EXCEPTION'
  | 'TRY_CATCH_BLOCK'
  | 'FINALLY_BLOCK'
  | 'MULTI_CATCH'
  | 'TRY_WITH_RESOURCES'
  | 'SHOW_EXCEPTION_PROPAGATION'
  | 'CHAIN_EXCEPTIONS'
  | 'DECLARE_CHECKED_EXCEPTION'
  | 'DECLARE_RUNTIME_EXCEPTION'
  | 'CREATE_ARRAYLIST'
  | 'CREATE_HASHMAP'
  | 'CREATE_HASHSET'
  | 'ADD_TO_COLLECTION'
  | 'REMOVE_FROM_COLLECTION'
  | 'ITERATE_COLLECTION'
  | 'SORT_COLLECTION'
  | 'USE_GENERIC_TYPE'
  | 'SHOW_COLLECTION_INTERNALS'
  | 'USE_ITERATOR'
  | 'USE_ENUM_COLLECTION'
  | 'CREATE_ASSOCIATION'
  | 'CREATE_AGGREGATION'
  | 'CREATE_COMPOSITION'
  | 'CREATE_DEPENDENCY'
  | 'CREATE_INHERITANCE'
  | 'CREATE_IMPLEMENTATION'
  | 'APPLY_SRP'
  | 'APPLY_OCP'
  | 'APPLY_LSP'
  | 'APPLY_ISP'
  | 'APPLY_DIP'
  | 'REDUCE_COUPLING'
  | 'INCREASE_COHESION'
  | 'REFACTOR_CLASS'
  | 'SPLIT_RESPONSIBILITY'
  | 'EXTRACT_INTERFACE'
  | 'INJECT_DEPENDENCY'
  | 'IDENTIFY_CLASSES'
  | 'IDENTIFY_OBJECTS'
  | 'ASSIGN_RESPONSIBILITIES'
  | 'DESIGN_RELATIONSHIPS'
  | 'APPLY_ENCAPSULATION'
  | 'APPLY_ABSTRACTION'
  | 'APPLY_POLYMORPHISM'
  | 'CREATE_CLASS_DESIGN'
  | 'CREATE_INTERFACE_DESIGN'
  | 'REFACTOR_LEGACY'
  | 'REVIEW_ARCHITECTURE'
  | 'DESIGN_CASE_STUDY'
  | 'APPLY_STRATEGY_PATTERN'
  | 'APPLY_FACTORY_PATTERN'
  | 'APPLY_OBSERVER_PATTERN';

export interface CodeAction {
  type: CodeActionType;
  sourceLine: number;
  className?: string;
  variableName?: string;
  objectId?: string;
  propertyName?: string;
  propertyValue?: string;
  methodName?: string;
  args?: string[];
  referenceType?: string;
  actualType?: string;
  targetClassName?: string;
  interfaceName?: string;
  errorMessage?: string;
  outputMessage?: string;
  message?: string;
}

// ─── World Actions ──────────────────────────────────────────
export type WorldActionType =
  | 'SPAWN_OBJECT'
  | 'SELECT_OBJECT'
  | 'DESELECT_OBJECT'
  | 'UPDATE_PROPERTY'
  | 'PLAY_METHOD_ANIMATION'
  | 'SHOW_CLASS_BLUEPRINT'
  | 'SHOW_ERROR'
  | 'SHOW_INFO'
  | 'SHOW_CONSOLE_OUTPUT'
  | 'MOVE_OBJECT'
  | 'REMOVE_OBJECT'
  | 'SHOW_RUNTIME_DISPATCH'
  | 'SHOW_REFERENCE_VS_OBJECT'
  | 'SHOW_UPCAST'
  | 'SHOW_DOWNCAST'
  | 'SHOW_CAST_ERROR'
  | 'SHOW_ABSTRACT_LAYER'
  | 'SHOW_INSTANTIATION_BLOCKED'
  | 'SHOW_CONTRACT_CONNECTION'
  | 'SHOW_INTERFACE_IMPLEMENTATION'
  | 'SHOW_COMPILE_ERROR'
  | 'SHOW_RUNTIME_ERROR'
  | 'SHOW_METHODOLOGY_PATH'
  | 'HIGHLIGHT_CURRENT_OBJECT'
  | 'SHOW_SUPER_CONSTRUCTOR'
  | 'SHOW_CLASS_LEVEL_MEMBER'
  | 'SHOW_OBJECT_MEMBER'
  | 'BLOCK_REASSIGNMENT'
  | 'SHOW_STRING_REPRESENTATION'
  | 'SHOW_EQUALITY_COMPARISON'
  | 'SHOW_HASH_VALUE'
  | 'SHOW_REFERENCE_COMPARISON'
  | 'SHOW_STATIC_CONTEXT'
  | 'SHOW_FINAL_RESTRICTION'
  | 'SHOW_PACKAGE_FOLDER'
  | 'SHOW_IMPORT_CONNECTION'
  | 'SHOW_PACKAGE_DEPENDENCY'
  | 'SHOW_SUBPACKAGE_NESTING'
  | 'SHOW_EXCEPTION_PATH'
  | 'SHOW_CATCH_HANDLER'
  | 'SHOW_FINALLY_EXECUTE'
  | 'SHOW_EXCEPTION_CHAIN'
  | 'SHOW_RESOURCE_CLOSE'
  | 'SHOW_CHECKED_DECLARE'
  | 'SHOW_TRY_BLOCK_SCOPE'
  | 'SHOW_COLLECTION_GROW'
  | 'SHOW_ITERATION_TRAVERSAL'
  | 'SHOW_GENERIC_ENFORCE'
  | 'SHOW_HASHMAP_BUCKETS'
  | 'SHOW_SORT_REORDER'
  | 'SHOW_RELATIONSHIP_LINE'
  | 'SHOW_AGGREGATION_LINK'
  | 'SHOW_COMPOSITION_LINK'
  | 'SHOW_DEPENDENCY_ARROW'
  | 'SHOW_INHERITANCE_TREE'
  | 'SHOW_INTERFACE_CONTRACT'
  | 'SHOW_SOLID_VIOLATION'
  | 'SHOW_SOLID_FIX'
  | 'SHOW_COUPLING_REDUCED'
  | 'SHOW_COHESION_INCREASED'
  | 'SHOW_REFACTORED_CLASS'
  | 'SHOW_ARCHITECTURE_SPLIT'
  | 'SHOW_DESIGN_PATTERN'
  | 'SHOW_ARCHITECTURE_BAD'
  | 'SHOW_ARCHITECTURE_GOOD'
  | 'SHOW_DESIGN_STAGE'
  | 'SHOW_REQUIREMENT_PANEL'
  | 'SHOW_CLASS_DIAGRAM'
  | 'SHOW_RESPONSIBILITY_MAP'
  | 'SHOW_REFACTORING_FLOW'
  | 'SHOW_PATTERN_PREVIEW'
  | 'SHOW_ARCHITECTURE_SCORE'
  | 'SHOW_CASE_STUDY'
  | 'SHOW_FINAL_REVIEW'
  | 'SHOW_BOSS_CHALLENGE'
  | 'SHOW_POLYMORPHIC_DISPATCH'
  | 'SHOW_ABSTRACTION_LAYER';

export interface WorldAction {
  type: WorldActionType;
  objectId?: string;
  className?: string;
  propertyName?: string;
  propertyValue?: string;
  methodName?: string;
  message?: string;
  position?: [number, number, number];
  duration?: number;
  interfaceName?: string;
  targetClassName?: string;
}

// ─── Execution Stages ──────────────────────────────────────
export type ExecutionStage =
  | 'class-loaded'
  | 'reference-declared'
  | 'object-created'
  | 'property-initialized'
  | 'reference-connected'
  | 'method-called'
  | 'method-result';

export const STAGE_META: Record<ExecutionStage, { label: string; labelUrdu: string; icon: string; color: string }> = {
  'class-loaded':        { label: 'Class Loaded',        labelUrdu: 'Class Load',       icon: '&#128218;', color: '#8b5cf6' },
  'reference-declared':  { label: 'Reference Declared',  labelUrdu: 'Reference Declare', icon: '&#128279;', color: '#3b82f6' },
  'object-created':      { label: 'Object Created',      labelUrdu: 'Object Create',     icon: '&#9632;',   color: '#10b981' },
  'property-initialized':{ label: 'Initialized',         labelUrdu: 'Initialize',        icon: '&#9998;',   color: '#f59e0b' },
  'reference-connected': { label: 'Reference Connected', labelUrdu: 'Reference Connect',  icon: '&#8594;',   color: '#06b6d4' },
  'method-called':       { label: 'Method Called',       labelUrdu: 'Method Call',        icon: '&#9654;',   color: '#ec4899' },
  'method-result':       { label: 'Method Result',       labelUrdu: 'Method Result',      icon: '&#10003;',  color: '#10b981' },
};

// ─── Execution Steps ────────────────────────────────────────
export interface ExecutionStep {
  id: number;
  codeLine: number;
  description: string;
  descriptionUrdu: string;
  codeAction: CodeAction;
  worldAction: WorldAction;
  callout?: LearningCallout;
  stage?: ExecutionStage;
}

// ─── Learning Callouts ──────────────────────────────────────
export type CalloutType = 'why' | 'what' | 'remember' | 'mistake' | 'tip' | 'concept' | 'exam' | 'viva' | 'interview' | 'java-rule';

export interface LearningCallout {
  type: CalloutType;
  title: string;
  message: string;
  messageUrdu: string;
  expandable?: boolean;
  expandedMessage?: string;
  expandedMessageUrdu?: string;
}

// ─── Mission System ─────────────────────────────────────────
export type MissionStatus = 'locked' | 'active' | 'completed';

export interface MissionObjective {
  id: string;
  description: string;
  descriptionUrdu: string;
  completed: boolean;
  type: 'create-object' | 'set-property' | 'call-method' | 'inspect-object' | 'override-method' | 'implement-interface' | 'upcast' | 'downcast' | 'instanceof-check' | 'identify-abstract' | 'use-this' | 'use-super' | 'use-static' | 'use-final'   | 'use-tostring' | 'use-equals' | 'use-hashcode' | 'compare-references'
  | 'import-package' | 'create-subpackage' | 'use-wildcard' | 'access-packaged-class'
  | 'throw-exception' | 'catch-exception' | 'use-finally' | 'try-with-resources'
  | 'create-arraylist' | 'create-hashmap' | 'iterate-collection' | 'use-generic'
  | 'identify-association' | 'identify-aggregation' | 'identify-composition'
  | 'identify-dependency' | 'choose-is-a-vs-has-a' | 'apply-srp' | 'apply-ocp'
  | 'apply-lsp' | 'apply-isp' | 'apply-dip' | 'reduce-coupling' | 'increase-cohesion'
  | 'refactor-architecture' | 'solve-architecture'
  | 'identify-design-classes' | 'assign-responsibilities' | 'design-system-relationships'
  | 'apply-encapsulation' | 'apply-abstraction-design' | 'apply-polymorphism-design'
  | 'refactor-legacy' | 'apply-strategy' | 'apply-factory' | 'apply-observer'
  | 'complete-case-study' | 'solve-boss-challenge'
  | 'change-state' | 'compare-objects';
  targetObjectId?: string;
  targetClassName?: string;
  targetCount?: number;
  currentCount: number;
}

export interface Mission {
  id: string;
  title: string;
  titleUrdu: string;
  description: string;
  descriptionUrdu: string;
  status: MissionStatus;
  objectives: MissionObjective[];
  xpReward: number;
  prerequisiteMissionId?: string;
}

// ─── Console Output ─────────────────────────────────────────
export interface ConsoleEntry {
  id: string;
  type: 'output' | 'error' | 'info' | 'success';
  message: string;
  timestamp: number;
}

// ─── Quality Settings ───────────────────────────────────────
export type QualityLevel = 'auto' | 'high' | 'medium' | 'low';

export interface QualitySettings {
  level: QualityLevel;
  shadows: boolean;
  shadowQuality: 'off' | 'low' | 'medium' | 'high';
  antialiasing: boolean;
  pixelRatio: number;
  maxLights: number;
  environmentPreset: string;
}

// ─── 3D Object Visual Config ────────────────────────────────
export interface ObjectVisualConfig {
  geometry: 'box' | 'sphere' | 'cylinder' | 'octahedron' | 'roundedBox';
  baseColor: string;
  selectedColor: string;
  scale: number;
  emissiveIntensity: number;
  metalness: number;
  roughness: number;
}

// ─── World State ────────────────────────────────────────────
export interface OOPWorldState {
  classes: ClassBlueprint[];
  objects: ObjectInstance[];
  selectedObjectId: string | null;
  console: ConsoleEntry[];
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  isStepMode: boolean;
  mission: Mission | null;
  activeCallout: LearningCallout | null;
  isInitialized: boolean;
  showIntro: boolean;
  language: 'english' | 'romanUrdu';
  quality: QualitySettings;
  hoveredObjectId: string | null;
  executionHistory: ExecutionStep[];
  activeProperty: { objectId: string; propertyName: string } | null;
  activeMethod: { methodName: string; objectId?: string } | null;
  objectiveToast: { objectiveId: string; message: string; xp?: number } | null;
  activeStage: ExecutionStage | null;
  stateHistory: StateChangeEvent[];
  lastExecutedMethod: { methodName: string; objectId: string; timestamp: number } | null;
  changedProperty: { objectId: string; propertyName: string; newValue: string } | null;
  comparisonIds: { a: string | null; b: string | null };
}

// ─── State History ──────────────────────────────────────────
export interface StateChangeEvent {
  id: string;
  sequenceNumber: number;
  objectId: string;
  objectName: string;
  methodName: string;
  previousState: { name: string; value: string }[];
  updatedState: { name: string; value: string }[];
  changedProperty: string;
  explanation: string;
  explanationUrdu: string;
  timestamp: number;
}

export interface ObjectStateSnapshot {
  objectId: string;
  variableName: string;
  className: string;
  properties: { name: string; type: string; value: string }[];
  timestamp: number;
}

export interface ObjectComparison {
  objectA: ObjectStateSnapshot;
  objectB: ObjectStateSnapshot;
  differences: { property: string; valueA: string; valueB: string }[];
  explanation: string;
  explanationUrdu: string;
}

// ─── Code Line Mapping ──────────────────────────────────────
export interface CodeLine {
  number: number;
  content: string;
  isActive: boolean;
  isExecuted: boolean;
  hasError: boolean;
  action?: CodeAction;
}

// ─── Scene Code ─────────────────────────────────────────────
export interface SceneCode {
  className: string;
  classDefinition: string;
  executionLines: string[];
  fullCode: string;
}

// ─── Color Palette for Objects ──────────────────────────────
export const OBJECT_COLORS = [
  '#3b82f6', // blue
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // violet
  '#06b6d4', // cyan
  '#ec4899', // pink
  '#84cc16', // lime
] as const;

export function getObjectColor(index: number): string {
  return OBJECT_COLORS[index % OBJECT_COLORS.length];
}

// ─── Default Class Blueprint ────────────────────────────────
export const DEFAULT_STUDENT_CLASS: ClassBlueprint = {
  name: 'Student',
  properties: [
    { name: 'name', type: 'String', value: '""', accessModifier: 'private' },
    { name: 'age', type: 'int', value: '0', accessModifier: 'private' },
    { name: 'assignmentsSubmitted', type: 'int', value: '0', accessModifier: 'private' },
  ],
  methods: [
    {
      name: 'study',
      returnType: 'void',
      parameters: [],
      accessModifier: 'public',
      body: 'System.out.println(name + " is studying");',
    },
    {
      name: 'submitAssignment',
      returnType: 'void',
      parameters: [],
      accessModifier: 'public',
      body: 'assignmentsSubmitted++;',
    },
    {
      name: 'attendClass',
      returnType: 'void',
      parameters: [],
      accessModifier: 'public',
      body: 'System.out.println(name + " attended class");',
    },
    {
      name: 'setInfo',
      returnType: 'void',
      parameters: [
        { name: 'name', type: 'String' },
        { name: 'age', type: 'int' },
      ],
      accessModifier: 'public',
      body: 'this.name = name; this.age = age;',
    },
  ],
};

// ─── Default Execution Steps ────────────────────────────────
export function createDefaultSteps(): ExecutionStep[] {
  return [
    // ── STAGE 1: CLASS LOADED ──
    {
      id: 1,
      codeLine: 1,
      description: 'The class blueprint is loaded. Student class defines properties and methods.',
      descriptionUrdu: 'Class blueprint load ho raha hai. Student class properties aur methods define karti hai.',
      codeAction: { type: 'DECLARE_CLASS', sourceLine: 1, className: 'Student' },
      worldAction: { type: 'SHOW_CLASS_BLUEPRINT', className: 'Student' },
      stage: 'class-loaded',
      callout: {
        type: 'concept',
        title: 'Class = Blueprint',
        message: 'A Class is a blueprint. It defines what data and behavior objects will have. No object exists yet.',
        messageUrdu: 'Class ek blueprint hai. Ye define karti hai ke objects mein kya data aur behavior hoga. Abhi koi object nahi hai.',
        expandable: true,
        expandedMessage: 'Think of a Class like an architect\'s blueprint. You can build many houses from one blueprint. Similarly, you can create many objects from one class.',
        expandedMessageUrdu: 'Class ko architect ke blueprint ki tarah sochein. Ek blueprint se aap kayi ghar bana sakte hain. Isi tarah, ek class se kayi objects bana sakte hain.',
      },
    },
    // ── STAGE 2: REFERENCE DECLARED (s1) ──
    {
      id: 2,
      codeLine: 14,
      description: 'We declare a variable "s1" that will reference a Student object.',
      descriptionUrdu: 'Hum ek variable "s1" declare karte hain jo Student object ko reference karega.',
      codeAction: { type: 'DECLARE_VARIABLE', sourceLine: 14, className: 'Student', variableName: 's1' },
      worldAction: { type: 'SHOW_INFO', message: 'Variable s1 declared — type: Student' },
      stage: 'reference-declared',
      callout: {
        type: 'what',
        title: 'Reference Variable',
        message: '"s1" is a reference variable. It will point to an object in memory. Right now, it is null — no object exists yet.',
        messageUrdu: '"s1" ek reference variable hai. Ye memory mein object ko point karega. Abhi ye null hai — abhi koi object nahi bana.',
      },
    },
    // ── STAGE 3: OBJECT CREATED (s1 = new Student) ──
    {
      id: 3,
      codeLine: 14,
      description: '"new" keyword creates a new Student object in heap memory.',
      descriptionUrdu: '"new" keyword heap memory mein naya Student object create karta hai.',
      codeAction: {
        type: 'CREATE_OBJECT',
        sourceLine: 14,
        className: 'Student',
        variableName: 's1',
        objectId: 'student-001',
      },
      worldAction: {
        type: 'SPAWN_OBJECT',
        objectId: 'student-001',
        className: 'Student',
        position: [-1.2, -0.15, 0.3],
      },
      stage: 'object-created',
      callout: {
        type: 'remember',
        title: 'new = Create Object',
        message: '"new" allocates memory and creates the actual object. The class is the blueprint — the object is the real thing.',
        messageUrdu: '"new" memory allocate karta hai aur actual object create karta hai. Class blueprint hai — object real cheez hai.',
      },
    },
    // ── STAGE 4: INITIALIZATION — name (s1) ──
    {
      id: 4,
      codeLine: 15,
      description: 'Set the name property on the object: name = "Ali".',
      descriptionUrdu: 'Object par name property set karte hain: name = "Ali".',
      codeAction: {
        type: 'SET_PROPERTY',
        sourceLine: 15,
        objectId: 'student-001',
        propertyName: 'name',
        propertyValue: '"Ali"',
      },
      worldAction: {
        type: 'UPDATE_PROPERTY',
        objectId: 'student-001',
        propertyName: 'name',
        propertyValue: '"Ali"',
      },
      stage: 'property-initialized',
      callout: {
        type: 'concept',
        title: 'Object State',
        message: 'The object now has state: name = "Ali". Each object maintains its own independent state.',
        messageUrdu: 'Ab object ki state hai: name = "Ali". Har object apni independent state maintain karta hai.',
      },
    },
    // ── STAGE 5: INITIALIZATION — age (s1) ──
    {
      id: 5,
      codeLine: 15,
      description: 'Set the age property: age = 20.',
      descriptionUrdu: 'Age property set karte hain: age = 20.',
      codeAction: {
        type: 'SET_PROPERTY',
        sourceLine: 15,
        objectId: 'student-001',
        propertyName: 'age',
        propertyValue: '20',
      },
      worldAction: {
        type: 'UPDATE_PROPERTY',
        objectId: 'student-001',
        propertyName: 'age',
        propertyValue: '20',
      },
      stage: 'property-initialized',
    },
    // ── STAGE 2 (repeat): REFERENCE DECLARED (s2) ──
    {
      id: 6,
      codeLine: 14,
      description: 'Declare a second reference variable "s2" for another Student.',
      descriptionUrdu: 'Doosra reference variable "s2" declare karte hain.',
      codeAction: { type: 'DECLARE_VARIABLE', sourceLine: 14, className: 'Student', variableName: 's2' },
      worldAction: { type: 'SHOW_INFO', message: 'Variable s2 declared — type: Student' },
      stage: 'reference-declared',
      callout: {
        type: 'tip',
        title: 'One Class, Many Objects',
        message: 'We can create as many objects as we want from the same class. Each is independent.',
        messageUrdu: 'Hum ek class se jitne chahein objects bana sakte hain. Har object independent hai.',
      },
    },
    // ── STAGE 3 (repeat): OBJECT CREATED (s2 = new Student) ──
    {
      id: 7,
      codeLine: 14,
      description: 'Create a second Student object using "new".',
      descriptionUrdu: '"new" se doosra Student object create karte hain.',
      codeAction: {
        type: 'CREATE_OBJECT',
        sourceLine: 14,
        className: 'Student',
        variableName: 's2',
        objectId: 'student-002',
      },
      worldAction: {
        type: 'SPAWN_OBJECT',
        objectId: 'student-002',
        className: 'Student',
        position: [0.0, -0.15, 0.3],
      },
      stage: 'object-created',
    },
    // ── STAGE 4 (repeat): INITIALIZATION — name (s2) ──
    {
      id: 8,
      codeLine: 15,
      description: 'Set name on second object: name = "Sara".',
      descriptionUrdu: 'Doosre object par name set karte hain: name = "Sara".',
      codeAction: {
        type: 'SET_PROPERTY',
        sourceLine: 15,
        objectId: 'student-002',
        propertyName: 'name',
        propertyValue: '"Sara"',
      },
      worldAction: {
        type: 'UPDATE_PROPERTY',
        objectId: 'student-002',
        propertyName: 'name',
        propertyValue: '"Sara"',
      },
      stage: 'property-initialized',
    },
    // ── STAGE 5 (repeat): INITIALIZATION — age (s2) ──
    {
      id: 9,
      codeLine: 15,
      description: 'Set age on second object: age = 21.',
      descriptionUrdu: 'Doosre object par age set karte hain: age = 21.',
      codeAction: {
        type: 'SET_PROPERTY',
        sourceLine: 15,
        objectId: 'student-002',
        propertyName: 'age',
        propertyValue: '21',
      },
      worldAction: {
        type: 'UPDATE_PROPERTY',
        objectId: 'student-002',
        propertyName: 'age',
        propertyValue: '21',
      },
      stage: 'property-initialized',
    },
    // ── STAGE 2 (repeat): REFERENCE DECLARED (s3) ──
    {
      id: 10,
      codeLine: 14,
      description: 'Declare a third reference variable "s3".',
      descriptionUrdu: 'Teesra reference variable "s3" declare karte hain.',
      codeAction: { type: 'DECLARE_VARIABLE', sourceLine: 14, className: 'Student', variableName: 's3' },
      worldAction: { type: 'SHOW_INFO', message: 'Variable s3 declared — type: Student' },
      stage: 'reference-declared',
    },
    // ── STAGE 3 (repeat): OBJECT CREATED (s3 = new Student) ──
    {
      id: 11,
      codeLine: 14,
      description: 'Create a third Student object.',
      descriptionUrdu: 'Teesra Student object create karte hain.',
      codeAction: {
        type: 'CREATE_OBJECT',
        sourceLine: 14,
        className: 'Student',
        variableName: 's3',
        objectId: 'student-003',
      },
      worldAction: {
        type: 'SPAWN_OBJECT',
        objectId: 'student-003',
        className: 'Student',
        position: [1.2, -0.15, 0.3],
      },
      stage: 'object-created',
    },
    // ── STAGE 4 (repeat): INITIALIZATION — name (s3) ──
    {
      id: 12,
      codeLine: 15,
      description: 'Set name on third object: name = "Ahmed".',
      descriptionUrdu: 'Teesre object par name set karte hain: name = "Ahmed".',
      codeAction: {
        type: 'SET_PROPERTY',
        sourceLine: 15,
        objectId: 'student-003',
        propertyName: 'name',
        propertyValue: '"Ahmed"',
      },
      worldAction: {
        type: 'UPDATE_PROPERTY',
        objectId: 'student-003',
        propertyName: 'name',
        propertyValue: '"Ahmed"',
      },
      stage: 'property-initialized',
    },
    // ── STAGE 5 (repeat): INITIALIZATION — age (s3) ──
    {
      id: 13,
      codeLine: 15,
      description: 'Set age on third object: age = 22.',
      descriptionUrdu: 'Teesre object par age set karte hain: age = 22.',
      codeAction: {
        type: 'SET_PROPERTY',
        sourceLine: 15,
        objectId: 'student-003',
        propertyName: 'age',
        propertyValue: '22',
      },
      worldAction: {
        type: 'UPDATE_PROPERTY',
        objectId: 'student-003',
        propertyName: 'age',
        propertyValue: '22',
      },
      stage: 'property-initialized',
    },
    // ── STAGE 6: METHOD CALL ──
    {
      id: 14,
      codeLine: 16,
      description: 'Call study() on s1 — this is object BEHAVIOR.',
      descriptionUrdu: 's1 par study() call karte hain — ye object ka BEHAVIOR hai.',
      codeAction: {
        type: 'CALL_METHOD',
        sourceLine: 16,
        objectId: 'student-001',
        methodName: 'study',
      },
      worldAction: {
        type: 'PLAY_METHOD_ANIMATION',
        objectId: 'student-001',
        methodName: 'study',
      },
      stage: 'method-called',
      callout: {
        type: 'concept',
        title: 'Object Behavior',
        message: 'Methods define what an object CAN DO. All 3 objects share the same class but have different state. The console shows the result.',
        messageUrdu: 'Methods define karte hain ke object KYA KAR SAKTA hai. Teeno objects ek class share karte hain lekin unki state alag hai. Console par result dikhai deta hai.',
      },
    },
  ];
}

// ─── Default Mission ────────────────────────────────────────
export function createDefaultMission(): Mission {
  return {
    id: 'mission-001',
    title: 'MISSION 01 \u2014 Change the Object State',
    titleUrdu: 'MISSION 01 \u2014 Object ki State Badlo',
    description: 'Create objects, inspect their state, call methods to change state, and compare objects.',
    descriptionUrdu: 'Objects banao, inspect karo, methods call karke state badlo, aur objects compare karo.',
    status: 'active',
    objectives: [
      {
        id: 'obj-001',
        description: 'Create first Student object (s1)',
        descriptionUrdu: 'Pehla Student object banao (s1)',
        completed: false,
        type: 'create-object',
        targetClassName: 'Student',
        targetCount: 1,
        currentCount: 0,
      },
      {
        id: 'obj-002',
        description: 'Create second Student object (s2)',
        descriptionUrdu: 'Doosra Student object banao (s2)',
        completed: false,
        type: 'create-object',
        targetClassName: 'Student',
        targetCount: 1,
        currentCount: 0,
      },
      {
        id: 'obj-003',
        description: 'Call submitAssignment() on s1',
        descriptionUrdu: 's1 par submitAssignment() call karo',
        completed: false,
        type: 'change-state',
        targetClassName: 'Student',
        targetCount: 1,
        currentCount: 0,
      },
      {
        id: 'obj-004',
        description: 'Observe assignmentsSubmitted increase',
        descriptionUrdu: 'Dekho assignmentsSubmitted barh gaya',
        completed: false,
        type: 'inspect-object',
        targetClassName: 'Student',
        targetCount: 1,
        currentCount: 0,
      },
      {
        id: 'obj-005',
        description: 'Compare s1 and s2 states',
        descriptionUrdu: 's1 aur s2 ki state compare karo',
        completed: false,
        type: 'compare-objects',
        targetClassName: 'Student',
        targetCount: 1,
        currentCount: 0,
      },
    ],
    xpReward: 60,
  };
}

// ─── World Identifiers ──────────────────────────────────────
export type WorldId = 'classes-objects' | 'constructors' | 'encapsulation' | 'inheritance' | 'polymorphism' | 'abstraction' | 'interfaces' | 'java-runtime' | 'packages' | 'exceptions' | 'collections' | 'architecture' | 'design-lab';

export interface WorldConfig {
  id: WorldId;
  title: string;
  titleUrdu: string;
  description: string;
  descriptionUrdu: string;
  difficulty: 'beginner' | 'easy' | 'medium' | 'hard';
  estimatedMinutes: number;
  xpReward: number;
  concept: string;
  conceptUrdu: string;
  moduleAssociation: string;
  sceneType: 'blueprint' | 'factory' | 'vault' | 'hierarchy' | 'arena' | 'control-center' | 'contract-lab' | 'runtime-lab' | 'package-city' | 'exception-flow' | 'collections-lab' | 'architecture-lab' | 'design-studio';
  initialClass: ClassBlueprint;
  initialSteps: ExecutionStep[];
  initialMission: Mission;
  environmentConfig: WorldEnvironmentConfig;
}

export interface WorldEnvironmentConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  floorColor: string;
  fogColor: string;
  ambientIntensity: number;
  showGrid: boolean;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
}
