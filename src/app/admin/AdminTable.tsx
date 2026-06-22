'use client';

import { useState } from 'react';

interface AdminRow {
  id: string;
  propertyType: string;
  region: string;
  address: string;
  price: number;
  source: 'Auction' | 'Agency';
}

export default function AdminTable({ listings }: { listings: AdminRow[] }) {
  const [q, setQ] = useState('');
  const [type, setType] = useState('');
  const [region, setRegion] = useState('');
  const [source, setSource] = useState('');

  const types = [...new Set(listings.map((l) => l.propertyType))].sort();
  const regions = [...new Set(listings.map((l) => l.region).filter(Boolean))].sort();

  const filtered = listings.filter((l) => {
    if (q) {
      const hay = `${l.address} ${l.id} ${l.region}`.toLowerCase();
      if (!hay.includes(q.toLowerCase())) return false;
    }
    if (type && l.propertyType !== type) return false;
    if (region && l.region !== region) return false;
    if (source && l.source !== source) return false;
    return true;
  });

  const hasFilter = q || type || region || source;

  return (
    <div>
      {/* Search + filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search address, ID, region…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="flex-1 min-w-[220px] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30"
        />
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 bg-white"
        >
          <option value="">All sources</option>
          <option value="Auction">Auction</option>
          <option value="Agency">Agency</option>
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 bg-white"
        >
          <option value="">All types</option>
          {types.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 bg-white"
        >
          <option value="">All regions</option>
          {regions.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        {hasFilter && (
          <button
            onClick={() => { setQ(''); setType(''); setRegion(''); setSource(''); }}
            className="px-4 py-2.5 text-sm text-gray-500 hover:text-red-500 border border-gray-200 rounded-xl"
          >
            Clear
          </button>
        )}
      </div>

      <p className="text-xs text-gray-400 mb-3">
        {filtered.length} of {listings.length} properties
      </p>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 w-8">#</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Source</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">ID</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Type</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Region</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Full Address (with unit no.)</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-gray-400 text-sm">
                  No properties match your search.
                </td>
              </tr>
            ) : (
              filtered.map((l, i) => (
                <tr key={l.id} className="hover:bg-blue-50/40">
                  <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      l.source === 'Auction'
                        ? 'bg-red-50 text-red-600'
                        : 'bg-blue-50 text-blue-600'
                    }`}>
                      {l.source}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs whitespace-nowrap">{l.id}</td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{l.propertyType}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{l.region}</td>
                  <td className="px-4 py-3 text-gray-900">{l.address || '—'}</td>
                  <td className="px-4 py-3 font-semibold text-[#1e3a5f] whitespace-nowrap">
                    RM {l.price.toLocaleString('en-MY')}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
