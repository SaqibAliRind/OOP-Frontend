import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/helpers';

interface SwitchProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  label?: string;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      checked,
      onCheckedChange,
      size = 'md',
      disabled = false,
      label,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: 'w-8 h-5',
      md: 'w-11 h-6',
      lg: 'w-14 h-7',
    };

    const thumbSize = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    const thumbTranslate = {
      sm: 'translate-x-4',
      md: 'translate-x-5',
      lg: 'translate-x-6',
    };

    return (
      <label className={cn('inline-flex items-center gap-3 cursor-pointer', disabled && 'opacity-50 cursor-not-allowed', className)}>
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => !disabled && onCheckedChange(!checked)}
          className={cn(
            'relative inline-flex shrink-0 rounded-full border-2 transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2',
            checked
              ? 'bg-[var(--color-accent-primary)] border-[var(--color-accent-primary)]'
              : 'bg-[var(--color-bg-tertiary)] border-[var(--color-border-primary)]',
            sizeStyles[size]
          )}
          {...props}
        >
          <span
            className={cn(
              'pointer-events-none inline-block rounded-full bg-white shadow-lg transform transition-transform duration-200',
              checked ? thumbTranslate[size] : 'translate-x-0',
              thumbSize[size]
            )}
            aria-hidden="true"
          />
        </button>
        {label && <span className="text-sm text-[var(--color-text-secondary)]">{label}</span>}
      </label>
    );
  }
);

Switch.displayName = 'Switch';