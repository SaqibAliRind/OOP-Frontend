import { useRef, memo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Group } from 'three';
import type { ClassBlueprint } from '@/types/oopLab';

interface ClassBlueprint3DProps {
  blueprint: ClassBlueprint;
  visible: boolean;
  language: 'english' | 'romanUrdu';
  isMethodActive?: string | null;
  onBlueprintClick?: () => void;
}

function AccessModifierIcon({ modifier }: { modifier: string }) {
  if (modifier === 'private') {
    return <span style={{ color: '#ef4444', marginRight: 6, fontSize: 14 }}>-</span>;
  }
  if (modifier === 'protected') {
    return <span style={{ color: '#f59e0b', marginRight: 6, fontSize: 14 }}>#</span>;
  }
  return <span style={{ color: '#10b981', marginRight: 6, fontSize: 14 }}>+</span>;
}

function HolographicHUD({ blueprint, isMethodActive }: { blueprint: ClassBlueprint; language: 'english' | 'romanUrdu'; isMethodActive?: string | null }) {
  return (
    <div
      style={{
        width: 1100,
        height: 500,
        padding: '30px',
        fontFamily: "'Inter', 'JetBrains Mono', sans-serif",
        color: '#e2e8f0',
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(15, 23, 42, 0.4) 100%)',
        border: '2px solid rgba(6, 182, 212, 0.6)',
        borderRadius: 16,
        backdropFilter: 'blur(16px)',
        pointerEvents: 'none',
        userSelect: 'none',
        boxShadow: '0 0 40px rgba(6, 182, 212, 0.3), inset 0 0 20px rgba(6, 182, 212, 0.2)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{
        position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
        background: '#0f172a', padding: '0 20px', color: '#06b6d4', fontSize: 24, fontWeight: 800, letterSpacing: '0.15em',
        border: '2px solid rgba(6, 182, 212, 0.6)', borderRadius: 20, boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)'
      }}>
        CLASS BLUEPRINT
      </div>

      <div style={{ display: 'flex', gap: '40px', marginTop: '20px', height: '100%' }}>
        {/* Left Column: UML Diagram */}
        <div style={{ flex: '1', border: '1px solid rgba(59, 130, 246, 0.4)', borderRadius: 12, padding: '20px', background: 'rgba(15, 23, 42, 0.6)' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#60a5fa', marginBottom: 15, borderBottom: '1px solid rgba(59, 130, 246, 0.3)', paddingBottom: 10 }}>
            {blueprint.name}
          </div>
          
          <div style={{ marginBottom: 20 }}>
            {blueprint.properties.map((prop, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', fontSize: 16, padding: '4px 0', color: '#cbd5e1', fontFamily: "'JetBrains Mono', monospace" }}>
                <AccessModifierIcon modifier={prop.accessModifier} />
                <span style={{ color: '#e2e8f0' }}>{prop.name}</span>
                <span style={{ color: '#64748b', margin: '0 8px' }}>:</span>
                <span style={{ color: '#94a3b8' }}>{prop.type}</span>
              </div>
            ))}
          </div>
          
          <div style={{ borderTop: '1px solid rgba(59, 130, 246, 0.3)', paddingTop: 15 }}>
            {blueprint.methods.map((method, i) => {
              const isActive = isMethodActive === method.name;
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', fontSize: 16, padding: '6px 8px', margin: '2px 0',
                  color: isActive ? '#fff' : '#cbd5e1',
                  background: isActive ? 'rgba(59, 130, 246, 0.3)' : 'transparent',
                  borderRadius: 6,
                  fontFamily: "'JetBrains Mono', monospace",
                  transition: 'all 0.3s ease',
                  boxShadow: isActive ? '0 0 10px rgba(59, 130, 246, 0.5)' : 'none',
                }}>
                  <AccessModifierIcon modifier={method.accessModifier} />
                  <span>{method.name}</span>
                  <span style={{ color: '#64748b' }}>({method.parameters.map(p => `${p.name}: ${p.type}`).join(', ')})</span>
                  <span style={{ color: '#64748b', margin: '0 8px' }}>:</span>
                  <span style={{ color: '#94a3b8' }}>{method.returnType}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Middle Column: Code */}
        <div style={{ flex: '1.2', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: 12, padding: '20px', background: 'rgba(10, 15, 26, 0.8)', fontFamily: "'JetBrains Mono', monospace", fontSize: 15, lineHeight: '1.6', overflow: 'hidden' }}>
          <div style={{ color: '#c678dd' }}>class <span style={{ color: '#e5c07b' }}>{blueprint.name}</span> {'{'}</div>
          <div style={{ paddingLeft: 20, color: '#98c379', marginTop: 10 }}>
            {blueprint.properties.map((p, i) => <div key={i}>{p.accessModifier} {p.type} {p.name};</div>)}
          </div>
          <div style={{ paddingLeft: 20, marginTop: 20 }}>
            {blueprint.methods.map((m, i) => (
              <div key={i} style={{ marginBottom: 15 }}>
                <div style={{ color: '#61afef' }}>{m.accessModifier} <span style={{ color: '#c678dd' }}>{m.returnType}</span> <span style={{ color: '#e5c07b' }}>{m.name}</span>({m.parameters.map(p => `${p.type} ${p.name}`).join(', ')}) {'{'}</div>
                {m.name === 'study' ? (
                  <div style={{ paddingLeft: 20, color: '#abb2bf' }}>System.out.println(name + " is studying...");</div>
                ) : m.name === 'setInfo' ? (
                  <div style={{ paddingLeft: 20, color: '#abb2bf' }}>this.name = name;<br/>this.age = age;</div>
                ) : (
                  <div style={{ paddingLeft: 20, color: '#5c6370' }}>// implementation</div>
                )}
                <div style={{ color: '#61afef' }}>{'}'}</div>
              </div>
            ))}
          </div>
          <div style={{ color: '#c678dd' }}>{'}'}</div>
        </div>

        {/* Right Column: Inheritance */}
        <div style={{ flex: '0.6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: 12, padding: '20px', background: 'rgba(15, 23, 42, 0.6)' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#a78bfa', letterSpacing: '0.1em', marginBottom: 30 }}>INHERITANCE</div>
          
          <div style={{ padding: '12px 30px', border: '2px solid #8b5cf6', borderRadius: 8, color: '#ddd6fe', fontSize: 20, fontWeight: 600, boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)' }}>
            Person
          </div>
          
          <div style={{ height: 40, width: 2, background: '#8b5cf6', margin: '10px 0', position: 'relative' }}>
            <div style={{ position: 'absolute', bottom: -5, left: -6, width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderBottom: '10px solid #8b5cf6' }}></div>
          </div>
          
          <div style={{ padding: '12px 30px', border: '2px solid #3b82f6', borderRadius: 8, color: '#bfdbfe', fontSize: 20, fontWeight: 600, boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)' }}>
            Student
          </div>
        </div>
      </div>
    </div>
  );
}

function ClassBlueprint3DInner({ blueprint, visible, language, isMethodActive, onBlueprintClick }: ClassBlueprint3DProps) {
  const groupRef = useRef<Group>(null);
  const targetScale = visible ? 0.45 : 0;
  const currentScale = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    currentScale.current += (targetScale - currentScale.current) * Math.min(delta * 4, 1);
    const s = Math.max(currentScale.current, 0.001);
    groupRef.current.scale.set(s, s, s);
    groupRef.current.visible = currentScale.current > 0.01;
    // Subtle floating animation
    groupRef.current.position.y = 1.8 + Math.sin(Date.now() * 0.001) * 0.05;
  });

  const handleClick = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    onBlueprintClick?.();
  }, [onBlueprintClick]);

  return (
    // Positioned centered in the background, scaled down to prevent overlap
    <group ref={groupRef} position={[0, 1.8, -3.5]} scale={0.45}>
      {/* Invisible mesh for click detection */}
      <mesh
        onPointerDown={handleClick}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'default'; }}
      >
        <planeGeometry args={[7, 3]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      <Html
        transform
        position={[0, 0, 0]}
        style={{ pointerEvents: 'none' }}
        distanceFactor={6}
        occlude={false}
      >
        <HolographicHUD blueprint={blueprint} language={language} isMethodActive={isMethodActive} />
      </Html>
    </group>
  );
}

export const ClassBlueprint3D = memo(ClassBlueprint3DInner);
