// Mock Data for Envimerse Platform

export interface Event {
  id: string;
  title: string;
  description: string;
  venue: string;
  venueId: string;
  date: string;
  time: string;
  duration: number; // in minutes
  price: {
    fiat: number; // USD
    crypto: number; // in ETH
  };
  category: 'concert' | 'sports' | 'conference' | 'theater' | 'comedy' | 'festival';
  capacity: number;
  soldTickets: number;
  image: string;
  thumbnail: string;
  vrPreview?: string;
  isLive: boolean;
  isFeatured: boolean;
  tags: string[];
  reseller: Reseller;
  ratings: {
    average: number;
    count: number;
  };
  streamQuality: '4K' | '8K' | 'VR180' | 'VR360';
  equipmentUsed: string[];
}

export interface Reseller {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  rating: number;
  totalEvents: number;
  specialties: string[];
  description: string;
  socialLinks: {
    website?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface Venue {
  id: string;
  name: string;
  location: {
    city: string;
    country: string;
    address: string;
    coordinates: [number, number];
  };
  type: 'stadium' | 'arena' | 'club' | 'theater' | 'conference_center' | 'outdoor';
  capacity: number;
  description: string;
  images: string[];
  amenities: string[];
  vrSupport: boolean;
  streamingQuality: string[];
  partnerSince: string;
}

export interface User {
  id: string;
  address?: string;
  ens?: string;
  avatar?: string;
  name: string;
  email: string;
  role: 'client' | 'reseller' | 'venue_owner';
  createdAt: string;
  preferences: {
    categories: string[];
    notifications: boolean;
    currency: 'USD' | 'ETH' | 'USDC';
  };
  stats: {
    eventsAttended: number;
    totalSpent: number;
    favoriteCategory: string;
  };
}

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  purchaseDate: string;
  price: number;
  currency: 'USD' | 'ETH' | 'USDC';
  status: 'active' | 'used' | 'refunded' | 'transferred';
  nftTokenId?: string;
  accessCode: string;
  streamingUrl?: string;
}

// Mock Events Data
export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'UFC 300: Championship Night',
    description: 'Experience the most anticipated UFC event of the year in immersive VR. Feel every punch, kick, and submission attempt as if you were ringside.',
    venue: 'T-Mobile Arena',
    venueId: 'tmobile-arena-las-vegas',
    date: '2024-12-28',
    time: '20:00',
    duration: 180,
    price: { fiat: 89.99, crypto: 0.024 },
    category: 'sports',
    capacity: 20000,
    soldTickets: 15420,
    image: '/images/events/ufc-300.jpg',
    thumbnail: '/images/events/thumbs/ufc-300.jpg',
    vrPreview: '/videos/ufc-300-preview.mp4',
    isLive: false,
    isFeatured: true,
    tags: ['UFC', 'MMA', 'Championship', 'Live Sports'],
    reseller: {
      id: 'res-1',
      name: 'VR Sports Pro',
      avatar: '/images/resellers/vr-sports-pro.jpg',
      verified: true,
      rating: 4.9,
      totalEvents: 156,
      specialties: ['Sports', 'Live Events', '8K Streaming'],
      description: 'Premium VR sports streaming with multi-angle cameras',
      socialLinks: {
        website: 'https://vrsportspro.com',
        twitter: '@vrsportspro'
      }
    },
    ratings: { average: 4.8, count: 2341 },
    streamQuality: '8K',
    equipmentUsed: ['Insta360 Pro 2', 'Canon EOS R5 C', 'Custom VR Rigs']
  },
  {
    id: '2',
    title: 'Tomorrowland 2024: The VR Experience',
    description: 'Dance to the world\'s best DJs in the magical world of Tomorrowland. Experience the full festival atmosphere from multiple stages simultaneously.',
    venue: 'De Schorre',
    venueId: 'de-schorre-belgium',
    date: '2024-12-30',
    time: '16:00',
    duration: 480,
    price: { fiat: 159.99, crypto: 0.045 },
    category: 'festival',
    capacity: 400000,
    soldTickets: 85000,
    image: '/images/events/tomorrowland-2024.jpg',
    thumbnail: '/images/events/thumbs/tomorrowland-2024.jpg',
    vrPreview: '/videos/tomorrowland-preview.mp4',
    isLive: false,
    isFeatured: true,
    tags: ['EDM', 'Festival', 'Multi-Stage', 'Interactive'],
    reseller: {
      id: 'res-2',
      name: 'Festival VR Masters',
      avatar: '/images/resellers/festival-vr.jpg',
      verified: true,
      rating: 4.7,
      totalEvents: 89,
      specialties: ['Music Festivals', 'Multi-Stage', 'Interactive VR'],
      description: 'Specialized in large-scale music festival VR experiences',
      socialLinks: {
        website: 'https://festivalvr.com',
        instagram: '@festivalvrmasters'
      }
    },
    ratings: { average: 4.9, count: 5678 },
    streamQuality: 'VR360',
    equipmentUsed: ['Z Cam V1 Pro', 'Nokia OZO', 'Custom Drone Rigs']
  },
  {
    id: '3',
    title: 'Broadway: Hamilton - The VR Performance',
    description: 'Experience Lin-Manuel Miranda\'s masterpiece from the best seat in the house. Every emotion, every note, captured in stunning detail.',
    venue: 'Richard Rodgers Theatre',
    venueId: 'richard-rodgers-theatre',
    date: '2024-12-25',
    time: '19:30',
    duration: 165,
    price: { fiat: 199.99, crypto: 0.055 },
    category: 'theater',
    capacity: 1319,
    soldTickets: 1200,
    image: '/images/events/hamilton-vr.jpg',
    thumbnail: '/images/events/thumbs/hamilton-vr.jpg',
    isLive: false,
    isFeatured: true,
    tags: ['Broadway', 'Musical', 'Theater', 'Premium'],
    reseller: {
      id: 'res-3',
      name: 'Broadway VR Collective',
      avatar: '/images/resellers/broadway-vr.jpg',
      verified: true,
      rating: 4.95,
      totalEvents: 34,
      specialties: ['Theater', 'Broadway', 'High-End Production'],
      description: 'Bringing Broadway\'s finest to VR with cinematic quality',
      socialLinks: {
        website: 'https://broadwayvr.com'
      }
    },
    ratings: { average: 4.95, count: 892 },
    streamQuality: '4K',
    equipmentUsed: ['RED V-Raptor VV', 'Custom Theater Rigs', 'Spatial Audio']
  },
  {
    id: '4',
    title: 'Tech Conference 2025: AI & Web3 Summit',
    description: 'Join industry leaders discussing the future of AI and Web3. Interactive sessions, networking, and exclusive demos.',
    venue: 'Moscone Center',
    venueId: 'moscone-center-sf',
    date: '2025-01-15',
    time: '09:00',
    duration: 600,
    price: { fiat: 299.99, crypto: 0.082 },
    category: 'conference',
    capacity: 5000,
    soldTickets: 3200,
    image: '/images/events/tech-summit-2025.jpg',
    thumbnail: '/images/events/thumbs/tech-summit-2025.jpg',
    isLive: false,
    isFeatured: false,
    tags: ['Technology', 'AI', 'Web3', 'Networking'],
    reseller: {
      id: 'res-4',
      name: 'TechVR Conferences',
      avatar: '/images/resellers/tech-vr.jpg',
      verified: true,
      rating: 4.6,
      totalEvents: 67,
      specialties: ['Tech Conferences', 'Interactive Sessions', 'Networking'],
      description: 'Making tech conferences accessible worldwide through VR',
      socialLinks: {
        website: 'https://techvrconf.com',
        twitter: '@techvrconf'
      }
    },
    ratings: { average: 4.4, count: 445 },
    streamQuality: 'VR180',
    equipmentUsed: ['Varjo Aero', 'Conference Setup', 'Interactive Displays']
  }
];

