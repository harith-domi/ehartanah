import type { Metadata } from 'next';
import Link from 'next/link';
import { AGENCY_WA } from '@/lib/listings';

export const metadata: Metadata = {
  title: 'Rent-to-Own Properties — Coming Soon',
  description:
    'Rent-to-own property programmes are coming soon to eHartanah. Browse subsale and rental listings in the meantime.',
};

const WA_MSG = encodeURIComponent('Salam! Saya berminat dengan program Sewa Beli di eHartanah. Boleh hubungi saya apabila ia tersedia?');

export default function RentToOwnPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-[#1e3a5f] to-[#0f2540] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Rent-to-Own (Sewa Beli)</h1>
          <p className="text-[#fde68a] text-sm">Own your home step by step — rent while you build equity</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1e3a5f] to-[#0f2540] flex items-center justify-center mx-auto mb-6 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <span className="inline-block bg-[#dce8f0] text-[#1e3a5f] text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">Coming Soon</span>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Rent-to-Own Programmes</h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-md mx-auto">
          We&apos;re building rent-to-own programmes for first-time buyers and those rebuilding
          credit. Register your interest now — our advisors will contact you when it&apos;s ready.
        </p>

        {/* What to expect */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left">
          {[
            { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Low Deposit', desc: 'Start from 2–5% down, no full loan needed' },
            { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Bad Credit OK', desc: 'Designed for buyers rebuilding CCRIS' },
            { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'AI Matched', desc: 'AI finds your best-fit programme' },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <svg className="w-5 h-5 text-[#1e3a5f] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.icon} />
              </svg>
              <p className="font-semibold text-gray-900 text-sm mb-0.5">{f.title}</p>
              <p className="text-gray-500 text-xs">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
          <a
            href={`${AGENCY_WA}?text=${WA_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Daftar Minat via WhatsApp
          </a>
          <Link href="/rent" className="bg-[#0f2540] hover:bg-[#0a1e38] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
            Browse Rentals
          </Link>
          <Link href="/subsale" className="border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
            Browse Subsale
          </Link>
        </div>
      </div>
    </div>
  );
}
