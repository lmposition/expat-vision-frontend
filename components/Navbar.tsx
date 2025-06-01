import React, { useContext } from "react";
import { Logo } from "./Logo";
import { NavButtons } from "./NavButtons";
import { MobileMenu } from "./MobileMenu";
import { ExpatContext } from "./ExpatContext";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon, UserIcon } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";

export function Navbar() {
  const { darkMode, toggleDarkMode } = useContext(ExpatContext);

  return (
    <div className="w-full flex justify-center py-4 px-2 sticky top-0 z-50">
      <div className="flex items-center justify-between px-5 py-2 rounded-full border bg-background/60 backdrop-blur-md shadow-md dark:shadow-white/5 shadow-black/10 max-w-4xl w-full transition-all duration-300 hover:shadow-lg">
        {/* Left section with fixed width */}
        <div className="flex items-center w-[120px] justify-start">
          <Logo />
        </div>
        
        {/* Center section - navigation */}
        <div className="hidden md:flex justify-center flex-1">
          <NavButtons />
        </div>
        
        {/* Right section with fixed width to match left section */}
        <div className="flex items-center justify-end w-[120px]">
          <div className="hidden md:flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleDarkMode}
              className="gap-2 p-1"
            >
              {darkMode ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-2 p-1"
                >
                  <UserIcon className="h-4 w-4" />
                  <span className="hidden lg:inline">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <span className="mr-2">👤</span> Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="mr-2">⚙️</span> Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <MobileMenu />
        </div>
      </div>
    </div>
  );
}