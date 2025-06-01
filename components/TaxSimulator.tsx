'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Calculator, DollarSign, TrendingDown, TrendingUp } from 'lucide-react'

export default function TaxSimulator() {
  const [income, setIncome] = useState(80000)
  const [residencyStatus, setResidencyStatus] = useState<'resident' | 'non-resident'>('resident')
  const [deductions, setDeductions] = useState(5000)

  const calculateTax = () => {
    let tax = 0
    let remainingIncome = income

    // Tranches d'imposition NZ 2024
    const brackets = [
      { min: 0, max: 14000, rate: 0.105 },
      { min: 14000, max: 48000, rate: 0.175 },
      { min: 48000, max: 70000, rate: 0.30 },
      { min: 70000, max: Infinity, rate: 0.33 }
    ]

    for (const bracket of brackets) {
      if (remainingIncome <= 0) break
      
      const taxableInThisBracket = Math.min(remainingIncome, bracket.max - bracket.min)
      if (taxableInThisBracket > 0) {
        tax += taxableInThisBracket * bracket.rate
        remainingIncome -= taxableInThisBracket
      }
    }

    return Math.round(tax - deductions)
  }

  const netIncome = income - calculateTax()
  const effectiveRate = (calculateTax() / income) * 100

  return (
    <div className="space-y-6">
      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Annual Gross Income (NZ$)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                min="0"
                step="1000"
              />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Residency Status</label>
            <div className="flex space-x-2">
              <Button
                variant={residencyStatus === 'resident' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setResidencyStatus('resident')}
                className="flex-1"
              >
                Resident
              </Button>
              <Button
                variant={residencyStatus === 'non-resident' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setResidencyStatus('non-resident')}
                className="flex-1"
              >
                Non-Resident
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Deductions (NZ$)</label>
            <input
              type="number"
              value={deductions}
onChange={(e) => setDeductions(Number(e.target.value))}
             className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
             min="0"
             step="500"
           />
         </div>
       </Card>
     </div>

     {/* Results */}
     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
       <Card className="p-6 text-center">
         <div className="flex items-center justify-center mb-2">
           <Calculator className="h-5 w-5 text-red-500 mr-2" />
           <span className="text-sm font-medium text-muted-foreground">Income Tax</span>
         </div>
         <div className="text-2xl font-bold text-red-600">
           NZ$ {calculateTax().toLocaleString()}
         </div>
         <div className="text-xs text-muted-foreground mt-1">
           {effectiveRate.toFixed(1)}% effective rate
         </div>
       </Card>

       <Card className="p-6 text-center">
         <div className="flex items-center justify-center mb-2">
           <TrendingDown className="h-5 w-5 text-green-500 mr-2" />
           <span className="text-sm font-medium text-muted-foreground">Net Income</span>
         </div>
         <div className="text-2xl font-bold text-green-600">
           NZ$ {netIncome.toLocaleString()}
         </div>
         <div className="text-xs text-muted-foreground mt-1">
           After tax & deductions
         </div>
       </Card>

       <Card className="p-6 text-center">
         <div className="flex items-center justify-center mb-2">
           <DollarSign className="h-5 w-5 text-blue-500 mr-2" />
           <span className="text-sm font-medium text-muted-foreground">Monthly Net</span>
         </div>
         <div className="text-2xl font-bold text-blue-600">
           NZ$ {Math.round(netIncome / 12).toLocaleString()}
         </div>
         <div className="text-xs text-muted-foreground mt-1">
           Per month
         </div>
       </Card>

       <Card className="p-6 text-center">
         <div className="flex items-center justify-center mb-2">
           <TrendingUp className="h-5 w-5 text-purple-500 mr-2" />
           <span className="text-sm font-medium text-muted-foreground">Weekly Take-Home</span>
         </div>
         <div className="text-2xl font-bold text-purple-600">
           NZ$ {Math.round(netIncome / 52).toLocaleString()}
         </div>
         <div className="text-xs text-muted-foreground mt-1">
           Per week
         </div>
       </Card>
     </div>

     {/* Tax Breakdown */}
     <Card className="p-6">
       <h3 className="font-semibold mb-4 flex items-center">
         <Calculator className="h-5 w-5 mr-2" />
         Tax Breakdown by Bracket
       </h3>
       <div className="space-y-4">
         {[
           { range: 'NZ$ 0 - 14,000', rate: '10.5%', taxable: Math.min(income, 14000), color: 'bg-green-500' },
           { range: 'NZ$ 14,001 - 48,000', rate: '17.5%', taxable: Math.max(0, Math.min(income - 14000, 34000)), color: 'bg-yellow-500' },
           { range: 'NZ$ 48,001 - 70,000', rate: '30%', taxable: Math.max(0, Math.min(income - 48000, 22000)), color: 'bg-orange-500' },
           { range: 'NZ$ 70,001+', rate: '33%', taxable: Math.max(0, income - 70000), color: 'bg-red-500' }
         ].map((bracket, index) => {
           const taxForBracket = bracket.taxable * (parseFloat(bracket.rate) / 100)
           const percentage = income > 0 ? (bracket.taxable / income) * 100 : 0
           
           return (
             <div key={index} className="space-y-2">
               <div className="flex justify-between items-center text-sm">
                 <span className="font-medium">{bracket.range}</span>
                 <div className="flex items-center space-x-2">
                   <Badge variant="outline">{bracket.rate}</Badge>
                   <span className="font-semibold">
                     NZ$ {Math.round(taxForBracket).toLocaleString()}
                   </span>
                 </div>
               </div>
               <div className="flex items-center space-x-2">
                 <Progress value={percentage} className="flex-1 h-2" />
                 <span className="text-xs text-muted-foreground w-12">
                   {percentage.toFixed(0)}%
                 </span>
               </div>
               <div className="text-xs text-muted-foreground">
                 Taxable amount: NZ$ {bracket.taxable.toLocaleString()}
               </div>
             </div>
           )
         })}
       </div>
     </Card>

     {/* Comparison with France */}
     <Card className="p-6">
       <h3 className="font-semibold mb-4">Tax Comparison: New Zealand vs France</h3>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div>
           <h4 className="font-medium mb-2 flex items-center">
             🇳🇿 New Zealand
           </h4>
           <div className="space-y-2 text-sm">
             <div className="flex justify-between">
               <span>Income Tax:</span>
               <span className="font-semibold">NZ$ {calculateTax().toLocaleString()}</span>
             </div>
             <div className="flex justify-between">
               <span>Social Contributions:</span>
               <span className="font-semibold">NZ$ 0</span>
             </div>
             <div className="flex justify-between border-t pt-2">
               <span>Total Tax:</span>
               <span className="font-bold">NZ$ {calculateTax().toLocaleString()}</span>
             </div>
             <div className="flex justify-between">
               <span>Effective Rate:</span>
               <span className="font-bold">{effectiveRate.toFixed(1)}%</span>
             </div>
           </div>
         </div>
         
         <div>
           <h4 className="font-medium mb-2 flex items-center">
             🇫🇷 France (Estimate)
           </h4>
           <div className="space-y-2 text-sm">
             <div className="flex justify-between">
               <span>Income Tax:</span>
               <span className="font-semibold">€ {Math.round((income * 0.6) * 0.14).toLocaleString()}</span>
             </div>
             <div className="flex justify-between">
               <span>Social Contributions:</span>
               <span className="font-semibold">€ {Math.round((income * 0.6) * 0.22).toLocaleString()}</span>
             </div>
             <div className="flex justify-between border-t pt-2">
               <span>Total Tax:</span>
               <span className="font-bold">€ {Math.round((income * 0.6) * 0.36).toLocaleString()}</span>
             </div>
             <div className="flex justify-between">
               <span>Effective Rate:</span>
               <span className="font-bold">~36%</span>
             </div>
           </div>
         </div>
       </div>
       <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
         <p className="text-sm text-green-800 dark:text-green-200">
           💡 <strong>Potential Savings:</strong> You could save approximately{' '}
           <span className="font-bold">
             {((36 - effectiveRate) / 100 * income * 0.6).toFixed(0)}€
           </span>{' '}
           per year in New Zealand vs France
         </p>
       </div>
     </Card>
   </div>
 )
}