import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap,
  Flame,
  BookOpen,
  Target,
  Box,
  ArrowRight,
  Star,
  Code2,
  GraduationCap,
  Rocket,
  Shield,
  GitBranch,
  Shapes,
  Filter,
  Clock,
  Bug,
  Award,
  Play,
  ChevronRight,
  Lock,
  MessageSquare,
  Network,
} from 'lucide-react';
import { cn, formatDuration } from '@/utils/helpers';
import { Button, Card, Badge, ProgressRing, LucideIcon, FeedbackForm } from '@/components/ui';
import { curriculumService } from '@/services/curriculumService';
import { progressService } from '@/services/progressService';
import { gamificationService } from '@/services/gamificationService';
import { staggerChildren, slideUp } from '@/utils/motion';
import { motion as fm } from 'framer-motion';

const modules = curriculumService.getCurriculum().modules;
const progress = progressService.getProgress();
const nextAction = progressService.getNextBestAction();
const dailyGoal = gamificationService.getDailyGoal();
const currentCourse = curriculumService.getCurrentCourseId();

const features = [
  {
    icon: BookOpen,
    title: 'University-Level Curriculum',
    description: '15 comprehensive modules covering every OOP concept from basics to advanced design patterns.',
    color: '#3b82f6',
  },
  {
    icon: Box,
    title: 'Immersive 3D Visualizations',
    description: 'Watch classes become objects, inheritance form hierarchies, and polymorphism in action.',
    color: '#6366f1',
  },
  {
    icon: Code2,
    title: 'Interactive Coding Labs',
    description: 'Write, run, and debug Java code directly in the browser with instant feedback.',
    color: '#8b5cf6',
  },
  {
    icon: Bug,
    title: 'Debugging Challenges',
    description: 'Real-world bugs to find and fix. Learn to read stack traces and reason about code.',
    color: '#ef4444',
  },
  {
    icon: Target,
    title: 'Scenario-Based Learning',
    description: 'Apply concepts to realistic problems. Not just syntax - learn when and why to use each pattern.',
    color: '#f59e0b',
  },
  {
    icon: Award,
    title: 'Gamified Progression',
    description: 'XP, levels, streaks, and achievements. Track mastery across every concept.',
    color: '#10b981',
  },
];

const pillars = [
  { icon: Shield, title: 'Encapsulation', description: 'Secure data with controlled access. Private fields, public interfaces.', color: '#10b981', module: 'module-04' },
  { icon: GitBranch, title: 'Inheritance', description: 'Build hierarchies. Reuse and extend. IS-A relationships done right.', color: '#f59e0b', module: 'module-05' },
  { icon: Shapes, title: 'Polymorphism', description: 'One interface, many implementations. Dynamic dispatch at runtime.', color: '#ef4444', module: 'module-06' },
  { icon: Filter, title: 'Abstraction', description: 'Hide complexity. Define contracts. Focus on what, not how.', color: '#06b6d4', module: 'module-07' },
];

const codeLines = [
  'public class Student {',
  '    private String name;',
  '    private int age;',
  '',
  '    public Student(String name, int age) {',
  '        this.name = name;',
  '        this.age = age;',
  '    }',
  '',
  '    public void study() {',
  '        System.out.println(name + " is studying!");',
  '    }',
  '}',
];

