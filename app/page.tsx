'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { MapPin, Briefcase, ArrowRight, Sparkles, TrendingUp, Users, Globe2, Zap, BarChart3 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [currentCountry, setCurrentCountry] = useState('')
  const [targetCountry, setTargetCountry] = useState('')
  const [profession, setProfession] = useState('')
  const [showContinue, setShowContinue] = useState(false)
  const router = useRouter()

  const countries = [
    'France', 'United States', 'Canada', 'Germany', 'Australia', 
    'New Zealand', 'United Kingdom', 'Japan', 'Singapore', 'Switzerland'
  ]

  const professions = [
    'Software Developer', 'Digital Nomad', 'Entrepreneur',
    'Consultant', 'Designer', 'Marketing Manager',
    'Data Scientist', 'Teacher', 'Engineer',
    'Sales Manager', 'Product Manager', 'Freelancer', 'Student'
  ]

  const handleFormComplete = () => {
    if (currentCountry && targetCountry && profession) {
      setShowContinue(true)
    }
  }

  const handleContinue = () => {
    router.push('/country/new-zealand')
  }

  const stats = [
    { 
      icon: Globe2, 
      value: '195+', 
      label: 'Countries Covered',
      description: 'Comprehensive data on global destinations',
      color: 'text-blue-600'
    },
    { 
      icon: Users, 
      value: '50k+', 
      label: 'Expats Helped',
      description: 'Success stories and testimonials',
      color: 'text-green-600'
    },
    { 
      icon: TrendingUp, 
      value: '98%', 
      label: 'Success Rate',
      description: 'Successful relocations and integrations',
      color: 'text-purple-600'
    },
    { 
      icon: BarChart3, 
      value: '24/7', 
      label: 'Real-time Data',
      description: 'Updated market insights and trends',
      color: 'text-orange-600'
    }
  ]

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Matching',
      description: 'Advanced algorithms match you with your ideal destination based on 50+ criteria'
    },
    {
      icon: BarChart3,
      title: 'Interactive Analytics',
      description: 'Real-time charts, tax calculators, and cost of living comparisons'
    },
    {
      icon: MapPin,
      title: 'Interactive Maps',
      description: 'Explore cities, neighborhoods, and expat-friendly areas with detailed insights'
    },
    {
      icon: Users,
      title: 'Community Network',
      description: 'Connect with expats from your country already living in your target destination'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="interactive-card relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-muted rounded-lg">
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">Live</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="font-semibold text-sm">{stat.label}</div>
                    <div className="text-xs text-muted-foreground">{stat.description}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <Badge className="bg-black text-white">
                <Sparkles className="h-3 w-3 mr-2" />
                AI-Powered Assessment
              </Badge>
              
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
                Your Next
                <br />
                <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                  Chapter Awaits
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
                Get personalized insights, real-time data, and expert guidance for your perfect expat destination.
              </p>
            </div>

            {/* Form Card */}
            <Card className="border-2 shadow-xl">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold mb-2">Start Your Journey</h3>
                    <p className="text-muted-foreground text-sm">Tell us about your situation for personalized recommendations</p>
                  </div>

                  <motion.div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center text-sm font-medium">
                        <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs mr-3">1</div>
                        I currently live in
                      </div>
                      <Select value={currentCountry} onValueChange={(value) => {
                        setCurrentCountry(value)
                        handleFormComplete()
                      }}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="🌍 Select your current country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country.toLowerCase()}>
                              🌍 {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center text-sm font-medium">
                        <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs mr-3">2</div>
                        and I would like to expatriate to
                      </div>
                      <Select value={targetCountry} onValueChange={(value) => {
                        setTargetCountry(value)
                        handleFormComplete()
                      }}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="🎯 Select your target country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country.toLowerCase()}>
                              🎯 {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center text-sm font-medium">
                        <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs mr-3">3</div>
                        as a
                      </div>
                      <Select value={profession} onValueChange={(value) => {
                        setProfession(value)
                        handleFormComplete()
                      }}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="💼 Select your profession" />
                        </SelectTrigger>
                        <SelectContent>
                          {professions.map((prof) => (
                            <SelectItem key={prof} value={prof.toLowerCase()}>
                              💼 {prof}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </motion.div>

                  <AnimatePresence>
                    {showContinue && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 500, 
                          damping: 30 
                        }}
                        className="pt-4"
                      >
                        <Button 
                          onClick={handleContinue}
                          className="w-full h-14 text-base font-semibold bg-black hover:bg-gray-800"
                          size="lg"
                        >
                          Get Your Personalized Guide
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Why Choose Expat Vision?</h2>
              
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="interactive-card">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="p-2 bg-black text-white rounded-lg">
                            <feature.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}