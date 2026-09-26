import { cn } from '@/utils/helpers';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  className?: string;
}

export function Divider({ orientation = 'horizontal', label, className }: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        className={cn(
          'w-px h-full bg-[var(--color-border-primary)]',
          className
        )}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  return (
    <div
      className={cn('flex items-center w-full', className)}
      role="separator"
      aria-orientation="horizontal"
    >
      <div className="flex-1 h-px bg-[var(--color-border-primary)]" />
      {label && (
        <span className="px-4 text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
          {label}
        </span>
      )}
      <div className="flex-1 h-px bg-[var(--color-border-primary)]" />
    </div>
  );
}