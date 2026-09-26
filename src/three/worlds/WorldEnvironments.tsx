import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface FactoryEnvironmentProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export function FactoryEnvironment({ primaryColor, secondaryColor, accentColor }: FactoryEnvironmentProps) {
  const conveyorRef = useRef<THREE.Group>(null);

  const gearGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const teeth = 12;
    const innerRadius = 0.3;
    const outerRadius = 0.4;
    for (let i = 0; i < teeth; i++) {
      const angle1 = (i / teeth) * Math.PI * 2;
      const angle2 = ((i + 0.3) / teeth) * Math.PI * 2;
      const angle3 = ((i + 0.5) / teeth) * Math.PI * 2;
      const angle4 = ((i + 0.8) / teeth) * Math.PI * 2;
      if (i === 0) shape.moveTo(Math.cos(angle1) * innerRadius, Math.sin(angle1) * innerRadius);
      shape.lineTo(Math.cos(angle2) * outerRadius, Math.sin(angle2) * outerRadius);
      shape.lineTo(Math.cos(angle3) * outerRadius, Math.sin(angle3) * outerRadius);
      shape.lineTo(Math.cos(angle4) * innerRadius, Math.sin(angle4) * innerRadius);
    }
    shape.closePath();
    const extrudeSettings = { depth: 0.05, bevelEnabled: false };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  return (
    <group>
      {/* Factory floor — darker industrial */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Conveyor belts */}
      <group ref={conveyorRef}>
        {[-2, 0, 2].map((z, i) => (
          <group key={i} position={[0, 0.15, z]}>
            <mesh castShadow>
              <boxGeometry args={[6, 0.05, 0.6]} />
              <meshStandardMaterial color="#2d2d44" roughness={0.6} metalness={0.4} />
            </mesh>
            {/* Conveyor rollers */}
            {Array.from({ length: 12 }).map((_, j) => (
              <mesh key={j} position={[-2.5 + j * 0.45, 0.03, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.03, 0.03, 0.55, 8]} />
                <meshStandardMaterial color={accentColor} metalness={0.7} roughness={0.3} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* Gear decorations on walls */}
      {[
        { pos: [-6, 2, 0] as [number, number, number], scale: 1.5 },
        { pos: [6, 2.5, 0] as [number, number, number], scale: 1 },
        { pos: [-5, 3.5, -3] as [number, number, number], scale: 0.8 },
      ].map((gear, i) => (
        <mesh key={i} position={gear.pos} geometry={gearGeometry} rotation={[0, 0, i * 0.5]} castShadow>
          <meshStandardMaterial color={primaryColor} metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* Assembly line stations */}
      {[-4, -1, 2, 5].map((x, i) => (
        <group key={i} position={[x, 0, -3.5]}>
          <mesh castShadow>
            <boxGeometry args={[1.5, 1.5, 0.3]} />
            <meshStandardMaterial color={secondaryColor} roughness={0.5} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0.85, 0.2]} castShadow>
            <boxGeometry args={[0.8, 0.1, 0.4]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.3} />
          </mesh>
          {/* Status light */}
          <mesh position={[0.6, 0.9, 0.4]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color={i === 0 ? '#22c55e' : accentColor} emissive={i === 0 ? '#22c55e' : accentColor} emissiveIntensity={0.8} />
          </mesh>
        </group>
      ))}

      {/* Overhead pipes */}
      {[-2, 2].map((z, i) => (
        <mesh key={i} position={[0, 3.8, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 12, 8]} />
          <meshStandardMaterial color="#4a4a6a" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}

      {/* Constructor analogy labels */}
      <group position={[-5, 2.5, 2]}>
        <mesh castShadow>
          <boxGeometry args={[2, 1, 0.1]} />
          <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.15} />
        </mesh>
      </group>
    </group>
  );
}

interface VaultEnvironmentProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export function VaultEnvironment({ primaryColor, secondaryColor, accentColor }: VaultEnvironmentProps) {
  return (
    <group>
      {/* Vault floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#0a1a15" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Vault walls — secure feel */}
      {[
        { pos: [0, 2, -5] as [number, number, number], rot: [0, 0, 0] as [number, number, number], size: [12, 4, 0.2] as [number, number, number] },
        { pos: [-6, 2, 0] as [number, number, number], rot: [0, Math.PI / 2, 0] as [number, number, number], size: [10, 4, 0.2] as [number, number, number] },
        { pos: [6, 2, 0] as [number, number, number], rot: [0, Math.PI / 2, 0] as [number, number, number], size: [10, 4, 0.2] as [number, number, number] },
      ].map((wall, i) => (
        <mesh key={i} position={wall.pos} rotation={wall.rot} castShadow receiveShadow>
          <boxGeometry args={wall.size} />
          <meshStandardMaterial color="#1a2a25" roughness={0.7} metalness={0.3} />
        </mesh>
      ))}

      {/* Security vault door */}
      <group position={[0, 1.8, -4.8]}>
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.2, 32]} />
          <meshStandardMaterial color="#2a3a35" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.12]} castShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.05, 32]} />
          <meshStandardMaterial color={secondaryColor} metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Lock mechanism */}
        <mesh position={[0, 0, 0.2]} castShadow>
          <boxGeometry args={[0.3, 0.3, 0.15]} />
          <meshStandardMaterial color={accentColor} metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Safety deposit boxes on walls */}
      {Array.from({ length: 9 }).map((_, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const x = -2 + col * 1.5;
        const y = 0.8 + row * 1.2;
        return (
          <group key={i} position={[x, y, -4.7]}>
            <mesh castShadow>
              <boxGeometry args={[1.2, 1, 0.15]} />
              <meshStandardMaterial color="#1e2e29" roughness={0.6} metalness={0.4} />
            </mesh>
            <mesh position={[0.4, 0, 0.1]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.6} />
            </mesh>
          </group>
        );
      })}

      {/* Security laser beams (visual metaphor for access control) */}
      {[-3, 0, 3].map((x, i) => (
        <mesh key={i} position={[x, 1.5, -2]}>
          <cylinderGeometry args={[0.01, 0.01, 3, 4]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={1} transparent opacity={0.4} />
        </mesh>
      ))}

      {/* Private key icon — large lock symbol */}
      <group position={[5, 1.5, -2]}>
        <mesh castShadow>
          <torusGeometry args={[0.5, 0.08, 16, 32]} />
          <meshStandardMaterial color={primaryColor} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.5, 0]} castShadow>
          <boxGeometry args={[0.8, 0.8, 0.15]} />
          <meshStandardMaterial color={primaryColor} metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

