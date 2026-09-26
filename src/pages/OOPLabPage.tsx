import { Suspense, useState, useCallback, useEffect, lazy, Component, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useOOPWorld } from '@/hooks/useOOPWorld';
import { InitSequence } from '@/components/lab/InitSequence';
import { LabHeader } from '@/components/lab/LabHeader';
import { CodePanel } from '@/components/lab/CodePanel';
import { ObjectInspector } from '@/components/lab/ObjectInspector';
import { StepTimeline } from '@/components/lab/StepTimeline';
import { LearningCallout } from '@/components/lab/LearningCallout';
import { MissionPanel } from '@/components/lab/MissionPanel';
import { ConsolePanel } from '@/components/lab/ConsolePanel';
import { CompareObjectsPanel } from '@/components/lab/CompareObjectsPanel';
import { STAGE_META, type Mission, type LearningCallout as LearningCalloutType } from '@/types/oopLab';

const LabScene = lazy(() => import('@/three/core/LabScene').then(m => ({ default: m.LabScene })));

function LabLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#050810]">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto" />
        <div className="space-y-1">
          <p className="text-white/60 text-sm font-mono">LOADING OOP LAB</p>
          <p className="text-white/30 text-xs">Initializing 3D environment...</p>
        </div>
      </div>
    </div>
  );
}

class SceneErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-[#0a0f1a]">
          <div className="text-center space-y-4 px-6">
            <div className="w-14 h-14 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
              <span className="text-2xl">&#9888;</span>
            </div>
            <p className="text-white/80 text-sm font-semibold">3D LAB UNAVAILABLE</p>
            <p className="text-white/40 text-xs max-w-xs">The interactive scene could not be loaded.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 text-xs font-medium hover:bg-blue-500/30 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const CLASS_BLUEPRINT_CALLOUT_EN = {
  type: 'concept' as const,
  title: 'Class = Blueprint',
  message: 'A class is a blueprint/template. It describes what objects will contain (properties) and what they can do (methods). No object exists until you use "new".',
  messageUrdu: 'Class ek blueprint/template hoti hai. Ye define karti hai ke object ke andar kya data (properties) aur behavior (methods) hoga. "new" use karne tak koi object nahi banta.',
  expandable: true,
  expandedMessage: 'Think of a Class like an architect\'s blueprint. You can build many houses from one blueprint. Similarly, you can create many objects from one class. Each object is independent.',
  expandedMessageUrdu: 'Class ko architect ke blueprint ki tarah sochein. Ek blueprint se aap kayi ghar bana sakte hain. Isi tarah, ek class se kayi objects bana sakte hain. Har object independent hai.',
};

export function OOPLabPage() {
  const navigate = useNavigate();
  const world = useOOPWorld();
  const { state, setLanguage, setQuality, resetWorld } = world;

  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !localStorage.getItem('oop-lab-intro-seen');
    } catch {
      return true;
    }
  });

  const [mobilePanel, setMobilePanel] = useState<'mission' | 'code' | 'inspector' | null>(null);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  const handleClearConsole = useCallback(() => {
    world.clearConsole();
  }, [world]);

  const handleCallMethod = useCallback((objectId: string, methodName: string) => {
    world.callMethod(objectId, methodName);
  }, [world]);

  const handleSetProperty = useCallback((objectId: string, propertyName: string, value: string) => {
    world.setPropertyValue(objectId, propertyName, value);
  }, [world]);

  const handleBlueprintClick = useCallback(() => {
    world.showCallout(CLASS_BLUEPRINT_CALLOUT_EN);
  }, [world]);

  const handleInspectorCallout = useCallback((callout: LearningCalloutType) => {
    world.showCallout(callout);
  }, [world]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobilePanel(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (showIntro) {
    return <InitSequence onComplete={handleIntroComplete} />;
  }

  const activeStep = state.currentStep > 0 && state.currentStep <= state.totalSteps
    ? state.executionHistory[state.currentStep - 1]
    : null;

  const stageMeta = state.activeStage ? STAGE_META[state.activeStage] : null;

  return (
    <div className="h-screen flex flex-col bg-[#050810] overflow-hidden select-none">
      {/* Header */}
      <LabHeader
        language={state.language}
        quality={state.quality.level}
        xp={state.mission?.status === 'completed' ? (state.mission as Mission).xpReward : 0}
        onLanguageChange={setLanguage}
        onQualityChange={(level) => setQuality({ level } as any)}
        onBack={() => navigate('/3d')}
      />

      {/* Main 3-Region Layout */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* ─── LEFT LAB PANEL ─── */}
        <div className="hidden md:flex flex-col w-[310px] min-w-[310px] border-r border-white/5 bg-[#0a0f1a]/90 backdrop-blur-sm">
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-thin">
            <div className="p-3 space-y-3">
              {/* Mission */}
              <MissionPanel mission={state.mission} language={state.language} />

              {/* Current Action */}
              <AnimatePresence mode="wait">
                {stageMeta && state.currentStep > 0 && (
                  <motion.div
                    key={state.activeStage}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-xl border border-white/10 overflow-hidden bg-[#0d1320] shadow-lg"
                  >
                    <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold tracking-[0.15em] text-white/40 uppercase">
                          {state.language === 'romanUrdu' ? 'Current Action' : 'CURRENT ACTION'}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-white/25">
                        {Math.min(state.currentStep, state.totalSteps)}/{state.totalSteps}
                      </span>
                    </div>
                    <div className="p-3 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-md flex items-center justify-center text-sm"
                          style={{ backgroundColor: `${stageMeta.color}15` }}
                          dangerouslySetInnerHTML={{ __html: stageMeta.icon }}
                        />
                        <span className="text-[11px] font-bold" style={{ color: stageMeta.color }}>
                          {state.language === 'romanUrdu' ? stageMeta.labelUrdu : stageMeta.label}
                        </span>
                      </div>
                      {activeStep && (
                        <p className="text-[11px] text-white/40 leading-relaxed pl-8">
                          {activeStep.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Code */}
              <CodePanel
                currentStep={state.currentStep}
                totalSteps={state.totalSteps}
                isPlaying={state.isPlaying}
                language={state.language}
                onRun={() => world.executeAllSteps()}
                onStep={() => world.nextStep()}
                onPause={() => world.stopPlayback()}
                onReset={resetWorld}
              />

              {/* Execution Timeline */}
              <StepTimeline
                currentStep={state.currentStep}
                totalSteps={state.totalSteps}
                isPlaying={state.isPlaying}
                language={state.language}
                activeDescription={activeStep?.description}
                onNext={world.nextStep}
                onPrev={world.prevStep}
                onTogglePlay={world.togglePlay}
              />

              {/* Compare Objects Panel */}
              <CompareObjectsPanel
                allObjects={state.objects}
                comparison={world.getComparison()}
                comparisonIds={state.comparisonIds}
                onSetComparisonIds={world.setComparisonIds}
                language={state.language}
              />
            </div>
          </div>
        </div>

        {/* ─── CENTER 3D CANVAS ─── */}
        <div className="flex-1 relative min-w-0">
          <SceneErrorBoundary>
            <Suspense fallback={<LabLoading />}>
              <LabScene
                objects={state.objects}
                selectedObjectId={state.selectedObjectId}
                hoveredObjectId={state.hoveredObjectId}
                classBlueprint={state.classes[0]}
                showBlueprint={state.currentStep >= 0}
                language={state.language}
                quality={state.quality.level}
                onSelectObject={world.selectObject}
                onHoverObject={world.hoverObject}
                onBlueprintClick={handleBlueprintClick}
                activeMethod={state.activeMethod?.methodName ?? null}
                activeProperty={state.activeProperty}
                activeMethodTarget={state.activeMethod}
                changedProperty={state.changedProperty}
              />
            </Suspense>
          </SceneErrorBoundary>

          {/* Learning Callout */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-[420px] max-w-[calc(100%-2rem)]">
            <LearningCallout
              callout={state.activeCallout}
              language={state.language}
              onDismiss={world.dismissCallout}
            />
          </div>

          {/* Objective Complete Toast */}
          <AnimatePresence>
            {state.objectiveToast && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 z-20"
              >
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 backdrop-blur-sm shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-emerald-300 tracking-wide uppercase">
                      {state.language === 'romanUrdu' ? 'OBJECTIVE Mukammal!' : 'OBJECTIVE COMPLETE'}
                    </p>
                    <p className="text-[10px] text-emerald-400/70">{state.objectiveToast.message}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Tab Bar */}
          <div className="md:hidden absolute bottom-0 left-0 right-0 z-20 flex border-t border-white/10 bg-[#0a0f1a]/95 backdrop-blur-sm">
            {(['mission', 'code', 'inspector'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setMobilePanel(mobilePanel === tab ? null : tab)}
                className={`flex-1 py-2.5 text-[11px] font-semibold tracking-wider uppercase transition-colors ${
                  mobilePanel === tab ? 'text-blue-400 border-b-2 border-blue-400' : 'text-white/40'
                }`}
              >
                {tab === 'mission' ? 'Mission' : tab === 'code' ? 'Code' : 'Inspector'}
              </button>
            ))}
          </div>

          {/* Mobile Slide-up Panel */}
          <AnimatePresence>
            {mobilePanel && (
              <div className="md:hidden absolute bottom-10 left-0 right-0 z-10 max-h-[50vh] bg-[#0a0f1a]/98 backdrop-blur-sm border-t border-white/10 overflow-y-auto scrollbar-thin p-3 space-y-3">
                {mobilePanel === 'mission' && (
                  <MissionPanel mission={state.mission} language={state.language} />
                )}
                {mobilePanel === 'code' && (
                  <>
                    <CodePanel
                      currentStep={state.currentStep}
                      totalSteps={state.totalSteps}
                      isPlaying={state.isPlaying}
                      language={state.language}
                      onRun={() => world.executeAllSteps()}
                      onStep={() => world.nextStep()}
                      onPause={() => world.stopPlayback()}
                      onReset={resetWorld}
                    />
                    <StepTimeline
                      currentStep={state.currentStep}
                      totalSteps={state.totalSteps}
                      isPlaying={state.isPlaying}
                      language={state.language}
                      activeDescription={activeStep?.description}
                      onNext={world.nextStep}
                      onPrev={world.prevStep}
                      onTogglePlay={world.togglePlay}
                    />
                  </>
                )}
                {mobilePanel === 'inspector' && (
                  <>
                    <ObjectInspector
                      selectedObject={state.objects.find(o => o.id === state.selectedObjectId) || null}
                      allObjects={state.objects}
                      classBlueprint={state.classes[0] || null}
                      language={state.language}
                      onCallMethod={handleCallMethod}
                      onSetProperty={handleSetProperty}
                      onSelectObject={world.selectObject}
                      onShowCallout={handleInspectorCallout}
                      onUndo={world.undoLastAction}
                      methodExecuting={state.activeMethod?.methodName ?? null}
                      lastExecutedMethod={state.lastExecutedMethod}
                      stateHistory={state.stateHistory}
                      changedProperty={state.changedProperty}
                    />
                    <ConsolePanel entries={state.console} onClear={handleClearConsole} />
                  </>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── RIGHT LAB PANEL ─── */}
        <div className="hidden md:flex flex-col w-[300px] min-w-[300px] border-l border-white/5 bg-[#0a0f1a]/90 backdrop-blur-sm">
          {/* Inspector — top half */}
          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin border-b border-white/5">
            <ObjectInspector
              selectedObject={state.objects.find(o => o.id === state.selectedObjectId) || null}
              allObjects={state.objects}
              classBlueprint={state.classes[0] || null}
              language={state.language}
              onCallMethod={handleCallMethod}
              onSetProperty={handleSetProperty}
              onSelectObject={world.selectObject}
              onShowCallout={handleInspectorCallout}
              onUndo={world.undoLastAction}
              methodExecuting={state.activeMethod?.methodName ?? null}
              lastExecutedMethod={state.lastExecutedMethod}
              stateHistory={state.stateHistory}
              changedProperty={state.changedProperty}
            />
          </div>
          {/* Console — bottom half */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <ConsolePanel entries={state.console} onClear={handleClearConsole} />
          </div>
        </div>
      </div>
    </div>
  );
}
