import { ProfileListingsSkeleton } from '@echo/ui/components/profile/listing/skeleton/profile-listings-skeleton'
import { NAVIGATION_LISTINGS_CREATED } from '@echo/ui/constants/navigation-item'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

const ProfileListingsCreatedLoading: FunctionComponent = () => {
  unstable_setRequestLocale('en')
  return <ProfileListingsSkeleton activeNavigationItem={NAVIGATION_LISTINGS_CREATED} />
}

export default ProfileListingsCreatedLoading
