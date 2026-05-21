import type { Metadata } from 'next';
import Link from 'next/link';
import AuctionCard from '@/components/AuctionCard';
import { auctionProperties } from '@/lib/data/auction';

export const metadata: Metadata = {
  title: 'Auction Properties',
  description: 'Browse AI-scored bank auction properties in Malaysia at 15-35% below market value. CIMB, Maybank, Public Bank, and MRTA lelong listings.',
};

const riskLevels = ['All', 'Low', 'Medium', 'High'];
const states = ['All', 'Kuala Lumpur', 'Selangor', 'Penang', 'Johor'];

export default async function AuctionPage({
  searchParams,
}: {
  searchParams: Promise<{ risk?: string; state?: string; minScore?: string }>;
}) {
  const params = await searchParams;
  const selectedRisk = params.risk || 'All';
  const selectedState = params.state || 'All';
  const minScore = params.minScore ? parseFloat(params.minScore) : 0;

  let filtered = auctionProperties;
  if (selectedRisk !== 'All') filtered = filtered.filter((p) => p.riskLevel === selectedRisk);
  if (selectedState !== 'All') filtered = filtered.filter((p) => p.state === selectedState);
  if (minScore > 0) filtered = filtered.filter((p) => p.aiScore >= minScore);
  filtered = [...filtered].sort((a, b) => b.aiScore - a.aiScore);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-700 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Auction Properties (Lelong)</h1>
          <p className="text-amber-100 text-sm">AI-scored bank auction deals — 15% to 35% below market value</p>
        </div>
      </div>

      {/* Educational banner */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap gap-6 items-start">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-amber-800 font-semibold text-xs">What is a Bank Auction?</p>
                <p className="text-amber-700 text-xs mt-0.5 leading-relaxed max-w-sm">Banks sell repossessed properties at reserve price — often 15-35% below market value. You need a bank draft for 10% of reserve on auction day.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-green-800 font-semibold text-xs">AI Score Explained</p>
                <p className="text-green-700 text-xs mt-0.5 leading-relaxed max-w-sm">Our AI rates each auction 1–10 based on location quality, discount depth, title cleanliness, and rental yield potential. Score 8+ = excellent deal.</p>
              </div>
            </div>
            <Link href="/investment-insights" className="text-amber-700 text-xs font-semibold underline ml-auto self-center whitespace-nowrap">
              Full Auction Guide →
            </Link>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <form method="GET" className="flex flex-wrap gap-3 items-center">
            <select name="state" defaultValue={selectedState} className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-400">
              {states.map((s) => <option key={s}>{s}</option>)}
            </select>
            <select name="risk" defaultValue={selectedRisk} className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-400">
              {riskLevels.map((r) => <option key={r} value={r}>{r === 'All' ? 'All Risk Levels' : `${r} Risk`}</option>)}
            </select>
            <select name="minScore" defaultValue={minScore.toString()} className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-400">
              <option value="0">All AI Scores</option>
              <option value="7">AI Score 7+</option>
              <option value="8">AI Score 8+</option>
              <option value="9">AI Score 9+</option>
            </select>
            <button type="submit" className="bg-amber-500 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors">
              Apply
            </button>
            <span className="ml-auto text-sm text-gray-500">{filtered.length} auctions found</span>
          </form>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((p) => (
                <AuctionCard key={p.id} property={p} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* AI Auction Risk Analysis */}
            <div className="bg-gradient-to-br from-amber-500 to-orange-700 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-2 text-sm">AI Auction Risk Analysis</h3>
              <p className="text-amber-100 text-xs mb-4 leading-relaxed">
                Get a free AI risk assessment for any auction property. We check title status, encumbrances, outstanding charges, and rental yield potential.
              </p>
              <Link href="/ai-search" className="block text-center bg-white text-amber-700 font-semibold text-sm py-2.5 rounded-xl hover:bg-amber-50 transition-colors">
                Analyse an Auction
              </Link>
            </div>

            {/* Auction checklist */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3 text-sm">Pre-Auction Checklist</h3>
              {[
                'Check title search & encumbrances',
                'Verify outstanding quit rent & assessment',
                'Inspect property condition (if possible)',
                'Confirm vacant possession status',
                'Prepare 10% bank draft on auction day',
                'Arrange financing pre-approval',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-4 h-4 rounded border-2 border-amber-400 flex items-center justify-center shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600">{item}</span>
                </div>
              ))}
            </div>

            {/* Risk guide */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3 text-sm">Risk Level Guide</h3>
              {[
                { level: 'Low', color: 'bg-green-100 text-green-700', desc: 'Vacant, clean title, easy to inspect' },
                { level: 'Medium', color: 'bg-amber-100 text-amber-700', desc: 'May be tenanted, minor charges' },
                { level: 'High', color: 'bg-red-100 text-red-700', desc: 'Occupier disputes, significant issues' },
              ].map((r) => (
                <div key={r.level} className="flex items-start gap-3 mb-3 last:mb-0">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.color} shrink-0`}>{r.level}</span>
                  <span className="text-xs text-gray-500">{r.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
