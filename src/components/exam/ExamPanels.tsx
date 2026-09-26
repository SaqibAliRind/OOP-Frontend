import { useMemo, useState, useCallback, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  CircleDashed,
  RotateCcw,
  BookOpen,
  MessageSquare,
  Star,
  Lightbulb,
  FlaskConical,
  ListChecks,
} from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Badge, Button, Card, ProgressBar, Modal } from '@/components/ui';
import { EmptyState } from '@/components/ui/EmptyState';
import { JavaCodeBlock } from '@/components/learning/JavaCodeBlock';
import { HintSystem } from '@/components/learning/HintSystem';
import { useLanguage } from '@/contexts/LanguageContext';
import { examPrepService } from '@/services/examPrepService';
import type {
  ExamResultSummary,
  ExamPrepMissionState,
  LabExamScenario,
  LabAttemptState,
  VivaBankItem,
  VivaAttempt,
  VivaSelfRating,
} from '@/types/examPrep';

export function ExamResultPanel({
  result,
  title,
  onReviewIncorrect,
  onRetry,
  onBack,
  className,
}: {
  result: ExamResultSummary;
  title: string;
  onReviewIncorrect?: () => void;
  onRetry?: () => void;
  onBack?: () => void;
  className?: string;
}) {
  const { language } = useLanguage();
  const [reviewOpen, setReviewOpen] = useState(false);

  return (
    <div className={cn('space-y-4', className)}>
      <Card padding="lg" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</h2>
            <p className="text-xs text-[var(--color-text-tertiary)]">
              {language === 'ur'
                ? 'Deterministic educational grading — koi real Java execution ya AI grading nahi.'
                : 'Deterministic educational grading — no real Java execution or AI grading.'}
            </p>
          </div>
          <Badge variant={result.percentage >= 70 ? 'success' : result.percentage >= 50 ? 'warning' : 'error'} size="lg">
            {result.percentage}%
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label={language === 'ur' ? 'Marks' : 'Marks'} value={`${result.marksAwarded}/${result.totalMarks}`} />
          <Stat label={language === 'ur' ? 'Sahi' : 'Correct'} value={String(result.correct)} tone="success" />
          <Stat label={language === 'ur' ? 'Ghalat' : 'Incorrect'} value={String(result.incorrect)} tone="error" />
          <Stat label={language === 'ur' ? 'Chhora' : 'Unattempted'} value={String(result.unattempted)} />
        </div>

        {result.selfAssessed > 0 && (
          <p className="text-xs text-[var(--color-accent-warning)] bg-[var(--color-accent-warning)]/10 border border-[var(--color-accent-warning)]/30 rounded-lg px-3 py-2">
            {language === 'ur'
              ? `${result.selfAssessed} sawal self-assessed marking points par mabni the — yeh AI grading nahi.`
              : `${result.selfAssessed} question(s) were self-assessed from marking points — not AI grading.`}
          </p>
        )}

        <div className="space-y-2">
          <p className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wide">
            {language === 'ur' ? 'Section breakdown' : 'Section breakdown'}
          </p>
          {Object.entries(result.sectionBreakdown).map(([sec, v]) => (
            <div key={sec} className="flex items-center gap-3">
              <span className="w-8 text-sm font-medium text-[var(--color-text-secondary)]">{sec}</span>
              <ProgressBar
                value={v.possible > 0 ? (v.awarded / v.possible) * 100 : 0}
                className="flex-1"
                size="sm"
                variant="primary"
              />
              <span className="text-xs font-mono text-[var(--color-text-tertiary)] w-16 text-right">
                {v.awarded}/{v.possible}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wide">
            {language === 'ur' ? 'Module performance' : 'Module performance'}
          </p>
          {Object.entries(result.moduleBreakdown).map(([mod, v]) => (
            <div key={mod} className="flex items-center gap-3">
              <span className="text-xs font-mono text-[var(--color-text-secondary)] w-24 truncate">{mod}</span>
              <ProgressBar
                value={v.possible > 0 ? (v.awarded / v.possible) * 100 : 0}
                className="flex-1"
                size="sm"
                variant={v.possible > 0 && v.awarded / v.possible >= 0.7 ? 'success' : 'warning'}
              />
              <span className="text-xs font-mono text-[var(--color-text-tertiary)] w-16 text-right">
                {v.awarded}/{v.possible}
              </span>
            </div>
          ))}
        </div>

        {(result.weakTopics.length > 0 || result.strongTopics.length > 0) && (
          <div className="flex flex-wrap gap-4">
            {result.weakTopics.length > 0 && (
              <div>
                <p className="text-xs text-[var(--color-accent-error)] font-medium mb-1">
                  {language === 'ur' ? 'Revision topics' : 'Recommended revision'}
                </p>
                <div className="flex flex-wrap gap-1">
                  {result.weakTopics.map(t => (
                    <Badge key={t} variant="error" size="sm">{t}</Badge>
                  ))}
                </div>
              </div>
            )}
            {result.strongTopics.length > 0 && (
              <div>
                <p className="text-xs text-[var(--color-accent-success)] font-medium mb-1">
                  {language === 'ur' ? 'Strong' : 'Strong topics'}
                </p>
                <div className="flex flex-wrap gap-1">
                  {result.strongTopics.map(t => (
                    <Badge key={t} variant="success" size="sm">{t}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Button variant="primary" onClick={() => setReviewOpen(true)} leftIcon={<ListChecks className="w-4 h-4" />}>
            {language === 'ur' ? 'Sawal Review Karein' : 'Questions to Review'}
          </Button>
          {onReviewIncorrect && (
            <Button variant="outline" onClick={onReviewIncorrect}>
              {language === 'ur' ? 'Ghalat dobara dekhein' : 'Review incorrect answers'}
            </Button>
          )}
          {onRetry && (
            <Button variant="outline" onClick={onRetry} leftIcon={<RotateCcw className="w-4 h-4" />}>
              {language === 'ur' ? 'Dobara' : 'Retry'}
            </Button>
          )}
          {onBack && (
            <Button variant="ghost" onClick={onBack}>
              {language === 'ur' ? 'Dashboard' : 'Back to dashboard'}
            </Button>
          )}
        </div>
        {result.xpAwarded > 0 && (
          <p className="text-xs text-[var(--color-xp-gold)]">+{result.xpAwarded} XP (awarded once for this submission)</p>
        )}
      </Card>

      <Modal isOpen={reviewOpen} onClose={() => setReviewOpen(false)} title={language === 'ur' ? 'Exam Review' : 'Exam Review'} size="lg">
        <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
          {result.review.length === 0 && (
            <EmptyState title={language === 'ur' ? 'Koi sawal nahi' : 'No questions'} />
          )}
          {result.review.map((item, i) => (
            <ReviewItemCard key={item.questionId} item={item} index={i} />
          ))}
        </div>
      </Modal>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: 'success' | 'error' }) {
  return (
    <div className="p-3 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-primary)]">
      <p className="text-[11px] text-[var(--color-text-tertiary)]">{label}</p>
      <p
        className={cn(
          'text-lg font-semibold font-mono',
          tone === 'success' && 'text-[var(--color-accent-success)]',
          tone === 'error' && 'text-[var(--color-accent-error)]',
          !tone && 'text-[var(--color-text-primary)]'
        )}
      >
        {value}
      </p>
    </div>
  );
}

function ReviewItemCard({
  item,
  index,
  onRetrySimilar,
}: {
  item: ExamResultSummary['review'][number];
  index: number;
  onRetrySimilar?: () => void;
}) {
  const { language } = useLanguage();
  const correct = item.isCorrect === true;
  const incorrect = item.isCorrect === false;

  return (
    <div
      className={cn(
        'p-4 rounded-lg border space-y-2',
        correct && 'border-[var(--color-accent-success)]/40 bg-[var(--color-accent-success)]/5',
        incorrect && 'border-[var(--color-accent-error)]/40 bg-[var(--color-accent-error)]/5',
        item.isCorrect === null && 'border-[var(--color-border-primary)]'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {correct ? (
            <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-success)]" />
          ) : incorrect ? (
            <XCircle className="w-4 h-4 text-[var(--color-accent-error)]" />
          ) : (
            <CircleDashed className="w-4 h-4 text-[var(--color-text-tertiary)]" />
          )}
          <Badge variant="secondary" size="sm">#{index + 1}</Badge>
          <Badge variant="xp" size="sm">{item.marksAwarded}/{item.marksPossible}</Badge>
        </div>
        {item.lessonId && (
          <a
            href={`/lesson/${item.lessonId}`}
            className="text-xs text-[var(--color-accent-primary)] hover:underline inline-flex items-center gap-1"
          >
            <BookOpen className="w-3 h-3" />
            {language === 'ur' ? 'Lesson' : 'Related lesson'}
          </a>
        )}
      </div>
      <p className="text-sm text-[var(--color-text-primary)] whitespace-pre-wrap">{item.prompt}</p>
      <div className="grid md:grid-cols-2 gap-2 text-xs">
        <div className="p-2 rounded bg-[var(--color-bg-input)]">
          <p className="text-[var(--color-text-tertiary)] mb-0.5">{language === 'ur' ? 'Aapka jawab' : 'Your answer'}</p>
          <p className="text-[var(--color-text-primary)] font-mono whitespace-pre-wrap">{item.studentResponse}</p>
        </div>
        <div className="p-2 rounded bg-[var(--color-bg-input)]">
          <p className="text-[var(--color-text-tertiary)] mb-0.5">{language === 'ur' ? 'Model / sahi' : 'Model / expected'}</p>
          <p className="text-[var(--color-accent-success)] font-mono whitespace-pre-wrap">{item.expected}</p>
        </div>
      </div>
      <p className="text-xs text-[var(--color-text-secondary)]">{item.explanation}</p>
      {language === 'ur' && item.explanationUrdu && (
        <p className="text-xs text-[var(--color-accent-secondary)]">{item.explanationUrdu}</p>
      )}
      {onRetrySimilar && (
        <Button size="sm" variant="ghost" onClick={onRetrySimilar}>
          {language === 'ur' ? 'Similar practice' : 'Practice similar topic'}
        </Button>
      )}
    </div>
  );
}

export function ExamReviewList({
  result,
  onlyIncorrect = false,
  className,
}: {
  result: ExamResultSummary;
  onlyIncorrect?: boolean;
  className?: string;
}) {
  const { language } = useLanguage();
  const items = onlyIncorrect
    ? result.review.filter(r => r.isCorrect === false || r.isCorrect === null)
    : result.review;

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<CheckCircle2 className="w-8 h-8" />}
        title={language === 'ur' ? 'Koi ghalat jawab nahi' : 'No incorrect answers'}
        description={language === 'ur' ? 'Is attempt mein sab theek raha.' : 'Everything was correct in this attempt.'}
        className={className}
      />
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item, i) => (
        <ReviewItemCard key={item.questionId} item={item} index={i} />
      ))}
    </div>
  );
}

export function TheorySelfAssessPanel({
  questionId,
  modelAnswer,
  modelAnswerUrdu,
  markingPoints,
  markingPointsUrdu,
  response,
  pointsClaimed,
  revealed,
  onTogglePoint,
  onReveal,
  onReset,
  className,
}: {
  questionId: string;
  modelAnswer: string;
  modelAnswerUrdu?: string;
  markingPoints: string[];
  markingPointsUrdu?: string[];
  response: string;
  pointsClaimed: number[];
  revealed: boolean;
  onTogglePoint: (index: number) => void;
  onReveal: () => void;
  onReset?: () => void;
  className?: string;
}) {
  const { language } = useLanguage();
  const points = language === 'ur' && markingPointsUrdu?.length ? markingPointsUrdu : markingPoints;
  const hits = pointsClaimed.filter(x => x === 1).length;

  return (
    <div className={cn('space-y-3', className)} data-question={questionId}>
      {!revealed ? (
        <Button variant="primary" onClick={onReveal} leftIcon={<Lightbulb className="w-4 h-4" />}>
          {language === 'ur' ? 'Model Answer Dekhein' : 'Reveal Model Answer'}
        </Button>
      ) : (
        <div className="space-y-3 p-4 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-bg-card)]">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase">
              {language === 'ur' ? 'Model answer (self-mark)' : 'Model answer (self-mark)'}
            </p>
            {onReset && (
              <Button size="sm" variant="ghost" onClick={onReset} leftIcon={<RotateCcw className="w-3 h-3" />}>
                {language === 'ur' ? 'Reset' : 'Reset'}
              </Button>
            )}
          </div>
          <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">
            {language === 'ur' && modelAnswerUrdu ? modelAnswerUrdu : modelAnswer}
          </p>
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-[var(--color-text-secondary)]">
              {language === 'ur' ? 'Marking points — jo aap ke jawab mein thay un par tick karein' : 'Marking points — tick points your answer included'}
            </p>
            {points.map((pt, i) => (
              <label
                key={i}
                className="flex items-start gap-2 text-sm text-[var(--color-text-primary)] cursor-pointer focus-within:ring-2 focus-within:ring-[var(--color-border-focus)] rounded p-1"
              >
                <input
                  type="checkbox"
                  checked={pointsClaimed[i] === 1}
                  onChange={() => onTogglePoint(i)}
                  className="mt-0.5 accent-[var(--color-accent-primary)]"
                  aria-label={pt}
                />
                <span>{pt}</span>
              </label>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={hits === points.length && points.length > 0 ? 'success' : 'warning'} size="sm">
              {hits}/{points.length} {language === 'ur' ? 'points' : 'points'}
            </Badge>
            <span className="text-[11px] text-[var(--color-text-tertiary)]">
              {language === 'ur'
                ? 'Self-assessment — AI grading nahi claim ki jati.'
                : 'Self-assessment — not claimed as AI grading.'}
            </span>
          </div>
        </div>
      )}
      {response && !revealed && (
        <p className="text-xs text-[var(--color-text-tertiary)]">
          {language === 'ur' ? 'Aapka draft jawab mehfooz hai. Model answer dekhne ke baad points tick karein.' : 'Your draft is saved. Reveal the model answer, then tick points.'}
        </p>
      )}
    </div>
  );
}

export function VivaRoomCard({
  item,
  sessionMode,
  onSaved,
  className,
}: {
  item: VivaBankItem;
  sessionMode: VivaAttempt['sessionMode'];
  onSaved?: (attempt: VivaAttempt) => void;
  className?: string;
}) {
  const { language } = useLanguage();
  const [note, setNote] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [rating, setRating] = useState<VivaSelfRating | null>(null);

  useEffect(() => {
    setNote('');
    setRevealed(false);
    setRating(null);
  }, [item.id]);

  const save = (r: VivaSelfRating) => {
    setRating(r);
    const attempt: VivaAttempt = {
      id: `viva-${Date.now()}`,
      questionId: item.id,
      question: item.question,
      answer: item.answer,
      keyPoints: item.answer.split(/[.;]\s/).filter(Boolean).slice(0, 5),
      moduleId: item.moduleId,
      lessonId: item.lessonId,
      topic: item.topic,
      personalNote: note,
      rating: r,
      revealed: true,
      sessionMode,
      completedAt: Date.now(),
    };
    examPrepService.saveVivaAttempt(attempt);
    onSaved?.(attempt);
  };

  return (
    <Card padding="lg" className={cn('space-y-4', className)}>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" size="sm">{sessionMode}</Badge>
        <Badge variant="outline" size="sm">{item.difficulty}</Badge>
        <Badge variant="primary" size="sm">{item.topic}</Badge>
      </div>
      <p className="text-base font-medium text-[var(--color-text-primary)] leading-relaxed" tabIndex={0}>
        {item.question}
      </p>

      <div className="space-y-2">
        <label htmlFor="viva-note" className="text-sm text-[var(--color-text-secondary)]">
          {language === 'ur' ? 'Apna jawab sochein ya likhein (personal, private)' : 'Think or type your personal answer (private)'}
        </label>
        <textarea
          id="viva-note"
          value={note}
          onChange={e => setNote(e.target.value)}
          rows={3}
          className="w-full p-3 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-bg-input)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)]"
          placeholder={language === 'ur' ? 'Key words ya poora jawab...' : 'Keywords or full answer...'}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {!revealed && (
          <Button variant="primary" onClick={() => setRevealed(true)} leftIcon={<MessageSquare className="w-4 h-4" />}>
            {language === 'ur' ? 'Model Answer Reveal Karein' : 'Reveal Model Answer'}
          </Button>
        )}
        {revealed && (
          <div className="w-full space-y-3 p-4 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)]">
            <div>
              <p className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase mb-1">
                {language === 'ur' ? 'Model answer' : 'Model answer'}
              </p>
              <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">{item.answer}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase mb-1">
                {language === 'ur' ? 'Key points expected' : 'Key points expected'}
              </p>
              <ul className="list-disc list-inside text-xs text-[var(--color-text-secondary)] space-y-0.5">
                {item.answer.split(/[.;]\s/).filter(s => s.trim()).slice(0, 5).map((p, i) => (
                  <li key={i}>{p.trim()}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase mb-1.5">
                {language === 'ur' ? 'Confidence self-rating' : 'Confidence self-rating'}
              </p>
              <div className="flex flex-wrap gap-2">
                <RatingButton active={rating === 'knew'} onClick={() => save('knew')} tone="success">
                  {language === 'ur' ? 'Janta tha' : 'Knew it'}
                </RatingButton>
                <RatingButton active={rating === 'partial'} onClick={() => save('partial')} tone="warning">
                  {language === 'ur' ? 'Kuch tha' : 'Partially knew it'}
                </RatingButton>
                <RatingButton active={rating === 'revision'} onClick={() => save('revision')} tone="error">
                  {language === 'ur' ? 'Dobara padhna hai' : 'Need revision'}
                </RatingButton>
              </div>
              {rating && (
                <p className="text-[11px] text-[var(--color-text-tertiary)] mt-2">
                  {language === 'ur'
                    ? 'Result mehfooz. Yeh spoken speech evaluation nahi hai — sirf aap ki self-rating.'
                    : 'Saved. This is your self-rating, not spoken-speech evaluation.'}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <a
        href={`/lesson/${item.lessonId}`}
        className="inline-flex items-center gap-1 text-xs text-[var(--color-accent-primary)] hover:underline"
      >
        <BookOpen className="w-3 h-3" />
        {language === 'ur' ? 'Related lesson kholein' : 'Open related lesson'}
      </a>
    </Card>
  );
}

function RatingButton({
  active,
  onClick,
  tone,
  children,
}: {
  active: boolean;
  onClick: () => void;
  tone: 'success' | 'warning' | 'error';
  children: React.ReactNode;
}) {
  const toneClass =
    tone === 'success'
      ? 'border-[var(--color-accent-success)] text-[var(--color-accent-success)] bg-[var(--color-accent-success)]/10'
      : tone === 'warning'
        ? 'border-[var(--color-accent-warning)] text-[var(--color-accent-warning)] bg-[var(--color-accent-warning)]/10'
        : 'border-[var(--color-accent-error)] text-[var(--color-accent-error)] bg-[var(--color-accent-error)]/10';
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'px-3 py-1.5 text-xs rounded-lg border font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
        active ? toneClass : 'border-[var(--color-border-primary)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-primary)]/40'
      )}
    >
      {children}
    </button>
  );
}

export function LabExamPanel({
  scenario,
  className,
  onComplete,
}: {
  scenario: LabExamScenario;
  className?: string;
  onComplete?: () => void;
}) {
  const { language } = useLanguage();
  const [state, setState] = useState<LabAttemptState>(() => examPrepService.loadLabState(scenario.id));
  const [showModel, setShowModel] = useState(false);

  const evalResult = useMemo(
    () => examPrepService.evaluateLabCheckpoints(scenario, state.selectedChoices),
    [scenario, state.selectedChoices]
  );

  useEffect(() => {
    const next: LabAttemptState = {
      ...state,
      completedCheckpoints: evalResult.completed.map(c => c.id),
      completed: evalResult.progress === 100,
      completedAt: evalResult.progress === 100 ? state.completedAt ?? Date.now() : null,
    };
    if (
      next.completed !== state.completed ||
      next.completedAt !== state.completedAt ||
      next.completedCheckpoints.length !== state.completedCheckpoints.length
    ) {
      setState(next);
      examPrepService.saveLabState(next);
      if (next.completed) onComplete?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evalResult.progress]);

  const toggleChoice = (checkpointId: string, choiceId: string) => {
    setState(prev => {
      const current = new Set(prev.selectedChoices[checkpointId] || []);
      if (current.has(choiceId)) current.delete(choiceId);
      else current.add(choiceId);
      const selectedChoices = { ...prev.selectedChoices, [checkpointId]: Array.from(current) };
      const next = { ...prev, selectedChoices };
      examPrepService.saveLabState(next);
      return next;
    });
  };

  const bank = LAB_OPTIONS[scenario.id] || [];

  return (
    <div className={cn('space-y-4', className)}>
      <Card padding="lg" className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <FlaskConical className="w-5 h-5 text-[var(--color-accent-success)]" />
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
            {language === 'ur' ? scenario.titleUrdu : scenario.title}
          </h2>
          <Badge variant="warning" size="sm">{scenario.difficulty}</Badge>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {language === 'ur' ? scenario.problemStatementUrdu : scenario.problemStatement}
        </p>
        <div className="grid md:grid-cols-3 gap-3 text-xs">
          <MetaList title={language === 'ur' ? 'Classes' : 'Required classes'} items={scenario.requiredClasses} />
          <MetaList title={language === 'ur' ? 'Attributes' : 'Required attributes'} items={scenario.requiredAttributes} />
          <MetaList title={language === 'ur' ? 'Methods' : 'Required methods'} items={scenario.requiredMethods} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {scenario.concepts.map(c => (
            <Badge key={c} variant="secondary" size="sm">{c}</Badge>
          ))}
        </div>
        <ProgressBar
          value={evalResult.progress}
          label={language === 'ur' ? 'Checkpoints' : 'Checkpoints'}
          variant={evalResult.progress === 100 ? 'success' : 'primary'}
        />
        <p className="text-[11px] text-[var(--color-text-tertiary)]">
          {language === 'ur'
            ? 'Controlled design selections — koi real compilation ya full Java validation nahi.'
            : 'Controlled design selections — no real compilation or full programming-language validation.'}
        </p>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card padding="md" className="space-y-3">
          <p className="text-sm font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-[var(--color-accent-primary)]" />
            {language === 'ur' ? 'Checkpoints' : 'Ordered checkpoints'}
          </p>
          {scenario.checkpoints.map((cp, idx) => {
            const done = evalResult.completed.some(c => c.id === cp.id);
            return (
              <div key={cp.id} className={cn('p-3 rounded-lg border space-y-2', done ? 'border-[var(--color-accent-success)]/40' : 'border-[var(--color-border-primary)]')}>
                <div className="flex items-start gap-2">
                  <span className={cn('mt-0.5 w-5 h-5 rounded-full text-[10px] flex items-center justify-center shrink-0 font-semibold', done ? 'bg-[var(--color-accent-success)] text-white' : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)]')}>
                    {idx + 1}
                  </span>
                  <span className="text-sm text-[var(--color-text-primary)]">
                    {language === 'ur' ? cp.labelUrdu : cp.label}
                  </span>
                </div>
                <div className="space-y-1 pl-7">
                  {(bank.filter(b => b.id.startsWith(cp.requiredChoices[0]?.split('-')[0] || '') || true)).length > 0 &&
                    bank.map(choice => {
                      const related =
                        cp.requiredChoices.includes(choice.id) ||
                        choice.id.startsWith(cp.id.replace('cp-', '')) ||
                        relatedChoice(cp, choice.id, scenario);
                      if (!related) return null;
                      const checked = (state.selectedChoices[cp.id] || []).includes(choice.id);
                      return (
                        <label key={choice.id} className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)] cursor-pointer p-1 rounded hover:bg-[var(--color-bg-input)] focus-within:ring-1 focus-within:ring-[var(--color-border-focus)]">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleChoice(cp.id, choice.id)}
                            className="mt-0.5 accent-[var(--color-accent-primary)]"
                          />
                          <span className="font-mono">{choice.label}</span>
                        </label>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </Card>

        <div className="space-y-4">
          <Card padding="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[var(--color-accent-warning)]" />
                {language === 'ur' ? 'Hints' : 'Hints'}
              </p>
              <Badge variant="secondary" size="sm">×{state.hintsUsed}</Badge>
            </div>
            <div className="space-y-2">
              <HintSystem
                hints={language === 'ur' ? scenario.hintsUrdu : scenario.hints}
                onHintUsed={() => {
                  setState(prev => {
                    const next = { ...prev, hintsUsed: prev.hintsUsed + 1 };
                    examPrepService.saveLabState(next);
                    return next;
                  });
                }}
              />
            </div>
          </Card>

          <Card padding="md" className="space-y-3">
            <Button variant="outline" onClick={() => setShowModel(s => !s)} leftIcon={<Star className="w-4 h-4" />}>
              {showModel
                ? (language === 'ur' ? 'Model Solution Chhupayein' : 'Hide Model Solution')
                : (language === 'ur' ? 'Model Solution Dekhein' : 'Show Model Solution')}
            </Button>
            {showModel && (
              <div className="space-y-2">
                <JavaCodeBlock code={scenario.modelSolution} title={language === 'ur' ? 'Model Solution' : 'Model Solution'} copyable expandable />
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {language === 'ur' ? scenario.modelSolutionNotesUrdu : scenario.modelSolutionNotes}
                </p>
              </div>
            )}
          </Card>

          {evalResult.progress === 100 && (
            <Card padding="md" className="border-[var(--color-accent-success)]/40 bg-[var(--color-accent-success)]/5 space-y-2">
              <p className="text-sm font-semibold text-[var(--color-accent-success)] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {language === 'ur' ? 'Lab mukammal' : 'Lab examination complete'}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">
                {language === 'ur'
                  ? 'Sab checkpoints pass. Completion summary: design selections validated deterministically.'
                  : 'All checkpoints passed. Completion summary: design selections validated deterministically.'}
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function relatedChoice(cp: { id: string; requiredChoices: string[] }, choiceId: string, scenario: LabExamScenario): boolean {
  // Show all bank options that either belong to this checkpoint's required set or are distractors
  // for the same scenario — filter to options relevant to this checkpoint index.
  const cpIndex = scenario.checkpoints.findIndex(c => c.id === cp.id);
  const allBank = LAB_OPTIONS[scenario.id] || [];
  // Show required choices for this checkpoint plus a couple of distractors from the same bank slice
  if (cp.requiredChoices.includes(choiceId)) return true;
  // Distractors: options not required by any checkpoint that share a prefix with this checkpoint's first requirement
  const firstReq = cp.requiredChoices[0] || '';
  const prefix = firstReq.split('-')[0];
  if (prefix && choiceId.startsWith(prefix) && !cp.requiredChoices.includes(choiceId)) {
    // Only show distractor under this checkpoint if not required by a later checkpoint either
    const requiredElsewhere = scenario.checkpoints.some((c, i) => i !== cpIndex && c.requiredChoices.includes(choiceId));
    if (!requiredElsewhere) return true;
  }
  // Fallback: show unassigned distractors (wrong-*) under first checkpoint
  if (cpIndex === 0 && choiceId.startsWith('wrong-')) return true;
  return allBank.length === 0 ? false : false;
}

function MetaList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="p-2 rounded bg-[var(--color-bg-input)] border border-[var(--color-border-primary)]">
      <p className="text-[10px] uppercase text-[var(--color-text-tertiary)] mb-1">{title}</p>
      <ul className="space-y-0.5 text-[var(--color-text-secondary)]">
        {items.map(i => (
          <li key={i} className="font-mono">{i}</li>
        ))}
      </ul>
    </div>
  );
}

// Lazy import bank to avoid circulars — re-export from data
import { LAB_OPTION_BANK as LAB_OPTIONS } from '@/data/examPrep';

export function ExamReadyMissionPanel({
  state,
  className,
}: {
  state: ExamPrepMissionState;
  className?: string;
}) {
  const { language } = useLanguage();
  const objectives: { id: string; label: string; labelUrdu: string }[] = [
    { id: 'diagnostic', label: 'Complete a diagnostic quiz', labelUrdu: 'Diagnostic quiz mukammal karein' },
    { id: 'theory', label: 'Practice one theory question', labelUrdu: 'Ek theory question practice karein' },
    { id: 'code-output', label: 'Solve one code-output question', labelUrdu: 'Ek code-output question solve karein' },
    { id: 'viva', label: 'Complete one viva question', labelUrdu: 'Ek viva question mukammal karein' },
    { id: 'mock', label: 'Finish one supported mock assessment', labelUrdu: 'Ek mock assessment mukammal karein' },
    { id: 'review', label: 'Review incorrect answers', labelUrdu: 'Ghalat jawab review karein' },
  ];
  const order = objectives.map(o => o.id);
  const done = new Set(state.completedObjectives);
  const unlockedIdx = state.unlockedIndex;

  return (
    <Card padding="md" className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-[var(--color-xp-gold)]" />
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
            {language === 'ur' ? 'Mission: Exam Ready' : 'MISSION: EXAM READY'}
          </h3>
        </div>
        <Badge variant={state.xpAwarded ? 'success' : 'xp'} size="sm">
          {state.xpAwarded ? 'Done' : '+150 XP'}
        </Badge>
      </div>
      <ProgressBar
        value={(state.completedObjectives.length / order.length) * 100}
        size="sm"
        variant="xp"
        label={`${state.completedObjectives.length}/${order.length}`}
      />
      <ol className="space-y-1.5">
        {objectives.map((obj, i) => {
          const isDone = done.has(obj.id as never);
          const isUnlocked = i <= unlockedIdx;
          return (
            <li
              key={obj.id}
              className={cn(
                'flex items-start gap-2 text-xs p-1.5 rounded',
                !isUnlocked && 'opacity-40',
                isDone && 'text-[var(--color-text-tertiary)]'
              )}
            >
              <span
                className={cn(
                  'mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center text-[9px] shrink-0',
                  isDone
                    ? 'bg-[var(--color-accent-success)] border-[var(--color-accent-success)] text-white'
                    : isUnlocked
                      ? 'border-[var(--color-accent-primary)] text-[var(--color-accent-primary)]'
                      : 'border-[var(--color-border-primary)]'
                )}
              >
                {isDone ? '✓' : i + 1}
              </span>
              <span className={isDone ? 'line-through' : ''}>
                {language === 'ur' ? obj.labelUrdu : obj.label}
              </span>
              {i === unlockedIdx && !isDone && (
                <Badge variant="primary" size="sm" className="ml-auto">Now</Badge>
              )}
            </li>
          );
        })}
      </ol>
      <p className="text-[11px] text-[var(--color-text-tertiary)]">
        {language === 'ur'
          ? 'Sequential unlock. XP sirf ek baar — duplicate reward nahi.'
          : 'Sequential unlock. XP awarded once only — no duplicate reward.'}
      </p>
    </Card>
  );
}

export function EmptyExamState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <EmptyState
      icon={<CircleDashed className="w-8 h-8" />}
      title={title}
      description={description}
      action={action}
    />
  );
}

export function useExamSubmitGuard(active: boolean) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const requestSubmit = useCallback(() => setConfirmOpen(true), []);
  const close = useCallback(() => setConfirmOpen(false), []);
  return { confirmOpen, requestSubmit, close, active };
}
