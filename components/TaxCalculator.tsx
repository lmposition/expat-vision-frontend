// components/TaxCalculator.tsx
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calculator, DollarSign, TrendingUp, TrendingDown, Info, Users, Briefcase, Building2 } from 'lucide-react'

type WorkerType = 'employee' | 'freelance' | 'business-owner'

interface TaxResult {
  grossEUR: number
  grossNZD: number
  taxNZD: number
  netNZD: number
  netEUR: number
  effectiveRate: number
  breakdown: Array<{
    bracket: string
    rate: number
    taxAmount: number
  }>
  additionalCosts?: {
    accLevy: number
    kiwiSaver?: number
    gst?: number
  }
}

export default function TaxCalculator() {
  const [annualSalaryEUR, setAnnualSalaryEUR] = useState('45000')
  const [workerType, setWorkerType] = useState<WorkerType>('employee')
  const [kiwiSaverRate, setKiwiSaverRate] = useState(3)
  const [exchangeRate] = useState(1.65) // EUR to NZD

  // Tranches d'imposition NZ 2024
  const nzTaxBrackets = [
    { min: 0, max: 14000, rate: 10.5, label: 'Low income' },
    { min: 14001, max: 48000, rate: 17.5, label: 'Middle income' },
    { min: 48001, max: 70000, rate: 30, label: 'Upper middle' },
    { min: 70001, max: 180000, rate: 33, label: 'High income' },
    { min: 180001, max: null, rate: 39, label: 'Top earners' }
  ]

  // Tranches françaises pour comparaison
  const frenchTaxBrackets = [
    { min: 0, max: 10777, rate: 0, label: 'Exonéré' },
    { min: 10778, max: 27478, rate: 11, label: 'Tranche 1' },
    { min: 27479, max: 78570, rate: 30, label: 'Tranche 2' },
    { min: 78571, max: 168994, rate: 41, label: 'Tranche 3' },
    { min: 168995, max: null, rate: 45, label: 'Tranche 4' }
  ]

  const calculateNZTax = (salaryNZD: number, type: WorkerType): TaxResult => {
    let totalTax = 0
    const breakdown: Array<{bracket: string, rate: number, taxAmount: number}> = []

    // Calcul par tranches
    for (const bracket of nzTaxBrackets) {
      if (salaryNZD > bracket.min) {
        const bracketMax = bracket.max || salaryNZD
        const taxableInBracket = Math.min(salaryNZD, bracketMax) - bracket.min
        const taxOnBracket = taxableInBracket * (bracket.rate / 100)
        
        if (taxableInBracket > 0) {
          totalTax += taxOnBracket
          breakdown.push({
            bracket: bracket.label,
            rate: bracket.rate,
            taxAmount: taxOnBracket
          })
        }
      }
    }

    // Coûts additionnels selon le statut
    const additionalCosts = {
      accLevy: salaryNZD * 0.0145, // ACC levy obligatoire
      kiwiSaver: type === 'employee' ? salaryNZD * (kiwiSaverRate / 100) : 0,
      gst: type === 'business-owner' ? salaryNZD * 0.15 : 0 // Estimation GST pour business
    }

    let totalDeductions = totalTax + additionalCosts.accLevy
    
    if (type === 'employee') {
      totalDeductions += additionalCosts.kiwiSaver || 0
    }
    
    if (type === 'business-owner') {
      totalDeductions += additionalCosts.gst || 0
    }

    const netNZD = salaryNZD - totalDeductions
    const effectiveRate = (totalDeductions / salaryNZD) * 100

    return {
      grossEUR: Number(annualSalaryEUR),
      grossNZD: salaryNZD,
      taxNZD: totalTax,
      netNZD,
      netEUR: netNZD / exchangeRate,
      effectiveRate,
      breakdown,
      additionalCosts
    }
  }

  const calculateFrenchTax = (salaryEUR: number): TaxResult => {
    let totalTax = 0
    const breakdown: Array<{bracket: string, rate: number, taxAmount: number}> = []

    // Calcul par tranches
    for (const bracket of frenchTaxBrackets) {
      if (salaryEUR > bracket.min) {
        const bracketMax = bracket.max || salaryEUR
        const taxableInBracket = Math.min(salaryEUR, bracketMax) - bracket.min
        const taxOnBracket = taxableInBracket * (bracket.rate / 100)
        
        if (taxableInBracket > 0) {
          totalTax += taxOnBracket
          breakdown.push({
            bracket: bracket.label,
            rate: bracket.rate,
            taxAmount: taxOnBracket
          })
        }
      }
    }

    // Charges sociales (estimation employé)
    const socialContributions = salaryEUR * 0.22 // ~22% charges salariales
    const csgCrds = salaryEUR * 0.097 // CSG/CRDS

    const totalDeductions = totalTax + socialContributions + csgCrds
    const netEUR = salaryEUR - totalDeductions
    const effectiveRate = (totalDeductions / salaryEUR) * 100

    return {
      grossEUR: salaryEUR,
      grossNZD: salaryEUR * exchangeRate,
      taxNZD: totalTax,
      netNZD: netEUR * exchangeRate,
      netEUR,
      effectiveRate,
      breakdown
    }
  }

  const salaryNZD = Number(annualSalaryEUR) * exchangeRate
  const nzResult = calculateNZTax(salaryNZD, workerType)
  const frenchResult = calculateFrenchTax(Number(annualSalaryEUR))

  const formatEUR = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatNZD = (amount: number) => {
    return new Intl.NumberFormat('en-NZ', {
      style: 'currency',
      currency: 'NZD',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const workerTypes = [
    {
      id: 'employee' as WorkerType,
      label: 'Employé (Salarié)',
      icon: Users,
      description: 'Contrat de travail classique avec un employeur',
      benefits: ['KiwiSaver', 'Congés payés', 'Protection sociale']
    },
    {
      id: 'freelance' as WorkerType,
      label: 'Freelance (Contractor)',
      icon: Briefcase,
      description: 'Travailleur indépendant, facturant ses services',
      benefits: ['Flexibilité', 'Déductions business', 'Taux horaires plus élevés']
    },
    {
      id: 'business-owner' as WorkerType,
      label: 'Chef d\'entreprise',
      icon: Building2,
      description: 'Propriétaire d\'une société néo-zélandaise',
      benefits: ['Déductions d\'entreprise', 'Contrôle total', 'Potentiel de croissance']
    }
  ]

  return (
    <div className="space-y-6">
      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="h-5 w-5 mr-2" />
            Calculateur Fiscal France → Nouvelle-Zélande
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Découvrez combien vous gagnerez réellement en NZ selon votre statut professionnel
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Revenus actuels */}
          <div>
            <label className="text-sm font-medium mb-2 block">💰 Votre salaire brut annuel actuel en France</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-sm font-medium">€</span>
              <input
                type="number"
                value={annualSalaryEUR}
                onChange={(e) => setAnnualSalaryEUR(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border rounded-lg text-lg font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="45000"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Équivalent: <span className="font-semibold">{formatNZD(salaryNZD)}</span> en Nouvelle-Zélande (taux: 1 EUR = {exchangeRate} NZD)
            </p>
          </div>

          {/* Statut professionnel */}
          <div>
            <label className="text-sm font-medium mb-3 block">🏢 Votre statut professionnel envisagé en NZ</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {workerTypes.map((type) => (
                <Card 
                  key={type.id}
                  className={`cursor-pointer transition-all ${
                    workerType === type.id 
                      ? 'border-2 border-blue-500 bg-blue-50' 
                      : 'border hover:border-gray-300'
                  }`}
                  onClick={() => setWorkerType(type.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <type.icon className={`h-5 w-5 ${workerType === type.id ? 'text-blue-600' : 'text-gray-600'}`} />
                      <span className="font-semibold text-sm">{type.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{type.description}</p>
                    <div className="space-y-1">
                      {type.benefits.map((benefit, index) => (
                        <div key={index} className="text-xs text-green-600">✓ {benefit}</div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* KiwiSaver si employé */}
          {workerType === 'employee' && (
            <div>
              <label className="text-sm font-medium mb-2 block">🏦 Taux de cotisation KiwiSaver (optionnel)</label>
              <div className="flex space-x-2">
                {[3, 4, 6, 8, 10].map((rate) => (
                  <Button
                    key={rate}
                    variant={kiwiSaverRate === rate ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setKiwiSaverRate(rate)}
                  >
                    {rate}%
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                L'employeur contribue également à hauteur de 3% minimum
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comparaison des résultats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* France */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>🇫🇷 En France (actuel)</span>
              <Badge className="bg-blue-100 text-blue-800">
                {frenchResult.effectiveRate.toFixed(1)}% de prélèvements
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Salaire brut</span>
                <span className="font-semibold">{formatEUR(frenchResult.grossEUR)}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span className="text-sm">Impôt sur le revenu</span>
                <span className="font-semibold">-{formatEUR(frenchResult.breakdown.reduce((sum, b) => sum + b.taxAmount, 0))}</span>
              </div>
              <div className="flex justify-between text-orange-600">
                <span className="text-sm">Charges sociales (~22%)</span>
                <span className="font-semibold">-{formatEUR(frenchResult.grossEUR * 0.22)}</span>
              </div>
              <div className="flex justify-between text-orange-600">
                <span className="text-sm">CSG/CRDS (~9.7%)</span>
                <span className="font-semibold">-{formatEUR(frenchResult.grossEUR * 0.097)}</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-bold text-green-600">
                <span>Net mensuel</span>
                <span>{formatEUR(frenchResult.netEUR / 12)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Tranches d'imposition</div>
              {frenchResult.breakdown.map((bracket, index) => (
                <div key={index} className="flex justify-between text-xs bg-gray-50 p-2 rounded">
                  <span>{bracket.bracket} ({bracket.rate}%)</span>
                  <span className="font-medium">{formatEUR(bracket.taxAmount)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nouvelle-Zélande */}
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>🇳🇿 En Nouvelle-Zélande</span>
              <Badge className="bg-emerald-100 text-emerald-800">
                {nzResult.effectiveRate.toFixed(1)}% de prélèvements
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Salaire brut</span>
                <span className="font-semibold">{formatNZD(nzResult.grossNZD)}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span className="text-sm">Impôt sur le revenu</span>
                <span className="font-semibold">-{formatNZD(nzResult.taxNZD)}</span>
              </div>
              <div className="flex justify-between text-orange-600">
                <span className="text-sm">ACC Levy (1.45%)</span>
                <span className="font-semibold">-{formatNZD(nzResult.additionalCosts?.accLevy || 0)}</span>
              </div>
              {workerType === 'employee' && nzResult.additionalCosts?.kiwiSaver && (
                <div className="flex justify-between text-blue-600">
                  <span className="text-sm">KiwiSaver ({kiwiSaverRate}%)</span>
                  <span className="font-semibold">-{formatNZD(nzResult.additionalCosts.kiwiSaver)}</span>
                </div>
              )}
              {workerType === 'business-owner' && (
                <div className="flex justify-between text-purple-600">
                  <span className="text-sm">GST (estimation 15%)</span>
                  <span className="font-semibold">-{formatNZD(nzResult.additionalCosts?.gst || 0)}</span>
                </div>
              )}
              <hr />
              <div className="flex justify-between text-lg font-bold text-green-600">
                <span>Net mensuel</span>
                <span>{formatNZD(nzResult.netNZD / 12)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Équivalent en EUR</span>
                <span>{formatEUR(nzResult.netEUR / 12)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Tranches d'imposition NZ</div>
              {nzResult.breakdown.map((bracket, index) => (
                <div key={index} className="flex justify-between text-xs bg-gray-50 p-2 rounded">
                  <span>{bracket.bracket} ({bracket.rate}%)</span>
                  <span className="font-medium">{formatNZD(bracket.taxAmount)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Résumé de comparaison */}
      <Card className="bg-gradient-to-r from-blue-50 to-emerald-50 border-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            💡 Résumé de votre situation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-sm text-muted-foreground mb-1">Différence de prélèvements</div>
              <div className="text-2xl font-bold mb-2 flex items-center justify-center">
                {nzResult.effectiveRate > frenchResult.effectiveRate ? (
                  <TrendingUp className="h-6 w-6 text-red-500 mr-1" />
                ) : (
                  <TrendingDown className="h-6 w-6 text-green-500 mr-1" />
                )}
                {Math.abs(nzResult.effectiveRate - frenchResult.effectiveRate).toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">
                {nzResult.effectiveRate > frenchResult.effectiveRate ? 'Plus élevé' : 'Plus faible'} qu'en France
              </div>
            </div>

            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-sm text-muted-foreground mb-1">Gain/Perte mensuel</div>
              <div className="text-2xl font-bold mb-2">
                {nzResult.netEUR > frenchResult.netEUR ? (
                  <span className="text-green-600">
                    +{formatEUR((nzResult.netEUR - frenchResult.netEUR) / 12)}
                  </span>
                ) : (
                  <span className="text-red-600">
                    {formatEUR((nzResult.netEUR - frenchResult.netEUR) / 12)}
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                Par rapport à la France
              </div>
            </div>

            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-sm text-muted-foreground mb-1">Pouvoir d'achat</div>
              <div className="text-2xl font-bold mb-2">
                <Info className="h-6 w-6 inline mr-1" />
                Variable
              </div>
              <div className="text-xs text-muted-foreground">
                Dépend du coût de la vie local
              </div>
            </div>
          </div>

          {/* Conseils personnalisés */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-semibold mb-2 flex items-center">
              💡 Conseils pour votre statut : {workerTypes.find(t => t.id === workerType)?.label}
            </h4>
            <div className="text-sm space-y-1">
              {workerType === 'employee' && (
                <>
                  <p>• Négociez un salaire tenant compte du coût de la vie NZ</p>
                  <p>• Profitez du KiwiSaver pour votre retraite (contribution employeur)</p>
                  <p>• Vérifiez les avantages sociaux (assurance santé, congés)</p>
                </>
              )}
              {workerType === 'freelance' && (
                <>
                  <p>• Constituez-vous un fonds d'urgence (pas de congés payés)</p>
                  <p>• Pensez à l'assurance responsabilité professionnelle</p>
                  <p>• Gardez tous vos reçus pour les déductions fiscales</p>
                </>
              )}
              {workerType === 'business-owner' && (
                <>
                  <p>• Consultez un comptable NZ pour optimiser votre structure</p>
                  <p>• Enregistrez-vous pour la GST si CA  NZ$60,000</p>
                  <p>• Explorez les incitations gouvernementales pour l'innovation</p>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}