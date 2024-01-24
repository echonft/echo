import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { assertListingStateTransition } from '@echo/model/helpers/listing/assert/assert-listing-state-transition'
import type { Listing } from '@echo/model/types/listing'
import { type ListingState } from '@echo/model/types/listing-state'
import { now } from '@echo/utils/helpers/now'
import { always, assoc, pick, pipe } from 'ramda'

export async function updateListingState(listingId: string, state: ListingState): Promise<Listing> {
  const listing = await findListingById(listingId)
  assertListingStateTransition(listing, state)
  const updatedListing = pipe<[Listing], Listing, Listing>(assoc('state', state), assoc('updatedAt', now()))(listing)
  return pipe(
    getListingsCollectionReference,
    updateReference(listingId, pick(['state', 'updatedAt'], updatedListing)),
    always(updatedListing)
  )()
}
