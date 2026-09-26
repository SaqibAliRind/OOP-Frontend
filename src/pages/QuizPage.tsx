import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Timer, ChevronRight, ChevronLeft, CheckCircle, XCircle, Award, BarChart2, Layers } from 'lucide-react';
import { Card, Badge, Button, ProgressBar } from '@/components/ui';
import { questionService } from '@/services/questionService';
import { progressService } from '@/services/progressService';
import type { ExamConfig, ExamResult } from '@/types';

const MODES = [
  { id: 'practice', label: 'Practice Mode', description: 'Learn at your own pace with explanations' },
  { id: 'exam', label: 'Exam Mode', description: 'Timed exam with score and review' },
  { id: 'viva', label: 'Viva Mode', description: 'Oral exam style with confidence tracking' },
  { id: 'lab', label: 'Lab Mode', description: 'Hands-on coding challenges' },
];

export function QuizPage() {
  const [mode, setMode] = useState<string | null>(null);
  const [config, setConfig] = useState<ExamConfig>({
    mode: 'practice',
    questionCount: 10,
    showExplanations: true,
    shuffleQuestions: false,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [vivaConfidence, setVivaConfidence] = useState<Record<string, string>>({});

  const allQuestions = useMemo(() => {
    const questions = questionService.getQuizQuestions();
    if (config.shuffleQuestions) {
      return [...questions].sort(() => Math.random() - 0.5).slice(0, config.questionCount);
    }
    return questions.slice(0, config.questionCount);
    // Intentionally depend on scalar fields only so config identity changes don't reshuffle mid-quiz
  }, [config.shuffleQuestions, config.questionCount]);

  const currentQuestion = allQuestions[currentIndex];

  const handleSubmitExam = useCallback(() => {
    setSubmitted(true);
    const correct = allQuestions.filter(q => {
      const userAnswer = answers[q.id];
      return Array.isArray(q.correctAnswer) ? q.correctAnswer.includes(userAnswer) : q.correctAnswer === userAnswer;
    }).length;
    setResult({
      score: Math.round((correct / allQuestions.length) * 100),
      totalQuestions: allQuestions.length,
      correctAnswers: correct,
      timeSpent: config.questionCount * 60 - timeLeft,
      passed: correct / allQuestions.length >= 0.7,
      breakdown: {},
    });
    progressService.recordQuizScore('quiz-session', Math.round((correct / allQuestions.length) * 100));
  }, [allQuestions, answers, config.questionCount, timeLeft]);

  const handleSubmitExamRef = useRef(handleSubmitExam);
  useEffect(() => {
    handleSubmitExamRef.current = handleSubmitExam;
  }, [handleSubmitExam]);

  useEffect(() => {
    if (mode === 'exam' && timeLeft > 0 && !submitted) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (mode === 'exam' && timeLeft === 0 && !submitted && currentIndex > 0) {
      handleSubmitExamRef.current();
    }
  }, [timeLeft, mode, submitted, currentIndex]);

  const startQuiz = (selectedMode: string) => {
    setMode(selectedMode);
    setConfig(prev => ({ ...prev, mode: selectedMode as any }));
    setCurrentIndex(0);
    setAnswers({});
    setShowExplanation(false);
    setSubmitted(false);
    setResult(null);
    setVivaConfidence({});
    if (selectedMode === 'exam') {
      setTimeLeft(config.questionCount * 60);
    }
  };

  const handleAnswer = (questionId: string, answer: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    if (config.mode === 'practice') {
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < allQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowExplanation(false);
    } else if (config.mode === 'exam') {
      handleSubmitExam();
    } else {
      setSubmitted(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowExplanation(false);
    }
  };

  const handleReset = () => {
    setMode(null);
    setCurrentIndex(0);
    setAnswers({});
    setShowExplanation(false);
    setSubmitted(false);
    setResult(null);
  };

  if (!mode) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Quiz & Exam Center</h1>
          <p className="text-[var(--color-text-secondary)]">Choose your challenge mode.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MODES.map((m, i) => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card
                variant="default"
                padding="lg"
                className="cursor-pointer hover:border-[var(--color-accent-primary)]/50 transition-all"
                onClick={() => startQuiz(m.id)}
              >
                <h3 className="font-semibold text-[var(--color-text-primary)]">{m.label}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">{m.description}</p>
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="outline" size="sm">{config.questionCount} questions</Badge>
                  {m.id === 'exam' && <Badge variant="outline" size="sm">{config.questionCount} min</Badge>}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto">
        <Card variant="elevated" padding="lg" className="text-center space-y-6">
          <Award className="w-16 h-16 mx-auto" style={{ color: result.passed ? 'var(--color-accent-success)' : 'var(--color-accent-error)' }} />
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
              {result.passed ? 'Excellent Work!' : 'Keep Practicing!'}
            </h2>
            <p className="text-[var(--color-text-secondary)] mt-1">Quiz Complete</p>
          </div>
          <div className="flex items-center justify-center gap-8">
            <div>
              <p className="text-4xl font-bold text-[var(--color-accent-primary)]">{result.score}%</p>
              <p className="text-sm text-[var(--color-text-secondary)]">Score</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[var(--color-accent-success)]">{result.correctAnswers}/{result.totalQuestions}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">Correct</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[var(--color-accent-warning)]">{Math.floor(result.timeSpent / 60)}m</p>
              <p className="text-sm text-[var(--color-text-secondary)]">Time</p>
            </div>
          </div>
          <div className="flex justify-center gap-3">
            <Button variant="primary" onClick={handleReset}>Try Again</Button>
            <Button variant="outline" onClick={handleReset}>Change Mode</Button>
          </div>
          <div className="flex justify-center gap-4 pt-2 border-t border-[var(--color-border-primary)]">
            <Link to="/progress" className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-primary)] flex items-center gap-1 transition-colors">
              <BarChart2 className="w-3 h-3" /> View Progress
            </Link>
            <Link to="/curriculum" className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-primary)] flex items-center gap-1 transition-colors">
              <Layers className="w-3 h-3" /> Back to Curriculum
            </Link>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={handleReset}>← Exit</Button>
          <Badge variant="primary" size="sm">{mode.toUpperCase()}</Badge>
        </div>
        {mode === 'exam' && (
          <div className="flex items-center gap-2 text-sm">
            <Timer className="w-4 h-4" />
            <span className={timeLeft < 60 ? 'text-[var(--color-accent-error)] font-bold' : 'text-[var(--color-text-secondary)]'}>
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
        )}
      </div>

      <ProgressBar value={currentIndex + 1} max={allQuestions.length} size="sm" showLabel />

      {currentQuestion && (
        <Card variant="default" padding="lg" className="space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text-tertiary)]">Question {currentIndex + 1} of {allQuestions.length}</span>
            <Badge variant={currentQuestion.difficulty} size="sm">{currentQuestion.difficulty}</Badge>
          </div>

          {currentQuestion.codeSnippet && (
            <pre className="bg-[var(--color-bg-input)] rounded-lg p-4 font-mono text-sm text-[var(--color-text-primary)] overflow-x-auto border border-[var(--color-border-primary)]">
              {currentQuestion.codeSnippet}
            </pre>
          )}

          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{currentQuestion.question}</h3>

          <div className="space-y-2">
            {currentQuestion.options?.map((option, i) => {
              const isSelected = answers[currentQuestion.id] === option;
              const isCorrect = Array.isArray(currentQuestion.correctAnswer)
                ? currentQuestion.correctAnswer.includes(option)
                : currentQuestion.correctAnswer === option;
              const showResult = showExplanation || submitted;

              return (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleAnswer(currentQuestion.id, option)}
                  disabled={submitted && !config.showExplanations}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    showResult && isCorrect
                      ? 'bg-[var(--color-accent-success)]/10 border-[var(--color-accent-success)]'
                      : showResult && isSelected && !isCorrect
                      ? 'bg-[var(--color-accent-error)]/10 border-[var(--color-accent-error)]'
                      : isSelected
                      ? 'border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/5'
                      : 'border-[var(--color-border-primary)] hover:border-[var(--color-accent-primary)]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs flex-shrink-0">
                      {showResult && isCorrect ? <CheckCircle className="w-3 h-3" /> :
                       showResult && isSelected ? <XCircle className="w-3 h-3" /> :
                       String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-sm">{option}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {mode === 'viva' && showExplanation && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--color-text-tertiary)]">Confidence:</span>
              {['not-sure', 'okay', 'confident'].map(level => (
                <button
                  key={level}
                  onClick={() => setVivaConfidence(prev => ({ ...prev, [currentQuestion.id]: level }))}
                  className={`px-2 py-0.5 rounded text-xs ${
                    vivaConfidence[currentQuestion.id] === level
                      ? 'bg-[var(--color-accent-primary)] text-white'
                      : 'bg-[var(--color-bg-input)] text-[var(--color-text-secondary)]'
                  }`}
                >
                  {level === 'not-sure' ? 'Not Sure' : level === 'okay' ? 'Okay' : 'Confident'}
                </button>
              ))}
            </div>
          )}

          {showExplanation && config.showExplanations && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-4 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)]"
            >
              <p className="font-medium text-[var(--color-text-primary)] mb-1">Explanation</p>
              <p className="text-sm text-[var(--color-text-secondary)]">{currentQuestion.explanation}</p>
              {currentQuestion.romanUrduExplanation && (
                <p className="mt-2 text-sm text-[var(--color-accent-secondary)]">{currentQuestion.romanUrduExplanation}</p>
              )}
            </motion.div>
          )}

          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" onClick={handlePrev} disabled={currentIndex === 0} className="gap-1">
              <ChevronLeft className="w-4 h-4" /> Previous
            </Button>
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!answers[currentQuestion.id]}
              className="gap-1"
            >
              {currentIndex === allQuestions.length - 1 ? 'Finish' : 'Next'}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
