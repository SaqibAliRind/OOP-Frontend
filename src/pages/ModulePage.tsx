import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Clock,
  Star,
  CheckCircle,
  Lock,
  ChevronRight,
  PlayCircle,
  ArrowLeft,
  Award,
  Box,
} from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button, Card, Badge, ProgressRing, LucideIcon } from '@/components/ui';
import { curriculumService } from '@/services/curriculumService';
import { progressService } from '@/services/progressService';
import { learningProgressionService } from '@/services/learningProgressionService';
import { formatDuration } from '@/utils/helpers';

export function ModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const module = curriculumService.getModule(moduleId || '');
  const progress = progressService.getProgress();

  if (!module) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Card variant="elevated" padding="lg" className="text-center max-w-md">
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">Module Not Found</h2>
          <p className="text-[var(--color-text-secondary)] mb-4">The module you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/curriculum">Back to Curriculum</Link>
          </Button>
        </Card>
      </div>
    );
  }

  const moduleProgress = curriculumService.getModuleProgress(module.id, progress);
  const completedLessons = module.lessons.filter(l => progress.completedLessons[l.id]).length;

  return (
    <div className="space-y-8">
      {/* Module Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
      >
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="icon" asChild className="md:hidden">
            <Link to="/curriculum"><ArrowLeft className="w-5 h-5" /></Link>
          </Button>
          <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0', `bg-[${module.color}]/15`)}>
            <LucideIcon icon={module.icon} className={cn('w-8 h-8', `text-[${module.color}]`)} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="primary" size="sm">Module {module.order}</Badge>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">{module.title}</h1>
            </div>
            <p className="text-[var(--color-text-secondary)] mb-4">{module.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-tertiary)]">
              <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {module.lessons.length} lessons</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {formatDuration(module.totalDuration)}</span>
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-[var(--color-xp-gold)]" /> {module.xpReward} XP</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 md:ml-auto">
          <ProgressRing value={moduleProgress} size={64} strokeWidth={4} variant={moduleProgress === 100 ? 'success' : 'primary'} showValue />
          <div className="text-right">
            <p className="text-sm text-[var(--color-text-tertiary)]">Module Progress</p>
            <p className="text-2xl font-bold text-[var(--color-text-primary)]">{moduleProgress}%</p>
            <p className="text-sm text-[var(--color-text-tertiary)]">{completedLessons} of {module.lessons.length} lessons</p>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-3"
      >
        {module.lessons.length > 0 && (() => {
          const nextLesson = learningProgressionService.getNextLesson();
          const firstLessonId = module.lessons[0].id;
          const startLessonId = nextLesson && module.lessons.some(l => l.id === nextLesson.lessonId)
            ? nextLesson.lessonId
            : firstLessonId;

          return (
            <>
              <Button size="lg" asChild className="group">
                <Link to={`/lesson/${startLessonId}`}>
                  <PlayCircle className="w-5 h-5 mr-2" />
                  {completedLessons === 0 ? 'Start Module' : 'Continue Learning'}
                  <ArrowLeft className="w-5 h-5 ml-2 -rotate-180 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </>
          );
        })()}
        {moduleProgress === 100 && (
          <Button variant="success" size="lg" asChild>
            <Link to="/curriculum">
              <Award className="w-5 h-5 mr-2" />
              Module Complete! View Curriculum
            </Link>
          </Button>
        )}
      </motion.div>

      {/* Lessons List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-4">Lessons</h2>
        <div className="space-y-3">
          {module.lessons.map((lesson, index) => {
            const isCompleted = progress.completedLessons[lesson.id];
            const isCurrent = !isCompleted && module.lessons.slice(0, index).every(l => progress.completedLessons[l.id]);
            const lessonAccess = learningProgressionService.getLessonAccess(lesson.id);
            const isLocked = lessonAccess.state === 'locked';
            const isAccessible = lessonAccess.state !== 'locked';

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {isAccessible ? (
                  <Link
                    to={`/lesson/${lesson.id}`}
                    className={cn(
                      'flex items-center gap-4 p-4 rounded-xl border transition-all group',
                      'bg-[var(--color-bg-card)] hover:border-[var(--color-accent-primary)]/50 hover:shadow-[var(--shadow-md)]'
                    )}
                  >
                  <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', isCompleted ? 'bg-[var(--color-accent-success)]/15' : 'bg-[var(--color-bg-tertiary)]')}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-[var(--color-accent-success)]" />
                    ) : isLocked ? (
                      <Lock className="w-5 h-5 text-[var(--color-text-tertiary)]" />
                    ) : (
                      <PlayCircle className={cn('w-5 h-5', isCurrent ? 'text-[var(--color-accent-primary)]' : 'text-[var(--color-text-tertiary)]')} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-mono text-[var(--color-text-tertiary)]">{lesson.order}</span>
                      <h3 className="font-medium text-[var(--color-text-primary)]">{lesson.title}</h3>
                      {isCurrent && <Badge variant="primary" size="sm">Next</Badge>}
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] line-clamp-1">{lesson.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-[var(--color-text-tertiary)]">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatDuration(lesson.duration)}</span>
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 text-[var(--color-xp-gold)]" /> {lesson.xpReward} XP</span>
                      {lesson.threeDSceneId && (
                        <span className="flex items-center gap-1 text-[var(--color-accent-secondary)]">
                          <Box className="w-3 h-3" /> 3D Lab
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <Badge variant="success" size="sm">Completed</Badge>
                    ) : isLocked ? (
                      <Badge variant="outline" size="sm">Locked</Badge>
                    ) : (
                      <ProgressRing value={isCurrent ? 0 : 0} size={32} strokeWidth={2} variant="primary" showValue={false} />
                    )}
                    {!isLocked && <ChevronRight className="w-5 h-5 text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent-primary)] transition-colors" />}
                  </div>
                </Link>
                ) : (
                  <div
                    className={cn(
                      'flex items-center gap-4 p-4 rounded-xl border transition-all',
                      'bg-[var(--color-bg-tertiary)]/50 opacity-60 cursor-not-allowed'
                    )}
                  >
                    <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', 'bg-[var(--color-bg-tertiary)]')}>
                      <Lock className="w-5 h-5 text-[var(--color-text-tertiary)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-mono text-[var(--color-text-tertiary)]">{lesson.order}</span>
                        <h3 className="font-medium text-[var(--color-text-primary)]">{lesson.title}</h3>
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)] line-clamp-1">{lesson.description}</p>
                    </div>
                    <Badge variant="outline" size="sm">Locked</Badge>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

