import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'

export async function getWalletSnapshotById(id: string) {
  const querySnapshot = await getWalletsCollectionReference().where('id', '==', id).get()
  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
