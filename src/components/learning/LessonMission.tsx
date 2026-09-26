import { motion } from 'framer-motion';
import { Target, CheckCircle, Circle } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Card, Badge } from '@/components/ui';
import type { Mission } from '@/types';

interface LessonMissionProps {
  mission: Mission;
  className?: string;
}

export function LessonMission({ mission, className }: LessonMissionProps) {
  const completedCount = mission.objectives.filter(o => o.completed).length;
  const total = mission.objectives.length;
  const progress = total > 0 ? (completedCount / total) * 100 : 0;

  return (
    <Card variant="elevated" padding="lg" className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-[var(--color-accent-primary)]" />
          <h3 className="font-semibold text-[var(--color-text-primary)]">Mission</h3>
        </div>
        <Badge variant="outline" size="sm">+{mission.xpReward} XP</Badge>
      </div>

      <p className="text-sm text-[var(--color-accent-secondary)] font-medium italic">"{mission.description}"</p>

      <div className="space-y-2">
        {mission.objectives.map((obj, i) => (
          <motion.div
            key={obj.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3"
          >
            {obj.completed ? (
              <CheckCircle className="w-4 h-4 text-[var(--color-accent-success)] flex-shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-[var(--color-text-tertiary)] flex-shrink-0" />
            )}
            <span className={cn(
              'text-sm',
              obj.completed ? 'text-[var(--color-accent-success)] line-through' : 'text-[var(--color-text-secondary)]'
            )}>
              {obj.description}
            </span>
          </motion.div>
        ))}
      </div>

      <div>
        <div className="flex justify-between text-xs text-[var(--color-text-tertiary)] mb-1">
          <span>{completedCount}/{total} objectives</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-[var(--color-bg-input)] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
            className="h-full bg-[var(--color-accent-primary)] rounded-full"
          />
        </div>
      </div>
    </Card>
  );
}
