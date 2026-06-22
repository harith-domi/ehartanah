'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { useLang } from '@/lib/i18n';

export interface FilterBarProps {
  regions: string[];
  listingType: 'sale' | 'rent' | 'auction';
}

const BED_OPTIONS = [
  { value: '', labelEn: 'Any beds', labelBm: 'Mana-mana bilik' },
  { value: '1', labelEn: '1+', labelBm: '1+' },
  { value: '2', labelEn: '2+', labelBm: '2+' },
  { value: '3', labelEn: '3+', labelBm: '3+' },
  { value: '4', labelEn: '4+', labelBm: '4+' },
];

const SIZE_OPTIONS = [
  { value: '', labelEn: 'Any size', labelBm: 'Mana-mana saiz' },
  { value: '500', labelEn: '500+ ft²', labelBm: '500+ ft²' },
  { value: '800', labelEn: '800+ ft²', labelBm: '800+ ft²' },
  { value: '1000', labelEn: '1000+ ft²', labelBm: '1000+ ft²' },
  { value: '1500', labelEn: '1500+ ft²', labelBm: '1500+ ft²' },
];

const TENURE_OPTIONS = [
  { value: '', labelEn: 'Any tenure', labelBm: 'Mana-mana pegangan' },
  { value: 'Freehold', labelEn: 'Freehold', labelBm: 'Hakmilik Bebas' },
  { value: 'Leasehold', labelEn: 'Leasehold', labelBm: 'Pajakan' },
];

export default function FilterBar({ regions, listingType }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { lang } = useLang();

  const getParam = (key: string) => searchParams.get(key) ?? '';

  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      // Reset to page 1 on filter change
      params.delete('page');
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const clearAll = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  const activeFilters = ['minPrice', 'maxPrice', 'beds', 'size', 'tenure', 'region'].filter(
    (k) => searchParams.get(k)
  );
  const hasActive = activeFilters.length > 0;

  const minPrice = getParam('minPrice');
  const maxPrice = getParam('maxPrice');
  const beds = getParam('beds');
  const size = getParam('size');
  const tenure = getParam('tenure');
  const region = getParam('region');

  // Shared pill styles
  const pillBase =
    'shrink-0 h-9 flex items-center gap-1 border rounded-full px-3 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap focus:outline-none';
  const pillInactive =
    'border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-800';
  const pillActive = 'border-[#0f2540] bg-[#0f2540] text-white';

  function segmentPill(
    value: string,
    current: string,
    onClick: () => void,
    labelEn: string,
    labelBm: string
  ) {
    const isActive = value === current || (value === '' && current === '');
    return (
      <button
        key={value}
        type="button"
        onClick={onClick}
        className={`${pillBase} ${isActive ? pillActive : pillInactive}`}
      >
        {lang === 'bm' ? labelBm : labelEn}
      </button>
    );
  }

  return (
    <div className="bg-white border-b border-gray-100 shadow-sm sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Scrollable pill row */}
        <div className="overflow-x-auto pb-3 pt-3 flex items-center gap-2 scrollbar-none">

          {/* Region dropdown */}
          <div className="shrink-0 relative">
            <select
              value={region}
              onChange={(e) => setParam('region', e.target.value)}
              className={`${pillBase} ${region ? pillActive : pillInactive} pr-6 appearance-none`}
              style={{ backgroundImage: 'none' }}
            >
              <option value="">{lang === 'bm' ? 'Semua Negeri' : 'All States'}</option>
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <span className={`pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs ${region ? 'text-white/70' : 'text-gray-400'}`}>▾</span>
          </div>

          {/* Divider */}
          <div className="shrink-0 w-px h-6 bg-gray-200" />

          {/* Price range */}
          <div className={`shrink-0 h-9 flex items-center border rounded-full px-3 gap-1.5 text-sm transition-colors ${minPrice || maxPrice ? 'border-[#0f2540] bg-[#0f2540]/5' : 'border-gray-200 bg-white'}`}>
            <span className="text-gray-400 text-xs font-medium shrink-0">RM</span>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setParam('minPrice', e.target.value)}
              placeholder={lang === 'bm' ? 'Min' : 'Min'}
              inputMode="numeric"
              className="w-20 outline-none bg-transparent text-sm text-gray-700 placeholder-gray-300"
            />
            <span className="text-gray-300 shrink-0">–</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setParam('maxPrice', e.target.value)}
              placeholder={lang === 'bm' ? 'Maks' : 'Max'}
              inputMode="numeric"
              className="w-20 outline-none bg-transparent text-sm text-gray-700 placeholder-gray-300"
            />
          </div>

          {/* Divider */}
          <div className="shrink-0 w-px h-6 bg-gray-200" />

          {/* Beds segmented */}
          <div className="shrink-0 flex items-center gap-1">
            {BED_OPTIONS.map((opt) =>
              segmentPill(
                opt.value,
                beds,
                () => setParam('beds', opt.value),
                opt.labelEn,
                opt.labelBm
              )
            )}
          </div>

          {/* Divider */}
          <div className="shrink-0 w-px h-6 bg-gray-200" />

          {/* Size dropdown */}
          <div className="shrink-0 relative">
            <select
              value={size}
              onChange={(e) => setParam('size', e.target.value)}
              className={`${pillBase} ${size ? pillActive : pillInactive} pr-6 appearance-none`}
              style={{ backgroundImage: 'none' }}
            >
              {SIZE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {lang === 'bm' ? opt.labelBm : opt.labelEn}
                </option>
              ))}
            </select>
            <span className={`pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs ${size ? 'text-white/70' : 'text-gray-400'}`}>▾</span>
          </div>

          {/* Tenure dropdown — only for sale */}
          {listingType === 'sale' && (
            <>
              <div className="shrink-0 w-px h-6 bg-gray-200" />
              <div className="shrink-0 relative">
                <select
                  value={tenure}
                  onChange={(e) => setParam('tenure', e.target.value)}
                  className={`${pillBase} ${tenure ? pillActive : pillInactive} pr-6 appearance-none`}
                  style={{ backgroundImage: 'none' }}
                >
                  {TENURE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {lang === 'bm' ? opt.labelBm : opt.labelEn}
                    </option>
                  ))}
                </select>
                <span className={`pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs ${tenure ? 'text-white/70' : 'text-gray-400'}`}>▾</span>
              </div>
            </>
          )}

          {/* Clear all */}
          {hasActive && (
            <>
              <div className="shrink-0 w-px h-6 bg-gray-200" />
              <button
                type="button"
                onClick={clearAll}
                className="shrink-0 h-9 flex items-center gap-1 border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 rounded-full px-3 text-sm font-medium transition-colors whitespace-nowrap"
              >
                {lang === 'bm' ? 'Padam semua' : 'Clear all'}
                <span className="ml-0.5 w-4 h-4 rounded-full bg-red-200 text-red-700 text-[10px] font-bold flex items-center justify-center">
                  {activeFilters.length}
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
