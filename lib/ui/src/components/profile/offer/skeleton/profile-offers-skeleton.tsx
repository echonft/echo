import { OfferCardsContainerSkeleton } from '@echo/ui/components/offer/card/layout/skeleton/offer-cards-container-skeleton'
import { ProfileNavigationLayoutSkeleton } from '@echo/ui/components/profile/navigation/skeleton/profile-navigation-layout-skeleton'
import { NAVIGATION_OFFERS_CREATED, NAVIGATION_OFFERS_RECEIVED } from '@echo/ui/constants/navigation-item'
import { type FunctionComponent } from 'react'

interface Props {
  activeNavigationItem: typeof NAVIGATION_OFFERS_RECEIVED | typeof NAVIGATION_OFFERS_CREATED
}

export const ProfileOffersSkeleton: FunctionComponent<Props> = ({ activeNavigationItem }) => {
  return (
    <ProfileNavigationLayoutSkeleton activeNavigationItem={activeNavigationItem}>
      <OfferCardsContainerSkeleton />
    </ProfileNavigationLayoutSkeleton>
  )
}
