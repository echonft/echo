import { OfferRowsContainerSkeleton } from '@echo/ui/components/offer/layout/skeleton/offer-rows-container-skeleton'
import { ProfileNavigationLayoutSkeleton } from '@echo/ui/components/profile/layout/skeleton/profile-navigation-layout-skeleton'
import { NavigationOffersCreated, NavigationOffersReceived } from '@echo/ui/constants/navigation-item'
import type { FunctionComponent } from 'react'

interface Props {
  activeNavigationItem: typeof NavigationOffersReceived | typeof NavigationOffersCreated
}

export const ProfileOffersSkeleton: FunctionComponent<Props> = ({ activeNavigationItem }) => {
  return (
    <ProfileNavigationLayoutSkeleton activeNavigationItem={activeNavigationItem}>
      <OfferRowsContainerSkeleton />
    </ProfileNavigationLayoutSkeleton>
  )
}
