import '@echo/ui/dist/index.css'
import '../../index.css'
import { authOptions } from '../../lib/constants/auth-options'
import { Header } from '@echo/ui'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { FunctionComponent, PropsWithChildren } from 'react'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)

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
        <div className={clsx('w-full', 'h-full')}>
          <Header user={session?.user} />
          <main className={clsx('w-full', 'pb-14')}>{children}</main>
        </div>
      </body>
    </html>
  )
}

export default Layout
