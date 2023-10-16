import { assertListing } from '@echo/firestore/helpers/listing/assert/assert-listing'
import type { Listing } from '@echo/model/types/listing'

export function assertListingStateIsOpen(listing: Listing | undefined): asserts listing is NonNullable<Listing> {
  assertListing(listing)
  if (listing.state !== 'OPEN') {
    throw Error('listing state is not OPEN')
  }
}
