import ListingCard from '@/components/ListingCard';
import Pagination from '@/components/Pagination';
import Link from 'next/link';
import {
  Listing,
  filterListings,
  paginate,
  uniqueCategories,
  uniqueRegions,
} from '@/lib/listings';

export interface BrowseParams {
  q?: string;
  region?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  beds?: string;
  sort?: string;
  page?: string;
}

export default function ListingBrowser({
  listings,
  basePath,
  title,
  subtitle,
  params,
}: {
  listings: Listing[];
  basePath: string;
  title: string;
  subtitle: string;
  params: BrowseParams;
}) {
  const regions = uniqueRegions(listings);
  const categories = uniqueCategories(listings);

  const filtered = filterListings(listings, {
    q: params.q,
    region: params.region,
    category: params.category,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    beds: params.beds ? Number(params.beds) : undefined,
    sort: params.sort,
  });

  const { items, page, totalPages, total } = paginate(filtered, params.page ? Number(params.page) : 1);

  const selectClass = 'border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-400 bg-white';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero bar */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h1>
          <p className="text-emerald-200 text-sm">{subtitle}</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <form method="GET" action={basePath} className="flex flex-wrap gap-3 items-center">
            <input
              name="q"
              defaultValue={params.q || ''}
              placeholder="Search area, building, keyword…"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-400 w-full sm:w-56"
            />
            <select name="region" defaultValue={params.region || 'All'} className={selectClass}>
              <option value="All">All Regions</option>
              {regions.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <select name="category" defaultValue={params.category || 'All'} className={selectClass}>
              <option value="All">All Categories</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select name="beds" defaultValue={params.beds || ''} className={selectClass}>
              <option value="">Any Beds</option>
              {[1, 2, 3, 4, 5].map((b) => <option key={b} value={b}>{b}+ Beds</option>)}
            </select>
            <input
              name="minPrice"
              defaultValue={params.minPrice || ''}
              placeholder="Min RM"
              inputMode="numeric"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-400 w-24"
            />
            <input
              name="maxPrice"
              defaultValue={params.maxPrice || ''}
              placeholder="Max RM"
              inputMode="numeric"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-400 w-24"
            />
            <select name="sort" defaultValue={params.sort || 'newest'} className={selectClass}>
              <option value="newest">Sort: Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="size-desc">Size: Largest First</option>
            </select>
            <button type="submit" className="bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-emerald-800 transition-colors">
              Apply Filters
            </button>
            <span className="ml-auto text-sm text-gray-500">{total.toLocaleString('en-MY')} properties found</span>
          </form>
        </div>
      </div>

      {/* Listings grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {items.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <p className="font-medium">No properties match your filters</p>
            <Link href={basePath} className="text-emerald-700 text-sm mt-2 inline-block">Clear filters</Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {items.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
            <Pagination
              basePath={basePath}
              params={{ q: params.q, region: params.region, category: params.category, beds: params.beds, minPrice: params.minPrice, maxPrice: params.maxPrice, sort: params.sort }}
              page={page}
              totalPages={totalPages}
            />
          </>
        )}
      </div>
    </div>
  );
}
