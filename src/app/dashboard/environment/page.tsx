'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building, 
  Calendar, 
  Settings, 
  Users, 
  Plus,
  MapPin,
  Monitor,
  Wifi,
  Camera,
  Mic,
  Star,
  ArrowUp,
  ArrowDown,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useVenueStore } from '@/stores/venueStore';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

export default function EnvironmentDashboard() {
  const { 
    venues,
    calendarEvents,
    technicalRequirements,
    stats,
    selectedDate,
    setSelectedDate,
    loadMockData,
    isVenuesLoading 
  } = useVenueStore();

  const [selectedWeek, setSelectedWeek] = useState(new Date());

  // Load mock data on component mount
  useEffect(() => {
    loadMockData();
  }, [loadMockData]);

  const activeVenues = venues.filter(venue => venue.status === 'active');
  const maintenanceVenues = venues.filter(venue => venue.status === 'maintenance');
  
  const upcomingEvents = calendarEvents.filter(event => event.start > new Date());
  const weekStart = startOfWeek(selectedWeek);
  const weekEnd = endOfWeek(selectedWeek);
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'border-green-500 text-green-500';
      case 'in-progress': return 'border-blue-500 text-blue-500';
      case 'pending': return 'border-yellow-500 text-yellow-500';
      case 'missing': return 'border-red-500 text-red-500';
      default: return 'border-gray-500 text-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <ProtectedRoute requiredRole="environment">
      <DashboardLayout role="environment">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-orbitron font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Environment Manager
            </h1>
            <p className="text-gray-400 mt-2">
              Manage VR venues, schedule events, and oversee technical requirements
            </p>
          </div>
          <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
            <Plus className="mr-2 h-4 w-4" />
            Add Venue
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-black/20 backdrop-blur-lg border-white/10 hover:border-green-500/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Venues</CardTitle>
              <Building className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalVenues}</div>
              <p className="text-xs text-gray-400 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1 text-green-400" />
                {stats.activeVenues} active
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-lg border-white/10 hover:border-green-500/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Capacity</CardTitle>
              <Users className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalCapacity.toLocaleString()}</div>
              <p className="text-xs text-gray-400">Concurrent users</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-lg border-white/10 hover:border-green-500/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Utilization Rate</CardTitle>
              <Monitor className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.utilizationRate}%</div>
              <p className="text-xs text-gray-400 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1 text-green-400" />
                +5.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-lg border-white/10 hover:border-green-500/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.averageRating}</div>
              <p className="text-xs text-gray-400">User satisfaction</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs Section */}
        <motion.div variants={itemVariants}>
          <Tabs value="venues" onValueChange={() => {}} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-black/20 backdrop-blur-lg border border-white/10">
              <TabsTrigger 
                value="venues" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
              >
                Venues
              </TabsTrigger>
              <TabsTrigger 
                value="calendar"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
              >
                Calendar
              </TabsTrigger>
              <TabsTrigger 
                value="technical"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
              >
                Technical
              </TabsTrigger>
            </TabsList>

            {/* Venues Tab */}
            <TabsContent value="venues" className="mt-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-orbitron font-bold text-white">VR Venues</h2>
                <div className="flex space-x-2">
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    {activeVenues.length} Active
                  </Badge>
                  <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                    {maintenanceVenues.length} Maintenance
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {venues.map((venue) => (
                  <motion.div
                    key={venue.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card className="bg-black/20 backdrop-blur-lg border-white/10 hover:border-green-500/30 transition-all duration-300 cursor-pointer group">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant="outline" 
                            className={`${
                              venue.status === 'active' 
                                ? 'border-green-500 text-green-500' 
                                : venue.status === 'maintenance'
                                ? 'border-yellow-500 text-yellow-500'
                                : 'border-red-500 text-red-500'
                            }`}
                          >
                            {venue.status}
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
                        <CardTitle className="text-white group-hover:text-green-400 transition-colors">
                          {venue.name}
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          {venue.category} • {venue.capacity.toLocaleString()} capacity
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Rating</span>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-white font-medium">{venue.rating}</span>
                              <span className="text-gray-400">({venue.reviews})</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Commission</span>
                            <span className="text-white font-medium">{venue.commissionRate}%</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Total Events</span>
                            <span className="text-white font-medium">{venue.totalEvents}</span>
                          </div>
                          <div className="pt-2 border-t border-white/10">
                            <div className="flex items-center text-xs text-gray-400 space-x-3">
                              {venue.features.spatialAudio && <div className="flex items-center"><Mic className="h-3 w-3 mr-1" />Audio</div>}
                              {venue.features.eyeTracking && <div className="flex items-center"><Eye className="h-3 w-3 mr-1" />Eye</div>}
                              {venue.features.handTracking && <div className="flex items-center"><Users className="h-3 w-3 mr-1" />Hand</div>}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar" className="mt-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-orbitron font-bold text-white">Event Calendar</h2>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedWeek(addDays(selectedWeek, -7))}
                    className="border-white/20"
                  >
                    Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedWeek(addDays(selectedWeek, 7))}
                    className="border-white/20"
                  >
                    Next
                  </Button>
                </div>
              </div>

              {/* Week View */}
              <div className="grid grid-cols-7 gap-4">
                {weekDays.map((day) => {
                  const dayEvents = calendarEvents.filter(event => 
                    format(event.start, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                  );
                  
                  return (
                    <div key={day.toISOString()} className="space-y-2">
                      <div className="text-center">
                        <div className="text-sm text-gray-400">{format(day, 'EEE')}</div>
                        <div className="text-lg font-semibold text-white">{format(day, 'd')}</div>
                      </div>
                      <div className="space-y-1">
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className={`p-2 rounded text-xs cursor-pointer ${
                              event.status === 'filming' ? 'bg-red-500/20 border border-red-500/30' :
                              event.status === 'setup' ? 'bg-yellow-500/20 border border-yellow-500/30' :
                              event.status === 'event' ? 'bg-green-500/20 border border-green-500/30' :
                              'bg-blue-500/20 border border-blue-500/30'
                            }`}
                          >
                            <div className="font-medium text-white truncate">{event.title}</div>
                            <div className="text-gray-400">{format(event.start, 'HH:mm')}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Upcoming Events List */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Upcoming Events</h3>
                {upcomingEvents.slice(0, 5).map((event) => (
                  <Card key={event.id} className="bg-black/20 backdrop-blur-lg border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{event.title}</h4>
                          <p className="text-sm text-gray-400">{event.venueName}</p>
                          <p className="text-xs text-gray-400">
                            {format(event.start, 'MMM dd, yyyy HH:mm')} - {format(event.end, 'HH:mm')}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant="outline" 
                            className={`${
                              event.status === 'filming' ? 'border-red-500 text-red-500' :
                              event.status === 'setup' ? 'border-yellow-500 text-yellow-500' :
                              event.status === 'event' ? 'border-green-500 text-green-500' :
                              'border-blue-500 text-blue-500'
                            }`}
                          >
                            {event.status}
                          </Badge>
                          <div className="text-sm text-gray-400 mt-1">
                            {event.attendees} attendees
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Technical Tab */}
            <TabsContent value="technical" className="mt-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-orbitron font-bold text-white">Technical Requirements</h2>
                <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Requirement
                </Button>
              </div>

              <div className="space-y-4">
                {technicalRequirements.map((req) => (
                  <Card key={req.id} className="bg-black/20 backdrop-blur-lg border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="p-2 rounded-lg bg-green-500/10">
                              {req.category === 'cameras' && <Camera className="h-4 w-4 text-green-400" />}
                              {req.category === 'audio' && <Mic className="h-4 w-4 text-green-400" />}
                              {req.category === 'networking' && <Wifi className="h-4 w-4 text-green-400" />}
                              {req.category === 'lighting' && <Monitor className="h-4 w-4 text-green-400" />}
                              {req.category === 'streaming' && <Eye className="h-4 w-4 text-green-400" />}
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{req.name}</h3>
                              <p className="text-sm text-gray-400">{req.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Due: {format(req.dueDate, 'MMM dd, yyyy')}
                            </div>
                            {req.assignedTo && (
                              <div className="flex items-center">
                                <Users className="h-3 w-3 mr-1" />
                                {req.assignedTo}
                              </div>
                            )}
                            <div className="flex items-center">
                              <DollarSign className="h-3 w-3 mr-1" />
                              ${req.estimatedCost.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <Badge variant="outline" className={getStatusColor(req.status)}>
                            {req.status}
                          </Badge>
                          <div className={`text-sm font-medium ${getPriorityColor(req.priority)}`}>
                            {req.priority.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Quick Actions CTA */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30 backdrop-blur-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-orbitron font-bold text-white mb-2">
                Optimize Your VR Infrastructure
              </h3>
              <p className="text-gray-400 mb-6">
                Advanced monitoring, analytics, and automated maintenance tools
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-8">
                  View Analytics
                </Button>
                <Button variant="outline" className="border-green-400/30 text-green-400 hover:bg-green-400/10">
                  Schedule Maintenance
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