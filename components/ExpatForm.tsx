import React, { useState } from "react";
import { CountrySelector } from "./CountrySelector";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";

const professionOptions = [
  { value: "employee", label: "Employee" },
  { value: "founder", label: "Business founder" },
  { value: "freelancer", label: "Freelancer" },
  { value: "investor", label: "Investor" },
];

export function ExpatForm() {
  const [currentCountry, setCurrentCountry] = useState<string>("");
  const [targetCountry, setTargetCountry] = useState<string>("");
  const [profession, setProfession] = useState<string>("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This will be implemented later to navigate to another page
    console.log({ currentCountry, targetCountry, profession });
    alert("Form submitted successfully! Redirection will be implemented in the future.");
  };
  
  const formComplete = currentCountry && targetCountry && profession;

  return (
    <div className="w-full max-w-3xl px-6 py-8 rounded-2xl bg-white/80 backdrop-blur-md shadow-xl border">
      <h2 className="text-2xl mb-8 text-center font-medium">Tell us about your expatriation plans</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <p className="whitespace-nowrap">I currently live in</p>
            <CountrySelector 
              value={currentCountry} 
              onChange={setCurrentCountry}
              className="min-w-[220px]" 
            />
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <p className="whitespace-nowrap">and I would like to expatriate to</p>
            <CountrySelector 
              value={targetCountry} 
              onChange={setTargetCountry}
              className="min-w-[220px]" 
            />
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <p className="whitespace-nowrap">as a</p>
            <Select value={profession} onValueChange={setProfession}>
              <SelectTrigger className="w-full md:w-[220px]">
                <SelectValue placeholder="Select your profile" />
              </SelectTrigger>
              <SelectContent>
                {professionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            type="submit" 
            size="lg" 
            disabled={!formComplete}
            className="rounded-full px-8"
          >
            Let's get started
          </Button>
        </div>
      </form>
    </div>
  );
}