import { initializeFirestoreCollection } from '@echo/firestore/utils/initialize-firestore-collection'
import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'

export async function initializeWallets() {
  await initializeFirestoreCollection(CollectionReferenceName.WALLETS)
}
