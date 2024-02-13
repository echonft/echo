import '@echo/ui-css/index.css'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import type { NextLayoutParams } from '@echo/frontend/lib/types/next-layout-params'
import { DEFAULT_BANNER_URL } from '@echo/ui/constants/default-banner-url'
import { STACK_BG_URL } from '@echo/ui/constants/stack-bg-url'
import { messages } from '@echo/ui/messages/en'
import { SpeedInsights } from '@vercel/speed-insights/next'
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

function render({ children }: NextLayoutParams) {
  const locale = 'en'
  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <link rel="preload" as="image" href={DEFAULT_BANNER_URL} />
        <link rel="preload" as="image" href={STACK_BG_URL} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}

export default withLocale(render)
