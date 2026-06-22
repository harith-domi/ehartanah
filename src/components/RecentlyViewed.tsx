'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import T from '@/components/T';
import { addRecentlyViewed, getRecentlyViewed, type RecentEntry } from '@/lib/recentlyViewed';

interface Props {
  currentId: string;
  type: 'listing' | 'auction';
  title: string;
  price: number | null;
  photo?: string;
}

function formatPrice(price: number | null): string {
  if (price === null) return 'Price on request';
  if (price >= 1_000_000) return `RM ${(price / 1_000_000).toFixed(price % 1_000_000 === 0 ? 0 : 2)}M`;
  if (price >= 1_000) return `RM ${(price / 1_000).toFixed(0)}K`;
  return `RM ${price.toLocaleString('en-MY')}`;
}

export default function RecentlyViewed({ currentId, type, title, price, photo }: Props) {
  const [items, setItems] = useState<RecentEntry[]>([]);

  useEffect(() => {
    // Record current listing first, then read the list
    addRecentlyViewed({ type, id: currentId, title, price, photo });
    const all = getRecentlyViewed();
    // Exclude the current page; show remaining items
    setItems(all.filter((e) => e.id !== currentId));
  }, [currentId, type, title, price, photo]);

  // Don't render if fewer than 2 other items (nothing interesting to show)
  if (items.length < 2) return null;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-900 text-sm mb-4">
        <T en="Recently Viewed" bm="Baru Dilihat" />
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
        {items.map((item) => {
          const href = item.type === 'auction' ? `/auction/${item.id}` : `/listings/${item.id}`;
          return (
            <Link
              key={item.id}
              href={href}
              className="flex-shrink-0 w-36 group rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow bg-slate-50"
            >
              {/* Thumbnail */}
              <div className="relative h-24 bg-gradient-to-br from-[#0f2540] to-[#1e3a5f] overflow-hidden">
                {item.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.photo}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                )}
                {item.type === 'auction' && (
                  <span className="absolute top-1.5 left-1.5 bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    <T en="Auction" bm="Lelong" />
                  </span>
                )}
              </div>
              {/* Info */}
              <div className="p-2.5">
                <p className="text-[11px] font-semibold text-gray-900 line-clamp-2 leading-snug mb-1 group-hover:text-[#1e3a5f] transition-colors">
                  {item.title}
                </p>
                <p className="text-[11px] font-bold text-[#1e3a5f]">{formatPrice(item.price)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
