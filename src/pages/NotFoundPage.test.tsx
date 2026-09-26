import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFoundPage } from '@/pages/NotFoundPage';

describe('NotFoundPage', () => {
  it('renders 404 content', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: '404' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: /lost in the oop universe/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/this route does not exist in our curriculum/i)
    ).toBeInTheDocument();
  });

  it('provides navigation home and to curriculum', () => {
    render(
      <MemoryRouter initialEntries={['/nope']}>
        <NotFoundPage />
      </MemoryRouter>
    );

    const home = screen.getByRole('link', { name: /back home/i });
    const curriculum = screen.getByRole('link', { name: /open curriculum/i });
    expect(home).toHaveAttribute('href', '/');
    expect(curriculum).toHaveAttribute('href', '/curriculum');
  });
});
