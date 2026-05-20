'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const propertyTypes = [
  { value: '', label: 'All Types' },
  { value: 'condo', label: 'Condo / Apartment' },
  { value: 'house', label: 'Terrace / Semi-D' },
  { value: 'bungalow', label: 'Bungalow' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'office', label: 'Office' },
  { value: 'shophouse', label: 'Shophouse' },
  { value: 'retail', label: 'Retail' },
  { value: 'land', label: 'Land' },
];

const priceRangesSale = [
  { value: '', label: 'Any Price' },
  { value: '0-300000', label: 'Below RM 300K' },
  { value: '300000-600000', label: 'RM 300K – 600K' },
  { value: '600000-1000000', label: 'RM 600K – 1M' },
  { value: '1000000-2000000', label: 'RM 1M – 2M' },
  { value: '2000000-', label: 'Above RM 2M' },
];

const priceRangesRent = [
  { value: '', label: 'Any Price' },
  { value: '0-1500', label: 'Below RM 1,500' },
  { value: '1500-3000', label: 'RM 1,500 – 3,000' },
  { value: '3000-5000', label: 'RM 3,000 – 5,000' },
  { value: '5000-10000', label: 'RM 5,000 – 10,000' },
  { value: '10000-', label: 'Above RM 10,000' },
];

interface SearchBarProps {
  initialTab?: 'buy' | 'rent';
  compact?: boolean;
}

export default function SearchBar({ initialTab = 'buy', compact = false }: SearchBarProps) {
  const [tab, setTab] = useState<'buy' | 'rent'>(initialTab);
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const router = useRouter();

  function handleSearch() {
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (type) params.set('type', type);
    if (price) params.set('price', price);
    router.push(`/${tab}?${params.toString()}`);
  }

  return (
    <div className={compact ? '' : 'w-full max-w-4xl mx-auto'}>
      {!compact && (
        <div className="flex mb-0">
          {(['buy', 'rent'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-8 py-3 font-semibold text-sm rounded-t-lg transition-colors capitalize ${
                tab === t
                  ? 'bg-white text-red-600 border-t border-l border-r border-gray-200'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {t === 'buy' ? 'Buy' : 'Rent'}
            </button>
          ))}
        </div>
      )}

      <div className={`bg-white rounded-b-xl rounded-tr-xl shadow-xl p-4 ${compact ? 'rounded-xl' : ''}`}>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Location */}
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search area, district, or address..."
              value={location}
              onChange={e => setLocation(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400"
            />
          </div>

          {/* Property Type */}
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="sm:w-44 px-3 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 bg-white"
          >
            {propertyTypes.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          {/* Price */}
          <select
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="sm:w-44 px-3 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 bg-white"
          >
            {(tab === 'buy' ? priceRangesSale : priceRangesRent).map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
