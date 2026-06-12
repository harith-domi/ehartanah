import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import ListingBrowser, { BrowseParams } from '@/components/ListingBrowser';
import { allListings } from '@/lib/listings';

export const metadata: Metadata = {
  title: 'Browse Properties in Malaysia — Rent & Subsale',
  description:
    'Browse 15,000+ rental and subsale properties across Malaysia. Filter by area, price, type, and bedrooms. Direct from private owners — no agent fees.',
};

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<BrowseParams & { type?: string }>;
}) {
  const params = await searchParams;
  return (
    <ListingBrowser
      listings={allListings}
      basePath="/browse"
      params={params}
      showTypeFilter
    />
  );
}
