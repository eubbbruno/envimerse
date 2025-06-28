'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Music, 
  Trophy, 
  Gamepad2, 
  GraduationCap, 
  Plane, 
  Palette, 
  Activity, 
  Users, 
  Briefcase 
} from 'lucide-react';
import { useMarketplaceStore } from '@/stores/marketplaceStore';
import { VRCategory } from '@/types/marketplace';

const categoryConfig: Record<VRCategory | 'all', { 
  label: string; 
  icon: React.ElementType; 
  color: string;
  gradient: string;
}> = {
  all: { 
    label: 'Todas', 
    icon: Users, 
    color: 'text-white',
    gradient: 'from-[#8D42EC] to-[#60A3F9]'
  },
  concerts: { 
    label: 'Concertos', 
    icon: Music, 
    color: 'text-purple-400',
    gradient: 'from-purple-500 to-pink-500'
  },
  sports: { 
    label: 'Esportes', 
    icon: Trophy, 
    color: 'text-yellow-400',
    gradient: 'from-yellow-500 to-orange-500'
  },
  gaming: { 
    label: 'Games', 
    icon: Gamepad2, 
    color: 'text-green-400',
    gradient: 'from-green-500 to-emerald-500'
  },
  education: { 
    label: 'Educação', 
    icon: GraduationCap, 
    color: 'text-blue-400',
    gradient: 'from-blue-500 to-cyan-500'
  },
  travel: { 
    label: 'Viagens', 
    icon: Plane, 
    color: 'text-sky-400',
    gradient: 'from-sky-500 to-blue-500'
  },
  art: { 
    label: 'Arte', 
    icon: Palette, 
    color: 'text-pink-400',
    gradient: 'from-pink-500 to-rose-500'
  },
  fitness: { 
    label: 'Fitness', 
    icon: Activity, 
    color: 'text-red-400',
    gradient: 'from-red-500 to-pink-500'
  },
  social: { 
    label: 'Social', 
    icon: Users, 
    color: 'text-indigo-400',
    gradient: 'from-indigo-500 to-purple-500'
  },
  business: { 
    label: 'Negócios', 
    icon: Briefcase, 
    color: 'text-slate-400',
    gradient: 'from-slate-500 to-gray-500'
  },
};

export default function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useMarketplaceStore();

  const categories: (VRCategory | 'all')[] = [
    'all', 'concerts', 'sports', 'gaming', 'education', 
    'travel', 'art', 'fitness', 'social', 'business'
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
      {categories.map((category, index) => {
        const config = categoryConfig[category];
        const Icon = config.icon;
        const isSelected = selectedCategory === category;

        return (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`relative flex items-center gap-3 px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300 ${
              isSelected 
                ? 'text-white shadow-lg shadow-purple-500/25' 
                : 'text-gray-400 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {/* Background */}
            <div 
              className={`absolute inset-0 rounded-full transition-all duration-300 ${
                isSelected 
                  ? `bg-gradient-to-r ${config.gradient} opacity-100` 
                  : 'bg-black/20 backdrop-blur-sm border border-white/10 opacity-80 hover:opacity-100'
              }`}
            />
            
            {/* Content */}
            <div className="relative flex items-center gap-3">
              <Icon className="w-5 h-5" />
              <span className="font-medium">{config.label}</span>
            </div>

            {/* Glow Effect */}
            {isSelected && (
              <motion.div 
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${config.gradient} blur-md opacity-30 -z-10`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 0.3 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
} 