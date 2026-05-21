import { MetadataRoute } from 'next';
import { subsaleProperties } from '@/lib/data/subsale';
import { auctionProperties } from '@/lib/data/auction';
import { rentToOwnProperties } from '@/lib/data/rentToOwn';

const BASE_URL = 'https://property-website-rose.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/ai-search`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.95 },
    { url: `${BASE_URL}/subsale`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/auction`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/rent-to-own`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/investment-insights`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];

  const subsalePages: MetadataRoute.Sitemap = subsaleProperties.map((p) => ({
    url: `${BASE_URL}/subsale/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  const auctionPages: MetadataRoute.Sitemap = auctionProperties.map((p) => ({
    url: `${BASE_URL}/auction/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  const rtoPages: MetadataRoute.Sitemap = rentToOwnProperties.map((p) => ({
    url: `${BASE_URL}/rent-to-own/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  return [...staticPages, ...subsalePages, ...auctionPages, ...rtoPages];
}
