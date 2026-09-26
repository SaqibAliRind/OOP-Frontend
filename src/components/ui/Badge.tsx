import { cn } from '@/utils/helpers';

interface BadgeProps {
  variant?: string;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export function Badge({
  variant = 'default',
  size = 'md',
  children,
  className,
  dot = false,
}: BadgeProps) {
  const variantStyles: Record<string, string> = {
    default: 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] border border-[var(--color-border-primary)]',
    primary: 'bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/30',
    secondary: 'bg-[var(--color-accent-secondary)]/20 text-[var(--color-accent-secondary)] border border-[var(--color-accent-secondary)]/30',
    success: 'bg-[var(--color-accent-success)]/20 text-[var(--color-accent-success)] border border-[var(--color-accent-success)]/30',
    warning: 'bg-[var(--color-accent-warning)]/20 text-[var(--color-accent-warning)] border border-[var(--color-accent-warning)]/30',
    error: 'bg-[var(--color-accent-error)]/20 text-[var(--color-accent-error)] border border-[var(--color-accent-error)]/30',
    xp: 'bg-[var(--color-xp-gold)]/20 text-[var(--color-xp-gold)] border border-[var(--color-xp-gold)]/30',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3 py-1.5 text-sm gap-2',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', `bg-[var(--color-${variant === 'xp' ? 'xp-gold' : `accent-${variant}`})]`)} />}
      {children}
    </span>
  );
}