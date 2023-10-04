import { getWalletsCollection } from '@echo/firestore/helpers/collection/get-wallets-collection'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'

export async function getWalletsForUser(userId: string) {
  const querySnapshot = await getWalletsCollection().where('userId', '==', userId).get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
