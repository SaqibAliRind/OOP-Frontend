import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRelationshipLab } from '@/hooks/useRelationshipLab';
import { DEFAULT_MISSION } from '@/data/relationshipLabData';

const MISSION_XP_KEY = `oop-universe:mission-xp:${DEFAULT_MISSION.id}`;

describe('useRelationshipLab (pure state logic)', () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('starts in explore mode with default mission', () => {
    const { result } = renderHook(() => useRelationshipLab({ nodes: [], edges: [] }));
    expect(result.current.state.mode).toBe('explore');
    expect(result.current.state.mission.id).toBe(DEFAULT_MISSION.id);
    expect(result.current.state.activeNodeId).toBeNull();
    expect(result.current.state.activeEdgeId).toBeNull();
    expect(result.current.state.history).toHaveLength(0);
  });

  it('select node clears active edge and vice versa', () => {
    const { result } = renderHook(() => useRelationshipLab({ nodes: [], edges: [] }));

    act(() => {
      result.current.selectNode('node-1');
    });
    expect(result.current.state.activeNodeId).toBe('node-1');
    expect(result.current.state.activeEdgeId).toBeNull();

    act(() => {
      result.current.selectEdge('edge-1');
    });
    expect(result.current.state.activeNodeId).toBeNull();
    expect(result.current.state.activeEdgeId).toBe('edge-1');

    act(() => {
      result.current.deselect();
    });
    expect(result.current.state.activeNodeId).toBeNull();
    expect(result.current.state.activeEdgeId).toBeNull();
  });

  it('setMode switches explore/build/quiz', () => {
    const { result } = renderHook(() => useRelationshipLab({ nodes: [], edges: [] }));

    act(() => {
      result.current.setMode('build');
    });
    expect(result.current.state.mode).toBe('build');

    act(() => {
      result.current.setMode('quiz');
    });
    expect(result.current.state.mode).toBe('quiz');
  });

  it('completes objectives and ignores unknown ids', () => {
    const { result } = renderHook(() => useRelationshipLab({ nodes: [], edges: [] }));
    const first = result.current.state.mission.objectives[0];
    expect(first).toBeDefined();

    act(() => {
      result.current.completeObjective('missing-objective');
    });
    expect(result.current.state.history).toHaveLength(0);

    act(() => {
      result.current.completeObjective(first.id);
    });
    const completed = result.current.state.mission.objectives.find(o => o.id === first.id);
    expect(completed?.completed).toBe(true);
    expect(result.current.objectiveStatus(completed!)).toBe(true);
    expect(result.current.state.history.length).toBeGreaterThan(0);
  });

  it('build flow creates relationship and resets build fields', () => {
    const { result } = renderHook(() => useRelationshipLab({ nodes: [], edges: [] }));

    act(() => {
      result.current.setBuildSource('a');
      result.current.setBuildTarget('b');
      result.current.setBuildType('association');
    });
    expect(result.current.state.buildSource).toBe('a');
    expect(result.current.state.buildTarget).toBe('b');
    expect(result.current.state.buildType).toBe('association');

    act(() => {
      result.current.createRelationship();
    });
    expect(result.current.state.buildSource).toBeNull();
    expect(result.current.state.buildTarget).toBeNull();
    expect(result.current.state.buildType).toBeNull();
    expect(result.current.state.history.some(h => h.action === 'Created relationship')).toBe(true);
  });

  it('resetBuild clears partial build selection only', () => {
    const { result } = renderHook(() => useRelationshipLab({ nodes: [], edges: [] }));

    act(() => {
      result.current.setBuildSource('a');
      result.current.setMode('build');
      result.current.resetBuild();
    });
    expect(result.current.state.buildSource).toBeNull();
    expect(result.current.state.mode).toBe('build');
  });

  it('awards mission XP once when all objectives complete', () => {
    const { result } = renderHook(() => useRelationshipLab({ nodes: [], edges: [] }));
    const ids = result.current.state.mission.objectives.map(o => o.id);
    expect(ids.length).toBeGreaterThan(1);

    for (const id of ids) {
      act(() => {
        result.current.completeObjective(id);
      });
    }

    expect(localStorage.getItem(MISSION_XP_KEY)).toBe('true');
    expect(result.current.state.mission.objectives.every(o => o.completed)).toBe(true);
  });

  it('invalid action with missing build fields is a no-op for creation', () => {
    const { result } = renderHook(() => useRelationshipLab({ nodes: [], edges: [] }));
    act(() => {
      result.current.createRelationship();
    });
    expect(result.current.state.buildSource).toBeNull();
    expect(result.current.state.history.some(h => h.action === 'Created relationship')).toBe(true);
  });

  it('reset restores initial state', () => {
    const { result } = renderHook(() => useRelationshipLab({ nodes: [], edges: [] }));

    act(() => {
      result.current.setMode('quiz');
      result.current.selectNode('x');
      result.current.completeObjective(result.current.state.mission.objectives[0].id);
      result.current.reset();
    });

    expect(result.current.state.mode).toBe('explore');
    expect(result.current.state.activeNodeId).toBeNull();
    expect(result.current.state.mission.objectives.every(o => !o.completed)).toBe(true);
    expect(result.current.state.history).toHaveLength(0);
  });
});
