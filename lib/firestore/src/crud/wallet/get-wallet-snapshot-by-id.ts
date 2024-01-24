import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { getQuerySnapshotUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot-unique-document-snapshot'

export async function getWalletSnapshotById(id: string) {
  const querySnapshot = await getWalletsCollectionReference().where('id', '==', id).get()
  return getQuerySnapshotUniqueDocumentSnapshot(querySnapshot)
}
