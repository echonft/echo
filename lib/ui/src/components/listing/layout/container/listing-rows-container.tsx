import { ListingRow } from '../../row/listing-row'
import { ListingRowsLayout } from '../listing-rows-layout'
import type { Listing } from '@echo/ui-model'
import { map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  listings: Array<Listing>
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
