'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useUserWallet } from '@/hooks/useUserWallet';

export type UserRole = 'client' | 'reseller' | 'environment' | null;

export interface UserProfile {
  id: string;
  walletAddress: string;
  ensName?: string;
  ensAvatar?: string;
  email?: string;
  role: UserRole;
  roles: UserRole[]; // User can have multiple roles
  primaryRole: UserRole;
  
  // Profile data
  name?: string;
  bio?: string;
  avatar?: string;
  
  // Preferences
  preferences: {
    notifications: boolean;
    newsletter: boolean;
    theme: 'dark' | 'light';
    language: string;
  };
  
  // Analytics for role detection
  analytics: {
    ticketsPurchased: number;
    eventsCreated: number;
    venuesManaged: number;
    totalSpent: number;
    lastActivity: Date;
  };
  
  // Verification status
  verified: {
    email: boolean;
    kyc: boolean;
    business: boolean;
  };
  
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  // Authentication status
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // User data
  user: UserProfile | null;
  currentRole: UserRole;
  
  // Methods
  login: () => Promise<void>;
  logout: () => Promise<void>;
  switchRole: (role: UserRole) => void;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  detectRole: () => Promise<UserRole>;
  
  // Role checks
  hasRole: (role: UserRole) => boolean;
  canAccess: (requiredRole: UserRole) => boolean;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>(null);
  
  const { address, isConnected, ensName, ensAvatar } = useUserWallet();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  // Role detection based on wallet activity
  const detectRole = async (): Promise<UserRole> => {
    if (!address) return null;
    
    try {
      // For demo purposes, let's make it more predictable and give users multiple roles
      console.log('🔍 Detecting role for address:', address);
      
      // Use address to determine roles for consistent demo experience
      const addressNumber = parseInt(address.slice(-2), 16);
      console.log('Address number for role detection:', addressNumber);
      
      // Always start with client as primary role for demo
      let primaryRole: UserRole = 'client';
      
      // Add additional roles based on address for demo variety
      if (addressNumber > 150) {
        primaryRole = 'environment';
      } else if (addressNumber > 100) {
        primaryRole = 'reseller';
      }
      
      console.log('✅ Primary role detected:', primaryRole);
      return primaryRole;
    } catch (error) {
      console.error('Role detection failed:', error);
      return 'client'; // Default role
    }
  };

  // Create or update user profile
  const createUserProfile = async (detectedRole: UserRole): Promise<UserProfile> => {
    const now = new Date();
    
    // For demo purposes, give users multiple roles so they can test everything
    const demoRoles: UserRole[] = ['client', 'reseller', 'environment'];
    console.log('🎭 Creating profile with multiple roles for demo:', demoRoles);
    
    return {
      id: `user_${address?.slice(0, 8)}`,
      walletAddress: address!,
      ensName,
      ensAvatar,
      role: detectedRole,
      roles: demoRoles, // Multiple roles for complete demo experience
      primaryRole: detectedRole,
      
      preferences: {
        notifications: true,
        newsletter: false,
        theme: 'dark',
        language: 'en',
      },
      
      analytics: {
        ticketsPurchased: Math.floor(Math.random() * 50),
        eventsCreated: Math.floor(Math.random() * 10),
        venuesManaged: Math.floor(Math.random() * 5),
        totalSpent: Math.random() * 1000,
        lastActivity: now,
      },
      
      verified: {
        email: false,
        kyc: false,
        business: false,
      },
      
      createdAt: now,
      updatedAt: now,
    };
  };

  // Login process
  const login = async () => {
    if (!address || !isConnected) {
      throw new Error('Wallet not connected');
    }
    
    setIsLoading(true);
    
    try {
      // Check if user exists in localStorage (mock database)
      const existingUserData = localStorage.getItem(`user_${address}`);
      
      let userProfile: UserProfile;
      
      if (existingUserData) {
        // Load existing user
        userProfile = JSON.parse(existingUserData);
        userProfile.analytics.lastActivity = new Date();
      } else {
        // Create new user
        const detectedRole = await detectRole();
        userProfile = await createUserProfile(detectedRole);
      }
      
      // Update ENS data if available
      if (ensName) userProfile.ensName = ensName;
      if (ensAvatar) userProfile.ensAvatar = ensAvatar;
      
      // Save to localStorage
      localStorage.setItem(`user_${address}`, JSON.stringify(userProfile));
      
      setUser(userProfile);
      setCurrentRole(userProfile.primaryRole);
      setIsAuthenticated(true);
      
      console.log('✅ User authenticated:', userProfile);
      console.log('🔑 Current role set to:', userProfile.primaryRole);
      console.log('🎭 Available roles:', userProfile.roles);
    } catch (error) {
      console.error('❌ Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout process
  const logout = async () => {
    try {
      await disconnect();
      setUser(null);
      setCurrentRole(null);
      setIsAuthenticated(false);
      
      // Redirect to home
      router.push('/');
      
      console.log('✅ User logged out');
    } catch (error) {
      console.error('❌ Logout failed:', error);
    }
  };

  // Switch user role
  const switchRole = (role: UserRole) => {
    if (!user || !hasRole(role)) {
      console.warn('Cannot switch to role:', role);
      return;
    }
    
    setCurrentRole(role);
    
    // Update user's primary role
    const updatedUser = { ...user, primaryRole: role, updatedAt: new Date() };
    setUser(updatedUser);
    localStorage.setItem(`user_${address}`, JSON.stringify(updatedUser));
    
    // Redirect to appropriate dashboard
    if (role) {
      router.push(`/dashboard/${role}`);
    }
  };

  // Update user profile
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !address) {
      throw new Error('No user to update');
    }
    
    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date(),
    };
    
    setUser(updatedUser);
    localStorage.setItem(`user_${address}`, JSON.stringify(updatedUser));
  };

  // Role checking utilities
  const hasRole = (role: UserRole): boolean => {
    const hasRoleResult = user?.roles.includes(role) || false;
    console.log(`🔍 Checking if user has role "${role}":`, hasRoleResult);
    console.log('User roles:', user?.roles);
    return hasRoleResult;
  };

  const canAccess = (requiredRole: UserRole): boolean => {
    if (!requiredRole) return true;
    const canAccessResult = hasRole(requiredRole);
    console.log(`🚪 Can access "${requiredRole}":`, canAccessResult);
    return canAccessResult;
  };

  // Auto-login when wallet connects
  useEffect(() => {
    if (isConnected && address && !isAuthenticated) {
      login().catch(console.error);
    } else if (!isConnected && isAuthenticated) {
      logout();
    }
  }, [isConnected, address]);

  // Update ENS data when it changes
  useEffect(() => {
    if (user && (ensName !== user.ensName || ensAvatar !== user.ensAvatar)) {
      updateProfile({ ensName, ensAvatar });
    }
  }, [ensName, ensAvatar]);

  const value: AuthState = {
    isAuthenticated,
    isLoading,
    user,
    currentRole,
    login,
    logout,
    switchRole,
    updateProfile,
    detectRole,
    hasRole,
    canAccess,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 