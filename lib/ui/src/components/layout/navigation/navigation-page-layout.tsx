import { PageLayout, type PageLayoutProps } from '@echo/ui/components/layout/page-layout'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const NavigationPageLayout: FunctionComponent<PropsWithChildren<PageLayoutProps>> = ({ user, children }) => {
  return (
    <PageLayout user={user}>
      <div className={clsx('flex', 'flex-col', 'w-full', 'gap-12')}>{children}</div>
    </PageLayout>
  )
}
