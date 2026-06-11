import type { Metadata } from 'next';
import ListingBrowser, { BrowseParams } from '@/components/ListingBrowser';
import { saleListings } from '@/lib/listings';

export const metadata: Metadata = {
  title: 'Properties for Sale in Malaysia',
  description:
    'Browse verified property listings for sale in Malaysia. Compare prices and contact owners directly on eHartanah.',
};

export default async function BuyPage({
  searchParams,
}: {
  searchParams: Promise<BrowseParams>;
}) {
  const params = await searchParams;
  return (
    <ListingBrowser
      listings={saleListings}
      basePath="/buy"
      title="Properties for Sale in Malaysia"
      subtitle={`${saleListings.length.toLocaleString('en-MY')} verified listings direct from private owners`}
      params={params}
    />
  );
}
