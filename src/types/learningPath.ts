import type { MasteryLevel } from '@/types';
import type { WeakTopic } from '@/types';

export type StudyFocus = 
  | 'learn-new'
  | 'revise-weak' 
  | 'practice-questions'
  | 'debugging'
  | '3d-visualization'
  | 'exam-preparation'
  | 'balanced-learning';

export type ActivityType = 
  | 'review-concept'
  | 'study-lesson'
  | 'practice-activity'
  | 'debugging-challenge'
  | 'session-summary';

export interface StudyPlanItem {
  id: string;
  title: string;
  activityType: ActivityType;
  relatedId: string; // lessonId, moduleId, etc.
  relatedTitle: string;
  estimatedMinutes: number;
  reason: string;
  startAction: () => void;
  completionStatus: 'planned' | 'started' | 'completed';
}

export interface StudyPlan {
  id: string;
  date: string;
  focus: StudyFocus;
  items: StudyPlanItem[];
  createdAt: Date;
}

export interface LearningRecommendation {
  id: string;
  priority: number;
  action: string;
  relatedId: string;
  relatedTitle: string;
  reason: string;
  destinationRoute: string;
  estimatedMinutes?: number;
  type: 'resume' | 'review' | 'practice' | 'continue' | 'assess';
}

export interface LearningInsights {
  totalLessonsCompleted: number;
  totalLessons: number;
  practiceAccuracy: number | null;
  weakTopics: WeakTopic[];
  recentActivity: {
    type: string;
    title: string;
    timestamp: Date;
  }[];
  consistencyStreak: number;
  totalStudyTime: number | null;
  goalProgress: number | null;
  unavailableMetrics: string[];
}

export interface StudyPreference {
  dailyMinutesGoal: number;
  weeklyMinutesTarget: number;
  preferredFocus: StudyFocus;
  targetCompletionDate?: string;
  lastUpdated: Date;
}

export interface StudySession {
  id: string;
  startedAt: Date;
  activityType: ActivityType;
  relatedId: string;
  title: string;
  completed: boolean;
  completedAt?: Date;
  xpEarned: number;
}

export interface LearningPathStats {
  totalModules: number;
  totalLessons: number;
  completedLessons: number;
  inProgressLessons: number;
  lockedLessons: number;
  progressPercentage: number;
  currentModule: string | null;
  currentLesson: string | null;
  masteryLevel: MasteryLevel | null;
}