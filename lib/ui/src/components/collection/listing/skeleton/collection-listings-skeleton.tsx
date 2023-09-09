import { NavigationListings } from '../../../../constants/navigation-item'
import { ListingRowsContainerSkeleton } from '../../../listing/layout/container/skeleton/listing-rows-container-skeleton'
import { CollectionNavigationLayoutSkeleton } from '../../layout/skeleton/collection-navigation-layout-skeleton'
import { FunctionComponent } from 'react'

export const CollectionListingsSkeleton: FunctionComponent = () => {
  return (
    <CollectionNavigationLayoutSkeleton activeNavigationItem={NavigationListings}>
      <ListingRowsContainerSkeleton />
    </CollectionNavigationLayoutSkeleton>
  )
}
