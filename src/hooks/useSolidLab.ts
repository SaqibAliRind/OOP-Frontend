import { useReducer, useCallback, useRef } from 'react';
import type { SolidPrinciple, SolidLabState } from '@/types/solidLab';
import { DEFAULT_SOLID_MISSION } from '@/data/solidLabData';
import { progressService } from '@/services/progressService';

type Action =
  | { type: 'SET_PRINCIPLE'; payload: SolidPrinciple }
  | { type: 'TOGGLE_BEFORE_AFTER' }
  | { type: 'SELECT_NODE'; payload: string }
  | { type: 'SELECT_EDGE'; payload: string }
  | { type: 'DESELECT' }
  | { type: 'COMPLETE_OBJECTIVE'; payload: string }
  | { type: 'ANSWER_CHALLENGE'; payload: { challengeId: string; answerId: string } }
  | { type: 'REVEAL_MISTAKE'; payload: string }
  | { type: 'ADD_HISTORY'; payload: { action: string; timestamp: number } }
  | { type: 'RESET' };

function reducer(state: SolidLabState, action: Action): SolidLabState {
  switch (action.type) {
    case 'SET_PRINCIPLE':
      return { ...state, activePrinciple: action.payload, showAfter: false, selectedNodeId: null, selectedEdgeId: null };
    case 'TOGGLE_BEFORE_AFTER':
      return { ...state, showAfter: !state.showAfter, selectedNodeId: null, selectedEdgeId: null };
    case 'SELECT_NODE':
      return { ...state, selectedNodeId: action.payload, selectedEdgeId: null };
    case 'SELECT_EDGE':
      return { ...state, selectedEdgeId: action.payload, selectedNodeId: null };
    case 'DESELECT':
      return { ...state, selectedNodeId: null, selectedEdgeId: null };
    case 'COMPLETE_OBJECTIVE': {
      const objId = action.payload;
      const objectives = state.mission.objectives.map((o) =>
        o.id === objId ? { ...o, completed: true } : o
      );
      return { ...state, mission: { ...state.mission, objectives } };
    }
    case 'ANSWER_CHALLENGE': {
      const { challengeId, answerId } = action.payload;
      return { ...state, challengeAnswers: { ...state.challengeAnswers, [challengeId]: answerId } };
    }
    case 'REVEAL_MISTAKE': {
      const newSet = new Set(state.revealedMistakes);
      newSet.add(action.payload);
      return { ...state, revealedMistakes: newSet };
    }
    case 'ADD_HISTORY':
      return { ...state, history: [...state.history, action.payload] };
    case 'RESET':
      return createInitialState();
    default:
      return state;
  }
}

function createInitialState(): SolidLabState {
  return {
    activePrinciple: 'coupling-cohesion',
    showAfter: false,
    selectedNodeId: null,
    selectedEdgeId: null,
    mission: structuredClone(DEFAULT_SOLID_MISSION),
    challengeAnswers: {},
    challengeIndex: 0,
    revealedMistakes: new Set(),
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

export function useSolidLab() {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);
  const missionXpKey = useRef<Set<string>>(new Set());

  const setPrinciple = useCallback((p: SolidPrinciple) => {
    dispatch({ type: 'SET_PRINCIPLE', payload: p });
    dispatch({ type: 'ADD_HISTORY', payload: { action: `Switched to ${p.toUpperCase()}`, timestamp: Date.now() } });
  }, []);

  const toggleBeforeAfter = useCallback(() => {
    dispatch({ type: 'TOGGLE_BEFORE_AFTER' });
    dispatch({ type: 'ADD_HISTORY', payload: { action: state.showAfter ? 'Viewing BEFORE design' : 'Viewing AFTER design', timestamp: Date.now() } });
  }, [state.showAfter]);

  const selectNode = useCallback((id: string) => {
    dispatch({ type: 'SELECT_NODE', payload: id });
  }, []);

  const selectEdge = useCallback((id: string) => {
    dispatch({ type: 'SELECT_EDGE', payload: id });
  }, []);

  const deselect = useCallback(() => {
    dispatch({ type: 'DESELECT' });
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

  const answerChallenge = useCallback((challengeId: string, answerId: string) => {
    dispatch({ type: 'ANSWER_CHALLENGE', payload: { challengeId, answerId } });
  }, []);

  const revealMistake = useCallback((mistakeId: string) => {
    dispatch({ type: 'REVEAL_MISTAKE', payload: mistakeId });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return {
    state,
    setPrinciple,
    toggleBeforeAfter,
    selectNode,
    selectEdge,
    deselect,
    completeObjective,
    answerChallenge,
    revealMistake,
    reset,
  };
}