// Mock Venues Data
export const mockVenues: Venue[] = [
  {
    id: 'tmobile-arena-las-vegas',
    name: 'T-Mobile Arena',
    location: {
      city: 'Las Vegas',
      country: 'United States',
      address: '3780 S Las Vegas Blvd, Las Vegas, NV 89158',
      coordinates: [36.1028, -115.1781]
    },
    type: 'arena',
    capacity: 20000,
    description: 'Premier sports and entertainment arena in the heart of Las Vegas Strip',
    images: ['/images/venues/tmobile-arena-1.jpg', '/images/venues/tmobile-arena-2.jpg'],
    amenities: ['VIP Suites', 'Premium Dining', 'State-of-art Sound', 'LED Displays'],
    vrSupport: true,
    streamingQuality: ['4K', '8K', 'VR360'],
    partnerSince: '2023-03-15'
  },
  {
    id: 'de-schorre-belgium',
    name: 'De Schorre',
    location: {
      city: 'Boom',
      country: 'Belgium',
      address: 'De Schorre Provincial Park, Boom, Belgium',
      coordinates: [51.0891, 4.3728]
    },
    type: 'outdoor',
    capacity: 400000,
    description: 'Magical outdoor festival grounds, home to Tomorrowland',
    images: ['/images/venues/de-schorre-1.jpg', '/images/venues/de-schorre-2.jpg'],
    amenities: ['Multiple Stages', 'Food Courts', 'Camping Areas', 'Art Installations'],
    vrSupport: true,
    streamingQuality: ['VR360', 'Multi-Angle'],
    partnerSince: '2023-01-20'
  }
];

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: '1',
    address: '0x742d35Cc6634C0532925a3b8D4Aa2d7c78EcAa9f',
    ens: 'vrfan.eth',
    avatar: '/images/avatars/user-1.jpg',
    name: 'Alex Chen',
    email: 'alex@example.com',
    role: 'client',
    createdAt: '2023-08-15',
    preferences: {
      categories: ['sports', 'concert'],
      notifications: true,
      currency: 'ETH'
    },
    stats: {
      eventsAttended: 23,
      totalSpent: 1247.50,
      favoriteCategory: 'sports'
    }
  }
];

