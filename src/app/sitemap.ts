import { MetadataRoute } from 'next';
import { saleListings, rentListings, auctionListings } from '@/lib/listings';
import { guides } from '@/lib/guides';

const BASE_URL = 'https://ehartanahmalaysia.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/subsale`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/rent`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/auction`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/browse`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/rent-to-own`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/guides`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/investment-insights`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const listingRoutes: MetadataRoute.Sitemap = [...saleListings, ...rentListings].map((l) => ({
    url: `${BASE_URL}/listings/${l.id}`,
    lastModified: l.postedAt ? new Date(l.postedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const auctionRoutes: MetadataRoute.Sitemap = auctionListings.map((l) => ({
    url: `${BASE_URL}/auction/${l.id}`,
    lastModified: l.postedAt ? new Date(l.postedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${BASE_URL}/guides/${g.slug}`,
    lastModified: new Date(g.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...listingRoutes, ...auctionRoutes, ...guideRoutes];
}
