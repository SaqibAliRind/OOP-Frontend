import { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, RoundedBox } from '@react-three/drei';
import { Group, Mesh, Color, MeshStandardMaterial } from 'three';
import type { ObjectInstance } from '@/types/oopLab';

interface ObjectInstance3DProps {
  obj: ObjectInstance;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  activeProperty?: string | null;
  isMethodActive?: boolean;
  hasStateChange?: boolean;
}

// ─── Custom Models based on variableName ──────────────────────────────────────────

// s1: Stack of Books
function BooksModel() {
  const blueMat = useMemo(() => new MeshStandardMaterial({ color: '#1e3a8a', roughness: 0.8 }), []);
  const greenMat = useMemo(() => new MeshStandardMaterial({ color: '#14532d', roughness: 0.8 }), []);
  const purpleMat = useMemo(() => new MeshStandardMaterial({ color: '#581c87', roughness: 0.8 }), []);
  const pagesMat = useMemo(() => new MeshStandardMaterial({ color: '#f8fafc', roughness: 1 }), []);



  return (
    <group position={[0, 0.12, 0]}>
      {/* Bottom Book */}
      <group position={[0, -0.1, 0]} rotation={[0, 0.1, 0]}>
        <mesh castShadow receiveShadow material={purpleMat}><boxGeometry args={[0.5, 0.08, 0.7]} /></mesh>
        <mesh position={[-0.01, 0, 0]} material={pagesMat}><boxGeometry args={[0.48, 0.06, 0.68]} /></mesh>
      </group>
      {/* Middle Book */}
      <group position={[0, 0, 0]} rotation={[0, -0.05, 0]}>
        <mesh castShadow receiveShadow material={greenMat}><boxGeometry args={[0.5, 0.08, 0.7]} /></mesh>
        <mesh position={[-0.01, 0, 0]} material={pagesMat}><boxGeometry args={[0.48, 0.06, 0.68]} /></mesh>
      </group>
      {/* Top Book */}
      <group position={[0, 0.1, 0]} rotation={[0, 0.02, 0]}>
        <mesh castShadow receiveShadow material={blueMat}><boxGeometry args={[0.5, 0.08, 0.7]} /></mesh>
        <mesh position={[-0.01, 0, 0]} material={pagesMat}><boxGeometry args={[0.48, 0.06, 0.68]} /></mesh>
      </group>
    </group>
  );
}

