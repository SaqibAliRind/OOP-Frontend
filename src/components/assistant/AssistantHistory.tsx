import { motion } from 'framer-motion';
import { Trash2, MessageCircle } from 'lucide-react';
import { formatRelativeTime } from '@/utils/helpers';
import { Button } from '@/components/ui/Button';
import type { AssistantHistoryItem } from '@/types/assistant';

interface AssistantHistoryProps {
  history: AssistantHistoryItem[];
  onSelect: (item: AssistantHistoryItem) => void;
  onClear: () => void;
}

export function AssistantHistory({ history, onSelect, onClear }: AssistantHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <MessageCircle className="w-8 h-8 text-[var(--color-text-tertiary)] mb-3" />
        <p className="text-sm text-[var(--color-text-tertiary)]">No history yet</p>
        <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
          Ask a question to get started
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {history.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15, delay: i * 0.02 }}
              onClick={() => onSelect(item)}
              className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors group"
            >
              <p className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] line-clamp-2">
                {item.question}
              </p>
              <p className="text-[10px] text-[var(--color-text-tertiary)] mt-1">
                {formatRelativeTime(new Date(item.timestamp))}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
      <div className="p-3 border-t border-[var(--color-border-primary)]">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          leftIcon={<Trash2 className="w-3.5 h-3.5" />}
          className="w-full text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-error)]"
        >
          Clear History
        </Button>
      </div>
    </div>
  );
}
