import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQuerySnapshotUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot-unique-document-snapshot'

export async function getListingSnapshotById(id: string) {
  const querySnapshot = await getListingsCollectionReference().where('id', '==', id).get()
  return getQuerySnapshotUniqueDocumentSnapshot(querySnapshot)
}
