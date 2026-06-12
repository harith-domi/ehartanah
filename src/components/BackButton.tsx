'use client';

import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/i18n';

export default function BackButton({ fallbackHref }: { fallbackHref: string }) {
  const router = useRouter();
  const { lang } = useLang();

  function goBack() {
    // Go back if the user navigated here from within the site, otherwise
    // (direct link, new tab) go to the browse page
    if (typeof window !== 'undefined' && window.history.length > 1 && document.referrer.includes(window.location.host)) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  }

  return (
    <button
      onClick={goBack}
      className="inline-flex items-center gap-1.5 text-[#1e3a5f] hover:text-[#0f2540] hover:bg-[#edf2f8] font-semibold text-sm px-3 py-1.5 -ml-3 rounded-xl transition-colors"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      {lang === 'bm' ? 'Kembali ke Senarai' : 'Back to Properties'}
    </button>
  );
}
