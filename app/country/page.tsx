'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  MapPin, Calendar, DollarSign, Shield, Heart, Building2, 
  Users, Wifi, Car, Plane, GraduationCap, TrendingUp,
  ExternalLink, Download, Clock, CheckCircle, AlertTriangle,
  Star, Globe, Thermometer, ArrowLeft, Calculator, BarChart3,
  Zap, Eye, Home, Briefcase, FileText, Award, ArrowRight,
  PlayCircle, Coffee, Banknote, TrendingDown, Activity,
  Sparkles, Target, Trophy, Lightbulb, BookOpen, MessageCircle,
  Video, Headphones, Link, ChevronRight, Plus, Bookmark,
  Share2, Filter, SortAsc
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import CurrencyConverter from '@/components/CurrencyConverter'
import TaxCalculator from '@/components/TaxComparisonCalculator'

// Import dynamique pour éviter les erreurs SSR avec Leaflet
const DynamicMap = dynamic(() => import('@/components/CountryMap'), {
  ssr: false,
  loading: () => <div className="h-96 bg-muted animate-pulse rounded-lg"></div>
})



// =================== DONNÉES PAYS ===================
const COUNTRY_DATA = {
  // Informations de base
  basic: {
    name: 'New Zealand',
    localName: 'Aotearoa',
    capital: 'Wellington',
    code: 'NZ',
    emoji: '🇳🇿',
    languages: ['English', 'Māori'],
    currency: 'NZD',
    exchangeRate: 1.65,
    regime: 'Parliamentary Democracy',
    coordinates: [-40.9006, 174.886] as [number, number],
    population: '5.1 million',
    gdpPerCapita: 48000,
    timeZone: 'NZST (UTC+12)',
    workingHours: '40h/week',
    minWage: 'NZ$22.70/hour',
    description: "Join 15,000+ French expats who've discovered exceptional quality of life, career opportunities, and natural beauty in the world's most peaceful country."
  },

  // Scores et classements
  ratings: {
    expatRating: 8.7,
    totalReviews: 2847,
    workLifeBalance: 92,
    careerGrowth: 85,
    safety: 96,
    globalRankings: [
      { label: '#1 Ease of Business', color: 'emerald' },
      { label: '#2 Most Peaceful', color: 'blue' },
      { label: '#6 Quality of Life', color: 'purple' }
    ]
  },

  // Villes principales
  cities: [
    { name: 'Auckland', coords: [-36.8485, 174.7633] as [number, number], population: '1.7M', description: 'Economic hub, 34% of population', icon: '🏙️', color: 'emerald' },
    { name: 'Wellington', coords: [-41.2865, 174.7762] as [number, number], population: '415k', description: 'Capital, tech & government', icon: '🏛️', color: 'blue' },
    { name: 'Christchurch', coords: [-43.5321, 172.6362] as [number, number], population: '380k', description: 'Lower costs, growing tech', icon: '🌿', color: 'green' },
    { name: 'Hamilton', coords: [-37.7870, 175.2793] as [number, number], population: '240k', description: 'Agricultural center', icon: '🌊', color: 'purple' }
  ],

  // Indicateurs économiques
  economicStats: [
    {
      title: "GDP Growth",
      value: "2.8%",
      change: "+0.3%",
      trend: "up" as const,
      description: "Annual growth rate",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      target: "3.2%"
    },
    {
      title: "Inflation Rate", 
      value: "3.2%",
      change: "-1.1%",
      trend: "down" as const,
      description: "Consumer price index",
      icon: Activity,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      target: "2-3%"
    },
    {
      title: "Unemployment",
      value: "3.4%",
      change: "-0.2%",
      trend: "down" as const,
      description: "Labor force participation",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      target: "<4%"
    },
    {
      title: "Interest Rate",
      value: "5.25%",
      change: "0%",
      trend: "stable" as const,
      description: "Official cash rate",
      icon: Banknote,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      target: "5-5.5%"
    }
  ],

  // Ressources vidéo minimalistes
  videoResources: [
    {
      title: "Mon installation en Nouvelle-Zélande",
      channel: "Julie en NZ",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      language: "French"
    },
    {
      title: "Trouver un travail en Nouvelle-Zélande",
      channel: "Expat Success",
      youtubeUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
      language: "French"
    },
    {
      title: "Le coût de la vie à Auckland",
      channel: "French in Auckland",
      youtubeUrl: "https://www.youtube.com/watch?v=abcd1234567",
      language: "French"
    },
    {
      title: "Starting a Business in New Zealand",
      channel: "Business NZ",
      youtubeUrl: "https://www.youtube.com/watch?v=efgh8901234",
      language: "English"
    }
  ],

  // Opportunités business avec secteurs scrollables
  businessOpportunities: {
    advantages: [
      {
        title: "Ease of Doing Business",
        value: "#1 globally",
        description: "World Bank ranking for business environment",
        icon: "🏆",
        trend: "stable",
        sourceYear: "2024"
      },
      {
        title: "Company Registration", 
        value: "1 day",
        description: "Online company formation process",
        icon: "⚡",
        trend: "improved",
        sourceYear: "2024"
      },
      {
        title: "Corporate Tax Rate",
        value: "28%",
        description: "Competitive rate for OECD countries",
        icon: "💼", 
        trend: "stable",
        sourceYear: "2024"
      },
      {
        title: "R&D Tax Credit",
        value: "15%",
        description: "Government incentive for innovation",
        icon: "🔬",
        trend: "increased",
        sourceYear: "2024"
      }
    ],
    growingSectors: [
      {
        sector: "Technology",
        growth: "+12%",
        opportunity: "Fintech, AgriTech, HealthTech startups",
        funding: "High",
        averageSalary: "NZ$85,000",
        jobOpenings: "2,340",
        futureOutlook: "Excellent",
        description: "Booming tech scene with government support for innovation"
      },
      {
        sector: "Tourism",
        growth: "+8%", 
        opportunity: "Sustainable and adventure tourism",
        funding: "Medium",
        averageSalary: "NZ$55,000",
        jobOpenings: "1,560",
        futureOutlook: "Good",
        description: "Recovery post-COVID with focus on high-value tourists"
      },
      {
        sector: "AgriFood",
        growth: "+15%",
        opportunity: "Organic farming, food processing",
        funding: "High",
        averageSalary: "NZ$68,000", 
        jobOpenings: "890",
        futureOutlook: "Very Good",
        description: "Export-driven sector with premium positioning"
      },
      {
        sector: "Renewable Energy",
        growth: "+20%",
        opportunity: "Solar, wind, geothermal projects",
        funding: "Very High",
        averageSalary: "NZ$92,000",
        jobOpenings: "1,240",
        futureOutlook: "Excellent",
        description: "Leading the clean energy transition globally"
      },
      {
        sector: "Construction",
        growth: "+6%",
        opportunity: "Housing shortage, infrastructure projects",
        funding: "Medium",
        averageSalary: "NZ$72,000",
        jobOpenings: "3,240",
        futureOutlook: "Good",
        description: "Ongoing housing crisis creates opportunities"
      },
      {
        sector: "Healthcare",
        growth: "+9%",
        opportunity: "Aging population, medical technology",
        funding: "High",
        averageSalary: "NZ$78,000",
        jobOpenings: "1,890",
        futureOutlook: "Very Good",
        description: "Growing demand for healthcare professionals"
      }
    ],
    governmentSupport: [
      {
        name: "Callaghan Innovation",
        description: "R&D grants and innovation support",
        funding: "Up to NZ$5M",
        website: "callaghaninnovation.govt.nz",
        eligibility: "All businesses"
      },
      {
        name: "NZTE",
        description: "Export development and trade support", 
        funding: "Various programs",
        website: "nzte.govt.nz",
        eligibility: "Export-focused businesses"
      },
      {
        name: "Regional Development",
        description: "Local business growth incentives",
        funding: "Location-dependent",
        website: "mbie.govt.nz",
        eligibility: "Regional businesses"
      }
    ]
  }
}

