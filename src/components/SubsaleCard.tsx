'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SubsaleProperty } from '@/lib/types';

function formatPrice(price: number) {
  if (price >= 1000000) return `RM${(price / 1000000).toFixed(2)}M`;
  return `RM${(price / 1000).toFixed(0)}k`;
}

export default function SubsaleCard({ property }: { property: SubsaleProperty }) {
  const [saved, setSaved] = useState(false);

  return (
    <Link href={`/subsale/${property.id}`} className="block group">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group-hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={property.imageUrl}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Overlay badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {property.isNew && (
              <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-md">NEW</span>
            )}
            {property.isFeatured && (
              <span className="bg-emerald-700 text-white text-xs font-bold px-2 py-1 rounded-md">FEATURED</span>
            )}
            <span className={`text-white text-xs font-semibold px-2 py-1 rounded-md ${property.tenure === 'Freehold' ? 'bg-green-600' : 'bg-gray-500'}`}>
              {property.tenure}
            </span>
          </div>
          {/* For Sale badge */}
          <div className="absolute top-3 right-12">
            <span className="bg-emerald-600 text-white text-xs font-semibold px-2 py-1 rounded-md">For Sale</span>
          </div>
          {/* Save button */}
          <button
            onClick={(e) => { e.preventDefault(); setSaved(!saved); }}
            className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
            aria-label="Save property"
          >
            <svg className={`w-4 h-4 ${saved ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} fill={saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Price */}
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <p className="text-xl font-bold text-emerald-700">{formatPrice(property.price)}</p>
            <p className="text-xs text-gray-500">RM{property.pricePerSqft}/sqft</p>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-2 leading-snug">{property.title}</h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{property.area}, {property.state}</span>
          </div>

          {/* Specs */}
          <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {property.bedrooms} Beds
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {property.bathrooms} Baths
            </span>
            <span>{property.size.toLocaleString()} sqft</span>
          </div>

          {/* Yield badge */}
          <div className="flex items-center justify-between">
            <span className="bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-100">
              {property.rentalYield}% yield
            </span>
            <span className="text-xs text-gray-400">{property.furnishing}</span>
          </div>

          {/* Tags */}
          {property.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {property.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
