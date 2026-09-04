'use client';

import React, { RefObject, useEffect, useState } from 'react';
import {
  CONTACT_INFO,
  ContentData,
  Lang,
  NAV_ITEMS,
  SOCIAL_LINKS,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Bloquear scroll de la página mientras el menú móvil esté abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Cerrar menú móvil al presionar la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-12 xl:px-20 backdrop-blur-[10px] border-b border-transparent transition-colors duration-300"
      >
        <div className="w-full flex items-center justify-between gap-3 sm:gap-6">
          {/* Logo / Brandmark */}
          <a
            href="#hero"
            onClick={closeMenu}
            className="text-sm sm:text-lg md:text-xl xl:text-2xl font-black tracking-tighter text-current shrink-0 hover:opacity-80 transition-opacity"
          >
            MARCOSLOPEZSOFT
          </a>

          {/* Desktop Navigation Links (≥ lg: 1024px) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs xl:text-sm lowercase font-medium tracking-wide">
            {NAV_ITEMS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="text-current/80 hover:text-[#ffd700] hover:opacity-100 transition-colors relative py-1 group"
              >
                {t.nav[key]}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ffd700] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Actions & Utilities Cluster */}
          <div className="flex items-center gap-2 sm:gap-3 xl:gap-4">
            {/* Scroll Indicator Bar (Visible en ≥ md) */}
            <div
              className="hidden md:block w-24 lg:w-32 xl:w-48 h-[2px] bg-current/20 overflow-hidden"
              title="Progreso de scroll"
            >
              <div
                ref={indicatorRef}
                className="h-full w-0 bg-[#ffd700] transition-all duration-75"
              />
            </div>

            {/* CTA Button (Oculto en móvil pequeño para evitar saturación, visible en ≥ sm) */}
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="hidden sm:inline-flex items-center justify-center px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-300 border border-current/30 text-current hover:bg-[#ffd700] hover:text-black hover:border-[#ffd700] shrink-0"
            >
              {t.cta}
            </a>

            {/* Selector de idioma (Siempre visible y accesible) */}
            <div className="flex items-center border border-current/30 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider overflow-hidden">
              {SUPPORTED_LANGUAGES.map((l) => {
                const isActive = lang === l;
                return (
                  <button
                    key={l}
                    type="button"
                    onClick={() => onLanguageChange(l)}
                    className={`px-1.5 sm:px-2 py-0.5 sm:py-1 transition-colors ${
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

            {/* Botón Toggle del Menú Móvil / Tablet (< lg) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="lg:hidden flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider border border-current/30 text-current hover:border-[#ffd700] hover:text-[#ffd700] transition-all"
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileMenuOpen}
            >
              <span className="inline-block w-2.5 h-2.5 relative flex-shrink-0">
                <span
                  className={`absolute left-0 w-full h-[1.5px] bg-current transition-all duration-300 ${
                    isMobileMenuOpen
                      ? 'top-1 rotate-45 bg-[#ffd700]'
                      : 'top-0.5'
                  }`}
                />
                <span
                  className={`absolute left-0 w-full h-[1.5px] bg-current transition-all duration-300 ${
                    isMobileMenuOpen
                      ? 'top-1 -rotate-45 bg-[#ffd700]'
                      : 'top-2'
                  }`}
                />
              </span>
              <span className="font-semibold">
                {isMobileMenuOpen ? 'CLOSE' : 'MENU'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Menú Móvil & Tablet Desplegable Tipo Drawer / Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop desenfocado oscuro */}
        <div
          onClick={closeMenu}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-500"
        />

        {/* Panel lateral con estética brutalista */}
        <div
          className={`absolute top-0 right-0 w-full sm:w-[380px] h-full bg-[#0a0a0a] text-white border-l border-white/10 flex flex-col justify-between p-6 sm:p-8 pt-24 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header interno del drawer */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#ffd700]">
                SYS_NAV // INDEX
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                STATUS: 200 OK
              </span>
            </div>

            {/* Enlaces de navegación principales */}
            <nav className="flex flex-col gap-4">
              {NAV_ITEMS.map(({ key, href }, index) => (
                <a
                  key={key}
                  href={href}
                  onClick={closeMenu}
                  className="group flex items-baseline justify-between py-2 border-b border-white/5 hover:border-[#ffd700]/40 transition-colors"
                >
                  <span className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-200 group-hover:text-[#ffd700] group-hover:translate-x-2 transition-all duration-300">
                    {t.nav[key].toUpperCase()}
                  </span>
                  <span className="text-xs font-mono text-neutral-500 group-hover:text-[#ffd700] transition-colors">
                    0{index + 1} {'//'} ↗
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* Sección inferior: CTA, Contacto y Redes */}
          <div className="flex flex-col gap-6 pt-6 border-t border-white/10">
            {/* CTA Móvil directo */}
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              onClick={closeMenu}
              className="w-full py-3 px-4 bg-[#ffd700] text-black font-mono font-bold text-xs uppercase tracking-widest text-center hover:bg-white transition-colors block"
            >
              {t.cta}
            </a>

            {/* Email directo */}
            <div className="flex flex-col gap-1 text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                DIRECT TRANSMISSION
              </span>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-sm font-mono text-neutral-300 hover:text-[#ffd700] transition-colors break-all"
              >
                {CONTACT_INFO.email}
              </a>
            </div>

            {/* Redes sociales */}
            <div className="flex items-center justify-between pt-2 text-xs font-mono text-neutral-400">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ffd700] transition-colors"
                >
                  {link.name} ↗
                </a>
              ))}
            </div>

            {/* Ubicación y Copyright */}
            <div className="text-[10px] font-mono text-neutral-600 uppercase tracking-wider">
              {CONTACT_INFO.location} • 2026 MARCOSLOPEZSOFT
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
