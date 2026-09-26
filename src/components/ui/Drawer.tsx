import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button } from './Button';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  description,
  children,
  position = 'right',
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
}: DrawerProps) {
  const drawerId = `drawer-${Math.random().toString(36).substr(2, 9)}`;
  const descriptionId = description ? `${drawerId}-description` : undefined;

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  const sizeStyles = {
    sm: 'w-64',
    md: 'w-96',
    lg: 'w-[32rem]',
    full: 'w-full max-w-full',
  };

  const positionStyles = {
    left: 'left-0',
    right: 'right-0',
  };

  const drawerContent = (
    <div
      className="fixed inset-0 z-[var(--z-modal)] flex"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? drawerId : undefined}
      aria-describedby={descriptionId}
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />
      <div
        className={cn(
          'fixed top-0 bottom-0 flex flex-col bg-[var(--color-bg-card)] border-[var(--color-border-primary)] shadow-[var(--shadow-2xl)]',
          'animate-in slide-in-from-right-4 duration-300',
          positionStyles[position],
          sizeStyles[size],
          className
        )}
      >
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between p-4 border-b border-[var(--color-border-primary)]">
            <div>
              {title && (
                <h2 id={drawerId} className="text-lg font-semibold text-[var(--color-text-primary)]">
                  {title}
                </h2>
              )}
              {description && (
                <p id={descriptionId} className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close drawer"
                className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
        )}
        <div className="flex-1 overflow-auto p-4">{children}</div>
      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
}