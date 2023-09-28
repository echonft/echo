'use client'
import { Header } from '@echo/ui/components/layout/header/header'
import { clsx } from 'clsx'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  session?: Session | null
}

export const HeaderContainer: FunctionComponent<PropsWithChildren<Props>> = ({ session, children }) => {
  return (
    <SessionProvider session={session}>
      <div className={clsx('w-full', 'h-full')}>
        <Header />
        <main className={clsx('w-full', 'pb-14')}>{children}</main>
      </div>
    </SessionProvider>
  )
}
