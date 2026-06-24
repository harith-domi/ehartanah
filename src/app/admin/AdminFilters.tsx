'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

interface Props {
  adminKey: string;
  regions: string[];
  currentQ: string;
  currentSource: string;
  currentRegion: string;
}

export default function AdminFilters({ adminKey, regions, currentQ, currentSource, currentRegion }: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [q, setQ] = useState(currentQ);
  const [source, setSource] = useState(currentSource);
  const [region, setRegion] = useState(currentRegion);

  function apply(overrides: Partial<{ q: string; source: string; region: string }>) {
    const next = { q, source, region, ...overrides };
    const p = new URLSearchParams({ key: adminKey });
    if (next.q) p.set('q', next.q);
    if (next.source) p.set('source', next.source);
    if (next.region) p.set('region', next.region);
    startTransition(() => router.push(`/admin?${p.toString()}`));
  }

  const hasFilter = q || source || region;

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <input
        type="text"
        placeholder="Search address, ID, region…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && apply({ q })}
        onBlur={() => q !== currentQ && apply({ q })}
        className="flex-1 min-w-[220px] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30"
      />
      <select
        value={source}
        onChange={(e) => { setSource(e.target.value); apply({ source: e.target.value }); }}
        className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 bg-white"
      >
        <option value="">All sources</option>
        <option value="New">New (Admin-added)</option>
        <option value="Auction">Auction</option>
        <option value="Agency">Agency</option>
        <option value="Sale">Sale</option>
        <option value="Rent">Rent</option>
        <option value="Hidden">⊘ Hidden</option>
      </select>
      <select
        value={region}
        onChange={(e) => { setRegion(e.target.value); apply({ region: e.target.value }); }}
        className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 bg-white"
      >
        <option value="">All regions</option>
        {regions.map((r) => <option key={r} value={r}>{r}</option>)}
      </select>
      {hasFilter && (
        <button
          onClick={() => { setQ(''); setSource(''); setRegion(''); apply({ q: '', source: '', region: '' }); }}
          className="px-4 py-2.5 text-sm text-gray-500 hover:text-red-500 border border-gray-200 rounded-xl bg-white"
        >
          Clear
        </button>
      )}
    </div>
  );
}
