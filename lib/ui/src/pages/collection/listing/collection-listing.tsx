'use client'
import { cancelListing } from '@echo/api/services/fetchers/cancel-listing'
import { type AuthUser } from '@echo/model/types/auth-user'
import type { Listing } from '@echo/model/types/listing'
import { PaddedContainer } from '@echo/ui/components/base/layout/padded-container'
import { ListingDetails } from '@echo/ui/components/listing/details/listing-details'
import { type FunctionComponent } from 'react'

interface Props {
  listing: Listing
  user: AuthUser | undefined
}

export const CollectionListing: FunctionComponent<Props> = ({ listing, user }) => {
  return (
    <PaddedContainer>
      <ListingDetails listing={listing} user={user} fetcher={{ cancelListing }} />
    </PaddedContainer>
  )
}
