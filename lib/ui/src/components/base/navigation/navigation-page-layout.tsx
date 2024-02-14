import type { AuthUser } from '@echo/model/types/auth-user'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { classes } from '@echo/ui/helpers/classes'
import type { Nullable } from '@echo/utils/types/nullable'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  user: Nullable<AuthUser>
}
export const NavigationPageLayout: FunctionComponent<PropsWithChildren<Props>> = ({ user, children }) => {
  return (
    <PageLayout user={user}>
      <div className={classes('flex', 'flex-col', 'w-full', 'gap-12')}>{children}</div>
    </PageLayout>
  )
}
