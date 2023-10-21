/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  swcMinify: true,
  transpilePackages: ['@echo/alchemy', '@echo/api', '@echo/discord', '@echo/firestore', '@echo/ui', '@echo/utils'],
  typescript: {
    ignoreBuildErrors: true
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  }
}

const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './src/i18n.ts'
)

module.exports = withNextIntl(nextConfig)
