import { motion } from 'framer-motion';
import { Flame, Star, TrendingUp } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { ProgressRing } from '@/components/ui';

interface GamificationPanelProps {
  level: number;
  xp: number;
  xpToNext: number;
  streak?: number;
  masteryPercent?: number;
  className?: string;
  compact?: boolean;
}

export function GamificationPanel({
  level,
  xp,
  xpToNext,
  streak = 0,
  masteryPercent,
  className,
  compact = false,
}: GamificationPanelProps) {
  const levelProgress = Math.round((xp / (xp + xpToNext)) * 100);

  if (compact) {
    return (
      <div className={cn('rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)] p-3 shadow-[var(--shadow-sm)]', className)}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] tracking-[0.15em] font-semibold text-[var(--color-text-tertiary)] uppercase">
            OOP Level
          </span>
          <span className="font-display font-bold text-lg text-[var(--color-text-primary)]">
            {String(level).padStart(2, '0')}
          </span>
        </div>
        <div className="h-1.5 bg-[var(--color-bg-input)] rounded-full overflow-hidden mb-2">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[var(--color-xp-gold)] to-[var(--color-accent-warning)]"
            initial={{ width: 0 }}
            animate={{ width: `${levelProgress}%` }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-[var(--color-xp-gold)]">{xp.toLocaleString()} XP</span>
          <span className="text-[var(--color-text-tertiary)]">{levelProgress}%</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)] p-5 shadow-[var(--shadow-md)] relative overflow-hidden', className)}>
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,var(--glow-gold-soft),transparent)] opacity-50" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-[var(--color-xp-gold)]" />
          <span className="text-[10px] tracking-[0.2em] font-semibold text-[var(--color-text-tertiary)] uppercase">
            OOP Mastery
          </span>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative">
            <ProgressRing value={masteryPercent ?? levelProgress} size={80} strokeWidth={5} variant="xp" showValue />
            {masteryPercent !== undefined && masteryPercent >= 70 && (
              <div className="absolute inset-0 rounded-full skill-unlock-glow" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-xl font-display font-bold text-[var(--color-text-primary)]">
                Level {level}
              </span>
            </div>

            <div className="h-2 bg-[var(--color-bg-input)] rounded-full overflow-hidden mb-3">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[var(--color-xp-gold)] to-[var(--color-accent-warning)]"
                initial={{ width: 0 }}
                animate={{ width: `${levelProgress}%` }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              />
            </div>

            <div className="flex items-center gap-4 text-sm">
              <span className="inline-flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                <Star className="w-4 h-4 text-[var(--color-xp-gold)]" aria-hidden="true" />
                <span className="font-mono font-medium">{xp.toLocaleString()}</span>
                <span className="text-[var(--color-text-tertiary)]">XP</span>
              </span>
              {streak > 0 && (
                <span className="inline-flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                  <Flame className="w-4 h-4 text-[var(--color-accent-warning)]" aria-hidden="true" />
                  <span className="font-mono font-medium">{streak}</span>
                  <span className="text-[var(--color-text-tertiary)]">streak</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
