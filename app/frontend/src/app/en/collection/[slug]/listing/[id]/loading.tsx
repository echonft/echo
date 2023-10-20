import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { ListingDetailsSkeleton } from '@echo/ui/components/listing/details/skeleton/listing-details-skeleton'
import { type FunctionComponent } from 'react'

const ListingDetailsLoading: FunctionComponent = () => {
  return (
    <PaddedContainer>
      <ListingDetailsSkeleton />
    </PaddedContainer>
  )
}

export default ListingDetailsLoading
