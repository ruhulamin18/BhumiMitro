'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/types/land';
import { translations, TranslationDictionary } from '@/lib/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationDictionary;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default to Bangla ('bn') as per specification with localStorage fallback
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('bhumimitro_lang') as Language;
        if (saved === 'bn' || saved === 'en') {
          return saved;
        }
      } catch {
        // ignore
      }
    }
    return 'bn';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('bhumimitro_lang', newLang);
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    const next = lang === 'bn' ? 'en' : 'bn';
    setLang(next);
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t: translations[lang],
        toggleLang,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
