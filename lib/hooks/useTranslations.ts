// lib/hooks/useTranslations.ts
'use client'

import { useState, useEffect } from 'react'

interface Translations {
  [key: string]: string
}

const translations: { fr: Translations; en: Translations } = {
  fr: {
    // Header translations
    "header-searchCountries": "Rechercher un pays...",
    "header-searching": "Recherche en cours...",
    "header-noCountriesFound": "Aucun pays trouvé",
    "header-notifications": "Notifications",
    "header-markAllRead": "Tout marquer lu",
    "header-newUpdate": "Nouvelle mise à jour",
    "header-documentAdded": "Document ajouté",
    "header-reminder": "Rappel",
    "header-settings": "Paramètres",
    "header-theme": "Thème",
    "header-lightMode": "Clair",
    "header-darkMode": "Sombre",
    "header-language": "Langue",
    "header-account": "Compte",
    "header-signIn": "Se connecter",
    "header-signOut": "Se déconnecter",
    "header-createAccount": "Créer un compte",
    "header-signInWithEmail": "Se connecter avec email",
    "header-continueWithGoogle": "Continuer avec Google",
    "header-continueWithApple": "Continuer avec Apple",
    "header-myAccount": "Mon Compte",
    "header-savedResources": "Ressources sauvegardées",
    "header-dashboard": "Dashboard",
    "header-countries": "Pays",
    "header-tools": "Outils",
    "header-resources": "Ressources",
    "header-noNotifications": "Aucune notification",
    "header-noSavedResources": "Aucune ressource sauvegardée",

    // Select page translations
    "select-currentLocation": "Je suis actuellement en",
    "select-wantTo": "Je veux",
    "select-to": "en",
    "select-asA": "en tant que",
    "select-select": "Sélectionner",
    "select-searchCountries": "Rechercher un pays...",
    "select-searchActions": "Rechercher une action...",
    "select-searchSituations": "Rechercher une situation...",
    "select-noResults": "Aucun résultat trouvé",
    "select-getYourGuide": "Obtenir mon guide",
    "select-loading": "Chargement...",
    "select-errorLoading": "Erreur de chargement",
    "select-EMPLOYEE": "Salarié",
    "select-BUSINESS_FOUNDER": "Créateur d'entreprise",
    "select-FREELANCE": "Freelance",
    "select-INVESTOR": "Investisseur",
    "select-EXPATRIATE": "m'expatrier",
    "select-CREATE_COMPANY": "créer une entreprise",
    "select-INVEST": "investir"
  },
  en: {
    // Header translations
    "header-searchCountries": "Search for a country...",
    "header-searching": "Searching...",
    "header-noCountriesFound": "No countries found",
    "header-notifications": "Notifications",
    "header-markAllRead": "Mark all as read",
    "header-newUpdate": "New update",
    "header-documentAdded": "Document added",
    "header-reminder": "Reminder",
    "header-settings": "Settings",
    "header-theme": "Theme",
    "header-lightMode": "Light",
    "header-darkMode": "Dark",
    "header-language": "Language",
    "header-account": "Account",
    "header-signIn": "Sign in",
    "header-signOut": "Sign out",
    "header-createAccount": "Create account",
    "header-signInWithEmail": "Sign in with email",
    "header-continueWithGoogle": "Continue with Google",
    "header-continueWithApple": "Continue with Apple",
    "header-myAccount": "My Account",
    "header-savedResources": "Saved Resources",
    "header-dashboard": "Dashboard",
    "header-countries": "Countries",
    "header-tools": "Tools",
    "header-resources": "Resources",
    "header-noNotifications": "No notifications",
    "header-noSavedResources": "No saved resources",

    // Select page translations
    "select-currentLocation": "I am currently in",
    "select-wantTo": "I want to",
    "select-to": "to",
    "select-asA": "as a",
    "select-select": "Select",
    "select-searchCountries": "Search countries...",
    "select-searchActions": "Search actions...",
    "select-searchSituations": "Search situations...",
    "select-noResults": "No results found",
    "select-getYourGuide": "Get Your Guide",
    "select-loading": "Loading...",
    "select-errorLoading": "Loading error",
    "select-EMPLOYEE": "Employee",
    "select-BUSINESS_FOUNDER": "Business Founder",
    "select-FREELANCE": "Freelancer",
    "select-INVESTOR": "Investor",
    "select-EXPATRIATE": "expatriate",
    "select-CREATE_COMPANY": "create a company",
    "select-INVEST": "invest"
  }
}

export const useTranslations = () => {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr')

  // Charger la langue depuis localStorage au démarrage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'fr' | 'en'
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Fonction pour changer la langue
  const changeLanguage = (newLanguage: 'fr' | 'en') => {
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  // Fonction de traduction
  const t = (key: string, fallback?: string) => {
    return translations[language][key] || fallback || key
  }

  return {
    t, // ← Maintenant c'est une fonction
    language,
    setLanguage: changeLanguage
  }
}