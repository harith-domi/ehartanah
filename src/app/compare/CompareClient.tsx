'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import T from '@/components/T';
import { formatPrice, formatSize, displayBedrooms, displayBathrooms, pricePerSqft } from '@/lib/listings';
import type { Listing, AuctionListing } from '@/lib/listings';

type Item = { kind: 'listing'; data: Listing } | { kind: 'auction'; data: AuctionListing };

function val(v: string | number | null | undefined) {
  if (v === null || v === undefined || v === '') return '—';
  return String(v);
}

function Row({ label, values }: { label: string; values: (string | null | undefined)[] }) {
  const allSame = values.every((v) => v === values[0]);
  return (
    <tr className="border-b border-gray-100">
      <td className="py-3 px-4 text-xs font-semibold text-gray-500 bg-slate-50 w-32 shrink-0">{label}</td>
      {values.map((v, i) => (
        <td
          key={i}
          className={`py-3 px-4 text-sm font-medium text-center ${
            !allSame && v !== '—' ? 'text-[#1e3a5f] font-bold' : 'text-gray-700'
          }`}
        >
          {val(v)}
        </td>
      ))}
    </tr>
  );
}

export default function CompareClient() {
  const params = useSearchParams();
  const { lang } = useLang();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const t = lang === 'en'
    ? { title: 'Property Comparison', back: '← Browse', empty: 'No properties to compare', emptyHint: 'Add properties using the VS button on listing cards.', browse: 'Browse Properties' }
    : { title: 'Perbandingan Hartanah', back: '← Semak', empty: 'Tiada hartanah untuk dibandingkan', emptyHint: 'Tambah hartanah menggunakan butang VS pada kad senarai.', browse: 'Semak Hartanah' };

  useEffect(() => {
    const raw = params.get('ids');
    if (!raw) { setLoading(false); return; }
    const entries = raw.split(',').map((s) => {
      const [type, ...rest] = s.split(':');
      return { type, id: rest.join(':') };
    });

    Promise.all([
      import('@/lib/listings').then((m) => m.allListings),
      import('@/lib/listings').then((m) => m.auctionListings),
    ]).then(([allListings, auctionListings]) => {
      const result: Item[] = entries.map((e) => {
        if (e.type === 'listing') {
          const data = allListings.find((l) => l.id === e.id);
          return data ? { kind: 'listing' as const, data } : null;
        } else {
          const data = auctionListings.find((l) => l.id === e.id);
          return data ? { kind: 'auction' as const, data } : null;
        }
      }).filter(Boolean) as Item[];
      setItems(result);
      setLoading(false);
    });
  }, [params]);

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (items.length === 0) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4 text-center px-4">
      <p className="text-lg font-bold text-gray-800">{t.empty}</p>
      <p className="text-sm text-gray-400">{t.emptyHint}</p>
      <Link href="/listings" className="bg-[#0f2540] text-white font-semibold px-6 py-2.5 rounded-xl text-sm">{t.browse}</Link>
    </div>
  );

  const photos = items.map((item) =>
    item.kind === 'listing'
      ? (item.data.photos?.[0] ?? item.data.thumbnailUrl ?? null)
      : (item.data.photos?.[0] ?? null)
  );

  const prices = items.map((item) =>
    item.kind === 'listing'
      ? formatPrice(item.data.price, item.data.listingType)
      : `RM ${item.data.reservePrice.toLocaleString('en-MY')}`
  );

  const titles = items.map((item) => item.data.title);
  const locations = items.map((item) =>
    item.kind === 'listing' ? (item.data.subarea || item.data.region) : item.data.region
  );
  const types = items.map((item) =>
    item.kind === 'listing' ? item.data.propertyType : item.data.propertyType
  );
  const sizes = items.map((item) =>
    item.kind === 'listing' ? (formatSize(item.data) || '—') : (item.data.size ? `${item.data.size.toLocaleString()} ${item.data.sizeUnit}` : '—')
  );
  const beds = items.map((item) =>
    item.kind === 'listing' ? String(displayBedrooms(item.data) ?? '—') : '—'
  );
  const baths = items.map((item) =>
    item.kind === 'listing' ? String(displayBathrooms(item.data) ?? '—') : '—'
  );
  const psf = items.map((item) =>
    item.kind === 'listing' ? (pricePerSqft(item.data) ? `RM ${pricePerSqft(item.data)?.toLocaleString()}` : '—') : '—'
  );
  const kinds = items.map((item) =>
    item.kind === 'auction' ? (lang === 'en' ? 'Bank Auction' : 'Lelong Bank') : (item.data.listingType === 'rent' ? (lang === 'en' ? 'For Rent' : 'Untuk Sewa') : (lang === 'en' ? 'For Sale' : 'Untuk Dijual'))
  );
  const savings = items.map((item) =>
    item.kind === 'auction' ? `${item.data.savingsPct}% below market` : '—'
  );

  const hrefs = items.map((item) =>
    item.kind === 'listing' ? `/listings/${item.data.id}` : `/auction/${item.data.id}`
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-[#1e3a5f] to-[#0f2540] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Link href="/browse" className="text-[#94b3cc] text-sm font-semibold hover:text-white transition-colors">{t.back}</Link>
          <h1 className="text-2xl font-bold text-white mt-2">{t.title}</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 overflow-x-auto">
        <table className="w-full border-collapse rounded-2xl overflow-hidden shadow-sm bg-white">
          {/* Photos + titles */}
          <thead>
            <tr className="border-b border-gray-100">
              <th className="bg-slate-50 w-32" />
              {items.map((item, i) => (
                <th key={i} className="p-4 text-center align-top">
                  <Link href={hrefs[i]} className="block group">
                    <div className="relative h-36 rounded-xl overflow-hidden bg-[#0f2540] mb-3">
                      {photos[i] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={photos[i]!} alt={titles[i]} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#1e3a5f] to-[#0f2540]" />
                      )}
                    </div>
                    <p className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2 group-hover:text-[#1e3a5f] transition-colors">{titles[i]}</p>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <Row label={lang === 'en' ? 'Price' : 'Harga'} values={prices} />
            <Row label={lang === 'en' ? 'Type' : 'Jenis'} values={kinds} />
            <Row label={lang === 'en' ? 'Property' : 'Hartanah'} values={types} />
            <Row label={lang === 'en' ? 'Location' : 'Lokasi'} values={locations} />
            <Row label={lang === 'en' ? 'Size' : 'Saiz'} values={sizes} />
            <Row label={lang === 'en' ? 'Bedrooms' : 'Bilik Tidur'} values={beds} />
            <Row label={lang === 'en' ? 'Bathrooms' : 'Bilik Mandi'} values={baths} />
            <Row label={lang === 'en' ? 'Price/sqft' : 'Harga/kps'} values={psf} />
            <Row label={lang === 'en' ? 'Discount' : 'Diskaun'} values={savings} />
            <tr>
              <td className="bg-slate-50" />
              {items.map((_, i) => (
                <td key={i} className="py-4 px-4 text-center">
                  <Link
                    href={hrefs[i]}
                    className="inline-block bg-[#0f2540] hover:bg-[#1e3a5f] text-white font-semibold text-sm px-4 py-2 rounded-xl transition-colors"
                  >
                    <T en="View Details" bm="Lihat Butiran" />
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
