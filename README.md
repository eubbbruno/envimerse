# 🌐 Envimerse - The Future of Immersive Entertainment

> **Experience live events from anywhere with cutting-edge VR technology, powered by blockchain on BASE.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/envimerse)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC)](https://tailwindcss.com/)

## ✨ Features

### 🎯 **Core Experience**
- **3D Animated Logo**: Neon sphere with magenta-to-cyan gradient
- **Futuristic UI**: Glassmorphic design with neon effects
- **Responsive Design**: Mobile-first with adaptive layouts
- **Smooth Animations**: Framer Motion powered interactions

### 🔗 **Web3 Integration**
- **Multi-Chain Support**: Mainnet, Polygon, Optimism, Arbitrum, Base
- **Wallet Connection**: RainbowKit integration
- **ENS Support**: Display ENS names and avatars
- **Ready for NFTs**: Smart contract integration ready

### 🚀 **Performance**
- **Optimized Build**: Next.js 14 with production optimizations
- **Fast Loading**: Code splitting and lazy loading
- **SEO Ready**: Meta tags and structured data
- **Analytics**: Google Analytics integration

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS + CSS Modules
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **3D Graphics**: Three.js + React-Three-Fiber + Drei

### **Web3**
- **Wallet**: wagmi + RainbowKit
- **Blockchain**: viem
- **Queries**: TanStack Query

### **Deployment**
- **Hosting**: Vercel
- **Analytics**: Google Analytics
- **Performance**: Optimized for Core Web Vitals

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Git

### **Installation**

```bash
# Clone the repository
git clone https://github.com/yourusername/envimerse.git
cd envimerse

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### **Environment Variables**

Copy `env.example` to `.env.local` and configure:

```bash
# Required for Web3 features
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Optional for analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
```

## 📦 Build & Deploy

### **Local Build**
```bash
npm run build
npm start
```

### **Deploy to Vercel**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Or use the [Vercel Dashboard](https://vercel.com/new) for GUI deployment.

## 🎨 Design System

### **Colors**
- **Brand Magenta**: `#8D42EC`
- **Brand Cyan**: `#60A3F9`
- **Background**: `#000000`
- **Text**: `#FFFFFF`

### **Typography**
- **Headers**: Orbitron (Futuristic)
- **Body**: Lexend (Readable)
- **Code**: Geist Mono

### **Effects**
- **Glassmorphism**: Backdrop blur with transparency
- **Neon Glows**: CSS box-shadows with brand colors
- **Particle Effects**: Animated background elements

## 🔧 Development

### **Available Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### **Project Structure**
```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── ui/            # UI primitives
│   ├── LogoSphere.tsx # 3D logo component
│   └── ...
└── lib/               # Utilities
```

## 🌟 Key Components

### **LogoSphere**
3D animated logo using React-Three-Fiber with custom shaders.

### **Web3Provider**
Blockchain integration with multi-chain support.

### **AnimatedNavigation**
Scroll-responsive navigation with glassmorphic design.

### **EnhancedFeatures**
3D tilt cards with hover animations.

## 🔮 Roadmap

### **Phase 1: Foundation** ✅
- [x] Futuristic UI/UX
- [x] Web3 Integration
- [x] Production Deployment

### **Phase 2: Core Features** 🚧
- [ ] User Dashboard
- [ ] NFT Marketplace
- [ ] Event Streaming
- [ ] Social Features

### **Phase 3: Advanced** 📋
- [ ] VR/AR Integration
- [ ] Smart Contracts
- [ ] DAO Governance
- [ ] Mobile App

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for seamless deployment
- **RainbowKit** for Web3 integration
- **Three.js** for 3D graphics
- **Framer Motion** for animations

---

**Built with ❤️ for the future of immersive entertainment**

[Website](https://envimerse.vercel.app) • [Documentation](https://docs.envimerse.com) • [Discord](https://discord.gg/envimerse)
