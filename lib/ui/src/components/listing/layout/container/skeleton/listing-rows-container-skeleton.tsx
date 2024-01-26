import { ListingRowsLayout } from '@echo/ui/components/listing/layout/listing-rows-layout'
import { ListingRowSkeleton } from '@echo/ui/components/listing/row/skeleton/listing-row-skeleton'
import { type FunctionComponent } from 'react'

// TODO Delete
export const ListingRowsContainerSkeleton: FunctionComponent = () => {
  return (
    <ListingRowsLayout>
      <ListingRowSkeleton />
    </ListingRowsLayout>
  )
}
