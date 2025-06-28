import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SiweMessage } from 'siwe';
import { type Address, type Hash } from 'viem';
import { type SupportedChain } from './wagmi';

// User authentication state
interface AuthState {
  isAuthenticated: boolean;
  address?: Address;
  ens?: string;
  avatar?: string;
  chainId?: number;
  siweMessage?: string;
  siweSignature?: string;
  nonce?: string;
}

// Transaction state management
interface TransactionState {
  pending: Record<string, boolean>;
  completed: Record<string, Hash>;
  failed: Record<string, string>;
}

// VR Ticket NFT state
interface TicketState {
  owned: Array<{
    tokenId: string;
    eventId: string;
    eventTitle: string;
    eventDate: string;
    venue: string;
    streamingUrl?: string;
    isUsed: boolean;
  }>;
  loading: boolean;
}

// Payment and currency preferences
interface PaymentState {
  preferredCurrency: 'USD' | 'ETH' | 'USDC' | 'USDT' | 'DAI';
  paymentMethod: 'crypto' | 'fiat';
  onRampWidget: {
    isOpen: boolean;
    targetAmount?: number;
    targetCurrency?: string;
  };
}

// Notification system
interface NotificationState {
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    timestamp: number;
    txHash?: Hash;
    chainId?: number;
  }>;
}

// Complete Web3 store interface
interface Web3Store extends AuthState, TransactionState, TicketState, PaymentState, NotificationState {
  // Authentication actions
  authenticate: (address: Address, chainId: number, siweData?: { message: string; signature: string }) => void;
  logout: () => void;
  updateProfile: (data: { ens?: string; avatar?: string }) => void;
  
  // SIWE actions
  generateNonce: () => string;
  createSiweMessage: (address: Address, chainId: number, nonce: string) => SiweMessage;
  verifySiweSignature: (message: string, signature: string) => Promise<boolean>;
  
  // Transaction actions
  addPendingTransaction: (key: string) => void;
  markTransactionCompleted: (key: string, hash: Hash) => void;
  markTransactionFailed: (key: string, error: string) => void;
  clearTransaction: (key: string) => void;
  
  // Ticket actions
  setTickets: (tickets: TicketState['owned']) => void;
  addTicket: (ticket: TicketState['owned'][0]) => void;
  markTicketUsed: (tokenId: string) => void;
  setTicketsLoading: (loading: boolean) => void;
  
  // Payment actions
  setPreferredCurrency: (currency: PaymentState['preferredCurrency']) => void;
  setPaymentMethod: (method: PaymentState['paymentMethod']) => void;
  openOnRampWidget: (amount?: number, currency?: string) => void;
  closeOnRampWidget: () => void;
  
