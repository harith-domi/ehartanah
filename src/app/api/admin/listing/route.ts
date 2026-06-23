import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);
}

export async function POST(req: NextRequest) {
  const clean = (s: string | null) => (s ?? '').replace(/[^\x20-\x7e]/g, '').trim();
  const adminKey = clean(process.env.ADMIN_KEY ?? null);
  const k = clean(req.nextUrl.searchParams.get('k'));

  if (!adminKey || k !== adminKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json() as Record<string, unknown>;
  const title = String(body.title ?? '');
  const region = String(body.region ?? '');
  const photos = Array.isArray(body.photos) ? (body.photos as string[]) : [];

  const baseId = slugify(`${title}-${region}`);
  const sb = createAdminSupabase();
  const { data: existing } = await sb.from('admin_listings').select('id').like('id', `${baseId}%`);
  const id = existing && existing.length > 0 ? `${baseId}-${existing.length + 1}` : baseId;

  const now = new Date().toISOString().replace('T', ' ').slice(0, 19);
  const num = (v: unknown) => (v !== '' && v != null ? Number(v) : null);

  const listing = {
    id,
    title,
    listing_type: String(body.listing_type ?? ''),
    price: num(body.price),
    category: String(body.category ?? ''),
    property_type: String(body.category ?? ''),
    size: num(body.size),
    size_unit: 'sq.ft.',
    bedrooms: num(body.bedrooms),
    bathrooms: num(body.bathrooms),
    location: String(body.location ?? ''),
    subarea: String(body.subarea ?? ''),
    region,
    description: String(body.description ?? ''),
    phone: String(body.phone ?? ''),
    tenure: String(body.tenure ?? ''),
    photos,
    image_count: photos.length,
    thumbnail_url: photos[0] ?? '',
    featured: true,
    posted_at: now,
  };

  const { error } = await sb.from('admin_listings').insert(listing);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ id, success: true });
}
