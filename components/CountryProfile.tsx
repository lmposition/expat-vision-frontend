import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ExternalLink, Globe, Building2, UsersRound, Briefcase, Lightbulb } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useContext } from "react";
import { ExpatContext } from "./ExpatContext";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

// New Zealand SVG Map
const NewZealandMap = () => (
  <svg
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto"
  >
    <path
      d="M245.5,57.3c-1.5,1-3.2,0.4-4.9,0.5c-1.9,0.2-3-0.9-3.5-2.6c-0.2-0.7-0.6-1.5,0-2.2c1.3-1.4,0.7-3.1,0.9-4.7
      c0.1-0.8-0.1-1.8,0.5-2.4c0.7-0.6,1.6,0,2.4,0.2c1.4,0.3,2.5,1.1,3.4,2.3c2.3,3.1,2.3,6,1.2,9.1L245.5,57.3z M258.7,72.8
      c-0.2,1.5,0.3,2.8,1.1,4.1c1,1.8,2.6,3.2,2.9,5.3c0.2,1.5,0.6,3.1-0.3,4.5c-1,1.5-2.4,0.7-3.7,0.3c-1.3-0.4-2.3-1.3-3.6-1.7
      c-2.3-0.7-3.6-2.5-4.9-4.4c-1-1.5-2.1-2.9-3.5-4c-0.7-0.6-1.5-1.3-1.5-2.2c-0.1-1.1,0.9-1.6,1.7-2c3.8-1.9,7.3-0.7,10.9,0.8
      C258.1,72.9,258.4,72.8,258.7,72.8L258.7,72.8z M291.7,143c-0.1,1.1-0.2,2.2-0.4,3.4c-0.2,1.6-1.4,2.5-2.9,2.3
      c-1.2-0.2-1.6-1.1-1.9-2.1c-0.2-0.7-0.1-1.5,0-2.3c0.2-1.5,0.2-3.1-1-4.3c-0.7-0.7-0.9-1.6-0.1-2.5c0.8-0.9,1.7-0.6,2.7-0.3
      c1,0.4,1.6,1.2,1.9,2.1C290.5,140.6,291.4,141.7,291.7,143L291.7,143z M310.3,215.4c0.9,1.7,0.4,3.3-0.2,4.9
      c-0.6,1.7-1.7,2.6-3.5,2.3c-2-0.3-3.6-2.5-3.4-4.6c0.1-0.9,0.4-1.7,1.3-2.2c1.2-0.6,1.8-1.8,2-3.1c0.1-0.5,0.1-1,0.1-1.5
      c0.1-1.4,0.8-2.2,2.2-2.1c1.4,0.1,2.3,1,2.3,2.4c0,1-0.3,1.8-1.2,2.4C309.2,214.3,309.7,214.7,310.3,215.4L310.3,215.4z M283.3,210.2
      c-0.2,0.8-0.3,1.7-0.5,2.6c-0.4,2.2-1.6,3.5-3.2,4.7c-1.5,1.1-2.9,0.7-4.4-0.1c-1.3-0.7-1.5-1.8-1.2-3c0.5-2.3,2-3.8,3.6-5.2
      c0.8-0.6,1.6-1.2,2.7-1.3c1.1-0.1,2.1,0.2,2.5,1.3C282.9,209.5,283,209.9,283.3,210.2L283.3,210.2z M294.8,259.5
      c1.2,0.2,2.1,0.9,2.8,1.9c0.5,0.7,1.1,1.3,1.2,2.2c0.2,0.9-0.3,1.7-1.1,2c-0.9,0.3-1.8,0.7-2.7,0c-1.2-0.9-2.7-1.1-3.9-2
      c-0.9-0.7-2.1-1.2-2-2.7c0-1.3,1.2-1.7,2.1-2.1C292.2,258.4,293.6,258.4,294.8,259.5L294.8,259.5z M235,83.9c-0.8,0.6-1.5,1.7-2.6,1.6
      c-1.1-0.1-2-0.8-2.3-1.9c-0.2-1-0.1-1.9,0.6-2.6c0.7-0.8,1.7-1,2.8-0.9c0.9,0.1,1.6,0.6,1.9,1.5C235.7,82.4,235.4,83.2,235,83.9
      L235,83.9z M197.1,102.5c-0.1,0.6,0.3,1.2-0.5,1.7c-0.8,0.5-1.4-0.1-2-0.5c-1-0.6-1.8-1.4-2.2-2.5c-0.4-1.1,0.1-2,0.9-2.6
      c0.9-0.7,1.8-0.5,2.7,0c0.3,0.2,0.6,0.5,0.8,0.8C197.5,100.4,197,101.6,197.1,102.5L197.1,102.5z M295.6,190.9c0,1.1-0.2,2-1,2.8
      c-0.7,0.6-1.5,0.6-2.2-0.1c-0.9-0.8-1-1.9-0.7-3c0.4-1.2,1.2-1.5,2.3-1.2C295.1,189.7,295.5,190.3,295.6,190.9L295.6,190.9z
       M286.4,269.7c-0.8-0.5-1.7-0.6-2.4-1.2c-0.4-0.3-0.9-0.7-0.9-1.2c0-0.6,0.3-1.2,0.8-1.5c1.2-0.7,2.3-1.6,3.8-1.4
      c0.5,0.1,1.1-0.1,1.6,0c0.8,0.2,1.6,0.5,1.5,1.5c0,1-0.8,1.4-1.5,1.7C288.3,268.3,287.3,269,286.4,269.7L286.4,269.7z M234.5,147.7
      c-0.3,1-0.3,1.9-0.8,2.5c-0.9,0.9-2.2,0.9-3.3,0.6c-1-0.2-1-1.1-1-1.9c0-0.8,0.2-1.6,0.4-2.4c0.3-1.4,1.3-2,2.6-1.5
      C233.7,145.6,234.3,146.5,234.5,147.7L234.5,147.7z M289.7,289.1c0,0.8-0.1,1.5-0.7,2c-0.7,0.6-1.5,1.1-2.4,0.8
      c-0.9-0.3-1.7-0.8-1.6-1.9c0.1-1.3,0.7-2.1,1.9-2.5C288.5,286.9,289.7,287.4,289.7,289.1L289.7,289.1z M261.8,158.2
      c0.2,0.6-0.3,1.1-0.8,1.2c-0.9,0.3-1.9,0.5-2.8,0.7c-1.1,0.3-1.7-0.3-1.9-1.3c-0.2-1,0.3-1.7,1.2-2c1-0.3,1.9-0.7,3-0.5
      C261.4,156.5,261.6,157.5,261.8,158.2L261.8,158.2z M272.5,293.2c0.3,0.7,0.1,1.3-0.2,1.9c-0.4,0.8-1.2,1.1-2,0.8
      c-0.8-0.3-1.2-0.9-1-1.8c0.1-0.7,0.4-1.3,0.5-2c0.2-0.8,0.7-1.3,1.6-1.1C272.3,291.3,272.6,292,272.5,293.2L272.5,293.2z M154.6,163.6
      c0.4-0.3,0.9-0.5,1.4-0.6c0.9-0.2,1.5,0.2,1.7,1c0.2,0.8-0.2,1.4-0.8,1.7c-0.9,0.4-1.8,0.7-2.7,0.6c-0.6-0.1-1-0.6-1.1-1.2
      c-0.2-1,0.3-1.5,1.2-1.6C154.4,163.6,154.5,163.6,154.6,163.6L154.6,163.6z M134.7,193.7c-0.4,0.2-0.7,0.3-1.1,0.4
      c-0.6,0.2-1.1,0.3-1.6-0.2c-0.5-0.5-0.5-1-0.1-1.6c0.5-0.7,1.1-1.3,1.6-2c0.7-1,1.5-1.1,2.4-0.3c0.6,0.6,0.8,1.3,0.3,2.1
      C135.8,192.8,135.3,193.3,134.7,193.7L134.7,193.7z M278.7,304.7c0.8,0.3,0.9,0.9,1,1.5c0.3,1.6-0.4,2.3-1.9,2.4
      c-0.9,0-1.6-0.4-1.6-1.3c0-0.2,0-0.5,0-0.7c-0.1-0.7,0.2-1.3,0.9-1.6C277.8,304.7,278.2,304.8,278.7,304.7L278.7,304.7z M218.9,166.3
      c-0.1-0.4-0.2-0.9,0.1-1.2c0.5-0.5,0.6-1.3,1.4-1.4c0.8-0.1,1.3,0.5,1.7,1c0.4,0.5,0.9,1.1,0.5,1.8c-0.4,0.8-1.2,0.9-2,0.8
      C220,167.2,219.2,167.4,218.9,166.3L218.9,166.3z M204.2,158.7c0.5,0.1,1,0.2,1.3,0.6c0.5,0.6,1.4,0.8,1.5,1.7
      c0.1,0.8-0.5,1.3-1.2,1.5c-0.7,0.2-1.4,0.4-2.1,0c-0.8-0.5-0.9-1.3-0.7-2.1C203.2,159.4,203.9,159.2,204.2,158.7L204.2,158.7z
       M229.8,197.6c0.2,0.6,0.5,1.1,0.5,1.7c0,0.5-0.4,1-0.9,1.1c-0.5,0.1-1-0.1-1.2-0.6c-0.3-0.4-0.6-0.9-0.6-1.4c0-0.6,0.3-1.1,1-1.2
      C229,197.2,229.4,197.4,229.8,197.6L229.8,197.6z M273.1,170.7c-0.6,0.2-1.2,0.4-1.5-0.3c-0.3-0.6,0.2-1,0.6-1.3c0.5-0.3,1-0.7,1.6-0.6
      c0.5,0.1,0.9,0.6,0.9,1.1C274.7,170.3,274.1,170.6,273.1,170.7L273.1,170.7z"
      fill="currentColor"
      className="fill-muted-foreground"
    />
  </svg>
);

