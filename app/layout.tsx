import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeContext'
import { HomeColorProvider } from '@/components/HomeColorContext'
import { LanguageProvider } from '@/components/LanguageContext'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://asort.uz'

const BRAND_KEYWORDS = [
  'asort',
  'asortuz',
  'asort.uz',
  'asort-uz',
  'asort uz',
  'Asort',
  'ASORT',
  'Asort uz',
  'Asort-uz',
  'Asort.uz',
  'ASORTUZ',
  'ASORT UZ',
  'ASORT.UZ',
]

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Shakar, Guruch, Mosh, Grechka, Fasol | Asort — asort.uz | +998 99 010 04 90',
    template: '%s | Asort — asort.uz',
  },
  description:
    'O‘zbekiston va Markaziy Osiyo bo‘yicha sifatli shakar, guruch (Alanga, Lazer), mosh, grechka va fasol oziq-ovqat mahsulotlari. Ulgurji va chakana savdo. Telefon: +998 99 010 04 90.',
  keywords: [
    ...BRAND_KEYWORDS,
    'shakar',
    'guruch',
    'fasol',
    'mosh',
    'grechka',
    'oziq-ovqat',
    'shakar ulgurji',
    'guruch alanga',
    'guruch lazer',
    'dukkaklilar',
    'shakar narxi',
    'guruch narxi',
    'fasol narxi',
    'mosh narxi',
    'asort oziq ovqat',
    'asort optom',
    '+998 99 010 04 90',
    '+998990100490',
    '990100490',
  ],
  authors: [{ name: 'Asort', url: BASE_URL }],
  creator: 'Asort',
  publisher: 'Asort',
  alternates: {
    canonical: BASE_URL,
    languages: {
      'uz-UZ': `${BASE_URL}/uz`,
      'ru-RU': `${BASE_URL}/ru`,
      'en-US': `${BASE_URL}/en`,
    },
  },
  openGraph: {
    title: 'Shakar, Guruch, Mosh, Grechka, Fasol | Asort — asort.uz',
    description:
      'O‘zbekiston va Markaziy Osiyoning eng sara oziq-ovqat mahsulotlari: shakar, guruch, mosh, grechka va fasol. Bog‘lanish: +998 99 010 04 90.',
    url: BASE_URL,
    siteName: 'Asort',
    locale: 'uz_UZ',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/images/hero-product.webp`,
        width: 1200,
        height: 630,
        alt: 'Asort Shakar, Guruch, Mosh, Grechka, Fasol',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shakar, Guruch, Mosh, Grechka, Fasol | Asort — asort.uz',
    description: 'Sifatli shakar, guruch, mosh, grechka va fasol. Telefon: +998 99 010 04 90',
    images: [`${BASE_URL}/images/hero-product.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Asort',
      legalName: 'Asort MChJ',
      alternateName: ['asort', 'asortuz', 'asort.uz', 'asort-uz', 'asort uz', 'Asort', 'ASORT', 'Asort uz', 'Asort-uz', 'Asort.uz', 'ASORTUZ'],
      url: BASE_URL,
      logo: `${BASE_URL}/images/logo.webp`,
      image: `${BASE_URL}/images/hero-product.webp`,
      description: 'O‘zbekistonda shakar, guruch, mosh, grechka va fasol oziq-ovqat mahsulotlarini yetkazib berish va eksport qilish.',
      telephone: '+998990100490',
      email: 'info@asort.uz',
      sameAs: [
        BASE_URL,
        'https://t.me/asortuz',
        'https://instagram.com/asort.uz',
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+998990100490',
          contactType: 'customer service',
          areaServed: ['UZ', 'RU', 'EN'],
          availableLanguage: ['Uzbek', 'Russian', 'English'],
        },
        {
          '@type': 'ContactPoint',
          telephone: '+998990100490',
          contactType: 'sales',
          areaServed: 'Worldwide',
          availableLanguage: ['Uzbek', 'Russian', 'English'],
        },
      ],
    },
    {
      '@type': 'WholesaleStore',
      '@id': `${BASE_URL}/#store`,
      name: 'Asort - Shakar, Guruch, Mosh, Grechka, Fasol',
      url: BASE_URL,
      telephone: '+998990100490',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Toshkent',
        addressCountry: 'UZ',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'Asort - asort.uz',
      alternateName: ['asort', 'asortuz', 'asort.uz', 'asort-uz', 'ASORTUZ'],
      description: 'Shakar, Guruch, Mosh, Grechka, Fasol oziq-ovqat mahsulotlari katalogi',
      publisher: { '@id': `${BASE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${BASE_URL}/uz/products?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale?: string }>
}) {
  const resolvedParams = await params
  const locale = resolvedParams?.locale || 'uz'

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
