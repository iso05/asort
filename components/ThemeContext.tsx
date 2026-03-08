'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'light',
  toggle: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  // Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('asort-theme') as Theme | null
    if (saved) setTheme(saved)
  }, [])

  // Update body background based on theme
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.background = theme === 'light' ? '#FFFFFF' : '#0F1729'
      document.body.style.transition = 'background 0.3s ease'
    }
  }, [theme])

  const toggle = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('asort-theme', next)
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
