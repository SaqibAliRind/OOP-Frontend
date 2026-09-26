import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui';

export function NotFoundPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)] overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(ellipse,rgba(59,130,246,0.06),transparent_70%)]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.05),transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center px-4"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.34, 1.2, 0.64, 1] }}
        >
          <h1
            className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] font-bold leading-none select-none"
            style={{ fontSize: 'clamp(80px, 15vw, 140px)' }}
          >
            404
          </h1>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="font-[family-name:var(--font-family-display)] text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mt-4 mb-3 tracking-tight"
        >
          LOST IN THE OOP UNIVERSE
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-md mx-auto mb-10"
        >
          This route does not exist in our curriculum.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button size="lg" asChild className="group">
            <Link to="/">
              <Home className="w-5 h-5 mr-2" />
              Back Home
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/curriculum">
              <BookOpen className="w-5 h-5 mr-2" />
              Open Curriculum
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
