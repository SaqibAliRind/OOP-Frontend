import { BookOpen, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import type { AssistantContext } from '@/types/assistant';

interface AssistantContextBarProps {
  context: AssistantContext;
}

const contextTypeLabels: Record<string, string> = {
  general: 'General',
  lesson: 'Lesson',
  module: 'Module',
  practice: 'Practice',
  debug: 'Debug',
  '3d': '3D View',
};

const contextTypeColors: Record<string, string> = {
  general: 'default',
  lesson: 'primary',
  module: 'secondary',
  practice: 'success',
  debug: 'warning',
  '3d': 'xp',
};

export function AssistantContextBar({ context }: AssistantContextBarProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Badge
        variant={contextTypeColors[context.type] || 'default'}
        size="sm"
        dot
      >
        {contextTypeLabels[context.type] || context.type}
      </Badge>

      {context.moduleTitle && (
        <div className="flex items-center gap-1 text-[10px] text-[var(--color-text-tertiary)]">
          <Layers className="w-3 h-3" />
          <span>{context.moduleTitle}</span>
        </div>
      )}

      {context.lessonTitle && (
        <div className="flex items-center gap-1 text-[10px] text-[var(--color-text-tertiary)]">
          <BookOpen className="w-3 h-3" />
          <span>{context.lessonTitle}</span>
        </div>
      )}
    </div>
  );
}
