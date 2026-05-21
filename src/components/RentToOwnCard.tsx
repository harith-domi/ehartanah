'use client';

import Image from 'next/image';
import Link from 'next/link';
import { RentToOwnProperty } from '@/lib/types';

function formatPrice(price: number) {
  if (price >= 1000000) return `RM${(price / 1000000).toFixed(2)}M`;
  return `RM${(price / 1000).toFixed(0)}k`;
}

export default function RentToOwnCard({ property }: { property: RentToOwnProperty }) {
  const totalRentCredit = property.monthlyRent * 12 * property.purchasePeriod * (property.rentCredit / 100);

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={property.imageUrl}
          alt={property.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="bg-violet-600 text-white text-xs font-bold px-2 py-1 rounded-md">Rent-to-Own</span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-bold px-2 py-1 rounded-md">
            AI Score: {property.aiSuitabilityScore}/10
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Monthly Rent */}
        <div className="flex items-baseline justify-between mb-1">
          <div>
            <span className="text-2xl font-bold text-violet-700">RM{property.monthlyRent.toLocaleString()}</span>
            <span className="text-sm text-gray-500">/month</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Option Price</p>
            <p className="text-sm font-bold text-gray-800">{formatPrice(property.optionPrice)}</p>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-2 leading-snug">{property.title}</h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{property.location}</span>
        </div>

        {/* Key stats grid */}
        <div className="grid grid-cols-3 gap-2 mb-4 bg-slate-50 rounded-xl p-3">
          <div className="text-center">
            <p className="text-xs text-gray-500">Period</p>
            <p className="text-sm font-bold text-gray-800">{property.purchasePeriod} yrs</p>
          </div>
          <div className="text-center border-x border-slate-200">
            <p className="text-xs text-gray-500">Rent Credit</p>
            <p className="text-sm font-bold text-violet-700">{property.rentCredit}%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Deposit</p>
            <p className="text-sm font-bold text-gray-800">RM{(property.upfrontDeposit / 1000).toFixed(0)}k</p>
          </div>
        </div>

        {/* Rent credit progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>Rent Credit Accumulation</span>
            <span className="font-semibold text-violet-700">RM{totalRentCredit.toLocaleString('en-MY', { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="h-2 bg-violet-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full"
              style={{ width: `${Math.min(property.rentCredit * 2, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">Over {property.purchasePeriod} years at {property.rentCredit}% credit rate</p>
        </div>

        {/* CTA */}
        <Link
          href={`/rent-to-own/${property.id}`}
          className="block w-full text-center bg-gradient-to-r from-violet-600 to-purple-700 hover:opacity-90 text-white text-sm font-semibold py-2.5 rounded-xl transition-opacity"
        >
          Check My Suitability
        </Link>
      </div>
    </div>
  );
}
