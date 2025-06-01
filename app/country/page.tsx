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
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import CurrencyConverter from '@/components/CurrencyConverter'
import TaxCalculator from '@/components/TaxCalculator'

// Import dynamique pour éviter les erreurs SSR avec Leaflet
const DynamicMap = dynamic(() => import('@/components/CountryMap'), {
  ssr: false,
  loading: () => <div className="h-96 bg-muted animate-pulse rounded-lg"></div>
})

const TaxSimulator = dynamic(() => import('@/components/TaxSimulator'), {
  ssr: false
})

export default function NewZealandPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [visaModalOpen, setVisaModalOpen] = useState(false)
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
    timeZone: 'NZST (UTC+12)',
    workingHours: '40h/week',
    minWage: 'NZ$22.70/hour'
  }

  const economicStats = [
    {
      title: "GDP Growth",
      value: "2.8%",
      change: "+0.3%",
      trend: "up",
      description: "Annual growth rate",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Inflation Rate",
      value: "3.2%",
      change: "-1.1%",
      trend: "down",
      description: "Consumer price index",
      icon: Activity,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Unemployment",
      value: "3.4%",
      change: "-0.2%",
      trend: "down",
      description: "Labor force participation",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Interest Rate",
      value: "5.25%",
      change: "0%",
      trend: "stable",
      description: "Official cash rate",
      icon: Banknote,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
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
      color: "bg-yellow-100 border-yellow-300"
    },
    {
      tip: "Get local references fast",
      detail: "Kiwi employers prefer NZ-based references",
      color: "bg-blue-100 border-blue-300"
    },
    {
      tip: "Network at meetups",
      detail: "Join professional groups and attend events",
      color: "bg-green-100 border-green-300"
    },
    {
      tip: "Apply quickly",
      detail: "NZ employers hire fast, respond within 24h",
      color: "bg-purple-100 border-purple-300"
    },
    {
      tip: "Show cultural fit",
      detail: "Emphasize teamwork and work-life balance",
      color: "bg-pink-100 border-pink-300"
    },
    {
      tip: "Follow up professionally",
      detail: "A polite follow-up shows genuine interest",
      color: "bg-orange-100 border-orange-300"
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

     {/* Hero Section - Version alignée et raffinée */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="mb-8"
>
  <Card className="overflow-hidden border-none shadow-lg">
    {/* Image avec overlay */}
    <div 
      className="relative h-96 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80')`
      }}
    >
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            {/* Contenu principal - 2/3 de l'espace */}
            <div className="lg:col-span-2 text-white">
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-5xl">🇳🇿</span>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold leading-tight">New Zealand</h1>
                  <p className="text-lg text-blue-200">Aotearoa - Land of Opportunities</p>
                </div>
              </div>
              
              <p className="text-lg text-gray-200 mb-6 leading-relaxed max-w-2xl">
                Join 15,000+ French expats who've discovered exceptional quality of life, 
                career opportunities, and natural beauty in the world's most peaceful country.
              </p>

              <div className="flex flex-wrap gap-3">
                <Badge className="bg-emerald-600/90 text-white px-3 py-1 backdrop-blur-sm">
                  #1 Ease of Business
                </Badge>
                <Badge className="bg-blue-600/90 text-white px-3 py-1 backdrop-blur-sm">
                  #2 Most Peaceful
                </Badge>
                <Badge className="bg-purple-600/90 text-white px-3 py-1 backdrop-blur-sm">
                  #6 Quality of Life
                </Badge>
              </div>
            </div>

            {/* Score card - 1/3 de l'espace, aligné à droite */}
            <div className="lg:col-span-1 flex justify-center lg:justify-end">
              <Card className="bg-white/95 backdrop-blur-sm p-6 max-w-xs w-full">
                <div className="text-center">
                  <div className="text-5xl font-bold text-emerald-600 mb-2">8.7</div>
                  <div className="text-lg font-semibold text-gray-800 mb-1">Expat Rating</div>
                  <div className="text-sm text-gray-600 mb-4">2,847 French reviews</div>
                  
                  <div className="flex justify-center mb-4">
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Work-Life Balance</span>
                      <span className="font-semibold text-emerald-600">92%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Career Growth</span>
                      <span className="font-semibold text-emerald-600">85%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Safety & Security</span>
                      <span className="font-semibold text-emerald-600">96%</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Barre d'informations */}
    <div className="bg-white border-t">
      <div className="container mx-auto px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { label: 'Capital', value: 'Wellington', icon: MapPin },
            { label: 'Population', value: '5.1M people', icon: Users },
            { label: 'Language', value: 'English', icon: Globe },
            { label: 'Exchange Rate', value: `1 EUR = ${countryData.exchangeRate} NZD`, icon: DollarSign },
            { label: 'Time Difference', value: '+11h from France', icon: Clock }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <item.icon className="h-4 w-4 text-emerald-600 mr-2" />
                <span className="text-sm font-medium text-gray-600">{item.label}</span>
              </div>
              <p className="font-semibold text-gray-900 text-sm">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
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

  {/* Map and Economic Stats */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Map - Plus grande */}
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          Major Cities & Regions
        </CardTitle>
        <CardDescription>
          Explore New Zealand's main urban centers and their opportunities
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
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 bg-emerald-50 rounded border-l-4 border-emerald-400">
            <div className="font-semibold">🏙️ Auckland</div>
            <div className="text-muted-foreground">Economic hub, 34% of population</div>
          </div>
          <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
            <div className="font-semibold">🏛️ Wellington</div>
            <div className="text-muted-foreground">Capital, tech & government</div>
          </div>
          <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
            <div className="font-semibold">🌿 Christchurch</div>
            <div className="text-muted-foreground">Lower costs, growing tech</div>
          </div>
          <div className="p-3 bg-purple-50 rounded border-l-4 border-purple-400">
            <div className="font-semibold">🌊 Hamilton</div>
            <div className="text-muted-foreground">Agricultural center</div>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Economic Stats - Refait */}
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Key Economic Indicators
        </CardTitle>
        <CardDescription>Current economic snapshot</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {economicStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg ${stat.bgColor} border border-gray-200`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <span className="font-semibold text-sm">{stat.title}</span>
              </div>
              <Badge variant={stat.trend === 'up' ? 'default' : stat.trend === 'down' ? 'secondary' : 'outline'}>
                {stat.change}
              </Badge>
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.description}</div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  </div>

  {/* Tax Calculator */}
<Card>
  <CardHeader>
    <CardTitle className="flex items-center">
      <Calculator className="h-5 w-5 mr-2" />
      Tax Calculator & Comparison
    </CardTitle>
    <CardDescription>
      Understand exactly how much you'll pay in taxes and how it compares to your current situation
    </CardDescription>
  </CardHeader>
</Card>

  {/* Community Groups */}
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        <Users className="h-5 w-5 mr-2" />
        Join the French Expat Community
      </CardTitle>
      <CardDescription>
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
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-2xl">{group.logo}</div>
                  <Badge variant="outline" className="text-xs">{group.activity}</Badge>
                </div>
                <h3 className="font-semibold text-sm mb-1">{group.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{group.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{group.members} members</span>
                  <Badge variant="secondary">{group.platform}</Badge>
                </div>
                <div className="mt-3">
                  <Button size="sm" className="w-full">Join Group</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold mb-2 flex items-center">
          <Star className="h-4 w-4 mr-2 text-blue-600" />
          Community Benefits
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Local job opportunities shared daily</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Housing tips and roommate matching</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>French events and cultural activities</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>

  {/* Video Resources */}
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        <PlayCircle className="h-5 w-5 mr-2" />
        Essential Video Guides
      </CardTitle>
      <CardDescription>
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
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-4">
                <div className="relative mb-3">
                  <div className="w-full h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center text-4xl">
                    {video.thumbnail}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg flex items-center justify-center">
                    <PlayCircle className="h-12 w-12 text-white/0 group-hover:text-white/80 transition-colors" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">{video.category}</Badge>
                    <span className="text-xs text-muted-foreground">{video.views} vues</span>
                  </div>
                  
                  <h3 className="font-semibold text-sm line-clamp-2">{video.title}</h3>
                  <p className="text-xs text-muted-foreground">{video.channel}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{video.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Button variant="outline">
          <PlayCircle className="h-4 w-4 mr-2" />
          View All Video Resources
        </Button>
      </div>
    </CardContent>
  </Card>

  {/* Business & Investment Opportunities */}
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        <Building2 className="h-5 w-5 mr-2" />
        Business & Investment Climate
      </CardTitle>
      <CardDescription>
        Why New Zealand is attractive for entrepreneurs and investors
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
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
            <div key={index} className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
              <div className="text-2xl">{item.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{item.title}</span>
                  <Badge variant="outline">{item.value}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center">
            <Zap className="h-4 w-4 mr-2 text-blue-600" />
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
            <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{item.sector}</span>
                <Badge className="bg-green-100 text-green-800">{item.growth}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{item.opportunity}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Funding availability:</span>
                <Badge variant="secondary">{item.funding}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
        <h4 className="font-semibold mb-3 flex items-center">
          <Building2 className="h-4 w-4 mr-2 text-emerald-600" />
          Government Support Programs
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-3 rounded border-l-4 border-emerald-400">
            <div className="font-medium">Callaghan Innovation</div>
            <div className="text-muted-foreground">R&D grants and innovation support</div>
          </div>
          <div className="bg-white p-3 rounded border-l-4 border-blue-400">
            <div className="font-medium">NZTE</div>
            <div className="text-muted-foreground">Export development and trade support</div>
          </div>
          <div className="bg-white p-3 rounded border-l-4 border-purple-400">
            <div className="font-medium">Regional Development</div>
            <div className="text-muted-foreground">Local business growth incentives</div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>

  {/* Quick Stats Comparison */}
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        <BarChart3 className="h-5 w-5 mr-2" />
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
          <div key={index} className="text-center p-4 border rounded-lg">
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="font-semibold text-sm mb-3">{item.metric}</div>
            <div className="space-y-2">
              <div className={`p-2 rounded ${item.better === 'nz' ? 'bg-green-100' : 'bg-gray-100'}`}>
                <div className="text-xs text-muted-foreground">New Zealand</div>
                <div className="font-bold">{item.nz}</div>
              </div>
              <div className={`p-2 rounded ${item.better === 'france' ? 'bg-green-100' : 'bg-gray-100'}`}>
                <div className="text-xs text-muted-foreground">France</div>
                <div className="font-bold">{item.france}</div>
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
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        <FileText className="h-5 w-5 mr-2" />
        Visa Options for French Citizens
      </CardTitle>
      <CardDescription>
        All available pathways to enter and stay in New Zealand
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {/* Working Holiday Visa */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-xl">🎒</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Working Holiday Visa</h3>
                  <p className="text-sm text-muted-foreground">Work and travel for young French citizens</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Popular Choice</Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-semibold">Duration</div>
                <div className="text-muted-foreground">12 months</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-semibold">Age</div>
                <div className="text-muted-foreground">18-30 years</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-semibold">Cost</div>
                <div className="text-muted-foreground">NZD $245</div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button size="sm" variant="outline" className="flex-1">
                <ExternalLink className="h-4 w-4 mr-2" />
                Official Application
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="flex-1">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Complete Guide
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Working Holiday Visa - Complete Guide</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Process Timeline */}
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h4 className="font-semibold mb-4 flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-green-600" />
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
                            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{item.step}</div>
                              <div className="text-sm text-muted-foreground">{item.detail}</div>
                            </div>
                            <Badge variant="outline">{item.time}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Required Documents */}
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-semibold mb-4 flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-blue-600" />
                        Required Documents Checklist
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { doc: "Valid French passport", status: "required", note: "Valid for at least 3 months beyond departure" },
                          { doc: "Bank statements", status: "required", note: "NZD $4,200 minimum funds" },
                          { doc: "Return flight ticket", status: "required", note: "Or proof of funds to purchase" },
                          { doc: "Travel insurance", status: "recommended", note: "Medical coverage recommended" },
                          { doc: "Medical certificate", status: "conditional", note: "If staying >6 months" },
                          { doc: "Police certificate", status: "conditional", note: "If requested by immigration" }
                        ].map((item, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded border">
                            <CheckCircle className={`h-5 w-5 mt-0.5 ${
                              item.status === 'required' ? 'text-red-500' : 
                              item.status === 'recommended' ? 'text-yellow-500' : 'text-blue-500'
                            }`} />
                            <div>
                              <div className="font-medium text-sm">{item.doc}</div>
                              <div className="text-xs text-muted-foreground">{item.note}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pro Tips */}
                    <div className="bg-yellow-50 p-6 rounded-lg">
                      <h4 className="font-semibold mb-4 flex items-center">
                        <Star className="h-5 w-5 mr-2 text-yellow-600" />
                        Pro Tips from Successful Applicants
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          "Apply early morning NZ time for faster processing",
                          "Have all documents in English or officially translated",
                          "Open a NZ bank account online before arriving",
                          "Join Facebook groups for French WHV holders",
                          "Download offline maps and transport apps",
                          "Research IRD number application process"
                        ].map((tip, index) => (
                          <div key={index} className="flex items-start space-x-2 p-3 bg-white rounded border-l-4 border-yellow-400">
                            <span className="text-yellow-600 font-bold text-sm">💡</span>
                            <span className="text-sm">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Video Resources */}
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <h4 className="font-semibold mb-4 flex items-center">
                        <PlayCircle className="h-5 w-5 mr-2 text-purple-600" />
                        Helpful Video Guides
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { title: "WHV Application Step-by-Step", channel: "FrenchInNZ", duration: "15:32", views: "45K" },
                          { title: "First Week in New Zealand", channel: "BackpackerGuide", duration: "12:45", views: "32K" },
                          { title: "Finding Work on WHV", channel: "ExpatSuccess", duration: "18:20", views: "28K" },
                          { title: "Banking & IRD Setup", channel: "NZLife", duration: "10:15", views: "19K" }
                        ].map((video, index) => (
                          <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded border hover:shadow-sm cursor-pointer transition-shadow">
                            <div className="w-16 h-12 bg-red-100 rounded flex items-center justify-center">
                              <PlayCircle className="h-6 w-6 text-red-600" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{video.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {video.channel} • {video.duration} • {video.views} views
                              </div>
                            </div>
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
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-xl">💼</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Essential Skills Work Visa</h3>
                  <p className="text-sm text-muted-foreground">Work visa with confirmed job offer</p>
                </div>
              </div>
              <Badge className="bg-orange-100 text-orange-800">Job Required</Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-semibold">Duration</div>
                <div className="text-muted-foreground">Up to 5 years</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-semibold">Age</div>
                <div className="text-muted-foreground">No limit</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-semibold">Cost</div>
                <div className="text-muted-foreground">NZD $495</div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button size="sm" variant="outline" className="flex-1">
                <ExternalLink className="h-4 w-4 mr-2" />
                Official Application
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="flex-1">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Complete Guide
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Essential Skills Work Visa - Complete Guide</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Similar structure for work visa guide... */}
                    <div className="bg-orange-50 p-6 rounded-lg">
                      <h4 className="font-semibold mb-4">Application Process</h4>
                      <p className="text-sm text-muted-foreground">Detailed timeline and requirements for work visa applications...</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Skilled Migrant Category */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-xl">🏠</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Skilled Migrant Category</h3>
                  <p className="text-sm text-muted-foreground">Permanent residence for skilled professionals</p>
                </div>
              </div>
              <Badge className="bg-emerald-100 text-emerald-800">Permanent</Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-semibold">Duration</div>
                <div className="text-muted-foreground">Permanent</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-semibold">Age</div>
                <div className="text-muted-foreground">Under 55</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-semibold">Cost</div>
                <div className="text-muted-foreground">NZD $3,310</div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button size="sm" variant="outline" className="flex-1">
                <ExternalLink className="h-4 w-4 mr-2" />
                Official Application
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="flex-1">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Complete Guide
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Skilled Migrant Category - Complete Guide</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Points system, requirements, etc. */}
                    <div className="bg-emerald-50 p-6 rounded-lg">
                      <h4 className="font-semibold mb-4">Points System Overview</h4>
                      <p className="text-sm text-muted-foreground">How the points system works and strategies to maximize your score...</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Work to Residence */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                  <span className="text-xl">🔄</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Work to Residence</h3>
                  <p className="text-sm text-muted-foreground">Pathway from work visa to permanent residence</p>
                </div>
              </div>
              <Badge className="bg-teal-100 text-teal-800">Pathway</Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-semibold">Duration</div>
                <div className="text-muted-foreground">30 months</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-semibold">Age</div>
                <div className="text-muted-foreground">No limit</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-semibold">Cost</div>
                <div className="text-muted-foreground">NZD $495</div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button size="sm" variant="outline" className="flex-1">
                <ExternalLink className="h-4 w-4 mr-2" />
                Official Application
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="flex-1">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Complete Guide
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Work to Residence - Complete Guide</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Pathway details, requirements, timeline */}
                    <div className="bg-teal-50 p-6 rounded-lg">
                      <h4 className="font-semibold mb-4">Progression Timeline</h4>
                      <p className="text-sm text-muted-foreground">Step-by-step pathway from work visa to permanent residence...</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Student Visa */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-xl">🎓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Student Visa</h3>
                  <p className="text-sm text-muted-foreground">Study with part-time work rights</p>
                </div>
              </div>
              <Badge className="bg-purple-100 text-purple-800">Education</Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-semibold">Duration</div>
                <div className="text-muted-foreground">Course length</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-semibold">Age</div>
                <div className="text-muted-foreground">No limit</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-semibold">Cost</div>
                <div className="text-muted-foreground">NZD $295</div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button size="sm" variant="outline" className="flex-1">
                <ExternalLink className="h-4 w-4 mr-2" />
                Official Application
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="flex-1">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Complete Guide
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Student Visa - Complete Guide</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Education requirements, work rights, post-study options */}
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <h4 className="font-semibold mb-4">Study & Work Rights</h4>
                      <p className="text-sm text-muted-foreground">Understanding your rights to work while studying and post-graduation options...</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Visitor Visa */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xl">✈️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Visitor Visa</h3>
                  <p className="text-sm text-muted-foreground">Tourism and short-term visits</p>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Tourism</Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-semibold">Duration</div>
                <div className="text-muted-foreground">Up to 9 months</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-semibold">Age</div>
                <div className="text-muted-foreground">No limit</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-semibold">Cost</div>
                <div className="text-muted-foreground">NZD $140</div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button size="sm" variant="outline" className="flex-1">
                <ExternalLink className="h-4 w-4 mr-2" />
                Official Application
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="flex-1">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Complete Guide
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Visitor Visa - Complete Guide</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Tourism requirements, itinerary tips, extension options */}
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-semibold mb-4">Tourism Guidelines</h4>
                      <p className="text-sm text-muted-foreground">Making the most of your visit and understanding visa conditions...</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </CardContent>
  </Card>

  {/* Tax Calculator - unchanged */}



            {/* Tax Calculator - unchanged */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2" />
                  Tax Calculator
                </CardTitle>
                <CardDescription>
                  Calculate your estimated tax liability in New Zealand
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TaxSimulator />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            {/* Job Search Resources - Refait */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Job Search Platforms
                </CardTitle>
                <CardDescription>
                  Best websites to find your next opportunity in New Zealand
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {jobPlatforms.map((platform, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20">
                        <CardContent className="p-6 text-center">
                          <div className="text-4xl mb-3">{platform.logo}</div>
                          <h3 className="font-bold text-lg mb-2">{platform.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{platform.description}</p>
                          <div className="flex justify-center mb-3">
                            {'⭐'.repeat(platform.rating)}
                          </div>
                          <Badge variant="outline" className="mb-3">{platform.specialty}</Badge>
                          <Button size="sm" variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            Visit {platform.name}
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Tips en Post-it */}
                <div>
                  <h3 className="font-semibold text-lg mb-6 text-center">💡 Expert Tips for Job Hunting Success</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {jobTips.map((tip, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, rotate: -5 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border-2 border-dashed transform hover:scale-105 transition-transform ${tip.color} relative`}
                        style={{
                          transform: `rotate(${Math.random() * 6 - 3}deg)`,
                          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                      >
                        <div className="absolute top-2 right-2 text-2xl">📌</div>
                        <h4 className="font-bold text-sm mb-2 pr-8">{tip.tip}</h4>
                        <p className="text-xs text-gray-700">{tip.detail}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Work Perks - Refait */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  🥝 Unique New Zealand Work Benefits
                </CardTitle>
                <CardDescription>
                  Discover what makes working in New Zealand special
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {workPerks.map((perk, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <Card className="h-full hover:shadow-md transition-shadow duration-300 overflow-hidden">
                        <div className="absolute top-3 right-3">
                          <Badge variant="secondary" className="text-xs">{perk.highlight}</Badge>
                        </div>
                        <CardContent className="p-6">
                          <div className="text-3xl mb-3">{perk.icon}</div>
                          <h3 className="font-bold text-lg mb-2">{perk.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{perk.description}</p>
                          <div className="text-xs bg-muted p-2 rounded-lg">
                            💡 {perk.detail}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                  <h4 className="font-bold text-lg mb-3 text-center">🌟 Why Kiwis Love Their Work Culture</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span><strong>Work-life balance:</strong> 40h weeks are the norm</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span><strong>Flat hierarchy:</strong> Easy access to management</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span><strong>Outdoor culture:</strong> Lunch breaks in nature</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span><strong>Innovation focus:</strong> Ideas welcomed from all levels</span>
                    </div>
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