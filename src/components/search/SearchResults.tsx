import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, HelpCircle, Bug, Layers, ArrowRight } from 'lucide-react';
import { cn } from '@/utils/helpers';
import type { SearchResult } from '@/types';

interface SearchResultsProps {
  results: SearchResult[];
  onSelect: (result: SearchResult) => void;
  highlightedIndex: number;
}

const TYPE_CONFIG: Record<
  SearchResult['type'],
  { label: string; badgeVariant: string; icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  module: { label: 'LESSONS', badgeVariant: 'primary', icon: BookOpen, color: 'text-blue-400' },
  lesson: { label: 'LESSONS', badgeVariant: 'primary', icon: BookOpen, color: 'text-indigo-400' },
  concept: { label: 'CONCEPTS', badgeVariant: 'secondary', icon: Lightbulb, color: 'text-purple-400' },
  question: { label: 'QUESTIONS', badgeVariant: 'warning', icon: HelpCircle, color: 'text-amber-400' },
  scenario: { label: 'QUESTIONS', badgeVariant: 'warning', icon: Layers, color: 'text-orange-400' },
  mistake: { label: 'QUESTIONS', badgeVariant: 'error', icon: Bug, color: 'text-red-400' },
};

const TYPE_BADGE_COLORS: Record<SearchResult['type'], string> = {
  module: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  lesson: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
  concept: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  question: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  scenario: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  mistake: 'bg-red-500/15 text-red-400 border-red-500/30',
};

const GROUP_ORDER: SearchResult['type'][] = ['module', 'lesson', 'concept', 'question', 'scenario', 'mistake'];

const GROUP_LABELS: Record<SearchResult['type'], string> = {
  module: 'MODULES',
  lesson: 'LESSONS',
  concept: 'CONCEPTS',
  question: 'QUESTIONS',
  scenario: 'SCENARIOS',
  mistake: 'MISTAKES',
};

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

export function SearchResults({ results, onSelect, highlightedIndex }: SearchResultsProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Group results by type
  const grouped = results.reduce<Record<string, SearchResult[]>>((acc, result) => {
    if (!acc[result.type]) acc[result.type] = [];
    acc[result.type].push(result);
    return acc;
  }, {});

  const orderedGroups = GROUP_ORDER.filter(type => grouped[type]?.length > 0);

  // Scroll highlighted item into view
  useEffect(() => {
    const el = itemRefs.current.get(highlightedIndex);
    if (el) {
      el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [highlightedIndex]);

  return (
    <div ref={listRef} className="max-h-[400px] overflow-y-auto custom-scrollbar">
      {orderedGroups.map(type => {
        const config = TYPE_CONFIG[type];
        const Icon = config.icon;
        const items = grouped[type];

        return (
          <div key={type} className="mb-2">
            <div className="flex items-center gap-2 px-4 py-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)]">
                {GROUP_LABELS[type]}
              </span>
              <span className="text-[10px] text-[var(--color-text-tertiary)]">
                {items.length}
              </span>
            </div>

            {items.map((result, idx) => {
              // Calculate flat index for this item
              let thisFlatIndex = 0;
              for (const gType of GROUP_ORDER) {
                if (gType === type) break;
                thisFlatIndex += grouped[gType]?.length ?? 0;
              }
              thisFlatIndex += idx;

              const isHighlighted = thisFlatIndex === highlightedIndex;

              return (
                <motion.div
                  key={result.id}
                  ref={(el) => {
                    if (el) itemRefs.current.set(thisFlatIndex, el);
                  }}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02, duration: 0.15 }}
                  onClick={() => onSelect(result)}
                  className={cn(
                    'group flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg cursor-pointer transition-all duration-100',
                    isHighlighted
                      ? 'bg-[var(--color-bg-tertiary)]'
                      : 'hover:bg-[var(--color-bg-tertiary)]/50'
                  )}
                >
                  <div className={cn(
                    'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                    isHighlighted
                      ? 'bg-[var(--color-bg-card)]'
                      : 'bg-[var(--color-bg-tertiary)] group-hover:bg-[var(--color-bg-card)]'
                  )}>
                    <Icon className={cn('w-4 h-4', config.color)} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={cn(
                        'text-sm font-medium truncate',
                        isHighlighted
                          ? 'text-[var(--color-text-primary)]'
                          : 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]'
                      )}>
                        {result.title}
                      </span>
                      <span className={cn(
                        'inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider border',
                        TYPE_BADGE_COLORS[result.type]
                      )}>
                        {result.type}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-text-tertiary)] truncate leading-relaxed">
                      {truncate(result.description, 80)}
                    </p>
                  </div>

                  <ArrowRight className={cn(
                    'w-3.5 h-3.5 flex-shrink-0 transition-all duration-150',
                    isHighlighted
                      ? 'opacity-100 text-[var(--color-text-secondary)] translate-x-0'
                      : 'opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0'
                  )} />
                </motion.div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
