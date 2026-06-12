'use client';
import { useEffect, useState } from 'react';

const KEY = 'ehartanah_favs';

export default function FavouriteButton({ id }: { id: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const favs: string[] = JSON.parse(localStorage.getItem(KEY) || '[]');
    setSaved(favs.includes(id));
  }, [id]);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const favs: string[] = JSON.parse(localStorage.getItem(KEY) || '[]');
    const next = favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id];
    localStorage.setItem(KEY, JSON.stringify(next));
    setSaved(next.includes(id));
  }

  return (
    <button
      onClick={toggle}
      aria-label={saved ? 'Remove from shortlist' : 'Save to shortlist'}
      title={saved ? 'Saved to shortlist' : 'Save to shortlist'}
      className={`p-2 rounded-lg transition-colors shrink-0 ${
        saved
          ? 'text-rose-500 bg-rose-50 hover:bg-rose-100'
          : 'text-gray-300 hover:text-rose-400 hover:bg-rose-50'
      }`}
    >
      <svg className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
  );
}
