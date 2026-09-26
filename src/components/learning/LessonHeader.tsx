import { Clock, Target, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Badge, ProgressBar } from '@/components/ui';
import { formatDuration } from '@/utils/helpers';
import type { Lesson, Module } from '@/types';
import { curriculumService } from '@/services/curriculumService';

interface LessonHeaderProps {
  lesson: Lesson;
  module: Module;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function LessonHeader({ lesson, module, onPrevious: _onPrevious, onNext: _onNext }: LessonHeaderProps) {
  const progress = curriculumService.getModuleProgress(module.id, { completedLessons: {} } as any);

  return (
    <div className="mb-8 animate-in slide-in-from-top-4 duration-300">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-tertiary)] mb-2">
            <Badge variant="primary" size="sm">
              Module {module.order}: {module.title}
            </Badge>
            <span className="text-[var(--color-border-primary)]">/</span>
            <Badge variant="secondary" size="sm">
              Lesson {lesson.order}: {lesson.title}
            </Badge>
          </div>
          <h1 className="text-3xl font-display font-bold text-[var(--color-text-primary)] mb-2">
            {lesson.title}
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-3xl">
            {lesson.description}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex flex-col items-end gap-1">
            <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
              <Clock className="w-4 h-4" />
              <span>{formatDuration(lesson.duration)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
              <Award className="w-4 h-4" />
              <span>+{lesson.xpReward} XP</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ProgressBar value={progress} max={100} showLabel size="md" variant="primary" className="flex-1 max-w-md" />
        <Badge variant="xp" size="sm">
          {progress}% Complete
        </Badge>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {lesson.learningObjectives.map((obj) => (
          <Badge key={obj.id} variant={obj.completed ? 'success' : 'outline'} size="sm" className="flex items-center gap-1">
            <Target className="w-3 h-3" />
            <span className="text-xs">{obj.description}</span>
          </Badge>
        ))}
      </div>
    </div>
  );
}

interface LessonNavigationProps {
  lesson: Lesson;
  module: Module;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function LessonNavigation({ lesson, module, onPrevious, onNext }: LessonNavigationProps) {
  const prevLesson = curriculumService.getPreviousLesson(lesson.id);
  const nextLesson = curriculumService.getNextLesson(lesson.id);

  return (
    <div className="mt-12 pt-8 border-t border-[var(--color-border-primary)] animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          leftIcon={<ChevronLeft className="w-4 h-4" />}
          onClick={onPrevious}
          disabled={!prevLesson}
        >
          {prevLesson ? (
            <>
              <span className="text-xs text-[var(--color-text-tertiary)] block">Previous Lesson</span>
              <span className="truncate max-w-[200px]">{prevLesson.title}</span>
            </>
          ) : (
            'Previous Lesson'
          )}
        </Button>

        <Link
          to={`/module/${module.id}`}
          className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-primary)] transition-colors"
        >
          ← Module Overview
        </Link>

        <Button
          variant="primary"
          rightIcon={<ChevronRight className="w-4 h-4" />}
          onClick={onNext}
          disabled={!nextLesson}
        >
          {nextLesson ? (
            <>
              <span className="text-xs text-[var(--color-text-tertiary)] block">Next Lesson</span>
              <span className="truncate max-w-[200px]">{nextLesson.title}</span>
            </>
          ) : (
            'Complete Module'
          )}
        </Button>
      </div>
    </div>
  );
}