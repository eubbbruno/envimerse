'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Camera,
  DollarSign,
  Users,
  Globe,
  TrendingUp,
  Shield,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Target,
  Zap,
  Award,
  Building,
  Calendar,
  Headphones,
  Video,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function EnvironmentsPage() {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Revenue Generation',
      description: 'Transform your venue into a global entertainment platform. Earn revenue from virtual attendees worldwide.',
      color: 'text-green-400'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Expand your audience beyond physical capacity. Reach millions of VR users worldwide.',
      color: 'text-brandCyan'
    },
    {
      icon: Camera,
      title: 'Premium VR Production',
      description: 'Professional VR filming and streaming setup. We handle all technical aspects.',
      color: 'text-brandMagenta'
    },
    {
      icon: Users,
      title: 'Audience Analytics',
      description: 'Detailed insights about your virtual audience. Understand engagement and optimize experiences.',
      color: 'text-yellow-400'
    },
    {
      icon: Shield,
      title: 'Blockchain Security',
      description: 'Secure ticket sales and revenue sharing through smart contracts.',
      color: 'text-blue-400'
    },
    {
      icon: TrendingUp,
      title: 'Growth Opportunities',
      description: 'Partner with leading VR resellers and expand your event portfolio.',
      color: 'text-purple-400'
    }
  ];

  const venues = [
    { type: 'Stadium', icon: '🏟️', capacity: '50K+', examples: 'Sports, Concerts' },
    { type: 'Arena', icon: '🏟️', capacity: '20K+', examples: 'Basketball, UFC' },
    { type: 'Club', icon: '🎭', capacity: '500+', examples: 'DJ Sets, Comedy' },
    { type: 'Theater', icon: '🎭', capacity: '2K+', examples: 'Broadway, Opera' },
    { type: 'Conference Center', icon: '🏢', capacity: '5K+', examples: 'Tech Events, Expos' },
    { type: 'Festival Grounds', icon: '🎪', capacity: '100K+', examples: 'Music Festivals' }
  ];

  const steps = [
    {
      step: '01',
      title: 'Apply',
      description: 'Submit your venue information and event portfolio.',
      icon: Target
    },
    {
      step: '02',
      title: 'Technical Setup',
      description: 'We install professional VR equipment and configure streaming.',
      icon: Video
    },
    {
      step: '03',
      title: 'Go Live',
      description: 'Start hosting VR events and earning global revenue.',
      icon: Zap
    }
  ];

  const stats = [
    { value: '150+', label: 'Partner Venues', icon: Building },
    { value: '50K+', label: 'VR Users', icon: Users },
    { value: '$2.5M+', label: 'Revenue Generated', icon: DollarSign },
    { value: '4.8★', label: 'Average Rating', icon: Star }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-brandMagenta/20 via-black to-brandCyan/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(141,66,236,0.1),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(96,163,249,0.1),transparent_60%)]" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Badge className="mb-6 bg-gradient-to-r from-brandMagenta to-brandCyan text-white border-none text-lg px-6 py-2">
                🏟️ Partner with Envimerse
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-orbitron font-bold bg-gradient-to-r from-brandMagenta to-brandCyan bg-clip-text text-transparent mb-6">
                Transform Your Venue
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
                Join the VR revolution and turn your venue into a global entertainment destination. 
                Reach millions of virtual attendees while hosting your regular events.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/environments/apply">
                  <Button size="lg" className="bg-gradient-to-r from-brandMagenta to-brandCyan hover:from-brandMagenta/80 hover:to-brandCyan/80 text-white font-semibold px-8 py-4 text-lg">
                    <Target className="w-5 h-5 mr-2" />
                    Apply Now
                  </Button>
                </Link>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/20 text-white hover:border-brandCyan/50 px-8 py-4 text-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="text-center"
                  >
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-brandCyan" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Benefits Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-orbitron font-bold text-white mb-4">
              Why Partner with Envimerse?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Unlock new revenue streams and expand your reach with cutting-edge VR technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="bg-black/40 backdrop-blur-md border-white/10 hover:border-brandMagenta/30 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <benefit.icon className={`w-12 h-12 mx-auto mb-4 ${benefit.color}`} />
                    <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Venue Types */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-orbitron font-bold text-white mb-4">
              Perfect for Any Venue
            </h2>
            <p className="text-xl text-gray-300">
              From intimate clubs to massive stadiums - we adapt to your space
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((venue, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="bg-black/40 backdrop-blur-md border-white/10 hover:border-brandCyan/30 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{venue.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{venue.type}</h3>
                    <Badge className="mb-3 bg-brandMagenta/20 text-brandMagenta border-brandMagenta/30">
                      {venue.capacity} capacity
                    </Badge>
                    <p className="text-gray-400 text-sm">{venue.examples}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-orbitron font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-300">
              Get started in just three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-brandMagenta to-brandCyan rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-black rounded-full flex items-center justify-center border-2 border-brandCyan">
                    <span className="text-brandCyan font-bold text-sm">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 transform translate-x-8">
                    <ArrowRight className="w-6 h-6 text-brandCyan" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-brandMagenta/20 to-brandCyan/20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Award className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-4xl font-orbitron font-bold text-white mb-4">
                Ready to Go Global?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join the VR revolution and transform your venue into a worldwide entertainment destination. 
                Our team will handle everything from setup to support.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/environments/apply">
                  <Button size="lg" className="bg-gradient-to-r from-brandMagenta to-brandCyan hover:from-brandMagenta/80 hover:to-brandCyan/80 text-white font-semibold px-8 py-4 text-lg">
                    Start Application
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/20 text-white hover:border-brandCyan/50 px-8 py-4 text-lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Call
                </Button>
              </div>

              <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  No upfront costs
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Full technical support
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Revenue sharing model
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
} 