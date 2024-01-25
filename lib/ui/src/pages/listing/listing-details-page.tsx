'use client'
import { cancelListing } from '@echo/api/services/fetchers/cancel-listing'
import type { AuthUser } from '@echo/model/types/auth-user'
import type { Listing } from '@echo/model/types/listing'
import type { Nft } from '@echo/model/types/nft'
import { ListingDetails } from '@echo/ui/components/listing/details/listing-details'
import type { FunctionComponent } from 'react'

interface Props {
  listing: Listing
  user: AuthUser
  userTargetNfts: Nft[]
}

export const ListingDetailsPage: FunctionComponent<Props> = ({ listing, user, userTargetNfts }) => (
  <ListingDetails listing={listing} user={user} userTargetNfts={userTargetNfts} fetcher={{ cancelListing }} />
)
