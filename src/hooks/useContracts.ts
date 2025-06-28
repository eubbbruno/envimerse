import { useCallback } from 'react';
import { 
  useAccount, 
  useChainId, 
  useReadContract, 
  useWriteContract, 
  useWaitForTransactionReceipt,
  useBalance,
  useToken
} from 'wagmi';
import { type Address, type Hash, parseEther, formatEther, erc20Abi } from 'viem';
import { useWeb3Store } from '@/lib/web3-store';
import { contractAddresses, paymentTokens, type SupportedChain } from '@/lib/wagmi';

// VR Ticket NFT ABI (simplified for example)
const VR_TICKET_ABI = [
  {
    name: 'mint',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'eventId', type: 'uint256' },
      { name: 'ticketType', type: 'uint8' },
      { name: 'metadata', type: 'string' }
    ],
    outputs: [{ name: 'tokenId', type: 'uint256' }]
  },
  {
    name: 'getTicketInfo',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [
      { name: 'eventId', type: 'uint256' },
      { name: 'owner', type: 'address' },
      { name: 'isUsed', type: 'bool' },
      { name: 'metadata', type: 'string' }
    ]
  },
  {
    name: 'useTicket',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [{ name: 'success', type: 'bool' }]
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: 'balance', type: 'uint256' }]
  },
  {
    name: 'tokenOfOwnerByIndex',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'index', type: 'uint256' }
    ],
    outputs: [{ name: 'tokenId', type: 'uint256' }]
  }
] as const;

// Marketplace ABI (simplified)
const MARKETPLACE_ABI = [
  {
    name: 'listEvent',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'eventId', type: 'uint256' },
      { name: 'price', type: 'uint256' },
      { name: 'paymentToken', type: 'address' },
      { name: 'maxTickets', type: 'uint256' }
    ],
    outputs: []
  },
  {
    name: 'purchaseTicket',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'eventId', type: 'uint256' },
      { name: 'quantity', type: 'uint256' }
    ],
    outputs: [{ name: 'tokenIds', type: 'uint256[]' }]
  },
  {
    name: 'getEventPrice',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'eventId', type: 'uint256' }],
    outputs: [
      { name: 'price', type: 'uint256' },
      { name: 'paymentToken', type: 'address' }
    ]
  }
] as const;

// Helper function to get chain name from ID
function getChainName(chainId: number): keyof typeof contractAddresses {
  switch (chainId) {
    case 1: return 'mainnet';
    case 137: return 'polygon';
    case 8453: return 'base';
    default: return 'mainnet';
  }
}

// Custom hook for VR Ticket NFT operations
export function useVRTicketContract() {
  const { address } = useAccount();
  const rawChainId = useChainId();
  const chainKey = getChainName(rawChainId);
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { addPendingTransaction, markTransactionCompleted, markTransactionFailed, addNotification } = useWeb3Store();

  const contractAddress = contractAddresses[chainKey]?.vrTicketNFT as Address;

  // Read user's ticket balance
  const { data: ticketBalance } = useReadContract({
    address: contractAddress,
    abi: VR_TICKET_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address && !!contractAddress }
  });

  // Get ticket information
  const getTicketInfo = useCallback((tokenId: bigint) => {
    return useReadContract({
      address: contractAddress,
      abi: VR_TICKET_ABI,
      functionName: 'getTicketInfo',
      args: [tokenId],
      query: { enabled: !!contractAddress }
    });
  }, [contractAddress]);

  // Mint a new VR ticket
  const mintTicket = useCallback(async (
    eventId: bigint,
    ticketType: number,
    metadata: string
  ) => {
    if (!address || !contractAddress) return;

    const key = `mint-ticket-${eventId}-${Date.now()}`;
    addPendingTransaction(key);

    try {
      await writeContract({
        address: contractAddress,
        abi: VR_TICKET_ABI,
        functionName: 'mint',
        args: [address, eventId, ticketType, metadata],
      });

      addNotification({
        type: 'info',
        title: 'Transaction Submitted',
        message: 'VR ticket minting transaction has been submitted',
      });
    } catch (error) {
      markTransactionFailed(key, error instanceof Error ? error.message : 'Unknown error');
      addNotification({
        type: 'error',
        title: 'Transaction Failed',
        message: 'Failed to mint VR ticket',
      });
    }
  }, [address, contractAddress, writeContract, addPendingTransaction, markTransactionFailed, addNotification]);

  // Use a VR ticket to access event
  const useTicket = useCallback(async (tokenId: bigint) => {
    if (!address || !contractAddress) return;

    const key = `use-ticket-${tokenId}-${Date.now()}`;
    addPendingTransaction(key);

    try {
      await writeContract({
        address: contractAddress,
        abi: VR_TICKET_ABI,
        functionName: 'useTicket',
        args: [tokenId],
      });

      addNotification({
        type: 'info',
        title: 'Accessing Event',
        message: 'Using VR ticket to access event',
      });
    } catch (error) {
      markTransactionFailed(key, error instanceof Error ? error.message : 'Unknown error');
      addNotification({
        type: 'error',
        title: 'Access Failed',
        message: 'Failed to use VR ticket',
      });
    }
  }, [address, contractAddress, writeContract, addPendingTransaction, markTransactionFailed, addNotification]);

  return {
    contractAddress,
    ticketBalance: ticketBalance as bigint | undefined,
    getTicketInfo,
    mintTicket,
    useTicket,
    isPending,
    error,
    hash
  };
}

