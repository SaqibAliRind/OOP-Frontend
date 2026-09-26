import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, CheckCircle, Lock, Play, Lightbulb, Zap,
  ListChecks, Boxes, Link2, Shield, Layers, ClipboardCheck, Bug, Trophy,
  RotateCcw, Circle,
} from 'lucide-react';
import { Button, Badge, EmptyState } from '@/components/ui';
import { HintSystem } from '@/components/learning/HintSystem';
import { useProjectSimulator } from '@/hooks/useProjectSimulator';
import { useLanguage } from '@/contexts/LanguageContext';
import type { ProjectStageType } from '@/types/projectSimulator';
import { projectService } from '@/services/projectService';

const STAGE_META: Record<ProjectStageType, { label: string; labelUrdu: string; icon: typeof ListChecks }> = {
  requirements: { label: 'Requirements', labelUrdu: 'Zarooratein', icon: ListChecks },
  'identify-classes': { label: 'Identify Classes', labelUrdu: 'Classes', icon: Boxes },
  'attributes-methods': { label: 'Attributes & Methods', labelUrdu: 'Attributes & Methods', icon: ListChecks },
  relationships: { label: 'Relationships', labelUrdu: 'Relationships', icon: Link2 },
  encapsulation: { label: 'Encapsulation', labelUrdu: 'Encapsulation', icon: Shield },
  pillars: { label: 'Other Pillars', labelUrdu: 'Baaki Pillars', icon: Layers },
  review: { label: 'Review', labelUrdu: 'Review', icon: ClipboardCheck },
  'test-scenarios': { label: 'Test Scenarios', labelUrdu: 'Tests', icon: Bug },
  assessment: { label: 'Assessment', labelUrdu: 'Assessment', icon: Trophy },
};

