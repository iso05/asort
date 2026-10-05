'use client'

import {
  createContext,
  useContext,
  ReactNode,
} from 'react'
import { useParams, useRouter, usePathname } from 'next/navigation'

type Language = 'uz' | 'ru' | 'en'

const LanguageContext = createContext<{
  language: Language
  setLanguage: (lang: Language) => void
}>({
  language: 'uz',
  setLanguage: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const params = useParams()
  const router = useRouter()
  const pathname = usePathname()

  const routeLocale = params?.locale as Language | undefined
  const language = routeLocale || 'uz'

  const updateLanguage = (lang: Language) => {
    const segments = pathname.split('/')
    if (segments.length > 1 && ['uz', 'ru', 'en'].includes(segments[1])) {
      segments[1] = lang
    } else {
      segments.splice(1, 0, lang)
    }
    router.push(segments.join('/'))
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: updateLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
