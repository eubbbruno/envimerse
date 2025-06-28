'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, ShoppingBag, Heart } from 'lucide-react';
import { useMarketplaceStore } from '@/stores/marketplaceStore';

export default function MarketplaceHeader() {
  const [searchInput, setSearchInput] = useState('');
  const { 
    searchQuery,
    searchExperiences,
    viewMode,
    setViewMode,
    getCartItemCount 
  } = useMarketplaceStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchExperiences(searchInput);
  };

  const cartItemCount = getCartItemCount();

  return (
    <div className="space-y-8">
      {/* Main Header */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8D42EC] to-[#60A3F9]">
            VR Marketplace
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Explore unique immersive experiences. Connect with virtual worlds. 
          <br />
          <span className="text-[#60A3F9]">Your digital future starts here.</span>
        </p>
      </motion.div>

      {/* Search and Controls */}
      <motion.div 
        className="flex flex-col lg:flex-row gap-6 items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl w-full">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8D42EC] to-[#60A3F9] rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-6 w-5 h-5 text-gray-400 z-10" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search VR experiences..."
                className="w-full pl-14 pr-6 py-4 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#8D42EC] transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-2 px-6 py-2 bg-gradient-to-r from-[#8D42EC] to-[#60A3F9] text-white rounded-full hover:scale-105 transition-transform duration-200"
              >
                Search
              </button>
            </div>
          </div>
        </form>

        {/* View Controls */}
        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 p-1 bg-black/40 backdrop-blur-md border border-white/20 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-lg transition-all duration-200 ${
                viewMode === 'grid' 
                  ? 'bg-gradient-to-r from-[#8D42EC] to-[#60A3F9] text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-lg transition-all duration-200 ${
                viewMode === 'list' 
                  ? 'bg-gradient-to-r from-[#8D42EC] to-[#60A3F9] text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Wishlist */}
            <button className="relative p-3 bg-black/40 backdrop-blur-md border border-white/20 rounded-lg text-gray-400 hover:text-[#8D42EC] transition-all duration-200 hover:scale-105">
              <Heart className="w-5 h-5" />
            </button>

            {/* Cart */}
            <button className="relative p-3 bg-black/40 backdrop-blur-md border border-white/20 rounded-lg text-gray-400 hover:text-[#60A3F9] transition-all duration-200 hover:scale-105">
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <motion.span 
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#8D42EC] to-[#60A3F9] text-white text-xs font-bold rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  {cartItemCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Search Results Info */}
      {searchQuery && (
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-400">
            Results for: <span className="text-[#60A3F9] font-semibold">"{searchQuery}"</span>
          </p>
        </motion.div>
      )}

      {/* Stats */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {[
          { label: 'Experiences', value: '50+', color: 'from-[#8D42EC] to-[#60A3F9]' },
          { label: 'Creators', value: '25+', color: 'from-[#60A3F9] to-[#8D42EC]' },
          { label: 'VR Hours', value: '10K+', color: 'from-[#8D42EC] to-[#60A3F9]' },
          { label: 'Users', value: '2.5K+', color: 'from-[#60A3F9] to-[#8D42EC]' },
        ].map((stat, index) => (
          <motion.div 
            key={stat.label}
            className="text-center p-6 bg-black/20 backdrop-blur-md border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
          >
            <div className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-2`}>
              {stat.value}
            </div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 