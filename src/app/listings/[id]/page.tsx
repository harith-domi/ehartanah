import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPropertyById, properties, formatPrice } from '@/lib/properties';
import PropertyCard from '@/components/PropertyCard';

const BASE_URL = 'https://property-website-rose.vercel.app';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return properties.map(p => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const p = getPropertyById(id);
  if (!p) return { title: 'Property Not Found' };

  const typeLabel = p.type.charAt(0).toUpperCase() + p.type.slice(1);
  const action = p.listingType === 'sale' ? 'for Sale' : 'for Rent';
  const priceStr = formatPrice(p.price, p.listingType);
  const specsStr = p.bedrooms ? `${p.bedrooms}-bedroom ` : '';

  return {
    title: `${p.title} – ${priceStr}`,
    description: `${specsStr}${typeLabel} ${action} in ${p.area}, ${p.state}. ${p.size.toLocaleString()} sqft${p.tenure ? `, ${p.tenure}` : ''}${p.furnishing ? `, ${p.furnishing}` : ''}. ${p.description.slice(0, 120)}...`,
    keywords: [
      `${typeLabel} ${action} ${p.area}`,
      `${typeLabel} ${action} ${p.state}`,
      `property ${action} ${p.area}`,
      `${p.bedrooms ? `${p.bedrooms} bedroom ` : ''}${typeLabel} ${p.state}`,
      `hartanah ${p.area}`,
      `rumah ${action === 'for Sale' ? 'dijual' : 'disewa'} ${p.area}`,
    ],
    openGraph: {
      title: `${p.title} – ${priceStr} | eHartanah`,
      description: `${specsStr}${typeLabel} ${action} in ${p.area}, ${p.state}. ${p.size.toLocaleString()} sqft.`,
      images: [{ url: p.imageUrl, width: 800, alt: p.title }],
      url: `${BASE_URL}/listings/${p.id}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${p.title} – ${priceStr}`,
      description: `${specsStr}${typeLabel} ${action} in ${p.area}, ${p.state}.`,
      images: [p.imageUrl],
    },
    alternates: { canonical: `/listings/${p.id}` },
  };
}

function JsonLd({ property }: { property: NonNullable<ReturnType<typeof getPropertyById>> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description,
    url: `${BASE_URL}/listings/${property.id}`,
    image: property.images,
    datePosted: property.postedAt,
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'MYR',
      availability: 'https://schema.org/InStock',
      ...(property.listingType === 'rent' && { priceSpecification: { '@type': 'UnitPriceSpecification', price: property.price, priceCurrency: 'MYR', referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' } } }),
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address,
      addressLocality: property.area,
      addressRegion: property.state,
      addressCountry: 'MY',
    },
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.size,
      unitCode: 'FTK',
    },
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    amenityFeature: property.features.map(f => ({ '@type': 'LocationFeatureSpecification', name: f, value: true })),
    provider: {
      '@type': 'RealEstateAgent',
      name: property.agent.name,
      worksFor: { '@type': 'Organization', name: property.agent.agency },
      telephone: property.agent.phone,
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default async function ListingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) notFound();

  const {
    title, price, listingType, address, area, state, type,
    bedrooms, bathrooms, carparks, size, images, imageUrl,
    agent, features, description, tenure, furnishing,
    floorLevel, builtYear, isVerified, pricePerSqft, postedAt,
  } = property;

  const similar = properties
    .filter(p => p.id !== id && p.listingType === listingType && p.state === state)
    .slice(0, 3);

  const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <>
      <JsonLd property={property} />
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-sm text-gray-500 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-red-600">Home</Link>
          <span>/</span>
          <Link href={`/${listingType}`} className="hover:text-red-600 capitalize">
            {listingType === 'sale' ? 'Buy' : 'Rent'}
          </Link>
          <span>/</span>
          <Link href={`/${listingType}?state=${state}`} className="hover:text-red-600">{state}</Link>
          <span>/</span>
          <span className="text-gray-700 truncate max-w-xs">{title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* Image Gallery */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="relative h-72 sm:h-96">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {isVerified && (
                    <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </span>
                  )}
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    listingType === 'sale' ? 'bg-red-600 text-white' : 'bg-orange-500 text-white'
                  }`}>
                    For {listingType === 'sale' ? 'Sale' : 'Rent'}
                  </span>
                </div>
              </div>

              {/* Thumbnail row */}
              {images.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto">
                  {images.map((img, i) => (
                    <div key={i} className="relative w-24 h-16 shrink-0 rounded-lg overflow-hidden border-2 border-transparent hover:border-red-500 cursor-pointer transition-colors">
                      <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" sizes="96px" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Price */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">{typeLabel} · {area}, {state}</p>
                  <h1 className="text-xl font-bold text-gray-900 leading-snug">{title}</h1>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1.5">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {address}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-2xl font-bold text-red-600">{formatPrice(price, listingType)}</p>
                  {pricePerSqft && <p className="text-xs text-gray-400">RM {pricePerSqft}/sqft</p>}
                </div>
              </div>

              {/* Specs bar */}
              <div className="flex flex-wrap gap-4 py-4 border-t border-b border-gray-100 my-4 text-sm text-gray-700">
                {bedrooms !== undefined && (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span><strong>{bedrooms}</strong> Bedrooms</span>
                  </div>
                )}
                {bathrooms !== undefined && (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    <span><strong>{bathrooms}</strong> Bathrooms</span>
                  </div>
                )}
                {carparks !== undefined && (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span><strong>{carparks}</strong> Carparks</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span><strong>{size.toLocaleString()}</strong> sqft</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {tenure && <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full font-medium">{tenure}</span>}
                {furnishing && <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full font-medium">{furnishing}</span>}
                {floorLevel && <span className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 rounded-full font-medium">{floorLevel}</span>}
                {builtYear && <span className="text-xs bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1 rounded-full font-medium">Built {builtYear}</span>}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <h2 className="font-bold text-gray-800 mb-3">About This Property</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <h2 className="font-bold text-gray-800 mb-4">Facilities & Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Agent Card ── */}
          <div className="lg:w-80 shrink-0 space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 sticky top-20">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <Image
                  src={agent.avatar}
                  alt={agent.name}
                  width={52}
                  height={52}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{agent.name}</p>
                  <p className="text-xs text-gray-500">{agent.agency}</p>
                  <p className="text-xs text-gray-400 mt-0.5">License: {agent.licenseNo}</p>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={`tel:${agent.phone}`}
                  className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {agent.phone}
                </a>

                <a
                  href={`https://wa.me/${agent.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.858L0 24l6.337-1.508A11.931 11.931 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.797 9.797 0 01-5.035-1.39l-.361-.214-3.763.895.952-3.665-.235-.375A9.778 9.778 0 012.182 12C2.182 6.574 6.574 2.182 12 2.182S21.818 6.574 21.818 12 17.426 21.818 12 21.818z" />
                  </svg>
                  WhatsApp Agent
                </a>

                <button className="flex items-center justify-center gap-2 w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 rounded-xl transition-colors text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Enquiry
                </button>
              </div>

              <p className="text-xs text-gray-400 text-center mt-4">
                Listed on {new Date(postedAt).toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {/* ── SIMILAR PROPERTIES ── */}
        {similar.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-bold text-gray-800 mb-5">Similar Properties in {state}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similar.map(p => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
