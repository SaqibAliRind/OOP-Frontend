import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, ChevronDown, ChevronRight, RotateCcw } from 'lucide-react';
import { cn } from '@/utils/helpers';
import type { StateChangeEvent } from '@/types/oopLab';

interface StateHistoryPanelProps {
  stateHistory: StateChangeEvent[];
  onUndo?: () => void;
  language: 'english' | 'romanUrdu';
  className?: string;
}

export function StateHistoryPanel({
  stateHistory,
  onUndo,
  language,
  className,
}: StateHistoryPanelProps) {
  const [expanded, setExpanded] = useState(false);

  if (stateHistory.length === 0) return null;

  return (
    <div
      className={cn(
        'rounded-xl border border-white/10 overflow-hidden bg-[#0d1320] shadow-lg',
        className
      )}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 w-full px-4 py-2.5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors border-b border-white/5"
      >
        {expanded ? (
          <ChevronDown className="w-3 h-3 text-white/30" />
        ) : (
          <ChevronRight className="w-3 h-3 text-white/30" />
        )}
        <History className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-[10px] font-bold tracking-[0.15em] text-white/40 uppercase">
          {language === 'romanUrdu' ? 'State History' : 'STATE HISTORY'}
        </span>
        <span className="text-[9px] text-white/20 ml-auto">{stateHistory.length}</span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="p-3 space-y-2">
              {/* Undo button */}
              {onUndo && stateHistory.length > 0 && (
                <button
                  onClick={onUndo}
                  className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[9px] font-semibold hover:bg-amber-500/20 transition-colors w-full justify-center"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  {language === 'romanUrdu' ? 'Undo Last Action' : 'UNDO LAST ACTION'}
                </button>
              )}

              {/* History entries (newest first) */}
              {stateHistory.slice().reverse().map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-2.5 rounded-md bg-white/[0.02] border border-white/5 space-y-1.5"
                >
                  {/* Header */}
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] font-mono text-amber-400/50 bg-amber-400/10 px-1 py-0.5 rounded">
                      #{event.sequenceNumber}
                    </span>
                    <span className="text-[10px] font-mono text-white/60">
                      {event.objectName}.{event.methodName}()
                    </span>
                  </div>

                  {/* State change */}
                  <div className="flex items-center gap-1.5 text-[9px] font-mono pl-1">
                    <span className="text-white/30">{event.changedProperty}:</span>
                    <span className="text-red-400/60 line-through">{event.previousState.find(s => s.name === event.changedProperty)?.value}</span>
                    <span className="text-white/20">{'\u2192'}</span>
                    <span className="text-emerald-400/80 font-semibold">{event.updatedState.find(s => s.name === event.changedProperty)?.value}</span>
                  </div>

                  {/* Explanation */}
                  <p className="text-[8px] text-white/25 leading-relaxed">
                    {language === 'romanUrdu' ? event.explanationUrdu : event.explanation}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
