import { assertListing } from '@echo/firestore/helpers/listing/assert/assert-listing'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'

export function assertListingStateIsOpen(
  listing: FirestoreListing | undefined
): asserts listing is NonNullable<FirestoreListing> {
  assertListing(listing)
  if (listing.state !== 'OPEN') {
    throw Error('listing state is not OPEN')
  }
}
