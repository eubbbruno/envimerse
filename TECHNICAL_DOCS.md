# Technical Documentation - Envimerse

## 🏗️ System Architecture

### Technology Stack

```typescript
// Core Framework
Next.js 14 (App Router)
React 18
TypeScript 5.x

// Styling & UI
TailwindCSS 3.x
Radix UI Primitives
Framer Motion 10.x

// 3D Graphics
Three.js
React-Three-Fiber
React-Three-Drei

// Web3 Integration
wagmi 2.x
viem 2.x
RainbowKit 2.x

// Analytics & Monitoring
@next/third-parties (Google Analytics)
```

### Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/
│   ├── ui/                # Base components (Radix UI)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── 3d/                # Three.js components
│   │   └── LogoSphere.tsx
│   ├── web3/              # Blockchain integration
│   │   ├── Web3Provider.tsx
│   │   └── ConnectWalletButton.tsx
│   ├── layout/            # Layout and navigation
│   │   └── AnimatedNavigation.tsx
│   └── sections/          # Page sections
│       ├── EnhancedFeatures.tsx
│       ├── AnimatedStats.tsx
│       ├── MonetizationModel.tsx
│       ├── RealtimeMetrics.tsx
│       └── InteractiveRoadmap.tsx
├── hooks/                 # Custom hooks
│   ├── useUserWallet.ts
│   ├── useInView.ts
│   └── useScrollDirection.ts
├── lib/                   # Utilities and configurations
│   ├── utils.ts
│   └── web3-config.ts
└── styles/               # Additional styles
```

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
--primary-magenta: #8D42EC
--primary-cyan: #60A3F9

/* Gradients */
--gradient-primary: linear-gradient(135deg, #8D42EC 0%, #60A3F9 100%)
--gradient-secondary: linear-gradient(45deg, #8D42EC 0%, #60A3F9 100%)

/* Support Colors */
--background-dark: #0A0A0A
--surface-dark: #1A1A1A
--text-primary: #FFFFFF
--text-secondary: #A0A0A0
```

### Typography

```css
/* Fonts */
font-family: 'Orbitron', sans-serif;     /* Headers */
font-family: 'Lexend', sans-serif;       /* Body */
font-family: 'JetBrains Mono', monospace; /* Code */

/* Scales */
text-xs: 0.75rem
text-sm: 0.875rem
text-base: 1rem
text-lg: 1.125rem
text-xl: 1.25rem
text-2xl: 1.5rem
text-3xl: 1.875rem
text-4xl: 2.25rem
text-5xl: 3rem
text-6xl: 3.75rem
```

### Custom Animations

```css
/* Defined in tailwind.config.ts */
@keyframes pulsate {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes orbit {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes gradient-x {
  0%, 100% { transform: translateX(0%); }
  50% { transform: translateX(100%); }
}
```

## 🔧 Main Components

### LogoSphere (3D)

```typescript
// src/components/3d/LogoSphere.tsx
interface LogoSphereProps {
  scale?: number;
  rotationSpeed?: number;
  particleCount?: number;
}

// Features:
// - Sphere with holographic material
// - Animated orbital rings
// - Particle system
// - Custom shaders
// - Mouse interaction responsive
```

### MonetizationModel

```typescript
// src/components/MonetizationModel.tsx
interface MonetizationModelProps {
  className?: string;
}

// Features:
// - Transaction fee visualization
// - VR skins showcase with rarity system
// - Revenue stream breakdown
// - Interactive category tabs
// - Revenue projections
```

### RealtimeMetrics

```typescript
// src/components/RealtimeMetrics.tsx
interface RealtimeMetricsProps {
  updateInterval?: number;
}

// Features:
// - Live updating dashboard
// - 8 key performance indicators
// - Animated counters
// - Real-time data simulation
// - Glassmorphic design
```

### InteractiveRoadmap

```typescript
// src/components/InteractiveRoadmap.tsx
interface InteractiveRoadmapProps {
  milestones?: Milestone[];
}

// Features:
// - Visual timeline with milestones
// - Expandable feature details
// - Status indicators (Completed, In Progress, Planned)
// - Alternating layout design
// - Framer Motion animations
```

### AnimatedNavigation

```typescript
// src/components/layout/AnimatedNavigation.tsx
interface NavigationProps {
  className?: string;
}

// Features:
// - Glassmorphism design
// - Hide/show based on scroll
// - Web3 integration
// - Responsive mobile menu
// - Framer Motion animations
```

### Web3Provider

```typescript
// src/components/web3/Web3Provider.tsx
interface Web3ProviderProps {
  children: React.ReactNode;
}

// Configuration:
// - RainbowKit with custom dark theme
// - Multi-chain support
// - Optimized wagmi configuration
// - Nested providers (QueryClient, WagmiConfig, RainbowKitProvider)
```

