'use client';

import React from 'react';
import Image from 'next/image';
import { ContentData, galleryPhotos } from '../data/content';

interface GallerySectionProps {
  t: ContentData;
}

export function GallerySection({ t }: GallerySectionProps) {
  return (
    <section
      id="gallery"
      className="w-full min-h-screen py-28 px-6 md:px-12 xl:px-20 flex flex-col justify-center border-t border-neutral-300/40"
    >
      <div className="mb-8 flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
          {t.gallery.tag}
        </span>
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
          {t.gallery.hover}
        </span>
      </div>

      {/* Galería interactiva con expansión suave en hover */}
      <div className="w-full flex flex-col sm:flex-row gap-4 md:gap-6 mb-16">
        {galleryPhotos.map((photo, i) => (
          <div
            key={i}
            className="gallery-item group flex-1 hover:flex-[1.8] h-64 sm:h-80 md:h-115 overflow-hidden relative transition-all duration-700 ease-out cursor-pointer"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-110 transition-all duration-700 ease-out"
            />
            <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
              <span className="text-[10px] font-mono uppercase tracking-widest bg-black/75 text-white px-2.5 py-1">
                {photo.caption}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full text-center">
        <p className="text-base font-mono text-neutral-600 leading-relaxed max-w-4xl mx-auto">
          {t.gallery.quote}
        </p>
      </div>
    </section>
  );
}
