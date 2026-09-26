import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { createPortal } from 'react-dom';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button } from './Button';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);
    return id;
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  return createPortal(
    <div className="fixed bottom-4 right-4 z-[var(--z-toast)] flex flex-col gap-2 w-[360px] max-w-full pointer-events-none">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>,
    document.body
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (toast.duration !== 0) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => onRemove(toast.id), 200);
      }, toast.duration || 5000);
      return () => clearTimeout(timer);
    }
  }, [toast, onRemove]);

  const typeStyles = {
    success: 'border-[var(--color-accent-success)] bg-[var(--color-accent-success)]/10',
    error: 'border-[var(--color-accent-error)] bg-[var(--color-accent-error)]/10',
    warning: 'border-[var(--color-accent-warning)] bg-[var(--color-accent-warning)]/10',
    info: 'border-[var(--color-accent-info)] bg-[var(--color-accent-info)]/10',
  };

  const typeIcons = {
    success: <CheckCircle className="text-[var(--color-accent-success)]" />,
    error: <AlertCircle className="text-[var(--color-accent-error)]" />,
    warning: <AlertTriangle className="text-[var(--color-accent-warning)]" />,
    info: <Info className="text-[var(--color-accent-info)]" />,
  };

  return (
    <div
      className={cn(
        'pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-[var(--shadow-lg)]',
        'animate-in slide-in-from-right-4 duration-300',
        isExiting && 'animate-out fade-out slide-out-to-right-4 duration-200',
        typeStyles[toast.type]
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex-shrink-0 mt-0.5">{typeIcons[toast.type]}</div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-[var(--color-text-primary)]">{toast.title}</p>
        {toast.message && (
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{toast.message}</p>
        )}
        {toast.action && (
          <Button
            size="sm"
            variant="ghost"
            className="mt-2 text-sm"
            onClick={() => {
              toast.action?.onClick();
              onRemove(toast.id);
            }}
          >
            {toast.action.label}
          </Button>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
        onClick={() => onRemove(toast.id)}
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}