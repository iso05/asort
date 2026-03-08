'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

type Language = 'en' | 'ru' | 'uz'

const LanguageContext = createContext<{
  language: Language
  setLanguage: (lang: Language) => void
}>({
  language: 'en',
  setLanguage: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  // Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('asort-language') as Language | null
    if (saved) setLanguage(saved)
  }, [])

  const updateLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('asort-language', lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: updateLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
