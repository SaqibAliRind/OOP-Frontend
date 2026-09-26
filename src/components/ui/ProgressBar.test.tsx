import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from '@/components/ui/ProgressBar';

describe('ProgressBar', () => {
  it('renders a progressbar with computed percentage', () => {
    render(<ProgressBar value={40} max={200} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '20');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('defaults max to 100', () => {
    render(<ProgressBar value={75} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
  });

  it('clamps percentage above max to 100', () => {
    render(<ProgressBar value={150} max={100} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('clamps negative values to 0', () => {
    render(<ProgressBar value={-10} max={100} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it('shows label text when showLabel is set', () => {
    render(<ProgressBar value={3} max={10} showLabel />);
    expect(screen.getByText('30%')).toBeInTheDocument();
    expect(screen.getByText('3/10')).toBeInTheDocument();
  });

  it('uses custom label and accessible name', () => {
    render(<ProgressBar value={50} label="Module progress" />);
    expect(screen.getByText('Module progress')).toBeInTheDocument();
    expect(screen.getByRole('progressbar', { name: 'Module progress' })).toBeInTheDocument();
  });
});
