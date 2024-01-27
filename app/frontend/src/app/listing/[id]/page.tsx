import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { getPendingOffersForListing } from '@echo/firestore/crud/listing/get-pending-offers-for-listing'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { setListingRoleForUser } from '@echo/frontend/lib/helpers/listing/set-listing-role-for-user'
import { setOfferRoleForUser } from '@echo/frontend/lib/helpers/offer/set-offer-role-for-user'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import { getListingTargetsCollectionIds } from '@echo/model/helpers/listing/get-listing-targets-collection-ids'
import type { Nft } from '@echo/model/types/nft'
import { ListingDetailsPage } from '@echo/ui/pages/listing/listing-details-page'
import { isIn } from '@echo/utils/fp/is-in'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { notFound } from 'next/navigation'
import { andThen, filter, isNil, map, path, pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<NextParams<Record<'id', string>>>

async function render({ params: { id }, user }: Params) {
  const listing = await pipe(findListingById)(id)
  if (isNil(listing)) {
    notFound()
  }
  const nfts = isNil(user) ? [] : await getNftsForOwner(user.username)
  const listingWithRole = setListingRoleForUser(user, nfts)(listing)
  const listingTargets = getListingTargetsCollectionIds(listing)
  const userTargetNfts = filter(
    pipe<[Nft], string, boolean>(nonNullableReturn(path(['collection', 'id'])), isIn(listingTargets)),
    nfts
  )
  const offers = await pipe(getPendingOffersForListing, andThen(map(setOfferRoleForUser(user))))(listing)
  return <ListingDetailsPage listing={listingWithRole} user={user} userTargetNfts={userTargetNfts} offers={offers} />
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
