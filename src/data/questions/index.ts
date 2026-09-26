import type { QuizQuestion, ScenarioQuestion, MistakeQuestion, OutputQuestion, DebugChallenge, CodeCompletionQuestion } from '@/types';
import { quizQuestions } from './quizQuestions';
import { scenarioQuestions } from './scenarioQuestions';
import { mistakeQuestions } from './mistakeQuestions';
import { outputQuestions } from './outputQuestions';
import { debugChallenges } from './debugChallenges';
import { codeCompletionQuestions } from './codeCompletion';
import { module01Questions, module02Questions } from './moduleActivities';
import { module03to06Questions } from './module03to06Activities';
import { module07Questions } from './module07Activities';
import { module08Questions } from './module08Activities';
import { module09Questions } from './module09Activities';
import { module10Questions } from './module10Activities';
import { module11Questions } from './module11Activities';
import { module12Questions } from './module12Activities';
import { module13Questions } from './module13Activities';
import { module14Questions } from './module14Activities';
import { module15Questions } from './module15Activities';
import { expansionQuestions01to06 } from './expansion01to06';
import { expansionQuestions07to15 } from './expansion07to15';
import { expansion2Questions } from './expansion2';
import { expansion3Questions } from './expansion3';

export type { QuizQuestion, ScenarioQuestion, MistakeQuestion, OutputQuestion, DebugChallenge, CodeCompletionQuestion };

const modQuiz = [module07Questions, module08Questions, module09Questions, module10Questions, module11Questions, module12Questions, module13Questions, module14Questions, module15Questions];

export const allQuestions = {
  quiz: [...quizQuestions, ...module01Questions.quickChecks as any, ...module02Questions.quickChecks as any, ...module03to06Questions.quickChecks as any, ...modQuiz.flatMap(m => m.quickChecks as any), ...expansionQuestions01to06.quickChecks as any, ...expansionQuestions07to15.quickChecks as any, ...expansion2Questions.quickChecks as any, ...expansion3Questions.quickChecks as any],
  scenario: [...scenarioQuestions, ...module01Questions.scenarios, ...module02Questions.scenarios, ...module03to06Questions.scenarios, ...modQuiz.flatMap(m => m.scenarios), ...expansionQuestions01to06.scenarios, ...expansionQuestions07to15.scenarios, ...expansion2Questions.scenarios, ...expansion3Questions.scenarios],
  mistake: [...mistakeQuestions, ...module01Questions.mistakes, ...module02Questions.mistakes, ...module03to06Questions.mistakes, ...modQuiz.flatMap(m => m.mistakes), ...expansionQuestions01to06.mistakes, ...expansionQuestions07to15.mistakes, ...expansion2Questions.mistakes, ...expansion3Questions.mistakes],
  output: [...outputQuestions, ...module01Questions.outputs, ...module02Questions.outputs, ...module03to06Questions.outputs, ...modQuiz.flatMap(m => m.outputs), ...expansionQuestions01to06.outputs, ...expansionQuestions07to15.outputs, ...expansion2Questions.outputs, ...expansion3Questions.outputs],
  debug: [...debugChallenges, ...module01Questions.debugs, ...module02Questions.debugs, ...module03to06Questions.debugs, ...modQuiz.flatMap(m => m.debugs), ...expansionQuestions01to06.debugs, ...expansionQuestions07to15.debugs, ...expansion2Questions.debugs, ...expansion3Questions.debugs],
  codeCompletion: [...codeCompletionQuestions, ...module01Questions.codeCompletions, ...module02Questions.codeCompletions, ...module03to06Questions.codeCompletions, ...modQuiz.flatMap(m => m.codeCompletions), ...expansionQuestions01to06.codeCompletions, ...expansionQuestions07to15.codeCompletions, ...expansion2Questions.codeCompletions, ...expansion3Questions.codeCompletions],
};

