import { useState, type ReactNode } from 'react';
import { Copy, Check, Download, Terminal, Maximize2 } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button, Tooltip } from '@/components/ui';

const JAVA_KEYWORDS = [
  'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class',
  'const', 'continue', 'default', 'do', 'double', 'else', 'enum', 'extends', 'final',
  'finally', 'float', 'for', 'goto', 'if', 'implements', 'import', 'instanceof', 'int',
  'interface', 'long', 'native', 'new', 'package', 'private', 'protected', 'public',
  'return', 'short', 'static', 'strictfp', 'super', 'switch', 'synchronized', 'this',
  'throw', 'throws', 'transient', 'try', 'void', 'volatile', 'while', 'true', 'false',
  'null', 'var', 'record', 'sealed', 'non-sealed', 'permits', 'yield',
];

const JAVA_TYPES = [
  'String', 'Integer', 'Double', 'Float', 'Long', 'Short', 'Byte', 'Character', 'Boolean',
  'Object', 'ArrayList', 'HashMap', 'HashSet', 'List', 'Set', 'Map', 'Collection',
  'Stream', 'Optional', 'CompletableFuture',
];

function highlightJavaCode(code: string): ReactNode[] {
  const lines = code.split('\n');
  return lines.map((line, lineIndex) => (
    <div key={lineIndex} className="flex">
      <span className="w-8 text-right pr-3 text-[var(--color-text-tertiary)] select-none -ml-8">
        {lineIndex + 1}
      </span>
      <span className="flex-1">{highlightLine(line)}</span>
    </div>
  ));
}

function highlightLine(line: string): ReactNode[] {
  const tokens: ReactNode[] = [];
  let remaining = line;
  let lastIndex = 0;

  const patterns = [
    { regex: /("(?:[^"\\]|\\.)*")/g, className: 'text-green-400' }, // strings
    { regex: /('(?:[^'\\]|\\.)*')/g, className: 'text-green-400' }, // chars
    { regex: /(\/\/.*$)/g, className: 'text-[var(--color-text-tertiary)] italic' }, // comments
    { regex: /\b\d+(\.\d+)?\b/g, className: 'text-yellow-400' }, // numbers
    { regex: new RegExp(`\\b(${JAVA_KEYWORDS.join('|')})\\b`, 'g'), className: 'text-purple-400 font-medium' }, // keywords
    { regex: new RegExp(`\\b(${JAVA_TYPES.join('|')})\\b`, 'g'), className: 'text-blue-400' }, // types
    { regex: /(@\w+)/g, className: 'text-orange-400' }, // annotations
  ];

  const matches: { index: number; length: number; className: string; text: string }[] = [];

  for (const { regex, className } of patterns) {
    let match;
    while ((match = regex.exec(remaining)) !== null) {
      matches.push({
        index: match.index,
        length: match[0].length,
        className,
        text: match[0],
      });
    }
  }

  matches.sort((a, b) => a.index - b.index);

  for (const match of matches) {
    if (match.index > lastIndex) {
      tokens.push(<span key={lastIndex}>{remaining.slice(lastIndex, match.index)}</span>);
    }
    tokens.push(
      <span key={match.index} className={match.className}>{match.text}</span>
    );
    lastIndex = match.index + match.length;
  }

  if (lastIndex < remaining.length) {
    tokens.push(<span key={lastIndex}>{remaining.slice(lastIndex)}</span>);
  }

  return tokens.length > 0 ? tokens : [<span key="fallback">{line}</span>];
}

interface JavaCodeBlockProps {
  code: string;
  title?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  language?: 'java' | 'typescript' | 'bash' | 'json';
  copyable?: boolean;
  downloadable?: boolean;
  expandable?: boolean;
  maxHeight?: string;
  className?: string;
  filename?: string;
}

export function JavaCodeBlock({
  code,
  title,
  showLineNumbers = true,
  highlightLines: _highlightLines = [],
  language = 'java',
  copyable = true,
  downloadable = false,
  expandable = false,
  maxHeight = '400px',
  className,
  filename,
}: JavaCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy:', e);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || `code.${language}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const displayCode = expanded ? code : code.split('\n').slice(0, 50).join('\n');
  const isTruncated = code.split('\n').length > 50;

  return (
    <div className={cn('rounded-xl border border-[var(--color-border-primary)] overflow-hidden bg-[var(--color-bg-input)]', className)}>
      {(title || copyable || downloadable || expandable) && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)]">
          <div className="flex items-center gap-2">
            {title && (
              <span className="text-sm font-medium text-[var(--color-text-primary)] flex items-center gap-1.5">
                <Terminal className="w-4 h-4" />
                {title}
              </span>
            )}
            {filename && (
              <span className="px-2 py-0.5 text-xs bg-[var(--color-bg-input)] rounded text-[var(--color-text-tertiary)]">
                {filename}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {copyable && (
              <Tooltip content={copied ? 'Copied!' : 'Copy to clipboard'}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  aria-label="Copy code"
                  className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
                >
                  {copied ? <Check className="w-4 h-4 text-[var(--color-accent-success)]" /> : <Copy className="w-4 h-4" />}
                </Button>
              </Tooltip>
            )}
            {downloadable && (
              <Tooltip content="Download">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDownload}
                  aria-label="Download code"
                  className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </Tooltip>
            )}
            {expandable && isTruncated && (
              <Tooltip content={expanded ? 'Collapse' : 'Expand'}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setExpanded(!expanded)}
                  aria-label={expanded ? 'Collapse code' : 'Expand code'}
                  className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </Tooltip>
            )}
          </div>
        </div>
      )}
      <div
        className={cn(
          'font-mono text-sm leading-relaxed',
          'tab-size-4'
        )}
        style={{
          maxHeight: expanded ? 'none' : maxHeight,
          overflow: 'auto',
        }}
      >
        <pre className="p-4 m-0">
          <code className="text-[var(--color-text-primary)]">
            {showLineNumbers ? (
              highlightJavaCode(displayCode)
            ) : (
              displayCode
            )}
          </code>
        </pre>
      </div>
      {expandable && isTruncated && !expanded && (
        <div className="px-4 py-3 border-t border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)]">
          <Button variant="ghost" size="sm" onClick={() => setExpanded(true)} className="w-full">
            Show {code.split('\n').length - 50} more lines
          </Button>
        </div>
      )}
    </div>
  );
}