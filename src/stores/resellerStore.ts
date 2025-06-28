import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface ResellerEvent {
  id: string;
  title: string;
  description: string;
  banner: string;
  date: Date;
  venue: string;
  ticketPrice: number;
  currency: string;
  blockchain: 'ethereum' | 'polygon' | 'base' | 'optimism' | 'arbitrum';
  totalTickets: number;
  soldTickets: number;
  status: 'draft' | 'published' | 'live' | 'ended';
  commission: number;
  earnings: number;
  createdAt: Date;
}

export interface SalesData {
  date: string;
  sales: number;
  revenue: number;
  tickets: number;
}

export interface Commission {
  id: string;
  eventId: string;
  eventName: string;
  amount: number;
  currency: string;
  date: Date;
  status: 'pending' | 'paid';
}

export interface ResellerProfile {
  id: string;
  walletAddress: string;
  businessName: string;
  description: string;
  website?: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    discord?: string;
  };
  verified: boolean;
  rating: number;
  totalEvents: number;
  totalRevenue: number;
}

export interface ResellerState {
  // Profile
  profile: ResellerProfile | null;
  isProfileLoading: boolean;
  
  // Events
  events: ResellerEvent[];
  isEventsLoading: boolean;
  
  // Analytics
  salesData: SalesData[];
  totalRevenue: number;
  totalTicketsSold: number;
  conversionRate: number;
  
  // Commissions
  commissions: Commission[];
  pendingCommissions: number;
  availableForWithdraw: number;
  
  // Event Creation
  isCreatingEvent: boolean;
  currentEventDraft: Partial<ResellerEvent> | null;
  
  // Actions
  setProfile: (profile: ResellerProfile) => void;
  setEvents: (events: ResellerEvent[]) => void;
  addEvent: (event: ResellerEvent) => void;
  updateEvent: (eventId: string, updates: Partial<ResellerEvent>) => void;
  deleteEvent: (eventId: string) => void;
  setSalesData: (data: SalesData[]) => void;
  setCommissions: (commissions: Commission[]) => void;
  setEventDraft: (draft: Partial<ResellerEvent> | null) => void;
  setCreatingEvent: (loading: boolean) => void;
  setProfileLoading: (loading: boolean) => void;
  setEventsLoading: (loading: boolean) => void;
  
  // Mock data loaders
  loadMockData: () => void;
}