export function getQuestionsByModule(moduleId: string): {
  quiz: QuizQuestion[];
  scenario: ScenarioQuestion[];
  mistake: MistakeQuestion[];
  output: OutputQuestion[];
  debug: DebugChallenge[];
  codeCompletion: CodeCompletionQuestion[];
} {
  return {
    quiz: quizQuestions.filter(q => q.moduleId === moduleId),
    scenario: scenarioQuestions.filter(q =>
      q.relatedConcepts.some(c => c.toLowerCase().includes(moduleId.replace('module-', '')))
    ),
    mistake: mistakeQuestions.filter(q => q.lessonId?.startsWith(`lesson-${moduleId.replace('module-', '')}`)),
    output: outputQuestions.filter(q => q.lessonId?.startsWith(`lesson-${moduleId.replace('module-', '')}`)),
    debug: debugChallenges.filter(q =>
      q.topicTags.some(t => t.toLowerCase().includes(moduleId.replace('module-', '')))
    ),
    codeCompletion: codeCompletionQuestions.filter(q => q.lessonId?.startsWith(`lesson-${moduleId.replace('module-', '')}`)),
  };
}

export function getQuestionsByLesson(lessonId: string): {
  quiz: QuizQuestion[];
  scenario: ScenarioQuestion[];
  mistake: MistakeQuestion[];
  output: OutputQuestion[];
  debug: DebugChallenge[];
  codeCompletion: CodeCompletionQuestion[];
} {
  const prefix = lessonId.replace(/lesson-(\d+-\d+).*/, '$1');
  return {
    quiz: quizQuestions.filter(q => q.lessonId === lessonId),
    scenario: scenarioQuestions.filter(q =>
      q.relatedConcepts.some(c => c.toLowerCase().includes(prefix))
    ),
    mistake: mistakeQuestions.filter(q => q.lessonId === lessonId),
    output: outputQuestions.filter(q => q.lessonId === lessonId),
    debug: debugChallenges.filter(q =>
      q.topicTags.some(t => t.includes(prefix))
    ),
    codeCompletion: codeCompletionQuestions.filter(q => q.lessonId === lessonId),
  };
}

export function getQuestionsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): {
  quiz: QuizQuestion[];
  scenario: ScenarioQuestion[];
  mistake: MistakeQuestion[];
  output: OutputQuestion[];
  debug: DebugChallenge[];
  codeCompletion: CodeCompletionQuestion[];
} {
  return {
    quiz: quizQuestions.filter(q => q.difficulty === difficulty),
    scenario: scenarioQuestions.filter(q => q.difficulty === difficulty),
    mistake: mistakeQuestions.filter(q => q.difficulty === difficulty),
    output: outputQuestions.filter(q => q.difficulty === difficulty),
    debug: debugChallenges.filter(q => q.difficulty === difficulty),
    codeCompletion: codeCompletionQuestions.filter(q => q.difficulty === difficulty),
  };
}

export function searchQuestions(query: string): {
  quiz: QuizQuestion[];
  scenario: ScenarioQuestion[];
  mistake: MistakeQuestion[];
  output: OutputQuestion[];
  debug: DebugChallenge[];
  codeCompletion: CodeCompletionQuestion[];
} {
  const lower = query.toLowerCase();
  return {
    quiz: quizQuestions.filter(q =>
      q.question.toLowerCase().includes(lower) ||
      q.topicTags.some(t => t.toLowerCase().includes(lower))
    ),
    scenario: scenarioQuestions.filter(q =>
      q.scenario.toLowerCase().includes(lower) ||
      q.question.toLowerCase().includes(lower) ||
      q.relatedConcepts.some(c => c.toLowerCase().includes(lower))
    ),
    mistake: mistakeQuestions.filter(q =>
      q.title.toLowerCase().includes(lower) ||
      q.conceptTested.some(c => c.toLowerCase().includes(lower))
    ),
    output: outputQuestions.filter(q =>
      q.code.toLowerCase().includes(lower) ||
      q.conceptTested.some(c => c.toLowerCase().includes(lower))
    ),
    debug: debugChallenges.filter(q =>
      q.title.toLowerCase().includes(lower) ||
      q.topicTags.some(t => t.toLowerCase().includes(lower))
    ),
    codeCompletion: codeCompletionQuestions.filter(q =>
      q.codeTemplate.toLowerCase().includes(lower) ||
      q.conceptTested.some(c => c.toLowerCase().includes(lower))
    ),
  };
}
