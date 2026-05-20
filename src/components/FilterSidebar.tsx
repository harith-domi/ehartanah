'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterSidebarProps {
  listingType: 'buy' | 'rent';
}

const typeOptions = [
  { value: 'condo', label: 'Condo / Apartment' },
  { value: 'house', label: 'Terrace / Semi-D' },
  { value: 'bungalow', label: 'Bungalow' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'shophouse', label: 'Shophouse' },
  { value: 'office', label: 'Office' },
  { value: 'retail', label: 'Retail' },
  { value: 'land', label: 'Land' },
];

const bedroomOptions = ['1', '2', '3', '4', '5+'];
const stateOptions = ['Kuala Lumpur', 'Selangor', 'Penang', 'Johor', 'Perak', 'Sabah', 'Sarawak'];

export default function FilterSidebar({ listingType }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [types, setTypes] = useState<string[]>([]);
  const [bedrooms, setBedrooms] = useState<string[]>([]);
  const [state, setState] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minSize, setMinSize] = useState('');

  function toggleItem<T extends string>(arr: T[], item: T, setter: (v: T[]) => void) {
    setter(arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item]);
  }

  function applyFilters() {
    const params = new URLSearchParams(searchParams.toString());
    if (types.length) params.set('type', types.join(','));
    if (bedrooms.length) params.set('beds', bedrooms.join(','));
    if (state) params.set('state', state);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (minSize) params.set('minSize', minSize);
    router.push(`/${listingType}?${params.toString()}`);
  }

  function clearFilters() {
    setTypes([]);
    setBedrooms([]);
    setState('');
    setMinPrice('');
    setMaxPrice('');
    setMinSize('');
    router.push(`/${listingType}`);
  }

  return (
    <aside className="w-full space-y-5">
      {/* Property Type */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="font-semibold text-gray-800 mb-3 text-sm">Property Type</h3>
        <div className="space-y-2">
          {typeOptions.map(opt => (
            <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={types.includes(opt.value)}
                onChange={() => toggleItem(types, opt.value, setTypes)}
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="text-sm text-gray-700 group-hover:text-red-600 transition-colors">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="font-semibold text-gray-800 mb-3 text-sm">
          {listingType === 'buy' ? 'Price (RM)' : 'Monthly Rent (RM)'}
        </h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-400"
          />
          <span className="text-gray-400 self-center">–</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-400"
          />
        </div>
      </div>

      {/* Bedrooms */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="font-semibold text-gray-800 mb-3 text-sm">Bedrooms</h3>
        <div className="flex gap-2 flex-wrap">
          {bedroomOptions.map(b => (
            <button
              key={b}
              onClick={() => toggleItem(bedrooms, b, setBedrooms)}
              className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
                bedrooms.includes(b)
                  ? 'bg-red-600 border-red-600 text-white'
                  : 'border-gray-200 text-gray-700 hover:border-red-400 hover:text-red-600'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* State */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="font-semibold text-gray-800 mb-3 text-sm">State</h3>
        <select
          value={state}
          onChange={e => setState(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-red-400 bg-white"
        >
          <option value="">All States</option>
          {stateOptions.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Min Size */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="font-semibold text-gray-800 mb-3 text-sm">Min. Size (sqft)</h3>
        <input
          type="number"
          placeholder="e.g. 1000"
          value={minSize}
          onChange={e => setMinSize(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-400"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <button
          onClick={applyFilters}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
        >
          Apply Filters
        </button>
        <button
          onClick={clearFilters}
          className="w-full border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium py-2.5 rounded-xl transition-colors text-sm"
        >
          Clear All
        </button>
      </div>
    </aside>
  );
}
