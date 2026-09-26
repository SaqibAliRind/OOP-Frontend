import { useEffect, useRef, useState } from 'react';
import { Timer, AlertTriangle } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Badge } from '@/components/ui';
import { useLanguage } from '@/contexts/LanguageContext';

function formatSeconds(total: number): string {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

interface CountdownTimerProps {
  deadlineAt: number | null;
  onExpire?: () => void;
  className?: string;
}

export function CountdownTimer({ deadlineAt, onExpire, className }: CountdownTimerProps) {
  const { language } = useLanguage();
  const [seconds, setSeconds] = useState<number | null>(null);
  const expiredRef = useRef(false);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    expiredRef.current = false;
    if (!deadlineAt) {
      return;
    }
    const tick = () => {
      const remaining = Math.max(0, Math.floor((deadlineAt - Date.now()) / 1000));
      setSeconds(remaining);
      if (remaining <= 0 && !expiredRef.current) {
        expiredRef.current = true;
        onExpireRef.current?.();
      }
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [deadlineAt]);

  if (deadlineAt === null) {
    return (
      <div className={cn('flex items-center gap-2 text-sm text-[var(--color-text-secondary)]', className)}>
        <Timer className="w-4 h-4" />
        <span>{language === 'ur' ? 'Koi time limit nahi' : 'No time limit'}</span>
      </div>
    );
  }

  const critical = seconds !== null && seconds <= 60;
  const warning = seconds !== null && seconds <= 300;

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-sm',
        critical
          ? 'border-[var(--color-accent-error)] bg-[var(--color-accent-error)]/10 text-[var(--color-accent-error)]'
          : warning
            ? 'border-[var(--color-accent-warning)] bg-[var(--color-accent-warning)]/10 text-[var(--color-accent-warning)]'
            : 'border-[var(--color-border-primary)] bg-[var(--color-bg-input)] text-[var(--color-text-primary)]',
        className
      )}
      role="timer"
      aria-live="polite"
      aria-label={language === 'ur' ? 'Exam time left' : 'Time remaining'}
    >
      <Timer className="w-4 h-4 shrink-0" />
      <span>{seconds === null ? '--:--' : formatSeconds(seconds)}</span>
      {critical && <AlertTriangle className="w-3.5 h-3.5 shrink-0" />}
      <Badge variant={critical ? 'error' : warning ? 'warning' : 'secondary'} size="sm">
        {language === 'ur' ? 'Session timer' : 'Session timer'}
      </Badge>
    </div>
  );
}

interface ExamWorkspaceProps {
  sectionLabel: string;
  questionNumber: number;
  totalQuestions: number;
  marks: number;
  prompt: string;
  codeSnippet?: string;
  options?: string[];
  selected?: string;
  freeText?: string;
  marked?: boolean;
  showMarkButton?: boolean;
  onSelectOption?: (opt: string) => void;
  onFreeTextChange?: (text: string) => void;
  onToggleMark?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  canPrev?: boolean;
  canNext?: boolean;
  navigator?: React.ReactNode;
  timer?: React.ReactNode;
  footerExtra?: React.ReactNode;
  className?: string;
}

