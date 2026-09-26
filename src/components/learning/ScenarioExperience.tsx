import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { ScenarioCard } from '@/components/cards';
import { Badge, Button } from '@/components/ui';

interface ScenarioExperienceProps {
  title?: string;
  scenario: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  className?: string;
}

export function ScenarioExperience({
  title = 'SCENARIO',
  scenario,
  options,
  correctAnswer,
  explanation,
  className,
}: ScenarioExperienceProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (option: string) => {
    if (submitted) return;
    setSelected(option);
  };

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
  };

  const isCorrect = submitted && selected === correctAnswer;

  return (
    <ScenarioCard className={className}>
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <Badge variant="secondary" size="sm">{title}</Badge>
        <span className="text-xs text-[var(--color-text-tertiary)]">Apply OOP reasoning</span>
      </div>

      {/* Scenario Text */}
      <p className="text-[var(--color-text-primary)] leading-relaxed mb-6">{scenario}</p>

      {/* Options */}
      <div className="space-y-2.5" role="listbox" aria-label="Scenario options">
        {options.map((option, index) => {
          const isSelected = selected === option;
          const showResult = submitted;
          const correct = option === correctAnswer;
          const incorrect = showResult && isSelected && !correct;

          return (
            <motion.button
              key={option}
              type="button"
              role="option"
              aria-selected={isSelected}
              disabled={submitted}
              onClick={() => handleSelect(option)}
              initial={false}
              animate={{
                scale: isSelected && !showResult ? 1.01 : 1,
                borderColor: showResult && correct
                  ? 'rgb(16, 185, 129)'
                  : incorrect
                    ? 'rgb(239, 68, 68)'
                    : isSelected
                      ? 'rgb(59, 130, 246)'
                      : 'rgb(45, 58, 82)',
              }}
              whileHover={!submitted ? { scale: 1.01 } : undefined}
              whileTap={!submitted ? { scale: 0.99 } : undefined}
              transition={{ duration: 0.15 }}
              className={cn(
                'w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
                !showResult && isSelected && 'bg-[var(--color-accent-primary)]/8',
                !showResult && !isSelected && 'bg-[var(--color-bg-input)] hover:bg-[var(--color-bg-tertiary)]/50',
                showResult && correct && 'bg-[var(--color-accent-success)]/8',
                incorrect && 'bg-[var(--color-accent-error)]/8'
              )}
            >
              <div className="flex items-start gap-3">
                <span className={cn(
                  'text-xs font-mono mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0',
                  showResult && correct && 'bg-[var(--color-accent-success)]/20 text-[var(--color-accent-success)]',
                  incorrect && 'bg-[var(--color-accent-error)]/20 text-[var(--color-accent-error)]',
                  !showResult && isSelected && 'bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)]',
                  !showResult && !isSelected && 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)]'
                )}>
                  {showResult && correct ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : incorrect ? (
                    <XCircle className="w-3.5 h-3.5" />
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </span>
                <span className={cn(
                  'flex-1 text-sm leading-relaxed',
                  showResult && correct && 'text-[var(--color-accent-success)] font-medium',
                  incorrect && 'text-[var(--color-accent-error)]',
                  !showResult && isSelected && 'text-[var(--color-text-primary)]',
                  !showResult && !isSelected && 'text-[var(--color-text-secondary)]'
                )}>
                  {option}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <Button
          variant="primary"
          className="mt-5 gap-2"
          disabled={!selected}
          onClick={handleSubmit}
        >
          Submit Answer
          <ArrowRight className="w-4 h-4" />
        </Button>
      )}

      {/* Explanation */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={cn(
              'mt-5 p-4 rounded-xl border',
              isCorrect
                ? 'border-[var(--color-accent-success)]/30 bg-[var(--color-accent-success)]/5'
                : 'border-[var(--color-accent-error)]/30 bg-[var(--color-accent-error)]/5'
            )}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-success)]" />
                ) : (
                  <XCircle className="w-4 h-4 text-[var(--color-accent-error)]" />
                )}
                <p className={cn(
                  'text-sm font-semibold',
                  isCorrect ? 'text-[var(--color-accent-success)]' : 'text-[var(--color-accent-error)]'
                )}>
                  {isCorrect ? 'Strong OOP reasoning.' : 'Not quite — review the relationship.'}
                </p>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScenarioCard>
  );
}
