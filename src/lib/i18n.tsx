'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Lang = 'en' | 'bm';

const STORAGE_KEY = 'ehartanah_lang';

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => {},
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'bm') setLangState(saved);
  }, []);

  function setLang(next: Lang) {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  function toggleLang() {
    setLang(lang === 'en' ? 'bm' : 'en');
  }

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
