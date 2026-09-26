import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sun, Moon, Monitor, Palette, Database, Trash2,
  Download, Upload, RotateCcw, Eye, Accessibility, BookOpen, Target,
  Sparkles, AlertTriangle, Info,
} from 'lucide-react';
import { Button, Card, Badge, Switch, Divider, LucideIcon } from '@/components/ui';
import { useToast } from '@/components/ui/Toast';
import { settingsService } from '@/services/settingsService';
import type { UserSettings } from '@/services/settingsService';

const themes = [
  { value: 'dark' as const, label: 'Dark', icon: Moon, description: 'Easy on the eyes for long coding sessions' },
  { value: 'light' as const, label: 'Light', icon: Sun, description: 'Bright and clean for daytime learning' },
  { value: 'system' as const, label: 'System', icon: Monitor, description: 'Follow your OS preference' },
];

const learningStyles = [
  { value: 'balanced' as const, label: 'Balanced', icon: BookOpen, description: 'Mix of reading, practice, and visualization' },
  { value: 'visual' as const, label: 'Visual', icon: Eye, description: 'Prioritize 3D visualizations and diagrams' },
  { value: 'practice-first' as const, label: 'Practice First', icon: Target, description: 'Jump into exercises before theory' },
  { value: 'exam-first' as const, label: 'Exam First', icon: Sparkles, description: 'Focus on exam and viva preparation' },
];

const accentColors = [
  { value: 'default' as const, label: 'Default', color: '#3b82f6' },
  { value: 'blue' as const, label: 'Blue', color: '#2563eb' },
  { value: 'purple' as const, label: 'Purple', color: '#7c3aed' },
  { value: 'green' as const, label: 'Green', color: '#059669' },
  { value: 'amber' as const, label: 'Amber', color: '#d97706' },
];

const qualityOptions = [
  { value: 'auto' as const, label: 'Auto', description: 'Device-aware selection' },
  { value: 'high' as const, label: 'High', description: 'Maximum visual quality' },
  { value: 'medium' as const, label: 'Medium', description: 'Balanced performance' },
  { value: 'low' as const, label: 'Low', description: 'Minimal effects' },
];

