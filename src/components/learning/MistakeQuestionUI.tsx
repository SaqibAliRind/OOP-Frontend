import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button, Card, Badge } from '@/components/ui';
import { HintSystem } from './HintSystem';
import type { MistakeQuestion } from '@/types';

interface MistakeQuestionUIProps {
  question: MistakeQuestion;
  onComplete?: (correct: boolean) => void;
  className?: string;
}

type MistakeState = 'idle' | 'selected' | 'correct' | 'incorrect' | 'revealed';

export function MistakeQuestionUI({ question, onComplete, className }: MistakeQuestionUIProps) {
  const [state, setState] = useState<MistakeState>('idle');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(true);

  const possibleAnswers = question.possibleMistakes.includes(question.correctMistake)
    ? question.possibleMistakes
    : [question.correctMistake, ...question.possibleMistakes];

  const handleSubmit = (answer: string) => {
    if (state !== 'idle') return;
    setSelectedAnswer(answer);
    const isCorrect = answer === question.correctMistake;
    setState(isCorrect ? 'correct' : 'incorrect');
    onComplete?.(isCorrect);
  };

  const handleTryAgain = () => {
    setState('idle');
    setSelectedAnswer(null);
  };

  const handleReveal = () => {
    setState('revealed');
    setSelectedAnswer(question.correctMistake);
  };

  return (
    <Card variant="default" padding="lg" className={cn('space-y-5', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="error" size="sm">Mistake Lab</Badge>
          <Badge variant={question.difficulty} size="sm">{question.difficulty.toUpperCase()}</Badge>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setShowCode(!showCode)}>
          {showCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showCode ? 'Hide' : 'Show'} Code
        </Button>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">{question.title}</h3>
        <p className="text-sm text-[var(--color-text-secondary)]">{question.mistakeDescription}</p>
      </div>

      <AnimatePresence>
        {showCode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <pre className="bg-[var(--color-bg-input)] rounded-lg p-4 font-mono text-sm text-[var(--color-text-primary)] overflow-x-auto border border-[var(--color-border-primary)]">
              {question.code}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <p className="text-sm font-medium text-[var(--color-text-primary)] mb-3">
          {state === 'revealed' ? 'Correct Answer:' : 'What is wrong with this code?'}
        </p>
        <div className="space-y-2">
          {possibleAnswers.map((answer, i) => {
            const isSelected = selectedAnswer === answer;
            const isCorrectAnswer = answer === question.correctMistake;
            const showResult = state !== 'idle';

            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleSubmit(answer)}
                disabled={state !== 'idle' && state !== 'revealed'}
                className={cn(
                  'w-full text-left p-3 rounded-lg border-2 transition-all text-sm',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
                  showResult && isCorrectAnswer && 'bg-[var(--color-accent-success)]/10 border-[var(--color-accent-success)] text-[var(--color-accent-success)]',
                  showResult && isSelected && !isCorrectAnswer && 'bg-[var(--color-accent-error)]/10 border-[var(--color-accent-error)] text-[var(--color-accent-error)]',
                  !showResult && 'border-[var(--color-border-primary)] hover:border-[var(--color-accent-primary)]/50 text-[var(--color-text-primary)]'
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-mono flex-shrink-0">
                    {showResult && isCorrectAnswer ? <CheckCircle className="w-3.5 h-3.5" /> :
                     showResult && isSelected ? <XCircle className="w-3.5 h-3.5" /> :
                     String.fromCharCode(65 + i)}
                  </span>
                  <span>{answer}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {(state === 'correct' || state === 'incorrect') && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
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
                <><XCircle className="w-4 h-4 text-[var(--color-accent-error)]" /><span className="font-semibold text-[var(--color-accent-error)]">Not quite</span></>
              )}
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mb-2">{question.explanation}</p>
            {question.romanUrduExplanation && (
              <p className="text-sm text-[var(--color-accent-secondary)]">{question.romanUrduExplanation}</p>
            )}
          </div>

          <div className="p-4 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-primary)]">
            <p className="text-sm font-medium text-[var(--color-accent-success)] mb-2">How to fix:</p>
            <pre className="font-mono text-xs text-[var(--color-text-primary)] whitespace-pre-wrap">{question.correction}</pre>
          </div>

          {state === 'incorrect' && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleTryAgain} className="gap-1">
                <RotateCcw className="w-3 h-3" /> Try Again
              </Button>
              <Button variant="ghost" size="sm" onClick={handleReveal}>Reveal Answer</Button>
            </div>
          )}
        </motion.div>
      )}

      {state === 'revealed' && (
        <div className="p-4 rounded-lg bg-[var(--color-accent-warning)]/5 border border-[var(--color-accent-warning)]/30">
          <p className="text-sm font-medium text-[var(--color-accent-warning)] mb-2">Correct Answer:</p>
          <p className="text-sm text-[var(--color-text-primary)]">{question.correctMistake}</p>
          <p className="text-sm text-[var(--color-text-secondary)] mt-2">{question.explanation}</p>
        </div>
      )}

      {state === 'idle' && (
        <HintSystem
          hints={[question.mistakeDescription, ...question.possibleMistakes.slice(0, 2).map(m => `Consider: ${m}`)]}
          xpPenalty
        />
      )}
    </Card>
  );
}
