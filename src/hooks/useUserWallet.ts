import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useAccount, useBalance, useEnsName, useEnsAvatar, useChainId } from 'wagmi';
import { useEffect } from 'react';
import { type Address } from 'viem';
import { mainnet } from 'wagmi/chains';
import { formatUnits } from 'viem';

// Wallet state interface
interface WalletState {
  // Core wallet data
  address?: Address;
  ensName?: string;
  ensAvatar?: string;
  chainId?: number;
  
  // Balance information
  balance?: {
    value: bigint;
    decimals: number;
    formatted: string;
    symbol: string;
  };
  
  // Connection status
  isConnected: boolean;
  isConnecting: boolean;
  isReconnecting: boolean;
  
  // User preferences
  preferredNetwork: number;
  hideBalance: boolean;
  
  // Actions
  setAddress: (address?: Address) => void;
  setEnsData: (ensName?: string, ensAvatar?: string) => void;
  setBalance: (balance: WalletState['balance']) => void;
  setConnectionStatus: (status: { isConnected: boolean; isConnecting: boolean; isReconnecting: boolean }) => void;
  setChainId: (chainId: number) => void;
  setPreferredNetwork: (chainId: number) => void;
  toggleHideBalance: () => void;
  disconnect: () => void;
  reset: () => void;
}

// Zustand store for wallet state
export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      // Initial state
      address: undefined,
      ensName: undefined,
      ensAvatar: undefined,
      chainId: undefined,
      balance: undefined,
      isConnected: false,
      isConnecting: false,
      isReconnecting: false,
      preferredNetwork: 1, // Mainnet by default
      hideBalance: false,

      // Actions
      setAddress: (address) => set({ address }),
      
      setEnsData: (ensName, ensAvatar) => set({ ensName, ensAvatar }),
      
      setBalance: (balance) => set({ balance }),
      
      setConnectionStatus: (status) => set({
        isConnected: status.isConnected,
        isConnecting: status.isConnecting,
        isReconnecting: status.isReconnecting,
      }),
      
      setChainId: (chainId) => set({ chainId }),
      
      setPreferredNetwork: (chainId) => set({ preferredNetwork: chainId }),
      
      toggleHideBalance: () => set((state) => ({ hideBalance: !state.hideBalance })),
      
      disconnect: () => set({
        address: undefined,
        ensName: undefined,
        ensAvatar: undefined,
        chainId: undefined,
        balance: undefined,
        isConnected: false,
        isConnecting: false,
        isReconnecting: false,
      }),
      
      reset: () => set({
        address: undefined,
        ensName: undefined,
        ensAvatar: undefined,
        chainId: undefined,
        balance: undefined,
        isConnected: false,
        isConnecting: false,
        isReconnecting: false,
        preferredNetwork: 1,
        hideBalance: false,
      }),
    }),
    {
      name: 'envimerse-wallet-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist user preferences, not dynamic data
        preferredNetwork: state.preferredNetwork,
        hideBalance: state.hideBalance,
      }),
    }
  )
);

