import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Code2, RotateCcw } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button, Card, Badge, Input } from '@/components/ui';
import { HintSystem } from './HintSystem';
import type { CodeCompletionQuestion } from '@/types';

interface CodeCompletionUIProps {
  question: CodeCompletionQuestion;
  onComplete?: (correct: boolean) => void;
  className?: string;
}

type CompletionState = 'idle' | 'correct' | 'incorrect' | 'revealed';

export function CodeCompletionUI({ question, onComplete, className }: CodeCompletionUIProps) {
  const [state, setState] = useState<CompletionState>('idle');
  const [userAnswer, setUserAnswer] = useState('');

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;
    const normalized = userAnswer.trim().toLowerCase().replace(/\s+/g, ' ');
    const isCorrect = question.acceptedAnswers.some(
      a => a.toLowerCase().replace(/\s+/g, ' ') === normalized
    );
    setState(isCorrect ? 'correct' : 'incorrect');
    onComplete?.(isCorrect);
  };

  const handleTryAgain = () => {
    setState('idle');
    setUserAnswer('');
  };

  const handleReveal = () => {
    setState('revealed');
    setUserAnswer(question.acceptedAnswers[0]);
  };

  const renderCode = () => {
    const parts = question.codeTemplate.split('__________');
    return (
      <pre className="bg-[var(--color-bg-input)] rounded-lg p-4 font-mono text-sm overflow-x-auto border border-[var(--color-border-primary)]">
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < parts.length - 1 && (
              <span className="inline-flex items-center min-w-[120px] mx-1 px-2 py-0.5 rounded border border-dashed border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/5">
                {state === 'revealed' ? (
                  <span className="text-[var(--color-accent-success)]">{question.acceptedAnswers[0]}</span>
                ) : (
                  <span className="text-[var(--color-accent-primary)] animate-pulse">???</span>
                )}
              </span>
            )}
          </span>
        ))}
      </pre>
    );
  };

  return (
    <Card variant="default" padding="lg" className={cn('space-y-5', className)}>
      <div className="flex items-center gap-2">
        <Badge variant="secondary" size="sm">Complete the Code</Badge>
        <Badge variant={question.difficulty} size="sm">{question.difficulty.toUpperCase()}</Badge>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Code2 className="w-4 h-4 text-[var(--color-accent-primary)]" />
          <span className="text-sm font-medium text-[var(--color-text-secondary)]">Fill in the blank:</span>
        </div>
        {renderCode()}
      </div>

      {state !== 'revealed' && (
        <div className="space-y-3">
          <Input
            label="Your Answer"
            value={userAnswer}
            onChange={e => setUserAnswer(e.target.value)}
            placeholder="Type your code here..."
            className="font-mono"
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          />
          <div className="flex gap-2">
            <Button variant="primary" onClick={handleSubmit} disabled={!userAnswer.trim() || state !== 'idle'}>
              Submit
            </Button>
            <Button variant="ghost" size="sm" onClick={handleReveal}>Reveal Answer</Button>
          </div>
        </div>
      )}

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
                  <><XCircle className="w-4 h-4 text-[var(--color-accent-error)]" /><span className="font-semibold text-[var(--color-accent-error)]">Not quite. Try again.</span></>
                )}
              </div>
              <p className="text-sm text-[var(--color-text-secondary)]">{question.explanation}</p>
              {question.romanUrduExplanation && (
                <p className="mt-2 text-sm text-[var(--color-accent-secondary)]">{question.romanUrduExplanation}</p>
              )}
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
      </AnimatePresence>

      {state === 'revealed' && (
        <div className="p-4 rounded-lg bg-[var(--color-accent-success)]/5 border border-[var(--color-accent-success)]/30">
          <p className="text-sm font-medium text-[var(--color-accent-success)] mb-1">Correct Answer:</p>
          <pre className="font-mono text-sm text-[var(--color-text-primary)]">{question.acceptedAnswers[0]}</pre>
          <p className="text-sm text-[var(--color-text-secondary)] mt-2">{question.explanation}</p>
        </div>
      )}

      {state === 'idle' && question.hints.length > 0 && (
        <HintSystem hints={question.hints} xpPenalty />
      )}
    </Card>
  );
}
