'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AuctionProperty } from '@/lib/types';

function formatPrice(price: number) {
  if (price >= 1000000) return `RM${(price / 1000000).toFixed(2)}M`;
  return `RM${(price / 1000).toFixed(0)}k`;
}

function getDaysRemaining(auctionDate: string) {
  const now = new Date();
  const auction = new Date(auctionDate);
  const diff = Math.ceil((auction.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

const riskColors: Record<string, string> = {
  Low: 'bg-green-100 text-green-700 border-green-200',
  Medium: 'bg-amber-100 text-amber-700 border-amber-200',
  High: 'bg-red-100 text-red-700 border-red-200',
};

export default function AuctionCard({ property }: { property: AuctionProperty }) {
  const [saved, setSaved] = useState(false);
  const daysLeft = getDaysRemaining(property.auctionDate);

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
        {/* Risk level + AI score */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className={`text-xs font-semibold px-2 py-1 rounded-md border ${riskColors[property.riskLevel]}`}>
            {property.riskLevel} Risk
          </span>
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-bold px-2 py-1 rounded-md">
            AI {property.aiScore}/10
          </span>
        </div>
        {/* Save */}
        <button
          onClick={() => setSaved(!saved)}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          aria-label="Save auction"
        >
          <svg className={`w-4 h-4 ${saved ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} fill={saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        {/* Countdown */}
        <div className="absolute bottom-3 right-3 bg-slate-900/80 text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
          {daysLeft > 0 ? `${daysLeft} days left` : 'Auction ended'}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {property.badges.slice(0, 2).map((badge) => (
            <span key={badge} className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
              {badge}
            </span>
          ))}
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

        {/* Prices */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-bold text-red-600">{formatPrice(property.reservePrice)}</p>
            <span className="text-xs text-gray-400 line-through">{formatPrice(property.marketValue)}</span>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">Save {property.discount}%</span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">Reserve Price &nbsp;|&nbsp; Market: {formatPrice(property.marketValue)}</p>
        </div>

        {/* Auction info */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4 bg-slate-50 rounded-lg px-3 py-2">
          <span>
            <span className="font-medium text-gray-700">Auction:</span>{' '}
            {new Date(property.auctionDate).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
          <span className="font-medium text-gray-700">{property.auctionHouse}</span>
        </div>

        {/* CTA */}
        <Link
          href={`/auction/${property.id}`}
          className="block w-full text-center bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
