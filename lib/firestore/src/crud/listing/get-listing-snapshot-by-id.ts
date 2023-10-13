import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'

export async function getListingSnapshotById(id: string) {
  const querySnapshot = await getListingsCollectionReference().where('id', '==', id).get()
  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
