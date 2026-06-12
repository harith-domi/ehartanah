import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bank Auction Properties (Lelong) — Coming Soon',
  description:
    'Bank auction (lelong) property listings with AI risk scoring are coming soon to eHartanah. Browse subsale and rental listings in the meantime.',
};

export default function AuctionPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-[#0f2540] to-[#0f2540] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Bank Auctions (Lelong)</h1>
          <p className="text-[#fde68a] text-sm">AI-scored auction deals below market value</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Auction Listings Coming Soon</h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md mx-auto">
          We&apos;re preparing verified bank auction (lelong) listings with AI risk scoring and due
          diligence checklists. In the meantime, explore thousands of subsale and rental properties.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/subsale" className="bg-[#0f2540] hover:bg-[#0a1e38] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
            Browse Subsale
          </Link>
          <Link href="/rent" className="border border-[#d4a017]/40 text-[#1e3a5f] hover:bg-[#edf2f8] font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
            Browse Rentals
          </Link>
          <Link href="/contact" className="border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
            Get Notified
          </Link>
        </div>
      </div>
    </div>
  );
}
