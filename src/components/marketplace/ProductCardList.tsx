'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Heart, 
  Star, 
  Calendar, 
  Clock, 
  MapPin, 
  ShoppingCart,
  Eye,
  Badge,
  Zap,
  Users
} from 'lucide-react';
import { VRExperience } from '@/types/marketplace';
import { useMarketplaceStore } from '@/stores/marketplaceStore';

interface ProductCardListProps {
  experience: VRExperience;
}

export default function ProductCardList({ experience }: ProductCardListProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist,
    addToCart 
  } = useMarketplaceStore();

  const isWishlisted = isInWishlist(experience.id);
  const standardPrice = experience.pricing.standard;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  };

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'ETH') {
      return `${price.toFixed(3)} ETH`;
    }
    return `${currency} ${price.toFixed(2)}`;
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(experience.id);
    } else {
      addToWishlist(experience.id);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (standardPrice) {
      addToCart(experience.id, 'standard', 1);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      concerts: 'from-purple-500 to-pink-500',
      sports: 'from-yellow-500 to-orange-500',
      gaming: 'from-green-500 to-emerald-500',
      education: 'from-blue-500 to-cyan-500',
      travel: 'from-sky-500 to-blue-500',
      art: 'from-pink-500 to-rose-500',
      fitness: 'from-red-500 to-pink-500',
      social: 'from-indigo-500 to-purple-500',
      business: 'from-slate-500 to-gray-500',
    };
    return colors[category] || 'from-[#8D42EC] to-[#60A3F9]';
  };

  return (
    <motion.div 
      className="group relative bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative w-full md:w-80 aspect-video md:aspect-auto md:h-64 overflow-hidden">
          {/* Image */}
          <Image
            src={experience.images[0]}
            alt={experience.title}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className={`object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Image Placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#8D42EC]/20 to-[#60A3F9]/20 animate-pulse" />
          )}

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {experience.featured && (
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full">
                ESPECIAL
              </span>
            )}
            {experience.trending && (
              <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                <Zap className="w-3 h-3" />
                EM ALTA
              </span>
            )}
          </div>

          {/* Category */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(experience.category)} text-white text-xs font-semibold rounded-full capitalize`}>
              {experience.category}
            </span>
          </div>

          {/* Creator Badge */}
          {experience.creator.verified && (
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/20 rounded-full">
              <Badge className="w-4 h-4 text-blue-400" />
              <span className="text-white text-xs font-medium">Verificado</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#60A3F9] transition-colors line-clamp-2">
                  {experience.title}
                </h3>
                <p className="text-gray-400 line-clamp-2 mb-3">
                  {experience.description}
                </p>
                
                {/* Creator */}
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>por</span>
                  <span className="text-white font-medium">{experience.creator.name}</span>
                </div>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={handleWishlistToggle}
                className="p-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-white hover:scale-110 transition-all duration-200 ml-4"
              >
                <Heart 
                  className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                />
              </button>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-white font-medium">{experience.rating.average}</span>
                <span>({experience.rating.count})</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{(experience.social.views / 1000).toFixed(1)}k visualizações</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{experience.venue.capacity} capacidade</span>
              </div>
            </div>

            {/* Event Details */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(experience.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{experience.duration} min</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{experience.venue.location}</span>
              </div>
            </div>

            {/* Requirements */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Compatível com:</span>
              <div className="flex gap-2">
                {experience.requirements.vr && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 border border-purple-500/40 rounded text-xs text-purple-300">
                    VR
                  </div>
                )}
                {experience.requirements.mobile && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 border border-blue-500/40 rounded text-xs text-blue-300">
                    Mobile
                  </div>
                )}
                {experience.requirements.desktop && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 border border-green-500/40 rounded text-xs text-green-300">
                    Desktop
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {experience.tags.slice(0, 4).map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-lg"
                >
                  {tag}
                </span>
              ))}
              {experience.tags.length > 4 && (
                <span className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-lg">
                  +{experience.tags.length - 4} mais
                </span>
              )}
            </div>
          </div>

          {/* Price & Action */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div className="flex items-center gap-4">
              {standardPrice && (
                <div>
                  <div className="text-2xl font-bold text-white">
                    {formatPrice(standardPrice.price, standardPrice.currency)}
                  </div>
                  <div className="text-xs text-gray-400">
                    {standardPrice.available} tickets available
                  </div>
                </div>
              )}
              
              {/* All Pricing Options */}
              <div className="flex gap-2">
                {experience.pricing.premium && (
                  <div className="text-sm text-gray-400">
                    Premium: {formatPrice(experience.pricing.premium.price, experience.pricing.premium.currency)}
                  </div>
                )}
                {experience.pricing.vip && (
                  <div className="text-sm text-gray-400">
                    VIP: {formatPrice(experience.pricing.vip.price, experience.pricing.vip.currency)}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all duration-200">
                Detalhes
              </button>
              <button
                onClick={handleAddToCart}
                disabled={!standardPrice || standardPrice.available === 0}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#8D42EC] to-[#60A3F9] text-white rounded-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200"
              >
                <ShoppingCart className="w-4 h-4" />
                Comprar Agora
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#8D42EC]/5 to-[#60A3F9]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
} 