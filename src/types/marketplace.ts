export type VRCategory = 
  | 'concerts' 
  | 'sports' 
  | 'gaming' 
  | 'education' 
  | 'travel' 
  | 'art' 
  | 'fitness' 
  | 'social' 
  | 'business';

export type TicketType = 'standard' | 'premium' | 'vip' | 'backstage';

export type EventStatus = 'upcoming' | 'live' | 'ended' | 'cancelled';

export interface VRExperience {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: VRCategory;
  
  // Media
  images: string[];
  previewVideo?: string;
  vrPreviewUrl?: string; // 360° preview
  
  // Event details
  date: Date;
  duration: number; // in minutes
  venue: {
    name: string;
    location: string;
    capacity: number;
    vrWorldId: string;
  };
  
  // Pricing
  pricing: {
    [key in TicketType]?: {
      price: number;
      currency: 'ETH' | 'USDC' | 'USD';
      available: number;
      sold: number;
      features: string[];
    };
  };
  
  // Metadata
  creator: {
    name: string;
    verified: boolean;
    avatar?: string;
    address: string;
  };
  
  // Reviews & Ratings
  rating: {
    average: number;
    count: number;
    distribution: {
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
    };
  };
  
  // Technical requirements
  requirements: {
    vr: boolean;
    ar: boolean;
    mobile: boolean;
    desktop: boolean;
    minBandwidth: string;
  };
  
  // Social features
  social: {
    likes: number;
    shares: number;
    comments: number;
    views: number;
  };
  
  // Tags & SEO
  tags: string[];
  featured: boolean;
  trending: boolean;
  status: EventStatus;
  
  // NFT & Blockchain
  nft: {
    contractAddress?: string;
    tokenId?: string;
    blockchain: 'base' | 'ethereum' | 'polygon';
    royalties: number; // percentage
  };
  
  createdAt: Date;
  updatedAt: Date;
}

export interface MarketplaceFilters {
  category?: VRCategory[];
  priceRange?: {
    min: number;
    max: number;
    currency: 'ETH' | 'USDC' | 'USD';
  };
  dateRange?: {
    start: Date;
    end: Date;
  };
  rating?: number; // minimum rating
  requirements?: {
    vr?: boolean;
    ar?: boolean;
    mobile?: boolean;
    desktop?: boolean;
  };
  status?: EventStatus[];
  featured?: boolean;
  trending?: boolean;
}

export interface MarketplaceSort {
  field: 'date' | 'price' | 'rating' | 'popularity' | 'newest';
  direction: 'asc' | 'desc';
}

export interface SearchResult {
  experiences: VRExperience[];
  total: number;
  page: number;
  hasMore: boolean;
  filters: MarketplaceFilters;
  sort: MarketplaceSort;
}

export interface WishlistItem {
  id: string;
  experienceId: string;
  userId: string;
  addedAt: Date;
}

export interface CartItem {
  id: string;
  experienceId: string;
  ticketType: TicketType;
  quantity: number;
  price: number;
  currency: 'ETH' | 'USDC' | 'USD';
  addedAt: Date;
}

export interface Review {
  id: string;
  experienceId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1-5
  title: string;
  content: string;
  images?: string[];
  helpful: number;
  verified: boolean; // user attended the event
  createdAt: Date;
  updatedAt: Date;
} 