import { cn } from '@/utils/helpers';

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'xp';
  showLabel?: boolean;
  label?: string;
  className?: string;
  animated?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showLabel = false,
  label,
  className,
  animated = false,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const variantStyles = {
    default: 'bg-[var(--color-accent-primary)]',
    primary: 'bg-[var(--color-accent-primary)]',
    secondary: 'bg-[var(--color-accent-secondary)]',
    success: 'bg-[var(--color-accent-success)]',
    warning: 'bg-[var(--color-accent-warning)]',
    error: 'bg-[var(--color-accent-error)]',
    xp: 'bg-[var(--color-xp-gold)]',
  };

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-[var(--color-text-secondary)]">
            {label || `${Math.round(percentage)}%`}
          </span>
          {showLabel && (
            <span className="text-sm font-mono text-[var(--color-text-tertiary)]">
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          'relative w-full rounded-full overflow-hidden bg-[var(--color-bg-tertiary)]',
          sizeStyles[size]
        )}
        role="progressbar"
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progress'}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            variantStyles[variant],
            animated && 'animate-pulse'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}