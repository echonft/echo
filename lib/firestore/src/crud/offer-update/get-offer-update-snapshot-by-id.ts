import { getOfferUpdatesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-updates-collection-reference'
import { getQuerySnapshotUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot-unique-document-snapshot'

export async function getOfferUpdateSnapshotById(id: string) {
  const querySnapshot = await getOfferUpdatesCollectionReference().where('id', '==', id).get()
  return getQuerySnapshotUniqueDocumentSnapshot(querySnapshot)
}
