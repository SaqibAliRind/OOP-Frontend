import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/utils/helpers';

interface SuccessPanelProps {
  title?: string;
  message: string;
  className?: string;
}

export function SuccessPanel({ title = 'BUILD SUCCESS', message, className }: SuccessPanelProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-[var(--color-accent-success)]/40 bg-[var(--color-accent-success)]/5 p-4 flex gap-3',
        className
      )}
      role="status"
    >
      <CheckCircle2 className="w-5 h-5 text-[var(--color-accent-success)] shrink-0" aria-hidden="true" />
      <div>
        <p className="text-sm font-semibold text-[var(--color-accent-success)]">{title}</p>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">{message}</p>
      </div>
    </div>
  );
}
