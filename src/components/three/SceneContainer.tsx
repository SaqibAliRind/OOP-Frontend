import { Component, useRef, useEffect, useState, type ReactNode, type ErrorInfo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, ContactShadows, useCursor } from '@react-three/drei';
import { Vector3, Mesh } from 'three';
import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';
import { Button, Badge, LoadingState, ErrorState } from '@/components/ui';
import type { ThreeDSceneConfig, ThreeDObject, ThreeDAnnotation, ThreeDInteraction } from '@/types';

interface SceneContainerProps {
  config: ThreeDSceneConfig;
  className?: string;
  fallback?: ReactNode;
  onObjectClick?: (object: ThreeDObject) => void;
  onAnnotationClick?: (annotation: ThreeDAnnotation) => void;
}

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

interface SceneErrorState {
  error: Error | null;
}

class InnerSceneErrorBoundary extends Component<
  { fallback: ReactNode | ((error: Error) => ReactNode); onCaught?: (error: Error) => void; children?: ReactNode },
  SceneErrorState
> {
  state: SceneErrorState = { error: null };

  static getDerivedStateFromError(error: Error): SceneErrorState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('3D scene error:', error, info.componentStack);
    this.props.onCaught?.(error);
  }

  render(): ReactNode {
    const { error } = this.state;
    if (error) {
      const { fallback } = this.props;
      return <>{typeof fallback === 'function' ? (fallback as (e: Error) => ReactNode)(error) : fallback}</>;
    }
    return <>{this.props.children}</>;
  }
}

