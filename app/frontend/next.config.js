/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  transpilePackages: ['@echo/alchemy', '@echo/api', '@echo/discord', '@echo/firestore', '@echo/ui', '@echo/utils']
}

const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './src/i18n.ts'
)

module.exports = withNextIntl(nextConfig)
