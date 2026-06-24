'use client';

import { useState } from 'react';

export default function StatusToggle({
  id,
  isSupabase,
  isHidden,
  adminKey,
}: {
  id: string;
  isSupabase: boolean;
  isHidden: boolean;
  adminKey: string;
}) {
  const [hidden, setHidden] = useState(isHidden);
  const [loading, setLoading] = useState(false);

  const k = encodeURIComponent(adminKey.replace(/[^\x20-\x7e]/g, ''));

  async function toggle() {
    setLoading(true);
    try {
      if (isSupabase) {
        const res = await fetch(`/api/admin/listing/${id}?k=${k}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({ source: hidden ? 'New' : 'Hidden' }),
        });
        if (res.ok) setHidden(h => !h);
      } else {
        const res = await fetch(`/api/admin/hide/${id}?k=${k}`, {
          method: 'POST',
          referrerPolicy: 'no-referrer',
        });
        if (res.ok) window.location.reload();
      }
    } finally {
      setLoading(false);
    }
  }

  if (!isSupabase) {
    return (
      <button
        type="button"
        onClick={toggle}
        disabled={loading}
        title="Hide listing from public site"
        className="px-2 py-1 text-[11px] rounded-lg border border-gray-200 text-gray-400 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 transition-colors whitespace-nowrap disabled:opacity-50"
      >
        {loading ? '…' : 'Hide'}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      title={hidden ? 'Restore — make visible again' : 'Hide from public site'}
      className={`px-2 py-1 text-[11px] rounded-lg border font-medium transition-colors whitespace-nowrap disabled:opacity-50 ${
        hidden
          ? 'border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100'
          : 'border-green-300 bg-green-50 text-green-700 hover:bg-green-100'
      }`}
    >
      {loading ? '…' : hidden ? '⊘ Hidden' : '● Active'}
    </button>
  );
}
