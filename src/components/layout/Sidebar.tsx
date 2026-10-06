import { Link, useLocation, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  BookOpen,
  Box,
  Trophy,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  Target,
  Bug,
  Layers,
  Award,
  Users,
  Flame,
  MessageSquare,
  Network,
  ClipboardCheck,
  ClipboardList,
  FolderKanban,
  Code2,
  Terminal,
} from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button, Divider, LucideIcon } from '@/components/ui';
import { progressService } from '@/services/progressService';
import { curriculumService } from '@/services/curriculumService';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

const navigation = [
  { id: 'home', label: 'Home', icon: Home, href: '/' },
  { id: 'learn', label: 'Learn', icon: BookOpen, href: '/learn' },
  { id: 'practice', label: 'Practice', icon: Target, href: '/practice' },
  { id: '3d-lab', label: '3D Lab', icon: Box, href: '/3d' },
  { id: 'challenges', label: 'Challenges', icon: Trophy, href: '/challenges' },
  { id: 'projects', label: 'Projects', icon: FolderKanban, href: '/projects' },
  { id: 'code-studio', label: 'Code Studio', icon: Code2, href: '/code-studio' },
  { id: 'playground', label: 'Playground', icon: Terminal, href: '/playground' },
  { id: 'debug', label: 'Debug Lab', icon: Bug, href: '/debug' },
  { id: 'progress', label: 'Progress', icon: BarChart2, href: '/progress' },
];

