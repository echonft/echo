import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { ListingDetailsSkeleton } from '@echo/ui/components/listing/details/skeleton/listing-details-skeleton'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

const ListingDetailsLoading: FunctionComponent = () => {
  unstable_setRequestLocale('en')
  return (
    <PaddedContainer>
      <ListingDetailsSkeleton />
    </PaddedContainer>
  )
}

export default ListingDetailsLoading
