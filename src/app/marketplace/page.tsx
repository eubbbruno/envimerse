'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMarketplaceStore } from '@/stores/marketplaceStore';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import CategoryFilter from '@/components/marketplace/CategoryFilter';
import SearchFilters from '@/components/marketplace/SearchFilters';
import ProductGrid from '@/components/marketplace/ProductGrid';
import LoadingSpinner from '@/components/marketplace/LoadingSpinner';
import AnimatedNavigation from '@/components/AnimatedNavigation';
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function MarketplacePage() {
  const { 
    isLoading, 
    loadMockData, 
    experiences,
    featuredExperiences,
    trendingExperiences 
  } = useMarketplaceStore();

  useEffect(() => {
    if (experiences.length === 0) {
      loadMockData();
    }
  }, [loadMockData, experiences.length]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#16162a] to-[#1a1a2e]">
        <AnimatedNavigation />
        
        {/* Hero Section */}
        <motion.section 
          className="relative pt-28 pb-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto">
            <MarketplaceHeader />
          </div>
        </motion.section>

        {/* Category Navigation */}
        <motion.section 
          className="sticky top-24 z-40 bg-black/20 backdrop-blur-md border-b border-white/10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            <CategoryFilter />
          </div>
        </motion.section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <motion.aside 
              className="lg:w-80 shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <SearchFilters />
            </motion.aside>

            {/* Product Grid */}
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <ProductGrid />
            </motion.div>
          </div>
        </main>

        {/* Featured Section */}
        {featuredExperiences.length > 0 && (
          <motion.section 
            className="max-w-7xl mx-auto px-4 py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Special <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8D42EC] to-[#60A3F9]">Experiences</span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Discover unique and exclusive VR experiences specially selected for you
              </p>
            </div>
            <ProductGrid experiences={featuredExperiences} />
          </motion.section>
        )}

        {/* Trending Section */}
        {trendingExperiences.length > 0 && (
          <motion.section 
            className="max-w-7xl mx-auto px-4 py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <div className="text-center mb-12">
                          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8D42EC] to-[#60A3F9]">Now</span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                The most popular and talked about VR experiences of the moment
              </p>
            </div>
            <ProductGrid experiences={trendingExperiences} />
          </motion.section>
        )}
      </div>
      <Footer />
    </>
  );
} 