import type { AuthUser } from '@echo/model/types/auth-user'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  user: AuthUser | undefined
}
export const NavigationPageLayout: FunctionComponent<PropsWithChildren<Props>> = ({ user, children }) => {
  return (
    <PageLayout user={user}>
      <div className={clsx('flex', 'flex-col', 'w-full', 'gap-12')}>{children}</div>
    </PageLayout>
  )
}