export function CountryProfile() {
  const [activeTab, setActiveTab] = useState("overview");
  const sidebarRef = useRef(null);
  const mainContentRef = useRef(null);
  const [sidebarStyle, setSidebarStyle] = useState({});

  // Effect to handle the fixed sidebar
  useEffect(() => {
    const handleScroll = () => {
      if (sidebarRef.current && mainContentRef.current) {
        const sidebarHeight = sidebarRef.current.offsetHeight;
        const mainContentHeight = mainContentRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const navbarHeight = 64; // Approximate height of navbar
        
        // Check if sidebar is taller than viewport
        if (sidebarHeight > windowHeight - navbarHeight) {
          // No fixed positioning if sidebar is taller than viewport
          setSidebarStyle({});
        } else {
          // If we haven't scrolled past the bottom of main content minus sidebar height
          const maxScrollY = mainContentRef.current.offsetTop + mainContentHeight - sidebarHeight;
          
          if (scrollY + navbarHeight < mainContentRef.current.offsetTop) {
            // Not scrolled to the top of content yet
            setSidebarStyle({});
          } else if (scrollY + navbarHeight > maxScrollY) {
            // Scrolled past the point where sidebar should stop
            setSidebarStyle({
              position: 'absolute',
              top: `${maxScrollY - mainContentRef.current.offsetTop + navbarHeight}px`,
              width: 'inherit'
            });
          } else {
            // Fixed position within the scrollable area
            setSidebarStyle({
              position: 'fixed',
              top: `${navbarHeight}px`,
              width: 'inherit'
            });
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[90%] mx-auto py-6"
    >
      {/* Country Header Card */}
      <Card className="mb-6 overflow-hidden shadow-md">
        <div className="relative h-[240px] md:h-[320px] w-full overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1470&auto=format&fit=crop"
            alt="New Zealand landscape"
            className="w-full h-full object-cover"
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
          />
          <div className="absolute left-4 bottom-4">
            <Button 
              variant="secondary" 
              className="gap-2 shadow-md font-medium"
              onClick={() => window.open("https://www.govt.nz/", "_blank")}
            >
              <Globe size={16} /> Official Government Site
            </Button>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🇳🇿</span>
            <CardTitle className="text-3xl font-bold">New Zealand</CardTitle>
            <Badge variant="outline" className="ml-2">Oceania</Badge>
          </div>
          <CardDescription className="text-lg mt-2">
            A beautiful island nation known for its stunning landscapes, Māori culture, and high quality of life. New Zealand offers a safe and stable environment for expatriates with excellent healthcare and education systems.
          </CardDescription>
        </CardHeader>
        <CardFooter className="pt-0 text-sm text-muted-foreground">
          Last updated: June 1, 2025
        </CardFooter>
      </Card>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6 bg-muted/60 text-base">
          <TabsTrigger value="overview" className="flex gap-2 items-center">
            <Globe size={16} /> Country Overview
          </TabsTrigger>
          <TabsTrigger value="living" className="flex gap-2 items-center">
            <UsersRound size={16} /> Living & Integration
          </TabsTrigger>
          <TabsTrigger value="legal" className="flex gap-2 items-center">
            <Building2 size={16} /> Legal & Business Setup
          </TabsTrigger>
          <TabsTrigger value="opportunities" className="flex gap-2 items-center">
            <Lightbulb size={16} /> Opportunities & Insights
          </TabsTrigger>
        </TabsList>

        {/* Country Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6" ref={mainContentRef}>
            <div className="lg:col-span-4 space-y-6">
              <Card className="shadow-sm border-border/60">
                <CardHeader className="pb-2">
                  <CardTitle>Expat Experiences</CardTitle>
                  <Separator />
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="aspect-video rounded-md overflow-hidden">
                      <iframe 
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/qUk4iV0L_WM" 
                        title="Living in New Zealand as an Expat" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                      </iframe>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="aspect-video rounded-md overflow-hidden">
                        <iframe 
                          className="w-full h-full"
                          src="https://www.youtube.com/embed/Dkjq_NJqDlI" 
                          title="Moving to New Zealand: What to Expect" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen>
                        </iframe>
                      </div>
                      <div className="aspect-video rounded-md overflow-hidden">
                        <iframe 
                          className="w-full h-full"
                          src="https://www.youtube.com/embed/eYxo_3ctHRs" 
                          title="Working in New Zealand" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen>
                        </iframe>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-border/60">
                <CardHeader className="pb-2">
                  <CardTitle>Key Facts</CardTitle>
                  <Separator />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-muted-foreground">Capital</p>
                        <p className="font-medium">Wellington</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Population</p>
                        <p className="font-medium">5.1 million</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Official Languages</p>
                        <p className="font-medium">English, Māori</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Currency</p>
                        <p className="font-medium">New Zealand Dollar (NZD)</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Time Zone</p>
                        <p className="font-medium">UTC+12:00 (NZST)</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Driving Side</p>
                        <p className="font-medium">Left</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-border/60">
                <CardHeader className="pb-2">
                  <CardTitle>Economy & Labor Market</CardTitle>
                  <Separator />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>New Zealand has a stable, developed economy with strong agriculture, tourism, manufacturing, and services sectors. The country is known for its ease of doing business and transparent regulations.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-muted-foreground">GDP</p>
                        <p className="font-medium">$212 billion USD</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Unemployment Rate</p>
                        <p className="font-medium">3.4%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Major Industries</p>
                        <p className="font-medium">Agriculture, Tourism, Technology</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Average Salary</p>
                        <p className="font-medium">$58,000 NZD</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Work Week</p>
                        <p className="font-medium">40 hours (Standard)</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Paid Leave</p>
                        <p className="font-medium">20 days + 11 public holidays</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-border/60">
                <CardHeader className="pb-2">
                  <CardTitle>Climate & Geography</CardTitle>
                  <Separator />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>New Zealand consists of two main islands - North and South - and offers diverse landscapes including mountains, beaches, forests, and fjords. The climate is temperate with relatively mild temperatures year-round.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-muted-foreground">Climate</p>
                        <p className="font-medium">Temperate with regional variations</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Best Season to Visit</p>
                        <p className="font-medium">December to March (Summer)</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Geographic Highlights</p>
                        <p className="font-medium">Mountains, beaches, fjords, glaciers</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Notable Features</p>
                        <p className="font-medium">Milford Sound, Mount Cook, Rotorua</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6 relative">
              <div style={sidebarStyle} ref={sidebarRef}>
                <Card className="shadow-sm border-border/60 mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-center">New Zealand</CardTitle>
                    <div className="py-4 px-2">
                      <NewZealandMap />
                    </div>
                  </CardHeader>
                </Card>
                
                <Card className="shadow-sm border-border/60 mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle>Quick Links</CardTitle>
                    <Separator />
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <Button variant="link" className="p-0 h-auto flex items-center gap-1">
                          Immigration NZ <ExternalLink size={12} />
                        </Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0 h-auto flex items-center gap-1">
                          Tourism Board <ExternalLink size={12} />
                        </Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0 h-auto flex items-center gap-1">
                          Employment NZ <ExternalLink size={12} />
                        </Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0 h-auto flex items-center gap-1">
                          Housing Portal <ExternalLink size={12} />
                        </Button>
                      </li>
                      <li>
                        <Button variant="link" className="p-0 h-auto flex items-center gap-1">
                          Healthcare Info <ExternalLink size={12} />
                        </Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm border-border/60">
                  <CardHeader className="pb-2">
                    <CardTitle>Key Statistics</CardTitle>
                    <Separator />
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Safety Index:</span>
                        <span className="font-medium">92/100</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Quality of Life:</span>
                        <span className="font-medium">88/100</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Healthcare:</span>
                        <span className="font-medium">87/100</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Cost of Living:</span>
                        <span className="font-medium">High</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Internet Speed:</span>
                        <span className="font-medium">118 Mbps</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Living & Integration Tab */}
        <TabsContent value="living">
          <div className="space-y-6">
            <Card className="shadow-sm border-border/60">
              <CardHeader className="pb-2">
                <CardTitle>Housing & Accommodation</CardTitle>
                <Separator />
              </CardHeader>
              <CardContent>
                <p>Housing in New Zealand varies across regions, with Auckland and Wellington being the most expensive markets. Most expatriates rent initially before committing to purchase. The housing market is well-regulated with strong tenant protections.</p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground">Average Rent (1BR Apartment)</p>
                    <p className="font-medium">NZ$400-600/week</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Average Home Price</p>
                    <p className="font-medium">NZ$850,000</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-border/60">
              <CardHeader className="pb-2">
                <CardTitle>Healthcare System</CardTitle>
                <Separator />
              </CardHeader>
              <CardContent>
                <p>New Zealand offers a mixed public-private healthcare system. Public healthcare is available to residents and some visa holders, while private insurance can provide faster access to specialist care and elective procedures.</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-border/60">
              <CardHeader className="pb-2">
                <CardTitle>Education & Schools</CardTitle>
                <Separator />
              </CardHeader>
              <CardContent>
                <p>The education system is of high quality with free public education for residents and some visa holders. International schools are available in major cities for families seeking curriculum continuity.</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-border/60">
              <CardHeader className="pb-2">
                <CardTitle>Cultural Integration</CardTitle>
                <Separator />
              </CardHeader>
              <CardContent>
                <p>New Zealand's culture is influenced by both European and Māori traditions. Kiwis are generally friendly and informal. The country values work-life balance, outdoor activities, and environmental conservation.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Legal & Business Setup Tab */}
        <TabsContent value="legal">
          <div className="space-y-6">
            <Card className="shadow-sm border-border/60">
              <CardHeader className="pb-2">
                <CardTitle>Visa & Residency Options</CardTitle>
                <Separator />
              </CardHeader>
              <CardContent>
                <p>New Zealand offers several visa pathways for expatriates including skilled worker visas, entrepreneur visas, and investor categories. Points-based systems assess qualification for permanent residency.</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-border/60">
              <CardHeader className="pb-2">
                <CardTitle>Business Registration</CardTitle>
                <Separator />
              </CardHeader>
              <CardContent>
                <p>Setting up a business in New Zealand is straightforward with an efficient online registration system. The process typically takes 1-3 days and can be completed with minimal paperwork.</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-border/60">
              <CardHeader className="pb-2">
                <CardTitle>Taxation System</CardTitle>
                <Separator />
              </CardHeader>
              <CardContent>
                <p>The tax system is progressive with rates ranging from 10.5% to 39%. New Zealand has double taxation agreements with many countries to prevent dual taxation of expatriate income.</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-border/60">
              <CardHeader className="pb-2">
                <CardTitle>Banking & Finance</CardTitle>
                <Separator />
              </CardHeader>
              <CardContent>
                <p>New Zealand has a stable banking system dominated by several major banks. Opening accounts is straightforward for residents and many visa holders, though some identity verification will be required.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Opportunities & Insights Tab */}
        <TabsContent value="opportunities">
          <div className="space-y-6">
            <Card className="shadow-sm border-border/60">
              <CardHeader className="pb-2">
                <CardTitle>Job Market Trends</CardTitle>
                <Separator />
              </CardHeader>
              <CardContent>
                <p>New Zealand has current skills shortages in healthcare, IT, engineering, and construction. The job market favors skilled professionals and offers good work-life balance compared to many other developed economies.</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-border/60">
              <CardHeader className="pb-2">
                <CardTitle>Entrepreneurship Ecosystem</CardTitle>
                <Separator />
              </CardHeader>
              <CardContent>
                <p>The startup scene is growing with innovation hubs in Auckland and Wellington. Government programs support new businesses, particularly in technology, sustainable agriculture, and creative industries.</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-border/60">
              <CardHeader className="pb-2">
                <CardTitle>Networking Opportunities</CardTitle>
                <Separator />
              </CardHeader>
              <CardContent>
                <p>Professional networking is important in New Zealand's business culture. Industry associations, chambers of commerce, and expatriate groups offer regular events to build connections.</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-border/60">
              <CardHeader className="pb-2">
                <CardTitle>Success Stories</CardTitle>
                <Separator />
              </CardHeader>
              <CardContent>
                <p>Many expatriates have successfully established businesses or careers in New Zealand, particularly in technology, tourism, sustainable industries, and creative fields. The country's quality of life is frequently cited as a key benefit.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}