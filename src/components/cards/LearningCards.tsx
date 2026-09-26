import type { ReactNode } from 'react';
import { Lock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Card, Badge, LucideIcon, ProgressBar } from '@/components/ui';
import type { LucideIcon as LucideIconComponent } from 'lucide-react';

export type LearningVisualState = 'locked' | 'available' | 'inProgress' | 'completed' | 'mastered' | 'failed' | 'needsReview';

const stateRing: Record<LearningVisualState, string> = {
  locked: 'opacity-60 border-[var(--state-locked-border)]',
  available: 'border-[var(--state-available-border)]',
  inProgress: 'border-[var(--state-progress-border)] shadow-[var(--shadow-glow)]',
  completed: 'border-[var(--state-completed-border)]',
  mastered: 'border-[var(--state-mastered-border)] shadow-[var(--shadow-glow-accent)]',
  failed: 'border-[var(--state-failed-border)]',
  needsReview: 'border-[var(--state-review-border)]',
};

interface BaseCardProps {
  children: ReactNode;
  className?: string;
  state?: LearningVisualState;
  selected?: boolean;
  hover?: boolean;
}

function BaseLearningCard({ children, className, state = 'available', selected, hover = true }: BaseCardProps) {
  return (
    <Card
      variant="outlined"
      padding="lg"
      hover={hover}
      className={cn(
        'relative transition-all duration-200 border-2',
        stateRing[state],
        selected && 'ring-2 ring-[var(--color-border-focus)]',
        className
      )}
    >
      {children}
    </Card>
  );
}

export function ModuleCard({
  title,
  description,
  icon,
  progress,
  state,
  badge,
  className,
}: {
  title: string;
  description?: string;
  icon: LucideIconComponent | string;
  progress?: number;
  state?: LearningVisualState;
  badge?: string;
  className?: string;
}) {
  return (
    <BaseLearningCard state={state} className={className}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-primary)]/10 flex items-center justify-center shrink-0">
          {state === 'locked' ? (
            <Lock className="w-5 h-5 text-[var(--color-text-tertiary)]" aria-label="Locked" />
          ) : (
            <LucideIcon icon={icon} className="w-6 h-6 text-[var(--color-accent-primary)]" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-[var(--color-text-primary)] truncate">{title}</h3>
            {badge && <Badge variant="outline" size="sm">{badge}</Badge>}
            {state === 'completed' && <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-success)]" aria-label="Completed" />}
          </div>
          {description && <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">{description}</p>}
          {progress != null && (
            <ProgressBar value={progress} max={100} size="sm" variant="primary" className="mt-3" />
          )}
        </div>
      </div>
    </BaseLearningCard>
  );
}

export function MissionCard({
  title,
  subtitle,
  xp,
  progress,
  className,
}: {
  title: string;
  subtitle: string;
  xp?: number;
  progress?: number;
  className?: string;
}) {
  return (
    <BaseLearningCard state="inProgress" className={className}>
      <p className="text-xs tracking-widest text-[var(--color-accent-primary)] mb-2">CURRENT MISSION</p>
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</h3>
      <p className="text-sm text-[var(--color-text-secondary)] mt-1">{subtitle}</p>
      {progress != null && <ProgressBar value={progress} max={100} size="sm" variant="xp" className="mt-4" />}
      {xp != null && (
        <p className="text-sm text-[var(--color-xp-gold)] mt-3 font-medium">+{xp} XP available</p>
      )}
    </BaseLearningCard>
  );
}

export function StatCard({ label, value, hint, className }: { label: string; value: string; hint?: string; className?: string }) {
  return (
    <Card variant="elevated" padding="lg" className={className}>
      <p className="text-sm text-[var(--color-text-tertiary)]">{label}</p>
      <p className="text-2xl font-bold text-[var(--color-text-primary)] mt-1">{value}</p>
      {hint && <p className="text-xs text-[var(--color-text-secondary)] mt-2">{hint}</p>}
    </Card>
  );
}

export function CodeCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Card variant="default" padding="none" className={cn('overflow-hidden border-[var(--color-border-primary)]', className)}>
      {children}
    </Card>
  );
}

export function DebugCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <BaseLearningCard state="needsReview" hover className={cn('bg-[var(--color-bg-input)]/50', className)}>
      {children}
    </BaseLearningCard>
  );
}

export function AchievementCard({ children, className, unlocked }: { children: ReactNode; className?: string; unlocked?: boolean }) {
  return (
    <BaseLearningCard state={unlocked ? 'mastered' : 'locked'} hover={unlocked} className={className}>
      {children}
    </BaseLearningCard>
  );
}

export function ChallengeCard({ children, className }: { children: ReactNode; className?: string }) {
  return <BaseLearningCard state="available" className={className}>{children}</BaseLearningCard>;
}

export function ProgressCard({ children, className }: { children: ReactNode; className?: string }) {
  return <Card variant="glass" padding="lg" className={className}>{children}</Card>;
}

export function ScenarioCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Card variant="elevated" padding="lg" className={cn('border-l-4 border-l-[var(--color-accent-secondary)]', className)}>
      {children}
    </Card>
  );
}

export function LearningCard(props: BaseCardProps) {
  return <BaseLearningCard {...props} />;
}

export function StandardCard({ children, className }: { children: ReactNode; className?: string }) {
  return <Card variant="default" padding="lg" className={className}>{children}</Card>;
}
