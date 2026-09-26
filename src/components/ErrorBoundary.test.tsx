import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

function Bomb({ message = 'Test explosion' }: { message?: string }) {
  throw new Error(message);
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Healthy content</div>
      </ErrorBoundary>
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Healthy content');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('catches child errors and shows fallback UI', () => {
    render(
      <ErrorBoundary>
        <Bomb message="kapow" />
      </ErrorBoundary>
    );

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('kapow')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reload page/i })).toBeInTheDocument();
    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
  });

  it('uses custom fallbackTitle when provided', () => {
    render(
      <ErrorBoundary fallbackTitle="Module crashed">
        <Bomb />
      </ErrorBoundary>
    );
    expect(screen.getByText('Module crashed')).toBeInTheDocument();
  });

  it('re-renders children after retry when error is resolved', () => {
    function Conditional({ shouldThrow }: { shouldThrow: boolean }) {
      if (shouldThrow) throw new Error('temporary');
      return <div data-testid="recovered">Recovered</div>;
    }

    const { rerender } = render(
      <ErrorBoundary>
        <Conditional shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();

    rerender(
      <ErrorBoundary>
        <Conditional shouldThrow={false} />
      </ErrorBoundary>
    );
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));

    expect(screen.getByTestId('recovered')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('reloads the page from the reload button', () => {
    const reload = vi.fn();
    const original = window.location;
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { ...original, reload },
    });

    try {
      render(
        <ErrorBoundary>
          <Bomb />
        </ErrorBoundary>
      );
      fireEvent.click(screen.getByRole('button', { name: /reload page/i }));
      expect(reload).toHaveBeenCalledTimes(1);
    } finally {
      Object.defineProperty(window, 'location', {
        configurable: true,
        value: original,
      });
    }
  });
});
