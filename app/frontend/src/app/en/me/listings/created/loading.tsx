import { ProfileListingsSkeleton } from '@echo/ui/components/profile/listing/skeleton/profile-listings-skeleton'
import { NavigationListingsCreated } from '@echo/ui/constants/navigation-item'
import type { FunctionComponent } from 'react'

const ProfileListingsCreatedLoading: FunctionComponent = () => {
  return <ProfileListingsSkeleton activeNavigationItem={NavigationListingsCreated} />
}

export default ProfileListingsCreatedLoading
