import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { initializeFirestoreCollection } from '@echo/firestore-test/initialize-firestore-collection'

export async function initializeListings() {
  await initializeFirestoreCollection(CollectionReferenceName.LISTINGS)
}
