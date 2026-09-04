'use client';

import React from 'react';

interface KineticMarqueeProps {
  trackClassName: string;
  text: string;
  wrapperClassName?: string;
  textClassName?: string;
}

export function KineticMarquee({
  trackClassName,
  text,
  wrapperClassName = 'relative w-full overflow-hidden py-4 border-y border-current/10 pointer-events-none select-none',
  textClassName = 'flex whitespace-nowrap font-black font-mono tracking-tighter uppercase',
}: KineticMarqueeProps) {
  return (
    <div className={wrapperClassName}>
      <div className={`${trackClassName} ${textClassName}`}>
        <span>{text}&nbsp;</span>
        <span>{text}&nbsp;</span>
      </div>
    </div>
  );
}
