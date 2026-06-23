import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = url && key ? createClient(url, key) : null;

// Server-side admin client — bypasses RLS, server only
export function createAdminSupabase() {
  return createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY ?? key);
}

export type AdminListing = {
  id: string;
  title: string;
  listing_type: 'sale' | 'rent';
  price: number | null;
  category: string;
  property_type: string;
  size: number | null;
  size_unit: string;
  bedrooms: number | null;
  bathrooms: number | null;
  location: string;
  subarea: string;
  region: string;
  description: string;
  phone: string;
  tenure: string;
  photos: string[];
  image_count: number;
  thumbnail_url: string;
  featured: boolean;
  posted_at: string;
};
