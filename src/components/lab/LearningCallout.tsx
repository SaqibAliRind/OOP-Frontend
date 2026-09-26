import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Info, Star, AlertTriangle, Lightbulb, BookOpen, X, ChevronDown, ChevronUp, GraduationCap, MessageSquare, Briefcase, Scale } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button } from '@/components/ui';
import { slideUp } from '@/utils/motion';
import type { LearningCallout as LearningCalloutType } from '@/types/oopLab';

interface LearningCalloutProps {
  callout: LearningCalloutType | null;
  language: 'english' | 'romanUrdu';
  onDismiss: () => void;
  className?: string;
}

const CALLOUT_CONFIG = {
  why: {
    icon: HelpCircle,
    color: 'var(--color-accent-primary)',
    bg: 'var(--color-accent-primary)',
    border: 'var(--color-accent-primary)',
    label: 'WHY',
  },
  what: {
    icon: Info,
    color: 'var(--color-accent-info)',
    bg: 'var(--color-accent-info)',
    border: 'var(--color-accent-info)',
    label: 'WHAT',
  },
  remember: {
    icon: Star,
    color: 'var(--color-accent-warning)',
    bg: 'var(--color-accent-warning)',
    border: 'var(--color-accent-warning)',
    label: 'REMEMBER',
  },
  mistake: {
    icon: AlertTriangle,
    color: 'var(--color-accent-error)',
    bg: 'var(--color-accent-error)',
    border: 'var(--color-accent-error)',
    label: 'MISTAKE',
  },
  tip: {
    icon: Lightbulb,
    color: 'var(--color-accent-success)',
    bg: 'var(--color-accent-success)',
    border: 'var(--color-accent-success)',
    label: 'TIP',
  },
  concept: {
    icon: BookOpen,
    color: 'var(--color-accent-tertiary)',
    bg: 'var(--color-accent-tertiary)',
    border: 'var(--color-accent-tertiary)',
    label: 'CONCEPT',
  },
  exam: {
    icon: GraduationCap,
    color: '#f59e0b',
    bg: '#f59e0b',
    border: '#f59e0b',
    label: 'EXAM TIP',
  },
  viva: {
    icon: MessageSquare,
    color: '#06b6d4',
    bg: '#06b6d4',
    border: '#06b6d4',
    label: 'VIVA TIP',
  },
  interview: {
    icon: Briefcase,
    color: '#8b5cf6',
    bg: '#8b5cf6',
    border: '#8b5cf6',
    label: 'INTERVIEW TIP',
  },
  'java-rule': {
    icon: Scale,
    color: '#ef4444',
    bg: '#ef4444',
    border: '#ef4444',
    label: 'JAVA RULE',
  },
} as const;

export function LearningCallout({ callout, language, onDismiss, className }: LearningCalloutProps) {
  const [expanded, setExpanded] = useState(false);

  if (!callout) return null;

  const config = CALLOUT_CONFIG[callout.type];
  const Icon = config.icon;
  const message = language === 'romanUrdu' ? callout.messageUrdu : callout.message;
  const expandedMessage = callout.expandable
    ? (language === 'romanUrdu' ? callout.expandedMessageUrdu : callout.expandedMessage)
    : null;

  return (
    <AnimatePresence>
      <motion.div
        variants={slideUp}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, y: 16, transition: { duration: 0.15 } }}
        className={cn(
          'rounded-xl border overflow-hidden shadow-[var(--shadow-lg)]',
          'bg-[var(--color-bg-card)]',
          className
        )}
        style={{ borderColor: `color-mix(in srgb, ${config.border} 40%, var(--color-border-primary))` }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border-primary)]">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ backgroundColor: `color-mix(in srgb, ${config.bg} 15%, transparent)` }}
            >
              <Icon className="w-3.5 h-3.5" style={{ color: config.color }} />
            </div>
            <span
              className="text-[10px] font-bold tracking-wider"
              style={{ color: config.color }}
            >
              {config.label}
            </span>
            <span className="text-xs font-semibold text-[var(--color-text-primary)]">
              {callout.title}
            </span>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onDismiss} aria-label="Dismiss callout">
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Message */}
        <div className="px-4 py-3">
          <p className="text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
            {message}
          </p>

          {/* Expandable */}
          {callout.expandable && expandedMessage && (
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="text-[13px] leading-relaxed text-[var(--color-text-tertiary)] mt-2 pt-2 border-t border-[var(--color-border-primary)]">
                    {expandedMessage}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Expand toggle */}
        {callout.expandable && expandedMessage && (
          <div className="px-4 pb-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-[11px] font-medium hover:underline"
              style={{ color: config.color }}
            >
              {expanded ? (
                <>
                  <ChevronUp className="w-3 h-3" />
                  {language === 'romanUrdu' ? 'Kam dikhain' : 'Show less'}
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3" />
                  {language === 'romanUrdu' ? 'Zyada dikhain' : 'Learn more'}
                </>
              )}
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
