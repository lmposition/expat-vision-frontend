'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Menu, X, Globe, User, Settings, Bell, Search } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Globe className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <span className="font-semibold text-lg">Expat Vision</span>
              <Badge variant="secondary" className="ml-2 text-xs">
                Beta
              </Badge>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" size="sm" className="text-sm">
            Dashboard
          </Button>
          <Button variant="ghost" size="sm" className="text-sm">
            Countries
          </Button>
          <Button variant="ghost" size="sm" className="text-sm">
            Tools
          </Button>
          <Button variant="ghost" size="sm" className="text-sm">
            Resources
          </Button>
        </nav>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <User className="h-4 w-4 mr-2" />
            Account
          </Button>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden h-8 w-8 p-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <div className="container py-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              Countries
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              Tools
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              Resources
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <User className="h-4 w-4 mr-2" />
              Account
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}