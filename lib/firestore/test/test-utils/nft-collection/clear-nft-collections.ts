import { deleteNftCollection } from '@echo/firestore/crud/nft-collection/delete-nft-collection'
import { getAllNftCollections } from '@echo/firestore/crud/nft-collection/get-all-nft-collections'

export async function clearNftCollections() {
  const nftCollections = await getAllNftCollections()
  for (const collection of nftCollections) {
    try {
      await deleteNftCollection(collection.id)
    } catch (e) {
      // nothing to do
    }
  }
}
