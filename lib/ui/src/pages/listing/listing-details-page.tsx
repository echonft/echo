'use client'
import { cancelListing } from '@echo/api/services/fetchers/cancel-listing'
import type { AuthUser } from '@echo/model/types/auth-user'
import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { ListingDetails } from '@echo/ui/components/listing/details/listing-details'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import type { FunctionComponent } from 'react'

interface Props {
  listing: ListingWithRole
  user: AuthUser
  userTargetNfts: Nft[] | undefined
  offers: Offer[] | undefined
}

export const ListingDetailsPage: FunctionComponent<Props> = ({ listing, user, userTargetNfts }) => (
  <ListingDetails listing={listing} user={user} userTargetNfts={userTargetNfts} fetcher={{ cancelListing }} />
)
