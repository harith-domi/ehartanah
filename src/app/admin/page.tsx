import { auctionListings, ownListings, saleListings, rentListings } from '@/lib/listings';
import { createAdminSupabase } from '@/lib/supabase';
import type { AdminListing } from '@/lib/supabase';
import AdminFilters from './AdminFilters';
import AdminMyListings from './AdminMyListings';
import CopyButton from './CopyButton';
import SourceBadge from './SourceBadge';
import DeleteButton from './DeleteButton';
import StatusToggle from './StatusToggle';
import Link from 'next/link';

const DOMAIN = 'https://ehartanahmalaysia.com';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Admin — All Listings' };

const PER_PAGE = 100;

const SOURCE_COLORS: Record<string, string> = {
  New:     'bg-purple-50 text-purple-600',
  Auction: 'bg-red-50 text-red-600',
  Agency:  'bg-blue-50 text-blue-600',
  Sale:    'bg-green-50 text-green-600',
  Rent:    'bg-yellow-50 text-yellow-700',
};

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
  let supabaseRows: { id: string; propertyType: string; region: string; address: string; price: number; source: RowSource; publicUrl: string; isSupabase: true; updatedAt?: string | null; thumbnailUrl?: string | null }[] = [];
  let allSupabaseRows: typeof supabaseRows = [];
  const hiddenIds = new Set<string>();
  try {
    const sb = createAdminSupabase();
    const { data } = await sb.from('admin_listings').select('id,category,region,location,price,source,updated_at,thumbnail_url').order('updated_at', { ascending: false });
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
      }));
      supabaseRows = allSupabaseRows.filter(r => r.source !== 'Hidden');
    }
  } catch {}

  const allRows = [
    ...allSupabaseRows,
    ...auctionListings.filter((l) => !hiddenIds.has(l.id)).map((l) => ({ id: l.id, propertyType: l.propertyType, region: l.region, address: l.address, price: l.reservePrice, source: 'Auction' as const, publicUrl: `${DOMAIN}/auction/${l.id}`, isSupabase: false as const })),
    ...ownListings.filter((l) => !hiddenIds.has(l.id)).map((l) => ({ id: l.id, propertyType: l.category, region: l.region, address: l.location, price: l.price ?? 0, source: 'Agency' as const, publicUrl: `${DOMAIN}/listings/${l.id}`, isSupabase: false as const })),
    ...saleListings.filter((l) => !l.featured && !hiddenIds.has(l.id)).map((l) => ({ id: l.id, propertyType: l.category, region: l.region, address: l.location, price: l.price ?? 0, source: 'Sale' as const, publicUrl: `${DOMAIN}/listings/${l.id}`, isSupabase: false as const })),
    ...rentListings.filter((l) => !l.featured && !hiddenIds.has(l.id)).map((l) => ({ id: l.id, propertyType: l.category, region: l.region, address: l.location, price: l.price ?? 0, source: 'Rent' as const, publicUrl: `${DOMAIN}/listings/${l.id}`, isSupabase: false as const })),
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

        {/* My Listings */}
        <AdminMyListings rows={supabaseRows} adminKey={key} />

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

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide w-8">#</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Source</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Type</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Region</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Address</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Price</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr><td colSpan={7} className="px-4 py-14 text-center text-gray-400 text-sm">No listings match your search.</td></tr>
                ) : rows.map((r, i) => (
                  <tr key={r.id} className={`border-b border-gray-50 hover:bg-blue-50/40 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                    <td className="px-4 py-3 text-gray-300 text-xs">{(page - 1) * PER_PAGE + i + 1}</td>
                    <td className="px-4 py-3">
                      {r.isSupabase && r.source !== 'Hidden' ? (
                        <SourceBadge id={r.id} source={r.source as 'New' | 'Agency' | 'Sale' | 'Rent' | 'Auction'} adminKey={key} />
                      ) : (
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${SOURCE_COLORS[r.source] ?? 'bg-gray-100 text-gray-500'}`}>
                          {r.source}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap text-xs">{r.propertyType}</td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap text-xs">{r.region}</td>
                    <td className="px-4 py-3 text-gray-800 text-xs max-w-xs truncate">{r.address || '—'}</td>
                    <td className="px-4 py-3 font-bold text-[#1e3a5f] whitespace-nowrap text-xs">
                      {r.price ? `RM ${r.price.toLocaleString('en-MY')}` : <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 items-center flex-wrap">
                        <StatusToggle id={r.id} isSupabase={r.isSupabase} isHidden={r.source === 'Hidden'} adminKey={key} />
                        <a href={r.publicUrl} target="_blank" rel="noopener noreferrer"
                          className="px-2 py-1 text-[11px] rounded-lg border border-gray-200 text-gray-500 hover:text-[#1e3a5f] hover:border-[#1e3a5f]/30 whitespace-nowrap transition-colors">
                          ↗ Open
                        </a>
                        <CopyButton url={r.publicUrl} />
                        <Link href={`/admin/edit/${r.id}?key=${encodeURIComponent(key)}`}
                          className="px-2 py-1 text-[11px] rounded-lg border border-gray-200 text-gray-500 hover:text-[#1e3a5f] hover:border-[#1e3a5f]/30 whitespace-nowrap transition-colors">
                          ✏ Edit
                        </Link>
                        <DeleteButton id={r.id} adminKey={key} isSupabase={r.isSupabase} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-5">
              {page > 1
                ? <a href={`/admin?${prevParams}`} className="px-4 py-2 text-sm border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-gray-600">← Prev</a>
                : <span className="px-4 py-2 text-sm rounded-xl text-gray-300">← Prev</span>
              }
              <span className="px-4 py-2 text-sm text-gray-500 bg-white border border-gray-100 rounded-xl">
                {page} <span className="text-gray-300">/ {totalPages}</span>
              </span>
              {page < totalPages
                ? <a href={`/admin?${nextParams}`} className="px-4 py-2 text-sm border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-gray-600">Next →</a>
                : <span className="px-4 py-2 text-sm rounded-xl text-gray-300">Next →</span>
              }
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
