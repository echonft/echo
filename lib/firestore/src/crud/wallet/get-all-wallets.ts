import { getWalletsCollection } from '@echo/firestore/helpers/collection/get-wallets-collection'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'

export async function getAllWallets() {
  const querySnapshot = await getWalletsCollection().get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
