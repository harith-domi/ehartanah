import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createAdminSupabase } from '@/lib/supabase';
import type { AdminListing } from '@/lib/supabase';
import { getListing } from '@/lib/listings';
import EditListingForm from './EditListingForm';

export const dynamic = 'force-dynamic';

export default async function EditPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ key?: string }>;
}) {
  const { id } = await params;
  const { key } = await searchParams;

  const clean = (s?: string) => (s ?? '').replace(/[^\x20-\x7e]/g, '').trim();
  const adminKey = clean(process.env.ADMIN_KEY);
  const incomingKey = clean(key);

  if (!adminKey || incomingKey !== adminKey) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-4xl font-bold text-gray-300 mb-2">403</p>
          <p className="text-gray-500">Access denied.</p>
        </div>
      </main>
    );
  }

  // Try Supabase first (already-edited listing)
  let listing: AdminListing | null = null;
  try {
    const sb = createAdminSupabase();
    const { data } = await sb.from('admin_listings').select('*').eq('id', id).single();
    if (data) listing = data as AdminListing;
  } catch {}

  // Fall back to static JSON (first-time edit of a Mudah/JSON listing)
  if (!listing) {
    const staticListing = getListing(id);
    if (staticListing) {
      listing = {
        id: staticListing.id,
        title: staticListing.title,
        listing_type: staticListing.listingType as 'sale' | 'rent',
        price: staticListing.price ?? null,
        category: staticListing.category ?? '',
        property_type: staticListing.propertyType ?? '',
        size: staticListing.size ?? null,
        size_unit: staticListing.sizeUnit ?? 'sq.ft.',
        bedrooms: staticListing.bedrooms ?? null,
        bathrooms: staticListing.bathrooms ?? null,
        subarea: staticListing.subarea ?? '',
        region: staticListing.region ?? '',
        location: staticListing.location ?? '',
        phone: staticListing.phone ?? '',
        image_count: staticListing.imageCount ?? 0,
        thumbnail_url: staticListing.thumbnailUrl ?? '',
        photos: staticListing.photos ?? [],
        description: staticListing.description ?? '',
        posted_at: staticListing.postedAt ?? '',
        featured: staticListing.featured ?? false,
        tenure: '',
      };
    }
  }

  if (!listing) notFound();

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href={`/admin?key=${encodeURIComponent(incomingKey)}`} className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to Admin
          </Link>
        </div>

        <div className="bg-[#0f2540] text-white rounded-2xl px-6 py-5 mb-6">
          <h1 className="text-xl font-bold">Edit Listing</h1>
          <p className="text-blue-200 text-sm mt-0.5 font-mono">{id}</p>
        </div>

        <EditListingForm listing={listing} adminKey={incomingKey} />
      </div>
    </main>
  );
}
