'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Users, 
  Plus,
  BarChart3,
  Target,
  Zap,
  Clock,
  Star,
  ArrowUp,
  ArrowDown,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useResellerStore } from '@/stores/resellerStore';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function ResellerDashboard() {
  const { 
    events, 
    salesData,
    commissions,
    totalRevenue,
    totalTicketsSold,
    conversionRate,
    pendingCommissions,
    availableForWithdraw,
    loadMockData,
    isEventsLoading 
  } = useResellerStore();

  // Load mock data on component mount
  useEffect(() => {
    loadMockData();
  }, [loadMockData]);

  const activeEvents = events.filter(event => event.status === 'published' || event.status === 'live');
  const draftEvents = events.filter(event => event.status === 'draft');

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
    <ProtectedRoute requiredRole="reseller">
      <DashboardLayout role="reseller">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-orbitron font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Reseller Portal
            </h1>
            <p className="text-gray-400 mt-2">
              Manage your events, track sales, and grow your VR business
            </p>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </motion.div>

        {/* Revenue & Stats Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-black/20 backdrop-blur-lg border-white/10 hover:border-purple-500/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-gray-400 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1 text-green-400" />
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-lg border-white/10 hover:border-purple-500/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Tickets Sold</CardTitle>
              <Users className="h-4 w-4 text-pink-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalTicketsSold}</div>
              <p className="text-xs text-gray-400 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1 text-green-400" />
                +8.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-lg border-white/10 hover:border-purple-500/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Conversion Rate</CardTitle>
              <Target className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{conversionRate}%</div>
              <p className="text-xs text-gray-400 flex items-center">
                <ArrowDown className="h-3 w-3 mr-1 text-red-400" />
                -2.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-lg border-white/10 hover:border-purple-500/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Available to Withdraw</CardTitle>
              <Zap className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${availableForWithdraw.toFixed(2)}</div>
              <p className="text-xs text-gray-400">Pending commissions</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs Section */}
        <motion.div variants={itemVariants}>
          <Tabs value="analytics" onValueChange={() => {}} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-black/20 backdrop-blur-lg border border-white/10">
              <TabsTrigger 
                value="analytics" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="events"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
              >
                My Events
              </TabsTrigger>
              <TabsTrigger 
                value="commissions"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
              >
                Commissions
              </TabsTrigger>
              <TabsTrigger 
                value="create"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
              >
                Create Event
              </TabsTrigger>
            </TabsList>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="mt-8 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Chart */}
                <Card className="bg-black/20 backdrop-blur-lg border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5 text-purple-400" />
                      Sales Overview
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Last 7 days performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="date" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px'
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#8B5CF6" 
                          strokeWidth={2}
                          dot={{ fill: '#8B5CF6' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Tickets Chart */}
                <Card className="bg-black/20 backdrop-blur-lg border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Users className="mr-2 h-5 w-5 text-pink-400" />
                      Tickets Sold
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Daily ticket sales
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="date" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px'
                          }} 
                        />
                        <Bar dataKey="tickets" fill="#EC4899" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="mt-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-orbitron font-bold text-white">My Events</h2>
                <div className="flex space-x-2">
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    {activeEvents.length} Active
                  </Badge>
                  <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                    {draftEvents.length} Drafts
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card className="bg-black/20 backdrop-blur-lg border-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer group">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant="outline" 
                            className={`${
                              event.status === 'published' 
                                ? 'border-green-500 text-green-500' 
                                : event.status === 'live'
                                ? 'border-blue-500 text-blue-500'
                                : event.status === 'draft'
                                ? 'border-yellow-500 text-yellow-500'
                                : 'border-gray-500 text-gray-500'
                            }`}
                          >
                            {event.status}
                          </Badge>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <CardTitle className="text-white group-hover:text-purple-400 transition-colors">
                          {event.title}
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          {event.venue} • {format(event.date, 'MMM dd, yyyy')}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Sales Progress</span>
                            <span className="text-white font-medium">
                              {event.soldTickets}/{event.totalTickets}
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(event.soldTickets / event.totalTickets) * 100}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-400">
                              <Clock className="inline h-3 w-3 mr-1" />
                              {format(event.date, 'HH:mm')}
                            </div>
                            <div className="text-sm font-medium text-white">
                              ${event.earnings.toFixed(2)} earned
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Commissions Tab */}
            <TabsContent value="commissions" className="mt-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-orbitron font-bold text-white">Commission Tracking</h2>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Withdraw ${availableForWithdraw.toFixed(2)}
                </Button>
              </div>

              <div className="space-y-4">
                {commissions.map((commission) => (
                  <Card key={commission.id} className="bg-black/20 backdrop-blur-lg border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-1">
                            {commission.eventName}
                          </h3>
                          <p className="text-sm text-gray-400">
                            Commission earned • {format(commission.date, 'MMM dd, yyyy')}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-white">
                            {commission.amount} {commission.currency}
                          </div>
                          <Badge 
                            variant="outline" 
                            className={commission.status === 'paid' 
                              ? 'border-green-500 text-green-500' 
                              : 'border-yellow-500 text-yellow-500'
                            }
                          >
                            {commission.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Create Event Tab */}
            <TabsContent value="create" className="mt-8">
              <Card className="bg-black/20 backdrop-blur-lg border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Plus className="mr-2 h-5 w-5 text-purple-400" />
                    Create New VR Event
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Launch your VR experience and start earning commissions
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="text-center py-16">
                    <Calendar className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Event Creation Wizard</h3>
                    <p className="text-gray-400 mb-6">
                      Create immersive VR events with our step-by-step wizard
                    </p>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8">
                      Start Creating
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Quick Actions CTA */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 backdrop-blur-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-orbitron font-bold text-white mb-2">
                Ready to Scale Your VR Business?
              </h3>
              <p className="text-gray-400 mb-6">
                Access advanced analytics, promotional tools, and premium support
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8">
                  Upgrade to Pro
                </Button>
                <Button variant="outline" className="border-purple-400/30 text-purple-400 hover:bg-purple-400/10">
                  View Marketing Tools
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
    </ProtectedRoute>
  );
} 