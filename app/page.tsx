'use client'

import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { ArrowRight, Search, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from '@/lib/hooks/useTranslations'

// Types
interface Country {
  id: string
  name: string
  code: string
  emoji: string
  hasSheet?: boolean
  continent: string
}



interface ApiCountriesResponse {
  countries: Country[]
}

interface FormData {
  currentCountry: string
  targetCountry: string
  action: string
  situation: string
}

type Situation = 'EMPLOYEE' | 'BUSINESS_FOUNDER' | 'FREELANCE' | 'INVESTOR'
type Action = 'EXPATRIATE' | 'CREATE_COMPANY' | 'INVEST'

const SITUATIONS: Situation[] = ['EMPLOYEE', 'BUSINESS_FOUNDER', 'FREELANCE', 'INVESTOR']
const ACTIONS: Action[] = ['EXPATRIATE', 'CREATE_COMPANY', 'INVEST']

const API_BASE_URL = 'https://expat-vision-backend-production.up.railway.app/api'

const useCountries = () => {
  const [allCountries, setAllCountries] = useState<Country[]>([])
  const [countriesWithSheets, setCountriesWithSheets] = useState<Country[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCountries = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const [allCountriesResponse, sheetsCountriesResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/countries`),
        fetch(`${API_BASE_URL}/countries/with-sheets`)
      ])

      if (!allCountriesResponse.ok || !sheetsCountriesResponse.ok) {
        throw new Error('Failed to fetch countries')
      }

      const [allCountriesData, sheetsCountriesData]: [ApiCountriesResponse, ApiCountriesResponse] = await Promise.all([
        allCountriesResponse.json(),
        sheetsCountriesResponse.json()
      ])

      const sortedAllCountries = allCountriesData.countries.sort((a, b) => a.name.localeCompare(b.name))
      const sortedSheetsCountries = sheetsCountriesData.countries.sort((a, b) => a.name.localeCompare(b.name))

      setAllCountries(sortedAllCountries)
      setCountriesWithSheets(sortedSheetsCountries)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching countries:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCountries()
  }, [fetchCountries])

  return { allCountries, countriesWithSheets, isLoading, error, refetch: fetchCountries }
}

const SearchableSelect = ({ value, onValueChange, options, placeholder, searchPlaceholder, selectId, isLoading = false, error = null }: any) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslations()

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options
    const lowercaseSearch = searchTerm.toLowerCase()
    return options.filter((option: { searchText: string }) => option.searchText.toLowerCase().includes(lowercaseSearch))
  }, [options, searchTerm])

  const selectedOption = options.find((option: any) => option.value === value)
  const displayText = selectedOption?.label || placeholder

  const handleValueChange = (newValue: string) => {
    onValueChange(newValue)
    setSearchTerm('')
    setIsOpen(false)
  }

  const closeDropdown = useCallback(() => {
    setIsOpen(false)
    setSearchTerm('')
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        closeDropdown()
      }
    }
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDropdown()
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, closeDropdown])

  if (isLoading) {
    return <div className="inline-flex items-center gap-2 p-2 text-2xl sm:text-4xl font-bold">
      <Loader2 className="h-6 w-6 animate-spin" />
      <span>{t.loading}</span>
    </div>
  }

  if (error) {
    return <div className="inline-flex items-center gap-2 p-2 text-2xl sm:text-4xl font-bold text-red-500">
      <span>{t.errorLoading}</span>
    </div>
  }

  return <div ref={selectRef}>
    <Select value={value || ''} onValueChange={handleValueChange}>
      <motion.div layout transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}>
        <SelectTrigger className="inline-flex w-auto h-auto p-2 border-0 border-b-4 border-foreground bg-transparent text-2xl sm:text-4xl font-bold rounded-none focus:ring-0 transition-all duration-300 whitespace-nowrap gap-2">
          <motion.span key={displayText} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} layout className="whitespace-nowrap">
            {displayText}
          </motion.span>
        </SelectTrigger>
      </motion.div>
      <SelectContent>
        <div className="p-2 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder={searchPlaceholder} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-8 pr-2 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-primary" onKeyDown={(e) => { e.stopPropagation(); if (e.key === 'Escape') setSearchTerm('') }} onClick={(e) => e.stopPropagation()} />
          </div>
        </div>
        <div className="max-h-48 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option: { value: string; label: string }) => (
  <SelectItem key={option.value} value={option.value}>
    {option.label}
  </SelectItem>
))

          ) : (
            <div className="p-2 text-sm text-muted-foreground text-center">
              {t.noResults}
            </div>
          )}
        </div>
      </SelectContent>
    </Select>
  </div>
}

export default function HomePage() {
  const router = useRouter()
  const { allCountries, countriesWithSheets, isLoading, error } = useCountries()
  const { t } = useTranslations()
  const [formData, setFormData] = useState<FormData>({ currentCountry: '', targetCountry: '', action: '', situation: '' })

  const currentCountryOptions = useMemo(() => allCountries.map(country => ({ value: country.id, label: `${country.emoji} ${country.name}`, searchText: `${country.name} ${country.continent}` })), [allCountries])
  const targetCountryOptions = useMemo(() => countriesWithSheets.filter(country => country.id !== formData.currentCountry).map(country => ({ value: country.id, label: `${country.emoji} ${country.name}`, searchText: `${country.name} ${country.continent}` })), [countriesWithSheets, formData.currentCountry])
  const actionOptions = useMemo(() => ACTIONS.map(value => ({ value, label: t[value], searchText: t[value] })), [t])
  const situationOptions = useMemo(() => SITUATIONS.map(value => ({ value, label: t[value], searchText: t[value] })), [t])

  const isFormComplete = useMemo(() => formData.currentCountry && formData.targetCountry && formData.action && formData.situation, [formData])

  const updateFormData = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (!isFormComplete) return
    const targetCountry = countriesWithSheets.find(country => country.id === formData.targetCountry)
    const targetCountryCode = targetCountry?.code?.toLowerCase() || 'unknown'
    router.push(`/country/${targetCountryCode}`)
  }

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100vh'
    return () => {
      document.documentElement.style.overflow = 'unset'
      document.body.style.overflow = 'unset'
      document.body.style.height = 'auto'
    }
  }, [])

  return (
    <div className="h-screen bg-background flex flex-col items-center justify-center px-4 sm:px-8 overflow-hidden">
      <motion.main className="max-w-none text-center w-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
        <div className="text-2xl sm:text-4xl font-bold tracking-tight leading-relaxed space-y-8 mb-16">
          <motion.div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <span className="whitespace-nowrap">{t.currentLocation}</span>
            <SearchableSelect value={formData.currentCountry} onValueChange={updateFormData('currentCountry')} options={currentCountryOptions} placeholder={t.select} searchPlaceholder={t.searchCountries} selectId="currentCountry" isLoading={isLoading} error={error} />
          </motion.div>
          <motion.div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
            <span className="whitespace-nowrap">{t.wantTo}</span>
            <SearchableSelect value={formData.action} onValueChange={updateFormData('action')} options={actionOptions} placeholder={t.select} searchPlaceholder={t.searchActions} selectId="action" />
            <span className="whitespace-nowrap">{t.to}</span>
            <SearchableSelect value={formData.targetCountry} onValueChange={updateFormData('targetCountry')} options={targetCountryOptions} placeholder={t.select} searchPlaceholder={t.searchCountries} selectId="targetCountry" />
          </motion.div>
          <motion.div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
            <span className="whitespace-nowrap">{t.asA}</span>
            <SearchableSelect value={formData.situation} onValueChange={updateFormData('situation')} options={situationOptions} placeholder={t.select} searchPlaceholder={t.searchSituations} selectId="situation" />
          </motion.div>
        </div>
        <div className="h-20 flex items-center justify-center">
          <AnimatePresence>
            {isFormComplete && (
              <motion.div initial={{ opacity: 0, y: 30, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 400, damping: 25, duration: 0.5 } }} exit={{ opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.2 } }} whileHover={{ scale: 1.05, transition: { duration: 0.2 } }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleSubmit} className="h-10 sm:h-16 px-5 sm:px-12 text-lg sm:text-xl font-semibold transition-all duration-300 hover:shadow-lg" size="lg">
                  <motion.span initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ duration: 0.2 }} className="flex items-center">
                    {t.getYourGuide}
                    <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                  </motion.span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.main>
    </div>
  )
}
