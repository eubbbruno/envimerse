'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import RoleSwitcher from '@/components/auth/RoleSwitcher';
import { 
  User, 
  Shield, 
  Crown, 
  Settings, 
  Bell, 
  Check,
  X,
  LogOut,
  Wallet
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AuthDemo() {
  const { 
    isAuthenticated, 
    isLoading, 
    user, 
    currentRole, 
    login, 
    logout, 
    updateProfile,
    hasRole 
  } = useAuth();
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="p-8 bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-700 rounded w-1/4"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-12 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl space-y-6"
      >
        <div className="text-center">
          <h3 className="text-xl font-orbitron font-bold text-white mb-2">
            Authentication System Demo
          </h3>
          <p className="text-gray-400 text-sm">
            Connect your wallet to see the authentication system in action
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <h4 className="font-semibold text-blue-400 mb-2">🔐 Authentication Features</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Automatic profile detection based on Web3 activity</li>
              <li>• Support for multiple roles (Client, Reseller, Environment)</li>
              <li>• Route protection with smart middleware</li>
              <li>• ENS integration for identification</li>
            </ul>
          </div>

          <Button 
            onClick={login}
            className="w-full bg-gradient-to-r from-magenta-500 to-cyan-500 hover:from-magenta-600 hover:to-cyan-600"
          >
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet to Demo
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* User Profile Card */}
      <Card className="bg-black/20 backdrop-blur-lg border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-magenta-500 to-cyan-500 flex items-center justify-center">
                {user?.ensAvatar ? (
                  <img 
                    src={user.ensAvatar} 
                    alt="Avatar" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="h-6 w-6 text-white" />
                )}
              </div>
              <div>
                <CardTitle className="text-white">
                  {user?.ensName || `Usuário ${user?.walletAddress.slice(0, 8)}`}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {user?.walletAddress}
                </CardDescription>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge 
                variant="outline" 
                className="border-green-500 text-green-500"
              >
                <Check className="w-3 h-3 mr-1" />
                Authenticated
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Current Role Display */}
          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Crown className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium text-white">Active Profile:</span>
              <Badge variant="outline" className="border-primary-cyan text-primary-cyan">
                {currentRole?.charAt(0).toUpperCase() + (currentRole?.slice(1) || '')}
              </Badge>
            </div>
            <Badge variant="outline" className="border-yellow-500 text-yellow-500">
              {user?.roles?.length || 0} profiles available
            </Badge>
          </div>

          {/* Multi-Role Capabilities */}
          {user && user.roles && user.roles.length > 1 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white flex items-center">
                <Shield className="h-4 w-4 mr-2 text-green-400" />
                Multi-Role Swap Available
              </h4>
              <RoleSwitcher variant="pills" className="w-full" />
            </div>
          )}

          {/* User Analytics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="text-lg font-bold text-white">
                {user?.analytics?.ticketsPurchased || 0}
              </div>
              <div className="text-xs text-blue-400">Tickets Purchased</div>
            </div>
            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <div className="text-lg font-bold text-white">
                {user?.analytics?.eventsCreated || 0}
              </div>
              <div className="text-xs text-purple-400">Events Created</div>
            </div>
          </div>

          {/* Verification Status */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white">Verification Status</h4>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Email</span>
                {user?.verified?.email ? (
                  <Check className="h-4 w-4 text-green-400" />
                ) : (
                  <X className="h-4 w-4 text-red-400" />
                )}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">KYC</span>
                {user?.verified?.kyc ? (
                  <Check className="h-4 w-4 text-green-400" />
                ) : (
                  <X className="h-4 w-4 text-red-400" />
                )}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Business</span>
                {user?.verified?.business ? (
                  <Check className="h-4 w-4 text-green-400" />
                ) : (
                  <X className="h-4 w-4 text-red-400" />
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Auth Features Demo */}
      <Card className="bg-black/20 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Shield className="mr-2 h-5 w-5 text-green-400" />
            Active Authentication Features
          </CardTitle>
          <CardDescription className="text-gray-400">
            Features demonstrated in this session
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <h4 className="font-semibold text-green-400 mb-2">✅ Role Detection</h4>
              <p className="text-sm text-gray-300">
                System automatically detected your profile based on wallet activity
              </p>
            </div>
            
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">🔒 Protected Routes</h4>
              <p className="text-sm text-gray-300">
                Access to protected dashboards protected by role-based authentication
              </p>
            </div>
            
            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <h4 className="font-semibold text-purple-400 mb-2">🔄 Role Switching</h4>
              <p className="text-sm text-gray-300">
                Dynamic role swap between available profiles without reconnection
              </p>
            </div>
            
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <h4 className="font-semibold text-yellow-400 mb-2">👤 ENS Integration</h4>
              <p className="text-sm text-gray-300">
                Complete support for ENS names and avatars
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="border-cyan-500/30 text-cyan-400"
            >
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="border-yellow-500/30 text-yellow-400"
            >
              <Bell className="h-4 w-4 mr-1" />
              Notifications
            </Button>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                // Demo role adding
                if (user && user.roles.length === 1) {
                  const newRoles = [...user.roles, 'reseller' as const];
                  updateProfile({ roles: newRoles });
                }
              }}
              className="border-green-500/30 text-green-400"
            >
              <Crown className="h-4 w-4 mr-1" />
              {user?.roles?.length === 1 ? 'Simulate Multi-Role' : 'Multi-Role Active'}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                // Clear localStorage and force re-login for debugging
                if (user?.walletAddress) {
                  localStorage.removeItem(`user_${user.walletAddress}`);
                  window.location.reload();
                }
              }}
              className="border-red-500/30 text-red-400"
            >
              <X className="h-4 w-4 mr-1" />
              Reset Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access to Dashboards */}
      <Card className="bg-gradient-to-r from-magenta-500/10 to-cyan-500/10 border-magenta-500/30">
        <CardContent className="p-6">
          <h3 className="text-lg font-orbitron font-bold text-white mb-4">
            Access to Protected Dashboards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              asChild
              variant="outline"
              className={`border-blue-500/30 ${hasRole('client') ? 'text-blue-400' : 'text-gray-500 cursor-not-allowed'}`}
              disabled={!hasRole('client')}
            >
              <a href="/dashboard/client">
                <User className="h-4 w-4 mr-2" />
                Client Dashboard
              </a>
            </Button>
            
            <Button
              asChild
              variant="outline"
              className={`border-purple-500/30 ${hasRole('reseller') ? 'text-purple-400' : 'text-gray-500 cursor-not-allowed'}`}
              disabled={!hasRole('reseller')}
            >
              <a href="/dashboard/reseller">
                <Crown className="h-4 w-4 mr-2" />
                Reseller Portal
              </a>
            </Button>
            
            <Button
              asChild
              variant="outline"
              className={`border-green-500/30 ${hasRole('environment') ? 'text-green-400' : 'text-gray-500 cursor-not-allowed'}`}
              disabled={!hasRole('environment')}
            >
              <a href="/dashboard/environment">
                <Shield className="h-4 w-4 mr-2" />
                Environment Manager
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 