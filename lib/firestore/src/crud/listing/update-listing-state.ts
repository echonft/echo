import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { assertListingStateTransition } from '@echo/model/helpers/listing/assert/assert-listing-state-transition'
import type { Listing } from '@echo/model/types/listing'
import { type ListingState } from '@echo/model/types/listing-state'
import { now } from '@echo/utils/helpers/now'
import { pipe } from 'ramda'

export async function updateListingState(listingId: string, state: ListingState): Promise<Listing> {
  const listing = await findListingById(listingId)
  assertListingStateTransition(listing, state)
  return pipe(getListingsCollectionReference, updateReference<Listing>(listingId, { state, updatedAt: now() }))()
}
