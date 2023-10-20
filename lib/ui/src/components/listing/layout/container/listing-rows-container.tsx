import { type Listing } from '@echo/model/types/listing'
import { ListingRowsLayout } from '@echo/ui/components/listing/layout/listing-rows-layout'
import { ListingRow } from '@echo/ui/components/listing/row/listing-row'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  listings: Listing[]
}

export const ListingRowsContainer: FunctionComponent<Props> = ({ listings }) => {
  return (
    <ListingRowsLayout>
      {map(
        (listing) => (
          <ListingRow key={listing.id} listing={listing} />
        ),
        listings
      )}
    </ListingRowsLayout>
  )
}
