import { deleteOfferThread } from '@echo/firestore-test/offer-thread/delete-offer-thread'
import { getAllOfferThreads } from '@echo/firestore-test/offer-thread/get-all-offer-threads'

export async function clearOfferThreads() {
  const documents = await getAllOfferThreads()
  for (const document of documents) {
    try {
      await deleteOfferThread(document.id)
    } catch (e) {
      // nothing to do
    }
  }
}
