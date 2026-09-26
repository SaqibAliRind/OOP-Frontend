import { Canvas } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import { cn } from '@/utils/helpers';
import { Button } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

function DeskScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 2]} intensity={1.0} castShadow />
      <pointLight position={[-2, 3, -1]} intensity={0.3} color="#6366f1" />

      <ContactShadows opacity={0.3} scale={8} blur={2.5} />

      {/* Floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#111827" metalness={0.15} roughness={0.9} />
      </mesh>

      {/* Desk */}
      <mesh castShadow receiveShadow position={[0, -0.2, 0]}>
        <boxGeometry args={[2.8, 0.12, 1.4]} />
        <meshStandardMaterial color="#1e293b" metalness={0.1} roughness={0.75} />
      </mesh>

      {/* Monitor */}
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.1}>
        <mesh castShadow position={[0, 0.35, -0.15]}>
          <boxGeometry args={[1.4, 0.85, 0.08]} />
          <meshStandardMaterial color="#0f172a" emissive="#3b82f6" emissiveIntensity={0.12} />
        </mesh>
        {/* Screen content glow */}
        <mesh position={[0, 0.35, -0.1]}>
          <planeGeometry args={[1.2, 0.65]} />
          <meshStandardMaterial
            color="#0a0f1a"
            emissive="#3b82f6"
            emissiveIntensity={0.08}
            transparent
            opacity={0.9}
          />
        </mesh>
      </Float>

      {/* Keyboard */}
      <mesh castShadow position={[0, -0.05, 0.35]}>
        <boxGeometry args={[1.1, 0.04, 0.35]} />
        <meshStandardMaterial color="#334155" metalness={0.05} roughness={0.8} />
      </mesh>

      {/* Floating OOP cube */}
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh position={[0.9, 0.6, 0]}>
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshStandardMaterial
            color="#6366f1"
            emissive="#6366f1"
            emissiveIntensity={0.3}
            metalness={0.4}
            roughness={0.2}
          />
        </mesh>
      </Float>

      {/* Floating sphere */}
      <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh position={[-0.8, 0.5, 0.2]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={0.25}
            metalness={0.5}
            roughness={0.15}
          />
        </mesh>
      </Float>
    </>
  );
}

interface LabPreviewProps {
  className?: string;
  showCTA?: boolean;
}

export function LabPreview({ className, showCTA = true }: LabPreviewProps) {
  return (
    <div
      className={cn(
        'relative h-[220px] md:h-[300px] rounded-xl overflow-hidden border border-[var(--color-border-primary)] bg-[var(--color-bg-input)]',
        className
      )}
      aria-label="3D coding lab preview"
    >
      <Canvas camera={{ position: [2.2, 1.6, 2.4], fov: 42 }} shadows dpr={[1, 1.5]}>
        <DeskScene />
      </Canvas>

      {/* Bottom gradient + label */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 px-4 py-3 bg-gradient-to-t from-[var(--color-bg-primary)]/90 via-[var(--color-bg-primary)]/40 to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-mono text-[var(--color-text-secondary)]">
              3D OOP Lab Preview
            </p>
            <p className="text-[10px] text-[var(--color-text-tertiary)] mt-0.5">
              Interactive worlds in PROMPT 03+
            </p>
          </div>
          {showCTA && (
            <Button variant="primary" size="sm" asChild className="pointer-events-auto h-7">
              <Link to="/3d">
                <Play className="w-3 h-3 mr-1" />
                Enter Lab
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
