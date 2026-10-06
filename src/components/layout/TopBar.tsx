import { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Moon,
  Bell,
  Search,
  User,
  Menu,
  X,
  Award,
  Settings,
  LogOut,
  Zap,
  BarChart2,
  Flame,
  Command,
  Lock,
} from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button, Divider, AdminFeedbackModal } from '@/components/ui';
import { progressService } from '@/services/progressService';

const CommandSearch = lazy(() =>
  import('@/components/search/CommandSearch').then(m => ({ default: m.CommandSearch }))
);

interface TopBarProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

const pageContextMap: Record<string, string> = {
  '/': 'Home',
  '/learn': 'Learn',
  '/curriculum': 'Curriculum',
  '/practice': 'Practice Center',
  '/3d': '3D Universe Lab',
  '/3d/lab': 'OOP Lab',
  '/3d/relationships': 'Relationship Architect',
  '/3d/solid': 'SOLID Architecture Lab',
  '/challenges': 'Mastery Challenges',
  '/debug': 'Debug Lab',
  '/quiz': 'Quiz Center',
  '/assessment': 'Assessment Center',
  '/exam-prep': 'Exam Prep Center',
  '/progress': 'Progress Dashboard',
  '/achievements': 'Achievements',
  '/settings': 'Settings',
  '/assistant': 'OOP Assistant',
  '/knowledge': 'Knowledge Explorer',
};

export function TopBar({ onMenuClick, sidebarOpen }: TopBarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const progress = progressService.getProgress();
  const currentLevel = progress.level;
  const xpPercent = Math.round((progress.totalXp / (progress.totalXp + progress.xpToNextLevel)) * 100);

  const pageContext = pageContextMap[location.pathname] || 'OOP Universe';

  const handleThemeToggle = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 right-0 z-[var(--z-sticky)] h-[var(--topbar-height)]',
        'bg-[var(--color-bg-secondary)]/80 backdrop-blur-xl border-b border-[var(--color-border-primary)]',
        'transition-all duration-300'
      )}
      style={{ left: isMobile ? 0 : sidebarOpen ? 'var(--sidebar-width)' : 'var(--sidebar-collapsed-width)' }}
      role="banner"
    >
      <div className="flex h-full items-center justify-between px-4 md:px-6 gap-4">
        {/* Left: Page Context + Search */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden shrink-0"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          {/* Page Context */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <span className="text-sm font-medium text-[var(--color-text-primary)]">{pageContext}</span>
          </div>

          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className={cn(
              'flex items-center gap-2 flex-1 max-w-md hidden sm:flex',
              'pl-3 pr-10 py-2 rounded-lg text-sm text-left',
              'bg-[var(--color-bg-input)] border border-[var(--color-border-primary)]',
              'text-[var(--color-text-tertiary)] hover:border-[var(--color-border-focus)]',
              'transition-all duration-200 cursor-pointer'
            )}
          >
            <Search className="w-4 h-4 shrink-0" />
            <span className="flex-1">Search lessons, concepts...</span>
            <kbd className={cn(
              'hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px]',
              'bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)] border border-[var(--color-border-primary)]',
              'font-mono'
            )}>
              <Command className="w-3 h-3" />K
            </kbd>
          </button>
        </div>

        {/* Right: Stats + Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Streak */}
          {progress.currentStreak > 0 && (
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--color-bg-tertiary)]/80" title={`${progress.currentStreak} day streak`}>
              <Flame className="w-4 h-4 text-[var(--color-accent-warning)]" />
              <span className="text-xs font-medium text-[var(--color-text-primary)] font-mono">{progress.currentStreak}</span>
            </div>
          )}

          {/* XP Level */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-bg-tertiary)]/80" title={`${progress.totalXp} XP`}>
            <Zap className="w-4 h-4 text-[var(--color-xp-gold)]" />
            <span className="text-sm font-medium text-[var(--color-text-primary)]">Lv.{currentLevel}</span>
            <div className="w-20 h-1.5 bg-[var(--color-bg-input)] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--color-xp-gold)] to-[var(--color-accent-warning)] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${xpPercent}%` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <span className="text-xs text-[var(--color-text-tertiary)] font-mono">{progress.totalXp}</span>
          </div>

          <div className="w-px h-6 bg-[var(--color-border-primary)] hidden md:block mx-1" />

          {/* Admin Lock */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setAdminOpen(true)}
            aria-label="Admin Feedback"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hidden sm:inline-flex"
          >
            <Lock className="w-5 h-5" />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleThemeToggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setUserMenuOpen(false);
              }}
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[var(--color-accent-error)] text-white text-[10px] rounded-full flex items-center justify-center font-medium notification-pulse">
                3
              </span>
            </Button>
            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-72 bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-xl shadow-[var(--shadow-xl)] py-2 z-[var(--z-dropdown)]"
                >
                  <div className="px-4 py-2 border-b border-[var(--color-border-primary)]">
                    <p className="text-sm font-semibold text-[var(--color-text-primary)]">Notifications</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <div className="px-3 py-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] cursor-pointer">
                      <p className="text-sm text-[var(--color-text-primary)]">New lesson available</p>
                      <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5">Module 02: Classes & Objects</p>
                    </div>
                    <div className="px-3 py-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] cursor-pointer">
                      <p className="text-sm text-[var(--color-text-primary)]">Streak milestone!</p>
                      <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5">7 days in a row</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setUserMenuOpen(!userMenuOpen);
                setNotificationsOpen(false);
              }}
              aria-label="User menu"
              aria-expanded={userMenuOpen}
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center shadow-[var(--shadow-glow)]">
                <User className="w-4 h-4 text-white" />
              </div>
            </Button>
            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-xl shadow-[var(--shadow-xl)] py-2 z-[var(--z-dropdown)]"
                >
                  <div className="px-4 py-3 border-b border-[var(--color-border-primary)]">
                    <p className="font-medium text-[var(--color-text-primary)]">Student User</p>
                    <p className="text-sm text-[var(--color-text-tertiary)]">student@university.edu</p>
                  </div>
                  <div className="p-1.5">
                    <Link to="/progress" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors">
                      <BarChart2 className="w-4 h-4" />
                      Progress
                    </Link>
                    <Link to="/achievements" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors">
                      <Award className="w-4 h-4" />
                      Achievements
                    </Link>
                    <Link to="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors">
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                  </div>
                  <Divider className="my-1" />
                  <div className="p-1.5">
                    <button
                      onClick={() => { navigate('/'); setUserMenuOpen(false); }}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[var(--color-accent-error)] hover:bg-[var(--color-bg-tertiary)] w-full text-left transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Suspense fallback={null}>
        <CommandSearch
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          onNavigate={(path) => {
            navigate(path);
            setSearchOpen(false);
          }}
        />
      </Suspense>

      <AdminFeedbackModal isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </header>
  );
}
