import { useReducer, useState, useCallback, useEffect, useRef } from 'react';
import {
  OOPWorldState,
  ClassBlueprint,
  ObjectInstance,
  ObjectProperty,
  ConsoleEntry,
  ExecutionStep,
  LearningCallout,
  Mission,
  QualitySettings,
  QualityLevel,
  DEFAULT_STUDENT_CLASS,
  createDefaultSteps,
  createDefaultMission,
  getObjectColor,
  StateChangeEvent,
  ObjectComparison,
} from '../types/oopLab';
import { progressService } from '../services/progressService';

// ─── Action Types ──────────────────────────────────────────────
type WorldAction =
  | { type: 'INIT_WORLD'; payload: Partial<OOPWorldState> }
  | { type: 'SPAWN_OBJECT'; payload: ObjectInstance }
  | { type: 'REMOVE_OBJECT'; payload: string }
  | { type: 'SELECT_OBJECT'; payload: string | null }
  | { type: 'HOVER_OBJECT'; payload: string | null }
  | { type: 'SET_PROPERTY'; payload: { objectId: string; propertyName: string; value: string } }
  | { type: 'SET_VALUE'; payload: { objectId: string; propertyName: string; value: string } }
  | { type: 'ADD_CONSOLE_ENTRY'; payload: ConsoleEntry }
  | { type: 'CLEAR_CONSOLE' }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_PLAYING'; payload: boolean }
  | { type: 'SET_STEP_MODE'; payload: boolean }
  | { type: 'SET_MISSION'; payload: Mission | null }
  | { type: 'UPDATE_MISSION'; payload: { objectiveId: string; increment: number } }
  | { type: 'COMPLETE_MISSION' }
  | { type: 'SET_CALLOUT'; payload: LearningCallout | null }
  | { type: 'SET_LANGUAGE'; payload: 'english' | 'romanUrdu' }
  | { type: 'SET_QUALITY'; payload: Partial<QualitySettings> }
  | { type: 'SET_SHOW_INTRO'; payload: boolean }
  | { type: 'ADD_EXECUTION_STEP'; payload: ExecutionStep }
  | { type: 'RESET_WORLD' }
  | { type: 'SET_ACTIVE_PROPERTY'; payload: { objectId: string; propertyName: string } | null }
  | { type: 'SET_ACTIVE_METHOD'; payload: { methodName: string; objectId?: string } | null }
  | { type: 'SET_OBJECTIVE_TOAST'; payload: { objectiveId: string; message: string; xp?: number } | null }
  | { type: 'SET_ACTIVE_STAGE'; payload: import('../types/oopLab').ExecutionStage | null }
  | { type: 'ADD_STATE_HISTORY'; payload: StateChangeEvent }
  | { type: 'SET_LAST_EXECUTED_METHOD'; payload: { methodName: string; objectId: string; timestamp: number } | null }
  | { type: 'SET_CHANGED_PROPERTY'; payload: { objectId: string; propertyName: string; newValue: string } | null }
  | { type: 'SET_COMPARISON_IDS'; payload: { a: string | null; b: string | null } }
  | { type: 'UNDO_LAST_ACTION' };

