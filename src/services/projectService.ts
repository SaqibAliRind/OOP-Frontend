import type {
  BossChallengeDef,
  BossChallengeProgress,
  OOPProjectScenario,
  ProjectAttempt,
  ProjectReviewFeedback,
  ProjectStage,
  ProjectStageState,
} from '@/types/projectSimulator';
import { BOSS_CHALLENGES, getBossChallenge } from '@/data/projectSimulator/bossChallenges';
import { PROJECT_SCENARIOS, getProjectScenario } from '@/data/projectSimulator';
import { progressService } from '@/services/progressService';
import { isPlainObject, safeParseJSON } from '@/utils/safeStorage';

const STORAGE_KEY = 'oop-universe-projects';

interface ProjectStore {
  attempts: Record<string, ProjectAttempt>;
  bosses: Record<string, BossChallengeProgress>;
}

function emptyStageState(): ProjectStageState {
  return {
    completed: false,
    acknowledged: false,
    selectedClassIds: [],
    selectedAttributeMethodIds: [],
    selectedRelationshipIds: [],
    pillarAnswers: {},
    testResults: {},
    testsRun: false,
    assessmentAnswers: {},
    hintsUsed: 0,
  };
}

function createAttempt(projectId: string): ProjectAttempt {
  return {
    projectId,
    currentStageIndex: 0,
    completedStages: [],
    stageStates: {},
    completed: false,
    xpAwarded: false,
    startedAt: new Date().toISOString(),
  };
}

function loadStore(): ProjectStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = safeParseJSON<unknown>(raw, null);
      if (isPlainObject(parsed)) {
        return {
          attempts: isPlainObject(parsed.attempts)
            ? (parsed.attempts as ProjectStore['attempts'])
            : {},
          bosses: isPlainObject(parsed.bosses)
            ? (parsed.bosses as ProjectStore['bosses'])
            : {},
        };
      }
    }
  } catch {
    /* ignore corrupt storage */
  }
  return { attempts: {}, bosses: {} };
}

function saveStore(store: ProjectStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (e) {
    console.warn('Failed to save project store:', e);
  }
}

export function createDefaultStageState(): ProjectStageState {
  return emptyStageState();
}

class ProjectService {
  private store: ProjectStore;

  constructor() {
    this.store = loadStore();
  }

  listProjects(): OOPProjectScenario[] {
    return PROJECT_SCENARIOS;
  }

  getProject(id: string): OOPProjectScenario | undefined {
    return getProjectScenario(id);
  }

  listBosses(): BossChallengeDef[] {
    return BOSS_CHALLENGES;
  }

  getBoss(id: string): BossChallengeDef | undefined {
    return getBossChallenge(id);
  }

  getAttempt(projectId: string): ProjectAttempt {
    if (!this.store.attempts[projectId]) {
      this.store.attempts[projectId] = createAttempt(projectId);
      saveStore(this.store);
    }
    return this.store.attempts[projectId];
  }

  ensureStageState(attempt: ProjectAttempt, stageId: string): ProjectStageState {
    if (!attempt.stageStates[stageId]) {
      attempt.stageStates[stageId] = emptyStageState();
      saveStore(this.store);
    }
    return attempt.stageStates[stageId];
  }

  persistAttempt(attempt: ProjectAttempt): void {
    this.store.attempts[attempt.projectId] = attempt;
    saveStore(this.store);
  }

  isStageUnlocked(attempt: ProjectAttempt, index: number): boolean {
    if (index <= attempt.currentStageIndex) return true;
    return attempt.completedStages.length >= index;
  }

