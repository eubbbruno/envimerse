import { 
  createPublicClient, 
  createWalletClient, 
  custom, 
  parseEther, 
  formatEther,
  parseUnits,
  formatUnits,
  type Address,
  type Hash,
  type TransactionReceipt,
  parseEventLogs
} from 'viem';
import { mainnet, base, polygon } from 'viem/chains';
import { CONTRACT_ADDRESSES, getChainById } from '@/lib/wallet';

// VR Ticket NFT Contract ABI
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
    name: 'getTicketPrice',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'eventId', type: 'uint256' },
      { name: 'ticketType', type: 'uint8' }
    ],
    outputs: [{ name: 'price', type: 'uint256' }]
  },
  {
    name: 'eventExists',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'eventId', type: 'uint256' }],
    outputs: [{ name: 'exists', type: 'bool' }]
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: 'balance', type: 'uint256' }]
  },
  // Events
  {
    name: 'TicketMinted',
    type: 'event',
    inputs: [
      { name: 'to', type: 'address', indexed: true },
      { name: 'tokenId', type: 'uint256', indexed: true },
      { name: 'eventId', type: 'uint256', indexed: true },
      { name: 'ticketType', type: 'uint8', indexed: false }
    ]
  }
] as const;

// Ticket types enum
export enum TicketType {
  GENERAL = 0,
  VIP = 1,
  BACKSTAGE = 2,
  EARLY_ACCESS = 3
}

// Mint ticket parameters interface
export interface MintTicketParams {
  to: Address;
  eventId: bigint;
  ticketType: TicketType;
  metadata: string;
  chainId: number;
}

// Transaction result interface
export interface MintTicketResult {
  hash: Hash;
  tokenId?: bigint;
  receipt?: TransactionReceipt;
  success: boolean;
  error?: string;
}

/**
 * Example: Mint VR Ticket NFT using viem
 * This function demonstrates how to interact with smart contracts using viem
 */
export async function mintVRTicket(params: MintTicketParams): Promise<MintTicketResult> {
  const { to, eventId, ticketType, metadata, chainId } = params;

  try {
    // 1. Get chain configuration
    const chain = getChainById(chainId);
    if (!chain) {
      throw new Error(`Unsupported chain ID: ${chainId}`);
    }

    // 2. Get contract address for the chain
    const contractAddress = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]?.vrTicketNFT;
    if (!contractAddress) {
      throw new Error(`VR Ticket contract not deployed on chain ${chainId}`);
    }

    // 3. Create public client for reading data
    const publicClient = createPublicClient({
      chain,
      transport: custom(window.ethereum!),
    });

    // 4. Create wallet client for writing transactions
    const walletClient = createWalletClient({
      chain,
      transport: custom(window.ethereum!),
    });

    // 5. Get user's account
    const [account] = await walletClient.getAddresses();
    if (!account) {
      throw new Error('No wallet connected');
    }

    // 6. Check if event exists
    const eventExists = await publicClient.readContract({
      address: contractAddress,
      abi: VR_TICKET_ABI,
      functionName: 'eventExists',
      args: [eventId],
    });

    if (!eventExists) {
      throw new Error(`Event ${eventId} does not exist`);
    }

    // 7. Get ticket price
    const ticketPrice = await publicClient.readContract({
      address: contractAddress,
      abi: VR_TICKET_ABI,
      functionName: 'getTicketPrice',
      args: [eventId, ticketType],
    });

    console.log(`Ticket price: ${formatEther(ticketPrice)} ETH`);

    // 8. Check user's balance
    const userBalance = await publicClient.getBalance({ address: account });
    if (userBalance < ticketPrice) {
      throw new Error(`Insufficient balance. Need ${formatEther(ticketPrice)} ETH`);
    }

    // 9. Estimate gas for the transaction
    const gasEstimate = await publicClient.estimateContractGas({
      address: contractAddress,
      abi: VR_TICKET_ABI,
      functionName: 'mint',
      args: [to, eventId, ticketType, metadata],
      value: ticketPrice,
      account,
    });

    console.log(`Estimated gas: ${gasEstimate}`);

    // 10. Write the transaction
    const hash = await walletClient.writeContract({
      address: contractAddress,
      abi: VR_TICKET_ABI,
      functionName: 'mint',
      args: [to, eventId, ticketType, metadata],
      value: ticketPrice,
      gas: gasEstimate * BigInt(120) / BigInt(100), // Add 20% buffer
      account,
    });

    console.log(`Transaction submitted: ${hash}`);

    // 11. Wait for transaction confirmation
    const receipt = await publicClient.waitForTransactionReceipt({ 
      hash,
      confirmations: 2, // Wait for 2 confirmations
    });

    console.log(`Transaction confirmed in block ${receipt.blockNumber}`);

    // 12. Parse logs to get token ID
    let tokenId: bigint | undefined;

    for (const log of receipt.logs) {
      try {
        const parsedLog = parseEventLogs({
          abi: VR_TICKET_ABI,
          logs: [log],
        })[0];

        if (parsedLog?.eventName === 'TicketMinted') {
          tokenId = parsedLog.args.tokenId;
          console.log(`NFT minted with token ID: ${tokenId}`);
          break;
        }
      } catch (error) {
        // Log might not be from our contract
        continue;
      }
    }

    return {
      hash,
      tokenId,
      receipt,
      success: true,
    };

  } catch (error: any) {
    console.error('Error minting VR ticket:', error);
    
    return {
      hash: '0x' as Hash,
      success: false,
      error: error.message || 'Unknown error occurred',
    };
  }
}

