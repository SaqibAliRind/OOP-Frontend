import { AlertCircle, Lightbulb, Brain, RotateCcw, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';
import { Button } from '@/components/ui';

interface ErrorPanelProps {
  title?: string;
  file?: string;
  line?: number;
  message: string;
  className?: string;
  onHint?: () => void;
  onExplain?: () => void;
  onRetry?: () => void;
  onShowSolution?: () => void;
}

export function ErrorPanel({
  title = 'BUILD FAILED',
  file,
  line,
  message,
  className,
  onHint,
  onExplain,
  onRetry,
  onShowSolution,
}: ErrorPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'rounded-lg border border-[var(--color-accent-error)]/30 bg-[var(--color-accent-error)]/5 overflow-hidden',
        className
      )}
      role="alert"
    >
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-[var(--color-accent-error)]/15 flex items-center gap-2 bg-[var(--color-accent-error)]/5">
        <AlertCircle className="w-4 h-4 text-[var(--color-accent-error)]" aria-hidden="true" />
        <span className="text-xs font-bold tracking-widest text-[var(--color-accent-error)] uppercase">
          {title}
        </span>
      </div>

      {/* Error Details */}
      <div className="p-4 font-mono text-sm space-y-2">
        {file && (
          <div className="flex items-center gap-2">
            <span className="text-[var(--color-text-primary)] font-medium">{file}</span>
            {line != null && (
              <span className="text-[var(--color-accent-error)]">:{line}</span>
            )}
          </div>
        )}
        <div className="flex items-start gap-2">
          <span className="text-[var(--color-accent-error)] font-semibold shrink-0">error:</span>
          <span className="text-[var(--color-text-secondary)]">{message}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-4 flex flex-wrap gap-2">
        {onHint && (
          <Button variant="outline" size="sm" onClick={onHint} className="gap-1.5">
            <Lightbulb className="w-3.5 h-3.5" />
            Hint
          </Button>
        )}
        {onExplain && (
          <Button variant="outline" size="sm" onClick={onExplain} className="gap-1.5">
            <Brain className="w-3.5 h-3.5" />
            Explain Error
          </Button>
        )}
        {onRetry && (
          <Button variant="primary" size="sm" onClick={onRetry} className="gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" />
            Try Again
          </Button>
        )}
        {onShowSolution && (
          <Button variant="ghost" size="sm" onClick={onShowSolution} className="gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            Show Solution
          </Button>
        )}
      </div>
    </motion.div>
  );
}
