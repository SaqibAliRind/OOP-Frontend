import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Flame } from 'lucide-react';
import { cn } from '@/utils/helpers';

interface XpFeedbackProps {
  amount: number;
  comboBonus?: number;
  streak?: number;
  label?: string;
  onComplete?: () => void;
  className?: string;
}

export function XpFeedback({ amount, comboBonus = 0, streak = 0, label, onComplete, className }: XpFeedbackProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={cn('flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-xp-gold)]/10 border border-[var(--color-xp-gold)]/30', className)}
        >
          <Zap className="w-4 h-4 text-[var(--color-xp-gold)]" />
          <span className="text-sm font-bold text-[var(--color-xp-gold)]">+{amount} XP</span>
          {comboBonus > 0 && (
            <span className="text-xs text-[var(--color-accent-success)]">(+{comboBonus} combo)</span>
          )}
          {streak >= 3 && (
            <span className="flex items-center gap-1 text-xs text-[var(--color-accent-warning)]">
              <Flame className="w-3 h-3" /> {streak}x streak
            </span>
          )}
          {label && (
            <span className="text-xs text-[var(--color-text-tertiary)]">{label}</span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
