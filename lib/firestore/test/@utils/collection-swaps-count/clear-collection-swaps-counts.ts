import { getAllCollectionSwapsCounts } from '@echo/firestore/crud/collection-swaps-count/get-all-collection-swaps-counts'
import { deleteCollectionSwapsCount } from '@echo/firestore-test/collection-swaps-count/delete-collection-swaps-count'

export async function clearCollectionSwapsCounts() {
  const documents = await getAllCollectionSwapsCounts()
  for (const document of documents) {
    try {
      await deleteCollectionSwapsCount(document.id)
    } catch (e) {
      // nothing to do
    }
  }
}
