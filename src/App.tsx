import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from '@/components/ui/Toast';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { MainLayout } from '@/components/layout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ProtectedLessonRoute } from '@/components/routing/ProtectedLessonRoute';
import { ProtectedModuleRoute } from '@/components/routing/ProtectedModuleRoute';
import { ProtectedWorldRoute } from '@/components/routing/ProtectedWorldRoute';
import { FeedbackWidget } from '@/components/ui';

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)]" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center animate-pulse">
          <div className="w-5 h-5 bg-white/20 rounded-md" />
        </div>
        <p className="text-sm text-[var(--color-text-tertiary)] font-mono">Loading...</p>
      </div>
    </div>
  );
}

const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })));
const LearnPage = lazy(() => import('@/pages/LearnPage').then(m => ({ default: m.LearnPage })));
const CurriculumPage = lazy(() => import('@/pages/CurriculumPage').then(m => ({ default: m.CurriculumPage })));
const ModulePage = lazy(() => import('@/pages/ModulePage').then(m => ({ default: m.ModulePage })));
const LessonPage = lazy(() => import('@/pages/LessonPage').then(m => ({ default: m.LessonPage })));
const PracticePage = lazy(() => import('@/pages/PracticePage').then(m => ({ default: m.PracticePage })));
const OOPLabPage = lazy(() => import('@/pages/OOPLabPage').then(m => ({ default: m.OOPLabPage })));
const WorldSelector = lazy(() => import('@/pages/WorldSelector').then(m => ({ default: m.default })));
const WorldLabPage = lazy(() => import('@/pages/WorldLabPage').then(m => ({ default: m.default })));
const RelationshipLabPage = lazy(() => import('@/pages/RelationshipLabPage').then(m => ({ default: m.default })));
const SolidLabPage = lazy(() => import('@/pages/SolidLabPage').then(m => ({ default: m.default })));
const LearningPathPage = lazy(() => import('@/pages/LearningPathPage').then(m => ({ default: m.default })));
const StudySessionPage = lazy(() => import('@/pages/StudySessionPage').then(m => ({ default: m.StudySessionPage })));
const ThreeDPage = lazy(() => import('@/pages/ThreeDPage').then(m => ({ default: m.ThreeDPage })));
const ChallengesPage = lazy(() => import('@/pages/ChallengesPage').then(m => ({ default: m.ChallengesPage })));
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage').then(m => ({ default: m.default })));
const ProjectSimulatorPage = lazy(() => import('@/pages/ProjectSimulatorPage').then(m => ({ default: m.default })));
const BossChallengePage = lazy(() => import('@/pages/BossChallengePage').then(m => ({ default: m.default })));
const CodeStudioPage = lazy(() => import('@/pages/CodeStudioPage').then(m => ({ default: m.CodeStudioPage })));
const PlaygroundPage = lazy(() => import('@/pages/PlaygroundPage').then(m => ({ default: m.default })));
const DebugPage = lazy(() => import('@/pages/DebugPage').then(m => ({ default: m.DebugPage })));
const QuizPage = lazy(() => import('@/pages/QuizPage').then(m => ({ default: m.QuizPage })));
const AssessmentCenter = lazy(() => import('@/pages/AssessmentCenter').then(m => ({ default: m.AssessmentCenter })));
const ExamPrepPage = lazy(() => import('@/pages/ExamPrepPage').then(m => ({ default: m.ExamPrepPage })));
const ProgressPage = lazy(() => import('@/pages/ProgressPage').then(m => ({ default: m.ProgressPage })));
const AchievementsPage = lazy(() => import('@/pages/AchievementsPage').then(m => ({ default: m.AchievementsPage })));
const SettingsPage = lazy(() => import('@/pages/SettingsPage').then(m => ({ default: m.SettingsPage })));
const AssistantPage = lazy(() => import('@/pages/AssistantPage').then(m => ({ default: m.AssistantPage })));
const KnowledgePage = lazy(() => import('@/pages/KnowledgePage').then(m => ({ default: m.KnowledgePage })));
const OnboardingPage = lazy(() => import('@/pages/OnboardingPage').then(m => ({ default: m.OnboardingPage })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

function AppRoutes() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* 3D Lab - Full screen, no MainLayout */}
        <Route path="/3d" element={<WorldSelector />} />
        <Route path="/3d/lab" element={<OOPLabPage />} />
        <Route path="/3d/relationships" element={<RelationshipLabPage />} />
        <Route path="/3d/solid" element={<SolidLabPage />} />
        <Route path="/learning-path" element={<LearningPathPage />} />
        <Route path="/study-session" element={<StudySessionPage />} />
        <Route path="/3d/world/:worldId" element={<ProtectedWorldRoute><WorldLabPage /></ProtectedWorldRoute>} />

        <Route element={<MainLayout />}>
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/curriculum" element={<CurriculumPage />} />
          <Route path="/module/:moduleId" element={<ProtectedModuleRoute><ModulePage /></ProtectedModuleRoute>} />
          <Route path="/lesson/:lessonId" element={<ProtectedLessonRoute><LessonPage /></ProtectedLessonRoute>} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/3d/scenes" element={<ThreeDPage />} />
          <Route path="/3d/scenes/:sceneId" element={<ThreeDPage />} />
          <Route path="/challenges" element={<ChallengesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectSimulatorPage />} />
          <Route path="/boss/:bossId" element={<BossChallengePage />} />
          <Route path="/code-studio" element={<CodeStudioPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/debug" element={<DebugPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/assessment" element={<AssessmentCenter />} />
          <Route path="/exam-prep" element={<ExamPrepPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="/knowledge" element={<KnowledgePage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </Suspense>
      <FeedbackWidget />
    </ErrorBoundary>
  );
}

function App() {
  return (
    <ToastProvider>
      <LanguageProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </LanguageProvider>
    </ToastProvider>
  );
}

export default App;
