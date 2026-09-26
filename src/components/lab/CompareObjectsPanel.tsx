import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCompare, ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';
import { cn } from '@/utils/helpers';
import type { ObjectInstance, ObjectComparison } from '@/types/oopLab';

interface CompareObjectsPanelProps {
  allObjects: ObjectInstance[];
  comparison: ObjectComparison | null;
  comparisonIds: { a: string | null; b: string | null };
  onSetComparisonIds: (a: string | null, b: string | null) => void;
  language: 'english' | 'romanUrdu';
  className?: string;
}

export function CompareObjectsPanel({
  allObjects,
  comparison,
  comparisonIds,
  onSetComparisonIds,
  language,
  className,
}: CompareObjectsPanelProps) {
  const [expanded, setExpanded] = useState(false);

  if (allObjects.length < 2) return null;

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
        <GitCompare className="w-3.5 h-3.5 text-purple-400" />
        <span className="text-[10px] font-bold tracking-[0.15em] text-white/40 uppercase">
          {language === 'romanUrdu' ? 'Compare Objects' : 'COMPARE OBJECTS'}
        </span>
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
            <div className="p-3 space-y-3">
              {/* Object A selector */}
              <div>
                <label className="text-[9px] font-bold tracking-wider text-white/25 uppercase mb-1 block">
                  {language === 'romanUrdu' ? 'Object A' : 'OBJECT A'}
                </label>
                <div className="flex gap-1.5 flex-wrap">
                  {allObjects.map((obj) => (
                    <button
                      key={obj.id}
                      onClick={() => onSetComparisonIds(obj.id, comparisonIds.b)}
                      className={cn(
                        'flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono transition-all',
                        comparisonIds.a === obj.id
                          ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300'
                          : 'bg-white/[0.03] border border-white/5 text-white/40 hover:bg-white/[0.06]'
                      )}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: obj.color }} />
                      {obj.variableName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Object B selector */}
              <div>
                <label className="text-[9px] font-bold tracking-wider text-white/25 uppercase mb-1 block">
                  {language === 'romanUrdu' ? 'Object B' : 'OBJECT B'}
                </label>
                <div className="flex gap-1.5 flex-wrap">
                  {allObjects.map((obj) => (
                    <button
                      key={obj.id}
                      onClick={() => onSetComparisonIds(comparisonIds.a, obj.id)}
                      className={cn(
                        'flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono transition-all',
                        comparisonIds.b === obj.id
                          ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300'
                          : 'bg-white/[0.03] border border-white/5 text-white/40 hover:bg-white/[0.06]'
                      )}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: obj.color }} />
                      {obj.variableName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Comparison Result */}
              {comparison && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="font-mono text-purple-400">{comparison.objectA.variableName}</span>
                    <ArrowRight className="w-3 h-3 text-white/20" />
                    <span className="font-mono text-cyan-400">{comparison.objectB.variableName}</span>
                  </div>

                  {comparison.differences.length > 0 ? (
                    <div className="space-y-1">
                      {comparison.differences.map((diff) => (
                        <div key={diff.property} className="flex items-center gap-2 text-[9px] font-mono p-1.5 rounded bg-white/[0.02]">
                          <span className="text-white/40 min-w-[80px]">{diff.property}</span>
                          <span className="text-purple-400/70">{diff.valueA}</span>
                          <span className="text-white/20">{'\u2260'}</span>
                          <span className="text-cyan-400/70">{diff.valueB}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[9px] text-white/30 italic">
                      {language === 'romanUrdu'
                        ? 'Dono objects ki state same hai.'
                        : 'Both objects have identical state.'
                      }
                    </p>
                  )}

                  <p className="text-[9px] text-white/35 leading-relaxed">
                    {language === 'romanUrdu' ? comparison.explanationUrdu : comparison.explanation}
                  </p>
                </div>
              )}

              {!comparison && comparisonIds.a && comparisonIds.b && (
                <p className="text-[9px] text-white/25">
                  {language === 'romanUrdu' ? 'Select 2 alag objects for comparison.' : 'Select 2 different objects to compare.'}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
