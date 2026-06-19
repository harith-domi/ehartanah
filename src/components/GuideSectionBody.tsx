'use client';

import { useLang } from '@/lib/i18n';
import type { GuideSection } from '@/lib/guides';

export default function GuideSectionBody({ section }: { section: GuideSection }) {
  const { lang } = useLang();
  const paras = (lang === 'en' && section.paragraphsEn) ? section.paragraphsEn : section.paragraphs;
  const bullets = (lang === 'en' && section.bulletsEn) ? section.bulletsEn : section.bullets;

  return (
    <>
      {paras.map((p) => (
        <p key={p.slice(0, 40)} className="text-gray-600 text-sm leading-relaxed mb-3">{p}</p>
      ))}
      {bullets && (
        <ul className="space-y-2 mt-2">
          {bullets.map((b) => (
            <li key={b.slice(0, 40)} className="flex items-start gap-2.5 text-gray-600 text-sm leading-relaxed">
              <span className="w-4 h-4 rounded-full bg-[#dce8f0] flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-2.5 h-2.5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              {b}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
