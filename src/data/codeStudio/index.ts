import type {
  JavaCodeExample,
  OutputPredictionChallenge,
  CodeCompletionChallenge,
  CodeAnalysisChallenge,
  StudioDebugChallenge,
  CodeStudioMission,
  CodeStudioCategory,
} from '@/types/codeStudio';
import { CODE_STUDIO_CATEGORIES } from './categories';
import { JAVA_CODE_EXAMPLES } from './examples';
import {
  PREDICTION_CHALLENGES,
  COMPLETION_CHALLENGES,
  ANALYSIS_CHALLENGES,
  DEBUG_CHALLENGES,
} from './challenges';
import { CODE_STUDIO_MISSIONS } from './missions';

export {
  CODE_STUDIO_CATEGORIES,
  JAVA_CODE_EXAMPLES,
  PREDICTION_CHALLENGES,
  COMPLETION_CHALLENGES,
  ANALYSIS_CHALLENGES,
  DEBUG_CHALLENGES,
  CODE_STUDIO_MISSIONS,
};

export function getCodeStudioCategories(): typeof CODE_STUDIO_CATEGORIES {
  return CODE_STUDIO_CATEGORIES;
}

export function getStudioExamples(category?: CodeStudioCategory): JavaCodeExample[] {
  if (!category) return JAVA_CODE_EXAMPLES;
  return JAVA_CODE_EXAMPLES.filter(e => e.category === category);
}

export function getStudioExample(id: string): JavaCodeExample | undefined {
  return JAVA_CODE_EXAMPLES.find(e => e.id === id);
}

export function getPredictionsForExample(exampleId?: string): OutputPredictionChallenge[] {
  if (!exampleId) return PREDICTION_CHALLENGES;
  const scoped = PREDICTION_CHALLENGES.filter(c => c.exampleId === exampleId);
  return scoped.length > 0 ? scoped : PREDICTION_CHALLENGES;
}

export function getCompletionsForExample(exampleId?: string): CodeCompletionChallenge[] {
  if (!exampleId) return COMPLETION_CHALLENGES;
  const scoped = COMPLETION_CHALLENGES.filter(c => c.exampleId === exampleId);
  return scoped.length > 0 ? scoped : COMPLETION_CHALLENGES;
}

export function getAnalysesForExample(exampleId?: string): CodeAnalysisChallenge[] {
  if (!exampleId) return ANALYSIS_CHALLENGES;
  const scoped = ANALYSIS_CHALLENGES.filter(c => c.exampleId === exampleId);
  return scoped.length > 0 ? scoped : ANALYSIS_CHALLENGES;
}

export function getDebugChallengesForStudio(): StudioDebugChallenge[] {
  return DEBUG_CHALLENGES;
}

export function getStudioMissions(): CodeStudioMission[] {
  return CODE_STUDIO_MISSIONS;
}

export function validatePrediction(challengeId: string, answer: string): boolean {
  const c = PREDICTION_CHALLENGES.find(x => x.id === challengeId);
  if (!c) return false;
  return answer === c.correctOutput;
}

export function validateCompletion(challengeId: string, answer: string): boolean {
  const c = COMPLETION_CHALLENGES.find(x => x.id === challengeId);
  if (!c) return false;
  return answer === c.correctChoice;
}

export function validateAnalysis(challengeId: string, answerIndex: number): boolean {
  const c = ANALYSIS_CHALLENGES.find(x => x.id === challengeId);
  if (!c) return false;
  return answerIndex === c.correctIndex;
}

export function validateDebug(challengeId: string, answerIndex: number): boolean {
  const c = DEBUG_CHALLENGES.find(x => x.id === challengeId);
  if (!c) return false;
  return answerIndex === c.correctCorrectionIndex;
}

export function getExampleLineExplanation(
  example: JavaCodeExample,
  line: number
): JavaCodeExample['lineExplanations'][number] | undefined {
  return example.lineExplanations.find(e => e.line === line);
}
