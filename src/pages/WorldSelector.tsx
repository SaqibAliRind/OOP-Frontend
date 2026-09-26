import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Compass } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { getWorldsByDifficulty } from '@/data/worldConfigs';
import { learningProgressionService } from '@/services/learningProgressionService';
import type { WorldConfig } from '@/types/oopLab';

const difficultyOrder = ['beginner', 'easy', 'medium', 'hard'] as const;
const difficultyLabels: Record<string, { label: string; color: string; icon: string }> = {
  beginner: { label: 'Beginner', color: '#22c55e', icon: '🌱' },
  easy: { label: 'Easy', color: '#3b82f6', icon: '📘' },
  medium: { label: 'Medium', color: '#f59e0b', icon: '⚡' },
  hard: { label: 'Hard', color: '#ef4444', icon: '🔥' },
};

const sceneTypeIcons: Record<string, string> = {
  blueprint: '📐',
  factory: '🏭',
  vault: '🔒',
  hierarchy: '🌳',
  arena: '⚔️',
  'control-center': '🎛️',
  'contract-lab': '📋',
  'runtime-lab': '⚙️',
  'package-city': '🏙️',
  'exception-flow': '⚡',
  'collections-lab': '📦',
  'architecture-lab': '🏛️',
  'design-studio': '🎨',
};

