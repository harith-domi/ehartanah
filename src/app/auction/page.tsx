import type { Metadata } from 'next';
import Link from 'next/link';
import { auctionListings } from '@/lib/listings';
import T from '@/components/T';

export const metadata: Metadata = {
  title: 'Bank Auction Properties (Lelong) Malaysia — eHartanah',
  description:
    `Browse ${auctionListings.length} bank auction (lelong) properties in Malaysia. Reserve prices 20–40% below market value. Updated weekly.`,
};

function formatRM(n: number): string {
  if (n >= 1_000_000) return `RM ${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (n >= 1_000) return `RM ${(n / 1_000).toFixed(0)}K`;
  return `RM ${n.toLocaleString('en-MY')}`;
}

export default function AuctionPage() {
  const regions = [...new Set(auctionListings.map((l) => l.region))].sort();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-[#0f2540] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
              <T en="Weekly Update" bm="Kemaskini Mingguan" />
            </span>
            <span className="text-amber-200 text-xs">9 Jun 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
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

      {/* Listings grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {auctionListings.map((l) => (
            <div key={l.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
              {/* Colour header */}
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-4 relative">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="bg-white/20 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md">
                      {l.propertyType}
                    </span>
                    {l.tenure && (
                      <span className="ml-1.5 bg-white/20 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md">
                        {l.tenure}
                      </span>
                    )}
                  </div>
                  <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shrink-0">
                    SAVE {l.savingsPct}%
                  </span>
                </div>
                <p className="text-white font-bold text-xl mt-3">{formatRM(l.reservePrice)}</p>
                <p className="text-amber-100 text-xs">
                  <T en="Reserve Price" bm="Harga Rizab" /> · <T en="MV" bm="NP" />: <span className="line-through opacity-70">{formatRM(l.marketValue)}</span>
                </p>
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1 line-clamp-2">{l.title}</h3>
                <p className="text-gray-500 text-xs mb-3 flex items-start gap-1">
                  <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="line-clamp-2">{l.address}</span>
                </p>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {l.size && (
                    <div className="bg-slate-50 rounded-lg p-2 text-center">
                      <p className="text-[11px] text-gray-400"><T en="Size" bm="Keluasan" /></p>
                      <p className="text-xs font-bold text-gray-800">{l.size.toLocaleString()}<span className="font-normal text-gray-400"> ft²</span></p>
                    </div>
                  )}
                  {l.roi !== null && (
                    <div className="bg-green-50 rounded-lg p-2 text-center">
                      <p className="text-[11px] text-gray-400">ROI</p>
                      <p className="text-xs font-bold text-green-700">{l.roi}%</p>
                    </div>
                  )}
                  {l.savings > 0 && (
                    <div className="bg-red-50 rounded-lg p-2 text-center">
                      <p className="text-[11px] text-gray-400"><T en="Savings" bm="Penjimatan" /></p>
                      <p className="text-xs font-bold text-red-600">{formatRM(l.savings)}</p>
                    </div>
                  )}
                </div>

                {l.rentalRange && (
                  <p className="text-xs text-gray-500 mb-3">
                    <span className="font-semibold text-gray-700"><T en="Est. Rental" bm="Sewa Anggaran" />:</span> {l.rentalRange}
                  </p>
                )}

                <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                  {l.auctionDate ? (
                    <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <T en="Auction" bm="Lelong" />: {l.auctionDate}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400"><T en="Date TBC" bm="Tarikh TBC" /></span>
                  )}
                  <span className="text-xs text-gray-400">{l.region}</span>
                </div>
              </div>

              {/* CTA */}
              <div className="px-4 pb-4">
                <a
                  href={`https://wa.me/60133677921?text=${encodeURIComponent(`Salam! Saya berminat dengan unit lelongan: ${l.title} (${l.address}) — Harga Rizab ${formatRM(l.reservePrice)}. Boleh dapatkan maklumat lanjut?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <T en="Enquire via WhatsApp" bm="Tanya via WhatsApp" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 bg-amber-50 border border-amber-100 rounded-2xl p-6 text-center">
          <p className="text-sm font-semibold text-amber-800 mb-1">
            <T en="Want next week's hot auction list?" bm="Mahu senarai lelongan panas minggu depan?" />
          </p>
          <p className="text-xs text-amber-700 mb-4">
            <T en="We publish new auction picks every Monday. Follow us to get notified." bm="Kami terbitkan pilihan lelongan baru setiap Isnin. Ikuti kami untuk mendapat notifikasi." />
          </p>
          <a
            href={`https://wa.me/60133677921?text=${encodeURIComponent('Salam! Saya ingin dapat senarai lelongan mingguan daripada eHartanah.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
          >
            <T en="Subscribe via WhatsApp" bm="Langgan via WhatsApp" />
          </a>
        </div>
      </div>
    </div>
  );
}
