import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, Command, ArrowUp, ArrowDown, CornerDownLeft } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { searchService } from '@/services/searchService';
import { SearchResults } from './SearchResults';
import type { SearchResult } from '@/types';

interface CommandSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

function getNavigationPath(result: SearchResult): string {
  switch (result.type) {
    case 'module':
      return `/module/${result.id}`;
    case 'lesson':
      return `/lesson/${result.id}`;
    case 'concept':
      return `/lesson/${result.lessonId}`;
    case 'question':
      return `/practice`;
    case 'scenario':
      return `/practice`;
    case 'mistake':
      return `/debug`;
    default:
      return '/';
  }
}

export function CommandSearch({ isOpen, onClose, onNavigate }: CommandSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load recent searches
  useEffect(() => {
    if (isOpen) {
      setRecentSearches(searchService.getRecentSearches());
    }
  }, [isOpen]);

  // Auto-focus input on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Global Ctrl+K listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Dispatch a custom event or call a global open function
          // For now, we rely on the parent managing isOpen
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Search when query changes
  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchService.search(query);
      setResults(searchResults);
      setHighlightedIndex(0);
    } else {
      setResults([]);
      setHighlightedIndex(0);
    }
  }, [query]);

  // Reset state on close
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setHighlightedIndex(0);
    }
  }, [isOpen]);

  const handleSelect = useCallback(
    (result: SearchResult) => {
      const path = getNavigationPath(result);
      searchService.addRecentSearch(result.title);
      onClose();
      onNavigate(path);
    },
    [onClose, onNavigate]
  );

  const handleRecentSearch = useCallback(
    (term: string) => {
      setQuery(term);
      inputRef.current?.focus();
    },
    []
  );

  const displayItems = useMemo(() => {
    if (query.trim()) return results;
    return [];
  }, [query, results]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex(prev => {
          const max = displayItems.length;
          return max === 0 ? 0 : (prev + 1) % max;
        });
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex(prev => {
          const max = displayItems.length;
          return max === 0 ? 0 : (prev - 1 + max) % max;
        });
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        if (displayItems.length > 0 && highlightedIndex < displayItems.length) {
          handleSelect(displayItems[highlightedIndex]);
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, displayItems, highlightedIndex, handleSelect]);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Dialog */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className={cn(
              'relative w-full max-w-[580px] mx-4',
              'bg-[var(--color-bg-card)] border border-[var(--color-border-primary)]',
              'rounded-2xl shadow-2xl overflow-hidden'
            )}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-border-primary)]">
              <Search className="w-5 h-5 text-[var(--color-text-tertiary)] flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search modules, lessons, concepts…"
                className={cn(
                  'flex-1 bg-transparent text-base font-normal',
                  'text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]',
                  'outline-none'
                )}
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  className="flex-shrink-0 p-1 rounded-md hover:bg-[var(--color-bg-tertiary)] transition-colors"
                >
                  <X className="w-4 h-4 text-[var(--color-text-tertiary)]" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--color-bg-tertiary)] text-[10px] font-mono text-[var(--color-text-tertiary)] border border-[var(--color-border-primary)]">
                ESC
              </kbd>
            </div>

            {/* Results / Recent / Empty */}
            <div className="min-h-[200px] max-h-[450px] overflow-y-auto custom-scrollbar">
              {query.trim() ? (
                results.length > 0 ? (
                  <SearchResults
                    results={results}
                    onSelect={handleSelect}
                    highlightedIndex={highlightedIndex}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 px-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center mb-3">
                      <Search className="w-5 h-5 text-[var(--color-text-tertiary)]" />
                    </div>
                    <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">
                      No results found
                    </p>
                    <p className="text-xs text-[var(--color-text-tertiary)] text-center">
                      Try searching for a module, lesson, or concept
                    </p>
                  </div>
                )
              ) : (
                <div className="p-4">
                  {recentSearches.length > 0 && (
                    <>
                      <div className="flex items-center gap-2 px-2 mb-2">
                        <Clock className="w-3 h-3 text-[var(--color-text-tertiary)]" />
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)]">
                          Recent
                        </span>
                      </div>
                      {recentSearches.map(term => (
                        <button
                          key={term}
                          onClick={() => handleRecentSearch(term)}
                          className={cn(
                            'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left',
                            'hover:bg-[var(--color-bg-tertiary)] transition-colors'
                          )}
                        >
                          <Clock className="w-3.5 h-3.5 text-[var(--color-text-tertiary)] flex-shrink-0" />
                          <span className="text-sm text-[var(--color-text-secondary)]">
                            {term}
                          </span>
                        </button>
                      ))}
                    </>
                  )}

                  <div className="flex items-center gap-2 px-2 mb-2 mt-4">
                    <Command className="w-3 h-3 text-[var(--color-text-tertiary)]" />
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)]">
                      Quick Actions
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 px-2">
                    {[
                      { label: 'Go to Practice', path: '/practice', icon: '🎯' },
                      { label: 'Go to Debug', path: '/debug', icon: '🐛' },
                      { label: 'Go to Assessment', path: '/assessment', icon: '📝' },
                      { label: 'Go to 3D Lab', path: '/3d', icon: '🔬' },
                    ].map(action => (
                      <button
                        key={action.path}
                        onClick={() => {
                          onClose();
                          onNavigate(action.path);
                        }}
                        className={cn(
                          'flex items-center gap-2 px-3 py-2.5 rounded-lg text-left',
                          'bg-[var(--color-bg-tertiary)]/50 hover:bg-[var(--color-bg-tertiary)]',
                          'border border-[var(--color-border-primary)] hover:border-[var(--color-border-secondary)]',
                          'transition-all duration-150'
                        )}
                      >
                        <span className="text-base">{action.icon}</span>
                        <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                          {action.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-2.5 border-t border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)]/30">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-[10px] text-[var(--color-text-tertiary)]">
                  <ArrowUp className="w-3 h-3" />
                  <ArrowDown className="w-3 h-3" />
                  <span>Navigate</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[var(--color-text-tertiary)]">
                  <CornerDownLeft className="w-3 h-3" />
                  <span>Select</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-[var(--color-text-tertiary)]">
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] font-mono">
                  ⌘
                </kbd>
                <span>+</span>
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] font-mono">
                  K
                </kbd>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
