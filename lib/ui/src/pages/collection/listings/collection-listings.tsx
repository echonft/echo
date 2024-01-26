import { ListingCardsContainer } from '@echo/ui/components/listing/card/layout/listing-cards-container'
import { CollectionListingsEmpty } from '@echo/ui/pages/collection/listings/collection-listings-empty'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  listings: ListingWithRole[]
}

export const CollectionListings: FunctionComponent<Props> = ({ listings }) => {
  if (isEmpty(listings)) {
    return <CollectionListingsEmpty />
  }
  return <ListingCardsContainer listings={listings} />
}
