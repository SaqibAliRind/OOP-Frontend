import type { Module, Curriculum } from '@/types';
import { module01 } from './module01';
import { module02 } from './module02';
import { module03 } from './module03';
import { module04 } from './module04';
import { module05 } from './module05';
import { module06 } from './module06';
import { module07 } from './module07';
import { module08 } from './module08';
import { module09 } from './module09';
import { module10 } from './module10';
import { module11 } from './module11';
import { module12 } from './module12';
import { module13 } from './module13';
import { module14 } from './module14';
import { module15 } from './module15';

const allModules: Module[] = [
  module01,
  module02,
  module03,
  module04,
  module05,
  module06,
  module07,
  module08,
  module09,
  module10,
  module11,
  module12,
  module13,
  module14,
  module15,
];

const totalLessons = allModules.reduce((sum, m) => sum + m.lessons.length, 0);
const totalDuration = allModules.reduce((sum, m) => sum + m.totalDuration, 0);
const totalXp = allModules.reduce((sum, m) => sum + m.xpReward, 0);

export const curriculum: Curriculum = {
  modules: allModules,
  totalLessons,
  totalDuration,
  totalXp,
};

export const learningPaths: Record<string, { id: string; title: string; description: string; moduleIds: string[]; estimatedDuration: number; difficulty: 'beginner' | 'intermediate' | 'advanced' }> = {
  'beginner-path': {
    id: 'beginner-path',
    title: 'OOP Fundamentals Track',
    description: 'Complete foundation for university OOP exams',
    moduleIds: ['module-01', 'module-02', 'module-03', 'module-04', 'module-05'],
    estimatedDuration: 540,
    difficulty: 'beginner',
  },
  'intermediate-path': {
    id: 'intermediate-path',
    title: 'Core OOP Mastery',
    description: 'Polymorphism, Abstraction, Interfaces, and Design Principles',
    moduleIds: ['module-06', 'module-07', 'module-08', 'module-13', 'module-14'],
    estimatedDuration: 640,
    difficulty: 'intermediate',
  },
  'advanced-path': {
    id: 'advanced-path',
    title: 'Advanced Java OOP',
    description: 'Collections, Exceptions, Modern Java Features, Capstone',
    moduleIds: ['module-09', 'module-10', 'module-11', 'module-12', 'module-15'],
    estimatedDuration: 580,
    difficulty: 'advanced',
  },
};
