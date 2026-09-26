import { useState } from 'react';
import { Play, RotateCcw, Copy, Check, FileCode2, Folder, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button } from '@/components/ui';
import { JavaCodeBlock } from '@/components/learning/JavaCodeBlock';
import { TerminalPanel, type TerminalState } from './TerminalPanel';
import { ErrorPanel } from './ErrorPanel';
import { SuccessPanel } from './SuccessPanel';

export type CodeRunState = 'normal' | 'running' | 'success' | 'error';

interface CodeWorkspaceProps {
  title?: string;
  filename?: string;
  code: string;
  className?: string;
  mockOutput?: string[];
  mockError?: { file?: string; line?: number; message: string };
}

export function CodeWorkspace({
  title = 'OOP UNIVERSE',
  filename = 'Main.java',
  code,
  className,
  mockOutput = ['Program executed successfully'],
  mockError,
}: CodeWorkspaceProps) {
  const [runState, setRunState] = useState<CodeRunState>('normal');
  const [copied, setCopied] = useState(false);

  const terminalState: TerminalState =
    runState === 'running' ? 'running' : runState === 'success' ? 'success' : runState === 'error' ? 'error' : 'idle';

  const handleRun = () => {
    setRunState('running');
    window.setTimeout(() => {
      setRunState(mockError ? 'error' : 'success');
    }, 700);
  };

  const handleReset = () => setRunState('normal');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={cn(
        'rounded-xl border border-[var(--color-border-primary)] overflow-hidden bg-[var(--color-bg-secondary)] shadow-[var(--shadow-xl)]',
        className
      )}
    >
      {/* Title Bar - IDE style */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)]/80">
        <div className="flex items-center gap-3 min-w-0">
          {/* Window controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-3 h-3 rounded-full bg-[var(--color-accent-error)]/50 hover:bg-[var(--color-accent-error)]/80 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-[var(--color-accent-warning)]/50 hover:bg-[var(--color-accent-warning)]/80 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-[var(--color-accent-success)]/50 hover:bg-[var(--color-accent-success)]/80 transition-colors" />
          </div>
          <div className="w-px h-4 bg-[var(--color-border-primary)]" />
          <span className="text-xs font-mono tracking-wider text-[var(--color-text-tertiary)] truncate">{title}</span>
          <ChevronRight className="w-3 h-3 text-[var(--color-text-tertiary)]" />
          <span className="flex items-center gap-1.5 text-xs px-2 py-0.5 rounded bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] font-mono">
            <FileCode2 className="w-3 h-3" />
            {filename}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={handleCopy} aria-label="Copy code" className="h-7 px-2">
            {copied ? (
              <Check className="w-3.5 h-3.5 text-[var(--color-accent-success)]" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleReset} className="h-7 px-2">
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Reset
          </Button>
          <Button variant="primary" size="sm" onClick={handleRun} className="h-7 px-3">
            <Play className="w-3.5 h-3.5 mr-1" />
            Run
          </Button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="grid lg:grid-cols-[140px_1fr]">
        {/* File Tree */}
        <div className="hidden lg:block border-r border-[var(--color-border-primary)] bg-[var(--color-bg-input)]/50 p-3">
          <div className="flex items-center gap-1.5 mb-3">
            <Folder className="w-3.5 h-3.5 text-[var(--color-accent-warning)]" />
            <span className="text-[10px] tracking-widest font-semibold text-[var(--color-text-tertiary)] uppercase">
              Explorer
            </span>
          </div>
          <ul className="space-y-0.5 text-sm font-mono">
            <li className="flex items-center gap-1.5 px-2 py-1 rounded bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] text-xs">
              <FileCode2 className="w-3 h-3" />
              {filename}
            </li>
            <li className="flex items-center gap-1.5 px-2 py-1 rounded text-[var(--color-text-tertiary)] text-xs hover:bg-[var(--color-bg-tertiary)] cursor-default">
              <FileCode2 className="w-3 h-3" />
              Student.java
            </li>
          </ul>
        </div>

        {/* Code Editor */}
        <div className="min-w-0">
          <JavaCodeBlock code={code} showLineNumbers copyable={false} maxHeight="320px" className="border-0 rounded-none" />
        </div>
      </div>

      {/* Bottom Panel: Terminal + Status */}
      <div className="p-3 border-t border-[var(--color-border-primary)] space-y-3 bg-[var(--color-bg-primary)]/30">
        {/* Error/Success panels */}
        {runState === 'error' && mockError && (
          <ErrorPanel
            file={mockError.file ?? filename}
            line={mockError.line}
            message={mockError.message}
            onHint={() => undefined}
            onExplain={() => undefined}
            onRetry={handleReset}
          />
        )}
        {runState === 'success' && <SuccessPanel message="Execution completed with no runtime errors." />}

        {/* Terminal */}
        <TerminalPanel
          lines={
            runState === 'running'
              ? ['Compiling...', 'Running main method...']
              : runState === 'error'
                ? ['Compilation failed.']
                : runState === 'success'
                  ? mockOutput
                  : ['Ready. Press Run to execute.']
          }
          state={terminalState}
        />

        {/* Status Bar */}
        <div className="flex items-center justify-between text-[10px] font-mono text-[var(--color-text-tertiary)] px-1">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-success)]" />
              Java 17
            </span>
            <span>UTF-8</span>
            <span>Spaces 4</span>
          </div>
          <span>Ln 1, Col 1</span>
        </div>
      </div>
    </div>
  );
}
