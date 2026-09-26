import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button } from '@/components/ui';
import type { HintLevel } from '@/types';

interface HintSystemProps {
  hints: string[];
  onHintUsed?: (level: number) => void;
  xpPenalty?: boolean;
  className?: string;
}

const HINT_LABELS = ['Hint 1', 'Hint 2', 'Strong Hint', 'Solution'];

export function HintSystem({ hints, onHintUsed, xpPenalty = false, className }: HintSystemProps) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const maxHints = Math.min(hints.length, 4);
  const canRevealMore = revealedCount < maxHints;

  const handleRevealNext = () => {
    if (!canRevealMore) return;
    setRevealedCount(prev => prev + 1);
    setIsExpanded(true);
    onHintUsed?.(revealedCount + 1);
  };

  const revealedHints: HintLevel[] = hints.slice(0, revealedCount).map((text, i) => ({
    level: (i + 1) as 1 | 2 | 3 | 4,
    label: HINT_LABELS[i] || `Hint ${i + 1}`,
    text,
  }));

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
          <Lightbulb className="w-4 h-4 text-[var(--color-accent-warning)]" />
          <span>Hints ({revealedCount}/{maxHints})</span>
          {xpPenalty && revealedCount > 0 && (
            <span className="text-xs text-[var(--color-accent-error)]">(-{revealedCount * 5} XP)</span>
          )}
        </div>
        {canRevealMore && (
          <Button variant="ghost" size="sm" onClick={handleRevealNext} className="gap-1">
            Reveal {HINT_LABELS[revealedCount]}
            <ChevronRight className="w-3 h-3" />
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isExpanded && revealedHints.map((hint, index) => (
          <motion.div
            key={hint.level}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="overflow-hidden"
          >
            <div className={cn(
              'p-3 rounded-lg border text-sm',
              hint.level === 4
                ? 'bg-[var(--color-accent-warning)]/10 border-[var(--color-accent-warning)]/30'
                : 'bg-[var(--color-bg-input)] border-[var(--color-border-primary)]'
            )}>
              <span className={cn(
                'font-medium mr-2',
                hint.level === 4 ? 'text-[var(--color-accent-warning)]' : 'text-[var(--color-text-secondary)]'
              )}>
                {hint.label}:
              </span>
              <span className="text-[var(--color-text-primary)]">{hint.text}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
