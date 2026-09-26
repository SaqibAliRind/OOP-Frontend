import { Component, type ReactNode, type ErrorInfo } from 'react';
import { Button } from '@/components/ui';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-[60vh] flex items-center justify-center p-6"
          role="alert"
        >
          <div className="max-w-md w-full text-center space-y-4 rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)] p-6">
            <p className="text-sm font-semibold text-[var(--color-accent-error)]">
              {this.props.fallbackTitle || 'Something went wrong'}
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              This section hit an unexpected error. Your saved progress is not affected.
            </p>
            {this.state.error && (
              <p className="text-xs font-mono text-[var(--color-text-tertiary)] break-all">
                {this.state.error.message}
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-2">
              <Button variant="primary" size="sm" onClick={this.handleRetry}>
                Try again
              </Button>
              <Button variant="outline" size="sm" onClick={this.handleReload}>
                Reload page
              </Button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
