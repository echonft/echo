import { CurrentUserOfferRowsContainerSkeleton } from '@echo/ui/components/offer/layout/container/skeleton/current-user-offer-rows-container-skeleton'
import { ProfileNavigationLayoutSkeleton } from '@echo/ui/components/profile/layout/skeleton/profile-navigation-layout-skeleton'
import { NavigationOffersCreated, NavigationOffersReceived, NavigationSwaps } from '@echo/ui/constants/navigation-item'
import type { FunctionComponent } from 'react'

interface Props {
  activeNavigationItem: typeof NavigationOffersReceived | typeof NavigationOffersCreated | typeof NavigationSwaps
}

export const ProfileOffersSkeleton: FunctionComponent<Props> = ({ activeNavigationItem }) => {
  return (
    <ProfileNavigationLayoutSkeleton activeNavigationItem={activeNavigationItem}>
      <CurrentUserOfferRowsContainerSkeleton />
    </ProfileNavigationLayoutSkeleton>
  )
}
