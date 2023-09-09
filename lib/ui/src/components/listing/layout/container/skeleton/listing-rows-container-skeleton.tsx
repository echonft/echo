import { ListingRowSkeleton } from '../../../row/skeleton/listing-row-skeleton'
import { ListingRowsLayout } from '../../listing-rows-layout'
import { FunctionComponent } from 'react'

export const ListingRowsContainerSkeleton: FunctionComponent = () => {
  return (
    <ListingRowsLayout>
      <ListingRowSkeleton />
    </ListingRowsLayout>
  )
}
