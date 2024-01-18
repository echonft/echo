import { OfferRowsContainerSkeleton } from '@echo/ui/components/offer/layout/skeleton/offer-rows-container-skeleton'
import { ProfileNavigationLayoutSkeleton } from '@echo/ui/components/profile/navigation/skeleton/profile-navigation-layout-skeleton'
import { OfferCardsContainerSkeleton } from '@echo/ui/components/offer/layout/skeleton/offer-cards-container-skeleton'
import { NAVIGATION_SWAPS } from '@echo/ui/constants/navigation-item'
import { type FunctionComponent } from 'react'

export const ProfileSwapsSkeleton: FunctionComponent = () => {
  return (
    <ProfileNavigationLayoutSkeleton activeNavigationItem={NAVIGATION_SWAPS}>
      <OfferCardsContainerSkeleton />
    </ProfileNavigationLayoutSkeleton>
  )
}
