import Link from 'next/link';
import { Listing, formatPrice, formatSize, formatPostedDate, whatsappLink, pricePerSqft, displayBedrooms, displayBathrooms } from '@/lib/listings';
import FavouriteButton from './FavouriteButton';
import NoPhotoPlaceholder from './NoPhotoPlaceholder';

const CATEGORY_STYLES: Record<string, { gradient: string; icon: string }> = {
  'Apartment / Condominium': {
    gradient: 'from-[#0f2540] to-[#0a1e38]',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  },
  House: {
    gradient: 'from-[#1e3a5f] to-[#0f2540]',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  Room: {
    gradient: 'from-[#1e3a5f] to-[#2d5a8e]',
    icon: 'M5 3v18m0-18h14a2 2 0 012 2v14a2 2 0 01-2 2H5m9-9h.01',
  },
  Land: {
    gradient: 'from-lime-600 to-[#0a1e38]',
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  'Commercial Property': {
    gradient: 'from-cyan-700 to-[#0a1e38]',
    icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
};

const DEFAULT_STYLE = {
  gradient: 'from-[#0f2540] to-[#0a1e38]',
  icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
};

export default function ListingCard({ listing }: { listing: Listing }) {
  const style = CATEGORY_STYLES[listing.category] ?? DEFAULT_STYLE;
  const coverPhoto = listing.photos?.[0] ?? listing.thumbnailUrl;
  const beds = displayBedrooms(listing);
  const baths = displayBathrooms(listing);
  const specs = [
    beds ? `${beds} bed` : null,
    baths ? `${baths} bath` : null,
    formatSize(listing) || null,
  ].filter(Boolean);
  const location = listing.location || [listing.subarea, listing.region].filter(Boolean).join(', ');
  const wa = whatsappLink(listing.phone);
  const psf = pricePerSqft(listing);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 flex flex-col">
      {/* Clickable card body */}
      <Link href={`/listings/${listing.id}`} className="flex flex-col flex-1">
        {/* Visual header */}
        <div className={`relative h-40 bg-gradient-to-br ${style.gradient} flex items-center justify-center overflow-hidden`}>
          {coverPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={coverPhoto}
              alt={listing.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <NoPhotoPlaceholder count={listing.imageCount} url={listing.url} category={listing.category} />
          )}
          <span className="absolute top-3 left-3 bg-black/30 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
            {listing.propertyType || listing.category}
          </span>
          {listing.featured ? (
            <span className="absolute top-3 right-3 bg-[#d4a017] text-[#0f2540] text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wide">
              Agency
            </span>
          ) : (
            <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
              Private
            </span>
          )}
          {(listing.photos?.length ?? listing.imageCount) > 0 && (
            <span className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-1 rounded-md">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {listing.photos?.length ?? listing.imageCount} photos
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col flex-1">
          <p className="text-lg font-bold text-[#1e3a5f] leading-none">{formatPrice(listing.price, listing.listingType)}</p>
          {psf !== null && (
            <p className="text-[11px] text-gray-400 mt-0.5 mb-1.5">RM {psf.toLocaleString('en-MY')}/sq.ft.</p>
          )}
          {psf === null && <div className="mb-1" />}
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mb-2 group-hover:text-[#1e3a5f] transition-colors">
            {listing.title}
          </h3>
          {location && (
            <p className="text-gray-500 text-xs flex items-center gap-1 mb-3">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{location}</span>
            </p>
          )}
          {specs.length > 0 && (
            <p className="text-gray-600 text-xs font-medium mb-3">{specs.join(' · ')}</p>
          )}
          <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400">
            <span className={`font-medium ${listing.featured ? 'text-[#1e3a5f]' : 'text-gray-400'}`}>
              {listing.featured ? 'Agency Listing' : 'Private Owner'}
            </span>
            <span className="shrink-0 ml-2">{formatPostedDate(listing.postedAt)}</span>
          </div>
        </div>
      </Link>

      {/* Action row — outside main link so buttons don't nest inside <a> */}
      <div className="px-3 pb-3 flex items-center gap-2">
        {listing.featured ? (
          <Link
            href="/contact"
            className="flex-1 text-center bg-[#0f2540] hover:bg-[#0a1e38] text-white text-xs font-semibold py-2 rounded-lg transition-colors"
          >
            Enquire Now
          </Link>
        ) : wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        ) : (
          <Link
            href={`/listings/${listing.id}`}
            className="flex-1 text-center border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold py-2 rounded-lg transition-colors"
          >
            View Details
          </Link>
        )}
        <FavouriteButton id={listing.id} />
      </div>
    </div>
  );
}
