import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, BookOpen } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { learningProgressionService } from '@/services/learningProgressionService';

export function ProtectedLessonRoute({ children }: { children: React.ReactNode }) {
  const { lessonId } = useParams<{ lessonId: string }>();

  if (!lessonId) return <Navigate to="/curriculum" replace />;

  const access = learningProgressionService.getLessonAccess(lessonId);

  if (access.state === 'locked') {
    const nextAvailable = learningProgressionService.getNextLesson();
    const requiredLessonId = access.requiredLessonId || nextAvailable?.lessonId;
    const requiredLessonTitle = access.requiredLessonTitle || 'the next available lesson';

    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card variant="elevated" padding="lg" className="text-center max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent-warning)]/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-[var(--color-accent-warning)]" />
            </div>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
              Lesson Locked
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-2">
              Complete the previous lesson first.
            </p>
            {requiredLessonTitle && (
              <p className="text-sm text-[var(--color-text-tertiary)] mb-6">
                Required: <span className="text-[var(--color-accent-primary)] font-medium">{requiredLessonTitle}</span>
              </p>
            )}
            <div className="flex flex-col gap-3">
              {requiredLessonId && (
                <Button asChild className="gap-2">
                  <Link to={`/lesson/${requiredLessonId}`}>
                    <BookOpen className="w-4 h-4" />
                    Go to Required Lesson
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              )}
              <Button variant="ghost" asChild>
                <Link to="/curriculum">Back to Curriculum</Link>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
