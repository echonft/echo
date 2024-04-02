import '@echo/ui-css/index.css'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import type { NextLayoutParams } from '@echo/frontend/lib/types/next-layout-params'
import { messages } from '@echo/ui/messages/en'
import { getBaseUrl } from '@echo/utils/helpers/get-base-url'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { type Metadata, type Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'

// noinspection JSUnusedGlobalSymbols
const title = 'Echo'
const description =
  'Experience secure, seamless NFT swapping with Echo! Our beta is now live on mainnet. Join the revolution today! 🚀'
const imageUrl = `https://storage.googleapis.com/${process.env.GOOGLE_STORAGE_BUCKET}/og-image.png?alt=media`
export const metadata: Metadata = {
  title,
  description,
  applicationName: title,
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
    other: [
      {
        url: '/icon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      },
      {
        url: '/icon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        url: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        url: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
  openGraph: {
    title,
    description,
    url: getBaseUrl(),
    siteName: 'Echo Beta',
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  other: {
    charset: 'utf-8'
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [imageUrl] // Must be an absolute URL
  }
}
// noinspection JSUnusedGlobalSymbols
export const viewport: Viewport = {
  colorScheme: 'dark',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#121212',
  width: 'device-width'
}

function render({ children }: NextLayoutParams) {
  const locale = 'en'
  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}

export default withLocale(render)
