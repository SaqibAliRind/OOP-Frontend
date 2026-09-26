import { type ReactNode } from 'react';
import { cn } from '@/utils/helpers';
import { Button } from './Button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  icon?: ReactNode;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  icon,
  onRetry,
  retryLabel = 'Try again',
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-12 px-4',
        className
      )}
    >
      {icon || (
        <AlertTriangle className="w-12 h-12 text-[var(--color-accent-warning)] mb-4" />
      )}
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</h3>
      {message && (
        <p className="mt-2 text-sm text-[var(--color-text-secondary)] max-w-sm">{message}</p>
      )}
      {onRetry && (
        <Button
          variant="primary"
          className="mt-4 gap-2"
          onClick={onRetry}
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          {retryLabel}
        </Button>
      )}
    </div>
  );
}