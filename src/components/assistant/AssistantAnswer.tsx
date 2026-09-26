import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronRight,
  Lightbulb,
  AlertTriangle,
  Code2,
  ListChecks,
  BookOpen,
  ExternalLink,
  GitCompare,
  GraduationCap,
  MessageCircle,
  Tag,
  type LucideIcon,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { AssistantResponse } from '@/types/assistant';

interface AssistantAnswerProps {
  response: AssistantResponse;
}

function renderMarkdownBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-[var(--color-text-primary)]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function SectionHeader({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-4 h-4 text-[var(--color-accent-primary)]" />
      <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
        {title}
      </h4>
    </div>
  );
}

function CollapsibleSection({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-[var(--color-border-primary)] rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-4 py-2.5 bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-card)] transition-colors text-left"
      >
        <Icon className="w-4 h-4 text-[var(--color-accent-primary)]" />
        <span className="text-sm font-medium text-[var(--color-text-primary)] flex-1">{title}</span>
        {open ? (
          <ChevronDown className="w-4 h-4 text-[var(--color-text-tertiary)]" />
        ) : (
          <ChevronRight className="w-4 h-4 text-[var(--color-text-tertiary)]" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 border-t border-[var(--color-border-primary)]">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AssistantAnswer({ response }: AssistantAnswerProps) {
  return (
    <div className="space-y-4 p-4 md:p-6">
      {response.answer && (
        <Card className="p-5">
          <div className="text-sm text-[var(--color-text-primary)] leading-relaxed whitespace-pre-wrap">
            {renderMarkdownBold(response.answer)}
          </div>
        </Card>
      )}

      {response.simpleExplanation && (
        <CollapsibleSection title="Simple Explanation" icon={Lightbulb} defaultOpen>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            {response.simpleExplanation}
          </p>
        </CollapsibleSection>
      )}

      {response.romanUrduExplanation && (
        <Card className="p-4 border-l-2 border-l-[var(--color-accent-secondary)] bg-[var(--color-accent-secondary)]/5">
          <SectionHeader icon={BookOpen} title="Roman Urdu" />
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed italic">
            {response.romanUrduExplanation}
          </p>
        </Card>
      )}

      {response.codeExample && (
        <div>
          <SectionHeader icon={Code2} title="Code Example" />
          <div className="rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-primary)] p-4 font-mono text-sm text-[var(--color-text-primary)] overflow-x-auto">
            <pre className="whitespace-pre">{response.codeExample}</pre>
          </div>
        </div>
      )}

      {response.keyPoints && response.keyPoints.length > 0 && (
        <div>
          <SectionHeader icon={ListChecks} title="Key Points" />
          <ul className="space-y-2">
            {response.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-accent-success)]/10 text-[var(--color-accent-success)] text-xs font-medium flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {response.commonMistakes && response.commonMistakes.length > 0 && (
        <div>
          <SectionHeader icon={AlertTriangle} title="Common Mistakes" />
          <div className="space-y-2">
            {response.commonMistakes.map((mistake, i) => (
              <div
                key={i}
                className="flex items-start gap-2 p-3 rounded-lg bg-[var(--color-accent-warning)]/5 border border-[var(--color-accent-warning)]/20"
              >
                <AlertTriangle className="w-4 h-4 text-[var(--color-accent-warning)] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-[var(--color-text-secondary)]">{mistake}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {response.comparison && (
        <div>
          <SectionHeader icon={GitCompare} title="Comparison" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Card className="p-4">
              <h5 className="text-sm font-semibold text-[var(--color-accent-primary)] mb-2">
                {response.comparison.left.title}
              </h5>
              <ul className="space-y-1.5">
                {response.comparison.left.points.map((point, i) => (
                  <li key={i} className="text-xs text-[var(--color-text-secondary)] flex items-start gap-2">
                    <span className="text-[var(--color-accent-primary)] mt-0.5">•</span>
                    {point}
                  </li>
                ))}
              </ul>
              {response.comparison.left.codeExample && (
                <div className="mt-3 rounded-md bg-[var(--color-bg-input)] border border-[var(--color-border-primary)] p-3 font-mono text-xs text-[var(--color-text-primary)] overflow-x-auto">
                  <pre className="whitespace-pre">{response.comparison.left.codeExample}</pre>
                </div>
              )}
              {response.comparison.left.useCase && (
                <p className="mt-2 text-xs text-[var(--color-text-tertiary)] italic">
                  Use case: {response.comparison.left.useCase}
                </p>
              )}
            </Card>
            <Card className="p-4">
              <h5 className="text-sm font-semibold text-[var(--color-accent-secondary)] mb-2">
                {response.comparison.right.title}
              </h5>
              <ul className="space-y-1.5">
                {response.comparison.right.points.map((point, i) => (
                  <li key={i} className="text-xs text-[var(--color-text-secondary)] flex items-start gap-2">
                    <span className="text-[var(--color-accent-secondary)] mt-0.5">•</span>
                    {point}
                  </li>
                ))}
              </ul>
              {response.comparison.right.codeExample && (
                <div className="mt-3 rounded-md bg-[var(--color-bg-input)] border border-[var(--color-border-primary)] p-3 font-mono text-xs text-[var(--color-text-primary)] overflow-x-auto">
                  <pre className="whitespace-pre">{response.comparison.right.codeExample}</pre>
                </div>
              )}
              {response.comparison.right.useCase && (
                <p className="mt-2 text-xs text-[var(--color-text-tertiary)] italic">
                  Use case: {response.comparison.right.useCase}
                </p>
              )}
            </Card>
          </div>
        </div>
      )}

      {response.relatedTopics && response.relatedTopics.length > 0 && (
        <div>
          <SectionHeader icon={Tag} title="Related Topics" />
          <div className="flex flex-wrap gap-2">
            {response.relatedTopics.map((topic, i) => (
              <Badge key={i} variant="primary" size="md">
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {response.practiceLinks && response.practiceLinks.length > 0 && (
        <div>
          <SectionHeader icon={ExternalLink} title="Practice" />
          <div className="flex flex-wrap gap-2">
            {response.practiceLinks.map((link, i) => (
              <Button key={i} variant="outline" size="sm" asChild>
                <a href={link.path}>{link.label}</a>
              </Button>
            ))}
            {response.visualizationLink && (
              <Button variant="outline" size="sm" asChild>
                <a href={response.visualizationLink}>3D Visualization</a>
              </Button>
            )}
          </div>
        </div>
      )}

      {response.examNotes && response.examNotes.length > 0 && (
        <Card className="p-4 bg-[var(--color-accent-primary)]/5 border-[var(--color-accent-primary)]/20">
          <SectionHeader icon={GraduationCap} title="Exam Notes" />
          <ul className="space-y-1.5">
            {response.examNotes.map((note, i) => (
              <li key={i} className="text-sm text-[var(--color-text-secondary)] flex items-start gap-2">
                <span className="text-[var(--color-accent-primary)] mt-0.5">•</span>
                {note}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {response.vivaQuestions && response.vivaQuestions.length > 0 && (
        <CollapsibleSection title="Viva Questions" icon={MessageCircle}>
          <ol className="space-y-2">
            {response.vivaQuestions.map((q, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] text-xs font-medium flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
        </CollapsibleSection>
      )}
    </div>
  );
}
