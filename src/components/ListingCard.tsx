import Link from 'next/link';
import { Listing, formatPrice, formatSize, formatPostedDate } from '@/lib/listings';

const CATEGORY_STYLES: Record<string, { gradient: string; icon: string }> = {
  'Apartment / Condominium': {
    gradient: 'from-emerald-600 to-teal-800',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  },
  House: {
    gradient: 'from-teal-600 to-emerald-800',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  Room: {
    gradient: 'from-emerald-500 to-green-700',
    icon: 'M5 3v18m0-18h14a2 2 0 012 2v14a2 2 0 01-2 2H5m9-9h.01',
  },
  Land: {
    gradient: 'from-lime-600 to-emerald-800',
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  'Commercial Property': {
    gradient: 'from-cyan-700 to-teal-900',
    icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
};

const DEFAULT_STYLE = {
  gradient: 'from-emerald-600 to-teal-800',
  icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
};

export default function ListingCard({ listing }: { listing: Listing }) {
  const style = CATEGORY_STYLES[listing.category] ?? DEFAULT_STYLE;
  const specs = [
    listing.bedrooms !== null ? `${listing.bedrooms} bed` : null,
    listing.bathrooms !== null ? `${listing.bathrooms} bath` : null,
    formatSize(listing) || null,
  ].filter(Boolean);
  const location = listing.location || [listing.subarea, listing.region].filter(Boolean).join(', ');

  return (
    <Link
      href={`/listings/${listing.id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 flex flex-col"
    >
      {/* Visual header */}
      <div className={`relative h-36 bg-gradient-to-br ${style.gradient} flex items-center justify-center`}>
        <svg className="w-14 h-14 text-white/80 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={style.icon} />
        </svg>
        <span className="absolute top-3 left-3 bg-black/30 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
          {listing.propertyType || listing.category}
        </span>
        {listing.featured && (
          <span className="absolute top-3 right-3 bg-amber-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wide">
            FEATURED
          </span>
        )}
        {listing.imageCount > 0 && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-1 rounded-md">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {listing.imageCount} photos
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-lg font-bold text-emerald-700 mb-1">{formatPrice(listing.price, listing.listingType)}</p>
        <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mb-2 group-hover:text-emerald-700 transition-colors">
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
          <span className="truncate">{listing.advertiser}</span>
          <span className="shrink-0 ml-2">{formatPostedDate(listing.postedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
