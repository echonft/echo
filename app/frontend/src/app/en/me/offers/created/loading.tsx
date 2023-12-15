import { ProfileOffersSkeleton } from '@echo/ui/components/profile/offer/skeleton/profile-offers-skeleton'
import { NAVIGATION_OFFERS_CREATED } from '@echo/ui/constants/navigation-item'
import { type FunctionComponent } from 'react'

const ProfileOffersCreatedLoading: FunctionComponent = () => {
  return <ProfileOffersSkeleton activeNavigationItem={NAVIGATION_OFFERS_CREATED} />
}

export default ProfileOffersCreatedLoading
