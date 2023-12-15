import { ProfileListingsSkeleton } from '@echo/ui/components/profile/listing/skeleton/profile-listings-skeleton'
import { NAVIGATION_LISTINGS_CREATED } from '@echo/ui/constants/navigation-item'
import { type FunctionComponent } from 'react'

const ProfileListingsCreatedLoading: FunctionComponent = () => {
  return <ProfileListingsSkeleton activeNavigationItem={NAVIGATION_LISTINGS_CREATED} />
}

export default ProfileListingsCreatedLoading
