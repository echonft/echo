import { OfferRowsContainerSkeleton } from '@echo/ui/components/offer/layout/skeleton/offer-rows-container-skeleton'
import { ProfileNavigationLayoutSkeleton } from '@echo/ui/components/profile/layout/skeleton/profile-navigation-layout-skeleton'
import { NavigationSwaps } from '@echo/ui/constants/navigation-item'
import { type FunctionComponent } from 'react'

export const ProfileSwapsSkeleton: FunctionComponent = () => {
  return (
    <ProfileNavigationLayoutSkeleton activeNavigationItem={NavigationSwaps}>
      <OfferRowsContainerSkeleton />
    </ProfileNavigationLayoutSkeleton>
  )
}
