'use client';

import { useLang } from '@/lib/i18n';

/**
 * Inline translated text. Works inside server components too —
 * Next.js serialises the two strings and the client picks one.
 *
 *   <T en="Browse Rentals" bm="Lihat Sewaan" />
 */
export default function T({ en, bm }: { en: string; bm: string }) {
  const { lang } = useLang();
  return <>{lang === 'bm' ? bm : en}</>;
}
