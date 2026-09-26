import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';
import { useLanguage, type ContentLanguage } from '@/contexts/LanguageContext';

interface LanguageToggleProps {
  className?: string;
}

const options: { id: ContentLanguage; label: string; nativeLabel: string }[] = [
  { id: 'en', label: 'English', nativeLabel: 'English' },
  { id: 'ur', label: 'Roman Urdu', nativeLabel: 'Roman Urdu' },
];

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={cn(
        'inline-flex p-1 rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-input)]',
        className
      )}
      role="tablist"
      aria-label="Content language"
    >
      {options.map(opt => {
        const active = language === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => setLanguage(opt.id)}
            className={cn(
              'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
              active
                ? 'text-[var(--color-text-primary)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            )}
          >
            {active && (
              <motion.div
                layoutId="language-toggle-bg"
                className="absolute inset-0 bg-[var(--color-accent-primary)]/15 border border-[var(--color-accent-primary)]/20 rounded-lg"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <span>{opt.label}</span>
              <span className="text-[10px] text-[var(--color-text-tertiary)] opacity-70">
                {opt.nativeLabel}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
