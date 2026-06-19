'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import T from '@/components/T';
import { formatPrice, formatSize, displayBedrooms, displayBathrooms } from '@/lib/listings';
import type { Listing, AuctionListing } from '@/lib/listings';

type SavedItem = { type: 'listing' | 'auction'; id: string };
const KEY = 'ehartanah_favs';

function ListingCard({ listing }: { listing: Listing }) {
  const beds = displayBedrooms(listing);
  const baths = displayBathrooms(listing);
  const size = formatSize(listing);
  const photo = listing.photos?.[0] ?? listing.thumbnailUrl;

  return (
    <Link href={`/listings/${listing.id}`} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      <div className="relative h-40 bg-[#0f2540] overflow-hidden">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={listing.title} className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] to-[#0f2540]" />
        )}
        <span className="absolute top-2 left-2 bg-black/30 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
          {listing.propertyType || listing.category}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-400 mb-0.5">
          {listing.listingType === 'rent' ? <T en="Monthly Rent" bm="Sewa Bulanan" /> : <T en="Asking Price" bm="Harga Jualan" />}
        </p>
        <p className="text-lg font-black text-[#1e3a5f] mb-1">{formatPrice(listing.price, listing.listingType)}</p>
        <p className="text-xs text-gray-600 font-medium leading-snug mb-2 line-clamp-2">{listing.title}</p>
        <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
          <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          {listing.subarea || listing.region}
        </p>
        <div className="flex items-center gap-3 text-xs text-gray-500 mt-auto">
          {beds !== null && <span>{beds} <T en="bed" bm="bilik" /></span>}
          {baths !== null && <span>{baths} <T en="bath" bm="bilik air" /></span>}
          {size && <span>{size}</span>}
        </div>
      </div>
    </Link>
  );
}

function AuctionCard({ listing }: { listing: AuctionListing }) {
  const photo = listing.photos?.[0];
  return (
    <Link href={`/auction/${listing.id}`} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      <div className="relative h-40 bg-gray-800 overflow-hidden">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={listing.title} className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />
        )}
        <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md">
          SAVE {listing.savingsPct}%
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-400 mb-0.5"><T en="Reserve Price" bm="Harga Rizab" /></p>
        <p className="text-lg font-black text-[#1e3a5f] mb-1">RM {listing.reservePrice.toLocaleString('en-MY')}</p>
        <p className="text-xs text-gray-600 font-medium leading-snug mb-2 line-clamp-2">{listing.title}</p>
        <p className="text-xs text-gray-400 flex items-center gap-1">
          <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          {listing.region}
        </p>
      </div>
    </Link>
  );
}

export default function ShortlistClient() {
  const { lang } = useLang();
  const [items, setItems] = useState<SavedItem[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [auctions, setAuctions] = useState<AuctionListing[]>([]);
  const [loading, setLoading] = useState(true);

  const t = lang === 'en' ? {
    title: 'My Shortlist',
    subtitle: 'Properties you\'ve saved for later',
    empty: 'No saved properties yet',
    emptyHint: 'Tap the heart icon on any listing to save it here.',
    browse: 'Browse Properties',
    clear: 'Clear all',
    saved: 'saved',
  } : {
    title: 'Senarai Simpanan Saya',
    subtitle: 'Hartanah yang anda simpan untuk semakan kemudian',
    empty: 'Tiada hartanah tersimpan lagi',
    emptyHint: 'Ketik ikon hati pada mana-mana senarai untuk menyimpannya di sini.',
    browse: 'Semak Hartanah',
    clear: 'Padam semua',
    saved: 'disimpan',
  };

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (!raw) { setLoading(false); return; }
    try {
      const parsed: SavedItem[] = JSON.parse(raw);
      setItems(parsed);
      // Dynamically import listing data to avoid bundling it in this client component
      Promise.all([
        import('@/lib/listings').then((m) => m.allListings),
        import('@/lib/listings').then((m) => m.auctionListings),
      ]).then(([allListings, auctionListings]) => {
        const listingIds = new Set(parsed.filter((i) => i.type === 'listing').map((i) => i.id));
        const auctionIds = new Set(parsed.filter((i) => i.type === 'auction').map((i) => i.id));
        setListings(allListings.filter((l) => listingIds.has(l.id)));
        setAuctions(auctionListings.filter((l) => auctionIds.has(l.id)));
        setLoading(false);
      });
    } catch {
      setLoading(false);
    }
  }, []);

  const handleClear = () => {
    localStorage.removeItem(KEY);
    setItems([]);
    setListings([]);
    setAuctions([]);
  };

  const total = listings.length + auctions.length;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-[#1e3a5f] to-[#0f2540] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{t.title}</h1>
          <p className="text-[#94b3cc] text-sm">{t.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-64 animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : total === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">{t.empty}</h2>
            <p className="text-gray-400 text-sm mb-6">{t.emptyHint}</p>
            <Link href="/listings" className="inline-block bg-[#0f2540] text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-[#0a1e38] transition-colors">
              {t.browse}
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">{total} {t.saved}</p>
              <button onClick={handleClear} className="text-xs text-red-500 hover:text-red-700 font-semibold transition-colors">
                {t.clear}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {listings.map((l) => <ListingCard key={l.id} listing={l} />)}
              {auctions.map((l) => <AuctionCard key={l.id} listing={l} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
