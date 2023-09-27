import { deleteNftCollectionSwapsCount } from '@echo/firestore/crud/nft-collection-swaps-count/delete-nft-collection-swaps-count'
import { getAllNftCollectionSwapsCounts } from '@echo/firestore/crud/nft-collection-swaps-count/get-all-nft-collection-swaps-counts'

export async function clearNftCollectionSwapsCounts() {
  const documents = await getAllNftCollectionSwapsCounts()
  for (const document of documents) {
    try {
      await deleteNftCollectionSwapsCount(document.id)
    } catch (e) {
      // nothing to do
    }
  }
}
