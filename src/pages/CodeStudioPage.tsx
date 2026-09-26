import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Code2,
  ListTree,
  Bug,
  BookOpen,
  PencilLine,
  Eye,
  Trophy,
  MonitorPlay,
} from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Badge, Card, Tabs, EmptyState, ProgressBar } from '@/components/ui';
import { LanguageToggle } from '@/components/learning/LanguageToggle';
import { TerminalPanel } from '@/components/code/TerminalPanel';
import { StudioCodeViewer } from '@/components/code/studio/StudioCodeViewer';
import { TracePlayer, LineExplainer } from '@/components/code/studio/TracePlayer';
import {
  StudioExplorer,
  StudioInspector,
  PredictionPanel,
  CompletionPanel,
  AnalysisPanel,
  DebugPanel,
  MissionList,
  ConceptualStateView,
  ExampleMetaCard,
} from '@/components/code/studio/StudioPanels';
import { useCodeStudio } from '@/hooks/useCodeStudio';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  getPredictionsForExample,
  getCompletionsForExample,
  getAnalysesForExample,
  getDebugChallengesForStudio,
  getStudioMissions,
} from '@/data/codeStudio';
import { getStudioXpEarned, CODE_STUDIO_MISSION_XP_TOTAL } from '@/services/codeStudioService';
import type { CodeStudioMode, ExecutionTraceStep } from '@/types/codeStudio';

const MODE_TABS: { id: CodeStudioMode; label: string; labelUrdu: string; icon: typeof Eye }[] = [
  { id: 'explore', label: 'Explore', labelUrdu: 'Explore', icon: Eye },
  { id: 'trace', label: 'Trace', labelUrdu: 'Trace', icon: ListTree },
  { id: 'predict', label: 'Predict', labelUrdu: 'Predict', icon: MonitorPlay },
  { id: 'complete', label: 'Complete', labelUrdu: 'Complete', icon: PencilLine },
  { id: 'analyze', label: 'Analyze', labelUrdu: 'Analyze', icon: BookOpen },
  { id: 'debug', label: 'Debug', labelUrdu: 'Debug', icon: Bug },
];

