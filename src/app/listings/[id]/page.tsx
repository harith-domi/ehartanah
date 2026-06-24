import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getListing,
  formatPrice,
  formatSize,
  formatPostedDate,
  whatsappLink,
  pricePerSqft,
  displayBedrooms,
  displayBathrooms,
  ownSaleListings,
  ownRentListings,
  saleListings,
  rentListings,
  stripUnitNo,
} from '@/lib/listings';
import ListingCard from '@/components/ListingCard';
import PhotoGallery from '@/components/PhotoGallery';
import BackButton from '@/components/BackButton';
import T from '@/components/T';
import EnquiryForm from '@/components/EnquiryForm';
import AuctionShareButton from '@/components/AuctionShareButton';
import ShareButton from '@/components/ShareButton';
import RecentlyViewed from '@/components/RecentlyViewed';
import MortgageCalculator from '@/components/MortgageCalculator';
import { describeListing } from '@/lib/describe';
import { areaPhoto } from '@/lib/areaPhotos';
import { createAdminSupabase } from '@/lib/supabase';
import type { AdminListing } from '@/lib/supabase';
import type { Listing } from '@/lib/listings';

const BASE_URL = 'https://ehartanahmalaysia.com';

export async function generateStaticParams() {
  return [...ownSaleListings, ...ownRentListings].map((l) => ({ id: l.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const listing = getListing(id);
  if (!listing) return { title: 'Listing Not Found' };
  const photo = listing.photos?.[0] ?? listing.thumbnailUrl;
  const desc = describeListing(listing).en.slice(0, 160);
  const title = `${listing.title} — ${formatPrice(listing.price, listing.listingType)}`;
  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      url: `${BASE_URL}/listings/${id}`,
      ...(photo && { images: [{ url: photo, width: 800, height: 600, alt: listing.title }] }),
    },
    twitter: { card: 'summary_large_image', title, description: desc, ...(photo && { images: [photo] }) },
  };
}

function adminToListing(a: AdminListing): Listing {
  return {
    id: a.id,
    title: a.title,
    listingType: a.listing_type,
    price: a.price,
    category: a.category,
    propertyType: a.property_type,
    size: a.size,
    sizeUnit: a.size_unit,
    bedrooms: a.bedrooms,
    bathrooms: a.bathrooms,
    subarea: a.subarea,
    region: a.region,
    location: a.location,
    advertiser: 'eHartanah',
    phone: a.phone,
    imageCount: a.image_count,
    thumbnailUrl: a.thumbnail_url,
    photos: a.photos,
    description: a.description,
    postedAt: a.posted_at,
    url: '',
    featured: true,
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let listing: Listing | null = null;

  // Supabase first — catches both New listings and edited static listings
  try {
    const sb = createAdminSupabase();
    const { data } = await sb.from('admin_listings').select('*').eq('id', id).single();
    if (data) {
      if ((data as AdminListing).source === 'Hidden') notFound();
      listing = adminToListing(data as AdminListing);
    }
  } catch {}

  // Fall back to static JSON
  if (!listing) listing = getListing(id) ?? null;

  if (!listing) notFound();

  const backPath = listing.listingType === 'rent' ? '/rent' : '/subsale';
  const wa = whatsappLink(listing.phone);
  const psf = pricePerSqft(listing);

  // Similar listings: same subarea or same region, same listingType, exclude self
  const pool = listing.listingType === 'rent' ? rentListings : saleListings;
  const similar = pool
    .filter((l) => l.id !== listing.id && (l.subarea === listing.subarea || l.region === listing.region))
    .slice(0, 4);

  // Google Maps embed URL
  const mapQuery = encodeURIComponent(listing.location || `${listing.subarea}, ${listing.region}, Malaysia`);
  const mapSrc = `https://maps.google.com/maps?q=${mapQuery}&output=embed&hl=en&zoom=15`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: listing.title,
    description: describeListing(listing).en,
    url: `${BASE_URL}/listings/${listing.id}`,
    ...(listing.price !== null && { price: listing.price, priceCurrency: 'MYR' }),
    ...(listing.size !== null && {
      floorSize: { '@type': 'QuantitativeValue', value: listing.size, unitText: listing.sizeUnit },
    }),
    ...(listing.bedrooms !== null && { numberOfRooms: listing.bedrooms }),
    address: {
      '@type': 'PostalAddress',
      addressLocality: listing.subarea || stripUnitNo(listing.location || '') || '',
      addressRegion: listing.region || '',
      addressCountry: 'MY',
    },
    offeredBy: { '@type': 'Organization', name: listing.advertiser || 'eHartanah' },
  };

  const specs = [
    { label: 'Category', value: listing.category },
    { label: 'Property Type', value: listing.propertyType },
    { label: 'Size', value: formatSize(listing) },
    { label: 'Price/sq.ft.', value: psf !== null ? `RM ${psf.toLocaleString('en-MY')}` : '' },
    { label: 'Bedrooms', value: displayBedrooms(listing) ? String(displayBedrooms(listing)) : '' },
    { label: 'Bathrooms', value: displayBathrooms(listing) ? String(displayBathrooms(listing)) : '' },
    { label: 'Area', value: listing.subarea },
    { label: 'Region', value: listing.region },
    { label: 'Posted', value: formatPostedDate(listing.postedAt) },
  ].filter((s) => s.value);

  return (
    <div className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-sm text-gray-500 flex gap-2">
          <Link href="/" className="hover:text-[#1e3a5f]"><T en="Home" bm="Utama" /></Link>
          <span>/</span>
          <Link href={backPath} className="hover:text-[#1e3a5f]">
            {listing.listingType === 'rent' ? <T en="Rent" bm="Sewa" /> : <T en="Subsale" bm="Subsale" />}
          </Link>
          <span>/</span>
          <span className="text-gray-800 truncate">{listing.title}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-4">
          <BackButton fallbackHref={backPath} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {(() => {
              const photos = listing.photos?.length
                ? listing.photos
                : listing.thumbnailUrl
                ? [listing.thumbnailUrl]
                : [];
              if (photos.length > 0) {
                return <PhotoGallery photos={photos} title={listing.title} />;
              }
              const nearby = areaPhoto(listing);
              if (nearby) {
                return (
                  <div className="rounded-2xl overflow-hidden shadow-sm relative h-52 sm:h-72 bg-[#0f2540]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={nearby} alt="" aria-hidden className="w-full h-full object-cover object-top opacity-70" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-3 left-3 bg-[#0f2540]/70 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wide select-none pointer-events-none">
                      eHartanah.my
                    </span>
                  </div>
                );
              }
              return null;
            })()}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#dce8f0] text-[#0f2540] text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                  {listing.listingType === 'rent' ? <T en="For Rent" bm="Untuk Sewa" /> : <T en="For Sale" bm="Untuk Dijual" />}
                </span>
                <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                  {listing.propertyType || listing.category}
                </span>
              </div>

              <div className="flex items-start justify-between gap-2 mb-2">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{listing.title}</h1>
                <div className="flex items-center gap-1 shrink-0">
                  <ShareButton title={listing.title} />
                  <AuctionShareButton
                    title={listing.title}
                    address={stripUnitNo(listing.location || listing.subarea || '')}
                    url={`${BASE_URL}/listings/${listing.id}`}
                  />
                </div>
              </div>
              {listing.location && (
                <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {stripUnitNo(listing.location)}
                </div>
              )}

              <p className="text-3xl font-bold text-[#1e3a5f] mb-6">
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
                    className="inline-flex items-center gap-2 text-[#1e3a5f] hover:text-[#0f2540] font-semibold text-sm"
                  >
                    <T
                      en={`View original listing${listing.imageCount > 0 ? ` with ${listing.imageCount} photos` : ''}`}
                      bm={`Lihat senarai asal${listing.imageCount > 0 ? ` dengan ${listing.imageCount} gambar` : ''}`}
                    />
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>

            {/* Description — real Mudah text when scraped, generated otherwise */}
            {(() => {
              const desc = describeListing(listing);
              return (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 text-sm mb-3"><T en="About This Property" bm="Tentang Hartanah Ini" /></h3>
                  {listing.description ? (
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{listing.description}</p>
                  ) : (
                    <p className="text-gray-600 text-sm leading-relaxed">
                      <T en={desc.en} bm={desc.bm} />
                    </p>
                  )}
                </div>
              );
            })()}

            {/* Google Maps */}
            {(listing.location || listing.subarea) && (
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-900 text-sm"><T en="Location" bm="Lokasi" /></h3>
                  <p className="text-gray-500 text-xs mt-0.5">{stripUnitNo(listing.location || listing.subarea)}</p>
                </div>
                <div className="relative w-full aspect-video sm:aspect-auto sm:h-64">
                  <iframe
                    src={mapSrc}
                    width="100%"
                    height="100%"
                    className="border-0 absolute inset-0 w-full h-full"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${listing.location || listing.subarea}`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <EnquiryForm
              listingId={listing.id}
              listingTitle={listing.title}
              listingPrice={formatPrice(listing.price, listing.listingType)}
              listingType={listing.listingType === 'rent' ? 'rent' : 'sale'}
            />

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3 text-sm"><T en="Or contact directly" bm="Atau hubungi terus" /></h3>
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm mb-2"
                >
                  <T en="WhatsApp Owner" bm="WhatsApp Pemilik" />
                </a>
              )}
              {listing.phone && (
                <a
                  href={`tel:${listing.phone}`}
                  className="block text-center border border-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-sm"
                >
                  <T en="Call" bm="Hubungi" /> {listing.phone}
                </a>
              )}
            </div>

            {listing.listingType === 'sale' && listing.price !== null && (
              <MortgageCalculator reservePrice={listing.price} />
            )}

            <div className="bg-gradient-to-br from-[#0f2540] to-[#1e3a5f] rounded-2xl p-5 text-white text-center">
              <p className="font-bold mb-2 text-sm"><T en="Get AI Price Analysis" bm="Dapatkan Analisis Harga AI" /></p>
              <p className="text-[#fef3c7] text-xs mb-4"><T en="Ask our AI if this property is a good deal for your budget and goals" bm="Tanya AI kami sama ada hartanah ini berbaloi untuk bajet dan matlamat anda" /></p>
              <Link href="/ai-search" className="block bg-white text-[#1e3a5f] font-semibold text-sm py-2.5 rounded-xl hover:bg-[#edf2f8] transition-colors mb-2">
                <T en="Ask AI Now" bm="Tanya AI Sekarang" />
              </Link>
              <Link href="/calculator" className="block bg-white/10 hover:bg-white/20 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors">
                <T en="Loan Eligibility Calculator" bm="Kalkulator Kelayakan Pinjaman" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Viewed */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-2">
        <RecentlyViewed
          currentId={listing.id}
          type="listing"
          title={listing.title}
          price={listing.price}
          photo={listing.photos?.[0] ?? listing.thumbnailUrl}
        />
      </div>

      {/* Similar listings */}
      {similar.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 border-t border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-5">
            <T en={`Similar Properties in ${listing.subarea || listing.region}`} bm={`Hartanah Serupa di ${listing.subarea || listing.region}`} />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {similar.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
