import { useState, useCallback, useEffect } from 'react';
import { curriculumService } from '@/services/curriculumService';
const curriculum = curriculumService.getCurriculum();
import { progressService } from '@/services/progressService';
import { gamificationService } from '@/services/gamificationService';
import {
  getRecommendedNextLesson,
  getLearningPathStats,
  getModuleStudyTime,
  getCurrentLearningPosition,
} from '@/data/learningPathData';
import type {
  LearningRecommendation,
  LearningInsights,
  StudyFocus,
  StudyPreference,
  StudySession,
  LearningPathStats,
  StudyPlanItem,
  ActivityType,
} from '@/types/learningPath';
import type { WeakTopic } from '@/types';
import { isPlainObject, safeParseJSON } from '@/utils/safeStorage';

// ─── Storage key ───────────────────────────────────────────────────────────────
const STUDY_PREF_KEY = 'oop-universe-study-preference';
const MISSION_KEY = 'oop-universe-mission-plan-next-level';

// ─── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_PREFERENCE: StudyPreference = {
  dailyMinutesGoal: 30,
  weeklyMinutesTarget: 180,
  preferredFocus: 'balanced-learning',
  lastUpdated: new Date(),
};

// ─── Persist helpers (module-level so they can be used in initial state) ───────
function loadStudyPreference(): StudyPreference {
  try {
    const stored = localStorage.getItem(STUDY_PREF_KEY);
    if (stored) {
      const parsed = safeParseJSON<unknown>(stored, null);
      if (isPlainObject(parsed)) {
        const daily = typeof parsed.dailyMinutesGoal === 'number' && Number.isFinite(parsed.dailyMinutesGoal)
          ? Math.max(5, Math.min(480, Math.floor(parsed.dailyMinutesGoal)))
          : 30;
        const weekly = typeof parsed.weeklyMinutesTarget === 'number' && Number.isFinite(parsed.weeklyMinutesTarget)
          ? Math.max(30, Math.min(3360, Math.floor(parsed.weeklyMinutesTarget)))
          : 180;
        return {
          dailyMinutesGoal: daily,
          weeklyMinutesTarget: weekly,
          preferredFocus: (typeof parsed.preferredFocus === 'string'
            ? parsed.preferredFocus
            : 'balanced-learning') as StudyFocus,
          targetCompletionDate: typeof parsed.targetCompletionDate === 'string'
            ? parsed.targetCompletionDate
            : undefined,
          lastUpdated: parsed.lastUpdated ? new Date(parsed.lastUpdated as string) : new Date(),
        };
      }
    }
  } catch {
    // Corrupted localStorage — use defaults
  }
  return { ...DEFAULT_PREFERENCE };
}

function saveStudyPreference(pref: StudyPreference): void {
  try {
    localStorage.setItem(
      STUDY_PREF_KEY,
      JSON.stringify({
        dailyMinutesGoal: pref.dailyMinutesGoal,
        weeklyMinutesTarget: pref.weeklyMinutesTarget,
        preferredFocus: pref.preferredFocus,
        targetCompletionDate: pref.targetCompletionDate,
        lastUpdated: pref.lastUpdated instanceof Date ? pref.lastUpdated.toISOString() : new Date().toISOString(),
      })
    );
  } catch {
    // Ignore localStorage errors
  }
}

// ─── Mission helpers ───────────────────────────────────────────────────────────
export interface MissionObjectiveState {
  id: string;
  label: string;
  completed: boolean;
}

export interface MissionState {
  id: string;
  title: string;
  objectives: MissionObjectiveState[];
  xpAwarded: boolean;
}

const MISSION_OBJECTIVES: MissionObjectiveState[] = [
  { id: 'obj-1-set-goal', label: 'Set a daily study goal', completed: false },
  { id: 'obj-2-review-rec', label: 'Review the recommended next step', completed: false },
  { id: 'obj-3-open-lesson', label: 'Open a recommended lesson or activity', completed: false },
  { id: 'obj-4-complete-activity', label: 'Complete one supported learning activity', completed: false },
  { id: 'obj-5-session-summary', label: 'Review the study session summary', completed: false },
];

