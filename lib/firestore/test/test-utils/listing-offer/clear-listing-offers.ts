import { deleteListingOffer } from '@test-utils/listing-offer/delete-listing-offer'
import { getAllListingOffers } from '@test-utils/listing-offer/get-all-listing-offers'

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
