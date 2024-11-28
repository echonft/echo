'use client'
import { messages } from '@echo/ui/messages/en'
import { Error500Page } from '@echo/ui/pages/error/error-500-page'
import { NextIntlClientProvider } from 'next-intl'

interface Props {
  error: Error & Partial<Record<'digest', string>>
  reset: VoidFunction
}

export default function ({ error, reset }: Props) {
  const locale = 'en'

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Error500Page error={error} reset={reset} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
