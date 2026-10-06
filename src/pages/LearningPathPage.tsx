import { useState, useCallback, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, Target, Sparkles, Clock, AlertTriangle, CheckCircle,
  BookOpen, ChevronRight, ChevronDown, Calendar, BarChart2, Zap,
  Star, Lock, Play, RotateCcw, Flame, TrendingUp, Brain, Map,
  Settings, ArrowRight, Trophy, Shield, XCircle, Circle,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useLearningPath } from '@/hooks/useLearningPath';
import { curriculumService } from '@/services/curriculumService';
const curriculum = curriculumService.getCurriculum();
import { MODULES_WITH_PROGRESS } from '@/data/learningPathData';
import { progressService } from '@/services/progressService';
import { masteryService } from '@/services/masteryService';
import type { StudyFocus, StudyPlanItem } from '@/types/learningPath';

import type { Variants } from 'framer-motion';

// ─── Framer-motion variants ──────────────────────────────────────────────────
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
};

const staggerContainer: Variants = {
  visible: { transition: { staggerChildren: 0.07 } },
};

// ─── Focus options ───────────────────────────────────────────────────────────
const FOCUS_OPTIONS: { value: StudyFocus; label: string; icon: React.ReactNode; color: string }[] = [
  { value: 'learn-new', label: 'Learn New', icon: <BookOpen className="w-3.5 h-3.5" />, color: 'text-blue-400' },
  { value: 'revise-weak', label: 'Revise Weak', icon: <AlertTriangle className="w-3.5 h-3.5" />, color: 'text-amber-400' },
  { value: 'practice-questions', label: 'Practice', icon: <Target className="w-3.5 h-3.5" />, color: 'text-emerald-400' },
  { value: 'debugging', label: 'Debugging', icon: <Shield className="w-3.5 h-3.5" />, color: 'text-red-400' },
  { value: '3d-visualization', label: '3D Lab', icon: <Brain className="w-3.5 h-3.5" />, color: 'text-purple-400' },
  { value: 'exam-preparation', label: 'Exam Prep', icon: <Star className="w-3.5 h-3.5" />, color: 'text-yellow-400' },
  { value: 'balanced-learning', label: 'Balanced', icon: <BarChart2 className="w-3.5 h-3.5" />, color: 'text-cyan-400' },
];

const DURATION_OPTIONS = [15, 30, 45, 60, 90];

