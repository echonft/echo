import { ProfileOffersSkeleton } from '@echo/ui/src/components/profile/offer/skeleton/profile-offers-skeleton'
import { NavigationOffersCreated } from '@echo/ui/src/constants/navigation-item'
import type { FunctionComponent } from 'react'

const ProfileOffersCreatedLoading: FunctionComponent = () => {
  return <ProfileOffersSkeleton activeNavigationItem={NavigationOffersCreated} />
}

export default ProfileOffersCreatedLoading
