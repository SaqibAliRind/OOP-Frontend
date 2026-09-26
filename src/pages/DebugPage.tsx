import { motion } from 'framer-motion';
import { useState } from 'react';
import { Bug, Clock, Star, CheckCircle, Code2, Terminal, Search, Play, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/helpers';
import { Card, Badge, Button, Tabs, ProgressRing } from '@/components/ui';
import { questionService } from '@/services/questionService';
import { progressService } from '@/services/progressService';
import { DebuggingLab } from '@/components/learning/DebuggingLab';
import { staggerChildren, slideUp } from '@/utils/motion';
import { motion as fm } from 'framer-motion';

const debugChallenges = questionService.getDebugChallenges();

export function DebugPage() {
  const [activeChallengeId, setActiveChallengeId] = useState<string | null>(null);
  const [progressVersion, setProgressVersion] = useState(0);
  const progress = progressService.getProgress();

  const activeChallenge = activeChallengeId
    ? debugChallenges.find(d => d.id === activeChallengeId)
    : undefined;

  if (activeChallenge) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => { setActiveChallengeId(null); setProgressVersion(v => v + 1); }} className="gap-1">
          ← Back to Challenges
        </Button>
        <DebuggingLab
          key={`${activeChallenge.id}-${progressVersion}`}
          challenge={activeChallenge}
          onComplete={() => setProgressVersion(v => v + 1)}
        />
      </div>
    );
  }

  const tabs = [
    { id: 'all', label: 'All Challenges', icon: Bug },
    { id: 'unsolved', label: 'Unsolved', icon: Search },
    { id: 'solved', label: 'Solved', icon: CheckCircle },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <Badge variant="primary" size="md" className="mb-3">Debug Lab</Badge>
            <h1 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">Debug Challenges</h1>
            <p className="text-[var(--color-text-secondary)] mt-1">Find and fix real bugs in Java code</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-[var(--color-text-tertiary)]">
            <span className="flex items-center gap-1.5">
              <Bug className="w-4 h-4" />
              {debugChallenges.filter(d => progress.debugChallengeScores[d.id]?.solved).length}/{debugChallenges.length} solved
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-[var(--color-xp-gold)]" />
              {debugChallenges.reduce((sum, d) => sum + d.xpReward, 0)} XP
            </span>
            <Link
              to="/assistant"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)]/20 transition-colors"
            >
              <MessageSquare className="w-3 h-3" />
              Ask Assistant
            </Link>
          </div>
        </div>
      </motion.div>

      <Tabs key={progressVersion} tabs={tabs} variant="pills">
        {(tabId) => (
          <fm.div variants={staggerChildren(0.06)} initial="hidden" animate="visible" className="mt-6 space-y-3">
            {debugChallenges
              .filter(d => {
                const score = progress.debugChallengeScores[d.id];
                if (tabId === 'unsolved') return !score?.solved;
                if (tabId === 'solved') return score?.solved;
                return true;
              })
              .map((challenge) => (
                <fm.div key={challenge.id} variants={slideUp}>
                  <Card
                    variant="outlined"
                    padding="lg"
                    className={cn(
                      'group card-glow-hover',
                      progress.debugChallengeScores[challenge.id]?.solved
                        ? 'border-[var(--color-accent-success)]/30 bg-[var(--color-accent-success)]/5'
                        : ''
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={challenge.difficulty} size="sm">{challenge.difficulty.toUpperCase()}</Badge>
                          <Badge variant="xp" size="sm">+{challenge.xpReward} XP</Badge>
                          {progress.debugChallengeScores[challenge.id]?.solved && <Badge variant="success" size="sm">Solved</Badge>}
                          {challenge.timeLimit && (
                            <Badge variant="outline" size="sm">
                              <Clock className="w-3 h-3 mr-1" />
                              {Math.floor(challenge.timeLimit / 60)} min
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1.5">{challenge.title}</h3>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-3">{challenge.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          <span className="flex items-center gap-1 text-xs text-[var(--color-text-tertiary)]">
                            <Code2 className="w-3 h-3" /> Java
                          </span>
                          <span className="flex items-center gap-1 text-xs text-[var(--color-text-tertiary)]">
                            <Terminal className="w-3 h-3" /> Debug
                          </span>
                          {challenge.topicTags.map(tag => (
                            <Badge key={tag} variant="outline" size="sm" className="text-[10px]">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <ProgressRing value={progress.debugChallengeScores[challenge.id]?.solved ? 100 : 0} size={52} strokeWidth={3} variant={progress.debugChallengeScores[challenge.id]?.solved ? 'success' : 'primary'} showValue />
                        <Button
                          variant={progress.debugChallengeScores[challenge.id]?.solved ? 'success' : 'primary'}
                          size="sm"
                          className="gap-1.5"
                          onClick={() => setActiveChallengeId(challenge.id)}
                        >
                          <Play className="w-3.5 h-3.5" />
                          {progress.debugChallengeScores[challenge.id]?.solved ? 'Solved' : 'Debug'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </fm.div>
              ))}
          </fm.div>
        )}
      </Tabs>
    </div>
  );
}
