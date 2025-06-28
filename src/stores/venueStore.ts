import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface VRVenue {
  id: string;
  name: string;
  description: string;
  category: 'concert' | 'conference' | 'gaming' | 'exhibition' | 'social';
  capacity: number;
  vrHeadsetSupport: string[];
  thumbnailImage: string;
  previewImages: string[];
  status: 'active' | 'maintenance' | 'inactive';
  commissionRate: number;
  totalEvents: number;
  rating: number;
  reviews: number;
  features: {
    spatialAudio: boolean;
    hapticFeedback: boolean;
    eyeTracking: boolean;
    handTracking: boolean;
    multiplayer: boolean;
  };
  technicalSpecs: {
    minBandwidth: string;
    maxLatency: string;
    renderQuality: 'low' | 'medium' | 'high' | 'ultra';
    supportedPlatforms: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  venueId: string;
  venueName: string;
  status: 'filming' | 'setup' | 'event' | 'maintenance';
  attendees: number;
  eventType: 'recording' | 'live' | 'testing';
  requirements: string[];
}

export interface TechnicalRequirement {
  id: string;
  category: 'cameras' | 'audio' | 'lighting' | 'streaming' | 'networking';
  name: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending' | 'missing';
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedCost: number;
  assignedTo?: string;
  dueDate: Date;
}

export interface VenueStats {
  totalVenues: number;
  activeVenues: number;
  totalCapacity: number;
  utilizationRate: number;
  averageRating: number;
  totalRevenue: number;
  monthlyBookings: number;
}

export interface VenueState {
  // Venues
  venues: VRVenue[];
  isVenuesLoading: boolean;
  
  // Calendar
  calendarEvents: CalendarEvent[];
  isCalendarLoading: boolean;
  
  // Technical Requirements
  technicalRequirements: TechnicalRequirement[];
  isRequirementsLoading: boolean;
  
  // Stats
  stats: VenueStats;
  
  // Current selections
  selectedVenue: VRVenue | null;
  selectedDate: Date;
  
  // Actions
  setVenues: (venues: VRVenue[]) => void;
  addVenue: (venue: VRVenue) => void;
  updateVenue: (venueId: string, updates: Partial<VRVenue>) => void;
  deleteVenue: (venueId: string) => void;
  setCalendarEvents: (events: CalendarEvent[]) => void;
  addCalendarEvent: (event: CalendarEvent) => void;
  updateCalendarEvent: (eventId: string, updates: Partial<CalendarEvent>) => void;
  deleteCalendarEvent: (eventId: string) => void;
  setTechnicalRequirements: (requirements: TechnicalRequirement[]) => void;
  updateRequirement: (reqId: string, updates: Partial<TechnicalRequirement>) => void;
  setSelectedVenue: (venue: VRVenue | null) => void;
  setSelectedDate: (date: Date) => void;
  setVenuesLoading: (loading: boolean) => void;
  setCalendarLoading: (loading: boolean) => void;
  setRequirementsLoading: (loading: boolean) => void;
  
  // Mock data loaders
  loadMockData: () => void;
}

export const useVenueStore = create<VenueState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        venues: [],
        isVenuesLoading: false,
        calendarEvents: [],
        isCalendarLoading: false,
        technicalRequirements: [],
        isRequirementsLoading: false,
        stats: {
          totalVenues: 0,
          activeVenues: 0,
          totalCapacity: 0,
          utilizationRate: 0,
          averageRating: 0,
          totalRevenue: 0,
          monthlyBookings: 0,
        },
        selectedVenue: null,
        selectedDate: new Date(),

        // Actions
        setVenues: (venues) => set({ venues }),
        
        addVenue: (venue) => set((state) => ({
          venues: [...state.venues, venue]
        })),
        
        updateVenue: (venueId, updates) => set((state) => ({
          venues: state.venues.map(venue =>
            venue.id === venueId ? { ...venue, ...updates } : venue
          )
        })),
        
        deleteVenue: (venueId) => set((state) => ({
          venues: state.venues.filter(venue => venue.id !== venueId)
        })),
        
        setCalendarEvents: (calendarEvents) => set({ calendarEvents }),
        
        addCalendarEvent: (event) => set((state) => ({
          calendarEvents: [...state.calendarEvents, event]
        })),
        
        updateCalendarEvent: (eventId, updates) => set((state) => ({
          calendarEvents: state.calendarEvents.map(event =>
            event.id === eventId ? { ...event, ...updates } : event
          )
        })),
        
        deleteCalendarEvent: (eventId) => set((state) => ({
          calendarEvents: state.calendarEvents.filter(event => event.id !== eventId)
        })),
        
        setTechnicalRequirements: (technicalRequirements) => set({ technicalRequirements }),
        
        updateRequirement: (reqId, updates) => set((state) => ({
          technicalRequirements: state.technicalRequirements.map(req =>
            req.id === reqId ? { ...req, ...updates } : req
          )
        })),
        
        setSelectedVenue: (selectedVenue) => set({ selectedVenue }),
        
        setSelectedDate: (selectedDate) => set({ selectedDate }),
        
        setVenuesLoading: (isVenuesLoading) => set({ isVenuesLoading }),
        
        setCalendarLoading: (isCalendarLoading) => set({ isCalendarLoading }),
        
        setRequirementsLoading: (isRequirementsLoading) => set({ isRequirementsLoading }),
        
        // Mock data loader
        loadMockData: () => {
          const mockVenues: VRVenue[] = [
            {
              id: 'venue1',
              name: 'Neon Arena',
              description: 'State-of-the-art VR concert venue with 360° immersive experience',
              category: 'concert',
              capacity: 10000,
              vrHeadsetSupport: ['Meta Quest 3', 'Apple Vision Pro', 'PICO 4', 'Valve Index'],
              thumbnailImage: '/venues/neon-arena-thumb.jpg',
              previewImages: ['/venues/neon-arena-1.jpg', '/venues/neon-arena-2.jpg'],
              status: 'active',
              commissionRate: 15,
              totalEvents: 245,
              rating: 4.8,
              reviews: 1230,
              features: {
                spatialAudio: true,
                hapticFeedback: true,
                eyeTracking: true,
                handTracking: true,
                multiplayer: true
              },
              technicalSpecs: {
                minBandwidth: '100 Mbps',
                maxLatency: '20ms',
                renderQuality: 'ultra',
                supportedPlatforms: ['PC VR', 'Standalone', 'Mobile VR']
              },
              createdAt: new Date('2024-06-01'),
              updatedAt: new Date('2025-01-01')
            },
            {
              id: 'venue2',
              name: 'CyberSpace Hall',
              description: 'Professional conference and presentation space in virtual reality',
              category: 'conference',
              capacity: 2000,
              vrHeadsetSupport: ['Meta Quest 3', 'Apple Vision Pro', 'HTC Vive Pro'],
              thumbnailImage: '/venues/cyberspace-hall-thumb.jpg',
              previewImages: ['/venues/cyberspace-hall-1.jpg'],
              status: 'active',
              commissionRate: 12,
              totalEvents: 89,
              rating: 4.6,
              reviews: 456,
              features: {
                spatialAudio: true,
                hapticFeedback: false,
                eyeTracking: true,
                handTracking: true,
                multiplayer: true
              },
              technicalSpecs: {
                minBandwidth: '50 Mbps',
                maxLatency: '15ms',
                renderQuality: 'high',
                supportedPlatforms: ['PC VR', 'Standalone']
              },
              createdAt: new Date('2024-08-15'),
              updatedAt: new Date('2024-12-20')
            },
            {
              id: 'venue3',
              name: 'Gaming Arena VR',
              description: 'Competitive gaming venue with tournament-grade infrastructure',
              category: 'gaming',
              capacity: 5000,
              vrHeadsetSupport: ['Meta Quest 3', 'Valve Index', 'PICO 4'],
              thumbnailImage: '/venues/gaming-arena-thumb.jpg',
              previewImages: ['/venues/gaming-arena-1.jpg', '/venues/gaming-arena-2.jpg'],
              status: 'maintenance',
              commissionRate: 18,
              totalEvents: 156,
              rating: 4.9,
              reviews: 890,
              features: {
                spatialAudio: true,
                hapticFeedback: true,
                eyeTracking: false,
                handTracking: true,
                multiplayer: true
              },
              technicalSpecs: {
                minBandwidth: '200 Mbps',
                maxLatency: '5ms',
                renderQuality: 'ultra',
                supportedPlatforms: ['PC VR', 'Standalone']
              },
              createdAt: new Date('2024-07-10'),
              updatedAt: new Date('2025-01-05')
            }
          ];

          const mockCalendarEvents: CalendarEvent[] = [
            {
              id: 'cal1',
              title: 'Neon Nights Setup',
              start: new Date('2025-01-20T08:00:00'),
              end: new Date('2025-01-20T12:00:00'),
              venueId: 'venue1',
              venueName: 'Neon Arena',
              status: 'setup',
              attendees: 50,
              eventType: 'recording',
              requirements: ['360° cameras', 'Spatial audio setup', 'Lighting calibration']
            },
            {
              id: 'cal2',
              title: 'Tech Conference Filming',
              start: new Date('2025-01-22T14:00:00'),
              end: new Date('2025-01-22T18:00:00'),
              venueId: 'venue2',
              venueName: 'CyberSpace Hall',
              status: 'filming',
              attendees: 200,
              eventType: 'live',
              requirements: ['Multi-camera setup', 'Stream encoding', 'Presenter tracking']
            },
            {
              id: 'cal3',
              title: 'Gaming Arena Maintenance',
              start: new Date('2025-01-25T09:00:00'),
              end: new Date('2025-01-25T17:00:00'),
              venueId: 'venue3',
              venueName: 'Gaming Arena VR',
              status: 'maintenance',
              attendees: 10,
              eventType: 'testing',
              requirements: ['System upgrade', 'Network optimization', 'Hardware testing']
            }
          ];

          const mockRequirements: TechnicalRequirement[] = [
            {
              id: 'req1',
              category: 'cameras',
              name: 'Upgrade 360° Camera System',
              description: 'Install latest 8K 360° cameras for better video quality',
              status: 'in-progress',
              priority: 'high',
              estimatedCost: 15000,
              assignedTo: 'Tech Team A',
              dueDate: new Date('2025-02-15')
            },
            {
              id: 'req2',
              category: 'networking',
              name: 'Fiber Optic Infrastructure',
              description: 'Install dedicated fiber connection for ultra-low latency',
              status: 'pending',
              priority: 'critical',
              estimatedCost: 25000,
              dueDate: new Date('2025-03-01')
            },
            {
              id: 'req3',
              category: 'audio',
              name: 'Spatial Audio Calibration',
              description: 'Fine-tune spatial audio system for optimal immersion',
              status: 'completed',
              priority: 'medium',
              estimatedCost: 5000,
              assignedTo: 'Audio Team',
              dueDate: new Date('2025-01-10')
            }
          ];

          const mockStats: VenueStats = {
            totalVenues: mockVenues.length,
            activeVenues: mockVenues.filter(v => v.status === 'active').length,
            totalCapacity: mockVenues.reduce((sum, v) => sum + v.capacity, 0),
            utilizationRate: 78.5,
            averageRating: 4.7,
            totalRevenue: 125000,
            monthlyBookings: 42
          };

          set({
            venues: mockVenues,
            calendarEvents: mockCalendarEvents,
            technicalRequirements: mockRequirements,
            stats: mockStats
          });
        }
      }),
      {
        name: 'venue-store',
        partialize: (state) => ({
          venues: state.venues,
          calendarEvents: state.calendarEvents,
          technicalRequirements: state.technicalRequirements,
          selectedVenue: state.selectedVenue,
        }),
      }
    ),
    { name: 'venue-store' }
  )
); 