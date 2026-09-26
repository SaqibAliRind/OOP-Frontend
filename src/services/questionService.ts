import type { QuizQuestion, DebugChallenge, PracticeQuestion, ScenarioQuestion, MistakeQuestion, OutputQuestion, CodeCompletionQuestion } from '@/types';
import { quizQuestions as allQuiz } from '@/data/questions/quizQuestions';
import { scenarioQuestions as allScenario } from '@/data/questions/scenarioQuestions';
import { mistakeQuestions as allMistake } from '@/data/questions/mistakeQuestions';
import { outputQuestions as allOutput } from '@/data/questions/outputQuestions';
import { debugChallenges as allDebug } from '@/data/questions/debugChallenges';
import { codeCompletionQuestions as allCodeCompletion } from '@/data/questions/codeCompletion';
import { module01Questions, module02Questions } from '@/data/questions/moduleActivities';
import { module03to06Questions } from '@/data/questions/module03to06Activities';

const allQuizMerged: QuizQuestion[] = [...allQuiz, ...module01Questions.quickChecks as QuizQuestion[], ...module02Questions.quickChecks as QuizQuestion[], ...module03to06Questions.quickChecks as QuizQuestion[]];
const allScenarioMerged: ScenarioQuestion[] = [...allScenario, ...module01Questions.scenarios, ...module02Questions.scenarios, ...module03to06Questions.scenarios];
const allMistakeMerged: MistakeQuestion[] = [...allMistake, ...module01Questions.mistakes, ...module02Questions.mistakes, ...module03to06Questions.mistakes];
const allOutputMerged: OutputQuestion[] = [...allOutput, ...module01Questions.outputs, ...module02Questions.outputs, ...module03to06Questions.outputs];
const allDebugMerged: DebugChallenge[] = [...allDebug, ...module01Questions.debugs, ...module02Questions.debugs, ...module03to06Questions.debugs];
const allCodeCompletionMerged: CodeCompletionQuestion[] = [...allCodeCompletion, ...module01Questions.codeCompletions, ...module02Questions.codeCompletions, ...module03to06Questions.codeCompletions];

const practiceQuestions: PracticeQuestion[] = [
  {
    id: 'pq-001',
    type: 'coding',
    title: 'Create a BankAccount Class',
    prompt: 'Create a BankAccount class with:\n- Private fields: accountNumber (String), balance (double), ownerName (String)\n- Constructor to initialize all fields\n- deposit(amount) method - adds to balance if amount > 0\n- withdraw(amount) method - subtracts if amount > 0 and <= balance\n- getBalance() method\n- toString() method showing account info',
    starterCode: `public class BankAccount {
    // TODO: Add fields

    // TODO: Add constructor

    // TODO: Add deposit method

    // TODO: Add withdraw method

    // TODO: Add getBalance method

    // TODO: Add toString method
}`,
    solution: `public class BankAccount {
    private String accountNumber;
    private double balance;
    private String ownerName;

    public BankAccount(String accountNumber, double balance, String ownerName) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.ownerName = ownerName;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;
    }

    public double getBalance() {
        return balance;
    }

    @Override
    public String toString() {
        return "BankAccount{accountNumber='" + accountNumber + "', balance=" + balance + ", ownerName='" + ownerName + "'}";
    }
}`,
    testCases: [
      { input: 'new BankAccount("ACC001", 1000, "Ahmed")', expectedOutput: 'BankAccount{accountNumber=\'ACC001\', balance=1000.0, ownerName=\'Ahmed\'}' },
      { input: 'account.deposit(500); account.getBalance()', expectedOutput: '1500.0' },
      { input: 'account.withdraw(200); account.getBalance()', expectedOutput: '1300.0' },
      { input: 'account.withdraw(2000)', expectedOutput: 'false (insufficient funds)' },
    ],
    difficulty: 'easy',
    topicTags: ['classes', 'constructors', 'methods', 'encapsulation'],
    xpReward: 100,
  },
];

export const questionService = {
  getQuizQuestions(topicTags?: string[]): QuizQuestion[] {
    if (!topicTags || topicTags.length === 0) return allQuizMerged;
    return allQuizMerged.filter(q => q.topicTags.some(tag => topicTags.includes(tag)));
  },

  getQuizQuestion(id: string): QuizQuestion | undefined {
    return allQuizMerged.find(q => q.id === id);
  },

  getQuizQuestionsByModule(moduleId: string): QuizQuestion[] {
    return allQuizMerged.filter(q => q.moduleId === moduleId);
  },

  getQuizQuestionsByLesson(lessonId: string): QuizQuestion[] {
    return allQuizMerged.filter(q => q.lessonId === lessonId);
  },

  getDebugChallenges(topicTags?: string[]): DebugChallenge[] {
    if (!topicTags || topicTags.length === 0) return allDebugMerged;
    return allDebugMerged.filter(d => d.topicTags.some(tag => topicTags.includes(tag)));
  },

  getDebugChallenge(id: string): DebugChallenge | undefined {
    return allDebugMerged.find(d => d.id === id);
  },

  getPracticeQuestions(topicTags?: string[]): PracticeQuestion[] {
    if (!topicTags || topicTags.length === 0) return practiceQuestions;
    return practiceQuestions.filter(p => p.topicTags.some(tag => topicTags.includes(tag)));
  },

  getPracticeQuestion(id: string): PracticeQuestion | undefined {
    return practiceQuestions.find(p => p.id === id);
  },

  getScenarioQuestions(topicTags?: string[]): ScenarioQuestion[] {
    if (!topicTags || topicTags.length === 0) return allScenarioMerged;
    return allScenarioMerged.filter(s => s.relatedConcepts.some(tag => topicTags.includes(tag)));
  },

  getScenarioQuestion(id: string): ScenarioQuestion | undefined {
    return allScenarioMerged.find(s => s.id === id);
  },

  getMistakeQuestions(lessonId?: string): MistakeQuestion[] {
    if (!lessonId) return allMistakeMerged;
    return allMistakeMerged.filter(q => q.lessonId === lessonId);
  },

  getMistakeQuestion(id: string): MistakeQuestion | undefined {
    return allMistakeMerged.find(q => q.id === id);
  },

  getOutputQuestions(lessonId?: string): OutputQuestion[] {
    if (!lessonId) return allOutputMerged;
    return allOutputMerged.filter(q => q.lessonId === lessonId);
  },

  getOutputQuestion(id: string): OutputQuestion | undefined {
    return allOutputMerged.find(q => q.id === id);
  },

  getCodeCompletionQuestions(lessonId?: string): CodeCompletionQuestion[] {
    if (!lessonId) return allCodeCompletionMerged;
    return allCodeCompletionMerged.filter(q => q.lessonId === lessonId);
  },

  getCodeCompletionQuestion(id: string): CodeCompletionQuestion | undefined {
    return allCodeCompletionMerged.find(q => q.id === id);
  },

  getAllQuestions(): {
    quiz: QuizQuestion[];
    scenario: ScenarioQuestion[];
    mistake: MistakeQuestion[];
    output: OutputQuestion[];
    debug: DebugChallenge[];
    codeCompletion: CodeCompletionQuestion[];
    practice: PracticeQuestion[];
  } {
    return {
      quiz: allQuizMerged,
      scenario: allScenarioMerged,
      mistake: allMistakeMerged,
      output: allOutputMerged,
      debug: allDebugMerged,
      codeCompletion: allCodeCompletionMerged,
      practice: practiceQuestions,
    };
  },
};
