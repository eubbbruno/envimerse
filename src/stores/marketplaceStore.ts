import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  VRExperience, 
  MarketplaceFilters, 
  MarketplaceSort, 
  SearchResult,
  WishlistItem,
  CartItem,
  VRCategory,
  TicketType 
} from '@/types/marketplace';

interface MarketplaceState {
  // Data
  experiences: VRExperience[];
  featuredExperiences: VRExperience[];
  trendingExperiences: VRExperience[];
  wishlist: WishlistItem[];
  cart: CartItem[];
  
  // Search & Filters
  searchQuery: string;
  filters: MarketplaceFilters;
  sort: MarketplaceSort;
  searchResult: SearchResult | null;
  
  // UI State
  isLoading: boolean;
  isSearching: boolean;
  selectedCategory: VRCategory | 'all';
  viewMode: 'grid' | 'list';
  
  // Actions
  loadMockData: () => void;
  searchExperiences: (query: string) => void;
  applyFilters: (filters: MarketplaceFilters) => void;
  setSortBy: (sort: MarketplaceSort) => void;
  setSelectedCategory: (category: VRCategory | 'all') => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  
  // Wishlist actions
  addToWishlist: (experienceId: string) => void;
  removeFromWishlist: (experienceId: string) => void;
  isInWishlist: (experienceId: string) => boolean;
  
