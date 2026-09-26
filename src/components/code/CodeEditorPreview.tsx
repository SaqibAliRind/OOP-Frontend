import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const DEMO_LINES = [
  'class Student {',
  '  private String name;',
  '',
  '  public Student(String name) {',
  '    this.name = name;',
  '  }',
  '',
  '  public void study() {',
  '    System.out.println(name + " is learning OOP");',
  '  }',
  '}',
];

interface CodeEditorPreviewProps {
  className?: string;
}

export function CodeEditorPreview({ className }: CodeEditorPreviewProps) {
  const reducedMotion = useReducedMotion();
  const [visibleLines, setVisibleLines] = useState(reducedMotion ? DEMO_LINES.length : 0);
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    if (reducedMotion) return;
    if (visibleLines >= DEMO_LINES.length) return;
    const t = window.setTimeout(() => setVisibleLines(v => v + 1), 220);
    return () => window.clearTimeout(t);
  }, [visibleLines, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const t = window.setInterval(() => setCursorOn(c => !c), 530);
    return () => window.clearInterval(t);
  }, [reducedMotion]);

  const lines = DEMO_LINES.slice(0, visibleLines);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={cn(
        'rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-input)] overflow-hidden shadow-[var(--shadow-xl)]',
        className
      )}
    >
      <div className="px-4 py-2 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)] flex items-center justify-between">
        <span className="text-xs font-mono text-[var(--color-text-tertiary)]">Student.java</span>
        <span className="text-[10px] uppercase tracking-widest text-[var(--color-accent-primary)]">Live Preview</span>
      </div>
      <pre className="p-4 m-0 font-mono text-sm leading-relaxed overflow-x-auto">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="w-8 text-right pr-3 text-[var(--color-text-tertiary)] select-none">{i + 1}</span>
              <span className="text-[var(--color-text-primary)]">
                {line || ' '}
                {i === lines.length - 1 && (
                  <span
                    className={cn(
                      'inline-block w-2 h-4 ml-0.5 align-middle bg-[var(--color-accent-primary)]',
                      cursorOn ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                )}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </motion.div>
  );
}
