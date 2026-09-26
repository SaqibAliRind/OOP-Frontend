import { useState, useEffect, type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { cn } from '@/utils/helpers';

interface MainLayoutProps {
  children?: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeMobileSidebar = () => setMobileSidebarOpen(false);

  const sidebarExpanded = isMobile ? mobileSidebarOpen : sidebarOpen;

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <div className={cn(isMobile && !mobileSidebarOpen && 'hidden')}>
        <Sidebar
          isOpen={sidebarExpanded}
          onToggle={isMobile ? closeMobileSidebar : toggleSidebar}
        />
      </div>

      <TopBar
        onMenuClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        sidebarOpen={sidebarExpanded}
      />

      <main
        className={cn(
          'pt-[var(--topbar-height)] min-h-screen transition-all duration-300',
          'overflow-x-hidden'
        )}
        style={
          isMobile
            ? { marginLeft: 0 }
            : { marginLeft: sidebarOpen ? 'var(--sidebar-width)' : 'var(--sidebar-collapsed-width)' }
        }
        role="main"
      >
        <div className="p-4 md:p-6 lg:p-8 pb-20 lg:pb-8 animate-in fade-in duration-300 min-h-[calc(100vh-var(--topbar-height)-100px)]">
          {children || <Outlet />}
        </div>
        
        {/* Footer */}
        <footer className="w-full text-center py-6 border-t border-[var(--color-border-primary)] mt-auto bg-black/10">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Created by <span className="font-semibold text-[var(--color-accent-primary)]">Saqib Ali Rind</span>
          </p>
        </footer>
      </main>

      <MobileNav />

      {mobileSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[var(--z-fixed)] bg-black/50 lg:hidden"
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
}