// Fonction utilitaire pour extraire l'ID YouTube du lien
const extractYouTubeId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : ''
}

export default function NewZealandPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const router = useRouter()

  const countryData = COUNTRY_DATA.basic
  const ratings = COUNTRY_DATA.ratings
  const cities = COUNTRY_DATA.cities
  const economicStats = COUNTRY_DATA.economicStats

  return (
    <div className="min-h-screen bg-background relative">
      {/* Grain texture très léger */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.015] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      />
      
      <div className="w-full max-w-[83%] mx-auto px-6 py-8 lg:max-w-[83%] md:max-w-[95%] sm:max-w-[100%] sm:px-4">
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
              <Bookmark className="h-4 w-4 mr-2" />
              Save Country
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Compare
            </Button>
          </div>
        </div>

        {/* Card Pays Redesignée - Style Papier */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="shadow-lg">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="text-6xl">{countryData.emoji}</div>
                  <div>
                    <CardTitle className="text-3xl font-bold text-foreground mb-2">
                      {countryData.name}
                    </CardTitle>
                    <CardDescription className="text-lg text-muted-foreground">
                      {countryData.localName} - Land of Opportunities
                    </CardDescription>
                  </div>
                </div>
                
                {/* Score compact à droite */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-600 mb-1">{ratings.expatRating}</div>
                  <div className="text-sm font-medium text-gray-700">Expat Rating</div>
                  <div className="flex justify-center mt-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {ratings.totalReviews.toLocaleString()} reviews
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {/* Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {countryData.description}
              </p>

              {/* Rankings badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {ratings.globalRankings.map((ranking, index) => (
                  <Badge key={index} variant="secondary" className="bg-emerald-100 text-emerald-800">
                    <Sparkles className="h-3 w-3 mr-1" />
                    {ranking.label}
                  </Badge>
                ))}
              </div>

              {/* Informations de base en grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t">
                {[
                  { label: 'Capital', value: countryData.capital, icon: MapPin },
                  { label: 'Population', value: countryData.population, icon: Users },
                  { label: 'Language', value: countryData.languages[0], icon: Globe },
                  { label: 'Currency', value: `1 EUR = ${countryData.exchangeRate} ${countryData.currency}`, icon: DollarSign },
                  { label: 'Time Zone', value: countryData.timeZone, icon: Clock }
                ].map((item, index) => (
                  <div key={index} className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <item.icon className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
                    </div>
                    <p className="font-semibold text-sm text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Métriques clés */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t">
                <div className="text-center">
                  <div className="text-lg font-bold text-emerald-600">{ratings.workLifeBalance}%</div>
                  <div className="text-xs text-muted-foreground">Work-Life Balance</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{ratings.careerGrowth}%</div>
                  <div className="text-xs text-muted-foreground">Career Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{ratings.safety}%</div>
                  <div className="text-xs text-muted-foreground">Safety & Security</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="living" className="flex items-center">
              <Home className="h-4 w-4 mr-2" />
              Living
            </TabsTrigger>
            <TabsTrigger value="legal" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Visa & Legal
            </TabsTrigger>
            <TabsTrigger value="opportunities" className="flex items-center">
              <Briefcase className="h-4 w-4 mr-2" />
              Jobs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Ressources Vidéo - Version ultra minimaliste */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PlayCircle className="h-5 w-5 mr-2" />
                  Essential Video Guides
                </CardTitle>
                <CardDescription>
                  Learn from French expats who successfully moved to {countryData.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {COUNTRY_DATA.videoResources.map((video, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-all cursor-pointer group"
                      onClick={() => window.open(video.youtubeUrl, '_blank')}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center group-hover:bg-red-700 transition-colors">
                          <PlayCircle className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-sm group-hover:text-red-600 transition-colors">
                            {video.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {video.channel}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {video.language === 'French' ? '🇫🇷' : '🇬🇧'} {video.language}
                        </Badge>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-red-600 transition-colors" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Business & Investment - Section avec scroll */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Business & Investment Climate
                </CardTitle>
                <CardDescription>
                  Why {countryData.name} is attractive for entrepreneurs and investors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Business Advantages */}
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center">
                      <Trophy className="h-4 w-4 mr-2 text-green-600" />
                      Business Advantages
                    </h4>
                    {COUNTRY_DATA.businessOpportunities.advantages.map((advantage, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-center space-x-4 p-4 bg-muted rounded-lg hover:shadow-md transition-all cursor-pointer group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="text-3xl">{advantage.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{advantage.title}</span>
                            <Badge variant="outline">{advantage.value}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{advantage.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* High-Growth Sectors - Scrollable */}
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-blue-600" />
                      High-Growth Sectors
                    </h4>
                    <div className="max-h-96 overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                      {COUNTRY_DATA.businessOpportunities.growingSectors.map((sector, index) => (
                        <motion.div 
                          key={index}
                          className="p-4 border rounded-lg hover:bg-muted/50 transition-all cursor-pointer group"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{sector.sector}</span>
                            <Badge className="bg-green-100 text-green-800">{sector.growth}</Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">{sector.description}</p>
                          
                          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                            <div className="bg-blue-50 p-2 rounded">
                              <div className="font-medium">Avg. Salary</div>
                              <div className="text-blue-600 font-semibold">{sector.averageSalary}</div>
                            </div>
                            <div className="bg-green-50 p-2 rounded">
                              <div className="font-medium">Job Openings</div>
                              <div className="text-green-600 font-semibold">{sector.jobOpenings}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">Funding:</span>
                              <Badge variant="secondary">{sector.funding}</Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">Outlook:</span>
                              <Badge variant={sector.futureOutlook === 'Excellent' ? 'default' : 'secondary'}>
                                {sector.futureOutlook}
                              </Badge>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Government Support */}
                <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Building2 className="h-4 w-4 mr-2 text-emerald-600" />
                    Government Support Programs
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    {COUNTRY_DATA.businessOpportunities.governmentSupport.map((program, index) => (
                      <div key={index} className="bg-white p-4 rounded border-l-4 border-emerald-400 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="font-medium text-emerald-700 mb-1">{program.name}</div>
                        <div className="text-muted-foreground text-xs mb-2">{program.description}</div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">{program.funding}</Badge>
                          <ExternalLink className="h-3 w-3 text-muted-foreground" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          


          <TabsContent value="living" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost of Living</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Home className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Living costs comparison coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Job opportunities section coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}