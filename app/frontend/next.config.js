// @ts-check
import nextIntl from 'next-intl/plugin'
import { withSentryConfig } from '@sentry/nextjs'
import NextBundleAnalyzer from '@next/bundle-analyzer'
import { hostname } from 'node:os'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [hostname()]
    },
    typedRoutes: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      }
    ],
    unoptimized: true
  },
  productionBrowserSourceMaps: true,
  swcMinify: true,
  transpilePackages: [
    '@echo/backend',
    '@echo/firestore',
    '@echo/model',
    '@echo/nft-scan',
    '@echo/routing',
    '@echo/ui',
    '@echo/utils',
    '@echo/web3',
    '@echo/web3-dom'
  ]
}
const withNextIntl = nextIntl('./src/i18n.ts')
const withSentry = withSentryConfig(withNextIntl(nextConfig))

export default NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: !process.env.CI,
  analyzerMode: process.env.CI ? 'json' : 'static',
  logLevel: process.env.CI ? 'silent' : 'info'
})(withSentry)
