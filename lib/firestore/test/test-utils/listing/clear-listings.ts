import { getAllListings } from '@echo/firestore/crud/listing/get-all-listings'
import { deleteListing } from '@test-utils/listing/delete-listing'

export async function clearListings() {
  const listings = await getAllListings()
  for (const listing of listings) {
    try {
      await deleteListing(listing.id)
    } catch (e) {
      // nothing to do
    }
  }
}
