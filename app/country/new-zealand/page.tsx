'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  MapPin, Calendar, DollarSign, Shield, Heart, Building2, 
  Users, Wifi, Car, Plane, GraduationCap, TrendingUp,
  ExternalLink, Download, Clock, CheckCircle, AlertTriangle,
  Star, Globe, Thermometer, ArrowLeft, Calculator, BarChart3,
  Zap, Eye, ArrowUpRight
} from 'lucide-react'
import { useRouter } from 'next/navigation'

// Import dynamique pour éviter les erreurs SSR avec Leaflet
const DynamicMap = dynamic(() => import('@/components/CountryMap'), {
  ssr: false,
  loading: () => <div className="h-64 bg-muted animate-pulse rounded-lg"></div>
})

const TaxSimulator = dynamic(() => import('@/components/TaxSimulator'), {
  ssr: false
})

const InteractiveCharts = dynamic(() => import('@/components/InteractiveCharts'), {
  ssr: false
})

export default function NewZealandPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const router = useRouter()

  const countryData = {
    name: 'New Zealand',
    capital: 'Wellington',
    languages: ['English', 'Māori'],
    currency: 'NZD',
    exchangeRate: 1.65,
    regime: 'Parliamentary Democracy',
    coordinates: [-40.9006, 174.886],
    population: '5.1 million',
    gdpPerCapita: 48000,
    timeZone: 'NZST (UTC+12)'
  }

  const indexes = [
    { name: 'Corruption Index', score: 87, rank: '1st/180', trend: '+2' },
    { name: 'Democracy Index', score: 90, rank: '2nd/167', trend: '+1' },
    { name: 'Press Freedom', score: 85, rank: '8th/180', trend: '0' },
    { name: 'Doing Business', score: 86, rank: '1st/190', trend: '+3' },
    { name: 'HDI', score: 93, rank: '14th/189', trend: '+1' }
  ]

  const interactiveStats = [
    {
      id: 'cost-living',
      title: 'Cost of Living Calculator',
      description: 'Compare costs with your current location',
      icon: Calculator,
      value: 'Interactive',
      change: '+5.2%',
      color: 'bg-blue-500'
    },
    {
      id: 'salary-comparison',
      title: 'Salary Benchmarking',
      description: 'Software Developer salaries by city',
      icon: TrendingUp,
      value: 'NZ$ 95k',
      change: '+12.3%',
      color: 'bg-green-500'
    },
    {
      id: 'visa-tracker',
      title: 'Visa Processing Time',
      description: 'Real-time processing updates',
      icon: Clock,
      value: '23 days',
      change: '-3 days',
      color: 'bg-orange-500'
    },
    {
      id: 'expat-network',
      title: 'Expat Community',
      description: 'Connect with French expats',
      icon: Users,
      value: '2,847',
      change: '+156',
      color: 'bg-purple-500'
    }
  ]

  const quickActions = [
    {
      title: 'Download Visa Guide',
      description: 'Complete guide for French citizens',
      icon: Download,
      action: () => console.log('Download guide')
    },
    {
      title: 'Tax Calculator',
      description: 'Estimate your tax burden',
      icon: Calculator,
      action: () => setActiveTab('legal')
    },
    {
      title: 'Find Housing',
      description: 'Browse rental properties',
      icon: Building2,
      action: () => console.log('Find housing')
    },
    {
      title: 'Connect with Expats',
      description: 'Join community groups',
      icon: Users,
      action: () => console.log('Connect expats')
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="h-4 border-l border-border"></div>
            <Badge variant="secondary">Country Analysis</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Star className="h-4 w-4 mr-2" />
              Save Country
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Compare
            </Button>
          </div>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="overflow-hidden border-2">
            <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2">🇳🇿 New Zealand</h1>
                  <p className="text-slate-200 text-lg mb-4">Aotearoa - Land of the Long White Cloud</p>
                  <div className="flex items-center space-x-4">
                    <Badge className="bg-green-600 text-white">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending Up
                    </Badge>
                    <span className="text-sm text-slate-300">Last updated: Today</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1">92</div>
                  <div className="text-sm text-slate-200">Expat Score</div>
                  <div className="text-xs text-green-400">+2 this month</div>
                </div>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { label: 'Capital', value: countryData.capital, icon: MapPin },
                  { label: 'Population', value: countryData.population, icon: Users },
                  { label: 'Currency', value: `${countryData.currency} (${countryData.exchangeRate})`, icon: DollarSign },
                  { label: 'Language', value: 'English', icon: Globe },
                  { label: 'GDP/Capita', value: `$${countryData.gdpPerCapita}k`, icon: TrendingUp }
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="text-center p-3 rounded-lg hover:bg-muted transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <item.icon className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                    </div>
                    <p className="font-semibold">{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Interactive Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {interactiveStats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setHoveredCard(stat.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Card className="interactive-card relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                      <stat.icon className={`h-5 w-5 ${stat.color.replace('bg-', 'text-')}`} />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm">{stat.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{stat.value}</span>
                      <Badge variant="secondary" className="text-xs">
                        {stat.change}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                  {hoveredCard === stat.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-primary/5 border-2 border-primary/20 rounded-lg"
                    />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-start space-y-2 w-full"
                    onClick={action.action}
                  >
                    <action.icon className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-semibold">{action.title}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="living">Living</TabsTrigger>
            <TabsTrigger value="legal">Legal & Business</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Country Map */}
              <Card className="interactive-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Interactive Map
                  </CardTitle>
                  <CardDescription>
                    Explore major cities, regions, and expat-friendly areas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DynamicMap 
                    center={countryData.coordinates as [number, number]} 
                    zoom={6}
                    cities={[
                      { name: 'Auckland', coords: [-36.8485, 174.7633], population: '1.7M' },
                      { name: 'Wellington', coords: [-41.2865, 174.7762], population: '415k' },
                      { name: 'Christchurch', coords: [-43.5321, 172.6362], population: '380k' },
                      { name: 'Hamilton', coords: [-37.7870, 175.2793], population: '240k' }
                    ]}
                  />
                </CardContent>
              </Card>

              {/* International Rankings */}
              <Card className="interactive-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Global Rankings
                  </CardTitle>
                  <CardDescription>
                    International competitiveness indicators
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {indexes.map((index, i) => (
                    <motion.div
                      key={index.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="space-y-2 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium">{index.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{index.rank}</span>
                          <Badge variant="outline" className="text-xs">
                            {index.trend}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={index.score} className="h-2 flex-1" />
                        <span className="text-sm font-bold">{index.score}</span>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Interactive Charts */}
            <Card className="interactive-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Economic Indicators
                </CardTitle>
                <CardDescription>
                  Interactive charts showing key economic trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InteractiveCharts />
              </CardContent>
            </Card>

            {/* Climate and Regions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="interactive-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Thermometer className="h-5 w-5 mr-2" />
                    Climate Zones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { region: 'North Island', climate: 'Subtropical', temp: '15-25°C', icon: '🌴' },
                      { region: 'Central NZ', climate: 'Temperate', temp: '10-20°C', icon: '🌿' },
                      { region: 'South Island', climate: 'Cool temperate', temp: '5-18°C', icon: '🏔️' },
                      { region: 'Southern NZ', climate: 'Subpolar', temp: '2-15°C', icon: '❄️' }
                    ].map((zone, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition-colors"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{zone.icon}</span>
                          <div>
                            <span className="font-semibold">{zone.region}</span>
                            <p className="text-sm text-muted-foreground">{zone.climate}</p>
                          </div>
                        </div>
                        <Badge variant="outline">{zone.temp}</Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="interactive-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Safety Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { metric: 'Overall Safety', score: 95, description: 'Very low crime rate' },
                      { metric: 'Women Safety', score: 92, description: 'Excellent for solo travel' },
                      { metric: 'LGBTQ+ Friendly', score: 98, description: 'Progressive laws' },
                      { metric: 'Political Stability', score: 94, description: 'Stable democracy' }
                    ].map((safety, index) => (
                      <motion.div
                        key={index}
                        className="space-y-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{safety.metric}</span>
                          <span className="font-bold">{safety.score}/100</span>
                        </div>
                        <Progress value={safety.score} className="h-2" />
                        <p className="text-xs text-muted-foreground">{safety.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="legal" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tax Simulator */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="h-5 w-5 mr-2" />
                    Interactive Tax Calculator
                  </CardTitle>
                  <CardDescription>
                    Calculate your tax burden based on your income and situation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TaxSimulator />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Autres onglets... */}
        </Tabs>
      </div>
    </div>
  )
}