// ─── Reducer ───────────────────────────────────────────────────
function worldReducer(state: OOPWorldState, action: WorldAction): OOPWorldState {
  switch (action.type) {
    case 'SPAWN_OBJECT':
      return { ...state, objects: [...state.objects, action.payload] };

    case 'REMOVE_OBJECT':
      return {
        ...state,
        objects: state.objects.filter((o) => o.id !== action.payload),
        selectedObjectId: state.selectedObjectId === action.payload ? null : state.selectedObjectId,
      };

    case 'SELECT_OBJECT':
      return {
        ...state,
        selectedObjectId: action.payload,
        objects: state.objects.map((o) => ({ ...o, isSelected: o.id === action.payload })),
      };

    case 'HOVER_OBJECT':
      return { ...state, hoveredObjectId: action.payload };

    case 'SET_PROPERTY':
    case 'SET_VALUE':
      return {
        ...state,
        objects: state.objects.map((o) =>
          o.id === action.payload.objectId
            ? {
                ...o,
                properties: o.properties.map((p) =>
                  p.name === action.payload.propertyName ? { ...p, value: action.payload.value } : p
                ),
              }
            : o
        ),
      };

    case 'ADD_CONSOLE_ENTRY':
      return { ...state, console: [...state.console, action.payload] };

    case 'CLEAR_CONSOLE':
      return {
        ...state,
        console: [{
          id: `clear-${Date.now()}`,
          type: 'info',
          message: 'Console cleared.',
          timestamp: Date.now(),
        }],
      };

    case 'SET_STEP':
      return { ...state, currentStep: action.payload };

    case 'SET_PLAYING':
      return { ...state, isPlaying: action.payload };

    case 'SET_STEP_MODE':
      return { ...state, isStepMode: action.payload };

    case 'SET_MISSION':
      return { ...state, mission: action.payload };

    case 'UPDATE_MISSION':
      if (!state.mission) return state;
      return {
        ...state,
        mission: {
          ...state.mission,
          objectives: state.mission.objectives.map((obj) =>
            obj.id === action.payload.objectiveId
              ? {
                  ...obj,
                  currentCount: Math.min(obj.currentCount + action.payload.increment, obj.targetCount ?? 1),
                  completed: obj.currentCount + action.payload.increment >= (obj.targetCount ?? 1),
                }
              : obj
          ),
        },
      };

    case 'COMPLETE_MISSION':
      if (!state.mission) return state;
      return { ...state, mission: { ...state.mission, status: 'completed' } };

    case 'SET_CALLOUT':
      return { ...state, activeCallout: action.payload };

    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };

    case 'SET_QUALITY':
      return { ...state, quality: { ...state.quality, ...action.payload } };

    case 'SET_SHOW_INTRO':
      return { ...state, showIntro: action.payload };

    case 'ADD_EXECUTION_STEP':
      return { ...state, executionHistory: [...state.executionHistory, action.payload] };

    case 'SET_ACTIVE_PROPERTY':
      return { ...state, activeProperty: action.payload };

    case 'SET_ACTIVE_METHOD':
      return { ...state, activeMethod: action.payload };

    case 'SET_ACTIVE_STAGE':
      return { ...state, activeStage: action.payload };

    case 'SET_OBJECTIVE_TOAST':
      return { ...state, objectiveToast: action.payload };

    case 'ADD_STATE_HISTORY':
      return { ...state, stateHistory: [...state.stateHistory, action.payload] };

    case 'SET_LAST_EXECUTED_METHOD':
      return { ...state, lastExecutedMethod: action.payload };

    case 'SET_CHANGED_PROPERTY':
      return { ...state, changedProperty: action.payload };

    case 'SET_COMPARISON_IDS':
      return { ...state, comparisonIds: action.payload };

    case 'UNDO_LAST_ACTION': {
      if (state.stateHistory.length === 0) return state;
      const lastEvent = state.stateHistory[state.stateHistory.length - 1];
      const undoObjects = state.objects.map((o) => {
        if (o.id === lastEvent.objectId) {
          return {
            ...o,
            properties: o.properties.map((p) => {
              const prev = lastEvent.previousState.find((s) => s.name === p.name);
              return prev ? { ...p, value: prev.value } : p;
            }),
          };
        }
        return o;
      });
      return {
        ...state,
        objects: undoObjects,
        stateHistory: state.stateHistory.slice(0, -1),
        lastExecutedMethod: null,
        changedProperty: null,
      };
    }

    case 'RESET_WORLD': {
      const introSeen = typeof window !== 'undefined' && localStorage.getItem('oop-lab-intro-seen') === 'true';
      const savedLang = (typeof window !== 'undefined' && (localStorage.getItem('oop-lab-lang') as 'english' | 'romanUrdu')) || 'english';
      const steps = createDefaultSteps();
      return {
        classes: [DEFAULT_STUDENT_CLASS],
        objects: [],
        selectedObjectId: null,
        console: [{
          id: 'welcome',
          type: 'info' as const,
          message: 'OOP Lab initialized. Ready to explore Java OOP.',
          timestamp: Date.now(),
        }],
        currentStep: 0,
        totalSteps: steps.length,
        isPlaying: false,
        isStepMode: false,
        mission: createDefaultMission(),
        activeCallout: null,
        isInitialized: true,
        showIntro: !introSeen,
        language: savedLang,
        quality: {
          level: 'auto' as QualityLevel,
          shadows: true,
          shadowQuality: 'medium' as 'off' | 'low' | 'medium' | 'high',
          antialiasing: true,
          pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
          maxLights: 8,
          environmentPreset: 'city',
        },
        hoveredObjectId: null,
        executionHistory: [],
        activeProperty: null,
        activeMethod: null,
        objectiveToast: null,
        activeStage: null,
        stateHistory: [],
        lastExecutedMethod: null,
        changedProperty: null,
        comparisonIds: { a: null, b: null },
      };
    }

    default:
      return state;
  }
}

// ─── Helpers ───────────────────────────────────────────────────
let objectCounter = 0;

function generateObjectId(className: string): string {
  objectCounter += 1;
  return `${className.toLowerCase()}-${String(objectCounter).padStart(3, '0')}`;
}

function calculatePosition(index: number): [number, number, number] {
  const spacing = 1.25;
  const startX = -1.25; // Center the 3 objects more tightly
  return [startX + index * spacing, 0.25, 1.2];
}

