import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils/helpers';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'outline' | 'primary';
  children: ReactNode;
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      size = 'md',
      variant = 'ghost',
      children,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center rounded-lg transition-all duration-200
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const variantStyles = {
      ghost: `
        bg-transparent text-[var(--color-text-secondary)]
        hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]
        focus-visible:ring-[var(--color-border-focus)]
      `,
      outline: `
        border border-[var(--color-border-primary)] text-[var(--color-text-secondary)]
        hover:bg-[var(--color-bg-tertiary)] hover:border-[var(--color-border-secondary)] hover:text-[var(--color-text-primary)]
        focus-visible:ring-[var(--color-border-focus)]
      `,
      primary: `
        bg-[var(--color-accent-primary)] text-white
        hover:bg-[var(--color-accent-primary-hover)]
        focus-visible:ring-[var(--color-accent-primary)]
      `,
    };

    const sizeStyles = {
      sm: 'p-1.5',
      md: 'p-2',
      lg: 'p-3',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';