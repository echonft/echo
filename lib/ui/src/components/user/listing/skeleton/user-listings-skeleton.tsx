import { ListingRowsContainerSkeleton } from '@echo/ui/components/listing/layout/container/skeleton/listing-rows-container-skeleton'
import { UserNavigationLayoutSkeleton } from '@echo/ui/components/user/layout/skeleton/user-navigation-layout-skeleton'
import { NavigationListings } from '@echo/ui/constants/navigation-item'
import { type FunctionComponent } from 'react'

export const UserListingsSkeleton: FunctionComponent = () => {
  return (
    <UserNavigationLayoutSkeleton activeNavigationItem={NavigationListings}>
      <ListingRowsContainerSkeleton />
    </UserNavigationLayoutSkeleton>
  )
}
