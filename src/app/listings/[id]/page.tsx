import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getListing,
  formatPrice,
  formatSize,
  formatPostedDate,
  whatsappLink,
} from '@/lib/listings';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const listing = getListing(id);
  if (!listing) return { title: 'Listing Not Found' };
  return {
    title: `${listing.title} — ${formatPrice(listing.price, listing.listingType)}`,
    description: `${listing.propertyType || listing.category} in ${listing.location}. ${formatPrice(listing.price, listing.listingType)}. Listed by ${listing.advertiser} on eHartanah.`,
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = getListing(id);
  if (!listing) notFound();

  const backPath = listing.listingType === 'rent' ? '/rent' : '/subsale';
  const backLabel = listing.listingType === 'rent' ? 'Rent' : 'Subsale';
  const wa = whatsappLink(listing.phone);

  const specs = [
    { label: 'Category', value: listing.category },
    { label: 'Property Type', value: listing.propertyType },
    { label: 'Size', value: formatSize(listing) },
    { label: 'Bedrooms', value: listing.bedrooms !== null ? String(listing.bedrooms) : '' },
    { label: 'Bathrooms', value: listing.bathrooms !== null ? String(listing.bathrooms) : '' },
    { label: 'Area', value: listing.subarea },
    { label: 'Region', value: listing.region },
    { label: 'Posted', value: formatPostedDate(listing.postedAt) },
  ].filter((s) => s.value);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-sm text-gray-500 flex gap-2">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <Link href={backPath} className="hover:text-emerald-700">{backLabel}</Link>
          <span>/</span>
          <span className="text-gray-800 truncate">{listing.title}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                  {listing.listingType === 'rent' ? 'For Rent' : 'For Sale'}
                </span>
                <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                  {listing.propertyType || listing.category}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{listing.title}</h1>
              {listing.location && (
                <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {listing.location}
                </div>
              )}

              <p className="text-3xl font-bold text-emerald-700 mb-6">
                {formatPrice(listing.price, listing.listingType)}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 rounded-xl p-4">
                {specs.map((spec) => (
                  <div key={spec.label}>
                    <p className="text-gray-500 text-xs mb-0.5">{spec.label}</p>
                    <p className="font-semibold text-gray-900 text-sm">{spec.value}</p>
                  </div>
                ))}
              </div>

              {listing.url && (
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <a
                    href={listing.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-semibold text-sm"
                  >
                    View original listing{listing.imageCount > 0 ? ` with ${listing.imageCount} photos` : ''}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Contact Owner</h3>
              <p className="font-semibold text-gray-800 mb-1">{listing.advertiser}</p>
              <p className="text-gray-500 text-sm mb-4">{listing.featured ? 'Exclusive eHartanah Listing' : 'Private Owner'}</p>
              {listing.featured && (
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm mb-3"
                >
                  Enquire Now
                </Link>
              )}
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm mb-3"
                >
                  WhatsApp Owner
                </a>
              )}
              {listing.phone && (
                <a
                  href={`tel:${listing.phone}`}
                  className="block text-center border border-emerald-200 text-emerald-700 font-semibold py-2.5 rounded-xl hover:bg-emerald-50 transition-colors text-sm"
                >
                  Call {listing.phone}
                </a>
              )}
            </div>

            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-5 text-white text-center">
              <p className="font-bold mb-2 text-sm">Get AI Price Analysis</p>
              <p className="text-emerald-100 text-xs mb-4">Ask our AI if this property is a good deal for your budget and goals</p>
              <Link href="/ai-search" className="block bg-white text-emerald-700 font-semibold text-sm py-2.5 rounded-xl hover:bg-emerald-50 transition-colors">
                Ask AI Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
