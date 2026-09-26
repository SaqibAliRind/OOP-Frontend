import { describe, it, expect, beforeEach, vi } from 'vitest';
import { assessmentService } from '@/services/assessmentService';
import type { AssessmentQuestion } from '@/types';

function makeQuestion(overrides: Partial<AssessmentQuestion> = {}): AssessmentQuestion {
  return {
    id: 'q-1',
    type: 'mcq',
    question: 'What is OOP?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 'A',
    explanation: 'Because',
    difficulty: 'easy',
    topicTags: ['oop'],
    xpReward: 10,
    moduleId: 'module-01',
    ...overrides,
  };
}

describe('assessmentService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(Math, 'random').mockReturnValue(0);
  });

  describe('question pool', () => {
    it('exposes a non-empty question pool', () => {
      expect(assessmentService.getTotalQuestionCount()).toBeGreaterThan(0);
      expect(assessmentService.getAllQuestions().length).toBe(
        assessmentService.getTotalQuestionCount()
      );
    });

    it('filters by difficulty', () => {
      const easy = assessmentService.getQuestionsByDifficulty('easy');
      expect(easy.every(q => q.difficulty === 'easy')).toBe(true);
      expect(easy.length).toBeGreaterThan(0);
    });

    it('filters by module', () => {
      const questions = assessmentService.getQuestionsByModule('module-01');
      expect(Array.isArray(questions)).toBe(true);
      questions.forEach(q => expect(q.moduleId).toBe('module-01'));
    });

    it('counts questions per module', () => {
      const counts = assessmentService.getModuleCounts();
      const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
      expect(total).toBe(assessmentService.getTotalQuestionCount());
    });
  });

  describe('session generation', () => {
    it('generatePracticeSession respects questionCount and filters', () => {
      const session = assessmentService.generatePracticeSession({ questionCount: 5 });
      expect(session.length).toBeLessThanOrEqual(5);
      expect(session.length).toBeGreaterThan(0);

      const easy = assessmentService.generatePracticeSession({
        questionCount: 10,
        difficultyFilter: 'easy',
      });
      expect(easy.every(q => q.difficulty === 'easy')).toBe(true);
    });

    it('generatePracticeSession caps at pool size', () => {
      const huge = assessmentService.generatePracticeSession({
        questionCount: 100000,
        typeFilter: 'this-type-does-not-exist',
      });
      expect(huge).toEqual([]);
    });

    it('generateExamSession converts minutes to seconds', () => {
      const exam = assessmentService.generateExamSession({
        questionCount: 10,
        timeLimitMinutes: 15,
      });
      expect(exam.timeLimitSeconds).toBe(900);
      expect(exam.questions.length).toBeLessThanOrEqual(10);
    });

    it('generateMockExam returns up to 50 questions with 50-minute limit', () => {
      const mock = assessmentService.generateMockExam();
      expect(mock.questions.length).toBeLessThanOrEqual(50);
      expect(mock.timeLimitSeconds).toBe(50 * 60);
    });

    it('generateFinalAssessment only includes medium/hard questions', () => {
      const final = assessmentService.generateFinalAssessment();
      expect(final.questions.every(q => q.difficulty === 'medium' || q.difficulty === 'hard')).toBe(true);
      expect(final.timeLimitSeconds).toBe(60 * 60);
    });

    it('generateAdaptiveSession prioritizes weak-topic questions', () => {
      const all = assessmentService.getAllQuestions();
      const tag = all.find(q => q.topicTags.length > 0)?.topicTags[0];
      expect(tag).toBeDefined();

      const session = assessmentService.generateAdaptiveSession([tag!], 8);
      expect(session.length).toBeGreaterThan(0);
      expect(session.length).toBeLessThanOrEqual(8);
    });

    it('generateAdaptiveSession handles empty weak topic list', () => {
      const session = assessmentService.generateAdaptiveSession([], 5);
      expect(session.length).toBeLessThanOrEqual(5);
    });
  });

  describe('gradeAnswers', () => {
    it('grades correct and incorrect answers', () => {
      const questions = [
        makeQuestion({ id: 'a', correctAnswer: 'yes', topicTags: ['t1'], xpReward: 10 }),
        makeQuestion({ id: 'b', correctAnswer: 'no', topicTags: ['t2'], xpReward: 20 }),
      ];
      const result = assessmentService.gradeAnswers(questions, { a: 'yes', b: 'wrong' });

      expect(result.totalQuestions).toBe(2);
      expect(result.correctAnswers).toBe(1);
      expect(result.percentage).toBe(50);
      expect(result.score).toBe(50);
      expect(result.xpEarned).toBe(10);
    });

    it('returns zero stats for empty question list', () => {
      const result = assessmentService.gradeAnswers([], {});
      expect(result.percentage).toBe(0);
      expect(result.score).toBe(0);
      expect(result.correctAnswers).toBe(0);
      expect(result.totalQuestions).toBe(0);
      expect(result.xpEarned).toBe(0);
      expect(result.moduleBreakdown).toEqual({});
    });

    it('treats missing answers as incorrect', () => {
      const questions = [makeQuestion({ id: 'a', correctAnswer: 'right' })];
      const result = assessmentService.gradeAnswers(questions, {});
      expect(result.correctAnswers).toBe(0);
      expect(result.percentage).toBe(0);
      expect(result.xpEarned).toBe(0);
    });

    it('accepts any value in array correctAnswer', () => {
      const questions = [
        makeQuestion({ id: 'a', correctAnswer: ['one', 'two'], xpReward: 15 }),
      ];
      const result = assessmentService.gradeAnswers(questions, { a: 'two' });
      expect(result.correctAnswers).toBe(1);
      expect(result.xpEarned).toBe(15);
    });

    it('builds module breakdown with percentages', () => {
      const questions = [
        makeQuestion({ id: 'a', moduleId: 'module-01', correctAnswer: 'x' }),
        makeQuestion({ id: 'b', moduleId: 'module-01', correctAnswer: 'y' }),
        makeQuestion({ id: 'c', moduleId: 'module-02', correctAnswer: 'z' }),
      ];
      const result = assessmentService.gradeAnswers(questions, {
        a: 'x',
        b: 'wrong',
        c: 'z',
      });

      expect(result.moduleBreakdown['module-01']).toEqual({
        correct: 1,
        total: 2,
        percentage: 50,
      });
      expect(result.moduleBreakdown['module-02']).toEqual({
        correct: 1,
        total: 1,
        percentage: 100,
      });
    });

    it('flags weak and strong topics when enough questions share a tag', () => {
      const questions = [
        makeQuestion({ id: 'w1', topicTags: ['weak-topic'], correctAnswer: 'a' }),
        makeQuestion({ id: 'w2', topicTags: ['weak-topic'], correctAnswer: 'b' }),
        makeQuestion({ id: 's1', topicTags: ['strong-topic'], correctAnswer: 'a' }),
        makeQuestion({ id: 's2', topicTags: ['strong-topic'], correctAnswer: 'b' }),
        makeQuestion({ id: 's3', topicTags: ['strong-topic'], correctAnswer: 'c' }),
        makeQuestion({ id: 's4', topicTags: ['strong-topic'], correctAnswer: 'd' }),
      ];
      const result = assessmentService.gradeAnswers(questions, {
        w1: 'wrong-1',
        w2: 'wrong-2',
        s1: 'a',
        s2: 'b',
        s3: 'c',
        s4: 'd',
      });

      expect(result.weakTopics).toContain('weak-topic');
      expect(result.strongTopics).toContain('strong-topic');
      expect(result.weakTopics).not.toContain('strong-topic');
    });

    it('does not mark single-question topics as weak/strong', () => {
      const questions = [makeQuestion({ id: 'solo', topicTags: ['solo-tag'], correctAnswer: 'a' })];
      const result = assessmentService.gradeAnswers(questions, { solo: 'wrong' });
      expect(result.weakTopics).toEqual([]);
      expect(result.strongTopics).toEqual([]);
    });

    it('grades questions with missing options / empty collections safely', () => {
      const questions = [
        makeQuestion({
          id: 'no-options',
          options: undefined,
          correctAnswer: 'only',
          xpReward: 25,
        }),
      ];
      const correct = assessmentService.gradeAnswers(questions, { 'no-options': 'only' });
      expect(correct.correctAnswers).toBe(1);
      expect(correct.xpEarned).toBe(25);

      const incorrect = assessmentService.gradeAnswers(questions, {});
      expect(incorrect.correctAnswers).toBe(0);
    });

    it('grades malformed unknown-style question with empty correctAnswer', () => {
      const questions = [
        makeQuestion({ id: 'empty-ca', correctAnswer: '', xpReward: 0 }),
      ];
      const withEmpty = assessmentService.gradeAnswers(questions, { 'empty-ca': '' });
      expect(withEmpty.correctAnswers).toBe(1);

      const missing = assessmentService.gradeAnswers(questions, {});
      expect(missing.correctAnswers).toBe(0);
    });

    it('accumulates xpEarned across correct answers only', () => {
      const questions = [
        makeQuestion({ id: 'a', correctAnswer: 'x', xpReward: 10 }),
        makeQuestion({ id: 'b', correctAnswer: 'y', xpReward: 30 }),
        makeQuestion({ id: 'c', correctAnswer: 'z', xpReward: 50 }),
      ];
      const result = assessmentService.gradeAnswers(questions, { a: 'x', b: 'no', c: 'z' });
      expect(result.xpEarned).toBe(60);
      expect(result.percentage).toBe(67);
    });
  });
});