// s2: Laptop
function LaptopModel({ isMethodActive }: { isMethodActive?: boolean }) {
  const metalMat = useMemo(() => new MeshStandardMaterial({ color: '#64748b', metalness: 0.8, roughness: 0.2 }), []);
  const blackMat = useMemo(() => new MeshStandardMaterial({ color: '#0f172a', roughness: 0.8 }), []);
  const screenMat = useMemo(() => new MeshStandardMaterial({ 
    color: '#000000', 
    emissive: '#0ea5e9', 
    emissiveIntensity: isMethodActive ? 3.0 : 1.0 
  }), [isMethodActive]);

  return (
    <group position={[0, 0.02, 0]}>
      {/* Base */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow material={metalMat}>
        <boxGeometry args={[0.8, 0.04, 0.6]} />
      </mesh>
      {/* Keyboard area */}
      <mesh position={[0, 0.025, 0.05]} material={blackMat}>
        <boxGeometry args={[0.7, 0.01, 0.3]} />
      </mesh>
      {/* Screen Lid */}
      <group position={[0, 0.02, -0.28]} rotation={[-0.2, 0, 0]}>
        <mesh position={[0, 0.25, 0]} castShadow material={metalMat}>
          <boxGeometry args={[0.8, 0.5, 0.02]} />
        </mesh>
        {/* Glowing Screen */}
        <mesh position={[0, 0.25, 0.011]} material={screenMat}>
          <planeGeometry args={[0.75, 0.45]} />
        </mesh>
      </group>
    </group>
  );
}

// s3: Backpack & Bottle
function BackpackModel() {
  const clothMat = useMemo(() => new MeshStandardMaterial({ color: '#0f172a', roughness: 0.9 }), []);
  const accentMat = useMemo(() => new MeshStandardMaterial({ color: '#0284c7', roughness: 0.7 }), []);
  const bottleMat = useMemo(() => new MeshStandardMaterial({ color: '#0ea5e9', metalness: 0.5, roughness: 0.2, emissive: '#0ea5e9', emissiveIntensity: 0.2 }), []);

  return (
    <group position={[0, 0.25, 0]}>
      {/* Main Backpack Body */}
      <mesh castShadow receiveShadow material={clothMat}>
        <boxGeometry args={[0.5, 0.6, 0.3]} />
      </mesh>
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow material={clothMat} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.25, 0.25, 0.3, 16]} />
      </mesh>
      {/* Front Pocket */}
      <mesh position={[0, -0.1, 0.16]} castShadow material={clothMat}>
        <boxGeometry args={[0.4, 0.3, 0.1]} />
      </mesh>
      {/* Straps/Accents */}
      <mesh position={[0, 0.1, 0.22]} material={accentMat}>
        <boxGeometry args={[0.1, 0.05, 0.02]} />
      </mesh>
      {/* Water Bottle */}
      <mesh position={[0.32, -0.1, 0]} castShadow material={bottleMat}>
        <cylinderGeometry args={[0.08, 0.08, 0.3, 16]} />
      </mesh>
      {/* Bottle Cap */}
      <mesh position={[0.32, 0.1, 0]} castShadow material={accentMat}>
        <cylinderGeometry args={[0.09, 0.09, 0.05, 16]} />
      </mesh>
    </group>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────────

function ObjectInstance3DInner({ obj, isSelected, isHovered, onSelect, onHover, activeProperty, isMethodActive, hasStateChange }: ObjectInstance3DProps) {
  const groupRef = useRef<Group>(null);
  const pulseRef = useRef<Mesh>(null);
  const spawnProgress = useRef(0);
  const methodFlashRef = useRef(0);
  const stateChangeRef = useRef(0);
  const baseColor = useMemo(() => new Color(obj.color), [obj.color]);
  const emissiveColor = useMemo(() => new Color(obj.color).multiplyScalar(0.5), [obj.color]);

  const handlePointerDown = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    onSelect(obj.id);
  };

  const handlePointerOver = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    onHover(obj.id);
  };

  const handlePointerOut = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    onHover(null);
  };

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Spawn animation: scale 0 → 1 with overshoot
    if (spawnProgress.current < 1) {
      spawnProgress.current = Math.min(spawnProgress.current + delta * 3, 1);
      const t = spawnProgress.current;
      const ease = t < 1 ? 1 - Math.pow(1 - t, 3) : 1;
      const s = Math.max(ease, 0.001);
      groupRef.current.scale.set(s, s, s);
    }

    // Method execution flash
    if (isMethodActive) {
      methodFlashRef.current = Math.min(methodFlashRef.current + delta * 6, 1);
    } else {
      methodFlashRef.current = Math.max(methodFlashRef.current - delta * 4, 0);
    }

    // State change pulse
    if (hasStateChange) {
      stateChangeRef.current = Math.min(stateChangeRef.current + delta * 4, 1);
    } else {
      stateChangeRef.current = Math.max(stateChangeRef.current - delta * 3, 0);
    }

    // Subtle float
    groupRef.current.position.y = obj.position[1] + Math.sin(Date.now() * 0.0015) * 0.01;

    // Drive pulse ring opacity from ref (no re-render)
    if (pulseRef.current && !Array.isArray(pulseRef.current.material)) {
      const pulseMat = pulseRef.current.material as unknown as { opacity: number };
      pulseMat.opacity = stateChangeRef.current * 0.6;
    }
  });

  return (
    <group ref={groupRef} position={obj.position} scale={0.001}>
      
      {/* Invisible hitbox for interactions */}
      <mesh visible={false} onPointerDown={handlePointerDown} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} position={[0, 0.3, 0]}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>

      {/* Render bespoke model based on variableName */}
      {obj.variableName === 's1' ? (
        <BooksModel />
      ) : obj.variableName === 's2' ? (
        <LaptopModel isMethodActive={isMethodActive} />
      ) : obj.variableName === 's3' ? (
        <BackpackModel />
      ) : (
        /* Fallback for unknown objects */
        <RoundedBox args={[0.6, 0.6, 0.6]} radius={0.06} smoothness={4} position={[0, 0.3, 0]} castShadow>
          <meshStandardMaterial color={baseColor} emissive={emissiveColor} emissiveIntensity={0.2} metalness={0.4} roughness={0.3} />
        </RoundedBox>
      )}

      {/* Ground Pulse Ring for selection/hover */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 0.45, 32]} />
        <meshBasicMaterial
          color={isSelected ? '#3b82f6' : '#60a5fa'}
          transparent
          opacity={isSelected ? 0.8 : isHovered ? 0.3 : 0}
        />
      </mesh>

      {/* Selection Glow */}
      {isSelected && (
        <pointLight position={[0, 0.5, 0]} intensity={1.5} color="#3b82f6" distance={3} />
      )}

      {/* State change pulse ring */}
      {hasStateChange && (
        <mesh ref={pulseRef} position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.45, 0.55, 32]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0} />
        </mesh>
      )}

      {/* Giant Blue Pill Label above object */}
      <Html
        position={[0, 1.2, 0]}
        center
        distanceFactor={6}
        style={{ pointerEvents: 'none' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Label Pill */}
          <div
            style={{
              padding: '6px 20px',
              background: isSelected ? 'rgba(37, 99, 235, 0.95)' : 'rgba(15, 23, 42, 0.85)',
              border: '2px solid #3b82f6',
              borderRadius: 20,
              fontFamily: "'Inter', sans-serif",
              fontSize: 24,
              fontWeight: 800,
              color: '#ffffff',
              boxShadow: isSelected ? '0 0 20px rgba(59, 130, 246, 0.8)' : '0 0 10px rgba(59, 130, 246, 0.4)',
              transition: 'all 0.2s',
            }}
          >
            {obj.variableName.toUpperCase()}
          </div>
          {/* Vertical Pointer Line */}
          <div style={{
            width: 3,
            height: 40,
            background: 'linear-gradient(to bottom, #3b82f6, transparent)',
            marginTop: 2
          }} />
        </div>
      </Html>

      {/* Selected: show properties floating to the right */}
      {isSelected && obj.properties.length > 0 && (
        <Html
          position={[0.8, 0.6, 0]}
          distanceFactor={5}
          style={{ pointerEvents: 'none' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, background: 'rgba(10, 15, 26, 0.8)', padding: 12, borderRadius: 8, border: '1px solid rgba(59, 130, 246, 0.4)', backdropFilter: 'blur(8px)' }}>
            {obj.properties.map((prop, i) => {
              const isPropActive = activeProperty === prop.name;
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '4px 8px',
                    background: isPropActive ? 'rgba(59, 130, 246, 0.3)' : 'transparent',
                    borderRadius: 4,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 14,
                    color: '#e2e8f0',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <span style={{ color: '#94a3b8' }}>{prop.name}:</span>
                  <span style={{ color: isPropActive ? '#60a5fa' : '#38bdf8', fontWeight: isPropActive ? 700 : 400 }}>{prop.value}</span>
                </div>
              );
            })}
          </div>
        </Html>
      )}
    </group>
  );
}

export const ObjectInstance3D = memo(ObjectInstance3DInner);
