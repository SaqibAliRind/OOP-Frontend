import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import type { ConceptNode } from '@/types/knowledge';
import { knowledgeNodes, knowledgeConnections } from '@/data/assistant/knowledgeData';
import { KnowledgeExplorer } from '@/components/knowledge/KnowledgeExplorer';
import { KnowledgeDetail } from '@/components/knowledge/KnowledgeDetail';
import { Badge, Input } from '@/components/ui';

export function KnowledgePage() {
  const [selectedNode, setSelectedNode] = useState<ConceptNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNodes = useMemo(() => {
    if (!searchQuery.trim()) return knowledgeNodes;
    const q = searchQuery.toLowerCase();
    return knowledgeNodes.filter(n =>
      n.title.toLowerCase().includes(q) ||
      n.description.toLowerCase().includes(q) ||
      n.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Badge variant="primary" size="md" className="mb-3">Knowledge Graph</Badge>
        <h1 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">
          OOP KNOWLEDGE GRAPH
        </h1>
        <p className="text-[var(--color-text-secondary)] mt-1">
          Explore how Java OOP concepts connect. {knowledgeNodes.length} concepts across 12 categories.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-tertiary)]" />
          <Input
            placeholder="Search concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex gap-6">
        {/* Explorer */}
        <div className="flex-1 min-w-0">
          <KnowledgeExplorer
            nodes={filteredNodes}
            connections={knowledgeConnections}
            onSelectNode={setSelectedNode}
            selectedNodeId={selectedNode?.id || null}
          />
        </div>

        {/* Detail Panel - Desktop */}
        <AnimatePresence mode="wait">
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.3 }}
              className="hidden lg:block w-96 flex-shrink-0"
            >
              <KnowledgeDetail
                node={selectedNode}
                connections={knowledgeConnections}
                allNodes={knowledgeNodes}
                onClose={() => setSelectedNode(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Detail Overlay */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedNode(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto bg-[var(--color-bg-card)] rounded-t-2xl border-t border-[var(--color-border-primary)]"
              onClick={(e) => e.stopPropagation()}
            >
              <KnowledgeDetail
                node={selectedNode}
                connections={knowledgeConnections}
                allNodes={knowledgeNodes}
                onClose={() => setSelectedNode(null)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