interface HierarchyEnvironmentProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export function HierarchyEnvironment({ primaryColor, secondaryColor, accentColor }: HierarchyEnvironmentProps) {
  return (
    <group>
      {/* Hierarchy floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color={primaryColor} roughness={0.85} metalness={0.15} />
      </mesh>

      {/* Tree structure — parent at top */}
      {/* Parent node platform */}
      <group position={[0, 3.5, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[1, 1.2, 0.3, 6]} />
          <meshStandardMaterial color={secondaryColor} metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[2, 0.08, 1]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.2} />
        </mesh>
      </group>

      {/* Connection lines from parent to children */}
      {[[-3, 2, 0], [3, 2, 0]].map((pos, i) => {
        const parentPos = [0, 3.5, 0];
        const dx = pos[0] - parentPos[0];
        const dy = pos[1] - parentPos[1];
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        return (
          <mesh key={i} position={[pos[0] / 2, (pos[1] + 3.5) / 2, 0]} rotation={[0, 0, angle - Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.04, length, 6]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.3} />
          </mesh>
        );
      })}

      {/* Child node platforms */}
      {[
        { pos: [-3, 2, 0] as [number, number, number], color: accentColor },
        { pos: [3, 2, 0] as [number, number, number], color: '#a78bfa' },
      ].map((child, i) => (
        <group key={i} position={child.pos}>
          <mesh castShadow>
            <cylinderGeometry args={[0.7, 0.9, 0.25, 6]} />
            <meshStandardMaterial color={child.color} metalness={0.5} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.15, 0]} castShadow>
            <boxGeometry args={[1.5, 0.06, 0.8]} />
            <meshStandardMaterial color={child.color} emissive={child.color} emissiveIntensity={0.15} />
          </mesh>
        </group>
      ))}

      {/* Grandchild nodes */}
      {[
        { pos: [-5, 0.5, 0] as [number, number, number], parentIdx: 0 },
        { pos: [-1, 0.5, 0] as [number, number, number], parentIdx: 0 },
        { pos: [1, 0.5, 0] as [number, number, number], parentIdx: 1 },
        { pos: [5, 0.5, 0] as [number, number, number], parentIdx: 1 },
      ].map((gc, i) => {
        const parentPos = i < 2 ? [-3, 2, 0] : [3, 2, 0];
        const dx = gc.pos[0] - parentPos[0];
        const dy = gc.pos[1] - parentPos[1];
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        return (
          <group key={i}>
            <mesh position={[gc.pos[0] / 2 + parentPos[0] / 2, (gc.pos[1] + parentPos[1]) / 2, 0]} rotation={[0, 0, angle - Math.PI / 2]}>
              <cylinderGeometry args={[0.03, 0.03, length, 4]} />
              <meshStandardMaterial color={accentColor} transparent opacity={0.5} />
            </mesh>
            <mesh position={gc.pos} castShadow>
              <cylinderGeometry args={[0.4, 0.5, 0.2, 6]} />
              <meshStandardMaterial color="#c4b5fd" metalness={0.4} roughness={0.5} />
            </mesh>
          </group>
        );
      })}

      {/* IS-A labels floating near connections */}
      <group position={[-1.5, 2.8, 0.5]}>
        <mesh>
          <boxGeometry args={[1.2, 0.4, 0.05]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.3} transparent opacity={0.8} />
        </mesh>
      </group>
      <group position={[1.5, 2.8, 0.5]}>
        <mesh>
          <boxGeometry args={[1.2, 0.4, 0.05]} />
          <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.3} transparent opacity={0.8} />
        </mesh>
      </group>
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// POLYMORPHISM ARENA ENVIRONMENT
// ═══════════════════════════════════════════════════════════════

interface ArenaEnvironmentProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export function ArenaEnvironment({ primaryColor, secondaryColor, accentColor }: ArenaEnvironmentProps) {
  const arenaRadius = 4;

  return (
    <group>
      {/* Arena floor — circular platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <cylinderGeometry args={[arenaRadius, arenaRadius, 0.1, 48]} />
        <meshStandardMaterial color="#1a0f05" roughness={0.85} metalness={0.15} />
      </mesh>

      {/* Arena ring border */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <torusGeometry args={[arenaRadius, 0.06, 8, 48]} />
        <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.4} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Central dispatch hub — the "reference" station */}
      <group position={[0, 1.5, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.6, 0.8, 0.3, 6]} />
          <meshStandardMaterial color={primaryColor} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.15, 6]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.3} />
        </mesh>
        {/* Dispatch indicator */}
        <mesh position={[0, 0.35, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* Implementation stations around the arena */}
      {[
        { angle: 0, color: '#22c55e', label: 'Dog' },
        { angle: Math.PI * 0.66, color: '#3b82f6', label: 'Cat' },
        { angle: Math.PI * 1.33, color: '#f59e0b', label: 'Bird' },
      ].map((station, i) => {
        const x = Math.sin(station.angle) * (arenaRadius - 1);
        const z = Math.cos(station.angle) * (arenaRadius - 1);
        return (
          <group key={i} position={[x, 0, z]}>
            {/* Station platform */}
            <mesh position={[0, 0.15, 0]} castShadow>
              <cylinderGeometry args={[0.5, 0.6, 0.15, 6]} />
              <meshStandardMaterial color={secondaryColor} metalness={0.5} roughness={0.4} />
            </mesh>
            {/* Station pillar */}
            <mesh position={[0, 0.6, 0]} castShadow>
              <cylinderGeometry args={[0.08, 0.08, 0.8, 8]} />
              <meshStandardMaterial color={station.color} metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Station orb */}
            <mesh position={[0, 1.1, 0]}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial color={station.color} emissive={station.color} emissiveIntensity={0.5} />
            </mesh>
          </group>
        );
      })}

      {/* Execution path lines from center to stations */}
      {[0, Math.PI * 0.66, Math.PI * 1.33].map((angle, i) => {
        const x = Math.sin(angle) * (arenaRadius - 1);
        const z = Math.cos(angle) * (arenaRadius - 1);
        const length = Math.sqrt(x * x + z * z);
        const rotAngle = Math.atan2(x, z);
        return (
          <mesh key={i} position={[x / 2, 0.08, z / 2]} rotation={[0, rotAngle, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, length, 4]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.3} transparent opacity={0.6} />
          </mesh>
        );
      })}

      {/* "ONE CALL → DIFFERENT BEHAVIOR" floating label */}
      <group position={[0, 2.5, 0]}>
        <mesh>
          <boxGeometry args={[3, 0.5, 0.05]} />
          <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.15} transparent opacity={0.7} />
        </mesh>
      </group>
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// ABSTRACTION CONTROL CENTER ENVIRONMENT
// ═══════════════════════════════════════════════════════════════

interface ControlCenterEnvironmentProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export function ControlCenterEnvironment({ primaryColor, secondaryColor, accentColor }: ControlCenterEnvironmentProps) {
  return (
    <group>
      {/* Control center floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#021517" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Abstract layer — translucent barrier */}
      <group position={[0, 2, -2]}>
        <mesh castShadow>
          <boxGeometry args={[6, 3, 0.1]} />
          <meshStandardMaterial color={primaryColor} transparent opacity={0.15} metalness={0.3} roughness={0.5} />
        </mesh>
        {/* Frame edges */}
        {[
          { pos: [0, 1.5, 0.06] as [number, number, number], size: [6, 0.08, 0.08] as [number, number, number] },
          { pos: [0, -1.5, 0.06] as [number, number, number], size: [6, 0.08, 0.08] as [number, number, number] },
          { pos: [-3, 0, 0.06] as [number, number, number], size: [0.08, 3, 0.08] as [number, number, number] },
          { pos: [3, 0, 0.06] as [number, number, number], size: [0.08, 3, 0.08] as [number, number, number] },
        ].map((edge, i) => (
          <mesh key={i} position={edge.pos} castShadow>
            <boxGeometry args={edge.size} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.4} />
          </mesh>
        ))}
      </group>

