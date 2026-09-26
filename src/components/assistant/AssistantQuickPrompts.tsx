import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';
import type { QuickPrompt } from '@/types/assistant';

interface AssistantQuickPromptsProps {
  prompts: QuickPrompt[];
  onSelect: (question: string) => void;
}

const categoryLabels: Record<string, string> = {
  concept: 'Concepts',
  comparison: 'Comparisons',
  practice: 'Practice',
  code: 'Code',
  exam: 'Exam Prep',
};

const categoryColors: Record<string, string> = {
  concept: 'text-[var(--color-accent-primary)]',
  comparison: 'text-[var(--color-accent-secondary)]',
  practice: 'text-[var(--color-accent-success)]',
  code: 'text-[var(--color-xp-gold)]',
  exam: 'text-[var(--color-accent-warning)]',
};

export function AssistantQuickPrompts({ prompts, onSelect }: AssistantQuickPromptsProps) {
  const grouped = prompts.reduce(
    (acc, prompt) => {
      if (!acc[prompt.category]) acc[prompt.category] = [];
      acc[prompt.category].push(prompt);
      return acc;
    },
    {} as Record<string, QuickPrompt[]>
  );

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <p className={cn('text-[10px] font-semibold uppercase tracking-wider mb-2', categoryColors[category] || 'text-[var(--color-text-tertiary)]')}>
            {categoryLabels[category] || category}
          </p>
          <div className="flex flex-wrap gap-2">
            {items.map((prompt, i) => (
              <motion.button
                key={prompt.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.15, delay: i * 0.03 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(prompt.question)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent-primary)]/30 hover:bg-[var(--color-accent-primary)]/5 transition-all duration-150 cursor-pointer"
              >
                {prompt.label}
              </motion.button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
