import type { Metadata } from 'next';
import ListingBrowser, { BrowseParams } from '@/components/ListingBrowser';
import { saleListings } from '@/lib/listings';

export const metadata: Metadata = {
  title: 'Subsale Properties in Malaysia',
  description:
    'Browse thousands of subsale properties for sale across Malaysia — KL and Selangor. Direct from private owners. Filter by price, location, and property type.',
};

export default async function SubsalePage({
  searchParams,
}: {
  searchParams: Promise<BrowseParams>;
}) {
  const params = await searchParams;
  return (
    <ListingBrowser
      listings={saleListings}
      basePath="/subsale"
      title="Subsale Properties in Malaysia"
      subtitle={`${saleListings.length.toLocaleString('en-MY')} verified listings direct from private owners — no agent fees`}
      params={params}
    />
  );
}
