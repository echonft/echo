import { getWalletsCollection } from '@echo/firestore/helpers/collection/get-wallets-collection'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'

export async function getWalletSnapshotById(id: string) {
  const querySnapshot = await getWalletsCollection().where('id', '==', id).get()
  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
