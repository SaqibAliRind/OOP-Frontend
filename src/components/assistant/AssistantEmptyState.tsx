import { motion } from 'framer-motion';
import { Bot, Sparkles, Code2, GitCompare, BookOpen, GraduationCap } from 'lucide-react';

interface AssistantEmptyStateProps {
  onStarterSelect: (question: string) => void;
}

const starterTopics = [
  { icon: Code2, label: 'Classes & Objects', question: 'What is a class and an object in Java?' },
  { icon: GitCompare, label: 'Inheritance vs Polymorphism', question: 'What is the difference between inheritance and polymorphism?' },
  { icon: BookOpen, label: 'Encapsulation', question: 'Explain encapsulation with an example' },
  { icon: GraduationCap, label: 'Interfaces', question: 'When should I use an interface over an abstract class?' },
];

const sampleQuestions = [
  'Explain the four pillars of OOP',
  'What is method overriding?',
  'Difference between == and .equals()?',
  'What is a constructor?',
];

export function AssistantEmptyState({ onStarterSelect }: AssistantEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-lg"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent-primary)]/10 border border-[var(--color-accent-primary)]/20 flex items-center justify-center">
              <Bot className="w-8 h-8 text-[var(--color-accent-primary)]" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="w-4 h-4 text-[var(--color-xp-gold)]" />
            </motion.div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">OOP ASSISTANT</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-8">
          Your personal OOP learning companion. Ask anything about object-oriented programming.
        </p>

        <div className="space-y-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)] mb-3">
              Get Started
            </p>
            <div className="grid grid-cols-2 gap-2">
              {starterTopics.map((topic, i) => (
                <motion.button
                  key={topic.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 + i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onStarterSelect(topic.question)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] hover:border-[var(--color-accent-primary)]/30 hover:bg-[var(--color-accent-primary)]/5 transition-all duration-150 text-left"
                >
                  <topic.icon className="w-4 h-4 text-[var(--color-accent-primary)] flex-shrink-0" />
                  <span className="text-xs font-medium text-[var(--color-text-secondary)]">{topic.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)] mb-3">
              Sample Questions
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {sampleQuestions.map((q, i) => (
                <motion.button
                  key={q}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.15, delay: 0.3 + i * 0.04 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onStarterSelect(q)}
                  className="px-3 py-1.5 text-xs rounded-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent-primary)]/30 transition-all duration-150"
                >
                  {q}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
