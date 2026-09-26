import type { WeakTopic, WeakTopicAction } from '@/types';
import { progressService } from './progressService';

class WeakTopicService {
  recordFailure(concept: string): void {
    progressService.recordWeakTopic(concept, true);
  }

  recordSuccess(concept: string): void {
    progressService.recordWeakTopic(concept, false);
  }

  getWeakTopics(): WeakTopic[] {
    return progressService.getWeakTopics();
  }

  isWeak(concept: string): boolean {
    const topics = this.getWeakTopics();
    return topics.some(t => t.concept === concept && t.failedAttempts >= 2);
  }

  getNeedsReviewConcepts(): string[] {
    return this.getWeakTopics()
      .filter(t => t.failedAttempts >= 2)
      .map(t => t.concept);
  }

  getRecommendations(concept: string): WeakTopicAction[] {
    const weak = this.getWeakTopics().find(t => t.concept === concept);
    if (!weak) return [];
    return weak.recommendedActions;
  }

  getMasteryStatus(concept: string): { status: 'strong' | 'needs-review' | 'critical'; attempts: number } {
    const weak = this.getWeakTopics().find(t => t.concept === concept);
    if (!weak) return { status: 'strong', attempts: 0 };
    if (weak.failedAttempts >= 4) return { status: 'critical', attempts: weak.failedAttempts };
    if (weak.failedAttempts >= 2) return { status: 'needs-review', attempts: weak.failedAttempts };
    return { status: 'strong', attempts: weak.failedAttempts };
  }
}

export const weakTopicService = new WeakTopicService();
