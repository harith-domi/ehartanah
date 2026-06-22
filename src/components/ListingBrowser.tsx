import ListingCard from '@/components/ListingCard';
import Pagination from '@/components/Pagination';
import T from '@/components/T';
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
  source?: string;
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
  // Source filter
  const sourceFiltered =
    params.source === 'agency'
      ? listings.filter((l) => l.featured === true)
      : params.source === 'community'
      ? listings.filter((l) => !l.featured)
      : listings;

  // Type filter
  const typeFiltered =
    params.type === 'rent'
      ? sourceFiltered.filter((l) => l.listingType === 'rent')
      : params.type === 'sale'
      ? sourceFiltered.filter((l) => l.listingType === 'sale')
      : sourceFiltered;

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
    { label: { en: 'All Properties', bm: 'Semua Hartanah' }, value: '' },
    { label: { en: 'For Rent', bm: 'Untuk Disewa' }, value: 'rent' },
    { label: { en: 'For Sale', bm: 'Untuk Dijual' }, value: 'sale' },
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
    if (params.source) p.set('source', params.source);
    const qs = p.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  const activeSource = params.source ?? 'all';
  const agencyCount = listings.filter((l) => l.featured === true).length;
  const communityCount = listings.filter((l) => !l.featured).length;

  function sourceHref(val: string) {
    const p = new URLSearchParams();
    if (params.type) p.set('type', params.type);
    if (params.q) p.set('q', params.q);
    if (params.region && params.region !== 'All') p.set('region', params.region);
    if (params.category && params.category !== 'All') p.set('category', params.category);
    if (params.minPrice) p.set('minPrice', params.minPrice);
    if (params.maxPrice) p.set('maxPrice', params.maxPrice);
    if (params.beds) p.set('beds', params.beds);
    if (params.sort) p.set('sort', params.sort);
    if (val !== 'all') p.set('source', val);
    const qs = p.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  const inp = 'border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#d4a017] bg-white h-10';
  const sel = inp + ' cursor-pointer';

  const countEn =
    activeType === 'rent' ? `rental propert${total === 1 ? 'y' : 'ies'} found`
    : activeType === 'sale' ? `sale propert${total === 1 ? 'y' : 'ies'} found`
    : `propert${total === 1 ? 'y' : 'ies'} found`;
  const countBm =
    activeType === 'rent' ? 'hartanah sewaan dijumpai'
    : activeType === 'sale' ? 'hartanah jualan dijumpai'
    : 'hartanah dijumpai';
  const countLabel = (
    <>{total.toLocaleString('en-MY')} <T en={countEn} bm={countBm} /></>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0f2540] to-[#1e3a5f] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1"><T en="Browse Properties" bm="Cari Hartanah" /></h1>
          <p className="text-[#f0c040] text-sm">{listings.length.toLocaleString('en-MY')} <T en="listings across Malaysia — rent and for sale" bm="listing di seluruh Malaysia — sewa dan jualan" /></p>
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
                    <T en={label.en} bm={label.bm} />
                  </Link>
                );
              })}
              <span className="ml-auto self-center text-xs text-gray-400 font-medium">{countLabel}</span>
            </div>
          )}

          {/* Source tabs — Agency / Community */}
          <div className="flex gap-0 border-b border-gray-100">
            {[
              { key: 'all', en: `All (${listings.length.toLocaleString('en-MY')})`, bm: `Semua (${listings.length.toLocaleString('en-MY')})` },
              { key: 'agency', en: `Agency (${agencyCount})`, bm: `Agensi (${agencyCount})` },
              { key: 'community', en: `Community (${communityCount.toLocaleString('en-MY')})`, bm: `Komuniti (${communityCount.toLocaleString('en-MY')})` },
            ].map((tab) => (
              <Link
                key={tab.key}
                href={sourceHref(tab.key)}
                className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeSource === tab.key
                    ? 'border-[#0f2540] text-[#0f2540]'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                <T en={tab.en} bm={tab.bm} />
              </Link>
            ))}
          </div>

          {/* Filter row — on mobile only search + Search are visible; the rest
              collapses behind a Filters toggle (CSS-only checkbox + peer) */}
          <form method="GET" action={basePath} className="py-3">
            {params.type && <input type="hidden" name="type" value={params.type} />}
            {params.source && <input type="hidden" name="source" value={params.source} />}
            <input type="checkbox" id="filter-toggle" className="peer hidden" />

            {/* Always-visible compact row */}
            <div className="flex gap-2 items-center">
              <input
                name="q"
                defaultValue={params.q || ''}
                placeholder="Area, building, keyword…"
                className={`${inp} flex-1 min-w-0 sm:flex-none sm:w-52`}
              />
              <button
                type="submit"
                className="bg-[#d4a017] hover:bg-[#c49012] text-[#0f2540] font-bold text-sm px-4 sm:px-5 h-10 rounded-xl transition-colors shrink-0"
              >
                <T en="Search" bm="Cari" />
              </button>
              <label
                htmlFor="filter-toggle"
                className="sm:hidden flex items-center gap-1 border border-gray-200 text-gray-600 text-sm font-semibold px-3 h-10 rounded-xl cursor-pointer select-none shrink-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <T en="Filters" bm="Tapis" />
              </label>
            </div>

            {/* Collapsible advanced filters — hidden on mobile until toggled */}
            <div className="hidden peer-checked:flex sm:flex flex-wrap gap-2 items-center mt-2">
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
              {/* Sort — now also available on mobile inside the expanded panel */}
              <select name="sort" defaultValue={params.sort || 'newest'} className={`${sel} flex-1 sm:flex-none`}>
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
                <T en="Private only" bm="Pemilik sahaja" />
              </label>
              {/* Price presets */}
              {(params.type === 'sale' || params.type === 'rent') && (() => {
                const presets = params.type === 'sale'
                  ? [
                      { label: '< RM300k', min: '', max: '300000' },
                      { label: 'RM300k–600k', min: '300000', max: '600000' },
                      { label: 'RM600k–1M', min: '600000', max: '1000000' },
                      { label: '> RM1M', min: '1000000', max: '' },
                    ]
                  : [
                      { label: '< RM1k', min: '', max: '1000' },
                      { label: 'RM1k–2k', min: '1000', max: '2000' },
                      { label: 'RM2k–3.5k', min: '2000', max: '3500' },
                      { label: '> RM3.5k', min: '3500', max: '' },
                    ];
                return (
                  <div className="flex gap-1.5 flex-wrap w-full sm:w-auto">
                    {presets.map((p) => {
                      const active = params.minPrice === p.min && params.maxPrice === p.max;
                      const href = (() => {
                        const q = new URLSearchParams();
                        if (params.type) q.set('type', params.type);
                        if (params.q) q.set('q', params.q);
                        if (params.region && params.region !== 'All') q.set('region', params.region);
                        if (params.category && params.category !== 'All') q.set('category', params.category);
                        if (params.beds) q.set('beds', params.beds);
                        if (params.sort) q.set('sort', params.sort);
                        if (params.privateOnly === 'true') q.set('privateOnly', 'true');
                        if (!active) {
                          if (p.min) q.set('minPrice', p.min);
                          if (p.max) q.set('maxPrice', p.max);
                        }
                        return `${basePath}?${q.toString()}`;
                      })();
                      return (
                        <Link key={p.label} href={href}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${active ? 'bg-[#0f2540] text-white border-[#0f2540]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#0f2540] hover:text-[#0f2540]'}`}
                        >{p.label}</Link>
                      );
                    })}
                  </div>
                );
              })()}
              {/* Clear */}
              {(params.q || params.region || params.category || params.minPrice || params.maxPrice || params.beds || params.privateOnly) && (
                <Link
                  href={activeType ? `${basePath}?type=${activeType}` : basePath}
                  className="text-xs text-gray-400 hover:text-gray-600 underline whitespace-nowrap"
                >
                  <T en="Clear filters" bm="Padam tapisan" />
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
            <p className="font-semibold text-gray-500 mb-2"><T en="No properties match your filters" bm="Tiada hartanah sepadan dengan tapisan anda" /></p>
            <p className="text-sm mb-4"><T en="Try a different area, wider price range, or fewer filters." bm="Cuba kawasan lain, julat harga lebih luas, atau kurangkan tapisan." /></p>
            <Link href={activeType ? `${basePath}?type=${activeType}` : basePath} className="text-[#1e3a5f] text-sm font-semibold underline">
              <T en="Clear all filters" bm="Padam semua tapisan" />
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
