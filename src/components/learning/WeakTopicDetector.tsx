import { motion } from 'framer-motion';
import { AlertTriangle, Target } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Card, Button } from '@/components/ui';
import type { WeakTopic } from '@/types';

interface WeakTopicDetectorProps {
  weakTopics: WeakTopic[];
  onReview?: (concept: string) => void;
  onPractice?: (concept: string) => void;
  onDebug?: (concept: string) => void;
  className?: string;
}

export function WeakTopicDetector({ weakTopics, onReview, onPractice, onDebug, className }: WeakTopicDetectorProps) {
  if (weakTopics.length === 0) return null;

  return (
    <Card variant="default" padding="lg" className={cn('space-y-4', className)}>
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-[var(--color-accent-warning)]" />
        <h3 className="font-semibold text-[var(--color-text-primary)]">Areas Needing Review</h3>
      </div>
      <p className="text-sm text-[var(--color-text-secondary)]">
        Based on your performance, these concepts may need revision.
      </p>
      <div className="space-y-3">
        {weakTopics.slice(0, 5).map((topic, i) => (
          <motion.div
            key={topic.concept}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-primary)]"
          >
            <div>
              <p className="font-medium text-[var(--color-text-primary)] capitalize">{topic.concept}</p>
              <p className="text-xs text-[var(--color-text-tertiary)]">
                Failed {topic.failedAttempts} time{topic.failedAttempts > 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex gap-1">
              {onReview && (
                <Button variant="ghost" size="sm" onClick={() => onReview(topic.concept)} className="text-xs gap-1">
                  <Target className="w-3 h-3" /> Review
                </Button>
              )}
              {onPractice && (
                <Button variant="ghost" size="sm" onClick={() => onPractice(topic.concept)} className="text-xs">
                  Practice
                </Button>
              )}
              {onDebug && (
                <Button variant="ghost" size="sm" onClick={() => onDebug(topic.concept)} className="text-xs">
                  Debug
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