function loadMission(): MissionState {
  try {
    const stored = localStorage.getItem(MISSION_KEY);
    if (stored) {
      const parsed = safeParseJSON<unknown>(stored, null);
      if (isPlainObject(parsed)) {
        const objectivesRaw: unknown = parsed.objectives;
        if (Array.isArray(objectivesRaw)) {
          const objectives: MissionObjectiveState[] = MISSION_OBJECTIVES.map(defaultObj => {
            const found = objectivesRaw.find(
              (o: unknown) => isPlainObject(o) && o.id === defaultObj.id
            );
            return {
              ...defaultObj,
              completed: isPlainObject(found) && found.completed === true,
            };
          });
          return {
            id: typeof parsed.id === 'string' ? parsed.id : 'mission-plan-next-level',
            title: typeof parsed.title === 'string' ? parsed.title : 'MISSION: PLAN YOUR NEXT LEVEL',
            objectives,
            xpAwarded: parsed.xpAwarded === true,
          };
        }
      }
    }
  } catch {
    // ignore
  }
  return {
    id: 'mission-plan-next-level',
    title: 'MISSION: PLAN YOUR NEXT LEVEL',
    objectives: MISSION_OBJECTIVES.map(o => ({ ...o })),
    xpAwarded: false,
  };
}

function saveMission(mission: MissionState): void {
  try {
    localStorage.setItem(MISSION_KEY, JSON.stringify(mission));
  } catch {
    // ignore
  }
}

// ─── Build recommendation from real data ──────────────────────────────────────
function buildRecommendation(): LearningRecommendation | null {
  const rec = getRecommendedNextLesson();
  if (!rec) return null;

  // Determine type
  const progress = progressService.getProgress();
  const lp = rec.lessonId ? progress.lessonProgress[rec.lessonId] : undefined;
  let type: LearningRecommendation['type'] = 'continue';

  if (lp?.started && !lp.completed) type = 'resume';
  else if (progressService.getWeakTopics().length > 0) type = 'review';
  else if (rec.destinationRoute === '/quiz') type = 'assess';

  return {
    id: `rec-${Date.now()}`,
    priority: 1,
    action: rec.reason,
    relatedId: rec.lessonId,
    relatedTitle: rec.title,
    reason: rec.reason,
    destinationRoute: rec.destinationRoute,
    estimatedMinutes: rec.moduleId ? getModuleStudyTime(rec.moduleId) : undefined,
    type,
  };
}

// ─── Build insights from real data ───────────────────────────────────────────
function buildInsights(pref: StudyPreference): LearningInsights {
  const progress = progressService.getProgress();
  const totalLessons = curriculum.modules.reduce((sum, m) => sum + m.lessons.length, 0);

  // Completed count from lessonProgress (authoritative)
  let completedCount = Object.keys(progress.completedLessons).length;

  // Practice accuracy from quiz scores (what we have recorded)
  const quizEntries = Object.values(progress.quizScores);
  let practiceAccuracy: number | null = null;
  if (quizEntries.length > 0) {
    const totalScore = quizEntries.reduce((sum, q) => sum + q.score, 0);
    practiceAccuracy = Math.round(totalScore / quizEntries.length);
  }

  // Consistency streak from progress
  const consistencyStreak = progress.currentStreak ?? 0;

  // Goal progress — based on lessons completed vs. estimated weekly target
  const lessonsPerWeek = Math.max(1, Math.round(pref.weeklyMinutesTarget / 30));
  const goalProgress = Math.min(100, Math.round((completedCount / lessonsPerWeek) * 100));

  // Recent activity from gamification
  const recentActs = gamificationService.getRecentActivity(5).map(a => ({
    type: a.type,
    title: a.title,
    timestamp: new Date(a.timestamp),
  }));

  // Unavailable metrics we're transparent about
  const unavailableMetrics: string[] = ['exact-study-time-minutes', 'daily-session-breakdown'];

  return {
    totalLessonsCompleted: completedCount,
    totalLessons,
    practiceAccuracy,
    weakTopics: progressService.getWeakTopics(),
    recentActivity: recentActs,
    consistencyStreak,
    totalStudyTime: progress.totalXp > 0
      ? Math.round(progress.totalXp / 10)  // rough estimate: 10 XP ≈ 1 min
      : null,
    goalProgress: goalProgress > 0 ? goalProgress : null,
    unavailableMetrics,
  };
}

