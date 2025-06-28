'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft,
  Building,
  MapPin,
  Users,
  Calendar,
  Camera,
  Wifi,
  Zap,
  Shield,
  CheckCircle,
  Upload,
  Phone,
  Mail,
  Globe,
  Clock,
  DollarSign,
  Target,
  Headphones
} from 'lucide-react';
import Link from 'next/link';

interface FormData {
  // Venue Information
  venueName: string;
  venueType: string;
  address: string;
  city: string;
  country: string;
  capacity: string;
  description: string;
  
  // Contact Information
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  
  // Technical Requirements
  hasWifi: boolean;
  wifiSpeed: string;
  hasPowerAccess: boolean;
  hasSecurityAccess: boolean;
  
  // Event Information
  eventTypes: string[];
  averageEvents: string;
  peakSeasonMonths: string[];
  
  // Equipment & Setup
  hasExistingAV: boolean;
  existingEquipment: string;
  preferredSetupAreas: string;
  
  // Business Information
  yearEstablished: string;
  annualRevenue: string;
  socialMedia: {
    instagram: string;
    twitter: string;
    facebook: string;
  };
}

export default function VenueApplicationPage() {
  const [formData, setFormData] = useState<FormData>({
    // Venue Information
    venueName: '',
    venueType: '',
    address: '',
    city: '',
    country: '',
    capacity: '',
    description: '',
    
    // Contact Information
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    
    // Technical Requirements
    hasWifi: false,
    wifiSpeed: '',
    hasPowerAccess: false,
    hasSecurityAccess: false,
    
    // Event Information
    eventTypes: [],
    averageEvents: '',
    peakSeasonMonths: [],
    
    // Equipment & Setup
    hasExistingAV: false,
    existingEquipment: '',
    preferredSetupAreas: '',
    
    // Business Information
    yearEstablished: '',
    annualRevenue: '',
    socialMedia: {
      instagram: '',
      twitter: '',
      facebook: ''
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const venueTypes = [
    'Stadium', 'Arena', 'Theater', 'Club', 'Conference Center', 
    'Festival Grounds', 'Concert Hall', 'Sports Complex', 'Other'
  ];

  const eventTypeOptions = [
    'Sports Events', 'Concerts', 'Theater/Performances', 'Conferences', 
    'Comedy Shows', 'DJ Sets', 'Corporate Events', 'Festivals', 'Other'
  ];

  const monthOptions = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof FormData] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleArrayChange = (field: keyof FormData, value: string) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[];
      return {
        ...prev,
        [field]: currentArray.includes(value)
          ? currentArray.filter((item: string) => item !== value)
          : [...currentArray, value]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', formData);
    // Handle form submission
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Building className="w-12 h-12 text-brandMagenta mx-auto mb-4" />
              <h2 className="text-2xl font-orbitron font-bold text-white mb-2">Venue Information</h2>
              <p className="text-gray-400">Tell us about your venue and its capabilities</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Venue Name *</label>
                <input
                  type="text"
                  value={formData.venueName}
                  onChange={(e) => handleInputChange('venueName', e.target.value)}
                  className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-brandCyan focus:outline-none"
                  placeholder="Enter venue name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Venue Type *</label>
                <select
                  value={formData.venueType}
                  onChange={(e) => handleInputChange('venueType', e.target.value)}
                  className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white focus:border-brandCyan focus:outline-none"
                  required
                >
                  <option value="">Select venue type</option>
                  {venueTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-300 text-sm font-medium mb-2">Address *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-brandCyan focus:outline-none"
                  placeholder="Full venue address"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">City *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-brandCyan focus:outline-none"
                  placeholder="City"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Country *</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-brandCyan focus:outline-none"
                  placeholder="Country"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Capacity *</label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => handleInputChange('capacity', e.target.value)}
                  className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-brandCyan focus:outline-none"
                  placeholder="Maximum capacity"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Year Established</label>
                <input
                  type="number"
                  value={formData.yearEstablished}
                  onChange={(e) => handleInputChange('yearEstablished', e.target.value)}
                  className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-brandCyan focus:outline-none"
                  placeholder="e.g., 2010"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-300 text-sm font-medium mb-2">Venue Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-brandCyan focus:outline-none resize-none"
                  placeholder="Describe your venue, its unique features, and what makes it special..."
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Phone className="w-12 h-12 text-brandCyan mx-auto mb-4" />
              <h2 className="text-2xl font-orbitron font-bold text-white mb-2">Contact Information</h2>
              <p className="text-gray-400">Primary contact details for coordination</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Contact Name *</label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-brandCyan focus:outline-none"
                  placeholder="Primary contact person"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-brandCyan focus:outline-none"
                  placeholder="contact@venue.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-brandCyan focus:outline-none"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-brandCyan focus:outline-none"
                  placeholder="https://www.venue.com"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Instagram</label>
                <input
                  type="text"
                  value={formData.socialMedia.instagram}
                  onChange={(e) => handleInputChange('socialMedia.instagram', e.target.value)}
                  className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-brandCyan focus:outline-none"
                  placeholder="@venuename"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Twitter</label>
                <input
                  type="text"
                  value={formData.socialMedia.twitter}
                  onChange={(e) => handleInputChange('socialMedia.twitter', e.target.value)}
                  className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-brandCyan focus:outline-none"
                  placeholder="@venuename"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Camera className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl font-orbitron font-bold text-white mb-2">Technical & Events</h2>
              <p className="text-gray-400">Infrastructure and event details</p>
            </div>

            <div className="space-y-8">
              {/* Technical Requirements */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Technical Infrastructure</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-white/10">
                    <div className="flex items-center">
                      <Wifi className="w-5 h-5 text-brandCyan mr-3" />
                      <span className="text-white">High-speed WiFi available</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.hasWifi}
                      onChange={(e) => handleInputChange('hasWifi', e.target.checked)}
                      className="w-4 h-4"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-white/10">
                    <div className="flex items-center">
                      <Zap className="w-5 h-5 text-yellow-400 mr-3" />
                      <span className="text-white">Power access for equipment</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.hasPowerAccess}
                      onChange={(e) => handleInputChange('hasPowerAccess', e.target.checked)}
                      className="w-4 h-4"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-white/10">
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 text-green-400 mr-3" />
                      <span className="text-white">Security access available</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.hasSecurityAccess}
                      onChange={(e) => handleInputChange('hasSecurityAccess', e.target.checked)}
                      className="w-4 h-4"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-white/10">
                    <div className="flex items-center">
                      <Headphones className="w-5 h-5 text-brandMagenta mr-3" />
                      <span className="text-white">Existing A/V equipment</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.hasExistingAV}
                      onChange={(e) => handleInputChange('hasExistingAV', e.target.checked)}
                      className="w-4 h-4"
                    />
                  </div>
                </div>

                {formData.hasWifi && (
                  <div className="mt-4">
                    <label className="block text-gray-300 text-sm font-medium mb-2">WiFi Speed (Mbps)</label>
                    <input
                      type="number"
                      value={formData.wifiSpeed}
                      onChange={(e) => handleInputChange('wifiSpeed', e.target.value)}
                      className="w-full md:w-1/2 p-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-brandCyan focus:outline-none"
                      placeholder="e.g., 1000"
                    />
                  </div>
                )}
              </div>

              {/* Event Types */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Event Information</h3>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-3">Types of events you host (select all that apply)</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {eventTypeOptions.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleArrayChange('eventTypes', type)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                          formData.eventTypes.includes(type)
                            ? 'bg-brandMagenta/20 border-brandMagenta text-brandMagenta'
                            : 'bg-black/30 border-white/10 text-gray-300 hover:border-brandCyan/50'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Average events per month</label>
                    <select
                      value={formData.averageEvents}
                      onChange={(e) => handleInputChange('averageEvents', e.target.value)}
                      className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white focus:border-brandCyan focus:outline-none"
                    >
                      <option value="">Select range</option>
                      <option value="1-5">1-5 events</option>
                      <option value="6-15">6-15 events</option>
                      <option value="16-30">16-30 events</option>
                      <option value="30+">30+ events</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Annual revenue range</label>
                    <select
                      value={formData.annualRevenue}
                      onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
                      className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white focus:border-brandCyan focus:outline-none"
                    >
                      <option value="">Select range</option>
                      <option value="under-100k">Under $100K</option>
                      <option value="100k-500k">$100K - $500K</option>
                      <option value="500k-1m">$500K - $1M</option>
                      <option value="1m-5m">$1M - $5M</option>
                      <option value="5m+">$5M+</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-orbitron font-bold text-white mb-2">Review & Submit</h2>
              <p className="text-gray-400">Review your application before submission</p>
            </div>

            <div className="space-y-6">
              <Card className="bg-black/40 backdrop-blur-md border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Building className="w-5 h-5 mr-2 text-brandMagenta" />
                    Venue Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white">{formData.venueName || 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-white">{formData.venueType || 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Location:</span>
                    <span className="text-white">{formData.city && formData.country ? `${formData.city}, ${formData.country}` : 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Capacity:</span>
                    <span className="text-white">{formData.capacity ? `${formData.capacity} people` : 'Not provided'}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-brandCyan" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contact:</span>
                    <span className="text-white">{formData.contactName || 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email:</span>
                    <span className="text-white">{formData.contactEmail || 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Phone:</span>
                    <span className="text-white">{formData.contactPhone || 'Not provided'}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-yellow-400" />
                    Event Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Event Types:</span>
                    <span className="text-white">{formData.eventTypes.length > 0 ? formData.eventTypes.join(', ') : 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monthly Events:</span>
                    <span className="text-white">{formData.averageEvents || 'Not provided'}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-gradient-to-r from-green-500/10 to-brandCyan/10 rounded-lg border border-green-500/20 p-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">Next Steps</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Our team will review your application within 2-3 business days</li>
                      <li>• We'll schedule a call to discuss partnership details</li>
                      <li>• Technical assessment and equipment planning</li>
                      <li>• Contract negotiation and setup scheduling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-brandMagenta/20 via-black to-brandCyan/20 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <Link href="/environments">
              <Button variant="outline" className="border-white/20 text-gray-300 hover:border-brandCyan/50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Environments
              </Button>
            </Link>
            
            <Badge className="bg-gradient-to-r from-brandMagenta to-brandCyan text-white border-none">
              Step {currentStep} of {totalSteps}
            </Badge>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-orbitron font-bold bg-gradient-to-r from-brandMagenta to-brandCyan bg-clip-text text-transparent mb-4">
              Venue Partnership Application
            </h1>
            <p className="text-xl text-gray-300">
              Join the future of entertainment and expand your reach globally
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="mt-8 w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-brandMagenta to-brandCyan h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit}>
          <Card className="bg-black/40 backdrop-blur-md border-white/10">
            <CardContent className="p-8">
              {renderStep()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="border-white/20 text-gray-300 hover:border-brandCyan/50 disabled:opacity-50"
            >
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                className="bg-gradient-to-r from-brandMagenta to-brandCyan hover:from-brandMagenta/80 hover:to-brandCyan/80"
              >
                Next Step
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-brandCyan hover:from-green-600 hover:to-brandCyan/80"
              >
                Submit Application
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
} 