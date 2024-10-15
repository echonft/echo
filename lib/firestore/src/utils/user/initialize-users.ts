import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { initializeFirestoreCollection } from '@echo/firestore/utils/initialize-firestore-collection'

export async function initializeUsers() {
  await initializeFirestoreCollection(CollectionReferenceName.Users)
}
