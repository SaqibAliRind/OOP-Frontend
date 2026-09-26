import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Eye, Bug, FileText } from 'lucide-react';
import { Input, Tabs } from '@/components/ui';
import { cn } from '@/utils/helpers';
import { categoryLabels, categoryColors } from '@/data/assistant/knowledgeData';
import type { ConceptNode, ConceptConnection, ConceptCategory } from '@/types/knowledge';

interface KnowledgeExplorerProps {
  nodes: ConceptNode[];
  connections: ConceptConnection[];
  onSelectNode: (node: ConceptNode) => void;
  selectedNodeId: string | null;
}

const allCategories: (ConceptCategory | 'all')[] = [
  'all',
  'foundation',
  'constructors',
  'encapsulation',
  'inheritance',
  'polymorphism',
  'abstraction',
  'interfaces',
  'java-features',
  'exceptions',
  'collections',
  'relationships',
  'design',
];

export function KnowledgeExplorer({
  nodes,
  connections,
  onSelectNode,
  selectedNodeId,
}: KnowledgeExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<ConceptCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNodes = useMemo(() => {
    let result = nodes;
    if (activeCategory !== 'all') {
      result = result.filter((n) => n.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.description.toLowerCase().includes(q) ||
          n.id.toLowerCase().includes(q)
      );
    }
    return result;
  }, [nodes, activeCategory, searchQuery]);

  const groupedNodes = useMemo(() => {
    const groups: Record<string, ConceptNode[]> = {};
    for (const node of filteredNodes) {
      if (!groups[node.category]) groups[node.category] = [];
      groups[node.category].push(node);
    }
    return groups;
  }, [filteredNodes]);

  const tabs = allCategories.map((cat) => ({
    id: cat,
    label: cat === 'all' ? 'All' : categoryLabels[cat as ConceptCategory] ?? cat,
    badge: cat === 'all'
      ? nodes.length
      : nodes.filter((n) => n.category === cat).length,
  }));

  const getPrerequisiteCount = (node: ConceptNode) =>
    connections.filter((c) => c.to === node.id && c.type === 'prerequisite').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
            Knowledge Explorer
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Browse {nodes.length} OOP concepts across {allCategories.length - 1} categories
          </p>
        </div>
        <div className="w-80">
          <Input
            placeholder="Search concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      <Tabs
        tabs={tabs}
        variant="pills"
        onChange={(id) => setActiveCategory(id as ConceptCategory | 'all')}
      >
        {(tabId) => {
          const cats = tabId === 'all' ? Object.keys(groupedNodes) : [tabId];
          return (
            <div className="space-y-8">
              {cats.map((category) => {
                const catNodes = groupedNodes[category];
                if (!catNodes || catNodes.length === 0) return null;
                const color = categoryColors[category as ConceptCategory] ?? '#94a3b8';
                return (
                  <div key={category}>
                    <div className="flex items-center gap-2 mb-4">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                        {categoryLabels[category as ConceptCategory] ?? category}
                      </h3>
                      <span className="text-xs text-[var(--color-text-tertiary)]">
                        ({catNodes.length})
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      <AnimatePresence mode="popLayout">
                        {catNodes.map((node, i) => (
                          <motion.div
                            key={node.id}
                            layout
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2, delay: i * 0.02 }}
                          >
                            <KnowledgeNodeCard
                              node={node}
                              color={color}
                              prerequisiteCount={getPrerequisiteCount(node)}
                              isSelected={selectedNodeId === node.id}
                              onSelect={() => onSelectNode(node)}
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
              {cats.every((c) => !groupedNodes[c] || groupedNodes[c].length === 0) && (
                <div className="text-center py-12 text-[var(--color-text-tertiary)]">
                  No concepts found matching "{searchQuery || activeCategory}"
                </div>
              )}
            </div>
          );
        }}
      </Tabs>
    </div>
  );
}

function KnowledgeNodeCard({
  node,
  color,
  prerequisiteCount,
  isSelected,
  onSelect,
}: {
  node: ConceptNode;
  color: string;
  prerequisiteCount: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const activityIcons: { available: boolean; icon: React.ReactNode; label: string }[] = [
    { available: !!node.practiceAvailable, icon: <FileText className="w-3 h-3" />, label: 'Practice' },
    { available: !!node.visualizationAvailable, icon: <Eye className="w-3 h-3" />, label: 'Visualize' },
    { available: !!node.debuggingAvailable, icon: <Bug className="w-3 h-3" />, label: 'Debug' },
    { available: !!node.examAvailable, icon: <BookOpen className="w-3 h-3" />, label: 'Exam' },
  ];

  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full text-left rounded-xl border transition-all duration-200 group',
        'bg-[var(--color-bg-card)] hover:shadow-lg hover:-translate-y-0.5',
        isSelected
          ? 'border-2 shadow-lg ring-1 ring-opacity-20'
          : 'border-[var(--color-border-primary)] hover:border-[var(--color-border-secondary)]'
      )}
      style={isSelected ? { borderColor: color, boxShadow: `0 0 20px ${color}15` } : undefined}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="text-sm font-semibold text-[var(--color-text-primary)] leading-tight line-clamp-1 group-hover:text-[var(--color-text-primary)]">
            {node.title}
          </h4>
          <div
            className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
            style={{ backgroundColor: color }}
          />
        </div>

        <span
          className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full mb-2 border"
          style={{
            backgroundColor: `${color}15`,
            color: color,
            borderColor: `${color}30`,
          }}
        >
          {categoryLabels[node.category]}
        </span>

        <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 mb-3 leading-relaxed">
          {node.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {activityIcons
              .filter((a) => a.available)
              .map((a, i) => (
                <div
                  key={i}
                  className="p-1 rounded bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)]"
                  title={a.label}
                >
                  {a.icon}
                </div>
              ))}
          </div>

          {prerequisiteCount > 0 && (
            <span className="text-[10px] text-[var(--color-text-tertiary)]">
              {prerequisiteCount} prereq{prerequisiteCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