function createTimestampedEntry(type: ConsoleEntry['type'], message: string): ConsoleEntry {
  return { id: `console-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, type, message, timestamp: Date.now() };
}

// ─── Hook ──────────────────────────────────────────────────────
export function useOOPWorld(
  initialClass?: ClassBlueprint,
  initialSteps?: ExecutionStep[],
  initialMission?: Mission
) {
  const [state, dispatch] = useReducer(worldReducer, undefined, () => {
    const introSeen = typeof window !== 'undefined' && localStorage.getItem('oop-lab-intro-seen') === 'true';
    const savedLang = (typeof window !== 'undefined' && (localStorage.getItem('oop-lab-lang') as 'english' | 'romanUrdu')) || 'english';
    const steps = initialSteps || createDefaultSteps();

    return {
      classes: initialClass ? [initialClass] : [DEFAULT_STUDENT_CLASS],
      objects: [],
      selectedObjectId: null,
      console: [{
        id: 'welcome',
        type: 'info' as const,
        message: 'OOP Lab initialized. Ready to explore Java OOP.',
        timestamp: Date.now(),
      }],
      currentStep: 0,
      totalSteps: steps.length,
      isPlaying: false,
      isStepMode: false,
      mission: initialMission || createDefaultMission(),
      activeCallout: null,
      isInitialized: true,
      showIntro: !introSeen,
      language: savedLang,
      quality: {
        level: 'auto' as QualityLevel,
        shadows: true,
        shadowQuality: 'medium' as 'off' | 'low' | 'medium' | 'high',
        antialiasing: true,
        pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
        maxLights: 8,
        environmentPreset: 'city',
      },
      hoveredObjectId: null,
      executionHistory: [],
      activeProperty: null,
      activeMethod: null,
      objectiveToast: null,
      activeStage: null,
      stateHistory: [],
      lastExecutedMethod: null,
      changedProperty: null,
      comparisonIds: { a: null, b: null },
    };
  });

  const [steps] = useState<ExecutionStep[]>(initialSteps || createDefaultSteps());
  const playIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Persist language
  useEffect(() => {
    try { localStorage.setItem('oop-lab-lang', state.language); } catch { /* noop */ }
  }, [state.language]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, []);

  // ─── Class operations ──────────────────────────────────────
  const getClass = useCallback(
    (name: string): ClassBlueprint | undefined => state.classes.find((c) => c.name === name),
    [state.classes]
  );

  // ─── Object operations ─────────────────────────────────────
  const spawnObject = useCallback(
    (className: string, variableName: string, position?: [number, number, number], forcedId?: string): ObjectInstance | null => {
      const cls = state.classes.find((c) => c.name === className);
      if (!cls) return null;

      const id = forcedId || generateObjectId(className);
      // Derive index from the forcedId if available so color is predictable
      const objIndex = forcedId
        ? (parseInt(forcedId.split('-')[1] || '1', 10) - 1)
        : state.objects.length;
      const color = getObjectColor(objIndex);
      const pos = position || calculatePosition(state.objects.length);

      const properties: ObjectProperty[] = cls.properties.map((p) => ({
        name: p.name,
        type: p.type,
        value: p.value,
        accessModifier: p.accessModifier,
      }));

      const obj: ObjectInstance = {
        id, className, variableName, properties,
        position: pos,
        createdAt: Date.now(),
        isSelected: false,
        color,
      };

      dispatch({ type: 'SPAWN_OBJECT', payload: obj });
      return obj;
    },
    [state.classes, state.objects.length]
  );

  const removeObject = useCallback((objectId: string) => {
    dispatch({ type: 'REMOVE_OBJECT', payload: objectId });
    dispatch({ type: 'ADD_CONSOLE_ENTRY', payload: createTimestampedEntry('info', `Removed object ${objectId}`) });
  }, []);

  const selectObject = useCallback((objectId: string | null) => {
    dispatch({ type: 'SELECT_OBJECT', payload: objectId });
  }, []);

  const hoverObject = useCallback((objectId: string | null) => {
    dispatch({ type: 'HOVER_OBJECT', payload: objectId });
  }, []);

  const setPropertyValue = useCallback(
    (objectId: string, propertyName: string, value: string) => {
      dispatch({ type: 'SET_VALUE', payload: { objectId, propertyName, value } });
      const obj = state.objects.find((o) => o.id === objectId);
      if (obj) {
        dispatch({ type: 'ADD_CONSOLE_ENTRY', payload: createTimestampedEntry('output', `${obj.variableName}.${propertyName} = ${value}`) });
      }
    },
    [state.objects]
  );

  const getObjectsByClass = useCallback(
    (className: string): ObjectInstance[] => state.objects.filter((o) => o.className === className),
    [state.objects]
  );

  // ─── Method execution ──────────────────────────────────────
  const callMethod = useCallback(
    (objectId: string, methodName: string): ConsoleEntry | null => {
      const obj = state.objects.find((o) => o.id === objectId);
      if (!obj) return null;

      // [CALL] — identify the reference
      dispatch({ type: 'ADD_CONSOLE_ENTRY', payload: createTimestampedEntry('info', `[CALL] ${obj.variableName}.${methodName}()`) });
      // [OBJECT] — identify the object
      dispatch({ type: 'ADD_CONSOLE_ENTRY', payload: createTimestampedEntry('info', `[OBJECT] ${obj.className} #${obj.id.split('-').pop()} (state: ${obj.properties.map(p => `${p.name}=${p.value}`).join(', ')})`) });
      // [METHOD] — execute behavior
      dispatch({ type: 'ADD_CONSOLE_ENTRY', payload: createTimestampedEntry('info', `[METHOD] Executing ${methodName}() on ${obj.className}`) });

      // Capture previous state for history
      const previousState = obj.properties.map(p => ({ name: p.name, value: p.value }));

      let entry: ConsoleEntry;
      let changedPropName = '';
      let changedPropValue = '';
      let stateChanged = false;

      switch (methodName) {
        case 'submitAssignment': {
          const assignmentsProp = obj.properties.find((p) => p.name === 'assignmentsSubmitted');
          const currentVal = assignmentsProp ? parseInt(assignmentsProp.value, 10) || 0 : 0;
          const newVal = currentVal + 1;
          const newValStr = String(newVal);

          dispatch({ type: 'SET_VALUE', payload: { objectId, propertyName: 'assignmentsSubmitted', value: newValStr } });
          changedPropName = 'assignmentsSubmitted';
          changedPropValue = newValStr;
          stateChanged = true;

          const nameProp = obj.properties.find((p) => p.name === 'name');
          const displayName = nameProp?.value && nameProp.value !== '""' && nameProp.value !== '0'
            ? nameProp.value.replace(/"/g, '') : obj.variableName;

          dispatch({ type: 'ADD_CONSOLE_ENTRY', payload: createTimestampedEntry('output', `[STATE] assignmentsSubmitted: ${currentVal} \u2192 ${newVal}`) });
          entry = createTimestampedEntry('output', `[OK] ${obj.className} ${displayName} submitted assignment (#${newVal})`);
          break;
        }
        case 'attendClass': {
          const nameProp = obj.properties.find((p) => p.name === 'name');
          const displayName = nameProp?.value && nameProp.value !== '""' && nameProp.value !== '0'
            ? nameProp.value.replace(/"/g, '') : obj.variableName;
          entry = createTimestampedEntry('output', `[OK] ${obj.className} ${displayName} attended class`);
          break;
        }
        case 'study': {
          const nameProp = obj.properties.find((p) => p.name === 'name');
          const displayName = nameProp?.value && nameProp.value !== '""' && nameProp.value !== '0'
            ? nameProp.value.replace(/"/g, '') : obj.variableName;
          entry = createTimestampedEntry('output', `[OK] ${obj.className} ${displayName} is studying`);
          break;
        }
        case 'setInfo': {
          entry = createTimestampedEntry('info', `[OK] ${obj.variableName}.setInfo(...) called`);
          break;
        }
        default: {
          entry = createTimestampedEntry('output', `[OK] ${obj.variableName}.${methodName}() executed`);
          break;
        }
      }

      dispatch({ type: 'ADD_CONSOLE_ENTRY', payload: entry });

      // Set last executed method
      dispatch({ type: 'SET_LAST_EXECUTED_METHOD', payload: { methodName, objectId, timestamp: Date.now() } });

      // If state changed, record history and set changed property
      if (stateChanged) {
        const updatedObj = state.objects.find((o) => o.id === objectId);
        const updatedState = updatedObj
          ? updatedObj.properties.map(p => ({ name: p.name, value: p.name === changedPropName ? changedPropValue : p.value }))
          : previousState;

        const historyEvent: StateChangeEvent = {
          id: `state-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          sequenceNumber: state.stateHistory.length + 1,
          objectId,
          objectName: obj.variableName,
          methodName,
          previousState,
          updatedState,
          changedProperty: changedPropName,
          explanation: `${obj.variableName}.${methodName}() called \u2014 ${changedPropName} changed from ${previousState.find(p => p.name === changedPropName)?.value} to ${changedPropValue}.`,
          explanationUrdu: `${obj.variableName}.${methodName}() call hua \u2014 ${changedPropName} ${previousState.find(p => p.name === changedPropName)?.value} se ${changedPropValue} ho gaya.`,
          timestamp: Date.now(),
        };
        dispatch({ type: 'ADD_STATE_HISTORY', payload: historyEvent });
        dispatch({ type: 'SET_CHANGED_PROPERTY', payload: { objectId, propertyName: changedPropName, newValue: changedPropValue } });

        // Clear changed property highlight after 2s
        setTimeout(() => {
          dispatch({ type: 'SET_CHANGED_PROPERTY', payload: null });
        }, 2000);

        // Update mission progress for change-state objectives
        if (state.mission && state.mission.status === 'active') {
          for (const missionObj of state.mission.objectives) {
            if (missionObj.type === 'change-state' && !missionObj.completed && missionObj.targetClassName === obj.className) {
              dispatch({ type: 'UPDATE_MISSION', payload: { objectiveId: missionObj.id, increment: 1 } });
              break;
            }
          }
        }
      }

      // Update mission progress for call-method objectives
      if (state.mission && state.mission.status === 'active') {
        for (const missionObj of state.mission.objectives) {
          if (missionObj.type === 'call-method' && !missionObj.completed && missionObj.targetClassName === obj.className) {
            dispatch({ type: 'UPDATE_MISSION', payload: { objectiveId: missionObj.id, increment: 1 } });
            break;
          }
        }
      }

      return entry;
    },
    [state.objects, state.mission, state.stateHistory.length]
  );

  // ─── Step execution ────────────────────────────────────────
  const activePropTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeMethodTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const executeStep = useCallback(
    (step: ExecutionStep) => {
      dispatch({ type: 'ADD_EXECUTION_STEP', payload: step });

      // Set active stage for Current Action panel
      if (step.stage) {
        dispatch({ type: 'SET_ACTIVE_STAGE', payload: step.stage });
      }

      // Clear previous active highlights
      if (activePropTimerRef.current) clearTimeout(activePropTimerRef.current);
      if (activeMethodTimerRef.current) clearTimeout(activeMethodTimerRef.current);

      // Process the step action — each step produces exactly one console entry
      switch (step.codeAction.type) {
        case 'DECLARE_CLASS':
          dispatch({ type: 'ADD_CONSOLE_ENTRY', payload: createTimestampedEntry('info', `[EXEC] Class ${step.codeAction.className} loaded`) });
          break;
        case 'DECLARE_VARIABLE':
          dispatch({ type: 'ADD_CONSOLE_ENTRY', payload: createTimestampedEntry('info', `[EXEC] ${step.codeAction.variableName} declared — type: ${step.codeAction.className}`) });
          break;
        case 'CREATE_OBJECT':
          if (step.codeAction.className && step.codeAction.variableName) {
            const spawnPos = step.worldAction.type === 'SPAWN_OBJECT' ? step.worldAction.position : undefined;
            // Use the hardcoded objectId from worldAction if available
            const forcedId = step.worldAction.type === 'SPAWN_OBJECT' ? step.worldAction.objectId : undefined;
            const obj = spawnObject(step.codeAction.className, step.codeAction.variableName, spawnPos, forcedId);
            if (obj) {
              const num = obj.id.split('-')[1];
              dispatch({ type: 'ADD_CONSOLE_ENTRY', payload: createTimestampedEntry('success', `[OK] ${step.codeAction.className} #${num} created`) });
            }
          }
          break;
        case 'SET_PROPERTY':
          if (step.codeAction.objectId && step.codeAction.propertyName && step.codeAction.propertyValue) {
            setPropertyValue(step.codeAction.objectId, step.codeAction.propertyName, step.codeAction.propertyValue);
            dispatch({ type: 'SET_ACTIVE_PROPERTY', payload: { objectId: step.codeAction.objectId, propertyName: step.codeAction.propertyName } });
            dispatch({ type: 'ADD_CONSOLE_ENTRY', payload: createTimestampedEntry('output', `[EXEC] ${step.codeAction.propertyName} = ${step.codeAction.propertyValue}`) });
            activePropTimerRef.current = setTimeout(() => {
              dispatch({ type: 'SET_ACTIVE_PROPERTY', payload: null });
            }, 1200);
          }
          break;
        case 'CALL_METHOD':
          if (step.codeAction.objectId && step.codeAction.methodName) {
            dispatch({ type: 'SET_ACTIVE_METHOD', payload: { methodName: step.codeAction.methodName, objectId: step.codeAction.objectId } });
            // Chain: identify reference -> identify object -> call method -> show result
            setTimeout(() => {
              dispatch({ type: 'ADD_CONSOLE_ENTRY', payload: createTimestampedEntry('info', `[CALL] Reference identified for ${step.codeAction.methodName}()`) });
            }, 300);
            setTimeout(() => {
              callMethod(step.codeAction.objectId!, step.codeAction.methodName!);
            }, 600);
            activeMethodTimerRef.current = setTimeout(() => {
              dispatch({ type: 'SET_ACTIVE_METHOD', payload: null });
            }, 2500);
          }
          break;
        default:
          break;
      }

      if (step.callout) {
        dispatch({ type: 'SET_CALLOUT', payload: step.callout });
      }
    },
    [spawnObject, setPropertyValue, callMethod]
  );

  const stepsCompletedRef = useRef(false);
  const missionCheckedRef = useRef(false);
  const currentStepRef = useRef(state.currentStep);
  // Keep a ref to latest executeStep so setInterval never captures stale closure
  const executeStepRef = useRef(executeStep);
  useEffect(() => { executeStepRef.current = executeStep; }, [executeStep]);
  useEffect(() => {
    currentStepRef.current = state.currentStep;
  }, [state.currentStep]);

  // ─── Step navigation ───────────────────────────────────────
  const nextStep = useCallback(() => {
    const nextIndex = state.currentStep + 1;
    if (nextIndex >= steps.length) {
      dispatch({ type: 'SET_STEP', payload: steps.length });
      if (!stepsCompletedRef.current) {
        stepsCompletedRef.current = true;
        dispatch({ type: 'ADD_CONSOLE_ENTRY', payload: createTimestampedEntry('success', 'All steps completed!') });
      }
      return;
    }
    dispatch({ type: 'SET_STEP', payload: nextIndex });
    const step = steps[nextIndex];
    if (step) executeStepRef.current(step);
  }, [state.currentStep, steps, executeStep]);

  const prevStep = useCallback(() => {
    const prevIndex = Math.max(state.currentStep - 1, 0);
    dispatch({ type: 'SET_STEP', payload: prevIndex });
  }, [state.currentStep]);

  // ─── Play / Run ────────────────────────────────────────────
  const togglePlay = useCallback(() => {
    if (state.isPlaying) {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
        playIntervalRef.current = null;
      }
      dispatch({ type: 'SET_PLAYING', payload: false });
      return;
    }

    dispatch({ type: 'SET_PLAYING', payload: true });
    dispatch({ type: 'SET_STEP_MODE', payload: true });

    // If at start, execute step 0 first and dispatch SET_STEP(0)
    if (currentStepRef.current === 0 && steps.length > 0) {
      dispatch({ type: 'SET_STEP', payload: 0 });
      executeStepRef.current(steps[0]);
    }

    playIntervalRef.current = setInterval(() => {
      const nextIndex = currentStepRef.current + 1;
      if (nextIndex >= steps.length) {
        if (playIntervalRef.current) clearInterval(playIntervalRef.current);
        playIntervalRef.current = null;
        dispatch({ type: 'SET_STEP', payload: steps.length });
        dispatch({ type: 'SET_PLAYING', payload: false });
        if (!stepsCompletedRef.current) {
          stepsCompletedRef.current = true;
          dispatch({ type: 'ADD_CONSOLE_ENTRY', payload: createTimestampedEntry('success', 'All steps executed.') });
        }
        return;
      }
      dispatch({ type: 'SET_STEP', payload: nextIndex });
      const step = steps[nextIndex];
      if (step) executeStepRef.current(step);
    }, 1800);
  }, [state.isPlaying, steps, executeStep]);

  const stopPlayback = useCallback(() => {
    if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current);
      playIntervalRef.current = null;
    }
    dispatch({ type: 'SET_PLAYING', payload: false });
    dispatch({ type: 'SET_STEP_MODE', payload: false });
  }, []);

  // ─── Execute all (Run button) ──────────────────────────────
  const executeAllSteps = useCallback(() => {
    if (state.isPlaying) {
      stopPlayback();
      return;
    }
    // Reset to step 0 first if at end
    if (currentStepRef.current >= steps.length) {
      objectCounter = 0;
      stepsCompletedRef.current = false;
      dispatch({ type: 'RESET_WORLD' });
      setTimeout(() => {
        dispatch({ type: 'SET_PLAYING', payload: true });
        dispatch({ type: 'SET_STEP_MODE', payload: true });
        dispatch({ type: 'SET_STEP', payload: 0 });
        if (steps.length > 0) executeStepRef.current(steps[0]);
        let idx = 0;
        if (playIntervalRef.current) clearInterval(playIntervalRef.current);
        playIntervalRef.current = setInterval(() => {
          idx += 1;
          if (idx >= steps.length) {
            if (playIntervalRef.current) clearInterval(playIntervalRef.current);
            playIntervalRef.current = null;
            dispatch({ type: 'SET_STEP', payload: steps.length });
            dispatch({ type: 'SET_PLAYING', payload: false });
            stepsCompletedRef.current = true;
            dispatch({ type: 'ADD_CONSOLE_ENTRY', payload: createTimestampedEntry('success', 'All steps executed.') });
            return;
          }
          dispatch({ type: 'SET_STEP', payload: idx });
          const step = steps[idx];
          if (step) executeStepRef.current(step);
        }, 1800);
      }, 50);
      return;
    }
    dispatch({ type: 'SET_PLAYING', payload: true });
    dispatch({ type: 'SET_STEP_MODE', payload: true });
    playIntervalRef.current = setInterval(() => {
      const nextIndex = currentStepRef.current + 1;
      if (nextIndex >= steps.length) {
        if (playIntervalRef.current) clearInterval(playIntervalRef.current);
        playIntervalRef.current = null;
        dispatch({ type: 'SET_STEP', payload: steps.length });
        dispatch({ type: 'SET_PLAYING', payload: false });
        stepsCompletedRef.current = true;
        dispatch({ type: 'ADD_CONSOLE_ENTRY', payload: createTimestampedEntry('success', 'All steps executed.') });
        return;
      }
      dispatch({ type: 'SET_STEP', payload: nextIndex });
      const step = steps[nextIndex];
      if (step) executeStepRef.current(step);
    }, 1800);
  }, [state.isPlaying, steps, executeStep, stopPlayback]);

  // ─── Console ───────────────────────────────────────────────
  const addConsoleEntry = useCallback((type: ConsoleEntry['type'], message: string) => {
    dispatch({ type: 'ADD_CONSOLE_ENTRY', payload: createTimestampedEntry(type, message) });
  }, []);

  const clearConsole = useCallback(() => {
    dispatch({ type: 'CLEAR_CONSOLE' });
  }, []);

  // ─── Callouts ──────────────────────────────────────────────
  const showCallout = useCallback((callout: LearningCallout) => {
    dispatch({ type: 'SET_CALLOUT', payload: callout });
  }, []);

  const dismissCallout = useCallback(() => {
    dispatch({ type: 'SET_CALLOUT', payload: null });
  }, []);

  // ─── Mission ───────────────────────────────────────────────
  const updateMissionProgress = useCallback(
    (objectiveId: string, increment = 1) => {
      dispatch({ type: 'UPDATE_MISSION', payload: { objectiveId, increment } });
    },
    []
  );

  const checkMissionCompletion = useCallback((): boolean => {
    if (!state.mission) return false;
    const allCompleted = state.mission.objectives.every((o) => o.completed);
    if (allCompleted && state.mission.status === 'active') {
      dispatch({ type: 'COMPLETE_MISSION' });

      const missionKey = `mission-xp-${state.mission.id}`;
      let alreadyAwarded = false;
      try { alreadyAwarded = localStorage.getItem(missionKey) === 'true'; } catch { /* noop */ }

      if (!alreadyAwarded) {
        try { localStorage.setItem(missionKey, 'true'); } catch { /* noop */ }
        progressService.addXp(state.mission.xpReward);
        progressService.recordActivity('3d', `3D Mission: ${state.mission.title}`, state.mission.xpReward);
      }

      dispatch({
        type: 'ADD_CONSOLE_ENTRY',
        payload: createTimestampedEntry(
          'success',
          alreadyAwarded
            ? `Mission completed! (${state.mission.xpReward} XP previously earned)`
            : `Mission completed! +${state.mission.xpReward} XP earned.`
        ),
      });

      dispatch({
        type: 'SET_CALLOUT',
        payload: {
          type: 'tip',
          title: 'Mission Complete!',
          message: alreadyAwarded
            ? `Mission completed! You earned ${state.mission.xpReward} XP.`
            : `Congratulations! You earned ${state.mission.xpReward} XP. All objectives achieved.`,
          messageUrdu: `Mubarak ho! Aap ne ${state.mission.xpReward} XP kamaya. Sab objectives poore ho gaye.`,
        },
      });
      return true;
    }
    return allCompleted;
  }, [state.mission]);

  // ─── Language ──────────────────────────────────────────────
  const setLanguage = useCallback((lang: 'english' | 'romanUrdu') => {
    dispatch({ type: 'SET_LANGUAGE', payload: lang });
  }, []);

  const toggleLanguage = useCallback(() => {
    const next = state.language === 'english' ? 'romanUrdu' : 'english';
    dispatch({ type: 'SET_LANGUAGE', payload: next });
  }, [state.language]);

  // ─── Quality ───────────────────────────────────────────────
  const setQuality = useCallback((settings: Partial<QualitySettings>) => {
    dispatch({ type: 'SET_QUALITY', payload: settings });
  }, []);

  // ─── Init / Intro ──────────────────────────────────────────
  const completeIntro = useCallback(() => {
    dispatch({ type: 'SET_SHOW_INTRO', payload: false });
    try { localStorage.setItem('oop-lab-intro-seen', 'true'); } catch { /* noop */ }
  }, []);

  const resetWorld = useCallback(() => {
    objectCounter = 0;
    stepsCompletedRef.current = false;
    missionCheckedRef.current = false;
    if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current);
      playIntervalRef.current = null;
    }
    dispatch({ type: 'RESET_WORLD' });
  }, []);

  // ─── Code execution ────────────────────────────────────────
  const executeCodeLine = useCallback(
    (line: number) => {
      const step = steps.find((s) => s.codeLine === line);
      if (step) {
        executeStep(step);
      } else {
        dispatch({ type: 'ADD_CONSOLE_ENTRY', payload: createTimestampedEntry('error', `No action mapped for line ${line}`) });
      }
    },
    [steps, executeStep]
  );

  // ─── Mission reconciliation ────────────────────────────────
  useEffect(() => {
    if (!state.mission || state.mission.status !== 'active') return;

    let cumulativeByClass = new Map<string, number>();
    for (const obj of state.mission.objectives) {
      if (obj.type === 'create-object' && obj.targetClassName) {
        const prev = cumulativeByClass.get(obj.targetClassName) || 0;
        cumulativeByClass.set(obj.targetClassName, prev + 1);

        const requiredCount = prev + 1;
        const actualCount = state.objects.filter((o) => o.className === obj.targetClassName).length;

        if (!obj.completed && actualCount >= requiredCount) {
          dispatch({ type: 'UPDATE_MISSION', payload: { objectiveId: obj.id, increment: 1 } });
          const toastMsg = state.language === 'romanUrdu'
            ? `${obj.descriptionUrdu} — Mukammal!`
            : `${obj.description} — Complete!`;
          dispatch({ type: 'SET_OBJECTIVE_TOAST', payload: { objectiveId: obj.id, message: toastMsg } });
          setTimeout(() => dispatch({ type: 'SET_OBJECTIVE_TOAST', payload: null }), 2500);
        }
      }
    }
  }, [state.objects, state.mission, state.language]);

  useEffect(() => {
    if (state.mission && state.mission.status === 'active' && !missionCheckedRef.current) {
      const allCompleted = state.mission.objectives.every((o) => o.completed);
      if (allCompleted) {
        missionCheckedRef.current = true;
        checkMissionCompletion();
      }
    }
    if (state.mission && state.mission.status === 'completed') {
      missionCheckedRef.current = true;
    }
  }, [state.mission, checkMissionCompletion]);

  useEffect(() => {
    if (state.currentStep === 0 && state.objects.length === 0) {
      missionCheckedRef.current = false;
    }
  }, [state.currentStep, state.objects.length]);

  const dismissObjectiveToast = useCallback(() => {
    dispatch({ type: 'SET_OBJECTIVE_TOAST', payload: null });
  }, []);

  // ─── Undo ──────────────────────────────────────────────────
  const undoLastAction = useCallback(() => {
    dispatch({ type: 'UNDO_LAST_ACTION' });
    dispatch({ type: 'ADD_CONSOLE_ENTRY', payload: createTimestampedEntry('info', 'Undo: Reverted last state change.') });
  }, []);

  // ─── Comparison ────────────────────────────────────────────
  const setComparisonIds = useCallback((a: string | null, b: string | null) => {
    dispatch({ type: 'SET_COMPARISON_IDS', payload: { a, b } });
  }, []);

  const getComparison = useCallback((): ObjectComparison | null => {
    if (!state.comparisonIds.a || !state.comparisonIds.b) return null;
    const objA = state.objects.find((o) => o.id === state.comparisonIds.a);
    const objB = state.objects.find((o) => o.id === state.comparisonIds.b);
    if (!objA || !objB) return null;

    const snapshotA = {
      objectId: objA.id,
      variableName: objA.variableName,
      className: objA.className,
      properties: objA.properties.map(p => ({ name: p.name, type: p.type, value: p.value })),
      timestamp: Date.now(),
    };
    const snapshotB = {
      objectId: objB.id,
      variableName: objB.variableName,
      className: objB.className,
      properties: objB.properties.map(p => ({ name: p.name, type: p.type, value: p.value })),
      timestamp: Date.now(),
    };

    const differences: { property: string; valueA: string; valueB: string }[] = [];
    for (const propA of snapshotA.properties) {
      const propB = snapshotB.properties.find(p => p.name === propA.name);
      if (propB && propA.value !== propB.value) {
        differences.push({ property: propA.name, valueA: propA.value, valueB: propB.value });
      }
    }

    const allSame = differences.length === 0;

    return {
      objectA: snapshotA,
      objectB: snapshotB,
      differences,
      explanation: allSame
        ? `Both ${objA.variableName} and ${objB.variableName} have identical state. They are still separate objects from the same class.`
        : `${objA.variableName} and ${objB.variableName} have different state: ${differences.map(d => `${d.property}: ${d.valueA} vs ${d.valueB}`).join(', ')}. Same class, different objects, different state.`,
      explanationUrdu: allSame
        ? `${objA.variableName} aur ${objB.variableName} ki state same hai. Ye phir bhi alag objects hain ek hi class se.`
        : `${objA.variableName} aur ${objB.variableName} ki state alag hai: ${differences.map(d => `${d.property}: ${d.valueA} banam ${d.valueB}`).join(', ')}. Same class, alag objects, alag state.`,
    };
  }, [state.objects, state.comparisonIds]);

  // Track comparison objective
  useEffect(() => {
    if (state.comparisonIds.a && state.comparisonIds.b && state.mission && state.mission.status === 'active') {
      for (const missionObj of state.mission.objectives) {
        if (missionObj.type === 'compare-objects' && !missionObj.completed) {
          dispatch({ type: 'UPDATE_MISSION', payload: { objectiveId: missionObj.id, increment: 1 } });
          break;
        }
      }
    }
  }, [state.comparisonIds.a, state.comparisonIds.b, state.mission]);

  // Track inspect-object objective (when object is selected)
  useEffect(() => {
    if (state.selectedObjectId && state.mission && state.mission.status === 'active') {
      const obj = state.objects.find(o => o.id === state.selectedObjectId);
      if (obj) {
        for (const missionObj of state.mission.objectives) {
          if (missionObj.type === 'inspect-object' && !missionObj.completed && missionObj.targetClassName === obj.className) {
            dispatch({ type: 'UPDATE_MISSION', payload: { objectiveId: missionObj.id, increment: 1 } });
            break;
          }
        }
      }
    }
  }, [state.selectedObjectId, state.objects, state.mission]);

  return {
    state,
    getClass,
    spawnObject, removeObject, selectObject, hoverObject, setPropertyValue, getObjectsByClass,
    callMethod,
    startStepMode: useCallback(() => {
      dispatch({ type: 'SET_STEP_MODE', payload: true });
      dispatch({ type: 'SET_STEP', payload: 0 });
      const firstStep = steps[0];
      if (firstStep) executeStep(firstStep);
    }, [steps, executeStep]),
    nextStep, prevStep, togglePlay, stopPlayback,
    addConsoleEntry, clearConsole,
    showCallout, dismissCallout,
    updateMissionProgress, checkMissionCompletion,
    setLanguage, toggleLanguage,
    setQuality,
    completeIntro, resetWorld,
    executeCodeLine, executeAllSteps,
    dismissObjectiveToast,
    undoLastAction,
    setComparisonIds,
    getComparison,
  };
}

export default useOOPWorld;
