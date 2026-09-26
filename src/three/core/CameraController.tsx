import React, { useRef, useEffect, useCallback, forwardRef, useImperativeHandle, memo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { QualityLevel, ObjectInstance } from '@/types/oopLab';

interface CameraControllerProps {
  quality: QualityLevel;
  selectedObjectId: string | null;
  objects: ObjectInstance[];
}

export interface CameraControllerRef {
  resetView: () => void;
  focusObject: (id: string) => void;
}

const DEFAULT_POSITION = new Vector3(0, 2.8, 6.0);
const DEFAULT_TARGET = new Vector3(0, 0.2, 0.8);

function CameraControllerInner(
  { quality, selectedObjectId, objects }: CameraControllerProps,
  ref: React.ForwardedRef<CameraControllerRef>
) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();
  const targetPosition = useRef<Vector3>(DEFAULT_POSITION.clone());
  const targetLookAt = useRef<Vector3>(DEFAULT_TARGET.clone());
  const isAnimating = useRef(false);

  const isLow = quality === 'low';

  const resetView = useCallback(() => {
    targetPosition.current.copy(DEFAULT_POSITION);
    targetLookAt.current.copy(DEFAULT_TARGET);
    isAnimating.current = true;
  }, []);

  const focusObject = useCallback(
    (id: string) => {
      const obj = objects.find(o => o.id === id);
      if (!obj) return;

      const objPos = new Vector3(...obj.position);
      const offset = new Vector3(1.5, 1.2, 1.5);
      targetPosition.current.copy(objPos).add(offset);
      targetLookAt.current.copy(objPos);
      isAnimating.current = true;
    },
    [objects]
  );

  useImperativeHandle(ref, () => ({
    resetView,
    focusObject,
  }));

  // Only focus camera when user manually selects an object
  // Don't auto-focus on spawn — keeps all 3 objects in view
  useEffect(() => {
    if (selectedObjectId) {
      // Compute a wider view that shows all objects + focused one
      const obj = objects.find(o => o.id === selectedObjectId);
      if (obj) {
        const objPos = new Vector3(...obj.position);
        // Instead of tight focus, use a wider angled view
        const offset = new Vector3(0, 2.0, 3.5);
        targetPosition.current.copy(objPos).add(offset);
        // Look slightly above the object cluster center
        targetLookAt.current.set(0, 0.2, 0.8);
        isAnimating.current = true;
      }
    } else {
      resetView();
    }
  }, [selectedObjectId, objects, resetView]);

  useFrame((_, delta) => {
    if (!isAnimating.current || !controlsRef.current) return;

    const lerpFactor = Math.min(delta * 2.5, 1);

    camera.position.lerp(targetPosition.current, lerpFactor);
    controlsRef.current.target.lerp(targetLookAt.current, lerpFactor);

    const posDist = camera.position.distanceTo(targetPosition.current);
    const targetDist = controlsRef.current.target.distanceTo(targetLookAt.current);

    if (posDist < 0.01 && targetDist < 0.01) {
      camera.position.copy(targetPosition.current);
      controlsRef.current.target.copy(targetLookAt.current);
      isAnimating.current = false;
    }

    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={!isLow}
      enableZoom={true}
      enableRotate={true}
      minDistance={1.5}
      maxDistance={8}
      minPolarAngle={0.2}
      maxPolarAngle={Math.PI / 2 - 0.05}
      enableDamping={!isLow}
      dampingFactor={isLow ? 0 : 0.08}
      rotateSpeed={0.6}
      zoomSpeed={0.8}
    />
  );
}

export const CameraController = memo(forwardRef(CameraControllerInner));
