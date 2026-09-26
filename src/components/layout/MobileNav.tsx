import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Target, Box, Bug, BarChart2, Trophy, Layers, Award, Terminal } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { LucideIcon } from '@/components/ui';

const items = [
  { href: '/', label: 'Home', icon: Home, end: true },
  { href: '/learn', label: 'Learn', icon: BookOpen },
  { href: '/curriculum', label: 'Curriculum', icon: Layers },
  { href: '/practice', label: 'Practice', icon: Target },
  { href: '/3d', label: '3D Lab', icon: Box },
  { href: '/playground', label: 'Playground', icon: Terminal },
  { href: '/quiz', label: 'Quiz', icon: Award },
  { href: '/debug', label: 'Debug', icon: Bug },
  { href: '/progress', label: 'Progress', icon: BarChart2 },
  { href: '/challenges', label: 'Challenges', icon: Trophy },
];

export function MobileNav() {
  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-[var(--z-fixed)] border-t border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)]/95 backdrop-blur-md"
      aria-label="Mobile navigation"
    >
      <ul className="flex justify-around gap-0 overflow-x-auto">
        {items.map(item => (
          <li key={item.href} className="flex-shrink-0">
            <NavLink
              to={item.href}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center py-2 px-2 text-[9px] gap-0.5 min-w-[48px]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-border-focus)]',
                  isActive ? 'text-[var(--color-accent-primary)]' : 'text-[var(--color-text-tertiary)]'
                )
              }
            >
              <LucideIcon icon={item.icon} className="w-4 h-4" aria-hidden={true} />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
