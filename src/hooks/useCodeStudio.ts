import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  CodeStudioMode,
  CodeStudioProgress,
  JavaCodeExample,
} from '@/types/codeStudio';
import {
  getStudioExample,
  getStudioExamples,
  getCodeStudioCategories,
} from '@/data/codeStudio';
import type { CodeStudioCategory } from '@/types/codeStudio';
import {
  loadCodeStudioProgress,
  saveCodeStudioProgress,
  markExampleExplored,
  markExampleTraced,
  recordChallengeResult,
  syncMissionProgress,
  markLinesExplained,
} from '@/services/codeStudioService';

function applyAndSync(progress: CodeStudioProgress): CodeStudioProgress {
  const synced = syncMissionProgress(progress);
  saveCodeStudioProgress(synced);
  return synced;
}

export function useCodeStudio(initialExampleId?: string) {
  const [progress, setProgress] = useState<CodeStudioProgress>(() => loadCodeStudioProgress());
  const [selectedExampleId, setSelectedExampleId] = useState<string>(
    () => initialExampleId || getStudioExamples()[0]?.id || ''
  );
  const [mode, setMode] = useState<CodeStudioMode>('explore');
  const [activeLine, setActiveLine] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<CodeStudioCategory | 'all'>('all');
  const [selectedLineIndex, setSelectedLineIndex] = useState<number>(0);
  const [allLinesRead, setAllLinesRead] = useState<Record<string, boolean>>({});
  const openedRef = useRef<string | null>(null);

  const categories = useMemo(() => getCodeStudioCategories(), []);
  const examples = useMemo(
    () => getStudioExamples(selectedCategory === 'all' ? undefined : selectedCategory),
    [selectedCategory]
  );
  const example: JavaCodeExample | undefined = useMemo(
    () => getStudioExample(selectedExampleId),
    [selectedExampleId]
  );

  const lineExplanations = useMemo(() => example?.lineExplanations ?? [], [example]);

  useEffect(() => {
    if (!example) return;
    if (openedRef.current === example.id) return;
    openedRef.current = example.id;
    setProgress(prev => applyAndSync(markExampleExplored(prev, example.id)));
    setActiveLine(1);
    setSelectedLineIndex(0);
  }, [example]);

  useEffect(() => {
    if (!example) return;
    if (mode === 'explore' && allLinesRead[example.id]) {
      const flag = example.id === 'cs-ex-01' ? '_helloLines' : example.id === 'cs-ex-03' ? '_studentLines' : null;
      if (flag) {
        setProgress(prev => applyAndSync(markLinesExplained(prev, example.id, flag)));
      }
    }
  }, [mode, allLinesRead, example]);

  const selectExample = useCallback((id: string) => {
    setSelectedExampleId(id);
    setMode('explore');
  }, []);

  const selectLine = useCallback(
    (lineNumber: number, explanationIndex?: number) => {
      setActiveLine(lineNumber);
      if (explanationIndex !== undefined) {
        setSelectedLineIndex(explanationIndex);
      } else {
        const idx = lineExplanations.findIndex(e => e.line === lineNumber);
        if (idx >= 0) setSelectedLineIndex(idx);
      }
      if (example) {
        setAllLinesRead(prev => {
          if (prev[example.id]) return prev;
          const next = { ...prev, [example.id]: false };
          return next;
        });
      }
    },
    [lineExplanations, example]
  );

  const markCurrentLineRead = useCallback(() => {
    if (!example) return;
    const total = lineExplanations.length;
    if (total === 0) return;
    const readCount = selectedLineIndex + 1;
    if (readCount < total) {
      setSelectedLineIndex(i => Math.min(i + 1, total - 1));
      const nextExp = lineExplanations[Math.min(readCount, total - 1)];
      if (nextExp) setActiveLine(nextExp.line);
    }
    if (readCount >= total) {
      setAllLinesRead(prev => {
        if (prev[example.id]) return prev;
        const next = { ...prev, [example.id]: true };
        if (example.id === 'cs-ex-01' || example.id === 'cs-ex-03') {
          const flag = example.id === 'cs-ex-01' ? ('_helloLines' as const) : ('_studentLines' as const);
          queueMicrotask(() => {
            setProgress(p => applyAndSync(markLinesExplained(p, example.id, flag)));
          });
        }
        return next;
      });
    }
  }, [example, selectedLineIndex, lineExplanations]);

  const prevExplanation = useCallback(() => {
    if (!example || lineExplanations.length === 0) return;
    setSelectedLineIndex(i => {
      const next = Math.max(0, i - 1);
      setActiveLine(lineExplanations[next].line);
      return next;
    });
  }, [example, lineExplanations]);

  const nextExplanation = useCallback(() => {
    if (!example || lineExplanations.length === 0) return;
    setSelectedLineIndex(i => {
      const next = Math.min(lineExplanations.length - 1, i + 1);
      setActiveLine(lineExplanations[next].line);
      return next;
    });
    markCurrentLineRead();
  }, [example, lineExplanations, markCurrentLineRead]);

  const recordResult = useCallback(
    (kind: 'prediction' | 'completion' | 'analysis' | 'debug', challengeId: string, correct: boolean) => {
      setProgress(prev => applyAndSync(recordChallengeResult(prev, kind, challengeId, correct)));
    },
    []
  );

  const markTraced = useCallback((exampleId: string) => {
    setProgress(prev => applyAndSync(markExampleTraced(prev, exampleId)));
  }, []);

  const currentExplanation = lineExplanations[selectedLineIndex] ?? lineExplanations[0];

  const stats = useMemo(() => {
    const correctPredictions = Object.values(progress.predictionResults).filter(Boolean).length;
    const correctCompletions = Object.values(progress.completionResults).filter(Boolean).length;
    const correctAnalyses = Object.values(progress.analysisResults).filter(Boolean).length;
    const correctDebugs = Object.values(progress.debugResults).filter(Boolean).length;
    return {
      explored: progress.exploredExamples.length,
      traced: progress.tracedExamples.length,
      correctPredictions,
      correctCompletions,
      correctAnalyses,
      correctDebugs,
      missionsCompleted: progress.completedMissions.length,
    };
  }, [progress]);

  return {
    categories,
    examples,
    example,
    selectedExampleId,
    selectExample,
    selectedCategory,
    setSelectedCategory,
    mode,
    setMode,
    activeLine,
    setActiveLine,
    selectLine,
    lineExplanations,
    currentExplanation,
    selectedLineIndex,
    prevExplanation,
    nextExplanation,
    markCurrentLineRead,
    allLinesRead: allLinesRead[selectedExampleId] === true,
    progress,
    recordResult,
    markTraced,
    stats,
  };
}
