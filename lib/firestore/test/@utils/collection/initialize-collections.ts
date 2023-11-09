import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { getAllCollectionMocks } from '@echo/model-mocks/collection/get-all-collection-mocks'

export async function initializeCollections() {
  const collections = getAllCollectionMocks()
  for (const collection of collections) {
    await firestoreApp().collection(CollectionReferenceName.COLLECTIONS).doc(collection.id).set(collection)
  }
}
