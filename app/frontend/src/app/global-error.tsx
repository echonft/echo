'use client'
import type { NextErrorParams } from '@echo/frontend/lib/types/next-error-params'
import { CalloutManager } from '@echo/ui/components/base/callout/callout-manager'
import { Dependencies } from '@echo/ui/components/base/layout/dependencies'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { messages } from '@echo/ui/messages/en'
import { Error500Page } from '@echo/ui/pages/error/error-500-page'
import { captureException } from '@sentry/nextjs'
import { NextIntlClientProvider } from 'next-intl'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const Header = dynamic(() => import('@echo/ui/components/base/header/header').then((mod) => mod.Header))

export default function ({ error, reset }: NextErrorParams) {
  const locale = 'en'
  useEffect(() => {
    captureException(error)
  }, [error])

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <PageLayout>
            <Dependencies>
              <Header user={undefined} />
              <MainSectionLayout>
                <Error500Page onReset={reset} />
                <CalloutManager />
              </MainSectionLayout>
            </Dependencies>
          </PageLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
