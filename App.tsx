import React, { useContext } from "react";
import { Navbar } from "./components/Navbar";
import { InteractiveText } from "./components/InteractiveText";
import { BackgroundDecoration } from "./components/BackgroundDecoration";
import { ExpatProvider, ExpatContext } from "./components/ExpatContext";
import { CountryProfile } from "./components/CountryProfile";
import { AnimatePresence, motion } from "framer-motion";
import "./styles/animations.css";

function AppContent() {
  const { showResults } = useContext(ExpatContext);
  
  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex items-center justify-center p-6"
            >
              <div className="max-w-4xl w-full">
                <InteractiveText />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full flex-1"
            >
              <CountryProfile />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <BackgroundDecoration />
    </div>
  );
}

export default function App() {
  return (
    <ExpatProvider>
      <AppContent />
    </ExpatProvider>
  );
}