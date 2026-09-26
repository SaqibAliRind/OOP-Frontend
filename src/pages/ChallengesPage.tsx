import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Bug, Target, Brain, Code2, ArrowRight, Clock, Zap, Shield, CheckCircle } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { questionService } from '@/services/questionService';
import { DebuggingLab } from '@/components/learning/DebuggingLab';
import { ScenarioChallengeUI } from '@/components/learning/ScenarioChallengeUI';
import { projectService } from '@/services/projectService';

const CHALLENGE_TYPES = [
  { id: 'daily', label: 'Daily Challenge', icon: Target, color: 'var(--color-accent-primary)', description: 'Fresh challenge updated daily' },
  { id: 'module', label: 'Module Challenge', icon: Code2, color: 'var(--color-accent-secondary)', description: 'Test your module knowledge' },
  { id: 'debug', label: 'Debug Challenge', icon: Bug, color: 'var(--color-accent-error)', description: 'Find and fix the bugs' },
  { id: 'scenario', label: 'Scenario Challenge', icon: Brain, color: 'var(--color-accent-warning)', description: 'Real-world OOP problems' },
  { id: 'boss', label: 'Boss Challenge', icon: Shield, color: 'var(--color-xp-gold)', description: 'Ultimate integrated challenge' },
];

export function ChallengesPage() {
  const [activeType, setActiveType] = useState('daily');
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);
  const navigate = useNavigate();

  const debugChallenges = questionService.getDebugChallenges();
  const scenarioQuestions = questionService.getScenarioQuestions();
  const bossChallenges = projectService.listBosses();

  if (activeChallenge) {
    const debug = debugChallenges.find(d => d.id === activeChallenge);
    if (debug) {
      return (
        <div className="max-w-3xl mx-auto space-y-6">
          <Button variant="ghost" onClick={() => setActiveChallenge(null)} className="gap-1">← Back</Button>
          <DebuggingLab challenge={debug} onComplete={() => setActiveChallenge(null)} />
        </div>
      );
    }
    const scenario = scenarioQuestions.find(s => s.id === activeChallenge);
    if (scenario) {
      return (
        <div className="max-w-3xl mx-auto space-y-6">
          <Button variant="ghost" onClick={() => setActiveChallenge(null)} className="gap-1">← Back</Button>
          <ScenarioChallengeUI question={scenario} />
        </div>
      );
    }
  }

  if (activeType === 'boss') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => setActiveType('daily')} className="gap-1">← Back</Button>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-[var(--color-xp-gold)]" />
            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Final Boss Challenges</h2>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Five ultimate bosses test integrated OOP design. Defeat each for +150 XP.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {bossChallenges.map((boss, i) => {
            const progress = projectService.getBossProgress(boss.id);
            return (
              <motion.div
                key={boss.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  variant="elevated"
                  padding="lg"
                  className="space-y-3 cursor-pointer hover:border-[var(--color-xp-gold)]/50 transition-all hover:translate-y-[-2px]"
                  onClick={() => navigate(`/boss/${boss.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-xp-gold)]/10 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-[var(--color-xp-gold)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[var(--color-text-primary)]">{boss.title}</h3>
                      <p className="text-xs text-[var(--color-text-tertiary)]">{boss.objectives.length} objectives</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[var(--color-text-tertiary)]" />
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2">{boss.briefing}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={boss.difficulty === 'expert' ? 'error' : 'warning'} size="sm">
                      {boss.difficulty}
                    </Badge>
                    <Badge variant="xp" size="sm">+{boss.xpReward} XP</Badge>
                    {boss.conceptsTested.map(c => (
                      <Badge key={c} variant="outline" size="sm">{c}</Badge>
                    ))}
                    {progress.completed && (
                      <Badge variant="success" size="sm">
                        <CheckCircle className="w-3 h-3" /> Defeated
                      </Badge>
                    )}
                    {!progress.completed && progress.completedObjectives.length > 0 && (
                      <Badge variant="primary" size="sm">
                        {progress.completedObjectives.length}/{boss.objectives.length}
                      </Badge>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)] p-4">
          <p className="text-xs text-[var(--color-text-tertiary)]">
            Also explore the Project Simulator for 9-stage real-world projects →
          </p>
          <Button variant="outline" size="sm" className="mt-2" onClick={() => navigate('/projects')}>
            <Zap className="w-3.5 h-3.5" />
            Open Project Simulator
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Challenge Center</h1>
        <p className="text-[var(--color-text-secondary)] mt-1">Push your limits with advanced challenges.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CHALLENGE_TYPES.map((type, i) => {
          const Icon = type.icon;
          return (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                variant="default"
                padding="lg"
                className="cursor-pointer hover:border-[var(--color-accent-primary)]/50 transition-all hover:translate-y-[-2px]"
                onClick={() => setActiveType(type.id)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${type.color}15` }}>
                    <Icon className="w-5 h-5" style={{ color: type.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text-primary)]">{type.label}</h3>
                    <p className="text-xs text-[var(--color-text-tertiary)]">{type.description}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[var(--color-text-tertiary)] ml-auto" />
              </Card>
            </motion.div>
          );
        })}
      </div>

      {activeType !== 'boss' && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
            {CHALLENGE_TYPES.find(t => t.id === activeType)?.label}
          </h2>

          {activeType === 'debug' && (
            <div className="space-y-3">
              {debugChallenges.map((challenge, i) => (
                <motion.div key={challenge.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card
                    variant="default"
                    padding="md"
                    className="cursor-pointer hover:border-[var(--color-accent-error)]/50 transition-colors"
                    onClick={() => setActiveChallenge(challenge.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[var(--color-text-primary)]">{challenge.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={challenge.difficulty} size="sm">{challenge.difficulty}</Badge>
                          {challenge.timeLimit && (
                            <span className="flex items-center gap-1 text-xs text-[var(--color-text-tertiary)]">
                              <Clock className="w-3 h-3" /> {Math.floor(challenge.timeLimit / 60)}m
                            </span>
                          )}
                          <span className="flex items-center gap-1 text-xs text-[var(--color-xp-gold)]">
                            <Zap className="w-3 h-3" /> +{challenge.xpReward} XP
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[var(--color-text-tertiary)]" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {activeType === 'scenario' && (
            <div className="space-y-3">
              {scenarioQuestions.map((sq, i) => (
                <motion.div key={sq.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card
                    variant="default"
                    padding="md"
                    className="cursor-pointer hover:border-[var(--color-accent-secondary)]/50 transition-colors"
                    onClick={() => setActiveChallenge(sq.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[var(--color-text-primary)]">{sq.question}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={sq.difficulty} size="sm">{sq.difficulty}</Badge>
                          <Badge variant="outline" size="sm">{sq.type}</Badge>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[var(--color-text-tertiary)]" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {(activeType === 'daily' || activeType === 'module') && (
            <div className="space-y-3">
              {[...debugChallenges.slice(0, 3), ...scenarioQuestions.slice(0, 3)].map((q: any, i) => (
                <motion.div key={q.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card
                    variant="default"
                    padding="md"
                    className="cursor-pointer hover:border-[var(--color-accent-primary)]/50 transition-colors"
                    onClick={() => setActiveChallenge(q.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[var(--color-text-primary)]">{q.title || q.question}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={q.difficulty} size="sm">{q.difficulty}</Badge>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[var(--color-text-tertiary)]" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
