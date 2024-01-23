import '@echo/ui-css/index.css'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import type { NextLayoutParams } from '@echo/frontend/lib/types/next-layout-params'
import { messages } from '@echo/ui/messages/en'
import { type Metadata, type Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'

// noinspection JSUnusedGlobalSymbols
export const metadata: Metadata = {
  title: 'Echo',
  description: 'Echo',
  applicationName: 'Echo',
  other: {
    charset: 'utf-8'
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

export default async function ({ children }: NextLayoutParams) {
  await initializeServerComponent()
  const locale = 'en'
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
