/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ],
    unoptimized: true
  },
  swcMinify: true,
  transpilePackages: [
    '@echo/api',
    '@echo/firestore',
    '@echo/model',
    '@echo/opensea',
    '@echo/sentry',
    '@echo/ui',
    '@echo/utils',
    '@echo/web3',
    '@echo/web3-dom'
  ],
  webpack: (config) => {
    // noinspection JSUnresolvedReference
    config.externals.push('pino-pretty', 'lokijs', 'encoding', 'request')
    return config
  }
}

const withNextIntl = require('next-intl/plugin')()
module.exports = withNextIntl(nextConfig)

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: 'echo-nft',
    project: 'frontend'
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: false,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true
  }
)
