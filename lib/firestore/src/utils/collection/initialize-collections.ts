import { initializeFirestoreCollection } from '@echo/firestore/utils/initialize-firestore-collection'
import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'

export async function initializeCollections() {
  await initializeFirestoreCollection(CollectionReferenceName.COLLECTIONS)
}
