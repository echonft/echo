import { SwapRowsContainerSkeleton } from '@echo/ui/components/swap/layout/skeleton/swap-rows-container-skeleton'
import { UserNavigationLayoutSkeleton } from '@echo/ui/components/user/layout/skeleton/user-navigation-layout-skeleton'
import { NavigationSwaps } from '@echo/ui/constants/navigation-item'
import type { FunctionComponent } from 'react'

export const UserSwapsSkeleton: FunctionComponent = () => {
  return (
    <UserNavigationLayoutSkeleton activeNavigationItem={NavigationSwaps}>
      <SwapRowsContainerSkeleton />
    </UserNavigationLayoutSkeleton>
  )
}
