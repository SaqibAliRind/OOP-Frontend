import type { SearchResult } from '@/types';
import { curriculumService } from '@/services/curriculumService';
const curriculum = curriculumService.getCurriculum();
import { searchQuestions } from '@/data/questions';
import { safeGetJSON } from '@/utils/safeStorage';

class SearchService {
  search(query: string): SearchResult[] {
    if (!query || query.trim().length === 0) return [];

    const lower = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    // Search modules
    for (const module of curriculum.modules) {
      if (
        module.title.toLowerCase().includes(lower) ||
        module.description.toLowerCase().includes(lower)
      ) {
        results.push({
          type: 'module',
          id: module.id,
          title: module.title,
          description: module.description,
          matchScore: module.title.toLowerCase().includes(lower) ? 100 : 70,
        });
      }

      // Search lessons within modules
      for (const lesson of module.lessons) {
        if (
          lesson.title.toLowerCase().includes(lower) ||
          lesson.description.toLowerCase().includes(lower)
        ) {
          results.push({
            type: 'lesson',
            id: lesson.id,
            title: lesson.title,
            description: lesson.description,
            moduleId: module.id,
            matchScore: lesson.title.toLowerCase().includes(lower) ? 90 : 60,
          });
        }

        // Search key points
        for (const kp of lesson.keyPoints) {
          if (
            kp.title.toLowerCase().includes(lower) ||
            kp.description.toLowerCase().includes(lower)
          ) {
            results.push({
              type: 'concept',
              id: kp.id,
              title: kp.title,
              description: kp.description,
              moduleId: module.id,
              lessonId: lesson.id,
              matchScore: kp.title.toLowerCase().includes(lower) ? 85 : 55,
            });
          }
        }
      }
    }

    // Search questions
    const questionResults = searchQuestions(query);

    for (const q of questionResults.quiz) {
      results.push({
        type: 'question',
        id: q.id,
        title: q.question,
        description: q.explanation,
        moduleId: q.moduleId,
        lessonId: q.lessonId,
        matchScore: 50,
      });
    }

    for (const s of questionResults.scenario) {
      results.push({
        type: 'scenario',
        id: s.id,
        title: s.title || 'Scenario Question',
        description: s.scenario,
        matchScore: 50,
      });
    }

    for (const m of questionResults.mistake) {
      results.push({
        type: 'mistake',
        id: m.id,
        title: m.title,
        description: m.explanation,
        lessonId: m.lessonId,
        matchScore: 50,
      });
    }

    // Sort by match score
    results.sort((a, b) => b.matchScore - a.matchScore);

    return results;
  }

  searchModules(query: string) {
    const lower = query.toLowerCase();
    return curriculum.modules.filter(m =>
      m.title.toLowerCase().includes(lower) ||
      m.description.toLowerCase().includes(lower)
    );
  }

  searchLessons(query: string) {
    const lower = query.toLowerCase();
    const lessons: { lesson: typeof curriculum.modules[0]['lessons'][0]; moduleId: string }[] = [];
    for (const module of curriculum.modules) {
      for (const lesson of module.lessons) {
        if (
          lesson.title.toLowerCase().includes(lower) ||
          lesson.description.toLowerCase().includes(lower)
        ) {
          lessons.push({ lesson, moduleId: module.id });
        }
      }
    }
    return lessons;
  }

  searchConcepts(query: string) {
    const lower = query.toLowerCase();
    const concepts: { title: string; description: string; moduleId: string; lessonId: string }[] = [];
    for (const module of curriculum.modules) {
      for (const lesson of module.lessons) {
        for (const kp of lesson.keyPoints) {
          if (
            kp.title.toLowerCase().includes(lower) ||
            kp.description.toLowerCase().includes(lower)
          ) {
            concepts.push({
              title: kp.title,
              description: kp.description,
              moduleId: module.id,
              lessonId: lesson.id,
            });
          }
        }
      }
    }
    return concepts;
  }

  getRecentSearches(): string[] {
    const stored = safeGetJSON<unknown>('oop-universe-recent-searches', []);
    if (!Array.isArray(stored)) return [];
    return stored.filter((s): s is string => typeof s === 'string').slice(0, 10);
  }

  addRecentSearch(query: string): void {
    const recent = this.getRecentSearches();
    const filtered = recent.filter(r => r !== query);
    filtered.unshift(query);
    if (filtered.length > 10) filtered.pop();
    try {
      localStorage.setItem('oop-universe-recent-searches', JSON.stringify(filtered));
    } catch {
      // ignore
    }
  }

  clearRecentSearches(): void {
    try {
      localStorage.removeItem('oop-universe-recent-searches');
    } catch {
      // ignore
    }
  }
}

export const searchService = new SearchService();
