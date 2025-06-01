import React, { useContext } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { MenuIcon, MoonIcon, SunIcon } from "lucide-react";
import { NavButtons } from "./NavButtons";
import { ExpatContext } from "./ExpatContext";

export function MobileMenu() {
  const { darkMode, toggleDarkMode } = useContext(ExpatContext);
  
  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[80%] sm:w-[350px] pt-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <NavButtons />
            </div>
            <div className="border-t pt-4">
              <Button variant="ghost" size="sm" className="w-full justify-start" onClick={toggleDarkMode}>
                {darkMode ? <SunIcon className="h-4 w-4 mr-2" /> : <MoonIcon className="h-4 w-4 mr-2" />}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <span className="mr-2">👤</span> Profile
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <span className="mr-2">⚙️</span> Settings
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}