import { useEffect, useRef } from 'react';
import { Terminal, Trash2 } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button } from '@/components/ui';
import type { ConsoleEntry } from '@/types/oopLab';

interface ConsolePanelProps {
  entries: ConsoleEntry[];
  className?: string;
  onClear?: () => void;
}

const ENTRY_COLORS: Record<ConsoleEntry['type'], string> = {
  output: 'text-white/70',
  error: 'text-red-400',
  info: 'text-blue-400',
  success: 'text-emerald-400',
};

const ENTRY_PREFIXES: Record<ConsoleEntry['type'], string> = {
  output: '',
  error: 'ERR',
  info: 'INF',
  success: 'OK',
};

export function ConsolePanel({ entries, className, onClear }: ConsolePanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries.length]);

  return (
    <div
      className={cn(
        'flex flex-col h-full rounded-xl border border-white/10 overflow-hidden',
        'bg-[#0d1320] shadow-lg',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02] shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-3 h-3 text-emerald-400" />
          <span className="text-[10px] font-bold tracking-[0.15em] text-white/40 uppercase">
            Console
          </span>
          <span className="text-[9px] font-mono text-white/20">
            ({entries.length})
          </span>
        </div>
        {entries.length > 0 && (
          <Button variant="ghost" size="icon" className="h-5 w-5" onClick={onClear} aria-label="Clear console">
            <Trash2 className="w-2.5 h-2.5" />
          </Button>
        )}
      </div>

      {/* Entries */}
      <div ref={scrollRef} className="flex-1 overflow-auto scrollbar-thin p-3 min-h-0">
        {entries.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-[11px] text-white/20 font-mono">&gt; _</span>
          </div>
        ) : (
          <div className="space-y-0.5">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start gap-2 font-mono text-[11px] leading-4.5"
              >
                {ENTRY_PREFIXES[entry.type] && (
                  <span className={cn('text-[9px] font-bold shrink-0 mt-px', ENTRY_COLORS[entry.type])}>
                    [{ENTRY_PREFIXES[entry.type]}]
                  </span>
                )}
                <span className={ENTRY_COLORS[entry.type]}>
                  {entry.message}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-1 font-mono text-[11px] text-emerald-400/60 mt-1">
              <span>&gt;</span>
              <span className="w-0.5 h-3.5 bg-emerald-400/40 animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
