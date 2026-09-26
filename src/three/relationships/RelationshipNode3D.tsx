import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface RelationshipNode3DProps {
  id: string;
  label: string;
  className_: string;
  position: [number, number, number];
  color: string;
  isSelected: boolean;
  isHovered: boolean;
  properties: Record<string, string | number | boolean>;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  hasDetached?: boolean;
}

export function RelationshipNode3D({
  id,
  label,
  className_,
  position,
  color,
  isSelected,
  isHovered,
  properties,
  onSelect,
  onHover,
  hasDetached = false,
}: RelationshipNode3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const scaleRef = useRef(1);

  const targetColor = useMemo(() => new THREE.Color(color), [color]);
  const emissiveColor = useMemo(() => new THREE.Color(color).multiplyScalar(0.3), [color]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const target = isHovered ? 1.08 : isSelected ? 1.04 : 1;
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, target, Math.min(delta * 8, 1));
    groupRef.current.scale.setScalar(scaleRef.current);

    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = isSelected ? 0.5 : isHovered ? 0.3 : 0.15;
    }
  });

  const propEntries = Object.entries(properties).slice(0, 4);

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => { e.stopPropagation(); onSelect(id); }}
      onPointerEnter={(e) => { e.stopPropagation(); onHover(id); }}
      onPointerLeave={() => { onHover(null); }}
    >
      {/* Base pedestal */}
      <mesh castShadow receiveShadow position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.8, 0.9, 0.15, 32]} />
        <meshStandardMaterial color="#1e293b" metalness={0.3} roughness={0.6} />
      </mesh>

      {/* Main body */}
      <mesh castShadow position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 1.2, 6]} />
        <meshStandardMaterial
          color={targetColor}
          metalness={0.2}
          roughness={0.5}
          transparent
          opacity={hasDetached ? 0.3 : 0.9}
        />
      </mesh>

      {/* Glow ring */}
      <mesh ref={glowRef} position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.75, 0.95, 32]} />
        <meshStandardMaterial
          color={targetColor}
          emissive={emissiveColor}
          emissiveIntensity={0.15}
          transparent
          opacity={isSelected ? 0.8 : 0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Selection highlight */}
      {isSelected && (
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.55, 0.65, 1.25, 6]} />
          <meshStandardMaterial
            color={targetColor}
            emissive={emissiveColor}
            emissiveIntensity={0.6}
            transparent
            opacity={0.2}
            wireframe
          />
        </mesh>
      )}

      {/* Label */}
      <Html
        position={[0, 1.4, 0]}
        center
        distanceFactor={8}
        style={{ pointerEvents: 'none' }}
      >
        <div
          className="px-3 py-1.5 rounded-lg text-xs font-bold text-white whitespace-nowrap select-none"
          style={{
            background: `${color}dd`,
            boxShadow: `0 0 12px ${color}66`,
            border: `1px solid ${color}`,
          }}
        >
          {label}
        </div>
      </Html>

      {/* Properties panel */}
      {(isSelected || isHovered) && (
        <Html
          position={[0, 2.1, 0]}
          center
          distanceFactor={8}
          style={{ pointerEvents: 'none' }}
        >
          <div className="bg-[#111827]/95 border border-white/10 rounded-lg p-2 min-w-[140px] text-left">
            <div className="text-[10px] text-white/40 mb-1 font-mono">{className_}</div>
            {propEntries.map(([key, val]) => (
              <div key={key} className="text-[10px] text-white/70 font-mono flex justify-between gap-2">
                <span className="text-blue-300">{key}:</span>
                <span className="text-emerald-300">{String(val)}</span>
              </div>
            ))}
          </div>
        </Html>
      )}
    </group>
  );
}
