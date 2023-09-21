import { assertListing } from '@echo/firestore/helpers/listing/assert/assert-listing'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import type { FirestoreListingState } from '@echo/firestore/types/model/listing/firestore-listing-state'

export function assertListingStateIs(
  listing: Partial<Partial<FirestoreListing>> | undefined,
  state: FirestoreListingState
): asserts listing is NonNullable<Partial<FirestoreListing>> {
  assertListing(listing)
  if (listing.state !== state) {
    throw Error(`listing state is not ${state}`)
  }
}
