import { useMemo } from 'react';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import type { RelationshipEdge } from '@/types/relationshipLab';

interface RelationshipEdge3DProps {
  edge: RelationshipEdge;
  sourcePos: [number, number, number];
  targetPos: [number, number, number];
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  detached?: boolean;
}

const TYPE_COLORS: Record<string, string> = {
  association: '#60a5fa',
  aggregation: '#f59e0b',
  composition: '#ef4444',
  dependency: '#06b6d4',
};

function DiamondMarker({ position, rotation, color, filled }: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  filled: boolean;
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <octahedronGeometry args={[0.15, 0]} />
      <meshStandardMaterial
        color={filled ? color : '#1e293b'}
        emissive={color}
        emissiveIntensity={filled ? 0.4 : 0.2}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function ArrowHead({ position, rotation, color }: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <coneGeometry args={[0.12, 0.3, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

export function RelationshipEdge3D({
  edge,
  sourcePos,
  targetPos,
  isSelected,
  isHovered,
  onSelect,
  onHover,
  detached = false,
}: RelationshipEdge3DProps) {
  const color = TYPE_COLORS[edge.type] || '#ffffff';

  const midPoint = useMemo((): [number, number, number] => {
    return [
      (sourcePos[0] + targetPos[0]) / 2,
      (sourcePos[1] + targetPos[1]) / 2 + 0.8,
      (sourcePos[2] + targetPos[2]) / 2,
    ];
  }, [sourcePos, targetPos]);

  const direction = useMemo(() => {
    const dir = new THREE.Vector3(
      targetPos[0] - sourcePos[0],
      targetPos[1] - sourcePos[1],
      targetPos[2] - sourcePos[2],
    ).normalize();
    return dir;
  }, [sourcePos, targetPos]);

  const sourceOffset = useMemo((): [number, number, number] => {
    return [
      sourcePos[0] + direction.x * 0.65,
      sourcePos[1] + direction.y * 0.65 + 0.5,
      sourcePos[2] + direction.z * 0.65,
    ];
  }, [sourcePos, direction]);

  const targetOffset = useMemo((): [number, number, number] => {
    return [
      targetPos[0] - direction.x * 0.65,
      targetPos[1] - direction.y * 0.65 + 0.5,
      targetPos[2] - direction.z * 0.65,
    ];
  }, [targetPos, direction]);

  const arrowRotation = useMemo((): [number, number, number] => {
    const angle = Math.atan2(direction.x, direction.z);
    return [0, angle, -Math.PI / 2 + Math.acos(direction.y)];
  }, [direction]);

  const diamondRotation = useMemo((): [number, number, number] => {
    const angle = Math.atan2(direction.x, direction.z);
    return [0, angle, 0];
  }, [direction]);

  const points = useMemo(() => {
    if (edge.isDashed) {
      const segments: [number, number, number][] = [];
      const steps = 20;
      for (let i = 0; i < steps; i++) {
        if (i % 2 === 0) {
          const t1 = i / steps;
          const t2 = (i + 1) / steps;
          segments.push([
            THREE.MathUtils.lerp(sourceOffset[0], targetOffset[0], t1),
            THREE.MathUtils.lerp(sourceOffset[1], targetOffset[1], t1),
            THREE.MathUtils.lerp(sourceOffset[2], targetOffset[2], t1),
          ]);
          segments.push([
            THREE.MathUtils.lerp(sourceOffset[0], targetOffset[0], t2),
            THREE.MathUtils.lerp(sourceOffset[1], targetOffset[1], t2),
            THREE.MathUtils.lerp(sourceOffset[2], targetOffset[2], t2),
          ]);
        }
      }
      return segments;
    }
    return [sourceOffset, targetOffset];
  }, [sourceOffset, targetOffset, edge.isDashed]);

  return (
    <group
      onClick={(e) => { e.stopPropagation(); onSelect(edge.id); }}
      onPointerEnter={(e) => { e.stopPropagation(); onHover(edge.id); }}
      onPointerLeave={() => onHover(null)}
    >
      {/* Main line */}
      <Line
        points={points}
        color={color}
        lineWidth={isSelected ? 3.5 : isHovered ? 2.5 : 2}
        transparent
        opacity={detached ? 0.2 : isSelected ? 1 : 0.7}
      />

      {/* Composition diamond (filled) */}
      {edge.type === 'composition' && (
        <DiamondMarker
          position={sourceOffset}
          rotation={diamondRotation}
          color={color}
          filled={true}
        />
      )}

      {/* Aggregation diamond (hollow) */}
      {edge.type === 'aggregation' && (
        <DiamondMarker
          position={sourceOffset}
          rotation={diamondRotation}
          color={color}
          filled={false}
        />
      )}

      {/* Arrow for association */}
      {edge.type === 'association' && (
        <ArrowHead
          position={targetOffset}
          rotation={arrowRotation}
          color={color}
        />
      )}

      {/* Dashed arrow for dependency */}
      {edge.type === 'dependency' && (
        <ArrowHead
          position={targetOffset}
          rotation={arrowRotation}
          color={color}
        />
      )}

      {/* Edge label */}
      <Html
        position={midPoint}
        center
        distanceFactor={8}
        style={{ pointerEvents: 'none' }}
      >
        <div
          className="px-2 py-1 rounded text-[10px] font-medium text-white whitespace-nowrap select-none"
          style={{
            background: `${color}cc`,
            border: `1px solid ${color}`,
            boxShadow: `0 0 8px ${color}44`,
          }}
        >
          {edge.label}
        </div>
      </Html>

      {/* Selection glow */}
      {(isSelected || isHovered) && (
        <Line
          points={[sourceOffset, targetOffset]}
          color={color}
          lineWidth={6}
          transparent
          opacity={0.15}
        />
      )}
    </group>
  );
}
