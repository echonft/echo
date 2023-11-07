import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-documents-data'

export async function getWalletsForUser(userId: string) {
  const querySnapshot = await getWalletsCollectionReference().where('userId', '==', userId).get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
