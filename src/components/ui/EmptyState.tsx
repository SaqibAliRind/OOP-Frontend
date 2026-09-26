import { type ReactNode } from 'react';
import { cn } from '@/utils/helpers';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-12 px-4',
        className
      )}
    >
      {icon && (
        <div className="text-[var(--color-text-tertiary)] mb-4">{icon}</div>
      )}
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-[var(--color-text-secondary)] max-w-sm">{description}</p>
      )}
      {action && (
        <Button variant="primary" className="mt-4" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}