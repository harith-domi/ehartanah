import { auctionListings } from '@/lib/listings';
import AdminTable from './AdminTable';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Admin — Full Addresses' };

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;

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

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#0f2540] text-white rounded-2xl px-6 py-5 mb-6">
          <h1 className="text-xl font-bold">Full Property Addresses</h1>
          <p className="text-blue-200 text-sm mt-1">Private — not visible to customers</p>
        </div>

        <AdminTable listings={auctionListings} />
        <p className="text-xs text-gray-400 mt-4 text-center">eHartanah Admin</p>
      </div>
    </main>
  );
}
