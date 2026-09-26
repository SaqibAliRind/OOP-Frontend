import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Check } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button } from '@/components/ui';

const STEP_LABELS = [
  'Class Loaded',
  'Reference s1',
  'Object #001',
  'Set name',
  'Set age',
  'Reference s2',
  'Object #002',
  'Set name',
  'Set age',
  'Reference s3',
  'Object #003',
  'Set name',
  'Set age',
  'Method call',
];

const STEP_LABELS_URDU = [
  'Class Load',
  'Reference s1',
  'Object #001',
  'Name set',
  'Age set',
  'Reference s2',
  'Object #002',
  'Name set',
  'Age set',
  'Reference s3',
  'Object #003',
  'Name set',
  'Age set',
  'Method call',
];

interface StepTimelineProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  language: 'english' | 'romanUrdu';
  activeDescription?: string;
  onNext: () => void;
  onPrev: () => void;
  onTogglePlay: () => void;
  className?: string;
}

export function StepTimeline({
  currentStep,
  totalSteps,
  isPlaying,
  language,
  activeDescription,
  onNext,
  onPrev,
  onTogglePlay,
  className,
}: StepTimelineProps) {
  const labels = language === 'romanUrdu' ? STEP_LABELS_URDU : STEP_LABELS;
  const activeStepLabel = currentStep > 0 && currentStep <= totalSteps
    ? labels[currentStep - 1]
    : null;

  return (
    <div
      className={cn(
        'rounded-xl border border-white/10 overflow-hidden',
        'bg-[#0d1320] shadow-lg',
        className
      )}
    >
      {/* Header with counter */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onPrev} disabled={currentStep <= 0} aria-label="Previous step">
            <ChevronLeft className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant={isPlaying ? 'danger' : 'primary'}
            size="icon"
            className="h-6 w-6"
            onClick={onTogglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onNext} disabled={currentStep >= totalSteps} aria-label="Next step">
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </div>
        <span className="text-[10px] font-mono text-white/30">
          {Math.min(currentStep, totalSteps)} / {totalSteps}
        </span>
      </div>

      {/* Step dots with labels */}
      {totalSteps > 0 && (
        <div className="px-4 py-2.5">
          <div className="flex items-center gap-0 flex-wrap justify-center">
            {Array.from({ length: totalSteps }, (_, i) => {
              const stepNum = i + 1;
              const isCompleted = stepNum < currentStep;
              const isActive = stepNum === currentStep;

              return (
                <div key={i} className="flex items-center">
                  <div className="relative group">
                    <div
                      className={cn(
                        'w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold border transition-all duration-200',
                        isCompleted && 'bg-emerald-500/20 border-emerald-500 text-emerald-400',
                        isActive && 'bg-blue-500/20 border-blue-500 text-blue-400 scale-110 shadow-[0_0_6px_rgba(59,130,246,0.3)]',
                        !isCompleted && !isActive && 'bg-white/5 border-white/10 text-white/20'
                      )}
                    >
                      {isCompleted ? <Check className="w-2 h-2" /> : stepNum}
                    </div>
                    {/* Hover label */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      <div className="px-1.5 py-0.5 rounded bg-[#1a2332] border border-white/10 text-[8px] text-white/60 whitespace-nowrap font-mono">
                        {labels[i]}
                      </div>
                    </div>
                  </div>
                  {i < totalSteps - 1 && (
                    <div className={cn(
                      'w-2.5 h-[1px] mx-px transition-colors duration-200',
                      isCompleted ? 'bg-emerald-500/40' : 'bg-white/8'
                    )} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Active step explanation */}
      {activeStepLabel && currentStep > 0 && currentStep <= totalSteps && (
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="px-4 pb-3 space-y-1"
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
              {activeStepLabel}
            </span>
          </div>
          {activeDescription && (
            <p className="text-[11px] text-white/45 leading-relaxed pl-3.5">
              {activeDescription}
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
