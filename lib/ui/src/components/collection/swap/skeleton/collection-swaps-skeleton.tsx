import { CollectionNavigationLayoutSkeleton } from '@echo/ui/components/collection/layout/skeleton/collection-navigation-layout-skeleton'
import { SwapRowsContainerSkeleton } from '@echo/ui/components/swap/layout/skeleton/swap-rows-container-skeleton'
import { NavigationSwaps } from '@echo/ui/constants/navigation-item'
import { type FunctionComponent } from 'react'

export const CollectionSwapsSkeleton: FunctionComponent = () => {
  return (
    <CollectionNavigationLayoutSkeleton activeNavigationItem={NavigationSwaps}>
      <SwapRowsContainerSkeleton />
    </CollectionNavigationLayoutSkeleton>
  )
}