function ThreeDSceneInner({
  config,
  onObjectClick,
  onAnnotationClick,
}: Omit<SceneContainerProps, 'className' | 'fallback'>) {
  const [annotationsVisible, setAnnotationsVisible] = useState<Record<string, boolean>>({});
  const [quality] = useState<'low' | 'medium' | 'high' | 'ultra'>('medium');

  const interactionsByTrigger = new Map<string, ThreeDInteraction[]>();

  config.interactions.forEach(interaction => {
    if (!interactionsByTrigger.has(interaction.targetObjectId)) {
      interactionsByTrigger.set(interaction.targetObjectId, []);
    }
    interactionsByTrigger.get(interaction.targetObjectId)!.push(interaction);
  });

  return (
    <Canvas
      camera={{ position: [0, 3, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
      shadows={quality !== 'low'}
      className="w-full h-full"
    >

      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.5}
        castShadow={quality !== 'low'}
        shadow-mapSize-width={quality === 'ultra' ? 2048 : 1024}
        shadow-mapSize-height={quality === 'ultra' ? 2048 : 1024}
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />

      <ContactShadows opacity={0.3} scale={10} blur={quality === 'low' ? 2 : 4} />

      {config.objects.map(obj => (
        <SceneObject
          key={obj.id}
          object={obj}
          interactions={interactionsByTrigger.get(obj.id) || []}
          onClick={onObjectClick}
          quality={quality}
        />
      ))}

      {config.annotations.map(annotation => (
        <AnnotationMarker
          key={annotation.id}
          annotation={annotation}
          visible={annotationsVisible[annotation.id]}
          onClick={onAnnotationClick}
          onToggle={() => setAnnotationsVisible(prev => ({ ...prev, [annotation.id]: !prev[annotation.id] }))}
        />
      ))}

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={50}
        autoRotate={false}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}

function SceneObject({
  object,
  interactions,
  onClick,
  quality,
}: {
  object: ThreeDObject;
  interactions: ThreeDInteraction[];
  onClick?: (object: ThreeDObject) => void;
  quality: 'low' | 'medium' | 'high' | 'ultra';
}) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useCursor(hovered && !!object.interactive);

  useFrame((_state, delta) => {
    if (meshRef.current && object.metadata?.rotate) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.(object);

    interactions.forEach(interaction => {
      if (interaction.type === 'click') {
        handleInteraction(interaction);
      }
    });
  };

  const handleInteraction = (interaction: ThreeDInteraction) => {
    console.log('Interaction triggered:', interaction.action, interaction.parameters);
  };

  if (!object.visible) return null;

  const materialProps = getMaterialProps(object.material, quality);

  return (
    <group position={object.position} rotation={object.rotation} scale={object.scale}>
      <mesh
        ref={meshRef}
        {...materialProps}
        castShadow={quality !== 'low' && object.type === 'mesh'}
        receiveShadow={quality !== 'low'}
        onClick={handleClick}
        onPointerOver={() => {
          setHovered(true);
          interactions.forEach(i => { if (i.type === 'hover') handleInteraction(i); });
        }}
        onPointerOut={() => setHovered(false)}
      >
        {object.geometry === 'box' && <boxGeometry args={[1, 1, 1]} />}
        {object.geometry === 'sphere' && <sphereGeometry args={[1, 32, 32]} />}
        {object.geometry === 'cylinder' && <cylinderGeometry args={[1, 1, 2, 32]} />}
        {object.geometry === 'cone' && <coneGeometry args={[1, 2, 32]} />}
        {object.geometry === 'octahedron' && <octahedronGeometry args={[1, 32]} />}
        {object.geometry === 'torus' && <torusGeometry args={[1, 0.4, 16, 32]} />}
        {object.geometry === 'plane' && <planeGeometry args={[10, 10]} />}
      </mesh>

      {hovered && object.interactive && (
        <mesh scale={1.05}>
          {object.geometry === 'box' && <boxGeometry args={[1, 1, 1]} />}
          {object.geometry === 'sphere' && <sphereGeometry args={[1, 32, 32]} />}
          {object.geometry === 'cylinder' && <cylinderGeometry args={[1, 1, 2, 32]} />}
          {object.geometry === 'cone' && <coneGeometry args={[1, 2, 32]} />}
          {object.geometry === 'octahedron' && <octahedronGeometry args={[1, 32]} />}
          {object.geometry === 'torus' && <torusGeometry args={[1, 0.4, 16, 32]} />}
          {object.geometry === 'plane' && <planeGeometry args={[10, 10]} />}
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.2} wireframe />
        </mesh>
      )}
    </group>
  );
}

function getMaterialProps(material?: Record<string, unknown>, _quality: 'low' | 'medium' | 'high' | 'ultra' = 'medium') {
  return {
    ...material,
    metalness: material?.metalness ?? 0.3,
    roughness: material?.roughness ?? 0.4,
  };
}

function AnnotationMarker({
  annotation,
  visible,
  onClick,
  onToggle,
}: {
  annotation: ThreeDAnnotation;
  visible: boolean;
  onClick?: (annotation: ThreeDAnnotation) => void;
  onToggle: () => void;
}) {
  const { camera } = useThree();
  const [screenPosition, setScreenPosition] = useState({ x: 0, y: 0 });
  const [showContent] = useState(false);

  useFrame(() => {
    const vector = new Vector3(...annotation.position).project(camera);
    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;
    setScreenPosition({ x, y });
  });

  if (!visible) return null;

  return (
    <Html
      transform
      position={annotation.position}
      style={{ pointerEvents: 'none' }}
      className="transition-opacity duration-200"
    >
      <div
        className={cn(
          'absolute transform -translate-x-1/2 -translate-y-1/2',
          'cursor-pointer select-none'
        )}
        style={{ left: screenPosition.x, top: screenPosition.y }}
        onClick={e => { e.stopPropagation(); onClick?.(annotation); onToggle(); }}
      >
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center shadow-lg',
            'transition-all hover:scale-110',
            getAnnotationColor(annotation.type)
          )}
          aria-label={annotation.title}
        >
          {getAnnotationIcon(annotation.type)}
        </motion.button>

        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72"
          >
            <div className={cn(
              'bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-lg p-3 shadow-[var(--shadow-lg)]',
              getAnnotationColor(annotation.type).replace('bg-', 'border-')
            )}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-semibold text-[var(--color-text-primary)]">{annotation.title}</h4>
                <button onClick={onToggle} className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]">×</button>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)]">{annotation.content}</p>
            </div>
          </motion.div>
        )}
      </div>
    </Html>
  );
}

