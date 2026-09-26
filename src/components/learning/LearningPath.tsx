import { motion } from 'framer-motion';
import { Lock, CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/helpers';
import type { LearningVisualState } from '@/components/cards';
import { staggerChildren, slideUp } from '@/utils/motion';

export interface LearningPathNode {
  id: string;
  title: string;
  state: LearningVisualState;
  subtitle?: string;
  onClick?: () => void;
}

interface LearningPathProps {
  nodes: LearningPathNode[];
  className?: string;
}

function NodeIcon({ state }: { state: LearningVisualState }) {
  if (state === 'locked') return <Lock className="w-4 h-4" aria-hidden="true" />;
  if (state === 'completed' || state === 'mastered') return <CheckCircle2 className="w-4 h-4" aria-hidden="true" />;
  return <Circle className="w-4 h-4" aria-hidden="true" />;
}

const nodeStyles: Record<LearningVisualState, { ring: string; icon: string; connector: string }> = {
  locked: {
    ring: 'bg-[var(--state-locked-bg)] text-[var(--color-text-tertiary)] border-[var(--state-locked-border)]',
    icon: '',
    connector: 'bg-[var(--color-border-primary)]',
  },
  available: {
    ring: 'bg-[var(--state-available-bg)] text-[var(--color-text-primary)] border-[var(--state-available-border)]',
    icon: '',
    connector: 'bg-[var(--color-border-primary)]',
  },
  inProgress: {
    ring: 'bg-[var(--state-progress-bg)] text-[var(--color-accent-primary)] border-[var(--state-progress-border)] shadow-[var(--shadow-glow)]',
    icon: '',
    connector: 'bg-[var(--color-accent-primary)]/30',
  },
  completed: {
    ring: 'bg-[var(--state-completed-bg)] text-[var(--color-accent-success)] border-[var(--state-completed-border)]',
    icon: '',
    connector: 'bg-[var(--color-accent-success)]/40',
  },
  mastered: {
    ring: 'bg-[var(--state-mastered-bg)] text-[var(--color-xp-gold)] border-[var(--state-mastered-border)] shadow-[var(--shadow-glow-gold)]',
    icon: '',
    connector: 'bg-[var(--color-xp-gold)]/30',
  },
  failed: {
    ring: 'bg-[var(--state-failed-bg)] text-[var(--color-accent-error)] border-[var(--state-failed-border)]',
    icon: '',
    connector: 'bg-[var(--color-border-primary)]',
  },
  needsReview: {
    ring: 'bg-[var(--state-review-bg)] text-[var(--color-accent-warning)] border-[var(--state-review-border)]',
    icon: '',
    connector: 'bg-[var(--color-border-primary)]',
  },
};

export function LearningPath({ nodes, className }: LearningPathProps) {
  return (
    <motion.ol
      variants={staggerChildren(0.06)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={cn('relative space-y-0', className)}
      aria-label="Learning path progression"
    >
      {nodes.map((node, index) => {
        const styles = nodeStyles[node.state];
        const isLast = index === nodes.length - 1;
        const isInteractive = node.state !== 'locked' && node.onClick;

        return (
          <motion.li key={node.id} variants={slideUp} className="relative flex gap-4 pb-4 last:pb-0">
            {/* Connector line */}
            {!isLast && (
              <span
                className={cn(
                  'absolute left-[18px] top-10 bottom-0 w-0.5 transition-colors',
                  styles.connector
                )}
                aria-hidden="true"
              />
            )}

            {/* Node circle */}
            <div
              className={cn(
                'relative z-10 w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300',
                styles.ring,
                isInteractive && 'cursor-pointer hover:scale-110'
              )}
              aria-label={`${node.title} — ${node.state}`}
              onClick={node.onClick}
              role={isInteractive ? 'button' : undefined}
              tabIndex={isInteractive ? 0 : undefined}
            >
              <NodeIcon state={node.state} />
            </div>

            {/* Content */}
            <div className={cn(
              'pt-1 min-w-0 flex-1 group',
              isInteractive && 'cursor-pointer'
            )} onClick={node.onClick}>
              <div className="flex items-center gap-2">
                <p className={cn(
                  'text-sm font-semibold tracking-wide transition-colors',
                  node.state === 'locked' ? 'text-[var(--color-text-tertiary)]' : 'text-[var(--color-text-primary)]',
                  isInteractive && 'group-hover:text-[var(--color-accent-primary)]'
                )}>
                  {node.title}
                </p>
                {isInteractive && (
                  <ChevronRight className="w-3.5 h-3.5 text-[var(--color-text-tertiary)] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
                )}
              </div>
              {node.subtitle && (
                <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5">
                  {node.subtitle}
                </p>
              )}
            </div>
          </motion.li>
        );
      })}
    </motion.ol>
  );
}
