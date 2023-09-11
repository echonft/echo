import '@echo/ui/dist/index.css'
import '../../index.css'
import { authOptions } from '@constants/auth-options'
import { Header } from '@echo/ui/src/components/layout/header/header'
import { messages } from '@echo/ui/src/messages/en'
import { clsx } from 'clsx'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { NextIntlClientProvider } from 'next-intl'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: 'Echo',
  description: 'Echo',
  applicationName: 'Echo',
  viewport: {
    width: 'device-width',
    initialScale: 1
  },
  other: {
    charset: 'utf-8'
  }
}

const Layout: FunctionComponent<PropsWithChildren> = async ({ children }) => {
  const session = await getServerSession(authOptions)

  return (
    <NextIntlClientProvider messages={messages} locale={'en'}>
      <div className={clsx('w-full', 'h-full')}>
        <Header user={session?.user} />
        <main className={clsx('w-full', 'pb-14')}>{children}</main>
      </div>
    </NextIntlClientProvider>
  )
}

export default Layout
