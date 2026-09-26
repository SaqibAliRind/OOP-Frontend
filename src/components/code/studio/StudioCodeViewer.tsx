import { useMemo } from 'react';
import { cn } from '@/utils/helpers';
import { Copy, Check, FileCode2 } from 'lucide-react';
import { useState } from 'react';

interface StudioCodeViewerProps {
  code: string;
  filename: string;
  activeLine?: number;
  highlightLines?: number[];
  onLineClick?: (line: number) => void;
  className?: string;
}

const KEYWORDS = new Set([
  'abstract', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const',
  'continue', 'default', 'do', 'double', 'else', 'enum', 'extends', 'final', 'finally',
  'float', 'for', 'goto', 'if', 'implements', 'import', 'instanceof', 'int', 'interface',
  'long', 'native', 'new', 'package', 'private', 'protected', 'public', 'return',
  'short', 'static', 'strictfp', 'super', 'switch', 'synchronized', 'this', 'throw',
  'throws', 'transient', 'try', 'void', 'volatile', 'while', 'true', 'false', 'null', 'var',
]);

type TokenKind = 'plain' | 'keyword' | 'string' | 'comment' | 'annotation' | 'number';

function tokenizeLine(line: string): { text: string; kind: TokenKind }[] {
  const tokens: { text: string; kind: TokenKind }[] = [];
  let i = 0;
  const n = line.length;

  while (i < n) {
    const ch = line[i];

    if (ch === '/' && line[i + 1] === '/') {
      tokens.push({ text: line.slice(i), kind: 'comment' });
      break;
    }

    if (ch === '"' || ch === "'") {
      const quote = ch;
      let j = i + 1;
      while (j < n) {
        if (line[j] === '\\') {
          j += 2;
          continue;
        }
        if (line[j] === quote) {
          j++;
          break;
        }
        j++;
      }
      tokens.push({ text: line.slice(i, j), kind: 'string' });
      i = j;
      continue;
    }

    if (ch === '@') {
      let j = i + 1;
      while (j < n && /[A-Za-z0-9_]/.test(line[j])) j++;
      if (j > i + 1) {
        tokens.push({ text: line.slice(i, j), kind: 'annotation' });
        i = j;
        continue;
      }
    }

    if (/[0-9]/.test(ch)) {
      let j = i;
      while (j < n && /[0-9._]/.test(line[j])) j++;
      tokens.push({ text: line.slice(i, j), kind: 'number' });
      i = j;
      continue;
    }

    if (/[A-Za-z_]/.test(ch)) {
      let j = i;
      while (j < n && /[A-Za-z0-9_]/.test(line[j])) j++;
      const word = line.slice(i, j);
      tokens.push({ text: word, kind: KEYWORDS.has(word) ? 'keyword' : 'plain' });
      i = j;
      continue;
    }

    let j = i;
    while (j < n && !/[A-Za-z0-9_"'@/]/.test(line[j])) j++;
    if (j === i) j = i + 1;
    tokens.push({ text: line.slice(i, j), kind: 'plain' });
    i = j;
  }

  return tokens;
}

const KIND_CLASS: Record<TokenKind, string> = {
  plain: 'text-[var(--color-text-primary)]',
  keyword: 'text-[#c792ea] font-semibold',
  string: 'text-[#c3e88d]',
  comment: 'text-[var(--color-text-tertiary)] italic',
  annotation: 'text-[#ffcb6b]',
  number: 'text-[#f78c6c]',
};

export function StudioCodeViewer({
  code,
  filename,
  activeLine,
  highlightLines = [],
  onLineClick,
  className,
}: StudioCodeViewerProps) {
  const [copied, setCopied] = useState(false);
  const lines = useMemo(() => code.split('\n'), [code]);
  const highlightSet = useMemo(() => new Set(highlightLines), [highlightLines]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <div className={cn('rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-input)] overflow-hidden', className)}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)]">
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
          <FileCode2 className="w-4 h-4 text-[var(--color-accent-primary)]" />
          <span className="font-mono">{filename}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 text-xs rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-input)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
          aria-label="Copy code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-[var(--color-accent-success)]" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto text-sm leading-relaxed py-2" role="region" aria-label="Java code">
        <code>
          {lines.map((line, idx) => {
            const lineNo = idx + 1;
            const isActive = activeLine === lineNo;
            const isHighlighted = highlightSet.has(lineNo);
            return (
              <div
                key={lineNo}
                role="button"
                tabIndex={0}
                onClick={() => onLineClick?.(lineNo)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onLineClick?.(lineNo);
                  }
                }}
                className={cn(
                  'flex gap-3 px-3 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[var(--color-border-focus)]',
                  isActive && 'bg-[var(--color-accent-primary)]/15 border-l-2 border-l-[var(--color-accent-primary)]',
                  !isActive && isHighlighted && 'bg-[var(--color-accent-warning)]/10 border-l-2 border-l-[var(--color-accent-warning)]',
                  !isActive && !isHighlighted && 'border-l-2 border-l-transparent hover:bg-[var(--color-bg-tertiary)]/60'
                )}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="select-none w-8 text-right text-[var(--color-text-tertiary)] font-mono text-xs pt-0.5">
                  {lineNo}
                </span>
                <span className="font-mono whitespace-pre">
                  {tokenizeLine(line).map((tok, ti) => (
                    <span key={ti} className={KIND_CLASS[tok.kind]}>
                      {tok.text}
                    </span>
                  ))}
                  {line.length === 0 ? ' ' : ''}
                </span>
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
