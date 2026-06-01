"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { translations, type Locale, type Translations } from "@/lib/translations"

type LanguageContextValue = {
  locale: Locale
  t: Translations
  toggle: () => void
  transitioning: boolean
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
  t: translations.en,
  toggle: () => {},
  transitioning: false,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null
    if (saved === "en" || saved === "ja") setLocale(saved)
  }, [])

  const toggle = useCallback(() => {
    // Fade out → swap locale → fade in
    setTransitioning(true)
    setTimeout(() => {
      setLocale((prev) => {
        const next: Locale = prev === "en" ? "ja" : "en"
        localStorage.setItem("locale", next)
        return next
      })
      setTimeout(() => setTransitioning(false), 120)
    }, 150)
  }, [])

  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale], toggle, transitioning }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
