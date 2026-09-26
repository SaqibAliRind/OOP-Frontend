import { useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, BookOpen, Target, Shield, BarChart2,
  CheckCircle, XCircle, Clock, Play, ChevronRight, Sparkles,
  BookMarked, GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { curriculumService } from '@/services/curriculumService';
import { progressService } from '@/services/progressService';

// ─── Session step types ──────────────────────────────────────────────────────
type StepType = 'intro' | 'concept' | 'lesson' | 'practice' | 'debug' | 'summary';

interface SessionStep {
  id: string;
  type: StepType;
  title: string;
  description: string;
  route?: string;
  externalRoute?: string;
  completed: boolean;
  skipped: boolean;
}

// ─── Local session state (persisted in sessionStorage) ────────────────────────
const SESSION_KEY = 'oop-universe-study-session';

interface SessionState {
  lessonId: string | null;
  steps: SessionStep[];
  currentStepIndex: number;
  startedAt: string;
  completedAt: string | null;
  xpEarned: number;
}

function loadSession(): SessionState | null {
  try {
    const s = sessionStorage.getItem(SESSION_KEY);
    if (!s) return null;
    const parsed: unknown = JSON.parse(s);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return null;
    const rec = parsed as Record<string, unknown>;
    if (!Array.isArray(rec.steps) || typeof rec.currentStepIndex !== 'number') return null;
    if (!Number.isFinite(rec.currentStepIndex) || rec.currentStepIndex < 0) return null;
    if (rec.currentStepIndex >= rec.steps.length) return null;
    return {
      lessonId: typeof rec.lessonId === 'string' ? rec.lessonId : null,
      steps: rec.steps as SessionStep[],
      currentStepIndex: Math.floor(rec.currentStepIndex),
      startedAt: typeof rec.startedAt === 'string' ? rec.startedAt : new Date().toISOString(),
      completedAt: typeof rec.completedAt === 'string' ? rec.completedAt : null,
      xpEarned: typeof rec.xpEarned === 'number' && Number.isFinite(rec.xpEarned) && rec.xpEarned >= 0
        ? rec.xpEarned
        : 0,
    };
  } catch {
    return null;
  }
}

function saveSession(state: SessionState): void {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function clearSession(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

function buildSteps(lessonId: string | null): SessionStep[] {
  const lesson = lessonId ? curriculumService.getLesson(lessonId) : null;
  const lessonProgress = lessonId ? progressService.getLessonProgress(lessonId) : null;
  const isAlreadyComplete = lessonProgress?.completed ?? false;

  const steps: SessionStep[] = [
    {
      id: 'step-intro',
      type: 'intro',
      title: 'Session Overview',
      description: 'Review your learning objectives for this session.',
      completed: false,
      skipped: false,
    },
  ];

  if (lesson) {
    if (!isAlreadyComplete) {
      steps.push({
        id: `step-concept-${lesson.id}`,
        type: 'concept',
        title: 'Key Concepts',
        description: lesson.description ?? `Review the core concepts of ${lesson.title}.`,
        completed: lessonProgress?.read ?? false,
        skipped: false,
      });

      steps.push({
        id: `step-lesson-${lesson.id}`,
        type: 'lesson',
        title: lesson.title,
        description: `Study the full lesson. Complete all sections to mark this step done.`,
        externalRoute: `/lesson/${lesson.id}`,
        completed: lessonProgress?.completed ?? false,
        skipped: false,
      });
    } else {
      steps.push({
        id: `step-review-${lesson.id}`,
        type: 'lesson',
        title: `Review: ${lesson.title}`,
        description: 'This lesson is already complete. Open it for a quick review.',
        externalRoute: `/lesson/${lesson.id}`,
        completed: true,
        skipped: false,
      });
    }
  }

  steps.push({
    id: 'step-practice',
    type: 'practice',
    title: 'Practice Questions',
    description: 'Attempt practice questions to reinforce what you learned.',
    externalRoute: '/practice',
    completed: false,
    skipped: false,
  });

  steps.push({
    id: 'step-debug',
    type: 'debug',
    title: 'Debugging Challenge',
    description: 'Test your understanding by solving a debugging challenge.',
    externalRoute: '/debug',
    completed: false,
    skipped: false,
  });

  steps.push({
    id: 'step-summary',
    type: 'summary',
    title: 'Session Summary',
    description: 'Review what you accomplished in this session.',
    completed: false,
    skipped: false,
  });

  return steps;
}

// ─── Step icons ──────────────────────────────────────────────────────────────
const STEP_ICONS: Record<StepType, React.ReactNode> = {
  intro: <Sparkles className="w-4 h-4" />,
  concept: <BookMarked className="w-4 h-4" />,
  lesson: <BookOpen className="w-4 h-4" />,
  practice: <Target className="w-4 h-4" />,
  debug: <Shield className="w-4 h-4" />,
  summary: <BarChart2 className="w-4 h-4" />,
};

const STEP_COLORS: Record<StepType, string> = {
  intro: 'text-purple-400',
  concept: 'text-indigo-400',
  lesson: 'text-blue-400',
  practice: 'text-emerald-400',
  debug: 'text-red-400',
  summary: 'text-yellow-400',
};

// ─── Step content components ──────────────────────────────────────────────────
function IntroStep({ lessonId }: { lessonId: string | null }) {
  const lesson = lessonId ? curriculumService.getLesson(lessonId) : null;

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
        <h3 className="text-sm font-semibold text-purple-300 mb-1">Your Session Plan</h3>
        {lesson ? (
          <div>
            <p className="text-xs text-white/70 mb-2">Focused on: <strong className="text-white">{lesson.title}</strong></p>
            {lesson.learningObjectives && lesson.learningObjectives.length > 0 && (
              <div className="space-y-1.5 mt-2">
                <p className="text-[10px] text-white/40 uppercase tracking-wider">Learning Objectives</p>
                {lesson.learningObjectives.slice(0, 4).map(obj => (
                  <div key={obj.id} className="flex items-start gap-2">
                    <ChevronRight className="w-3 h-3 text-purple-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-white/60">{obj.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="text-xs text-white/60">General study session — practice, debug, and revise.</p>
        )}
      </div>

      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
        <p className="text-[10px] text-white/40 mb-2">⚠ Important</p>
        <p className="text-xs text-white/50">
          Opening an activity does <strong className="text-white/70">not</strong> automatically mark it complete.
          Use the "Mark Done" button after genuinely finishing each activity.
        </p>
      </div>
    </div>
  );
}

function ConceptStep({ lessonId }: { lessonId: string | null }) {
  const lesson = lessonId ? curriculumService.getLesson(lessonId) : null;
  if (!lesson) return <p className="text-xs text-white/40">No lesson selected.</p>;

  return (
    <div className="space-y-3">
      <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
        <h3 className="text-sm font-semibold text-indigo-300 mb-2">{lesson.title}</h3>
        <p className="text-xs text-white/60">{lesson.description}</p>
      </div>
      {lesson.keyPoints && lesson.keyPoints.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] text-white/40 uppercase tracking-wider">Key Points</p>
          {lesson.keyPoints.slice(0, 5).map(kp => (
            <div key={kp.id} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
              <p className="text-xs font-medium text-white/80">{kp.title}</p>
              <p className="text-[11px] text-white/50 mt-0.5">{kp.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LessonStep({ step }: { step: SessionStep }) {
  const navigate = useNavigate();
  return (
    <div className="space-y-3">
      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
        <BookOpen className="w-8 h-8 text-blue-400/50 mx-auto mb-2" />
        <h3 className="text-sm font-semibold text-blue-300 mb-1">{step.title}</h3>
        <p className="text-xs text-white/50 mb-3">{step.description}</p>
        {step.completed ? (
          <div className="flex items-center justify-center gap-2 text-emerald-400">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Completed</span>
          </div>
        ) : (
          <Button
            variant="primary"
            size="md"
            onClick={() => step.externalRoute && navigate(step.externalRoute)}
          >
            <Play className="w-3.5 h-3.5" />
            Open Lesson
          </Button>
        )}
      </div>
      <p className="text-[10px] text-white/25 text-center">
        The lesson will open in the main app. Return here to mark it done.
      </p>
    </div>
  );
}

function PracticeStep() {
  const navigate = useNavigate();
  return (
    <div className="space-y-3">
      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
        <Target className="w-8 h-8 text-emerald-400/50 mx-auto mb-2" />
        <h3 className="text-sm font-semibold text-emerald-300 mb-1">Practice Questions</h3>
        <p className="text-xs text-white/50 mb-3">
          Answer at least 5 practice questions to strengthen your understanding.
        </p>
        <Button
          variant="success"
          size="md"
          onClick={() => navigate('/practice')}
        >
          <Target className="w-3.5 h-3.5" />
          Go to Practice
        </Button>
      </div>
      <p className="text-[10px] text-white/25 text-center">
        Return here after completing practice questions to mark this step done.
      </p>
    </div>
  );
}

function DebugStep() {
  const navigate = useNavigate();
  return (
    <div className="space-y-3">
      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
        <Shield className="w-8 h-8 text-red-400/50 mx-auto mb-2" />
        <h3 className="text-sm font-semibold text-red-300 mb-1">Debugging Challenge</h3>
        <p className="text-xs text-white/50 mb-3">
          Find and fix bugs in OOP code to deepen your understanding.
        </p>
        <Button
          variant="danger"
          size="md"
          onClick={() => navigate('/debug')}
        >
          <Shield className="w-3.5 h-3.5" />
          Go to Debug Lab
        </Button>
      </div>
      <p className="text-[10px] text-white/25 text-center">
        Return here after solving the challenge to mark this step done.
      </p>
    </div>
  );
}

function SummaryStep({ steps }: { steps: SessionStep[] }) {
  const navigate = useNavigate();
  const completed = steps.filter(s => s.completed && s.type !== 'summary').length;
  const skipped = steps.filter(s => s.skipped).length;
  const total = steps.filter(s => s.type !== 'intro' && s.type !== 'summary').length;

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center">
        <GraduationCap className="w-8 h-8 text-yellow-400/60 mx-auto mb-2" />
        <h3 className="text-sm font-semibold text-yellow-300 mb-1">Session Complete!</h3>
        <p className="text-xs text-white/50">
          {completed}/{total} activities completed · {skipped} skipped
        </p>
      </div>

      <div className="space-y-2">
        {steps.filter(s => s.type !== 'intro' && s.type !== 'summary').map(step => (
          <div key={step.id} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
            {step.completed
              ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              : step.skipped
              ? <XCircle className="w-3.5 h-3.5 text-white/20 flex-shrink-0" />
              : <div className="w-3.5 h-3.5 rounded-full border border-white/20 flex-shrink-0" />
            }
            <span className={`text-xs ${step.completed ? 'text-white/80' : 'text-white/35'}`}>
              {step.title}
            </span>
            {step.completed && <span className="ml-auto text-[10px] text-emerald-400">Done</span>}
            {step.skipped && <span className="ml-auto text-[10px] text-white/25">Skipped</span>}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate('/learning-path')}>
          Back to Learning Path
        </Button>
        <Button variant="primary" size="sm" className="flex-1" onClick={() => navigate('/progress')}>
          <BarChart2 className="w-3.5 h-3.5" />
          View Progress
        </Button>
      </div>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export function StudySessionPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get('lesson');

  const [session, setSession] = useState<SessionState>(() => {
    const existing = loadSession();
    if (existing && existing.lessonId === lessonId) return existing;
    // Build fresh session
    const steps = buildSteps(lessonId);
    const fresh: SessionState = {
      lessonId,
      steps,
      currentStepIndex: 0,
      startedAt: new Date().toISOString(),
      completedAt: null,
      xpEarned: 0,
    };
    saveSession(fresh);
    return fresh;
  });

  const currentStep = session.steps[session.currentStepIndex];
  const isFirst = session.currentStepIndex === 0;
  const isLast = session.currentStepIndex === session.steps.length - 1;

  const updateSession = useCallback((updater: (prev: SessionState) => SessionState) => {
    setSession(prev => {
      const next = updater(prev);
      saveSession(next);
      return next;
    });
  }, []);

  const handleNext = () => {
    if (isLast) return;
    updateSession(prev => ({ ...prev, currentStepIndex: prev.currentStepIndex + 1 }));
  };

  const handleBack = () => {
    if (isFirst) return;
    updateSession(prev => ({ ...prev, currentStepIndex: prev.currentStepIndex - 1 }));
  };

  const handleMarkDone = () => {
    updateSession(prev => ({
      ...prev,
      steps: prev.steps.map((s, i) =>
        i === prev.currentStepIndex ? { ...s, completed: true } : s
      ),
    }));
  };

  const handleSkip = () => {
    updateSession(prev => ({
      ...prev,
      steps: prev.steps.map((s, i) =>
        i === prev.currentStepIndex ? { ...s, skipped: true } : s
      ),
      currentStepIndex: Math.min(prev.currentStepIndex + 1, prev.steps.length - 1),
    }));
  };

  const handleExit = () => {
    clearSession();
    navigate('/learning-path');
  };

  const progressPct = Math.round(((session.currentStepIndex + 1) / session.steps.length) * 100);

  return (
    <div
      className="min-h-screen bg-[var(--color-bg-primary)]"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Header */}
      <header className="border-b border-white/8 bg-[#0a0f1a]/95 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={handleExit}
            className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white/70 transition-colors"
            aria-label="Exit session"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex-1">
            <p className="text-[10px] text-white/30 font-mono uppercase tracking-wider">Study Session</p>
            <p className="text-sm font-semibold text-white">
              {session.lessonId ? curriculumService.getLesson(session.lessonId)?.title ?? 'Session' : 'General Session'}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-white/30">
            <Clock className="w-3 h-3" />
            Step {session.currentStepIndex + 1}/{session.steps.length}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </header>

      {/* Step nav */}
      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="flex items-center gap-1 overflow-x-auto pb-1">
          {session.steps.map((step, i) => (
            <button
              key={step.id}
              onClick={() => updateSession(prev => ({ ...prev, currentStepIndex: i }))}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium whitespace-nowrap transition-all border flex-shrink-0 ${
                i === session.currentStepIndex
                  ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                  : step.completed
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  : step.skipped
                  ? 'bg-white/5 border-white/5 text-white/20'
                  : 'bg-white/[0.03] border-white/5 text-white/35 hover:text-white/60'
              }`}
            >
              <span className={i === session.currentStepIndex ? 'text-blue-400' : step.completed ? 'text-emerald-400' : STEP_COLORS[step.type]}>
                {step.completed ? <CheckCircle className="w-3 h-3" /> : STEP_ICONS[step.type]}
              </span>
              {step.title}
            </button>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="max-w-2xl mx-auto px-4 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Step header */}
            <div className="flex items-center gap-2 mb-4">
              <div className={`p-2 rounded-xl bg-white/5 ${STEP_COLORS[currentStep.type]}`}>
                {STEP_ICONS[currentStep.type]}
              </div>
              <div>
                <h2 className="text-base font-bold text-white">{currentStep.title}</h2>
                <p className="text-xs text-white/45">{currentStep.description}</p>
              </div>
            </div>

            {/* Step-specific content */}
            <div className="mb-6">
              {currentStep.type === 'intro' && <IntroStep lessonId={session.lessonId} />}
              {currentStep.type === 'concept' && <ConceptStep lessonId={session.lessonId} />}
              {currentStep.type === 'lesson' && <LessonStep step={currentStep} />}
              {currentStep.type === 'practice' && <PracticeStep />}
              {currentStep.type === 'debug' && <DebugStep />}
              {currentStep.type === 'summary' && <SummaryStep steps={session.steps} />}
            </div>

            {/* Navigation controls */}
            {currentStep.type !== 'summary' && (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  disabled={isFirst}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </Button>

                <div className="flex-1 flex gap-2 justify-end">
                  {currentStep.type !== 'intro' && !currentStep.completed && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSkip}
                      className="text-white/30"
                    >
                      Skip
                    </Button>
                  )}

                  {currentStep.type !== 'intro' && !currentStep.completed && (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={handleMarkDone}
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Mark Done
                    </Button>
                  )}

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleNext}
                    disabled={isLast}
                  >
                    Next
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default StudySessionPage;
