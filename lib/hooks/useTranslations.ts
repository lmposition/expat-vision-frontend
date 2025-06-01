import { useState, useEffect } from 'react'

type Translations = Record<string, string>

export const useTranslations = () => {
  const [t, setT] = useState<Translations>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTranslations = async () => {
      setLoading(true)
      const lang = navigator.language.startsWith('fr') ? 'fr' : 'en'
      try {
        const module = await import(`@/translations/${lang}.json`)
        setT(module.default as Translations)
      } catch (error) {
        const fallback = await import(`@/translations/en.json`)
        setT(fallback.default as Translations)
      } finally {
        setLoading(false)
      }
    }

    loadTranslations()
  }, [])

  return { t, loading }
}
