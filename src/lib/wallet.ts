import { createConfig, http } from 'wagmi';
import { mainnet, base, polygon, arbitrum, optimism } from 'wagmi/chains';
import { 
  metaMask,
  coinbaseWallet,
  walletConnect,
  injected
} from 'wagmi/connectors';
import { type Address, type Chain } from 'viem';

// Environment variables with fallbacks
const WALLET_CONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';
const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '';

// Chain configuration with custom RPC endpoints
export const supportedChains = [
  {
    ...mainnet,
    rpcUrls: {
      ...mainnet.rpcUrls,
      alchemy: {
        http: [`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`],
        webSocket: [`wss://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`],
      },
    },
  },
  {
    ...base,
    rpcUrls: {
      ...base.rpcUrls,
      alchemy: {
        http: [`https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`],
        webSocket: [`wss://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`],
      },
    },
  },
  {
    ...polygon,
    rpcUrls: {
      ...polygon.rpcUrls,
      alchemy: {
        http: [`https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`],
        webSocket: [`wss://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`],
      },
    },
  },
  arbitrum,
  optimism,
] as const;

// Wallet connectors configuration
export const connectors = [
  // MetaMask Connector
  metaMask({
    dappMetadata: {
      name: 'Envimerse',
      url: 'https://envimerse.com',
      iconUrl: '/logo.png',
    },
  }),

  // Coinbase Wallet Connector
  coinbaseWallet({
    appName: 'Envimerse - VR Entertainment Platform',
    appLogoUrl: '/logo.png',
    preference: 'smartWalletOnly', // Use Smart Wallet by default
  }),

  // WalletConnect Connector
  walletConnect({
    projectId: WALLET_CONNECT_PROJECT_ID,
    metadata: {
      name: 'Envimerse',
      description: 'VR Entertainment Platform - Experience events in virtual reality',
      url: 'https://envimerse.com',
      icons: ['/logo.png'],
    },
    showQrModal: true,
  }),

  // Injected Connector (for other browser wallets)
  injected({
    shimDisconnect: true,
  }),
];

// Wagmi configuration
export const wagmiConfig = createConfig({
  chains: supportedChains,
  connectors,
  transports: {
    [mainnet.id]: http(ALCHEMY_API_KEY 
      ? `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
      : undefined
    ),
    [base.id]: http(ALCHEMY_API_KEY 
      ? `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
      : undefined
    ),
    [polygon.id]: http(ALCHEMY_API_KEY 
      ? `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
      : undefined
    ),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
  },
  ssr: true,
});

// Chain utilities
export const getChainById = (chainId: number): Chain | undefined => {
  return supportedChains.find(chain => chain.id === chainId);
};

export const getChainName = (chainId: number): string => {
  const chain = getChainById(chainId);
  return chain?.name || 'Unknown Chain';
};

export const isChainSupported = (chainId: number): boolean => {
  return supportedChains.some(chain => chain.id === chainId);
};

// Network switching utilities
export const switchToChain = async (chainId: number) => {
  if (!window.ethereum) {
    throw new Error('No wallet detected');
  }

  const chain = getChainById(chainId);
  if (!chain) {
    throw new Error(`Chain ${chainId} not supported`);
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
  } catch (error: any) {
    // Chain not added to wallet
    if (error.code === 4902) {
      await addChainToWallet(chain);
    } else {
      throw error;
    }
  }
};

export const addChainToWallet = async (chain: Chain) => {
  if (!window.ethereum) {
    throw new Error('No wallet detected');
  }

  await window.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: `0x${chain.id.toString(16)}`,
        chainName: chain.name,
        nativeCurrency: chain.nativeCurrency,
        rpcUrls: [chain.rpcUrls.default.http[0]],
        blockExplorerUrls: chain.blockExplorers 
          ? [chain.blockExplorers.default.url]
          : undefined,
      },
    ],
  });
};

// Wallet connection states
export type WalletConnectionStatus = 
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'error';

// Wallet information interface
export interface WalletInfo {
  address?: Address;
  chainId?: number;
  chainName?: string;
  isConnected: boolean;
  isConnecting: boolean;
  isReconnecting: boolean;
  connector?: string;
  status: WalletConnectionStatus;
}

// Contract addresses by chain
export const CONTRACT_ADDRESSES = {
  [mainnet.id]: {
    vrTicketNFT: '0x...' as Address,
    marketplace: '0x...' as Address,
    paymentToken: '0xA0b86a33E6441f8C89f027ed5F3bEd9b8d7C4B1E' as Address, // USDC
  },
  [base.id]: {
    vrTicketNFT: '0x...' as Address,
    marketplace: '0x...' as Address,
    paymentToken: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as Address, // USDC
  },
  [polygon.id]: {
    vrTicketNFT: '0x...' as Address,
    marketplace: '0x...' as Address,
    paymentToken: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174' as Address, // USDC
  },
} as const;

// Payment tokens by chain
export const PAYMENT_TOKENS = {
  [mainnet.id]: [
    { address: '0xA0b86a33E6441f8C89f027ed5F3bEd9b8d7C4B1E' as Address, symbol: 'USDC', decimals: 6 },
    { address: '0xdAC17F958D2ee523a2206206994597C13D831ec7' as Address, symbol: 'USDT', decimals: 6 },
    { address: '0x6B175474E89094C44Da98b954EedeAC495271d0F' as Address, symbol: 'DAI', decimals: 18 },
  ],
  [base.id]: [
    { address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as Address, symbol: 'USDC', decimals: 6 },
  ],
  [polygon.id]: [
    { address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174' as Address, symbol: 'USDC', decimals: 6 },
    { address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F' as Address, symbol: 'USDT', decimals: 6 },
    { address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063' as Address, symbol: 'DAI', decimals: 18 },
  ],
} as const;

// Utility functions
export const formatAddress = (address: Address, length = 4): string => {
  return `${address.slice(0, 2 + length)}...${address.slice(-length)}`;
};

export const getExplorerUrl = (chainId: number, hash: string, type: 'tx' | 'address' = 'tx'): string => {
  const chain = getChainById(chainId);
  if (!chain?.blockExplorers) return '';
  
  const baseUrl = chain.blockExplorers.default.url;
  return `${baseUrl}/${type}/${hash}`;
};

// Error handling utilities
export class WalletError extends Error {
  constructor(
    message: string,
    public code?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'WalletError';
  }
}

export const parseWalletError = (error: any): WalletError => {
  if (error instanceof WalletError) return error;
  
  // Common wallet error codes
  switch (error.code) {
    case 4001:
      return new WalletError('User rejected the request', 4001);
    case 4100:
      return new WalletError('The requested account and/or method has not been authorized', 4100);
    case 4200:
      return new WalletError('The requested method is not supported', 4200);
    case 4900:
      return new WalletError('The provider is disconnected', 4900);
    case 4901:
      return new WalletError('The provider is disconnected from all chains', 4901);
    default:
      return new WalletError(error.message || 'Unknown wallet error', error.code);
  }
}; 