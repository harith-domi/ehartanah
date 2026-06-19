'use client';
import { useEffect, useState } from 'react';
import { useLang } from '@/lib/i18n';

const KEY = 'ehartanah_favs';

type FavEntry = { type: 'listing' | 'auction'; id: string };

function readFavs(): FavEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // Migrate old string[] format to FavEntry[]
    if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'string') {
      return parsed.map((id: string) => ({ type: 'listing' as const, id }));
    }
    return parsed as FavEntry[];
  } catch {
    return [];
  }
}

export default function FavouriteButton({ id, type = 'listing' }: { id: string; type?: 'listing' | 'auction' }) {
  const [saved, setSaved] = useState(false);
  const { lang } = useLang();

  const ariaLabel = saved
    ? (lang === 'en' ? 'Remove from shortlist' : 'Buang dari senarai pendek')
    : (lang === 'en' ? 'Save to shortlist' : 'Simpan ke senarai pendek');
  const titleLabel = saved
    ? (lang === 'en' ? 'Saved to shortlist' : 'Disimpan dalam senarai pendek')
    : (lang === 'en' ? 'Save to shortlist' : 'Simpan ke senarai pendek');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const favs = readFavs();
    setSaved(favs.some((f) => f.id === id && f.type === type));
  }, [id, type]);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const favs = readFavs();
    const isSaved = favs.some((f) => f.id === id && f.type === type);
    const next = isSaved
      ? favs.filter((f) => !(f.id === id && f.type === type))
      : [...favs, { type, id }];
    localStorage.setItem(KEY, JSON.stringify(next));
    setSaved(!isSaved);
  }

  return (
    <button
      onClick={toggle}
      aria-label={ariaLabel}
      title={titleLabel}
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