// Custom hook for Marketplace operations
export function useMarketplaceContract() {
  const { address } = useAccount();
  const rawChainId = useChainId();
  const chainKey = getChainName(rawChainId);
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { addPendingTransaction, markTransactionCompleted, markTransactionFailed, addNotification } = useWeb3Store();

  const contractAddress = contractAddresses[chainKey]?.marketplace as Address;

  // Get event pricing information
  const getEventPrice = useCallback((eventId: bigint) => {
    return useReadContract({
      address: contractAddress,
      abi: MARKETPLACE_ABI,
      functionName: 'getEventPrice',
      args: [eventId],
      query: { enabled: !!contractAddress }
    });
  }, [contractAddress]);

  // Purchase VR event tickets
  const purchaseTicket = useCallback(async (
    eventId: bigint,
    quantity: bigint,
    paymentValue?: bigint
  ) => {
    if (!address || !contractAddress) return;

    const key = `purchase-${eventId}-${Date.now()}`;
    addPendingTransaction(key);

    try {
      await writeContract({
        address: contractAddress,
        abi: MARKETPLACE_ABI,
        functionName: 'purchaseTicket',
        args: [eventId, quantity],
        value: paymentValue, // For ETH payments
      });

      addNotification({
        type: 'info',
        title: 'Purchase Submitted',
        message: `Purchasing ${quantity} VR ticket(s) for event`,
      });
    } catch (error) {
      markTransactionFailed(key, error instanceof Error ? error.message : 'Unknown error');
      addNotification({
        type: 'error',
        title: 'Purchase Failed',
        message: 'Failed to purchase VR tickets',
      });
    }
  }, [address, contractAddress, writeContract, addPendingTransaction, markTransactionFailed, addNotification]);

  // List an event for sale (for venue owners/resellers)
  const listEvent = useCallback(async (
    eventId: bigint,
    price: bigint,
    paymentToken: Address,
    maxTickets: bigint
  ) => {
    if (!address || !contractAddress) return;

    const key = `list-event-${eventId}-${Date.now()}`;
    addPendingTransaction(key);

    try {
      await writeContract({
        address: contractAddress,
        abi: MARKETPLACE_ABI,
        functionName: 'listEvent',
        args: [eventId, price, paymentToken, maxTickets],
      });

      addNotification({
        type: 'info',
        title: 'Event Listed',
        message: 'Event has been listed on the marketplace',
      });
    } catch (error) {
      markTransactionFailed(key, error instanceof Error ? error.message : 'Unknown error');
      addNotification({
        type: 'error',
        title: 'Listing Failed',
        message: 'Failed to list event',
      });
    }
  }, [address, contractAddress, writeContract, addPendingTransaction, markTransactionFailed, addNotification]);

  return {
    contractAddress,
    getEventPrice,
    purchaseTicket,
    listEvent,
    isPending,
    error,
    hash
  };
}

