'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface HomeColor {
  bg: string
  accent: string
  text: string
}

const HomeColorContext = createContext<{
  homeColor: HomeColor | null
  setHomeColor: (color: HomeColor | null) => void
}>({
  homeColor: null,
  setHomeColor: () => {},
})

export function HomeColorProvider({ children }: { children: ReactNode }) {
  const [homeColor, setHomeColor] = useState<HomeColor | null>(null)

  return (
    <HomeColorContext.Provider value={{ homeColor, setHomeColor }}>
      {children}
    </HomeColorContext.Provider>
  )
}

export const useHomeColor = () => useContext(HomeColorContext)
