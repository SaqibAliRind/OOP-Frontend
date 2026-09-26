import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { AssistantTyping } from './AssistantTyping';

interface AssistantMessageProps {
  type: 'user' | 'assistant';
  content: string;
  isTyping?: boolean;
  timestamp?: number;
}

export function AssistantMessage({ type, content, isTyping, timestamp }: AssistantMessageProps) {
  const isUser = type === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn('flex gap-3 px-4 py-3', isUser ? 'justify-end' : 'justify-start')}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--color-accent-primary)]/10 border border-[var(--color-accent-primary)]/20 flex items-center justify-center">
          <Bot className="w-4 h-4 text-[var(--color-accent-primary)]" />
        </div>
      )}

      <div
        className={cn(
          'max-w-[80%] rounded-xl px-4 py-3 text-sm',
          isUser
            ? 'bg-[var(--color-accent-primary)] text-white rounded-br-md'
            : 'bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] text-[var(--color-text-primary)] rounded-bl-md'
        )}
      >
        {isTyping ? (
          <AssistantTyping />
        ) : (
          <p className="whitespace-pre-wrap">{content}</p>
        )}
        {timestamp && !isTyping && (
          <p className="mt-2 text-[10px] opacity-50">
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] flex items-center justify-center">
          <User className="w-4 h-4 text-[var(--color-text-secondary)]" />
        </div>
      )}
    </motion.div>
  );
}
