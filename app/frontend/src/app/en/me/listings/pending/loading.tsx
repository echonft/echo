import { ProfileListingsSkeleton } from '@echo/ui/components/profile/listing/skeleton/profile-listings-skeleton'
import { NAVIGATION_LISTINGS_RECEIVED } from '@echo/ui/constants/navigation-item'
import { type FunctionComponent } from 'react'

const ProfileListingsReceivedLoading: FunctionComponent = () => {
  return <ProfileListingsSkeleton activeNavigationItem={NAVIGATION_LISTINGS_RECEIVED} />
}

export default ProfileListingsReceivedLoading
