import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, Brain, Timer, Award, Target, ChevronRight, ChevronLeft,
  CheckCircle, XCircle, Flag, RotateCcw, Zap, BarChart3,
  Code2, ArrowLeft, Play, Eye, EyeOff, Star, Trophy, TrendingUp,
} from 'lucide-react';
import { Card, Badge, Button, ProgressBar, Input } from '@/components/ui';
import { assessmentService } from '@/services/assessmentService';
import { masteryService } from '@/services/masteryService';
import { progressService } from '@/services/progressService';
import type { AssessmentQuestion } from '@/types';

const MODES = [
  { id: 'practice', label: 'Practice Mode', description: 'Learn at your own pace with explanations', icon: BookOpen, color: 'var(--color-accent-primary)' },
  { id: 'exam', label: 'Exam Mode', description: 'Timed exam with score and review', icon: Timer, color: 'var(--color-accent-warning)' },
  { id: 'viva', label: 'Viva Mode', description: 'Oral exam style with confidence tracking', icon: Brain, color: 'var(--color-accent-secondary)' },
  { id: 'lab', label: 'Lab Mode', description: 'Hands-on coding challenges with checkpoints', icon: Code2, color: 'var(--color-accent-success)' },
  { id: 'adaptive', label: 'Adaptive Practice', description: 'Smart practice targeting your weak topics', icon: Zap, color: 'var(--color-xp-gold)' },
  { id: 'mock', label: 'Mock Exam', description: 'Full-length mock exam simulating real conditions', icon: Target, color: 'var(--color-accent-error)' },
  { id: 'final', label: 'Final Assessment', description: 'Comprehensive OOP mastery evaluation', icon: Trophy, color: 'var(--color-xp-gold)' },
];

const MODULES = [
  { id: 'all', label: 'All Modules' },
  { id: 'module-01', label: 'M1: OOP Basics' },
  { id: 'module-02', label: 'M2: Classes & Objects' },
  { id: 'module-03', label: 'M3: Constructors' },
  { id: 'module-04', label: 'M4: Encapsulation' },
  { id: 'module-05', label: 'M5: Inheritance' },
  { id: 'module-06', label: 'M6: Polymorphism' },
  { id: 'module-07', label: 'M7: Strings' },
  { id: 'module-08', label: 'M8: Abstraction' },
  { id: 'module-09', label: 'M9: Overriding & Overloading' },
  { id: 'module-10', label: 'M10: Packages' },
  { id: 'module-11', label: 'M11: Exception Handling' },
  { id: 'module-12', label: 'M12: Collections' },
  { id: 'module-13', label: 'M13: Design Patterns' },
  { id: 'module-14', label: 'M14: Java 8+ Features' },
  { id: 'module-15', label: 'M15: Generics' },
];

const DIFFICULTIES = ['all', 'easy', 'medium', 'hard'] as const;

