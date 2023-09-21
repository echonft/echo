import { deleteListing } from '@echo/firestore/crud/listing/delete-listing'
import { getAllListings } from '@echo/firestore/crud/listing/get-all-listings'

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
