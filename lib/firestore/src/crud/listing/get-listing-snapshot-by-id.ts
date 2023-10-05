import { getListingsCollection } from '@echo/firestore/helpers/collection/get-listings-collection'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'

export async function getListingSnapshotById(id: string) {
  const querySnapshot = await getListingsCollection().where('id', '==', id).get()
  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
