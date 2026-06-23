-- Run this in your Supabase SQL editor
-- Dashboard → SQL Editor → New query → paste → Run

create table if not exists admin_listings (
  id text primary key,
  title text not null,
  listing_type text not null,
  price numeric,
  category text,
  property_type text,
  size numeric,
  size_unit text default 'sq.ft.',
  bedrooms int,
  bathrooms int,
  location text,
  subarea text,
  region text,
  description text,
  phone text,
  tenure text,
  photos text[] default '{}',
  image_count int default 0,
  thumbnail_url text default '',
  featured boolean default true,
  posted_at text,
  created_at timestamp with time zone default now()
);

-- Allow public read (needed for listing detail page)
alter table admin_listings enable row level security;

create policy "Public read" on admin_listings
  for select using (true);

-- Storage bucket: create manually in Supabase Dashboard →
-- Storage → New bucket → Name: listing-photos → Public: ON
