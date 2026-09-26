import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelLeftClose, PanelLeftOpen, History } from 'lucide-react';
import type { AssistantHistoryItem, AssistantContext } from '@/types/assistant';
import { AssistantHistory } from './AssistantHistory';
import { AssistantContextBar } from './AssistantContext';

interface AssistantShellProps {
  children: ReactNode;
  history: AssistantHistoryItem[];
  onSelectHistory: (item: AssistantHistoryItem) => void;
  onClearHistory: () => void;
  context?: AssistantContext;
}

export function AssistantShell({
  children,
  history,
  onSelectHistory,
  onClearHistory,
  context,
}: AssistantShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-full bg-[var(--color-bg-primary)]">
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="hidden md:flex flex-col border-r border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-border-primary)]">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-[var(--color-text-tertiary)]" />
                <span className="text-sm font-medium text-[var(--color-text-secondary)]">History</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-md hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)] transition-colors"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <AssistantHistory
                history={history}
                onSelect={onSelectHistory}
                onClear={onClearHistory}
              />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center gap-2 p-3 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)]">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="hidden md:flex p-1.5 rounded-md hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)] transition-colors"
            >
              <PanelLeftOpen className="w-4 h-4" />
            </button>
          )}
          {context && <AssistantContextBar context={context} />}
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
