import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface VRTicket {
  id: string;
  eventName: string;
  eventDate: Date;
  venue: string;
  ticketType: 'VIP' | 'Premium' | 'Standard';
  status: 'upcoming' | 'expired' | 'used';
  nftImage: string;
  qrCode: string;
  price: number;
  currency: string;
  tokenId?: string;
  contractAddress?: string;
}

export interface UserProfile {
  id: string;
  walletAddress: string;
  ensName?: string;
  avatar?: string;
  preferences: {
    favoriteGenres: string[];
    notifications: boolean;
    language: string;
  };
}

export interface UserState {
  // Profile
  profile: UserProfile | null;
  isProfileLoading: boolean;
  
  // Tickets
  tickets: VRTicket[];
  isTicketsLoading: boolean;
  
  // Wallet
  walletBalance: {
    eth: number;
    usdc: number;
    polygon: number;
  };
  
  // Recommendations
  recommendations: {
    id: string;
    title: string;
    image: string;
    genre: string;
    price: number;
    date: Date;
    venue: string;
  }[];
  
  // Actions
  setProfile: (profile: UserProfile) => void;
  setTickets: (tickets: VRTicket[]) => void;
  addTicket: (ticket: VRTicket) => void;
  updateTicketStatus: (ticketId: string, status: VRTicket['status']) => void;
  setWalletBalance: (balance: UserState['walletBalance']) => void;
  setRecommendations: (recommendations: UserState['recommendations']) => void;
  setProfileLoading: (loading: boolean) => void;
  setTicketsLoading: (loading: boolean) => void;
  
  // Mock data loaders
  loadMockData: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        profile: null,
        isProfileLoading: false,
        tickets: [],
        isTicketsLoading: false,
        walletBalance: {
          eth: 0,
          usdc: 0,
          polygon: 0,
        },
        recommendations: [],

        // Actions
        setProfile: (profile) => set({ profile }),
        
        setTickets: (tickets) => set({ tickets }),
        
        addTicket: (ticket) => set((state) => ({
          tickets: [...state.tickets, ticket]
        })),
        
        updateTicketStatus: (ticketId, status) => set((state) => ({
          tickets: state.tickets.map(ticket =>
            ticket.id === ticketId ? { ...ticket, status } : ticket
          )
        })),
        
        setWalletBalance: (walletBalance) => set({ walletBalance }),
        
        setRecommendations: (recommendations) => set({ recommendations }),
        
        setProfileLoading: (isProfileLoading) => set({ isProfileLoading }),
        
        setTicketsLoading: (isTicketsLoading) => set({ isTicketsLoading }),
        
        // Mock data loader
        loadMockData: () => {
          const mockTickets: VRTicket[] = [
            {
              id: '1',
              eventName: 'Cosmic Music Festival VR',
              eventDate: new Date('2025-01-15T20:00:00'),
              venue: 'Neon Arena',
              ticketType: 'VIP',
              status: 'upcoming',
              nftImage: '/tickets/cosmic-festival.jpg',
              qrCode: 'QR_COSMIC_VIP_001',
              price: 0.05,
              currency: 'ETH',
              tokenId: '1001',
              contractAddress: '0x...'
            },
            {
              id: '2',
              eventName: 'Virtual Tech Conference',
              eventDate: new Date('2025-02-20T14:00:00'),
              venue: 'CyberSpace Hall',
              ticketType: 'Premium',
              status: 'upcoming',
              nftImage: '/tickets/tech-conference.jpg',
              qrCode: 'QR_TECH_PREM_002',
              price: 25,
              currency: 'USDC',
              tokenId: '1002',
              contractAddress: '0x...'
            },
            {
              id: '3',
              eventName: 'Retro Gaming Championship',
              eventDate: new Date('2024-12-10T18:00:00'),
              venue: 'Pixel Paradise',
              ticketType: 'Standard',
              status: 'expired',
              nftImage: '/tickets/retro-gaming.jpg',
              qrCode: 'QR_RETRO_STD_003',
              price: 15,
              currency: 'USDC',
              tokenId: '1003',
              contractAddress: '0x...'
            }
          ];

          const mockRecommendations = [
            {
              id: 'rec1',
              title: 'Cyberpunk 2077 VR Launch',
              image: '/events/cyberpunk-vr.jpg',
              genre: 'Gaming',
              price: 0.08,
              date: new Date('2025-03-01T19:00:00'),
              venue: 'Night City Arena'
            },
            {
              id: 'rec2',
              title: 'Electronic Dreams Concert',
              image: '/events/electronic-dreams.jpg',
              genre: 'Music',
              price: 45,
              date: new Date('2025-02-14T21:00:00'),
              venue: 'Synth Space'
            },
            {
              id: 'rec3',
              title: 'Future Tech Expo',
              image: '/events/tech-expo.jpg',
              genre: 'Technology',
              price: 30,
              date: new Date('2025-02-28T10:00:00'),
              venue: 'Innovation Hub'
            }
          ];

          const mockWalletBalance = {
            eth: 1.234,
            usdc: 2456.78,
            polygon: 345.90
          };

          set({
            tickets: mockTickets,
            recommendations: mockRecommendations,
            walletBalance: mockWalletBalance
          });
        }
      }),
      {
        name: 'user-store',
        partialize: (state) => ({
          profile: state.profile,
          tickets: state.tickets,
          walletBalance: state.walletBalance,
        }),
      }
    ),
    { name: 'user-store' }
  )
); 