import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { auctionProperties } from '@/lib/data/auction';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = auctionProperties.find((p) => p.id === id);
  if (!property) return { title: 'Auction Not Found' };
  return {
    title: `${property.title} — Auction`,
    description: property.description.slice(0, 155),
  };
}

export function generateStaticParams() {
  return auctionProperties.map((p) => ({ id: p.id }));
}

function formatPrice(price: number) {
  if (price >= 1000000) return `RM${(price / 1000000).toFixed(2)}M`;
  return `RM${(price / 1000).toFixed(0)}k`;
}

function getDaysRemaining(auctionDate: string) {
  const now = new Date();
  const auction = new Date(auctionDate);
  return Math.ceil((auction.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

const riskColors: Record<string, string> = {
  Low: 'bg-green-100 text-green-800',
  Medium: 'bg-amber-100 text-amber-800',
  High: 'bg-red-100 text-red-800',
};

export default async function AuctionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = auctionProperties.find((p) => p.id === id);
  if (!property) notFound();

  const daysLeft = getDaysRemaining(property.auctionDate);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-sm text-gray-500 flex gap-2">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <Link href="/auction" className="hover:text-emerald-700">Auction</Link>
          <span>/</span>
          <span className="text-gray-800 truncate">{property.title}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden">
              <Image src={property.imageUrl} alt={property.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`text-xs font-bold px-2 py-1 rounded-md ${riskColors[property.riskLevel]}`}>{property.riskLevel} Risk</span>
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold px-2 py-1 rounded-md">AI {property.aiScore}/10</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {property.location}
              </div>

              <div className="flex flex-wrap items-baseline gap-4 mb-5">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Reserve Price</p>
                  <p className="text-3xl font-bold text-red-600">{formatPrice(property.reservePrice)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Market Value</p>
                  <p className="text-xl font-semibold text-gray-400 line-through">{formatPrice(property.marketValue)}</p>
                </div>
                <span className="bg-green-100 text-green-800 font-bold px-3 py-1.5 rounded-full text-sm">Save {property.discount}%</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {property.badges.map((badge) => (
                  <span key={badge} className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium px-3 py-1 rounded-full">{badge}</span>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 rounded-xl p-4 mb-5">
                <div className="text-center">
                  <p className="font-bold text-gray-900">{property.auctionHouse}</p>
                  <p className="text-xs text-gray-500">Auction House</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900">{new Date(property.auctionDate).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  <p className="text-xs text-gray-500">Auction Date</p>
                </div>
                <div className="text-center">
                  <p className={`font-bold ${daysLeft > 0 ? 'text-red-600' : 'text-gray-400'}`}>{daysLeft > 0 ? `${daysLeft} days` : 'Ended'}</p>
                  <p className="text-xs text-gray-500">Time Remaining</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900">{property.size.toLocaleString()} sqft</p>
                  <p className="text-xs text-gray-500">Size</p>
                </div>
              </div>

              <h3 className="font-bold text-gray-900 mb-2">About This Auction</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{property.description}</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 mb-3">Register to Bid</h3>
              <p className="text-gray-600 text-sm mb-4">Contact the auction house directly to register as a bidder. You&apos;ll need a bank draft of 10% of reserve price.</p>
              <a href="https://wa.me/60123456789" target="_blank" rel="noopener noreferrer" className="block text-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm mb-3">
                Get Bidding Guidance
              </a>
            </div>

            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-5 text-white text-center">
              <p className="font-bold mb-2 text-sm">AI Risk Assessment</p>
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold">{property.aiScore}</span>
              </div>
              <p className="text-emerald-100 text-xs mb-4">AI Score out of 10. Ask our AI for a full risk breakdown.</p>
              <Link href="/ai-search" className="block bg-white text-emerald-700 font-semibold text-sm py-2.5 rounded-xl hover:bg-emerald-50 transition-colors">
                Full AI Analysis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
