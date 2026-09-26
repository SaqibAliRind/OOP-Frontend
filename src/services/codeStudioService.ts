import type { CodeStudioProgress, CodeStudioMission } from '@/types/codeStudio';
import { progressService } from './progressService';
import { getStudioMissions } from '@/data/codeStudio';

const STORAGE_KEY = 'oop-universe:code-studio-progress:v1';

const DEFAULT_PROGRESS: CodeStudioProgress = {
  exploredExamples: [],
  tracedExamples: [],
  predictionResults: {},
  completionResults: {},
  analysisResults: {},
  debugResults: {},
  completedObjectives: [],
  completedMissions: [],
  awardedMissionIds: [],
};

function isRecord(value: unknown): value is Record<string, boolean> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function sanitizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === 'string');
}

function sanitizeBoolRecord(value: unknown): Record<string, boolean> {
  if (!isRecord(value)) return {};
  const out: Record<string, boolean> = {};
  for (const [k, v] of Object.entries(value)) {
    if (typeof v === 'boolean') out[k] = v;
  }
  return out;
}

export function loadCodeStudioProgress(): CodeStudioProgress {
  if (typeof window === 'undefined') return { ...DEFAULT_PROGRESS };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return { ...DEFAULT_PROGRESS };
    const p = parsed as Partial<CodeStudioProgress>;
    return {
      exploredExamples: sanitizeStringArray(p.exploredExamples),
      tracedExamples: sanitizeStringArray(p.tracedExamples),
      predictionResults: sanitizeBoolRecord(p.predictionResults),
      completionResults: sanitizeBoolRecord(p.completionResults),
      analysisResults: sanitizeBoolRecord(p.analysisResults),
      debugResults: sanitizeBoolRecord(p.debugResults),
      completedObjectives: sanitizeStringArray(p.completedObjectives),
      completedMissions: sanitizeStringArray(p.completedMissions),
      awardedMissionIds: sanitizeStringArray(p.awardedMissionIds),
    };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function saveCodeStudioProgress(progress: CodeStudioProgress): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // storage full or unavailable — progress stays in memory this session
  }
}

export function markExampleExplored(progress: CodeStudioProgress, exampleId: string): CodeStudioProgress {
  if (progress.exploredExamples.includes(exampleId)) return progress;
  progressService.recordActivity('practice', 'Code Studio: explored example', 0);
  return { ...progress, exploredExamples: [...progress.exploredExamples, exampleId] };
}

export function markExampleTraced(progress: CodeStudioProgress, exampleId: string): CodeStudioProgress {
  if (progress.tracedExamples.includes(exampleId)) return progress;
  progressService.recordActivity('practice', 'Code Studio: traced execution', 0);
  return { ...progress, tracedExamples: [...progress.tracedExamples, exampleId] };
}

export function recordChallengeResult(
  progress: CodeStudioProgress,
  kind: 'prediction' | 'completion' | 'analysis' | 'debug',
  challengeId: string,
  correct: boolean
): CodeStudioProgress {
  const key =
    kind === 'prediction' ? 'predictionResults'
    : kind === 'completion' ? 'completionResults'
    : kind === 'analysis' ? 'analysisResults'
    : 'debugResults';
  const existing = progress[key];
  if (existing[challengeId] === true) return progress;
  return {
    ...progress,
    [key]: { ...existing, [challengeId]: correct },
  };
}

function countCorrect(results: Record<string, boolean>): number {
  return Object.values(results).filter(Boolean).length;
}

export function evaluateMissionObjectives(
  progress: CodeStudioProgress
): { completedObjectives: string[]; newlyCompletedMissions: CodeStudioMission[] } {
  const missions = getStudioMissions();
  const completed = new Set(progress.completedObjectives);
  const explored = new Set(progress.exploredExamples);
  const traced = new Set(progress.tracedExamples);
  const predictions = countCorrect(progress.predictionResults);
  const debugs = countCorrect(progress.debugResults);
  const analyses = countCorrect(progress.analysisResults);

  const complete = (id: string) => completed.add(id);

  if (explored.has('cs-ex-01')) complete('obj-open-hello');
  if (explored.has('cs-ex-01') && (progress as { _helloLines?: boolean })._helloLines) complete('obj-explain-hello');
  if (explored.has('cs-ex-03')) complete('obj-open-student');
  if (explored.has('cs-ex-03') && (progress as { _studentLines?: boolean })._studentLines) complete('obj-explain-student');
  if (traced.has('cs-ex-03')) complete('obj-trace-student');
  if (traced.has('cs-ex-04')) complete('obj-trace-car');
  if (predictions >= 4) complete('obj-predict-4');
  if (predictions >= 6) complete('obj-predict-6');
  if (debugs >= 3) complete('obj-debug-3');
  if (debugs >= 6) complete('obj-debug-6');
  if (explored.has('cs-ex-07')) complete('obj-open-poly');
  if (traced.has('cs-ex-07')) complete('obj-trace-poly');
  if (analyses >= 1 && progress.analysisResults['cs-an-02'] === true) complete('obj-analyze-poly');
  if (progress.completionResults['cs-comp-05'] === true) complete('obj-complete-poly');

  const newlyCompletedMissions: CodeStudioMission[] = [];
  for (const mission of missions) {
    if (progress.completedMissions.includes(mission.id)) continue;
    const allDone = mission.objectives.every(o => completed.has(o.id));
    if (allDone) newlyCompletedMissions.push(mission);
  }

  return { completedObjectives: Array.from(completed), newlyCompletedMissions };
}

export function awardMissionXp(
  progress: CodeStudioProgress,
  missions: CodeStudioMission[]
): CodeStudioProgress {
  let next = progress;
  for (const mission of missions) {
    if (next.awardedMissionIds.includes(mission.id)) continue;
    progressService.addXp(mission.xpReward);
    progressService.recordActivity('practice', `Code Studio mission: ${mission.title}`, mission.xpReward);
    next = {
      ...next,
      awardedMissionIds: [...next.awardedMissionIds, mission.id],
      completedMissions: next.completedMissions.includes(mission.id)
        ? next.completedMissions
        : [...next.completedMissions, mission.id],
    };
  }
  return next;
}

export function syncMissionProgress(progress: CodeStudioProgress): CodeStudioProgress {
  const { completedObjectives, newlyCompletedMissions } = evaluateMissionObjectives(progress);
  let next: CodeStudioProgress = {
    ...progress,
    completedObjectives,
  };
  if (newlyCompletedMissions.length > 0) {
    next = awardMissionXp(next, newlyCompletedMissions);
  }
  return next;
}

export function markLinesExplained(progress: CodeStudioProgress, _exampleId: string, flagKey: '_helloLines' | '_studentLines'): CodeStudioProgress {
  const p = progress as CodeStudioProgress & Record<string, unknown>;
  if (p[flagKey]) return progress;
  p[flagKey] = true;
  return { ...p, exploredExamples: [...progress.exploredExamples] };
}

export function getStudioXpEarned(progress: CodeStudioProgress): number {
  const missions = getStudioMissions();
  return missions
    .filter(m => progress.awardedMissionIds.includes(m.id))
    .reduce((sum, m) => sum + m.xpReward, 0);
}

export const CODE_STUDIO_MISSION_XP_TOTAL = getStudioMissions().reduce((s, m) => s + m.xpReward, 0);
