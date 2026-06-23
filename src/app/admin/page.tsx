import { auctionListings, ownListings, saleListings, rentListings } from '@/lib/listings';
import AdminFilters from './AdminFilters';

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

  const allRows = [
    ...auctionListings.map((l) => ({ id: l.id, propertyType: l.propertyType, region: l.region, address: l.address, price: l.reservePrice, source: 'Auction' as const })),
    ...ownListings.map((l) => ({ id: l.id, propertyType: l.category, region: l.region, address: l.location, price: l.price ?? 0, source: 'Agency' as const })),
    ...saleListings.filter((l) => !l.featured).map((l) => ({ id: l.id, propertyType: l.category, region: l.region, address: l.location, price: l.price ?? 0, source: 'Sale' as const })),
    ...rentListings.filter((l) => !l.featured).map((l) => ({ id: l.id, propertyType: l.category, region: l.region, address: l.location, price: l.price ?? 0, source: 'Rent' as const })),
  ];

  const regions = [...new Set(allRows.map((r) => r.region).filter(Boolean))].sort();

  const ql = q.toLowerCase();
  const filtered = allRows.filter((r) => {
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

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#0f2540] text-white rounded-2xl px-6 py-5 mb-6 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold">All Listings</h1>
            <p className="text-blue-200 text-sm mt-0.5">Private — not visible to customers · {allRows.length.toLocaleString('en-MY')} total</p>
          </div>
          <div className="flex gap-2 text-xs flex-wrap">
            {(['Auction', 'Agency', 'Sale', 'Rent'] as const).map((s) => (
              <span key={s} className={`px-2 py-1 rounded-full font-semibold ${
                s === 'Auction' ? 'bg-red-500/20 text-red-200' :
                s === 'Agency' ? 'bg-blue-400/20 text-blue-200' :
                s === 'Sale' ? 'bg-green-400/20 text-green-200' :
                'bg-yellow-400/20 text-yellow-200'
              }`}>
                {s}: {allRows.filter((r) => r.source === s).length.toLocaleString('en-MY')}
              </span>
            ))}
          </div>
        </div>

        {/* Filters (client component for live URL update) */}
        <AdminFilters adminKey={key} regions={regions} currentQ={q} currentSource={source} currentRegion={region} />

        {/* Result count */}
        <p className="text-xs text-gray-400 mb-3">
          {filtered.length.toLocaleString('en-MY')} results · showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} · page {page} of {totalPages}
        </p>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 w-8">#</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Source</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Type</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Region</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Address / Location</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-gray-400">No listings match your search.</td></tr>
              ) : rows.map((r, i) => (
                <tr key={r.id} className="hover:bg-blue-50/30">
                  <td className="px-4 py-2.5 text-gray-400 text-xs">{(page - 1) * PER_PAGE + i + 1}</td>
                  <td className="px-4 py-2.5">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      r.source === 'Auction' ? 'bg-red-50 text-red-600' :
                      r.source === 'Agency'  ? 'bg-blue-50 text-blue-600' :
                      r.source === 'Sale'    ? 'bg-green-50 text-green-600' :
                                               'bg-yellow-50 text-yellow-700'
                    }`}>{r.source}</span>
                  </td>
                  <td className="px-4 py-2.5 text-gray-700 whitespace-nowrap text-xs">{r.propertyType}</td>
                  <td className="px-4 py-2.5 text-gray-500 whitespace-nowrap text-xs">{r.region}</td>
                  <td className="px-4 py-2.5 text-gray-900 text-xs">{r.address || '—'}</td>
                  <td className="px-4 py-2.5 font-semibold text-[#1e3a5f] whitespace-nowrap text-xs">
                    {r.price ? `RM ${r.price.toLocaleString('en-MY')}` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-6">
            {page > 1 && (
              <a href={`/admin?${prevParams}`} className="px-4 py-2 text-sm border border-gray-200 rounded-xl bg-white hover:bg-gray-50">← Prev</a>
            )}
            <span className="px-4 py-2 text-sm text-gray-500">Page {page} / {totalPages}</span>
            {page < totalPages && (
              <a href={`/admin?${nextParams}`} className="px-4 py-2 text-sm border border-gray-200 rounded-xl bg-white hover:bg-gray-50">Next →</a>
            )}
          </div>
        )}

        <p className="text-xs text-gray-400 mt-4 text-center">eHartanah Admin</p>
      </div>
    </main>
  );
}
