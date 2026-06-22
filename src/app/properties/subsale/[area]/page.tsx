import type { Metadata } from 'next';
import Link from 'next/link';
import { saleListings } from '@/lib/listings';
import ListingCard from '@/components/ListingCard';

function toSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function fromSlug(s: string) {
  return s.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function topRegions(n: number): string[] {
  const counts = new Map<string, number>();
  for (const l of saleListings) {
    if (l.region) counts.set(l.region, (counts.get(l.region) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([r]) => r);
}

export function generateStaticParams() {
  return topRegions(20).map((region) => ({ area: toSlug(region) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const { area } = await params;
  const region = fromSlug(area);
  const count = saleListings.filter((l) => l.region === region).length;
  return {
    title: `Properties for Sale in ${region} | eHartanah`,
    description: `Browse ${count.toLocaleString('en-MY')} subsale properties in ${region}. Find houses, condos, land and commercial property for sale in ${region} on eHartanah.`,
  };
}

export default async function SubsaleAreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area } = await params;
  const region = fromSlug(area);
  const filtered = saleListings.filter((l) => l.region === region);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-[#0f2540] text-white">
        <div className="max-w-7xl mx-auto px-4 py-10 lg:py-14">
          <nav className="flex items-center gap-2 text-sm text-blue-200 mb-5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <svg className="w-4 h-4 shrink-0 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/subsale" className="hover:text-white transition-colors">Subsale</Link>
            <svg className="w-4 h-4 shrink-0 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white font-medium">{region}</span>
          </nav>
          <div className="flex flex-wrap items-start gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl lg:text-4xl font-black leading-tight">
                Properties for Sale in {region}
              </h1>
              <p className="text-blue-200 mt-2 text-sm lg:text-base">
                Subsale houses, condos, land &amp; commercial property in {region}
              </p>
            </div>
            <span className="shrink-0 bg-white/15 border border-white/25 text-white font-bold text-lg lg:text-2xl px-5 py-3 rounded-2xl">
              {filtered.length.toLocaleString('en-MY')}
              <span className="block text-[11px] font-normal text-blue-200 -mt-0.5">listings</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <h2 className="text-xl font-bold text-gray-700 mb-2">No listings found</h2>
            <p className="text-gray-500 mb-6">We couldn&apos;t find any subsale listings for &quot;{region}&quot;.</p>
            <Link href="/subsale" className="inline-flex items-center gap-2 bg-[#0f2540] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#0a1e38] transition-colors">
              Back to Subsale
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <Link href="/subsale" className="inline-flex items-center gap-1.5 text-sm text-[#1e3a5f] hover:text-[#0f2540] font-medium transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                All Subsale Listings
              </Link>
              <span className="text-sm text-gray-500">{filtered.length.toLocaleString('en-MY')} properties</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
              {filtered.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
