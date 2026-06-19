import type { Metadata } from 'next';
import Link from 'next/link';
import { guides } from '@/lib/guides';
import T from '@/components/T';

export const metadata: Metadata = {
  title: 'Panduan Hartanah Malaysia — Sewa Beli, Loan & Tips Pembeli',
  description:
    'Panduan percuma untuk pembeli rumah Malaysia: cara sewa beli rumah, apa nak buat bila loan bank ditolak, perbandingan sewa vs beli, dan banyak lagi.',
};

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-[#1e3a5f] to-[#0f2540] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2"><T en="Property Guides" bm="Panduan Hartanah" /></h1>
          <p className="text-[#fde68a] text-sm"><T en="Free tips and guides for Malaysian property buyers" bm="Tips dan panduan percuma untuk pembeli rumah Malaysia" /></p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-5">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                <span>{new Date(g.publishedAt).toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <span>·</span>
                <span>{g.readMinutes} <T en="min read" bm="min bacaan" /></span>
              </div>
              <h2 className="font-bold text-gray-900 text-lg mb-2 leading-snug">
                <T en={g.titleEn} bm={g.title} />
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                <T en={g.descriptionEn} bm={g.description} />
              </p>
              <span className="text-[#1e3a5f] text-sm font-semibold inline-flex items-center gap-1">
                <T en="Read guide" bm="Baca panduan" />
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
