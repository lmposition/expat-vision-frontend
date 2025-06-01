import React, { createContext, useState, useEffect, ReactNode } from "react";

interface ExpatContextType {
  currentCountry: string;
  setCurrentCountry: (country: string) => void;
  targetCountry: string;
  setTargetCountry: (country: string) => void;
  profession: string;
  setProfession: (profession: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  showResults: boolean;
  setShowResults: (show: boolean) => void;
}

export const ExpatContext = createContext<ExpatContextType>({
  currentCountry: "",
  setCurrentCountry: () => {},
  targetCountry: "",
  setTargetCountry: () => {},
  profession: "",
  setProfession: () => {},
  darkMode: false,
  toggleDarkMode: () => {},
  showResults: false,
  setShowResults: () => {},
});

interface ExpatProviderProps {
  children: ReactNode;
}

export function ExpatProvider({ children }: ExpatProviderProps) {
  const [currentCountry, setCurrentCountry] = useState<string>("");
  const [targetCountry, setTargetCountry] = useState<string>("");
  const [profession, setProfession] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  
  const toggleDarkMode = () => {
    setDarkMode(prevState => !prevState);
  };
  
  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <ExpatContext.Provider
      value={{
        currentCountry,
        setCurrentCountry,
        targetCountry,
        setTargetCountry,
        profession,
        setProfession,
        darkMode,
        toggleDarkMode,
        showResults,
        setShowResults,
      }}
    >
      {children}
    </ExpatContext.Provider>
  );
}