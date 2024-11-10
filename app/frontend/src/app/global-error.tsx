'use client'
import type { NextErrorParams } from '@echo/frontend/lib/types/next-error-params'
import { HeaderSkeleton } from '@echo/ui/components/base/header/skeleton/header-skeleton'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { messages } from '@echo/ui/messages/en'
import { Error500Page } from '@echo/ui/pages/error/error-500-page'
import { captureException } from '@sentry/nextjs'
import { NextIntlClientProvider } from 'next-intl'
import { useEffect } from 'react'

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
            <HeaderSkeleton />
            <MainSectionLayout>
              <Error500Page onReset={reset} />
            </MainSectionLayout>
          </PageLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
