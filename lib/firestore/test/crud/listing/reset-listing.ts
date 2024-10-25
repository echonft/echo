import { listingMock } from '@echo/model/mocks/listing-mock'
import { updateListing } from '@echo/test/firestore/crud/listing/update-listing'

export function resetListing() {
  const listing = listingMock
  return updateListing(listing.slug, listing)
}
