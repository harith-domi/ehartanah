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
  type?: string;   // 'rent' | 'sale' | ''
  region?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  beds?: string;
  sort?: string;
  page?: string;
  privateOnly?: string;
}

export default function ListingBrowser({
  listings,
  basePath,
  params,
  showTypeFilter = false,
}: {
  listings: Listing[];
  basePath: string;
  params: BrowseParams;
  showTypeFilter?: boolean;
}) {
  // Type filter
  const typeFiltered =
    params.type === 'rent'
      ? listings.filter((l) => l.listingType === 'rent')
      : params.type === 'sale'
      ? listings.filter((l) => l.listingType === 'sale')
      : listings;

  const regions = uniqueRegions(typeFiltered);
  const categories = uniqueCategories(typeFiltered);

  const filtered = filterListings(typeFiltered, {
    q: params.q,
    region: params.region,
    category: params.category,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    beds: params.beds ? Number(params.beds) : undefined,
    sort: params.sort,
    privateOnly: params.privateOnly === 'true',
  });

  const { items, page, totalPages, total } = paginate(filtered, params.page ? Number(params.page) : 1);

  const activeType = params.type || '';

  const typePills = [
    { label: 'All Properties', value: '' },
    { label: 'For Rent', value: 'rent' },
    { label: 'For Sale', value: 'sale' },
  ];

  function typeHref(value: string) {
    const p = new URLSearchParams();
    if (value) p.set('type', value);
    if (params.q) p.set('q', params.q);
    if (params.region && params.region !== 'All') p.set('region', params.region);
    if (params.category && params.category !== 'All') p.set('category', params.category);
    if (params.minPrice) p.set('minPrice', params.minPrice);
    if (params.maxPrice) p.set('maxPrice', params.maxPrice);
    if (params.beds) p.set('beds', params.beds);
    if (params.sort) p.set('sort', params.sort);
    if (params.privateOnly === 'true') p.set('privateOnly', 'true');
    const qs = p.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  const inp = 'border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#d4a017] bg-white h-10';
  const sel = inp + ' cursor-pointer';

  const typeLabel = activeType === 'rent' ? 'Rental' : activeType === 'sale' ? 'Sale' : '';
  const countLabel = `${total.toLocaleString('en-MY')} ${typeLabel ? typeLabel + ' ' : ''}propert${total === 1 ? 'y' : 'ies'} found`;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0f2540] to-[#1e3a5f] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Browse Properties</h1>
          <p className="text-[#f0c040] text-sm">{listings.length.toLocaleString('en-MY')} listings across Malaysia — rent and for sale</p>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Type pills — only on combined page */}
          {showTypeFilter && (
            <div className="flex gap-2 pt-3 pb-2 border-b border-gray-100 overflow-x-auto no-scrollbar">
              {typePills.map(({ label, value }) => {
                const isActive = activeType === value;
                return (
                  <Link
                    key={value}
                    href={typeHref(value)}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-[#0f2540] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-500 hover:bg-[#edf2f8] hover:text-[#0f2540]'
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
              <span className="ml-auto self-center text-xs text-gray-400 font-medium">{countLabel}</span>
            </div>
          )}

          {/* Filter row */}
          <form method="GET" action={basePath} className="py-3">
            {params.type && <input type="hidden" name="type" value={params.type} />}
            <div className="flex flex-wrap gap-2 items-center">
              {/* Search */}
              <input
                name="q"
                defaultValue={params.q || ''}
                placeholder="Area, building, keyword…"
                className={`${inp} w-full sm:w-52`}
              />
              {/* Region */}
              <select name="region" defaultValue={params.region || 'All'} className={`${sel} flex-1 sm:flex-none`}>
                <option value="All">All States</option>
                {regions.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              {/* Category */}
              <select name="category" defaultValue={params.category || 'All'} className={`${sel} flex-1 sm:flex-none`}>
                <option value="All">All Types</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {/* Beds */}
              <select name="beds" defaultValue={params.beds || ''} className={`${sel} flex-1 sm:flex-none sm:w-28`}>
                <option value="">Any Beds</option>
                {[1, 2, 3, 4, 5].map((b) => <option key={b} value={b}>{b}+ Beds</option>)}
              </select>
              {/* Price range */}
              <div className="flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 h-10 bg-white w-full sm:w-auto">
                <span className="text-gray-400 text-xs font-medium">RM</span>
                <input
                  name="minPrice"
                  defaultValue={params.minPrice || ''}
                  placeholder="Min"
                  inputMode="numeric"
                  className="flex-1 min-w-0 sm:w-16 text-sm outline-none bg-transparent"
                />
                <span className="text-gray-300">–</span>
                <input
                  name="maxPrice"
                  defaultValue={params.maxPrice || ''}
                  placeholder="Max"
                  inputMode="numeric"
                  className="flex-1 min-w-0 sm:w-16 text-sm outline-none bg-transparent"
                />
              </div>
              {/* Sort */}
              <select name="sort" defaultValue={params.sort || 'newest'} className={`${sel} hidden sm:block`}>
                <option value="newest">Newest first</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="size-desc">Largest first</option>
                <option value="psf-asc">RM/sqft: Low → High</option>
              </select>
              {/* Private toggle */}
              <label className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer select-none whitespace-nowrap">
                <input
                  type="checkbox"
                  name="privateOnly"
                  value="true"
                  defaultChecked={params.privateOnly === 'true'}
                  className="w-4 h-4 accent-[#0f2540]"
                />
                Private only
              </label>
              {/* Apply */}
              <button
                type="submit"
                className="bg-[#d4a017] hover:bg-[#c49012] text-[#0f2540] font-bold text-sm px-5 h-10 rounded-xl transition-colors shrink-0"
              >
                Search
              </button>
              {/* Clear */}
              {(params.q || params.region || params.category || params.minPrice || params.maxPrice || params.beds || params.privateOnly) && (
                <Link
                  href={activeType ? `${basePath}?type=${activeType}` : basePath}
                  className="text-xs text-gray-400 hover:text-gray-600 underline whitespace-nowrap"
                >
                  Clear filters
                </Link>
              )}
              {/* Count (non-type-filter pages) */}
              {!showTypeFilter && (
                <span className="ml-auto text-sm text-gray-500 font-medium">{countLabel}</span>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {items.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <p className="font-semibold text-gray-500 mb-2">No properties match your filters</p>
            <p className="text-sm mb-4">Try a different area, wider price range, or fewer filters.</p>
            <Link href={activeType ? `${basePath}?type=${activeType}` : basePath} className="text-[#1e3a5f] text-sm font-semibold underline">
              Clear all filters
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {items.map((l) => <ListingCard key={l.id} listing={l} />)}
            </div>
            <Pagination
              basePath={basePath}
              params={{
                type: params.type,
                q: params.q,
                region: params.region,
                category: params.category,
                beds: params.beds,
                minPrice: params.minPrice,
                maxPrice: params.maxPrice,
                sort: params.sort,
                privateOnly: params.privateOnly,
              }}
              page={page}
              totalPages={totalPages}
            />
          </>
        )}
      </div>
    </div>
  );
}
