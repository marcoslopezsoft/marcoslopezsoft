'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ContentData } from '../data/content';

interface HeroSectionProps {
  t: ContentData;
}

export function HeroSection({ t }: HeroSectionProps) {
  const [isWordmarkRevealed, setIsWordmarkRevealed] = useState(false);

  const handleWordmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWordmarkRevealed(true);
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="w-full min-h-screen pt-32 pb-16 px-6 md:px-12 xl:px-20 flex flex-col justify-between"
    >
      {/* Monumental Hero Wordmark - SOFT, WHERE? -> SOFTWARE PROJECTS */}
      <a
        href="#projects"
        onClick={handleWordmarkClick}
        className="group w-full my-auto py-6 block select-none cursor-pointer text-center relative focus:outline-none"
        aria-label="Soft, where? Hover or click to reveal Software Projects"
      >
        {/* Roll-over text container */}
        <div className="relative overflow-hidden h-20 sm:h-32 md:h-40 lg:h-48 flex items-center justify-center w-full">
          {/* Estado 1: SOFT, WHERE? */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              isWordmarkRevealed
                ? '-translate-y-full opacity-0'
                : 'group-hover:-translate-y-full group-hover:opacity-0'
            }`}
          >
            <span className="text-[10.5vw] xl:text-[135px] font-black tracking-tighter uppercase text-[#3a3a38] leading-none whitespace-nowrap">
              SOFT, WHERE?
            </span>
          </div>

          {/* Estado 2: SOFTWARE PROJECTS */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              isWordmarkRevealed
                ? 'translate-y-0 opacity-100'
                : 'translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
            }`}
          >
            <span className="text-[8.5vw] xl:text-[112px] font-black tracking-tighter uppercase text-[#3a3a38] leading-none whitespace-nowrap flex items-center gap-2 sm:gap-4">
              SOFTWARE <span className="text-[#ffd700]">PROJECTS</span>
            </span>
          </div>
        </div>
      </a>

      {/* Content row - Ancho completo de borde a borde */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-6 lg:col-span-5">
          <div className="hero-image group w-full relative overflow-hidden rounded-sm filter blur-sm scale-95 opacity-80">
            <Image
              src="/assets/foto/mi-foto.jpeg"
              alt="Marcos Adrian Lopez — Full Stack Developer"
              width={1024}
              height={1536}
              priority
              className="w-full h-auto max-h-[55vh] lg:max-h-[60vh] grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700 ease-out object-cover object-top cursor-pointer"
            />
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-2" />
        <div className="md:col-span-6 lg:col-span-5 md:text-right">
          <p className="about-text text-lg sm:text-xl md:text-2xl font-light leading-relaxed opacity-0 translate-y-8 filter blur-xs">
            {t.hero.about}
          </p>
        </div>
      </div>
    </section>
  );
}
