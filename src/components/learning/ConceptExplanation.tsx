import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';
import { Card, Badge, LucideIcon } from '@/components/ui';
import type { KeyPoint, RealWorldExample, CommonMistake, ExamNote, VivaQuestion } from '@/types';

interface ConceptExplanationProps {
  title: string;
  englishExplanation: string;
  romanUrduExplanation?: string;
  showUrdu?: boolean;
  className?: string;
}

export function ConceptExplanation({
  title,
  englishExplanation,
  romanUrduExplanation,
  showUrdu = true,
  className,
}: ConceptExplanationProps) {
  return (
    <Card variant="default" padding="lg" className={cn('animate-in fade-in duration-300', className)}>
      <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[var(--color-accent-primary)]" />
        {title}
      </h2>

      <div className="prose prose-invert max-w-none text-[var(--color-text-secondary)] leading-relaxed">
        <p className="mb-4">{englishExplanation}</p>
      </div>

      {showUrdu && romanUrduExplanation && (
        <div className="mt-6 pt-6 border-t border-[var(--color-border-primary)]">
          <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-accent-secondary)] mb-3">
            <span className="text-xs bg-[var(--color-accent-secondary)]/20 px-2 py-0.5 rounded">Roman Urdu</span>
            <span>Explanation</span>
          </div>
          <p className="text-[var(--color-text-secondary)] leading-relaxed font-medium">{romanUrduExplanation}</p>
        </div>
      )}
    </Card>
  );
}

interface KeyPointsProps {
  points: KeyPoint[];
  className?: string;
}

export function KeyPoints({ points, className }: KeyPointsProps) {
  return (
    <div className={cn('grid gap-4 md:grid-cols-2 lg:grid-cols-3', className)}>
      {points.map((point, index) => (
        <motion.div
          key={point.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <Card variant="outlined" padding="md" className="h-full transition-all hover:border-[var(--color-accent-primary)]/50 hover:shadow-[var(--shadow-lg)]">
            {point.icon && (
              <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-primary)]/15 flex items-center justify-center mb-3 group-hover:bg-[var(--color-accent-primary)]/25 transition-colors">
                <LucideIcon icon={point.icon} className="w-5 h-5 text-[var(--color-accent-primary)]" />
              </div>
            )}
            <h3 className="font-medium text-[var(--color-text-primary)] mb-1">{point.title}</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">{point.description}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

interface RealWorldExamplesProps {
  examples: RealWorldExample[];
  className?: string;
}

export function RealWorldExamples({ examples, className }: RealWorldExamplesProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {examples.map((example, index) => (
        <motion.div
          key={example.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card variant="outlined" padding="lg">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" size="sm">{example.oopConcept}</Badge>
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{example.title}</h3>
              </div>
            </div>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">{example.scenario}</p>
            {example.codeExample && (
              <div className="border-t border-[var(--color-border-primary)] pt-4">
                <p className="text-sm text-[var(--color-text-tertiary)] mb-2">Code Example:</p>
                {/* JavaCodeBlock would be used here */}
                <pre className="bg-[var(--color-bg-input)] p-3 rounded text-sm overflow-auto text-[var(--color-text-primary)]">
                  {example.codeExample.code}
                </pre>
              </div>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

interface CommonMistakesProps {
  mistakes: CommonMistake[];
  className?: string;
}

export function CommonMistakes({ mistakes, className }: CommonMistakesProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {mistakes.map((mistake, index) => (
        <motion.div
          key={mistake.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card variant="outlined" padding="lg" className="border-l-4 border-[var(--color-accent-error)]">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="error" size="sm">Common Mistake</Badge>
              <h3 className="font-semibold text-[var(--color-text-primary)]">{mistake.title}</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs font-medium text-[var(--color-accent-error)] mb-2">❌ Incorrect</p>
                <pre className="bg-red-900/20 border border-red-500/30 p-3 rounded text-sm overflow-auto text-red-300">
                  {mistake.incorrectCode}
                </pre>
              </div>
              <div>
                <p className="text-xs font-medium text-[var(--color-accent-success)] mb-2">✅ Correct</p>
                <pre className="bg-green-900/20 border border-green-500/30 p-3 rounded text-sm overflow-auto text-green-300">
                  {mistake.correctCode}
                </pre>
              </div>
            </div>

            <div className="p-3 bg-[var(--color-bg-tertiary)] rounded-lg">
              <p className="text-sm text-[var(--color-text-secondary)]"><strong>Explanation:</strong> {mistake.explanation}</p>
              {mistake.romanUrduExplanation && (
                <p className="mt-2 text-sm text-[var(--color-accent-secondary)] font-medium">{mistake.romanUrduExplanation}</p>
              )}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

interface ExamNotesProps {
  notes: ExamNote[];
  className?: string;
}

export function ExamNotes({ notes, className }: ExamNotesProps) {
  const importanceColors = {
    high: 'border-[var(--color-accent-error)] bg-[var(--color-accent-error)]/10',
    medium: 'border-[var(--color-accent-warning)] bg-[var(--color-accent-warning)]/10',
    low: 'border-[var(--color-accent-info)] bg-[var(--color-accent-info)]/10',
  };

  return (
    <div className={cn('space-y-3', className)}>
      {notes.map((note, index) => (
        <motion.div
          key={note.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card
            variant="outlined"
            padding="md"
            className={cn('border-l-4', importanceColors[note.importance])}
          >
            <div className="flex items-start gap-3">
              <Badge variant={note.importance} size="sm" className="shrink-0 mt-0.5">
                {note.importance.toUpperCase()}
              </Badge>
              <div className="flex-1">
                <h4 className="font-medium text-[var(--color-text-primary)] mb-1">{note.title}</h4>
                <p className="text-sm text-[var(--color-text-secondary)]">{note.content}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

interface VivaQuestionsProps {
  questions: VivaQuestion[];
  className?: string;
}

export function VivaQuestions({ questions, className }: VivaQuestionsProps) {
  const difficultyColors = {
    easy: 'text-[var(--color-accent-success)]',
    medium: 'text-[var(--color-accent-warning)]',
    hard: 'text-[var(--color-accent-error)]',
  };

  return (
    <div className={cn('space-y-3', className)}>
      {questions.map((q, index) => (
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card variant="outlined" padding="md">
            <div className="flex items-start justify-between gap-3 mb-2">
              <p className="font-medium text-[var(--color-text-primary)] flex-1">Q: {q.question}</p>
              <Badge variant="outline" size="sm" className={difficultyColors[q.difficulty]}>
                {q.difficulty.toUpperCase()}
              </Badge>
            </div>
            <details className="group">
              <summary className="text-sm text-[var(--color-text-tertiary)] cursor-pointer list-none flex items-center gap-1">
                <span>Show Answer</span>
                <svg className="w-4 h-4 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="mt-3 p-3 bg-[var(--color-bg-tertiary)] rounded-lg text-sm text-[var(--color-text-secondary)]">
                <p className="font-medium mb-1">Answer:</p>
                <p>{q.answer}</p>
              </div>
            </details>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}