import type { Metadata } from 'next';
import Link from 'next/link';
import { allListings, auctionListings } from '@/lib/listings';
import T from '@/components/T';

export const metadata: Metadata = {
  title: 'Market Stats & Insights | eHartanah Malaysia',
  description:
    'Live Malaysian property market statistics — average sale prices, rental rates, auction savings, and regional breakdowns from 15,000+ listings.',
};

/* ─── helpers ─────────────────────────────────────────────────────────────── */

function avg(nums: number[]): number {
  if (!nums.length) return 0;
  return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length);
}

function fmtRM(n: number): string {
  if (n >= 1_000_000) return `RM ${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `RM ${(n / 1_000).toFixed(0)}K`;
  return `RM ${n.toLocaleString('en-MY')}`;
}

/* ─── derived stats ────────────────────────────────────────────────────────── */

const salePrices = allListings
  .filter((l) => l.listingType === 'sale' && l.price !== null && l.price > 50_000 && l.price <= 5_000_000)
  .map((l) => l.price as number);

const rentPrices = allListings
  .filter((l) => l.listingType === 'rent' && l.price !== null && l.price >= 300 && l.price < 15_000)
  .map((l) => l.price as number);

const avgSalePrice = avg(salePrices);
const avgRent = avg(rentPrices);

/* ─── price by region (top 8) ──────────────────────────────────────────────── */

type RegionStats = {
  region: string;
  count: number;
  avgSale: number;
  avgRent: number;
};

function buildRegionStats(): RegionStats[] {
  const map: Record<string, { sale: number[]; rent: number[]; total: number }> = {};

  for (const l of allListings) {
    const r = l.region || 'Unknown';
    if (!map[r]) map[r] = { sale: [], rent: [], total: 0 };
    map[r].total++;

    if (l.listingType === 'sale' && l.price !== null && l.price >= 50_000 && l.price <= 5_000_000) {
      map[r].sale.push(l.price);
    }
    if (l.listingType === 'rent' && l.price !== null && l.price >= 300 && l.price < 15_000) {
      map[r].rent.push(l.price);
    }
  }

  return Object.entries(map)
    .map(([region, d]) => ({
      region,
      count: d.total,
      avgSale: avg(d.sale),
      avgRent: avg(d.rent),
    }))
    .filter((r) => r.region !== 'Unknown')
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

const regionStats = buildRegionStats();

/* ─── property type breakdown (top 6) ─────────────────────────────────────── */

type CatStats = { category: string; count: number; pct: number };

function buildCategoryStats(): CatStats[] {
  const map: Record<string, number> = {};
  for (const l of allListings) {
    const c = l.category || 'Other';
    map[c] = (map[c] ?? 0) + 1;
  }
  const total = allListings.length;
  return Object.entries(map)
    .map(([category, count]) => ({ category, count, pct: Math.round((count / total) * 100) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
}

const categoryStats = buildCategoryStats();
const maxCatCount = categoryStats[0]?.count ?? 1;

/* ─── auction savings ──────────────────────────────────────────────────────── */

const validSavings = auctionListings
  .map((a) => a.savingsPct)
  .filter((s) => typeof s === 'number' && s > 0 && s < 60);
const avgSavingsPct = validSavings.length ? Math.round(validSavings.reduce((a, b) => a + b, 0) / validSavings.length) : 0;

/* ─── page ─────────────────────────────────────────────────────────────────── */

export default function MarketPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fa]">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0f2540] via-[#1e3a5f] to-[#0f2540] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#d4a017]/20 border border-[#d4a017]/40 rounded-full px-4 py-1.5 text-[#d4a017] text-sm font-semibold mb-5">
            <span className="w-2 h-2 rounded-full bg-[#d4a017] animate-pulse" />
            <T en="Live Data" bm="Data Langsung" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            <T
              en="Malaysia Property Market Insights"
              bm="Insights Pasaran Hartanah Malaysia"
            />
          </h1>
          <p className="text-[#94b3cc] text-lg">
            <T en="Live data from 15,000+ listings across Malaysia" bm="Data langsung daripada 15,000+ penyenaraian di seluruh Malaysia" />
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* ── Top-level stat cards ────────────────────────────────────────────── */}
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total listings */}
            <StatCard
              label={<T en="Total Listings" bm="Jumlah Penyenaraian" />}
              value={allListings.length.toLocaleString('en-MY')}
              sub={<T en="Properties tracked" bm="Hartanah dipantau" />}
              icon="🏘️"
              accent="#d4a017"
            />
            {/* Avg sale price */}
            <StatCard
              label={<T en="Avg. Sale Price" bm="Harga Jual Purata" />}
              value={fmtRM(avgSalePrice)}
              sub={<T en="Residential properties" bm="Hartanah kediaman" />}
              icon="🏷️"
              accent="#22c55e"
            />
            {/* Avg rent */}
            <StatCard
              label={<T en="Avg. Monthly Rent" bm="Sewa Bulanan Purata" />}
              value={fmtRM(avgRent) + '/mo'}
              sub={<T en="Across all property types" bm="Semua jenis hartanah" />}
              icon="🔑"
              accent="#3b82f6"
            />
            {/* Auction count */}
            <StatCard
              label={<T en="Auction Listings" bm="Senarai Lelongan" />}
              value={auctionListings.length.toLocaleString('en-MY')}
              sub={<T en="Bank & court auctions" bm="Lelongan bank & mahkamah" />}
              icon="⚖️"
              accent="#a855f7"
            />
          </div>
        </section>

        {/* ── Price by region table ────────────────────────────────────────────── */}
        <section>
          <SectionHeader
            title={<T en="Price by Region" bm="Harga Mengikut Kawasan" />}
            desc={<T en="Top 8 regions by listing volume — sale & rental averages" bm="8 kawasan teratas mengikut jumlah penyenaraian" />}
          />
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0f2540] text-white text-left">
                  <th className="px-5 py-3.5 font-semibold rounded-tl-2xl">
                    <T en="Region" bm="Kawasan" />
                  </th>
                  <th className="px-5 py-3.5 font-semibold text-right">
                    <T en="Avg Sale Price" bm="Harga Jual Purata" />
                  </th>
                  <th className="px-5 py-3.5 font-semibold text-right">
                    <T en="Avg Rent / mo" bm="Sewa Purata / bulan" />
                  </th>
                  <th className="px-5 py-3.5 font-semibold text-right rounded-tr-2xl">
                    <T en="Listings" bm="Penyenaraian" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {regionStats.map((r, i) => (
                  <tr
                    key={r.region}
                    className={`border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-[#f8fafc]'} hover:bg-blue-50/40 transition-colors`}
                  >
                    <td className="px-5 py-3.5 font-semibold text-[#1e3a5f]">{r.region}</td>
                    <td className="px-5 py-3.5 text-right text-gray-700">
                      {r.avgSale > 0 ? fmtRM(r.avgSale) : <span className="text-gray-400 text-xs">—</span>}
                    </td>
                    <td className="px-5 py-3.5 text-right text-gray-700">
                      {r.avgRent > 0 ? (
                        <span className="text-blue-700 font-medium">{fmtRM(r.avgRent)}</span>
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="inline-block bg-[#1e3a5f]/10 text-[#1e3a5f] font-bold text-xs px-2 py-0.5 rounded-full">
                        {r.count.toLocaleString('en-MY')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Property type breakdown ──────────────────────────────────────────── */}
        <section>
          <SectionHeader
            title={<T en="Property Type Breakdown" bm="Pecahan Jenis Hartanah" />}
            desc={<T en="Top 6 categories by listing count" bm="6 kategori teratas mengikut jumlah penyenaraian" />}
          />
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            {categoryStats.map((c, i) => {
              const barPct = Math.round((c.count / maxCatCount) * 100);
              const colors = [
                '#1e3a5f', '#d4a017', '#3b82f6', '#22c55e', '#a855f7', '#f97316',
              ];
              const color = colors[i % colors.length];
              return (
                <div key={c.category} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-[#1e3a5f]">{c.category}</span>
                    <span className="text-gray-500">
                      {c.count.toLocaleString('en-MY')}&nbsp;
                      <span className="font-bold" style={{ color }}>{c.pct}%</span>
                    </span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${barPct}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Auction savings banner ───────────────────────────────────────────── */}
        <section>
          <div className="bg-gradient-to-r from-[#0f2540] to-[#1e3a5f] rounded-2xl p-8 text-white flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1">
              <p className="text-[#d4a017] font-semibold text-sm mb-2 uppercase tracking-widest">
                <T en="Auction Opportunity" bm="Peluang Lelongan" />
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
                <T
                  en={`Save an average of ${avgSavingsPct}% below market value`}
                  bm={`Jimat purata ${avgSavingsPct}% di bawah nilai pasaran`}
                />
              </h2>
              <p className="text-[#94b3cc]">
                <T
                  en={`Based on ${auctionListings.length.toLocaleString('en-MY')} active auction listings across Malaysia.`}
                  bm={`Berdasarkan ${auctionListings.length.toLocaleString('en-MY')} penyenaraian lelongan aktif di seluruh Malaysia.`}
                />
              </p>
            </div>
            <div className="shrink-0 text-center">
              <div className="w-28 h-28 rounded-full border-4 border-[#d4a017] flex flex-col items-center justify-center bg-[#d4a017]/10">
                <span className="text-[#d4a017] text-4xl font-black leading-none">{avgSavingsPct}%</span>
                <span className="text-[#94b3cc] text-xs mt-0.5">
                  <T en="avg. saving" bm="penjimatan" />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA links ────────────────────────────────────────────────────────── */}
        <section>
          <SectionHeader
            title={<T en="Explore Listings" bm="Jelajahi Penyenaraian" />}
            desc={<T en="Jump straight into the market segment you need" bm="Terus ke segmen pasaran yang anda perlukan" />}
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CtaCard
              href="/subsale"
              icon="🏠"
              label={<T en="Browse for Sale" bm="Semak Jualan" />}
              desc={<T en="Subsale & new launches" bm="Subsale & pelancaran baharu" />}
              accent="#1e3a5f"
            />
            <CtaCard
              href="/rent"
              icon="🔑"
              label={<T en="Browse Rentals" bm="Semak Sewaan" />}
              desc={<T en="Apartments, houses & rooms" bm="Apartmen, rumah & bilik" />}
              accent="#3b82f6"
            />
            <CtaCard
              href="/auction"
              icon="⚖️"
              label={<T en="Auction Listings" bm="Senarai Lelongan" />}
              desc={<T en="Bank & court auctions" bm="Lelongan bank & mahkamah" />}
              accent="#d4a017"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

/* ─── sub-components ────────────────────────────────────────────────────────── */

function StatCard({
  label,
  value,
  sub,
  icon,
  accent,
}: {
  label: React.ReactNode;
  value: string;
  sub: React.ReactNode;
  icon: string;
  accent: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
        style={{ backgroundColor: `${accent}18` }}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</p>
        <p className="text-2xl font-extrabold text-[#0f2540]">{value}</p>
        <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

function SectionHeader({ title, desc }: { title: React.ReactNode; desc: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-extrabold text-[#0f2540]">{title}</h2>
      <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
    </div>
  );
}

function CtaCard({
  href,
  icon,
  label,
  desc,
  accent,
}: {
  href: string;
  icon: string;
  label: React.ReactNode;
  desc: React.ReactNode;
  accent: string;
}) {
  return (
    <Link
      href={href}
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-start gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
    >
      <div
        className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
        style={{ backgroundColor: `${accent}18` }}
      >
        {icon}
      </div>
      <div>
        <p className="font-bold text-[#0f2540] group-hover:text-[#1e3a5f]">{label}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
      <svg
        className="ml-auto w-4 h-4 text-gray-300 group-hover:text-[#d4a017] transition-colors mt-1 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
