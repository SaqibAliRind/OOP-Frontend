import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button, Card, Badge, ProgressBar, Textarea, Input } from '@/components/ui';
import type { QuickCheckQuestion, ScenarioQuestion } from '@/types';

interface QuickCheckProps {
  questions: QuickCheckQuestion[];
  onComplete?: (score: number) => void;
  className?: string;
}

export function QuickCheck({ questions, onComplete, className }: QuickCheckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [userOutput, setUserOutput] = useState('');

  if (!questions || questions.length === 0) {
    return (
      <Card variant="outlined" padding="lg" className={cn('text-center', className)}>
        <p className="text-sm text-[var(--color-text-secondary)]">No questions available.</p>
        <Button variant="outline" className="mt-4" onClick={() => onComplete?.(100)}>
          Continue
        </Button>
      </Card>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const userAnswer = answers[currentQuestion.id];

  const checkAnswer = (selectedAnswer: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: selectedAnswer }));
    setShowExplanation(true);

    const isCorrect = Array.isArray(currentQuestion.correctAnswer)
      ? currentQuestion.correctAnswer.includes(selectedAnswer)
      : currentQuestion.correctAnswer === selectedAnswer;

    if (isCorrect && !answers[currentQuestion.id]) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLast) {
      setCompleted(true);
      const finalScore = Math.round((score / questions.length) * 100);
      onComplete?.(finalScore);
    } else {
      setCurrentIndex(prev => prev + 1);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => prev - 1);
    setShowExplanation(false);
  };

  const renderOptions = () => {
    if (!currentQuestion.options) return null;

    return (
      <div className="space-y-2">
        {currentQuestion.options.map((option, i) => {
          const isSelected = userAnswer === option;
          const isCorrect = Array.isArray(currentQuestion.correctAnswer)
            ? currentQuestion.correctAnswer.includes(option)
            : currentQuestion.correctAnswer === option;

          let variant: 'default' | 'outline' | 'primary' = 'outline';
          if (showExplanation) {
            if (isCorrect) variant = 'default';
            else if (isSelected) variant = 'default';
          } else if (isSelected) {
            variant = 'primary';
          }

          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => !showExplanation && checkAnswer(option)}
              disabled={showExplanation}
              className={cn(
                'w-full text-left p-4 rounded-lg border-2 transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
                variant === 'default' && isCorrect
                  ? 'bg-[var(--color-accent-success)]/10 border-[var(--color-accent-success)] text-[var(--color-accent-success)]'
                  : variant === 'default' && isSelected
                  ? 'bg-[var(--color-accent-error)]/10 border-[var(--color-accent-error)] text-[var(--color-accent-error)]'
                  : 'border-[var(--color-border-primary)] hover:border-[var(--color-accent-primary)]/50 text-[var(--color-text-primary)]'
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                    showExplanation && isCorrect && 'bg-[var(--color-accent-success)] border-[var(--color-accent-success)]',
                    showExplanation && isSelected && !isCorrect && 'bg-[var(--color-accent-error)] border-[var(--color-accent-error)]',
                    !showExplanation && isSelected && 'border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/10',
                    !showExplanation && !isSelected && 'border-[var(--color-border-secondary)]'
                  )}
                >
                  {showExplanation && isCorrect && <CheckCircle className="w-4 h-4 text-white" />}
                  {showExplanation && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-white" />}
                </div>
                <span className="flex-1">{option}</span>
                {showExplanation && isCorrect && (
                  <CheckCircle className="w-5 h-5 text-[var(--color-accent-success)]" />
                )}
                {showExplanation && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-[var(--color-accent-error)]" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    );
  };

  const renderCodeCompletion = () => {
    return (
      <div className="space-y-3">
        {currentQuestion.codeSnippet && (
          <div className="bg-[var(--color-bg-input)] rounded-lg p-4 font-mono text-sm overflow-auto max-h-60">
            {currentQuestion.codeSnippet}
          </div>
        )}
        <Textarea
          value={userCode}
          onChange={e => setUserCode(e.target.value)}
          placeholder="Write your answer here..."
          className="min-h-[100px]"
        />
        <Button variant="primary" onClick={() => checkAnswer(userCode)} disabled={showExplanation}>
          Submit Answer
        </Button>
      </div>
    );
  };

  const renderOutputPrediction = () => {
    return (
      <div className="space-y-3">
        {currentQuestion.codeSnippet && (
          <div className="bg-[var(--color-bg-input)] rounded-lg p-4 font-mono text-sm overflow-auto max-h-60">
            {currentQuestion.codeSnippet}
          </div>
        )}
        <Input
          label="Expected Output"
          value={userOutput}
          onChange={e => setUserOutput(e.target.value)}
          placeholder="Enter expected output..."
        />
        <Button variant="primary" onClick={() => checkAnswer(userOutput)} disabled={showExplanation}>
          Submit Answer
        </Button>
      </div>
    );
  };

  if (completed) {
    return (
      <Card variant="elevated" padding="lg" className={cn('text-center animate-in zoom-in duration-300', className)}>
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[var(--color-accent-success)]/15 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-[var(--color-accent-success)]" />
        </div>
        <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Quick Check Complete!</h3>
        <ProgressBar value={score} max={questions.length} size="lg" variant="success" showLabel className="mx-auto max-w-xs mb-4" />
        <p className="text-[var(--color-text-secondary)] mb-6">
          You scored {score} out of {questions.length} ({Math.round((score / questions.length) * 100)}%)
        </p>
        <Button variant="primary" onClick={() => {
          setCurrentIndex(0);
          setAnswers({});
          setShowExplanation(false);
          setScore(0);
          setCompleted(false);
        }}>
          Try Again
        </Button>
      </Card>
    );
  }

  return (
    <Card variant="default" padding="lg" className={cn('animate-in fade-in duration-300', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="primary" size="sm">Quick Check</Badge>
          <span className="text-sm text-[var(--color-text-tertiary)]">
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>
        <ProgressBar value={currentIndex + 1} max={questions.length} size="sm" className="w-48" />
      </div>

      <div className="mb-6">
        <Badge variant={currentQuestion.difficulty} size="sm" className="mb-2">
          {currentQuestion.type.toUpperCase()}
        </Badge>
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">{currentQuestion.question}</h3>
        {currentQuestion.codeSnippet && (
          <div className="bg-[var(--color-bg-input)] rounded-lg p-4 font-mono text-sm overflow-auto max-h-60 mb-4">
            {currentQuestion.codeSnippet}
          </div>
        )}
      </div>

      <div className="mb-6">
        {currentQuestion.type === 'mcq' || currentQuestion.type === 'true-false' ? renderOptions() :
         currentQuestion.type === 'code-completion' ? renderCodeCompletion() :
         currentQuestion.type === 'output-prediction' ? renderOutputPrediction() :
         currentQuestion.type === 'matching' ? (
           <div className="text-[var(--color-text-secondary)]">Matching question - UI coming soon</div>
         ) : null}
      </div>

      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)]"
        >
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[var(--color-accent-warning)] shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-[var(--color-text-primary)] mb-1">Explanation</p>
              <p className="text-sm text-[var(--color-text-secondary)]">{currentQuestion.explanation}</p>
              {currentQuestion.romanUrduExplanation && (
                <p className="mt-2 text-sm text-[var(--color-accent-secondary)] font-medium">{currentQuestion.romanUrduExplanation}</p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </Button>
        <Button
          variant={showExplanation ? 'primary' : 'outline'}
          onClick={handleNext}
          disabled={!showExplanation && !userAnswer}
        >
          {isLast ? 'Finish' : 'Next'}
        </Button>
      </div>
    </Card>
  );
}

interface ScenarioQuestionProps {
  question: ScenarioQuestion;
  onAnswer?: (correct: boolean) => void;
  className?: string;
}

export function ScenarioQuestionComponent({ question, onAnswer, className }: ScenarioQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (answer: string) => {
    if (showExplanation) return;
    setSelectedAnswer(answer);
    setShowExplanation(true);

    const isCorrect = Array.isArray(question.correctAnswer)
      ? question.correctAnswer.includes(answer)
      : question.correctAnswer === answer;

    onAnswer?.(isCorrect);
  };

  return (
    <Card variant="default" padding="lg" className={cn('animate-in fade-in duration-300', className)}>
      <div className="flex items-center gap-2 mb-4">
        <Badge variant="secondary" size="sm">Scenario Question</Badge>
        <Badge variant={question.difficulty} size="sm">{question.difficulty.toUpperCase()}</Badge>
      </div>

      <div className="mb-6 p-4 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)]">
        <p className="font-medium text-[var(--color-text-primary)] mb-2">📋 Scenario</p>
        <p className="text-[var(--color-text-secondary)] leading-relaxed">{question.scenario}</p>
      </div>

      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">{question.question}</h3>

      <div className="space-y-2 mb-6">
        {question.options?.map((option, i) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = Array.isArray(question.correctAnswer)
            ? question.correctAnswer.includes(option)
            : question.correctAnswer === option;

          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleAnswer(option)}
              disabled={showExplanation}
              className={cn(
                'w-full text-left p-4 rounded-lg border-2 transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
                showExplanation && isCorrect
                  ? 'bg-[var(--color-accent-success)]/10 border-[var(--color-accent-success)] text-[var(--color-accent-success)]'
                  : showExplanation && isSelected && !isCorrect
                  ? 'bg-[var(--color-accent-error)]/10 border-[var(--color-accent-error)] text-[var(--color-accent-error)]'
                  : 'border-[var(--color-border-primary)] hover:border-[var(--color-accent-primary)]/50 text-[var(--color-text-primary)]'
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                    showExplanation && isCorrect && 'bg-[var(--color-accent-success)] border-[var(--color-accent-success)]',
                    showExplanation && isSelected && !isCorrect && 'bg-[var(--color-accent-error)] border-[var(--color-accent-error)]',
                    !showExplanation && isSelected && 'border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/10',
                    !showExplanation && !isSelected && 'border-[var(--color-border-secondary)]'
                  )}
                >
                  {showExplanation && isCorrect && <CheckCircle className="w-4 h-4 text-white" />}
                  {showExplanation && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-white" />}
                </div>
                <span className="flex-1">{option}</span>
                {showExplanation && isCorrect && (
                  <CheckCircle className="w-5 h-5 text-[var(--color-accent-success)]" />
                )}
                {showExplanation && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-[var(--color-accent-error)]" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)]"
        >
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[var(--color-accent-warning)] shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-[var(--color-text-primary)] mb-1">Explanation</p>
              <p className="text-sm text-[var(--color-text-secondary)]">{question.explanation}</p>
              {question.romanUrduExplanation && (
                <p className="mt-2 text-sm text-[var(--color-accent-secondary)] font-medium">{question.romanUrduExplanation}</p>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {question.relatedConcepts.map(concept => (
                  <Badge key={concept} variant="outline" size="sm">{concept}</Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </Card>
  );
}