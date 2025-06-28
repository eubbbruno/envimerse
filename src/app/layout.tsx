import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Orbitron, Lexend } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Web3Provider } from "@/components/Web3Provider";
import { AuthProvider } from "@/contexts/AuthContext";
import SmoothScroll from '@/components/SmoothScroll';
import { defaultMetadata } from "@/lib/seo";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ["400", "500", "700", "900"],
});

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  weight: ["300", "400", "500", "600", "700"],
  });

export const metadata: Metadata = {
  ...defaultMetadata,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${lexend.variable} antialiased bg-black text-white font-sans`}
        suppressHydrationWarning
      >
        <Web3Provider>
          <AuthProvider>
            <ThemeProvider>
              <SmoothScroll />
              {children}
            </ThemeProvider>
          </AuthProvider>
        </Web3Provider>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}