import type { AuthUser } from '@echo/model/types/auth-user'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  user: Nullable<AuthUser>
  excludeProviders?: boolean
}
export const NavigationPageLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  user,
  excludeProviders,
  children
}) => {
  return (
    <PageLayout user={user} excludeProviders={excludeProviders}>
      <div className={clsx('flex', 'flex-col', 'w-full', 'gap-12')}>{children}</div>
    </PageLayout>
  )
}
