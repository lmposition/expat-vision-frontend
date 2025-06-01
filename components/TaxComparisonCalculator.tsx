// components/TaxComparisonCalculator.tsx
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight,
  Loader2,
  Info,
  RefreshCw,
  PiggyBank,
  AlertCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Country {
  code: string
  name: string
  flag: string
  currency: string
  exchangeRate: number
}

interface TaxResult {
  grossIncome: number
  taxAmount: number
  netIncome: number
  effectiveRate: number
  breakdown: Array<{
    type: string
    amount: number
    description: string
  }>
}

const countries: Country[] = [
  { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR', exchangeRate: 1.65 },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR', exchangeRate: 1.65 },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', exchangeRate: 1.95 },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', exchangeRate: 1.22 },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', exchangeRate: 1.08 },
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', exchangeRate: 1.58 },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', currency: 'CHF', exchangeRate: 1.75 },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', currency: 'EUR', exchangeRate: 1.65 },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', currency: 'EUR', exchangeRate: 1.65 },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', currency: 'EUR', exchangeRate: 1.65 },
]

export default function TaxComparisonCalculator() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [annualIncome, setAnnualIncome] = useState('')
  const [isCalculating, setIsCalculating] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [homeCountryTax, setHomeCountryTax] = useState<TaxResult | null>(null)
  const [newZealandTax, setNewZealandTax] = useState<TaxResult | null>(null)

  // Simulated calculation (replace with actual API call later)
  const calculateTaxes = async () => {
    if (!selectedCountry || !annualIncome) return

    setIsCalculating(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    const income = parseFloat(annualIncome)
    const incomeInNZD = income * selectedCountry.exchangeRate

    // Mock calculations (replace with real API calls)
    const mockHomeCountryTax: TaxResult = {
      grossIncome: income,
      taxAmount: income * 0.35, // 35% effective rate example
      netIncome: income * 0.65,
      effectiveRate: 35,
      breakdown: [
        { type: 'Income Tax', amount: income * 0.20, description: 'Progressive income tax' },
        { type: 'Social Security', amount: income * 0.15, description: 'Social contributions' }
      ]
    }

    const mockNewZealandTax: TaxResult = {
      grossIncome: incomeInNZD,
      taxAmount: incomeInNZD * 0.28, // 28% effective rate example
      netIncome: incomeInNZD * 0.72,
      effectiveRate: 28,
      breakdown: [
        { type: 'Income Tax', amount: incomeInNZD * 0.25, description: 'PAYE income tax' },
        { type: 'ACC Levy', amount: incomeInNZD * 0.03, description: 'Accident compensation' }
      ]
    }

    setHomeCountryTax(mockHomeCountryTax)
    setNewZealandTax(mockNewZealandTax)
    setIsCalculating(false)
    setShowResults(true)
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getSavings = () => {
    if (!homeCountryTax || !newZealandTax || !selectedCountry) return null
    
    const homeCountryTaxInNZD = homeCountryTax.taxAmount * selectedCountry.exchangeRate
    const difference = homeCountryTaxInNZD - newZealandTax.taxAmount
    const percentageDifference = ((homeCountryTax.effectiveRate - newZealandTax.effectiveRate)).toFixed(1)
    
    return {
      amount: Math.abs(difference),
      percentage: Math.abs(parseFloat(percentageDifference)),
      isSaving: difference > 0,
      monthlyAmount: Math.abs(difference) / 12
    }
  }

  const resetCalculator = () => {
    setShowResults(false)
    setAnnualIncome('')
    setSelectedCountry(null)
    setHomeCountryTax(null)
    setNewZealandTax(null)
  }

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Country Selection */}
        <Card className="border bg-card/30 hover:bg-card/50 transition-colors">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-muted-foreground" />
              Your Current Country
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedCountry?.code} onValueChange={(value) => {
              const country = countries.find(c => c.code === value)
              setSelectedCountry(country || null)
              setShowResults(false)
            }}>
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Select your home country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{country.flag}</span>
                      <span>{country.name}</span>
                      <Badge variant="outline" className="text-xs">{country.currency}</Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedCountry && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-muted/30 rounded border"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Exchange Rate:</span>
                  <span className="font-medium">1 {selectedCountry.currency} = {selectedCountry.exchangeRate} NZD</span>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Income Input */}
        <Card className="border bg-card/30 hover:bg-card/50 transition-colors">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center">
              <Calculator className="h-5 w-5 mr-2 text-muted-foreground" />
              Your Annual Income
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg font-medium text-muted-foreground">
                {selectedCountry?.currency || '€'}
              </span>
              <input
                type="number"
                value={annualIncome}
                onChange={(e) => {
                  setAnnualIncome(e.target.value)
                  setShowResults(false)
                }}
                placeholder="50000"
                className="w-full h-12 pl-12 pr-4 text-lg font-semibold border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-primary"
                disabled={!selectedCountry}
              />
            </div>
            
            {selectedCountry && annualIncome && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-muted/30 rounded border"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Equivalent in NZD:</span>
                  <span className="font-medium text-lg">
                    {formatCurrency(parseFloat(annualIncome) * selectedCountry.exchangeRate, 'NZD')}
                  </span>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Calculate Button */}
      <div className="text-center">
        <AnimatePresence>
          {selectedCountry && annualIncome && !showResults && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Button 
                onClick={calculateTaxes}
                disabled={isCalculating}
                className="h-14 px-12 text-lg font-semibold"
                size="lg"
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Calculating taxes...
                  </>
                ) : (
                  <>
                    <Calculator className="h-5 w-5 mr-2" />
                    Compare Tax Burden
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Section */}
      <AnimatePresence>
        {showResults && homeCountryTax && newZealandTax && selectedCountry && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Summary Card */}
            <Card className="border-2 bg-gradient-to-br from-card to-muted/20">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center space-x-4">
                    <h3 className="text-2xl font-bold text-foreground">Tax Comparison Results</h3>
                    <Button variant="ghost" size="sm" onClick={resetCalculator}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                  
                  {getSavings() && (
                    <div className="max-w-2xl mx-auto">
                      <div className={`p-6 rounded-lg border-2 ${
                        getSavings()!.isSaving 
                          ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800' 
                          : 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800'
                      }`}>
                        <div className="flex items-center justify-center space-x-3 mb-4">
                          {getSavings()!.isSaving ? (
                            <PiggyBank className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <AlertCircle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                          )}
                          <div className="text-3xl font-bold">
                            {getSavings()!.isSaving ? (
                              <span className="text-emerald-600 dark:text-emerald-400">
                                Save {formatCurrency(getSavings()!.amount, 'NZD')}
                              </span>
                            ) : (
                              <span className="text-orange-600 dark:text-orange-400">
                                Pay {formatCurrency(getSavings()!.amount, 'NZD')} more
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-lg text-muted-foreground mb-2">
                          {getSavings()!.isSaving ? 'You could save' : 'You would pay'} approximately{' '}
                          <span className="font-semibold">
                            {formatCurrency(getSavings()!.monthlyAmount, 'NZD')}
                          </span>{' '}
                          per month compared to {selectedCountry.name}
                        </div>
                        
                        <Badge variant="outline" className="text-base px-4 py-2">
                          {getSavings()!.percentage}% {getSavings()!.isSaving ? 'lower' : 'higher'} effective tax rate
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Home Country */}
              <Card className="border bg-card/50">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg">
                    <span className="text-2xl mr-3">{selectedCountry.flag}</span>
                    {selectedCountry.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Gross Income</span>
                      <span className="font-semibold text-lg">
                        {formatCurrency(homeCountryTax.grossIncome, selectedCountry.currency)}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      {homeCountryTax.breakdown.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{item.type}</span>
                          <span className="font-medium text-red-600 dark:text-red-400">
                            -{formatCurrency(item.amount, selectedCountry.currency)}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Total Tax</span>
                        <span className="font-bold text-red-600 dark:text-red-400">
                          -{formatCurrency(homeCountryTax.taxAmount, selectedCountry.currency)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Net Income</span>
                        <span className="font-bold text-green-600 dark:text-green-400 text-lg">
                          {formatCurrency(homeCountryTax.netIncome, selectedCountry.currency)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-3 rounded">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Effective Tax Rate</span>
                        <span className="font-bold">{homeCountryTax.effectiveRate}%</span>
                      </div>
                      <Progress value={homeCountryTax.effectiveRate} className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* New Zealand */}
              <Card className="border bg-card/50">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg">
                    <span className="text-2xl mr-3">🇳🇿</span>
                    New Zealand
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Gross Income</span>
                      <span className="font-semibold text-lg">
                        {formatCurrency(newZealandTax.grossIncome, 'NZD')}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      {newZealandTax.breakdown.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{item.type}</span>
                          <span className="font-medium text-red-600 dark:text-red-400">
                            -{formatCurrency(item.amount, 'NZD')}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Total Tax</span>
                        <span className="font-bold text-red-600 dark:text-red-400">
                          -{formatCurrency(newZealandTax.taxAmount, 'NZD')}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Net Income</span>
                        <span className="font-bold text-green-600 dark:text-green-400 text-lg">
                          {formatCurrency(newZealandTax.netIncome, 'NZD')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-3 rounded">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Effective Tax Rate</span>
                        <span className="font-bold">{newZealandTax.effectiveRate}%</span>
                      </div>
                      <Progress value={newZealandTax.effectiveRate} className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Info */}
            <Card className="border bg-muted/20">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Note:</strong> These calculations are estimates based on standard tax rates and don't include 
                      all possible deductions, credits, or specific personal circumstances.
                    </p>
                    <p>
                      For precise calculations, consult with a tax professional or use official government tax calculators.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}