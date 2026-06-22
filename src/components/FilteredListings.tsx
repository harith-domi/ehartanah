'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import type { Listing } from '@/lib/listings';
import { plausibleSize } from '@/lib/listings';
import ListingCard from '@/components/ListingCard';
import T from '@/components/T';

interface FilteredListingsProps {
  listings: Listing[];
}

function FilteredListingsInner({ listings }: FilteredListingsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : null;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null;
  const beds = searchParams.get('beds') ? Number(searchParams.get('beds')) : null;
  const size = searchParams.get('size') ? Number(searchParams.get('size')) : null;
  const tenure = searchParams.get('tenure') ?? '';
  const region = searchParams.get('region') ?? '';
  const source = searchParams.get('source') ?? 'all'; // 'all' | 'agency' | 'community'

  const agencyListings = listings.filter((l) => l.featured === true);
  const communityListings = listings.filter((l) => !l.featured);

  const base = source === 'agency' ? agencyListings : source === 'community' ? communityListings : listings;
  const total = base.length;

  const filtered = base.filter((l) => {
    if (minPrice !== null && (l.price === null || l.price < minPrice)) return false;
    if (maxPrice !== null && (l.price === null || l.price > maxPrice)) return false;
    if (beds !== null && (l.bedrooms === null || l.bedrooms < beds)) return false;
    if (size !== null) {
      const s = plausibleSize(l);
      if (s === null || s < size) return false;
    }
    if (region && region !== 'All' && l.region !== region) return false;
    void tenure;
    return true;
  });

  const hasFilters =
    minPrice !== null || maxPrice !== null || beds !== null || size !== null || (region && region !== 'All') || tenure;

  function setSource(val: string) {
    const p = new URLSearchParams(searchParams.toString());
    if (val === 'all') p.delete('source');
    else p.set('source', val);
    router.push(`${pathname}?${p.toString()}`);
  }

  const tabs = [
    { key: 'all', labelEn: `All (${listings.length.toLocaleString('en-MY')})`, labelBm: `Semua (${listings.length.toLocaleString('en-MY')})` },
    { key: 'agency', labelEn: `Agency (${agencyListings.length})`, labelBm: `Agensi (${agencyListings.length})` },
    { key: 'community', labelEn: `Community (${communityListings.length.toLocaleString('en-MY')})`, labelBm: `Komuniti (${communityListings.length.toLocaleString('en-MY')})` },
  ];

  return (
    <div>
      {/* Source tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
        <div className="flex gap-2 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSource(tab.key)}
              className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                source === tab.key
                  ? 'border-[#0f2540] text-[#0f2540]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <T en={tab.labelEn} bm={tab.labelBm} />
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {hasFilters ? (
            <>
              <span className="font-semibold text-gray-800">{filtered.length}</span>{' '}
              <T en={`of ${total} listings`} bm={`daripada ${total} senarai`} />
            </>
          ) : (
            <>
              <span className="font-semibold text-gray-800">{total}</span>{' '}
              <T en="listings" bm="senarai" />
            </>
          )}
        </p>
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
          <p className="text-lg font-semibold text-gray-500 mb-2">
            <T en="No listings match your filters" bm="Tiada senarai sepadan dengan tapisan anda" />
          </p>
          <p className="text-sm text-gray-400">
            <T en="Try adjusting or clearing the filters above." bm="Cuba laraskan atau padamkan tapisan di atas." />
          </p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filtered.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function FilteredListings({ listings }: FilteredListingsProps) {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-2">
          <p className="text-sm text-gray-400 animate-pulse">
            <T en="Loading listings…" bm="Memuatkan senarai…" />
          </p>
        </div>
      }
    >
      <FilteredListingsInner listings={listings} />
    </Suspense>
  );
}
