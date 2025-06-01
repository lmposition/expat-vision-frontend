// components/CountryMap.tsx
'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface City {
  name: string
  coords: [number, number]
  population: string
}

interface CountryMapProps {
  center: [number, number]
  zoom: number
  cities: City[]
}

export default function CountryMap({ center, zoom, cities }: CountryMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Nettoyer la carte existante
    if (mapRef.current) {
      mapRef.current.remove()
      mapRef.current = null
    }

    // Créer une nouvelle carte
    const map = L.map(containerRef.current).setView(center, zoom)
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)

    // Ajouter les marqueurs des villes
    cities.forEach(city => {
      L.marker(city.coords)
        .addTo(map)
        .bindPopup(`<b>${city.name}</b><br/>Population: ${city.population}`)
    })

    mapRef.current = map

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [center, zoom, cities])

  return <div ref={containerRef} className="h-96 w-full rounded-lg" />
}