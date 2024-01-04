import { ProfileListingsSkeleton } from '@echo/ui/components/profile/listing/skeleton/profile-listings-skeleton'
import { NAVIGATION_LISTINGS_RECEIVED } from '@echo/ui/constants/navigation-item'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

const ProfileListingsReceivedLoading: FunctionComponent = () => {
  unstable_setRequestLocale('en')
  return <ProfileListingsSkeleton activeNavigationItem={NAVIGATION_LISTINGS_RECEIVED} />
}

export default ProfileListingsReceivedLoading