// Mock Tickets Data
export const mockTickets: Ticket[] = [
  {
    id: 'ticket-1',
    eventId: '1',
    userId: '1',
    purchaseDate: '2024-12-01',
    price: 89.99,
    currency: 'USD',
    status: 'active',
    nftTokenId: '1001',
    accessCode: 'VR-UFC300-AB12CD',
    streamingUrl: 'https://stream.envimerse.com/ufc-300/user-1'
  }
];

// Helper functions
export const getEventById = (id: string): Event | undefined => {
  return mockEvents.find(event => event.id === id);
};

export const getEventsByCategory = (category: string): Event[] => {
  return mockEvents.filter(event => event.category === category);
};

export const getFeaturedEvents = (): Event[] => {
  return mockEvents.filter(event => event.isFeatured);
};

export const getVenueById = (id: string): Venue | undefined => {
  return mockVenues.find(venue => venue.id === id);
};

export const getUserTickets = (userId: string): Ticket[] => {
  return mockTickets.filter(ticket => ticket.userId === userId);
};

// Categories configuration
export const eventCategories = [
  { id: 'all', name: 'All Events', icon: '🎯' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'concert', name: 'Concerts', icon: '🎵' },
  { id: 'festival', name: 'Festivals', icon: '🎪' },
  { id: 'theater', name: 'Theater', icon: '🎭' },
  { id: 'conference', name: 'Conferences', icon: '💼' },
  { id: 'comedy', name: 'Comedy', icon: '😂' }
];

// Streaming quality options
export const streamingQualities = [
  { id: '4K', name: '4K Ultra HD', description: 'Crystal clear 4K resolution' },
  { id: '8K', name: '8K Ultra HD', description: 'Premium 8K experience' },
  { id: 'VR180', name: 'VR 180°', description: 'Immersive 180° field of view' },
  { id: 'VR360', name: 'VR 360°', description: 'Full 360° virtual reality' }
]; 