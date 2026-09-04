'use client';

import React, { RefObject } from 'react';
import {
  CONTACT_INFO,
  ContentData,
  Lang,
  NAV_ITEMS,
  SUPPORTED_LANGUAGES,
} from '../data/content';

interface HeaderProps {
  headerRef: RefObject<HTMLElement | null>;
  indicatorRef: RefObject<HTMLDivElement | null>;
  lang: Lang;
  onLanguageChange: (lang: Lang) => void;
  t: ContentData;
}

export function Header({
  headerRef,
  indicatorRef,
  lang,
  onLanguageChange,
  t,
}: HeaderProps) {
  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 py-5 px-6 md:px-12 xl:px-20 backdrop-blur-[8px] border-b border-transparent transition-colors duration-300"
    >
      <div className="w-full flex items-center justify-between">
        <div className="text-xl md:text-2xl font-bold tracking-tighter text-current">
          MARCOSLOPEZSOFT
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="px-3 sm:px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-all duration-300 border border-current/30 text-current hover:bg-[#ffd700] hover:text-black hover:border-[#ffd700]"
          >
            {t.cta}
          </a>

          {/* Language Switcher - DRY mapped */}
          <div className="flex items-center border border-current/30 font-mono text-[11px] uppercase tracking-wider overflow-hidden">
            {SUPPORTED_LANGUAGES.map((l) => {
              const isActive = lang === l;
              return (
                <button
                  key={l}
                  type="button"
                  onClick={() => onLanguageChange(l)}
                  className={`px-2 py-1 transition-colors ${
                    isActive
                      ? 'bg-[#ffd700] text-black font-bold'
                      : 'bg-transparent text-current hover:bg-current/10'
                  }`}
                  aria-label={
                    l === 'es' ? 'Cambiar a Español' : 'Switch to English'
                  }
                >
                  {l.toUpperCase()}
                </button>
              );
            })}
          </div>

          {/* Scroll Indicator */}
          <div className="hidden sm:block w-28 sm:w-44 md:w-56 h-[2px] bg-current/20">
            <div
              ref={indicatorRef}
              className="h-full w-0 bg-[#ffd700] transition-all duration-75"
            />
          </div>
        </div>

        {/* Navigation links - DRY mapped */}
        <nav className="hidden sm:flex gap-8 text-sm lowercase font-medium">
          {NAV_ITEMS.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="text-current/80 hover:text-[#ffd700] hover:opacity-100 transition-colors"
            >
              {t.nav[key]}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
