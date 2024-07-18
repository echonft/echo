import type { User } from '@echo/auth/types/user'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import type { Nullable } from '@echo/utils/types/nullable'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  user: Nullable<User>
  excludeProviders?: boolean
}

export const NavigationPageLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  user,
  excludeProviders,
  children
}) => {
  return (
    <PageLayout user={user} excludeProviders={excludeProviders}>
      <div className={'navigation-page-layout'}>{children}</div>
    </PageLayout>
  )
}
