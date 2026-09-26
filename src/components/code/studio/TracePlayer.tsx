import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight, RotateCcw, ListTree } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button, Badge } from '@/components/ui';
import type { ExecutionTrace, CodeLineExplanation } from '@/types/codeStudio';
import { useLanguage } from '@/contexts/LanguageContext';

interface TracePlayerProps {
  trace?: ExecutionTrace;
  onComplete?: () => void;
  onStepHighlight?: (line?: number) => void;
  className?: string;
}

export function TracePlayer({ trace, onComplete, onStepHighlight, className }: TracePlayerProps) {
  const { language } = useLanguage();
  const [stepIndex, setStepIndex] = useState(0);
  const [running, setRunning] = useState(false);

  if (!trace) {
    return (
      <div className={cn('p-4 text-sm text-[var(--color-text-secondary)] border border-dashed border-[var(--color-border-primary)] rounded-lg', className)}>
        {language === 'ur'
          ? 'Is example ke liye predefined execution trace maujood nahi. Explore mode mein line explanations parhein.'
          : 'No predefined execution trace for this example. Read line explanations in Explore mode.'}
      </div>
    );
  }

  const total = trace.steps.length;
  const step = trace.steps[stepIndex];

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(total - 1, index));
    setStepIndex(clamped);
    onStepHighlight?.(trace.steps[clamped].highlightLine);
    if (clamped === total - 1) onComplete?.();
  };

  const handleStart = () => {
    setRunning(true);
    goTo(0);
  };

  const handleNext = () => {
    if (stepIndex < total - 1) goTo(stepIndex + 1);
    else {
      setRunning(false);
      onComplete?.();
    }
  };

  const handlePrev = () => goTo(stepIndex - 1);

  const handleReset = () => {
    setRunning(false);
    setStepIndex(0);
    onStepHighlight?.(trace.steps[0]?.highlightLine);
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <ListTree className="w-4 h-4 text-[var(--color-accent-primary)]" />
          <span className="text-sm font-medium text-[var(--color-text-primary)]">
            {language === 'ur' ? 'Execution Trace' : 'Execution Trace'}
          </span>
          <Badge variant="secondary" size="sm">
            {stepIndex + 1} / {total}
          </Badge>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {!running && stepIndex === 0 && (
            <Button size="sm" variant="primary" onClick={handleStart} className="gap-1" leftIcon={<Play className="w-3.5 h-3.5" />}>
              {language === 'ur' ? 'Start Trace' : 'Start Trace'}
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={handlePrev} disabled={stepIndex === 0} className="gap-1" leftIcon={<ChevronLeft className="w-3.5 h-3.5" />}>
            Prev
          </Button>
          <Button size="sm" variant="outline" onClick={handleNext} disabled={stepIndex >= total - 1} className="gap-1" rightIcon={<ChevronRight className="w-3.5 h-3.5" />}>
            Next
          </Button>
          <Button size="sm" variant="ghost" onClick={handleReset} className="gap-1" leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
            Reset
          </Button>
        </div>
      </div>

      <div className="flex gap-1" aria-label="Trace progress">
        {trace.steps.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setRunning(true);
              goTo(i);
            }}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
              i <= stepIndex ? 'bg-[var(--color-accent-primary)]' : 'bg-[var(--color-bg-tertiary)]'
            )}
            aria-label={`Step ${i + 1}: ${s.title}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="p-4 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)] space-y-2"
        >
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">Step {stepIndex + 1}</Badge>
            {step.highlightLine !== undefined && (
              <Badge variant="outline" size="sm">Line {step.highlightLine}</Badge>
            )}
          </div>
          <p className="font-medium text-[var(--color-text-primary)] text-sm">
            {language === 'ur' ? step.titleUrdu : step.title}
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {language === 'ur' ? step.descriptionUrdu : step.description}
          </p>
        </motion.div>
      </AnimatePresence>

      <p className="text-xs text-[var(--color-text-tertiary)] italic">
        {language === 'ur' ? trace.noteUrdu : trace.note}
      </p>
    </div>
  );
}

interface LineExplainerProps {
  explanation?: CodeLineExplanation;
  total: number;
  index: number;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}

export function LineExplainer({ explanation, total, index, onPrev, onNext, className }: LineExplainerProps) {
  const { language } = useLanguage();

  if (!explanation) {
    return (
      <div className={cn('text-sm text-[var(--color-text-secondary)]', className)}>
        {language === 'ur'
          ? 'Is line ki explanation available nahi. Code par click karein.'
          : 'No explanation for this line yet. Click an explained line in the code.'}
      </div>
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <Badge variant="primary" size="sm">
          Line {explanation.line} · {explanation.concept}
        </Badge>
        <span className="text-xs text-[var(--color-text-tertiary)]">
          {index + 1}/{total}
        </span>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-[var(--color-text-primary)]">
          <span className="font-semibold text-[var(--color-text-secondary)] mr-1">
            {language === 'ur' ? 'What:' : 'What:'}
          </span>
          {language === 'ur' ? explanation.whatUrdu : explanation.what}
        </p>
        <p className="text-sm text-[var(--color-text-secondary)]">
          <span className="font-semibold text-[var(--color-text-tertiary)] mr-1">
            {language === 'ur' ? 'Why:' : 'Why:'}
          </span>
          {language === 'ur' ? explanation.whyUrdu : explanation.why}
        </p>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={onPrev} disabled={index === 0} leftIcon={<ChevronLeft className="w-3.5 h-3.5" />}>
          Prev
        </Button>
        <Button size="sm" variant="outline" onClick={onNext} disabled={index >= total - 1} rightIcon={<ChevronRight className="w-3.5 h-3.5" />}>
          Next
        </Button>
      </div>
    </div>
  );
}
