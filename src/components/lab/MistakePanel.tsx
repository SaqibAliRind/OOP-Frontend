import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, Zap } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button } from '@/components/ui';
import { slideUp } from '@/utils/motion';

interface MistakeData {
  incorrectCode: string;
  correctCode: string;
  explanation: string;
  explanationUrdu: string;
}

interface MistakePanelProps {
  mistake: MistakeData | null;
  language: 'english' | 'romanUrdu';
  onDismiss: () => void;
  onTryCorrect: () => void;
  className?: string;
}

export function MistakePanel({ mistake, language, onDismiss, onTryCorrect, className }: MistakePanelProps) {
  if (!mistake) return null;

  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: 16 }}
      className={cn(
        'rounded-xl border-2 overflow-hidden shadow-[var(--shadow-lg)]',
        'bg-[var(--color-bg-card)] border-[var(--color-accent-error)]/40',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-accent-error)]/10 border-b border-[var(--color-accent-error)]/20">
        <div className="w-6 h-6 rounded-md bg-[var(--color-accent-error)]/20 flex items-center justify-center">
          <AlertTriangle className="w-3.5 h-3.5 text-[var(--color-accent-error)]" />
        </div>
        <span className="text-xs font-bold tracking-wider text-[var(--color-accent-error)] uppercase">
          {language === 'romanUrdu' ? 'Object Initialize Nahi Hua' : 'OBJECT NOT INITIALIZED'}
        </span>
      </div>

      <div className="p-4 space-y-3">
        {/* Explanation */}
        <p className="text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
          {language === 'romanUrdu' ? mistake.explanationUrdu : mistake.explanation}
        </p>

        {/* Code Comparison */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-start">
          {/* Incorrect */}
          <div className="rounded-lg border border-[var(--color-accent-error)]/30 bg-[var(--color-accent-error)]/5 overflow-hidden">
            <div className="px-2 py-1 bg-[var(--color-accent-error)]/10 border-b border-[var(--color-accent-error)]/20">
              <span className="text-[10px] font-bold text-[var(--color-accent-error)] uppercase">
                {language === 'romanUrdu' ? 'Ghalat' : 'Incorrect'}
              </span>
            </div>
            <pre className="p-2 text-[11px] font-mono text-[var(--color-text-secondary)] whitespace-pre-wrap">
              {mistake.incorrectCode}
            </pre>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center pt-6">
            <ArrowRight className="w-4 h-4 text-[var(--color-text-tertiary)]" />
          </div>

          {/* Correct */}
          <div className="rounded-lg border border-[var(--color-accent-success)]/30 bg-[var(--color-accent-success)]/5 overflow-hidden">
            <div className="px-2 py-1 bg-[var(--color-accent-success)]/10 border-b border-[var(--color-accent-success)]/20">
              <span className="text-[10px] font-bold text-[var(--color-accent-success)] uppercase">
                {language === 'romanUrdu' ? 'Sahi' : 'Correct'}
              </span>
            </div>
            <pre className="p-2 text-[11px] font-mono text-[var(--color-text-secondary)] whitespace-pre-wrap">
              {mistake.correctCode}
            </pre>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <Button variant="success" size="sm" onClick={onTryCorrect}>
            <Zap className="w-3.5 h-3.5" />
            {language === 'romanUrdu' ? 'Yeh Try Karo' : 'Try This'}
          </Button>
          <Button variant="ghost" size="sm" onClick={onDismiss}>
            {language === 'romanUrdu' ? 'Band Karo' : 'Dismiss'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
