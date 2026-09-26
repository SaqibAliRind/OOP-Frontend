import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderTree,
  ChevronRight,
  Search,
  BookOpen,
  ListChecks,
  Lightbulb,
} from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Badge, Card } from '@/components/ui';
import { EmptyState } from '@/components/ui/EmptyState';
import { HintSystem } from '@/components/learning/HintSystem';
import { useLanguage } from '@/contexts/LanguageContext';
import type {
  CodeStudioCategory,
  CodeStudioMission,
  JavaCodeExample,
  OutputPredictionChallenge,
  CodeCompletionChallenge,
  CodeAnalysisChallenge,
  StudioDebugChallenge,
} from '@/types/codeStudio';
import type { CodeStudioCategoryMeta } from '@/types/codeStudio';

interface ExplorerProps {
  categories: CodeStudioCategoryMeta[];
  examples: JavaCodeExample[];
  selectedCategory: CodeStudioCategory | 'all';
  onCategoryChange: (c: CodeStudioCategory | 'all') => void;
  selectedExampleId: string;
  onSelectExample: (id: string) => void;
  exploredIds: string[];
  className?: string;
}

export function StudioExplorer({
  categories,
  examples,
  selectedCategory,
  onCategoryChange,
  selectedExampleId,
  onSelectExample,
  exploredIds,
  className,
}: ExplorerProps) {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return examples;
    return examples.filter(
      e =>
        e.title.toLowerCase().includes(q) ||
        e.titleUrdu.toLowerCase().includes(q) ||
        e.topic.toLowerCase().includes(q) ||
        e.filename.toLowerCase().includes(q)
    );
  }, [examples, query]);

  return (
    <aside className={cn('flex flex-col gap-3 h-full min-h-0', className)} aria-label="Code example explorer">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-tertiary)]" />
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={language === 'ur' ? 'Examples search...' : 'Search examples...'}
          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-bg-input)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)]"
          aria-label="Search code examples"
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => onCategoryChange('all')}
          className={cn(
            'px-2.5 py-1 text-xs rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
            selectedCategory === 'all'
              ? 'bg-[var(--color-accent-primary)]/20 border-[var(--color-accent-primary)] text-[var(--color-text-primary)]'
              : 'border-[var(--color-border-primary)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-primary)]/40'
          )}
        >
          {language === 'ur' ? 'Sab' : 'All'}
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onCategoryChange(cat.id)}
            title={language === 'ur' ? cat.labelUrdu : cat.label}
            className={cn(
              'px-2.5 py-1 text-xs rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
              selectedCategory === cat.id
                ? 'bg-[var(--color-accent-primary)]/20 border-[var(--color-accent-primary)] text-[var(--color-text-primary)]'
                : 'border-[var(--color-border-primary)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-primary)]/40'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 pr-0.5 min-h-0">
        {filtered.length === 0 && (
          <EmptyState
            icon={<FolderTree className="w-8 h-8" />}
            title={language === 'ur' ? 'Koi example nahi mili' : 'No examples found'}
            description={language === 'ur' ? 'Filter ya search badlein.' : 'Try a different filter or search.'}
          />
        )}
        {filtered.map(ex => {
          const active = ex.id === selectedExampleId;
          const explored = exploredIds.includes(ex.id);
          return (
            <button
              key={ex.id}
              type="button"
              onClick={() => onSelectExample(ex.id)}
              className={cn(
                'w-full text-left px-3 py-2.5 rounded-lg border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
                active
                  ? 'border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/10'
                  : 'border-transparent hover:bg-[var(--color-bg-tertiary)]'
              )}
              aria-current={active ? 'true' : undefined}
            >
              <div className="flex items-start justify-between gap-2">
                <span className={cn('text-sm font-medium', active ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]')}>
                  {language === 'ur' ? ex.titleUrdu : ex.title}
                </span>
                {explored && (
                  <span className="text-[10px] text-[var(--color-accent-success)] shrink-0" title="Explored">
                    ✓
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[11px] font-mono text-[var(--color-text-tertiary)]">{ex.filename}</span>
                <Badge variant={ex.difficulty === 'easy' ? 'success' : ex.difficulty === 'hard' ? 'error' : 'warning'} size="sm">
                  {ex.difficulty}
                </Badge>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

interface ChallengeCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export function ChallengeCard({ title, description, children, className }: ChallengeCardProps) {
  return (
    <Card variant="default" padding="lg" className={cn('space-y-4', className)}>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <ListChecks className="w-4 h-4 text-[var(--color-accent-primary)]" />
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{title}</h3>
        </div>
        <p className="text-xs text-[var(--color-text-secondary)]">{description}</p>
      </div>
      {children}
    </Card>
  );
}

interface PredictionPanelProps {
  challenges: OutputPredictionChallenge[];
  results: Record<string, boolean>;
  onResult: (id: string, correct: boolean) => void;
}

export function PredictionPanel({ challenges, results, onResult }: PredictionPanelProps) {
  const { language } = useLanguage();
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  if (challenges.length === 0) {
    return (
      <EmptyState
        icon={<ListChecks className="w-8 h-8" />}
        title={language === 'ur' ? 'Koi prediction challenge nahi' : 'No prediction challenges'}
        description={language === 'ur' ? 'Doosra mode try karein.' : 'Try another mode.'}
      />
    );
  }

  return (
    <div className="space-y-4">
      {challenges.map(c => {
        const isRevealed = revealed[c.id] || results[c.id] !== undefined;
        const chosen = selected[c.id];
        return (
          <ChallengeCard key={c.id} title={language === 'ur' ? 'Output Predict Karein' : 'Predict the Output'} description={c.conceptTested}>
            <pre className="bg-[var(--color-bg-input)] rounded-lg p-3 font-mono text-xs text-[var(--color-text-primary)] overflow-x-auto border border-[var(--color-border-primary)]">
              {c.code}
            </pre>
            <div className="space-y-2">
              {c.options.map((opt, i) => {
                const show = isRevealed;
                const isCorrect = opt === c.correctOutput;
                const isChosen = chosen === opt;
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => {
                      setSelected(s => ({ ...s, [c.id]: opt }));
                      const correct = opt === c.correctOutput;
                      setRevealed(r => ({ ...r, [c.id]: true }));
                      onResult(c.id, correct);
                    }}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-lg border text-sm font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
                      show && isCorrect && 'border-[var(--color-accent-success)] bg-[var(--color-accent-success)]/10 text-[var(--color-accent-success)]',
                      show && isChosen && !isCorrect && 'border-[var(--color-accent-error)] bg-[var(--color-accent-error)]/10 text-[var(--color-accent-error)]',
                      !show && 'border-[var(--color-border-primary)] hover:border-[var(--color-accent-primary)]/50 text-[var(--color-text-primary)]'
                    )}
                  >
                    {String.fromCharCode(65 + i)}. {opt}
                  </button>
                );
              })}
            </div>
            {isRevealed && (
              <div className="p-3 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] space-y-1">
                <p className="text-sm text-[var(--color-text-primary)]">
                  <strong>{language === 'ur' ? 'Sahi:' : 'Correct:'}</strong> {c.correctOutput}
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">{language === 'ur' ? c.explanationUrdu : c.explanation}</p>
              </div>
            )}
          </ChallengeCard>
        );
      })}
    </div>
  );
}

interface CompletionPanelProps {
  challenges: CodeCompletionChallenge[];
  results: Record<string, boolean>;
  onResult: (id: string, correct: boolean) => void;
}

export function CompletionPanel({ challenges, results, onResult }: CompletionPanelProps) {
  const { language } = useLanguage();
  const [chosen, setChosen] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  if (challenges.length === 0) {
    return (
      <EmptyState
        icon={<ListChecks className="w-8 h-8" />}
        title={language === 'ur' ? 'Koi completion challenge nahi' : 'No completion challenges'}
        description={language === 'ur' ? 'Doosra mode try karein.' : 'Try another mode.'}
      />
    );
  }

  return (
    <div className="space-y-4">
      {challenges.map(c => {
        const isRevealed = revealed[c.id] || results[c.id] !== undefined;
        const selected = chosen[c.id];
        const parts = c.codeTemplate.split('__________');
        return (
          <ChallengeCard key={c.id} title={language === 'ur' ? 'Code Mukammal Karein' : 'Complete the Code'} description={language === 'ur' ? c.requirementUrdu : c.requirement}>
            <pre className="bg-[var(--color-bg-input)] rounded-lg p-3 font-mono text-xs overflow-x-auto border border-[var(--color-border-primary)] text-[var(--color-text-primary)]">
              {parts.map((part, i) => (
                <span key={i}>
                  {part}
                  {i < parts.length - 1 && (
                    <span className="inline-block min-w-[80px] mx-1 px-2 py-0.5 rounded border border-dashed border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/5 text-[var(--color-accent-primary)]">
                      {isRevealed ? c.correctChoice : (selected || '???')}
                    </span>
                  )}
                </span>
              ))}
            </pre>
            {!isRevealed && (
              <div className="flex flex-wrap gap-2">
                {c.choices.map(choice => (
                  <button
                    key={choice}
                    type="button"
                    onClick={() => {
                      setChosen(s => ({ ...s, [c.id]: choice }));
                      const correct = choice === c.correctChoice;
                      setRevealed(r => ({ ...r, [c.id]: true }));
                      onResult(c.id, correct);
                    }}
                    className="px-3 py-1.5 text-xs font-mono rounded-lg border border-[var(--color-border-primary)] text-[var(--color-text-primary)] hover:border-[var(--color-accent-primary)]/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
                  >
                    {choice}
                  </button>
                ))}
              </div>
            )}
            {isRevealed && (
              <div className="p-3 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] space-y-1">
                <p className="text-sm text-[var(--color-text-primary)]">
                  <strong>{language === 'ur' ? 'Sahi:' : 'Correct:'}</strong>{' '}
                  <span className="font-mono">{c.correctChoice}</span>
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">{language === 'ur' ? c.explanationUrdu : c.explanation}</p>
              </div>
            )}
            {!isRevealed && <HintSystem hints={c.hints} xpPenalty />}
          </ChallengeCard>
        );
      })}
    </div>
  );
}

interface AnalysisPanelProps {
  challenges: CodeAnalysisChallenge[];
  results: Record<string, boolean>;
  onResult: (id: string, correct: boolean) => void;
}

export function AnalysisPanel({ challenges, results, onResult }: AnalysisPanelProps) {
  const { language } = useLanguage();
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  if (challenges.length === 0) {
    return (
      <EmptyState
        icon={<BookOpen className="w-8 h-8" />}
        title={language === 'ur' ? 'Koi analysis challenge nahi' : 'No analysis challenges'}
      />
    );
  }

  return (
    <div className="space-y-4">
      {challenges.map(c => {
        const isRevealed = revealed[c.id] || results[c.id] !== undefined;
        return (
          <ChallengeCard
            key={c.id}
            title={language === 'ur' ? 'Code Padhein / Analyze Karein' : 'Read & Analyze the Code'}
            description={c.conceptTested}
          >
            <pre className="bg-[var(--color-bg-input)] rounded-lg p-3 font-mono text-xs overflow-x-auto border border-[var(--color-border-primary)] text-[var(--color-text-primary)]">
              {c.code}
            </pre>
            <p className="text-sm font-medium text-[var(--color-text-primary)]">
              {language === 'ur' ? c.questionUrdu : c.question}
            </p>
            <div className="space-y-2">
              {c.options.map((opt, i) => {
                const isCorrect = i === c.correctIndex;
                const isChosen = selected[c.id] === i;
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => {
                      setSelected(s => ({ ...s, [c.id]: i }));
                      setRevealed(r => ({ ...r, [c.id]: true }));
                      onResult(c.id, isCorrect);
                    }}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-lg border text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
                      isRevealed && isCorrect && 'border-[var(--color-accent-success)] bg-[var(--color-accent-success)]/10 text-[var(--color-accent-success)]',
                      isRevealed && isChosen && !isCorrect && 'border-[var(--color-accent-error)] bg-[var(--color-accent-error)]/10 text-[var(--color-accent-error)]',
                      !isRevealed && 'border-[var(--color-border-primary)] hover:border-[var(--color-accent-primary)]/50 text-[var(--color-text-primary)]'
                    )}
                  >
                    {String.fromCharCode(65 + i)}. {opt}
                  </button>
                );
              })}
            </div>
            {isRevealed && (
              <div className="p-3 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)]">
                <p className="text-xs text-[var(--color-text-secondary)]">{language === 'ur' ? c.explanationUrdu : c.explanation}</p>
              </div>
            )}
          </ChallengeCard>
        );
      })}
    </div>
  );
}

interface DebugPanelProps {
  challenges: StudioDebugChallenge[];
  results: Record<string, boolean>;
  onResult: (id: string, correct: boolean) => void;
}

export function DebugPanel({ challenges, results, onResult }: DebugPanelProps) {
  const { language } = useLanguage();
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-4">
      {challenges.map(c => {
        const isRevealed = revealed[c.id] || results[c.id] !== undefined;
        return (
          <ChallengeCard
            key={c.id}
            title={language === 'ur' ? c.titleUrdu : c.title}
            description={c.conceptTested}
          >
            <pre className="bg-[var(--color-bg-input)] rounded-lg p-3 font-mono text-xs overflow-x-auto border border-[var(--color-border-primary)] text-[var(--color-error, #f87171)] whitespace-pre-wrap">
              {c.buggyCode}
            </pre>
            <div className="flex items-start gap-2 text-sm text-[var(--color-text-primary)]">
              <Lightbulb className="w-4 h-4 mt-0.5 text-[var(--color-accent-warning)] shrink-0" />
              <span>{language === 'ur' ? c.questionUrdu : c.question}</span>
            </div>
            <div className="space-y-2">
              {c.corrections.map((corr, i) => {
                const isCorrect = i === c.correctCorrectionIndex;
                const isChosen = selected[c.id] === i;
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => {
                      setSelected(s => ({ ...s, [c.id]: i }));
                      setRevealed(r => ({ ...r, [c.id]: true }));
                      onResult(c.id, isCorrect);
                    }}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-lg border text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
                      isRevealed && isCorrect && 'border-[var(--color-accent-success)] bg-[var(--color-accent-success)]/10 text-[var(--color-accent-success)]',
                      isRevealed && isChosen && !isCorrect && 'border-[var(--color-accent-error)] bg-[var(--color-accent-error)]/10 text-[var(--color-accent-error)]',
                      !isRevealed && 'border-[var(--color-border-primary)] hover:border-[var(--color-accent-primary)]/50 text-[var(--color-text-primary)]'
                    )}
                  >
                    <ChevronRight className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                    {corr}
                  </button>
                );
              })}
            </div>
            {!isRevealed && <HintSystem hints={c.hints} />}
            {isRevealed && (
              <div className="p-3 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)]">
                <p className="text-xs text-[var(--color-text-secondary)]">{language === 'ur' ? c.explanationUrdu : c.explanation}</p>
                {c.relatedDebugTopic && (
                  <p className="text-[11px] text-[var(--color-text-tertiary)] mt-1">
                    relatedDebugTopic: {c.relatedDebugTopic}
                  </p>
                )}
              </div>
            )}
          </ChallengeCard>
        );
      })}
    </div>
  );
}

