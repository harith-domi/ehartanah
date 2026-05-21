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

// New types for eHartanah MVP
export interface SubsaleProperty {
  id: string;
  title: string;
  price: number;
  pricePerSqft: number;
  area: string;
  state: string;
  type: 'condo' | 'house' | 'apartment' | 'bungalow' | 'townhouse';
  bedrooms: number;
  bathrooms: number;
  carparks: number;
  size: number;
  imageUrl: string;
  tenure: 'Freehold' | 'Leasehold';
  furnishing: 'Fully Furnished' | 'Partially Furnished' | 'Unfurnished';
  rentalYield: number;
  isNew: boolean;
  isFeatured: boolean;
  agentName: string;
  agentPhone: string;
  description: string;
  tags: string[];
}

export interface AuctionProperty {
  id: string;
  title: string;
  reservePrice: number;
  marketValue: number;
  discount: number;
  auctionDate: string;
  location: string;
  state: string;
  type: string;
  size: number;
  imageUrl: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  aiScore: number;
  badges: string[];
  auctionHouse: string;
  description: string;
}

export interface RentToOwnProperty {
  id: string;
  title: string;
  monthlyRent: number;
  optionPrice: number;
  purchasePeriod: number;
  rentCredit: number;
  upfrontDeposit: number;
  location: string;
  state: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  imageUrl: string;
  description: string;
  aiSuitabilityScore: number;
}
