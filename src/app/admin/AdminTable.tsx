'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import StatusToggle from './StatusToggle';
import SourceBadge from './SourceBadge';
import CopyButton from './CopyButton';
import DeleteButton from './DeleteButton';

const SOURCE_COLORS: Record<string, string> = {
  New:     'bg-purple-50 text-purple-600',
  Auction: 'bg-red-50 text-red-600',
  Agency:  'bg-blue-50 text-blue-600',
  Sale:    'bg-green-50 text-green-600',
  Rent:    'bg-yellow-50 text-yellow-700',
};

export type RowSource = 'New' | 'Agency' | 'Sale' | 'Rent' | 'Auction' | 'Hidden';

export interface TableRow {
  id: string;
  propertyType: string;
  region: string;
  address: string;
  price: number;
  source: RowSource;
  publicUrl: string;
  isSupabase: boolean;
}

interface Props {
  rows: TableRow[];
  adminKey: string;
  page: number;
  totalPages: number;
  perPage: number;
  filteredCount: number;
  prevUrl: string;
  nextUrl: string;
}

type SortCol = 'propertyType' | 'region' | 'address' | 'price' | 'source';

export default function AdminTable({ rows, adminKey, page, totalPages, perPage, prevUrl, nextUrl }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortCol, setSortCol] = useState<SortCol | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [editingPrice, setEditingPrice] = useState<string | null>(null);
  const [editPriceVal, setEditPriceVal] = useState('');
  const [savedPrices, setSavedPrices] = useState<Record<string, number>>({});
  const [bulkLoading, setBulkLoading] = useState(false);

  const k = encodeURIComponent(adminKey.replace(/[^\x20-\x7e]/g, ''));

  function toggleSort(col: SortCol) {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('asc'); }
  }

  const sorted = useMemo(() => {
    if (!sortCol) return rows;
    return [...rows].sort((a, b) => {
      const av = a[sortCol], bv = b[sortCol];
      const cmp = typeof av === 'number' && typeof bv === 'number'
        ? av - bv
        : String(av ?? '').localeCompare(String(bv ?? ''));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [rows, sortCol, sortDir]);

  const allChecked = sorted.length > 0 && selected.size === sorted.length;

  function toggleAll() {
    setSelected(allChecked ? new Set() : new Set(sorted.map(r => r.id)));
  }

  function toggleOne(id: string) {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  async function hideSelected() {
    setBulkLoading(true);
    await Promise.all([...selected].map(id => {
      const row = rows.find(r => r.id === id);
      if (!row) return;
      if (row.isSupabase) {
        return fetch(`/api/admin/listing/${id}?k=${k}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({ source: 'Hidden' }),
        });
      }
      return fetch(`/api/admin/hide/${id}?k=${k}`, { method: 'POST', referrerPolicy: 'no-referrer' });
    }));
    window.location.reload();
  }

  function startEditPrice(r: TableRow) {
    if (!r.isSupabase) return;
    setEditingPrice(r.id);
    setEditPriceVal(String(savedPrices[r.id] ?? (r.price || '')));
  }

  async function savePrice(id: string) {
    const price = Number(editPriceVal);
    setEditingPrice(null);
    if (!price || price <= 0) return;
    await fetch(`/api/admin/listing/${id}?k=${k}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ price }),
    });
    setSavedPrices(p => ({ ...p, [id]: price }));
  }

  function SortArrow({ col }: { col: SortCol }) {
    if (sortCol !== col) return <span className="ml-0.5 text-gray-300 text-[10px]">↕</span>;
    return <span className="ml-0.5 text-[10px]">{sortDir === 'asc' ? '↑' : '↓'}</span>;
  }

  function ColTh({ col, label, className = '' }: { col: SortCol; label: string; className?: string }) {
    return (
      <th
        onClick={() => toggleSort(col)}
        className={`text-left px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide cursor-pointer select-none hover:text-gray-700 transition-colors whitespace-nowrap ${className}`}
      >
        {label}<SortArrow col={col} />
      </th>
    );
  }

  return (
    <div>
      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="mb-3 flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
          <span className="text-sm font-semibold text-amber-800">{selected.size} selected</span>
          <button
            type="button"
            onClick={hideSelected}
            disabled={bulkLoading}
            className="px-4 py-1.5 text-sm font-bold bg-amber-600 text-white rounded-xl hover:bg-amber-700 disabled:opacity-60 transition-colors"
          >
            {bulkLoading ? 'Hiding…' : `⊘ Hide ${selected.size}`}
          </button>
          <button type="button" onClick={() => setSelected(new Set())} className="text-sm text-amber-600 hover:text-amber-800">
            Clear
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-4 py-3 w-8">
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={toggleAll}
                  className="rounded border-gray-300 cursor-pointer accent-[#1e3a5f]"
                />
              </th>
              <th className="px-3 py-3 text-[11px] font-semibold text-gray-300 w-8">#</th>
              <ColTh col="source" label="Source" />
              <ColTh col="propertyType" label="Type" />
              <ColTh col="region" label="Region" />
              <ColTh col="address" label="Address" className="min-w-[180px]" />
              <ColTh col="price" label="Price" />
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr><td colSpan={8} className="px-4 py-14 text-center text-gray-400 text-sm">No listings match your search.</td></tr>
            ) : sorted.map((r, i) => (
              <tr
                key={r.id}
                className={`border-b border-gray-50 hover:bg-blue-50/40 transition-colors ${
                  selected.has(r.id) ? 'bg-amber-50/60' : i % 2 === 1 ? 'bg-gray-50/30' : ''
                }`}
              >
                <td className="px-4 py-2.5">
                  <input
                    type="checkbox"
                    checked={selected.has(r.id)}
                    onChange={() => toggleOne(r.id)}
                    className="rounded border-gray-300 cursor-pointer accent-[#1e3a5f]"
                  />
                </td>
                <td className="px-3 py-2.5 text-gray-300 text-xs">{(page - 1) * perPage + i + 1}</td>
                <td className="px-4 py-2.5">
                  {r.isSupabase && r.source !== 'Hidden' ? (
                    <SourceBadge id={r.id} source={r.source as 'New' | 'Agency' | 'Sale' | 'Rent' | 'Auction'} adminKey={adminKey} />
                  ) : (
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${SOURCE_COLORS[r.source] ?? 'bg-gray-100 text-gray-500'}`}>
                      {r.source}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap text-xs">{r.propertyType}</td>
                <td className="px-4 py-2.5 text-gray-400 whitespace-nowrap text-xs">{r.region}</td>
                <td className="px-4 py-2.5 text-gray-800 text-xs max-w-[260px] truncate">{r.address || '—'}</td>

                {/* Price — click to edit inline (Supabase rows only) */}
                <td className="px-4 py-2.5 text-xs whitespace-nowrap">
                  {r.isSupabase && editingPrice === r.id ? (
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400 text-[10px]">RM</span>
                      <input
                        autoFocus
                        type="number"
                        value={editPriceVal}
                        onChange={e => setEditPriceVal(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') savePrice(r.id);
                          if (e.key === 'Escape') setEditingPrice(null);
                        }}
                        onBlur={() => savePrice(r.id)}
                        className="w-28 border border-[#1e3a5f]/40 rounded-lg px-2 py-0.5 text-xs text-[#1e3a5f] focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
                      />
                    </div>
                  ) : (
                    <span
                      onClick={() => startEditPrice(r)}
                      title={r.isSupabase ? 'Click to edit price' : undefined}
                      className={`font-bold text-[#1e3a5f] ${r.isSupabase ? 'cursor-pointer hover:underline decoration-dotted underline-offset-2' : ''}`}
                    >
                      {(savedPrices[r.id] ?? r.price)
                        ? `RM ${(savedPrices[r.id] ?? r.price).toLocaleString('en-MY')}`
                        : <span className="text-gray-300 font-normal">—</span>
                      }
                    </span>
                  )}
                </td>

                <td className="px-4 py-2.5">
                  <div className="flex gap-1 items-center">
                    <StatusToggle id={r.id} isSupabase={r.isSupabase} isHidden={r.source === 'Hidden'} adminKey={adminKey} />
                    <a href={r.publicUrl} target="_blank" rel="noopener noreferrer"
                      className="px-2 py-1 text-[11px] rounded-lg border border-gray-200 text-gray-500 hover:text-[#1e3a5f] hover:border-[#1e3a5f]/30 whitespace-nowrap transition-colors">
                      ↗
                    </a>
                    <CopyButton url={r.publicUrl} />
                    <Link href={`/admin/edit/${r.id}?key=${encodeURIComponent(adminKey)}`}
                      className="px-2 py-1 text-[11px] rounded-lg border border-gray-200 text-gray-500 hover:text-[#1e3a5f] hover:border-[#1e3a5f]/30 whitespace-nowrap transition-colors">
                      ✏
                    </Link>
                    <DeleteButton id={r.id} adminKey={adminKey} isSupabase={r.isSupabase} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-5">
          {page > 1
            ? <a href={prevUrl} className="px-4 py-2 text-sm border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-gray-600">← Prev</a>
            : <span className="px-4 py-2 text-sm rounded-xl text-gray-300">← Prev</span>
          }
          <span className="px-4 py-2 text-sm text-gray-500 bg-white border border-gray-100 rounded-xl">
            {page} <span className="text-gray-300">/ {totalPages}</span>
          </span>
          {page < totalPages
            ? <a href={nextUrl} className="px-4 py-2 text-sm border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-gray-600">Next →</a>
            : <span className="px-4 py-2 text-sm rounded-xl text-gray-300">Next →</span>
          }
        </div>
      )}
    </div>
  );
}
