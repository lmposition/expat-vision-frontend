// components/layout/Header.tsx
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Menu, X, Globe, User, Settings, Bell, Search, 
  Moon, Sun, LogIn, UserPlus, Apple, Chrome, 
  Bookmark, ExternalLink, Loader2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from '@/lib/hooks/useTranslations'

interface Country {
  id: string
  name: string
  code: string
  emoji: string
  continent: string
}

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: 'info' | 'success' | 'warning'
}

export default function Header() {
  const { t, language, setLanguage } = useTranslations()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Country[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: t('header-newUpdate', 'Nouvelle mise à jour'),
      message: 'Les données fiscales de la Nouvelle-Zélande ont été mises à jour',
      time: '2h',
      read: false,
      type: 'info'
    },
    {
      id: '2', 
      title: t('header-documentAdded', 'Document ajouté'),
      message: 'Nouveau guide visa pour le Canada disponible',
      time: '1j',
      read: false,
      type: 'success'
    },
    {
      id: '3',
      title: t('header-reminder', 'Rappel'),
      message: 'Pensez à renouveler votre abonnement Premium',
      time: '3j',
      read: true,
      type: 'warning'
    }
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [savedResources, setSavedResources] = useState([
    { id: '1', title: 'Guide Visa Nouvelle-Zélande', type: 'guide', date: '2024-01-15' },
    { id: '2', title: 'Calculateur Fiscal', type: 'tool', date: '2024-01-10' },
    { id: '3', title: 'Communauté French in NZ', type: 'community', date: '2024-01-08' }
  ])

  const searchRef = useRef<HTMLDivElement>(null)
  const notificationRef = useRef<HTMLDivElement>(null)

  // Initialize dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newDarkMode = !prev
      
      if (newDarkMode) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
      
      return newDarkMode
    })
  }

  // Search countries
  const searchCountries = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch('https://expat-vision-backend-production.up.railway.app/api/countries/with-sheets')
      const data = await response.json()
      
      const filtered = data.countries.filter((country: Country) =>
        country.name.toLowerCase().includes(query.toLowerCase()) ||
        country.continent.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
      
      setSearchResults(filtered)
    } catch (error) {
      console.error('Error searching countries:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }, [])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      searchCountries(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery, searchCountries])

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const handleCountryClick = (country: Country) => {
    const countryCode = country.code.toLowerCase()
    window.location.href = `/country/${countryCode}`
    setShowSearch(false)
    setSearchQuery('')
  }

  return (
    <header className="sticky top-0 z-50 w-full header-soft border-b">
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-primary hover:bg-primary/90 transition-colors flex items-center justify-center shadow-sm">
              <Globe className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <span className="font-semibold text-lg text-foreground">Expat Vision</span>
              <Badge variant="secondary" className="ml-2 text-xs">
                Beta
              </Badge>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" size="sm" className="text-sm text-foreground hover:bg-accent">
            {t('header-dashboard', 'Dashboard')}
          </Button>
          <Button variant="ghost" size="sm" className="text-sm text-foreground hover:bg-accent">
            {t('header-countries', 'Countries')}
          </Button>
          <Button variant="ghost" size="sm" className="text-sm text-foreground hover:bg-accent">
            {t('header-tools', 'Tools')}
          </Button>
          <Button variant="ghost" size="sm" className="text-sm text-foreground hover:bg-accent">
            {t('header-resources', 'Resources')}
          </Button>
        </nav>

        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="relative" ref={searchRef}>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-foreground hover:bg-accent"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="h-4 w-4" />
            </Button>
            
            <AnimatePresence>
              {showSearch && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-80 card-paper border rounded-lg shadow-lg z-50"
                >
                  <div className="p-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={t('header-searchCountries', "Rechercher un pays...")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 input-paper"
                        autoFocus
                      />
                    </div>
                    
                    {isSearching && (
                      <div className="mt-4 text-center text-sm text-muted-foreground flex items-center justify-center">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        {t('header-searching', "Recherche en cours...")}
                      </div>
                    )}
                    
                    {searchResults.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {searchResults.map((country) => (
                          <div
                            key={country.id}
                            onClick={() => handleCountryClick(country)}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                          >
                            <span className="text-2xl">{country.emoji}</span>
                            <div>
                              <div className="font-medium text-foreground">{country.name}</div>
                              <div className="text-xs text-muted-foreground">{country.continent}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {searchQuery && !isSearching && searchResults.length === 0 && (
                      <div className="mt-4 text-center text-sm text-muted-foreground">
                        {t('header-noCountriesFound', "Aucun pays trouvé")}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 relative text-foreground hover:bg-accent"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center">
                  {unreadCount}
                </div>
              )}
            </Button>
            
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-80 card-paper border rounded-lg shadow-lg z-50"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">{t('header-notifications', "Notifications")}</h3>
                      {unreadCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-foreground hover:bg-accent">
                          {t('header-markAllRead', "Tout marquer lu")}
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => markAsRead(notification.id)}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                            notification.read 
                              ? 'bg-muted/30 border-border/30' 
                              : 'bg-card hover:bg-accent border-border shadow-sm'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              notification.type === 'success' ? 'bg-emerald-500' :
                              notification.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm text-foreground">{notification.title}</div>
                              <div className="text-xs text-muted-foreground mt-1 break-words">{notification.message}</div>
                              <div className="text-xs text-muted-foreground/70 mt-2">{notification.time}</div>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {notifications.length === 0 && (
                        <div className="text-center text-sm text-muted-foreground py-8">
                          {t('header-noNotifications', "Aucune notification")}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Settings */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-foreground hover:bg-accent">
                <Settings className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md card-paper border">
              <DialogHeader>
                <DialogTitle className="text-foreground">{t('header-settings', "Paramètres")}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3 text-foreground">{t('header-theme', "Thème")}</h4>
                  <div className="flex space-x-2">
                    <Button
                      variant={!isDarkMode ? "default" : "outline"}
                      size="sm"
                      onClick={toggleDarkMode}
                      className="flex-1"
                    >
                      <Sun className="h-4 w-4 mr-2" />
                      {t('header-lightMode', "Clair")}
                    </Button>
                    <Button
                      variant={isDarkMode ? "default" : "outline"}
                      size="sm"
                      onClick={toggleDarkMode}
                      className="flex-1"
                    >
                      <Moon className="h-4 w-4 mr-2" />
                      {t('header-darkMode', "Sombre")}
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3 text-foreground">{t('header-language', "Langue")}</h4>
                  <div className="flex space-x-2">
                    <Button
                      variant={language === 'fr' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLanguage('fr')}
                      className="flex-1"
                    >
                      🇫🇷 Français
                    </Button>
                    <Button
                      variant={language === 'en' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLanguage('en')}
                      className="flex-1"
                    >
                      🇺🇸 English
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Account */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="hidden md:flex text-foreground hover:bg-accent">
                <User className="h-4 w-4 mr-2" />
                {isLoggedIn ? t('header-account', 'Compte') : t('header-signIn', 'Se connecter')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md card-paper border">
              <DialogHeader>
                <DialogTitle className="text-foreground">
                  {isLoggedIn ? t('header-myAccount', 'Mon Compte') : t('header-signIn', 'Connexion')}
                </DialogTitle>
              </DialogHeader>
              
              {!isLoggedIn ? (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Button className="w-full btn-soft" onClick={() => setIsLoggedIn(true)}>
                      <LogIn className="h-4 w-4 mr-2" />
                      {t('header-signInWithEmail', "Se connecter avec email")}
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Chrome className="h-4 w-4 mr-2" />
                      {t('header-continueWithGoogle', "Continuer avec Google")}
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Apple className="h-4 w-4 mr-2" />
                      {t('header-continueWithApple', "Continuer avec Apple")}
                    </Button>
                  </div>
                  <div className="text-center">
                    <Button variant="ghost" size="sm">
                      <UserPlus className="h-4 w-4 mr-2" />
                      {t('header-createAccount', "Créer un compte")}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl font-bold mx-auto mb-3 shadow-sm">
                      JD
                    </div>
                    <h3 className="font-semibold text-foreground">Jean Dupont</h3>
                    <p className="text-sm text-muted-foreground">jean.dupont@email.com</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3 flex items-center text-foreground">
                      <Bookmark className="h-4 w-4 mr-2" />
                      {t('header-savedResources', "Ressources sauvegardées")}
                    </h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {savedResources.map((resource) => (
                        <div key={resource.id} className="flex items-center justify-between p-2 border rounded text-sm bg-card hover:bg-accent transition-colors">
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate text-foreground">{resource.title}</div>
                            <div className="text-xs text-muted-foreground">{resource.date}</div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      {savedResources.length === 0 && (
                        <div className="text-center text-sm text-muted-foreground py-4">
                          {t('header-noSavedResources', "Aucune ressource sauvegardée")}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full" onClick={() => setIsLoggedIn(false)}>
                    {t('header-signOut', "Se déconnecter")}
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden h-8 w-8 p-0 text-foreground hover:bg-accent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="md:hidden border-t bg-card backdrop-blur-xl overflow-hidden"
          >
            <div className="container py-4 space-y-2">
              <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-accent" size="sm">
                {t('header-dashboard', 'Dashboard')}
              </Button>
              <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-accent" size="sm">
                {t('header-countries', 'Countries')}
              </Button>
              <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-accent" size="sm">
                {t('header-tools', 'Tools')}
              </Button>
              <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-accent" size="sm">
                {t('header-resources', 'Resources')}
              </Button>
              <Button variant="outline" className="w-full justify-start text-foreground hover:bg-accent" size="sm">
                <User className="h-4 w-4 mr-2" />
                {isLoggedIn ? t('header-account', 'Compte') : t('header-signIn', 'Se connecter')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}