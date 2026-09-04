'use client';

import React from 'react';
import { ProjectItem } from '../data/content';

interface ProjectCardProps {
  item: ProjectItem;
  index: number;
  visitText: string;
}

export function ProjectCard({ item, index, visitText }: ProjectCardProps) {
  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card relative block p-6 sm:p-8 md:p-10 rounded-lg border border-white/10 bg-white/2 backdrop-blur-[3px] transition-all duration-500 hover:border-[#ffd700]/60 hover:bg-white/5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)] group overflow-hidden cursor-pointer"
    >
      {/* Línea superior dorada que se expande en hover */}
      <div className="absolute top-0 left-0 w-0 h-0.5 bg-linear-to-r from-[#ffd700] via-amber-300 to-[#ffd700] group-hover:w-full transition-all duration-700 ease-out" />

      {/* Número gigante flotante con efecto Parallax en Scroll */}
      <div className="project-parallax-num absolute -right-2 sm:right-6 -bottom-6 font-mono text-7xl sm:text-8xl md:text-9xl font-black text-white/4 group-hover:text-[#ffd700]/8 select-none pointer-events-none transition-colors duration-500">
        {formattedIndex}
      </div>

      <div className="relative z-10 flex flex-col gap-5">
        {/* Meta superior */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs sm:text-sm text-[#ffd700] tracking-widest font-semibold">
              SYS_ID // {formattedIndex}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
            <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/10 group-hover:border-[#ffd700]/40 group-hover:text-[#ffd700] transition-colors">
              {item.category}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 group-hover:text-[#ffd700] transition-colors">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-widest uppercase text-[11px]">
              {item.status}
            </span>
          </div>
        </div>

        {/* Título y Flecha */}
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white group-hover:text-[#ffd700] group-hover:translate-x-1 transition-all duration-300">
            {item.title}
          </h3>
          <span className="text-xl sm:text-2xl font-mono text-neutral-500 group-hover:text-[#ffd700] group-hover:translate-x-2 group-hover:-translate-y-1 transition-all duration-300">
            ↗
          </span>
        </div>

        {/* Descripción Técnica */}
        <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-3xl group-hover:text-neutral-200 transition-colors">
          {item.description}
        </p>

        {/* Tags de Tecnologías y CTA */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/5">
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono tracking-wider px-2.5 py-1 rounded bg-white/3 border border-white/5 text-neutral-400 group-hover:border-white/15 group-hover:text-neutral-300 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-[#ffd700] flex items-center gap-1 group-hover:underline">
            {visitText} <span>↗</span>
          </span>
        </div>
      </div>
    </a>
  );
}
