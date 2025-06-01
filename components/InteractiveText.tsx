import React, { useContext, useState, useEffect } from "react";
import { ExpatContext } from "./ExpatContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { getAllCountries } from "./CountrySelector";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const professionOptions = [
  { value: "employee", label: "Employee", emoji: "👨‍💼" },
  { value: "founder", label: "Business founder", emoji: "🏢" },
  { value: "freelancer", label: "Freelancer", emoji: "💻" },
  { value: "investor", label: "Investor", emoji: "💰" },
];

export function InteractiveText() {
  const { 
    currentCountry, 
    setCurrentCountry, 
    targetCountry, 
    setTargetCountry, 
    profession, 
    setProfession,
    setShowResults
  } = useContext(ExpatContext);
  
  const [allSelected, setAllSelected] = useState(false);
  const countries = getAllCountries();
  
  // Check if all options are selected
  useEffect(() => {
    setAllSelected(!!currentCountry && !!targetCountry && !!profession);
  }, [currentCountry, targetCountry, profession]);
  
  // Handle continue button click
  const handleContinue = () => {
    setShowResults(true);
  };

  return (
    <div className="w-full text-center">
      <div className="text-2xl md:text-3xl lg:text-4xl font-normal italic space-y-6 text-foreground">
        <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
          <span className="whitespace-nowrap">I currently live in</span>
          <div className="inline-block min-w-40">
            <Select value={currentCountry} onValueChange={setCurrentCountry}>
              <SelectTrigger 
                className="text-lg md:text-xl lg:text-2xl font-bold italic underline underline-offset-4 decoration-primary/70 border-0 bg-transparent p-0 h-auto pr-6 min-w-40 whitespace-nowrap overflow-hidden text-ellipsis"
              >
                <SelectValue placeholder="Select 🌍" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] min-w-[200px]">
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <div className="flex items-center gap-2">
                      <span>{country.emoji}</span>
                      <span>{country.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
          <span className="whitespace-nowrap">and I would like to expatriate to</span>
          <div className="inline-block min-w-40">
            <Select value={targetCountry} onValueChange={setTargetCountry}>
              <SelectTrigger 
                className="text-lg md:text-xl lg:text-2xl font-bold italic underline underline-offset-4 decoration-primary/70 border-0 bg-transparent p-0 h-auto pr-6 min-w-40 whitespace-nowrap overflow-hidden text-ellipsis"
              >
                <SelectValue placeholder="Select 🌎" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] min-w-[200px]">
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <div className="flex items-center gap-2">
                      <span>{country.emoji}</span>
                      <span>{country.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
          <span className="whitespace-nowrap">as a</span>
          <div className="inline-block min-w-40">
            <Select value={profession} onValueChange={setProfession}>
              <SelectTrigger 
                className="text-lg md:text-xl lg:text-2xl font-bold italic underline underline-offset-4 decoration-primary/70 border-0 bg-transparent p-0 h-auto pr-6 min-w-40 whitespace-nowrap overflow-hidden text-ellipsis"
              >
                <SelectValue placeholder="Select 💼" />
              </SelectTrigger>
              <SelectContent className="min-w-[200px]">
                {professionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <span>{option.emoji}</span>
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <AnimatePresence>
          {allSelected && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mt-8"
            >
              <Button 
                onClick={handleContinue}
                size="lg" 
                className="px-8 py-6 rounded-full font-bold gap-2 text-lg"
              >
                Continue <ArrowRightIcon className="ml-2" size={20} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}