import { OfferRowsContainerSkeleton } from '@echo/ui/components/offer/layout/container/skeleton/offer-rows-container-skeleton'
import { UserNavigationLayoutSkeleton } from '@echo/ui/components/user/layout/skeleton/user-navigation-layout-skeleton'
import { NavigationSwaps } from '@echo/ui/constants/navigation-item'
import type { FunctionComponent } from 'react'

export const UserSwapsSkeleton: FunctionComponent = () => {
  return (
    <UserNavigationLayoutSkeleton activeNavigationItem={NavigationSwaps}>
      <OfferRowsContainerSkeleton />
    </UserNavigationLayoutSkeleton>
  )
}
