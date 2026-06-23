'use client';
import { useState } from 'react';

type Source = 'New' | 'Agency' | 'Sale' | 'Rent' | 'Auction';
const SOURCES: Source[] = ['New', 'Agency', 'Sale', 'Rent', 'Auction'];

const colors: Record<Source, string> = {
  New:     'bg-purple-50 text-purple-600 hover:bg-purple-100',
  Agency:  'bg-blue-50 text-blue-600 hover:bg-blue-100',
  Sale:    'bg-green-50 text-green-600 hover:bg-green-100',
  Rent:    'bg-yellow-50 text-yellow-700 hover:bg-yellow-100',
  Auction: 'bg-red-50 text-red-600 hover:bg-red-100',
};

export default function SourceBadge({
  id, source, adminKey,
}: { id: string; source: Source; adminKey: string }) {
  const [current, setCurrent] = useState<Source>(source);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  async function pick(next: Source) {
    if (next === current) { setOpen(false); return; }
    setSaving(true);
    const k = encodeURIComponent((adminKey ?? '').replace(/[^\x20-\x7e]/g, ''));
    await fetch(`/api/admin/listing/${id}?k=${k}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: next }),
    });
    setCurrent(next);
    setSaving(false);
    setOpen(false);
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(o => !o)}
        title="Click to change source"
        className={`text-xs font-semibold px-2 py-0.5 rounded-full transition-colors ${colors[current]}`}
      >
        {saving ? '…' : current}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-6 z-20 bg-white border border-gray-200 rounded-xl shadow-lg py-1 min-w-[100px]">
            {SOURCES.map(s => (
              <button
                key={s}
                onClick={() => pick(s)}
                className={`w-full text-left text-xs px-3 py-1.5 hover:bg-gray-50 ${s === current ? 'font-bold' : ''}`}
              >
                {s}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
