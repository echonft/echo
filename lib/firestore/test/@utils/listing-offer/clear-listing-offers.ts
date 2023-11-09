import { deleteListingOffer } from '@echo/firestore-test/listing-offer/delete-listing-offer'
import { getAllListingOffers } from '@echo/firestore-test/listing-offer/get-all-listing-offers'

export async function clearListingOffers() {
  const documents = await getAllListingOffers()
  for (const document of documents) {
    try {
      await deleteListingOffer(document.id)
    } catch (e) {
      // nothing to do
    }
  }
}
