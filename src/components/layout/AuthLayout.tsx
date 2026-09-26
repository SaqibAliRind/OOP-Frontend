import { type ReactNode } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Panel } from '@/components/ui';

interface AuthLayoutProps {
  children?: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6" aria-label="OOP Universe Home">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <span className="font-display font-bold text-2xl text-[var(--color-text-primary)]">
              OOP Universe
            </span>
          </Link>
          <p className="text-[var(--color-text-secondary)]">
            Master Java Object-Oriented Programming
          </p>
        </div>

        <Panel variant="elevated" className="p-8 animate-in slide-in-from-bottom-4 duration-400">
          {children || <Outlet />}
        </Panel>

        <p className="text-center text-sm text-[var(--color-text-tertiary)] mt-6">
          By continuing, you agree to our{' '}
          <a href="#" className="text-[var(--color-accent-primary)] hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-[var(--color-accent-primary)] hover:underline">Privacy Policy</a>
        </p>
      </motion.div>
    </div>
  );
}