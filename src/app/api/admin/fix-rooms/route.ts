import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase';

function defaultRooms(category: string): { bedrooms: number; bathrooms: number } {
  const c = (category ?? '').toLowerCase();
  if (c.includes('semi')) return { bedrooms: 4, bathrooms: 3 };
  if (c.includes('bungalow')) return { bedrooms: 4, bathrooms: 3 };
  if (c.includes('terrace') || c.includes('link')) return { bedrooms: 3, bathrooms: 2 };
  return { bedrooms: 3, bathrooms: 2 }; // apartment / condo / flat / soho / studio
}

export async function POST(req: NextRequest) {
  const clean = (s: string | null) => (s ?? '').replace(/[^\x20-\x7e]/g, '').trim();
  const adminKey = clean(process.env.ADMIN_KEY ?? null);
  const k = clean(req.nextUrl.searchParams.get('k'));
  if (!adminKey || k !== adminKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const sb = createAdminSupabase();
  const { data, error } = await sb.from('admin_listings').select('id,category,bedrooms,bathrooms').is('bedrooms', null);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  let updated = 0;
  for (const row of data ?? []) {
    const { bedrooms, bathrooms } = defaultRooms(row.category ?? '');
    const patch: Record<string, number> = { bedrooms };
    if (row.bathrooms == null) patch.bathrooms = bathrooms;
    await sb.from('admin_listings').update(patch).eq('id', row.id);
    updated++;
  }

  return NextResponse.json({ updated });
}
