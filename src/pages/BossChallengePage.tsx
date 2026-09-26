import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronLeft, CheckCircle, Lightbulb, Zap, Trophy, RotateCcw, ArrowRight } from 'lucide-react';
import { Button, Badge, EmptyState } from '@/components/ui';
import { HintSystem } from '@/components/learning/HintSystem';
import { useBossChallenge } from '@/hooks/useProjectSimulator';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BossChallengePage() {
  const { bossId } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isUr = language === 'ur';
  const { boss, progress, currentObjective, submitAnswer, reset } = useBossChallenge(bossId);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ correct: boolean; text: string } | null>(null);
  const [hintCount, setHintCount] = useState(0);

  if (!boss) {
    return (
      <div className="max-w-3xl mx-auto">
        <EmptyState
          icon={<Shield className="w-10 h-10" />}
          title={isUr ? 'Boss nahi mila' : 'Boss not found'}
          description={isUr ? 'Yeh challenge exist nahi karta.' : 'This challenge does not exist.'}
          action={{ label: isUr ? 'Projects par jayein' : 'Back to projects', onClick: () => navigate('/projects') }}
        />
      </div>
    );
  }

  const handleHint = () => {
    setHintCount(c => c + 1);
  };

  const handleSubmit = () => {
    if (!currentObjective || selected === null) return;
    const correct = submitAnswer(currentObjective.id, selected);
    setFeedback({
      correct,
      text: correct
        ? (isUr ? currentObjective.explanationUrdu : currentObjective.explanation)
        : (isUr
            ? `Sahi jawab: ${currentObjective.options[currentObjective.correctIndex]} \u2014 ${currentObjective.explanationUrdu}`
            : `Correct answer: ${currentObjective.options[currentObjective.correctIndex]} \u2014 ${currentObjective.explanation}`),
    });
  };

  const handleNext = () => {
    setSelected(null);
    setFeedback(null);
    setHintCount(0);
  };

  const totalObjectives = boss.objectives.length;
  const completedCount = progress.completedObjectives.length;
  const percent = Math.round((completedCount / totalObjectives) * 100);

  return (
    <div className="max-w-3xl mx-auto pb-12 space-y-5">
      <div className="flex items-center gap-3 flex-wrap">
        <Button variant="ghost" size="sm" onClick={() => navigate('/projects')} leftIcon={<ChevronLeft className="w-4 h-4" />}>
          {isUr ? 'Projects' : 'Projects'}
        </Button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[var(--color-xp-gold)]" />
            <h1 className="text-lg font-bold text-[var(--color-text-primary)]">
              {isUr ? boss.titleUrdu : boss.title}
            </h1>
          </div>
          <p className="text-xs text-[var(--color-text-tertiary)]">
            {isUr ? boss.briefingUrdu : boss.briefing}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={boss.difficulty === 'expert' ? 'error' : 'warning'} size="sm">
            {boss.difficulty.toUpperCase()}
          </Badge>
          <Badge variant="xp" size="sm">+{boss.xpReward} XP</Badge>
          <Button variant="ghost" size="icon" onClick={reset} title={isUr ? 'Reset' : 'Reset'}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {boss.conceptsTested.map(c => (
          <Badge key={c} variant="outline" size="sm">{c}</Badge>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between text-xs text-[var(--color-text-tertiary)] mb-1">
          <span>{completedCount}/{totalObjectives} {isUr ? 'objectives' : 'objectives'}</span>
          <span>{percent}%</span>
        </div>
        <div className="h-2 bg-[var(--color-bg-input)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--color-xp-gold)] to-[var(--color-accent-warning)] transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="flex gap-1 mt-2">
          {boss.objectives.map((o, i) => (
            <div
              key={o.id}
              className={`h-1 flex-1 rounded-full ${
                progress.completedObjectives.includes(o.id)
                  ? 'bg-[var(--color-accent-success)]'
                  : i === progress.currentObjectiveIndex && !progress.completed
                  ? 'bg-[var(--color-xp-gold)]'
                  : 'bg-[var(--color-bg-input)]'
              }`}
              title={isUr ? o.descriptionUrdu : o.description}
            />
          ))}
        </div>
      </div>

      {progress.completed ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl border border-[var(--color-xp-gold)]/30 bg-gradient-to-br from-[var(--color-xp-gold)]/10 to-transparent p-8 text-center space-y-4"
        >
          <Trophy className="w-16 h-16 mx-auto text-[var(--color-xp-gold)]" />
          <h2 className="text-xl font-bold text-[var(--color-xp-gold)]">
            {isUr ? 'Boss Defeated!' : 'Boss Defeated!'}
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {isUr ? `${boss.titleUrdu} mukammal` : `${boss.title} complete`} · +{boss.xpReward} XP
          </p>
          <div className="flex justify-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/projects')}>
              {isUr ? 'Sab Projects' : 'All Projects'}
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate('/challenges')}>
              {isUr ? 'Aur Challenges' : 'More Challenges'}
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          {currentObjective && (
            <motion.div
              key={currentObjective.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)] p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" size="sm">{currentObjective.type}</Badge>
                <span className="text-[10px] font-mono text-[var(--color-text-tertiary)]">
                  OBJ {progress.currentObjectiveIndex + 1}/{totalObjectives}
                </span>
                {progress.completedObjectives.includes(currentObjective.id) && (
                  <Badge variant="success" size="sm">
                    <CheckCircle className="w-3 h-3" /> {isUr ? 'Done' : 'Done'}
                  </Badge>
                )}
              </div>

              <p className="text-xs text-[var(--color-text-tertiary)] mb-2">
                {isUr ? currentObjective.descriptionUrdu : currentObjective.description}
              </p>
              <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">
                {isUr ? currentObjective.questionUrdu : currentObjective.question}
              </h2>

              <div className="mb-4">
                <HintSystem
                  hints={currentObjective.hints.slice(0, Math.min(hintCount + 1, 4))}
                  onHintUsed={handleHint}
                  xpPenalty
                />
              </div>

              <div className="space-y-2 mb-4">
                {currentObjective.options.map((opt, i) => {
                  const isSel = selected === i;
                  const reveal = feedback !== null;
                  const isCorrect = i === currentObjective.correctIndex;
                  return (
                    <button
                      key={i}
                      disabled={feedback !== null}
                      onClick={() => setSelected(i)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-all ${
                        reveal && isCorrect
                          ? 'border-[var(--color-accent-success)]/50 bg-[var(--color-accent-success)]/10 text-[var(--color-accent-success)]'
                          : reveal && isSel
                          ? 'border-[var(--color-accent-error)]/50 bg-[var(--color-accent-error)]/10 text-[var(--color-accent-error)]'
                          : isSel
                          ? 'border-[var(--color-accent-primary)]/50 bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)]'
                          : 'border-[var(--color-border-primary)] bg-[var(--color-bg-input)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-secondary)]'
                      }`}
                    >
                      <span className="font-mono mr-2 opacity-60">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {feedback && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className={`text-xs p-3 rounded-lg border mb-4 ${
                    feedback.correct
                      ? 'border-[var(--color-accent-success)]/30 bg-[var(--color-accent-success)]/5 text-[var(--color-accent-success)]'
                      : 'border-[var(--color-accent-error)]/30 bg-[var(--color-accent-error)]/5 text-[var(--color-accent-error)]'
                  }`}
                >
                  <strong className="mr-1">
                    {feedback.correct
                      ? (isUr ? 'Sahi!' : 'Correct!')
                      : (isUr ? 'Ghalat.' : 'Incorrect.')}
                  </strong>
                  {feedback.text}
                </motion.p>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t border-[var(--color-border-primary)]">
                {!feedback ? (
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={selected === null}
                    onClick={handleSubmit}
                    leftIcon={<Zap className="w-3.5 h-3.5" />}
                  >
                    {isUr ? 'Jawab Submit Karein' : 'Submit Answer'}
                  </Button>
                ) : feedback.correct ? (
                  <Button variant="primary" size="sm" onClick={handleNext} rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    {progress.currentObjectiveIndex >= totalObjectives - 1
                      ? (isUr ? 'Finish' : 'Finish')
                      : (isUr ? 'Agla Objective' : 'Next Objective')}
                  </Button>
                ) : (
                  <Button variant="secondary" size="sm" onClick={handleNext}>
                    {isUr ? 'Dobara Try Karein' : 'Try Again'}
                  </Button>
                )}
              </div>

              {!feedback && hintCount > 0 && (
                <p className="text-[10px] text-[var(--color-accent-warning)] mt-2 flex items-center gap-1">
                  <Lightbulb className="w-3 h-3" />
                  {isUr ? 'Hints XP reduce kar sakte hain (presentation only)' : 'Hints shown (tracked for transparency)'}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
