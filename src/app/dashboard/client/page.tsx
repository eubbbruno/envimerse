'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Wallet, TrendingUp, Clock, Star, ArrowRight, QrCode, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useUserStore } from '@/stores/userStore';
import { useUserWallet } from '@/hooks/useUserWallet';
import { format } from 'date-fns';

export default function ClientDashboard() {
  const { 
    tickets, 
    recommendations, 
    walletBalance, 
    loadMockData,
    isTicketsLoading 
  } = useUserStore();
  const { isConnected, getFormattedBalance } = useUserWallet();

  // Load mock data on component mount
  useEffect(() => {
    loadMockData();
  }, [loadMockData]);

  const upcomingTickets = tickets.filter(ticket => ticket.status === 'upcoming');
  const expiredTickets = tickets.filter(ticket => ticket.status === 'expired');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <ProtectedRoute requiredRole="client">
      <DashboardLayout role="client">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-3xl font-orbitron font-bold bg-gradient-to-r from-primary-magenta to-primary-cyan bg-clip-text text-transparent">
              Welcome to Your VR Universe
            </h1>
            <p className="text-gray-400 mt-2">
              Manage your tickets, discover new experiences, and explore the metaverse
            </p>
          </motion.div>

          {/* Wallet Balance Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-black/20 backdrop-blur-lg border-white/10 hover:border-primary-magenta/30 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">ETH Balance</CardTitle>
                <Wallet className="h-4 w-4 text-primary-cyan" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{walletBalance.eth.toFixed(4)} ETH</div>
                <p className="text-xs text-gray-400">≈ ${(walletBalance.eth * 2500).toFixed(2)} USD</p>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-lg border-white/10 hover:border-primary-magenta/30 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">USDC Balance</CardTitle>
                <Wallet className="h-4 w-4 text-primary-cyan" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{walletBalance.usdc.toFixed(2)} USDC</div>
                <p className="text-xs text-gray-400">Stablecoin</p>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-lg border-white/10 hover:border-primary-magenta/30 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Tickets</CardTitle>
                <Ticket className="h-4 w-4 text-primary-cyan" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{tickets.length}</div>
                <p className="text-xs text-gray-400">{upcomingTickets.length} upcoming</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* My Tickets Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-orbitron font-bold text-white">My VR Tickets</h2>
              <Button variant="outline" className="border-primary-magenta/30 text-primary-cyan hover:bg-primary-magenta/10">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {isTicketsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="bg-black/20 backdrop-blur-lg border-white/10 animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-700 rounded mb-2"></div>
                      <div className="h-8 bg-gray-700 rounded mb-4"></div>
                      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingTickets.map((ticket) => (
                  <motion.div
                    key={ticket.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card className="bg-black/20 backdrop-blur-lg border-white/10 hover:border-primary-magenta/30 transition-all duration-300 cursor-pointer group">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant="outline" 
                            className={`${
                              ticket.ticketType === 'VIP' 
                                ? 'border-yellow-500 text-yellow-500' 
                                : ticket.ticketType === 'Premium'
                                ? 'border-purple-500 text-purple-500'
                                : 'border-blue-500 text-blue-500'
                            }`}
                          >
                            {ticket.ticketType}
                          </Badge>
                          <Badge variant="outline" className="border-green-500 text-green-500">
                            {ticket.status}
                          </Badge>
                        </div>
                        <CardTitle className="text-white group-hover:text-primary-cyan transition-colors">
                          {ticket.eventName}
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          {ticket.venue} • {format(ticket.eventDate, 'MMM dd, yyyy')}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm text-gray-400">
                            <Clock className="inline h-3 w-3 mr-1" />
                            {format(ticket.eventDate, 'HH:mm')}
                          </div>
                          <div className="text-sm font-medium text-white">
                            {ticket.price} {ticket.currency}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1 bg-gradient-to-r from-primary-magenta to-primary-cyan hover:from-primary-magenta/80 hover:to-primary-cyan/80">
                            <QrCode className="h-3 w-3 mr-1" />
                            QR Code
                          </Button>
                          <Button size="sm" variant="outline" className="border-white/20">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Recommendations Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-orbitron font-bold text-white">Recommended for You</h2>
              <Button variant="outline" className="border-primary-magenta/30 text-primary-cyan hover:bg-primary-magenta/10">
                <TrendingUp className="mr-2 h-4 w-4" />
                View More
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((rec) => (
                <motion.div
                  key={rec.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card className="bg-black/20 backdrop-blur-lg border-white/10 hover:border-primary-cyan/30 transition-all duration-300 cursor-pointer group">
                    <CardHeader>
                                             <div className="flex items-center justify-between">
                         <Badge variant="outline" className="border-primary-cyan text-primary-cyan">
                           {rec.genre}
                         </Badge>
                         <div className="flex items-center space-x-1">
                           <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                           <span className="text-xs text-yellow-400">4.8</span>
                         </div>
                       </div>
                       <CardTitle className="text-white group-hover:text-primary-cyan transition-colors">
                         {rec.title}
                       </CardTitle>
                       <CardDescription className="text-gray-400">
                         {rec.venue} • {format(rec.date, 'MMM dd, yyyy')}
                       </CardDescription>
                     </CardHeader>
                     <CardContent>
                       <div className="flex items-center justify-between">
                         <div className="text-sm font-medium text-white">
                           ${rec.price} USD
                         </div>
                        <Button size="sm" className="bg-gradient-to-r from-primary-magenta to-primary-cyan hover:from-primary-magenta/80 hover:to-primary-cyan/80">
                          Get Tickets
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 