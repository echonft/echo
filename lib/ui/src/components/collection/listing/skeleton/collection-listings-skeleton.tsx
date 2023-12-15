import { CollectionNavigationLayoutSkeleton } from '@echo/ui/components/collection/layout/skeleton/collection-navigation-layout-skeleton'
import { ListingRowsContainerSkeleton } from '@echo/ui/components/listing/layout/container/skeleton/listing-rows-container-skeleton'
import { NAVIGATION_LISTINGS } from '@echo/ui/constants/navigation-item'
import { type FunctionComponent } from 'react'

export const CollectionListingsSkeleton: FunctionComponent = () => {
  return (
    <CollectionNavigationLayoutSkeleton activeNavigationItem={NAVIGATION_LISTINGS}>
      <ListingRowsContainerSkeleton />
    </CollectionNavigationLayoutSkeleton>
  )
}
