import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InitSequenceProps {
  onComplete: () => void;
}

const LINES = [
  { text: '> INITIALIZING OOP UNIVERSE...', delay: 0 },
  { text: '> Loading Java OOP modules...', delay: 800 },
  { text: '> Preparing 3D environment...', delay: 1600 },
  { text: '> Calibrating code engine...', delay: 2400 },
  { text: '', delay: 3000 },
  { text: '> JAVA OOP LAB READY', delay: 3200 },
  { text: '', delay: 3800 },
  { text: '> MISSION 01', delay: 4000 },
  { text: '> UNDERSTAND CLASSES & OBJECTS', delay: 4400 },
];

export function InitSequence({ onComplete }: InitSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showButton, setShowButton] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);

  useEffect(() => {
    if (isSkipping) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach((line, index) => {
      const timer = setTimeout(() => {
        setVisibleLines(index + 1);
        if (index === LINES.length - 1) {
          setTimeout(() => setShowButton(true), 600);
        }
      }, line.delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [isSkipping]);

  const handleSkip = useCallback(() => {
    setIsSkipping(true);
    setVisibleLines(LINES.length);
    setShowButton(true);
  }, []);

  const handleEnter = useCallback(() => {
    try {
      localStorage.setItem('oop-lab-intro-seen', 'true');
    } catch { /* ignore */ }
    onComplete();
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050810]">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-blue-500/5 blur-[120px]" />

      <div className="relative z-10 max-w-2xl w-full px-8">
        {/* Terminal window */}
        <div className="rounded-xl border border-white/10 bg-[#0a0f1a]/90 backdrop-blur-xl overflow-hidden shadow-2xl shadow-blue-500/5">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 text-xs text-white/30 font-mono">oop-universe — initialization</span>
          </div>

          {/* Content */}
          <div className="p-6 min-h-[320px] font-mono text-sm">
            <AnimatePresence>
              {LINES.slice(0, visibleLines).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`py-0.5 ${
                    line.text.includes('READY')
                      ? 'text-green-400 font-bold'
                      : line.text.includes('MISSION')
                      ? 'text-amber-400 font-bold'
                      : line.text.includes('UNDERSTAND')
                      ? 'text-blue-400'
                      : 'text-white/60'
                  }`}
                >
                  {line.text || '\u00A0'}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Blinking cursor */}
            {!showButton && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block w-2 h-4 bg-blue-400/80 mt-1"
              />
            )}
          </div>

          {/* Actions */}
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="px-6 pb-6 flex items-center gap-3"
            >
              <button
                onClick={handleEnter}
                className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.97]"
              >
                ENTER LAB
              </button>
              <button
                onClick={handleEnter}
                className="px-4 py-2.5 rounded-lg border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 text-sm transition-all duration-200"
              >
                Skip Intro
              </button>
            </motion.div>
          )}
        </div>

        {/* Skip button (always visible during animation) */}
        {!showButton && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={handleSkip}
            className="mt-4 px-4 py-2 text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            Skip intro →
          </motion.button>
        )}
      </div>
    </div>
  );
}
