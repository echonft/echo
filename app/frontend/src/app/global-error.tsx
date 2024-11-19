'use client'
import { Error as ErrorComponent } from '@echo/ui/components/error/error'
import { messages } from '@echo/ui/messages/en'
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
          <ErrorComponent error={error} reset={reset} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
