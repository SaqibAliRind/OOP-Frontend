import { motion } from 'framer-motion';
import { RotateCcw, HelpCircle, Maximize, Box } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button } from '@/components/ui';
import { slideUp } from '@/utils/motion';
import type { QualityLevel } from '@/types/oopLab';

interface LabStatusBarProps {
  status: string;
  objectCount: number;
  quality: QualityLevel;
  onReset: () => void;
  onHelp: () => void;
  className?: string;
}

const QUALITY_DOTS: Record<QualityLevel, string> = {
  auto: 'bg-[var(--color-accent-info)]',
  high: 'bg-[var(--color-accent-success)]',
  medium: 'bg-[var(--color-accent-warning)]',
  low: 'bg-[var(--color-accent-error)]',
};

export function LabStatusBar({
  status,
  objectCount,
  quality,
  onReset,
  onHelp,
  className,
}: LabStatusBarProps) {
  return (
    <motion.footer
      variants={slideUp}
      initial="hidden"
      animate="visible"
      className={cn(
        'flex items-center justify-between px-4 h-8 border-t border-[var(--color-border-primary)]',
        'bg-[var(--color-bg-secondary)]/90 backdrop-blur-md text-[10px] font-mono',
        className
      )}
    >
      {/* Left: Status */}
      <div className="flex items-center gap-2">
        <div className={cn(
          'w-1.5 h-1.5 rounded-full',
          status === 'READY' || status === 'TAYYAR' ? 'bg-[var(--color-accent-success)]' : 'bg-[var(--color-accent-warning)] animate-pulse'
        )} />
        <span className="text-[var(--color-text-tertiary)]">{status}</span>
      </div>

      {/* Center: Quick Actions */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onReset} aria-label="Reset">
          <RotateCcw className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onHelp} aria-label="Help">
          <HelpCircle className="w-3 h-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => {
            if (document.fullscreenElement) {
              document.exitFullscreen();
            } else {
              document.documentElement.requestFullscreen();
            }
          }}
          aria-label="Toggle fullscreen"
        >
          <Maximize className="w-3 h-3" />
        </Button>
      </div>

      {/* Right: Info */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <Box className="w-3 h-3 text-[var(--color-text-tertiary)]" />
          <span className="text-[var(--color-text-tertiary)]">{objectCount}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={cn('w-1.5 h-1.5 rounded-full', QUALITY_DOTS[quality])} />
          <span className="text-[var(--color-text-tertiary)] uppercase">{quality}</span>
        </div>
      </div>
    </motion.footer>
  );
}
