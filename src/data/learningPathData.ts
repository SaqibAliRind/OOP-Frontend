import { curriculum } from '@/data/curriculum';
import { progressService } from '@/services/progressService';

export const MODULE_ORDER = [
  'module-01',
  'module-02',
  'module-03',
  'module-04',
  'module-05',
  'module-06',
  'module-07',
  'module-08',
  'module-09',
  'module-10',
  'module-11',
  'module-12',
  'module-13',
  'module-14',
  'module-15',
];

export const MODULES_WITH_PROGRESS = curriculum.modules.map((module) => {
  const progress = progressService.getProgress();
  const completedLessonsSet = new Set(Object.keys(progress.completedLessons));
  const lessonProgressMap: Record<string, { started: boolean; completed: boolean }> = {};

  module.lessons.forEach((lesson) => {
    const lessonKey = lesson.id;
    const alreadyCompleted = completedLessonsSet.has(lessonKey);
    const lp = progress.lessonProgress[lessonKey];
    const started = lp ? lp.started : false;
    const completed = alreadyCompleted || (lp && lp.completed);
    lessonProgressMap[lessonKey] = { started, completed };
  });

  const totalLessons = module.lessons.length;
  const completedCount = module.lessons.filter((lesson) => {
    const lp = lessonProgressMap[lesson.id];
    return lp && lp.completed;
  }).length;
  const inProgressCount = module.lessons.filter((lesson) => {
    const lp = lessonProgressMap[lesson.id];
    return lp && lp.started && !lp.completed;
  }).length;
  const lockedCount = module.lessons.filter((lesson) => {
    const prereqIds = lesson.prerequisites || [];
    const allPrereqsMet = prereqIds.every((prereqId) => {
      const lp = progress.lessonProgress[prereqId];
      return !lp || lp.completed;
    });
    return !allPrereqsMet;
  }).length;

  const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return {
    ...module,
    progressPercentage,
    completedLessons: completedCount,
    inProgressLessons: inProgressCount,
    lockedLessons: lockedCount,
    isModuleCompleted: completedCount === totalLessons && totalLessons > 0,
    isModuleLocked: lockedCount > 0,
  };
});

export interface ModuleProgressInfo {
  moduleId: string;
  completedLessons: number;
  totalLessons: number;
  progressPercentage: number;
  isModuleCompleted: boolean;
  isModuleLocked: boolean;
  inProgressLessons: number;
  lockedLessons: number;
}

export const getCurrentLearningPosition = (): {
  moduleId: string | null;
  lessonId: string | null;
  type: 'in-progress' | 'locked' | 'complete';
} => {
  const progress = progressService.getProgress();
  const completedLessonsSet = new Set(Object.keys(progress.completedLessons));

  for (const module of curriculum.modules) {
    for (const lesson of module.lessons) {
      const alreadyCompleted = completedLessonsSet.has(lesson.id);
      const lp = progress.lessonProgress[lesson.id];

      if (lp && lp.started && !lp.completed) {
        return { moduleId: module.id, lessonId: lesson.id, type: 'in-progress' };
      }

      if (!alreadyCompleted) {
        const prereqIds = lesson.prerequisites || [];
        const allPrereqsMet = prereqIds.every((prereqId) => {
          const prereqLp = progress.lessonProgress[prereqId];
          return !prereqLp || prereqLp.completed;
        });

        if (!allPrereqsMet) {
          return { moduleId: module.id, lessonId: lesson.id, type: 'locked' };
        }
      }
    }
  }

  return { moduleId: null, lessonId: null, type: 'complete' };
};

