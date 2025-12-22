"use client"

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Globe, 
  Zap, 
  Shield, 
  DollarSign, 
  BarChart3,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Headphones,
  Camera,
  Wifi,
  Phone,
  Calendar,
  Target
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GalaxyCSS from '@/components/3d/GalaxyCSS'

interface BenefitCardProps {
  icon: React.ReactNode
  title: string
  description: string
  benefits: string[]
  color: string
  delay?: number
}

function BenefitCard({ icon, title, description, benefits, color, delay = 0 }: BenefitCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white/5 backdrop-blur-sm p-6 lg:p-8 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
    >
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 ${color}`}>
        {icon}
      </div>
      
      <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">
        {title}
      </h3>
      
      <p className="text-gray-300 mb-6 leading-relaxed">
        {description}
      </p>

      <ul className="space-y-3">
        {benefits.map((benefit, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.4, delay: delay + 0.2 + (index * 0.1) }}
            className="flex items-center"
          >
            <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
            <span className="text-sm text-gray-300">{benefit}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

interface SuccessStoryProps {
  name: string
  type: string
  location: string
  attendees: string
  revenue: string
  growth: string
  quote: string
  delay?: number
}

function SuccessStory({ name, type, location, attendees, revenue, growth, quote, delay = 0 }: SuccessStoryProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 p-6 lg:p-8 rounded-2xl border border-purple-500/20 backdrop-blur-sm"
    >
      <div className="flex items-center mb-4">
        <Building2 className="w-6 h-6 text-purple-400 mr-3" />
        <div>
          <h3 className="text-lg font-bold text-white">{name}</h3>
          <p className="text-sm text-purple-300">{type} • {location}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{attendees}</div>
          <div className="text-xs text-gray-400">Attendees</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-cyan-400">{revenue}</div>
          <div className="text-xs text-gray-400">Revenue</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">{growth}</div>
          <div className="text-xs text-gray-400">Growth</div>
        </div>
      </div>

      <blockquote className="text-gray-300 italic">
        "{quote}"
      </blockquote>
    </motion.div>
  )
}

export default function ForVenuesPage() {
  const [selectedPlan, setSelectedPlan] = useState('professional')

  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      title: "Expand Your Reach",
      description: "Break geographical barriers and reach global audiences. Transform local events into worldwide experiences.",
      benefits: [
        "Global audience access",
        "No venue capacity limits",
        "Hybrid event capabilities",
        "Multi-timezone support",
        "Real-time analytics"
      ],
      color: "bg-gradient-to-br from-green-600/30 to-emerald-600/30"
    },
    {
      icon: <DollarSign className="w-8 h-8 text-white" />,
      title: "New Revenue Streams",
      description: "Create additional income through virtual tickets, premium experiences, and digital merchandise.",
      benefits: [
        "Virtual ticket sales",
        "Premium VR experiences",
        "Digital merchandise",
        "Sponsorship opportunities",
        "Revenue sharing model"
      ],
      color: "bg-gradient-to-br from-yellow-600/30 to-orange-600/30"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-white" />,
      title: "Data & Analytics",
      description: "Gain valuable insights into audience behavior, engagement patterns, and event performance.",
      benefits: [
        "Real-time engagement metrics",
        "Audience demographics",
        "Heat map analysis",
        "ROI tracking",
        "Custom reports"
      ],
      color: "bg-gradient-to-br from-blue-600/30 to-indigo-600/30"
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: "Risk Mitigation",
      description: "Reduce event risks with hybrid capabilities, ensuring events can continue regardless of circumstances.",
      benefits: [
        "Weather-proof events",
        "Pandemic resilience",
        "Technical backup options",
        "Revenue protection",
        "Insurance benefits"
      ],
      color: "bg-gradient-to-br from-purple-600/30 to-pink-600/30"
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Enhanced Experience",
      description: "Offer unique perspectives and interactive features that physical venues alone cannot provide.",
      benefits: [
        "Multiple camera angles",
        "Behind-the-scenes access",
        "Interactive elements",
        "Social features",
        "Accessibility options"
      ],
      color: "bg-gradient-to-br from-cyan-600/30 to-teal-600/30"
    },
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      title: "Easy Integration",
      description: "Seamlessly integrate with your existing systems and workflows without disrupting operations.",
      benefits: [
        "Existing equipment compatible",
        "API integrations",
        "Custom branding",
        "Staff training included",
        "24/7 technical support"
      ],
      color: "bg-gradient-to-br from-red-600/30 to-pink-600/30"
    }
  ]

  const successStories = [
    {
      name: "Madison Square Garden",
      type: "Arena",
      location: "New York, USA",
      attendees: "50K+",
      revenue: "+300%",
      growth: "+150%",
      quote: "Envimerse helped us reach fans worldwide who couldn't attend in person. The VR experience is incredible."
    },
    {
      name: "Sydney Opera House",
      type: "Concert Hall",
      location: "Sydney, Australia",
      attendees: "25K+",
      revenue: "+250%",
      growth: "+120%",
      quote: "The platform seamlessly blended our physical and digital audiences into one unified experience."
    },
    {
      name: "Fabric London",
      type: "Nightclub",
      location: "London, UK",
      attendees: "15K+",
      revenue: "+400%",
      growth: "+200%",
      quote: "Virtual clubbing opened entirely new possibilities for electronic music events and fan engagement."
    }
  ]

  const integrationSteps = [
    {
      step: 1,
      title: "Consultation",
      description: "We analyze your venue and events to create a custom integration plan.",
      icon: <Phone className="w-6 h-6" />
    },
    {
      step: 2,
      title: "Setup",
      description: "Our team installs and configures all necessary equipment and software.",
      icon: <Camera className="w-6 h-6" />
    },
    {
      step: 3,
      title: "Training",
      description: "Comprehensive training for your staff on operating the platform.",
      icon: <Users className="w-6 h-6" />
    },
    {
      step: 4,
      title: "Launch",
      description: "Go live with your first virtual event with full technical support.",
      icon: <Sparkles className="w-6 h-6" />
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <GalaxyCSS />
      </div>
      
      <Header />
      
      {/* Hero Section - Adjusted for fixed header */}
      <section className="relative z-10 pt-32 sm:pt-36 pb-12 sm:pb-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-purple-200 backdrop-blur-sm mb-8">
              <Building2 className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">For Venues & Organizers</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Transform Your Venue
              </span>
              <br />
              <span className="text-white">
                Into a Global Stage
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed mb-8 max-w-4xl mx-auto">
              Reach global audiences, increase revenue, and create unforgettable experiences 
              with our cutting-edge virtual and hybrid event platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-4 text-lg">
                Schedule Demo
                <Calendar className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="border-white/30 hover:border-cyan-400 text-white hover:text-cyan-400 px-8 py-4 text-lg"
              >
                <Target className="w-5 h-5 mr-2" />
                Case Studies
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="relative z-10 py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Why Choose Envimerse?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Transform your events with technology that delivers real results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                {...benefit}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="relative z-10 py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Join world-class venues already transforming live entertainment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {successStories.map((story, index) => (
              <SuccessStory
                key={index}
                {...story}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Integration Process */}
      <section className="relative z-10 py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Simple Integration Process
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Get up and running in just 4 steps with full support from our team
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {integrationSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="relative z-10 py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Flexible Pricing Plans
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the plan that fits your venue size and needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: "Starter",
                price: "$99",
                period: "/month",
                description: "Perfect for small venues and event organizers",
                features: [
                  "Up to 500 virtual attendees",
                  "HD streaming quality",
                  "Basic analytics",
                  "Email support",
                  "Standard integrations"
                ],
                highlighted: false
              },
              {
                name: "Professional",
                price: "$299",
                period: "/month",
                description: "Ideal for medium-sized venues and regular events",
                features: [
                  "Up to 5,000 virtual attendees",
                  "4K streaming quality",
                  "Advanced analytics",
                  "Priority support",
                  "Custom integrations",
                  "VR support",
                  "Multi-camera setup"
                ],
                highlighted: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                description: "For large venues and high-volume events",
                features: [
                  "Unlimited virtual attendees",
                  "8K streaming quality",
                  "Real-time analytics",
                  "24/7 dedicated support",
                  "Full API access",
                  "White-label solution",
                  "Custom development"
                ],
                highlighted: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-6 lg:p-8 rounded-2xl border backdrop-blur-sm ${
                  plan.highlighted 
                    ? 'bg-gradient-to-br from-purple-900/40 to-cyan-900/40 border-purple-500/50' 
                    : 'bg-white/5 border-white/10'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl lg:text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-gray-300 text-sm mt-2">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.highlighted 
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700' 
                      : 'bg-white/10 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 p-8 lg:p-12 rounded-2xl border border-purple-500/20"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Venue?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              Join the future of live entertainment. Contact us for a personalized demo 
              and see how Envimerse can revolutionize your events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-4 text-lg">
                Schedule Demo
                <Calendar className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="border-white/30 hover:border-cyan-400 text-white hover:text-cyan-400 px-8 py-4 text-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
