import { useCallback, Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { RelationshipNode3D } from './RelationshipNode3D';
import { RelationshipEdge3D } from './RelationshipEdge3D';
import type { RelationshipNode, RelationshipEdge } from '@/types/relationshipLab';

interface RelationshipScene3DProps {
  nodes: RelationshipNode[];
  edges: RelationshipEdge[];
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  onSelectNode: (id: string) => void;
  onSelectEdge: (id: string) => void;
  onHoverNode: (id: string | null) => void;
  onHoverEdge: (id: string | null) => void;
  detachedEdgeIds: string[];
}

function SceneContent({
  nodes,
  edges,
  selectedNodeId,
  selectedEdgeId,
  onSelectNode,
  onSelectEdge,
  onHoverNode,
  onHoverEdge,
  detachedEdgeIds,
}: RelationshipScene3DProps) {
  const nodePosMap = useMemo(() => {
    const map: Record<string, [number, number, number]> = {};
    nodes.forEach((n) => { map[n.id] = n.position; });
    return map;
  }, [nodes]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-3, 5, -3]} intensity={0.3} color="#6366f1" />
      <pointLight position={[0, 3, 0]} intensity={0.4} color="#3b82f6" distance={8} />

      {/* Floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0a0f1a" metalness={0.15} roughness={0.9} />
      </mesh>
      <gridHelper args={[20, 40, '#1e293b', '#141c2e']} position={[0, -0.49, 0]} />

      {/* Nodes */}
      {nodes.map((node) => (
        <RelationshipNode3D
          key={node.id}
          id={node.id}
          label={node.label}
          className_={node.className}
          position={node.position}
          color={node.color}
          isSelected={selectedNodeId === node.id}
          isHovered={false}
          properties={node.properties}
          onSelect={onSelectNode}
          onHover={onHoverNode}
        />
      ))}

      {/* Edges */}
      {edges.map((edge) => {
        const sourcePos = nodePosMap[edge.sourceId];
        const targetPos = nodePosMap[edge.targetId];
        if (!sourcePos || !targetPos) return null;
        return (
          <RelationshipEdge3D
            key={edge.id}
            edge={edge}
            sourcePos={sourcePos}
            targetPos={targetPos}
            isSelected={selectedEdgeId === edge.id}
            isHovered={false}
            onSelect={onSelectEdge}
            onHover={onHoverEdge}
            detached={detachedEdgeIds.includes(edge.id)}
          />
        );
      })}

      {/* Camera controls */}
      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={3}
        maxDistance={15}
        maxPolarAngle={Math.PI / 2.2}
        target={[0, 0.5, 0]}
      />

    </>
  );
}

export function RelationshipScene3D(props: RelationshipScene3DProps) {
  const handlePointerMissed = useCallback(() => {
    props.onSelectNode('');
    props.onSelectEdge('');
  }, [props]);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 4, 8], fov: 50 }}
      onPointerMissed={handlePointerMissed}
      gl={{ antialias: true }}
      style={{ background: '#0a0f1a' }}
    >
      <Suspense fallback={null}>
        <SceneContent {...props} />
      </Suspense>
    </Canvas>
  );
}
