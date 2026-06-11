import type { Metadata } from 'next';
import ListingBrowser, { BrowseParams } from '@/components/ListingBrowser';
import { rentListings } from '@/lib/listings';

export const metadata: Metadata = {
  title: 'Properties for Rent in Malaysia',
  description:
    'Find rooms, apartments, condos, and houses for rent across Malaysia — KL and Selangor. Direct from private owners on eHartanah.',
};

export default async function RentPage({
  searchParams,
}: {
  searchParams: Promise<BrowseParams>;
}) {
  const params = await searchParams;
  return (
    <ListingBrowser
      listings={rentListings}
      basePath="/rent"
      title="Properties for Rent in Malaysia"
      subtitle={`${rentListings.length.toLocaleString('en-MY')} rental listings direct from private owners — rooms, apartments, and houses`}
      params={params}
    />
  );
}