// ─── Module card ─────────────────────────────────────────────────────────────
function ModuleCard({ mod, index }: { mod: typeof MODULES_WITH_PROGRESS[number]; index: number }) {
  const navigate = useNavigate();
  const isComplete = mod.isModuleCompleted;
  const isLocked = mod.isModuleLocked && mod.completedLessons === 0;
  const hasProgress = mod.completedLessons > 0 && !isComplete;

  const state = isComplete ? 'complete' : isLocked ? 'locked' : hasProgress ? 'progress' : 'available';

  const stateMeta = {
    complete: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/5', badge: 'bg-emerald-500/20 text-emerald-300', label: 'Complete', icon: <CheckCircle className="w-3 h-3 text-emerald-400" /> },
    locked: { border: 'border-white/5', bg: 'bg-white/[0.01]', badge: 'bg-white/10 text-white/30', label: 'Locked', icon: <Lock className="w-3 h-3 text-white/30" /> },
    progress: { border: 'border-blue-500/30', bg: 'bg-blue-500/5', badge: 'bg-blue-500/20 text-blue-300', label: 'In Progress', icon: <Play className="w-3 h-3 text-blue-400" /> },
    available: { border: 'border-white/10', bg: 'bg-white/[0.02]', badge: 'bg-white/10 text-white/60', label: 'Start', icon: <ChevronRight className="w-3 h-3 text-white/40" /> },
  };

  const meta = stateMeta[state];
  const firstLesson = mod.lessons[0];

  return (
    <motion.div variants={fadeInUp}>
      <div
        className={`relative rounded-xl border p-4 cursor-pointer group transition-all duration-200 hover:border-white/20 hover:bg-white/[0.04] ${meta.border} ${meta.bg}`}
        onClick={() => firstLesson && navigate(`/lesson/${firstLesson.id}`)}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && firstLesson && navigate(`/lesson/${firstLesson.id}`)}
        aria-label={`Module ${index + 1}: ${mod.title}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-mono text-white/30 mb-0.5">MOD {String(index + 1).padStart(2, '0')}</p>
            <h3 className="text-sm font-semibold text-white leading-tight truncate">{mod.title}</h3>
          </div>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border border-transparent ${meta.badge}`}>
            {meta.icon}
            {meta.label}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-white/40">{mod.completedLessons}/{mod.lessons.length} lessons</span>
            <span className="text-[10px] font-medium text-white/60">{mod.progressPercentage}%</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${isComplete ? 'bg-emerald-500' : hasProgress ? 'bg-blue-500' : 'bg-white/20'}`}
              style={{ width: `${mod.progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {mod.inProgressLessons > 0 && (
            <span className="text-[10px] text-blue-400">{mod.inProgressLessons} in progress</span>
          )}
          {isLocked && (
            <span className="text-[10px] text-white/30">Prerequisites needed</span>
          )}
          {!isLocked && !isComplete && (
            <span className="text-[10px] text-white/40">{mod.lessons.length - mod.completedLessons} remaining</span>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors ml-auto" />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Recommendation card ─────────────────────────────────────────────────────
function RecommendationCard({
  recommendation,
  onViewRec,
}: {
  recommendation: ReturnType<typeof useLearningPath>['recommendation'];
  onViewRec: () => void;
}) {
  const navigate = useNavigate();
  if (!recommendation) return null;

  const typeColors = {
    resume: 'from-blue-600/20 to-blue-800/10 border-blue-500/30',
    review: 'from-amber-600/20 to-amber-800/10 border-amber-500/30',
    practice: 'from-emerald-600/20 to-emerald-800/10 border-emerald-500/30',
    continue: 'from-purple-600/20 to-purple-800/10 border-purple-500/30',
    assess: 'from-cyan-600/20 to-cyan-800/10 border-cyan-500/30',
  };
  const typeIcons = {
    resume: <Play className="w-4 h-4 text-blue-400" />,
    review: <RotateCcw className="w-4 h-4 text-amber-400" />,
    practice: <Target className="w-4 h-4 text-emerald-400" />,
    continue: <ArrowRight className="w-4 h-4 text-purple-400" />,
    assess: <Trophy className="w-4 h-4 text-cyan-400" />,
  };

  const color = typeColors[recommendation.type];
  const icon = typeIcons[recommendation.type];

  return (
    <motion.div variants={fadeInUp}>
      <div className={`rounded-xl border bg-gradient-to-br p-4 mb-1 ${color}`}>
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-white/10">{icon}</div>
          <div>
            <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Recommended Next</p>
            <h3 className="text-sm font-semibold text-white">{recommendation.relatedTitle}</h3>
          </div>
          {recommendation.estimatedMinutes && (
            <div className="ml-auto flex items-center gap-1 text-[10px] text-white/50">
              <Clock className="w-3 h-3" />
              {recommendation.estimatedMinutes}m
            </div>
          )}
        </div>
        <p className="text-xs text-white/60 mb-3">{recommendation.reason}</p>
        <div className="flex gap-2">
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={() => {
              onViewRec();
              navigate(recommendation.destinationRoute);
            }}
          >
            <ArrowRight className="w-3 h-3" />
            {recommendation.type === 'resume' ? 'Resume' : recommendation.type === 'assess' ? 'Take Assessment' : 'Start Now'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Weak topics section ─────────────────────────────────────────────────────
function WeakTopicsSection({ weakTopics }: { weakTopics: ReturnType<typeof useLearningPath>['weakTopics'] }) {
  const navigate = useNavigate();

  return (
    <motion.div variants={fadeInUp}>
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-white">Weak Topics</h3>
          {weakTopics.length > 0 && (
            <span className="ml-auto text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
              {weakTopics.length} need review
            </span>
          )}
        </div>

        {weakTopics.length === 0 ? (
          <div className="text-center py-6">
            <CheckCircle className="w-8 h-8 text-emerald-400/40 mx-auto mb-2" />
            <p className="text-sm text-white/40">No weak topics detected</p>
            <p className="text-[10px] text-white/25 mt-1">
              Practice questions and quizzes will surface topics needing review
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {weakTopics.slice(0, 5).map((topic) => {
              const severity = topic.failedAttempts >= 4 ? 'critical' : topic.failedAttempts >= 2 ? 'medium' : 'low';
              const sevColor = severity === 'critical' ? 'text-red-400 bg-red-400/10' : severity === 'medium' ? 'text-amber-400 bg-amber-400/10' : 'text-yellow-300 bg-yellow-300/10';
              const action = topic.recommendedActions[0];

              return (
                <div key={topic.concept} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <AlertTriangle className={`w-3.5 h-3.5 flex-shrink-0 ${severity === 'critical' ? 'text-red-400' : 'text-amber-400'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white capitalize">{topic.concept}</p>
                    <p className="text-[10px] text-white/40">{topic.failedAttempts} failed attempt(s)</p>
                  </div>
                  <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full capitalize ${sevColor}`}>
                    {severity}
                  </span>
                  <div className="flex gap-1">
                    <button
                      className="text-[10px] px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-white/60 transition-colors"
                      onClick={() => navigate('/practice')}
                      title="Practice"
                    >
                      Practice
                    </button>
                    {action?.targetId?.startsWith('/') && (
                      <button
                        className="text-[10px] px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-white/60 transition-colors"
                        onClick={() => navigate(action.targetId)}
                        title="Review"
                      >
                        Review
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Daily study planner ─────────────────────────────────────────────────────
function DailyStudyPlanner({
  studyPreference,
  setStudyPreference,
  generateDailyPlan,
  startStudySession,
  onGoalSet,
}: {
  studyPreference: ReturnType<typeof useLearningPath>['studyPreference'];
  setStudyPreference: ReturnType<typeof useLearningPath>['setStudyPreference'];
  generateDailyPlan: ReturnType<typeof useLearningPath>['generateDailyPlan'];
  startStudySession: ReturnType<typeof useLearningPath>['startStudySession'];
  onGoalSet: () => void;
}) {
  const navigate = useNavigate();
  const [plan, setPlan] = useState<StudyPlanItem[]>([]);
  const [planGenerated, setPlanGenerated] = useState(false);

  const handleGenerate = () => {
    const newPlan = generateDailyPlan();
    setPlan(newPlan);
    setPlanGenerated(true);
    onGoalSet();
  };

  const handleStart = (item: StudyPlanItem) => {
    startStudySession(item);
    setPlan(prev => prev.map(i => i.id === item.id ? { ...i, completionStatus: 'started' as const } : i));

    // Navigate based on activity type
    const routes: Record<string, string> = {
      'study-lesson': item.relatedId ? `/lesson/${item.relatedId}` : '/learn',
      'practice-activity': item.relatedId === 'quiz' ? '/assessment' : item.relatedId === 'practice' ? '/practice' : '/practice',
      'debugging-challenge': '/debug',
      'review-concept': item.relatedId ? `/lesson/${item.relatedId}` : '/learn',
      'session-summary': '/learning-path',
    };
    navigate(routes[item.activityType] ?? '/learn');
  };

  const handleSkip = (itemId: string) => {
    setPlan(prev => prev.filter(i => i.id !== itemId));
  };

  const activityIcons: Record<string, React.ReactNode> = {
    'study-lesson': <BookOpen className="w-3 h-3 text-blue-400" />,
    'review-concept': <RotateCcw className="w-3 h-3 text-amber-400" />,
    'practice-activity': <Target className="w-3 h-3 text-emerald-400" />,
    'debugging-challenge': <Shield className="w-3 h-3 text-red-400" />,
    'session-summary': <BarChart2 className="w-3 h-3 text-purple-400" />,
  };

  const statusColors = {
    planned: 'bg-white/20',
    started: 'bg-blue-400',
    completed: 'bg-emerald-400',
  };

  return (
    <motion.div variants={fadeInUp}>
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">Daily Study Planner</h3>
        </div>

        {/* Duration goal */}
        <div className="mb-4">
          <p className="text-[10px] text-white/50 mb-2 uppercase tracking-wider">Daily Goal</p>
          <div className="flex gap-1.5 flex-wrap">
            {DURATION_OPTIONS.map(mins => (
              <button
                key={mins}
                onClick={() => setStudyPreference({ ...studyPreference, dailyMinutesGoal: mins })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 border ${
                  studyPreference.dailyMinutesGoal === mins
                    ? 'bg-blue-500/30 border-blue-500/50 text-blue-300'
                    : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80'
                }`}
              >
                {mins}m
              </button>
            ))}
          </div>
        </div>

        {/* Focus selection */}
        <div className="mb-4">
          <p className="text-[10px] text-white/50 mb-2 uppercase tracking-wider">Study Focus</p>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-4">
            {FOCUS_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setStudyPreference({ ...studyPreference, preferredFocus: opt.value })}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-150 border ${
                  studyPreference.preferredFocus === opt.value
                    ? 'bg-white/10 border-white/25 text-white'
                    : 'bg-white/[0.03] border-white/5 text-white/40 hover:bg-white/[0.06] hover:text-white/70'
                }`}
              >
                <span className={opt.color}>{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Generate button */}
        <Button variant="secondary" size="sm" fullWidth onClick={handleGenerate} className="mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Generate Study Plan
        </Button>

        {/* Plan items */}
        <AnimatePresence>
          {planGenerated && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              {plan.length === 0 ? (
                <p className="text-xs text-white/30 text-center py-4">
                  No activities match your current preferences. Try adjusting your focus.
                </p>
              ) : (
                plan.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/[0.03] border border-white/5"
                  >
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${statusColors[item.completionStatus]}`} />
                    <div className="flex-shrink-0">
                      {activityIcons[item.activityType]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white/90 truncate">{item.title}</p>
                      <p className="text-[10px] text-white/40 truncate">{item.reason}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className="text-[10px] text-white/30 flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5" />{item.estimatedMinutes}m
                      </span>
                      {item.completionStatus === 'planned' && (
                        <>
                          <button
                            onClick={() => handleStart(item)}
                            className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-colors"
                          >
                            Start
                          </button>
                          <button
                            onClick={() => handleSkip(item.id)}
                            className="text-[10px] px-1 py-0.5 rounded hover:bg-white/5 text-white/20 transition-colors"
                            title="Skip"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                      {item.completionStatus === 'started' && (
                        <span className="text-[10px] text-blue-400">Started</span>
                      )}
                      {item.completionStatus === 'completed' && (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </div>
                  </div>
                ))
              )}
              <p className="text-[9px] text-white/20 text-center pt-1">
                ⓘ Opening an activity does not automatically mark it complete
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Learning insights ────────────────────────────────────────────────────────
function LearningInsightsPanel({ insights }: { insights: ReturnType<typeof useLearningPath>['insights'] }) {
  const hasData = insights.totalLessonsCompleted > 0 || insights.practiceAccuracy !== null;

  return (
    <motion.div variants={fadeInUp}>
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-semibold text-white">Learning Insights</h3>
        </div>

        {!hasData ? (
          <div className="text-center py-6">
            <BarChart2 className="w-8 h-8 text-white/10 mx-auto mb-2" />
            <p className="text-sm text-white/40">Insights will appear as you learn</p>
            <p className="text-[10px] text-white/25 mt-1">
              Complete lessons, practice questions, and quizzes to unlock detailed insights
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Grid stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <p className="text-[10px] text-white/40 mb-0.5">Lessons Done</p>
                <p className="text-xl font-bold text-white">{insights.totalLessonsCompleted}</p>
                <p className="text-[10px] text-white/25">of {insights.totalLessons} total</p>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <p className="text-[10px] text-white/40 mb-0.5">Quiz Accuracy</p>
                {insights.practiceAccuracy !== null ? (
                  <>
                    <p className="text-xl font-bold text-white">{insights.practiceAccuracy}%</p>
                    <p className="text-[10px] text-white/25">recorded quizzes</p>
                  </>
                ) : (
                  <>
                    <p className="text-xl font-bold text-white/20">—</p>
                    <p className="text-[10px] text-white/25">no quiz data yet</p>
                  </>
                )}
              </div>
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <p className="text-[10px] text-white/40 mb-0.5">Daily Streak</p>
                <p className="text-xl font-bold text-white">{insights.consistencyStreak}</p>
                <p className="text-[10px] text-white/25">days</p>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <p className="text-[10px] text-white/40 mb-0.5">Est. Study Time</p>
                {insights.totalStudyTime !== null ? (
                  <>
                    <p className="text-xl font-bold text-white">{insights.totalStudyTime}m</p>
                    <p className="text-[10px] text-white/25">estimated from XP</p>
                  </>
                ) : (
                  <>
                    <p className="text-xl font-bold text-white/20">—</p>
                    <p className="text-[10px] text-white/25">no data yet</p>
                  </>
                )}
              </div>
            </div>

            {/* Goal progress */}
            {insights.goalProgress !== null && (
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[10px] text-white/40">Weekly Goal Progress</p>
                  <span className="text-[10px] font-medium text-white/60">{insights.goalProgress}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-700"
                    style={{ width: `${insights.goalProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Recent activity */}
            {insights.recentActivity.length > 0 && (
              <div>
                <p className="text-[10px] text-white/40 mb-2 uppercase tracking-wider">Recent Activity</p>
                <div className="space-y-1">
                  {insights.recentActivity.slice(0, 3).map((act, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px]">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400/50 flex-shrink-0" />
                      <span className="text-white/50 truncate flex-1">{act.title}</span>
                      <span className="text-white/25 flex-shrink-0 capitalize">{act.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Transparency note */}
            <div className="border-t border-white/5 pt-2">
              <p className="text-[9px] text-white/20">
                ⓘ Derived stats: est. study time (from XP), goal progress (from lesson count vs weekly target)
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Mission panel ────────────────────────────────────────────────────────────
function MissionPanel({
  mission,
  isMissionObjectiveUnlocked,
}: {
  mission: ReturnType<typeof useLearningPath>['mission'];
  isMissionObjectiveUnlocked: ReturnType<typeof useLearningPath>['isMissionObjectiveUnlocked'];
}) {
  const completedCount = mission.objectives.filter(o => o.completed).length;
  const totalCount = mission.objectives.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  return (
    <motion.div variants={fadeInUp}>
      <div className="rounded-xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-transparent p-4">
        <div className="flex items-center gap-2 mb-1">
          <Trophy className="w-4 h-4 text-yellow-400" />
          <h3 className="text-sm font-semibold text-yellow-300">Mission</h3>
          {mission.xpAwarded && (
            <span className="ml-auto text-[10px] text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full">
              +75 XP Earned!
            </span>
          )}
        </div>
        <p className="text-xs text-white/50 mb-3">PLAN YOUR NEXT LEVEL</p>

        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-white/40">{completedCount}/{totalCount} objectives</span>
            <span className="text-[10px] text-yellow-400">{progress}%</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          {mission.objectives.map((obj) => {
            const unlocked = isMissionObjectiveUnlocked(obj.id);
            return (
              <div
                key={obj.id}
                className={`flex items-center gap-2.5 p-2 rounded-lg transition-all ${
                  obj.completed ? 'bg-yellow-500/10' : unlocked ? 'bg-white/[0.03]' : 'opacity-40'
                }`}
              >
                {obj.completed ? (
                  <CheckCircle className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                ) : unlocked ? (
                  <Circle className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-white/20 flex-shrink-0" />
                )}
                <span className={`text-xs ${obj.completed ? 'text-yellow-300 line-through' : unlocked ? 'text-white/70' : 'text-white/30'}`}>
                  {obj.label}
                </span>
              </div>
            );
          })}
        </div>

        {!mission.xpAwarded && progress < 100 && (
          <p className="text-[10px] text-white/25 mt-3 text-center">Complete all objectives to earn +75 XP</p>
        )}
      </div>
    </motion.div>
  );
}

// ─── Learning journey visualization ─────────────────────────────────────────
function LearningJourney() {
  const navigate = useNavigate();
  const progress = progressService.getProgress();

  const milestones = curriculum.modules.map((mod, i) => {
    const completedInModule = mod.lessons.filter(l => progress.completedLessons[l.id]).length;
    const pct = mod.lessons.length > 0 ? Math.round((completedInModule / mod.lessons.length) * 100) : 0;
    const isComplete = pct === 100;
    const hasProgress = pct > 0 && pct < 100;
    const firstLesson = mod.lessons[0];

    return { mod, pct, isComplete, hasProgress, firstLesson, index: i };
  });

  return (
    <motion.div variants={fadeInUp}>
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center gap-2 mb-4">
          <Map className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-semibold text-white">Learning Journey</h3>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-4 top-4 bottom-4 w-px bg-gradient-to-b from-blue-500/30 via-purple-500/20 to-transparent" />

          <div className="space-y-2">
            {milestones.map(({ mod, pct, isComplete, hasProgress, firstLesson, index }) => (
              <div
                key={mod.id}
                className={`relative flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all duration-150 group ${
                  isComplete ? 'hover:bg-emerald-500/5' : hasProgress ? 'hover:bg-blue-500/5' : 'hover:bg-white/[0.03]'
                }`}
                onClick={() => firstLesson && navigate(`/lesson/${firstLesson.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && firstLesson && navigate(`/lesson/${firstLesson.id}`)}
              >
                {/* Node */}
                <div
                  className={`relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    isComplete
                      ? 'bg-emerald-500/20 border-emerald-500/50'
                      : hasProgress
                      ? 'bg-blue-500/20 border-blue-500/50'
                      : 'bg-white/5 border-white/15'
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  ) : hasProgress ? (
                    <Play className="w-3 h-3 text-blue-400" />
                  ) : (
                    <span className="text-[10px] font-mono text-white/30">{String(index + 1).padStart(2, '0')}</span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium truncate ${isComplete ? 'text-emerald-300' : hasProgress ? 'text-blue-300' : 'text-white/60'}`}>
                    {mod.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex-1 h-0.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${isComplete ? 'bg-emerald-500' : hasProgress ? 'bg-blue-500' : 'bg-white/10'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-white/25 flex-shrink-0">{pct}%</span>
                  </div>
                </div>

                <ChevronRight className="w-3 h-3 text-white/15 group-hover:text-white/40 transition-colors flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}


// ─── Page header stats ────────────────────────────────────────────────────────
function HeaderStats({ stats }: { stats: ReturnType<typeof useLearningPath>['stats'] }) {
  const xp = progressService.getTotalXp();
  const level = progressService.getLevel();
  const streak = progressService.getCurrentStreak();

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <Zap className="w-3.5 h-3.5 text-white" />
        </div>
        <div>
          <p className="text-[10px] text-white/40">Level</p>
          <p className="text-sm font-bold text-white">{level}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
          <Star className="w-3.5 h-3.5 text-white" />
        </div>
        <div>
          <p className="text-[10px] text-white/40">XP</p>
          <p className="text-sm font-bold text-white">{xp.toLocaleString()}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
          <Flame className="w-3.5 h-3.5 text-white" />
        </div>
        <div>
          <p className="text-[10px] text-white/40">Streak</p>
          <p className="text-sm font-bold text-white">{streak}d</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 ml-auto">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
          <GraduationCap className="w-3.5 h-3.5 text-white" />
        </div>
        <div>
          <p className="text-[10px] text-white/40">Complete</p>
          <p className="text-sm font-bold text-white">{stats.progressPercentage}%</p>
        </div>
      </div>
    </div>
  );
}

// ─── Module grid with tabs ────────────────────────────────────────────────────
function ModuleGrid() {
  const modulesWithProgress = useMemo(() => MODULES_WITH_PROGRESS, []);
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? modulesWithProgress : modulesWithProgress.slice(0, 6);

  return (
    <motion.div variants={fadeInUp}>
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            All Modules
          </h3>
          <Link to="/curriculum" className="text-[10px] text-blue-400 hover:underline">
            Full view →
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {displayed.map((mod, i) => (
            <ModuleCard key={mod.id} mod={mod} index={i} />
          ))}
        </motion.div>

        {modulesWithProgress.length > 6 && (
          <button
            onClick={() => setShowAll(v => !v)}
            className="mt-3 w-full py-2 text-xs text-white/40 hover:text-white/70 flex items-center justify-center gap-1.5 transition-colors"
          >
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAll ? 'rotate-180' : ''}`} />
            {showAll ? 'Show less' : `Show ${modulesWithProgress.length - 6} more modules`}
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function LearningPathPage() {
  const {
    stats,
    recommendation,
    studyPreference,
    weakTopics,
    insights,
    studySession,
    mission,
    setStudyPreference,
    generateDailyPlan,
    startStudySession,
    completeStudySession,
    completeMissionObjective,
    isMissionObjectiveUnlocked,
  } = useLearningPath();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'path' | 'planner' | 'insights'>('path');

  // Mark "review recommendation" objective when recommendation is viewed
  const handleViewRec = useCallback(() => {
    completeMissionObjective('obj-2-review-rec');
  }, [completeMissionObjective]);

  // Mark "set goal" when planner tab is opened
  const handlePlannerTab = () => {
    setActiveTab('planner');
    completeMissionObjective('obj-1-set-goal');
  };

  const tabs = [
    { id: 'path' as const, label: 'Learning Path', icon: <Map className="w-3.5 h-3.5" /> },
    { id: 'planner' as const, label: 'Study Planner', icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'insights' as const, label: 'Insights', icon: <TrendingUp className="w-3.5 h-3.5" /> },
  ];

  return (
    <div
      className="min-h-screen bg-[var(--color-bg-primary)] pb-12"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Top nav bar */}
      <header className="sticky top-0 z-30 bg-[#0a0f1a]/95 backdrop-blur-md border-b border-white/8">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => navigate(-1)}
              className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white/70 transition-colors"
              aria-label="Go back"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <div>
              <h1 className="text-base font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-400" />
                Learning Path
              </h1>
              <p className="text-[10px] text-white/40">Your personalized OOP learning journey</p>
            </div>
            <Link to="/settings" className="ml-auto p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60 transition-colors">
              <Settings className="w-4 h-4" />
            </Link>
          </div>
          <HeaderStats stats={stats} />
        </div>
      </header>

      {/* Overall progress bar */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/20 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-white/50">Overall Progress</span>
            <span className="text-xs font-semibold text-white">{stats.progressPercentage}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stats.progressPercentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"
            />
          </div>
          <div className="flex items-center gap-4 mt-1.5 text-[10px] text-white/35">
            <span>{stats.completedLessons} completed</span>
            <span>·</span>
            <span>{stats.inProgressLessons} in progress</span>
            <span>·</span>
            <span>{stats.totalLessons - stats.completedLessons - stats.inProgressLessons} remaining</span>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="border-b border-white/8 bg-[#0a0f1a]/80 sticky top-[calc(3.5rem+2.5rem+3.2rem)] z-20 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => tab.id === 'planner' ? handlePlannerTab() : setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-white/40 hover:text-white/70 hover:border-white/20'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 pt-5">
        <AnimatePresence mode="wait">
          {activeTab === 'path' && (
            <motion.div
              key="path"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -8 }}
              variants={staggerContainer}
              className="space-y-5"
            >
              {/* Recommendation */}
              <RecommendationCard recommendation={recommendation} onViewRec={handleViewRec} />

              {/* Mission */}
              <MissionPanel mission={mission} isMissionObjectiveUnlocked={isMissionObjectiveUnlocked} />

              {/* Weak topics */}
              <WeakTopicsSection weakTopics={weakTopics} />

              {/* Journey visualization */}
              <LearningJourney />

              {/* Module grid */}
              <ModuleGrid />
            </motion.div>
          )}

          {activeTab === 'planner' && (
            <motion.div
              key="planner"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -8 }}
              variants={staggerContainer}
              className="space-y-5"
            >
              <DailyStudyPlanner
                studyPreference={studyPreference}
                setStudyPreference={setStudyPreference}
                generateDailyPlan={generateDailyPlan}
                startStudySession={startStudySession}
                onGoalSet={() => completeMissionObjective('obj-1-set-goal')}
              />

              {/* Active session banner */}
              {studySession && !studySession.completed && (
                <motion.div variants={fadeInUp}>
                  <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
                    <div className="flex items-center gap-3">
                      <Play className="w-4 h-4 text-blue-400 animate-pulse" />
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-blue-300">Active Session</p>
                        <p className="text-[10px] text-white/50">{studySession.title}</p>
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          completeStudySession();
                        }}
                      >
                        <CheckCircle className="w-3 h-3" />
                        Mark Done
                      </Button>
                    </div>
                    <p className="text-[9px] text-white/25 mt-2">
                      ⓘ Only mark as done after completing the activity in the lesson or practice page
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Session summary */}
              {studySession?.completed && (
                <motion.div
                  variants={fadeInUp}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
                    <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-emerald-300">Session Complete!</p>
                    <p className="text-[10px] text-white/40 mt-1">Great work. Your progress has been recorded.</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-3"
                      onClick={() => navigate('/progress')}
                    >
                      View Progress
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Shortcuts to study session page */}
              <motion.div variants={fadeInUp}>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="text-xs font-semibold text-white/60 mb-3">Quick Start</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {[
                      { label: 'Learn', icon: <BookOpen className="w-3.5 h-3.5" />, route: '/learn', color: 'text-blue-400' },
                      { label: 'Practice', icon: <Target className="w-3.5 h-3.5" />, route: '/practice', color: 'text-emerald-400' },
                      { label: 'Debug', icon: <Shield className="w-3.5 h-3.5" />, route: '/debug', color: 'text-red-400' },
                      { label: 'Assessment', icon: <Star className="w-3.5 h-3.5" />, route: '/assessment', color: 'text-yellow-400' },
                    ].map(item => (
                      <button
                        key={item.route}
                        onClick={() => navigate(item.route)}
                        className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] hover:border-white/10 transition-all group"
                      >
                        <span className={item.color}>{item.icon}</span>
                        <span className="text-xs text-white/60 group-hover:text-white/80 transition-colors">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'insights' && (
            <motion.div
              key="insights"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -8 }}
              variants={staggerContainer}
              className="space-y-5"
            >
              <LearningInsightsPanel insights={insights} />

              {/* Mastery overview */}
              <motion.div variants={fadeInUp}>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-4 h-4 text-purple-400" />
                    <h3 className="text-sm font-semibold text-white">Mastery Overview</h3>
                  </div>
                  {(() => {
                    const pillars = masteryService.getFourPillars();
                    const hasMasteryData = pillars.some(p => p.score > 0);
                    return hasMasteryData ? (
                      <div className="space-y-2">
                        {pillars.map(p => (
                          <div key={p.name}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-white/60">{p.name}</span>
                              <span className="text-xs font-medium text-white/80">{p.score}%</span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-700 ${
                                  p.level === 'mastered' ? 'bg-yellow-500'
                                  : p.level === 'strong' ? 'bg-emerald-500'
                                  : p.level === 'practicing' ? 'bg-blue-500'
                                  : p.level === 'learning' ? 'bg-purple-500'
                                  : 'bg-white/15'
                                }`}
                                style={{ width: `${p.score}%` }}
                              />
                            </div>
                          </div>
                        ))}
                        <p className="text-[9px] text-white/20 mt-2">Derived from lesson completion, practice scores, and debug challenges</p>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <Brain className="w-6 h-6 text-white/10 mx-auto mb-2" />
                        <p className="text-xs text-white/30">Complete practice activities to track mastery</p>
                      </div>
                    );
                  })()}
                </div>
              </motion.div>

              {/* Link to full progress page */}
              <motion.div variants={fadeInUp}>
                <Button variant="outline" size="sm" fullWidth onClick={() => navigate('/progress')}>
                  <BarChart2 className="w-3.5 h-3.5" />
                  View Full Progress Dashboard
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}