export function ExamWorkspace({
  sectionLabel,
  questionNumber,
  totalQuestions,
  marks,
  prompt,
  codeSnippet,
  options,
  selected,
  freeText,
  marked,
  showMarkButton = true,
  onSelectOption,
  onFreeTextChange,
  onToggleMark,
  onPrev,
  onNext,
  onSubmit,
  canPrev = true,
  canNext = true,
  navigator,
  timer,
  footerExtra,
  className,
}: ExamWorkspaceProps) {
  const { language } = useLanguage();

  return (
    <div className={cn('grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]', className)}>
      <div className="space-y-4 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="primary" size="sm">{sectionLabel}</Badge>
            <Badge variant="secondary" size="sm">
              {language === 'ur' ? 'Sawal' : 'Q'} {questionNumber}/{totalQuestions}
            </Badge>
            <Badge variant="xp" size="sm">{marks} {language === 'ur' ? 'num' : 'marks'}</Badge>
            {marked && <Badge variant="warning" size="sm">{language === 'ur' ? 'Review' : 'Marked'}</Badge>}
          </div>
          {timer}
        </div>

        <div className="p-4 rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)] space-y-3">
          <p className="text-[15px] leading-relaxed text-[var(--color-text-primary)] whitespace-pre-wrap" tabIndex={0}>
            {prompt}
          </p>
          {codeSnippet && (
            <pre className="bg-[var(--color-bg-input)] rounded-lg p-3 font-mono text-xs overflow-x-auto border border-[var(--color-border-primary)] text-[var(--color-text-primary)]">
              {codeSnippet}
            </pre>
          )}
        </div>

        {options && options.length > 0 && (
          <fieldset className="space-y-2" aria-label="Answer options">
            <legend className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              {language === 'ur' ? 'Jawab chunein' : 'Select an answer'}
            </legend>
            {options.map((opt, i) => {
              const isSelected = selected === opt;
              return (
                <label
                  key={i}
                  className={cn(
                    'flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors',
                    'focus-within:ring-2 focus-within:ring-[var(--color-border-focus)]',
                    isSelected
                      ? 'border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/10'
                      : 'border-[var(--color-border-primary)] hover:border-[var(--color-accent-primary)]/40'
                  )}
                >
                  <input
                    type="radio"
                    name="exam-option"
                    value={opt}
                    checked={isSelected}
                    onChange={() => onSelectOption?.(opt)}
                    className="mt-1 accent-[var(--color-accent-primary)]"
                  />
                  <span className="text-sm text-[var(--color-text-primary)] font-mono">{opt}</span>
                </label>
              );
            })}
          </fieldset>
        )}

        {(options === undefined || options.length === 0) && onFreeTextChange !== undefined && (
          <div className="space-y-2">
            <label htmlFor="exam-free-text" className="text-sm font-medium text-[var(--color-text-secondary)]">
              {language === 'ur' ? 'Apna jawab likhein (self-assessment ke liye)' : 'Write your answer (for self-assessment)'}
            </label>
            <textarea
              id="exam-free-text"
              value={freeText || ''}
              onChange={e => onFreeTextChange(e.target.value)}
              rows={6}
              className="w-full p-3 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-bg-input)] text-[var(--color-text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)] font-mono"
              placeholder={language === 'ur' ? 'Key points likhein...' : 'Write key points...'}
            />
          </div>
        )}

        {footerExtra}

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onPrev}
              disabled={!canPrev}
              className="px-4 py-2 text-sm rounded-lg border border-[var(--color-border-primary)] text-[var(--color-text-primary)] disabled:opacity-40 hover:border-[var(--color-accent-primary)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
            >
              ← {language === 'ur' ? 'Pichla' : 'Previous'}
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!canNext}
              className="px-4 py-2 text-sm rounded-lg border border-[var(--color-border-primary)] text-[var(--color-text-primary)] disabled:opacity-40 hover:border-[var(--color-accent-primary)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
            >
              {language === 'ur' ? 'Agla' : 'Next'} →
            </button>
          </div>
          <div className="flex gap-2">
            {showMarkButton && (
              <button
                type="button"
                onClick={onToggleMark}
                className={cn(
                  'px-3 py-2 text-sm rounded-lg border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
                  marked
                    ? 'border-[var(--color-accent-warning)] text-[var(--color-accent-warning)] bg-[var(--color-accent-warning)]/10'
                    : 'border-[var(--color-border-primary)] text-[var(--color-text-secondary)]'
                )}
              >
                {language === 'ur' ? 'Review ke liye mark' : 'Mark for review'}
              </button>
            )}
            {onSubmit && (
              <button
                type="button"
                onClick={onSubmit}
                className="px-4 py-2 text-sm rounded-lg bg-[var(--color-accent-primary)] text-white font-medium hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
              >
                {language === 'ur' ? 'Exam Jama Karein' : 'Submit Exam'}
              </button>
            )}
          </div>
        </div>
      </div>

      {navigator && (
        <aside className="space-y-3" aria-label="Question navigator">
          {navigator}
        </aside>
      )}
    </div>
  );
}

