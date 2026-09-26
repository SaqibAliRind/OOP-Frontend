import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Target, Lightbulb, AlertTriangle, Code2, GraduationCap,
  Brain, Award, Eye, Wrench, Trophy, ArrowRight, ArrowLeft, CheckCircle,
  MessageSquare,
} from 'lucide-react';
import { Button, Card, Badge } from '@/components/ui';
import { curriculumService } from '@/services/curriculumService';
import { progressService } from '@/services/progressService';
import { allQuestions } from '@/data/questions';
import {
  LessonHeader, LessonNavigation, ConceptExplanation, KeyPoints, RealWorldExamples,
  CommonMistakes, ExamNotes, JavaCodeBlock,
  QuickCheck,
  MistakeQuestionUI, OutputQuestionUI, CodeCompletionUI, DebuggingLab, ScenarioChallengeUI,
  LessonMission, LessonMasteryScreen, XpFeedback,
} from '@/components/learning';
import { SceneContainer } from '@/components/three';
import { getThreeDSceneConfig } from '@/data/threeDScenes';
import { JAVA_CODE_EXAMPLES } from '@/data/codeStudio';
import type { Mission, LessonMasteryBreakdown } from '@/types';

function getStudioExampleIdForLesson(lessonId: string): string {
  return JAVA_CODE_EXAMPLES.find(e => e.relatedLessonId === lessonId)?.id || JAVA_CODE_EXAMPLES[0]?.id || '';
}

const SECTION_IDS = ['mission', 'learn', 'visualize', 'code', 'think', 'scenario', 'break-it', 'debug', 'master'] as const;

const SECTION_CONFIG: Record<string, { icon: any; label: string; color: string }> = {
  mission: { icon: Target, label: 'Mission', color: 'var(--color-accent-primary)' },
  learn: { icon: BookOpen, label: 'Learn', color: 'var(--color-accent-primary)' },
  visualize: { icon: Eye, label: 'Visualize', color: 'var(--color-accent-secondary)' },
  code: { icon: Code2, label: 'Code', color: 'var(--color-accent-success)' },
  think: { icon: Brain, label: 'Think', color: 'var(--color-accent-warning)' },
  scenario: { icon: GraduationCap, label: 'Scenario', color: 'var(--color-accent-secondary)' },
  'break-it': { icon: AlertTriangle, label: 'Break It', color: 'var(--color-accent-error)' },
  debug: { icon: Wrench, label: 'Debug', color: 'var(--color-accent-error)' },
  master: { icon: Trophy, label: 'Master', color: 'var(--color-xp-gold)' },
};