const secondaryNavigation = [
  { id: 'curriculum', label: 'Curriculum', icon: Layers, href: '/curriculum' },
  { id: 'learning-path', label: 'Learning Path', icon: Target, href: '/learning-path' },
  { id: 'study-session', label: 'Study Session', icon: ClipboardCheck, href: '/study-session' },
  { id: 'knowledge', label: 'Knowledge', icon: Network, href: '/knowledge' },
  { id: 'assistant', label: 'Assistant', icon: MessageSquare, href: '/assistant' },
  { id: 'quiz', label: 'Quiz Center', icon: Award, href: '/quiz' },
  { id: 'assessment', label: 'Assessment', icon: ClipboardCheck, href: '/assessment' },
  { id: 'exam-prep', label: 'Exam Prep', icon: ClipboardList, href: '/exam-prep' },
  { id: 'achievements', label: 'Achievements', icon: Users, href: '/achievements' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
];

export function Sidebar({ isOpen, onToggle, className }: SidebarProps) {
  const location = useLocation();
  const progress = progressService.getProgress();
  const xpPercent = Math.round((progress.totalXp / (progress.totalXp + progress.xpToNextLevel)) * 100);
  const currentCourse = curriculumService.getCurrentCourseId();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && window.innerWidth < 1024) {
        onToggle();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onToggle]);

  return (
    <AnimatePresence mode="wait">
      <motion.aside
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: isOpen ? 'var(--sidebar-width)' : 'var(--sidebar-collapsed-width)', opacity: 1 }}
        exit={{ width: 0, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
        className={cn(
          'fixed left-0 top-0 z-[var(--z-modal)] h-screen flex flex-col',
          'bg-[var(--color-bg-secondary)] border-r border-[var(--color-border-primary)]',
          'overflow-hidden transition-all duration-300',
          className
        )}
        style={{ width: isOpen ? 'var(--sidebar-width)' : 'var(--sidebar-collapsed-width)' }}
        aria-label="Main navigation"
      >
        {/* Logo + Toggle */}
        <div className="flex h-[var(--topbar-height)] items-center justify-between px-4 border-b border-[var(--color-border-primary)]">
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Link to="/" className="flex items-center gap-2.5" aria-label="OOP Universe Home">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center shadow-[var(--shadow-glow)]">
                    <Zap className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-sm text-[var(--color-text-primary)] leading-tight">
                      OOP Universe
                    </span>
                    <span className="text-[10px] text-[var(--color-text-tertiary)] tracking-wider leading-tight">
                      JAVA MASTERY
                    </span>
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] shrink-0"
          >
            {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </Button>
        </div>

        {/* Track Switcher */}
        {isOpen && (
          <div className="px-4 py-3 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)]/30">
            <p className="text-[10px] tracking-[0.1em] font-bold text-[var(--color-text-tertiary)] uppercase mb-2">Select Curriculum Track</p>
            <div className="flex flex-col gap-1.5">
              <button 
                onClick={() => curriculumService.setCourse('c')}
                className={cn('text-xs font-semibold py-1.5 px-3 rounded-md text-left transition-colors', currentCourse === 'c' ? 'bg-[var(--color-accent-info)] text-white' : 'hover:bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)]')}
              >
                🚀 C Language
              </button>
              <button 
                onClick={() => curriculumService.setCourse('java')}
                className={cn('text-xs font-semibold py-1.5 px-3 rounded-md text-left transition-colors', currentCourse === 'java' ? 'bg-[var(--color-accent-warning)] text-black' : 'hover:bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)]')}
              >
                ☕ Java Basics
              </button>
              <button 
                onClick={() => curriculumService.setCourse('oop')}
                className={cn('text-xs font-semibold py-1.5 px-3 rounded-md text-left transition-colors', currentCourse === 'oop' ? 'bg-[var(--color-accent-primary)] text-white' : 'hover:bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)]')}
              >
                📦 Object-Oriented Prog.
              </button>
            </div>
          </div>
        )}

        {/* Primary Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5" aria-label="Primary navigation">
          {navigation.map(item => {
            const active = item.href === '/learn'
              ? location.pathname === '/learn'
                || location.pathname.startsWith('/lesson/')
                || location.pathname.startsWith('/module/')
                || location.pathname.startsWith('/curriculum')
              : location.pathname === item.href
                || location.pathname.startsWith(item.href + '/');
            return (
              <NavLink
                key={item.id}
                to={item.href}
                className={() => cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
                  active
                    ? 'bg-[var(--color-accent-primary)]/12 text-[var(--color-accent-primary)] shadow-[inset_0_0_0_1px_rgba(59,130,246,0.12)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]/60'
                )}
                aria-current={active ? 'page' : undefined}
                title={isOpen ? undefined : item.label}
              >
                <LucideIcon icon={item.icon} className="w-5 h-5 flex-shrink-0" aria-hidden={true} />
                {isOpen && <span className="truncate">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        <Divider className="mx-3 my-1" />

        {/* Secondary Navigation */}
        <nav className="px-3 space-y-0.5" aria-label="Secondary navigation">
          {secondaryNavigation.map(item => {
            const isActive = location.pathname === item.href
              || location.pathname.startsWith(item.href + '/');
            return (
              <NavLink
                key={item.id}
                to={item.href}
                className={({ isActive: activeNav }) => cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
                  isActive || activeNav
                    ? 'bg-[var(--color-accent-secondary)]/12 text-[var(--color-accent-secondary)]'
                    : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]/60'
                )}
                aria-current={isActive ? 'page' : undefined}
                title={isOpen ? undefined : item.label}
              >
                <LucideIcon icon={item.icon} className="w-4 h-4 flex-shrink-0" aria-hidden={true} />
                {isOpen && <span className="truncate">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer - Gamification & Quick Actions */}
        <div className="p-3 border-t border-[var(--color-border-primary)] space-y-3">
          {/* OOP Level Card */}
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="level-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl bg-gradient-to-br from-[var(--color-bg-tertiary)] to-[var(--color-bg-card)] p-3.5 border border-[var(--color-border-primary)]/50"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] tracking-[0.15em] font-semibold text-[var(--color-text-tertiary)] uppercase">
                    OOP Level
                  </span>
                  <span className="font-display font-bold text-lg text-[var(--color-text-primary)]">
                    {String(progress.level).padStart(2, '0')}
                  </span>
                </div>

                {/* XP Progress Bar */}
                <div className="mb-2">
                  <div className="h-1.5 bg-[var(--color-bg-input)] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--color-xp-gold)] to-[var(--color-accent-warning)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${xpPercent}%` }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[var(--color-xp-gold)]">
                    {progress.totalXp.toLocaleString()} XP
                  </span>
                  <span className="text-[var(--color-text-tertiary)]">
                    {xpPercent}%
                  </span>
                </div>

                {/* Streak */}
                {progress.currentStreak > 0 && (
                  <div className="flex items-center gap-1.5 mt-2.5 pt-2.5 border-t border-[var(--color-border-primary)]/50">
                    <Flame className="w-3.5 h-3.5 text-[var(--color-accent-warning)]" />
                    <span className="text-xs text-[var(--color-text-secondary)]">
                      {progress.currentStreak} day streak
                    </span>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="level-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center"
                title={`Level ${progress.level} - ${progress.totalXp} XP`}
              >
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--color-xp-gold)]/20 to-[var(--color-accent-warning)]/20 border border-[var(--color-xp-gold)]/20 flex items-center justify-center">
                  <span className="font-display font-bold text-xs text-[var(--color-xp-gold)]">
                    {progress.level}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Actions */}
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                className="space-y-1"
              >
                <p className="text-[10px] tracking-[0.15em] font-semibold text-[var(--color-text-tertiary)] uppercase px-1">
                  Quick Actions
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  <Link
                    to="/learn"
                    className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)]/8 transition-all"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Continue
                  </Link>
                  <Link
                    to="/practice"
                    className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)]/8 transition-all"
                  >
                    <Target className="w-3.5 h-3.5" /> Practice
                  </Link>
                  <Link
                    to="/3d"
                    className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent-secondary)] hover:bg-[var(--color-accent-secondary)]/8 transition-all"
                  >
                    <Box className="w-3.5 h-3.5" /> 3D Lab
                  </Link>
                  <Link
                    to="/debug"
                    className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent-error)] hover:bg-[var(--color-accent-error)]/8 transition-all"
                  >
                    <Bug className="w-3.5 h-3.5" /> Debug
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
