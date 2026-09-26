import { useCallback, memo } from 'react';
import { Line } from '@react-three/drei';
import { ObjectInstance3D } from '@/three/objects/ObjectInstance3D';
import type { ObjectInstance } from '@/types/oopLab';

interface ObjectSpawnerProps {
  objects: ObjectInstance[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  hoveredId: string | null;
  activeProperty?: { objectId: string; propertyName: string } | null;
  activeMethod?: { methodName: string; objectId?: string } | null;
  changedProperty?: { objectId: string; propertyName: string; newValue: string } | null;
}

const BLUEPRINT_ORIGIN: [number, number, number] = [-2.8, 0.9, -1.8];

function ReferenceLines({ objects }: { objects: ObjectInstance[] }) {
  if (objects.length === 0) return null;
  return (
    <group>
      {objects.map((obj) => (
        <Line
          key={`ref-${obj.id}`}
          points={[BLUEPRINT_ORIGIN, obj.position]}
          color="#3b82f6"
          lineWidth={0.8}
          transparent
          opacity={0.12}
          dashed
          dashSize={0.15}
          gapSize={0.1}
        />
      ))}
    </group>
  );
}

function ObjectSpawnerInner({ objects, selectedId, onSelect, onHover, hoveredId, activeProperty, activeMethod, changedProperty }: ObjectSpawnerProps) {
  const handleSelect = useCallback(
    (id: string) => { onSelect(id); },
    [onSelect]
  );

  const handleHover = useCallback(
    (id: string | null) => { onHover(id); },
    [onHover]
  );

  return (
    <group>
      <ReferenceLines objects={objects} />
      {objects.map((obj) => (
        <ObjectInstance3D
          key={obj.id}
          obj={obj}
          isSelected={obj.id === selectedId}
          isHovered={obj.id === hoveredId}
          onSelect={handleSelect}
          onHover={handleHover}
          activeProperty={activeProperty?.objectId === obj.id ? activeProperty.propertyName : null}
          isMethodActive={activeMethod?.objectId === obj.id}
          hasStateChange={changedProperty?.objectId === obj.id}
        />
      ))}
    </group>
  );
}

export const ObjectSpawner = memo(ObjectSpawnerInner);