function AnimatedCodePanel() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines(prev => {
        if (prev >= codeLines.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 120);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-xl border border-[var(--color-border-primary)] overflow-hidden bg-[var(--color-bg-input)] shadow-[var(--shadow-xl)]">
      {/* Title Bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)]">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[var(--color-accent-error)]/60" />
          <div className="w-3 h-3 rounded-full bg-[var(--color-accent-warning)]/60" />
          <div className="w-3 h-3 rounded-full bg-[var(--color-accent-success)]/60" />
        </div>
        <span className="text-xs font-mono text-[var(--color-text-tertiary)] ml-2">Student.java</span>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[10px] font-mono text-[var(--color-text-tertiary)]">Java 17</span>
          <Play className="w-3.5 h-3.5 text-[var(--color-accent-success)]" />
        </div>
      </div>
      {/* Code Content */}
      <div className="p-4 font-mono text-sm leading-relaxed min-h-[280px]">
        {codeLines.map((line, i) => (
          <div
            key={i}
            className={cn(
              'flex transition-opacity duration-300',
              i < visibleLines ? 'opacity-100' : 'opacity-0'
            )}
          >
            <span className="w-8 text-right pr-3 text-[var(--color-text-tertiary)] select-none shrink-0">
              {i + 1}
            </span>
            <span className="flex-1">
              {highlightLine(line)}
            </span>
          </div>
        ))}
        {visibleLines < codeLines.length && (
          <div className="flex">
            <span className="w-8 text-right pr-3 text-[var(--color-text-tertiary)] select-none shrink-0">
              {visibleLines + 1}
            </span>
            <span className="typing-cursor" />
          </div>
        )}
      </div>
      {/* Terminal Output */}
      <div className="border-t border-[var(--color-border-primary)] bg-[var(--color-bg-primary)]/40 px-4 py-2.5">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[var(--color-accent-success)]">{'>'}</span>
          <span className="text-[var(--color-text-secondary)]">
            {visibleLines >= codeLines.length ? 'Ready. Press Run to execute.' : 'Compiling...'}
          </span>
        </div>
      </div>
    </div>
  );
}

function highlightLine(line: string) {
  if (!line) return <br />;
  const keywords = /\b(public|class|private|void|new|this|int|return|static|final)\b/g;
  const types = /\b(String|System|Student)\b/g;
  const strings = /(".*?")/g;
  const methods = /\b(study|println|out)\b/g;

  let result = line
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  result = result
    .replace(strings, '<span class="text-green-400">$1</span>')
    .replace(keywords, '<span class="text-purple-400 font-medium">$1</span>')
    .replace(types, '<span class="text-blue-400">$1</span>')
    .replace(methods, '<span class="text-yellow-300">$1</span>');

  return <span dangerouslySetInnerHTML={{ __html: result }} />;
}

