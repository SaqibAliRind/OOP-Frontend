import type { Curriculum, Module, Lesson, UserProgress, LearningPath } from '@/types';
import { curriculum, learningPaths } from '@/data/curriculum';

class CurriculumService {
  private curriculum: Curriculum;

  constructor() {
    this.curriculum = curriculum;
  }

  getCurriculum(): Curriculum {
    return this.curriculum;
  }

  getModule(moduleId: string): Module | undefined {
    return this.curriculum.modules.find(m => m.id === moduleId);
  }

  getLesson(lessonId: string): Lesson | undefined {
    for (const module of this.curriculum.modules) {
      const lesson = module.lessons.find(l => l.id === lessonId);
      if (lesson) return lesson;
    }
    return undefined;
  }

  getModuleLessons(moduleId: string): Lesson[] {
    const module = this.getModule(moduleId);
    return module?.lessons || [];
  }

  getNextLesson(currentLessonId: string): Lesson | undefined {
    for (let i = 0; i < this.curriculum.modules.length; i++) {
      const module = this.curriculum.modules[i];
      const lessonIndex = module.lessons.findIndex(l => l.id === currentLessonId);
      if (lessonIndex !== -1) {
        if (lessonIndex + 1 < module.lessons.length) {
          return module.lessons[lessonIndex + 1];
        }
        // Check next module
        if (i + 1 < this.curriculum.modules.length) {
          return this.curriculum.modules[i + 1].lessons[0];
        }
        return undefined;
      }
    }
    return undefined;
  }

  getPreviousLesson(currentLessonId: string): Lesson | undefined {
    for (let i = 0; i < this.curriculum.modules.length; i++) {
      const module = this.curriculum.modules[i];
      const lessonIndex = module.lessons.findIndex(l => l.id === currentLessonId);
      if (lessonIndex !== -1) {
        if (lessonIndex > 0) {
          return module.lessons[lessonIndex - 1];
        }
        // Check previous module
        if (i > 0) {
          const prevModule = this.curriculum.modules[i - 1];
          return prevModule.lessons[prevModule.lessons.length - 1];
        }
        return undefined;
      }
    }
    return undefined;
  }

  getLearningPaths(): LearningPath[] {
    return Object.values(learningPaths);
  }

  getLearningPath(pathId: string): LearningPath | undefined {
    return learningPaths[pathId];
  }

  isModuleUnlocked(moduleId: string, progress: UserProgress): boolean {
    const module = this.getModule(moduleId);
    if (!module) return false;
    if (module.prerequisiteModuleIds.length === 0) return true;
    return module.prerequisiteModuleIds.every(prereqId => {
      if (progress.completedModules[prereqId] !== undefined) return true;
      const prereq = this.getModule(prereqId);
      if (!prereq || prereq.lessons.length === 0) return false;
      return prereq.lessons.every(l => progress.completedLessons[l.id] !== undefined);
    });
  }

  isLessonUnlocked(lessonId: string, progress: UserProgress): boolean {
    const lesson = this.getLesson(lessonId);
    if (!lesson) return false;
    if (lesson.prerequisites.length === 0) return true;
    return lesson.prerequisites.every(prereqId =>
      progress.completedLessons[prereqId] !== undefined
    );
  }

  getModuleProgress(moduleId: string, progress: UserProgress): number {
    const module = this.getModule(moduleId);
    if (!module || module.lessons.length === 0) return 0;
    const completedCount = module.lessons.filter(l => progress.completedLessons[l.id]).length;
    return Math.round((completedCount / module.lessons.length) * 100);
  }

  getTotalProgress(progress: UserProgress): number {
    const totalLessons = this.curriculum.totalLessons;
    if (totalLessons === 0) return 0;
    return Math.round((Object.keys(progress.completedLessons).length / totalLessons) * 100);
  }
}

export const curriculumService = new CurriculumService();