'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  Star, 
  Calendar, 
  DollarSign, 
  ArrowUpDown,
  ChevronDown,
  Smartphone,
  Monitor,
  Headphones,
  X
} from 'lucide-react';
import { useMarketplaceStore } from '@/stores/marketplaceStore';
import { MarketplaceFilters, MarketplaceSort } from '@/types/marketplace';

export default function SearchFilters() {
  const { 
    filters, 
    sort, 
    applyFilters, 
    setSortBy,
    experiences 
  } = useMarketplaceStore();

  const [localFilters, setLocalFilters] = useState<MarketplaceFilters>(filters);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    price: true,
    rating: true,
    requirements: true,
    date: false,
  });

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 0.5,
    currency: 'ETH' as const
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (newFilters: Partial<MarketplaceFilters>) => {
    const updatedFilters = { ...localFilters, ...newFilters };
    setLocalFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  const handleSortChange = (newSort: MarketplaceSort) => {
    setSortBy(newSort);
  };

  const clearFilters = () => {
    const emptyFilters: MarketplaceFilters = {};
    setLocalFilters(emptyFilters);
    applyFilters(emptyFilters);
    setPriceRange({ min: 0, max: 0.5, currency: 'ETH' });
  };

  const hasActiveFilters = Object.keys(localFilters).length > 0;

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-[#8D42EC]" />
          <h3 className="text-lg font-semibold text-white">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
            Limpar
          </button>
        )}
      </div>

      {/* Sort By */}
      <div className="p-4 bg-black/20 backdrop-blur-md border border-white/10 rounded-xl">
        <h4 className="flex items-center gap-2 text-white font-medium mb-4">
          <ArrowUpDown className="w-4 h-4" />
          Ordenar por
        </h4>
        <div className="space-y-2">
          {[
            { field: 'date', direction: 'asc', label: 'Data (mais próximo)' },
            { field: 'date', direction: 'desc', label: 'Data (mais distante)' },
            { field: 'price', direction: 'asc', label: 'Preço (menor)' },
            { field: 'price', direction: 'desc', label: 'Preço (maior)' },
            { field: 'rating', direction: 'desc', label: 'Avaliação (maior)' },
            { field: 'popularity', direction: 'desc', label: 'Popularidade' },
            { field: 'newest', direction: 'desc', label: 'Mais recentes' },
          ].map((option) => (
            <label key={`${option.field}-${option.direction}`} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="sort"
                checked={sort.field === option.field && sort.direction === option.direction}
                onChange={() => handleSortChange({ 
                  field: option.field as any, 
                  direction: option.direction as 'asc' | 'desc' 
                })}
                className="w-4 h-4 text-[#8D42EC] bg-black/40 border-gray-600 focus:ring-[#8D42EC] focus:ring-2"
              />
              <span className="text-gray-300 text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="p-4 bg-black/20 backdrop-blur-md border border-white/10 rounded-xl">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-white font-medium mb-4"
        >
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Faixa de Preço
          </div>
          <ChevronDown 
            className={`w-4 h-4 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} 
          />
        </button>
        
        <AnimatePresence>
          {expandedSections.price && (
            <motion.div 
              className="space-y-4"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-xs text-gray-400 mb-1">Mín</label>
                  <input
                    type="number"
                    step="0.01"
                    value={priceRange.min}
                    onChange={(e) => {
                      const newRange = { ...priceRange, min: parseFloat(e.target.value) || 0 };
                      setPriceRange(newRange);
                      handleFilterChange({ priceRange: newRange });
                    }}
                    className="w-full p-2 bg-black/40 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#8D42EC]"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-400 mb-1">Máx</label>
                  <input
                    type="number"
                    step="0.01"
                    value={priceRange.max}
                    onChange={(e) => {
                      const newRange = { ...priceRange, max: parseFloat(e.target.value) || 0.5 };
                      setPriceRange(newRange);
                      handleFilterChange({ priceRange: newRange });
                    }}
                    className="w-full p-2 bg-black/40 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#8D42EC]"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Moeda:</span>
                <select
                  value={priceRange.currency}
                  onChange={(e) => {
                    const newRange = { ...priceRange, currency: e.target.value as any };
                    setPriceRange(newRange);
                    handleFilterChange({ priceRange: newRange });
                  }}
                  className="p-1 bg-black/40 border border-white/20 rounded text-white text-xs focus:outline-none focus:border-[#8D42EC]"
                >
                  <option value="ETH">ETH</option>
                  <option value="USDC">USDC</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Rating Filter */}
      <div className="p-4 bg-black/20 backdrop-blur-md border border-white/10 rounded-xl">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full text-white font-medium mb-4"
        >
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Avaliação Mínima
          </div>
          <ChevronDown 
            className={`w-4 h-4 transition-transform ${expandedSections.rating ? 'rotate-180' : ''}`} 
          />
        </button>
        
        <AnimatePresence>
          {expandedSections.rating && (
            <motion.div 
              className="space-y-3"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {[5, 4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={localFilters.rating === rating}
                    onChange={() => handleFilterChange({ rating })}
                    className="w-4 h-4 text-[#8D42EC] bg-black/40 border-gray-600 focus:ring-[#8D42EC] focus:ring-2"
                  />
                  <div className="flex items-center gap-1">
                    {Array.from({ length: rating }, (_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-gray-300 text-sm ml-2">e acima</span>
                  </div>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Requirements */}
      <div className="p-4 bg-black/20 backdrop-blur-md border border-white/10 rounded-xl">
        <button
          onClick={() => toggleSection('requirements')}
          className="flex items-center justify-between w-full text-white font-medium mb-4"
        >
          <div className="flex items-center gap-2">
            <Headphones className="w-4 h-4" />
            Compatibilidade
          </div>
          <ChevronDown 
            className={`w-4 h-4 transition-transform ${expandedSections.requirements ? 'rotate-180' : ''}`} 
          />
        </button>
        
        <AnimatePresence>
          {expandedSections.requirements && (
            <motion.div 
              className="space-y-3"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {[
                { key: 'vr', label: 'VR Headset', icon: Headphones },
                { key: 'mobile', label: 'Mobile', icon: Smartphone },
                { key: 'desktop', label: 'Desktop', icon: Monitor },
              ].map(({ key, label, icon: Icon }) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localFilters.requirements?.[key as keyof typeof localFilters.requirements] || false}
                    onChange={(e) => handleFilterChange({
                      requirements: {
                        ...localFilters.requirements,
                        [key]: e.target.checked
                      }
                    })}
                    className="w-4 h-4 text-[#8D42EC] bg-black/40 border-gray-600 rounded focus:ring-[#8D42EC] focus:ring-2"
                  />
                  <Icon className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300 text-sm">{label}</span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Special Filters */}
      <div className="p-4 bg-black/20 backdrop-blur-md border border-white/10 rounded-xl">
        <h4 className="text-white font-medium mb-4">Especiais</h4>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={localFilters.featured || false}
              onChange={(e) => handleFilterChange({ featured: e.target.checked })}
              className="w-4 h-4 text-[#8D42EC] bg-black/40 border-gray-600 rounded focus:ring-[#8D42EC] focus:ring-2"
            />
            <span className="text-gray-300 text-sm">Special Experiences</span>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={localFilters.trending || false}
              onChange={(e) => handleFilterChange({ trending: e.target.checked })}
              className="w-4 h-4 text-[#8D42EC] bg-black/40 border-gray-600 rounded focus:ring-[#8D42EC] focus:ring-2"
            />
            <span className="text-gray-300 text-sm">Em Alta</span>
          </label>
        </div>
      </div>

      {/* Results Count */}
      <div className="p-4 bg-gradient-to-r from-[#8D42EC]/20 to-[#60A3F9]/20 backdrop-blur-md border border-white/10 rounded-xl">
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-1">
            {experiences.length}
          </div>
          <div className="text-sm text-gray-300">
            experiences found
          </div>
        </div>
      </div>
    </motion.div>
  );
} 