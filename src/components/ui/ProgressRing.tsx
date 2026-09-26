import { cn } from '@/utils/helpers';

interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'xp';
  showValue?: boolean;
  className?: string;
  animated?: boolean;
}

export function ProgressRing({
  value,
  max = 100,
  size = 64,
  strokeWidth = 4,
  variant = 'default',
  showValue = true,
  className,
  animated = false,
}: ProgressRingProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const variantStyles = {
    default: 'text-[var(--color-accent-primary)]',
    primary: 'text-[var(--color-accent-primary)]',
    secondary: 'text-[var(--color-accent-secondary)]',
    success: 'text-[var(--color-accent-success)]',
    warning: 'text-[var(--color-accent-warning)]',
    error: 'text-[var(--color-accent-error)]',
    xp: 'text-[var(--color-xp-gold)]',
  };

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={Math.round(percentage)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          className="text-[var(--color-bg-tertiary)]"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={cn(
            'transition-all duration-500 ease-out',
            variantStyles[variant],
            animated && 'animate-pulse'
          )}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            filter: variant === 'xp' ? 'drop-shadow(0 0 4px var(--color-xp-gold))' : 'none',
          }}
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono font-semibold text-[var(--color-text-primary)]">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
}