import { ProfileListingsSkeleton } from '@echo/ui/components/profile/listing/skeleton/profile-listings-skeleton'
import { NavigationListingsReceived } from '@echo/ui/constants/navigation-item'
import { type FunctionComponent } from 'react'

const ProfileListingsReceivedLoading: FunctionComponent = () => {
  return <ProfileListingsSkeleton activeNavigationItem={NavigationListingsReceived} />
}

export default ProfileListingsReceivedLoading
