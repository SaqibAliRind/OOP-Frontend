import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { UserProgress } from '@/types';

const PROGRESS_KEY = 'oop-universe-progress';

type ProgressModule = typeof import('@/services/progressService');

async function loadFreshService(seed?: string): Promise<import('@/services/progressService').progressService> {
  vi.resetModules();
  localStorage.clear();
  if (seed !== undefined) {
    localStorage.setItem(PROGRESS_KEY, seed);
  }
  const mod: ProgressModule = await import('@/services/progressService');
  return mod.progressService;
}

function emptyProgressSeed(): string {
  return JSON.stringify({
    userId: 'student-001',
    totalXp: 0,
    level: 1,
    xpToNextLevel: 100,
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: new Date().toISOString(),
    completedLessons: {},
    completedModules: {},
    unlockedAchievements: {},
    quizScores: {},
    challengeScores: {},
    debugChallengeScores: {},
    practiceScores: {},
    moduleMastery: {},
    conceptMastery: {},
    lessonProgress: {},
    xpHistory: [],
    comboState: {
      currentStreak: 0,
      longestStreak: 0,
      lastActivityType: '',
      lastActivityTime: new Date().toISOString(),
    },
    weakTopics: {},
  });
}

describe('progressService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('creates default progress when storage is empty (no mock XP leak)', async () => {
    const service = await loadFreshService();
    const progress: UserProgress = service.getProgress();
    expect(progress.totalXp).toBe(0);
    expect(progress.level).toBe(1);
    expect(progress.xpToNextLevel).toBe(100);
    expect(progress.currentStreak).toBe(0);
    expect(Object.keys(progress.completedLessons)).toHaveLength(0);
    expect(Object.keys(progress.unlockedAchievements)).toHaveLength(0);
    expect(progress.xpHistory).toHaveLength(0);
  });

  it('returns defaults for invalid JSON in storage', async () => {
    const service = await loadFreshService('{not-valid-json');
    expect(service.getTotalXp()).toBe(0);
    expect(service.getLevel()).toBe(1);
  });

  it('returns defaults for non-object JSON (array / string / null)', async () => {
    const asArray = await loadFreshService('[1,2,3]');
    expect(asArray.getTotalXp()).toBe(0);

    const asString = await loadFreshService('"hello"');
    expect(asString.getTotalXp()).toBe(0);

    const asNull = await loadFreshService('null');
    expect(asNull.getTotalXp()).toBe(0);
  });

  it('clamps negative and non-finite numeric fields on load', async () => {
    const seed = JSON.stringify({
      totalXp: -50,
      level: 0,
      xpToNextLevel: -10,
      currentStreak: Number.NaN,
      longestStreak: -3,
      completedLessons: 'not-an-object',
      moduleMastery: { 'module-01': -5, 'module-02': 80, 'module-03': 'bad' },
    });
    const service = await loadFreshService(seed);
    const p = service.getProgress();
    expect(p.totalXp).toBe(0);
    expect(p.level).toBe(1);
    expect(p.xpToNextLevel).toBe(100);
    expect(p.currentStreak).toBe(0);
    expect(p.longestStreak).toBe(0);
    expect(p.completedLessons).toEqual({});
    expect(p.moduleMastery).toEqual({ 'module-02': 80 });
  });

  it('loads valid stored progress including lesson records', async () => {
    const seed = JSON.stringify({
      ...JSON.parse(emptyProgressSeed()),
      totalXp: 250,
      level: 3,
      xpToNextLevel: 300,
      completedLessons: {
        'lesson-01-01': {
          completedAt: '2026-09-01T00:00:00.000Z',
          masteryScore: 90,
          xpEarned: 50,
        },
      },
    });
    const service = await loadFreshService(seed);
    expect(service.getTotalXp()).toBe(250);
    expect(service.getLevel()).toBe(3);
    expect(service.getProgress().completedLessons['lesson-01-01'].masteryScore).toBe(90);
    expect(service.getProgress().completedLessons['lesson-01-01'].completedAt).toBeInstanceOf(Date);
  });

  it('addXp awards XP and levels up across thresholds', async () => {
    const service = await loadFreshService(emptyProgressSeed());
    const result = service.addXp(150);
    expect(result.leveledUp).toBe(true);
    expect(result.newLevel).toBe(2);
    expect(service.getProgress().level).toBe(2);
    expect(service.getProgress().totalXp).toBe(50);
  });

  it('addXp ignores non-positive and non-finite amounts', async () => {
    const service = await loadFreshService(emptyProgressSeed());
    expect(service.addXp(0).leveledUp).toBe(false);
    expect(service.addXp(-10).leveledUp).toBe(false);
    expect(service.addXp(Number.NaN).leveledUp).toBe(false);
    expect(service.addXp(Number.POSITIVE_INFINITY).leveledUp).toBe(false);
    expect(service.getTotalXp()).toBe(0);
  });

  it('completeLesson awards XP only on first completion', async () => {
    const service = await loadFreshService(emptyProgressSeed());
    service.completeLesson('lesson-01-01', 85, 50);

    // lesson XP + first-lesson achievement can cross the level threshold;
    // assert progress advanced rather than a raw totalXp floor.
    const progressAfterFirst = service.getProgress();
    expect(progressAfterFirst.completedLessons['lesson-01-01']).toBeDefined();
    expect(progressAfterFirst.level + progressAfterFirst.totalXp).toBeGreaterThan(1);
    const levelAfter = progressAfterFirst.level;
    const xpAfter = progressAfterFirst.totalXp;
    const lessonCountAfter = Object.keys(progressAfterFirst.completedLessons).length;

    service.completeLesson('lesson-01-01', 100, 999);
    expect(service.getProgress().level).toBe(levelAfter);
    expect(service.getTotalXp()).toBe(xpAfter);
    expect(Object.keys(service.getProgress().completedLessons)).toHaveLength(lessonCountAfter);
    expect(service.getProgress().completedLessons['lesson-01-01'].masteryScore).toBe(100);
  });

  it('completeLesson unlocks first-lesson achievement', async () => {
    const service = await loadFreshService(emptyProgressSeed());
    service.completeLesson('lesson-01-01', 80, 50);
    const unlocked = service.getUnlockedAchievements();
    expect(unlocked.some(a => a.id === 'first-lesson')).toBe(true);
  });

  it('resetProgress restores defaults and persists them', async () => {
    const service = await loadFreshService(emptyProgressSeed());
    service.addXp(500);
    service.completeLesson('lesson-01-01', 90, 50);
    expect(service.getTotalXp()).toBeGreaterThan(0);

    service.resetProgress();
    expect(service.getTotalXp()).toBe(0);
    expect(service.getLevel()).toBe(1);
    expect(Object.keys(service.getProgress().completedLessons)).toHaveLength(0);
    expect(Object.keys(service.getProgress().unlockedAchievements)).toHaveLength(0);

    const stored = JSON.parse(localStorage.getItem(PROGRESS_KEY)!);
    expect(stored.totalXp).toBe(0);
  });

  it('recordQuizScore tracks attempts and best score', async () => {
    const service = await loadFreshService(emptyProgressSeed());
    service.recordQuizScore('quiz-1', 70);
    service.recordQuizScore('quiz-1', 90);
    service.recordQuizScore('quiz-1', 50);

    const scores = service.getProgress().quizScores;
    expect(scores['quiz-1'].attempts).toBe(3);
    expect(scores['quiz-1'].score).toBe(50);
    expect(scores['quiz-1'].bestScore).toBe(90);
  });

  it('recordQuizScore unlocks perfect-score achievement at 100', async () => {
    const service = await loadFreshService(emptyProgressSeed());
    service.recordQuizScore('quiz-perfect', 100);
    expect(service.getUnlockedAchievements().some(a => a.id === 'perfect-quiz')).toBe(true);
  });

  it('recordWeakTopic tracks failures and clears on success', async () => {
    const service = await loadFreshService(emptyProgressSeed());
    service.recordWeakTopic('inheritance', true);
    service.recordWeakTopic('inheritance', true);
    let weak = service.getWeakTopics();
    expect(weak).toHaveLength(1);
    expect(weak[0].failedAttempts).toBe(2);

    service.recordWeakTopic('inheritance', false);
    weak = service.getWeakTopics();
    expect(weak).toHaveLength(0);
  });

  it('awardXpWithCombo applies combo bonus and records history', async () => {
    const service = await loadFreshService(emptyProgressSeed());
    const first = service.awardXpWithCombo('quick-check');
    expect(first.amount).toBe(10);
    expect(first.newStreak).toBe(1);
    // streak 1 => 5% bonus, Math.round(0.5) => 1
    expect(first.comboBonus).toBe(1);
    expect(first.total).toBe(first.amount + first.comboBonus);

    const second = service.awardXpWithCombo('scenario');
    expect(second.amount).toBe(20);
    expect(second.newStreak).toBe(2);
    // streak 2 => 10% bonus
    expect(second.comboBonus).toBe(2);
    expect(second.total).toBe(22);
    expect(service.getProgress().xpHistory).toHaveLength(2);
    expect(service.getCombo().currentStreak).toBe(2);
    expect(service.getCombo().longestStreak).toBe(2);
  });

  it('getExamStats aggregates quiz scores', async () => {
    const service = await loadFreshService(emptyProgressSeed());
    expect(service.getExamStats()).toEqual({
      totalExams: 0,
      averageScore: 0,
      bestScore: 0,
      questionsSolved: 0,
    });

    service.recordQuizScore('a', 80);
    service.recordQuizScore('b', 60);
    const stats = service.getExamStats();
    expect(stats.totalExams).toBe(2);
    expect(stats.averageScore).toBe(70);
    expect(stats.bestScore).toBe(80);
  });
});