  // Notification actions
  addNotification: (notification: Omit<NotificationState['notifications'][0], 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useWeb3Store = create<Web3Store>()(
  persist(
    (set, get) => ({
      // Initial authentication state
      isAuthenticated: false,
      address: undefined,
      ens: undefined,
      avatar: undefined,
      chainId: undefined,
      siweMessage: undefined,
      siweSignature: undefined,
      nonce: undefined,

      // Initial transaction state
      pending: {},
      completed: {},
      failed: {},

      // Initial ticket state
      owned: [],
      loading: false,

      // Initial payment state
      preferredCurrency: 'USD',
      paymentMethod: 'crypto',
      onRampWidget: {
        isOpen: false,
      },

      // Initial notification state
      notifications: [],

      // Authentication actions
      authenticate: (address, chainId, siweData) => set({
        isAuthenticated: true,
        address,
        chainId,
        siweMessage: siweData?.message,
        siweSignature: siweData?.signature,
      }),

      logout: () => set({
        isAuthenticated: false,
        address: undefined,
        ens: undefined,
        avatar: undefined,
        chainId: undefined,
        siweMessage: undefined,
        siweSignature: undefined,
        nonce: undefined,
        owned: [],
        pending: {},
        completed: {},
        failed: {},
      }),

      updateProfile: (data) => set(state => ({
        ...state,
        ens: data.ens ?? state.ens,
        avatar: data.avatar ?? state.avatar,
      })),

      // SIWE actions
      generateNonce: () => {
        const nonce = Math.random().toString(36).substring(2, 15);
        set({ nonce });
        return nonce;
      },

      createSiweMessage: (address, chainId, nonce) => {
        return new SiweMessage({
          domain: typeof window !== 'undefined' ? window.location.host : 'envimerse.com',
          address,
          statement: 'Sign in to Envimerse - Your VR Entertainment Platform',
          uri: typeof window !== 'undefined' ? window.location.origin : 'https://envimerse.com',
          version: '1',
          chainId,
          nonce,
          issuedAt: new Date().toISOString(),
          expirationTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
        });
      },

      verifySiweSignature: async (message, signature) => {
        try {
          const siweMessage = new SiweMessage(message);
          const result = await siweMessage.verify({ signature });
          return result.success;
        } catch (error) {
          console.error('SIWE verification failed:', error);
          return false;
        }
      },

      // Transaction actions
      addPendingTransaction: (key) => set(state => ({
        pending: { ...state.pending, [key]: true },
      })),

      markTransactionCompleted: (key, hash) => set(state => ({
        pending: { ...state.pending, [key]: false },
        completed: { ...state.completed, [key]: hash },
      })),

      markTransactionFailed: (key, error) => set(state => ({
        pending: { ...state.pending, [key]: false },
        failed: { ...state.failed, [key]: error },
      })),

      clearTransaction: (key) => set(state => {
        const { [key]: _, ...newPending } = state.pending;
        const { [key]: __, ...newCompleted } = state.completed;
        const { [key]: ___, ...newFailed } = state.failed;
        return {
          pending: newPending,
          completed: newCompleted,
          failed: newFailed,
        };
      }),

      // Ticket actions
      setTickets: (tickets) => set({ owned: tickets }),

      addTicket: (ticket) => set(state => ({
        owned: [...state.owned, ticket],
      })),

      markTicketUsed: (tokenId) => set(state => ({
        owned: state.owned.map(ticket =>
          ticket.tokenId === tokenId ? { ...ticket, isUsed: true } : ticket
        ),
      })),

      setTicketsLoading: (loading) => set({ loading }),

      // Payment actions
      setPreferredCurrency: (currency) => set({ preferredCurrency: currency }),

      setPaymentMethod: (method) => set({ paymentMethod: method }),

      openOnRampWidget: (amount, currency) => set({
        onRampWidget: {
          isOpen: true,
          targetAmount: amount,
          targetCurrency: currency,
        },
      }),

      closeOnRampWidget: () => set({
        onRampWidget: { isOpen: false },
      }),

      // Notification actions
      addNotification: (notification) => set(state => ({
        notifications: [
          ...state.notifications,
          {
            ...notification,
            id: Math.random().toString(36).substring(2),
            timestamp: Date.now(),
          },
        ],
      })),

      removeNotification: (id) => set(state => ({
        notifications: state.notifications.filter(n => n.id !== id),
      })),

      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'envimerse-web3-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist essential auth and preference data
        isAuthenticated: state.isAuthenticated,
        address: state.address,
        ens: state.ens,
        avatar: state.avatar,
        chainId: state.chainId,
        preferredCurrency: state.preferredCurrency,
        paymentMethod: state.paymentMethod,
        // Don't persist sensitive data like signatures or temporary states
      }),
    }
  )
);

// Utility selectors for common use cases
export const useAuthState = () => useWeb3Store(state => ({
  isAuthenticated: state.isAuthenticated,
  address: state.address,
  ens: state.ens,
  avatar: state.avatar,
  chainId: state.chainId,
}));

export const useTransactionState = () => useWeb3Store(state => ({
  pending: state.pending,
  completed: state.completed,
  failed: state.failed,
}));

export const useTicketState = () => useWeb3Store(state => ({
  owned: state.owned,
  loading: state.loading,
}));

export const usePaymentState = () => useWeb3Store(state => ({
  preferredCurrency: state.preferredCurrency,
  paymentMethod: state.paymentMethod,
  onRampWidget: state.onRampWidget,
}));

export const useNotifications = () => useWeb3Store(state => ({
  notifications: state.notifications,
})); 