/**
 * Example: Check user's VR ticket balance
 */
export async function getUserTicketBalance(address: Address, chainId: number): Promise<number> {
  try {
    const chain = getChainById(chainId);
    if (!chain) throw new Error(`Unsupported chain ID: ${chainId}`);

    const contractAddress = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]?.vrTicketNFT;
    if (!contractAddress) throw new Error(`Contract not deployed on chain ${chainId}`);

    const publicClient = createPublicClient({
      chain,
      transport: custom(window.ethereum!),
    });

    const balance = await publicClient.readContract({
      address: contractAddress,
      abi: VR_TICKET_ABI,
      functionName: 'balanceOf',
      args: [address],
    });

    return Number(balance);
  } catch (error) {
    console.error('Error fetching ticket balance:', error);
    return 0;
  }
}

/**
 * Example: Monitor transaction status in real-time
 */
export async function monitorTransaction(
  hash: Hash, 
  chainId: number,
  onUpdate?: (status: 'pending' | 'confirmed' | 'failed', receipt?: TransactionReceipt) => void
): Promise<TransactionReceipt | null> {
  try {
    const chain = getChainById(chainId);
    if (!chain) throw new Error(`Unsupported chain ID: ${chainId}`);

    const publicClient = createPublicClient({
      chain,
      transport: custom(window.ethereum!),
    });

    onUpdate?.('pending');

    // Wait for transaction receipt
    const receipt = await publicClient.waitForTransactionReceipt({ 
      hash,
      onReplaced: (replacement) => {
        console.log('Transaction replaced:', replacement);
      },
    });

    if (receipt.status === 'success') {
      onUpdate?.('confirmed', receipt);
    } else {
      onUpdate?.('failed', receipt);
    }

    return receipt;
  } catch (error) {
    console.error('Error monitoring transaction:', error);
    onUpdate?.('failed');
    return null;
  }
}

/**
 * Example usage of the mintVRTicket function
 */
export const EXAMPLE_USAGE = `
// Example: Mint a VIP ticket for event #1
import { mintVRTicket, TicketType } from '@/examples/contractExample';

const mintTicket = async () => {
  const result = await mintVRTicket({
    to: '0x742d35Cc6543C99D72c4D6D25F84Cac7fF41C0b8', // User's wallet address
    eventId: BigInt(1), // Event ID
    ticketType: TicketType.VIP, // VIP ticket
    metadata: JSON.stringify({
      eventName: 'Coldplay VR Concert',
      date: '2024-12-31',
      venue: 'Metaverse Stadium',
      seat: 'VIP-001'
    }),
    chainId: 1 // Ethereum mainnet
  });

  if (result.success) {
    console.log('✅ Ticket minted successfully!');
    console.log('Token ID:', result.tokenId);
    console.log('Transaction:', result.hash);
  } else {
    console.error('❌ Failed to mint ticket:', result.error);
  }
};

// Example: Check user's balance
const checkBalance = async () => {
  const balance = await getUserTicketBalance(
    '0x742d35Cc6543C99D72c4D6D25F84Cac7fF41C0b8',
    1 // Ethereum mainnet
  );
  
  console.log(\`User has \${balance} VR tickets\`);
};

// Example: Monitor transaction
const monitorTx = async (hash: Hash) => {
  await monitorTransaction(hash, 1, (status, receipt) => {
    switch (status) {
      case 'pending':
        console.log('⏳ Transaction pending...');
        break;
      case 'confirmed':
        console.log('✅ Transaction confirmed!', receipt);
        break;
      case 'failed':
        console.log('❌ Transaction failed!', receipt);
        break;
    }
  });
};
`;

// Error handling utilities
export const CONTRACT_ERRORS = {
  INSUFFICIENT_FUNDS: 'Insufficient funds to purchase ticket',
  EVENT_NOT_FOUND: 'Event does not exist',
  TICKET_SOLD_OUT: 'Tickets for this event are sold out',
  INVALID_TICKET_TYPE: 'Invalid ticket type',
  CONTRACT_PAUSED: 'Contract is currently paused',
  UNAUTHORIZED: 'Not authorized to perform this action',
} as const;

export function parseContractError(error: any): string {
  const message = error.message || error.toString();
  
  if (message.includes('insufficient funds')) {
    return CONTRACT_ERRORS.INSUFFICIENT_FUNDS;
  }
  if (message.includes('event not found')) {
    return CONTRACT_ERRORS.EVENT_NOT_FOUND;
  }
  if (message.includes('sold out')) {
    return CONTRACT_ERRORS.TICKET_SOLD_OUT;
  }
  if (message.includes('invalid ticket type')) {
    return CONTRACT_ERRORS.INVALID_TICKET_TYPE;
  }
  if (message.includes('paused')) {
    return CONTRACT_ERRORS.CONTRACT_PAUSED;
  }
  if (message.includes('unauthorized')) {
    return CONTRACT_ERRORS.UNAUTHORIZED;
  }
  
  return message;
} 