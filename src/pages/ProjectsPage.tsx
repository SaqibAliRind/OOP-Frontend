import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FolderKanban, Clock, Zap, ChevronRight, BookOpen, Shield, CheckCircle } from 'lucide-react';
import { Button, Badge, EmptyState } from '@/components/ui';
import { projectService } from '@/services/projectService';
import { useLanguage } from '@/contexts/LanguageContext';
import type { OOPProjectScenario } from '@/types/projectSimulator';

function ProjectCard({ project, index }: { project: OOPProjectScenario; index: number }) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const attempt = projectService.getAttempt(project.id);
  const completedCount = attempt.completedStages.length;
  const totalStages = project.stages.length;
  const percent = Math.round((completedCount / totalStages) * 100);
  const isUr = language === 'ur';

  const difficultyVariant =
    project.difficulty === 'easy' ? 'success' : project.difficulty === 'medium' ? 'warning' : 'error';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)] p-4 hover:border-[var(--color-border-secondary)] transition-all group cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/projects/${project.id}`)}
      onKeyDown={e => e.key === 'Enter' && navigate(`/projects/${project.id}`)}
      aria-label={project.title}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-primary)]/10 flex items-center justify-center shrink-0">
            <FolderKanban className="w-5 h-5 text-[var(--color-accent-primary)]" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] truncate">
              {isUr ? project.titleUrdu : project.title}
            </h3>
            <p className="text-[11px] text-[var(--color-text-tertiary)] truncate">
              {isUr ? project.descriptionUrdu : project.description}
            </p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent-primary)] transition-colors shrink-0" />
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <Badge variant={difficultyVariant} size="sm">{project.difficulty.toUpperCase()}</Badge>
        <Badge variant="xp" size="sm">+{project.xpReward} XP</Badge>
        {attempt.completed && (
          <Badge variant="success" size="sm">
            <CheckCircle className="w-3 h-3" /> {isUr ? 'Mukammal' : 'Complete'}
          </Badge>
        )}
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {project.concepts.slice(0, 4).map(c => (
          <span
            key={c}
            className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)]"
          >
            {c}
          </span>
        ))}
      </div>

      <div className="mb-1">
        <div className="flex items-center justify-between text-[10px] text-[var(--color-text-tertiary)] mb-1">
          <span>{completedCount}/{totalStages} {isUr ? 'stages' : 'stages'}</span>
          <span>{percent}%</span>
        </div>
        <div className="h-1.5 bg-[var(--color-bg-input)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 text-[10px] text-[var(--color-text-tertiary)] mt-2">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" /> {project.estimatedMinutes}m
        </span>
        <span className="flex items-center gap-1">
          <BookOpen className="w-3 h-3" /> {project.relatedLessonIds.length} {isUr ? 'lessons' : 'lessons'}
        </span>
      </div>
    </motion.div>
  );
}

function BossCard({ boss, index }: { boss: ReturnType<typeof projectService.listBosses>[number]; index: number }) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const progress = projectService.getBossProgress(boss.id);
  const isUr = language === 'ur';

  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      onClick={() => navigate(`/boss/${boss.id}`)}
      className="text-left rounded-xl border border-[var(--color-xp-gold)]/20 bg-gradient-to-br from-[var(--color-xp-gold)]/5 to-transparent p-4 hover:border-[var(--color-xp-gold)]/40 transition-all w-full"
      aria-label={boss.title}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-9 h-9 rounded-lg bg-[var(--color-xp-gold)]/15 flex items-center justify-center shrink-0">
          <Shield className="w-4.5 h-4.5 text-[var(--color-xp-gold)]" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] truncate">
            {isUr ? boss.titleUrdu : boss.title}
          </h3>
          <p className="text-[11px] text-[var(--color-text-tertiary)] truncate">
            {boss.objectives.length} {isUr ? 'objectives' : 'objectives'}
          </p>
        </div>
        {progress.completed && (
          <Badge variant="success" size="sm">
            <CheckCircle className="w-3 h-3" />
          </Badge>
        )}
      </div>
      <p className="text-xs text-[var(--color-text-secondary)] mb-3 line-clamp-2">
        {isUr ? boss.briefingUrdu : boss.briefing}
      </p>
      <div className="flex flex-wrap gap-1.5">
        <Badge variant={boss.difficulty === 'expert' ? 'error' : 'warning'} size="sm">
          {boss.difficulty.toUpperCase()}
        </Badge>
        <Badge variant="xp" size="sm">+{boss.xpReward} XP</Badge>
        {!progress.completed && progress.completedObjectives.length > 0 && (
          <Badge variant="primary" size="sm">
            {progress.completedObjectives.length}/{boss.objectives.length}
          </Badge>
        )}
      </div>
    </motion.button>
  );
}

export default function ProjectsPage() {
  const { language } = useLanguage();
  const isUr = language === 'ur';
  const projects = useMemo(() => projectService.listProjects(), []);
  const bosses = useMemo(() => projectService.listBosses(), []);

  const completedProjects = projects.filter(p => projectService.getAttempt(p.id).completed).length;
  const completedBosses = bosses.filter(b => projectService.getBossProgress(b.id).completed).length;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <FolderKanban className="w-5 h-5 text-[var(--color-accent-primary)]" />
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            {isUr ? 'Project Simulator' : 'Project Simulator'}
          </h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {isUr
            ? 'Real-world OOP projects design karein aur boss challenges ko haraayein.'
            : 'Design real-world OOP projects and defeat final boss challenges.'}
        </p>
        <div className="flex flex-wrap gap-3 mt-3">
          <span className="text-xs text-[var(--color-text-tertiary)] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-[var(--color-xp-gold)]" />
            {completedProjects}/{projects.length} {isUr ? 'projects complete' : 'projects complete'}
          </span>
          <span className="text-xs text-[var(--color-text-tertiary)] flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-[var(--color-accent-error)]" />
            {completedBosses}/{bosses.length} {isUr ? 'bosses defeated' : 'bosses defeated'}
          </span>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
            {isUr ? 'Real-World Projects' : 'Real-World Projects'}
          </h2>
          <span className="text-xs text-[var(--color-text-tertiary)]">
            {isUr ? '9 stages har project mein' : '9 stages each'}
          </span>
        </div>
        {projects.length === 0 ? (
          <EmptyState
            icon={<FolderKanban className="w-10 h-10" />}
            title={isUr ? 'Koi project nahi' : 'No projects yet'}
            description={isUr ? 'Project scenarios load ho rahe hain.' : 'Project scenarios are loading.'}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
            <Shield className="w-4 h-4 text-[var(--color-xp-gold)]" />
            {isUr ? 'Final Boss Challenges' : 'Final Boss Challenges'}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bosses.map((b, i) => (
            <BossCard key={b.id} boss={b} index={i} />
          ))}
        </div>
      </section>

      <div className="rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)] p-4">
        <p className="text-xs text-[var(--color-text-tertiary)]">
          {isUr
            ? 'Har project requirements se assessment tak 9 stages guzarta hai. XP sirf ek baar milta hai. Boss challenges alag se +150 XP dete hain.'
            : 'Each project walks through 9 stages from requirements to assessment. XP is awarded once. Boss challenges grant a separate +150 XP.'}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-3"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {isUr ? 'Top par jayein' : 'Back to top'}
        </Button>
      </div>
    </div>
  );
}
