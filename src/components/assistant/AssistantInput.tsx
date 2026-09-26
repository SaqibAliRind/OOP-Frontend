import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CornerDownLeft } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button } from '@/components/ui/Button';

interface AssistantInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export function AssistantInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
  placeholder = 'Ask about OOP concepts...',
}: AssistantInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSubmit();
      }
    }
  };

  return (
    <div className="border-t border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-3">
      <div className="flex items-end gap-2 max-w-3xl mx-auto">
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            rows={1}
            className={cn(
              'w-full resize-none rounded-xl px-4 py-3 pr-12 text-sm',
              'bg-[var(--color-bg-input)] border border-[var(--color-border-primary)]',
              'text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]',
              'focus:outline-none focus:border-[var(--color-accent-primary)]/50 focus:ring-1 focus:ring-[var(--color-accent-primary)]/20',
              'transition-all duration-200',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          />
          <div className="absolute right-2 bottom-2 flex items-center gap-1">
            <span className="flex items-center gap-1 text-[10px] text-[var(--color-text-tertiary)] bg-[var(--color-bg-tertiary)] px-1.5 py-0.5 rounded">
              <CornerDownLeft className="w-3 h-3" />
              enter
            </span>
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="primary"
            size="icon"
            onClick={onSubmit}
            disabled={!value.trim() || disabled}
            className="rounded-xl h-11 w-11"
          >
            <Send className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
