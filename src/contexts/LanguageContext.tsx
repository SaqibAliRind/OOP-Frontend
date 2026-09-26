import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type ContentLanguage = 'en' | 'ur';

interface LanguageContextValue {
  language: ContentLanguage;
  setLanguage: (lang: ContentLanguage) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<ContentLanguage>(() => {
    if (typeof window === 'undefined') return 'en';
    return (localStorage.getItem('oop-universe-lang') as ContentLanguage) || 'en';
  });

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: (lang) => {
        setLanguage(lang);
        localStorage.setItem('oop-universe-lang', lang);
      },
      toggleLanguage: () => {
        setLanguage(prev => {
          const next = prev === 'en' ? 'ur' : 'en';
          localStorage.setItem('oop-universe-lang', next);
          return next;
        });
      },
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
