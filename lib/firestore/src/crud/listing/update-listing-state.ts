import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { assertListingStateTransition } from '@echo/model/helpers/listing/assert/assert-listing-state-transition'
import type { Listing } from '@echo/model/types/listing'
import { type ListingState } from '@echo/model/types/listing-state'
import { now } from '@echo/utils/helpers/now'

export async function updateListingState(id: string, state: ListingState): Promise<Listing> {
  const listing = await findListingById(id)
  assertListingStateTransition(listing, state)
  return updateReference<Listing>({
    collectionReference: getListingsCollectionReference(),
    id,
    data: { state, updatedAt: now() }
  })
}