export const getRecommendedNextLesson = (): {
  moduleId: string;
  lessonId: string;
  title: string;
  reason: string;
  destinationRoute: string;
} | null => {
  const position = getCurrentLearningPosition();
  const moduleMap: Record<string, typeof curriculum.modules[number]> = {};

  curriculum.modules.forEach((m) => { moduleMap[m.id] = m; });

  // Priority 1: Resume in-progress lesson
  if (position.type === 'in-progress') {
    const module = position.moduleId ? moduleMap[position.moduleId] : null;
    const lesson = position.lessonId ? curriculum.modules.flatMap(m => m.lessons).find(l => l.id === position.lessonId) : null;
    if (module && lesson) {
      return {
        moduleId: module.id,
        lessonId: lesson.id,
        title: lesson.title,
        reason: 'Resume the lesson you started',
        destinationRoute: `/lesson/${lesson.id}`,
      };
    }
  }

  // Priority 2: Review repeatedly missed concept (weak topics)
  const weakTopics = progressService.getWeakTopics();
  if (weakTopics.length > 0) {
    const weakTopic = weakTopics[0];
    for (const module of curriculum.modules) {
      for (const lesson of module.lessons) {
        if (lesson.title.toLowerCase().includes(weakTopic.concept.toLowerCase()) || 
            lesson.description.toLowerCase().includes(weakTopic.concept.toLowerCase())) {
          return {
            moduleId: module.id,
            lessonId: lesson.id,
            title: lesson.title,
            reason: `Review ${weakTopic.concept} - you've had ${weakTopic.failedAttempts} missed attempt(s)`,
            destinationRoute: `/lesson/${lesson.id}`,
          };
        }
      }
    }
  }

  // Priority 4: Continue to next available curriculum lesson
  for (const module of curriculum.modules) {
    const moduleProgress = progressService.getProgress();
    const moduleCompleted = Object.keys(moduleProgress.completedModules || {}).includes(module.id);

    if (!moduleCompleted) {
      const prereqsMet = module.prerequisiteModuleIds?.every((prereqId) => {
        return Object.keys(progressService.getProgress().completedModules || {}).includes(prereqId);
      });

      if (prereqsMet || module.prerequisiteModuleIds.length === 0) {
        const firstUncompletedLesson = module.lessons.find((lesson) => {
          const lp = progressService.getProgress().lessonProgress[lesson.id];
          return !lp || !lp.completed;
        });

        if (firstUncompletedLesson) {
          return {
            moduleId: module.id,
            lessonId: firstUncompletedLesson.id,
            title: firstUncompletedLesson.title,
            reason: `Start ${module.title} - next in your learning path`,
            destinationRoute: `/lesson/${firstUncompletedLesson.id}`,
          };
        }
      }
    }
  }

  // Priority 5: If all available work is completed, suggest revision or assessment
  const allModulesCompleted = curriculum.modules.every((module) => {
    const lp = progressService.getProgress();
    return Object.keys(lp.completedModules || {}).includes(module.id);
  });

  if (allModulesCompleted) {
    return {
      moduleId: 'module-15',
      lessonId: '',
      title: 'Review all concepts - Mastery Assessment',
      reason: 'All modules complete! Take a mastery assessment to review your knowledge',
      destinationRoute: '/quiz',
    };
  }

  return null;
};

export const getModuleStudyTime = (moduleId: string): number => {
  const module = curriculum.modules.find((m) => m.id === moduleId);
  return module ? module.totalDuration : 0;
};

export const getLearningPathStats = (): {
  totalModules: number;
  totalLessons: number;
  completedLessons: number;
  inProgressLessons: number;
  lockedLessons: number;
  progressPercentage: number;
  currentModule: string | null;
  currentLesson: string | null;
} => {
  const progress = progressService.getProgress();
  let completedCount = 0;
  let inProgressCount = 0;
  let lockedCount = 0;

  curriculum.modules.forEach((module) => {
    module.lessons.forEach((lesson) => {
      const lp = progress.lessonProgress[lesson.id];
      if (!lp) return;

      if (lp.completed) completedCount++;
      else if (lp.started) inProgressCount++;
      else lockedCount++;
    });
  });

  const totalLessons = curriculum.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  let currentModule: string | null = null;
  let currentLesson: string | null = null;

  for (const module of curriculum.modules) {
    for (const lesson of module.lessons) {
      const lp = progress.lessonProgress[lesson.id];
      if (lp && lp.started && !lp.completed) {
        currentModule = module.id;
        currentLesson = lesson.id;
        break;
      }
    }
    if (currentModule) break;
  }

  return {
    totalModules: curriculum.modules.length,
    totalLessons: curriculum.modules.reduce((sum, m) => sum + m.lessons.length, 0),
    completedLessons: completedCount,
    inProgressLessons: inProgressCount,
    lockedLessons: lockedCount,
    progressPercentage,
    currentModule,
    currentLesson,
  };
};