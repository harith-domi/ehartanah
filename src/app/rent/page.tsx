import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { rentListings, uniqueRegions } from '@/lib/listings';
import FilterBar from '@/components/FilterBar';
import FilteredListings from '@/components/FilteredListings';
import T from '@/components/T';

export const metadata: Metadata = {
  title: 'Rental Properties in Malaysia | eHartanah',
  description:
    'Browse rental apartments, houses, rooms and commercial space across Malaysia. Filter by area, price, type and bedrooms. Direct from private owners and agencies.',
};

function toSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function topRegions(n: number): { region: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const l of rentListings) {
    if (l.region) counts.set(l.region, (counts.get(l.region) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([region, count]) => ({ region, count }));
}

export default function RentPage() {
  const top8 = topRegions(8);
  const regions = uniqueRegions(rentListings);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-[#0f2540] text-white">
        <div className="max-w-7xl mx-auto px-4 py-10 lg:py-14">
          <h1 className="text-2xl lg:text-4xl font-black leading-tight mb-2">
            <T en="Rental Properties in Malaysia" bm="Hartanah Sewa di Malaysia" />
          </h1>
          <p className="text-blue-200 text-sm lg:text-base mb-6">
            <T
              en={`${rentListings.length.toLocaleString('en-MY')} properties for rent — apartments, houses, rooms & commercial`}
              bm={`${rentListings.length.toLocaleString('en-MY')} hartanah untuk disewa — apartmen, rumah, bilik & komersial`}
            />
          </p>

          {/* Browse by Area chips */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-3">
              <T en="Browse by Area" bm="Cari Mengikut Kawasan" />
            </p>
            <div className="flex flex-wrap gap-2">
              {top8.map(({ region, count }) => (
                <Link
                  key={region}
                  href={`/properties/rent/${toSlug(region)}`}
                  className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white text-sm font-medium px-3.5 py-1.5 rounded-full transition-all"
                >
                  {region}
                  <span className="text-blue-300 text-xs">{count.toLocaleString('en-MY')}</span>
                </Link>
              ))}
              <Link
                href="/browse?type=rent"
                className="inline-flex items-center gap-1 bg-transparent hover:bg-white/10 border border-white/30 text-blue-200 hover:text-white text-sm font-medium px-3.5 py-1.5 rounded-full transition-all"
              >
                <T en="All areas" bm="Semua kawasan" />
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <Suspense fallback={null}>
        <FilterBar regions={regions} listingType="rent" />
      </Suspense>

      {/* Filtered listings */}
      <FilteredListings listings={rentListings} />
    </main>
  );
}
