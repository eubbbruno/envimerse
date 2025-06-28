import { useCallback, useEffect, useState } from 'react';
import { useAccount, useSignMessage, useChainId } from 'wagmi';
import { SiweMessage } from 'siwe';
import { useWeb3Store } from '@/lib/web3-store';
import { type Address } from 'viem';

// SIWE session data interface
interface SiweSession {
  address: Address;
  chainId: number;
  message: string;
  signature: string;
  issuedAt: string;
  expirationTime: string;
  nonce: string;
}

// Custom hook for SIWE authentication
export function useSIWE() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { signMessageAsync, error: signError, isPending: isSigning } = useSignMessage();
  
  const { 
    isAuthenticated,
    nonce,
    generateNonce,
    createSiweMessage,
    verifySiweSignature,
    authenticate,
    logout,
    addNotification
  } = useWeb3Store();

  const [isVerifying, setIsVerifying] = useState(false);
  const [session, setSession] = useState<SiweSession | null>(null);

  // Generate a new nonce for SIWE message
  const prepareMessage = useCallback(() => {
    if (!address || !chainId) return null;
    
    const newNonce = generateNonce();
    const message = createSiweMessage(address, chainId, newNonce);
    return message;
  }, [address, chainId, generateNonce, createSiweMessage]);

  // Sign the SIWE message
  const signIn = useCallback(async () => {
    if (!address || !chainId || !isConnected) {
      addNotification({
        type: 'error',
        title: 'Wallet Not Connected',
        message: 'Please connect your wallet first',
      });
      return false;
    }

    try {
      const message = prepareMessage();
      if (!message) {
        throw new Error('Failed to prepare SIWE message');
      }

      addNotification({
        type: 'info',
        title: 'Sign Message',
        message: 'Please sign the message in your wallet',
      });

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      setIsVerifying(true);

      // Verify the signature locally
      const isValid = await verifySiweSignature(message.prepareMessage(), signature);
      
      if (!isValid) {
        throw new Error('Invalid signature');
      }

      // Create session object
      const sessionData: SiweSession = {
        address,
        chainId,
        message: message.prepareMessage(),
        signature,
        issuedAt: message.issuedAt!,
        expirationTime: message.expirationTime!,
        nonce: message.nonce,
      };

      setSession(sessionData);
      
      // Update global auth state
      authenticate(address, chainId, {
        message: message.prepareMessage(),
        signature,
      });

      addNotification({
        type: 'success',
        title: 'Successfully Signed In',
        message: 'You have been authenticated with Ethereum',
      });

      // Store session in localStorage for persistence
      localStorage.setItem('siwe-session', JSON.stringify(sessionData));

      return true;
    } catch (error) {
      console.error('SIWE sign in failed:', error);
      addNotification({
        type: 'error',
        title: 'Sign In Failed',
        message: error instanceof Error ? error.message : 'Failed to authenticate',
      });
      return false;
    } finally {
      setIsVerifying(false);
    }
  }, [
    address,
    chainId,
    isConnected,
    prepareMessage,
    signMessageAsync,
    verifySiweSignature,
    authenticate,
    addNotification
  ]);

  // Sign out and clear session
  const signOut = useCallback(() => {
    setSession(null);
    logout();
    localStorage.removeItem('siwe-session');
    
    addNotification({
      type: 'info',
      title: 'Signed Out',
      message: 'You have been signed out',
    });
  }, [logout, addNotification]);

  // Verify if current session is still valid
  const verifySession = useCallback(async (sessionData: SiweSession): Promise<boolean> => {
    try {
      const now = new Date();
      const expirationTime = new Date(sessionData.expirationTime);
      
      // Check if session has expired
      if (now >= expirationTime) {
        console.log('Session expired');
        return false;
      }

      // Verify the signature is still valid
      const isValid = await verifySiweSignature(sessionData.message, sessionData.signature);
      
      if (!isValid) {
        console.log('Session signature invalid');
        return false;
      }

      // Check if wallet address matches
      if (address && address.toLowerCase() !== sessionData.address.toLowerCase()) {
        console.log('Session address mismatch');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Session verification failed:', error);
      return false;
    }
  }, [address, verifySiweSignature]);

  // Restore session from localStorage on mount
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedSession = localStorage.getItem('siwe-session');
        if (!storedSession) return;

        const sessionData: SiweSession = JSON.parse(storedSession);
        
        // Verify if stored session is still valid
        const isValid = await verifySession(sessionData);
        
        if (isValid && address && chainId) {
          setSession(sessionData);
          authenticate(address, chainId, {
            message: sessionData.message,
            signature: sessionData.signature,
          });
          
          console.log('Session restored successfully');
        } else {
          // Clear invalid session
          localStorage.removeItem('siwe-session');
          console.log('Invalid session cleared');
        }
      } catch (error) {
        console.error('Failed to restore session:', error);
        localStorage.removeItem('siwe-session');
      }
    };

    if (isConnected && address) {
      restoreSession();
    }
  }, [isConnected, address, chainId, authenticate, verifySession]);

  // Auto logout when wallet disconnects
  useEffect(() => {
    if (!isConnected && isAuthenticated) {
      signOut();
    }
  }, [isConnected, isAuthenticated, signOut]);

  // Check if session needs refresh (30 minutes before expiration)
  const shouldRefreshSession = useCallback((): boolean => {
    if (!session) return false;
    
    const now = new Date();
    const expirationTime = new Date(session.expirationTime);
    const refreshThreshold = new Date(expirationTime.getTime() - 30 * 60 * 1000); // 30 minutes before
    
    return now >= refreshThreshold;
  }, [session]);

  // Refresh session by re-signing
  const refreshSession = useCallback(async () => {
    if (!shouldRefreshSession()) return true;
    
    addNotification({
      type: 'info',
      title: 'Session Expiring',
      message: 'Refreshing your authentication session',
    });
    
    return await signIn();
  }, [shouldRefreshSession, signIn, addNotification]);

  return {
    // State
    isAuthenticated,
    session,
    isConnected,
    address,
    chainId,
    
    // Loading states
    isSigning,
    isVerifying,
    
    // Actions
    signIn,
    signOut,
    refreshSession,
    verifySession,
    shouldRefreshSession,
    
    // Utils
    prepareMessage,
    
    // Errors
    signError,
  };
}

