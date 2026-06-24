import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const clean = (s: string | null) => (s ?? '').replace(/[^\x20-\x7e]/g, '').trim();
  const adminKey = clean(process.env.ADMIN_KEY ?? null);
  const k = clean(req.nextUrl.searchParams.get('k'));

  if (!adminKey || k !== adminKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json() as Record<string, unknown>;
  const photos = Array.isArray(body.photos) ? (body.photos as string[]) : [];
  const num = (v: unknown) => (v !== '' && v != null ? Number(v) : null);

  const update = {
    title: String(body.title ?? ''),
    listing_type: String(body.listing_type ?? ''),
    price: num(body.price),
    category: String(body.category ?? ''),
    property_type: String(body.category ?? ''),
    size: num(body.size),
    bedrooms: num(body.bedrooms),
    bathrooms: num(body.bathrooms),
    location: String(body.location ?? ''),
    subarea: String(body.subarea ?? ''),
    region: String(body.region ?? ''),
    description: String(body.description ?? ''),
    phone: String(body.phone ?? ''),
    tenure: String(body.tenure ?? ''),
    source: String(body.source ?? 'New'),
    photos,
    image_count: photos.length,
    thumbnail_url: photos[0] ?? '',
    updated_at: new Date().toISOString(),
  };

  const sb = createAdminSupabase();
  const { error } = await sb.from('admin_listings').upsert({ id, ...update }).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ id, success: true });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const clean = (s: string | null) => (s ?? '').replace(/[^\x20-\x7e]/g, '').trim();
  const adminKey = clean(process.env.ADMIN_KEY ?? null);
  const k = clean(req.nextUrl.searchParams.get('k'));
  if (!adminKey || k !== adminKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json() as Record<string, unknown>;
  const updates: Record<string, unknown> = {};

  if ('source' in body) {
    const source = String(body.source ?? '');
    if (!['New', 'Agency', 'Sale', 'Rent', 'Auction', 'Hidden'].includes(source))
      return NextResponse.json({ error: 'Invalid source' }, { status: 400 });
    updates.source = source;
  }

  if ('price' in body) {
    const price = Number(body.price);
    if (!price || price <= 0) return NextResponse.json({ error: 'Invalid price' }, { status: 400 });
    updates.price = price;
  }

  if (Object.keys(updates).length === 0)
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });

  const sb = createAdminSupabase();
  const { error } = await sb.from('admin_listings').update(updates).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const clean = (s: string | null) => (s ?? '').replace(/[^\x20-\x7e]/g, '').trim();
  const adminKey = clean(process.env.ADMIN_KEY ?? null);
  const k = clean(req.nextUrl.searchParams.get('k'));

  if (!adminKey || k !== adminKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sb = createAdminSupabase();
  const { error } = await sb.from('admin_listings').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