export function CodeStudioPage() {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialExample = searchParams.get('example') || undefined;
  const studio = useCodeStudio(initialExample);
  const [traceStep, setTraceStep] = useState<ExecutionTraceStep | undefined>(undefined);
  const [mobilePanel, setMobilePanel] = useState<'explorer' | 'code' | 'tools'>('code');

  const example = studio.example;
  const missions = useMemo(() => getStudioMissions(), []);

  const predictions = useMemo(
    () => getPredictionsForExample(studio.mode === 'predict' ? example?.id : undefined),
    [studio.mode, example?.id]
  );
  const completions = useMemo(
    () => getCompletionsForExample(studio.mode === 'complete' ? example?.id : undefined),
    [studio.mode, example?.id]
  );
  const analyses = useMemo(
    () => getAnalysesForExample(studio.mode === 'analyze' ? example?.id : undefined),
    [studio.mode, example?.id]
  );
  const debugChallenges = useMemo(() => getDebugChallengesForStudio(), []);

  const terminalLines = useMemo(() => {
    if (!example?.expectedOutput) {
      return [
        '$ simulation ready',
        language === 'ur'
          ? 'Predefined educational simulation — asal Java execution nahi chalti.'
          : 'Predefined educational simulation — no real Java execution runs here.',
      ];
    }
    return [
      `$ javac ${example.filename}`,
      `$ java ${example.filename.replace(/\.java$/, '')}`,
      ...example.expectedOutput,
      language === 'ur' ? '(simulated output)' : '(simulated output)',
    ];
  }, [example, language]);

  const handleModeChange = (tabId: string) => {
    studio.setMode(tabId as CodeStudioMode);
    if (tabId !== 'trace') setTraceStep(undefined);
  };

  const handleTraceStep = (line?: number) => {
    if (line !== undefined) studio.setActiveLine(line);
    if (example?.trace) {
      const step = example.trace.steps.find(s => s.highlightLine === line);
      setTraceStep(step);
      if (step && example.trace.steps.indexOf(step) === example.trace.steps.length - 1) {
        studio.markTraced(example.id);
      }
    }
  };

  const handleTraceComplete = () => {
    if (example) studio.markTraced(example.id);
  };

  const highlightLines = useMemo(() => {
    if (traceStep?.highlightLine !== undefined) return [traceStep.highlightLine];
    if (studio.mode === 'explore' && studio.currentExplanation) return [studio.currentExplanation.line];
    return studio.lineExplanations.map(e => e.line);
  }, [traceStep, studio.mode, studio.currentExplanation, studio.lineExplanations]);

  const xpEarned = getStudioXpEarned(studio.progress);
  const missionPct = missions.length > 0 ? (studio.progress.completedMissions.length / missions.length) * 100 : 0;

  if (!example) {
    return (
      <div className="p-6">
        <EmptyState
          icon={<Code2 className="w-10 h-10" />}
          title={language === 'ur' ? 'Code Studio khali hai' : 'Code Studio is empty'}
          description={language === 'ur' ? 'Examples load nahi hue.' : 'Examples failed to load.'}
        />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4 lg:p-6 gap-4 min-h-0">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-[var(--color-accent-primary)]" />
            <h1 className="text-xl font-display font-bold text-[var(--color-text-primary)]">
              {language === 'ur' ? 'Interactive Java Code Studio' : 'Interactive Java Code Studio'}
            </h1>
            <Badge variant="secondary" size="sm">simulated</Badge>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            {language === 'ur'
              ? 'Java examples padhein, trace karein, predict/complete/analyze/debug challenges solve karein — sab predefined educational simulation hai.'
              : 'Read Java examples, step through traces, and solve predict/complete/analyze/debug challenges — all a predefined educational simulation.'}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="text-right">
            <p className="text-xs text-[var(--color-text-tertiary)]">
              {language === 'ur' ? 'Studio XP' : 'Studio XP'}
            </p>
            <Badge variant="xp" size="md">+{xpEarned} / {CODE_STUDIO_MISSION_XP_TOTAL} XP</Badge>
          </div>
          <LanguageToggle />
        </div>
      </header>

      {/* Mobile Tab Bar */}
      <div className="lg:hidden flex border border-[var(--color-border-primary)] rounded-lg p-1 bg-[var(--color-bg-secondary)] shrink-0">
        {(['explorer', 'code', 'tools'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setMobilePanel(tab)}
            className={`flex-1 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
              mobilePanel === tab ? 'bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)]' : 'text-[var(--color-text-secondary)]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-4 min-h-0 flex-1 lg:grid-cols-[240px_minmax(0,1fr)_300px]">
        <Card padding="sm" className={`min-h-[280px] lg:max-h-full overflow-hidden ${mobilePanel === 'explorer' ? 'block' : 'hidden lg:block'}`}>
          <StudioExplorer
            categories={studio.categories}
            examples={studio.examples}
            selectedCategory={studio.selectedCategory}
            onCategoryChange={studio.setSelectedCategory}
            selectedExampleId={studio.selectedExampleId}
            onSelectExample={studio.selectExample}
            exploredIds={studio.progress.exploredExamples}
            className="h-full"
          />
        </Card>

        <div className={`flex-col gap-3 min-w-0 min-h-0 ${mobilePanel === 'code' ? 'flex' : 'hidden lg:flex'}`}>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div>
              <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
                {language === 'ur' ? example.titleUrdu : example.title}
              </h2>
              <p className="text-xs text-[var(--color-text-tertiary)] font-mono">{example.filename} · {example.topic}</p>
            </div>
            <Badge variant="secondary" size="sm">{studio.categories.find(c => c.id === example.category)?.label}</Badge>
          </div>

          <Tabs
            tabs={MODE_TABS.map(t => ({
              id: t.id,
              label: language === 'ur' ? t.labelUrdu : t.label,
              icon: t.icon,
            }))}
            defaultTab="explore"
            onChange={handleModeChange}
            variant="pills"
          >
            {tabId => {
              if (tabId === 'explore' || tabId === 'trace') {
                return (
                  <div className="space-y-3">
                    <StudioCodeViewer
                      code={example.code}
                      filename={example.filename}
                      activeLine={studio.activeLine}
                      highlightLines={highlightLines}
                      onLineClick={line => {
                        studio.setMode('explore');
                        studio.selectLine(line);
                      }}
                    />
                    {tabId === 'explore' && (
                      <Card padding="md">
                        <LineExplainer
                          explanation={studio.currentExplanation}
                          total={studio.lineExplanations.length}
                          index={studio.selectedLineIndex}
                          onPrev={studio.prevExplanation}
                          onNext={studio.nextExplanation}
                        />
                        {studio.lineExplanations.length > 0 && (
                          <p className="text-xs text-[var(--color-text-tertiary)] mt-3">
                            {studio.allLinesRead
                              ? (language === 'ur' ? 'Sab lines parh li gayi ✓' : 'All lines read ✓')
                              : (language === 'ur' ? 'Next dabakar har line explanation parhein.' : 'Use Next to read every line explanation.')}
                          </p>
                        )}
                      </Card>
                    )}
                    {tabId === 'trace' && (
                      <Card padding="md">
                        <TracePlayer
                          trace={example.trace}
                          onComplete={handleTraceComplete}
                          onStepHighlight={handleTraceStep}
                        />
                      </Card>
                    )}
                  </div>
                );
              }
              if (tabId === 'predict') {
                return (
                  <PredictionPanel
                    challenges={predictions}
                    results={studio.progress.predictionResults}
                    onResult={(id, correct) => studio.recordResult('prediction', id, correct)}
                  />
                );
              }
              if (tabId === 'complete') {
                return (
                  <CompletionPanel
                    challenges={completions}
                    results={studio.progress.completionResults}
                    onResult={(id, correct) => studio.recordResult('completion', id, correct)}
                  />
                );
              }
              if (tabId === 'analyze') {
                return (
                  <AnalysisPanel
                    challenges={analyses}
                    results={studio.progress.analysisResults}
                    onResult={(id, correct) => studio.recordResult('analysis', id, correct)}
                  />
                );
              }
              return (
                <DebugPanel
                  challenges={debugChallenges}
                  results={studio.progress.debugResults}
                  onResult={(id, correct) => studio.recordResult('debug', id, correct)}
                />
              );
            }}
          </Tabs>
        </div>

        <div className={`flex-col gap-3 min-h-0 ${mobilePanel === 'tools' ? 'flex' : 'hidden lg:flex'}`}>
          <Card padding="md" className="shrink-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wide">
                {language === 'ur' ? 'Studio Stats' : 'Studio Stats'}
              </span>
              <Trophy className="w-4 h-4 text-[var(--color-xp-gold)]" />
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-[var(--color-bg-input)]">
                <p className="text-[var(--color-text-tertiary)]">{language === 'ur' ? 'Explored' : 'Explored'}</p>
                <p className="font-semibold text-[var(--color-text-primary)]">{studio.stats.explored}</p>
              </div>
              <div className="p-2 rounded bg-[var(--color-bg-input)]">
                <p className="text-[var(--color-text-tertiary)]">{language === 'ur' ? 'Traced' : 'Traced'}</p>
                <p className="font-semibold text-[var(--color-text-primary)]">{studio.stats.traced}</p>
              </div>
              <div className="p-2 rounded bg-[var(--color-bg-input)]">
                <p className="text-[var(--color-text-tertiary)]">Predict ✓</p>
                <p className="font-semibold text-[var(--color-text-primary)]">{studio.stats.correctPredictions}</p>
              </div>
              <div className="p-2 rounded bg-[var(--color-bg-input)]">
                <p className="text-[var(--color-text-tertiary)]">Debug ✓</p>
                <p className="font-semibold text-[var(--color-text-primary)]">{studio.stats.correctDebugs}</p>
              </div>
            </div>
            <div className="mt-3">
              <ProgressBar value={missionPct} max={100} label={language === 'ur' ? 'Missions' : 'Missions'} />
            </div>
          </Card>

          <StudioInspector
            title={
              studio.mode === 'trace'
                ? (language === 'ur' ? 'Conceptual State' : 'Conceptual State')
                : studio.mode === 'explore'
                  ? (language === 'ur' ? 'Line Inspector' : 'Line Inspector')
                  : (language === 'ur' ? 'Example Meta' : 'Example Meta')
            }
            className="flex-1 min-h-[200px]"
          >
            {studio.mode === 'trace' ? (
              <div className="space-y-3">
                <ConceptualStateView state={traceStep?.conceptualState} />
                <p className="text-[11px] text-[var(--color-text-tertiary)] italic">
                  {language === 'ur'
                    ? 'Yeh conceptual teaching state hai — koi asal JVM ya Java compiler process nahi.'
                    : 'This is conceptual teaching state — no real JVM or Java compiler process.'}
                </p>
              </div>
            ) : studio.mode === 'explore' ? (
              <div className="space-y-3">
                <LineExplainer
                  explanation={studio.currentExplanation}
                  total={studio.lineExplanations.length}
                  index={studio.selectedLineIndex}
                  onPrev={studio.prevExplanation}
                  onNext={studio.nextExplanation}
                />
                <ExampleMetaCard example={example} />
              </div>
            ) : (
              <ExampleMetaCard example={example} />
            )}
          </StudioInspector>

          <Card padding="md" className="shrink-0 max-h-[40%] overflow-y-auto">
            <MissionList
              missions={missions}
              completedObjectives={studio.progress.completedObjectives}
              completedMissions={studio.progress.completedMissions}
            />
          </Card>
        </div>
      </div>

      <section className="shrink-0" aria-label="Simulated console">
        <div className="flex items-center gap-2 mb-1.5">
          <MonitorPlay className="w-4 h-4 text-[var(--color-accent-success)]" />
          <span className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wide">
            {language === 'ur' ? 'Simulated Console (no real execution)' : 'Simulated Console (no real execution)'}
          </span>
        </div>
        <TerminalPanel
          lines={terminalLines}
          state="idle"
          title={language === 'ur' ? 'Java Output (Simulation)' : 'Java Output (Simulation)'}
          className={cn('max-h-40')}
        />
      </section>
    </div>
  );
}

export default CodeStudioPage;
