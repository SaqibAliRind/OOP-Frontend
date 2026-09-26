import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Clock,
  Star,
  CheckCircle,
  Lock,
  ChevronRight,
  GraduationCap,
  Brain,
  Rocket,
} from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Card, Badge, ProgressBar, ProgressRing, LucideIcon } from '@/components/ui';
import { curriculumService } from '@/services/curriculumService';
import { progressService } from '@/services/progressService';
import { learningProgressionService } from '@/services/learningProgressionService';
import { formatDuration } from '@/utils/helpers';
import { staggerChildren, slideUp } from '@/utils/motion';
import { motion as fm } from 'framer-motion';

const curriculum = curriculumService.getCurriculum();
const progress = progressService.getProgress();

const trackInfo = [
  { id: 'foundation', label: 'Foundation', modules: [1, 2, 3, 4, 5], color: '#3b82f6', icon: GraduationCap },
  { id: 'core', label: 'Core Mastery', modules: [6, 7, 8, 13, 14], color: '#8b5cf6', icon: Brain },
  { id: 'advanced', label: 'Advanced', modules: [9, 10, 11, 12, 15], color: '#f59e0b', icon: Rocket },
];

export function CurriculumPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Badge variant="primary" size="md" className="mb-3">Complete Curriculum</Badge>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
          15 Modules. Complete Mastery.
        </h1>
        <p className="text-[var(--color-text-secondary)] mt-2 max-w-2xl">
          Progress from fundamentals to advanced design patterns. Each module builds on the previous.
        </p>
      </motion.div>

      {/* Track Overview */}
      <fm.div variants={staggerChildren(0.08)} initial="hidden" animate="visible" className="grid md:grid-cols-3 gap-4">
        {trackInfo.map((track) => (
          <fm.div key={track.id} variants={slideUp}>
            <Card variant="outlined" padding="lg" className={cn('h-full border-l-4 card-glow-hover')} style={{ borderLeftColor: track.color }}>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${track.color}12` }}
                >
                  <LucideIcon icon={track.icon} className="w-5 h-5" style={{ color: track.color }} />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text-primary)]">{track.label}</h3>
                  <p className="text-xs text-[var(--color-text-tertiary)]">{track.modules.length} modules</p>
                </div>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Modules {track.modules[0]}-{track.modules[track.modules.length - 1]}
              </p>
            </Card>
          </fm.div>
        ))}
      </fm.div>

      {/* Modules List */}
      <fm.div variants={staggerChildren(0.04)} initial="hidden" animate="visible" className="space-y-2">
        {curriculum.modules.map((module) => {
          const moduleProgress = curriculumService.getModuleProgress(module.id, progress);
          const isCompleted = moduleProgress === 100;
          const isInProgress = moduleProgress > 0 && moduleProgress < 100;
          const isAccessible = learningProgressionService.canAccessModule(module.id);

          return (
            <fm.div key={module.id} variants={slideUp}>
              {isAccessible ? (
                <Link
                  to={`/module/${module.id}`}
                  className={cn(
                    'flex items-center gap-4 p-4 md:p-5 rounded-xl border transition-all group',
                    'hover:border-[var(--color-accent-primary)]/40 hover:shadow-[var(--shadow-md)]',
                    'bg-[var(--color-bg-card)]'
                  )}
                >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${module.color}12` }}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-[var(--color-accent-success)]" />
                  ) : !isAccessible ? (
                    <Lock className="w-6 h-6 text-[var(--color-text-tertiary)]" />
                  ) : (
                    <LucideIcon icon={module.icon} className="w-6 h-6" style={{ color: module.color }} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-[var(--color-text-tertiary)]">{module.order.toString().padStart(2, '0')}</span>
                    <h3 className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors truncate">
                      {module.title}
                    </h3>
                    {isCompleted && <Badge variant="success" size="sm">Done</Badge>}
                    {isInProgress && <Badge variant="primary" size="sm">Active</Badge>}
                    {!isAccessible && <Badge variant="outline" size="sm">Locked</Badge>}
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-2 line-clamp-1">{module.description}</p>
                  <div className="flex items-center gap-4 text-xs text-[var(--color-text-tertiary)]">
                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {module.lessons.length} lessons</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatDuration(module.totalDuration)}</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-[var(--color-xp-gold)]" /> {module.xpReward} XP</span>
                  </div>
                  <ProgressBar value={moduleProgress} max={100} size="sm" variant={isCompleted ? 'success' : 'primary'} className="mt-2" />
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <ProgressRing value={moduleProgress} size={44} strokeWidth={3} variant={isCompleted ? 'success' : 'primary'} showValue />
                  {isAccessible && (
                    <ChevronRight className="w-5 h-5 text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent-primary)] transition-colors" />
                  )}
                </div>
              </Link>
            ) : (
              <div
                className={cn(
                  'flex items-center gap-4 p-4 md:p-5 rounded-xl border transition-all',
                  'bg-[var(--color-bg-tertiary)]/30 opacity-60 cursor-not-allowed'
                )}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${module.color}12` }}
                >
                  <Lock className="w-6 h-6 text-[var(--color-text-tertiary)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-[var(--color-text-tertiary)]">{module.order.toString().padStart(2, '0')}</span>
                    <h3 className="font-semibold text-[var(--color-text-primary)] truncate">{module.title}</h3>
                    <Badge variant="outline" size="sm">Locked</Badge>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-2 line-clamp-1">{module.description}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <ProgressRing value={moduleProgress} size={44} strokeWidth={3} variant="primary" showValue />
                </div>
              </div>
            )}
            </fm.div>
          );
        })}
      </fm.div>
    </div>
  );
}
