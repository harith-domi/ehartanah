'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteButton({
  id, adminKey, isSupabase,
}: { id: string; adminKey: string; isSupabase: boolean }) {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm) { setConfirm(true); return; }
    setLoading(true);
    const k = encodeURIComponent((adminKey ?? '').replace(/[^\x20-\x7e]/g, ''));
    if (isSupabase) {
      await fetch(`/api/admin/listing/${id}?k=${k}`, { method: 'DELETE', referrerPolicy: 'no-referrer' });
    } else {
      await fetch(`/api/admin/hide/${id}?k=${k}`, { method: 'POST', referrerPolicy: 'no-referrer' });
    }
    router.refresh();
    setLoading(false);
    setConfirm(false);
  }

  return confirm ? (
    <span className="flex gap-1 items-center">
      <button
        onClick={handleDelete}
        disabled={loading}
        className="px-2 py-1 text-xs rounded-lg bg-red-500 text-white border border-red-500 hover:bg-red-600 whitespace-nowrap"
      >
        {loading ? '…' : 'Sure?'}
      </button>
      <button onClick={() => setConfirm(false)} className="px-2 py-1 text-xs rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50">
        No
      </button>
    </span>
  ) : (
    <button
      onClick={handleDelete}
      className="px-2 py-1 text-xs rounded-lg border border-red-200 text-red-400 hover:bg-red-50 whitespace-nowrap"
    >
      ✕
    </button>
  );
}
