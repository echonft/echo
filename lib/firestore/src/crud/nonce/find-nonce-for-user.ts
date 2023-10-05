import { getNoncesCollection } from '@echo/firestore/helpers/collection/get-nonces-collection'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'

export async function findNonceForUser(userId: string) {
  const querySnapshot = await getNoncesCollection().where('userId', '==', userId).get()
  return getQuerySnapshotDocumentData(querySnapshot)
}
