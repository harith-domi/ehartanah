import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Rent-to-Own Properties — Coming Soon',
  description:
    'Rent-to-own property programmes are coming soon to eHartanah. Browse subsale and rental listings in the meantime.',
};

export default function RentToOwnPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Rent-to-Own</h1>
          <p className="text-emerald-200 text-sm">Own your home step by step — rent while you build equity</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Rent-to-Own Programmes Coming Soon</h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md mx-auto">
          We&apos;re building rent-to-own programmes for first-time buyers and those rebuilding
          credit. In the meantime, explore thousands of subsale and rental properties.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/rent" className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
            Browse Rentals
          </Link>
          <Link href="/subsale" className="border border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
            Browse Subsale
          </Link>
          <Link href="/contact" className="border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
            Get Notified
          </Link>
        </div>
      </div>
    </div>
  );
}
