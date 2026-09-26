import { useState, useRef, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { AssistantResponse, AssistantHistoryItem, AssistantContext } from '@/types/assistant';
import { assistantService } from '@/services/assistantService';
import { quickPrompts } from '@/data/assistant/assistantPrompts';
import { curriculumService } from '@/services/curriculumService';
import {
  AssistantShell,
  AssistantMessage,
  AssistantAnswer,
  AssistantQuickPrompts,
  AssistantEmptyState,
  AssistantInput,
  AssistantTyping,
} from '@/components/assistant';

export function AssistantPage() {
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get('lesson');
  const moduleId = searchParams.get('module');
  const prefill = searchParams.get('q');

  const [messages, setMessages] = useState<{ type: 'user' | 'assistant'; content?: string; response?: AssistantResponse }[]>([]);
  const [inputValue, setInputValue] = useState(prefill || '');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<AssistantHistoryItem[]>(assistantService.getHistory());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const context: AssistantContext | undefined = (() => {
    if (lessonId) {
      const lesson = curriculumService.getLesson(lessonId);
      const mod = lesson ? curriculumService.getModule(lesson.moduleId) : undefined;
      return {
        type: 'lesson',
        lessonId,
        moduleId: lesson?.moduleId || moduleId || undefined,
        lessonTitle: lesson?.title,
        moduleTitle: mod?.title,
      };
    }
    if (moduleId) {
      const mod = curriculumService.getModule(moduleId);
      return { type: 'module', moduleId, moduleTitle: mod?.title };
    }
    return undefined;
  })();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSend = useCallback(async (question: string) => {
    if (!question.trim() || isLoading) return;
    const userMsg = { type: 'user' as const, content: question };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);
    try {
      const response = await assistantService.processQuery({
        question,
        lessonId: lessonId || undefined,
        moduleId: moduleId || undefined,
      });
      setMessages(prev => [...prev, { type: 'assistant', content: question, response }]);
      setHistory(assistantService.getHistory());
    } catch {
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: question,
        response: { answer: 'Something went wrong. Please try again.' },
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, lessonId, moduleId, setMessages, setInputValue, setIsLoading, setHistory]);

  const prefillHandledRef = useRef(false);
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (prefill && !prefillHandledRef.current) {
      prefillHandledRef.current = true;
      handleSend(prefill);
    }
  }, [prefill, handleSend]);

  const handleQuickPrompt = useCallback((question: string) => {
    handleSend(question);
  }, [handleSend]);

  const handleStarterSelect = useCallback((question: string) => {
    handleSend(question);
  }, [handleSend]);

  const handleHistorySelect = useCallback((item: AssistantHistoryItem) => {
    handleSend(item.question);
  }, [handleSend]);

  const handleClearHistory = useCallback(() => {
    assistantService.clearHistory();
    setHistory([]);
  }, [setHistory]);

  return (
    <div className="h-[calc(100vh-var(--topbar-height))]">
      <AssistantShell
        history={history}
        onSelectHistory={handleHistorySelect}
        onClearHistory={handleClearHistory}
        context={context}
      >
        <div className="flex flex-col h-full">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {messages.length === 0 && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <AssistantEmptyState onStarterSelect={handleStarterSelect} />
                <div className="mt-8">
                  <AssistantQuickPrompts prompts={quickPrompts.slice(0, 6)} onSelect={handleQuickPrompt} />
                </div>
              </motion.div>
            )}

            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AssistantMessage type={msg.type} content={msg.content || ''} />
                {msg.type === 'assistant' && msg.response && (
                  <div className="mt-3">
                    <AssistantAnswer response={msg.response} />
                  </div>
                )}
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <AssistantTyping />
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar (shown when messages exist but no loading) */}
          {messages.length > 0 && !isLoading && (
            <div className="px-4 md:px-6 pb-2">
              <AssistantQuickPrompts prompts={quickPrompts.slice(0, 4)} onSelect={handleQuickPrompt} />
            </div>
          )}

          {/* Input */}
          <div className="p-4 md:p-6 border-t border-[var(--color-border-primary)]">
            <AssistantInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={() => handleSend(inputValue)}
              disabled={isLoading}
              placeholder="Ask OOP anything..."
            />
          </div>
        </div>
      </AssistantShell>
    </div>
  );
}
