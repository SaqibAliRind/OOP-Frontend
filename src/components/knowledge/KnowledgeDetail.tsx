import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  BookOpen,
  Eye,
  Bug,
  FileText,
  MessageSquare,
  ExternalLink,
  ChevronRight,
  Target,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui';
import { categoryLabels, categoryColors } from '@/data/assistant/knowledgeData';
import { masteryService } from '@/services/masteryService';
import { curriculumService } from '@/services/curriculumService';
import type { ConceptNode, ConceptConnection } from '@/types/knowledge';

interface KnowledgeDetailProps {
  node: ConceptNode;
  connections: ConceptConnection[];
  allNodes: ConceptNode[];
  onClose: () => void;
}

export function KnowledgeDetail({
  node,
  connections,
  allNodes,
  onClose,
}: KnowledgeDetailProps) {
  const [masteryScore, setMasteryScore] = useState(0);

  useEffect(() => {
    const mastery = masteryService.getConceptMastery(node.id);
    setMasteryScore(mastery.score);
  }, [node.id]);

  const color = categoryColors[node.category] ?? '#94a3b8';

  const prerequisites = connections
    .filter((c) => c.to === node.id && c.type === 'prerequisite')
    .map((c) => allNodes.find((n) => n.id === c.from))
    .filter(Boolean) as ConceptNode[];

  const related = connections
    .filter(
      (c) =>
        (c.from === node.id || c.to === node.id) &&
        (c.type === 'related' || c.type === 'builds-on' || c.type === 'contrasts-with')
    )
    .map((c) => {
      const id = c.from === node.id ? c.to : c.from;
      return { node: allNodes.find((n) => n.id === id), connection: c };
    })
    .filter((r) => r.node) as { node: ConceptNode; connection: ConceptConnection }[];

  const firstValidLessonId = node.lessonIds.find((id) => curriculumService.getLesson(id) !== null);
  const learningActions = [
    {
      label: 'Learn',
      icon: <BookOpen className="w-4 h-4" />,
      href: firstValidLessonId ? `/lesson/${firstValidLessonId}` : '/curriculum',
      variant: 'primary' as const,
    },
    {
      label: 'Practice',
      icon: <FileText className="w-4 h-4" />,
      href: `/practice?concept=${node.id}`,
      variant: 'outline' as const,
      disabled: !node.practiceAvailable,
    },
    {
      label: 'Visualize',
      icon: <Eye className="w-4 h-4" />,
      href: `/3d?concept=${node.id}`,
      variant: 'outline' as const,
      disabled: !node.visualizationAvailable,
    },
    {
      label: 'Debug',
      icon: <Bug className="w-4 h-4" />,
      href: `/debug?concept=${node.id}`,
      variant: 'outline' as const,
      disabled: !node.debuggingAvailable,
    },
    {
      label: 'Test',
      icon: <Target className="w-4 h-4" />,
      href: `/quiz?concept=${node.id}`,
      variant: 'outline' as const,
      disabled: !node.examAvailable,
    },
    {
      label: 'Ask Assistant',
      icon: <MessageSquare className="w-4 h-4" />,
      href: `/assistant?context=${node.id}`,
      variant: 'ghost' as const,
    },
  ];

  const getMasteryColor = (score: number) => {
    if (score >= 90) return '#10b981';
    if (score >= 70) return '#3b82f6';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const getMasteryLabel = (score: number) => {
    if (score >= 90) return 'Mastered';
    if (score >= 70) return 'Proficient';
    if (score >= 50) return 'Learning';
    return 'Beginner';
  };

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed top-0 right-0 bottom-0 w-full max-w-lg z-[var(--z-modal)] flex flex-col bg-[var(--color-bg-card)] border-l border-[var(--color-border-primary)] shadow-2xl"
    >
      <div className="flex items-start justify-between p-5 border-b border-[var(--color-border-primary)]">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            <span
              className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border"
              style={{
                backgroundColor: `${color}15`,
                color: color,
                borderColor: `${color}30`,
              }}
            >
              {categoryLabels[node.category]}
            </span>
          </div>
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] mt-2">
            {node.title}
          </h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close detail panel"
          className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] flex-shrink-0"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <div>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            {node.description}
          </p>
        </div>

        {node.romanUrdu && (
          <div className="p-3 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)]">
            <p className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider mb-1">
              Roman Urdu
            </p>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {node.romanUrdu}
            </p>
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-[var(--color-text-tertiary)]">
                Mastery
              </span>
              <span
                className="text-xs font-semibold"
                style={{ color: getMasteryColor(masteryScore) }}
              >
                {getMasteryLabel(masteryScore)} ({masteryScore}%)
              </span>
            </div>
            <div className="h-1.5 bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${masteryScore}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-full rounded-full"
                style={{ backgroundColor: getMasteryColor(masteryScore) }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
            Learning Actions
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {learningActions.map((action) => (
              <Button
                key={action.label}
                variant={action.variant}
                size="sm"
                disabled={action.disabled}
                leftIcon={action.icon}
                asChild={!action.disabled}
                className="justify-start"
              >
                {action.disabled ? (
                  <span>{action.label}</span>
                ) : (
                  <a href={action.href}>
                    {action.label}
                    <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                  </a>
                )}
              </Button>
            ))}
          </div>
        </div>

        {prerequisites.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
              Prerequisites
            </h3>
            <div className="space-y-1.5">
              {prerequisites.map((p) => {
                const pColor = categoryColors[p.category] ?? '#94a3b8';
                return (
                  <a
                    key={p.id}
                    href={`#concept-${p.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      // Parent can handle navigation
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors group"
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: pColor }}
                    />
                    <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
                      {p.title}
                    </span>
                    <ChevronRight className="w-3 h-3 text-[var(--color-text-tertiary)] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
              Related Concepts
            </h3>
            <div className="space-y-1.5">
              {related.map((r) => {
                const rColor = categoryColors[r.node.category] ?? '#94a3b8';
                const typeLabel =
                  r.connection.type === 'builds-on'
                    ? 'builds on'
                    : r.connection.type === 'contrasts-with'
                    ? 'vs'
                    : 'related';
                return (
                  <a
                    key={r.node.id}
                    href={`#concept-${r.node.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors group"
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: rColor }}
                    />
                    <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
                      {r.node.title}
                    </span>
                    <span className="text-[10px] text-[var(--color-text-tertiary)] ml-auto flex-shrink-0">
                      {typeLabel}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {node.lessonIds.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
              Lessons
            </h3>
            <div className="space-y-1">
              {node.lessonIds.map((id) => {
                const lessonExists = curriculumService.getLesson(id) !== null;
                if (!lessonExists) return null;
                return (
                  <a
                    key={id}
                    href={`/lesson/${id}`}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  >
                    <Zap className="w-3.5 h-3.5 text-[var(--color-text-tertiary)]" />
                    <span>{curriculumService.getLesson(id)?.title || id}</span>
                    <ChevronRight className="w-3 h-3 ml-auto text-[var(--color-text-tertiary)]" />
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
