import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, CheckCircle, AlertTriangle, RotateCcw } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button, Card, Badge } from '@/components/ui';
import { HintSystem } from './HintSystem';
import { progressService } from '@/services/progressService';
import type { DebugChallenge } from '@/types';

interface DebuggingLabProps {
  challenge: DebugChallenge;
  onComplete?: (solved: boolean, attempts: number) => void;
  className?: string;
}

type DebugState = 'idle' | 'investigating' | 'hint-used' | 'correct' | 'incorrect' | 'solved' | 'solution-revealed';

const ERROR_TYPE_LABELS: Record<string, string> = {
  'syntax': 'Syntax Error',
  'compilation': 'Compilation Error',
  'runtime': 'Runtime Error',
  'logical': 'Logical Error',
  'oop-design': 'OOP Design Error',
  'access-modifier': 'Access Modifier Error',
  'inheritance': 'Inheritance Error',
  'polymorphism': 'Polymorphism Error',
  'constructor': 'Constructor Error',
  'interface': 'Interface Error',
};

export function DebuggingLab({ challenge, onComplete, className }: DebuggingLabProps) {
  const [state, setState] = useState<DebugState>('idle');
  const [attempts, setAttempts] = useState(0);
  const [userFix, setUserFix] = useState('');
  const [hintCount, setHintCount] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmitFix = useCallback(() => {
    if (!userFix.trim()) return;
    setAttempts(prev => prev + 1);

    const normalized = userFix.trim().toLowerCase().replace(/\s+/g, ' ');
    const solutionNormalized = challenge.solution.toLowerCase().replace(/\s+/g, ' ');

    const isCorrect = normalized.includes(solutionNormalized.substring(0, Math.min(50, solutionNormalized.length))) ||
      normalized.length > 20 && solutionNormalized.includes(normalized.substring(0, Math.min(30, normalized.length)));

    if (isCorrect) {
      setState('correct');
      setShowExplanation(true);
      const alreadySolved = progressService.getProgress().debugChallengeScores[challenge.id]?.solved;
      progressService.recordDebugChallenge(challenge.id, true, attempts + 1, 0);
      if (!alreadySolved && challenge.xpReward > 0) {
        progressService.addXp(challenge.xpReward);
        progressService.recordActivity('debug', `Debug Challenge: ${challenge.title}`, challenge.xpReward);
      }
      onComplete?.(true, attempts + 1);
    } else {
      setState('incorrect');
      progressService.recordDebugChallenge(challenge.id, false, attempts + 1, 0);
      if (attempts + 1 >= 3) {
        setShowExplanation(true);
      }
    }
  }, [userFix, challenge, attempts, onComplete]);

  const handleHintUsed = (level: number) => {
    setState('hint-used');
    setHintCount(level);
  };

  const handleShowSolution = () => {
    setState('solution-revealed');
    setShowExplanation(true);
    progressService.recordDebugChallenge(challenge.id, false, attempts, 0);
    onComplete?.(false, attempts);
  };

  const handleTryAgain = () => {
    setState('investigating');
    setUserFix('');
  };

  const handleReset = () => {
    setState('idle');
    setAttempts(0);
    setUserFix('');
    setHintCount(0);
    setShowExplanation(false);
  };

  return (
    <Card variant="default" padding="lg" className={cn('space-y-5', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bug className="w-5 h-5 text-[var(--color-accent-error)]" />
          <Badge variant="error" size="sm">Debug Challenge</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={challenge.difficulty} size="sm">{challenge.difficulty.toUpperCase()}</Badge>
          {challenge.errorType && (
            <Badge variant="outline" size="sm">{ERROR_TYPE_LABELS[challenge.errorType] || challenge.errorType}</Badge>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">{challenge.title}</h3>
        <p className="text-sm text-[var(--color-text-secondary)]">{challenge.description}</p>
      </div>

      {challenge.errorMessage && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 p-3 rounded-lg bg-[var(--color-accent-error)]/10 border border-[var(--color-accent-error)]/30"
        >
          <AlertTriangle className="w-4 h-4 text-[var(--color-accent-error)]" />
          <span className="font-mono text-sm text-[var(--color-accent-error)]">{challenge.errorMessage}</span>
        </motion.div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[var(--color-text-secondary)]">Buggy Code:</span>
          <span className="text-xs text-[var(--color-text-tertiary)]">Expected: {challenge.expectedBehavior}</span>
        </div>
        <pre className="bg-[var(--color-bg-input)] rounded-lg p-4 font-mono text-sm text-[var(--color-text-primary)] overflow-x-auto border border-[var(--color-border-primary)] max-h-[400px] overflow-y-auto">
          {challenge.buggyCode}
        </pre>
      </div>

      {state !== 'solution-revealed' && state !== 'correct' && (
        <div className="space-y-3">
          <textarea
            value={userFix}
            onChange={e => setUserFix(e.target.value)}
            placeholder="Write the fixed code or describe the fix..."
            className="w-full min-h-[100px] p-3 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-primary)] text-[var(--color-text-primary)] font-mono text-sm focus:border-[var(--color-border-focus)] focus:outline-none resize-y"
          />
          <div className="flex gap-2">
            <Button variant="primary" onClick={handleSubmitFix} disabled={!userFix.trim()}>
              Submit Fix
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset} className="gap-1">
              <RotateCcw className="w-3 h-3" /> Reset
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShowSolution}>
              Show Solution
            </Button>
          </div>
          <p className="text-xs text-[var(--color-text-tertiary)]">Attempts: {attempts} {hintCount > 0 && `| Hints used: ${hintCount}`}</p>
        </div>
      )}

      {state === 'idle' && (
        <HintSystem
          hints={challenge.hints}
          onHintUsed={handleHintUsed}
          xpPenalty
        />
      )}

      {state === 'hint-used' && !showExplanation && (
        <HintSystem
          hints={challenge.hints}
          onHintUsed={handleHintUsed}
          xpPenalty
        />
      )}

      {state === 'incorrect' && attempts < 3 && (
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-[var(--color-accent-error)]/5 border border-[var(--color-accent-error)]/30">
            <p className="text-sm text-[var(--color-accent-error)]">Not quite. Think about what's causing the error. ({3 - attempts} attempts remaining)</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleTryAgain}>Try Again</Button>
          <HintSystem
            hints={challenge.hints.slice(hintCount)}
            onHintUsed={handleHintUsed}
            xpPenalty
          />
        </div>
      )}

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 overflow-hidden"
          >
            <div className={cn(
              'p-4 rounded-lg border',
              state === 'correct'
                ? 'bg-[var(--color-accent-success)]/5 border-[var(--color-accent-success)]/30'
                : 'bg-[var(--color-accent-warning)]/5 border-[var(--color-accent-warning)]/30'
            )}>
              <div className="flex items-center gap-2 mb-2">
                {state === 'correct' ? (
                  <><CheckCircle className="w-4 h-4 text-[var(--color-accent-success)]" /><span className="font-semibold text-[var(--color-accent-success)]">Bug fixed!</span></>
                ) : (
                  <><AlertTriangle className="w-4 h-4 text-[var(--color-accent-warning)]" /><span className="font-semibold text-[var(--color-accent-warning)]">Solution revealed</span></>
                )}
              </div>
              <p className="text-sm text-[var(--color-text-secondary)]">{challenge.explanation}</p>
              {challenge.romanUrduExplanation && (
                <p className="mt-2 text-sm text-[var(--color-accent-secondary)]">{challenge.romanUrduExplanation}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[var(--color-accent-success)]">Correct Solution:</span>
              </div>
              <pre className="bg-[var(--color-bg-input)] rounded-lg p-4 font-mono text-sm text-[var(--color-text-primary)] overflow-x-auto border border-[var(--color-accent-success)]/30 max-h-[300px] overflow-y-auto">
                {challenge.solution}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
