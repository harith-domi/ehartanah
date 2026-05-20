'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/properties';
import { Property } from '@/lib/types';

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

export default function PropertyCard({ property, featured = false }: PropertyCardProps) {
  const {
    id, title, price, listingType, address, area, state,
    type, bedrooms, bathrooms, carparks, size,
    imageUrl, isNew, isVerified, tenure, furnishing, pricePerSqft,
  } = property;

  return (
    <Link href={`/listings/${id}`} className="group block bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: featured ? '220px' : '190px' }}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {isNew && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded">NEW</span>
          )}
          {isVerified && (
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Verified
            </span>
          )}
        </div>

        {/* Listing type pill */}
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            listingType === 'sale' ? 'bg-red-600 text-white' : 'bg-orange-500 text-white'
          }`}>
            For {listingType === 'sale' ? 'Sale' : 'Rent'}
          </span>
        </div>

        {/* Favorite */}
        <button
          className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
          onClick={e => { e.preventDefault(); }}
          aria-label="Save property"
        >
          <svg className="w-4 h-4 text-gray-500 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xl font-bold text-red-600">{formatPrice(price, listingType)}</span>
          {pricePerSqft && (
            <span className="text-xs text-gray-400">RM {pricePerSqft}/sqft</span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2 mb-2 group-hover:text-red-600 transition-colors">
          {title}
        </h3>

        {/* Address */}
        <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          <span className="truncate">{area}, {state}</span>
        </p>

        {/* Specs */}
        <div className="flex items-center gap-3 text-xs text-gray-600 border-t border-gray-100 pt-3">
          {bedrooms !== undefined && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {bedrooms} Beds
            </span>
          )}
          {bathrooms !== undefined && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              {bathrooms} Baths
            </span>
          )}
          <span className="flex items-center gap-1 ml-auto font-medium text-gray-700">
            {size.toLocaleString()} sqft
          </span>
        </div>

        {/* Tags */}
        {(tenure || furnishing) && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {tenure && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{tenure}</span>
            )}
            {furnishing && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{furnishing}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
