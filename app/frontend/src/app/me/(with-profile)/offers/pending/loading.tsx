import { ProfileOffersSkeleton } from '@echo/ui/components/profile/offer/skeleton/profile-offers-skeleton'
import { NAVIGATION_OFFERS_RECEIVED } from '@echo/ui/constants/navigation-item'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

const ProfileOffersCreatedLoading: FunctionComponent = () => {
  unstable_setRequestLocale('en')
  return <ProfileOffersSkeleton activeNavigationItem={NAVIGATION_OFFERS_RECEIVED} />
}

export default ProfileOffersCreatedLoading
