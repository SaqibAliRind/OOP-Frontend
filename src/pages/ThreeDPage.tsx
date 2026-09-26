import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Box, PlayCircle, Zap, Star } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Card, Badge, Button, Tabs, LucideIcon } from '@/components/ui';
import { getSceneConfigsForModule, getThreeDSceneConfig } from '@/data/threeDScenes';
import { SceneLoader } from '@/components/three';
import { curriculumService } from '@/services/curriculumService';
import { staggerChildren, slideUp } from '@/utils/motion';
import { motion as fm } from 'framer-motion';

export function ThreeDPage() {
  const { sceneId } = useParams<{ sceneId?: string }>();
  const modules = curriculumService.getCurriculum().modules;

  if (sceneId) {
    const sceneConfig = getThreeDSceneConfig(sceneId);
    if (sceneConfig) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">{sceneConfig.name}</h1>
              <p className="text-sm text-[var(--color-text-secondary)]">{sceneConfig.description}</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/3d/scenes">Back to Scenes</Link>
            </Button>
          </div>
          <SceneLoader sceneId={sceneId} />
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Card variant="elevated" padding="lg" className="text-center">
          <p className="text-[var(--color-text-secondary)] mb-4">Scene not found: {sceneId}</p>
          <Button asChild><Link to="/3d/scenes">Back to Scenes</Link></Button>
        </Card>
      </div>
    );
  }

  const tabs = [
    { id: 'all', label: 'All Scenes', icon: Box },
    { id: 'foundation', label: 'Foundation', icon: Zap },
    { id: 'oop', label: 'OOP Concepts', icon: Star },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">3D Universe Lab</h1>
        <p className="text-[var(--color-text-secondary)] mt-1">Explore OOP concepts in immersive 3D visualizations</p>
      </motion.div>

      <Tabs tabs={tabs} variant="pills">
        {(tabId) => (
          <fm.div variants={staggerChildren(0.06)} initial="hidden" animate="visible" className="mt-6">
            {tabId === 'all' && (
              <div className="space-y-10">
                {modules.map(module => {
                  const scenes = getSceneConfigsForModule(module.id);
                  if (scenes.length === 0) return null;
                  return (
                    <fm.div key={module.id} variants={slideUp}>
                      <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                        <LucideIcon icon={module.icon} className={cn('w-5 h-5', `text-[${module.color}]`)} />
                        {module.title}
                      </h2>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {scenes.map((scene) => (
                          <Card key={scene.id} variant="outlined" padding="lg" className="h-full group card-glow-hover">
                            <div className="flex items-center justify-between mb-3">
                              <Badge variant="secondary" size="sm">{scene.sceneType}</Badge>
                              <Badge variant="outline" size="sm">{scene.qualityPreset}</Badge>
                            </div>
                            <h3 className="font-semibold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-accent-primary)] transition-colors">{scene.name}</h3>
                            <p className="text-sm text-[var(--color-text-secondary)] mb-3 line-clamp-2">{scene.description}</p>
                            <Button variant="primary" size="sm" className="w-full gap-1.5" asChild>
                              <Link to={`/3d/scenes/${scene.id}`}>
                                <PlayCircle className="w-4 h-4" />
                                Enter Lab
                              </Link>
                            </Button>
                          </Card>
                        ))}
                      </div>
                    </fm.div>
                  );
                })}
              </div>
            )}
            {tabId === 'foundation' && (
              <Card variant="elevated" padding="lg" className="text-center py-12">
                <Box className="w-14 h-14 mx-auto mb-4 text-[var(--color-text-tertiary)]" />
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">Foundation Scenes</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">Interactive 3D visualizations for OOP fundamentals</p>
                <Button variant="primary" asChild className="gap-1.5">
                  <Link to="/3d/scenes/scene-foundation-intro">
                    <PlayCircle className="w-4 h-4" />
                    Start Foundation Lab
                  </Link>
                </Button>
              </Card>
            )}
            {tabId === 'oop' && (
              <Card variant="elevated" padding="lg" className="text-center py-12">
                <Star className="w-14 h-14 mx-auto mb-4 text-[var(--color-text-tertiary)]" />
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">OOP Concept Labs</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">Visualize Encapsulation, Inheritance, Polymorphism, Abstraction</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button variant="outline" size="sm" asChild><Link to="/3d/scenes/scene-encapsulation-vault">Encapsulation Vault</Link></Button>
                  <Button variant="outline" size="sm" asChild><Link to="/3d/scenes/scene-inheritance-hierarchy">Inheritance Tower</Link></Button>
                  <Button variant="outline" size="sm" asChild><Link to="/3d/scenes/scene-polymorphism-zoo">Polymorphism Zoo</Link></Button>
                </div>
              </Card>
            )}
          </fm.div>
        )}
      </Tabs>
    </div>
  );
}
