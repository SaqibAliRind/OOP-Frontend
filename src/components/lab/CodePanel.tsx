import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Play, SkipForward, Pause, RotateCcw, FileCode2 } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button } from '@/components/ui';

interface CodeLine {
  number: number;
  content: string;
  isActive: boolean;
  isExecuted: boolean;
}

interface CodePanelProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  language: 'english' | 'romanUrdu';
  onRun: () => void;
  onStep: () => void;
  onPause: () => void;
  onReset: () => void;
  className?: string;
}

const JAVA_KEYWORDS = /\b(class|void|String|int|new|public|private|this|System|out|println|return|if|else|for|while|static)\b/g;
const JAVA_STRINGS = /"([^"\\]|\\.)*"/g;
const JAVA_COMMENTS = /(\/\/.*$)/gm;

function highlightJava(line: string): { text: string; className: string }[] {
  const tokens: { text: string; className: string; start: number; end: number }[] = [];

  const addMatches = (regex: RegExp, className: string) => {
    let match;
    const re = new RegExp(regex.source, regex.flags);
    while ((match = re.exec(line)) !== null) {
      tokens.push({ text: match[0], className, start: match.index, end: match.index + match[0].length });
    }
  };

  addMatches(JAVA_COMMENTS, 'text-white/30 italic');
  addMatches(JAVA_STRINGS, 'text-emerald-400');
  addMatches(JAVA_KEYWORDS, 'text-purple-400');

  tokens.sort((a, b) => a.start - b.start);

  const merged: { text: string; className: string }[] = [];
  let lastEnd = 0;

  for (const token of tokens) {
    if (token.start > lastEnd) {
      merged.push({ text: line.slice(lastEnd, token.start), className: 'text-white/70' });
    }
    if (token.start >= lastEnd) {
      merged.push({ text: token.text, className: token.className });
      lastEnd = token.end;
    }
  }

  if (lastEnd < line.length) {
    merged.push({ text: line.slice(lastEnd), className: 'text-white/70' });
  }

  return merged.length > 0 ? merged : [{ text: line, className: 'text-white/70' }];
}

const CLASS_CODE = [
  'class Student {',
  '    private String name;',
  '    private int age;',
  '',
  '    void study() {',
  '        System.out.println(name + " studying");',
  '    }',
  '',
  '    void setInfo(String name, int age) {',
  '        this.name = name;',
  '        this.age = age;',
  '    }',
  '}',
  '',
  'Student s1 = new Student();',
  's1.setInfo("Ali", 20);',
  'Student s2 = new Student();',
  's2.setInfo("Sara", 21);',
  'Student s3 = new Student();',
  's3.setInfo("Ahmed", 22);',
  's1.study();',
];

function buildCodeLines(currentStep: number): CodeLine[] {
  // Maps currentStep (0-based: 0=none, 1=step1, ..., 14=step14) to code line index
  // Steps use code lines: class=0, s1=s2=s3 decl/creation=14, setInfo=15, study=16
  const stepLineMap: Record<number, number> = {
    0: -1,
    1: 0,   // class Student {
    2: 14,  // Student s1 = new Student();
    3: 14,  // (create object s1)
    4: 15,  // s1.setInfo("Ali", 20);
    5: 15,  // (set age s1)
    6: 16,  // (declare s2)
    7: 16,  // (create s2)
    8: 17,  // (set name s2)
    9: 17,  // (set age s2)
    10: 18, // (declare s3)
    11: 18, // (create s3)
    12: 19, // (set name s3)
    13: 19, // (set age s3)
    14: 20, // s1.study();
  };

  const activeLine = stepLineMap[currentStep] ?? -1;
  const executedLines = new Set<number>();
  for (let i = 1; i <= currentStep && i <= 14; i++) {
    const line = stepLineMap[i];
    if (line !== undefined && line >= 0) executedLines.add(line);
  }

  return CLASS_CODE.map((content, idx) => ({
    number: idx + 1,
    content,
    isActive: idx === activeLine,
    isExecuted: executedLines.has(idx),
  }));
}

export function CodePanel({
  currentStep,
  totalSteps,
  isPlaying,
  language: _language,
  onRun,
  onStep,
  onPause,
  onReset,
  className,
}: CodePanelProps) {
  const codeLines = useMemo(() => buildCodeLines(currentStep), [currentStep]);
  const progressPct = totalSteps > 0 ? Math.round((currentStep / totalSteps) * 100) : 0;

  return (
    <div
      className={cn(
        'flex flex-col rounded-xl border border-white/10 overflow-hidden',
        'bg-[#0d1320] shadow-lg',
        className
      )}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
          </div>
          <div className="w-px h-3.5 bg-white/10" />
          <span className="flex items-center gap-1.5 text-[11px] font-mono text-white/40">
            <FileCode2 className="w-3 h-3" />
            Student.java
          </span>
        </div>
        <span className="text-[10px] font-mono text-white/30">
          {currentStep}/{totalSteps}
        </span>
      </div>

      {/* Code Editor — scrollable, constrained height */}
      <div className="max-h-[240px] overflow-auto scrollbar-thin bg-black/20">
        <table className="w-full border-collapse">
          <tbody>
            {codeLines.map((line) => (
              <tr
                key={line.number}
                className={cn(
                  'transition-colors duration-150',
                  line.isActive && 'bg-blue-500/8 border-l-2 border-l-blue-500',
                  line.isExecuted && !line.isActive && 'bg-emerald-500/5',
                  !line.isActive && !line.isExecuted && 'border-l-2 border-l-transparent'
                )}
              >
                <td className="w-10 text-right pr-3 py-0.5 select-none text-[10px] font-mono text-white/25">
                  {line.isExecuted && !line.isActive ? (
                    <span className="text-emerald-400">&#10003;</span>
                  ) : (
                    line.number
                  )}
                </td>
                <td className="py-0.5 pr-4">
                  <pre className="m-0 font-mono text-[12px] leading-5 whitespace-pre overflow-x-auto">
                    {highlightJava(line.content).map((token, i) => (
                      <span key={i} className={token.className}>{token.text}</span>
                    ))}
                  </pre>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Controls — compact row */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-white/5 bg-white/[0.015]">
        <div className="flex items-center gap-1.5">
          <Button
            variant={isPlaying ? 'danger' : 'success'}
            size="sm"
            onClick={isPlaying ? onPause : onRun}
            className="h-7 px-2.5 text-[11px]"
            aria-label={isPlaying ? 'Pause execution' : 'Run all steps'}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {isPlaying ? 'Stop' : 'Run'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onStep}
            disabled={isPlaying}
            className="h-7 px-2.5 text-[11px]"
            aria-label="Step forward"
          >
            <SkipForward className="w-3 h-3" />
            Step
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-7 px-2.5 text-[11px]"
            aria-label="Reset execution"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </Button>
        </div>
        <div className="h-1 w-16 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}
