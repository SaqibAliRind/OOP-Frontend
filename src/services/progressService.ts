import type { UserProgress, Achievement, XpRewardEvent, ComboState, WeakTopic, LearningActivity } from '@/types';
import { mockAchievements } from '@/data/progress';
import { gamificationService } from './gamificationService';
import { curriculumService } from './curriculumService';
import { isPlainObject, safeParseJSON } from '@/utils/safeStorage';

const DEFAULT_COMBO: ComboState = { currentStreak: 0, longestStreak: 0, lastActivityType: '', lastActivityTime: new Date() };

function createDefaultProgress(): UserProgress {
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
    comboState: { ...DEFAULT_COMBO },
    weakTopics: {},
  };
}

function finiteNonNeg(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : fallback;
}

function finiteAtLeastOne(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 1 ? value : fallback;
}

class ProgressService {
  private progress: UserProgress;
  private achievements: Achievement[];
  private storageKey = 'oop-universe-progress';

  constructor() {
    this.progress = this.loadProgress();
    this.achievements = mockAchievements;
  }

  private loadProgress(): UserProgress {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = safeParseJSON<unknown>(stored, null);
        if (!isPlainObject(parsed)) {
          return createDefaultProgress();
        }
        const base = createDefaultProgress();
        const lessonProgress = isPlainObject(parsed.lessonProgress)
          ? (parsed.lessonProgress as UserProgress['lessonProgress'])
          : {};
        const comboRaw = isPlainObject(parsed.comboState) ? parsed.comboState : null;
        let lastActive: Date;
        try {
          const d = new Date(parsed.lastActiveDate as string);
          lastActive = Number.isNaN(d.getTime()) ? new Date() : d;
        } catch {
          lastActive = new Date();
        }
        return {
          ...base,
          userId: typeof parsed.userId === 'string' && parsed.userId ? parsed.userId : base.userId,
          totalXp: finiteNonNeg(parsed.totalXp, 0),
          level: finiteAtLeastOne(parsed.level, 1),
          xpToNextLevel: finiteAtLeastOne(parsed.xpToNextLevel, 100),
          currentStreak: finiteNonNeg(parsed.currentStreak, 0),
          longestStreak: finiteNonNeg(parsed.longestStreak, 0),
          lastActiveDate: lastActive,
          completedLessons: isPlainObject(parsed.completedLessons)
            ? Object.fromEntries(
                Object.entries(parsed.completedLessons).map(([k, v]: [string, unknown]) => {
                  if (!isPlainObject(v)) return [k, { completedAt: new Date(), masteryScore: 0, xpEarned: 0 }];
                  let completedAt: Date;
                  try {
                    const d = new Date(v.completedAt as string);
                    completedAt = Number.isNaN(d.getTime()) ? new Date() : d;
                  } catch {
                    completedAt = new Date();
                  }
                  return [k, {
                    completedAt,
                    masteryScore: finiteNonNeg(v.masteryScore, 0),
                    xpEarned: finiteNonNeg(v.xpEarned, 0),
                  }];
                })
              )
            : {},
          completedModules: isPlainObject(parsed.completedModules)
            ? Object.fromEntries(
                Object.entries(parsed.completedModules).map(([k, v]: [string, unknown]) => {
                  if (!isPlainObject(v)) return [k, { completedAt: new Date(), xpEarned: 0 }];
                  let completedAt: Date;
                  try {
                    const d = new Date(v.completedAt as string);
                    completedAt = Number.isNaN(d.getTime()) ? new Date() : d;
                  } catch {
                    completedAt = new Date();
                  }
                  return [k, { completedAt, xpEarned: finiteNonNeg(v.xpEarned, 0) }];
                })
              )
            : {},
          unlockedAchievements: isPlainObject(parsed.unlockedAchievements)
            ? Object.fromEntries(
                Object.entries(parsed.unlockedAchievements).map(([k, v]: [string, unknown]) => {
                  if (!isPlainObject(v)) return [k, { unlockedAt: new Date() }];
                  let unlockedAt: Date;
                  try {
                    const d = new Date(v.unlockedAt as string);
                    unlockedAt = Number.isNaN(d.getTime()) ? new Date() : d;
                  } catch {
                    unlockedAt = new Date();
                  }
                  return [k, { unlockedAt }];
                })
              )
            : {},
          quizScores: isPlainObject(parsed.quizScores) ? (parsed.quizScores as UserProgress['quizScores']) : {},
          challengeScores: isPlainObject(parsed.challengeScores) ? (parsed.challengeScores as UserProgress['challengeScores']) : {},
          debugChallengeScores: isPlainObject(parsed.debugChallengeScores)
            ? (parsed.debugChallengeScores as UserProgress['debugChallengeScores'])
            : {},
          practiceScores: isPlainObject(parsed.practiceScores) ? (parsed.practiceScores as UserProgress['practiceScores']) : {},
          moduleMastery: isPlainObject(parsed.moduleMastery)
            ? Object.fromEntries(
                Object.entries(parsed.moduleMastery)
                  .filter(([, v]) => typeof v === 'number' && Number.isFinite(v) && v >= 0)
                  .map(([k, v]) => [k, v as number])
              ) as UserProgress['moduleMastery']
            : {},
          conceptMastery: isPlainObject(parsed.conceptMastery)
            ? Object.fromEntries(
                Object.entries(parsed.conceptMastery)
                  .filter(([, v]) => typeof v === 'number' && Number.isFinite(v) && v >= 0)
                  .map(([k, v]) => [k, v as number])
              ) as UserProgress['conceptMastery']
            : {},
          lessonProgress,
          xpHistory: Array.isArray(parsed.xpHistory)
            ? (parsed.xpHistory as XpRewardEvent[]).map(e => ({
                ...e,
                timestamp: e.timestamp instanceof Date ? e.timestamp : new Date(e.timestamp),
              }))
            : [],
          comboState: comboRaw
            ? {
                currentStreak: finiteNonNeg(comboRaw.currentStreak, 0),
                longestStreak: finiteNonNeg(comboRaw.longestStreak, 0),
                lastActivityType: typeof comboRaw.lastActivityType === 'string' ? comboRaw.lastActivityType : '',
                lastActivityTime: comboRaw.lastActivityTime
                  ? new Date(comboRaw.lastActivityTime as string)
                  : new Date(),
              }
            : { ...DEFAULT_COMBO },
          weakTopics: isPlainObject(parsed.weakTopics) ? (parsed.weakTopics as UserProgress['weakTopics']) : {},
        };
      }
    } catch (e) {
      console.warn('Failed to load progress from localStorage:', e);
    }
    return createDefaultProgress();
  }

  private saveProgress(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
    } catch (e) {
      console.warn('Failed to save progress to localStorage:', e);
    }
  }

  getProgress(): UserProgress {
    return this.progress;
  }

  getTotalXp(): number {
    return this.progress.totalXp;
  }

  getLevel(): number {
    return this.progress.level;
  }

  getXpToNextLevel(): number {
    return this.progress.xpToNextLevel;
  }

  getCurrentStreak(): number {
    return this.progress.currentStreak;
  }

  getLongestStreak(): number {
    return this.progress.longestStreak;
  }

  addXp(amount: number): { leveledUp: boolean; newLevel: number } {
    if (!Number.isFinite(amount) || amount <= 0) {
      return { leveledUp: false, newLevel: this.progress.level };
    }
    if (!Number.isFinite(this.progress.xpToNextLevel) || this.progress.xpToNextLevel < 1) {
      this.progress.xpToNextLevel = 100;
    }
    this.progress.totalXp += amount;
    let leveledUp = false;
    let guard = 0;

    while (this.progress.totalXp >= this.progress.xpToNextLevel && guard < 1000) {
      this.progress.totalXp -= this.progress.xpToNextLevel;
      this.progress.level += 1;
      this.progress.xpToNextLevel = Math.max(1, Math.floor(this.progress.xpToNextLevel * 1.5));
      leveledUp = true;
      guard += 1;
    }

    this.saveProgress();
    return { leveledUp, newLevel: this.progress.level };
  }

  completeLesson(lessonId: string, masteryScore: number, xpEarned: number): void {
    const alreadyCompleted = this.progress.completedLessons[lessonId] !== undefined;
    this.progress.completedLessons[lessonId] = {
      completedAt: new Date(),
      masteryScore,
      xpEarned,
    };
    if (!alreadyCompleted) {
      this.addXp(xpEarned);
      this.updateStreak();
      this.checkAchievements();
      this.syncCompletedModules();
    }
    this.saveProgress();
  }

  private syncCompletedModules(): void {
    const curriculum = curriculumService.getCurriculum();
    for (const module of curriculum.modules) {
      if (this.progress.completedModules[module.id]) continue;
      if (module.lessons.length === 0) continue;
      const allDone = module.lessons.every(l => this.progress.completedLessons[l.id] !== undefined);
      if (allDone) {
        this.progress.completedModules[module.id] = {
          completedAt: new Date(),
          xpEarned: 0,
        };
      }
    }
  }

  completeModule(moduleId: string, xpEarned: number): void {
    this.progress.completedModules[moduleId] = {
      completedAt: new Date(),
      xpEarned,
    };
    this.addXp(xpEarned);
    this.checkAchievements();
    this.saveProgress();
  }

  recordQuizScore(quizId: string, score: number): void {
    const existing = this.progress.quizScores[quizId];
    this.progress.quizScores[quizId] = {
      score,
      attempts: (existing?.attempts || 0) + 1,
      bestScore: Math.max(score, existing?.bestScore || 0),
    };
    if (score === 100) this.checkAchievements();
    this.saveProgress();
  }

  recordChallengeScore(challengeId: string, score: number): void {
    const existing = this.progress.challengeScores[challengeId];
    this.progress.challengeScores[challengeId] = {
      score,
      attempts: (existing?.attempts || 0) + 1,
      bestScore: Math.max(score, existing?.bestScore || 0),
      completedAt: score >= 70 ? new Date() : existing?.completedAt,
    };
    this.saveProgress();
  }

  recordDebugChallenge(challengeId: string, solved: boolean, attempts: number, timeSpent: number): void {
    this.progress.debugChallengeScores[challengeId] = {
      solved,
      attempts,
      timeSpent,
      completedAt: solved ? new Date() : undefined,
    };
    if (solved) this.checkAchievements();
    this.saveProgress();
  }

  recordPracticeScore(practiceId: string, score: number): void {
    const existing = this.progress.practiceScores[practiceId];
    this.progress.practiceScores[practiceId] = {
      score,
      attempts: (existing?.attempts || 0) + 1,
      bestScore: Math.max(score, existing?.bestScore || 0),
    };
    this.saveProgress();
  }

  updateModuleMastery(moduleId: string, mastery: number): void {
    this.progress.moduleMastery[moduleId] = mastery;
    this.saveProgress();
  }

  updateConceptMastery(conceptId: string, mastery: number): void {
    this.progress.conceptMastery[conceptId] = mastery;
    this.saveProgress();
  }

  private updateStreak(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastActive = new Date(this.progress.lastActiveDate);
    lastActive.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      this.progress.currentStreak += 1;
    } else if (diffDays > 1) {
      this.progress.currentStreak = 1;
    }

    this.progress.longestStreak = Math.max(this.progress.longestStreak, this.progress.currentStreak);
    this.progress.lastActiveDate = new Date();
  }

  private checkAchievements(): void {
    for (const achievement of this.achievements) {
      if (this.progress.unlockedAchievements[achievement.id]) continue;

      let unlocked = false;
      const { condition } = achievement;

      switch (condition.type) {
        case 'lessons_completed':
          unlocked = Object.keys(this.progress.completedLessons).length >= condition.value;
          break;
        case 'module_completed':
          unlocked = Object.keys(this.progress.completedModules).length >= condition.value;
          break;
        case 'streak_days':
          unlocked = this.progress.currentStreak >= condition.value;
          break;
        case 'xp_earned':
          unlocked = this.progress.totalXp >= condition.value;
          break;
        case 'challenge_completed':
          unlocked = Object.values(this.progress.challengeScores).filter(c => c.completedAt).length >= condition.value;
          break;
        case 'perfect_score':
          unlocked = Object.values(this.progress.quizScores).some(q => q.bestScore === 100);
          break;
      }

      if (unlocked) {
        this.progress.unlockedAchievements[achievement.id] = { unlockedAt: new Date() };
        this.addXp(achievement.xpReward);
      }
    }
  }

  getAchievements(): Achievement[] {
    return this.achievements.map(a => ({
      ...a,
      unlockedAt: this.progress.unlockedAchievements[a.id]?.unlockedAt,
    }));
  }

  getUnlockedAchievements(): Achievement[] {
    return this.getAchievements().filter(a => a.unlockedAt);
  }

  getLockedAchievements(): Achievement[] {
    return this.getAchievements().filter(a => !a.unlockedAt);
  }

  recordWeakTopic(concept: string, failed: boolean): void {
    if (!failed) {
      delete this.progress.weakTopics[concept];
      this.saveProgress();
      return;
    }
    const existing = this.progress.weakTopics[concept];
    this.progress.weakTopics[concept] = {
      concept,
      score: existing?.score ?? 100,
      failedAttempts: (existing?.failedAttempts || 0) + 1,
      lastFailedAt: new Date(),
      recommendedActions: existing?.recommendedActions || [
        { type: 'review-lesson', label: 'Review Lesson', targetId: '/learn' },
        { type: 'practice-questions', label: 'Practice 5 Questions', targetId: '/practice' },
        { type: 'debug-challenge', label: 'Try Debug Challenge', targetId: '/debug' },
      ],
    };
    this.saveProgress();
  }

  getWeakTopics(): WeakTopic[] {
    return Object.values(this.progress.weakTopics).sort((a, b) => b.failedAttempts - a.failedAttempts);
  }

  awardXpWithCombo(type: XpRewardEvent['type']): { amount: number; comboBonus: number; total: number; newStreak: number } {
    const XP_REWARDS: Record<string, number> = {
      'lesson-started': 5,
      'quick-check': 10,
      'scenario': 20,
      'debugging': 25,
      'mini-challenge': 40,
      'mastery': 100,
    };
    const baseAmount = XP_REWARDS[type] || 0;
    const now = new Date();
    const combo = this.progress.comboState;
    const timeSinceLast = now.getTime() - new Date(combo.lastActivityTime).getTime();
    if (timeSinceLast > 5 * 60 * 1000) combo.currentStreak = 0;
    combo.currentStreak += 1;
    combo.longestStreak = Math.max(combo.longestStreak, combo.currentStreak);
    combo.lastActivityType = type;
    combo.lastActivityTime = now;
    const comboMultiplier = Math.min(combo.currentStreak * 0.05, 0.5);
    const comboBonus = Math.round(baseAmount * comboMultiplier);
    const total = baseAmount + comboBonus;
    this.progress.xpHistory.push({ type, amount: total, timestamp: now });
    this.addXp(total);
    this.saveProgress();
    return { amount: baseAmount, comboBonus, total, newStreak: combo.currentStreak };
  }

  getCombo(): ComboState {
    return { ...this.progress.comboState };
  }

  recordLessonStarted(lessonId: string): void {
    if (!this.progress.lessonProgress[lessonId]) {
      this.progress.lessonProgress[lessonId] = {
        started: true, read: false, visualized: false, quickCheckCompleted: false,
        scenarioCompleted: false, mistakeCompleted: false, debuggingCompleted: false,
        practiceCompleted: false, completed: false, masteryScore: 0, xpEarned: 0,
        startedAt: new Date(),
      };
    } else {
      this.progress.lessonProgress[lessonId].started = true;
      if (!this.progress.lessonProgress[lessonId].startedAt) {
        this.progress.lessonProgress[lessonId].startedAt = new Date();
      }
    }
    this.saveProgress();
  }

  getLessonProgress(lessonId: string) {
    return this.progress.lessonProgress[lessonId] || {
      started: false, read: false, visualized: false, quickCheckCompleted: false,
      scenarioCompleted: false, mistakeCompleted: false, debuggingCompleted: false,
      practiceCompleted: false, completed: false, masteryScore: 0, xpEarned: 0,
    };
  }

  updateLessonProgress(lessonId: string, updates: Partial<typeof this.progress.lessonProgress[string]>): void {
    const existing = this.getLessonProgress(lessonId);
    this.progress.lessonProgress[lessonId] = { ...existing, ...updates };
    this.saveProgress();
  }

  recordActivity(type: LearningActivity['type'], title: string, xp: number, topicId?: string, moduleId?: string): void {
    gamificationService.recordActivity({
      type,
      title,
      topicId,
      moduleId,
      xp,
      timestamp: new Date().toISOString(),
    });
    if (type === 'lesson') gamificationService.updateDailyGoalProgress('lesson');
    if (type === 'practice') gamificationService.updateDailyGoalProgress('practice');
    if (type === 'debug') gamificationService.updateDailyGoalProgress('debug');
    if (type === 'quiz' || type === 'exam') gamificationService.updateDailyGoalProgress('quiz');
    if (type === '3d') gamificationService.updateDailyGoalProgress('3d');
    if (type === 'lab') gamificationService.updateDailyGoalProgress('lab');
    if (type === 'scenario') gamificationService.updateDailyGoalProgress('scenario');
    gamificationService.updateWeeklyChallengeProgress(type === 'lesson' ? 'lessons' : type === 'practice' ? 'practice' : type === 'debug' ? 'debug' : type === '3d' ? '3d' : 'lessons');
  }

  getXpBreakdown(): { lessons: number; practice: number; debugging: number; threeD: number; challenges: number; exams: number; achievements: number; other: number } {
    const breakdown = { lessons: 0, practice: 0, debugging: 0, threeD: 0, challenges: 0, exams: 0, achievements: 0, other: 0 };
    for (const lesson of Object.values(this.progress.completedLessons)) {
      breakdown.lessons += lesson.xpEarned;
    }
    for (const quiz of Object.values(this.progress.quizScores)) {
      breakdown.exams += Math.round(quiz.bestScore * 0.5);
    }
    for (const challenge of Object.values(this.progress.challengeScores)) {
      breakdown.challenges += Math.round(challenge.bestScore * 0.3);
    }
    for (const debug of Object.values(this.progress.debugChallengeScores)) {
      if (debug.solved) breakdown.debugging += 25;
    }
    for (const practice of Object.values(this.progress.practiceScores)) {
      breakdown.practice += Math.round(practice.bestScore * 0.2);
    }
    for (const achievement of this.getUnlockedAchievements()) {
      breakdown.achievements += achievement.xpReward;
    }
    const totalFromBreakdown = breakdown.lessons + breakdown.practice + breakdown.debugging + breakdown.threeD + breakdown.challenges + breakdown.exams + breakdown.achievements;
    breakdown.other = Math.max(0, this.progress.totalXp - totalFromBreakdown);
    return breakdown;
  }

  getPracticeAccuracy(): { attempted: number; correct: number; accuracy: number; byTopic: Record<string, { attempted: number; correct: number; accuracy: number }> } {
    let attempted = 0;
    let correct = 0;
    const byTopic: Record<string, { attempted: number; correct: number; accuracy: number }> = {};
    for (const [id, score] of Object.entries(this.progress.practiceScores)) {
      attempted += score.attempts;
      correct += Math.round(score.bestScore * score.attempts / 100);
      const topic = id.split('-')[0] || 'general';
      if (!byTopic[topic]) byTopic[topic] = { attempted: 0, correct: 0, accuracy: 0 };
      byTopic[topic].attempted += score.attempts;
      byTopic[topic].correct += Math.round(score.bestScore * score.attempts / 100);
    }
    for (const [, data] of Object.entries(byTopic)) {
      data.accuracy = data.attempted > 0 ? Math.round((data.correct / data.attempted) * 100) : 0;
    }
    return { attempted, correct, accuracy: attempted > 0 ? Math.round((correct / attempted) * 100) : 0, byTopic };
  }

  getDebuggingStats(): { solved: number; total: number; accuracy: number; firstTry: number; hintUsage: number } {
    const scores = Object.values(this.progress.debugChallengeScores);
    const solved = scores.filter(s => s.solved).length;
    const total = scores.length;
    const firstTry = scores.filter(s => s.solved && s.attempts === 1).length;
    return {
      solved,
      total,
      accuracy: total > 0 ? Math.round((solved / total) * 100) : 0,
      firstTry: solved > 0 ? Math.round((firstTry / solved) * 100) : 0,
      hintUsage: 0,
    };
  }

  getExamStats(): { totalExams: number; averageScore: number; bestScore: number; questionsSolved: number } {
    const scores = Object.values(this.progress.quizScores);
    const totalExams = scores.length;
    const averageScore = totalExams > 0 ? Math.round(scores.reduce((sum, s) => sum + s.score, 0) / totalExams) : 0;
    const bestScore = totalExams > 0 ? Math.max(...scores.map(s => s.bestScore)) : 0;
    const questionsSolved = scores.reduce((sum, s) => sum + s.attempts, 0);
    return { totalExams, averageScore, bestScore, questionsSolved };
  }

  getLessonCompletionStats(): { totalLessons: number; completedLessons: number; inProgress: number; notStarted: number } {
    const completed = Object.keys(this.progress.completedLessons).length;
    const inProgress = Object.values(this.progress.lessonProgress).filter(p => p.started && !p.completed).length;
    const totalLessons = curriculumService.getCurriculum().totalLessons;
    return { totalLessons, completedLessons: completed, inProgress, notStarted: totalLessons - completed - inProgress };
  }

  getNextBestAction(): { type: string; title: string; description: string; action: string; link: string } | null {
    const inProgressLesson = Object.entries(this.progress.lessonProgress).find(([, p]) => p.started && !p.completed);
    if (inProgressLesson) {
      const lesson = curriculumService.getLesson(inProgressLesson[0]);
      return { type: 'continue', title: `Continue: ${lesson?.title || inProgressLesson[0]}`, description: 'You have a lesson in progress', action: 'Continue Learning', link: `/lesson/${inProgressLesson[0]}` };
    }
    const weakTopics = this.getWeakTopics();
    if (weakTopics.length > 0) {
      return { type: 'practice', title: `Practice: ${weakTopics[0].concept}`, description: `${weakTopics[0].failedAttempts} failed attempts`, action: 'Practice Now', link: '/practice' };
    }
    const completedCount = Object.keys(this.progress.completedLessons).length;
    if (completedCount === 0) {
      return { type: 'start', title: 'Start Your OOP Journey', description: 'Begin with Module 01 — OOP Foundation', action: 'Start Learning', link: '/lesson/lesson-01-01' };
    }
    return { type: 'next', title: 'Continue Curriculum', description: 'Keep building your OOP knowledge', action: 'View Curriculum', link: '/curriculum' };
  }

  resetProgress(): void {
    this.progress = createDefaultProgress();
    this.saveProgress();
  }
}

export const progressService = new ProgressService();