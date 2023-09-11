import { ProfileOffersSkeleton } from '@echo/ui/src/components/profile/offer/skeleton/profile-offers-skeleton'
import { NavigationSwaps } from '@echo/ui/src/constants/navigation-item'
import type { FunctionComponent } from 'react'

const ProfileSwapsLoading: FunctionComponent = () => {
  return <ProfileOffersSkeleton activeNavigationItem={NavigationSwaps} />
}

export default ProfileSwapsLoading
