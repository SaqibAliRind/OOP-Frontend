import { curriculumService } from './curriculumService';
import { progressService } from './progressService';

export type LessonAccessState = 'locked' | 'available' | 'in-progress' | 'completed';

export interface LessonAccessInfo {
  state: LessonAccessState;
  lessonId: string;
  moduleId: string;
  requiredLessonId?: string;
  requiredLessonTitle?: string;
  requiredModuleId?: string;
  requiredModuleTitle?: string;
}

class LearningProgressionService {
  getLessonAccess(lessonId: string): LessonAccessInfo {
    const lesson = curriculumService.getLesson(lessonId);
    if (!lesson) {
      return { state: 'locked', lessonId, moduleId: '', requiredLessonTitle: 'Lesson not found' };
    }

    const progress = progressService.getProgress();
    const module = curriculumService.getModule(lesson.moduleId);

    if (progress.completedLessons[lessonId]) {
      return { state: 'completed', lessonId, moduleId: lesson.moduleId };
    }

    if (progressService.getLessonProgress(lessonId).started) {
      return { state: 'in-progress', lessonId, moduleId: lesson.moduleId };
    }

    if (curriculumService.isLessonUnlocked(lessonId, progress)) {
      return { state: 'available', lessonId, moduleId: lesson.moduleId };
    }

    const requiredLessonId = lesson.prerequisites.find(p => !progress.completedLessons[p]);
    let requiredLessonTitle: string | undefined;
    if (requiredLessonId) {
      const reqLesson = curriculumService.getLesson(requiredLessonId);
      requiredLessonTitle = reqLesson?.title;
    }

    const requiredModuleId = module?.prerequisiteModuleIds.find(p => !progress.completedModules[p]);
    let requiredModuleTitle: string | undefined;
    if (requiredModuleId) {
      const reqModule = curriculumService.getModule(requiredModuleId);
      requiredModuleTitle = reqModule?.title;
    }

    return {
      state: 'locked',
      lessonId,
      moduleId: lesson.moduleId,
      requiredLessonId,
      requiredLessonTitle,
      requiredModuleId,
      requiredModuleTitle,
    };
  }

  canAccessLesson(lessonId: string): boolean {
    const access = this.getLessonAccess(lessonId);
    return access.state !== 'locked';
  }

  isLessonCompleted(lessonId: string): boolean {
    return this.getLessonAccess(lessonId).state === 'completed';
  }

  getModuleAccess(moduleId: string): { locked: boolean; requiredModuleId?: string; requiredModuleTitle?: string } {
    const module = curriculumService.getModule(moduleId);
    if (!module) return { locked: true };

    const progress = progressService.getProgress();

    if (progress.completedModules[moduleId]) {
      return { locked: false };
    }

    if (curriculumService.isModuleUnlocked(moduleId, progress)) {
      return { locked: false };
    }

    const requiredModuleId = module.prerequisiteModuleIds.find(p => !progress.completedModules[p]);
    let requiredModuleTitle: string | undefined;
    if (requiredModuleId) {
      const reqModule = curriculumService.getModule(requiredModuleId);
      requiredModuleTitle = reqModule?.title;
    }

    return { locked: true, requiredModuleId, requiredModuleTitle };
  }

  canAccessModule(moduleId: string): boolean {
    return !this.getModuleAccess(moduleId).locked;
  }

  isModuleCompleted(moduleId: string): boolean {
    const module = curriculumService.getModule(moduleId);
    if (!module) return false;
    const progress = progressService.getProgress();
    return module.lessons.every(l => progress.completedLessons[l.id]);
  }

  getNextLesson(): { lessonId: string; moduleId: string } | null {
    const progress = progressService.getProgress();
    const curriculum = curriculumService.getCurriculum();

    for (const module of curriculum.modules) {
      if (!curriculumService.isModuleUnlocked(module.id, progress)) continue;

      for (const lesson of module.lessons) {
        const access = this.getLessonAccess(lesson.id);
        if (access.state === 'available' || access.state === 'in-progress') {
          return { lessonId: lesson.id, moduleId: module.id };
        }
      }
    }

    return null;
  }

  getNextAvailableLesson(currentLessonId: string): { lessonId: string; moduleId: string } | null {
    const next = curriculumService.getNextLesson(currentLessonId);
    if (!next) return null;

    const access = this.getLessonAccess(next.id);
    if (access.state === 'locked') return null;

    return { lessonId: next.id, moduleId: next.moduleId };
  }

  getPreviousLesson(currentLessonId: string): { lessonId: string; moduleId: string } | null {
    const prev = curriculumService.getPreviousLesson(currentLessonId);
    if (!prev) return null;
    return { lessonId: prev.id, moduleId: prev.moduleId };
  }

  getWorldAccess(worldId: string): { locked: boolean; requiredModuleId?: string; requiredModuleTitle?: string } {
    const worldMap: Record<string, string> = {
      'classes-objects': 'module-01',
      'constructors': 'module-03',
      'encapsulation': 'module-04',
      'inheritance': 'module-05',
      'polymorphism': 'module-06',
      'abstraction': 'module-07',
      'interfaces': 'module-08',
      'java-runtime': 'module-09',
      'packages': 'module-09',
      'exceptions': 'module-10',
      'collections': 'module-11',
      'architecture': 'module-12',
      'design-lab': 'module-15',
    };

    const moduleId = worldMap[worldId];
    if (!moduleId) return { locked: true, requiredModuleTitle: 'Complete required lessons first' };

    return this.getModuleAccess(moduleId);
  }

  canAccessWorld(worldId: string): boolean {
    return !this.getWorldAccess(worldId).locked;
  }

  getLockedReason(lessonId: string): string {
    const access = this.getLessonAccess(lessonId);
    if (access.state !== 'locked') return '';

    const parts: string[] = [];
    if (access.requiredLessonTitle) {
      parts.push(`Complete "${access.requiredLessonTitle}" first.`);
    }
    if (access.requiredModuleTitle) {
      parts.push(`Complete module "${access.requiredModuleTitle}" first.`);
    }
    return parts.length > 0 ? parts.join(' ') : 'Complete the previous lesson first.';
  }
}

export const learningProgressionService = new LearningProgressionService();
