'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

const economicData = [
  { year: '2019', gdp: 45800, unemployment: 4.1, inflation: 1.6 },
  { year: '2020', gdp: 44200, unemployment: 4.2, inflation: 1.4 },
  { year: '2021', gdp: 46800, unemployment: 3.8, inflation: 3.9 },
  { year: '2022', gdp: 48200, unemployment: 3.3, inflation: 7.2 },
  { year: '2023', gdp: 49100, unemployment: 3.4, inflation: 4.7 },
  { year: '2024', gdp: 49800, unemployment: 3.6, inflation: 2.8 }
]

const costOfLivingData = [
  { category: 'Housing', nz: 100, france: 85, global: 75 },
  { category: 'Food', nz: 100, france: 90, global: 80 },
  { category: 'Transport', nz: 100, france: 110, global: 85 },
  { category: 'Healthcare', nz: 100, france: 95, global: 90 },
  { category: 'Education', nz: 100, france: 70, global: 85 }
]

const sectorData = [
  { name: 'Technology', value: 28, color: '#8884d8' },
  { name: 'Agriculture', value: 18, color: '#82ca9d' },
  { name: 'Tourism', value: 15, color: '#ffc658' },
  { name: 'Manufacturing', value: 12, color: '#ff7300' },
  { name: 'Finance', value: 15, color: '#00ff88' },
  { name: 'Others', value: 12, color: '#ff8884' }
]

export default function InteractiveCharts() {
  const [activeChart, setActiveChart] = useState('economic')

  return (
    <Tabs value={activeChart} onValueChange={setActiveChart} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="economic">Economic Trends</TabsTrigger>
        <TabsTrigger value="cost">Cost of Living</TabsTrigger>
        <TabsTrigger value="sectors">Job Sectors</TabsTrigger>
      </TabsList>

      <TabsContent value="economic" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Economic Indicators (2019-2024)
              <Badge variant="secondary">Interactive</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={economicData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border rounded-lg p-3 shadow-lg">
                            <p className="font-semibold">{label}</p>
                            {payload.map((entry, index) => (
                              <p key={index} style={{ color: entry.color }}>
                                {entry.dataKey}: {entry.value}
                                {entry.dataKey === 'gdp' ? ' USD' : '%'}
                              </p>
                            ))}
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="gdp" 
                    stroke="#8884d8" 
                    strokeWidth={3}
                    name="GDP per Capita"
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="unemployment" 
                    stroke="#82ca9d" 
                    strokeWidth={3}
                    name="Unemployment Rate"
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="inflation" 
                    stroke="#ffc658" 
                    strokeWidth={3}
                    name="Inflation Rate"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="cost" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Cost of Living Comparison
              <Badge variant="secondary">NZ vs France vs Global Average</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costOfLivingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border rounded-lg p-3 shadow-lg">
                            <p className="font-semibold">{label}</p>
                            {payload.map((entry, index) => (
                              <p key={index} style={{ color: entry.color }}>
                                {entry.dataKey === 'nz' ? 'New Zealand' : 
                                 entry.dataKey === 'france' ? 'France' : 'Global Average'}: {entry.value}
                              </p>
                            ))}
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="nz" fill="#8884d8" name="New Zealand" />
                  <Bar dataKey="france" fill="#82ca9d" name="France" />
                  <Bar dataKey="global" fill="#ffc658" name="Global Average" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="sectors" className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Market Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sectorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sector Growth Potential</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sectorData.map((sector, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition-colors">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: sector.color }}
                    />
                    <span className="font-medium">{sector.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{sector.value}%</Badge>
                    <Badge variant={sector.value > 20 ? 'default' : 'secondary'}>
                      {sector.value > 20 ? 'High Growth' : 'Stable'}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}