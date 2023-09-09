import { NavigationListings } from '../../../../constants/navigation-item'
import { ListingRowSkeleton } from '../../../listing/row/skeleton/listing-row-skeleton'
import { CollectionNavigationLayoutSkeleton } from '../../layout/skeleton/collection-navigation-layout-skeleton'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const CollectionListingsSkeleton: FunctionComponent = () => {
  return (
    <CollectionNavigationLayoutSkeleton activeNavigationItem={NavigationListings}>
      <div className={clsx('flex', 'flex-col', 'self-stretch', 'grow', 'w-full', 'gap-12')}>
        <ListingRowSkeleton />
      </div>
    </CollectionNavigationLayoutSkeleton>
  )
}
