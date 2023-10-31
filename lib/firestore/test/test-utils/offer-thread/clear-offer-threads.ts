import { deleteOfferThread } from '@test-utils/offer-thread/delete-offer-thread'
import { getAllOfferThreads } from '@test-utils/offer-thread/get-all-offer-threads'

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
