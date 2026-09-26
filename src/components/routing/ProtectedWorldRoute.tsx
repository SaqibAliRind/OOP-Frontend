import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, Compass } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { learningProgressionService } from '@/services/learningProgressionService';

export function ProtectedWorldRoute({ children }: { children: React.ReactNode }) {
  const { worldId } = useParams<{ worldId: string }>();

  if (!worldId) return <Navigate to="/3d" replace />;

  const access = learningProgressionService.getWorldAccess(worldId);

  if (access.locked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#0f172a] to-[#0a0f1a] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card variant="elevated" padding="lg" className="text-center max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent-warning)]/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-[var(--color-accent-warning)]" />
            </div>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
              World Locked
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-2">
              Complete the required lessons first.
            </p>
            {access.requiredModuleTitle && (
              <p className="text-sm text-[var(--color-text-tertiary)] mb-6">
                Required: <span className="text-[var(--color-accent-primary)] font-medium">{access.requiredModuleTitle}</span>
              </p>
            )}
            <div className="flex flex-col gap-3">
              <Button asChild className="gap-2">
                <Link to="/learn">
                  <Compass className="w-4 h-4" />
                  Continue Learning
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/3d">Back to Worlds</Link>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
