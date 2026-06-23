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
  const adminKey = process.env.ADMIN_KEY?.trim();
  const sb = createAdminSupabase();
  const formData = await req.formData();
  const authKey = (formData.get('_adminKey') as string | null)?.trim();
  if (!adminKey || authKey !== adminKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const title = formData.get('title') as string;
  const listingType = formData.get('listing_type') as string;
  const region = formData.get('region') as string;
  const price = formData.get('price') ? Number(formData.get('price')) : null;

  // Generate unique slug ID
  const baseId = slugify(`${title}-${region}`);
  const { data: existing } = await sb.from('admin_listings').select('id').like('id', `${baseId}%`);
  const id = existing && existing.length > 0 ? `${baseId}-${existing.length + 1}` : baseId;

  // Upload images to Supabase Storage
  const photos: string[] = [];
  const files = formData.getAll('photos') as File[];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file || file.size === 0) continue;
    const ext = file.name.split('.').pop() ?? 'jpg';
    const path = `${id}/photo-${i + 1}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const { error } = await sb.storage.from('listing-photos').upload(path, buffer, {
      contentType: file.type,
      upsert: true,
    });
    if (!error) {
      const { data } = sb.storage.from('listing-photos').getPublicUrl(path);
      photos.push(data.publicUrl);
    }
  }

  const now = new Date().toISOString().replace('T', ' ').slice(0, 19);

  const listing = {
    id,
    title,
    listing_type: listingType,
    price,
    category: formData.get('category') as string,
    property_type: formData.get('category') as string,
    size: formData.get('size') ? Number(formData.get('size')) : null,
    size_unit: 'sq.ft.',
    bedrooms: formData.get('bedrooms') ? Number(formData.get('bedrooms')) : null,
    bathrooms: formData.get('bathrooms') ? Number(formData.get('bathrooms')) : null,
    location: formData.get('location') as string,
    subarea: formData.get('subarea') as string,
    region,
    description: formData.get('description') as string,
    phone: formData.get('phone') as string,
    tenure: formData.get('tenure') as string,
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
