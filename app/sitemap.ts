import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://asort.uz'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['uz', 'ru', 'en']
  const routes = ['', '/products', '/about', '/contact', '/news', '/partners']

  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const route of routes) {
      const url = `${BASE_URL}/${locale}${route}`
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === '' || route === '/products' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : route === '/products' ? 0.9 : 0.8,
      })
    }
  }

  return entries
}
