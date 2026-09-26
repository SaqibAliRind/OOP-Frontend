import type { OOPProjectScenario } from '@/types/projectSimulator';
import { universityProject } from './project01University';
import { bankingProject } from './project02Banking';
import { libraryProject } from './project03Library';
import { hospitalProject } from './project04Hospital';
import { vehicleProject } from './project05Vehicle';

export const PROJECT_SCENARIOS: OOPProjectScenario[] = [
  universityProject,
  bankingProject,
  libraryProject,
  hospitalProject,
  vehicleProject,
];

export function getProjectScenario(id: string): OOPProjectScenario | undefined {
  return PROJECT_SCENARIOS.find(p => p.id === id);
}
