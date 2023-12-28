import { HeaderNoUser } from '@echo/ui/components/layout/header/header-no-user'
import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const AuthPage: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <div className={clsx('w-full', 'h-full', 'bg-dark-500', 'overflow-y-auto')}>
    <HeaderNoUser />
    <main className={clsx('w-full', 'pb-14')}>
      <div className={clsx('flex', 'flex-col', 'w-full', 'gap-12')}>{children}</div>
    </main>
  </div>
)
