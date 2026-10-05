import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  output: 'export',

  // Set to empty for root domain hosting (e.g. cPanel, VPS, Netlify, custom domain)
  basePath: '',
  assetPrefix: '',

  images: {
    unoptimized: true,
  },

  trailingSlash: true,
}

export default nextConfig
