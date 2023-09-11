import { ProfileOffersSkeleton } from '@echo/ui/src/components/profile/offer/skeleton/profile-offers-skeleton'
import { NavigationOffersReceived } from '@echo/ui/src/constants/navigation-item'
import type { FunctionComponent } from 'react'

const ProfileOffersCreatedLoading: FunctionComponent = () => {
  return <ProfileOffersSkeleton activeNavigationItem={NavigationOffersReceived} />
}

export default ProfileOffersCreatedLoading
