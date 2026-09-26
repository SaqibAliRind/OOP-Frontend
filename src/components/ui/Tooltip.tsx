import { useState, useEffect, type ReactNode } from 'react';
import { cn } from '@/utils/helpers';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = 'top',
  delay = 200,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();

  const showTooltip = () => {
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowStyles = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-[var(--color-bg-tertiary)]',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[var(--color-bg-tertiary)]',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-[var(--color-bg-tertiary)]',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-[var(--color-bg-tertiary)]',
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            'absolute z-[var(--z-tooltip)] px-3 py-2 text-xs font-medium text-[var(--color-text-primary)]',
            'bg-[var(--color-bg-tertiary)] rounded-lg shadow-[var(--shadow-lg)]',
            'whitespace-nowrap animate-in fade-in-0 zoom-in-95 duration-150',
            positionStyles[position],
            className
          )}
          role="tooltip"
        >
          {content}
          <div
            className={cn(
              'absolute w-0 h-0 border-4 border-transparent',
              arrowStyles[position]
            )}
          />
        </div>
      )}
    </div>
  );
}