import saleData from './data/sale-listings.json';
import rentData from './data/rent-listings.json';

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
  postedAt: string;
  url: string;
}

export const saleListings = saleData as Listing[];
export const rentListings = rentData as Listing[];

export const totalListings = saleListings.length + rentListings.length;

export function getListing(id: string): Listing | undefined {
  return saleListings.find((l) => l.id === id) ?? rentListings.find((l) => l.id === id);
}

export function uniqueRegions(listings: Listing[]): string[] {
  return [...new Set(listings.map((l) => l.region).filter(Boolean))].sort();
}

export function uniqueCategories(listings: Listing[]): string[] {
  return [...new Set(listings.map((l) => l.category).filter(Boolean))].sort();
}

export interface ListingFilters {
  q?: string;
  region?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  sort?: string;
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
  if (f.minPrice) out = out.filter((l) => l.price !== null && l.price >= f.minPrice!);
  if (f.maxPrice) out = out.filter((l) => l.price !== null && l.price <= f.maxPrice!);
  if (f.beds) out = out.filter((l) => l.bedrooms !== null && l.bedrooms >= f.beds!);

  if (f.sort === 'price-asc') out = [...out].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
  else if (f.sort === 'price-desc') out = [...out].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
  else if (f.sort === 'size-desc') out = [...out].sort((a, b) => (b.size ?? 0) - (a.size ?? 0));
  else out = [...out].sort((a, b) => b.postedAt.localeCompare(a.postedAt));

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
  if (l.size === null) return '';
  const n = Number.isInteger(l.size) ? l.size.toLocaleString('en-MY') : l.size.toLocaleString('en-MY');
  return `${n} ${l.sizeUnit}`;
}

export function formatPostedDate(postedAt: string): string {
  if (!postedAt) return '';
  const d = new Date(postedAt.replace(' ', 'T'));
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function whatsappLink(phone: string): string | null {
  const digits = phone.replace(/\D/g, '');
  if (!digits) return null;
  const intl = digits.startsWith('0') ? `6${digits}` : digits;
  return `https://wa.me/${intl}`;
}
