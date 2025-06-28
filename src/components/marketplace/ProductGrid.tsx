'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useMarketplaceStore } from '@/stores/marketplaceStore';
import { VRExperience } from '@/types/marketplace';
import ProductCard from './ProductCard';
import ProductCardList from './ProductCardList';

interface ProductGridProps {
  experiences?: VRExperience[];
}

export default function ProductGrid({ experiences: customExperiences }: ProductGridProps) {
  const { 
    experiences,
    searchResult,
    viewMode,
    isSearching,
    searchQuery
  } = useMarketplaceStore();

  // Use custom experiences if provided, otherwise use search results or all experiences
  const displayExperiences = customExperiences || 
    (searchResult ? searchResult.experiences : experiences);

  if (isSearching) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-[#8D42EC] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-300">Looking for experiences...</span>
          </div>
        </div>
      </div>
    );
  }

  if (displayExperiences.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#8D42EC]/20 to-[#60A3F9]/20 flex items-center justify-center">
            <div className="text-4xl">🔍</div>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No experiences found
          </h3>
          <p className="text-gray-400 max-w-md mx-auto">
            {searchQuery 
              ? `No results found for "${searchQuery}". Try adjusting filters or searching for other terms.`
              : 'Adjust filters to find experiences that match your interests.'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {searchQuery ? 'Search Results' : 'VR Experiences'}
          </h2>
          <p className="text-gray-400 mt-1">
            {displayExperiences.length} experience{displayExperiences.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      {/* Grid/List View */}
      {viewMode === 'grid' ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {displayExperiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard experience={experience} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {displayExperiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <ProductCardList experience={experience} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
} 