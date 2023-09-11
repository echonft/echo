import { NavigationSwaps } from '../../../../constants/navigation-item'
import { OfferRowsContainerSkeleton } from '../../../offer/layout/container/skeleton/offer-rows-container-skeleton'
import { CollectionNavigationLayoutSkeleton } from '../../layout/skeleton/collection-navigation-layout-skeleton'
import { FunctionComponent } from 'react'

export const CollectionSwapsSkeleton: FunctionComponent = () => {
  return (
    <CollectionNavigationLayoutSkeleton activeNavigationItem={NavigationSwaps}>
      <OfferRowsContainerSkeleton />
    </CollectionNavigationLayoutSkeleton>
  )
}
