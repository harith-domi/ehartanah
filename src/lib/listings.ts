import saleData from './data/sale-listings.json';
import rentData from './data/rent-listings.json';
import ownData from './data/own-listings.json';

export interface Listing {
  id: string;
  title: string;
  listingType: 'sale' | 'rent';
  price: number | null;
  category: string;
  propertyType: string;
  size: number | null;
  sizeUnit: string;
  bedrooms: number | null;
  bathrooms: number | null;
  subarea: string;
  region: string;
  location: string;
  advertiser: string;
  phone: string;
  imageCount: number;
  thumbnailUrl?: string;
  photos?: string[];
  description?: string;
  postedAt: string;
  url: string;
  featured?: boolean;
}

export const ownListings = ownData as Listing[];
export const ownSaleListings = ownListings.filter((l) => l.listingType === 'sale');
export const ownRentListings = ownListings.filter((l) => l.listingType === 'rent');

export const saleListings: Listing[] = [...ownSaleListings, ...(saleData as Listing[])];
export const rentListings: Listing[] = [...ownRentListings, ...(rentData as Listing[])];

export const allListings: Listing[] = [...saleListings, ...rentListings];
export const totalListings = allListings.length;

export function getListing(id: string): Listing | undefined {
  return saleListings.find((l) => l.id === id) ?? rentListings.find((l) => l.id === id);
}

export function uniqueRegions(listings: Listing[]): string[] {
  return [...new Set(listings.map((l) => l.region).filter(Boolean))].sort();
}

export function uniqueCategories(listings: Listing[]): string[] {
  return [...new Set(listings.map((l) => l.category).filter(Boolean))].sort();
}

// Owner-entered sizes on Mudah are sometimes typos (e.g. a "999,999 sq.ft." room).
// Treat implausible values as unknown rather than displaying them.
export function plausibleSize(l: Listing): number | null {
  if (!l.size) return null;
  if (l.sizeUnit === 'sq.ft.') {
    if (l.category === 'Room' && l.size > 2000) return null;
    if (l.category !== 'Land' && l.size > 50000) return null;
    // No habitable unit for sale is under 200 sq.ft. — typo like "22" for a 22x70 lot
    if (l.listingType === 'sale' && l.size < 200) return null;
    // Even the smallest rentable room exceeds 50 sq.ft.
    if (l.listingType === 'rent' && l.size < 50) return null;
  }
  return l.size;
}

export function pricePerSqft(l: Listing): number | null {
  const size = plausibleSize(l);
  if (l.price === null || size === null) return null;
  if (l.sizeUnit !== 'sq.ft.') return null;
  return Math.round(l.price / size);
}

export interface ListingFilters {
  q?: string;
  region?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  sort?: string;
  privateOnly?: boolean;
}

export function filterListings(listings: Listing[], f: ListingFilters): Listing[] {
  let out = listings;
  if (f.q) {
    const q = f.q.toLowerCase();
    out = out.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q) ||
        l.subarea.toLowerCase().includes(q)
    );
  }
  if (f.region && f.region !== 'All') out = out.filter((l) => l.region === f.region);
  if (f.category && f.category !== 'All') out = out.filter((l) => l.category === f.category);
  if (f.minPrice) out = out.filter((l) => l.price !== null && l.price >= (f.minPrice as number));
  if (f.maxPrice) out = out.filter((l) => l.price !== null && l.price <= (f.maxPrice as number));
  if (f.beds) out = out.filter((l) => l.bedrooms !== null && l.bedrooms >= f.beds!);
  if (f.privateOnly) out = out.filter((l) => !l.featured);

  if (f.sort === 'price-asc') out = [...out].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
  else if (f.sort === 'price-desc') out = [...out].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
  else if (f.sort === 'size-desc') out = [...out].sort((a, b) => (b.size ?? 0) - (a.size ?? 0));
  else if (f.sort === 'psf-asc') out = [...out].sort((a, b) => (pricePerSqft(a) ?? Infinity) - (pricePerSqft(b) ?? Infinity));
  else if (f.sort === 'psf-desc') out = [...out].sort((a, b) => (pricePerSqft(b) ?? 0) - (pricePerSqft(a) ?? 0));
  else
    out = [...out].sort(
      (a, b) =>
        (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.postedAt.localeCompare(a.postedAt)
    );

  return out;
}

export const PER_PAGE = 24;

export function paginate<T>(items: T[], page: number, perPage = PER_PAGE) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  return {
    items: items.slice((current - 1) * perPage, current * perPage),
    page: current,
    totalPages,
    total: items.length,
  };
}

export function formatPrice(price: number | null, listingType: 'sale' | 'rent'): string {
  if (price === null) return 'Price on request';
  const formatted = `RM ${price.toLocaleString('en-MY')}`;
  return listingType === 'rent' ? `${formatted}/mo` : formatted;
}

export function formatSize(l: Listing): string {
  const size = plausibleSize(l);
  if (size === null) return '';
  return `${size.toLocaleString('en-MY')} ${l.sizeUnit}`;
}

// For Room rentals, Mudah's bed/bath counts describe the whole unit, not the
// room being rented — showing "4 beds" on a 100 sq.ft. room listing misleads.
// Some room ads are miscategorized as Apartment/Condo, so also detect by title
// and by the contradiction of a room-sized space claiming multiple bedrooms.
export function isRoomRental(l: Listing): boolean {
  if (l.listingType !== 'rent') return false;
  if (l.category === 'Room') return true;
  if (/\broom\b|\bbilik\b/i.test(l.title)) return true;
  if (l.size !== null && l.size > 0 && l.size < 250 && l.sizeUnit === 'sq.ft.' && (l.bedrooms ?? 0) >= 2) return true;
  return false;
}

export function displayBedrooms(l: Listing): number | null {
  if (isRoomRental(l)) return null;
  return l.bedrooms || null;
}

export function displayBathrooms(l: Listing): number | null {
  if (isRoomRental(l)) return null;
  return l.bathrooms || null;
}

export function formatPostedDate(postedAt: string): string {
  if (!postedAt) return '';
  const d = new Date(postedAt.replace(' ', 'T'));
  if (isNaN(d.getTime())) {
    console.warn(`[eHartanah] Invalid date format: "${postedAt}"`);
    return '';
  }
  return d.toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' });
}

export const AGENCY_PHONE = '60149999309';
export const AGENCY_WA = `https://wa.me/${AGENCY_PHONE}`;

export function whatsappLink(phone: string): string | null {
  const digits = phone.replace(/\D/g, '');
  if (!digits) return null;
  const intl = digits.startsWith('0') ? `6${digits}` : digits;
  return `https://wa.me/${intl}`;
}
