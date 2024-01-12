import '@echo/ui-css/index.css'
import { messages } from '@echo/ui/messages/en'
import { type Metadata, type Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: 'Echo',
  description: 'Echo',
  applicationName: 'Echo',
  other: {
    charset: 'utf-8'
  }
}
export const viewport: Viewport = {
  colorScheme: 'dark',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#121212',
  width: 'device-width'
}

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const locale = 'en'
  unstable_setRequestLocale(locale)
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

export default Layout
