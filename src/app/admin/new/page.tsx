import Link from 'next/link';
import NewListingForm from './NewListingForm';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Admin — Add Listing' };

export default async function AdminNewPage({
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
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href={`/admin?key=${key}`}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to Admin
          </Link>
        </div>

        <div className="bg-[#0f2540] text-white rounded-2xl px-6 py-5 mb-6">
          <h1 className="text-xl font-bold">Add New Listing</h1>
          <p className="text-blue-200 text-sm mt-0.5">
            Listing will appear on the site after the next deploy
          </p>
        </div>

        <NewListingForm adminKey={key} />
      </div>
    </main>
  );
}