  // Cart actions
  addToCart: (experienceId: string, ticketType: TicketType, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => { total: number; currency: string };
  getCartItemCount: () => number;
}

// Mock data generator
const generateMockExperiences = (): VRExperience[] => {
  const categories: VRCategory[] = ['concerts', 'sports', 'gaming', 'education', 'travel', 'art', 'fitness', 'social', 'business'];
  
  const mockExperiences: VRExperience[] = [];
  
  // Generate 50 mock experiences
  for (let i = 1; i <= 50; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const rating = 3.5 + Math.random() * 1.5; // 3.5 to 5.0
    const reviewCount = Math.floor(Math.random() * 1000) + 10;
    
    const experience: VRExperience = {
      id: `exp_${i.toString().padStart(3, '0')}`,
      title: getExperienceTitle(category, i),
      description: getExperienceDescription(category),
      shortDescription: getShortDescription(category),
      category,
      
      images: [
        `https://picsum.photos/800/600?random=${i}`,
        `https://picsum.photos/800/600?random=${i + 100}`,
        `https://picsum.photos/800/600?random=${i + 200}`,
      ],
      previewVideo: `https://example.com/preview_${i}.mp4`,
      vrPreviewUrl: `https://example.com/vr_preview_${i}`,
      
      date: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000), // Next 90 days
      duration: 60 + Math.floor(Math.random() * 120), // 60-180 minutes
      
      venue: {
        name: `${category.charAt(0).toUpperCase() + category.slice(1)} VR Arena ${i}`,
        location: getRandomLocation(),
        capacity: 100 + Math.floor(Math.random() * 900),
        vrWorldId: `world_${category}_${i}`,
      },
      
      pricing: {
        standard: {
          price: 0.01 + Math.random() * 0.05, // 0.01-0.06 ETH
          currency: 'ETH',
          available: Math.floor(Math.random() * 100) + 50,
          sold: Math.floor(Math.random() * 50),
          features: ['Standard VR Access', 'Chat Support', 'Recording Available'],
        },
        premium: {
          price: 0.05 + Math.random() * 0.1, // 0.05-0.15 ETH
          currency: 'ETH',
          available: Math.floor(Math.random() * 50) + 25,
          sold: Math.floor(Math.random() * 25),
          features: ['Premium VR Access', 'Priority Support', 'Exclusive Content', '4K Quality'],
        },
        vip: {
          price: 0.15 + Math.random() * 0.2, // 0.15-0.35 ETH
          currency: 'ETH',
          available: Math.floor(Math.random() * 20) + 10,
          sold: Math.floor(Math.random() * 10),
          features: ['VIP VR Access', 'Personal Concierge', 'Backstage Access', '8K Quality', 'Meet & Greet'],
        },
      },
      
      creator: {
        name: getRandomCreator(),
        verified: Math.random() > 0.3,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=creator${i}`,
        address: `0x${Math.random().toString(16).substr(2, 40)}`,
      },
      
      rating: {
        average: Math.round(rating * 10) / 10,
        count: reviewCount,
        distribution: {
          5: Math.floor(reviewCount * 0.6),
          4: Math.floor(reviewCount * 0.25),
          3: Math.floor(reviewCount * 0.1),
          2: Math.floor(reviewCount * 0.03),
          1: Math.floor(reviewCount * 0.02),
        },
      },
      
      requirements: {
        vr: Math.random() > 0.3,
        ar: Math.random() > 0.7,
        mobile: Math.random() > 0.2,
        desktop: true,
        minBandwidth: `${5 + Math.floor(Math.random() * 15)}Mbps`,
      },
      
      social: {
        likes: Math.floor(Math.random() * 5000),
        shares: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 500),
        views: Math.floor(Math.random() * 50000) + 1000,
      },
      
      tags: getTags(category),
      featured: Math.random() > 0.8,
      trending: Math.random() > 0.85,
      status: 'upcoming',
      
      nft: {
        blockchain: 'base',
        royalties: 2.5 + Math.random() * 5, // 2.5-7.5%
      },
      
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    };
    
    mockExperiences.push(experience);
  }
  
  return mockExperiences;
};

// Helper functions for mock data
function getExperienceTitle(category: VRCategory, index: number): string {
  const titles: Record<VRCategory, string[]> = {
    concerts: ['Virtual Symphony Orchestra', 'Electronic Dance Paradise', 'Rock Legends Live', 'Jazz in the Metaverse'],
    sports: ['Champions League VR', 'NBA Courtside Experience', 'Olympic Games 2024', 'Formula 1 Race Day'],
    gaming: ['Cyberpunk Tournament', 'Medieval Quest Adventure', 'Space Battle Royale', 'Fantasy RPG World'],
    education: ['Virtual History Museum', 'Science Lab Experience', 'Language Learning VR', 'Coding Bootcamp'],
    travel: ['Paris Virtual Tour', 'Amazon Rainforest', 'Northern Lights Experience', 'Ancient Rome Walk'],
    art: ['Digital Art Gallery', 'Sculpture Workshop', 'Painting Masterclass', 'Modern Art Exhibition'],
    fitness: ['VR Fitness Challenge', 'Yoga in Paradise', 'Boxing Training', 'Dance Revolution'],
    social: ['Virtual Meetup', 'Speed Dating VR', 'Book Club Discussion', 'Trivia Night'],
    business: ['Startup Pitch Event', 'Conference 2024', 'Networking Session', 'Workshop Series'],
  };
  
  const categoryTitles = titles[category];
  return `${categoryTitles[index % categoryTitles.length]} ${Math.floor(index / categoryTitles.length) + 1}`;
}

function getExperienceDescription(category: VRCategory): string {
  const descriptions: Record<VRCategory, string> = {
    concerts: 'Immerse yourself in a world-class musical performance with cutting-edge VR technology. Experience every note, every beat, and every emotion as if you were right there on stage with the artists.',
    sports: 'Get closer to the action than ever before with our premium sports VR experience. Feel the energy of the crowd, hear the roar of the stadium, and witness history in the making.',
    gaming: 'Enter epic virtual worlds where fantasy becomes reality. Battle alongside friends, explore vast landscapes, and experience gaming like never before in full immersive VR.',
    education: 'Learn through experience with our revolutionary educational VR programs. Transform complex concepts into engaging, interactive adventures that make learning unforgettable.',
    travel: 'Explore the world without leaving your home. Visit exotic destinations, historical landmarks, and natural wonders with photorealistic VR that captures every detail.',
    art: 'Discover art in a completely new dimension. Walk through galleries, interact with masterpieces, and even create your own art in our immersive virtual studios.',
    fitness: 'Revolutionize your workout routine with VR fitness experiences that make exercise fun and engaging. Train with virtual coaches in stunning environments.',
    social: 'Connect with people from around the world in meaningful ways. Share experiences, make new friends, and build relationships in our social VR spaces.',
    business: 'Transform the way you do business with professional VR experiences. Attend conferences, conduct meetings, and collaborate with teams in virtual environments.',
  };
  
  return descriptions[category];
}

function getShortDescription(category: VRCategory): string {
  const short: Record<VRCategory, string> = {
    concerts: 'Premium VR concert experience with world-class artists',
    sports: 'Immersive sports viewing with stadium-quality audio',
    gaming: 'Epic multiplayer VR gaming adventures',
    education: 'Interactive learning through VR technology',
    travel: 'Virtual exploration of world destinations',
    art: 'Immersive art galleries and creative workshops',
    fitness: 'VR-powered fitness and wellness programs',
    social: 'Social VR experiences and community events',
    business: 'Professional VR conferences and networking',
  };
  
  return short[category];
}

function getRandomLocation(): string {
  const locations = [
    'New York, USA', 'London, UK', 'Tokyo, Japan', 'Paris, France', 'Sydney, Australia',
    'Berlin, Germany', 'São Paulo, Brazil', 'Mumbai, India', 'Toronto, Canada', 'Barcelona, Spain'
  ];
  return locations[Math.floor(Math.random() * locations.length)];
}

function getRandomCreator(): string {
  const creators = [
    'VR Studios Inc', 'Metaverse Productions', 'Digital Dreamers', 'Virtual Visions',
    'Immersive Arts Co', 'NextGen Entertainment', 'Cyber Creative', 'Reality Labs'
  ];
  return creators[Math.floor(Math.random() * creators.length)];
}

function getTags(category: VRCategory): string[] {
  const baseTags = ['VR', 'Immersive', 'HD Quality'];
  const categoryTags: Record<VRCategory, string[]> = {
    concerts: ['Music', 'Live Performance', 'Audio'],
    sports: ['Sports', 'Live Event', 'Stadium'],
    gaming: ['Gaming', 'Multiplayer', 'Adventure'],
    education: ['Educational', 'Learning', 'Interactive'],
    travel: ['Travel', 'Exploration', 'Cultural'],
    art: ['Art', 'Creative', 'Gallery'],
    fitness: ['Fitness', 'Health', 'Workout'],
    social: ['Social', 'Community', 'Networking'],
    business: ['Business', 'Professional', 'Conference'],
  };
  
  return [...baseTags, ...categoryTags[category]];
}

export const useMarketplaceStore = create<MarketplaceState>()(
  persist(
    (set, get) => ({
      // Initial state
      experiences: [],
      featuredExperiences: [],
      trendingExperiences: [],
      wishlist: [],
      cart: [],
      
      searchQuery: '',
      filters: {},
      sort: { field: 'date', direction: 'asc' },
      searchResult: null,
      
      isLoading: false,
      isSearching: false,
      selectedCategory: 'all',
      viewMode: 'grid',
      
      // Actions
      loadMockData: () => {
        set({ isLoading: true });
        
        // Simulate API call delay
        setTimeout(() => {
          const experiences = generateMockExperiences();
          const featured = experiences.filter(exp => exp.featured);
          const trending = experiences.filter(exp => exp.trending);
          
          set({
            experiences,
            featuredExperiences: featured,
            trendingExperiences: trending,
            isLoading: false,
          });
        }, 1000);
      },
      
      searchExperiences: (query: string) => {
        set({ searchQuery: query, isSearching: true });
        
        const { experiences, filters, sort } = get();
        
        setTimeout(() => {
          let filtered = experiences.filter(exp =>
            exp.title.toLowerCase().includes(query.toLowerCase()) ||
            exp.description.toLowerCase().includes(query.toLowerCase()) ||
            exp.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
          );
          
          // Apply existing filters
          filtered = applyFiltersToExperiences(filtered, filters);
          
          // Apply sorting
          filtered = applySortToExperiences(filtered, sort);
          
          const result: SearchResult = {
            experiences: filtered,
            total: filtered.length,
            page: 1,
            hasMore: false,
            filters,
            sort,
          };
          
          set({ searchResult: result, isSearching: false });
        }, 500);
      },
      
      applyFilters: (filters: MarketplaceFilters) => {
        set({ filters, isSearching: true });
        
        const { experiences, searchQuery, sort } = get();
        
        setTimeout(() => {
          let filtered = experiences;
          
          // Apply search query if exists
          if (searchQuery) {
            filtered = filtered.filter(exp =>
              exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              exp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
              exp.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
          }
          
          // Apply filters
          filtered = applyFiltersToExperiences(filtered, filters);
          
          // Apply sorting
          filtered = applySortToExperiences(filtered, sort);
          
          const result: SearchResult = {
            experiences: filtered,
            total: filtered.length,
            page: 1,
            hasMore: false,
            filters,
            sort,
          };
          
          set({ searchResult: result, isSearching: false });
        }, 300);
      },
      
      setSortBy: (sort: MarketplaceSort) => {
        set({ sort });
        
        const { searchResult } = get();
        if (searchResult) {
          const sortedExperiences = applySortToExperiences(searchResult.experiences, sort);
          set({
            searchResult: {
              ...searchResult,
              experiences: sortedExperiences,
              sort,
            },
          });
        }
      },
      
      setSelectedCategory: (category: VRCategory | 'all') => {
        set({ selectedCategory: category });
        
        if (category === 'all') {
          get().applyFilters({});
        } else {
          get().applyFilters({ category: [category] });
        }
      },
      
      setViewMode: (mode: 'grid' | 'list') => {
        set({ viewMode: mode });
      },
      
      // Wishlist actions
      addToWishlist: (experienceId: string) => {
        const { wishlist } = get();
        const newItem: WishlistItem = {
          id: `wish_${Date.now()}`,
          experienceId,
          userId: 'current_user', // In real app, get from auth context
          addedAt: new Date(),
        };
        set({ wishlist: [...wishlist, newItem] });
      },
      
      removeFromWishlist: (experienceId: string) => {
        const { wishlist } = get();
        set({ wishlist: wishlist.filter(item => item.experienceId !== experienceId) });
      },
      
      isInWishlist: (experienceId: string) => {
        const { wishlist } = get();
        return wishlist.some(item => item.experienceId === experienceId);
      },
      
      // Cart actions
      addToCart: (experienceId: string, ticketType: TicketType, quantity: number) => {
        const { cart, experiences } = get();
        const experience = experiences.find(exp => exp.id === experienceId);
        
        if (!experience || !experience.pricing[ticketType]) return;
        
        const pricing = experience.pricing[ticketType]!;
        const newItem: CartItem = {
          id: `cart_${Date.now()}`,
          experienceId,
          ticketType,
          quantity,
          price: pricing.price,
          currency: pricing.currency,
          addedAt: new Date(),
        };
        
        set({ cart: [...cart, newItem] });
      },
      
      removeFromCart: (itemId: string) => {
        const { cart } = get();
        set({ cart: cart.filter(item => item.id !== itemId) });
      },
      
      updateCartQuantity: (itemId: string, quantity: number) => {
        const { cart } = get();
        set({
          cart: cart.map(item =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        });
      },
      
      clearCart: () => {
        set({ cart: [] });
      },
      
      getCartTotal: () => {
        const { cart } = get();
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return { total, currency: cart[0]?.currency || 'ETH' };
      },
      
      getCartItemCount: () => {
        const { cart } = get();
        return cart.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'marketplace-storage',
      partialize: (state) => ({
        wishlist: state.wishlist,
        cart: state.cart,
        selectedCategory: state.selectedCategory,
        viewMode: state.viewMode,
      }),
    }
  )
);

// Helper functions
function applyFiltersToExperiences(experiences: VRExperience[], filters: MarketplaceFilters): VRExperience[] {
  let filtered = experiences;
  
  if (filters.category?.length) {
    filtered = filtered.filter(exp => filters.category!.includes(exp.category));
  }
  
  if (filters.priceRange) {
    filtered = filtered.filter(exp => {
      const standardPrice = exp.pricing.standard?.price || 0;
      return standardPrice >= filters.priceRange!.min && standardPrice <= filters.priceRange!.max;
    });
  }
  
  if (filters.rating) {
    filtered = filtered.filter(exp => exp.rating.average >= filters.rating!);
  }
  
  if (filters.requirements?.vr !== undefined) {
    filtered = filtered.filter(exp => exp.requirements.vr === filters.requirements!.vr);
  }
  
  if (filters.featured !== undefined) {
    filtered = filtered.filter(exp => exp.featured === filters.featured);
  }
  
  if (filters.trending !== undefined) {
    filtered = filtered.filter(exp => exp.trending === filters.trending);
  }
  
  return filtered;
}

function applySortToExperiences(experiences: VRExperience[], sort: MarketplaceSort): VRExperience[] {
  const sorted = [...experiences].sort((a, b) => {
    let comparison = 0;
    
    switch (sort.field) {
      case 'date':
        comparison = a.date.getTime() - b.date.getTime();
        break;
      case 'price':
        const aPrice = a.pricing.standard?.price || 0;
        const bPrice = b.pricing.standard?.price || 0;
        comparison = aPrice - bPrice;
        break;
      case 'rating':
        comparison = a.rating.average - b.rating.average;
        break;
      case 'popularity':
        comparison = a.social.views - b.social.views;
        break;
      case 'newest':
        comparison = a.createdAt.getTime() - b.createdAt.getTime();
        break;
    }
    
    return sort.direction === 'desc' ? -comparison : comparison;
  });
  
  return sorted;
} 