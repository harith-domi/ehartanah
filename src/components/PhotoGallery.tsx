'use client';

import { useState } from 'react';

interface Props {
  photos: string[];
  title: string;
}

export default function PhotoGallery({ photos, title }: Props) {
  const [active, setActive] = useState(0);
  const shown = photos.slice(0, 5);

  if (shown.length === 0) return null;

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm">
      {/* Main photo */}
      <div className="relative w-full h-52 sm:h-72 bg-[#0f2540]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={shown[active]}
          alt={`${title} — photo ${active + 1}`}
          className="w-full h-full object-cover object-top"
        />
        <span className="absolute bottom-3 left-3 bg-[#0f2540]/70 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wide select-none pointer-events-none z-10">
          eHartanah.my
        </span>
        {shown.length > 1 && (
          <>
            <button
              onClick={() => setActive((active - 1 + shown.length) % shown.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-9 h-9 flex items-center justify-center backdrop-blur-sm transition-colors"
              aria-label="Previous photo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setActive((active + 1) % shown.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-9 h-9 flex items-center justify-center backdrop-blur-sm transition-colors"
              aria-label="Next photo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <span className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
              {active + 1} / {shown.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {shown.length > 1 && (
        <div className="flex gap-1.5 p-2 bg-[#0a1e38]">
          {shown.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative flex-1 h-12 sm:h-16 overflow-hidden rounded-lg transition-all ${
                i === active ? 'ring-2 ring-[#d4a017] opacity-100' : 'opacity-60 hover:opacity-90'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
