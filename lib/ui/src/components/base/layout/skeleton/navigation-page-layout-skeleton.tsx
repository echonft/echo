import { PageLayoutSkeleton } from '@echo/ui/components/base/layout/skeleton/page-layout-skeleton'
import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import { type FunctionComponent } from 'react'

export const NavigationPageLayoutSkeleton: FunctionComponent<WithChildrenProps> = ({ children }) => {
  return (
    <PageLayoutSkeleton>
      <div className={'navigation-page-layout'}>{children}</div>
    </PageLayoutSkeleton>
  )
}
