import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase';
import rentData from '@/lib/data/rent-listings.json';

type RentListing = { category: string; region: string; subarea: string; location: string; title: string; price: number | null };

function median(prices: number[]): number {
  if (!prices.length) return 0;
  const sorted = [...prices].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

// Map admin categories to rent data categories
function rentCategory(category: string): string[] {
  const c = category.toLowerCase();
  if (c.includes('terrace') || c.includes('link') || c.includes('semi') || c.includes('bungalow') || c.includes('townhouse')) {
    return ['house', 'terrace / link house', 'semi-detached house', 'bungalow', 'townhouse'];
  }
  if (c.includes('apartment') || c.includes('condominium') || c.includes('flat') || c.includes('serviced')) {
    return ['apartment / condominium', 'serviced residence', 'flat', 'studio', 'duplex', 'penthouse'];
  }
  return [c];
}

function findRentPrice(subarea: string, region: string, category: string): { price: number; matches: number } | null {
  const rentListings = rentData as RentListing[];
  const subareaLower = subarea.toLowerCase();
  const regionLower = region.toLowerCase();
  const cats = rentCategory(category);
  const matchesCat = (r: RentListing) => cats.some(c => r.category?.toLowerCase().includes(c) || c.includes(r.category?.toLowerCase() ?? ''));

  // Try exact subarea match first
  let matches = rentListings.filter(r =>
    r.price != null && r.price > 0 &&
    r.subarea?.toLowerCase() === subareaLower &&
    matchesCat(r)
  ).map(r => r.price as number);

  // Broaden to partial subarea match
  if (matches.length < 3) {
    matches = rentListings.filter(r =>
      r.price != null && r.price > 0 &&
      r.region?.toLowerCase() === regionLower &&
      matchesCat(r) &&
      (r.subarea?.toLowerCase().includes(subareaLower) || subareaLower.includes(r.subarea?.toLowerCase() ?? ''))
    ).map(r => r.price as number);
  }

  // Broaden to same region + category
  if (matches.length < 3) {
    matches = rentListings.filter(r =>
      r.price != null && r.price > 0 &&
      r.region?.toLowerCase() === regionLower &&
      matchesCat(r)
    ).map(r => r.price as number);
  }

  if (!matches.length) return null;

  return { price: median(matches), matches: matches.length };
}

export async function POST(req: NextRequest) {
  const clean = (s: string | null) => (s ?? '').replace(/[^\x20-\x7e]/g, '').trim();
  const adminKey = clean(process.env.ADMIN_KEY ?? null);
  const k = clean(req.nextUrl.searchParams.get('k'));
  if (!adminKey || k !== adminKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const dryRun = req.nextUrl.searchParams.get('dry') === '1';

  const sb = createAdminSupabase();
  const { data, error } = await sb.from('admin_listings').select('id,title,subarea,region,category,price');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const results = [];

  for (const row of data ?? []) {
    const found = findRentPrice(row.subarea ?? '', row.region ?? '', row.category ?? '');
    if (!found) {
      results.push({ id: row.id, title: row.title, status: 'no_match', original: row.price });
      continue;
    }

    const discounted = Math.max(Math.round(found.price * 0.7), 700);

    if (!dryRun) {
      await sb.from('admin_listings').update({
        price: discounted,
        listing_type: 'rent',
      }).eq('id', row.id);
    }

    results.push({
      id: row.id,
      title: row.title,
      subarea: row.subarea,
      region: row.region,
      marketRent: found.price,
      matches: found.matches,
      discounted,
      original: row.price,
      status: dryRun ? 'dry_run' : 'updated',
    });
  }

  return NextResponse.json({ results, total: results.length });
}
