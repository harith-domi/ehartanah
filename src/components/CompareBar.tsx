'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCompare, clearCompare, toggleCompare } from '@/lib/compare';
import type { CompareEntry } from '@/lib/compare';
import { useLang } from '@/lib/i18n';

export default function CompareBar() {
  const [items, setItems] = useState<CompareEntry[]>([]);
  const router = useRouter();
  const { lang } = useLang();

  const t = lang === 'en'
    ? { compare: 'Compare', clear: 'Clear', selected: 'selected', go: 'Compare Now' }
    : { compare: 'Bandingkan', clear: 'Padam', selected: 'dipilih', go: 'Bandingkan Sekarang' };

  useEffect(() => {
    const update = () => setItems(getCompare());
    update();
    window.addEventListener('eh_compare_change', update);
    return () => window.removeEventListener('eh_compare_change', update);
  }, []);

  if (items.length === 0) return null;

  function handleClear() {
    clearCompare();
    setItems([]);
    window.dispatchEvent(new Event('eh_compare_change'));
  }

  function handleRemove(entry: CompareEntry) {
    const next = toggleCompare(entry);
    setItems(next);
    window.dispatchEvent(new Event('eh_compare_change'));
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0f2540] border-t-2 border-[#d4a017] shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-[#d4a017] font-black text-sm shrink-0">{items.length}/3 {t.selected}</span>
          <div className="flex gap-2 flex-wrap">
            {items.map((item) => (
              <span
                key={`${item.type}-${item.id}`}
                className="flex items-center gap-1.5 bg-white/10 text-white text-xs font-semibold px-2.5 py-1 rounded-full"
              >
                <span className="uppercase text-[#d4a017] text-[9px]">{item.type}</span>
                #{item.id.slice(-6)}
                <button onClick={() => handleRemove(item)} className="text-gray-400 hover:text-white ml-0.5">×</button>
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={handleClear} className="text-gray-400 hover:text-white text-xs font-semibold transition-colors">
            {t.clear}
          </button>
          <button
            onClick={() => router.push(`/compare?ids=${items.map((i) => `${i.type}:${i.id}`).join(',')}`)}
            disabled={items.length < 2}
            className="bg-[#d4a017] hover:bg-[#c49012] disabled:opacity-40 disabled:cursor-not-allowed text-[#0f2540] font-black text-sm px-4 py-2 rounded-xl transition-colors"
          >
            {t.go}
          </button>
        </div>
      </div>
    </div>
  );
}
