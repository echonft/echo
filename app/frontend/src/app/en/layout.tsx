import { authOptions } from '@app/api/auth/[...nextauth]/route'
import { Header } from '@echo/ui'
import { clsx } from 'clsx'
import { getServerSession } from 'next-auth/next'
import { FunctionComponent, PropsWithChildren } from 'react'

const Layout: FunctionComponent<PropsWithChildren> = async ({ children }) => {
  const session = await getServerSession(authOptions)

  return (
    <div className={clsx('w-screen', 'min-h-screen')}>
      <Header user={session?.user} />
      <main className={clsx('w-full')}>{children}</main>
    </div>
  )
}

export default Layout
