import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/utils/helpers';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      hint,
      fullWidth = true,
      id,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${textareaId}-error` : undefined;
    const hintId = hint ? `${textareaId}-hint` : undefined;

    return (
      <div className={cn('w-full', fullWidth && 'max-w-full')}>
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full bg-[var(--color-bg-input)] border rounded-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)]',
            'transition-all duration-200 resize-y min-h-[100px]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)] focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'p-4 text-sm',
            error
              ? 'border-[var(--color-accent-error)] focus:ring-[var(--color-accent-error)]'
              : 'border-[var(--color-border-primary)] hover:border-[var(--color-border-secondary)]',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={cn(errorId, hintId)}
          {...props}
        />
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

Textarea.displayName = 'Textarea';