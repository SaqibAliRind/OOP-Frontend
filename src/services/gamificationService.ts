import type { DailyGoal, DailyGoalTarget, LearningGoal, WeeklyChallenge, LearningActivity } from '@/types';
import { isPlainObject, safeParseJSON } from '@/utils/safeStorage';

const STORAGE_KEY = 'oop-universe-gamification';

interface GamificationData {
  dailyGoals: Record<string, DailyGoal>;
  learningGoal: LearningGoal | null;
  weeklyChallenges: Record<string, WeeklyChallenge>;
  activityHistory: LearningActivity[];
  lastDailyGoalDate: string;
}

const defaultData: GamificationData = {
  dailyGoals: {},
  learningGoal: null,
  weeklyChallenges: {},
  activityHistory: [],
  lastDailyGoalDate: '',
};

function getTodayKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getWeekStart(): Date {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.getFullYear(), now.getMonth(), diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function getWeekKey(): string {
  return getWeekStart().toISOString().split('T')[0];
}

function generateDailyGoal(date: string): DailyGoal {
  const dayOfWeek = new Date(date).getDay();
  const targets: DailyGoalTarget[] = [
    { id: 'dl-lesson', type: 'lesson', label: 'Complete 1 lesson', target: 1, current: 0, completed: false },
    { id: 'dl-practice', type: 'practice', label: 'Solve 5 practice questions', target: 5, current: 0, completed: false },
  ];
  if (dayOfWeek !== 0 && dayOfWeek !== 6) {
    targets.push({ id: 'dl-debug', type: 'debug', label: 'Complete 1 debugging challenge', target: 1, current: 0, completed: false });
  }
  return {
    id: `dg-${date}`,
    date,
    targets,
    completed: 0,
    total: targets.length,
    rewardXp: 30,
    claimed: false,
  };
}

function generateWeeklyChallenge(weekStart: string): WeeklyChallenge {
  return {
    id: `wc-${weekStart}`,
    weekStart,
    targets: [
      { type: 'lessons', label: 'Complete 3 lessons', target: 3, current: 0 },
      { type: 'practice', label: 'Solve 20 practice questions', target: 20, current: 0 },
      { type: 'debug', label: 'Solve 2 debug challenges', target: 2, current: 0 },
      { type: '3d', label: 'Complete 1 3D mission', target: 1, current: 0 },
    ],
    rewardXp: 150,
    claimed: false,
    completed: false,
  };
}

class GamificationService {
  private data: GamificationData;

  constructor() {
    this.data = this.load();
  }

  private load(): GamificationData {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = safeParseJSON<unknown>(stored, null);
        if (!isPlainObject(parsed)) return { ...defaultData };
        const activityHistory = Array.isArray(parsed.activityHistory)
          ? parsed.activityHistory.filter(isPlainObject).slice(-200)
          : [];
        return {
          dailyGoals: isPlainObject(parsed.dailyGoals)
            ? (parsed.dailyGoals as GamificationData['dailyGoals'])
            : {},
          learningGoal: isPlainObject(parsed.learningGoal)
            ? (parsed.learningGoal as unknown as GamificationData['learningGoal'])
            : null,
          weeklyChallenges: isPlainObject(parsed.weeklyChallenges)
            ? (parsed.weeklyChallenges as GamificationData['weeklyChallenges'])
            : {},
          activityHistory: activityHistory as unknown as LearningActivity[],
          lastDailyGoalDate: typeof parsed.lastDailyGoalDate === 'string' ? parsed.lastDailyGoalDate : '',
        };
      }
    } catch {
      // ignore
    }
    return { ...defaultData };
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch {
      // ignore
    }
  }

  getDailyGoal(): DailyGoal {
    const today = getTodayKey();
    if (!this.data.dailyGoals[today]) {
      this.data.dailyGoals[today] = generateDailyGoal(today);
      this.save();
    }
    return this.data.dailyGoals[today];
  }

  updateDailyGoalProgress(type: DailyGoalTarget['type'], amount: number = 1): DailyGoal {
    const goal = this.getDailyGoal();
    const target = goal.targets.find(t => t.type === type);
    if (target && !target.completed) {
      target.current = Math.min(target.current + amount, target.target);
      target.completed = target.current >= target.target;
      goal.completed = goal.targets.filter(t => t.completed).length;
      this.data.dailyGoals[goal.date] = goal;
      this.save();
    }
    return goal;
  }

  claimDailyGoalReward(): number {
    const goal = this.getDailyGoal();
    if (goal.completed && !goal.claimed) {
      goal.claimed = true;
      this.data.dailyGoals[goal.date] = goal;
      this.save();
      return goal.rewardXp;
    }
    return 0;
  }

  getWeeklyChallenge(): WeeklyChallenge {
    const weekKey = getWeekKey();
    if (!this.data.weeklyChallenges[weekKey]) {
      this.data.weeklyChallenges[weekKey] = generateWeeklyChallenge(weekKey);
      this.save();
    }
    return this.data.weeklyChallenges[weekKey];
  }

  updateWeeklyChallengeProgress(type: string, amount: number = 1): WeeklyChallenge {
    const challenge = this.getWeeklyChallenge();
    const target = challenge.targets.find(t => t.type === type);
    if (target) {
      target.current = Math.min(target.current + amount, target.target);
      challenge.completed = challenge.targets.every(t => t.current >= t.target);
      this.data.weeklyChallenges[challenge.weekStart] = challenge;
      this.save();
    }
    return challenge;
  }

  claimWeeklyReward(): number {
    const challenge = this.getWeeklyChallenge();
    if (challenge.completed && !challenge.claimed) {
      challenge.claimed = true;
      this.data.weeklyChallenges[challenge.weekStart] = challenge;
      this.save();
      return challenge.rewardXp;
    }
    return 0;
  }

  getLearningGoal(): LearningGoal | null {
    return this.data.learningGoal;
  }

  setLearningGoal(title: string, description: string, target: number, type: string): LearningGoal {
    const goal: LearningGoal = {
      id: `lg-${Date.now()}`,
      title,
      description,
      target,
      current: 0,
      type,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    this.data.learningGoal = goal;
    this.save();
    return goal;
  }

  updateLearningGoalProgress(amount: number = 1): LearningGoal | null {
    if (!this.data.learningGoal || this.data.learningGoal.completed) return null;
    this.data.learningGoal.current = Math.min(this.data.learningGoal.current + amount, this.data.learningGoal.target);
    this.data.learningGoal.completed = this.data.learningGoal.current >= this.data.learningGoal.target;
    this.save();
    return this.data.learningGoal;
  }

  clearLearningGoal(): void {
    this.data.learningGoal = null;
    this.save();
  }

  recordActivity(activity: Omit<LearningActivity, 'id'>): void {
    const entry: LearningActivity = {
      ...activity,
      id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    };
    this.data.activityHistory.push(entry);
    if (this.data.activityHistory.length > 200) {
      this.data.activityHistory = this.data.activityHistory.slice(-200);
    }
    this.save();
  }

  getActivityHistory(limit: number = 20): LearningActivity[] {
    return [...this.data.activityHistory].reverse().slice(0, limit);
  }

  getRecentActivity(limit: number = 10): LearningActivity[] {
    return this.getActivityHistory(limit);
  }

  getDailyChallenge(): { question: string; type: string; options?: string[]; answer: string } {
    const today = getTodayKey();
    const seed = today.split('-').reduce((acc, v) => acc + parseInt(v), 0);
    const challenges = [
      { question: 'What is the output of: System.out.println(10 + 20 + "Hello");', type: 'output', options: ['30Hello', 'Hello30', '1020Hello', 'Compilation error'], answer: '30Hello' },
      { question: 'Which SOLID principle states that classes should have only one reason to change?', type: 'concept', options: ['Open/Closed', 'Single Responsibility', 'Liskov Substitution', 'Interface Segregation'], answer: 'Single Responsibility' },
      { question: 'What keyword prevents method overriding in Java?', type: 'concept', options: ['abstract', 'static', 'final', 'private'], answer: 'final' },
      { question: 'Identify the bug: String s = "Hello"; s.concat(" World"); System.out.println(s);', type: 'debug', options: ['String is immutable, concat returns new String', 'Compilation error', 'NullPointerException', 'Prints "Hello World"'], answer: 'String is immutable, concat returns new String' },
      { question: 'What is the relationship in: Car extends Vehicle?', type: 'concept', options: ['HAS-A', 'IS-A', 'USES-A', 'IMPLEMENTS'], answer: 'IS-A' },
      { question: 'What does the @Override annotation verify?', type: 'concept', options: ['Method is public', 'Method actually overrides a parent method', 'Method is static', 'Method returns void'], answer: 'Method actually overrides a parent method' },
      { question: 'Which collection maintains insertion order and allows duplicates?', type: 'concept', options: ['HashSet', 'TreeSet', 'ArrayList', 'HashMap'], answer: 'ArrayList' },
    ];
    return challenges[seed % challenges.length];
  }

  resetGamification(): void {
    this.data = { ...defaultData };
    this.save();
  }
}

export const gamificationService = new GamificationService();