// Custom hook for ERC20 token operations
export function useTokenContract(tokenAddress: Address) {
  const { address } = useAccount();
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { addPendingTransaction, markTransactionCompleted, markTransactionFailed, addNotification } = useWeb3Store();

  // Get token balance
  const { data: balance } = useBalance({
    address,
    token: tokenAddress,
    query: { enabled: !!address && !!tokenAddress }
  });

  // Get token information
  const { data: tokenInfo } = useToken({
    address: tokenAddress,
    query: { enabled: !!tokenAddress }
  });

  // Approve token spending
  const approveToken = useCallback(async (
    spender: Address,
    amount: bigint
  ) => {
    if (!address || !tokenAddress) return;

    const key = `approve-${tokenAddress}-${Date.now()}`;
    addPendingTransaction(key);

    try {
      await writeContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'approve',
        args: [spender, amount],
      });

      addNotification({
        type: 'info',
        title: 'Approval Submitted',
        message: `Approving ${tokenInfo?.symbol || 'token'} spending`,
      });
    } catch (error) {
      markTransactionFailed(key, error instanceof Error ? error.message : 'Unknown error');
      addNotification({
        type: 'error',
        title: 'Approval Failed',
        message: 'Failed to approve token spending',
      });
    }
  }, [address, tokenAddress, writeContract, addPendingTransaction, markTransactionFailed, addNotification, tokenInfo]);

  return {
    balance,
    tokenInfo,
    approveToken,
    isPending,
    error,
    hash
  };
}

// Custom hook for transaction monitoring
export function useTransactionMonitor(hash?: Hash) {
  const { data, isLoading, isSuccess, isError } = useWaitForTransactionReceipt({
    hash,
    query: { enabled: !!hash }
  });

  const { markTransactionCompleted, markTransactionFailed, addNotification } = useWeb3Store();

  // Monitor transaction status and update store
  useCallback(() => {
    if (hash && isSuccess && data) {
      markTransactionCompleted(`tx-${hash}`, hash);
      addNotification({
        type: 'success',
        title: 'Transaction Confirmed',
        message: 'Transaction has been confirmed on the blockchain',
        txHash: hash,
        chainId: data.chainId,
      });
    }

    if (hash && isError) {
      markTransactionFailed(`tx-${hash}`, 'Transaction failed');
      addNotification({
        type: 'error',
        title: 'Transaction Failed',
        message: 'Transaction was reverted or failed',
        txHash: hash,
      });
    }
  }, [hash, isSuccess, isError, data, markTransactionCompleted, markTransactionFailed, addNotification]);

  return {
    receipt: data,
    isLoading,
    isSuccess,
    isError
  };
}

// Custom hook for multi-chain operations
export function useMultiChainBalance() {
  const { address } = useAccount();
  const rawChainId = useChainId();
  const chainKey = getChainName(rawChainId);

  // Get ETH balance
  const { data: ethBalance } = useBalance({
    address,
    query: { enabled: !!address }
  });

  // Get token addresses safely
  const tokens = paymentTokens[chainKey];
  const usdcAddress = tokens?.USDC as Address | undefined;
  const usdtAddress = ('USDT' in tokens ? tokens.USDT : undefined) as Address | undefined;

  // Get USDC balance
  const { data: usdcBalance } = useBalance({
    address,
    token: usdcAddress,
    query: { enabled: !!address && !!usdcAddress }
  });

  // Get USDT balance (only if available on this chain)
  const { data: usdtBalance } = useBalance({
    address,
    token: usdtAddress,
    query: { enabled: !!address && !!usdtAddress }
  });

  return {
    eth: ethBalance,
    usdc: usdcBalance,
    usdt: usdtBalance,
    chainId: rawChainId,
    chainKey
  };
} 