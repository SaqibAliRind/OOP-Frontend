import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '@/utils/helpers';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      hint,
      options,
      placeholder,
      fullWidth = true,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${selectId}-error` : undefined;
    const hintId = hint ? `${selectId}-hint` : undefined;

    return (
      <div className={cn('w-full', fullWidth && 'max-w-full')}>
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full bg-[var(--color-bg-input)] border rounded-lg text-[var(--color-text-primary)] appearance-none',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)] focus:border-transparent',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'pl-4 pr-10 py-2.5 text-sm',
              error
                ? 'border-[var(--color-accent-error)] focus:ring-[var(--color-accent-error)]'
                : 'border-[var(--color-border-primary)] hover:border-[var(--color-border-secondary)]',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={cn(errorId, hintId)}
            {...props}
          >
            {placeholder && (
              <option value="" disabled selected>
                {placeholder}
              </option>
            )}
            {options.map(option => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-tertiary)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-[var(--color-accent-error)]" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-1.5 text-sm text-[var(--color-text-tertiary)]">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';