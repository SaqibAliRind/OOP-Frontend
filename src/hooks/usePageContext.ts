import { useLocation } from 'react-router-dom';

const titles: Record<string, string> = {
  '/learn': 'Learn',
  '/curriculum': 'Curriculum',
  '/practice': 'Practice Center',
  '/3d': '3D Universe Lab',
  '/challenges': 'Challenges',
  '/debug': 'Debug Lab',
  '/quiz': 'Quiz Center',
  '/progress': 'Progress',
  '/achievements': 'Achievements',
  '/settings': 'Settings',
};

export function usePageContext(): { title: string; subtitle?: string } {
  const { pathname } = useLocation();

  if (pathname.startsWith('/lesson/')) {
    return { title: 'Lesson', subtitle: 'Interactive OOP session' };
  }
  if (pathname.startsWith('/module/')) {
    return { title: 'Module', subtitle: 'Structured learning unit' };
  }
  if (pathname.startsWith('/3d/')) {
    return { title: '3D Scene', subtitle: 'Visual OOP lab' };
  }

  const base = Object.keys(titles).find(key => pathname === key || pathname.startsWith(`${key}/`));
  return { title: base ? titles[base] : 'OOP Universe', subtitle: 'Java Object-Oriented Programming' };
}