function getAnnotationColor(type: string) {
  const colors = {
    info: 'bg-[var(--color-accent-info)]',
    concept: 'bg-[var(--color-accent-primary)]',
    code: 'bg-[var(--color-accent-secondary)]',
    warning: 'bg-[var(--color-accent-warning)]',
    tip: 'bg-[var(--color-accent-success)]',
  };
  return colors[type as keyof typeof colors] || colors.info;
}

function getAnnotationIcon(type: string) {
  const icons = {
    info: 'ℹ️',
    concept: '💡',
    code: '📝',
    warning: '⚠️',
    tip: '💡',
  };
  return icons[type as keyof typeof icons] || icons.info;
}

export function SceneContainer({
  config,
  className,
  onObjectClick,
  onAnnotationClick,
}: SceneContainerProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [webglOk] = useState(() => detectWebGL());

  if (!webglOk) {
    return (
      <div className={cn('relative w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden bg-[var(--color-bg-input)] flex items-center justify-center p-4', className)}>
        <ErrorState
          title="WebGL not available"
          message="3D scenes need WebGL. Enable hardware acceleration or try another browser."
        />
      </div>
    );
  }

  return (
    <div className={cn('relative w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden bg-[var(--color-bg-input)]', className)}>
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <LoadingState size="lg" text="Loading 3D scene..." />
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-10 p-4">
          <ErrorState
            title="Failed to load 3D scene"
            message={error.message}
            onRetry={() => { setError(null); setLoaded(false); }}
          />
        </div>
      )}

      <InnerSceneErrorBoundary
        onCaught={(err) => { setError(err); setLoaded(true); }}
        fallback={(err) => {
          return (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <ErrorState
                title="3D Scene Error"
                message={err.message}
                onRetry={() => { setError(null); setLoaded(false); }}
              />
            </div>
          );
        }}
      >
        <CanvasReady onReady={() => setLoaded(true)}>
          <ThreeDSceneInner
            config={config}
            onObjectClick={onObjectClick}
            onAnnotationClick={onAnnotationClick}
          />
        </CanvasReady>
      </InnerSceneErrorBoundary>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2">
          <Badge variant="outline" size="sm">{config.sceneType}</Badge>
          <Badge variant="outline" size="sm">Quality: {config.qualityPreset}</Badge>
        </div>
        <div className="pointer-events-auto flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-[var(--color-text-secondary)]">Reset View</Button>
        </div>
      </div>
    </div>
  );
}

function CanvasReady({ onReady, children }: { onReady: () => void; children: ReactNode }) {
  useEffect(() => {
    onReady();
  }, [onReady]);
  return <>{children}</>;
}

export function SceneLoader({ sceneId }: { sceneId: string }) {
  const [Scene, setScene] = useState<React.ComponentType<{ config: ThreeDSceneConfig }> | null>(null);
  const [config, setConfig] = useState<ThreeDSceneConfig | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    import('@/data/threeDScenes').then(module => {
      if (cancelled) return;
      const sceneConfig = module.getThreeDSceneConfig(sceneId);
      if (sceneConfig) {
        setConfig(sceneConfig);
        setScene(SceneContainer);
      } else {
        setFailed(true);
      }
    }).catch(() => {
      if (!cancelled) setFailed(true);
    });
    return () => { cancelled = true; };
  }, [sceneId]);

  if (failed) {
    return <ErrorState title="Scene not found" message={`No scene config for id: ${sceneId}`} />;
  }

  if (!config || !Scene) {
    return <LoadingState size="lg" text="Loading scene..." />;
  }

  return <Scene config={config} />;
}

export class SceneErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  SceneErrorState
> {
  state: SceneErrorState = { error: null };

  static getDerivedStateFromError(error: Error): SceneErrorState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('SceneErrorBoundary:', error, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.error) {
      return this.props.fallback || (
        <ErrorState
          title="3D Scene Error"
          message={this.state.error.message}
          onRetry={() => this.setState({ error: null })}
        />
      );
    }
    return <>{this.props.children}</>;
  }
}