import { memo, useMemo } from 'react';
import { ContactShadows } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';
import type { QualityLevel } from '@/types/oopLab';

interface LabEnvironmentProps {
  quality: QualityLevel;
}

function GridFloor() {
  return (
    <group>
      {/* High-gloss reflective floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#020617" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Subtle grid */}
      <gridHelper
        args={[30, 60, '#1e3a8a', '#0f172a']}
        position={[0, -0.59, 0]}
      />
    </group>
  );
}

function GlowingDesk() {
  // Use useMemo for shared geometries/materials to optimize performance
  const deskMaterial = useMemo(() => new MeshStandardMaterial({ color: '#0f172a', metalness: 0.6, roughness: 0.2 }), []);
  const edgeGlowMaterial = useMemo(() => new MeshStandardMaterial({ color: '#000000', emissive: '#0ea5e9', emissiveIntensity: 2.5 }), []);
  const legMaterial = useMemo(() => new MeshStandardMaterial({ color: '#020617', metalness: 0.8, roughness: 0.5 }), []);

  return (
    <group position={[0, -0.2, 0]}>
      {/* Main Table Top */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[4.4, 0.08, 2.0]} />
        <primitive object={deskMaterial} />
      </mesh>

      {/* Glowing Neon Edge Trim */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.44, 0.04, 2.04]} />
        <primitive object={edgeGlowMaterial} />
      </mesh>

      {/* Desk Legs */}
      <group position={[0, -0.25, 0]}>
        <mesh position={[-2.0, -0.05, 0.8]} castShadow><boxGeometry args={[0.15, 0.5, 0.15]} /><primitive object={legMaterial} /></mesh>
        <mesh position={[2.0, -0.05, 0.8]} castShadow><boxGeometry args={[0.15, 0.5, 0.15]} /><primitive object={legMaterial} /></mesh>
        <mesh position={[-2.0, -0.05, -0.8]} castShadow><boxGeometry args={[0.15, 0.5, 0.15]} /><primitive object={legMaterial} /></mesh>
        <mesh position={[2.0, -0.05, -0.8]} castShadow><boxGeometry args={[0.15, 0.5, 0.15]} /><primitive object={legMaterial} /></mesh>
      </group>

      {/* Inner Leg Glow */}
      <mesh position={[-2.0, -0.3, 0.8]}><boxGeometry args={[0.16, 0.1, 0.16]} /><primitive object={edgeGlowMaterial} /></mesh>
      <mesh position={[2.0, -0.3, 0.8]}><boxGeometry args={[0.16, 0.1, 0.16]} /><primitive object={edgeGlowMaterial} /></mesh>
      <mesh position={[-2.0, -0.3, -0.8]}><boxGeometry args={[0.16, 0.1, 0.16]} /><primitive object={edgeGlowMaterial} /></mesh>
      <mesh position={[2.0, -0.3, -0.8]}><boxGeometry args={[0.16, 0.1, 0.16]} /><primitive object={edgeGlowMaterial} /></mesh>
    </group>
  );
}

function LabEnvironmentInner({ quality }: LabEnvironmentProps) {
  const isLow = quality === 'low';

  return (
    <group>
      <fog attach="fog" args={['#020617', 5, 20]} />

      <ambientLight intensity={0.2} color="#0f172a" />
      
      {/* Main Overhead light */}
      <directionalLight
        position={[2, 10, 4]}
        intensity={0.8}
        color="#e0f2fe"
        castShadow={!isLow}
        shadow-mapSize-width={isLow ? 512 : 1024}
        shadow-mapSize-height={isLow ? 512 : 1024}
        shadow-bias={-0.001}
      />
      
      {/* Intense Cyan Backlight for holographic feel */}
      <pointLight position={[0, 2, -3]} intensity={2.0} color="#06b6d4" distance={10} decay={2} />
      
      {/* Side Blue fill light */}
      <pointLight position={[-4, 2, 2]} intensity={1.5} color="#3b82f6" distance={8} />
      <pointLight position={[4, 2, 2]} intensity={1.5} color="#3b82f6" distance={8} />

      <GridFloor />
      <GlowingDesk />

      {!isLow && (
        <ContactShadows
          opacity={0.6}
          scale={15}
          blur={1.5}
          position={[0, -0.59, 0]}
          color="#000000"
        />
      )}
    </group>
  );
}

export const LabEnvironment = memo(LabEnvironmentInner);
