import { getCollectionSwapsCounts } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-counts'
import { deleteCollectionSwapsCount } from '@echo/firestore-test/collection-swaps-count/delete-collection-swaps-count'

export async function clearCollectionSwapsCounts() {
  const documents = await getCollectionSwapsCounts()
  for (const document of documents) {
    try {
      await deleteCollectionSwapsCount(document.id)
    } catch (e) {
      // nothing to do
    }
  }
}
