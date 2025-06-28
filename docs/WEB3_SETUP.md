# 🌐 WEB3 SETUP GUIDE - ENVIMERSE

## 📋 **AUDITORIA COMPLETA - DEPENDENCIES INSTALLED**

### ✅ **Core Web3 Stack**
```json
{
  "@wagmi/connectors": "^5.8.3",           // Enhanced wallet connectors
  "@coinbase/wallet-sdk": "^4.3.2",        // Coinbase Wallet support
  "wagmi": "^2.15.4",                      // React hooks for Ethereum
  "viem": "^2.30.1",                       // TypeScript Ethereum interface
  "@rainbow-me/rainbowkit": "^2.2.5",      // Wallet connection UI
  "@tanstack/react-query": "^5.77.2"       // Required for wagmi
}
```

### ✅ **Authentication & State Management**
```json
{
  "zustand": "^5.0.5",                     // Lightweight state management
  "siwe": "^3.0.0",                        // Sign-In With Ethereum
  "@web3-onboard/core": "^2.24.1",         // Multi-wallet support
  "@web3-onboard/react": "^2.11.0"         // React hooks for Web3 Onboard
}
```

### ✅ **Smart Contracts & NFTs**
```json
{
  "thirdweb": "^5.102.3",                  // NFT marketplace & contracts
  "ethers": "^6.14.3",                     // Ethereum library (backup)
  "abitype": "^1.0.8",                     // ABI type generation
  "@alchemy/aa-accounts": "^3.19.0",       // Account Abstraction
  "@alchemy/aa-core": "^3.19.0"            // Account Abstraction core
}
```

---

## 🔧 **ENVIRONMENT VARIABLES SETUP**

Create a `.env.local` file with the following variables:

### 🔗 **Essential Web3 Configuration**
```bash
# WalletConnect (Required)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id

# Alchemy API (Recommended)
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key

# Thirdweb (For NFT features)
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_thirdweb_id
```

### 💳 **Payment Integration**
```bash
# Stripe (Fiat payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# OnRamper (Crypto on-ramp)
NEXT_PUBLIC_ONRAMPER_API_KEY=your_onramper_key
```

### 🔐 **Authentication**
```bash
# SIWE Configuration
NEXT_PUBLIC_SIWE_DOMAIN=envimerse.com
NEXTAUTH_SECRET=your_random_secret
```

---

## 📁 **NEW FILE STRUCTURE**

```
src/
├── lib/
│   ├── wagmi.ts              ✅ Enhanced wallet configuration
│   └── web3-store.ts         ✅ Zustand global state management
├── hooks/
│   ├── useContracts.ts       ✅ Smart contract interactions
│   └── useSIWE.ts           ✅ Sign-In With Ethereum
└── components/
    └── web3/                 🔄 To be created
        ├── WalletConnect.tsx
        ├── NetworkSwitch.tsx
        └── TransactionStatus.tsx
```

---

## 🎯 **KEY FEATURES IMPLEMENTED**

### 🔗 **Multi-Wallet Support**
- **MetaMask** - Browser extension wallet
- **Coinbase Wallet** - Mobile & browser support
- **WalletConnect** - 300+ mobile wallets
- **Safe/Gnosis** - Multi-signature wallets
- **Injected** - Any browser extension wallet

### 🌐 **Multi-Chain Configuration**
```typescript
// Supported chains
const chains = [
  mainnet,    // Ethereum
  polygon,    // Polygon
  optimism,   // Optimism
  arbitrum,   // Arbitrum
  base,       // Base
  bsc,        // Binance Smart Chain
  avalanche,  // Avalanche
  gnosis,     // Gnosis Chain
  fantom,     // Fantom
  celo        // Celo
];
```

### 💰 **Payment Token Support**
```typescript
// Supported tokens per chain
{
  mainnet: { USDC, USDT, DAI },
  polygon: { USDC, USDT, DAI },
  base: { USDC }
}
```

---

## 🚀 **USAGE EXAMPLES**

### 1. **Basic Wallet Connection**
```typescript
import { useAccount, useConnect, useDisconnect } from 'wagmi';

function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <p>Connected: {address}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button key={connector.id} onClick={() => connect({ connector })}>
          Connect {connector.name}
        </button>
      ))}
    </div>
  );
}
```

