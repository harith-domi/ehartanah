'use client';
import { useEffect, useState } from 'react';
import { useLang } from '@/lib/i18n';

function parseDate(s: string): Date | null {
  const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  return new Date(+m[3], +m[2] - 1, +m[1]);
}

export default function AuctionCountdown({ dateStr }: { dateStr: string }) {
  const [state, setState] = useState<'loading' | 'closed' | { days: number; hours: number; mins: number }>('loading');
  const { lang } = useLang();

  const t = lang === 'en'
    ? { closed: 'Auction Closed', urgent: 'Urgent', d: 'd', h: 'h', m: 'm' }
    : { closed: 'Lelongan Ditutup', urgent: 'Segera', d: 'h', h: 'j', m: 'm' };

  useEffect(() => {
    const target = parseDate(dateStr);
    if (!target) { setState('closed'); return; }
    const t = target;

    function tick() {
      const ms = t.getTime() - Date.now();
      if (ms <= 0) { setState('closed'); return; }
      setState({
        days: Math.floor(ms / 86_400_000),
        hours: Math.floor((ms % 86_400_000) / 3_600_000),
        mins: Math.floor((ms % 3_600_000) / 60_000),
      });
    }
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [dateStr]);

  if (state === 'loading') return null;
  if (state === 'closed') return (
    <span className="text-xs font-bold text-red-500">{t.closed}</span>
  );

  const urgent = state.days < 7;
  return (
    <div className={`flex items-center gap-1.5 text-xs font-bold ${urgent ? 'text-red-600' : 'text-amber-600'}`}>
      {urgent && (
        <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wide">
          {t.urgent}
        </span>
      )}
      <span>{state.days}{t.d} {state.hours}{t.h} {state.mins}{t.m}</span>
    </div>
  );
}
