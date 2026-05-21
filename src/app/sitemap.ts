import { MetadataRoute } from 'next';
import { properties } from '@/lib/properties';

const BASE_URL = 'https://property-website-rose.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/buy`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/rent`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  const listingPages: MetadataRoute.Sitemap = properties.map(p => ({
    url: `${BASE_URL}/listings/${p.id}`,
    lastModified: new Date(p.postedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...listingPages];
}
