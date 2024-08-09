import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { resetFirestoreCollection } from '@echo/firestore/utils/reset-firestore-collection'

export async function resetListings() {
  await resetFirestoreCollection(CollectionReferenceName.LISTINGS)
}
