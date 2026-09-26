import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart2, TrendingUp, Target, Star, Flame, Award, BookOpen, CheckCircle,
  ArrowRight, Zap, Brain, Bug, Trophy, Eye, Play, ChevronRight, Lightbulb,
  ArrowUpRight, Calendar, Flag, Sparkles,
} from 'lucide-react';
import { cn, formatRelativeTime } from '@/utils/helpers';
import { Card, Badge, ProgressBar, ProgressRing, Button, Tabs } from '@/components/ui';
import { curriculumService } from '@/services/curriculumService';
import { progressService } from '@/services/progressService';
import { masteryService } from '@/services/masteryService';
import { gamificationService } from '@/services/gamificationService';
import { staggerChildren, slideUp } from '@/utils/motion';
import { motion as fm } from 'framer-motion';

const MODULE_COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#14b8a6', '#f97316', '#a855f7', '#22c55e', '#eab308', '#3b82f6', '#6366f1'];

export function ProgressPage() {
  const progress = progressService.getProgress();
  const curriculum = curriculumService.getCurriculum();
  const overallMastery = masteryService.getOverallMasteryFromProgress(progress);
  const fourPillars = masteryService.getFourPillars();
  const weakTopics = masteryService.getWeakTopics();
  const strongTopics = masteryService.getStrongTopics();
  const knowledgeGaps = masteryService.getKnowledgeGaps();
  const dailyGoal = gamificationService.getDailyGoal();
  const weeklyChallenge = gamificationService.getWeeklyChallenge();
  const activityHistory = gamificationService.getActivityHistory(15);
  const nextAction = progressService.getNextBestAction();
  const xpBreakdown = progressService.getXpBreakdown();
  const practiceStats = progressService.getPracticeAccuracy();
  const debugStats = progressService.getDebuggingStats();
  const examStats = progressService.getExamStats();
  const lessonStats = progressService.getLessonCompletionStats();
  const dailyChallenge = gamificationService.getDailyChallenge();
  const learningGoal = gamificationService.getLearningGoal();

  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const today = new Date().getDay();
  const weekActivity = weekDays.map((day, i) => {
    const dayIndex = i === 6 ? 0 : i + 1;
    const isActive = dayIndex <= (today === 0 ? 7 : today);
    return { day, active: isActive };
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'mastery', label: 'Mastery', icon: Brain },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'goals', label: 'Goals', icon: Target },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Badge variant="primary" size="md" className="mb-3">Student Dashboard</Badge>
        <h1 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">YOUR OOP JOURNEY</h1>
        <p className="text-[var(--color-text-secondary)] mt-1">Track your knowledge. Build consistency. Master Java OOP.</p>
      </motion.div>

      {/* Hero Stats */}
      <fm.div variants={staggerChildren(0.05)} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'LEVEL', value: `${progress.level}`, sub: `${progress.totalXp.toLocaleString()} XP`, icon: Star, color: '#fbbf24', ring: Math.round((progress.totalXp / (progress.totalXp + progress.xpToNextLevel)) * 100) },
          { label: 'STREAK', value: `${progress.currentStreak}`, sub: `${progress.longestStreak} day best`, icon: Flame, color: '#f59e0b' },
          { label: 'MASTERY', value: `${overallMastery}%`, sub: overallMastery >= 70 ? 'Strong progress' : 'Keep learning', icon: Brain, color: '#8b5cf6', ring: overallMastery },
          { label: 'LESSONS', value: `${lessonStats.completedLessons}`, sub: `of ${lessonStats.totalLessons}`, icon: BookOpen, color: '#3b82f6', ring: Math.round((lessonStats.completedLessons / lessonStats.totalLessons) * 100) },
        ].map((stat) => (
          <fm.div key={stat.label} variants={slideUp}>
            <Card variant="elevated" padding="lg" className="card-glow-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider font-medium">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mt-1">{stat.value}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{stat.sub}</p>
                </div>
                {stat.ring !== undefined ? (
                  <ProgressRing value={stat.ring} size={48} strokeWidth={3} variant="xp" />
                ) : (
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}12` }}>
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                )}
              </div>
            </Card>
          </fm.div>
        ))}
      </fm.div>

      {/* Level Progress Bar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Card variant="elevated" padding="lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-wider">Level {progress.level}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">{progress.xpToNextLevel} XP to next level</p>
            </div>
            <p className="font-mono text-sm text-[var(--color-xp-gold)]">{progress.totalXp} / {progress.totalXp + progress.xpToNextLevel} XP</p>
          </div>
          <ProgressBar value={progress.totalXp} max={progress.totalXp + progress.xpToNextLevel} size="lg" variant="xp" showLabel />
        </Card>
      </motion.div>

      {/* Continue Learning + Daily Goal */}
      <div className="grid lg:grid-cols-2 gap-4">
        {nextAction && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card variant="elevated" padding="lg" className="h-full">
              <div className="flex items-center gap-2 mb-3">
                <Play className="w-4 h-4 text-[var(--color-accent-primary)]" />
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider">Continue Learning</h3>
              </div>
              <p className="text-lg font-semibold text-[var(--color-text-primary)]">{nextAction.title}</p>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">{nextAction.description}</p>
              <Link to={nextAction.link}>
                <Button variant="primary" className="mt-4 gap-2">
                  {nextAction.action} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </Card>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card variant="elevated" padding="lg" className="h-full">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-[var(--color-accent-success)]" />
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider">Today's Mission</h3>
            </div>
            <div className="space-y-2">
              {dailyGoal.targets.map((t) => (
                <div key={t.id} className="flex items-center gap-3">
                  <div className={cn('w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0', t.completed ? 'bg-[var(--color-accent-success)] border-[var(--color-accent-success)]' : 'border-[var(--color-border-primary)]')}>
                    {t.completed && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                  <span className={cn('text-sm', t.completed ? 'text-[var(--color-text-secondary)] line-through' : 'text-[var(--color-text-primary)]')}>{t.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-[var(--color-border-primary)]">
              <span className="text-sm text-[var(--color-text-secondary)]">{dailyGoal.completed} / {dailyGoal.total}</span>
              <Badge variant={dailyGoal.completed >= dailyGoal.total ? 'success' : 'outline'} size="sm">+{dailyGoal.rewardXp} XP</Badge>
            </div>
          </Card>
        </motion.div>
      </div>

      <Tabs tabs={tabs} variant="pills">
        {(tabId) => (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
            {tabId === 'overview' && (
              <>
                {/* Four Pillars */}
                <Card variant="elevated" padding="lg">
                  <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">OOP Four Pillars</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {fourPillars.map((pillar) => (
                      <div key={pillar.name} className="text-center p-4 rounded-xl bg-[var(--color-bg-tertiary)]/30">
                        <ProgressRing value={pillar.score} size={64} strokeWidth={4} variant={pillar.score >= 70 ? 'success' : pillar.score >= 40 ? 'primary' : 'warning'} showValue />
                        <p className="text-sm font-medium text-[var(--color-text-primary)] mt-2">{pillar.name}</p>
                        <Badge variant={pillar.level === 'mastered' ? 'success' : pillar.level === 'strong' ? 'primary' : pillar.level === 'practicing' ? 'warning' : 'outline'} size="sm" className="mt-1">
                          {pillar.level.charAt(0).toUpperCase() + pillar.level.slice(1)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Learning Path */}
                <Card variant="elevated" padding="lg">
                  <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">Learning Path</h3>
                  <div className="space-y-2">
                    {curriculum.modules.map((module, i) => {
                      const moduleProgress = curriculumService.getModuleProgress(module.id, progress);
                      const isCompleted = moduleProgress === 100;
                      return (
                        <Link key={module.id} to={`/module/${module.id}`} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--color-bg-tertiary)]/30 hover:bg-[var(--color-bg-tertiary)]/50 transition-colors group">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: MODULE_COLORS[i] || '#6366f1' }}>
                            {isCompleted ? <CheckCircle className="w-4 h-4" /> : i + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-[var(--color-text-primary)] truncate">{module.title}</span>
                              <span className="text-xs font-mono text-[var(--color-text-tertiary)] ml-2">{moduleProgress}%</span>
                            </div>
                            <ProgressBar value={moduleProgress} max={100} size="sm" variant={isCompleted ? 'success' : 'primary'} className="mt-1" />
                          </div>
                          <ChevronRight className="w-4 h-4 text-[var(--color-text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      );
                    })}
                  </div>
                </Card>

                {/* Weak & Strong Topics */}
                <div className="grid lg:grid-cols-2 gap-4">
                  {weakTopics.length > 0 && (
                    <Card variant="elevated" padding="lg">
                      <div className="flex items-center gap-2 mb-4">
                        <Lightbulb className="w-4 h-4 text-[var(--color-accent-warning)]" />
                        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider">Needs Practice</h3>
                      </div>
                      <div className="space-y-3">
                        {weakTopics.slice(0, 5).map((topic) => (
                          <div key={topic.concept} className="p-3 rounded-lg bg-[var(--color-bg-tertiary)]/30">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-[var(--color-text-primary)] capitalize">{topic.concept}</span>
                              <Badge variant="warning" size="sm">{topic.score}%</Badge>
                            </div>
                            <div className="flex gap-2 mt-2">
                              <Link to="/practice"><Button variant="outline" size="sm" className="text-xs">Practice</Button></Link>
                              <Link to="/3d"><Button variant="outline" size="sm" className="text-xs">3D Lab</Button></Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {strongTopics.length > 0 && (
                    <Card variant="elevated" padding="lg">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-4 h-4 text-[var(--color-accent-success)]" />
                        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider">Your Strengths</h3>
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)] mb-3">You are consistently performing well in these topics.</p>
                      <div className="space-y-3">
                        {strongTopics.slice(0, 5).map((topic) => (
                          <div key={topic.concept} className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-bg-tertiary)]/30">
                            <span className="text-sm font-medium text-[var(--color-text-primary)] capitalize">{topic.concept}</span>
                            <Badge variant="success" size="sm">{topic.score}%</Badge>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </div>

                {/* Next Best Step */}
                {nextAction && (
                  <Card variant="elevated" padding="lg">
                    <div className="flex items-center gap-2 mb-4">
                      <ArrowUpRight className="w-4 h-4 text-[var(--color-accent-primary)]" />
                      <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider">Next Best Step</h3>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-bg-tertiary)]/30">
                      <div>
                        <p className="font-semibold text-[var(--color-text-primary)]">{nextAction.title}</p>
                        <p className="text-sm text-[var(--color-text-secondary)] mt-1">{nextAction.description}</p>
                      </div>
                      <Link to={nextAction.link}>
                        <Button variant="primary" size="sm" className="gap-1">{nextAction.action} <ArrowRight className="w-3 h-3" /></Button>
                      </Link>
                    </div>
                  </Card>
                )}
              </>
            )}

            {tabId === 'mastery' && (
              <>
                {/* Skill Tree */}
                <Card variant="elevated" padding="lg">
                  <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">OOP Skill Tree</h3>
                  <div className="flex flex-col items-center gap-1">
                    {curriculum.modules.map((module, i) => {
                      const moduleProgress = curriculumService.getModuleProgress(module.id, progress);
                      const moduleMastery = progress.moduleMastery[module.id] || 0;
                      const level = moduleMastery >= 90 ? 'mastered' : moduleMastery >= 70 ? 'strong' : moduleMastery >= 40 ? 'practicing' : moduleMastery >= 20 ? 'learning' : 'not-started';
                      const levelColors: Record<string, string> = { mastered: 'var(--color-accent-success)', strong: 'var(--color-accent-primary)', practicing: 'var(--color-accent-warning)', learning: 'var(--color-text-secondary)', 'not-started': 'var(--color-text-tertiary)' };
                      return (
                        <div key={module.id} className="w-full max-w-md">
                          <Link to={`/module/${module.id}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--color-bg-tertiary)]/30 transition-colors">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ backgroundColor: levelColors[level] }}>
                              {level === 'mastered' ? <CheckCircle className="w-5 h-5" /> : i + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-[var(--color-text-primary)]">{module.title}</span>
                                <Badge variant={level === 'mastered' ? 'success' : level === 'strong' ? 'primary' : level === 'practicing' ? 'warning' : 'outline'} size="sm">
                                  {moduleProgress}%
                                </Badge>
                              </div>
                            </div>
                          </Link>
                          {i < curriculum.modules.length - 1 && (
                            <div className="flex justify-center py-0.5"><div className="w-0.5 h-3 bg-[var(--color-border-primary)]" /></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </Card>

                {/* Knowledge Gaps */}
                {knowledgeGaps.length > 0 && (
                  <Card variant="elevated" padding="lg">
                    <div className="flex items-center gap-2 mb-4">
                      <Flag className="w-4 h-4 text-[var(--color-accent-error)]" />
                      <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider">Knowledge Gaps</h3>
                    </div>
                    <div className="space-y-3">
                      {knowledgeGaps.map((gap) => (
                        <div key={gap.concept} className="p-4 rounded-xl bg-[var(--color-bg-tertiary)]/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-[var(--color-text-primary)] capitalize">{gap.concept}</span>
                            <Badge variant="error" size="sm">{gap.score}%</Badge>
                          </div>
                          <p className="text-xs text-[var(--color-text-secondary)] mb-3">{gap.evidence.join(' · ')}</p>
                          <div className="flex gap-2">
                            <Link to="/practice"><Button variant="outline" size="sm" className="text-xs gap-1"><Target className="w-3 h-3" /> Practice</Button></Link>
                            <Link to="/3d"><Button variant="outline" size="sm" className="text-xs gap-1"><Eye className="w-3 h-3" /> Visualize</Button></Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </>
            )}

            {tabId === 'analytics' && (
              <>
                {/* XP Breakdown */}
                <Card variant="elevated" padding="lg">
                  <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">XP Breakdown</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Lessons', value: xpBreakdown.lessons, icon: BookOpen, color: '#3b82f6', link: '/learn' },
                      { label: 'Practice', value: xpBreakdown.practice, icon: Target, color: '#10b981', link: '/practice' },
                      { label: 'Debugging', value: xpBreakdown.debugging, icon: Bug, color: '#ef4444', link: '/debug' },
                      { label: '3D Labs', value: xpBreakdown.threeD, icon: Eye, color: '#8b5cf6', link: '/3d' },
                      { label: 'Challenges', value: xpBreakdown.challenges, icon: Trophy, color: '#f59e0b', link: '/challenges' },
                      { label: 'Exams', value: xpBreakdown.exams, icon: Award, color: '#06b6d4', link: '/quiz' },
                      { label: 'Achievements', value: xpBreakdown.achievements, icon: Star, color: '#fbbf24', link: '/achievements' },
                    ].map((item) => (
                      <Link key={item.label} to={item.link} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)]/30 transition-colors group">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}12` }}>
                          <item.icon className="w-4 h-4" style={{ color: item.color }} />
                        </div>
                        <span className="flex-1 text-sm text-[var(--color-text-primary)]">{item.label}</span>
                        <span className="text-sm font-mono text-[var(--color-xp-gold)]">+{item.value}</span>
                      </Link>
                    ))}
                  </div>
                </Card>

                {/* Practice Performance */}
                <div className="grid lg:grid-cols-2 gap-4">
                  <Card variant="elevated" padding="lg">
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">Practice Performance</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 rounded-xl bg-[var(--color-bg-tertiary)]/30">
                        <p className="text-2xl font-bold text-[var(--color-text-primary)]">{practiceStats.attempted}</p>
                        <p className="text-xs text-[var(--color-text-secondary)]">Attempted</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-[var(--color-bg-tertiary)]/30">
                        <p className="text-2xl font-bold text-[var(--color-accent-success)]">{practiceStats.accuracy}%</p>
                        <p className="text-xs text-[var(--color-text-secondary)]">Accuracy</p>
                      </div>
                    </div>
                    {Object.keys(practiceStats.byTopic).length > 0 && (
                      <div className="space-y-2">
                        {Object.entries(practiceStats.byTopic).slice(0, 5).map(([topic, data]) => (
                          <div key={topic} className="flex items-center justify-between">
                            <span className="text-sm text-[var(--color-text-primary)] capitalize">{topic}</span>
                            <span className="text-xs font-mono text-[var(--color-text-tertiary)]">{data.accuracy}%</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>

                  <Card variant="elevated" padding="lg">
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">Debugging Skill</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 rounded-xl bg-[var(--color-bg-tertiary)]/30">
                        <p className="text-2xl font-bold text-[var(--color-text-primary)]">{debugStats.accuracy}%</p>
                        <p className="text-xs text-[var(--color-text-secondary)]">Accuracy</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-[var(--color-bg-tertiary)]/30">
                        <p className="text-2xl font-bold text-[var(--color-accent-success)]">{debugStats.firstTry}%</p>
                        <p className="text-xs text-[var(--color-text-secondary)]">First Try</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--color-text-primary)]">Challenges Solved</span>
                        <span className="text-sm font-mono text-[var(--color-text-tertiary)]">{debugStats.solved}/{debugStats.total}</span>
                      </div>
                    </div>
                    <Link to="/debug"><Button variant="outline" size="sm" className="mt-4 gap-1"><Bug className="w-3 h-3" /> Open Debug Lab</Button></Link>
                  </Card>
                </div>

                {/* Exam & Assessment */}
                <Card variant="elevated" padding="lg">
                  <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">Assessment Performance</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 rounded-xl bg-[var(--color-bg-tertiary)]/30">
                      <p className="text-2xl font-bold text-[var(--color-text-primary)]">{examStats.totalExams}</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">Exams Taken</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-[var(--color-bg-tertiary)]/30">
                      <p className="text-2xl font-bold text-[var(--color-accent-primary)]">{examStats.averageScore}%</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">Avg Score</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-[var(--color-bg-tertiary)]/30">
                      <p className="text-2xl font-bold text-[var(--color-accent-success)]">{examStats.bestScore}%</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">Best Score</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-[var(--color-bg-tertiary)]/30">
                      <p className="text-2xl font-bold text-[var(--color-text-primary)]">{examStats.questionsSolved}</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">Questions Solved</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Link to="/assessment"><Button variant="outline" size="sm" className="gap-1"><Award className="w-3 h-3" /> Assessment Center</Button></Link>
                    <Link to="/quiz"><Button variant="outline" size="sm" className="gap-1"><Award className="w-3 h-3" /> Quiz Center</Button></Link>
                  </div>
                </Card>

                {/* Recent Activity */}
                <Card variant="elevated" padding="lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider">Recent Activity</h3>
                    <Calendar className="w-4 h-4 text-[var(--color-text-tertiary)]" />
                  </div>
                  {activityHistory.length > 0 ? (
                    <div className="space-y-2">
                      {activityHistory.map((act) => (
                        <div key={act.id} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--color-bg-tertiary)]/30">
                          <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-primary)]/10 flex items-center justify-center flex-shrink-0">
                            <Zap className="w-4 h-4 text-[var(--color-xp-gold)]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">{act.title}</p>
                            <p className="text-xs text-[var(--color-text-tertiary)]">{formatRelativeTime(act.timestamp)} · +{act.xp} XP</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[var(--color-text-secondary)] text-center py-6">Your learning journey will appear here.</p>
                  )}
                </Card>
              </>
            )}

            {tabId === 'goals' && (
              <>
                {/* Daily Challenge */}
                <Card variant="elevated" padding="lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-4 h-4 text-[var(--color-xp-gold)]" />
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider">Daily OOP Challenge</h3>
                  </div>
                  <p className="text-[var(--color-text-primary)] mb-3">{dailyChallenge.question}</p>
                  {dailyChallenge.options && (
                    <div className="space-y-2">
                      {dailyChallenge.options.map((opt, i) => (
                        <div key={i} className="p-3 rounded-lg border border-[var(--color-border-primary)] text-sm text-[var(--color-text-secondary)]">
                          {String.fromCharCode(65 + i)}. {opt}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-3 p-3 rounded-lg bg-[var(--color-accent-success)]/10 border border-[var(--color-accent-success)]/20">
                    <p className="text-sm font-medium text-[var(--color-accent-success)]">Answer: {dailyChallenge.answer}</p>
                  </div>
                </Card>

                {/* Weekly Challenge */}
                <Card variant="elevated" padding="lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="w-4 h-4 text-[var(--color-accent-warning)]" />
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider">Weekly Architect Mission</h3>
                  </div>
                  <div className="space-y-3">
                    {weeklyChallenge.targets.map((t, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-[var(--color-text-primary)]">{t.label}</span>
                          <span className="text-xs font-mono text-[var(--color-text-tertiary)]">{t.current}/{t.target}</span>
                        </div>
                        <ProgressBar value={t.current} max={t.target} size="sm" variant={t.current >= t.target ? 'success' : 'primary'} />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-[var(--color-border-primary)]">
                    <span className="text-sm text-[var(--color-text-secondary)]">Reward</span>
                    <Badge variant={weeklyChallenge.completed ? 'success' : 'outline'} size="sm">+{weeklyChallenge.rewardXp} XP</Badge>
                  </div>
                </Card>

                {/* Learning Goal */}
                <Card variant="elevated" padding="lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Flag className="w-4 h-4 text-[var(--color-accent-primary)]" />
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider">My Goal</h3>
                  </div>
                  {learningGoal ? (
                    <div>
                      <p className="font-medium text-[var(--color-text-primary)]">{learningGoal.title}</p>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-1">{learningGoal.description}</p>
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-[var(--color-text-secondary)]">{learningGoal.current}/{learningGoal.target}</span>
                          <span className="text-sm text-[var(--color-text-secondary)]">{Math.round((learningGoal.current / learningGoal.target) * 100)}%</span>
                        </div>
                        <ProgressBar value={learningGoal.current} max={learningGoal.target} size="md" variant={learningGoal.completed ? 'success' : 'primary'} />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-[var(--color-text-secondary)] mb-3">Set a learning goal to stay focused.</p>
                      <Button variant="outline" size="sm" onClick={() => gamificationService.setLearningGoal('Complete OOP Foundation', 'Finish all 15 modules', 15, 'modules')}>
                        Set Goal: Complete All Modules
                      </Button>
                    </div>
                  )}
                </Card>

                {/* Weekly Activity */}
                <Card variant="elevated" padding="lg">
                  <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">Weekly Activity</h3>
                  <div className="flex justify-between">
                    {weekActivity.map((d) => (
                      <div key={d.day} className="flex flex-col items-center gap-2">
                        <div className={cn('w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium', d.active ? 'bg-[var(--color-accent-success)] text-white' : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)]')}>
                          {d.active ? <CheckCircle className="w-5 h-5" /> : <span className="w-2 h-2 rounded-full bg-[var(--color-text-tertiary)]" />}
                        </div>
                        <span className="text-xs text-[var(--color-text-tertiary)]">{d.day}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}
          </motion.div>
        )}
      </Tabs>
    </div>
  );
}