## 🌐 Web3 Integration

### Chain Configuration

```typescript
// src/lib/web3-config.ts
export const chains = [
  base,           // Main chain
  mainnet,        // Ethereum
  polygon,        // Polygon
  optimism,       // Optimism
  arbitrum,       // Arbitrum
] as const;

export const config = createConfig({
  chains,
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
  },
  connectors: [
    injected(),
    walletConnect({ projectId }),
    coinbaseWallet({ appName: 'Envimerse' }),
  ],
});
```

### Wallet Integration

```typescript
// Supported wallets
const connectors = [
  injected(),                    // MetaMask, etc.
  walletConnect({ projectId }),  // WalletConnect
  coinbaseWallet({ appName }),   // Coinbase Wallet
];

// ENS Support
const { data: ensName } = useEnsName({ address });
const { data: ensAvatar } = useEnsAvatar({ name: ensName });
```

## 💰 Monetization Architecture

### Revenue Streams

```typescript
interface RevenueStream {
  title: string;
  description: string;
  percentage: string;
  icon: React.ReactNode;
  color: string;
  examples: string[];
}

const revenueStreams = [
  {
    title: "Transaction Fees",
    percentage: "2.5%",
    examples: ["Event tickets", "VR skins", "Premium content"]
  },
  {
    title: "VR Skins & Cosmetics", 
    percentage: "65%",
    examples: ["Avatar customization", "Virtual clothing", "Accessories"]
  },
  {
    title: "Chat & Social Features",
    percentage: "15%", 
    examples: ["Custom emotes", "VIP badges", "Private messaging"]
  },
  {
    title: "Premium Experiences",
    percentage: "17.5%",
    examples: ["VIP access", "Backstage experiences", "Exclusive content"]
  }
];
```

### VR Skins System

```typescript
interface SkinExample {
  id: string;
  name: string;
  category: 'avatar' | 'accessories' | 'effects';
  price: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: React.ReactNode;
  description: string;
  preview: string;
}

// Rarity System
const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'legendary': return 'from-yellow-400 to-orange-500';
    case 'epic': return 'from-purple-400 to-pink-500';
    case 'rare': return 'from-blue-400 to-cyan-500';
    default: return 'from-gray-400 to-gray-500';
  }
};
```

## 🚀 Performance Optimizations

### Code Splitting

```typescript
// Lazy loading heavy components
const LogoSphere = lazy(() => import('@/components/3d/LogoSphere'));
const MonetizationModel = lazy(() => import('@/components/MonetizationModel'));
const RealtimeMetrics = lazy(() => import('@/components/RealtimeMetrics'));

// Suspense boundaries
<Suspense fallback={<LoadingSpinner />}>
  <MonetizationModel />
</Suspense>
```

### Image Optimization

```typescript
// Next.js Image component
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Envimerse Logo"
  width={200}
  height={200}
  priority
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npm run analyze

# Key metrics
- First Load JS: < 100KB
- Route-specific JS: < 50KB
- Shared chunks: Optimized
```

## 🔒 Security Implementation

### Content Security Policy

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self';
    `.replace(/\s{2,}/g, ' ').trim()
  }
];
```

### Environment Variables

```bash
# Required for Web3
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
NEXT_PUBLIC_ALCHEMY_API_KEY=
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=

# Optional for analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

## 📊 Analytics Integration

### Google Analytics 4

```typescript
// src/lib/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
```

### Custom Events

```typescript
// Track user interactions
const trackWalletConnection = () => {
  event({
    action: 'wallet_connected',
    category: 'web3',
    label: 'user_engagement'
  });
};

const trackSkinPurchase = (skinId: string, price: string) => {
  event({
    action: 'skin_purchased',
    category: 'monetization',
    label: skinId,
    value: parseFloat(price)
  });
};
```

## 🧪 Testing Strategy

### Unit Testing

```typescript
// Component testing with React Testing Library
import { render, screen } from '@testing-library/react';
import MonetizationModel from '@/components/MonetizationModel';

test('renders revenue streams correctly', () => {
  render(<MonetizationModel />);
  expect(screen.getByText('Transaction Fees')).toBeInTheDocument();
  expect(screen.getByText('2.5%')).toBeInTheDocument();
});
```

### Integration Testing

```typescript
// Web3 integration testing
import { renderHook } from '@testing-library/react';
import { useAccount } from 'wagmi';

test('wallet connection works', async () => {
  const { result } = renderHook(() => useAccount());
  // Test wallet connection logic
});
```

## 🚀 Deployment

### Vercel Configuration

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "functions": {
    "app/api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  }
}
```

### Environment Setup

```bash
# Production deployment
vercel --prod

# Preview deployment
vercel

# Environment variables
vercel env add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
```

---

**Documentation Status**: ✅ **COMPLETE**
**Last Updated**: December 2024 