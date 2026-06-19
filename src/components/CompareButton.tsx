'use client';

import { useState, useEffect } from 'react';
import { toggleCompare, isInCompare } from '@/lib/compare';
import type { CompareEntry } from '@/lib/compare';

export default function CompareButton({ entry }: { entry: CompareEntry }) {
  const [active, setActive] = useState(false);

  useEffect(() => { setActive(isInCompare(entry)); }, [entry.id, entry.type]);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(entry);
    setActive(isInCompare(entry));
    window.dispatchEvent(new Event('eh_compare_change'));
  }

  return (
    <button
      onClick={handleClick}
      title={active ? 'Remove from compare' : 'Add to compare'}
      className={`p-1.5 rounded-lg transition-colors text-[10px] font-bold leading-none ${
        active ? 'bg-[#d4a017] text-[#0f2540]' : 'bg-white/10 text-gray-400 hover:bg-[#d4a017]/20 hover:text-[#d4a017]'
      }`}
    >
      VS
    </button>
  );
}
