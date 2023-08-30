import '@echo/ui/dist/index.css'
import { authOptions } from '../pages-temp/api/auth/[...nextauth]'
import { Providers } from '@components/providers'
import { Header } from '@echo/ui'
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
        <Header user={session?.user} />
        <main>
          <Providers session={session}>{children}</Providers>
        </main>
      </body>
    </html>
  )
}

export default Layout
