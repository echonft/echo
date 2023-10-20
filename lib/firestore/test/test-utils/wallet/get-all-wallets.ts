import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'

export async function getAllWallets() {
  const querySnapshot = await getWalletsCollectionReference().get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
