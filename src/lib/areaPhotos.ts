import { Listing, saleListings, rentListings, ownListings } from './listings';

/**
 * For listings without photos, find a representative photo from another
 * listing of the same category in the same area. Shown with a clear
 * "similar property nearby" label — never passed off as the actual unit.
 *
 * Lookup is two-tier: exact (region + subarea + category), then broader
 * (region + category). Built once at module load.
 */

const exact = new Map<string, string>();   // region|subarea|category → photo
const broad = new Map<string, string>();   // region|category → photo

function index(listings: Listing[]) {
  for (const l of listings) {
    const photo = l.photos?.[0];
    if (!photo) continue;
    const exactKey = `${l.region}|${l.subarea}|${l.category}`;
    const broadKey = `${l.region}|${l.category}`;
    if (!exact.has(exactKey)) exact.set(exactKey, photo);
    if (!broad.has(broadKey)) broad.set(broadKey, photo);
  }
}

index(ownListings);
index(rentListings);
index(saleListings);

export function areaPhoto(l: Listing): string | null {
  if (l.photos?.length || l.thumbnailUrl) return null; // has its own photo
  return (
    exact.get(`${l.region}|${l.subarea}|${l.category}`) ??
    broad.get(`${l.region}|${l.category}`) ??
    null
  );
}
