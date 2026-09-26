import { cn } from '@/utils/helpers';

interface PremiumBackgroundProps {
  variant?: 'default' | 'hero' | 'workspace' | 'lab' | 'minimal';
  className?: string;
  children?: React.ReactNode;
}

export function PremiumBackground({ variant = 'default', className, children }: PremiumBackgroundProps) {
  return (
    <div className={cn('relative isolate min-h-full', className)}>
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        {/* Radial gradient */}
        <div
          className={cn(
            'absolute inset-0 opacity-[0.4]',
            variant === 'hero' && 'bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--glow-accent-soft),transparent)]',
            variant === 'workspace' && 'bg-[radial-gradient(circle_at_20%_20%,var(--glow-primary-soft),transparent_45%)]',
            variant === 'lab' && 'bg-[radial-gradient(circle_at_80%_30%,var(--glow-accent-soft),transparent_50%)]',
            variant === 'minimal' && 'bg-[radial-gradient(circle_at_50%_0%,var(--glow-primary-soft),transparent_35%)]',
            variant === 'default' && 'bg-[radial-gradient(circle_at_70%_0%,var(--glow-primary-soft),transparent_40%)]'
          )}
        />

        {/* Grid pattern */}
        <div className={cn(
          'absolute inset-0',
          variant === 'lab' ? 'bg-grid-pattern-fine opacity-[0.03]' : 'bg-grid-pattern opacity-[0.03]'
        )} />

        {/* Noise texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.02]" />

        {/* Depth gradient - bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent" />
      </div>
      {children}
    </div>
  );
}
