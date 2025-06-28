import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { 
  mainnet, 
  polygon, 
  optimism, 
  arbitrum, 
  base,
  bsc,
  avalanche,
  gnosis,
  fantom,
  celo
} from 'wagmi/chains'

// Enhanced chain configuration for maximum compatibility
const chains = [
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  bsc,
  avalanche,
  gnosis,
  fantom,
  celo
] as const

// Get environment variables with fallbacks
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID'
const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || ''

export const config = getDefaultConfig({
  appName: 'Envimerse - VR Entertainment Platform',
  projectId: walletConnectProjectId,
  chains,
  ssr: true,
})

// Thirdweb configuration for NFT marketplace
export const thirdwebChains = {
  mainnet: {
    chainId: 1,
    rpc: [`https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`],
  },
  polygon: {
    chainId: 137,
    rpc: [`https://polygon-mainnet.g.alchemy.com/v2/${alchemyApiKey}`],
  },
  base: {
    chainId: 8453,
    rpc: [`https://base-mainnet.g.alchemy.com/v2/${alchemyApiKey}`],
  },
}

// Contract addresses for different chains
export const contractAddresses = {
  mainnet: {
    vrTicketNFT: '0x...',
    marketplace: '0x...',
    revenueSharing: '0x...',
  },
  polygon: {
    vrTicketNFT: '0x...',
    marketplace: '0x...',
    revenueSharing: '0x...',
  },
  base: {
    vrTicketNFT: '0x...',
    marketplace: '0x...',
    revenueSharing: '0x...',
  },
} as const

// Supported payment tokens
export const paymentTokens = {
  mainnet: {
    USDC: '0xA0b86a33E6441f8C89f027ed5F3bEd9b8d7C4B1E',
    USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  },
  polygon: {
    USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    DAI: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  },
  base: {
    USDC: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  },
} as const

export { chains }
export type SupportedChain = typeof chains[number]
export type ContractAddress = keyof typeof contractAddresses.mainnet 