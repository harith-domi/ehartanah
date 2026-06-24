import { auctionListings, ownListings, saleListings, rentListings } from '@/lib/listings';
import { createAdminSupabase } from '@/lib/supabase';
import type { AdminListing } from '@/lib/supabase';
import AdminFilters from './AdminFilters';
import AdminTable from './AdminTable';
import Link from 'next/link';

const DOMAIN = 'https://ehartanahmalaysia.com';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Admin — All Listings' };

const PER_PAGE = 100;


export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; q?: string; source?: string; region?: string; page?: string }>;
}) {
  const { key, q = '', source = '', region = '', page: pageStr = '1' } = await searchParams;

  const adminKey = process.env.ADMIN_KEY?.trim();
  if (!adminKey || key !== adminKey) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-4xl font-bold text-gray-300 mb-2">403</p>
          <p className="text-gray-500">Access denied.</p>
        </div>
      </main>
    );
  }

  // Fetch Supabase admin-added listings
  type RowSource = 'New' | 'Agency' | 'Sale' | 'Rent' | 'Auction' | 'Hidden';
  let supabaseRows: { id: string; propertyType: string; region: string; address: string; price: number; source: RowSource; publicUrl: string; isSupabase: true; updatedAt?: string | null; thumbnailUrl?: string | null; imageCount?: number | null }[] = [];
  let allSupabaseRows: typeof supabaseRows = [];
  const hiddenIds = new Set<string>();
  try {
    const sb = createAdminSupabase();
    const { data } = await sb.from('admin_listings').select('id,category,region,location,price,source,updated_at,thumbnail_url,photos').order('updated_at', { ascending: false });
    if (data) {
      (data as AdminListing[]).forEach((l) => { if (l.source === 'Hidden') hiddenIds.add(l.id); });
      allSupabaseRows = (data as AdminListing[]).map((l) => ({
        id: l.id,
        propertyType: l.category,
        region: l.region,
        address: l.location,
        price: l.price ?? 0,
        source: (['New','Agency','Sale','Rent','Auction','Hidden'].includes(l.source ?? '') ? l.source : 'New') as RowSource,
        publicUrl: `${DOMAIN}/listings/${l.id}`,
        isSupabase: true as const,
        updatedAt: l.updated_at ?? null,
        thumbnailUrl: l.thumbnail_url ?? null,
        imageCount: Array.isArray(l.photos) ? l.photos.length : null,
      }));
      supabaseRows = allSupabaseRows.filter(r => r.source !== 'Hidden');
    }
  } catch {}

  const allRows = [
    ...allSupabaseRows,
    ...auctionListings.filter((l) => !hiddenIds.has(l.id)).map((l) => ({ id: l.id, propertyType: l.propertyType, region: l.region, address: l.address, price: l.reservePrice, source: 'Auction' as const, publicUrl: `${DOMAIN}/auction/${l.id}`, isSupabase: false as const, imageCount: l.imageCount ?? 0 })),
    ...ownListings.filter((l) => !hiddenIds.has(l.id)).map((l) => ({ id: l.id, propertyType: l.category, region: l.region, address: l.location, price: l.price ?? 0, source: 'Agency' as const, publicUrl: `${DOMAIN}/listings/${l.id}`, isSupabase: false as const, imageCount: l.imageCount ?? 0 })),
    ...saleListings.filter((l) => !l.featured && !hiddenIds.has(l.id)).map((l) => ({ id: l.id, propertyType: l.category, region: l.region, address: l.location, price: l.price ?? 0, source: 'Sale' as const, publicUrl: `${DOMAIN}/listings/${l.id}`, isSupabase: false as const, imageCount: l.imageCount ?? 0 })),
    ...rentListings.filter((l) => !l.featured && !hiddenIds.has(l.id)).map((l) => ({ id: l.id, propertyType: l.category, region: l.region, address: l.location, price: l.price ?? 0, source: 'Rent' as const, publicUrl: `${DOMAIN}/listings/${l.id}`, isSupabase: false as const, imageCount: l.imageCount ?? 0 })),
  ];

  const regions = [...new Set(allRows.map((r) => r.region).filter(Boolean))].sort();

  const ql = q.toLowerCase();
  const filtered = allRows.filter((r) => {
    if (!source && r.source === 'Hidden') return false; // hide by default unless explicitly filtered
    if (q && !r.address?.toLowerCase().includes(ql) && !r.id.toLowerCase().includes(ql) && !r.region?.toLowerCase().includes(ql)) return false;
    if (source && r.source !== source) return false;
    if (region && r.region !== region) return false;
    return true;
  });

  const page = Math.max(1, Number(pageStr) || 1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const baseParams = new URLSearchParams({ key, ...(q && { q }), ...(source && { source }), ...(region && { region }) });
  const prevParams = new URLSearchParams(baseParams); prevParams.set('page', String(page - 1));
  const nextParams = new URLSearchParams(baseParams); nextParams.set('page', String(page + 1));

  const counts = {
    Agency:  allRows.filter(r => r.source === 'Agency').length,
    Sale:    allRows.filter(r => r.source === 'Sale').length,
    Rent:    allRows.filter(r => r.source === 'Rent').length,
    Auction: allRows.filter(r => r.source === 'Auction').length,
  };

  return (
    <main className="min-h-screen bg-slate-100">

      {/* Top nav bar */}
      <header className="bg-[#0f2540] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-sm font-black">eH</div>
          <div>
            <p className="text-sm font-bold leading-none">eHartanah Admin</p>
            <p className="text-blue-300 text-[11px] mt-0.5">ehartanahmalaysia.com</p>
          </div>
        </div>
        <Link
          href={`/admin/new?key=${encodeURIComponent(key)}`}
          className="bg-white text-[#0f2540] text-xs font-bold px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors"
        >
          + Add Listing
        </Link>
      </header>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">

        {/* KPI cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'For Sale',  value: counts.Sale,    color: 'bg-emerald-50 border-emerald-100', num: 'text-emerald-700' },
            { label: 'For Rent',  value: counts.Rent,    color: 'bg-amber-50 border-amber-100',    num: 'text-amber-700'   },
            { label: 'Auction',   value: counts.Auction, color: 'bg-red-50 border-red-100',        num: 'text-red-700'     },
            { label: 'My Listings', value: supabaseRows.length, color: 'bg-blue-50 border-blue-100', num: 'text-blue-700' },
          ].map(({ label, value, color, num }) => (
            <div key={label} className={`${color} border rounded-2xl p-4`}>
              <p className="text-[11px] text-gray-500 font-medium mb-1">{label}</p>
              <p className={`text-2xl font-black ${num}`}>{value.toLocaleString('en-MY')}</p>
            </div>
          ))}
        </div>

        {/* All Listings section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-bold text-gray-800">All Listings</h2>
              <p className="text-[11px] text-gray-400">{allRows.length.toLocaleString('en-MY')} total · private</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-3">
            <AdminFilters adminKey={key} regions={regions} currentQ={q} currentSource={source} currentRegion={region} />
            <p className="text-[11px] text-gray-400 mt-2.5">
              {filtered.length.toLocaleString('en-MY')} results · page {page} of {totalPages}
              {(q || source || region) && <span className="ml-2 text-amber-600 font-medium">· filters active</span>}
            </p>
          </div>

          <AdminTable
            rows={rows.map(r => ({
              id: r.id,
              propertyType: r.propertyType,
              region: r.region,
              address: r.address,
              price: r.price,
              source: r.source as 'New' | 'Agency' | 'Sale' | 'Rent' | 'Auction' | 'Hidden',
              publicUrl: r.publicUrl,
              isSupabase: r.isSupabase,
              imageCount: 'imageCount' in r ? (r.imageCount ?? null) : null,
            }))}
            adminKey={key}
            page={page}
            totalPages={totalPages}
            perPage={PER_PAGE}
            filteredCount={filtered.length}
            prevUrl={`/admin?${prevParams}`}
            nextUrl={`/admin?${nextParams}`}
          />
        </div>

      </div>
    </main>
  );
}
