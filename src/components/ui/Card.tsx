import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils/helpers';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  children: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      padding = 'md',
      hover = false,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: 'bg-[var(--color-bg-card)] border border-[var(--color-border-primary)]',
      elevated: 'bg-[var(--color-bg-card)] shadow-[var(--shadow-lg)] border-none',
      outlined: 'bg-transparent border-2 border-[var(--color-border-secondary)]',
      glass: 'glass',
    };

    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl transition-all duration-200',
          variantStyles[variant],
          paddingStyles[padding],
          hover && 'hover:shadow-[var(--shadow-xl)] hover:border-[var(--color-border-secondary)] hover:-translate-y-0.5',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';