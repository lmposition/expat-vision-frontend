import React from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export function NavButtons() {
  return (
    <div className="flex items-center gap-6 navbar-links">
      <div className="relative group">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary/80 transition-colors">
            Tips <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <span className="mr-2">📝</span> Getting Started
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="mr-2">🏠</span> Housing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="mr-2">💼</span> Jobs
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="mr-2">🏥</span> Healthcare
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative group">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary/80 transition-colors">
            Tools <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <span className="mr-2">🔍</span> Country Finder
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="mr-2">💰</span> Cost of Living Calculator
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="mr-2">📊</span> Visa Eligibility Check
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="mr-2">📅</span> Relocation Planner
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative group">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary/80 transition-colors">
            Interactive Map <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <span className="mr-2">🌎</span> World Map
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="mr-2">📈</span> Rankings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="mr-2">🔄</span> Compare Countries
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="mr-2">🔖</span> Save Favorites
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}