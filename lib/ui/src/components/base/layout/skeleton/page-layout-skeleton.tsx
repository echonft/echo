import { HeaderSkeleton } from '@echo/ui/components/base/header/skeleton/header-skeleton'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import { type FunctionComponent } from 'react'

export const PageLayoutSkeleton: FunctionComponent<WithChildrenProps> = ({ children }) => {
  return (
    <div className={'page-layout'}>
      <HeaderSkeleton />
      <MainSectionLayout>{children}</MainSectionLayout>
    </div>
  )
}
