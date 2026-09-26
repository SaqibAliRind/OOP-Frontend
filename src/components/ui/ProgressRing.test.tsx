import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressRing } from '@/components/ui/ProgressRing';

describe('ProgressRing', () => {
  it('renders progressbar with rounded percentage', () => {
    render(<ProgressRing value={33} max={100} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '33');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('clamps values outside 0..max', () => {
    const { rerender } = render(<ProgressRing value={150} max={100} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');

    rerender(<ProgressRing value={-5} max={100} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it('shows percentage text when showValue is true', () => {
    render(<ProgressRing value={80} max={200} />);
    expect(screen.getByText('40%')).toBeInTheDocument();
  });

  it('hides percentage text when showValue is false', () => {
    render(<ProgressRing value={80} showValue={false} />);
    expect(screen.queryByText(/%$/)).not.toBeInTheDocument();
  });
});
