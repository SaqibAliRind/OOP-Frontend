import { type ReactNode } from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button } from './Button';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: { label: string; onClick: () => void };
  className?: string;
}

export function Alert({
  type,
  title,
  message,
  dismissible = false,
  onDismiss,
  action,
  className,
}: AlertProps) {
  const typeStyles = {
    success: 'border-[var(--color-accent-success)] bg-[var(--color-accent-success)]/10',
    error: 'border-[var(--color-accent-error)] bg-[var(--color-accent-error)]/10',
    warning: 'border-[var(--color-accent-warning)] bg-[var(--color-accent-warning)]/10',
    info: 'border-[var(--color-accent-info)] bg-[var(--color-accent-info)]/10',
  };

  const typeIcons = {
    success: <CheckCircle className="text-[var(--color-accent-success)]" />,
    error: <AlertCircle className="text-[var(--color-accent-error)]" />,
    warning: <AlertTriangle className="text-[var(--color-accent-warning)]" />,
    info: <Info className="text-[var(--color-accent-info)]" />,
  };

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl border',
        typeStyles[type],
        className
      )}
      role="alert"
    >
      <div className="flex-shrink-0 mt-0.5">{typeIcons[type]}</div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-[var(--color-text-primary)]">{title}</p>
        {message && <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{message}</p>}
        {action && (
          <Button size="sm" variant="outline" className="mt-3" onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </div>
      {dismissible && (
        <Button
          variant="ghost"
          size="icon"
          className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}