import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { deleteCollection } from '@echo/firestore-test/collection/delete-collection'

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