export function HomePage() {
  const totalProgress = curriculumService.getTotalProgress(progress);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-primary)]/10 via-transparent to-[var(--color-accent-secondary)]/10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
        
        {/* Glowing Nebula Effect */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.15),transparent_70%)] animate-pulse" style={{ animationDuration: '4s' }} />
        
        {/* Floating Stars for Kids / Universe theme */}
        <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="absolute top-[15%] left-[10%] text-[var(--color-xp-gold)] opacity-70">
          <Star className="w-8 h-8 fill-current" />
        </motion.div>
        <motion.div animate={{ y: [0, 30, 0], rotate: [0, -15, 10, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} className="absolute top-[25%] right-[15%] text-[var(--color-accent-info)] opacity-60">
          <Rocket className="w-10 h-10" />
        </motion.div>
        <motion.div animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute bottom-[20%] left-[20%] text-[var(--color-accent-secondary)] opacity-50">
          <Box className="w-12 h-12" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-primary)]/12 border border-[var(--color-accent-primary)]/25 text-[var(--color-accent-primary)] text-sm font-medium mb-6"
              >
                <Zap className="w-4 h-4" />
                <span>
                  {currentCourse === 'c' ? 'Interactive C Language Platform & Compiler' : 
                   currentCourse === 'java' ? 'Java Fundamentals Platform & Compiler' : 
                   'Interactive OOP Platform & Compiler'}
                </span>
              </motion.div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-[var(--color-text-primary)] mb-5 leading-[1.1]">
                Explore {currentCourse === 'c' ? 'C Lang.' : currentCourse === 'java' ? 'Java.' : 'OOP.'}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-info)] to-[var(--color-accent-primary)]">
                  Code Universe.
                </span>{' '}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-xp-gold)] to-[var(--color-accent-warning)]">
                  Level Up Your Skills.
                </span>
              </h1>

              <p className="text-lg text-[var(--color-text-secondary)] max-w-lg mb-8 leading-relaxed">
                Welcome to the {currentCourse === 'c' ? 'C Programming Universe' : currentCourse === 'java' ? 'Java Basics Universe' : 'OOP Universe'}! 🚀 Learn anywhere, solve scenario-based questions, debug mistakes, and use our built-in compiler to write real code.
              </p>

              {/* Mission Card */}
              {progress.currentStreak > 0 && nextAction && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8 p-4 rounded-xl border border-[var(--color-accent-primary)]/20 bg-[var(--color-accent-primary)]/5"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Target className="w-4 h-4 text-[var(--color-accent-primary)]" />
                    <span className="text-[10px] tracking-[0.15em] font-semibold text-[var(--color-accent-primary)] uppercase">
                      {nextAction.type === 'continue' ? 'Continue Learning' : nextAction.type === 'practice' ? 'Practice Needed' : 'Current Mission'}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-text-primary)] font-medium">
                    {nextAction.title}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {progress.currentStreak} day streak  ·  Level {progress.level}  ·  {progress.totalXp} XP earned
                    </p>
                    <Link to={nextAction.link}>
                      <Button variant="primary" size="sm" className="text-xs gap-1">
                        {nextAction.action} <ArrowRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                  {dailyGoal.completed < dailyGoal.total && (
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[var(--color-accent-primary)]/10">
                      <div className="flex-1">
                        <div className="h-1.5 bg-[var(--color-bg-input)] rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-[var(--color-accent-success)]" style={{ width: `${(dailyGoal.completed / dailyGoal.total) * 100}%` }} />
                        </div>
                      </div>
                      <span className="text-[10px] text-[var(--color-text-tertiary)]">{dailyGoal.completed}/{dailyGoal.total} today</span>
                    </div>
                  )}
                </motion.div>
              )}

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Button size="lg" asChild className="group shadow-glow hover:shadow-glow-accent transition-shadow">
                  <Link to="/learn">
                    <Rocket className="w-5 h-5 mr-2 animate-bounce" />
                    Launch Mission
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="hover:border-[var(--color-accent-info)] hover:text-[var(--color-accent-info)] transition-colors">
                  <Link to="/3d">
                    <Box className="w-5 h-5 mr-2" />
                    Enter 3D Lab
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-8 flex items-center gap-6 text-sm text-[var(--color-text-tertiary)]">
                <div className="flex items-center gap-2">
                  <ProgressRing value={totalProgress} size={40} strokeWidth={3} variant="xp" showValue />
                  <span>{totalProgress}% complete</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[var(--color-xp-gold)]" />
                  <span>Lv.{progress.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[var(--color-accent-warning)]" />
                  <span>{progress.currentStreak} day streak</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Animated Code Panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden lg:block"
            >
              <AnimatedCodePanel />
            </motion.div>
          </div>
          
          {/* Mobile Feedback Form inline on HomePage */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex justify-center w-full relative z-20 px-4 lg:hidden"
          >
            <FeedbackForm />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-y border-[var(--color-border-primary)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <Badge variant="primary" size="md" className="mb-4">Why OOP Universe?</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
              Built for Serious Learners
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Not a tutorial site. Not a game. A professional learning laboratory designed for university students.
            </p>
          </motion.div>

          <fm.div
            variants={staggerChildren(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features.map((feature) => (
              <fm.div key={feature.title} variants={slideUp}>
                <Card variant="elevated" padding="lg" className="h-full group card-glow-hover">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${feature.color}12` }}
                  >
                    <LucideIcon icon={feature.icon} className="w-5.5 h-5.5" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{feature.description}</p>
                </Card>
              </fm.div>
            ))}
          </fm.div>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <Badge variant="secondary" size="md" className="mb-4">The Four Pillars</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
              Master the Fundamentals
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Every OOP concept builds on these four pillars. Our 3D lab brings each to life.
            </p>
          </motion.div>

          <fm.div
            variants={staggerChildren(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {pillars.map((pillar) => (
              <fm.div key={pillar.title} variants={slideUp}>
                <Link to={`/module/${pillar.module}`}>
                  <Card
                    variant="outlined"
                    padding="lg"
                    className={cn(
                      'h-full border-l-4 group relative overflow-hidden',
                      'hover:shadow-[var(--shadow-lg)] transition-all duration-300'
                    )}
                    style={{ borderLeftColor: pillar.color }}
                  >
                    {/* Glow effect on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${pillar.color}08, transparent 70%)`,
                      }}
                    />
                    <div className="relative z-10">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${pillar.color}15` }}
                      >
                        <LucideIcon icon={pillar.icon} className="w-6 h-6" style={{ color: pillar.color }} />
                      </div>
                      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">{pillar.title}</h3>
                      <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">{pillar.description}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all" style={{ color: pillar.color }}>
                        Explore
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Card>
                </Link>
              </fm.div>
            ))}
          </fm.div>
        </div>
      </section>

      {/* Learning Journey */}
      <section className="py-20 border-y border-[var(--color-border-primary)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <Badge variant="secondary" size="md" className="mb-4">Your Learning Path</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
              15 Modules. Complete Mastery.
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Progress from fundamentals to advanced design patterns. Each module unlocks the next.
            </p>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical connector line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[var(--color-border-primary)]" aria-hidden="true" />

            <div className="space-y-2">
              {modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link
                    to={`/module/${module.id}`}
                    className={cn(
                      'relative flex items-center gap-4 pl-3 pr-4 py-3 rounded-xl transition-all group',
                      'hover:bg-[var(--color-bg-card)] hover:shadow-[var(--shadow-md)]',
                      module.isUnlocked
                        ? ''
                        : 'opacity-50'
                    )}
                  >
                    {/* Node indicator */}
                    <div
                      className={cn(
                        'relative z-10 w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all',
                        module.isUnlocked
                          ? 'border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/15'
                          : 'border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)]'
                      )}
                    >
                      {module.isUnlocked ? (
                        <span className="w-2 h-2 rounded-full bg-[var(--color-accent-primary)]" />
                      ) : (
                        <Lock className="w-3 h-3 text-[var(--color-text-tertiary)]" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[var(--color-text-tertiary)]">
                          {module.order.toString().padStart(2, '0')}
                        </span>
                        <h3 className="font-semibold text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors truncate">
                          {module.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 text-xs text-[var(--color-text-tertiary)]">
                      <span className="hidden sm:flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {module.lessons.length}
                      </span>
                      <span className="hidden sm:flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDuration(module.totalDuration)}
                      </span>
                      <span className="hidden sm:flex items-center gap-1 font-mono text-[var(--color-accent-primary)]">
                        {curriculumService.getModuleProgress(module.id, progress)}%
                      </span>
                      <ChevronRight className="w-4 h-4 text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent-primary)] transition-colors" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OOP Assistant Section */}
      <section className="py-20 border-y border-[var(--color-border-primary)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="primary" size="md" className="mb-4">AI-Powered</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
                YOUR OOP COMMAND CENTER
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-6">
                Confused about a concept? The OOP Assistant explains, compares, and guides you to the right practice.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <Button size="lg" asChild className="group">
                  <Link to="/assistant">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Ask a Question
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/knowledge">
                    <Network className="w-5 h-5 mr-2" />
                    Knowledge Graph
                  </Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block"
            >
              <Card variant="elevated" padding="lg" className="bg-[var(--color-bg-card)] border border-[var(--color-border-primary)]">
                <p className="text-[10px] tracking-[0.15em] font-semibold text-[var(--color-text-tertiary)] uppercase mb-3">Try asking:</p>
                <div className="space-y-2">
                  {['What is polymorphism?', 'Compare interface vs abstract class', 'Why use encapsulation?'].map((q) => (
                    <Link
                      key={q}
                      to={`/assistant?q=${encodeURIComponent(q)}`}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)]/8 transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                      {q}
                    </Link>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-primary)]/12 border border-[var(--color-accent-primary)]/25 text-[var(--color-accent-primary)] text-sm font-medium mb-6">
              <Rocket className="w-4 h-4" />
              <span>Ready to master Java OOP?</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
              Begin Your OOP Journey Today
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8">
              Start with the foundations. Progress at your own pace. Master every concept.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" asChild className="group">
                <Link to="/learn">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Start Learning Free
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/curriculum">
                  View Full Curriculum
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
