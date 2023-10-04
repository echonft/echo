import { ListingRowsLayout } from '@echo/ui/components/listing/layout/listing-rows-layout'
import { ListingRow } from '@echo/ui/components/listing/row/listing-row'
import type { Listing } from '@echo/ui/types/model/listing'
import { map } from 'ramda'
import type { FunctionComponent } from 'react'

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
