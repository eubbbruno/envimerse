"use client"

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Check, 
  X, 
  Star, 
  ArrowRight, 
  Sparkles,
  Users,
  Zap,
  Shield,
  Headphones,
  Globe,
  BarChart3,
  Clock,
  CreditCard,
  HelpCircle,
  Plus,
  Minus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GalaxyCSS from '@/components/3d/GalaxyCSS'

interface PricingCardProps {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  notIncluded?: string[]
  highlighted?: boolean
  popular?: boolean
  delay?: number
}

function PricingCard({ 
  name, 
  price, 
  period, 
  description, 
  features, 
  notIncluded = [], 
  highlighted = false, 
  popular = false,
  delay = 0 
}: PricingCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      className={`relative p-6 lg:p-8 rounded-2xl border backdrop-blur-sm ${
        highlighted 
          ? 'bg-gradient-to-br from-purple-900/40 to-cyan-900/40 border-purple-500/50 scale-105' 
          : 'bg-white/5 border-white/10'
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
            <Star className="w-4 h-4 mr-1" />
            Most Popular
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
        <div className="flex items-baseline justify-center mb-2">
          <span className="text-4xl lg:text-5xl font-bold text-white">{price}</span>
          {period && <span className="text-gray-400 ml-2">{period}</span>}
        </div>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>

      <div className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
            <span className="text-gray-300 text-sm">{feature}</span>
          </div>
        ))}
        
        {notIncluded.map((feature, index) => (
          <div key={index} className="flex items-center opacity-50">
            <X className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
            <span className="text-gray-500 text-sm line-through">{feature}</span>
          </div>
        ))}
      </div>

      <Button 
        className={`w-full ${
          highlighted 
            ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700' 
            : 'bg-white/10 hover:bg-white/20 border border-white/20'
        }`}
      >
        {name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  )
}

interface FAQItemProps {
  question: string
  answer: string
  delay?: number
}

function FAQItem({ question, answer, delay = 0 }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <span className="text-white font-semibold">{question}</span>
        {isOpen ? (
          <Minus className="w-5 h-5 text-purple-400 flex-shrink-0" />
        ) : (
          <Plus className="w-5 h-5 text-purple-400 flex-shrink-0" />
        )}
      </button>
      
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6">
          <p className="text-gray-300 leading-relaxed">{answer}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      name: 'Starter',
      price: '5%',
      period: 'commission',
      description: 'Perfect for individual creators and small events',
      features: [
        'Up to 500 virtual attendees',
        'HD streaming quality',
        'Basic VR support',
        'Stripe + Crypto payments',
        'Standard support',
        'Dashboard analytics',
        '5% commission on ticket sales'
      ],
      notIncluded: [
        'Advanced analytics',
        'Custom branding',
        'Priority support'
      ],
      highlighted: false,
      popular: false
    },
    {
      name: 'Professional',
      price: '3.5%',
      period: 'commission',
      description: 'Ideal for venues and regular event organizers',
      features: [
        'Up to 5,000 virtual attendees',
        '4K streaming quality',
        'Full VR experience',
        'Advanced payment processing',
        'Priority support',
        'Advanced analytics',
        'Custom branding options',
        '3.5% commission on ticket sales'
      ],
      notIncluded: [
        'White-label solution',
        'Dedicated manager'
      ],
      highlighted: true,
      popular: true
    },
    {
      name: 'Enterprise',
      price: '2.5%',
      period: 'commission',
      description: 'For large venues and high-volume events',
      features: [
        'Unlimited virtual attendees',
        '8K streaming capability',
        'Complete VR ecosystem',
        'White-label solution',
        'Dedicated account manager',
        'Custom integrations',
        'API access',
        'Real-time analytics',
        'Priority processing',
        '2.5% commission on ticket sales'
      ],
      highlighted: false,
      popular: false
    },
    {
      name: 'Custom',
      price: 'Negotiable',
      period: 'commission',
      description: 'Tailored solutions for enterprise partnerships',
      features: [
        'Custom commission rates',
        'Dedicated infrastructure',
        'Custom development',
        'SLA guarantees',
        'Technical integration',
        '24/7 dedicated support',
        'Revenue sharing models',
        'Partnership opportunities'
      ],
      highlighted: false,
      popular: false
    }
  ]

  const addOns = [
    {
      name: 'Advanced Analytics',
      price: '$19/month',
      description: 'Deep insights into audience behavior and engagement'
    },
    {
      name: 'Custom Branding',
      price: '$39/month',
      description: 'Complete white-label solution with your branding'
    },
    {
      name: 'Premium Support',
      price: '$79/month',
      description: '24/7 priority support with dedicated account manager'
    },
    {
      name: 'Extended Storage',
      price: '$9/month',
      description: 'Additional 1TB storage for recordings and content'
    }
  ]

  const faqs = [
    {
      question: 'How does pricing work for virtual attendees?',
      answer: 'Our pricing is based on concurrent virtual attendees during your events. You can have unlimited registered users, but the plan limits apply to how many can watch simultaneously.'
    },
    {
      question: 'Can I change plans at any time?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades will apply at your next billing cycle.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and for Enterprise customers, we also support ACH transfers and crypto payments.'
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes! All paid plans come with a 14-day free trial. You can also use our Free plan indefinitely to test the platform.'
    },
    {
      question: 'What happens if I exceed my attendee limit?',
      answer: 'We provide real-time notifications when approaching limits. If exceeded, additional attendees are charged at $0.10 per attendee per hour.'
    },
    {
      question: 'Do you offer discounts for annual billing?',
      answer: 'Yes! Annual billing provides approximately 15% savings compared to monthly billing, plus additional features and priority support.'
    },
    {
      question: 'Can I get a refund?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans. Enterprise customers have custom refund policies in their agreements.'
    },
    {
      question: 'What technical requirements do I need?',
      answer: 'Our platform works on any modern device. For VR events, you\'ll need compatible VR headsets. We provide detailed technical requirements during onboarding.'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <GalaxyCSS />
      </div>
      
      <Header />
      
      {/* Hero Section */}
      <section className="relative z-10 pt-20 sm:pt-24 pb-12 sm:pb-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-purple-200 backdrop-blur-sm mb-8">
              <CreditCard className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Simple, Transparent Pricing</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Transaction-Based
              </span>
              <br />
              <span className="text-white">
                Commission Model
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed mb-8">
              We only earn when you earn. Simple commission-based pricing.
              <br />
              No monthly fees, no hidden costs. Just success-based partnership.
            </p>

            {/* Commission Info */}
            <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-full px-6 py-3 inline-flex items-center mb-8">
              <span className="text-sm font-medium text-purple-200">
                💰 Commission-only model • No monthly fees • You earn, we earn
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative z-10 py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {plans.map((plan, index) => (
              <PricingCard
                key={index}
                {...plan}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
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
                Enhance Your Plan
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Add powerful features to customize your experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {addOns.map((addon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">{addon.name}</h3>
                  <span className="text-purple-400 font-semibold">{addon.price}</span>
                </div>
                <p className="text-gray-300 text-sm mb-4">{addon.description}</p>
                <Button 
                  variant="outline" 
                  className="w-full border-white/30 hover:border-cyan-400 text-white hover:text-cyan-400"
                >
                  Add to Plan
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
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
                Feature Comparison
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              See exactly what's included in each plan
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 text-white font-semibold">Features</th>
                    <th className="text-center py-4 text-white font-semibold">Free</th>
                    <th className="text-center py-4 text-white font-semibold">Creator</th>
                    <th className="text-center py-4 text-white font-semibold bg-purple-500/20 rounded-t">
                      Professional
                    </th>
                    <th className="text-center py-4 text-white font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    ['Virtual Attendees', '50', '500', '2,500', 'Unlimited'],
                    ['Streaming Quality', 'HD', '4K', '4K + Spatial Audio', '8K'],
                    ['VR Support', '✗', '✓', '✓', '✓'],
                    ['Analytics', 'Basic', 'Basic', 'Advanced', 'Real-time'],
                    ['Custom Branding', '✗', 'Limited', '✓', '✓'],
                    ['API Access', '✗', '✗', '✓', '✓'],
                    ['Support', 'Community', 'Email', 'Priority Email', '24/7 Phone']
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="py-3 text-gray-300">{row[0]}</td>
                      <td className="py-3 text-center text-gray-400">{row[1]}</td>
                      <td className="py-3 text-center text-gray-300">{row[2]}</td>
                      <td className="py-3 text-center text-white bg-purple-500/10">{row[3]}</td>
                      <td className="py-3 text-center text-gray-300">{row[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300">
              Everything you need to know about our pricing
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                {...faq}
                delay={index * 0.1}
              />
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
            <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              Start your free trial today and experience the future of live entertainment. 
              No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-4 text-lg">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="border-white/30 hover:border-cyan-400 text-white hover:text-cyan-400 px-8 py-4 text-lg"
              >
                <HelpCircle className="w-5 h-5 mr-2" />
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
