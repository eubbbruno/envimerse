'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Ticket, 
  TrendingUp, 
  Building, 
  Settings, 
  Menu, 
  X,
  Wallet,
  LogOut,
  User,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConnectWalletButton from '@/components/ConnectWalletButton';
import { useUserWallet } from '@/hooks/useUserWallet';
import { useAuth } from '@/contexts/AuthContext';
import RoleSwitcher from '@/components/auth/RoleSwitcher';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'client' | 'reseller' | 'environment';
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: ('client' | 'reseller' | 'environment')[];
}

const navigationItems: NavigationItem[] = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['client', 'reseller', 'environment']
  },
  {
    name: 'My Tickets',
    href: '/dashboard/client',
    icon: Ticket,
    roles: ['client']
  },
  {
    name: 'Sales Analytics',
    href: '/dashboard/reseller',
    icon: TrendingUp,
    roles: ['reseller']
  },
  {
    name: 'Venues',
    href: '/dashboard/environment',
    icon: Building,
    roles: ['environment']
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    roles: ['client', 'reseller', 'environment']
  }
];

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { address, isConnected, getShortAddress } = useUserWallet();
  const { user, currentRole, logout } = useAuth();
  const shortAddress = getShortAddress();

  const roleBasedNav = navigationItems.filter(item => item.roles.includes(role));

  const getRoleTitle = () => {
    switch (role) {
      case 'client':
        return 'Client Dashboard';
      case 'reseller':
        return 'Reseller Portal';
      case 'environment':
        return 'Environment Manager';
      default:
        return 'Dashboard';
    }
  };

  const getRoleColor = () => {
    switch (role) {
      case 'client':
        return 'from-blue-500 to-cyan-500';
      case 'reseller':
        return 'from-purple-500 to-pink-500';
      case 'environment':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-primary-magenta to-primary-cyan';
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D12] text-white">
      {/* Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/20 backdrop-blur-lg border-r border-white/10 px-6 pb-4">
          {/* Logo Section */}
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-magenta to-primary-cyan" />
              <span className="font-orbitron text-lg font-bold">Envimerse</span>
            </Link>
          </div>

          {/* Role Badge */}
          <div className="pb-2">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getRoleColor()} text-white`}>
              {getRoleTitle()}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {roleBasedNav.map((item) => {
                    const isActive = pathname === item.href || 
                                    (item.href !== '/dashboard' && pathname.startsWith(item.href));
                    
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-all duration-200 ${
                            isActive
                              ? 'bg-gradient-to-r from-primary-magenta/20 to-primary-cyan/20 text-white border border-primary-magenta/30'
                              : 'text-gray-300 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <item.icon
                            className={`h-6 w-6 shrink-0 transition-colors ${
                              isActive ? 'text-primary-cyan' : 'text-gray-400 group-hover:text-primary-cyan'
                            }`}
                          />
                          {item.name}
                          {isActive && (
                            <motion.div
                              layoutId="activeTab"
                              className="ml-auto h-2 w-2 rounded-full bg-primary-cyan"
                              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                            />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>

              {/* Role Switcher */}
              {user && user.roles && user.roles.length > 1 && (
                <li className="border-t border-white/10 pt-4">
                  <RoleSwitcher variant="sidebar" className="w-full" />
                </li>
              )}

              {/* Wallet Section */}
              <li className="mt-auto border-t border-white/10 pt-4">
                {isConnected && address ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-magenta to-primary-cyan flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {user?.ensName || shortAddress}
                        </p>
                        <p className="text-xs text-gray-400">
                          {user?.role ? `${user.role.charAt(0).toUpperCase() + user.role.slice(1)}` : 'Connected'}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-gray-300 border-white/20 hover:bg-white/5"
                      onClick={logout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="w-full">
                    <ConnectWalletButton />
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 lg:hidden"
            >
              <div 
                className="fixed inset-0 bg-black/50"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                className="fixed inset-y-0 left-0 z-50 w-64 bg-black/90 backdrop-blur-lg border-r border-white/10"
              >
                <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
                  {/* Logo Section */}
                  <div className="flex h-16 shrink-0 items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-magenta to-primary-cyan" />
                      <span className="font-orbitron text-lg font-bold">Envimerse</span>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Role Badge */}
                  <div className="pb-2">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getRoleColor()} text-white`}>
                      {getRoleTitle()}
                    </div>
                  </div>

                  {/* Navigation */}
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {roleBasedNav.map((item) => {
                            const isActive = pathname === item.href || 
                                            (item.href !== '/dashboard' && pathname.startsWith(item.href));
                            
                            return (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  onClick={() => setSidebarOpen(false)}
                                  className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-all duration-200 ${
                                    isActive
                                      ? 'bg-gradient-to-r from-primary-magenta/20 to-primary-cyan/20 text-white border border-primary-magenta/30'
                                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                                  }`}
                                >
                                  <item.icon
                                    className={`h-6 w-6 shrink-0 transition-colors ${
                                      isActive ? 'text-primary-cyan' : 'text-gray-400 group-hover:text-primary-cyan'
                                    }`}
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>

                      {/* Wallet Section */}
                      <li className="mt-auto border-t border-white/10 pt-4">
                        {isConnected && address ? (
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
                              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-magenta to-primary-cyan flex items-center justify-center">
                                <User className="h-4 w-4 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                  {shortAddress}
                                </p>
                                <p className="text-xs text-gray-400">Connected</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full">
                            <ConnectWalletButton />
                          </div>
                        )}
                      </li>
                    </ul>
                  </nav>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-4 border-b border-white/10 bg-black/20 backdrop-blur-lg px-4 sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-xl font-orbitron font-bold bg-gradient-to-r from-primary-magenta to-primary-cyan bg-clip-text text-transparent">
                {getRoleTitle()}
              </h1>
            </div>
            
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* Wallet Info */}
              {isConnected && (
                <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                  <Wallet className="h-4 w-4 text-primary-cyan" />
                  <span className="text-sm font-medium">{shortAddress}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
} 