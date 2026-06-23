import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const clean = (s: string | null) => (s ?? '').replace(/[^\x20-\x7e]/g, '').trim();
  const adminKey = clean(process.env.ADMIN_KEY ?? null);
  const k = clean(req.nextUrl.searchParams.get('k'));

  if (!adminKey || k !== adminKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const folder = clean(req.nextUrl.searchParams.get('folder')) || `tmp-${Date.now()}`;
  const idx = parseInt(req.nextUrl.searchParams.get('idx') ?? '0', 10);
  const contentType = req.headers.get('content-type') || 'image/jpeg';
  const ext = contentType.split('/')[1]?.split(';')[0]?.replace(/[^a-z0-9]/g, '') || 'jpg';

  const buffer = Buffer.from(await req.arrayBuffer());
  if (buffer.length === 0) {
    return NextResponse.json({ error: 'Empty file' }, { status: 400 });
  }

  const path = `${folder}/photo-${idx + 1}.${ext}`;
  const sb = createAdminSupabase();
  const { error } = await sb.storage.from('listing-photos').upload(path, buffer, {
    contentType,
    upsert: true,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data } = sb.storage.from('listing-photos').getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
