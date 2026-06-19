import type { Metadata } from 'next';
import ChatInterface from '@/components/ChatInterface';
import Link from 'next/link';
import { EXAMPLE_PROMPTS } from '@/lib/mockAIResponses';
import { AGENCY_WA } from '@/lib/listings';
import T from '@/components/T';

export const metadata: Metadata = {
  title: 'AI Property Search',
  description: 'Ask our AI property advisor anything about Malaysian properties. Get personalised recommendations for subsale, auction, and rent-to-own.',
};

export default async function AISearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const initialQuery = params.q;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page header */}
      <div className="bg-gradient-to-r from-[#0f2540] to-[#1e3a5f] py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white"><T en="AI Property Search" bm="Carian Hartanah AI" /></h1>
          </div>
          <p className="text-[#fde68a] text-sm">
            <T en="Ask anything about Malaysian properties — affordability, yields, auctions, rent-to-own, and more." bm="Tanya apa sahaja tentang hartanah Malaysia — kemampuan, hasil, lelongan, sewa beli, dan lain-lain." />
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chat (takes 3/4 width on desktop) */}
          <div className="lg:col-span-3" style={{ height: 'calc(100vh - 220px)', minHeight: '640px' }}>
            <ChatInterface initialQuery={initialQuery} />
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* How it works */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <T en="How AI Search Works" bm="Cara Carian AI Berfungsi" />
              </h3>
              <ol className="space-y-3">
                {([
                  { en: 'Type your requirements in plain English or Bahasa Malaysia', bm: 'Taip keperluan anda dalam Bahasa Inggeris atau Bahasa Malaysia' },
                  { en: 'AI analyses your budget, lifestyle, and investment goals', bm: 'AI menganalisis bajet, gaya hidup, dan matlamat pelaburan anda' },
                  { en: 'Get personalised property recommendations with yield data', bm: 'Dapatkan cadangan hartanah yang diperibadikan dengan data hasil' },
                  { en: 'Ask follow-up questions or refine your search anytime', bm: 'Tanya soalan susulan atau perhalusi carian anda bila-bila masa' },
                ] as const).map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-[#dce8f0] text-[#1e3a5f] font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-gray-600"><T en={step.en} bm={step.bm} /></span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Example prompts */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4"><T en="Try These Questions" bm="Cuba Soalan Ini" /></h3>
              <div className="space-y-2">
                {EXAMPLE_PROMPTS.map((prompt) => (
                  <Link
                    key={prompt}
                    href={`/ai-search?q=${encodeURIComponent(prompt)}`}
                    className="block text-xs bg-slate-50 hover:bg-[#edf2f8] hover:border-[#d4a017] text-gray-700 border border-gray-100 px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    &ldquo;{prompt}&rdquo;
                  </Link>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 mb-2"><T en="Prefer Talking to a Human?" bm="Lebih Suka Bercakap Dengan Manusia?" /></h3>
              <p className="text-sm text-gray-600 mb-4">
                <T en="Our licensed property advisors are available daily 8am–10pm via WhatsApp." bm="Penasihat hartanah berlesen kami tersedia setiap hari 8pagi–10malam melalui WhatsApp." />
              </p>
              <a
                href={AGENCY_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <T en="Book WhatsApp Consultation" bm="Tempah Konsultasi WhatsApp" />
              </a>
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3"><T en="Browse by Category" bm="Semak Mengikut Kategori" /></h3>
              <div className="space-y-2">
                {([
                  { en: 'Subsale Properties', bm: 'Hartanah Subsale', href: '/subsale', color: 'text-[#1e3a5f] bg-[#edf2f8]' },
                  { en: 'Auction Deals', bm: 'Tawaran Lelongan', href: '/auction', color: 'text-amber-700 bg-amber-50' },
                  { en: 'Rent-to-Own', bm: 'Sewa Beli', href: '/rent-to-own', color: 'text-[#1e3a5f] bg-[#edf2f8]' },
                  { en: 'Investment Insights', bm: 'Pandangan Pelaburan', href: '/investment-insights', color: 'text-green-700 bg-green-50' },
                ] as const).map((link) => (
                  <Link key={link.href} href={link.href} className={`flex items-center justify-between ${link.color} px-4 py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-80`}>
                    <T en={link.en} bm={link.bm} />
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
