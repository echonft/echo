import { PageLayout, PageLayoutProps } from '@echo/ui/components/layout/page-layout'
import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

export const NavigationPageLayout: FunctionComponent<PropsWithChildren<PageLayoutProps>> = ({ user, children }) => {
  return (
    <PageLayout user={user}>
      <div className={clsx('flex', 'flex-col', 'w-full', 'gap-12')}>{children}</div>
    </PageLayout>
  )
}
