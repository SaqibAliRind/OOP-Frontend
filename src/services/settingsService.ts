import { progressService } from './progressService';
import { masteryService } from './masteryService';
import { gamificationService } from './gamificationService';
import { isPlainObject, safeParseJSON } from '@/utils/safeStorage';

export interface UserSettings {
  language: 'english' | 'roman-urdu' | 'both';
  learningStyle: 'balanced' | 'visual' | 'practice-first' | 'exam-first';
  theme: 'dark' | 'light' | 'system';
  accentColor: 'default' | 'blue' | 'purple' | 'green' | 'amber';
  compactMode: boolean;
  reducedMotion: boolean;
  threeDQuality: 'auto' | 'high' | 'medium' | 'low';
  enable3DEffects: boolean;
  dailyGoalLessons: number;
  fontSize: 'normal' | 'large';
}

const DEFAULT_SETTINGS: UserSettings = {
  language: 'english',
  learningStyle: 'balanced',
  theme: 'dark',
  accentColor: 'default',
  compactMode: false,
  reducedMotion: false,
  threeDQuality: 'auto',
  enable3DEffects: true,
  dailyGoalLessons: 5,
  fontSize: 'normal',
};

const STORAGE_KEY = 'oop-universe-settings';

class SettingsService {
  private settings: UserSettings;

  constructor() {
    this.settings = this.load();
  }

  private load(): UserSettings {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = safeParseJSON<unknown>(stored, null);
        if (isPlainObject(parsed)) {
          const merged = { ...DEFAULT_SETTINGS, ...parsed } as UserSettings;
          if (typeof merged.dailyGoalLessons === 'number' && Number.isFinite(merged.dailyGoalLessons)) {
            merged.dailyGoalLessons = Math.max(1, Math.min(50, Math.floor(merged.dailyGoalLessons)));
          } else {
            merged.dailyGoalLessons = DEFAULT_SETTINGS.dailyGoalLessons;
          }
          return merged;
        }
      }
    } catch {
      // ignore
    }
    return { ...DEFAULT_SETTINGS };
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
    } catch {
      // ignore
    }
  }

  getSettings(): UserSettings {
    return { ...this.settings };
  }

  updateSettings(partial: Partial<UserSettings>): void {
    this.settings = { ...this.settings, ...partial };
    this.save();
  }

  resetSettings(): void {
    this.settings = { ...DEFAULT_SETTINGS };
    this.save();
  }

  exportProgress(): string {
    const data: Record<string, unknown> = {};

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('oop-universe-')) {
        try {
          data[key] = JSON.parse(localStorage.getItem(key) ?? 'null');
        } catch {
          data[key] = localStorage.getItem(key);
        }
      }
    }

    data.version = 1;
    data.progress = progressService.getProgress();
    data.mastery = masteryService.getAllMastery();
    data.settings = this.settings;
    data.gamification = gamificationService.getActivityHistory(9999);

    return JSON.stringify(data, null, 2);
  }

  importProgress(jsonString: string): { success: boolean; error?: string } {
    try {
      const data = JSON.parse(jsonString);

      if (!data || (typeof data !== 'object')) {
        return { success: false, error: 'Invalid JSON format' };
      }

      if (!data.progress && data.version === undefined) {
        return { success: false, error: 'Invalid backup: missing progress or version key' };
      }

      for (const [key, value] of Object.entries(data)) {
        if (key === 'version' || key === 'progress' || key === 'mastery' || key === 'settings' || key === 'gamification') {
          continue;
        }
        try {
          localStorage.setItem(key, JSON.stringify(value));
        } catch {
          // skip keys that fail to write
        }
      }

      if (data.settings) {
        this.settings = { ...DEFAULT_SETTINGS, ...data.settings };
        this.save();
      }

      return { success: true };
    } catch {
      return { success: false, error: 'Failed to parse JSON' };
    }
  }

  resetAllProgress(): void {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      if (
        key.startsWith('oop-universe-') ||
        key.startsWith('oop-universe:') ||
        key.startsWith('mission-xp-') ||
        key.startsWith('oop-lab-') ||
        key === 'oop-lab-intro-seen' ||
        key === 'oop-lab-lang'
      ) {
        keysToRemove.push(key);
      }
    }
    for (const key of keysToRemove) {
      localStorage.removeItem(key);
    }
    progressService.resetProgress();
    masteryService.resetMastery();
    gamificationService.resetGamification();
    this.settings = { ...DEFAULT_SETTINGS };
    this.save();
  }
}

export const settingsService = new SettingsService();
