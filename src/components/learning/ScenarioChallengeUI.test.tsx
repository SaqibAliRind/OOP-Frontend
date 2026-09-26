import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ScenarioChallengeUI } from '@/components/learning/ScenarioChallengeUI';
import type { ScenarioQuestion } from '@/types';

const question: ScenarioQuestion = {
  id: 'sc-1',
  scenario: 'A library system needs to track books.',
  question: 'Which OOP relationship best models a Library containing Books?',
  type: 'design-decision',
  options: ['Composition', 'Inheritance', 'Dependency only', 'None'],
  correctAnswer: 'Composition',
  explanation: 'Library owns its books lifecycle.',
  romanUrduExplanation: 'Library books ki ownership karti hai.',
  relatedConcepts: ['composition'],
  difficulty: 'easy',
};

describe('ScenarioChallengeUI', () => {
  it('disables submit until an option is selected', () => {
    const onComplete = vi.fn();
    render(<ScenarioChallengeUI question={question} onComplete={onComplete} />);

    const submit = screen.getByRole('button', { name: /submit answer/i });
    expect(submit).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: /composition/i }));
    expect(screen.getByRole('button', { name: /submit answer/i })).toBeEnabled();
    expect(onComplete).not.toHaveBeenCalled();
  });

  it('grades a correct answer and reports via onComplete', () => {
    const onComplete = vi.fn();
    render(<ScenarioChallengeUI question={question} onComplete={onComplete} />);

    fireEvent.click(screen.getByRole('button', { name: /composition/i }));
    fireEvent.click(screen.getByRole('button', { name: /submit answer/i }));

    expect(onComplete).toHaveBeenCalledWith(true);
    expect(screen.getByText(/strong oop reasoning/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /submit answer/i })).not.toBeInTheDocument();
  });

  it('grades an incorrect answer and allows try again', () => {
    const onComplete = vi.fn();
    render(<ScenarioChallengeUI question={question} onComplete={onComplete} />);

    fireEvent.click(screen.getByRole('button', { name: /inheritance/i }));
    fireEvent.click(screen.getByRole('button', { name: /submit answer/i }));

    expect(onComplete).toHaveBeenCalledWith(false);
    expect(screen.getByText(/not quite/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(screen.getByRole('button', { name: /submit answer/i })).toBeDisabled();
  });

  it('does not change answer after submission', () => {
    const onComplete = vi.fn();
    render(<ScenarioChallengeUI question={question} onComplete={onComplete} />);

    fireEvent.click(screen.getByRole('button', { name: /composition/i }));
    fireEvent.click(screen.getByRole('button', { name: /submit answer/i }));
    expect(onComplete).toHaveBeenCalledTimes(1);

    const options = screen.getAllByRole('button').filter(
      b => /composition|inheritance|dependency|none/i.test(b.textContent ?? '')
    );
    options.forEach(opt => expect(opt).toBeDisabled());
    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});
