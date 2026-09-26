import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, CheckCircle2, X } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button } from '@/components/ui';
import { modalEnter, fadeIn } from '@/utils/motion';

interface ScenarioOption {
  id: string;
  text: string;
  textUrdu: string;
}

interface ScenarioData {
  title: string;
  titleUrdu: string;
  description: string;
  descriptionUrdu: string;
  options: ScenarioOption[];
  correctAnswer: string;
  explanation: string;
  explanationUrdu: string;
}

interface ScenarioChallengeProps {
  scenario: ScenarioData | null;
  language: 'english' | 'romanUrdu';
  onAnswer: (answerId: string) => void;
  onDismiss: () => void;
  className?: string;
}

export function ScenarioChallenge({ scenario, language, onAnswer, onDismiss, className }: ScenarioChallengeProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  if (!scenario) return null;

  const handleSelect = (optionId: string) => {
    if (revealed) return;
    setSelectedId(optionId);
    setRevealed(true);
    onAnswer(optionId);
  };

  const isCorrect = selectedId === scenario.correctAnswer;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[var(--z-modal-backdrop)] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          variants={modalEnter}
          initial="hidden"
          animate="visible"
          className={cn(
            'relative w-full max-w-lg bg-[var(--color-bg-card)] rounded-2xl shadow-[var(--shadow-2xl)]',
            'border border-[var(--color-border-primary)] overflow-hidden',
            className
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border-primary)]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-info)]/15 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-[var(--color-accent-info)]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {language === 'romanUrdu' ? scenario.titleUrdu : scenario.title}
                </h3>
                <p className="text-[11px] text-[var(--color-text-tertiary)]">
                  {language === 'romanUrdu' ? scenario.descriptionUrdu : scenario.description}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onDismiss} aria-label="Close">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Options */}
          <div className="p-6 space-y-3">
            {scenario.options.map((option) => {
              const isSelected = selectedId === option.id;
              const isOptionCorrect = option.id === scenario.correctAnswer;
              const showResult = revealed;

              return (
                <motion.button
                  key={option.id}
                  variants={fadeIn}
                  whileHover={!revealed ? { scale: 1.01 } : undefined}
                  whileTap={!revealed ? { scale: 0.99 } : undefined}
                  onClick={() => handleSelect(option.id)}
                  disabled={revealed}
                  className={cn(
                    'w-full text-left p-3.5 rounded-xl border-2 transition-all duration-200',
                    !showResult && 'border-[var(--color-border-primary)] hover:border-[var(--color-border-secondary)] bg-[var(--color-bg-input)]/50 hover:bg-[var(--color-bg-tertiary)]',
                    showResult && isOptionCorrect && 'border-[var(--color-accent-success)] bg-[var(--color-accent-success)]/10',
                    showResult && isSelected && !isOptionCorrect && 'border-[var(--color-accent-error)] bg-[var(--color-accent-error)]/10',
                    showResult && !isSelected && !isOptionCorrect && 'border-[var(--color-border-primary)] opacity-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors',
                      showResult && isOptionCorrect && 'border-[var(--color-accent-success)] bg-[var(--color-accent-success)]',
                      showResult && isSelected && !isOptionCorrect && 'border-[var(--color-accent-error)] bg-[var(--color-accent-error)]',
                      !showResult && 'border-[var(--color-border-secondary)]'
                    )}>
                      {showResult && (isOptionCorrect || isSelected) && (
                        isOptionCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        ) : (
                          <X className="w-3 h-3 text-white" />
                        )
                      )}
                    </div>
                    <span className={cn(
                      'text-[13px]',
                      showResult && isOptionCorrect && 'text-[var(--color-accent-success)] font-medium',
                      showResult && isSelected && !isOptionCorrect && 'text-[var(--color-accent-error)]',
                      !showResult && 'text-[var(--color-text-secondary)]'
                    )}>
                      {language === 'romanUrdu' ? option.textUrdu : option.text}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className={cn(
                  'px-6 py-4 border-t',
                  isCorrect
                    ? 'bg-[var(--color-accent-success)]/5 border-[var(--color-accent-success)]/20'
                    : 'bg-[var(--color-accent-error)]/5 border-[var(--color-accent-error)]/20'
                )}>
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-success)]" />
                    ) : (
                      <X className="w-4 h-4 text-[var(--color-accent-error)]" />
                    )}
                    <span className={cn(
                      'text-xs font-bold',
                      isCorrect ? 'text-[var(--color-accent-success)]' : 'text-[var(--color-accent-error)]'
                    )}>
                      {isCorrect
                        ? (language === 'romanUrdu' ? 'Sahi Jawab!' : 'Correct!')
                        : (language === 'romanUrdu' ? 'Ghalat Jawab' : 'Incorrect')
                      }
                    </span>
                  </div>
                  <p className="text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                    {language === 'romanUrdu' ? scenario.explanationUrdu : scenario.explanation}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <div className="flex justify-end px-6 py-3 border-t border-[var(--color-border-primary)]">
            <Button variant="ghost" size="sm" onClick={onDismiss}>
              {language === 'romanUrdu' ? 'Band Karo' : 'Close'}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
