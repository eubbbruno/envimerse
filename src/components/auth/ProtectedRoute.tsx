'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import ConnectWalletButton from '@/components/ConnectWalletButton';
import { Shield, Lock, AlertTriangle } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

const LoadingSpinner = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <motion.div
      className="relative"
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    >
      <div className="w-16 h-16 border-4 border-magenta-500/20 border-t-magenta-500 rounded-full" />
      <div className="absolute inset-0 w-16 h-16 border-4 border-cyan-500/20 border-b-cyan-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
    </motion.div>
  </div>
);

const AuthRequired = () => (
  <div className="min-h-screen bg-black flex items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full space-y-8 text-center"
    >
      {/* Animated Icon */}
      <motion.div
        className="mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-magenta-500/20 to-cyan-500/20 flex items-center justify-center"
        animate={{ 
          boxShadow: [
            '0 0 20px rgba(141, 66, 236, 0.3)',
            '0 0 40px rgba(96, 163, 249, 0.3)',
            '0 0 20px rgba(141, 66, 236, 0.3)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Lock className="w-12 h-12 text-magenta-400" />
      </motion.div>

      {/* Title */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-magenta-400 to-cyan-400 bg-clip-text text-transparent">
          Access Restricted
        </h2>
        <p className="mt-2 text-gray-400">
          Connect your wallet to access this area
        </p>
      </div>

      {/* Connect Button */}
      <div className="space-y-4">
        <ConnectWalletButton />
        <p className="text-sm text-gray-500">
          Your wallet will be used for secure authentication
        </p>
      </div>
    </motion.div>
  </div>
);

const RoleRequired = ({ requiredRole }: { requiredRole: UserRole }) => (
  <div className="min-h-screen bg-black flex items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full space-y-8 text-center"
    >
      {/* Animated Icon */}
      <motion.div
        className="mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 flex items-center justify-center"
        animate={{ 
          boxShadow: [
            '0 0 20px rgba(239, 68, 68, 0.3)',
            '0 0 40px rgba(249, 115, 22, 0.3)',
            '0 0 20px rgba(239, 68, 68, 0.3)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <AlertTriangle className="w-12 h-12 text-red-400" />
      </motion.div>

      {/* Title */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
          Access Denied
        </h2>
        <p className="mt-2 text-gray-400">
          You need permission to access this area
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-4">
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors"
        >
          Back
        </button>
        <p className="text-sm text-gray-500">
          Contact us if you need access
        </p>
      </div>
    </motion.div>
  </div>
);

function getRoleDisplayName(role: UserRole): string {
  switch (role) {
    case 'client':
      return 'Client';
    case 'reseller':
      return 'Reseller';
    case 'environment':
      return 'Environment';
    default:
      return 'User';
  }
}

export function ProtectedRoute({
  children,
  requiredRole,
  fallback,
  redirectTo
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user, hasRole, canAccess } = useAuth();
  const router = useRouter();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && redirectTo) {
      setShouldRedirect(true);
    }
  }, [isLoading, isAuthenticated, redirectTo]);

  useEffect(() => {
    if (shouldRedirect && redirectTo) {
      router.push(redirectTo);
    }
  }, [shouldRedirect, redirectTo, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return fallback || <LoadingSpinner />;
  }

  // Show auth required if not authenticated
  if (!isAuthenticated) {
    if (redirectTo) {
      return <LoadingSpinner />; // Will redirect
    }
    return fallback || <AuthRequired />;
  }

  // Check role-based access
  if (requiredRole && !canAccess(requiredRole)) {
    return fallback || <RoleRequired requiredRole={requiredRole} />;
  }

  // Render protected content
  return <>{children}</>;
}

// HOC version for easier component wrapping
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  requiredRole?: UserRole
) {
  const AuthenticatedComponent = (props: P) => {
    return (
      <ProtectedRoute requiredRole={requiredRole}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };

  AuthenticatedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;
  
  return AuthenticatedComponent;
}

// Role-specific HOCs for convenience
export const withClientRole = <P extends object>(Component: React.ComponentType<P>) =>
  withAuth(Component, 'client');

export const withResellerRole = <P extends object>(Component: React.ComponentType<P>) =>
  withAuth(Component, 'reseller');

export const withEnvironmentRole = <P extends object>(Component: React.ComponentType<P>) =>
  withAuth(Component, 'environment'); 