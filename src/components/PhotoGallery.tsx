'use client';

import { useState } from 'react';

interface Props {
  photos: string[];
  title: string;
}

export default function PhotoGallery({ photos, title }: Props) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (photos.length === 0) return null;

  const open = (i: number) => { setActive(i); setLightbox(true); };
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setActive(a => (a - 1 + photos.length) % photos.length); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setActive(a => (a + 1) % photos.length); };

  const right = photos.slice(1, 5);
  const cols = right.length >= 3 ? 2 : 1;
  const rows = right.length <= 2 ? right.length : 2;

  return (
    <>
      {/* Grid layout */}
      <div className="rounded-2xl overflow-hidden">
        {photos.length === 1 ? (
          <div className="relative h-72 sm:h-[420px] cursor-pointer" onClick={() => open(0)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos[0]} alt={title} className="w-full h-full object-cover" />
            <EhBadge />
          </div>
        ) : (
          <div className="flex gap-0.5 h-64 sm:h-80 md:h-[420px]">

            {/* Left: main photo */}
            <div className="relative flex-1 overflow-hidden cursor-pointer group" onClick={() => open(0)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos[0]}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
              <EhBadge />
            </div>

            {/* Right: up to 4 photos in 2×2 grid */}
            <div
              className="w-[48%] grid gap-0.5"
              style={{
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
              }}
            >
              {right.map((src, i) => {
                const isLast = i === right.length - 1;
                const hasMore = photos.length > 5;
                return (
                  <div
                    key={i}
                    className="relative overflow-hidden cursor-pointer group"
                    onClick={() => open(i + 1)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${title} — ${i + 2}`}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    {isLast && hasMore && (
                      <div className="absolute inset-0 bg-black/50 flex items-end justify-end p-3">
                        <span className="flex items-center gap-1.5 bg-white text-gray-900 text-xs font-bold px-3 py-2 rounded-lg shadow">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          SHOW ALL {photos.length}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col" onClick={() => setLightbox(false)}>

          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-3 shrink-0" onClick={e => e.stopPropagation()}>
            <span className="text-white/60 text-sm font-medium">{active + 1} / {photos.length}</span>
            <button
              onClick={() => setLightbox(false)}
              className="text-white/60 hover:text-white text-3xl leading-none font-light"
            >×</button>
          </div>

          {/* Main image */}
          <div
            className="flex-1 relative flex items-center justify-center px-16 min-h-0"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={prev}
              className="absolute left-3 text-white bg-white/10 hover:bg-white/25 rounded-full w-11 h-11 flex items-center justify-center text-2xl transition-colors"
            >‹</button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[active]}
              alt={`${title} — photo ${active + 1}`}
              className="max-h-full max-w-full object-contain select-none"
            />
            <button
              onClick={next}
              className="absolute right-3 text-white bg-white/10 hover:bg-white/25 rounded-full w-11 h-11 flex items-center justify-center text-2xl transition-colors"
            >›</button>
          </div>

          {/* Thumbnail strip */}
          <div
            className="flex gap-2 p-3 overflow-x-auto shrink-0 justify-center"
            onClick={e => e.stopPropagation()}
          >
            {photos.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`shrink-0 w-16 h-12 rounded-md overflow-hidden transition-all ${
                  i === active ? 'ring-2 ring-white opacity-100' : 'opacity-50 hover:opacity-80'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

        </div>
      )}
    </>
  );
}

function EhBadge() {
  return (
    <span className="absolute bottom-3 left-3 bg-[#0f2540]/70 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wide select-none pointer-events-none z-10">
      eHartanah.my
    </span>
  );
}
