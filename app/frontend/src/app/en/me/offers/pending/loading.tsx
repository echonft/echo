import { ProfileOffersSkeleton } from '@echo/ui/components/profile/offer/skeleton/profile-offers-skeleton'
import { NavigationOffersReceived } from '@echo/ui/constants/navigation-item'
import { type FunctionComponent } from 'react'

const ProfileOffersCreatedLoading: FunctionComponent = () => {
  return <ProfileOffersSkeleton activeNavigationItem={NavigationOffersReceived} />
}

export default ProfileOffersCreatedLoading
