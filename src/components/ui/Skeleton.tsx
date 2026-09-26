import { cn } from '@/utils/helpers';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'code';
  lines?: number;
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = 'text',
  lines = 1,
  width,
  height,
}: SkeletonProps) {
  const baseStyles = 'animate-pulse bg-[var(--color-bg-tertiary)] rounded';

  if (variant === 'circular') {
    return (
      <div
        className={cn(baseStyles, 'rounded-full', className)}
        style={{ width: width || 40, height: height || 40 }}
      />
    );
  }

  if (variant === 'rectangular') {
    return (
      <div
        className={cn(baseStyles, className)}
        style={{ width: width || '100%', height: height || 200 }}
      />
    );
  }

  if (variant === 'code') {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(baseStyles, 'h-8 rounded-md')}
            style={{
              width: i === lines - 1 ? '60%' : '100%',
              borderRadius: 6,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(baseStyles, 'h-4 rounded')}
          style={{
            width: i === lines - 1 ? '70%' : '100%',
          }}
        />
      ))}
    </div>
  );
}