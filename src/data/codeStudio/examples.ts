import type { JavaCodeExample } from '@/types/codeStudio';
import { BASIC_EXAMPLES } from './examplesBasics';
import { OOP_CORE_EXAMPLES } from './examplesOopCore';
import { ADVANCED_EXAMPLES } from './examplesAdvanced';

export const JAVA_CODE_EXAMPLES: JavaCodeExample[] = [
  ...BASIC_EXAMPLES,
  ...OOP_CORE_EXAMPLES,
  ...ADVANCED_EXAMPLES,
];
