'use client';

import React from 'react';
import { ContentData } from '../data/content';
import { ProjectCard } from './ProjectCard';
import { KineticMarquee } from './KineticMarquee';

interface ProjectsSectionProps {
  t: ContentData;
}

export function ProjectsSection({ t }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 md:px-12 xl:px-20 border-t border-current/15 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#ffd700]/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-blue-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Editorial Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4 relative z-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#ffd700] block mb-2 font-semibold">
            {t.projects.tag}
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter text-current">
            {t.projects.title}
          </h2>
        </div>
        <div className="flex flex-col items-start md:items-end font-mono text-xs text-neutral-400">
          <span className="tracking-widest uppercase">{t.projects.period}</span>
          <span className="text-[11px] text-[#ffd700]/80 mt-1">
            STATUS: ARCHITECTURE // DEPLOYED
          </span>
        </div>
      </div>

      {/* Kinetic Marquee 1 (Cinta superior vinculada al scroll) */}
      <KineticMarquee
        trackClassName="marquee-track-1"
        text={t.projects.marqueePrimary}
        wrapperClassName="relative w-full overflow-hidden py-4 mb-14 border-y border-current/10 pointer-events-none select-none"
        textClassName="flex whitespace-nowrap text-4xl sm:text-7xl md:text-8xl font-black font-mono tracking-tighter uppercase text-current/[0.06]"
      />

      {/* Project Cards (Mapeo DRY) */}
      <div className="w-full flex flex-col gap-6 md:gap-8 relative z-10">
        {t.projects.items.map((item, index) => (
          <ProjectCard
            key={item.title}
            item={item}
            index={index}
            visitText={t.projects.visit}
          />
        ))}
      </div>

      {/* Kinetic Marquee 2 (Contra-flujo inferior dinámico) */}
      <KineticMarquee
        trackClassName="marquee-track-2"
        text={t.projects.marqueeSecondary}
        wrapperClassName="relative w-full overflow-hidden py-4 mt-16 pointer-events-none select-none opacity-40"
        textClassName="flex whitespace-nowrap text-xl sm:text-4xl md:text-5xl font-mono font-light tracking-widest uppercase text-[#ffd700]/30"
      />
    </section>
  );
}