function StageSidebar({
  project,
  attempt,
  stageIndex,
  goToStage,
  review,
}: {
  project: NonNullable<ReturnType<typeof useProjectSimulator>['project']>;
  attempt: ReturnType<typeof useProjectSimulator>['attempt'];
  stageIndex: number;
  goToStage: (i: number) => void;
  review: ReturnType<typeof useProjectSimulator>['review'];
}) {
  const { language } = useLanguage();
  const isUr = language === 'ur';

  return (
    <div className="rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)] p-3 sticky top-4">
      <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-tertiary)] mb-2 px-1">
        {isUr ? 'Stages' : 'Stages'}
      </p>
      <div className="space-y-1">
        {project.stages.map((s, i) => {
          const unlocked = projectService.isStageUnlocked(attempt, i);
          const completed = attempt.completedStages.includes(s.id);
          const active = i === stageIndex;
          const meta = STAGE_META[s.type];
          return (
            <button
              key={s.id}
              disabled={!unlocked}
              onClick={() => goToStage(i)}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-all text-left ${
                active
                  ? 'bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-primary)]'
                  : completed
                  ? 'text-[var(--color-accent-success)] hover:bg-[var(--color-accent-success)]/10'
                  : unlocked
                  ? 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
                  : 'text-[var(--color-text-tertiary)] opacity-50 cursor-not-allowed'
              }`}
            >
              {completed ? (
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
              ) : unlocked ? (
                active ? <Play className="w-3.5 h-3.5 shrink-0" /> : <Circle className="w-3.5 h-3.5 shrink-0" />
              ) : (
                <Lock className="w-3.5 h-3.5 shrink-0" />
              )}
              <span className="truncate">
                {i + 1}. {isUr ? meta.labelUrdu : meta.label}
              </span>
            </button>
          );
        })}
      </div>
      {attempt.completed && review && (
        <div className="mt-3 pt-3 border-t border-[var(--color-border-primary)] space-y-1">
          <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-tertiary)] px-1">
            {isUr ? 'Feedback' : 'Feedback'}
          </p>
          <p className="text-[11px] text-[var(--color-text-secondary)] px-1">
            {isUr ? review.suggestedNextUrdu : review.suggestedNext}
          </p>
          {review.xpEarned > 0 && (
            <p className="text-[11px] text-[var(--color-xp-gold)] px-1 flex items-center gap-1">
              <Zap className="w-3 h-3" /> +{review.xpEarned} XP
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function HintsPanel({ hints, hintsUrdu, onUsed }: { hints: string[]; hintsUrdu: string[]; onUsed: () => void }) {
  const { language } = useLanguage();
  const list = language === 'ur' ? hintsUrdu : hints;
  return (
    <div className="rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-bg-input)] p-3">
      <HintSystem hints={list} onHintUsed={onUsed} />
    </div>
  );
}

export default function ProjectSimulatorPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isUr = language === 'ur';
  const {
    project, attempt, stage, stageState, stageIndex, canComplete,
    acknowledge, toggleClass, toggleAttributeMethod, toggleRelationship,
    answerPillar, answerAssessment, useHint, runTests, goToStage,
    completeCurrentStage, reset, review,
  } = useProjectSimulator(projectId);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [justCompleted, setJustCompleted] = useState<{ xp: boolean; done: boolean } | null>(null);

  const progressPercent = useMemo(() => {
    if (!project) return 0;
    return Math.round((attempt.completedStages.length / project.stages.length) * 100);
  }, [project, attempt.completedStages.length]);

  if (!project || !stage) {
    return (
      <div className="max-w-3xl mx-auto">
        <EmptyState
          icon={<Boxes className="w-10 h-10" />}
          title={isUr ? 'Project nahi mila' : 'Project not found'}
          description={isUr ? 'Yeh project exist nahi karta.' : 'This project does not exist.'}
          action={{ label: isUr ? 'Projects par jayein' : 'Back to projects', onClick: () => navigate('/projects') }}
        />
      </div>
    );
  }

  const meta = STAGE_META[stage.type];
  const StageIcon = meta.icon;

  const handleComplete = () => {
    const result = completeCurrentStage();
    if (result) {
      setJustCompleted({ xp: result.xpAwarded, done: result.projectCompleted });
      setShowFeedback(null);
      if (!result.projectCompleted && stageIndex < project.stages.length - 1) {
        goToStage(stageIndex + 1);
      }
    }
  };

  const renderChoices = () => {
    switch (stage.type) {
      case 'requirements':
        return (
          <div className="space-y-3">
            <ul className="space-y-2">
              {project.requirements.map((req, i) => (
                <li key={req.id} className="flex gap-2 text-sm text-[var(--color-text-secondary)]">
                  <span className="text-[var(--color-accent-primary)] font-mono shrink-0">{i + 1}.</span>
                  <span>{isUr ? req.textUrdu : req.text}</span>
                </li>
              ))}
            </ul>
            <label className="flex items-center gap-2 text-sm text-[var(--color-text-primary)] cursor-pointer">
              <input
                type="checkbox"
                checked={stageState.acknowledged}
                onChange={acknowledge}
                className="rounded border-[var(--color-border-primary)]"
              />
              {isUr ? 'Main ne requirements samajh li hain (I Understand)' : "I Understand"}
            </label>
          </div>
        );

      case 'identify-classes':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(stage.classCandidates || []).map(c => {
                const selected = stageState.selectedClassIds.includes(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => toggleClass(c.id)}
                    className={`text-left p-3 rounded-lg border transition-all ${
                      selected
                        ? 'border-[var(--color-accent-primary)]/50 bg-[var(--color-accent-primary)]/10'
                        : 'border-[var(--color-border-primary)] bg-[var(--color-bg-input)] hover:border-[var(--color-border-secondary)]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-mono text-sm ${selected ? 'text-[var(--color-accent-primary)]' : 'text-[var(--color-text-primary)]'}`}>
                        {c.name}
                      </span>
                      {selected && <CheckCircle className="w-3.5 h-3.5 text-[var(--color-accent-primary)]" />}
                    </div>
                    <p className="text-[11px] text-[var(--color-text-tertiary)]">{isUr ? c.descriptionUrdu : c.description}</p>
                    {selected && !c.isValid && c.invalidReason && (
                      <p className="text-[11px] text-[var(--color-accent-error)] mt-1">
                        {isUr ? c.invalidReasonUrdu : c.invalidReason}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
            {stage.codeExample && (
              <pre className="p-3 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-primary)] text-xs text-[var(--color-text-secondary)] overflow-x-auto font-mono">
                {stage.codeExample}
              </pre>
            )}
          </div>
        );

      case 'attributes-methods': {
        const byClass = new Map<string, typeof stage.attributeMethodOptions>();
        for (const opt of stage.attributeMethodOptions || []) {
          if (!byClass.has(opt.classId)) byClass.set(opt.classId, []);
          byClass.get(opt.classId)!.push(opt);
        }
        return (
          <div className="space-y-4">
            {[...byClass.entries()].map(([classId, opts]) => {
              const group = opts || [];
              return (
              <div key={classId}>
                <p className="text-xs font-mono text-[var(--color-accent-secondary)] mb-2">{group[0]?.className || classId}</p>
                <div className="flex flex-wrap gap-2">
                  {group.map(opt => {
                    const selected = stageState.selectedAttributeMethodIds.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        onClick={() => toggleAttributeMethod(opt.id)}
                        className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                          selected
                            ? 'border-[var(--color-accent-primary)]/50 bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)]'
                            : 'border-[var(--color-border-primary)] bg-[var(--color-bg-input)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-secondary)]'
                        }`}
                      >
                        <span className="mr-1.5 opacity-60">{opt.kind === 'attribute' ? 'field' : 'fn'}</span>
                        {opt.name}
                        {selected && !opt.isValid && opt.invalidReason && (
                          <span className="block text-[10px] text-[var(--color-accent-error)] mt-0.5 font-sans">
                            {isUr ? opt.invalidReasonUrdu : opt.invalidReason}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              );
            })}
          </div>
        );
      }

      case 'relationships':
        return (
          <div className="space-y-2">
            {(stage.relationshipOptions || []).map(rel => {
              const selected = stageState.selectedRelationshipIds.includes(rel.id);
              return (
                <button
                  key={rel.id}
                  onClick={() => toggleRelationship(rel.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3 ${
                    selected
                      ? 'border-[var(--color-accent-primary)]/50 bg-[var(--color-accent-primary)]/10'
                      : 'border-[var(--color-border-primary)] bg-[var(--color-bg-input)] hover:border-[var(--color-border-secondary)]'
                  }`}
                >
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    rel.type === 'is-a' ? 'bg-[var(--color-accent-error)]/15 text-[var(--color-accent-error)]'
                    : rel.type === 'composition' ? 'bg-[var(--color-accent-warning)]/15 text-[var(--color-accent-warning)]'
                    : 'bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-primary)]'
                  }`}>
                    {rel.type}
                  </span>
                  <span className="text-sm text-[var(--color-text-primary)] flex-1">
                    {isUr ? rel.labelUrdu : rel.label}
                  </span>
                  {selected && <CheckCircle className="w-4 h-4 text-[var(--color-accent-primary)]" />}
                  {selected && !rel.isValid && rel.invalidReason && (
                    <span className="text-[11px] text-[var(--color-accent-error)] max-w-[40%]">
                      {isUr ? rel.invalidReasonUrdu : rel.invalidReason}
                    </span>
                  )}
                </button>
              );
            })}
            {stage.codeExample && (
              <pre className="p-3 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-primary)] text-xs text-[var(--color-text-secondary)] overflow-x-auto font-mono">
                {stage.codeExample}
              </pre>
            )}
          </div>
        );

      case 'encapsulation':
      case 'pillars':
        return (
          <div className="space-y-5">
            {(stage.pillarChallenges || []).map(ch => {
              const selected = stageState.pillarAnswers[ch.id];
              const answered = selected !== undefined;
              const correct = selected === ch.correctIndex;
              return (
                <div key={ch.id} className="p-3 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-bg-input)]">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" size="sm">{ch.pillar}</Badge>
                    {answered && (
                      <Badge variant={correct ? 'success' : 'error'} size="sm">
                        {correct ? (isUr ? 'Sahi' : 'Correct') : (isUr ? 'Ghalat' : 'Incorrect')}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-[var(--color-text-primary)] mb-2">
                    {isUr ? ch.questionUrdu : ch.question}
                  </p>
                  <div className="space-y-1.5">
                    {ch.options.map((opt, i) => {
                      const isSel = selected === i;
                      const reveal = answered;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            answerPillar(ch.id, i);
                            setShowFeedback(ch.id);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition-all ${
                            reveal && i === ch.correctIndex
                              ? 'border-[var(--color-accent-success)]/50 bg-[var(--color-accent-success)]/10 text-[var(--color-accent-success)]'
                              : isSel
                              ? reveal
                                ? 'border-[var(--color-accent-error)]/50 bg-[var(--color-accent-error)]/10 text-[var(--color-accent-error)]'
                                : 'border-[var(--color-accent-primary)]/50 bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)]'
                              : 'border-[var(--color-border-primary)] bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-secondary)]'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {answered && showFeedback === ch.id && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2 text-xs text-[var(--color-text-secondary)] border-t border-[var(--color-border-primary)] pt-2"
                    >
                      {isUr ? ch.explanationUrdu : ch.explanation}
                    </motion.p>
                  )}
                </div>
              );
            })}
          </div>
        );

      case 'review':
        return (
          <div className="space-y-4">
            <div className="rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-bg-input)] p-4 space-y-3">
              <p className="text-xs uppercase tracking-wider text-[var(--color-text-tertiary)]">
                {isUr ? 'Aapki Design' : 'Your Design'}
              </p>
              <div>
                <p className="text-xs text-[var(--color-text-tertiary)] mb-1">{isUr ? 'Classes' : 'Classes'}</p>
                <div className="flex flex-wrap gap-1.5">
                  {attempt.stageStates[project.stages[1]?.id]?.selectedClassIds.map(id => {
                    const c = project.stages[1]?.classCandidates?.find(x => x.id === id);
                    return c ? (
                      <span key={id} className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)]">
                        {c.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-tertiary)] mb-1">{isUr ? 'Relationships' : 'Relationships'}</p>
                <div className="flex flex-wrap gap-1.5">
                  {attempt.stageStates[project.stages[3]?.id]?.selectedRelationshipIds.map(id => {
                    const r = project.stages[3]?.relationshipOptions?.find(x => x.id === id);
                    return r ? (
                      <span key={id} className="text-[11px] px-2 py-0.5 rounded bg-[var(--color-accent-secondary)]/10 text-[var(--color-accent-secondary)]">
                        {isUr ? r.labelUrdu : r.label}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm text-[var(--color-text-primary)] cursor-pointer pt-2 border-t border-[var(--color-border-primary)]">
                <input type="checkbox" checked={stageState.acknowledged} onChange={acknowledge} className="rounded" />
                {isUr ? 'Design theek lagta hai (Review complete)' : 'Architecture looks correct (Review complete)'}
              </label>
            </div>
          </div>
        );

      case 'test-scenarios':
        return (
          <div className="space-y-3">
            <Button variant="secondary" size="sm" onClick={runTests} leftIcon={<Bug className="w-3.5 h-3.5" />}>
              {stageState.testsRun ? (isUr ? 'Tests dobara chalayein' : 'Re-run tests') : (isUr ? 'Tests chalayein' : 'Run all tests')}
            </Button>
            {(stage.testScenarios || []).map(sc => {
              const result = stageState.testsRun ? stageState.testResults[sc.id] : undefined;
              return (
                <div
                  key={sc.id}
                  className={`p-3 rounded-lg border transition-all ${
                    result === true
                      ? 'border-[var(--color-accent-success)]/40 bg-[var(--color-accent-success)]/5'
                      : result === false
                      ? 'border-[var(--color-accent-error)]/40 bg-[var(--color-accent-error)]/5'
                      : 'border-[var(--color-border-primary)] bg-[var(--color-bg-input)]'
                  }`}
                >
                  <div className="flex items-start gap-2 mb-1">
                    {result === true ? (
                      <CheckCircle className="w-4 h-4 text-[var(--color-accent-success)] shrink-0 mt-0.5" />
                    ) : result === false ? (
                      <Circle className="w-4 h-4 text-[var(--color-accent-error)] shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-4 h-4 text-[var(--color-text-tertiary)] shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm text-[var(--color-text-primary)]">
                        {isUr ? sc.requirementUrdu : sc.requirement}
                      </p>
                      <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5">
                        {isUr ? sc.expectedBehaviorUrdu : sc.expectedBehavior}
                      </p>
                      {result === false && (
                        <p className="text-xs text-[var(--color-accent-error)] mt-1">
                          {isUr ? 'Fail \u2014 pehle stages check karein' : 'Fail \u2014 revisit earlier stages'}
                        </p>
                      )}
                    </div>
                    {result !== undefined && (
                      <Badge variant={result ? 'success' : 'error'} size="sm">
                        {result ? 'PASS' : 'FAIL'}
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );

      case 'assessment':
        return (
          <div className="space-y-4">
            {(stage.assessmentQuestions || []).map(q => {
              const selected = stageState.assessmentAnswers[q.id];
              const answered = selected !== undefined;
              return (
                <div key={q.id} className="p-3 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-bg-input)]">
                  <p className="text-sm text-[var(--color-text-primary)] mb-2">
                    {isUr ? q.questionUrdu : q.question}
                  </p>
                  <div className="space-y-1.5">
                    {q.options.map((opt, i) => {
                      const isSel = selected === i;
                      return (
                        <button
                          key={i}
                          onClick={() => answerAssessment(q.id, i)}
                          className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition-all ${
                            answered && i === q.correctIndex
                              ? 'border-[var(--color-accent-success)]/50 bg-[var(--color-accent-success)]/10 text-[var(--color-accent-success)]'
                              : isSel
                              ? answered
                                ? 'border-[var(--color-accent-error)]/50 bg-[var(--color-accent-error)]/10 text-[var(--color-accent-error)]'
                                : 'border-[var(--color-accent-primary)]/50 bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)]'
                              : 'border-[var(--color-border-primary)] bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-secondary)]'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {answered && (
                    <p className="mt-2 text-xs text-[var(--color-text-secondary)] border-t border-[var(--color-border-primary)] pt-2">
                      {isUr ? q.explanationUrdu : q.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <Button variant="ghost" size="sm" onClick={() => navigate('/projects')} leftIcon={<ChevronLeft className="w-4 h-4" />}>
          {isUr ? 'Projects' : 'Projects'}
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-[var(--color-text-primary)] truncate">
            {isUr ? project.titleUrdu : project.title}
          </h1>
          <p className="text-xs text-[var(--color-text-tertiary)]">
            {isUr ? project.briefingUrdu : project.briefing}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="xp" size="sm">+{project.xpReward} XP</Badge>
          <Badge variant={project.difficulty === 'easy' ? 'success' : project.difficulty === 'medium' ? 'warning' : 'error'} size="sm">
            {project.difficulty.toUpperCase()}
          </Badge>
          <Button variant="ghost" size="icon" onClick={reset} title={isUr ? 'Reset project' : 'Reset project'}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="h-1.5 bg-[var(--color-bg-input)] rounded-full overflow-hidden mb-5">
        <div
          className="h-full bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4">
        <StageSidebar
          project={project}
          attempt={attempt}
          stageIndex={stageIndex}
          goToStage={goToStage}
          review={review}
        />

        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)] p-5"
            >
              <div className="flex items-center gap-2 mb-1">
                <StageIcon className="w-4 h-4 text-[var(--color-accent-primary)]" />
                <span className="text-[10px] font-mono text-[var(--color-text-tertiary)]">
                  STAGE {stageIndex + 1}/{project.stages.length}
                </span>
              </div>
              <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-1">
                {isUr ? stage.titleUrdu : stage.title}
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                {isUr ? stage.instructionsUrdu : stage.instructions}
              </p>

              <div className="mb-4">
                <HintsPanel
                  hints={stage.hints}
                  hintsUrdu={stage.hintsUrdu}
                  onUsed={useHint}
                />
              </div>

              {renderChoices()}

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--color-border-primary)]">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={stageIndex === 0}
                  onClick={() => goToStage(stageIndex - 1)}
                  leftIcon={<ChevronLeft className="w-3.5 h-3.5" />}
                >
                  {isUr ? 'Peechay' : 'Previous'}
                </Button>

                <div className="flex items-center gap-2">
                  {stageState.completed && stageIndex < project.stages.length - 1 && (
                    <Badge variant="success" size="sm">
                      <CheckCircle className="w-3 h-3" /> {isUr ? 'Complete' : 'Complete'}
                    </Badge>
                  )}
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={!canComplete}
                    onClick={handleComplete}
                    rightIcon={stageIndex < project.stages.length - 1 ? <ChevronRight className="w-3.5 h-3.5" /> : <Trophy className="w-3.5 h-3.5" />}
                  >
                    {stageIndex === project.stages.length - 1
                      ? (isUr ? 'Project Mukammal Karein' : 'Complete Project')
                      : (isUr ? 'Stage Complete' : 'Complete Stage')}
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {justCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border border-[var(--color-accent-success)]/30 bg-[var(--color-accent-success)]/5 p-4 text-center space-y-2"
              >
                <CheckCircle className="w-8 h-8 mx-auto text-[var(--color-accent-success)]" />
                <p className="text-sm font-semibold text-[var(--color-accent-success)]">
                  {justCompleted.done
                    ? (isUr ? 'Project Mukammal!' : 'Project Complete!')
                    : (isUr ? 'Stage Complete!' : 'Stage Complete!')}
                </p>
                {justCompleted.xp && (
                  <p className="text-xs text-[var(--color-xp-gold)] flex items-center justify-center gap-1">
                    <Lightbulb className="w-3 h-3" /> +{project.xpReward} XP {isUr ? 'mukammal' : 'earned'}
                  </p>
                )}
                <Button variant="ghost" size="sm" onClick={() => setJustCompleted(null)}>
                  {isUr ? 'Theek hai' : 'OK'}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {attempt.completed && review && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-[var(--color-xp-gold)]/25 bg-gradient-to-br from-[var(--color-xp-gold)]/5 to-transparent p-4 space-y-3"
            >
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[var(--color-xp-gold)]" />
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {isUr ? 'Project Review' : 'Project Review'}
                </h3>
                {review.xpEarned > 0 && (
                  <Badge variant="xp" size="sm">+{review.xpEarned} XP</Badge>
                )}
              </div>
              <div className="grid sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-[var(--color-accent-success)] mb-1 font-medium">
                    {isUr ? 'Requirements Mukammal' : 'Requirements Met'} ({review.requirementsSatisfied.length})
                  </p>
                  <ul className="space-y-0.5 text-[var(--color-text-secondary)]">
                    {(isUr ? review.requirementsSatisfiedUrdu : review.requirementsSatisfied).map((r, i) => (
                      <li key={i} className="flex gap-1.5"><CheckCircle className="w-3 h-3 shrink-0 mt-0.5 text-[var(--color-accent-success)]" />{r}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[var(--color-accent-error)] mb-1 font-medium">
                    {isUr ? 'Missed' : 'Missed'} ({review.missedRequirements.length})
                  </p>
                  <ul className="space-y-0.5 text-[var(--color-text-secondary)]">
                    {(isUr ? review.missedRequirementsUrdu : review.missedRequirements).map((r, i) => (
                      <li key={i} className="flex gap-1.5"><Circle className="w-3 h-3 shrink-0 mt-0.5 text-[var(--color-accent-error)]" />{r}</li>
                    ))}
                    {(isUr ? review.missedRequirementsUrdu : review.missedRequirements).length === 0 && (
                      <li className="text-[var(--color-text-tertiary)]">—</li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {review.conceptsPracticed.map(c => (
                  <Badge key={c} variant="outline" size="sm">{c}</Badge>
                ))}
              </div>
              <p className="text-xs text-[var(--color-text-secondary)]">
                {isUr ? 'Agla qadam: ' : 'Suggested next: '}
                {isUr ? review.suggestedNextUrdu : review.suggestedNext}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate('/challenges')}>
                  <Zap className="w-3 h-3" />
                  {isUr ? 'Boss Challenges' : 'Boss Challenges'}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => navigate('/projects')}>
                  {isUr ? 'Sab Projects' : 'All Projects'}
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
