import { useRef, useCallback, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { LabEnvironment } from '@/three/core/LabEnvironment';
import { ClassBlueprint3D } from '@/three/classes/ClassBlueprint3D';
import { ObjectSpawner } from '@/three/core/ObjectSpawner';
import { CameraController, type CameraControllerRef } from '@/three/core/CameraController';
import type { QualityLevel, ClassBlueprint, ObjectInstance } from '@/types/oopLab';

interface LabSceneProps {
  quality: QualityLevel;
  classBlueprint: ClassBlueprint;
  showBlueprint: boolean;
  objects: ObjectInstance[];
  selectedObjectId: string | null;
  hoveredObjectId: string | null;
  language: 'english' | 'romanUrdu';
  onSelectObject: (id: string) => void;
  onHoverObject: (id: string | null) => void;
  onBlueprintClick?: () => void;
  activeMethod?: string | null;
  activeProperty?: { objectId: string; propertyName: string } | null;
  activeMethodTarget?: { methodName: string; objectId?: string } | null;
  changedProperty?: { objectId: string; propertyName: string; newValue: string } | null;
}

function LabSceneInner({
  quality,
  classBlueprint,
  showBlueprint,
  objects,
  selectedObjectId,
  hoveredObjectId,
  language,
  onSelectObject,
  onHoverObject,
  onBlueprintClick,
  activeMethod,
  activeProperty,
  activeMethodTarget,
  changedProperty,
}: LabSceneProps) {
  const cameraRef = useRef<CameraControllerRef>(null);

  const isLow = quality === 'low';

  const handleSelect = useCallback(
    (id: string) => { onSelectObject(id); },
    [onSelectObject]
  );

  const handleHover = useCallback(
    (id: string | null) => { onHoverObject(id); },
    [onHoverObject]
  );

  return (
    <Canvas
      camera={{ position: [0, 2.8, 6.0], fov: 55 }}
      gl={{
        antialias: !isLow,
        alpha: false,
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance',
      }}
      shadows={!isLow}
      dpr={isLow ? 1 : [1, 1.5]}
      style={{ background: '#0a0f1a' }}
    >
      <color attach="background" args={['#0a0f1a']} />

      <LabEnvironment quality={quality} />

      <ClassBlueprint3D
        blueprint={classBlueprint}
        visible={showBlueprint}
        language={language}
        isMethodActive={activeMethod}
        onBlueprintClick={onBlueprintClick}
      />

      <ObjectSpawner
        objects={objects}
        selectedId={selectedObjectId}
        hoveredId={hoveredObjectId}
        onSelect={handleSelect}
        onHover={handleHover}
        activeProperty={activeProperty}
        activeMethod={activeMethodTarget}
        changedProperty={changedProperty}
      />

      <CameraController
        ref={cameraRef}
        quality={quality}
        selectedObjectId={selectedObjectId}
        objects={objects}
      />

    </Canvas>
  );
}

export const LabScene = memo(LabSceneInner);
