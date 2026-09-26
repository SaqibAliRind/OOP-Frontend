import {
  AlertTriangle,
  Award,
  Box,
  Brain,
  Bug,
  Columns,
  Crown,
  Database,
  Filter,
  Flame,
  FunctionSquare,
  GitBranch,
  GitMerge,
  GraduationCap,
  HelpCircle,
  Layers,
  LayoutTemplate,
  Link2,
  Package,
  Shapes,
  Shield,
  Star,
  Target,
  Trophy,
  Wrench,
  type LucideIcon as LucideIconComponent,
  type LucideProps,
} from 'lucide-react';

const iconByName: Record<string, LucideIconComponent> = {
  'alert-triangle': AlertTriangle,
  award: Award,
  box: Box,
  brain: Brain,
  bug: Bug,
  columns: Columns,
  crown: Crown,
  cube: Box,
  database: Database,
  filter: Filter,
  flame: Flame,
  'function-square': FunctionSquare,
  'git-branch': GitBranch,
  'git-merge': GitMerge,
  'graduation-cap': GraduationCap,
  layers: Layers,
  'layout-template': LayoutTemplate,
  'link-2': Link2,
  package: Package,
  shapes: Shapes,
  shield: Shield,
  star: Star,
  target: Target,
  trophy: Trophy,
  wrench: Wrench,
};

export function resolveLucideIcon(icon: LucideIconComponent | string): LucideIconComponent {
  if (typeof icon !== 'string') {
    return icon;
  }
  return iconByName[icon] ?? HelpCircle;
}

export interface LucideIconProps extends LucideProps {
  icon: LucideIconComponent | string;
}

export function LucideIcon({ icon, className, ...props }: LucideIconProps) {
  const Icon = resolveLucideIcon(icon);
  return <Icon className={className} aria-hidden={props['aria-hidden'] ?? true} {...props} />;
}
