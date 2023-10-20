import { type AuthUser } from '@echo/model/types/auth-user'
import { Header } from '@echo/ui/components/layout/header/header'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export interface PageLayoutProps {
  user: AuthUser | undefined
}

export const PageLayout: FunctionComponent<PropsWithChildren<PageLayoutProps>> = ({ user, children }) => {
  return (
    <div className={clsx('w-full', 'h-full', 'bg-dark-500', 'overflow-y-auto')}>
      <Header user={user} />
      <main className={clsx('w-full', 'pb-14')}>{children}</main>
    </div>
  )
}
