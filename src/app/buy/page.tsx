import { Suspense } from 'react';
import { Metadata } from 'next';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import FilterSidebar from '@/components/FilterSidebar';
import SortSelect from '@/components/SortSelect';
import { properties } from '@/lib/properties';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const location = params.location;
  const type = params.type;

  const locationStr = location ? ` in ${location}` : ' in Malaysia';
  const typeStr = type ? ` ${type.charAt(0).toUpperCase() + type.slice(1)}` : ' Property';

  return {
    title: `${typeStr} for Sale${locationStr}`,
    description: `Browse verified${typeStr.toLowerCase()} listings for sale${locationStr}. Compare prices, view photos, and contact trusted agents on eHartanah.`,
    keywords: [
      `property for sale${locationStr}`,
      `house for sale Malaysia`,
      `condo for sale KL`,
      `rumah untuk dijual Malaysia`,
      `hartanah untuk dijual`,
      `buy property Malaysia`,
    ],
    openGraph: {
      title: `${typeStr} for Sale${locationStr} | eHartanah`,
      description: `Find your perfect${typeStr.toLowerCase()} for sale${locationStr} on eHartanah.`,
    },
    alternates: {
      canonical: `/buy${location ? `?location=${location}` : ''}`,
    },
  };
}

function sortLabel(sort: string) {
  switch (sort) {
    case 'price-asc': return 'Price: Low to High';
    case 'price-desc': return 'Price: High to Low';
    case 'size-asc': return 'Size: Small to Large';
    case 'newest': default: return 'Newest First';
  }
}

export default async function BuyPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const location = params.location?.toLowerCase() ?? '';
  const typeFilter = params.type ? params.type.split(',') : [];
  const minPrice = params.minPrice ? Number(params.minPrice) : 0;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : Infinity;
  const minSize = params.minSize ? Number(params.minSize) : 0;
  const stateFilter = params.state?.toLowerCase() ?? '';
  const sort = params.sort ?? 'newest';

  let filtered = properties.filter(p => p.listingType === 'sale');

  if (location) {
    filtered = filtered.filter(p =>
      p.area.toLowerCase().includes(location) ||
      p.state.toLowerCase().includes(location) ||
      p.address.toLowerCase().includes(location)
    );
  }
  if (typeFilter.length) {
    filtered = filtered.filter(p => typeFilter.includes(p.type));
  }
  if (minPrice) filtered = filtered.filter(p => p.price >= minPrice);
  if (maxPrice !== Infinity) filtered = filtered.filter(p => p.price <= maxPrice);
  if (minSize) filtered = filtered.filter(p => p.size >= minSize);
  if (stateFilter) filtered = filtered.filter(p => p.state.toLowerCase().includes(stateFilter));

  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (sort === 'size-asc') filtered.sort((a, b) => a.size - b.size);
  else filtered.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top search strip */}
      <div className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <SearchBar initialTab="buy" compact />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <Suspense>
              <FilterSidebar listingType="buy" />
            </Suspense>
          </div>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h1 className="text-lg font-bold text-gray-800">
                  Properties for Sale{location ? ` in ${params.location}` : ' in Malaysia'}
                </h1>
                <p className="text-sm text-gray-500">{filtered.length} {filtered.length === 1 ? 'property' : 'properties'} found</p>
              </div>
              <Suspense>
                <SortSelect current={sort} />
              </Suspense>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                <div className="text-5xl mb-4">🏠</div>
                <h3 className="font-semibold text-gray-700 mb-2">No properties found</h3>
                <p className="text-sm text-gray-500">Try adjusting your filters or searching a different area.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(p => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