interface MissionListProps {
  missions: CodeStudioMission[];
  completedObjectives: string[];
  completedMissions: string[];
  className?: string;
}

export function MissionList({ missions, completedObjectives, completedMissions, className }: MissionListProps) {
  const { language } = useLanguage();
  const objSet = new Set(completedObjectives);

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center gap-2">
        <ListChecks className="w-4 h-4 text-[var(--color-accent-primary)]" />
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
          {language === 'ur' ? 'Studio Missions' : 'Studio Missions'}
        </h3>
        <Badge variant="xp" size="sm">
          {completedMissions.length}/{missions.length}
        </Badge>
      </div>
      {missions.map(m => {
        const done = completedMissions.includes(m.id);
        const doneObjs = m.objectives.filter(o => objSet.has(o.id)).length;
        return (
          <div
            key={m.id}
            className={cn(
              'p-3 rounded-lg border',
              done
                ? 'border-[var(--color-accent-success)]/40 bg-[var(--color-accent-success)]/5'
                : 'border-[var(--color-border-primary)] bg-[var(--color-bg-input)]'
            )}
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <p className="text-sm font-medium text-[var(--color-text-primary)]">
                {language === 'ur' ? m.titleUrdu : m.title}
              </p>
              <Badge variant={done ? 'success' : 'xp'} size="sm">+{m.xpReward} XP</Badge>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mb-2">
              {language === 'ur' ? m.descriptionUrdu : m.description}
            </p>
            <ul className="space-y-1">
              {m.objectives.map(o => {
                const complete = objSet.has(o.id);
                return (
                  <li key={o.id} className="flex items-start gap-2 text-xs">
                    <span className={cn('mt-0.5 w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0', complete ? 'bg-[var(--color-accent-success)] border-[var(--color-accent-success)] text-white' : 'border-[var(--color-border-primary)]')}>
                      {complete ? '✓' : ''}
                    </span>
                    <span className={complete ? 'text-[var(--color-text-tertiary)] line-through' : 'text-[var(--color-text-secondary)]'}>
                      {language === 'ur' ? o.labelUrdu : o.label}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="text-[11px] text-[var(--color-text-tertiary)] mt-1.5">
              {doneObjs}/{m.objectives.length} objectives
            </p>
          </div>
        );
      })}
    </div>
  );
}

interface InspectorProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function StudioInspector({ title, children, footer, className }: InspectorProps) {
  return (
    <div className={cn('flex flex-col gap-3 h-full min-h-0', className)} aria-label="Studio inspector">
      <div className="flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-[var(--color-accent-primary)]" />
        <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">{title}</h2>
      </div>
      <div className="flex-1 overflow-y-auto min-h-0 pr-0.5">{children}</div>
      {footer && <div className="pt-2 border-t border-[var(--color-border-primary)]">{footer}</div>}
    </div>
  );
}

export function ConceptualStateView({
  state,
  className,
}: {
  state?: {
    className?: string;
    referenceName?: string;
    objectCreated?: boolean;
    fields?: { name: string; value: string }[];
    methodBeingCalled?: string;
    outputLines?: string[];
  };
  className?: string;
}) {
  const { language } = useLanguage();
  if (!state) {
    return (
      <p className={cn('text-xs text-[var(--color-text-tertiary)]', className)}>
        {language === 'ur'
          ? 'Trace step shuru hone par conceptual state yahan dikhega (koi real JVM process nahi).'
          : 'Start a trace step to see conceptual state here (no real JVM process).'}
      </p>
    );
  }
  return (
    <div className={cn('space-y-2 text-xs', className)}>
      {state.className && (
        <div className="flex justify-between gap-2">
          <span className="text-[var(--color-text-tertiary)]">Class</span>
          <span className="font-mono text-[var(--color-text-primary)]">{state.className}</span>
        </div>
      )}
      {state.referenceName !== undefined && (
        <div className="flex justify-between gap-2">
          <span className="text-[var(--color-text-tertiary)]">Reference</span>
          <span className="font-mono text-[var(--color-text-primary)]">{state.referenceName || '—'}</span>
        </div>
      )}
      {state.objectCreated !== undefined && (
        <div className="flex justify-between gap-2">
          <span className="text-[var(--color-text-tertiary)]">Object</span>
          <span className={state.objectCreated ? 'text-[var(--color-accent-success)]' : 'text-[var(--color-accent-warning)]'}>
            {state.objectCreated ? 'created' : 'not yet'}
          </span>
        </div>
      )}
      {state.methodBeingCalled && (
        <div className="flex justify-between gap-2">
          <span className="text-[var(--color-text-tertiary)]">Method</span>
          <span className="font-mono text-[var(--color-accent-primary)]">{state.methodBeingCalled}()</span>
        </div>
      )}
      {state.fields && state.fields.length > 0 && (
        <div className="space-y-1">
          <span className="text-[var(--color-text-tertiary)]">Fields</span>
          {state.fields.map(f => (
            <div key={f.name} className="flex justify-between gap-2 pl-2 border-l border-[var(--color-border-primary)]">
              <span className="font-mono text-[var(--color-text-secondary)]">{f.name}</span>
              <span className="font-mono text-[var(--color-text-primary)]">{f.value}</span>
            </div>
          ))}
        </div>
      )}
      {state.outputLines && state.outputLines.length > 0 && (
        <div className="space-y-1">
          <span className="text-[var(--color-text-tertiary)]">Expected output</span>
          <pre className="bg-[var(--color-bg-input)] rounded p-2 font-mono text-[11px] text-[var(--color-accent-success)] border border-[var(--color-border-primary)]">
            {state.outputLines.join('\n')}
          </pre>
        </div>
      )}
    </div>
  );
}

export function ExampleMetaCard({ example, className }: { example: JavaCodeExample; className?: string }) {
  const { language } = useLanguage();
  return (
    <Card variant="default" padding="md" className={cn('space-y-2', className)}>
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="primary" size="sm">{example.category}</Badge>
        <Badge variant={example.difficulty === 'easy' ? 'success' : example.difficulty === 'hard' ? 'error' : 'warning'} size="sm">
          {example.difficulty}
        </Badge>
      </div>
      <p className="text-xs text-[var(--color-text-secondary)]">
        <span className="font-semibold">{language === 'ur' ? 'Key concept: ' : 'Key concept: '}</span>
        {language === 'ur' ? example.keyConceptUrdu : example.keyConcept}
      </p>
      <p className="text-xs text-[var(--color-accent-error)]/90">
        <span className="font-semibold">{language === 'ur' ? 'Common mistake: ' : 'Common mistake: '}</span>
        {language === 'ur' ? example.commonMistakeUrdu : example.commonMistake}
      </p>
      {example.expectedOutput && (
        <div>
          <p className="text-xs font-semibold text-[var(--color-text-tertiary)] mb-1">
            {language === 'ur' ? 'Expected output' : 'Expected output'} (simulated)
          </p>
          <pre className="bg-[var(--color-bg-input)] rounded p-2 font-mono text-[11px] text-[var(--color-accent-success)] border border-[var(--color-border-primary)]">
            {example.expectedOutput.join('\n')}
          </pre>
        </div>
      )}
      {example.relatedLessonId && (
        <Link
          to={`/lesson/${example.relatedLessonId}`}
          className="inline-flex items-center gap-1 text-xs text-[var(--color-accent-primary)] hover:underline"
        >
          {language === 'ur' ? 'Related lesson kholein' : 'Open related lesson'} →
        </Link>
      )}
    </Card>
  );
}
