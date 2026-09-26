import { motion } from 'framer-motion';

export function AssistantTyping() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-[var(--color-text-secondary)]">OOP Assistant is analyzing</span>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-primary)]"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
