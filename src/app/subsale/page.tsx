import type { Metadata } from 'next';
import Link from 'next/link';
import SubsaleCard from '@/components/SubsaleCard';
import { subsaleProperties } from '@/lib/data/subsale';

export const metadata: Metadata = {
  title: 'Subsale Properties in Malaysia',
  description: 'Browse verified subsale properties for sale across Malaysia — KL, Selangor, Penang, Johor. Filter by rental yield, tenure, and location.',
};

const states = ['All', 'Kuala Lumpur', 'Selangor', 'Penang', 'Johor'];
const types = ['All', 'Condo', 'House', 'Apartment', 'Bungalow', 'Townhouse'];
const tenures = ['All', 'Freehold', 'Leasehold'];

export default async function SubsalePage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string; type?: string; tenure?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const selectedState = params.state || 'All';
  const selectedType = params.type || 'All';
  const selectedTenure = params.tenure || 'All';
  const sort = params.sort || 'featured';

  let filtered = subsaleProperties;
  if (selectedState !== 'All') filtered = filtered.filter((p) => p.state === selectedState);
  if (selectedType !== 'All') filtered = filtered.filter((p) => p.type.toLowerCase() === selectedType.toLowerCase());
  if (selectedTenure !== 'All') filtered = filtered.filter((p) => p.tenure === selectedTenure);

  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === 'yield') filtered = [...filtered].sort((a, b) => b.rentalYield - a.rentalYield);
  else filtered = [...filtered].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero bar */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Subsale Properties in Malaysia</h1>
          <p className="text-blue-200 text-sm">Verified listings with AI-powered rental yield analysis and investment scoring</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <form method="GET" className="flex flex-wrap gap-3 items-center">
            <select name="state" defaultValue={selectedState} className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400">
              {states.map((s) => <option key={s}>{s}</option>)}
            </select>
            <select name="type" defaultValue={selectedType} className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400">
              {types.map((t) => <option key={t}>{t}</option>)}
            </select>
            <select name="tenure" defaultValue={selectedTenure} className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400">
              {tenures.map((t) => <option key={t}>{t}</option>)}
            </select>
            <select name="sort" defaultValue={sort} className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400">
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="yield">Highest Yield</option>
            </select>
            <button type="submit" className="bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
              Apply Filters
            </button>
            <span className="ml-auto text-sm text-gray-500">{filtered.length} properties found</span>
          </form>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Listings grid */}
          <div className="lg:col-span-3">
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <p className="font-medium">No properties match your filters</p>
                <Link href="/subsale" className="text-blue-700 text-sm mt-2 inline-block">Clear filters</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((p) => (
                  <SubsaleCard key={p.id} property={p} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* AI CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-violet-700 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-2 text-sm">AI Property Matching</h3>
              <p className="text-blue-100 text-xs mb-4 leading-relaxed">
                Tell our AI your budget, preferred area, and investment goals — get a personalised shortlist in seconds.
              </p>
              <Link href="/ai-search" className="block text-center bg-white text-blue-700 font-semibold text-sm py-2.5 rounded-xl hover:bg-blue-50 transition-colors">
                Find My Match
              </Link>
            </div>

            {/* Yield guide */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3 text-sm">Rental Yield by Area</h3>
              {[
                { area: 'Cheras, KL', yield: '6.5–7.5%' },
                { area: 'Subang Jaya', yield: '5.5–7.0%' },
                { area: 'Mont Kiara', yield: '5.0–6.5%' },
                { area: 'Georgetown, Penang', yield: '5.0–6.0%' },
                { area: 'Johor Bahru', yield: '5.5–7.5%' },
              ].map((row) => (
                <div key={row.area} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0 text-xs">
                  <span className="text-gray-600">{row.area}</span>
                  <span className="font-semibold text-green-700">{row.yield}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 mb-2 text-sm">Talk to an Agent</h3>
              <p className="text-gray-500 text-xs mb-3">Get expert advice from a licensed property agent in your area of interest.</p>
              <a
                href="https://wa.me/60123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
