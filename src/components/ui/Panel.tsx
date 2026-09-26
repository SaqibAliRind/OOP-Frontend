import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils/helpers';

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'sidebar' | 'content' | 'overlay' | 'elevated';
  children: ReactNode;
}

export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  (
    {
      className,
      variant = 'default',
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: 'bg-[var(--color-bg-secondary)] border-r border-[var(--color-border-primary)]',
      sidebar: 'bg-[var(--color-bg-secondary)] border-r border-[var(--color-border-primary)] h-full flex flex-col',
      content: 'bg-[var(--color-bg-primary)] flex-1 overflow-auto',
      overlay: 'glass-strong',
      elevated: 'bg-[var(--color-bg-card)] shadow-[var(--shadow-lg)] border border-[var(--color-border-primary)]',
    };

    return (
      <div
        ref={ref}
        className={cn(variantStyles[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Panel.displayName = 'Panel';