import { ListingRowsContainerSkeleton } from '@echo/ui/components/listing/layout/container/skeleton/listing-rows-container-skeleton'
import { ProfileNavigationLayoutSkeleton } from '@echo/ui/components/profile/layout/skeleton/profile-navigation-layout-skeleton'
import { NavigationListingsCreated, NavigationListingsReceived } from '@echo/ui/constants/navigation-item'
import type { FunctionComponent } from 'react'

interface Props {
  activeNavigationItem: typeof NavigationListingsCreated | typeof NavigationListingsReceived
}

export const ProfileListingsSkeleton: FunctionComponent<Props> = ({ activeNavigationItem }) => {
  return (
    <ProfileNavigationLayoutSkeleton activeNavigationItem={activeNavigationItem}>
      <ListingRowsContainerSkeleton />
    </ProfileNavigationLayoutSkeleton>
  )
}
