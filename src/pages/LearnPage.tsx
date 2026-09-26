import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Target,
  Box,
  Trophy,
  Bug,
  BarChart2,
  Award,
  Layers,
  Clock,
  CheckCircle,
  ChevronRight,
  GraduationCap,
  Brain,
  Rocket,
} from 'lucide-react';
import { Button, Card, Badge, ProgressBar, ProgressRing, LucideIcon } from '@/components/ui';
import { curriculumService } from '@/services/curriculumService';
import { progressService } from '@/services/progressService';
import { staggerChildren, slideUp } from '@/utils/motion';
import { motion as fm } from 'framer-motion';

const progress = progressService.getProgress();
const curriculum = curriculumService.getCurriculum();

const learningPaths = [
  {
    id: 'foundation',
    icon: GraduationCap,
    title: 'OOP Fundamentals',
    description: 'Modules 1-5: Foundation to Inheritance',
    modules: 5,
    duration: '9h',
    difficulty: 'Beginner',
    color: '#3b82f6',
  },
  {
    id: 'core',
    icon: Brain,
    title: 'Core OOP Mastery',
    description: 'Modules 6-8, 13-14: Polymorphism to Design Principles',
    modules: 5,
    duration: '10.5h',
    difficulty: 'Intermediate',
    color: '#8b5cf6',
  },
  {
    id: 'advanced',
    icon: Rocket,
    title: 'Advanced Java OOP',
    description: 'Modules 9-12, 15: Modern Java to Capstone',
    modules: 5,
    duration: '9.5h',
    difficulty: 'Advanced',
    color: '#f59e0b',
  },
];

export function LearnPage() {
  const totalProgress = curriculumService.getTotalProgress(progress);

  return (
    <div className="space-y-8">
      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card variant="elevated" padding="lg" className="card-glow-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-wider">Progress</p>
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mt-1">{totalProgress}%</h3>
            </div>
            <ProgressRing value={totalProgress} size={56} strokeWidth={4} variant="xp" />
          </div>
        </Card>

        <Card variant="elevated" padding="lg" className="card-glow-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-wider">Level</p>
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mt-1">{progress.level}</h3>
            </div>
            <div className="text-right">
              <p className="text-sm text-[var(--color-xp-gold)] font-medium font-mono">{progress.totalXp} XP</p>
              <ProgressBar value={progress.totalXp} max={progress.totalXp + progress.xpToNextLevel} size="sm" variant="xp" className="w-28 mt-1" />
            </div>
          </div>
        </Card>

        <Card variant="elevated" padding="lg" className="card-glow-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-wider">Lessons</p>
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mt-1">{Object.keys(progress.completedLessons).length}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-success)]/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-[var(--color-accent-success)]" />
            </div>
          </div>
        </Card>

        <Card variant="elevated" padding="lg" className="card-glow-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-wider">Streak</p>
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mt-1">{progress.currentStreak}</h3>
            </div>
            <div className="text-right">
              <p className="text-xs text-[var(--color-accent-warning)] font-medium">Best: {progress.longestStreak}d</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Continue Learning */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)]">Continue Learning</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">Pick up where you left off</p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/curriculum">View All</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {curriculum.modules.slice(0, 3).map((module, index) => {
            const moduleProgress = curriculumService.getModuleProgress(module.id, progress);
            const nextLesson = module.lessons.find(l => !progress.completedLessons[l.id]);

            return (
              <motion.div key={module.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
                <Link to={nextLesson ? `/lesson/${nextLesson.id}` : `/module/${module.id}`}>
                  <Card variant="outlined" padding="lg" className="h-full group card-glow-hover">
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${module.color}12` }}
                      >
                        <LucideIcon icon={module.icon} className="w-5 h-5" style={{ color: module.color }} />
                      </div>
                      <Badge variant={moduleProgress === 100 ? 'success' : moduleProgress > 0 ? 'primary' : 'outline'} size="sm">
                        {moduleProgress === 100 ? 'Completed' : moduleProgress > 0 ? 'In Progress' : 'Not Started'}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">{module.title}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-3 line-clamp-2">{module.description}</p>
                    <ProgressBar value={moduleProgress} max={100} size="sm" variant="primary" className="mb-3" />
                    <div className="flex items-center justify-between text-xs text-[var(--color-text-tertiary)]">
                      <span>{moduleProgress}% complete</span>
                      {nextLesson && (
                        <span className="flex items-center gap-1 text-[var(--color-accent-primary)]">
                          Next: {nextLesson.title}
                          <ChevronRight className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Learning Paths */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-5">Learning Paths</h2>
        <fm.div variants={staggerChildren(0.08)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-4">
          {learningPaths.map((path) => (
            <fm.div key={path.id} variants={slideUp}>
              <Card variant="elevated" padding="lg" className="h-full card-glow-hover">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${path.color}12` }}
                >
                  <LucideIcon icon={path.icon} className="w-5 h-5" style={{ color: path.color }} />
                </div>
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">{path.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">{path.description}</p>
                <div className="flex items-center gap-3 text-xs text-[var(--color-text-tertiary)] mb-4">
                  <span className="flex items-center gap-1"><Layers className="w-3 h-3" /> {path.modules} modules</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {path.duration}</span>
                </div>
                <Badge variant="outline" size="sm" className="mb-4">{path.difficulty}</Badge>
                <Button variant="primary" size="sm" className="w-full" asChild>
                  <Link to="/curriculum">Start Path</Link>
                </Button>
              </Card>
            </fm.div>
          ))}
        </fm.div>
      </motion.section>

      {/* Practice Areas */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-5">Practice Areas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { icon: Target, title: 'Practice Center', href: '/practice', desc: 'Coding exercises, quizzes, and scenarios', color: '#3b82f6' },
            { icon: Box, title: '3D Lab', href: '/3d', desc: 'Immersive visualizations', color: '#6366f1' },
            { icon: Trophy, title: 'Challenges', href: '/challenges', desc: 'Boss questions and timed challenges', color: '#8b5cf6' },
            { icon: Bug, title: 'Debug Lab', href: '/debug', desc: 'Find and fix real bugs', color: '#ef4444' },
            { icon: Award, title: 'Quiz Center', href: '/quiz', desc: 'Test your knowledge', color: '#10b981' },
            { icon: BarChart2, title: 'Progress', href: '/progress', desc: 'Track mastery and streaks', color: '#f59e0b' },
          ].map((area, index) => (
            <motion.div key={area.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
              <Link to={area.href}>
                <Card variant="outlined" padding="md" className="h-full group card-glow-hover">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${area.color}12` }}
                    >
                      <LucideIcon icon={area.icon} className="w-4.5 h-4.5" style={{ color: area.color }} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors">{area.title}</h3>
                      <p className="text-xs text-[var(--color-text-tertiary)] truncate">{area.desc}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
