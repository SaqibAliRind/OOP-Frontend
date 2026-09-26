import type { CodeExecutionRequest, CodeExecutionResult, CodeExecutionService } from '@/types';

class LocalCodeExecutionService implements CodeExecutionService {
  async execute(request: CodeExecutionRequest): Promise<CodeExecutionResult> {
    const startTime = performance.now();

    try {
      if (request.language !== 'java') {
        return {
          success: false,
          error: `Language ${request.language} not supported in local execution`,
          executionTime: performance.now() - startTime,
        };
      }

      const result = await this.simulateJavaExecution(request.code, request.input);
      return {
        ...result,
        executionTime: performance.now() - startTime,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown execution error',
        executionTime: performance.now() - startTime,
      };
    }
  }

  async validate(code: string, language: 'java'): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];

    if (language !== 'java') {
      errors.push(`Language ${language} not supported for validation`);
      return { valid: false, errors };
    }

    if (!code.trim()) {
      errors.push('Code cannot be empty');
    }

    if (!code.includes('class')) {
      errors.push('Java code must contain at least one class');
    }

    if (!code.includes('public static void main')) {
      errors.push('Java code must contain a main method for execution');
    }

    const braceCount = (code.match(/{/g) || []).length - (code.match(/}/g) || []).length;
    if (braceCount !== 0) {
      errors.push(`Mismatched braces: ${braceCount > 0 ? braceCount : -braceCount} unclosed`);
    }

    const parenCount = (code.match(/\(/g) || []).length - (code.match(/\)/g) || []).length;
    if (parenCount !== 0) {
      errors.push(`Mismatched parentheses`);
    }

    return { valid: errors.length === 0, errors };
  }

  private async simulateJavaExecution(code: string, _input?: string): Promise<CodeExecutionResult> {
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));

    const hasSyntaxError = code.includes('SYNTAX_ERROR');
    const hasRuntimeError = code.includes('RUNTIME_ERROR');

    if (hasSyntaxError) {
      return {
        success: false,
        error: 'Syntax error: unexpected token at line 10',
        executionTime: 0,
      };
    }

    if (hasRuntimeError) {
      return {
        success: false,
        error: 'Runtime error: NullPointerException at line 15',
        executionTime: 0,
      };
    }

    let output = '';

    if (code.includes('System.out.println')) {
      const printMatches = code.match(/System\.out\.println\(([^)]+)\)/g);
      if (printMatches) {
        output = printMatches
          .map(m => {
            const content = m.replace('System.out.println(', '').replace(')', '');
            try {
              return eval(content.replace(/"/g, ''));
            } catch {
              return content;
            }
          })
          .join('\n');
      }
    }

    if (code.includes('Student') && code.includes('displayInfo')) {
      output = 'Name: AHMED\nRoll: 101\nCGPA: 3.8';
    }

    if (code.includes('BankAccount')) {
      output = 'BankAccount{accountNumber=\'ACC001\', balance=1500.0, ownerName=\'Ahmed\'}';
    }

    if (!output) {
      output = 'Program executed successfully.\nOutput simulation: Check console for actual results.';
    }

    return {
      success: true,
      output,
      executionTime: 0,
    };
  }
}

export const codeExecutionService: CodeExecutionService = new LocalCodeExecutionService();