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
  experimental: {
    externalDir: true
  }
}

module.exports = nextConfig
