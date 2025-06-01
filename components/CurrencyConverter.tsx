// components/CurrencyConverter.tsx
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowRightLeft, TrendingUp, TrendingDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function CurrencyConverter() {
  const [eurAmount, setEurAmount] = useState('1000')
  const [nzdAmount, setNzdAmount] = useState('')
  const [exchangeRate, setExchangeRate] = useState(1.65)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState('')
  const [trend, setTrend] = useState<'up' | 'down' | 'stable'>('stable')

  useEffect(() => {
    fetchExchangeRate()
  }, [])

  const fetchExchangeRate = async () => {
    setIsLoading(true)
    try {
      // Remplacez YOUR_API_KEY par votre clé API de freecurrencyapi.com
      const response = await fetch(
        `https://api.freecurrencyapi.com/v1/latest?apikey=YOUR_API_KEY&currencies=NZD&base_currency=EUR`
      )
      const data = await response.json()
      
      if (data && data.data && data.data.NZD) {
        const newRate = data.data.NZD
        setTrend(newRate > exchangeRate ? 'up' : newRate < exchangeRate ? 'down' : 'stable')
        setExchangeRate(newRate)
        setLastUpdated(new Date().toLocaleString())
      }
    } catch (error) {
      console.error('Error fetching exchange rate:', error)
      // Fallback to mock data
      setExchangeRate(1.65)
      setLastUpdated(new Date().toLocaleString())
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (eurAmount && !isNaN(Number(eurAmount))) {
      setNzdAmount((Number(eurAmount) * exchangeRate).toFixed(2))
    }
  }, [eurAmount, exchangeRate])

  const handleEurChange = (value: string) => {
    setEurAmount(value)
    if (value && !isNaN(Number(value))) {
      setNzdAmount((Number(value) * exchangeRate).toFixed(2))
    } else {
      setNzdAmount('')
    }
  }

  const handleNzdChange = (value: string) => {
    setNzdAmount(value)
    if (value && !isNaN(Number(value))) {
      setEurAmount((Number(value) / exchangeRate).toFixed(2))
    } else {
      setEurAmount('')
    }
  }

  const commonAmounts = [100, 500, 1000, 2000, 5000, 10000]

  return (
    <div className="space-y-4">
      {/* Exchange Rate Display */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div>
          <div className="text-sm text-muted-foreground">Current Exchange Rate</div>
          <div className="text-2xl font-bold flex items-center space-x-2">
            <span>1 EUR = {exchangeRate} NZD</span>
            {trend === 'up' && <TrendingUp className="h-5 w-5 text-green-600" />}
            {trend === 'down' && <TrendingDown className="h-5 w-5 text-red-600" />}
          </div>
          {lastUpdated && (
            <div className="text-xs text-muted-foreground">Updated: {lastUpdated}</div>
          )}
        </div>
        <Button 
          onClick={fetchExchangeRate} 
          disabled={isLoading}
          size="sm"
          variant="outline"
        >
          {isLoading ? 'Updating...' : 'Refresh'}
        </Button>
      </div>

      {/* Converter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-sm text-muted-foreground mb-2">Euro (EUR)</div>
            <div className="text-3xl mb-2">🇪🇺</div>
            <Input
              type="number"
              placeholder="Enter amount"
              value={eurAmount}
              onChange={(e) => handleEurChange(e.target.value)}
              className="text-center text-lg font-semibold"
            />
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <ArrowRightLeft className="h-6 w-6 text-muted-foreground" />
        </div>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-sm text-muted-foreground mb-2">New Zealand Dollar (NZD)</div>
            <div className="text-3xl mb-2">🇳🇿</div>
            <Input
              type="number"
              placeholder="Converted amount"
              value={nzdAmount}
              onChange={(e) => handleNzdChange(e.target.value)}
              className="text-center text-lg font-semibold"
            />
          </CardContent>
        </Card>
      </div>

      {/* Quick Amounts */}
      <div>
        <div className="text-sm font-medium mb-2">Quick Convert</div>
        <div className="flex flex-wrap gap-2">
          {commonAmounts.map((amount) => (
            <Button
              key={amount}
              variant="outline"
              size="sm"
              onClick={() => handleEurChange(amount.toString())}
              className="text-xs"
            >
              €{amount.toLocaleString()} = NZ${(amount * exchangeRate).toLocaleString()}
            </Button>
          ))}
        </div>
      </div>

      {/* Rate Trend */}
      <div className="grid grid-cols-3 gap-4 text-center text-sm">
        <div className="p-3 bg-muted rounded">
          <div className="font-semibold">24h Change</div>
          <div className="text-green-600">+0.23%</div>
        </div>
        <div className="p-3 bg-muted rounded">
          <div className="font-semibold">7d Average</div>
          <div className="text-muted-foreground">1.647</div>
        </div>
        <div className="p-3 bg-muted rounded">
          <div className="font-semibold">30d High</div>
          <div className="text-blue-600">1.672</div>
        </div>
      </div>
    </div>
  )
}