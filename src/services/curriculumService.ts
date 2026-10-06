import type { Curriculum, Module, Lesson, UserProgress, LearningPath } from '@/types';
import { javaCurriculum, oopCurriculum, learningPaths } from '@/data/curriculum';
import { cCurriculum } from '@/data/curriculum/cCurriculum';

class CurriculumService {
  private currentCourseId: string;

  constructor() {
    this.currentCourseId = localStorage.getItem('oop_universe_course') || 'oop'; // Default to oop
  }

  setCourse(courseId: 'java' | 'oop' | 'c') {
    this.currentCourseId = courseId;
    localStorage.setItem('oop_universe_course', courseId);
    window.location.reload(); // Reload to refresh the whole app state
  }

  getCurrentCourseId() {
    return this.currentCourseId;
  }

  getCurriculum(): Curriculum {
    if (this.currentCourseId === 'java') return javaCurriculum;
    if (this.currentCourseId === 'c') return cCurriculum;
    return oopCurriculum;
  }

  getModule(moduleId: string): Module | undefined {
    return this.getCurriculum().modules.find(m => m.id === moduleId);
  }

  getLesson(lessonId: string): Lesson | undefined {
    for (const module of this.getCurriculum().modules) {
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
    const cur = this.getCurriculum();
    for (let i = 0; i < cur.modules.length; i++) {
      const module = cur.modules[i];
      const lessonIndex = module.lessons.findIndex(l => l.id === currentLessonId);
      if (lessonIndex !== -1) {
        if (lessonIndex + 1 < module.lessons.length) {
          return module.lessons[lessonIndex + 1];
        }
        // Check next module
        if (i + 1 < cur.modules.length) {
          return cur.modules[i + 1].lessons[0];
        }
        return undefined;
      }
    }
    return undefined;
  }

  getPreviousLesson(currentLessonId: string): Lesson | undefined {
    const cur = this.getCurriculum();
    for (let i = 0; i < cur.modules.length; i++) {
      const module = cur.modules[i];
      const lessonIndex = module.lessons.findIndex(l => l.id === currentLessonId);
      if (lessonIndex !== -1) {
        if (lessonIndex > 0) {
          return module.lessons[lessonIndex - 1];
        }
        // Check previous module
        if (i > 0) {
          const prevModule = cur.modules[i - 1];
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

  isModuleUnlocked(_moduleId: string, _progress: UserProgress): boolean {
    // Unlock all modules globally as requested
    return true;
  }

  isLessonUnlocked(_lessonId: string, _progress: UserProgress): boolean {
    // Unlock all lessons globally as requested
    return true;
  }

  getModuleProgress(moduleId: string, progress: UserProgress): number {
    const module = this.getModule(moduleId);
    if (!module || module.lessons.length === 0) return 0;
    const completedCount = module.lessons.filter(l => progress.completedLessons[l.id]).length;
    return Math.round((completedCount / module.lessons.length) * 100);
  }

  getTotalProgress(progress: UserProgress): number {
    const totalLessons = this.getCurriculum().totalLessons;
    if (totalLessons === 0) return 0;
    return Math.round((Object.keys(progress.completedLessons).length / totalLessons) * 100);
  }
}

export const curriculumService = new CurriculumService();