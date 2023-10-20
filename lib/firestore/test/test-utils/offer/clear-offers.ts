import { getAllOffers } from '@echo/firestore/crud/offer/get-all-offers'
import { deleteOffer } from '@test-utils/offer/delete-offer'

export async function clearOffers() {
  const offers = await getAllOffers()
  for (const offer of offers) {
    try {
      await deleteOffer(offer.id)
    } catch (e) {
      // nothing to do
    }
  }
}
