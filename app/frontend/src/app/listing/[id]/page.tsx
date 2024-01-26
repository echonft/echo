import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { getPendingOffersForListing } from '@echo/firestore/crud/listing/get-pending-offers-for-listing'
import { getNftsForOwnerAndCollection } from '@echo/firestore/crud/nft/get-nfts-for-owner-and-collection'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextAuthUserParams } from '@echo/frontend/lib/types/next-auth-user-params'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import { isListingRoleCreator } from '@echo/ui/helpers/listing/is-listing-role-creator'
import { setListingRoleForUser } from '@echo/ui/helpers/listing/set-listing-role-for-user'
import { setOfferRoleForUser } from '@echo/ui/helpers/offer/set-offer-role-for-user'
import { ListingDetailsPage } from '@echo/ui/pages/listing/listing-details-page'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { notFound } from 'next/navigation'
import { andThen, head, isNil, map, pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextAuthUserParams<NextParams<Record<'id', string>>>

async function render({ params: { id }, user }: Params) {
  const listing = await pipe(findListingById, andThen(unlessNil(setListingRoleForUser(user))))(id)
  if (isNil(listing)) {
    notFound()
  }
  const isCreator = isListingRoleCreator(listing)
  // We only allow 1 target per listing atm
  const target = head(listing.targets)!
  // Fetch only the NFTs if user is not the creator
  const userTargetNfts = isCreator
    ? undefined
    : await getNftsForOwnerAndCollection(user.username, target.collection.slug)
  const offers = !isCreator
    ? undefined
    : await pipe(getPendingOffersForListing, andThen(map(setOfferRoleForUser(user))))(listing)

  return <ListingDetailsPage listing={listing} user={user} userTargetNfts={userTargetNfts} offers={offers} />
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
