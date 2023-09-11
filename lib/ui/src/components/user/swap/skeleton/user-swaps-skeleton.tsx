import { NavigationSwaps } from '../../../../constants/navigation-item'
import { OfferRowsContainerSkeleton } from '../../../offer/layout/container/skeleton/offer-rows-container-skeleton'
import { UserNavigationLayoutSkeleton } from '../../layout/skeleton/user-navigation-layout-skeleton'
import { FunctionComponent } from 'react'

export const UserSwapsSkeleton: FunctionComponent = () => {
  return (
    <UserNavigationLayoutSkeleton activeNavigationItem={NavigationSwaps}>
      <OfferRowsContainerSkeleton />
    </UserNavigationLayoutSkeleton>
  )
}
