export interface Agent {
  name: string;
  agency: string;
  phone: string;
  avatar: string;
  licenseNo: string;
}

export interface Property {
  id: string;
  title: string;
  price: number;
  pricePerSqft?: number;
  address: string;
  area: string;
  state: string;
  type: 'condo' | 'apartment' | 'house' | 'townhouse' | 'bungalow' | 'shophouse' | 'office' | 'retail' | 'land';
  listingType: 'sale' | 'rent';
  bedrooms?: number;
  bathrooms?: number;
  carparks?: number;
  size: number;
  imageUrl: string;
  images: string[];
  agent: Agent;
  features: string[];
  description: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isVerified?: boolean;
  postedAt: string;
  tenure?: 'Freehold' | 'Leasehold';
  furnishing?: 'Fully Furnished' | 'Partially Furnished' | 'Unfurnished';
  floorLevel?: string;
  builtYear?: number;
}

export type ListingType = 'sale' | 'rent';
export type PropertyType = Property['type'];
export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'size-asc' | 'size-desc';