// ─── Generate daily plan from real data ──────────────────────────────────────
function buildDailyPlan(pref: StudyPreference, weakTopics: WeakTopic[]): StudyPlanItem[] {
  const plan: StudyPlanItem[] = [];
  const { dailyMinutesGoal, preferredFocus } = pref;
  const progress = progressService.getProgress();
  let minutesAllocated = 0;

  const allLessons = curriculum.modules.flatMap(m =>
    m.lessons.map(l => ({ ...l, moduleId: m.id, moduleTitle: m.title }))
  );

  // Helper: add item if we have budget
  const addItem = (item: Omit<StudyPlanItem, 'startAction'>) => {
    if (minutesAllocated + item.estimatedMinutes > dailyMinutesGoal + 15) return; // allow 15 min overflow
    plan.push({ ...item, startAction: () => {} });
    minutesAllocated += item.estimatedMinutes;
  };

  // Priority 1 — Resume in-progress lesson
  const position = getCurrentLearningPosition();
  if (position.type === 'in-progress' && position.lessonId) {
    const lesson = allLessons.find(l => l.id === position.lessonId);
    if (lesson) {
      addItem({
        id: `plan-resume-${lesson.id}`,
        title: `Resume: ${lesson.title}`,
        activityType: 'study-lesson' as ActivityType,
        relatedId: lesson.id,
        relatedTitle: lesson.title,
        estimatedMinutes: lesson.duration ?? 30,
        reason: 'You have an in-progress lesson',
        completionStatus: 'planned',
      });
    }
  }

  // Priority 2 — Weak-topic revision
  if (preferredFocus === 'revise-weak' || preferredFocus === 'balanced-learning') {
    weakTopics.slice(0, 2).forEach((topic, i) => {
      const related = allLessons.find(l =>
        l.title.toLowerCase().includes(topic.concept.toLowerCase())
      );
      addItem({
        id: `plan-weak-${i}`,
        title: `Revise: ${topic.concept}`,
        activityType: 'review-concept' as ActivityType,
        relatedId: related?.id ?? '',
        relatedTitle: related?.title ?? topic.concept,
        estimatedMinutes: 15,
        reason: `${topic.failedAttempts} failed attempt(s) — needs review`,
        completionStatus: 'planned',
      });
    });
  }

  // Priority 3 — Practice questions
  if (preferredFocus === 'practice-questions' || preferredFocus === 'balanced-learning') {
    addItem({
      id: 'plan-practice',
      title: 'Practice Questions Session',
      activityType: 'practice-activity' as ActivityType,
      relatedId: 'practice',
      relatedTitle: 'Practice Hub',
      estimatedMinutes: 20,
      reason: 'Reinforce your understanding with practice questions',
      completionStatus: 'planned',
    });
  }

  // Priority 4 — Debugging
  if (preferredFocus === 'debugging') {
    addItem({
      id: 'plan-debug',
      title: 'Debug Challenge',
      activityType: 'debugging-challenge' as ActivityType,
      relatedId: 'debug',
      relatedTitle: 'Debug Lab',
      estimatedMinutes: 20,
      reason: 'Sharpen your debugging skills',
      completionStatus: 'planned',
    });
  }

  // Priority 5 — Continue next available lesson (if no in-progress)
  if (position.type !== 'in-progress' && (preferredFocus === 'learn-new' || preferredFocus === 'balanced-learning')) {
    const nextLesson = allLessons.find(l => {
      const lp = progress.lessonProgress[l.id];
      return !lp || (!lp.started && !lp.completed);
    });
    if (nextLesson) {
      addItem({
        id: `plan-next-${nextLesson.id}`,
        title: `Learn: ${nextLesson.title}`,
        activityType: 'study-lesson' as ActivityType,
        relatedId: nextLesson.id,
        relatedTitle: nextLesson.title,
        estimatedMinutes: nextLesson.duration ?? 30,
        reason: `Next lesson in ${nextLesson.moduleTitle}`,
        completionStatus: 'planned',
      });
    }
  }

  // Priority 6 — Exam prep
  if (preferredFocus === 'exam-preparation') {
    addItem({
      id: 'plan-exam',
      title: 'Quiz & Assessment',
      activityType: 'practice-activity' as ActivityType,
      relatedId: 'quiz',
      relatedTitle: 'Assessment Center',
      estimatedMinutes: 30,
      reason: 'Test your exam readiness',
      completionStatus: 'planned',
    });
  }

  return plan;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useLearningPath = () => {
  const [stats, setStats] = useState<LearningPathStats>(() => ({
    ...getLearningPathStats(),
    masteryLevel: null,
  }));
  const [recommendation, setRecommendation] = useState<LearningRecommendation | null>(buildRecommendation);
  const [studyPreference, setStudyPreferenceState] = useState<StudyPreference>(loadStudyPreference);
  const [studySession, setStudySession] = useState<StudySession | null>(null);
  const [weakTopics, setWeakTopics] = useState<WeakTopic[]>(() => progressService.getWeakTopics());
  const [insights, setInsights] = useState<LearningInsights>(() => buildInsights(loadStudyPreference()));
  const [mission, setMission] = useState<MissionState>(loadMission);

  // ── Refresh all data from services ──
  const refresh = useCallback(() => {
    setStats({ ...getLearningPathStats(), masteryLevel: null });
    setRecommendation(buildRecommendation());
    setWeakTopics(progressService.getWeakTopics());
    setInsights(buildInsights(loadStudyPreference()));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // ── Study preference ──
  const setStudyPreference = useCallback((pref: StudyPreference) => {
    const updated = { ...pref, lastUpdated: new Date() };
    setStudyPreferenceState(updated);
    saveStudyPreference(updated);
    setInsights(buildInsights(updated));
  }, []);

  // ── Daily plan ──
  const generateDailyPlan = useCallback((): StudyPlanItem[] => {
    return buildDailyPlan(studyPreference, weakTopics);
  }, [studyPreference, weakTopics]);

  // ── Mission ──
  const completeMissionObjective = useCallback((objId: string) => {
    setMission(prev => {
      const objectives = prev.objectives.map(o => o.id === objId ? { ...o, completed: true } : o);
      const allDone = objectives.every(o => o.completed);
      const updated: MissionState = {
        ...prev,
        objectives,
        xpAwarded: allDone && !prev.xpAwarded ? true : prev.xpAwarded,
      };
      // Award XP only once, only when all objectives are complete and not previously awarded
      if (allDone && !prev.xpAwarded) {
        progressService.addXp(75);
      }
      saveMission(updated);
      return updated;
    });
  }, []);

  // ── Session ──
  const startStudySession = useCallback((item: StudyPlanItem) => {
    setStudySession({
      id: `session-${Date.now()}`,
      startedAt: new Date(),
      activityType: item.activityType,
      relatedId: item.relatedId,
      title: item.title,
      completed: false,
      xpEarned: 0,
    });
    // Mark mission obj 3 (open a recommended lesson) as viewed
    completeMissionObjective('obj-3-open-lesson');
  }, [completeMissionObjective]);

  const completeStudySession = useCallback(() => {
    if (!studySession) return;
    setStudySession(prev =>
      prev ? { ...prev, completed: true, completedAt: new Date() } : null
    );
    completeMissionObjective('obj-4-complete-activity');
    completeMissionObjective('obj-5-session-summary');
  }, [studySession, completeMissionObjective]);

  const skipItem = useCallback((_itemId: string) => {
    // No XP awarded for skipping
    setStudySession(null);
  }, []);

  const isMissionObjectiveUnlocked = useCallback((objId: string): boolean => {
    const idx = mission.objectives.findIndex(o => o.id === objId);
    if (idx === 0) return true;
    return mission.objectives[idx - 1]?.completed ?? false;
  }, [mission]);

  const refreshInsights = useCallback(() => {
    setInsights(buildInsights(studyPreference));
  }, [studyPreference]);

  return {
    // State
    stats,
    recommendation,
    studyPreference,
    weakTopics,
    insights,
    studySession,
    mission,

    // Actions
    setStudyPreference,
    saveStudyPreference,
    generateDailyPlan,
    startStudySession,
    completeStudySession,
    skipItem,
    refresh,
    refreshInsights,
    completeMissionObjective,
    isMissionObjectiveUnlocked,
  };
};