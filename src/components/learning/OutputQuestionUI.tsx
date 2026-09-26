import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Code2 } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button, Card, Badge } from '@/components/ui';
import type { OutputQuestion } from '@/types';

interface OutputQuestionUIProps {
  question: OutputQuestion;
  onComplete?: (correct: boolean) => void;
  className?: string;
}

type OutputState = 'idle' | 'selected' | 'correct' | 'incorrect' | 'revealed';

export function OutputQuestionUI({ question, onComplete, className }: OutputQuestionUIProps) {
  const [state, setState] = useState<OutputState>('idle');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleSelect = (answer: string) => {
    if (state !== 'idle') return;
    setSelectedAnswer(answer);
    const isCorrect = answer === question.correctOutput;
    setState(isCorrect ? 'correct' : 'incorrect');
    onComplete?.(isCorrect);
  };

  const handleTryAgain = () => {
    setState('idle');
    setSelectedAnswer(null);
  };

  const handleReveal = () => {
    setState('revealed');
    setSelectedAnswer(question.correctOutput);
  };

  return (
    <Card variant="default" padding="lg" className={cn('space-y-5', className)}>
      <div className="flex items-center gap-2">
        <Badge variant="primary" size="sm">Predict the Output</Badge>
        <Badge variant={question.difficulty} size="sm">{question.difficulty.toUpperCase()}</Badge>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Code2 className="w-4 h-4 text-[var(--color-accent-primary)]" />
          <span className="text-sm font-medium text-[var(--color-text-secondary)]">What will this code print?</span>
        </div>
        <pre className="bg-[var(--color-bg-input)] rounded-lg p-4 font-mono text-sm text-[var(--color-text-primary)] overflow-x-auto border border-[var(--color-border-primary)]">
          {question.code}
        </pre>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-[var(--color-text-primary)]">Select the output:</p>
        {question.options.map((option, i) => {
          const isSelected = selectedAnswer === option;
          const isCorrectAnswer = option === question.correctOutput;
          const showResult = state !== 'idle';

          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleSelect(option)}
              disabled={state !== 'idle' && state !== 'revealed'}
              className={cn(
                'w-full text-left p-3 rounded-lg border-2 transition-all font-mono text-sm',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
                showResult && isCorrectAnswer && 'bg-[var(--color-accent-success)]/10 border-[var(--color-accent-success)] text-[var(--color-accent-success)]',
                showResult && isSelected && !isCorrectAnswer && 'bg-[var(--color-accent-error)]/10 border-[var(--color-accent-error)] text-[var(--color-accent-error)]',
                !showResult && 'border-[var(--color-border-primary)] hover:border-[var(--color-accent-primary)]/50 text-[var(--color-text-primary)]'
              )}
            >
              <div className="flex items-center gap-3">
                <span className={cn(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs flex-shrink-0',
                  showResult && isCorrectAnswer && 'bg-[var(--color-accent-success)] border-[var(--color-accent-success)] text-white',
                  showResult && isSelected && !isCorrectAnswer && 'bg-[var(--color-accent-error)] border-[var(--color-accent-error)] text-white'
                )}>
                  {showResult && isCorrectAnswer ? <CheckCircle className="w-3 h-3" /> :
                   showResult && isSelected ? <XCircle className="w-3 h-3" /> :
                   String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{option}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {(state === 'correct' || state === 'incorrect') && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
            <div className={cn(
              'p-4 rounded-lg border',
              state === 'correct'
                ? 'bg-[var(--color-accent-success)]/5 border-[var(--color-accent-success)]/30'
                : 'bg-[var(--color-accent-error)]/5 border-[var(--color-accent-error)]/30'
            )}>
              <div className="flex items-center gap-2 mb-2">
                {state === 'correct' ? (
                  <><CheckCircle className="w-4 h-4 text-[var(--color-accent-success)]" /><span className="font-semibold text-[var(--color-accent-success)]">Correct!</span></>
                ) : (
                  <><XCircle className="w-4 h-4 text-[var(--color-accent-error)]" /><span className="font-semibold text-[var(--color-accent-error)]">Not quite. The output is: {question.correctOutput}</span></>
                )}
              </div>
              <p className="text-sm text-[var(--color-text-secondary)]">{question.explanation}</p>
              {question.romanUrduExplanation && (
                <p className="mt-2 text-sm text-[var(--color-accent-secondary)]">{question.romanUrduExplanation}</p>
              )}
            </div>
            {state === 'incorrect' && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleTryAgain}>Try Again</Button>
                <Button variant="ghost" size="sm" onClick={handleReveal}>Reveal Answer</Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