// Hook for protected routes that require authentication
export function useRequireAuth() {
  const { isAuthenticated, isConnected, signIn } = useSIWE();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const requireAuth = useCallback(async (): Promise<boolean> => {
    if (isAuthenticated) return true;
    
    if (!isConnected) {
      setIsRedirecting(true);
      // You might want to redirect to wallet connection page
      return false;
    }
    
    // Attempt to sign in
    setIsRedirecting(true);
    const success = await signIn();
    setIsRedirecting(false);
    
    return success;
  }, [isAuthenticated, isConnected, signIn]);

  return {
    isAuthenticated,
    isConnected,
    isRedirecting,
    requireAuth,
  };
}

// Hook for session management with auto-refresh
export function useSessionManager() {
  const { session, shouldRefreshSession, refreshSession, signOut } = useSIWE();
  
  // Auto-refresh session when needed
  useEffect(() => {
    const checkSession = async () => {
      if (shouldRefreshSession()) {
        const success = await refreshSession();
        if (!success) {
          signOut();
        }
      }
    };
    
    // Check session every 5 minutes
    const interval = setInterval(checkSession, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [shouldRefreshSession, refreshSession, signOut]);

  const getSessionTimeRemaining = useCallback((): number => {
    if (!session) return 0;
    
    const now = new Date();
    const expirationTime = new Date(session.expirationTime);
    
    return Math.max(0, expirationTime.getTime() - now.getTime());
  }, [session]);

  const formatTimeRemaining = useCallback((): string => {
    const timeRemaining = getSessionTimeRemaining();
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }, [getSessionTimeRemaining]);

  return {
    session,
    timeRemaining: getSessionTimeRemaining(),
    timeRemainingFormatted: formatTimeRemaining(),
    shouldRefresh: shouldRefreshSession(),
  };
} 