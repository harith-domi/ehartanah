import HomeClient from '@/components/HomeClient';
import { saleListings, rentListings, ownRentListings, ownSaleListings } from '@/lib/listings';

const FEATURED_COUNT = 3;
const NEW_LISTINGS_COUNT = 6;

const featured = saleListings.slice(0, FEATURED_COUNT);
const featuredRentals = rentListings.slice(0, FEATURED_COUNT);

// Latest agency listings sorted by most recently posted
const newAgencyListings = [...ownRentListings, ...ownSaleListings]
  .sort((a, b) => b.postedAt.localeCompare(a.postedAt))
  .slice(0, NEW_LISTINGS_COUNT);

export default function HomePage() {
  return (
    <HomeClient
      featured={featured}
      featuredRentals={featuredRentals}
      newAgencyListings={newAgencyListings}
      saleCount={saleListings.length}
    />
  );
}
