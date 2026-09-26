import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Bug, Target, Code2, Brain, AlertTriangle, ArrowRight, Layers, Award } from 'lucide-react';
import { Card, Badge, Button, Input, Tabs } from '@/components/ui';
import { questionService } from '@/services/questionService';
import { MistakeQuestionUI } from '@/components/learning/MistakeQuestionUI';
import { OutputQuestionUI } from '@/components/learning/OutputQuestionUI';
import { CodeCompletionUI } from '@/components/learning/CodeCompletionUI';
import { DebuggingLab } from '@/components/learning/DebuggingLab';
import { ScenarioChallengeUI } from '@/components/learning/ScenarioChallengeUI';

const CATEGORIES = [
  { id: 'all', label: 'All Questions', icon: Target },
  { id: 'concept', label: 'Concept Practice', icon: BookOpen },
  { id: 'scenario', label: 'Scenario Practice', icon: Brain },
  { id: 'mistake', label: 'Mistake Practice', icon: AlertTriangle },
  { id: 'debug', label: 'Debugging', icon: Bug },
  { id: 'output', label: 'Output Prediction', icon: Code2 },
  { id: 'code-completion', label: 'Code Completion', icon: Code2 },
];

const DIFFICULTIES = ['all', 'easy', 'medium', 'hard'] as const;

export function PracticePage() {
  const [activeCategory] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePracticeId, setActivePracticeId] = useState<string | null>(null);

  const allQuestions = useMemo(() => {
    const quiz = questionService.getQuizQuestions();
    const scenarios = questionService.getScenarioQuestions();
    const mistakes = questionService.getMistakeQuestions();
    const outputs = questionService.getOutputQuestions();
    const debugs = questionService.getDebugChallenges();
    const completions = questionService.getCodeCompletionQuestions();

    return [
      ...quiz.map(q => ({ ...q, category: 'concept', type: 'quiz' as const })),
      ...scenarios.map(q => ({ ...q, category: 'scenario', type: 'scenario' as const })),
      ...mistakes.map(q => ({ ...q, category: 'mistake', type: 'mistake' as const, question: q.title })),
      ...outputs.map(q => ({ ...q, category: 'output', type: 'output' as const, question: `Predict output for code` })),
      ...debugs.map(q => ({ ...q, category: 'debug', type: 'debug' as const, question: q.title })),
      ...completions.map(q => ({ ...q, category: 'code-completion', type: 'code-completion' as const, question: 'Complete the code' })),
    ];
  }, []);

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter(q => {
      if (activeCategory !== 'all' && q.category !== activeCategory) return false;
      if (difficultyFilter !== 'all' && q.difficulty !== difficultyFilter) return false;
      if (searchQuery && !q.question.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [allQuestions, activeCategory, difficultyFilter, searchQuery]);

  if (activePracticeId) {
    const q = allQuestions.find(q => q.id === activePracticeId);
    if (!q) return null;

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => setActivePracticeId(null)} className="gap-1">
          ← Back to Practice
        </Button>
        {q.type === 'mistake' && <MistakeQuestionUI question={q as any} />}
        {q.type === 'output' && <OutputQuestionUI question={q as any} />}
        {q.type === 'code-completion' && <CodeCompletionUI question={q as any} />}
        {q.type === 'debug' && <DebuggingLab challenge={q as any} />}
        {q.type === 'scenario' && <ScenarioChallengeUI question={q as any} />}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Practice Center</h1>
        <p className="text-[var(--color-text-secondary)] mt-1">Sharpen your OOP skills with targeted practice.</p>
        <div className="flex gap-3 mt-3">
          <Link to="/curriculum" className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-primary)] flex items-center gap-1 transition-colors">
            <Layers className="w-3 h-3" /> Curriculum
          </Link>
          <Link to="/quiz" className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-primary)] flex items-center gap-1 transition-colors">
            <Award className="w-3 h-3" /> Quiz Center
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search questions..."
          className="flex-1"
        />
        <div className="flex gap-2">
          {DIFFICULTIES.map(d => (
            <Button
              key={d}
              variant={difficultyFilter === d ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setDifficultyFilter(d)}
            >
              {d === 'all' ? 'All' : d.charAt(0).toUpperCase() + d.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <Tabs
        tabs={CATEGORIES.map(c => ({ id: c.id, label: c.label, icon: c.icon }))}
        defaultTab="all"
        variant="pills"
      >
        {(_tabId) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4"
          >
            {filteredQuestions.map((q, i) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Card
                  variant="default"
                  padding="md"
                  className="cursor-pointer hover:border-[var(--color-accent-primary)]/50 transition-colors"
                  onClick={() => setActivePracticeId(q.id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[var(--color-text-primary)] text-sm truncate">{q.question}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={q.difficulty} size="sm">{q.difficulty}</Badge>
                        <Badge variant="outline" size="sm">{q.category}</Badge>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[var(--color-text-tertiary)] flex-shrink-0" />
                  </div>
                </Card>
              </motion.div>
            ))}
            {filteredQuestions.length === 0 && (
              <div className="col-span-full text-center py-12">
                <Target className="w-12 h-12 mx-auto mb-4 text-[var(--color-text-tertiary)]" />
                <p className="text-[var(--color-text-secondary)]">No questions match your filters.</p>
              </div>
            )}
          </motion.div>
        )}
      </Tabs>
    </div>
  );
}
