import { motion, AnimatePresence } from 'framer-motion';
import { Target, CheckCircle2, Circle, Lock, Trophy, Sparkles } from 'lucide-react';
import { cn } from '@/utils/helpers';
import type { Mission } from '@/types/oopLab';

interface MissionPanelProps {
  mission: Mission | null;
  language: 'english' | 'romanUrdu';
  className?: string;
}

export function MissionPanel({ mission, language, className }: MissionPanelProps) {
  if (!mission) return null;

  const completedCount = mission.objectives.filter((o) => o.completed).length;
  const totalCount = mission.objectives.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isComplete = completedCount === totalCount;

  const currentIdx = mission.objectives.findIndex((o) => !o.completed);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'rounded-xl border border-white/10 overflow-hidden',
        'bg-[#0d1320] shadow-lg',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <Target className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[10px] font-bold tracking-[0.15em] text-white/50 uppercase">
            Mission
          </span>
        </div>
        <span className={cn(
          'text-[10px] font-bold px-2 py-0.5 rounded-full',
          isComplete ? 'bg-emerald-500/15 text-emerald-400' : 'bg-blue-500/15 text-blue-400'
        )}>
          {completedCount}/{totalCount}
        </span>
      </div>

      <div className="p-4 space-y-3">
        {/* Title + Description */}
        <div>
          <h3 className="text-[13px] font-semibold text-white/90 leading-snug">
            {language === 'romanUrdu' ? mission.titleUrdu : mission.title}
          </h3>
          <p className="text-[11px] text-white/40 mt-0.5 leading-relaxed">
            {language === 'romanUrdu' ? mission.descriptionUrdu : mission.description}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-white/30">Progress</span>
            <span className="text-[10px] font-mono text-white/50">{progressPct}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className={cn('h-full rounded-full', isComplete ? 'bg-emerald-500' : 'bg-blue-500')}
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Objectives */}
        <div className="space-y-1.5">
          <AnimatePresence mode="popLayout">
            {mission.objectives.map((objective, idx) => {
              const state: 'completed' | 'current' | 'future' = objective.completed
                ? 'completed'
                : idx === currentIdx
                ? 'current'
                : 'future';

              return (
                <motion.div
                  key={objective.id}
                  layout
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: state === 'current' ? 0.1 : 0 }}
                  className={cn(
                    'flex items-start gap-2.5 px-3 py-2 rounded-lg border transition-all duration-200',
                    state === 'completed' && 'bg-emerald-500/5 border-emerald-500/15',
                    state === 'current' && 'bg-blue-500/8 border-blue-500/20',
                    state === 'future' && 'bg-white/[0.01] border-white/5 opacity-50'
                  )}
                >
                  {/* Icon */}
                  {state === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : state === 'current' ? (
                    <div className="relative shrink-0 mt-0.5">
                      <Circle className="w-4 h-4 text-blue-400 animate-pulse" />
                      <div className="absolute inset-0 w-4 h-4 rounded-full bg-blue-400/20 animate-ping" />
                    </div>
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-white/20 shrink-0 mt-0.5" />
                  )}

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <p className={cn(
                      'text-[12px] leading-snug',
                      state === 'completed' && 'text-white/40 line-through',
                      state === 'current' && 'text-white/80 font-medium',
                      state === 'future' && 'text-white/30'
                    )}>
                      {language === 'romanUrdu' ? objective.descriptionUrdu : objective.description}
                    </p>
                    {state === 'future' && (
                      <p className="text-[9px] text-white/15 mt-0.5 font-mono uppercase tracking-wider">
                        {language === 'romanUrdu' ? 'Locked' : 'Locked'}
                      </p>
                    )}
                    {objective.targetCount && objective.targetCount > 1 && (
                      <p className="text-[10px] text-white/25 mt-0.5 font-mono">
                        {objective.currentCount}/{objective.targetCount}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* XP Reward */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-bold text-amber-400">
              +{mission.xpReward} XP
            </span>
          </div>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span className="text-[10px] font-bold text-amber-400 tracking-wider uppercase">
                {language === 'romanUrdu' ? 'MUKAMMAL!' : 'COMPLETE'}
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
