'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const SOURCE_COLORS: Record<string, string> = {
  New:     'bg-purple-50 text-purple-600',
  Auction: 'bg-red-50 text-red-600',
  Agency:  'bg-blue-50 text-blue-600',
  Sale:    'bg-green-50 text-green-600',
  Rent:    'bg-yellow-50 text-yellow-700',
};

const STORAGE_KEY = 'admin-dismissed-listings';

export interface MyListingRow {
  id: string;
  propertyType: string;
  region: string;
  address: string;
  price: number;
  source: string;
  publicUrl: string;
  updatedAt?: string | null;
  thumbnailUrl?: string | null;
}

export default function AdminMyListings({ rows, adminKey }: { rows: MyListingRow[]; adminKey: string }) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setDismissed(new Set(JSON.parse(stored)));
    } catch {}
    setReady(true);
  }, []);

  function dismiss(id: string) {
    setDismissed(prev => {
      const next = new Set([...prev, id]);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])); } catch {}
      return next;
    });
  }

  if (!ready) return null;

  const visible = rows.filter(r => !dismissed.has(r.id));
  if (visible.length === 0) return null;

  function fmt(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  return (
    <div id="my-listings" className="mb-6 scroll-mt-6">
      <h2 className="text-sm font-bold text-gray-700 mb-3">
        My Listings <span className="text-gray-400 font-normal">({visible.length})</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {visible.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            {/* Thumbnail */}
            <div className="relative h-32 bg-slate-100">
              {r.thumbnailUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.thumbnailUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              )}
              <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${SOURCE_COLORS[r.source] ?? 'bg-gray-100 text-gray-600'}`}>
                {r.source}
              </span>
              {r.updatedAt && (
                <span className="absolute top-2 right-2 text-[10px] bg-black/50 text-white px-2 py-0.5 rounded-full">
                  {fmt(r.updatedAt)}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="p-3 flex flex-col gap-2 flex-1">
              <div>
                <p className="text-xs font-semibold text-gray-800 truncate">{r.propertyType || '—'}</p>
                <p className="text-[11px] text-gray-500 truncate">{r.region}</p>
                <p className="text-[11px] text-gray-400 truncate">{r.address || '—'}</p>
              </div>
              <p className="text-sm font-black text-[#1e3a5f]">
                {r.price ? `RM ${r.price.toLocaleString('en-MY')}` : '—'}
              </p>
              <div className="flex gap-1.5 mt-auto">
                <button
                  type="button"
                  onClick={() => dismiss(r.id)}
                  title="Mark as done — removes from this section"
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-green-400 hover:bg-green-50 hover:text-green-600 transition-colors shrink-0"
                >
                  ✓
                </button>
                <a href={r.publicUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-1 text-center text-[11px] py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-[#1e3a5f] transition-colors">
                  ↗ View
                </a>
                <Link href={`/admin/edit/${r.id}?key=${encodeURIComponent(adminKey)}`}
                  className="flex-1 text-center text-[11px] py-1.5 rounded-lg bg-[#0f2540] text-white hover:bg-[#1e3a5f] transition-colors">
                  ✏ Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
