import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, BookOpen, Eye, Target, Rocket } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button } from '@/components/ui';

const STORAGE_KEY = 'oop-universe-onboarding-completed';

interface Step {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  features?: string[];
  cta?: string;
  gradient: string;
}

const steps: Step[] = [
  {
    icon: Zap,
    title: 'WELCOME TO OOP UNIVERSE',
    subtitle: 'Your interactive Java OOP learning environment.',
    gradient: 'from-[var(--color-accent-primary)]/20 to-[var(--color-accent-secondary)]/10',
  },
  {
    icon: BookOpen,
    title: 'LEARN',
    subtitle: 'Understand concepts through structured university-level lessons.',
    features: ['15 modules', 'Roman Urdu explanations', 'Real-world examples'],
    gradient: 'from-blue-500/20 to-cyan-500/10',
  },
  {
    icon: Eye,
    title: 'SEE IT',
    subtitle: 'Visualize OOP concepts in immersive 3D environments.',
    features: ['Class blueprints', 'Inheritance hierarchies', 'Polymorphism in action'],
    gradient: 'from-purple-500/20 to-indigo-500/10',
  },
  {
    icon: Target,
    title: 'PRACTICE',
    subtitle: 'Solve scenarios, mistakes, quizzes and debugging challenges.',
    features: ['Adaptive questions', 'Debugging labs', 'Exam preparation'],
    gradient: 'from-amber-500/20 to-orange-500/10',
  },
  {
    icon: Rocket,
    title: "YOU'RE READY",
    subtitle: 'Start your OOP journey today.',
    cta: 'Start Module 01 — OOP Foundation',
    gradient: 'from-emerald-500/20 to-green-500/10',
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export function OnboardingPage() {
  const navigate = useNavigate();
  const [[currentStep, direction], setStep] = useState<[number, number]>([0, 0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === 'true') {
      navigate('/learn', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    setProgress(((currentStep + 1) / steps.length) * 100);
  }, [currentStep]);

  const goToStep = useCallback(
    (index: number) => {
      if (index < 0 || index >= steps.length) return;
      setStep([index, index > currentStep ? 1 : -1]);
    },
    [currentStep]
  );

  const handleNext = useCallback(() => {
    if (currentStep === steps.length - 1) {
      localStorage.setItem(STORAGE_KEY, 'true');
      navigate('/learn');
    } else {
      goToStep(currentStep + 1);
    }
  }, [currentStep, goToStep, navigate]);

  const handlePrev = useCallback(() => {
    goToStep(currentStep - 1);
  }, [currentStep, goToStep]);

  const handleSkip = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'true');
    navigate('/learn');
  }, [navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Escape') {
        handleSkip();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handleSkip, handlePrev]);

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 flex flex-col bg-[var(--color-bg-primary)]">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--color-bg-tertiary)]">
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Skip button */}
      {currentStep < steps.length - 1 && (
        <div className="absolute top-6 right-6 z-10">
          <Button variant="ghost" size="sm" onClick={handleSkip} className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]">
            Skip
          </Button>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full max-w-lg text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className="mb-8 flex justify-center"
            >
              <div
                className={cn(
                  'w-24 h-24 rounded-2xl flex items-center justify-center bg-gradient-to-br',
                  step.gradient,
                  'border border-[var(--color-border-primary)] shadow-[var(--shadow-xl)]'
                )}
              >
                <Icon className="w-12 h-12 text-[var(--color-text-primary)]" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4 tracking-tight"
            >
              {step.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed"
            >
              {step.subtitle}
            </motion.p>

            {/* Features */}
            {step.features && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="flex flex-wrap items-center justify-center gap-2 mb-8"
              >
                {step.features.map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] border border-[var(--color-border-primary)]"
                  >
                    {feature}
                  </span>
                ))}
              </motion.div>
            )}

            {/* CTA button */}
            {step.cta && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mb-4"
              >
                <Button size="lg" onClick={handleNext} className="group text-base px-8 py-3.5">
                  {step.cta}
                  <Rocket className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div className="px-6 pb-8 pt-4">
        <div className="max-w-lg mx-auto">
          {/* Step dots */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                aria-label={`Go to step ${index + 1}`}
                className={cn(
                  'rounded-full transition-all duration-300',
                  index === currentStep
                    ? 'w-8 h-2 bg-[var(--color-accent-primary)]'
                    : 'w-2 h-2 bg-[var(--color-border-primary)] hover:bg-[var(--color-text-tertiary)]'
                )}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          {currentStep < steps.length - 1 && (
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="md"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="text-[var(--color-text-secondary)]"
              >
                Previous
              </Button>
              <Button size="md" onClick={handleNext} className="group">
                Next
                <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
              </Button>
            </div>
          )}

          {currentStep === steps.length - 1 && (
            <div className="flex justify-center">
              <Button variant="ghost" size="md" onClick={handleSkip} className="text-[var(--color-text-tertiary)]">
                Skip for now
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
