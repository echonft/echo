import { CollectionName } from '@echo/firestore/constants/collection-name'
import { nonceDataConverter } from '@echo/firestore/converters/nonce/nonce-data-converter'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function findNonceForUser(userId: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.NONCES)
    .where('userId', '==', userId)
    .withConverter(nonceDataConverter)
    .get()

  return getQuerySnapshotDocumentData(querySnapshot)
}
