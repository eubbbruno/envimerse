'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { 
  User, 
  Store, 
  Building, 
  ChevronDown, 
  Check,
  Crown,
  Shield
} from 'lucide-react';

interface RoleOption {
  value: UserRole;
  label: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  borderColor?: string;
}

const roleOptions: RoleOption[] = [
  {
    value: 'client',
    label: 'Client',
    description: 'Purchase VR tickets',
    icon: User,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30'
  },
  {
    value: 'reseller',
    label: 'Reseller',
    description: 'Sell events and tickets',
    icon: Store,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30'
  },
  {
    value: 'environment',
    label: 'Environment',
    description: 'Manage VR venues',
    icon: Building,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30'
  },
];

interface RoleSwitcherProps {
  className?: string;
  showDescription?: boolean;
  variant?: 'dropdown' | 'pills' | 'sidebar';
}

export default function RoleSwitcher({ 
  className = '', 
  showDescription = true,
  variant = 'dropdown' 
}: RoleSwitcherProps) {
  const { user, currentRole, switchRole, hasRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user || !user.roles || user.roles.length <= 1) {
    return null; // Don't show if user has only one role
  }

  const availableRoles = roleOptions.filter(role => hasRole(role.value));
  const currentRoleData = roleOptions.find(role => role.value === currentRole);

  const handleRoleSwitch = (role: UserRole) => {
    switchRole(role);
    setIsOpen(false);
  };

  if (variant === 'pills') {
    return (
      <div className={`flex gap-2 ${className}`}>
        {availableRoles.map((role) => {
          const Icon = role.icon;
          const isActive = currentRole === role.value;
          
          return (
            <motion.button
              key={role.value}
              onClick={() => handleRoleSwitch(role.value)}
              className={`
                relative px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300
                ${isActive 
                  ? `${role.bgColor} ${role.color} ring-2 ring-current/30` 
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{role.label}</span>
              
              {isActive && (
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-magenta-500 to-cyan-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
          Switch Profile
        </div>
        {availableRoles.map((role) => {
          const Icon = role.icon;
          const isActive = currentRole === role.value;
          
          return (
            <motion.button
              key={role.value}
              onClick={() => handleRoleSwitch(role.value)}
              className={`
                w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 transition-all duration-300
                ${isActive 
                  ? `${role.bgColor} ${role.color}` 
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                }
              `}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{role.label}</div>
                {showDescription && (
                  <div className="text-xs opacity-70 truncate">{role.description}</div>
                )}
              </div>
              {isActive && (
                <Check className="w-3 h-3 shrink-0" />
              )}
            </motion.button>
          );
        })}
      </div>
    );
  }

  // Default dropdown variant
  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3 flex items-center justify-between hover:border-gray-600/50 transition-all duration-300"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-3">
          {currentRoleData && (
            <>
              <div className={`p-2 rounded-lg ${currentRoleData.bgColor}`}>
                <currentRoleData.icon className={`w-4 h-4 ${currentRoleData.color}`} />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-white">{currentRoleData.label}</div>
                {showDescription && (
                  <div className="text-xs text-gray-400">{currentRoleData.description}</div>
                )}
              </div>
            </>
          )}
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              {availableRoles.map((role, index) => {
                const Icon = role.icon;
                const isActive = currentRole === role.value;
                
                return (
                  <motion.button
                    key={role.value}
                    onClick={() => handleRoleSwitch(role.value)}
                    className={`
                      w-full text-left px-4 py-3 flex items-center gap-3 transition-all duration-300
                      ${isActive 
                        ? `${role.bgColor} ${role.color}` 
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                      }
                      ${index !== availableRoles.length - 1 ? 'border-b border-gray-800/50' : ''}
                    `}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className={`p-2 rounded-lg ${role.bgColor}`}>
                      <Icon className={`w-4 h-4 ${role.color}`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{role.label}</span>
                        {isActive && (
                          <Crown className="w-3 h-3 text-yellow-400" />
                        )}
                      </div>
                      {showDescription && (
                        <div className="text-xs opacity-70">{role.description}</div>
                      )}
                    </div>
                    
                    {isActive && (
                      <Check className="w-4 h-4 text-green-400" />
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 