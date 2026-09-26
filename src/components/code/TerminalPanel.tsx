import { cn } from '@/utils/helpers';

export type TerminalState = 'idle' | 'running' | 'success' | 'error';

interface TerminalPanelProps {
  lines: string[];
  state?: TerminalState;
  title?: string;
  className?: string;
}

const stateStyles: Record<TerminalState, string> = {
  idle: 'border-[var(--color-border-primary)]',
  running: 'border-[var(--color-accent-info)]/50 shadow-[var(--shadow-glow-info)]',
  success: 'border-[var(--color-accent-success)]/40',
  error: 'border-[var(--color-accent-error)]/40',
};

export function TerminalPanel({ lines, state = 'idle', title = 'TERMINAL', className }: TerminalPanelProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-[var(--color-bg-input)] overflow-hidden font-mono text-sm',
        stateStyles[state],
        className
      )}
      role="region"
      aria-label="Program output terminal"
    >
      <div className="px-3 py-2 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)] flex items-center justify-between">
        <span className="text-xs tracking-wider text-[var(--color-text-tertiary)]">{title}</span>
        {state === 'running' && (
          <span className="text-xs text-[var(--color-accent-info)] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-info)] animate-pulse" />
            Running
          </span>
        )}
      </div>
      <div className="p-3 space-y-1 text-[var(--color-text-secondary)] max-h-40 overflow-auto scrollbar-thin">
        {lines.map((line, i) => (
          <p key={i} className="leading-relaxed">
            <span className="text-[var(--color-accent-success)] mr-2 select-none">&gt;</span>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
