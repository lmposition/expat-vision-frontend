import React, { useContext } from "react";
import { ExpatContext } from "./ExpatContext";

export function BackgroundDecoration() {
  const { darkMode } = useContext(ExpatContext);
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Emojis with subtle animations */}
      <div className="absolute top-[15%] left-[10%] text-2xl opacity-20 animate-float" style={{ animationDelay: "0s" }}>✈️</div>
      <div className="absolute top-[25%] right-[15%] text-2xl opacity-20 animate-float" style={{ animationDelay: "-2s" }}>🌎</div>
      <div className="absolute bottom-[20%] left-[15%] text-2xl opacity-20 animate-float" style={{ animationDelay: "-4s" }}>🏠</div>
      <div className="absolute bottom-[30%] right-[10%] text-2xl opacity-20 animate-float" style={{ animationDelay: "-6s" }}>💼</div>

      {/* Simple geometric shapes with subtle animations */}
      <div className={`absolute rounded-full ${darkMode ? "bg-white/10" : "bg-black/10"} w-[300px] h-[300px] -bottom-32 -left-32 animate-pulse-slow`} />
      <div className={`absolute rounded-lg ${darkMode ? "bg-white/10" : "bg-black/10"} w-[200px] h-[200px] top-[15%] -right-20 rotate-12 animate-pulse-slow`} style={{ animationDelay: "-3s" }} />
      <div className={`absolute rounded-full ${darkMode ? "bg-white/10" : "bg-black/10"} w-[250px] h-[250px] bottom-[20%] -right-32 animate-pulse-slow`} style={{ animationDelay: "-5s" }} />
      <div className={`absolute rounded-lg ${darkMode ? "bg-white/10" : "bg-black/10"} w-[180px] h-[180px] top-[30%] left-[15%] animate-pulse-slow`} style={{ animationDelay: "-7s" }} />
      
      {/* Additional geometric shapes */}
      <div className={`absolute w-0 h-0 border-l-[50px] border-l-transparent border-b-[100px] ${darkMode ? "border-b-white/10" : "border-b-black/10"} border-r-[50px] border-r-transparent top-[70%] left-[50%] animate-pulse-slow`} style={{ animationDelay: "-4s" }} />
      <div className={`absolute ${darkMode ? "bg-white/10" : "bg-black/10"} w-[100px] h-[100px] top-[10%] left-[50%] rotate-45 animate-pulse-slow`} style={{ animationDelay: "-2s" }} />
      <div className={`absolute ${darkMode ? "bg-white/10" : "bg-black/10"} w-[80px] h-[80px] bottom-[15%] left-[40%] rounded-tr-3xl animate-pulse-slow`} style={{ animationDelay: "-6s" }} />
      
      {/* New decorative elements */}
      <div className={`absolute ${darkMode ? "bg-white/10" : "bg-black/10"} w-[60px] h-[60px] top-[45%] right-[25%] rounded-full animate-rotate`} />
      <div className={`absolute ${darkMode ? "bg-white/10" : "bg-black/10"} w-[40px] h-[40px] top-[60%] left-[30%] rounded-md rotate-12 animate-rotate`} style={{ animationDelay: "-10s" }} />
      <div className={`absolute ${darkMode ? "bg-white/10" : "bg-black/10"} w-[25px] h-[100px] bottom-[40%] right-[40%] rounded-full animate-pulse-slow`} style={{ animationDelay: "-8s" }} />
      
      {/* Dots pattern */}
      {[...Array(15)].map((_, i) => (
        <div 
          key={i}
          className={`absolute rounded-full ${darkMode ? "bg-white/15" : "bg-black/15"} w-[8px] h-[8px]`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`
          }}
        />
      ))}
      
      {/* Subtle line elements */}
      <div className={`absolute ${darkMode ? "bg-white/10" : "bg-black/10"} w-[2px] h-[150px] top-[10%] left-[80%]`} />
      <div className={`absolute ${darkMode ? "bg-white/10" : "bg-black/10"} w-[200px] h-[2px] bottom-[10%] left-[5%]`} />
      <div className={`absolute ${darkMode ? "bg-white/10" : "bg-black/10"} w-[2px] h-[80px] top-[40%] left-[25%] rotate-45`} />
      <div className={`absolute ${darkMode ? "bg-white/10" : "bg-black/10"} w-[100px] h-[2px] top-[35%] right-[5%] -rotate-12`} />
      
      {/* Add larger, more visible shapes */}
      <div className={`absolute ${darkMode ? "bg-white/5" : "bg-black/5"} w-[400px] h-[400px] bottom-[-100px] right-[-100px] rounded-full`} />
      <div className={`absolute ${darkMode ? "bg-white/5" : "bg-black/5"} w-[350px] h-[350px] top-[-50px] left-[-50px] rounded-full`} />
    </div>
  );
}