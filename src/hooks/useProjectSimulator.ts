import { useCallback, useMemo, useState } from 'react';
import type {
  BossChallengeDef,
  BossChallengeProgress,
  OOPProjectScenario,
  ProjectAttempt,
  ProjectStage,
  ProjectStageState,
} from '@/types/projectSimulator';
import { projectService, createDefaultStageState } from '@/services/projectService';

export function useProjectSimulator(projectId?: string) {
  const project: OOPProjectScenario | undefined = useMemo(
    () => (projectId ? projectService.getProject(projectId) : undefined),
    [projectId]
  );

  const [attempt, setAttempt] = useState<ProjectAttempt>(() =>
    project ? projectService.getAttempt(project.id) : projectService.getAttempt('__none__')
  );

  const stageIndex = attempt.currentStageIndex;
  const stage: ProjectStage | undefined = project?.stages[stageIndex];
  const stageState: ProjectStageState = useMemo(() => {
    if (!stage) return createDefaultStageState();
    return projectService.ensureStageState(attempt, stage.id);
  }, [attempt, stage]);

  const persist = useCallback((next: ProjectAttempt) => {
    setAttempt({ ...next });
    projectService.persistAttempt(next);
  }, []);

  const updateStageState = useCallback(
    (mutate: (state: ProjectStageState) => void) => {
      if (!project || !stage) return;
      const next: ProjectAttempt = {
        ...attempt,
        stageStates: { ...attempt.stageStates },
      };
      const state = projectService.ensureStageState(next, stage.id);
      mutate(state);
      next.stageStates[stage.id] = { ...state };
      persist(next);
    },
    [attempt, project, stage, persist]
  );

  const acknowledge = useCallback(() => {
    updateStageState(s => {
      s.acknowledged = true;
    });
  }, [updateStageState]);

  const toggleClass = useCallback(
    (id: string) => {
      updateStageState(s => {
        s.selectedClassIds = s.selectedClassIds.includes(id)
          ? s.selectedClassIds.filter(x => x !== id)
          : [...s.selectedClassIds, id];
      });
    },
    [updateStageState]
  );

  const toggleAttributeMethod = useCallback(
    (id: string) => {
      updateStageState(s => {
        s.selectedAttributeMethodIds = s.selectedAttributeMethodIds.includes(id)
          ? s.selectedAttributeMethodIds.filter(x => x !== id)
          : [...s.selectedAttributeMethodIds, id];
      });
    },
    [updateStageState]
  );

  const toggleRelationship = useCallback(
    (id: string) => {
      updateStageState(s => {
        s.selectedRelationshipIds = s.selectedRelationshipIds.includes(id)
          ? s.selectedRelationshipIds.filter(x => x !== id)
          : [...s.selectedRelationshipIds, id];
      });
    },
    [updateStageState]
  );

  const answerPillar = useCallback(
    (challengeId: string, optionIndex: number) => {
      updateStageState(s => {
        s.pillarAnswers = { ...s.pillarAnswers, [challengeId]: optionIndex };
      });
    },
    [updateStageState]
  );

  const answerAssessment = useCallback(
    (questionId: string, optionIndex: number) => {
      updateStageState(s => {
        s.assessmentAnswers = { ...s.assessmentAnswers, [questionId]: optionIndex };
      });
    },
    [updateStageState]
  );

  const useHint = useCallback(() => {
    updateStageState(s => {
      s.hintsUsed += 1;
    });
  }, [updateStageState]);

  const runTests = useCallback(() => {
    if (!project || !stage) return;
    updateStageState(s => {
      const results: Record<string, boolean> = {};
      for (const scenario of stage.testScenarios || []) {
        results[scenario.id] = projectService.evaluateTestScenario(stage, scenario.id, s).passed;
      }
      s.testResults = results;
      s.testsRun = true;
    });
  }, [project, stage, updateStageState]);

  const canComplete = useMemo(() => {
    if (!project || !stage) return false;
    return projectService.stagePassed(stage, stageState);
  }, [project, stage, stageState]);

  const goToStage = useCallback(
    (index: number) => {
      if (!project) return;
      if (index < 0 || index >= project.stages.length) return;
      if (!projectService.isStageUnlocked(attempt, index)) return;
      const next = { ...attempt, currentStageIndex: index };
      persist(next);
    },
    [attempt, project, persist]
  );

  const completeCurrentStage = useCallback(() => {
    if (!project || !canComplete) return null;
    const result = projectService.completeStage(project, stageIndex);
    projectService.getAttempt(project.id);
    setAttempt({ ...projectService.getAttempt(project.id) });
    return result;
  }, [project, canComplete, stageIndex]);

  const reset = useCallback(() => {
    if (!project) return;
    projectService.resetProject(project.id);
    setAttempt({ ...projectService.getAttempt(project.id) });
  }, [project]);

  const review = useMemo(
    () => (project ? projectService.buildReviewFeedback(project) : null),
    [project, attempt.completed, attempt.completedStages.length]
  );

  return {
    project,
    attempt,
    stage,
    stageState,
    stageIndex,
    canComplete,
    review,
    acknowledge,
    toggleClass,
    toggleAttributeMethod,
    toggleRelationship,
    answerPillar,
    answerAssessment,
    useHint,
    runTests,
    goToStage,
    completeCurrentStage,
    reset,
  };
}

export function useBossChallenge(bossId?: string) {
  const boss: BossChallengeDef | undefined = useMemo(
    () => (bossId ? projectService.getBoss(bossId) : undefined),
    [bossId]
  );

  const [progress, setProgress] = useState<BossChallengeProgress>(() =>
    boss ? projectService.getBossProgress(boss.id) : projectService.getBossProgress('__none__')
  );

  const currentObjective = boss?.objectives[progress.currentObjectiveIndex];

  const submitAnswer = useCallback(
    (objectiveId: string, optionIndex: number) => {
      if (!boss) return false;
      const correct = projectService.answerBossObjective(boss.id, objectiveId, optionIndex);
      setProgress({ ...projectService.getBossProgress(boss.id) });
      return correct;
    },
    [boss]
  );

  const reset = useCallback(() => {
    if (!boss) return;
    projectService.resetBoss(boss.id);
    setProgress({ ...projectService.getBossProgress(boss.id) });
  }, [boss]);

  return { boss, progress, currentObjective, submitAnswer, reset };
}
