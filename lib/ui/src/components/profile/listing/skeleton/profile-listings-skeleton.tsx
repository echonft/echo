import { ListingRowsContainerSkeleton } from '@echo/ui/components/listing/layout/container/skeleton/listing-rows-container-skeleton'
import { ProfileNavigationLayoutSkeleton } from '@echo/ui/components/profile/navigation/skeleton/profile-navigation-layout-skeleton'
import { NAVIGATION_LISTINGS_CREATED, NAVIGATION_LISTINGS_RECEIVED } from '@echo/ui/constants/navigation-item'
import { type FunctionComponent } from 'react'

interface Props {
  activeNavigationItem: typeof NAVIGATION_LISTINGS_CREATED | typeof NAVIGATION_LISTINGS_RECEIVED
}

export const ProfileListingsSkeleton: FunctionComponent<Props> = ({ activeNavigationItem }) => {
  return (
    <ProfileNavigationLayoutSkeleton activeNavigationItem={activeNavigationItem}>
      <ListingRowsContainerSkeleton />
    </ProfileNavigationLayoutSkeleton>
  )
}
