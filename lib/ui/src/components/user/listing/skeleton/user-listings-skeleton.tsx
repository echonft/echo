import { NavigationListings } from '../../../../constants/navigation-item'
import { ListingRowsContainerSkeleton } from '../../../listing/layout/container/skeleton/listing-rows-container-skeleton'
import { UserNavigationLayoutSkeleton } from '../../layout/skeleton/user-navigation-layout-skeleton'
import { FunctionComponent } from 'react'

export const UserListingsSkeleton: FunctionComponent = () => {
  return (
    <UserNavigationLayoutSkeleton activeNavigationItem={NavigationListings}>
      <ListingRowsContainerSkeleton />
    </UserNavigationLayoutSkeleton>
  )
}
