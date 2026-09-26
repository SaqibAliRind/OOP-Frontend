import { useReducer, useCallback, useRef } from 'react';
import type {
  RelationshipNode,
  RelationshipEdge,
  RelationshipLabState,
  RelationshipLabAction,
  RelationshipType,
  RelationshipObjective,
} from '@/types/relationshipLab';
import { DEFAULT_MISSION } from '@/data/relationshipLabData';
import { progressService } from '@/services/progressService';

interface RelationshipLabConfig {
  nodes: RelationshipNode[];
  edges: RelationshipEdge[];
}

function reducer(state: RelationshipLabState, action: RelationshipLabAction): RelationshipLabState {
  switch (action.type) {
    case 'SELECT_NODE':
      return {
        ...state,
        activeNodeId: action.payload as string,
        activeEdgeId: null,
      };
    case 'SELECT_EDGE':
      return {
        ...state,
        activeEdgeId: action.payload as string,
        activeNodeId: null,
      };
    case 'DESELECT':
      return { ...state, activeNodeId: null, activeEdgeId: null };
    case 'SET_MODE':
      return { ...state, mode: action.payload as 'explore' | 'build' | 'quiz' };
    case 'COMPLETE_OBJECTIVE': {
      const objId = action.payload as string;
      const objectives = state.mission.objectives.map((o) =>
        o.id === objId ? { ...o, completed: true } : o
      );
      return { ...state, mission: { ...state.mission, objectives } };
    }
    case 'SET_BUILD_SOURCE':
      return { ...state, buildSource: action.payload as string | null };
    case 'SET_BUILD_TARGET':
      return { ...state, buildTarget: action.payload as string | null };
    case 'SET_BUILD_TYPE':
      return { ...state, buildType: action.payload as RelationshipType | null };
    case 'CREATE_RELATIONSHIP':
      return { ...state, buildSource: null, buildTarget: null, buildType: null };
    case 'RESET_BUILD':
      return { ...state, buildSource: null, buildTarget: null, buildType: null };
    case 'ANSWER_CHALLENGE': {
      const { challengeId, answerId } = action.payload as { challengeId: string; answerId: string };
      return {
        ...state,
        challengeAnswers: { ...state.challengeAnswers, [challengeId]: answerId },
      };
    }
    case 'SET_COMPARISON':
      return { ...state, showComparison: action.payload as 'is-a' | 'has-a' };
    case 'ADD_HISTORY': {
      const entry = action.payload as { action: string; timestamp: number };
      return { ...state, history: [...state.history, entry] };
    }
    case 'DETACH_EDGE':
      return state;
    case 'RESET':
      return createInitialState();
    default:
      return state;
  }
}

function createInitialState(): RelationshipLabState {
  return {
    activeNodeId: null,
    activeEdgeId: null,
    selectedNodes: [],
    mode: 'explore',
    mission: structuredClone(DEFAULT_MISSION),
    missionProgress: {},
    buildSource: null,
    buildTarget: null,
    buildType: null,
    challengeIndex: 0,
    challengeAnswers: {},
    showComparison: 'is-a',
    history: [],
  };
}

function missionXpStorageKey(missionId: string): string {
  return `oop-universe:mission-xp:${missionId}`;
}

function hasMissionXp(missionId: string): boolean {
  try {
    return localStorage.getItem(missionXpStorageKey(missionId)) === 'true';
  } catch {
    return false;
  }
}

function markMissionXp(missionId: string): void {
  try {
    localStorage.setItem(missionXpStorageKey(missionId), 'true');
  } catch { /* noop */ }
}

export function useRelationshipLab(_config: RelationshipLabConfig) {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);
  const missionXpKey = useRef<Set<string>>(new Set());

  const selectNode = useCallback((id: string) => {
    dispatch({ type: 'SELECT_NODE', payload: id });
    dispatch({ type: 'ADD_HISTORY', payload: { action: `Selected node: ${id}`, timestamp: Date.now() } });
  }, []);

  const selectEdge = useCallback((id: string) => {
    dispatch({ type: 'SELECT_EDGE', payload: id });
    dispatch({ type: 'ADD_HISTORY', payload: { action: `Selected edge: ${id}`, timestamp: Date.now() } });
  }, []);

  const deselect = useCallback(() => {
    dispatch({ type: 'DESELECT' });
  }, []);

  const setMode = useCallback((mode: 'explore' | 'build' | 'quiz') => {
    dispatch({ type: 'SET_MODE', payload: mode });
  }, []);

  const completeObjective = useCallback((objId: string) => {
    const obj = state.mission.objectives.find((o) => o.id === objId);
    if (!obj || obj.completed) return;
    dispatch({ type: 'COMPLETE_OBJECTIVE', payload: objId });
    dispatch({ type: 'ADD_HISTORY', payload: { action: `Objective completed: ${obj.description}`, timestamp: Date.now() } });

    const allCompleted = state.mission.objectives.every((o) => o.completed || o.id === objId);
    if (allCompleted && !missionXpKey.current.has(state.mission.id) && !hasMissionXp(state.mission.id)) {
      missionXpKey.current.add(state.mission.id);
      markMissionXp(state.mission.id);
      try {
        progressService.addXp(state.mission.xpReward);
        progressService.recordActivity('3d', `Completed mission: ${state.mission.title}`, state.mission.xpReward);
      } catch { /* noop */ }
    }
  }, [state.mission]);

  const setBuildSource = useCallback((id: string | null) => {
    dispatch({ type: 'SET_BUILD_SOURCE', payload: id });
  }, []);

  const setBuildTarget = useCallback((id: string | null) => {
    dispatch({ type: 'SET_BUILD_TARGET', payload: id });
  }, []);

  const setBuildType = useCallback((type: RelationshipType | null) => {
    dispatch({ type: 'SET_BUILD_TYPE', payload: type });
  }, []);

  const createRelationship = useCallback(() => {
    dispatch({ type: 'CREATE_RELATIONSHIP' });
    dispatch({ type: 'ADD_HISTORY', payload: { action: 'Created relationship', timestamp: Date.now() } });
  }, []);

  const resetBuild = useCallback(() => {
    dispatch({ type: 'RESET_BUILD' });
  }, []);

  const answerChallenge = useCallback((challengeId: string, answerId: string) => {
    dispatch({ type: 'ANSWER_CHALLENGE', payload: { challengeId, answerId } });
  }, []);

  const setComparison = useCallback((mode: 'is-a' | 'has-a') => {
    dispatch({ type: 'SET_COMPARISON', payload: mode });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const objectiveStatus = useCallback((obj: RelationshipObjective): boolean => {
    return obj.completed;
  }, []);

  return {
    state,
    selectNode,
    selectEdge,
    deselect,
    setMode,
    completeObjective,
    setBuildSource,
    setBuildTarget,
    setBuildType,
    createRelationship,
    resetBuild,
    answerChallenge,
    setComparison,
    reset,
    objectiveStatus,
  };
}
