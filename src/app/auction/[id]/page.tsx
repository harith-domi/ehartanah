import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { auctionListings, getAuctionListing, AGENCY_PHONE } from '@/lib/listings';
import FavouriteButton from '@/components/FavouriteButton';
import AuctionCountdown from '@/components/AuctionCountdown';
import AuctionShareButton from '@/components/AuctionShareButton';
import MortgageCalculator from '@/components/MortgageCalculator';
import T from '@/components/T';
import EnquiryForm from '@/components/EnquiryForm';

const BASE_URL = 'https://ehartanahmalaysia.com';

export function generateStaticParams() {
  return auctionListings.map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const l = getAuctionListing(id);
  if (!l) return { title: 'Listing Not Found' };
  const photo = l.photos?.[0];
  const title = `${l.propertyType} Lelong — ${l.address.split(',')[0]} | eHartanah`;
  const description = `Bank auction property at ${l.address}. Reserve price RM${(l.reservePrice / 1000).toFixed(0)}K, ${l.savingsPct}% below market value of RM${(l.marketValue / 1000).toFixed(0)}K.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/auction/${id}`,
      ...(photo && { images: [{ url: photo, width: 800, height: 600, alt: l.title }] }),
    },
    twitter: { card: 'summary_large_image', title, description, ...(photo && { images: [photo] }) },
  };
}

function formatRM(n: number): string {
  if (n >= 1_000_000) return `RM ${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2)}M`;
  if (n >= 1_000) return `RM ${(n / 1_000).toFixed(0)}K`;
  return `RM ${n.toLocaleString('en-MY')}`;
}