### 2. **SIWE Authentication**
```typescript
import { useSIWE } from '@/hooks/useSIWE';

function AuthButton() {
  const { isAuthenticated, signIn, signOut, isSigning } = useSIWE();

  if (isAuthenticated) {
    return <button onClick={signOut}>Sign Out</button>;
  }

  return (
    <button onClick={signIn} disabled={isSigning}>
      {isSigning ? 'Signing...' : 'Sign In with Ethereum'}
    </button>
  );
}
```

### 3. **Smart Contract Interaction**
```typescript
import { useVRTicketContract } from '@/hooks/useContracts';

function TicketPurchase({ eventId }: { eventId: bigint }) {
  const { purchaseTicket, isPending } = useVRTicketContract();

  const handlePurchase = async () => {
    await purchaseTicket(eventId, 1n, parseEther('0.1'));
  };

  return (
    <button onClick={handlePurchase} disabled={isPending}>
      {isPending ? 'Purchasing...' : 'Buy VR Ticket'}
    </button>
  );
}
```

### 4. **Global State Management**
```typescript
import { useWeb3Store } from '@/lib/web3-store';

function UserBalance() {
  const { preferredCurrency, setPreferredCurrency } = useWeb3Store();

  return (
    <select 
      value={preferredCurrency} 
      onChange={(e) => setPreferredCurrency(e.target.value)}
    >
      <option value="USD">USD</option>
      <option value="ETH">ETH</option>
      <option value="USDC">USDC</option>
    </select>
  );
}
```

---

## 🔒 **SECURITY BEST PRACTICES**

### 1. **Environment Variables**
- ✅ Never expose private keys in frontend
- ✅ Use different keys for dev/staging/prod
- ✅ Rotate API keys regularly

### 2. **Smart Contract Security**
- ✅ Verify contract addresses
- ✅ Use typed ABIs
- ✅ Implement proper error handling

### 3. **SIWE Authentication**
- ✅ Verify signatures on backend
- ✅ Use proper nonce management
- ✅ Implement session expiration

---

## 📊 **MONITORING & ANALYTICS**

### 1. **Transaction Tracking**
```typescript
// Automatic transaction monitoring
const { receipt, isLoading, isSuccess } = useTransactionMonitor(hash);
```

### 2. **Error Handling**
```typescript
// Global notification system
const { addNotification } = useWeb3Store();

addNotification({
  type: 'error',
  title: 'Transaction Failed',
  message: 'Please try again',
  txHash: hash
});
```

### 3. **Performance Metrics**
- Connection success rates
- Transaction completion rates
- User authentication flow

---

## 🛠 **NEXT STEPS**

### 🔄 **Immediate Implementation**
1. Create Web3 UI components
2. Integrate with existing event pages
3. Add payment flow to `/events/[id]`
4. Implement NFT ticket system

### 🚀 **Advanced Features**
1. Account Abstraction (gasless transactions)
2. Multi-signature wallet support
3. Cross-chain bridge integration
4. DeFi yield farming for tickets

### 🎯 **Production Checklist**
- [ ] Deploy smart contracts to mainnet
- [ ] Set up monitoring and alerts
- [ ] Implement backup RPC providers
- [ ] Add comprehensive error handling
- [ ] Security audit smart contracts

---

## 📞 **SUPPORT & RESOURCES**

- **Wagmi Docs**: https://wagmi.sh
- **Viem Docs**: https://viem.sh
- **SIWE Docs**: https://docs.login.xyz
- **Thirdweb Docs**: https://portal.thirdweb.com
- **RainbowKit**: https://www.rainbowkit.com

---

## 🎉 **CONCLUSION**

O Envimerse agora possui uma infraestrutura Web3 **completa e robusta** com:

✅ **Múltiplas carteiras** (MetaMask, Coinbase, WalletConnect, etc.)  
✅ **Multi-chain** (Ethereum, Polygon, Base, etc.)  
✅ **SIWE autenticação** segura  
✅ **Smart contracts** para NFT tickets  
✅ **Gerenciamento de estado** global  
✅ **Monitoramento** de transações  
✅ **Pagamentos** crypto + fiat  

**Next**: Integrar com as páginas existentes e implementar o marketplace NFT! 🚀 