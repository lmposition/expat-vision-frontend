import React, { useContext } from "react";
import { ExpatContext } from "./ExpatContext";
import { motion } from "framer-motion";
import { getAllCountries } from "./CountrySelector";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";

const professionMap = {
  "employee": { title: "Employee", emoji: "👨‍💼", description: "Working for a company" },
  "founder": { title: "Business founder", emoji: "🏢", description: "Starting a company" },
  "freelancer": { title: "Freelancer", emoji: "💻", description: "Working independently" },
  "investor": { title: "Investor", emoji: "💰", description: "Investing capital" },
};

export function Results() {
  const { 
    currentCountry,
    targetCountry,
    profession,
    setShowResults
  } = useContext(ExpatContext);

  // Get all countries for lookup
  const countries = getAllCountries();
  const currentCountryData = countries.find(c => c.code === currentCountry);
  const targetCountryData = countries.find(c => c.code === targetCountry);
  const professionData = professionMap[profession as keyof typeof professionMap];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto px-4"
    >
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => setShowResults(false)}
          className="gap-2"
        >
          <ArrowLeftIcon size={16} /> Back to form
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-6">Your Expatriation Plan</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {currentCountryData?.emoji || "🌍"} Current Country
            </CardTitle>
            <CardDescription>Where you currently live</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xl">{currentCountryData?.name || "Not selected"}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {targetCountryData?.emoji || "🌎"} Target Country
            </CardTitle>
            <CardDescription>Where you want to move</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xl">{targetCountryData?.name || "Not selected"}</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {professionData?.emoji || "💼"} Professional Status
          </CardTitle>
          <CardDescription>How you plan to work</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xl">{professionData?.title || "Not selected"}</p>
          <p className="text-muted-foreground mt-2">{professionData?.description || ""}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📋 Next Steps
          </CardTitle>
          <CardDescription>What you need to do to make your move happen</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
            <div>
              <h3 className="font-medium">Research Visa Requirements</h3>
              <p className="text-muted-foreground">
                Check the specific visa requirements for {targetCountryData?.name || "your destination"} 
                as a {professionData?.title?.toLowerCase() || "professional"}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
            <div>
              <h3 className="font-medium">Understand Tax Implications</h3>
              <p className="text-muted-foreground">
                Learn about the tax agreements between {currentCountryData?.name || "your country"} and {targetCountryData?.name || "your destination"}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
            <div>
              <h3 className="font-medium">Housing Options</h3>
              <p className="text-muted-foreground">
                Explore housing options and costs in {targetCountryData?.name || "your destination"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}