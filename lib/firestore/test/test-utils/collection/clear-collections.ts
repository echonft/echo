import { deleteCollection } from '@echo/firestore/crud/collection/delete-collection'
import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'

export async function clearCollections() {
  const collections = await getAllCollections()
  for (const collection of collections) {
    try {
      await deleteCollection(collection.id)
    } catch (e) {
      // nothing to do
    }
  }
}
