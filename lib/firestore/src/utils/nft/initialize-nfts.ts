import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { initializeFirestoreCollection } from '@echo/firestore/utils/initialize-firestore-collection'

export async function initializeNfts() {
  await initializeFirestoreCollection(CollectionReferenceName.NFTS)
}
