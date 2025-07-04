'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { EventCard } from '@/components/ui/EventCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  mockEvents, 
  eventCategories, 
  streamingQualities,
  getFeaturedEvents,
  getEventsByCategory 
} from '@/lib/mockData';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  SlidersHorizontal,
  Grid3X3,
  List,
  Star
} from 'lucide-react';
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedQuality, setSelectedQuality] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'rating' | 'popularity'>('date');

  // Filter and search logic
  const filteredEvents = useMemo(() => {
    let events = mockEvents;

    // Category filter
    if (selectedCategory !== 'all') {
      events = getEventsByCategory(selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      events = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Quality filter
    if (selectedQuality !== 'all') {
      events = events.filter(event => event.streamQuality === selectedQuality);
    }

    // Price filter
    events = events.filter(event => 
      event.price.fiat >= priceRange[0] && event.price.fiat <= priceRange[1]
    );

    // Sort
    events.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price.fiat - b.price.fiat;
        case 'rating':
          return b.ratings.average - a.ratings.average;
        case 'popularity':
          return b.soldTickets - a.soldTickets;
        case 'date':
        default:
          return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

    return events;
  }, [searchQuery, selectedCategory, selectedQuality, priceRange, sortBy]);

  const featuredEvents = getFeaturedEvents();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-brandMagenta/20 via-black to-brandCyan/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(141,66,236,0.1),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(96,163,249,0.1),transparent_60%)]" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-orbitron font-bold bg-gradient-to-r from-brandMagenta to-brandCyan bg-clip-text text-transparent mb-6">
                VR Events Marketplace
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Discover immersive virtual reality experiences from around the world. 
                Sports, concerts, conferences, and more - all in stunning VR quality.
              </p>
              
              {/* Quick Stats */}
              <div className="flex justify-center space-x-8 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brandMagenta">{mockEvents.length}</div>
                  <div className="text-gray-400">Live Events</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brandCyan">150+</div>
                  <div className="text-gray-400">Venues</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">4.8★</div>
                  <div className="text-gray-400">Avg Rating</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-orbitron font-bold text-white mb-8 flex items-center">
                <Star className="w-8 h-8 text-yellow-400 mr-3" />
                Featured Events
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {featuredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <EventCard event={event} variant="featured" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* Filters and Search */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-black/40 backdrop-blur-md rounded-xl border border-white/10 p-6">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events, venues, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-brandCyan focus:outline-none transition-colors"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4">
                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {eventCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className={selectedCategory === category.id 
                        ? "bg-gradient-to-r from-brandMagenta to-brandCyan text-white"
                        : "border-white/20 text-gray-300 hover:border-brandCyan/50"
                      }
                    >
                      {category.icon} {category.name}
                    </Button>
                  ))}
                </div>

                {/* Quality Filter */}
                <select
                  value={selectedQuality}
                  onChange={(e) => setSelectedQuality(e.target.value)}
                  className="px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-brandCyan focus:outline-none"
                >
                  <option value="all">All Qualities</option>
                  {streamingQualities.map((quality) => (
                    <option key={quality.id} value={quality.id}>
                      {quality.name}
                    </option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-brandCyan focus:outline-none"
                >
                  <option value="date">Sort by Date</option>
                  <option value="price">Sort by Price</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="popularity">Sort by Popularity</option>
                </select>
              </div>

              {/* View Mode */}
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' 
                    ? "bg-brandCyan text-white"
                    : "border-white/20 text-gray-300"
                  }
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' 
                    ? "bg-brandCyan text-white"
                    : "border-white/20 text-gray-300"
                  }
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategory !== 'all' || selectedQuality !== 'all' || searchQuery) && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
                <span className="text-sm text-gray-400">Active filters:</span>
                {selectedCategory !== 'all' && (
                  <Badge 
                    className="bg-brandMagenta/20 text-brandMagenta border-brandMagenta/30"
                    onClick={() => setSelectedCategory('all')}
                  >
                    {eventCategories.find(c => c.id === selectedCategory)?.name} ✕
                  </Badge>
                )}
                {selectedQuality !== 'all' && (
                  <Badge 
                    className="bg-brandCyan/20 text-brandCyan border-brandCyan/30"
                    onClick={() => setSelectedQuality('all')}
                  >
                    {selectedQuality} ✕
                  </Badge>
                )}
                {searchQuery && (
                  <Badge 
                    className="bg-gray-600/20 text-gray-300 border-gray-600/30"
                    onClick={() => setSearchQuery('')}
                  >
                    "{searchQuery}" ✕
                  </Badge>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Events Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-orbitron font-bold text-white">
              All Events ({filteredEvents.length})
            </h2>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your filters or search terms</p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedQuality('all');
                }}
                className="bg-gradient-to-r from-brandMagenta to-brandCyan"
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <motion.div
              layout
              className={
                viewMode === 'grid'
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                >
                  <EventCard 
                    event={event} 
                    variant={viewMode === 'list' ? 'compact' : 'default'} 
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
} 