// Main wallet hook that syncs with wagmi
export function useUserWallet() {
  const {
    address,
    ensName,
    ensAvatar,
    chainId,
    balance,
    isConnected,
    isConnecting,
    isReconnecting,
    preferredNetwork,
    hideBalance,
    setAddress,
    setEnsData,
    setBalance,
    setConnectionStatus,
    setChainId,
    setPreferredNetwork,
    toggleHideBalance,
    disconnect,
    reset,
  } = useWalletStore();

  // Sync with wagmi hooks
  const wagmiAccount = useAccount();
  const wagmiChainId = useChainId();
  
  // ENS data (only fetch for mainnet)
  const { data: wagmiEnsName } = useEnsName({
    address: wagmiAccount.address,
    chainId: mainnet.id,
    query: { enabled: !!wagmiAccount.address && wagmiChainId === mainnet.id }
  });
  
  const { data: wagmiEnsAvatar } = useEnsAvatar({
    name: wagmiEnsName || undefined,
    chainId: mainnet.id,
    query: { enabled: !!wagmiEnsName }
  });

  // Balance data
  const { data: wagmiBalance } = useBalance({
    address: wagmiAccount.address,
    query: { enabled: !!wagmiAccount.address }
  });

  // Sync wagmi state with zustand store
  useEffect(() => {
    setAddress(wagmiAccount.address);
  }, [wagmiAccount.address, setAddress]);

  useEffect(() => {
    setEnsData(wagmiEnsName || undefined, wagmiEnsAvatar || undefined);
  }, [wagmiEnsName, wagmiEnsAvatar, setEnsData]);

  useEffect(() => {
    if (wagmiBalance) {
      setBalance({
        value: wagmiBalance.value,
        decimals: wagmiBalance.decimals,
        formatted: wagmiBalance.formatted,
        symbol: wagmiBalance.symbol,
      });
    } else {
      setBalance(undefined);
    }
  }, [wagmiBalance, setBalance]);

  useEffect(() => {
    setConnectionStatus({
      isConnected: wagmiAccount.isConnected,
      isConnecting: wagmiAccount.isConnecting,
      isReconnecting: wagmiAccount.isReconnecting,
    });
  }, [wagmiAccount.isConnected, wagmiAccount.isConnecting, wagmiAccount.isReconnecting, setConnectionStatus]);

  useEffect(() => {
    setChainId(wagmiChainId);
  }, [wagmiChainId, setChainId]);

  // Utility functions
  const getFormattedBalance = (decimals = 4): string => {
    if (!balance || hideBalance) return hideBalance ? '***' : '0.00';
    
    const numBalance = parseFloat(balance.formatted);
    return numBalance.toFixed(decimals);
  };

  const getShortAddress = (length = 4): string => {
    if (!address) return '';
    return `${address.slice(0, 2 + length)}...${address.slice(-length)}`;
  };

  const getDisplayName = (): string => {
    if (ensName) return ensName;
    if (address) return getShortAddress();
    return 'Not Connected';
  };

  const hasBalance = (): boolean => {
    return balance ? balance.value > BigInt(0) : false;
  };

  const getBalanceInWei = (): bigint => {
    return balance?.value || BigInt(0);
  };

  const isOnPreferredNetwork = (): boolean => {
    return chainId === preferredNetwork;
  };

  // Network utilities
  const getNetworkName = (): string => {
    switch (chainId) {
      case 1: return 'Ethereum';
      case 137: return 'Polygon';
      case 8453: return 'Base';
      case 42161: return 'Arbitrum';
      case 10: return 'Optimism';
      default: return 'Unknown Network';
    }
  };

  const isTestnet = (): boolean => {
    const testnets = [5, 11155111, 80001, 84532]; // Goerli, Sepolia, Mumbai, Base Sepolia
    return chainId ? testnets.includes(chainId) : false;
  };

  return {
    // Core data
    address,
    ensName,
    ensAvatar,
    chainId,
    balance,
    
    // Connection status
    isConnected,
    isConnecting,
    isReconnecting,
    
    // User preferences
    preferredNetwork,
    hideBalance,
    
    // Utility functions
    getFormattedBalance,
    getShortAddress,
    getDisplayName,
    hasBalance,
    getBalanceInWei,
    isOnPreferredNetwork,
    getNetworkName,
    isTestnet,
    
    // Actions
    setPreferredNetwork,
    toggleHideBalance,
    disconnect,
    reset,
  };
}

// Derived hooks for specific use cases
export function useWalletAddress() {
  return useWalletStore((state) => state.address);
}

export function useWalletBalance() {
  const { balance, hideBalance, getFormattedBalance, hasBalance, getBalanceInWei } = useUserWallet();
  
  return {
    balance,
    hideBalance,
    formatted: getFormattedBalance(),
    hasBalance: hasBalance(),
    wei: getBalanceInWei(),
  };
}

export function useWalletConnection() {
  return useWalletStore((state) => ({
    isConnected: state.isConnected,
    isConnecting: state.isConnecting,
    isReconnecting: state.isReconnecting,
  }));
}

export function useWalletEns() {
  return useWalletStore((state) => ({
    ensName: state.ensName,
    ensAvatar: state.ensAvatar,
  }));
}

export function useWalletNetwork() {
  const { chainId, preferredNetwork, isOnPreferredNetwork, getNetworkName, isTestnet } = useUserWallet();
  
  return {
    chainId,
    preferredNetwork,
    isOnPreferred: isOnPreferredNetwork(),
    networkName: getNetworkName(),
    isTestnet: isTestnet(),
  };
}

// Wallet utilities hook
export function useWalletUtils() {
  const { getShortAddress, getDisplayName, getFormattedBalance } = useUserWallet();
  
  return {
    formatAddress: getShortAddress,
    getDisplayName,
    formatBalance: getFormattedBalance,
  };
}

 