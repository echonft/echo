import '@echo/ui/dist/index.css'
import '../../index.css'
import { Providers } from '../../components/providers'
import { authOptions } from '../../lib/constants/auth-options'
import { Header } from '@echo/ui'
import { clsx } from 'clsx'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { FunctionComponent, PropsWithChildren } from 'react'

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
    <html lang="en">
      <body>
        <Providers session={session}>
          <div className={clsx('w-full', 'h-full')}>
            <Header user={session?.user} />
            <main className={clsx('w-full')}>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}

export default Layout