export const useResellerStore = create<ResellerState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        profile: null,
        isProfileLoading: false,
        events: [],
        isEventsLoading: false,
        salesData: [],
        totalRevenue: 0,
        totalTicketsSold: 0,
        conversionRate: 0,
        commissions: [],
        pendingCommissions: 0,
        availableForWithdraw: 0,
        isCreatingEvent: false,
        currentEventDraft: null,

        // Actions
        setProfile: (profile) => set({ profile }),
        
        setEvents: (events) => set({ events }),
        
        addEvent: (event) => set((state) => ({
          events: [...state.events, event]
        })),
        
        updateEvent: (eventId, updates) => set((state) => ({
          events: state.events.map(event =>
            event.id === eventId ? { ...event, ...updates } : event
          )
        })),
        
        deleteEvent: (eventId) => set((state) => ({
          events: state.events.filter(event => event.id !== eventId)
        })),
        
        setSalesData: (salesData) => set({ salesData }),
        
        setCommissions: (commissions) => set({ commissions }),
        
        setEventDraft: (currentEventDraft) => set({ currentEventDraft }),
        
        setCreatingEvent: (isCreatingEvent) => set({ isCreatingEvent }),
        
        setProfileLoading: (isProfileLoading) => set({ isProfileLoading }),
        
        setEventsLoading: (isEventsLoading) => set({ isEventsLoading }),
        
        // Mock data loader
        loadMockData: () => {
          const mockEvents: ResellerEvent[] = [
            {
              id: 'evt1',
              title: 'Neon Nights Music Festival',
              description: 'The biggest VR music festival of the year',
              banner: '/events/neon-nights.jpg',
              date: new Date('2025-03-15T20:00:00'),
              venue: 'Virtual Arena 1',
              ticketPrice: 0.08,
              currency: 'ETH',
              blockchain: 'ethereum',
              totalTickets: 1000,
              soldTickets: 750,
              status: 'published',
              commission: 10,
              earnings: 6.0,
              createdAt: new Date('2025-01-01')
            },
            {
              id: 'evt2',
              title: 'Tech Talk: Future of VR',
              description: 'Leading experts discuss VR technology trends',
              banner: '/events/tech-talk.jpg',
              date: new Date('2025-02-20T14:00:00'),
              venue: 'Conference Hall VR',
              ticketPrice: 25,
              currency: 'USDC',
              blockchain: 'polygon',
              totalTickets: 500,
              soldTickets: 420,
              status: 'live',
              commission: 15,
              earnings: 1575,
              createdAt: new Date('2025-01-10')
            },
            {
              id: 'evt3',
              title: 'Crypto Gaming Championship',
              description: 'Compete in the ultimate VR gaming tournament',
              banner: '/events/crypto-gaming.jpg',
              date: new Date('2025-04-10T18:00:00'),
              venue: 'Gaming Arena VR',
              ticketPrice: 0.05,
              currency: 'ETH',
              blockchain: 'base',
              totalTickets: 2000,
              soldTickets: 200,
              status: 'draft',
              commission: 12,
              earnings: 1.2,
              createdAt: new Date('2025-01-15')
            }
          ];

          const mockSalesData: SalesData[] = [
            { date: '2025-01-01', sales: 15, revenue: 750, tickets: 15 },
            { date: '2025-01-02', sales: 23, revenue: 1150, tickets: 23 },
            { date: '2025-01-03', sales: 18, revenue: 900, tickets: 18 },
            { date: '2025-01-04', sales: 31, revenue: 1550, tickets: 31 },
            { date: '2025-01-05', sales: 27, revenue: 1350, tickets: 27 },
            { date: '2025-01-06', sales: 42, revenue: 2100, tickets: 42 },
            { date: '2025-01-07', sales: 38, revenue: 1900, tickets: 38 }
          ];

          const mockCommissions: Commission[] = [
            {
              id: 'comm1',
              eventId: 'evt1',
              eventName: 'Neon Nights Music Festival',
              amount: 6.0,
              currency: 'ETH',
              date: new Date('2025-01-20'),
              status: 'paid'
            },
            {
              id: 'comm2',
              eventId: 'evt2',
              eventName: 'Tech Talk: Future of VR',
              amount: 1575,
              currency: 'USDC',
              date: new Date('2025-01-25'),
              status: 'pending'
            },
            {
              id: 'comm3',
              eventId: 'evt3',
              eventName: 'Crypto Gaming Championship',
              amount: 1.2,
              currency: 'ETH',
              date: new Date('2025-01-30'),
              status: 'pending'
            }
          ];

          const totalRevenue = mockEvents.reduce((sum, event) => sum + event.earnings, 0);
          const totalTicketsSold = mockEvents.reduce((sum, event) => sum + event.soldTickets, 0);
          const pendingCommissions = mockCommissions
            .filter(c => c.status === 'pending')
            .reduce((sum, c) => sum + c.amount, 0);

          set({
            events: mockEvents,
            salesData: mockSalesData,
            commissions: mockCommissions,
            totalRevenue,
            totalTicketsSold,
            conversionRate: 75.5,
            pendingCommissions,
            availableForWithdraw: pendingCommissions
          });
        }
      }),
      {
        name: 'reseller-store',
        partialize: (state) => ({
          profile: state.profile,
          events: state.events,
          commissions: state.commissions,
        }),
      }
    ),
    { name: 'reseller-store' }
  )
); 