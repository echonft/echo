import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { resetFirestoreCollection } from '@echo/firestore/utils/reset-firestore-collection'

export async function resetOffers() {
  await resetFirestoreCollection(CollectionReferenceName.Offers)
}
