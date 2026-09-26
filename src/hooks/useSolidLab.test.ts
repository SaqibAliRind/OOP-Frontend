import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSolidLab } from '@/hooks/useSolidLab';
import { DEFAULT_SOLID_MISSION } from '@/data/solidLabData';

const MISSION_XP_KEY = `oop-universe:mission-xp:${DEFAULT_SOLID_MISSION.id}`;
const PROGRESS_KEY = 'oop-universe-progress';

describe('useSolidLab (pure state logic)', () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('starts with the default mission and no completed objectives', async () => {
    const { result } = renderHook(() => useSolidLab());
    expect(result.current.state.mission.id).toBe(DEFAULT_SOLID_MISSION.id);
    expect(result.current.state.mission.objectives.every(o => !o.completed)).toBe(true);
    expect(result.current.state.activePrinciple).toBe('coupling-cohesion');
    expect(result.current.state.history).toHaveLength(0);
  });

  it('completes a valid objective and records history', async () => {
    const { result } = renderHook(() => useSolidLab());

    act(() => {
      result.current.completeObjective('obj-1');
    });

    const obj1 = result.current.state.mission.objectives.find(o => o.id === 'obj-1');
    expect(obj1?.completed).toBe(true);
    expect(result.current.state.history.length).toBeGreaterThan(0);
    expect(result.current.state.history.some(h => h.action.includes('Objective completed'))).toBe(true);
  });

  it('ignores unknown objective ids', async () => {
    const { result } = renderHook(() => useSolidLab());

    act(() => {
      result.current.completeObjective('does-not-exist');
    });

    expect(result.current.state.mission.objectives.every(o => !o.completed)).toBe(true);
    expect(result.current.state.history).toHaveLength(0);
  });

  it('does not double-complete an already completed objective', async () => {
    const { result } = renderHook(() => useSolidLab());

    act(() => {
      result.current.completeObjective('obj-1');
    });
    const historyAfterFirst = result.current.state.history.length;
    const completedCountAfterFirst = result.current.state.mission.objectives.filter(o => o.completed).length;

    act(() => {
      result.current.completeObjective('obj-1');
    });

    const completedCount = result.current.state.mission.objectives.filter(o => o.completed).length;
    expect(completedCount).toBe(completedCountAfterFirst);
    expect(result.current.state.history.length).toBe(historyAfterFirst);
  });

  it('awards mission XP once when all objectives complete, then dedupes', async () => {
    const { result } = renderHook(() => useSolidLab());
    const objectiveIds = result.current.state.mission.objectives.map(o => o.id);
    expect(objectiveIds.length).toBeGreaterThan(1);

    for (const id of objectiveIds) {
      act(() => {
        result.current.completeObjective(id);
      });
    }

    expect(result.current.state.mission.objectives.every(o => o.completed)).toBe(true);
    expect(localStorage.getItem(MISSION_XP_KEY)).toBe('true');

    // addXp(150) may level up (level 2 with leftover 50); assert advancement, not raw totalXp.
    const progressAfterFirst = JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? '{}');
    expect(progressAfterFirst.level ?? 1).toBeGreaterThanOrEqual(2);
    const snapshotAfterFirst = {
      level: progressAfterFirst.level,
      totalXp: progressAfterFirst.totalXp,
    };
    expect(snapshotAfterFirst.level).toBeGreaterThan(1);

    // Reset mission completion state but keep the storage flag, then complete again.
    act(() => {
      result.current.reset();
    });
    expect(result.current.state.mission.objectives.every(o => !o.completed)).toBe(true);

    for (const id of objectiveIds) {
      act(() => {
        result.current.completeObjective(id);
      });
    }

    const progressAfterSecond = JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? '{}');
    expect(progressAfterSecond.level).toBe(snapshotAfterFirst.level);
    expect(progressAfterSecond.totalXp).toBe(snapshotAfterFirst.totalXp);
  });

  it('reset restores initial state', async () => {
    const { result } = renderHook(() => useSolidLab());

    act(() => {
      result.current.selectNode('node-a');
      result.current.completeObjective('obj-1');
      result.current.setPrinciple('srp');
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.state.activePrinciple).toBe('coupling-cohesion');
    expect(result.current.state.selectedNodeId).toBeNull();
    expect(result.current.state.mission.objectives.every(o => !o.completed)).toBe(true);
    expect(result.current.state.history).toHaveLength(0);
  });

  it('select/deselect node and edge maintain mutual exclusivity', async () => {
    const { result } = renderHook(() => useSolidLab());

    act(() => {
      result.current.selectNode('n1');
    });
    expect(result.current.state.selectedNodeId).toBe('n1');
    expect(result.current.state.selectedEdgeId).toBeNull();

    act(() => {
      result.current.selectEdge('e1');
    });
    expect(result.current.state.selectedNodeId).toBeNull();
    expect(result.current.state.selectedEdgeId).toBe('e1');

    act(() => {
      result.current.deselect();
    });
    expect(result.current.state.selectedNodeId).toBeNull();
    expect(result.current.state.selectedEdgeId).toBeNull();
  });

  it('toggleBeforeAfter flips showAfter', async () => {
    const { result } = renderHook(() => useSolidLab());
    expect(result.current.state.showAfter).toBe(false);

    act(() => {
      result.current.toggleBeforeAfter();
    });
    expect(result.current.state.showAfter).toBe(true);

    act(() => {
      result.current.toggleBeforeAfter();
    });
    expect(result.current.state.showAfter).toBe(false);
  });
});
