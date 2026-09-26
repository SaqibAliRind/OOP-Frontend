import type { MasteryLevel, ConceptMastery } from '@/types';
import { curriculumService } from './curriculumService';
import { isPlainObject, safeParseJSON } from '@/utils/safeStorage';

const STORAGE_KEY = 'oop-universe-mastery';

const masteryThresholds: Record<MasteryLevel, number> = {
  'not-started': 0,
  'learning': 20,
  'practicing': 40,
  'strong': 70,
  'mastered': 90,
};

const MASTERY_WEIGHTS = {
  lessons: 0.15,
  practice: 0.25,
  scenarios: 0.15,
  debugging: 0.20,
  threeD: 0.10,
  assessment: 0.15,
};

class MasteryService {
  private mastery: Record<string, ConceptMastery>;

  constructor() {
    this.mastery = this.load();
  }

  private load(): Record<string, ConceptMastery> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = safeParseJSON<unknown>(stored, null);
        if (!isPlainObject(parsed)) return {};
        const out: Record<string, ConceptMastery> = {};
        for (const [key, value] of Object.entries(parsed)) {
          if (!isPlainObject(value)) continue;
          const score = typeof value.score === 'number' && Number.isFinite(value.score)
            ? Math.max(0, Math.min(100, value.score))
            : 0;
          out[key] = {
            concept: typeof value.concept === 'string' ? value.concept : key,
            level: this.getLevelForScore(score),
            score,
            lastPracticed: value.lastPracticed ? new Date(value.lastPracticed as string) : undefined,
          };
        }
        return out;
      }
    } catch {
      // ignore
    }
    return {};
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.mastery));
    } catch {
      // ignore
    }
  }

  getConceptMastery(concept: string): ConceptMastery {
    if (this.mastery[concept]) {
      return this.mastery[concept];
    }
    return {
      concept,
      level: 'not-started',
      score: 0,
    };
  }

  getAllMastery(): ConceptMastery[] {
    return Object.values(this.mastery);
  }

  getMasteryByLevel(level: MasteryLevel): ConceptMastery[] {
    return Object.values(this.mastery).filter(m => m.level === level);
  }

  updateConceptScore(concept: string, score: number): ConceptMastery {
    const newScore = Math.max(0, Math.min(100, score));

    let level: MasteryLevel = 'not-started';
    if (newScore >= masteryThresholds['mastered']) level = 'mastered';
    else if (newScore >= masteryThresholds['strong']) level = 'strong';
    else if (newScore >= masteryThresholds['practicing']) level = 'practicing';
    else if (newScore >= masteryThresholds['learning']) level = 'learning';

    const updated: ConceptMastery = {
      concept,
      level,
      score: newScore,
      lastPracticed: new Date(),
    };

    this.mastery[concept] = updated;
    this.save();
    return updated;
  }

  recordPractice(concept: string, correct: boolean): ConceptMastery {
    const current = this.getConceptMastery(concept);
    const delta = correct ? 10 : -5;
    const newScore = Math.max(0, Math.min(100, current.score + delta));
    return this.updateConceptScore(concept, newScore);
  }

  getLevelForScore(score: number): MasteryLevel {
    if (score >= masteryThresholds['mastered']) return 'mastered';
    if (score >= masteryThresholds['strong']) return 'strong';
    if (score >= masteryThresholds['practicing']) return 'practicing';
    if (score >= masteryThresholds['learning']) return 'learning';
    return 'not-started';
  }

  getOverallMastery(): number {
    const all = Object.values(this.mastery);
    if (all.length === 0) return 0;
    const total = all.reduce((sum, m) => sum + m.score, 0);
    return Math.round(total / all.length);
  }

  getWeakConcepts(): ConceptMastery[] {
    return Object.values(this.mastery).filter(m => m.level === 'learning' || m.level === 'not-started');
  }

  getStrongConcepts(): ConceptMastery[] {
    return Object.values(this.mastery).filter(m => m.level === 'strong' || m.level === 'mastered');
  }

  resetMastery(): void {
    this.mastery = {};
    this.save();
  }

  getModuleMastery(moduleId: string, progress: { completedLessons: Record<string, any>; practiceScores: Record<string, any>; debugChallengeScores: Record<string, any> }): number {
    const module = curriculumService.getModule(moduleId);
    if (!module || module.lessons.length === 0) return 0;

    const lessonsCompleted = module.lessons.filter(l => progress.completedLessons[l.id]).length;
    const lessonScore = Math.round((lessonsCompleted / module.lessons.length) * 100);

    const moduleLessonIds = module.lessons.map(l => l.id);
    const practiceScores = Object.entries(progress.practiceScores)
      .filter(([id]) => moduleLessonIds.some(lid => id.includes(lid)));
    const practiceScore = practiceScores.length > 0
      ? Math.round(practiceScores.reduce((sum, [, v]) => sum + v.bestScore, 0) / practiceScores.length)
      : 0;

    const debugScores = Object.entries(progress.debugChallengeScores)
      .filter(([id]) => moduleLessonIds.some(lid => id.includes(lid)));
    const debugScore = debugScores.length > 0
      ? Math.round((debugScores.filter(([, v]) => v.solved).length / debugScores.length) * 100)
      : 0;

    const overall = Math.round(
      lessonScore * MASTERY_WEIGHTS.lessons +
      practiceScore * MASTERY_WEIGHTS.practice +
      debugScore * MASTERY_WEIGHTS.debugging
    );

    return Math.max(0, Math.min(100, overall));
  }

  getOverallMasteryFromProgress(progress: { completedLessons: Record<string, any>; practiceScores: Record<string, any>; debugChallengeScores: Record<string, any>; quizScores: Record<string, any> }): number {
    const modules = curriculumService.getCurriculum().modules;
    if (modules.length === 0) return 0;

    let totalMastery = 0;
    for (const mod of modules) {
      totalMastery += this.getModuleMastery(mod.id, progress);
    }
    return Math.round(totalMastery / modules.length);
  }

  getWeakTopics(): ConceptMastery[] {
    return Object.values(this.mastery)
      .filter(m => m.level === 'learning' || m.level === 'not-started')
      .sort((a, b) => a.score - b.score);
  }

  getStrongTopics(): ConceptMastery[] {
    return Object.values(this.mastery)
      .filter(m => m.level === 'strong' || m.level === 'mastered')
      .sort((a, b) => b.score - a.score);
  }

  getFourPillars(): { name: string; score: number; level: MasteryLevel }[] {
    const pillars = ['encapsulation', 'inheritance', 'polymorphism', 'abstraction'];
    return pillars.map(p => {
      const mastery = this.getConceptMastery(p);
      return { name: p.charAt(0).toUpperCase() + p.slice(1), score: mastery.score, level: mastery.level };
    });
  }

  getKnowledgeGaps(): { concept: string; score: number; evidence: string[] }[] {
    const weak = this.getWeakTopics();
    return weak.slice(0, 5).map(w => ({
      concept: w.concept,
      score: w.score,
      evidence: [
        w.score < 20 ? 'Very low mastery' : w.score < 40 ? 'Below average' : 'Needs practice',
        w.level === 'not-started' ? 'Not yet started' : 'In progress',
      ].filter(Boolean),
    }));
  }
}

export const masteryService = new MasteryService();