export function SettingsPage() {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [settings, setSettings] = useState<UserSettings>(settingsService.getSettings());
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [activeSection, setActiveSection] = useState('learning');

  const updateSetting = useCallback(<K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    setSettings(prev => {
      const next = { ...prev, [key]: value };
      settingsService.updateSettings({ [key]: value });
      return next;
    });
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    } else {
      root.classList.toggle('dark', settings.theme === 'dark');
    }
  }, [settings.theme]);

  useEffect(() => {
    if (settings.reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [settings.reducedMotion]);

  const handleExportData = () => {
    const json = settingsService.exportProgress();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `oop-universe-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast({ type: 'success', title: 'Data exported', message: 'Backup file downloaded' });
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = settingsService.importProgress(event.target?.result as string);
      if (result.success) {
        addToast({ type: 'success', title: 'Data imported', message: 'Progress restored. Refreshing...' });
        setTimeout(() => window.location.reload(), 1000);
      } else {
        addToast({ type: 'error', title: 'Import failed', message: result.error || 'Invalid backup file' });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleResetProgress = () => {
    settingsService.resetAllProgress();
    addToast({ type: 'success', title: 'Progress reset', message: 'All data has been cleared. Refreshing...' });
    setTimeout(() => window.location.reload(), 1000);
  };

  const handleReplayOnboarding = () => {
    localStorage.removeItem('oop-universe-onboarding-completed');
    navigate('/onboarding');
  };

  const sections = [
    {
      id: 'learning',
      title: 'Learning',
      icon: BookOpen,
      render: () => (
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-[var(--color-text-primary)] mb-1">Content Language</h4>
            <p className="text-sm text-[var(--color-text-tertiary)] mb-3">Choose how explanations are presented</p>
            <div className="grid md:grid-cols-3 gap-3">
              {([
                { value: 'english' as const, label: 'English', desc: 'Full English explanations' },
                { value: 'roman-urdu' as const, label: 'Roman Urdu', desc: 'Urdu explanations in Roman script' },
                { value: 'both' as const, label: 'Both', desc: 'English + Roman Urdu side by side' },
              ]).map(opt => (
                <Button
                  key={opt.value}
                  variant={settings.language === opt.value ? 'primary' : 'outline'}
                  className="h-20 flex-col gap-1 text-left"
                  onClick={() => updateSetting('language', opt.value)}
                >
                  <span className="font-medium text-sm">{opt.label}</span>
                  <span className="text-[10px] text-[var(--color-text-tertiary)]">{opt.desc}</span>
                </Button>
              ))}
            </div>
          </div>

          <Divider label="Learning Style" />

          <div className="grid md:grid-cols-2 gap-3">
            {learningStyles.map(style => (
              <Button
                key={style.value}
                variant={settings.learningStyle === style.value ? 'primary' : 'outline'}
                className="h-24 flex-col gap-2 text-left"
                onClick={() => updateSetting('learningStyle', style.value)}
              >
                <LucideIcon icon={style.icon} className="w-5 h-5" />
                <span className="font-medium">{style.label}</span>
                <span className="text-[10px] text-[var(--color-text-tertiary)]">{style.description}</span>
              </Button>
            ))}
          </div>

          <Divider label="Daily Goal" />

          <div>
            <h4 className="font-medium text-[var(--color-text-primary)] mb-2">Learning Actions Per Day</h4>
            <p className="text-sm text-[var(--color-text-tertiary)] mb-3">Set how many actions you aim for daily</p>
            <div className="flex gap-2">
              {[3, 5, 8, 10].map(n => (
                <Button
                  key={n}
                  variant={settings.dailyGoalLessons === n ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => updateSetting('dailyGoalLessons', n)}
                >
                  {n} actions
                </Button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: Palette,
      render: () => (
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-[var(--color-text-primary)] mb-3">Theme</h4>
            <div className="grid md:grid-cols-3 gap-3">
              {themes.map(t => (
                <Button
                  key={t.value}
                  variant={settings.theme === t.value ? 'primary' : 'outline'}
                  className="h-24 flex-col gap-2 text-left"
                  onClick={() => updateSetting('theme', t.value)}
                >
                  <LucideIcon icon={t.icon} className="w-6 h-6" />
                  <span className="font-medium">{t.label}</span>
                  <span className="text-xs text-[var(--color-text-tertiary)]">{t.description}</span>
                </Button>
              ))}
            </div>
          </div>

          <Divider label="Accent Color" />

          <div className="flex gap-3">
            {accentColors.map(ac => (
              <button
                key={ac.value}
                onClick={() => updateSetting('accentColor', ac.value)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                  settings.accentColor === ac.value
                    ? 'border-[var(--color-border-focus)] bg-[var(--color-bg-tertiary)]'
                    : 'border-[var(--color-border-primary)] hover:border-[var(--color-border-secondary)]'
                }`}
              >
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: ac.color }} />
                <span className="text-sm text-[var(--color-text-primary)]">{ac.label}</span>
              </button>
            ))}
          </div>

          <Divider label="Display" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[var(--color-text-primary)]">Compact Mode</p>
                <p className="text-sm text-[var(--color-text-tertiary)]">Reduce padding and spacing for more content</p>
              </div>
              <Switch checked={settings.compactMode} onCheckedChange={(v) => updateSetting('compactMode', v)} label="Compact mode" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[var(--color-text-primary)]">Larger Text</p>
                <p className="text-sm text-[var(--color-text-tertiary)]">Increase base font size for readability</p>
              </div>
              <Switch checked={settings.fontSize === 'large'} onCheckedChange={(v) => updateSetting('fontSize', v ? 'large' : 'normal')} label="Larger text" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: '3d',
      title: '3D Lab',
      icon: Eye,
      render: () => (
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-[var(--color-text-primary)] mb-1">3D Quality</h4>
            <p className="text-sm text-[var(--color-text-tertiary)] mb-3">Adjust visual quality for your device</p>
            <div className="grid md:grid-cols-2 gap-3">
              {qualityOptions.map(q => (
                <Button
                  key={q.value}
                  variant={settings.threeDQuality === q.value ? 'primary' : 'outline'}
                  className="h-16 flex-col gap-1 text-left"
                  onClick={() => updateSetting('threeDQuality', q.value)}
                >
                  <span className="font-medium">{q.label}</span>
                  <span className="text-[10px] text-[var(--color-text-tertiary)]">{q.description}</span>
                </Button>
              ))}
            </div>
          </div>

          <Divider label="Effects" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[var(--color-text-primary)]">Enable 3D Effects</p>
                <p className="text-sm text-[var(--color-text-tertiary)]">Toggle 3D visualizations on/off</p>
              </div>
              <Switch checked={settings.enable3DEffects} onCheckedChange={(v) => updateSetting('enable3DEffects', v)} label="Enable 3D effects" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'accessibility',
      title: 'Accessibility',
      icon: Accessibility,
      render: () => (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[var(--color-text-primary)]">Reduced Motion</p>
                <p className="text-sm text-[var(--color-text-tertiary)]">Minimize animations and transitions</p>
              </div>
              <Switch checked={settings.reducedMotion} onCheckedChange={(v) => updateSetting('reducedMotion', v)} label="Reduced motion" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[var(--color-text-primary)]">Larger Text</p>
                <p className="text-sm text-[var(--color-text-tertiary)]">Increase base font size</p>
              </div>
              <Switch checked={settings.fontSize === 'large'} onCheckedChange={(v) => updateSetting('fontSize', v ? 'large' : 'normal')} label="Large text" />
            </div>
          </div>

          <Divider label="About Accessibility" />

          <div className="flex items-start gap-3 p-4 bg-[var(--color-bg-tertiary)]/50 rounded-lg">
            <Info className="w-5 h-5 text-[var(--color-accent-info)] shrink-0 mt-0.5" />
            <div className="text-sm text-[var(--color-text-secondary)]">
              <p>OOP Universe respects your system's <code className="px-1 py-0.5 rounded bg-[var(--color-bg-input)] text-[var(--color-text-primary)] font-mono text-xs">prefers-reduced-motion</code> setting. All interactive elements support keyboard navigation and screen readers.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'data',
      title: 'Data',
      icon: Database,
      render: () => (
        <div className="space-y-6">
          <Divider label="Backup & Restore" />

          <div className="grid md:grid-cols-2 gap-4">
            <Button variant="outline" leftIcon={<Download className="w-4 h-4" />} onClick={handleExportData}>
              Export Progress
            </Button>
            <div className="relative">
              <Button variant="outline" leftIcon={<Upload className="w-4 h-4" />} className="w-full">
                Import Progress
              </Button>
              <input type="file" accept=".json" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImportData} aria-label="Import progress file" />
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-[var(--color-bg-tertiary)]/50 rounded-lg">
            <Info className="w-5 h-5 text-[var(--color-accent-info)] shrink-0 mt-0.5" />
            <p className="text-sm text-[var(--color-text-secondary)]">
              Export creates a JSON backup of your progress, mastery, XP, achievements, and settings. Import will replace your current data.
            </p>
          </div>

          <Divider label="Reset" />

          <div className="flex items-center justify-between p-4 bg-[var(--color-bg-tertiary)]/50 rounded-lg">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Replay Introduction</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">See the onboarding flow again without resetting progress</p>
            </div>
            <Button variant="outline" size="sm" leftIcon={<RotateCcw className="w-4 h-4" />} onClick={handleReplayOnboarding}>
              Replay
            </Button>
          </div>

          <Divider label="Danger Zone" />

          <Card variant="outlined" padding="lg" className="border-[var(--color-accent-error)]/30 bg-[var(--color-accent-error)]/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-error)]/15 flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-[var(--color-accent-error)]" />
                </div>
                <div>
                  <p className="font-medium text-[var(--color-text-primary)]">Reset All Progress</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">Permanently delete all progress, XP, streaks, and achievements</p>
                </div>
              </div>
              <Button variant="danger" onClick={() => setShowResetConfirm(true)}>
                Reset Everything
              </Button>
            </div>
          </Card>

          <Divider label="Privacy" />

          <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
            <p>Your data is stored locally in your browser. No personal information is sent to any server.</p>
          </div>
        </div>
      ),
    },
    {
      id: 'about',
      title: 'About',
      icon: Info,
      render: () => (
        <div className="space-y-6">
          <Card variant="elevated" padding="lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">OOP Universe</h3>
                <p className="text-[var(--color-text-secondary)]">Interactive Java OOP Learning Platform</p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="primary" size="sm">v1.0.0</Badge>
                  <Badge variant="outline" size="sm">15 Modules</Badge>
                  <Badge variant="outline" size="sm">146 Lessons</Badge>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-3 text-sm text-[var(--color-text-secondary)]">
            <p>A university-level interactive Java OOP platform combining structured curriculum, 3D visualization, coding labs, debugging challenges, and gamified progress tracking.</p>
            <p>Designed for serious learners who want to master Object-Oriented Programming in Java.</p>
          </div>

          <Divider label="Curriculum" />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            {[
              { label: 'Foundation', count: '6 concepts' },
              { label: 'Constructors', count: '5 concepts' },
              { label: 'Encapsulation', count: '7 concepts' },
              { label: 'Inheritance', count: '7 concepts' },
              { label: 'Polymorphism', count: '7 concepts' },
              { label: 'Abstraction', count: '3 concepts' },
              { label: 'Interfaces', count: '4 concepts' },
              { label: 'Exceptions', count: '9 concepts' },
              { label: 'Collections', count: '6 concepts' },
              { label: 'Design', count: '8 concepts' },
              { label: 'Relationships', count: '5 concepts' },
              { label: 'Java Features', count: '7 concepts' },
            ].map(item => (
              <div key={item.label} className="p-3 rounded-lg bg-[var(--color-bg-tertiary)]/30">
                <p className="font-medium text-[var(--color-text-primary)]">{item.label}</p>
                <p className="text-xs text-[var(--color-text-tertiary)]">{item.count}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Badge variant="primary" size="md" className="mb-3">Settings</Badge>
        <h1 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">Settings</h1>
        <p className="text-[var(--color-text-secondary)] mt-1">Customize your learning experience</p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
          <Card variant="outlined" padding="md">
            <nav className="space-y-1" role="navigation" aria-label="Settings sections">
              {sections.map(section => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? 'primary' : 'ghost'}
                  className="w-full justify-start gap-3"
                  onClick={() => setActiveSection(section.id)}
                  aria-current={activeSection === section.id ? 'page' : undefined}
                >
                  <LucideIcon icon={section.icon} className="w-5 h-5" />
                  <span>{section.title}</span>
                </Button>
              ))}
            </nav>
          </Card>
        </motion.aside>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3">
          <Card variant="elevated" padding="lg">
            {sections.find(s => s.id === activeSection)?.render()}
          </Card>
        </motion.div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowResetConfirm(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-error)]/15 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-[var(--color-accent-error)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Reset All Progress?</h3>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">
              This will permanently remove your local learning progress, mastery, XP, achievements, and learning history. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setShowResetConfirm(false)}>Cancel</Button>
              <Button variant="danger" onClick={handleResetProgress}>Reset Everything</Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
