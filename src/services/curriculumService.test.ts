import { describe, it, expect, beforeEach, vi } from 'vitest';
import { curriculumService } from '@/services/curriculumService';
import type { UserProgress } from '@/types';

function makeProgress(overrides: Partial<UserProgress> = {}): UserProgress {
  return {
    userId: 'student-001',
    totalXp: 0,
    level: 1,
    xpToNextLevel: 100,
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: new Date(),
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
      lastActiveDate: undefined as unknown as Date,
      lastActivityTime: new Date(),
    } as UserProgress['comboState'],
    weakTopics: {},
    ...overrides,
  };
}

describe('curriculumService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns the full curriculum', () => {
    const curriculum = curriculumService.getCurriculum();
    expect(curriculum.modules.length).toBeGreaterThan(0);
    expect(curriculum.totalLessons).toBeGreaterThan(0);
  });

  it('retrieves a valid module by id', () => {
    const module = curriculumService.getModule('module-01');
    expect(module).toBeDefined();
    expect(module?.id).toBe('module-01');
    expect(module?.lessons.length).toBeGreaterThan(0);
  });

  it('returns undefined for invalid module id', () => {
    expect(curriculumService.getModule('module-999')).toBeUndefined();
    expect(curriculumService.getModule('')).toBeUndefined();
  });

  it('retrieves a valid lesson by id across modules', () => {
    const lesson = curriculumService.getLesson('lesson-01-01');
    expect(lesson).toBeDefined();
    expect(lesson?.id).toBe('lesson-01-01');
    expect(lesson?.moduleId).toBe('module-01');
  });

  it('returns undefined for invalid lesson id', () => {
    expect(curriculumService.getLesson('lesson-99-99')).toBeUndefined();
    expect(curriculumService.getLesson('')).toBeUndefined();
  });

  it('returns lessons for a module and empty array for unknown module', () => {
    const lessons = curriculumService.getModuleLessons('module-01');
    expect(lessons.length).toBeGreaterThan(0);
    expect(lessons.every(l => l.moduleId === 'module-01')).toBe(true);
    expect(curriculumService.getModuleLessons('nope')).toEqual([]);
  });

  it('finds next lesson within a module', () => {
    const module = curriculumService.getModule('module-01')!;
    const first = module.lessons[0];
    const second = module.lessons[1];
    expect(curriculumService.getNextLesson(first.id)?.id).toBe(second.id);
  });

  it('finds next lesson across module boundary', () => {
    const module = curriculumService.getModule('module-01')!;
    const lastInModule = module.lessons[module.lessons.length - 1];
    const next = curriculumService.getNextLesson(lastInModule.id);
    expect(next).toBeDefined();
    expect(next?.moduleId).toBe('module-02');
    expect(next?.id).toBe('lesson-02-01');
  });

  it('returns undefined for next lesson after final lesson', () => {
    const modules = curriculumService.getCurriculum().modules;
    const lastModule = modules[modules.length - 1];
    const lastLesson = lastModule.lessons[lastModule.lessons.length - 1];
    expect(curriculumService.getNextLesson(lastLesson.id)).toBeUndefined();
    expect(curriculumService.getNextLesson('unknown-id')).toBeUndefined();
  });

  it('finds previous lesson within and across modules', () => {
    const module = curriculumService.getModule('module-02')!;
    const second = module.lessons[1];
    expect(curriculumService.getPreviousLesson(second.id)?.id).toBe(module.lessons[0].id);

    const firstInModule = module.lessons[0];
    const prev = curriculumService.getPreviousLesson(firstInModule.id);
    expect(prev).toBeDefined();
    expect(prev?.moduleId).toBe('module-01');

    expect(curriculumService.getPreviousLesson('lesson-01-01')).toBeUndefined();
    expect(curriculumService.getPreviousLesson('unknown')).toBeUndefined();
  });

  it('unlocks module-01 always and locks module-02 until prerequisites met', () => {
    const empty = makeProgress();
    expect(curriculumService.isModuleUnlocked('module-01', empty)).toBe(true);
    expect(curriculumService.isModuleUnlocked('module-02', empty)).toBe(false);

    const module01 = curriculumService.getModule('module-01')!;
    const completedLessons = Object.fromEntries(
      module01.lessons.map(l => [l.id, { completedAt: new Date(), masteryScore: 80, xpEarned: 50 }])
    );
    const progressed = makeProgress({ completedLessons });
    expect(curriculumService.isModuleUnlocked('module-02', progressed)).toBe(true);
  });

  it('returns false for unknown module unlock check', () => {
    expect(curriculumService.isModuleUnlocked('module-999', makeProgress())).toBe(false);
  });

  it('unlocks lessons based on prerequisites', () => {
    const empty = makeProgress();
    const lesson = curriculumService.getLesson('lesson-02-01');
    expect(lesson).toBeDefined();

    if (lesson && lesson.prerequisites.length > 0) {
      expect(curriculumService.isLessonUnlocked(lesson.id, empty)).toBe(false);
      const completedLessons = Object.fromEntries(
        lesson.prerequisites.map(id => [id, { completedAt: new Date(), masteryScore: 90, xpEarned: 50 }])
      );
      expect(curriculumService.isLessonUnlocked(lesson.id, makeProgress({ completedLessons }))).toBe(true);
    } else {
      expect(curriculumService.isLessonUnlocked('lesson-01-01', empty)).toBe(true);
    }

    expect(curriculumService.isLessonUnlocked('lesson-01-01', empty)).toBe(true);
    expect(curriculumService.isLessonUnlocked('unknown-lesson', empty)).toBe(false);
  });

  it('computes module progress percentage', () => {
    const module = curriculumService.getModule('module-01')!;
    const empty = makeProgress();
    expect(curriculumService.getModuleProgress('module-01', empty)).toBe(0);

    const half = module.lessons.slice(0, Math.ceil(module.lessons.length / 2));
    const completedLessons = Object.fromEntries(
      half.map(l => [l.id, { completedAt: new Date(), masteryScore: 70, xpEarned: 40 }])
    );
    const partial = curriculumService.getModuleProgress('module-01', makeProgress({ completedLessons }));
    expect(partial).toBeGreaterThan(0);
    expect(partial).toBeLessThan(100);

    const all = Object.fromEntries(
      module.lessons.map(l => [l.id, { completedAt: new Date(), masteryScore: 100, xpEarned: 50 }])
    );
    expect(curriculumService.getModuleProgress('module-01', makeProgress({ completedLessons: all }))).toBe(100);
    expect(curriculumService.getModuleProgress('module-999', empty)).toBe(0);
  });

  it('computes total progress percentage', () => {
    const empty = makeProgress();
    expect(curriculumService.getTotalProgress(empty)).toBe(0);

    const first = curriculumService.getLesson('lesson-01-01')!;
    const completedLessons = {
      [first.id]: { completedAt: new Date(), masteryScore: 80, xpEarned: 50 },
    };
    const partial = curriculumService.getTotalProgress(makeProgress({ completedLessons }));
    expect(partial).toBeGreaterThan(0);
    expect(partial).toBeLessThanOrEqual(100);
  });

  it('returns learning paths', () => {
    const paths = curriculumService.getLearningPaths();
    expect(paths.length).toBeGreaterThan(0);
    expect(curriculumService.getLearningPath('beginner-path')).toBeDefined();
    expect(curriculumService.getLearningPath('missing-path')).toBeUndefined();
  });
});
