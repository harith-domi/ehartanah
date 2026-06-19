import type { Metadata } from 'next';
import Link from 'next/link';
import { auctionListings, AuctionListing, AGENCY_PHONE } from '@/lib/listings';
import { areaPhotoByRegionCategory } from '@/lib/areaPhotos';
import FavouriteButton from '@/components/FavouriteButton';
import AuctionCountdown from '@/components/AuctionCountdown';
import AuctionShareButton from '@/components/AuctionShareButton';
import AuctionGuide from '@/components/AuctionGuide';
import T from '@/components/T';

// 90% LTV, 30yr, 4.5% p.a. pre-computed factor
const MONTHLY_FACTOR = 0.00456;

export const metadata: Metadata = {
  title: 'Bank Auction Properties (Lelong) Malaysia — eHartanah',
  description: `Browse ${auctionListings.length} bank auction (lelong) properties in Malaysia. Reserve prices 20–40% below market value. Updated weekly.`,
};

const BASE_URL = 'https://ehartanahmalaysia.com';

function formatRM(n: number): string {
  if (n >= 1_000_000) return `RM ${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (n >= 1_000) return `RM ${(n / 1_000).toFixed(0)}K`;
  return `RM ${n.toLocaleString('en-MY')}`;
}

function parseAuctionDate(s: string | null): Date | null {
  if (!s) return null;
  const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  return new Date(+m[3], +m[2] - 1, +m[1]);
}

type Group = 'closed' | 'urgent' | 'upcoming' | 'tbc';

function getGroup(l: AuctionListing, now: Date): Group {
  const d = parseAuctionDate(l.auctionDate);
  if (!d) return 'tbc';
  const days = (d.getTime() - now.getTime()) / 86_400_000;
  if (days < 0) return 'closed';
  if (days < 7) return 'urgent';
  return 'upcoming';
}

const regions = [...new Set(auctionListings.map((l) => l.region))].sort();
const categories = [...new Set(auctionListings.map((l) => l.category))].sort();

const inp = 'border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-amber-400 bg-white h-11 w-full';
const sel = inp + ' cursor-pointer';

const GROUP_CONFIG: Record<Group, { label: { en: string; bm: string }; color: string }> = {
  closed:   { label: { en: 'Auction Closed',       bm: 'Lelongan Ditutup' },       color: 'text-gray-400 border-gray-200' },
  urgent:   { label: { en: 'This Week — Act Fast!', bm: 'Minggu Ini — Cepat!' },   color: 'text-red-600 border-red-200' },
  upcoming: { label: { en: 'Upcoming',              bm: 'Akan Datang' },             color: 'text-amber-600 border-amber-200' },
  tbc:      { label: { en: 'Date TBC',              bm: 'Tarikh TBC' },              color: 'text-gray-500 border-gray-200' },
};

const GROUP_ORDER: Group[] = ['urgent', 'upcoming', 'tbc', 'closed'];

export default async function AuctionPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; region?: string; category?: string; sort?: string; minRP?: string; maxRP?: string }>;
}) {
  const { q, region, category, sort, minRP, maxRP } = await searchParams;
  const now = new Date();

  let filtered = auctionListings;

  if (q) {
    const lq = q.toLowerCase();
    filtered = filtered.filter((l) =>
      l.address.toLowerCase().includes(lq) ||
      l.propertyType.toLowerCase().includes(lq) ||
      l.region.toLowerCase().includes(lq)
    );
  }
  if (region && region !== 'All') filtered = filtered.filter((l) => l.region === region);
  if (category && category !== 'All') filtered = filtered.filter((l) => l.category === category);
  if (minRP) filtered = filtered.filter((l) => l.reservePrice >= Number(minRP));
  if (maxRP) filtered = filtered.filter((l) => l.reservePrice <= Number(maxRP));

  if (sort === 'price-asc')   filtered = [...filtered].sort((a, b) => a.reservePrice - b.reservePrice);
  else if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.reservePrice - a.reservePrice);
  else if (sort === 'discount')   filtered = [...filtered].sort((a, b) => b.savingsPct - a.savingsPct);
  else if (sort === 'roi')        filtered = [...filtered].sort((a, b) => (b.roi ?? 0) - (a.roi ?? 0));

  const grouped = new Map<Group, AuctionListing[]>();
  GROUP_ORDER.forEach((g) => grouped.set(g, []));
  for (const l of filtered) grouped.get(getGroup(l, now))!.push(l);

  const hasFilters = q || (region && region !== 'All') || (category && category !== 'All') || minRP || maxRP;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-[#0f2540] py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
              <T en="Weekly Update" bm="Kemaskini Mingguan" />
            </span>
            <span className="text-amber-200 text-xs">9 Jun 2026</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-bold text-white mb-2">
            <T en="Bank Auction Properties (Lelong)" bm="Hartanah Lelongan Bank (Lelong)" />
          </h1>
          <p className="text-amber-100 text-sm">
            {auctionListings.length} <T en="properties below market value — updated weekly" bm="hartanah di bawah nilai pasaran — dikemaskini setiap minggu" />
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-[#0f2540]">{auctionListings.length}</p>
            <p className="text-xs text-gray-500"><T en="Auction Units" bm="Unit Lelongan" /></p>
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-600">
              {Math.round(auctionListings.reduce((s, l) => s + l.savingsPct, 0) / auctionListings.length)}%
            </p>
            <p className="text-xs text-gray-500"><T en="Avg Discount" bm="Purata Diskaun" /></p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {Math.round(auctionListings.filter((l) => l.roi !== null).reduce((s, l) => s + (l.roi ?? 0), 0) / auctionListings.filter((l) => l.roi !== null).length)}%
            </p>
            <p className="text-xs text-gray-500"><T en="Avg ROI" bm="Purata ROI" /></p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#0f2540]">{regions.length}</p>
            <p className="text-xs text-gray-500"><T en="States" bm="Negeri" /></p>
          </div>
        </div>
      </div>

      {/* ── Sticky filter bar ─────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <form method="GET" action="/auction" className="space-y-2">

            {/* Row 1 — search input + submit + AI button */}
            <div className="flex gap-2">
              <input
                name="q"
                defaultValue={q || ''}
                placeholder="Search address, area or property type…"
                className={`${inp} flex-1`}
              />
              <button
                type="submit"
                className="shrink-0 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-sm px-5 h-11 rounded-xl transition-colors"
              >
                <T en="Search" bm="Cari" />
              </button>
              <Link
                href={`/ai-search?q=${encodeURIComponent('Show me bank auction lelong properties')}`}
                className="shrink-0 flex items-center gap-1.5 bg-[#0f2540] hover:bg-[#1e3a5f] text-white text-sm font-semibold px-4 h-11 rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.344.346a5 5 0 01-1.414 1.414l-.344-.344a5 5 0 01-1.414-1.414z" />
                </svg>
                <span className="hidden sm:inline"><T en="Ask AI" bm="Tanya AI" /></span>
              </Link>
            </div>

            {/* Row 2 — 3 dropdowns (2-col on mobile, 3-col on sm+) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <select name="region" defaultValue={region || 'All'} className={sel}>
                <option value="All"><T en="All States" bm="Semua Negeri" /></option>
                {regions.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              <select name="category" defaultValue={category || 'All'} className={sel}>
                <option value="All"><T en="All Types" bm="Semua Jenis" /></option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select name="sort" defaultValue={sort || ''} className={`${sel} col-span-2 sm:col-span-1`}>
                <option value=""><T en="Default order" bm="Susunan asal" /></option>
                <option value="discount"><T en="Highest discount" bm="Diskaun tertinggi" /></option>
                <option value="roi"><T en="Highest ROI" bm="ROI tertinggi" /></option>
                <option value="price-asc"><T en="Price: Low → High" bm="Harga: Rendah → Tinggi" /></option>
                <option value="price-desc"><T en="Price: High → Low" bm="Harga: Tinggi → Rendah" /></option>
              </select>
            </div>

            {/* Row 3 — price range + meta */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-400 font-medium shrink-0">
                <T en="Reserve Price" bm="Harga Rizab" />:
              </span>
              <div className="flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 h-9 bg-white flex-1 min-w-0 max-w-xs">
                <span className="text-gray-400 text-xs font-medium shrink-0">RM</span>
                <input
                  name="minRP"
                  defaultValue={minRP || ''}
                  placeholder="Min"
                  inputMode="numeric"
                  className="w-0 flex-1 text-sm outline-none bg-transparent"
                />
                <span className="text-gray-300 shrink-0">–</span>
                <input
                  name="maxRP"
                  defaultValue={maxRP || ''}
                  placeholder="Max"
                  inputMode="numeric"
                  className="w-0 flex-1 text-sm outline-none bg-transparent"
                />
              </div>
              <div className="flex items-center gap-3 ml-auto">
                {hasFilters && (
                  <Link href="/auction" className="text-xs text-gray-400 hover:text-gray-600 underline whitespace-nowrap">
                    <T en="Clear" bm="Padam" />
                  </Link>
                )}
                <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                  {filtered.length} <T en="results" bm="keputusan" />
                </span>
              </div>
            </div>

          </form>
        </div>
      </div>

      {/* ── Grouped listings ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="font-semibold text-gray-500 mb-2">
              <T en="No listings match your filters" bm="Tiada senarai sepadan" />
            </p>
            <Link href="/auction" className="text-amber-600 text-sm font-semibold underline">
              <T en="Clear filters" bm="Padam tapisan" />
            </Link>
          </div>
        ) : (
          GROUP_ORDER.map((group) => {
            const items = grouped.get(group)!;
            if (items.length === 0) return null;
            const cfg = GROUP_CONFIG[group];
            return (
              <section key={group}>
                {/* Section heading */}
                <div className={`flex items-center gap-3 mb-5 pb-3 border-b-2 ${cfg.color}`}>
                  {group === 'urgent' && (
                    <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase animate-pulse">
                      Hot
                    </span>
                  )}
                  {group === 'closed' && (
                    <span className="bg-gray-200 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      Closed
                    </span>
                  )}
                  <h2 className={`text-base font-bold ${cfg.color.split(' ')[0]}`}>
                    <T en={cfg.label.en} bm={cfg.label.bm} />
                  </h2>
                  <span className="text-xs text-gray-400 font-medium">
                    {items.length} <T en="listings" bm="senarai" />
                  </span>
                </div>

                {/* Card grid — 1 col mobile, 2 col tablet, 3 col desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {items.map((l) => {
                    const photo = l.photos?.[0] ?? areaPhotoByRegionCategory(l.region, l.category);
                    const isClosed = group === 'closed';
                    const rpPct = l.marketValue > 0 ? Math.round((l.reservePrice / l.marketValue) * 100) : 0;
                    const estMonthly = Math.round(l.reservePrice * MONTHLY_FACTOR);
                    const waText = encodeURIComponent(
                      `Salam! Saya berminat dengan unit lelongan: ${l.propertyType} di ${l.address} — Harga Rizab ${formatRM(l.reservePrice)}. Boleh dapatkan maklumat lanjut?`
                    );

                    return (
                      <div
                        key={l.id}
                        className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col ${isClosed ? 'opacity-60' : ''}`}
                      >
                        {/* ── Photo ── */}
                        <Link href={`/auction/${l.id}`}>
                          <div className="relative h-44 lg:h-52 bg-gray-800 overflow-hidden">
                            {photo ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={photo}
                                alt=""
                                aria-hidden
                                className={`absolute inset-0 w-full h-full object-cover object-top ${isClosed ? 'grayscale' : ''}`}
                              />
                            ) : (
                              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />
                            )}
                            <div className="absolute inset-0 bg-black/20" />

                            {/* Closed overlay */}
                            {isClosed && (
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <span className="bg-gray-800 text-white text-sm font-black px-4 py-2 rounded-lg tracking-wide">
                                  AUCTION CLOSED
                                </span>
                              </div>
                            )}

                            {/* Date banner */}
                            {l.auctionDate && !isClosed && (
                              <div className="absolute top-0 left-0 flex items-center">
                                <div className="w-1.5 h-10 lg:h-12 bg-gray-900" />
                                <div className="bg-orange-500 px-2.5 lg:px-3 h-10 lg:h-12 flex items-center">
                                  <span className="text-white font-black text-sm lg:text-xl tracking-tight leading-none">
                                    {l.auctionDate}
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* EST stamp */}
                            {!isClosed && (
                              <div className="absolute top-2 right-3 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center">
                                <div
                                  className="absolute inset-0 bg-amber-100 border-2 border-amber-300"
                                  style={{ clipPath: 'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)' }}
                                />
                                <span className="relative text-[9px] lg:text-[10px] font-black text-amber-800 tracking-wide">EST.</span>
                              </div>
                            )}

                            {/* Save badge */}
                            <div className="absolute bottom-2.5 left-3">
                              <span className="bg-red-500 text-white text-[11px] lg:text-xs font-black px-2.5 lg:px-3 py-0.5 lg:py-1 rounded-md tracking-wide">
                                SAVE {l.savingsPct}%
                              </span>
                            </div>
                            <div className="absolute bottom-2.5 right-3">
                              <span className="bg-black/40 backdrop-blur-sm text-white text-[10px] lg:text-[11px] font-semibold px-2 lg:px-2.5 py-0.5 lg:py-1 rounded-md">
                                {l.propertyType}
                              </span>
                            </div>
                          </div>
                        </Link>

                        {/* ── Body ── */}
                        <div className="p-3 lg:p-4 flex flex-col flex-1">
                          {/* Reserve price + MV */}
                          <div className="flex items-end justify-between mb-1.5">
                            <div>
                              <p className="text-[10px] text-gray-400">
                                <T en="Reserve Price" bm="Harga Rizab" />
                              </p>
                              <p className="text-lg lg:text-xl font-black text-[#1e3a5f]">{formatRM(l.reservePrice)}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] text-gray-400">
                                <T en="Market Value" bm="Nilai Pasaran" />
                              </p>
                              <p className="text-sm font-semibold text-gray-400 line-through">{formatRM(l.marketValue)}</p>
                            </div>
                          </div>

                          {/* RP vs MV bar */}
                          <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden mb-2.5">
                            <div className="h-full rounded-full bg-[#1e3a5f]" style={{ width: `${rpPct}%` }} />
                          </div>

                          {/* Address */}
                          <Link href={`/auction/${l.id}`}>
                            <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2.5 flex items-start gap-1 hover:text-[#1e3a5f] transition-colors">
                              <svg className="w-3.5 h-3.5 shrink-0 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="line-clamp-2">{l.address || l.title}</span>
                            </h3>
                          </Link>

                          {/* Stats chips */}
                          <div className="grid grid-cols-3 gap-1.5 mb-2.5">
                            {l.size && (
                              <div className="bg-slate-50 rounded-lg p-1.5 lg:p-2 text-center">
                                <p className="text-[9px] lg:text-[10px] text-gray-400">
                                  <T en="Size" bm="Keluasan" />
                                </p>
                                <p className="text-[11px] lg:text-xs font-bold text-gray-800 truncate">
                                  {l.size.toLocaleString()}<span className="font-normal text-gray-400"> ft²</span>
                                </p>
                              </div>
                            )}
                            {l.roi !== null && (
                              <div className="bg-green-50 rounded-lg p-1.5 lg:p-2 text-center">
                                <p className="text-[9px] lg:text-[10px] text-gray-400">ROI</p>
                                <p className="text-[11px] lg:text-xs font-bold text-green-700">{l.roi}%</p>
                              </div>
                            )}
                            {l.savings > 0 && (
                              <div className="bg-red-50 rounded-lg p-1.5 lg:p-2 text-center">
                                <p className="text-[9px] lg:text-[10px] text-gray-400">
                                  <T en="Save" bm="Jimat" />
                                </p>
                                <p className="text-[11px] lg:text-xs font-bold text-red-600">{formatRM(l.savings)}</p>
                              </div>
                            )}
                          </div>

                          {l.rentalRange && (
                            <p className="text-xs text-gray-500 mb-1.5">
                              <span className="font-semibold text-gray-700">
                                <T en="Est. Rental" bm="Sewa Anggaran" />:
                              </span>{' '}
                              {l.rentalRange}
                            </p>
                          )}

                          {/* Est. monthly installment */}
                          {!isClosed && (
                            <div className="bg-[#0f2540]/5 rounded-lg px-2.5 py-1.5 lg:py-2 mb-2.5 flex items-center justify-between gap-2">
                              <span className="text-[10px] text-gray-500 leading-tight">
                                <T en="Monthly est." bm="Ansuran est." />
                                <br />
                                <span className="text-gray-400">90% LTV · 30yr · 4.5%</span>
                              </span>
                              <span className="text-sm font-black text-[#0f2540] shrink-0">
                                RM {estMonthly.toLocaleString('en-MY')}<span className="text-xs font-normal text-gray-400">/mo</span>
                              </span>
                            </div>
                          )}

                          {/* Countdown + region */}
                          <div className="mt-auto pt-2.5 border-t border-gray-50 flex items-center justify-between gap-2 flex-wrap">
                            {l.auctionDate && l.auctionDate.match(/^\d{2}\/\d{2}\/\d{4}$/) && !isClosed ? (
                              <AuctionCountdown dateStr={l.auctionDate} />
                            ) : (
                              <span className="text-xs text-gray-400">
                                {isClosed
                                  ? <T en="Auction Closed" bm="Lelongan Ditutup" />
                                  : <T en="Date TBC" bm="Tarikh TBC" />}
                              </span>
                            )}
                            <span className="text-xs text-gray-400 truncate">{l.region}</span>
                          </div>
                        </div>

                        {/* ── Action row ── */}
                        <div className="px-3 lg:px-4 pb-3 lg:pb-4 flex gap-2">
                          <a
                            href={`https://wa.me/${AGENCY_PHONE}?text=${waText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-xs font-semibold py-2.5 lg:py-3 rounded-xl transition-colors"
                          >
                            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            <T en="Enquire" bm="Tanya" />
                          </a>
                          <FavouriteButton id={l.id} type="auction" />
                          <AuctionShareButton
                            title={`${l.propertyType} Lelong`}
                            address={l.address}
                            url={`${BASE_URL}/auction/${l.id}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })
        )}

        {/* Auction 101 guide */}
        <AuctionGuide />

        {/* Footer CTA */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 text-center">
          <p className="text-sm font-semibold text-amber-800 mb-1">
            <T en="Want next week's hot auction list?" bm="Mahu senarai lelongan panas minggu depan?" />
          </p>
          <p className="text-xs text-amber-700 mb-4">
            <T
              en="We publish new auction picks every Monday. Follow us to get notified."
              bm="Kami terbitkan pilihan lelongan baru setiap Isnin. Ikuti kami untuk mendapat notifikasi."
            />
          </p>
          <a
            href={`https://wa.me/${AGENCY_PHONE}?text=${encodeURIComponent('Salam! Saya ingin dapat senarai lelongan mingguan daripada eHartanah.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <T en="Subscribe via WhatsApp" bm="Langgan via WhatsApp" />
          </a>
        </div>
      </div>
    </div>
  );
}
