import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Lock, Trophy, Flame, Target, Brain, Zap } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Card, Badge, ProgressBar, Tabs, LucideIcon } from '@/components/ui';
import { progressService } from '@/services/progressService';
import { staggerChildren, slideUp } from '@/utils/motion';
import { motion as fm } from 'framer-motion';
import type { UserProgress } from '@/types';
import type { Achievement } from '@/types';

const categories = [
  { id: 'all', label: 'All', icon: Award },
  { id: 'progress', label: 'Progress', icon: Target },
  { id: 'mastery', label: 'Mastery', icon: Brain },
  { id: 'streak', label: 'Streak', icon: Flame },
  { id: 'challenge', label: 'Challenges', icon: Zap },
  { id: 'special', label: 'Special', icon: Trophy },
];

const rarityColors: Record<string, string> = {
  common: 'text-[var(--color-text-tertiary)] border-[var(--color-border-primary)]',
  rare: 'text-[var(--color-accent-primary)] border-[var(--color-accent-primary)]/30',
  epic: 'text-[var(--color-accent-secondary)] border-[var(--color-accent-secondary)]/30',
  legendary: 'text-[var(--color-xp-gold)] border-[var(--color-xp-gold)]/30',
};

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    progress: '#3b82f6',
    mastery: '#8b5cf6',
    streak: '#f59e0b',
    challenge: '#ef4444',
    special: '#fbbf24',
  };
  return colors[category] || '#6366f1';
}

function getAchievementProgress(achievement: Achievement, progress: UserProgress): number {
  const { condition } = achievement;
  switch (condition.type) {
    case 'lessons_completed':
      return Math.min(100, Math.round((Object.keys(progress.completedLessons).length / condition.value) * 100));
    case 'module_completed':
      return Math.min(100, Math.round((Object.keys(progress.completedModules).length / condition.value) * 100));
    case 'streak_days':
      return Math.min(100, Math.round((progress.currentStreak / condition.value) * 100));
    case 'xp_earned':
      return Math.min(100, Math.round((progress.totalXp / condition.value) * 100));
    case 'challenge_completed': {
      const solvedChallenges = Object.values(progress.challengeScores).filter(
        (c: unknown) => (c as { completedAt?: unknown }).completedAt
      ).length;
      return Math.min(100, Math.round((solvedChallenges / condition.value) * 100));
    }
    case 'perfect_score':
      return Object.values(progress.quizScores).some(
        (q: unknown) => (q as { bestScore?: number }).bestScore === 100
      ) ? 100 : 0;
    default:
      return 0;
  }
}

export function AchievementsPage() {
  const [progress, setProgress] = React.useState<UserProgress>(() => progressService.getProgress());
  const [achievements, setAchievements] = React.useState<Achievement[]>(() => progressService.getAchievements());

  React.useEffect(() => {
    // Re-load after mount to pick up any newly unlocked achievements
    setProgress(progressService.getProgress());
    setAchievements(progressService.getAchievements());
  }, []);

  const unlockedCount = achievements.filter(a => a.unlockedAt).length;
  const totalXpFromAchievements = achievements.filter(a => a.unlockedAt).reduce((sum, a) => sum + a.xpReward, 0);

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <Badge variant="primary" size="md" className="mb-3">Achievements</Badge>
            <h1 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">Your Accomplishments</h1>
            <p className="text-[var(--color-text-secondary)] mt-1">Earn rewards for your learning milestones</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-[var(--color-text-tertiary)]">
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              {unlockedCount}/{achievements.length} unlocked
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-[var(--color-xp-gold)]" />
              {totalXpFromAchievements} XP earned
            </span>
          </div>
        </div>
      </motion.div>

      <Tabs tabs={categories} variant="pills">
        {(tabId) => (
          <fm.div variants={staggerChildren(0.05)} initial="hidden" animate="visible" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements
                .filter(a => tabId === 'all' || a.category === tabId)
                .sort((a, b) => {
                  if (a.unlockedAt && !b.unlockedAt) return -1;
                  if (!a.unlockedAt && b.unlockedAt) return 1;
                  return 0;
                })
                .map((achievement) => (
                  <fm.div key={achievement.id} variants={slideUp}>
                    <Card
                      variant={achievement.unlockedAt ? 'elevated' : 'outlined'}
                      padding="lg"
                      className={cn(
                        'h-full transition-all relative overflow-hidden',
                        achievement.unlockedAt ? 'card-glow-hover' : 'opacity-60'
                      )}
                    >
                      {/* Rarity badge */}
                      <div className="absolute top-4 right-4">
                        <Badge variant={achievement.rarity} size="sm" className={rarityColors[achievement.rarity]}>
                          {achievement.rarity.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="relative z-10">
                        <div className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                          achievement.unlockedAt
                            ? `bg-[${getCategoryColor(achievement.category)}]/12`
                            : 'bg-[var(--color-bg-tertiary)]'
                        )}>
                          {achievement.unlockedAt ? (
                            <LucideIcon icon={achievement.icon} className="w-6 h-6" style={{ color: getCategoryColor(achievement.category) }} />
                          ) : (
                            <Lock className="w-6 h-6 text-[var(--color-text-tertiary)]" />
                          )}
                        </div>

                        <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">{achievement.title}</h3>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-3">{achievement.description}</p>

                        {achievement.unlockedAt ? (
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-[var(--color-xp-gold)]" />
                            <span className="text-sm font-medium text-[var(--color-xp-gold)]">+{achievement.xpReward} XP</span>
                          </div>
                        ) : (
                          <>
                            <ProgressBar value={getAchievementProgress(achievement, progress)} max={100} size="sm" variant="default" className="mb-2" />
                            <div className="flex items-center justify-between text-xs text-[var(--color-text-tertiary)]">
                              <span>{getAchievementProgress(achievement, progress)}% complete</span>
                              <span className="text-[var(--color-xp-gold)]">+{achievement.xpReward} XP</span>
                            </div>
                          </>
                        )}
                      </div>
                    </Card>
                  </fm.div>
                ))}
            </div>
          </fm.div>
        )}
      </Tabs>
    </div>
  );
}