export function AssessmentCenter() {
  const [mode, setMode] = useState<string | null>(null);
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());
  const [vivaConfidence, setVivaConfidence] = useState<Record<string, string>>({});
  const [sessionConfig, setSessionConfig] = useState({
    moduleFilter: 'all',
    difficultyFilter: 'all' as string,
    questionCount: 10,
    typeFilter: 'all',
    timeLimitMinutes: 30,
  });
  const [result, setResult] = useState<any>(null);
  const [showConfig, setShowConfig] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalQuestions = assessmentService.getTotalQuestionCount();
  const moduleCounts = assessmentService.getModuleCounts();

  const currentQuestion = questions[currentIndex];

  const handleSubmit = useCallback(() => {
    if (submitted) return;
    setSubmitted(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    const graded = assessmentService.gradeAnswers(questions, answers);
    setResult(graded);
    progressService.recordQuizScore(`assessment-${mode}`, graded.percentage);
    if (graded.xpEarned > 0) {
      progressService.addXp(graded.xpEarned);
      progressService.recordActivity('quiz', `Assessment (${mode})`, graded.xpEarned);
    }
  }, [questions, answers, mode, submitted]);

  const handleSubmitRef = useRef(handleSubmit);
  useEffect(() => {
    handleSubmitRef.current = handleSubmit;
  }, [handleSubmit]);

  useEffect(() => {
    if (mode === 'exam' || mode === 'mock' || mode === 'final') {
      if (timeLeft > 0 && !submitted) {
        timerRef.current = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
      }
      if (timeLeft === 0 && !submitted && currentIndex > 0) {
        handleSubmitRef.current();
      }
    }
  }, [timeLeft, mode, submitted, currentIndex]);

  const startSession = useCallback((selectedMode: string) => {
    let newQuestions: AssessmentQuestion[] = [];
    let timeLimit = 0;

    switch (selectedMode) {
      case 'practice':
        newQuestions = assessmentService.generatePracticeSession({
          moduleFilter: sessionConfig.moduleFilter,
          difficultyFilter: sessionConfig.difficultyFilter,
          questionCount: sessionConfig.questionCount,
          typeFilter: sessionConfig.typeFilter,
        });
        break;
      case 'exam': {
        const exam = assessmentService.generateExamSession({
          questionCount: sessionConfig.questionCount,
          timeLimitMinutes: sessionConfig.timeLimitMinutes,
          moduleFilter: sessionConfig.moduleFilter,
        });
        newQuestions = exam.questions;
        timeLimit = exam.timeLimitSeconds;
        break;
      }
      case 'viva':
        newQuestions = assessmentService.generatePracticeSession({
          moduleFilter: sessionConfig.moduleFilter,
          difficultyFilter: sessionConfig.difficultyFilter,
          questionCount: Math.min(sessionConfig.questionCount, 15),
          typeFilter: sessionConfig.typeFilter,
        });
        break;
      case 'lab':
        newQuestions = assessmentService.generatePracticeSession({
          moduleFilter: sessionConfig.moduleFilter,
          difficultyFilter: sessionConfig.difficultyFilter,
          questionCount: Math.min(sessionConfig.questionCount, 5),
          typeFilter: 'code-completion',
        });
        break;
      case 'adaptive': {
        const weakTopics = Object.keys(masteryService.getAllMastery()
          .filter(m => m.score < 50)
          .reduce((acc, m) => ({ ...acc, [m.concept]: m }), {}));
        newQuestions = assessmentService.generateAdaptiveSession(
          weakTopics.length > 0 ? weakTopics : ['oop-basics', 'classes', 'inheritance'],
          sessionConfig.questionCount
        );
        break;
      }
      case 'mock': {
        const mock = assessmentService.generateMockExam();
        newQuestions = mock.questions;
        timeLimit = mock.timeLimitSeconds;
        break;
      }
      case 'final': {
        const final = assessmentService.generateFinalAssessment();
        newQuestions = final.questions;
        timeLimit = final.timeLimitSeconds;
        break;
      }
    }

    setMode(selectedMode);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setAnswers({});
    setShowExplanation(false);
    setSubmitted(false);
    setResult(null);
    setTimeLeft(timeLimit);
    setMarkedForReview(new Set());
    setVivaConfidence({});
    setShowConfig(false);
  }, [sessionConfig]);

  const handleAnswer = useCallback((questionId: string, answer: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    if (mode === 'practice' || mode === 'viva' || mode === 'adaptive') {
      setShowExplanation(true);
    }
  }, [submitted, mode]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowExplanation(false);
    } else if (mode !== 'practice' && mode !== 'viva' && mode !== 'adaptive' && mode !== 'lab') {
      handleSubmit();
    } else {
      if (submitted) return;
      setSubmitted(true);
      const graded = assessmentService.gradeAnswers(questions, answers);
      setResult(graded);
      progressService.recordQuizScore(`assessment-${mode}`, graded.percentage);
      if (graded.xpEarned > 0) {
        progressService.addXp(graded.xpEarned);
        progressService.recordActivity('quiz', `Assessment (${mode})`, graded.xpEarned);
      }
    }
  }, [currentIndex, questions, mode, handleSubmit, answers, submitted]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowExplanation(false);
    }
  }, [currentIndex]);

  const toggleMarkForReview = useCallback(() => {
    if (!currentQuestion) return;
    setMarkedForReview(prev => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) next.delete(currentQuestion.id);
      else next.add(currentQuestion.id);
      return next;
    });
  }, [currentQuestion]);

  const handleReset = useCallback(() => {
    setMode(null);
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers({});
    setShowExplanation(false);
    setSubmitted(false);
    setTimeLeft(0);
    setResult(null);
    setShowConfig(true);
    setMarkedForReview(new Set());
    setVivaConfidence({});
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const answeredCount = Object.keys(answers).length;
  const markedCount = markedForReview.size;

  if (!mode) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Assessment Center</h1>
          <p className="text-[var(--color-text-secondary)] mt-1">
            {totalQuestions} questions across {Object.keys(moduleCounts).length} modules
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {MODULES.slice(1).map(m => (
            <div key={m.id} className="flex items-center justify-between p-2 rounded-lg bg-[var(--color-bg-secondary)]">
              <span className="text-xs text-[var(--color-text-secondary)]">{m.label}</span>
              <Badge variant="outline" size="sm">{moduleCounts[m.id] || 0}</Badge>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODES.map((m, i) => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card
                variant="default"
                padding="lg"
                className="cursor-pointer hover:border-[var(--color-accent-primary)]/50 transition-all h-full"
                onClick={() => { setMode(m.id); setShowConfig(true); }}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${m.color}20` }}>
                    <m.icon className="w-5 h-5" style={{ color: m.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[var(--color-text-primary)]">{m.label}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">{m.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (showConfig && !result) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Button variant="ghost" onClick={handleReset} className="gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Modes
        </Button>
        <Card variant="elevated" padding="lg" className="space-y-6">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
            Configure {MODES.find(m => m.id === mode)?.label}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[var(--color-text-primary)] mb-2 block">Module</label>
              <select
                value={sessionConfig.moduleFilter}
                onChange={e => setSessionConfig(prev => ({ ...prev, moduleFilter: e.target.value }))}
                className="w-full p-2 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-bg-input)] text-[var(--color-text-primary)]"
              >
                {MODULES.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--color-text-primary)] mb-2 block">Difficulty</label>
              <div className="flex gap-2">
                {DIFFICULTIES.map(d => (
                  <Button key={d} variant={sessionConfig.difficultyFilter === d ? 'primary' : 'outline'} size="sm"
                    onClick={() => setSessionConfig(prev => ({ ...prev, difficultyFilter: d }))}>
                    {d === 'all' ? 'All' : d.charAt(0).toUpperCase() + d.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {(mode === 'practice' || mode === 'exam' || mode === 'viva' || mode === 'adaptive') && (
              <div>
                <label className="text-sm font-medium text-[var(--color-text-primary)] mb-2 block">
                  Questions: {sessionConfig.questionCount}
                </label>
                <input type="range" min={5} max={50} value={sessionConfig.questionCount}
                  onChange={e => setSessionConfig(prev => ({ ...prev, questionCount: parseInt(e.target.value) }))}
                  className="w-full" />
              </div>
            )}

            {(mode === 'exam' || mode === 'mock' || mode === 'final') && (
              <div>
                <label className="text-sm font-medium text-[var(--color-text-primary)] mb-2 block">
                  Time Limit: {mode === 'mock' ? '50' : mode === 'final' ? '60' : sessionConfig.timeLimitMinutes} minutes
                </label>
                {mode === 'exam' && (
                  <input type="range" min={10} max={120} value={sessionConfig.timeLimitMinutes}
                    onChange={e => setSessionConfig(prev => ({ ...prev, timeLimitMinutes: parseInt(e.target.value) }))}
                    className="w-full" />
                )}
              </div>
            )}
          </div>

          <Button variant="primary" size="lg" onClick={() => startSession(mode)} className="w-full gap-2">
            <Play className="w-4 h-4" /> Start {MODES.find(m => m.id === mode)?.label}
          </Button>
        </Card>
      </div>
    );
  }

  if (result) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto space-y-6">
        <Card variant="elevated" padding="lg" className="text-center space-y-6">
          <div className="flex justify-center">
            {result.percentage >= 80 ? (
              <Trophy className="w-16 h-16" style={{ color: 'var(--color-xp-gold)' }} />
            ) : result.percentage >= 50 ? (
              <Award className="w-16 h-16" style={{ color: 'var(--color-accent-success)' }} />
            ) : (
              <Target className="w-16 h-16" style={{ color: 'var(--color-accent-error)' }} />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
              {result.percentage >= 80 ? 'Excellent Work!' : result.percentage >= 50 ? 'Good Effort!' : 'Keep Practicing!'}
            </h2>
            <p className="text-[var(--color-text-secondary)] mt-1">{MODES.find(m => m.id === mode)?.label} Complete</p>
          </div>
          <div className="flex items-center justify-center gap-8">
            <div>
              <p className="text-4xl font-bold text-[var(--color-accent-primary)]">{result.percentage}%</p>
              <p className="text-sm text-[var(--color-text-secondary)]">Score</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[var(--color-accent-success)]">{result.correctAnswers}/{result.totalQuestions}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">Correct</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[var(--color-xp-gold)]">+{result.xpEarned}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">XP Earned</p>
            </div>
          </div>
        </Card>

        {result.weakTopics.length > 0 && (
          <Card variant="default" padding="lg">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Topics to Review
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.weakTopics.map((t: string) => (
                <Badge key={t} variant="error" size="sm">{t}</Badge>
              ))}
            </div>
          </Card>
        )}

        {result.strongTopics.length > 0 && (
          <Card variant="default" padding="lg">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
              <Star className="w-4 h-4" /> Strong Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.strongTopics.map((t: string) => (
                <Badge key={t} variant="success" size="sm">{t}</Badge>
              ))}
            </div>
          </Card>
        )}

        {Object.keys(result.moduleBreakdown).length > 0 && (
          <Card variant="default" padding="lg">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> Module Breakdown
            </h3>
            <div className="space-y-2">
              {Object.entries(result.moduleBreakdown).map(([mod, data]: [string, any]) => (
                <div key={mod} className="flex items-center gap-3">
                  <span className="text-sm text-[var(--color-text-secondary)] w-24 truncate">{mod}</span>
                  <div className="flex-1">
                    <ProgressBar value={data.correct} max={data.total} size="sm" showLabel />
                  </div>
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">{data.percentage}%</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="flex justify-center gap-3">
          <Button variant="primary" onClick={() => { setSubmitted(false); setResult(null); setShowConfig(true); setMode(mode); }}>
            <RotateCcw className="w-4 h-4 mr-2" /> Try Again
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Change Mode
          </Button>
        </div>
      </motion.div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={handleReset}>← Exit</Button>
          <Badge variant="primary" size="sm">{mode?.toUpperCase()}</Badge>
          <Badge variant="outline" size="sm">{currentIndex + 1}/{questions.length}</Badge>
        </div>
        <div className="flex items-center gap-4">
          {markedCount > 0 && (
            <span className="flex items-center gap-1 text-sm text-[var(--color-accent-warning)]">
              <Flag className="w-4 h-4" /> {markedCount} marked
            </span>
          )}
          <span className="text-sm text-[var(--color-text-secondary)]">
            {answeredCount}/{questions.length} answered
          </span>
          {(mode === 'exam' || mode === 'mock' || mode === 'final') && (
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4" />
              <span className={timeLeft < 60 ? 'text-[var(--color-accent-error)] font-bold' : 'text-[var(--color-text-secondary)]'}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {questions.map((q, i) => (
          <button key={q.id}
            onClick={() => { setCurrentIndex(i); setShowExplanation(false); }}
            className={`w-8 h-8 rounded-full text-xs font-medium flex-shrink-0 transition-all ${
              i === currentIndex ? 'bg-[var(--color-accent-primary)] text-white scale-110' :
              answers[q.id] ? 'bg-[var(--color-accent-success)]/20 text-[var(--color-accent-success)]' :
              markedForReview.has(q.id) ? 'bg-[var(--color-accent-warning)]/20 text-[var(--color-accent-warning)]' :
              'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <Card variant="default" padding="lg" className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant={currentQuestion.difficulty} size="sm">{currentQuestion.difficulty}</Badge>
            <Badge variant="outline" size="sm">{currentQuestion.type}</Badge>
            <Badge variant="outline" size="sm">{currentQuestion.moduleId}</Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={toggleMarkForReview}
            className={markedForReview.has(currentQuestion.id) ? 'text-[var(--color-accent-warning)]' : ''}>
            <Flag className="w-4 h-4" />
          </Button>
        </div>

        {currentQuestion.codeSnippet && (
          <pre className="bg-[var(--color-bg-input)] rounded-lg p-4 font-mono text-sm text-[var(--color-text-primary)] overflow-x-auto border border-[var(--color-border-primary)]">
            {currentQuestion.codeSnippet}
          </pre>
        )}

        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{currentQuestion.question}</h3>

        {currentQuestion.options && currentQuestion.options.length > 0 && (
          <div className="space-y-2">
            {currentQuestion.options.map((option, i) => {
              const isSelected = answers[currentQuestion.id] === option;
              const isCorrect = Array.isArray(currentQuestion.correctAnswer)
                ? currentQuestion.correctAnswer.includes(option)
                : currentQuestion.correctAnswer === option;
              const showResult = showExplanation || submitted;

              return (
                <motion.button key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleAnswer(currentQuestion.id, option)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    showResult && isCorrect ? 'bg-[var(--color-accent-success)]/10 border-[var(--color-accent-success)]' :
                    showResult && isSelected && !isCorrect ? 'bg-[var(--color-accent-error)]/10 border-[var(--color-accent-error)]' :
                    isSelected ? 'border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/5' :
                    'border-[var(--color-border-primary)] hover:border-[var(--color-accent-primary)]/50'
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
        )}

        {currentQuestion.type === 'code-completion' && !currentQuestion.options && (
          <div className="space-y-3">
            <Input
              value={answers[currentQuestion.id] || ''}
              onChange={e => handleAnswer(currentQuestion.id, e.target.value)}
              placeholder="Type your answer..."
              className="font-mono"
            />
          </div>
        )}

        {mode === 'viva' && showExplanation && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--color-text-tertiary)]">Confidence:</span>
            {['not-sure', 'okay', 'confident'].map(level => (
              <button key={level}
                onClick={() => setVivaConfidence(prev => ({ ...prev, [currentQuestion.id]: level }))}
                className={`px-3 py-1 rounded text-xs ${
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

        {showExplanation && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            className="p-4 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)]">
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
          <div className="flex gap-2">
            {(mode === 'practice' || mode === 'viva' || mode === 'adaptive' || mode === 'lab') && (
              <Button variant="outline" onClick={() => setShowExplanation(!showExplanation)}>
                {showExplanation ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                {showExplanation ? 'Hide' : 'Show'} Explanation
              </Button>
            )}
            <Button variant="primary" onClick={handleNext} className="gap-1">
              {currentIndex === questions.length - 1 ? 'Finish' : 'Next'}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