      {/* Control panels — left side (abstract interface) */}
      {[
        { pos: [-3, 1, 1] as [number, number, number], color: accentColor },
        { pos: [-1.5, 1, 1] as [number, number, number], color: accentColor },
      ].map((panel, i) => (
        <group key={i} position={panel.pos}>
          <mesh castShadow>
            <boxGeometry args={[1.2, 0.8, 0.2]} />
            <meshStandardMaterial color={secondaryColor} roughness={0.5} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.12]}>
            <boxGeometry args={[0.8, 0.4, 0.02]} />
            <meshStandardMaterial color={panel.color} emissive={panel.color} emissiveIntensity={0.3} />
          </mesh>
          {/* Button */}
          <mesh position={[0, -0.25, 0.12]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color={panel.color} emissive={panel.color} emissiveIntensity={0.6} />
          </mesh>
        </group>
      ))}

      {/* Concrete implementations — right side */}
      {[
        { pos: [2, 0.5, 1] as [number, number, number], color: '#22c55e', shape: 'circle' },
        { pos: [4, 0.5, 1] as [number, number, number], color: '#3b82f6', shape: 'rect' },
      ].map((impl, i) => (
        <group key={i} position={impl.pos}>
          <mesh position={[0, 0.3, 0]} castShadow>
            <boxGeometry args={[1.5, 0.6, 0.3]} />
            <meshStandardMaterial color={impl.color} metalness={0.4} roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.7, 0]} castShadow>
            {impl.shape === 'circle' ? (
              <sphereGeometry args={[0.2, 16, 16]} />
            ) : (
              <boxGeometry args={[0.4, 0.3, 0.1]} />
            )}
            <meshStandardMaterial color={impl.color} emissive={impl.color} emissiveIntensity={0.4} />
          </mesh>
        </group>
      ))}

      {/* "ABSTRACT LAYER" label frame */}
      <group position={[0, 3.5, -2]}>
        <mesh>
          <boxGeometry args={[4, 0.4, 0.05]} />
          <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.2} transparent opacity={0.8} />
        </mesh>
      </group>

      {/* Hidden complexity layers behind the abstract barrier */}
      {[-1.5, 0, 1.5].map((x, i) => (
        <group key={i} position={[x, 0.3, -3.5]}>
          <mesh castShadow>
            <boxGeometry args={[1, 0.4, 0.15]} />
            <meshStandardMaterial color="#0a2a2f" roughness={0.7} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0.25, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// INTERFACE CONTRACT LAB ENVIRONMENT
// ═══════════════════════════════════════════════════════════════

interface ContractLabEnvironmentProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export function ContractLabEnvironment({ primaryColor, secondaryColor, accentColor }: ContractLabEnvironmentProps) {
  return (
    <group>
      {/* Contract lab floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#1a0510" roughness={0.85} metalness={0.15} />
      </mesh>

      {/* Contract document — large floating panel at top */}
      <group position={[0, 3, -2]}>
        <mesh castShadow>
          <boxGeometry args={[4, 2.5, 0.08]} />
          <meshStandardMaterial color={secondaryColor} roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Document header stripe */}
        <mesh position={[0, 0.9, 0.05]}>
          <boxGeometry args={[3.6, 0.3, 0.01]} />
          <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.3} />
        </mesh>
        {/* Method signatures on document */}
        {[0.3, -0.1, -0.5].map((y, i) => (
          <mesh key={i} position={[-0.5, y, 0.05]}>
            <boxGeometry args={[2.5, 0.12, 0.01]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.2} transparent opacity={0.6} />
          </mesh>
        ))}
        {/* Seal/stamp */}
        <mesh position={[1.2, -0.8, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.02, 16]} />
          <meshStandardMaterial color={primaryColor} metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Implementing class stations */}
      {[
        { pos: [-3, 0, 1] as [number, number, number], color: '#22c55e', label: 'CardPayment' },
        { pos: [0, 0, 1] as [number, number, number], color: '#3b82f6', label: 'CashPayment' },
        { pos: [3, 0, 1] as [number, number, number], color: '#f59e0b', label: 'OnlinePayment' },
      ].map((station, i) => (
        <group key={i} position={station.pos}>
          {/* Station base */}
          <mesh position={[0, 0.2, 0]} castShadow>
            <boxGeometry args={[1.8, 0.35, 1]} />
            <meshStandardMaterial color={secondaryColor} roughness={0.5} metalness={0.3} />
          </mesh>
          {/* Station label plate */}
          <mesh position={[0, 0.45, 0.5]}>
            <boxGeometry args={[1.4, 0.2, 0.02]} />
            <meshStandardMaterial color={station.color} emissive={station.color} emissiveIntensity={0.2} />
          </mesh>
          {/* Status indicator */}
          <mesh position={[0, 0.6, 0]}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshStandardMaterial color={station.color} emissive={station.color} emissiveIntensity={0.7} />
          </mesh>
        </group>
      ))}

      {/* Contract connection lines from document to stations */}
      {[-3, 0, 3].map((x, i) => {
        const startX = 0;
        const startZ = -2;
        const endX = x;
        const endZ = 1;
        const dx = endX - startX;
        const dz = endZ - startZ;
        const length = Math.sqrt(dx * dx + dz * dz);
        const angle = Math.atan2(dx, dz);
        return (
          <mesh key={i} position={[(startX + endX) / 2, 1.5, (startZ + endZ) / 2]} rotation={[0, angle, Math.PI / 2]}>
            <cylinderGeometry args={[0.03, 0.03, length, 4]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.3} transparent opacity={0.5} />
          </mesh>
        );
      })}

      {/* "CONTRACT" label at top */}
      <group position={[0, 4.5, -2]}>
        <mesh>
          <boxGeometry args={[2.5, 0.35, 0.05]} />
          <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.25} transparent opacity={0.8} />
        </mesh>
      </group>
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// JAVA RUNTIME LAB ENVIRONMENT
// ═══════════════════════════════════════════════════════════════

interface RuntimeLabEnvironmentProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export function RuntimeLabEnvironment({ primaryColor, secondaryColor, accentColor }: RuntimeLabEnvironmentProps) {
  return (
    <group>
      {/* Runtime lab floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#0a1a18" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* ── OBJECT MEMORY AREA (left side) ── */}
      <group position={[-4, 0, 0]}>
        {/* Object memory platform */}
        <mesh position={[0, 0.05, 0]} receiveShadow>
          <boxGeometry args={[3.5, 0.1, 3]} />
          <meshStandardMaterial color={secondaryColor} roughness={0.6} metalness={0.3} />
        </mesh>
        {/* "OBJECT MEMORY" label */}
        <group position={[0, 1.2, -1.5]}>
          <mesh>
            <boxGeometry args={[2.5, 0.3, 0.05]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.2} />
          </mesh>
        </group>
        {/* Object slots */}
        {[
          { pos: [-0.8, 0.3, 0] as [number, number, number], color: '#3b82f6' },
          { pos: [0.8, 0.3, 0] as [number, number, number], color: '#10b981' },
        ].map((slot, i) => (
          <group key={i} position={slot.pos}>
            <mesh castShadow>
              <boxGeometry args={[1.2, 0.5, 0.8]} />
              <meshStandardMaterial color={slot.color} transparent opacity={0.3} metalness={0.4} roughness={0.5} />
            </mesh>
            {/* Object indicator */}
            <mesh position={[0, 0.35, 0]}>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshStandardMaterial color={slot.color} emissive={slot.color} emissiveIntensity={0.6} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── REFERENCE AREA (center) ── */}
      <group position={[0, 0, 0]}>
        {/* Reference platform */}
        <mesh position={[0, 0.05, 0]} receiveShadow>
          <boxGeometry args={[3, 0.1, 2.5]} />
          <meshStandardMaterial color={primaryColor} roughness={0.6} metalness={0.3} />
        </mesh>
        {/* "REFERENCES" label */}
        <group position={[0, 1.2, -1.2]}>
          <mesh>
            <boxGeometry args={[2, 0.3, 0.05]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.2} />
          </mesh>
        </group>
        {/* Reference arrows */}
        {[
          { pos: [-0.5, 0.4, 0] as [number, number, number], color: '#f59e0b' },
          { pos: [0.5, 0.4, 0] as [number, number, number], color: '#ef4444' },
        ].map((ref, i) => (
          <group key={i} position={ref.pos}>
            <mesh castShadow>
              <boxGeometry args={[0.8, 0.3, 0.15]} />
              <meshStandardMaterial color={ref.color} transparent opacity={0.4} metalness={0.5} />
            </mesh>
          </group>
        ))}
        {/* Connection lines from references to objects */}
        <mesh position={[-2, 0.4, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[3, 0.02, 0.02]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.3} transparent opacity={0.5} />
        </mesh>
        <mesh position={[2, 0.4, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[3, 0.02, 0.02]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.3} transparent opacity={0.5} />
        </mesh>
      </group>

      {/* ── CLASS/STATIC AREA (right side) ── */}
      <group position={[4, 0, 0]}>
        {/* Static area platform */}
        <mesh position={[0, 0.05, 0]} receiveShadow>
          <boxGeometry args={[3.5, 0.1, 3]} />
          <meshStandardMaterial color={secondaryColor} roughness={0.6} metalness={0.3} />
        </mesh>
        {/* "CLASS LEVEL" label */}
        <group position={[0, 1.2, -1.5]}>
          <mesh>
            <boxGeometry args={[2.5, 0.3, 0.05]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.2} />
          </mesh>
        </group>
        {/* Static member slots */}
        {[
          { pos: [-0.5, 0.3, 0] as [number, number, number], color: '#8b5cf6' },
          { pos: [0.5, 0.3, 0] as [number, number, number], color: '#06b6d4' },
        ].map((slot, i) => (
          <group key={i} position={slot.pos}>
            <mesh castShadow>
              <boxGeometry args={[1, 0.5, 0.8]} />
              <meshStandardMaterial color={slot.color} transparent opacity={0.3} metalness={0.4} roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.35, 0]}>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshStandardMaterial color={slot.color} emissive={slot.color} emissiveIntensity={0.6} />
            </mesh>
          </group>
        ))}
        {/* Shared indicator */}
        <group position={[0, 0.8, 0]}>
          <mesh>
            <boxGeometry args={[2.5, 0.04, 0.04]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.4} />
          </mesh>
        </group>
      </group>

      {/* ── EXECUTION TIMELINE (back wall) ── */}
      <group position={[0, 1.5, -3]}>
        <mesh castShadow>
          <boxGeometry args={[10, 1.5, 0.1]} />
          <meshStandardMaterial color="#0f2a28" roughness={0.7} metalness={0.3} />
        </mesh>
        {/* Timeline steps */}
        {[-3.5, -2, -0.5, 1, 2.5].map((x, i) => (
          <group key={i} position={[x, 0, 0.06]}>
            <mesh>
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshStandardMaterial color={i < 2 ? accentColor : '#4a5568'} emissive={i < 2 ? accentColor : '#4a5568'} emissiveIntensity={0.4} />
            </mesh>
            {i < 4 && (
              <mesh position={[0.75, 0, 0]}>
                <boxGeometry args={[1.2, 0.02, 0.02]} />
                <meshStandardMaterial color={i < 2 ? accentColor : '#4a5568'} transparent opacity={0.5} />
              </mesh>
            )}
          </group>
        ))}
      </group>

      {/* ── CONCEPTUAL LABEL ── */}
      <group position={[0, 3.2, 0]}>
        <mesh>
          <boxGeometry args={[4, 0.35, 0.05]} />
          <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.15} transparent opacity={0.7} />
        </mesh>
      </group>

      {/* ── KEYWORD STATIONS ── */}
      {[
        { pos: [-2, 0.8, 2] as [number, number, number], color: '#f59e0b', label: 'this' },
        { pos: [0, 0.8, 2] as [number, number, number], color: '#ef4444', label: 'super' },
        { pos: [2, 0.8, 2] as [number, number, number], color: '#8b5cf6', label: 'static' },
      ].map((station, i) => (
        <group key={i} position={station.pos}>
          <mesh position={[0, -0.3, 0]} castShadow>
            <cylinderGeometry args={[0.4, 0.5, 0.15, 6]} />
            <meshStandardMaterial color={secondaryColor} roughness={0.5} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.8, 0.4, 0.08]} />
            <meshStandardMaterial color={station.color} emissive={station.color} emissiveIntensity={0.2} transparent opacity={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// PACKAGE CITY ENVIRONMENT
// ═══════════════════════════════════════════════════════════════

interface PackageCityEnvironmentProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export function PackageCityEnvironment({ primaryColor, secondaryColor, accentColor }: PackageCityEnvironmentProps) {
  return (
    <group>
      {/* City floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#0a1a1e" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* ── ROOT PACKAGE (center) ── */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.05, 0]} receiveShadow>
          <boxGeometry args={[2, 0.1, 2]} />
          <meshStandardMaterial color={primaryColor} roughness={0.5} metalness={0.3} />
        </mesh>
        <group position={[0, 0.7, -1]}>
          <mesh>
            <boxGeometry args={[1.8, 0.3, 0.05]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.2} />
          </mesh>
        </group>
      </group>

      {/* ── SUB-PACKAGES (branching folders) ── */}
      {[
        { pos: [-3, 0, -1] as [number, number, number], color: '#3b82f6', label: 'model' },
        { pos: [3, 0, -1] as [number, number, number], color: '#10b981', label: 'util' },
        { pos: [-3, 0, 2] as [number, number, number], color: '#8b5cf6', label: 'service' },
        { pos: [3, 0, 2] as [number, number, number], color: '#f59e0b', label: 'controller' },
      ].map((pkg, i) => (
        <group key={i} position={pkg.pos}>
          <mesh position={[0, 0.05, 0]} receiveShadow>
            <boxGeometry args={[1.8, 0.1, 1.8]} />
            <meshStandardMaterial color={secondaryColor} roughness={0.6} metalness={0.3} />
          </mesh>
          {/* Folder indicator */}
          <mesh position={[0, 0.4, 0]} castShadow>
            <boxGeometry args={[1.2, 0.3, 0.08]} />
            <meshStandardMaterial color={pkg.color} emissive={pkg.color} emissiveIntensity={0.15} transparent opacity={0.6} />
          </mesh>
          {/* Class files inside */}
          {[[-0.3, 0.15, 0], [0.3, 0.15, 0]].map((pos, j) => (
            <mesh key={j} position={pos as [number, number, number]} castShadow>
              <boxGeometry args={[0.3, 0.2, 0.06]} />
              <meshStandardMaterial color={accentColor} transparent opacity={0.4} />
            </mesh>
          ))}
        </group>
      ))}

      {/* ── CONNECTION PATHS (imports) ── */}
      {[
        { from: [-1.5, 0.15, 0], to: [-2.1, 0.15, -0.5] as [number, number, number] },
        { from: [1.5, 0.15, 0], to: [2.1, 0.15, -0.5] as [number, number, number] },
        { from: [-1.5, 0.15, 0], to: [-2.1, 0.15, 1.5] as [number, number, number] },
        { from: [1.5, 0.15, 0], to: [2.1, 0.15, 1.5] as [number, number, number] },
      ].map((path, i) => (
        <mesh key={i} position={[(path.from[0] + path.to[0]) / 2, 0.15, (path.from[2] + path.to[2]) / 2]}>
          <boxGeometry args={[Math.abs(path.to[0] - path.from[0]) + 0.3, 0.02, 0.02]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.3} transparent opacity={0.5} />
        </mesh>
      ))}

      {/* ── IMPORT ARROWS ── */}
      {[
        { pos: [-1, 0.6, 0] as [number, number, number], color: '#06b6d4' },
        { pos: [1, 0.6, 0] as [number, number, number], color: '#06b6d4' },
      ].map((arrow, i) => (
        <group key={i} position={arrow.pos}>
          <mesh castShadow>
            <coneGeometry args={[0.1, 0.2, 4]} />
            <meshStandardMaterial color={arrow.color} emissive={arrow.color} emissiveIntensity={0.3} />
          </mesh>
        </group>
      ))}

      {/* ── ACCESS CONTROL WALLS ── */}
      {[
        { pos: [-3, 0.4, -1.9] as [number, number, number], color: '#ef4444' },
        { pos: [3, 0.4, -1.9] as [number, number, number], color: '#ef4444' },
      ].map((wall, i) => (
        <group key={i} position={wall.pos}>
          <mesh castShadow>
            <boxGeometry args={[1.8, 0.6, 0.05]} />
            <meshStandardMaterial color={wall.color} transparent opacity={0.3} emissive={wall.color} emissiveIntensity={0.15} />
          </mesh>
        </group>
      ))}

      {/* ── CONCEPT LABEL ── */}
      <group position={[0, 3.2, 0]}>
        <mesh>
          <boxGeometry args={[4, 0.35, 0.05]} />
          <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.15} transparent opacity={0.7} />
        </mesh>
      </group>
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// EXCEPTION FLOW ENVIRONMENT
// ═══════════════════════════════════════════════════════════════

interface ExceptionFlowEnvironmentProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export function ExceptionFlowEnvironment({ primaryColor, secondaryColor, accentColor }: ExceptionFlowEnvironmentProps) {
  return (
    <group>
      {/* Exception flow floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#1a0a0a" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* ── TRY BLOCK (left) ── */}
      <group position={[-4, 0, 0]}>
        <mesh position={[0, 0.05, 0]} receiveShadow>
          <boxGeometry args={[3, 0.1, 3]} />
          <meshStandardMaterial color={primaryColor} roughness={0.5} metalness={0.3} transparent opacity={0.7} />
        </mesh>
        <group position={[0, 1.2, -1.5]}>
          <mesh>
            <boxGeometry args={[2, 0.3, 0.05]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.3} />
          </mesh>
        </group>
        {/* Dangerous code symbols */}
        {[
          { pos: [-0.5, 0.3, 0] as [number, number, number], color: '#f59e0b' },
          { pos: [0.5, 0.3, 0] as [number, number, number], color: '#f59e0b' },
        ].map((item, i) => (
          <group key={i} position={item.pos}>
            <mesh castShadow>
              <octahedronGeometry args={[0.2]} />
              <meshStandardMaterial color={item.color} emissive={item.color} emissiveIntensity={0.3} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── EXCEPTION BOLT (throw point) ── */}
      <group position={[0, 0.8, 0]}>
        <mesh castShadow>
          <coneGeometry args={[0.15, 0.4, 6]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[0.05, 0.5, 0.05]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.3} transparent opacity={0.6} />
        </mesh>
      </group>

      {/* ── CATCH BLOCK (center) ── */}
      <group position={[2, 0, 0]}>
        <mesh position={[0, 0.05, 0]} receiveShadow>
          <boxGeometry args={[2.5, 0.1, 3]} />
          <meshStandardMaterial color={secondaryColor} roughness={0.5} metalness={0.3} transparent opacity={0.7} />
        </mesh>
        <group position={[0, 1.2, -1.5]}>
          <mesh>
            <boxGeometry args={[2, 0.3, 0.05]} />
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.3} />
          </mesh>
        </group>
        {/* Catch handler indicator */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[1.5, 0.3, 0.08]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.2} transparent opacity={0.5} />
        </mesh>
      </group>

      {/* ── FINALLY BLOCK (right) ── */}
      <group position={[5, 0, 0]}>
        <mesh position={[0, 0.05, 0]} receiveShadow>
          <boxGeometry args={[2, 0.1, 3]} />
          <meshStandardMaterial color="#7c3aed" roughness={0.5} metalness={0.3} transparent opacity={0.6} />
        </mesh>
        <group position={[0, 1.2, -1.5]}>
          <mesh>
            <boxGeometry args={[1.8, 0.3, 0.05]} />
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.3} />
          </mesh>
        </group>
        {/* Always-run indicator */}
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* ── FLOW ARROWS (exception path) ── */}
      {[
        { pos: [-1.2, 0.4, 0] as [number, number, number], color: '#ef4444' },
        { pos: [1.2, 0.4, 0] as [number, number, number], color: '#10b981' },
        { pos: [3.8, 0.4, 0] as [number, number, number], color: '#8b5cf6' },
      ].map((arrow, i) => (
        <group key={i} position={arrow.pos}>
          <mesh>
            <boxGeometry args={[1, 0.04, 0.04]} />
            <meshStandardMaterial color={arrow.color} emissive={arrow.color} emissiveIntensity={0.3} transparent opacity={0.6} />
          </mesh>
        </group>
      ))}

      {/* ── PROPAGATION PATH (up the call stack) ── */}
      <group position={[0, 2, -2]}>
        <mesh castShadow>
          <boxGeometry args={[12, 0.04, 0.04]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.2} transparent opacity={0.4} />
        </mesh>
        {/* Call stack frames */}
        {[-4, -2, 0, 2, 4].map((x, i) => (
          <group key={i} position={[x, -0.2, 0]}>
            <mesh castShadow>
              <boxGeometry args={[1, 0.3, 0.06]} />
              <meshStandardMaterial color={i < 3 ? '#ef4444' : '#4a5568'} transparent opacity={i < 3 ? 0.4 : 0.2} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── CONCEPT LABEL ── */}
      <group position={[0, 3.2, 0]}>
        <mesh>
          <boxGeometry args={[4, 0.35, 0.05]} />
          <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.15} transparent opacity={0.7} />
        </mesh>
      </group>
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// COLLECTIONS LAB ENVIRONMENT
// ═══════════════════════════════════════════════════════════════

interface CollectionsLabEnvironmentProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export function CollectionsLabEnvironment({ primaryColor, secondaryColor, accentColor }: CollectionsLabEnvironmentProps) {
  return (
    <group>
      {/* Collections lab floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#1a150a" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* ── ARRAYLIST (left) — ordered slots ── */}
      <group position={[-4, 0, 0]}>
        <mesh position={[0, 0.05, 0]} receiveShadow>
          <boxGeometry args={[4, 0.1, 2]} />
          <meshStandardMaterial color={secondaryColor} roughness={0.5} metalness={0.3} />
        </mesh>
        <group position={[0, 1, -1]}>
          <mesh>
            <boxGeometry args={[2, 0.3, 0.05]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.2} />
          </mesh>
        </group>
        {/* Array slots */}
        {[-1.2, -0.4, 0.4, 1.2].map((x, i) => (
          <group key={i} position={[x, 0.2, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.6, 0.3, 0.5]} />
              <meshStandardMaterial
                color={i < 3 ? primaryColor : '#4a5568'}
                transparent
                opacity={i < 3 ? 0.5 : 0.15}
                metalness={0.4}
              />
            </mesh>
            {i < 3 && (
              <mesh position={[0, 0.22, 0]}>
                <sphereGeometry args={[0.05, 12, 12]} />
                <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.6} />
              </mesh>
            )}
          </group>
        ))}
        {/* Growth arrow */}
        <mesh position={[2.2, 0.3, 0]}>
          <boxGeometry args={[0.3, 0.04, 0.04]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.4} />
        </mesh>
      </group>

      {/* ── HASHMAP (center) — buckets ── */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.05, 0]} receiveShadow>
          <boxGeometry args={[3, 0.1, 3]} />
          <meshStandardMaterial color={secondaryColor} roughness={0.5} metalness={0.3} />
        </mesh>
        <group position={[0, 1.2, -1.5]}>
          <mesh>
            <boxGeometry args={[2, 0.3, 0.05]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.2} />
          </mesh>
        </group>
        {/* Hash buckets */}
        {[
          { pos: [-0.8, 0.25, -0.5] as [number, number, number], color: '#3b82f6' },
          { pos: [0, 0.25, -0.5] as [number, number, number], color: '#10b981' },
          { pos: [0.8, 0.25, -0.5] as [number, number, number], color: '#f59e0b' },
          { pos: [-0.8, 0.25, 0.5] as [number, number, number], color: '#8b5cf6' },
          { pos: [0, 0.25, 0.5] as [number, number, number], color: '#ef4444' },
          { pos: [0.8, 0.25, 0.5] as [number, number, number], color: '#06b6d4' },
        ].map((bucket, i) => (
          <group key={i} position={bucket.pos}>
            <mesh castShadow>
              <cylinderGeometry args={[0.25, 0.3, 0.3, 6]} />
              <meshStandardMaterial color={bucket.color} transparent opacity={0.35} metalness={0.4} />
            </mesh>
            <mesh position={[0, 0.2, 0]}>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshStandardMaterial color={bucket.color} emissive={bucket.color} emissiveIntensity={0.6} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── HASHSET (right) — unique elements ── */}
      <group position={[4, 0, 0]}>
        <mesh position={[0, 0.05, 0]} receiveShadow>
          <boxGeometry args={[3, 0.1, 3]} />
          <meshStandardMaterial color={secondaryColor} roughness={0.5} metalness={0.3} />
        </mesh>
        <group position={[0, 1.2, -1.5]}>
          <mesh>
            <boxGeometry args={[2, 0.3, 0.05]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.2} />
          </mesh>
        </group>
        {/* Unique element bubbles */}
        {[
          { pos: [-0.6, 0.3, 0] as [number, number, number], color: '#3b82f6' },
          { pos: [0.6, 0.3, 0] as [number, number, number], color: '#10b981' },
          { pos: [0, 0.3, 0.6] as [number, number, number], color: '#f59e0b' },
        ].map((el, i) => (
          <group key={i} position={el.pos}>
            <mesh castShadow>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial color={el.color} emissive={el.color} emissiveIntensity={0.2} metalness={0.5} roughness={0.4} />
            </mesh>
          </group>
        ))}
        {/* Rejected duplicate indicator */}
        <mesh position={[0, 0.8, -0.6]} castShadow>
          <boxGeometry args={[0.3, 0.3, 0.06]} />
          <meshStandardMaterial color="#ef4444" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* ── ITERATION PATH ── */}
      <group position={[0, 0.6, 2]}>
        <mesh>
          <boxGeometry args={[10, 0.03, 0.03]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.3} transparent opacity={0.4} />
        </mesh>
        {[-3.5, -1.5, 0.5, 2.5].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} />
          </mesh>
        ))}
      </group>

      {/* ── GENERIC TYPE SHIELD ── */}
      <group position={[0, 2.5, 0]}>
        <mesh>
          <boxGeometry args={[3, 0.35, 0.05]} />
          <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.15} transparent opacity={0.7} />
        </mesh>
      </group>
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// ARCHITECTURE LAB ENVIRONMENT
// ═══════════════════════════════════════════════════════════════

interface ArchitectureLabEnvironmentProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export function ArchitectureLabEnvironment({ primaryColor, secondaryColor, accentColor }: ArchitectureLabEnvironmentProps) {
  return (
    <group>
      {/* Architecture lab floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0c0a1a" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* ── CENTRAL ARCHITECTURE TABLE ── */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.05, 0]} receiveShadow>
          <boxGeometry args={[6, 0.12, 4]} />
          <meshStandardMaterial color={secondaryColor} roughness={0.4} metalness={0.4} />
        </mesh>
        {/* Table legs */}
        {[[-2.5, -1.5], [2.5, -1.5], [-2.5, 1.5], [2.5, 1.5]].map(([x, z], i) => (
          <mesh key={i} position={[x, -0.35, z]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 0.7, 8]} />
            <meshStandardMaterial color="#1a1625" metalness={0.5} roughness={0.5} />
          </mesh>
        ))}
        {/* Table surface glow ring */}
        <mesh position={[0, 0.12, 0]}>
          <ringGeometry args={[2.5, 2.7, 32]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.15} transparent opacity={0.4} />
        </mesh>
      </group>

      {/* ── CLASS/INTERFACE NODES (floating above table) ── */}
      {[
        { pos: [-2, 1.5, 0] as [number, number, number], color: primaryColor, label: 'OrderService', type: 'class' },
        { pos: [2, 1.5, -1] as [number, number, number], color: '#10b981', label: 'Database', type: 'interface' },
        { pos: [2, 1.5, 1] as [number, number, number], color: '#f59e0b', label: 'MySQL', type: 'class' },
        { pos: [0, 2.2, 0] as [number, number, number], color: '#8b5cf6', label: 'SOLID', type: 'concept' },
        { pos: [-2, 1.5, 2] as [number, number, number], color: '#ef4444', label: 'Invoice', type: 'class' },
        { pos: [-2, 1.5, -2] as [number, number, number], color: '#06b6d4', label: 'Teacher', type: 'class' },
      ].map((node, i) => (
        <group key={i} position={node.pos}>
          {/* Node body */}
          <mesh castShadow>
            <boxGeometry args={[1.2, 0.5, 0.08]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.15}
              transparent
              opacity={0.7}
              metalness={0.3}
              roughness={0.5}
            />
          </mesh>
          {/* Node indicator dot */}
          <mesh position={[0, 0, 0.06]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.8} />
          </mesh>
          {/* Interface marker (diamond) for interfaces */}
          {node.type === 'interface' && (
            <mesh position={[0.5, 0.35, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.12, 0.12, 0.04]} />
              <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} />
            </mesh>
          )}
        </group>
      ))}

      {/* ── RELATIONSHIP LINES ── */}
      {/* OrderService → Database (dependency / DIP) */}
      <mesh position={[0, 1.5, -0.5]} rotation={[0, 0.4, 0]}>
        <boxGeometry args={[2.5, 0.025, 0.025]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.3} transparent opacity={0.6} />
      </mesh>
      {/* Database → MySQL (implementation) */}
      <mesh position={[2, 1.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[2, 0.025, 0.025]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.3} transparent opacity={0.6} />
      </mesh>
      {/* Teacher → Student (association) */}
      <mesh position={[-2, 1.5, -1]} rotation={[0, 0.8, 0]}>
        <boxGeometry args={[2.2, 0.02, 0.02]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.2} transparent opacity={0.4} />
      </mesh>
      {/* Invoice lines (SRP violation indicators) */}
      {[-0.4, 0, 0.4].map((offset, i) => (
        <mesh key={i} position={[-2, 1.5, 2 + offset]} rotation={[0, 0.3, 0]}>
          <boxGeometry args={[1.5, 0.015, 0.015]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.2} transparent opacity={0.3} />
        </mesh>
      ))}

      {/* ── SOLID PRINCIPLE NODES (5 around the table) ── */}
      {[
        { pos: [-3, 0.6, -2.5] as [number, number, number], color: '#ef4444', letter: 'S', label: 'SRP' },
        { pos: [3, 0.6, -2.5] as [number, number, number], color: '#f59e0b', letter: 'O', label: 'OCP' },
        { pos: [-3, 0.6, 2.5] as [number, number, number], color: '#10b981', letter: 'L', label: 'LSP' },
        { pos: [3, 0.6, 2.5] as [number, number, number], color: '#3b82f6', letter: 'I', label: 'ISP' },
        { pos: [0, 0.6, 3] as [number, number, number], color: '#8b5cf6', letter: 'D', label: 'DIP' },
      ].map((solid, i) => (
        <group key={i} position={solid.pos}>
          {/* Solid principle pedestal */}
          <mesh position={[0, -0.2, 0]} castShadow>
            <cylinderGeometry args={[0.35, 0.4, 0.12, 6]} />
            <meshStandardMaterial color="#1a1625" roughness={0.5} metalness={0.3} />
          </mesh>
          {/* Letter node */}
          <mesh castShadow>
            <boxGeometry args={[0.6, 0.6, 0.08]} />
            <meshStandardMaterial color={solid.color} emissive={solid.color} emissiveIntensity={0.2} transparent opacity={0.65} />
          </mesh>
          {/* Connection line to center table */}
          <mesh position={[solid.pos[0] > 0 ? -1.5 : 1.5, 0.25, solid.pos[2] > 0 ? -1.2 : 1.2]}>
            <boxGeometry args={[2, 0.015, 0.015]} />
            <meshStandardMaterial color={solid.color} emissive={solid.color} emissiveIntensity={0.2} transparent opacity={0.35} />
          </mesh>
        </group>
      ))}

      {/* ── ARCHITECTURE MODULES (back wall) ── */}
      <group position={[0, 2, -4]}>
        <mesh castShadow>
          <boxGeometry args={[12, 2, 0.12]} />
          <meshStandardMaterial color="#0f0d1a" roughness={0.7} metalness={0.3} />
        </mesh>
        {/* Module boxes */}
        {[-4.5, -2.5, -0.5, 1.5, 3.5].map((x, i) => (
          <group key={i} position={[x, 0, 0.07]}>
            <mesh castShadow>
              <boxGeometry args={[1.5, 1, 0.04]} />
              <meshStandardMaterial
                color={[primaryColor, '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][i]}
                transparent
                opacity={0.35}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── HIERARCHY TREE (right side) ── */}
      <group position={[5, 0, 0]}>
        {/* Parent node */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <boxGeometry args={[1, 0.4, 0.06]} />
          <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.15} transparent opacity={0.6} />
        </mesh>
        {/* Child nodes */}
        {[-0.8, 0.8].map((z, i) => (
          <group key={i}>
            <mesh position={[0, 1.2, z]} castShadow>
              <boxGeometry args={[0.8, 0.3, 0.06]} />
              <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.1} transparent opacity={0.5} />
            </mesh>
            {/* Connection line */}
            <mesh position={[0, 1.05, z / 2]} rotation={[Math.PI / 2, 0, 0]}>
              <boxGeometry args={[0.02, Math.abs(z), 0.02]} />
              <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.2} transparent opacity={0.4} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── COUPLING VISUALIZATION (left side) ── */}
      <group position={[-5, 0, 0]}>
        {/* Bad coupling cluster */}
        {[[-0.5, 0.8, -0.5], [0.5, 0.8, -0.5], [0, 0.8, 0.5]].map((pos, i) => (
          <group key={i} position={pos as [number, number, number]}>
            <mesh castShadow>
              <boxGeometry args={[0.7, 0.35, 0.06]} />
              <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.15} transparent opacity={0.45} />
            </mesh>
          </group>
        ))}
        {/* Rigid coupling lines (red) */}
        {[[0, 0.8, -0.5, 0.5, 0.8, -0.5], [0, 0.8, -0.5, 0, 0.8, 0.5], [0.5, 0.8, -0.5, 0, 0.8, 0.5]].map(([x1, y1, z1, x2, y2, z2], i) => (
          <mesh key={i} position={[(x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2]}>
            <boxGeometry args={[0.8, 0.02, 0.02]} />
            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.3} transparent opacity={0.5} />
          </mesh>
        ))}
      </group>

      {/* ── EXECUTION TIMELINE (front wall) ── */}
      <group position={[0, 1.5, 4]}>
        <mesh castShadow>
          <boxGeometry args={[10, 1.2, 0.08]} />
          <meshStandardMaterial color="#0f0d1a" roughness={0.7} metalness={0.3} />
        </mesh>
        {[-3.5, -2, -0.5, 1, 2.5].map((x, i) => (
          <group key={i} position={[x, 0, 0.05]}>
            <mesh>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshStandardMaterial
                color={i < 3 ? accentColor : '#4a5568'}
                emissive={i < 3 ? accentColor : '#4a5568'}
                emissiveIntensity={0.4}
              />
            </mesh>
            {i < 4 && (
              <mesh position={[0.75, 0, 0]}>
                <boxGeometry args={[1.2, 0.015, 0.015]} />
                <meshStandardMaterial color={i < 2 ? accentColor : '#4a5568'} transparent opacity={0.4} />
              </mesh>
            )}
          </group>
        ))}
      </group>

      {/* ── CONCEPT LABEL ── */}
      <group position={[0, 3.5, 0]}>
        <mesh>
          <boxGeometry args={[5, 0.4, 0.05]} />
          <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.12} transparent opacity={0.65} />
        </mesh>
      </group>

      {/* ── AGGREGATION vs COMPOSITION VISUALIZER (front left) ── */}
      <group position={[-4, 0, 3]}>
        {/* Aggregation (hollow diamond) */}
        <mesh position={[0, 0.8, -0.5]} castShadow>
          <ringGeometry args={[0.08, 0.14, 4]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.4} />
        </mesh>
        {/* Composition (filled diamond) */}
        <mesh position={[0, 0.8, 0.5]} castShadow>
          <boxGeometry args={[0.18, 0.18, 0.04]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.4} />
        </mesh>
        {/* Lines */}
        <mesh position={[0.6, 0.8, -0.5]}>
          <boxGeometry args={[1, 0.02, 0.02]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.3} transparent opacity={0.5} />
        </mesh>
        <mesh position={[0.6, 0.8, 0.5]}>
          <boxGeometry args={[1, 0.02, 0.02]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.3} transparent opacity={0.5} />
        </mesh>
      </group>
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// DESIGN LAB ENVIRONMENT — Software Engineering Command Center
// ═══════════════════════════════════════════════════════════════

interface DesignLabEnvironmentProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export function DesignLabEnvironment({ primaryColor, secondaryColor, accentColor }: DesignLabEnvironmentProps) {
  return (
    <group>
      {/* Design lab floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#1a0a14" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* ── CENTRAL DESIGN TABLE ── */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.05, 0]} receiveShadow>
          <boxGeometry args={[8, 0.12, 5]} />
          <meshStandardMaterial color={secondaryColor} roughness={0.4} metalness={0.4} />
        </mesh>
        {/* Table glow ring */}
        <mesh position={[0, 0.12, 0]}>
          <ringGeometry args={[3.5, 3.7, 32]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.12} transparent opacity={0.35} />
        </mesh>
      </group>

      {/* ── DESIGN PIPELINE STAGES (back wall — 11 stages) ── */}
      <group position={[0, 2.2, -4.5]}>
        <mesh castShadow>
          <boxGeometry args={[14, 1.8, 0.12]} />
          <meshStandardMaterial color="#12081a" roughness={0.7} metalness={0.3} />
        </mesh>
        {[
          { x: -5.5, label: '01', color: '#ef4444' },
          { x: -4.4, label: '02', color: '#f59e0b' },
          { x: -3.3, label: '03', color: '#f59e0b' },
          { x: -2.2, label: '04', color: '#10b981' },
          { x: -1.1, label: '05', color: '#10b981' },
          { x: 0, label: '06', color: '#3b82f6' },
          { x: 1.1, label: '07', color: '#3b82f6' },
          { x: 2.2, label: '08', color: '#8b5cf6' },
          { x: 3.3, label: '09', color: '#8b5cf6' },
          { x: 4.4, label: '10', color: accentColor },
          { x: 5.5, label: '11', color: primaryColor },
        ].map((stage, i) => (
          <group key={i} position={[stage.x, 0, 0.07]}>
            <mesh castShadow>
              <boxGeometry args={[0.9, 0.9, 0.04]} />
              <meshStandardMaterial color={stage.color} transparent opacity={i < 3 ? 0.55 : 0.25} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── CASE STUDY CLASS NODES (on table) ── */}
      {[
        { pos: [-3, 0.8, -1] as [number, number, number], color: '#3b82f6', label: 'Student' },
        { pos: [-3, 0.8, 1] as [number, number, number], color: '#10b981', label: 'Teacher' },
        { pos: [0, 0.8, -1.5] as [number, number, number], color: '#f59e0b', label: 'Course' },
        { pos: [0, 0.8, 1.5] as [number, number, number], color: '#8b5cf6', label: 'Department' },
        { pos: [3, 0.8, -1] as [number, number, number], color: '#ef4444', label: 'Enrollment' },
        { pos: [3, 0.8, 1] as [number, number, number], color: '#06b6d4', label: 'Notification' },
      ].map((node, i) => (
        <group key={i} position={node.pos}>
          <mesh castShadow>
            <boxGeometry args={[1.4, 0.55, 0.08]} />
            <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.15} transparent opacity={0.65} metalness={0.3} roughness={0.5} />
          </mesh>
          <mesh position={[0, 0, 0.06]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.8} />
          </mesh>
        </group>
      ))}

      {/* ── RELATIONSHIP LINES (on table) ── */}
      {/* Student → Enrollment → Course */}
      <mesh position={[1.5, 0.75, -1]} rotation={[0, 0, 0]}>
        <boxGeometry args={[4.5, 0.02, 0.02]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.25} transparent opacity={0.5} />
      </mesh>
      {/* Teacher → Course */}
      <mesh position={[1.5, 0.75, 0.25]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[3.2, 0.02, 0.02]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.25} transparent opacity={0.45} />
      </mesh>
      {/* Department → Teacher */}
      <mesh position={[-1.5, 0.75, 1]} rotation={[0, -0.2, 0]}>
        <boxGeometry args={[3, 0.02, 0.02]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.25} transparent opacity={0.45} />
      </mesh>
      {/* Department → Course */}
      <mesh position={[0, 0.75, 0.75]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[3, 0.02, 0.02]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.2} transparent opacity={0.35} />
      </mesh>

      {/* ── INHERITANCE TREE (left) ── */}
      <group position={[-5.5, 0, 0]}>
        <mesh position={[0, 1.2, 0]} castShadow>
          <boxGeometry args={[1.2, 0.4, 0.06]} />
          <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.15} transparent opacity={0.6} />
        </mesh>
        {[-0.8, 0.8].map((z, i) => (
          <group key={i}>
            <mesh position={[0, 0.7, z]} castShadow>
              <boxGeometry args={[1, 0.35, 0.06]} />
              <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.1} transparent opacity={0.5} />
            </mesh>
            <mesh position={[0, 0.95, z / 2]} rotation={[Math.PI / 2, 0, 0]}>
              <boxGeometry args={[0.02, Math.abs(z), 0.02]} />
              <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.2} transparent opacity={0.4} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── POLYMORPHISM AREA (right) ── */}
      <group position={[5.5, 0, 0]}>
        <mesh position={[0, 1.2, 0]} castShadow>
          <boxGeometry args={[1.4, 0.4, 0.06]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.15} transparent opacity={0.6} />
        </mesh>
        {[-0.7, 0, 0.7].map((z, i) => (
          <group key={i}>
            <mesh position={[0, 0.6, z]} castShadow>
              <boxGeometry args={[1, 0.3, 0.06]} />
              <meshStandardMaterial color={['#3b82f6', '#10b981', '#ef4444'][i]} transparent opacity={0.45} />
            </mesh>
            <mesh position={[0, 0.9, z / 2]} rotation={[Math.PI / 2, 0, 0]}>
              <boxGeometry args={[0.02, Math.abs(z), 0.02]} />
              <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.2} transparent opacity={0.4} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── COMPOSITION DIAMOND (front left) ── */}
      <group position={[-4, 0, 3.5]}>
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[0.18, 0.18, 0.04]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[0.7, 0.8, 0]}>
          <boxGeometry args={[1, 0.02, 0.02]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.3} transparent opacity={0.5} />
        </mesh>
      </group>

      {/* ── AGGREGATION HOLLOW DIAMOND (front right) ── */}
      <group position={[4, 0, 3.5]}>
        <mesh position={[0, 0.8, 0]} castShadow>
          <ringGeometry args={[0.08, 0.14, 4]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[-0.7, 0.8, 0]}>
          <boxGeometry args={[1, 0.02, 0.02]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.3} transparent opacity={0.5} />
        </mesh>
      </group>

      {/* ── REFACTORING FLOW (center back) ── */}
      <group position={[0, 0.6, -3]}>
        {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
          <group key={i}>
            <mesh position={[x, 0, 0]} castShadow>
              <boxGeometry args={[0.8, 0.4, 0.06]} />
              <meshStandardMaterial
                color={i < 2 ? '#ef4444' : '#10b981'}
                transparent
                opacity={0.4}
              />
            </mesh>
            {i < 3 && (
              <mesh position={[x + 0.5, 0, 0]}>
                <boxGeometry args={[0.2, 0.02, 0.02]} />
                <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.3} transparent opacity={0.5} />
              </mesh>
            )}
          </group>
        ))}
      </group>

      {/* ── CONCEPT LABEL ── */}
      <group position={[0, 3.8, 0]}>
        <mesh>
          <boxGeometry args={[6, 0.4, 0.05]} />
          <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.1} transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  );
}
