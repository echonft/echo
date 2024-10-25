import '@echo/ui-css/index.css'
import { metadataDescription, metadataImageUrl, metadataTitle } from '@echo/frontend/lib/constants/metadata'
import { baseUrl } from '@echo/routing/helpers/base-url'
import { messages } from '@echo/ui/messages/en'
import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { type Metadata, type Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'

// noinspection JSUnusedGlobalSymbols
export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  applicationName: metadataTitle,
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
    title: metadataTitle,
    description: metadataDescription,
    url: baseUrl(),
    siteName: 'Echo Beta',
    images: [
      {
        url: metadataImageUrl,
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
    title: metadataTitle,
    description: metadataDescription,
    images: [metadataImageUrl] // Must be an absolute URL
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

export default function render({ children }: WithChildrenProps) {
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