  stagePassed(stage: ProjectStage, state: ProjectStageState): boolean {
    switch (stage.type) {
      case 'requirements':
        return state.acknowledged;
      case 'identify-classes': {
        const required = stage.requiredClassIds || [];
        if (required.length === 0) return state.selectedClassIds.length > 0;
        const selected = new Set(state.selectedClassIds);
        const noInvalid = state.selectedClassIds.every(id => {
          const cand = stage.classCandidates?.find(c => c.id === id);
          return cand?.isValid !== false;
        });
        return noInvalid && required.every(id => selected.has(id));
      }
      case 'attributes-methods': {
        const required = stage.requiredAttributeMethodIds || [];
        if (required.length === 0) return state.selectedAttributeMethodIds.length > 0;
        const selected = new Set(state.selectedAttributeMethodIds);
        const noInvalid = state.selectedAttributeMethodIds.every(id => {
          const opt = stage.attributeMethodOptions?.find(o => o.id === id);
          return opt?.isValid !== false;
        });
        return noInvalid && required.every(id => selected.has(id));
      }
      case 'relationships': {
        const required = stage.requiredRelationshipIds || [];
        if (required.length === 0) return state.selectedRelationshipIds.length > 0;
        const selected = new Set(state.selectedRelationshipIds);
        const noInvalid = state.selectedRelationshipIds.every(id => {
          const rel = stage.relationshipOptions?.find(r => r.id === id);
          return rel?.isValid !== false;
        });
        return noInvalid && required.every(id => selected.has(id));
      }
      case 'encapsulation':
      case 'pillars': {
        const challenges = stage.pillarChallenges || [];
        if (challenges.length === 0) return false;
        return challenges.every(c => {
          const ans = state.pillarAnswers[c.id];
          return ans !== undefined && ans === c.correctIndex;
        });
      }
      case 'review':
        return state.acknowledged;
      case 'test-scenarios': {
        const scenarios = stage.testScenarios || [];
        if (!state.testsRun || scenarios.length === 0) return false;
        return scenarios.every(s => state.testResults[s.id] === true);
      }
      case 'assessment': {
        const questions = stage.assessmentQuestions || [];
        if (questions.length === 0) return false;
        return questions.every(q => {
          const ans = state.assessmentAnswers[q.id];
          return ans !== undefined && ans === q.correctIndex;
        });
      }
      default:
        return false;
    }
  }

  evaluateTestScenario(
    stage: ProjectStage,
    scenarioId: string,
    state: ProjectStageState
  ): { passed: boolean; explanation: string } {
    const scenario = stage.testScenarios?.find(s => s.id === scenarioId);
    if (!scenario) return { passed: false, explanation: 'Unknown test.' };

    const classes = new Set(state.selectedClassIds);
    const attrs = new Set(state.selectedAttributeMethodIds);
    const rels = new Set(state.selectedRelationshipIds);

    if (scenario.requiresSelectedClasses && !scenario.requiresSelectedClasses.every(id => classes.has(id))) {
      return { passed: false, explanation: scenario.explanation };
    }
    if (scenario.requiresSelectedAttributeMethods && !scenario.requiresSelectedAttributeMethods.every(id => attrs.has(id))) {
      return { passed: false, explanation: scenario.explanation };
    }
    if (scenario.requiresSelectedRelationships && !scenario.requiresSelectedRelationships.every(id => rels.has(id))) {
      return { passed: false, explanation: scenario.explanation };
    }
    if (scenario.requiresCorrectPillarChallenges) {
      const allStages = stage.pillarChallenges || [];
      const byId = new Map(allStages.map(c => [c.id, c]));
      const passedPillars = scenario.requiresCorrectPillarChallenges.every(id => {
        const challenge = byId.get(id);
        if (!challenge) {
          for (const s of [stage]) {
            const c = (s.pillarChallenges || []).find(x => x.id === id);
            if (c) return state.pillarAnswers[id] === c.correctIndex;
          }
          return true;
        }
        return state.pillarAnswers[id] === challenge.correctIndex;
      });
      if (!passedPillars) return { passed: false, explanation: scenario.explanation };
    }

    return { passed: true, explanation: scenario.explanation };
  }

  completeStage(project: OOPProjectScenario, stageIndex: number): { xpAwarded: boolean; projectCompleted: boolean } {
    const attempt = this.getAttempt(project.id);
    const stage = project.stages[stageIndex];
    if (!stage) return { xpAwarded: false, projectCompleted: false };

    if (!attempt.completedStages.includes(stage.id)) {
      attempt.completedStages.push(stage.id);
    }
    const state = this.ensureStageState(attempt, stage.id);
    state.completed = true;

    if (stageIndex === project.stages.length - 1) {
      attempt.completed = true;
      attempt.completedAt = new Date().toISOString();
      attempt.currentStageIndex = project.stages.length - 1;
      let xpAwarded = false;
      if (!attempt.xpAwarded) {
        attempt.xpAwarded = true;
        xpAwarded = true;
        try {
          progressService.addXp(project.xpReward);
          progressService.recordActivity('lab', `Completed project: ${project.title}`, project.xpReward);
        } catch {
          /* noop */
        }
      }
      this.persistAttempt(attempt);
      return { xpAwarded, projectCompleted: true };
    }

    attempt.currentStageIndex = Math.max(attempt.currentStageIndex, stageIndex + 1);
    this.persistAttempt(attempt);
    return { xpAwarded: false, projectCompleted: false };
  }

