import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MobileNav } from '@/components/layout/MobileNav';

describe('MobileNav', () => {
  it('renders navigation landmark with all primary links', () => {
    render(
      <MemoryRouter>
        <MobileNav />
      </MemoryRouter>
    );

    const nav = screen.getByRole('navigation', { name: /mobile navigation/i });
    expect(nav).toBeInTheDocument();

    for (const label of [
      'Home',
      'Learn',
      'Curriculum',
      'Practice',
      '3D Lab',
      'Quiz',
      'Debug',
      'Progress',
      'Challenges',
    ]) {
      expect(screen.getByRole('link', { name: new RegExp(label, 'i') })).toBeInTheDocument();
    }
  });

  it('links point at expected routes', () => {
    render(
      <MemoryRouter>
        <MobileNav />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /learn/i })).toHaveAttribute('href', '/learn');
    expect(screen.getByRole('link', { name: /curriculum/i })).toHaveAttribute('href', '/curriculum');
    expect(screen.getByRole('link', { name: /practice/i })).toHaveAttribute('href', '/practice');
    expect(screen.getByRole('link', { name: /3d lab/i })).toHaveAttribute('href', '/3d');
    expect(screen.getByRole('link', { name: /quiz/i })).toHaveAttribute('href', '/quiz');
    expect(screen.getByRole('link', { name: /debug/i })).toHaveAttribute('href', '/debug');
    expect(screen.getByRole('link', { name: /progress/i })).toHaveAttribute('href', '/progress');
    expect(screen.getByRole('link', { name: /challenges/i })).toHaveAttribute('href', '/challenges');
  });

  it('marks the active route with aria-current', () => {
    render(
      <MemoryRouter initialEntries={['/practice']}>
        <MobileNav />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /practice/i })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: /home/i })).not.toHaveAttribute('aria-current', 'page');
  });
});
