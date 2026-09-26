import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Zap } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button, Badge, Select } from '@/components/ui';
import { slideDown } from '@/utils/motion';
import type { QualityLevel } from '@/types/oopLab';

interface LabHeaderProps {
  language: 'english' | 'romanUrdu';
  quality: QualityLevel;
  xp: number;
  onLanguageChange: (lang: 'english' | 'romanUrdu') => void;
  onQualityChange: (level: QualityLevel) => void;
  onBack: () => void;
  className?: string;
}

const QUALITY_OPTIONS = [
  { value: 'auto', label: 'Auto' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

export function LabHeader({
  language,
  quality,
  xp,
  onLanguageChange,
  onQualityChange,
  onBack,
  className,
}: LabHeaderProps) {
  return (
    <motion.header
      variants={slideDown}
      initial="hidden"
      animate="visible"
      className={cn(
        'flex items-center justify-between px-4 h-12 border-b border-[var(--color-border-primary)]',
        'bg-[var(--color-bg-secondary)]/90 backdrop-blur-md',
        className
      )}
    >
      {/* Left: Logo + Back */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onBack} aria-label="Go back">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-tertiary)] flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs font-bold tracking-wider text-[var(--color-text-primary)]">
            OOP UNIVERSE
          </span>
        </div>
      </div>

      {/* Center: Lab Name */}
      <div className="hidden md:flex items-center gap-2">
        <div className="h-px w-8 bg-[var(--color-border-primary)]" />
        <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-text-tertiary)] uppercase">
          Class & Object Lab
        </span>
        <div className="h-px w-8 bg-[var(--color-border-primary)]" />
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-2">
        {/* Language Toggle */}
        <button
          onClick={() => onLanguageChange(language === 'english' ? 'romanUrdu' : 'english')}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold',
            'border border-[var(--color-border-primary)] hover:border-[var(--color-border-secondary)]',
            'bg-[var(--color-bg-tertiary)] transition-colors'
          )}
          aria-label="Toggle language"
        >
          <Globe className="w-3.5 h-3.5 text-[var(--color-accent-info)]" />
          {language === 'english' ? 'EN' : 'UR'}
        </button>

        {/* Quality */}
        <div className="hidden sm:block">
          <Select
            options={QUALITY_OPTIONS}
            value={quality}
            onChange={(e) => onQualityChange(e.target.value as QualityLevel)}
            className="h-8 text-[11px] w-24"
          />
        </div>

        {/* XP */}
        <Badge variant="xp" size="sm">
          <Zap className="w-3 h-3" />
          {xp} XP
        </Badge>
      </div>
    </motion.header>
  );
}
