import { motion } from 'framer-motion';
import { Trophy, ArrowRight, RotateCcw, Target } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button, Card, Badge } from '@/components/ui';
import type { LessonMasteryBreakdown } from '@/types';

interface LessonMasteryScreenProps {
  lessonTitle: string;
  moduleTitle: string;
  mastery: LessonMasteryBreakdown;
  xpEarned: number;
  onContinue?: () => void;
  onReviewWeak?: () => void;
  onRetry?: () => void;
  className?: string;
}

const MASTERY_LABELS: Record<string, { label: string; color: string }> = {
  understanding: { label: 'Understanding', color: 'var(--color-accent-primary)' },
  visualization: { label: 'Visualization', color: 'var(--color-accent-secondary)' },
  quickCheck: { label: 'Quick Check', color: 'var(--color-accent-success)' },
  scenario: { label: 'Scenario', color: 'var(--color-accent-warning)' },
  debugging: { label: 'Debugging', color: 'var(--color-accent-error)' },
  practice: { label: 'Practice', color: 'var(--color-xp-gold)' },
};

function getMasteryLevel(score: number): { label: string; color: string } {
  if (score >= 90) return { label: 'Mastered', color: 'var(--color-xp-gold)' };
  if (score >= 75) return { label: 'Strong', color: 'var(--color-accent-success)' };
  if (score >= 50) return { label: 'Practicing', color: 'var(--color-accent-warning)' };
  if (score >= 25) return { label: 'Learning', color: 'var(--color-accent-primary)' };
  return { label: 'Not Started', color: 'var(--color-text-tertiary)' };
}

export function LessonMasteryScreen({
  lessonTitle, moduleTitle, mastery, xpEarned, onContinue, onReviewWeak, onRetry, className
}: LessonMasteryScreenProps) {
  const level = getMasteryLevel(mastery.total);
  const hasWeakAreas = Object.entries(mastery)
    .filter(([key]) => key !== 'total')
    .some(([, val]) => val < 50);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card variant="elevated" padding="lg" className={cn('text-center space-y-6', className)}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 mx-auto rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${level.color}15` }}
        >
          <Trophy className="w-10 h-10" style={{ color: level.color }} />
        </motion.div>

        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Lesson Complete!</h2>
          <p className="text-[var(--color-text-secondary)] mt-1">{moduleTitle} &middot; {lessonTitle}</p>
        </div>

        <div className="flex items-center justify-center gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold" style={{ color: level.color }}>{mastery.total}%</p>
            <p className="text-sm text-[var(--color-text-secondary)]">Mastery</p>
            <Badge variant="outline" size="sm" className="mt-1">{level.label}</Badge>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[var(--color-xp-gold)]">+{xpEarned}</p>
            <p className="text-sm text-[var(--color-text-secondary)]">XP Earned</p>
          </div>
        </div>

        <div className="space-y-3 text-left max-w-md mx-auto">
          <p className="text-sm font-medium text-[var(--color-text-secondary)]">Skills Breakdown:</p>
          {(Object.keys(MASTERY_LABELS) as Array<keyof typeof MASTERY_LABELS>).map(key => {
            const config = MASTERY_LABELS[key];
            const value = (mastery as unknown as Record<string, number>)[key] || 0;
            return (
              <div key={key} className="flex items-center gap-3">
                <span className="text-xs w-24 text-[var(--color-text-secondary)]">{config.label}</span>
                <div className="flex-1 h-2 bg-[var(--color-bg-input)] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: config.color }}
                  />
                </div>
                <span className="text-xs w-8 text-right text-[var(--color-text-tertiary)]">{value}%</span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {onContinue && (
            <Button variant="primary" onClick={onContinue} className="gap-2">
              Next Lesson <ArrowRight className="w-4 h-4" />
            </Button>
          )}
          {hasWeakAreas && onReviewWeak && (
            <Button variant="outline" onClick={onReviewWeak} className="gap-2">
              <Target className="w-4 h-4" /> Review Weak Areas
            </Button>
          )}
          {onRetry && (
            <Button variant="ghost" onClick={onRetry} className="gap-2">
              <RotateCcw className="w-4 h-4" /> Retry Lesson
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
