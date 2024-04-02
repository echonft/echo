import '@echo/ui-css/index.css'
import { METADATA_DESCRIPTION, METADATA_IMAGE_URL, METADATA_TITLE } from '@echo/frontend/constants/metadata'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import type { NextLayoutParams } from '@echo/frontend/lib/types/next-layout-params'
import { messages } from '@echo/ui/messages/en'
import { getBaseUrl } from '@echo/utils/helpers/get-base-url'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { type Metadata, type Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'

// noinspection JSUnusedGlobalSymbols
export const metadata: Metadata = {
  title: METADATA_TITLE,
  description: METADATA_DESCRIPTION,
  applicationName: METADATA_TITLE,
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
    title: METADATA_TITLE,
    description: METADATA_DESCRIPTION,
    url: getBaseUrl(),
    siteName: 'Echo Beta',
    images: [
      {
        url: METADATA_IMAGE_URL,
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
    title: METADATA_TITLE,
    description: METADATA_DESCRIPTION,
    images: [METADATA_IMAGE_URL] // Must be an absolute URL
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
