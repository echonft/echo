/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  transpilePackages: ['@echo/api', '@echo/api-public', '@echo/discord', '@echo/ui', '@echo/ui-model', '@echo/utils']
}

module.exports = nextConfig
