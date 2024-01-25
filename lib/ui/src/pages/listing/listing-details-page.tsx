'use client'
import { cancelListing } from '@echo/api/services/fetchers/cancel-listing'
import { createOffer } from '@echo/api/services/fetchers/create-offer'
import type { AuthUser } from '@echo/model/types/auth-user'
import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { ListingBanner } from '@echo/ui/components/listing/details/listing-banner'
import { ListingDetails } from '@echo/ui/components/listing/details/listing-details'
import { isListingRoleTarget } from '@echo/ui/helpers/listing/is-listing-role-target'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import type { FunctionComponent } from 'react'

interface Props {
  listing: ListingWithRole
  user: AuthUser
  userTargetNfts: Nft[] | undefined
  offers: Offer[] | undefined
}

export const ListingDetailsPage: FunctionComponent<Props> = ({ listing, user, userTargetNfts, offers }) => (
  <>
    <ShowIf condition={isListingRoleTarget(listing)}>
      <ListingBanner />
    </ShowIf>
    <ListingDetails
      listing={listing}
      user={user}
      userTargetNfts={userTargetNfts}
      offers={offers}
      fetcher={{ cancelListing, createOffer }}
    />
  </>
)
