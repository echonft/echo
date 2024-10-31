// @ts-check
import nextIntl from 'next-intl/plugin'
import { withSentryConfig } from '@sentry/nextjs'
import NextBundleAnalyzer from '@next/bundle-analyzer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
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
  swcMinify: true,
  transpilePackages: [
    '@echo/api',
    '@echo/backend',
    '@echo/firestore',
    '@echo/model',
    '@echo/nft-scan',
    '@echo/opensea',
    '@echo/routing',
    '@echo/tasks',
    '@echo/ui',
    '@echo/utils',
    '@echo/web3',
    '@echo/web3-dom'
  ]
}
const withNextIntl = nextIntl('./src/i18n.ts')
const withSentry = withSentryConfig(withNextIntl(nextConfig), {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options
  org: 'echo-nft',
  project: 'frontend',
  autoInstrumentMiddleware: false,
  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,
  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',
  // Hides source maps from generated client bundles
  hideSourceMaps: true,
  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,
  deploy: {
    env: process.env.ENV
  }
})

export default NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: !process.env.CI,
  analyzerMode: process.env.CI ? 'json' : 'static',
  logLevel: process.env.CI ? 'silent' : 'info'
})(withSentry)