  buildReviewFeedback(project: OOPProjectScenario): ProjectReviewFeedback {
    const attempt = this.getAttempt(project.id);
    const requirementsSatisfied: string[] = [];
    const requirementsSatisfiedUrdu: string[] = [];
    const missedRequirements: string[] = [];
    const missedRequirementsUrdu: string[] = [];
    const correctDecisions: string[] = [];
    const correctDecisionsUrdu: string[] = [];

    project.requirements.forEach((req, i) => {
      const stage = project.stages[i + 1];
      if (!stage) return;
      const state = attempt.stageStates[stage.id];
      const ok = state ? this.stagePassed(stage, state) : false;
      if (ok) {
        requirementsSatisfied.push(req.text);
        requirementsSatisfiedUrdu.push(req.textUrdu);
        correctDecisions.push(stage.title);
        correctDecisionsUrdu.push(stage.titleUrdu);
      } else {
        missedRequirements.push(req.text);
        missedRequirementsUrdu.push(req.textUrdu);
      }
    });

    const firstMissedIndex = project.stages.findIndex((s, i) => {
      if (i > attempt.currentStageIndex) return false;
      const st = attempt.stageStates[s.id];
      return st ? !this.stagePassed(s, st) : false;
    });

    const suggestedNext =
      firstMissedIndex >= 0
        ? `Revisit stage: ${project.stages[firstMissedIndex].title}`
        : attempt.completed
        ? 'Try a boss challenge next'
        : `Continue with stage: ${project.stages[Math.min(attempt.currentStageIndex + 1, project.stages.length - 1)].title}`;
    const suggestedNextUrdu =
      firstMissedIndex >= 0
        ? `Stage dobara kholein: ${project.stages[firstMissedIndex].titleUrdu}`
        : attempt.completed
        ? 'Agla boss challenge try karein'
        : `Stage ke sath jari rakhein: ${project.stages[Math.min(attempt.currentStageIndex + 1, project.stages.length - 1)].titleUrdu}`;

    return {
      requirementsSatisfied,
      requirementsSatisfiedUrdu,
      correctDecisions,
      correctDecisionsUrdu,
      missedRequirements,
      missedRequirementsUrdu,
      conceptsPracticed: project.concepts,
      relatedLessons: project.relatedLessonIds,
      suggestedNext,
      suggestedNextUrdu,
      xpEarned: attempt.xpAwarded ? project.xpReward : 0,
    };
  }

  getBossProgress(bossId: string): BossChallengeProgress {
    if (!this.store.bosses[bossId]) {
      this.store.bosses[bossId] = {
        bossId,
        currentObjectiveIndex: 0,
        completedObjectives: [],
        answers: {},
        completed: false,
        xpAwarded: false,
        hintsUsed: 0,
        startedAt: new Date().toISOString(),
      };
      saveStore(this.store);
    }
    return this.store.bosses[bossId];
  }

  saveBossProgress(progress: BossChallengeProgress): void {
    this.store.bosses[progress.bossId] = progress;
    saveStore(this.store);
  }

  answerBossObjective(bossId: string, objectiveId: string, selectedIndex: number): boolean {
    const boss = this.getBoss(bossId);
    if (!boss) return false;
    const objective = boss.objectives.find(o => o.id === objectiveId);
    if (!objective) return false;

    const progress = this.getBossProgress(bossId);
    if (progress.completedObjectives.includes(objectiveId)) return true;

    progress.answers[objectiveId] = selectedIndex;
    const correct = selectedIndex === objective.correctIndex;
    if (correct) {
      progress.completedObjectives.push(objectiveId);
      const idx = boss.objectives.findIndex(o => o.id === objectiveId);
      progress.currentObjectiveIndex = Math.min(
        boss.objectives.length - 1,
        Math.max(progress.currentObjectiveIndex, idx + 1)
      );
      if (progress.completedObjectives.length === boss.objectives.length) {
        progress.completed = true;
        progress.completedAt = new Date().toISOString();
        if (!progress.xpAwarded) {
          progress.xpAwarded = true;
          try {
            progressService.addXp(boss.xpReward);
            progressService.recordActivity('lab', `Defeated boss: ${boss.title}`, boss.xpReward);
          } catch {
            /* noop */
          }
        }
      }
    }
    this.saveBossProgress(progress);
    return correct;
  }

  resetProject(projectId: string): void {
    this.store.attempts[projectId] = createAttempt(projectId);
    saveStore(this.store);
  }

  resetBoss(bossId: string): void {
    delete this.store.bosses[bossId];
    saveStore(this.store);
  }
}

export const projectService = new ProjectService();
