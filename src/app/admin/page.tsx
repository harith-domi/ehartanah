import { notFound } from 'next/navigation';
import { auctionListings } from '@/lib/listings';

export const metadata = { title: 'Admin — Full Addresses' };

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;

  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#0f2540] text-white rounded-2xl px-6 py-5 mb-6">
          <h1 className="text-xl font-bold">Full Property Addresses</h1>
          <p className="text-blue-200 text-sm mt-1">Private — not visible to customers</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 w-8">#</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">ID</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Type</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Full Address (with unit no.)</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Reserve Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {auctionListings.map((l, i) => (
                <tr key={l.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">{l.id}</td>
                  <td className="px-4 py-3 text-gray-700">{l.propertyType}</td>
                  <td className="px-4 py-3 text-gray-900">{l.address || '—'}</td>
                  <td className="px-4 py-3 font-semibold text-[#1e3a5f]">
                    RM {l.reservePrice.toLocaleString('en-MY')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4 text-center">
          {auctionListings.length} auction properties · eHartanah Admin
        </p>
      </div>
    </main>
  );
}