const WA_ICON = (
  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default async function AuctionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const l = getAuctionListing(id);
  if (!l) notFound();

  const photo = l.photos?.[0];
  const rpPct = l.marketValue > 0 ? Math.round((l.reservePrice / l.marketValue) * 100) : 0;
  const mapQuery = encodeURIComponent(l.address);
  const mapSrc = `https://maps.google.com/maps?q=${mapQuery}&output=embed&hl=en&zoom=15`;
  const waText = encodeURIComponent(
    `Salam! Saya berminat dengan unit lelongan: ${l.propertyType} di ${l.address} — Harga Rizab ${formatRM(l.reservePrice)}. Boleh dapatkan maklumat lanjut?`
  );
  const waHref = `https://wa.me/${AGENCY_PHONE}?text=${waText}`;
  const pageUrl = `${BASE_URL}/auction/${l.id}`;

  const similar = auctionListings
    .filter((x) => x.id !== l.id && (x.region === l.region || x.category === l.category))
    .slice(0, 3);

  return (
    /* pb-24 reserves space for the mobile sticky bottom bar */
    <div className="min-h-screen bg-slate-50 pb-24 lg:pb-0">

      {/* ── Mobile sticky bottom CTA bar ─── visible only on < lg ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-200 px-4 py-3 flex items-center gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold py-3.5 rounded-2xl transition-colors text-sm"
        >
          {WA_ICON}
          <T en="Enquire via WhatsApp" bm="Tanya via WhatsApp" />
        </a>
        <FavouriteButton id={l.id} type="auction" />
        <AuctionShareButton title={`${l.propertyType} Lelong`} address={l.address} url={pageUrl} />
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-sm text-gray-500 flex gap-2 min-w-0 overflow-hidden">
          <Link href="/" className="hover:text-[#1e3a5f] shrink-0"><T en="Home" bm="Utama" /></Link>
          <span className="shrink-0">/</span>
          <Link href="/auction" className="hover:text-[#1e3a5f] shrink-0"><T en="Auction" bm="Lelongan" /></Link>
          <span className="shrink-0">/</span>
          <span className="text-gray-800 truncate">{l.propertyType} · {l.address.split(',')[0]}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Back */}
        <div className="mb-5">
          <Link
            href="/auction"
            className="inline-flex items-center gap-1.5 text-[#1e3a5f] hover:text-[#0f2540] hover:bg-[#edf2f8] font-semibold text-sm px-3 py-1.5 -ml-3 rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <T en="Back to Auctions" bm="Kembali ke Lelongan" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* ── Main column ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Photo */}
            <div className="relative rounded-2xl overflow-hidden h-56 sm:h-72 bg-gray-800">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo} alt={l.address} className="absolute inset-0 w-full h-full object-cover object-top" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600" />
              )}
              <div className="absolute inset-0 bg-black/20" />
              {/* Date banner */}
              {l.auctionDate && (
                <div className="absolute top-0 left-0 flex items-center">
                  <div className="w-2 h-12 sm:h-14 bg-gray-900" />
                  <div className="bg-orange-500 px-3 sm:px-4 h-12 sm:h-14 flex items-center">
                    <span className="text-white font-black text-xl sm:text-2xl tracking-tight">{l.auctionDate}</span>
                  </div>
                </div>
              )}
              {/* EST stamp */}
              <div className="absolute top-3 right-4 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-amber-100 border-2 border-amber-300"
                  style={{ clipPath: 'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)' }}
                />
                <span className="relative text-[10px] sm:text-[11px] font-black text-amber-800">EST.</span>
              </div>
              {/* Save badge */}
              <div className="absolute bottom-4 left-4">
                <span className="bg-red-500 text-white font-black text-sm px-4 py-1.5 rounded-md">
                  SAVE {l.savingsPct}%
                </span>
              </div>
            </div>

            {/* Key info card */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
              {/* Title row */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-md uppercase">
                      <T en="Bank Auction" bm="Lelong Bank" />
                    </span>
                    <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                      {l.propertyType}
                    </span>
                    {l.tenure && (
                      <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                        {l.tenure}
                      </span>
                    )}
                  </div>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">{l.address}</h1>
                  <p className="text-gray-500 text-sm mt-1">{l.region}</p>
                </div>
                {/* Desktop fav + share — hidden on mobile (in sticky bar instead) */}
                <div className="hidden lg:flex items-center gap-1 shrink-0">
                  <FavouriteButton id={l.id} type="auction" />
                  <AuctionShareButton title={`${l.propertyType} Lelong`} address={l.address} url={pageUrl} />
                </div>
              </div>

              {/* RP vs MV */}
              <div className="bg-slate-50 rounded-xl p-3 sm:p-4 mb-4">
                <div className="flex items-end justify-between mb-2">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5"><T en="Reserve Price" bm="Harga Rizab" /></p>
                    <p className="text-2xl sm:text-3xl font-black text-[#1e3a5f]">{formatRM(l.reservePrice)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-0.5"><T en="Market Value" bm="Nilai Pasaran" /></p>
                    <p className="text-base sm:text-lg font-bold text-gray-400 line-through">{formatRM(l.marketValue)}</p>
                  </div>
                </div>
                <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                  <div className="h-full rounded-full bg-[#1e3a5f]" style={{ width: `${rpPct}%` }} />
                </div>
                <div className="flex justify-between text-[11px] mt-1 flex-wrap gap-1">
                  <span className="text-[#1e3a5f] font-semibold">RP ({rpPct}%)</span>
                  <span className="text-red-500 font-semibold">
                    Save {formatRM(l.savings)} ({l.savingsPct}% off)
                  </span>
                </div>
              </div>

              {/* Specs grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {l.size && (
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <p className="text-[11px] text-gray-400 mb-0.5"><T en="Size" bm="Keluasan" /></p>
                    <p className="text-sm font-bold text-gray-900">{l.size.toLocaleString()} ft²</p>
                  </div>
                )}
                {l.roi && (
                  <div className="bg-green-50 rounded-xl p-3 text-center">
                    <p className="text-[11px] text-gray-400 mb-0.5">ROI</p>
                    <p className="text-sm font-bold text-green-700">{l.roi}%</p>
                  </div>
                )}
                {l.rentalRange && (
                  <div className="bg-blue-50 rounded-xl p-3 text-center col-span-2">
                    <p className="text-[11px] text-gray-400 mb-0.5"><T en="Est. Rental" bm="Sewa Anggaran" /></p>
                    <p className="text-sm font-bold text-blue-700">{l.rentalRange}</p>
                  </div>
                )}
              </div>

              {/* Countdown */}
              {l.auctionDate && l.auctionDate.match(/^\d{2}\/\d{2}\/\d{4}$/) && (
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2">
                  <p className="text-xs text-gray-500"><T en="Time until auction" bm="Masa sebelum lelongan" /></p>
                  <AuctionCountdown dateStr={l.auctionDate} />
                </div>
              )}
            </div>

            {/* Loan calculator — mobile only, between info and map */}
            <div className="lg:hidden">
              <MortgageCalculator reservePrice={l.reservePrice} />
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="px-4 sm:px-5 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-sm"><T en="Location" bm="Lokasi" /></h3>
                <p className="text-gray-500 text-xs mt-0.5 truncate">{l.address}</p>
              </div>
              <div className="h-52 sm:h-64">
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  className="border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${l.address}`}
                />
              </div>
            </div>
          </div>

          {/* ── Sidebar — desktop only (lg+) ── */}
          <div className="hidden lg:flex flex-col gap-4">
            <div className="sticky top-20 flex flex-col gap-4">
              <EnquiryForm
                listingId={l.id}
                listingTitle={`${l.propertyType} — ${l.address.split(',')[0]}`}
                listingPrice={`Reserve ${formatRM(l.reservePrice)}`}
                listingType="auction"
              />

              {/* Price summary */}
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500"><T en="Reserve Price" bm="Harga Rizab" /></span>
                  <span className="font-bold text-[#1e3a5f]">{formatRM(l.reservePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500"><T en="Market Value" bm="Nilai Pasaran" /></span>
                  <span className="font-semibold text-gray-400 line-through">{formatRM(l.marketValue)}</span>
                </div>
                <div className="flex justify-between border-t border-amber-100 pt-2">
                  <span className="text-green-700 font-semibold"><T en="You save" bm="Anda jimat" /></span>
                  <span className="font-black text-green-600">{formatRM(l.savings)} ({l.savingsPct}%)</span>
                </div>
              </div>

              {/* Loan calculator — desktop sidebar */}
              <MortgageCalculator reservePrice={l.reservePrice} />
            </div>
          </div>
        </div>

        {/* Similar listings */}
        {similar.length > 0 && (
          <div className="mt-10 sm:mt-12 border-t border-gray-100 pt-8">
            <h2 className="text-lg font-bold text-gray-900 mb-5">
              <T en="Similar Auction Properties" bm="Hartanah Lelongan Serupa" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {similar.map((s) => (
                <Link
                  key={s.id}
                  href={`/auction/${s.id}`}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
                >
                  <div className="relative h-40 sm:h-36 bg-gray-800">
                    {s.photos?.[0] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.photos[0]} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover object-top" />
                    )}
                    <div className="absolute inset-0 bg-black/20" />
                    <span className="absolute bottom-2 left-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded">
                      SAVE {s.savingsPct}%
                    </span>
                  </div>
                  <div className="p-3 flex-1">
                    <p className="text-xs font-bold text-[#1e3a5f]">{formatRM(s.reservePrice)}</p>
                    <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">{s.address}</p>
                    {s.auctionDate && (
                      <p className="text-[11px] text-amber-600 font-semibold mt-1">{s.auctionDate}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