export default function WorldSelector() {
  const navigate = useNavigate();
  const [selectedWorld, setSelectedWorld] = useState<WorldConfig | null>(null);

  const groupedWorlds = difficultyOrder.map(d => ({
    difficulty: d,
    ...difficultyLabels[d],
    worlds: getWorldsByDifficulty(d),
  }));

  const handleLaunch = (world: WorldConfig) => {
    navigate(`/3d/world/${world.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#0f172a] to-[#0a0f1a]">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-lg">🎓</span>
            <span className="text-sm text-white/70 font-medium">Interactive 3D Worlds</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            OOP <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">Universum</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Java OOP concepts ko interactive 3D worlds mein explore karo.
            Har world ek unique learning experience hai.
          </p>
        </motion.div>

        {/* Special World: Relationship Architect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div
            className="relative rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-emerald-500/10 backdrop-blur-sm p-6 cursor-pointer hover:border-purple-500/50 transition-all duration-300 group"
            onClick={() => navigate('/3d/relationships')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-4xl">🏗️</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-white">World 12 — Relationship Architect</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-medium">NEW</span>
                  </div>
                  <p className="text-sm text-white/50">Association, Aggregation, Composition, Dependency — interactive 3D relationships</p>
                  <p className="text-xs text-white/40 mt-1">100 XP Reward</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-500 transition-colors"
              >
                Launch →
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Special World: SOLID Architecture Lab */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div
            className="relative rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-red-500/10 backdrop-blur-sm p-6 cursor-pointer hover:border-emerald-500/50 transition-all duration-300 group"
            onClick={() => navigate('/3d/solid')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-4xl">🏛️</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-white">World 13 — SOLID Architecture Lab</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">NEW</span>
                  </div>
                  <p className="text-sm text-white/50">SRP, OCP, LSP, ISP, DIP — interactive refactoring & design principles</p>
                  <p className="text-xs text-white/40 mt-1">150 XP Reward</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
              >
                Launch →
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* World Groups */}
        {groupedWorlds.map(({ difficulty, label, color, icon, worlds }) => (
          <div key={difficulty} className="mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="text-2xl">{icon}</span>
              <h2 className="text-xl font-semibold" style={{ color }}>{label}</h2>
              <div className="flex-1 h-px bg-white/10 ml-3" />
              <span className="text-sm text-white/40">{worlds.length} worlds</span>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {worlds.map((world, idx) => {
                const isAccessible = learningProgressionService.canAccessWorld(world.id);
                const worldAccess = learningProgressionService.getWorldAccess(world.id);

                return (
                  <motion.div
                    key={world.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative"
                  >
                    <div
                      className={cn(
                        'relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 transition-all duration-300',
                        isAccessible
                          ? 'cursor-pointer hover:border-white/20 hover:bg-white/[0.06]'
                          : 'opacity-60 cursor-not-allowed'
                      )}
                      style={{ boxShadow: isAccessible ? `0 0 0 0 ${color}00` : 'none' }}
                      onClick={() => isAccessible && setSelectedWorld(world)}
                      onMouseEnter={(e) => {
                        if (isAccessible) (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${color}15`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 0 ${color}00`;
                      }}
                    >
                      {/* Scene type badge */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{isAccessible ? sceneTypeIcons[world.sceneType] : '🔒'}</span>
                          <span
                            className="text-xs font-medium px-2 py-1 rounded-full"
                            style={{ backgroundColor: `${color}20`, color }}
                          >
                            {world.moduleAssociation.replace('module-', 'M')}
                          </span>
                        </div>
                        <span className="text-sm text-white/40">{world.estimatedMinutes} min</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-white transition-colors">
                        {world.title}
                      </h3>
                      <p className="text-sm text-white/50 mb-1 font-medium">{world.titleUrdu}</p>

                      {/* Description */}
                      <p className="text-sm text-white/60 mb-4 line-clamp-2">
                        {world.description}
                      </p>

                      {/* Concept tag */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs px-2 py-1 rounded bg-white/5 text-white/50">
                          {world.concept}
                        </span>
                        <span className="text-xs text-white/30">•</span>
                        <span className="text-xs text-white/40">{world.conceptUrdu}</span>
                      </div>

                      {!isAccessible ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-white/40">
                            <Lock className="w-4 h-4" />
                            <span>Complete required lessons first</span>
                          </div>
                          {worldAccess.requiredModuleTitle && (
                            <p className="text-xs text-white/30">
                              Required: {worldAccess.requiredModuleTitle}
                            </p>
                          )}
                          <Link
                            to="/learn"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white/60 text-xs hover:bg-white/15 transition-colors"
                          >
                            <Compass className="w-3 h-3" />
                            Continue Learning
                          </Link>
                        </div>
                      ) : (
                        /* XP reward */
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-400 text-sm">⭐</span>
                            <span className="text-sm text-yellow-400/80">{world.xpReward} XP</span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLaunch(world);
                            }}
                            className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all"
                            style={{ backgroundColor: `${color}cc` }}
                          >
                            Launch →
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Info footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <span className="text-sm text-white/40">💡</span>
            <span className="text-sm text-white/50">
              Har world ke saath text explanations aur code examples bhi hain — 3D sirf visualization hai
            </span>
          </div>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedWorld && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedWorld(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#111827] border border-white/10 rounded-2xl max-w-lg w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{sceneTypeIcons[selectedWorld.sceneType]}</span>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedWorld.title}</h3>
                  <p className="text-sm text-white/50">{selectedWorld.titleUrdu}</p>
                </div>
              </div>

              <p className="text-white/70 mb-6">{selectedWorld.description}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Concept</span>
                  <span className="text-white font-medium">{selectedWorld.concept}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Difficulty</span>
                  <span style={{ color: difficultyLabels[selectedWorld.difficulty].color }}>
                    {difficultyLabels[selectedWorld.difficulty].label}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Time</span>
                  <span className="text-white">{selectedWorld.estimatedMinutes} minutes</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">XP Reward</span>
                  <span className="text-yellow-400">⭐ {selectedWorld.xpReward} XP</span>
                </div>
              </div>

              {/* Mission preview */}
              <div className="bg-white/5 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-semibold text-white/80 mb-2">Mission Preview</h4>
                <p className="text-sm text-white/60 mb-2">{selectedWorld.initialMission.description}</p>
                <p className="text-xs text-white/40">{selectedWorld.initialMission.descriptionUrdu}</p>
                <div className="mt-3 space-y-1">
                  {selectedWorld.initialMission.objectives.map(obj => (
                    <div key={obj.id} className="flex items-center gap-2 text-xs text-white/50">
                      <span>⬜</span>
                      <span>{obj.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedWorld(null)}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 text-white/60 text-sm hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                {learningProgressionService.canAccessWorld(selectedWorld.id) ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      handleLaunch(selectedWorld);
                      setSelectedWorld(null);
                    }}
                    className="flex-1 px-4 py-2.5 rounded-lg text-white text-sm font-medium transition-all"
                    style={{ backgroundColor: `${difficultyLabels[selectedWorld.difficulty].color}cc` }}
                  >
                    Launch World →
                  </motion.button>
                ) : (
                  <Link
                    to="/learn"
                    onClick={() => setSelectedWorld(null)}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 text-white/60 text-sm font-medium text-center hover:bg-white/15 transition-colors"
                  >
                    Continue Learning →
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
