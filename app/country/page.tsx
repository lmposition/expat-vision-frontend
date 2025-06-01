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
  Sun, Cloud, CloudRain, Snowflake, Wind
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import CurrencyConverter from '@/components/CurrencyConverter'

import TaxComparisonCalculator from '@/components/TaxComparisonCalculator'

// Import dynamique pour éviter les erreurs SSR avec Leaflet
const DynamicMap = dynamic(() => import('@/components/CountryMap'), {
  ssr: false,
  loading: () => <div className="h-96 bg-muted/30 animate-pulse rounded-lg"></div>
})



export default function NewZealandPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [visaModalOpen, setVisaModalOpen] = useState(false)
  const router = useRouter()

  const countryData = {
    name: 'New Zealand',
    localName: 'Aotearoa',
    capital: 'Wellington',
    languages: ['English', 'Māori'],
    currency: 'NZD',
    exchangeRate: 1.65,
    regime: 'Parliamentary Democracy',
    coordinates: [-40.9006, 174.886],
    population: '5.1 million',
    gdpPerCapita: 48000,
    timeZone: 'NZST (UTC+12)',
    workingHours: '40h/week',
    minWage: 'NZ$22.70/hour',
    climate: 'Temperate oceanic',
    area: '268,021 km²'
  }

  const economicStats = [
    {
      title: "GDP Growth",
      value: "2.8%",
      change: "+0.3%",
      trend: "up",
      description: "Annual growth rate",
      icon: TrendingUp,
    },
    {
      title: "Inflation Rate",
      value: "3.2%",
      change: "-1.1%",
      trend: "down",
      description: "Consumer price index",
      icon: Activity,
    },
    {
      title: "Unemployment",
      value: "3.4%",
      change: "-0.2%",
      trend: "down",
      description: "Labor force participation",
      icon: Users,
    },
    {
      title: "Interest Rate",
      value: "5.25%",
      change: "0%",
      trend: "stable",
      description: "Official cash rate",
      icon: Banknote,
    }
  ]

  const visaSteps = [
    { step: 1, title: "Check Eligibility", duration: "1 day", status: "start" },
    { step: 2, title: "Gather Documents", duration: "1-2 weeks", status: "process" },
    { step: 3, title: "Submit Application", duration: "1 day", status: "process" },
    { step: 4, title: "Medical & Police Checks", duration: "2-4 weeks", status: "process" },
    { step: 5, title: "Decision", duration: "2-12 weeks", status: "process" },
    { step: 6, title: "Visa Granted", duration: "Instant", status: "end" }
  ]

  const jobPlatforms = [
    {
      name: "Seek",
      url: "seek.co.nz",
      logo: "🔍",
      description: "New Zealand's #1 job site",
      rating: 5,
      specialty: "All industries"
    },
    {
      name: "Trade Me Jobs",
      url: "trademe.co.nz/jobs",
      logo: "🛒",
      description: "Popular Kiwi marketplace",
      rating: 5,
      specialty: "Local jobs"
    },
    {
      name: "LinkedIn",
      url: "linkedin.com",
      logo: "💼",
      description: "Professional networking",
      rating: 4,
      specialty: "Corporate roles"
    },
    {
      name: "WorkHere",
      url: "workhere.co.nz",
      logo: "💻",
      description: "Tech-focused platform",
      rating: 4,
      specialty: "Technology"
    }
  ]

  const jobTips = [
    {
      tip: "Tailor your CV to NZ format",
      detail: "Keep it 2-3 pages, include personal details section",
    },
    {
      tip: "Get local references fast",
      detail: "Kiwi employers prefer NZ-based references",
    },
    {
      tip: "Network at meetups",
      detail: "Join professional groups and attend events",
    },
    {
      tip: "Apply quickly",
      detail: "NZ employers hire fast, respond within 24h",
    },
    {
      tip: "Show cultural fit",
      detail: "Emphasize teamwork and work-life balance",
    },
    {
      tip: "Follow up professionally",
      detail: "A polite follow-up shows genuine interest",
    }
  ]

  const workPerks = [
    {
      title: "KiwiSaver",
      description: "Government retirement scheme",
      detail: "Employer contributes 3-4% of your salary",
      icon: "🏦",
      highlight: "Free money!"
    },
    {
      title: "Flexible Working",
      description: "Work from anywhere culture",
      detail: "Most companies offer hybrid/remote options",
      icon: "🏠",
      highlight: "Work-life balance"
    },
    {
      title: "Friday Drinks",
      description: "Social workplace tradition",
      detail: "Team bonding over drinks after work",
      icon: "🍻",
      highlight: "Kiwi tradition"
    },
    {
      title: "Outdoor Team Building",
      description: "Adventure-based activities",
      detail: "Hiking, sailing, skiing with colleagues",
      icon: "🏔️",
      highlight: "Unique to NZ"
    },
    {
      title: "Mental Health Days",
      description: "Wellbeing focus",
      detail: "Many companies offer mental health leave",
      icon: "🧠",
      highlight: "Progressive"
    },
    {
      title: "Learning Budget",
      description: "Professional development",
      detail: "$1,000-3,000 annual training budget",
      icon: "📚",
      highlight: "Skill growth"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Container principal avec largeur de 80-85% */}
      <div className="w-[83%] max-w-none mx-auto px-6 lg:px-8 py-6">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.back()}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="h-4 w-px bg-border"></div>
            <Badge variant="secondary" className="text-xs">Country Analysis</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Star className="h-3 w-3 mr-1" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Eye className="h-3 w-3 mr-1" />
              Compare
            </Button>
          </div>
        </div>

        {/* Hero Section - Redesigned avec effet livre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card via-card to-muted/20">
            {/* Effet de texture papier */}
            <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" 
                 style={{
                   backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                 }} 
            />
            
            {/* Contenu principal */}
            <div className="relative p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Contenu textuel - 8 colonnes */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-6xl sm:text-7xl lg:text-8xl leading-none filter drop-shadow-sm">
                      🇳🇿
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="space-y-2">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                          New Zealand
                        </h1>
                        <p className="text-lg sm:text-xl text-muted-foreground font-light italic">
                          Aotearoa - Land of the Long White Cloud
                        </p>
                      </div>
                      
                      <div className="mt-4 prose prose-sm text-muted-foreground max-w-none">
                        <p className="leading-relaxed">
                          Discover a nation where <span className="font-medium text-foreground">work-life balance</span> isn't just a concept, but a way of life. 
                          Join <span className="font-medium text-foreground">15,000+ French expats</span> who've found their 
                          perfect blend of <span className="font-medium text-foreground">career growth</span> and <span className="font-medium text-foreground">natural beauty</span>.
                        </p>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs font-medium">
                          #1 Ease of Business
                        </Badge>
                        <Badge variant="secondary" className="text-xs font-medium">
                          #2 Most Peaceful
                        </Badge>
                        <Badge variant="secondary" className="text-xs font-medium">
                          #6 Quality of Life
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statistiques - 4 colonnes */}
                <div className="lg:col-span-4">
                  <Card className="bg-background/50 backdrop-blur-sm border border-border/50 shadow-sm">
                    <CardContent className="p-6">
                      <div className="text-center space-y-4">
                        <div>
                          <div className="text-4xl font-bold text-foreground mb-1">8.7</div>
                          <div className="text-sm font-medium text-foreground">Expat Rating</div>
                          <div className="text-xs text-muted-foreground">2,847 French reviews</div>
                        </div>
                        
                        <div className="flex justify-center">
                          <div className="flex space-x-1">
                            {[1,2,3,4,5].map(i => (
                              <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Work-Life Balance</span>
                            <span className="font-semibold text-foreground">92%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Career Growth</span>
                            <span className="font-semibold text-foreground">85%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Safety & Security</span>
                            <span className="font-semibold text-foreground">96%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Informations rapides */}
              <div className="mt-8 pt-6 border-t border-border/30">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
                  {[
                    { label: 'Capital', value: 'Wellington', icon: MapPin },
                    { label: 'Population', value: '5.1M', icon: Users },
                    { label: 'Language', value: 'English', icon: Globe },
                    { label: 'Currency', value: 'NZD', icon: DollarSign },
                    { label: 'Climate', value: 'Temperate', icon: Cloud },
                    { label: 'Time Zone', value: 'UTC+12', icon: Clock }
                  ].map((item, index) => (
                    <div key={index} className="text-center space-y-1">
                      <div className="flex items-center justify-center">
                        <item.icon className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <div className="font-medium text-foreground text-xs">{item.value}</div>
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-muted/30">
            <TabsTrigger value="overview" className="flex items-center text-xs">
              <BarChart3 className="h-3 w-3 mr-1" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="living" className="flex items-center text-xs">
              <Home className="h-3 w-3 mr-1" />
              Living
            </TabsTrigger>
            <TabsTrigger value="legal" className="flex items-center text-xs">
              <FileText className="h-3 w-3 mr-1" />
              Visa & Legal
            </TabsTrigger>
            <TabsTrigger value="opportunities" className="flex items-center text-xs">
              <Briefcase className="h-3 w-3 mr-1" />
              Jobs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Map and Economic Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map */}
              <Card className="lg:col-span-2 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    Major Cities & Regions
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Explore New Zealand's main urban centers and opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DynamicMap 
                    key="overview-map"
                    center={countryData.coordinates as [number, number]} 
                    zoom={6}
                    cities={[
                      { name: 'Auckland', coords: [-36.8485, 174.7633], population: '1.7M' },
                      { name: 'Wellington', coords: [-41.2865, 174.7762], population: '415k' },
                      { name: 'Christchurch', coords: [-43.5321, 172.6362], population: '380k' },
                      { name: 'Hamilton', coords: [-37.7870, 175.2793], population: '240k' }
                    ]}
                  />
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {[
                      { name: 'Auckland', desc: 'Economic hub, 34% of population', color: 'border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-800' },
                      { name: 'Wellington', desc: 'Capital, tech & government', color: 'border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800' },
                      { name: 'Christchurch', desc: 'Lower costs, growing tech', color: 'border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800' },
                      { name: 'Hamilton', desc: 'Agricultural center', color: 'border-purple-200 bg-purple-50 dark:bg-purple-950/20 dark:border-purple-800' }
                    ].map((city, index) => (
                      <div key={index} className={`p-3 rounded border-l-3 ${city.color}`}>
                        <div className="font-medium text-sm text-foreground">{city.name}</div>
                        <div className="text-xs text-muted-foreground">{city.desc}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Economic Stats */}
              <Card className="shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg">
                    <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
                    Economic Indicators
                  </CardTitle>
                  <CardDescription className="text-sm">Current economic snapshot</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {economicStats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 rounded border bg-muted/20 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <stat.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-sm text-foreground">{stat.title}</span>
                        </div>
                        <Badge variant={stat.trend === 'up' ? 'default' : stat.trend === 'down' ? 'secondary' : 'outline'} className="text-xs">
                          {stat.change}
                        </Badge>
                      </div>
                      <div className="text-xl font-bold text-foreground mb-1">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.description}</div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Tax Calculator & Comparison - Section refaite */}
<Card className="shadow-sm">
  <CardHeader className="pb-6">
    <CardTitle className="flex items-center text-xl">
      <Calculator className="h-5 w-5 mr-2 text-muted-foreground" />
      Tax Calculator & Comparison
    </CardTitle>
    <CardDescription className="text-base">
      Compare your tax burden: see how much you'll save or pay moving from your home country to New Zealand
    </CardDescription>
  </CardHeader>
  <CardContent className="px-8 pb-8">
    <TaxComparisonCalculator />
  </CardContent>
</Card>

            {/* Community Groups */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  Join the French Expat Community
                </CardTitle>
                <CardDescription className="text-sm">
                  Connect with other French expats living in New Zealand
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      name: "French in New Zealand",
                      platform: "Facebook",
                      members: "12,847",
                      type: "General Community",
                      logo: "🇫🇷",
                      description: "Main group for French expats",
                      activity: "Very Active"
                    },
                    {
                      name: "Auckland French Connection",
                      platform: "Facebook",
                      members: "3,245",
                      type: "City-specific",
                      logo: "🏙️",
                      description: "Auckland-based French community",
                      activity: "Active"
                    },
                    {
                      name: "French Professionals NZ",
                      platform: "LinkedIn",
                      members: "1,892",
                      type: "Professional",
                      logo: "💼",
                      description: "Career networking and opportunities",
                      activity: "Active"
                    },
                    {
                      name: "Français à Wellington",
                      platform: "Facebook",
                      members: "1,543",
                      type: "City-specific",
                      logo: "🏛️",
                      description: "Wellington French community",
                      activity: "Moderate"
                    },
                    {
                      name: "French Families NZ",
                      platform: "Facebook",
                      members: "2,156",
                      type: "Families",
                      logo: "👨‍👩‍👧‍👦",
                      description: "Support for French families",
                      activity: "Active"
                    },
                    {
                      name: "French Entrepreneurs NZ",
                      platform: "Telegram",
                      members: "687",
                      type: "Business",
                      logo: "🚀",
                      description: "Business networking and advice",
                      activity: "Growing"
                    }
                  ].map((group, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-md transition-all duration-200 border bg-card/50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-2xl">{group.logo}</div>
                            <Badge variant="outline" className="text-xs">{group.activity}</Badge>
                          </div>
                          <h3 className="font-medium text-sm mb-1 text-foreground">{group.name}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{group.description}</p>
                          <div className="flex items-center justify-between text-xs mb-3">
                            <span className="text-muted-foreground">{group.members} members</span>
                            <Badge variant="secondary" className="text-xs">{group.platform}</Badge>
                          </div>
                          <Button size="sm" className="w-full text-xs">Join Group</Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Video Resources */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <PlayCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                  Essential Video Guides
                </CardTitle>
                <CardDescription className="text-sm">
                  Learn from French expats who successfully moved to New Zealand
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Mon installation en Nouvelle-Zélande",
                      channel: "Julie en NZ",
                      thumbnail: "🎬",
                      duration: "24:32",
                      views: "156K",
                      category: "Personal Story",
                      description: "Complete journey from France to NZ residence"
                    },
                    {
                      title: "Trouver un travail en Nouvelle-Zélande",
                      channel: "Expat Success",
                      thumbnail: "💼",
                      duration: "18:45",
                      views: "89K",
                      category: "Career",
                      description: "Job hunting strategies and interview tips"
                    },
                    {
                      title: "Le coût de la vie à Auckland",
                      channel: "French in Auckland",
                      thumbnail: "💰",
                      duration: "15:23",
                      views: "124K",
                      category: "Living Costs",
                      description: "Detailed breakdown of monthly expenses"
                    },
                    {
                      title: "Ouvrir une entreprise en NZ",
                      channel: "Business NZ",
                      thumbnail: "🏢",
                      duration: "31:17",
                      views: "67K",
                      category: "Business",
                      description: "Complete guide to starting a business"
                    },
                    {
                      title: "Système de santé néo-zélandais",
                      channel: "Expat Health",
                      thumbnail: "🏥",
                      duration: "12:54",
                      views: "43K",
                      category: "Healthcare",
                      description: "Understanding public and private healthcare"
                    },
                    {
                      title: "Éducation et écoles en NZ",
                      channel: "Family Expat",
                      thumbnail: "🎓",
                      duration: "20:18",
                      views: "78K",
                      category: "Education",
                      description: "School system and university options"
                    }
                  ].map((video, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-md transition-all duration-200 cursor-pointer group border bg-card/50">
                        <CardContent className="p-4">
                          <div className="relative mb-3">
                            <div className="w-full h-24 bg-gradient-to-br from-muted/30 to-muted/50 rounded flex items-center justify-center text-2xl">
                              {video.thumbnail}
                            </div>
                            <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                              {video.duration}
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded flex items-center justify-center">
                              <PlayCircle className="h-8 w-8 text-foreground/0 group-hover:text-foreground/60 transition-colors" />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Badge variant="secondary" className="text-xs">{video.category}</Badge>
                              <span className="text-xs text-muted-foreground">{video.views} vues</span>
                            </div>
                            
                            <h3 className="font-medium text-sm line-clamp-2 text-foreground">{video.title}</h3>
                            <p className="text-xs text-muted-foreground">{video.channel}</p>
                            <p className="text-xs text-muted-foreground line-clamp-2">{video.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline" size="sm">
                    <PlayCircle className="h-3 w-3 mr-2" />
                    View All Video Resources
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Business & Investment */}
            <Card className="shadow-sm">
              <CardHeader>
<CardTitle className="flex items-center text-lg">
                 <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                 Business & Investment Climate
               </CardTitle>
               <CardDescription className="text-sm">
                 Why New Zealand is attractive for entrepreneurs and investors
               </CardDescription>
             </CardHeader>
             <CardContent>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="space-y-4">
                   <h4 className="font-medium flex items-center text-foreground">
                     <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
                     Business Advantages
                   </h4>
                   {[
                     {
                       title: "Ease of Doing Business",
                       value: "#1 globally",
                       description: "World Bank ranking for business environment",
                       icon: "🏆"
                     },
                     {
                       title: "Company Registration",
                       value: "1 day",
                       description: "Online company formation process",
                       icon: "⚡"
                     },
                     {
                       title: "Corporate Tax Rate",
                       value: "28%",
                       description: "Competitive rate for OECD countries",
                       icon: "💼"
                     },
                     {
                       title: "R&D Tax Credit",
                       value: "15%",
                       description: "Government incentive for innovation",
                       icon: "🔬"
                     }
                   ].map((item, index) => (
                     <div key={index} className="flex items-center space-x-4 p-3 bg-muted/20 rounded border">
                       <div className="text-xl">{item.icon}</div>
                       <div className="flex-1">
                         <div className="flex items-center justify-between mb-1">
                           <span className="font-medium text-sm text-foreground">{item.title}</span>
                           <Badge variant="outline" className="text-xs">{item.value}</Badge>
                         </div>
                         <p className="text-xs text-muted-foreground">{item.description}</p>
                       </div>
                     </div>
                   ))}
                 </div>
                 
                 <div className="space-y-4">
                   <h4 className="font-medium flex items-center text-foreground">
                     <Zap className="h-4 w-4 mr-2 text-muted-foreground" />
                     Growing Sectors
                   </h4>
                   {[
                     {
                       sector: "Technology",
                       growth: "+12%",
                       opportunity: "Fintech, AgriTech, HealthTech startups",
                       funding: "High"
                     },
                     {
                       sector: "Tourism",
                       growth: "+8%",
                       opportunity: "Sustainable and adventure tourism",
                       funding: "Medium"
                     },
                     {
                       sector: "AgriFood",
                       growth: "+15%",
                       opportunity: "Organic farming, food processing",
                       funding: "High"
                     },
                     {
                       sector: "Renewable Energy",
                       growth: "+20%",
                       opportunity: "Solar, wind, geothermal projects",
                       funding: "Very High"
                     }
                   ].map((item, index) => (
                     <div key={index} className="p-3 border rounded hover:bg-muted/20 transition-colors">
                       <div className="flex items-center justify-between mb-2">
                         <span className="font-medium text-foreground">{item.sector}</span>
                         <Badge variant="secondary" className="text-xs">{item.growth}</Badge>
                       </div>
                       <p className="text-sm text-muted-foreground mb-2">{item.opportunity}</p>
                       <div className="flex items-center justify-between">
                         <span className="text-xs text-muted-foreground">Funding availability:</span>
                         <Badge variant="outline" className="text-xs">{item.funding}</Badge>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
               
               <div className="mt-6 p-4 bg-muted/30 rounded border">
                 <h4 className="font-medium mb-3 flex items-center text-foreground">
                   <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                   Government Support Programs
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   {[
                     { name: "Callaghan Innovation", desc: "R&D grants and innovation support", color: "border-l-emerald-400" },
                     { name: "NZTE", desc: "Export development and trade support", color: "border-l-blue-400" },
                     { name: "Regional Development", desc: "Local business growth incentives", color: "border-l-purple-400" }
                   ].map((program, index) => (
                     <div key={index} className={`bg-background p-3 rounded border-l-3 ${program.color}`}>
                       <div className="font-medium text-sm text-foreground">{program.name}</div>
                       <div className="text-xs text-muted-foreground">{program.desc}</div>
                     </div>
                   ))}
                 </div>
               </div>
             </CardContent>
           </Card>

           {/* Quick Stats Comparison */}
           <Card className="shadow-sm">
             <CardHeader>
               <CardTitle className="flex items-center text-lg">
                 <BarChart3 className="h-4 w-4 mr-2 text-muted-foreground" />
                 New Zealand vs France - Key Comparisons
               </CardTitle>
             </CardHeader>
             <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                 {[
                   {
                     metric: "Population Density",
                     nz: "18/km²",
                     france: "119/km²",
                     better: "nz",
                     icon: "🏔️"
                   },
                   {
                     metric: "Working Hours",
                     nz: "40h/week",
                     france: "35h/week",
                     better: "france",
                     icon: "⏰"
                   },
                   {
                     metric: "Paid Leave",
                     nz: "4 weeks",
                     france: "5 weeks",
                     better: "france",
                     icon: "🏖️"
                   },
                   {
                     metric: "Global Peace Index",
                     nz: "#2",
                     france: "#34",
                     better: "nz",
                     icon: "🕊️"
                   }
                 ].map((item, index) => (
                   <div key={index} className="text-center p-4 border rounded bg-muted/10">
                     <div className="text-2xl mb-2">{item.icon}</div>
                     <div className="font-medium text-sm mb-3 text-foreground">{item.metric}</div>
                     <div className="space-y-2">
                       <div className={`p-2 rounded text-xs ${
                         item.better === 'nz' 
                           ? 'bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800' 
                           : 'bg-muted/50'
                       }`}>
                         <div className="text-muted-foreground">New Zealand</div>
                         <div className="font-bold text-foreground">{item.nz}</div>
                       </div>
                       <div className={`p-2 rounded text-xs ${
                         item.better === 'france' 
                           ? 'bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800' 
                           : 'bg-muted/50'
                       }`}>
                         <div className="text-muted-foreground">France</div>
                         <div className="font-bold text-foreground">{item.france}</div>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </CardContent>
           </Card>
         </TabsContent>

         <TabsContent value="legal" className="space-y-6">
           {/* Liste des visas */}
           <Card className="shadow-sm">
             <CardHeader>
               <CardTitle className="flex items-center text-lg">
                 <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                 Visa Options for French Citizens
               </CardTitle>
               <CardDescription className="text-sm">
                 All available pathways to enter and stay in New Zealand
               </CardDescription>
             </CardHeader>
             <CardContent>
               <div className="space-y-4">
                 {/* Working Holiday Visa */}
                 <Card className="hover:shadow-sm transition-all border bg-card/50">
                   <CardContent className="p-4">
                     <div className="flex items-center justify-between mb-4">
                       <div className="flex items-center space-x-3">
                         <div className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center">
                           <span className="text-lg">🎒</span>
                         </div>
                         <div>
                           <h3 className="font-medium text-foreground">Working Holiday Visa</h3>
                           <p className="text-sm text-muted-foreground">Work and travel for young French citizens</p>
                         </div>
                       </div>
                       <Badge variant="secondary" className="text-xs">Popular Choice</Badge>
                     </div>
                     
                     <div className="grid grid-cols-3 gap-4 mb-4">
                       {[
                         { label: "Duration", value: "12 months" },
                         { label: "Age", value: "18-30 years" },
                         { label: "Cost", value: "NZD $245" }
                       ].map((item, index) => (
                         <div key={index} className="text-center p-2 bg-muted/20 rounded">
                           <div className="font-medium text-xs text-foreground">{item.label}</div>
                           <div className="text-xs text-muted-foreground">{item.value}</div>
                         </div>
                       ))}
                     </div>

                     <div className="flex space-x-3">
                       <Button size="sm" variant="outline" className="flex-1 text-xs">
                         <ExternalLink className="h-3 w-3 mr-1" />
                         Official Application
                       </Button>
                       <Dialog>
                         <DialogTrigger asChild>
                           <Button size="sm" className="flex-1 text-xs">
                             <PlayCircle className="h-3 w-3 mr-1" />
                             Complete Guide
                           </Button>
                         </DialogTrigger>
                         <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                           <DialogHeader>
                             <DialogTitle>Working Holiday Visa - Complete Guide</DialogTitle>
                           </DialogHeader>
                           
                           <div className="space-y-6">
                             {/* Process Timeline */}
                             <div className="bg-muted/30 p-4 rounded border">
                               <h4 className="font-medium mb-4 flex items-center text-foreground">
                                 <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                 Application Timeline
                               </h4>
                               <div className="space-y-3">
                                 {[
                                   { step: "Check eligibility", time: "Day 1", detail: "Age, passport, funds verification" },
                                   { step: "Gather documents", time: "Week 1-2", detail: "Passport, bank statements, medical" },
                                   { step: "Submit online", time: "Day 1", detail: "Complete immigration form" },
                                   { step: "Medical exam", time: "Week 2-3", detail: "If required based on stay duration" },
                                   { step: "Decision", time: "Week 3-4", detail: "Email notification" },
                                   { step: "Travel to NZ", time: "Within 12 months", detail: "Visa valid for entry" }
                                 ].map((item, index) => (
                                   <div key={index} className="flex items-center space-x-4">
                                     <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                                       {index + 1}
                                     </div>
                                     <div className="flex-1">
                                       <div className="font-medium text-sm text-foreground">{item.step}</div>
                                       <div className="text-xs text-muted-foreground">{item.detail}</div>
                                     </div>
                                     <Badge variant="outline" className="text-xs">{item.time}</Badge>
                                   </div>
                                 ))}
                               </div>
                             </div>
                           </div>
                         </DialogContent>
                       </Dialog>
                     </div>
                   </CardContent>
                 </Card>

                 {/* Essential Skills Work Visa */}
                 <Card className="hover:shadow-sm transition-all border bg-card/50">
                   <CardContent className="p-4">
                     <div className="flex items-center justify-between mb-4">
                       <div className="flex items-center space-x-3">
                         <div className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center">
                           <span className="text-lg">💼</span>
                         </div>
                         <div>
                           <h3 className="font-medium text-foreground">Essential Skills Work Visa</h3>
                           <p className="text-sm text-muted-foreground">Work visa with confirmed job offer</p>
                         </div>
                       </div>
                       <Badge variant="outline" className="text-xs">Job Required</Badge>
                     </div>
                     
                     <div className="grid grid-cols-3 gap-4 mb-4">
                       {[
                         { label: "Duration", value: "Up to 5 years" },
                         { label: "Age", value: "No limit" },
                         { label: "Cost", value: "NZD $495" }
                       ].map((item, index) => (
                         <div key={index} className="text-center p-2 bg-muted/20 rounded">
                           <div className="font-medium text-xs text-foreground">{item.label}</div>
                           <div className="text-xs text-muted-foreground">{item.value}</div>
                         </div>
                       ))}
                     </div>

                     <div className="flex space-x-3">
                       <Button size="sm" variant="outline" className="flex-1 text-xs">
                         <ExternalLink className="h-3 w-3 mr-1" />
                         Official Application
                       </Button>
                       <Button size="sm" className="flex-1 text-xs">
                         <PlayCircle className="h-3 w-3 mr-1" />
                         Complete Guide
                       </Button>
                     </div>
                   </CardContent>
                 </Card>

                 {/* Additional visa types with similar styling */}
                 {[
                   {
                     title: "Skilled Migrant Category",
                     description: "Permanent residence for skilled professionals",
                     icon: "🏠",
                     badge: "Permanent",
                     duration: "Permanent",
                     age: "Under 55",
                     cost: "NZD $3,310"
                   },
                   {
                     title: "Work to Residence",
                     description: "Pathway from work visa to permanent residence",
                     icon: "🔄",
                     badge: "Pathway",
                     duration: "30 months",
                     age: "No limit",
                     cost: "NZD $495"
                   },
                   {
                     title: "Student Visa",
                     description: "Study with part-time work rights",
                     icon: "🎓",
                     badge: "Education",
                     duration: "Course length",
                     age: "No limit",
                     cost: "NZD $295"
                   },
                   {
                     title: "Visitor Visa",
                     description: "Tourism and short-term visits",
                     icon: "✈️",
                     badge: "Tourism",
                     duration: "Up to 9 months",
                     age: "No limit",
                     cost: "NZD $140"
                   }
                 ].map((visa, index) => (
                   <Card key={index} className="hover:shadow-sm transition-all border bg-card/50">
                     <CardContent className="p-4">
                       <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center space-x-3">
                           <div className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center">
                             <span className="text-lg">{visa.icon}</span>
                           </div>
                           <div>
                             <h3 className="font-medium text-foreground">{visa.title}</h3>
                             <p className="text-sm text-muted-foreground">{visa.description}</p>
                           </div>
                         </div>
                         <Badge variant="outline" className="text-xs">{visa.badge}</Badge>
                       </div>
                       
                       <div className="grid grid-cols-3 gap-4 mb-4">
                         {[
                           { label: "Duration", value: visa.duration },
                           { label: "Age", value: visa.age },
                           { label: "Cost", value: visa.cost }
                         ].map((item, idx) => (
                           <div key={idx} className="text-center p-2 bg-muted/20 rounded">
                             <div className="font-medium text-xs text-foreground">{item.label}</div>
                             <div className="text-xs text-muted-foreground">{item.value}</div>
                           </div>
                         ))}
                       </div>

                       <div className="flex space-x-3">
                         <Button size="sm" variant="outline" className="flex-1 text-xs">
                           <ExternalLink className="h-3 w-3 mr-1" />
                           Official Application
                         </Button>
                         <Button size="sm" className="flex-1 text-xs">
                           <PlayCircle className="h-3 w-3 mr-1" />
                           Complete Guide
                         </Button>
                       </div>
                     </CardContent>
                   </Card>
                 ))}
               </div>
             </CardContent>
           </Card>


         <TabsContent value="opportunities" className="space-y-6">
           {/* Job Search Resources */}
           <Card className="shadow-sm">
             <CardHeader>
               <CardTitle className="flex items-center text-lg">
                 <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                 Job Search Platforms
               </CardTitle>
               <CardDescription className="text-sm">
                 Best websites to find your next opportunity in New Zealand
               </CardDescription>
             </CardHeader>
             <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                 {jobPlatforms.map((platform, index) => (
                   <motion.div
                     key={index}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: index * 0.1 }}
                     className="group"
                   >
                     <Card className="h-full hover:shadow-md transition-all duration-200 cursor-pointer border bg-card/50">
                       <CardContent className="p-4 text-center">
                         <div className="text-3xl mb-3">{platform.logo}</div>
                         <h3 className="font-medium text-foreground mb-2">{platform.name}</h3>
                         <p className="text-sm text-muted-foreground mb-3">{platform.description}</p>
                         <div className="flex justify-center mb-3">
                           {'⭐'.repeat(platform.rating)}
                         </div>
                         <Badge variant="outline" className="mb-3 text-xs">{platform.specialty}</Badge>
                         <Button size="sm" variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-xs">
                           Visit {platform.name}
                         </Button>
                       </CardContent>
                     </Card>
                   </motion.div>
                 ))}
               </div>

               {/* Tips section */}
               <div>
                 <h3 className="font-medium text-foreground mb-4 text-center">💡 Expert Tips for Job Hunting Success</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                   {jobTips.map((tip, index) => (
                     <motion.div
                       key={index}
                       initial={{ opacity: 0, rotate: -2 }}
                       animate={{ opacity: 1, rotate: 0 }}
                       transition={{ delay: index * 0.1 }}
                       className="p-4 rounded border-2 border-dashed border-border/50 hover:border-border transition-colors bg-muted/20 hover:bg-muted/30"
                       style={{
                         transform: `rotate(${Math.random() * 4 - 2}deg)`,
                       }}
                     >
                       <div className="absolute top-2 right-2 text-lg">📌</div>
                       <h4 className="font-medium text-sm mb-2 pr-6 text-foreground">{tip.tip}</h4>
                       <p className="text-xs text-muted-foreground">{tip.detail}</p>
                     </motion.div>
                   ))}
                 </div>
               </div>
             </CardContent>
           </Card>

           {/* Work Perks */}
           <Card className="shadow-sm">
             <CardHeader>
               <CardTitle className="flex items-center text-lg">
                 <Star className="h-4 w-4 mr-2 text-muted-foreground" />
                 🥝 Unique New Zealand Work Benefits
               </CardTitle>
               <CardDescription className="text-sm">
                 Discover what makes working in New Zealand special
               </CardDescription>
             </CardHeader>
             <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {workPerks.map((perk, index) => (
                   <motion.div
                     key={index}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: index * 0.1 }}
                     className="relative"
                   >
                     <Card className="h-full hover:shadow-md transition-all duration-200 border bg-card/50">
                       <div className="absolute top-3 right-3">
                         <Badge variant="secondary" className="text-xs">{perk.highlight}</Badge>
                       </div>
                       <CardContent className="p-4">
                         <div className="text-2xl mb-3">{perk.icon}</div>
                         <h3 className="font-medium text-foreground mb-2">{perk.title}</h3>
                         <p className="text-sm text-muted-foreground mb-3">{perk.description}</p>
                         <div className="text-xs bg-muted/30 p-2 rounded">
                           💡 {perk.detail}
                         </div>
                       </CardContent>
                     </Card>
                   </motion.div>
                 ))}
               </div>
               
               <div className="mt-6 p-4 bg-muted/30 rounded border">
                 <h4 className="font-medium text-foreground mb-3 text-center">🌟 Why Kiwis Love Their Work Culture</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                   {[
                     { text: "Work-life balance: 40h weeks are the norm", icon: CheckCircle },
                     { text: "Flat hierarchy: Easy access to management", icon: CheckCircle },
                     { text: "Outdoor culture: Lunch breaks in nature", icon: CheckCircle },
                     { text: "Innovation focus: Ideas welcomed from all levels", icon: CheckCircle }
                   ].map((item, index) => (
                     <div key={index} className="flex items-center space-x-2">
                       <item.icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                       <span className="text-foreground">{item.text}</span>
                     </div>
                   ))}
                 </div>
               </div>
             </CardContent>
           </Card>
         </TabsContent>

         <TabsContent value="living" className="space-y-6">
           {/* Cost of Living */}
           <Card className="shadow-sm">
             <CardHeader>
               <CardTitle className="flex items-center text-lg">
                 <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                 Cost of Living Overview
               </CardTitle>
               <CardDescription className="text-sm">
                 Monthly expenses breakdown for different lifestyle choices
               </CardDescription>
             </CardHeader>
             <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[
                   {
                     type: "Budget",
                     total: "NZ$2,800",
                     description: "Shared accommodation, basic lifestyle",
                     items: [
                       { category: "Accommodation", amount: "NZ$800", desc: "Shared flat, outer suburbs" },
                       { category: "Food", amount: "NZ$400", desc: "Home cooking, local markets" },
                       { category: "Transport", amount: "NZ$200", desc: "Public transport" },
                       { category: "Utilities", amount: "NZ$150", desc: "Internet, phone, power share" },
                       { category: "Entertainment", amount: "NZ$300", desc: "Basic activities, some dining out" },
                       { category: "Miscellaneous", amount: "NZ$950", desc: "Clothing, personal care, savings" }
                     ]
                   },
                   {
                     type: "Comfortable",
                     total: "NZ$4,500",
                     description: "Own place, moderate lifestyle",
                     items: [
                       { category: "Accommodation", amount: "NZ$1,800", desc: "1-bedroom apartment, good area" },
                       { category: "Food", amount: "NZ$600", desc: "Mix of cooking and dining out" },
                       { category: "Transport", amount: "NZ$400", desc: "Car expenses or premium transport" },
                       { category: "Utilities", amount: "NZ$250", desc: "Full utilities, premium internet" },
                       { category: "Entertainment", amount: "NZ$500", desc: "Regular activities, travel" },
                       { category: "Miscellaneous", amount: "NZ$950", desc: "Shopping, healthcare, savings" }
                     ]
                   },
                   {
                     type: "Luxurious",
                     total: "NZ$7,000+",
                     description: "Premium housing, affluent lifestyle",
                     items: [
                       { category: "Accommodation", amount: "NZ$3,000", desc: "Premium apartment/house, prime location" },
                       { category: "Food", amount: "NZ$1,000", desc: "Fine dining, premium groceries" },
                       { category: "Transport", amount: "NZ$800", desc: "Premium car, rideshares, travel" },
                       { category: "Utilities", amount: "NZ$300", desc: "All utilities, premium services" },
                       { category: "Entertainment", amount: "NZ$1,000", desc: "Premium activities, frequent travel" },
                       { category: "Miscellaneous", amount: "NZ$900", desc: "Luxury goods, premium healthcare" }
                     ]
                   }
                 ].map((lifestyle, index) => (
                   <Card key={index} className="border bg-card/30 hover:bg-card/50 transition-colors">
                     <CardHeader className="pb-3">
                       <CardTitle className="text-lg text-foreground">{lifestyle.type}</CardTitle>
                       <div className="text-2xl font-bold text-foreground">{lifestyle.total}</div>
                       <CardDescription className="text-sm">{lifestyle.description}</CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-3">
                       {lifestyle.items.map((item, idx) => (
                         <div key={idx} className="flex justify-between items-start text-sm">
                           <div className="flex-1">
                             <div className="font-medium text-foreground">{item.category}</div>
                             <div className="text-xs text-muted-foreground">{item.desc}</div>
                           </div>
                           <div className="font-medium text-foreground text-right">{item.amount}</div>
                         </div>
                       ))}
                     </CardContent>
                   </Card>
                 ))}
               </div>
             </CardContent>
           </Card>

           {/* Currency Converter */}
           <Card className="shadow-sm">
             <CardHeader>
<CardTitle className="flex items-center text-lg">
                 <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                 Currency Converter
               </CardTitle>
               <CardDescription className="text-sm">
                 Real-time EUR to NZD conversion rates
               </CardDescription>
             </CardHeader>
             <CardContent>
               <CurrencyConverter />
             </CardContent>
           </Card>

           {/* Healthcare System */}
           <Card className="shadow-sm">
             <CardHeader>
               <CardTitle className="flex items-center text-lg">
                 <Heart className="h-4 w-4 mr-2 text-muted-foreground" />
                 Healthcare System
               </CardTitle>
               <CardDescription className="text-sm">
                 Understanding New Zealand's public and private healthcare
               </CardDescription>
             </CardHeader>
             <CardContent>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="space-y-4">
                   <h4 className="font-medium text-foreground">🏥 Public Healthcare (Free)</h4>
                   {[
                     { service: "Emergency treatment", cost: "Free", desc: "Accident & Emergency departments" },
                     { service: "GP visits", cost: "NZ$45-80", desc: "Subsidized for residents" },
                     { service: "Hospital care", cost: "Free", desc: "Public hospital treatment" },
                     { service: "Prescriptions", cost: "NZ$5", desc: "Subsidized medications" },
                     { service: "Specialist care", cost: "Free", desc: "With GP referral (waiting lists)" }
                   ].map((item, index) => (
                     <div key={index} className="flex justify-between items-start p-3 bg-muted/20 rounded border">
                       <div className="flex-1">
                         <div className="font-medium text-sm text-foreground">{item.service}</div>
                         <div className="text-xs text-muted-foreground">{item.desc}</div>
                       </div>
                       <Badge variant={item.cost === "Free" ? "secondary" : "outline"} className="text-xs">
                         {item.cost}
                       </Badge>
                     </div>
                   ))}
                 </div>
                 
                 <div className="space-y-4">
                   <h4 className="font-medium text-foreground">🏥 Private Healthcare</h4>
                   {[
                     { service: "Private insurance", cost: "NZ$100-300/month", desc: "Comprehensive coverage" },
                     { service: "Private GP", cost: "NZ$80-120", desc: "No waiting, choice of doctor" },
                     { service: "Specialist care", cost: "NZ$200-400", desc: "Direct access, faster appointments" },
                     { service: "Private hospital", cost: "NZ$300-500/day", desc: "Private room, shorter waits" },
                     { service: "Dental care", cost: "NZ$150-300", desc: "Not covered by public system" }
                   ].map((item, index) => (
                     <div key={index} className="flex justify-between items-start p-3 bg-muted/20 rounded border">
                       <div className="flex-1">
                         <div className="font-medium text-sm text-foreground">{item.service}</div>
                         <div className="text-xs text-muted-foreground">{item.desc}</div>
                       </div>
                       <Badge variant="outline" className="text-xs">{item.cost}</Badge>
                     </div>
                   ))}
                 </div>
               </div>
               
               <div className="mt-6 p-4 bg-muted/30 rounded border">
                 <h4 className="font-medium mb-3 text-foreground">🎯 Recommendations for French Expats</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                   {[
                     "Get private insurance for dental and faster specialist access",
                     "Register with a local GP as soon as you arrive",
                     "Keep your European Health Insurance Card for travel",
                     "Consider travel insurance for first few months"
                   ].map((tip, index) => (
                     <div key={index} className="flex items-start space-x-2">
                       <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                       <span className="text-foreground">{tip}</span>
                     </div>
                   ))}
                 </div>
               </div>
             </CardContent>
           </Card>

           {/* Climate & Weather */}
           <Card className="shadow-sm">
             <CardHeader>
               <CardTitle className="flex items-center text-lg">
                 <Cloud className="h-4 w-4 mr-2 text-muted-foreground" />
                 Climate & Weather
               </CardTitle>
               <CardDescription className="text-sm">
                 What to expect throughout the year
               </CardDescription>
             </CardHeader>
             <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                 {[
                   {
                     season: "Summer",
                     months: "Dec - Feb",
                     temp: "20-25°C",
                     icon: Sun,
                     desc: "Warm, dry weather. Peak tourist season.",
                     activities: ["Beach activities", "Hiking", "Festivals"]
                   },
                   {
                     season: "Autumn",
                     months: "Mar - May", 
                     temp: "15-20°C",
                     icon: Cloud,
                     desc: "Mild temperatures, beautiful colors.",
                     activities: ["Wine harvest", "Photography", "Cycling"]
                   },
                   {
                     season: "Winter",
                     months: "Jun - Aug",
                     temp: "5-15°C",
                     icon: CloudRain,
                     desc: "Cool and wet. Snow in mountains.",
                     activities: ["Skiing", "Hot springs", "Indoor culture"]
                   },
                   {
                     season: "Spring",
                     months: "Sep - Nov",
                     temp: "10-18°C",
                     icon: Wind,
                     desc: "Variable weather, blooming flowers.",
                     activities: ["Garden visits", "Bird watching", "Outdoor sports"]
                   }
                 ].map((season, index) => (
                   <Card key={index} className="border bg-card/30 hover:bg-card/50 transition-colors">
                     <CardContent className="p-4 text-center">
                       <season.icon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                       <h3 className="font-medium text-foreground mb-1">{season.season}</h3>
                       <p className="text-xs text-muted-foreground mb-2">{season.months}</p>
                       <div className="text-lg font-bold text-foreground mb-2">{season.temp}</div>
                       <p className="text-xs text-muted-foreground mb-3">{season.desc}</p>
                       <div className="space-y-1">
                         {season.activities.map((activity, idx) => (
                           <Badge key={idx} variant="outline" className="text-xs mr-1 mb-1">
                             {activity}
                           </Badge>
                         ))}
                       </div>
                     </CardContent>
                   </Card>
                 ))}
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="p-4 bg-muted/30 rounded border">
                   <h4 className="font-medium mb-3 text-foreground">🌡️ Regional Climate Differences</h4>
                   <div className="space-y-2 text-sm">
                     {[
                       { region: "North Island", climate: "Subtropical to temperate", desc: "Warmer, more humid" },
                       { region: "South Island", climate: "Temperate to alpine", desc: "Cooler, more varied" },
                       { region: "West Coast", climate: "High rainfall", desc: "Lush, green landscapes" },
                       { region: "East Coast", climate: "Drier conditions", desc: "More sunshine hours" }
                     ].map((item, index) => (
                       <div key={index} className="flex justify-between items-center p-2 bg-background/50 rounded">
                         <div>
                           <div className="font-medium text-foreground">{item.region}</div>
                           <div className="text-xs text-muted-foreground">{item.desc}</div>
                         </div>
                         <Badge variant="outline" className="text-xs">{item.climate}</Badge>
                       </div>
                     ))}
                   </div>
                 </div>

                 <div className="p-4 bg-muted/30 rounded border">
                   <h4 className="font-medium mb-3 text-foreground">👕 What to Pack</h4>
                   <div className="space-y-2 text-sm">
                     {[
                       { item: "Layered clothing", reason: "Weather changes quickly" },
                       { item: "Waterproof jacket", reason: "Frequent rain showers" },
                       { item: "Sunscreen & hat", reason: "Strong UV levels" },
                       { item: "Warm winter clothes", reason: "Houses often poorly insulated" }
                     ].map((item, index) => (
                       <div key={index} className="flex items-start space-x-2">
                         <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                         <div>
                           <div className="font-medium text-foreground">{item.item}</div>
                           <div className="text-xs text-muted-foreground">{item.reason}</div>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
             </CardContent>
           </Card>

           {/* Education System */}
           <Card className="shadow-sm">
             <CardHeader>
               <CardTitle className="flex items-center text-lg">
                 <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                 Education System
               </CardTitle>
               <CardDescription className="text-sm">
                 Schools and universities for expat families
               </CardDescription>
             </CardHeader>
             <CardContent>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="space-y-4">
                   <h4 className="font-medium text-foreground">🏫 School System</h4>
                   {[
                     { level: "Primary School", ages: "5-10 years", cost: "Free (public)", desc: "Years 1-6, basic subjects" },
                     { level: "Intermediate", ages: "11-12 years", cost: "Free (public)", desc: "Years 7-8, transition period" },
                     { level: "Secondary School", ages: "13-18 years", cost: "Free (public)", desc: "Years 9-13, NCEA qualifications" },
                     { level: "Private Schools", ages: "5-18 years", cost: "NZ$15,000-30,000/year", desc: "Smaller classes, special programs" }
                   ].map((item, index) => (
                     <div key={index} className="p-3 bg-muted/20 rounded border">
                       <div className="flex justify-between items-start mb-2">
                         <div className="font-medium text-sm text-foreground">{item.level}</div>
                         <Badge variant="outline" className="text-xs">{item.cost}</Badge>
                       </div>
                       <div className="text-xs text-muted-foreground mb-1">{item.ages}</div>
                       <div className="text-xs text-muted-foreground">{item.desc}</div>
                     </div>
                   ))}
                 </div>

                 <div className="space-y-4">
                   <h4 className="font-medium text-foreground">🎓 Universities</h4>
                   {[
                     { name: "University of Auckland", rank: "#85 worldwide", fees: "NZ$30,000-40,000/year" },
                     { name: "University of Otago", rank: "#194 worldwide", fees: "NZ$28,000-35,000/year" },
                     { name: "Victoria University", rank: "#236 worldwide", fees: "NZ$25,000-32,000/year" },
                     { name: "Canterbury University", rank: "#258 worldwide", fees: "NZ$24,000-30,000/year" }
                   ].map((uni, index) => (
                     <div key={index} className="p-3 bg-muted/20 rounded border">
                       <div className="font-medium text-sm text-foreground mb-1">{uni.name}</div>
                       <div className="flex justify-between items-center text-xs">
                         <Badge variant="secondary" className="text-xs">{uni.rank}</Badge>
                         <span className="text-muted-foreground">{uni.fees}</span>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>

               <div className="mt-6 p-4 bg-muted/30 rounded border">
                 <h4 className="font-medium mb-3 text-foreground">🎯 Tips for Expat Families</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                   {[
                     "Enroll children before arrival to secure spots",
                     "Consider school zones when choosing housing",
                     "International schools available in major cities",
                     "University education includes 3-year bachelor degrees"
                   ].map((tip, index) => (
                     <div key={index} className="flex items-start space-x-2">
                       <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                       <span className="text-foreground">{tip}</span>
                     </div>
                   ))}
                 </div>
               </div>
             </CardContent>
           </Card>
         </TabsContent>
       </Tabs>
     </div>
   </div>
 )
}