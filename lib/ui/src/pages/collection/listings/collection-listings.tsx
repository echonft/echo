'use client'
import type { AuthUser } from '@echo/model/types/auth-user'
import { type Listing } from '@echo/model/types/listing'
import { ListingRowsContainer } from '@echo/ui/components/listing/layout/container/listing-rows-container'
import { CollectionListingsEmpty } from '@echo/ui/pages/collection/listings/collection-listings-empty'
import { isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  listings: Listing[]
  user: AuthUser | undefined
}

export const CollectionListings: FunctionComponent<Props> = ({ listings, user }) => {
  if (isEmpty(listings)) {
    return <CollectionListingsEmpty />
  }
  return <ListingRowsContainer listings={listings} user={user} />
}
