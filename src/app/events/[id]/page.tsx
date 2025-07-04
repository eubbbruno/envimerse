'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EventCard } from '@/components/ui/EventCard';
import { 
  getEventById, 
  mockEvents,
  getEventsByCategory 
} from '@/lib/mockData';
import { 
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  Share2,
  Heart,
  Play,
  Verified,
  Shield,
  Globe,
  Headphones,
  Camera,
  Download,
  CreditCard,
  Wallet,
  Gift,
  MessageCircle
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.id as string;
  const event = getEventById(eventId);
  
  const [selectedCurrency, setSelectedCurrency] = useState<'fiat' | 'crypto'>('fiat');
  const [quantity, setQuantity] = useState(1);
  const [showVRPreview, setShowVRPreview] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-orbitron font-bold mb-4">Event Not Found</h1>
          <p className="text-gray-400 mb-6">The event you're looking for doesn't exist.</p>
          <Link href="/events">
            <Button className="bg-gradient-to-r from-brandMagenta to-brandCyan">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const soldPercentage = (event.soldTickets / event.capacity) * 100;
  const remainingTickets = event.capacity - event.soldTickets;
  const totalPrice = selectedCurrency === 'fiat' 
    ? event.price.fiat * quantity 
    : event.price.crypto * quantity;

  const relatedEvents = getEventsByCategory(event.category)
    .filter(e => e.id !== event.id)
    .slice(0, 3);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-white">
        {/* Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/events">
            <Button variant="outline" className="border-white/20 text-gray-300 hover:border-brandCyan/50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-6 left-6 flex flex-wrap gap-2">
            {event.isLive && (
              <Badge className="bg-red-500 text-white animate-pulse border-none">
                <div className="w-2 h-2 bg-white rounded-full mr-1 animate-ping" />
                LIVE NOW
              </Badge>
            )}
            {event.isFeatured && (
              <Badge className="bg-gradient-to-r from-brandMagenta to-brandCyan text-white border-none">
                ⭐ Featured
              </Badge>
            )}
            <Badge className="bg-black/70 text-white border border-brandCyan/30">
              {event.streamQuality}
            </Badge>
          </div>

          {/* VR Preview Button */}
          {event.vrPreview && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowVRPreview(true)}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300"
            >
              <Play className="w-8 h-8 text-white ml-1" />
            </motion.button>
          )}

          {/* Action Buttons */}
          <div className="absolute top-6 right-6 flex gap-2">
            <Button size="sm" variant="outline" className="border-white/20 bg-black/20 backdrop-blur-sm">
              <Heart className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" className="border-white/20 bg-black/20 backdrop-blur-sm">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Event Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-4">
                  {event.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-lg">
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-5 h-5 mr-2 text-brandMagenta" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-5 h-5 mr-2 text-brandCyan" />
                    {formatTime(event.time)}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-5 h-5 mr-2 text-brandMagenta" />
                    {event.venue}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Event Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-black/40 backdrop-blur-md rounded-xl border border-white/10 p-6"
              >
                <h2 className="text-2xl font-orbitron font-bold text-white mb-4">About This Event</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {event.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className="border-brandCyan/30 text-brandCyan bg-brandCyan/10"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </motion.section>

              {/* Reseller Info */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-black/40 backdrop-blur-md rounded-xl border border-white/10 p-6"
              >
                <h2 className="text-2xl font-orbitron font-bold text-white mb-4">VR Reseller</h2>
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-brandMagenta to-brandCyan flex items-center justify-center text-2xl font-bold text-white">
                    {event.reseller.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold text-white">{event.reseller.name}</h3>
                      {event.reseller.verified && (
                        <Verified className="w-5 h-5 text-brandCyan" />
                      )}
                    </div>
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        <span>{event.reseller.rating}</span>
                      </div>
                      <span className="text-gray-400">{event.reseller.totalEvents} events</span>
                    </div>
                    <p className="text-gray-300 mb-4">{event.reseller.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {event.reseller.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Equipment & Quality */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-black/40 backdrop-blur-md rounded-xl border border-white/10 p-6"
              >
                <h2 className="text-2xl font-orbitron font-bold text-white mb-4">VR Experience Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Camera className="w-5 h-5 mr-2 text-brandMagenta" />
                      Equipment Used
                    </h3>
                    <ul className="space-y-2">
                      {event.equipmentUsed.map((equipment, index) => (
                        <li key={index} className="text-gray-300 flex items-center">
                          <div className="w-2 h-2 bg-brandCyan rounded-full mr-3" />
                          {equipment}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Headphones className="w-5 h-5 mr-2 text-brandCyan" />
                      Features
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-brandMagenta rounded-full mr-3" />
                        {event.streamQuality} Resolution
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-brandMagenta rounded-full mr-3" />
                        Spatial Audio
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-brandMagenta rounded-full mr-3" />
                        Multi-angle Views
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-brandMagenta rounded-full mr-3" />
                        Real-time Streaming
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* Right Column - Purchase Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="sticky top-6"
              >
                <div className="bg-black/40 backdrop-blur-md rounded-xl border border-white/10 p-6">
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-400">Price per ticket</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedCurrency('fiat')}
                          className={`px-3 py-1 rounded text-sm transition-colors ${
                            selectedCurrency === 'fiat'
                              ? 'bg-brandMagenta text-white'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          USD
                        </button>
                        <button
                          onClick={() => setSelectedCurrency('crypto')}
                          className={`px-3 py-1 rounded text-sm transition-colors ${
                            selectedCurrency === 'crypto'
                              ? 'bg-brandCyan text-white'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          ETH
                        </button>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {selectedCurrency === 'fiat' 
                        ? `$${event.price.fiat.toFixed(2)}`
                        : `${event.price.crypto.toFixed(3)} ETH`
                      }
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="mb-6">
                    <label className="block text-gray-400 mb-2">Quantity</label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-lg bg-black/50 border border-white/20 text-white hover:border-brandCyan/50 transition-colors"
                      >
                        -
                      </button>
                      <span className="text-xl font-semibold text-white min-w-[3rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        className="w-10 h-10 rounded-lg bg-black/50 border border-white/20 text-white hover:border-brandCyan/50 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-brandMagenta/10 to-brandCyan/10 rounded-lg border border-brandMagenta/20">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Total ({quantity} tickets)</span>
                      <span className="text-xl font-bold text-white">
                        {selectedCurrency === 'fiat' 
                          ? `$${totalPrice.toFixed(2)}`
                          : `${totalPrice.toFixed(3)} ETH`
                        }
                      </span>
                    </div>
                  </div>

                  {/* Purchase Buttons */}
                  <div className="space-y-3 mb-6">
                    <Button 
                      className="w-full bg-gradient-to-r from-brandMagenta to-brandCyan hover:from-brandMagenta/80 hover:to-brandCyan/80 text-white font-semibold py-3"
                      size="lg"
                    >
                      {selectedCurrency === 'fiat' ? (
                        <>
                          <CreditCard className="w-5 h-5 mr-2" />
                          Buy with Card
                        </>
                      ) : (
                        <>
                          <Wallet className="w-5 h-5 mr-2" />
                          Buy with Crypto
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-white/20 text-gray-300 hover:border-brandCyan/50"
                      size="lg"
                    >
                      <Gift className="w-5 h-5 mr-2" />
                      Buy as Gift
                    </Button>
                  </div>

                  {/* Event Stats */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Tickets sold</span>
                      <span className="text-white">{event.soldTickets.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Remaining</span>
                      <span className="text-brandCyan">{remainingTickets.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-brandMagenta to-brandCyan h-2 rounded-full transition-all duration-500"
                        style={{ width: `${soldPercentage}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        <span>{event.ratings.average}</span>
                        <span className="text-gray-400 ml-1">({event.ratings.count} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="mt-6 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="flex items-center text-green-400 text-sm">
                      <Shield className="w-4 h-4 mr-2" />
                      Secured by blockchain technology
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Related Events */}
          {relatedEvents.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16"
            >
              <h2 className="text-3xl font-orbitron font-bold text-white mb-8">
                More {event.category} Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedEvents.map((relatedEvent) => (
                  <EventCard key={relatedEvent.id} event={relatedEvent} />
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
} 