interface QuestionNavigatorProps {
  total: number;
  currentIndex: number;
  answered: Set<string>;
  marked: Set<string>;
  questionIds: string[];
  onJump: (index: number) => void;
  sectionOf?: (index: number) => string;
  className?: string;
}

export function QuestionNavigator({
  total,
  currentIndex,
  answered,
  marked,
  questionIds,
  onJump,
  sectionOf,
  className,
}: QuestionNavigatorProps) {
  const { language } = useLanguage();
  return (
    <div className={cn('p-3 rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)]', className)}>
      <p className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wide mb-2">
        {language === 'ur' ? 'Navigator' : 'Navigator'}
      </p>
      <div className="grid grid-cols-5 gap-1.5">
        {questionIds.slice(0, total).map((id, i) => {
          const isAnswered = answered.has(id);
          const isMarked = marked.has(id);
          const isCurrent = i === currentIndex;
          return (
            <button
              key={id + i}
              type="button"
              onClick={() => onJump(i)}
              aria-label={`Question ${i + 1}${isAnswered ? ', answered' : ''}${isMarked ? ', marked' : ''}`}
              aria-current={isCurrent ? 'true' : undefined}
              className={cn(
                'h-8 text-xs rounded-md border font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
                isCurrent && 'ring-2 ring-[var(--color-accent-primary)]',
                isMarked && 'border-[var(--color-accent-warning)] text-[var(--color-accent-warning)]',
                !isMarked && isAnswered && 'border-[var(--color-accent-success)] text-[var(--color-accent-success)] bg-[var(--color-accent-success)]/10',
                !isMarked && !isAnswered && 'border-[var(--color-border-primary)] text-[var(--color-text-tertiary)]'
              )}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <div className="mt-3 space-y-1 text-[11px] text-[var(--color-text-tertiary)]">
        <p><span className="inline-block w-2 h-2 rounded bg-[var(--color-accent-success)] mr-1" />{language === 'ur' ? 'Jawab shuda' : 'Answered'}</p>
        <p><span className="inline-block w-2 h-2 rounded bg-[var(--color-accent-warning)] mr-1" />{language === 'ur' ? 'Review mark' : 'Marked for review'}</p>
        <p>{language === 'ur' ? 'Section' : 'Section'}: {sectionOf?.(currentIndex) || '—'}</p>
      </div>
    </div>
  );
}

export function useBeforeUnloadWhen(active: boolean, message: string) {
  useEffect(() => {
    if (!active) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = message;
      return message;
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [active, message]);
}

export function useExamKeyboard(onNext?: () => void, onPrev?: () => void) {
  const cbNext = useRef(onNext);
  const cbPrev = useRef(onPrev);
  useEffect(() => {
    cbNext.current = onNext;
    cbPrev.current = onPrev;
  }, [onNext, onPrev]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT')) return;
      if (e.key === 'ArrowRight') cbNext.current?.();
      if (e.key === 'ArrowLeft') cbPrev.current?.();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
}

export function useSaveShortcut(save: () => void) {
  const ref = useRef(save);
  useEffect(() => {
    ref.current = save;
  }, [save]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        ref.current();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
}

export function useStableInterval(callback: () => void, delayMs: number, active: boolean) {
  const cbRef = useRef(callback);
  useEffect(() => {
    cbRef.current = callback;
  }, [callback]);
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => {
      cbRef.current();
    }, delayMs);
    return () => window.clearInterval(id);
  }, [delayMs, active]);
}
