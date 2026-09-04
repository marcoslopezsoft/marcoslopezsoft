'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { CONTENT, ContentData, Lang } from '../data/content';

const langListeners = new Set<() => void>();

function subscribeLang(callback: () => void) {
  langListeners.add(callback);
  window.addEventListener('storage', callback);
  return () => {
    langListeners.delete(callback);
    window.removeEventListener('storage', callback);
  };
}

function getLangSnapshot(): Lang {
  if (typeof window === 'undefined') return 'es';
  const saved = localStorage.getItem('marcoslopezsoft_lang');
  if (saved === 'es' || saved === 'en') return saved;
  const browserLang = (
    (navigator.languages && navigator.languages.length > 0
      ? navigator.languages[0]
      : navigator.language) || ''
  ).toLowerCase();
  return browserLang.startsWith('en') ? 'en' : 'es';
}

function getLangServerSnapshot(): Lang {
  return 'es';
}

export function useLanguage(): {
  lang: Lang;
  handleLanguageChange: (newLang: Lang) => void;
  t: ContentData;
} {
  const lang = useSyncExternalStore(
    subscribeLang,
    getLangSnapshot,
    getLangServerSnapshot,
  );

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const handleLanguageChange = (newLang: Lang) => {
    localStorage.setItem('marcoslopezsoft_lang', newLang);
    langListeners.forEach((listener) => listener());
  };

  const t = CONTENT[lang];

  return { lang, handleLanguageChange, t };
}