export function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const lesson = curriculumService.getLesson(lessonId || '');
  const module = lesson ? curriculumService.getModule(lesson.moduleId) : null;

  const [activeSection, setActiveSection] = useState<string>('mission');
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [showXpFeedback, setShowXpFeedback] = useState<string | null>(null);
  const [xpAmount, setXpAmount] = useState(0);
  const [showMasteryScreen, setShowMasteryScreen] = useState(false);
  const [masteryBreakdown, setMasteryBreakdown] = useState<LessonMasteryBreakdown | null>(null);
  const [currentMistakeIndex, setCurrentMistakeIndex] = useState(0);
  const [currentOutputIndex, setCurrentOutputIndex] = useState(0);
  const [currentDebugIndex, setCurrentDebugIndex] = useState(0);
  const [currentCodeCompIndex, setCurrentCodeCompIndex] = useState(0);
  const [vivaConfidence, setVivaConfidence] = useState<Record<string, string>>({});
  const [showUrdu, setShowUrdu] = useState(false);

  const getLessonProgress = useCallback((id: string) => {
    return progressService.getLessonProgress(id);
  }, []);

  const markLessonSection = useCallback((lessonId: string, section: string) => {
    progressService.updateLessonProgress(lessonId, { [section]: true });
  }, []);

  const lessonMistakes = useMemo(() =>
    lesson ? allQuestions.mistake.filter(m => m.lessonId === lesson.id) : [],
    [lesson]
  );
  const lessonOutputQuestions = useMemo(() =>
    lesson ? allQuestions.output.filter(o => o.lessonId === lesson.id) : [],
    [lesson]
  );
  const lessonDebugChallenges = useMemo(() =>
    lesson ? allQuestions.debug.filter(d => d.lessonId === lesson.id) : [],
    [lesson]
  );
  const lessonCodeCompletion = useMemo(() =>
    lesson ? allQuestions.codeCompletion.filter(c => c.lessonId === lesson.id) : [],
    [lesson]
  );

  const mission: Mission = useMemo(() => {
    if (!lesson) return { id: '', title: '', description: '', objectives: [], xpReward: 0, completed: false };
    return {
      id: `mission-${lesson.id}`,
      title: `Mission: ${lesson.title}`,
      description: `Master the concepts in ${lesson.title}`,
      objectives: lesson.learningObjectives.map(obj => ({
        id: obj.id,
        description: obj.description,
        completed: obj.completed,
        type: 'understand' as const,
      })),
      xpReward: lesson.xpReward,
      completed: false,
    };
  }, [lesson]);

  useEffect(() => {
    if (!lesson) return;
    const existing = getLessonProgress(lesson.id);
    if (!existing.started) {
      markLessonSection(lesson.id, 'started');
    }
  }, [lesson?.id]);

  const markSectionComplete = useCallback((section: string) => {
    setCompletedSections(prev => {
      const next = new Set(prev);
      next.add(section);
      return next;
    });
  }, []);

  const awardXpOnce = useCallback((
    type: 'quick-check' | 'scenario' | 'debugging' | 'mini-challenge' | 'mastery',
    sectionFlag: string
  ) => {
    if (!lesson) return;
    const existing = getLessonProgress(lesson.id);
    if (existing[sectionFlag as keyof typeof existing]) return;
    const result = progressService.awardXpWithCombo(type);
    setXpAmount(result.total);
    setShowXpFeedback(type);
  }, [lesson, getLessonProgress]);

  const advanceToNextSection = useCallback(() => {
    const currentIndex = SECTION_IDS.indexOf(activeSection as any);
    if (currentIndex < SECTION_IDS.length - 1) {
      setActiveSection(SECTION_IDS[currentIndex + 1]);
    }
  }, [activeSection]);

  const calculateAndShowMastery = useCallback(() => {
    if (!lesson) return;
    const existing = getLessonProgress(lesson.id);
    const sections = ['read', 'visualized', 'quickCheckCompleted', 'scenarioCompleted', 'mistakeCompleted', 'debuggingCompleted', 'practiceCompleted'];
    const completedCount = sections.filter(s => existing[s as keyof typeof existing]).length;
    const total = Math.max(sections.length, 1);
    const masteryScore = Math.round((completedCount / total) * 100);
    const breakdown: LessonMasteryBreakdown = {
      understanding: existing.read || existing.started ? 100 : 0,
      visualization: existing.visualized ? 100 : 0,
      quickCheck: existing.quickCheckCompleted ? 100 : 0,
      scenario: existing.scenarioCompleted ? 100 : 0,
      debugging: existing.debuggingCompleted ? 100 : 0,
      practice: existing.practiceCompleted ? 100 : 0,
      total: masteryScore,
    };
    setMasteryBreakdown(breakdown);
    setShowMasteryScreen(true);
    if (masteryScore >= 75) {
      const alreadyCompleted = progressService.getProgress().completedLessons[lesson.id] !== undefined;
      progressService.updateLessonProgress(lesson.id, { completed: true });
      progressService.completeLesson(lesson.id, masteryScore, lesson.xpReward);
      if (!alreadyCompleted && !existing.masteryXpAwarded) {
        progressService.updateLessonProgress(lesson.id, { masteryXpAwarded: true });
        awardXpOnce('mastery', 'masteryXpAwarded');
      }
    }
  }, [lesson, awardXpOnce, getLessonProgress]);

  const handleQuickCheckComplete = useCallback((score: number) => {
    if (!lesson) return;
    markLessonSection(lesson.id, 'quickCheckCompleted');
    markSectionComplete('think');
    if (score >= 70) awardXpOnce('quick-check', 'quickCheckXpAwarded');
    advanceToNextSection();
  }, [lesson, markSectionComplete, awardXpOnce, advanceToNextSection, markLessonSection]);

  const handleScenarioComplete = useCallback((correct: boolean) => {
    if (!lesson) return;
    markLessonSection(lesson.id, 'scenarioCompleted');
    markSectionComplete('scenario');
    if (correct) awardXpOnce('scenario', 'scenarioXpAwarded');
    advanceToNextSection();
  }, [lesson, markSectionComplete, awardXpOnce, advanceToNextSection, markLessonSection]);

  const handleMistakeComplete = useCallback((correct: boolean) => {
    if (!lesson) return;
    markLessonSection(lesson.id, 'mistakeCompleted');
    markSectionComplete('break-it');
    if (correct) awardXpOnce('mini-challenge', 'mistakeXpAwarded');
    advanceToNextSection();
  }, [lesson, markSectionComplete, awardXpOnce, advanceToNextSection, markLessonSection]);

  const handleDebugComplete = useCallback((solved: boolean) => {
    if (!lesson) return;
    markLessonSection(lesson.id, 'debuggingCompleted');
    markSectionComplete('debug');
    if (solved) awardXpOnce('debugging', 'debugXpAwarded');
    advanceToNextSection();
  }, [lesson, markSectionComplete, awardXpOnce, advanceToNextSection, markLessonSection]);

  const handleMarkRead = useCallback(() => {
    if (!lesson) return;
    markLessonSection(lesson.id, 'read');
    markSectionComplete('learn');
  }, [lesson, markSectionComplete, markLessonSection]);

  const handleMarkVisualized = useCallback(() => {
    if (!lesson) return;
    markLessonSection(lesson.id, 'visualized');
    markSectionComplete('visualize');
  }, [lesson, markSectionComplete, markLessonSection]);

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Card variant="elevated" padding="lg" className="text-center max-w-md">
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">Lesson Not Found</h2>
          <p className="text-[var(--color-text-secondary)] mb-4">The lesson you're looking for doesn't exist.</p>
          <Button asChild><Link to="/curriculum">Back to Curriculum</Link></Button>
        </Card>
      </div>
    );
  }

  if (showMasteryScreen && masteryBreakdown) {
    return (
      <LessonMasteryScreen
        lessonTitle={lesson.title}
        moduleTitle={module?.title || ''}
        mastery={masteryBreakdown}
        xpEarned={lesson.xpReward}
        onContinue={() => navigate(-1)}
        onReviewWeak={() => { setShowMasteryScreen(false); setActiveSection('learn'); }}
        onRetry={() => { setShowMasteryScreen(false); setCompletedSections(new Set()); setActiveSection('mission'); }}
      />
    );
  }

  const sectionIndex = SECTION_IDS.indexOf(activeSection as any);
  const sectionConfig = SECTION_CONFIG[activeSection];
  const SectionIcon = sectionConfig?.icon || BookOpen;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <AnimatePresence>
        {showXpFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50"
          >
            <XpFeedback
              amount={xpAmount}
              streak={progressService.getCombo().currentStreak}
              onComplete={() => setShowXpFeedback(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <LessonHeader lesson={lesson} module={module!} />

      <div className="flex items-center gap-2">
        <Link
          to={`/assistant?lesson=${lesson.id}`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)]/20 transition-colors whitespace-nowrap"
        >
          <MessageSquare className="w-3 h-3" />
          Ask OOP Assistant
        </Link>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {SECTION_IDS.map((id, i) => {
          const config = SECTION_CONFIG[id];
          const Icon = config.icon;
          const isActive = id === activeSection;
          const isCompleted = completedSections.has(id);
          const isAvailable = i <= sectionIndex + 1;

          if (id === 'visualize' && !lesson.threeDSceneId) return null;
          if (id === 'break-it' && lessonMistakes.length === 0) return null;
          if (id === 'debug' && lessonDebugChallenges.length === 0 && lessonOutputQuestions.length === 0) return null;

          return (
            <button
              key={id}
              onClick={() => isAvailable && setActiveSection(id)}
              disabled={!isAvailable}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-[var(--color-accent-primary)] text-white'
                  : isCompleted
                  ? 'bg-[var(--color-accent-success)]/10 text-[var(--color-accent-success)]'
                  : isAvailable
                  ? 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
                  : 'bg-[var(--color-bg-input)] text-[var(--color-text-tertiary)] opacity-50'
              }`}
            >
              {isCompleted ? <CheckCircle className="w-3 h-3" /> : <Icon className="w-3 h-3" />}
              {config.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SectionIcon className="w-5 h-5" style={{ color: sectionConfig?.color }} />
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{sectionConfig?.label}</h2>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" size="sm">{sectionIndex + 1}/{SECTION_IDS.length}</Badge>
          <div className="flex gap-1 text-xs">
            <span className="text-[var(--color-text-tertiary)]">EN</span>
            <button
              onClick={() => setShowUrdu(!showUrdu)}
              className={`px-1 rounded ${showUrdu ? 'bg-[var(--color-accent-primary)] text-white' : 'text-[var(--color-text-secondary)]'}`}
            >
              UR
            </button>
          </div>
        </div>
      </div>

      <div className="h-1 bg-[var(--color-bg-input)] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[var(--color-accent-primary)] rounded-full"
          animate={{ width: `${((sectionIndex + 1) / SECTION_IDS.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {activeSection === 'mission' && (
            <div className="space-y-4">
              <LessonMission mission={mission} />
              <div className="flex justify-end">
                <Button variant="primary" onClick={() => { markSectionComplete('mission'); advanceToNextSection(); }} className="gap-2">
                  Start Learning <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {activeSection === 'learn' && (
            <div className="space-y-6">
              <ConceptExplanation
                title="Concept Explanation"
                englishExplanation={lesson.englishExplanation.text}
                romanUrduExplanation={lesson.romanUrduExplanation.text}
                showUrdu={showUrdu}
              />
              {lesson.keyPoints.length > 0 && (
                <section>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-[var(--color-accent-warning)]" /> Key Points
                  </h3>
                  <KeyPoints points={lesson.keyPoints} />
                </section>
              )}
              {lesson.realWorldExamples.length > 0 && (
                <section>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[var(--color-accent-secondary)]" /> Real-World Examples
                  </h3>
                  <RealWorldExamples examples={lesson.realWorldExamples} />
                </section>
              )}
              {lesson.codeExamples.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-[var(--color-accent-primary)]" /> Code Examples
                    </h3>
                    <Link
                      to={`/code-studio?example=${encodeURIComponent(getStudioExampleIdForLesson(lesson.id))}`}
                      className="inline-flex items-center gap-1.5 text-sm text-[var(--color-accent-primary)] hover:underline"
                    >
                      Open in Code Studio <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {lesson.codeExamples.map((example, i) => (
                      <motion.div key={example.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                        <JavaCodeBlock code={example.code} title={example.title} showLineNumbers={example.showLineNumbers ?? true} language={example.language} copyable expandable />
                        {example.explanation && <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{example.explanation}</p>}
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}
              <div className="flex justify-end">
                <Button variant="primary" onClick={() => { handleMarkRead(); advanceToNextSection(); }} className="gap-2">
                  Continue <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {activeSection === 'visualize' && lesson.threeDSceneId && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">3D Visualization</h3>
                <Badge variant="secondary" size="sm">Interactive</Badge>
              </div>
              {(() => {
                const sceneConfig = getThreeDSceneConfig(lesson.threeDSceneId!);
                return sceneConfig ? <SceneContainer config={sceneConfig} /> : (
                  <Card variant="elevated" padding="lg" className="text-center py-12">
                    <p className="text-[var(--color-text-secondary)]">3D scene not found</p>
                  </Card>
                );
              })()}
              <div className="flex justify-end">
                <Button variant="primary" onClick={() => { handleMarkVisualized(); advanceToNextSection(); }} className="gap-2">
                  Continue <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {activeSection === 'code' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Code Practice</h3>
              {lesson.codeExamples.length > 0 ? (
                <div className="space-y-4">
                  {lesson.codeExamples.map((example, i) => (
                    <motion.div key={example.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                      <JavaCodeBlock code={example.code} title={example.title} showLineNumbers language={example.language} copyable downloadable expandable />
                      {example.output && (
                        <div className="mt-2 p-3 bg-[var(--color-bg-input)] rounded-lg font-mono text-sm text-[var(--color-accent-success)]">
                          <strong>Output:</strong>
                          <pre className="mt-1 whitespace-pre-wrap">{example.output}</pre>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Card variant="outlined" padding="lg" className="text-center">
                  <Code2 className="w-12 h-12 mx-auto mb-4 text-[var(--color-text-tertiary)]" />
                  <p className="text-[var(--color-text-secondary)]">Code examples are included in the Learn section.</p>
                </Card>
              )}
              {lessonCodeCompletion.length > 0 && (
                <section>
                  <h4 className="font-semibold text-[var(--color-text-primary)] mb-3">Complete the Code</h4>
                  <CodeCompletionUI
                    key={lessonCodeCompletion[currentCodeCompIndex]?.id}
                    question={lessonCodeCompletion[currentCodeCompIndex]}
                    onComplete={(_correct) => {
                      if (currentCodeCompIndex < lessonCodeCompletion.length - 1) {
                        setCurrentCodeCompIndex(prev => prev + 1);
                      } else {
                        markSectionComplete('code');
                        advanceToNextSection();
                      }
                    }}
                  />
                </section>
              )}
              {lessonCodeCompletion.length === 0 && (
                <div className="flex justify-end">
                  <Button variant="primary" onClick={() => { markSectionComplete('code'); advanceToNextSection(); }} className="gap-2">
                    Continue <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {activeSection === 'think' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                <Brain className="w-5 h-5 text-[var(--color-accent-warning)]" /> Quick Check
              </h3>
              {lesson.quickCheckQuestions.length > 0 ? (
                <QuickCheck
                  questions={lesson.quickCheckQuestions}
                  onComplete={handleQuickCheckComplete}
                />
              ) : (
                <Card variant="outlined" padding="lg" className="text-center">
                  <Brain className="w-12 h-12 mx-auto mb-4 text-[var(--color-text-tertiary)]" />
                  <p className="text-[var(--color-text-secondary)]">No quick check questions available for this lesson.</p>
                  <Button variant="outline" className="mt-4" onClick={() => { markSectionComplete('think'); advanceToNextSection(); }}>
                    Skip to Next
                  </Button>
                </Card>
              )}
            </div>
          )}

          {activeSection === 'scenario' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[var(--color-accent-secondary)]" /> Real-World Scenario
              </h3>
              {lesson.scenarioQuestions.length > 0 ? (
                <div className="space-y-4">
                  {lesson.scenarioQuestions.map((sq) => (
                    <ScenarioChallengeUI key={sq.id} question={sq} onComplete={handleScenarioComplete} />
                  ))}
                </div>
              ) : (
                <Card variant="outlined" padding="lg" className="text-center">
                  <GraduationCap className="w-12 h-12 mx-auto mb-4 text-[var(--color-text-tertiary)]" />
                  <p className="text-[var(--color-text-secondary)]">No scenario questions for this lesson.</p>
                  <Button variant="outline" className="mt-4" onClick={() => { markSectionComplete('scenario'); advanceToNextSection(); }}>
                    Skip to Next
                  </Button>
                </Card>
              )}
            </div>
          )}

          {activeSection === 'break-it' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[var(--color-accent-error)]" /> Break It — Find the Mistake
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Making mistakes is part of learning. Study the code and identify what's wrong.
              </p>
              {lessonMistakes.length > 0 ? (
                <MistakeQuestionUI
                  key={lessonMistakes[currentMistakeIndex]?.id}
                  question={lessonMistakes[currentMistakeIndex]}
                  onComplete={(correct) => {
                    handleMistakeComplete(correct);
                    if (currentMistakeIndex < lessonMistakes.length - 1) {
                      setCurrentMistakeIndex(prev => prev + 1);
                    }
                  }}
                />
              ) : (
                <Card variant="outlined" padding="lg" className="text-center">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-[var(--color-text-tertiary)]" />
                  <p className="text-[var(--color-text-secondary)]">No mistake challenges for this lesson.</p>
                  <Button variant="outline" className="mt-4" onClick={() => { markSectionComplete('break-it'); advanceToNextSection(); }}>
                    Skip to Next
                  </Button>
                </Card>
              )}
            </div>
          )}

          {activeSection === 'debug' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[var(--color-accent-error)]" /> Debug Lab
              </h3>
              {lessonDebugChallenges.length > 0 ? (
                <DebuggingLab
                  key={lessonDebugChallenges[currentDebugIndex]?.id}
                  challenge={lessonDebugChallenges[currentDebugIndex]}
                  onComplete={(solved) => {
                    handleDebugComplete(solved);
                    if (currentDebugIndex < lessonDebugChallenges.length - 1) {
                      setCurrentDebugIndex(prev => prev + 1);
                    }
                  }}
                />
              ) : lessonOutputQuestions.length > 0 ? (
                <div className="space-y-4">
                  <h4 className="font-semibold text-[var(--color-text-primary)]">Predict the Output</h4>
                  <OutputQuestionUI
                    key={lessonOutputQuestions[currentOutputIndex]?.id}
                    question={lessonOutputQuestions[currentOutputIndex]}
                    onComplete={(_correct) => {
                      if (currentOutputIndex < lessonOutputQuestions.length - 1) {
                        setCurrentOutputIndex(prev => prev + 1);
                      } else {
                        handleDebugComplete(true);
                      }
                    }}
                  />
                </div>
              ) : (
                <Card variant="outlined" padding="lg" className="text-center">
                  <Wrench className="w-12 h-12 mx-auto mb-4 text-[var(--color-text-tertiary)]" />
                  <p className="text-[var(--color-text-secondary)]">No debug challenges for this lesson.</p>
                  <Button variant="outline" className="mt-4" onClick={() => { markSectionComplete('debug'); advanceToNextSection(); }}>
                    Skip to Next
                  </Button>
                </Card>
              )}
            </div>
          )}

          {activeSection === 'master' && (
            <div className="space-y-6">
              {lesson.commonMistakes.length > 0 && (
                <section>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-[var(--color-accent-error)]" /> Common Mistakes
                  </h3>
                  <CommonMistakes mistakes={lesson.commonMistakes} />
                </section>
              )}
              {lesson.examNotes.length > 0 && (
                <section>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[var(--color-xp-gold)]" /> Exam Notes
                  </h3>
                  <ExamNotes notes={lesson.examNotes} />
                </section>
              )}
              {lesson.vivaQuestions.length > 0 && (
                <section>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-[var(--color-accent-secondary)]" /> Viva Questions
                  </h3>
                  <div className="space-y-3">
                    {lesson.vivaQuestions.map((vq) => (
                      <VivaQuestionCard
                        key={vq.id}
                        question={vq.question}
                        answer={vq.answer}
                        difficulty={vq.difficulty}
                        confidence={vivaConfidence[vq.id]}
                        onConfidenceChange={(conf) => setVivaConfidence(prev => ({ ...prev, [vq.id]: conf }))}
                      />
                    ))}
                  </div>
                </section>
              )}
              <div className="flex justify-end gap-3">
                <Button variant="primary" onClick={calculateAndShowMastery} className="gap-2">
                  Complete Lesson <Trophy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border-primary)]">
        <Button
          variant="ghost"
          onClick={() => { const i = SECTION_IDS.indexOf(activeSection as any); if (i > 0) setActiveSection(SECTION_IDS[i - 1]); }}
          disabled={sectionIndex === 0}
          className="gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </Button>
        <span className="text-xs text-[var(--color-text-tertiary)]">
          {completedSections.size}/{SECTION_IDS.filter(id => {
            if (id === 'visualize' && !lesson.threeDSceneId) return false;
            if (id === 'break-it' && lessonMistakes.length === 0) return false;
            if (id === 'debug' && lessonDebugChallenges.length === 0 && lessonOutputQuestions.length === 0) return false;
            return true;
          }).length} sections complete
        </span>
        <Button
          variant="ghost"
          onClick={() => { const i = SECTION_IDS.indexOf(activeSection as any); if (i < SECTION_IDS.length - 1) setActiveSection(SECTION_IDS[i + 1]); }}
          disabled={sectionIndex === SECTION_IDS.length - 1}
          className="gap-1"
        >
          Next <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <LessonNavigation
        lesson={lesson}
        module={module!}
        onPrevious={() => {
          const prev = curriculumService.getPreviousLesson(lesson.id);
          if (prev) navigate(`/lesson/${prev.id}`);
        }}
        onNext={() => {
          const next = curriculumService.getNextLesson(lesson.id);
          if (next) navigate(`/lesson/${next.id}`);
          else navigate(`/module/${module!.id}`);
        }}
      />
    </div>
  );
}

function VivaQuestionCard({ question, answer, difficulty, confidence, onConfidenceChange }: {
  question: string; answer: string; difficulty: string; confidence?: string;
  onConfidenceChange: (c: string) => void;
}) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <Card variant="default" padding="md" className="space-y-3">
      <div className="flex items-center justify-between">
        <Badge variant={difficulty as any} size="sm">{difficulty.toUpperCase()}</Badge>
      </div>
      <p className="font-medium text-[var(--color-text-primary)]">{question}</p>
      {!showAnswer ? (
        <Button variant="outline" size="sm" onClick={() => setShowAnswer(true)}>Reveal Answer</Button>
      ) : (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-3">
          <p className="text-sm text-[var(--color-text-secondary)]">{answer}</p>
          <div className="flex gap-2">
            <span className="text-xs text-[var(--color-text-tertiary)]">Confidence:</span>
            {['not-sure', 'okay', 'confident'].map(level => (
              <button
                key={level}
                onClick={() => onConfidenceChange(level)}
                className={`px-2 py-0.5 rounded text-xs ${
                  confidence === level
                    ? 'bg-[var(--color-accent-primary)] text-white'
                    : 'bg-[var(--color-bg-input)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
                }`}
              >
                {level === 'not-sure' ? 'Not Sure' : level === 'okay' ? 'Okay' : 'Confident'}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </Card>
  );
}
