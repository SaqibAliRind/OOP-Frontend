import { cn } from '@/utils/helpers';

interface LoadingStateProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

export function LoadingState({
  size = 'md',
  text = 'Loading...',
  className,
  fullScreen = false,
}: LoadingStateProps) {
  const sizeStyles = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const containerStyles = fullScreen
    ? 'fixed inset-0 z-[var(--z-toast)]'
    : 'flex flex-col items-center justify-center';

  return (
    <div className={cn(containerStyles, 'gap-4', className)}>
      <div
        className={cn(
          'rounded-full border-[var(--color-border-primary)] border-t-[var(--color-accent-primary)]',
          'animate-spin',
          sizeStyles[size]
        )}
        role="status"
        aria-live="polite"
      >
        <span className="sr-only">{text}</span>
      </div>
      {text && !fullScreen && (
        <p className="text-sm text-[var(--color-text-secondary)]">{text}</p>
      )}
    </div>
  );
}