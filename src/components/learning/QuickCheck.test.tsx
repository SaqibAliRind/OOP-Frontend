import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuickCheck } from '@/components/learning/QuickCheck';
import type { QuickCheckQuestion } from '@/types';

const questions: QuickCheckQuestion[] = [
  {
    id: 'qc-1',
    type: 'mcq',
    question: 'Which keyword creates a class in Java?',
    options: ['class', 'struct', 'object', 'type'],
    correctAnswer: 'class',
    explanation: 'Java uses the class keyword.',
    difficulty: 'easy',
  },
  {
    id: 'qc-2',
    type: 'mcq',
    question: 'What does OOP stand for?',
    options: [
      'Object-Oriented Programming',
      'Open Ordered Processing',
      'Only Original Protocols',
      'Operational Object Package',
    ],
    correctAnswer: 'Object-Oriented Programming',
    explanation: 'OOP = Object-Oriented Programming.',
    difficulty: 'easy',
  },
];

describe('QuickCheck', () => {
  it('shows empty state when there are no questions', () => {
    const onComplete = vi.fn();
    render(<QuickCheck questions={[]} onComplete={onComplete} />);

    expect(screen.getByText('No questions available.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(onComplete).toHaveBeenCalledWith(100);
  });

  it('renders first question and progress', () => {
    render(<QuickCheck questions={questions} />);
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
    expect(screen.getByText('Which keyword creates a class in Java?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('grades correct answer, shows explanation, and advances', () => {
    render(<QuickCheck questions={questions} />);

    fireEvent.click(screen.getByRole('button', { name: /class/ }));
    expect(screen.getByText('Explanation')).toBeInTheDocument();
    expect(screen.getByText('Java uses the class keyword.')).toBeInTheDocument();

    const next = screen.getByRole('button', { name: 'Next' });
    expect(next).toBeEnabled();
    fireEvent.click(next);

    expect(screen.getByText('Question 2 of 2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Finish' })).toBeInTheDocument();
  });

  it('does not advance without an answer', () => {
    render(<QuickCheck questions={questions} />);
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('completes the quiz and reports score percentage', () => {
    const onComplete = vi.fn();
    render(<QuickCheck questions={questions} onComplete={onComplete} />);

    fireEvent.click(screen.getByRole('button', { name: /class/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));

    fireEvent.click(screen.getByRole('button', { name: /Open Ordered Processing/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Finish' }));

    expect(onComplete).toHaveBeenCalledWith(50);
    expect(screen.getByText('Quick Check Complete!')).toBeInTheDocument();
    expect(screen.getByText(/You scored 1 out of 2 \(50%\)/)).toBeInTheDocument();
  });

  it('allows previous navigation before finishing', () => {
    render(<QuickCheck questions={questions} />);

    fireEvent.click(screen.getByRole('button', { name: /class/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Question 2 of 2')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
  });

  it('resets state via Try Again after completion', () => {
    const onComplete = vi.fn();
    render(<QuickCheck questions={questions} onComplete={onComplete} />);

    fireEvent.click(screen.getByRole('button', { name: /class/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: /Object-Oriented Programming/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Finish' }));
    expect(onComplete).toHaveBeenCalledWith(100);

    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
  });
});
