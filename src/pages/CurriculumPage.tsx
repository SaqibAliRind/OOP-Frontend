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
      <div className="relative mb-12 p-8 rounded-3xl overflow-hidden bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-primary)]/20 to-[var(--color-accent-secondary)]/20" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(99,102,241,0.2),transparent_70%)] animate-pulse" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-info)]/20 text-[var(--color-accent-info)] font-bold mb-4 uppercase tracking-widest text-xs">
            <Rocket className="w-4 h-4" /> Mission Control
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] mb-4 tracking-tight drop-shadow-md">
            Galactic Curriculum
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto font-medium">
            15 planetary missions. Master the universe of Object-Oriented Programming step by step!
          </p>
        </motion.div>
      </div>

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
                  <h3 className="font-bold text-[var(--color-text-primary)] tracking-wide">{track.label}</h3>
                  <p className="text-xs font-bold text-[var(--color-text-tertiary)] uppercase mt-1 tracking-wider">{track.modules.length} Zones</p>
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
                    'flex items-center gap-4 p-5 md:p-6 rounded-2xl border-2 transition-all group relative overflow-hidden',
                    'hover:border-[var(--color-accent-info)] hover:shadow-glow-info hover:-translate-y-1',
                    isCompleted ? 'bg-[var(--color-bg-card)] border-[var(--color-accent-success)]/30' : 'bg-[var(--color-bg-card)] border-[var(--color-border-primary)]'
                  )}
                >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-info)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
                    <span className="text-xs font-black text-[var(--color-text-tertiary)] bg-[var(--color-bg-input)] px-2 py-0.5 rounded-md">
                      M-{module.order.toString().padStart(2, '0')}
                    </span>
                    <h3 className="font-bold text-lg text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-info)] transition-colors truncate">
                      {module.title}
                    </h3>
                    {isCompleted && <Badge variant="success" size="sm" className="animate-pulse">Done!</Badge>}
                    {isInProgress && <Badge variant="primary" size="sm">In Progress</Badge>}
                    {!isAccessible && <Badge variant="outline" size="sm">Locked</Badge>}
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3 line-clamp-1 font-medium">{module.description}</p>
                  <div className="flex items-center gap-4 text-xs text-[var(--color-text-tertiary)] font-bold tracking-wide">
                    <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-[var(--color-accent-primary)]" /> {module.lessons.length} Missions</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[var(--color-accent-secondary)]" /> {formatDuration(module.totalDuration)}</span>
                    <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-[var(--color-xp-gold)]" /> {module.xpReward} XP</span>
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
