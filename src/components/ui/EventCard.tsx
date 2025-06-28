'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, MapPin, Star, Users, Eye, Verified } from 'lucide-react';
import { Event } from '@/lib/mockData';
import Link from 'next/link';
import Image from 'next/image';

interface EventCardProps {
  event: Event;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

export const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  variant = 'default',
  className = '' 
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPrice = (price: { fiat: number; crypto: number }) => {
    return {
      fiat: `$${price.fiat.toFixed(2)}`,
      crypto: `${price.crypto.toFixed(3)} ETH`
    };
  };

  const soldPercentage = (event.soldTickets / event.capacity) * 100;
  
  const cardVariants = {
    default: 'group relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-brandMagenta/30 transition-all duration-500',
    featured: 'group relative overflow-hidden rounded-2xl bg-gradient-to-br from-brandMagenta/20 to-brandCyan/20 backdrop-blur-md border border-brandMagenta/30 shadow-neonRing hover:shadow-cyanGlow transition-all duration-500',
    compact: 'group relative overflow-hidden rounded-lg bg-black/30 backdrop-blur-sm border border-white/10 hover:border-brandCyan/30 transition-all duration-300'
  };

  const imageHeight = variant === 'compact' ? 'h-32' : variant === 'featured' ? 'h-56' : 'h-48';

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        rotateX: 2,
        rotateY: 2,
        z: 50
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }}
      className={`${cardVariants[variant]} ${className}`}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: 1000 
      }}
    >
      <Card className="h-full bg-transparent border-none shadow-none">
        {/* Event Image */}
        <div className={`relative ${imageHeight} overflow-hidden`}>
          <Image
            src={event.thumbnail}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Live Badge */}
          {event.isLive && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-3 left-3"
            >
              <Badge className="bg-red-500 text-white animate-pulse border-none">
                <div className="w-2 h-2 bg-white rounded-full mr-1 animate-ping" />
                LIVE
              </Badge>
            </motion.div>
          )}
          
          {/* Featured Badge */}
          {event.isFeatured && (
            <Badge className="absolute top-3 right-3 bg-gradient-to-r from-brandMagenta to-brandCyan text-white border-none">
              ⭐ Featured
            </Badge>
          )}
          
          {/* VR Quality Badge */}
          <Badge className="absolute bottom-3 right-3 bg-black/70 text-white border border-brandCyan/30">
            {event.streamQuality}
          </Badge>
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-white font-orbitron text-lg leading-tight group-hover:text-brandCyan transition-colors duration-300">
              {event.title}
            </CardTitle>
            
            {/* Reseller Verification */}
            {event.reseller.verified && (
              <div className="flex items-center text-brandCyan">
                <Verified className="w-4 h-4" />
              </div>
            )}
          </div>
          
          <CardDescription className="text-gray-400 text-sm line-clamp-2">
            {event.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Event Info */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center text-gray-300">
              <CalendarDays className="w-4 h-4 mr-2 text-brandMagenta" />
              {formatDate(event.date)}
            </div>
            <div className="flex items-center text-gray-300">
              <Clock className="w-4 h-4 mr-2 text-brandCyan" />
              {event.time}
            </div>
            <div className="flex items-center text-gray-300 col-span-2">
              <MapPin className="w-4 h-4 mr-2 text-brandMagenta" />
              {event.venue}
            </div>
          </div>

          {/* Rating and Attendance */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-yellow-400">
                <Star className="w-4 h-4 mr-1 fill-current" />
                <span>{event.ratings.average}</span>
                <span className="text-gray-400 ml-1">({event.ratings.count})</span>
              </div>
              
              <div className="flex items-center text-gray-300">
                <Users className="w-4 h-4 mr-1 text-brandCyan" />
                <span>{event.soldTickets.toLocaleString()}</span>
              </div>
            </div>
            
            {/* Sold Percentage Indicator */}
            <div className="flex items-center">
              <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-brandMagenta to-brandCyan transition-all duration-500"
                  style={{ width: `${soldPercentage}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 ml-2">{soldPercentage.toFixed(0)}%</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {event.tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs border-brandCyan/30 text-brandCyan bg-brandCyan/10"
              >
                {tag}
              </Badge>
            ))}
            {event.tags.length > 3 && (
              <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                +{event.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Reseller Info */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-brandMagenta to-brandCyan flex items-center justify-center text-xs font-bold text-white">
                {event.reseller.name[0]}
              </div>
              <span className="text-sm text-gray-300">{event.reseller.name}</span>
              <div className="flex items-center text-yellow-400">
                <Star className="w-3 h-3 mr-1 fill-current" />
                <span className="text-xs">{event.reseller.rating}</span>
              </div>
            </div>
          </div>

          {/* Price and Action */}
          <div className="flex items-center justify-between pt-3">
            <div className="space-y-1">
              <div className="text-xl font-bold text-white">
                {formatPrice(event.price).fiat}
              </div>
              <div className="text-sm text-brandCyan">
                {formatPrice(event.price).crypto}
              </div>
            </div>
            
            <div className="flex space-x-2">
              {event.vrPreview && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-brandCyan/30 text-brandCyan hover:bg-brandCyan/10"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
              )}
              
              <Link href={`/events/${event.id}`}>
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-brandMagenta to-brandCyan hover:from-brandMagenta/80 hover:to-brandCyan/80 text-white font-medium"
                >
                  View Event
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-brandMagenta/20 to-brandCyan/20 blur-xl" />
      </div>
    </motion.div>
  );
}; 