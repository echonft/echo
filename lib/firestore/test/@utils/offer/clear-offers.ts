import { deleteOffer } from '@echo/firestore-test/offer/delete-offer'
import { getAllOffers } from '@echo/firestore-test/offer/get-all-offers'

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
