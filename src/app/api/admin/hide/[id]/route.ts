import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase';

function auth(req: NextRequest): boolean {
  const clean = (s: string | null) => (s ?? '').replace(/[^\x20-\x7e]/g, '').trim();
  const adminKey = clean(process.env.ADMIN_KEY ?? null);
  const k = clean(req.nextUrl.searchParams.get('k'));
  return !!(adminKey && k === adminKey);
}

// Hide a static-JSON listing by inserting a 'Hidden' marker row
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const sb = createAdminSupabase();
  const { error } = await sb.from('admin_listings').upsert({
    id,
    source: 'Hidden',
    title: '',
    listing_type: 'sale',
    price: 0,
    category: '',
    property_type: '',
    location: '',
    subarea: '',
    region: '',
    description: '',
    phone: '',
    tenure: '',
    photos: [],
    image_count: 0,
    thumbnail_url: '',
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

// Restore a hidden listing by deleting the marker row
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const sb = createAdminSupabase();
  const { error } = await sb.from('admin_listings').delete().eq('id', id).eq('source', 'Hidden');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
