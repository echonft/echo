import { getOffersCollection } from '@echo/firestore/helpers/collection/get-offers-collection'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'

export async function getOfferSnapshotById(id: string) {
  const querySnapshot = await getOffersCollection().where('id', '==', id).get()
  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
