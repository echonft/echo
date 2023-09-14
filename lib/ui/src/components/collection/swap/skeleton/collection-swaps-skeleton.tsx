import { CollectionNavigationLayoutSkeleton } from '@echo/ui/components/collection/layout/skeleton/collection-navigation-layout-skeleton'
import { OfferRowsContainerSkeleton } from '@echo/ui/components/offer/layout/container/skeleton/offer-rows-container-skeleton'
import { NavigationSwaps } from '@echo/ui/constants/navigation-item'
import type { FunctionComponent } from 'react'

export const CollectionSwapsSkeleton: FunctionComponent = () => {
  return (
    <CollectionNavigationLayoutSkeleton activeNavigationItem={NavigationSwaps}>
      <OfferRowsContainerSkeleton />
    </CollectionNavigationLayoutSkeleton>
  )
}
