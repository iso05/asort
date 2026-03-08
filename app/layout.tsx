import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeContext'
import { HomeColorProvider } from '@/components/HomeColorContext'
import { LanguageProvider } from '@/components/LanguageContext'
export const metadata: Metadata = {
  title: 'Asort — Premium Food Products',
  description:
    'Premium grains, legumes and food products sourced from the finest farms across Central Asia. Supplying 40+ countries worldwide.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#FFFFFF' }}>
        <ThemeProvider>
          <LanguageProvider>
            <HomeColorProvider>
              <Navbar />
              <main>{children}</main>
            </HomeColorProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
