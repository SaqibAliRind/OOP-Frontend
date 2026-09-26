import { useMemo, Suspense, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { useOOPWorld } from '@/hooks/useOOPWorld';
import { getWorldConfig, ADDITIONAL_CLASSES } from '@/data/worldConfigs';
import { SceneErrorBoundary } from '@/components/three';
import type { WorldId } from '@/types/oopLab';

// 3D Components
import { LabEnvironment } from '@/three/core/LabEnvironment';
import { CameraController } from '@/three/core/CameraController';
import { ObjectSpawner } from '@/three/core/ObjectSpawner';
import { ClassBlueprint3D } from '@/three/classes/ClassBlueprint3D';
import { FactoryEnvironment, VaultEnvironment, HierarchyEnvironment, ArenaEnvironment, ControlCenterEnvironment, ContractLabEnvironment, RuntimeLabEnvironment, PackageCityEnvironment, ExceptionFlowEnvironment, CollectionsLabEnvironment, ArchitectureLabEnvironment, DesignLabEnvironment } from '@/three/worlds/WorldEnvironments';

// UI Panels
import { CodePanel } from '@/components/lab/CodePanel';
import { ConsolePanel } from '@/components/lab/ConsolePanel';
import { ObjectInspector } from '@/components/lab/ObjectInspector';
import { StepTimeline } from '@/components/lab/StepTimeline';
import { LearningCallout } from '@/components/lab/LearningCallout';
import { MissionPanel } from '@/components/lab/MissionPanel';
import { LabHeader } from '@/components/lab/LabHeader';
import { LabStatusBar } from '@/components/lab/LabStatusBar';

const SCENE_COMPONENTS: Record<string, React.FC<{ primaryColor: string; secondaryColor: string; accentColor: string }>> = {
  blueprint: () => null,
  factory: FactoryEnvironment,
  vault: VaultEnvironment,
  hierarchy: HierarchyEnvironment,
  arena: ArenaEnvironment,
  'control-center': ControlCenterEnvironment,
  'contract-lab': ContractLabEnvironment,
  'runtime-lab': RuntimeLabEnvironment,
  'package-city': PackageCityEnvironment,
  'exception-flow': ExceptionFlowEnvironment,
  'collections-lab': CollectionsLabEnvironment,
  'architecture-lab': ArchitectureLabEnvironment,
  'design-studio': DesignLabEnvironment,
};

const LOADING_FALLBACK = () => (
  <div className="absolute inset-0 bg-[#0a0f1a] flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
      <p className="text-white/60 text-sm">Loading 3D world...</p>
    </div>
  </div>
);

export default function WorldLabPage() {
  const { worldId } = useParams<{ worldId: string }>();
  const navigate = useNavigate();

  const worldConfig = useMemo(() => getWorldConfig((worldId || '') as WorldId), [worldId]);

  const { state, setPropertyValue, callMethod, nextStep, prevStep, togglePlay, resetWorld, setQuality, selectObject, hoverObject } = useOOPWorld(
    worldConfig?.initialClass,
    worldConfig?.initialSteps,
    worldConfig?.initialMission
  );

  const [mobilePanel, setMobilePanel] = useState<'code' | 'inspector' | null>(null);

  const additionalClasses = useMemo(() => {
    if (!worldConfig) return [];
    return ADDITIONAL_CLASSES[worldConfig.id] || [];
  }, [worldConfig]);

  const allClasses = useMemo(() => {
    if (!worldConfig) return [];
    return [worldConfig.initialClass, ...additionalClasses];
  }, [worldConfig, additionalClasses]);

  const selectedObject = useMemo(() => {
    if (!state.selectedObjectId) return null;
    return state.objects.find(o => o.id === state.selectedObjectId) || null;
  }, [state.selectedObjectId, state.objects]);

  if (!worldConfig) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60 mb-4">World not found: {worldId}</p>
          <button
            onClick={() => navigate('/3d')}
            className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 text-sm hover:bg-blue-500/30 transition-colors"
          >
            ← Back to Worlds
          </button>
        </div>
      </div>
    );
  }

  const WorldScene = SCENE_COMPONENTS[worldConfig.sceneType];

  return (
    <div className="h-screen flex flex-col bg-[#050810] overflow-hidden">
      {/* Header */}
      <LabHeader
        language={state.language}
        quality={state.quality.level}
        xp={state.mission?.status === 'completed' ? worldConfig.xpReward : 0}
        onLanguageChange={() => {}}
        onQualityChange={(level) => setQuality({ level })}
        onBack={() => navigate('/3d')}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel — Code + Steps (hidden on mobile) */}
        <div className="hidden md:flex w-80 flex-col border-r border-white/5 bg-[#0a0f1a]/80 backdrop-blur-sm overflow-hidden">
          {state.mission && (
            <div className="flex-shrink-0">
              <MissionPanel mission={state.mission} language={state.language} />
            </div>
          )}

          <div className="flex-shrink-0">
            <CodePanel
              currentStep={state.currentStep}
              totalSteps={state.totalSteps}
              isPlaying={state.isPlaying}
              language={state.language}
              onRun={() => {}}
              onStep={nextStep}
              onPause={() => togglePlay()}
              onReset={resetWorld}
            />
          </div>

          <div className="flex-1 overflow-hidden">
            <StepTimeline
              totalSteps={worldConfig.initialSteps.length}
              currentStep={state.currentStep}
              isPlaying={state.isPlaying}
              language={state.language}
              onNext={nextStep}
              onPrev={prevStep}
              onTogglePlay={togglePlay}
            />
          </div>
        </div>

        {/* Center — 3D Canvas */}
        <div className="flex-1 relative">
          <SceneErrorBoundary fallback={
            <div className="absolute inset-0 bg-[#0a0f1a] flex items-center justify-center p-6 text-center">
              <div>
                <p className="text-white/80 font-medium mb-2">3D world failed to load</p>
                <p className="text-white/50 text-sm">WebGL may be unavailable. Your progress is saved.</p>
              </div>
            </div>
          }>
          <Suspense fallback={<LOADING_FALLBACK />}>
            <Canvas shadows camera={{ position: worldConfig.environmentConfig.cameraPosition, fov: 50 }}>
              <CameraController
                quality={state.quality.level}
                selectedObjectId={state.selectedObjectId}
                objects={state.objects}
              />

              <LabEnvironment quality={state.quality.level} />

              {WorldScene && (
                <WorldScene
                  primaryColor={worldConfig.environmentConfig.primaryColor}
                  secondaryColor={worldConfig.environmentConfig.secondaryColor}
                  accentColor={worldConfig.environmentConfig.accentColor}
                />
              )}

              {allClasses.map((cls) => (
                <ClassBlueprint3D
                  key={cls.name}
                  blueprint={cls}
                  visible={true}
                  language={state.language}
                />
              ))}

              <ObjectSpawner
                objects={state.objects}
                selectedId={state.selectedObjectId}
                hoveredId={state.hoveredObjectId}
                onSelect={selectObject}
                onHover={hoverObject}
              />
            </Canvas>
          </Suspense>
          </SceneErrorBoundary>

          <LabStatusBar
            status={state.mission?.status === 'completed' ? 'Mission Complete' : 'Exploring'}
            objectCount={state.objects.length}
            quality={state.quality.level}
            onReset={resetWorld}
            onHelp={() => {}}
          />

          {state.activeCallout && (
            <LearningCallout callout={state.activeCallout} language={state.language} onDismiss={() => {}} />
          )}
        </div>

        {/* Right Panel — Inspector + Console (hidden on mobile) */}
        <div className="hidden md:flex w-80 flex-col border-l border-white/5 bg-[#0a0f1a]/80 backdrop-blur-sm overflow-hidden">
          <div className="flex-shrink-0 max-h-[60%] overflow-y-auto">
            <ObjectInspector
              selectedObject={selectedObject}
              allObjects={state.objects}
              classBlueprint={allClasses[0] || null}
              language={state.language}
              onSetProperty={(objectId, propertyName, value) => {
                setPropertyValue(objectId, propertyName, value);
              }}
              onCallMethod={(objectId, methodName) => {
                callMethod(objectId, methodName);
              }}
              onSelectObject={selectObject}
            />
          </div>

          <div className="flex-1 overflow-hidden">
            <ConsolePanel entries={state.console} />
          </div>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="md:hidden flex border-t border-white/10 bg-[#0a0f1a]/95 backdrop-blur-sm shrink-0">
        {(['code', 'inspector'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setMobilePanel(mobilePanel === tab ? null : tab)}
            className={`flex-1 py-2.5 text-[11px] font-semibold tracking-wider uppercase transition-colors ${
              mobilePanel === tab ? 'text-blue-400 border-b-2 border-blue-400' : 'text-white/40'
            }`}
          >
            {tab === 'code' ? 'Code' : 'Inspector'}
          </button>
        ))}
      </div>

      {/* Mobile Slide-up Panel */}
      {mobilePanel && (
        <div className="md:hidden max-h-[55vh] bg-[#0a0f1a]/98 backdrop-blur-sm border-t border-white/10 overflow-y-auto p-3 space-y-3 shrink-0">
          {mobilePanel === 'code' && (
            <>
              {state.mission && <MissionPanel mission={state.mission} language={state.language} />}
              <CodePanel
                currentStep={state.currentStep}
                totalSteps={state.totalSteps}
                isPlaying={state.isPlaying}
                language={state.language}
                onRun={() => {}}
                onStep={nextStep}
                onPause={() => togglePlay()}
                onReset={resetWorld}
              />
              <StepTimeline
                totalSteps={worldConfig.initialSteps.length}
                currentStep={state.currentStep}
                isPlaying={state.isPlaying}
                language={state.language}
                onNext={nextStep}
                onPrev={prevStep}
                onTogglePlay={togglePlay}
              />
            </>
          )}
          {mobilePanel === 'inspector' && (
            <>
              <ObjectInspector
                selectedObject={selectedObject}
                allObjects={state.objects}
                classBlueprint={allClasses[0] || null}
                language={state.language}
                onSetProperty={(objectId, propertyName, value) => setPropertyValue(objectId, propertyName, value)}
                onCallMethod={(objectId, methodName) => callMethod(objectId, methodName)}
                onSelectObject={selectObject}
              />
              <ConsolePanel entries={state.console} />
            </>
          )}
        </div>
      )}
    </div>
  );
}
