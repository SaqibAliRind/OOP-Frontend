import { CodeWorkspace } from '@/components/code';
import { ErrorPanel } from '@/components/code/ErrorPanel';
import { Badge } from '@/components/ui';
import { Bug, Target } from 'lucide-react';

const SAMPLE_BUGGY_CODE = `class Student {
    private String name;

    public void setName(String name)
        this.name = name
    }
}`;

interface DebugMissionPanelProps {
  title?: string;
  description?: string;
}

export function DebugMissionPanel({
  title = 'Fix the broken Student class',
  description = 'Find the syntax issues and reason about encapsulation while you debug.',
}: DebugMissionPanelProps) {
  return (
    <div className="space-y-5">
      {/* Mission Briefing */}
      <div className="p-4 rounded-xl border border-[var(--color-accent-error)]/20 bg-[var(--color-accent-error)]/5">
        <div className="flex items-center gap-2 mb-2">
          <Bug className="w-4 h-4 text-[var(--color-accent-error)]" />
          <span className="text-[10px] tracking-[0.15em] font-semibold text-[var(--color-accent-error)] uppercase">
            Debug Mission
          </span>
        </div>
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">{title}</h3>
        <p className="text-sm text-[var(--color-text-secondary)]">{description}</p>
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-tertiary)]">
            <Target className="w-3 h-3" />
            <span>Syntax Error</span>
          </div>
          <Badge variant="outline" size="sm">Encapsulation</Badge>
        </div>
      </div>

      {/* Code + Error */}
      <CodeWorkspace
        filename="Student.java"
        code={SAMPLE_BUGGY_CODE}
        mockError={{ file: 'Student.java', line: 5, message: "';' expected" }}
      />

      <ErrorPanel
        file="Student.java"
        line={5}
        message="';' expected"
        onHint={() => undefined}
        onExplain={() => undefined}
        onRetry={() => undefined}
        onShowSolution={() => undefined}
      />
    </div>
  );
}
