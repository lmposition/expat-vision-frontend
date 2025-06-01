import React from "react";

// List of countries with their emoji flags
export type Country = {
  code: string;
  name: string;
  emoji: string;
};

// Predefined list of countries with emoji flags
export function getAllCountries(): Country[] {
  return [
    { code: "us", name: "United States", emoji: "🇺🇸" },
    { code: "ca", name: "Canada", emoji: "🇨🇦" },
    { code: "gb", name: "United Kingdom", emoji: "🇬🇧" },
    { code: "fr", name: "France", emoji: "🇫🇷" },
    { code: "de", name: "Germany", emoji: "🇩🇪" },
    { code: "es", name: "Spain", emoji: "🇪🇸" },
    { code: "it", name: "Italy", emoji: "🇮🇹" },
    { code: "jp", name: "Japan", emoji: "🇯🇵" },
    { code: "au", name: "Australia", emoji: "🇦🇺" },
    { code: "br", name: "Brazil", emoji: "🇧🇷" },
    { code: "ch", name: "Switzerland", emoji: "🇨🇭" },
    { code: "sg", name: "Singapore", emoji: "🇸🇬" },
    { code: "ae", name: "United Arab Emirates", emoji: "🇦🇪" },
    { code: "nz", name: "New Zealand", emoji: "🇳🇿" },
    { code: "pt", name: "Portugal", emoji: "🇵🇹" },
    { code: "nl", name: "Netherlands", emoji: "🇳🇱" },
    { code: "se", name: "Sweden", emoji: "🇸🇪" },
    { code: "no", name: "Norway", emoji: "🇳🇴" },
    { code: "fi", name: "Finland", emoji: "🇫🇮" },
    { code: "dk", name: "Denmark", emoji: "🇩🇰" },
    { code: "ie", name: "Ireland", emoji: "🇮🇪" },
    { code: "mx", name: "Mexico", emoji: "🇲🇽" },
    { code: "th", name: "Thailand", emoji: "🇹🇭" },
    { code: "vn", name: "Vietnam", emoji: "🇻🇳" },
    { code: "id", name: "Indonesia", emoji: "🇮🇩" },
    { code: "my", name: "Malaysia", emoji: "🇲🇾" },
  ];
}

// Function to get country data by code
export function getCountryByCode(code: string): Country | undefined {
  const countries = getAllCountries();
  return countries.find(country => country.code === code);
}

// Function to get country emoji by code
export function getCountryEmoji(code: string): string {
  const country = getCountryByCode(code);
  return country ? country.emoji : "🌍";
}

// Function to get country name by code
export function getCountryName(code: string): string {
  const country = getCountryByCode(code);
  return country ? country.name : "Select a country";
}