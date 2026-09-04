'use client';

import React from 'react';
import { CONTACT_INFO, ContentData, SOCIAL_LINKS } from '../data/content';

interface FooterSectionProps {
  t: ContentData;
}

export function FooterSection({ t }: FooterSectionProps) {
  return (
    <section
      id="footer"
      className="w-full min-h-[50vh] py-24 px-6 md:px-12 xl:px-20 flex flex-col justify-between items-center text-center border-t border-current/15 relative z-10"
    >
      <div className="footer-cta flex flex-col items-center gap-4 opacity-0 translate-y-6 filter blur-xs">
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#ffd700] hover:underline"
        >
          {t.footer.protocol}
        </a>
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white hover:text-[#ffd700] transition-colors"
        >
          {CONTACT_INFO.email}
        </a>

        {/* Social Links - DRY mapped */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-neutral-400">
          {SOCIAL_LINKS.map((link, index) => (
            <React.Fragment key={link.name}>
              {index > 0 && <span className="opacity-30">•</span>}
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#ffd700] transition-colors"
              >
                {link.label ?? `${link.name} ↗`}
              </a>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="w-full opacity-40 pt-20">
        <span className="text-xs font-mono uppercase tracking-widest block text-neutral-400">
          {t.footer.rights}
        </span>
      </div>
    </section>
  );
}
