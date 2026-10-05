'use client'

import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from 'react'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'light',
  toggle: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = 'light'

  // Update body background to Light Warm Organic background (#FDFBF7)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.background = '#FDFBF7'
      document.body.style.transition = 'background 0.3s ease'
    }
  }, [])

  const toggle = () => {}

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

