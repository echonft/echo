'use client'
import { Error500 } from '@echo/ui/components/error/error-500'
import { PageLayout } from '@echo/ui/components/layout/page-layout'
import { messages } from '@echo/ui/messages/en'
import { captureException } from '@sentry/nextjs'
import { NextIntlClientProvider } from 'next-intl'
import { type FunctionComponent, useEffect } from 'react'

interface Props {
  error: Error & Partial<Record<'digest', string>>
  reset: VoidFunction
}

const Error: FunctionComponent<Props> = ({ error, reset }) => {
  const locale = 'en'
  useEffect(() => {
    captureException(error)
  }, [error])

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <PageLayout headerVariants={{ logoOnly: true }}>
            <Error500 onReset={reset} />
          </PageLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default Error
