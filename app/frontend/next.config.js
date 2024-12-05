// @ts-check
import nextIntl from 'next-intl/plugin'
import { withSentryConfig } from '@sentry/nextjs'
import NextBundleAnalyzer from '@next/bundle-analyzer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
      ]
    }
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
  swcMinify: true,
  webpack: (config) => {
    config.devtool = 'hidden-source-map'
    return config
  }
}
const withNextIntl = nextIntl('./src/i18n.ts')
const withSentry = withSentryConfig(withNextIntl(nextConfig), { sourcemaps: { deleteSourcemapsAfterUpload: true } })

export default NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: !process.env.CI,
  analyzerMode: process.env.CI ? 'json' : 'static',
  logLevel: process.env.CI ? 'silent' : 'info'
})(withSentry)
