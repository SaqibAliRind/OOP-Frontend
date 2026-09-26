import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button, Card, Badge } from '@/components/ui';
import type { ScenarioQuestion } from '@/types';

interface ScenarioChallengeUIProps {
  question: ScenarioQuestion;
  onComplete?: (correct: boolean) => void;
  showDifficulty?: boolean;
  className?: string;
}

type ScenarioState = 'idle' | 'selected' | 'submitted' | 'correct' | 'incorrect' | 'revealed';

export function ScenarioChallengeUI({ question, onComplete, showDifficulty = true, className }: ScenarioChallengeUIProps) {
  const [state, setState] = useState<ScenarioState>('idle');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setState('submitted');
    const isCorrect = Array.isArray(question.correctAnswer)
      ? question.correctAnswer.includes(selectedAnswer)
      : question.correctAnswer === selectedAnswer;
    setState(isCorrect ? 'correct' : 'incorrect');
    onComplete?.(isCorrect);
  };

  const handleTryAgain = () => {
    setState('idle');
    setSelectedAnswer(null);
  };

  return (
    <Card variant="default" padding="lg" className={cn('space-y-5', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" size="sm">Real-World Mission</Badge>
          {showDifficulty && (
            <Badge variant={question.difficulty} size="sm">{question.difficulty.toUpperCase()}</Badge>
          )}
        </div>
        {question.relatedConcepts.length > 0 && (
          <div className="flex gap-1">
            {question.relatedConcepts.slice(0, 2).map(c => (
              <Badge key={c} variant="outline" size="sm">{c}</Badge>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)]">
        <p className="text-sm font-medium text-[var(--color-accent-primary)] mb-2">📋 Scenario</p>
        <p className="text-[var(--color-text-secondary)] leading-relaxed">{question.scenario}</p>
      </div>

      {question.prompt && (
        <p className="text-sm text-[var(--color-text-secondary)] italic">{question.prompt}</p>
      )}

      <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{question.question}</h3>

      <div className="space-y-2">
        {question.options?.map((option, i) => {
          const isSelected = selectedAnswer === option;
          const isCorrectAnswer = Array.isArray(question.correctAnswer)
            ? question.correctAnswer.includes(option)
            : question.correctAnswer === option;
          const showResult = state !== 'idle';

          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => state === 'idle' && setSelectedAnswer(option)}
              disabled={state !== 'idle'}
              className={cn(
                'w-full text-left p-4 rounded-lg border-2 transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
                showResult && isCorrectAnswer && 'bg-[var(--color-accent-success)]/10 border-[var(--color-accent-success)] text-[var(--color-accent-success)]',
                showResult && isSelected && !isCorrectAnswer && 'bg-[var(--color-accent-error)]/10 border-[var(--color-accent-error)] text-[var(--color-accent-error)]',
                !showResult && isSelected && 'border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/5',
                !showResult && !isSelected && 'border-[var(--color-border-primary)] hover:border-[var(--color-accent-primary)]/50'
              )}
            >
              <div className="flex items-start gap-3">
                <span className={cn(
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-mono flex-shrink-0 mt-0.5',
                  showResult && isCorrectAnswer && 'bg-[var(--color-accent-success)] border-[var(--color-accent-success)] text-white',
                  showResult && isSelected && !isCorrectAnswer && 'bg-[var(--color-accent-error)] border-[var(--color-accent-error)] text-white',
                  !showResult && isSelected && 'border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/10',
                  !showResult && !isSelected && 'border-[var(--color-border-secondary)]'
                )}>
                  {showResult && isCorrectAnswer ? <CheckCircle className="w-3.5 h-3.5" /> :
                   showResult && isSelected ? <XCircle className="w-3.5 h-3.5" /> :
                   String.fromCharCode(65 + i)}
                </span>
                <span className={cn(
                  'flex-1 text-sm leading-relaxed',
                  showResult && isCorrectAnswer && 'font-medium',
                  !showResult && isSelected && 'text-[var(--color-text-primary)]'
                )}>{option}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {state === 'idle' && (
        <Button variant="primary" onClick={handleSubmit} disabled={!selectedAnswer} className="gap-2">
          Submit Answer <ArrowRight className="w-4 h-4" />
        </Button>
      )}

      <AnimatePresence>
        {(state === 'correct' || state === 'incorrect') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 overflow-hidden"
          >
            <div className={cn(
              'p-4 rounded-lg border',
              state === 'correct'
                ? 'border-[var(--color-accent-success)]/30 bg-[var(--color-accent-success)]/5'
                : 'border-[var(--color-accent-error)]/30 bg-[var(--color-accent-error)]/5'
            )}>
              <div className="flex items-center gap-2 mb-2">
                {state === 'correct' ? (
                  <><CheckCircle className="w-4 h-4 text-[var(--color-accent-success)]" /><span className="font-semibold text-[var(--color-accent-success)]">Strong OOP reasoning!</span></>
                ) : (
                  <><XCircle className="w-4 h-4 text-[var(--color-accent-error)]" /><span className="font-semibold text-[var(--color-accent-error)]">Not quite — review the concept.</span></>
                )}
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{question.explanation}</p>
              {question.romanUrduExplanation && (
                <p className="mt-2 text-sm text-[var(--color-accent-secondary)]">{question.romanUrduExplanation}</p>
              )}
            </div>
            {state === 'incorrect' && (
              <Button variant="outline" size="sm" onClick={handleTryAgain} className="gap-1">
                <RotateCcw className="w-3 h-3" /> Try Again
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
