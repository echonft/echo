import '@echo/ui-css/index.css'
import { actions } from '@echo/backend/actions/actions'
import { metadataDescription, metadataImageUrl, metadataTitle } from '@echo/frontend/lib/constants/metadata'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { User } from '@echo/model/types/user'
import { baseUrl } from '@echo/routing/helpers/base-url'
import { CalloutManager } from '@echo/ui/components/base/callout/callout-manager'
import { HeaderSkeleton } from '@echo/ui/components/base/header/skeleton/header-skeleton'
import { Dependencies } from '@echo/ui/components/base/layout/dependencies'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { ActionsProvider } from '@echo/ui/components/providers/actions-provider'
import { Web3Provider } from '@echo/ui/components/providers/web3-provider'
import { messages } from '@echo/ui/messages/en'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { type Metadata, type Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import dynamic from 'next/dynamic'
import type { PropsWithChildren } from 'react'

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

interface Props {
  user: User
}

const Header = dynamic(() => import('@echo/ui/components/base/header/header').then((mod) => mod.Header), {
  loading: () => <HeaderSkeleton />
})

async function render({ user, children }: PropsWithChildren<Props>) {
  const locale = 'en'
  return Promise.resolve(
    <html lang={locale} suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Web3Provider>
            <PageLayout>
              <ActionsProvider actions={actions}>
                <Dependencies>
                  <Header user={user} />
                  <MainSectionLayout>
                    {children}
                    <CalloutManager />
                  </MainSectionLayout>
                </Dependencies>
              </ActionsProvider>
            </PageLayout>
          </Web3Provider>
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}

export default withUser(render)
