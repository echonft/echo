import { getNoncesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nonces-collection-reference'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'

export async function findNonceForUser(userId: string) {
  const querySnapshot = await getNoncesCollectionReference().where('userId', '==', userId).get()
  return getQuerySnapshotDocumentData(querySnapshot)
}
